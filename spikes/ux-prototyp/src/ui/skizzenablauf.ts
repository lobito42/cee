// Ablauf A: Skizze auf einer Ebene, Rechteck mit Wertfeldern, Skizze schließen, Extrudieren mit Geister-Vorschau.
// Jeder Schritt ist ein Befehl aus dem Register; die Karten sind nur Eingabehilfen.
import { alle, element, finde, mm, type Element, type Projekt } from '../modell/projekt';
import type { Sitzung } from '../modell/register';
import { anzeigen, lesen, ziehen, type Groesse } from '../wert/wertfeld';
import type { Flaeche3d } from './viewport';

type T = (schluessel: string) => string;

const TEIL = 'teil-1';
const SKIZZE = 'skizze-1';
const EBENEN = ['XY', 'XZ', 'YZ'];

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

function teilVon(projekt: Projekt): Element | undefined {
  return projekt.content.find((k) => k.id === TEIL);
}

/** Wirkungen der Befehle des Ablaufs auf das Modell. */
export function skizzenWirkungenRegistrieren(sitzung: Sitzung): void {
  sitzung.registriere('skizze.anlegen', (p, par) => {
    const teil = teilVon(p);
    if (!teil || finde(p, SKIZZE)) return;
    teil.content.push(
      element(SKIZZE, 'sketch', 'Skizze 1', {
        ebene: String(par.ebene ?? 'XY'),
        laenge: mm(0),
        breite: mm(0),
      }),
    );
  });
  sitzung.registriere('skizze.rechteck', (p, par) => {
    const s = finde(p, SKIZZE);
    if (!s) return;
    s.params.laenge = par.laenge;
    s.params.breite = par.breite;
  });
  sitzung.registriere('skizze.schliessen', (p) => {
    const s = finde(p, SKIZZE);
    if (s) s.params.geschlossen = true;
  });
  sitzung.registriere('feature.extrudieren', (p, par) => {
    const teil = teilVon(p);
    const s = finde(p, SKIZZE);
    if (
      !teil ||
      !s ||
      !par.tiefe ||
      alle(p).some((k) => k.type === 'extrusion' && k.id === 'extrusion-1')
    )
      return;
    teil.content.push(
      element('extrusion-1', 'extrusion', 'Extrusion 1', { skizze: SKIZZE, tiefe: par.tiefe }),
    );
    teil.params.laenge = s.params.laenge;
    teil.params.breite = s.params.breite;
    teil.params.hoehe = par.tiefe;
  });
}

export interface AblaufSchnittstelle {
  ebenenWahl: () => void;
  extrusionVorschau: () => void;
}

export interface AblaufEingang {
  sitzung: Sitzung;
  t: T;
  flaeche: HTMLElement;
  f3d: Flaeche3d;
  nachjustieren: HTMLElement;
  waehlen: (ids: string[]) => void;
  zeichnen: () => void;
}

export function skizzenablaufAufbauen(e: AblaufEingang): AblaufSchnittstelle {
  const { sitzung, t } = e;
  let karte: HTMLElement | undefined;

  const schliessen = (): void => {
    karte?.remove();
    karte = undefined;
    e.f3d.geist(undefined);
  };
  const oeffnen = (...kinder: Node[]): HTMLElement => {
    schliessen();
    e.flaeche.querySelectorAll('.zustand').forEach((k) => k.remove());
    const k = el('section', 'Rückmeldung');
    k.classList.add('zustand');
    k.append(...kinder);
    e.flaeche.append(k);
    karte = k;
    return k;
  };
  const absatz = (text: string): HTMLParagraphElement => el('p', undefined, text);
  const knopf = (id: string, text: string): HTMLButtonElement => {
    const b = el('button', undefined, text);
    b.type = 'button';
    b.dataset.befehl = id;
    return b;
  };

  /** Wertfeld: Enter liest den Text; bei Fehler erscheint ein Befund, der Wert bleibt. */
  const wertfeld = (
    beschriftung: string,
    start: Groesse,
    bei: (g: Groesse) => void,
    befehl = 'element.wert-setzen',
  ): HTMLLabelElement => {
    const l = el('label', 'Wertfeld', `${beschriftung} `);
    const i = el('input');
    i.dataset.befehl = befehl;
    i.setAttribute('aria-label', beschriftung);
    i.value = anzeigen(start);
    const befund = el('span', 'Befund');
    befund.setAttribute('role', 'alert');
    let gueltig = start;
    i.addEventListener('keydown', (ev) => {
      if (ev.key !== 'Enter') return;
      const r = lesen(i.value);
      if (!r.ok) {
        befund.textContent = t(r.fehler);
        i.value = anzeigen(gueltig);
        return;
      }
      befund.textContent = '';
      gueltig = r.groesse;
      i.value = anzeigen(gueltig);
      bei(gueltig);
    });
    l.append(i, befund);
    return l;
  };

  const groesseAus = (s: Element | undefined, n: string): Groesse =>
    (s?.params[n] as Groesse | undefined) ?? mm(0);

  function skizzeBearbeiten(): void {
    const s0 = finde(sitzung.modell(), SKIZZE);
    let laenge = groesseAus(s0, 'laenge');
    let breite = groesseAus(s0, 'breite');
    const setzen = (): void => {
      sitzung.ausfuehren('skizze.rechteck', { laenge, breite });
      e.zeichnen();
    };
    const flaecheZiehen = el('div', 'Auswahl im Modell', undefined);
    flaecheZiehen.className = 'skizzenflaeche';
    flaecheZiehen.dataset.befehl = 'skizze.rechteck';
    flaecheZiehen.tabIndex = 0;
    flaecheZiehen.setAttribute('role', 'application');
    flaecheZiehen.setAttribute('aria-label', t('befehl.skizze.rechteck'));
    let start: { x: number; y: number } | undefined;
    flaecheZiehen.addEventListener('pointerdown', (ev) => {
      start = { x: ev.clientX, y: ev.clientY };
    });
    flaecheZiehen.addEventListener('pointerup', (ev) => {
      if (!start) return;
      // Raster 1 mm: ein Pixel ist ein Millimeter.
      laenge = mm(Math.max(1, Math.round(Math.abs(ev.clientX - start.x))));
      breite = mm(Math.max(1, Math.round(Math.abs(ev.clientY - start.y))));
      start = undefined;
      setzen();
      felder.replaceChildren(laengeFeld(), breiteFeld());
    });
    const laengeFeld = (): HTMLLabelElement =>
      wertfeld(
        t('ablauf.laenge'),
        laenge,
        (g) => {
          laenge = g;
          setzen();
        },
        'skizze.rechteck',
      );
    const breiteFeld = (): HTMLLabelElement =>
      wertfeld(
        t('ablauf.breite'),
        breite,
        (g) => {
          breite = g;
          setzen();
        },
        'skizze.rechteck',
      );
    const felder = el('div');
    felder.append(laengeFeld(), breiteFeld());
    const zu = knopf('skizze.schliessen', t('befehl.skizze.schliessen'));
    zu.dataset.hauptaktion = '';
    zu.addEventListener('click', () => {
      sitzung.ausfuehren('skizze.schliessen');
      schliessen();
      e.waehlen([SKIZZE]); // Extrudieren erscheint in den Kontextaktionen der Auswahl
    });
    oeffnen(el('h3', undefined, t('ablauf.skizze')), flaecheZiehen, felder, zu);
  }

  function ebenenWahl(): void {
    const knoepfe = EBENEN.map((n) => {
      const b = knopf('skizze.anlegen', n);
      b.dataset.ebene = n;
      b.addEventListener('click', () => {
        sitzung.ausfuehren('skizze.anlegen', { ebene: n });
        e.zeichnen();
        skizzeBearbeiten();
      });
      return b;
    });
    oeffnen(el('h3', undefined, t('ablauf.ebene')), ...knoepfe);
  }

  function extrusionVorschau(): void {
    const s = finde(sitzung.modell(), SKIZZE);
    if (!s) return;
    const l = groesseAus(s, 'laenge');
    const b = groesseAus(s, 'breite');
    let tiefe = mm(10);
    const zeigen = (): void => e.f3d.geist({ l: l.value, b: b.value, h: tiefe.value });
    const feld = wertfeld(
      t('ablauf.tiefe'),
      tiefe,
      (g) => {
        tiefe = g;
        sitzung.ausfuehren('feature.extrudieren', { tiefe: g, skizze: SKIZZE });
        schliessen();
        e.nachjustieren.replaceChildren(
          el('span', undefined, t('app.nachjustieren')),
          el('span', undefined, `${t('ablauf.extrusion')} · ${t('ablauf.tiefe')}`),
          el('span', undefined, anzeigen(g)),
        );
        e.waehlen([]);
      },
      'feature.extrudieren',
    );
    const eingabe = feld.querySelector('input');
    const griff = el('button', 'Wertfeld', t('ablauf.griff'));
    griff.type = 'button';
    griff.dataset.befehl = 'element.wert-setzen';
    let y0: number | undefined;
    let t0 = tiefe;
    griff.addEventListener('pointerdown', (ev) => {
      y0 = ev.clientY;
      t0 = tiefe;
    });
    griff.addEventListener('pointermove', (ev) => {
      if (y0 === undefined) return;
      tiefe = ziehen(t0, Math.round(y0 - ev.clientY));
      if (eingabe) eingabe.value = anzeigen(tiefe);
      zeigen();
    });
    griff.addEventListener('pointerup', () => {
      y0 = undefined;
    });
    oeffnen(el('h3', undefined, t('ablauf.extrusion')), absatz(t('ablauf.vorschau')), griff, feld);
    zeigen();
    eingabe?.focus();
  }

  return { ebenenWahl, extrusionVorschau };
}
