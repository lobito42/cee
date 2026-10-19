//! Kommandozeile des Datenmodell-Prototyps.

use std::process::ExitCode;

use datenmodell::{Error, Result};

fn read(path: &str) -> Result<String> {
    std::fs::read_to_string(path).map_err(|e| Error::Json(format!("{path}: {e}")))
}

fn run(args: &[String]) -> Result<String> {
    match args.first().map(String::as_str) {
        _ => Err(Error::Json(format!(
            "Aufruf: datenmodell <befehl> …; unbekannt: {args:?}"
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
