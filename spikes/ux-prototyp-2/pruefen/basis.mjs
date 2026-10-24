// Prüfbefehle über alle Zustände: zustaende, zustand, anfragen (später budget, texte).
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { THEMEN, ZUSTAENDE, adresse, lies, oeffnen, sammler, schliessen } from './grundlage.mjs';

/** Für alle Zustände und Themen eine Funktion ausführen. */
export async function jeZustand(basis, fn, { themen = THEMEN, sprachen = ['de'] } = {}) {
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

export const basisBefehle = {
  async zustaende({ browser, basis, optionen }) {
    const ziel = resolve(optionen.out ?? join(process.cwd(), 'pruefen-ausgabe'));
    mkdirSync(ziel, { recursive: true });
    return jeZustand(basis, async (zustand, thema, _sprache, url) => {
      const o = await oeffnen(browser, url);
      const datei = join(ziel, `${zustand}-${thema}.png`);
      await o.seite.screenshot({ path: datei });
      await schliessen(o);
      return { zustand, thema, datei, bereit_ms: o.bereit_ms, eingaben: 0 };
    });
  },

  async zustand({ browser, basis, optionen }) {
    const konsolenfehler = [];
    const o = await oeffnen(browser, adresse(basis, optionen.name ?? ''), konsolenfehler);
    const ergebnis = await o.seite.evaluate(() => ({
      zustand_gezeigt: window.__cee.zustand,
      befunde: [...document.querySelectorAll('[data-muster="Befund"]')]
        .filter((e) => window.__pruef.sichtbar(e))
        .map((e) => e.textContent.trim())
        .filter(Boolean),
    }));
    const struktur = await lies.struktur(o.seite);
    await schliessen(o);
    return { bereit_ms: o.bereit_ms, ...ergebnis, konsolenfehler, struktur };
  },

  async anfragen({ browser, basis }) {
    const urls = [];
    sammler.anfragen = urls;
    await jeZustand(basis, async (_z, _t, _s, url) => {
      const o = await oeffnen(browser, url);
      await schliessen(o);
    });
    const k = await oeffnen(browser, `${basis}/?katalog&tempo=0`);
    await schliessen(k);
    sammler.anfragen = null;
    const fremd = urls.filter((u) => {
      try {
        const x = new URL(u);
        return (x.protocol === 'http:' || x.protocol === 'https:') && x.hostname !== '127.0.0.1';
      } catch {
        return false;
      }
    });
    return { anfragen: fremd };
  },

  async budget({ browser, basis }) {
    const zustaende = await jeZustand(basis, async (zustand, thema, _s, url) => {
      const o = await oeffnen(browser, url);
      const farbenUndMehr = await o.seite.evaluate(messeBudget);
      // Überfahren: jedes Bedienelement mit Befehl ohne und mit Zeiger auf seinem Umfeld
      await o.seite.mouse.move(1439, 899);
      const befehle = await o.seite.evaluate(() => {
        window.__pruefElemente = [...document.querySelectorAll('[data-befehl]')];
        return window.__pruefElemente.length;
      });
      const hover_pruefung = [];
      for (let i = 0; i < befehle; i++) {
        const ohne = await o.seite.evaluate((nr) => {
          const e = window.__pruefElemente[nr];
          return e?.isConnected
            ? { befehl: e.dataset.befehl, sichtbar: window.__pruef.wirklichSichtbar(e) }
            : null;
        }, i);
        if (!ohne) continue;
        const ziel = await o.seite.evaluate((nr) => {
          const e = window.__pruefElemente[nr];
          const traeger = e.parentElement ?? e;
          const r = traeger.getBoundingClientRect();
          return r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
        }, i);
        if (ziel) await o.seite.mouse.move(ziel.x, ziel.y);
        const mit = await o.seite.evaluate((nr) => {
          const e = window.__pruefElemente[nr];
          return e?.isConnected ? window.__pruef.wirklichSichtbar(e) : false;
        }, i);
        hover_pruefung.push({
          befehl: ohne.befehl,
          sichtbar_ohne: ohne.sichtbar,
          sichtbar_mit: mit,
        });
        await o.seite.mouse.move(1439, 899);
      }
      await schliessen(o);
      return { zustand, thema, ...farbenUndMehr, hover_pruefung };
    });
    return { zustaende };
  },

  async texte({ browser, basis }) {
    const zustaende = await jeZustand(
      basis,
      async (zustand, _thema, sprache, url) => {
        const o = await oeffnen(browser, url);
        const modell = await o.seite.evaluate(() => window.__cee.modell());
        const sichtbarer_text = await o.seite.evaluate(() => window.__pruef.texte(document.body));
        await schliessen(o);
        return { zustand, sprache, sichtbarer_text, modell };
      },
      { themen: ['hell'], sprachen: ['schluessel', 'de', 'en'] },
    );
    return { zustaende };
  },
};

// Läuft im Browser.
function messeBudget() {
  const p = window.__pruef;
  const alle = [...document.body.querySelectorAll('*')].filter(p.sichtbar);
  const rolle = (e) => {
    const gesetzt = e.closest('[data-akzent]');
    if (gesetzt) return gesetzt.dataset.akzent;
    if (e.matches(':focus-visible')) return 'fokus';
    return null;
  };
  const farben = [];
  for (const e of alle) {
    if (e.closest('canvas') || e.tagName === 'CANVAS' || e.closest('svg')) continue;
    const s = getComputedStyle(e);
    const ort = e.dataset.muster ?? e.tagName.toLowerCase();
    const hatText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const eintraege = [s.backgroundColor];
    if (hatText || e.tagName === 'INPUT') eintraege.push(s.color);
    if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none')
      eintraege.push(s.borderTopColor);
    for (const c of eintraege) farben.push({ ...p.hex(c), ort, akzent_rolle: rolle(e) });
  }
  return {
    farben,
    body_schrift: getComputedStyle(document.body).fontFamily,
    dialoge: document.querySelectorAll('[aria-modal="true"],dialog:modal').length,
  };
}
