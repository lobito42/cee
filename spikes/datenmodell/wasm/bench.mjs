// Aufruf: node spikes/datenmodell/wasm/bench.mjs [elemente] [operationen]
// Misst eine Parameteränderung über WASM in Node (Zeit je Aufruf inkl. Grenzübergang) und gibt
// {"op_p95_ms": …, "op_median_ms": …, "ops": …} aus.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { Doc } = require("./pkg/datenmodell_wasm.js");

const n = Number(process.argv[2] ?? 10000);
const count = Number(process.argv[3] ?? 1000);
const doc = Doc.synth(n);
const ids = Doc.synthEditableIds(n);

// Deterministischer Zufall (xorshift32), damit Läufe vergleichbar sind.
let state = 2463534242;
const next = () => {
  state ^= state << 13;
  state >>>= 0;
  state ^= state >>> 17;
  state ^= state << 5;
  state >>>= 0;
  return state;
};

const measure = (k) => {
  const id = ids[next() % ids.length];
  const t0 = process.hrtime.bigint();
  doc.setParam(id, "length", String(1000 + (k % 4000)));
  return Number(process.hrtime.bigint() - t0) / 1e6;
};

for (let k = 0; k < 100; k++) measure(k);
const times = [];
for (let k = 0; k < count; k++) times.push(measure(k));
times.sort((a, b) => a - b);
const pick = (q) => times[Math.min(count - 1, Math.ceil(q * count) - 1)];
const round = (x) => Math.round(x * 10000) / 10000;
console.log(JSON.stringify({ op_p95_ms: round(pick(0.95)), op_median_ms: round(pick(0.5)), ops: count }));
doc.free();
