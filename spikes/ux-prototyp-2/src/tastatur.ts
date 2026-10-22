// Tastenkürzel: dieselben Befehle wie in der Suche (Befehlsregister).
import type { App } from './app';
import type { ModellZone } from './zonen/modellzone';

export function tastenAnbinden(app: App, modell: ModellZone): void {
  window.addEventListener('keydown', (e) => {
    if (modell.ziehenTaste(e)) return;
    const ui = app.ui;
    const mod = e.ctrlKey || e.metaKey;
    const ziel = e.target as HTMLElement | null;
    const tippt = ziel instanceof HTMLInputElement || ziel instanceof HTMLTextAreaElement;
    const taste = e.key.toLowerCase();
    if (mod && taste === 'k') {
      e.preventDefault();
      app.starte('suche.oeffnen');
      return;
    }
    if (mod && taste === 'z') {
      e.preventDefault();
      app.starte(e.shiftKey ? 'bearbeiten.wiederholen' : 'bearbeiten.rueckgaengig');
      return;
    }
    if (e.key === 'Escape') {
      if (ui.menue) {
        ui.menue = null;
        app.aktualisieren();
      } else if (ui.ebenenWahl) {
        ui.ebenenWahl = false;
        app.aktualisieren();
      } else if (ui.verbinden) {
        ui.verbinden = null;
        app.aktualisieren();
      } else if (ui.gespraech) {
        app.starte('gespraech.schliessen');
      } else if (ui.ort.art === 'skizze') {
        if (tippt) (ziel as HTMLElement).blur();
        app.starte('ort.fertig');
      }
      return;
    }
    if (!mod && !tippt && taste === 'w') {
      e.preventDefault();
      app.starte('darstellung.wechseln');
    }
  });
}
