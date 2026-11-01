// Skizze und Hochziehen im Prototyp (ap-53, design.md Abschnitt 5): Ebene wählen, Skizze öffnen, Linie,
// Rechteck und Kreis mit Fangen und getipptem Maß zeichnen, Bereich wählen, mit dem Griff hochziehen.
// Die Vorschau rechnet keine Geometrie: Kurven, Bereiche und Körper kommen aus dem Worker-Ergebnis; einzige
// Ausnahme sind Gummiband und Geister-Vorschau während des Zeichnens bzw. Ziehens.
import * as THREE from 'three';
import type { App } from '../app';
import type { SkizzenZeichnung } from '../ansicht/szene';
import type { V3 } from '../geometrie/teil';
import { alleElemente, finde, istVerworfen, type Element } from '../modell/element';
import { lesen } from '../wert/wertfeld';
import type { Groesse } from '../drahtmodell/draht';

export type UV = [number, number];
export interface Ebene {
  o: V3;
  n: V3;
  x: V3;
  y: V3;
}

export const FANG_PX = 8;
export const RASTER_MM = 10;
export const PX_PRO_MM = 5;
const RICHTUNG_GRAD = 3;
const KAMERA_MS = 300;
const GEIST_START_MM = 10;

export type Werkzeug = 'skizze.linie' | 'skizze.rechteck' | 'skizze.kreis';
export type Feld = 'laenge' | 'winkel' | 'breite' | 'hoehe' | 'durchmesser';
const FELDER: Record<Werkzeug, Feld[]> = {
  'skizze.linie': ['laenge', 'winkel'],
  'skizze.rechteck': ['breite', 'hoehe'],
  'skizze.kreis': ['durchmesser'],
};
const KURZ: Record<Werkzeug, string> = {
  'skizze.linie': 'linie',
  'skizze.rechteck': 'rechteck',
  'skizze.kreis': 'kreis',
};
const KURVEN_TYP: Record<Werkzeug, string> = {
  'skizze.linie': 'sketch_line',
  'skizze.rechteck': 'sketch_rectangle',
  'skizze.kreis': 'sketch_circle',
};

export interface Fang {
  art: 'endpunkt' | 'mittelpunkt' | 'raster' | null;
  lage_mm: UV | null;
  richtung: 'waagerecht' | 'senkrecht' | null;
  anzeige: 'H' | 'V' | null;
}

export interface Bereich {
  element: string;
  skizze: string;
  punkt: UV;
  flaeche: number;
  rand: UV[][];
}

const plus = (a: V3, b: V3, s = 1): V3 => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];
const minus = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const skalar = (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const kreuz = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const zahl = (g: unknown): number => Number((g as Groesse).value);
const vec = (x: unknown): V3 | null =>
  Array.isArray(x) && x.length === 3 ? (x.map(zahl) as V3) : null;
const rund = (v: number): number => Math.round(v * 1e6) / 1e6;
const mm = (v: number): Groesse => ({ value: rund(v), unit: 'mm' });

/** Element-Parameter in mm (Einheiten mm, cm, m). */
function inMm(g: unknown): number {
  const x = g as Groesse | number | undefined;
  if (typeof x === 'number') return x;
  if (!x) return 0;
  const f = ({ mm: 1, cm: 10, m: 1000 } as Record<string, number>)[x.unit] ?? 1;
  return x.value * f;
}

function innen(p: UV, poly: UV[]): boolean {
  let drin = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i] as UV;
    const b = poly[j] as UV;
    if (
      a[1] > p[1] !== b[1] > p[1] &&
      p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]
    )
      drin = !drin;
  }
  return drin;
}

export const bereichSchluessel = (skizze: string, punkt: UV): string =>
  `${skizze}@${String(punkt[0])};${String(punkt[1])}`;

export class Skizze {
  offen: string | null = null;
  werkzeug: Werkzeug | null = null;
  start: UV | null = null;
  zeigerUv: UV | null = null;
  fang: Fang = { art: null, lage_mm: null, richtung: null, anzeige: null };
  wertfeld: { sichtbar: boolean; feld: Feld | null; text: string; befund: string | null } = {
    sichtbar: false,
    feld: null,
    text: '',
    befund: null,
  };
  private werte: Partial<Record<Feld, string>> = {};
  wartetAufEbene = false;
  private kameraVorher: {
    kamera: { azimut: number; hoehe: number; abstand: number; ziel: THREE.Vector3 };
    projektion: 'orthogonal' | 'perspektivisch';
  } | null = null;
  bereichWahl: { skizze: string; punkt: UV; element: string } | null = null;
  hover: string | null = null;
  hoverSeit: number | null = null;
  hoverMs: number | null = null;
  hoch: {
    skizze: string;
    punkt: UV;
    hoehe: number;
    text: string;
    extrude: string | null;
    basis: number;
  } | null = null;
  zieht = false;
  private ziehStart: THREE.Vector3 | null = null;
  unterdrueckeKlick = false;
  /** Sichtbare Zeichnung (für Prüfungen): Element → Linienbreite in px. */
  linienbreiten: Record<string, number> = {};

  constructor(private readonly app: App) {}

  // --- Ebene und Lage -------------------------------------------------------------------------------

  ebeneVon(bezug: string | undefined): Ebene | null {
    if (!bezug) return null;
    const [id, ausgang] = bezug.split('.') as [string, string | undefined];
    const r = this.app.draht.resultat(id);
    const o = r?.outputs[ausgang ?? 'plane'];
    if (!o || o.type !== 'plane') return null;
    const p = vec(o.origin);
    const n = vec(o.normal);
    const x = vec(o.x_direction);
    if (!p || !n || !x) return null;
    return { o: p, n, x, y: kreuz(n, x) };
  }

  ebeneDerSkizze(id: string): Ebene | null {
    const s = this.app.find(id);
    return s ? this.ebeneVon(s.inputs?.ebene) : null;
  }

  welt(e: Ebene, uv: UV): V3 {
    return plus(plus(e.o, e.x, uv[0]), e.y, uv[1]);
  }

  uvAusBildschirm(e: Ebene, x: number, y: number): UV | null {
    const p = this.app.szene?.aufEbene(x, y, e.o, e.n);
    if (!p) return null;
    const d = minus(p, e.o);
    return [skalar(d, e.x), skalar(d, e.y)];
  }

  /** Bildschirmpunkt eines Skizzenpunkts. */
  bildschirm(skizze: string, uv: UV): { x: number; y: number } | null {
    const e = this.ebeneDerSkizze(skizze);
    if (!e || !this.app.szene) return null;
    return this.app.szene.projiziere(this.welt(e, uv));
  }

  private pxProMm(): number {
    return this.app.szene?.pxProMm() ?? PX_PRO_MM;
  }

  // --- Skizze anlegen, öffnen, schließen ------------------------------------------------------------

  private freieId(praefix: string): string {
    const ids = new Set(alleElemente(this.app.projekt).map((e) => e.id));
    let n = 1;
    while (ids.has(`${praefix}${n}`)) n += 1;
    return `${praefix}${n}`;
  }

  /** Bezug auf eine Ebene: Element-ID mit oder ohne Ausgang (Ebenen-Element → `.plane`). */
  ebenenBezug(ref: string): string | null {
    if (ref.includes('.')) return ref;
    const e = this.app.find(ref);
    if (e?.type === 'plane') return `${ref}.plane`;
    return null;
  }

  anlegen(par: Record<string, unknown>, weg: string): boolean {
    let bezug: string | null = typeof par.ebene === 'string' ? this.ebenenBezug(par.ebene) : null;
    if (!bezug) {
      const sel = this.app.gewaehlteElemente();
      if (sel.length === 1 && sel[0]?.type === 'plane') bezug = `${sel[0].id}.plane`;
    }
    if (!bezug) {
      this.wartetAufEbene = true;
      this.app.meldung('skizze.ebene_waehlen');
      return true;
    }
    this.wartetAufEbene = false;
    const id = this.freieId('SK');
    const name =
      typeof par.name === 'string' && par.name
        ? par.name
        : this.app.t('skizze.name', { n: id.slice(2) });
    const el: Element = {
      id,
      type: 'sketch',
      inputs: { ebene: bezug },
      params: {},
      content: [],
      meta: { name },
    };
    this.app.aendern((dok) => dok.content.push(el));
    this.app.protokolliere('skizze.anlegen', { ebene: bezug }, weg as never, 'mensch');
    if (par.oeffnen !== false) this.oeffnen(id, bezug);
    return true;
  }

  oeffnen(id: string, bezug?: string): void {
    const sz = this.app.szene;
    if (sz && !this.offen)
      this.kameraVorher = {
        kamera: { ...sz.kamera, ziel: sz.kamera.ziel.clone() },
        projektion: sz.projektion,
      };
    this.offen = id;
    this.werkzeug = null;
    this.start = null;
    this.bereichWahl = null;
    this.hoch = null;
    this.app.ausgeblendet.delete(id);
    this.app.auswahl = [];
    const e = bezug ? this.ebeneVon(bezug) : this.ebeneDerSkizze(id);
    if (e && sz) sz.blickAufEbene(e.o, e.n, e.x, PX_PRO_MM, KAMERA_MS);
    this.app.meldung('skizze.offen', { name: this.app.name(id) });
  }

  schliessen(): void {
    if (!this.offen) return;
    this.offen = null;
    this.werkzeugAus();
    const sz = this.app.szene;
    if (sz && this.kameraVorher) {
      sz.projektion = this.kameraVorher.projektion;
      sz.nach(this.kameraVorher.kamera, KAMERA_MS);
    }
    this.kameraVorher = null;
    this.app.rueckmeldung = null;
  }

  private werkzeugAus(): void {
    this.werkzeug = null;
    this.start = null;
    this.wertfeldZu();
    this.fang = { art: null, lage_mm: null, richtung: null, anzeige: null };
  }

  private wertfeldZu(): void {
    this.wertfeld = { sichtbar: false, feld: null, text: '', befund: null };
    this.werte = {};
  }

  // --- Befehle ---------------------------------------------------------------------------------------

  registrieren(): void {
    const app = this.app;
    app.registriere('skizze.anlegen', (par, weg) => this.anlegen(par, weg));
    app.registriere('skizze.fertig', () => {
      if (!this.offen) return false;
      this.schliessen();
      return true;
    });
    app.registriere('skizze.bearbeiten', (par) => {
      const id =
        typeof par.skizze === 'string'
          ? par.skizze.split('.')[0]
          : app.gewaehlteElemente().find((e) => e.type === 'sketch')?.id;
      if (!id || app.find(id)?.type !== 'sketch') return false;
      this.oeffnen(id);
      return true;
    });
    for (const w of Object.keys(FELDER) as Werkzeug[])
      app.registriere(w, (par, weg) => this.werkzeugBefehl(w, par, weg));
    app.registriere('koerper.hochziehen', (par, weg) => this.hochziehenBefehl(par, weg));
  }

  private skizzeAusPar(par: Record<string, unknown>): string | null {
    if (typeof par.skizze === 'string') return par.skizze.split('.')[0] ?? null;
    return this.offen;
  }

  private werkzeugBefehl(w: Werkzeug, par: Record<string, unknown>, weg: string): boolean {
    const felder = w === 'skizze.kreis' ? ['u', 'v', 'd'] : ['u1', 'v1', 'u2', 'v2'];
    if (felder.every((f) => par[f] !== undefined)) {
      const sk = this.skizzeAusPar(par);
      if (!sk) return false;
      const werte = Object.fromEntries(felder.map((f) => [f, inMm(par[f])]));
      return this.kurveAnlegen(sk, w, werte, weg) !== null;
    }
    if (!this.offen) {
      this.app.meldung('skizze.ebene_waehlen');
      return false;
    }
    this.werkzeugAus();
    this.werkzeug = w;
    this.app.meldung(`skizze.werkzeug.${KURZ[w]}`);
    return true;
  }

  kurveAnlegen(sk: string, w: Werkzeug, werte: Record<string, number>, weg: string): string | null {
    const praefix = { 'skizze.linie': 'SL', 'skizze.rechteck': 'SR', 'skizze.kreis': 'SC' }[w];
    const id = this.freieId(praefix);
    const art = { 'skizze.linie': 'linie', 'skizze.rechteck': 'rechteck', 'skizze.kreis': 'kreis' }[
      w
    ];
    const params = Object.fromEntries(Object.entries(werte).map(([k, v]) => [k, mm(v)]));
    const el: Element = {
      id,
      type: KURVEN_TYP[w],
      inputs: {},
      params,
      content: [],
      meta: { name: this.app.t(`skizze.${art}`, { n: id.slice(2) }) },
    };
    const ok = this.app.aendern((dok) => {
      const s = finde(dok, sk);
      if (s) s.content.push(el);
    });
    if (!ok) return null;
    this.app.protokolliere(w, { skizze: sk, ...werte }, weg as never, 'mensch');
    return id;
  }

  // --- Fangen -----------------------------------------------------------------------------------------

  private fangPunkte(sk: string): { art: 'endpunkt' | 'mittelpunkt'; p: UV }[] {
    const s = this.app.find(sk);
    const aus: { art: 'endpunkt' | 'mittelpunkt'; p: UV }[] = [];
    for (const k of s?.content ?? []) {
      if (istVerworfen(k)) continue;
      const p = (n: string) => inMm(k.params[n]);
      if (k.type === 'sketch_line') {
        const a: UV = [p('u1'), p('v1')];
        const b: UV = [p('u2'), p('v2')];
        aus.push({ art: 'endpunkt', p: a }, { art: 'endpunkt', p: b });
        aus.push({ art: 'mittelpunkt', p: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] });
      } else if (k.type === 'sketch_rectangle') {
        const u = [p('u1'), p('u2')];
        const v = [p('v1'), p('v2')];
        const ecken: UV[] = [
          [u[0] as number, v[0] as number],
          [u[1] as number, v[0] as number],
          [u[1] as number, v[1] as number],
          [u[0] as number, v[1] as number],
        ];
        for (const e of ecken) aus.push({ art: 'endpunkt', p: e });
        for (let i = 0; i < 4; i++) {
          const a = ecken[i] as UV;
          const b = ecken[(i + 1) % 4] as UV;
          aus.push({ art: 'mittelpunkt', p: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] });
        }
      } else if (k.type === 'sketch_circle') aus.push({ art: 'mittelpunkt', p: [p('u'), p('v')] });
    }
    return aus;
  }

  /** Gefangener Skizzenpunkt unter dem Zeiger; setzt `fang`. */
  fangen(x: number, y: number, ohne = false): UV | null {
    const sk = this.offen;
    if (!sk) return null;
    const e = this.ebeneDerSkizze(sk);
    const roh = e ? this.uvAusBildschirm(e, x, y) : null;
    if (!roh) return null;
    const leer: Fang = { art: null, lage_mm: null, richtung: null, anzeige: null };
    if (ohne) {
      this.fang = leer;
      return roh;
    }
    const radius = FANG_PX / this.pxProMm();
    const abst = (p: UV) => Math.hypot(p[0] - roh[0], p[1] - roh[1]);
    const punkte = this.fangPunkte(sk);
    for (const art of ['endpunkt', 'mittelpunkt'] as const) {
      const k = punkte
        .filter((q) => q.art === art && abst(q.p) <= radius)
        .sort((a, b) => abst(a.p) - abst(b.p))[0];
      if (k) {
        this.fang = { ...leer, art, lage_mm: [k.p[0], k.p[1]] };
        return [k.p[0], k.p[1]];
      }
    }
    const raster: UV = [
      Math.round(roh[0] / RASTER_MM) * RASTER_MM + 0,
      Math.round(roh[1] / RASTER_MM) * RASTER_MM + 0,
    ];
    if (abst(raster) <= radius) {
      this.fang = { ...leer, art: 'raster', lage_mm: raster };
      return raster;
    }
    if (this.start && this.werkzeug === 'skizze.linie') {
      const du = roh[0] - this.start[0];
      const dv = roh[1] - this.start[1];
      const w = (Math.atan2(Math.abs(dv), Math.abs(du)) * 180) / Math.PI;
      if (Math.hypot(du, dv) > 1e-9 && w <= RICHTUNG_GRAD) {
        const p: UV = [roh[0], this.start[1]];
        this.fang = { ...leer, lage_mm: p, richtung: 'waagerecht', anzeige: 'H' };
        return p;
      }
      if (Math.hypot(du, dv) > 1e-9 && 90 - w <= RICHTUNG_GRAD) {
        const p: UV = [this.start[0], roh[1]];
        this.fang = { ...leer, lage_mm: p, richtung: 'senkrecht', anzeige: 'V' };
        return p;
      }
    }
    this.fang = leer;
    return roh;
  }

  // --- Zeiger, Klick, Tasten --------------------------------------------------------------------------

  /** Zeigerbewegung ohne gedrückte Taste; true, wenn die Skizze sie behandelt. */
  zeiger(x: number, y: number, alt = false): boolean {
    if (this.offen && this.werkzeug) {
      this.zeigerUv = this.fangen(x, y, alt);
      this.app.rendern();
      return true;
    }
    if (this.hoch || this.offen) return false;
    const b = this.bereichBei(x, y);
    const neu = b?.element ?? null;
    if (neu !== this.hover) {
      this.hover = neu;
      this.hoverSeit = neu ? performance.now() : null;
      this.app.rendern();
    }
    return neu !== null;
  }

  /** Klick ins Modell; true, wenn die Skizze ihn behandelt hat. */
  klick(x: number, y: number, alt = false): boolean {
    if (this.unterdrueckeKlick) {
      this.unterdrueckeKlick = false;
      return true;
    }
    if (this.wartetAufEbene) {
      const id = this.app.draht.treffer(x, y, 'plane');
      if (id) this.anlegen({ ebene: `${id}.plane` }, 'menue');
      return true;
    }
    if (this.hoch) return true;
    if (this.offen && this.werkzeug) {
      const p = this.fangen(x, y, alt);
      if (!p) return true;
      this.zeigerUv = p;
      if (!this.start) {
        this.start = p;
        this.app.meldung(`skizze.zweiter.${KURZ[this.werkzeug]}`);
      } else this.abschliessen(p);
      this.app.rendern();
      return true;
    }
    if (this.offen) return false;
    const k = this.app.szene?.koerperBei(x, y);
    if (k) {
      this.bereichWahl = null;
      this.app.waehle(k, 'setzen');
      return true;
    }
    const b = this.bereichBei(x, y);
    if (b) {
      this.bereichWahl = {
        skizze: b.skizze,
        punkt: this.klickUv(b.skizze, x, y) ?? b.punkt,
        element: b.element,
      };
      this.app.auswahl = [];
      this.app.rendern();
      return true;
    }
    this.bereichWahl = null;
    return false;
  }

  private klickUv(sk: string, x: number, y: number): UV | null {
    const e = this.ebeneDerSkizze(sk);
    const p = e ? this.uvAusBildschirm(e, x, y) : null;
    return p ? [rund(p[0]), rund(p[1])] : null;
  }

  doppelklick(x: number, y: number): boolean {
    if (this.offen) return false;
    const sk = this.skizzeBei(x, y);
    if (!sk) return false;
    this.oeffnen(sk);
    this.app.rendern();
    return true;
  }

  /** Skizze unter dem Zeiger: Kurve in Fangweite oder Bereich. */
  skizzeBei(x: number, y: number): string | null {
    const b = this.bereichBei(x, y);
    if (b) return b.skizze;
    for (const s of this.sichtbareSkizzen()) {
      const e = this.ebeneDerSkizze(s.id);
      const uv = e ? this.uvAusBildschirm(e, x, y) : null;
      if (!uv) continue;
      const r = FANG_PX / this.pxProMm();
      for (const k of s.content) {
        const zuege = this.kurvenZuegeUv(k);
        for (const z of zuege)
          for (let i = 1; i < z.length; i++)
            if (abstandStrecke(uv, z[i - 1] as UV, z[i] as UV) <= r) return s.id;
      }
    }
    return null;
  }

  private kurvenZuegeUv(k: Element): UV[][] {
    const p = (n: string) => inMm(k.params[n]);
    if (k.type === 'sketch_line')
      return [
        [
          [p('u1'), p('v1')],
          [p('u2'), p('v2')],
        ],
      ];
    if (k.type === 'sketch_rectangle') {
      const [a, b, c, d] = [p('u1'), p('v1'), p('u2'), p('v2')];
      return [
        [
          [a, b],
          [c, b],
          [c, d],
          [a, d],
          [a, b],
        ],
      ];
    }
    if (k.type === 'sketch_circle') return [kreisUv([p('u'), p('v')], p('d') / 2)];
    return [];
  }

  /** Taste; true, wenn die Skizze sie behandelt hat. */
  taste(e: KeyboardEvent): boolean {
    if (e.ctrlKey || e.metaKey) return false;
    if (this.hoch) return this.hochTaste(e);
    if (this.wartetAufEbene && e.key === 'Escape') {
      this.wartetAufEbene = false;
      this.app.rueckmeldung = null;
      this.app.rendern();
      return true;
    }
    if (!this.offen) {
      if (e.key === 'Escape' && this.bereichWahl) {
        this.bereichWahl = null;
        this.app.rendern();
        return true;
      }
      return false;
    }
    const w = this.werkzeug;
    if (e.key === 'Escape') {
      if (this.wertfeld.sichtbar || this.start) {
        this.start = null;
        this.wertfeldZu();
      } else if (w) this.werkzeugAus();
      else this.schliessen();
      this.app.rendern();
      return true;
    }
    if (!w || !this.start) return false;
    const felder = FELDER[w];
    if (e.key === 'Tab') {
      const i = felder.indexOf(this.wertfeld.feld ?? (felder[0] as Feld));
      if (this.wertfeld.feld) this.werte[this.wertfeld.feld] = this.wertfeld.text;
      const neu = felder[(i + (e.shiftKey ? felder.length - 1 : 1)) % felder.length] as Feld;
      this.wertfeld = { sichtbar: true, feld: neu, text: this.werte[neu] ?? '', befund: null };
      this.app.rendern();
      return true;
    }
    if (e.key === 'Enter') {
      if (!this.wertfeld.sichtbar) return false;
      this.wertAnwenden();
      this.app.rendern();
      return true;
    }
    if (e.key === 'Backspace' && this.wertfeld.sichtbar) {
      this.wertfeld.text = this.wertfeld.text.slice(0, -1);
      this.wertfeld.befund = null;
      this.app.rendern();
      return true;
    }
    if (e.key.length === 1 && (this.wertfeld.sichtbar || /[\d.,+-]/.test(e.key))) {
      if (!this.wertfeld.sichtbar)
        this.wertfeld = { sichtbar: true, feld: felder[0] as Feld, text: '', befund: null };
      this.wertfeld.text += e.key;
      this.wertfeld.befund = null;
      this.app.rendern();
      return true;
    }
    return false;
  }

  /** Getippte Maße anwenden: in Zeigerrichtung anlegen; ungültig → Befund am Feld, nichts anlegen. */
  private wertAnwenden(): void {
    const w = this.werkzeug;
    const s = this.start;
    if (!w || !s) return;
    if (this.wertfeld.feld) this.werte[this.wertfeld.feld] = this.wertfeld.text;
    const zahlen: Partial<Record<Feld, number>> = {};
    for (const [f, t] of Object.entries(this.werte) as [Feld, string][]) {
      if (!t.trim()) continue;
      if (f === 'winkel') {
        const n = Number(t.replace(',', '.').replace(/°|deg/g, '').trim());
        if (!Number.isFinite(n)) return this.befund('wert.fehler.nicht-lesbar');
        zahlen.winkel = n;
        continue;
      }
      const r = lesen(t, 'mm', 'laenge');
      if (!r.ok) return this.befund(r.fehler);
      zahlen[f] = r.groesse.value;
    }
    const z = this.zeigerUv ?? [s[0] + 1, s[1]];
    const du = z[0] - s[0];
    const dv = z[1] - s[1];
    if (w === 'skizze.linie') {
      const l = zahlen.laenge ?? Math.hypot(du, dv);
      const a =
        zahlen.winkel !== undefined ? (zahlen.winkel * Math.PI) / 180 : Math.atan2(dv, du || 1e-12);
      this.abschliessen([rund(s[0] + l * Math.cos(a)), rund(s[1] + l * Math.sin(a))]);
    } else if (w === 'skizze.rechteck') {
      const b = zahlen.breite ?? Math.abs(du);
      const h = zahlen.hoehe ?? Math.abs(dv);
      this.abschliessen([rund(s[0] + (du < 0 ? -b : b)), rund(s[1] + (dv < 0 ? -h : h))]);
    } else {
      const d = zahlen.durchmesser ?? 2 * Math.hypot(du, dv);
      this.abschliessen([rund(s[0] + d / 2), s[1]]);
    }
  }

  private befund(schluessel: string): void {
    this.wertfeld.befund = this.app.t(schluessel);
  }

  /** Zweiten Punkt setzen: Element anlegen (ein Rückgängig-Schritt). */
  private abschliessen(p: UV): void {
    const w = this.werkzeug;
    const s = this.start;
    const sk = this.offen;
    if (!w || !s || !sk) return;
    let werte: Record<string, number>;
    if (w === 'skizze.kreis')
      werte = { u: s[0], v: s[1], d: 2 * Math.hypot(p[0] - s[0], p[1] - s[1]) };
    else werte = { u1: s[0], v1: s[1], u2: p[0], v2: p[1] };
    this.kurveAnlegen(sk, w, werte, 'menue');
    this.wertfeldZu();
    this.start = w === 'skizze.linie' ? p : null;
    this.app.meldung(this.start ? `skizze.zweiter.${KURZ[w]}` : `skizze.werkzeug.${KURZ[w]}`);
  }

  // --- Bereiche --------------------------------------------------------------------------------------

  sichtbareSkizzen(): Element[] {
    return alleElemente(this.app.dokument()).filter(
      (e) => e.type === 'sketch' && !istVerworfen(e) && !this.app.istAusgeblendet(e.id),
    );
  }

  bereiche(): Bereich[] {
    const aus: Bereich[] = [];
    for (const s of this.sichtbareSkizzen()) {
      const o = this.app.draht.resultat(s.id)?.outputs.sketch as
        | { bereiche?: { punkt: unknown[]; flaeche: unknown; rand: { zuege: UV[][] } }[] }
        | undefined;
      for (const b of o?.bereiche ?? []) {
        const punkt: UV = [zahl(b.punkt[0]), zahl(b.punkt[1])];
        aus.push({
          element: bereichSchluessel(s.id, punkt),
          skizze: s.id,
          punkt,
          flaeche: zahl(b.flaeche),
          rand: b.rand.zuege,
        });
      }
    }
    return aus;
  }

  bereichBei(x: number, y: number): Bereich | null {
    let beste: Bereich | null = null;
    for (const b of this.bereiche()) {
      const e = this.ebeneDerSkizze(b.skizze);
      const uv = e ? this.uvAusBildschirm(e, x, y) : null;
      if (!uv) continue;
      const [aussen, ...loecher] = b.rand;
      if (!aussen || !innen(uv, aussen) || loecher.some((l) => innen(uv, l))) continue;
      if (!beste || b.flaeche < beste.flaeche) beste = b;
    }
    return beste;
  }

  gewaehlterBereich(): Bereich | null {
    const w = this.bereichWahl;
    if (!w) return null;
    return this.bereiche().find((b) => b.element === w.element) ?? null;
  }

  /** Bildschirmhülle des gewählten Bereichs (für die Kontextleiste). */
  bereichBildschirm(): { x: number; y: number }[] | null {
    const b = this.gewaehlterBereich();
    const e = b ? this.ebeneDerSkizze(b.skizze) : null;
    if (!b || !e || !this.app.szene) return null;
    return (b.rand[0] ?? []).map(
      (p) => this.app.szene?.projiziere(this.welt(e, p)) as { x: number; y: number },
    );
  }

  // --- Hochziehen ------------------------------------------------------------------------------------

  private hochziehenBefehl(par: Record<string, unknown>, weg: string): boolean {
    if (par.punkt_u !== undefined && par.punkt_v !== undefined && par.hoehe !== undefined) {
      const sk = this.skizzeAusPar(par);
      if (!sk) return false;
      return (
        this.extrudeAnlegen(sk, [inMm(par.punkt_u), inMm(par.punkt_v)], inMm(par.hoehe), weg) !==
        null
      );
    }
    const w = this.bereichWahl;
    if (!w) {
      this.app.meldung('skizze.bereich_waehlen');
      return false;
    }
    this.hoch = {
      skizze: w.skizze,
      punkt: w.punkt,
      hoehe: GEIST_START_MM,
      text: '',
      extrude: null,
      basis: GEIST_START_MM,
    };
    this.app.meldung('skizze.hochziehen_hinweis');
    return true;
  }

  extrudeAnlegen(sk: string, punkt: UV, hoehe: number, weg: string): string | null {
    const id = this.freieId('X');
    const el: Element = {
      id,
      type: 'extrude',
      inputs: { skizze: `${sk}.sketch` },
      params: { punkt_u: mm(punkt[0]), punkt_v: mm(punkt[1]), hoehe: mm(hoehe) },
      content: [],
      meta: { name: this.app.t('skizze.hochziehen', { n: id.slice(1) }) },
    };
    if (!this.app.aendern((dok) => dok.content.push(el))) return null;
    this.app.protokolliere(
      'koerper.hochziehen',
      { skizze: sk, punkt_u: punkt[0], punkt_v: punkt[1], hoehe },
      weg as never,
      'mensch',
    );
    return id;
  }

  /** Höhe übernehmen: neues Hochziehen anlegen bzw. die Höhe des gewählten ändern. */
  hochUebernehmen(): void {
    const h = this.hoch;
    if (!h) return;
    if (h.text.trim()) {
      const r = lesen(h.text, 'mm', 'laenge');
      if (!r.ok) {
        this.wertfeld = {
          sichtbar: true,
          feld: 'hoehe',
          text: h.text,
          befund: this.app.t(r.fehler),
        };
        return;
      }
      h.hoehe = r.groesse.value;
    }
    if (Math.abs(h.hoehe) < 1e-6) return;
    this.hoch = null;
    this.wertfeldZu();
    if (h.extrude) {
      const id = h.extrude;
      this.app.aendern((dok) => {
        const x = finde(dok, id);
        if (x) x.params.hoehe = mm(h.hoehe);
      });
      this.app.protokolliere(
        'element.wert-setzen',
        { element: id, hoehe: h.hoehe },
        'griff' as never,
        'mensch',
      );
      this.app.auswahl = [{ element_id: id }];
    } else {
      const id = this.extrudeAnlegen(h.skizze, h.punkt, h.hoehe, 'kontextaktion');
      if (id) {
        this.app.ausgeblendet.add(h.skizze);
        this.app.auswahl = [{ element_id: id }];
      }
      this.bereichWahl = null;
    }
    this.app.rueckmeldung = null;
  }

  hochAbbrechen(): void {
    this.hoch = null;
    this.wertfeldZu();
    this.app.rueckmeldung = null;
  }

  private hochTaste(e: KeyboardEvent): boolean {
    const h = this.hoch;
    if (!h) return false;
    if (e.key === 'Escape' || e.key === 'Enter') {
      if (e.key === 'Escape') this.hochAbbrechen();
      else this.hochUebernehmen();
      this.app.rendern();
      return true;
    }
    if (e.key === 'Backspace') h.text = h.text.slice(0, -1);
    else if (e.key.length === 1 && (h.text || /[\d.,+-]/.test(e.key))) {
      h.text += e.key;
      const r = lesen(h.text, 'mm', 'laenge');
      if (r.ok && Math.abs(r.groesse.value) > 1e-6) h.hoehe = r.groesse.value;
    } else return false;
    this.wertfeld = h.text
      ? { sichtbar: true, feld: 'hoehe', text: h.text, befund: null }
      : { sichtbar: false, feld: null, text: '', befund: null };
    this.app.rendern();
    return true;
  }

  /** Gewähltes Hochziehen (genau eins gewählt). */
  gewaehltesHochziehen(): Element | null {
    const sel = this.app.gewaehlteElemente();
    return sel.length === 1 && sel[0]?.type === 'extrude' && !istVerworfen(sel[0]) ? sel[0] : null;
  }

  /** Griff: Lage (Mitte des Bereichs auf Höhe) und Normale, solange ein Hochziehen aktiv oder gewählt ist. */
  griffLage(): { ort: V3; n: V3; hoehe: number } | null {
    let sk: string;
    let punkt: UV;
    let hoehe: number;
    if (this.hoch) ({ skizze: sk, punkt, hoehe } = this.hoch);
    else {
      const x = this.gewaehltesHochziehen();
      if (!x || this.offen) return null;
      sk = String(x.inputs?.skizze ?? '').split('.')[0] ?? '';
      punkt = [inMm(x.params.punkt_u), inMm(x.params.punkt_v)];
      hoehe = inMm(x.params.hoehe);
    }
    const e = this.ebeneDerSkizze(sk);
    if (!e) return null;
    return { ort: plus(this.welt(e, punkt), e.n, hoehe), n: e.n, hoehe };
  }

  /** Griff mit der Szene verbinden (TransformControls); einmal nach dem Anlegen der Szene. */
  griffAnbinden(): void {
    const sz = this.app.szene;
    if (!sz) return;
    const g = sz.griffErzeugen();
    g.addEventListener('mouseDown', () => {
      const lage = this.griffLage();
      if (!lage) return;
      this.zieht = true;
      this.ziehStart = sz.griffObjekt.position.clone();
      if (!this.hoch) {
        const x = this.gewaehltesHochziehen();
        if (!x) return;
        this.hoch = {
          skizze: String(x.inputs?.skizze ?? '').split('.')[0] ?? '',
          punkt: [inMm(x.params.punkt_u), inMm(x.params.punkt_v)],
          hoehe: lage.hoehe,
          text: '',
          extrude: x.id,
          basis: lage.hoehe,
        };
      } else this.hoch.basis = this.hoch.hoehe;
    });
    g.addEventListener('objectChange', () => {
      const h = this.hoch;
      const lage = this.griffLage();
      if (!h || !lage || !this.ziehStart) return;
      const d = sz.griffObjekt.position.clone().sub(this.ziehStart);
      h.hoehe = rund(h.basis + d.dot(new THREE.Vector3(...lage.n)));
      h.text = '';
      this.app.rendern();
    });
    g.addEventListener('mouseUp', () => {
      if (!this.zieht) return;
      this.zieht = false;
      this.ziehStart = null;
      this.unterdrueckeKlick = true;
      this.hochUebernehmen();
      this.app.rendern();
    });
  }

  /** Bildschirmpunkt zum Anfassen des Griffs (Pfeil der lokalen Z-Achse) und Pixel je mm entlang der Normale. */
  griffBildschirm(): { x: number; y: number; dx: number; dy: number } | null {
    const lage = this.griffLage();
    const sz = this.app.szene;
    if (!lage || !sz) return null;
    const a = sz.projiziere(lage.ort);
    const b = sz.projiziere(plus(lage.ort, lage.n, 1));
    const l = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    // Der Pfeil des Griffs ist rund 0,6 der Griffgröße lang; angefasst wird kurz vor der Spitze
    const versatz = 60;
    return {
      x: a.x + ((b.x - a.x) / l) * versatz,
      y: a.y + ((b.y - a.y) / l) * versatz,
      dx: b.x - a.x,
      dy: b.y - a.y,
    };
  }

  // --- Zeichnung -------------------------------------------------------------------------------------

  private zuegeWelt(e: Ebene, zuege: UV[][]): V3[][] {
    return zuege.map((z) => z.map((p) => this.welt(e, p)));
  }

  private dreiecke(e: Ebene, rand: UV[][]): V3[] {
    const [aussen, ...loecher] = rand.map((z) => {
      const pts = z.map((p) => new THREE.Vector2(p[0], p[1]));
      if (pts.length > 1 && pts[0]?.equals(pts[pts.length - 1] as THREE.Vector2)) pts.pop();
      return pts;
    });
    if (!aussen) return [];
    const alle = [aussen, ...loecher].flat();
    const tri = THREE.ShapeUtils.triangulateShape(aussen, loecher);
    return tri.flatMap((t) => t.map((i) => this.welt(e, [alle[i]?.x ?? 0, alle[i]?.y ?? 0])));
  }

  private geist(): { positionen: number[]; dreiecke: number[] } | null {
    const h = this.hoch;
    if (!h) return null;
    const e = this.ebeneDerSkizze(h.skizze);
    const b = this.bereiche().find(
      (x) => x.skizze === h.skizze && this.bereichEnthaelt(x, h.punkt),
    );
    if (!e || !b) return null;
    const positionen: number[] = [];
    const dreiecke: number[] = [];
    const boden = this.dreiecke(e, b.rand);
    for (const versatz of [0, h.hoehe])
      for (const p of boden) {
        dreiecke.push(positionen.length / 3);
        positionen.push(...plus(p, e.n, versatz));
      }
    for (const z of b.rand)
      for (let i = 1; i < z.length; i++) {
        const a = this.welt(e, z[i - 1] as UV);
        const c = this.welt(e, z[i] as UV);
        const n0 = positionen.length / 3;
        positionen.push(...a, ...c, ...plus(c, e.n, h.hoehe), ...plus(a, e.n, h.hoehe));
        dreiecke.push(n0, n0 + 1, n0 + 2, n0, n0 + 2, n0 + 3);
      }
    return { positionen, dreiecke };
  }

  bereichEnthaelt(b: Bereich, p: UV): boolean {
    const [aussen, ...loecher] = b.rand;
    return !!aussen && innen(p, aussen) && !loecher.some((l) => innen(p, l));
  }

  /** Hülle der Geister-Vorschau (für das Prüfwerkzeug). */
  geistHuelle(): { min: V3; max: V3 } | null {
    const g = this.geist();
    if (!g || !g.positionen.length) return null;
    const min: V3 = [Infinity, Infinity, Infinity];
    const max: V3 = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < g.positionen.length; i += 3)
      for (let k = 0; k < 3; k++) {
        min[k] = Math.min(min[k] as number, g.positionen[i + k] as number);
        max[k] = Math.max(max[k] as number, g.positionen[i + k] as number);
      }
    return { min, max };
  }

  zeichnung(): SkizzenZeichnung {
    const app = this.app;
    const z: SkizzenZeichnung = {
      kurven: [],
      bereiche: [],
      koerper: [],
      vorschau: [],
      hilfslinien: [],
      geist: null,
    };
    const breiten: Record<string, number> = {};
    const gewaehlt = new Set(app.auswahlIds());
    for (const s of this.sichtbareSkizzen()) {
      for (const k of s.content) {
        if (istVerworfen(k)) continue;
        const r = app.draht.resultat(k.id);
        const kz = r?.outputs.kurve?.kantenzuege as { zuege: V3[][] } | undefined;
        if (!kz) continue;
        z.kurven.push({
          element: k.id,
          zuege: kz.zuege,
          rolle: gewaehlt.has(k.id) ? 'akzent' : r?.state === 'fehlerhaft' ? 'fehler' : 'normal',
        });
        breiten[k.id] = 1.5;
      }
    }
    for (const x of alleElemente(app.dokument())) {
      if (x.type !== 'extrude' || istVerworfen(x) || app.istAusgeblendet(x.id)) continue;
      const k = app.draht.resultat(x.id)?.outputs.koerper as
        | { netz: { positionen: number[]; dreiecke: number[] }; kantenzuege: { zuege: V3[][] } }
        | undefined;
      if (!k) continue;
      z.koerper.push({
        element: x.id,
        positionen: k.netz.positionen,
        dreiecke: k.netz.dreiecke,
        kanten: k.kantenzuege.zuege,
        gewaehlt: gewaehlt.has(x.id),
      });
      breiten[x.id] = 1.5;
    }
    const alle = this.bereiche();
    for (const b of alle) breiten[b.element] = 1.5;
    for (const [key, art] of [
      [this.hover, 'hover'],
      [this.bereichWahl?.element ?? null, 'auswahl'],
    ] as const) {
      const b = key ? alle.find((x) => x.element === key) : undefined;
      const e = b ? this.ebeneDerSkizze(b.skizze) : null;
      if (!b || !e) continue;
      z.bereiche = z.bereiche.filter((x) => x.key !== key);
      z.bereiche.push({
        key: b.element,
        rand: this.zuegeWelt(e, b.rand),
        dreiecke: art === 'auswahl' || this.hover === key ? this.dreiecke(e, b.rand) : [],
        art,
      });
    }
    const sk = this.offen;
    const e = sk ? this.ebeneDerSkizze(sk) : null;
    if (e && this.werkzeug && this.zeigerUv) {
      const p = this.zeigerUv;
      const s = this.start;
      if (s) {
        if (this.werkzeug === 'skizze.linie') z.vorschau.push([this.welt(e, s), this.welt(e, p)]);
        else if (this.werkzeug === 'skizze.rechteck')
          z.vorschau.push(this.zuegeWelt(e, [[s, [p[0], s[1]], p, [s[0], p[1]], s]])[0] as V3[]);
        else
          z.vorschau.push(
            this.zuegeWelt(e, [kreisUv(s, Math.hypot(p[0] - s[0], p[1] - s[1]))])[0] as V3[],
          );
        if (this.fang.richtung) z.hilfslinien.push([this.welt(e, s), this.welt(e, p)]);
      }
      // Fangsymbol: Endpunkt Quadrat, Mittelpunkt Dreieck, Raster Kreuz (Größe in px)
      const r = 5 / this.pxProMm();
      const f = this.fang;
      if (f.art && f.lage_mm) {
        const [u, v] = f.lage_mm;
        const form: UV[][] =
          f.art === 'endpunkt'
            ? [
                [
                  [u - r, v - r],
                  [u + r, v - r],
                  [u + r, v + r],
                  [u - r, v + r],
                  [u - r, v - r],
                ],
              ]
            : f.art === 'mittelpunkt'
              ? [
                  [
                    [u - r, v - r],
                    [u + r, v - r],
                    [u, v + r],
                    [u - r, v - r],
                  ],
                ]
              : [
                  [
                    [u - r, v],
                    [u + r, v],
                  ],
                  [
                    [u, v - r],
                    [u, v + r],
                  ],
                ];
        z.vorschau.push(...this.zuegeWelt(e, form));
      }
    }
    z.geist = this.geist();
    this.linienbreiten = breiten;
    return z;
  }
}

function kreisUv(m: UV, r: number): UV[] {
  const n = 72;
  const aus: UV[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (2 * Math.PI * i) / n;
    aus.push([m[0] + r * Math.cos(a), m[1] + r * Math.sin(a)]);
  }
  return aus;
}

function abstandStrecke(p: UV, a: UV, b: UV): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
