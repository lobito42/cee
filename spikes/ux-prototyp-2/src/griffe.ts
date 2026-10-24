// Griffe am gewählten Element (ADR-044): Richtung der Bildschirmbewegung je Millimeter.
import type { App } from './app';

/** Bildschirmvektor einer Verschiebung um +1 mm entlang Z an der Oberseite des Elements. */
export function griffRichtung(app: App, id: string): { x: number; y: number } {
  const box = app.huelle(id);
  if (!box || !app.szene) return { x: 0, y: -1 };
  const cx = (box.min[0] + box.max[0]) / 2;
  const cy = (box.min[1] + box.max[1]) / 2;
  const p0 = app.szene.projiziere([cx, cy, box.max[2]]);
  const p1 = app.szene.projiziere([cx, cy, box.max[2] + 1]);
  return { x: p1.x - p0.x, y: p1.y - p0.y };
}
