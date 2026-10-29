// Bausteine für Menüs: ein Eintrag je Befehl (aus dem Register), Gruppen, Popups.
import type { App } from '../app';
import { kuerzelText } from '../i18n';
import { passendeVariante, untergruppen, type Befehl } from '../modell/register';
import { h } from './dom';

/** Ein Befehl als Menüeintrag: Titel, bei Bedarf „folgt“ und das Kürzel aus dem Register. */
export function eintrag(
  app: App,
  b: Befehl,
  optionen: { mehr?: boolean; par?: Record<string, unknown>; leise?: boolean } = {},
): HTMLElement {
  const anwendbar = app.anwendbar(b);
  return h(
    'button',
    {
      type: 'button',
      role: 'menuitem',
      class: 'eintrag',
      'data-befehl': b.id,
      'data-par': optionen.par ? JSON.stringify(optionen.par) : null,
      'data-mehr': optionen.mehr ? 'true' : null,
      'aria-disabled': !anwendbar || b.folgt ? 'true' : null,
      'data-folgt': b.folgt ? 'true' : null,
      tabindex: '-1',
    },
    h('span', { class: 'titel' }, app.t(b.titel)),
    b.folgt ? h('span', { class: 'folgt' }, app.t('menue.folgt')) : null,
    b.kuerzel ? h('kbd', {}, kuerzelText(b.kuerzel, app.sprache)) : null,
  );
}

/** Alle Befehle einer Familie in Untergruppen (höchstens zwölf je Untergruppe). */
export function familienMenue(
  app: App,
  familie: string,
  ausser: ReadonlySet<string> = new Set(),
): HTMLElement[] {
  const art = app.auswahlart();
  // Platzhalter, Befehle mit eigenem Knopf und die nicht passende Variante einer Handlung bleiben draußen
  const sichtbar = app.register.filter(
    (b) => !b.folgt && !ausser.has(b.id) && passendeVariante(app.register, b, art),
  );
  return untergruppen(sichtbar, familie).map((u) =>
    h(
      'div',
      {
        role: 'group',
        class: 'untergruppe',
        'data-untergruppe': u.name,
        'data-key': `ug-${u.name}`,
      },
      h('div', { class: 'gruppenkopf' }, app.t(`untergruppe.${u.name.replace(/ \d+$/, '')}`)),
      ...u.eintraege.map((b) => eintrag(app, b)),
    ),
  );
}

/** Ein geöffnetes Menü unter seinem Auslöser; `ort` benennt den Platz aus der Platzierungstabelle. */
export function popup(
  ort: string,
  kinder: (HTMLElement | null)[],
  weg = 'menue',
  klasse = '',
): HTMLElement {
  return h(
    'div',
    {
      role: 'menu',
      class: `popup ${klasse}`.trim(),
      'data-overlay': 'menue',
      'data-ort': ort,
      'data-weg': weg,
    },
    ...kinder,
  );
}
