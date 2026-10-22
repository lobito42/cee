// Prüfbefehle zur Bedienung am Modell: lesbarkeit, navigation, auswahl, inspektor, griffe, orte, kontext.
import { THEMEN, ZUSTAENDE, Lauf, adresse, lies, oeffnen, zeichnen } from './grundlage.mjs';

/** Punkte entlang eines Polygonzugs alle `abstand` Pixel. */
function entlang(polygon, abstand = 10) {
  const punkte = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const laenge = Math.hypot(b.x - a.x, b.y - a.y);
    const n = Math.max(1, Math.floor(laenge / abstand));
    for (let k = 0; k < n; k++) {
      punkte.push({ x: a.x + ((b.x - a.x) * k) / n, y: a.y + ((b.y - a.y) * k) / n });
    }
  }
  return punkte;
}

const relativ = (p, r) => ({ x: p.x - r.x, y: p.y - r.y });
const rechteckVon = (huelle) => {
  const x0 = Math.min(...huelle.map((p) => p.x));
  const x1 = Math.max(...huelle.map((p) => p.x));
  const y0 = Math.min(...huelle.map((p) => p.y));
  const y1 = Math.max(...huelle.map((p) => p.y));
  return { x: x0, y: y0, breite: x1 - x0, hoehe: y1 - y0 };
};

/** Frische Seite im Zustand; Maus zunächst außerhalb von Modell und Aufbau. */
async function frisch(browser, basis, zustand, { thema = 'hell', tempo0 = true } = {}) {
  const { seite } = await oeffnen(browser, adresse(basis, zustand, thema, 'de', tempo0));
  await seite.mouse.move(2, 2);
  await zeichnen(seite);
  return { seite, lauf: new Lauf(seite) };
}

/** Mausklick mit rechter oder mittlerer Taste und Ziehen. */
async function ziehenMaus(seite, von, bis, knopf = 'right', schritte = 10) {
  await seite.mouse.move(von.x, von.y);
  await seite.mouse.down({ button: knopf });
  await seite.mouse.move(bis.x, bis.y, { steps: schritte });
  await seite.mouse.up({ button: knopf });
  await zeichnen(seite);
}

const mitteVon = (r) => ({ x: r.x + r.breite / 2, y: r.y + r.hoehe / 2 });

export const bedienBefehle = {
  async lesbarkeit({ browser, basis }) {
    const ergebnis = [];
    for (const thema of THEMEN) {
      const { seite, lauf } = await frisch(browser, basis, 'halter', { thema });
      const ansicht = await lies.ansicht(seite);
      const lw = await lies.leinwandRechteck(seite);
      const leinwand = await lies.leinwand(seite, `halter-${thema}`);
      const viewport = await seite.evaluate(
        () =>
          window.__pruef.hex(
            getComputedStyle(document.querySelector('[data-zone="modell"]')).backgroundColor,
          ).wert,
      );
      const platte = await lies.projektion(seite, 'grundplatte');
      const steg = await lies.projektion(seite, 'steg');
      const kanten = [
        ...platte.kanten.map((k) => ({ ...k, id: `grundplatte/${k.name}` })),
        ...steg.kanten.map((k) => ({ ...k, id: `steg/${k.name}` })),
      ].map((k) => ({
        name: k.id,
        mitte: relativ(k.mitte, lw),
        flaechen: k.flaechen.map((f) => relativ(f, lw)),
      }));
      // Steg per Mausklick wählen
      await lauf.klickPunkt(steg.flaechen.vorn);
      const auswahl = await lies.auswahl(seite);
      await seite.mouse.move(2, 2);
      await zeichnen(seite);
      const leinwandSteg = await lies.leinwand(seite, `steg-${thema}`);
      const stegNeu = await lies.projektion(seite, 'steg');
      const umriss = entlang(stegNeu.huelle, 10).map((p) => relativ(p, lw));
      const huellbox = rechteckVon(stegNeu.huelle.map((p) => relativ(p, lw)));
      await seite.close();

      // Einpassen nach Drehen und dreifachem Herauszoomen
      const e = await frisch(browser, basis, 'halter', { thema });
      const zone = await lies.rechteck(e.seite, '[data-zone="modell"]');
      const mitte = mitteVon(zone);
      await ziehenMaus(e.seite, mitte, { x: mitte.x + 120, y: mitte.y + 40 }, 'right');
      await e.seite.mouse.move(mitte.x, mitte.y);
      for (let i = 0; i < 11; i++) {
        await e.seite.mouse.wheel(0, 100);
        await zeichnen(e.seite);
      }
      const leinwandVorher = await lies.leinwand(e.seite, `vorher-${thema}`);
      await e.lauf.klick('[data-befehl="ansicht.einpassen"]');
      await e.seite.mouse.move(2, 2);
      await zeichnen(e.seite);
      const leinwandNachher = await lies.leinwand(e.seite, `nachher-${thema}`);
      const einpassen = {
        modellzone: zone,
        leinwand_vorher: leinwandVorher,
        leinwand: leinwandNachher,
        leinwand_rechteck: await lies.leinwandRechteck(e.seite),
      };
      await e.seite.close();
      ergebnis.push({
        thema,
        ansicht,
        leinwand,
        leinwand_rechteck: lw,
        viewport,
        flaechen: {
          oben: relativ(platte.flaechen.oben, lw),
          vorn: relativ(platte.flaechen.vorn, lw),
          rechts: relativ(platte.flaechen.rechts, lw),
        },
        kanten,
        auswahl_steg: { auswahl, leinwand: leinwandSteg, umriss, huellbox },
        einpassen,
      });
    }
    return ergebnis;
  },

  async navigation({ browser, basis }) {
    const { seite } = await frisch(browser, basis, 'schritt');
    const zone = await lies.rechteck(seite, '[data-zone="modell"]');
    const m = mitteVon(zone);
    const zustand = async () => ({
      kamera: (await lies.ansicht(seite)).kamera,
      modell: await lies.modell(seite),
      auswahl: await lies.auswahl(seite),
    });
    const vorher = await zustand();
    const start = { x: m.x - 250, y: m.y + 250 };
    await ziehenMaus(seite, start, { x: start.x + 200, y: start.y }, 'right');
    const nach_drehen = { kamera: (await lies.ansicht(seite)).kamera };
    await ziehenMaus(seite, start, { x: start.x + 100, y: start.y }, 'middle');
    const nach_schieben = { kamera: (await lies.ansicht(seite)).kamera };
    await seite.mouse.move(m.x, m.y);
    for (let i = 0; i < 5; i++) await seite.mouse.wheel(0, 100);
    await zeichnen(seite);
    const nach_zoomen = { kamera: (await lies.ansicht(seite)).kamera };
    const nachher = await zustand();
    const einstellung = await seite.evaluate(() => window.__cee.einstellung());
    await seite.close();

    // Rechtsklick ohne Bewegung auf die Grundplatte
    const r = await frisch(browser, basis, 'schritt');
    const platte = await lies.projektion(r.seite, 'grundplatte');
    const kamera_vorher = (await lies.ansicht(r.seite)).kamera;
    await r.lauf.klickPunkt(platte.treffer[0], { button: 'right' });
    const kamera_nachher = (await lies.ansicht(r.seite)).kamera;
    const kontext_befehle = await r.seite.evaluate(() =>
      [...document.querySelectorAll('[data-ort="menue"] [data-befehl]')]
        .filter((e) => window.__pruef.sichtbar(e))
        .map((e) => e.dataset.befehl),
    );
    await r.seite.close();

    // Ziehen am Griff mit und ohne Ansichtseingabe
    const ziehen = async (mitAnsicht) => {
      const g = await frisch(browser, basis, 'schritt');
      const griff = await lies.rechteck(g.seite, '[data-griff]');
      const p = await lies.projektion(g.seite, 'grundplatte');
      const start2 = mitteVon(griff);
      const ziel = { x: start2.x + 4 * p.z_px_pro_mm.x, y: start2.y + 4 * p.z_px_pro_mm.y };
      await g.seite.mouse.move(start2.x, start2.y);
      await g.seite.mouse.down();
      await g.seite.mouse.move((start2.x + ziel.x) / 2, (start2.y + ziel.y) / 2, { steps: 4 });
      const kamera_vorher2 = (await lies.ansicht(g.seite)).kamera;
      if (mitAnsicht) await g.seite.evaluate(() => window.__ceeEingabe.ansicht({ ry: 20 }));
      await zeichnen(g.seite);
      const kamera_waehrend = (await lies.ansicht(g.seite)).kamera;
      await g.seite.mouse.move(ziel.x, ziel.y, { steps: 4 });
      await zeichnen(g.seite);
      const zeiger = await zeigerTexte(g.seite, ziel);
      await g.seite.mouse.up();
      await zeichnen(g.seite);
      const modell = await lies.modell(g.seite);
      await g.seite.close();
      return {
        kamera_vorher: kamera_vorher2,
        kamera_waehrend,
        zeiger_texte_waehrend: zeiger,
        modell,
      };
    };
    const mit = await ziehen(true);
    const ohne = await ziehen(false);
    return {
      vorher,
      nach_drehen,
      nach_schieben,
      nach_zoomen,
      nachher,
      rechtsklick: { kamera_vorher, kamera_nachher, kontext_befehle },
      ziehen_mit_ansicht: mit,
      ziehen_ohne_ansicht: { modell: ohne.modell },
      einstellung,
    };
  },

  async auswahl({ browser, basis }) {
    const { seite, lauf } = await frisch(browser, basis, 'halter');
    const platte = await lies.projektion(seite, 'grundplatte');
    const steg = await lies.projektion(seite, 'steg');
    const bohrungen = await lies.projektion(seite, 'bohrungen');
    const ziele = [
      ['grundplatte-oben', platte.flaechen.oben],
      ['steg-vorn', steg.flaechen.vorn],
      ['bohrung-wand', bohrungen.treffer[0]],
    ];
    const klicks = [];
    for (const [ziel, punkt] of ziele) {
      await lauf.klickPunkt(punkt);
      klicks.push({
        ziel,
        auswahl: await lies.auswahl(seite),
        aufbau: await lies.aufbau(seite),
        inspektor: await lies.inspektor(seite),
        modell: await lies.modell(seite),
      });
    }
    await seite.close();

    // Aufbau wählt im Modell
    const a = await frisch(browser, basis, 'halter');
    const lw = await lies.leinwandRechteck(a.seite);
    await a.lauf.klick('[data-zone="aufbau"] [data-schritt="steg"]');
    const aufbau_steg = await (async () => {
      const auswahl = await lies.auswahl(a.seite);
      const leinwand = await lies.leinwand(a.seite, 'aufbau-steg');
      const p = await lies.projektion(a.seite, 'steg');
      const huelle = p.huelle.map((q) => relativ(q, lw));
      return { auswahl, leinwand, umriss: entlang(huelle, 10), huellbox: rechteckVon(huelle) };
    })();
    await a.seite.close();
    const f = await frisch(browser, basis, 'halter');
    const stegPunkt = (await lies.projektion(f.seite, 'steg')).flaechen.vorn;
    await f.lauf.klickPunkt(stegPunkt);
    const flaeche_steg = { auswahl: await lies.auswahl(f.seite) };
    await f.seite.close();

    // Überfahren in beide Richtungen
    const h1 = await frisch(browser, basis, 'halter');
    const auswahl_vorher = await lies.auswahl(h1.seite);
    const zeile = await lies.rechteck(h1.seite, '[data-zone="aufbau"] [data-schritt="bohrungen"]');
    const mz = mitteVon(zeile);
    await h1.seite.mouse.move(mz.x, mz.y);
    await zeichnen(h1.seite);
    const hover_aufbau_bohrungen = {
      auswahl_vorher,
      auswahl_nachher: await lies.auswahl(h1.seite),
      ansicht: await lies.ansicht(h1.seite),
      leinwand: await lies.leinwand(h1.seite, 'hover-bohrungen'),
    };
    await h1.seite.close();
    const h2 = await frisch(browser, basis, 'halter');
    const p2 = await lies.projektion(h2.seite, 'grundplatte');
    const vorher2 = await lies.auswahl(h2.seite);
    await h2.seite.mouse.move(p2.flaechen.oben.x, p2.flaechen.oben.y);
    await zeichnen(h2.seite);
    const hover_flaeche_grundplatte = {
      auswahl_vorher: vorher2,
      auswahl_nachher: await lies.auswahl(h2.seite),
      aufbau: await lies.aufbau(h2.seite),
    };
    await h2.seite.close();

    // Nichts nur beim Überfahren: je Bedienelement sichtbar ohne und mit Überfahren des Elternelements
    const nur_beim_ueberfahren = [];
    for (const zustand of ZUSTAENDE) {
      const n = await frisch(browser, basis, zustand);
      const anzahl = await n.seite.evaluate(
        () =>
          document.querySelectorAll('button,input,[role="option"],[role="tab"],[role="radio"]')
            .length,
      );
      for (let i = 0; i < anzahl; i++) {
        const info = await n.seite.evaluate((idx) => {
          const e = document.querySelectorAll(
            'button,input,[role="option"],[role="tab"],[role="radio"]',
          )[idx];
          const eltern = e.parentElement;
          const r = eltern.getBoundingClientRect();
          return {
            befehl: e.dataset.befehl ?? '',
            sichtbar: window.__pruef.sichtbar(e),
            x: r.left + r.width / 2,
            y: r.top + r.height / 2,
          };
        }, i);
        await n.seite.mouse.move(info.x, info.y);
        const mit = await n.seite.evaluate(
          (idx) =>
            window.__pruef.sichtbar(
              document.querySelectorAll('button,input,[role="option"],[role="tab"],[role="radio"]')[
                idx
              ],
            ),
          i,
        );
        nur_beim_ueberfahren.push({
          zustand,
          befehl: info.befehl,
          sichtbar_ohne: info.sichtbar,
          sichtbar_mit: mit,
        });
      }
      await n.seite.close();
    }
    return {
      klicks,
      aufbau_steg,
      flaeche_steg,
      hover_aufbau_bohrungen,
      hover_flaeche_grundplatte,
      nur_beim_ueberfahren,
    };
  },

  async inspektor({ browser, basis }) {
    const t = await frisch(browser, basis, 'halter');
    const teil = {
      inspektor: await lies.inspektor(t.seite),
      teil: await lies.teil(t.seite),
      modell: await lies.modell(t.seite),
    };
    await t.seite.close();
    const g = await frisch(browser, basis, 'halter');
    await g.lauf.klick('[data-zone="aufbau"] [data-schritt="grundplatte"]');
    const grundplatte = {
      inspektor: await lies.inspektor(g.seite),
      auswahl: await lies.auswahl(g.seite),
      modell: await lies.modell(g.seite),
    };
    await g.seite.close();

    const l = await frisch(browser, basis, 'schritt');
    const snap = async () => ({
      teil: await lies.teil(l.seite),
      inspektor_teil: await lies.inspektor(l.seite),
      modell: await lies.modell(l.seite),
      protokoll: await lies.protokoll(l.seite),
    });
    const feld = 'input[data-name="dicke"]';
    const vorher = await snap();
    await l.lauf.tippen(feld, '12', { enter: false });
    const nach_tippen = await snap();
    await l.lauf.taste('Escape');
    const nach_esc = await snap();
    await l.lauf.tippen(feld, '12');
    const nach_enter = await snap();
    await l.lauf.taste('Control+Z');
    const nach_rueckgaengig = await snap();
    await l.seite.close();
    return {
      teil,
      grundplatte,
      live: { vorher, nach_tippen, nach_esc, nach_enter, nach_rueckgaengig },
    };
  },

  async griffe({ browser, basis }) {
    const h = await frisch(browser, basis, 'halter');
    const halter = { ansicht: await lies.ansicht(h.seite), auswahl: await lies.auswahl(h.seite) };
    await h.seite.close();
    const s = await frisch(browser, basis, 'schritt');
    const schritt = { ansicht: await lies.ansicht(s.seite), auswahl: await lies.auswahl(s.seite) };
    await s.seite.close();

    // Ziehen um 4 mm
    const z = await frisch(browser, basis, 'schritt');
    const g = await griffAnfassen(z.seite);
    const ziel = { x: g.start.x + 4 * g.mm.x, y: g.start.y + 4 * g.mm.y };
    await z.seite.mouse.move((g.start.x + ziel.x) / 2, (g.start.y + ziel.y) / 2, { steps: 4 });
    await z.seite.mouse.move(ziel.x, ziel.y, { steps: 4 });
    await zeichnen(z.seite);
    const zeiger_texte_waehrend = await zeigerTexte(z.seite, ziel);
    await z.seite.mouse.up();
    await z.seite.waitForTimeout(1000);
    const ziehen = {
      zeiger_texte_waehrend,
      zeiger_texte_1000ms: await zeigerTexte(z.seite, ziel),
      teil: await lies.teil(z.seite),
      modell: await lies.modell(z.seite),
    };
    await z.seite.close();

    // Tippen beim Ziehen
    const t = await frisch(browser, basis, 'schritt');
    const gt = await griffAnfassen(t.seite);
    await t.seite.mouse.move(gt.start.x + gt.mm.x, gt.start.y + gt.mm.y, { steps: 3 });
    const protokoll_vorher = await lies.protokoll(t.seite);
    await t.seite.keyboard.type('15');
    await t.seite.keyboard.press('Enter');
    await t.seite.mouse.up();
    await zeichnen(t.seite);
    const tippen = {
      teil: await lies.teil(t.seite),
      modell: await lies.modell(t.seite),
      protokoll_vorher,
      protokoll: await lies.protokoll(t.seite),
    };
    await t.seite.close();

    // Esc beim Ziehen
    const e = await frisch(browser, basis, 'schritt');
    const ge = await griffAnfassen(e.seite);
    await e.seite.mouse.move(ge.start.x + 3 * ge.mm.x, ge.start.y + 3 * ge.mm.y, { steps: 3 });
    const pv = await lies.protokoll(e.seite);
    await e.seite.keyboard.press('Escape');
    await e.seite.mouse.up();
    await zeichnen(e.seite);
    const esc = {
      teil: await lies.teil(e.seite),
      modell: await lies.modell(e.seite),
      protokoll_vorher: pv,
      protokoll: await lies.protokoll(e.seite),
    };
    await e.seite.close();
    return { halter, schritt, ziehen, tippen, esc };
  },

  async orte({ browser, basis }) {
    const hinein = [];
    for (const weg of ['doppelklick-flaeche', 'doppelklick-aufbau', 'knopf']) {
      const h = await frisch(browser, basis, 'halter', { tempo0: false });
      const t0 = Date.now();
      if (weg === 'doppelklick-flaeche') {
        const p = await lies.projektion(h.seite, 'grundplatte');
        await h.seite.mouse.dblclick(p.flaechen.oben.x, p.flaechen.oben.y);
      } else if (weg === 'doppelklick-aufbau') {
        await h.seite.dblclick('[data-zone="aufbau"] [data-schritt="grundplatte"]');
      } else {
        await h.seite.click('[data-zone="aufbau"] [data-schritt="grundplatte"]');
        await h.seite.click('[data-zone="inspektor"] [data-befehl="ort.skizze-bearbeiten"]');
      }
      await h.seite.waitForFunction(() => {
        const a = window.__cee.ansicht();
        return a.ort.art === 'skizze' && a.kamera.hoehe_grad >= 89 && a.pfad.length >= 4;
      });
      const dauer_ms = Date.now() - t0;
      hinein.push({
        weg,
        dauer_ms,
        ansicht: await lies.ansicht(h.seite),
        modell: await lies.modell(h.seite),
      });
      await h.seite.close();
    }
    const s = await frisch(browser, basis, 'skizze');
    const skizze = {
      aufbau: await lies.aufbau(s.seite),
      ansicht: await lies.ansicht(s.seite),
      modell: await lies.modell(s.seite),
    };
    await s.seite.close();
    const m = await frisch(browser, basis, 'skizze');
    await m.lauf.klick('[data-mass="laenge"]');
    const mass_80 = await m.seite.evaluate(() => {
      const a = document.activeElement;
      return {
        fokus: a?.closest?.('.feld')
          ? {
              gruppe: a.closest('[data-gruppe]')?.dataset.gruppe,
              feld: a.closest('.feld').dataset.feld,
            }
          : null,
        auswahl_start: a?.selectionStart ?? null,
        auswahl_ende: a?.selectionEnd ?? null,
        wert_text: a?.value ?? '',
      };
    });
    await m.seite.close();
    return { hinein, skizze, mass_80 };
  },

  async kontext({ browser, basis }) {
    const k = await frisch(browser, basis, 'halter');
    const platte = await lies.projektion(k.seite, 'grundplatte');
    await k.lauf.klickPunkt(platte.flaechen.oben);
    const befehleIn = (selektor) =>
      k.seite.evaluate(
        (s) =>
          [...document.querySelectorAll(s)]
            .filter((e) => window.__pruef.sichtbar(e))
            .map((e) => e.dataset.befehl),
        selektor,
      );
    const leiste = {
      befehle: await befehleIn('[data-ort="leiste"] [data-befehl]'),
      rechteck: await lies.rechteck(k.seite, '[data-ort="leiste"]'),
    };
    const huellbox_grundplatte = (await lies.projektion(k.seite, 'grundplatte')).huellbox;
    const modellzone = await lies.rechteck(k.seite, '[data-zone="modell"]');
    await k.lauf.klickPunkt(platte.flaechen.oben, { button: 'right' });
    const rechtsklick_modell = await befehleIn('[data-ort="menue"] [data-befehl]');
    await k.lauf.taste('Escape');
    await k.lauf.klick('[data-zone="aufbau"] [data-schritt="grundplatte"]', { button: 'right' });
    const rechtsklick_aufbau = await befehleIn('[data-ort="menue"] [data-befehl]');
    await k.seite.close();

    const v = await frisch(browser, basis, 'halter');
    const modell_vorher = await lies.modell(v.seite);
    const teil_vorher = await lies.teil(v.seite);
    const steg = await lies.projektion(v.seite, 'steg');
    await v.lauf.klickPunkt(steg.flaechen.vorn);
    await v.lauf.klick('[data-ort="leiste"] [data-befehl="schritt.verwerfen"]');
    const verwerfen_steg = {
      modell_vorher,
      teil_vorher,
      modell: await lies.modell(v.seite),
      teil: await lies.teil(v.seite),
      ansicht: await lies.ansicht(v.seite),
    };
    await v.lauf.taste('Control+Z');
    verwerfen_steg.modell_nach_rueckgaengig = await lies.modell(v.seite);
    verwerfen_steg.teil_nach_rueckgaengig = await lies.teil(v.seite);
    await v.seite.close();
    return {
      leiste,
      huellbox_grundplatte,
      modellzone,
      rechtsklick_modell,
      rechtsklick_aufbau,
      verwerfen_steg,
    };
  },
};

/** Sichtbare Zahlen am Zeiger mit Abstand der Textmitte vom Zeiger. */
export async function zeigerTexte(seite, zeiger) {
  return seite.evaluate((z) => {
    return [...document.querySelectorAll('[data-overlay="zahl-am-zeiger"]')]
      .filter((e) => window.__pruef.sichtbar(e))
      .map((e) => {
        const r = e.getBoundingClientRect();
        const p = z;
        return {
          text: e.textContent.trim(),
          abstand_px: Math.hypot(r.left + r.width / 2 - p.x, r.top + r.height / 2 - p.y),
        };
      });
  }, zeiger ?? null);
}

/** Maus am Griff „Dicke“ drücken (Seite, Startpunkt und Bildschirmvektor je mm). */
export async function griffAnfassen(seite) {
  const griff = await lies.rechteck(seite, '[data-griff]');
  const p = await lies.projektion(seite, 'grundplatte');
  const start = mitteVon(griff);
  await seite.mouse.move(start.x, start.y);
  await seite.mouse.down();
  await zeichnen(seite);
  return { start, mm: p.z_px_pro_mm };
}
