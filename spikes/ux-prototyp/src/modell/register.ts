// Befehlsregister (Daten) und Ausführung mit Protokoll, Rückgängig und Wiederholen.
import befehleDaten from '../befehle.json';
import { aktiverEntwurf, anwenden, eintragen, unterschiede } from './entwurf';
import { testprojekt, type Projekt } from './projekt';

export interface Befehl {
  id: string;
  titel: string;
  kuerzel?: string;
  parameter?: Record<string, { typ?: string; dimension?: string; einheit?: string }>;
}

export type Quelle = 'mensch' | 'ki';

export interface Eintrag {
  befehl: string;
  parameter: Record<string, unknown>;
  quelle: Quelle;
}

/** Wirkung eines Befehls: ändert den Entwurf des Projekts (eine Kopie) und die Auswahl. */
export type Wirkung = (projekt: Projekt, parameter: Record<string, unknown>) => void;

export const befehle = befehleDaten.befehle as Befehl[];

const kopie = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

export class Sitzung {
  private stand: Projekt;
  private zurueck: Projekt[] = [];
  private vor: Projekt[] = [];
  private readonly wirkungen = new Map<string, Wirkung>();
  readonly protokoll: Eintrag[] = [];

  constructor(start: Projekt = testprojekt()) {
    this.stand = start;
  }

  modell(): Projekt {
    return kopie(this.stand);
  }

  /** Der gezeigte Stand: der aktive Entwurf oder der Hauptstand. */
  angezeigt(): Projekt {
    const entwurf = aktiverEntwurf(this.stand);
    return entwurf ? anwenden(this.stand, entwurf) : this.modell();
  }

  setzen(projekt: Projekt): void {
    this.stand = projekt;
    this.zurueck = [];
    this.vor = [];
  }

  registriere(id: string, wirkung: Wirkung): void {
    if (!befehle.some((b) => b.id === id)) throw new Error(`Unbekannter Befehl: ${id}`);
    this.wirkungen.set(id, wirkung);
  }

  /** Führt einen Befehl aus und schreibt ihn ins Protokoll. Rückgängig und Wiederholen sind eigene Befehle. */
  ausfuehren(id: string, parameter: Record<string, unknown> = {}, quelle: Quelle = 'mensch'): void {
    if (id === 'bearbeiten.rueckgaengig') return this.rueckgaengig(parameter, quelle);
    if (id === 'bearbeiten.wiederholen') return this.wiederholen(parameter, quelle);
    const wirkung = this.wirkungen.get(id);
    this.protokoll.push({ befehl: id, parameter, quelle });
    if (!wirkung) return;
    const neu = kopie(this.stand);
    const entwurf = id === 'element.wert-setzen' ? aktiverEntwurf(neu) : undefined;
    if (entwurf) {
      // Im Entwurf ändern Werte nur den Entwurf, nie den Hauptstand.
      const basis = anwenden(neu, entwurf);
      const geaendert = kopie(basis);
      wirkung(geaendert, parameter);
      eintragen(entwurf, unterschiede(basis, geaendert));
    } else {
      wirkung(neu, parameter);
    }
    if (JSON.stringify(neu) !== JSON.stringify(this.stand)) {
      this.zurueck.push(this.stand);
      this.vor = [];
      this.stand = neu;
    }
  }

  private rueckgaengig(parameter: Record<string, unknown>, quelle: Quelle): void {
    this.protokoll.push({ befehl: 'bearbeiten.rueckgaengig', parameter, quelle });
    const frueher = this.zurueck.pop();
    if (!frueher) return;
    this.vor.push(this.stand);
    this.stand = frueher;
  }

  private wiederholen(parameter: Record<string, unknown>, quelle: Quelle): void {
    this.protokoll.push({ befehl: 'bearbeiten.wiederholen', parameter, quelle });
    const spaeter = this.vor.pop();
    if (!spaeter) return;
    this.zurueck.push(this.stand);
    this.stand = spaeter;
  }
}
