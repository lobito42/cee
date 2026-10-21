import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';
import { befehle, Sitzung } from './modell/register';

const sitzung = new Sitzung();
const zustand = new URLSearchParams(window.location.search).get('zustand') ?? '';

// Nur lesende Testschnittstelle; Aktionen laufen über echte Eingaben (design.md, Testschnittstelle).
Object.defineProperty(window, '__cee', {
  value: Object.freeze({
    bereit: false,
    zustand,
    modell: () => sitzung.modell(),
    auswahl: () => [] as string[],
    protokoll: () => sitzung.protokoll.map((p) => ({ ...p })),
    befehle: () => befehle.map((b) => ({ ...b })),
  }),
});

const wurzel = document.getElementById('app');
if (wurzel) {
  wurzel.dataset.muster = 'Arbeitsflaeche';
}
document.documentElement.dataset.bereit = '1';
