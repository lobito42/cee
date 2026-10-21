// Ablauf C: Teile zur Baugruppe zusammenfassen, über Verbindungspunkte verbinden, Einrasten.
import { alle, element, finde, mm, type Element, type Projekt } from '../modell/projekt';
import type { Sitzung } from '../modell/register';
import type { Groesse } from '../wert/wertfeld';

const FAKTOR = { mm: 1, cm: 10, m: 1000 } as const;
const groesseInMm = (g: Groesse): number => g.value * FAKTOR[g.unit as keyof typeof FAKTOR];

type T = (schluessel: string) => string;

export const ARTEN = ['fest', 'dreh', 'gleit', 'zylinder', 'kugel', 'eben'];
const ABSTAND_MM = 100;

type Position = { x: Groesse; y: Groesse; z: Groesse };

const hoehe = (g: unknown): number => (g ? groesseInMm(g as Groesse) : 0);

function verbinderVon(teil: Element | undefined): Element[] {
  return (teil?.content ?? []).filter((k) => k.type === 'connector');
}

function instanzZu(p: Projekt, verbinderId: string): Element | undefined {
  return alle(p).find(
    (k) =>
      k.type === 'instance' &&
      verbinderVon(finde(p, String(k.params.komponente))).some((v) => v.id === verbinderId),
  );
}

export function wirkungenRegistrieren(sitzung: Sitzung): void {
  sitzung.registriere('baugruppe.anlegen', (p, par) => {
    const ids = Array.isArray(par.teile) ? par.teile.map(String) : [];
    const teile = ids.map((id) => finde(p, id)).filter((k): k is Element => k?.type === 'part');
    if (teile.length < 2 || finde(p, 'baugruppe-1')) return;
    const instanzen = teile.map((teil, i) =>
      element(`instanz-${teil.id}`, 'instance', teil.meta.name, {
        komponente: teil.id,
        position: { x: mm(i * ABSTAND_MM), y: mm(0), z: mm(0) } satisfies Position,
      }),
    );
    p.content.push(element('baugruppe-1', 'assembly', 'Baugruppe 1', {}, instanzen));
  });
  sitzung.registriere('verbindung.anlegen', (p, par) => {
    const baugruppe = finde(p, 'baugruppe-1');
    const von = typeof par.von === 'string' ? instanzZu(p, par.von) : undefined;
    const nach = typeof par.nach === 'string' ? instanzZu(p, par.nach) : undefined;
    if (!baugruppe || !von || !nach || von === nach || finde(p, 'verbindung-1')) return;
    const art = typeof par.art === 'string' ? par.art : 'fest';
    const versatz = (par.versatz as Groesse | undefined) ?? mm(0);
    baugruppe.content.push(
      element('verbindung-1', 'connection', 'Verbindung 1', {
        von: par.von,
        nach: par.nach,
        art: art === 'fest' ? 'Fest' : art,
        versatz,
      }),
    );
    if (art !== 'fest') return; // andere Arten werden gespeichert, aber nicht bewegt (ap-46)
    // Einrasten: der Verbindungspunkt „von“ liegt auf dem Verbindungspunkt „nach“ (plus Versatz).
    const lage = (i: Element, verbinder: unknown): number => {
      const v = verbinderVon(finde(p, String(i.params.komponente))).find((x) => x.id === verbinder);
      const pos = v?.params.position as Position | undefined;
      return hoehe(pos?.z) + hoehe((i.params.position as Position).z);
    };
    const ziel = lage(nach, par.nach) + groesseInMm(versatz);
    const pos = von.params.position as Position;
    const nachPos = nach.params.position as Position;
    von.params.position = {
      x: nachPos.x,
      y: nachPos.y,
      z: mm(ziel - (lage(von, par.von) - hoehe(pos.z))),
    } satisfies Position;
  });
}

/** Karte mit den Verbindungspunkten beider Teile und dem Auswahlfeld „Art“; der zweite Klick verbindet. */
export function verbindenKarte(e: {
  sitzung: Sitzung;
  t: T;
  flaeche: HTMLElement;
  start: string; // Instanz, von der aus verbunden wird
  fertig: (art: string) => void;
}): void {
  const { sitzung, t } = e;
  const modell = sitzung.modell();
  const baugruppe = finde(modell, 'baugruppe-1');
  if (!baugruppe) return;
  e.flaeche.querySelectorAll('.zustand').forEach((k) => k.remove());
  const karte = document.createElement('section');
  karte.dataset.muster = 'Rückmeldung';
  karte.classList.add('zustand');
  const titel = document.createElement('h3');
  titel.textContent = t('ablauf.punkte');

  const auswahlfeld = document.createElement('label');
  auswahlfeld.dataset.muster = 'Auswahlfeld';
  auswahlfeld.append(`${t('zustand.verbindung.art')} `);
  const art = document.createElement('select');
  for (const id of ARTEN) art.append(new Option(t(`art.${id}`), id));
  auswahlfeld.append(art);

  let erster: string | undefined;
  const punkte = document.createElement('div');
  const instanzen = baugruppe.content.filter((k) => k.type === 'instance');
  const sortiert = [...instanzen].sort((a, b) =>
    a.id === e.start ? -1 : b.id === e.start ? 1 : 0,
  );
  for (const inst of sortiert) {
    const teil = finde(modell, String(inst.params.komponente));
    for (const v of verbinderVon(teil)) {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.befehl = 'verbindung.anlegen';
      b.dataset.verbindungspunkt = v.id;
      b.textContent = `${inst.meta.name} · ${v.meta.name}`;
      b.addEventListener('click', () => {
        if (!erster) {
          erster = v.id;
          b.setAttribute('aria-pressed', 'true');
          return;
        }
        if (erster === v.id) return;
        sitzung.ausfuehren('verbindung.anlegen', {
          von: erster,
          nach: v.id,
          art: art.value,
          versatz: mm(0),
        });
        karte.remove();
        e.fertig(art.value);
      });
      punkte.append(b);
    }
  }
  karte.append(titel, punkte, auswahlfeld);
  e.flaeche.append(karte);
}
