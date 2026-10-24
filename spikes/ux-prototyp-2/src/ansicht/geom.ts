// Kleine Geometriehilfen für die Überlagerung (Bildschirmkoordinaten).
import type { Punkt } from './szene';

/** Konvexe Hülle (Monotone Chain), gegen den Uhrzeigersinn. */
export function konvexeHuelle(punkte: Punkt[]): Punkt[] {
  const p = [...punkte].sort((a, b) => a.x - b.x || a.y - b.y);
  if (p.length <= 2) return p;
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
  return [...unten.slice(0, -1), ...oben.slice(0, -1)];
}

export function huellbox(punkte: Punkt[]): { x: number; y: number; breite: number; hoehe: number } {
  const xs = punkte.map((p) => p.x);
  const ys = punkte.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, breite: Math.max(...xs) - x, hoehe: Math.max(...ys) - y };
}

/** Punkte entlang des Streckenzugs im Abstand von ca. `schritt` Pixeln (geschlossen, wenn `zu`). */
export function entlang(polygon: Punkt[], schritt: number, zu = true): Punkt[] {
  const aus: Punkt[] = [];
  const n = polygon.length;
  for (let i = 0; i < (zu ? n : n - 1); i++) {
    const a = polygon[i] as Punkt;
    const b = polygon[(i + 1) % n] as Punkt;
    const laenge = Math.hypot(b.x - a.x, b.y - a.y);
    const k = Math.max(1, Math.floor(laenge / schritt));
    for (let j = 0; j < k; j++)
      aus.push({ x: a.x + ((b.x - a.x) * j) / k, y: a.y + ((b.y - a.y) * j) / k });
  }
  return aus;
}
