// Tastatur und Fokus (design.md): Kürzel stehen nur im Register, Esc schließt genau eine Ebene.
import type { App } from './app';
import type { Befehl } from './modell/register';

interface Kombi {
  mod: boolean;
  umschalt: boolean;
  alt: boolean;
  taste: string;
}

export function parse(kuerzel: string): Kombi {
  const teile = kuerzel.split('+');
  const taste = (teile[teile.length - 1] ?? '').toLowerCase();
  const m = new Set(teile.slice(0, -1).map((x) => x.toLowerCase()));
  return {
    mod: m.has('mod'),
    umschalt: m.has('umschalt') || m.has('shift'),
    alt: m.has('alt'),
    taste,
  };
}

const ENTF = new Set(['delete', 'backspace']);

function passt(k: Kombi, e: KeyboardEvent): boolean {
  const mod = e.ctrlKey || e.metaKey;
  if (k.mod !== mod || k.umschalt !== e.shiftKey || k.alt !== e.altKey) return false;
  if (k.taste === 'entf') return ENTF.has(e.key.toLowerCase());
  if (/^f\d+$/.test(k.taste)) return e.key.toLowerCase() === k.taste;
  if (k.taste.length === 1)
    return e.code === `Key${k.taste.toUpperCase()}` || e.key.toLowerCase() === k.taste;
  return e.key.toLowerCase() === k.taste;
}

export function befehlZuKombi(register: Befehl[], e: KeyboardEvent): Befehl | null {
  for (const b of register) {
    if (b.kuerzel && passt(parse(b.kuerzel), e)) return b;
  }
  return null;
}

export function tastenAnbinden(app: App): void {
  window.addEventListener(
    'keydown',
    (e) => {
      const ziel = e.target as HTMLElement | null;
      const tippt =
        ziel instanceof HTMLInputElement ||
        ziel instanceof HTMLTextAreaElement ||
        ziel?.isContentEditable === true;
      app.tastenfokus = true;

      // Ziehen am Griff: Ziffern setzen den genauen Wert, Enter übernimmt, Esc bricht ab
      if (app.griff?.aktiv) {
        if (/^\d$/.test(e.key)) {
          app.griff.eingabe += e.key;
          app.griff.wert = Number(app.griff.eingabe);
          app.vorschau = {
            id: app.griff.id,
            name: app.griff.name,
            wert: { value: app.griff.wert, unit: 'mm' },
          };
          app.rendern();
        } else if (e.key === 'Backspace') {
          app.griff.eingabe = app.griff.eingabe.slice(0, -1);
          app.rendern();
        } else if (e.key === 'Enter') {
          app.griffUebernehmen();
        } else if (e.key === 'Escape') {
          app.griffAbbrechen();
        } else return;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (e.key === 'Escape') {
        // Genau eine Ebene: Menü/Kontextmenü/Suche → Ziehen → Auswahl → aktives Element verlassen
        if (app.offenesSchliessen?.()) {
          e.preventDefault();
          return;
        }
        if (app.dndAbbrechen?.()) {
          e.preventDefault();
          return;
        }
        if (app.umhaengenModus) {
          app.umhaengenModus = null;
          app.rendern();
          return;
        }
        if (app.chat.vorschlag && ziel?.closest('[data-zone="chat"]')) {
          app.chat.vorschlag = null;
          app.rendern();
          return;
        }
        if (app.auswahl.length) {
          app.setzeAuswahl([]);
          return;
        }
        if (app.aktiv) {
          app.ausfuehren('element.verlassen', {}, 'kuerzel');
          return;
        }
        return;
      }

      // Rückgängig/Wiederholen gelten in jeder Zone, auch im Chat; im Wertfeld während der Eingabe nicht
      const wertfeld = ziel instanceof HTMLInputElement && ziel.hasAttribute('data-feld-eingabe');
      const b = befehlZuKombi(app.register, e);
      if (!b) return;
      const mod = e.ctrlKey || e.metaKey;
      if (tippt && !mod && !/^f\d+$/i.test(b.kuerzel ?? '')) return; // einfache Tasten gehören dem Feld
      if (tippt && mod && (b.id === 'auswahl.alles' || b.id === 'element.duplizieren')) return;
      if (
        tippt &&
        wertfeld &&
        (b.id === 'bearbeiten.rueckgaengig' || b.id === 'bearbeiten.wiederholen')
      )
        return;
      if (
        tippt &&
        ziel instanceof HTMLInputElement &&
        ziel.dataset.suchfeld !== undefined &&
        mod &&
        b.id !== 'suche.oeffnen'
      )
        return;
      e.preventDefault();
      if (b.id === 'fenster.naechste-zone') {
        app.naechsteZone(e.shiftKey);
        return;
      }
      if (b.id === 'suche.oeffnen') {
        app.ausfuehren('suche.oeffnen', {}, 'kuerzel');
        return;
      }
      if (!app.anwendbar(b)) return;
      app.ausfuehren(b.id, {}, 'kuerzel');
    },
    true,
  );
}
