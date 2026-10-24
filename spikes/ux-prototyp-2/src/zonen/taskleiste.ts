// Taskleiste (ADR-065): ganz links, wechselt Menüs und Struktur; Simulation und Shop sind Platzhalter.
import type { App } from '../app';
import { h, symbol, type Symbolname } from '../ui/dom';

function knopf(app: App, task: 'modellieren' | 'simulation', name: Symbolname): HTMLElement {
  const an = app.task === task;
  return h(
    'button',
    {
      type: 'button',
      class: 'task',
      'data-befehl': 'task.wechseln',
      'data-par': JSON.stringify({ task }),
      'aria-pressed': an ? 'true' : 'false',
      'aria-current': an ? 'true' : null,
      title: app.t(`task.${task}`),
      'aria-label': app.t(`task.${task}`),
    },
    symbol(name, 20),
  );
}

export function baueTaskleiste(app: App): HTMLElement[] {
  return [
    h(
      'div',
      { class: 'tasks', role: 'group', 'data-key': 'tasks' },
      knopf(app, 'modellieren', 'box'),
      knopf(app, 'simulation', 'play'),
    ),
    h(
      'div',
      { class: 'unten', 'data-key': 'unten' },
      h(
        'button',
        {
          type: 'button',
          class: 'task',
          'aria-disabled': 'true',
          title: app.t('task.shop'),
          'aria-label': app.t('task.shop'),
        },
        symbol('layers', 20),
      ),
    ),
  ];
}
