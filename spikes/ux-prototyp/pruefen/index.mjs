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
async function oeffnen(browser, url, anfragen, konsolenfehler) {
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  if (anfragen) seite.on('request', (r) => anfragen.push(r.url()));
  if (konsolenfehler) {
    seite.on('console', (m) => m.type() === 'error' && konsolenfehler.push(m.text()));
    seite.on('pageerror', (f) => konsolenfehler.push(String(f)));
  }
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
    /** Ablauf D bis zur geänderten Tiefe: Entwurf anlegen (Liste in der Kopfzeile), Tiefe im Panel setzen. */
    const entwurfAnlegen = async (name, tiefe) => {
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
      await klick('.entwurfswahl .stand');
      await klick('.entwurfsliste [data-befehl="entwurf.anlegen"]');
      await seite.keyboard.type(name);
      await seite.keyboard.press('Enter');
      eingaben += name.length + 1;
      await klick('[data-element="extrusion-1"]');
      await tippen('[data-panel="eigenschaften"] label:has-text("Tiefe") input', tiefe);
      return { seite, klicks: () => eingaben, klick, tippen };
    };
    /** Ablauf F: Seite mit Zähler; `waehlen` wählt die Platte, `langsam` lässt die 1.500 ms Fortschritt zu. */
    const kiSeite = async ({ waehlen = true, langsam = false } = {}) => {
      const url = langsam
        ? `${basis}/?${new URLSearchParams({ zustand: '', thema: 'hell', sprache: 'de' })}`
        : adresse(basis, '', 'hell');
      const { seite } = await oeffnen(browser, url);
      let eingaben = 0;
      const klick = async (selektor) => {
        await seite.click(selektor);
        eingaben += 1;
      };
      const tippen = async (text) => {
        await seite.keyboard.type(text);
        await seite.keyboard.press('Enter');
        eingaben += text.length + 1;
      };
      if (waehlen) await klick('[data-element="platte"]');
      const modell = () => seite.evaluate(() => window.__cee.modell());
      /** Absicht auf einem der drei Wege äußern. */
      const frage = async (weg, satz) => {
        if (weg === 'fragen') {
          await klick('[data-muster="Werkzeugleiste"] [data-befehl="werkzeug.fragen"]');
          await tippen(satz);
        } else if (weg === 'ki-fragen') {
          await klick('[data-panel="eigenschaften"] [data-befehl="ki.fragen"]');
          await tippen(satz);
        } else {
          await seite.keyboard.press('Control+K');
          await seite.keyboard.type(satz);
          await seite.keyboard.press('Enter');
          eingaben += satz.length + 2;
        }
      };
      const karten = () =>
        seite.evaluate(() =>
          [...document.querySelectorAll('[data-muster="Entscheidungskarte"]')].map((k) => ({
            befehl: k.dataset.vorschlag,
            wert: k.dataset.wert,
            vorher: k.querySelector('[data-feld="vorher"]')?.textContent ?? '',
            nachher: k.querySelector('[data-feld="nachher"]')?.textContent ?? '',
            hauptaktionen: [...k.querySelectorAll('[data-hauptaktion]')].map(
              (b) => b.dataset.befehl,
            ),
            befehlszeilen: [...k.querySelectorAll('code')].map((c) => c.textContent),
          })),
        );
      const erklaerung = () =>
        seite.evaluate(() => ({
          beispielsaetze: [...document.querySelectorAll('[data-beispiel]')].map((b) =>
            b.textContent.trim(),
          ),
          modale_dialoge: [...document.querySelectorAll('[aria-modal="true"], dialog[open]')].map(
            (d) => d.tagName.toLowerCase(),
          ),
        }));
      return { seite, klick, tippen, frage, karten, erklaerung, modell, klicks: () => eingaben };
    };
    const KI_SATZ = 'Mach daraus ein Kästchen mit 2 mm Wand';
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
      // Ablauf C: Baugruppe anlegen, Verbindungspunkte anklicken, Art Fest (nur Klicks).
      async 'c/'() {
        const { seite } = await oeffnen(browser, adresse(basis, 'teile', 'hell'));
        let eingaben = 0;
        const klick = async (selektor, optionen) => {
          await seite.click(selektor, optionen);
          eingaben += 1;
        };
        await klick('[data-element="gehaeuse"]');
        await klick('[data-element="deckel"]', { modifiers: ['Shift'] });
        await klick('[data-panel="eigenschaften"] [data-befehl="baugruppe.anlegen"]');
        await klick('[data-element="instanz-deckel"]');
        await klick('[data-panel="eigenschaften"] [data-befehl="verbindung.anlegen"]');
        await klick('[data-verbindungspunkt="deckel-unterseite"]');
        await klick('[data-verbindungspunkt="gehaeuse-oberkante"]');
        const ergebnis = { eingaben, ...(await stand(seite)) };
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
      // Ablauf D: Entwurf anlegen, Tiefe 10 mm im Entwurf, vergleichen, übernehmen (Klicks und Tasten).
      async 'd/'() {
        const { seite, klicks, klick } = await entwurfAnlegen('Dickere Platte', '10');
        await klick('[data-befehl="entwurf.vergleichen"]');
        const vergleich = await seite.evaluate(() => ({
          vorher: document.querySelector('[data-entwurfskarte] [data-vorher]')?.textContent ?? '',
          nachher: document.querySelector('[data-entwurfskarte] [data-nachher]')?.textContent ?? '',
        }));
        const entwurf_modell = await seite.evaluate(() => window.__cee.angezeigt());
        const haupt_modell_vor_uebernehmen = await seite.evaluate(() => window.__cee.modell());
        await klick('[data-entwurfskarte] [data-befehl="entwurf.uebernehmen"]');
        const haupt_modell_nach_uebernehmen = await seite.evaluate(() => window.__cee.modell());
        await klick('[data-befehl="ansicht.alle-entwuerfe"]');
        const entwurf_zustand = await seite
          .locator('[data-entwurf-eintrag]:has-text("Dickere Platte") [data-feld="zustand"]')
          .innerText();
        const ergebnis = {
          eingaben: klicks(),
          vergleich,
          entwurf_modell,
          haupt_modell_vor_uebernehmen,
          haupt_modell_nach_uebernehmen,
          entwurf_zustand,
          ...(await stand(seite)),
        };
        await seite.close();
        return ergebnis;
      },
      // Verwerfen: ohne Begründung nicht auslösbar, danach nur in „Alle Entwürfe“ mit Begründung.
      async 'd/verwerfen'() {
        const { seite, klicks, klick, tippen } = await entwurfAnlegen('Dickere Platte', '10');
        const modell_vorher = await seite.evaluate(() => window.__cee.modell());
        await klick('[data-befehl="entwurf.vergleichen"]');
        const knopf = '[data-entwurfskarte] button[data-befehl="entwurf.verwerfen"]';
        const verwerfen_ausloesbar_ohne_begruendung = await seite.evaluate(
          (s) => ({ disabled: document.querySelector(s).disabled }),
          knopf,
        );
        await seite.click(knopf, { force: true });
        await seite.keyboard.press('Enter');
        const modell_nach_versuch_ohne_begruendung = await seite.evaluate(() =>
          window.__cee.modell(),
        );
        await tippen('[data-entwurfskarte] input', 'zu schwer');
        const namen = (selektor) =>
          seite.evaluate(
            (s) =>
              [...document.querySelectorAll(s)].map(
                (e) => e.querySelector('[data-feld="name"]').textContent,
              ),
            selektor,
          );
        const ansicht_ergebnis = await namen('[data-entwurf-eintrag]');
        await klick('[data-befehl="ansicht.alle-entwuerfe"]');
        const ansicht_alle_entwuerfe = await seite.evaluate(() =>
          [...document.querySelectorAll('[data-entwurf-eintrag]')].map((e) => ({
            name: e.querySelector('[data-feld="name"]').textContent,
            begruendung: e.querySelector('[data-feld="begruendung"]')?.textContent ?? '',
          })),
        );
        const modell_nachher = await seite.evaluate(() => window.__cee.modell());
        const ergebnis = {
          eingaben: klicks(),
          modell_vorher,
          modell_nach_versuch_ohne_begruendung,
          modell_nachher,
          ansicht_ergebnis,
          ansicht_alle_entwuerfe,
          verworfen_name: 'Dickere Platte',
          verwerfen_ausloesbar_ohne_begruendung,
          ...(await stand(seite)),
        };
        await seite.close();
        return ergebnis;
      },
      // Ablauf E: Befehl über die Suche finden („zurück“), mit Kürzel; Enter führt den ersten Treffer aus.
      async 'e/'() {
        const { seite } = await oeffnen(browser, adresse(basis, 'platte', 'hell'));
        await seite.keyboard.press('Control+K');
        await seite.keyboard.type('zurück');
        const treffer = await seite.evaluate(() =>
          [
            ...document.querySelectorAll('[data-suche] [data-gruppe="befehle"] [role="option"]'),
          ].map((e) => ({
            befehl: e.dataset.befehl,
            kuerzel_text: e.querySelector('kbd')?.textContent ?? '',
          })),
        );
        await seite.keyboard.press('Enter');
        const ergebnis = {
          eingaben: 'zurück'.length + 2,
          suche_zurueck: { treffer },
          ...(await stand(seite)),
        };
        await seite.close();
        return ergebnis;
      },
      async 'e/unbekannter-zustand'() {
        const konsolenfehler = [];
        const { seite, bereit_ms } = await oeffnen(
          browser,
          adresse(basis, 'gibt-es-nicht', 'hell'),
          undefined,
          konsolenfehler,
        );
        const gezeigt = await seite.evaluate(() => ({
          zustand_gezeigt: window.__cee.zustand,
          befunde: [...document.querySelectorAll('[data-muster="Befund"]')]
            .map((e) => e.textContent.trim())
            .filter(Boolean),
        }));
        const ergebnis = {
          eingaben: 0,
          bereit_ms,
          ...gezeigt,
          konsolenfehler: konsolenfehler.length,
          ...(await stand(seite)),
        };
        await seite.close();
        return ergebnis;
      },
      // Ablauf F: Absicht äußern, Karte übernehmen, Wandstärke nachjustieren, Rückgängig (Klicks und Tasten).
      async 'f/'() {
        const k = await kiSeite();
        const modell_vorher = await k.modell();
        await k.frage('fragen', KI_SATZ);
        await k.klick('[data-muster="Entscheidungskarte"] [data-befehl="vorschlag.uebernehmen"]');
        await k.klick('[data-muster="Letzte Aktion nachjustieren"] input');
        await k.seite.keyboard.press('Control+A');
        await k.seite.keyboard.type('3');
        await k.seite.keyboard.press('Enter');
        await k.seite.evaluate(() => document.activeElement?.blur());
        const s = await stand(k.seite);
        const undo_schritte = [];
        for (let i = 0; i < 4; i++) {
          await k.seite.keyboard.press('Control+Z');
          undo_schritte.push(await k.modell());
        }
        const ergebnis = { eingaben: k.klicks() + 6, modell_vorher, undo_schritte, ...s };
        await k.seite.close();
        return ergebnis;
      },
      // Dieselbe Absicht auf allen drei Wegen: gleiche Karte, Modell bis zur Entscheidung unverändert.
      async 'f/drei-wege'() {
        const wege = [];
        let eingaben = 0;
        for (const weg of ['fragen', 'ki-fragen', 'suche']) {
          const k = await kiSeite();
          const modell_vorher = await k.modell();
          await k.frage(weg, KI_SATZ);
          const karten = await k.karten();
          wege.push({
            weg,
            befehlszeilen: karten.flatMap((c) => c.befehlszeilen),
            modell_vorher,
            modell_bei_karte: await k.modell(),
          });
          eingaben += k.klicks();
          await k.seite.close();
        }
        return { eingaben, wege, modell: wege[0].modell_bei_karte, protokoll: [] };
      },
      // Ohne Auswahl und bei unbekanntem Satz: Erklärung mit Beispielsätzen, kein Dialog.
      async 'f/unbekannt'() {
        const ohne = await kiSeite({ waehlen: false });
        const ohne_vorher = await ohne.modell();
        await ohne.frage('fragen', KI_SATZ);
        const ohne_auswahl = {
          ...(await ohne.erklaerung()),
          modell_vorher: ohne_vorher,
          modell_nachher: await ohne.modell(),
        };
        const unbekannt = await kiSeite();
        const unbekannt_vorher = await unbekannt.modell();
        await unbekannt.frage('fragen', 'Bitte male mir ein Bild von einem Hund');
        const unbekannter_satz = {
          ...(await unbekannt.erklaerung()),
          modell_vorher: unbekannt_vorher,
          modell_nachher: await unbekannt.modell(),
        };
        const ergebnis = {
          eingaben: ohne.klicks() + unbekannt.klicks(),
          ohne_auswahl,
          unbekannter_satz,
          ...(await stand(unbekannt.seite)),
        };
        await ohne.seite.close();
        await unbekannt.seite.close();
        return ergebnis;
      },
      // Die drei vorbereiteten Absichten; jede Karte wird verworfen, damit die nächste vom selben Stand ausgeht.
      async 'f/absichten'() {
        const k = await kiSeite();
        const karten = [];
        for (const satz of [
          KI_SATZ,
          'Runde alle Kanten mit 1 mm ab',
          'Mach die Platte 20 mm länger',
        ]) {
          await k.frage('fragen', satz);
          karten.push(...(await k.karten()));
          await k.klick('[data-muster="Entscheidungskarte"] [data-befehl="vorschlag.verwerfen"]');
        }
        const ergebnis = { eingaben: k.klicks(), karten, ...(await stand(k.seite)) };
        await k.seite.close();
        return ergebnis;
      },
      // Verwerfen und Anhalten (mit echter Wartezeit) lassen das Modell unverändert.
      async 'f/verwerfen'() {
        const k = await kiSeite();
        const modell_vorher = await k.modell();
        await k.frage('fragen', KI_SATZ);
        await k.klick('[data-muster="Entscheidungskarte"] [data-befehl="vorschlag.verwerfen"]');
        const modell_nach_verwerfen = await k.modell();
        const karten_nach_verwerfen = await k.karten();
        const l = await kiSeite({ langsam: true });
        await l.frage('fragen', KI_SATZ);
        await l.klick('[data-befehl="ki.anhalten"]');
        await l.seite.waitForTimeout(2000);
        const ergebnis = {
          eingaben: k.klicks() + l.klicks(),
          modell_vorher,
          modell_nach_verwerfen,
          karten_nach_verwerfen,
          modell_nach_anhalten: await l.modell(),
          karten_nach_anhalten: await l.karten(),
          ...(await stand(k.seite)),
        };
        await k.seite.close();
        await l.seite.close();
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

  /** Je 20 Messungen (Auswahl, Werkzeugwechsel, Suche): Eingabe bis zum nächsten gezeichneten Bild, p95 in ms. */
  async messen({ browser, basis }) {
    const N = 20;
    const p95 = (werte) => {
      const s = [...werte].sort((a, b) => a - b);
      return Math.round(s[Math.ceil(s.length * 0.95) - 1] * 10) / 10;
    };
    const { seite } = await oeffnen(browser, adresse(basis, 'teile', 'hell'));
    // Klick im Browser auslösen und bis nach dem nächsten Zeichnen warten.
    const klickMessen = (selektor) =>
      seite.evaluate(async (sel) => {
        const e = document.querySelector(sel);
        const t0 = performance.now();
        e.click();
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return performance.now() - t0;
      }, selektor);
    const auswahl = [];
    const werkzeug = [];
    const suche = [];
    for (let i = 0; i < N; i++) {
      auswahl.push(
        await klickMessen(i % 2 ? '[data-element="gehaeuse"]' : '[data-element="deckel"]'),
      );
      werkzeug.push(
        await klickMessen(
          i % 2 ? '[data-befehl="werkzeug.auswaehlen"]' : '[data-befehl="werkzeug.messen"]',
        ),
      );
      const t0 = Date.now();
      await seite.keyboard.press('Control+K');
      await seite.keyboard.type('Ver');
      await seite.waitForSelector('[data-suche] [role="option"]');
      await seite.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      suche.push(Date.now() - t0);
      await seite.keyboard.press('Escape');
    }
    await seite.close();
    return {
      auswahl_p95_ms: p95(auswahl),
      werkzeug_p95_ms: p95(werkzeug),
      suche_p95_ms: p95(suche),
    };
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
