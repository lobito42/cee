// Testzustände per Adresse (`?zustand=<name>`): setzen Graph (Schicht 1) und Ansicht (Schicht 3) ohne Eingaben.
import type { App } from './app';
import { leeresProjekt, standardProjekt } from './modell/beispiele';
import { finde, mm } from './modell/element';
import { kontextmenue } from './modell/register';
import { vorschlagWert } from './ki';
import beispielDraht from '../../../format/examples/drahtmodell.json';
import beispielSkizze from '../../../format/examples/skizze.json';
import type { Element } from './modell/element';

/** Testzustände der Wireframe-Basics (ap-50): leeres Teil und das Beispiel aus `format/examples`. */
export const DRAHT_ZUSTAENDE = ['drahtmodell-leer', 'drahtmodell-beispiel'] as const;

/** Testzustände von Skizze und Hochziehen (ap-53). */
export const SKIZZEN_ZUSTAENDE = ['skizze-leer', 'skizze-halter', 'skizze-last'] as const;

const KIND_NAMEN: Record<string, string> = {
  ursprung: 'Ursprung',
  x: 'X-Achse',
  y: 'Y-Achse',
  z: 'Z-Achse',
  xy: 'XY-Ebene',
  yz: 'YZ-Ebene',
  zx: 'ZX-Ebene',
};

/** Kinder eines Koordinatensystems wie beim Anlegen (ap-50): Ursprung, Achsen, Ebenen. */
function mitKindern(f: Element): Element {
  if (f.type !== 'frame' || f.content.length) return f;
  const id = f.id;
  const kind = (
    k: string,
    type: string,
    params: Record<string, unknown>,
    inputs: Record<string, string>,
  ): Element => ({
    id: `${id}-${k}`,
    type,
    inputs,
    params,
    content: [],
    meta: { name: KIND_NAMEN[k] ?? k },
  });
  f.content = [
    kind('ursprung', 'point', { x: mm(0), y: mm(0), z: mm(0) }, { frame: `${id}.frame` }),
    ...['x', 'y', 'z'].map((a) => kind(a, 'axis', {}, { of: `${id}.${a}` })),
    ...['xy', 'yz', 'zx'].map((a) => kind(a, 'plane', {}, { of: `${id}.${a}` })),
  ];
  return f;
}

function skizzenInhalt(name: string): Element[] {
  const leer: Element[] = [
    {
      id: 'K0',
      type: 'frame',
      inputs: {},
      params: {
        x: mm(0),
        y: mm(0),
        z: mm(0),
        rx: { value: 0, unit: 'deg' },
        ry: { value: 0, unit: 'deg' },
        rz: { value: 0, unit: 'deg' },
      },
      content: [],
      meta: { name: 'Koordinatensystem 0' },
    },
  ];
  const roh =
    name === 'skizze-leer'
      ? leer
      : (JSON.parse(JSON.stringify(beispielSkizze.elements)) as Element[]);
  if (name === 'skizze-last') {
    const kinder: Element[] = [];
    for (let i = 0; i < 400; i++) {
      const u = (i % 20) * 12 - 120;
      const v = Math.floor(i / 20) * 12 - 120;
      kinder.push({
        id: `LC${i}`,
        type: 'sketch_circle',
        inputs: {},
        params: { u: mm(u), v: mm(v), d: mm(8) },
        content: [],
        meta: { name: `Kreis ${i}` },
      });
    }
    roh.push({
      id: 'SKL',
      type: 'sketch',
      inputs: { ebene: 'K0.xy' },
      params: {},
      content: kinder,
      meta: { name: 'Last' },
    });
  }
  return roh.map(mitKindern);
}

function drahtProjekt(inhalt: Element[]): Element {
  return {
    id: 'projekt',
    type: 'projekt',
    params: {},
    content: [
      {
        id: 'drahtmodell',
        type: 'teil',
        params: {},
        content: inhalt,
        meta: { name: 'Drahtmodell' },
      },
    ],
    meta: { name: 'Projekt' },
  };
}

export const ZUSTAENDE = [
  'leer',
  'halter',
  'auswahl',
  'mehrfach',
  'zustaende',
  'aktiv',
  'isoliert',
  'kontextmenue',
  'menue',
  'ziehen',
  'ablegen',
  'ablegen-verboten',
  'ausgeblendet',
  'verworfen',
  'rechnet',
  'befund',
  'andere',
  'chat',
  'suche',
  'fokus',
  'perspektive',
  'kanten',
] as const;

export type Zustand = (typeof ZUSTAENDE)[number];

const waehleIds = (app: App, ...ids: string[]) => {
  app.auswahl = ids.map((element_id) => ({ element_id }));
};

function bohrungenKaputt(app: App): void {
  const b = finde(app.dokument(), 'bohrungen');
  if (b) b.params.durchmesser = mm(55);
}

/** Setzt den Zustand; liefert den gezeigten Namen und optional eine Funktion für nach dem ersten Zeichnen. */
export function anwenden(name: string, app: App): { gezeigt: string; danach?: () => void } {
  if ((SKIZZEN_ZUSTAENDE as readonly string[]).includes(name)) {
    const p = drahtProjekt(skizzenInhalt(name));
    const dok = p.content[0] as Element;
    dok.id = 'skizze';
    dok.meta.name = 'Skizze';
    app.projekt = p;
    app.dok = 'skizze';
    app.draht.einpassen = name !== 'skizze-leer';
    return { gezeigt: name };
  }
  if ((DRAHT_ZUSTAENDE as readonly string[]).includes(name)) {
    const inhalt =
      name === 'drahtmodell-beispiel'
        ? (JSON.parse(JSON.stringify(beispielDraht.elements)) as Element[])
        : [];
    app.projekt = drahtProjekt(inhalt);
    app.dok = 'drahtmodell';
    app.draht.einpassen = inhalt.length > 0;
    return { gezeigt: name };
  }
  const bekannt = (ZUSTAENDE as readonly string[]).includes(name);
  if (!bekannt) {
    app.projekt = leeresProjekt();
    app.dok = 'teil-1';
    app.unbekannterZustand = true;
    return { gezeigt: 'leer' };
  }
  app.projekt = name === 'leer' ? leeresProjekt() : standardProjekt();
  app.dok = app.projekt.content[0]?.id ?? '';
  const z = name as Zustand;
  let danach: (() => void) | undefined;
  switch (z) {
    case 'leer':
    case 'halter':
      break;
    case 'auswahl':
      waehleIds(app, 'grundplatte');
      break;
    case 'mehrfach':
      waehleIds(app, 'grundplatte', 'steg');
      break;
    case 'zustaende':
      bohrungenKaputt(app);
      waehleIds(app, 'grundplatte');
      app.hover = 'steg';
      app.ausgeblendet.add('skizze');
      app.andere = { aktiv: true, dok: 'sensorgehaeuse', element: 'deckel' };
      break;
    case 'aktiv':
      app.dok = 'sensorgehaeuse';
      app.aktiv = 'gehaeuse';
      break;
    case 'isoliert':
      app.isoliert = ['steg'];
      waehleIds(app, 'steg');
      break;
    case 'kontextmenue':
      waehleIds(app, 'grundplatte');
      danach = () => {
        const box = app.szene?.projiziere([0, 0, 8]);
        app.kontextOeffnen?.(box?.x ?? 600, box?.y ?? 400);
      };
      break;
    case 'menue':
      app.menue = 'dropdown:Bearbeiten';
      break;
    case 'ziehen':
      waehleIds(app, 'grundplatte');
      danach = () => {
        const box = app.huelle('grundplatte');
        const p = box && app.szene ? app.szene.projiziere([0, 0, box.max[2]]) : { x: 600, y: 300 };
        app.griff = {
          id: 'grundplatte',
          name: 'dicke',
          start: 8,
          wert: 11,
          eingabe: '',
          zeiger: { x: p.x, y: p.y - 60 },
          sichtbarBis: null,
          aktiv: false,
        };
        app.vorschau = { id: 'grundplatte', name: 'dicke', wert: mm(11) };
        app.rendernSofort();
      };
      break;
    case 'ablegen':
    case 'ablegen-verboten': {
      app.dok = 'sensorgehaeuse';
      const verboten = z === 'ablegen-verboten';
      danach = () => {
        const ziel = verboten ? 'gehaeuse' : 'baugruppe-1';
        const zeile = document.querySelector<HTMLElement>(`[role="treeitem"][data-id="${ziel}"]`);
        const r = zeile?.getBoundingClientRect();
        const id = verboten ? 'baugruppe-1' : 'deckel';
        const pruefung = app.ablegenPruefen(id, ziel);
        app.dnd = {
          id,
          x: (r?.left ?? 100) + 60,
          y: (r?.top ?? 100) + (r?.height ?? 24) / 2,
          ziel,
          erlaubt: pruefung.erlaubt,
          grund: pruefung.grund,
        };
        if (pruefung.grund) app.meldung(pruefung.grund);
        app.rendernSofort();
      };
      break;
    }
    case 'ausgeblendet':
      app.ausgeblendet.add('steg');
      break;
    case 'verworfen': {
      const b = finde(app.dokument(), 'bohrungen');
      if (b) b.meta.verworfen = true;
      app.verworfenesZeigen = true;
      break;
    }
    case 'rechnet':
      app.status.set('grundplatte', 'rechnet');
      break;
    case 'befund':
      bohrungenKaputt(app);
      app.zonen.panel = true;
      break;
    case 'andere':
      app.andere = { aktiv: true, dok: 'halter', element: 'steg' };
      break;
    case 'chat': {
      waehleIds(app, 'steg');
      const steg = finde(app.dokument(), 'steg');
      app.chat.nachrichten = [
        { von: 'person', text: '', schluessel: 'chat.beispiel.frage' },
        { von: 'ki', text: '', schluessel: 'chat.antwort.vorschlag' },
      ];
      if (steg) app.chat.vorschlag = vorschlagWert(app, steg, 'hoehe', 40);
      break;
    }
    case 'suche':
      app.suche = { offen: true, text: 'ver', index: 0, alle: false, fokussiert: false };
      break;
    case 'fokus':
      danach = () => {
        const zeile = document.querySelector<HTMLElement>('[role="treeitem"][data-id="steg"]');
        if (zeile) {
          for (const x of document.querySelectorAll<HTMLElement>('[role="treeitem"]'))
            x.tabIndex = -1;
          zeile.tabIndex = 0;
          zeile.setAttribute('data-fokus', '');
          zeile.focus();
        }
      };
      break;
    case 'perspektive':
      app.projektionsart = 'perspektivisch';
      break;
    case 'kanten':
      app.darstellung = 'kanten';
      break;
  }
  void kontextmenue;
  return { gezeigt: z, danach };
}
