import { describe, expect, it } from 'vitest';
import { anzeigen, lesen, ziehen, type Dimension } from './wertfeld';

const mm = (eingabe: string, standard: 'mm' | 'cm' | 'm' = 'mm') => {
  const r = lesen(eingabe, standard);
  return r.ok ? r.groesse.value : r.fehler;
};
const kraft = (eingabe: string) => {
  const r = lesen(eingabe, 'mm', 'kraft' satisfies Dimension);
  return r.ok ? r.groesse : r.fehler;
};

describe('Wertfeld lesen', () => {
  it('liest Zahl ohne Einheit in der Standard-Einheit', () => {
    expect(mm('80')).toBe(80);
    expect(mm('8', 'cm')).toBe(80);
  });
  it('liest 8 cm als 80 mm', () => {
    expect(mm('8 cm')).toBe(80);
  });
  it('liest 0,08 m mit Dezimalkomma', () => {
    expect(mm('0,08 m')).toBe(80);
  });
  it('liest Dezimalpunkt', () => {
    expect(mm('2.5 mm')).toBe(2.5);
  });
  it('rechnet 60 + 20', () => {
    expect(mm('60 + 20')).toBe(80);
  });
  it('rechnet Punkt vor Strich und Klammern', () => {
    expect(mm('2 * (10 + 5)')).toBe(30);
    expect(mm('10 + 2 × 5')).toBe(20);
  });
  it('mischt Einheiten in Formeln', () => {
    expect(mm('5 cm + 20 mm')).toBe(70);
  });
  it('lehnt 5 kg als falsche Dimension ab', () => {
    expect(mm('5 kg')).toBe('wert.fehler.dimension');
  });
  it('lehnt Text ab', () => {
    expect(mm('abc')).toBe('wert.fehler.nicht-lesbar');
    expect(mm('')).toBe('wert.fehler.nicht-lesbar');
  });
  it('lehnt unbekannte Einheit und offene Klammer ab', () => {
    expect(mm('5 foo')).toBe('wert.fehler.nicht-lesbar');
    expect(mm('(5 + 3')).toBe('wert.fehler.nicht-lesbar');
  });
  it('lehnt Teilung durch null ab', () => {
    expect(mm('5 / 0')).toBe('wert.fehler.teilung');
  });
});

describe('Wertfeld Kraft', () => {
  it('liest 0,1 kN als 100 N', () => {
    expect(kraft('0,1 kN')).toEqual({ value: 100, unit: 'N' });
  });
  it('liest 200 ohne Einheit als 200 N', () => {
    expect(kraft('200')).toEqual({ value: 200, unit: 'N' });
  });
  it('rechnet 100 N + 0,1 kN', () => {
    expect(kraft('100 N + 0,1 kN')).toEqual({ value: 200, unit: 'N' });
  });
  it('lehnt eine Länge im Kraftfeld und eine Kraft im Längenfeld ab', () => {
    expect(kraft('5 mm')).toBe('wert.fehler.dimension');
    expect(mm('5 N')).toBe('wert.fehler.dimension');
  });
});

describe('Wertfeld anzeigen und ziehen', () => {
  it('zeigt höchstens zwei Nachkommastellen ohne Nullen am Ende', () => {
    expect(anzeigen({ value: 80, unit: 'mm' }, 'en')).toBe('80 mm');
    expect(anzeigen({ value: 2.504, unit: 'mm' }, 'en')).toBe('2.5 mm');
    expect(anzeigen({ value: 2.5, unit: 'mm' }, 'de')).toBe('2,5 mm');
  });
  it('zieht in 1-mm-Schritten', () => {
    expect(ziehen({ value: 5, unit: 'mm' }, 3).value).toBe(8);
  });
});
