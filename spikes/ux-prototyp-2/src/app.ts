// Zentrale des Prototyps: Graph (Schicht 1), Ansicht (Schicht 3), Befehle und abgeleitete Daten.
// Die Zonen lesen nur von hier und rufen nur `ausfuehren` (ein Befehl, viele Wege).
import { Vector3 } from 'three';
import type { Darstellung, Projektionsart, Szene } from './ansicht/szene';
import {
  befunde as befundeVon,
  ergebnisVon,
  huelleVon,
  type Befund,
  type Koerper,
} from './geometrie/teil';
import type { Uebersetzer, Werte, Sprache } from './i18n';
import { AUSGANGSWERTE, standardProjekt } from './modell/beispiele';
import {
  alleElemente,
  elternVon,
  finde,
  istVerworfen,
  kopie,
  nachfahren,
  neueId,
  pfadZu,
  wert,
  type Adresse,
  type Element,
} from './modell/element';
import {
  befehleAusDatei,
  type Auswahlart,
  type Befehl,
  type KontextGruppe,
} from './modell/register';
import profile from './eingabe/profile.json';
import { sichtbareTreffer } from './zonen/suche';
import type { Groesse } from './wert/wertfeld';

export type Weg =
  | 'menue'
  | 'kuerzel'
  | 'kontextmenue'
  | 'kontextaktion'
  | 'suche'
  | 'eigenschaften'
  | 'griff'
  | 'struktur'
  | 'chat'
  | 'befund';
export type Quelle = 'mensch' | 'ki';

export interface ProtokollEintrag {
  befehl: string;
  parameter: Record<string, unknown>;
  quelle: Quelle;
  weg: Weg;
}

export interface Kanal {
  zustand: string;
  kanal: 'Kontur' | 'Umfeld' | 'Sichtbarkeit' | 'Status';
  token: string;
  strichart: 'durchgezogen' | 'gestrichelt' | null;
  breite: number | null;
}

export interface DarstellungsZustand {
  zustaende: string[];
  kanaele: Kanal[];
}

export type DarstellungsArt = 'modell' | 'struktur' | 'chat' | 'pfad';

export interface Vorschlag {
  titel: string;
  begruendung: string;
  befehle: { id: string; parameter: Record<string, unknown> }[];
  werte: { feld: string; vorher: string; nachher: string }[];
  ziel: string;
}

export interface Nachricht {
  von: 'person' | 'ki';
  text: string;
  schluessel?: string;
  werte?: Werte;
}

export const PROFILE = Object.keys(profile as Record<string, unknown>);
export const SPEICHER_SCHLUESSEL = 'cee-prototyp-graph';

type Wirkung = (par: Record<string, unknown>, weg: Weg, quelle: Quelle) => boolean | void;

export interface ZeilenInfo {
  element: Element;
  ebene: number;
}

export class App {
  // --- Schicht 1: Graph ---------------------------------------------------------------------------
  projekt: Element;
  dok: string;
  protokoll: ProtokollEintrag[] = [];
  /** In der Suche alle Platzhalter („Folgt später“) zeigen statt der ersten drei. */
  sucheFolgtAlle = false;
  /** Alle ausgelösten Befehle (auch ohne Wirkung am Graphen), nur für die Prüfung. */
  ausgeloest: { befehl: string; weg: Weg; wirkung: boolean }[] = [];
  private verlaeufe = new Map<string, { zurueck: Element[]; vor: Element[] }>();
  /** Vorschau eines Werts, der gerade getippt wird (noch kein Verlaufseintrag). */
  vorschau: { id: string; name: string; wert: Groesse } | null = null;

  // --- Schicht 3: Ansicht (flüchtig, je Person) ----------------------------------------------------
  auswahl: Adresse[] = [];
  hover: string | null = null;
  aktiv: string | null = null;
  isoliert: string[] | null = null;
  ausgeblendet = new Set<string>();
  verworfenesZeigen = false;
  darstellung: Darstellung = 'koerper';
  projektionsart: Projektionsart = 'orthogonal';
  profil: string = PROFILE[0] ?? '';
  zonen = { struktur: true, panel: false, rechts: true };
  task: 'modellieren' | 'simulation' = 'modellieren';
  thema: 'hell' | 'dunkel' = 'hell';

  // --- Oberfläche -----------------------------------------------------------------------------------
  menue: string | null = null;
  kontextMenue: {
    x: number;
    y: number;
    art: Auswahlart;
    gruppen: KontextGruppe[];
    mehr: Set<string>;
  } | null = null;
  suche = { offen: false, text: '', index: 0, alle: false, fokussiert: false };
  umbenennen: { id: string; weg: Weg } | null = null;
  umbenennenFokussiert = false;
  umhaengenModus: string | null = null;
  fokusZone: string | null = null;
  rueckmeldung: { schluessel: string; werte?: Werte } | null = null;
  unbekannterZustand = false;
  zustandName = '';
  eingabenWegMerken: Weg = 'menue';
  tastenfokus = false;

  griff: {
    id: string;
    name: string;
    start: number;
    wert: number;
    eingabe: string;
    zeiger: { x: number; y: number };
    sichtbarBis: number | null;
    aktiv: boolean;
  } | null = null;

  dnd: {
    id: string;
    x: number;
    y: number;
    ziel: string | null;
    erlaubt: boolean | null;
    grund?: string;
  } | null = null;

  status = new Map<string, 'rechnet' | 'pausiert'>();
  rechenzeitMs = 0;
  andere = { aktiv: false, dok: 'halter', element: 'steg' };
  chat = { nachrichten: [] as Nachricht[], eingabe: '', vorschlag: null as Vorschlag | null };
  katalogOffen: string | null = null;

  szene: Szene | null = null;
  private lauscher: (() => void)[] = [];
  private rendernLaeuft = false;

  constructor(
    readonly t: Uebersetzer,
    readonly sprache: Sprache,
    readonly tempo: number,
    public register: Befehl[] = befehleAusDatei,
    projekt = standardProjekt(),
  ) {
    this.projekt = projekt;
    this.dok = projekt.content[0]?.id ?? '';
  }

  beiRendern(fn: () => void): void {
    this.lauscher.push(fn);
  }

  /** Alle Zonen neu zeichnen (zusammengefasst, damit viele Änderungen nur einmal rendern). */
  rendern(): void {
    if (this.rendernLaeuft) return;
    this.rendernLaeuft = true;
    queueMicrotask(() => {
      this.rendernLaeuft = false;
      for (const fn of this.lauscher) fn();
    });
  }

  rendernSofort(): void {
    for (const fn of this.lauscher) fn();
  }

  // --- Dokumente und Elemente ---------------------------------------------------------------------

  /** Das aktive Dokument (Wurzel der Struktur) ohne Vorschau. */
  dokument(): Element {
    return (
      this.projekt.content.find((d) => d.id === this.dok) ?? (this.projekt.content[0] as Element)
    );
  }

  /** Das Dokument, wie es gezeigt wird: mit der Vorschau eines getippten Werts. */
  angezeigtesDokument(): Element {
    const d = this.dokument();
    if (!this.vorschau) return d;
    const k = kopie(d);
    const e = finde(k, this.vorschau.id);
    if (e) e.params[this.vorschau.name] = this.vorschau.wert;
    return k;
  }

  find(id: string): Element | undefined {
    return finde(this.dokument(), id);
  }

  name(id: string): string {
    return this.find(id)?.meta.name ?? id;
  }

  modell(): Element {
    return kopie(this.projekt);
  }

  wurzel(): Element {
    return this.dokument();
  }

  private verlauf(): { zurueck: Element[]; vor: Element[] } {
    let v = this.verlaeufe.get(this.dok);
    if (!v) {
      v = { zurueck: [], vor: [] };
      this.verlaeufe.set(this.dok, v);
    }
    return v;
  }

  verlaufLaenge(): number {
    return this.verlauf().zurueck.length;
  }

  kannRueckgaengig = (): boolean => this.verlauf().zurueck.length > 0;
  kannWiederholen = (): boolean => this.verlauf().vor.length > 0;

  private speichern(): void {
    try {
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(this.projekt));
    } catch {
      /* Speicher gesperrt: der Prototyp läuft ohne weiter */
    }
  }

  /** Ändert das aktive Dokument als genau einen Verlaufseintrag; false, wenn nichts anders wurde. */
  aendern(fn: (dok: Element) => void): boolean {
    const alt = this.dokument();
    const neu = kopie(alt);
    fn(neu);
    if (JSON.stringify(neu) === JSON.stringify(alt)) return false;
    const v = this.verlauf();
    v.zurueck.push(kopie(alt));
    v.vor = [];
    this.projekt.content = this.projekt.content.map((d) => (d.id === alt.id ? neu : d));
    this.speichern();
    return true;
  }

  private ersetzeDokument(neu: Element): void {
    this.projekt.content = this.projekt.content.map((d) => (d.id === neu.id ? neu : d));
    this.speichern();
  }

  // --- Auswahl ------------------------------------------------------------------------------------

  auswahlIds(): string[] {
    return [...new Set(this.auswahl.map((a) => a.element_id))];
  }

  /** Das Element, in dem Auswahl und Klicks gerade arbeiten: das aktive oder die Wurzel. */
  bereichElement(): Element {
    return (this.aktiv ? this.find(this.aktiv) : undefined) ?? this.dokument();
  }

  /** Was ein Klick auf das Element `trefferId` wählt (nächste Ebene unter dem aktiven Element). */
  zielFuerTreffer(trefferId: string): string | null {
    const bereich = this.bereichElement();
    const pfad = pfadZu(bereich, trefferId);
    if (!pfad.length) return null;
    if (pfad.length === 1) return bereich.content.length ? null : bereich.id;
    const folge = pfad.slice(1);
    // In einem Teil wählt ein Klick den Schritt; sonst das erste Teil auf dem Weg zum Treffer.
    if (bereich.type === 'teil') return (folge[0] as Element).id;
    const teil = folge.find((e) => e.type === 'teil');
    return (teil ?? (folge[0] as Element)).id;
  }

  /** IDs aller Elemente, die in der aktuellen Ebene wählbar und sichtbar sind (für Mod+A). */
  waehlbareIds(): string[] {
    const bereich = this.bereichElement();
    const liste =
      bereich.type === 'teil' || bereich.content.every((k) => k.type !== 'teil')
        ? bereich.content
        : bereich.content.flatMap((k) =>
            k.type === 'baugruppe' ? alleElemente(k).filter((x) => x.type === 'teil') : [k],
          );
    return liste.filter((k) => !istVerworfen(k) && !this.istAusgeblendet(k.id)).map((k) => k.id);
  }

  istAusgeblendet(id: string): boolean {
    if (this.ausgeblendet.has(id)) return true;
    const pfad = pfadZu(this.dokument(), id);
    return pfad.slice(0, -1).some((e) => this.ausgeblendet.has(e.id));
  }

  setzeAuswahl(adressen: Adresse[]): void {
    this.auswahl = adressen;
    this.rendern();
  }

  waehle(id: string, modus: 'setzen' | 'hinzufuegen' | 'umschalten', teil?: Adresse['teil']): void {
    const adr: Adresse = teil ? { element_id: id, teil } : { element_id: id };
    const gleich = (a: Adresse) =>
      a.element_id === id && JSON.stringify(a.teil) === JSON.stringify(teil);
    if (modus === 'setzen') this.auswahl = [adr];
    else if (modus === 'hinzufuegen') {
      if (!this.auswahl.some(gleich)) this.auswahl = [...this.auswahl, adr];
    } else if (this.auswahl.some(gleich)) this.auswahl = this.auswahl.filter((a) => !gleich(a));
    else this.auswahl = [...this.auswahl, adr];
    this.rendern();
  }

  auswahlart(): Auswahlart {
    const ids = this.auswahlIds();
    if (!ids.length) return 'keine';
    if (ids.length > 1) return 'mehrfach';
    if (this.auswahl.some((a) => a.teil?.art === 'kante')) return 'kante';
    const e = this.find(ids[0] as string);
    if (!e) return 'keine';
    if (istVerworfen(e)) return 'verworfen';
    if (e.type === 'view') return 'ansicht';
    if (e.type === 'teil') return 'teil';
    if (e.type === 'baugruppe') return 'baugruppe';
    return 'schritt';
  }

  gewaehlteElemente(): Element[] {
    return this.auswahlIds()
      .map((i) => this.find(i))
      .filter((e): e is Element => !!e);
  }

  // --- Zustände eines Elements --------------------------------------------------------------------

  befunde(): Befund[] {
    return befundeVon(this.dokument());
  }

  istFehlerhaft(id: string): boolean {
    return this.befunde().some((b) => b.elementId === id);
  }

  /** Alle aktiven Zustände eines Elements, ohne die vom Vorrang verdeckten (design.md). */
  zustaende(id: string): string[] {
    const e = this.find(id);
    if (!e) return [];
    const z: string[] = [];
    const gewaehlt = this.auswahlIds().includes(id);
    if (gewaehlt) z.push('ausgewaehlt');
    if (this.andereElemente().includes(id) && !gewaehlt) z.push('andere');
    if (this.hover === id && !gewaehlt && !this.andereElemente().includes(id)) z.push('hover');
    if (this.aktiv === id) z.push('aktiv');
    else if (this.istGedimmt(id)) z.push('gedimmt');
    if (this.istAusgeblendet(id)) z.push('ausgeblendet');
    if (istVerworfen(e)) z.push('verworfen');
    if (this.istFehlerhaft(id)) z.push('fehlerhaft');
    const s = this.status.get(id);
    if (e.meta.pausiert === true || s === 'pausiert') z.push('pausiert');
    if (s === 'rechnet') z.push('rechnet');
    return z;
  }

  andereElemente(): string[] {
    return this.andere.aktiv && this.dok === this.andere.dok && this.find(this.andere.element)
      ? [this.andere.element]
      : [];
  }

  /** Außerhalb des aktiven Elements (oder der Isolation) liegt das Umfeld. */
  istGedimmt(id: string): boolean {
    if (this.isoliert) {
      const mit = new Set(this.isoliert.flatMap((i) => this.mitNachfahren(i)));
      return !mit.has(id);
    }
    if (!this.aktiv) return false;
    const mit = new Set(this.mitNachfahren(this.aktiv));
    const vor = pfadZu(this.dokument(), this.aktiv).map((e) => e.id);
    return !mit.has(id) && !vor.includes(id);
  }

  mitNachfahren(id: string): string[] {
    const e = this.find(id);
    return e ? [e.id, ...nachfahren(e).map((k) => k.id)] : [];
  }

  /** Kanäle eines Elements in einer Darstellung (Modell, Struktur, Chat-Kontext, Pfad). */
  darstellungVon(id: string, d: DarstellungsArt): DarstellungsZustand | null {
    const e = this.find(id);
    if (!e) return null;
    const z = this.zustaende(id);
    const kanaele: Kanal[] = [];
    const k = (
      zustand: string,
      kanal: Kanal['kanal'],
      token: string,
      strichart: Kanal['strichart'] = null,
      breite: number | null = null,
    ) => kanaele.push({ zustand, kanal, token, strichart, breite });
    const T: Record<DarstellungsArt, Record<string, string>> = {
      modell: { hover: 'akzent', ausgewaehlt: 'akzent', andere: 'linie-stark' },
      struktur: { hover: 'flaeche-2', ausgewaehlt: 'akzent-flaeche', andere: 'text-2' },
      chat: { hover: 'flaeche-2', ausgewaehlt: 'akzent-flaeche', andere: 'text-2' },
      pfad: { hover: 'flaeche-2', ausgewaehlt: 'akzent-flaeche', andere: 'text-2' },
    };
    for (const name of z) {
      if (name === 'hover')
        k(
          'hover',
          'Kontur',
          T[d].hover as string,
          d === 'modell' ? 'durchgezogen' : null,
          d === 'modell' ? 1 : null,
        );
      if (name === 'ausgewaehlt') {
        k(
          'ausgewaehlt',
          'Kontur',
          T[d].ausgewaehlt as string,
          d === 'modell' ? 'durchgezogen' : null,
          d === 'modell' ? 2 : null,
        );
        if (d === 'struktur') k('ausgewaehlt', 'Kontur', 'text');
      }
      if (name === 'andere')
        k(
          'andere',
          'Kontur',
          T[d].andere as string,
          d === 'modell' ? 'gestrichelt' : null,
          d === 'modell' ? 2 : null,
        );
      if (name === 'aktiv')
        k('aktiv', 'Umfeld', d === 'modell' ? 'text-3' : 'schrift.schnitt.halbfett');
      if (name === 'gedimmt') k('gedimmt', 'Umfeld', 'text-3');
      if (name === 'ausgeblendet') k('ausgeblendet', 'Sichtbarkeit', 'text-3');
      if (name === 'fehlerhaft') k('fehlerhaft', 'Status', 'fehler');
      if (name === 'pausiert') k('pausiert', 'Status', 'text-2');
      if (name === 'rechnet') k('rechnet', 'Status', 'text-2');
    }
    return { zustaende: z, kanaele };
  }

  // --- Ansicht ------------------------------------------------------------------------------------

  pfadGlieder(): Element[] {
    const ziel = this.aktiv ?? this.dokument().id;
    const pfad = pfadZu(this.dokument(), ziel);
    return pfad.length ? pfad : [this.dokument()];
  }

  /** Sichtbare Zeilen der Struktur: Elemente unter der Wurzel, Verworfenes nur auf Wunsch. */
  zeilen(): ZeilenInfo[] {
    const aus: ZeilenInfo[] = [];
    const lauf = (e: Element, ebene: number) => {
      for (const k of e.content) {
        if (istVerworfen(k) && !this.verworfenesZeigen) continue;
        aus.push({ element: k, ebene });
        lauf(k, ebene + 1);
      }
    };
    lauf(this.angezeigtesDokument(), 0);
    return aus;
  }

  /** IDs der Körper (erzeugende Elemente), die nicht gezeichnet werden. */
  versteckteIds(): Set<string> {
    const weg = new Set<string>();
    for (const e of alleElemente(this.dokument())) {
      if (istVerworfen(e) || this.istAusgeblendet(e.id)) weg.add(e.id);
    }
    if (this.isoliert) {
      const sichtbar = new Set(this.isoliert.flatMap((i) => this.mitNachfahren(i)));
      for (const e of alleElemente(this.dokument())) if (!sichtbar.has(e.id)) weg.add(e.id);
    }
    return weg;
  }

  gedimmteIds(): Set<string> {
    const ids = new Set<string>();
    if (!this.aktiv) return ids;
    for (const e of alleElemente(this.dokument())) if (this.istGedimmt(e.id)) ids.add(e.id);
    return ids;
  }

  blasseIds(): Set<string> {
    const ids = new Set<string>();
    for (const e of alleElemente(this.dokument())) {
      if (this.istFehlerhaft(e.id) || e.meta.pausiert === true)
        for (const i of this.mitNachfahren(e.id)) ids.add(i);
    }
    return ids;
  }

  teilErgebnis() {
    const dok = this.angezeigtesDokument();
    const aktiv = this.aktiv ? finde(dok, this.aktiv) : undefined;
    const pfad = aktiv ? pfadZu(dok, aktiv.id) : [];
    const teil = [...pfad].reverse().find((e) => e.type === 'teil');
    return ergebnisVon(teil ?? dok);
  }

  huelle(id: string): { min: [number, number, number]; max: [number, number, number] } | null {
    const e = this.find(id);
    if (!e) return null;
    return huelleVon(e, ergebnisVon(this.angezeigtesDokument()).koerper);
  }

  // --- Befehle ------------------------------------------------------------------------------------

  private wirkungen = new Map<string, Wirkung>();

  registriere(id: string, w: Wirkung): void {
    this.wirkungen.set(id, w);
  }

  befehl(id: string): Befehl | undefined {
    return this.register.find((b) => b.id === id);
  }

  /** Führt einen Befehl aus. `weg` sagt, woher er kam; jeder Weg ruft denselben Befehl. */
  ausfuehren(
    id: string,
    parameter: Record<string, unknown> = {},
    weg: Weg = 'menue',
    quelle: Quelle = 'mensch',
  ): boolean {
    const b = this.befehl(id);
    const w = this.wirkungen.get(id);
    this.menue = null;
    this.kontextMenue = null;
    if (!b || !w || b.folgt) {
      this.ausgeloest.push({ befehl: id, weg, wirkung: false });
      this.meldung('rueck.folgt', { befehl: b ? this.t(b.titel) : id });
      this.rendern();
      return false;
    }
    const r = w(parameter, weg, quelle);
    this.ausgeloest.push({ befehl: id, weg, wirkung: r !== false });
    this.rendern();
    return r !== false;
  }

  /** Eintrag im Protokoll: nur Änderungen am Graphen (Schicht 1). */
  protokolliere(
    befehl: string,
    parameter: Record<string, unknown>,
    weg: Weg,
    quelle: Quelle,
  ): void {
    this.protokoll.push({ befehl, parameter, quelle, weg });
  }

  meldung(schluessel: string, werte?: Werte): void {
    this.rueckmeldung = { schluessel, werte };
  }

  /** Setzt den Wert eines Parameters (ein Verlaufseintrag, ein Protokolleintrag). */
  wertSetzen(
    id: string,
    name: string,
    groesse: Groesse,
    weg: Weg,
    quelle: Quelle = 'mensch',
  ): boolean {
    const vorher = this.befunde().length;
    const geaendert = this.aendern((dok) => {
      const e = finde(dok, id);
      if (e) e.params[name] = groesse;
    });
    this.vorschau = null;
    if (geaendert) {
      this.protokolliere('element.wert-setzen', { element: id, name, wert: groesse }, weg, quelle);
      this.meldung('rueck.wert-gesetzt', { name: this.name(id) });
      this.nachWertAenderung(id, vorher);
    }
    return geaendert;
  }

  /** Simulierte Neuberechnung (`&rechenzeit=`) und Befund-Panel öffnen, wenn ein Befund neu ist. */
  nachWertAenderung(id: string, befundeVorher: number): void {
    if (this.befunde().length > befundeVorher) {
      this.zonen.panel = true;
      this.meldung('rueck.befund', { name: this.name(id) });
    }
    if (this.rechenzeitMs > 0) {
      this.status.set(id, 'rechnet');
      setTimeout(() => {
        if (this.status.get(id) === 'rechnet') this.status.delete(id);
        this.rendern();
      }, this.rechenzeitMs);
    }
  }

  /** „Letzten gültigen Wert setzen“: aus dem Verlauf, sonst der Ausgangswert. */
  letzterGueltigerWert(b: Befund): number {
    for (const alt of [...this.verlauf().zurueck].reverse()) {
      const e = finde(alt, b.elementId);
      if (e && !befundeVon(alt).some((x) => x.elementId === b.elementId))
        return wert(e.params[b.parameter]);
    }
    return AUSGANGSWERTE[b.elementId]?.[b.parameter] ?? b.grenze;
  }

  rueckgaengig(weg: Weg, quelle: Quelle = 'mensch'): boolean {
    const v = this.verlauf();
    const frueher = v.zurueck.pop();
    this.protokolliere('bearbeiten.rueckgaengig', {}, weg, quelle);
    if (!frueher) return false;
    v.vor.push(kopie(this.dokument()));
    this.ersetzeDokument(frueher);
    this.auswahlBereinigen();
    this.meldung('rueck.rueckgaengig');
    return true;
  }

  wiederholen(weg: Weg, quelle: Quelle = 'mensch'): boolean {
    const v = this.verlauf();
    const spaeter = v.vor.pop();
    this.protokolliere('bearbeiten.wiederholen', {}, weg, quelle);
    if (!spaeter) return false;
    v.zurueck.push(kopie(this.dokument()));
    this.ersetzeDokument(spaeter);
    this.auswahlBereinigen();
    this.meldung('rueck.wiederholt');
    return true;
  }

  auswahlBereinigen(): void {
    this.auswahl = this.auswahl.filter((a) => this.find(a.element_id));
    if (this.aktiv && !this.find(this.aktiv)) this.aktiv = null;
  }

  wechsleDokument(id: string): void {
    if (!this.projekt.content.some((d) => d.id === id) || id === this.dok) return;
    this.dok = id;
    this.auswahl = [];
    this.aktiv = null;
    this.isoliert = null;
    this.hover = null;
    this.vorschau = null;
    this.einpassenNoetig = true;
    this.rendern();
  }

  /** Neue Elemente aus dem Kontextmenü, Menü, der Suche oder dem Chat. */
  neuesElement(typ: string): string {
    let id = '';
    this.aendern((dok) => {
      const name = typ === 'baugruppe' ? 'Baugruppe' : 'Teil';
      const zaehler = alleElemente(dok).filter((e) => e.type === typ).length + 1;
      id = neueId(dok, `${typ}-${zaehler}`);
      const neu: Element = {
        id,
        type: typ,
        params: typ === 'teil' ? { material: 'PLA', lage_x: { value: 0, unit: 'mm' } } : {},
        content: [],
        meta: { name: `${name} ${zaehler}` },
      };
      this.einfuegeStelle(dok).content.push(neu);
    });
    return id;
  }

  /** Neue Elemente landen im aktiven Element, sonst unter der Wurzel. */
  private einfuegeStelle(dok: Element): Element {
    return (this.aktiv ? finde(dok, this.aktiv) : undefined) ?? dok;
  }

  /** Darf `id` auf `zielId` abgelegt werden? (design.md, Ziehen & Ablegen) */
  ablegenPruefen(id: string, zielId: string): { erlaubt: boolean; grund?: string } {
    const dok = this.dokument();
    const e = this.find(id);
    const ziel = zielId === dok.id ? dok : this.find(zielId);
    if (!e || !ziel) return { erlaubt: false, grund: 'dnd.kein-ziel' };
    if (e.type !== 'teil' && e.type !== 'baugruppe')
      return { erlaubt: false, grund: 'dnd.nur-teile' };
    if (ziel.id === e.id || nachfahren(e).some((k) => k.id === ziel.id))
      return { erlaubt: false, grund: 'dnd.eigener-nachfahre' };
    if (ziel.type !== 'baugruppe') return { erlaubt: false, grund: 'dnd.kein-behaelter' };
    if (elternVon(dok, e.id)?.id === ziel.id) return { erlaubt: false, grund: 'dnd.schon-darin' };
    return { erlaubt: true };
  }

  fokusEigenschaften = false;
  offenesSchliessen: (() => boolean) | null = null;
  kontextOeffnen: ((x: number, y: number) => void) | null = null;
  dndAbbrechen: (() => boolean) | null = null;
  zeigerPos = { x: 0, y: 0 };
  feldBefund: { feld: string; schluessel: string } | null = null;
  /** Nach dem nächsten Zeichnen ganz einpassen (neues Dokument). */
  einpassenNoetig = true;

  /** Kante unter dem Zeiger (nur an Blättern, 8 px Treffer­zone), sonst null. */
  kanteBei(id: string, x: number, y: number): Adresse['teil'] | null {
    const e = this.find(id);
    const box = e ? this.huelle(id) : null;
    if (
      !e ||
      !box ||
      !this.szene ||
      e.content.length > 0 ||
      e.type === 'teil' ||
      e.type === 'baugruppe'
    )
      return null;
    let beste: { adresse: string; d: number } | null = null;
    for (const k of this.szene.kantenVon(id, box)) {
      const dx = k.bis.x - k.von.x;
      const dy = k.bis.y - k.von.y;
      const l2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((x - k.von.x) * dx + (y - k.von.y) * dy) / l2));
      const d = Math.hypot(x - (k.von.x + t * dx), y - (k.von.y + t * dy));
      if (d <= 8 && (!beste || d < beste.d)) beste = { adresse: k.adresse, d };
    }
    return beste ? { art: 'kante', adresse: beste.adresse } : null;
  }

  /** Übernimmt den Griff (Loslassen oder Enter): ein Verlaufseintrag, Zahl bleibt kurz sichtbar. */
  griffUebernehmen(): void {
    const g = this.griff;
    if (!g) return;
    const neu = g.eingabe !== '' ? Number(g.eingabe) : g.wert;
    g.aktiv = false;
    this.vorschau = null;
    g.wert = neu;
    g.eingabe = '';
    if (neu > 0 && neu !== g.start)
      this.wertSetzen(g.id, g.name, { value: neu, unit: 'mm' }, 'griff');
    g.sichtbarBis = performance.now() + 700;
    setTimeout(() => {
      this.griff = null;
      this.rendern();
    }, 700);
    this.rendern();
  }

  griffAbbrechen(): void {
    this.vorschau = null;
    this.griff = null;
    this.rendern();
  }

  suchTreffer(): Befehl[] {
    return sichtbareTreffer(this);
  }

  /** Vorschau einer Chat-Änderung: Körper der Elemente, die sich durch den Vorschlag ändern. */
  geisterKoerper(): Koerper[] {
    const v = this.chat.vorschlag;
    if (!v) return [];
    const probe = kopie(this.dokument());
    for (const b of v.befehle) {
      if (b.id !== 'element.wert-setzen') continue;
      const e = finde(probe, String(b.parameter.element));
      if (e) e.params[String(b.parameter.name)] = b.parameter.wert;
    }
    const geaendert = new Set(
      alleElemente(probe)
        .filter((e) => JSON.stringify(e.params) !== JSON.stringify(this.find(e.id)?.params))
        .map((e) => e.id),
    );
    return ergebnisVon(probe).koerper.filter((k) => geaendert.has(k.elementId));
  }

  /** Ist der Befehl jetzt sinnvoll? Unpassende Einträge sind im Menü grau und fehlen im Kontextmenü. */
  anwendbar(b: Befehl): boolean {
    const sel = this.gewaehlteElemente();
    const hat = (f: (e: Element) => boolean) => sel.some(f);
    switch (b.id) {
      case 'bearbeiten.rueckgaengig':
        return this.kannRueckgaengig();
      case 'bearbeiten.wiederholen':
        return this.kannWiederholen();
      case 'element.umbenennen':
        return sel.length === 1;
      case 'element.duplizieren':
      case 'element.wert-setzen':
      case 'auswahl.duplizieren':
        return sel.length > 0;
      case 'element.verwerfen':
      case 'auswahl.verwerfen':
        return hat((e) => !istVerworfen(e));
      case 'element.zurueckholen':
        return hat((e) => istVerworfen(e));
      case 'element.ausblenden':
      case 'auswahl.ausblenden':
        return hat((e) => !this.istAusgeblendet(e.id));
      case 'element.einblenden':
        return hat((e) => this.istAusgeblendet(e.id));
      case 'element.pausieren':
        return hat((e) => e.meta.pausiert !== true);
      case 'element.fortsetzen':
        return hat((e) => e.meta.pausiert === true);
      case 'element.aktivieren':
        return sel.length === 1 && sel[0]?.id !== this.aktiv;
      case 'element.verlassen':
        return this.aktiv !== null;
      case 'element.umhaengen':
        return sel.length === 1 && (sel[0]?.type === 'teil' || sel[0]?.type === 'baugruppe');
      case 'ansicht.alles-einblenden':
        return this.ausgeblendet.size > 0 || this.isoliert !== null;
      case 'ansicht.anwenden':
        return sel.length === 1 && sel[0]?.type === 'view';
      case 'auswahl.aufheben':
        return sel.length > 0;
      default:
        return true;
    }
  }

  /** F6: Fokus auf die nächste sichtbare Zone. */
  naechsteZone(rueckwaerts = false): void {
    const reihenfolge = [
      'menueleiste',
      'taskleiste',
      'struktur',
      'modell',
      'eigenschaften',
      'chat',
      'panel',
      'rueckmeldung',
    ];
    const sichtbar = reihenfolge.filter((z) => {
      const e = document.querySelector<HTMLElement>(`[data-zone="${z}"]`);
      return (
        !!e && e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden'
      );
    });
    if (!sichtbar.length) return;
    const jetzt = this.fokusZone ? sichtbar.indexOf(this.fokusZone) : -1;
    const schritt = rueckwaerts ? -1 : 1;
    const ziel = sichtbar[(jetzt + schritt + sichtbar.length) % sichtbar.length] as string;
    this.fokusZone = ziel;
    document.querySelector<HTMLElement>(`[data-zone="${ziel}"]`)?.focus();
    this.tastenfokus = true;
  }

  huelleAlle(): { min: [number, number, number]; max: [number, number, number] } | null {
    const sichtbar = this.versteckteIds();
    const k = ergebnisVon(this.angezeigtesDokument()).koerper.filter(
      (x) => !sichtbar.has(x.elementId) && x.art !== 'skizze',
    );
    return boxVon(k);
  }

  huelleAuswahl(): { min: [number, number, number]; max: [number, number, number] } | null {
    const koerper = ergebnisVon(this.angezeigtesDokument()).koerper;
    const boxen = this.auswahlIds()
      .map((i) => (this.find(i) ? huelleVon(this.find(i) as Element, koerper) : null))
      .filter((b): b is NonNullable<typeof b> => !!b);
    if (!boxen.length) return null;
    return boxVonBoxen(boxen);
  }

  setzeKamera(k: {
    azimut: number;
    hoehe: number;
    abstand: number;
    ziel: { x: number; y: number; z: number };
  }): void {
    this.szene?.nach(
      {
        azimut: k.azimut,
        hoehe: k.hoehe,
        abstand: k.abstand,
        ziel: new Vector3(k.ziel.x, k.ziel.y, k.ziel.z),
      },
      0,
    );
  }

  elternId(id: string): string | null {
    return elternVon(this.dokument(), id)?.id ?? null;
  }
}

type Box = { min: [number, number, number]; max: [number, number, number] };

function boxVonBoxen(boxen: Box[]): Box {
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (const b of boxen)
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i] as number, b.min[i] as number);
      max[i] = Math.max(max[i] as number, b.max[i] as number);
    }
  return { min, max };
}

function boxVon(k: Koerper[]): Box | null {
  return k.length ? boxVonBoxen(k.map((x) => ({ min: x.min, max: x.max }))) : null;
}
