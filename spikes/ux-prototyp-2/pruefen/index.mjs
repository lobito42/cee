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
import { fensterBefehle } from './fenster.mjs';
import { katalogBefehle } from './katalog.mjs';
import { messBefehle } from './messen.mjs';
import { modellBefehle } from './modell.mjs';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function argumente(roh) {
  const [befehl, ...rest] = roh;
  const optionen = {};
  const positionen = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--json') continue;
    if (a.startsWith('--')) optionen[a.slice(2)] = rest[++i];
    else positionen.push(a);
  }
  return { befehl, optionen, positionen };
}

const BEFEHLE = {
  ...basisBefehle,
  ...fensterBefehle,
  ...datenBefehle,
  ...auswahlBefehle,
  ...modellBefehle,
  ...messBefehle,
  ...ablaufBefehle,
  ...katalogBefehle,
};

const { befehl, optionen, positionen } = argumente(process.argv.slice(2));
if (!befehl || !BEFEHLE[befehl]) {
  process.stderr.write(
    `Unbekannter Befehl: ${befehl ?? '(keiner)'}; bekannt: ${Object.keys(BEFEHLE).join(', ')}\n`,
  );
  process.exit(2);
}

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
  const ergebnis = await BEFEHLE[befehl]({ browser, basis, optionen, positionen, wurzel: WURZEL });
  process.stdout.write(`${JSON.stringify(ergebnis)}\n`);
} finally {
  await browser.close();
  await server.close();
}
