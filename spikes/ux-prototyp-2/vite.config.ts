import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { kernelBruecke } from './bruecke/kernel';

// Die Brücke zum Geometrie-Worker gibt es nur in `vorschau.sh` (CEE_BRUECKE=1) und im Prüfmodus
// (CEE_BRUECKE=pruefen); der statische Build und die übrigen Prüfbefehle laufen ohne sie (ap-50).
const bruecke = process.env.CEE_BRUECKE;
const repo = fileURLToPath(new URL('../..', import.meta.url));

export default defineConfig({
  base: './',
  build: { target: 'es2022' },
  // `format/examples` liegt außerhalb des Prototyps (Testzustand drahtmodell-beispiel)
  server: { host: '127.0.0.1', fs: { allow: [repo] } },
  preview: { host: '127.0.0.1' },
  plugins: bruecke ? [kernelBruecke({ repo, pruefmodus: bruecke === 'pruefen' })] : [],
  test: { include: ['src/**/*.test.ts'] },
});
