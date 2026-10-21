// Arbeitsfläche: Kopfzeile, Featurebaum, 3D-Fläche, Eigenschaften, Werkzeugleiste, Nachjustieren, Rückmeldung.
// Jedes Bedienelement ruft genau einen Befehl auf (data-befehl); Bausteine tragen data-muster.
import { befehle, type Sitzung } from '../modell/register';
import { alle, finde, type Element } from '../modell/projekt';
import { anzeigen } from '../wert/wertfeld';
import { Flaeche3d } from './viewport';
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
  reiter.setAttribute('aria-current', 'page');
  reiter.textContent = t('app.arbeitsbereich');
  bereiche.append(reiter);
  const stand = el('span', 'Statusanzeige');
  stand.textContent = t('app.stand.haupt');
  const suche = el('input', 'Suche', 'suche');
  suche.type = 'search';
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
      nachjustieren.textContent = `${t('app.nachjustieren')}: ${b.textContent ?? ''}`;
    });
    leiste.append(b);
  }
  leiste.querySelector('button')?.setAttribute('aria-current', 'true');

  const nachjustieren = el('div', 'Letzte Aktion nachjustieren', 'nachjustieren');
  const rueckmeldung = el('div', 'Rückmeldung', 'rueckmeldung');
  rueckmeldung.setAttribute('role', 'status');
  rueckmeldung.textContent = t('app.bereit');

  wurzel.replaceChildren(kopf, baum, flaeche, eigenschaften, leiste, nachjustieren, rueckmeldung);

  const f3d = new Flaeche3d(canvas);

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
    if (k.content.length) {
      const ul = el('ul');
      ul.append(...k.content.map(zeile));
      li.append(ul);
    }
    return li;
  }

  function zeichnen(): void {
    const projekt = sitzung.modell();
    const kopfzeile = el('h2');
    kopfzeile.textContent = t('app.baum');
    const ul = el('ul');
    ul.append(...projekt.content.map(zeile));
    baum.replaceChildren(kopfzeile, ul);

    const titel = el('h2');
    titel.textContent = t('app.eigenschaften');
    eigenschaften.replaceChildren(titel);
    const gewaehlt = auswahl.length === 1 ? finde(projekt, auswahl[0] ?? '') : undefined;
    if (!gewaehlt) {
      const leer = el('p', 'Leerer Zustand');
      leer.textContent = t('app.leer');
      eigenschaften.append(leer);
    } else {
      const name = el('p');
      name.textContent = gewaehlt.meta.name;
      eigenschaften.append(name);
      for (const [schluessel, wert] of Object.entries(gewaehlt.params)) {
        if (wert && typeof wert === 'object' && 'unit' in wert) {
          const p = el('p');
          p.textContent = `${schluessel}: ${anzeigen(wert as Parameters<typeof anzeigen>[0])}`;
          eigenschaften.append(p);
        }
      }
    }
    f3d.aktualisieren(
      projekt,
      auswahl.filter((id) => alle(projekt).some((k) => k.id === id)),
    );
  }

  window.addEventListener('resize', () => f3d.zeichnen());
  zeichnen();
  return { auswahl: () => [...auswahl], zeichnen };
}
