// Werkzeuge für die KI aus dem Befehlsregister (ap-52, design.md Abschnitt 2; ADR-045, ADR-037, Regel MCP).
// Ein Befehl mit `"ki": true` wird ein Werkzeug im Format von MCP `tools/list`; kein Werkzeug ohne Befehl.
// Ausgeführt wird jeder Aufruf mit derselben Wirkung wie beim Menschen, aber zuerst nur in einem Entwurf.
import type { App } from '../app';
import {
  AUSGAENGE,
  graphSchluessel,
  drahtGraph,
  kernRechnen,
  leseGroesse,
  type Ausgang,
  type Ergebnis,
  type Groesse,
} from '../drahtmodell/draht';
import de from '../i18n/de.json';
import { alleElemente, finde, istVerworfen, type Element } from '../modell/element';
import type { Befehl } from '../modell/register';

export interface Werkzeug {
  name: string;
  befehl: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

interface ParamDef {
  dimension?: 'length' | 'angle';
  einheit?: string;
  typ?: 'referenz' | 'element' | 'text';
  ausgang?: string;
  pflicht?: boolean;
}

export const LAENGE = '^[+-]?\\d+(?:[.,]\\d+)?\\s?(?:mm|cm|m)$';
export const WINKEL = '^[+-]?\\d+(?:[.,]\\d+)?\\s?(?:deg|°|rad)$';
const BEZUG = '^[A-Za-z0-9_-]+(?:\\.[a-z]+)?$';

export const werkzeugName = (id: string): string => id.replace(/[.-]/g, '_');

/** Beschreibung aus dem Übersetzungsschlüssel `ki.werkzeug.<id>` (immer Deutsch, ein Satz und ein Beispiel). */
function beschreibung(id: string): string {
  let knoten: unknown = (de as unknown as { ki: { werkzeug: unknown } }).ki.werkzeug;
  for (const teil of id.split('.'))
    knoten = (knoten as Record<string, unknown> | undefined)?.[teil];
  return typeof knoten === 'string' ? knoten : id;
}

function eigenschaft(name: string, p: ParamDef): Record<string, unknown> {
  if (p.dimension === 'length')
    return { type: 'string', pattern: LAENGE, description: `Länge mit Einheit, z. B. "40 mm"` };
  if (p.dimension === 'angle')
    return { type: 'string', pattern: WINKEL, description: `Winkel mit Einheit, z. B. "30 deg"` };
  if (p.typ === 'referenz')
    return {
      type: 'string',
      pattern: BEZUG,
      description: `Bezug <Element-ID>.${p.ausgang ?? 'point'} aus der Modellübersicht, z. B. "P1.${p.ausgang ?? 'point'}"`,
    };
  if (p.typ === 'element')
    return { type: 'string', pattern: BEZUG, description: 'Element-ID aus der Modellübersicht' };
  return { type: 'string', description: name === 'name' ? 'Anzeigename (optional)' : name };
}

const params = (b: Befehl) => b.parameter as Record<string, ParamDef>;

/** Die Werkzeugliste, genau so, wie ein Anbieter sie bekommt. */
export function werkzeuge(register: Befehl[]): Werkzeug[] {
  return register
    .filter((b) => b.ki === true && b.familie !== 'Freigabe')
    .map((b) => {
      const p = params(b);
      const properties = Object.fromEntries(
        Object.entries(p).map(([n, d]) => [n, eigenschaft(n, d)]),
      );
      const required = Object.entries(p)
        .filter(([, d]) => d.pflicht)
        .map(([n]) => n);
      return {
        name: werkzeugName(b.id),
        befehl: b.id,
        description: beschreibung(b.id),
        inputSchema: {
          type: 'object',
          properties,
          required,
          additionalProperties: false,
        },
      };
    });
}

// --- Ausführen im Entwurf ------------------------------------------------------------------------------

export interface Fehler {
  ok: false;
  code:
    | 'unknown_tool'
    | 'invalid_arguments'
    | 'unit'
    | 'input_missing'
    | 'input_type'
    | 'degenerate'
    | string;
  message: string;
  element_id: string | null;
  hint: string;
}

export interface Erfolg {
  ok: true;
  element: string;
  name: string;
  typ: string;
  ausgaenge?: Record<string, Record<string, string | string[]>>;
  verworfen?: boolean;
  ausgeblendet?: boolean;
}

export type Werkzeugergebnis = Erfolg | Fehler;

/** Stand eines Entwurfs: Graph des Dokuments, im Entwurf ausgeblendete IDs, Ergebnis des Workers. */
export interface Entwurf {
  dok: Element;
  ausgeblendet: string[];
  ergebnis: Ergebnis | null;
}

/** Ein erfolgreich im Entwurf ausgeführter Aufruf mit den gelesenen Parametern (für das Übernehmen). */
export interface Ausfuehrung {
  befehl: string;
  parameter: Record<string, unknown>;
  /** Element, das der Aufruf angelegt (oder bearbeitet) hat. */
  element: string;
  angelegt: boolean;
}

const fehler = (
  code: Fehler['code'],
  message: string,
  hint: string,
  element_id: string | null = null,
): Fehler => ({ ok: false, code, message, element_id, hint });

const zahl = (v: number): string => {
  const r = Math.round(v * 1e6) / 1e6;
  return String(Object.is(r, -0) ? 0 : r);
};

function groessen(x: unknown, einheit: string): string[] | null {
  if (!Array.isArray(x) || x.length !== 3) return null;
  return x.map((g) => {
    const v = Number((g as Groesse).value);
    return einheit ? `${zahl(v)} ${einheit}` : zahl(v);
  });
}

/** Kompakte Lage eines Ausgangs als Größen-Strings (≤ 600 Zeichen je Ergebnis, Regel MCP). */
function kompakt(o: Ausgang): Record<string, string | string[]> {
  const aus: Record<string, string | string[]> = {};
  const felder: [string, string][] = [
    ['position', 'mm'],
    ['origin', 'mm'],
    ['start', 'mm'],
    ['end', 'mm'],
    ['direction', ''],
    ['normal', ''],
    ['x', ''],
    ['y', ''],
    ['z', ''],
  ];
  for (const [f, einheit] of felder) {
    const g = groessen(o[f], einheit);
    if (g) aus[f] = g;
  }
  const l = o.length as Groesse | undefined;
  if (l && typeof l.value === 'number') aus.length = `${zahl(l.value)} mm`;
  return aus;
}

const HAUPT: Record<string, string> = {
  frame: 'frame',
  point: 'point',
  line: 'line',
  ray: 'ray',
  segment: 'segment',
  axis: 'line',
  plane: 'plane',
};

function erfolg(e: Element, ergebnis: Ergebnis | null): Erfolg {
  const r = ergebnis?.results.find((x) => x.id === e.id);
  const haupt = HAUPT[e.type] ?? e.type;
  const o = r?.outputs[haupt];
  const aus: Erfolg = { ok: true, element: e.id, name: e.meta.name, typ: e.type };
  if (o) aus.ausgaenge = { [haupt]: kompakt(o) };
  return aus;
}

/** Elemente des Entwurfs nach ID (auch Kinder). */
const elemente = (dok: Element) => new Map(alleElemente(dok).map((e) => [e.id, e]));

/** Prüft einen Bezug `<id>.<ausgang>` gegen den Entwurf; liefert den vollständigen Bezug oder einen Fehler. */
function bezugPruefen(dok: Element, name: string, wert: string, erwartet: string): string | Fehler {
  const [id, ausgang] = wert.split('.') as [string, string | undefined];
  const e = elemente(dok).get(id);
  if (!e || istVerworfen(e))
    return fehler(
      'input_missing',
      `${name}: Element ${id} gibt es nicht.`,
      'Nimm eine Element-ID aus der Modellübersicht oder aus einem früheren Werkzeugergebnis.',
      id,
    );
  const aus = ausgang ?? (erwartet in (AUSGAENGE[e.type] ?? {}) ? erwartet : HAUPT[e.type]);
  const typ = AUSGAENGE[e.type]?.[aus ?? ''];
  if (!typ)
    return fehler(
      'input_type',
      `${name}: ${id} (${e.type}) hat keinen Ausgang ${aus}.`,
      `Ausgänge von ${id}: ${Object.keys(AUSGAENGE[e.type] ?? {}).join(', ')}.`,
      id,
    );
  if (typ !== erwartet)
    return fehler(
      'input_type',
      `${name}: ${id}.${aus} ist ein ${typ}, verlangt ist ${erwartet}.`,
      `Nimm einen Ausgang vom Typ ${erwartet}, z. B. "<ID>.${erwartet}".`,
      id,
    );
  return `${id}.${aus}`;
}

/** Liest die Argumente gegen die Parameter des Befehls (Wert-Parser mit Einheit, ADR-057). */
export function argumenteLesen(
  b: Befehl,
  argumente: unknown,
  dok: Element,
): Record<string, unknown> | Fehler {
  const p = params(b);
  const name = werkzeugName(b.id);
  if (!argumente || typeof argumente !== 'object' || Array.isArray(argumente))
    return fehler(
      'invalid_arguments',
      `${name}: Argumente müssen ein JSON-Objekt sein.`,
      `Erlaubt: ${Object.keys(p).join(', ')}.`,
    );
  const args = argumente as Record<string, unknown>;
  const fremd = Object.keys(args).filter((k) => !(k in p));
  if (fremd.length)
    return fehler(
      'invalid_arguments',
      `${name}: unbekannte Argumente ${fremd.join(', ')}.`,
      `Erlaubt: ${Object.keys(p).join(', ')}.`,
    );
  const fehlt = Object.entries(p)
    .filter(([n, d]) => d.pflicht && (args[n] === undefined || args[n] === ''))
    .map(([n]) => n);
  if (fehlt.length)
    return fehler(
      'invalid_arguments',
      `${name}: Pflichtargument ${fehlt.join(', ')} fehlt.`,
      `Gib ${fehlt.join(', ')} als Bezug aus der Modellübersicht an.`,
    );
  const aus: Record<string, unknown> = {};
  for (const [n, d] of Object.entries(p)) {
    const v = args[n];
    if (d.dimension) {
      const dim = d.dimension;
      const beispiel = dim === 'length' ? '"40 mm"' : '"30 deg"';
      if (v === undefined) {
        aus[n] = { value: 0, unit: d.einheit ?? (dim === 'length' ? 'mm' : 'deg') };
        continue;
      }
      const text = typeof v === 'number' ? String(v) : v;
      if (typeof text !== 'string')
        return fehler(
          'invalid_arguments',
          `${name}: ${n} muss ein Text sein.`,
          `z. B. ${beispiel}`,
        );
      const roh = text.trim();
      const muster = new RegExp(dim === 'length' ? LAENGE : WINKEL, 'i');
      const g = muster.test(roh) ? leseGroesse(roh, dim) : null;
      if (!g)
        return fehler(
          'unit',
          `${name}: ${n} = "${roh}" ist keine ${dim === 'length' ? 'Länge' : 'Winkel'} mit Einheit.`,
          `Schreibe die Zahl mit Einheit, z. B. ${beispiel}.`,
        );
      aus[n] = g;
      continue;
    }
    if (v === undefined) continue;
    if (typeof v !== 'string')
      return fehler('invalid_arguments', `${name}: ${n} muss ein Text sein.`, 'z. B. "P1.point"');
    if (d.typ === 'referenz') {
      const r = bezugPruefen(dok, n, v.trim(), d.ausgang ?? 'point');
      if (typeof r !== 'string') return r;
      aus[n] = r;
    } else if (d.typ === 'element') {
      const id = v.trim().split('.')[0] as string;
      const e = elemente(dok).get(id);
      if (!e)
        return fehler(
          'input_missing',
          `${name}: Element ${id} gibt es nicht.`,
          'Nimm eine Element-ID aus der Modellübersicht.',
          id,
        );
      aus[n] = id;
    } else aus[n] = v;
  }
  if (typeof aus.a === 'string' && aus.a === aus.b)
    return fehler(
      'degenerate',
      `${name}: a und b sind derselbe Punkt.`,
      'Eine Linie braucht zwei verschiedene Punkte; lege bei Bedarf zuerst einen zweiten Punkt an.',
      String(aus.a).split('.')[0] ?? null,
    );
  return aus;
}

const istFehler = (x: unknown): x is Fehler =>
  !!x && typeof x === 'object' && (x as { ok?: unknown }).ok === false && 'code' in x;

const wurzelIds = (dok: Element) => new Set(drahtGraph(dok).map((e) => e.id));

/**
 * Führt einen Werkzeugaufruf im Entwurf aus: dieselbe Wirkung wie der Befehl, danach rechnet der Worker den
 * Entwurf. Ein Fehler ändert den Entwurf nicht (ADR-050).
 */
export async function imEntwurfAusfuehren(
  app: App,
  entwurf: Entwurf,
  werkzeug: string,
  argumente: unknown,
): Promise<{ ergebnis: Werkzeugergebnis; entwurf: Entwurf; ausfuehrung?: Ausfuehrung }> {
  const b = app.register.find((x) => x.ki === true && werkzeugName(x.id) === werkzeug);
  const namen = werkzeuge(app.register).map((w) => w.name);
  if (!b)
    return {
      entwurf,
      ergebnis: fehler(
        'unknown_tool',
        `Werkzeug ${werkzeug} gibt es nicht.`,
        `Verfügbar: ${namen.join(', ')}.`,
      ),
    };
  const gelesen = argumenteLesen(b, argumente, entwurf.dok);
  if (istFehler(gelesen)) return { entwurf, ergebnis: gelesen };
  const par = gelesen;
  const vorher = wurzelIds(entwurf.dok);
  const lauf = app.imEntwurf(entwurf.dok, () => app.ausfuehren(b.id, par, 'chat', 'ki'));
  if (!lauf.wert)
    return {
      entwurf,
      ergebnis: fehler(
        'invalid_arguments',
        `${werkzeug}: der Befehl hatte keine Wirkung.`,
        'Prüfe die Argumente gegen die Beschreibung des Werkzeugs.',
      ),
    };
  const neu = [...wurzelIds(lauf.dok)].filter((i) => !vorher.has(i));
  const ziel =
    neu[0] ?? (typeof par.element === 'string' ? par.element : (undefined as string | undefined));
  const dok = lauf.dok;
  const ausgeblendet = [...new Set([...entwurf.ausgeblendet, ...lauf.ausgeblendet])];
  let ergebnis = entwurf.ergebnis;
  if (neu.length) {
    ergebnis = await kernRechnen(graphSchluessel(drahtGraph(dok)));
    if (!ergebnis)
      return {
        entwurf,
        ergebnis: fehler(
          'kernel_unavailable',
          'Der Geometriekern ist gerade nicht erreichbar.',
          'Versuche es gleich noch einmal.',
        ),
      };
    const r = ergebnis.results.find((x) => x.id === neu[0]);
    if (r && r.state === 'fehlerhaft') {
      const bf = r.befunde[0];
      return {
        entwurf,
        ergebnis: fehler(
          bf?.code ?? 'degenerate',
          `${werkzeug}: ${bf?.text ?? bf?.code ?? 'Befund des Geometriekerns'}.`,
          'Das Element ließ sich so nicht berechnen; ändere die Argumente (z. B. verschiedene Punkte).',
          neu[0] ?? null,
        ),
      };
    }
  }
  const e = ziel ? finde(dok, ziel) : undefined;
  if (!e)
    return {
      entwurf,
      ergebnis: fehler('invalid_arguments', `${werkzeug}: kein Ergebnis.`, 'Prüfe die Argumente.'),
    };
  const ok = erfolg(e, ergebnis);
  if (b.id === 'element.verwerfen') {
    delete ok.ausgaenge;
    ok.verworfen = true;
  }
  if (b.id === 'element.ausblenden') {
    delete ok.ausgaenge;
    ok.ausgeblendet = true;
  }
  return {
    entwurf: { dok, ausgeblendet, ergebnis },
    ergebnis: ok,
    ausfuehrung: { befehl: b.id, parameter: par, element: e.id, angelegt: neu.length > 0 },
  };
}
