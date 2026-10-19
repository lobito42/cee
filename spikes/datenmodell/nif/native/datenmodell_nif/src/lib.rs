//! Rustler-NIF für den Datenmodell-Prototyp.
//!
//! Ein Dokument ist eine Ressource (`ResourceArc`), die der Elixir-Prozess des Dokuments hält
//! (ein Prozess je Dokument, ADR-030). Fehler kommen als `{:error, grund}` zurück, nie als Panic.
//! Alles, was länger als etwa 1 ms dauern kann (Laden, Hash, Erzeugen, Operationslisten), läuft auf
//! einem Dirty-CPU-Scheduler; eine einzelne Parameteränderung bleibt auf dem normalen Scheduler.

use std::sync::Mutex;

use datenmodell::{synth, Op, Store};
use rustler::{Atom, Resource, ResourceArc};
use serde_json::Value as Json;

mod atoms {
    rustler::atoms! { ok }
}

/// Dokument-Ressource. Der Mutex schützt vor gleichzeitigem Zugriff aus mehreren Prozessen.
pub struct Doc {
    store: Mutex<Store>,
}

#[rustler::resource_impl]
impl Resource for Doc {}

fn wrap(store: Store) -> ResourceArc<Doc> {
    ResourceArc::new(Doc {
        store: Mutex::new(store),
    })
}

fn with_store<T>(
    doc: &ResourceArc<Doc>,
    f: impl FnOnce(&mut Store) -> datenmodell::Result<T>,
) -> Result<T, String> {
    let mut guard = doc
        .store
        .lock()
        .map_err(|_| "Dokument nach einem früheren Fehler gesperrt".to_owned())?;
    f(&mut guard).map_err(|e| e.to_string())
}

/// Projekt aus JSON laden.
#[rustler::nif(schedule = "DirtyCpu")]
fn load_json(json: String) -> Result<ResourceArc<Doc>, String> {
    let project: Json = serde_json::from_str(&json).map_err(|e| e.to_string())?;
    Store::from_project(&project)
        .map(wrap)
        .map_err(|e| e.to_string())
}

/// Synthetisches Projekt mit `n` Elementen (für Messungen).
#[rustler::nif(schedule = "DirtyCpu")]
fn synth(n: usize) -> Result<ResourceArc<Doc>, String> {
    Store::from_project(&synth::project(n))
        .map(wrap)
        .map_err(|e| e.to_string())
}

/// IDs der änderbaren Elemente eines synthetischen Projekts mit `n` Elementen.
#[rustler::nif]
fn synth_editable_ids(n: usize) -> Vec<String> {
    synth::editable_ids(n)
}

/// Einen Parameter setzen; `value_json` ist der Wert als JSON-Text.
#[rustler::nif]
fn set_param(
    doc: ResourceArc<Doc>,
    id: String,
    name: String,
    value_json: String,
) -> Result<Atom, String> {
    let value: Json = serde_json::from_str(&value_json).map_err(|e| e.to_string())?;
    with_store(&doc, |s| s.set_param(&id, &name, &value)).map(|()| atoms::ok())
}

/// Eine Operationsliste (Format von `ops.json`) anwenden.
#[rustler::nif(schedule = "DirtyCpu")]
fn apply_ops(doc: ResourceArc<Doc>, ops_json: String) -> Result<usize, String> {
    let ops = Op::parse_list(&ops_json).map_err(|e| e.to_string())?;
    with_store(&doc, |s| s.apply_all(&ops)).map(|()| ops.len())
}

/// Inhalts-Hash über die kanonische Form.
#[rustler::nif(schedule = "DirtyCpu")]
fn hash(doc: ResourceArc<Doc>) -> Result<String, String> {
    with_store(&doc, |s| s.hash())
}

rustler::init!("Elixir.Datenmodell.Native");
