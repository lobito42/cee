// Wirkung der Befehle auf das Modell (ein Projekt als Kopie). Zustand der Oberfläche steht in app.ts.
import type { Groesse } from '../wert/wertfeld';
import { wirkungenRegistrieren as entwuerfeRegistrieren } from './entwurf';
import {
  alle,
  alleMitSkizzen,
  element,
  findeMitSkizzen,
  mm,
  simulationsStudie,
  skizzeVon,
  type Element,
  type Projekt,
} from './projekt';
import type { Sitzung } from './register';

const istGroesse = (x: unknown): x is Groesse =>
  !!x && typeof x === 'object' && 'value' in x && 'unit' in x;

/** Nächste freie ID mit Präfix: `praefix`, dann `praefix-2`, … */
export function neueId(p: Projekt, praefix: string): string {
  const ids = new Set(alleMitSkizzen(p).map((e) => e.id));
  if (!ids.has(praefix)) return praefix;
  let n = 2;
  while (ids.has(`${praefix}-${n}`)) n += 1;
  return `${praefix}-${n}`;
}

function namensZaehler(p: Projekt, typ: string): number {
  return alleMitSkizzen(p).filter((e) => e.type === typ).length + 1;
}

/** Das Teil (mit Schritten), das ein Element enthält. */
export function teilMit(p: Projekt, id: string): Element | undefined {
  return p.content.find(
    (t) => t.id === id || alle(t).some((k) => k.id === id || skizzeVon(k)?.id === id),
  );
}

export function wertSetzen(p: Projekt, id: string, name: string, wert: unknown): boolean {
  const ziel = findeMitSkizzen(p, id);
  if (!ziel) return false;
  if (istGroesse(wert) && wert.value <= 0 && name !== 'eckradius') return false;
  if (name.startsWith('skizze.')) {
    const sk = skizzeVon(ziel);
    if (!sk) return false;
    sk.params[name.slice('skizze.'.length)] = wert;
  } else {
    ziel.params[name] = wert;
  }
  return true;
}

export function wirkungenRegistrieren(s: Sitzung): void {
  entwuerfeRegistrieren(s);

  s.registriere('element.wert-setzen', (p, par) => {
    wertSetzen(p, String(par.element), String(par.name), par.wert);
  });

  s.registriere('skizze.anlegen', (p, par) => {
    if (!par.ebene) return;
    const teil = p.content.find((t) => t.type === 'teil' && !t.params.form);
    if (!teil) return;
    const nr = namensZaehler(p, 'skizze');
    const id = neueId(p, nr === 1 ? 'skizze-1' : `skizze-${nr}`);
    teil.content.push(
      element(id, 'skizze', 'Skizze', { ebene: String(par.ebene), form: 'rechteck' }),
    );
  });

  s.registriere('skizze.rechteck', (p, par) => {
    const sk = findeMitSkizzen(p, String(par.skizze));
    if (!sk) return;
    const mitte = par.mitte as { u: number; v: number };
    sk.params.form = 'rechteck';
    sk.params.laenge = istGroesse(par.laenge) ? par.laenge : mm(Number(par.laenge));
    sk.params.breite = istGroesse(par.breite) ? par.breite : mm(Number(par.breite));
    sk.params.mitte = { x: mm(mitte.u), y: mm(mitte.v) };
  });

  s.registriere('feature.extrudieren', (p, par) => {
    const teil = teilMit(p, String(par.skizze));
    if (!teil) return;
    const index = teil.content.findIndex((k) => k.id === par.skizze);
    const sk = teil.content[index];
    if (!sk || sk.type !== 'skizze' || !sk.params.laenge) return;
    const nr = namensZaehler(p, 'extrusion');
    const dicke = istGroesse(par.dicke) ? par.dicke : mm(10);
    teil.content[index] = element(neueId(p, `extrusion-${nr}`), 'extrusion', `Extrusion ${nr}`, {
      dicke,
      skizze: sk,
    });
  });

  s.registriere('feature.verrunden', (p, par) => {
    const teil = teilMit(p, String(par.ziel));
    if (!teil) return;
    const kanten = (par.kanten as string[] | undefined) ?? [];
    if (!kanten.length) return;
    const nr = namensZaehler(p, 'verrundung');
    const radius = istGroesse(par.radius) ? par.radius : mm(1);
    teil.content.push(
      element(neueId(p, 'verrundung'), 'verrundung', nr === 1 ? 'Verrundung' : `Verrundung ${nr}`, {
        ziel: String(par.ziel),
        radius,
        kanten: [...kanten],
      }),
    );
  });

  const markieren =
    (flag: 'ausgeblendet' | 'verworfen', an: boolean) =>
    (p: Projekt, par: Record<string, unknown>) => {
      const e = findeMitSkizzen(p, String(par.schritt));
      if (!e) return;
      if (an) e.meta[flag] = true;
      else delete e.meta[flag];
    };
  s.registriere('schritt.ausblenden', markieren('ausgeblendet', true));
  s.registriere('schritt.einblenden', markieren('ausgeblendet', false));
  s.registriere('schritt.verwerfen', markieren('verworfen', true));

  s.registriere('baugruppe.anlegen', (p, par) => {
    const ids = (par.teile as string[] | undefined) ?? [];
    const teile = ids
      .map((id) => p.content.find((t) => t.id === id))
      .filter((t): t is Element => !!t);
    if (teile.length < 2 || p.content.some((k) => k.type === 'baugruppe')) return;
    const instanzen = teile.map((t, i) =>
      element(`instanz-${t.id}`, 'instanz', t.meta.name, {
        komponente: t.id,
        position: { x: mm(100 * i), y: mm(0), z: mm(0) },
      }),
    );
    p.content.push(element('baugruppe-1', 'baugruppe', 'Baugruppe 1', {}, instanzen));
  });

  s.registriere('verbindung.anlegen', (p, par) => {
    const baugruppe = p.content.find((k) => k.type === 'baugruppe');
    if (!baugruppe || !par.von || !par.nach) return;
    const finden = (konnektorId: string) => {
      for (const inst of baugruppe.content.filter((k) => k.type === 'instanz')) {
        const teil = p.content.find((t) => t.id === inst.params.komponente);
        const k = teil?.content.find((c) => c.id === konnektorId);
        if (k && teil) return { inst, konnektor: k };
      }
      return undefined;
    };
    const von = finden(String(par.von));
    const nach = finden(String(par.nach));
    if (!von || !nach) return;
    const mover = baugruppe.content.find((k) => k.id === par.mover) ?? von.inst;
    const fix = mover === von.inst ? nach : von;
    const bewegt = mover === von.inst ? von : nach;
    const wert = (g: unknown) => (g as Groesse).value;
    const lage = (inst: Element, k: Element, achse: 'x' | 'y' | 'z') =>
      wert(inst.params.position[achse]) + wert(k.params.position[achse]);
    for (const achse of ['x', 'y', 'z'] as const) {
      const ziel = lage(fix.inst, fix.konnektor, achse);
      mover.params.position[achse] = mm(ziel - wert(bewegt.konnektor.params.position[achse]));
    }
    baugruppe.content.push(
      element(neueId(p, 'verbindung'), 'verbindung', 'Verbindung', {
        von: von.konnektor.meta.name,
        nach: nach.konnektor.meta.name,
        vonId: String(par.von),
        nachId: String(par.nach),
        bewegt: mover.id,
        art: String(par.art ?? 'Fest'),
      }),
    );
  });

  const studie = (p: Projekt): Element => {
    let st = p.content.find((k) => k.type === 'studie');
    if (!st) {
      st = simulationsStudie();
      p.content.push(st);
    }
    return st;
  };
  s.registriere('simulation.lager', (p) => void studie(p));
  s.registriere('simulation.ergebnis', (p) => void studie(p));
  s.registriere('simulation.kraft', (p, par) => {
    const kraft = studie(p).content.find((k) => k.type === 'kraft');
    if (kraft && istGroesse(par.kraft)) kraft.params.kraft = par.kraft;
  });
}
