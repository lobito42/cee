import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';
import { befehle, Sitzung } from './modell/register';
import { spracheAusAdresse, uebersetzer } from './i18n';
import { aufbauen } from './ui/layout';
import { anwenden } from './zustaende';

const sitzung = new Sitzung();
const adresse = new URLSearchParams(window.location.search);
const thema = adresse.get('thema');
document.documentElement.dataset.thema = thema === 'dunkel' ? 'dunkel' : 'hell';

const wurzel = document.getElementById('app');
const t = uebersetzer(spracheAusAdresse(window.location.search));
const ui = wurzel ? aufbauen(wurzel, sitzung, t) : undefined;
const zustand = ui ? anwenden(adresse.get('zustand') ?? '', ui, t, sitzung) : '';

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

document.documentElement.dataset.bereit = '1';
