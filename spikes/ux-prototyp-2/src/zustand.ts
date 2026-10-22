// Zustand der Oberfläche (nicht des Modells): Auswahl, Ort, Darstellung, offene Ansichten.
import type { Darstellung, Thema } from './ansicht/szene';
import type { Vorschlag } from './ki/absicht';
import type { Groesse } from './wert/wertfeld';

export type Ort = { art: 'teil' | 'skizze'; schritt: string | null };

export interface Live {
  element: string;
  name: string;
  wert: Groesse;
}

export interface Ziehen {
  schritt: string;
  /** Name des Parameters (z. B. `dicke`). */
  name: string;
  start: number;
  startPunkt: { x: number; y: number };
  /** Bildschirm-Richtung von +1 mm (Pixel je mm). */
  richtung: { x: number; y: number };
  eingabe: string;
  zeiger: { x: number; y: number };
}

export type GespraechPhase = 'arbeitet' | 'karte' | 'erklaerung' | 'angehalten';

export interface Gespraech {
  frage: string;
  phase: GespraechPhase;
  vorschlag: Vorschlag | null;
  /** Fortschritt in Plan-Schritten (0 bis 3). */
  plan: number;
}

export type InspektorModus = 'auswahl' | 'gespraech' | 'entwuerfe';

export interface Ui {
  auswahl: string[];
  hover: string | null;
  ort: Ort;
  darstellung: Darstellung;
  bereich: string;
  thema: Thema;
  inspektor: InspektorModus;
  live: Live | null;
  ziehen: Ziehen | null;
  suche: { offen: boolean; text: string; index: number; facette: 'alle' | 'befehle' | 'elemente' };
  menue: { x: number; y: number } | null;
  ebenenWahl: boolean;
  geist: string | null;
  verbinden: { phase: 'von' | 'nach'; von?: string } | null;
  gespraech: Gespraech | null;
  entwurfAnsicht: 'ergebnis' | 'alle';
  vergleich: boolean;
  rueckmeldung: { schluessel: string; werte?: Record<string, string | number> };
  zeichnen: { u0: number; v0: number; u1: number; v1: number } | null;
  befundZustand: string | null;
  unbekannterZustand: boolean;
}

export const neuerUi = (): Ui => ({
  auswahl: [],
  hover: null,
  ort: { art: 'teil', schritt: null },
  darstellung: 'koerper',
  bereich: 'modell',
  thema: 'hell',
  inspektor: 'auswahl',
  live: null,
  ziehen: null,
  suche: { offen: false, text: '', index: 0, facette: 'alle' },
  menue: null,
  ebenenWahl: false,
  geist: null,
  verbinden: null,
  gespraech: null,
  entwurfAnsicht: 'ergebnis',
  vergleich: false,
  rueckmeldung: { schluessel: 'app.bereit' },
  zeichnen: null,
  befundZustand: null,
  unbekannterZustand: false,
});
