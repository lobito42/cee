// Prüfbefehl `fenster`: Zonen, Menüleiste, Schalter, Taskleiste (design.md, Fensteraufbau).
import { MOD, adresse, lies, oeffnen, schliessen, Lauf } from './grundlage.mjs';

/** Liest die geöffneten Menüs der Menüleiste: je Dropdown Name, Untergruppen und Einträge. */
async function dropdownsLesen(seite, lauf) {
  const ausloeser = await seite.$$eval(
    '[data-zone="menueleiste"] [data-menue-trigger^="dropdown:"]',
    (l) => l.map((e) => ({ id: e.dataset.menueTrigger, name: e.textContent.trim() })),
  );
  const aus = [];
  for (const a of ausloeser) {
    await lauf.klick(`[data-menue-trigger="${a.id}"]`);
    const untergruppen = await seite.$$eval(
      '[data-zone="menueleiste"] .popup [role="group"]',
      (gruppen) =>
        gruppen.map((g) => ({
          name: g.dataset.untergruppe,
          eintraege: [...g.querySelectorAll('[data-befehl]')].map((e) => ({
            befehl: e.dataset.befehl,
          })),
        })),
    );
    aus.push({ name: a.name, untergruppen });
    await lauf.taste('Escape');
  }
  return aus;
}

export const fensterBefehle = {
  async fenster({ browser, basis }) {
    const zustaende = [];
    for (const zustand of ['halter', 'befund', 'chat']) {
      const o = await oeffnen(browser, adresse(basis, zustand));
      const lauf = new Lauf(o.seite);
      const daten = await o.seite.evaluate(() => {
        const p = window.__pruef;
        const rz = document.querySelector('[role="tablist"]');
        const kuerzel = (befehl) =>
          p.text(document.querySelector(`[data-zone="menueleiste"] [data-befehl="${befehl}"] kbd`));
        return {
          fenster: { breite: window.innerWidth, hoehe: window.innerHeight },
          zonen: [...document.querySelectorAll('[data-zone]')].map((e) => ({
            zone: e.dataset.zone,
            sichtbar: p.sichtbar(e),
            rechteck: p.rechteck(e),
          })),
          tabs: [...document.querySelectorAll('[role="tab"]')].map((t) => ({
            text: p.text(t),
            rechteck: p.rechteck(t),
          })),
          reiterzeile: rz ? p.rechteck(rz) : null,
          start_menue: !!document.querySelector(
            '[data-zone="menueleiste"] [data-menue-trigger="start"]',
          ),
          suche: { kuerzel_text: kuerzel('suche.oeffnen') },
          rueckgaengig: { kuerzel_text: kuerzel('bearbeiten.rueckgaengig') },
        };
      });
      const dropdowns = await dropdownsLesen(o.seite, lauf);
      zustaende.push({
        zustand,
        fenster: daten.fenster,
        zonen: daten.zonen,
        tabs: daten.tabs,
        reiterzeile: daten.reiterzeile,
        menueleiste: {
          start_menue: daten.start_menue,
          dropdowns,
          suche: daten.suche,
          rueckgaengig: daten.rueckgaengig,
        },
      });
      await schliessen(o);
    }

    // Schalter im Zustand halter: Tasten und Klicks
    const o = await oeffnen(browser, adresse(basis, 'halter'));
    const lauf = new Lauf(o.seite);
    const sichtbar = () => o.seite.evaluate(() => window.__pruef.zonenSichtbar());
    const tasten = [];
    for (const taste of ['Mod+B', 'Mod+J', 'Mod+Alt+B']) {
      const vorher = await sichtbar();
      await lauf.taste(
        taste.replace('Mod', MOD).replace(/\+([a-z])$/i, (_, b) => `+${b.toLowerCase()}`),
      );
      const nachher = await sichtbar();
      tasten.push({ taste, vorher, nachher });
      await lauf.taste(
        taste.replace('Mod', MOD).replace(/\+([a-z])$/i, (_, b) => `+${b.toLowerCase()}`),
      );
    }
    const klicks = [];
    for (const befehl of ['fenster.struktur', 'fenster.panel', 'fenster.rechts']) {
      const vorher = await sichtbar();
      await lauf.klick(`[data-zone="menueleiste"] [data-befehl="${befehl}"]`);
      const nachher = await sichtbar();
      klicks.push({ befehl, vorher, nachher });
      await lauf.klick(`[data-zone="menueleiste"] [data-befehl="${befehl}"]`);
    }
    await schliessen(o);

    // Taskleiste: Steg wählen, Simulation, zurück
    const t = await oeffnen(browser, adresse(basis, 'halter'));
    const tl = new Lauf(t.seite);
    const stand = () =>
      t.seite.evaluate(() => {
        const p = window.__pruef;
        return {
          dropdowns: [...document.querySelectorAll('[data-menue-trigger^="dropdown:"]')].map((e) =>
            p.text(e),
          ),
          struktur_texte: p.texte(document.querySelector('[data-zone="struktur"]')),
          leerer_zustand: !!document.querySelector(
            '[data-zone="struktur"] [data-muster="Leerer Zustand"]',
          ),
          auswahl: window.__cee.auswahl(),
        };
      });
    await tl.klick('[data-zone="struktur"] [role="treeitem"][data-id="steg"]');
    const vorher = await stand();
    await tl.klick(
      '[data-zone="taskleiste"] [data-befehl="task.wechseln"][data-par*="simulation"]',
    );
    const simulation = await stand();
    await tl.klick(
      '[data-zone="taskleiste"] [data-befehl="task.wechseln"][data-par*="modellieren"]',
    );
    const zurueck = await stand();
    await schliessen(t);

    return { zustaende, schalter: { tasten, klicks }, taskleiste: { vorher, simulation, zurueck } };
  },
};

void lies;
