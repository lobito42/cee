// Chat (ADR-065): Kontext „zu: …“, Eingabe und Entscheidungskarten. Die KI ist simuliert (ADR-037, ADR-021).
import type { App } from '../app';
import { kopfText, type Karte } from '../ki/konstruktion';
import { h, symbol } from '../ui/dom';

export function kontext(app: App): HTMLElement {
  const gewaehlt = app.gewaehlteElemente();
  let inhalt: HTMLElement;
  if (gewaehlt.length > 1) {
    inhalt = h(
      'span',
      { class: 'chip', 'data-chip': '' },
      app.t('chat.n-elemente', { n: gewaehlt.length }),
    );
  } else {
    const e = gewaehlt[0] ?? (app.aktiv ? app.find(app.aktiv) : undefined) ?? app.dokument();
    const z = gewaehlt[0] ? app.zustaende(e.id) : [];
    inhalt = h(
      'span',
      {
        class: 'chip',
        'data-chip': '',
        'data-id': e.id,
        'data-zustand': z.join(' ') || null,
        'data-akzent': z.includes('ausgewaehlt') ? 'auswahl' : null,
      },
      e.meta.name,
    );
  }
  return h(
    'div',
    { class: 'kontext', 'data-chat-kontext': '', 'data-key': 'kontext' },
    h('span', { class: 'zu' }, app.t('chat.zu')),
    ' ',
    inhalt,
  );
}

export function karte(app: App): HTMLElement | null {
  const v = app.chat.vorschlag;
  if (!v) return null;
  return h(
    'div',
    {
      class: 'karte',
      'data-muster': 'Entscheidungskarte',
      'data-quelle': 'ki',
      'data-akzent': 'ki',
      'data-key': 'karte',
    },
    h(
      'div',
      { class: 'karte-kopf' },
      symbol('sparkles', 14),
      h('span', { class: 'simuliert' }, app.t('simuliert')),
    ),
    h('div', { class: 'karte-titel' }, v.titel),
    h('div', { class: 'karte-text' }, v.begruendung),
    ...v.werte.map((w, i) =>
      h(
        'div',
        { class: 'karte-wert', 'data-key': `w-${i}` },
        h('span', { class: 'feld' }, w.feld),
        h('span', { class: 'vorher' }, w.vorher),
        symbol('chevron-right', 12),
        h('span', { class: 'nachher' }, w.nachher),
      ),
    ),
    h(
      'div',
      { class: 'karte-knoepfe' },
      h(
        'button',
        { type: 'button', class: 'knopf', 'data-befehl': 'chat.verwerfen' },
        app.t('chat.verwerfen'),
      ),
      h(
        'button',
        {
          type: 'button',
          class: 'knopf haupt',
          'data-befehl': 'chat.uebernehmen',
          'data-hauptaktion': '',
          'data-akzent': 'hauptaktion',
        },
        app.t('chat.uebernehmen'),
      ),
    ),
  );
}

/** Entscheidungskarte eines Änderungssatzes der KI (ap-52, Muster „Entscheidungskarte“, ADR-021). */
export function kiKarte(app: App, k: Karte): HTMLElement {
  const zeile = (art: string, ids: string[]) =>
    ids.length
      ? h(
          'div',
          { class: 'karte-wert', 'data-key': `${art}`, 'data-ki-aenderung': art },
          h('span', { class: 'feld' }, app.t(`ki.karte.${art}`, { n: ids.length })),
          h('span', { class: 'nachher' }, ids.map((i) => k.namen[i] ?? i).join(', ')),
        )
      : null;
  return h(
    'div',
    {
      class: `karte${k.offen ? '' : ' erledigt'}`,
      'data-muster': 'Entscheidungskarte',
      'data-quelle': 'ki',
      'data-akzent': k.offen ? 'ki' : null,
      'data-key': `ki-karte-${k.nr}`,
      'data-ki-karte': String(k.nr),
      'data-status': k.status,
    },
    h(
      'div',
      { class: 'karte-kopf' },
      symbol('sparkles', 14),
      h('span', { class: 'simuliert' }, app.t(`ki.status.${k.status}`)),
    ),
    h('div', { class: 'karte-titel' }, k.titel),
    h('div', { class: 'karte-text' }, k.begruendung),
    zeile('neu', k.neu),
    zeile('verworfen', k.verworfen),
    zeile('ausgeblendet', k.ausgeblendet),
    ...k.befunde.map((b, i) =>
      h(
        'div',
        { class: 'karte-text befund', 'data-key': `b-${i}`, 'data-muster': 'Befund' },
        b.message,
      ),
    ),
    k.offen
      ? h(
          'div',
          { class: 'karte-knoepfe' },
          h(
            'button',
            { type: 'button', class: 'knopf', 'data-befehl': 'chat.verwerfen' },
            app.t('chat.verwerfen'),
          ),
          h(
            'button',
            {
              type: 'button',
              class: 'knopf haupt',
              'data-befehl': 'chat.uebernehmen',
              'data-hauptaktion': '',
              'data-akzent': 'hauptaktion',
            },
            app.t('chat.uebernehmen'),
          ),
        )
      : null,
  );
}

export function baueChat(app: App): HTMLElement[] {
  return [
    h(
      'div',
      { class: 'zonenkopf', 'data-key': 'kopf' },
      h('h2', {}, app.t('chat.titel')),
      app.ki.bruecke
        ? h('span', { class: 'simuliert', 'data-ki-kopf': '' }, kopfText(app))
        : h('span', { class: 'simuliert' }, app.t('simuliert')),
    ),
    kontext(app),
    h(
      'div',
      { class: 'nachrichten', role: 'log', 'data-key': 'nachrichten' },
      ...(app.chat.nachrichten.length
        ? app.chat.nachrichten.flatMap((n, i) => {
            const k = n.karte ? app.ki.karten.find((x) => x.nr === n.karte) : undefined;
            const blase = h(
              'div',
              { class: `nachricht ${n.von}`, 'data-key': `n-${i}` },
              n.schluessel ? app.t(n.schluessel, n.werte) : n.text,
            );
            return k ? [blase, kiKarte(app, k)] : [blase];
          })
        : [
            h(
              'p',
              { class: 'hinweis', 'data-key': 'hinweis' },
              app.t(app.ki.bruecke ? 'ki.hinweis' : 'chat.hinweis'),
            ),
          ]),
      app.ki.beschaeftigt
        ? h('p', { class: 'hinweis', 'data-key': 'denkt', 'data-ki-denkt': '' }, app.t('ki.denkt'))
        : null,
      karte(app),
    ),
    h(
      'div',
      { class: 'eingabezeile', 'data-key': 'eingabe' },
      h('input', {
        type: 'text',
        class: 'chat-eingabe',
        'data-chat-eingabe': '',
        'data-befehl': 'chat.senden',
        placeholder: app.t('chat.platzhalter'),
        'aria-label': app.t('chat.platzhalter'),
        value: app.chat.eingabe,
        autocomplete: 'off',
      }),
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-befehl': 'chat.senden',
          'data-chat-senden': '',
          'aria-label': app.t('befehl.chat.senden'),
          title: app.t('befehl.chat.senden'),
        },
        symbol('arrow-up'),
      ),
    ),
  ];
}
