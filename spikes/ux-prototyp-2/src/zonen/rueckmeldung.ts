// Rückmeldezeile (Muster Rückmeldung): leise Zeile unten für Bestätigungen und Hinweise.
import type { App } from '../app';
import { h } from '../ui/dom';

export function baueRueckmeldung(app: App): HTMLElement[] {
  const r = app.rueckmeldung;
  if (!r) return [];
  return [
    h(
      'span',
      {
        class: 'rueckmeldung-text',
        'data-muster': 'Rueckmeldung',
        role: 'status',
        'data-key': 'text',
      },
      app.t(r.schluessel, r.werte),
    ),
  ];
}
