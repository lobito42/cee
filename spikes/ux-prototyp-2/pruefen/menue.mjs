// Prüfbefehle des schlanken Menüs (ap-41c): `sichtbarkeit-befehle`, `ausloesen`, `suche`.
// Nur Rohdaten; Urteile fällt der Test (design.md, Abschnitt 6).
import { MOD, Lauf, adresse, oeffnen, schliessen } from './grundlage.mjs';
import { leererPunkt, trefferPunkt } from './auswahl.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;
const TASK = (name) =>
  `[data-zone="taskleiste"] [data-befehl="task.wechseln"][data-par*="${name}"]`;
const FOLGT_TEXT = 'folgt in einer späteren Stufe';

const folgtMap = (seite) =>
  seite.evaluate(() => Object.fromEntries(window.__cee.befehle().map((b) => [b.id, !b.wirkung])));

const eintraegeLesen = (seite, wurzel, folgt) =>
  seite
    .$$eval(`${wurzel} [data-befehl]`, (l) =>
      l.map((e) => ({ befehl: e.dataset.befehl, aus: e.getAttribute('aria-disabled') })),
    )
    .then((l) => l.map((e) => ({ befehl: e.befehl, folgt: folgt[e.befehl] === true })));

async function dropdownsLesen(seite, lauf, folgt) {
  const ausloeser = await seite.$$eval(
    '[data-zone="menueleiste"] [data-menue-trigger^="dropdown:"]',
    (l) => l.map((e) => ({ id: e.dataset.menueTrigger, name: e.textContent.trim() })),
  );
  const aus = [];
  for (const a of ausloeser) {
    await lauf.klick(`[data-menue-trigger="${a.id}"]`);
    const gruppen = await seite.$$eval('[data-zone="menueleiste"] .popup [role="group"]', (g) =>
      g.map((x) => ({
        name: x.dataset.untergruppe,
        befehle: [...x.querySelectorAll('[data-befehl]')].map((e) => e.dataset.befehl),
      })),
    );
    aus.push({
      name: a.name,
      untergruppen: gruppen.map((g) => ({
        name: g.name,
        eintraege: g.befehle.map((befehl) => ({ befehl, folgt: folgt[befehl] === true })),
      })),
    });
    await lauf.taste('Escape');
  }
  return aus;
}

async function alleBefehleLesen(seite, lauf, folgt) {
  await lauf.taste(`${MOD}+k`);
  await seite.keyboard.type('Alle Befehle');
  await lauf.taste('Enter');
  const sichtbar = await eintraegeLesen(seite, '.suche-popup [data-gruppe="Befehle"]', folgt);
  const folgtSpaeter = await eintraegeLesen(seite, '.suche-popup [data-folgt-spaeter]', folgt);
  await lauf.taste('Escape');
  return { sichtbar, folgt_spaeter: folgtSpaeter };
}

async function taskleisteLesen(browser, basis, name) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  if (name === 'Simulation') await l.klick(TASK('simulation'));
  const folgt = await folgtMap(o.seite);
  await l.klick('[data-menue-trigger="start"]');
  const start = await eintraegeLesen(o.seite, '[data-zone="menueleiste"] .popup', folgt);
  await l.taste('Escape');
  const dropdowns = await dropdownsLesen(o.seite, l, folgt);
  const leiste = await eintraegeLesen(o.seite, '.ansichtsleiste > button', folgt);
  let aufklapp = [];
  if (await o.seite.$('.ansichtsleiste [data-menue-trigger="ansicht"]')) {
    await l.klick('.ansichtsleiste [data-menue-trigger="ansicht"]');
    aufklapp = await eintraegeLesen(o.seite, '.ansichtsleiste .popup', folgt);
    await l.taste('Escape');
  }
  const alle = await alleBefehleLesen(o.seite, l, folgt);
  await schliessen(o);
  return {
    name,
    start_menue: start,
    dropdowns,
    ansichtsleiste: leiste,
    ansichtsleiste_aufklappmenue: aufklapp,
    alle_befehle: alle,
  };
}

// --- ausloesen -----------------------------------------------------------------------------------

/** Bereitet einen Zustand vor, damit Kontextmenü und Kontextaktionen erreichbar sind. */
async function kontextOeffnen(o, l, zustand) {
  if (zustand === 'halter') await l.klick(ZEILE('grundplatte'));
  await l.rechtsklickPunkt(await trefferPunkt(o.seite, 'grundplatte'));
}

async function menueOeffnen(o, l, zustand, menue) {
  if (menue === 'start-menue') await l.klick('[data-menue-trigger="start"]');
  else if (menue.startsWith('dropdown:')) await l.klick(`[data-menue-trigger="${menue}"]`);
  else {
    await kontextOeffnen(o, l, zustand);
    if (menue === 'kontextmenue-mehr') {
      for (const k of await o.seite.$$('.kontextmenue .mehr-knopf')) await k.dispatchEvent('click');
      await l.warte();
    }
  }
}

const wurzelVon = (menue) =>
  menue === 'kontextaktion'
    ? '[data-muster="Kontextaktionen"]'
    : menue === 'kontextmenue'
      ? '.kontextmenue :not(.mehr) > [data-befehl]:not([data-mehr="true"])'
      : menue === 'kontextmenue-mehr'
        ? '.kontextmenue [data-mehr="true"]'
        : '[data-zone="menueleiste"] .popup';

async function eintraegeAuflisten(browser, basis, zustand) {
  const o = await oeffnen(browser, adresse(basis, zustand));
  const l = new Lauf(o.seite);
  const liste = [];
  const sammle = async (menue) => {
    await menueOeffnen(o, l, zustand, menue);
    const w = wurzelVon(menue);
    const sel = w.includes('[data-befehl]') || w.includes('data-mehr') ? w : `${w} [data-befehl]`;
    const ids = await o.seite.$$eval(sel, (e) =>
      e
        .filter((x) => x.getAttribute('aria-disabled') !== 'true')
        .map((x) => x.dataset.befehl)
        .filter(Boolean),
    );
    for (const befehl of new Set(ids)) liste.push({ menue, befehl });
    await l.taste('Escape');
    await l.taste('Escape');
  };
  await sammle('start-menue');
  const namen = await o.seite.$$eval(
    '[data-zone="menueleiste"] [data-menue-trigger^="dropdown:"]',
    (e) => e.map((x) => x.dataset.menueTrigger),
  );
  for (const n of namen) await sammle(n);
  await sammle('kontextmenue');
  await sammle('kontextmenue-mehr');
  // Kontextaktionen stehen nach dem Rechtsklick im Modell
  await kontextOeffnen(o, l, zustand);
  const ak = await o.seite.$$eval('[data-muster="Kontextaktionen"] [data-befehl]', (e) =>
    e.filter((x) => x.getAttribute('aria-disabled') !== 'true').map((x) => x.dataset.befehl),
  );
  for (const befehl of new Set(ak)) liste.push({ menue: 'kontextaktion', befehl });
  await schliessen(o);
  return liste;
}

async function eintragAusloesen(browser, basis, zustand, { menue, befehl }) {
  const fehler = [];
  const o = await oeffnen(browser, adresse(basis, zustand), fehler);
  const l = new Lauf(o.seite);
  await menueOeffnen(o, l, zustand, menue);
  const vorher = await o.seite.evaluate(() => window.__cee.ausgeloest().length);
  const sel =
    menue === 'kontextaktion'
      ? `[data-muster="Kontextaktionen"] [data-befehl="${befehl}"]`
      : `.popup [data-befehl="${befehl}"]`;
  await o.seite.locator(sel).first().dispatchEvent('click');
  await l.warte();
  const nach = await o.seite.evaluate(
    (v) => ({
      neu: window.__cee.ausgeloest().slice(v),
      texte: window.__pruef.texte(document.body),
    }),
    vorher,
  );
  const r = {
    menue,
    befehl,
    ausgeloest_neu: nach.neu,
    folgt_texte: nach.texte.filter((t) => t.includes(FOLGT_TEXT)).length,
    konsolenfehler: fehler,
  };
  await schliessen(o);
  return r;
}

// --- suche ---------------------------------------------------------------------------------------

const zustandLesen = (seite) =>
  seite.evaluate(() => ({
    hash: window.__cee.modellHash(),
    ansicht: JSON.stringify(window.__pruef.ansicht()),
    protokoll: window.__cee.protokoll().length,
    rueckmeldungen: window.__pruef.texte(
      document.querySelector('[data-muster="Rueckmeldung"]') ?? document.body,
    ),
  }));

async function sucheOeffnen(o, l, text) {
  await l.taste(`${MOD}+k`);
  await o.seite.keyboard.type(text);
  await l.warte();
}

const gruppenLesen = (seite, folgt) =>
  seite.evaluate((fm) => {
    const gruppen = [...document.querySelectorAll('.suche-popup [data-gruppe]')].map((g) => ({
      name: g.dataset.gruppe,
      treffer: [...g.querySelectorAll('[data-befehl]')].map((e) => ({
        befehl: e.dataset.befehl,
        folgt: fm[e.dataset.befehl] === true,
        sichtbar: window.__pruef.sichtbar(e),
      })),
    }));
    const erste = [...document.querySelectorAll('.suche-popup [data-gruppe] [data-befehl]')].find(
      (e) => fm[e.dataset.befehl] !== true,
    );
    return {
      gruppen,
      erster_treffer: erste ? { befehl: erste.dataset.befehl, folgt: false } : null,
    };
  }, folgt);

async function sucheEingabe(browser, basis, text) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const folgt = await folgtMap(o.seite);
  await sucheOeffnen(o, l, text);
  const g = await gruppenLesen(o.seite, folgt);
  const vorher = await zustandLesen(o.seite);
  const n = await o.seite.evaluate(() => window.__cee.ausgeloest().length);
  await l.taste('Enter');
  const nachher = await zustandLesen(o.seite);
  const neu = await o.seite.evaluate((v) => window.__cee.ausgeloest().slice(v), n);
  await schliessen(o);
  return {
    text,
    gruppen: g.gruppen,
    erster_treffer: g.erster_treffer,
    enter: {
      befehl: neu[0]?.befehl ?? null,
      modell_hash_vorher: vorher.hash,
      modell_hash_nachher: nachher.hash,
      ausgeloest_neu: neu.map((a) => ({ befehl: a.befehl, wirkung: a.wirkung })),
    },
  };
}

async function sucheKlick(browser, basis, text) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  await sucheOeffnen(o, l, text);
  const vorher = await zustandLesen(o.seite);
  const sel = '.suche-popup [data-folgt-spaeter] [data-befehl]';
  const treffer = await o.seite.$eval(sel, (e) => ({
    befehl: e.dataset.befehl,
    titel: e.querySelector('.titel')?.textContent.trim() ?? '',
  }));
  await l.klick(sel);
  const nachher = await zustandLesen(o.seite);
  await schliessen(o);
  return {
    treffer,
    modell_hash_vorher: vorher.hash,
    modell_hash_nachher: nachher.hash,
    ansicht_vorher: vorher.ansicht,
    ansicht_nachher: nachher.ansicht,
    protokoll_laenge_vorher: vorher.protokoll,
    protokoll_laenge_nachher: nachher.protokoll,
    rueckmeldungen: nachher.rueckmeldungen,
  };
}

export const menueBefehle = {
  async 'sichtbarkeit-befehle'({ browser, basis }) {
    const taskleisten = [];
    for (const name of ['Modellieren', 'Simulation'])
      taskleisten.push(await taskleisteLesen(browser, basis, name));
    return { taskleisten };
  },

  async ausloesen({ browser, basis }) {
    const zustaende = [];
    for (const zustand of ['halter', 'auswahl']) {
      const liste = await eintraegeAuflisten(browser, basis, zustand);
      const eintraege = [];
      for (const e of liste) eintraege.push(await eintragAusloesen(browser, basis, zustand, e));
      zustaende.push({ zustand, eintraege });
    }
    return { zustaende };
  },

  async suche({ browser, basis, alle }) {
    const eingaben = [];
    for (const text of alle.eingabe ?? []) eingaben.push(await sucheEingabe(browser, basis, text));
    const klick = alle.klick?.[0] ? await sucheKlick(browser, basis, alle.klick[0]) : null;
    return { eingaben, klick };
  },
};

void leererPunkt;
