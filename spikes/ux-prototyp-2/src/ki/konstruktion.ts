// KI konstruiert über das Befehlsregister (ap-52, design.md Abschnitte 1 und 3; ADR-021, ADR-037, ADR-045).
// Schleife im Browser: Satz → Anbieter in der Brücke (`POST /ki/schritt`) → Werkzeugaufrufe im Entwurf →
// Ergebnisse zurück an den Anbieter → … → Änderungssatz als Entscheidungskarte mit Geister-Vorschau.
// Übernehmen führt dieselben Befehle als einen Rückgängig-Schritt aus; Verwerfen ändert nichts.
import type { App } from '../app';
import {
  drahtGraph,
  graphSchluessel,
  lageVon,
  type Geist,
  type Ergebnis,
  type Groesse,
} from '../drahtmodell/draht';
import type { V3 } from '../geometrie/teil';
import { alleElemente, istVerworfen, kopie, type Element } from '../modell/element';
import {
  imEntwurfAusfuehren,
  werkzeuge,
  type Ausfuehrung,
  type Entwurf,
  type Werkzeugergebnis,
} from './werkzeuge';

export const MAX_AUFRUFE = 20;
const MAX_UEBERSICHT = 6_000;

/** Nachricht an den Anbieter (design.md Abschnitt 1). */
export interface KiNachricht {
  rolle: 'system' | 'mensch' | 'ki' | 'werkzeug';
  text?: string;
  aufrufe?: KiAufruf[];
  aufruf_id?: string;
  ergebnis?: Werkzeugergebnis;
}

export interface KiAufruf {
  id: string;
  werkzeug: string;
  argumente: unknown;
}

export interface AnbieterInfo {
  id: string;
  verfuegbar: boolean;
  ziel: string;
  modell?: string;
  befund?: unknown;
}

/** Änderungssatz mit Zustand der Karte (design.md Abschnitt 3). */
export interface Karte {
  nr: number;
  titel: string;
  begruendung: string;
  anbieter: string;
  aufrufe: { werkzeug: string; argumente: unknown; ergebnis: Werkzeugergebnis }[];
  neu: string[];
  verworfen: string[];
  ausgeblendet: string[];
  befunde: { code: string; message: string; element_id: string | null }[];
  offen: boolean;
  status: 'offen' | 'uebernommen' | 'verworfen';
  namen: Record<string, string>;
  /** Intern: erfolgreiche Aufrufe in Reihenfolge, Geister und Ergebnis des Entwurfs. */
  ausfuehrungen: Ausfuehrung[];
  geister: Geist[];
}

export interface KiZustand {
  /** Brücke mit KI-Anbietern vorhanden (sonst bleibt die Simulation aus `src/ki.ts`). */
  bruecke: boolean;
  aktiv: string;
  anbieter: AnbieterInfo[];
  karten: Karte[];
  beschaeftigt: boolean;
  /** Senden bis Karte oder Antwort (ms), zuletzt gemessen. */
  bereitMs: number | null;
}

export const neuerKiZustand = (): KiZustand => ({
  bruecke: false,
  aktiv: 'regel',
  anbieter: [],
  karten: [],
  beschaeftigt: false,
  bereitMs: null,
});

// --- Anbieter ------------------------------------------------------------------------------------------

async function json<T>(pfad: string, body?: unknown): Promise<T> {
  const r = await fetch(pfad, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });
  return (await r.json()) as T;
}

/** Fragt die Brücke nach den Anbietern (nur im Drahtmodell mit Brücke). */
export async function kiVerbinden(app: App): Promise<void> {
  try {
    const s = await json<{ bruecke?: boolean; ki?: boolean }>('kernel-status.json');
    if (!s.ki) return;
    const a = await json<{ aktiv: string; anbieter: AnbieterInfo[] }>('ki/anbieter');
    app.ki.bruecke = true;
    app.ki.aktiv = a.aktiv;
    app.ki.anbieter = a.anbieter;
  } catch {
    /* ohne Brücke bleibt die Simulation */
  }
  app.rendern();
}

/** Text im Kopf des Chats: aktiver Anbieter und wohin die Daten gehen (ADR-037). */
export function kopfText(app: App): string {
  const a = app.ki.anbieter.find((x) => x.id === app.ki.aktiv);
  if (!a || a.id === 'regel') return app.t('ki.kopf.regel');
  if (a.ziel === 'lokal') return app.t('ki.kopf.lokal', { modell: a.modell ?? a.id });
  return app.t('ki.kopf.extern', { modell: a.modell ?? a.id, host: a.ziel });
}

export async function anbieterWaehlen(app: App, id: string): Promise<void> {
  app.ki.beschaeftigt = true;
  app.rendern();
  try {
    const a = await json<{ aktiv: string; anbieter: AnbieterInfo[] }>('ki/anbieter', { id });
    app.ki.aktiv = a.aktiv;
    app.ki.anbieter = a.anbieter;
    if (a.aktiv !== id) {
      const info = a.anbieter.find((x) => x.id === id);
      app.chat.nachrichten.push({
        von: 'ki',
        text: app.t('ki.antwort.nicht-verfuegbar', { befund: befundText(info?.befund) }),
      });
    }
  } catch {
    /* Brücke weg: Anbieter bleibt */
  } finally {
    app.ki.beschaeftigt = false;
    app.rendern();
  }
}

const befundText = (b: unknown): string =>
  typeof b === 'string'
    ? b
    : b && typeof b === 'object'
      ? String((b as { code?: string }).code)
      : '';

// --- Modellübersicht -----------------------------------------------------------------------------------

function groesseText(g: Groesse | undefined): string {
  if (!g) return '';
  return `${g.value} ${g.unit}`;
}

/** Eine Zeile je Element: `<id> <typ> "<id>" (<Name>) <Parameter mit Einheit> <Bezüge> [ausgeblendet] [verworfen]`. */
export function uebersicht(app: App): string {
  const zeilen: string[] = [];
  const graph = drahtGraph(app.dokument());
  const zeile = (e: Element) => {
    const teile = [`${e.id} ${e.type} "${e.id}" (${e.meta.name})`];
    for (const [n, g] of Object.entries(e.params ?? {}))
      teile.push(`${n}=${groesseText(g as Groesse)}`);
    for (const [n, v] of Object.entries(e.inputs ?? {})) teile.push(`${n}=${String(v)}`);
    if (app.istAusgeblendet(e.id)) teile.push('[ausgeblendet]');
    if (istVerworfen(e)) teile.push('[verworfen]');
    return teile.join(' ');
  };
  for (const e of graph) zeilen.push(zeile(e));
  let liste = zeilen;
  const kopf = app.t('ki.uebersicht.kopf');
  if (liste.join('\n').length > MAX_UEBERSICHT) {
    // Nur Auswahl, Koordinatensysteme und die zuletzt angelegten (design.md Abschnitt 3)
    const sel = new Set(app.auswahlIds());
    const wichtig = graph.filter((e) => sel.has(e.id) || e.type === 'frame').map(zeile);
    liste = [...wichtig];
    for (const z of [...zeilen].reverse()) {
      if ([...liste, z].join('\n').length > MAX_UEBERSICHT) break;
      if (!liste.includes(z)) liste.push(z);
    }
  }
  const auswahl = app.auswahlIds();
  return [
    kopf,
    ...(liste.length ? liste : [app.t('ki.uebersicht.leer')]),
    `zu: ${auswahl.length ? auswahl.join(', ') : '–'}`,
  ].join('\n');
}

// --- Senden --------------------------------------------------------------------------------------------

interface Schritt {
  anbieter: string;
  text?: string;
  aufrufe: KiAufruf[];
  erkannt?: boolean;
  fehler?: string;
}

const geistPunkte = (art: string, lage: V3 | Record<string, V3>): V3[] => {
  if (Array.isArray(lage)) return [lage];
  if (art === 'segment' && lage.start && lage.end) return [lage.start, lage.end];
  if ((art === 'line' || art === 'ray') && lage.origin && lage.direction) {
    const o = lage.origin;
    const d = lage.direction;
    const p = (s: number): V3 => [o[0] + d[0] * s, o[1] + d[1] * s, o[2] + d[2] * s];
    return [art === 'ray' ? o : p(-10_000), p(10_000)];
  }
  if (lage.origin) return [lage.origin];
  return [];
};

function geisterVon(dok: Element, ergebnis: Ergebnis | null, neu: string[]): Geist[] {
  const aus: Geist[] = [];
  const nachId = new Map(alleElemente(dok).map((e) => [e.id, e]));
  for (const id of neu) {
    const e = nachId.get(id);
    const r = ergebnis?.results.find((x) => x.id === id);
    if (!e || !r || r.state !== 'aktuell') continue;
    const haupt = { frame: 'frame' }[e.type] ?? e.type;
    const o = r.outputs[haupt];
    const lage = e.type === 'frame' ? lageVon(r.outputs.frame) : lageVon(o);
    if (!lage) continue;
    const l = e.type === 'frame' && !Array.isArray(lage) ? (lage.origin ?? [0, 0, 0]) : lage;
    aus.push({ element: id, art: e.type, lage_mm: l, punkte: geistPunkte(e.type, l) });
  }
  return aus;
}

/** Geister aller offenen Karten ins Modell (ap-41b-Geister-Zustand). */
export function geisterAktualisieren(app: App): void {
  app.draht.geister = app.ki.karten.filter((k) => k.offen).flatMap((k) => k.geister);
}

function antwort(app: App, text: string): void {
  app.chat.nachrichten.push({ von: 'ki', text });
}

/** Satz an den aktiven Anbieter; Schleife bis keine Aufrufe mehr, 20 Aufrufe oder Zeitlimit. */
export async function satzSenden(app: App, satz: string, rueckfall: () => boolean): Promise<void> {
  const t0 = performance.now();
  app.ki.beschaeftigt = true;
  app.rendern();
  const nachrichten: KiNachricht[] = [
    { rolle: 'system', text: uebersicht(app) },
    { rolle: 'mensch', text: satz },
  ];
  const liste = werkzeuge(app.register);
  let entwurf: Entwurf = {
    dok: kopie(app.dokument()),
    ausgeblendet: [],
    ergebnis: app.draht.ergebnis,
  };
  const aufrufe: Karte['aufrufe'] = [];
  const ausfuehrungen: Ausfuehrung[] = [];
  let anbieter = app.ki.aktiv;
  let schluss = '';
  let fehlerText = '';
  let erkannt = true;
  try {
    while (aufrufe.length < MAX_AUFRUFE) {
      let s: Schritt;
      try {
        s = await json<Schritt>('ki/schritt', { nachrichten, werkzeuge: liste });
      } catch {
        s = { anbieter, aufrufe: [], fehler: 'bruecke' };
      }
      anbieter = s.anbieter ?? anbieter;
      if (s.fehler) {
        fehlerText =
          s.fehler === 'zeitlimit'
            ? app.t('ki.antwort.zeitlimit')
            : app.t('ki.antwort.fehler', { fehler: s.fehler });
        break;
      }
      if (!s.aufrufe?.length) {
        schluss = s.text ?? '';
        erkannt = s.erkannt !== false;
        break;
      }
      const runde = s.aufrufe.slice(0, MAX_AUFRUFE - aufrufe.length);
      nachrichten.push({ rolle: 'ki', text: s.text, aufrufe: runde });
      for (const a of runde) {
        const r = await imEntwurfAusfuehren(app, entwurf, a.werkzeug, a.argumente);
        entwurf = r.entwurf;
        if (r.ausfuehrung) ausfuehrungen.push(r.ausfuehrung);
        aufrufe.push({ werkzeug: a.werkzeug, argumente: a.argumente, ergebnis: r.ergebnis });
        nachrichten.push({ rolle: 'werkzeug', aufruf_id: a.id, ergebnis: r.ergebnis });
      }
      if (aufrufe.length >= MAX_AUFRUFE) schluss = app.t('ki.antwort.grenze');
    }
  } finally {
    app.ki.beschaeftigt = false;
  }

  if (!ausfuehrungen.length) {
    if (fehlerText) antwort(app, fehlerText);
    else if (!erkannt && rueckfall()) {
      /* die bisherige Simulation hat den Satz verstanden */
    } else if (!erkannt || !schluss) antwort(app, app.t('ki.antwort.unklar'));
    else {
      const fehlerListe = aufrufe
        .map((a) => a.ergebnis)
        .filter((e): e is Extract<Werkzeugergebnis, { ok: false }> => !e.ok)
        .map((e) => e.message);
      antwort(app, [schluss, ...fehlerListe].filter(Boolean).join(' '));
    }
    app.ki.bereitMs = Math.round(performance.now() - t0);
    app.rendern();
    return;
  }

  const angelegt = ausfuehrungen.filter((a) => a.angelegt).map((a) => a.element);
  const verworfen = ausfuehrungen
    .filter((a) => a.befehl === 'element.verwerfen')
    .map((a) => a.element);
  const namen = Object.fromEntries(
    alleElemente(entwurf.dok)
      .filter((e) => [...angelegt, ...verworfen, ...entwurf.ausgeblendet].includes(e.id))
      .map((e) => [e.id, e.meta.name]),
  );
  if (entwurf.ergebnis)
    app.draht.vormerken(graphSchluessel(drahtGraph(entwurf.dok)), entwurf.ergebnis);
  const karte: Karte = {
    nr: app.ki.karten.length + 1,
    titel: satz.length > 90 ? `${satz.slice(0, 88)} …` : satz,
    begruendung: schluss || fehlerText || app.t('ki.antwort.vorschlag'),
    anbieter,
    aufrufe,
    neu: angelegt,
    verworfen,
    ausgeblendet: entwurf.ausgeblendet,
    befunde: aufrufe
      .map((a) => a.ergebnis)
      .filter((e): e is Extract<Werkzeugergebnis, { ok: false }> => !e.ok)
      .map((e) => ({ code: e.code, message: e.message, element_id: e.element_id })),
    offen: true,
    status: 'offen',
    namen,
    ausfuehrungen,
    geister: geisterVon(entwurf.dok, entwurf.ergebnis, angelegt),
  };
  app.ki.karten.push(karte);
  geisterAktualisieren(app);
  app.chat.nachrichten.push({
    von: 'ki',
    text: fehlerText || app.t('ki.antwort.vorschlag'),
    karte: karte.nr,
  });
  app.ki.bereitMs = Math.round(performance.now() - t0);
  app.rendern();
}

// --- Übernehmen und Verwerfen --------------------------------------------------------------------------

export function offeneKarte(app: App, nr?: unknown): Karte | undefined {
  const offen = app.ki.karten.filter((k) => k.offen);
  if (typeof nr === 'number') return offen.find((k) => k.nr === nr);
  return offen[offen.length - 1];
}

/** Führt die erfolgreichen Aufrufe mit denselben Befehlen aus, als einen Rückgängig-Schritt. */
export function uebernehmen(app: App, karte: Karte): void {
  const zuordnung = new Map<string, string>();
  const ersetze = (v: unknown): unknown => {
    if (typeof v !== 'string') return v;
    const [id, rest] = v.split('.') as [string, string | undefined];
    const neu = zuordnung.get(id);
    return neu ? (rest ? `${neu}.${rest}` : neu) : v;
  };
  const ids = () => new Set(drahtGraph(app.dokument()).map((e) => e.id));
  const befunde: string[] = [];
  app.kiAnbieter = karte.anbieter;
  try {
    app.einSchritt(() => {
      for (const a of karte.ausfuehrungen) {
        const par = Object.fromEntries(
          Object.entries(a.parameter).map(([k, v]) => [k, ersetze(v)]),
        );
        const vorher = ids();
        const ok = app.ausfuehren(a.befehl, par, 'chat', 'ki');
        if (!ok) befunde.push(a.element);
        if (a.angelegt) {
          const neu = [...ids()].find((i) => !vorher.has(i));
          if (neu) zuordnung.set(a.element, neu);
        }
      }
    });
  } finally {
    app.kiAnbieter = null;
  }
  karte.offen = false;
  karte.status = 'uebernommen';
  geisterAktualisieren(app);
  antwort(
    app,
    befunde.length
      ? app.t('ki.antwort.teilweise', { n: befunde.length })
      : app.t('chat.antwort.erledigt'),
  );
}

export function verwerfen(app: App, karte: Karte): void {
  karte.offen = false;
  karte.status = 'verworfen';
  geisterAktualisieren(app);
  antwort(app, app.t('chat.antwort.verworfen'));
}
