// Kleine Hilfen zum Bauen von DOM-Elementen ohne UI-Framework.

type Wert = string | number | boolean | null | undefined | ((e: Event) => void);
type Kind = Node | string | null | false | undefined;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attribute: Record<string, Wert> = {},
  ...kinder: Kind[]
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  for (const [name, wert] of Object.entries(attribute)) {
    if (wert === null || wert === undefined || wert === false) continue;
    if (typeof wert === 'function') {
      e.addEventListener(name.slice(2).toLowerCase(), wert);
    } else if (name === 'class') {
      e.className = String(wert);
    } else if (name === 'value' && e instanceof HTMLInputElement) {
      e.value = String(wert);
    } else {
      e.setAttribute(name, wert === true ? '' : String(wert));
    }
  }
  for (const k of kinder) {
    if (k === null || k === false || k === undefined) continue;
    e.append(typeof k === 'string' ? document.createTextNode(k) : k);
  }
  return e;
}

/** Ersetzt den Inhalt nur, wenn sich die Signatur geändert hat; gibt `true` zurück, wenn neu gebaut wurde. */
export function abgleichen(
  behaelter: HTMLElement,
  signatur: string,
  bauen: () => (Node | null | false)[],
): boolean {
  if (behaelter.dataset.signatur === signatur) return false;
  behaelter.dataset.signatur = signatur;
  behaelter.replaceChildren(...bauen().filter((n): n is Node => !!n));
  return true;
}

const SVG = 'http://www.w3.org/2000/svg';

/** Einfaches Symbol (Lucide-artig: Linien, 24 × 24, currentColor). */
export function symbol(pfade: string[]): SVGSVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for (const d of pfade) {
    const p = document.createElementNS(SVG, 'path');
    p.setAttribute('d', d);
    svg.append(p);
  }
  return svg;
}

export const SYMBOLE = {
  pfeilHoch: ['M12 19V5', 'M5 12l7-7 7 7'],
  einpassen: [
    'M8 3H5a2 2 0 0 0-2 2v3',
    'M21 8V5a2 2 0 0 0-2-2h-3',
    'M3 16v3a2 2 0 0 0 2 2h3',
    'M16 21h3a2 2 0 0 0 2-2v-3',
  ],
  rueckgaengig: ['M9 14 4 9l5-5', 'M4 9h10.5a5.5 5.5 0 0 1 0 11H11'],
  wiederholen: ['m15 14 5-5-5-5', 'M20 9H9.5a5.5 5.5 0 0 0 0 11H13'],
  suche: ['m21 21-4.3-4.3', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16'],
  fehler: ['M18 6 6 18', 'm6 6 12 12'],
  schliessen: ['M18 6 6 18', 'm6 6 12 12'],
} as const;
