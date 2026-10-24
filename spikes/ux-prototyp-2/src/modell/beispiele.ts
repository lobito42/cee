// Beispielinhalt (design.md): Halter als Teil, Sensorgehäuse als Baugruppe; Zahlen immer als Größe.
import { element, mm, type Element } from './element';

/** Ausgangswerte, auf die „Letzten gültigen Wert setzen“ zurückfällt, wenn der Verlauf keinen kennt. */
export const AUSGANGSWERTE: Record<string, Record<string, number>> = {
  bohrungen: { durchmesser: 6 },
  steg: { hoehe: 30 },
};

export function halter(): Element {
  return element('halter', 'teil', 'Halter', { material: 'PLA' }, [
    element('skizze', 'skizze', 'Skizze', {
      ebene: 'XY',
      laenge: mm(80),
      breite: mm(50),
      eckradius: mm(3),
    }),
    element('grundplatte', 'extrusion', 'Grundplatte', {
      laenge: mm(80),
      breite: mm(50),
      dicke: mm(8),
      eckradius: mm(3),
    }),
    element('steg', 'extrusion', 'Steg', {
      laenge: mm(60),
      breite: mm(10),
      hoehe: mm(30),
      lage_y: mm(20),
    }),
    element('bohrungen', 'bohrung', 'Bohrungen', {
      durchmesser: mm(6),
      abstand_x: mm(25),
      lage_y: mm(-7.5),
    }),
  ]);
}

export function sensorgehaeuse(): Element {
  return element('sensorgehaeuse', 'baugruppe', 'Sensorgehäuse', {}, [
    element('baugruppe-1', 'baugruppe', 'Baugruppe 1', {}, [
      element('gehaeuse', 'teil', 'Gehäuse', { material: 'PLA', lage_x: mm(0) }, [
        element('schale', 'schale', 'Schale', {
          laenge: mm(80),
          breite: mm(50),
          hoehe: mm(30),
          wand: mm(2),
        }),
      ]),
    ]),
    element('deckel', 'teil', 'Deckel', { material: 'PLA', lage_x: mm(100) }, [
      element('platte', 'extrusion', 'Platte', {
        laenge: mm(80),
        breite: mm(50),
        hoehe: mm(4),
      }),
    ]),
  ]);
}

export const leeresTeil = (): Element =>
  element('teil-1', 'teil', 'Teil 1', { material: 'PLA' }, []);

/** Das Projekt hält die Dokumente (Reiter) als Kinder. */
export const projekt = (dokumente: Element[]): Element =>
  element('projekt', 'projekt', 'Projekt', {}, dokumente);

export const standardProjekt = (): Element => projekt([halter(), sensorgehaeuse()]);
export const leeresProjekt = (): Element => projekt([leeresTeil()]);
