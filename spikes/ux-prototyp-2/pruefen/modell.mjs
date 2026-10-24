// Prüfbefehle `navigation`, `ziehen`, `sichtbarkeit`, `neuladen` (Modell: Navigation, Ziehen, Sichtbarkeit, Ansicht).
import { Lauf, adresse, bildPfad, lies, oeffnen, schliessen } from './grundlage.mjs';
import { leererPunkt } from './auswahl.mjs';
import { griffZiehen } from './daten.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;
const mitteVon = (z) => ({ x: z.x + z.breite / 2, y: z.y + z.hoehe / 2 });
const kamera = (seite) => seite.evaluate(() => window.__cee.ansicht().kamera);

/** Mausgeste: Taste gedrückt, ziehen, loslassen. */
async function mausZiehen(l, von, nach, taste = 'right', modifikatoren = []) {
  const s = l.seite;
  for (const m of modifikatoren) await s.keyboard.down(m);
  await s.mouse.move(von.x, von.y);
  await s.mouse.down({ button: taste });
  await s.mouse.move((von.x + nach.x) / 2, (von.y + nach.y) / 2, { steps: 4 });
  await s.mouse.move(nach.x, nach.y, { steps: 4 });
  await s.mouse.up({ button: taste });
  for (const m of modifikatoren) await s.keyboard.up(m);
  l.eingaben += 3;
  await l.warte();
}

async function touchGeste(l, anfang, ende) {
  const cdp = await l.seite.context().newCDPSession(l.seite);
  const senden = (typ, punkte) =>
    cdp.send('Input.dispatchTouchEvent', {
      type: typ,
      touchPoints: punkte.map((p, i) => ({ x: p.x, y: p.y, id: i + 1 })),
    });
  await senden('touchStart', anfang);
  const schritte = 8;
  for (let i = 1; i <= schritte; i++) {
    const t = i / schritte;
    await senden(
      'touchMove',
      anfang.map((p, k) => ({ x: p.x + (ende[k].x - p.x) * t, y: p.y + (ende[k].y - p.y) * t })),
    );
  }
  await senden('touchEnd', []);
  l.eingaben += 3;
  await l.warte();
}

async function gesten(browser, basis) {
  const liste = [];
  const messen = async (geraet, geste, fn, optionen = {}) => {
    const o = await oeffnen(browser, adresse(basis, 'halter'), undefined, optionen);
    const l = new Lauf(o.seite);
    const z = await lies.zone(o.seite, 'modell');
    const m = mitteVon(z);
    await l.klick(ZEILE('steg')); // etwas ist gewählt: die Auswahl muss die Geste überstehen
    const vorher = await kamera(o.seite);
    const auswahl0 = JSON.stringify(await lies.auswahl(o.seite));
    const modell0 = JSON.stringify(await lies.modell(o.seite));
    await fn(l, m, z);
    liste.push({
      geraet,
      geste,
      kamera_vorher: vorher,
      kamera_nachher: await kamera(o.seite),
      auswahl_gleich: JSON.stringify(await lies.auswahl(o.seite)) === auswahl0,
      modell_gleich: JSON.stringify(await lies.modell(o.seite)) === modell0,
    });
    await schliessen(o);
  };
  const rad = async (l, m, dx, dy, mods = []) => {
    await l.seite.mouse.move(m.x, m.y);
    for (const k of mods) await l.seite.keyboard.down(k);
    await l.seite.mouse.wheel(dx, dy);
    for (const k of mods) await l.seite.keyboard.up(k);
    l.eingaben += 1;
    await l.warte();
  };
  // Maus
  await messen('maus', 'drehen', (l, m) =>
    mausZiehen(l, m, { x: m.x + 120, y: m.y + 40 }, 'right'),
  );
  await messen('maus', 'verschieben', (l, m) =>
    mausZiehen(l, m, { x: m.x + 80, y: m.y + 30 }, 'middle'),
  );
  await messen('maus', 'zoomen', (l, m) => rad(l, m, 0, -300));
  // Trackpad (Rad-Ereignisse: Wischen, Wischen mit Umschalt, Spreizen als Rad mit Strg)
  await messen('trackpad', 'drehen', async (l, m) => {
    await rad(l, m, 61, 33);
  });
  await messen('trackpad', 'verschieben', (l, m) => rad(l, m, 53, 29, ['Shift']));
  await messen('trackpad', 'zoomen', (l, m) => rad(l, m, 0, -40, ['Control']));
  // Touch
  const touch = { touch: true };
  await messen(
    'touch',
    'drehen',
    (l, m) => touchGeste(l, [{ x: m.x, y: m.y }], [{ x: m.x + 120, y: m.y + 40 }]),
    touch,
  );
  await messen(
    'touch',
    'verschieben',
    (l, m) =>
      touchGeste(
        l,
        [
          { x: m.x - 40, y: m.y },
          { x: m.x + 40, y: m.y },
        ],
        [
          { x: m.x + 40, y: m.y + 30 },
          { x: m.x + 120, y: m.y + 30 },
        ],
      ),
    touch,
  );
  await messen(
    'touch',
    'zoomen',
    (l, m) =>
      touchGeste(
        l,
        [
          { x: m.x - 40, y: m.y },
          { x: m.x + 40, y: m.y },
        ],
        [
          { x: m.x - 100, y: m.y },
          { x: m.x + 100, y: m.y },
        ],
      ),
    touch,
  );
  return liste;
}

async function wirkungMitteTaste(o, l) {
  const z = await lies.zone(o.seite, 'modell');
  const m = mitteVon(z);
  const v = await kamera(o.seite);
  await mausZiehen(l, m, { x: m.x + 100, y: m.y + 40 }, 'middle');
  const n = await kamera(o.seite);
  const winkel = Math.max(
    Math.abs(n.azimut_grad - v.azimut_grad),
    Math.abs(n.hoehe_grad - v.hoehe_grad),
  );
  const weg = Math.hypot(n.ziel.x - v.ziel.x, n.ziel.y - v.ziel.y, n.ziel.z - v.ziel.z);
  const zoom = Math.abs(n.abstand_mm - v.abstand_mm) / v.abstand_mm;
  if (winkel >= 10) return 'drehen';
  if (weg >= 5) return 'verschieben';
  if (zoom >= 0.1) return 'zoomen';
  return 'keine';
}

async function profile(browser, basis) {
  const a = await oeffnen(browser, adresse(basis, 'halter'));
  const la = new Lauf(a.seite);
  const standard = await wirkungMitteTaste(a, la);
  await schliessen(a);
  const b = await oeffnen(browser, adresse(basis, 'halter'));
  const lb = new Lauf(b.seite);
  await lb.klick('[data-menue-trigger="dropdown:Fenster"]');
  await lb.klick('.popup [data-befehl="einstellung.navigationsprofil"]');
  const einstellung_nachher = await b.seite.evaluate(
    () => window.__cee.einstellung().navigationsprofil,
  );
  const zweites = await wirkungMitteTaste(b, lb);
  await schliessen(b);
  return { einstellung_nachher, mittlere_taste: { standard, zweites } };
}

async function zoomBlock(browser, basis) {
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  await l.klick(ZEILE('grundplatte'));
  await l.taste('f');
  const modellzone = await lies.zone(o.seite, 'modell');
  const huellbox = await o.seite.evaluate(
    () => window.__cee.ansicht().projektion_von('grundplatte').huellbox,
  );
  const nach_f = { huellbox, modellzone };
  // ganzes Teil: nichts gewählt, damit keine Kontur im Bild liegt
  await l.klickPunkt(await leererPunkt(o.seite));
  await l.klick('.ansichtsleiste [data-befehl="ansicht.einpassen"]');
  await o.seite.addStyleTag({ content: '[data-chrome]{visibility:hidden !important}' });
  await l.warte();
  const datei = bildPfad('einpassen');
  await o.seite.screenshot({
    path: datei,
    clip: { x: modellzone.x, y: modellzone.y, width: modellzone.breite, height: modellzone.hoehe },
  });
  const nach_einpassen = { leinwand: datei, leinwand_rechteck: modellzone, modellzone };
  await schliessen(o);
  const p = await oeffnen(browser, adresse(basis, 'halter'));
  const lp = new Lauf(p.seite);
  const projektion = [await p.seite.evaluate(() => window.__cee.ansicht().projektion)];
  await lp.klick('.ansichtsleiste [data-befehl="ansicht.projektion"]');
  projektion.push(await p.seite.evaluate(() => window.__cee.ansicht().projektion));
  await schliessen(p);
  return { nach_f, nach_einpassen, projektion };
}

// --- Ziehen -----------------------------------------------------------------------------------------

const zeigerTexte = (seite) =>
  seite.evaluate(() =>
    [...document.querySelectorAll('[data-zeigerzahl]')].map((e) => window.__pruef.text(e)),
  );

const dickeVon = (modell) => {
  const lauf = (e) => (e.id === 'grundplatte' ? [e] : e.content.flatMap(lauf));
  return lauf(modell)[0]?.params.dicke.value;
};

const zielLesen = (seite) =>
  seite.evaluate(() => {
    const e = document.querySelector('[data-ziel]');
    return {
      ziel_name: e ? window.__pruef.text(e.querySelector('.name')) : null,
      ziel_attr: e?.dataset.ziel ?? null,
    };
  });

const rueckmeldungText = (seite) =>
  seite.evaluate(() => window.__pruef.text(document.querySelector('[data-zone="rueckmeldung"]')));

async function zeileZiehen(l, vonId, nachId, danach) {
  const s = l.seite;
  const von = mitteVon(await lies.rechteck(s, ZEILE(vonId)));
  const nach = mitteVon(await lies.rechteck(s, ZEILE(nachId)));
  await s.mouse.move(von.x, von.y);
  await s.mouse.down();
  await s.mouse.move(von.x + 10, von.y + 10, { steps: 3 });
  await s.mouse.move(nach.x, nach.y, { steps: 6 });
  l.eingaben += 3;
  await l.warte();
  await danach();
  await s.mouse.up();
  await l.warte();
}

async function ziehen(browser, basis) {
  const ergebnis = {};
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick(ZEILE('grundplatte'));
    const vorher = {
      dicke_mm: dickeVon(await lies.modell(o.seite)),
      protokoll_laenge: (await lies.protokoll(o.seite)).length,
    };
    const r = await lies.rechteck(o.seite, '.griff');
    const x = r.x + r.breite / 2;
    const y = r.y + r.hoehe / 2;
    await o.seite.mouse.move(x, y);
    await o.seite.mouse.down();
    await o.seite.mouse.move(x, y - 15, { steps: 3 });
    await o.seite.mouse.move(x, y - 30, { steps: 3 });
    l.eingaben += 3;
    await l.warte();
    const waehrend = { zeiger_texte: await zeigerTexte(o.seite) };
    await l.text('12');
    await l.taste('Enter');
    await o.seite.mouse.up();
    await l.warte();
    const nach = {
      dicke_mm: dickeVon(await lies.modell(o.seite)),
      protokoll_laenge: (await lies.protokoll(o.seite)).length,
    };
    await o.seite.waitForTimeout(1100);
    ergebnis.griff = {
      vorher,
      waehrend,
      nach,
      nach_1000ms: { zeiger_texte: await zeigerTexte(o.seite) },
    };
    await schliessen(o);
  }
  const sensor = async (fn) => {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick('[role="tab"]:has-text("Sensorgehäuse")');
    const r = await fn(o, l);
    await schliessen(o);
    return r;
  };
  ergebnis.ablegen = await sensor(async (o, l) => {
    let waehrend = null;
    await zeileZiehen(l, 'deckel', 'baugruppe-1', async () => {
      waehrend = await zielLesen(o.seite);
    });
    const p = await lies.protokoll(o.seite);
    return { waehrend, nach: { modell: await lies.modell(o.seite), protokoll_neu: p } };
  });
  ergebnis.verboten = await sensor(async (o, l) => {
    const modell_vorher = await lies.modell(o.seite);
    const protokoll_vorher = await lies.protokoll(o.seite);
    const rueckmeldung_vorher = await rueckmeldungText(o.seite);
    let waehrend = null;
    let rueckmeldung_text = '';
    await zeileZiehen(l, 'baugruppe-1', 'gehaeuse', async () => {
      waehrend = await zielLesen(o.seite);
      rueckmeldung_text = await rueckmeldungText(o.seite);
    });
    return {
      waehrend,
      rueckmeldung_vorher,
      rueckmeldung_text,
      modell_vorher,
      modell_nachher: await lies.modell(o.seite),
      protokoll_vorher,
      protokoll_nachher: await lies.protokoll(o.seite),
    };
  });
  ergebnis.esc_deckel = await sensor(async (o, l) => {
    const modell_vorher = await lies.modell(o.seite);
    const protokoll_vorher = await lies.protokoll(o.seite);
    await zeileZiehen(l, 'deckel', 'baugruppe-1', () => l.taste('Escape'));
    return {
      modell_vorher,
      modell_nachher: await lies.modell(o.seite),
      protokoll_vorher,
      protokoll_nachher: await lies.protokoll(o.seite),
    };
  });
  {
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const l = new Lauf(o.seite);
    await l.klick(ZEILE('grundplatte'));
    const modell_vorher = await lies.modell(o.seite);
    const protokoll_vorher = await lies.protokoll(o.seite);
    await griffZiehen(l, -30, () => l.taste('Escape'));
    ergebnis.esc_griff = {
      modell_vorher,
      modell_nachher: await lies.modell(o.seite),
      protokoll_vorher,
      protokoll_nachher: await lies.protokoll(o.seite),
    };
    await schliessen(o);
  }
  return ergebnis;
}

// --- Sichtbarkeit -----------------------------------------------------------------------------------

const sichtStand = async (seite) => ({
  gezeichnet: await lies.gezeichnet(seite),
  ausgeblendet: (await lies.ansicht(seite)).ausgeblendet,
});

async function sichtbarkeit(browser, basis) {
  const auge = (l) => l.klick(`${ZEILE('steg')} .auge`);
  const o = await oeffnen(browser, adresse(basis, 'halter'));
  const l = new Lauf(o.seite);
  const vorher = {
    modell: await lies.modell(o.seite),
    protokoll: await lies.protokoll(o.seite),
    gezeichnet: await lies.gezeichnet(o.seite),
  };
  await auge(l);
  const s = await sichtStand(o.seite);
  const nach = {
    modell: await lies.modell(o.seite),
    protokoll: await lies.protokoll(o.seite),
    ...s,
  };
  await schliessen(o);
  const einblenden = [];
  for (const weg of ['auge', 'kontextmenue', 'alles']) {
    const p = await oeffnen(browser, adresse(basis, 'halter'));
    const lp = new Lauf(p.seite);
    await lp.klick(`${ZEILE('steg')} .auge`);
    if (weg === 'auge') await lp.klick(`${ZEILE('steg')} .auge`);
    else if (weg === 'kontextmenue') {
      await lp.klick(ZEILE('steg'));
      await p.seite.click(ZEILE('steg'), { button: 'right' });
      await lp.warte();
      await lp.klick('.kontextmenue [data-befehl="element.einblenden"]');
    } else {
      await lp.klick('.ansichtsleiste [data-befehl="ansicht.alles-einblenden"]');
    }
    einblenden.push({ weg, ...(await sichtStand(p.seite)) });
    await schliessen(p);
  }
  return { ausblenden: { vorher, nach }, einblenden };
}

// --- Ansicht ist flüchtig ----------------------------------------------------------------------------

const speicherGraph = (seite) =>
  seite.evaluate(() => window.localStorage.getItem('cee-prototyp-graph'));

async function stand(seite) {
  return {
    ansicht: await lies.ansicht(seite),
    auswahl: await lies.auswahl(seite),
    modell: await lies.modell(seite),
  };
}

async function neuladen(browser, basis) {
  const url = adresse(basis, null);
  const ergebnis = {};
  // Vorher, Vorgaben, Nachher
  {
    const o = await oeffnen(browser, url);
    const l = new Lauf(o.seite);
    const z = await lies.zone(o.seite, 'modell');
    const m = mitteVon(z);
    await mausZiehen(l, m, { x: m.x + 120, y: m.y + 40 }, 'right');
    await l.taste('w'); // Körper → Kanten
    await l.klick(ZEILE('grundplatte'));
    await l.klick(`${ZEILE('steg')} .auge`);
    ergebnis.vorher = await stand(o.seite);
    const f = await oeffnen(browser, url);
    ergebnis.vorgaben = await stand(f.seite);
    await schliessen(f);
    await o.seite.reload();
    await o.seite.waitForSelector('html[data-bereit="1"]');
    await l.warte();
    ergebnis.nachher = await stand(o.seite);
    await schliessen(o);
  }
  // Ansichtsschritte ändern den Graphen nicht
  {
    const o = await oeffnen(browser, url);
    const l = new Lauf(o.seite);
    const z = await lies.zone(o.seite, 'modell');
    const m = mitteVon(z);
    const schritte = [];
    const merke = async (aktion) =>
      schritte.push({
        aktion,
        modell: await lies.modell(o.seite),
        protokoll_laenge: (await lies.protokoll(o.seite)).length,
        verlauf_laenge: await lies.verlauf(o.seite),
        speicher_graph: await speicherGraph(o.seite),
      });
    await merke('ausgang');
    await mausZiehen(l, m, { x: m.x + 100, y: m.y + 30 }, 'right');
    await merke('drehen');
    await o.seite.mouse.move(m.x, m.y);
    await o.seite.mouse.wheel(0, -200);
    await l.warte();
    await merke('zoomen');
    await l.taste('w');
    await merke('darstellung');
    await l.klick('.ansichtsleiste [data-befehl="ansicht.projektion"]');
    await merke('projektion');
    await l.klick(ZEILE('steg'));
    await merke('waehlen');
    await l.klick('.ansichtsleiste [data-befehl="ansicht.isolieren"]');
    await merke('isolieren');
    await l.klick('.ansichtsleiste [data-befehl="ansicht.alles-einblenden"]');
    await l.klick(`${ZEILE('grundplatte')} .auge`);
    await merke('ausblenden');
    await l.klick('.ansichtsleiste [data-befehl="ansicht.alles-einblenden"]');
    await merke('einblenden');
    ergebnis.ansichtsschritte = schritte;
    await schliessen(o);
  }
  // Ansicht speichern: ein Element im Graphen, wirkt nie auf das Ergebnis
  {
    const o = await oeffnen(browser, url);
    const l = new Lauf(o.seite);
    const z = await lies.zone(o.seite, 'modell');
    const m = mitteVon(z);
    await mausZiehen(l, m, { x: m.x + 90, y: m.y + 35 }, 'right');
    await l.klick(ZEILE('grundplatte'));
    await l.klick(`${ZEILE('steg')} .auge`);
    const gespeichert0 = await stand(o.seite);
    const v0 = await lies.verlauf(o.seite);
    await l.klick('[data-menue-trigger="ansicht"]');
    await l.klick('.popup [data-befehl="ansicht.speichern"]');
    const v1 = await lies.verlauf(o.seite);
    const gespeichert = {
      ansicht: gespeichert0.ansicht,
      auswahl: gespeichert0.auswahl,
      modell: await lies.modell(o.seite),
    };
    const name = await o.seite.evaluate(() => {
      const zeilen = window.__pruef.struktur().filter((x) => x.symbole.includes('focus'));
      return zeilen[0]?.name ?? '';
    });
    await o.seite.reload();
    await o.seite.waitForSelector('html[data-bereit="1"]');
    await l.warte();
    const nach_neuladen = {
      modell: await lies.modell(o.seite),
      struktur_texte: (await lies.struktur(o.seite)).map((x) => x.name),
      verlauf_neu_beim_speichern: v1 - v0,
    };
    const ansichtZeile = await o.seite.evaluate(
      () => window.__pruef.struktur().find((x) => x.symbole.includes('focus'))?.id ?? null,
    );
    const modell_vorher = await lies.modell(o.seite);
    await l.doppelklick(ZEILE(ansichtZeile));
    const angewendet = {
      ansicht: await lies.ansicht(o.seite),
      modell_vorher,
      modell_nachher: await lies.modell(o.seite),
      auswahl: await lies.auswahl(o.seite),
    };
    ergebnis.speichern = {
      name,
      gespeichert,
      nach_neuladen,
      angewendet,
      teil_nach_anwenden: await lies.teil(o.seite),
      modell_nach_anwenden: await lies.modell(o.seite),
    };
    await schliessen(o);
  }
  return ergebnis;
}

export const modellBefehle = {
  async navigation({ browser, basis }) {
    return {
      geraete: await gesten(browser, basis),
      profilwechsel: await profile(browser, basis),
      zoom: await zoomBlock(browser, basis),
    };
  },
  async ziehen({ browser, basis }) {
    return ziehen(browser, basis);
  },
  async sichtbarkeit({ browser, basis }) {
    return sichtbarkeit(browser, basis);
  },
  async neuladen({ browser, basis }) {
    return neuladen(browser, basis);
  },
};
