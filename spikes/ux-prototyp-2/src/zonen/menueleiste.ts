// Menüleiste (ADR-065): Start-Menü, Dropdowns des Taskleisten-Eintrags, Suche, Rückgängig, Schalter.
import type { App } from '../app';
import { kuerzelText } from '../i18n';
import { h, symbol, type Symbolname } from '../ui/dom';
import { MENUELEISTE_KNOEPFE } from '../modell/register';
import { familienMenue, popup } from '../ui/menue';
import { baueSuche } from './suche';

/** Dropdowns je Taskleisten-Eintrag; Inhalt kommt aus dem Register nach Familie. */
export const DROPDOWNS: Record<'modellieren' | 'simulation', string[]> = {
  modellieren: ['Bearbeiten', 'Auswahl', 'Baugruppe', 'Fenster'],
  simulation: ['Simulation'],
};

function ausloeser(app: App, id: string, text: string, ort: string): HTMLElement {
  const offen = app.menue === id;
  return h(
    'div',
    { class: 'menue-eintrag', 'data-key': id },
    h(
      'button',
      {
        type: 'button',
        class: 'menue-knopf',
        'data-menue-trigger': id,
        'aria-haspopup': 'menu',
        'aria-expanded': offen ? 'true' : 'false',
        tabindex: '-1',
      },
      text,
    ),
    offen
      ? popup(
          ort,
          familienMenue(
            app,
            id.replace('dropdown:', '').replace('start', 'Datei'),
            MENUELEISTE_KNOEPFE,
          ),
        )
      : null,
  );
}

function schalter(app: App, befehl: string, name: Symbolname, an: boolean): HTMLElement {
  const b = app.befehl(befehl);
  return h(
    'button',
    {
      type: 'button',
      class: 'schalter',
      'data-befehl': befehl,
      'aria-pressed': an ? 'true' : 'false',
      title: b
        ? `${app.t(b.titel)}${b.kuerzel ? ` (${kuerzelText(b.kuerzel, app.sprache)})` : ''}`
        : befehl,
      'aria-label': b ? app.t(b.titel) : befehl,
    },
    symbol(name),
  );
}

function verlaufKnopf(app: App, befehl: string, name: Symbolname, anwendbar: boolean): HTMLElement {
  const b = app.befehl(befehl);
  return h(
    'button',
    {
      type: 'button',
      class: 'schalter mit-kuerzel',
      'data-befehl': befehl,
      'aria-disabled': anwendbar ? null : 'true',
      title: b ? app.t(b.titel) : befehl,
      'aria-label': b ? app.t(b.titel) : befehl,
    },
    symbol(name),
    b?.kuerzel ? h('kbd', {}, kuerzelText(b.kuerzel, app.sprache)) : null,
  );
}

export function baueMenueleiste(app: App): HTMLElement[] {
  const suche = app.befehl('suche.oeffnen');
  return [
    ausloeser(app, 'start', app.t('menue.start'), 'start-menue'),
    ...DROPDOWNS[app.task]
      .filter((familie) => app.register.some((b) => b.familie === familie && !b.folgt))
      .map((familie) =>
        ausloeser(
          app,
          `dropdown:${familie}`,
          app.t(`familie.${familie}`),
          familie === 'Fenster' ? 'menueleiste' : `dropdown-${familie.toLowerCase()}`,
        ),
      ),
    h('div', { class: 'platz' }),
    h(
      'div',
      { class: 'menue-eintrag suche-eintrag', 'data-key': 'suche' },
      h(
        'button',
        {
          type: 'button',
          class: 'suchfeld',
          'data-befehl': 'suche.oeffnen',
          'aria-expanded': app.suche.offen ? 'true' : 'false',
          tabindex: '-1',
        },
        symbol('search'),
        h('span', { class: 'platzhalter' }, app.t('suche.platzhalter')),
        suche?.kuerzel ? h('kbd', {}, kuerzelText(suche.kuerzel, app.sprache)) : null,
      ),
      app.suche.offen ? baueSuche(app) : null,
    ),
    verlaufKnopf(app, 'bearbeiten.rueckgaengig', 'undo-2', app.kannRueckgaengig()),
    verlaufKnopf(app, 'bearbeiten.wiederholen', 'redo-2', app.kannWiederholen()),
    h(
      'div',
      { class: 'schalter-gruppe', role: 'group', 'data-key': 'schalter' },
      schalter(app, 'fenster.struktur', 'panel-left', app.zonen.struktur),
      schalter(app, 'fenster.panel', 'panel-bottom', app.zonen.panel),
      schalter(app, 'fenster.rechts', 'panel-right', app.zonen.rechts),
    ),
  ];
}
