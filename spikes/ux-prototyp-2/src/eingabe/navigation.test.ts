import { describe, expect, it } from 'vitest';
import { entscheideNavigation, profilNamen } from './navigation';

describe('Navigationsprofile', () => {
  const [erstes, zweites] = profilNamen();

  it('es gibt mindestens zwei Profile', () => {
    expect(profilNamen().length).toBeGreaterThanOrEqual(2);
  });

  it('erstes Profil: rechte Taste dreht, mittlere und Umschalt+rechte verschieben', () => {
    const e = { umschalt: false, strg: false };
    expect(entscheideNavigation(erstes as string, 'maus', { taste: 2, ...e })).toBe('drehen');
    expect(entscheideNavigation(erstes as string, 'maus', { taste: 1, ...e })).toBe('verschieben');
    expect(
      entscheideNavigation(erstes as string, 'maus', { taste: 2, umschalt: true, strg: false }),
    ).toBe('verschieben');
    expect(entscheideNavigation(erstes as string, 'maus', { taste: 0, ...e })).toBeNull();
  });

  it('zweites Profil: dieselbe mittlere Taste wirkt anders', () => {
    const e = { umschalt: false, strg: false };
    expect(entscheideNavigation(zweites as string, 'maus', { taste: 1, ...e })).toBe('drehen');
    expect(
      entscheideNavigation(zweites as string, 'maus', { taste: 1, umschalt: false, strg: true }),
    ).toBe('verschieben');
  });
});
