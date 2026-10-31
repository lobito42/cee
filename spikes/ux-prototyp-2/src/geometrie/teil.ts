// Simulierte Geometrie (Wegwerf, kein Kernel): Körper aus Platten, Quadern, Schalen und Rohren sowie
// Abmessungen, Volumen und Masse nach design.md. Rein, ohne DOM und three.js.
import { AUSGANGSWERTE } from '../modell/beispiele';
import { alleElemente, istVerworfen, nachfahren, wert, type Element } from '../modell/element';

export type V3 = [number, number, number];

export const DICHTE_G_MM3 = 1.24e-3; // PLA, 1,24 g/cm³ (design.md)
const RUNDUNG = 1 - Math.PI / 4;
/** Ab diesem Durchmesser ist die Bohrung ungültig (design.md, Rückmeldung und Fehler). */
export const GRENZE_BOHRUNG_MM = 50;

export type Art = 'platte' | 'quader' | 'schale' | 'rohr' | 'skizze';

export interface Koerper {
  /** Element, das diese Flächen erzeugt (jede Fläche trägt diese ID). */
  elementId: string;
  art: Art;
  min: V3;
  max: V3;
  platte?: {
    laenge: number;
    breite: number;
    dicke: number;
    eckradius: number;
    loecher: { x: number; y: number }[];
    lochD: number;
  };
  wand?: number;
  rohr?: { x: number; y: number; d: number };
}

export interface Befund {
  elementId: string;
  /** Übersetzungsschlüssel des Befundtexts. */
  schluessel: string;
  parameter: string;
  wert: number;
  grenze: number;
  /** Befund des Geometriekerns (ap-50): Code und fertiger Text, ohne Korrekturwert. */
  code?: string;
  text?: string;
}

export interface TeilErgebnis {
  koerper: Koerper[];
  volumen_mm3: number;
  masse_g: number;
  abmessungen_mm: V3;
  befunde: Befund[];
}

const aktiv = (e: Element | undefined): e is Element => !!e && !istVerworfen(e);

/** Befunde eines Dokuments: Elemente mit ungültigen Werten sind fehlerhaft (ADR-050). */
export function befunde(wurzel: Element): Befund[] {
  const liste: Befund[] = [];
  for (const e of alleElemente(wurzel)) {
    if (istVerworfen(e)) continue;
    if (e.type === 'bohrung' && wert(e.params.durchmesser) >= GRENZE_BOHRUNG_MM) {
      liste.push({
        elementId: e.id,
        schluessel: 'befund.bohrung-zu-gross',
        parameter: 'durchmesser',
        wert: wert(e.params.durchmesser),
        grenze: GRENZE_BOHRUNG_MM,
      });
    }
    if (e.id === 'steg' && wert(e.params.hoehe) <= 0) {
      liste.push({
        elementId: e.id,
        schluessel: 'befund.steg-ohne-hoehe',
        parameter: 'hoehe',
        wert: wert(e.params.hoehe),
        grenze: 0,
      });
    }
  }
  return liste;
}

/** Wert eines Parameters, bei fehlerhaftem Element der letzte gültige (Ausgangswert). */
function gueltig(e: Element, name: string, fehler: Set<string>): number {
  if (fehler.has(e.id)) return AUSGANGSWERTE[e.id]?.[name] ?? wert(e.params[name]);
  return wert(e.params[name]);
}

function plattenBox(e: Element, versatz: V3, z0: number, h: number): { min: V3; max: V3 } {
  const l = wert(e.params.laenge);
  const b = wert(e.params.breite);
  const y = wert(e.params.lage_y);
  return {
    min: [versatz[0] - l / 2, versatz[1] + y - b / 2, versatz[2] + z0],
    max: [versatz[0] + l / 2, versatz[1] + y + b / 2, versatz[2] + z0 + h],
  };
}

/** Körper und Kennzahlen aller aktiven Elemente unter `wurzel` (ein Teil, eine Baugruppe oder das Projekt). */
export function ergebnisVon(wurzel: Element): TeilErgebnis {
  const fehler = new Set(befunde(wurzel).map((b) => b.elementId));
  const koerper: Koerper[] = [];
  let volumen = 0;

  const lage = (teil: Element): V3 => [wert(teil.params.lage_x), wert(teil.params.lage_y), 0];

  function teilAuswerten(teil: Element, versatz: V3): void {
    const schritte = teil.content.filter((k) => aktiv(k));
    let plattenDicke = 0;
    for (const s of schritte) {
      if (s.type === 'skizze') {
        const l = wert(s.params.laenge);
        const b = wert(s.params.breite);
        koerper.push({
          elementId: s.id,
          art: 'skizze',
          min: [versatz[0] - l / 2, versatz[1] - b / 2, 0],
          max: [versatz[0] + l / 2, versatz[1] + b / 2, 0],
          platte: {
            laenge: l,
            breite: b,
            dicke: 0,
            eckradius: wert(s.params.eckradius),
            loecher: [],
            lochD: 0,
          },
        });
      }
    }
    for (const s of schritte) {
      if (s.type === 'extrusion' && s.params.dicke !== undefined) {
        const haupt = s.id === 'grundplatte';
        const dicke = wert(s.params.dicke);
        const l = wert(s.params.laenge);
        const b = wert(s.params.breite);
        const r = wert(s.params.eckradius);
        const y0 = versatz[1] + wert(s.params.lage_y);
        if (haupt) plattenDicke = dicke;
        const bohr = haupt ? schritte.find((x) => x.type === 'bohrung') : undefined;
        const d = bohr ? gueltig(bohr, 'durchmesser', fehler) : 0;
        const ax = bohr ? wert(bohr.params.abstand_x) : 0;
        const ly = bohr ? wert(bohr.params.lage_y) : 0;
        const loecher = bohr
          ? [
              { x: versatz[0] + ax, y: y0 + ly },
              { x: versatz[0] - ax, y: y0 + ly },
            ]
          : [];
        koerper.push({
          elementId: s.id,
          art: 'platte',
          min: [versatz[0] - l / 2, y0 - b / 2, versatz[2]],
          max: [versatz[0] + l / 2, y0 + b / 2, versatz[2] + dicke],
          platte: { laenge: l, breite: b, dicke, eckradius: r, loecher, lochD: d },
        });
        volumen += (l * b - 4 * r * r * RUNDUNG) * dicke;
        if (bohr) {
          volumen -= loecher.length * Math.PI * (d / 2) ** 2 * dicke;
          for (const loch of loecher) {
            koerper.push({
              elementId: bohr.id,
              art: 'rohr',
              min: [loch.x - d / 2, loch.y - d / 2, versatz[2]],
              max: [loch.x + d / 2, loch.y + d / 2, versatz[2] + dicke],
              rohr: { x: loch.x, y: loch.y, d },
            });
          }
        }
      }
    }
    for (const s of schritte) {
      if (s.type === 'extrusion' && s.params.dicke === undefined) {
        const hoehe = s.params.hoehe !== undefined ? gueltig(s, 'hoehe', fehler) : 0;
        const box = plattenBox(s, versatz, plattenDicke, hoehe);
        koerper.push({ elementId: s.id, art: 'quader', min: box.min, max: box.max });
        volumen += wert(s.params.laenge) * wert(s.params.breite) * hoehe;
      } else if (s.type === 'schale') {
        const l = wert(s.params.laenge);
        const b = wert(s.params.breite);
        const h = wert(s.params.hoehe);
        const w = wert(s.params.wand);
        koerper.push({
          elementId: s.id,
          art: 'schale',
          min: [versatz[0] - l / 2, versatz[1] - b / 2, versatz[2]],
          max: [versatz[0] + l / 2, versatz[1] + b / 2, versatz[2] + h],
          wand: w,
        });
        volumen += l * b * h - (l - 2 * w) * (b - 2 * w) * (h - w);
      }
    }
  }

  const teile = alleElemente(wurzel).filter((e) => e.type === 'teil' && aktiv(e));
  const behandelt = new Set<string>();
  for (const t of teile) {
    if (nachfahrenVerworfen(wurzel, t)) continue;
    behandelt.add(t.id);
    teilAuswerten(t, lage(t));
  }

  const abm: V3 = [0, 0, 0];
  const echte = koerper.filter((k) => k.art !== 'skizze' && k.art !== 'rohr');
  if (echte.length) {
    for (let i = 0; i < 3; i++) {
      abm[i] =
        Math.max(...echte.map((k) => k.max[i] as number)) -
        Math.min(...echte.map((k) => k.min[i] as number));
    }
  }
  return {
    koerper,
    volumen_mm3: volumen,
    masse_g: volumen * DICHTE_G_MM3,
    abmessungen_mm: abm,
    befunde: befunde(wurzel),
  };
}

/** Ein Teil unter einem verworfenen Vorfahren zählt nicht. */
function nachfahrenVerworfen(wurzel: Element, teil: Element): boolean {
  for (const e of alleElemente(wurzel)) {
    if (istVerworfen(e) && nachfahren(e).some((k) => k.id === teil.id)) return true;
  }
  return false;
}

/** Hüllquader der Körper, die ein Element (samt Nachfahren) erzeugen. */
export function huelleVon(e: Element, koerper: Koerper[]): { min: V3; max: V3 } | null {
  const ids = new Set([e.id, ...nachfahren(e).map((k) => k.id)]);
  const teile = koerper.filter((k) => ids.has(k.elementId) && k.art !== 'skizze');
  const mit = teile.length ? teile : koerper.filter((k) => ids.has(k.elementId));
  if (!mit.length) return null;
  const min: V3 = [Infinity, Infinity, Infinity];
  const max: V3 = [-Infinity, -Infinity, -Infinity];
  for (const k of mit) {
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i] as number, k.min[i] as number);
      max[i] = Math.max(max[i] as number, k.max[i] as number);
    }
  }
  return { min, max };
}
