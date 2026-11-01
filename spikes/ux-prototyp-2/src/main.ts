import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono';
import './erzeugt/tokens.css';
import './zonen/zonen.css';
import { App, SPEICHER_SCHLUESSEL } from './app';
import { huellbox } from './ansicht/geom';
import { Fenster } from './fenster';
import { spracheAusAdresse, uebersetzer } from './i18n';
import { ladeKatalog } from './katalog/katalog';
import { standardProjekt } from './modell/beispiele';
import { ladeRegisterDatei, befehleAusDatei, orte, type Befehl } from './modell/register';
import { alleElemente, type Element } from './modell/element';
import { steuerungAnbinden } from './steuerung';
import { tastenAnbinden } from './tastatur';
import { wirkungenRegistrieren } from './wirkungen';
import { wirkungenRegistrieren as kiRegistrieren } from './ki';
import { kiVerbinden, kopfText } from './ki/konstruktion';
import { werkzeuge as kiWerkzeuge } from './ki/werkzeuge';
import { anwenden } from './zustaende';
import { konturPunkte, huelleBildschirm } from './zonen/modell';
import { ergebnisVon } from './geometrie/teil';
import { tokens } from './erzeugt/tokens';

const adresse = new URLSearchParams(window.location.search);
const thema = adresse.get('thema') === 'dunkel' ? 'dunkel' : 'hell';
const sprache = spracheAusAdresse(window.location.search);
const tempo = adresse.get('tempo') === '0' ? 0 : 1;
document.documentElement.dataset.thema = thema;
document.documentElement.lang = sprache === 'en' ? 'en' : 'de';

async function register(): Promise<Befehl[]> {
  const datei = adresse.get('register');
  if (!datei) return befehleAusDatei;
  try {
    const antwort = await fetch(datei);
    return ladeRegisterDatei(await antwort.json());
  } catch {
    return befehleAusDatei;
  }
}

function gehaltenerGraph(): Element | null {
  try {
    const roh = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return null;
    const p = JSON.parse(roh) as Element;
    return p && Array.isArray(p.content) && p.content.length ? p : null;
  } catch {
    return null;
  }
}

/** Schneller, stabiler Hash (FNV-1a) der kanonischen JSON-Form. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

const kanon = (x: unknown): string =>
  JSON.stringify(x, (_k, v: unknown) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(
          Object.entries(v as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)),
        )
      : v,
  );

async function start(): Promise<void> {
  const wurzel = document.getElementById('app') as HTMLElement;
  const reg = await register();
  const t = uebersetzer(sprache);

  if (adresse.has('katalog')) {
    await ladeKatalog(wurzel, adresse.get('katalog') ?? '', t, sprache, thema);
    return;
  }

  const zustandName = adresse.get('zustand');
  const gehalten = zustandName === null ? gehaltenerGraph() : null;
  const app = new App(t, sprache, tempo, reg, gehalten ?? standardProjekt());
  app.thema = thema;
  app.rechenzeitMs = Number(adresse.get('rechenzeit') ?? 0) || 0;
  wirkungenRegistrieren(app);
  kiRegistrieren(app);
  app.skizze.registrieren();
  let gezeigt = 'halter';
  let danach: (() => void) | undefined;
  if (zustandName !== null) {
    const r = anwenden(zustandName, app);
    gezeigt = r.gezeigt;
    danach = r.danach;
  }
  // KI über das Befehlsregister (ap-52): Anbieter der Brücke, nur im Drahtmodell
  if (app.dok === 'drahtmodell') await kiVerbinden(app);
  const fenster = new Fenster(wurzel, app);
  fenster.szene.setThema(thema);
  steuerungAnbinden(app, fenster);
  app.skizze.griffAnbinden();
  tastenAnbinden(app);
  app.rendernSofort();
  fenster.einpassenSofort();
  app.rendernSofort();
  danach?.();
  app.rendernSofort();

  const dokument = () => app.dokument();
  const kamera = () => {
    const k = app.szene?.kamera;
    return {
      azimut_grad: k?.azimut ?? 0,
      hoehe_grad: k?.hoehe ?? 0,
      abstand_mm: k?.abstand ?? 0,
      ziel: { x: k?.ziel.x ?? 0, y: k?.ziel.y ?? 0, z: k?.ziel.z ?? 0 },
    };
  };
  const projektionVon = (id: string) => {
    const hulle = huelleBildschirm(app, id);
    if (!hulle) return null;
    const box = huellbox(hulle);
    // Punkte, die sicher dieses Element treffen: Raster in der Hülle, weit weg von Rändern
    const ids = new Set(app.mitNachfahren(id));
    const treffer: { x: number; y: number }[] = [];
    const schritt = Math.max(10, Math.sqrt((box.breite * box.hoehe) / 300));
    for (let y = box.y; y < box.y + box.hoehe; y += schritt) {
      for (let x = box.x; x < box.x + box.breite; x += schritt) {
        const tr = app.szene?.trefferBei(x, y);
        if (!tr || !ids.has(tr.elementId)) continue;
        const ziel = app.zielFuerTreffer(tr.elementId);
        if (ziel !== id && !ids.has(ziel ?? '')) continue;
        if (app.kanteBei(tr.elementId, x, y)) continue;
        // Abstand zu allen Kanten dieses Körpers mindestens 14 px
        const nah = (
          app.szene?.kantenVon(
            tr.elementId,
            app.huelle(tr.elementId) ?? { min: [0, 0, 0], max: [0, 0, 0] },
          ) ?? []
        ).some((k) => {
          const dx = k.bis.x - k.von.x;
          const dy = k.bis.y - k.von.y;
          const l2 = dx * dx + dy * dy || 1;
          const u = Math.max(0, Math.min(1, ((x - k.von.x) * dx + (y - k.von.y) * dy) / l2));
          return Math.hypot(x - (k.von.x + u * dx), y - (k.von.y + u * dy)) < 14;
        });
        if (!nah) treffer.push({ x: Math.round(x), y: Math.round(y) });
      }
    }
    const box3 = app.huelle(id);
    const kanten = box3 && app.szene ? app.szene.kantenVon(id, box3) : [];
    return {
      huellbox: box,
      huelle: hulle,
      treffer,
      kanten: kanten.map((k) => ({
        id: k.adresse,
        name: k.name,
        mitte: k.mitte,
        von: k.von,
        bis: k.bis,
      })),
    };
  };

  const darstellungen = (id: string) => {
    const zeilen = app.zeilen().some((z) => z.element.id === id);
    const eigene = new Set(app.mitNachfahren(id));
    const hatKoerper = ergebnisVon(app.angezeigtesDokument()).koerper.some((k) =>
      eigene.has(k.elementId),
    );
    const ausgeblendet = app.istAusgeblendet(id);
    const einzeln = app.auswahlIds().length === 1 && app.auswahlIds()[0] === id;
    const imPfad = app.pfadGlieder().some((g) => g.id === id);
    return {
      modell: hatKoerper || ausgeblendet ? app.darstellungVon(id, 'modell') : null,
      struktur: zeilen ? app.darstellungVon(id, 'struktur') : null,
      chat: einzeln ? app.darstellungVon(id, 'chat') : null,
      pfad: imPfad ? app.darstellungVon(id, 'pfad') : null,
    };
  };

  Object.defineProperty(window, '__cee', {
    value: Object.freeze({
      bereit: true,
      zustand: gezeigt,
      modell: () => app.modell(),
      modellHash: () => hash(kanon(app.projekt)),
      auswahl: () => app.auswahl.map((a) => ({ ...a })),
      protokoll: () => app.protokoll.map((p) => ({ ...p })),
      befehle: () =>
        app.register.map((b) => ({
          id: b.id,
          kuerzel: b.kuerzel ?? null,
          titel: b.titel,
          titel_text: app.t(b.titel),
          rang: b.rang,
          familie: b.familie,
          handlung: b.handlung ?? null,
          wirkung: b.folgt !== true,
          orte: orte(b),
        })),
      ausgeloest: () => app.ausgeloest.map((a) => ({ ...a })),
      teil: () => {
        const e = app.teilErgebnis();
        return {
          abmessungen_mm: [...e.abmessungen_mm],
          volumen_mm3: e.volumen_mm3,
          masse_g: e.masse_g,
        };
      },
      ansicht: () => ({
        aktiv: app.aktiv,
        pfad: app.pfadGlieder().map((g) => g.meta.name),
        ausgeblendet: [...app.ausgeblendet],
        isoliert: app.isoliert ? [...app.isoliert] : [],
        darstellung: app.darstellung,
        projektion: app.projektionsart,
        profil: app.profil,
        kamera: kamera(),
        projektion_von: projektionVon,
        kontur_punkte: (id: string) => konturPunkte(app, id),
      }),
      zustaende: darstellungen,
      einstellung: () => ({ navigationsprofil: app.profil }),
      verlauf: () => app.verlaufLaenge(),
      gezeichnet: () => app.szene?.gezeichnet() ?? [],
      flaeche_bei: (x: number, y: number) => {
        const tr = app.szene?.trefferBei(x, y);
        return tr
          ? { erzeuger_id: tr.elementId, ziel_id: app.zielFuerTreffer(tr.elementId) }
          : null;
      },
      elemente: () => alleElemente(dokument()).map((e) => e.id),
      // Wireframe-Basics (ap-50): Rohdaten für das Prüfwerkzeug `pruefen -- drahtmodell …`
      draht: () => ({
        bereit: app.draht.bereit(),
        graph: JSON.parse(JSON.stringify(dokument().content)) as unknown,
        ergebnis: app.draht.ergebnis
          ? (JSON.parse(JSON.stringify(app.draht.ergebnis)) as unknown)
          : null,
        szene: app.draht.szene(),
        befunde: app
          .befunde()
          .filter((b) => b.code)
          .map((b) => ({ element: b.elementId, code: b.code, ort: 'panel', text: b.text })),
        modus: app.draht.modus ? app.draht.modus.art : null,
      }),
      draht_bildschirm: (id: string, anker?: string) => app.draht.bildschirm(id, anker),
      /** Befehl mit Parametern auslösen (Prüfschritt `{befehl, args}`), wie aus dem Menü. */
      draht_befehl: (id: string, par: Record<string, unknown>) => app.ausfuehren(id, par, 'menue'),
      draht_projiziere: (p: [number, number, number]) => app.szene?.projiziere(p) ?? null,
      // KI über das Befehlsregister (ap-52): Rohdaten für `pruefen -- ki …`
      ki_werkzeuge: () => kiWerkzeuge(app.register),
      ki: () => ({
        bruecke: app.ki.bruecke,
        beschaeftigt: app.ki.beschaeftigt,
        aktiv: app.ki.aktiv,
        bereit_ms: app.ki.bereitMs,
        kopf: app.ki.bruecke ? kopfText(app) : app.t('simuliert'),
        nachrichten: app.chat.nachrichten.map((n) => ({
          rolle: n.von === 'person' ? 'mensch' : 'ki',
          text: n.schluessel ? app.t(n.schluessel, n.werte) : n.text,
          ...(n.karte ? { karte: n.karte } : {}),
        })),
        karten: app.ki.karten.map((k) => ({
          nr: k.nr,
          titel: k.titel,
          begruendung: k.begruendung,
          anbieter: k.anbieter,
          aufrufe: k.aufrufe,
          neu: k.neu,
          verworfen: k.verworfen,
          ausgeblendet: k.ausgeblendet,
          befunde: k.befunde,
          offen: k.offen,
          status: k.status,
          aktionen: k.offen
            ? [
                { befehl: 'chat.uebernehmen', haupt: true },
                { befehl: 'chat.verwerfen', haupt: false },
              ]
            : [],
        })),
        geister: app.draht.geister.map((g) => ({
          element: g.element,
          art: g.art,
          lage_mm: Array.isArray(g.lage_mm)
            ? g.lage_mm
            : { start: g.lage_mm.start, end: g.lage_mm.end, ...g.lage_mm },
        })),
        verlauf: app.protokoll.map((p) => ({
          befehl: p.befehl,
          urheber: p.quelle,
          ...(p.anbieter ? { anbieter: p.anbieter, ausgeloest_von: p.ausgeloest_von } : {}),
        })),
      }),
      /** Ansicht so einpassen, dass das Drahtmodell und `p` (mm) sichtbar sind (wie Zoomen von Hand). */
      draht_einpassen: (p?: [number, number, number]) => {
        const box = app.huelleAlle();
        const pts = [box?.min, box?.max, p].filter((x): x is [number, number, number] => !!x);
        if (!pts.length) return;
        const min = [0, 1, 2].map((i) => Math.min(...pts.map((q) => q[i] as number))) as [
          number,
          number,
          number,
        ];
        const max = [0, 1, 2].map((i) => Math.max(...pts.map((q) => q[i] as number))) as [
          number,
          number,
          number,
        ];
        app.szene?.passeEin({ min, max }, 0);
        app.rendernSofort();
      },
      // Skizze und Hochziehen (ap-53): Rohdaten für `pruefen -- skizze …`
      skizze: () => {
        const s = app.skizze;
        const sz = app.szene;
        const lage = sz?.kameraLage();
        const bereiche = s.bereiche();
        const kontur: { element: string; art: string; farbe: string }[] = [];
        const akzent = tokens[`farbe.${app.thema}.akzent`];
        if (s.hover && s.hover !== s.bereichWahl?.element)
          kontur.push({ element: s.hover, art: 'hover', farbe: akzent });
        if (s.bereichWahl)
          kontur.push({ element: s.bereichWahl.element, art: 'auswahl', farbe: akzent });
        const gh = s.geistHuelle();
        return {
          skizze_offen: s.offen,
          werkzeug: s.werkzeug,
          fang: { ...s.fang },
          wertfeld: { ...s.wertfeld },
          kamera: lage
            ? {
                ...lage,
                azimut_deg: sz?.kamera.azimut ?? 0,
                elevation_deg: sz?.kamera.hoehe ?? 0,
              }
            : null,
          ansichtswuerfel: sz?.ansichtswuerfel() ?? { achsen: [] },
          bereiche: bereiche.map((b) => ({
            element: b.element,
            skizze: b.skizze,
            punkt: b.punkt,
            flaeche: b.flaeche,
          })),
          bereich_wahl: s.bereichWahl,
          kontur,
          linienbreiten: { ...s.linienbreiten },
          geister: gh
            ? [
                {
                  element: s.hoch?.extrude ?? 'neu',
                  art: 'koerper',
                  huelle_mm: gh,
                  hoehe_mm: s.hoch?.hoehe,
                },
              ]
            : [],
          griff: s.griffBildschirm(),
          hover_seit: s.hoverSeit,
        };
      },
      skizze_bildschirm: (id: string, uv: [number, number]) => app.skizze.bildschirm(id, uv),
      skizze_messen: (n: number, pos: [number, number][]) => app.szene?.messeStrahl(n, pos) ?? [],
      /** Element wählen wie per Klick in der Struktur (Prüfschritte mit `element`). */
      skizze_waehlen: (id: string) => {
        app.skizze.bereichWahl = null;
        app.waehle(id, 'setzen');
        app.rendernSofort();
      },
      skizze_hover_ms: () => app.skizze.hoverMs,
      draht_bereit: () => app.draht.bereit(),
      /** Ansicht verschieben (Maßstab bleibt), bis der Skizzenpunkt in der Mitte liegt – wie Verschieben von Hand. */
      skizze_zeigen: (id: string, uv: [number, number]) => {
        const sz = app.szene;
        const e = app.skizze.ebeneDerSkizze(id);
        if (!sz || !e) return;
        const p = app.skizze.welt(e, uv);
        const q = sz.projiziere(p);
        const r = sz.canvas.getBoundingClientRect();
        sz.schieben(r.left + r.width / 2 - q.x, r.top + r.height / 2 - q.y);
        app.rendernSofort();
      },
      wuerfel_punkt: (s: string) => app.szene?.wuerfelPunkt(s) ?? null,
    }),
  });

  // Ansichtsquelle mit sechs Achsen (später 3D-Maus): bewegt nur die Kamera, nie Auswahl oder Werte.
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
        app.szene?.drehen(a.ry ?? 0, a.rx ?? 0);
        if (a.tx || a.ty) app.szene?.schieben(a.tx ?? 0, a.ty ?? 0);
        if (a.tz) app.szene?.zoomen(Math.exp((a.tz ?? 0) * 0.01));
      },
    }),
  });

  await document.fonts.ready;
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  app.rendernSofort();
  document.documentElement.dataset.bereit = '1';
}

void start();
