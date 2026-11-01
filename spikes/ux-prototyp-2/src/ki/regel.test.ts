// Satzerkennung (ap-52, design.md Abschnitt 4): Plan, Schritt für Schritt, IDs aus Werkzeugergebnissen,
// festgelegte Deutung von Rechteck und „darüber“, deterministisch.
import { describe, expect, it } from 'vitest';
import { koordinaten, planen, regelSchritt, type Bekannt } from '../../bruecke/ki/regel';
import type { Nachricht } from '../../bruecke/ki/typen';

const BEISPIEL: Bekannt[] = [
  { id: 'K1', typ: 'frame', name: 'Koordinatensystem 1' },
  { id: 'P1', typ: 'point', name: 'Punkt 1' },
  { id: 'P2', typ: 'point', name: 'Punkt 2' },
  { id: 'S1', typ: 'segment', name: 'Strecke 1' },
  { id: 'G1', typ: 'line', name: 'Gerade 1' },
];

const system = (b: Bekannt[]): Nachricht => ({
  rolle: 'system',
  text: [
    'Modellübersicht',
    ...b.map((e) => `${e.id} ${e.typ} "${e.id}" (${e.name}) x=0 mm`),
    'zu: –',
  ].join('\n'),
});

/** Schleife wie im Browser: jeder Aufruf gelingt und legt das nächste freie Element an. */
function durchspielen(satz: string, bekannt: Bekannt[] = []) {
  const n: Nachricht[] = [system(bekannt), { rolle: 'mensch', text: satz }];
  const aufrufe = [];
  for (let i = 0; i < 25; i++) {
    const s = regelSchritt(n);
    if (!s.aufrufe.length) return { aufrufe, schluss: s };
    const a = s.aufrufe[0]!;
    aufrufe.push(a);
    n.push({ rolle: 'ki', aufrufe: [a] });
    n.push({ rolle: 'werkzeug', aufruf_id: a.id, ergebnis: { ok: true, element: `N${i + 1}` } });
  }
  throw new Error('kein Ende');
}

describe('Satzerkennung', () => {
  it('Rechteck mit Ecke im Ursprung und Punkt über der Mitte (W3)', () => {
    const { aufrufe } = durchspielen(
      'Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber',
    );
    expect(aufrufe.map((a) => a.werkzeug)).toEqual([
      ...Array(4).fill('referenz_punkt'),
      ...Array(4).fill('referenz_strecke'),
      'referenz_punkt_relativ',
    ]);
    expect(aufrufe[2]!.argumente).toEqual({ x: '100 mm', y: '60 mm', z: '0 mm' });
    expect(aufrufe[7]!.argumente).toEqual({ a: 'N4.point', b: 'N1.point' });
    expect(aufrufe[8]!.argumente).toEqual({ ref: 'N1.point', x: '50 mm', y: '30 mm', z: '40 mm' });
  });

  it('Koordinatensystem gedreht (W1) und Punkt mit Koordinaten (W2)', () => {
    expect(
      durchspielen('Koordinatensystem bei x 100 mm, um 30° um z gedreht').aufrufe[0],
    ).toMatchObject({
      werkzeug: 'referenz_koordinatensystem',
      argumente: { x: '100 mm', rz: '30 deg' },
    });
    expect(durchspielen('Punkt bei 10, 20, 5 mm').aufrufe[0]!.argumente).toEqual({
      x: '10 mm',
      y: '20 mm',
      z: '5 mm',
    });
    expect(koordinaten('x 40 mm, y 20 mm, z 0')).toEqual({ x: '40 mm', y: '20 mm', z: '0 mm' });
  });

  it('Bezug „diesen Punkt“ und Namen aus der Übersicht (W4, W5)', () => {
    const w4 = durchspielen(
      'Punkt 25 mm über P2 und eine Halbgerade von P2 durch diesen Punkt',
      BEISPIEL,
    );
    expect(w4.aufrufe.map((a) => [a.werkzeug, a.argumente])).toEqual([
      ['referenz_punkt_relativ', { ref: 'P2.point', z: '25 mm' }],
      ['referenz_halbgerade', { a: 'P2.point', b: 'N1.point' }],
    ]);
    const w5 = durchspielen('Verwirf die Strecke S1 und blende die Gerade G1 aus', BEISPIEL);
    expect(w5.aufrufe.map((a) => [a.werkzeug, a.argumente])).toEqual([
      ['element_verwerfen', { element: 'S1' }],
      ['element_ausblenden', { element: 'G1' }],
    ]);
    const linie = durchspielen('zeichne mir eine Linie zwischen Punkt 1 und Punkt 2', BEISPIEL);
    expect(linie.aufrufe[0]).toMatchObject({
      werkzeug: 'referenz_strecke',
      argumente: { a: 'P1.point', b: 'P2.point' },
    });
  });

  it('unbekannter Satz und unbekannter Name', () => {
    expect(planen('Mach mir einen Kaffee', BEISPIEL)).toBeNull();
    expect(durchspielen('Mach mir einen Kaffee').schluss.erkannt).toBe(false);
    const s9 = durchspielen('Verwirf die Strecke S9', BEISPIEL).schluss;
    expect(s9.erkannt).not.toBe(false);
    expect(s9.text).toContain('S9');
  });

  it('gleicher Satz, gleicher Graph: bytegleiche Aufrufe', () => {
    const satz = 'Rechteck 100 × 60 mm in der XY-Ebene mit Punkt 40 mm darüber';
    expect(JSON.stringify(durchspielen(satz).aufrufe)).toBe(
      JSON.stringify(durchspielen(satz).aufrufe),
    );
  });
});
