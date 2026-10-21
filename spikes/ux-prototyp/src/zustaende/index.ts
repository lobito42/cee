// Testzustände per Adresse (?zustand=<name>): werden ohne Klick hergestellt (design.md, Testzustände).
import { element, mm, testprojekt, type Projekt } from '../modell/projekt';
import { befehle, type Sitzung } from '../modell/register';
import { anzeigen } from '../wert/wertfeld';
import type { Oberflaeche } from '../ui/layout';
import './zustaende.css';

type T = (schluessel: string) => string;

export const ZUSTAENDE = [
  'leer',
  'skizze',
  'extrusion',
  'platte',
  'verrundung',
  'befund',
  'teile',
  'verbindung',
  'suche',
  'entwuerfe',
  'vergleich',
  'ki-arbeitet',
  'ki-vorschlag',
] as const;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  muster?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (muster) e.dataset.muster = muster;
  if (text !== undefined) e.textContent = text;
  return e;
}

function knopf(t: T, id: string, text?: string): HTMLButtonElement {
  const b = el('button');
  b.type = 'button';
  b.dataset.befehl = id;
  b.textContent = text ?? t(befehle.find((x) => x.id === id)?.titel ?? id);
  return b;
}

function wertfeld(t: T, beschriftung: string, wert: number): HTMLLabelElement {
  const l = el('label', 'Wertfeld', `${t(beschriftung)} `);
  const i = el('input');
  i.dataset.befehl = 'element.wert-setzen';
  i.value = anzeigen(mm(wert));
  i.setAttribute('aria-label', t(beschriftung));
  l.append(i);
  return l;
}

const karte = (t: T, name: string, ...kinder: Node[]): HTMLElement => {
  const k = el('section', 'Rückmeldung');
  const titel = el('h3', undefined, t(`zustand.${name}.titel`));
  k.append(titel, ...kinder);
  return k;
};

const absatz = (t: T, schluessel: string): HTMLParagraphElement =>
  el('p', undefined, t(schluessel));

function leeresProjekt(): Projekt {
  const p = testprojekt();
  p.content = p.content.filter((k) => k.id === 'teil-1');
  return p;
}

function mitSkizze(tiefe?: number): Projekt {
  const p = leeresProjekt();
  const teil = p.content[0];
  teil?.content.push(
    element('skizze-1', 'sketch', 'Skizze 1', { ebene: 'XY', laenge: mm(80), breite: mm(50) }),
  );
  if (tiefe !== undefined) {
    teil?.content.push(
      element('extrusion-1', 'extrusion', 'Extrusion 1', { skizze: 'skizze-1', tiefe: mm(tiefe) }),
    );
  }
  return p;
}

function inhalt(name: string, o: Oberflaeche, t: T, s: Sitzung): HTMLElement | undefined {
  switch (name) {
    case 'leer': {
      s.setzen(leeresProjekt());
      const k = el('section', 'Leerer Zustand');
      k.append(
        el('h3', undefined, t('zustand.leer.titel')),
        absatz(t, 'zustand.leer.text'),
        knopf(t, 'skizze.anlegen'),
      );
      return k;
    }
    case 'skizze':
      s.setzen(mitSkizze());
      return karte(
        t,
        'skizze',
        absatz(t, 'zustand.skizze.text'),
        wertfeld(t, 'zustand.skizze.laenge', 80),
      );
    case 'extrusion':
      s.setzen(mitSkizze());
      return karte(
        t,
        'extrusion',
        absatz(t, 'zustand.extrusion.text'),
        knopf(t, 'feature.extrudieren'),
        wertfeld(t, 'zustand.extrusion.tiefe', 5),
      );
    case 'platte':
      o.nachjustieren.replaceChildren(
        el('span', undefined, t('app.nachjustieren')),
        el('span', undefined, t('befehl.feature.extrudieren')),
        el('span', undefined, anzeigen(mm(5))),
      );
      return karte(t, 'platte', absatz(t, 'zustand.platte.text'));
    case 'verrundung':
      o.waehlen(['kante-1', 'kante-2', 'kante-3', 'kante-4']);
      return karte(
        t,
        'verrundung',
        absatz(t, 'zustand.verrundung.text'),
        wertfeld(t, 'zustand.verrundung.radius', 3),
      );
    case 'befund': {
      const b = el('div', 'Befund');
      b.setAttribute('role', 'alert');
      b.append(
        absatz(t, 'zustand.befund.text'),
        knopf(t, 'element.wert-setzen', t('zustand.befund.korrektur')),
      );
      return karte(t, 'befund', b);
    }
    case 'teile':
      return karte(t, 'teile', absatz(t, 'zustand.teile.text'));
    case 'verbindung': {
      const p = testprojekt();
      p.content.push(element('baugruppe-1', 'assembly', 'Baugruppe 1', {}, []));
      s.setzen(p);
      const art = el('div', 'Auswahlfeld');
      art.setAttribute('role', 'group');
      art.setAttribute('aria-label', t('zustand.verbindung.art'));
      for (const [i, id] of ['fest', 'dreh', 'gleit'].entries()) {
        const b = knopf(t, 'verbindung.anlegen', t(`art.${id}`));
        b.setAttribute('aria-selected', String(i === 0));
        art.append(b);
      }
      return karte(t, 'verbindung', absatz(t, 'zustand.verbindung.text'), art);
    }
    case 'suche': {
      const p = testprojekt();
      p.content.push(element('verrundung-1', 'fillet', 'Verrundung 1', { radius: mm(3) }));
      s.setzen(p);
      o.zeichnen();
      o.suche.value = 'ver';
      const tabelle = el('div', 'Tabelle');
      const gruppe = (titel: string, zeilen: string[]): HTMLElement => {
        const g = el('div');
        g.append(el('h4', undefined, titel));
        for (const z of zeilen) g.append(knopf(t, 'auswahl.setzen', z));
        return g;
      };
      tabelle.append(
        gruppe(t('zustand.suche.befehle'), [
          t('befehl.feature.verrunden'),
          t('befehl.verbindung.anlegen'),
        ]),
        gruppe(t('zustand.suche.elemente'), ['Verrundung 1']), // Name steht im Modell
      );
      return tabelle;
    }
    case 'entwuerfe': {
      const liste = el('div', 'Tabelle');
      liste.append(
        knopf(t, 'ansicht.ergebnis'),
        knopf(t, 'ansicht.alle-entwuerfe'),
        el('p', undefined, t('zustand.entwuerfe.liste')),
        el('p', undefined, t('zustand.entwuerfe.text')),
      );
      return karte(t, 'entwuerfe', liste);
    }
    case 'vergleich': {
      const v = el('div', 'Vergleich');
      v.append(
        el('p', undefined, t('zustand.vergleich.vorher')),
        el('p', undefined, anzeigen(mm(5))),
        el('p', undefined, t('zustand.vergleich.nachher')),
        el('p', undefined, anzeigen(mm(8))),
        knopf(t, 'entwurf.uebernehmen'),
      );
      return karte(t, 'vergleich', v);
    }
    case 'ki-arbeitet': {
      const status = el('div', 'Statusanzeige');
      status.dataset.quelle = 'ki';
      status.append(
        el('p', undefined, t('zustand.ki-arbeitet.schritt1')),
        el('p', undefined, t('zustand.ki-arbeitet.schritt2')),
        el('p', undefined, t('zustand.ki-arbeitet.schritt3')),
        knopf(t, 'ki.anhalten'),
      );
      return karte(t, 'ki-arbeitet', status);
    }
    case 'ki-vorschlag': {
      // Die Befehlszeile ist ein Datenwert des Vorschlags und steht deshalb im Modell.
      const zeilentext = 'feature.schale wandstaerke=2 mm flaeche=oben';
      const p = testprojekt();
      p.content.push(
        element('vorschlag-1', 'proposal', 'Schale 2 mm', { befehle: [{ zeile: zeilentext }] }),
      );
      s.setzen(p);
      const k = el('section', 'Entscheidungskarte');
      k.dataset.quelle = 'ki';
      const zeile = el('code', undefined, zeilentext);
      const ja = knopf(t, 'vorschlag.uebernehmen');
      ja.dataset.hauptaktion = '';
      k.append(
        el('h3', undefined, t('zustand.ki-vorschlag.titel')),
        absatz(t, 'zustand.ki-vorschlag.grund'),
        absatz(t, 'zustand.ki-vorschlag.werte'),
        zeile,
        ja,
        knopf(t, 'vorschlag.verwerfen'),
      );
      return k;
    }
    default:
      return undefined;
  }
}

/** Stellt den Zustand her und gibt den gezeigten Zustand zurück ('leer' bei unbekanntem Namen). */
export function anwenden(name: string, o: Oberflaeche, t: T, s: Sitzung): string {
  if (!name) return '';
  const feld = inhalt(name, o, t, s);
  if (feld) {
    feld.classList.add('zustand');
    o.flaeche.append(feld);
    o.zeichnen();
    return name;
  }
  s.setzen(leeresProjekt());
  const b = el('div', 'Befund');
  b.setAttribute('role', 'alert');
  b.textContent = t('zustand.unbekannt');
  const k = el('section', 'Leerer Zustand');
  k.classList.add('zustand');
  k.append(b, knopf(t, 'skizze.anlegen'));
  o.flaeche.append(k);
  o.zeichnen();
  return 'leer';
}
