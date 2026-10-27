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
  | 'ansicht';

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
  if (b.bezug !== 'keine' || b.kontext)
    liste.push(b.wesentlich ? 'kontextmenue' : 'kontextmenue-mehr');
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
  }));
}

export type Auswahlart =
  'keine' | 'teil' | 'schritt' | 'kante' | 'baugruppe' | 'mehrfach' | 'verworfen' | 'ansicht';

const PASST: Record<Auswahlart, Set<Bezug>> = {
  keine: new Set<Bezug>(['keine']),
  schritt: new Set<Bezug>(['keine', 'element']),
  teil: new Set<Bezug>(['keine', 'element', 'teil']),
  baugruppe: new Set<Bezug>(['keine', 'element', 'baugruppe']),
  kante: new Set<Bezug>(['keine', 'kante']),
  mehrfach: new Set<Bezug>(['keine', 'mehrfach']),
  verworfen: new Set<Bezug>(['keine', 'element', 'verworfen']),
  ansicht: new Set<Bezug>(['keine', 'element', 'ansicht']),
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
  eintraege: { befehl: Befehl; mehr: boolean }[];
}

/**
 * Kontextmenü aus dem Register: alle Befehle, deren Bezug zur Auswahlart passt (und die anwendbar sind),
 * gruppiert nach Familie, innerhalb nach Rang; höchstens zwölf je Gruppe, Unwesentliches hinter „Mehr …“.
 */
export function kontextmenue(
  reg: Befehl[],
  art: Auswahlart,
  anwendbar: (b: Befehl) => boolean = () => true,
): KontextGruppe[] {
  const passend = reg.filter(
    (b) =>
      !b.folgt && PASST[art].has(b.bezug) && (b.bezug !== 'keine' || b.kontext) && anwendbar(b),
  );
  const familien = [...new Set([...FAMILIEN, ...passend.map((b) => b.familie)])];
  const gruppen: KontextGruppe[] = [];
  for (const familie of familien) {
    const liste = passend
      .filter((b) => b.familie === familie)
      .sort((a, b) => a.rang - b.rang)
      .slice(0, GRUPPE_MAX);
    if (!liste.length) continue;
    const wesentlich = liste.filter((b) => b.wesentlich);
    const mehr = liste.filter((b) => !b.wesentlich);
    gruppen.push({
      familie,
      eintraege: [
        ...wesentlich.map((befehl) => ({ befehl, mehr: false })),
        ...mehr.map((befehl) => ({ befehl, mehr: true })),
      ],
    });
  }
  return gruppen;
}

/** Alle Einträge des Kontextmenüs nach Rang (für die Kontextaktionen: die ersten fünf). */
export function nachRang(gruppen: KontextGruppe[]): Befehl[] {
  return gruppen.flatMap((g) => g.eintraege.map((e) => e.befehl)).sort((a, b) => a.rang - b.rang);
}

export const KONTEXTAKTIONEN_MAX = 5;

export function kontextaktionen(gruppen: KontextGruppe[]): Befehl[] {
  return nachRang(gruppen).slice(0, KONTEXTAKTIONEN_MAX);
}
