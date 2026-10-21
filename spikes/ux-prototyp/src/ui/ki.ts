// Simulierter KI-Ablauf (Leitbild, Variante A): Absicht äußern, Fortschritt, Entscheidungskarte, Nachjustieren.
// Keine Netzanfrage, kein Modell: drei vorbereitete Absichten, erkannt über Schlüsselwörter und eine Zahl mit Einheit.
// Die KI nutzt nur Befehle aus dem Register (quelle: ki).
import { alle, element, finde, mm, type Element } from '../modell/projekt';
import type { Sitzung } from '../modell/register';
import { anzeigen, lesen, type Groesse } from '../wert/wertfeld';
import { normal } from './suche';
import { wertfeldBauen } from './skizzenablauf';
import { KANTEN, zielTeil } from './verrundung';

type T = (schluessel: string) => string;
type Mass = { l: number; b: number; h: number };

const DAUER_MS = 1500;
const SCHRITTE = ['ki.schritt.lesen', 'ki.schritt.verstehen', 'ki.schritt.vorbereiten'];
const BEISPIELE = ['ki.beispiel.1', 'ki.beispiel.2', 'ki.beispiel.3'];

interface Schritt {
  befehl: string;
  parameter: Record<string, unknown>;
  zeile: string;
}

interface Vorschlag {
  art: 'schale' | 'verrunden' | 'wert';
  befehl: string;
  titel: string;
  wert: string;
  vorher: string;
  nachher: string;
  schritte: Schritt[];
  /** Wertfeld für „Letzte Aktion nachjustieren“ nach dem Übernehmen. */
  nach: { element: string; name: string; beschriftung: string; start: Groesse };
  geist: Mass | undefined;
}

const wortAus = (satz: string, woerter: string[]): boolean => woerter.some((w) => satz.includes(w));

/** Zahl mit Einheit im Satz, in mm. */
function groesseAusSatz(satz: string): Groesse | undefined {
  const m = /(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/.exec(satz);
  if (!m?.[1] || !m[2]) return undefined;
  const r = lesen(`${m[1].replace(',', '.')} ${m[2]}`);
  return r.ok ? r.groesse : undefined;
}

const inMm = (g: Groesse): number =>
  g.value * { mm: 1, cm: 10, m: 1000 }[g.unit as 'mm' | 'cm' | 'm'];
const zeileMm = (zahl: number): string => `${zahl} mm`;

function masse(teil: Element): Mass {
  const sk = teil.content.find((k) => k.type === 'sketch');
  const ex = teil.content.find((k) => k.type === 'extrusion');
  const wert = (k: Element | undefined, n: string, vorgabe: number): number => {
    const g = k?.params[n] as Groesse | undefined;
    return g ? inMm(g) : vorgabe;
  };
  return { l: wert(sk, 'laenge', 80), b: wert(sk, 'breite', 50), h: wert(ex, 'tiefe', 5) };
}

/** Erkennt eine der drei vorbereiteten Absichten; `undefined` bei unbekanntem Satz. */
export function absichtErkennen(absicht: string, teil: Element, t: T): Vorschlag | undefined {
  const satz = normal(absicht);
  const zahl = groesseAusSatz(satz);
  const m = masse(teil);

  const aenderung: Array<[string[], 'laenge' | 'breite' | 'tiefe', 1 | -1]> = [
    [['langer', 'longer'], 'laenge', 1],
    [['kurzer', 'shorter'], 'laenge', -1],
    [['breiter', 'wider'], 'breite', 1],
    [['schmaler', 'narrower'], 'breite', -1],
    [['dicker', 'thicker'], 'tiefe', 1],
    [['dunner', 'thinner'], 'tiefe', -1],
  ];
  for (const [woerter, name, vorzeichen] of aenderung) {
    if (!wortAus(satz, woerter)) continue;
    const ziel = teil.content.find((k) => k.type === (name === 'tiefe' ? 'extrusion' : 'sketch'));
    const alt = ziel?.params[name] as Groesse | undefined;
    if (!ziel || !alt) return undefined;
    const neu = mm(inMm(alt) + vorzeichen * (zahl ? inMm(zahl) : 10));
    const geist = { ...m, ...(name === 'laenge' ? { l: neu.value } : {}) };
    if (name === 'breite') geist.b = neu.value;
    if (name === 'tiefe') geist.h = neu.value;
    return {
      art: 'wert',
      befehl: 'element.wert-setzen',
      titel: `${t('ki.titel.wert')}: ${t(`ablauf.${name}`)}`,
      wert: anzeigen(neu),
      vorher: anzeigen(alt),
      nachher: anzeigen(neu),
      schritte: [
        {
          befehl: 'element.wert-setzen',
          parameter: { element: ziel.id, name, wert: neu },
          zeile: `element.wert-setzen element=${ziel.id} name=${name} wert=${zeileMm(neu.value)}`,
        },
      ],
      nach: { element: ziel.id, name, beschriftung: t(`ablauf.${name}`), start: neu },
      geist,
    };
  }
  if (wortAus(satz, ['schale', 'gehause', 'kastchen', 'hohl', 'wand', 'shell', 'box', 'wall'])) {
    const wand = mm(zahl ? inMm(zahl) : 2);
    return {
      art: 'schale',
      befehl: 'feature.schale',
      titel: `${t('ki.titel.schale')} ${anzeigen(wand)}`,
      wert: anzeigen(wand),
      vorher: '–',
      nachher: anzeigen(wand),
      schritte: [
        {
          befehl: 'feature.schale',
          parameter: { teil: teil.id, wandstaerke: wand, flaeche: 'oben' },
          zeile: `feature.schale wandstaerke=${zeileMm(wand.value)} flaeche=oben`,
        },
      ],
      nach: {
        element: 'schale-1',
        name: 'wandstaerke',
        beschriftung: t('ki.wandstaerke'),
        start: wand,
      },
      geist: m,
    };
  }
  if (wortAus(satz, ['rund', 'abrunden', 'verrund', 'kanten', 'round', 'fillet', 'edges'])) {
    const radius = mm(zahl ? inMm(zahl) : 1);
    return {
      art: 'verrunden',
      befehl: 'feature.verrunden',
      titel: `${t('ki.titel.verrunden')} ${anzeigen(radius)}`,
      wert: anzeigen(radius),
      vorher: '–',
      nachher: anzeigen(radius),
      schritte: [
        {
          befehl: 'feature.verrunden',
          parameter: { teil: teil.id, radius, kanten: [...KANTEN] },
          zeile: `feature.verrunden radius=${zeileMm(radius.value)} kanten=alle`,
        },
      ],
      nach: {
        element: 'verrundung-1',
        name: 'radius',
        beschriftung: t('ablauf.radius'),
        start: radius,
      },
      geist: m,
    };
  }
  return undefined;
}

export function wirkungenRegistrieren(sitzung: Sitzung): void {
  sitzung.registriere('feature.schale', (p, par) => {
    const teil = typeof par.teil === 'string' ? finde(p, par.teil) : undefined;
    if (!teil || !par.wandstaerke) return;
    if (alle(teil).some((k) => k.type === 'shell')) return;
    teil.content.push(
      element('schale-1', 'shell', 'Schale 1', {
        wandstaerke: par.wandstaerke,
        flaeche: par.flaeche ?? 'oben',
      }),
    );
  });
}

export interface KiEingang {
  sitzung: Sitzung;
  t: T;
  flaeche: HTMLElement;
  auswahl: () => string[];
  nachjustieren: HTMLElement;
  zeichnen: () => void;
  geist: (maße: Mass | undefined) => void;
}

export interface KiSchnittstelle {
  /** Eingabezeile an der Auswahl öffnen. */
  eingabe: () => void;
  /** Absicht verarbeiten (Protokoll, Fortschritt, Karte oder Erklärung). */
  fragen: (absicht: string) => void;
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  muster?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (muster) e.dataset.muster = muster;
  if (text !== undefined) e.textContent = text;
  return e;
}

export function kiAufbauen(a: KiEingang): KiSchnittstelle {
  const { sitzung, t, flaeche } = a;
  const tempo = new URLSearchParams(window.location.search).get('tempo') === '0' ? 0 : 1;
  let lauf = 0; // Nummer des laufenden Fortschritts; Anhalten und neue Fragen machen ihn ungültig
  let timer: number | undefined;

  const schliessen = (): void => {
    flaeche.querySelectorAll('.zustand').forEach((k) => k.remove());
    a.geist(undefined);
  };

  const knopf = (id: string): HTMLButtonElement => {
    const b = el('button');
    b.type = 'button';
    b.dataset.befehl = id;
    b.textContent = t(`befehl.${id}`);
    return b;
  };

  function erklaerung(schluessel: string): void {
    schliessen();
    const k = el('section', 'Leerer Zustand');
    k.classList.add('zustand');
    k.dataset.quelle = 'ki';
    k.append(el('h3', undefined, t('ki.erklaerung.titel')), el('p', undefined, t(schluessel)));
    const liste = el('div');
    for (const s of BEISPIELE) {
      const b = knopf('ki.fragen');
      b.dataset.beispiel = '';
      b.textContent = t(s);
      b.addEventListener('click', () => fragen(t(s)));
      liste.append(b);
    }
    k.append(liste);
    flaeche.append(k);
  }

  function karte(v: Vorschlag): void {
    schliessen();
    a.geist(v.geist);
    const k = el('section', 'Entscheidungskarte');
    k.classList.add('zustand');
    k.dataset.quelle = 'ki';
    k.dataset.vorschlag = v.befehl;
    k.dataset.wert = v.wert;
    const werte = el('p');
    werte.append(
      `${t('ki.vorher')}: `,
      Object.assign(el('span'), { textContent: v.vorher }),
      ' → ',
      Object.assign(el('span'), { textContent: v.nachher }),
    );
    werte.querySelectorAll('span')[0]?.setAttribute('data-feld', 'vorher');
    werte.querySelectorAll('span')[1]?.setAttribute('data-feld', 'nachher');
    const zeilen = el('div');
    for (const s of v.schritte) zeilen.append(Object.assign(el('code'), { textContent: s.zeile }));
    const ja = knopf('vorschlag.uebernehmen');
    const nein = knopf('vorschlag.verwerfen');
    ja.dataset.hauptaktion = '';
    nein.dataset.hauptaktion = '';
    ja.addEventListener('click', () => {
      sitzung.ausfuehren('vorschlag.uebernehmen', { vorschlag: v.befehl });
      for (const s of v.schritte) sitzung.ausfuehren(s.befehl, s.parameter, 'ki');
      schliessen();
      nachjustierenZeigen(v);
      a.zeichnen();
    });
    nein.addEventListener('click', () => {
      sitzung.ausfuehren('vorschlag.verwerfen', { vorschlag: v.befehl });
      schliessen();
    });
    k.append(
      el('h3', undefined, v.titel),
      el('p', undefined, t(`ki.grund.${v.art}`)),
      werte,
      zeilen,
      ja,
      nein,
    );
    flaeche.append(k);
  }

  function nachjustierenZeigen(v: Vorschlag): void {
    a.nachjustieren.replaceChildren(
      el('span', undefined, t('app.nachjustieren')),
      el('span', undefined, v.titel),
      wertfeldBauen(
        t,
        v.nach.beschriftung,
        v.nach.start,
        (g) => {
          sitzung.ausfuehren('element.wert-setzen', {
            element: v.nach.element,
            name: v.nach.name,
            wert: g,
          });
          a.zeichnen();
        },
        'element.wert-setzen',
      ),
    );
  }

  function fortschritt(dann: () => void): void {
    if (tempo === 0) return dann();
    schliessen();
    const mein = ++lauf;
    const status = el('section', 'Statusanzeige');
    status.classList.add('zustand');
    status.dataset.quelle = 'ki';
    status.append(el('h3', undefined, t('ki.arbeitet')));
    const zeilen = SCHRITTE.map((s) => el('p', undefined, t(s)));
    status.append(...zeilen);
    const anhalten = knopf('ki.anhalten');
    anhalten.addEventListener('click', () => {
      lauf += 1;
      window.clearTimeout(timer);
      sitzung.ausfuehren('ki.anhalten');
      schliessen();
    });
    status.append(anhalten);
    flaeche.append(status);
    let i = 0;
    const weiter = (): void => {
      if (mein !== lauf) return;
      zeilen.forEach((z, n) =>
        n === i ? z.setAttribute('aria-current', 'step') : z.removeAttribute('aria-current'),
      );
      i += 1;
      if (i <= SCHRITTE.length) timer = window.setTimeout(weiter, DAUER_MS / SCHRITTE.length);
      else dann();
    };
    weiter();
  }

  function fragen(absicht: string): void {
    lauf += 1;
    window.clearTimeout(timer);
    const gewaehlt = a.auswahl();
    sitzung.ausfuehren('ki.fragen', { absicht, auswahl: gewaehlt });
    if (gewaehlt.length === 0) return erklaerung('ki.erklaerung.ohne-auswahl');
    const projekt = sitzung.angezeigt();
    const teil = zielTeil(projekt, gewaehlt);
    const v = teil ? absichtErkennen(absicht, teil, t) : undefined;
    if (!v) return erklaerung('ki.erklaerung.unbekannt');
    fortschritt(() => karte(v));
  }

  function eingabe(): void {
    schliessen();
    const k = el('section', 'Rückmeldung');
    k.classList.add('zustand');
    k.dataset.quelle = 'ki';
    const feld = el('input');
    feld.type = 'text';
    feld.dataset.befehl = 'ki.fragen';
    feld.placeholder = t('ki.eingabe');
    feld.setAttribute('aria-label', t('ki.eingabe'));
    feld.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') return schliessen();
      if (ev.key !== 'Enter' || !feld.value.trim()) return;
      fragen(feld.value.trim());
    });
    k.append(el('h3', undefined, t('befehl.werkzeug.fragen')), feld);
    flaeche.append(k);
    feld.focus();
  }

  return { eingabe, fragen };
}
