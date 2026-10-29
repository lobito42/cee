import { describe, expect, it } from 'vitest';
import {
  ANSICHTSLEISTE_KNOEPFE,
  MENUELEISTE_KNOEPFE,
  befehleAusDatei,
  hatFestenOrt,
  kontextaktionen,
  kontextmenue,
  orte,
  passendeVariante,
  untergruppen,
} from './register';
import type { Auswahlart } from './register';

const ARTEN: Auswahlart[] = ['teil', 'schritt', 'kante', 'baugruppe', 'mehrfach', 'keine'];

describe('Register', () => {
  it('Platzhalter haben nur den Ort „suche-folgt“, alle anderen nie', () => {
    const folgt = befehleAusDatei.filter((b) => b.folgt);
    expect(folgt.length).toBeGreaterThan(0);
    for (const b of befehleAusDatei) {
      if (b.folgt) expect(orte(b)).toEqual(['suche-folgt']);
      else {
        expect(orte(b)).toContain('suche');
        expect(orte(b)).not.toContain('suche-folgt');
      }
    }
  });

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

  it('Kontextmenü: acht sichtbar nach Rang, Rest hinter „Mehr“ in Gruppen bis zwölf', () => {
    for (const art of ARTEN) {
      const m = kontextmenue(befehleAusDatei, art);
      const sichtbar = m.sichtbar.flatMap((g) => g.eintraege);
      const mehr = m.mehr.flatMap((g) => g.eintraege);
      expect(sichtbar.length).toBe(Math.min(8, m.kandidaten.length));
      expect(new Set(sichtbar.map((b) => b.id))).toEqual(
        new Set(m.kandidaten.slice(0, 8).map((b) => b.id)),
      );
      expect(mehr.map((b) => b.id).sort()).toEqual(
        m.kandidaten
          .slice(8)
          .map((b) => b.id)
          .sort(),
      );
      const raenge = m.kandidaten.map((b) => b.rang);
      expect(raenge).toEqual([...raenge].sort((a, b) => a - b));
      for (const g of m.mehr) expect(g.eintraege.length).toBeLessThanOrEqual(12);
    }
  });

  it('Kontextmenü: keine Platzhalter, keine Befehle mit festem Ort', () => {
    for (const art of ARTEN) {
      for (const b of kontextmenue(befehleAusDatei, art).kandidaten) {
        expect(b.folgt).toBeFalsy();
        expect(hatFestenOrt(b)).toBe(false);
      }
    }
  });

  it('Kontextaktionen sind die ersten fünf Kandidaten nach Rang', () => {
    const m = kontextmenue(befehleAusDatei, 'schritt');
    const aktionen = kontextaktionen(m);
    expect(aktionen).toHaveLength(5);
    expect(aktionen.map((b) => b.id)).toEqual(m.kandidaten.slice(0, 5).map((b) => b.id));
    const sichtbar = new Set(m.sichtbar.flatMap((g) => g.eintraege.map((b) => b.id)));
    for (const b of aktionen) expect(sichtbar.has(b.id)).toBe(true);
  });

  it('Je Handlung erscheint nur die zur Auswahl passende Variante', () => {
    const handlungen = new Set(befehleAusDatei.flatMap((b) => (b.handlung ? [b.handlung] : [])));
    expect(handlungen.size).toBeGreaterThanOrEqual(3);
    for (const h of handlungen) {
      for (const [art, bezug] of [
        ['schritt', 'element'],
        ['mehrfach', 'mehrfach'],
      ] as const) {
        const gezeigt = befehleAusDatei.filter(
          (b) => b.handlung === h && passendeVariante(befehleAusDatei, b, art),
        );
        expect(gezeigt).toHaveLength(1);
        expect(gezeigt[0]?.bezug).toBe(bezug);
      }
    }
  });

  it('Knöpfe der Menüleiste und der Ansichtsleiste stehen als Befehl im Register', () => {
    const ids = new Set(befehleAusDatei.map((b) => b.id));
    for (const id of [...MENUELEISTE_KNOEPFE, ...ANSICHTSLEISTE_KNOEPFE])
      expect(ids.has(id)).toBe(true);
  });
});
