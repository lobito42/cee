// Prüfbefehl `ablauf <e…l>`: spielt die Pilotaufgabe wie eine Testperson mit echten Eingaben und liefert den Endzustand.
import { MOD, Lauf, adresse, lies, oeffnen, schliessen } from './grundlage.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;

const endzustand = async (o, l, extra = {}) => ({
  eingaben: l.eingaben,
  modell: await lies.modell(o.seite),
  teil: await lies.teil(o.seite),
  ansicht: await lies.ansicht(o.seite),
  protokoll: await lies.protokoll(o.seite),
  ...extra,
});

const mitteVon = (r) => ({ x: r.x + r.breite / 2, y: r.y + r.hoehe / 2 });

async function zeileZiehen(l, von, nach) {
  const s = l.seite;
  const a = mitteVon(await lies.rechteck(s, ZEILE(von)));
  const b = mitteVon(await lies.rechteck(s, ZEILE(nach)));
  await s.mouse.move(a.x, a.y);
  await s.mouse.down();
  await s.mouse.move(a.x + 10, a.y + 10, { steps: 3 });
  await s.mouse.move(b.x, b.y, { steps: 6 });
  await s.mouse.up();
  l.eingaben += 4;
  await l.warte();
}

const AUFGABEN = {
  // E: Rückgängig finden – ein Mensch öffnet das Menü Bearbeiten und liest das Kürzel
  async e(o, l) {
    await l.klick('[data-menue-trigger="dropdown:Bearbeiten"]');
    const texte = await o.seite.$$eval('[data-befehl="bearbeiten.rueckgaengig"] kbd', (x) =>
      x.map((e) => e.textContent.trim()),
    );
    await l.taste('Escape');
    return { rueckgaengig_texte: texte };
  },
  // F: dem Chat sagen, was man will, und die Karte ansehen und übernehmen
  async f(o, l) {
    await l.klick('[data-chat-eingabe]');
    await l.text('Der Steg soll 40 mm hoch werden');
    await l.taste('Enter');
    await l.klick('[data-befehl="chat.uebernehmen"]');
  },
  // G: Grundplatte aktiv machen, Länge ändern, über den Pfad zurück zum ganzen Teil
  async g(o, l) {
    await l.doppelklick(ZEILE('grundplatte'));
    await l.tippen('[data-feld-eingabe="laenge"]', '100');
    await l.klick('.pfad .glied:first-child');
  },
  // H: nur Kanten zeigen
  async h(o, l) {
    await l.klick('.ansichtsleiste [data-befehl="darstellung.wechseln"]');
  },
  // I: zwei Elemente wählen, ausblenden, wieder holen
  async i(o, l) {
    const modell_vorher = await lies.modell(o.seite);
    await l.klick(ZEILE('grundplatte'));
    await l.klick(ZEILE('steg'), { modifiers: ['Shift'] });
    await l.taste('h');
    const zwischen = {
      ausgeblendet: (await lies.ansicht(o.seite)).ausgeblendet,
      gezeichnet: await lies.gezeichnet(o.seite),
    };
    await l.klick('.ansichtsleiste [data-befehl="ansicht.alles-einblenden"]');
    const ende = {
      ausgeblendet: (await lies.ansicht(o.seite)).ausgeblendet,
      gezeichnet: await lies.gezeichnet(o.seite),
    };
    return { zwischen, ende, modell_vorher };
  },
  // J: Kopie des Stegs, umbenennen, verwerfen
  async j(o, l) {
    await l.klick(ZEILE('steg'));
    await l.taste(`${MOD}+d`);
    await l.taste('F2');
    await o.seite.waitForSelector('input[data-umbenennen]');
    await o.seite.keyboard.press(`${MOD}+a`);
    await l.text('Steg 2');
    await l.taste('Enter');
    await l.taste('Delete');
  },
  // K: Deckel in die Baugruppe ziehen
  async k(o, l) {
    await l.klick('[role="tab"]:has-text("Sensorgehäuse")');
    await zeileZiehen(l, 'deckel', 'baugruppe-1');
  },
  // L: den Fehler finden und mit der Korrektur beheben
  async l(o, l) {
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
    return { bohrungen_zustaende: zeile.zustaende, befunde };
  },
};

export const ablaufBefehle = {
  async ablauf({ browser, basis, positionen }) {
    const name = (positionen[0] ?? '').toLowerCase();
    const aufgabe = AUFGABEN[name];
    if (!aufgabe) throw new Error(`unbekannte Aufgabe: ${name}`);
    const o = await oeffnen(browser, adresse(basis, name === 'l' ? 'befund' : 'halter'));
    const l = new Lauf(o.seite);
    const extra = (await aufgabe(o, l)) ?? {};
    const ergebnis = await endzustand(o, l, extra);
    await schliessen(o);
    return ergebnis;
  },
};
