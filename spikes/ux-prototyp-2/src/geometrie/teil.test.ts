import { describe, expect, it } from 'vitest';
import { halter, sensorgehaeuse } from '../modell/beispiele';
import { finde, mm } from '../modell/element';
import { befunde, ergebnisVon } from './teil';

const formel = (L = 80, B = 50, T = 8, r = 3, d = 6, l = 60, b = 10, h = 30) =>
  L * B * T - 4 * r * r * (1 - Math.PI / 4) * T - 2 * Math.PI * (d / 2) ** 2 * T + l * b * h;

describe('Halter', () => {
  it('Ausgangsvolumen 49,49 cm³ und Masse 61,36 g', () => {
    const e = ergebnisVon(halter());
    expect(e.volumen_mm3).toBeCloseTo(formel(), 3);
    expect(e.volumen_mm3 / 1000).toBeCloseTo(49.49, 2);
    expect(e.masse_g).toBeCloseTo(61.36, 2);
    expect(e.abmessungen_mm).toEqual([80, 50, 38]);
  });

  it('Steg 40 mm hoch: 55,49 cm³', () => {
    const h = halter();
    const steg = finde(h, 'steg');
    if (steg) steg.params.hoehe = mm(40);
    expect(ergebnisVon(h).volumen_mm3).toBeCloseTo(formel(80, 50, 8, 3, 6, 60, 10, 40), 3);
  });

  it('Grundplatte 100 mm lang: 57,49 cm³', () => {
    const h = halter();
    const gp = finde(h, 'grundplatte');
    if (gp) gp.params.laenge = mm(100);
    expect(ergebnisVon(h).volumen_mm3 / 1000).toBeCloseTo(57.49, 2);
  });

  it('verworfene Bohrungen zählen nicht zum Abzug', () => {
    const h = halter();
    const b = finde(h, 'bohrungen');
    if (b) b.meta.verworfen = true;
    expect(ergebnisVon(h).volumen_mm3).toBeCloseTo(formel() + 2 * Math.PI * 9 * 8, 3);
  });
});

describe('Befunde', () => {
  it('zu große Bohrung ist ein Befund mit letztem gültigen Stand', () => {
    const h = halter();
    const b = finde(h, 'bohrungen');
    if (b) b.params.durchmesser = mm(55);
    expect(befunde(h).map((x) => x.elementId)).toEqual(['bohrungen']);
    expect(ergebnisVon(h).volumen_mm3).toBeCloseTo(formel(), 3);
  });

  it('Steg ohne Höhe ist fehlerhaft, der Rest bleibt', () => {
    const h = halter();
    const s = finde(h, 'steg');
    if (s) s.params.hoehe = mm(0);
    expect(befunde(h).map((x) => x.elementId)).toEqual(['steg']);
  });
});

describe('Sensorgehäuse', () => {
  it('Schale und Deckel liefern Körper', () => {
    const e = ergebnisVon(sensorgehaeuse());
    expect(e.koerper.map((k) => k.elementId).sort()).toEqual(['platte', 'schale']);
    expect(e.volumen_mm3).toBeCloseTo(80 * 50 * 30 - 76 * 46 * 28 + 80 * 50 * 4, 3);
  });
});
