// Anwendung: Zustand der Oberfläche, Befehle (mit Wirkung auf Oberfläche und Modell), Auswahl, Orte, KI-Gespräch.
import { Vektor3, type Szene, type SkizzenLinie, type Zeichnung } from './ansicht/szene';
import {
  ergebnisVon,
  teile as teileVon,
  teilErgebnis,
  type Koerper,
  type TeilErgebnis,
  type V3,
} from './geometrie/teil';
import type { Uebersetzer, Sprache } from './i18n';
import { erkenne, type Vorschlag } from './ki/absicht';
import { wertSetzen, wirkungenRegistrieren } from './modell/befehle';
import { aktiverEntwurf, entwuerfe, zustandVon } from './modell/entwurf';
import {
  alle,
  alleMitSkizzen,
  findeMitSkizzen,
  schrittVon,
  skizzeVon,
  type Element,
  type Projekt,
} from './modell/projekt';
import { befehle, Sitzung, type Quelle } from './modell/register';
import { neuerUi, type Ui } from './zustand';
import { anzeigen, type Groesse } from './wert/wertfeld';

export interface Zone {
  rendern(): void;
}

const kopie = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;
export const wertVon = (g: unknown): number => (g as Groesse | undefined)?.value ?? 0;

export class App {
  readonly sitzung: Sitzung;
  readonly ui: Ui = neuerUi();
  szene!: Szene;
  zonen: Zone[] = [];
  /** Wird nach jedem Zeichnen der Szene aufgerufen (Overlays folgen der Kamera). */
  nachRender: (() => void)[] = [];
  private geplant = false;
  private einpassenNach = false;
  private signatur = '';
  private kameraVorher: { azimut: number; hoehe: number; abstand: number; ziel: V3 } | null = null;
  private kiTimer: number | null = null;
  private cache: { projekt: Projekt; ergebnisse: Map<string, TeilErgebnis> } | null = null;
  vorschauKoerper: Koerper[] = [];

  constructor(
    readonly t: Uebersetzer,
    readonly sprache: Sprache,
    readonly tempo: number,
    projekt: Projekt,
  ) {
    this.sitzung = new Sitzung(projekt);
    wirkungenRegistrieren(this.sitzung);
  }

  // --- Modell ---------------------------------------------------------------------------------------

  /** Der gezeigte Stand: aktiver Entwurf, dazu die laufende Änderung (Tippen, Ziehen). */
  angezeigt(): Projekt {
    if (this.cache) return this.cache.projekt;
    const p = this.sitzung.angezeigt();
    const live = this.ui.live;
    if (live) wertSetzen(p, live.element, live.name, live.wert);
    this.cache = { projekt: p, ergebnisse: new Map() };
    return p;
  }

  /** `window.__cee.modell()`: Hauptstand, mit laufender Änderung, solange kein Entwurf aktiv ist. */
  modell(): Projekt {
    const haupt = this.sitzung.modell();
    if (this.ui.live && !aktiverEntwurf(haupt)) {
      wertSetzen(haupt, this.ui.live.element, this.ui.live.name, this.ui.live.wert);
    }
    return haupt;
  }

  private ungueltig(): void {
    this.cache = null;
  }

  /** Teile mit Körpern (Schritte oder einfache Form, Instanzen in der Baugruppe). */
  ergebnisse(): Map<string, TeilErgebnis> {
    const p = this.angezeigt();
    const c = this.cache as NonNullable<typeof this.cache>;
    if (c.ergebnisse.size) return c.ergebnisse;
    const baugruppe = p.content.find((k) => k.type === 'baugruppe');
    const teile = teileVon(p);
    const einfach = teile.filter((t) => t.params.form);
    if (baugruppe) {
      for (const inst of baugruppe.content.filter((k) => k.type === 'instanz')) {
        const teil = teile.find((t) => t.id === inst.params.komponente);
        if (!teil) continue;
        const pos = inst.params.position;
        const e = ergebnisVon(teil, [wertVon(pos.x), wertVon(pos.y), wertVon(pos.z)]);
        for (const k of e.koerper) k.schritt = inst.id;
        c.ergebnisse.set(inst.id, e);
      }
    }
    teile.forEach((teil) => {
      if (baugruppe && teil.params.form) return;
      const index = einfach.indexOf(teil);
      const versatz: V3 = teil.params.form ? [index === 0 ? -50 : 50 * index, 0, 0] : [0, 0, 0];
      c.ergebnisse.set(teil.id, ergebnisVon(teil, versatz));
    });
    return c.ergebnisse;
  }

  alleKoerper(): Koerper[] {
    return [...this.ergebnisse().values()].flatMap((e) => e.koerper);
  }

  /** Das Teil, mit dem der Inspektor ohne Auswahl und `teil()` arbeiten. */
  aktivesTeil(): Element | undefined {
    const p = this.angezeigt();
    const teile = teileVon(p);
    for (const id of this.ui.auswahl) {
      const stamm = id.split('/')[0] as string;
      const t = teile.find(
        (x) => x.id === stamm || alle(x).some((k) => k.id === stamm || skizzeVon(k)?.id === stamm),
      );
      if (t) return t;
    }
    return teile.find((t) => !t.params.form) ?? teile[0];
  }

  ergebnisAktiv(): TeilErgebnis | undefined {
    const teil = this.aktivesTeil();
    if (!teil) return undefined;
    return teil.params.form
      ? this.ergebnisse().get(teil.id)
      : (this.ergebnisse().get(teil.id) ?? teilErgebnis(teil));
  }

  /** Alle Kanten-IDs, die es gerade gibt. */
  private kantenIds(): Set<string> {
    return new Set(this.alleKoerper().flatMap((k) => k.kanten.map((x) => x.id)));
  }

  private bereinigen(): void {
    const p = this.angezeigt();
    const ids = new Set(alleMitSkizzen(p).map((e) => e.id));
    const kanten = this.kantenIds();
    this.ui.auswahl = this.ui.auswahl.filter((id) => ids.has(id) || kanten.has(id));
    if (this.ui.ort.art === 'skizze' && !(this.ui.ort.schritt && ids.has(this.ui.ort.schritt))) {
      this.ui.ort = { art: 'teil', schritt: null };
    }
    if (this.ui.geist && !ids.has(this.ui.geist)) this.ui.geist = null;
  }

  // --- Aktualisieren --------------------------------------------------------------------------------

  aktualisieren(): void {
    this.ungueltig();
    if (this.geplant) return;
    this.geplant = true;
    queueMicrotask(() => {
      this.geplant = false;
      this.rendern();
    });
  }

  /** Sofort und synchron (für Zustände und Messungen). */
  rendern(): void {
    this.ungueltig();
    this.bereinigen();
    this.szeneFuettern();
    if (this.einpassenNach) {
      this.einpassenNach = false;
      this.szene.einpassen();
    }
    for (const z of this.zonen) z.rendern();
    for (const f of this.nachRender) f();
  }

  private szeneFuettern(): void {
    const z = this.zeichnung();
    const sig = JSON.stringify([
      z.koerper,
      [...z.gestrichelt],
      [...z.geister],
      z.zusatz,
      z.skizzen,
      z.darstellung,
      z.verlauf,
    ]);
    if (sig !== this.signatur) {
      this.signatur = sig;
      this.szene.zeichne(z);
    }
    this.szene.setAuswahl(this.ui.auswahl);
    this.szene.setHover(this.ui.hover);
  }

  /** Alles, was die Szene zeichnet. */
  zeichnung(): Zeichnung {
    const p = this.angezeigt();
    const gestrichelt = new Set<string>();
    if (this.ui.ort.art === 'skizze' && this.ui.ort.schritt) {
      const teil = p.content.find((t) => t.content.some((k) => k.id === this.ui.ort.schritt));
      if (teil) {
        const index = teil.content.findIndex((k) => k.id === this.ui.ort.schritt);
        for (const k of teil.content.slice(index + 1)) gestrichelt.add(k.id);
      }
    }
    const skizzen: SkizzenLinie[] = [];
    for (const teil of p.content.filter((t) => t.type === 'teil')) {
      for (const k of teil.content) {
        if (k.type !== 'skizze' || !k.params.laenge) continue;
        skizzen.push(skizzenLinie(k));
      }
    }
    if (this.ui.zeichnen) {
      const r = this.ui.zeichnen;
      const sk = this.ui.ort.schritt ? findeMitSkizzen(p, this.ui.ort.schritt) : undefined;
      skizzen.push({
        ebene: ebeneVon(sk),
        mitte: { u: (r.u0 + r.u1) / 2, v: (r.v0 + r.v1) / 2 },
        laenge: Math.abs(r.u1 - r.u0),
        breite: Math.abs(r.v1 - r.v0),
        eckradius: 0,
      });
    }
    const zusatz: Koerper[] = [...this.vorschauKoerper];
    if (this.ui.vergleich) {
      const haupt = this.sitzung.modell();
      const teil = haupt.content.find((t) => t.type === 'teil' && !t.params.form);
      if (teil) zusatz.push(...teilErgebnis(teil).koerper.filter((k) => k.art === 'platte'));
    }
    return {
      koerper: this.alleKoerper(),
      darstellung: this.ui.darstellung,
      gestrichelt,
      geister: new Set(this.ui.geist ? [this.ui.geist] : []),
      zusatz,
      skizzen,
      verlauf: this.ui.bereich === 'simulation',
    };
  }

  // --- Auswahl --------------------------------------------------------------------------------------

  setHover(id: string | null): void {
    if (this.ui.hover === id) return;
    this.ui.hover = id;
    this.szene.setHover(id);
    document.querySelectorAll('[data-zone="aufbau"] [data-schritt]').forEach((z) => {
      if (id !== null && (z as HTMLElement).dataset.ziel === id)
        z.setAttribute('data-hervorgehoben', '');
      else z.removeAttribute('data-hervorgehoben');
    });
  }

  waehlen(ids: string[], erweitern = false): void {
    this.ausfuehren('auswahl.setzen', { elemente: ids, erweitern });
  }

  /** Das gewählte Element (einzeln) samt Typ. */
  gewaehlt(): Element | undefined {
    if (this.ui.auswahl.length !== 1) return undefined;
    const id = this.ui.auswahl[0] as string;
    if (id.includes('/k/')) return undefined;
    return findeMitSkizzen(this.angezeigt(), id);
  }

  kantenAuswahl(): string[] {
    return this.ui.auswahl.filter((id) => id.includes('/k/'));
  }

  // --- Befehle --------------------------------------------------------------------------------------

  /** Interaktiver Einstieg: ergänzt fehlende Parameter aus Auswahl und Ort. */
  starte(id: string, par: Record<string, unknown> = {}, quelle: Quelle = 'mensch'): void {
    const p = this.angezeigt();
    const parameter = { ...par };
    const auswahl = this.ui.auswahl;
    const erstes = auswahl[0];
    switch (id) {
      case 'schritt.ausblenden':
      case 'schritt.einblenden':
      case 'schritt.verwerfen':
        parameter.schritt ??= erstes;
        break;
      case 'feature.extrudieren': {
        const sk = this.ui.ort.schritt && findeMitSkizzen(p, this.ui.ort.schritt);
        parameter.skizze ??=
          erstes && findeMitSkizzen(p, erstes)?.type === 'skizze'
            ? erstes
            : sk && sk.type === 'skizze'
              ? sk.id
              : undefined;
        break;
      }
      case 'feature.verrunden': {
        let kanten = this.kantenAuswahl();
        if (!kanten.length && erstes === 'steg') {
          kanten = ['oben-vorn', 'oben-hinten'].map((n) => `steg/k/${n}`);
        }
        parameter.kanten ??= kanten;
        parameter.ziel ??= (kanten[0] ?? '').split('/')[0];
        break;
      }
      case 'baugruppe.anlegen':
        parameter.teile ??= auswahl.filter((x) => p.content.some((t) => t.id === x));
        break;
      case 'ort.skizze-bearbeiten':
        parameter.schritt ??= erstes;
        break;
      case 'ki.fragen':
        parameter.absicht ??= '';
        break;
      default:
        break;
    }
    this.ausfuehren(id, parameter, quelle);
  }

  ausfuehren(id: string, par: Record<string, unknown> = {}, quelle: Quelle = 'mensch'): void {
    if (id === 'element.wert-setzen') this.ui.live = null;
    const vorher = new Set(alleMitSkizzen(this.sitzung.modell()).map((e) => e.id));
    this.ungueltig();
    const geaendert = this.sitzung.ausfuehren(id, par, quelle);
    this.ungueltig();
    this.uiWirkung(id, par, geaendert, vorher);
    this.aktualisieren();
  }

  private neueElemente(vorher: Set<string>): Element[] {
    return alleMitSkizzen(this.sitzung.modell()).filter((e) => !vorher.has(e.id));
  }

  private meldung(schluessel: string, werte?: Record<string, string | number>): void {
    this.ui.rueckmeldung = { schluessel, werte };
  }

  private uiWirkung(
    id: string,
    par: Record<string, unknown>,
    geaendert: boolean,
    vorher: Set<string>,
  ): void {
    const ui = this.ui;
    switch (id) {
      case 'suche.oeffnen':
        ui.suche.offen = true;
        break;
      case 'auswahl.setzen': {
        const ids = (par.elemente as string[] | undefined) ?? [];
        ui.menue = null;
        if (par.erweitern) {
          const neu = new Set(ui.auswahl);
          for (const x of ids) {
            if (neu.has(x)) neu.delete(x);
            else neu.add(x);
          }
          ui.auswahl = [...neu];
        } else {
          ui.auswahl = ids;
        }
        if (ui.inspektor !== 'auswahl' && !(ui.gespraech && ui.gespraech.phase === 'arbeitet')) {
          ui.inspektor = 'auswahl';
          ui.gespraech = null;
          ui.vergleich = false;
        }
        const e = ids[0] ? findeMitSkizzen(this.angezeigt(), ids[0]) : undefined;
        if (e && ['lager', 'kraft', 'ergebnis'].includes(e.type)) ui.bereich = 'simulation';
        break;
      }
      case 'auswahl.aufheben':
        ui.auswahl = [];
        ui.menue = null;
        break;
      case 'ansicht.einpassen':
        this.szene.einpassen();
        break;
      case 'thema.umschalten':
        ui.thema = ui.thema === 'hell' ? 'dunkel' : 'hell';
        document.documentElement.dataset.thema = ui.thema;
        this.szene.setThema(ui.thema);
        break;
      case 'arbeitsbereich.wechseln':
        ui.bereich =
          typeof par.bereich === 'string'
            ? par.bereich
            : ui.bereich === 'modell'
              ? 'simulation'
              : 'modell';
        break;
      case 'darstellung.wechseln':
        ui.darstellung =
          ui.darstellung === 'koerper'
            ? 'kanten'
            : ui.darstellung === 'kanten'
              ? 'durchsicht'
              : 'koerper';
        break;
      case 'darstellung.koerper':
        ui.darstellung = 'koerper';
        break;
      case 'darstellung.kanten':
        ui.darstellung = 'kanten';
        break;
      case 'darstellung.durchsicht':
        ui.darstellung = 'durchsicht';
        break;
      case 'ort.skizze-bearbeiten': {
        const schritt = par.schritt ? schrittVon(this.angezeigt(), String(par.schritt)) : undefined;
        if (schritt && (skizzeVon(schritt) || schritt.type === 'skizze'))
          this.ortBetreten(schritt.id);
        else this.meldung('meldung.erst-schritt-waehlen');
        break;
      }
      case 'ort.fertig':
        if (ui.ort.art === 'skizze') this.ortVerlassen();
        break;
      case 'skizze.anlegen': {
        if (!par.ebene) {
          ui.ebenenWahl = !ui.ebenenWahl;
          break;
        }
        ui.ebenenWahl = false;
        const neu = this.neueElemente(vorher).find((e) => e.type === 'skizze');
        if (neu) this.ortBetreten(neu.id);
        break;
      }
      case 'skizze.rechteck':
        this.meldung('meldung.skizze-gezeichnet');
        break;
      case 'feature.extrudieren': {
        const neu = this.neueElemente(vorher).find((e) => e.type === 'extrusion');
        if (!neu) {
          this.meldung('meldung.erst-skizze-waehlen');
          break;
        }
        if (ui.ort.art === 'skizze') this.ortVerlassen();
        ui.auswahl = [neu.id];
        ui.geist = neu.id;
        break;
      }
      case 'feature.verrunden': {
        const neu = this.neueElemente(vorher).find((e) => e.type === 'verrundung');
        if (neu) ui.auswahl = [neu.id];
        else this.meldung('meldung.erst-kanten-waehlen');
        break;
      }
      case 'element.wert-setzen':
        if (ui.geist) ui.geist = null;
        if (geaendert) this.meldung('meldung.wert-gesetzt');
        break;
      case 'schritt.verwerfen':
        ui.auswahl = ui.auswahl.filter((x) => x !== par.schritt);
        this.meldung('meldung.verworfen');
        break;
      case 'baugruppe.anlegen': {
        const neu = this.neueElemente(vorher).find((e) => e.type === 'baugruppe');
        if (neu) {
          ui.auswahl = [neu.id];
          this.einpassenNach = true;
        } else this.meldung('meldung.erst-zwei-teile');
        break;
      }
      case 'verbindung.anlegen': {
        if (par.von && par.nach) {
          ui.verbinden = null;
          const neu = this.neueElemente(vorher).find((e) => e.type === 'verbindung');
          if (neu) ui.auswahl = [neu.id];
        } else if (ui.auswahl.length && this.gewaehlt()?.type === 'instanz') {
          ui.verbinden = { phase: 'von' };
        } else {
          this.meldung('meldung.erst-instanz-waehlen');
        }
        break;
      }
      case 'entwurf.anlegen':
      case 'entwurf.wechseln':
        ui.inspektor = 'entwuerfe';
        ui.vergleich = false;
        break;
      case 'entwurf.vergleichen':
        ui.inspektor = 'entwuerfe';
        ui.vergleich = !!aktiverEntwurf(this.sitzung.modell());
        break;
      case 'entwurf.uebernehmen':
      case 'entwurf.verwerfen':
        ui.vergleich = false;
        ui.inspektor = 'entwuerfe';
        break;
      case 'ansicht.ergebnis':
        ui.entwurfAnsicht = 'ergebnis';
        ui.inspektor = 'entwuerfe';
        break;
      case 'ansicht.alle-entwuerfe':
        ui.entwurfAnsicht = 'alle';
        ui.inspektor = 'entwuerfe';
        break;
      case 'ki.fragen':
        this.kiStarten(String(par.absicht ?? ''));
        break;
      case 'ki.anhalten':
        if (ui.gespraech?.phase === 'arbeitet') {
          if (this.kiTimer !== null) window.clearTimeout(this.kiTimer);
          this.kiTimer = null;
          ui.gespraech.phase = 'angehalten';
        }
        break;
      case 'vorschlag.uebernehmen': {
        const v = ui.gespraech?.vorschlag;
        if (!v) break;
        this.gespraechSchliessen();
        for (const b of v.befehle) this.ausfuehren(b.id, b.parameter, 'ki');
        if (!ui.auswahl.length) ui.auswahl = [v.ziel];
        this.meldung('meldung.vorschlag-uebernommen');
        break;
      }
      case 'vorschlag.verwerfen':
      case 'gespraech.schliessen':
        this.gespraechSchliessen();
        break;
      case 'simulation.lager':
      case 'simulation.kraft':
      case 'simulation.ergebnis': {
        ui.bereich = 'simulation';
        const typ = id.split('.')[1] as string;
        const studie = this.sitzung.modell().content.find((k) => k.type === 'studie');
        const schritt = studie?.content.find((k) => k.type === typ);
        if (schritt) ui.auswahl = [schritt.id];
        break;
      }
      case 'bearbeiten.rueckgaengig':
      case 'bearbeiten.wiederholen':
        ui.live = null;
        break;
      default:
        break;
    }
  }

  // --- Orte -----------------------------------------------------------------------------------------

  /** Kamera-Ansicht senkrecht auf die Skizzenebene des Schritts. */
  private skizzenAnsicht(schritt: Element): {
    azimut: number;
    hoehe: number;
    abstand: number;
    ziel: V3;
  } {
    const sk = schritt.type === 'skizze' ? schritt : skizzeVon(schritt);
    const ebene = ebeneVon(sk);
    const l = wertVon(sk?.params.laenge) || 80;
    const b = wertVon(sk?.params.breite) || 50;
    const mu = wertVon(sk?.params.mitte?.x);
    const mv = wertVon(sk?.params.mitte?.y);
    const abstand = Math.max(200, Math.max(l, b) * 3.4);
    if (ebene === 'XZ') return { azimut: 0, hoehe: 0, abstand, ziel: [mu, 0, mv] };
    if (ebene === 'YZ') return { azimut: 90, hoehe: 0, abstand, ziel: [0, mu, mv] };
    const oberseite = sk?.params.ebene === 'oberseite';
    const z = oberseite
      ? wertVon(findeMitSkizzen(this.angezeigt(), 'grundplatte')?.params.dicke)
      : 0;
    return { azimut: 0, hoehe: 89.5, abstand, ziel: [mu, mv, z] };
  }

  ortBetreten(schrittId: string, sofort = false): void {
    const p = this.angezeigt();
    const schritt = schrittVon(p, schrittId) ?? findeMitSkizzen(p, schrittId);
    if (!schritt) return;
    if (this.ui.ort.art === 'teil') {
      const k = this.szene.kamera;
      this.kameraVorher = {
        azimut: k.azimut,
        hoehe: k.hoehe,
        abstand: k.abstand,
        ziel: [k.ziel.x, k.ziel.y, k.ziel.z],
      };
    }
    this.ui.ort = { art: 'skizze', schritt: schritt.id };
    this.ui.auswahl = [schritt.id];
    this.ui.inspektor = 'auswahl';
    this.ui.menue = null;
    const a = this.skizzenAnsicht(schritt);
    this.szene.nach(
      { azimut: a.azimut, hoehe: a.hoehe, abstand: a.abstand, ziel: new Vektor3(...a.ziel) },
      sofort || this.tempo === 0 ? 0 : 200,
    );
    this.meldung('meldung.skizze-offen');
  }

  ortVerlassen(): void {
    this.ui.ort = { art: 'teil', schritt: null };
    this.ui.zeichnen = null;
    const v = this.kameraVorher;
    this.kameraVorher = null;
    if (v) {
      this.szene.nach(
        { azimut: v.azimut, hoehe: v.hoehe, abstand: v.abstand, ziel: new Vektor3(...v.ziel) },
        this.tempo === 0 ? 0 : 200,
      );
    } else {
      this.szene.einpassen();
    }
  }

  // --- KI -------------------------------------------------------------------------------------------

  private kiStarten(satz: string): void {
    const ui = this.ui;
    if (this.kiTimer !== null) window.clearTimeout(this.kiTimer);
    ui.inspektor = 'gespraech';
    ui.gespraech = { frage: satz, phase: 'arbeitet', vorschlag: null, plan: 0 };
    this.vorschauKoerper = [];
    const ergebnis = erkenne(satz, { projekt: this.angezeigt(), auswahl: ui.auswahl });
    const fertig = () => {
      this.kiTimer = null;
      if (!ui.gespraech) return;
      ui.gespraech.plan = 3;
      if (ergebnis) {
        ui.gespraech.phase = 'karte';
        ui.gespraech.vorschlag = ergebnis;
        this.vorschauErzeugen(ergebnis);
      } else {
        ui.gespraech.phase = 'erklaerung';
      }
      this.aktualisieren();
    };
    if (this.tempo === 0) {
      fertig();
      return;
    }
    const schritt = (n: number) => {
      if (!ui.gespraech || ui.gespraech.phase !== 'arbeitet') return;
      ui.gespraech.plan = n;
      this.aktualisieren();
      this.kiTimer = window.setTimeout(() => (n >= 2 ? fertig() : schritt(n + 1)), 500);
    };
    schritt(1);
  }

  vorschauErzeugen(v: Vorschlag): void {
    const probe = this.sitzung.probe(v.befehle);
    const teil = probe.content.find((t) => t.type === 'teil' && !t.params.form);
    if (!teil) return;
    this.vorschauKoerper = teilErgebnis(teil).koerper.filter((k) => k.schritt === v.ziel);
  }

  gespraechSchliessen(): void {
    if (this.kiTimer !== null) window.clearTimeout(this.kiTimer);
    this.kiTimer = null;
    this.ui.gespraech = null;
    this.ui.inspektor = 'auswahl';
    this.vorschauKoerper = [];
  }

  // --- Anzeige-Hilfen -------------------------------------------------------------------------------

  /** Name zum Anzeigen: Schritte und Teile tragen ihren Namen als Daten. */
  name(e: Element): string {
    return e.meta.name;
  }

  zahl(g: Groesse): string {
    return anzeigen(g, this.sprache === 'en' ? 'en' : 'de');
  }

  entwurfsName(): string {
    const e = aktiverEntwurf(this.sitzung.modell());
    return e ? e.meta.name : this.t('stand.haupt');
  }

  offeneEntwuerfe(): Element[] {
    return entwuerfe(this.sitzung.modell()).filter((e) => zustandVon(e) === 'offen');
  }

  befehlsliste() {
    return befehle;
  }

  kopieModell(): Projekt {
    return kopie(this.sitzung.modell());
  }
}

export function ebeneVon(sk: Element | undefined): 'XY' | 'XZ' | 'YZ' {
  const e = sk?.params.ebene;
  return e === 'XZ' || e === 'YZ' ? e : 'XY';
}

export function skizzenLinie(k: Element): SkizzenLinie {
  return {
    ebene: ebeneVon(k),
    mitte: { u: wertVon(k.params.mitte?.x), v: wertVon(k.params.mitte?.y) },
    laenge: wertVon(k.params.laenge),
    breite: wertVon(k.params.breite),
    eckradius: wertVon(k.params.eckradius),
  };
}
