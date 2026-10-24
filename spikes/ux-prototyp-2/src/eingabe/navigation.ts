// Eingabeschicht (ADR-060 Punkt 3): Geräte liefern Gesten, die Belegung steht als Daten in profile.json.
import profile from './profile.json';

export type Geraet = 'maus' | 'trackpad' | 'touch';
export type Aktion = 'drehen' | 'verschieben' | 'zoomen';

interface Regel {
  taste?: number;
  umschalt?: boolean;
  strg?: boolean;
  rad?: boolean;
  wischen?: boolean;
  spreizen?: boolean;
  finger?: number;
  ziehen?: boolean;
}

type Belegung = Partial<Record<Aktion, Regel[]>>;
type Profil = { titel: string } & Record<Geraet, Belegung>;

const alle = profile as unknown as Record<string, Profil>;

export const profilNamen = (): string[] => Object.keys(alle);

function belegung(profilName: string, geraet: Geraet): Belegung {
  const p = alle[profilName] ?? Object.values(alle)[0];
  return (p?.[geraet] ?? {}) as Belegung;
}

/** Welche Navigation löst diese Mausbewegung mit gedrückter Taste aus? (Rechtsklick ohne Bewegung: Kontextmenü) */
export function entscheideNavigation(
  profilName: string,
  geraet: Geraet,
  e: { taste: number; umschalt: boolean; strg: boolean },
): Aktion | null {
  const b = belegung(profilName, geraet);
  for (const aktion of ['verschieben', 'drehen', 'zoomen'] as const) {
    for (const r of b[aktion] ?? []) {
      if (r.taste === e.taste && !!r.umschalt === e.umschalt && !!r.strg === e.strg) return aktion;
    }
  }
  return null;
}

const rundeStufe = (n: number): boolean =>
  n !== 0 && (Math.abs(n) % 100 === 0 || Math.abs(n) % 120 === 0);

/**
 * Mausrad (runde Stufen, nur senkrecht) und Trackpad (kleine oder zweiachsige Werte; Spreizen kommt als Rad
 * mit gedrückter Strg-Taste) unterscheiden; die Belegung bestimmt dann die Wirkung.
 */
export function erkenneWheel(profilName: string, e: WheelEvent): Aktion | null {
  if (e.ctrlKey)
    return (belegung(profilName, 'trackpad').zoomen ?? []).some((r) => r.spreizen)
      ? 'zoomen'
      : null;
  const rad = e.deltaX === 0 && rundeStufe(e.deltaY);
  if (rad) return (belegung(profilName, 'maus').zoomen ?? []).some((r) => r.rad) ? 'zoomen' : null;
  const b = belegung(profilName, 'trackpad');
  const umschalt = e.shiftKey;
  for (const aktion of ['verschieben', 'drehen'] as const) {
    if ((b[aktion] ?? []).some((r) => r.wischen && !!r.umschalt === umschalt)) return aktion;
  }
  return null;
}
