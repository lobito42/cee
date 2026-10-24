// Kleine Hilfen zum Bauen und Abgleichen von DOM-Elementen ohne UI-Framework.
import {
  ArrowUp,
  BookOpen,
  Box,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleDot,
  CirclePause,
  Copy,
  Cuboid,
  Eye,
  EyeOff,
  Focus,
  FolderOpen,
  Layers,
  Loader,
  Maximize,
  Menu,
  PanelBottom,
  PanelLeft,
  PanelRight,
  Pencil,
  Play,
  Plus,
  Redo2,
  Search,
  Settings,
  Sparkles,
  Square,
  Trash2,
  Undo2,
  User,
  X,
  createElement as lucide,
} from 'lucide';

type Wert = string | number | boolean | null | undefined;
type Kind = Node | string | null | false | undefined;

const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_TAGS = new Set([
  'svg',
  'path',
  'line',
  'rect',
  'circle',
  'polygon',
  'polyline',
  'g',
  'text',
]);

export function h(
  tag: string,
  attribute: Record<string, Wert> = {},
  ...kinder: Kind[]
): HTMLElement {
  const e = (
    SVG_TAGS.has(tag) ? document.createElementNS(SVG_NS, tag) : document.createElement(tag)
  ) as HTMLElement;
  for (const [name, w] of Object.entries(attribute)) {
    if (w === null || w === undefined || w === false) continue;
    if (name === 'class') e.setAttribute('class', String(w));
    else e.setAttribute(name, w === true ? '' : String(w));
  }
  if (tag === 'input' && attribute.value !== undefined)
    (e as HTMLInputElement).value = String(attribute.value);
  for (const k of kinder) {
    if (k === null || k === false || k === undefined) continue;
    e.append(typeof k === 'string' ? document.createTextNode(k) : k);
  }
  return e;
}

const SYMBOLE = {
  'arrow-up': ArrowUp,
  'book-open': BookOpen,
  box: Box,
  boxes: Boxes,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'circle-alert': CircleAlert,
  'circle-dot': CircleDot,
  'circle-pause': CirclePause,
  copy: Copy,
  cuboid: Cuboid,
  eye: Eye,
  'eye-off': EyeOff,
  focus: Focus,
  'folder-open': FolderOpen,
  layers: Layers,
  loader: Loader,
  maximize: Maximize,
  menu: Menu,
  'panel-bottom': PanelBottom,
  'panel-left': PanelLeft,
  'panel-right': PanelRight,
  pencil: Pencil,
  play: Play,
  plus: Plus,
  'redo-2': Redo2,
  search: Search,
  settings: Settings,
  sparkles: Sparkles,
  square: Square,
  'trash-2': Trash2,
  'undo-2': Undo2,
  user: User,
  x: X,
} as const;

export type Symbolname = keyof typeof SYMBOLE;

/** Lucide-Symbol im 24-px-Raster (ADR-061); `data-icon` trägt den Lucide-Namen für die Prüfung. */
export function symbol(name: Symbolname, groesse = 16): HTMLElement {
  const svg = lucide(SYMBOLE[name], {
    width: groesse,
    height: groesse,
    'stroke-width': 2,
    'aria-hidden': 'true',
  });
  const huelle = h('span', { class: 'symbol', 'data-icon': name });
  huelle.append(svg as unknown as Node);
  return huelle;
}

// --- Abgleich ------------------------------------------------------------------------------------

const schluessel = (n: Node): string | null =>
  n instanceof Element ? (n.getAttribute('data-key') ?? null) : null;

function gleichArt(a: Node, b: Node): boolean {
  if (a.nodeType !== b.nodeType) return false;
  if (a instanceof Element && b instanceof Element) {
    return a.nodeName === b.nodeName && schluessel(a) === schluessel(b);
  }
  return true;
}

function attributeAbgleichen(alt: Element, neu: Element): void {
  for (const a of [...alt.attributes]) {
    // „data-editiert“ setzt der Eingabeablauf selbst und räumt es beim Verlassen des Felds auf.
    if (a.name !== 'data-editiert' && !neu.hasAttribute(a.name)) alt.removeAttribute(a.name);
  }
  for (const a of [...neu.attributes]) {
    if (alt.getAttribute(a.name) !== a.value) alt.setAttribute(a.name, a.value);
  }
}

/** Gleicht `alt` mit `neu` ab, ohne Knoten unnötig zu ersetzen (Fokus, Auswahl im Feld und Ereignisse bleiben). */
export function abgleichen(alt: Node, neu: Node): void {
  if (alt instanceof Text && neu instanceof Text) {
    if (alt.nodeValue !== neu.nodeValue) alt.nodeValue = neu.nodeValue;
    return;
  }
  if (!(alt instanceof Element) || !(neu instanceof Element)) return;
  attributeAbgleichen(alt, neu);
  if (alt instanceof HTMLInputElement && neu instanceof HTMLInputElement) {
    const editiert = document.activeElement === alt && alt.hasAttribute('data-editiert');
    if (!editiert && alt.value !== neu.value) alt.value = neu.value;
    return;
  }
  const behalten = new Set<Node>();
  const alteKinder = [...alt.childNodes];
  const gefunden = new Map<string, Node>();
  for (const k of alteKinder) {
    const s = schluessel(k);
    if (s !== null) gefunden.set(s, k);
  }
  let zeiger = 0;
  const neueKinder = [...neu.childNodes];
  for (const [i, nk] of neueKinder.entries()) {
    const s = schluessel(nk);
    let treffer: Node | undefined;
    if (s !== null) treffer = gefunden.get(s);
    else {
      while (zeiger < alteKinder.length) {
        const kandidat = alteKinder[zeiger] as Node;
        zeiger += 1;
        if (!behalten.has(kandidat) && schluessel(kandidat) === null && gleichArt(kandidat, nk)) {
          treffer = kandidat;
          break;
        }
      }
    }
    if (treffer) {
      behalten.add(treffer);
      abgleichen(treffer, nk);
      const soll = alt.childNodes[i];
      if (soll !== treffer) alt.insertBefore(treffer, soll ?? null);
    } else {
      const soll = alt.childNodes[i];
      alt.insertBefore(nk, soll ?? null);
      behalten.add(nk);
    }
  }
  for (const k of [...alt.childNodes]) if (!behalten.has(k)) alt.removeChild(k);
}
