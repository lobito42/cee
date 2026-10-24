// Wirkung der Befehle: Änderungen am Graphen (mit Verlauf und Protokoll) und an der Ansicht (ohne beides).
import { App, PROFILE, type Weg } from './app';
import {
  alleElemente,
  elternVon,
  finde,
  istVerworfen,
  kopie,
  nachfahren,
  neueId,
  wert,
  type Adresse,
  type Element,
} from './modell/element';

const DARSTELLUNGEN = ['koerper', 'kanten', 'durchsicht'] as const;

function ids(app: App, par: Record<string, unknown>): string[] {
  if (typeof par.element === 'string') return [par.element];
  if (Array.isArray(par.elemente)) return par.elemente.map(String);
  return app.auswahlIds();
}

/** Tiefe Kopie eines Teilbaums mit neuen IDs. */
function kopiereBaum(dok: Element, e: Element): Element {
  const k = kopie(e);
  const vergeben = new Set(alleElemente(dok).map((x) => x.id));
  const neu = (id: string) => {
    let n = 2;
    let kandidat = `${id}-${n}`;
    while (vergeben.has(kandidat)) kandidat = `${id}-${(n += 1)}`;
    vergeben.add(kandidat);
    return kandidat;
  };
  const lauf = (x: Element) => {
    x.id = neu(x.id.replace(/-\d+$/, ''));
    for (const c of x.content) lauf(c);
  };
  lauf(k);
  return k;
}

const buchstabe = (n: number): string => String.fromCharCode(65 + (n % 26));

export function wirkungenRegistrieren(app: App): void {
  const r = app.registriere.bind(app);
  const t = app.t;

  // --- Graph (Schicht 1): Verlauf und Protokoll ----------------------------------------------------

  r('element.anlegen', (par, weg, quelle) => {
    const typ = typeof par.typ === 'string' ? par.typ : 'teil';
    const id = app.neuesElement(typ);
    app.protokolliere('element.anlegen', { typ }, weg, quelle);
    app.auswahl = [{ element_id: id }];
    app.meldung('rueck.angelegt', { name: app.name(id) });
  });

  r('baugruppe.anlegen', (_par, weg, quelle) => {
    const id = app.neuesElement('baugruppe');
    app.protokolliere('baugruppe.anlegen', {}, weg, quelle);
    app.auswahl = [{ element_id: id }];
    app.meldung('rueck.angelegt', { name: app.name(id) });
  });

  r('element.umbenennen', (par, weg, quelle) => {
    const gewaehlt = typeof par.element === 'string' ? par.element : app.auswahlIds()[0];
    if (!gewaehlt || (typeof par.element !== 'string' && app.auswahlIds().length !== 1))
      return false;
    if (typeof par.name !== 'string') {
      app.umbenennen = { id: gewaehlt, weg };
      app.auswahl = [{ element_id: gewaehlt }];
      return;
    }
    const name = par.name.trim();
    app.umbenennen = null;
    if (!name) return false;
    const ok = app.aendern((d) => {
      const e = finde(d, gewaehlt);
      if (e) e.meta.name = name;
    });
    if (ok) {
      app.protokolliere('element.umbenennen', { element: gewaehlt, name }, weg, quelle);
      app.meldung('rueck.umbenannt', { name });
    }
    return ok;
  });

  const duplizieren =
    (befehl: string) => (par: Record<string, unknown>, weg: Weg, quelle: 'mensch' | 'ki') => {
      const liste = ids(app, par);
      const neue: string[] = [];
      const ok = app.aendern((dok) => {
        for (const id of liste) {
          const e = finde(dok, id);
          const eltern = e ? elternVon(dok, id) : undefined;
          if (!e || !eltern) continue;
          const k = kopiereBaum(dok, e);
          k.meta.name = `${e.meta.name} ${t('name.kopie')}`;
          if (k.params.lage_y !== undefined || k.params.breite !== undefined) {
            const dy = k.params.breite ? wert(k.params.breite) + 6 : 20;
            k.params.lage_y = { value: wert(k.params.lage_y) + dy, unit: 'mm' };
          } else if (k.params.lage_x !== undefined) {
            k.params.lage_x = { value: wert(k.params.lage_x) + 100, unit: 'mm' };
          }
          eltern.content.splice(eltern.content.indexOf(e) + 1, 0, k);
          neue.push(k.id);
        }
      });
      if (ok) {
        app.protokolliere(
          befehl,
          liste.length === 1 ? { element: liste[0] } : { elemente: liste },
          weg,
          quelle,
        );
        app.auswahl = neue.map((element_id): Adresse => ({ element_id }));
        app.meldung('rueck.dupliziert', { name: app.name(neue[0] ?? '') });
      }
      return ok;
    };
  r('element.duplizieren', duplizieren('element.duplizieren'));
  r('auswahl.duplizieren', duplizieren('auswahl.duplizieren'));

  const verwerfen =
    (befehl: string) => (par: Record<string, unknown>, weg: Weg, quelle: 'mensch' | 'ki') => {
      const liste = ids(app, par).filter(
        (i) => app.find(i) && !istVerworfen(app.find(i) as Element),
      );
      if (!liste.length) return false;
      const namen = liste.map((i) => app.name(i));
      const ok = app.aendern((dok) => {
        for (const id of liste) {
          const e = finde(dok, id);
          if (e) e.meta.verworfen = true;
        }
      });
      if (ok) {
        app.protokolliere(
          befehl,
          liste.length === 1 ? { element: liste[0] } : { elemente: liste },
          weg,
          quelle,
        );
        app.auswahl = app.auswahl.filter((a) => !liste.includes(a.element_id));
        if (app.aktiv && liste.includes(app.aktiv)) app.aktiv = null;
        app.meldung('rueck.verworfen', { name: namen[0] ?? '' });
      }
      return ok;
    };
  r('element.verwerfen', verwerfen('element.verwerfen'));
  r('auswahl.verwerfen', verwerfen('auswahl.verwerfen'));

  r('element.zurueckholen', (par, weg, quelle) => {
    const liste = ids(app, par);
    const ok = app.aendern((dok) => {
      for (const id of liste) {
        const e = finde(dok, id);
        if (e) delete e.meta.verworfen;
      }
    });
    if (ok) {
      app.protokolliere('element.zurueckholen', { element: liste[0] }, weg, quelle);
      app.meldung('rueck.zurueckgeholt', { name: app.name(liste[0] ?? '') });
    }
    return ok;
  });

  r('element.wert-setzen', (par, weg, quelle) => {
    const id = typeof par.element === 'string' ? par.element : app.auswahlIds()[0];
    if (!id || typeof par.name !== 'string' || !par.wert) {
      app.fokusEigenschaften = true;
      return false;
    }
    return app.wertSetzen(id, par.name, par.wert as { value: number; unit: 'mm' }, weg, quelle);
  });

  const pausieren =
    (an: boolean) => (par: Record<string, unknown>, weg: Weg, quelle: 'mensch' | 'ki') => {
      const liste = ids(app, par);
      const ok = app.aendern((dok) => {
        for (const id of liste) {
          const e = finde(dok, id);
          if (!e) continue;
          if (an) e.meta.pausiert = true;
          else delete e.meta.pausiert;
        }
      });
      if (ok)
        app.protokolliere(
          an ? 'element.pausieren' : 'element.fortsetzen',
          { element: liste[0] },
          weg,
          quelle,
        );
      return ok;
    };
  r('element.pausieren', pausieren(true));
  r('element.fortsetzen', pausieren(false));

  r('element.umhaengen', (par, weg, quelle) => {
    const id = typeof par.element === 'string' ? par.element : app.auswahlIds()[0];
    if (!id) return false;
    if (typeof par.ziel !== 'string') {
      app.umhaengenModus = id;
      app.meldung('rueck.ziel-waehlen');
      return;
    }
    const ziel = par.ziel;
    app.umhaengenModus = null;
    const pruefung = app.ablegenPruefen(id, ziel);
    if (!pruefung.erlaubt) {
      app.meldung(pruefung.grund ?? 'dnd.kein-ziel');
      return false;
    }
    const ok = app.aendern((dok) => {
      const e = finde(dok, id);
      const alt = e ? elternVon(dok, id) : undefined;
      const neu = ziel === dok.id ? dok : finde(dok, ziel);
      if (!e || !alt || !neu) return;
      alt.content.splice(alt.content.indexOf(e), 1);
      neu.content.push(e);
    });
    if (ok) {
      app.protokolliere('element.umhaengen', { element: id, ziel }, weg, quelle);
      app.meldung('rueck.umgehaengt', { name: app.name(id), ziel: app.name(ziel) });
    }
    return ok;
  });

  r('ansicht.speichern', (_par, weg, quelle) => {
    const k = app.szene?.kamera;
    if (!k) return false;
    const vorhandene = alleElemente(app.dokument()).filter((e) => e.type === 'view').length;
    const name = `${t('name.ansicht')}: ${t('name.schnitt')} ${buchstabe(vorhandene)}`;
    let neu = '';
    const ok = app.aendern((dok) => {
      neu = neueId(dok, 'ansicht');
      const e: Element = {
        id: neu,
        type: 'view',
        params: {
          azimut: { value: k.azimut, unit: '°' },
          hoehe: { value: k.hoehe, unit: '°' },
          abstand: { value: k.abstand, unit: 'mm' },
          ziel_x: { value: k.ziel.x, unit: 'mm' },
          ziel_y: { value: k.ziel.y, unit: 'mm' },
          ziel_z: { value: k.ziel.z, unit: 'mm' },
          projektion: app.projektionsart,
          darstellung: app.darstellung,
          auswahl: kopie(app.auswahl),
          ausgeblendet: [...app.ausgeblendet],
        },
        content: [],
        meta: { name },
      };
      dok.content.push(e);
    });
    if (ok) {
      app.protokolliere('ansicht.speichern', { name }, weg, quelle);
      app.meldung('rueck.ansicht-gespeichert', { name });
    }
    return ok;
  });

  // --- Verlauf --------------------------------------------------------------------------------------

  r('bearbeiten.rueckgaengig', (_p, weg, quelle) => {
    app.rueckgaengig(weg, quelle);
  });
  r('bearbeiten.wiederholen', (_p, weg, quelle) => {
    app.wiederholen(weg, quelle);
  });

  // --- Auswahl (Ansicht) ------------------------------------------------------------------------------

  r('auswahl.alles', () => {
    app.setzeAuswahl(app.waehlbareIds().map((element_id): Adresse => ({ element_id })));
  });
  r('auswahl.aufheben', () => app.setzeAuswahl([]));
  r('auswahl.umkehren', () => {
    const jetzt = new Set(app.auswahlIds());
    app.setzeAuswahl(
      app
        .waehlbareIds()
        .filter((i) => !jetzt.has(i))
        .map((element_id): Adresse => ({ element_id })),
    );
  });
  const auswahlMit =
    (modus: 'setzen' | 'hinzufuegen' | 'umschalten') => (par: Record<string, unknown>) => {
      const liste = Array.isArray(par.elemente) ? par.elemente.map(String) : [];
      if (!liste.length) {
        app.meldung('rueck.auswahl-ziel');
        return false;
      }
      liste.forEach((id, i) => app.waehle(id, modus === 'setzen' && i > 0 ? 'hinzufuegen' : modus));
    };
  r('auswahl.setzen', auswahlMit('setzen'));
  r('auswahl.hinzufuegen', auswahlMit('hinzufuegen'));
  r('auswahl.umschalten', auswahlMit('umschalten'));

  // --- Sichtbarkeit --------------------------------------------------------------------------------------

  r('element.ausblenden', (par) => {
    for (const id of ids(app, par)) app.ausgeblendet.add(id);
  });
  r('auswahl.ausblenden', (par) => {
    for (const id of ids(app, par)) app.ausgeblendet.add(id);
  });
  r('element.einblenden', (par) => {
    for (const id of ids(app, par)) app.ausgeblendet.delete(id);
  });
  r('ansicht.alles-einblenden', () => {
    app.ausgeblendet.clear();
    app.isoliert = null;
  });
  r('ansicht.verworfenes', () => {
    app.verworfenesZeigen = !app.verworfenesZeigen;
  });
  r('ansicht.isolieren', () => {
    if (app.isoliert) app.isoliert = null;
    else if (app.auswahlIds().length) app.isoliert = app.auswahlIds();
    else app.meldung('rueck.isolieren-ziel');
  });

  // --- Aktiv ---------------------------------------------------------------------------------------------------

  r('element.aktivieren', (par) => {
    const id = typeof par.element === 'string' ? par.element : app.auswahlIds()[0];
    const e = id ? app.find(id) : undefined;
    if (!e) return false;
    app.aktiv = e.id;
    app.auswahl = [];
  });
  r('element.verlassen', () => {
    app.aktiv = null;
  });

  // --- Kamera ----------------------------------------------------------------------------------------------------

  r('ansicht.einpassen', () => app.szene?.passeEin(app.huelleAlle(), 200 * app.tempo));
  r('ansicht.auf-auswahl', () => {
    const box = app.huelleAuswahl();
    app.szene?.passeEin(box ?? app.huelleAlle(), 200 * app.tempo);
  });
  r('ansicht.projektion', () => {
    app.projektionsart = app.projektionsart === 'orthogonal' ? 'perspektivisch' : 'orthogonal';
    app.szene?.setProjektion(app.projektionsart);
  });
  r('darstellung.wechseln', () => {
    const i = DARSTELLUNGEN.indexOf(app.darstellung);
    app.darstellung = DARSTELLUNGEN[(i + 1) % DARSTELLUNGEN.length] ?? 'koerper';
  });
  const blick = (azimut: number, hoehe: number) => () =>
    app.szene?.nach({ azimut, hoehe }, 200 * app.tempo);
  r('ansicht.vorne', blick(0, 0));
  r('ansicht.oben', blick(0, 89));
  r('ansicht.isometrisch', blick(-35, 28));

  r('ansicht.anwenden', (par) => {
    const id = typeof par.element === 'string' ? par.element : app.auswahlIds()[0];
    const v = id ? app.find(id) : undefined;
    if (!v || v.type !== 'view' || !app.szene) return false;
    const p = v.params;
    app.projektionsart = p.projektion === 'perspektivisch' ? 'perspektivisch' : 'orthogonal';
    app.szene.setProjektion(app.projektionsart);
    app.darstellung =
      p.darstellung === 'kanten' || p.darstellung === 'durchsicht' ? p.darstellung : 'koerper';
    app.ausgeblendet = new Set<string>((p.ausgeblendet as string[] | undefined) ?? []);
    app.auswahl = kopie((p.auswahl as Adresse[] | undefined) ?? []);
    app.setzeKamera({
      azimut: wert(p.azimut),
      hoehe: wert(p.hoehe),
      abstand: wert(p.abstand),
      ziel: { x: wert(p.ziel_x), y: wert(p.ziel_y), z: wert(p.ziel_z) },
    });
  });

  // --- Fenster und Einstellungen ---------------------------------------------------------------------------------------

  r('fenster.struktur', () => {
    app.zonen.struktur = !app.zonen.struktur;
  });
  r('fenster.panel', () => {
    app.zonen.panel = !app.zonen.panel;
  });
  r('fenster.rechts', () => {
    app.zonen.rechts = !app.zonen.rechts;
  });
  r('fenster.naechste-zone', () => app.naechsteZone());
  r('suche.oeffnen', () => {
    app.suche = { offen: true, text: '', index: 0, alle: false, fokussiert: false };
  });
  r('hilfe.befehle-zeigen', () => {
    app.suche = { offen: true, text: '', index: 0, alle: true, fokussiert: false };
  });
  r('thema.umschalten', () => {
    app.thema = app.thema === 'hell' ? 'dunkel' : 'hell';
    document.documentElement.dataset.thema = app.thema;
    app.szene?.setThema(app.thema);
  });
  r('einstellung.navigationsprofil', (par) => {
    const ziel =
      typeof par.profil === 'string' && PROFILE.includes(par.profil) ? par.profil : undefined;
    const i = PROFILE.indexOf(app.profil);
    app.profil = ziel ?? PROFILE[(i + 1) % PROFILE.length] ?? app.profil;
  });
  r('katalog.oeffnen', (par) => {
    app.katalogOffen = typeof par.baustein === 'string' ? par.baustein : '';
  });
  r('task.wechseln', (par) => {
    app.task = par.task === 'simulation' ? 'simulation' : 'modellieren';
  });
  r('dokument.wechseln', (par) => {
    if (typeof par.dok === 'string') app.wechsleDokument(par.dok);
  });
}

export { nachfahren };
