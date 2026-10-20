// Demo-Seite des Sync-Spikes (ap-03) für die menschliche Abnahme mit zwei echten Browsern.
// Rust-Kern als WASM (Ziel web), Phoenix-JS-Client, gleiches Sync-Protokoll wie die Node-Clients.

import init, { Doc, SyncConn } from "/wasm/sync_wasm.js";
import { Socket } from "/phoenix/phoenix.mjs";

const NAMES = ["length", "height", "thickness", "width", "depth"];
const params = new URLSearchParams(location.search);
const docName = params.get("doc") ?? "demo";
const elementId = params.get("element") ?? "e000022";

const $ = (id) => document.getElementById(id);
$("doc").textContent = docName;
$("element").textContent = elementId;

await init();
const doc = Doc.empty();
let conn = null;
let socket = null;
let channel = null;
let online = false;
let findingsTimer = null;

// Eingabefelder für fünf Parameter.
const inputs = {};
const latencies = {};
for (const name of NAMES) {
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `<label for="p-${name}">${name}</label><input id="p-${name}" type="number" step="1" />
    <span class="latency muted" id="l-${name}"></span>`;
  $("fields").append(row);
  inputs[name] = row.querySelector("input");
  latencies[name] = row.querySelector(".latency");
  inputs[name].addEventListener("change", () => {
    const value = Number(inputs[name].value);
    if (!Number.isFinite(value) || !doc.ready()) return;
    doc.apply(JSON.stringify({ op: "set_param", id: elementId, name, value }));
    latencies[name].textContent = "lokal geändert";
    flush();
  });
}

const read = (name) => doc.field(elementId, "params", name) ?? "";

function render(changedAt) {
  for (const name of NAMES) {
    const value = read(name);
    if (document.activeElement !== inputs[name] && inputs[name].value !== String(value)) {
      inputs[name].value = value;
      if (changedAt !== undefined) {
        latencies[name].textContent = `empfangen, Latenz ${changedAt} ms`;
      }
    }
  }
}

function flush() {
  if (!online) return;
  const msg = doc.generate(conn);
  if (!msg) return;
  let binary = "";
  for (const b of msg) binary += String.fromCharCode(b);
  channel.push("sync", { m: btoa(binary), t: Date.now() });
}

function onSync(payload) {
  const wasReady = doc.ready();
  const before = Object.fromEntries(NAMES.map((n) => [n, read(n)]));
  const bytes = Uint8Array.from(atob(payload.m), (c) => c.charCodeAt(0));
  doc.receive(conn, bytes);
  const changed = NAMES.some((n) => read(n) !== before[n]);
  // Latenz nur für Änderungen eines anderen Fensters, nicht für den Erstabgleich.
  const latency = wasReady && changed && payload.t ? Date.now() - payload.t : undefined;
  render(latency);
  flush();
  if (changed) scheduleFindings();
}

function connect() {
  conn = new SyncConn();
  socket = new Socket("/socket", { reconnectAfterMs: () => 1000 });
  socket.connect();
  channel = socket.channel(`doc:${docName}`, {});
  channel.on("sync", onSync);
  channel
    .join(120_000)
    .receive("ok", () => {
      online = true;
      setStatus();
      flush();
      scheduleFindings();
    })
    .receive("error", () => setStatus("Beitritt abgelehnt"));
}

function disconnect() {
  online = false;
  socket.disconnect();
  setStatus();
}

function setStatus(text) {
  $("status").textContent = text ?? (online ? "online" : "offline");
  $("status").className = online ? "" : "offline";
  $("toggle").textContent = online ? "Offline" : "Online";
  $("toggle").disabled = false;
}

$("toggle").addEventListener("click", () => (online ? disconnect() : connect()));

// Befunde: die volle Prüfung dauert bei 10.000 Elementen rund 1,5 s und läuft im Dokumentprozess; darum
// nur gebündelt nach Änderungen und nach dem Wiederverbinden, nie bei jeder Nachricht.
function scheduleFindings() {
  clearTimeout(findingsTimer);
  findingsTimer = setTimeout(loadFindings, 1500);
}

async function loadFindings() {
  if (!online) return;
  const res = await fetch(`/docs/${encodeURIComponent(docName)}/findings`);
  const all = await res.json();
  const mine = all.filter((f) => f.id === elementId);
  const list = $("findings");
  list.replaceChildren();
  if (mine.length === 0) {
    list.innerHTML = `<li class="muted">keine Konflikte an diesem Element (${all.length} im Dokument)</li>`;
    return;
  }
  for (const f of mine) {
    const li = document.createElement("li");
    li.className = "conflict";
    if (f.kind === "conflict") li.textContent = `Konflikt: ${f.name} = ${f.values.join(" oder ")}`;
    else if (f.kind === "edit_on_removed") li.textContent = `Änderungen an entferntem Element: ${JSON.stringify(f.edits)}`;
    else li.textContent = `${f.kind}: ${JSON.stringify(f)}`;
    list.append(li);
  }
}

connect();
