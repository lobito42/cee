// Panel (ADR-065): unter dem Modell, im Prototyp nur „Befunde“ (Muster Befund) mit Ort, Schwere und Korrektur.
import type { App } from '../app';
import { h, symbol } from '../ui/dom';

export function bauePanel(app: App): HTMLElement[] {
  const befunde = app.befunde();
  return [
    h(
      'div',
      { class: 'zonenkopf', 'data-key': 'kopf' },
      h('h2', {}, app.t('panel.befunde')),
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-befehl': 'fenster.panel',
          'aria-label': app.t('befehl.fenster.panel'),
          title: app.t('befehl.fenster.panel'),
        },
        symbol('x', 14),
      ),
    ),
    befunde.length
      ? h(
          'div',
          { class: 'befunde', 'data-key': 'liste' },
          ...befunde.map((b) => {
            if (b.code)
              return h(
                'div',
                {
                  class: 'befund',
                  'data-muster': 'Befund',
                  'data-schwere': 'fehler',
                  'data-element': b.elementId,
                  'data-code': b.code,
                  'data-key': `k-${b.elementId}-${b.code}`,
                },
                h(
                  'span',
                  { class: 'schwere' },
                  symbol('circle-alert', 14),
                  h('span', { class: 'wort' }, app.t('status.fehlerhaft')),
                ),
                h('span', { class: 'ort' }, app.name(b.elementId)),
                h('span', { class: 'text' }, b.text ?? app.t(b.schluessel)),
              );
            const korrektur = app.letzterGueltigerWert(b);
            return h(
              'div',
              {
                class: 'befund',
                'data-muster': 'Befund',
                'data-schwere': 'fehler',
                'data-element': b.elementId,
                'data-key': `b-${b.elementId}`,
              },
              h(
                'span',
                { class: 'schwere' },
                symbol('circle-alert', 14),
                h('span', { class: 'wort' }, app.t('status.fehlerhaft')),
              ),
              h('span', { class: 'ort' }, app.name(b.elementId)),
              h(
                'span',
                { class: 'text' },
                app.t(b.schluessel, { wert: `${b.wert} mm`, grenze: `${b.grenze} mm` }),
              ),
              h(
                'button',
                {
                  type: 'button',
                  class: 'knopf',
                  'data-befehl': 'element.wert-setzen',
                  'data-weg': 'befund',
                  'data-par': JSON.stringify({
                    element: b.elementId,
                    name: b.parameter,
                    wert: { value: korrektur, unit: 'mm' },
                  }),
                },
                app.t('befund.korrektur'),
              ),
            );
          }),
        )
      : h(
          'div',
          { class: 'leer', 'data-muster': 'Leerer Zustand', 'data-key': 'leer' },
          h('p', {}, app.t('panel.keine-befunde')),
        ),
  ];
}
