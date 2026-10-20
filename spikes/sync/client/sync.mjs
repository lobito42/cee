#!/usr/bin/env node
// Szenarien des Sync-Spikes (ap-03). Kein Produktcode.
//
//   node spikes/sync/client/sync.mjs <szenario> --url ws://127.0.0.1:<port>/socket --doc <name>
//        [--seed <n>] [--dump <verzeichnis>] [--delay-ms <n>] [--both] --json
//
// Szenarien: live, concurrent, offline (mit --both: beide offline), poison. Beide Clients laufen in
// diesem Node-Prozess mit je eigener Verbindung und eigener WASM-Dokumentkopie; gemessen wird mit
// derselben Uhr (performance.now). Ausgabe: eine JSON-Zeile mit den Messwerten.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Client, Doc, Rng, Waiter, httpBase, now, quantile, round, sleep } from "./lib.mjs";

const N_ELEMENTS = 10_000;
const LIVE_OPS = 200;
const LIVE_INTERVAL_MS = 20;
const CONCURRENT_ROUNDS = 50;
const OFFLINE_OPS = 500;
const TIMEOUT_MS = 120_000;

function parseArgs(argv) {
  const args = { scenario: argv[0], seed: 1, delayMs: 15, both: false, json: false, dump: null };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    const value = () => argv[++i];
    if (a === "--url") args.url = value();
    else if (a === "--doc") args.doc = value();
    else if (a === "--seed") args.seed = Number(value());
    else if (a === "--dump") args.dump = value();
    else if (a === "--delay-ms") args.delayMs = Number(value());
    else if (a === "--both") args.both = true;
    else if (a === "--json") args.json = true;
    else throw new Error(`unbekannte Option ${a}`);
  }
  if (!args.url || !args.doc) throw new Error("--url und --doc sind Pflicht");
  return args;
}

const metric = (value, unit) => ({ value, unit });

async function pair(args) {
  const waiter = new Waiter();
  const opts = { url: args.url, doc: args.doc, delayMs: args.delayMs, waiter };
  const a = new Client("A", opts);
  const b = new Client("B", opts);
  await a.connect();
  await waiter.until(() => a.inSyncWithServer(), TIMEOUT_MS, "Erstabgleich A");
  // Erstabgleich eines neuen Clients mit dem bestehenden Dokument (Beobachtung initial_sync_10k_ms).
  const t0 = now();
  await b.connect();
  const t1 = await waiter.until(() => b.inSyncWithServer(), TIMEOUT_MS, "Erstabgleich B");
  return { a, b, waiter, initialSyncMs: t1 - t0, initialBytes: b.bytesIn + b.bytesOut };
}

const converged = (a, b) => () =>
  a.inSyncWithServer() && b.inSyncWithServer() && a.heads() === b.heads();

async function serverHash(args) {
  const res = await fetch(`${httpBase(args.url)}/docs/${args.doc}/hash`);
  return (await res.json()).hash;
}

async function serverFindings(args) {
  const res = await fetch(`${httpBase(args.url)}/docs/${args.doc}/findings`);
  return res.json();
}

function dump(args, a, b) {
  if (!args.dump) return;
  mkdirSync(args.dump, { recursive: true });
  for (const [side, c] of [
    ["a", a],
    ["b", b],
  ]) {
    writeFileSync(join(args.dump, `ops_${side}.json`), JSON.stringify(c.ops, null, 1));
    writeFileSync(join(args.dump, `project_${side}.json`), c.doc.project());
    writeFileSync(join(args.dump, `hash_${side}`), `${c.doc.hash()}\n`);
  }
}

// --- live ---------------------------------------------------------------------------------------------

async function live(args) {
  const { a, b, waiter, initialSyncMs } = await pair(args);
  const ids = Doc.editableIds(N_ELEMENTS);
  const rng = new Rng(args.seed);
  const names = ["length", "height", "thickness"];
  const latencies = { a_to_b: [], b_to_a: [] };

  // Werte je Lauf verschieden, damit ein zweiter Lauf am selben Dokument nicht „schon angekommen“ misst.
  const nonce = (Date.now() % 900) * 1_000;
  const offset = rng.below(ids.length / 2 - LIVE_OPS);

  async function run(sender, receiver, key, base, parity) {
    const pending = new Map();
    receiver.onReceive = () => {
      for (const [k, p] of pending) {
        if (receiver.doc.field(p.id, "params", p.name) === p.json) {
          latencies[key].push(now() - p.t0);
          pending.delete(k);
        }
      }
    };
    for (let k = 0; k < LIVE_OPS; k++) {
      // Getrennte Elemente je Richtung (gerade/ungerade Positionen) und je Änderung ein eigenes Element,
      // damit jede Änderung einzeln auffindbar ist.
      const id = ids[2 * (offset + k) + parity];
      const name = names[rng.below(names.length)];
      const value = base + nonce + k;
      sender.apply({ op: "set_param", id, name, value });
      pending.set(`${id}|${name}`, { id, name, json: JSON.stringify(value), t0: now() });
      await sleep(LIVE_INTERVAL_MS);
    }
    await waiter.until(() => pending.size === 0, 10_000, "Live-Änderungen").catch(() => {});
    receiver.onReceive = null;
  }

  await run(a, b, "a_to_b", 1_000_000, 0);
  await run(b, a, "b_to_a", 2_000_000, 1);
  await waiter.until(converged(a, b), TIMEOUT_MS, "Konvergenz nach live");
  dump(args, a, b);
  const all = [...latencies.a_to_b, ...latencies.b_to_a];
  const out = {
    scenario: "live",
    delay_ms: args.delayMs,
    metrics: {
      live_a_to_b_p95_ms: metric(round(quantile(latencies.a_to_b, 0.95)), "ms"),
      live_b_to_a_p95_ms: metric(round(quantile(latencies.b_to_a, 0.95)), "ms"),
      live_delivered_pct: metric(round((100 * all.length) / (2 * LIVE_OPS), 2), "%"),
      live_p50_ms: metric(round(quantile(all, 0.5)), "ms"),
      initial_sync_10k_ms: metric(round(initialSyncMs), "ms"),
    },
    delivered: { a_to_b: latencies.a_to_b.length, b_to_a: latencies.b_to_a.length },
  };
  a.close();
  b.close();
  return out;
}

// --- concurrent ---------------------------------------------------------------------------------------

async function concurrent(args) {
  const { a, b, waiter } = await pair(args);
  const ids = Doc.editableIds(N_ELEMENTS);
  const rng = new Rng(args.seed + 1000);
  const times = [];
  const hashTimes = { wasm: [] };
  let convergedRounds = 0;
  for (let r = 0; r < CONCURRENT_ROUNDS; r++) {
    const id = ids[rng.below(ids.length)];
    // Beide setzen im selben Ereignis-Takt denselben Parameter verschieden.
    const t0 = now();
    a.apply({ op: "set_param", id, name: "length", value: 3_000_000 + r });
    b.apply({ op: "set_param", id, name: "length", value: 4_000_000 + r });
    const t1 = await waiter.until(converged(a, b), TIMEOUT_MS, `Runde ${r}`);
    times.push(t1 - t0);
    // Hash außerhalb der Zeitmessung: A (WASM), B (WASM) und Server (NIF).
    // Die Anfrage an den Server läuft, während die Clients ihren Hash rechnen.
    const serverReply = a.request("hash");
    await sleep(args.delayMs + 2);
    const th = now();
    const [ha, hb] = [a.doc.hash(), b.doc.hash()];
    hashTimes.wasm.push((now() - th) / 2);
    const hs = (await serverReply).hash;
    if (ha === hb && hb === hs) convergedRounds++;
    await sleep(LIVE_INTERVAL_MS);
  }
  dump(args, a, b);
  a.close();
  b.close();
  return {
    scenario: "concurrent",
    delay_ms: args.delayMs,
    metrics: {
      concurrent_converge_p95_ms: metric(round(quantile(times, 0.95)), "ms"),
      concurrent_converged_pct: metric(round((100 * convergedRounds) / CONCURRENT_ROUNDS, 2), "%"),
    },
    details: {
      hash_wasm_p50_ms: round(quantile(hashTimes.wasm, 0.5)),
    },
  };
}

// --- offline ------------------------------------------------------------------------------------------

/** Nachrechnen nach design.md, „Ohne Datenverlust“ (gleiche Definition wie der Abnahmetest). */
export function analyse(ops, elements, findings) {
  const sides = ["a", "b"];
  const other = { a: "b", b: "a" };
  const last = { a: new Map(), b: new Map() };
  const edits = { a: new Map(), b: new Map() };
  const removed = new Map();
  for (const s of sides) {
    for (const op of ops[s]) {
      if (op.op === "remove_element") {
        removed.set(op.id, s);
        continue;
      }
      const field = op.op === "set_param" ? "params" : "inputs";
      const value = op.op === "set_param" ? op.value : op.ref;
      last[s].set(JSON.stringify([field, op.id, op.name]), value);
      if (!edits[s].has(op.id)) edits[s].set(op.id, []);
      edits[s].get(op.id).push([op.name, value]);
    }
  }
  const lost = [];
  const both = [];
  const broken = [];
  const eor = new Map();
  const visible = (field, id, name) => elements.get(id)?.[field]?.[name];
  for (const s of sides) {
    for (const [key, value] of last[s]) {
      const [field, id, name] = JSON.parse(key);
      if (removed.has(id)) continue;
      if (last[other[s]].has(key)) {
        if (s === "a") both.push(key);
        continue;
      }
      const target = typeof value === "string" ? value.split(".")[0] : null;
      if (field === "inputs" && removed.has(target) && removed.get(target) !== s) {
        broken.push([id, name, value]);
      }
      if (JSON.stringify(visible(field, id, name)) !== JSON.stringify(value)) lost.push(key);
    }
    for (const [id, changes] of edits[s]) {
      if (removed.get(id) === other[s]) eor.set(id, changes);
    }
  }
  for (const key of both) {
    const [field, id, name] = JSON.parse(key);
    const got = JSON.stringify(visible(field, id, name));
    if (got !== JSON.stringify(last.a.get(key)) && got !== JSON.stringify(last.b.get(key))) lost.push(key);
  }
  for (const id of removed.keys()) if (elements.has(id)) lost.push(`entfernt: ${id}`);

  const has = (kind, pred) => findings.some((f) => f.kind === kind && pred(f));
  let reported = 0;
  for (const key of both) {
    const [field, id, name] = JSON.parse(key);
    const want = [last.a.get(key), last.b.get(key)].map((v) => JSON.stringify(v));
    if (
      has(
        "conflict",
        (f) =>
          f.id === id &&
          f.name === name &&
          (f.field ?? field) === field &&
          want.every((w) => (f.values ?? []).some((v) => JSON.stringify(v) === w)),
      )
    )
      reported++;
  }
  for (const [id, name, ref] of broken) {
    if (has("broken_reference", (f) => f.id === id && f.input === name && f.target === ref)) reported++;
  }
  for (const [id, changes] of eor) {
    if (
      has(
        "edit_on_removed",
        (f) =>
          f.id === id &&
          changes.every(([n, v]) => (f.edits ?? []).some((e) => e.name === n && e.value === v)),
      )
    )
      reported++;
  }
  const generated = both.length + broken.length + eor.size;
  return { lost: lost.length, generated, reported, both: both.length, broken: broken.length, eor: eor.size };
}

function flatten(project) {
  const out = new Map();
  const walk = (list) => {
    for (const e of list) {
      out.set(e.id, e);
      walk(e.content ?? []);
    }
  };
  walk(project.elements);
  return out;
}

async function offline(args) {
  const { a, b, waiter } = await pair(args);
  const plan = JSON.parse(Doc.offlinePlan(N_ELEMENTS, OFFLINE_OPS, args.seed, args.both));
  const away = args.both ? [a, b] : [b];
  for (const c of away) c.disconnect();

  // Änderungen beider Seiten; online gehen sie sofort an den Server.
  for (let k = 0; k < OFFLINE_OPS; k++) {
    a.apply(plan.a[k]);
    b.apply(plan.b[k]);
    if (k % 25 === 24) await sleep(1);
  }
  if (!args.both) await waiter.until(() => a.inSyncWithServer(), TIMEOUT_MS, "A online abgeglichen");

  // Wiederverbinden und messen, bis A, B und Server denselben Stand haben.
  for (const c of away) {
    c.bytesIn = 0;
    c.bytesOut = 0;
  }
  const t0 = now();
  await Promise.all(away.map((c) => c.connect()));
  const t1 = await waiter.until(converged(a, b), TIMEOUT_MS, "Konvergenz nach Wiederverbinden");
  const bytes = away.reduce((sum, c) => sum + c.bytesIn + c.bytesOut, 0);

  const hashes = { a: a.doc.hash(), b: b.doc.hash(), server: await serverHash(args) };
  const hashEqual = hashes.a === hashes.b && hashes.b === hashes.server ? 1 : 0;
  const findings = await serverFindings(args);
  const elements = flatten(JSON.parse(a.doc.project()));
  const result = analyse({ a: a.ops, b: b.ops }, elements, findings);
  dump(args, a, b);
  a.close();
  b.close();
  const prefix = args.both ? "both_offline" : "offline";
  return {
    scenario: args.both ? "offline --both" : "offline",
    delay_ms: args.delayMs,
    metrics: {
      [`${prefix}_lost_edits`]: metric(result.lost, "Änderungen"),
      [`${prefix}_conflicts_reported_pct`]: metric(
        round((100 * result.reported) / Math.max(1, result.generated), 2),
        "%",
      ),
      [`${prefix}_hash_equal`]: metric(hashEqual, "1 = ja"),
      reconnect_converge_ms: metric(round(t1 - t0), "ms"),
      reconnect_bytes_kb: metric(round(bytes / 1024), "KiB"),
    },
    cases: result,
  };
}

// --- poison -------------------------------------------------------------------------------------------

async function poison(args) {
  const waiter = new Waiter();
  const c = new Client("P", { url: args.url, doc: args.doc, delayMs: args.delayMs, waiter });
  await c.connect();
  await waiter.until(() => c.inSyncWithServer(), TIMEOUT_MS, "Erstabgleich");
  // Gültiges Base64, aber keine Sync-Nachricht: der Kern muss sie mit einem Fehler abweisen.
  const garbage = Buffer.from([0x42, 0xff, 0xff, 0xff, 0x13, 0x37, 0x00, 0x01]).toString("base64");
  const reply = await c.rawPush("sync", { m: garbage, t: Date.now() });
  c.close();
  return { scenario: "poison", reply };
}

const SCENARIOS = { live, concurrent, offline, poison };

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const run = SCENARIOS[args.scenario];
  if (!run) throw new Error(`unbekanntes Szenario ${args.scenario}`);
  const out = await run(args);
  console.log(JSON.stringify(out));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e.stack ?? String(e));
    process.exit(1);
  });
