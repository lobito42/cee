// Abläufe A bis H: nur echte Eingaben (Klicks, Tasten, Mausziehen); Ergebnis sind Rohdaten aus `window.__cee`.
import { Lauf, adresse, lies, oeffnen, zeichnen } from './grundlage.mjs';

const ZEILE = (id) => `[data-zone="aufbau"] [data-schritt="${id}"]`;
const FELD = (name) => `[data-zone="inspektor"] input[data-name="${name}"]`;
const LEISTE = (befehl) => `[data-ort="leiste"] [data-befehl="${befehl}"]`;

async function neu(browser, basis, zustand, { tempo0 = true } = {}) {
  const { seite } = await oeffnen(browser, adresse(basis, zustand, 'hell', 'de', tempo0));
  await seite.mouse.move(2, 2);
  await zeichnen(seite);
  return { seite, lauf: new Lauf(seite) };
}

/** Gemeinsamer Endstand jedes Ablaufs. */
async function stand(lauf) {
  const seite = lauf.seite;
  return {
    eingaben: lauf.eingaben,
    modell: await lies.modell(seite),
    teil: await lies.teil(seite),
    ansicht: await lies.ansicht(seite),
    protokoll: await lies.protokoll(seite),
    aufbau: await lies.aufbau(seite),
  };
}

const texteVon = (seite, selektor) =>
  seite.evaluate(
    (s) =>
      [...document.querySelectorAll(s)]
        .filter((e) => window.__pruef.sichtbar(e))
        .map((e) => e.textContent.trim()),
    selektor,
  );

/** Suche öffnen, Text tippen, Treffer lesen. */
export async function suchen(lauf, text) {
  await lauf.taste('Control+K');
  await lauf.text(text);
  return lauf.seite.evaluate(() =>
    [...document.querySelectorAll('[data-suche] [data-gruppe="befehle"] [role="option"]')].map(
      (e) => ({
        befehl: e.dataset.befehl,
        kuerzel_text: e.querySelector('kbd')?.textContent ?? '',
      }),
    ),
  );
}

/** Den Steg wählen und die beiden oberen Längskanten wählen (hinten zuerst, die Leiste liegt darüber). */
async function stegKantenWaehlen(lauf) {
  await lauf.klick(ZEILE('steg'));
  const p = await lies.projektion(lauf.seite, 'steg');
  const kante = (n) => p.kanten.find((k) => k.name === n);
  await lauf.klickPunkt(kante('oben-hinten').mitte);
  await lauf.klickPunkt(kante('oben-vorn').mitte, { modifiers: ['Shift'] });
}

async function entwurfAnlegen(lauf, name, dicke) {
  await lauf.klick('[data-glied="0"]');
  await lauf.tippen('[data-zone="inspektor"] .neu input', name);
  await lauf.klick(ZEILE('grundplatte'));
  await lauf.tippen(FELD('dicke'), dicke);
}

const ABLAEUFE = {
  async a(browser, basis) {
    const { seite, lauf } = await neu(browser, basis, 'leer');
    await lauf.klick('[data-befehl="skizze.anlegen"]');
    await lauf.klick('[data-ebene="XY"]');
    const zone = await lies.rechteck(seite, '[data-zone="modell"]');
    const m = { x: zone.x + zone.breite / 2, y: zone.y + zone.hoehe / 2 };
    await seite.mouse.move(m.x - 100, m.y - 60);
    await seite.mouse.down();
    await seite.mouse.move(m.x + 100, m.y + 40, { steps: 8 });
    await seite.mouse.up();
    lauf.eingaben += 3;
    await zeichnen(seite);
    await lauf.tippen(FELD('laenge'), '80');
    await lauf.tippen(FELD('breite'), '50');
    await lauf.klick('[data-zone="inspektor"] [data-befehl="ort.fertig"]');
    await lauf.klick(LEISTE('feature.extrudieren'));
    await lauf.tippen(FELD('dicke'), '8');
    return { ...(await stand(lauf)), auswahl: await lies.auswahl(seite), seite };
  },

  async b(browser, basis, variante) {
    if (variante === 'befund') {
      const { seite, lauf } = await neu(browser, basis, 'befund');
      const aufbau = await lies.aufbau(seite);
      const modell_status = await seite.evaluate(() =>
        [...document.querySelectorAll('[data-modell-status]')]
          .filter((e) => window.__pruef.sichtbar(e))
          .map((e) => ({
            schritt: e.dataset.schritt,
            wort: window.__pruef.text(e.querySelector('.wort')),
            symbol: window.__pruef.text(e.querySelector('.symbol')),
            farbe: window.__pruef.hex(getComputedStyle(e).color).wert,
          })),
      );
      await lauf.klick(ZEILE('grundplatte'));
      await lauf.tippen(FELD('dicke'), '9');
      const modell_nach_9mm = await lies.modell(seite);
      const teil_nach_9mm = await lies.teil(seite);
      await lauf.klick(ZEILE('verrundung'));
      const korrektur_text = (await texteVon(seite, '[data-muster="Befund"] button'))[0] ?? '';
      await lauf.klick('[data-muster="Befund"] button');
      const befunde_nach_korrektur = await texteVon(seite, '[data-muster="Befund"]');
      return {
        ...(await stand(lauf)),
        aufbau,
        modell_status,
        modell_nach_9mm,
        teil_nach_9mm,
        korrektur_text,
        befunde_nach_korrektur,
        seite,
      };
    }
    const { seite, lauf } = await neu(browser, basis, 'halter');
    await lauf.klick(ZEILE('steg'));
    await lauf.tippen(FELD('hoehe'), '40');
    await stegKantenWaehlen(lauf);
    await lauf.klick(LEISTE('feature.verrunden'));
    await lauf.tippen(FELD('radius'), '3');
    return { ...(await stand(lauf)), seite };
  },

  async c(browser, basis) {
    const { seite, lauf } = await neu(browser, basis, 'teile');
    await lauf.klick(ZEILE('gehaeuse'));
    await lauf.klick(ZEILE('deckel'), { modifiers: ['Shift'] });
    await lauf.klick(LEISTE('baugruppe.anlegen'));
    await lauf.klick(ZEILE('instanz-deckel'));
    await lauf.klick(LEISTE('verbindung.anlegen'));
    await lauf.klick('[data-verbindungspunkt="deckel-unterseite"]');
    await lauf.klick('[data-verbindungspunkt="gehaeuse-oberkante"]');
    return { ...(await stand(lauf)), seite };
  },

  async d(browser, basis, variante) {
    const { seite, lauf } = await neu(browser, basis, 'halter');
    await entwurfAnlegen(lauf, 'Dickere Platte', '10');
    await lauf.klick('[data-glied="0"]');
    await lauf.klick('[data-zone="inspektor"] [data-befehl="entwurf.vergleichen"]');
    const vergleich = await seite.evaluate(() =>
      [...document.querySelectorAll('[data-vergleich-zeile]')].map((z) => ({
        feld: z.querySelector('[data-feld-name]').textContent.trim(),
        vorher: z.querySelector('[data-vorher]').textContent.trim(),
        nachher: z.querySelector('[data-nachher]').textContent.trim(),
      })),
    );
    const modell_vorher = await lies.modell(seite);
    if (variante === 'verwerfen') {
      const knopf = '[data-entwurfskarte] button[data-befehl="entwurf.verwerfen"]';
      const verwerfen_knopf_ohne_begruendung = await seite.evaluate((s) => {
        const e = document.querySelector(s);
        return { disabled: e.disabled, aria_disabled: e.getAttribute('aria-disabled') };
      }, knopf);
      await seite.click(knopf, { force: true });
      await seite.keyboard.press('Enter');
      lauf.eingaben += 2;
      const modell_nach_versuch_ohne_begruendung = await lies.modell(seite);
      await lauf.tippen('[data-entwurfskarte] input', 'zu schwer', { enter: false });
      await lauf.klick(knopf);
      const namen = () => texteVon(seite, '[data-entwurf-eintrag] [data-feld="name"]');
      const ansicht_ergebnis = await namen();
      await lauf.klick('[data-befehl="ansicht.alle-entwuerfe"]');
      const ansicht_alle_entwuerfe = await seite.evaluate(() =>
        [...document.querySelectorAll('[data-entwurf-eintrag]')].map((e) => ({
          name: e.querySelector('[data-feld="name"]').textContent.trim(),
          begruendung: e.querySelector('[data-feld="begruendung"]')?.textContent.trim() ?? '',
        })),
      );
      return {
        ...(await stand(lauf)),
        modell_vorher,
        modell_nach_versuch_ohne_begruendung,
        verwerfen_knopf_ohne_begruendung,
        modell_nachher: await lies.modell(seite),
        ansicht_ergebnis,
        ansicht_alle_entwuerfe,
        verworfen_name: 'Dickere Platte',
        seite,
      };
    }
    const haupt_modell_vor_uebernehmen = await lies.modell(seite);
    await lauf.klick('[data-entwurfskarte] [data-befehl="entwurf.uebernehmen"]');
    const haupt_modell_nach_uebernehmen = await lies.modell(seite);
    await lauf.klick('[data-befehl="ansicht.alle-entwuerfe"]');
    const entwurf_zustand = await seite.evaluate(() => {
      const e = [...document.querySelectorAll('[data-entwurf-eintrag]')].find(
        (x) => x.querySelector('[data-feld="name"]').textContent.trim() === 'Dickere Platte',
      );
      return e?.querySelector('[data-feld="zustand"]').textContent.trim() ?? '';
    });
    return {
      ...(await stand(lauf)),
      vergleich,
      haupt_modell_vor_uebernehmen,
      haupt_modell_nach_uebernehmen,
      entwurf_zustand,
      seite,
    };
  },

  async e(browser, basis, variante) {
    const { seite, lauf } = await neu(browser, basis, 'halter');
    if (variante === 'elemente') {
      await lauf.taste('Control+K');
      await lauf.text('Steg');
      const gruppe_elemente = await texteVon(
        seite,
        '[data-suche] [data-gruppe="elemente"] [role="option"]',
      );
      await lauf.taste('Enter');
      return { ...(await stand(lauf)), gruppe_elemente, auswahl: await lies.auswahl(seite), seite };
    }
    const kopf_rueckgaengig = await seite.evaluate(() =>
      [
        ...document.querySelectorAll('[data-zone="kopf"] [data-befehl="bearbeiten.rueckgaengig"]'),
      ].map((b) => ({
        befehl: b.dataset.befehl,
        text: b.textContent.trim(),
      })),
    );
    const treffer = await suchen(lauf, 'zurück');
    await lauf.taste('Enter');
    return { ...(await stand(lauf)), kopf_rueckgaengig, suche_zurueck: { treffer }, seite };
  },

  async f(browser, basis) {
    const { seite, lauf } = await neu(browser, basis, 'halter');
    const modell_vorher = await lies.modell(seite);
    await lauf.klick(ZEILE('steg'));
    await lauf.taste('Control+K');
    await lauf.text('Runde die oberen Kanten mit 2 mm ab');
    await lauf.taste('Enter');
    await lauf.klick('[data-muster="Entscheidungskarte"] [data-befehl="vorschlag.uebernehmen"]');
    await lauf.tippen(FELD('radius'), '3');
    const ergebnis = await stand(lauf);
    const inspektor = await lies.inspektor(seite);
    const auswahl = await lies.auswahl(seite);
    const undo_schritte = [];
    for (let i = 0; i < 2; i++) {
      await lauf.taste('Control+Z');
      undo_schritte.push(await lies.modell(seite));
    }
    return { ...ergebnis, modell_vorher, undo_schritte, inspektor, auswahl, seite };
  },

  async g(browser, basis, variante) {
    const { seite, lauf } = await neu(browser, basis, 'halter');
    await lauf.doppelklick(ZEILE('grundplatte'));
    await lauf.klick('[data-mass="laenge"]');
    await lauf.text('100');
    await lauf.taste('Enter');
    const weg = variante || 'fertig';
    if (weg === 'esc') await lauf.taste('Escape');
    else if (weg === 'pfad') await lauf.klick('[data-glied="1"]');
    else await lauf.klick('[data-zone="inspektor"] [data-befehl="ort.fertig"]');
    return { ...(await stand(lauf)), seite };
  },

  async h(browser, basis, variante) {
    const { seite, lauf } = await neu(browser, basis, 'halter');
    const modell_vorher = await lies.modell(seite);
    const auswahl_vorher = await lies.auswahl(seite);
    if (variante === 'taste-w') {
      const folge = [];
      for (let i = 0; i < 3; i++) {
        await lauf.taste('w');
        folge.push((await lies.ansicht(seite)).darstellung);
      }
      await lauf.klick('[data-darstellung="durchsicht"]');
      folge.push((await lies.ansicht(seite)).darstellung);
      return {
        ...(await stand(lauf)),
        folge,
        umschalter: await lies.rechteck(seite, '.umschalter'),
        modellzone: await lies.rechteck(seite, '[data-zone="modell"]'),
        modell_vorher,
        auswahl_vorher,
        auswahl: await lies.auswahl(seite),
        seite,
      };
    }
    const lw = await lies.leinwandRechteck(seite);
    const huellbox = async () => {
      const kisten = [];
      for (const id of ['grundplatte', 'steg', 'bohrungen']) {
        kisten.push((await lies.projektion(seite, id)).huellbox);
      }
      const x0 = Math.min(...kisten.map((k) => k.x));
      const y0 = Math.min(...kisten.map((k) => k.y));
      const x1 = Math.max(...kisten.map((k) => k.x + k.breite));
      const y1 = Math.max(...kisten.map((k) => k.y + k.hoehe));
      return { x: x0 - lw.x, y: y0 - lw.y, breite: x1 - x0, hoehe: y1 - y0 };
    };
    const koerper = {
      leinwand: await lies.leinwand(seite, 'h-koerper'),
      huellbox_leinwand: await huellbox(),
    };
    await lauf.klick('[data-darstellung="kanten"]');
    await seite.mouse.move(2, 2);
    await zeichnen(seite);
    const viewport = await seite.evaluate(
      () =>
        window.__pruef.hex(
          getComputedStyle(document.querySelector('[data-zone="modell"]')).backgroundColor,
        ).wert,
    );
    return {
      ...(await stand(lauf)),
      leinwand: await lies.leinwand(seite, 'h-kanten'),
      huellbox_leinwand: await huellbox(),
      viewport,
      koerper,
      seite,
    };
  },
};

export const ablaufBefehle = {
  async ablauf({ browser, basis, optionen, positionen }) {
    const [name] = positionen;
    const lauf = ABLAEUFE[name];
    if (!lauf) throw new Error(`Unbekannter Ablauf: ${name}`);
    const { seite, ...ergebnis } = await lauf(browser, basis, optionen.variante ?? '');
    await seite.close();
    return ergebnis;
  },
};
