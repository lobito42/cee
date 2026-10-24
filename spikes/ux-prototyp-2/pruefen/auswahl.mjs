// Prüfbefehle `elementzustaende` und `auswahl` (design.md: Elementzustände, Eine Auswahl für alles).
import { MOD, Lauf, adresse, bildPfad, lies, oeffnen, schliessen } from './grundlage.mjs';

const ZEILE = (id) => `[data-zone="struktur"] [role="treeitem"][data-id="${id}"]`;

/** Ein Punkt, der sicher das Element trifft (Mitte der Trefferliste). */
export async function trefferPunkt(seite, id, nr = null) {
  const liste = await seite.evaluate(
    (i) => window.__cee.ansicht().projektion_von(i)?.treffer ?? [],
    id,
  );
  if (!liste.length) throw new Error(`keine Trefferpunkte für ${id}`);
  return liste[nr ?? Math.floor(liste.length / 2)];
}

/** Ein Punkt im Modell, der nichts trifft (links unten). */
export async function leererPunkt(seite) {
  const z = await lies.zone(seite, 'modell');
  return { x: z.x + 24, y: z.y + z.hoehe - 140 };
}

export const alleDarstellungen = (seite) =>
  seite.evaluate(() =>
    window.__cee.elemente().map((id) => ({
      id,
      name: window.__cee.modell().content.flatMap(function lauf(e) {
        return e.id === id ? [e.meta.name] : e.content.flatMap(lauf);
      })[0],
      darstellungen: window.__cee.zustaende(id),
    })),
  );

const gewaehlteKonturen = (seite) =>
  seite.evaluate(() =>
    [...document.querySelectorAll('[data-zone="modell"] path[data-kontur-id]')]
      .filter((p) => p.dataset.zustand === 'ausgewaehlt')
      .map((p) => p.dataset.konturId),
  );

/** Zustand der Anzeige in allen Zonen (Struktur, Modell, Eigenschaften, Chat). */
async function anzeige(seite) {
  return seite.evaluate(() => {
    const p = window.__pruef;
    return {
      auswahl: window.__cee.auswahl(),
      struktur_aria_selected: [
        ...document.querySelectorAll(
          '[data-zone="struktur"] [role="treeitem"][aria-selected="true"]',
        ),
      ].map((z) => z.dataset.id),
      eigenschaften_name: p.text(
        document.querySelector(
          '[data-zone="eigenschaften"] .zonenkopf h2, [data-zone="eigenschaften"] .zonenkopf input',
        ),
      ),
      chat_kontext: p.text(document.querySelector('[data-chat-kontext]')),
    };
  });
}

async function zustandS(seite) {
  const a = await anzeige(seite);
  return { ...a, modell_kontur: await gewaehlteKonturen(seite) };
}

/** Sichtbare, wählbare Zeilen der Struktur (nicht ausgeblendet, nicht verworfen). */
const sichtbareIds = (seite) =>
  seite.evaluate(() =>
    window.__pruef
      .struktur()
      .filter((z) => !z.zustaende.includes('ausgeblendet') && !z.zustaende.includes('verworfen'))
      .map((z) => z.id),
  );

async function folgeEintrag(seite) {
  return { auswahl: await lies.auswahl(seite), sichtbare_ids: await sichtbareIds(seite) };
}

const felder = (seite) =>
  seite.evaluate(() =>
    [...document.querySelectorAll('[data-zone="eigenschaften"] .feld')].map((f) => {
      const eingabe = f.querySelector('input');
      return {
        name: window.__pruef.text(f.querySelector('label')),
        wert_text: eingabe
          ? eingabe.value
          : window.__pruef.text(f.querySelector('[data-wert-text]')),
        gemischt: eingabe?.dataset.gemischt === 'true',
      };
    }),
  );

export const auswahlBefehle = {
  async elementzustaende({ browser, basis }) {
    // 1. Elemente mit allen acht Zuständen aus mehreren Seiten (echte Zustände der Testseiten)
    const elemente = [];
    const sammeln = async (zustand, vorbereiten) => {
      const o = await oeffnen(browser, adresse(basis, zustand));
      const lauf = new Lauf(o.seite);
      if (vorbereiten) await vorbereiten(lauf, o.seite);
      const liste = await alleDarstellungen(o.seite);
      for (const e of liste) {
        const z = e.darstellungen;
        const hat = Object.values(z).some((d) => d && d.zustaende.length);
        if (hat) elemente.push({ ...e, quelle: zustand });
      }
      await schliessen(o);
    };
    await sammeln('zustaende');
    await sammeln('andere');
    await sammeln('aktiv');
    await sammeln('rechnet');
    await sammeln('befund');
    // pausiert: über das Kontextmenü des Stegs (Mehr …)
    const status = [];
    {
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const lauf = new Lauf(o.seite);
      await o.seite.click(ZEILE('steg'), { button: 'right' });
      lauf.eingaben += 1;
      await lauf.warte();
      await lauf.klick('.kontextmenue [data-mehr-toggle="Bearbeiten"]');
      await lauf.klick('.kontextmenue [data-befehl="element.pausieren"]');
      const liste = await alleDarstellungen(o.seite);
      elemente.push(
        ...liste.filter((e) => e.id === 'steg').map((e) => ({ ...e, quelle: 'pausiert' })),
      );
      status.push(await statusLesen(o.seite, 'steg', 'pausiert'));
      await schliessen(o);
    }
    for (const [zustand, id, name] of [
      ['rechnet', 'grundplatte', 'rechnet'],
      ['befund', 'bohrungen', 'befund'],
    ]) {
      const o = await oeffnen(browser, adresse(basis, zustand));
      status.push(await statusLesen(o.seite, id, name));
      await schliessen(o);
    }

    // 2. Kontur im Bild: Vorderansicht, Grundplatte gewählt, Steg überfahren
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const lauf = new Lauf(o.seite);
    await lauf.klick(ZEILE('grundplatte'));
    await lauf.klick('[data-menue-trigger="ansicht"]');
    await lauf.klick('.ansichtsleiste [data-befehl="ansicht.vorne"]');
    await lauf.klick('.ansichtsleiste [data-befehl="ansicht.einpassen"]');
    await lauf.bewegen(await rechtsAuf(o.seite, ZEILE('steg')));
    await o.seite.addStyleTag({ content: '[data-chrome]{visibility:hidden !important}' });
    await lauf.warte();
    const zone = await lies.zone(o.seite, 'modell');
    const datei = bildPfad('kontur');
    await o.seite.screenshot({
      path: datei,
      clip: { x: zone.x, y: zone.y, width: zone.breite, height: zone.hoehe },
    });
    const kontur = {};
    const roh = await o.seite.evaluate(() => ({
      grundplatte: {
        punkte: window.__cee.ansicht().kontur_punkte('grundplatte'),
        z: window.__cee.zustaende('grundplatte').modell,
      },
      steg: {
        punkte: window.__cee.ansicht().kontur_punkte('steg'),
        z: window.__cee.zustaende('steg').modell,
      },
    }));
    const breite = (z) => z.kanaele.find((k) => k.kanal === 'Kontur')?.breite ?? null;
    const vonEcken = (a, b) =>
      a.filter((p) => !b.some((q) => Math.abs(q.x - p.x) <= 3 && Math.abs(q.y - p.y) <= 3));
    const aus = (name, andere) => ({
      punkte: vonEcken(roh[name].punkte, roh[andere].punkte).map((p) => ({
        x: p.x - zone.x,
        y: p.y - zone.y,
      })),
      breite: breite(roh[name].z),
    });
    kontur.leinwand = datei;
    kontur.leinwand_rechteck = zone;
    kontur.grundplatte = aus('grundplatte', 'steg');
    kontur.steg = aus('steg', 'grundplatte');
    await schliessen(o);

    const a = await oeffnen(browser, adresse(basis, 'andere'));
    kontur.andere = {
      id: 'steg',
      darstellungen: await a.seite.evaluate(() => window.__cee.zustaende('steg')),
    };
    await schliessen(a);

    // 3. Vorrang
    const vorrang = {};
    {
      const v = await oeffnen(browser, adresse(basis, 'befund'));
      const l = new Lauf(v.seite);
      await l.klick(ZEILE('bohrungen'));
      const konturen = await v.seite.evaluate(() =>
        window.__cee
          .zustaende('bohrungen')
          .modell.kanaele.filter((k) => k.kanal === 'Kontur')
          .map((k) => ({ token: k.token })),
      );
      vorrang.fehlerhaft = {
        id: 'bohrungen',
        konturen,
        status: await statusLesen(v.seite, 'bohrungen', 'befund'),
      };
      delete vorrang.fehlerhaft.status.zustand;
      await schliessen(v);
      const w = await oeffnen(browser, adresse(basis, 'ausgeblendet'));
      const l2 = new Lauf(w.seite);
      await l2.klick(ZEILE('steg'));
      vorrang.ausgeblendet = {
        id: 'steg',
        zeile: await w.seite.evaluate(
          (s) => window.__pruef.zeile(document.querySelector(s)),
          ZEILE('steg'),
        ),
        im_modell_gezeichnet: (await lies.gezeichnet(w.seite)).includes('steg'),
      };
      await schliessen(w);
    }

    return { zustaende: { elemente }, kontur, vorrang, status };
  },

  async auswahl({ browser, basis }) {
    const ergebnis = {};
    // --- Ein Zustand, überall gleich ---
    {
      const eins = {};
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const lauf = new Lauf(o.seite);
      await lauf.klickPunkt(await trefferPunkt(o.seite, 'grundplatte'));
      eins.modell = await zustandS(o.seite);
      await schliessen(o);
      const s = await oeffnen(browser, adresse(basis, 'halter'));
      await new Lauf(s.seite).klick(ZEILE('grundplatte'));
      eins.struktur = await zustandS(s.seite);
      await schliessen(s);
      ergebnis.eins = eins;
    }
    // --- Folge von Klicks, in Struktur und Modell ---
    {
      const folge = { struktur: [], modell: [] };
      const s = await oeffnen(browser, adresse(basis, 'halter'));
      let l = new Lauf(s.seite);
      await l.klick(ZEILE('grundplatte'));
      folge.struktur.push(await folgeEintrag(s.seite));
      await l.klick(ZEILE('steg'), { modifiers: ['Shift'] });
      folge.struktur.push(await folgeEintrag(s.seite));
      await l.klick(ZEILE('grundplatte'), { modifiers: [MOD === 'Control' ? 'Control' : 'Meta'] });
      folge.struktur.push(await folgeEintrag(s.seite));
      await l.taste(`${MOD}+a`);
      folge.struktur.push(await folgeEintrag(s.seite));
      const rest = await lies.zone(s.seite, 'struktur');
      await l.klickPunkt({ x: rest.x + rest.breite / 2, y: rest.y + rest.hoehe - 80 });
      folge.struktur.push(await folgeEintrag(s.seite));
      await schliessen(s);

      const m = await oeffnen(browser, adresse(basis, 'halter'));
      l = new Lauf(m.seite);
      const gp = await trefferPunkt(m.seite, 'grundplatte');
      const steg = await trefferPunkt(m.seite, 'steg');
      await l.klickPunkt(gp);
      folge.modell.push(await folgeEintrag(m.seite));
      await l.klickPunkt(steg, { modifiers: ['Shift'] });
      folge.modell.push(await folgeEintrag(m.seite));
      await l.klickPunkt(gp, { modifiers: ['Control'] });
      folge.modell.push(await folgeEintrag(m.seite));
      await l.taste(`${MOD}+a`);
      folge.modell.push(await folgeEintrag(m.seite));
      await l.klickPunkt(await leererPunkt(m.seite));
      folge.modell.push(await folgeEintrag(m.seite));
      // Esc bei bestehender Auswahl
      await l.klickPunkt(gp);
      await l.taste('Escape');
      folge.esc = await folgeEintrag(m.seite);
      await schliessen(m);
      ergebnis.folge = folge;
    }
    // --- Teil und Baugruppe ---
    {
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const l = new Lauf(o.seite);
      await l.klick('[role="tab"]:has-text("Sensorgehäuse")');
      const punkt = await trefferPunkt(o.seite, 'gehaeuse');
      const b = {};
      await l.klickPunkt(punkt);
      b.klick1 = { auswahl: await lies.auswahl(o.seite), ansicht: await lies.ansicht(o.seite) };
      await l.doppelklickPunkt(punkt);
      const ansicht = await lies.ansicht(o.seite);
      const gedimmt = await o.seite.evaluate(() =>
        window.__pruef
          .struktur()
          .filter((z) => z.zustaende.includes('gedimmt'))
          .map((z) => z.id),
      );
      b.doppelklick = { auswahl: await lies.auswahl(o.seite), ansicht, gedimmt };
      await l.klickPunkt(punkt);
      b.klick3 = {
        auswahl: await lies.auswahl(o.seite),
        erzeuger_id:
          (await o.seite.evaluate(([x, y]) => window.__cee.flaeche_bei(x, y), [punkt.x, punkt.y]))
            ?.erzeuger_id ?? null,
      };
      const verlassen = {};
      await l.klick('[data-befehl="element.verlassen"].fertig');
      verlassen.fertig = await lies.ansicht(o.seite);
      await l.doppelklickPunkt(punkt);
      await l.klickPunkt(punkt);
      await l.taste('Escape');
      await l.taste('Escape');
      verlassen.esc = await lies.ansicht(o.seite);
      await l.doppelklickPunkt(punkt);
      await l.klick('.pfad .glied:first-child');
      verlassen.pfad = await lies.ansicht(o.seite);
      b.verlassen = verlassen;
      ergebnis.baugruppe = b;
      await schliessen(o);
    }
    // --- Mehrere Elemente ---
    {
      const o = await oeffnen(browser, adresse(basis, 'halter'));
      const l = new Lauf(o.seite);
      const einzeln = {};
      await l.klick(ZEILE('grundplatte'));
      einzeln.Grundplatte = (await felder(o.seite)).map(({ name, wert_text }) => ({
        name,
        wert_text,
      }));
      await l.klick(ZEILE('steg'));
      einzeln.Steg = (await felder(o.seite)).map(({ name, wert_text }) => ({ name, wert_text }));
      await l.klick(ZEILE('grundplatte'), { modifiers: ['Shift'] });
      ergebnis.mehrfach = {
        einzeln,
        eigenschaften: await felder(o.seite),
        chat_kontext: await o.seite.evaluate(() =>
          window.__pruef.text(document.querySelector('[data-chat-kontext]')),
        ),
      };
      await schliessen(o);
    }
    return ergebnis;
  },
};

async function statusLesen(seite, id, zustand) {
  return seite.evaluate(
    ([i, z]) => {
      const zeile = document.querySelector(
        `[data-zone="struktur"] [role="treeitem"][data-id="${i}"]`,
      );
      const s = zeile?.querySelector('.status');
      return {
        zustand: z,
        token: s?.dataset.statusToken ?? null,
        symbol: s?.querySelector('[data-icon]')?.dataset.icon ?? null,
        wort: window.__pruef.text(s?.querySelector('.wort')),
      };
    },
    [id, zustand],
  );
}

async function rechtsAuf(seite, selektor) {
  const r = await seite.evaluate(
    (s) => window.__pruef.rechteck(document.querySelector(s)),
    selektor,
  );
  return { x: r.x + r.breite / 2, y: r.y + r.hoehe / 2 };
}
