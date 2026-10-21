// Entwürfe in der Oberfläche: Liste in der Kopfzeile, Vergleich, Übernehmen, Verwerfen mit Begründung,
// Ansichten „Ergebnis“ und „Alle Entwürfe“ (ADR-051). Jedes Bedienelement ruft genau einen Befehl auf.
import {
  aenderungenVon,
  aktiverEntwurf,
  entwuerfe,
  zustandVon,
  wirkungenRegistrieren as modellWirkungen,
} from '../modell/entwurf';
import { befehle, type Sitzung } from '../modell/register';
import { finde, type Element } from '../modell/projekt';
import { anzeigen, type Groesse } from '../wert/wertfeld';

type T = (schluessel: string) => string;
type Ansicht = 'ergebnis' | 'alle';

const FAKTOR = { mm: 1, cm: 10, m: 1000 } as const;
const inMm = (g: Groesse): number => g.value * FAKTOR[g.unit as keyof typeof FAKTOR];

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  muster?: string,
  klasse?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (muster) e.dataset.muster = muster;
  if (klasse) e.className = klasse;
  return e;
}

export interface Entwuerfe {
  /** Auswahlfeld für die Kopfzeile: Stand, Liste, Vergleichen. */
  kopf: HTMLElement;
  /** Umschalter und Liste für das linke Panel. */
  baumAbschnitt: () => HTMLElement;
  aktualisieren: () => void;
  ansicht: (a: Ansicht) => void;
  listeOeffnen: () => void;
  anlegenOeffnen: () => void;
  vergleichen: () => void;
}

export function entwuerfeAufbauen(e: {
  sitzung: Sitzung;
  t: T;
  flaeche: HTMLElement;
  ausloesen: (id: string, parameter?: Record<string, unknown>) => void;
  geist: (maße: { l: number; b: number; h: number } | undefined) => void;
}): Entwuerfe {
  const { sitzung, t, ausloesen } = e;
  modellWirkungen(sitzung);
  sitzung.registriere('ansicht.ergebnis', () => {});
  sitzung.registriere('ansicht.alle-entwuerfe', () => {});
  let ansicht: Ansicht = 'ergebnis';

  const knopf = (id: string, text?: string): HTMLButtonElement => {
    const b = el('button');
    b.type = 'button';
    b.dataset.befehl = id;
    b.textContent = text ?? t(befehle.find((x) => x.id === id)?.titel ?? id);
    return b;
  };

  // Kopfzeile: Stand als Knopf, darunter die Liste (nicht modal).
  const kopf = el('div', 'Auswahlfeld', 'entwurfswahl');
  const stand = knopf('entwurf.wechseln', t('app.stand.haupt'));
  stand.classList.add('stand');
  const vergleichen = knopf('entwurf.vergleichen');
  const liste = el('div', 'Auswahlfeld', 'entwurfsliste');
  liste.hidden = true;
  kopf.append(stand, vergleichen, liste);

  const schliesseListe = (): void => {
    liste.hidden = true;
  };
  vergleichen.addEventListener('click', () => ausloesen('entwurf.vergleichen'));
  stand.addEventListener('click', () => {
    ausloesen('entwurf.wechseln');
  });

  function listeBauen(namensfeld: boolean): void {
    const projekt = sitzung.modell();
    const aktiv = aktiverEntwurf(projekt);
    const zeilen: HTMLElement[] = [];
    const haupt = knopf('entwurf.wechseln', t('app.stand.haupt'));
    haupt.dataset.entwurf = '';
    haupt.setAttribute('aria-selected', String(!aktiv));
    haupt.addEventListener('click', () => {
      ausloesen('entwurf.wechseln', { entwurf: '' });
      schliesseListe();
    });
    zeilen.push(haupt);
    for (const d of entwuerfe(projekt).filter((x) => zustandVon(x) === 'offen')) {
      const b = knopf('entwurf.wechseln', d.meta.name);
      b.dataset.entwurf = d.id;
      b.setAttribute('aria-selected', String(aktiv?.id === d.id));
      b.addEventListener('click', () => {
        ausloesen('entwurf.wechseln', { entwurf: d.id });
        schliesseListe();
      });
      zeilen.push(b);
    }
    if (namensfeld) {
      const feld = el('label', 'Textfeld');
      const eingabe = el('input');
      eingabe.type = 'text';
      eingabe.dataset.befehl = 'entwurf.anlegen';
      eingabe.placeholder = t('entwurf.platzhalter');
      eingabe.setAttribute('aria-label', t('befehl.entwurf.anlegen'));
      eingabe.addEventListener('keydown', (ev) => {
        if (ev.key !== 'Enter' || !eingabe.value.trim()) return;
        ev.preventDefault();
        ausloesen('entwurf.anlegen', { name: eingabe.value.trim() });
        schliesseListe();
      });
      feld.append(eingabe);
      zeilen.push(feld);
      liste.replaceChildren(...zeilen);
      eingabe.focus();
      return;
    }
    const neu = knopf('entwurf.anlegen');
    neu.addEventListener('click', () => ausloesen('entwurf.anlegen'));
    zeilen.push(neu);
    liste.replaceChildren(...zeilen);
  }

  const schliesseKarte = (): void =>
    e.flaeche.querySelectorAll('[data-entwurfskarte]').forEach((k) => k.remove());

  /** Geister-Vorschau: der Körper des Entwurfs über dem Hauptstand. */
  function geistZeigen(d: Element | undefined): void {
    if (!d) return e.geist(undefined);
    const projekt = sitzung.modell();
    for (const [id, werte] of Object.entries(aenderungenVon(d))) {
      const tiefe = werte.tiefe as Groesse | undefined;
      const skizze = finde(projekt, String(finde(projekt, id)?.params.skizze ?? ''));
      const l = skizze?.params.laenge as Groesse | undefined;
      const b = skizze?.params.breite as Groesse | undefined;
      if (tiefe && l && b) return e.geist({ l: inMm(l), b: inMm(b), h: inMm(tiefe) });
    }
    e.geist(undefined);
  }

  function karteBauen(): void {
    schliesseKarte();
    const projekt = sitzung.modell();
    const d = aktiverEntwurf(projekt);
    if (!d) return;
    const karte = el('section', 'Vergleich', 'zustand');
    karte.dataset.entwurfskarte = '';
    const titel = el('h3');
    titel.textContent = d.meta.name;
    const tabelle = el('div', 'Tabelle');
    for (const [id, werte] of Object.entries(aenderungenVon(d))) {
      const k = finde(projekt, id);
      for (const [name, nachher] of Object.entries(werte)) {
        const vorher = k?.params[name];
        const zeile = el('p');
        const was = el('span');
        was.textContent = `${k?.meta.name ?? id} · ${t(`ablauf.${name}`)}`;
        const von = el('span');
        von.dataset.vorher = '';
        von.textContent = anzeigen(vorher as Groesse);
        const nach = el('strong');
        nach.dataset.nachher = '';
        nach.textContent = anzeigen(nachher as Groesse);
        zeile.append(was, von, nach);
        tabelle.append(zeile);
      }
    }
    const grund = el('label', 'Textfeld');
    const eingabe = el('input');
    eingabe.type = 'text';
    eingabe.dataset.befehl = 'entwurf.verwerfen';
    eingabe.placeholder = t('entwurf.begruendungBeispiel');
    eingabe.setAttribute('aria-label', t('entwurf.begruendung'));
    grund.append(eingabe);
    const uebernehmen = knopf('entwurf.uebernehmen');
    uebernehmen.dataset.hauptaktion = '';
    uebernehmen.addEventListener('click', () => ausloesen('entwurf.uebernehmen'));
    const verwerfen = knopf('entwurf.verwerfen');
    verwerfen.disabled = true; // ohne Begründung nicht auslösbar
    const verwerfenAusloesen = (): void => {
      if (!eingabe.value.trim()) return;
      ausloesen('entwurf.verwerfen', { begruendung: eingabe.value.trim() });
    };
    eingabe.addEventListener('input', () => {
      verwerfen.disabled = !eingabe.value.trim();
    });
    eingabe.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') verwerfenAusloesen();
    });
    verwerfen.addEventListener('click', verwerfenAusloesen);
    karte.append(titel, tabelle, uebernehmen, grund, verwerfen);
    e.flaeche.append(karte);
    geistZeigen(d);
  }

  function aktualisieren(): void {
    const projekt = sitzung.modell();
    const aktiv = aktiverEntwurf(projekt);
    stand.textContent = aktiv ? aktiv.meta.name : t('app.stand.haupt');
    vergleichen.hidden = !aktiv;
    if (!aktiv) {
      schliesseKarte();
      geistZeigen(undefined);
    } else if (e.flaeche.querySelector('[data-entwurfskarte]')) {
      karteBauen();
    }
  }

  function baumAbschnitt(): HTMLElement {
    const projekt = sitzung.modell();
    const box = el('div', 'Auswahlfeld', 'entwurfsansicht');
    box.setAttribute('role', 'group');
    for (const [id, a] of [
      ['ansicht.ergebnis', 'ergebnis'],
      ['ansicht.alle-entwuerfe', 'alle'],
    ] as const) {
      const b = knopf(id);
      b.setAttribute('aria-selected', String(ansicht === a));
      b.addEventListener('click', () => ausloesen(id));
      box.append(b);
    }
    const sichtbar = entwuerfe(projekt).filter(
      (d) => ansicht === 'alle' || zustandVon(d) === 'offen',
    );
    const tabelle = el('ul', 'Tabelle');
    for (const d of sichtbar) {
      const li = el('li');
      li.dataset.entwurfEintrag = d.id;
      const feld = (art: string, text: string): HTMLElement => {
        const s = el('span');
        s.dataset.feld = art;
        s.textContent = text;
        return s;
      };
      li.append(feld('name', d.meta.name), feld('zustand', t(`entwurf.zustand.${zustandVon(d)}`)));
      if (typeof d.params.begruendung === 'string') {
        li.append(feld('begruendung', d.params.begruendung));
      }
      tabelle.append(li);
    }
    const abschnitt = el('div');
    abschnitt.append(box, tabelle);
    return abschnitt;
  }

  return {
    kopf,
    baumAbschnitt,
    aktualisieren,
    ansicht: (a) => {
      ansicht = a;
    },
    listeOeffnen: () => {
      const warOffen = !liste.hidden;
      listeBauen(false);
      liste.hidden = warOffen;
    },
    anlegenOeffnen: () => {
      listeBauen(true);
      liste.hidden = false;
    },
    vergleichen: karteBauen,
  };
}
