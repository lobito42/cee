// Eingaben der Zonen (Maus, Tastatur, Touch) → Befehle. Delegiert an der Wurzel; die Zonen bauen nur DOM.
import { App, type Weg } from './app';
import type { Fenster } from './fenster';
import { entscheideNavigation, erkenneWheel } from './eingabe/navigation';
import { lesen } from './wert/wertfeld';
import { kontextmenue, type Auswahlart } from './modell/register';
import { pfadZu, wert } from './modell/element';
import { griffRichtung } from './griffe';
import { leseGroesse, type Dimension } from './drahtmodell/draht';

const SCHWELLE_PX = 4;

function par(el: Element): Record<string, unknown> {
  try {
    return JSON.parse((el as HTMLElement).dataset.par ?? '{}') as Record<string, unknown>;
  } catch {
    return {};
  }
}

function wegVon(el: Element): Weg {
  const w = el.closest<HTMLElement>('[data-weg]');
  return (w?.dataset.weg as Weg | undefined) ?? 'menue';
}

export function steuerungAnbinden(app: App, fenster: Fenster): void {
  const wurzel = document.getElementById('app') as HTMLElement;
  const modell = fenster.zonen.modell;
  const struktur = fenster.zonen.struktur;
  let klickUnterdruecken = false;

  /** Doppelklick oder Enter auf eine Zeile: Ansichten werden angewendet, alles andere wird aktiv. */
  const zeileOeffnen = (id: string): void => {
    const ansicht = app.find(id)?.type === 'view';
    app.ausfuehren(
      ansicht ? 'ansicht.anwenden' : 'element.aktivieren',
      { element: id },
      'struktur',
    );
  };

  const offenesSchliessen = (): boolean => {
    let war = false;
    if (app.kontextMenue?.mehrOffen) {
      // Erster Esc schließt nur die zweite Ebene, der Fokus kehrt zu „Mehr …“ zurück
      app.kontextMenue.mehrOffen = false;
      app.kontextMenue.fokus = 'mehr';
      app.rendern();
      return true;
    }
    if (app.menue) {
      app.menue = null;
      war = true;
    }
    if (app.kontextMenue) {
      app.kontextMenue = null;
      war = true;
    }
    if (app.suche.offen) {
      app.suche.offen = false;
      war = true;
    }
    if (war) app.rendern();
    return war;
  };
  app.offenesSchliessen = offenesSchliessen;

  // --- Klicks -----------------------------------------------------------------------------------------

  wurzel.addEventListener('click', (e) => {
    const ziel = e.target as HTMLElement;
    if (klickUnterdruecken) {
      klickUnterdruecken = false;
      return;
    }
    const trigger = ziel.closest<HTMLElement>('[data-menue-trigger]');
    if (trigger) {
      const id = trigger.dataset.menueTrigger as string;
      app.kontextMenue = null;
      app.suche.offen = false;
      app.menue = app.menue === id ? null : id;
      app.rendern();
      return;
    }
    const mehr = ziel.closest<HTMLElement>('[data-mehr-toggle]');
    if (mehr && app.kontextMenue) {
      app.kontextMenue.mehrOffen = !app.kontextMenue.mehrOffen;
      app.kontextMenue.fokus = app.kontextMenue.mehrOffen ? 'zweite-ebene' : 'mehr';
      app.rendern();
      return;
    }
    if (ziel.closest('[data-suche-folgt-alle]')) {
      app.sucheFolgtAlle = true;
      app.rendern();
      return;
    }
    const element = ziel.closest<HTMLElement>('[data-suche-element]');
    if (element) {
      app.suche.offen = false;
      app.waehle(element.dataset.sucheElement as string, 'setzen');
      return;
    }
    const knopf = ziel.closest<HTMLElement>('[data-befehl]');
    if (knopf && !(knopf instanceof HTMLInputElement)) {
      if (knopf.getAttribute('aria-disabled') === 'true' && knopf.dataset.folgt !== 'true') return;
      app.ausfuehren(knopf.dataset.befehl as string, par(knopf), wegVon(knopf));
      return;
    }
    const zeile = ziel.closest<HTMLElement>('[role="treeitem"]');
    if (zeile) {
      const id = zeile.dataset.id as string;
      if (app.umhaengenModus) {
        app.ausfuehren('element.umhaengen', { element: app.umhaengenModus, ziel: id }, 'struktur');
        return;
      }
      app.offenesSchliessen?.();
      app.waehle(id, e.shiftKey ? 'hinzufuegen' : e.ctrlKey || e.metaKey ? 'umschalten' : 'setzen');
      zeile.focus();
      return;
    }
    if (
      ziel.closest('[data-zone="struktur"]') &&
      !ziel.closest('.zonenkopf, .wurzel, .popup, [data-muster]')
    ) {
      app.setzeAuswahl([]);
      return;
    }
    if (ziel.closest('[data-zone="modell"]') && !ziel.closest('[data-chrome], .griff, .popup')) {
      modellKlick(e);
      return;
    }
    if (!ziel.closest('.popup, .suche-eintrag, .menue-eintrag')) offenesSchliessen();
  });

  function modellKlick(e: MouseEvent): void {
    offenesSchliessen();
    const modus = e.shiftKey ? 'hinzufuegen' : e.ctrlKey || e.metaKey ? 'umschalten' : 'setzen';
    if (app.draht.klick(e.clientX, e.clientY, modus)) {
      modell.focus({ preventScroll: true });
      app.rendern();
      return;
    }
    const t = app.szene?.trefferBei(e.clientX, e.clientY);
    if (!t) {
      if (modus === 'setzen') app.setzeAuswahl([]);
      return;
    }
    const ziel = app.zielFuerTreffer(t.elementId);
    if (!ziel) {
      if (modus === 'setzen') app.setzeAuswahl([]);
      return;
    }
    const kante = app.kanteBei(ziel, e.clientX, e.clientY);
    app.waehle(ziel, modus, kante ?? undefined);
    modell.focus({ preventScroll: true });
  }

  wurzel.addEventListener('dblclick', (e) => {
    const ziel = e.target as HTMLElement;
    const zeile = ziel.closest<HTMLElement>('[role="treeitem"]');
    if (zeile && !ziel.closest('button')) {
      zeileOeffnen(zeile.dataset.id as string);
      return;
    }
    const name = ziel.closest<HTMLElement>('[data-name-feld]');
    if (name) {
      app.ausfuehren('element.umbenennen', { element: name.dataset.nameFeld }, 'eigenschaften');
      return;
    }
    if (ziel.closest('[data-zone="modell"]') && !ziel.closest('[data-chrome], .griff, .popup')) {
      const t = app.szene?.trefferBei(e.clientX, e.clientY);
      const id = t ? app.zielFuerTreffer(t.elementId) : null;
      if (id) app.ausfuehren('element.aktivieren', { element: id }, 'menue');
    }
  });

  // --- Kontextmenü ------------------------------------------------------------------------------------------

  function kontextOeffnen(x: number, y: number): void {
    const art: Auswahlart = app.auswahlart();
    const menue = kontextmenue(app.register, art, (b) => app.anwendbar(b));
    app.menue = null;
    app.suche.offen = false;
    const breite = 260;
    const hoehe = 420;
    app.kontextMenue = {
      x: Math.max(4, Math.min(x, window.innerWidth - breite - 4)),
      y: Math.max(4, Math.min(y, window.innerHeight - hoehe - 4)),
      art,
      menue,
      mehrOffen: false,
    };
    app.rendern();
  }
  app.kontextOeffnen = kontextOeffnen;

  let rechtsGedrueckt = false;
  let ausstehend: { x: number; y: number } | null = null;

  function modellKontext(x: number, y: number): void {
    if (app.draht.kontext(x, y)) {
      kontextOeffnen(x, y);
      return;
    }
    const t = app.szene?.trefferBei(x, y);
    const id = t ? app.zielFuerTreffer(t.elementId) : null;
    if (id) {
      const kante = app.kanteBei(id, x, y);
      // Rechtsklick auf etwas im bereits Gewählten (auch in einer gewählten Baugruppe) behält die Auswahl.
      const pfad = pfadZu(app.dokument(), t?.elementId ?? id).map((q) => q.id);
      const schon = app.auswahl.some((a) => pfad.includes(a.element_id));
      if (!schon || kante) app.waehle(id, 'setzen', kante ?? undefined);
    } else app.setzeAuswahl([]);
    kontextOeffnen(x, y);
  }

  wurzel.addEventListener('contextmenu', (e) => {
    const ziel = e.target as HTMLElement;
    const zeile = ziel.closest<HTMLElement>('[role="treeitem"]');
    if (zeile) {
      e.preventDefault();
      const id = zeile.dataset.id as string;
      if (!app.auswahlIds().includes(id)) app.waehle(id, 'setzen');
      kontextOeffnen(e.clientX, e.clientY);
      return;
    }
    if (ziel.closest('[data-zone="struktur"]') && !ziel.closest('.popup')) {
      e.preventDefault();
      app.setzeAuswahl([]);
      kontextOeffnen(e.clientX, e.clientY);
      return;
    }
    if (ziel.closest('[data-zone="modell"]') && !ziel.closest('[data-chrome], .popup')) {
      e.preventDefault();
      // Unter Linux kommt das Ereignis schon beim Drücken: erst beim Loslassen entscheiden, ob es ein Ziehen war.
      if (rechtsGedrueckt) {
        ausstehend = { x: e.clientX, y: e.clientY };
        return;
      }
      if (nav.bewegt) return;
      modellKontext(e.clientX, e.clientY);
      return;
    }
    if (ziel.closest('.popup')) e.preventDefault();
  });

  // --- Zeigerbewegung: Überfahren, Ziehen & Ablegen, Navigation, Griff ----------------------------------------

  let dndStart: { id: string; x: number; y: number } | null = null;
  const nav = {
    art: null as null | 'drehen' | 'verschieben',
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    bewegt: false,
    pointerId: -1,
  };
  const finger = new Map<number, { x: number; y: number }>();
  let fingerStand: { cx: number; cy: number; d: number } | null = null;

  const setzeHover = (id: string | null) => {
    if (app.hover !== id) {
      app.hover = id;
      app.rendern();
    }
  };

  wurzel.addEventListener('pointerdown', (e) => {
    const ziel = e.target as HTMLElement;
    const griff = ziel.closest<HTMLElement>('.griff');
    if (griff && e.button === 0) {
      griffStart(e, griff);
      return;
    }
    const zeile = ziel.closest<HTMLElement>('[role="treeitem"]');
    if (zeile && e.button === 0 && !ziel.closest('button, input')) {
      dndStart = { id: zeile.dataset.id as string, x: e.clientX, y: e.clientY };
      return;
    }
    if (ziel.closest('[data-zone="modell"]') && !ziel.closest('[data-chrome], .popup')) {
      if (e.pointerType === 'touch') {
        finger.set(e.pointerId, { x: e.clientX, y: e.clientY });
        fingerStand = fingerMasse();
        nav.art = finger.size === 1 ? 'drehen' : null;
        nav.x = e.clientX;
        nav.y = e.clientY;
        nav.startX = e.clientX;
        nav.startY = e.clientY;
        nav.bewegt = false;
        return;
      }
      const art = entscheideNavigation(app.profil, 'maus', {
        taste: e.button,
        umschalt: e.shiftKey,
        strg: e.ctrlKey || e.metaKey,
      });
      nav.art = art === 'drehen' || art === 'verschieben' ? art : null;
      nav.x = e.clientX;
      nav.y = e.clientY;
      nav.startX = e.clientX;
      nav.startY = e.clientY;
      nav.bewegt = false;
      nav.pointerId = e.pointerId;
      rechtsGedrueckt = e.button === 2;
      if (nav.art && e.button !== 0) e.preventDefault();
    }
  });

  function fingerMasse(): { cx: number; cy: number; d: number } | null {
    const p = [...finger.values()];
    if (p.length < 2) return null;
    const [a, b] = p as [{ x: number; y: number }, { x: number; y: number }];
    return { cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, d: Math.hypot(a.x - b.x, a.y - b.y) };
  }

  window.addEventListener('pointermove', (e) => {
    app.zeigerPos = { x: e.clientX, y: e.clientY };
    if (app.griff?.aktiv) {
      griffBewegen(e);
      return;
    }
    if (
      dndStart &&
      !app.dnd &&
      Math.hypot(e.clientX - dndStart.x, e.clientY - dndStart.y) > SCHWELLE_PX
    ) {
      app.dnd = { id: dndStart.id, x: e.clientX, y: e.clientY, ziel: null, erlaubt: null };
    }
    if (app.dnd) {
      dndBewegen(e);
      return;
    }
    if (e.pointerType === 'touch' && finger.has(e.pointerId)) {
      finger.set(e.pointerId, { x: e.clientX, y: e.clientY });
      fingerNavigation(e);
      return;
    }
    if (nav.art && e.buttons) {
      const dx = e.clientX - nav.x;
      const dy = e.clientY - nav.y;
      nav.x = e.clientX;
      nav.y = e.clientY;
      if (Math.hypot(e.clientX - nav.startX, e.clientY - nav.startY) > SCHWELLE_PX)
        nav.bewegt = true;
      if (!nav.bewegt) return;
      if (nav.art === 'drehen') app.szene?.drehen(-dx * 0.4, dy * 0.4);
      else app.szene?.schieben(dx, dy);
      return;
    }
    // Überfahren: Struktur und Modell zeigen es beidseitig
    const ziel = e.target as HTMLElement;
    if (!e.buttons) {
      const zeile = ziel.closest<HTMLElement>('[role="treeitem"]');
      if (zeile) return setzeHover(zeile.dataset.id as string);
      if (ziel.closest('[data-zone="modell"]') && !ziel.closest('[data-chrome], .popup')) {
        const t = app.szene?.trefferBei(e.clientX, e.clientY);
        return setzeHover(t ? app.zielFuerTreffer(t.elementId) : null);
      }
      setzeHover(null);
    }
  });

  function fingerNavigation(e: PointerEvent): void {
    if (finger.size === 1) {
      const dx = e.clientX - nav.x;
      const dy = e.clientY - nav.y;
      nav.x = e.clientX;
      nav.y = e.clientY;
      if (Math.hypot(e.clientX - nav.startX, e.clientY - nav.startY) > SCHWELLE_PX * 2)
        nav.bewegt = true;
      if (nav.bewegt && nav.art === 'drehen') app.szene?.drehen(-dx * 0.4, dy * 0.4);
      return;
    }
    const jetzt = fingerMasse();
    if (jetzt && fingerStand) {
      app.szene?.schieben(jetzt.cx - fingerStand.cx, jetzt.cy - fingerStand.cy);
      if (fingerStand.d > 0 && jetzt.d > 0 && Math.abs(jetzt.d - fingerStand.d) > 0.5)
        app.szene?.zoomen(jetzt.d / fingerStand.d, jetzt.cx, jetzt.cy);
    }
    fingerStand = jetzt;
    nav.bewegt = true;
  }

  window.addEventListener('pointerup', (e) => {
    if (rechtsGedrueckt && e.pointerType !== 'touch') {
      rechtsGedrueckt = false;
      const a = ausstehend;
      ausstehend = null;
      if (a && !nav.bewegt) modellKontext(a.x, a.y);
    }
    if (e.pointerType === 'touch') {
      finger.delete(e.pointerId);
      fingerStand = fingerMasse();
      if (!finger.size) nav.art = null;
    }
    if (app.griff?.aktiv) {
      griffLoslassen();
      return;
    }
    if (app.dnd) {
      dndLoslassen();
      return;
    }
    if (dndStart) dndStart = null;
    if (nav.art && e.pointerId === nav.pointerId) {
      klickUnterdrueckenWennBewegt();
      nav.art = null;
      // Rechtsklick ohne Bewegung öffnet das Kontextmenü (contextmenu-Ereignis folgt)
      setTimeout(() => {
        nav.bewegt = false;
      }, 0);
    }
  });

  function klickUnterdrueckenWennBewegt(): void {
    // Kein Klick-Ereignis nach Navigation mit der linken Taste (Profile mit Taste 0 gibt es derzeit nicht)
  }

  wurzel.addEventListener('pointerleave', () => setzeHover(null));
  struktur.addEventListener('pointerleave', () => setzeHover(null));

  // --- Ziehen & Ablegen ------------------------------------------------------------------------------------------

  function dndBewegen(e: PointerEvent): void {
    const dnd = app.dnd;
    if (!dnd) return;
    dnd.x = e.clientX;
    dnd.y = e.clientY;
    const unter = document.elementFromPoint(e.clientX, e.clientY);
    const zeile = unter?.closest<HTMLElement>('[role="treeitem"], [data-wurzel]');
    const zielId = zeile?.dataset.id ?? zeile?.dataset.wurzel ?? null;
    if (zielId && zielId !== dnd.id) {
      const p = app.ablegenPruefen(dnd.id, zielId);
      dnd.ziel = zielId;
      dnd.erlaubt = p.erlaubt;
      dnd.grund = p.grund;
      if (p.grund) app.meldung(p.grund);
    } else {
      dnd.ziel = null;
      dnd.erlaubt = null;
    }
    app.rendern();
  }

  function dndLoslassen(): void {
    const dnd = app.dnd;
    dndStart = null;
    if (!dnd) return;
    app.dnd = null;
    klickUnterdruecken = true;
    setTimeout(() => {
      klickUnterdruecken = false;
    }, 0);
    if (dnd.ziel && dnd.erlaubt) {
      app.ausfuehren('element.umhaengen', { element: dnd.id, ziel: dnd.ziel }, 'struktur');
    } else app.rendern();
  }

  app.dndAbbrechen = () => {
    if (!app.dnd) return false;
    app.dnd = null;
    dndStart = null;
    app.rendern();
    return true;
  };

  // --- Griff im Modell -----------------------------------------------------------------------------------------

  let griffDaten: { vx: number; vy: number; x0: number; y0: number } | null = null;

  function griffStart(e: PointerEvent, el: HTMLElement): void {
    const id = el.dataset.griff as string;
    const name = el.dataset.griffName as string;
    const element = app.find(id);
    if (!element) return;
    e.preventDefault();
    const r = griffRichtung(app, id);
    griffDaten = { vx: r.x, vy: r.y, x0: e.clientX, y0: e.clientY };
    const start = wert(element.params[name]);
    app.griff = {
      id,
      name,
      start,
      wert: start,
      eingabe: '',
      zeiger: { x: e.clientX, y: e.clientY },
      sichtbarBis: null,
      aktiv: true,
    };
    app.rendern();
  }

  function griffBewegen(e: PointerEvent): void {
    const g = app.griff;
    if (!g || !griffDaten) return;
    g.zeiger = { x: e.clientX, y: e.clientY };
    const l2 = griffDaten.vx ** 2 + griffDaten.vy ** 2 || 1;
    const delta =
      ((e.clientX - griffDaten.x0) * griffDaten.vx + (e.clientY - griffDaten.y0) * griffDaten.vy) /
      l2;
    g.wert = Math.max(1, Math.round(g.start + delta));
    g.eingabe = '';
    app.vorschau = { id: g.id, name: g.name, wert: { value: g.wert, unit: 'mm' } };
    app.rendern();
  }

  function griffLoslassen(): void {
    const g = app.griff;
    if (!g) return;
    app.griffUebernehmen();
  }

  // --- Mausrad, Trackpad ---------------------------------------------------------------------------------------

  modell.addEventListener(
    'wheel',
    (e) => {
      if ((e.target as HTMLElement).closest('[data-chrome], .popup')) return;
      e.preventDefault();
      const art = erkenneWheel(app.profil, e);
      if (art === 'zoomen') {
        const faktor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002));
        app.szene?.zoomen(faktor, e.clientX, e.clientY);
      } else if (art === 'verschieben') app.szene?.schieben(-e.deltaX, -e.deltaY);
      else if (art === 'drehen') app.szene?.drehen(-e.deltaX * 0.4, e.deltaY * 0.4);
    },
    { passive: false },
  );

  // --- Eingabefelder -----------------------------------------------------------------------------------------------

  wurzel.addEventListener('focusin', (e) => {
    const ziel = e.target as HTMLElement;
    if (ziel instanceof HTMLInputElement && ziel.dataset.feldEingabe) {
      ziel.setAttribute('data-editiert', '');
      ziel.select();
    }
    const zone = ziel.closest<HTMLElement>('[data-zone]');
    if (zone) app.fokusZone = zone.dataset.zone ?? null;
  });

  wurzel.addEventListener('focusout', (e) => {
    const ziel = e.target as HTMLElement;
    if (ziel instanceof HTMLInputElement && ziel.dataset.feldEingabe) {
      ziel.removeAttribute('data-editiert');
      feldUebernehmen(ziel, false);
    } else if (ziel instanceof HTMLInputElement && ziel.dataset.umbenennen) {
      ziel.removeAttribute('data-editiert');
      if (
        app.umbenennen &&
        ziel.value.trim() &&
        ziel.value.trim() !== app.name(ziel.dataset.umbenennen)
      ) {
        namenUebernehmen(ziel);
      } else if (app.umbenennen) {
        app.umbenennen = null;
        app.rendern();
      }
    }
  });

  wurzel.addEventListener('input', (e) => {
    const ziel = e.target as HTMLInputElement;
    if (ziel.dataset.feldEingabe) feldLive(ziel);
    else if (ziel.dataset.suchfeld !== undefined) {
      app.suche.text = ziel.value;
      app.suche.index = 0;
      app.suche.alle = false;
      app.sucheFolgtAlle = false;
      app.rendern();
    } else if (ziel.dataset.chatEingabe !== undefined) {
      app.chat.eingabe = ziel.value;
    }
  });

  /** Drahtmodell-Felder (ap-50): Länge oder Winkel mit Einheit; umgerechnet wird nur im Kern. */
  function drahtWert(ziel: HTMLInputElement): ReturnType<typeof leseGroesse> {
    return leseGroesse(ziel.value, ziel.dataset.dim as Dimension);
  }

  function feldLive(ziel: HTMLInputElement): void {
    const ids = (ziel.dataset.elemente ?? '').split(',').filter(Boolean);
    const name = ziel.dataset.param as string;
    if (ziel.dataset.dim) {
      app.feldBefund = drahtWert(ziel)
        ? null
        : { feld: ziel.dataset.feldEingabe as string, schluessel: 'wert.fehler.nicht-lesbar' };
      app.rendern();
      return;
    }
    const r = lesen(ziel.value);
    if (!r.ok) {
      app.feldBefund = { feld: ziel.dataset.feldEingabe as string, schluessel: r.fehler };
      app.vorschau = null;
      app.rendern();
      return;
    }
    app.feldBefund = null;
    if (ids.length === 1) app.vorschau = { id: ids[0] as string, name, wert: r.groesse };
    app.rendern();
  }

  function feldUebernehmen(ziel: HTMLInputElement, taste: boolean): void {
    const ids = (ziel.dataset.elemente ?? '').split(',').filter(Boolean);
    const name = ziel.dataset.param as string;
    if (ziel.dataset.dim) {
      const g = drahtWert(ziel);
      if (!g) {
        app.feldBefund = taste
          ? { feld: ziel.dataset.feldEingabe as string, schluessel: 'wert.fehler.nicht-lesbar' }
          : null;
        app.rendern();
        return;
      }
      app.feldBefund = null;
      app.ausfuehren(
        'element.wert-setzen',
        ids.length === 1 ? { element: ids[0], name, wert: g } : { elemente: ids, name, wert: g },
        'eigenschaften',
      );
      return;
    }
    const r = lesen(ziel.value);
    if (!r.ok) {
      app.feldBefund = { feld: ziel.dataset.feldEingabe as string, schluessel: r.fehler };
      if (!taste) {
        app.vorschau = null;
        app.feldBefund = null;
      }
      app.rendern();
      return;
    }
    app.feldBefund = null;
    app.vorschau = null;
    app.ausfuehren(
      'element.wert-setzen',
      ids.length === 1
        ? { element: ids[0], name, wert: r.groesse }
        : { elemente: ids, name, wert: r.groesse },
      'eigenschaften',
    );
  }

  function namenUebernehmen(ziel: HTMLInputElement): void {
    const wegen = app.umbenennen?.weg ?? 'eigenschaften';
    app.ausfuehren(
      'element.umbenennen',
      { element: ziel.dataset.umbenennen, name: ziel.value },
      wegen,
    );
  }

  wurzel.addEventListener('keydown', (e) => {
    const ziel = e.target as HTMLElement;
    if (ziel instanceof HTMLInputElement && ziel.dataset.feldEingabe) {
      if (e.key === 'Enter') {
        e.preventDefault();
        feldUebernehmen(ziel, true);
        ziel.blur();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        app.vorschau = null;
        app.feldBefund = null;
        ziel.removeAttribute('data-editiert');
        ziel.blur();
        app.rendern();
      }
      return;
    }
    if (ziel instanceof HTMLInputElement && ziel.dataset.umbenennen) {
      if (e.key === 'Enter') {
        e.preventDefault();
        ziel.removeAttribute('data-editiert');
        if (ziel.value.trim()) namenUebernehmen(ziel);
        else {
          app.umbenennen = null;
          app.rendern();
        }
        (fenster.zonen.eigenschaften as HTMLElement).focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        ziel.removeAttribute('data-editiert');
        app.umbenennen = null;
        app.rendern();
        (fenster.zonen.eigenschaften as HTMLElement).focus();
      }
      return;
    }
    if (ziel instanceof HTMLInputElement && ziel.dataset.suchfeld !== undefined) {
      suchTaste(e);
      return;
    }
    if (ziel instanceof HTMLInputElement && ziel.dataset.chatEingabe !== undefined) {
      if (e.key === 'Enter') {
        e.preventDefault();
        app.ausfuehren('chat.senden', { text: ziel.value }, 'chat');
      }
      return;
    }
    menueTaste(e);
    baumTaste(e);
  });

  function suchTaste(e: KeyboardEvent): void {
    const n = app.suchTreffer().length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      app.suche.index = Math.min(n - 1, app.suche.index + 1);
      app.rendern();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      app.suche.index = Math.max(0, app.suche.index - 1);
      app.rendern();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const b = app.suchTreffer()[app.suche.index];
      app.suche.offen = false;
      if (b) app.ausfuehren(b.id, {}, 'suche');
      else app.rendern();
    }
  }

  function menueTaste(e: KeyboardEvent): void {
    const popup = (e.target as HTMLElement).closest<HTMLElement>('.popup');
    if (!popup || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    const eintraege = [...popup.querySelectorAll<HTMLElement>('.eintrag:not([hidden] *)')].filter(
      (x) => x.offsetParent !== null,
    );
    const i = eintraege.indexOf(e.target as HTMLElement);
    const naechst =
      eintraege[(i + (e.key === 'ArrowDown' ? 1 : -1) + eintraege.length) % eintraege.length];
    if (naechst) {
      e.preventDefault();
      naechst.focus();
    }
  }

  function baumTaste(e: KeyboardEvent): void {
    const zeile = (e.target as HTMLElement).closest<HTMLElement>('[role="treeitem"]');
    if (!zeile) return;
    const zeilen = [...struktur.querySelectorAll<HTMLElement>('[role="treeitem"]')];
    const i = zeilen.indexOf(zeile);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const n =
        zeilen[Math.max(0, Math.min(zeilen.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))];
      for (const z of zeilen) z.tabIndex = -1;
      if (n) {
        n.tabIndex = 0;
        n.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      zeileOeffnen(zeile.dataset.id as string);
    } else if (e.key === ' ') {
      e.preventDefault();
      app.waehle(
        zeile.dataset.id as string,
        e.shiftKey ? 'hinzufuegen' : e.ctrlKey || e.metaKey ? 'umschalten' : 'setzen',
      );
    }
  }
}
