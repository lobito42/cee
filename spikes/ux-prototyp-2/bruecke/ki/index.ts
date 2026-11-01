// KI-Anbieter in der lokalen Brücke (ap-52, design.md Abschnitt 1; ADR-037): nur in `vorschau.sh` und im
// Prüfmodus, nur auf 127.0.0.1. `GET/POST /ki/anbieter`, `POST /ki/schritt`; im Prüfmodus `GET /ki/anfragen`.
// Nach dem Start ist immer die Satzerkennung aktiv; ein echter Anbieter wird nur durch Wahl des Menschen aktiv.
// Verbindungen gehen nur zu `CEE_KI_URL`, zu fremden Hosts nur mit `CEE_KI_EXTERN=ja`; der Schlüssel bleibt hier.
import { readFileSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { openAiAnbieter } from './openai';
import { regel } from './regel';
import type { Anbieter, Nachricht, Werkzeug } from './typen';

const ZEITLIMIT_S = 120;
const LOKAL = new Set(['127.0.0.1', '::1', '[::1]', 'localhost']);

interface Eintrag {
  id: 'regel' | 'openai-kompatibel';
  verfuegbar: boolean;
  ziel: string;
  modell?: string;
  befund?: { code: string; text: string };
}

function anweisung(): string {
  try {
    return readFileSync(fileURLToPath(new URL('./anweisung.md', import.meta.url)), 'utf8').trim();
  } catch {
    return '';
  }
}

/** Einrichtung aus den Umgebungsvariablen beim Start (design.md Abschnitt 1). */
function einrichten(pruefmodus: boolean, protokoll: Record<string, unknown>[]) {
  const env = process.env;
  const url = env.CEE_KI_URL?.trim() ?? '';
  const modell = env.CEE_KI_MODELL?.trim() ?? '';
  const eintrag: Eintrag = { id: 'openai-kompatibel', verfuegbar: false, ziel: '' };
  let anbieter: Anbieter | null = null;
  if (!url) {
    eintrag.befund = { code: 'nicht_eingerichtet', text: 'CEE_KI_URL ist nicht gesetzt' };
  } else {
    let host = '';
    try {
      host = new URL(url).hostname;
    } catch {
      eintrag.befund = { code: 'url_ungueltig', text: 'CEE_KI_URL ist keine Adresse' };
    }
    if (host) {
      const lokal = LOKAL.has(host);
      eintrag.ziel = lokal ? 'lokal' : host;
      eintrag.modell = modell || undefined;
      if (!modell) eintrag.befund = { code: 'modell_fehlt', text: 'CEE_KI_MODELL fehlt' };
      else if (!lokal && env.CEE_KI_EXTERN !== 'ja')
        eintrag.befund = {
          code: 'extern_nicht_gewaehlt',
          text: `Ziel ${host} liegt außerhalb dieses Rechners; nur mit CEE_KI_EXTERN=ja`,
        };
      else {
        const s = Number(env.CEE_KI_ZEITLIMIT_S);
        eintrag.verfuegbar = true;
        anbieter = openAiAnbieter({
          url,
          modell,
          schluessel: env.CEE_KI_SCHLUESSEL || undefined,
          zeitlimitMs: (pruefmodus && s > 0 ? s : ZEITLIMIT_S) * 1000,
          anweisung: anweisung(),
          protokoll: pruefmodus ? (x) => protokoll.push(x) : undefined,
        });
      }
    }
  }
  return { eintrag, anbieter };
}

function lesen(req: IncomingMessage): Promise<string> {
  return new Promise((ok, fehler) => {
    let text = '';
    req.setEncoding('utf8');
    req.on('data', (d: string) => (text += d));
    req.on('end', () => ok(text));
    req.on('error', fehler);
  });
}

function senden(res: ServerResponse, daten: unknown): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(daten));
}

export function kiBruecke(o: { pruefmodus: boolean }): Plugin {
  const protokoll: Record<string, unknown>[] = [];
  const { eintrag, anbieter: echt } = einrichten(o.pruefmodus, protokoll);
  let aktiv: 'regel' | 'openai-kompatibel' = 'regel';
  const liste = () => ({
    aktiv,
    anbieter: [{ id: 'regel', verfuegbar: true, ziel: 'lokal' } satisfies Eintrag, eintrag],
  });
  const middleware = (req: IncomingMessage, res: ServerResponse, weiter: () => void): void => {
    const pfad = (req.url ?? '').split('?')[0] ?? '';
    if (!pfad.startsWith('/ki/')) return weiter();
    if (req.method === 'GET' && pfad === '/ki/anbieter') return senden(res, liste());
    if (req.method === 'GET' && pfad === '/ki/anfragen' && o.pruefmodus)
      return senden(res, protokoll);
    if (req.method === 'POST' && pfad === '/ki/anbieter') {
      lesen(req)
        .then((t) => {
          const id = (JSON.parse(t || '{}') as { id?: string }).id;
          if (id === 'regel') aktiv = 'regel';
          else if (id === 'openai-kompatibel' && eintrag.verfuegbar) aktiv = id;
          senden(res, liste());
        })
        .catch(() => senden(res, liste()));
      return;
    }
    if (req.method === 'POST' && pfad === '/ki/schritt') {
      lesen(req)
        .then(async (t) => {
          const { nachrichten, werkzeuge } = JSON.parse(t) as {
            nachrichten: Nachricht[];
            werkzeuge: Werkzeug[];
          };
          const a = aktiv === 'openai-kompatibel' && echt ? echt : regel;
          const s = await a.schritt(nachrichten ?? [], werkzeuge ?? []);
          senden(res, { anbieter: a.id, ...s });
        })
        .catch((e: unknown) => senden(res, { anbieter: aktiv, aufrufe: [], fehler: String(e) }));
      return;
    }
    weiter();
  };
  return {
    name: 'cee-ki-bruecke',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
