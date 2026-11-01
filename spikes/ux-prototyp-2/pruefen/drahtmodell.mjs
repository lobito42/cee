// Prüfbefehle der Wireframe-Basics (ap-50, design.md Abschnitt 6): `drahtmodell befehle` und
// `drahtmodell ablauf --zustand <n> --datei <ablauf.json> [--ohne-bruecke]`. Nur Rohdaten; Urteile fällt der Test.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { MOD, Lauf, adresse, lies, oeffnen, sammler, schliessen, zeichnen } from './grundlage.mjs';

const SECHS = [
  'referenz.koordinatensystem',
  'referenz.punkt',
  'referenz.punkt-relativ',
  'referenz.gerade',
  'referenz.halbgerade',
  'referenz.strecke',
];
const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;

const kanon = (x) =>
  JSON.stringify(x, (_k, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
      : v,
  );
const hash = (x) => createHash('sha256').update(kanon(x)).digest('hex');

async function warteBereit(seite, ms = 15000) {
  await seite
    .waitForFunction(() => window.__cee.draht().bereit, null, { polling: 10, timeout: ms })
    .catch(() => undefined);
  await zeichnen(seite);
}

/** Elementverweis: ID oder `<typ>#<n>` (n-tes Wurzelelement dieses Typs, 1-basiert). */
async function aufloesen(seite, verweis) {
  const m = /^([a-z]+)#(\d+)$/.exec(verweis);
  if (!m) return verweis;
  return seite.evaluate(
    ([typ, n]) => {
      const wurzeln = window.__cee.draht().graph.filter((e) => e.type === typ);
      return wurzeln[n - 1]?.id ?? null;
    },
    [m[1], Number(m[2])],
  );
}

async function imModell(seite, p) {
  if (!p) return false;
  return seite.evaluate(({ x, y }) => {
    const c = document.querySelector('[data-zone="modell"] canvas');
    const r = c?.getBoundingClientRect();
    if (!r || x < r.left + 8 || x > r.right - 8 || y < r.top + 8 || y > r.bottom - 8) return false;
    const e = document.elementFromPoint(x, y);
    return (
      !!e && !e.closest('[data-chrome], .popup, .griff') && !!e.closest('[data-zone="modell"]')
    );
  }, p);
}

/** Bildschirmpunkt für einen Klick; liegt er außerhalb, wird die Ansicht eingepasst (wie von Hand gezoomt). */
async function zielPunkt(seite, klick) {
  const lesen = async () => {
    if (klick.modell_mm)
      return seite.evaluate((p) => window.__cee.draht_projiziere(p), klick.modell_mm);
    const id = await aufloesen(seite, klick.element);
    return seite.evaluate(([i, a]) => window.__cee.draht_bildschirm(i, a), [id, klick.anker]);
  };
  let p = await lesen();
  if (!(await imModell(seite, p))) {
    await seite.evaluate(
      (mm) => window.__cee.draht_einpassen(mm ?? undefined),
      klick.modell_mm ?? null,
    );
    await zeichnen(seite);
    p = await lesen();
  }
  return p;
}

async function befehlAusloesen(o, l, schritt) {
  const s = o.seite;
  const id = schritt.befehl;
  if (schritt.args) {
    const args = { ...schritt.args };
    if (typeof args.element === 'string') args.element = await aufloesen(s, args.element);
    await s.evaluate(([i, a]) => window.__cee.draht_befehl(i, a), [id, args]);
    await l.warte();
    return;
  }
  // wie ein Mensch: sichtbarer Knopf, sonst das Dropdown der Familie
  const knopf = s.locator(
    `[data-zone="menueleiste"] > * > [data-befehl="${id}"], [data-zone="menueleiste"] [data-befehl="${id}"]:not(.popup *)`,
  );
  if ((await knopf.count()) > 0 && (await knopf.first().isVisible())) {
    await knopf.first().click();
    l.eingaben += 1;
    await l.warte();
    return;
  }
  const familie = await s.evaluate(
    (i) => window.__cee.befehle().find((b) => b.id === i)?.familie,
    id,
  );
  const trigger = `[data-menue-trigger="dropdown:${familie}"]`;
  if (familie && (await s.$(trigger))) {
    await l.klick(trigger);
    const eintrag = s.locator(`.popup [data-befehl="${id}"]`).first();
    if ((await eintrag.count()) > 0) {
      await eintrag.click();
      l.eingaben += 1;
      await l.warte();
      return;
    }
    await l.taste('Escape');
  }
  await s.evaluate((i) => window.__cee.draht_befehl(i, {}), id);
  await l.warte();
}

async function schrittAusfuehren(o, l, schritt, basis) {
  const s = o.seite;
  if ('warten_ms' in schritt) {
    if (schritt.warten_ms > 0) await s.waitForTimeout(schritt.warten_ms);
    return;
  }
  if (schritt.befehl) return befehlAusloesen(o, l, schritt);
  if (schritt.klick) {
    const p = await zielPunkt(s, schritt.klick);
    if (!p) throw new Error(`Klickziel nicht gefunden: ${JSON.stringify(schritt.klick)}`);
    await l.klickPunkt(p, { modifiers: schritt.klick.umschalt ? ['Shift'] : [] });
    return;
  }
  if (schritt.eigenschaft) {
    const { element, feld, eingabe } = schritt.eigenschaft;
    const id = await aufloesen(s, element);
    const gewaehlt = await s.evaluate(() => window.__cee.auswahl().map((a) => a.element_id));
    if (!(gewaehlt.length === 1 && gewaehlt[0] === id)) await l.klick(ZEILE(id));
    await l.tippen(`[data-zone="eigenschaften"] [data-feld-eingabe="${feld}"]`, eingabe);
    return;
  }
  if (schritt.taste) return l.taste(schritt.taste);
  if (schritt.bruecke === 'beenden') {
    await globalThis
      .fetch(`${basis}/kernel/test-beenden`, { method: 'POST' })
      .catch(() => undefined);
    return;
  }
  throw new Error(`unbekannter Schritt: ${JSON.stringify(schritt)}`);
}

async function schnappschuss(seite, extra) {
  const d = await seite.evaluate(() => window.__cee.draht());
  const struktur = (await lies.struktur(seite)).map((z) => ({
    id: z.id,
    name: z.name,
    zustaende: z.zustaende,
  }));
  const auswahl = [...new Set((await lies.auswahl(seite)).map((a) => a.element_id))];
  const rueckmeldung = await seite.evaluate(
    () => document.querySelector('[data-muster="Rueckmeldung"]')?.textContent?.trim() ?? '',
  );
  return {
    graph: d.graph,
    graph_hash: hash(d.graph),
    ergebnis: d.ergebnis,
    szene: d.szene,
    auswahl,
    struktur,
    befunde: d.befunde,
    rueckmeldung,
    ...extra,
  };
}

async function ablauf({ browser, basis, optionen }) {
  const schritte = JSON.parse(readFileSync(optionen.datei, 'utf8'));
  const fehler = [];
  const anfragen = [];
  sammler.anfragen = anfragen;
  const o = await oeffnen(browser, adresse(basis, optionen.zustand ?? 'drahtmodell-leer'), fehler);
  const l = new Lauf(o.seite);
  await warteBereit(o.seite);
  const schnappschuesse = [];
  let gesehen = 0;
  for (const schritt of schritte) {
    const t0 = Date.now();
    await schrittAusfuehren(o, l, schritt, basis);
    await warteBereit(o.seite);
    const bereit_ms = Date.now() - t0;
    schnappschuesse.push(
      await schnappschuss(o.seite, {
        bereit_ms,
        anfragen: anfragen.slice(gesehen),
        konsolenfehler: [...fehler],
        ursprung: basis,
      }),
    );
    gesehen = anfragen.length;
  }
  await schliessen(o);
  sammler.anfragen = null;
  return { schnappschuesse };
}

async function befehle({ browser, basis }) {
  const o = await oeffnen(browser, adresse(basis, 'drahtmodell-beispiel'));
  const s = o.seite;
  const l = new Lauf(s);
  await warteBereit(s);
  const register = await s.evaluate(() => window.__cee.befehle());
  const orte = Object.fromEntries(SECHS.map((id) => [id, []]));
  const merke = (id, ort) => orte[id] && !orte[id].includes(ort) && orte[id].push(ort);

  // Dropdowns der Menüleiste
  const ausloeser = await s.$$eval(
    '[data-zone="menueleiste"] [data-menue-trigger^="dropdown:"]',
    (l2) => l2.map((e) => e.dataset.menueTrigger),
  );
  for (const t of ausloeser) {
    await l.klick(`[data-menue-trigger="${t}"]`);
    const ids = await s.$$eval('[data-zone="menueleiste"] .popup [data-befehl]', (x) =>
      x
        .filter((e) => e.getAttribute('aria-disabled') !== 'true' || true)
        .map((e) => e.dataset.befehl),
    );
    for (const id of ids) merke(id, 'dropdown');
    await l.taste('Escape');
  }
  // Suche: Titel eingeben, Treffer lesen
  for (const id of SECHS) {
    const titel = register.find((b) => b.id === id)?.titel_text ?? id;
    await l.taste(`${MOD}+k`);
    await s.keyboard.type(titel);
    await l.warte();
    const treffer = await s.$$eval('.suche-popup [data-befehl]', (x) =>
      x.map((e) => e.dataset.befehl),
    );
    if (treffer.includes(id)) merke(id, 'suche');
    await l.taste('Escape');
  }
  // Kontextaktionen und Kontextmenü: ein gewählter Punkt, zwei gewählte Punkte
  const lesenKontext = async (ort) => {
    const ids = await s.$$eval('[data-muster="Kontextaktionen"] [data-befehl]', (x) =>
      x.map((e) => e.dataset.befehl),
    );
    for (const id of ids) merke(id, ort);
  };
  const klick = async (id, umschalt = false) => {
    const p = await zielPunkt(s, { element: id });
    await l.klickPunkt(p, { modifiers: umschalt ? ['Shift'] : [] });
  };
  await klick('P1');
  await lesenKontext('kontextaktion');
  const p1 = await zielPunkt(s, { element: 'P1' });
  await l.rechtsklickPunkt(p1);
  for (const id of await s.$$eval('.kontextmenue [data-befehl]', (x) =>
    x.map((e) => e.dataset.befehl),
  ))
    merke(id, 'kontextmenue');
  await l.taste('Escape');
  await klick('P1');
  await klick('P2', true);
  await lesenKontext('kontextaktion-mehrfach');
  await schliessen(o);
  return {
    befehle: SECHS.map((id) => {
      const b = register.find((x) => x.id === id);
      return {
        id,
        familie: b?.familie ?? null,
        untergruppe: null,
        folgt: b ? !b.wirkung : null,
        orte: orte[id],
      };
    }),
  };
}

export const drahtmodellBefehle = {
  async drahtmodell(kontext) {
    const unter = kontext.positionen[0];
    if (unter === 'befehle') return befehle(kontext);
    if (unter === 'ablauf') return ablauf(kontext);
    throw new Error(`unbekannter Unterbefehl: ${unter}`);
  },
};
