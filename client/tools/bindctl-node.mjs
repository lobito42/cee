// Prüfprogramm `bindctl` für den Kern als WASM in Node (ap-40): npm run -s kern:bindctl -- <befehl>
// Voraussetzung: npm run kern:build (legt client/src/kern/pkg-node an).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { main } from './bindctl-core.mjs';
import { wasmSizeKb } from './bindctl-size.mjs';

const client = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const kern = require(join(client, 'src', 'kern', 'pkg-node', 'cee_graph_wasm.js'));

const io = {
  readText: async (path) => readFileSync(path, 'utf8'),
  readBytes: async (path) => new Uint8Array(readFileSync(path)),
  writeBytes: async (path, bytes) => writeFileSync(path, bytes),
  sha256: async (text) => createHash('sha256').update(text, 'utf8').digest('hex'),
  now: () => performance.now(),
  wasmSizeKb: async () => wasmSizeKb(),
};

console.log(await main(kern, io, process.argv.slice(2), 'wasm_node'));
