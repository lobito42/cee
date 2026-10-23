// Seitenteil von `bindctl` im Browser (ap-40): lädt das WASM-Paket für das Web und stellt
// `window.runBindctl(args)` bereit. Dateien kommen über den lokalen Server aus bindctl-browser.mjs.
import init, * as kern from '../src/kern/pkg-web/cee_graph_wasm.js';
import { main } from './bindctl-core.mjs';

const fsUrl = (path) => `/fs?path=${encodeURIComponent(path)}`;

async function fetchOk(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${url}: ${res.status} ${await res.text()}`);
  return res;
}

const io = {
  readText: async (path) => (await fetchOk(fsUrl(path))).text(),
  readBytes: async (path) => new Uint8Array(await (await fetchOk(fsUrl(path))).arrayBuffer()),
  writeBytes: async (path, bytes) => {
    await fetchOk(fsUrl(path), { method: 'POST', body: bytes });
  },
  sha256: async (text) => {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  },
  now: () => performance.now(),
  wasmSizeKb: async () => (await fetchOk('/wasm-size')).json(),
};

await init();
window.runBindctl = (args) => main(kern, io, args, 'wasm_browser');
window.bindctlReady = true;
