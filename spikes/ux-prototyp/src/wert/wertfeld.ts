// Wertfeld-Logik (ADR-057): Zahl mit Einheit lesen, einfache Formeln, Anzeige. Rechnet intern in mm.

export interface Groesse {
  value: number;
  unit: 'mm';
}

export type Lesefehler =
  'wert.fehler.nicht-lesbar' | 'wert.fehler.dimension' | 'wert.fehler.teilung';

export type Lesen = { ok: true; groesse: Groesse } | { ok: false; fehler: Lesefehler };

const LAENGE: Record<string, number> = { mm: 1, cm: 10, m: 1000 };
const MASSE = new Set(['kg', 'g']);

interface Zahl {
  wert: number;
  masse: boolean;
}

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
      if (links.masse !== rechts.masse) throw new Fehler('wert.fehler.dimension');
      links = {
        wert: z === '+' ? links.wert + rechts.wert : links.wert - rechts.wert,
        masse: links.masse,
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
        links = { wert: links.wert / rechts.wert, masse: links.masse };
      } else {
        links = { wert: links.wert * rechts.wert, masse: links.masse || rechts.masse };
      }
    }
  }

  private faktor(): Zahl {
    const z = this.naechstes();
    if (z === '-') {
      this.pos += 1;
      const f = this.faktor();
      return { wert: -f.wert, masse: f.masse };
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
    if (einheit === '') return { wert: wert * this.standardFaktor, masse: false };
    const faktor = LAENGE[einheit];
    if (faktor !== undefined) return { wert: wert * faktor, masse: false };
    if (MASSE.has(einheit)) return { wert: wert * (einheit === 'kg' ? 1000 : 1), masse: true };
    throw new Fehler('wert.fehler.nicht-lesbar');
  }
}

class Fehler extends Error {
  constructor(readonly schluessel: Lesefehler) {
    super(schluessel);
  }
}

/** Liest Eingabe wie „8 cm“, „80“, „60 + 20“, „0,08 m“; ohne Einheit gilt die Standard-Einheit. */
export function lesen(eingabe: string, standard: 'mm' | 'cm' | 'm' = 'mm'): Lesen {
  const leser = new Leser(
    eingabe.replace(/×/g, '*').replace(/−/g, '-').trim(),
    LAENGE[standard] ?? 1,
  );
  try {
    const z = leser.ausdruck();
    if (!leser.fertig()) return { ok: false, fehler: 'wert.fehler.nicht-lesbar' };
    if (z.masse) return { ok: false, fehler: 'wert.fehler.dimension' };
    if (!Number.isFinite(z.wert)) return { ok: false, fehler: 'wert.fehler.nicht-lesbar' };
    return { ok: true, groesse: { value: Math.round(z.wert * 1e6) / 1e6, unit: 'mm' } };
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
