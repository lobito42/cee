// Bausteinkatalog (`/?katalog`, `/?katalog=<baustein>`): jede Seite zeigt den echten Baustein live in hell und
// dunkel, seine Regel, den Bezug zum Musterkatalog, seine Befehle und Tokens. Maßstab für spätere Oberflächen.
import { App } from '../app';
import type { Sprache, Uebersetzer } from '../i18n';
import { kuerzelText } from '../i18n';
import { standardProjekt } from '../modell/beispiele';
import { finde, mm } from '../modell/element';
import {
  befehleAusDatei,
  kontextaktionen,
  kontextmenue,
  type Auswahlart,
  type Befehl,
} from '../modell/register';
import { h, symbol } from '../ui/dom';
import { familienMenue, popup } from '../ui/menue';
import { karte, kontext } from '../zonen/chat';
import { baueEigenschaften, feldElement } from '../zonen/eigenschaften';
import { aktionsLeiste, ansichtsleiste, pfad, reiter } from '../zonen/modell';
import { bauePanel } from '../zonen/panel';
import { baueRueckmeldung } from '../zonen/rueckmeldung';
import { baueSuche } from '../zonen/suche';
import { baueKontextmenue } from '../zonen/kontextmenue';
import { baueStruktur, statusElement, zeile } from '../zonen/struktur';
import { vorschlagWert } from '../ki';

type Bezug = { art: 'muster' | 'kandidat'; name: string };

interface Baustein {
  id: string;
  bezug: Bezug;
  adrs: number[];
  befehle: string[];
  tokens: string[];
  beispiele: (f: Fabrik) => HTMLElement[];
}

/** Ein eigener, abgekoppelter App-Zustand je Beispiel (nichts davon berührt eine andere Seite). */
interface Fabrik {
  t: Uebersetzer;
  sprache: Sprache;
  thema: 'hell' | 'dunkel';
  app: (f?: (a: App) => void) => App;
}

const beispiel = (titel: string, ...kinder: (HTMLElement | null)[]): HTMLElement =>
  h(
    'figure',
    { class: 'beispiel', 'data-key': titel },
    h('figcaption', {}, titel),
    ...kinder.filter((k): k is HTMLElement => !!k),
  );

const kanaeleAttr = (a: App, id: string, d: 'modell' | 'struktur' | 'chat' | 'pfad'): string =>
  JSON.stringify(a.darstellungVon(id, d)?.kanaele ?? []);

/** Beispiel für einen Zustand: Modell als gezeichnete Kontur, die anderen als echter Baustein. */
const ZUSTAND_BEISPIELE: {
  zustand: string;
  element: string;
  doku?: boolean;
  darstellungen: ('modell' | 'struktur' | 'chat' | 'pfad')[];
  einrichten: (a: App) => void;
}[] = [
  {
    zustand: 'hover',
    element: 'steg',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => (a.hover = 'steg'),
  },
  {
    zustand: 'ausgewaehlt',
    element: 'grundplatte',
    darstellungen: ['modell', 'struktur', 'chat'],
    einrichten: (a) => a.setzeAuswahl([{ element_id: 'grundplatte' }]),
  },
  {
    zustand: 'andere',
    element: 'steg',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => (a.andere = { aktiv: true, dok: 'halter', element: 'steg' }),
  },
  {
    zustand: 'aktiv',
    element: 'gehaeuse',
    doku: true,
    darstellungen: ['modell', 'struktur', 'pfad'],
    einrichten: (a) => {
      a.dok = 'sensorgehaeuse';
      a.aktiv = 'gehaeuse';
    },
  },
  {
    zustand: 'gedimmt',
    element: 'deckel',
    doku: true,
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => {
      a.dok = 'sensorgehaeuse';
      a.aktiv = 'gehaeuse';
    },
  },
  {
    zustand: 'ausgeblendet',
    element: 'skizze',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => a.ausgeblendet.add('skizze'),
  },
  {
    zustand: 'fehlerhaft',
    element: 'bohrungen',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => {
      const b = finde(a.dokument(), 'bohrungen');
      if (b) b.params.durchmesser = mm(55);
    },
  },
  {
    zustand: 'pausiert',
    element: 'steg',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => {
      const s = finde(a.dokument(), 'steg');
      if (s) s.meta.pausiert = true;
    },
  },
  {
    zustand: 'rechnet',
    element: 'grundplatte',
    darstellungen: ['modell', 'struktur'],
    einrichten: (a) => a.status.set('grundplatte', 'rechnet'),
  },
];

function modellProbe(a: App, id: string): HTMLElement {
  const k = a.darstellungVon(id, 'modell')?.kanaele.find((x) => x.kanal === 'Kontur');
  const breite = k?.breite ?? 1;
  const andere = a.darstellungVon(id, 'modell')?.kanaele ?? [];
  return h(
    'span',
    {
      class: 'modell-probe',
      'data-kanaele': JSON.stringify(andere),
      'data-id': id,
      style: 'display:inline-flex;gap:8px;align-items:center',
    },
    h(
      'svg',
      { width: '72', height: '36', viewBox: '0 0 72 36' },
      h('rect', {
        x: '6',
        y: '6',
        width: '60',
        height: '24',
        fill: 'none',
        'stroke-width': String(breite),
        'stroke-dasharray': k?.strichart === 'gestrichelt' ? '6 4' : null,
        style: `stroke: var(--farbe-${k?.token ?? 'linie'})`,
        opacity: a.zustaende(id).includes('ausgeblendet') ? '0.35' : null,
      }),
    ),
  );
}

function zustandBeispiele(f: Fabrik): HTMLElement[] {
  return ZUSTAND_BEISPIELE.map((z) => {
    const a = f.app(z.einrichten);
    const e = a.find(z.element);
    if (!e) return h('span', {});
    const teile = z.darstellungen.map((d) => {
      if (d === 'modell') return h('div', { class: 'teil' }, modellProbe(a, z.element));
      if (d === 'struktur')
        return h(
          'div',
          { class: 'teil baum', 'data-kanaele': kanaeleAttr(a, z.element, 'struktur') },
          zeile(a, e, 0, 0),
        );
      if (d === 'chat')
        return h(
          'div',
          { class: 'teil', 'data-kanaele': kanaeleAttr(a, z.element, 'chat') },
          kontext(a),
        );
      return h(
        'div',
        { class: 'teil', 'data-kanaele': kanaeleAttr(a, z.element, 'pfad') },
        pfad(a),
      );
    });
    return beispiel(
      f.t(`katalog.zustand.${z.zustand}`),
      h('div', { class: 'zeile-bsp' }, ...teile),
    );
  });
}

const ARTEN: Auswahlart[] = ['schritt'];

function menueFuer(a: App, art: Auswahlart): HTMLElement | null {
  const menue = kontextmenue(a.register, art, (b) => a.anwendbar(b));
  a.kontextMenue = { x: 0, y: 0, art, menue, mehrOffen: false };
  return baueKontextmenue(a);
}

const BAUSTEINE: Baustein[] = [
  {
    id: 'zustaende',
    bezug: { art: 'kandidat', name: 'Elementzustände' },
    adrs: [65, 61],
    befehle: ['auswahl.setzen', 'element.ausblenden', 'element.verwerfen'],
    tokens: [
      'akzent',
      'akzent-flaeche',
      'flaeche-2',
      'linie-stark',
      'text-2',
      'text-3',
      'fehler',
      'fehler-flaeche',
    ],
    beispiele: zustandBeispiele,
  },
  {
    id: 'auswahl',
    bezug: { art: 'muster', name: 'Auswahl im Modell' },
    adrs: [65, 58],
    befehle: ['auswahl.setzen', 'auswahl.alles', 'auswahl.aufheben'],
    tokens: ['akzent', 'akzent-flaeche'],
    beispiele: (f) => {
      const a = f.app((x) =>
        x.setzeAuswahl([{ element_id: 'grundplatte' }, { element_id: 'steg' }]),
      );
      return [
        beispiel(
          f.t('katalog.bsp.auswahl-struktur'),
          h('div', { class: 'baum' }, ...baueStruktur(a)),
        ),
        beispiel(f.t('katalog.bsp.auswahl-eigenschaften'), h('div', {}, ...baueEigenschaften(a))),
        beispiel(f.t('katalog.bsp.auswahl-chat'), kontext(a)),
      ];
    },
  },
  {
    id: 'struktur-zeile',
    bezug: { art: 'kandidat', name: 'Struktur-Zeile' },
    adrs: [65],
    befehle: ['element.aktivieren', 'element.ausblenden', 'element.umbenennen'],
    tokens: ['flaeche-2', 'akzent-flaeche', 'text', 'text-3', 'fehler'],
    beispiele: (f) =>
      ZUSTAND_BEISPIELE.filter((z) =>
        ['hover', 'ausgewaehlt', 'ausgeblendet', 'fehlerhaft', 'rechnet'].includes(z.zustand),
      ).map((z) => {
        const a = f.app(z.einrichten);
        const e = a.find(z.element);
        return beispiel(
          f.t(`katalog.zustand.${z.zustand}`),
          e ? h('div', { class: 'baum' }, zeile(a, e, 0, 0)) : null,
        );
      }),
  },
  {
    id: 'auge',
    bezug: { art: 'kandidat', name: 'Auge' },
    adrs: [65, 15],
    befehle: ['element.ausblenden', 'element.einblenden', 'ansicht.alles-einblenden'],
    tokens: ['text-2', 'text-3', 'flaeche-2'],
    beispiele: (f) => {
      const an = f.app();
      const aus = f.app((x) => x.ausgeblendet.add('steg'));
      return [
        beispiel(
          f.t('katalog.bsp.auge-an'),
          h('div', { class: 'baum' }, zeile(an, an.find('steg')!, 0, 0)),
        ),
        beispiel(
          f.t('katalog.bsp.auge-aus'),
          h('div', { class: 'baum' }, zeile(aus, aus.find('steg')!, 0, 0)),
        ),
      ];
    },
  },
  {
    id: 'kontextmenue',
    bezug: { art: 'kandidat', name: 'Kontextmenü' },
    adrs: [65, 45],
    befehle: [
      'element.duplizieren',
      'element.umbenennen',
      'element.verwerfen',
      'ansicht.auf-auswahl',
    ],
    tokens: ['flaeche', 'linie-stark', 'flaeche-2', 'text-3'],
    beispiele: (f) =>
      ARTEN.map((art) => {
        const a = f.app((x) => x.setzeAuswahl([{ element_id: 'grundplatte' }]));
        const m = menueFuer(a, art);
        return beispiel(f.t('katalog.bsp.kontextmenue'), m);
      }),
  },
  {
    id: 'kontextaktionen',
    bezug: { art: 'muster', name: 'Kontextaktionen' },
    adrs: [65, 63],
    befehle: [
      'element.duplizieren',
      'element.umbenennen',
      'element.verwerfen',
      'element.ausblenden',
      'ansicht.auf-auswahl',
    ],
    tokens: ['flaeche', 'linie-stark', 'flaeche-2'],
    beispiele: (f) => {
      const a = f.app((x) => x.setzeAuswahl([{ element_id: 'grundplatte' }]));
      const aktionen = kontextaktionen(kontextmenue(a.register, 'schritt', (b) => a.anwendbar(b)));
      const m = f.app((x) =>
        x.setzeAuswahl([{ element_id: 'grundplatte' }, { element_id: 'steg' }]),
      );
      const mehrere = kontextaktionen(kontextmenue(m.register, 'mehrfach', (b) => m.anwendbar(b)));
      return [
        beispiel(f.t('katalog.bsp.ein-element'), aktionsLeiste(a, aktionen, null)),
        beispiel(f.t('katalog.bsp.mehrere'), aktionsLeiste(m, mehrere, null)),
      ];
    },
  },
  {
    id: 'dropdown',
    bezug: { art: 'kandidat', name: 'Dropdown' },
    adrs: [65, 60],
    befehle: [
      'bearbeiten.rueckgaengig',
      'element.duplizieren',
      'auswahl.alles',
      'element.umhaengen',
    ],
    tokens: ['flaeche', 'linie-stark', 'flaeche-2', 'text-3'],
    beispiele: (f) => {
      const a = f.app();
      return [
        beispiel(
          f.t('familie.Bearbeiten'),
          popup('dropdown-bearbeiten', familienMenue(a, 'Bearbeiten')),
        ),
        beispiel(
          f.t('familie.Baugruppe'),
          popup('dropdown-baugruppe', familienMenue(a, 'Baugruppe')),
        ),
      ];
    },
  },
  {
    id: 'suche',
    bezug: { art: 'muster', name: 'Suche' },
    adrs: [45, 52],
    befehle: ['suche.oeffnen', 'katalog.oeffnen'],
    tokens: ['flaeche', 'linie-stark', 'akzent-flaeche'],
    beispiele: (f) => {
      const a = f.app(
        (x) => (x.suche = { offen: true, text: 'ver', index: 0, alle: false, fokussiert: true }),
      );
      return [beispiel(f.t('katalog.bsp.suche'), baueSuche(a))];
    },
  },
  {
    id: 'wertfeld',
    bezug: { art: 'muster', name: 'Wertfeld' },
    adrs: [44, 57],
    befehle: ['element.wert-setzen'],
    tokens: ['flaeche-2', 'linie', 'linie-stark'],
    beispiele: (f) => {
      const a = f.app();
      const feld = { key: 'laenge', param: 'laenge', text: '80 mm', editierbar: true };
      const gemischt = { ...feld, text: f.t('eigenschaften.gemischt') };
      const fehler = f.app(
        (x) => (x.feldBefund = { feld: 'laenge', schluessel: 'wert.fehler.nicht-lesbar' }),
      );
      return [
        beispiel(f.t('katalog.bsp.wert'), feldElement(a, feld, ['grundplatte'], false)),
        beispiel(
          f.t('katalog.bsp.gemischt'),
          feldElement(a, gemischt, ['grundplatte', 'steg'], true),
        ),
        beispiel(
          f.t('katalog.bsp.fehler'),
          feldElement(fehler, { ...feld, text: 'abc' }, ['grundplatte'], false),
        ),
      ];
    },
  },
  {
    id: 'griff',
    bezug: { art: 'kandidat', name: 'Griff' },
    adrs: [44, 65],
    befehle: ['element.wert-setzen'],
    tokens: ['akzent', 'flaeche', 'linie-stark'],
    beispiele: (f) => [
      beispiel(
        f.t('katalog.bsp.griff'),
        h(
          'div',
          { class: 'zeile-bsp' },
          h('div', { class: 'griff', 'data-akzent': 'auswahl' }, symbol('arrow-up', 14)),
          h('div', { class: 'zeigerzahl' }, '12 mm'),
        ),
      ),
    ],
  },
  {
    id: 'ziehen-ablegen',
    bezug: { art: 'kandidat', name: 'Ziehen & Ablegen' },
    adrs: [65, 51],
    befehle: ['element.umhaengen'],
    tokens: ['akzent-flaeche', 'fehler-flaeche', 'flaeche'],
    beispiele: (f) => {
      const sensor = (x: App, ziel: string, erlaubt: boolean) => {
        x.dok = 'sensorgehaeuse';
        x.dnd = { id: ziel === 'gehaeuse' ? 'baugruppe-1' : 'deckel', x: 0, y: 0, ziel, erlaubt };
      };
      const ok = f.app((x) => sensor(x, 'baugruppe-1', true));
      const nein = f.app((x) => sensor(x, 'gehaeuse', false));
      return [
        beispiel(f.t('katalog.bsp.ablegen-ok'), h('div', { class: 'baum' }, ...baueStruktur(ok))),
        beispiel(
          f.t('katalog.bsp.ablegen-nein'),
          h('div', { class: 'baum' }, ...baueStruktur(nein)),
        ),
      ];
    },
  },
  {
    id: 'statusanzeige',
    bezug: { art: 'muster', name: 'Statusanzeige' },
    adrs: [50, 61],
    befehle: ['element.pausieren', 'element.fortsetzen'],
    tokens: ['fehler', 'text-2'],
    beispiele: (f) => {
      const a = f.app();
      return [
        beispiel(
          f.t('status.rechnet'),
          statusElement(
            a,
            { zustand: 'rechnet', symbol: 'loader', token: 'text-2' },
            'grundplatte',
          ),
        ),
        beispiel(
          f.t('status.fehlerhaft'),
          statusElement(
            a,
            { zustand: 'fehlerhaft', symbol: 'circle-alert', token: 'fehler' },
            'bohrungen',
          ),
        ),
        beispiel(
          f.t('status.pausiert'),
          statusElement(
            a,
            { zustand: 'pausiert', symbol: 'circle-pause', token: 'text-2' },
            'steg',
          ),
        ),
      ];
    },
  },
  {
    id: 'befund',
    bezug: { art: 'muster', name: 'Befund' },
    adrs: [50, 61],
    befehle: ['element.wert-setzen', 'fenster.panel'],
    tokens: ['fehler', 'fehler-flaeche', 'warnung-flaeche'],
    beispiele: (f) => {
      const a = f.app((x) => {
        const b = finde(x.dokument(), 'bohrungen');
        if (b) b.params.durchmesser = mm(55);
      });
      return [beispiel(f.t('panel.befunde'), h('div', {}, ...bauePanel(a)))];
    },
  },
  {
    id: 'rueckmeldung',
    bezug: { art: 'muster', name: 'Rückmeldung' },
    adrs: [50, 61],
    befehle: ['bearbeiten.rueckgaengig'],
    tokens: ['text-2', 'flaeche'],
    beispiele: (f) => {
      const a = f.app((x) => x.meldung('rueck.verworfen', { name: 'Steg' }));
      return [
        beispiel(
          f.t('katalog.bsp.rueckmeldung'),
          h('div', { class: 'leise' }, ...baueRueckmeldung(a)),
        ),
      ];
    },
  },
  {
    id: 'entscheidungskarte',
    bezug: { art: 'muster', name: 'Entscheidungskarte' },
    adrs: [21, 61],
    befehle: ['chat.uebernehmen', 'chat.verwerfen'],
    tokens: ['akzent', 'flaeche', 'linie-stark'],
    beispiele: (f) => {
      const a = f.app((x) => {
        const steg = finde(x.dokument(), 'steg');
        if (steg) x.chat.vorschlag = vorschlagWert(x, steg, 'hoehe', 40);
      });
      return [beispiel(f.t('katalog.bsp.karte'), karte(a))];
    },
  },
  {
    id: 'pfad',
    bezug: { art: 'kandidat', name: 'Pfad' },
    adrs: [65],
    befehle: ['element.aktivieren', 'element.verlassen'],
    tokens: ['text-2', 'text', 'flaeche-2'],
    beispiele: (f) => {
      const a = f.app((x) => {
        x.dok = 'sensorgehaeuse';
        x.aktiv = 'gehaeuse';
      });
      return [
        beispiel(f.t('katalog.bsp.pfad'), pfad(a)),
        beispiel(f.t('katalog.bsp.pfad-wurzel'), pfad(f.app())),
      ];
    },
  },
  {
    id: 'dokument-reiter',
    bezug: { art: 'kandidat', name: 'Dokument-Reiter' },
    adrs: [65],
    befehle: ['dokument.wechseln'],
    tokens: ['flaeche', 'flaeche-2', 'text-2'],
    beispiele: (f) => [beispiel(f.t('katalog.bsp.reiter'), reiter(f.app()))],
  },
  {
    id: 'ansichtsleiste',
    bezug: { art: 'kandidat', name: 'Ansichtsleiste' },
    adrs: [65, 60],
    befehle: [
      'ansicht.einpassen',
      'ansicht.auf-auswahl',
      'ansicht.isolieren',
      'ansicht.projektion',
      'darstellung.wechseln',
    ],
    tokens: ['flaeche', 'linie', 'flaeche-2'],
    beispiele: (f) => [beispiel(f.t('katalog.bsp.ansichtsleiste'), ansichtsleiste(f.app()))],
  },
  {
    id: 'fokus-tastatur',
    bezug: { art: 'kandidat', name: 'Fokus und Tastatur' },
    adrs: [60, 65],
    befehle: ['suche.oeffnen', 'bearbeiten.rueckgaengig', 'fenster.naechste-zone'],
    tokens: ['akzent', 'text-2'],
    beispiele: (f) => {
      const a = f.app();
      const steg = a.find('steg');
      const tasten = befehleAusDatei.filter((b) => b.kuerzel);
      return [
        beispiel(
          f.t('katalog.bsp.fokus'),
          h('div', { class: 'baum' }, steg ? zeile(a, steg, 0, 0) : null),
        ),
        beispiel(
          f.t('katalog.bsp.kuerzel'),
          h(
            'ul',
            { class: 'kuerzel-liste' },
            ...tasten.map((b: Befehl) =>
              h(
                'li',
                { 'data-key': b.id },
                h('span', {}, f.t(b.titel)),
                h('kbd', {}, kuerzelText(b.kuerzel as string, f.sprache)),
              ),
            ),
          ),
        ),
      ];
    },
  },
];

export const BAUSTEIN_IDS = BAUSTEINE.map((b) => b.id);

function uebersicht(wurzel: HTMLElement, t: Uebersetzer, thema: string): void {
  wurzel.replaceChildren(
    h(
      'div',
      { class: 'katalog', 'data-katalog': 'uebersicht' },
      h('h1', {}, t('katalog.titel')),
      h('p', {}, t('katalog.einleitung')),
      h(
        'div',
        { class: 'katalog-raster' },
        ...BAUSTEINE.map((b) =>
          h(
            'a',
            {
              class: 'katalog-karte',
              href: `?katalog=${b.id}&thema=${thema}`,
              'data-katalog-link': b.id,
            },
            h('h2', {}, t(`katalog.baustein.${b.id}`)),
          ),
        ),
      ),
    ),
  );
}

function seite(
  wurzel: HTMLElement,
  b: Baustein,
  t: Uebersetzer,
  sprache: Sprache,
  thema: string,
): void {
  const fabrik = (th: 'hell' | 'dunkel'): Fabrik => ({
    t,
    sprache,
    thema: th,
    app: (f) => {
      const a = new App(t, sprache, 0, befehleAusDatei, standardProjekt());
      a.thema = th;
      f?.(a);
      return a;
    },
  });
  const bild = (th: 'hell' | 'dunkel') =>
    h(
      'div',
      { 'data-bild': th, 'data-thema': th, class: 'bild' },
      h('h3', {}, t(`katalog.${th}`)),
      ...b.beispiele(fabrik(th)),
    );
  const befehle = b.befehle
    .map((id) => befehleAusDatei.find((x) => x.id === id))
    .filter((x): x is Befehl => !!x);
  wurzel.replaceChildren(
    h(
      'div',
      {
        class: 'katalog',
        'data-katalog': 'seite',
        'data-baustein': b.id,
        'data-muster-kandidat': b.bezug.art === 'kandidat' ? b.bezug.name : null,
      },
      h('a', { href: `?katalog&thema=${thema}`, class: 'zurueck' }, t('katalog.zurueck')),
      h('h1', {}, t(`katalog.baustein.${b.id}`)),
      h(
        'section',
        {},
        h('h2', {}, t('katalog.ueberschrift.regel')),
        h(
          'p',
          { 'data-regel': '', 'data-schluessel': `katalog.regel.${b.id}` },
          t(`katalog.regel.${b.id}`),
        ),
      ),
      h(
        'section',
        {},
        h('h2', {}, t('katalog.ueberschrift.bezug')),
        h(
          'p',
          {
            'data-bezug': '',
            'data-art': b.bezug.art,
            'data-name': b.bezug.name,
            'data-adrs': JSON.stringify(b.adrs),
          },
          b.bezug.art === 'muster'
            ? t('katalog.bezug.muster', { name: b.bezug.name })
            : t('katalog.bezug.kandidat', { name: b.bezug.name }),
          ' ',
          b.adrs.map((n) => `ADR-${String(n).padStart(3, '0')}`).join(', '),
        ),
      ),
      h(
        'section',
        {},
        h('h2', {}, t('katalog.ueberschrift.befehle')),
        h('ul', {}, ...befehle.map((x) => h('li', { 'data-befehl-id': x.id }, t(x.titel)))),
      ),
      h(
        'section',
        {},
        h('h2', {}, t('katalog.ueberschrift.tokens')),
        h('p', { 'data-tokens': '' }, b.tokens.join(', ')),
      ),
      h('section', { class: 'katalog-bild' }, bild('hell'), bild('dunkel')),
    ),
  );
}

export async function ladeKatalog(
  wurzel: HTMLElement,
  baustein: string,
  t: Uebersetzer,
  sprache: Sprache,
  thema: 'hell' | 'dunkel',
): Promise<void> {
  const b = BAUSTEINE.find((x) => x.id === baustein);
  if (b) seite(wurzel, b, t, sprache, thema);
  else uebersicht(wurzel, t, thema);
  await document.fonts.ready;
  document.documentElement.dataset.bereit = '1';
}
