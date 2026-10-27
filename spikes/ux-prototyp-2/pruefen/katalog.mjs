// Prüfbefehl `katalog`: Seiten des Bausteinkatalogs als PNG und Rohdaten, Abgleich mit dem Prototyp.
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Lauf, MOD, adresse, oeffnen, schliessen } from './grundlage.mjs';
import { trefferPunkt } from './auswahl.mjs';

const katalogAdresse = (basis, baustein, thema = 'hell') =>
  `${basis}/?katalog${baustein ? `=${baustein}` : ''}&thema=${thema}&sprache=de&tempo=0`;

const eindeutig = (liste) => {
  const m = new Map(liste.map((k) => [JSON.stringify(Object.entries(k).sort()), k]));
  return [...m.values()];
};

async function seiten(browser, basis, out) {
  const u = await oeffnen(browser, katalogAdresse(basis, ''));
  const ids = await u.seite.$$eval('[data-katalog-link]', (l) =>
    l.map((e) => e.dataset.katalogLink),
  );
  await schliessen(u);
  const aus = [];
  for (const id of ids) {
    const o = await oeffnen(browser, katalogAdresse(basis, id));
    await o.seite.addStyleTag({
      content:
        'html,body{height:auto !important;overflow:visible !important}.katalog{height:auto !important;overflow:visible !important}',
    });
    const meta = await o.seite.evaluate(() => {
      const regel = document.querySelector('[data-regel]');
      const bezug = document.querySelector('[data-bezug]');
      return {
        regel_schluessel: regel?.dataset.schluessel ?? '',
        regel_text: (regel?.textContent ?? '').trim(),
        art: bezug?.dataset.art ?? '',
        name: bezug?.dataset.name ?? '',
        adrs: JSON.parse(bezug?.dataset.adrs ?? '[]'),
        kandidat_attr: !!document.querySelector('[data-muster-kandidat]'),
      };
    });
    const bilder = {};
    for (const thema of ['hell', 'dunkel']) {
      const datei = join(out, `${id}-${thema}.png`);
      await o.seite.locator(`[data-bild="${thema}"]`).screenshot({ path: datei });
      bilder[thema] = datei;
    }
    aus.push({
      baustein: id,
      bild_hell: bilder.hell,
      bild_dunkel: bilder.dunkel,
      regel_schluessel: meta.regel_schluessel,
      regel_text: meta.regel_text,
      bezug: { art: meta.art, name: meta.name },
      kandidat_attr: meta.kandidat_attr,
      adrs: meta.adrs,
    });
    await schliessen(o);
  }
  return aus;
}

/** Kanäle aller Elemente mit Zuständen, in allen Darstellungen (Rohdaten der Seite). */
const kanaeleDerSeite = (seite) =>
  seite.evaluate(() =>
    window.__cee.elemente().flatMap((id) => {
      const z = window.__cee.zustaende(id);
      return Object.values(z).flatMap((d) => (d && d.zustaende.length ? d.kanaele : []));
    }),
  );

async function vergleichZustaende(browser, basis) {
  const k = await oeffnen(browser, katalogAdresse(basis, 'zustaende'));
  const katalog = await k.seite.evaluate(() =>
    [...document.querySelectorAll('[data-kanaele]')].flatMap((e) => JSON.parse(e.dataset.kanaele)),
  );
  await schliessen(k);
  const prototyp = [];
  for (const zustand of ['zustaende', 'andere', 'aktiv', 'rechnet']) {
    const o = await oeffnen(browser, adresse(basis, zustand));
    prototyp.push(...(await kanaeleDerSeite(o.seite)));
    await schliessen(o);
  }
  const p = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(p.seite);
  await p.seite.click('[data-zone="struktur"] [role="treeitem"][data-id="steg"]', {
    button: 'right',
  });
  await l.warte();
  await l.klick('.kontextmenue > [data-mehr-toggle]');
  await l.klick('.kontextmenue [data-befehl="element.pausieren"]');
  await l.taste('Escape');
  prototyp.push(...(await kanaeleDerSeite(p.seite)));
  await schliessen(p);
  return { katalog: eindeutig(katalog), prototyp: eindeutig(prototyp) };
}

const menueLesen = (seite) =>
  seite.evaluate(() =>
    [...document.querySelectorAll('.kontextmenue [role="group"]')].flatMap((g) =>
      [...g.querySelectorAll('[data-befehl]')].map((e) => ({
        gruppe: g.dataset.gruppe,
        befehl: e.dataset.befehl,
        mehr: e.dataset.mehr === 'true',
      })),
    ),
  );

async function vergleichMenue(browser, basis) {
  const k = await oeffnen(browser, katalogAdresse(basis, 'kontextmenue'));
  const katalog = await k.seite.evaluate(() =>
    [...document.querySelectorAll('[data-bild="hell"] .kontextmenue [role="group"]')].flatMap((g) =>
      [...g.querySelectorAll('[data-befehl]')].map((e) => ({
        gruppe: g.dataset.gruppe,
        befehl: e.dataset.befehl,
        mehr: e.dataset.mehr === 'true',
      })),
    ),
  );
  await schliessen(k);
  const o = await oeffnen(browser, adresse(basis, 'auswahl'));
  const l = new Lauf(o.seite);
  await l.rechtsklickPunkt(await trefferPunkt(o.seite, 'grundplatte'));
  const prototyp = await menueLesen(o.seite);
  await schliessen(o);
  return { katalog, prototyp };
}

export const katalogBefehle = {
  async katalog({ browser, basis, optionen }) {
    const out = resolve(optionen.out ?? join(process.cwd(), 'katalog-ausgabe'));
    mkdirSync(out, { recursive: true });
    const seitenListe = await seiten(browser, basis, out);
    const s = await oeffnen(browser, adresse(basis, 'halter'));
    const ls = new Lauf(s.seite);
    await ls.taste(`${MOD}+k`);
    await ls.text('Katalog');
    const suche_treffer = await s.seite.$$eval('.suche-popup [role="option"][data-befehl]', (x) =>
      x.map((e) => ({ befehl: e.dataset.befehl })),
    );
    await schliessen(s);
    const a = await oeffnen(browser, katalogAdresse(basis, ''));
    const adresseErgebnis = {
      bereit: await a.seite.evaluate(() => document.documentElement.dataset.bereit),
    };
    await schliessen(a);
    const z = await vergleichZustaende(browser, basis);
    const m = await vergleichMenue(browser, basis);
    return {
      seiten: seitenListe,
      suche_treffer,
      adresse: adresseErgebnis,
      vergleich: [
        {
          baustein: 'zustaende',
          zustand: 'zustaende',
          katalog_kanaele: z.katalog,
          prototyp_kanaele: z.prototyp,
        },
        {
          baustein: 'kontextmenue',
          zustand: 'kontextmenue',
          katalog_kanaele: m.katalog,
          prototyp_kanaele: m.prototyp,
        },
      ],
    };
  },
};
