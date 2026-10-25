import { describe, expect, it } from 'vitest';
import { befehleAusDatei } from '../modell/register';
import de from './de.json';
import en from './en.json';

type Baum = { [k: string]: string | Baum };

function flach(b: Baum, pre = ''): Record<string, string> {
  const aus: Record<string, string> = {};
  for (const [k, v] of Object.entries(b)) {
    if (typeof v === 'string') aus[`${pre}${k}`] = v;
    else Object.assign(aus, flach(v, `${pre}${k}.`));
  }
  return aus;
}

const quellen = import.meta.glob<string>(['../**/*.ts', '!../**/*.test.ts', '!../erzeugt/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('Übersetzungen', () => {
  const d = flach(de as Baum);
  const e = flach(en as Baum);

  it('Deutsch und Englisch haben dieselben Schlüssel, keiner ist leer', () => {
    expect(Object.keys(d).sort()).toEqual(Object.keys(e).sort());
    expect(Object.values(d).filter((v) => !v.trim())).toEqual([]);
    expect(Object.values(e).filter((v) => !v.trim())).toEqual([]);
  });

  it('jeder Befehlstitel des Registers ist übersetzt', () => {
    const fehlt = befehleAusDatei.map((b) => b.titel).filter((k) => !(k in d));
    expect(fehlt).toEqual([]);
  });

  it('jeder feste Schlüssel im Quelltext existiert', () => {
    const fehlt: string[] = [];
    for (const [datei, text] of Object.entries(quellen)) {
      for (const m of text.matchAll(/\bt\('([a-z][\w.-]*)'/g)) {
        if (!((m[1] as string) in d)) fehlt.push(`${datei}: ${m[1]}`);
      }
    }
    expect(fehlt).toEqual([]);
  });
});
