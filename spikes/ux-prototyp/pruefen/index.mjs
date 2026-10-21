// Prüfwerkzeug (ap-41): startet eine lokale Vorschau und fragt sie mit headless Chromium ab.
// Aufruf: npm run --silent pruefen -- <befehl> [--out <dir>] [--variante <name>] --json
// Liefert nur Rohdaten als ein JSON-Wert auf stdout; Urteile fällt der Test (design.md, Testschnittstelle).
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ZUSTAENDE = [
  'leer',
  'skizze',
  'extrusion',
  'platte',
  'verrundung',
  'befund',
  'teile',
  'verbindung',
  'suche',
  'entwuerfe',
  'vergleich',
  'ki-arbeitet',
  'ki-vorschlag',
];
const THEMEN = ['hell', 'dunkel'];

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

function adresse(basis, zustand, thema, sprache = 'de') {
  const p = new URLSearchParams({ zustand, thema, sprache, tempo: '0' });
  return `${basis}/?${p}`;
}

/** Öffnet einen Zustand; liefert Seite und die Zeit bis `bereit`. */
async function oeffnen(browser, url, anfragen) {
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  if (anfragen) seite.on('request', (r) => anfragen.push(r.url()));
  const start = Date.now();
  await seite.goto(url);
  await seite.waitForSelector('html[data-bereit="1"]', { timeout: 10000 });
  await seite.evaluate(() => document.fonts.ready);
  return { seite, bereit_ms: Date.now() - start };
}

// Wird im Browser ausgeführt.
function messeBudget() {
  const sichtbar = (e) => {
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const alle = [...document.body.querySelectorAll('*')].filter(sichtbar);
  const beschreibung = (e) =>
    `${e.tagName.toLowerCase()}${e.dataset.muster ? `[${e.dataset.muster}]` : ''}:${(e.textContent ?? '').trim().slice(0, 30)}`;
  const zeichenflaeche = document
    .createElement('canvas')
    .getContext('2d', { willReadFrequently: true });
  const hex = (css) => {
    zeichenflaeche.clearRect(0, 0, 1, 1);
    zeichenflaeche.fillStyle = css;
    zeichenflaeche.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = zeichenflaeche.getImageData(0, 0, 1, 1).data;
    const h = (n) => n.toString(16).padStart(2, '0');
    return {
      wert: `#${h(r)}${h(g)}${h(b)}`.toUpperCase(),
      alpha: Math.round((a / 255) * 100) / 100,
    };
  };
  const rolle = (e) => {
    if (e.closest('[data-quelle="ki"]')) return 'ki';
    if (e.hasAttribute('data-hauptaktion')) return 'hauptaktion';
    if (e.matches('[aria-selected="true"],[aria-current]')) return 'auswahl';
    if (e.matches(':focus-visible')) return 'fokus';
    return null;
  };
  const farben = [];
  for (const e of alle) {
    if (e.closest('canvas') || e.tagName === 'CANVAS') continue;
    const s = getComputedStyle(e);
    const ort = e.dataset.muster ?? e.tagName.toLowerCase();
    const hatText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const eintraege = [s.backgroundColor];
    if (hatText || e.tagName === 'INPUT') eintraege.push(s.color);
    if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none')
      eintraege.push(s.borderTopColor);
    for (const c of eintraege) farben.push({ ...hex(c), ort, akzent_rolle: rolle(e) });
  }
  const bedienelemente = alle.filter((e) =>
    e.matches('button,input,select,textarea,a[href],[role="button"]'),
  );
  const panels = alle.filter((e) => e.hasAttribute('data-panel')).map((e) => e.dataset.panel);
  const leiste = document.querySelector('[data-muster="Werkzeugleiste"]');
  return {
    werkzeuge: leiste
      ? [...leiste.children]
          .map((k) => k.dataset.befehl ?? '')
          .filter((b) => b.startsWith('werkzeug.'))
      : [],
    arbeitsbereiche: [...document.querySelectorAll('[data-muster="Arbeitsbereiche"] button')].map(
      (b) => b.textContent.trim(),
    ),
    panels,
    hauptaktionen: alle
      .filter((e) => e.hasAttribute('data-hauptaktion'))
      .map((e) => e.dataset.befehl ?? ''),
    muster: [...new Set(alle.filter((e) => e.dataset.muster).map((e) => e.dataset.muster))],
    modale_dialoge: [...document.querySelectorAll('[aria-modal="true"],dialog:modal')].map(
      beschreibung,
    ),
    body_schrift: getComputedStyle(document.body).fontFamily,
    ohne_befehl: bedienelemente.filter((e) => !e.dataset.befehl).map(beschreibung),
    befehle_gefunden: bedienelemente.map((e) => e.dataset.befehl).filter(Boolean),
    farben,
    karten: alle
      .filter((e) => e.matches('[data-muster="Entscheidungskarte"]'))
      .map((e) => ({ muster: e.dataset.muster, quelle: e.dataset.quelle ?? null })),
  };
}

// Wird im Browser ausgeführt: sichtbare Textknoten.
function sammleTexte() {
  const texte = [];
  const lauf = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = lauf.nextNode(); n; n = lauf.nextNode()) {
    const e = n.parentElement;
    if (!e || e.closest('script,style,canvas')) continue;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0 || getComputedStyle(e).visibility === 'hidden') continue;
    const t = n.textContent.trim();
    if (t) texte.push(t);
  }
  return texte;
}

async function jeZustand(browser, basis, fn, { themen = THEMEN, sprachen = ['de'] } = {}) {
  const ergebnis = [];
  for (const zustand of ZUSTAENDE) {
    for (const thema of themen) {
      for (const sprache of sprachen) {
        ergebnis.push(await fn(zustand, thema, sprache, adresse(basis, zustand, thema, sprache)));
      }
    }
  }
  return ergebnis;
}

const BEFEHLE = {
  async zustaende({ browser, basis, optionen }) {
    const ziel = resolve(optionen.out ?? join(WURZEL, 'pruefen-ausgabe'));
    mkdirSync(ziel, { recursive: true });
    return jeZustand(browser, basis, async (zustand, thema, _sprache, url) => {
      const { seite, bereit_ms } = await oeffnen(browser, url);
      const datei = join(ziel, `${zustand}-${thema}.png`);
      await seite.screenshot({ path: datei });
      await seite.close();
      return { zustand, thema, datei, bereit_ms, eingaben: 0 };
    });
  },

  async budget({ browser, basis }) {
    const zustaende = await jeZustand(browser, basis, async (zustand, thema, _s, url) => {
      const { seite } = await oeffnen(browser, url);
      const z = { zustand, thema, ...(await seite.evaluate(messeBudget)) };
      await seite.close();
      return z;
    });
    const { seite } = await oeffnen(browser, adresse(basis, 'leer', 'hell'));
    const register = await seite.evaluate(() => window.__cee.befehle());
    await seite.close();
    return { zustaende, kuerzel: register.map((b) => b.kuerzel).filter(Boolean) };
  },

  /** Je Befehl: Strg+K, deutschen Titel tippen, Treffer lesen, Enter, neue Protokolleinträge. */
  async befehle({ browser, basis }) {
    const de = JSON.parse(readFileSync(join(WURZEL, 'src', 'i18n', 'de.json'), 'utf8'));
    const titel = (schluessel) => schluessel.split('.').reduce((k, teil) => k?.[teil], de);
    const { seite: lesen } = await oeffnen(browser, adresse(basis, 'teile', 'hell'));
    const register = await lesen.evaluate(() => window.__cee.befehle());
    await lesen.close();
    const ergebnis = [];
    for (const b of register) {
      const { seite } = await oeffnen(browser, adresse(basis, 'teile', 'hell'));
      const vorher = await seite.evaluate(() => window.__cee.protokoll().length);
      await seite.keyboard.press('Control+K');
      await seite.keyboard.type(titel(b.titel));
      const treffer = await seite.evaluate(() =>
        [...document.querySelectorAll('[data-suche] [data-gruppe="befehle"] [role="option"]')].map(
          (e) => ({
            befehl: e.dataset.befehl,
            kuerzel_text: e.querySelector('kbd')?.textContent ?? '',
          }),
        ),
      );
      await seite.keyboard.press('Enter');
      const protokoll_neu = await seite.evaluate((n) => window.__cee.protokoll().slice(n), vorher);
      ergebnis.push({ befehl: b.id, treffer, protokoll_neu });
      await seite.close();
    }
    return ergebnis;
  },

  /** Abläufe nur mit echten Eingaben; jeder liefert `eingaben`, `modell` und `protokoll`. */
  async ablauf({ browser, basis, optionen, positionen }) {
    const [name] = positionen;
    const variante = optionen.variante ?? '';
    /** Ablauf A mit echten Klicks und Tasten; liefert Seite und Zahl der Eingaben. */
    const grundplatte = async () => {
      const { seite } = await oeffnen(browser, adresse(basis, 'leer', 'hell'));
      let eingaben = 0;
      const klick = async (selektor) => {
        await seite.click(selektor);
        eingaben += 1;
      };
      const tippen = async (selektor, text) => {
        await seite.click(selektor);
        await seite.keyboard.press('Control+A');
        await seite.keyboard.type(text);
        await seite.keyboard.press('Enter');
        eingaben += text.length + 3;
      };
      await klick('[data-befehl="werkzeug.skizze"]');
      await klick('[data-ebene="XY"]');
      const feld = await seite.locator('.skizzenflaeche').boundingBox();
      await seite.mouse.move(feld.x + 10, feld.y + 10);
      await seite.mouse.down();
      await seite.mouse.move(feld.x + 90, feld.y + 60);
      await seite.mouse.up();
      eingaben += 3;
      await tippen('label:has-text("Länge") input', '80');
      await tippen('label:has-text("Breite") input', '50');
      await klick('[data-befehl="skizze.schliessen"]');
      await klick('[data-muster="Eigenschaften-Panel"] [data-befehl="feature.extrudieren"]');
      await tippen('label:has-text("Tiefe") input', '5');
      return { seite, klicks: () => eingaben };
    };
    /** Ablauf B: mit `tiefe8` zuerst die Tiefe 8 mm setzen, dann Kanten wählen und mit `radius` verrunden. */
    const dickerUndGerundet = async (radius, tiefe8 = true) => {
      const { seite } = await oeffnen(browser, adresse(basis, '', 'hell'));
      let eingaben = 0;
      const klick = async (selektor) => {
        await seite.click(selektor);
        eingaben += 1;
      };
      const tippen = async (selektor, text) => {
        await seite.click(selektor);
        await seite.keyboard.press('Control+A');
        await seite.keyboard.type(text);
        await seite.keyboard.press('Enter');
        eingaben += text.length + 3;
      };
      if (tiefe8) {
        await klick('[data-element="extrusion-1"]');
        await tippen('[data-panel="eigenschaften"] label:has-text("Tiefe") input', '8');
      }
      await klick('[data-element="platte"]');
      await klick('[data-panel="eigenschaften"] [data-befehl="feature.verrunden"]');
      for (const k of [1, 2, 3, 4]) await klick(`[data-kante="kante-${k}"]`);
      await tippen('.zustand label:has-text("Radius") input', `${radius} mm`);
      return { seite, klicks: () => eingaben, klick, tippen };
    };
    const stand = (seite) =>
      seite.evaluate(() => ({
        modell: window.__cee.modell(),
        protokoll: window.__cee.protokoll(),
      }));
    const ablaeufe = {
      async 'a/'() {
        const { seite, klicks } = await grundplatte();
        const letzte_aktion = await seite
          .locator('[data-muster="Letzte Aktion nachjustieren"]')
          .innerText();
        const ergebnis = { eingaben: klicks(), letzte_aktion, ...(await stand(seite)) };
        await seite.close();
        return ergebnis;
      },
      async 'a/rueckgaengig'() {
        const { seite, klicks } = await grundplatte();
        const s = await stand(seite);
        await seite.keyboard.press('Control+Z');
        const modell_zurueck = await seite.evaluate(() => window.__cee.modell());
        await seite.keyboard.press('Control+Shift+Z');
        const modell_wiederholt = await seite.evaluate(() => window.__cee.modell());
        const ergebnis = { eingaben: klicks() + 2, ...s, modell_zurueck, modell_wiederholt };
        await seite.close();
        return ergebnis;
      },
      // Ablauf B: Tiefe im Panel, Kanten wählen, Verrunden (nur Klicks und Tasten).
      async 'b/'() {
        const { seite, klicks } = await dickerUndGerundet(3);
        const ergebnis = { eingaben: klicks(), ...(await stand(seite)) };
        await seite.close();
        return ergebnis;
      },
      async 'b/befund'() {
        const { seite, klicks, klick, tippen } = await dickerUndGerundet(30, false);
        const lies = () =>
          seite.evaluate(() => {
            const hex = (c) =>
              `#${c
                .match(/\d+/g)
                .slice(0, 3)
                .map((n) => Number(n).toString(16).padStart(2, '0'))
                .join('')
                .toUpperCase()}`;
            const status = document.querySelector('.status-fehler');
            return {
              status: status && {
                wort: status.querySelector('.wort')?.textContent ?? '',
                symbol: status.querySelector('.symbol')?.textContent ?? '',
                farbe: hex(getComputedStyle(status).color),
              },
              korrektur: document.querySelector('[data-muster="Befund"] button')?.textContent ?? '',
              befunde: [...document.querySelectorAll('[data-muster="Befund"]')]
                .map((e) => e.textContent.trim())
                .filter(Boolean),
            };
          });
        const vor = await lies();
        await klick('[data-element="extrusion-1"]');
        await tippen('[data-panel="eigenschaften"] label:has-text("Tiefe") input', '9');
        const modell_mit_befund = await seite.evaluate(() => window.__cee.modell());
        await klick('[data-element="extrusion-1"]');
        const auswahl_nach_klick_auf_extrusion = await seite.evaluate(() => window.__cee.auswahl());
        await klick('[data-muster="Befund"] button');
        const nach = await lies();
        const ergebnis = {
          eingaben: klicks(),
          status_verrundung: vor.status,
          korrektur_text: vor.korrektur,
          befunde_vor_korrektur: vor.befunde,
          befunde_nach_korrektur: nach.befunde,
          modell_mit_befund,
          auswahl_nach_klick_auf_extrusion,
          ...(await stand(seite)),
        };
        await seite.close();
        return ergebnis;
      },
      // Suche nach einem Elementnamen: Gruppe Elemente, danach genau dieses Element ausgewählt.
      async 'e/elemente'() {
        const { seite } = await oeffnen(browser, adresse(basis, 'teile', 'hell'));
        await seite.keyboard.press('Control+K');
        await seite.keyboard.type('Deckel');
        const gruppe_elemente = await seite.evaluate(() =>
          [
            ...document.querySelectorAll('[data-suche] [data-gruppe="elemente"] [role="option"]'),
          ].map((e) => e.textContent.trim()),
        );
        await seite.keyboard.press('Enter');
        const stand = await seite.evaluate(() => {
          const modell = window.__cee.modell();
          const nach_id = new Map();
          const sammle = (k) => {
            nach_id.set(k.id, k.meta.name);
            k.content.forEach(sammle);
          };
          sammle(modell);
          return {
            modell,
            protokoll: window.__cee.protokoll(),
            auswahl_namen: window.__cee.auswahl().map((id) => nach_id.get(id)),
          };
        });
        await seite.close();
        return { eingaben: 'Deckel'.length + 2, gruppe_elemente, ...stand };
      },
    };
    const lauf = ablaeufe[`${name}/${variante}`];
    if (!lauf) throw new Error(`Unbekannter Ablauf: ${name} ${variante}`);
    return lauf();
  },

  async texte({ browser, basis }) {
    const zustaende = await jeZustand(
      browser,
      basis,
      async (zustand, thema, sprache, url) => {
        const { seite } = await oeffnen(browser, url);
        const modell = await seite.evaluate(() => window.__cee.modell());
        const sichtbarer_text = await seite.evaluate(sammleTexte);
        await seite.close();
        return { zustand, sprache, sichtbarer_text, modell };
      },
      { themen: ['hell'], sprachen: ['schluessel', 'de', 'en'] },
    );
    return { zustaende };
  },

  async anfragen({ browser, basis }) {
    const urls = [];
    await jeZustand(browser, basis, async (zustand, thema, _s, url) => {
      const { seite } = await oeffnen(browser, url, urls);
      await seite.close();
    });
    return { anfragen: urls };
  },
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
const browser = await chromium.launch();
try {
  const ergebnis = await BEFEHLE[befehl]({ browser, basis, optionen, positionen });
  process.stdout.write(`${JSON.stringify(ergebnis)}\n`);
} finally {
  await browser.close();
  await server.close();
}
