// Kontextmenü (ADR-065 Punkt 3): erzeugt aus dem Register, in Struktur und Modell für dieselbe Auswahl gleich.
// Sichtbare Ebene: höchstens acht Befehle ohne Überschriften; der Rest steht in der zweiten Ebene „Mehr …“.
import type { App } from '../app';
import { h } from '../ui/dom';
import { eintrag } from '../ui/menue';

export function baueKontextmenue(app: App): HTMLElement | null {
  const m = app.kontextMenue;
  if (!m) return null;
  const { sichtbar, mehr } = m.menue;
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
    ...sichtbar.flatMap((g, i) => [
      i > 0 ? h('div', { role: 'separator', class: 'linie', 'data-key': `l-${g.familie}` }) : null,
      h(
        'div',
        {
          role: 'group',
          class: 'untergruppe',
          'data-gruppe': g.familie,
          'data-key': `gr-${g.familie}`,
        },
        ...g.eintraege.map((b) => eintrag(app, b)),
      ),
    ]),
    mehr.length
      ? h(
          'button',
          {
            type: 'button',
            role: 'menuitem',
            class: 'eintrag mehr-knopf',
            'data-mehr-toggle': '',
            'data-key': 'mehr',
            'aria-haspopup': 'menu',
            'aria-expanded': m.mehrOffen ? 'true' : 'false',
            tabindex: '-1',
          },
          h('span', { class: 'titel' }, app.t('menue.mehr')),
        )
      : null,
    m.mehrOffen && mehr.length
      ? h(
          'div',
          {
            role: 'menu',
            class: `popup kontextmenue-mehr${m.x > window.innerWidth - 560 ? ' nach-links' : ''}`,
            'data-ort': 'kontextmenue-mehr',
            'data-key': 'mehr-ebene',
          },
          ...mehr.map((g) =>
            h(
              'div',
              {
                role: 'group',
                class: 'untergruppe',
                'data-gruppe': g.familie,
                'data-key': `mg-${g.familie}-${g.eintraege[0]?.id ?? ''}`,
              },
              h('div', { class: 'gruppenkopf' }, app.t(`familie.${g.familie}`)),
              ...g.eintraege.map((b) => eintrag(app, b, { mehr: true })),
            ),
          ),
        )
      : null,
  );
}
