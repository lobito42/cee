// Suche (Cmd/Strg+K): Befehle und Elemente in Gruppen, Facetten als Chips, Kürzel neben jedem Befehl.
// Kein Dialog: die Liste hängt als Tabelle unter dem Suchfeld (Muster Suche, Tabelle).
import { befehle, type Befehl } from '../modell/register';
import { alle, type Element, type Projekt } from '../modell/projekt';

type T = (schluessel: string) => string;

export interface SucheAnbindung {
  feld: HTMLInputElement;
  t: T;
  projekt: () => Projekt;
  /** Löst einen Befehl aus (Werkzeugwechsel, Protokoll, Wirkung). */
  ausloesen: (id: string, parameter?: Record<string, unknown>) => void;
  waehlen: (ids: string[]) => void;
}

interface Eintrag {
  gruppe: 'befehle' | 'elemente';
  befehl: string;
  parameter?: Record<string, unknown>;
  text: string;
  kuerzel?: string;
  element?: string;
}

const normal = (s: string): string =>
  s.toLowerCase().replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Berechnungszustand eines Elements (ADR-050), im Prototyp aus dem Radius abgeleitet. */
export function berechnung(e: Element): 'aktuell' | 'fehlerhaft' {
  const r = e.params['radius'] as { value?: number } | undefined;
  return e.type === 'fillet' && (r?.value ?? 0) > 24 ? 'fehlerhaft' : 'aktuell';
}

function kuerzelText(k: string, t: T): string {
  const mac = /Mac|iPad/.test(navigator.platform);
  return k
    .split('+')
    .map((teil) => {
      if (teil === 'Mod') return mac ? '⌘' : t('taste.mod');
      if (teil === 'Shift') return mac ? '⇧' : t('taste.shift');
      return teil;
    })
    .join('+');
}

/** Rang eines Befehls zur Eingabe; kleiner ist besser, `undefined` = kein Treffer. */
function rang(b: Befehl, frage: string, t: T): number | undefined {
  const titel = normal(t(b.titel));
  const syn = t(`synonym.${b.id}`);
  const synonyme = syn.startsWith('synonym.') ? '' : normal(syn);
  if (titel === frage) return 0;
  if (titel.startsWith(frage)) return 1;
  if (titel.includes(frage)) return 2;
  if (synonyme.split(/\s+/).some((w) => w.startsWith(frage))) return 3;
  const woerter = frage.split(/\s+/).filter(Boolean);
  const heu = `${titel} ${synonyme}`;
  return woerter.length > 0 && woerter.every((w) => heu.includes(w)) ? 4 : undefined;
}

export function sucheAufbauen(a: SucheAnbindung): { oeffnen: () => void } {
  const { feld, t } = a;
  const liste = document.createElement('div');
  liste.dataset.muster = 'Tabelle';
  liste.dataset.suche = '';
  liste.className = 'suchliste';
  liste.hidden = true;
  feld.insertAdjacentElement('afterend', liste);
  feld.setAttribute('role', 'combobox');
  feld.setAttribute('aria-expanded', 'false');

  let eintraege: Eintrag[] = [];
  let aktiv = 0;
  let typFilter: string | undefined;
  let zustandFilter: string | undefined;

  function treffer(): Eintrag[] {
    const frage = normal(feld.value.trim());
    const cmds: Eintrag[] = [];
    const ordnung = befehle
      .map((b, i) => ({ b, i, r: frage ? rang(b, frage, t) : 5 }))
      .filter((x): x is { b: Befehl; i: number; r: number } => x.r !== undefined)
      .sort((x, y) => x.r - y.r || x.i - y.i);
    for (const { b } of ordnung) {
      cmds.push({
        gruppe: 'befehle',
        befehl: b.id,
        text: t(b.titel),
        ...(b.kuerzel ? { kuerzel: kuerzelText(b.kuerzel, t) } : {}),
      });
    }
    // Ein Satz ohne Befehlstreffer wird als Absicht an die KI angeboten.
    const woerter = feld.value.trim().split(/\s+/).filter(Boolean);
    if (woerter.length > 3 && cmds.length === 0) {
      cmds.unshift({
        gruppe: 'befehle',
        befehl: 'ki.fragen',
        parameter: { absicht: feld.value.trim() },
        text: `${t('befehl.ki.fragen')}: ${feld.value.trim()}`,
      });
    }
    const els: Eintrag[] = frage
      ? alle(a.projekt())
          .filter((e) => normal(e.meta.name).includes(frage))
          .filter((e) => !typFilter || e.type === typFilter)
          .filter((e) => !zustandFilter || berechnung(e) === zustandFilter)
          .map((e) => ({
            gruppe: 'elemente' as const,
            befehl: 'auswahl.setzen',
            text: e.meta.name,
            element: e.id,
          }))
      : [];
    return [...cmds, ...els];
  }

  function chip(text: string, an: boolean, schalten: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.befehl = 'suche.oeffnen';
    b.setAttribute('aria-pressed', String(an));
    b.textContent = text;
    b.addEventListener('click', () => {
      schalten();
      zeichnen();
      feld.focus();
    });
    return b;
  }

  function zeichnen(): void {
    eintraege = treffer();
    aktiv = Math.min(aktiv, Math.max(eintraege.length - 1, 0));
    liste.replaceChildren();

    const frage = normal(feld.value.trim());
    if (frage) {
      const treffer_els = alle(a.projekt()).filter((e) => normal(e.meta.name).includes(frage));
      const typen = [...new Set(treffer_els.map((e) => e.type))];
      const chips = document.createElement('div');
      chips.className = 'chips';
      for (const typ of typen) {
        chips.append(
          chip(typ, typFilter === typ, () => {
            typFilter = typFilter === typ ? undefined : typ;
          }),
        );
      }
      for (const z of ['aktuell', 'fehlerhaft']) {
        if (treffer_els.some((e) => berechnung(e) === z)) {
          chips.append(
            chip(t(`suche.berechnung.${z}`), zustandFilter === z, () => {
              zustandFilter = zustandFilter === z ? undefined : z;
            }),
          );
        }
      }
      if (chips.children.length) liste.append(chips);
    }

    for (const gruppe of ['befehle', 'elemente'] as const) {
      const zeilen = eintraege.filter((e) => e.gruppe === gruppe);
      if (!zeilen.length) continue;
      const g = document.createElement('div');
      g.dataset.gruppe = gruppe;
      const kopf = document.createElement('h4');
      kopf.textContent = t(`suche.gruppe.${gruppe}`);
      g.append(kopf);
      for (const z of zeilen) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'option');
        b.dataset.befehl = z.befehl;
        if (z.element) b.dataset.element = z.element;
        b.setAttribute('aria-selected', String(eintraege.indexOf(z) === aktiv));
        const titel = document.createElement('span');
        titel.textContent = z.text;
        b.append(titel);
        if (z.kuerzel) {
          const k = document.createElement('kbd');
          k.dataset.kuerzel = '';
          k.textContent = z.kuerzel;
          b.append(k);
        }
        b.addEventListener('click', () => waehlenEintrag(z));
        g.append(b);
      }
      liste.append(g);
    }
    if (!eintraege.length) {
      const leer = document.createElement('p');
      leer.textContent = t('suche.kein-treffer');
      liste.append(leer);
    }
  }

  function oeffnen(): void {
    liste.hidden = false;
    feld.setAttribute('aria-expanded', 'true');
    zeichnen();
  }

  function schliessen(): void {
    liste.hidden = true;
    feld.setAttribute('aria-expanded', 'false');
    typFilter = undefined;
    zustandFilter = undefined;
  }

  function waehlenEintrag(z: Eintrag): void {
    feld.value = '';
    aktiv = 0;
    schliessen();
    if (z.element) a.waehlen([z.element]);
    else a.ausloesen(z.befehl, z.parameter);
  }

  feld.addEventListener('focus', oeffnen);
  feld.addEventListener('input', () => {
    aktiv = 0;
    oeffnen();
  });
  feld.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      feld.value = '';
      schliessen();
      feld.blur();
    } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      const n = eintraege.length;
      if (n) aktiv = (aktiv + (ev.key === 'ArrowDown' ? 1 : n - 1)) % n;
      zeichnen();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      const z = eintraege[aktiv];
      if (z) waehlenEintrag(z);
    }
  });
  document.addEventListener('pointerdown', (ev) => {
    if (ev.target instanceof Node && !liste.contains(ev.target) && ev.target !== feld) schliessen();
  });
  document.addEventListener('keydown', (ev) => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
      ev.preventDefault();
      feld.focus();
      feld.select();
      oeffnen();
    }
  });

  return { oeffnen };
}
