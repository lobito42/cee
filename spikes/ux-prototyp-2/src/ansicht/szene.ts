// three.js-Szene des Modells: Licht, flach schattierte Flächen, Kanten, Kontur, Navigation, Auswahl per Strahl.
import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { tokens } from '../erzeugt/tokens';
import type { EbeneName, Koerper, Platte, V3 } from '../geometrie/teil';

export { Vector3 as Vektor3 } from 'three';

export type Darstellung = 'koerper' | 'kanten' | 'durchsicht';
export type Thema = 'hell' | 'dunkel';

export interface SkizzenLinie {
  ebene: EbeneName;
  mitte: { u: number; v: number };
  laenge: number;
  breite: number;
  eckradius: number;
}

export interface Zeichnung {
  koerper: Koerper[];
  darstellung: Darstellung;
  /** Schritte, die gestrichelt ohne Flächen erscheinen (spätere Schritte in der Skizze). */
  gestrichelt: Set<string>;
  /** Schritte als Geister (durchscheinend). */
  geister: Set<string>;
  /** Zusätzliche Geister-Körper (Vorschlag, Vergleich). */
  zusatz: Koerper[];
  skizzen: SkizzenLinie[];
  /** Farbverlauf über die Flächen (Beispielpaket Simulation), sonst `null`. */
  verlauf: boolean;
}

export interface Punkt {
  x: number;
  y: number;
}

export interface Projektion {
  huellbox: { x: number; y: number; breite: number; hoehe: number };
  huelle: Punkt[];
  flaechen: { oben: Punkt | null; vorn: Punkt | null; rechts: Punkt | null };
  kanten: { id: string; name: string; mitte: Punkt; flaechen: Punkt[] }[];
  treffer: Punkt[];
  /** Obere Mitte der Hüllbox in Seitenkoordinaten und Pixel je mm entlang +Z. */
  oben: Punkt | null;
  z_px_pro_mm: Punkt;
}

interface KoerperObjekt {
  koerper: Koerper;
  gruppe: THREE.Group;
  flaechen: THREE.Mesh[];
  segmente: number[]; // Kanten als Linienpaare (x,y,z, x,y,z, …)
  geist: boolean;
  gestrichelt: boolean;
}

const TRESHOLD_WINKEL = 30;
const STRICH = 2;
const KANTEN_FARBE = 'text';

export class Szene {
  readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(30, 1, 1, 6000);
  private readonly licht = {
    umgebung: new THREE.AmbientLight(),
    gerichtet: new THREE.DirectionalLight(),
  };
  private readonly modell = new THREE.Group();
  private readonly overlay = new THREE.Group();
  private objekte: KoerperObjekt[] = [];
  private zeichnung: Zeichnung | null = null;
  private thema: Thema = 'hell';
  private angefordert = false;
  private tween: { ende: number; start: number; von: Kamera; nach: Kamera } | null = null;
  private konturBreite = 3;
  private auswahl = new Set<string>();
  private hover: string | null = null;
  private konturen: LineSegments2[] = [];
  private kantenCache: { schluessel: string; sichtbar: Set<string> } | null = null;
  private readonly raycaster = new THREE.Raycaster();
  readonly kamera: Kamera = {
    azimut: 35,
    hoehe: 28,
    abstand: 260,
    ziel: new THREE.Vector3(0, 0, 15),
  };
  private zonenGroesse = { breite: 800, hoehe: 600 };
  /** Wird nach jedem Zeichnen aufgerufen (Overlays folgen der Kamera). */
  aufRender: (() => void) | null = null;

  constructor(private readonly zone: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.dataset.modell = '1';
    zone.appendChild(this.canvas);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.setPixelRatio(1);
    this.scene.add(this.camera);
    this.scene.add(this.modell);
    this.scene.add(this.overlay);
    // Licht hängt an der Kamera: die Flächen behalten beim Drehen ihre Helligkeitsunterschiede.
    this.camera.add(this.licht.umgebung);
    this.camera.add(this.licht.gerichtet);
    this.camera.add(this.licht.gerichtet.target);
    this.licht.gerichtet.position.set(-20, 100, 30);
    this.licht.gerichtet.target.position.set(0, 0, -100);
    this.setThema('hell');
    const beobachter = new ResizeObserver(() => this.groesseAnpassen());
    beobachter.observe(zone);
    this.groesseAnpassen();
  }

  // --- Farben ---------------------------------------------------------------------------------------

  private farbe(name: string): THREE.Color {
    return new THREE.Color(tokens[`farbe.${this.thema}.${name}` as keyof typeof tokens]);
  }

  /** Lichter und ihre Intensität (Teil von `ansicht()`). */
  lichter(): { art: string; intensitaet: number }[] {
    return [
      { art: 'gerichtet', intensitaet: this.licht.gerichtet.intensity },
      { art: 'umgebung', intensitaet: this.licht.umgebung.intensity },
    ];
  }

  setThema(thema: Thema): void {
    this.thema = thema;
    this.renderer.setClearColor(this.farbe('viewport'));
    // Anteil des Umgebungslichts 35 % der Gesamtintensität (design.md: ≤ 40 %).
    this.licht.umgebung.intensity = thema === 'hell' ? 0.6 : 4;
    this.licht.gerichtet.intensity = thema === 'hell' ? 1.8 : 26;
    if (this.zeichnung) this.zeichne(this.zeichnung);
    this.anfordern();
  }

  // --- Größe ----------------------------------------------------------------------------------------

  groesseAnpassen(): void {
    const r = this.zone.getBoundingClientRect();
    const breite = Math.max(200, Math.round(r.width));
    const hoehe = Math.max(200, Math.round(r.height));
    this.zonenGroesse = { breite, hoehe };
    this.renderer.setSize(breite, hoehe, false);
    this.canvas.style.width = `${breite}px`;
    this.canvas.style.height = `${hoehe}px`;
    this.camera.aspect = breite / hoehe;
    this.camera.updateProjectionMatrix();
    for (const l of this.konturen) (l.material as LineMaterial).resolution.set(breite, hoehe);
    this.anfordern();
  }

  // --- Kamera ---------------------------------------------------------------------------------------

  private kameraSetzen(): void {
    const k = this.kamera;
    const h = (k.hoehe * Math.PI) / 180;
    const a = (k.azimut * Math.PI) / 180;
    this.camera.position.set(
      k.ziel.x + k.abstand * Math.cos(h) * Math.sin(a),
      k.ziel.y - k.abstand * Math.cos(h) * Math.cos(a),
      k.ziel.z + k.abstand * Math.sin(h),
    );
    this.camera.up.set(0, 0, 1);
    this.camera.lookAt(k.ziel);
    this.camera.updateMatrixWorld(true);
  }

  drehen(dAzimut: number, dHoehe: number): void {
    this.kamera.azimut += dAzimut;
    this.kamera.hoehe = Math.max(-89.5, Math.min(89.5, this.kamera.hoehe + dHoehe));
    this.anfordern();
  }

  /** Verschiebt das Ziel in der Bildebene um Pixel. */
  schieben(dx: number, dy: number): void {
    this.kameraSetzen();
    const proPixel =
      (2 * this.kamera.abstand * Math.tan((this.camera.fov * Math.PI) / 360)) /
      this.zonenGroesse.hoehe;
    const rechts = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const oben = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
    this.kamera.ziel.addScaledVector(rechts, -dx * proPixel).addScaledVector(oben, dy * proPixel);
    this.anfordern();
  }

  /** Zoomt zum Zeiger: der Punkt unter dem Zeiger bleibt etwa an seiner Stelle. */
  zoomen(faktor: number, clientX?: number, clientY?: number): void {
    const alt = this.kamera.abstand;
    const neu = Math.max(20, Math.min(2500, alt * faktor));
    if (clientX !== undefined && clientY !== undefined) {
      this.kameraSetzen();
      const r = this.canvas.getBoundingClientRect();
      const nx = ((clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((clientY - r.top) / r.height) * 2 - 1);
      const proPixel =
        (2 * alt * Math.tan((this.camera.fov * Math.PI) / 360)) / this.zonenGroesse.hoehe;
      const rechts = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
      const oben = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
      const dx = (nx * this.zonenGroesse.breite) / 2;
      const dy = (ny * this.zonenGroesse.hoehe) / 2;
      const verschiebung = (alt - neu) / alt;
      this.kamera.ziel
        .addScaledVector(rechts, dx * proPixel * verschiebung)
        .addScaledVector(oben, dy * proPixel * verschiebung);
    }
    this.kamera.abstand = neu;
    this.anfordern();
  }

  /** Weicher Übergang der Kamera (Dauer in ms). */
  nach(ziel: Partial<Omit<Kamera, 'ziel'>> & { ziel?: THREE.Vector3 }, dauerMs: number): void {
    const von: Kamera = { ...this.kamera, ziel: this.kamera.ziel.clone() };
    const nach: Kamera = {
      azimut: ziel.azimut ?? von.azimut,
      hoehe: ziel.hoehe ?? von.hoehe,
      abstand: ziel.abstand ?? von.abstand,
      ziel: ziel.ziel ?? von.ziel.clone(),
    };
    if (dauerMs <= 0) {
      this.kameraUebernehmen(nach);
      return;
    }
    const jetzt = performance.now();
    this.tween = { start: jetzt, ende: jetzt + dauerMs, von, nach };
    this.anfordern();
  }

  private kameraUebernehmen(k: Kamera): void {
    this.kamera.azimut = k.azimut;
    this.kamera.hoehe = k.hoehe;
    this.kamera.abstand = k.abstand;
    this.kamera.ziel.copy(k.ziel);
    this.anfordern();
  }

  /** Passt die Ansicht ein: das Teil füllt rund drei Viertel der kürzeren Seite, mittig. */
  einpassen(): void {
    this.tween = null;
    const punkte = this.alleEckpunkte();
    if (!punkte.length) return;
    const box = new THREE.Box3().setFromPoints(punkte);
    const mitte = box.getCenter(new THREE.Vector3());
    this.kamera.ziel.copy(mitte);
    const groesse = box.getSize(new THREE.Vector3()).length();
    this.kamera.abstand = Math.max(60, groesse * 2.2);
    const ziel = 0.75 * Math.min(this.zonenGroesse.breite, this.zonenGroesse.hoehe);
    for (let i = 0; i < 8; i++) {
      this.kameraSetzen();
      const px = this.pixelBox(punkte);
      const ausdehnung = Math.max(px.x1 - px.x0, px.y1 - px.y0);
      this.kamera.abstand = Math.max(30, (this.kamera.abstand * ausdehnung) / ziel);
      this.kameraSetzen();
      const p2 = this.pixelBox(punkte);
      const cx = (p2.x0 + p2.x1) / 2 - this.zonenGroesse.breite / 2;
      const cy = (p2.y0 + p2.y1) / 2 - this.zonenGroesse.hoehe / 2;
      const proPixel =
        (2 * this.kamera.abstand * Math.tan((this.camera.fov * Math.PI) / 360)) /
        this.zonenGroesse.hoehe;
      const rechts = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
      const oben = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
      this.kamera.ziel.addScaledVector(rechts, cx * proPixel).addScaledVector(oben, -cy * proPixel);
    }
    this.kameraSetzen();
    this.anfordern();
  }

  private alleEckpunkte(): THREE.Vector3[] {
    const punkte: THREE.Vector3[] = [];
    for (const o of this.objekte) {
      if (!o.koerper.sichtbar || o.geist || o.gestrichelt) continue;
      for (const m of o.flaechen) {
        const pos = m.geometry.getAttribute('position');
        for (let i = 0; i < pos.count; i += 1) {
          punkte.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld));
        }
      }
    }
    return punkte;
  }

  private pixelBox(punkte: THREE.Vector3[]): { x0: number; y0: number; x1: number; y1: number } {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    const v = new THREE.Vector3();
    for (const p of punkte) {
      v.copy(p).project(this.camera);
      const x = (v.x * 0.5 + 0.5) * this.zonenGroesse.breite;
      const y = (1 - (v.y * 0.5 + 0.5)) * this.zonenGroesse.hoehe;
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
    return { x0, y0, x1, y1 };
  }

  // --- Zeichnen -------------------------------------------------------------------------------------

  zeichne(z: Zeichnung): void {
    this.zeichnung = z;
    for (const o of this.objekte) {
      o.gruppe.traverse((n) => {
        const m = n as THREE.Mesh;
        m.geometry?.dispose();
      });
      this.modell.remove(o.gruppe);
    }
    this.objekte = [];
    this.overlay.clear();
    const farbeKoerper = this.farbe('flaeche-2');
    const farbeKante = this.farbe(KANTEN_FARBE);
    const farbeGeist = this.farbe('text-3');
    const alle = [...z.koerper, ...z.zusatz.map((k) => ({ ...k, schritt: `${k.schritt}#geist` }))];
    for (const k of alle) {
      const istZusatz = k.schritt.endsWith('#geist');
      const geist = istZusatz || z.geister.has(k.schritt);
      const gestrichelt = z.gestrichelt.has(k.schritt);
      const o = this.bauen(k, geist, gestrichelt, z, farbeKoerper, farbeKante, farbeGeist);
      this.objekte.push(o);
      this.modell.add(o.gruppe);
    }
    for (const s of z.skizzen) this.overlay.add(this.skizzenLinie(s));
    this.modell.updateMatrixWorld(true);
    this.kantenCache = null;
    this.konturenAktualisieren();
    this.anfordern();
  }

  private skizzenLinie(s: SkizzenLinie): THREE.Line {
    const pts: THREE.Vector3[] = [];
    const u0 = s.mitte.u - s.laenge / 2;
    const u1 = s.mitte.u + s.laenge / 2;
    const v0 = s.mitte.v - s.breite / 2;
    const v1 = s.mitte.v + s.breite / 2;
    const r = Math.min(s.eckradius, s.laenge / 2, s.breite / 2);
    const bogen = (cx: number, cy: number, von: number) => {
      for (let i = 0; i <= 8; i++) {
        const w = von + ((Math.PI / 2) * i) / 8;
        pts.push(new THREE.Vector3(cx + r * Math.cos(w), cy + r * Math.sin(w), 0));
      }
    };
    if (r > 0) {
      bogen(u1 - r, v1 - r, 0);
      bogen(u0 + r, v1 - r, Math.PI / 2);
      bogen(u0 + r, v0 + r, Math.PI);
      bogen(u1 - r, v0 + r, (3 * Math.PI) / 2);
    } else {
      pts.push(new THREE.Vector3(u1, v1, 0), new THREE.Vector3(u0, v1, 0));
      pts.push(new THREE.Vector3(u0, v0, 0), new THREE.Vector3(u1, v0, 0));
    }
    pts.push(pts[0] as THREE.Vector3);
    const linie = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: this.farbe('text') }),
    );
    linie.applyMatrix4(ebenenMatrix(s.ebene, 0));
    return linie;
  }

  private bauen(
    k: Koerper,
    geist: boolean,
    gestrichelt: boolean,
    z: Zeichnung,
    farbeKoerper: THREE.Color,
    farbeKante: THREE.Color,
    farbeGeist: THREE.Color,
  ): KoerperObjekt {
    const gruppe = new THREE.Group();
    const geometrien = geometrienVon(k);
    const flaechen: THREE.Mesh[] = [];
    const segmente: number[] = [];
    const durchsicht = z.darstellung === 'durchsicht';
    const nurKanten = z.darstellung === 'kanten';
    const sichtbar = k.sichtbar;
    for (const g of geometrien) {
      if (z.verlauf && !geist) verlaufFarben(g, this.farbe('flaeche-2'), this.farbe('fehler'));
      const kanten = new THREE.EdgesGeometry(g, TRESHOLD_WINKEL);
      const pos = kanten.getAttribute('position');
      for (let i = 0; i < pos.count; i++) segmente.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      const material = new THREE.MeshLambertMaterial({
        color: geist ? farbeGeist : z.verlauf ? new THREE.Color(1, 1, 1) : farbeKoerper,
        vertexColors: z.verlauf && !geist,
        flatShading: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        side: k.art === 'zylinder' ? THREE.DoubleSide : THREE.FrontSide,
        transparent: geist || durchsicht,
        opacity: geist ? 0.35 : durchsicht ? 0.3 : 1,
        depthWrite: !(geist || durchsicht),
        colorWrite: !nurKanten,
      });
      const mesh = new THREE.Mesh(g, material);
      mesh.userData.schritt = k.schritt;
      mesh.visible = sichtbar && !gestrichelt;
      flaechen.push(mesh);
      gruppe.add(mesh);
      // Kanten
      if (sichtbar) {
        if (gestrichelt) {
          const linie = new THREE.LineSegments(
            kanten,
            new THREE.LineDashedMaterial({
              color: this.farbe('text-3'),
              dashSize: STRICH,
              gapSize: STRICH,
            }),
          );
          linie.computeLineDistances();
          gruppe.add(linie);
        } else if (geist) {
          gruppe.add(
            new THREE.LineSegments(kanten, new THREE.LineBasicMaterial({ color: farbeGeist })),
          );
        } else {
          gruppe.add(
            new THREE.LineSegments(
              kanten,
              new THREE.LineBasicMaterial({ color: farbeKante, depthTest: !durchsicht }),
            ),
          );
          if (nurKanten) {
            // Verdeckte Kanten dünner und blasser.
            gruppe.add(
              new THREE.LineSegments(
                kanten,
                new THREE.LineBasicMaterial({
                  color: farbeKante,
                  transparent: true,
                  opacity: 0.35,
                  depthFunc: THREE.GreaterDepth,
                }),
              ),
            );
          }
        }
      }
    }
    gruppe.updateMatrixWorld(true);
    return { koerper: k, gruppe, flaechen, segmente, geist, gestrichelt };
  }

  // --- Auswahl und Hervorhebung ---------------------------------------------------------------------

  setAuswahl(ids: string[]): void {
    this.auswahl = new Set(ids);
    this.konturenAktualisieren();
  }

  setHover(id: string | null): void {
    if (this.hover === id) return;
    this.hover = id;
    this.konturenAktualisieren();
  }

  private konturenAktualisieren(): void {
    for (const l of this.konturen) {
      this.scene.remove(l);
      l.geometry.dispose();
      (l.material as LineMaterial).dispose();
    }
    this.konturen = [];
    const gewaehlt = [...this.auswahl];
    const schritte = new Set<string>();
    const kanten: { von: V3; bis: V3 }[] = [];
    for (const id of gewaehlt) {
      if (id.includes('/k/')) {
        for (const o of this.objekte) {
          const kante = o.koerper.kanten.find((x) => x.id === id);
          if (kante) kanten.push({ von: kante.von, bis: kante.bis });
        }
      } else schritte.add(id);
    }
    const erzeuge = (positionen: number[], breite: number) => {
      if (!positionen.length) return;
      const g = new LineSegmentsGeometry();
      g.setPositions(positionen);
      const m = new LineMaterial({
        color: this.farbe('akzent').getHex(),
        linewidth: breite,
        worldUnits: false,
      });
      m.resolution.set(this.zonenGroesse.breite, this.zonenGroesse.hoehe);
      const l = new LineSegments2(g, m);
      l.renderOrder = 10;
      this.scene.add(l);
      this.konturen.push(l);
    };
    const segmenteVon = (ids: Set<string>): number[] => {
      const out: number[] = [];
      for (const o of this.objekte) {
        if (!ids.has(o.koerper.schritt) || !o.koerper.sichtbar || o.geist || o.gestrichelt)
          continue;
        out.push(...o.segmente);
      }
      return out;
    };
    erzeuge(segmenteVon(schritte), this.konturBreite);
    const kantenPos: number[] = [];
    for (const k of kanten) kantenPos.push(...k.von, ...k.bis);
    erzeuge(kantenPos, this.konturBreite);
    if (this.hover && !schritte.has(this.hover)) erzeuge(segmenteVon(new Set([this.hover])), 1.5);
    this.anfordern();
  }

  /** Geometrie je Schritt für `ansicht()`. */
  geometrie(): {
    schritt: string;
    sichtbar: boolean;
    flaechen: boolean;
    gestrichelt: boolean;
    hervorgehoben: boolean;
    ausgewaehlt: boolean;
  }[] {
    const nach = new Map<string, KoerperObjekt>();
    for (const o of this.objekte) if (!o.geist) nach.set(o.koerper.schritt, o);
    return [...nach.values()].map((o) => ({
      schritt: o.koerper.schritt,
      sichtbar: o.koerper.sichtbar,
      flaechen: o.koerper.sichtbar && !o.gestrichelt,
      gestrichelt: o.gestrichelt,
      hervorgehoben: this.hover === o.koerper.schritt,
      ausgewaehlt: this.auswahl.has(o.koerper.schritt),
    }));
  }

  // --- Rendern --------------------------------------------------------------------------------------

  anfordern(): void {
    if (this.angefordert) return;
    this.angefordert = true;
    requestAnimationFrame(() => this.rendern());
  }

  private rendern(): void {
    this.angefordert = false;
    if (this.tween) {
      const t = this.tween;
      const jetzt = performance.now();
      const p = Math.min(1, (jetzt - t.start) / (t.ende - t.start));
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
      this.kamera.azimut = t.von.azimut + (t.nach.azimut - t.von.azimut) * e;
      this.kamera.hoehe = t.von.hoehe + (t.nach.hoehe - t.von.hoehe) * e;
      this.kamera.abstand = t.von.abstand + (t.nach.abstand - t.von.abstand) * e;
      this.kamera.ziel.lerpVectors(t.von.ziel, t.nach.ziel, e);
      if (p >= 1) this.tween = null;
      else this.anfordern();
    }
    this.kameraSetzen();
    this.kantenCache = null;
    this.renderer.render(this.scene, this.camera);
    this.aufRender?.();
  }

  /** Sofort rendern (für Messungen und Bilder). */
  jetztRendern(): void {
    this.rendern();
  }

  bild(): string {
    this.rendern();
    return this.canvas.toDataURL('image/png');
  }

  // --- Projektion und Auswahl per Strahl ------------------------------------------------------------

  private zuSeite(v: THREE.Vector3): Punkt {
    const r = this.canvas.getBoundingClientRect();
    const p = v.clone().project(this.camera);
    return {
      x: r.left + (p.x * 0.5 + 0.5) * r.width,
      y: r.top + (1 - (p.y * 0.5 + 0.5)) * r.height,
    };
  }

  private strahl(clientX: number, clientY: number): THREE.Intersection | null {
    this.kameraSetzen();
    const r = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -(((clientY - r.top) / r.height) * 2 - 1),
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const ziele = this.objekte
      .filter((o) => o.koerper.sichtbar && !o.geist && !o.gestrichelt)
      .flatMap((o) => o.flaechen);
    const treffer = this.raycaster.intersectObjects(ziele, false);
    return treffer[0] ?? null;
  }

  /** Der Schritt unter dem Zeiger (Fläche) oder `null`. */
  flaecheBei(clientX: number, clientY: number): string | null {
    const t = this.strahl(clientX, clientY);
    return (t?.object.userData.schritt as string | undefined) ?? null;
  }

  /** Sichtbare Kanten (nach Strahl-Test), gecacht je Kamerastand. */
  private sichtbareKanten(): Set<string> {
    this.kameraSetzen();
    const schluessel = `${this.kamera.azimut}|${this.kamera.hoehe}|${this.kamera.abstand}|${this.objekte.length}`;
    if (this.kantenCache?.schluessel === schluessel) return this.kantenCache.sichtbar;
    const sichtbar = new Set<string>();
    for (const o of this.objekte) {
      if (!o.koerper.sichtbar || o.geist || o.gestrichelt) continue;
      for (const kante of o.koerper.kanten) {
        if (this.sichtbarerAnteil(kante.von, kante.bis, [0.25, 0.5, 0.75]).length)
          sichtbar.add(kante.id);
      }
    }
    this.kantenCache = { schluessel, sichtbar };
    return sichtbar;
  }

  /** Beispielpunkte (Parameter t) einer Strecke, die von der Kamera aus nicht verdeckt sind. */
  private sichtbarerAnteil(von: V3, bis: V3, ts: number[]): number[] {
    const ziele = this.objekte
      .filter((o) => o.koerper.sichtbar && !o.geist && !o.gestrichelt)
      .flatMap((o) => o.flaechen);
    const sichtbar: number[] = [];
    for (const t of ts) {
      const p = new THREE.Vector3(
        von[0] + (bis[0] - von[0]) * t,
        von[1] + (bis[1] - von[1]) * t,
        von[2] + (bis[2] - von[2]) * t,
      );
      if (this.punktSichtbar(p, ziele)) sichtbar.push(t);
    }
    return sichtbar;
  }

  private punktSichtbar(p: THREE.Vector3, ziele: THREE.Object3D[]): boolean {
    const richtung = p.clone().sub(this.camera.position);
    const abstand = richtung.length();
    this.raycaster.set(this.camera.position, richtung.normalize());
    const treffer = this.raycaster.intersectObjects(ziele, false)[0];
    return !treffer || treffer.distance >= abstand - 0.4;
  }

  /** Die Kante in höchstens `toleranz` Pixel Abstand vom Zeiger (nur sichtbare Kanten). */
  kanteBei(clientX: number, clientY: number, toleranz = 8): string | null {
    const sichtbar = this.sichtbareKanten();
    let beste: { id: string; d: number } | null = null;
    for (const o of this.objekte) {
      if (!o.koerper.sichtbar || o.geist || o.gestrichelt) continue;
      for (const kante of o.koerper.kanten) {
        if (!sichtbar.has(kante.id)) continue;
        const a = this.zuSeite(new THREE.Vector3(...kante.von));
        const b = this.zuSeite(new THREE.Vector3(...kante.bis));
        const d = abstandPunktStrecke({ x: clientX, y: clientY }, a, b);
        if (d <= toleranz && (!beste || d < beste.d)) beste = { id: kante.id, d };
      }
    }
    return beste?.id ?? null;
  }

  /** Projektion eines Schritts in Seitenkoordinaten (Hüllbox, Flächenmitten, Kanten, Trefferpunkte). */
  projektion(id: string): Projektion | null {
    this.kameraSetzen();
    const o = this.objekte.find((x) => x.koerper.schritt === id && !x.geist);
    if (!o) return null;
    const punkte: THREE.Vector3[] = [];
    for (const m of o.flaechen) {
      const pos = m.geometry.getAttribute('position');
      for (let i = 0; i < pos.count; i++)
        punkte.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }
    const px = punkte.map((p) => this.zuSeite(p));
    const huelle = konvexeHuelle(px);
    const x0 = Math.min(...px.map((p) => p.x));
    const x1 = Math.max(...px.map((p) => p.x));
    const y0 = Math.min(...px.map((p) => p.y));
    const y1 = Math.max(...px.map((p) => p.y));
    const k = o.koerper;
    const mitte: V3 = [
      (k.min[0] + k.max[0]) / 2,
      (k.min[1] + k.max[1]) / 2,
      (k.min[2] + k.max[2]) / 2,
    ];
    const ziele = this.objekte
      .filter((q) => q.koerper.sichtbar && !q.geist && !q.gestrichelt)
      .flatMap((q) => q.flaechen);
    const flaecheMitte = (p: V3): Punkt | null => {
      const v = new THREE.Vector3(...p);
      return this.punktSichtbar(v, ziele) ? this.zuSeite(v) : null;
    };
    const flaechenPunkte: Record<string, V3> = {
      oben: [mitte[0], mitte[1], k.max[2]],
      unten: [mitte[0], mitte[1], k.min[2]],
      vorn: [mitte[0], k.min[1], mitte[2]],
      hinten: [mitte[0], k.max[1], mitte[2]],
      links: [k.min[0], mitte[1], mitte[2]],
      rechts: [k.max[0], mitte[1], mitte[2]],
    };
    const sichtbareFlaechen: Record<string, Punkt | null> = {};
    for (const [name, p] of Object.entries(flaechenPunkte))
      sichtbareFlaechen[name] = flaecheMitte(p);
    const kanten: Projektion['kanten'] = [];
    for (const kante of k.kanten) {
      const ts = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
      const sichtbar = this.sichtbarerAnteil(kante.von, kante.bis, ts);
      if (!sichtbar.length) continue;
      const t = sichtbar[Math.floor(sichtbar.length / 2)] as number;
      const v = new THREE.Vector3(
        kante.von[0] + (kante.bis[0] - kante.von[0]) * t,
        kante.von[1] + (kante.bis[1] - kante.von[1]) * t,
        kante.von[2] + (kante.bis[2] - kante.von[2]) * t,
      );
      const teile = kante.name.split('-');
      const angrenzend = teile.map((t2) => sichtbareFlaechen[t2]).filter((p): p is Punkt => !!p);
      if (!angrenzend.length) continue;
      kanten.push({ id: kante.id, name: kante.name, mitte: this.zuSeite(v), flaechen: angrenzend });
    }
    // Trefferpunkte: Dreiecksmitten, deren Strahl wieder diesen Schritt trifft.
    const treffer: Punkt[] = [];
    const rand = this.canvas.getBoundingClientRect();
    for (const m of o.flaechen) {
      const pos = m.geometry.getAttribute('position');
      for (let i = 0; i + 2 < pos.count; i += 3) {
        const c = new THREE.Vector3()
          .fromBufferAttribute(pos, i)
          .add(new THREE.Vector3().fromBufferAttribute(pos, i + 1))
          .add(new THREE.Vector3().fromBufferAttribute(pos, i + 2))
          .multiplyScalar(1 / 3);
        const s = this.zuSeite(c);
        if (
          s.x < rand.left + 5 ||
          s.x > rand.right - 5 ||
          s.y < rand.top + 5 ||
          s.y > rand.bottom - 5
        )
          continue;
        if (this.flaecheBei(s.x, s.y) === id && this.kanteBei(s.x, s.y, 10) === null)
          treffer.push(s);
      }
    }
    const zOben = new THREE.Vector3(mitte[0], mitte[1], k.max[2]);
    const a = this.zuSeite(zOben);
    const b = this.zuSeite(zOben.clone().add(new THREE.Vector3(0, 0, 10)));
    return {
      huellbox: { x: x0, y: y0, breite: x1 - x0, hoehe: y1 - y0 },
      huelle,
      flaechen: {
        oben: sichtbareFlaechen.oben ?? null,
        vorn: sichtbareFlaechen.vorn ?? null,
        rechts: sichtbareFlaechen.rechts ?? null,
      },
      kanten,
      treffer: auswaehlen(treffer, 12),
      oben: a,
      z_px_pro_mm: { x: (b.x - a.x) / 10, y: (b.y - a.y) / 10 },
    };
  }

  /** Umgebendes Rechteck der projizierten Eckpunkte eines Schritts (Seitenkoordinaten), ohne Strahltests. */
  huellbox(id: string): { x: number; y: number; breite: number; hoehe: number } | null {
    this.kameraSetzen();
    const o = this.objekte.find((x) => x.koerper.schritt === id && !x.geist && x.koerper.sichtbar);
    if (!o) return null;
    const px: Punkt[] = [];
    for (const m of o.flaechen) {
      const pos = m.geometry.getAttribute('position');
      for (let i = 0; i < pos.count; i++)
        px.push(this.zuSeite(new THREE.Vector3().fromBufferAttribute(pos, i)));
    }
    if (!px.length) return null;
    const x0 = Math.min(...px.map((p) => p.x));
    const x1 = Math.max(...px.map((p) => p.x));
    const y0 = Math.min(...px.map((p) => p.y));
    const y1 = Math.max(...px.map((p) => p.y));
    return { x: x0, y: y0, breite: x1 - x0, hoehe: y1 - y0 };
  }

  /** Seitenkoordinaten eines Weltpunkts. */
  projiziere(p: V3): Punkt {
    this.kameraSetzen();
    return this.zuSeite(new THREE.Vector3(...p));
  }

  /** Punkt der Ebene (Seitenkoordinaten → Skizzenkoordinaten u, v in mm); `null` bei Parallelität. */
  aufEbene(clientX: number, clientY: number, ebene: EbeneName): { u: number; v: number } | null {
    this.kameraSetzen();
    const r = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -(((clientY - r.top) / r.height) * 2 - 1),
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const m = ebenenMatrix(ebene, 0);
    const normal = new THREE.Vector3(0, 0, 1).transformDirection(m);
    const ebeneObj = new THREE.Plane(normal, 0);
    const p = new THREE.Vector3();
    if (!this.raycaster.ray.intersectPlane(ebeneObj, p)) return null;
    const lokal = p.applyMatrix4(m.clone().invert());
    return { u: lokal.x, v: lokal.y };
  }

  hatKoerper(): boolean {
    return this.objekte.some((o) => o.koerper.sichtbar && !o.geist);
  }
}

export interface Kamera {
  azimut: number;
  hoehe: number;
  abstand: number;
  ziel: THREE.Vector3;
}

function auswaehlen<T>(liste: T[], n: number): T[] {
  if (liste.length <= n) return liste;
  const schritt = liste.length / n;
  return Array.from({ length: n }, (_, i) => liste[Math.floor(i * schritt)] as T);
}

function abstandPunktStrecke(p: Punkt, a: Punkt, b: Punkt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** Konvexe Hülle (Monotone Chain). */
export function konvexeHuelle(punkte: Punkt[]): Punkt[] {
  const p = [...punkte].sort((a, b) => a.x - b.x || a.y - b.y);
  if (p.length < 3) return p;
  const kreuz = (o: Punkt, a: Punkt, b: Punkt) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const unten: Punkt[] = [];
  for (const q of p) {
    while (
      unten.length >= 2 &&
      kreuz(unten[unten.length - 2] as Punkt, unten[unten.length - 1] as Punkt, q) <= 0
    )
      unten.pop();
    unten.push(q);
  }
  const oben: Punkt[] = [];
  for (const q of [...p].reverse()) {
    while (
      oben.length >= 2 &&
      kreuz(oben[oben.length - 2] as Punkt, oben[oben.length - 1] as Punkt, q) <= 0
    )
      oben.pop();
    oben.push(q);
  }
  unten.pop();
  oben.pop();
  return [...unten, ...oben];
}

/** Abbildung der Skizzenebene in den Raum; `z` verschiebt entlang der Ebenennormalen. */
export function ebenenMatrix(ebene: EbeneName, z: number): THREE.Matrix4 {
  const m = new THREE.Matrix4();
  if (ebene === 'XZ')
    m.makeBasis(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, -1, 0),
    );
  else if (ebene === 'YZ')
    m.makeBasis(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0));
  else m.identity();
  const t = new THREE.Matrix4().makeTranslation(0, 0, z);
  return m.multiply(t);
}

function plattenGeometrie(p: Platte): THREE.BufferGeometry {
  const s = new THREE.Shape();
  const x0 = p.mitte.u - p.laenge / 2;
  const x1 = p.mitte.u + p.laenge / 2;
  const y0 = p.mitte.v - p.breite / 2;
  const y1 = p.mitte.v + p.breite / 2;
  const r = Math.min(p.eckradius, p.laenge / 2, p.breite / 2);
  if (r > 0) {
    s.moveTo(x0 + r, y0);
    s.lineTo(x1 - r, y0);
    s.absarc(x1 - r, y0 + r, r, -Math.PI / 2, 0, false);
    s.lineTo(x1, y1 - r);
    s.absarc(x1 - r, y1 - r, r, 0, Math.PI / 2, false);
    s.lineTo(x0 + r, y1);
    s.absarc(x0 + r, y1 - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(x0, y0 + r);
    s.absarc(x0 + r, y0 + r, r, Math.PI, (3 * Math.PI) / 2, false);
  } else {
    s.moveTo(x0, y0);
    s.lineTo(x1, y0);
    s.lineTo(x1, y1);
    s.lineTo(x0, y1);
    s.lineTo(x0, y0);
  }
  for (const l of p.loecher) {
    const h = new THREE.Path();
    h.absarc(l.x, l.y, p.lochDurchmesser / 2, 0, Math.PI * 2, true);
    s.holes.push(h);
  }
  const g = new THREE.ExtrudeGeometry(s, {
    depth: p.dicke,
    bevelEnabled: false,
    curveSegments: 12,
  });
  g.applyMatrix4(ebenenMatrix(p.ebene, p.z0));
  return g;
}

/** Geometrien (Flächen) eines Körpers in Weltkoordinaten. */
function geometrienVon(k: Koerper): THREE.BufferGeometry[] {
  const groesse = new THREE.Vector3(k.max[0] - k.min[0], k.max[1] - k.min[1], k.max[2] - k.min[2]);
  const mitte = new THREE.Vector3(
    (k.min[0] + k.max[0]) / 2,
    (k.min[1] + k.max[1]) / 2,
    (k.min[2] + k.max[2]) / 2,
  );
  if (k.art === 'platte' && k.platte) return [plattenGeometrie(k.platte)];
  if (k.art === 'zylinder' && k.platte) {
    const r = k.platte.lochDurchmesser / 2 - 0.02;
    return k.platte.loecher.map((l) => {
      const g = new THREE.CylinderGeometry(r, r, groesse.z, 28, 1, true);
      g.rotateX(Math.PI / 2);
      g.translate(l.x, l.y, mitte.z);
      return g;
    });
  }
  if (k.art === 'schale') {
    const w = k.wand ?? 2;
    const boden = new THREE.BoxGeometry(groesse.x, groesse.y, w).translate(
      mitte.x,
      mitte.y,
      k.min[2] + w / 2,
    );
    const s = new THREE.Shape();
    s.moveTo(k.min[0], k.min[1]);
    s.lineTo(k.max[0], k.min[1]);
    s.lineTo(k.max[0], k.max[1]);
    s.lineTo(k.min[0], k.max[1]);
    s.lineTo(k.min[0], k.min[1]);
    const loch = new THREE.Path();
    loch.moveTo(k.min[0] + w, k.min[1] + w);
    loch.lineTo(k.min[0] + w, k.max[1] - w);
    loch.lineTo(k.max[0] - w, k.max[1] - w);
    loch.lineTo(k.max[0] - w, k.min[1] + w);
    loch.lineTo(k.min[0] + w, k.min[1] + w);
    s.holes.push(loch);
    const wand = new THREE.ExtrudeGeometry(s, {
      depth: groesse.z - w,
      bevelEnabled: false,
    }).translate(0, 0, k.min[2] + w);
    return [boden, wand];
  }
  const rundung = k.rundung;
  if (rundung && (rundung.vorn > 0 || rundung.hinten > 0)) {
    const [y0, y1, z0, z1] = [k.min[1], k.max[1], k.min[2], k.max[2]];
    const rv = rundung.vorn;
    const rb = rundung.hinten;
    const s = new THREE.Shape();
    s.moveTo(y0, z0);
    s.lineTo(y1, z0);
    s.lineTo(y1, z1 - rb);
    if (rb > 0) s.absarc(y1 - rb, z1 - rb, rb, 0, Math.PI / 2, false);
    else s.lineTo(y1, z1);
    s.lineTo(y0 + rv, z1);
    if (rv > 0) s.absarc(y0 + rv, z1 - rv, rv, Math.PI / 2, Math.PI, false);
    else s.lineTo(y0, z1);
    s.lineTo(y0, z0);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: groesse.x,
      bevelEnabled: false,
      curveSegments: 10,
    });
    const m = new THREE.Matrix4().makeBasis(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 0),
    );
    g.applyMatrix4(m);
    g.translate(k.min[0], 0, 0);
    return [g];
  }
  return [
    new THREE.BoxGeometry(groesse.x, groesse.y, groesse.z).translate(mitte.x, mitte.y, mitte.z),
  ];
}

/** Farbverlauf über die Höhe (Beispielpaket Simulation): von `flaeche-2` bis `fehler`. */
function verlaufFarben(g: THREE.BufferGeometry, a: THREE.Color, b: THREE.Color): void {
  const pos = g.getAttribute('position');
  const farben = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const s = Math.min(1, Math.max(0, pos.getZ(i) / 48)) ** 2;
    const c = a.clone().lerp(b, s);
    farben[i * 3] = c.r;
    farben[i * 3 + 1] = c.g;
    farben[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(farben, 3));
}
