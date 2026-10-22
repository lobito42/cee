// Inspektor (rechts): zeigt immer das Gewählte, ohne Auswahl das ganze Teil; Wertfelder wirken live (design.md).
import { wertVon, type App, type Zone } from '../app';
import { teilErgebnis } from '../geometrie/teil';
import { alle, findeMitSkizzen, skizzeVon, mm, type Element } from '../modell/projekt';
import { entwuerfe, aenderungenVon, zustandVon, aktiverEntwurf } from '../modell/entwurf';
import { anzeigen, lesen, type Dimension, type Groesse } from '../wert/wertfeld';
import { abgleichen, h } from './dom';

export interface FeldD {
  name: string;
  art: 'wert' | 'text' | 'wahl';
  dimension?: Dimension;
  wert?: Groesse;
  text?: string;
  ziel?: { element: string; name: string };
  berechnet?: boolean;
  optionen?: { wert: string; text: string }[];
}
export interface GruppeD {
  name: string;
  felder: FeldD[];
}
export interface KnopfD {
  befehl: string;
  text: string;
  hauptaktion?: boolean;
  parameter?: Record<string, unknown>;
}
export interface BefundD {
  text: string;
  korrektur: KnopfD;
}
export interface InhaltD {
  titel: string;
  gruppen: GruppeD[];
  knoepfe: KnopfD[];
  befund: BefundD | null;
  hinweis: string | null;
  ki?: boolean;
}

const zahlText = (app: App, n: number, stellen = 2): string => {
  const s = String(Math.round(n * 10 ** stellen) / 10 ** stellen);
  return app.sprache === 'en' ? s : s.replace('.', ',');
};

/** Welche Teile-Werte der Inspektor ohne Auswahl zeigt. */
function teilGruppen(app: App, teil: Element): GruppeD[] {
  const e = app.ergebnisse().get(teil.id) ?? teilErgebnis(teil);
  const [x, y, z] = e.abmessungen_mm;
  return [
    {
      name: app.t('gruppe.teil'),
      felder: [
        { name: app.t('feld.material'), art: 'text', text: String(teil.params.material ?? 'PLA') },
        {
          name: app.t('feld.abmessungen'),
          art: 'text',
          text: `${zahlText(app, x)} × ${zahlText(app, y)} × ${zahlText(app, z)} mm`,
          berechnet: true,
        },
        {
          name: app.t('feld.volumen'),
          art: 'text',
          text: `${zahlText(app, e.volumen_mm3 / 1000)} cm³`,
          berechnet: true,
        },
        {
          name: app.t('feld.masse'),
          art: 'text',
          text: `${zahlText(app, e.masse_g)} g`,
          berechnet: true,
        },
      ],
    },
  ];
}

const wertFeld = (
  app: App,
  name: string,
  g: Groesse,
  element: string,
  param: string,
  dimension: Dimension = 'laenge',
): FeldD => ({
  name,
  art: 'wert',
  dimension,
  wert: g,
  ziel: { element, name: param },
});

function schrittInhalt(app: App, e: Element): InhaltD {
  const t = app.t;
  const inSkizze = app.ui.ort.art === 'skizze';
  const gruppen: GruppeD[] = [];
  const knoepfe: KnopfD[] = [];
  let befund: BefundD | null = null;
  let hinweis: string | null = null;
  const sk = skizzeVon(e);
  const teil = app.aktivesTeil();
  const ergebnis = teil ? app.ergebnisse().get(teil.id) : undefined;
  const maße: FeldD[] = [];
  const ausSkizze: FeldD[] = [];
  const skizzenFelder = (quelle: Element, praefix: string, element: string) => {
    if (quelle.params.laenge)
      ausSkizze.push(
        wertFeld(app, t('feld.laenge'), quelle.params.laenge, element, `${praefix}laenge`),
      );
    if (quelle.params.breite)
      ausSkizze.push(
        wertFeld(app, t('feld.breite'), quelle.params.breite, element, `${praefix}breite`),
      );
    if (quelle.params.eckradius)
      ausSkizze.push(
        wertFeld(app, t('feld.eckradius'), quelle.params.eckradius, element, `${praefix}eckradius`),
      );
  };
  switch (e.type) {
    case 'extrusion': {
      const name = e.params.dicke ? 'dicke' : 'hoehe';
      maße.push(wertFeld(app, t(`feld.${name}`), e.params[name], e.id, name));
      if (sk) skizzenFelder(sk, 'skizze.', e.id);
      break;
    }
    case 'bohrung':
      maße.push(wertFeld(app, t('feld.durchmesser'), e.params.durchmesser, e.id, 'durchmesser'));
      ausSkizze.push({
        name: t('feld.anzahl'),
        art: 'text',
        text: String(((sk?.params.punkte as unknown[]) ?? []).length),
        berechnet: true,
      });
      break;
    case 'skizze':
      if (e.params.laenge) skizzenFelder(e, '', e.id);
      else hinweis = t('inspektor.skizze-zeichnen');
      break;
    case 'verrundung': {
      maße.push(wertFeld(app, t('feld.radius'), e.params.radius, e.id, 'radius'));
      maße.push({
        name: t('feld.kanten'),
        art: 'text',
        text: String((e.params.kanten as string[]).length),
        berechnet: true,
      });
      const b = ergebnis?.befunde.find((x) => x.schritt === e.id);
      if (b) {
        befund = {
          text: t('befund.radius', {
            grenze: anzeigen(mm(b.grenze), app.sprache === 'en' ? 'en' : 'de'),
          }),
          korrektur: {
            befehl: 'element.wert-setzen',
            text: t('befund.radius-korrektur', {
              wert: anzeigen(mm(b.grenze), app.sprache === 'en' ? 'en' : 'de'),
            }),
            parameter: { element: e.id, name: 'radius', wert: mm(b.grenze) },
          },
        };
      }
      break;
    }
    case 'instanz': {
      const pos = e.params.position;
      gruppen.push({
        name: t('gruppe.position'),
        felder: (['x', 'y', 'z'] as const).map((a) => ({
          name: a.toUpperCase(),
          art: 'text' as const,
          text: anzeigen(pos[a], app.sprache === 'en' ? 'en' : 'de'),
          berechnet: true,
        })),
      });
      break;
    }
    case 'verbindung':
      gruppen.push({
        name: t('gruppe.verbindung'),
        felder: [
          { name: t('feld.von'), art: 'text', text: String(e.params.von) },
          { name: t('feld.nach'), art: 'text', text: String(e.params.nach) },
          {
            name: t('feld.art'),
            art: 'wahl',
            text: String(e.params.art),
            ziel: { element: e.id, name: 'art' },
            optionen: ['Fest', 'Gleitend', 'Drehbar'].map((w) => ({
              wert: w,
              text: t(`verbindung.art.${w.toLowerCase()}`),
            })),
          },
        ],
      });
      break;
    case 'baugruppe':
      gruppen.push({
        name: t('gruppe.baugruppe'),
        felder: [
          {
            name: t('feld.instanzen'),
            art: 'text',
            text: String(e.content.filter((k) => k.type === 'instanz').length),
            berechnet: true,
          },
        ],
      });
      break;
    case 'teil': {
      return { titel: e.meta.name, gruppen: teilGruppen(app, e), knoepfe, befund, hinweis };
    }
    case 'lager':
      gruppen.push({
        name: t('gruppe.lager'),
        felder: [{ name: t('feld.art'), art: 'text', text: t('paket.simulation.lager-fest') }],
      });
      hinweis = t('paket.simulation.simuliert');
      break;
    case 'kraft':
      gruppen.push({
        name: t('gruppe.kraft'),
        felder: [
          wertFeld(app, t('feld.kraft'), e.params.kraft, e.id, 'kraft', 'kraft'),
          {
            name: t('feld.richtung'),
            art: 'wahl',
            text: String(e.params.richtung),
            ziel: { element: e.id, name: 'richtung' },
            optionen: ['+X', '-X', '+Y', '-Y', '+Z', '-Z'].map((w) => ({
              wert: w,
              text: t(`richtung.${w[0] === '+' ? 'plus' : 'minus'}-${w[1]?.toLowerCase()}`),
            })),
          },
        ],
      });
      hinweis = t('paket.simulation.simuliert');
      break;
    case 'ergebnis': {
      const studie = app.angezeigt().content.find((k) => k.type === 'studie');
      const kraft = studie?.content.find((k) => k.type === 'kraft');
      const max = wertVon(kraft?.params.kraft) * 0.02;
      gruppen.push({
        name: t('gruppe.ergebnis'),
        felder: [
          {
            name: t('feld.hoechstwert'),
            art: 'text',
            text: anzeigen(mm(max), app.sprache === 'en' ? 'en' : 'de'),
            berechnet: true,
          },
        ],
      });
      hinweis = t('paket.simulation.simuliert');
      break;
    }
    default:
      break;
  }
  const alleGruppen: GruppeD[] = [];
  if (maße.length) alleGruppen.push({ name: t('gruppe.masse'), felder: maße });
  if (ausSkizze.length) alleGruppen.push({ name: t('gruppe.skizze'), felder: ausSkizze });
  alleGruppen.push(...gruppen);
  if (teil && ['extrusion', 'bohrung', 'skizze', 'verrundung'].includes(e.type)) {
    // Das ganze Teil bleibt im Blick: Werte ändern sich beim Tippen (design.md, Inspektor).
    const teilWerte = teilGruppen(app, teil)[0];
    if (teilWerte) {
      alleGruppen.push({
        name: teilWerte.name,
        felder: teilWerte.felder.filter((f) => f.name !== t('feld.material')),
      });
    }
  }
  if (inSkizze && (sk || e.type === 'skizze')) {
    knoepfe.push({ befehl: 'ort.fertig', text: t('befehl.ort.fertig'), hauptaktion: true });
  } else if (sk || e.type === 'skizze') {
    knoepfe.push({
      befehl: 'ort.skizze-bearbeiten',
      text: t('befehl.ort.skizze-bearbeiten'),
      parameter: { schritt: e.id },
    });
  }
  return { titel: e.meta.name, gruppen: alleGruppen, knoepfe, befund, hinweis };
}

export function inspektorInhalt(app: App): InhaltD {
  const t = app.t;
  const p = app.angezeigt();
  const sel = app.ui.auswahl;
  if (!sel.length) {
    const teil = app.aktivesTeil();
    if (!teil) return { titel: p.meta.name, gruppen: [], knoepfe: [], befund: null, hinweis: null };
    const teile = p.content.filter((k) => k.type === 'teil');
    if (teile.length > 1) {
      return {
        titel: p.meta.name,
        gruppen: [
          {
            name: t('gruppe.teile'),
            felder: teile.map((tt) => {
              const e = app.ergebnisse().get(tt.id) ?? teilErgebnis(tt);
              return {
                name: tt.meta.name,
                art: 'text' as const,
                text: `${zahlText(app, e.volumen_mm3 / 1000)} cm³`,
                berechnet: true,
              };
            }),
          },
        ],
        knoepfe: [],
        befund: null,
        hinweis: null,
      };
    }
    return {
      titel: teil.meta.name,
      gruppen: teilGruppen(app, teil),
      knoepfe: [],
      befund: null,
      hinweis: null,
    };
  }
  const kanten = app.kantenAuswahl();
  if (kanten.length === sel.length) {
    const alleK = app.alleKoerper().flatMap((k) => k.kanten);
    const gewaehlt = kanten
      .map((id) => alleK.find((k) => k.id === id))
      .filter((k): k is NonNullable<typeof k> => !!k);
    const schritt = findeMitSkizzen(p, (kanten[0] as string).split('/')[0] as string);
    return {
      titel:
        kanten.length === 1 ? t('inspektor.kante') : t('inspektor.kanten', { n: kanten.length }),
      gruppen: [
        {
          name: t('gruppe.kante'),
          felder: [
            {
              name: t('feld.laenge'),
              art: 'text',
              text:
                gewaehlt.length === 1
                  ? anzeigen(mm(gewaehlt[0]?.laenge ?? 0), app.sprache === 'en' ? 'en' : 'de')
                  : String(gewaehlt.length),
              berechnet: true,
            },
            { name: t('feld.schritt'), art: 'text', text: schritt?.meta.name ?? '' },
          ],
        },
      ],
      knoepfe: [],
      befund: null,
      hinweis: null,
    };
  }
  if (sel.length > 1) {
    return {
      titel: t('inspektor.mehrere', { n: sel.length }),
      gruppen: [],
      knoepfe: [],
      befund: null,
      hinweis: t('inspektor.mehrere-hinweis'),
    };
  }
  const e = findeMitSkizzen(p, sel[0] as string);
  if (!e) return { titel: p.meta.name, gruppen: [], knoepfe: [], befund: null, hinweis: null };
  return schrittInhalt(app, e);
}

// --- Zone ---------------------------------------------------------------------------------------------

export class InspektorZone implements Zone {
  private readonly inhalt = h('div', { class: 'inhalt' });

  constructor(
    private readonly app: App,
    readonly el: HTMLElement,
  ) {
    el.append(this.inhalt);
  }

  /** Fokussiert und markiert das Wertfeld (Klick auf ein Maß in der Zeichnung). */
  feldFokussieren(name: string): void {
    const input = this.inhalt.querySelector<HTMLInputElement>(`input[data-name="${name}"]`);
    if (!input) return;
    input.focus();
    input.select();
  }

  rendern(): void {
    const app = this.app;
    const ui = app.ui;
    const ki = ui.inspektor === 'gespraech' && !!ui.gespraech;
    if (ki) {
      this.el.setAttribute('data-muster-kandidat', 'Gespräch');
      this.el.setAttribute('data-quelle', 'ki');
      this.el.removeAttribute('data-muster');
    } else {
      this.el.removeAttribute('data-muster-kandidat');
      this.el.removeAttribute('data-quelle');
      this.el.setAttribute('data-muster', 'Eigenschaften-Panel');
    }
    if (ki && ui.gespraech) {
      this.gespraech();
      return;
    }
    if (ui.inspektor === 'entwuerfe') {
      this.entwuerfe();
      return;
    }
    this.auswahl();
  }

  // --- Auswahl --------------------------------------------------------------------------------------

  private auswahl(): void {
    const app = this.app;
    const inhalt = inspektorInhalt(app);
    const signatur = JSON.stringify({
      m: 'auswahl',
      i: [
        inhalt.titel,
        inhalt.gruppen.map((g) => [
          g.name,
          g.felder.map((f) => [f.name, f.art, f.ziel, f.optionen?.map((o) => o.wert)]),
        ]),
        inhalt.knoepfe,
        inhalt.befund?.text,
        inhalt.hinweis,
      ],
    });
    const neu = abgleichen(this.inhalt, signatur, () => this.bauen(inhalt));
    if (!neu) this.patchen(inhalt);
  }

  private bauen(inhalt: InhaltD): Node[] {
    const app = this.app;
    const kinder: Node[] = [h('h2', {}, inhalt.titel)];
    for (const g of inhalt.gruppen) {
      kinder.push(
        h(
          'section',
          { 'data-gruppe': g.name },
          h('h3', {}, g.name),
          ...g.felder.map((f) => this.feld(f)),
        ),
      );
    }
    if (inhalt.hinweis)
      kinder.push(h('p', { class: 'hinweis', 'data-hinweis': '' }, inhalt.hinweis));
    if (inhalt.befund) {
      const b = inhalt.befund;
      const knopf = h(
        'button',
        { type: 'button', 'data-befehl': b.korrektur.befehl },
        b.korrektur.text,
      );
      knopf.addEventListener('click', () =>
        app.ausfuehren(b.korrektur.befehl, b.korrektur.parameter ?? {}),
      );
      kinder.push(h('div', { 'data-muster': 'Befund', role: 'alert' }, h('p', {}, b.text), knopf));
    }
    for (const k of inhalt.knoepfe) {
      const knopf = h(
        'button',
        {
          type: 'button',
          class: 'knopf',
          'data-befehl': k.befehl,
          'data-hauptaktion': k.hauptaktion ?? null,
        },
        k.text,
      );
      knopf.addEventListener('click', () => app.starte(k.befehl, k.parameter ?? {}));
      kinder.push(knopf);
    }
    return kinder;
  }

  private feld(f: FeldD): HTMLElement {
    const app = this.app;
    if (f.art === 'wert' && f.ziel && f.wert) return this.wertfeld(f);
    if (f.art === 'wahl' && f.ziel && f.optionen) {
      const ziel = f.ziel;
      return h(
        'div',
        { class: 'feld', 'data-feld': f.name, 'data-muster': 'Auswahlfeld' },
        h('span', { class: 'label' }, f.name),
        h(
          'div',
          { role: 'radiogroup', class: 'segmente' },
          ...f.optionen.map((o) => {
            const b = h(
              'button',
              {
                type: 'button',
                role: 'radio',
                'data-befehl': 'element.wert-setzen',
                'data-wert': o.wert,
                'aria-checked': f.text === o.wert ? 'true' : 'false',
              },
              o.text,
            );
            b.addEventListener('click', () =>
              app.ausfuehren('element.wert-setzen', {
                element: ziel.element,
                name: ziel.name,
                wert: o.wert,
              }),
            );
            return b;
          }),
        ),
      );
    }
    return h(
      'div',
      { class: 'feld', 'data-feld': f.name },
      h('span', { class: 'label' }, f.name),
      h(
        'span',
        { class: 'zelle' },
        h('span', { class: 'wert', 'data-wert-text': '' }, f.text ?? ''),
        f.berechnet
          ? h('span', { class: 'berechnet', 'data-berechnet': '' }, app.t('feld.berechnet'))
          : null,
      ),
    );
  }

  private wertfeld(f: FeldD): HTMLElement {
    const app = this.app;
    const ziel = f.ziel as { element: string; name: string };
    const dimension = f.dimension ?? 'laenge';
    const text = anzeigen(f.wert as Groesse, app.sprache === 'en' ? 'en' : 'de');
    const id = `feld-${ziel.element}-${ziel.name}`.replace(/[^a-zA-Z0-9-]/g, '-');
    const fehler = h('span', { class: 'fehler', role: 'alert', hidden: true });
    const input = h('input', {
      id,
      type: 'text',
      inputmode: 'decimal',
      value: text,
      autocomplete: 'off',
      spellcheck: false,
      'data-befehl': 'element.wert-setzen',
      'data-element': ziel.element,
      'data-name': ziel.name,
      'data-original': text,
    });
    const zuruecksetzen = () => {
      input.value = input.dataset.original ?? '';
      fehler.hidden = true;
      app.ui.live = null;
      app.aktualisieren();
    };
    const uebernehmen = (): void => {
      if (input.value === input.dataset.original) return;
      const r = lesen(input.value, 'mm', dimension);
      if (!r.ok) {
        zuruecksetzen();
        return;
      }
      fehler.hidden = true;
      const neuerText = anzeigen(r.groesse, app.sprache === 'en' ? 'en' : 'de');
      input.value = neuerText;
      input.dataset.original = neuerText;
      app.ausfuehren('element.wert-setzen', {
        element: ziel.element,
        name: ziel.name,
        wert: r.groesse,
      });
    };
    input.addEventListener('input', () => {
      const r = lesen(input.value, 'mm', dimension);
      if (r.ok) {
        fehler.hidden = true;
        app.ui.live = { element: ziel.element, name: ziel.name, wert: r.groesse };
        app.aktualisieren();
      } else {
        fehler.textContent = app.t(r.fehler);
        fehler.hidden = false;
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        uebernehmen();
      } else if (e.key === 'Escape' && input.value !== input.dataset.original) {
        e.preventDefault();
        e.stopPropagation();
        zuruecksetzen();
      }
    });
    input.addEventListener('blur', () => {
      if (input.value !== input.dataset.original) uebernehmen();
    });
    return h(
      'div',
      { class: 'feld', 'data-feld': f.name, 'data-muster': 'Wertfeld' },
      h('label', { for: id }, f.name),
      input,
      fehler,
    );
  }

  private patchen(inhalt: InhaltD): void {
    const app = this.app;
    const felder = inhalt.gruppen.flatMap((g) => g.felder);
    for (const f of felder) {
      if (f.art === 'wert' && f.ziel && f.wert) {
        const input = this.inhalt.querySelector<HTMLInputElement>(
          `input[data-element="${f.ziel.element}"][data-name="${f.ziel.name}"]`,
        );
        if (!input) continue;
        const text = anzeigen(f.wert, app.sprache === 'en' ? 'en' : 'de');
        const verschmutzt = input.value !== input.dataset.original;
        if (!verschmutzt) input.value = text;
        input.dataset.original = verschmutzt ? (input.dataset.original ?? text) : text;
      } else if (f.art === 'wahl' && f.ziel) {
        this.inhalt
          .querySelectorAll<HTMLElement>(`[data-feld="${f.name}"] [role="radio"]`)
          .forEach((b) =>
            b.setAttribute('aria-checked', b.dataset.wert === f.text ? 'true' : 'false'),
          );
      } else {
        const z = Array.from(this.inhalt.querySelectorAll<HTMLElement>('[data-feld]')).find(
          (x) => x.dataset.feld === f.name,
        );
        const w = z?.querySelector('[data-wert-text]');
        if (w && w.textContent !== (f.text ?? '')) w.textContent = f.text ?? '';
      }
    }
  }

  // --- Gespräch -------------------------------------------------------------------------------------

  private gespraech(): void {
    const app = this.app;
    const t = app.t;
    const g = app.ui.gespraech;
    if (!g) return;
    const signatur = JSON.stringify(['gespraech', g.phase, g.plan, g.frage, g.vorschlag?.titel]);
    abgleichen(this.inhalt, signatur, () => {
      const kinder: Node[] = [
        h('h2', {}, t('ki.ueberschrift')),
        h('p', { class: 'kennzeichnung', 'data-kennzeichnung': 'ki' }, t('ki.simuliert')),
        h('p', { class: 'frage' }, g.frage),
      ];
      const schliessen = h(
        'button',
        { type: 'button', class: 'knopf', 'data-befehl': 'gespraech.schliessen' },
        t('befehl.gespraech.schliessen'),
      );
      schliessen.addEventListener('click', () => app.starte('gespraech.schliessen'));
      if (g.phase === 'arbeitet' || g.phase === 'angehalten') {
        kinder.push(
          h(
            'div',
            { 'data-muster': 'Statusanzeige', class: 'status' },
            h('span', { class: 'symbol' }, t('symbol.arbeitet')),
            h(
              'span',
              { class: 'wort' },
              t(g.phase === 'arbeitet' ? 'ki.arbeitet' : 'ki.angehalten'),
            ),
          ),
          h(
            'ol',
            { class: 'plan' },
            ...[1, 2, 3].map((n) =>
              h('li', { 'data-erledigt': g.plan >= n ? '1' : '0' }, t(`ki.plan.${n}`)),
            ),
          ),
        );
        if (g.phase === 'arbeitet') {
          const anhalten = h(
            'button',
            { type: 'button', class: 'knopf', 'data-befehl': 'ki.anhalten' },
            t('befehl.ki.anhalten'),
          );
          anhalten.addEventListener('click', () => app.starte('ki.anhalten'));
          kinder.push(anhalten);
        }
      } else if (g.phase === 'erklaerung') {
        kinder.push(
          h('div', { 'data-muster': 'Befund' }, h('p', {}, t('ki.unbekannt'))),
          h(
            'ul',
            { class: 'beispiele' },
            h('li', { 'data-beispiel': '' }, t('ki.beispiel.1')),
            h('li', { 'data-beispiel': '' }, t('ki.beispiel.2')),
          ),
        );
      } else if (g.vorschlag) {
        kinder.push(this.karte(g.vorschlag));
      }
      kinder.push(schliessen);
      return kinder;
    });
  }

  private karte(v: import('../ki/absicht').Vorschlag): HTMLElement {
    const app = this.app;
    const t = app.t;
    const zeilen = v.befehle.map((b) => {
      if (b.id === 'feature.verrunden') {
        return t('ki.zeile.verrunden', {
          radius: anzeigen(b.parameter.radius as Groesse, app.sprache === 'en' ? 'en' : 'de'),
          ziel: String(b.parameter.ziel),
          anzahl: String((b.parameter.kanten as string[]).length),
        });
      }
      return t('ki.zeile.wert', {
        element: String(b.parameter.element),
        name: String(b.parameter.name),
        wert: anzeigen(b.parameter.wert as Groesse, app.sprache === 'en' ? 'en' : 'de'),
      });
    });
    const uebernehmen = h(
      'button',
      {
        type: 'button',
        class: 'knopf',
        'data-befehl': 'vorschlag.uebernehmen',
        'data-hauptaktion': '',
      },
      t('befehl.vorschlag.uebernehmen'),
    );
    const verwerfen = h(
      'button',
      { type: 'button', class: 'knopf ruhig', 'data-befehl': 'vorschlag.verwerfen' },
      t('befehl.vorschlag.verwerfen'),
    );
    uebernehmen.addEventListener('click', () => app.starte('vorschlag.uebernehmen'));
    verwerfen.addEventListener('click', () => app.starte('vorschlag.verwerfen'));
    return h(
      'section',
      { 'data-muster': 'Entscheidungskarte', 'data-quelle': 'ki' },
      h('h3', {}, t(v.titel.schluessel, v.titel.werte)),
      h('p', { class: 'kennzeichnung' }, t('ki.simuliert')),
      h('p', {}, t(v.begruendung)),
      h(
        'div',
        { class: 'werte' },
        ...v.werte.map((w) =>
          h(
            'div',
            { class: 'feldzeile' },
            h('span', {}, t(`feld.${w.feld}`)),
            h('span', { 'data-feld': 'vorher' }, w.vorher === '–' ? t('karte.neu') : w.vorher),
            h('span', { 'data-feld': 'nachher' }, w.nachher),
          ),
        ),
      ),
      h('div', { class: 'befehlszeilen' }, ...zeilen.map((z) => h('code', {}, z))),
      h('div', { class: 'aktionen' }, uebernehmen, verwerfen),
    );
  }

  // --- Entwürfe -------------------------------------------------------------------------------------

  private entwuerfe(): void {
    const app = this.app;
    const t = app.t;
    const ui = app.ui;
    const haupt = app.sitzung.modell();
    const liste = entwuerfe(haupt);
    const aktiv = aktiverEntwurf(haupt);
    const signatur = JSON.stringify([
      'entwuerfe',
      ui.entwurfAnsicht,
      ui.vergleich,
      liste.map((e) => [e.id, e.meta.name, zustandVon(e), e.params.begruendung]),
      aktiv?.id,
    ]);
    abgleichen(this.inhalt, signatur, () => {
      const kinder: Node[] = [h('h2', {}, t('entwurf.titel'))];
      const wahl = h(
        'div',
        { class: 'chips', 'data-muster': 'Auswahlfeld' },
        ...(
          [
            ['ansicht.ergebnis', 'ergebnis'],
            ['ansicht.alle-entwuerfe', 'alle'],
          ] as const
        ).map(([befehl, a]) => {
          const b = h(
            'button',
            {
              type: 'button',
              'data-befehl': befehl,
              'aria-pressed': ui.entwurfAnsicht === a ? 'true' : 'false',
            },
            t(`befehl.${befehl}`),
          );
          b.addEventListener('click', () => app.starte(befehl));
          return b;
        }),
      );
      kinder.push(wahl);
      if (aktiv) {
        const haupt2 = h(
          'button',
          { type: 'button', 'data-befehl': 'entwurf.wechseln', 'data-entwurf': '' },
          t('entwurf.zum-hauptstand'),
        );
        haupt2.addEventListener('click', () => app.starte('entwurf.wechseln', { entwurf: '' }));
        kinder.push(haupt2);
      }
      const sichtbar = liste.filter(
        (e) => ui.entwurfAnsicht === 'alle' || zustandVon(e) !== 'verworfen',
      );
      kinder.push(
        h(
          'ul',
          { class: 'entwuerfe' },
          ...sichtbar.map((e) => {
            const z = zustandVon(e);
            const zeile = h(
              'li',
              { 'data-entwurf-eintrag': e.id },
              h('span', { 'data-feld': 'name' }, e.meta.name),
              h('span', { 'data-feld': 'zustand', class: 'zustand' }, t(`entwurf.zustand.${z}`)),
              z === 'verworfen'
                ? h('span', { 'data-feld': 'begruendung' }, String(e.params.begruendung ?? ''))
                : null,
            );
            if (z === 'offen' && aktiv?.id !== e.id) {
              const wechseln = h(
                'button',
                { type: 'button', 'data-befehl': 'entwurf.wechseln' },
                t('befehl.entwurf.wechseln'),
              );
              wechseln.addEventListener('click', () =>
                app.starte('entwurf.wechseln', { entwurf: e.id }),
              );
              zeile.append(wechseln);
            }
            return zeile;
          }),
        ),
      );
      if (aktiv && ui.vergleich) kinder.push(this.vergleich(aktiv));
      else {
        if (aktiv) {
          const vgl = h(
            'button',
            { type: 'button', class: 'knopf', 'data-befehl': 'entwurf.vergleichen' },
            t('befehl.entwurf.vergleichen'),
          );
          vgl.addEventListener('click', () => app.starte('entwurf.vergleichen'));
          kinder.push(vgl);
        }
        const name = h('input', {
          type: 'text',
          placeholder: t('entwurf.platzhalter'),
          'aria-label': t('entwurf.name'),
          'data-befehl': 'entwurf.anlegen',
          autocomplete: 'off',
        });
        const anlegen = h(
          'button',
          { type: 'button', class: 'knopf', 'data-befehl': 'entwurf.anlegen' },
          t('befehl.entwurf.anlegen'),
        );
        const absenden = () => {
          if (name.value.trim()) app.starte('entwurf.anlegen', { name: name.value.trim() });
        };
        name.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            absenden();
          }
        });
        anlegen.addEventListener('click', absenden);
        kinder.push(h('div', { class: 'neu', 'data-muster': 'Textfeld' }, name, anlegen));
      }
      return kinder;
    });
  }

  private vergleich(entwurf: Element): HTMLElement {
    const app = this.app;
    const t = app.t;
    const haupt = app.sitzung.modell();
    const zeilen: { schritt: string; feld: string; vorher: string; nachher: string }[] = [];
    const fmt = (g: unknown) => anzeigen(g as Groesse, app.sprache === 'en' ? 'en' : 'de');
    const aend = aenderungenVon(entwurf);
    for (const [id, werte] of Object.entries(aend)) {
      const ziel = alle(haupt).find((e) => e.id === id);
      if (!ziel) continue;
      for (const [name, wert] of Object.entries(werte)) {
        const alt = ziel.params[name];
        if (
          alt &&
          typeof alt === 'object' &&
          'value' in alt &&
          wert &&
          typeof wert === 'object' &&
          'value' in wert
        ) {
          zeilen.push({
            schritt: ziel.meta.name,
            feld: t(`feld.${name}`),
            vorher: fmt(alt),
            nachher: fmt(wert),
          });
        }
      }
    }
    const begruendung = h('input', {
      type: 'text',
      placeholder: t('entwurf.begruendung-beispiel'),
      'aria-label': t('entwurf.begruendung'),
      'data-befehl': 'entwurf.verwerfen',
      autocomplete: 'off',
    });
    const verwerfen = h(
      'button',
      { type: 'button', class: 'knopf ruhig', 'data-befehl': 'entwurf.verwerfen', disabled: true },
      t('befehl.entwurf.verwerfen'),
    );
    const uebernehmen = h(
      'button',
      {
        type: 'button',
        class: 'knopf',
        'data-befehl': 'entwurf.uebernehmen',
        'data-hauptaktion': '',
      },
      t('befehl.entwurf.uebernehmen'),
    );
    begruendung.addEventListener('input', () => {
      verwerfen.disabled = !begruendung.value.trim();
    });
    verwerfen.addEventListener('click', () => {
      if (begruendung.value.trim())
        app.starte('entwurf.verwerfen', { begruendung: begruendung.value.trim() });
    });
    uebernehmen.addEventListener('click', () => app.starte('entwurf.uebernehmen'));
    return h(
      'section',
      { 'data-muster': 'Vergleich', 'data-entwurfskarte': '' },
      h('h3', {}, entwurf.meta.name),
      ...zeilen.map((z) =>
        h(
          'div',
          { class: 'feldzeile', 'data-vergleich-zeile': '' },
          h('span', { 'data-schritt-name': '' }, z.schritt),
          h('span', { 'data-feld-name': '' }, z.feld),
          h('span', { 'data-vorher': '' }, z.vorher),
          h('span', { 'data-nachher': '' }, z.nachher),
        ),
      ),
      h('div', { class: 'neu', 'data-muster': 'Textfeld' }, begruendung),
      h('div', { class: 'aktionen' }, uebernehmen, verwerfen),
    );
  }
}
