// Wireframe-Basics im Prototyp (ap-50): Koordinatensysteme, Punkte, Linien mit echtem Geometriekern.
// Die Vorschau rechnet keine Geometrie: Sie schickt ihren Graphen an die Brücke (`POST /kernel`), der Worker baut
// den Auftrag über den Rust-Kern und rechnet mit OpenCascade; Lagen kommen nur aus dem Ergebnis.
import type { App } from '../app';
import type { V3 } from '../geometrie/teil';
import { alleElemente, finde, istVerworfen, type Element } from '../modell/element';

export const PROTOKOLL = 'cee-kernel/0';

/** Ausgänge je Typ (design.md Abschnitt 1). */
export const AUSGAENGE: Record<string, Record<string, string>> = {
  frame: {
    frame: 'frame',
    origin: 'point',
    x: 'line',
    y: 'line',
    z: 'line',
    xy: 'plane',
    yz: 'plane',
    zx: 'plane',
  },
  point: { point: 'point' },
  axis: { line: 'line' },
  plane: { plane: 'plane' },
  line: { line: 'line' },
  ray: { ray: 'ray', start: 'point' },
  segment: { segment: 'segment', start: 'point', end: 'point' },
};

export type Dimension = 'length' | 'angle';

/** Parameter je Typ mit Dimension; Standard-Einheiten mm und deg (Typdefinitionen). */
export const PARAMETER: Record<string, Record<string, Dimension>> = {
  frame: { x: 'length', y: 'length', z: 'length', rx: 'angle', ry: 'angle', rz: 'angle' },
  point: { x: 'length', y: 'length', z: 'length' },
};

export const istDrahtTyp = (typ: string): boolean => typ in AUSGAENGE;

export interface Groesse {
  value: number;
  unit: string;
}

export interface Ausgang {
  type: string;
  [feld: string]: unknown;
}

export interface KernBefund {
  code: string;
  element: string | null;
  input?: string;
  hinweis: string;
  text?: string;
  bezug?: string;
}

export interface Resultat {
  id: string;
  state: 'aktuell' | 'fehlerhaft';
  hash: string;
  outputs: Record<string, Ausgang>;
  befunde: KernBefund[];
}

export interface Ergebnis {
  protocol: string;
  results: Resultat[];
  befunde: KernBefund[];
}

export type Art = 'koordinatensystem' | 'punkt' | 'achse' | 'ebene' | 'linie';

export interface SzenenObjekt {
  element: string;
  art: Art;
  sichtbar: boolean;
  lage_mm: V3 | Record<string, V3> | null;
}

/** Was die Szene zeichnet: Linien und Punkte in Weltkoordinaten (mm), Farben als Token. */
export interface DrahtZeichnung {
  element: string;
  art: Art;
  punkte: V3[];
  token: string;
  gewaehlt: boolean;
  fehlerhaft: boolean;
}

export type Modus = { art: 'punkt' } | { art: 'linie'; typ: string; punkte: string[] };

const ANZEIGE_UNENDLICH_MM = 10_000;
const ACHSE_MM = 100;
const EBENE_HALB_MM = 50;
export const FANG_PX = 6;

const vec = (x: unknown): V3 | null => {
  if (!Array.isArray(x) || x.length !== 3) return null;
  return x.map((g) => Number((g as Groesse).value)) as V3;
};
const plus = (a: V3, b: V3, s = 1): V3 => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];
const kreuz = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const skalar = (a: V3, b: V3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const minus = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];

/** Kanonische JSON-Form (sortierte Schlüssel). */
export const kanon = (x: unknown): string =>
  JSON.stringify(x, (_k, v: unknown) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v as Record<string, unknown>).sort(([a], [b]) =>
            a < b ? -1 : a > b ? 1 : 0,
          ),
        )
      : v,
  );

/** Element in Elementform für den Kern: nur Drahtmodell-Typen, Kinder verschachtelt (ADR-028). */
function elementform(e: Element): Record<string, unknown> {
  return {
    id: e.id,
    type: e.type,
    inputs: { ...(e.inputs ?? {}) },
    params: e.params,
    outputs: { ...(AUSGAENGE[e.type] ?? {}) },
    content: e.content.filter((k) => istDrahtTyp(k.type)).map(elementform),
    meta: e.meta,
  };
}

/** Der Teil des Graphen, den der Worker rechnet: Drahtmodell-Elemente des aktiven Dokuments. */
export function drahtGraph(dok: Element): Element[] {
  const aus: Element[] = [];
  const lauf = (e: Element) => {
    for (const k of e.content) {
      if (istDrahtTyp(k.type)) aus.push(k);
      else lauf(k);
    }
  };
  lauf(dok);
  return aus;
}

export class Draht {
  ergebnis: Ergebnis | null = null;
  /** Schlüssel (kanonischer Graph) des angezeigten Ergebnisses. */
  ergebnisSchluessel = '';
  /** Schlüssel, für den gerade gerechnet wird. */
  private laeuft = '';
  private nummer = 0;
  bruecke: boolean | null = null;
  private brueckeFrage: Promise<boolean> | null = null;
  /** Geometrie-Dienst nicht erreichbar (für diesen Schlüssel). */
  nichtErreichbar: { schluessel: string; text: string } | null = null;
  modus: Modus | null = null;
  /** Fokus auf ein Feld der Eigenschaften nach dem nächsten Zeichnen. */
  feldFokus: string | null = null;
  /** Beim ersten Ergebnis die Ansicht einpassen (Testzustand mit Inhalt). */
  einpassen = false;

  constructor(private readonly app: App) {}

  graph(): Element[] {
    return drahtGraph(this.app.dokument());
  }

  aktiv(): boolean {
    return this.graph().length > 0;
  }

  schluessel(): string {
    return kanon(this.graph().map(elementform));
  }

  /** Neues Ergebnis anfordern, wenn sich der Graph geändert hat (höchstens eine Anfrage je Stand). */
  anstossen(): void {
    if (!this.aktiv()) return;
    const s = this.schluessel();
    if (
      s === this.ergebnisSchluessel ||
      s === this.laeuft ||
      this.nichtErreichbar?.schluessel === s
    )
      return;
    this.laeuft = s;
    const nr = (this.nummer += 1);
    void this.rechnen(s, nr);
  }

  /** Fertig: Das Ergebnis gehört zum aktuellen Graphen (oder der Dienst ist nicht erreichbar). */
  bereit(): boolean {
    if (!this.aktiv()) return true;
    const s = this.schluessel();
    return s === this.ergebnisSchluessel || this.nichtErreichbar?.schluessel === s;
  }

  private brueckeDa(): Promise<boolean> {
    if (this.bruecke !== null) return Promise.resolve(this.bruecke);
    this.brueckeFrage ??= fetch('kernel-status.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { bruecke: false }))
      .then((j: { bruecke?: boolean }) => (this.bruecke = j.bruecke === true))
      .catch(() => (this.bruecke = false));
    return this.brueckeFrage;
  }

  private async rechnen(schluessel: string, nr: number): Promise<void> {
    const projekt = { schema_version: 1, elements: JSON.parse(schluessel) as unknown[] };
    let ergebnis: Ergebnis | null = null;
    let fehler = '';
    if (!(await this.brueckeDa())) fehler = 'keine Brücke';
    else {
      try {
        const r = await fetch('kernel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projekt),
        });
        const j = (await r.json()) as Ergebnis;
        if (j.befunde?.some((b) => b.code === 'kernel_unavailable')) fehler = 'Worker';
        else ergebnis = j;
      } catch (e) {
        fehler = String(e);
      }
    }
    if (nr !== this.nummer) return; // überholt
    this.laeuft = '';
    if (ergebnis) {
      const neueBefunde = this.befundZahl(ergebnis) > this.befundZahl(this.ergebnis);
      this.ergebnis = ergebnis;
      this.ergebnisSchluessel = schluessel;
      this.nichtErreichbar = null;
      if (neueBefunde) this.app.zonen.panel = true;
    } else {
      this.nichtErreichbar = { schluessel, text: fehler };
      this.app.zonen.panel = true;
    }
    this.app.rendern();
  }

  private befundZahl(e: Ergebnis | null): number {
    return e ? e.results.filter((r) => r.state === 'fehlerhaft').length : 0;
  }

  resultat(id: string): Resultat | undefined {
    return this.ergebnis?.results.find((r) => r.id === id);
  }

  /** Befunde für Panel und Struktur: Kern-Befunde der fehlerhaften Elemente, sonst „nicht erreichbar“. */
  befunde(): { elementId: string; code: string; schluessel: string; text: string }[] {
    if (!this.aktiv()) return [];
    const aus: { elementId: string; code: string; schluessel: string; text: string }[] = [];
    const ids = new Set(alleElemente(this.app.dokument()).map((e) => e.id));
    if (this.nichtErreichbar && this.nichtErreichbar.schluessel === this.schluessel()) {
      const wurzeln = this.graph().filter((e) => !istVerworfen(e));
      const ziel = wurzeln[wurzeln.length - 1];
      if (ziel)
        aus.push({
          elementId: ziel.id,
          code: 'kernel_unavailable',
          schluessel: 'kernel.befund.kernel_unavailable',
          text: this.app.t('kernel.befund.kernel_unavailable'),
        });
      return aus;
    }
    if (this.ergebnisSchluessel !== this.schluessel() && !this.ergebnis) return aus;
    for (const r of this.ergebnis?.results ?? []) {
      if (r.state !== 'fehlerhaft' || !ids.has(r.id)) continue;
      const e = finde(this.app.dokument(), r.id);
      if (!e || istVerworfen(e)) continue;
      for (const b of r.befunde) {
        aus.push({
          elementId: r.id,
          code: b.code,
          schluessel: `kernel.befund.${b.code}`,
          text: this.app.t(`kernel.befund.${b.code}`, {
            bezug: b.bezug ? this.app.name(b.bezug) : '',
          }),
        });
      }
    }
    return aus;
  }

  // --- Szene ------------------------------------------------------------------------------------------

  private haupt(e: Element): Ausgang | null {
    const r = this.resultat(e.id);
    if (!r || r.state !== 'aktuell') return null;
    const name = { frame: 'origin', axis: 'line', plane: 'plane' }[e.type] ?? e.type;
    return r.outputs[name] ?? null;
  }

  private artVon(e: Element): Art {
    return (
      ({ frame: 'koordinatensystem', point: 'punkt', axis: 'achse', plane: 'ebene' } as const)[
        e.type as 'frame'
      ] ?? 'linie'
    );
  }

  /** Lage aus dem Ergebnis: Punkte als [x, y, z], sonst die Felder des Ausgangs als mm-Zahlen. */
  private lage(e: Element): V3 | Record<string, V3> | null {
    const o = this.haupt(e);
    if (!o) return null;
    if (o.type === 'point') return vec(o.position);
    const felder: Record<string, V3> = {};
    for (const f of ['origin', 'direction', 'start', 'end', 'normal', 'x_direction']) {
      const v = vec(o[f]);
      if (v) felder[f] = v;
    }
    return felder;
  }

  /** Elemente in der Szene: alle nicht verworfenen mit Ergebnis; neue ohne Ergebnis fehlen noch. */
  szene(): SzenenObjekt[] {
    if (!this.ergebnis) return [];
    const bekannt = new Set(this.ergebnis.results.map((r) => r.id));
    const aus: SzenenObjekt[] = [];
    for (const e of alleElemente(this.app.dokument())) {
      if (!istDrahtTyp(e.type) || istVerworfen(e) || !bekannt.has(e.id)) continue;
      if (this.verworfenerVorfahre(e.id)) continue;
      aus.push({
        element: e.id,
        art: this.artVon(e),
        sichtbar: !this.app.istAusgeblendet(e.id) && !this.app.versteckteIds().has(e.id),
        lage_mm: this.lage(e),
      });
    }
    return aus;
  }

  private verworfenerVorfahre(id: string): boolean {
    const dok = this.app.dokument();
    const pfad: Element[] = [];
    const suche = (e: Element): boolean => {
      if (e.id === id) return true;
      for (const k of e.content) {
        pfad.push(k);
        if (suche(k)) return true;
        pfad.pop();
      }
      return false;
    };
    suche(dok);
    return pfad.slice(0, -1).some(istVerworfen);
  }

  /** Linien und Punkte zum Zeichnen (nur sichtbare mit Lage). */
  zeichnung(): DrahtZeichnung[] {
    const gewaehlt = new Set(this.app.auswahlIds());
    const aus: DrahtZeichnung[] = [];
    for (const s of this.szene()) {
      if (!s.sichtbar || !s.lage_mm) continue;
      const e = finde(this.app.dokument(), s.element) as Element;
      const punkte = this.geometrie(e);
      if (!punkte) continue;
      aus.push({
        element: s.element,
        art: s.art,
        punkte,
        token: this.token(e),
        gewaehlt: gewaehlt.has(s.element),
        fehlerhaft: this.app.istFehlerhaft(s.element),
      });
    }
    return aus;
  }

  private token(e: Element): string {
    if (e.type === 'axis') {
      const achse = String(e.inputs?.of ?? '').split('.')[1];
      if (achse === 'x' || achse === 'y' || achse === 'z') return `achse.${achse}`;
    }
    return 'text';
  }

  /** Punkte der Darstellung in Weltkoordinaten (mm): Punkt 1, Linie 2, Ebene 4 (Quadrat). */
  geometrie(e: Element): V3[] | null {
    const o = this.haupt(e);
    if (!o) return null;
    if (o.type === 'point') {
      const p = vec(o.position);
      return p ? [p] : null;
    }
    if (o.type === 'segment') {
      const a = vec(o.start);
      const b = vec(o.end);
      return a && b ? [a, b] : null;
    }
    if (o.type === 'line' || o.type === 'ray') {
      const p = vec(o.origin);
      const d = vec(o.direction);
      if (!p || !d) return null;
      if (e.type === 'axis') return [p, plus(p, d, ACHSE_MM)];
      return [
        o.type === 'ray' ? p : plus(p, d, -ANZEIGE_UNENDLICH_MM),
        plus(p, d, ANZEIGE_UNENDLICH_MM),
      ];
    }
    if (o.type === 'plane') {
      const p = vec(o.origin);
      const n = vec(o.normal);
      const x = vec(o.x_direction);
      if (!p || !n || !x) return null;
      const y = kreuz(n, x);
      const h = EBENE_HALB_MM;
      return [
        plus(plus(p, x, -h), y, -h),
        plus(plus(p, x, h), y, -h),
        plus(plus(p, x, h), y, h),
        plus(plus(p, x, -h), y, h),
      ];
    }
    return null;
  }

  /** Endliche Hülle (ohne die Anzeige-Verlängerung von Gerade und Halbgerade). */
  huelle(): { min: V3; max: V3 } | null {
    const pts: V3[] = [];
    for (const z of this.zeichnung()) {
      const e = finde(this.app.dokument(), z.element);
      if (e && (e.type === 'line' || e.type === 'ray')) {
        const o = this.haupt(e);
        const p = o ? vec(o.origin) : null;
        if (p) pts.push(p);
      } else pts.push(...z.punkte);
    }
    if (!pts.length) return null;
    const min: V3 = [Infinity, Infinity, Infinity];
    const max: V3 = [-Infinity, -Infinity, -Infinity];
    for (const p of pts)
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(min[i] as number, p[i] as number);
        max[i] = Math.max(max[i] as number, p[i] as number);
      }
    return { min, max };
  }

  // --- Bildschirm und Auswahl ------------------------------------------------------------------------

  /** Bildschirmpunkt eines Elements: Lage, Mitte (Strecke) oder Ecke (Ebene). */
  bildschirm(id: string, anker: string | undefined): { x: number; y: number } | null {
    const e = finde(this.app.dokument(), id);
    const sz = this.app.szene;
    if (!e || !sz) return null;
    const g = this.geometrie(e);
    if (!g || !g.length) return null;
    let p: V3 = g[0] as V3;
    if (e.type === 'plane') p = anker === 'ecke' ? (g[2] as V3) : this.mitte(g);
    else if (e.type === 'segment' || e.type === 'axis') {
      p = anker === 'mitte' || !anker ? this.mitte(g) : (g[0] as V3);
      if (e.type === 'segment' && !anker) p = this.mitte(g);
    } else if (e.type === 'line' || e.type === 'ray') {
      const o = this.haupt(e);
      p = (o ? vec(o.origin) : null) ?? p;
    }
    return sz.projiziere(p);
  }

  private mitte(g: V3[]): V3 {
    const s: V3 = [0, 0, 0];
    for (const p of g)
      for (let i = 0; i < 3; i++) s[i] = (s[i] as number) + (p[i] as number) / g.length;
    return s;
  }

  /** Element unter dem Zeiger: Fangradius 6 px, Vorrang Punkt vor Linie vor Ebene. */
  treffer(x: number, y: number, nurTyp?: string): string | null {
    const sz = this.app.szene;
    if (!sz) return null;
    let beste: { id: string; rang: number; d: number } | null = null;
    for (const z of this.zeichnung()) {
      const e = finde(this.app.dokument(), z.element) as Element;
      if (nurTyp && e.type !== nurTyp) continue;
      if (z.art === 'koordinatensystem') continue;
      const s = z.punkte.map((p) => sz.projiziere(p));
      let d = Infinity;
      let rang = 1;
      if (z.art === 'punkt') {
        rang = 0;
        d = Math.hypot(x - (s[0]?.x ?? 0), y - (s[0]?.y ?? 0));
      } else if (z.art === 'ebene') {
        rang = 2;
        for (let i = 0; i < s.length; i++)
          d = Math.min(d, abstandStrecke(x, y, s[i] as Pt, s[(i + 1) % s.length] as Pt));
        if (d > FANG_PX && innen(x, y, s)) d = FANG_PX - 0.01;
      } else d = abstandStrecke(x, y, s[0] as Pt, s[1] as Pt);
      if (d > FANG_PX) continue;
      if (!beste || rang < beste.rang || (rang === beste.rang && d < beste.d))
        beste = { id: z.element, rang, d };
    }
    return beste?.id ?? null;
  }

  /** Bildschirmhülle eines Elements (für Kontur und Kontextaktionen). */
  huelleBildschirm(id: string): { x: number; y: number }[] | null {
    const e = finde(this.app.dokument(), id);
    const sz = this.app.szene;
    if (!e || !sz || !istDrahtTyp(e.type)) return null;
    let g = this.geometrie(e);
    if (e.type === 'frame') {
      const o = this.haupt(e);
      const p = o ? vec(o.position) : null;
      g = p ? [p] : null;
    }
    if (!g) return null;
    if (e.type === 'line' || e.type === 'ray') {
      const o = this.haupt(e);
      const p = o ? vec(o.origin) : null;
      const d = o ? vec(o.direction) : null;
      if (p && d) g = [p, plus(p, d, 60)];
    }
    const r = 6;
    return g.flatMap((p) => {
      const q = sz.projiziere(p);
      return [
        { x: q.x - r, y: q.y - r },
        { x: q.x + r, y: q.y - r },
        { x: q.x + r, y: q.y + r },
        { x: q.x - r, y: q.y + r },
      ];
    });
  }

  // --- Befehle ---------------------------------------------------------------------------------------

  /** Esc bricht einen laufenden Befehl ab, ohne den Graphen zu ändern. */
  abbrechen(): boolean {
    if (!this.modus) return false;
    this.modus = null;
    this.app.meldung('rueck.draht.abgebrochen');
    this.app.rendern();
    return true;
  }

  /** Klick ins Modell; true, wenn das Drahtmodell ihn behandelt hat. */
  klick(x: number, y: number, modus: 'setzen' | 'hinzufuegen' | 'umschalten'): boolean {
    if (this.modus?.art === 'punkt') {
      const neu = this.punktAusKlick(x, y);
      if (neu) this.modus = null;
      return true;
    }
    if (this.modus?.art === 'linie') {
      const id = this.treffer(x, y, 'point');
      if (!id) return true;
      const m = this.modus;
      m.punkte = [...m.punkte, id];
      if (m.punkte.length >= 2) {
        this.modus = null;
        this.linieAnlegen(m.typ, m.punkte[0] as string, m.punkte[1] as string, 'menue');
      } else this.app.meldung('rueck.draht.zweiter-punkt');
      this.app.rendern();
      return true;
    }
    if (!this.aktiv()) return false;
    const id = this.treffer(x, y);
    if (!id) return false;
    this.app.waehle(id, modus);
    return true;
  }

  /** Rechtsklick: Element unter dem Zeiger wählen (bleibt, wenn es schon gewählt ist). */
  kontext(x: number, y: number): boolean {
    if (!this.aktiv()) return false;
    const id = this.treffer(x, y);
    if (!id) return false;
    if (!this.app.auswahlIds().includes(id)) this.app.waehle(id, 'setzen');
    return true;
  }

  /** Koordinatensystem, auf dessen XY-Ebene ein freier Punkt landet: gewählt, sonst zuletzt angelegt. */
  zielFrame(): Element | null {
    const sel = this.app.gewaehlteElemente().filter((e) => e.type === 'frame' && !istVerworfen(e));
    if (sel.length === 1) return sel[0] as Element;
    const alle = alleElemente(this.app.dokument()).filter(
      (e) => e.type === 'frame' && !istVerworfen(e) && this.resultat(e.id)?.state === 'aktuell',
    );
    return alle[alle.length - 1] ?? null;
  }

  private frameLage(f: Element | null): { t: V3; x: V3; y: V3; z: V3 } {
    const o = f ? this.resultat(f.id)?.outputs.frame : undefined;
    const t = o ? vec(o.origin) : null;
    const x = o ? vec(o.x) : null;
    const y = o ? vec(o.y) : null;
    const z = o ? vec(o.z) : null;
    if (t && x && y && z) return { t, x, y, z };
    return { t: [0, 0, 0], x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] };
  }

  private punktAusKlick(sx: number, sy: number): string | null {
    const f = this.zielFrame();
    const l = this.frameLage(f);
    const p = this.app.szene?.aufEbene(sx, sy, l.t, l.z);
    if (!p) return null;
    const d = minus(p, l.t);
    const lokal: V3 = [skalar(d, l.x), skalar(d, l.y), skalar(d, l.z)];
    const rund = (v: number) => Math.round(v * 1e6) / 1e6;
    return this.punktAnlegen(
      f ? { frame: `${f.id}.frame` } : {},
      { x: rund(lokal[0]), y: rund(lokal[1]), z: 0 },
      'menue',
    );
  }

  private freieId(praefix: string): string {
    const ids = new Set(alleElemente(this.app.projekt).map((e) => e.id));
    let n = 1;
    while (ids.has(`${praefix}${n}`)) n += 1;
    return `${praefix}${n}`;
  }

  private einfuegeStelle(dok: Element): Element {
    return (this.app.aktiv ? finde(dok, this.app.aktiv) : undefined) ?? dok;
  }

  private neu(
    id: string,
    type: string,
    name: string,
    params: Record<string, Groesse> = {},
    inputs: Record<string, string> = {},
    content: Element[] = [],
  ): Element {
    return { id, type, inputs, params, content, meta: { name } };
  }

  koordinatensystemAnlegen(weg: 'menue' | 'kontextmenue' | 'suche' | string): string {
    const t = this.app.t;
    const sel = this.app.gewaehlteElemente();
    const eltern = sel.length === 1 && sel[0]?.type === 'frame' ? sel[0].id : null;
    const id = this.freieId('K');
    const nr = id.slice(1);
    const mm = (v: number): Groesse => ({ value: v, unit: 'mm' });
    const grad = (v: number): Groesse => ({ value: v, unit: 'deg' });
    const kinder: Element[] = [
      this.neu(
        `${id}-ursprung`,
        'point',
        t('draht.kind.ursprung'),
        { x: mm(0), y: mm(0), z: mm(0) },
        {
          frame: `${id}.frame`,
        },
      ),
      ...(['x', 'y', 'z'] as const).map((a) =>
        this.neu(`${id}-${a}`, 'axis', t(`draht.kind.${a}`), {}, { of: `${id}.${a}` }),
      ),
      ...(['xy', 'yz', 'zx'] as const).map((a) =>
        this.neu(`${id}-${a}`, 'plane', t(`draht.kind.${a}`), {}, { of: `${id}.${a}` }),
      ),
    ];
    const k = this.neu(
      id,
      'frame',
      t('draht.name.koordinatensystem', { n: nr }),
      { x: mm(0), y: mm(0), z: mm(0), rx: grad(0), ry: grad(0), rz: grad(0) },
      eltern ? { parent: `${eltern}.frame` } : {},
      kinder,
    );
    this.app.aendern((dok) => this.einfuegeStelle(dok).content.push(k));
    this.app.protokolliere(
      'referenz.koordinatensystem',
      eltern ? { parent: eltern } : {},
      weg as never,
      'mensch',
    );
    this.app.auswahl = [{ element_id: id }];
    this.app.meldung('rueck.angelegt', { name: k.meta.name });
    return id;
  }

  punktAnlegen(
    inputs: Record<string, string>,
    xyz: { x: number; y: number; z: number },
    weg: string,
  ): string {
    const id = this.freieId('P');
    const mm = (v: number): Groesse => ({ value: v, unit: 'mm' });
    const p = this.neu(
      id,
      'point',
      this.app.t('draht.name.punkt', { n: id.slice(1) }),
      { x: mm(xyz.x), y: mm(xyz.y), z: mm(xyz.z) },
      inputs,
    );
    this.app.aendern((dok) => this.einfuegeStelle(dok).content.push(p));
    this.app.protokolliere('referenz.punkt', { element: id, ...inputs }, weg as never, 'mensch');
    this.app.auswahl = [{ element_id: id }];
    this.app.meldung('rueck.angelegt', { name: p.meta.name });
    return id;
  }

  linieAnlegen(typ: string, a: string, b: string, weg: string): string {
    const praefix = { line: 'G', ray: 'H', segment: 'S' }[typ] ?? 'L';
    const id = this.freieId(praefix);
    const e = this.neu(
      id,
      typ,
      this.app.t(`draht.name.${typ}`, { n: id.slice(1) }),
      {},
      {
        a: `${a}.point`,
        b: `${b}.point`,
      },
    );
    this.app.aendern((dok) => this.einfuegeStelle(dok).content.push(e));
    this.app.protokolliere(
      `referenz.${{ line: 'gerade', ray: 'halbgerade', segment: 'strecke' }[typ]}`,
      { a, b },
      weg as never,
      'mensch',
    );
    this.app.meldung('rueck.angelegt', { name: e.meta.name });
    return id;
  }

  /** Gewählte Punkte in Wahlreihenfolge. */
  gewaehltePunkte(): string[] {
    return this.app.auswahlIds().filter((i) => {
      const e = this.app.find(i);
      return !!e && e.type === 'point' && !istVerworfen(e);
    });
  }
}

type Pt = { x: number; y: number };

function abstandStrecke(x: number, y: number, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy || 1;
  const u = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / l2));
  return Math.hypot(x - (a.x + u * dx), y - (a.y + u * dy));
}

function innen(x: number, y: number, poly: Pt[]): boolean {
  let drin = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i] as Pt;
    const b = poly[j] as Pt;
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) drin = !drin;
  }
  return drin;
}

/** Eingabe eines Werts mit Einheit für Drahtmodell-Felder: „1,2 m“, „30°“, „25“ (Standard-Einheit). */
export function leseGroesse(text: string, dim: Dimension): Groesse | null {
  const m = text
    .trim()
    .replace(/\s+/g, ' ')
    .match(/^([+-]?\d+(?:[.,]\d+)?(?:e[+-]?\d+)?)\s*(mm|cm|m|°|deg|rad)?$/i);
  if (!m) return null;
  const value = Number((m[1] as string).replace(',', '.'));
  if (!Number.isFinite(value)) return null;
  const roh = (m[2] ?? '').toLowerCase();
  const unit = roh === '°' ? 'deg' : roh || (dim === 'length' ? 'mm' : 'deg');
  const laenge = ['mm', 'cm', 'm'].includes(unit);
  if ((dim === 'length') !== laenge) return null;
  return { value, unit };
}

/** Anzeige einer Größe im Feld (ohne Umrechnung; die Einheit bleibt, wie sie eingegeben wurde). */
export function groesseAnzeige(g: Groesse | undefined, sprache: string): string {
  if (!g) return '';
  const zahl = sprache === 'de' ? String(g.value).replace('.', ',') : String(g.value);
  return g.unit === 'deg' ? `${zahl}°` : `${zahl} ${g.unit}`;
}
