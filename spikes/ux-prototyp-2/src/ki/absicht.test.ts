import { describe, expect, it } from 'vitest';
import { halterProjekt, type Projekt } from '../modell/projekt';
import { erkenne, istSatz } from './absicht';

const projekt = (): Projekt => halterProjekt();

describe('Absichten (Deutsch und Englisch)', () => {
  it('Abrunden am gewählten Steg mit Radius aus dem Satz', () => {
    const v = erkenne('Runde die oberen Kanten mit 2 mm ab', {
      projekt: projekt(),
      auswahl: ['steg'],
    });
    expect(v?.befehle[0]?.id).toBe('feature.verrunden');
    expect(v?.befehle[0]?.parameter.radius).toEqual({ value: 2, unit: 'mm' });
    expect(v?.befehle[0]?.parameter.ziel).toBe('steg');
    expect((v?.befehle[0]?.parameter.kanten as string[]).length).toBe(4);
  });

  it('Abrunden auf Englisch', () => {
    const v = erkenne('Round the top edges of the web with 1.5 mm', {
      projekt: projekt(),
      auswahl: [],
    });
    expect(v?.befehle[0]?.parameter.radius).toEqual({ value: 1.5, unit: 'mm' });
  });

  it('Maß ändern: „Mach die Platte 20 mm länger“ setzt die Länge der Skizze', () => {
    const v = erkenne('Mach die Platte 20 mm länger', { projekt: projekt(), auswahl: [] });
    expect(v?.befehle[0]?.parameter).toEqual({
      element: 'grundplatte',
      name: 'skizze.laenge',
      wert: { value: 100, unit: 'mm' },
    });
    expect(v?.werte[0]).toEqual({ feld: 'laenge', vorher: '80 mm', nachher: '100 mm' });
  });

  it('Maß ändern auf Englisch am gewählten Schritt', () => {
    const v = erkenne('Make it 2 cm thicker', { projekt: projekt(), auswahl: ['grundplatte'] });
    expect(v?.befehle[0]?.parameter.name).toBe('dicke');
    expect(v?.befehle[0]?.parameter.wert).toEqual({ value: 28, unit: 'mm' });
  });

  it('Steg höher macht die Höhe größer', () => {
    const v = erkenne('Der Steg soll 10 mm höher werden', { projekt: projekt(), auswahl: [] });
    expect(v?.befehle[0]?.parameter.wert).toEqual({ value: 40, unit: 'mm' });
  });

  it('ohne Auswahl und ohne genannten Schritt oder bei unbekanntem Satz keine Absicht', () => {
    expect(
      erkenne('Runde die oberen Kanten mit 2 mm ab', { projekt: projekt(), auswahl: [] }),
    ).toBeNull();
    expect(
      erkenne('Bitte male mir ein Bild von einem Hund', { projekt: projekt(), auswahl: ['steg'] }),
    ).toBeNull();
  });

  it('ein Satz hat mehr als drei Wörter', () => {
    expect(istSatz('Runde die oberen Kanten mit 2 mm ab')).toBe(true);
    expect(istSatz('Kanten')).toBe(false);
  });
});
