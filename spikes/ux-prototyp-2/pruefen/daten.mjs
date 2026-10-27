// Prüfbefehle `crud`, `kontextmenue`, `registerprobe`, `inventar`, `tastatur` (Befehle, Menüs, Tastatur).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { MOD, Lauf, adresse, bildPfad, lies, oeffnen, schliessen } from './grundlage.mjs';
import { leererPunkt, trefferPunkt } from './auswahl.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;
const TITEL = {
  anlegen: 'Neu anlegen',
  umbenennen: 'Umbenennen',
  duplizieren: 'Duplizieren',
  verwerfen: 'Verwerfen',
};

const dickeVon = (modell) => {
  const lauf = (e) => (e.id === 'grundplatte' ? [e] : e.content.flatMap(lauf));
  return lauf(modell)[0]?.params.dicke.value;
};

/** Eine Operation auf einem Weg messen: neue Protokolleinträge und neue Verlaufseinträge. */
async function messen(browser, basis, fn, zustand = 'halter') {
  const o = await oeffnen(browser, adresse(basis, zustand));
  const lauf = new Lauf(o.seite);
  const p0 = (await lies.protokoll(o.seite)).length;
  const v0 = await lies.verlauf(o.seite);
  await fn(lauf, o.seite);
  const protokoll = await lies.protokoll(o.seite);
  const v1 = await lies.verlauf(o.seite);
  await schliessen(o);
  return { protokoll_neu: protokoll.slice(p0), verlauf_neu: v1 - v0 };
}

async function suchen(lauf, titel) {
  await lauf.taste(`${MOD}+k`);
  await lauf.text(titel);
  await lauf.taste('Enter');
}

async function chatten(lauf, text) {
  await lauf.klick('[data-chat-eingabe]');
  await lauf.text(text);
  await lauf.taste('Enter');
  await lauf.klick('[data-befehl="chat.uebernehmen"]');
}

async function namenTippen(lauf, name) {
  await lauf.seite.waitForSelector('input[data-umbenennen]');
  await lauf.seite.keyboard.press(`${MOD}+a`);
  await lauf.text(name);
  await lauf.taste('Enter');
}

async function operationen(browser, basis) {
  const liste = [];
  const nimm = async (operation, weg, befehl, fn, zustand) => {
    const r = await messen(browser, basis, fn, zustand);
    liste.push({ operation, weg, befehl, ...r });
  };
  const waehleSteg = (l) => l.klick(ZEILE('steg'));
  const rechtsAufZeile = async (l, id) => {
    await l.seite.click(ZEILE(id), { button: 'right' });
    l.eingaben += 1;
    await l.warte();
  };
  const imMenue = (l, befehl) => l.klick(`.kontextmenue [data-befehl="${befehl}"]`);

  // anlegen
  await nimm('anlegen', 'menue', 'element.anlegen', async (l) => {
    await l.klick('[data-menue-trigger="start"]');
    await l.klick('.popup [data-befehl="element.anlegen"]');
  });
  await nimm('anlegen', 'suche', 'element.anlegen', (l) => suchen(l, TITEL.anlegen));
  await nimm('anlegen', 'kontextmenue', 'element.anlegen', async (l) => {
    const s = await lies.zone(l.seite, 'struktur');
    await l.rechtsklickPunkt({ x: s.x + s.breite / 2, y: s.y + s.hoehe - 100 });
    await imMenue(l, 'element.anlegen');
  });
  await nimm('anlegen', 'chat', 'element.anlegen', (l) => chatten(l, 'Lege ein neues Teil an'));
  // umbenennen
  await nimm('umbenennen', 'kontextmenue', 'element.umbenennen', async (l) => {
    await waehleSteg(l);
    await rechtsAufZeile(l, 'steg');
    await imMenue(l, 'element.umbenennen');
    await namenTippen(l, 'Rippe');
  });
  await nimm('umbenennen', 'suche', 'element.umbenennen', async (l) => {
    await waehleSteg(l);
    await suchen(l, TITEL.umbenennen);
    await namenTippen(l, 'Rippe');
  });
  await nimm('umbenennen', 'kuerzel', 'element.umbenennen', async (l) => {
    await waehleSteg(l);
    await l.taste('F2');
    await namenTippen(l, 'Rippe');
  });
  await nimm('umbenennen', 'eigenschaften', 'element.umbenennen', async (l) => {
    await waehleSteg(l);
    await l.doppelklick('[data-zone="eigenschaften"] [data-name-feld]');
    await namenTippen(l, 'Rippe');
  });
  // duplizieren
  await nimm('duplizieren', 'menue', 'element.duplizieren', async (l) => {
    await waehleSteg(l);
    await l.klick('[data-menue-trigger="dropdown:Bearbeiten"]');
    await l.klick('.popup [data-befehl="element.duplizieren"]');
  });
  await nimm('duplizieren', 'kontextmenue', 'element.duplizieren', async (l) => {
    await waehleSteg(l);
    await rechtsAufZeile(l, 'steg');
    await imMenue(l, 'element.duplizieren');
  });
  await nimm('duplizieren', 'suche', 'element.duplizieren', async (l) => {
    await waehleSteg(l);
    await suchen(l, TITEL.duplizieren);
  });
  await nimm('duplizieren', 'chat', 'element.duplizieren', (l) =>
    chatten(l, 'Dupliziere den Steg'),
  );
  await nimm('duplizieren', 'kuerzel', 'element.duplizieren', async (l) => {
    await waehleSteg(l);
    await l.taste(`${MOD}+d`);
  });
  // verwerfen
  await nimm('verwerfen', 'kontextmenue', 'element.verwerfen', async (l) => {
    await waehleSteg(l);
    await rechtsAufZeile(l, 'steg');
    await imMenue(l, 'element.verwerfen');
  });
  await nimm('verwerfen', 'suche', 'element.verwerfen', async (l) => {
    await waehleSteg(l);
    await suchen(l, TITEL.verwerfen);
  });
  await nimm('verwerfen', 'kuerzel', 'element.verwerfen', async (l) => {
    await waehleSteg(l);
    await l.taste('Delete');
  });
  await nimm('verwerfen', 'chat', 'element.verwerfen', (l) => chatten(l, 'Verwirf den Steg'));
  // wert-setzen
  await nimm('wert-setzen', 'eigenschaften', 'element.wert-setzen', async (l) => {
    await l.klick(ZEILE('grundplatte'));
    await l.tippen('[data-feld-eingabe="dicke"]', '12');
  });
  await nimm('wert-setzen', 'griff', 'element.wert-setzen', async (l) => {
    await l.klick(ZEILE('grundplatte'));
    await griffZiehen(l, -30);
  });
  await nimm('wert-setzen', 'chat', 'element.wert-setzen', async (l) => {
    await l.klick(ZEILE('grundplatte'));
    await chatten(l, 'Grundplatte 12 mm dick');
  });
  return liste;
}

/** Griff packen, um `dy` Pixel ziehen, loslassen. */
export async function griffZiehen(lauf, dy, taste = null) {
  const r = await lies.rechteck(lauf.seite, '.griff');
  const x = r.x + r.breite / 2;
  const y = r.y + r.hoehe / 2;
  await lauf.seite.mouse.move(x, y);
  await lauf.seite.mouse.down();
  await lauf.seite.mouse.move(x, y + dy / 2, { steps: 3 });
  await lauf.seite.mouse.move(x, y + dy, { steps: 3 });
  lauf.eingaben += 3;
  await lauf.warte();
  if (taste) {
    await taste();
    await lauf.seite.mouse.up();
  } else await lauf.seite.mouse.up();
  await lauf.warte();
}

async function verwerfenAblauf(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const lauf = new Lauf(o.seite);
  const vorher = {
    modell: await lies.modell(o.seite),
    modell_hash: await o.seite.evaluate(() => window.__cee.modellHash()),
  };
  await lauf.klick(ZEILE('bohrungen'));
  await lauf.taste('Delete');
  const nach = { modell: await lies.modell(o.seite), gezeichnet: await lies.gezeichnet(o.seite) };
  await lauf.klick('[data-menue-trigger="ansicht"]');
  await lauf.klick('.popup [data-befehl="ansicht.verworfenes"]');
  const mit_zeigen = {
    struktur: (await lies.struktur(o.seite)).map((z) => ({
      name: z.name,
      durchgestrichen: z.durchgestrichen,
    })),
  };
  await lauf.klick(ZEILE('bohrungen'));
  await o.seite.click(ZEILE('bohrungen'), { button: 'right' });
  await lauf.warte();
  await lauf.klick('.kontextmenue [data-befehl="element.zurueckholen"]');
  const zurueck = {
    modell: await lies.modell(o.seite),
    modell_hash: await o.seite.evaluate(() => window.__cee.modellHash()),
  };
  const dialoge = await o.seite.evaluate(
    () => document.querySelectorAll('[aria-modal="true"],dialog:modal').length,
  );
  await schliessen(o);
  return { vorher, nach, mit_zeigen, zurueck, dialoge };
}

async function rueckgaengigAblauf(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const modell0 = await lies.modell(o.seite);
  const ausgang = { modell: modell0, dicke_mm: dickeVon(modell0) };
  const schritte = [];
  const nach = async (weg) => {
    const m = await lies.modell(o.seite);
    schritte.push({ weg, dicke_mm: dickeVon(m), verlauf: await lies.verlauf(o.seite) });
  };
  await l.klick(ZEILE('grundplatte'));
  await l.tippen('[data-feld-eingabe="dicke"]', '10');
  await nach('eigenschaften');
  await griffZiehen(l, -30);
  await nach('griff');
  const chatWert = schritte[1].dicke_mm === 17 ? 19 : 17;
  await l.klick('[data-chat-eingabe]');
  await l.text(`Grundplatte ${chatWert} mm dick`);
  await l.taste('Enter');
  await l.klick('[data-befehl="chat.uebernehmen"]');
  await nach('chat');

  const undo = [];
  const fokusse = [
    ['struktur', () => l.klick(ZEILE('steg'))],
    ['modell', async () => l.klickPunkt(await leererPunkt(o.seite))],
    ['chat', () => l.klick('[data-chat-eingabe]')],
  ];
  for (const [fokus, setzen] of fokusse) {
    await setzen();
    await l.taste(`${MOD}+z`);
    const m = await lies.modell(o.seite);
    undo.push({
      fokus,
      verlauf_nachher: await lies.verlauf(o.seite),
      dicke_mm: dickeVon(m),
      modell: m,
    });
  }
  const redo = [];
  for (let i = 0; i < 3; i++) {
    await l.taste(`${MOD}+Shift+z`);
    const m = await lies.modell(o.seite);
    redo.push({ verlauf_nachher: await lies.verlauf(o.seite), dicke_mm: dickeVon(m) });
  }
  const verlauf_vorher = await lies.verlauf(o.seite);
  await l.klick('[data-zone="menueleiste"] [data-befehl="bearbeiten.rueckgaengig"]');
  const m = await lies.modell(o.seite);
  const undo_menue = {
    verlauf_vorher,
    verlauf_nachher: await lies.verlauf(o.seite),
    dicke_mm: dickeVon(m),
  };
  await schliessen(o);
  return { ausgang, schritte, undo, redo, undo_menue };
}

// --- Kontextmenü ------------------------------------------------------------------------------------

/** Liest ein geöffnetes Kontextmenü und die Kontextaktionen im Modell. */
async function menuLesen(seite) {
  const m = await seite.evaluate(() => {
    const gruppen = [...document.querySelectorAll('.kontextmenue [role="group"]')].map((g) => ({
      name: g.dataset.gruppe,
      eintraege: [...g.querySelectorAll('[data-befehl]')].map((e) => ({
        befehl: e.dataset.befehl,
        mehr: e.dataset.mehr === 'true',
      })),
    }));
    return {
      gruppen,
      kontextaktionen: [
        ...document.querySelectorAll('[data-muster="Kontextaktionen"] [data-befehl]'),
      ].map((e) => e.dataset.befehl),
      raenge: Object.fromEntries(window.__cee.befehle().map((b) => [b.id, b.rang])),
    };
  });
  const alle = m.gruppen.flatMap((g) => g.eintraege.map((e) => e.befehl));
  return {
    gruppen: m.gruppen,
    kontextaktionen: m.kontextaktionen,
    menue_nach_rang: [...alle].sort((a, b) => m.raenge[a] - m.raenge[b]),
  };
}

async function kontextmenue({ browser, basis }) {
  const arten = [];
  const lesen = async (seite, lauf) => {
    const m = await menuLesen(seite);
    await lauf.taste('Escape');
    return m;
  };
  // Je Art: Vorbereitung (Auswahl), Ziel in Struktur, Ziel im Modell
  const plan = [
    {
      art: 'teil',
      tab: 'Sensorgehäuse',
      vor: async () => {},
      struktur: ZEILE('deckel'),
      modell: (s) => trefferPunkt(s, 'deckel'),
      waehle: (l) => l.klick(ZEILE('deckel')),
    },
    {
      art: 'schritt',
      vor: async () => {},
      struktur: ZEILE('grundplatte'),
      modell: (s) => trefferPunkt(s, 'grundplatte'),
      waehle: (l) => l.klick(ZEILE('grundplatte')),
    },
    {
      art: 'kante',
      kante: true,
      struktur: ZEILE('grundplatte'),
    },
    {
      art: 'baugruppe',
      tab: 'Sensorgehäuse',
      struktur: ZEILE('baugruppe-1'),
      modell: (s) => trefferPunkt(s, 'gehaeuse'),
      waehle: (l) => l.klick(ZEILE('baugruppe-1')),
    },
    {
      art: 'mehrfach',
      struktur: ZEILE('steg'),
      modell: (s) => trefferPunkt(s, 'steg'),
      waehle: async (l) => {
        await l.klick(ZEILE('grundplatte'));
        await l.klick(ZEILE('steg'), { modifiers: ['Shift'] });
      },
    },
    { art: 'keine' },
  ];
  for (const p of plan) {
    const eintrag = { art: p.art };
    for (const weg of ['struktur', 'modell']) {
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const l = new Lauf(o.seite);
      if (p.tab) await l.klick(`[role="tab"]:has-text("${p.tab}")`);
      if (p.kante) {
        const info = await o.seite.evaluate(() =>
          window.__cee.ansicht().projektion_von('grundplatte'),
        );
        const k = info.kanten.find((x) => x.name === 'oben-vorn');
        if (weg === 'modell') {
          await o.seite.mouse.click(k.mitte.x, k.mitte.y, { button: 'right' });
          l.eingaben += 1;
          await l.warte();
        } else {
          await l.klickPunkt(k.mitte);
          await o.seite.click(ZEILE('grundplatte'), { button: 'right' });
          l.eingaben += 1;
          await l.warte();
        }
      } else if (p.art === 'keine') {
        if (weg === 'struktur') {
          const s = await lies.zone(o.seite, 'struktur');
          await l.rechtsklickPunkt({ x: s.x + s.breite / 2, y: s.y + s.hoehe - 100 });
        } else await l.rechtsklickPunkt(await leererPunkt(o.seite));
      } else {
        await p.waehle(l, o.seite);
        if (weg === 'struktur') {
          await o.seite.click(p.struktur, { button: 'right' });
          l.eingaben += 1;
          await l.warte();
        } else {
          await l.rechtsklickPunkt(await p.modell(o.seite));
        }
      }
      eintrag[weg] = await lesen(o.seite, l);
      await schliessen(o);
    }
    arten.push(eintrag);
  }
  // Kontextaktionen bei gewähltem Element (Zustand auswahl)
  const o = await oeffnen(browser, adresse(basis, 'auswahl'));
  const l = new Lauf(o.seite);
  await l.rechtsklickPunkt(await trefferPunkt(o.seite, 'grundplatte'));
  const kontextaktionen_auswahl = await lesen(o.seite, l);
  await schliessen(o);
  return { arten, kontextaktionen_auswahl };
}

async function registerprobe({ browser, basis, optionen, wurzel }) {
  const datei = optionen.register;
  const o = await oeffnen(browser, adresse(basis, 'halter', 'hell', 'de', { register: datei }));
  const l = new Lauf(o.seite);
  await l.klick(ZEILE('steg'));
  await o.seite.click(ZEILE('steg'), { button: 'right' });
  await l.warte();
  const kontextmenue_element = (await menuLesen(o.seite)).gruppen.map((g) => ({
    name: g.name,
    eintraege: g.eintraege.map((e) => ({ befehl: e.befehl })),
  }));
  await l.taste('Escape');
  await l.klick('[data-menue-trigger="dropdown:Bearbeiten"]');
  const dropdown_bearbeiten = await o.seite.$$eval('.popup [data-befehl]', (l2) =>
    l2.map((e) => ({ befehl: e.dataset.befehl })),
  );
  await l.taste('Escape');
  await l.taste(`${MOD}+k`);
  await l.text(optionen.suche ?? '');
  const suche_treffer = await o.seite.$$eval('.suche-popup [role="option"][data-befehl]', (l2) =>
    l2.map((e) => ({ befehl: e.dataset.befehl })),
  );
  await schliessen(o);
  void wurzel;
  return { kontextmenue_element, dropdown_bearbeiten, suche_treffer };
}

async function inventar({ browser, basis, optionen, wurzel }) {
  const inv = JSON.parse(readFileSync(optionen.datei, 'utf-8'));
  const eigene = JSON.parse(readFileSync(join(wurzel, 'src', 'befehle.json'), 'utf-8')).befehle;
  const ids = new Set(eigene.map((b) => b.id));
  const zusatz = inv
    .filter((b) => b.beta && !ids.has(b.id))
    .map((b, i) => ({
      id: b.id,
      familie: b.familie,
      titel: b.titel,
      parameter: {},
      bezug: 'keine',
      rang: 2000 + i,
      wesentlich: !!b.wesentlich,
    }));
  const datei = join(wurzel, 'dist', 'register-inventar.json');
  writeFileSync(datei, JSON.stringify([...eigene, ...zusatz]));
  try {
    const o = await oeffnen(
      browser,
      adresse(basis, 'halter', 'hell', 'de', { register: 'register-inventar.json' }),
    );
    const l = new Lauf(o.seite);
    const orte = {};
    const merke = async () => {
      const paare = await o.seite.evaluate(() =>
        [...document.querySelectorAll('[data-ort] [data-befehl], [data-befehl][data-ort]')].map(
          (e) => ({
            befehl: e.dataset.befehl,
            ort: e.closest('[data-ort]').dataset.ort,
          }),
        ),
      );
      for (const p of paare) (orte[p.befehl] ??= new Set()).add(p.ort);
    };
    const dropdowns = [];
    await merke();
    const ausloeser = await o.seite.$$eval('[data-menue-trigger]', (x) =>
      x.map((e) => e.dataset.menueTrigger),
    );
    for (const id of ausloeser) {
      await l.klick(`[data-menue-trigger="${id}"]`);
      await merke();
      if (id.startsWith('dropdown:')) {
        dropdowns.push({
          name: id.slice('dropdown:'.length),
          untergruppen: await o.seite.$$eval('.popup [role="group"]', (g) =>
            g.map((x) => ({
              name: x.dataset.untergruppe,
              anzahl: x.querySelectorAll('[data-befehl]').length,
            })),
          ),
        });
      }
      await l.taste('Escape');
    }
    const registerIds = new Set(
      await o.seite.evaluate(() => window.__cee.befehle().map((b) => b.id)),
    );
    const titel = await o.seite.evaluate(() =>
      Object.fromEntries(window.__cee.befehle().map((b) => [b.id, b.titel_text])),
    );
    const platzhalter = new Set(
      await o.seite.evaluate(() =>
        window.__cee
          .befehle()
          .filter((b) => !b.wirkung)
          .map((b) => b.id),
      ),
    );
    const befehle = [];
    for (const b of inv.filter((x) => x.beta)) {
      await l.taste(`${MOD}+k`);
      await l.text(titel[b.id] ?? b.titel);
      const treffer = await o.seite.$$eval('.suche-popup [role="option"][data-befehl]', (x) =>
        x.map((e) => e.dataset.befehl),
      );
      const findet = treffer.includes(b.id);
      await merke();
      await l.taste('Escape');
      befehle.push({
        id: b.id,
        familie: b.familie,
        wirkung: !platzhalter.has(b.id),
        orte: platzhalter.has(b.id) ? ['suche-folgt'] : [...(orte[b.id] ?? [])],
        suche_findet: findet,
        im_register: registerIds.has(b.id),
      });
    }
    await schliessen(o);
    return { befehle, dropdowns };
  } finally {
    rmSync(datei, { force: true });
  }
}

// --- Tastatur ---------------------------------------------------------------------------------------

const UI = (seite) =>
  seite.evaluate(() =>
    JSON.stringify({
      zonen: window.__pruef.zonenSichtbar(),
      fokus: document.activeElement?.closest('[data-zone]')?.dataset.zone ?? null,
      fokusElement:
        document.activeElement?.dataset?.suchfeld !== undefined
          ? 'suche'
          : document.activeElement?.tagName,
      menues: [...document.querySelectorAll('.popup')].map((p) => p.dataset.ort),
      umbenennen: !!document.querySelector('input[data-umbenennen]'),
    }),
  );

const TASTEN = [
  ['Mod+K', 'suche.oeffnen', `${MOD}+k`],
  ['Mod+Z', 'bearbeiten.rueckgaengig', `${MOD}+z`],
  ['Mod+Umschalt+Z', 'bearbeiten.wiederholen', `${MOD}+Shift+z`],
  ['Mod+B', 'fenster.struktur', `${MOD}+b`],
  ['Mod+J', 'fenster.panel', `${MOD}+j`],
  ['Mod+Alt+B', 'fenster.rechts', `${MOD}+Alt+b`],
  ['F2', 'element.umbenennen', 'F2'],
  ['Mod+D', 'element.duplizieren', `${MOD}+d`],
  ['Entf', 'element.verwerfen', 'Delete'],
  ['Mod+A', 'auswahl.alles', `${MOD}+a`],
  ['F', 'ansicht.auf-auswahl', 'f'],
  ['H', 'element.ausblenden', 'h'],
  ['Alt+H', 'ansicht.alles-einblenden', 'Alt+h'],
  ['W', 'darstellung.wechseln', 'w'],
  ['F6', 'fenster.naechste-zone', 'F6'],
];

async function tastatur({ browser, basis }) {
  // F6 rundum
  const f6 = {};
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    f6.sichtbare_zonen = await o.seite.evaluate(() =>
      [...document.querySelectorAll('[data-zone]')]
        .filter(window.__pruef.sichtbar)
        .map((e) => e.dataset.zone),
    );
    f6.folge = [];
    for (let i = 0; i < f6.sichtbare_zonen.length + 1; i++) {
      await l.taste('F6');
      const zone = await o.seite.evaluate(
        () => document.activeElement?.closest('[data-zone]')?.dataset.zone ?? null,
      );
      const r = await lies.zone(o.seite, zone);
      const png = bildPfad('f6');
      await o.seite.screenshot({ path: png });
      const punkte = [];
      for (const f of [0.2, 0.4, 0.6, 0.8]) {
        punkte.push({ x: Math.round(r.x + r.breite * f), y: Math.round(r.y + 1) });
        punkte.push({ x: Math.round(r.x + r.breite * f), y: Math.round(r.y + r.hoehe - 2) });
        punkte.push({ x: Math.round(r.x + 1), y: Math.round(r.y + r.hoehe * f) });
        punkte.push({ x: Math.round(r.x + r.breite - 2), y: Math.round(r.y + r.hoehe * f) });
      }
      f6.folge.push({ zone, png, ring_punkte: punkte });
    }
    await schliessen(o);
  }
  // Esc-Kette
  const esc = {};
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick('[role="tab"]:has-text("Sensorgehäuse")');
    const punkt = await trefferPunkt(o.seite, 'gehaeuse');
    await l.doppelklickPunkt(punkt);
    await l.klickPunkt(punkt);
    await l.rechtsklickPunkt(punkt);
    const stand = async () => ({
      kontextmenue_offen: await o.seite.evaluate(() => !!document.querySelector('.kontextmenue')),
      auswahl: await lies.auswahl(o.seite),
      aktiv: (await lies.ansicht(o.seite)).aktiv,
    });
    esc.start = await stand();
    esc.druecke = [];
    for (let i = 0; i < 5; i++) {
      await l.taste('Escape');
      esc.druecke.push(await stand());
    }
    await schliessen(o);
  }
  // Kürzel
  const kuerzel = {};
  {
    const o0 = await oeffnen(browser, adresse(basis, 'halter'));
    kuerzel.register = await o0.seite.evaluate(() =>
      window.__cee.befehle().map((b) => ({ befehl: b.id, kuerzel: b.kuerzel })),
    );
    // im Menü: Kürzeltext neben dem Befehl in irgendeinem Menü
    const l0 = new Lauf(o0.seite);
    const imMenue = {};
    const ausloeser = await o0.seite.$$eval('[data-menue-trigger]', (x) =>
      x.map((e) => e.dataset.menueTrigger),
    );
    for (const id of ausloeser) {
      await l0.klick(`[data-menue-trigger="${id}"]`);
      const paare = await o0.seite.$$eval('.popup [data-befehl]', (x) =>
        x.map((e) => ({
          befehl: e.dataset.befehl,
          kbd: e.querySelector('kbd')?.textContent?.trim() ?? '',
        })),
      );
      for (const p of paare) if (p.kbd) imMenue[p.befehl] = true;
      await l0.taste('Escape');
    }
    const titel = await o0.seite.evaluate(() =>
      Object.fromEntries(window.__cee.befehle().map((b) => [b.id, b.titel_text])),
    );
    const inSuche = {};
    for (const [, befehl] of TASTEN) {
      await l0.taste(`${MOD}+k`);
      await l0.text(titel[befehl]);
      inSuche[befehl] = await o0.seite.evaluate(
        (b) => !!document.querySelector(`.suche-popup [role="option"][data-befehl="${b}"] kbd`),
        befehl,
      );
      await l0.taste('Escape');
    }
    await schliessen(o0);

    kuerzel.ausgeloest = [];
    for (const [text, befehl, taste] of TASTEN) {
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const l = new Lauf(o.seite);
      const ansichtStand = async () => ({
        ansicht: await lies.ansicht(o.seite),
        auswahl: await lies.auswahl(o.seite),
      });
      if (['F2', 'Mod+D', 'Entf', 'H'].includes(text)) await l.klick(ZEILE('steg'));
      if (text === 'F') await l.klick(ZEILE('grundplatte'));
      if (text === 'Alt+H') {
        await l.klick(ZEILE('steg'));
        await l.taste('h');
      }
      if (text === 'Mod+Umschalt+Z') {
        await l.klick(ZEILE('steg'));
        await l.taste('Delete');
        await l.taste(`${MOD}+z`);
      }
      if (text === 'Mod+Z') {
        await l.klick(ZEILE('steg'));
        await l.taste('Delete');
      }
      const p0 = (await lies.protokoll(o.seite)).length;
      const ansicht_vorher = await ansichtStand();
      const ui_vorher = await UI(o.seite);
      await l.taste(taste);
      const protokoll = await lies.protokoll(o.seite);
      kuerzel.ausgeloest.push({
        kuerzel: text,
        befehl,
        protokoll_neu: protokoll.slice(p0),
        ansicht_vorher,
        ansicht_nachher: await ansichtStand(),
        ui_vorher,
        ui_nachher: await UI(o.seite),
        im_menue: !!imMenue[befehl],
        in_suche: !!inSuche[befehl],
      });
      await schliessen(o);
    }
  }
  return { f6, esc, kuerzel };
}

export const datenBefehle = {
  async crud({ browser, basis }) {
    return {
      operationen: await operationen(browser, basis),
      verwerfen: await verwerfenAblauf(browser, basis),
      rueckgaengig: await rueckgaengigAblauf(browser, basis),
    };
  },
  kontextmenue,
  registerprobe,
  inventar,
  tastatur,
};
