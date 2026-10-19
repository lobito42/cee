// Aufruf: node spikes/datenmodell/wasm/hash.mjs <projekt.json> <ops.json>
// Gibt {"hash": "<hex>"} aus – gleiche Ausgabe wie der native Befehl `hash` und nif/hash.exs.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { Doc } = require("./pkg/datenmodell_wasm.js");

const [project, ops] = process.argv.slice(2);
if (!project || !ops) {
  console.error("Aufruf: node hash.mjs <projekt.json> <ops.json>");
  process.exit(2);
}
try {
  const doc = Doc.fromJson(readFileSync(project, "utf8"));
  doc.applyOps(readFileSync(ops, "utf8"));
  console.log(JSON.stringify({ hash: doc.hash() }));
  doc.free();
} catch (e) {
  console.error(`Fehler: ${e.message ?? e}`);
  process.exit(1);
}
