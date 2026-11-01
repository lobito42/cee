// three.js-Szene des Modells: Licht, flach schattierte Flächen, Kanten, Navigation, Treffer per Strahl.
// Die Szene zeichnet nur das Modell; Konturen, Griffe und Schilder liegen als DOM-Überlagerung darüber.
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { ViewportGizmo } from 'three-viewport-gizmo';
import { tokens } from '../erzeugt/tokens';

// Strahltests über eine BVH (three-mesh-bvh, MIT): Körpernetze der Skizzen-Körper (ap-53)
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

/** Was die Skizzen-Ansicht zeichnet (ap-53): alles in Weltkoordinaten (mm), Farben als Rolle. */
export interface SkizzenZeichnung {
  kurven: { element: string; zuege: V3[][]; rolle: 'normal' | 'akzent' | 'fehler' | 'leise' }[];
  bereiche: { key: string; rand: V3[][]; dreiecke: V3[]; art: 'hover' | 'auswahl' }[];
  koerper: {
    element: string;
    positionen: number[];
    dreiecke: number[];
    kanten: V3[][];
    gewaehlt: boolean;
  }[];
  vorschau: V3[][];
  hilfslinien: V3[][];
  geist: { positionen: number[]; dreiecke: number[] } | null;
}

export const KANTE_PX = 1.5;
import type { Koerper, V3 } from '../geometrie/teil';
import type { DrahtZeichnung } from '../drahtmodell/draht';

export type Darstellung = 'koerper' | 'kanten' | 'durchsicht';
export type Thema = 'hell' | 'dunkel';
export type Projektionsart = 'orthogonal' | 'perspektivisch';

export interface Punkt {
  x: number;
  y: number;
}

export interface Kamera {
  azimut: number;
  hoehe: number;
  abstand: number;
  ziel: THREE.Vector3;
}

export interface Zeichnung {
  koerper: Koerper[];
  darstellung: Darstellung;
  /** Elemente (IDs der erzeugenden Elemente), die nicht gezeichnet werden. */
  versteckt: Set<string>;
  /** Elemente, die gedimmt erscheinen (Umfeld des aktiven Elements). */
  gedimmt: Set<string>;
  /** Elemente mit letztem gültigem Stand (fehlerhaft/pausiert): Deckkraft 0,6. */
  blass: Set<string>;
  /** Vorschau eines Vorschlags (Entscheidungskarte): durchscheinend in `akzent`. */
  geister: Koerper[];
}

export interface Treffer {
  elementId: string;
  punkt: THREE.Vector3;
  normale: THREE.Vector3;
}

export interface KantenInfo {
  adresse: string;
  elementId: string;
  name: string;
  von: Punkt;
  bis: Punkt;
  mitte: Punkt;
}

const FOV = 30;
const GEDIMMT = 0.35;
const BLASS = 0.6;
const KANTENWINKEL = 30;

interface Objekt {
  elementId: string;
  gruppe: THREE.Group;
  flaechen: THREE.Mesh[];
  kanten: THREE.LineSegments[];
  skizze: boolean;
}

export class Szene {
  readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly persp = new THREE.PerspectiveCamera(FOV, 1, 10, 20000);
  private readonly ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, -20000, 20000);
  private readonly gruppe = new THREE.Group();
  /** Drahtmodell (ap-50): Punkte, Linien, Achsen, Ebenen aus dem Ergebnis des Geometriekerns. */
  private readonly draht = new THREE.Group();
  private readonly licht = {
    umgebung: new THREE.AmbientLight(),
    gerichtet: new THREE.DirectionalLight(),
    gegen: new THREE.DirectionalLight(),
  };
  private objekte: Objekt[] = [];
  private zeichnung: Zeichnung | null = null;
  private thema: Thema = 'hell';
  private angefordert = false;
  private tween: { start: number; ende: number; von: Kamera; nach: Kamera } | null = null;
  private lausche: (() => void)[] = [];
  private bboxCache = new Map<string, { min: V3; max: V3 }>();
  /** Skizzen, Bereiche und Körper aus dem Geometriekern (ap-53). */
  private readonly skizzen = new THREE.Group();
  private koerperNetze: THREE.Mesh[] = [];
  private linienMaterialien: LineMaterial[] = [];
  /** Höhengriff (TransformControls, nur eine Achse). */
  griff: TransformControls | null = null;
  readonly griffObjekt = new THREE.Object3D();
  /** Zeit der letzten Kamerabewegung bis zur Ruhe (ms). */
  bewegung = { start: 0, ende: 0 };

  kamera: Kamera = {
    azimut: -35,
    hoehe: 28,
    abstand: 380,
    ziel: new THREE.Vector3(0, 0, 14),
  };
  projektion: Projektionsart = 'orthogonal';
  /** 0 = ohne Übergänge (Testzustände). */
  tempo = 1;

  constructor(private readonly zone: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.dataset.modell = '';
    this.canvas.className = 'leinwand';
    zone.prepend(this.canvas);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'low-power',
    });
    this.renderer.setPixelRatio(1);
    this.scene.add(this.gruppe);
    this.scene.add(this.draht);
    this.scene.add(this.skizzen);
    this.scene.add(this.griffObjekt);
    this.weltAchsen = this.globaleAchsen();
    this.weltAchsen.visible = false;
    this.scene.add(this.weltAchsen);
    this.scene.add(this.licht.umgebung, this.licht.gerichtet, this.licht.gegen);
    this.setThema('hell');
    new ResizeObserver(() => this.groesseAnpassen()).observe(zone);
    this.groesseAnpassen();
  }

  beiAenderung(fn: () => void): void {
    this.lausche.push(fn);
  }

  private melde(): void {
    for (const fn of this.lausche) fn();
  }

  lichter(): { art: string; intensitaet: number }[] {
    return [
      { art: 'umgebung', intensitaet: this.licht.umgebung.intensity },
      { art: 'gerichtet', intensitaet: this.licht.gerichtet.intensity },
      { art: 'gegen', intensitaet: this.licht.gegen.intensity },
    ];
  }

  setThema(thema: Thema): void {
    this.thema = thema;
    this.renderer.setClearColor(new THREE.Color(tokens[`farbe.${thema}.viewport`]));
    this.licht.umgebung.intensity = thema === 'hell' ? 1.15 : 1.25;
    this.licht.gerichtet.intensity = thema === 'hell' ? 1.7 : 2.1;
    this.licht.gegen.intensity = thema === 'hell' ? 0.5 : 0.7;
    this.licht.gerichtet.position.set(-1, -2, 3);
    this.licht.gegen.position.set(2, 1, 1);
    if (this.zeichnung) this.zeichne(this.zeichnung);
    this.anfordern();
  }

  /** Lage der Leinwand im Fenster, je synchronem Ablauf einmal gemessen (vermeidet erzwungene Layouts). */
  private rechteckCache: DOMRect | null = null;
  rechteck(): DOMRect {
    if (!this.rechteckCache) {
      this.rechteckCache = this.canvas.getBoundingClientRect();
      queueMicrotask(() => (this.rechteckCache = null));
    }
    return this.rechteckCache;
  }

  groesseAnpassen(): void {
    const r = this.zone.getBoundingClientRect();
    const b = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    this.renderer.setSize(b, h, false);
    this.canvas.style.width = `${b}px`;
    this.canvas.style.height = `${h}px`;
    this.persp.aspect = b / h;
    this.persp.updateProjectionMatrix();
    this.anfordern();
    this.melde();
  }

  private flaecheBreite(): number {
    return this.canvas.clientWidth || 1;
  }

  private flaecheHoehe(): number {
    return this.canvas.clientHeight || 1;
  }

  private halbeHoehe(abstand = this.kamera.abstand): number {
    return abstand * Math.tan((FOV * Math.PI) / 360);
  }

  /** Pixel je mm in der Bildebene des Ziels. */
  pxProMm(): number {
    return this.flaecheHoehe() / (2 * this.halbeHoehe());
  }

  private kameraAnwenden(): THREE.Camera {
    const k = this.kamera;
    const az = (k.azimut * Math.PI) / 180;
    const hh = (k.hoehe * Math.PI) / 180;
    const richtung = new THREE.Vector3(
      Math.sin(az) * Math.cos(hh),
      -Math.cos(az) * Math.cos(hh),
      Math.sin(hh),
    );
    const cam = this.projektion === 'orthogonal' ? this.ortho : this.persp;
    cam.up.set(0, 0, 1);
    if (Math.abs(k.hoehe) > 89.5) cam.up.set(Math.sin(az) * -1, Math.cos(az), 0);
    cam.position.copy(k.ziel).addScaledVector(richtung, k.abstand);
    cam.lookAt(k.ziel);
    if (this.projektion === 'orthogonal') {
      const hoch = this.halbeHoehe();
      const breit = hoch * (this.flaecheBreite() / this.flaecheHoehe());
      this.ortho.left = -breit;
      this.ortho.right = breit;
      this.ortho.top = hoch;
      this.ortho.bottom = -hoch;
      this.ortho.updateProjectionMatrix();
    }
    cam.updateMatrixWorld(true);
    return cam;
  }

  aktuelleKamera(): THREE.Camera {
    return this.kameraAnwenden();
  }

  // --- Navigation ---------------------------------------------------------------------------------

  drehen(dAzimut: number, dHoehe: number): void {
    this.tween = null;
    this.kamera.azimut += dAzimut;
    this.kamera.hoehe = Math.max(-89, Math.min(89, this.kamera.hoehe + dHoehe));
    this.geaendert();
  }

  /** Verschiebt das Ziel um dx, dy Pixel in der Bildebene. */
  schieben(dx: number, dy: number): void {
    this.tween = null;
    const cam = this.kameraAnwenden();
    const rechts = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
    const oben = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
    const mmProPx = 1 / this.pxProMm();
    this.kamera.ziel.addScaledVector(rechts, -dx * mmProPx).addScaledVector(oben, dy * mmProPx);
    this.geaendert();
  }

  /** Zoomt um `faktor` (> 1 = näher); zum Zeiger, wenn Bildschirmkoordinaten gegeben sind. */
  zoomen(faktor: number, clientX?: number, clientY?: number): void {
    this.tween = null;
    const vorher =
      clientX !== undefined && clientY !== undefined ? this.aufZielEbene(clientX, clientY) : null;
    this.kamera.abstand = Math.max(40, Math.min(4000, this.kamera.abstand / faktor));
    if (vorher && clientX !== undefined && clientY !== undefined) {
      this.kameraAnwenden();
      const nachher = this.aufZielEbene(clientX, clientY);
      if (nachher) this.kamera.ziel.add(vorher.sub(nachher));
    }
    this.geaendert();
  }

  /** Punkt unter dem Zeiger auf der Ebene durch das Ziel, senkrecht zur Blickrichtung. */
  private aufZielEbene(clientX: number, clientY: number): THREE.Vector3 | null {
    const cam = this.kameraAnwenden();
    const r = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, cam);
    const normale = new THREE.Vector3();
    cam.getWorldDirection(normale);
    const ebene = new THREE.Plane().setFromNormalAndCoplanarPoint(normale, this.kamera.ziel);
    return ray.ray.intersectPlane(ebene, new THREE.Vector3());
  }

  private geaendert(): void {
    this.anfordern();
    this.melde();
  }

  nach(ziel: Partial<Omit<Kamera, 'ziel'>> & { ziel?: THREE.Vector3 }, dauerMs: number): void {
    const von: Kamera = { ...this.kamera, ziel: this.kamera.ziel.clone() };
    const bis: Kamera = {
      azimut: ziel.azimut ?? von.azimut,
      hoehe: ziel.hoehe ?? von.hoehe,
      abstand: ziel.abstand ?? von.abstand,
      ziel: ziel.ziel ? ziel.ziel.clone() : von.ziel.clone(),
    };
    this.bewegung = { start: performance.now(), ende: performance.now() };
    if (dauerMs <= 0 || this.tempo === 0) {
      this.kamera = bis;
      this.tween = null;
      this.geaendert();
      return;
    }
    this.bewegung.ende = 0;
    this.tween = { start: performance.now(), ende: performance.now() + dauerMs, von, nach: bis };
    this.anfordern();
  }

  /** Passt die Ansicht so an, dass die Hülle der Körper 72 % der kürzeren Seite füllt. */
  passeEin(box: { min: V3; max: V3 } | null, dauerMs = 200, anteil = 0.72): void {
    if (!box) return;
    const mitte = new THREE.Vector3(
      (box.min[0] + box.max[0]) / 2,
      (box.min[1] + box.max[1]) / 2,
      (box.min[2] + box.max[2]) / 2,
    );
    // Ausdehnung des Hüllquaders quer zur Blickrichtung: mit abstand = 1 probieren und skalieren.
    const probe = { ...this.kamera, ziel: mitte.clone() };
    const alt = this.kamera;
    this.kamera = probe;
    const cam = this.kameraAnwenden();
    const rechts = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
    const oben = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
    let bMax = 0;
    let hMax = 0;
    for (const x of [box.min[0], box.max[0]])
      for (const y of [box.min[1], box.max[1]])
        for (const z of [box.min[2], box.max[2]]) {
          const d = new THREE.Vector3(x, y, z).sub(mitte);
          bMax = Math.max(bMax, Math.abs(d.dot(rechts)));
          hMax = Math.max(hMax, Math.abs(d.dot(oben)));
        }
    this.kamera = alt;
    const zone = this.zone.getBoundingClientRect();
    const kurz = Math.min(zone.width, zone.height);
    // Größere Ausdehnung in Pixeln = anteil · kurz → mm je Pixel
    const pxBreit = (2 * bMax) / (anteil * kurz);
    const pxHoch = (2 * hMax) / (anteil * kurz);
    const mmProPx = Math.max(pxBreit, pxHoch, 0.01);
    const halbeHoehe = (mmProPx * zone.height) / 2;
    const abstand = halbeHoehe / Math.tan((FOV * Math.PI) / 360);
    this.nach({ ziel: mitte, abstand }, dauerMs);
  }

  // --- Zeichnen -----------------------------------------------------------------------------------

  private koerperFarbe(): THREE.Color {
    return new THREE.Color(
      this.thema === 'hell' ? tokens['farbe.hell.flaeche'] : tokens['farbe.dunkel.text-3'],
    );
  }

  private geometrie(k: Koerper): THREE.BufferGeometry[] {
    const [x0, y0, z0] = k.min;
    const [x1, y1, z1] = k.max;
    const mitte = new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    switch (k.art) {
      case 'quader': {
        const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
        g.translate(mitte.x, mitte.y, mitte.z);
        return [g];
      }
      case 'platte': {
        const p = k.platte;
        if (!p) return [];
        const form = abgerundetesRechteck(p.laenge, p.breite, p.eckradius);
        for (const l of p.loecher) {
          const loch = new THREE.Path();
          loch.absarc(l.x - mitte.x, l.y - mitte.y, p.lochD / 2, 0, Math.PI * 2, true);
          form.holes.push(loch);
        }
        const g = new THREE.ExtrudeGeometry(form, {
          depth: p.dicke,
          bevelEnabled: false,
          curveSegments: 12,
        });
        g.translate(mitte.x, mitte.y, z0);
        return [g];
      }
      case 'schale': {
        const w = k.wand ?? 2;
        const aussen = abgerundetesRechteck(x1 - x0, y1 - y0, 0);
        const innen = new THREE.Path();
        innen.moveTo(-(x1 - x0) / 2 + w, -(y1 - y0) / 2 + w);
        innen.lineTo(-(x1 - x0) / 2 + w, (y1 - y0) / 2 - w);
        innen.lineTo((x1 - x0) / 2 - w, (y1 - y0) / 2 - w);
        innen.lineTo((x1 - x0) / 2 - w, -(y1 - y0) / 2 + w);
        innen.closePath();
        aussen.holes.push(innen);
        const waende = new THREE.ExtrudeGeometry(aussen, {
          depth: z1 - z0 - w,
          bevelEnabled: false,
        });
        waende.translate(mitte.x, mitte.y, z0 + w);
        const boden = new THREE.BoxGeometry(x1 - x0, y1 - y0, w);
        boden.translate(mitte.x, mitte.y, z0 + w / 2);
        return [waende, boden];
      }
      case 'rohr': {
        const r = k.rohr;
        if (!r) return [];
        const g = new THREE.CylinderGeometry(r.d / 2, r.d / 2, z1 - z0, 24, 1, true);
        g.rotateX(Math.PI / 2);
        g.translate(r.x, r.y, mitte.z);
        return [g];
      }
      default:
        return [];
    }
  }

  zeichne(z: Zeichnung): void {
    this.zeichnung = z;
    this.bboxCache.clear();
    for (const o of this.objekte) this.gruppe.remove(o.gruppe);
    this.objekte = [];
    const farbe = this.koerperFarbe();
    const kante = new THREE.Color(
      tokens[this.thema === 'hell' ? 'farbe.hell.text' : 'farbe.dunkel.text'],
    );
    const kanteLeise = new THREE.Color(
      tokens[this.thema === 'hell' ? 'farbe.hell.text-3' : 'farbe.dunkel.text-3'],
    );
    for (const k of z.koerper) {
      if (z.versteckt.has(k.elementId)) continue;
      const g = new THREE.Group();
      const objekt: Objekt = {
        elementId: k.elementId,
        gruppe: g,
        flaechen: [],
        kanten: [],
        skizze: k.art === 'skizze',
      };
      const gedimmt = z.gedimmt.has(k.elementId);
      const blass = z.blass.has(k.elementId);
      if (k.art === 'skizze' && k.platte) {
        const form = abgerundetesRechteck(k.platte.laenge, k.platte.breite, k.platte.eckradius);
        const punkte = form.getPoints(8).map((p) => new THREE.Vector3(p.x, p.y, 0.05));
        const geo = new THREE.BufferGeometry().setFromPoints([
          ...punkte,
          punkte[0] as THREE.Vector3,
        ]);
        const linie = new THREE.Line(
          geo,
          new THREE.LineBasicMaterial({
            color: kanteLeise,
            transparent: true,
            opacity: gedimmt ? GEDIMMT : 1,
          }),
        );
        linie.position.set((k.min[0] + k.max[0]) / 2, (k.min[1] + k.max[1]) / 2, 0);
        g.add(linie);
        this.gruppe.add(g);
        this.objekte.push(objekt);
        continue;
      }
      for (const geo of this.geometrie(k)) {
        const deckkraft = gedimmt
          ? GEDIMMT
          : blass
            ? BLASS
            : z.darstellung === 'durchsicht'
              ? 0.3
              : 1;
        const material = new THREE.MeshLambertMaterial({
          color: farbe,
          flatShading: true,
          side: k.art === 'rohr' ? THREE.DoubleSide : THREE.FrontSide,
          transparent: deckkraft < 1,
          opacity: deckkraft,
          depthWrite: z.darstellung !== 'durchsicht',
          colorWrite: z.darstellung !== 'kanten',
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.userData.elementId = k.elementId;
        mesh.userData.pickbar = !gedimmt;
        g.add(mesh);
        objekt.flaechen.push(mesh);
        const linien = new THREE.LineSegments(
          new THREE.EdgesGeometry(geo, KANTENWINKEL),
          new THREE.LineBasicMaterial({
            color: gedimmt ? kanteLeise : kante,
            transparent: gedimmt,
            opacity: gedimmt ? GEDIMMT : 1,
          }),
        );
        g.add(linien);
        objekt.kanten.push(linien);
      }
      this.gruppe.add(g);
      this.objekte.push(objekt);
    }
    for (const k of z.geister) {
      const g = new THREE.Group();
      for (const geo of this.geometrie(k)) {
        const m = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(tokens[`farbe.${this.thema}.akzent`]),
            transparent: true,
            opacity: 0.35,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        );
        g.add(m);
      }
      this.gruppe.add(g);
      this.objekte.push({
        elementId: `${k.elementId}~geist`,
        gruppe: g,
        flaechen: [],
        kanten: [],
        skizze: false,
      });
    }
    this.anfordern();
    this.melde();
  }

  private weltAchsen: THREE.Group;

  /** Globale Achsen nur im Drahtmodell-Dokument zeigen (Teil-Dokumente haben ihre eigene Orientierung). */
  zeigeWeltachsen(an: boolean): void {
    const we = this.wuerfelEl();
    if (we) we.style.display = an ? '' : 'none';
    if (this.weltAchsen.visible === an) return;
    this.weltAchsen.visible = an;
    this.anfordern();
  }

  /** Globales Koordinatensystem: immer sichtbare, dünne Achsen im Ursprung (X rot, Y grün, Z blau). */
  private globaleAchsen(): THREE.Group {
    const g = new THREE.Group();
    const laenge = 80;
    const enden: Array<['achse.x' | 'achse.y' | 'achse.z', [number, number, number]]> = [
      ['achse.x', [laenge, 0, 0]],
      ['achse.y', [0, laenge, 0]],
      ['achse.z', [0, 0, laenge]],
    ];
    for (const [token, ende] of enden) {
      const linie = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...ende),
        ]),
        new THREE.LineBasicMaterial({
          color: new THREE.Color(tokens[token]),
          transparent: true,
          opacity: 0.55,
          depthTest: false,
        }),
      );
      linie.renderOrder = 0;
      g.add(linie);
    }
    return g;
  }

  /** Drahtmodell zeichnen: Punkte als Scheibe mit Rand, Linien, Ebenen als Quadrat mit Deckkraft 0,15 und Kontur. */
  zeichneDraht(liste: DrahtZeichnung[]): void {
    for (const k of [...this.draht.children]) {
      this.draht.remove(k);
      k.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        (m.material as THREE.Material | undefined)?.dispose?.();
      });
    }
    const farbe = (z: DrahtZeichnung) =>
      new THREE.Color(
        z.gewaehlt
          ? tokens[`farbe.${this.thema}.akzent`]
          : z.fehlerhaft
            ? tokens[`farbe.${this.thema}.fehler`]
            : z.token.startsWith('achse.')
              ? tokens[z.token as 'achse.x']
              : tokens[`farbe.${this.thema}.text`],
      );
    for (const z of liste) {
      if (z.art === 'koordinatensystem') continue;
      const v = z.punkte.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const g = new THREE.Group();
      g.userData.elementId = z.element;
      if (z.art === 'punkt') {
        // Gut sichtbar: heller Rand (Flächenfarbe) unter dem farbigen Kern, runde Scheibe.
        const geo = new THREE.BufferGeometry().setFromPoints(v);
        const rand = new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            color: new THREE.Color(tokens[`farbe.${this.thema}.flaeche`]),
            size: 9,
            sizeAttenuation: false,
          }),
        );
        const kern = new THREE.Points(
          geo,
          new THREE.PointsMaterial({
            // Auswahl nur über die Farbe (Akzent), nie über die Größe.
            color: farbe(z),
            size: 6,
            sizeAttenuation: false,
          }),
        );
        rand.renderOrder = 1;
        kern.renderOrder = 2;
        for (const m of [rand, kern]) (m.material as THREE.PointsMaterial).depthTest = false;
        g.add(rand, kern);
      } else if (z.art === 'ebene') {
        const flaeche = new THREE.Mesh(
          new THREE.BufferGeometry().setFromPoints([
            v[0],
            v[1],
            v[2],
            v[0],
            v[2],
            v[3],
          ] as THREE.Vector3[]),
          new THREE.MeshBasicMaterial({
            color: farbe(z),
            transparent: true,
            opacity: 0.15,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        );
        const kontur = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(v),
          new THREE.LineBasicMaterial({ color: farbe(z) }),
        );
        g.add(flaeche, kontur);
      } else {
        g.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(v),
            new THREE.LineBasicMaterial({ color: farbe(z), linewidth: 1.5 }),
          ),
        );
      }
      this.draht.add(g);
    }
    this.anfordern();
    this.melde();
  }

  /** Schnittpunkt des Zeigerstrahls mit einer Ebene (Ursprung, Normale) in Weltkoordinaten (mm). */
  aufEbene(clientX: number, clientY: number, ursprung: V3, normale: V3): V3 | null {
    const cam = this.kameraAnwenden();
    const ray = new THREE.Raycaster();
    ray.setFromCamera(this.zuNdc(clientX, clientY), cam);
    const ebene = new THREE.Plane().setFromNormalAndCoplanarPoint(
      new THREE.Vector3(normale[0], normale[1], normale[2]).normalize(),
      new THREE.Vector3(ursprung[0], ursprung[1], ursprung[2]),
    );
    const p = ray.ray.intersectPlane(ebene, new THREE.Vector3());
    return p ? [p.x, p.y, p.z] : null;
  }

  // --- Abfragen -----------------------------------------------------------------------------------

  private zuNdc(clientX: number, clientY: number): THREE.Vector2 {
    const r = this.rechteck();
    return new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1,
    );
  }

  /** Erster getroffener Körper unter dem Zeiger (nur ungedimmte, gezeichnete Flächen). */
  trefferBei(clientX: number, clientY: number): Treffer | null {
    const cam = this.kameraAnwenden();
    const ray = new THREE.Raycaster();
    ray.setFromCamera(this.zuNdc(clientX, clientY), cam);
    this.gruppe.updateMatrixWorld(true);
    const meshes = this.objekte.flatMap((o) => o.flaechen).filter((m) => m.userData.pickbar);
    const t = ray.intersectObjects(meshes, false)[0];
    if (!t) return null;
    return {
      elementId: String(t.object.userData.elementId),
      punkt: t.point.clone(),
      normale: t.face ? t.face.normal.clone() : new THREE.Vector3(),
    };
  }

  /** Tiefe eines Weltpunkts im Bild (0 vorn … 1 hinten). */
  tiefe(p: V3): number {
    const v = new THREE.Vector3(p[0], p[1], p[2]).project(this.kameraAnwenden());
    return (v.z + 1) / 2;
  }

  projiziere(p: V3 | THREE.Vector3): Punkt {
    const cam = this.kameraAnwenden();
    const v = (
      p instanceof THREE.Vector3 ? p.clone() : new THREE.Vector3(p[0], p[1], p[2])
    ).project(cam);
    const r = this.rechteck();
    return { x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height };
  }

  /** Acht Ecken des Hüllquaders in Bildschirmkoordinaten. */
  eckenProjiziert(box: { min: V3; max: V3 }): Punkt[] {
    const liste: Punkt[] = [];
    for (const x of [box.min[0], box.max[0]])
      for (const y of [box.min[1], box.max[1]])
        for (const z of [box.min[2], box.max[2]]) liste.push(this.projiziere([x, y, z]));
    return liste;
  }

  /** Sichtbarkeit von Kanten für die Auswahl: zwölf Kanten des Hüllquaders. */
  kantenVon(elementId: string, box: { min: V3; max: V3 }): KantenInfo[] {
    const e = (x: 'l' | 'r', y: 'v' | 'h', z: 'u' | 'o'): V3 => [
      x === 'l' ? box.min[0] : box.max[0],
      y === 'v' ? box.min[1] : box.max[1],
      z === 'u' ? box.min[2] : box.max[2],
    ];
    const namen: [string, V3, V3][] = [];
    for (const z of ['o', 'u'] as const) {
      const zn = z === 'o' ? 'oben' : 'unten';
      namen.push([`${zn}-vorn`, e('l', 'v', z), e('r', 'v', z)]);
      namen.push([`${zn}-hinten`, e('l', 'h', z), e('r', 'h', z)]);
      namen.push([`${zn}-links`, e('l', 'v', z), e('l', 'h', z)]);
      namen.push([`${zn}-rechts`, e('r', 'v', z), e('r', 'h', z)]);
    }
    for (const x of ['l', 'r'] as const)
      for (const y of ['v', 'h'] as const)
        namen.push([
          `${y === 'v' ? 'vorn' : 'hinten'}-${x === 'l' ? 'links' : 'rechts'}`,
          e(x, y, 'u'),
          e(x, y, 'o'),
        ]);
    return namen.map(([name, a, b]) => {
      const von = this.projiziere(a);
      const bis = this.projiziere(b);
      return {
        adresse: `${elementId}/k/${name}`,
        elementId,
        name,
        von,
        bis,
        mitte: { x: (von.x + bis.x) / 2, y: (von.y + bis.y) / 2 },
      };
    });
  }

  /** IDs der Elemente, die tatsächlich gezeichnet werden (lesend, für Prüfungen). */
  gezeichnet(): string[] {
    return [...new Set(this.objekte.map((o) => o.elementId).filter((i) => !i.includes('~')))];
  }

  hatKoerper(): boolean {
    return this.objekte.length > 0;
  }

  // --- Rendern ------------------------------------------------------------------------------------

  anfordern(): void {
    if (this.angefordert) return;
    this.angefordert = true;
    requestAnimationFrame(() => {
      this.angefordert = false;
      this.rahmen();
    });
  }

  private rahmen(): void {
    if (this.tween) {
      const t = this.tween;
      const jetzt = performance.now();
      const u = Math.min(1, (jetzt - t.start) / (t.ende - t.start));
      const e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
      this.kamera = {
        azimut: t.von.azimut + (t.nach.azimut - t.von.azimut) * e,
        hoehe: t.von.hoehe + (t.nach.hoehe - t.von.hoehe) * e,
        abstand: t.von.abstand + (t.nach.abstand - t.von.abstand) * e,
        ziel: t.von.ziel.clone().lerp(t.nach.ziel, e),
      };
      if (u >= 1) {
        this.tween = null;
        this.bewegung.ende = jetzt;
      } else this.anfordern();
      this.melde();
    }
    this.jetztRendern();
  }

  jetztRendern(): void {
    const cam = this.kameraAnwenden();
    if (this.griff) this.griff.camera = cam;
    const b = this.flaecheBreite();
    const h = this.flaecheHoehe();
    for (const m of this.linienMaterialien) m.resolution.set(b, h);
    this.renderer.render(this.scene, cam);
    if (this.wuerfel && this.weltAchsen.visible) {
      this.wuerfel.camera = cam as THREE.OrthographicCamera;
      this.wuerfel.target.copy(this.kamera.ziel);
      this.wuerfelSetzt = true;
      this.wuerfel.cameraUpdate();
      this.wuerfelSetzt = false;
      this.wuerfel.render();
    }
  }

  // --- Ansichtswürfel (three-viewport-gizmo, MIT) ---------------------------------------------------

  private wuerfel: ViewportGizmo | null = null;
  private wuerfelSetzt = false;
  private wuerfelEl(): HTMLElement | null {
    return this.zone.querySelector<HTMLElement>('.ansichtswuerfel');
  }
  /** Klick auf eine Seite bzw. Ecke: Blickrichtung (Kamera → Ziel) an den Aufrufer. */
  beiWuerfel: ((richtung: V3) => void) | null = null;

  /** Ansichtswürfel oben rechts im Modell (nur mit Weltachsen: Drahtmodell- und Skizzen-Dokument). */
  wuerfelAnlegen(): void {
    if (this.wuerfel) return;
    const g = new ViewportGizmo(this.kameraAnwenden() as THREE.OrthographicCamera, this.renderer, {
      container: this.zone,
      type: 'cube',
      size: 112,
      placement: 'top-right',
      offset: { top: 56, right: 12 },
      animated: false,
      className: 'ansichtswuerfel',
    });
    const el = this.wuerfelEl();
    if (el) {
      el.dataset.ansichtswuerfel = '';
      el.dataset.chrome = '';
    }
    g.addEventListener('change', () => {
      if (this.wuerfelSetzt) return;
      const d = new THREE.Vector3();
      g.camera.getWorldDirection(d);
      this.beiWuerfel?.([d.x, d.y, d.z]);
    });
    this.wuerfel = g;
    this.anfordern();
  }

  /** Bildschirmpunkt einer Seite („vorne“, „oben“ …) bzw. Ecke („vorne-rechts-oben“) des Würfels. */
  wuerfelPunkt(name: string): Punkt | null {
    const g = this.wuerfel;
    if (!g || !this.weltAchsen.visible) return null;
    const teile: Record<string, V3> = {
      vorne: [0, -1, 0],
      hinten: [0, 1, 0],
      rechts: [1, 0, 0],
      links: [-1, 0, 0],
      oben: [0, 0, 1],
      unten: [0, 0, -1],
    };
    const d = new THREE.Vector3();
    for (const t of name.split('-')) {
      const v = teile[t];
      if (v) d.add(new THREE.Vector3(...v));
    }
    if (d.lengthSq() === 0) return null;
    const el = this.wuerfelEl();
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cam = this.kameraAnwenden();
    const rechts = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
    const oben = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
    // Würfel mit Kantenlänge ≈ 0,5 der Widgetgröße; Seite bzw. Ecke liegt bei d · 0,25 (Seite) bzw. 0,22 (Ecke)
    // gemessen: Würfelkante bei ≈ 0,35 der Widgetbreite; Seite mittig (0,2), Seite auf Kante gesehen am Rand (0,34), Ecke 0,36
    const blick = new THREE.Vector3();
    cam.getWorldDirection(blick);
    const kante = Math.abs(d.clone().normalize().dot(blick)) < 0.3;
    const f = (name.includes('-') ? 0.3 : kante ? 0.34 : 0.2) * r.width;
    return {
      x: r.left + r.width / 2 + d.dot(rechts) * f,
      y: r.top + r.height / 2 - d.dot(oben) * f,
    };
  }

  // --- Skizze und Körper (ap-53) ------------------------------------------------------------------

  /** Blick senkrecht auf eine Ebene (Blickrichtung −normal, `x` nach rechts), Maßstab `pxProMm`. */
  blickAufEbene(ursprung: V3, normale: V3, x: V3, pxProMm: number, dauerMs: number): void {
    const [nx, ny, nz] = normale;
    const hoehe = (Math.asin(Math.max(-1, Math.min(1, nz))) * 180) / Math.PI;
    let azimut: number;
    if (Math.abs(nz) > 0.9999) {
      // senkrecht von oben/unten: `oben` = normal × x
      const y: V3 = [ny * x[2] - nz * x[1], nz * x[0] - nx * x[2], nx * x[1] - ny * x[0]];
      azimut = (Math.atan2(-y[0], y[1]) * 180) / Math.PI;
    } else azimut = (Math.atan2(nx, -ny) * 180) / Math.PI;
    const abstand = this.flaecheHoehe() / (2 * pxProMm * Math.tan((FOV * Math.PI) / 360));
    this.projektion = 'orthogonal';
    this.nach(
      {
        azimut,
        hoehe: Math.abs(nz) > 0.9999 ? Math.sign(nz) * 90 : hoehe,
        abstand,
        ziel: new THREE.Vector3(...ursprung),
      },
      dauerMs,
    );
  }

  /** Kameralage für das Prüfwerkzeug: Blickrichtung, oben, Projektion, Dauer bis zur Ruhe. */
  kameraLage(): { richtung: V3; oben: V3; projektion: string; ms_bis_ruhe: number } {
    const cam = this.kameraAnwenden();
    const d = new THREE.Vector3();
    cam.getWorldDirection(d);
    const o = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
    const b = this.bewegung;
    return {
      richtung: [d.x, d.y, d.z],
      oben: [o.x, o.y, o.z],
      projektion: this.projektion === 'orthogonal' ? 'parallel' : 'perspektivisch',
      ms_bis_ruhe: b.ende ? Math.max(0, b.ende - b.start) : this.tween ? Infinity : 0,
    };
  }

  private linie(zuege: V3[][], farbe: THREE.Color, breite: number, gestrichelt = false): Line2[] {
    return zuege
      .filter((z) => z.length >= 2)
      .map((z) => {
        const geo = new LineGeometry();
        geo.setPositions(z.flat());
        const m = new LineMaterial({
          color: farbe.getHex(),
          linewidth: breite,
          dashed: gestrichelt,
          dashSize: 2,
          gapSize: 1.5,
          depthTest: false,
          transparent: true,
        });
        m.resolution.set(this.flaecheBreite(), this.flaecheHoehe());
        this.linienMaterialien.push(m);
        const l = new Line2(geo, m);
        if (gestrichelt) l.computeLineDistances();
        l.renderOrder = 5;
        return l;
      });
  }

  private farbe(rolle: string): THREE.Color {
    const t = this.thema;
    const schluessel =
      rolle === 'akzent'
        ? `farbe.${t}.akzent`
        : rolle === 'fehler'
          ? `farbe.${t}.fehler`
          : rolle === 'leise'
            ? `farbe.${t}.text-3`
            : `farbe.${t}.text`;
    return new THREE.Color(tokens[schluessel as 'farbe.hell.text']);
  }

  private koerperGruppe = new THREE.Group();
  private koerperSignatur = '';
  private koerperLinien: LineMaterial[] = [];

  private leeren(g: THREE.Group): void {
    for (const k of [...g.children]) {
      g.remove(k);
      k.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.disposeBoundsTree?.();
        m.geometry?.dispose();
        (m.material as THREE.Material | undefined)?.dispose?.();
      });
    }
  }

  zeichneSkizze(z: SkizzenZeichnung): void {
    if (!this.koerperGruppe.parent) this.scene.add(this.koerperGruppe);
    this.leeren(this.skizzen);
    const akzent = this.farbe('akzent');
    // Körper nur neu bauen, wenn sie sich ändern (Netz, BVH): beim Ziehen bleibt nur die Vorschau dynamisch
    const sig = JSON.stringify([
      this.thema,
      z.koerper.map((k) => [k.element, k.positionen.length, k.positionen.slice(0, 6), k.gewaehlt]),
    ]);
    if (sig !== this.koerperSignatur) {
      this.koerperSignatur = sig;
      this.leeren(this.koerperGruppe);
      this.koerperNetze = [];
      this.linienMaterialien = [];
      this.zeichneKoerper(z, akzent);
      this.koerperLinien = this.linienMaterialien;
    }
    this.linienMaterialien = [...this.koerperLinien];
    this.zeichneRest(z, akzent);
  }

  private zeichneKoerper(z: SkizzenZeichnung, akzent: THREE.Color): void {
    for (const k of z.koerper) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(k.positionen, 3));
      geo.setIndex(k.dreiecke);
      geo.computeVertexNormals();
      geo.computeBoundsTree();
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshLambertMaterial({
          color: this.koerperFarbe(),
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        }),
      );
      mesh.userData.elementId = k.element;
      this.koerperNetze.push(mesh);
      this.koerperGruppe.add(mesh);
      // Auswahl nur über die Farbe: gleiche Kantenbreite, Akzent statt Text
      for (const l of this.linie(k.kanten, k.gewaehlt ? akzent : this.farbe('normal'), KANTE_PX)) {
        l.material.depthTest = true;
        l.userData.elementId = k.element;
        this.koerperGruppe.add(l);
      }
    }
  }

  private zeichneRest(z: SkizzenZeichnung, akzent: THREE.Color): void {
    for (const b of z.bereiche) {
      if (b.dreiecke.length) {
        const geo = new THREE.BufferGeometry().setFromPoints(
          b.dreiecke.map((p) => new THREE.Vector3(...p)),
        );
        const flaeche = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color: akzent,
            transparent: true,
            opacity: b.art === 'auswahl' ? 0.18 : 0.08,
            depthWrite: false,
            depthTest: false,
            side: THREE.DoubleSide,
          }),
        );
        flaeche.renderOrder = 4;
        this.skizzen.add(flaeche);
      }
      for (const l of this.linie(b.rand, akzent, KANTE_PX)) this.skizzen.add(l);
    }
    for (const k of z.kurven)
      for (const l of this.linie(k.zuege, this.farbe(k.rolle), KANTE_PX)) {
        l.userData.elementId = k.element;
        this.skizzen.add(l);
      }
    for (const l of this.linie(z.vorschau, akzent, KANTE_PX)) this.skizzen.add(l);
    for (const l of this.linie(z.hilfslinien, akzent, 1, true)) this.skizzen.add(l);
    if (z.geist) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(z.geist.positionen, 3));
      geo.setIndex(z.geist.dreiecke);
      const m = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({
          color: akzent,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
      m.renderOrder = 3;
      this.skizzen.add(m);
    }
    this.anfordern();
  }

  /** Weltachsen des Ansichtswürfels (Farben aus Tokens `achse.*`). */
  ansichtswuerfel(): { achsen: { achse: string; farbe: string; sichtbar: boolean }[] } {
    return {
      achsen: (['x', 'y', 'z'] as const).map((a) => ({
        achse: a,
        farbe: tokens[`achse.${a}`],
        sichtbar: this.weltAchsen.visible,
      })),
    };
  }

  /** Körper (Skizzen-Körper) unter dem Zeiger, über die BVH. */
  koerperBei(clientX: number, clientY: number): string | null {
    if (!this.koerperNetze.length) return null;
    const cam = this.kameraAnwenden();
    const ray = new THREE.Raycaster();
    ray.firstHitOnly = true;
    ray.setFromCamera(this.zuNdc(clientX, clientY), cam);
    const t = ray.intersectObjects(this.koerperNetze, false)[0];
    this.letzterKoerperTreffer = t ? [t.point.x, t.point.y, t.point.z] : null;
    return t ? String(t.object.userData.elementId) : null;
  }

  /** Weltpunkt des letzten Körpertreffers (für den Vergleich mit Bereichen auf Flächen). */
  letzterKoerperTreffer: V3 | null = null;

  /** Strahltest-Messung (ms je Strahl) auf einem Testnetz mit `n` Dreiecken. */
  messeStrahl(n: number, positionen: [number, number][]): number[] {
    const seg = Math.max(2, Math.round(Math.sqrt(n / 2)));
    const geo = new THREE.PlaneGeometry(400, 400, seg, seg);
    geo.computeBoundsTree();
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial());
    mesh.updateMatrixWorld(true);
    const cam = this.kameraAnwenden();
    const ray = new THREE.Raycaster();
    ray.firstHitOnly = true;
    const zeiten: number[] = [];
    for (const [x, y] of positionen) {
      const t0 = performance.now();
      ray.setFromCamera(new THREE.Vector2(x, y), cam);
      ray.intersectObject(mesh, false);
      zeiten.push(performance.now() - t0);
    }
    geo.disposeBoundsTree();
    geo.dispose();
    return zeiten;
  }

  /** Höhengriff an `ort` entlang `normale` zeigen (TransformControls, nur die lokale Z-Achse). */
  griffErzeugen(): TransformControls {
    if (!this.griff) {
      this.griff = new TransformControls(this.kameraAnwenden(), this.canvas);
      this.griff.setMode('translate');
      this.griff.setSpace('local');
      this.griff.showX = false;
      this.griff.showY = false;
      this.griff.setSize(1.1);
      this.scene.add(this.griff.getHelper());
      this.griff.addEventListener('change', () => this.anfordern());
    }
    return this.griff;
  }

  zeigeGriff(ort: V3 | null, normale: V3 = [0, 0, 1]): void {
    if (!ort) {
      if (this.griff?.object) this.griff.detach();
      this.anfordern();
      return;
    }
    if (!this.griff) this.griffErzeugen();
    if (!this.griff) return;
    if (this.griff.dragging) return;
    this.griffObjekt.position.set(...ort);
    this.griffObjekt.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(...normale).normalize(),
    );
    this.griffObjekt.updateMatrixWorld(true);
    if (this.griff.object !== this.griffObjekt) this.griff.attach(this.griffObjekt);
    this.anfordern();
  }

  setProjektion(p: Projektionsart): void {
    this.projektion = p;
    this.geaendert();
  }
}

function abgerundetesRechteck(l: number, b: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -l / 2;
  const y = -b / 2;
  if (r <= 0) {
    s.moveTo(x, y);
    s.lineTo(x + l, y);
    s.lineTo(x + l, y + b);
    s.lineTo(x, y + b);
    s.closePath();
    return s;
  }
  s.moveTo(x + r, y);
  s.lineTo(x + l - r, y);
  s.absarc(x + l - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + l, y + b - r);
  s.absarc(x + l - r, y + b - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + b);
  s.absarc(x + r, y + b - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}
