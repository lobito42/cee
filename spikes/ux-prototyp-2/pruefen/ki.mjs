// Prüfbefehle: befehle (jeder Befehl über die Suche), ki, simulation, messen.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Lauf, adresse, lies, oeffnen, zeichnen } from './grundlage.mjs';
import { suchen } from './ablauf.mjs';

const SATZ = 'Runde die oberen Kanten mit 2 mm ab';
const ZEILE = (id) => `[data-zone="aufbau"] [data-schritt="${id}"]`;

async function neu(browser, basis, zustand, { tempo0 = true } = {}) {
  const { seite } = await oeffnen(browser, adresse(basis, zustand, 'hell', 'de', tempo0));
  await seite.mouse.move(2, 2);
  await zeichnen(seite);
  return { seite, lauf: new Lauf(seite) };
}

const sichtbarRechteck = (seite, selektor) =>
  seite.evaluate((s) => {
    const e = document.querySelector(s);
    return e && window.__pruef.sichtbar(e) ? window.__pruef.rechteck(e) : null;
  }, selektor);

const karten = (seite) =>
  seite.evaluate(() =>
    [...document.querySelectorAll('[data-muster="Entscheidungskarte"]')]
      .filter((e) => window.__pruef.sichtbar(e))
      .map((k) => ({
        titel: k.querySelector('h3')?.textContent.trim() ?? '',
        befehlszeilen: [...k.querySelectorAll('code')].map((c) => c.textContent.trim()),
        hauptaktionen: [...k.querySelectorAll('[data-hauptaktion]')].map((b) => b.dataset.befehl),
      })),
  );

/** Satz in die Suche tippen und mit Enter bestätigen (erster Eintrag ist „KI fragen“). */
async function fragen(lauf, satz) {
  await lauf.taste('Control+K');
  await lauf.text(satz);
  await lauf.taste('Enter');
}

function p95(werte) {
  const s = [...werte].sort((a, b) => a - b);
  return Math.round(s[Math.ceil(s.length * 0.95) - 1] * 10) / 10;
}

export const kiBefehle = {
  /** Je Befehl: Strg+K, deutschen Titel tippen, Treffer lesen, zum Treffer gehen, Enter, neue Protokolleinträge. */
  async befehle({ browser, basis, wurzel }) {
    const de = JSON.parse(readFileSync(join(wurzel, 'src', 'i18n', 'de.json'), 'utf8'));
    const titel = (schluessel) => schluessel.split('.').reduce((k, teil) => k?.[teil], de);
    const { seite: lesen } = await neu(browser, basis, 'halter');
    const register = await lesen.evaluate(() => window.__cee.befehle());
    await lesen.close();
    const ergebnis = [];
    for (const b of register) {
      const { seite, lauf } = await neu(browser, basis, 'halter');
      const vorher = (await lies.protokoll(seite)).length;
      const treffer = await suchen(lauf, titel(b.titel));
      const index = treffer.findIndex((t) => t.befehl === b.id);
      for (let i = 0; i < Math.max(0, index); i++) await lauf.taste('ArrowDown');
      await lauf.taste('Enter');
      const protokoll_neu = (await lies.protokoll(seite)).slice(vorher);
      ergebnis.push({ befehl: b.id, treffer, protokoll_neu });
      await seite.close();
    }
    return ergebnis;
  },

  async ki({ browser, basis }) {
    // Befehl oder Wunsch
    const b = await neu(browser, basis, 'halter');
    const v0 = (await lies.protokoll(b.seite)).length;
    await suchen(b.lauf, 'Kanten');
    await b.lauf.taste('Enter');
    const befehl_kanten = {
      protokoll_neu: (await lies.protokoll(b.seite)).slice(v0),
      ansicht: await lies.ansicht(b.seite),
      gespraech_sichtbar_rechteck: await sichtbarRechteck(
        b.seite,
        '[data-muster-kandidat="Gespräch"]',
      ),
    };
    await b.seite.close();

    const w = await neu(browser, basis, 'halter');
    await w.lauf.klick(ZEILE('steg'));
    const modell_vorher = await lies.modell(w.seite);
    const inspektor_vorher = await lies.rechteck(w.seite, '[data-zone="inspektor"]');
    await w.lauf.taste('Control+K');
    await w.lauf.text(SATZ);
    const eintraege = await w.seite.evaluate(() =>
      [...document.querySelectorAll('[data-suche] [role="option"]')].map((e) =>
        e.textContent.trim(),
      ),
    );
    await w.lauf.taste('Enter');
    const gespraech = await sichtbarRechteck(w.seite, '[data-muster-kandidat="Gespräch"]');
    const panels = await w.seite.evaluate(() =>
      [...document.querySelectorAll('[data-panel]')]
        .filter((e) => window.__pruef.sichtbar(e))
        .map((e) => e.dataset.panel),
    );
    const k = (await karten(w.seite))[0] ?? { befehlszeilen: [], hauptaktionen: [] };
    const kartenInfo = await w.seite.evaluate(() => {
      const e = document.querySelector('[data-muster="Entscheidungskarte"]');
      return { quelle: e?.dataset.quelle ?? null, muster: e?.dataset.muster ?? null };
    });
    const wunsch = {
      eintraege,
      inspektor_vorher,
      gespraech,
      panels,
      karte: {
        befehlszeilen: k.befehlszeilen,
        quelle: kartenInfo.quelle,
        muster: kartenInfo.muster,
        hauptaktionen: k.hauptaktionen,
      },
      modell_vorher,
      modell_bei_karte: await lies.modell(w.seite),
    };
    await w.seite.close();

    // Verwerfen
    const v = await neu(browser, basis, 'halter');
    await v.lauf.klick(ZEILE('steg'));
    const vm = await lies.modell(v.seite);
    await fragen(v.lauf, SATZ);
    await v.lauf.klick('[data-muster="Entscheidungskarte"] [data-befehl="vorschlag.verwerfen"]');
    const verwerfen = {
      modell_vorher: vm,
      modell: await lies.modell(v.seite),
      karten: await karten(v.seite),
    };
    await v.seite.close();

    // Anhalten (mit echter Wartezeit)
    const a = await neu(browser, basis, 'halter', { tempo0: false });
    await a.lauf.klick(ZEILE('steg'));
    const am = await lies.modell(a.seite);
    await fragen(a.lauf, SATZ);
    await a.lauf.klick('[data-befehl="ki.anhalten"]');
    await a.seite.waitForTimeout(2200);
    const anhalten = {
      modell_vorher: am,
      modell: await lies.modell(a.seite),
      karten: await karten(a.seite),
    };
    await a.seite.close();

    // Unbekannter Satz
    const u = await neu(browser, basis, 'halter');
    await u.lauf.klick(ZEILE('steg'));
    const um = await lies.modell(u.seite);
    await fragen(u.lauf, 'Bitte male mir ein Bild von einem Hund');
    const unbekannt = {
      modell_vorher: um,
      modell: await lies.modell(u.seite),
      texte: await u.seite.evaluate(() =>
        window.__pruef.texte(document.querySelector('[data-muster-kandidat="Gespräch"]')),
      ),
      modale_dialoge: await u.seite.evaluate(() =>
        [...document.querySelectorAll('[aria-modal="true"],dialog[open]')].map((e) => e.tagName),
      ),
    };
    await u.seite.close();

    // Kennzeichnung
    const kennzeichnung = [];
    for (const [zustand, element, selektor] of [
      ['ki-gespraech', 'gespraech', '[data-muster-kandidat="Gespräch"]'],
      ['ki-vorschlag', 'karte', '[data-muster="Entscheidungskarte"]'],
    ]) {
      const z = await neu(browser, basis, zustand);
      const info = await z.seite.evaluate((s) => {
        const e = document.querySelector(s);
        return {
          quelle: e?.dataset.quelle ?? null,
          muster: e?.dataset.muster ?? null,
          texte: e ? window.__pruef.texte(e) : [],
          hauptaktionen: e
            ? [...e.querySelectorAll('[data-hauptaktion]')].map((x) => x.dataset.befehl)
            : [],
        };
      }, selektor);
      kennzeichnung.push({ zustand, element, ...info });
      await z.seite.close();
    }
    return { befehl_kanten, wunsch, verwerfen, anhalten, unbekannt, kennzeichnung };
  },

  async simulation({ browser, basis }) {
    const r = await neu(browser, basis, 'simulation');
    const reiter = await r.seite.evaluate(() => {
      const p = window.__pruef;
      const modell = document.querySelector('[data-zone="modell"]');
      return {
        kopf_reiter: [
          ...document.querySelectorAll('[data-zone="kopf"] [data-muster="Arbeitsbereiche"] button'),
        ].map((b) => p.text(b)),
        modell_zone_muster_kandidaten: [...modell.querySelectorAll('[data-muster-kandidat]')]
          .filter(p.sichtbar)
          .map((e) => ({ wert: e.dataset.musterKandidat, rechteck: p.rechteck(e) })),
        modellzone: p.rechteck(modell),
        zonen: [...document.querySelectorAll('[data-zone]')].map((e) => ({
          zone: e.dataset.zone,
          sichtbar: p.sichtbar(e),
          rechteck: p.rechteck(e),
        })),
        panels: [...document.querySelectorAll('[data-panel]')]
          .filter(p.sichtbar)
          .map((e) => e.dataset.panel),
      };
    });
    reiter.aufbau = await lies.aufbau(r.seite);
    const kennzeichnung = {
      legende_texte: await r.seite.evaluate(() =>
        window.__pruef.texte(document.querySelector('[data-muster-kandidat="Legende"]')),
      ),
      inspektor_texte: (await lies.inspektor(r.seite)).texte,
    };
    await r.seite.close();

    const k = await neu(browser, basis, 'simulation');
    const max = () =>
      k.seite.evaluate(
        () => document.querySelector('[data-legende-max]')?.textContent.trim() ?? '',
      );
    const legende_max_vorher = await max();
    await k.lauf.klick(ZEILE('sim-kraft'));
    await k.lauf.tippen('[data-zone="inspektor"] input[data-name="kraft"]', '200');
    const kraft_200 = {
      legende_max_vorher,
      legende_max: await max(),
      modell: await lies.modell(k.seite),
    };
    await k.seite.close();

    const s = await neu(browser, basis, 'simulation');
    const treffer = await suchen(s.lauf, 'Kraft');
    await s.seite.close();
    return { reiter, kraft_200, suche_kraft: { treffer }, kennzeichnung };
  },

  /** Je 20 Messungen: Eingabe bis zum zweiten gezeichneten Bild, p95 in ms. */
  async messen({ browser, basis }) {
    const N = 20;
    const { seite, lauf } = await neu(browser, basis, 'halter');
    const gezeichnet = () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    void gezeichnet;
    const messeKlick = (selektor) =>
      seite.evaluate(async (sel) => {
        const e = document.querySelector(sel);
        const t0 = performance.now();
        e.click();
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return performance.now() - t0;
      }, selektor);
    const messeHover = (selektor) =>
      seite.evaluate(async (sel) => {
        const e = document.querySelector(sel);
        const t0 = performance.now();
        e.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const ms = performance.now() - t0;
        e.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
        return ms;
      }, selektor);
    const auswahl = [];
    const hover = [];
    const darstellung = [];
    const live = [];
    const suche = [];
    await lauf.klick(ZEILE('grundplatte'));
    for (let i = 0; i < N; i++) {
      auswahl.push(await messeKlick(ZEILE(i % 2 ? 'grundplatte' : 'steg')));
      hover.push(await messeHover(ZEILE(i % 2 ? 'bohrungen' : 'steg')));
      darstellung.push(
        await seite.evaluate(async () => {
          const t0 = performance.now();
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w', bubbles: true }));
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
          return performance.now() - t0;
        }),
      );
      await seite.click(ZEILE('grundplatte'));
      live.push(
        await seite.evaluate(async (n) => {
          const feld = document.querySelector('input[data-name="dicke"]');
          feld.focus();
          const t0 = performance.now();
          feld.value = `${8 + (n % 5)}`;
          feld.dispatchEvent(new Event('input', { bubbles: true }));
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
          const ms = performance.now() - t0;
          feld.value = '8 mm';
          feld.dispatchEvent(new Event('input', { bubbles: true }));
          feld.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          return ms;
        }, i),
      );
      await seite.keyboard.press('Escape');
      await seite.keyboard.press('Control+K');
      const t0 = Date.now();
      await seite.keyboard.type('Ver');
      await seite.waitForSelector('[data-suche] [role="option"]');
      await zeichnen(seite);
      suche.push(Date.now() - t0);
      await seite.keyboard.press('Escape');
    }
    await seite.close();
    return {
      auswahl_p95_ms: p95(auswahl),
      hover_p95_ms: p95(hover),
      wert_live_p95_ms: p95(live),
      darstellung_p95_ms: p95(darstellung),
      suche_p95_ms: p95(suche),
    };
  },
};
