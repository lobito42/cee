// Satzerkennung (Anbieter `regel`, ap-52, design.md Abschnitt 4): deterministischer Parser für einfache deutsche
// Wireframe-Sätze, ohne Netz, ohne Modell, ohne Zufall. Er arbeitet wie ein Modell über die Nachrichten: Aus dem
// letzten Satz entsteht ein Plan; je Schritt liefert er den nächsten Werkzeugaufruf und setzt Element-IDs aus den
// vorigen Werkzeugergebnissen ein. Einheiten bleiben Text („40 mm“); umgerechnet wird nur im Wert-Parser (ADR-057).
import type { Anbieter, Aufruf, Nachricht, Schritt } from './typen';

/** Element der Modellübersicht (Zeile `<id> <typ> "<id>" (<Name>) …`). */
export interface Bekannt {
  id: string;
  typ: string;
  name: string;
}

/** Argument eines geplanten Aufrufs: fester Text oder Ausgang eines früheren Schritts des Plans. */
type Wert = string | { schritt: number; ausgang: string };

interface Geplant {
  werkzeug: string;
  argumente: Record<string, Wert>;
}

export type Plan = { schritte: Geplant[] } | { fehlt: string } | null;

const ZAHL = '[+-]?\\d+(?:[.,]\\d+)?';
const EINHEIT_L = '(?:mm|cm|m)(?![a-zäöüß])';

const zahl = (t: string): number => Number(t.replace(',', '.'));
const fmt = (v: number): string => String(Math.round(v * 1e9) / 1e9);
const laenge = (v: number, einheit = 'mm'): string => `${fmt(v)} ${einheit}`;

/** Modellübersicht aus der Systemnachricht lesen. */
export function bekannteElemente(nachrichten: Nachricht[]): Bekannt[] {
  const aus: Bekannt[] = [];
  for (const n of nachrichten) {
    if (n.rolle !== 'system' || !n.text) continue;
    for (const z of n.text.split('\n')) {
      const m = /^(\S+) (\S+) "([^"]*)" \((.*?)\)(?: |$)/.exec(z);
      if (m) aus.push({ id: m[1] as string, typ: m[2] as string, name: m[4] as string });
    }
  }
  return aus;
}

/** Gewählte Elemente aus der Zeile `zu: …` der Übersicht. */
function auswahl(nachrichten: Nachricht[]): string[] {
  for (const n of nachrichten) {
    const m = n.rolle === 'system' ? /^zu: (.*)$/m.exec(n.text ?? '') : null;
    if (m && m[1] !== '–') return (m[1] as string).split(/,\s*/);
  }
  return [];
}

/** Koordinaten aus „x 40 mm, y 20 mm, z 0“ oder „10, 20, 5 mm“ oder „(10, 20, 5) mm“. */
export function koordinaten(text: string): Record<string, string> | null {
  const benannt = [
    ...text.matchAll(new RegExp(`\\b([xyz])\\s*(?:=|:)?\\s*(${ZAHL})\\s*(${EINHEIT_L})?`, 'g')),
  ];
  if (benannt.length) {
    const aus: Record<string, string> = {};
    let einheit = benannt.find((m) => m[3])?.[3] ?? 'mm';
    for (const m of benannt) {
      if (m[3]) einheit = m[3];
      aus[m[1] as string] = laenge(zahl(m[2] as string), m[3] ?? einheit);
    }
    return aus;
  }
  const trenner = '(?:\\s*;\\s*|,\\s+)';
  const t = new RegExp(
    `\\(?\\s*(${ZAHL})\\s*(?:${EINHEIT_L})?${trenner}(${ZAHL})\\s*(?:${EINHEIT_L})?${trenner}(${ZAHL})\\s*\\)?\\s*(${EINHEIT_L})?`,
  ).exec(text);
  if (t) {
    const e = t[4] ?? 'mm';
    return {
      x: laenge(zahl(t[1] as string), e),
      y: laenge(zahl(t[2] as string), e),
      z: laenge(zahl(t[3] as string), e),
    };
  }
  return null;
}

const ARTIKEL = /^(?:der|die|das|den|dem|des|einen|einem|einer|eine|ein|diesen|diesem|dieser)\s+/;
const TYPWORT =
  /^(?:punkt|punkte|strecke|gerade|halbgerade|linie|koordinatensystem|element|ebene)\s+/;

/** Füllwörter am Anfang („zeichne mir eine …“) und am Ende („… an“) entfernen. */
function kern(teil: string): string {
  let s = teil.trim().replace(/[.!?]+$/, '');
  s = s.replace(/^(?:bitte\s+|dann\s+|danach\s+|noch\s+)+/, '');
  s = s.replace(
    /^(?:zeichne|zeichnen|setze|setz|lege|leg|mache|mach|erzeuge|erstelle|füge|fuege|baue|bau|konstruiere|ziehe|zieh)\s+(?:mir\s+|uns\s+)?(?:bitte\s+)?(?:noch\s+)?/,
    '',
  );
  s = s.replace(ARTIKEL, '');
  s = s.replace(/\s+(?:an|ein|hinzu|bitte)$/, '');
  return s.trim();
}

const LETZTER_PUNKT =
  /^(?:diesen|diesem|den neuen|dem neuen|den|dem)?\s*(?:punkt|ihn|ihm)$|^(?:ihn|ihm)$/;

interface Kontext {
  bekannt: Bekannt[];
  schritte: Geplant[];
  /** Index des zuletzt im Satz angelegten Punktes. */
  letzterPunkt: number | null;
  fehlt: string | null;
}

/** Element per ID oder Name (Groß-/Kleinschreibung egal), auch mit Typwort davor („die Strecke S1“). */
function finden(k: Kontext, roh: string): Bekannt | null {
  const kandidaten = new Set<string>();
  let s = roh.trim().replace(ARTIKEL, '');
  kandidaten.add(s);
  const ohneTyp = s.replace(TYPWORT, '');
  kandidaten.add(ohneTyp);
  s = ohneTyp.replace(/^"|"$/g, '');
  kandidaten.add(s);
  for (const c of kandidaten) {
    const l = c.toLowerCase();
    const e = k.bekannt.find((x) => x.id.toLowerCase() === l || x.name.toLowerCase() === l);
    if (e) return e;
  }
  return null;
}

/** Bezug auf einen Punkt: Name/ID, „diesen Punkt“ oder Koordinaten (dann wird ein Punkt angelegt). */
function punktBezug(k: Kontext, roh: string): Wert | null {
  const s = roh.trim();
  if (LETZTER_PUNKT.test(s.toLowerCase())) {
    if (k.letzterPunkt === null) {
      k.fehlt = s;
      return null;
    }
    return { schritt: k.letzterPunkt, ausgang: 'point' };
  }
  if (/\d/.test(s) && !/^[a-z]+\s*\d+$/i.test(s.replace(ARTIKEL, '').replace(TYPWORT, ''))) {
    const c = koordinaten(s);
    if (c) {
      k.schritte.push({ werkzeug: 'referenz_punkt', argumente: c });
      k.letzterPunkt = k.schritte.length - 1;
      return { schritt: k.letzterPunkt, ausgang: 'point' };
    }
  }
  const e = finden(k, s);
  if (!e) {
    k.fehlt = s.replace(ARTIKEL, '');
    return null;
  }
  return `${e.id}.${e.typ === 'frame' ? 'origin' : 'point'}`;
}

const EBENEN: Record<string, { a: string; b: string; n: string }> = {
  xy: { a: 'x', b: 'y', n: 'z' },
  yz: { a: 'y', b: 'z', n: 'x' },
  zx: { a: 'z', b: 'x', n: 'y' },
};

const RICHTUNG: Record<string, { achse: string; vorzeichen: number }> = {
  über: { achse: 'z', vorzeichen: 1 },
  ueber: { achse: 'z', vorzeichen: 1 },
  oberhalb: { achse: 'z', vorzeichen: 1 },
  unter: { achse: 'z', vorzeichen: -1 },
  unterhalb: { achse: 'z', vorzeichen: -1 },
  neben: { achse: 'x', vorzeichen: 1 },
};

/** Ein Teilsatz → Aufrufe im Kontext; false, wenn kein Muster passt. */
function teilsatz(k: Kontext, roh: string, gewaehlt: string[]): boolean {
  const s = kern(roh.toLowerCase());
  let m: RegExpExecArray | null;

  // Verwerfen / Ausblenden
  if ((m = /^(?:verwirf|verwerfe|verwerfen|entferne|entfern|lösche|loesche)\s+(.+)$/.exec(s))) {
    const e = finden(k, m[1] as string);
    if (!e) k.fehlt = (m[1] as string).replace(ARTIKEL, '');
    else k.schritte.push({ werkzeug: 'element_verwerfen', argumente: { element: e.id } });
    return true;
  }
  if (
    (m = /^(?:blende|blend)\s+(.+?)\s+aus$/.exec(s)) ||
    (m = /^(?:verstecke|versteck|ausblenden)\s+(.+)$/.exec(s))
  ) {
    const e = finden(k, m[1] as string);
    if (!e) k.fehlt = (m[1] as string).replace(ARTIKEL, '');
    else k.schritte.push({ werkzeug: 'element_ausblenden', argumente: { element: e.id } });
    return true;
  }

  // Rechteck B × H [in der XY-Ebene] [mit Punkt N darüber]
  m = new RegExp(
    `^rechteck\\s+(${ZAHL})\\s*(${EINHEIT_L})?\\s*(?:×|x|mal|\\*)\\s*(${ZAHL})\\s*(${EINHEIT_L})?(.*)$`,
  ).exec(s);
  if (m) {
    const einheit = m[4] ?? m[2] ?? 'mm';
    const b = zahl(m[1] as string);
    const h = zahl(m[3] as string);
    const rest = m[5] ?? '';
    const ebene = EBENEN[/\b(xy|yz|zx)\s*-?\s*ebene/.exec(rest)?.[1] ?? 'xy'] as {
      a: string;
      b: string;
      n: string;
    };
    const frame = k.bekannt.find((e) => gewaehlt.includes(e.id) && e.typ === 'frame');
    const ecken: [number, number][] = [
      [0, 0],
      [b, 0],
      [b, h],
      [0, h],
    ];
    const start = k.schritte.length;
    for (const [u, v] of ecken) {
      const arg: Record<string, Wert> = {
        x: laenge(0, einheit),
        y: laenge(0, einheit),
        z: laenge(0, einheit),
      };
      arg[ebene.a] = laenge(u, einheit);
      arg[ebene.b] = laenge(v, einheit);
      if (frame) arg.frame = `${frame.id}.frame`;
      k.schritte.push({ werkzeug: 'referenz_punkt', argumente: arg });
    }
    for (let i = 0; i < 4; i++)
      k.schritte.push({
        werkzeug: 'referenz_strecke',
        argumente: {
          a: { schritt: start + i, ausgang: 'point' },
          b: { schritt: start + ((i + 1) % 4), ausgang: 'point' },
        },
      });
    k.letzterPunkt = start + 3;
    const dar = new RegExp(
      `mit\\s+(?:einem\\s+)?punkt\\s+(${ZAHL})\\s*(${EINHEIT_L})?\\s+(?:darüber|darueber|oberhalb)`,
    ).exec(rest);
    if (dar) {
      const e2 = dar[2] ?? einheit;
      const arg: Record<string, Wert> = { ref: { schritt: start, ausgang: 'point' } };
      arg[ebene.a] = laenge(b / 2, einheit);
      arg[ebene.b] = laenge(h / 2, einheit);
      arg[ebene.n] = laenge(zahl(dar[1] as string), e2);
      k.schritte.push({
        werkzeug: 'referenz_punkt_relativ',
        argumente: { ref: arg.ref as Wert, x: arg.x as Wert, y: arg.y as Wert, z: arg.z as Wert },
      });
      k.letzterPunkt = k.schritte.length - 1;
    }
    return true;
  }

  // Koordinatensystem [bei …] [um W° um x/y/z gedreht]
  if ((m = /^koordinatensystem\b(.*)$/.exec(s))) {
    let rest = m[1] ?? '';
    const arg: Record<string, Wert> = {};
    for (const d of rest.matchAll(
      new RegExp(
        `um\\s+(${ZAHL})\\s*(°|grad|deg)\\s+um\\s+(?:die\\s+)?([xyz])(?:-?achse)?(?:\\s+gedreht)?`,
        'g',
      ),
    ))
      arg[`r${d[3]}`] = `${fmt(zahl(d[1] as string))} deg`;
    rest = rest.replace(
      new RegExp(`um\\s+${ZAHL}\\s*(?:°|grad|deg)\\s+um\\s+(?:die\\s+)?[xyz](?:-?achse)?`, 'g'),
      ' ',
    );
    const c = koordinaten(rest);
    if (c) Object.assign(arg, c);
    k.schritte.push({ werkzeug: 'referenz_koordinatensystem', argumente: arg });
    return true;
  }

  // Punkt N mm über/unter/neben <Punkt>
  m = new RegExp(
    `^punkt\\s+(${ZAHL})\\s*(${EINHEIT_L})?\\s+(über|ueber|oberhalb|unterhalb|unter|neben)\\s+(?:von\\s+)?(.+)$`,
  ).exec(s);
  if (m) {
    const ref = punktBezug(k, m[4] as string);
    if (ref === null) return true;
    const r = RICHTUNG[m[3] as string] as { achse: string; vorzeichen: number };
    const arg: Record<string, Wert> = { ref };
    arg[r.achse] = laenge(r.vorzeichen * zahl(m[1] as string), m[2] ?? 'mm');
    k.schritte.push({ werkzeug: 'referenz_punkt_relativ', argumente: arg });
    k.letzterPunkt = k.schritte.length - 1;
    return true;
  }

  // Punkt bei/auf … (Koordinaten)
  if ((m = /^punkt\s+(?:bei|auf|an|in)\s+(.+)$/.exec(s)) || (m = /^punkt\s+(\(.+)$/.exec(s))) {
    const c = koordinaten(m[1] as string);
    if (!c) return false;
    k.schritte.push({ werkzeug: 'referenz_punkt', argumente: c });
    k.letzterPunkt = k.schritte.length - 1;
    return true;
  }

  // Strecke/Linie/Gerade/Halbgerade von/zwischen/durch P nach/bis/und/durch Q
  m =
    /^(strecke|linie|verbindung|gerade|halbgerade)\s+(?:von|zwischen|durch|ab|vom)\s+(.+?)\s+(?:nach|bis|zu|zum|durch|und)\s+(.+)$/.exec(
      s,
    );
  if (m) {
    const werkzeug = {
      strecke: 'referenz_strecke',
      linie: 'referenz_strecke',
      verbindung: 'referenz_strecke',
      gerade: 'referenz_gerade',
      halbgerade: 'referenz_halbgerade',
    }[m[1] as string] as string;
    const a = punktBezug(k, m[2] as string);
    if (a === null) return true;
    const b = punktBezug(k, m[3] as string);
    if (b === null) return true;
    k.schritte.push({ werkzeug, argumente: { a, b } });
    return true;
  }
  return false;
}

/** Satz → Plan (deterministisch). `null`: kein Muster; `{fehlt}`: unbekannter Name. */
export function planen(satz: string, bekannt: Bekannt[], gewaehlt: string[] = []): Plan {
  // „zwischen A und B“ schützen, bevor an „und“ getrennt wird
  const s = satz
    .replace(/\s+/g, ' ')
    .replace(/\bzwischen\s+(.+?)\s+und\s+/gi, 'zwischen $1 bis ')
    .trim();
  const teile = s
    .split(/\s*(?:;|\.\s+|,?\s+\bund\b\s+|,\s+(?:dann|danach)\s+)\s*/i)
    .filter(Boolean);
  if (!teile.length) return null;
  const k: Kontext = { bekannt, schritte: [], letzterPunkt: null, fehlt: null };
  for (const t of teile) {
    if (!teilsatz(k, t, gewaehlt)) return null;
    if (k.fehlt) return { fehlt: k.fehlt };
  }
  return k.schritte.length ? { schritte: k.schritte } : null;
}

function letzteFrage(nachrichten: Nachricht[]): number {
  for (let i = nachrichten.length - 1; i >= 0; i--)
    if (nachrichten[i]?.rolle === 'mensch') return i;
  return -1;
}

/** Name zurück in die Schreibweise der Modellübersicht („s9“ → „S9“, sonst wie geschrieben). */
function anzeige(satz: string, fehlt: string): string {
  const i = satz.toLowerCase().indexOf(fehlt.toLowerCase());
  return i >= 0 ? satz.slice(i, i + fehlt.length) : fehlt;
}

/** Ein Schritt der Satzerkennung über die Nachrichten (wie ein Modell, nur ohne Modell). */
export function regelSchritt(nachrichten: Nachricht[]): Schritt {
  const i = letzteFrage(nachrichten);
  const satz = nachrichten[i]?.text ?? '';
  const plan = planen(satz, bekannteElemente(nachrichten), auswahl(nachrichten));
  if (!plan) return { aufrufe: [], erkannt: false, text: '' };
  if ('fehlt' in plan)
    return {
      aufrufe: [],
      text: `„${anzeige(satz, plan.fehlt)}“ finde ich nicht im Modell. Nimm einen Namen oder eine ID aus der Struktur, z. B. P1.`,
    };
  const ergebnisse = nachrichten
    .slice(i + 1)
    .filter((n) => n.rolle === 'werkzeug')
    .map((n) => (n.ergebnis ?? {}) as { ok?: boolean; element?: string; message?: string });
  const fehler = ergebnisse.find((r) => r.ok !== true);
  if (fehler)
    return {
      aufrufe: [],
      text: `Schritt ${ergebnisse.indexOf(fehler) + 1} ging nicht: ${fehler.message ?? 'unbekannter Fehler'}`,
    };
  const n = ergebnisse.length;
  if (n >= plan.schritte.length)
    return {
      aufrufe: [],
      text: `Ich habe ${n} ${n === 1 ? 'Schritt' : 'Schritte'} vorbereitet. Prüfe die Vorschau und übernimm oder verwirf sie.`,
    };
  const g = plan.schritte[n] as Geplant;
  const argumente: Record<string, string> = {};
  for (const [name, w] of Object.entries(g.argumente)) {
    argumente[name] =
      typeof w === 'string' ? w : `${ergebnisse[w.schritt]?.element ?? '?'}.${w.ausgang}`;
  }
  const aufruf: Aufruf = { id: `regel-${n + 1}`, werkzeug: g.werkzeug, argumente };
  return { aufrufe: [aufruf] };
}

export const regel: Anbieter = {
  id: 'regel',
  schritt: (nachrichten) => Promise.resolve(regelSchritt(nachrichten)),
};
