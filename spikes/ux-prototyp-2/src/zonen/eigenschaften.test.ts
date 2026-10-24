import { describe, expect, it } from 'vitest';
import { App } from '../app';
import { uebersetzer } from '../i18n';
import { finde } from '../modell/element';
import { gemeinsameFelder, gruppenVon } from './eigenschaften';

const neueApp = () => new App(uebersetzer('de'), 'de', 0);

describe('Eigenschaften', () => {
  it('Grundplatte zeigt Länge, Breite, Dicke und Eckradius mit Einheit', () => {
    const app = neueApp();
    const gp = finde(app.dokument(), 'grundplatte');
    const felder = gruppenVon(app, gp as NonNullable<typeof gp>).flatMap((g) => g.felder);
    expect(felder.filter((f) => f.editierbar).map((f) => [f.key, f.text])).toEqual([
      ['laenge', '80 mm'],
      ['breite', '50 mm'],
      ['dicke', '8 mm'],
      ['eckradius', '3 mm'],
    ]);
  });

  it('das Teil ohne Auswahl zeigt Abmessungen, Volumen und Masse', () => {
    const app = neueApp();
    const felder = gruppenVon(app, app.dokument()).flatMap((g) => g.felder);
    expect(felder.find((f) => f.key === 'volumen')?.text).toBe('49,49 cm³');
    expect(felder.find((f) => f.key === 'masse-wert')?.text).toBe('61,36 g');
    expect(felder.find((f) => f.key === 'abmessungen')?.text).toBe('80 × 50 × 38 mm');
  });

  it('mehrere Elemente: nur gemeinsame Felder, Unterschiede als „gemischt“', () => {
    const app = neueApp();
    const gp = finde(app.dokument(), 'grundplatte');
    const steg = finde(app.dokument(), 'steg');
    const { gruppen, gemischt } = gemeinsameFelder(app, [gp, steg] as NonNullable<typeof gp>[]);
    const felder = gruppen.flatMap((g) => g.felder);
    expect(felder.map((f) => f.key)).toEqual(['laenge', 'breite', 'material']);
    expect([...gemischt].sort()).toEqual(['breite', 'laenge']);
    expect(felder.find((f) => f.key === 'laenge')?.text).toBe('gemischt');
    expect(felder.find((f) => f.key === 'material')?.text).toBe('PLA');
  });
});
