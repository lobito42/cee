// Prüfwerkzeug (ap-41b): startet eine lokale Vorschau und fragt sie mit headless Chromium ab.
// Aufruf: npm run --silent pruefen -- <befehl> [--out <dir>] [--name <zustand>] … --json
// Liefert nur Rohdaten als ein JSON-Wert auf stdout; Urteile fällt der Test (design.md, Testschnittstelle).
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { ablaufBefehle } from './ablauf.mjs';
import { auswahlBefehle } from './auswahl.mjs';
import { basisBefehle } from './basis.mjs';
import { datenBefehle } from './daten.mjs';
import { drahtmodellBefehle } from './drahtmodell.mjs';
import { fensterBefehle } from './fenster.mjs';
import { katalogBefehle } from './katalog.mjs';
import { menueBefehle } from './menue.mjs';
import { messBefehle } from './messen.mjs';
import { modellBefehle } from './modell.mjs';
import { rueckmeldungBefehle } from './rueckmeldung.mjs';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function argumente(roh) {
  const [befehl, ...rest] = roh;
  const optionen = {};
  const alle = {};
  const positionen = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--json') continue;
    if (a.startsWith('--')) {
      const wert = rest[++i];
      optionen[a.slice(2)] = wert;
      (alle[a.slice(2)] ??= []).push(wert);
    } else positionen.push(a);
  }
  return { befehl, optionen, alle, positionen };
}

const BEFEHLE = {
  ...basisBefehle,
  ...fensterBefehle,
  ...datenBefehle,
  ...auswahlBefehle,
  ...modellBefehle,
  ...rueckmeldungBefehle,
  ...messBefehle,
  ...ablaufBefehle,
  ...katalogBefehle,
  ...menueBefehle,
  ...drahtmodellBefehle,
};

const { befehl, optionen, alle, positionen } = argumente(process.argv.slice(2));
if (!befehl || !BEFEHLE[befehl]) {
  process.stderr.write(
    `Unbekannter Befehl: ${befehl ?? '(keiner)'}; bekannt: ${Object.keys(BEFEHLE).join(', ')}\n`,
  );
  process.exit(2);
}

// Wireframe-Basics (ap-50): Brücke zum Geometrie-Worker nur für `drahtmodell`, außer mit `--ohne-bruecke`.
if (befehl === 'drahtmodell' && !('ohne-bruecke' in optionen)) process.env.CEE_BRUECKE = 'pruefen';

const server = await preview({
  root: WURZEL,
  preview: { port: 0, host: '127.0.0.1', open: false },
});
const adr = server.httpServer.address();
const basis = `http://127.0.0.1:${typeof adr === 'object' && adr ? adr.port : 4173}`;
const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
try {
  const ergebnis = await BEFEHLE[befehl]({
    browser,
    basis,
    optionen,
    alle,
    positionen,
    wurzel: WURZEL,
  });
  await new Promise((fertig) => process.stdout.write(`${JSON.stringify(ergebnis)}\n`, fertig));
} finally {
  await browser.close();
  await server.close();
}
// Die Brücke (ap-50) hält einen Worker-Prozess; er endet mit stdin, sobald dieser Prozess endet.
process.exit(0);
