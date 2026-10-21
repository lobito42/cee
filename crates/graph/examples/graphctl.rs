//! Kommandozeile für Abnahmetests und Messung. Ausgabe: JSON auf stdout.
//!
//! `cargo run -q --release -p cee-graph --example graphctl -- <befehl>`; die Befehle stehen in design.md
//! des Changes ap-05a-schema-einheiten.

use std::path::Path;
use std::process::ExitCode;
use std::time::Instant;

use cee_graph::doc::{self, Doc, Op};
use cee_graph::state::States;
use cee_graph::synth::{self, CorpusKind, Rng};
use cee_graph::types::TypeRegistry;
use cee_graph::units::{self, AXES};
use cee_graph::validate::{self, Finding};
use cee_graph::{Error, Result};
use serde_json::{json, Value as Json};

/// Ergebnis eines Befehls: Ausgabe und Rückgabecode.
type Outcome = (Json, u8);

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let (out, code) = match run(&args) {
        Ok(v) => v,
        Err(e) => (error_json(&e), 1),
    };
    println!("{out}");
    ExitCode::from(code)
}

fn error_json(e: &Error) -> Json {
    json!({"error": e.code(), "message": e.to_string()})
}

fn usage(msg: &str) -> Error {
    Error::InvalidOperation(format!("Aufruf: {msg}"))
}

/// Wert einer Option `--name <wert>`.
fn option<'a>(args: &'a [String], name: &str) -> Option<&'a str> {
    let pos = args.iter().position(|a| a == name)?;
    args.get(pos + 1).map(String::as_str)
}

fn required<'a>(args: &'a [String], index: usize, what: &str) -> Result<&'a str> {
    args.get(index)
        .map(String::as_str)
        .ok_or_else(|| usage(what))
}

fn read_bytes(path: &str) -> Result<Vec<u8>> {
    std::fs::read(Path::new(path)).map_err(|e| Error::Model(format!("{path}: {e}")))
}

fn read_json(path: &str) -> Result<Json> {
    Ok(serde_json::from_slice(&read_bytes(path)?)?)
}

fn write_bytes(path: &str, bytes: &[u8]) -> Result<()> {
    std::fs::write(Path::new(path), bytes).map_err(|e| Error::Model(format!("{path}: {e}")))
}

fn load_doc(path: &str) -> Result<Doc> {
    Doc::load(&read_bytes(path)?)
}

/// Typdefinitionen aus `--types <datei>`; Fehler werden gesammelt, gültige Definitionen gelten trotzdem.
fn load_types(args: &[String]) -> Result<(TypeRegistry, Vec<Error>)> {
    let mut reg = TypeRegistry::new();
    let errors = match option(args, "--types") {
        Some(path) => reg.register_all(&read_json(path)?),
        None => Vec::new(),
    };
    Ok((reg, errors))
}

fn findings_json(findings: &[Finding]) -> Json {
    Json::Array(findings.iter().map(Finding::to_json).collect())
}

/// Hängt Typfehler an die Ausgabe an; mit Fehlern ist der Rückgabecode 1.
fn with_type_errors(mut out: Json, errors: &[Error]) -> Outcome {
    if errors.is_empty() {
        return (out, 0);
    }
    out["error"] = json!("invalid_type_definition");
    out["type_errors"] = Json::Array(errors.iter().map(error_json).collect());
    (out, 1)
}

fn run(args: &[String]) -> Result<Outcome> {
    let cmd = args.first().map(String::as_str).unwrap_or("");
    match cmd {
        "units" => Ok((units_json(), 0)),
        "parse" => {
            let text = required(args, 1, "parse <text>")?;
            let q = units::parse_quantity(text, option(args, "--default"))?;
            Ok((json!({"value": q.value, "unit": q.unit}), 0))
        }
        "convert" => {
            let v = required(args, 1, "convert <wert> <von> <nach>")?;
            let from = required(args, 2, "convert <wert> <von> <nach>")?;
            let to = required(args, 3, "convert <wert> <von> <nach>")?;
            let value: f64 = v
                .parse()
                .map_err(|_| Error::Parse(format!("`{v}` ist keine Zahl")))?;
            let out = units::convert(value, from, to)?;
            Ok((json!({"value": out, "unit": to}), 0))
        }
        "import" => cmd_import(args),
        "validate" => cmd_validate(args),
        "apply" => cmd_apply(args),
        "export" => {
            let doc = load_doc(required(args, 1, "export <doc>")?)?;
            Ok((doc.export()?, 0))
        }
        "hash" => {
            let doc = load_doc(required(args, 1, "hash <doc>")?)?;
            Ok((json!({"hash": doc.hash()?}), 0))
        }
        "merge" => {
            let mut a = load_doc(required(args, 1, "merge <doc> <doc> --out <doc>")?)?;
            let mut b = load_doc(required(args, 2, "merge <doc> <doc> --out <doc>")?)?;
            a.merge(&mut b)?;
            let out = option(args, "--out").ok_or_else(|| usage("--out <doc>"))?;
            write_bytes(out, &a.save())?;
            Ok((json!({"hash": a.hash()?}), 0))
        }
        "order" => cmd_order(args),
        "affected" => cmd_affected(args),
        "states" => cmd_states(args),
        "migrate" => cmd_migrate(args),
        "subgraph" => cmd_subgraph(args),
        "synth" => cmd_synth(args),
        "bench" => Ok((bench()?, 0)),
        other => Err(usage(&format!("unbekannter Befehl `{other}`"))),
    }
}

fn cmd_import(args: &[String]) -> Result<Outcome> {
    let project = read_json(required(args, 1, "import <projekt.json> --out <doc>")?)?;
    let out = option(args, "--out").ok_or_else(|| usage("--out <doc>"))?;
    let (types, type_errors) = load_types(args)?;
    let (mut doc, mut findings) = Doc::import(&project, &types, None)?;
    findings.extend(doc.validate(&types)?);
    write_bytes(out, &doc.save())?;
    Ok(with_type_errors(
        json!({"findings": findings_json(&findings)}),
        &type_errors,
    ))
}

fn cmd_validate(args: &[String]) -> Result<Outcome> {
    let path = required(args, 1, "validate <doc|projekt.json>")?;
    let (types, type_errors) = load_types(args)?;
    let bytes = read_bytes(path)?;
    let findings = if doc::looks_like_doc(&bytes) {
        Doc::load(&bytes)?.validate(&types)?
    } else {
        validate::validate_project(&serde_json::from_slice(&bytes)?, &types)
    };
    Ok(with_type_errors(
        json!({"findings": findings_json(&findings)}),
        &type_errors,
    ))
}

fn cmd_apply(args: &[String]) -> Result<Outcome> {
    let mut doc = load_doc(required(args, 1, "apply <doc> <ops.json> --out <doc>")?)?;
    let ops = read_json(required(args, 2, "apply <doc> <ops.json> --out <doc>")?)?;
    let out = option(args, "--out").ok_or_else(|| usage("--out <doc>"))?;
    let (types, type_errors) = load_types(args)?;
    let list = ops
        .as_array()
        .ok_or_else(|| Error::InvalidOperation("Operationen müssen eine Liste sein".into()))?;
    let mut rejected = false;
    let mut results = Vec::with_capacity(list.len());
    for raw in list {
        let outcome = Op::parse(raw).and_then(|op| doc.apply(&op, &types));
        results.push(match outcome {
            Ok(o) => json!({"result": "ok", "warnings": o.warnings}),
            Err(e) => {
                rejected = true;
                json!({"result": e.code(), "message": e.to_string(), "warnings": []})
            }
        });
    }
    write_bytes(out, &doc.save())?;
    let (out_json, code) = with_type_errors(json!({"results": results}), &type_errors);
    Ok((out_json, if rejected { 1 } else { code }))
}

fn cmd_order(args: &[String]) -> Result<Outcome> {
    let doc = load_doc(required(args, 1, "order <doc>")?)?;
    let o = doc.order()?;
    let skipped: Vec<Json> = o
        .skipped
        .iter()
        .map(|s| json!({"element": s.element, "reason": s.reason}))
        .collect();
    Ok((json!({"order": o.order, "skipped": skipped}), 0))
}

fn cmd_affected(args: &[String]) -> Result<Outcome> {
    let doc = load_doc(required(args, 1, "affected <doc> <id>...")?)?;
    let ids: Vec<&str> = args.iter().skip(2).map(String::as_str).collect();
    Ok((json!({"affected": doc.affected(&ids)?}), 0))
}

/// Spielt Zustandsereignisse ab; unsinnige Ereignisse (unbekannte ID oder Art) werden ignoriert.
fn cmd_states(args: &[String]) -> Result<Outcome> {
    let mut doc = load_doc(required(args, 1, "states <doc> <script.json>")?)?;
    let script = read_json(required(args, 2, "states <doc> <script.json>")?)?;
    let index = doc.index()?.clone();
    let mut states = States::new(&index);
    for step in script.as_array().map_or(&[][..], Vec::as_slice) {
        let id = step.get("id").and_then(Json::as_str).unwrap_or("");
        let _ = match step.get("event").and_then(Json::as_str).unwrap_or("") {
            "change" => states.change(&index, id),
            "start" => states.start(id),
            "ok" => states.finish_ok(id),
            "err" => states.finish_err(
                id,
                Finding::error(id, "", id, "failed", "Berechnung fehlgeschlagen".into()),
            ),
            _ => Ok(()),
        };
    }
    let mut map = serde_json::Map::new();
    for node in index.nodes() {
        if let Some(s) = states.get(&node.id) {
            map.insert(node.id.clone(), json!(s.as_str()));
        }
    }
    let mut findings = serde_json::Map::new();
    for (id, f) in states.failed() {
        findings.insert(id.to_owned(), json!([f.to_json()]));
    }
    Ok((
        json!({"states": map, "ready": states.ready(&index), "findings": findings}),
        0,
    ))
}

fn cmd_migrate(args: &[String]) -> Result<Outcome> {
    let mut doc = load_doc(required(args, 1, "migrate <doc> --out <doc>")?)?;
    let out = option(args, "--out").ok_or_else(|| usage("--out <doc>"))?;
    let (before, after) = (doc.loaded_version(), doc.schema_version()?);
    write_bytes(out, &doc.save())?;
    Ok((json!({"before": before, "after": after}), 0))
}

fn cmd_subgraph(args: &[String]) -> Result<Outcome> {
    let mut doc = Doc::open(&read_bytes(required(args, 1, "subgraph <doc> <id>")?)?)?;
    let id = required(args, 2, "subgraph <doc> <id>")?;
    let t = Instant::now();
    let sub = doc.subgraph(id)?;
    let duration_ms = ms(t);
    let external: Vec<Json> = sub
        .external_inputs
        .iter()
        .map(|x| json!({"element": x.element, "input": x.input, "target": x.target}))
        .collect();
    Ok((
        json!({"elements": sub.elements, "external_inputs": external,
               "materialized_count": doc.materialized_count(), "duration_ms": duration_ms}),
        0,
    ))
}

fn cmd_synth(args: &[String]) -> Result<Outcome> {
    let n: usize = option(args, "--n")
        .ok_or_else(|| usage("synth --n <zahl> --seed <zahl>"))?
        .parse()
        .map_err(|_| Error::Parse("--n ist keine Zahl".into()))?;
    let seed: u64 = option(args, "--seed")
        .unwrap_or("1")
        .parse()
        .map_err(|_| Error::Parse("--seed ist keine Zahl".into()))?;
    match option(args, "--corpus") {
        None => Ok((synth::project(n, seed), 0)),
        Some("units") => Ok((synth::corpus(n, seed, CorpusKind::Units).to_json(), 0)),
        Some("validate") => Ok((synth::corpus(n, seed, CorpusKind::Validate).to_json(), 0)),
        Some(other) => Err(usage(&format!("unbekannter Korpus `{other}`"))),
    }
}

fn units_json() -> Json {
    let list: Vec<Json> = units::UNITS
        .iter()
        .map(|u| {
            let dimension: serde_json::Map<String, Json> = AXES
                .iter()
                .zip(u.dim.0.iter())
                .map(|(axis, e)| ((*axis).to_owned(), json!(e)))
                .collect();
            json!({"code": u.code, "dimension": dimension, "factor": u.factor})
        })
        .collect();
    Json::Array(list)
}

fn ms(start: Instant) -> f64 {
    start.elapsed().as_secs_f64() * 1000.0
}

/// 95. Perzentil (Nearest-Rank) einer Messreihe.
fn p95(samples: &mut [f64]) -> f64 {
    samples.sort_by(|a, b| a.total_cmp(b));
    let rank = (samples.len() as f64 * 0.95).ceil() as usize;
    samples
        .get(rank.saturating_sub(1))
        .copied()
        .unwrap_or(f64::NAN)
}

fn count_elements(list: &[Json]) -> usize {
    list.iter()
        .filter_map(Json::as_object)
        .map(|e| {
            1 + e
                .get("content")
                .and_then(Json::as_array)
                .map_or(0, |c| count_elements(c))
        })
        .sum()
}

/// Hängt die ersten Elemente der obersten Ebene (mit Untergraph) unter eine neue Gruppe, bis sie etwa
/// `size` Elemente enthält; die Gruppe steht danach an der Spitze. Gibt ihre ID zurück.
fn nest_group(project: &mut Json, size: usize) -> String {
    let id = "bench_group".to_owned();
    let Some(list) = project.get_mut("elements").and_then(Json::as_array_mut) else {
        return id;
    };
    let mut take = 0;
    let mut total = 0;
    for e in list.iter() {
        if total >= size {
            break;
        }
        total += count_elements(std::slice::from_ref(e));
        take += 1;
    }
    let kids: Vec<Json> = list.drain(..take).collect();
    list.insert(
        0,
        json!({"id": id, "type": "thing", "inputs": {}, "params": {}, "outputs": {"out": "thing"},
               "content": kids, "meta": {"name": "Gruppe"}}),
    );
    id
}

/// Alle Kennzahlen aus design.md (Performance-Budgets).
fn bench() -> Result<Json> {
    let types = TypeRegistry::new();

    // Eingaben lesen und umrechnen.
    let inputs = [
        "1,2 m",
        "1.2m",
        "1200",
        "90°",
        "3,5 [in_i]",
        "-0,5 mm",
        "1e3 mm",
        "7,85 g/cm3",
        "101325 Pa",
        "2 t{CO2e}",
    ];
    let mut samples = Vec::with_capacity(20_000);
    for i in 0..20_000 {
        let text = inputs[i % inputs.len()];
        let t = Instant::now();
        let _ = units::parse_quantity(text, Some("mm"));
        samples.push(t.elapsed().as_secs_f64() * 1e6);
    }
    let parse_p95_us = p95(&mut samples);

    // Import 10.000.
    let small = synth::project(10_000, 1);
    let t = Instant::now();
    let _ = Doc::import(&small, &types, Some(b"bench"))?;
    let import_10k_ms = ms(t);
    drop(small);

    // 100.000: Import, 10.000 Änderungen, Speichern, Laden, Prüfen.
    let (mut big, ids) = synth::project_with_ids(100_000, 2);
    let group_id = nest_group(&mut big, 1_000);
    let t = Instant::now();
    let (mut doc, _) = Doc::import(&big, &types, Some(b"bench"))?;
    let import_100k_ms = ms(t);
    drop(big);

    let mut rng = Rng::new(9);
    let mut op_samples = Vec::with_capacity(10_000);
    for _ in 0..10_000 {
        let id = ids[rng.below(ids.len() as u64) as usize].clone();
        let op = Op::SetParam {
            id,
            param: format!("p{}", rng.below(3)),
            value: json!({"value": 1 + rng.below(10_000), "unit": "mm"}),
        };
        let t = Instant::now();
        doc.apply(&op, &types)?;
        op_samples.push(ms(t));
    }
    let param_op_p95_ms = p95(&mut op_samples);

    // Änderung inkl. Zyklustest: Eingänge setzen (abgelehnte Zyklen zählen mit).
    doc.index()?;
    let mut input_samples = Vec::with_capacity(2_000);
    for _ in 0..2_000 {
        let id = ids[rng.below(ids.len() as u64) as usize].clone();
        let target = &ids[rng.below(ids.len() as u64) as usize];
        let op = Op::SetInput {
            id,
            name: "extra".into(),
            target: format!("{target}.out"),
        };
        let t = Instant::now();
        let _ = doc.apply(&op, &types);
        input_samples.push(ms(t));
    }
    let op_p95_ms = p95(&mut input_samples);

    let bytes = doc.save();
    let size_100k_mb = doc.save_plain().len() as f64 / (1024.0 * 1024.0);
    let size_with_index_100k_mb = bytes.len() as f64 / (1024.0 * 1024.0);
    drop(doc);

    let t = Instant::now();
    let mut loaded = Doc::load(&bytes)?;
    let load_100k_ms = ms(t);

    // Laden samt Index, danach Index allein (aus dem mitgespeicherten Abbild), Reihenfolge, betroffene Elemente.
    let t = Instant::now();
    let mut opened = Doc::open(&bytes)?;
    let load_index_100k_ms = ms(t);
    let t = Instant::now();
    let index = loaded.index()?.clone();
    let index_100k_ms = ms(t);
    let t = Instant::now();
    let rebuilt = loaded.build_index()?;
    let index_rebuild_100k_ms = ms(t);
    if rebuilt != index {
        return Err(Error::Model(
            "Index aus Abbild und aus Dokument weichen ab".into(),
        ));
    }
    drop(rebuilt);
    let t = Instant::now();
    let order = cee_graph::deps::order(&index);
    let order_100k_ms = ms(t);
    if !order.skipped.is_empty() || order.order.len() != index.len() {
        return Err(Error::Model("Reihenfolge unvollständig".into()));
    }
    let mut affected_samples = Vec::with_capacity(1_000);
    for _ in 0..1_000 {
        let id = ids[rng.below(ids.len() as u64) as usize].as_str();
        let t = Instant::now();
        let _ = cee_graph::deps::affected(&index, &[id])?;
        affected_samples.push(ms(t));
    }
    let affected_p95_ms = p95(&mut affected_samples);

    // Untergraph mit etwa 1.000 Elementen aufbereiten.
    let t = Instant::now();
    let sub = opened.subgraph(&group_id)?;
    let subgraph_1000_ms = ms(t);
    let subgraph_size = sub.elements.len();

    let t = Instant::now();
    let exported = loaded.export()?;
    let export_100k_ms = ms(t);
    let t = Instant::now();
    let findings = validate::validate_project(&exported, &types);
    let validate_only_ms = ms(t);
    // Die Prüfung läuft auf dem gelesenen Modell; das Lesen des ganzen Dokuments steht getrennt als
    // `export_100k_ms` (siehe crates/graph/README.md, Abschnitt Messwerte).
    let validate_100k_ms = validate_only_ms;
    if !findings.is_empty() {
        return Err(Error::Model(format!(
            "gültiges Projekt liefert {} Befunde",
            findings.len()
        )));
    }

    Ok(json!({
        "load_100k_ms": load_100k_ms,
        "validate_100k_ms": validate_100k_ms,
        "export_100k_ms": export_100k_ms,
        "op_p95_ms": op_p95_ms,
        "param_op_p95_ms": param_op_p95_ms,
        "load_index_100k_ms": load_index_100k_ms,
        "index_100k_ms": index_100k_ms,
        "index_rebuild_100k_ms": index_rebuild_100k_ms,
        "order_100k_ms": order_100k_ms,
        "affected_p95_ms": affected_p95_ms,
        "subgraph_1000_ms": subgraph_1000_ms,
        "subgraph_size": subgraph_size,
        "parse_p95_us": parse_p95_us,
        "import_10k_ms": import_10k_ms,
        "import_100k_ms": import_100k_ms,
        "size_100k_mb": size_100k_mb,
        "size_with_index_100k_mb": size_with_index_100k_mb,
    }))
}
