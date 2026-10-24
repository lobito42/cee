// Struktur (ADR-065): Elemente unter der Wurzel, je Zeile Name, Symbol, Auge, Status; eine Auswahl für alles.
import type { App } from '../app';
import type { Element } from '../modell/element';
import { istVerworfen } from '../modell/element';
import { h, symbol, type Symbolname } from '../ui/dom';
import { familienMenue, popup } from '../ui/menue';

const TYP_SYMBOL: Record<string, Symbolname> = {
  teil: 'box',
  baugruppe: 'boxes',
  extrusion: 'layers',
  schale: 'layers',
  skizze: 'pencil',
  bohrung: 'circle-dot',
  view: 'focus',
};

export interface StatusAnzeige {
  zustand: 'fehlerhaft' | 'pausiert' | 'rechnet';
  symbol: Symbolname;
  token: string;
}

export function statusVon(app: App, id: string): StatusAnzeige | null {
  const z = app.zustaende(id);
  if (z.includes('fehlerhaft'))
    return { zustand: 'fehlerhaft', symbol: 'circle-alert', token: 'fehler' };
  if (z.includes('rechnet')) return { zustand: 'rechnet', symbol: 'loader', token: 'text-2' };
  if (z.includes('pausiert'))
    return { zustand: 'pausiert', symbol: 'circle-pause', token: 'text-2' };
  return null;
}

/** Statusanzeige: Farbe, Symbol und Wort immer zusammen (ADR-050). */
export function statusElement(app: App, s: StatusAnzeige, id: string): HTMLElement {
  return h(
    'span',
    {
      class: 'status',
      'data-muster': 'Statusanzeige',
      'data-zustand': s.zustand,
      'data-status-token': s.token,
      'data-element': id,
      role: 'status',
    },
    symbol(s.symbol, 14),
    h('span', { class: 'wort' }, app.t(`status.${s.zustand}`)),
  );
}

function zeile(app: App, e: Element, ebene: number, index: number): HTMLElement {
  const z = app.zustaende(e.id);
  const gewaehlt = app.auswahlIds().includes(e.id);
  const versteckt = app.istAusgeblendet(e.id);
  const status = statusVon(app, e.id);
  const andere = z.includes('andere');
  return h(
    'div',
    {
      role: 'treeitem',
      class: 'zeile',
      'data-key': e.id,
      'data-id': e.id,
      'data-ebene': String(ebene),
      'data-zustand': z.join(' ') || null,
      'data-akzent': gewaehlt
        ? 'auswahl'
        : z.includes('hover')
          ? 'ueberfahren'
          : app.dnd?.ziel === e.id && app.dnd.erlaubt
            ? 'auswahl'
            : null,
      'aria-selected': gewaehlt ? 'true' : 'false',
      'aria-level': String(ebene + 1),
      'aria-current': app.aktiv === e.id ? 'true' : null,
      'data-ziel': app.dnd?.ziel === e.id ? (app.dnd.erlaubt ? 'erlaubt' : 'verboten') : null,
      style: `--ebene:${ebene}`,
      tabindex: index === 0 ? '0' : '-1',
    },
    symbol(TYP_SYMBOL[e.type] ?? 'square', 14),
    h('span', { class: 'name' }, e.meta.name),
    status ? statusElement(app, status, e.id) : null,
    andere
      ? h(
          'span',
          { class: 'person', title: app.t('anwesenheit.person') },
          app.t('anwesenheit.kuerzel'),
        )
      : null,
    h(
      'button',
      {
        type: 'button',
        class: 'auge',
        'data-befehl': versteckt ? 'element.einblenden' : 'element.ausblenden',
        'data-par': JSON.stringify({ element: e.id }),
        'data-weg': 'struktur',
        'data-ort': 'auge',
        'aria-label': app.t(versteckt ? 'befehl.element.einblenden' : 'befehl.element.ausblenden'),
        'aria-pressed': versteckt ? 'true' : 'false',
        tabindex: '-1',
      },
      symbol(versteckt ? 'eye-off' : 'eye', 14),
    ),
    istVerworfen(e) ? h('span', { class: 'verworfen-marke' }, app.t('struktur.verworfen')) : null,
  );
}

export function baueStruktur(app: App): HTMLElement[] {
  const zeilen = app.zeilen();
  const wurzel = app.dokument();
  const kopf = h(
    'div',
    { class: 'zonenkopf', 'data-key': 'kopf' },
    h('h2', {}, app.t('struktur.titel')),
    h(
      'div',
      { class: 'menue-eintrag', 'data-key': 'sichtbarkeit' },
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-menue-trigger': 'sichtbarkeit',
          'aria-haspopup': 'menu',
          'aria-expanded': app.menue === 'sichtbarkeit' ? 'true' : 'false',
          title: app.t('familie.Sichtbarkeit'),
          'aria-label': app.t('familie.Sichtbarkeit'),
        },
        symbol('eye'),
      ),
      app.menue === 'sichtbarkeit' ? popup('auge', familienMenue(app, AUGE_FAMILIE)) : null,
    ),
  );
  if (app.task === 'simulation') {
    return [
      kopf,
      h(
        'div',
        { class: 'leer', 'data-muster': 'Leerer Zustand', 'data-key': 'leer' },
        h('p', {}, app.t('struktur.leer-simulation')),
      ),
    ];
  }
  const wurzelZeile = h(
    'div',
    {
      class: 'wurzel',
      'data-key': 'wurzel',
      'data-wurzel': wurzel.id,
      'data-akzent': app.dnd?.ziel === wurzel.id && app.dnd.erlaubt ? 'auswahl' : null,
      'data-ziel': app.dnd?.ziel === wurzel.id ? (app.dnd.erlaubt ? 'erlaubt' : 'verboten') : null,
    },
    h('span', { class: 'beschriftung' }, app.t('struktur.wurzel')),
    h('span', { class: 'name' }, wurzel.meta.name),
  );
  if (!zeilen.length) {
    return [
      kopf,
      wurzelZeile,
      h(
        'div',
        { class: 'leer', 'data-muster': 'Leerer Zustand', 'data-key': 'leer' },
        h('p', {}, app.t('struktur.leer')),
        app.unbekannterZustand
          ? h(
              'div',
              { class: 'befund', 'data-muster': 'Befund', 'data-schwere': 'warnung' },
              app.t('befund.zustand-unbekannt'),
            )
          : null,
        h(
          'button',
          {
            type: 'button',
            class: 'knopf haupt',
            'data-befehl': 'element.anlegen',
            'data-par': JSON.stringify({ typ: 'teil' }),
            'data-hauptaktion': '',
            'data-akzent': 'hauptaktion',
          },
          app.t('befehl.element.anlegen'),
        ),
      ),
    ];
  }
  return [
    kopf,
    wurzelZeile,
    h(
      'div',
      { role: 'tree', class: 'baum', 'data-key': 'baum', 'aria-label': app.t('struktur.titel') },
      ...zeilen.map((z, i) => zeile(app, z.element, z.ebene, i)),
    ),
  ];
}

/** Menü der Familie Sichtbarkeit am Kopf der Struktur (Ort „auge“). */
export const AUGE_FAMILIE = 'Sichtbarkeit';
