// Suche (Mod+K): Befehle und Inhalte in einem Feld, Ergebnisse aus dem Befehlsregister.
import type { App } from '../app';
import { kuerzelText } from '../i18n';
import { alleElemente } from '../modell/element';
import type { Befehl } from '../modell/register';
import { h } from '../ui/dom';

const MAX_OHNE_TEXT = 8;
const MAX_MIT_TEXT = 12;

export function sucheTreffer(app: App, text: string): Befehl[] {
  const q = text.trim().toLowerCase();
  const titel = (b: Befehl) => app.t(b.titel).toLowerCase();
  if (!q) return [...app.register].sort((a, b) => a.rang - b.rang);
  const treffer = app.register.filter((b) => titel(b).includes(q));
  return treffer.sort((a, b) => {
    const sa = titel(a).startsWith(q) ? 0 : 1;
    const sb = titel(b).startsWith(q) ? 0 : 1;
    return sa - sb || titel(a).length - titel(b).length || a.rang - b.rang;
  });
}

/** Die angezeigten Befehle: ohne Eingabe die häufigsten, sonst die Treffer (mit Eingabe „Alle Befehle“ ohne Grenze). */
export function sichtbareTreffer(app: App): Befehl[] {
  const alle = sucheTreffer(app, app.suche.text);
  if (app.suche.alle) return alle;
  return alle.slice(0, app.suche.text.trim() ? MAX_MIT_TEXT : MAX_OHNE_TEXT);
}

export function baueSuche(app: App): HTMLElement {
  const treffer = sichtbareTreffer(app);
  const q = app.suche.text.trim().toLowerCase();
  const inhalte = q
    ? alleElemente(app.dokument())
        .filter((e) => e.id !== app.dokument().id && e.meta.name.toLowerCase().includes(q))
        .slice(0, 4)
    : [];
  const index = Math.min(app.suche.index, Math.max(0, treffer.length - 1));
  return h(
    'div',
    {
      class: 'popup suche-popup',
      role: 'listbox',
      'data-overlay': 'suche',
      'data-ort': 'suche',
      'data-weg': 'suche',
      'data-muster': 'Suche',
    },
    h('input', {
      type: 'text',
      class: 'suche-eingabe',
      'data-suchfeld': '',
      'data-editiert': '',
      value: app.suche.text,
      placeholder: app.t('suche.platzhalter'),
      'aria-label': app.t('suche.platzhalter'),
      autocomplete: 'off',
    }),
    h(
      'div',
      { class: 'ergebnisse', 'data-text': app.suche.text },
      h('div', { class: 'gruppenkopf' }, app.t('suche.befehle')),
      ...treffer.map((b, i) =>
        h(
          'button',
          {
            type: 'button',
            role: 'option',
            class: 'eintrag',
            'data-befehl': b.id,
            'data-key': `s-${b.id}`,
            'aria-selected': i === index ? 'true' : 'false',
            'data-akzent': i === index ? 'auswahl' : null,
            'data-folgt': b.folgt ? 'true' : null,
            tabindex: '-1',
          },
          h('span', { class: 'titel' }, app.t(b.titel)),
          b.folgt ? h('span', { class: 'folgt' }, app.t('menue.folgt')) : null,
          b.kuerzel ? h('kbd', {}, kuerzelText(b.kuerzel, app.sprache)) : null,
        ),
      ),
      treffer.length === 0 && inhalte.length === 0
        ? h('div', { class: 'leer', 'data-key': 'keine' }, app.t('suche.nichts'))
        : null,
      inhalte.length
        ? h('div', { class: 'gruppenkopf', 'data-key': 'kopf-inhalte' }, app.t('suche.inhalte'))
        : null,
      ...inhalte.map((e) =>
        h(
          'button',
          {
            type: 'button',
            role: 'option',
            class: 'eintrag',
            'data-suche-element': e.id,
            'data-key': `e-${e.id}`,
            'aria-selected': 'false',
            tabindex: '-1',
          },
          h('span', { class: 'titel' }, e.meta.name),
        ),
      ),
    ),
  );
}
