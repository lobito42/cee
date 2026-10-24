// Grundlage des Prüfwerkzeugs (ap-41b): Vorschau starten, Zustände öffnen, Rohdaten aus dem Browser lesen.
// Das Werkzeug liefert nur Rohdaten (Namen, Texte, Rechtecke, Pixelkoordinaten, PNG-Dateien); Urteile fällt der Test.
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const ZUSTAENDE = [
  'leer',
  'halter',
  'auswahl',
  'mehrfach',
  'zustaende',
  'aktiv',
  'isoliert',
  'kontextmenue',
  'menue',
  'ziehen',
  'ablegen',
  'ablegen-verboten',
  'ausgeblendet',
  'verworfen',
  'rechnet',
  'befund',
  'andere',
  'chat',
  'suche',
  'fokus',
  'perspektive',
  'kanten',
];
export const THEMEN = ['hell', 'dunkel'];
export const MOD = 'Control';

/** Gemeinsame Sammelstellen (z. B. für `anfragen`). */
export const sammler = { anfragen: null };

let verzeichnis = null;
export const bilderVerzeichnis = () => {
  if (!verzeichnis) {
    verzeichnis = join(tmpdir(), `ux2-pruefen-${process.pid}`);
    mkdirSync(verzeichnis, { recursive: true });
  }
  return verzeichnis;
};

let bildNummer = 0;
export const bildPfad = (name = 'bild') =>
  join(bilderVerzeichnis(), `${name}-${(bildNummer += 1)}.png`);

export function adresse(basis, zustand, thema = 'hell', sprache = 'de', extra = {}) {
  const p = new URLSearchParams({ thema, sprache, tempo: '0' });
  if (zustand !== null && zustand !== undefined) p.set('zustand', zustand);
  for (const [k, v] of Object.entries(extra)) p.set(k, v);
  return `${basis}/?${p}`;
}

/** Öffnet eine Adresse; liefert Seite und die Zeit bis `bereit`. */
export async function oeffnen(browser, url, konsolenfehler, optionen = {}) {
  const kontext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    hasTouch: !!optionen.touch,
  });
  const seite = await kontext.newPage();
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
  return { seite, bereit_ms, kontext };
}

export async function schliessen(o) {
  await o.seite.close();
  await o.kontext.close();
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

  async warte() {
    await zeichnen(this.seite);
  }

  async klick(selektor, optionen) {
    await this.seite.click(selektor, optionen);
    this.eingaben += 1;
    await this.warte();
  }

  async doppelklick(selektor, optionen) {
    await this.seite.dblclick(selektor, optionen);
    this.eingaben += 2;
    await this.warte();
  }

  async klickPunkt(punkt, optionen = {}) {
    const { modifiers = [], ...rest } = optionen;
    for (const m of modifiers) await this.seite.keyboard.down(m);
    await this.seite.mouse.click(punkt.x, punkt.y, rest);
    for (const m of modifiers) await this.seite.keyboard.up(m);
    this.eingaben += 1;
    await this.warte();
  }

  async doppelklickPunkt(punkt) {
    await this.seite.mouse.dblclick(punkt.x, punkt.y);
    this.eingaben += 2;
    await this.warte();
  }

  async rechtsklickPunkt(punkt) {
    await this.seite.mouse.click(punkt.x, punkt.y, { button: 'right' });
    this.eingaben += 1;
    await this.warte();
  }

  async bewegen(punkt) {
    await this.seite.mouse.move(punkt.x, punkt.y);
    this.eingaben += 1;
    await this.warte();
  }

  /** Feld anklicken, alles markieren, tippen, mit Enter übernehmen. */
  async tippen(selektor, text, { enter = true } = {}) {
    await this.seite.click(selektor);
    await this.seite.keyboard.press(`${MOD}+a`);
    await this.seite.keyboard.type(text);
    if (enter) await this.seite.keyboard.press('Enter');
    this.eingaben += text.length + 2 + (enter ? 1 : 0);
    await this.warte();
  }

  async taste(k) {
    await this.seite.keyboard.press(k);
    this.eingaben += 1;
    await this.warte();
  }

  async text(t) {
    await this.seite.keyboard.type(t);
    this.eingaben += t.length;
    await this.warte();
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
  const wirklichSichtbar = (e) => {
    if (!sichtbar(e)) return false;
    for (let n = e; n && n !== document.documentElement; n = n.parentElement) {
      if (parseFloat(getComputedStyle(n).opacity) === 0) return false;
    }
    return true;
  };
  const text = (e) => (e?.textContent ?? '').replace(/\s+/g, ' ').trim();
  const zone = (e) => e.closest('[data-zone]')?.dataset.zone ?? null;
  const zeile = (z) => {
    const status = z.querySelector('.status');
    return {
      name: text(z.querySelector('.name')),
      id: z.dataset.id,
      ebene: Number(z.dataset.ebene),
      aria_selected: z.getAttribute('aria-selected'),
      status: status
        ? {
            wort: text(status.querySelector('.wort')),
            symbol: status.querySelector('[data-icon]')?.dataset.icon ?? '',
            token: status.dataset.statusToken ?? '',
          }
        : null,
      symbole: [...z.querySelectorAll('[data-icon]')].map((i) => i.dataset.icon),
      zustaende: (z.dataset.zustand ?? '').split(' ').filter(Boolean),
      durchgestrichen: getComputedStyle(z.querySelector('.name')).textDecorationLine.includes(
        'line-through',
      ),
    };
  };
  const struktur = () =>
    [...document.querySelectorAll('[data-zone="struktur"] [role="treeitem"]')]
      .filter(sichtbar)
      .map(zeile);
  const zonenSichtbar = () =>
    Object.fromEntries(
      [...document.querySelectorAll('[data-zone]')].map((e) => [e.dataset.zone, sichtbar(e)]),
    );
  const ansicht = () => {
    const { projektion_von, kontur_punkte, ...rest } = window.__cee.ansicht();
    void projektion_von;
    void kontur_punkte;
    return rest;
  };
  window.__pruef = {
    sichtbar,
    wirklichSichtbar,
    rechteck,
    hex,
    texte,
    text,
    zone,
    zeile,
    struktur,
    zonenSichtbar,
    ansicht,
  };
}

export const lies = {
  struktur: (seite) => seite.evaluate(() => window.__pruef.struktur()),
  ansicht: (seite) => seite.evaluate(() => window.__pruef.ansicht()),
  modell: (seite) => seite.evaluate(() => window.__cee.modell()),
  teil: (seite) => seite.evaluate(() => window.__cee.teil()),
  auswahl: (seite) => seite.evaluate(() => window.__cee.auswahl()),
  protokoll: (seite) => seite.evaluate(() => window.__cee.protokoll()),
  verlauf: (seite) => seite.evaluate(() => window.__cee.verlauf()),
  gezeichnet: (seite) => seite.evaluate(() => window.__cee.gezeichnet()),
  rechteck: (seite, selektor) =>
    seite.evaluate((s) => {
      const e = document.querySelector(s);
      return e ? window.__pruef.rechteck(e) : null;
    }, selektor),
  zone: (seite, name) => lies.rechteck(seite, `[data-zone="${name}"]`),
};
