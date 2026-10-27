//! Auswahl nach Regel über Elemente des Graphen (ap-49, Frage 3). Kein Produktcode.
//!
//! Das Projekt kommt aus dem ap-01-Generator `synth::project(n)` und liegt als Automerge-Dokument im
//! `Store` des Datenmodell-Spikes – so, wie der Kern den Graphen hält. Die Regel ist selbst ein Element in
//! der Form aus ADR-028; ausgewertet wird sie in einem Durchlauf direkt auf dem Dokument (Kennzahl
//! `graph_auswahl_p95_ms`), zum Vergleich über die Store-Schnittstelle (Suche je Feld) und auf einer
//! Lesesicht (`Store::to_project`, deren Aufbau gesondert gemessen wird).
//!
//! Aufruf: `auswahl-graph [n]` – JSON auf stdout, Fortschritt auf stderr.

use std::process::ExitCode;
use std::time::Instant;

use automerge::{AutoCommit, ObjId, ReadDoc, ScalarValue, Value, ROOT};
use datenmodell::{synth, Error, Result, Store};
use serde_json::{json, Value as Json};

const WARMUP: usize = 5;
const RUNS: usize = 100;

/// Die Graph-Regel: alle Elemente vom Typ `wall` mit `length` ≥ 3000 und Material `e000005`.
/// Nur Daten – Typ, Parametervergleich und Eingangsverweis; keine IDs von Treffern, keine Positionen.
fn regel() -> Json {
    json!({
        "id": "g1-waende-lang",
        "type": "auswahl.regel",
        "inputs": {"material": "e000005.material"},
        "params": {
            "art": "element",
            "bereich": "projekt",
            "bedingungen": [
                {"typ": "wall"},
                {"wert": {"param": "length", "vergleich": ">=", "grenze": 3000}},
                {"eingang": {"name": "material", "gleich_eingang": "material"}}
            ]
        },
        "outputs": {"auswahl": "auswahl"},
        "content": [],
        "meta": {"name": "Lange Wände aus Material 5"}
    })
}

enum Bedingung {
    Typ(String),
    Wert {
        param: String,
        vergleich: String,
        grenze: f64,
    },
    Eingang {
        name: String,
        adresse: String,
    },
}

fn bedingungen(regel: &Json) -> Result<Vec<Bedingung>> {
    let liste = regel["params"]["bedingungen"]
        .as_array()
        .ok_or_else(|| Error::Model("Regel ohne bedingungen".into()))?;
    let mut out = Vec::new();
    for b in liste {
        if let Some(t) = b["typ"].as_str() {
            out.push(Bedingung::Typ(t.to_owned()));
        } else if b["wert"].is_object() {
            let w = &b["wert"];
            out.push(Bedingung::Wert {
                param: w["param"].as_str().unwrap_or_default().to_owned(),
                vergleich: w["vergleich"].as_str().unwrap_or("==").to_owned(),
                grenze: w["grenze"]
                    .as_f64()
                    .ok_or_else(|| Error::Model("grenze ist keine Zahl".into()))?,
            });
        } else if b["eingang"].is_object() {
            let e = &b["eingang"];
            let eigener = e["gleich_eingang"].as_str().unwrap_or_default();
            let adresse = regel["inputs"][eigener]
                .as_str()
                .ok_or_else(|| Error::Model(format!("Regel hat keinen Eingang {eigener}")))?;
            out.push(Bedingung::Eingang {
                name: e["name"].as_str().unwrap_or_default().to_owned(),
                adresse: adresse.to_owned(),
            });
        } else {
            return Err(Error::Model(format!("unbekannte Bedingung {b}")));
        }
    }
    Ok(out)
}

fn vergleiche(ist: f64, vergleich: &str, grenze: f64) -> bool {
    match vergleich {
        ">=" => ist >= grenze,
        "<=" => ist <= grenze,
        ">" => ist > grenze,
        "<" => ist < grenze,
        _ => ist == grenze,
    }
}

/// Auswertung direkt auf dem Automerge-Dokument. Ergebnis: Element-IDs (stabile Adressen), sortiert.
fn auswerten_store(store: &Store, b: &[Bedingung]) -> Result<Vec<String>> {
    let mut treffer = Vec::new();
    'element: for id in store.ids()? {
        for bed in b {
            let ok = match bed {
                Bedingung::Typ(t) => store.kind(&id)? == *t,
                Bedingung::Wert {
                    param,
                    vergleich,
                    grenze,
                } => store
                    .field(&id, "params", param)?
                    .and_then(|v| v.as_f64())
                    .is_some_and(|v| vergleiche(v, vergleich, *grenze)),
                Bedingung::Eingang { name, adresse } => store
                    .field(&id, "inputs", name)?
                    .is_some_and(|v| v.as_str() == Some(adresse.as_str())),
            };
            if !ok {
                continue 'element;
            }
        }
        treffer.push(id);
    }
    treffer.sort();
    Ok(treffer)
}

fn am(e: automerge::AutomergeError) -> Error {
    Error::Model(format!("Automerge: {e}"))
}

fn kind_obj(doc: &AutoCommit, obj: &ObjId, key: &str) -> Result<Option<ObjId>> {
    match doc.get(obj, key).map_err(am)? {
        Some((Value::Object(_), id)) => Ok(Some(id)),
        _ => Ok(None),
    }
}

fn skalar(doc: &AutoCommit, obj: &ObjId, key: &str) -> Result<Option<ScalarValue>> {
    match doc.get(obj, key).map_err(am)? {
        Some((Value::Scalar(s), _)) => Ok(Some(s.into_owned())),
        _ => Ok(None),
    }
}

fn als_zahl(s: &ScalarValue) -> Option<f64> {
    match s {
        ScalarValue::Int(i) => Some(*i as f64),
        ScalarValue::Uint(u) => Some(*u as f64),
        ScalarValue::F64(f) => Some(*f),
        _ => None,
    }
}

/// Auswertung in einem Durchlauf über die Element-Map des Automerge-Dokuments (ohne erneutes Suchen
/// jedes Elements je Bedingung). Gleiches Ergebnis wie `auswerten_store`.
fn auswerten_doc(store: &Store, b: &[Bedingung]) -> Result<Vec<String>> {
    let doc = store.doc();
    let elems = kind_obj(doc, &ROOT, "elements")?
        .ok_or_else(|| Error::Model("Dokument ohne elements".into()))?;
    let mut treffer = Vec::new();
    'element: for item in doc.map_range(&elems, ..) {
        let obj = item.id();
        for bed in b {
            let ok = match bed {
                Bedingung::Typ(t) => matches!(
                    skalar(doc, &obj, "type")?,
                    Some(ScalarValue::Str(s)) if s.as_str() == t
                ),
                Bedingung::Wert {
                    param,
                    vergleich,
                    grenze,
                } => {
                    let Some(params) = kind_obj(doc, &obj, "params")? else {
                        continue 'element;
                    };
                    skalar(doc, &params, param)?
                        .as_ref()
                        .and_then(als_zahl)
                        .is_some_and(|v| vergleiche(v, vergleich, *grenze))
                }
                Bedingung::Eingang { name, adresse } => {
                    let Some(inputs) = kind_obj(doc, &obj, "inputs")? else {
                        continue 'element;
                    };
                    matches!(
                        skalar(doc, &inputs, name)?,
                        Some(ScalarValue::Str(s)) if s.as_str() == adresse
                    )
                }
            };
            if !ok {
                continue 'element;
            }
        }
        treffer.push(item.key.to_string());
    }
    treffer.sort();
    Ok(treffer)
}

fn passt_json(e: &Json, b: &[Bedingung]) -> bool {
    b.iter().all(|bed| match bed {
        Bedingung::Typ(t) => e["type"].as_str() == Some(t.as_str()),
        Bedingung::Wert {
            param,
            vergleich,
            grenze,
        } => e["params"][param.as_str()]
            .as_f64()
            .is_some_and(|v| vergleiche(v, vergleich, *grenze)),
        Bedingung::Eingang { name, adresse } => {
            e["inputs"][name.as_str()].as_str() == Some(adresse.as_str())
        }
    })
}

fn walk(elements: &[Json], b: &[Bedingung], out: &mut Vec<String>) {
    for e in elements {
        if passt_json(e, b) {
            out.push(e["id"].as_str().unwrap_or_default().to_owned());
        }
        walk(e["content"].as_array().map_or(&[][..], |v| v), b, out);
    }
}

/// Auswertung auf dem materialisierten Projekt-JSON (Vergleichswert).
fn auswerten_json(project: &Json, b: &[Bedingung]) -> Vec<String> {
    let mut out = Vec::new();
    walk(
        project["elements"].as_array().map_or(&[][..], |v| v),
        b,
        &mut out,
    );
    out.sort();
    out
}

fn ms(start: Instant) -> f64 {
    start.elapsed().as_secs_f64() * 1000.0
}

fn quantile(mut v: Vec<f64>, q: f64) -> f64 {
    v.sort_by(f64::total_cmp);
    let idx = ((q * v.len() as f64).ceil() as usize).clamp(1, v.len().max(1)) - 1;
    v.get(idx).copied().unwrap_or(f64::NAN)
}

fn round(x: f64) -> f64 {
    (x * 1000.0).round() / 1000.0
}

fn messen<F: FnMut() -> Result<usize>>(mut f: F) -> Result<(f64, f64, usize)> {
    let mut n = 0;
    for _ in 0..WARMUP {
        n = f()?;
    }
    let mut zeiten = Vec::with_capacity(RUNS);
    for _ in 0..RUNS {
        let t = Instant::now();
        n = f()?;
        zeiten.push(ms(t));
    }
    Ok((quantile(zeiten.clone(), 0.95), quantile(zeiten, 0.5), n))
}

fn run(n: usize) -> Result<Json> {
    eprintln!("[graph] synth::project({n}) aufbauen");
    let project = synth::project(n);
    let store = Store::from_project_with_actor(&project, Some(b"ap49"))?;
    let regel = regel();
    let b = bedingungen(&regel)?;

    // Lesesicht: das Projekt, wie es aus dem Automerge-Dokument gelesen wird (nicht das Generator-JSON).
    eprintln!("[graph] Lesesicht aus dem Dokument (Store::to_project), 2 + 20 Läufe");
    let mut sicht_zeiten = Vec::new();
    let mut project = store.to_project()?;
    for k in 0..22 {
        let t = Instant::now();
        project = store.to_project()?;
        if k >= 2 {
            sicht_zeiten.push(ms(t));
        }
    }
    let d = auswerten_doc(&store, &b)?;
    let a = auswerten_store(&store, &b)?;
    let j = auswerten_json(&project, &b);
    if d != j || a != j {
        return Err(Error::Model(format!(
            "Varianten liefern verschiedene Treffer ({} / {} / {})",
            d.len(),
            a.len(),
            j.len()
        )));
    }

    // Kennzahl: direkt auf dem Dokument (keine zusätzliche Lesesicht nötig, Werte stabil).
    eprintln!(
        "[graph] Regel in einem Durchlauf über das Automerge-Dokument, {WARMUP} + {RUNS} Läufe"
    );
    let (p95, p50, treffer) = messen(|| Ok(auswerten_doc(&store, &b)?.len()))?;
    eprintln!("[graph] Regel auf der Lesesicht, {WARMUP} + {RUNS} Läufe");
    let (dp95, dp50, _) = messen(|| Ok(auswerten_json(&project, &b).len()))?;
    eprintln!(
        "[graph] Regel über die Store-Schnittstelle (Suche je Feld), {WARMUP} + {RUNS} Läufe"
    );
    let (sp95, sp50, _) = messen(|| Ok(auswerten_store(&store, &b)?.len()))?;

    Ok(json!({
        "elemente": store.len()?,
        "regel": regel,
        "treffer": treffer,
        "aufwaermen": WARMUP,
        "laeufe": RUNS,
        "graph_auswahl_p95_ms": round(p95),
        "graph_auswahl_p50_ms": round(p50),
        "graph_auswahl_lesesicht_p95_ms": round(dp95),
        "graph_auswahl_lesesicht_p50_ms": round(dp50),
        "graph_auswahl_store_api_p95_ms": round(sp95),
        "graph_auswahl_store_api_p50_ms": round(sp50),
        "lesesicht_aufbau_p95_ms": round(quantile(sicht_zeiten.clone(), 0.95)),
        "lesesicht_aufbau_p50_ms": round(quantile(sicht_zeiten, 0.5))
    }))
}

fn main() -> ExitCode {
    let n = std::env::args()
        .nth(1)
        .and_then(|s| s.parse().ok())
        .unwrap_or(10_000);
    match run(n) {
        Ok(out) => {
            println!("{out}");
            ExitCode::SUCCESS
        }
        Err(e) => {
            eprintln!("Fehler: {e}");
            ExitCode::FAILURE
        }
    }
}
