// Brücke zum Geometrie-Worker (ap-50, design.md Abschnitt 5): nur in `vorschau.sh` und im Prüfmodus, nie im
// statischen Build. Startet `python -m cee_worker --stdio` als eigenen Prozess und nimmt `POST /kernel` (Projekt der
// Vorschau) auf demselben Ursprung 127.0.0.1 an. Den Auftrag baut der Worker über den Rust-Kern (`op: auftrag`).
// Zeitlimit 10 s je Auftrag; bei Absturz oder Zeitüberschreitung Befund `kernel_unavailable` und Neustart.
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { existsSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';

const ZEITLIMIT_MS = 10_000;

type Antwort = (zeile: string | null) => void;

interface Optionen {
  /** Wurzel des Repositorys (enthält `worker/` und `.venv/`). */
  repo: string;
  /** Prüfmodus: zusätzlich `POST /kernel/test-beenden`. */
  pruefmodus: boolean;
}

function befehl(repo: string): { cmd: string; args: string[] } {
  const eigen = process.env.CEE_PYTHON;
  if (eigen) return { cmd: eigen, args: ['-m', 'cee_worker', '--stdio'] };
  for (const p of [
    join(repo, '.venv', 'bin', 'python'),
    join(repo, '.venv', 'Scripts', 'python.exe'),
  ]) {
    if (existsSync(p)) return { cmd: p, args: ['-m', 'cee_worker', '--stdio'] };
  }
  return { cmd: 'uv', args: ['run', '--extra', 'cad', 'python', '-m', 'cee_worker', '--stdio'] };
}

class Worker {
  private proc: ChildProcessWithoutNullStreams | null = null;
  private puffer = '';
  private warteschlange: Antwort[] = [];
  /** Endgültig gestoppt (Server geschlossen): kein Neustart mehr. */
  private aus = false;

  constructor(private readonly repo: string) {}

  starten(): void {
    if (this.proc || this.aus) return;
    const { cmd, args } = befehl(this.repo);
    const p = spawn(cmd, args, {
      cwd: this.repo,
      env: { ...process.env, PYTHONPATH: join(this.repo, 'worker', 'src') },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    this.proc = p;
    this.puffer = '';
    p.stdout.setEncoding('utf8');
    p.stdout.on('data', (d: string) => {
      this.puffer += d;
      let i = this.puffer.indexOf('\n');
      while (i >= 0) {
        const zeile = this.puffer.slice(0, i);
        this.puffer = this.puffer.slice(i + 1);
        this.warteschlange.shift()?.(zeile);
        i = this.puffer.indexOf('\n');
      }
    });
    p.stderr.on('data', () => {
      /* Ausgaben des Workers auf stderr gehören nicht in die Antwort */
    });
    const ende = () => {
      if (this.proc !== p) return;
      this.proc = null;
      for (const a of this.warteschlange.splice(0)) a(null);
      // Neustart sofort, damit der nächste Auftrag einen warmen Worker findet
      if (!this.aus) setTimeout(() => this.starten(), 0);
    };
    p.on('exit', ende);
    p.on('error', ende);
    // Aufwärmen: OCP laden, bevor der erste Auftrag kommt
    this.senden({ op: 'ping' }).catch(() => undefined);
  }

  beenden(): void {
    this.proc?.kill('SIGKILL');
  }

  stoppen(): void {
    this.aus = true;
    this.proc?.kill('SIGKILL');
  }

  senden(nachricht: unknown): Promise<string> {
    this.starten();
    const p = this.proc;
    if (!p) return Promise.reject(new Error('kein Worker'));
    return new Promise((ok, fehler) => {
      const uhr = setTimeout(() => {
        fehler(new Error('Zeitlimit'));
        p.kill('SIGKILL');
      }, ZEITLIMIT_MS);
      this.warteschlange.push((zeile) => {
        clearTimeout(uhr);
        if (zeile === null) fehler(new Error('Worker beendet'));
        else ok(zeile);
      });
      p.stdin.write(`${JSON.stringify(nachricht)}\n`);
    });
  }
}

const nichtErreichbar = (grund: string): string =>
  JSON.stringify({
    protocol: 'cee-kernel/0',
    results: [],
    befunde: [
      {
        code: 'kernel_unavailable',
        element: null,
        hinweis: 'kernel.befund.kernel_unavailable',
        text: grund,
      },
    ],
  });

function lesen(req: IncomingMessage): Promise<string> {
  return new Promise((ok, fehler) => {
    let text = '';
    req.setEncoding('utf8');
    req.on('data', (d: string) => (text += d));
    req.on('end', () => ok(text));
    req.on('error', fehler);
  });
}

function senden(res: ServerResponse, text: string): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(text);
}

export function kernelBruecke(o: Optionen): Plugin {
  const worker = new Worker(resolve(o.repo));
  const middleware = (req: IncomingMessage, res: ServerResponse, weiter: () => void): void => {
    const pfad = (req.url ?? '').split('?')[0];
    if (req.method === 'GET' && pfad?.endsWith('/kernel-status.json')) {
      senden(res, JSON.stringify({ bruecke: true }));
      return;
    }
    if (req.method === 'POST' && pfad === '/kernel/test-beenden' && o.pruefmodus) {
      worker.beenden();
      senden(res, JSON.stringify({ beendet: true }));
      return;
    }
    if (req.method === 'POST' && pfad === '/kernel') {
      lesen(req)
        .then((text) => worker.senden({ op: 'auftrag', projekt: JSON.parse(text) }))
        .then((zeile) => senden(res, zeile))
        .catch((e: unknown) => senden(res, nichtErreichbar(String(e))));
      return;
    }
    weiter();
  };
  return {
    name: 'cee-kernel-bruecke',
    configureServer(server) {
      worker.starten();
      server.middlewares.use(middleware);
      server.httpServer?.on('close', () => worker.stoppen());
    },
    configurePreviewServer(server) {
      worker.starten();
      server.middlewares.use(middleware);
      server.httpServer?.on('close', () => worker.stoppen());
    },
  };
}
