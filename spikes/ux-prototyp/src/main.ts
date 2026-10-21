import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';
import { befehle, Sitzung } from './modell/register';
import { spracheAusAdresse, uebersetzer } from './i18n';
import { aufbauen } from './ui/layout';

const sitzung = new Sitzung();
const adresse = new URLSearchParams(window.location.search);
const zustand = adresse.get('zustand') ?? '';
const thema = adresse.get('thema');
if (thema === 'hell' || thema === 'dunkel') document.documentElement.dataset.thema = thema;

const wurzel = document.getElementById('app');
const ui = wurzel
  ? aufbauen(wurzel, sitzung, uebersetzer(spracheAusAdresse(window.location.search)))
  : undefined;

// Nur lesende Testschnittstelle; Aktionen laufen über echte Eingaben (design.md, Testschnittstelle).
Object.defineProperty(window, '__cee', {
  value: Object.freeze({
    bereit: true,
    zustand,
    modell: () => sitzung.modell(),
    auswahl: () => ui?.auswahl() ?? [],
    protokoll: () => sitzung.protokoll.map((p) => ({ ...p })),
    befehle: () => befehle.map((b) => ({ ...b })),
  }),
});

if (wurzel) wurzel.dataset.muster = 'Arbeitsflaeche';
document.documentElement.dataset.bereit = '1';
