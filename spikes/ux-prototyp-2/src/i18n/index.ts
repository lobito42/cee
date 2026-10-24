// Übersetzungen: Schlüssel mit Punkten, Sprache per Adresse (?sprache=en | schluessel).
import de from './de.json';
import en from './en.json';

type Baum = { [k: string]: string | Baum };

export type Sprache = 'de' | 'en' | 'schluessel';
export type Werte = Record<string, string | number>;
export type Uebersetzer = (schluessel: string, werte?: Werte) => string;

export function spracheAusAdresse(suche: string): Sprache {
  const s = new URLSearchParams(suche).get('sprache');
  return s === 'en' || s === 'schluessel' ? s : 'de';
}

function suchen(baum: Baum, schluessel: string): string | undefined {
  const direkt = baum[schluessel];
  if (typeof direkt === 'string') return direkt;
  let knoten: string | Baum | undefined = baum;
  for (const teil of schluessel.split('.')) {
    if (typeof knoten !== 'object') return undefined;
    knoten = knoten[teil];
  }
  return typeof knoten === 'string' ? knoten : undefined;
}

/** Der Text zu einem Schlüssel; unbekannte Schlüssel erscheinen unverändert (z. B. Titel fremder Befehle). */
export function uebersetzer(sprache: Sprache): Uebersetzer {
  return (schluessel, werte) => {
    if (sprache === 'schluessel') return schluessel;
    const baum = (sprache === 'en' ? en : de) as Baum;
    const text = suchen(baum, schluessel) ?? schluessel;
    if (!werte) return text;
    return text.replace(/\{(\w+)\}/g, (_, name: string) => String(werte[name] ?? ''));
  };
}

/** Kürzel aus dem Register, wie die Plattform sie schreibt („Strg+K“, auf macOS „⌘K“). */
export function kuerzelText(kuerzel: string, sprache: Sprache): string {
  const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const teile = kuerzel.split('+');
  const taste = teile[teile.length - 1] ?? '';
  const umschalter = teile.slice(0, -1);
  if (mac) {
    const zeichen: Record<string, string> = { Mod: '⌘', Umschalt: '⇧', Shift: '⇧', Alt: '⌥' };
    return umschalter.map((u) => zeichen[u] ?? u).join('') + taste;
  }
  const namen: Record<string, string> = {
    Mod: sprache === 'en' ? 'Ctrl' : 'Strg',
    Umschalt: sprache === 'en' ? 'Shift' : 'Umschalt',
    Shift: sprache === 'en' ? 'Shift' : 'Umschalt',
    Alt: 'Alt',
  };
  return [...umschalter.map((u) => namen[u] ?? u), taste].join('+');
}
