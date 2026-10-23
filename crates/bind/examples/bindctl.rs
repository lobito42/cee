//! Prüfprogramm `bindctl` (Rust, Sollwerte für die übrigen Laufzeiten). Ausgabe: ein JSON-Dokument je
//! Aufruf auf stdout.
//!
//! `cargo run -q --release -p cee-bind --features pkg-beispiel,test-hooks --example bindctl -- <befehl>`;
//! Befehle `run`, `load`, `merge`, `api`, `bench` wie in design.md von ap-40. Dieselbe Schnittstelle haben
//! `server/priv/bindctl.exs`, `client/tools/bindctl-node.mjs`, `client/tools/bindctl-browser.mjs` und
//! `sdk/python/tools/bindctl.py`.

use std::path::Path;
use std::process::ExitCode;
use std::time::Instant;

use base64::Engine;
use cee_bind::{BindError, BindResult, Document, StatesHandle};
use serde_json::{json, Value as Json};
use sha2::{Digest, Sha256};

/// Namen der Fassadentabelle aus design.md, die dieses Programm erreicht.
const API: &[&str] = &[
    "units",
    "parse",
    "convert",
    "Doc.new",
    "Doc.import",
    "Doc.load",
    "doc.save",
    "doc.apply_op",
    "doc.apply",
    "doc.export",
    "doc.hash",
    "doc.merge",
    "doc.validate",
    "doc.order",
    "doc.affected",
    "doc.subgraph",
    "doc.migrate",
    "doc.element",
    "doc.materialized_count",
    "States.new",
    "states.event",
    "states.ready",
    "states.get",
    "packages",
    "call",
];

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    match run(&args) {
        Ok(out) => {
            println!("{out}");
            ExitCode::SUCCESS
        }
        Err(e) => {
            println!("{}", json!({"error": e.to_json()}));
            ExitCode::FAILURE
        }
    }
}

fn usage(msg: &str) -> BindError {
    BindError::new("usage", format!("Aufruf: {msg}"), None)
}

fn option<'a>(args: &'a [String], name: &str) -> Option<&'a str> {
    let pos = args.iter().position(|a| a == name)?;
    args.get(pos + 1).map(String::as_str)
}

fn arg<'a>(args: &'a [String], i: usize, what: &str) -> BindResult<&'a str> {
    args.get(i).map(String::as_str).ok_or_else(|| usage(what))
}

fn io(path: &str, e: std::io::Error) -> BindError {
    BindError::new("io", format!("{path}: {e}"), None)
}

fn read(path: &str) -> BindResult<Vec<u8>> {
    std::fs::read(Path::new(path)).map_err(|e| io(path, e))
}

fn read_json(path: &str) -> BindResult<Json> {
    serde_json::from_slice(&read(path)?)
        .map_err(|e| BindError::new("invalid_json", format!("{path}: {e}"), None))
}

fn write(path: &str, bytes: &[u8]) -> BindResult<()> {
    std::fs::write(Path::new(path), bytes).map_err(|e| io(path, e))
}

fn parsed(text: &str) -> Json {
    serde_json::from_str(text).unwrap_or(Json::Null)
}

fn sha256(text: &str) -> String {
    Sha256::digest(text.as_bytes())
        .iter()
        .map(|b| format!("{b:02x}"))
        .collect()
}

fn run(args: &[String]) -> BindResult<Json> {
    match args.first().map(String::as_str).unwrap_or("") {
        "run" => cmd_run(args),
        "load" => cmd_load(args),
        "merge" => cmd_merge(args),
        "api" => Ok(json!({"functions": API})),
        "bench" => cmd_bench(args),
        other => Err(usage(&format!("unbekannter Befehl `{other}`"))),
    }
}

/// Ergebnis einer Operation wie `graphctl apply`.
fn op_entry(doc: &mut Document, op: &str) -> Json {
    match doc.apply_op(op) {
        Ok(text) => parsed(&text),
        Err(e) => json!({"result": e.code, "message": e.message, "warnings": []}),
    }
}

fn error_entry(doc: &mut Document, case: &Json) -> Option<BindError> {
    let outcome: BindResult<()> = if let Some(text) = case.get("op_json").and_then(Json::as_str) {
        doc.apply_op(text).map(drop)
    } else if let Some(op) = case.get("op") {
        doc.apply_op(&op.to_string()).map(drop)
    } else if let Some(b64) = case.get("load_bytes_b64").and_then(Json::as_str) {
        match base64::engine::general_purpose::STANDARD.decode(b64) {
            Ok(bytes) => Document::load(&bytes, None).map(drop),
            Err(e) => Err(BindError::new("invalid_document", e.to_string(), None)),
        }
    } else if let Some(id) = case.get("element").and_then(Json::as_str) {
        doc.element(id).map(drop)
    } else if let Some(p) = case.get("parse") {
        let text = p.get(0).and_then(Json::as_str).unwrap_or("");
        cee_bind::parse(text, p.get(1).and_then(Json::as_str)).map(drop)
    } else if let Some(c) = case.get("convert") {
        let value = c.get(0).and_then(Json::as_f64).unwrap_or(f64::NAN);
        let from = c.get(1).and_then(Json::as_str).unwrap_or("");
        let to = c.get(2).and_then(Json::as_str).unwrap_or("");
        cee_bind::convert(value, from, to).map(drop)
    } else if case.get("debug_panic").is_some() {
        debug_panic()
    } else {
        Err(BindError::new(
            "usage",
            format!("unbekannter Fehlerfall {case}"),
            None,
        ))
    };
    outcome.err()
}

#[cfg(feature = "test-hooks")]
fn debug_panic() -> BindResult<()> {
    cee_bind::debug_panic()
}

#[cfg(not(feature = "test-hooks"))]
fn debug_panic() -> BindResult<()> {
    Err(BindError::new(
        "usage",
        "debug_panic braucht das Feature test-hooks",
        None,
    ))
}

fn query(doc: &mut Document, q: &str) -> BindResult<Json> {
    let (name, rest) = q.split_once(':').unwrap_or((q, ""));
    let text = match name {
        "validate" => doc.validate()?,
        "order" => doc.order()?,
        "affected" => doc.affected(&json!([rest]).to_string())?,
        "subgraph" => doc.subgraph(rest)?,
        "migrate" => doc.migrate()?,
        "element" => doc.element(rest)?,
        "units" => cee_bind::units()?,
        "packages" => cee_bind::packages()?,
        "parse" => {
            let (text, default) = rest.split_once('|').unwrap_or((rest, ""));
            let default = (!default.is_empty()).then_some(default);
            cee_bind::parse(text, default)?
        }
        "convert" => {
            let parts: Vec<&str> = rest.split('|').collect();
            let [v, from, to] = parts[..] else {
                return Err(usage("convert:<wert>|<von>|<nach>"));
            };
            let value: f64 = v.parse().map_err(|_| {
                BindError::new("parse_error", format!("`{v}` ist keine Zahl"), None)
            })?;
            let out = cee_bind::convert(value, from, to)?;
            return Ok(json!({"value": out, "unit": to}));
        }
        "call" => {
            let (fname, fargs) = rest.split_once('|').unwrap_or((rest, "{}"));
            cee_bind::call(fname, doc, fargs)?
        }
        other => return Err(usage(&format!("unbekannte Abfrage `{other}`"))),
    };
    Ok(parsed(&text))
}

fn list<'a>(scen: &'a Json, key: &str) -> &'a [Json] {
    scen.get(key)
        .and_then(Json::as_array)
        .map_or(&[][..], Vec::as_slice)
}

fn cmd_run(args: &[String]) -> BindResult<Json> {
    let scen = read_json(arg(args, 1, "run <szenario.json> [--save <datei>]")?)?;
    let types = scen.get("types").map(Json::to_string);
    let project = scen.get("project").cloned().unwrap_or(Json::Null);
    let (mut doc, _) = Document::import(&project.to_string(), types.as_deref())?;
    let errors: Vec<Json> = list(&scen, "errors")
        .iter()
        .map(|c| error_entry(&mut doc, c).map_or(Json::Null, |e| e.to_json()))
        .collect();
    let results: Vec<Json> = list(&scen, "ops")
        .iter()
        .map(|op| op_entry(&mut doc, &op.to_string()))
        .collect();
    let events = list(&scen, "states");
    let states = if events.is_empty() {
        Json::Null
    } else {
        let mut s = StatesHandle::new(&mut doc)?;
        for ev in events {
            // Unsinnige Ereignisse (unbekannte ID oder Art) werden übergangen wie bei `graphctl states`.
            let _ = s.event(&ev.to_string());
        }
        parsed(&s.get()?)
    };
    let queries: Vec<Json> = list(&scen, "queries")
        .iter()
        .filter_map(Json::as_str)
        .map(|q| match query(&mut doc, q) {
            Ok(value) => json!({"query": q, "value": value}),
            Err(e) => json!({"query": q, "error": e.to_json()}),
        })
        .collect();
    let export = doc.export()?;
    if let Some(path) = option(args, "--save") {
        write(path, &doc.save()?)?;
    }
    Ok(json!({
        "results": results,
        "hash": doc.hash()?,
        "export_sha256": sha256(&export),
        "queries": queries,
        "errors": errors,
        "states": states,
    }))
}

fn cmd_load(args: &[String]) -> BindResult<Json> {
    let mut doc = Document::load(
        &read(arg(args, 1, "load <datei> [--ops <ops.json>]")?)?,
        None,
    )?;
    let results: Vec<Json> = match option(args, "--ops") {
        Some(path) => read_json(path)?
            .as_array()
            .map_or(&[][..], Vec::as_slice)
            .iter()
            .map(|op| op_entry(&mut doc, &op.to_string()))
            .collect(),
        None => Vec::new(),
    };
    if let Some(path) = option(args, "--save") {
        write(path, &doc.save()?)?;
    }
    Ok(json!({"hash": doc.hash()?, "results": results}))
}

fn cmd_merge(args: &[String]) -> BindResult<Json> {
    let what = "merge <datei> <datei> [--save <datei>]";
    let mut a = Document::load(&read(arg(args, 1, what)?)?, None)?;
    let mut b = Document::load(&read(arg(args, 2, what)?)?, None)?;
    a.merge(&mut b)?;
    if let Some(path) = option(args, "--save") {
        write(path, &a.save()?)?;
    }
    Ok(json!({"hash": a.hash()?}))
}

fn ms(t: Instant) -> f64 {
    t.elapsed().as_secs_f64() * 1000.0
}

/// 95. Perzentil (Nearest-Rank).
fn p95(samples: &mut [f64]) -> f64 {
    samples.sort_by(f64::total_cmp);
    let rank = (samples.len() as f64 * 0.95).ceil() as usize;
    samples
        .get(rank.saturating_sub(1))
        .copied()
        .unwrap_or(f64::NAN)
}

fn ids(list: &[Json], out: &mut Vec<String>) {
    for e in list {
        if let Some(id) = e.get("id").and_then(Json::as_str) {
            out.push(id.to_owned());
        }
        if let Some(kids) = e.get("content").and_then(Json::as_array) {
            ids(kids, out);
        }
    }
}

fn cmd_bench(args: &[String]) -> BindResult<Json> {
    let path = option(args, "--project").ok_or_else(|| usage("bench --project <projekt.json>"))?;
    let text = String::from_utf8_lossy(&read(path)?).into_owned();
    let project: Json = parsed(&text);
    let mut all = Vec::new();
    ids(list(&project, "elements"), &mut all);
    if all.is_empty() {
        return Err(usage("Projekt ohne Elemente"));
    }
    let (mut doc, _) = Document::import(&text, None)?;
    let bytes = doc.save()?;
    drop(doc);
    let t = Instant::now();
    let mut doc = Document::load(&bytes, None)?;
    let load_10k_ms = ms(t);
    let t = Instant::now();
    doc.hash()?;
    let hash_10k_ms = ms(t);
    let mut seed: u64 = 0x9E37_79B9_7F4A_7C15;
    let mut samples = Vec::with_capacity(1000);
    for i in 0..1100 {
        seed = seed
            .wrapping_mul(6_364_136_223_846_793_005)
            .wrapping_add(1_442_695_040_888_963_407);
        let id = &all[(seed >> 33) as usize % all.len()];
        let t = Instant::now();
        let op = json!({"op": "set_param", "id": id, "param": "p0",
                        "value": {"value": (i % 1000) as f64 * 0.001 + 0.5, "unit": "m"}});
        doc.apply_op(&op.to_string())?;
        if i >= 100 {
            samples.push(ms(t));
        }
    }
    Ok(json!({
        "rust_op_p95_ms": p95(&mut samples),
        "load_10k_ms": load_10k_ms,
        "hash_10k_ms": hash_10k_ms,
    }))
}
