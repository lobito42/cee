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
};
