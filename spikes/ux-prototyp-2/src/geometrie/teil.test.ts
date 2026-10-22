import { describe, expect, it } from 'vitest';
import { halterProjekt, kopie, mm, finde, type Element } from '../modell/projekt';
import { DICHTE_G_MM3, teilErgebnis } from './teil';

const halter = (): Element => halterProjekt().content[0] as Element;

const setze = (teil: Element, id: string, name: string, wert: number) => {
  const e = finde(teil, id) as Element;
  if (name.startsWith('skizze.')) (e.params.skizze as Element).params[name.slice(7)] = mm(wert);
  else e.params[name] = mm(wert);
};

const nahe = (ist: number, soll: number) =>
  expect(Math.abs(ist - soll)).toBeLessThanOrEqual(soll * 0.001);

const verrundung = (radius: number, kanten: string[]): Element => ({
  id: 'verrundung',
  type: 'verrundung',
  params: { ziel: 'steg', radius: mm(radius), kanten },
  content: [],
  meta: { name: 'Verrundung' },
});

describe('Volumen des Halters (design.md, ± 0,1 %)', () => {
  it('Ausgangsstand: 49_485,81 mm³, 61,36 g, 80 × 50 × 38 mm', () => {
    const e = teilErgebnis(halter());
    nahe(e.volumen_mm3, 49_485.81);
    nahe(e.masse_g, 61.36);
    expect(e.abmessungen_mm.map((x) => Math.round(x))).toEqual([80, 50, 38]);
  });

  it('Länge 100 mm (Aufgabe G): 57_485,81 mm³, 71,28 g', () => {
    const t = halter();
    setze(t, 'grundplatte', 'skizze.laenge', 100);
    const e = teilErgebnis(t);
    nahe(e.volumen_mm3, 57_485.81);
    nahe(e.masse_g, 71.28);
    expect(e.abmessungen_mm.map((x) => Math.round(x))).toEqual([100, 50, 38]);
  });

  it('Steg 40 mm mit zwei Längskanten R 3 (Aufgabe B): 55_254,04 mm³, 68,52 g', () => {
    const t = halter();
    setze(t, 'steg', 'hoehe', 40);
    t.content.push(verrundung(3, ['steg/k/oben-vorn', 'steg/k/oben-hinten']));
    const e = teilErgebnis(t);
    nahe(e.volumen_mm3, 55_254.04);
    nahe(e.masse_g, 68.52);
    expect(e.abmessungen_mm.map((x) => Math.round(x))).toEqual([80, 50, 48]);
  });

  it('Verwerfen entfernt den Steg aus dem Volumen (− 18_000 mm³), ohne ihn zu löschen', () => {
    const t = halter();
    const vorher = teilErgebnis(t).volumen_mm3;
    (finde(t, 'steg') as Element).meta.verworfen = true;
    nahe(vorher - teilErgebnis(t).volumen_mm3, 18_000);
    expect(finde(t, 'steg')).toBeDefined();
  });

  it('Dicke 12 mm ändert das Volumen gegen die Formel', () => {
    const t = kopie(halter());
    setze(t, 'grundplatte', 'dicke', 12);
    const soll = 80 * 50 * 12 - 4 * 9 * (1 - Math.PI / 4) * 12 - 2 * Math.PI * 9 * 12 + 18_000;
    nahe(teilErgebnis(t).volumen_mm3, soll);
    expect(DICHTE_G_MM3).toBe(1.24e-3);
  });

  it('Radius über der halben Stegbreite ist ein Befund', () => {
    const t = halter();
    t.content.push(verrundung(8, ['steg/k/oben-vorn']));
    expect(teilErgebnis(t).befunde).toEqual([{ schritt: 'verrundung', radius: 8, grenze: 5 }]);
  });
});
