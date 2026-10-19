//! Messungen des Spikes (`bench --json`). Ausgabe im Format von `docs/spikes/datenmodell.json`.
//!
//! Zeiten sind Mediane mehrerer Läufe (bzw. p95 über viele Einzeloperationen), damit ein Nachmessen auf
//! demselben Rechner nahe am gemeldeten Wert liegt. Fortschritt geht auf stderr.

use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Instant;

use datenmodell::{components, conflicts, synth, Error, Op, Result, Store};
use serde_json::{json, Map, Value as Json};

const SEED: u64 = 42;

fn spike_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
}

fn repo_root() -> PathBuf {
    spike_dir().join("..").join("..")
}

fn progress(msg: &str) {
    eprintln!("[bench] {msg}");
}

fn ms(start: Instant) -> f64 {
    start.elapsed().as_secs_f64() * 1000.0
}

fn median(mut v: Vec<f64>) -> f64 {
    v.sort_by(f64::total_cmp);
    v.get(v.len() / 2).copied().unwrap_or(f64::NAN)
}

fn quantile(mut v: Vec<f64>, q: f64) -> f64 {
    v.sort_by(f64::total_cmp);
    let idx = ((q * v.len() as f64).ceil() as usize).clamp(1, v.len().max(1)) - 1;
    v.get(idx).copied().unwrap_or(f64::NAN)
}

fn round(x: f64, digits: i32) -> f64 {
    let f = 10f64.powi(digits);
    (x * f).round() / f
}

fn read_json(path: &Path) -> Result<Json> {
    let text = std::fs::read_to_string(path)
        .map_err(|e| Error::Json(format!("{}: {e}", path.display())))?;
    Ok(serde_json::from_str(&text)?)
}

/// Felder, die nicht bei allen Elementen vorkommen, plus typabhängige Konstrukte im Schema.
fn schema_special_cases() -> Result<usize> {
    fn walk(elements: &[Json], sets: &mut Vec<std::collections::BTreeSet<String>>) {
        for e in elements {
            if let Some(o) = e.as_object() {
                sets.push(o.keys().cloned().collect());
            }
            walk(e["content"].as_array().map_or(&[][..], |v| v), sets);
        }
    }
    fn conditionals(v: &Json) -> usize {
        const KEYS: [&str; 8] = [
            "if",
            "then",
            "else",
            "oneOf",
            "anyOf",
            "dependentSchemas",
            "dependentRequired",
            "discriminator",
        ];
        match v {
            Json::Object(m) => m
                .iter()
                .map(|(k, x)| usize::from(KEYS.contains(&k.as_str())) + conditionals(x))
                .sum(),
            Json::Array(l) => l.iter().map(conditionals).sum(),
            _ => 0,
        }
    }
    let root = repo_root();
    let mut sets = Vec::new();
    for name in ["raum.json", "baugruppe.json"] {
        let p = read_json(&root.join("format").join("examples").join(name))?;
        walk(p["elements"].as_array().map_or(&[][..], |v| v), &mut sets);
    }
    let union: std::collections::BTreeSet<String> = sets.iter().flatten().cloned().collect();
    let common = union
        .iter()
        .filter(|k| sets.iter().all(|s| s.contains(*k)))
        .count();
    let schema = read_json(
        &root
            .join("format")
            .join("schema")
            .join("element.schema.json"),
    )?;
    let typed = schema["$defs"]["element"]["properties"]["type"]
        .as_object()
        .map_or(0, |t| {
            usize::from(t.contains_key("enum")) + usize::from(t.contains_key("const"))
        });
    Ok(union.len() - common + conditionals(&schema) + typed)
}

fn build_store(n: usize) -> Result<Store> {
    Store::from_project_with_actor(&synth::project(n), Some(b"bench"))
}

fn time_load(bytes: &[u8], runs: usize) -> Result<f64> {
    let mut times = Vec::new();
    for _ in 0..runs {
        let t = Instant::now();
        let store = Store::load(bytes)?;
        let n = store.len()?;
        times.push(ms(t));
        if n == 0 {
            return Err(Error::Model("leeres Dokument geladen".into()));
        }
    }
    Ok(median(times))
}

fn run_tool(cmd: &str, args: &[&str], dir: &Path) -> Result<String> {
    let out = Command::new(cmd)
        .args(args)
        .current_dir(dir)
        .output()
        .map_err(|e| Error::Model(format!("{cmd} nicht startbar: {e}")))?;
    if !out.status.success() {
        return Err(Error::Model(format!(
            "{cmd} {args:?} fehlgeschlagen: {}",
            String::from_utf8_lossy(&out.stderr)
        )));
    }
    Ok(String::from_utf8_lossy(&out.stdout).into_owned())
}

fn last_json_line(out: &str) -> Result<Json> {
    let line = out
        .lines()
        .rev()
        .find(|l| l.trim_start().starts_with('{'))
        .ok_or_else(|| Error::Json(format!("keine JSON-Zeile in: {out}")))?;
    Ok(serde_json::from_str(line)?)
}

/// Baut NIF und WASM immer neu (inkrementell), damit nie eine veraltete Bindung gemessen wird.
fn ensure_bindings() -> Result<()> {
    progress("build.sh (NIF und WASM, inkrementell)");
    run_tool("bash", &["build.sh"], &spike_dir()).map(|_| ())
}

fn tool_version(cmd: &str, args: &[&str]) -> String {
    run_tool(cmd, args, &spike_dir())
        .ok()
        .and_then(|s| {
            s.lines()
                .rev()
                .find(|l| !l.trim().is_empty())
                .map(|l| l.trim().to_owned())
        })
        .unwrap_or_else(|| "unbekannt".into())
}

/// Alle Versionen eines Pakets in Cargo.lock (aufsteigend, wie Cargo sie sortiert).
fn lock_versions(name: &str) -> Vec<String> {
    let lock = std::fs::read_to_string(spike_dir().join("Cargo.lock")).unwrap_or_default();
    let needle = format!("name = \"{name}\"");
    let mut out = Vec::new();
    let mut lines = lock.lines();
    while let Some(l) = lines.next() {
        if l == needle {
            if let Some(v) = lines.next() {
                out.push(
                    v.trim_start_matches("version = ")
                        .trim_matches('"')
                        .to_owned(),
                );
            }
        }
    }
    out
}

/// Höchste Version eines Pakets (die vom Prototyp genutzte; ältere nur für examples/probe.rs).
fn lock_version(name: &str) -> String {
    lock_versions(name)
        .pop()
        .unwrap_or_else(|| "unbekannt".into())
}

fn cpu_model() -> String {
    std::fs::read_to_string("/proc/cpuinfo")
        .ok()
        .and_then(|s| {
            s.lines()
                .find(|l| l.starts_with("model name"))
                .and_then(|l| l.split(':').nth(1))
                .map(|m| m.trim().to_owned())
        })
        .unwrap_or_else(|| tool_version("sysctl", &["-n", "machdep.cpu.brand_string"]))
}

struct Metrics(Map<String, Json>);

impl Metrics {
    fn add(&mut self, key: &str, value: f64, unit: &str, threshold: f64, at_most: bool) {
        let pass = if at_most {
            value <= threshold
        } else {
            value >= threshold
        };
        let num = |x: f64| {
            if x.fract() == 0.0 && x.abs() < 1e15 {
                Json::from(x as i64)
            } else {
                Json::from(x)
            }
        };
        progress(&format!(
            "{key} = {value} {unit} (Schwelle {threshold}, {})",
            if pass { "ok" } else { "NICHT erfüllt" }
        ));
        self.0.insert(
            key.into(),
            json!({"value": num(value), "unit": unit, "threshold": num(threshold), "pass": pass}),
        );
    }
}

/// Führt alle Messungen aus und liefert das Ergebnis-JSON.
pub fn run() -> Result<Json> {
    let mut m = Metrics(Map::new());
    let mut details = Map::new();
    let spike = spike_dir();
    let raum_path = repo_root()
        .join("format")
        .join("examples")
        .join("raum.json");
    let raum = read_json(&raum_path)?;

    progress("Schema");
    m.add(
        "schema_special_cases",
        schema_special_cases()? as f64,
        "count",
        0.0,
        true,
    );

    progress("10.000 Elemente");
    let t = Instant::now();
    let mut store10k = build_store(10_000)?;
    details.insert("build_10k_ms".into(), json!(round(ms(t), 1)));
    let bytes10k = store10k.save();
    details.insert(
        "size_10k_mb".into(),
        json!(round(bytes10k.len() as f64 / 1e6, 3)),
    );
    m.add(
        "load_10k_ms",
        round(time_load(&bytes10k, 5)?, 3),
        "ms",
        200.0,
        true,
    );

    progress("Parameteränderungen bei 10.000 Elementen");
    let ops = synth::ops(10_000, 1_100, SEED);
    let mut times = Vec::new();
    for (k, op) in ops.iter().enumerate() {
        let t = Instant::now();
        store10k.apply(op)?;
        if k >= 100 {
            times.push(ms(t));
        }
    }
    details.insert(
        "op_median_ms".into(),
        json!(round(quantile(times.clone(), 0.5), 4)),
    );
    m.add(
        "op_p95_ms",
        round(quantile(times, 0.95), 4),
        "ms",
        5.0,
        true,
    );

    progress("Merge 2 × 500 Änderungen");
    let mut base = build_store(10_000)?;
    let mut merges = Vec::new();
    let mut detects = Vec::new();
    for run in 0..3u64 {
        let mut a = base.fork_with_actor(format!("zweig-a{run}").as_bytes());
        let mut b = base.fork_with_actor(format!("zweig-b{run}").as_bytes());
        a.apply_all(&synth::ops(10_000, 500, SEED + 10 * run + 1))?;
        b.apply_all(&synth::ops(10_000, 500, SEED + 10 * run + 2))?;
        let t = Instant::now();
        a.merge(&mut b)?;
        merges.push(ms(t));
        let t = Instant::now();
        let findings = conflicts::detect(&a)?;
        detects.push(ms(t));
        details.insert("merge_findings".into(), json!(findings.len()));
    }
    details.insert(
        "conflict_scan_10k_ms".into(),
        json!(round(median(detects), 3)),
    );
    m.add(
        "merge_2x500_ms",
        round(median(merges), 3),
        "ms",
        500.0,
        true,
    );

    progress("Konfliktfälle");
    let sim = conflicts::simulate(&raum, 100, SEED)?;
    details.insert("conflict_cases".into(), json!(sim.cases));
    m.add(
        "conflicts_detected_pct",
        round(sim.percent(), 2),
        "%",
        100.0,
        false,
    );

    progress("100.000 Elemente mit 10.000 Änderungen Historie");
    let t = Instant::now();
    let mut store100k = build_store(100_000)?;
    store100k.apply_all(&synth::ops(100_000, 10_000, SEED + 100))?;
    details.insert("build_100k_ms".into(), json!(round(ms(t), 1)));
    let t = Instant::now();
    let bytes100k = store100k.save();
    details.insert("save_100k_ms".into(), json!(round(ms(t), 1)));
    drop(store100k);
    m.add(
        "load_100k_ms",
        round(time_load(&bytes100k, 3)?, 3),
        "ms",
        2000.0,
        true,
    );
    m.add(
        "size_100k_mb",
        round(bytes100k.len() as f64 / 1e6, 3),
        "MB",
        50.0,
        true,
    );
    drop(bytes100k);

    progress("NIF und WASM");
    ensure_bindings()?;
    let nif = last_json_line(&run_tool(
        "mix",
        &["run", "--no-start", "bench.exs"],
        &spike.join("nif"),
    )?)?;
    let nif_p95 = nif["op_p95_ms"]
        .as_f64()
        .ok_or_else(|| Error::Json("NIF: op_p95_ms fehlt".into()))?;
    details.insert("nif_op_median_ms".into(), nif["op_median_ms"].clone());
    m.add("nif_op_p95_ms", round(nif_p95, 4), "ms", 1.0, true);
    let wasm = last_json_line(&run_tool("node", &["wasm/bench.mjs"], &spike)?)?;
    let wasm_p95 = wasm["op_p95_ms"]
        .as_f64()
        .ok_or_else(|| Error::Json("WASM: op_p95_ms fehlt".into()))?;
    details.insert("wasm_op_median_ms".into(), wasm["op_median_ms"].clone());
    m.add("wasm_op_p95_ms", round(wasm_p95, 4), "ms", 5.0, true);

    progress("Hash nativ / NIF / WASM");
    let ops: Vec<Json> = raum["elements"]
        .as_array()
        .map_or(&[][..], |v| v)
        .iter()
        .take(5)
        .enumerate()
        .map(
            |(i, e)| json!({"op": "set_param", "id": e["id"], "name": "pruefwert", "value": i * 7}),
        )
        .collect();
    let ops_text = Json::Array(ops).to_string();
    let ops_path =
        std::env::temp_dir().join(format!("datenmodell-bench-ops-{}.json", std::process::id()));
    std::fs::write(&ops_path, &ops_text).map_err(|e| Error::Model(e.to_string()))?;
    let mut native = Store::from_project(&raum)?;
    native.apply_all(&Op::parse_list(&ops_text)?)?;
    let native_hash = native.hash()?;
    let raum_arg = raum_path.to_string_lossy().into_owned();
    let ops_arg = ops_path.to_string_lossy().into_owned();
    let nif_hash = last_json_line(&run_tool(
        "mix",
        &["run", "--no-start", "hash.exs", &raum_arg, &ops_arg],
        &spike.join("nif"),
    )?)?;
    let wasm_hash = last_json_line(&run_tool(
        "node",
        &["wasm/hash.mjs", &raum_arg, &ops_arg],
        &spike,
    )?)?;
    let _ = std::fs::remove_file(&ops_path);
    let equal = nif_hash["hash"] == native_hash && wasm_hash["hash"] == native_hash;
    details.insert("hash".into(), json!(native_hash));
    m.add(
        "hash_equal_native_nif_wasm",
        f64::from(u8::from(equal)),
        "bool",
        1.0,
        false,
    );

    progress("Komponente mit 1.000 Instanzen");
    let mut lib =
        Store::from_project_with_actor(&components::library_project(1_000, SEED), Some(b"lib"))?;
    let mut times = Vec::new();
    for k in 0..7i64 {
        let variants = lib
            .field("komponente", "params", "variants")?
            .unwrap_or_default();
        let mut variants = variants.as_object().cloned().unwrap_or_default();
        if let Some(Json::Object(set)) = variants.get_mut("mittel") {
            set.insert("breite".into(), Json::from(1000 + k));
        }
        let t = Instant::now();
        lib.set_param("komponente", "variants", &Json::Object(variants))?;
        let instances = components::instances_of(&lib, "komponente")?;
        let resolved = components::resolve_all(&lib, "komponente", &instances)?;
        times.push(ms(t));
        if resolved.len() != 1_000 {
            return Err(Error::Model(format!(
                "{} statt 1000 Instanzen",
                resolved.len()
            )));
        }
    }
    m.add(
        "component_propagate_1000_ms",
        round(median(times), 3),
        "ms",
        50.0,
        true,
    );

    progress("Überschreibungen nach 100 Definitionsänderungen");
    let check = components::simulate_overrides(100, 100, SEED)?;
    details.insert("override_checks".into(), json!(check.total));
    let pct = if check.total == 0 {
        0.0
    } else {
        100.0 * check.kept as f64 / check.total as f64
    };
    m.add("overrides_kept_pct", round(pct, 2), "%", 100.0, false);

    let all_pass = m.0.values().all(|v| v["pass"] == Json::Bool(true));
    Ok(json!({
        "spike": "ap-01-spike-datenmodell",
        "recommendation": if all_pass { "Go" } else { "No-Go" },
        "metrics": Json::Object(m.0),
        "details": Json::Object(details),
        "machine": {
            "os": std::env::consts::OS,
            "arch": std::env::consts::ARCH,
            "cpu": cpu_model(),
            "threads": std::thread::available_parallelism().map(|n| n.get()).unwrap_or(0),
        },
        "versions": {
            "rustc": tool_version("rustc", &["--version"]),
            "automerge": lock_version("automerge"),
            "automerge_probe": lock_versions("automerge").join(", "),
            "rustler": lock_version("rustler"),
            "wasm-bindgen": lock_version("wasm-bindgen"),
            "elixir": tool_version("elixir", &["--version"]),
            "node": tool_version("node", &["--version"]),
        },
    }))
}
