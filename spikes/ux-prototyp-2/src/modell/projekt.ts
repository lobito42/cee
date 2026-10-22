// Simuliertes Modell (Wegwerf): Elemente in der Elementform, Zahlen als Größe mit Einheit (ADR-057).
import type { Groesse } from '../wert/wertfeld';

export interface Element {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>;
  content: Element[];
  meta: { name: string; verworfen?: boolean; ausgeblendet?: boolean } & Record<string, unknown>;
}

export type Projekt = Element;

export const mm = (value: number): Groesse => ({ value, unit: 'mm' });
export const newton = (value: number): Groesse => ({ value, unit: 'N' });

export function element(
  id: string,
  type: string,
  name: string,
  params: Record<string, unknown> = {},
  content: Element[] = [],
): Element {
  return { id, type, params, content, meta: { name } };
}

export const kopie = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

/** Nur `content` (so arbeiten Entwürfe, ADR-043). */
export function alle(wurzel: Element): Element[] {
  return wurzel.content.flatMap((k) => [k, ...alle(k)]);
}

/** Die Skizze, die ein Schritt in `params.skizze` trägt. */
export const skizzeVon = (e: Element): Element | undefined =>
  e.params.skizze && typeof e.params.skizze === 'object' ? (e.params.skizze as Element) : undefined;

/** Alle Elemente samt eingebetteter Skizzen. */
export function alleMitSkizzen(wurzel: Element): Element[] {
  return alle(wurzel).flatMap((k) => {
    const s = skizzeVon(k);
    return s ? [k, s] : [k];
  });
}

export function finde(wurzel: Element, id: string): Element | undefined {
  return alle(wurzel).find((k) => k.id === id);
}

export function findeMitSkizzen(wurzel: Element, id: string): Element | undefined {
  return alleMitSkizzen(wurzel).find((k) => k.id === id);
}

/** Der Schritt, dessen Skizze diese ID trägt (oder der Schritt selbst). */
export function schrittVon(wurzel: Element, id: string): Element | undefined {
  const direkt = finde(wurzel, id);
  if (direkt) return direkt;
  return alle(wurzel).find((k) => skizzeVon(k)?.id === id);
}

/** Das Teil (Element mit Schritten), das den Schritt enthält. */
export function teilVon(wurzel: Element, id: string): Element | undefined {
  for (const t of wurzel.content) {
    if (t.id === id || alle(t).some((k) => k.id === id || skizzeVon(k)?.id === id)) return t;
  }
  return undefined;
}

const mitte = (x: number, y: number) => ({ x: mm(x), y: mm(y) });

export const rechteckSkizze = (
  id: string,
  ebene: string,
  laenge: number,
  breite: number,
  mitteXY = { x: 0, y: 0 },
  eckradius?: number,
): Element => {
  const params: Record<string, unknown> = {
    ebene,
    form: 'rechteck',
    laenge: mm(laenge),
    breite: mm(breite),
    mitte: mitte(mitteXY.x, mitteXY.y),
  };
  if (eckradius !== undefined) params.eckradius = mm(eckradius);
  return element(id, 'skizze', 'Skizze', params);
};

const ursprung = (teil: string): Element =>
  element(
    `${teil}-ursprung`,
    'ursprung',
    'Ursprung',
    {},
    ['XY', 'XZ', 'YZ'].map((n) => element(`${teil}-ebene-${n.toLowerCase()}`, 'ebene', n)),
  );

/** Vorbereiteter, verworfener Entwurf (design.md, Entwürfe). */
const verworfenerEntwurf = (): Element =>
  element('entwurf-0', 'entwurf', 'Platte 6 mm', {
    zustand: 'verworfen',
    begruendung: 'zu biegsam',
    aenderungen: { grundplatte: { dicke: mm(6) } },
  });

/** Beispielteil Halter (design.md): Grundplatte, Steg, zwei Bohrungen. */
export function halterProjekt(): Projekt {
  const grundplatte = element('grundplatte', 'extrusion', 'Grundplatte', {
    dicke: mm(8),
    skizze: rechteckSkizze('grundplatte-skizze', 'XY', 80, 50, { x: 0, y: 0 }, 3),
  });
  const steg = element('steg', 'extrusion', 'Steg', {
    hoehe: mm(30),
    skizze: rechteckSkizze('steg-skizze', 'oberseite', 60, 10, { x: 0, y: 20 }),
  });
  const bohrungen = element('bohrungen', 'bohrung', 'Bohrungen', {
    durchmesser: mm(6),
    durchgehend: true,
    skizze: element('bohrungen-skizze', 'skizze', 'Skizze', {
      ebene: 'oberseite',
      form: 'punkte',
      punkte: [
        { x: mm(25), y: mm(-7.5) },
        { x: mm(-25), y: mm(-7.5) },
      ],
    }),
  });
  return element('projekt-halter', 'projekt', 'Halter', { entwuerfe: [verworfenerEntwurf()] }, [
    element('halter', 'teil', 'Halter', { material: 'PLA' }, [
      ursprung('halter'),
      grundplatte,
      steg,
      bohrungen,
    ]),
  ]);
}

/** Leeres Teil 1 (Aufgabe A). */
export function leeresProjekt(): Projekt {
  return element('projekt-leer', 'projekt', 'Teil 1', { entwuerfe: [] }, [
    element('teil-1', 'teil', 'Teil 1', { material: 'PLA' }, [ursprung('teil-1')]),
  ]);
}

/** Verbindungspunkt: Lage relativ zum Ursprung des Teils (Mitte der Unterseite). */
const punkt = (id: string, name: string, z: number): Element =>
  element(id, 'konnektor', name, { position: { x: mm(0), y: mm(0), z: mm(z) } });

/** Testprojekt „Sensorgehäuse“ (design.md): Gehäuse und Deckel, unverändert aus ap-41. */
export function gehaeuseProjekt(): Projekt {
  return element('projekt-sensor', 'projekt', 'Sensorgehäuse', { entwuerfe: [] }, [
    element(
      'gehaeuse',
      'teil',
      'Gehäuse',
      {
        form: 'schale',
        laenge: mm(80),
        breite: mm(50),
        hoehe: mm(30),
        wand: mm(2),
        material: 'PLA',
      },
      [punkt('gehaeuse-oberkante', 'Oberkante', 30)],
    ),
    element(
      'deckel',
      'teil',
      'Deckel',
      { form: 'quader', laenge: mm(80), breite: mm(50), hoehe: mm(4), material: 'PLA' },
      [punkt('deckel-unterseite', 'Unterseite', 0)],
    ),
  ]);
}

/** Beispielpaket „Simulation“: Lager, Kraft, Ergebnis (simuliert). */
export function simulationsSchritte(): Element[] {
  return [
    element('sim-lager', 'lager', 'Lager', { ziel: 'grundplatte', art: 'fest' }),
    element('sim-kraft', 'kraft', 'Kraft', {
      ziel: 'steg',
      kraft: newton(100),
      richtung: '-Y',
    }),
    element('sim-ergebnis', 'ergebnis', 'Ergebnis', { simuliert: true }),
  ];
}

/** Halter mit Simulationsschritten (Zustand `simulation`). */
export function halterMitSimulation(): Projekt {
  const p = halterProjekt();
  p.content.push(simulationsStudie());
  return p;
}

export const simulationsStudie = (): Element =>
  element('simulation', 'studie', 'Simulation', {}, simulationsSchritte());
