// Simulierte Geometrie (Wegwerf, kein Kernel): Körper aus Quadern, Zylindern und gerundeten Platten sowie
// Abmessungen, Volumen und Masse nach design.md. Rein, ohne DOM und three.js.
import { alle, skizzeVon, type Element, type Projekt } from '../modell/projekt';

export type V3 = [number, number, number];
export type EbeneName = 'XY' | 'XZ' | 'YZ';

export const DICHTE_G_MM3 = 1.24e-3; // PLA, 1,24 g/cm³ (Annahme, design.md)
const RUNDUNG = 1 - Math.PI / 4;

export interface Kante {
  id: string;
  name: string;
  schritt: string;
  von: V3;
  bis: V3;
  laenge: number;
}

export interface Platte {
  ebene: EbeneName;
  mitte: { u: number; v: number };
  laenge: number;
  breite: number;
  eckradius: number;
  dicke: number;
  z0: number;
  loecher: { x: number; y: number }[];
  lochDurchmesser: number;
}

export interface Koerper {
  /** Schritt (bzw. Teil oder Instanz), dem jede Fläche dieses Körpers gehört. */
  schritt: string;
  art: 'platte' | 'quader' | 'zylinder' | 'schale';
  min: V3;
  max: V3;
  platte?: Platte;
  /** Quader mit gerundeten oberen Längskanten (Radius 0 = scharf). */
  rundung?: { vorn: number; hinten: number };
  wand?: number;
  kanten: Kante[];
  /** Fehlerhafte Verrundung (Radius zu groß). */
  fehlerhaft?: boolean;
  sichtbar: boolean;
}

export interface Befund {
  schritt: string;
  radius: number;
  grenze: number;
}

export interface TeilErgebnis {
  koerper: Koerper[];
  volumen_mm3: number;
  masse_g: number;
  abmessungen_mm: V3;
  befunde: Befund[];
}

const wert = (g: unknown): number =>
  g && typeof g === 'object' ? (g as { value: number }).value : 0;

const hatFlag = (e: Element, flag: 'verworfen' | 'ausgeblendet'): boolean => e.meta[flag] === true;

function kantenVon(schritt: string, min: V3, max: V3, nurWaagrecht: boolean): Kante[] {
  const eck = (x: 'links' | 'rechts', y: 'vorn' | 'hinten', z: 'unten' | 'oben'): V3 => [
    x === 'links' ? min[0] : max[0],
    y === 'vorn' ? min[1] : max[1],
    z === 'unten' ? min[2] : max[2],
  ];
  const liste: Kante[] = [];
  const neu = (name: string, von: V3, bis: V3) =>
    liste.push({
      id: `${schritt}/k/${name}`,
      name,
      schritt,
      von,
      bis,
      laenge: Math.hypot(bis[0] - von[0], bis[1] - von[1], bis[2] - von[2]),
    });
  for (const z of ['oben', 'unten'] as const) {
    neu(`${z}-vorn`, eck('links', 'vorn', z), eck('rechts', 'vorn', z));
    neu(`${z}-hinten`, eck('links', 'hinten', z), eck('rechts', 'hinten', z));
    neu(`${z}-links`, eck('links', 'vorn', z), eck('links', 'hinten', z));
    neu(`${z}-rechts`, eck('rechts', 'vorn', z), eck('rechts', 'hinten', z));
  }
  if (!nurWaagrecht) {
    for (const x of ['links', 'rechts'] as const) {
      for (const y of ['vorn', 'hinten'] as const)
        neu(`${y}-${x}`, eck(x, y, 'unten'), eck(x, y, 'oben'));
    }
  }
  return liste;
}

/** Welt-Quader einer Platte (Skizze mit Ebene, Mitte, Länge, Breite, Dicke). */
function plattenBox(p: Platte): { min: V3; max: V3 } {
  const u0 = p.mitte.u - p.laenge / 2;
  const u1 = p.mitte.u + p.laenge / 2;
  const v0 = p.mitte.v - p.breite / 2;
  const v1 = p.mitte.v + p.breite / 2;
  switch (p.ebene) {
    case 'XZ':
      return { min: [u0, -p.z0 - p.dicke, v0], max: [u1, -p.z0, v1] };
    case 'YZ':
      return { min: [p.z0, u0, v0], max: [p.z0 + p.dicke, u1, v1] };
    default:
      return { min: [u0, v0, p.z0], max: [u1, v1, p.z0 + p.dicke] };
  }
}

function ebeneVon(skizze: Element): EbeneName {
  const e = skizze.params.ebene;
  return e === 'XZ' || e === 'YZ' ? e : 'XY';
}

/** Radius, ab dem eine Verrundung am Steg nicht mehr möglich ist: die halbe Stegbreite. */
const rundungsGrenze = (k: Koerper): number =>
  Math.min(k.max[1] - k.min[1], k.max[0] - k.min[0]) / 2;

/** Körper, Volumen, Masse und Abmessungen eines Teils mit Schritten (Halter, Teil 1). */
export function teilErgebnis(teil: Element): TeilErgebnis {
  const koerper: Koerper[] = [];
  const befunde: Befund[] = [];
  let volumen = 0;
  let basisOben = 0;
  let plattenDicke = 0;
  const schritte = teil.content.filter((k) => k.type !== 'ursprung');

  // 1. Extrusionen und Bohrungen
  for (const s of schritte) {
    const verworfen = hatFlag(s, 'verworfen');
    const sichtbar = !verworfen && !hatFlag(s, 'ausgeblendet');
    if (s.type === 'extrusion') {
      const sk = skizzeVon(s);
      if (!sk) continue;
      const ebene = ebeneVon(sk);
      const dicke = wert(s.params.dicke ?? s.params.hoehe);
      const oberseite = sk.params.ebene === 'oberseite';
      const platte: Platte = {
        ebene,
        mitte: { u: wert(sk.params.mitte?.x), v: wert(sk.params.mitte?.y) },
        laenge: wert(sk.params.laenge),
        breite: wert(sk.params.breite),
        eckradius: wert(sk.params.eckradius),
        dicke,
        z0: oberseite ? basisOben : 0,
        loecher: [],
        lochDurchmesser: 0,
      };
      if (!oberseite && !verworfen && koerper.every((k) => k.art !== 'platte')) {
        basisOben = dicke;
        plattenDicke = dicke;
      }
      const box = plattenBox(platte);
      const istPlatte = !oberseite;
      const k: Koerper = {
        schritt: s.id,
        art: istPlatte ? 'platte' : 'quader',
        min: box.min,
        max: box.max,
        kanten: kantenVon(s.id, box.min, box.max, istPlatte && platte.eckradius > 0),
        sichtbar,
      };
      if (istPlatte) k.platte = platte;
      else k.rundung = { vorn: 0, hinten: 0 };
      koerper.push(k);
      if (!verworfen) {
        const flaeche = platte.laenge * platte.breite - 4 * platte.eckradius ** 2 * RUNDUNG;
        volumen += flaeche * dicke;
      }
    }
  }

  // 2. Bohrungen (durchgehend durch die Grundplatte)
  for (const s of schritte) {
    if (s.type !== 'bohrung') continue;
    const sk = skizzeVon(s);
    const verworfen = hatFlag(s, 'verworfen');
    const d = wert(s.params.durchmesser);
    const punkte = ((sk?.params.punkte ?? []) as { x: unknown; y: unknown }[]).map((p) => ({
      x: wert(p.x),
      y: wert(p.y),
    }));
    const grundplatte = koerper.find((k) => k.art === 'platte' && k.platte);
    if (!grundplatte?.platte) continue;
    grundplatte.platte.loecher = verworfen ? [] : punkte;
    grundplatte.platte.lochDurchmesser = d;
    if (!verworfen) volumen -= punkte.length * Math.PI * (d / 2) ** 2 * plattenDicke;
    const min: V3 = [
      Math.min(...punkte.map((p) => p.x)) - d / 2,
      Math.min(...punkte.map((p) => p.y)) - d / 2,
      grundplatte.min[2],
    ];
    const max: V3 = [
      Math.max(...punkte.map((p) => p.x)) + d / 2,
      Math.max(...punkte.map((p) => p.y)) + d / 2,
      grundplatte.max[2],
    ];
    koerper.push({
      schritt: s.id,
      art: 'zylinder',
      min,
      max,
      platte: { ...grundplatte.platte, loecher: punkte, lochDurchmesser: d },
      kanten: [],
      sichtbar: !verworfen && !hatFlag(s, 'ausgeblendet'),
    });
  }

  // 3. Verrundungen (nur an den oberen Kanten eines Quaders)
  for (const s of schritte) {
    if (s.type !== 'verrundung' || hatFlag(s, 'verworfen')) continue;
    const ziel = koerper.find((k) => k.schritt === s.params.ziel);
    if (!ziel || ziel.art !== 'quader' || !ziel.rundung) continue;
    const zielSchritt = schritte.find((x) => x.id === ziel.schritt);
    if (!zielSchritt || hatFlag(zielSchritt, 'verworfen')) continue;
    const r = wert(s.params.radius);
    const grenze = rundungsGrenze(ziel);
    const wirksam = Math.min(r, grenze);
    if (r > grenze) {
      befunde.push({ schritt: s.id, radius: r, grenze });
      ziel.fehlerhaft = true;
    }
    for (const kid of (s.params.kanten ?? []) as string[]) {
      const kante = ziel.kanten.find((k) => k.id === kid);
      if (!kante) continue;
      volumen -= wirksam ** 2 * RUNDUNG * kante.laenge;
      if (kante.name === 'oben-vorn') ziel.rundung.vorn = wirksam;
      if (kante.name === 'oben-hinten') ziel.rundung.hinten = wirksam;
    }
  }

  const aktive = koerper.filter((k) => {
    const s = schritte.find((x) => x.id === k.schritt);
    return k.art !== 'zylinder' && s && !hatFlag(s, 'verworfen');
  });
  const abm: V3 = [0, 0, 0];
  if (aktive.length) {
    for (let i = 0; i < 3; i++) {
      abm[i] =
        Math.max(...aktive.map((k) => k.max[i] as number)) -
        Math.min(...aktive.map((k) => k.min[i] as number));
    }
  }
  return {
    koerper,
    volumen_mm3: volumen,
    masse_g: volumen * DICHTE_G_MM3,
    abmessungen_mm: abm,
    befunde,
  };
}

/** Einfache Teile ohne Schritte (Gehäuse als Schale, Deckel als Quader) aus design.md. */
export function einfachesTeil(teil: Element, versatz: V3 = [0, 0, 0]): TeilErgebnis {
  const l = wert(teil.params.laenge);
  const b = wert(teil.params.breite);
  const h = wert(teil.params.hoehe);
  const w = wert(teil.params.wand);
  const min: V3 = [versatz[0] - l / 2, versatz[1] - b / 2, versatz[2]];
  const max: V3 = [versatz[0] + l / 2, versatz[1] + b / 2, versatz[2] + h];
  const schale = teil.params.form === 'schale';
  const volumen = schale ? l * b * h - (l - 2 * w) * (b - 2 * w) * (h - w) : l * b * h;
  return {
    koerper: [
      {
        schritt: teil.id,
        art: schale ? 'schale' : 'quader',
        min,
        max,
        wand: schale ? w : undefined,
        rundung: schale ? undefined : { vorn: 0, hinten: 0 },
        kanten: kantenVon(teil.id, min, max, false),
        sichtbar: !hatFlag(teil, 'ausgeblendet'),
      },
    ],
    volumen_mm3: volumen,
    masse_g: volumen * DICHTE_G_MM3,
    abmessungen_mm: [l, b, h],
    befunde: [],
  };
}

/** Teile eines Projekts mit Schritten oder einfacher Form. */
export function teile(projekt: Projekt): Element[] {
  return projekt.content.filter((k) => k.type === 'teil');
}

export function ergebnisVon(teil: Element, versatz?: V3): TeilErgebnis {
  return teil.params.form ? einfachesTeil(teil, versatz) : teilErgebnis(teil);
}

/** Alle Schritte eines Teils inklusive Verrundungen. */
export const schrittListe = (teil: Element): Element[] =>
  alle(teil).filter((k) => k.type !== 'ebene');

/** Länge einer Verrundungskante in mm (für Anzeigen). */
export function kantenLaenge(teil: Element, kantenId: string): number {
  const e = teilErgebnis(teil);
  for (const k of e.koerper) {
    const kante = k.kanten.find((x) => x.id === kantenId);
    if (kante) return kante.laenge;
  }
  return 0;
}
