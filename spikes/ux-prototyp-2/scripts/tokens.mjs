// Erzeugt src/erzeugt/tokens.css und tokens.ts aus docs/design/tokens.json (ADR-061).
// `--check` erzeugt im Speicher neu und vergleicht mit den Dateien (Exit 1 bei Unterschied).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const hier = dirname(fileURLToPath(import.meta.url));
const quelle = join(hier, '..', '..', '..', 'docs', 'design', 'tokens.json');
const ziel = join(hier, '..', 'src', 'erzeugt');
const tokens = JSON.parse(readFileSync(quelle, 'utf-8'));

function wertCss(t) {
  const v = t.$value;
  switch (t.$type) {
    case 'color':
      return v;
    case 'dimension':
    case 'duration':
      return `${v.value}${v.unit}`;
    case 'fontFamily':
      return v.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ');
    case 'cubicBezier':
      return `cubic-bezier(${v.join(', ')})`;
    default:
      return String(v);
  }
}

// Flache Liste { pfad: [...], token } aller Blätter unterhalb eines Knotens.
function blaetter(knoten, pfad = []) {
  if (knoten && typeof knoten === 'object' && '$value' in knoten) return [{ pfad, token: knoten }];
  if (!knoten || typeof knoten !== 'object') return [];
  return Object.entries(knoten)
    .filter(([k]) => !k.startsWith('$'))
    .flatMap(([k, v]) => blaetter(v, [...pfad, k]));
}

const zeilen = (liste, praefix) =>
  liste.map(({ pfad, token }) => `  --${[praefix, ...pfad].join('-')}: ${wertCss(token)};`);

const unabhaengig = Object.entries(tokens)
  .filter(([k]) => !k.startsWith('$') && k !== 'farbe')
  .flatMap(([k, v]) => zeilen(blaetter(v), k));

const themen = Object.keys(tokens.farbe);
let css = '/* Erzeugt aus docs/design/tokens.json – nicht von Hand ändern. */\n';
css += `:root {\n${unabhaengig.join('\n')}\n}\n`;
for (const thema of themen) {
  css += `[data-thema='${thema}'] {\n${zeilen(blaetter(tokens.farbe[thema]), 'farbe').join('\n')}\n}\n`;
}

const objekt = {};
for (const [k, v] of Object.entries(tokens)) {
  if (k.startsWith('$')) continue;
  for (const { pfad, token } of blaetter(v)) objekt[[k, ...pfad].join('.')] = wertCss(token);
}
const ts =
  '// Erzeugt aus docs/design/tokens.json – nicht von Hand ändern.\n' +
  `export const tokens = ${JSON.stringify(objekt, null, 2)} as const;\n` +
  `export const themen = ${JSON.stringify(themen)} as const;\n`;

const dateien = { 'tokens.css': css, 'tokens.ts': ts };

if (process.argv.includes('--check')) {
  let unterschiede = 0;
  for (const [name, inhalt] of Object.entries(dateien)) {
    const pfad = join(ziel, name);
    if (!existsSync(pfad) || readFileSync(pfad, 'utf-8') !== inhalt) {
      console.error(`Unterschied: src/erzeugt/${name}`);
      unterschiede += 1;
    }
  }
  console.log(`tokens:check: ${unterschiede} Unterschiede`);
  process.exit(unterschiede === 0 ? 0 : 1);
} else {
  mkdirSync(ziel, { recursive: true });
  for (const [name, inhalt] of Object.entries(dateien)) writeFileSync(join(ziel, name), inhalt);
  console.log('tokens: src/erzeugt/ geschrieben');
}
