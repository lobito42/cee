// Wertfeld-Logik (ADR-057): Zahl mit Einheit lesen, einfache Formeln, Anzeige. Rechnet intern in mm.

export type Dimension = 'laenge' | 'kraft';

export interface Groesse {
  value: number;
  unit: 'mm' | 'N';
}

export type Lesefehler =
  'wert.fehler.nicht-lesbar' | 'wert.fehler.dimension' | 'wert.fehler.teilung';

export type Lesen = { ok: true; groesse: Groesse } | { ok: false; fehler: Lesefehler };

const LAENGE: Record<string, number> = { mm: 1, cm: 10, m: 1000 };
const KRAFT: Record<string, number> = { n: 1, kn: 1000 };
const MASSE = new Set(['kg', 'g']);

/** Die Größe einer Zahl: `null` = ohne Einheit (nimmt die Dimension des Feldes an). */
type Dim = 'laenge' | 'kraft' | 'masse' | null;

interface Zahl {
  wert: number;
  dim: Dim;
}

const verbinden = (a: Dim, b: Dim): Dim => a ?? b;

class Leser {
  private pos = 0;
  constructor(
    private readonly text: string,
    private readonly standardFaktor: number,
  ) {}

  private blank(): void {
    while (this.text[this.pos] === ' ') this.pos += 1;
  }

  private naechstes(): string {
    this.blank();
    return this.text[this.pos] ?? '';
  }

  fertig(): boolean {
    return this.naechstes() === '';
  }

  ausdruck(): Zahl {
    let links = this.produkt();
    for (;;) {
      const z = this.naechstes();
      if (z !== '+' && z !== '-') return links;
      this.pos += 1;
      const rechts = this.produkt();
      if (links.dim !== null && rechts.dim !== null && links.dim !== rechts.dim) {
        throw new Fehler('wert.fehler.dimension');
      }
      links = {
        wert: z === '+' ? links.wert + rechts.wert : links.wert - rechts.wert,
        dim: verbinden(links.dim, rechts.dim),
      };
    }
  }

  private produkt(): Zahl {
    let links = this.faktor();
    for (;;) {
      const z = this.naechstes();
      if (z !== '*' && z !== '/') return links;
      this.pos += 1;
      const rechts = this.faktor();
      if (z === '/') {
        if (rechts.wert === 0) throw new Fehler('wert.fehler.teilung');
        links = { wert: links.wert / rechts.wert, dim: links.dim };
      } else {
        links = { wert: links.wert * rechts.wert, dim: verbinden(links.dim, rechts.dim) };
      }
    }
  }

  private faktor(): Zahl {
    const z = this.naechstes();
    if (z === '-') {
      this.pos += 1;
      const f = this.faktor();
      return { wert: -f.wert, dim: f.dim };
    }
    if (z === '(') {
      this.pos += 1;
      const inner = this.ausdruck();
      if (this.naechstes() !== ')') throw new Fehler('wert.fehler.nicht-lesbar');
      this.pos += 1;
      return inner;
    }
    return this.zahl();
  }

  private zahl(): Zahl {
    this.blank();
    const rest = this.text.slice(this.pos);
    const m = /^(\d+(?:[.,]\d+)?|[.,]\d+)\s*([a-zA-Z]*)/.exec(rest);
    if (!m || m[1] === undefined) throw new Fehler('wert.fehler.nicht-lesbar');
    this.pos += m[0].length;
    const wert = Number(m[1].replace(',', '.'));
    const einheit = (m[2] ?? '').toLowerCase();
    if (einheit === '') return { wert: wert * this.standardFaktor, dim: null };
    const laenge = LAENGE[einheit];
    if (laenge !== undefined) return { wert: wert * laenge, dim: 'laenge' };
    const kraft = KRAFT[einheit];
    if (kraft !== undefined) return { wert: wert * kraft, dim: 'kraft' };
    if (MASSE.has(einheit)) return { wert: wert * (einheit === 'kg' ? 1000 : 1), dim: 'masse' };
    throw new Fehler('wert.fehler.nicht-lesbar');
  }
}

class Fehler extends Error {
  constructor(readonly schluessel: Lesefehler) {
    super(schluessel);
  }
}

/**
 * Liest Eingabe wie „8 cm“, „80“, „60 + 20“, „0,08 m“ (Länge, Ergebnis in mm) oder „0,1 kN“ (Kraft,
 * Ergebnis in N); ohne Einheit gilt die Standard-Einheit des Feldes.
 */
export function lesen(
  eingabe: string,
  standard: 'mm' | 'cm' | 'm' = 'mm',
  dimension: Dimension = 'laenge',
): Lesen {
  const leser = new Leser(
    eingabe.replace(/×/g, '*').replace(/−/g, '-').trim(),
    dimension === 'kraft' ? 1 : (LAENGE[standard] ?? 1),
  );
  try {
    const z = leser.ausdruck();
    if (!leser.fertig()) return { ok: false, fehler: 'wert.fehler.nicht-lesbar' };
    if (z.dim !== null && z.dim !== dimension)
      return { ok: false, fehler: 'wert.fehler.dimension' };
    if (!Number.isFinite(z.wert)) return { ok: false, fehler: 'wert.fehler.nicht-lesbar' };
    return {
      ok: true,
      groesse: {
        value: Math.round(z.wert * 1e6) / 1e6,
        unit: dimension === 'kraft' ? 'N' : 'mm',
      },
    };
  } catch (e) {
    if (e instanceof Fehler) return { ok: false, fehler: e.schluessel };
    throw e;
  }
}

/** Anzeige: höchstens zwei Nachkommastellen, keine Nullen am Ende, Dezimalkomma in „de“. */
export function anzeigen(g: Groesse, sprache: 'de' | 'en' = 'de'): string {
  const zahl = String(Math.round(g.value * 100) / 100);
  return `${sprache === 'de' ? zahl.replace('.', ',') : zahl} ${g.unit}`;
}

/** Ziehen am Feld: 1-mm-Schritte. */
export function ziehen(g: Groesse, schritte: number): Groesse {
  return { value: g.value + schritte, unit: g.unit };
}
