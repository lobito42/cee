// Prüfbefehle über alle Zustände: zustaende, zustand, zonen, budget, texte, anfragen.
import { mkdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { THEMEN, ZUSTAENDE, adresse, lies, oeffnen, sammler } from './grundlage.mjs';

/** Für alle Zustände und Themen eine Funktion ausführen. */
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

// Läuft im Browser.
function messeBudget() {
  const p = window.__pruef;
  const alle = [...document.body.querySelectorAll('*')].filter(p.sichtbar);
  const beschreibung = (e) =>
    `${e.tagName.toLowerCase()}${e.dataset.muster ? `[${e.dataset.muster}]` : ''}:${p.text(e).slice(0, 30)}`;
  const rolle = (e) => {
    if (e.closest('[data-quelle="ki"]')) return 'ki';
    if (e.closest('[data-hauptaktion]')) return 'hauptaktion';
    if (e.closest('[aria-selected="true"],[aria-current]')) return 'auswahl';
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
    for (const c of eintraege) farben.push({ ...p.hex(c), ort, akzent_rolle: rolle(e) });
  }
  const bedien = alle.filter((e) =>
    e.matches(
      'button,input,select,textarea,a[href],[role="button"],[role="option"],[role="tab"],[role="menuitem"],[role="switch"],[role="radio"],[role="checkbox"]',
    ),
  );
  const overlays = alle
    .filter((e) => e.hasAttribute('data-overlay') || getComputedStyle(e).position === 'fixed')
    .map((e) => ({ art: e.dataset.overlay ?? 'unbekannt', rechteck: p.rechteck(e) }));
  return {
    panels: alle.filter((e) => e.hasAttribute('data-panel')).map((e) => e.dataset.panel),
    arbeitsbereiche: [...document.querySelectorAll('[data-muster="Arbeitsbereiche"] button')].map(
      (b) => p.text(b),
    ),
    werkzeugleisten: alle
      .filter((e) => e.matches('[role="toolbar"],[data-muster="Werkzeugleiste"]'))
      .map(beschreibung),
    menueleisten: alle
      .filter((e) => e.matches('[role="menubar"],[data-muster="Menüleiste"]'))
      .map(beschreibung),
    hauptaktionen: alle
      .filter((e) => e.hasAttribute('data-hauptaktion'))
      .map((e) => e.dataset.befehl ?? ''),
    muster: [...new Set(alle.filter((e) => e.dataset.muster).map((e) => e.dataset.muster))],
    muster_kandidaten: [
      ...new Set(alle.filter((e) => e.dataset.musterKandidat).map((e) => e.dataset.musterKandidat)),
    ],
    modale_dialoge: [...document.querySelectorAll('[aria-modal="true"],dialog:modal')].map(
      beschreibung,
    ),
    body_schrift: getComputedStyle(document.body).fontFamily,
    ohne_befehl: bedien.filter((e) => !e.dataset.befehl).map(beschreibung),
    befehle_gefunden: bedien.map((e) => e.dataset.befehl).filter(Boolean),
    farben,
    overlays,
    karten: alle
      .filter((e) => e.matches('[data-muster="Entscheidungskarte"]'))
      .map((e) => ({ muster: e.dataset.muster, quelle: e.dataset.quelle ?? null })),
    legenden_texte: [...document.querySelectorAll('[data-muster-kandidat="Legende"]')].flatMap(
      (e) => p.texte(e),
    ),
  };
}

export const basisBefehle = {
  async zustaende({ browser, basis, optionen }) {
    const ziel = resolve(optionen.out ?? join(process.cwd(), 'pruefen-ausgabe'));
    mkdirSync(ziel, { recursive: true });
    return jeZustand(browser, basis, async (zustand, thema, _sprache, url) => {
      const { seite, bereit_ms } = await oeffnen(browser, url);
      const datei = join(ziel, `${zustand}-${thema}.png`);
      await seite.mouse.move(2, 2);
      await seite.screenshot({ path: datei });
      await seite.close();
      return { zustand, thema, datei, bereit_ms, eingaben: 0 };
    });
  },

  async zustand({ browser, basis, optionen }) {
    const konsolenfehler = [];
    const { seite, bereit_ms } = await oeffnen(
      browser,
      adresse(basis, optionen.name ?? '', 'hell'),
      konsolenfehler,
    );
    const ergebnis = await seite.evaluate(() => ({
      zustand_gezeigt: window.__cee.zustand,
      befunde: [...document.querySelectorAll('[data-muster="Befund"]')]
        .filter((e) => window.__pruef.sichtbar(e))
        .map((e) => e.textContent.trim())
        .filter(Boolean),
    }));
    const aufbau = await lies.aufbau(seite);
    const modell = await lies.modell(seite);
    await seite.close();
    return { bereit_ms, ...ergebnis, konsolenfehler, aufbau, modell };
  },

  async zonen({ browser, basis }) {
    return jeZustand(
      browser,
      basis,
      async (zustand, _t, _s, url) => {
        const { seite } = await oeffnen(browser, url);
        const z = await seite.evaluate(() => {
          const p = window.__pruef;
          const kopf = document.querySelector('[data-zone="kopf"]');
          return {
            fenster: { breite: window.innerWidth, hoehe: window.innerHeight },
            zonen: [...document.querySelectorAll('[data-zone]')].map((e) => ({
              zone: e.dataset.zone,
              sichtbar: p.sichtbar(e),
              rechteck: p.rechteck(e),
            })),
            panels: [...document.querySelectorAll('[data-panel]')].map((e) => e.dataset.panel),
            kopf: {
              pfad: [...kopf.querySelectorAll('[data-muster-kandidat="Pfad"] button')].map((b) =>
                p.text(b),
              ),
              texteingaben: [...kopf.querySelectorAll('input[type="text"]')].map((i) => ({
                platzhalter: i.placeholder,
                kuerzel_text: p.text(i.closest('label')?.querySelector('kbd')),
              })),
              reiter: [...kopf.querySelectorAll('[data-muster="Arbeitsbereiche"] button')].map(
                (b) => p.text(b),
              ),
              rueckgaengig: [
                ...kopf.querySelectorAll('[data-befehl="bearbeiten.rueckgaengig"]'),
              ].map((b) => ({
                befehl: b.dataset.befehl,
                text: p.text(b),
              })),
            },
            modell_texte: p.texte(document.querySelector('[data-zone="modell"]')),
          };
        });
        await seite.close();
        return { zustand, ...z };
      },
      { themen: ['hell'] },
    );
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

  async texte({ browser, basis }) {
    const zustaende = await jeZustand(
      browser,
      basis,
      async (zustand, _thema, sprache, url) => {
        const { seite } = await oeffnen(browser, url);
        const modell = await seite.evaluate(() => window.__cee.modell());
        const sichtbarer_text = await seite.evaluate(() => window.__pruef.texte(document.body));
        await seite.close();
        return { zustand, sprache, sichtbarer_text, modell };
      },
      { themen: ['hell'], sprachen: ['schluessel', 'de', 'en'] },
    );
    return { zustaende };
  },

  async anfragen({ browser, basis, wurzel }) {
    const urls = [];
    sammler.anfragen = urls;
    await jeZustand(browser, basis, async (_z, _t, _s, url) => {
      const { seite } = await oeffnen(browser, url);
      await seite.close();
    });
    // Die Abläufe A bis H laufen im selben Sammler.
    const { ablaufBefehle } = await import('./ablauf.mjs');
    for (const name of 'abcdefgh') {
      await ablaufBefehle.ablauf({ browser, basis, wurzel, optionen: {}, positionen: [name] });
    }
    sammler.anfragen = null;
    return { anfragen: urls };
  },
};

void readFileSync;
