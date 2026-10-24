import { describe, expect, it } from 'vitest';
import { befehleAusDatei, kontextaktionen, kontextmenue, nachRang, untergruppen } from './register';
import type { Auswahlart } from './register';

const ARTEN: Auswahlart[] = ['teil', 'schritt', 'kante', 'baugruppe', 'mehrfach', 'keine'];

describe('Register', () => {
  it('Befehle haben eindeutige IDs und Ränge, höchstens 15 Kürzel', () => {
    const ids = befehleAusDatei.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    const raenge = befehleAusDatei.map((b) => b.rang);
    expect(new Set(raenge).size).toBe(raenge.length);
    expect(befehleAusDatei.filter((b) => b.kuerzel).length).toBeLessThanOrEqual(15);
  });

  it('Untergruppen haben höchstens zwölf Einträge', () => {
    for (const f of new Set(befehleAusDatei.map((b) => b.familie))) {
      for (const u of untergruppen(befehleAusDatei, f))
        expect(u.eintraege.length).toBeLessThanOrEqual(12);
    }
  });

  it('Kontextmenü: Gruppen bis zwölf, nach Rang, Unwesentliches unter „Mehr“', () => {
    for (const art of ARTEN) {
      const gruppen = kontextmenue(befehleAusDatei, art);
      expect(gruppen.length).toBeGreaterThan(0);
      for (const g of gruppen) {
        expect(g.eintraege.length).toBeLessThanOrEqual(12);
        for (const e of g.eintraege) expect(e.mehr).toBe(!e.befehl.wesentlich);
        const normal = g.eintraege.filter((e) => !e.mehr).map((e) => e.befehl.rang);
        expect(normal).toEqual([...normal].sort((a, b) => a - b));
      }
    }
  });

  it('Kontextaktionen sind die ersten fünf des Menüs nach Rang', () => {
    const gruppen = kontextmenue(befehleAusDatei, 'schritt');
    const aktionen = kontextaktionen(gruppen);
    expect(aktionen).toHaveLength(5);
    expect(aktionen.map((b) => b.id)).toEqual(
      nachRang(gruppen)
        .slice(0, 5)
        .map((b) => b.id),
    );
  });
});
