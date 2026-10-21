// Ablauf B: Wert im Eigenschaften-Panel ändern, Kanten wählen, Verrunden, Befund mit Korrektur.
import { alle, element, finde, mm, type Element, type Projekt } from '../modell/projekt';
import type { Sitzung } from '../modell/register';
import type { Groesse } from '../wert/wertfeld';
import { wertfeldBauen } from './skizzenablauf';

type T = (schluessel: string) => string;

export const KANTEN = ['kante-1', 'kante-2', 'kante-3', 'kante-4'];
export const GRENZE_MM = 24;

/** Teil, das die Auswahl enthält (oder die Auswahl selbst); sonst die Platte. */
export function zielTeil(projekt: Projekt, auswahl: string[]): Element | undefined {
  const teile = projekt.content.filter((k) => k.type === 'part');
  const gewaehlt = auswahl[0];
  return (
    teile.find((p) => p.id === gewaehlt || alle(p).some((k) => k.id === gewaehlt)) ??
    teile.find((p) => p.id === 'platte')
  );
}

export function wirkungenRegistrieren(sitzung: Sitzung): void {
  sitzung.registriere('element.wert-setzen', (p, par) => {
    const k = typeof par.element === 'string' ? finde(p, par.element) : undefined;
    if (k && typeof par.name === 'string' && par.wert) k.params[par.name] = par.wert;
  });
  sitzung.registriere('feature.verrunden', (p, par) => {
    const teil = typeof par.teil === 'string' ? finde(p, par.teil) : undefined;
    if (!teil || !par.radius || !Array.isArray(par.kanten) || par.kanten.length === 0) return;
    if (alle(p).some((k) => k.type === 'fillet' && k.id === 'verrundung-1')) return;
    teil.content.push(
      element('verrundung-1', 'fillet', 'Verrundung 1', {
        radius: par.radius,
        kanten: par.kanten,
      }),
    );
  });
}

/** Karte mit Kantenwahl und Radius-Wertfeld; Enter im Radius führt den Befehl aus. */
export function verrundenKarte(e: {
  sitzung: Sitzung;
  t: T;
  flaeche: HTMLElement;
  teil: string;
  fertig: () => void;
}): void {
  const { sitzung, t } = e;
  e.flaeche.querySelectorAll('.zustand').forEach((k) => k.remove());
  const karte = document.createElement('section');
  karte.dataset.muster = 'Rückmeldung';
  karte.classList.add('zustand');
  const titel = document.createElement('h3');
  titel.textContent = t('ablauf.kanten');
  const gewaehlt = new Set<string>();
  const kanten = document.createElement('div');
  KANTEN.forEach((id, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.befehl = 'auswahl.setzen';
    b.dataset.kante = id;
    b.setAttribute('aria-pressed', 'false');
    b.textContent = `${t('ablauf.kante')} ${i + 1}`;
    b.addEventListener('click', () => {
      if (gewaehlt.delete(id)) b.setAttribute('aria-pressed', 'false');
      else {
        gewaehlt.add(id);
        b.setAttribute('aria-pressed', 'true');
      }
    });
    kanten.append(b);
  });
  const radius = wertfeldBauen(
    t,
    t('ablauf.radius'),
    mm(3),
    (g: Groesse) => {
      if (gewaehlt.size === 0) return;
      sitzung.ausfuehren('feature.verrunden', {
        teil: e.teil,
        radius: g,
        kanten: KANTEN.filter((k) => gewaehlt.has(k)),
      });
      karte.remove();
      e.fertig();
    },
    'feature.verrunden',
  );
  karte.append(titel, kanten, radius);
  e.flaeche.append(karte);
}
