// Modell-Zone: Dokument-Reiter, Pfad, Konturen, Kontextaktionen, Griff, Schilder und Ansichtsleiste über der Szene.
import type { App } from '../app';
import { entlang, huellbox, konvexeHuelle } from '../ansicht/geom';
import type { Punkt } from '../ansicht/szene';
import { wert, type Element } from '../modell/element';
import { kontextaktionen, kontextmenue, type Befehl } from '../modell/register';
import { h, symbol, type Symbolname } from '../ui/dom';
import { familienMenue, popup } from '../ui/menue';
import { statusElement, statusVon } from './struktur';

export const BEFEHL_SYMBOL: Record<string, Symbolname> = {
  'element.duplizieren': 'copy',
  'auswahl.duplizieren': 'copy',
  'element.umbenennen': 'pencil',
  'element.verwerfen': 'trash-2',
  'auswahl.verwerfen': 'trash-2',
  'element.ausblenden': 'eye-off',
  'auswahl.ausblenden': 'eye-off',
  'element.einblenden': 'eye',
  'ansicht.auf-auswahl': 'focus',
  'ansicht.einpassen': 'maximize',
  'ansicht.isolieren': 'cuboid',
  'ansicht.alles-einblenden': 'eye',
  'ansicht.projektion': 'box',
  'darstellung.wechseln': 'layers',
  'element.zurueckholen': 'undo-2',
  'element.aktivieren': 'maximize',
  'element.wert-setzen': 'pencil',
};

/** Hülle eines Elements in Bildschirmkoordinaten (konvex), oder null. */
export function huelleBildschirm(app: App, id: string): Punkt[] | null {
  const box = app.huelle(id);
  if (!box || !app.szene) return null;
  return konvexeHuelle(app.szene.eckenProjiziert(box));
}

/** Namen des Parameters, der als Griff am Element gezogen werden kann (Dicke bzw. Höhe). */
export function griffParameter(e: Element): string | null {
  if (e.type === 'extrusion' || e.type === 'schale') {
    if (e.params.dicke !== undefined) return 'dicke';
    if (e.params.hoehe !== undefined) return 'hoehe';
  }
  return null;
}

const rund = (p: Punkt, breite: number, ursprung: Punkt): Punkt => {
  const versatz = breite % 2 === 1 ? 0.5 : 0;
  return { x: Math.round(p.x - ursprung.x) + versatz, y: Math.round(p.y - ursprung.y) + versatz };
};

export interface KonturInfo {
  id: string;
  polygon: Punkt[];
  token: string;
  breite: number;
  strichart: 'durchgezogen' | 'gestrichelt';
  zustand: string;
}

/** Konturen der Elemente, deren Kanal „Kontur“ im Modell gezeichnet wird (Vorrang bereits angewendet). */
export function konturen(app: App, ursprung: Punkt): KonturInfo[] {
  const kandidaten = new Set<string>([
    ...app.auswahlIds(),
    ...app.andereElemente(),
    ...(app.hover ? [app.hover] : []),
  ]);
  const aus: KonturInfo[] = [];
  for (const id of kandidaten) {
    if (app.istAusgeblendet(id)) continue;
    const d = app.darstellungVon(id, 'modell');
    const k = d?.kanaele.find((x) => x.kanal === 'Kontur');
    const hulle = huelleBildschirm(app, id);
    if (!k || !hulle || hulle.length < 3) continue;
    const breite = k.breite ?? 1;
    aus.push({
      id,
      polygon: hulle.map((p) => rund(p, breite, ursprung)),
      token: k.token,
      breite,
      strichart: k.strichart ?? 'durchgezogen',
      zustand: k.zustand,
    });
  }
  return aus;
}

/** Messpunkte auf der gezeichneten Kontur (Seitenkoordinaten, ganzzahlig = Pixel unter der Linienmitte). */
export function konturPunkte(app: App, id: string): Punkt[] {
  const r = app.szene?.canvas.getBoundingClientRect();
  if (!r) return [];
  const k = konturen(app, { x: r.left, y: r.top }).find((x) => x.id === id);
  if (!k) return [];
  const versatz = k.breite % 2 === 1 ? 0.5 : 0;
  const poly = k.polygon.map((p) => ({ x: p.x - versatz + r.left, y: p.y - versatz + r.top }));
  return entlang(poly, 4).map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) }));
}

function konturSvg(app: App, ursprung: Punkt, breite: number, hoehe: number): HTMLElement {
  const liste = konturen(app, ursprung);
  const kanten = kantenLinien(app, ursprung);
  return h(
    'svg',
    {
      class: 'konturen',
      width: String(breite),
      height: String(hoehe),
      viewBox: `0 0 ${breite} ${hoehe}`,
      'aria-hidden': 'true',
      'shape-rendering': 'crispEdges',
    },
    ...liste.map((k) =>
      h('path', {
        'data-key': `kontur-${k.id}`,
        class: `kontur ${k.zustand}`,
        d: `M ${k.polygon.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`,
        fill: 'none',
        'stroke-width': String(k.breite),
        'stroke-dasharray': k.strichart === 'gestrichelt' ? '6 4' : null,
        'data-kontur-id': k.id,
        'data-kontur-token': k.token,
        'data-kontur-breite': String(k.breite),
        'data-kontur-strichart': k.strichart,
        'data-zustand': k.zustand,
        style: `stroke: var(--farbe-${k.token})`,
      }),
    ),
    ...kanten,
  );
}

/** Ausgewählte Kanten als dicke Linie in `akzent`. */
function kantenLinien(app: App, ursprung: Punkt): HTMLElement[] {
  const aus: HTMLElement[] = [];
  for (const a of app.auswahl) {
    if (a.teil?.art !== 'kante') continue;
    const box = app.huelle(a.element_id);
    if (!box || !app.szene) continue;
    const k = app.szene.kantenVon(a.element_id, box).find((x) => x.adresse === a.teil?.adresse);
    if (!k) continue;
    aus.push(
      h('line', {
        'data-key': `kante-${k.adresse}`,
        x1: String(Math.round(k.von.x - ursprung.x)),
        y1: String(Math.round(k.von.y - ursprung.y)),
        x2: String(Math.round(k.bis.x - ursprung.x)),
        y2: String(Math.round(k.bis.y - ursprung.y)),
        'stroke-width': '3',
        'data-kante': a.teil.adresse,
        style: 'stroke: var(--farbe-akzent)',
      }),
    );
  }
  return aus;
}

export function reiter(app: App): HTMLElement {
  return h(
    'div',
    { class: 'reiterzeile', role: 'tablist', 'data-chrome': '', 'data-key': 'reiter' },
    ...app.projekt.content.map((d) =>
      h(
        'button',
        {
          type: 'button',
          role: 'tab',
          class: 'reiter',
          'data-key': `tab-${d.id}`,
          'data-befehl': 'dokument.wechseln',
          'data-par': JSON.stringify({ dok: d.id }),
          'aria-selected': d.id === app.dok ? 'true' : 'false',
          tabindex: '-1',
        },
        d.meta.name,
        app.andere.aktiv && app.andere.dok === d.id
          ? h(
              'span',
              {
                class: 'person-marke',
                'data-zustand': 'andere',
                title: app.t('anwesenheit.person'),
              },
              symbol('user', 12),
            )
          : null,
      ),
    ),
  );
}

export function pfad(app: App): HTMLElement {
  const glieder = app.pfadGlieder();
  const wurzel = app.dokument();
  const teile: (HTMLElement | null)[] = [];
  glieder.forEach((g, i) => {
    const letzt = i === glieder.length - 1;
    const istWurzel = g.id === wurzel.id;
    const z = app.zustaende(g.id);
    if (i > 0)
      teile.push(
        h('span', { class: 'trenner', 'data-key': `t-${g.id}` }, symbol('chevron-right', 12)),
      );
    teile.push(
      h(
        'button',
        {
          type: 'button',
          class: 'glied',
          'data-key': `g-${g.id}`,
          'data-id': g.id,
          'data-befehl': istWurzel ? 'element.verlassen' : 'element.aktivieren',
          'data-par': JSON.stringify({ element: g.id }),
          'data-zustand': z.join(' ') || null,
          'data-akzent': z.includes('ausgewaehlt') ? 'auswahl' : null,
          'aria-current': letzt ? 'location' : null,
          tabindex: '-1',
        },
        g.meta.name,
      ),
    );
  });
  return h(
    'nav',
    {
      class: 'pfad',
      'data-muster-kandidat': 'Pfad',
      'data-chrome': '',
      'data-key': 'pfad',
      'aria-label': app.t('pfad.titel'),
    },
    ...teile,
  );
}

const LEISTE: string[] = [
  'ansicht.einpassen',
  'ansicht.auf-auswahl',
  'ansicht.isolieren',
  'ansicht.alles-einblenden',
  'ansicht.projektion',
  'darstellung.wechseln',
];

export function ansichtsleiste(app: App): HTMLElement {
  const knoepfe = LEISTE.map((id) => app.befehl(id)).filter((b): b is Befehl => !!b);
  return h(
    'div',
    {
      class: 'ansichtsleiste',
      role: 'toolbar',
      'data-muster-kandidat': 'Ansichtsleiste',
      'data-chrome': '',
      'data-ort': 'ansichtsleiste',
      'data-key': 'ansichtsleiste',
      'aria-label': app.t('ansichtsleiste.titel'),
    },
    ...knoepfe.map((b) =>
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-befehl': b.id,
          'data-key': `al-${b.id}`,
          'aria-disabled': app.anwendbar(b) ? null : 'true',
          'aria-pressed': b.id === 'ansicht.isolieren' ? (app.isoliert ? 'true' : 'false') : null,
          title: app.t(b.titel),
          'aria-label': app.t(b.titel),
        },
        symbol(BEFEHL_SYMBOL[b.id] ?? 'square'),
      ),
    ),
    h(
      'div',
      { class: 'menue-eintrag', 'data-key': 'mehr' },
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-menue-trigger': 'ansicht',
          'aria-haspopup': 'menu',
          'aria-expanded': app.menue === 'ansicht' ? 'true' : 'false',
          title: app.t('ansichtsleiste.mehr'),
          'aria-label': app.t('ansichtsleiste.mehr'),
        },
        symbol('chevron-down'),
      ),
      app.menue === 'ansicht'
        ? popup(
            'ansichtsleiste',
            [...familienMenue(app, 'Ansicht'), ...familienMenue(app, 'Ansicht speichern')],
            'menue',
            'nach-oben',
          )
        : null,
    ),
  );
}

function kontextleiste(app: App, ursprung: Punkt, breite: number): HTMLElement | null {
  const art = app.auswahlart();
  if (art === 'keine' || app.dnd || app.griff) return null;
  const gruppen = kontextmenue(app.register, art, (b) => app.anwendbar(b));
  const aktionen = kontextaktionen(gruppen);
  if (!aktionen.length) return null;
  const ziele = app
    .auswahlIds()
    .map((i) => huelleBildschirm(app, i))
    .filter((x): x is Punkt[] => !!x);
  const alle = ziele.flat();
  if (!alle.length) return null;
  const box = huellbox(alle);
  const mitteX = Math.min(Math.max(box.x + box.breite / 2 - ursprung.x, 110), breite - 110);
  const oben = Math.max(box.y - ursprung.y - 46, 84);
  return aktionsLeiste(app, aktionen, `left:${Math.round(mitteX)}px;top:${Math.round(oben)}px`);
}

/** Die Kontextaktionen: die ersten fünf Einträge des Kontextmenüs nach Rang (Muster Kontextaktionen). */
export function aktionsLeiste(app: App, aktionen: Befehl[], stil: string | null): HTMLElement {
  return h(
    'div',
    {
      class: 'kontextaktionen',
      role: 'toolbar',
      'data-muster': 'Kontextaktionen',
      'data-chrome': '',
      'data-weg': 'kontextaktion',
      'data-key': 'kontextaktionen',
      style: stil,
    },
    ...aktionen.map((b) =>
      h(
        'button',
        {
          type: 'button',
          class: 'schalter',
          'data-befehl': b.id,
          'data-key': `ka-${b.id}`,
          title: app.t(b.titel),
          'aria-label': app.t(b.titel),
        },
        symbol(BEFEHL_SYMBOL[b.id] ?? 'square'),
      ),
    ),
  );
}

function griffElement(app: App, ursprung: Punkt): HTMLElement | null {
  if (app.auswahlIds().length !== 1) return null;
  const e = app.find(app.auswahlIds()[0] as string);
  if (!e || !app.szene || app.istAusgeblendet(e.id)) return null;
  const name = griffParameter(e);
  const box = app.huelle(e.id);
  if (!name || !box) return null;
  const p = app.szene.projiziere([
    (box.min[0] + box.max[0]) / 2,
    (box.min[1] + box.max[1]) / 2,
    box.max[2],
  ]);
  return h(
    'div',
    {
      class: 'griff',
      role: 'slider',
      tabindex: '-1',
      'data-griff': e.id,
      'data-griff-name': name,
      'data-muster-kandidat': 'Griff',
      'data-chrome': '',
      'data-akzent': 'auswahl',
      'aria-label': app.t(`feld.${name}`),
      'aria-valuenow': String(wert(e.params[name])),
      'data-key': 'griff',
      style: `left:${Math.round(p.x - ursprung.x)}px;top:${Math.round(p.y - ursprung.y - 22)}px`,
    },
    symbol('arrow-up', 14),
  );
}

function schilder(app: App, ursprung: Punkt): (HTMLElement | null)[] {
  const aus: (HTMLElement | null)[] = [];
  for (const [i, e] of app.zeilen().entries()) {
    void i;
    const s = statusVon(app, e.element.id);
    if (!s || app.istAusgeblendet(e.element.id)) continue;
    const hulle = huelleBildschirm(app, e.element.id);
    if (!hulle) continue;
    const box = huellbox(hulle);
    aus.push(
      h(
        'div',
        {
          class: 'modell-status',
          'data-chrome': '',
          'data-key': `ms-${e.element.id}`,
          style: `left:${Math.round(box.x - ursprung.x)}px;top:${Math.round(box.y - ursprung.y - 22)}px`,
        },
        statusElement(app, s, e.element.id),
      ),
    );
  }
  const fremd = app.andereElemente()[0];
  if (fremd) {
    const hulle = huelleBildschirm(app, fremd);
    if (hulle) {
      const box = huellbox(hulle);
      aus.push(
        h(
          'div',
          {
            class: 'namensschild',
            'data-chrome': '',
            'data-key': 'namensschild',
            'data-person': '',
            style: `left:${Math.round(box.x - ursprung.x)}px;top:${Math.round(box.y - ursprung.y - 44)}px`,
          },
          app.t('anwesenheit.person'),
        ),
        h(
          'div',
          {
            class: 'fremder-zeiger',
            'data-chrome': '',
            'data-key': 'fremder-zeiger',
            'data-zeiger': '',
            style: `left:${Math.round(box.x + box.breite * 0.75 - ursprung.x)}px;top:${Math.round(box.y + box.hoehe * 0.55 - ursprung.y)}px`,
          },
          symbol('user', 14),
          h('span', { class: 'name' }, app.t('anwesenheit.person')),
          h('span', { class: 'simuliert' }, app.t('simuliert')),
        ),
      );
    }
  }
  return aus;
}

function zeigerzahl(app: App, ursprung: Punkt): HTMLElement | null {
  const g = app.griff;
  if (!g) return null;
  const text = g.eingabe !== '' ? g.eingabe : String(Math.round(g.wert));
  return h(
    'div',
    {
      class: 'zeigerzahl',
      'data-zeigerzahl': '',
      'data-chrome': '',
      'data-key': 'zeigerzahl',
      style: `left:${Math.round(g.zeiger.x - ursprung.x + 14)}px;top:${Math.round(g.zeiger.y - ursprung.y - 28)}px`,
    },
    `${text} mm`,
  );
}

export function baueModell(app: App): (HTMLElement | null)[] {
  const szene = app.szene;
  const r = szene?.canvas.getBoundingClientRect();
  const ursprung = { x: r?.left ?? 0, y: r?.top ?? 0 };
  const breite = Math.round(r?.width ?? 0);
  const hoehe = Math.round(r?.height ?? 0);
  const leer = app.dokument().content.length === 0;
  return [
    konturSvg(app, ursprung, breite, hoehe),
    reiter(app),
    pfad(app),
    app.aktiv
      ? h(
          'button',
          {
            type: 'button',
            class: 'knopf haupt fertig',
            'data-chrome': '',
            'data-befehl': 'element.verlassen',
            'data-hauptaktion': '',
            'data-akzent': 'hauptaktion',
            'data-key': 'fertig',
          },
          app.t('aktiv.fertig'),
        )
      : null,
    leer
      ? h(
          'div',
          { class: 'leer mitte', 'data-muster': 'Leerer Zustand', 'data-key': 'leer-modell' },
          h('p', {}, app.t('modell.leer')),
        )
      : null,
    kontextleiste(app, ursprung, breite),
    griffElement(app, ursprung),
    ...schilder(app, ursprung),
    zeigerzahl(app, ursprung),
    ansichtsleiste(app),
  ];
}
