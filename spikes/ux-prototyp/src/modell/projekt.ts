// Simuliertes Modell (Wegwerf): Elemente in der Elementform, Zahlen als Größe mit Einheit (ADR-057).
import type { Groesse } from '../wert/wertfeld';

export interface Element {
  id: string;
  type: string;
  params: Record<string, unknown>;
  content: Element[];
  meta: { name: string } & Record<string, unknown>;
}

export interface Projekt {
  id: string;
  type: 'project';
  params: Record<string, unknown>;
  content: Element[];
  meta: { name: string };
}

export const mm = (value: number): Groesse => ({ value, unit: 'mm' });

export function element(
  id: string,
  type: string,
  name: string,
  params: Record<string, unknown> = {},
  content: Element[] = [],
): Element {
  return { id, type, params, content, meta: { name } };
}

/** Verbindungspunkt: Lage relativ zum Ursprung des Teils (Mitte der Unterseite). */
const punkt = (id: string, name: string, z: number): Element =>
  element(id, 'connector', name, { position: { x: mm(0), y: mm(0), z: mm(z) } });

/** Testprojekt „Sensorgehäuse“ (design.md): Teil 1, Platte, Gehäuse, Deckel. */
export function testprojekt(): Projekt {
  const ebenen = ['XY', 'XZ', 'YZ'].map((n) => element(`ebene-${n.toLowerCase()}`, 'plane', n));
  return {
    id: 'projekt-1',
    type: 'project',
    params: {
      // Vorbereiteter, verworfener Entwurf (design.md, Entwürfe).
      entwuerfe: [
        element('entwurf-0', 'draft', 'Platte 6 mm', {
          zustand: 'verworfen',
          begruendung: 'zu biegsam',
          aenderungen: { 'extrusion-1': { tiefe: mm(6) } },
        }),
      ],
    },
    meta: { name: 'Sensorgehäuse' },
    content: [
      element('teil-1', 'part', 'Teil 1', {}, ebenen),
      element('platte', 'part', 'Platte', {}, [
        element('skizze-1', 'sketch', 'Skizze 1', {
          ebene: 'XY',
          laenge: mm(80),
          breite: mm(50),
        }),
        element('extrusion-1', 'extrusion', 'Extrusion 1', { skizze: 'skizze-1', tiefe: mm(5) }),
      ]),
      element(
        'gehaeuse',
        'part',
        'Gehäuse',
        { laenge: mm(80), breite: mm(50), hoehe: mm(30), wand: mm(2), offen: 'oben' },
        [punkt('gehaeuse-oberkante', 'Oberkante', 30)],
      ),
      element('deckel', 'part', 'Deckel', { laenge: mm(80), breite: mm(50), hoehe: mm(4) }, [
        punkt('deckel-unterseite', 'Unterseite', 0),
      ]),
    ],
  };
}

export function alle(wurzel: Element | Projekt): Element[] {
  return wurzel.content.flatMap((k) => [k, ...alle(k)]);
}

export function finde(wurzel: Element | Projekt, id: string): Element | undefined {
  return alle(wurzel).find((k) => k.id === id);
}
