// Testzustände per Adresse (design.md): jeder Zustand entsteht ohne Klick und ohne Tastendruck.
import type { App } from '../app';
import de from '../i18n/de.json';
import { erkenne } from '../ki/absicht';
import { aktiverEntwurf, neuerEntwurf } from '../modell/entwurf';
import {
  element,
  finde,
  gehaeuseProjekt,
  halterMitSimulation,
  halterProjekt,
  kopie,
  leeresProjekt,
  mm,
  rechteckSkizze,
  type Projekt,
} from '../modell/projekt';
import { griffeListe } from '../zonen/modellzone';

export const ZUSTAENDE = [
  'leer', 'halter', 'schritt', 'ziehen', 'skizze', 'extrusion', 'kanten', 'durchsicht', 'befund', 'teile',
  'verbindung', 'suche', 'entwuerfe', 'vergleich', 'ki-gespraech', 'ki-vorschlag', 'simulation',
]; // prettier-ignore

interface Aufbau {
  projekt: Projekt;
  /** Schritte nach dem ersten Zeichnen und Einpassen (z. B. Kamera für die Skizze). */
  danach?: (app: App) => void;
}

const teilVon = (p: Projekt) => p.content.find((t) => t.type === 'teil') ?? p.content[0]!;

function mitVerrundung(p: Projekt, radius: number, kanten: string[]): Projekt {
  teilVon(p).content.push(
    element('verrundung', 'verrundung', 'Verrundung', { ziel: 'steg', radius: mm(radius), kanten }),
  );
  return p;
}

const obenKanten = (...namen: string[]) => namen.map((n) => `steg/k/${n}`);

function mitEntwurf(p: Projekt, aktiv: boolean): Projekt {
  const liste = (p.params.entwuerfe as ReturnType<typeof neuerEntwurf>[]) ?? [];
  const e = neuerEntwurf('entwurf-1', 'Dickere Platte', { grundplatte: { dicke: mm(10) } });
  p.params.entwuerfe = [...liste, e];
  if (aktiv) p.params.aktiverEntwurf = e.id;
  return p;
}

/** Teil 1 mit geschlossener Skizze 80 × 50 mm und Extrusion (Vorgabe 10 mm). */
function teilMitExtrusion(): Projekt {
  const p = leeresProjekt();
  teilVon(p).content.push(
    element('extrusion-1', 'extrusion', 'Extrusion 1', {
      dicke: mm(10),
      skizze: rechteckSkizze('skizze-1', 'XY', 80, 50),
    }),
  );
  return p;
}

function baugruppeMitVerbindung(app: App): Projekt {
  const p = gehaeuseProjekt();
  app.sitzung.setzen(p);
  const mitBaugruppe = app.sitzung.probe([
    { id: 'baugruppe.anlegen', parameter: { teile: ['gehaeuse', 'deckel'] } },
  ]);
  app.sitzung.setzen(mitBaugruppe);
  return app.sitzung.probe([
    {
      id: 'verbindung.anlegen',
      parameter: {
        von: 'deckel-unterseite',
        nach: 'gehaeuse-oberkante',
        art: 'Fest',
        mover: 'instanz-deckel',
      },
    },
  ]);
}

const AUFBAU: Record<string, (app: App) => Aufbau> = {
  leer: () => ({ projekt: leeresProjekt() }),
  halter: () => ({ projekt: halterProjekt() }),
  schritt: (app) => ({
    projekt: halterProjekt(),
    danach: () => void (app.ui.auswahl = ['grundplatte']),
  }),
  ziehen: (app) => ({
    projekt: halterProjekt(),
    danach: () => {
      app.ui.auswahl = ['grundplatte'];
      app.rendern();
      const g = document.querySelector<HTMLElement>('.griff');
      const r = g?.getBoundingClientRect();
      const zeiger = r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 700, y: 300 };
      app.ui.ziehen = {
        schritt: 'grundplatte',
        name: 'dicke',
        start: 8,
        startPunkt: zeiger,
        richtung: { x: 0, y: -5 },
        eingabe: '',
        zeiger,
      };
      app.ui.live = { element: 'grundplatte', name: 'dicke', wert: mm(12) };
    },
  }),
  skizze: (app) => ({
    projekt: halterProjekt(),
    danach: () => app.ortBetreten('grundplatte', true),
  }),
  extrusion: (app) => ({
    projekt: teilMitExtrusion(),
    danach: () => {
      app.ui.auswahl = ['extrusion-1'];
      app.ui.geist = 'extrusion-1';
    },
  }),
  kanten: (app) => ({
    projekt: halterProjekt(),
    danach: () => void (app.ui.darstellung = 'kanten'),
  }),
  durchsicht: (app) => ({
    projekt: halterProjekt(),
    danach: () => void (app.ui.darstellung = 'durchsicht'),
  }),
  befund: (app) => ({
    projekt: mitVerrundung(halterProjekt(), 8, obenKanten('oben-vorn', 'oben-hinten')),
    danach: () => void (app.ui.auswahl = ['verrundung']),
  }),
  teile: () => ({ projekt: gehaeuseProjekt() }),
  verbindung: (app) => ({
    projekt: baugruppeMitVerbindung(app),
    danach: () => {
      const v = app.sitzung
        .modell()
        .content.find((k) => k.type === 'baugruppe')
        ?.content.find((k) => k.type === 'verbindung');
      app.ui.auswahl = v ? [v.id] : [];
    },
  }),
  suche: (app) => ({
    projekt: mitVerrundung(halterProjekt(), 3, obenKanten('oben-vorn', 'oben-hinten')),
    danach: () => void (app.ui.suche = { offen: true, text: 'ver', index: 0, facette: 'alle' }),
  }),
  entwuerfe: (app) => ({
    projekt: mitEntwurf(halterProjekt(), false),
    danach: () => {
      app.ui.inspektor = 'entwuerfe';
      app.ui.entwurfAnsicht = 'alle';
    },
  }),
  vergleich: (app) => ({
    projekt: mitEntwurf(halterProjekt(), true),
    danach: () => {
      app.ui.inspektor = 'entwuerfe';
      app.ui.vergleich = true;
      void aktiverEntwurf;
    },
  }),
  'ki-gespraech': (app) => ({
    projekt: halterProjekt(),
    danach: () => {
      app.ui.auswahl = ['steg'];
      app.ui.inspektor = 'gespraech';
      app.ui.gespraech = {
        frage: app.t('ki.satz.verrunden'),
        phase: 'arbeitet',
        vorschlag: null,
        plan: 2,
      };
    },
  }),
  'ki-vorschlag': (app) => ({
    projekt: halterProjekt(),
    danach: () => {
      app.ui.auswahl = ['steg'];
      app.ui.inspektor = 'gespraech';
      const satz = (de as { ki: { satz: { verrunden: string } } }).ki.satz.verrunden;
      const vorschlag = erkenne(satz, { projekt: app.angezeigt(), auswahl: ['steg'] });
      app.ui.gespraech = { frage: app.t('ki.satz.verrunden'), phase: 'karte', vorschlag, plan: 3 };
      if (vorschlag) app.vorschauErzeugen(vorschlag);
    },
  }),
  simulation: (app) => ({
    projekt: halterMitSimulation(),
    danach: () => {
      app.ui.bereich = 'simulation';
      app.ui.auswahl = ['sim-kraft'];
    },
  }),
};

/** Stellt den Zustand her; liefert den Namen des gezeigten Zustands (unbekannt → „leer“ mit Befund). */
export function anwenden(name: string, app: App): { gezeigt: string; danach?: (app: App) => void } {
  const bauer = AUFBAU[name || 'halter'];
  if (!bauer) {
    app.sitzung.setzen(leeresProjekt());
    app.ui.unbekannterZustand = true;
    return { gezeigt: 'leer' };
  }
  const a = bauer(app);
  app.sitzung.setzen(kopie(a.projekt));
  void finde;
  void griffeListe;
  return { gezeigt: name || 'halter', danach: a.danach };
}
