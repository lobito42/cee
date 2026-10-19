//! Kommandozeile des Datenmodell-Prototyps.
//!
//! - `to-text <json-datei>` – Textprojektion auf stdout
//! - `from-text <text-datei>` – kanonisches JSON auf stdout
//! - `hash <projekt.json> <ops.json>` – Inhalts-Hash nach den Operationen
//! - `bench --json` – alle Messungen, Ausgabe wie `docs/spikes/datenmodell.json`

use std::process::ExitCode;

use datenmodell::{canonical_pretty, text, Error, Op, Result, Store};
use serde_json::Value as Json;

fn read(path: &str) -> Result<String> {
    std::fs::read_to_string(path).map_err(|e| Error::Json(format!("{path}: {e}")))
}

fn read_json(path: &str) -> Result<Json> {
    serde_json::from_str(&read(path)?).map_err(|e| Error::Json(format!("{path}: {e}")))
}

fn run(args: &[String]) -> Result<String> {
    let arg = |i: usize| {
        args.get(i)
            .map(String::as_str)
            .ok_or_else(|| Error::Json(format!("Argument {i} fehlt")))
    };
    match args.first().map(String::as_str) {
        Some("to-text") => {
            // Über das Automerge-Dokument, damit die Projektion den gespeicherten Stand zeigt.
            let store = Store::from_project(&read_json(arg(1)?)?)?;
            text::to_text(&store.to_project()?)
        }
        Some("from-text") => {
            let project = text::from_text(&read(arg(1)?)?)?;
            Ok(canonical_pretty(&project)? + "\n")
        }
        Some("hash") => {
            let mut store = Store::from_project(&read_json(arg(1)?)?)?;
            store.apply_all(&Op::parse_list(&read(arg(2)?)?)?)?;
            Ok(format!("{{\"hash\": \"{}\"}}\n", store.hash()?))
        }
        _ => Err(Error::Json(format!(
            "Aufruf: datenmodell to-text|from-text|hash|bench …; erhalten: {args:?}"
        ))),
    }
}

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    match run(&args) {
        Ok(out) => {
            print!("{out}");
            ExitCode::SUCCESS
        }
        Err(e) => {
            eprintln!("Fehler: {e}");
            ExitCode::FAILURE
        }
    }
}
