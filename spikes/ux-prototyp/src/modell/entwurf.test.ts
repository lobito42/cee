import { describe, expect, it } from 'vitest';
import { entwuerfe, wirkungenRegistrieren, zustandVon } from './entwurf';
import { finde, mm, type Projekt } from './projekt';
import { Sitzung } from './register';

function sitzung(): Sitzung {
  const s = new Sitzung();
  wirkungenRegistrieren(s);
  s.registriere('element.wert-setzen', (p, par) => {
    const ziel = finde(p, String(par.element));
    if (ziel) ziel.params[String(par.name)] = par.wert;
  });
  return s;
}

const tiefe = (p: Projekt): unknown => finde(p, 'extrusion-1')?.params.tiefe;
const letzter = (s: Sitzung) => entwuerfe(s.modell()).at(-1);

describe('Entwürfe', () => {
  it('ändert im Entwurf nur den Entwurf und übernimmt danach in den Hauptstand', () => {
    const s = sitzung();
    s.ausfuehren('entwurf.anlegen', { name: 'Dickere Platte' });
    s.ausfuehren('element.wert-setzen', { element: 'extrusion-1', name: 'tiefe', wert: mm(10) });
    expect(tiefe(s.modell())).toEqual(mm(5));
    expect(tiefe(s.angezeigt())).toEqual(mm(10));
    s.ausfuehren('entwurf.uebernehmen');
    expect(tiefe(s.modell())).toEqual(mm(10));
    expect(zustandVon(letzter(s)!)).toBe('uebernommen');
  });

  it('verwirft nur mit Begründung und löscht nichts', () => {
    const s = sitzung();
    s.ausfuehren('entwurf.anlegen', { name: 'Test' });
    const anzahl = entwuerfe(s.modell()).length;
    s.ausfuehren('entwurf.verwerfen', { begruendung: '  ' });
    expect(zustandVon(letzter(s)!)).toBe('offen');
    s.ausfuehren('entwurf.verwerfen', { begruendung: 'zu schwer' });
    expect(entwuerfe(s.modell())).toHaveLength(anzahl);
    expect(zustandVon(letzter(s)!)).toBe('verworfen');
    expect(letzter(s)?.params.begruendung).toBe('zu schwer');
  });
});
