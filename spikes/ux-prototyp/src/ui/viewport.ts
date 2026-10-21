// 3D-Fläche (three.js): Teile als Quader, Farben aus den Tokens des aktuellen Themas.
import * as THREE from 'three';
import type { Projekt } from '../modell/projekt';
import type { Groesse } from '../wert/wertfeld';

const FAKTOR = { mm: 1, cm: 10, m: 1000 } as const;
const groesseInMm = (g: Groesse): number => g.value * FAKTOR[g.unit as keyof typeof FAKTOR];

const token = (name: string): THREE.Color =>
  new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());

export class Flaeche3d {
  private readonly szene = new THREE.Scene();
  private readonly kamera = new THREE.PerspectiveCamera(40, 1, 1, 2000);
  private readonly renderer: THREE.WebGLRenderer | undefined;
  private readonly koerper = new Map<string, THREE.Mesh>();

  constructor(readonly canvas: HTMLCanvasElement) {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      this.renderer = undefined; // ohne WebGL bleibt die Fläche leer, der Rest funktioniert
    }
    this.kamera.position.set(160, 120, 160);
    this.kamera.lookAt(0, 15, 0);
    this.szene.add(new THREE.AmbientLight(token('--farbe-flaeche'), 3));
  }

  aktualisieren(projekt: Projekt, auswahl: string[]): void {
    this.szene.background = token('--farbe-viewport');
    for (const m of this.koerper.values()) this.szene.remove(m);
    this.koerper.clear();
    let hoehe = 0;
    for (const teil of projekt.content.filter((k) => k.type === 'part')) {
      const mass = (n: string, vorgabe: number): number => {
        const g = teil.params[n] as Groesse | undefined;
        return g ? groesseInMm(g) : vorgabe;
      };
      const l = mass('laenge', 0);
      const b = mass('breite', 0);
      const h = mass('hoehe', 5);
      if (l === 0 || b === 0) continue;
      const gewaehlt = auswahl.includes(teil.id);
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(l, h, b),
        new THREE.MeshLambertMaterial({
          color: token(gewaehlt ? '--farbe-akzent' : '--farbe-flaeche-2'),
        }),
      );
      mesh.position.set(0, hoehe + h / 2, 0);
      hoehe += h;
      this.szene.add(mesh);
      this.koerper.set(teil.id, mesh);
    }
    this.zeichnen();
  }

  zeichnen(): void {
    if (!this.renderer) return;
    const { clientWidth: w, clientHeight: h } = this.canvas;
    if (w > 0 && h > 0) {
      this.renderer.setSize(w, h, false);
      this.kamera.aspect = w / h;
      this.kamera.updateProjectionMatrix();
    }
    this.renderer.render(this.szene, this.kamera);
  }
}
