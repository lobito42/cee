// Gemeinsamer Teil der Prüfprogramme `bindctl` für Node und Browser (ap-40). Keine Datenmodell-Logik: jede
// Wirkung ist ein Aufruf in den Kern (WASM-Paket aus crates/graph-wasm); hier stehen nur Ablauf und Ausgabe.
// Befehle `run`, `load`, `merge`, `api`, `bench` wie crates/bind/examples/bindctl.rs (Rust-Sollwerte).
//
// `kern`: das WASM-Paket (`units`, `parse`, `convert`, `packages`, `call`, `debug_panic`, `Doc`, `States`).
// `io`: `readText(pfad)`, `readBytes(pfad)`, `writeBytes(pfad, bytes)`, `sha256(text)` (alle async),
// `now()` in ms und `wasmSizeKb()` (async, Größe von client/src/kern/pkg-web/*.wasm).

/** JSON lesen und Zahlen wörtlich behalten (5 bleibt 5, 5.0 bleibt 5.0, -0.0 bleibt -0.0). */
export function rawParse(text) {
  return JSON.parse(text, (_key, value, context) =>
    typeof value === 'number' ? JSON.rawJSON(context.source) : value,
  );
}

function num(value) {
  return value !== null && typeof value === 'object' && 'rawJSON' in value
    ? Number(value.rawJSON)
    : Number(value);
}

/** Fehler des Kerns `{code, message, element}`; alles andere (z. B. ein Panic in WASM) ist `internal`. */
function errorOf(e) {
  if (e !== null && typeof e === 'object' && typeof e.code === 'string') {
    return { code: e.code, message: String(e.message), element: e.element ?? null };
  }
  return { code: 'internal', message: `interner Fehler: ${String(e)}`, element: null };
}

function attempt(fn) {
  try {
    return { ok: true, value: fn() };
  } catch (e) {
    return { ok: false, error: errorOf(e) };
  }
}

function option(args, name) {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
}

function opEntry(doc, op) {
  const r = attempt(() => doc.apply_op(op));
  return r.ok
    ? rawParse(r.value)
    : { result: r.error.code, message: r.error.message, warnings: [] };
}

function errorCase(kern, doc, c) {
  if ('op_json' in c) return attempt(() => doc.apply_op(c.op_json));
  if ('op' in c) return attempt(() => doc.apply_op(JSON.stringify(c.op)));
  if ('load_bytes_b64' in c) {
    const bytes = Uint8Array.from(atob(c.load_bytes_b64), (ch) => ch.charCodeAt(0));
    return attempt(() => kern.Doc.load(bytes, undefined).free());
  }
  if ('element' in c) return attempt(() => doc.element(c.element));
  if ('parse' in c) return attempt(() => kern.parse(c.parse[0], c.parse[1] ?? undefined));
  if ('convert' in c) {
    return attempt(() => kern.convert(num(c.convert[0]), c.convert[1], c.convert[2]));
  }
  if ('debug_panic' in c) return attempt(() => kern.debug_panic());
  return { ok: false, error: { code: 'usage', message: 'unbekannter Fehlerfall', element: null } };
}

function query(kern, doc, q) {
  const at = q.indexOf(':');
  const name = at >= 0 ? q.slice(0, at) : q;
  const rest = at >= 0 ? q.slice(at + 1) : '';
  const bar = rest.indexOf('|');
  const head = bar >= 0 ? rest.slice(0, bar) : rest;
  const tail = bar >= 0 ? rest.slice(bar + 1) : '';
  switch (name) {
    case 'validate':
      return doc.validate();
    case 'order':
      return doc.order();
    case 'affected':
      return doc.affected(JSON.stringify([rest]));
    case 'subgraph':
      return doc.subgraph(rest);
    case 'migrate':
      return doc.migrate();
    case 'element':
      return doc.element(rest);
    case 'units':
      return kern.units();
    case 'packages':
      return kern.packages();
    case 'parse':
      return kern.parse(head, tail === '' ? undefined : tail);
    case 'convert': {
      const [v, from, to] = rest.split('|');
      return JSON.stringify({ value: kern.convert(Number(v), from, to), unit: to });
    }
    case 'call':
      return kern.call(head, doc, bar >= 0 ? tail : '{}');
    default:
      throw { code: 'usage', message: `unbekannte Abfrage ${name}`, element: null };
  }
}

async function run(kern, io, args) {
  const scen = rawParse(await io.readText(args[1]));
  const types = scen.types === undefined ? undefined : JSON.stringify(scen.types);
  const doc = kern.Doc.import(JSON.stringify(scen.project), types);
  const errors = (scen.errors ?? []).map((c) => {
    const r = errorCase(kern, doc, c);
    return r.ok ? null : r.error;
  });
  const results = (scen.ops ?? []).map((op) => opEntry(doc, JSON.stringify(op)));
  let states = null;
  if ((scen.states ?? []).length > 0) {
    const s = kern.States.new(doc);
    // Unsinnige Ereignisse werden übergangen wie bei `graphctl states`.
    for (const ev of scen.states) attempt(() => s.event(JSON.stringify(ev)));
    states = rawParse(s.get());
    s.free();
  }
  const queries = (scen.queries ?? []).map((q) => {
    const r = attempt(() => query(kern, doc, q));
    return r.ok ? { query: q, value: rawParse(r.value) } : { query: q, error: r.error };
  });
  const exported = doc.export();
  const save = option(args, '--save');
  if (save) await io.writeBytes(save, doc.save());
  const out = {
    results,
    hash: doc.hash(),
    export_sha256: await io.sha256(exported),
    queries,
    errors,
    states,
  };
  doc.free();
  return out;
}

async function load(kern, io, args) {
  const doc = kern.Doc.load(await io.readBytes(args[1]), undefined);
  const opsPath = option(args, '--ops');
  const ops = opsPath ? rawParse(await io.readText(opsPath)) : [];
  const results = ops.map((op) => opEntry(doc, JSON.stringify(op)));
  const save = option(args, '--save');
  if (save) await io.writeBytes(save, doc.save());
  const out = { hash: doc.hash(), results };
  doc.free();
  return out;
}

async function merge(kern, io, args) {
  const a = kern.Doc.load(await io.readBytes(args[1]), undefined);
  const b = kern.Doc.load(await io.readBytes(args[2]), undefined);
  a.merge(b);
  const save = option(args, '--save');
  if (save) await io.writeBytes(save, a.save());
  const out = { hash: a.hash() };
  a.free();
  b.free();
  return out;
}

function api(kern) {
  const fn = (f) => typeof f === 'function';
  const doc = kern.Doc?.prototype ?? {};
  const states = kern.States?.prototype ?? {};
  const table = [
    ['units', kern.units],
    ['parse', kern.parse],
    ['convert', kern.convert],
    ['Doc.new', kern.Doc?.new],
    ['Doc.import', kern.Doc?.import],
    ['Doc.load', kern.Doc?.load],
    ['doc.save', doc.save],
    ['doc.apply_op', doc.apply_op],
    ['doc.apply', doc.apply],
    ['doc.export', doc.export],
    ['doc.hash', doc.hash],
    ['doc.merge', doc.merge],
    ['doc.validate', doc.validate],
    ['doc.order', doc.order],
    ['doc.affected', doc.affected],
    ['doc.subgraph', doc.subgraph],
    ['doc.migrate', doc.migrate],
    ['doc.element', doc.element],
    ['doc.materialized_count', doc.materialized_count],
    ['States.new', kern.States?.new],
    ['states.event', states.event],
    ['states.ready', states.ready],
    ['states.get', states.get],
    ['packages', kern.packages],
    ['call', kern.call],
  ];
  return { functions: table.filter(([, f]) => fn(f)).map(([name]) => name) };
}

function ids(list, out) {
  for (const e of list) {
    if (typeof e?.id === 'string') out.push(e.id);
    if (Array.isArray(e?.content)) ids(e.content, out);
  }
  return out;
}

function p95(samples) {
  const sorted = [...samples].sort((x, y) => x - y);
  return sorted[Math.max(Math.ceil(sorted.length * 0.95) - 1, 0)];
}

async function bench(kern, io, args, prefix) {
  const text = await io.readText(option(args, '--project'));
  const all = ids(JSON.parse(text).elements ?? [], []);
  const imported = kern.Doc.import(text, undefined);
  const bytes = imported.save();
  imported.free();
  let t = io.now();
  const doc = kern.Doc.load(bytes, undefined);
  const loadMs = io.now() - t;
  t = io.now();
  doc.hash();
  const hashMs = io.now() - t;
  const samples = [];
  for (let i = 0; i < 1100; i++) {
    const id = all[Math.floor(Math.random() * all.length)];
    t = io.now();
    const op = {
      op: 'set_param',
      id,
      param: 'p0',
      value: { value: (i % 1000) * 0.001 + 0.5, unit: 'm' },
    };
    doc.apply_op(JSON.stringify(op));
    if (i >= 100) samples.push(io.now() - t);
  }
  doc.free();
  return {
    [`${prefix}_op_p95_ms`]: p95(samples),
    load_10k_ms: loadMs,
    hash_10k_ms: hashMs,
    wasm_size_kb: await io.wasmSizeKb(),
  };
}

/** Führt einen `bindctl`-Befehl aus und liefert die Ausgabe als JSON-Text. */
export async function main(kern, io, args, prefix) {
  let out;
  switch (args[0]) {
    case 'run':
      out = await run(kern, io, args);
      break;
    case 'load':
      out = await load(kern, io, args);
      break;
    case 'merge':
      out = await merge(kern, io, args);
      break;
    case 'api':
      out = api(kern);
      break;
    case 'bench':
      out = await bench(kern, io, args, prefix);
      break;
    default:
      out = { error: { code: 'usage', message: `Aufruf: ${args.join(' ')}`, element: null } };
  }
  return JSON.stringify(out);
}
