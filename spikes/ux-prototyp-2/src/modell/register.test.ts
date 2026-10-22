import { describe, expect, it } from 'vitest';
import de from '../i18n/de.json';
import en from '../i18n/en.json';
import { befehle, Sitzung } from './register';
import { alleMitSkizzen, finde, gehaeuseProjekt, halterProjekt, mm } from './projekt';

const hat = (baum: unknown, pfad: string): boolean =>
  pfad
    .split('.')
    .reduce<unknown>(
      (n, k) => (n && typeof n === 'object' ? (n as Record<string, unknown>)[k] : undefined),
      baum,
    ) !== undefined;

describe('Befehlsregister', () => {
  it('hat eindeutige IDs nach Muster und Titel in de und en', () => {
    const ids = befehle.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const b of befehle) {
      expect(b.id).toMatch(/^[a-z]+(\.[a-z-]+)+$/);
      expect(hat(de, b.titel)).toBe(true);
      expect(hat(en, b.titel)).toBe(true);
    }
  });
  it('hat weniger als 15 Kürzel (Entwurf: höchstens 10)', () => {
    const n = befehle.filter((b) => b.kuerzel).length;
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(10);
  });
  it('gibt Zahlen eine Dimension und Einheit', () => {
    for (const b of befehle)
      for (const p of Object.values(b.parameter ?? {}))
        if (!p.typ) expect(p.dimension && p.einheit).toBeTruthy();
  });
});

describe('Sitzung', () => {
  const setze = (id: string, wert: number) => (projekt: ReturnType<typeof halterProjekt>) => {
    const e = finde(projekt, id);
    if (e) e.params.dicke = mm(wert);
  };

  it('schreibt jeden Befehl mit Quelle ins Protokoll', () => {
    const s = new Sitzung();
    s.registriere('element.wert-setzen', setze('grundplatte', 9));
    s.ausfuehren('element.wert-setzen', { wert: mm(8) });
    s.ausfuehren('element.wert-setzen', {}, 'ki');
    expect(s.protokoll.map((p) => p.quelle)).toEqual(['mensch', 'ki']);
  });
  it('nimmt zurück und wiederholt', () => {
    const s = new Sitzung();
    s.registriere('element.wert-setzen', setze('grundplatte', 9));
    s.ausfuehren('element.wert-setzen');
    expect(finde(s.modell(), 'grundplatte')?.params.dicke).toEqual(mm(9));
    s.ausfuehren('bearbeiten.rueckgaengig');
    expect(finde(s.modell(), 'grundplatte')?.params.dicke).toEqual(mm(8));
    s.ausfuehren('bearbeiten.wiederholen');
    expect(finde(s.modell(), 'grundplatte')?.params.dicke).toEqual(mm(9));
  });
  it('lehnt unbekannte Befehle ab', () => {
    expect(() => new Sitzung().registriere('gibt.es-nicht', () => undefined)).toThrow();
  });
});

describe('Testprojekte', () => {
  it('Halter und Sensorgehäuse haben die Elementform mit Größen', () => {
    for (const p of [halterProjekt(), gehaeuseProjekt()]) {
      for (const e of alleMitSkizzen(p)) {
        expect(Object.keys(e).sort()).toEqual(['content', 'id', 'meta', 'params', 'type']);
      }
    }
    const schritte = halterProjekt().content[0]?.content.map((e) => e.meta.name);
    expect(schritte).toEqual(['Ursprung', 'Grundplatte', 'Steg', 'Bohrungen']);
    expect(gehaeuseProjekt().content.map((e) => e.meta.name)).toEqual(['Gehäuse', 'Deckel']);
    expect(finde(halterProjekt(), 'grundplatte')?.params.dicke).toEqual({ value: 8, unit: 'mm' });
  });
});
