// Kontextmenü (ADR-065 Punkt 3): erzeugt aus dem Register, in Struktur und Modell für dieselbe Auswahl gleich.
import type { App } from '../app';
import { h } from '../ui/dom';
import { eintrag } from '../ui/menue';

export function baueKontextmenue(app: App): HTMLElement | null {
  const m = app.kontextMenue;
  if (!m) return null;
  return h(
    'div',
    {
      role: 'menu',
      class: 'popup kontextmenue',
      'data-overlay': 'kontextmenue',
      'data-ort': 'kontextmenue',
      'data-weg': 'kontextmenue',
      'data-art': m.art,
      style: `left:${Math.round(m.x)}px;top:${Math.round(m.y)}px`,
    },
    ...m.gruppen.map((g) => {
      const offen = m.mehr.has(g.familie);
      const normal = g.eintraege.filter((e) => !e.mehr);
      const mehr = g.eintraege.filter((e) => e.mehr);
      return h(
        'div',
        {
          role: 'group',
          class: 'untergruppe',
          'data-gruppe': g.familie,
          'data-key': `gr-${g.familie}`,
        },
        h('div', { class: 'gruppenkopf' }, app.t(`familie.${g.familie}`)),
        ...normal.map((e) => eintrag(app, e.befehl)),
        mehr.length
          ? h(
              'button',
              {
                type: 'button',
                class: 'eintrag mehr-knopf',
                'data-mehr-toggle': g.familie,
                'aria-expanded': offen ? 'true' : 'false',
                tabindex: '-1',
              },
              app.t('menue.mehr'),
            )
          : null,
        mehr.length
          ? h(
              'div',
              { class: 'mehr', hidden: offen ? null : '', 'data-key': `mehr-${g.familie}` },
              ...mehr.map((e) => eintrag(app, e.befehl, { mehr: true })),
            )
          : null,
      );
    }),
  );
}
