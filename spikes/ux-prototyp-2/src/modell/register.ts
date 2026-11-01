// Befehlsregister (Daten, ADR-045/060) und alles, was daraus erzeugt wird: Menüs, Kontextmenü, Suche.
import daten from '../befehle.json';

export type Bezug =
  | 'keine'
  | 'element'
  | 'teil'
  | 'baugruppe'
  | 'kante'
  | 'flaeche'
  | 'mehrfach'
  | 'verworfen'
  | 'ansicht'
  | 'punkt'
  | 'punkte';

export interface Befehl {
  id: string;
  familie: string;
  /** Übersetzungsschlüssel des Titels (ohne Übersetzung erscheint er unverändert). */
  titel: string;
  parameter: Record<string, unknown>;
  bezug: Bezug;
  /** Kleiner = weiter vorn; Kontextaktionen sind die ersten fünf des Kontextmenüs nach Rang. */
  rang: number;
  wesentlich: boolean;
  kuerzel?: string;
  untergruppe?: string;
  /** Erscheint auch im Kontextmenü, wenn der Bezug „keine“ ist. */
  kontext?: boolean;
  /** Noch ohne Wirkung im Prototyp. */
  folgt?: boolean;
  /** Gemeinsame Handlung von Varianten (etwa für ein Element und für mehrere): Menüs zeigen eine. */
  handlung?: string;
}

export const GRUPPE_MAX = 12;

/** Familie → Ort der Platzierungstabelle (design.md). */
export const ORT_DER_FAMILIE: Record<string, string> = {
  Datei: 'start-menue',
  Bearbeiten: 'dropdown-bearbeiten',
  Auswahl: 'dropdown-auswahl',
  Baugruppe: 'dropdown-baugruppe',
  Ansicht: 'ansichtsleiste',
  'Ansicht speichern': 'ansichtsleiste',
  Sichtbarkeit: 'auge',
  Fenster: 'menueleiste',
  Hilfe: 'suche',
  Simulation: 'dropdown-simulation',
  Referenz: 'dropdown-referenz',
};

/** Feste Reihenfolge der Familien im Kontextmenü. */
export const FAMILIEN = [
  'Bearbeiten',
  'Auswahl',
  'Baugruppe',
  'Sichtbarkeit',
  'Ansicht',
  'Ansicht speichern',
  'Datei',
  'Fenster',
  'Hilfe',
  'Simulation',
  'Chat',
  'Referenz',
];

export type Ort =
  | 'start-menue'
  | 'dropdown'
  | 'kontextmenue'
  | 'kontextmenue-mehr'
  | 'kontextaktion'
  | 'ansichtsleiste'
  | 'menueleiste'
  | 'auge'
  | 'suche'
  | 'suche-folgt'
  | 'alle-befehle';

const FESTER_ORT: Record<string, Ort> = {
  Datei: 'start-menue',
  Bearbeiten: 'dropdown',
  Auswahl: 'dropdown',
  Baugruppe: 'dropdown',
  Simulation: 'dropdown',
  Referenz: 'dropdown',
  Ansicht: 'ansichtsleiste',
  'Ansicht speichern': 'ansichtsleiste',
  Sichtbarkeit: 'auge',
  Fenster: 'menueleiste',
};

/** Orte, an denen ein Befehl erscheint: Platzhalter nur in der Suche unter „Folgt später“. */
export function orte(b: Befehl): Ort[] {
  if (b.folgt) return ['suche-folgt'];
  const liste: Ort[] = ['suche', 'alle-befehle'];
  const fest = FESTER_ORT[b.familie];
  if (fest) liste.push(fest);
  if (!hatFestenOrt(b) && (b.bezug !== 'keine' || b.kontext)) liste.push('kontextmenue');
  return liste;
}

export const befehleAusDatei = (daten as { befehle: Befehl[] }).befehle;

export function ladeRegisterDatei(inhalt: unknown): Befehl[] {
  const liste = Array.isArray(inhalt) ? inhalt : ((inhalt as { befehle?: unknown }).befehle ?? []);
  return (liste as Partial<Befehl>[]).map((b, i): Befehl => ({
    id: String(b.id),
    familie: b.familie ?? 'Hilfe',
    titel: b.titel ?? String(b.id),
    parameter: b.parameter ?? {},
    bezug: b.bezug ?? 'keine',
    rang: b.rang ?? 1000 + i,
    wesentlich: b.wesentlich ?? false,
    kuerzel: b.kuerzel,
    untergruppe: b.untergruppe,
    kontext: b.kontext,
    folgt: b.folgt,
    handlung: b.handlung,
  }));
}

export type Auswahlart =
  | 'keine'
  | 'teil'
  | 'schritt'
  | 'kante'
  | 'baugruppe'
  | 'mehrfach'
  | 'verworfen'
  | 'ansicht'
  | 'punkt'
  | 'punkte';

const PASST: Record<Auswahlart, Set<Bezug>> = {
  keine: new Set<Bezug>(['keine']),
  schritt: new Set<Bezug>(['keine', 'element']),
  teil: new Set<Bezug>(['keine', 'element', 'teil']),
  baugruppe: new Set<Bezug>(['keine', 'element', 'baugruppe']),
  kante: new Set<Bezug>(['keine', 'kante']),
  mehrfach: new Set<Bezug>(['keine', 'mehrfach']),
  verworfen: new Set<Bezug>(['keine', 'element', 'verworfen']),
  ansicht: new Set<Bezug>(['keine', 'element', 'ansicht']),
  punkt: new Set<Bezug>(['keine', 'element', 'punkt']),
  punkte: new Set<Bezug>(['keine', 'mehrfach', 'punkte']),
};

export interface Untergruppe {
  name: string;
  eintraege: Befehl[];
}

/** Untergruppen einer Familie in der Reihenfolge des Registers; Gruppen über 12 werden geteilt. */
export function untergruppen(reg: Befehl[], familie: string): Untergruppe[] {
  const gruppen = new Map<string, Befehl[]>();
  for (const b of reg.filter((x) => x.familie === familie)) {
    const name = b.untergruppe ?? 'Weitere';
    gruppen.set(name, [...(gruppen.get(name) ?? []), b]);
  }
  const ergebnis: Untergruppe[] = [];
  for (const [name, liste] of gruppen) {
    for (let i = 0; i < liste.length; i += GRUPPE_MAX) {
      ergebnis.push({
        name: i === 0 ? name : `${name} ${Math.floor(i / GRUPPE_MAX) + 1}`,
        eintraege: liste.slice(i, i + GRUPPE_MAX),
      });
    }
  }
  return ergebnis;
}

export interface KontextGruppe {
  familie: string;
  eintraege: Befehl[];
}

export interface Kontextmenue {
  /** Alle Kandidaten nach Rang. */
  kandidaten: Befehl[];
  /** Sichtbare Ebene: die ersten acht Kandidaten, nach Familie gruppiert (ohne Überschriften). */
  sichtbar: KontextGruppe[];
  /** Zweite Ebene „Mehr …“: die übrigen Kandidaten nach Familie, höchstens zwölf je Gruppe. */
  mehr: KontextGruppe[];
}

export const SICHTBAR_MAX = 8;

/** Befehle mit eigenem Knopf in der Menüleiste: sie stehen nicht zusätzlich in einem Dropdown. */
export const MENUELEISTE_KNOEPFE: ReadonlySet<string> = new Set([
  'bearbeiten.rueckgaengig',
  'bearbeiten.wiederholen',
  'fenster.struktur',
  'fenster.panel',
  'fenster.rechts',
  'suche.oeffnen',
]);

/** Knöpfe der Ansichtsleiste: das Aufklappmenü zeigt sie nicht noch einmal. */
export const ANSICHTSLEISTE_KNOEPFE: readonly string[] = [
  'ansicht.einpassen',
  'ansicht.auf-auswahl',
  'ansicht.isolieren',
  'ansicht.alles-einblenden',
  'ansicht.projektion',
  'darstellung.wechseln',
];

const FESTE_FAMILIEN = new Set(['Ansicht', 'Fenster']);
const FESTE_IDS = new Set(['bearbeiten.rueckgaengig', 'bearbeiten.wiederholen']);

/** Befehle mit dauerndem Ort außerhalb des Kontextmenüs (Ansichtsleiste, Menüleiste). */
export const hatFestenOrt = (b: Befehl): boolean =>
  FESTE_FAMILIEN.has(b.familie) || FESTE_IDS.has(b.id);

/** Je Handlung nur die Variante, deren Bezug zur Auswahlart passt (sonst die für ein Element). */
export function passendeVariante(reg: Befehl[], b: Befehl, art: Auswahlart): boolean {
  if (!b.handlung) return true;
  const gleiche = reg.filter((x) => x.handlung === b.handlung && !x.folgt);
  const passt = gleiche.find((x) => PASST[art].has(x.bezug));
  return (passt ?? gleiche.find((x) => x.bezug === 'element') ?? b) === b;
}

function nachFamilie(liste: Befehl[], teilen: boolean): KontextGruppe[] {
  const familien = [...new Set([...FAMILIEN, ...liste.map((b) => b.familie)])];
  const gruppen: KontextGruppe[] = [];
  for (const familie of familien) {
    const eigene = liste.filter((b) => b.familie === familie);
    for (let i = 0; i < eigene.length; i += teilen ? GRUPPE_MAX : eigene.length || 1) {
      gruppen.push({
        familie,
        eintraege: eigene.slice(i, i + (teilen ? GRUPPE_MAX : eigene.length)),
      });
    }
  }
  return gruppen.filter((g) => g.eintraege.length);
}

/**
 * Kontextmenü aus dem Register: Kandidaten sind Befehle mit Wirkung, passendem Bezug, ohne festen Ort und
 * anwendbar. Die ersten acht nach Rang sind sichtbar, der Rest steht hinter „Mehr …“.
 */
export function kontextmenue(
  reg: Befehl[],
  art: Auswahlart,
  anwendbar: (b: Befehl) => boolean = () => true,
): Kontextmenue {
  const kandidaten = reg
    .filter(
      (b) =>
        !b.folgt &&
        !hatFestenOrt(b) &&
        PASST[art].has(b.bezug) &&
        (b.bezug !== 'keine' || b.kontext) &&
        anwendbar(b),
    )
    .sort((a, b) => a.rang - b.rang);
  return {
    kandidaten,
    sichtbar: nachFamilie(kandidaten.slice(0, SICHTBAR_MAX), false),
    mehr: nachFamilie(kandidaten.slice(SICHTBAR_MAX), true),
  };
}

export const KONTEXTAKTIONEN_MAX = 5;

/** Die Kontextaktionen sind die ersten fünf Kandidaten nach Rang. */
export function kontextaktionen(menue: Kontextmenue): Befehl[] {
  return menue.kandidaten.slice(0, KONTEXTAKTIONEN_MAX);
}
