// Eigenschaften (ADR-065): Gruppen › Felder der Auswahl; ohne Auswahl das aktive Element, bei mehreren nur Gemeinsames.
import type { App } from '../app';
import { istVerworfen, pfadZu, type Element } from '../modell/element';
import { abmessungenText, groesseText, masseText, volumenText } from '../ui/format';
import { ergebnisVon } from '../geometrie/teil';
import { h } from '../ui/dom';

export interface Feld {
  key: string;
  param: string | null;
  text: string;
  editierbar: boolean;
}

export interface Gruppe {
  key: string;
  felder: Feld[];
}

const MASSE_PARAMS: Record<string, string[]> = {
  extrusion: ['laenge', 'breite', 'dicke', 'hoehe', 'eckradius'],
  schale: ['laenge', 'breite', 'hoehe', 'wand'],
  skizze: ['laenge', 'breite', 'eckradius'],
  bohrung: ['durchmesser'],
};

function materialVon(app: App, e: Element): string {
  const pfad = pfadZu(app.dokument(), e.id);
  const teil = [...pfad].reverse().find((x) => typeof x.params.material === 'string');
  return String(e.params.material ?? teil?.params.material ?? 'PLA');
}

/** Gruppen und Felder eines einzelnen Elements. */
export function gruppenVon(app: App, e: Element): Gruppe[] {
  const sp = app.sprache;
  if (e.type === 'teil' || e.type === 'baugruppe' || e.type === 'projekt') {
    const erg = ergebnisVon(e.id === app.dokument().id ? app.angezeigtesDokument() : e);
    const gruppen: Gruppe[] = [
      {
        key: 'masse',
        felder: [
          {
            key: 'abmessungen',
            param: null,
            text: abmessungenText(erg.abmessungen_mm, sp),
            editierbar: false,
          },
        ],
      },
    ];
    if (e.type === 'teil' || erg.volumen_mm3 > 0) {
      gruppen.push({
        key: 'material',
        felder: [{ key: 'material', param: null, text: materialVon(app, e), editierbar: false }],
      });
      gruppen.push({
        key: 'ergebnis',
        felder: [
          {
            key: 'volumen',
            param: null,
            text: volumenText(erg.volumen_mm3, sp),
            editierbar: false,
          },
          { key: 'masse-wert', param: null, text: masseText(erg.masse_g, sp), editierbar: false },
        ],
      });
    }
    return gruppen;
  }
  if (e.type === 'view') {
    return [
      {
        key: 'ansicht',
        felder: [
          {
            key: 'projektion',
            param: null,
            text: app.t(`projektion.${String(e.params.projektion)}`),
            editierbar: false,
          },
          {
            key: 'darstellung',
            param: null,
            text: app.t(`darstellung.${String(e.params.darstellung)}`),
            editierbar: false,
          },
        ],
      },
    ];
  }
  const felder: Feld[] = [];
  for (const p of MASSE_PARAMS[e.type] ?? []) {
    if (e.params[p] === undefined) continue;
    felder.push({ key: p, param: p, text: groesseText(e.params[p], sp), editierbar: true });
  }
  return [
    { key: 'masse', felder },
    {
      key: 'material',
      felder: [{ key: 'material', param: null, text: materialVon(app, e), editierbar: false }],
    },
  ];
}

/** Bei mehreren Elementen: nur gemeinsame Felder, Unterschiede als „gemischt“. */
export function gemeinsameFelder(
  app: App,
  elemente: Element[],
): { gruppen: Gruppe[]; gemischt: Set<string> } {
  const je = elemente.map((e) => gruppenVon(app, e));
  const gemischt = new Set<string>();
  const ersteGruppen = je[0] ?? [];
  const gruppen: Gruppe[] = [];
  for (const g of ersteGruppen) {
    const felder: Feld[] = [];
    for (const f of g.felder) {
      const alle = je.map((gruppen2) =>
        gruppen2.flatMap((x) => x.felder).find((x) => x.key === f.key),
      );
      if (alle.some((x) => !x)) continue;
      const gleich = alle.every((x) => x?.text === f.text);
      if (!gleich) gemischt.add(f.key);
      felder.push({ ...f, text: gleich ? f.text : app.t('eigenschaften.gemischt') });
    }
    if (felder.length) gruppen.push({ key: g.key, felder });
  }
  return { gruppen, gemischt };
}

export function feldElement(app: App, f: Feld, ids: string[], gemischt: boolean): HTMLElement {
  const befund = app.feldBefund?.feld === f.key ? app.feldBefund : null;
  return h(
    'div',
    { class: 'feld', 'data-feld': f.key, 'data-key': f.key },
    h('label', {}, app.t(`feld.${f.key}`)),
    f.editierbar
      ? h('input', {
          type: 'text',
          class: 'wertfeld',
          'data-muster': 'Wertfeld',
          'data-feld-eingabe': f.key,
          'data-param': f.param,
          'data-elemente': ids.join(','),
          'data-gemischt': gemischt ? 'true' : null,
          'aria-label': app.t(`feld.${f.key}`),
          value: f.text,
          autocomplete: 'off',
        })
      : h('span', { class: 'wert', 'data-wert-text': '' }, f.text),
    befund
      ? h(
          'div',
          { class: 'befund am-feld', 'data-muster': 'Befund', 'data-schwere': 'warnung' },
          app.t(befund.schluessel),
        )
      : null,
  );
}

export function baueEigenschaften(app: App): HTMLElement[] {
  const gewaehlt = app.gewaehlteElemente();
  const kopf = (titel: HTMLElement | string) =>
    h(
      'div',
      { class: 'zonenkopf', 'data-key': 'kopf' },
      typeof titel === 'string' ? h('h2', {}, titel) : titel,
    );
  if (gewaehlt.length > 1) {
    const { gruppen, gemischt } = gemeinsameFelder(app, gewaehlt);
    const ids = gewaehlt.map((e) => e.id);
    return [
      kopf(app.t('eigenschaften.n-elemente', { n: gewaehlt.length })),
      ...gruppen.map((g) => gruppeElement(app, g, ids, gemischt)),
    ];
  }
  const e = gewaehlt[0] ?? (app.aktiv ? app.find(app.aktiv) : undefined) ?? app.dokument();
  const umbenennen = app.umbenennen?.id === e.id;
  const titel = umbenennen
    ? h('input', {
        type: 'text',
        class: 'titel-eingabe',
        'data-umbenennen': e.id,
        'data-editiert': '',
        value: e.meta.name,
        'aria-label': app.t('befehl.element.umbenennen'),
      })
    : h(
        'h2',
        { 'data-name-feld': e.id, title: app.t('eigenschaften.umbenennen-hinweis') },
        e.meta.name,
      );
  return [
    kopf(titel),
    istVerworfen(e)
      ? h('div', { class: 'hinweis', 'data-key': 'verworfen' }, app.t('struktur.verworfen'))
      : null,
    ...gruppenVon(app, e).map((g) => gruppeElement(app, g, [e.id], new Set())),
  ].filter((x): x is HTMLElement => !!x);
}

function gruppeElement(app: App, g: Gruppe, ids: string[], gemischt: Set<string>): HTMLElement {
  return h(
    'section',
    { class: 'gruppe', 'data-gruppe': g.key, 'data-key': `g-${g.key}` },
    h('h3', {}, app.t(`gruppe.${g.key}`)),
    ...g.felder.map((f) => feldElement(app, f, ids, gemischt.has(f.key))),
  );
}
