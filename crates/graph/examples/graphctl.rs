//! Kommandozeile für Abnahmetests und Messung. Ausgabe: JSON auf stdout.
//!
//! `cargo run -q --release -p cee-graph --example graphctl -- <befehl>`; die Befehle stehen in design.md
//! des Changes ap-05a-schema-einheiten.

use std::process::ExitCode;

use cee_graph::units::{self, AXES};
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

fn run(args: &[String]) -> Result<Outcome> {
    let cmd = args.first().map(String::as_str).unwrap_or("");
    match cmd {
        "units" => Ok((units_json(), 0)),
        "parse" => {
            let text = args.get(1).ok_or_else(|| usage("parse <text>"))?;
            let q = units::parse_quantity(text, option(args, "--default"))?;
            Ok((json!({"value": q.value, "unit": q.unit}), 0))
        }
        "convert" => {
            let (v, from, to) = match (args.get(1), args.get(2), args.get(3)) {
                (Some(v), Some(f), Some(t)) => (v, f, t),
                _ => return Err(usage("convert <wert> <von> <nach>")),
            };
            let value: f64 = v
                .parse()
                .map_err(|_| Error::Parse(format!("`{v}` ist keine Zahl")))?;
            let out = units::convert(value, from, to)?;
            Ok((json!({"value": out, "unit": to}), 0))
        }
        other => Err(usage(&format!("unbekannter Befehl `{other}`"))),
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
