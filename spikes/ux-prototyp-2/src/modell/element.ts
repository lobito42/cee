// Elemente des Prototyps (Wegwerf): Elementform nach ADR-028, Zahlen als Größe mit Einheit (ADR-057).
import type { Groesse } from '../wert/wertfeld';

export interface Element {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>;
  /** Eingänge `<id>.<ausgang>` (Drahtmodell, ap-50). */
  inputs?: Record<string, string>;
  content: Element[];
  meta: { name: string; verworfen?: boolean } & Record<string, unknown>;
}

/** Adresse eines Gewählten (ADR-058): Element, optional Kante oder Fläche; nie ein Index (ADR-016). */
export interface Adresse {
  element_id: string;
  teil?: { art: 'kante' | 'flaeche'; adresse: string };
}

export const mm = (value: number): Groesse => ({ value, unit: 'mm' });

export function element(
  id: string,
  type: string,
  name: string,
  params: Record<string, unknown> = {},
  content: Element[] = [],
): Element {
  return { id, type, params, content, meta: { name } };
}

export const kopie = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

/** Alle Nachfahren in Dokumentreihenfolge (ohne die Wurzel selbst). */
export function nachfahren(wurzel: Element): Element[] {
  return wurzel.content.flatMap((k) => [k, ...nachfahren(k)]);
}

export const alleElemente = (wurzel: Element): Element[] => [wurzel, ...nachfahren(wurzel)];

export function finde(wurzel: Element, id: string): Element | undefined {
  return alleElemente(wurzel).find((k) => k.id === id);
}

export function elternVon(wurzel: Element, id: string): Element | undefined {
  return alleElemente(wurzel).find((k) => k.content.some((c) => c.id === id));
}

/** Pfad von der Wurzel bis zum Element (beide eingeschlossen); leer, wenn es fehlt. */
export function pfadZu(wurzel: Element, id: string): Element[] {
  if (wurzel.id === id) return [wurzel];
  for (const k of wurzel.content) {
    const p = pfadZu(k, id);
    if (p.length) return [wurzel, ...p];
  }
  return [];
}

export const istVerworfen = (e: Element): boolean => e.meta.verworfen === true;

export const wert = (g: unknown): number =>
  g && typeof g === 'object' ? (g as { value: number }).value : 0;

/** Nächste freie ID mit Präfix: `praefix`, dann `praefix-2`, … */
export function neueId(wurzel: Element, praefix: string): string {
  const ids = new Set(alleElemente(wurzel).map((e) => e.id));
  if (!ids.has(praefix)) return praefix;
  let n = 2;
  while (ids.has(`${praefix}-${n}`)) n += 1;
  return `${praefix}-${n}`;
}
