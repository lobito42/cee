// Arbeitsfläche: Kopfzeile, Featurebaum, 3D-Fläche, Eigenschaften, Werkzeugleiste, Nachjustieren, Rückmeldung.
// Jedes Bedienelement ruft genau einen Befehl auf (data-befehl); Bausteine tragen data-muster.
import { befehle, type Sitzung } from '../modell/register';
import { alle, finde, mm, type Element } from '../modell/projekt';
import { anzeigen } from '../wert/wertfeld';
import { Flaeche3d } from './viewport';
import { skizzenablaufAufbauen, skizzenWirkungenRegistrieren } from './skizzenablauf';
import { berechnung, sucheAufbauen } from './suche';
import {
  GRENZE_MM,
  verrundenKarte,
  wirkungenRegistrieren as verrundungWirkungen,
  zielTeil,
} from './verrundung';
import { entwuerfeAufbauen } from './entwuerfe';
import { verbindenKarte, wirkungenRegistrieren as baugruppeWirkungen } from './baugruppe';
import { wertfeldBauen } from './skizzenablauf';
import type { Groesse } from '../wert/wertfeld';
import './ui.css';

type T = (schluessel: string) => string;

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

function knopf(t: T, id: string): HTMLButtonElement {
  const b = el('button');
  b.type = 'button';
  b.dataset.befehl = id;
  b.textContent = t(befehle.find((x) => x.id === id)?.titel ?? id);
  return b;
}

export interface Oberflaeche {
  auswahl: () => string[];
  zeichnen: () => void;
  waehlen: (ids: string[]) => void;
  /** Elemente, in die die Testzustände Inhalt setzen. */
  flaeche: HTMLElement;
  suche: HTMLInputElement;
  stand: HTMLElement;
  nachjustieren: HTMLElement;
  rueckmeldung: HTMLElement;
}

export function aufbauen(wurzel: HTMLElement, sitzung: Sitzung, t: T): Oberflaeche {
  let auswahl: string[] = [];
  sitzung.registriere('auswahl.setzen', () => {});
  const waehlen = (ids: string[]): void => {
    sitzung.ausfuehren('auswahl.setzen', { elemente: ids });
    auswahl = ids;
    zeichnen();
  };

  // Kopfzeile
  const kopf = el('header', undefined, 'kopfzeile');
  const bereiche = el('div', 'Arbeitsbereiche');
  const reiter = el('button');
  reiter.type = 'button';
  reiter.dataset.befehl = 'ansicht.einpassen';
  reiter.setAttribute('aria-current', 'page');
  reiter.textContent = t('app.arbeitsbereich');
  bereiche.append(reiter);
  const stand = el('span'); // Platzhalter; der Entwurfs-Stand ersetzt ihn (siehe unten)
  const suche = el('input', 'Suche', 'suche');
  suche.type = 'search';
  suche.dataset.befehl = 'suche.oeffnen';
  suche.placeholder = t('app.suche');
  suche.setAttribute('aria-label', t('befehl.suche.oeffnen'));
  kopf.append(bereiche, stand, suche);

  // Panels
  const baum = el('nav', 'Eigenschaften-Panel', 'baum');
  baum.dataset.panel = 'featurebaum';
  const flaeche = el('main', 'Auswahl im Modell', 'flaeche3d');
  const canvas = el('canvas');
  flaeche.append(canvas);
  const eigenschaften = el('aside', 'Eigenschaften-Panel');
  eigenschaften.dataset.panel = 'eigenschaften';

  // Werkzeugleiste: genau fünf
  const leiste = el('div', 'Werkzeugleiste', 'werkzeugleiste');
  for (const id of ['auswaehlen', 'messen', 'schnitt', 'skizze', 'fragen']) {
    const b = knopf(t, `werkzeug.${id}`);
    b.addEventListener('click', () => {
      sitzung.ausfuehren(`werkzeug.${id}`);
      leiste.querySelectorAll('button').forEach((x) => x.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
      const label = el('span');
      label.textContent = t('app.nachjustieren');
      const wert = el('span');
      wert.textContent = b.textContent ?? '';
      nachjustieren.replaceChildren(label, wert);
    });
    leiste.append(b);
  }
  leiste.querySelector('button')?.setAttribute('aria-current', 'true');

  const nachjustieren = el('div', 'Letzte Aktion nachjustieren', 'nachjustieren');
  const rueckmeldung = el('div', 'Rückmeldung', 'rueckmeldung');
  rueckmeldung.setAttribute('role', 'status');
  rueckmeldung.textContent = t('app.bereit');

  wurzel.replaceChildren(kopf, baum, flaeche, eigenschaften, leiste, nachjustieren, rueckmeldung);

  /** Gemeinsamer Weg für Suche, Kontextaktionen und Kürzel: genau ein Befehl aus dem Register. */
  const ausloesen = (id: string, parameter: Record<string, unknown> = {}): void => {
    if (id.startsWith('werkzeug.')) {
      leiste.querySelector<HTMLButtonElement>(`[data-befehl="${id}"]`)?.click();
      return;
    }
    if (id === 'feature.extrudieren' && !parameter.tiefe) {
      sitzung.ausfuehren(id, parameter); // Start im Protokoll; die Wirkung folgt mit der Tiefe
      ablauf.extrusionVorschau();
      return;
    }
    if (id === 'feature.verrunden' && !parameter.radius) {
      sitzung.ausfuehren(id, parameter); // Start im Protokoll; die Wirkung folgt mit Kanten und Radius
      const teil = zielTeil(sitzung.modell(), auswahl);
      if (teil) verrundenKarte({ sitzung, t, flaeche, teil: teil.id, fertig: zeichnen });
      return;
    }
    if (id === 'ansicht.ergebnis' || id === 'ansicht.alle-entwuerfe') {
      entw.ansicht(id === 'ansicht.ergebnis' ? 'ergebnis' : 'alle');
    } else if (id === 'entwurf.anlegen' && !parameter.name) {
      sitzung.ausfuehren(id, parameter); // Start im Protokoll; der Name folgt im Textfeld
      entw.anlegenOeffnen();
      return;
    } else if (id === 'entwurf.wechseln' && parameter.entwurf === undefined) {
      sitzung.ausfuehren(id, parameter);
      entw.listeOeffnen();
      return;
    } else if (
      id === 'entwurf.vergleichen' ||
      (id === 'entwurf.verwerfen' && !parameter.begruendung)
    ) {
      sitzung.ausfuehren(id, parameter);
      entw.vergleichen();
      return;
    }
    if (id === 'baugruppe.anlegen' && !parameter.teile) parameter = { teile: [...auswahl] };
    if (id === 'verbindung.anlegen' && !parameter.von) {
      sitzung.ausfuehren(id, parameter); // Start im Protokoll; die Wirkung folgt mit den Verbindungspunkten
      verbindenKarte({
        sitzung,
        t,
        flaeche,
        start: auswahl[0] ?? '',
        fertig: (art) => {
          nachjustieren.replaceChildren(
            Object.assign(el('span'), { textContent: t('app.nachjustieren') }),
            Object.assign(el('span'), {
              textContent: `${t('zustand.verbindung.art')}: ${t(`art.${art}`)} · ${t('ablauf.versatz')}: ${anzeigen(mm(0))}`,
            }),
          );
          zeichnen();
        },
      });
      return;
    }
    sitzung.ausfuehren(id, parameter);
    if (id === 'suche.oeffnen') suche.focus();
    if (id === 'thema.umschalten') {
      const dunkel = document.documentElement.dataset.thema === 'dunkel';
      document.documentElement.dataset.thema = dunkel ? 'hell' : 'dunkel';
    }
    zeichnen();
  };
  sucheAufbauen({ feld: suche, t, projekt: () => sitzung.modell(), ausloesen, waehlen });

  // Einzeltasten sowie Rückgängig/Wiederholen nach den Kürzeln im Register.
  document.addEventListener('keydown', (ev) => {
    const ziel = ev.target;
    if (ziel instanceof HTMLElement && ziel.matches('input,textarea,select')) return;
    const mod = ev.metaKey || ev.ctrlKey;
    const taste = ev.key.toUpperCase();
    const b = befehle.find((x) => {
      const teile = x.kuerzel?.split('+');
      if (!teile || teile.at(-1) !== taste) return false;
      return teile.includes('Mod') === mod && teile.includes('Shift') === ev.shiftKey;
    });
    if (b && b.id !== 'suche.oeffnen') {
      ev.preventDefault();
      ausloesen(b.id);
    }
  });

  const f3d = new Flaeche3d(canvas);
  const entw = entwuerfeAufbauen({
    sitzung,
    t,
    flaeche,
    ausloesen,
    geist: (maße) => f3d.geist(maße),
  });
  stand.replaceWith(entw.kopf);
  skizzenWirkungenRegistrieren(sitzung);
  verrundungWirkungen(sitzung);
  baugruppeWirkungen(sitzung);
  const ablauf = skizzenablaufAufbauen({
    sitzung,
    t,
    flaeche,
    f3d,
    nachjustieren,
    waehlen,
    zeichnen: () => zeichnen(),
  });
  // Skizze anlegen aus Werkzeugleiste, Kürzel oder Karte ohne Ebene: Ebenenwahl öffnen.
  document.addEventListener('click', (ev) => {
    const ziel = ev.target instanceof HTMLElement ? ev.target.closest('[data-befehl]') : null;
    if (!(ziel instanceof HTMLElement)) return;
    if (ziel.dataset.befehl === 'werkzeug.skizze') ablauf.ebenenWahl();
    else if (ziel.dataset.befehl === 'skizze.anlegen' && !ziel.dataset.ebene) ablauf.ebenenWahl();
  });

  function zeile(k: Element): HTMLLIElement {
    const li = el('li');
    const b = el('button');
    b.type = 'button';
    b.dataset.befehl = 'auswahl.setzen';
    b.dataset.element = k.id;
    b.setAttribute('aria-selected', String(auswahl.includes(k.id)));
    b.textContent = k.meta.name;
    b.addEventListener('click', (ev) => waehlen(ev.shiftKey ? [...auswahl, k.id] : [k.id]));
    li.append(b);
    if (berechnung(k) === 'fehlerhaft') {
      const status = el('span', 'Statusanzeige', 'status status-fehler');
      status.append(
        Object.assign(el('span', undefined, 'symbol'), { textContent: t('ablauf.symbol') }),
        Object.assign(el('span', undefined, 'wort'), {
          textContent: t('suche.berechnung.fehlerhaft'),
        }),
      );
      li.append(status);
    }
    if (k.content.length) {
      const ul = el('ul');
      ul.append(...k.content.map(zeile));
      li.append(ul);
    }
    return li;
  }

  /** Befehle, die zur Auswahl passen; dieselben wie in der Suche. */
  function kontextaktionen(k: Element): HTMLElement {
    const ids =
      k.type === 'sketch'
        ? ['feature.extrudieren', 'ki.fragen']
        : k.type === 'instance'
          ? ['verbindung.anlegen', 'ki.fragen']
          : ['part', 'extrusion'].includes(k.type)
            ? ['feature.verrunden', 'feature.schale', 'ki.fragen']
            : ['ki.fragen'];
    const box = el('div', 'Kontextaktionen');
    for (const id of ids) {
      const b = knopf(t, id);
      b.addEventListener('click', () => ausloesen(id));
      box.append(b);
    }
    return box;
  }

  function zeichnen(): void {
    const projekt = sitzung.angezeigt();
    const kopfzeile = el('h2');
    kopfzeile.textContent = t('app.baum');
    const ul = el('ul');
    ul.append(...projekt.content.map(zeile));
    baum.replaceChildren(kopfzeile, ul, entw.baumAbschnitt());
    entw.aktualisieren();

    const titel = el('h2');
    titel.textContent = t('app.eigenschaften');
    eigenschaften.replaceChildren(titel);
    // Nur Elemente des Modells; Kanten und andere Flächenobjekte stehen nicht im Panel.
    const vorhanden = auswahl.flatMap((id) => finde(projekt, id) ?? []);
    const gewaehlt = vorhanden.length === 1 ? vorhanden[0] : undefined;
    if (vorhanden.length > 1) {
      const namen = el('p');
      namen.textContent = vorhanden.map((k) => k.meta.name).join(', ');
      const box = el('div', 'Kontextaktionen');
      const b = knopf(t, 'baugruppe.anlegen');
      b.addEventListener('click', () => ausloesen('baugruppe.anlegen'));
      box.append(b);
      eigenschaften.append(namen, box);
    } else if (!gewaehlt) {
      const leer = el('p', 'Leerer Zustand');
      leer.textContent = t('app.leer');
      eigenschaften.append(leer);
    } else {
      const name = el('p');
      name.textContent = gewaehlt.meta.name;
      eigenschaften.append(name, kontextaktionen(gewaehlt));
      for (const [schluessel, wert] of Object.entries(gewaehlt.params)) {
        if (wert && typeof wert === 'object' && 'unit' in wert) {
          if (schluessel === 'tiefe' || schluessel === 'radius') {
            eigenschaften.append(
              wertfeldBauen(
                t,
                t(`ablauf.${schluessel}`),
                wert as Groesse,
                (g) => {
                  sitzung.ausfuehren('element.wert-setzen', {
                    element: gewaehlt.id,
                    name: schluessel,
                    wert: g,
                  });
                  zeichnen();
                },
                'element.wert-setzen',
              ),
            );
            continue;
          }
          const p = el('p');
          p.textContent = `${schluessel}: ${anzeigen(wert as Parameters<typeof anzeigen>[0])}`;
          eigenschaften.append(p);
        }
      }
    }
    // Befund statt Abbruch: der Rest des Modells bleibt bedienbar; Korrektur ist ein Befehl.
    const fehlerhaft = alle(projekt).find((k) => berechnung(k) === 'fehlerhaft');
    if (fehlerhaft) {
      const b = el('div', 'Befund');
      b.setAttribute('role', 'alert');
      const korrektur = knopf(t, 'element.wert-setzen');
      korrektur.textContent = t('zustand.befund.korrektur');
      korrektur.addEventListener('click', () => {
        sitzung.ausfuehren('element.wert-setzen', {
          element: fehlerhaft.id,
          name: 'radius',
          wert: mm(GRENZE_MM),
        });
        zeichnen();
      });
      const text = el('span');
      text.textContent = t('ablauf.befund');
      b.append(text, korrektur);
      rueckmeldung.replaceChildren(b);
    } else if (rueckmeldung.querySelector('[data-muster="Befund"]')) {
      rueckmeldung.textContent = t('app.bereit');
    }
    f3d.aktualisieren(
      projekt,
      auswahl.filter((id) => alle(projekt).some((k) => k.id === id)),
    );
  }

  window.addEventListener('resize', () => f3d.zeichnen());
  zeichnen();
  return {
    auswahl: () => [...auswahl],
    zeichnen,
    waehlen,
    flaeche,
    suche,
    stand: entw.kopf,
    nachjustieren,
    rueckmeldung,
  };
}
