//! Rustler-NIF für den Server (`CeeServer.Graph`, ADR-029, ADR-030).
//!
//! Jede Funktion ruft genau eine Funktion der Fassade `cee-bind`; hier steht keine Datenmodell-Logik.
//! Dokument und Zustände sind Ressourcen, die der aufrufende Elixir-Prozess hält; sie liegen hinter einem
//! Mutex. Fehler kommen als `{:error, %{code, message, element}}` zurück; Panics fängt die Fassade ab, sie
//! erreichen die BEAM nie. Kurze Aufrufe (< 1 ms erwartet) laufen auf dem normalen Scheduler, alles, was
//! länger dauern kann, als Dirty-CPU-NIF (Liste in design.md von ap-40).

use std::sync::{Mutex, MutexGuard};

use cee_bind::{BindError, BindResult, Document, StatesHandle};
use rustler::{Binary, Env, NifMap, OwnedBinary, Resource, ResourceArc};

/// Dokument-Ressource.
pub struct DocRes(Mutex<Document>);

#[rustler::resource_impl]
impl Resource for DocRes {}

/// Zustände-Ressource.
pub struct StatesRes(Mutex<StatesHandle>);

#[rustler::resource_impl]
impl Resource for StatesRes {}

/// Fehler an der Grenze: `%{code: String.t(), message: String.t(), element: String.t() | nil}`.
#[derive(NifMap)]
pub struct ErrMap {
    code: String,
    message: String,
    element: Option<String>,
}

impl From<BindError> for ErrMap {
    fn from(e: BindError) -> Self {
        ErrMap {
            code: e.code,
            message: e.message,
            element: e.element,
        }
    }
}

type NifResult<T> = Result<T, ErrMap>;

fn out<T>(r: BindResult<T>) -> NifResult<T> {
    r.map_err(ErrMap::from)
}

/// Sperre übernehmen, auch wenn ein früherer Aufruf sie vergiftet hätte: Die Fassade fängt Panics ab, und
/// abgelehnte Operationen lassen das Dokument unverändert.
fn lock<T>(m: &Mutex<T>) -> MutexGuard<'_, T> {
    m.lock().unwrap_or_else(|p| p.into_inner())
}

fn doc_res(doc: Document) -> ResourceArc<DocRes> {
    ResourceArc::new(DocRes(Mutex::new(doc)))
}

fn binary<'a>(env: Env<'a>, bytes: &[u8]) -> Binary<'a> {
    let mut owned = OwnedBinary::new(bytes.len());
    owned.as_mut_slice().copy_from_slice(bytes);
    owned.release(env)
}

// --- normale Scheduler ---------------------------------------------------------------------------------

#[rustler::nif]
fn nif_units() -> NifResult<String> {
    out(cee_bind::units())
}

#[rustler::nif]
fn nif_parse(text: String, default: Option<String>) -> NifResult<String> {
    out(cee_bind::parse(&text, default.as_deref()))
}

#[rustler::nif]
fn nif_convert(value: f64, from: String, to: String) -> NifResult<f64> {
    out(cee_bind::convert(value, &from, &to))
}

#[rustler::nif]
fn nif_doc_apply_op(doc: ResourceArc<DocRes>, op: String) -> NifResult<String> {
    out(lock(&doc.0).apply_op(&op))
}

#[rustler::nif]
fn nif_doc_element(doc: ResourceArc<DocRes>, id: String) -> NifResult<String> {
    out(lock(&doc.0).element(&id))
}

#[rustler::nif]
fn nif_doc_materialized_count(doc: ResourceArc<DocRes>) -> NifResult<usize> {
    out(lock(&doc.0).materialized_count())
}

#[rustler::nif]
fn nif_states_event(states: ResourceArc<StatesRes>, event: String) -> NifResult<bool> {
    out(lock(&states.0).event(&event).map(|()| true))
}

#[rustler::nif]
fn nif_states_ready(states: ResourceArc<StatesRes>) -> NifResult<String> {
    out(lock(&states.0).ready())
}

#[rustler::nif]
fn nif_states_get(states: ResourceArc<StatesRes>) -> NifResult<String> {
    out(lock(&states.0).get())
}

#[rustler::nif]
fn nif_packages() -> NifResult<String> {
    out(cee_bind::packages())
}

/// Absichtlicher Panic in der Fassade (nur mit Feature `test-hooks`, sonst Fehler `internal` ohne Panic).
#[rustler::nif]
fn nif_debug_panic() -> NifResult<bool> {
    #[cfg(feature = "test-hooks")]
    let r = cee_bind::debug_panic();
    #[cfg(not(feature = "test-hooks"))]
    let r = Err(BindError::new(
        cee_bind::INTERNAL,
        "debug_panic braucht das Feature test-hooks",
        None,
    ));
    out(r.map(|()| true))
}

// --- Dirty-CPU -------------------------------------------------------------------------------------------

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_new() -> NifResult<ResourceArc<DocRes>> {
    out(Document::new()).map(doc_res)
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_import_project(
    project: String,
    types: Option<String>,
) -> NifResult<(ResourceArc<DocRes>, String)> {
    let (doc, info) = out(Document::import(&project, types.as_deref()))?;
    Ok((doc_res(doc), info))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_load(bytes: Binary, types: Option<String>) -> NifResult<ResourceArc<DocRes>> {
    out(Document::load(bytes.as_slice(), types.as_deref())).map(doc_res)
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_save<'a>(env: Env<'a>, doc: ResourceArc<DocRes>) -> NifResult<Binary<'a>> {
    let bytes = out(lock(&doc.0).save())?;
    Ok(binary(env, &bytes))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_apply(doc: ResourceArc<DocRes>, ops: String) -> NifResult<String> {
    out(lock(&doc.0).apply(&ops))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_export(doc: ResourceArc<DocRes>) -> NifResult<String> {
    out(lock(&doc.0).export())
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_hash(doc: ResourceArc<DocRes>) -> NifResult<String> {
    out(lock(&doc.0).hash())
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_merge(doc: ResourceArc<DocRes>, other: ResourceArc<DocRes>) -> NifResult<bool> {
    if std::ptr::eq(&doc.0, &other.0) {
        // Ein Dokument mit sich selbst zusammenzuführen ändert nichts (und würde sonst die Sperre doppelt
        // nehmen).
        return Ok(true);
    }
    let mut a = lock(&doc.0);
    let mut b = lock(&other.0);
    out(a.merge(&mut b).map(|()| true))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_validate(doc: ResourceArc<DocRes>) -> NifResult<String> {
    out(lock(&doc.0).validate())
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_order(doc: ResourceArc<DocRes>) -> NifResult<String> {
    out(lock(&doc.0).order())
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_affected(doc: ResourceArc<DocRes>, ids: String) -> NifResult<String> {
    out(lock(&doc.0).affected(&ids))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_subgraph(doc: ResourceArc<DocRes>, id: String) -> NifResult<String> {
    out(lock(&doc.0).subgraph(&id))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_doc_migrate(doc: ResourceArc<DocRes>) -> NifResult<String> {
    out(lock(&doc.0).migrate())
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_states_new(doc: ResourceArc<DocRes>) -> NifResult<ResourceArc<StatesRes>> {
    let states = out(StatesHandle::new(&mut lock(&doc.0)))?;
    Ok(ResourceArc::new(StatesRes(Mutex::new(states))))
}

#[rustler::nif(schedule = "DirtyCpu")]
fn nif_call(name: String, doc: ResourceArc<DocRes>, args: String) -> NifResult<String> {
    out(cee_bind::call(&name, &lock(&doc.0), &args))
}

rustler::init!("Elixir.CeeServer.Graph");
