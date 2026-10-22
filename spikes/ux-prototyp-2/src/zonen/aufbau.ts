// Aufbau (links): die Schritte von oben nach unten, Skizzen als eingerückte Unterzeilen.
import type { App, Zone } from '../app';
import { teilErgebnis } from '../geometrie/teil';
import { skizzeVon, type Element } from '../modell/projekt';
import { abgleichen, h } from './dom';

export interface Zeile {
  id: string;
  name: string;
  ebene: number;
  art: 'schritt' | 'trenner';
  /** Schritt, dem die Zeile beim Überfahren und Wählen zugeordnet ist. */
  schritt: string;
  deaktiviert: boolean;
  status: { wort: string; symbol: string } | null;
  sketch: boolean;
}

function hatSkizze(e: Element): boolean {
  return !!skizzeVon(e) || e.type === 'skizze';
}

export function aufbauZeilen(app: App): Zeile[] {
  const ui = app.ui;
  const p = app.angezeigt();
  const zeilen: Zeile[] = [];
  const zeile = (e: Element, ebene: number, extra: Partial<Zeile> = {}): Zeile => ({
    id: e.id,
    name: e.meta.name,
    ebene,
    art: 'schritt',
    schritt: e.id,
    deaktiviert: false,
    status: null,
    sketch: hatSkizze(e),
    ...extra,
  });
  const teile = p.content.filter((k) => k.type === 'teil');
  const einTeil = teile.length === 1 && !teile[0]?.params.form;
  const gewaehlt = new Set(ui.auswahl);

  const schritte = (teil: Element, ebene: number) => {
    const ergebnis = teilErgebnis(teil);
    const befund = new Map(ergebnis.befunde.map((b) => [b.schritt, b]));
    const ortIndex =
      ui.ort.art === 'skizze' ? teil.content.findIndex((k) => k.id === ui.ort.schritt) : -1;
    teil.content.forEach((k, i) => {
      if (k.type === 'ursprung') {
        zeilen.push(zeile(k, ebene));
        if (ui.ebenenWahl || gewaehlt.has(k.id))
          for (const e of k.content) zeilen.push(zeile(e, ebene + 1));
        return;
      }
      const status = befund.has(k.id)
        ? { wort: 'status.fehlerhaft', symbol: 'symbol.fehler' }
        : null;
      zeilen.push(zeile(k, ebene, { deaktiviert: ortIndex >= 0 && i > ortIndex, status }));
      const sk = skizzeVon(k);
      const offen = gewaehlt.has(k.id) || ui.ort.schritt === k.id || (sk && gewaehlt.has(sk.id));
      if (sk && offen)
        zeilen.push(
          zeile(sk, ebene + 1, { schritt: k.id, deaktiviert: ortIndex >= 0 && i > ortIndex }),
        );
    });
  };

  if (einTeil && teile[0]) {
    schritte(teile[0], 0);
  } else {
    for (const k of p.content) {
      if (k.type === 'teil') {
        zeilen.push(zeile(k, 0));
      } else if (k.type === 'baugruppe') {
        zeilen.push(zeile(k, 0));
        for (const c of k.content) zeilen.push(zeile(c, 1));
      }
    }
  }
  if (ui.bereich === 'simulation') {
    zeilen.push({
      id: 'trenner-simulation',
      name: 'aufbau.simulation',
      ebene: 0,
      art: 'trenner',
      schritt: '',
      deaktiviert: false,
      status: null,
      sketch: false,
    });
    const studie = p.content.find((k) => k.type === 'studie');
    for (const k of studie?.content ?? []) zeilen.push(zeile(k, 0));
  }
  return zeilen;
}

export class AufbauZone implements Zone {
  private readonly liste = h('div', { role: 'tree', class: 'baum', 'aria-label': 'Aufbau' });

  constructor(
    private readonly app: App,
    readonly el: HTMLElement,
  ) {
    el.append(h('h2', {}, app.t('app.aufbau')), this.liste);
    this.liste.addEventListener('click', (e) => {
      const z = (e.target as HTMLElement).closest<HTMLElement>('[data-schritt]');
      if (!z || z.getAttribute('aria-disabled') === 'true') return;
      app.waehlen([z.dataset.schritt as string], e.shiftKey);
    });
    this.liste.addEventListener('dblclick', (e) => {
      const z = (e.target as HTMLElement).closest<HTMLElement>('[data-schritt]');
      if (!z || z.getAttribute('aria-disabled') === 'true' || z.dataset.skizze !== '1') return;
      app.starte('ort.skizze-bearbeiten', { schritt: z.dataset.schritt });
    });
    this.liste.addEventListener('contextmenu', (e) => {
      const z = (e.target as HTMLElement).closest<HTMLElement>('[data-schritt]');
      if (!z) return;
      e.preventDefault();
      const id = z.dataset.schritt as string;
      if (!app.ui.auswahl.includes(id)) app.waehlen([id]);
      app.ui.menue = { x: e.clientX, y: e.clientY };
      app.aktualisieren();
    });
    this.liste.addEventListener('mouseover', (e) => {
      const z = (e.target as HTMLElement).closest<HTMLElement>('[data-schritt]');
      app.setHover(z?.dataset.ziel ?? null);
    });
    this.liste.addEventListener('mouseleave', () => app.setHover(null));
  }

  rendern(): void {
    const app = this.app;
    const zeilen = aufbauZeilen(app);
    abgleichen(this.liste, JSON.stringify(zeilen), () =>
      zeilen.map((z) => {
        if (z.art === 'trenner')
          return h('div', { role: 'separator', class: 'trenner' }, app.t(z.name));
        return h(
          'button',
          {
            type: 'button',
            role: 'treeitem',
            class: 'zeile',
            'data-schritt': z.id,
            'data-ziel': z.schritt,
            'data-ebene': z.ebene,
            'data-skizze': z.sketch ? '1' : null,
            'data-befehl': 'auswahl.setzen',
          },
          h('span', { class: 'name' }, z.name),
          z.status
            ? h(
                'span',
                { class: 'status status-fehler', 'data-muster': 'Statusanzeige' },
                h('span', { class: 'symbol' }, app.t(z.status.symbol)),
                h('span', { class: 'wort' }, app.t(z.status.wort)),
              )
            : null,
        );
      }),
    );
    // Markierungen ändern sich ohne neuen Bau (Überfahren, Auswahl)
    const gewaehlt = new Set(app.ui.auswahl);
    const zugehoerig = new Set(app.kantenAuswahl().map((id) => id.split('/')[0] as string));
    const bylid = new Map(zeilen.map((z) => [z.id, z]));
    for (const knopf of this.liste.querySelectorAll<HTMLElement>('[data-schritt]')) {
      const id = knopf.dataset.schritt as string;
      const z = bylid.get(id);
      knopf.setAttribute('aria-selected', gewaehlt.has(id) ? 'true' : 'false');
      if (z?.deaktiviert) knopf.setAttribute('aria-disabled', 'true');
      else knopf.removeAttribute('aria-disabled');
      if (zugehoerig.has(id)) knopf.setAttribute('data-zugehoerig', '');
      else knopf.removeAttribute('data-zugehoerig');
      if (app.ui.hover !== null && app.ui.hover === knopf.dataset.ziel)
        knopf.setAttribute('data-hervorgehoben', '');
      else knopf.removeAttribute('data-hervorgehoben');
    }
  }
}
