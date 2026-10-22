// Simulierte KI (Wegwerf): erkennt vorbereitete Absichten per Schlüsselwort, Deutsch und Englisch.
// Kein Modell, kein Netz (ADR-037); alles daraus ist als „simuliert“ gekennzeichnet.
import { anzeigen, type Groesse } from '../wert/wertfeld';
import { finde, skizzeVon, type Element, type Projekt } from '../modell/projekt';

export interface Vorschlag {
  /** Schlüssel und Werte für den Titel der Entscheidungskarte. */
  titel: { schluessel: string; werte: Record<string, string> };
  begruendung: string;
  befehle: { id: string; parameter: Record<string, unknown> }[];
  werte: { feld: string; vorher: string; nachher: string }[];
  /** Schritt, auf den sich der Vorschlag bezieht. */
  ziel: string;
}

export interface Kontext {
  projekt: Projekt;
  /** IDs der gewählten Schritte (Kanten zählen nicht). */
  auswahl: string[];
}

const mm = (value: number): Groesse => ({ value, unit: 'mm' });

const ZAHL = /(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i;
const EINHEIT: Record<string, number> = { mm: 1, cm: 10, m: 1000 };

function zahlMitEinheit(satz: string): number | null {
  const m = ZAHL.exec(satz);
  if (!m || m[1] === undefined || m[2] === undefined) return null;
  return Number(m[1].replace(',', '.')) * (EINHEIT[m[2].toLowerCase()] ?? 1);
}

function ziel(satz: string, kontext: Kontext): Element | undefined {
  const s = satz.toLowerCase();
  const nach = (id: string) => finde(kontext.projekt, id);
  if (/steg|\bweb\b|\brib\b/.test(s)) return nach('steg');
  if (/grundplatte|platte|\bplate\b|\bbase\b/.test(s)) return nach('grundplatte');
  const gewaehlt = kontext.auswahl.map((id) => nach(id)).find((e) => e && e.type === 'extrusion');
  return gewaehlt;
}

type Mass = { dimension: 'laenge' | 'breite' | 'hoehe'; vorzeichen: 1 | -1 };

function massWunsch(satz: string): Mass | null {
  const s = satz.toLowerCase();
  const tabelle: [RegExp, Mass][] = [
    [/länger|laenger|longer|lengthen/, { dimension: 'laenge', vorzeichen: 1 }],
    [/kürzer|kuerzer|shorter/, { dimension: 'laenge', vorzeichen: -1 }],
    [/breiter|wider/, { dimension: 'breite', vorzeichen: 1 }],
    [/schmaler|narrower/, { dimension: 'breite', vorzeichen: -1 }],
    [/dicker|höher|hoeher|thicker|taller|higher/, { dimension: 'hoehe', vorzeichen: 1 }],
    [/dünner|duenner|niedriger|thinner|lower/, { dimension: 'hoehe', vorzeichen: -1 }],
  ];
  return tabelle.find(([r]) => r.test(s))?.[1] ?? null;
}

const wertVon = (g: unknown): number => (g as Groesse).value;

/** Erkennt eine vorbereitete Absicht; `null`, wenn keine passt (dann erklärt die Oberfläche die Beispiele). */
export function erkenne(satz: string, kontext: Kontext): Vorschlag | null {
  const s = satz.toLowerCase();
  const schritt = ziel(satz, kontext);
  if (!schritt) return null;
  const betrag = zahlMitEinheit(satz);

  if (/rund|abrund|verrund|round|fillet/.test(s)) {
    if (schritt.id !== 'steg') return null;
    const radius = betrag ?? 1;
    const kanten = ['oben-vorn', 'oben-hinten', 'oben-links', 'oben-rechts'].map(
      (n) => `${schritt.id}/k/${n}`,
    );
    return {
      titel: { schluessel: 'ki.titel.verrundung', werte: { radius: anzeigen(mm(radius), 'de') } },
      begruendung: 'ki.begruendung.verrundung',
      befehle: [
        { id: 'feature.verrunden', parameter: { ziel: schritt.id, radius: mm(radius), kanten } },
      ],
      werte: [{ feld: 'radius', vorher: '–', nachher: anzeigen(mm(radius), 'de') }],
      ziel: schritt.id,
    };
  }

  const wunsch = massWunsch(satz);
  if (wunsch && betrag !== null) {
    const sk = skizzeVon(schritt);
    let name: string;
    let aktuell: number;
    let feld: string;
    if (wunsch.dimension === 'hoehe') {
      name = schritt.params.hoehe ? 'hoehe' : 'dicke';
      aktuell = wertVon(schritt.params[name]);
      feld = name === 'hoehe' ? 'hoehe' : 'dicke';
    } else {
      if (!sk) return null;
      name = `skizze.${wunsch.dimension}`;
      aktuell = wertVon(sk.params[wunsch.dimension]);
      feld = wunsch.dimension;
    }
    const neu = Math.max(1, aktuell + wunsch.vorzeichen * betrag);
    return {
      titel: {
        schluessel: 'ki.titel.mass',
        werte: { schritt: schritt.meta.name, feld, nachher: anzeigen(mm(neu), 'de') },
      },
      begruendung: 'ki.begruendung.mass',
      befehle: [
        { id: 'element.wert-setzen', parameter: { element: schritt.id, name, wert: mm(neu) } },
      ],
      werte: [{ feld, vorher: anzeigen(mm(aktuell), 'de'), nachher: anzeigen(mm(neu), 'de') }],
      ziel: schritt.id,
    };
  }
  return null;
}

/** Mehr als drei Wörter? Dann bietet die Suche „KI fragen“ an. */
export const istSatz = (text: string): boolean => text.trim().split(/\s+/).length > 3;
