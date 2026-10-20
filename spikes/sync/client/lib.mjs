// Headless Sync-Client für den Sync-Spike (ap-03). Kein Produktcode.
//
// Jeder Client hat eine eigene Socket-Verbindung (Phoenix-JS-Client) und eine eigene Dokumentkopie im
// Rust-Kern als WASM. Abgleich über das Automerge-Sync-Protokoll; Sync-Nachrichten gehen als Base64 in
// JSON über den Channel `doc:<name>`. Die künstliche Netzverzögerung (`delayMs`) wirkt beim Senden und
// beim Empfangen jeder Nachricht, also 2 × delayMs Umlaufzeit je Strecke Client–Server.

import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";
import { Socket } from "phoenix";

const require = createRequire(import.meta.url);
const wasm = require("../wasm/pkg-node/sync_wasm.js");

export const { Doc, SyncConn } = wasm;
export const now = () => performance.now();
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Kleiner deterministischer Zufallsgenerator (xorshift32) für die Auswahl in den Szenarien. */
export class Rng {
  constructor(seed) {
    this.x = (seed * 2654435761) >>> 0 || 1;
  }
  next() {
    let x = this.x;
    x ^= x << 13;
    x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5;
    this.x = x >>> 0;
    return this.x;
  }
  below(n) {
    return this.next() % n;
  }
}

/** p-Quantil (0..1) einer Liste von Zahlen; 0 bei leerer Liste. */
export function quantile(values, p) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(p * sorted.length) - 1));
  return sorted[index];
}

export const round = (v, digits = 1) => Math.round(v * 10 ** digits) / 10 ** digits;

/** Gemeinsame Ereignisschleife: Bedingungen werden nach jedem Empfang neu geprüft. */
export class Waiter {
  constructor() {
    this.waiting = [];
  }
  /** Löst auf mit dem Zeitpunkt (performance.now), zu dem `pred` erstmals wahr ist. */
  until(pred, timeoutMs, what) {
    if (pred()) return Promise.resolve(now());
    return new Promise((resolve, reject) => {
      const entry = { pred, resolve };
      entry.timer = setTimeout(() => {
        this.waiting = this.waiting.filter((w) => w !== entry);
        reject(new Error(`Zeitlimit: ${what}`));
      }, timeoutMs);
      this.waiting.push(entry);
    });
  }
  check() {
    const t = now();
    for (const w of [...this.waiting]) {
      if (w.pred()) {
        clearTimeout(w.timer);
        this.waiting = this.waiting.filter((x) => x !== w);
        w.resolve(t);
      }
    }
  }
}

export class Client {
  constructor(label, { url, doc, delayMs, waiter }) {
    this.label = label;
    this.url = url;
    this.docName = doc;
    this.delayMs = delayMs;
    this.waiter = waiter;
    this.doc = Doc.empty();
    this.online = false;
    this.serverHeads = null;
    this.bytesIn = 0;
    this.bytesOut = 0;
    this.ops = [];
    this.onReceive = null;
    this.generation = 0;
  }

  /** Verzögert `fn` um die künstliche Netzzeit einer Richtung. */
  later(fn) {
    if (this.delayMs > 0) setTimeout(fn, this.delayMs);
    else fn();
  }

  /** Verbinden und dem Dokument beitreten; mit neuem Sync-Zustand (wie nach einem Neustart der Verbindung). */
  async connect() {
    const generation = ++this.generation;
    this.conn = new SyncConn();
    this.serverHeads = null;
    this.socket = new Socket(this.url, {
      transport: WebSocket,
      timeout: 120_000,
      heartbeatIntervalMs: 30_000,
      reconnectAfterMs: () => 1_000,
      rejoinAfterMs: () => 1_000,
    });
    this.socket.connect();
    this.channel = this.socket.channel(`doc:${this.docName}`, {});
    this.channel.on("sync", (payload) => {
      this.later(() => this.onSync(payload, generation));
    });
    await new Promise((resolve, reject) => {
      this.channel
        .join(120_000)
        .receive("ok", resolve)
        .receive("error", (e) => reject(new Error(`Beitritt abgelehnt: ${JSON.stringify(e)}`)))
        .receive("timeout", () => reject(new Error("Beitritt: Zeitlimit")));
    });
    this.online = true;
    this.flush();
  }

  /** Verbindung schließen; der Client arbeitet lokal weiter. */
  disconnect() {
    this.online = false;
    this.generation++;
    this.socket.disconnect();
  }

  onSync(payload, generation) {
    if (!this.online || generation !== this.generation) return;
    const bytes = Buffer.from(payload.m, "base64");
    this.bytesIn += bytes.length;
    this.doc.receive(this.conn, bytes);
    if (payload.h) this.serverHeads = payload.h.join(",");
    if (this.onReceive) this.onReceive(payload);
    this.flush();
    this.waiter.check();
  }

  /** Nächste Sync-Nachricht erzeugen und (verzögert) senden. */
  flush() {
    if (!this.online) return;
    const msg = this.doc.generate(this.conn);
    if (!msg) return;
    this.bytesOut += msg.length;
    const generation = this.generation;
    const payload = { m: Buffer.from(msg).toString("base64"), t: Date.now() };
    this.later(() => {
      if (generation !== this.generation) return;
      this.channel
        .push("sync", payload, 120_000)
        .receive("ok", (reply) =>
          this.later(() => {
            if (generation !== this.generation) return;
            this.serverHeads = reply.heads.join(",");
            this.waiter.check();
          }),
        )
        .receive("error", (e) => {
          console.error(`${this.label}: Server lehnt Sync-Nachricht ab: ${e.code}`);
        });
    });
  }

  /** Operation lokal anwenden und (wenn online) abgleichen. */
  apply(op) {
    this.doc.apply(JSON.stringify(op));
    this.ops.push(op);
    this.flush();
  }

  heads() {
    return this.doc.heads().join(",");
  }

  /** Eigener Stand und der zuletzt gemeldete Stand des Servers sind gleich. */
  inSyncWithServer() {
    return this.doc.ready() && this.serverHeads !== null && this.heads() === this.serverHeads;
  }

  /** Anfrage an den Server über den Channel (mit Verzögerung in beide Richtungen). */
  request(event, payload = {}) {
    return new Promise((resolve, reject) => {
      this.later(() => {
        this.channel
          .push(event, payload, 120_000)
          .receive("ok", (r) => this.later(() => resolve(r)))
          .receive("error", (e) => this.later(() => reject(new Error(`${event}: ${JSON.stringify(e)}`))))
          .receive("timeout", () => reject(new Error(`${event}: Zeitlimit`)));
      });
    });
  }

  /** Rohe Nachricht senden; Antwort des Servers als {status, response}. */
  rawPush(event, payload) {
    return new Promise((resolve) => {
      this.later(() => {
        this.channel
          .push(event, payload, 120_000)
          .receive("ok", (r) => this.later(() => resolve({ status: "ok", response: r })))
          .receive("error", (r) => this.later(() => resolve({ status: "error", error: r })))
          .receive("timeout", () => resolve({ status: "timeout" }));
      });
    });
  }

  close() {
    this.online = false;
    this.generation++;
    if (this.socket) this.socket.disconnect();
  }
}

/** HTTP-Basis des Servers aus der WebSocket-Adresse (ws://host:port/socket → http://host:port). */
export function httpBase(url) {
  const u = new URL(url);
  u.protocol = u.protocol === "wss:" ? "https:" : "http:";
  u.pathname = "";
  return u.toString().replace(/\/$/, "");
}
