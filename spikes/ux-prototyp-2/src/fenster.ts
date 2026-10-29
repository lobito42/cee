// Fensteraufbau (ADR-065): Menüleiste, Taskleiste, Struktur, Modell, Eigenschaften, Chat, Panel, Rückmeldezeile.
import type { App } from './app';
import { Szene } from './ansicht/szene';
import { ergebnisVon } from './geometrie/teil';
import { h } from './ui/dom';
import { abgleichen } from './ui/dom';
import { baueChat } from './zonen/chat';
import { baueEigenschaften } from './zonen/eigenschaften';
import { baueKontextmenue } from './zonen/kontextmenue';
import { baueMenueleiste } from './zonen/menueleiste';
import { baueModell } from './zonen/modell';
import { bauePanel } from './zonen/panel';
import { baueRueckmeldung } from './zonen/rueckmeldung';
import { baueStruktur } from './zonen/struktur';
import { baueTaskleiste } from './zonen/taskleiste';

export const ZONEN_REIHENFOLGE = [
  'menueleiste',
  'taskleiste',
  'struktur',
  'modell',
  'eigenschaften',
  'chat',
  'panel',
  'rueckmeldung',
] as const;

type Zonenname = (typeof ZONEN_REIHENFOLGE)[number];

export class Fenster {
  readonly rahmen: HTMLElement;
  readonly zonen = {} as Record<Zonenname, HTMLElement>;
  private readonly chrome: HTMLElement;
  private readonly overlay: HTMLElement;
  private zeichenSignatur = '';
  private klassen = '';
  readonly szene: Szene;

  constructor(
    private readonly wurzel: HTMLElement,
    private readonly app: App,
  ) {
    const zone = (name: Zonenname, tag: string, extra: Record<string, string> = {}) => {
      const e = h(tag, {
        'data-zone': name,
        tabindex: '0',
        'aria-label': app.t(`zone.${name}`),
        ...extra,
      });
      this.zonen[name] = e;
      return e;
    };
    this.rahmen = h('div', { class: 'fenster' });
    const rechts = h('div', { class: 'rechts-spalte' });
    rechts.append(
      zone('eigenschaften', 'section', { 'data-weg': 'eigenschaften' }),
      zone('chat', 'section', { 'data-weg': 'chat' }),
    );
    this.rahmen.append(
      zone('menueleiste', 'header', { role: 'menubar' }),
      zone('taskleiste', 'nav'),
      zone('struktur', 'aside', { 'data-weg': 'struktur' }),
      zone('modell', 'main'),
      rechts,
      zone('panel', 'section', { 'data-weg': 'menue' }),
      zone('rueckmeldung', 'footer'),
    );
    this.zonen.menueleiste.dataset.weg = 'menue';
    this.chrome = h('div', { class: 'chrome' });
    this.overlay = h('div', { class: 'ueberlagerung' });
    this.zonen.modell.append(this.chrome);
    this.wurzel.replaceChildren(this.rahmen, this.overlay);
    this.szene = new Szene(this.zonen.modell);
    this.szene.tempo = app.tempo;
    app.szene = this.szene;
    this.szene.beiAenderung(() => this.chromeNeu());
    app.beiRendern(() => this.rendern());
  }

  private chromeGeplant = false;

  /** Nur die Überlagerung im Modell neu zeichnen (Kamera hat sich bewegt). */
  private chromeNeu(): void {
    if (this.chromeGeplant) return;
    this.chromeGeplant = true;
    requestAnimationFrame(() => {
      this.chromeGeplant = false;
      this.chromeZeichnen();
    });
  }

  private chromeZeichnen(): void {
    const neu = h(
      'div',
      { class: 'chrome' },
      ...baueModell(this.app).filter((x): x is HTMLElement => !!x),
    );
    abgleichen(this.chrome, neu);
  }

  private zone(name: Zonenname, kinder: (HTMLElement | null)[]): void {
    const neu = h('div', {}, ...kinder.filter((x): x is HTMLElement => !!x));
    abgleichen(this.zonen[name], this.mitAttributen(this.zonen[name], neu));
  }

  /** Behält Attribute und fremde Kinder der Zone (Leinwand, Überlagerung) und gleicht nur den Inhalt ab. */
  private mitAttributen(alt: HTMLElement, neu: HTMLElement): HTMLElement {
    for (const a of [...alt.attributes]) neu.setAttribute(a.name, a.value);
    return neu;
  }

  rendern(): void {
    const app = this.app;
    const z = app.zonen;
    const klassen = [
      z.struktur ? '' : 'ohne-struktur',
      z.rechts ? '' : 'ohne-rechts',
      z.panel ? 'mit-panel' : '',
    ]
      .filter(Boolean)
      .join(' ');
    if (klassen !== this.klassen) {
      this.klassen = klassen;
      this.rahmen.className = `fenster ${klassen}`.trim();
      this.szene.groesseAnpassen();
    }
    if (this.szene.projektion !== app.projektionsart) this.szene.setProjektion(app.projektionsart);
    document.documentElement.dataset.thema = app.thema;
    this.rahmen.dataset.task = app.task;

    this.zone('menueleiste', baueMenueleiste(app));
    this.zone('taskleiste', baueTaskleiste(app));
    this.zone('struktur', baueStruktur(app));
    this.zone('eigenschaften', baueEigenschaften(app));
    this.zone('chat', baueChat(app));
    this.zone('panel', z.panel ? bauePanel(app) : []);
    this.zone('rueckmeldung', baueRueckmeldung(app));

    this.zeichneSzene();
    this.chromeZeichnen();
    this.ueberlagerung();
    this.fokusSetzen();
  }

  /** Fokus dorthin, wo die Eingabe weitergeht: Suchfeld, Namensfeld, erstes Wertfeld. */
  private fokusSetzen(): void {
    const app = this.app;
    const aktiv = document.activeElement;
    if (app.suche.offen) {
      const f = this.rahmen.querySelector<HTMLInputElement>('[data-suchfeld]');
      if (f && aktiv !== f && !app.suche.fokussiert) {
        app.suche.fokussiert = true;
        f.focus();
      }
    } else app.suche.fokussiert = false;
    if (app.umbenennen) {
      const f = this.rahmen.querySelector<HTMLInputElement>('[data-umbenennen]');
      if (f && aktiv !== f && !app.umbenennenFokussiert) {
        app.umbenennenFokussiert = true;
        f.focus();
        f.select();
      }
    } else app.umbenennenFokussiert = false;
    const km = app.kontextMenue;
    if (km?.fokus) {
      const ziel = km.fokus === 'mehr' ? '[data-mehr-toggle]' : '.kontextmenue-mehr [data-befehl]';
      km.fokus = undefined;
      document.querySelector<HTMLElement>(`.kontextmenue ${ziel}, ${ziel}`)?.focus();
    }
    if (app.fokusEigenschaften) {
      app.fokusEigenschaften = false;
      this.rahmen.querySelector<HTMLInputElement>('[data-feld-eingabe]')?.focus();
    }
  }

  private zeichneSzene(): void {
    const app = this.app;
    const dok = app.angezeigtesDokument();
    const erg = ergebnisVon(dok);
    const versteckt = app.versteckteIds();
    const gedimmt = app.gedimmteIds();
    const blass = app.blasseIds();
    const geister = app.geisterKoerper();
    const signatur = JSON.stringify([
      dok,
      [...versteckt],
      [...gedimmt],
      [...blass],
      app.darstellung,
      app.thema,
      geister,
    ]);
    if (signatur === this.zeichenSignatur) return;
    this.zeichenSignatur = signatur;
    this.szene.zeichne({
      koerper: erg.koerper,
      darstellung: app.darstellung,
      versteckt,
      gedimmt,
      blass,
      geister,
    });
    if (app.einpassenNoetig) {
      app.einpassenNoetig = false;
      this.einpassenSofort();
    }
  }

  /** Beim ersten Zeichnen eines Dokuments: ganzes Teil einpassen, ohne Übergang. */
  einpassenSofort(): void {
    this.szene.groesseAnpassen();
    this.szene.passeEin(this.app.huelleAlle(), 0);
  }

  /** Setzt die Zeichen-Signatur zurück (neues Dokument: neu einpassen). */
  neuesDokument(): void {
    this.zeichenSignatur = '';
  }

  /** Elemente außerhalb der Zonen: Kontextmenü, Ziehvorschau. */
  private ueberlagerung(): void {
    const app = this.app;
    const kinder: HTMLElement[] = [];
    const menue = baueKontextmenue(app);
    if (menue) kinder.push(menue);
    if (app.dnd) {
      const e = app.find(app.dnd.id);
      kinder.push(
        h(
          'div',
          {
            class: 'zieh-vorschau',
            'data-overlay': 'ziehen',
            'data-muster-kandidat': 'Ziehen & Ablegen',
            'data-key': 'ziehen',
            style: `left:${Math.round(app.dnd.x + 14)}px;top:${Math.round(app.dnd.y + 14)}px`,
          },
          e?.meta.name ?? '',
        ),
      );
    }
    abgleichen(this.overlay, h('div', { class: 'ueberlagerung' }, ...kinder));
  }
}
