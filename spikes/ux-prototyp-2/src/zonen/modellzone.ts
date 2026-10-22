// Modellzone (Mitte): three.js-Leinwand und alles, was darauf liegt – Griffe, Kontextaktionen, Maße der Skizze,
// Umschalter der Darstellung, Legende, Zahl am Zeiger. Hier läuft auch die Mausbedienung (Profil „Standard“).
import { ebeneVon, wertVon, type App, type Zone } from '../app';
import { Szene, type Punkt } from '../ansicht/szene';
import { anzeigen, lesen, type Groesse } from '../wert/wertfeld';
import { schrittVon, skizzeVon, mm, type Element } from '../modell/projekt';
import { h, symbol, SYMBOLE } from './dom';
import type { V3 } from '../geometrie/teil';

export interface GriffD {
  schritt: string;
  parameter: string;
  name: string;
}

/** Griffe am gewählten Schritt (Pfeil für den Längen-Parameter, hier Dicke bzw. Höhe der Extrusion). */
export function griffeListe(app: App): GriffD[] {
  if (app.ui.ort.art === 'skizze') return [];
  const e = app.gewaehlt();
  if (!e || e.type !== 'extrusion') return [];
  const name = e.params.dicke ? 'dicke' : 'hoehe';
  return [{ schritt: e.id, parameter: app.t(`feld.${name}`), name }];
}

/** Befehle der Kontextaktionen für die aktuelle Auswahl, die häufigsten zuerst. */
export function kontextBefehle(app: App): string[] {
  const ui = app.ui;
  const sel = ui.auswahl;
  if (!sel.length) return [];
  const p = app.angezeigt();
  const kanten = app.kantenAuswahl();
  if (kanten.length) {
    const nurOben = kanten.every((k) => (k.split('/')[2] ?? '').startsWith('oben-'));
    const schritte = new Set(kanten.map((k) => k.split('/')[0]));
    const ziel =
      schritte.size === 1
        ? p.content.flatMap((t) => t.content).find((x) => x.id === [...schritte][0])
        : undefined;
    return nurOben && ziel && ziel.type === 'extrusion' && ziel.params.hoehe
      ? ['feature.verrunden']
      : [];
  }
  if (sel.length > 1) {
    const teile = p.content.filter((t) => sel.includes(t.id) && t.type === 'teil');
    return teile.length === sel.length && !p.content.some((k) => k.type === 'baugruppe')
      ? ['baugruppe.anlegen']
      : [];
  }
  const e = schrittVon(p, sel[0] as string) ?? p.content.find((x) => x.id === sel[0]);
  if (!e) return [];
  const ausgeblendet = e.meta.ausgeblendet === true;
  const sichtbarkeit = ausgeblendet ? 'schritt.einblenden' : 'schritt.ausblenden';
  switch (e.type) {
    case 'extrusion':
    case 'bohrung':
      return ['ort.skizze-bearbeiten', sichtbarkeit, 'schritt.verwerfen'];
    case 'skizze':
      return e.params.laenge
        ? ['feature.extrudieren', 'ort.skizze-bearbeiten', 'schritt.verwerfen']
        : ['ort.skizze-bearbeiten', 'schritt.verwerfen'];
    case 'verrundung':
      return [sichtbarkeit, 'schritt.verwerfen'];
    case 'instanz':
      return ['verbindung.anlegen'];
    default:
      return [];
  }
}

interface Druck {
  knopf: number;
  x0: number;
  y0: number;
  x: number;
  y: number;
  bewegt: boolean;
  shift: boolean;
  zeichnen: boolean;
}

const SCHWELLE = 4;

export class ModellZone implements Zone {
  private readonly szene: Szene;
  private readonly ebenenschicht = h('div', { class: 'ebenenschicht' });
  private readonly griffeSchicht = h('div', { class: 'griffeschicht' });
  private readonly leiste = h('div', {
    'data-muster': 'Kontextaktionen',
    'data-overlay': 'kontextaktionen',
    'data-ort': 'leiste',
    role: 'group',
    hidden: true,
  });
  private readonly menue = h('div', {
    'data-muster': 'Kontextaktionen',
    'data-overlay': 'kontextaktionen',
    'data-ort': 'menue',
    role: 'menu',
    class: 'menue',
    hidden: true,
  });
  private readonly masse = h('div', { class: 'masse' });
  private readonly massLinien = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  private readonly zeiger = h(
    'div',
    { 'data-overlay': 'zahl-am-zeiger', 'data-muster': 'Wertfeld', class: 'zeiger', hidden: true },
    h('span', { class: 'zahl' }),
  );
  private readonly legende = h('div', {
    'data-muster-kandidat': 'Legende',
    'data-overlay': 'legende',
    class: 'legende',
    hidden: true,
  });
  private readonly status = h('div', { class: 'modellstatus' });
  private readonly punkte = h('div', { class: 'verbindungspunkte' });
  private readonly leer = h('div', {
    'data-muster': 'Leerer Zustand',
    class: 'leer',
    hidden: true,
  });
  private readonly unbekannt = h('div', {
    'data-muster': 'Befund',
    class: 'unbekannt',
    hidden: true,
  });
  private readonly umschalter = h('div', {
    'data-muster': 'Auswahlfeld',
    class: 'umschalter',
    role: 'radiogroup',
  });
  private druck: Druck | null = null;
  private sigs = new Map<string, string>();

  constructor(
    private readonly app: App,
    readonly el: HTMLElement,
    private readonly fokus: (feldName: string) => void,
  ) {
    this.massLinien.setAttribute('class', 'massLinien');
    this.szene = new Szene(el);
    app.szene = this.szene;
    this.szene.aufRender = () => this.positionieren();
    app.nachRender.push(() => this.positionieren());
    const einpassen = h(
      'button',
      { type: 'button', class: 'einpassen', 'data-befehl': 'ansicht.einpassen' },
      symbol([...SYMBOLE.einpassen]),
      h('span', {}, app.t('modell.einpassen')),
    );
    einpassen.addEventListener('click', () => app.starte('ansicht.einpassen'));
    for (const [id, key] of [
      ['koerper', 'modell.darstellung.koerper'],
      ['kanten', 'modell.darstellung.kanten'],
      ['durchsicht', 'modell.darstellung.durchsicht'],
    ] as const) {
      const b = h(
        'button',
        {
          type: 'button',
          role: 'radio',
          'data-befehl': `darstellung.${id}`,
          'data-darstellung': id,
        },
        app.t(key),
      );
      b.addEventListener('click', () => app.starte(`darstellung.${id}`));
      this.umschalter.append(b);
    }
    el.append(
      this.ebenenschicht,
      this.massLinien,
      this.masse,
      this.status,
      this.punkte,
      this.griffeSchicht,
      this.leiste,
      this.leer,
      this.unbekannt,
      this.legende,
      einpassen,
      this.umschalter,
      this.zeiger,
    );
    document.body.append(this.menue);
    this.maus();
  }

  // --- Maus (Profil „Standard“) --------------------------------------------------------------------

  private maus(): void {
    const app = this.app;
    const canvas = this.szene.canvas;
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    canvas.addEventListener('pointerdown', (e) => {
      if (app.ui.ziehen) return;
      const zeichnen = e.button === 0 && this.skizzeZeichnen();
      this.druck = {
        knopf: e.button,
        x0: e.clientX,
        y0: e.clientY,
        x: e.clientX,
        y: e.clientY,
        bewegt: false,
        shift: e.shiftKey,
        zeichnen,
      };
      if (e.button === 1) e.preventDefault();
      if (zeichnen) {
        const q = this.snap(e.clientX, e.clientY);
        if (q) app.ui.zeichnen = { u0: q.u, v0: q.v, u1: q.u, v1: q.v };
      }
      this.menueSchliessen();
    });
    window.addEventListener('pointermove', (e) => {
      const d = this.druck;
      if (!d) {
        if (e.target === canvas && !app.ui.ziehen)
          app.setHover(this.szene.flaecheBei(e.clientX, e.clientY));
        return;
      }
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      d.x = e.clientX;
      d.y = e.clientY;
      if (!d.bewegt && Math.hypot(e.clientX - d.x0, e.clientY - d.y0) >= SCHWELLE) d.bewegt = true;
      if (!d.bewegt) return;
      if (d.zeichnen) {
        const q = this.snap(e.clientX, e.clientY);
        if (q && app.ui.zeichnen) {
          app.ui.zeichnen.u1 = q.u;
          app.ui.zeichnen.v1 = q.v;
          app.aktualisieren();
        }
      } else if (d.knopf === 2 && !e.shiftKey) this.szene.drehen(-dx * 0.3, dy * 0.3);
      else if (d.knopf === 1 || (d.knopf === 2 && e.shiftKey)) this.szene.schieben(dx, dy);
    });
    window.addEventListener('pointerup', (e) => {
      const d = this.druck;
      this.druck = null;
      if (!d) return;
      if (d.zeichnen) {
        this.zeichnenBeenden();
        return;
      }
      if (d.bewegt) return;
      if (d.knopf === 0) this.klick(e);
      else if (d.knopf === 2) this.rechtsklick(e);
    });
    canvas.addEventListener('dblclick', (e) => {
      if (app.ui.ort.art !== 'teil') return;
      const id = this.szene.flaecheBei(e.clientX, e.clientY);
      if (!id) return;
      const e2 = schrittVon(app.angezeigt(), id);
      if (e2 && skizzeVon(e2)) app.starte('ort.skizze-bearbeiten', { schritt: e2.id });
    });
    canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.szene.zoomen(Math.exp(e.deltaY * 0.001), e.clientX, e.clientY);
      },
      { passive: false },
    );
    canvas.addEventListener('pointerleave', () => {
      if (!this.druck) app.setHover(null);
    });
    document.addEventListener('mousedown', (e) => {
      if (app.ui.menue && !this.menue.contains(e.target as Node)) this.menueSchliessen();
    });
  }

  private klick(e: PointerEvent): void {
    const app = this.app;
    if (app.ui.ort.art === 'skizze') return;
    const kante = this.szene.kanteBei(e.clientX, e.clientY);
    if (kante) {
      app.waehlen([kante], e.shiftKey);
      return;
    }
    const id = this.szene.flaecheBei(e.clientX, e.clientY);
    if (id) app.waehlen([id], e.shiftKey);
    else if (!e.shiftKey) app.starte('auswahl.aufheben');
  }

  private rechtsklick(e: PointerEvent): void {
    const app = this.app;
    const id = this.szene.flaecheBei(e.clientX, e.clientY);
    if (!id) return;
    if (!app.ui.auswahl.includes(id)) app.waehlen([id]);
    app.ui.menue = { x: e.clientX, y: e.clientY };
    app.aktualisieren();
  }

  private menueSchliessen(): void {
    if (!this.app.ui.menue) return;
    this.app.ui.menue = null;
    this.app.aktualisieren();
  }

  /** Zeichnen eines Rechtecks: nur in einer eigenständigen Skizze, die noch nicht extrudiert ist. */
  private skizzeZeichnen(): boolean {
    const ui = this.app.ui;
    if (ui.ort.art !== 'skizze' || !ui.ort.schritt) return false;
    const e = this.app.gewaehlt();
    return !!e && e.type === 'skizze';
  }

  private snap(x: number, y: number): { u: number; v: number } | null {
    const e = this.app.gewaehlt();
    const q = this.szene.aufEbene(x, y, ebeneVon(e));
    return q ? { u: Math.round(q.u), v: Math.round(q.v) } : null;
  }

  private zeichnenBeenden(): void {
    const app = this.app;
    const r = app.ui.zeichnen;
    app.ui.zeichnen = null;
    const e = app.gewaehlt();
    if (!r || !e) {
      app.aktualisieren();
      return;
    }
    const l = Math.abs(r.u1 - r.u0);
    const b = Math.abs(r.v1 - r.v0);
    if (l >= 1 && b >= 1) {
      app.starte('skizze.rechteck', {
        skizze: e.id,
        laenge: mm(l),
        breite: mm(b),
        mitte: { u: (r.u0 + r.u1) / 2, v: (r.v0 + r.v1) / 2 },
      });
    } else app.aktualisieren();
  }

  // --- Griffe (Ziehen und Tippen beim Ziehen, ADR-044) ---------------------------------------------

  private griffStart(g: GriffD, e: PointerEvent): void {
    const app = this.app;
    const p = app.angezeigt();
    const schritt = schrittVon(p, g.schritt);
    if (!schritt) return;
    const koerper = app.alleKoerper().find((k) => k.schritt === g.schritt);
    if (!koerper) return;
    const mitte: V3 = [
      (koerper.min[0] + koerper.max[0]) / 2,
      (koerper.min[1] + koerper.max[1]) / 2,
      koerper.max[2],
    ];
    const a = this.szene.projiziere(mitte);
    const b = this.szene.projiziere([mitte[0], mitte[1], mitte[2] + 10]);
    const start = wertVon(schritt.params[g.name]);
    e.preventDefault();
    e.stopPropagation();
    app.ui.ziehen = {
      schritt: g.schritt,
      name: g.name,
      start,
      startPunkt: { x: e.clientX, y: e.clientY },
      richtung: { x: (b.x - a.x) / 10, y: (b.y - a.y) / 10 },
      eingabe: '',
      zeiger: { x: e.clientX, y: e.clientY },
    };
    app.ui.live = { element: g.schritt, name: g.name, wert: mm(start) };
    const bewegen = (ev: PointerEvent) => {
      const z = app.ui.ziehen;
      if (!z) return;
      z.zeiger = { x: ev.clientX, y: ev.clientY };
      if (!z.eingabe) {
        const laenge2 = z.richtung.x ** 2 + z.richtung.y ** 2;
        const delta =
          ((ev.clientX - z.startPunkt.x) * z.richtung.x +
            (ev.clientY - z.startPunkt.y) * z.richtung.y) /
          laenge2;
        app.ui.live = {
          element: z.schritt,
          name: z.name,
          wert: mm(Math.max(1, z.start + Math.round(delta))),
        };
      }
      app.aktualisieren();
    };
    const ende = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', bewegen);
      window.removeEventListener('pointerup', ende);
      if (app.ui.ziehen) this.ziehenBeenden(true);
      void ev;
    };
    window.addEventListener('pointermove', bewegen);
    window.addEventListener('pointerup', ende);
    app.aktualisieren();
  }

  /** Beendet das Ziehen; `uebernehmen` übernimmt den Wert (ein Protokolleintrag), sonst Abbruch. */
  ziehenBeenden(uebernehmen: boolean): void {
    const app = this.app;
    const z = app.ui.ziehen;
    if (!z) return;
    const live = app.ui.live;
    app.ui.ziehen = null;
    app.ui.live = null;
    if (uebernehmen && live && live.wert.value !== z.start) {
      app.ausfuehren('element.wert-setzen', {
        element: live.element,
        name: live.name,
        wert: live.wert,
      });
    } else app.aktualisieren();
  }

  /** Tasten beim Ziehen: Ziffern setzen den genauen Wert, Enter übernimmt, Esc bricht ab. */
  ziehenTaste(e: KeyboardEvent): boolean {
    const app = this.app;
    const z = app.ui.ziehen;
    if (!z) return false;
    if (e.key === 'Escape') {
      this.ziehenBeenden(false);
    } else if (e.key === 'Enter') {
      this.ziehenBeenden(true);
    } else if (/^[0-9.,]$/.test(e.key)) {
      z.eingabe += e.key;
      const r = lesen(z.eingabe, 'mm');
      if (r.ok) app.ui.live = { element: z.schritt, name: z.name, wert: r.groesse };
      app.aktualisieren();
    } else if (e.key === 'Backspace') {
      z.eingabe = z.eingabe.slice(0, -1);
      const r = lesen(z.eingabe || String(z.start), 'mm');
      if (r.ok) app.ui.live = { element: z.schritt, name: z.name, wert: r.groesse };
      app.aktualisieren();
    } else return false;
    e.preventDefault();
    return true;
  }

  // --- Aufbau der Schichten -------------------------------------------------------------------------

  private setzen(name: string, signatur: string, bauen: () => void): void {
    if (this.sigs.get(name) === signatur) return;
    this.sigs.set(name, signatur);
    bauen();
  }

  rendern(): void {
    const app = this.app;
    const ui = app.ui;
    const t = app.t;
    const p = app.angezeigt();
    // Darstellung
    this.umschalter
      .querySelectorAll<HTMLElement>('[role="radio"]')
      .forEach((b) =>
        b.setAttribute('aria-checked', b.dataset.darstellung === ui.darstellung ? 'true' : 'false'),
      );
    // Leerer Zustand
    const teile = p.content.filter((k) => k.type === 'teil');
    const hatInhalt = teile.some(
      (tt) => tt.params.form || tt.content.some((k) => k.type !== 'ursprung'),
    );
    const zeigeLeer =
      !hatInhalt && ui.ort.art === 'teil' && !ui.ebenenWahl && !ui.unbekannterZustand;
    this.leer.hidden = !zeigeLeer;
    this.setzen('leer', String(zeigeLeer), () => {
      const knopf = h(
        'button',
        { type: 'button', class: 'knopf', 'data-befehl': 'skizze.anlegen', 'data-hauptaktion': '' },
        t('befehl.skizze.anlegen'),
      );
      knopf.addEventListener('click', () => app.starte('skizze.anlegen'));
      this.leer.replaceChildren(h('p', {}, t('leer.text')), knopf);
    });
    // Unbekannter Zustand: ein Befund
    this.unbekannt.hidden = !ui.unbekannterZustand;
    this.setzen('unbekannt', String(ui.unbekannterZustand), () =>
      this.unbekannt.replaceChildren(h('p', {}, t('zustand.unbekannt'))),
    );
    // Ebenenwahl
    this.setzen('ebenen', String(ui.ebenenWahl), () => {
      if (!ui.ebenenWahl) {
        this.ebenenschicht.replaceChildren();
        return;
      }
      const gruppe = h(
        'div',
        { class: 'ebenenwahl', 'data-muster': 'Auswahlfeld' },
        h('p', {}, t('ebene.waehlen')),
      );
      for (const n of ['XY', 'XZ', 'YZ']) {
        const b = h(
          'button',
          { type: 'button', 'data-befehl': 'skizze.anlegen', 'data-ebene': n },
          n,
        );
        b.addEventListener('click', () => app.starte('skizze.anlegen', { ebene: n }));
        gruppe.append(b);
      }
      this.ebenenschicht.replaceChildren(gruppe);
    });
    // Griffe
    const griffe = griffeListe(app);
    this.setzen('griffe', JSON.stringify(griffe), () => {
      this.griffeSchicht.replaceChildren(
        ...griffe.map((g) => {
          const b = h(
            'button',
            {
              type: 'button',
              class: 'griff',
              'data-griff': g.parameter,
              'data-schritt': g.schritt,
              'data-befehl': 'element.wert-setzen',
              'aria-label': g.parameter,
            },
            symbol([...SYMBOLE.pfeilHoch]),
          );
          b.addEventListener('pointerdown', (e) => this.griffStart(g, e));
          return b;
        }),
      );
    });
    // Kontextaktionen
    const befehle = ui.ort.art === 'teil' && !ui.ziehen ? kontextBefehle(app) : [];
    const knoepfe = (rolle: string) =>
      befehle.map((id) => {
        const b = h(
          'button',
          { type: 'button', role: rolle || null, 'data-befehl': id },
          t(`befehl.${id}`),
        );
        b.addEventListener('click', () => {
          ui.menue = null;
          app.starte(id);
        });
        return b;
      });
    this.setzen('leiste', JSON.stringify(befehle), () =>
      this.leiste.replaceChildren(...knoepfe('')),
    );
    this.leiste.hidden = befehle.length === 0;
    const menueBefehle = ui.menue ? kontextBefehle(app) : [];
    this.setzen('menue', JSON.stringify(menueBefehle), () => {
      const items = menueBefehle.map((id) => {
        const b = h(
          'button',
          { type: 'button', role: 'menuitem', 'data-befehl': id },
          t(`befehl.${id}`),
        );
        b.addEventListener('click', () => {
          ui.menue = null;
          app.starte(id);
        });
        return b;
      });
      this.menue.replaceChildren(...items);
    });
    this.menue.hidden = !ui.menue || menueBefehle.length === 0;
    if (ui.menue) {
      this.menue.style.left = `${ui.menue.x}px`;
      this.menue.style.top = `${ui.menue.y}px`;
    }
    // Maße der Skizze
    const sk =
      ui.ort.art === 'skizze' && ui.ort.schritt ? schrittVon(p, ui.ort.schritt) : undefined;
    const skizze = sk ? (sk.type === 'skizze' ? sk : skizzeVon(sk)) : undefined;
    const massSig = JSON.stringify([
      skizze?.params.laenge,
      skizze?.params.breite,
      skizze?.params.eckradius,
      sk?.id,
    ]);
    this.setzen('masse', massSig, () => {
      if (!sk || !skizze || !skizze.params.laenge) {
        this.masse.replaceChildren();
        return;
      }
      const praefix = sk.type === 'skizze' ? '' : 'skizze.';
      const mass = (name: 'laenge' | 'breite' | 'eckradius', g: Groesse | undefined) => {
        if (!g) return null;
        const b = h(
          'button',
          {
            type: 'button',
            class: 'mass',
            'data-mass': name,
            'data-befehl': 'element.wert-setzen',
          },
          anzeigen(g, app.sprache === 'en' ? 'en' : 'de'),
        );
        b.addEventListener('click', () => this.fokus(`${praefix}${name}`));
        return b;
      };
      this.masse.replaceChildren(
        ...([
          mass('laenge', skizze.params.laenge),
          mass('breite', skizze.params.breite),
          mass('eckradius', skizze.params.eckradius),
        ].filter((x) => !!x) as HTMLElement[]),
      );
    });
    // Status im Modell (Befund)
    const befunde = app.ergebnisAktiv()?.befunde ?? [];
    this.setzen('status', JSON.stringify(befunde), () => {
      this.status.replaceChildren(
        ...befunde.map((b) =>
          h(
            'div',
            {
              class: 'status status-fehler',
              'data-modell-status': '',
              'data-schritt': b.schritt,
              'data-muster': 'Statusanzeige',
            },
            h('span', { class: 'symbol' }, t('symbol.fehler')),
            h('span', { class: 'wort' }, t('status.fehlerhaft')),
          ),
        ),
      );
    });
    // Verbindungspunkte
    const punkte = ui.verbinden ? verbindungspunkte(app) : [];
    this.setzen('punkte', JSON.stringify([punkte.map((q) => q.id), ui.verbinden]), () => {
      this.punkte.replaceChildren(
        ...punkte.map((q) => {
          const b = h(
            'button',
            {
              type: 'button',
              class: 'punkt',
              'data-verbindungspunkt': q.id,
              'data-befehl': 'verbindung.anlegen',
            },
            q.name,
          );
          b.addEventListener('click', () => {
            const v = ui.verbinden;
            if (!v) return;
            if (v.phase === 'von') {
              ui.verbinden = { phase: 'nach', von: q.id };
              app.aktualisieren();
            } else {
              const mover = app.gewaehlt()?.type === 'instanz' ? app.gewaehlt()?.id : undefined;
              app.ausfuehren('verbindung.anlegen', { von: v.von, nach: q.id, art: 'Fest', mover });
            }
          });
          return b;
        }),
      );
    });
    // Legende (Beispielpaket Simulation)
    const studie = p.content.find((k) => k.type === 'studie');
    const kraft = studie?.content.find((k) => k.type === 'kraft');
    const maximum = wertVon(kraft?.params.kraft) * 0.02;
    const zeigeLegende = ui.bereich === 'simulation';
    this.legende.hidden = !zeigeLegende;
    this.setzen('legende', JSON.stringify([zeigeLegende, maximum]), () => {
      this.legende.replaceChildren(
        h('p', { class: 'titel' }, t('paket.simulation.legende')),
        h('div', { class: 'skala' }),
        h(
          'div',
          { class: 'marken' },
          h('span', {}, anzeigen(mm(0), app.sprache === 'en' ? 'en' : 'de')),
          h(
            'span',
            { 'data-legende-max': '' },
            anzeigen(mm(maximum), app.sprache === 'en' ? 'en' : 'de'),
          ),
        ),
        h('p', { class: 'hinweis' }, t('paket.simulation.simuliert')),
      );
    });
    // Zahl am Zeiger
    const z = ui.ziehen;
    this.zeiger.hidden = !z;
    if (z) {
      const live = ui.live;
      const text = z.eingabe
        ? `${z.eingabe} mm`
        : live
          ? anzeigen(live.wert, app.sprache === 'en' ? 'en' : 'de')
          : '';
      (this.zeiger.firstElementChild as HTMLElement).textContent = text;
      this.zeiger.style.left = `${z.zeiger.x}px`;
      this.zeiger.style.top = `${z.zeiger.y - 34}px`;
    }
    this.positionieren();
  }

  // --- Lage der Overlays (folgt der Kamera) ----------------------------------------------------------

  private zone(): DOMRect {
    return this.el.getBoundingClientRect();
  }

  private auswahlBox(): { x: number; y: number; breite: number; hoehe: number } | null {
    const app = this.app;
    const p = app.angezeigt();
    const punkte: Punkt[] = [];
    for (const id of app.ui.auswahl) {
      if (id.includes('/k/')) {
        const kante = app
          .alleKoerper()
          .flatMap((k) => k.kanten)
          .find((k) => k.id === id);
        if (kante) punkte.push(this.szene.projiziere(kante.von), this.szene.projiziere(kante.bis));
        continue;
      }
      const step = schrittVon(p, id);
      const box = this.szene.huellbox(step?.id ?? id) ?? this.szene.huellbox(id);
      if (box) punkte.push({ x: box.x, y: box.y }, { x: box.x + box.breite, y: box.y + box.hoehe });
      else if (step) {
        const sk = step.type === 'skizze' ? step : skizzeVon(step);
        if (sk?.params.laenge) {
          const mu = wertVon(sk.params.mitte?.x);
          const mv = wertVon(sk.params.mitte?.y);
          const l = wertVon(sk.params.laenge) / 2;
          const b = wertVon(sk.params.breite) / 2;
          for (const [du, dv] of [
            [-l, -b],
            [l, b],
          ] as const)
            punkte.push(this.szene.projiziere(ebenenPunkt(ebeneVon(sk), mu + du, mv + dv, 0)));
        }
      }
    }
    if (!punkte.length) return null;
    const x0 = Math.min(...punkte.map((q) => q.x));
    const x1 = Math.max(...punkte.map((q) => q.x));
    const y0 = Math.min(...punkte.map((q) => q.y));
    const y1 = Math.max(...punkte.map((q) => q.y));
    return { x: x0, y: y0, breite: x1 - x0, hoehe: y1 - y0 };
  }

  positionieren(): void {
    const app = this.app;
    const ui = app.ui;
    const zone = this.zone();
    const rel = (q: Punkt): Punkt => ({ x: q.x - zone.left, y: q.y - zone.top });
    // Kontextleiste über dem Gewählten
    if (!this.leiste.hidden) {
      const box = this.auswahlBox();
      if (box) {
        const breite = this.leiste.offsetWidth;
        const hoehe = this.leiste.offsetHeight;
        let links = box.x + box.breite / 2 - zone.left - breite / 2;
        links = Math.max(8, Math.min(zone.width - breite - 8, links));
        let oben = box.y - zone.top - 8 - hoehe;
        oben = Math.max(4, oben);
        this.leiste.style.left = `${links}px`;
        this.leiste.style.top = `${oben}px`;
      }
    }
    // Griffe
    for (const g of this.griffeSchicht.querySelectorAll<HTMLElement>('.griff')) {
      const koerper = app.alleKoerper().find((k) => k.schritt === g.dataset.schritt);
      if (!koerper) continue;
      const mitte: V3 = [
        (koerper.min[0] + koerper.max[0]) / 2,
        (koerper.min[1] + koerper.max[1]) / 2,
        koerper.max[2],
      ];
      const a = this.szene.projiziere(mitte);
      const b = this.szene.projiziere([mitte[0], mitte[1], mitte[2] + 10]);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l = Math.hypot(dx, dy) || 1;
      const r = rel({ x: a.x + (dx / l) * 28, y: a.y + (dy / l) * 28 });
      g.style.left = `${r.x}px`;
      g.style.top = `${r.y}px`;
    }
    // Maße der Skizze
    if (ui.ort.art !== 'skizze' || !this.masse.childElementCount) this.massLinien.replaceChildren();
    if (ui.ort.art === 'skizze' && this.masse.childElementCount) {
      const sk = ui.ort.schritt ? schrittVon(app.angezeigt(), ui.ort.schritt) : undefined;
      const skizze = sk ? (sk.type === 'skizze' ? sk : skizzeVon(sk)) : undefined;
      if (skizze?.params.laenge) {
        const ebene = ebeneVon(skizze);
        const mu = wertVon(skizze.params.mitte?.x);
        const mv = wertVon(skizze.params.mitte?.y);
        const l = wertVon(skizze.params.laenge);
        const b = wertVon(skizze.params.breite);
        const z =
          skizze.params.ebene === 'oberseite'
            ? wertVon(
                app.angezeigt().content[0]?.content.find((k) => k.id === 'grundplatte')?.params
                  .dicke,
              )
            : 0;
        const pt = (u: number, v: number) =>
          rel(this.szene.projiziere(ebenenPunkt(ebene, u, v, z)));
        const setze = (name: string, q: Punkt) => {
          const el = this.masse.querySelector<HTMLElement>(`[data-mass="${name}"]`);
          if (!el) return;
          el.style.left = `${q.x}px`;
          el.style.top = `${q.y}px`;
        };
        const o = pt(mu, mv + b / 2);
        setze('laenge', { x: o.x, y: o.y - 30 });
        const r = pt(mu + l / 2, mv);
        setze('breite', { x: r.x + 56, y: r.y });
        const ec = pt(mu + l / 2, mv + b / 2);
        setze('eckradius', { x: ec.x + 40, y: ec.y - 26 });
        // Maßlinien mit Hilfslinien (Teil der Zeichnung)
        const links = pt(mu - l / 2, mv + b / 2);
        const unten = pt(mu + l / 2, mv - b / 2);
        const linie = (x1: number, y1: number, x2: number, y2: number) => {
          const e = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          e.setAttribute('x1', String(x1));
          e.setAttribute('y1', String(y1));
          e.setAttribute('x2', String(x2));
          e.setAttribute('y2', String(y2));
          return e;
        };
        this.massLinien.replaceChildren(
          linie(links.x, links.y - 4, links.x, links.y - 34),
          linie(ec.x, ec.y - 4, ec.x, ec.y - 34),
          linie(links.x, links.y - 30, ec.x, ec.y - 30),
          linie(ec.x + 4, ec.y, ec.x + 62, ec.y),
          linie(unten.x + 4, unten.y, unten.x + 62, unten.y),
          linie(ec.x + 56, ec.y, unten.x + 56, unten.y),
        );
      } else {
        this.massLinien.replaceChildren();
      }
    }
    // Status im Modell
    for (const s of this.status.querySelectorAll<HTMLElement>('[data-modell-status]')) {
      const verrundung = app
        .angezeigt()
        .content.flatMap((t) => t.content)
        .find((k) => k.id === s.dataset.schritt);
      const box = verrundung ? this.szene.huellbox(String(verrundung.params.ziel)) : null;
      if (!box) continue;
      const q = rel({ x: box.x + box.breite / 2, y: box.y });
      s.style.left = `${q.x}px`;
      s.style.top = `${Math.max(4, q.y - 34)}px`;
    }
    // Verbindungspunkte
    for (const knopf of this.punkte.querySelectorAll<HTMLElement>('[data-verbindungspunkt]')) {
      const q = verbindungspunkte(app).find((x) => x.id === knopf.dataset.verbindungspunkt);
      if (!q) continue;
      const r = rel(this.szene.projiziere(q.welt));
      knopf.style.left = `${r.x}px`;
      knopf.style.top = `${r.y}px`;
    }
  }
}

/** Punkt der Skizzenebene (u, v) im Raum. */
export function ebenenPunkt(ebene: 'XY' | 'XZ' | 'YZ', u: number, v: number, w: number): V3 {
  if (ebene === 'XZ') return [u, -w, v];
  if (ebene === 'YZ') return [w, u, v];
  return [u, v, w];
}

export function verbindungspunkte(app: App): { id: string; name: string; welt: V3 }[] {
  const p = app.angezeigt();
  const baugruppe = p.content.find((k) => k.type === 'baugruppe');
  if (!baugruppe) return [];
  const ergebnis: { id: string; name: string; welt: V3 }[] = [];
  for (const inst of baugruppe.content.filter((k) => k.type === 'instanz')) {
    const teil = p.content.find((t) => t.id === inst.params.komponente);
    for (const k of teil?.content.filter((c) => c.type === 'konnektor') ?? []) {
      ergebnis.push({
        id: k.id,
        name: k.meta.name,
        welt: [
          wertVon(inst.params.position.x) + wertVon(k.params.position.x),
          wertVon(inst.params.position.y) + wertVon(k.params.position.y),
          wertVon(inst.params.position.z) + wertVon(k.params.position.z),
        ],
      });
    }
  }
  return ergebnis;
}

export type { Element };
