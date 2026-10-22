// Grundlage des Prüfwerkzeugs (ap-41b): Vorschau starten, Zustände öffnen, Rohdaten aus dem Browser lesen.
// Das Werkzeug liefert nur Rohdaten (Namen, Texte, Rechtecke, Pixelkoordinaten, PNG-Dateien); Urteile fällt der Test.
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const ZUSTAENDE = [
  'leer',
  'halter',
  'schritt',
  'ziehen',
  'skizze',
  'extrusion',
  'kanten',
  'durchsicht',
  'befund',
  'teile',
  'verbindung',
  'suche',
  'entwuerfe',
  'vergleich',
  'ki-gespraech',
  'ki-vorschlag',
  'simulation',
];
export const THEMEN = ['hell', 'dunkel'];

/** Gemeinsame Sammelstellen (z. B. für `anfragen`). */
export const sammler = { anfragen: null };

export const bilderVerzeichnis = (() => {
  let pfad = null;
  return () => {
    if (!pfad) {
      pfad = join(tmpdir(), `ux2-pruefen-${process.pid}`);
      mkdirSync(pfad, { recursive: true });
    }
    return pfad;
  };
})();

let bildNummer = 0;
export function bildSpeichern(dataUrl, name = 'bild') {
  const roh = Buffer.from(dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
  const datei = join(bilderVerzeichnis(), `${name}-${(bildNummer += 1)}.png`);
  writeFileSync(datei, roh);
  return datei;
}

export function adresse(basis, zustand, thema = 'hell', sprache = 'de', tempo0 = true) {
  const p = new URLSearchParams({ zustand, thema, sprache });
  if (tempo0) p.set('tempo', '0');
  return `${basis}/?${p}`;
}

/** Öffnet eine Adresse; liefert Seite und die Zeit bis `bereit`. */
export async function oeffnen(browser, url, konsolenfehler) {
  const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await seite.addInitScript(installiere);
  if (sammler.anfragen) seite.on('request', (r) => sammler.anfragen.push(r.url()));
  if (konsolenfehler) {
    seite.on('console', (m) => m.type() === 'error' && konsolenfehler.push(m.text()));
    seite.on('pageerror', (f) => konsolenfehler.push(String(f)));
  }
  const start = Date.now();
  await seite.goto(url);
  await seite.waitForSelector('html[data-bereit="1"]', { timeout: 15000 });
  await seite.evaluate(() => document.fonts.ready);
  const bereit_ms = Date.now() - start;
  await zeichnen(seite);
  return { seite, bereit_ms };
}

/** Wartet auf zwei gezeichnete Bilder (Gezeichnet = zweites requestAnimationFrame nach der Eingabe). */
export function zeichnen(seite) {
  return seite.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true)))),
  );
}

/** Zählt echte Eingaben (Klicks, Tasten, Mausbewegungen mit Taste). */
export class Lauf {
  constructor(seite) {
    this.seite = seite;
    this.eingaben = 0;
  }

  async klick(selektor, optionen) {
    await this.seite.click(selektor, optionen);
    this.eingaben += 1;
    await zeichnen(this.seite);
  }

  async doppelklick(selektor, optionen) {
    await this.seite.dblclick(selektor, optionen);
    this.eingaben += 2;
    await zeichnen(this.seite);
  }

  async klickPunkt(punkt, optionen = {}) {
    const { modifiers = [], ...rest } = optionen;
    for (const m of modifiers) await this.seite.keyboard.down(m);
    await this.seite.mouse.click(punkt.x, punkt.y, rest);
    for (const m of modifiers) await this.seite.keyboard.up(m);
    this.eingaben += 1;
    await zeichnen(this.seite);
  }

  async doppelklickPunkt(punkt) {
    await this.seite.mouse.dblclick(punkt.x, punkt.y);
    this.eingaben += 2;
    await zeichnen(this.seite);
  }

  /** Feld anklicken, alles markieren, tippen, mit Enter übernehmen. */
  async tippen(selektor, text, { enter = true } = {}) {
    await this.seite.click(selektor);
    await this.seite.keyboard.press('Control+A');
    await this.seite.keyboard.type(text);
    if (enter) await this.seite.keyboard.press('Enter');
    this.eingaben += text.length + 2 + (enter ? 1 : 0);
    await zeichnen(this.seite);
  }

  async taste(k) {
    await this.seite.keyboard.press(k);
    this.eingaben += 1;
    await zeichnen(this.seite);
  }

  async text(t) {
    await this.seite.keyboard.type(t);
    this.eingaben += t.length;
    await zeichnen(this.seite);
  }
}

// --- Auswertung im Browser (Rohdaten) ------------------------------------------------------------

/** Wird in jeder Seite vor dem Laden ausgeführt: lesende Hilfen unter `window.__pruef`. */
function installiere() {
  const sichtbar = (e) => {
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const rechteck = (e) => {
    const r = e.getBoundingClientRect();
    return { x: r.left, y: r.top, breite: r.width, hoehe: r.height };
  };
  const farbe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const hex = (css) => {
    farbe.clearRect(0, 0, 1, 1);
    farbe.fillStyle = '#000000';
    farbe.fillStyle = css;
    farbe.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = farbe.getImageData(0, 0, 1, 1).data;
    const h = (n) => n.toString(16).padStart(2, '0');
    return {
      wert: `#${h(r)}${h(g)}${h(b)}`.toUpperCase(),
      alpha: Math.round((a / 255) * 100) / 100,
    };
  };
  const texte = (wurzel) => {
    const liste = [];
    const lauf = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT);
    for (let n = lauf.nextNode(); n; n = lauf.nextNode()) {
      const e = n.parentElement;
      if (!e || e.closest('script,style,canvas')) continue;
      if (!sichtbar(e)) continue;
      const t = n.textContent.trim();
      if (t) liste.push(t);
    }
    return liste;
  };
  const text = (e) => (e?.textContent ?? '').trim();
  const aufbau = () =>
    [...document.querySelectorAll('[data-zone="aufbau"] [data-schritt]')]
      .filter(sichtbar)
      .map((z) => {
        const status = z.querySelector('.status');
        return {
          name: text(z.querySelector('.name')),
          schritt: z.dataset.schritt,
          ebene: Number(z.dataset.ebene),
          aria_selected: z.getAttribute('aria-selected'),
          aria_disabled: z.getAttribute('aria-disabled'),
          hervorgehoben: z.hasAttribute('data-hervorgehoben'),
          zugehoerig: z.hasAttribute('data-zugehoerig'),
          status: status
            ? {
                wort: text(status.querySelector('.wort')),
                symbol: text(status.querySelector('.symbol')),
                farbe: hex(getComputedStyle(status).color).wert,
              }
            : null,
        };
      });
  const inspektor = () => {
    const zone = document.querySelector('[data-zone="inspektor"]');
    const gruppen = [...zone.querySelectorAll('[data-gruppe]')].map((g) => ({
      name: g.dataset.gruppe,
      felder: [...g.querySelectorAll('.feld')].map((f) => {
        const eingabe = f.querySelector('input');
        const wert = f.querySelector('[data-wert-text]');
        return {
          name: f.dataset.feld,
          text: text(f),
          wert_text: eingabe ? eingabe.value : text(wert),
          editierbar: !!eingabe && !eingabe.readOnly && !eingabe.disabled,
          berechnet:
            !!f.querySelector('[data-berechnet]') && sichtbar(f.querySelector('[data-berechnet]')),
        };
      }),
    }));
    return {
      titel: text(zone.querySelector('h2')),
      gruppen,
      befehle: [...zone.querySelectorAll('[data-befehl]')]
        .filter(sichtbar)
        .map((e) => e.dataset.befehl),
      texte: texte(zone),
    };
  };
  const ansicht = () => {
    const { projektion, ...rest } = window.__cee.ansicht();
    void projektion;
    return rest;
  };
  window.__pruef = { sichtbar, rechteck, hex, texte, text, aufbau, inspektor, ansicht };
}

export const lies = {
  aufbau: (seite) => seite.evaluate(() => window.__pruef.aufbau()),
  inspektor: (seite) => seite.evaluate(() => window.__pruef.inspektor()),
  ansicht: (seite) => seite.evaluate(() => window.__pruef.ansicht()),
  modell: (seite) => seite.evaluate(() => window.__cee.modell()),
  teil: (seite) => seite.evaluate(() => window.__cee.teil()),
  auswahl: (seite) => seite.evaluate(() => window.__cee.auswahl()),
  protokoll: (seite) => seite.evaluate(() => window.__cee.protokoll()),
  projektion: (seite, id) => seite.evaluate((i) => window.__cee.ansicht().projektion(i), id),
  rechteck: (seite, selektor) =>
    seite.evaluate((s) => {
      const e = document.querySelector(s);
      return e ? window.__pruef.rechteck(e) : null;
    }, selektor),
  leinwandRechteck: (seite) => lies.rechteck(seite, 'canvas[data-modell]'),
  /** Bild der Leinwand als PNG-Datei; Pfad zurück. */
  async leinwand(seite, name = 'leinwand') {
    const url = await seite.evaluate(() => window.__cee.bild());
    return bildSpeichern(url, name);
  },
};
