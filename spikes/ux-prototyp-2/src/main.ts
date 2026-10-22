import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';
import './zonen/zonen.css';
import { App, ebeneVon, wertVon } from './app';
import { spracheAusAdresse, uebersetzer } from './i18n';
import { teilErgebnis } from './geometrie/teil';
import { befehle } from './modell/register';
import { halterProjekt } from './modell/projekt';
import { pfadGlieder } from './zonen/kopf';
import { aufbauen } from './zonen/layout';
import { griffeListe } from './zonen/modellzone';
import { tastenAnbinden } from './tastatur';
import { anwenden } from './zustaende';
import { Vektor3 } from './ansicht/szene';
import { alleMitSkizzen } from './modell/projekt';

const adresse = new URLSearchParams(window.location.search);
const thema = adresse.get('thema') === 'dunkel' ? 'dunkel' : 'hell';
const sprache = spracheAusAdresse(window.location.search);
const tempo = adresse.get('tempo') === '0' ? 0 : 1500;
document.documentElement.dataset.thema = thema;
document.documentElement.lang = sprache === 'en' ? 'en' : 'de';

const wurzel = document.getElementById('app') as HTMLElement;
const app = new App(uebersetzer(sprache), sprache, tempo, halterProjekt());
app.ui.thema = thema;
const zonen = aufbauen(wurzel, app);
tastenAnbinden(app, zonen.modell);
app.szene.setThema(thema);

const { gezeigt, danach } = anwenden(adresse.get('zustand') ?? '', app);
app.rendern();
app.szene.groesseAnpassen();
app.szene.einpassen();
danach?.(app);
app.rendern();

// Nur lesende Testschnittstelle; Aktionen laufen über echte Eingaben (design.md, Testschnittstelle).
const teilDaten = () => {
  const e = app.ergebnisAktiv() ?? teilErgebnis(app.aktivesTeil() ?? app.angezeigt());
  return { abmessungen_mm: [...e.abmessungen_mm], volumen_mm3: e.volumen_mm3, masse_g: e.masse_g };
};

const ansicht = () => {
  const k = app.szene.kamera;
  return {
    darstellung: app.ui.darstellung,
    ort: { art: app.ui.ort.art, schritt: app.ui.ort.schritt },
    pfad: pfadGlieder(app).map((g) => g.text),
    kamera: {
      azimut_grad: k.azimut,
      hoehe_grad: k.hoehe,
      abstand_mm: k.abstand,
      ziel: { x: k.ziel.x, y: k.ziel.y, z: k.ziel.z },
    },
    lichter: app.szene.lichter(),
    geometrie: app.szene.geometrie(),
    griffe: griffeListe(app).map((g) => ({ schritt: g.schritt, parameter: g.parameter })),
    projektion: (id: string) => app.szene.projektion(id),
  };
};

Object.defineProperty(window, '__cee', {
  value: Object.freeze({
    bereit: true,
    zustand: gezeigt,
    modell: () => app.modell(),
    auswahl: () => [...app.ui.auswahl],
    protokoll: () => app.sitzung.protokoll.map((p) => ({ ...p })),
    befehle: () => befehle.map((b) => ({ ...b })),
    teil: teilDaten,
    ansicht,
    einstellung: () => ({ navigationsprofil: 'standard' }),
    // Hilfen für das Prüfwerkzeug (nur lesend)
    griffe: () => griffeListe(app).map((g) => ({ ...g })),
    bild: () => app.szene.bild(),
    ebene: (id: string) => ebeneVon(alleMitSkizzen(app.angezeigt()).find((e) => e.id === id)),
    wert: wertVon,
  }),
});

// Ansichtsquelle mit sechs Achsen (später 3D-Maus): bewegt nur die Kamera, nie Auswahl, Ort oder Werte.
Object.defineProperty(window, '__ceeEingabe', {
  value: Object.freeze({
    ansicht: (a: {
      tx?: number;
      ty?: number;
      tz?: number;
      rx?: number;
      ry?: number;
      rz?: number;
    }) => {
      app.szene.drehen(a.ry ?? 0, a.rx ?? 0);
      if (a.tx || a.ty) app.szene.schieben(a.tx ?? 0, a.ty ?? 0);
      if (a.tz) app.szene.zoomen(Math.exp((a.tz ?? 0) * 0.01));
    },
  }),
});
void Vektor3;

document.documentElement.dataset.bereit = '1';
