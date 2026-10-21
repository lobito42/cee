// Entwürfe (ADR-051): ein Entwurf speichert nur Abweichungen vom Hauptstand, nie eine Kopie (wie Instanzen, ADR-043).
// Er liegt als Element vom Typ „draft“ in `params.entwuerfe` des Projekts; `params.aktiverEntwurf` ist der gezeigte Stand.
import { alle, element, finde, type Element, type Projekt } from './projekt';
import type { Sitzung } from './register';

export type Aenderungen = Record<string, Record<string, unknown>>;
export type EntwurfZustand = 'offen' | 'uebernommen' | 'verworfen';

const kopie = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

export const entwuerfe = (p: Projekt): Element[] =>
  (p.params.entwuerfe as Element[] | undefined) ?? [];

export const zustandVon = (e: Element): EntwurfZustand => e.params.zustand as EntwurfZustand;

export function aktiverEntwurf(p: Projekt): Element | undefined {
  return entwuerfe(p).find((e) => e.id === p.params.aktiverEntwurf);
}

export const aenderungenVon = (e: Element): Aenderungen =>
  (e.params.aenderungen ?? {}) as Aenderungen;

export function neuerEntwurf(id: string, name: string, aenderungen: Aenderungen = {}): Element {
  return element(id, 'draft', name, { zustand: 'offen', aenderungen });
}

function einarbeiten(p: Projekt, aenderungen: Aenderungen): void {
  for (const [id, werte] of Object.entries(aenderungen)) {
    const ziel = finde(p, id);
    if (ziel) Object.assign(ziel.params, kopie(werte));
  }
}

/** Der Stand des Entwurfs: Hauptstand mit den Abweichungen des Entwurfs (eine Kopie). */
export function anwenden(p: Projekt, e: Element): Projekt {
  const m = kopie(p);
  m.params.entwuerfe = [];
  delete m.params.aktiverEntwurf;
  einarbeiten(m, aenderungenVon(e));
  return m;
}

/** Abweichende Parameter je Element zwischen zwei Ständen desselben Projekts. */
export function unterschiede(basis: Projekt, geaendert: Projekt): Aenderungen {
  const ergebnis: Aenderungen = {};
  for (const k of alle(geaendert)) {
    const vorher = finde(basis, k.id);
    if (!vorher) continue;
    for (const [name, wert] of Object.entries(k.params)) {
      if (JSON.stringify(wert) !== JSON.stringify(vorher.params[name])) {
        (ergebnis[k.id] ??= {})[name] = kopie(wert);
      }
    }
  }
  return ergebnis;
}

/** Trägt Abweichungen in den Entwurf ein (überschreibt frühere Werte desselben Parameters). */
export function eintragen(e: Element, neu: Aenderungen): void {
  const bisher = aenderungenVon(e);
  for (const [id, werte] of Object.entries(neu)) bisher[id] = { ...bisher[id], ...werte };
  e.params.aenderungen = bisher;
}

function entwurfIn(p: Projekt, id: unknown): Element | undefined {
  return entwuerfe(p).find((e) => e.id === (id ?? p.params.aktiverEntwurf));
}

export function wirkungenRegistrieren(sitzung: Sitzung): void {
  sitzung.registriere('entwurf.anlegen', (p, par) => {
    const name = typeof par.name === 'string' ? par.name.trim() : '';
    if (!name) return;
    const liste = entwuerfe(p);
    const id = `entwurf-${liste.length + 1}`;
    p.params.entwuerfe = [...liste, neuerEntwurf(id, name)];
    p.params.aktiverEntwurf = id;
  });
  sitzung.registriere('entwurf.wechseln', (p, par) => {
    const ziel = entwurfIn(p, par.entwurf || undefined);
    if (par.entwurf && ziel && zustandVon(ziel) === 'offen') p.params.aktiverEntwurf = ziel.id;
    else if (!par.entwurf) delete p.params.aktiverEntwurf;
  });
  sitzung.registriere('entwurf.uebernehmen', (p, par) => {
    const e = entwurfIn(p, par.entwurf);
    if (!e || zustandVon(e) !== 'offen') return;
    einarbeiten(p, aenderungenVon(e));
    e.params.zustand = 'uebernommen';
    delete p.params.aktiverEntwurf;
  });
  sitzung.registriere('entwurf.verwerfen', (p, par) => {
    const e = entwurfIn(p, par.entwurf);
    const grund = typeof par.begruendung === 'string' ? par.begruendung.trim() : '';
    if (!e || zustandVon(e) !== 'offen' || !grund) return;
    e.params.zustand = 'verworfen'; // nichts wird gelöscht
    e.params.begruendung = grund;
    delete p.params.aktiverEntwurf;
  });
}
