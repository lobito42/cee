// Prüfprogramm `bindctl` für den Kern als WASM im Browser (ap-40): npm run -s kern:bindctl-browser -- <befehl>
// Startet einen statischen Server auf 127.0.0.1, öffnet tools/bindctl.html in Headless-Chromium (Playwright)
// und gibt das Ergebnis auf stdout aus. Dateien liest und schreibt die Seite über diesen Server.
// Voraussetzung: npm run kern:build (legt client/src/kern/pkg-web an) und npx playwright install chromium.
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { wasmSizeKb } from './bindctl-size.mjs';

const client = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm',
};

function body(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handle(req, res) {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  try {
    if (url.pathname === '/fs') {
      const path = url.searchParams.get('path') ?? '';
      if (req.method === 'POST') {
        writeFileSync(path, await body(req));
        res.writeHead(204).end();
      } else {
        res.writeHead(200, { 'content-type': 'application/octet-stream' }).end(readFileSync(path));
      }
      return;
    }
    if (url.pathname === '/wasm-size') {
      res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify(wasmSizeKb()));
      return;
    }
    const file = normalize(join(client, decodeURIComponent(url.pathname)));
    const allowed = [join(client, 'tools') + sep, join(client, 'src', 'kern') + sep];
    if (!allowed.some((dir) => file.startsWith(dir))) {
      res.writeHead(404).end();
      return;
    }
    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': type }).end(readFileSync(file));
  } catch (e) {
    res.writeHead(500, { 'content-type': 'text/plain' }).end(String(e));
  }
}

const server = createServer((req, res) => {
  handle(req, res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const port = typeof address === 'object' && address ? address.port : 0;
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.error(`Seite: ${e.message}`));
  await page.goto(`http://127.0.0.1:${port}/tools/bindctl.html`);
  await page.waitForFunction(() => window.bindctlReady === true, null, { timeout: 120_000 });
  const out = await page.evaluate((args) => window.runBindctl(args), process.argv.slice(2));
  console.log(out);
} finally {
  await browser.close();
  server.close();
}
