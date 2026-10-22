// Layout: fünf Zonen auf einem Bildschirm (Kopfzeile, Aufbau, Modell, Inspektor, Rückmeldezeile).
import type { App, Zone } from '../app';
import { AufbauZone } from './aufbau';
import { h } from './dom';
import { InspektorZone } from './inspektor';
import { KopfZone } from './kopf';
import { ModellZone } from './modellzone';

class RueckmeldungZone implements Zone {
  constructor(
    private readonly app: App,
    private readonly el: HTMLElement,
  ) {}

  rendern(): void {
    const r = this.app.ui.rueckmeldung;
    const text = this.app.t(r.schluessel, r.werte);
    if (this.el.textContent !== text) this.el.textContent = text;
  }
}

export function aufbauen(
  wurzel: HTMLElement,
  app: App,
): { inspektor: InspektorZone; modell: ModellZone } {
  const kopf = h('header', { 'data-zone': 'kopf', class: 'kopfzeile' });
  const aufbau = h('nav', {
    'data-zone': 'aufbau',
    'data-panel': 'aufbau',
    'aria-label': 'Aufbau',
  });
  const modell = h('main', { 'data-zone': 'modell', class: 'flaeche3d' });
  const inspektor = h('aside', {
    'data-zone': 'inspektor',
    'data-panel': 'inspektor',
    'aria-label': 'Inspektor',
  });
  const rueck = h('footer', {
    'data-zone': 'rueckmeldung',
    'data-muster': 'Rückmeldung',
    role: 'status',
  });
  wurzel.append(kopf, aufbau, modell, inspektor, rueck);
  const inspektorZone = new InspektorZone(app, inspektor);
  const modellZone = new ModellZone(app, modell, (name) => inspektorZone.feldFokussieren(name));
  app.zonen = [
    new KopfZone(app, kopf),
    new AufbauZone(app, aufbau),
    modellZone,
    inspektorZone,
    new RueckmeldungZone(app, rueck),
  ];
  return { inspektor: inspektorZone, modell: modellZone };
}
