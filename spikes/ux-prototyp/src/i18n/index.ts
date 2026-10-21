// Übersetzungen: Schlüssel mit Punkten, Sprache per Adresse (?sprache=en | schluessel).
import de from './de.json';
import en from './en.json';

type Baum = { [k: string]: string | Baum };

export type Sprache = 'de' | 'en' | 'schluessel';

export function spracheAusAdresse(suche: string): Sprache {
  const s = new URLSearchParams(suche).get('sprache');
  return s === 'en' || s === 'schluessel' ? s : 'de';
}

function suchen(baum: Baum, schluessel: string): string | undefined {
  let knoten: string | Baum | undefined = baum;
  for (const teil of schluessel.split('.')) {
    if (typeof knoten !== 'object') return undefined;
    knoten = knoten[teil];
  }
  return typeof knoten === 'string' ? knoten : undefined;
}

export function uebersetzer(sprache: Sprache): (schluessel: string) => string {
  return (schluessel) => {
    if (sprache === 'schluessel') return schluessel;
    const baum = (sprache === 'en' ? en : de) as Baum;
    return suchen(baum, schluessel) ?? schluessel;
  };
}
