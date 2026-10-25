// Prüfbefehle `rueckmeldung` und `anwesenheit` (design.md: Rückmeldung und Fehler, Andere Personen).
import { Lauf, adresse, lies, oeffnen, schliessen } from './grundlage.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;

/** Orte der Rückmeldungen: Statusanzeigen, Befunde, Rückmeldezeile, Dialoge und fremde Elemente. */
const orte = (seite) =>
  seite.evaluate(() => {
    const p = window.__pruef;
    const zone = (e) => p.zone(e);
    const sicht = (selektor) => [...document.querySelectorAll(selektor)].filter(p.sichtbar);
    return {
      statusanzeigen: sicht('[data-muster="Statusanzeige"]').map((e) => ({
        ort: zone(e),
        element: e.dataset.element ?? null,
        zustand: e.dataset.zustand ?? null,
      })),
      befunde: sicht('[data-muster="Befund"]').map((e) => ({ ort: zone(e) })),
      rueckmeldungen: sicht('[data-muster="Rueckmeldung"]').map((e) => ({
        ort: zone(e),
        text: p.text(e),
      })),
      dialoge: document.querySelectorAll('[aria-modal="true"],dialog:modal').length,
      ausserhalb_zonen: sicht('[data-overlay], [role="dialog"], [role="alertdialog"]')
        .filter((e) => !e.closest('[data-zone]'))
        .map((e) => `${e.tagName.toLowerCase()}[${e.dataset.overlay ?? e.getAttribute('role')}]`),
    };
  });

async function rueckmeldung(browser, basis) {
  const ergebnis = {};
  {
    const o = await oeffnen(
      browser,
      adresse(basis, 'halter', 'hell', 'de', { rechenzeit: '2500' }),
    );
    const l = new Lauf(o.seite);
    await l.klick(ZEILE('grundplatte'));
    await l.tippen('[data-feld-eingabe="dicke"]', '12');
    ergebnis.rechnet = await orte(o.seite);
    await schliessen(o);
  }
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick(ZEILE('bohrungen'));
    await l.tippen('[data-feld-eingabe="durchmesser"]', '55');
    ergebnis.ungueltig = await orte(o.seite);
    await schliessen(o);
  }
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick(ZEILE('steg'));
    await l.taste('Control+d');
    ergebnis.bestaetigung = await orte(o.seite);
    await schliessen(o);
  }
  // Das Modell zerbricht nie
  {
    const konsolenfehler = [];
    const o = await oeffnen(browser, adresse(basis, 'befund'), konsolenfehler);
    const l = new Lauf(o.seite);
    const schritte = [];
    const schritt = async (aktion, fn, pruefung) => {
      await fn();
      schritte.push({ aktion, ok: !!(await pruefung()) });
    };
    const laenge = async (id, name) => {
      const m = await lies.modell(o.seite);
      const finde = (e) => (e.id === id ? [e] : e.content.flatMap(finde));
      return finde(m)[0]?.params[name]?.value;
    };
    await schritt(
      'Grundplatte wählen',
      () => l.klick(ZEILE('grundplatte')),
      async () => {
        return (
          JSON.stringify((await lies.auswahl(o.seite)).map((a) => a.element_id)) ===
          '["grundplatte"]'
        );
      },
    );
    await schritt(
      'Grundplatte ändern',
      () => l.tippen('[data-feld-eingabe="laenge"]', '90'),
      async () => {
        return (await laenge('grundplatte', 'laenge')) === 90;
      },
    );
    await schritt(
      'Grundplatte ausblenden',
      () => l.klick(`${ZEILE('grundplatte')} .auge`),
      async () => {
        return (await lies.ansicht(o.seite)).ausgeblendet.includes('grundplatte');
      },
    );
    await schritt(
      'Steg wählen',
      () => l.klick(ZEILE('steg')),
      async () => {
        return (
          JSON.stringify((await lies.auswahl(o.seite)).map((a) => a.element_id)) === '["steg"]'
        );
      },
    );
    await schritt(
      'Steg ändern',
      () => l.tippen('[data-feld-eingabe="hoehe"]', '35'),
      async () => {
        return (await laenge('steg', 'hoehe')) === 35;
      },
    );
    await schritt(
      'Steg ausblenden',
      () => l.klick(`${ZEILE('steg')} .auge`),
      async () => {
        return (await lies.ansicht(o.seite)).ausgeblendet.includes('steg');
      },
    );
    // Korrektur im Panel „Befunde“
    await l.klick('[data-zone="panel"] [data-befehl="element.wert-setzen"]');
    const zeile = await o.seite.evaluate(
      (s) => window.__pruef.zeile(document.querySelector(s)),
      ZEILE('bohrungen'),
    );
    const befunde = await o.seite.evaluate(() =>
      [...document.querySelectorAll('[data-muster="Befund"]')]
        .filter(window.__pruef.sichtbar)
        .map((e) => e.textContent.trim()),
    );
    ergebnis.zerbricht = {
      schritte,
      konsolenfehler,
      bohrungen_zustaende: zeile.zustaende,
      befunde,
    };
    await schliessen(o);
  }
  return ergebnis;
}

async function anwesenheit(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'andere'));
  const andere = await o.seite.evaluate(() => {
    const z = document.querySelector('[data-zeiger]');
    return {
      steg_zustaende: window.__cee.zustaende('steg').modell?.zustaende ?? [],
      zeiger: {
        name: window.__pruef.text(z?.querySelector('.name')),
        texte: z ? window.__pruef.texte(z) : [],
      },
    };
  });
  await o.seite.waitForTimeout(5000);
  await o.seite.goto(adresse(basis, 'halter'));
  await o.seite.waitForSelector('html[data-bereit="1"]');
  const speicher = await o.seite.evaluate(async () => {
    const local = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      local.push({ key, value: window.localStorage.getItem(key) });
    }
    const session = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i);
      session.push({ key, value: window.sessionStorage.getItem(key) });
    }
    const dbs = window.indexedDB.databases ? await window.indexedDB.databases() : [];
    return {
      local,
      session,
      indexeddb: dbs.map((d) => d.name),
      cookies: document.cookie ? document.cookie.split(';').map((c) => c.trim()) : [],
    };
  });
  const halter = await o.seite.evaluate(() => ({
    zustaende_je_element: window.__cee.elemente().map((id) => ({
      id,
      zustaende: Object.values(window.__cee.zustaende(id)).flatMap((d) => d?.zustaende ?? []),
    })),
    texte: window.__pruef.texte(document.body),
  }));
  await schliessen(o);
  return { andere, speicher, halter };
}

export const rueckmeldungBefehle = {
  async rueckmeldung({ browser, basis }) {
    return rueckmeldung(browser, basis);
  },
  async anwesenheit({ browser, basis }) {
    return anwesenheit(browser, basis);
  },
};
