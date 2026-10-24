// Anzeige von Zahlen mit Einheit (ADR-057): jede angezeigte Zahl trägt ihre Einheit.
import type { Sprache } from '../i18n';
import { anzeigen, type Groesse } from '../wert/wertfeld';

const dez = (n: number, stellen: number, sprache: Sprache): string => {
  const text = (Math.round(n * 10 ** stellen) / 10 ** stellen).toFixed(stellen);
  return sprache === 'en' ? text : text.replace('.', ',');
};

const spr = (s: Sprache): 'de' | 'en' => (s === 'en' ? 'en' : 'de');

/** „80 mm“, „7,5 mm“; Winkel „35 °“. */
export function groesseText(
  g: Groesse | { value: number; unit: string },
  sprache: Sprache,
): string {
  return anzeigen(g as Groesse, spr(sprache));
}

export const volumenText = (mm3: number, sprache: Sprache): string =>
  `${dez(mm3 / 1000, 2, sprache)} cm³`;
export const masseText = (g: number, sprache: Sprache): string => `${dez(g, 2, sprache)} g`;
export const dichteText = (sprache: Sprache): string => `${dez(1.24, 2, sprache)} g/cm³`;

/** „80 × 50 × 38 mm“. */
export function abmessungenText(abm: [number, number, number], sprache: Sprache): string {
  const z = (n: number) => dez(n, 1, sprache).replace(/[.,]0$/, '');
  return `${z(abm[0])} × ${z(abm[1])} × ${z(abm[2])} mm`;
}
