#!/usr/bin/env node
// Führt alle Szenarien des Sync-Spikes gegen einen laufenden Server aus und gibt sync.json aus
// (aufgerufen von bench.sh, das den Server startet und beendet). Fortschritt geht auf stderr, das
// Ergebnis als eine kompakte JSON-Zeile auf stdout.

import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const DELAY_MS = 15; // 30 ms Umlaufzeit je Strecke Client–Server („gleiche Region“)
const SEED = 7;

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
);
const root = args.root;
const url = args.url;
const http = url.replace(/^ws/, "http").replace(/\/socket$/, "");

async function waitHealthy() {
  for (let i = 0; i < 360; i++) {
    try {
      const res = await fetch(`${http}/health`);
      if ((await res.text()).trim() === "ok") return;
    } catch {
      // Server startet noch.
    }
    await sleep(500);
  }
  throw new Error("Server antwortet nicht auf /health");
}

function scenario(name, doc, ...extra) {
  const started = Date.now();
  const res = spawnSync(
    process.execPath,
    [join(root, "client", "sync.mjs"), name, "--url", url, "--doc", doc, ...extra, "--json"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 300_000 },
  );
  if (res.status !== 0) {
    throw new Error(`${name} ${extra.join(" ")}: ${(res.stderr || res.stdout || String(res.error)).slice(-2000)}`);
  }
  const lines = res.stdout.trim().split("\n").filter(Boolean);
  const out = JSON.parse(lines[lines.length - 1]);
  process.stderr.write(`${name} ${extra.join(" ")}: ${((Date.now() - started) / 1000).toFixed(1)} s\n`);
  return out;
}

const value = (out, key) => out.metrics[key].value;

function locked(file, re) {
  try {
    const m = readFileSync(file, "utf8").match(re);
    return m ? m[1] : "unbekannt";
  } catch {
    return "unbekannt";
  }
}

function tool(cmd, argv) {
  try {
    return execFileSync(cmd, argv, { encoding: "utf8" }).trim().split("\n").filter(Boolean).join("; ");
  } catch {
    return "unbekannt";
  }
}

function environment() {
  const cpu = os.cpus()[0]?.model ?? "unbekannt";
  return {
    machine: `${cpu}, ${os.cpus().length} Kerne, ${Math.round(os.totalmem() / 2 ** 30)} GiB, ${os.platform()} ${os.release()}`,
    rust: tool("rustc", ["--version"]),
    automerge: locked(join(root, "Cargo.lock"), /name = "automerge"\nversion = "([^"]+)"/),
    rustler: locked(join(root, "Cargo.lock"), /name = "rustler"\nversion = "([^"]+)"/),
    wasm_bindgen: locked(join(root, "Cargo.lock"), /name = "wasm-bindgen"\nversion = "([^"]+)"/),
    elixir_otp: tool("elixir", ["--version"]),
    phoenix: locked(join(root, "server", "mix.lock"), /"phoenix": \{:hex, :phoenix, "([^"]+)"/),
    bandit: locked(join(root, "server", "mix.lock"), /"bandit": \{:hex, :bandit, "([^"]+)"/),
    node: process.version,
    phoenix_js: locked(join(root, "client", "node_modules", "phoenix", "package.json"), /"version": "([^"]+)"/),
    network: `Loopback 127.0.0.1 mit künstlicher Verzögerung --delay-ms ${DELAY_MS} je Richtung (${2 * DELAY_MS} ms Umlaufzeit je Strecke)`,
  };
}

const THRESHOLDS = {
  live_a_to_b_p95_ms: [200, "<"],
  live_b_to_a_p95_ms: [200, "<"],
  live_delivered_pct: [100, ">="],
  concurrent_converge_p95_ms: [200, "<"],
  concurrent_converged_pct: [100, ">="],
  offline_lost_edits: [0, "<="],
  offline_conflicts_reported_pct: [100, ">="],
  offline_hash_equal: [1, ">="],
  both_offline_lost_edits: [0, "<="],
  both_offline_conflicts_reported_pct: [100, ">="],
  both_offline_hash_equal: [1, ">="],
};
const pass = (v, [t, op]) => (op === "<" ? v < t : op === "<=" ? v <= t : v >= t);

async function main() {
  await waitHealthy();
  const live = scenario("live", "bench-live", "--delay-ms", String(DELAY_MS), "--seed", String(SEED));
  const loopback = scenario("live", "bench-loopback", "--delay-ms", "0", "--seed", String(SEED));
  const concurrent = scenario("concurrent", "bench-concurrent", "--delay-ms", String(DELAY_MS), "--seed", String(SEED));
  const offline = scenario("offline", "bench-offline", "--delay-ms", String(DELAY_MS), "--seed", String(SEED));
  const both = scenario("offline", "bench-both", "--delay-ms", String(DELAY_MS), "--seed", String(SEED), "--both");

  const sources = { ...live.metrics, ...concurrent.metrics, ...offline.metrics, ...both.metrics };
  const metrics = {};
  for (const [key, rule] of Object.entries(THRESHOLDS)) {
    const m = sources[key];
    metrics[key] = { value: m.value, unit: m.unit, threshold: rule[0], pass: pass(m.value, rule) };
  }
  const observations = {
    live_p50_ms: live.metrics.live_p50_ms,
    live_p95_loopback_ms: loopback.metrics.live_a_to_b_p95_ms,
    initial_sync_10k_ms: live.metrics.initial_sync_10k_ms,
    reconnect_converge_ms: offline.metrics.reconnect_converge_ms,
    reconnect_bytes_kb: offline.metrics.reconnect_bytes_kb,
  };
  const details = {
    live_b_to_a_p95_loopback_ms: value(loopback, "live_b_to_a_p95_ms"),
    both_offline_reconnect_converge_ms: value(both, "reconnect_converge_ms"),
    both_offline_reconnect_bytes_kb: value(both, "reconnect_bytes_kb"),
    hash_wasm_10k_p50_ms: concurrent.details.hash_wasm_p50_ms,
    offline_cases: offline.cases,
    both_offline_cases: both.cases,
  };
  const recommendation = Object.values(metrics).every((m) => m.pass) ? "Go" : "No-Go";
  const out = {
    spike: "ap-03-spike-sync",
    command: "bash spikes/sync/bench.sh --json",
    metrics,
    observations,
    details,
    environment: environment(),
    recommendation,
  };
  console.log(JSON.stringify(out));
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e.stack ?? String(e));
    process.exit(1);
  });
