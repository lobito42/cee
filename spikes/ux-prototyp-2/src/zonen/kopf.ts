// Kopfzeile: Pfad, Arbeitsbereich-Reiter, ein Feld „Suchen oder fragen“, Rückgängig mit Kürzel (design.md).
import type { App, Zone } from '../app';
import de from '../i18n/de.json';
import en from '../i18n/en.json';
import { kuerzelText } from '../i18n';
import { istSatz } from '../ki/absicht';
import { alleMitSkizzen } from '../modell/projekt';
import { befehle } from '../modell/register';
import { abgleichen, h, symbol, SYMBOLE } from './dom';

export interface PfadGlied {
  text: string;
  befehl: string;
  parameter: Record<string, unknown>;
  aktuell: boolean;
}

/** Die Glieder des Pfads: Stand › Teil [› Schritt › Skizze]. */
export function pfadGlieder(app: App): PfadGlied[] {
  const p = app.angezeigt();
  const teil = app.aktivesTeil();
  const glieder: PfadGlied[] = [
    { text: app.entwurfsName(), befehl: 'ansicht.ergebnis', parameter: {}, aktuell: false },
    {
      text: teil?.meta.name ?? p.meta.name,
      befehl: app.ui.ort.art === 'skizze' ? 'ort.fertig' : 'auswahl.aufheben',
      parameter: {},
      aktuell: app.ui.ort.art === 'teil',
    },
  ];
  if (app.ui.ort.art === 'skizze' && app.ui.ort.schritt) {
    const schritt = alleMitSkizzen(p).find((e) => e.id === app.ui.ort.schritt);
    if (schritt && schritt.type !== 'skizze') {
      glieder.push({
        text: schritt.meta.name,
        befehl: 'auswahl.setzen',
        parameter: { elemente: [schritt.id] },
        aktuell: false,
      });
    }
    glieder.push({
      text: app.t('pfad.skizze'),
      befehl: 'auswahl.setzen',
      parameter: { elemente: schritt ? [schritt.id] : [] },
      aktuell: true,
    });
  }
  return glieder;
}

interface Ergebnis {
  art: 'befehl' | 'element' | 'ki';
  id: string;
  text: string;
  kuerzel?: string;
}

type Baum = { [k: string]: string | Baum };
function suchen(baum: Baum, schluessel: string): string | undefined {
  let k: string | Baum | undefined = baum;
  for (const t of schluessel.split('.')) {
    if (typeof k !== 'object') return undefined;
    k = k[t];
  }
  return typeof k === 'string' ? k : undefined;
}

const norm = (s: string) => s.toLowerCase().normalize('NFC');

export class KopfZone implements Zone {
  private readonly pfad = h('nav', { 'data-muster-kandidat': 'Pfad', 'aria-label': 'Pfad' });
  private readonly reiter = h('div', { 'data-muster': 'Arbeitsbereiche', role: 'tablist' });
  private readonly eingabe: HTMLInputElement;
  private readonly liste = h('div', {
    'data-suche': '',
    'data-overlay': 'suchliste',
    'data-muster': 'Suche',
    hidden: true,
  });
  private readonly rueckgaengig: HTMLButtonElement;
  private readonly wiederholen: HTMLButtonElement;
  private ergebnisse: Ergebnis[] = [];
  private zuletztOffen = false;

  constructor(
    private readonly app: App,
    readonly el: HTMLElement,
  ) {
    const t = app.t;
    const kuerzel = (id: string) =>
      kuerzelText(befehle.find((b) => b.id === id)?.kuerzel ?? '', app.sprache);
    this.eingabe = h('input', {
      type: 'text',
      placeholder: t('app.suche'),
      'aria-label': t('app.suche'),
      'data-befehl': 'suche.oeffnen',
      autocomplete: 'off',
      spellcheck: false,
    });
    this.eingabe.addEventListener('focus', () => {
      if (!app.ui.suche.offen) app.starte('suche.oeffnen');
    });
    this.eingabe.addEventListener('input', () => {
      app.ui.suche.text = this.eingabe.value;
      app.ui.suche.index = 0;
      this.listeAktualisieren();
    });
    this.eingabe.addEventListener('keydown', (e) => this.taste(e));
    this.rueckgaengig = h(
      'button',
      { type: 'button', 'data-befehl': 'bearbeiten.rueckgaengig' },
      symbol([...SYMBOLE.rueckgaengig]),
      h('span', {}, t('befehl.bearbeiten.rueckgaengig')),
      h('kbd', {}, kuerzel('bearbeiten.rueckgaengig')),
    );
    this.wiederholen = h(
      'button',
      {
        type: 'button',
        'data-befehl': 'bearbeiten.wiederholen',
        'aria-label': t('befehl.bearbeiten.wiederholen'),
        title: t('befehl.bearbeiten.wiederholen'),
      },
      symbol([...SYMBOLE.wiederholen]),
      h('kbd', {}, kuerzel('bearbeiten.wiederholen')),
    );
    this.rueckgaengig.addEventListener('click', () => app.starte('bearbeiten.rueckgaengig'));
    this.wiederholen.addEventListener('click', () => app.starte('bearbeiten.wiederholen'));
    const suche = h(
      'label',
      { class: 'suche' },
      symbol([...SYMBOLE.suche]),
      this.eingabe,
      h('kbd', {}, kuerzel('suche.oeffnen')),
    );
    el.append(this.pfad, this.reiter, suche, this.rueckgaengig, this.wiederholen, this.liste);
    this.liste.addEventListener('mousedown', (e) => e.preventDefault());
    document.addEventListener('mousedown', (e) => {
      if (app.ui.suche.offen && !el.contains(e.target as Node)) this.schliessen();
    });
    this.liste.addEventListener('click', (e) => {
      const ziel = (e.target as HTMLElement).closest<HTMLElement>('[data-facette]');
      if (ziel) {
        app.ui.suche.facette = ziel.dataset.facette as 'alle' | 'befehle' | 'elemente';
        this.listeAktualisieren();
        return;
      }
      const option = (e.target as HTMLElement).closest<HTMLElement>('[role="option"]');
      if (option) this.waehlen(Number(option.dataset.index));
    });
  }

  private taste(e: KeyboardEvent): void {
    const s = this.app.ui.suche;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n = this.ergebnisse.length;
      if (n) s.index = (s.index + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
      this.listeAktualisieren();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.waehlen(s.index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this.schliessen();
    }
  }

  private schliessen(): void {
    const s = this.app.ui.suche;
    s.offen = false;
    s.text = '';
    s.index = 0;
    this.eingabe.value = '';
    this.eingabe.blur();
    this.app.aktualisieren();
  }

  private waehlen(index: number): void {
    const r = this.ergebnisse[index];
    if (!r) return;
    const text = this.app.ui.suche.text;
    this.schliessen();
    if (r.art === 'befehl') this.app.starte(r.id);
    else if (r.art === 'element') this.app.waehlen([r.id]);
    else this.app.starte('ki.fragen', { absicht: text });
  }

  // --- Suche ----------------------------------------------------------------------------------------

  private treffer(): { befehle: Ergebnis[]; elemente: Ergebnis[]; ki: Ergebnis | null } {
    const app = this.app;
    const q = norm(app.ui.suche.text.trim());
    const bewerte = (kandidaten: string[]): number => {
      let beste = Infinity;
      kandidaten.forEach((roh, i) => {
        const k = norm(roh);
        if (!k) return;
        const stufe = i === 0 ? 0 : 10;
        if (!q) beste = Math.min(beste, 20);
        else if (k === q) beste = Math.min(beste, stufe);
        else if (k.startsWith(q)) beste = Math.min(beste, stufe + 1);
        else if (k.split(/[\s-]+/).some((w) => w.startsWith(q))) beste = Math.min(beste, stufe + 2);
        else if (k.includes(q)) beste = Math.min(beste, stufe + 3);
      });
      return beste;
    };
    const kandidaten = befehle.map((b, i) => {
      const titel = [suchen(de as Baum, b.titel) ?? '', suchen(en as Baum, b.titel) ?? ''];
      const synonyme = [
        suchen(de as Baum, `synonym.${b.id}`) ?? '',
        suchen(en as Baum, `synonym.${b.id}`) ?? '',
      ]
        .join(' ')
        .split(/\s*,\s*/);
      const punkte = bewerte([titel[0] as string, titel[1] as string, ...synonyme, b.id]);
      return { b, i, punkte, titel: app.t(b.titel) };
    });
    const bef: Ergebnis[] = kandidaten
      .filter((k) => k.punkte < Infinity)
      .sort((a, b) => a.punkte - b.punkte || a.i - b.i)
      .slice(0, q ? 8 : 12)
      .map((k) => ({
        art: 'befehl',
        id: k.b.id,
        text: k.titel,
        kuerzel: k.b.kuerzel ? kuerzelText(k.b.kuerzel, app.sprache) : undefined,
      }));
    const elemente: Ergebnis[] = q
      ? alleMitSkizzen(app.angezeigt())
          .filter((e) => !['ebene', 'skizze'].includes(e.type))
          .map((e) => ({ e, punkte: bewerte([e.meta.name]) }))
          .filter((x) => x.punkte < Infinity)
          .sort((a, b) => a.punkte - b.punkte)
          .slice(0, 8)
          .map((x) => ({ art: 'element' as const, id: x.e.id, text: x.e.meta.name }))
      : [];
    const ki: Ergebnis | null =
      q && !bef.length && istSatz(app.ui.suche.text)
        ? {
            art: 'ki',
            id: 'ki.fragen',
            text: `${app.t('suche.ki-fragen')} ${app.ui.suche.text.trim()}`,
          }
        : null;
    return { befehle: bef, elemente, ki };
  }

  private listeAktualisieren(): void {
    const app = this.app;
    const s = app.ui.suche;
    this.liste.hidden = !s.offen;
    if (!s.offen) return;
    const t = this.treffer();
    const gruppen: Ergebnis[] = [];
    if (t.ki) gruppen.push(t.ki);
    if (s.facette !== 'elemente') gruppen.push(...t.befehle);
    if (s.facette !== 'befehle') gruppen.push(...t.elemente);
    this.ergebnisse = gruppen;
    if (s.index >= gruppen.length) s.index = Math.max(0, gruppen.length - 1);
    let n = 0;
    const option = (r: Ergebnis): HTMLElement => {
      const i = n++;
      return h(
        'button',
        {
          type: 'button',
          role: 'option',
          tabindex: -1,
          'data-index': i,
          'data-befehl': r.art === 'element' ? 'auswahl.setzen' : r.id,
          'data-element': r.art === 'element' ? r.id : null,
          'aria-selected': i === s.index ? 'true' : 'false',
        },
        h('span', { class: 'titel' }, r.text),
        r.kuerzel ? h('kbd', {}, r.kuerzel) : null,
      );
    };
    const gruppe = (name: string, titelKey: string, liste: Ergebnis[]) =>
      liste.length
        ? h('div', { 'data-gruppe': name }, h('h4', {}, app.t(titelKey)), ...liste.map(option))
        : null;
    const chips = h(
      'div',
      { class: 'chips', 'data-muster': 'Auswahlfeld' },
      ...(['alle', 'befehle', 'elemente'] as const).map((f) =>
        h(
          'button',
          {
            type: 'button',
            'data-befehl': 'suche.oeffnen',
            'data-facette': f,
            'aria-pressed': s.facette === f ? 'true' : 'false',
          },
          app.t(`suche.facette.${f}`),
        ),
      ),
    );
    this.liste.replaceChildren(
      chips,
      ...(
        [
          t.ki ? h('div', { 'data-gruppe': 'ki' }, option(t.ki)) : null,
          s.facette !== 'elemente' ? gruppe('befehle', 'suche.gruppe.befehle', t.befehle) : null,
          s.facette !== 'befehle' ? gruppe('elemente', 'suche.gruppe.elemente', t.elemente) : null,
          !gruppen.length ? h('p', { class: 'leer' }, app.t('suche.keine-treffer')) : null,
        ] as (HTMLElement | null)[]
      ).filter((x): x is HTMLElement => !!x),
    );
  }

  rendern(): void {
    const app = this.app;
    const ui = app.ui;
    abgleichen(this.pfad, JSON.stringify(pfadGlieder(app)), () => {
      const glieder = pfadGlieder(app);
      return glieder.map((g, i) => {
        const knopf = h(
          'button',
          {
            type: 'button',
            'data-befehl': g.befehl,
            'data-glied': i,
            'aria-current': g.aktuell ? 'page' : null,
          },
          g.text,
        );
        knopf.addEventListener('click', () => {
          if (i === 0 && ui.inspektor === 'entwuerfe') {
            ui.inspektor = 'auswahl';
            ui.vergleich = false;
            app.aktualisieren();
          } else app.starte(g.befehl, g.parameter);
        });
        return knopf;
      });
    });
    abgleichen(this.reiter, JSON.stringify([ui.bereich, app.sprache]), () =>
      [
        ['modell', 'app.arbeitsbereich'],
        ['simulation', 'paket.simulation.reiter'],
      ].map(([id, key]) => {
        const b = h(
          'button',
          {
            type: 'button',
            role: 'tab',
            'data-befehl': 'arbeitsbereich.wechseln',
            'data-bereich': id,
            'aria-selected': ui.bereich === id ? 'true' : 'false',
          },
          app.t(key as string),
        );
        b.addEventListener('click', () => app.starte('arbeitsbereich.wechseln', { bereich: id }));
        return b;
      }),
    );
    this.rueckgaengig.disabled = false;
    if (ui.suche.offen && !this.zuletztOffen) {
      this.eingabe.focus();
      this.eingabe.select();
    }
    this.zuletztOffen = ui.suche.offen;
    if (this.eingabe.value !== ui.suche.text && document.activeElement !== this.eingabe)
      this.eingabe.value = ui.suche.text;
    this.listeAktualisieren();
  }
}
