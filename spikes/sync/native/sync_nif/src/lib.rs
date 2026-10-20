//! Rustler-NIF für den Sync-Spike (ap-03).
//!
//! Ein Dokument ist eine Ressource, die genau ein Elixir-Prozess hält (ein Prozess je Dokument, ADR-030);
//! je Verbindung gibt es eine eigene Sync-Zustands-Ressource. Fehler kommen als `{:error, grund}` zurück.
//! Panics im Kern werden hier abgefangen und ebenfalls als `{:error, grund}` gemeldet, damit sie die BEAM
//! nie erreichen (ADR-029). Alles, was bei großen Nachrichten länger als etwa 1 ms dauern kann, läuft auf
//! einem Dirty-CPU-Scheduler.
//!
//! Fehlermeldungen enthalten nie Modellinhalte (ADR-056): der Server schreibt sie ins Protokoll.

use std::panic::{catch_unwind, AssertUnwindSafe};
use std::sync::Mutex;

use rustler::{Binary, Env, OwnedBinary, Resource, ResourceArc};
use sync_core::{Peer, SyncState};

/// Dokument-Ressource.
pub struct Doc {
    peer: Mutex<Peer>,
}

#[rustler::resource_impl]
impl Resource for Doc {}

/// Sync-Zustand einer Verbindung.
pub struct Conn {
    state: Mutex<SyncState>,
}

#[rustler::resource_impl]
impl Resource for Conn {}

/// Führt `f` aus; Panics werden zu Fehlern. Ein vergifteter Mutex wird übernommen: Der Kern lässt das
/// Dokument bei einem Fehler unverändert, und Automerge-Transaktionen sind abgeschlossen.
fn guarded<T>(f: impl FnOnce() -> Result<T, String>) -> Result<T, String> {
    catch_unwind(AssertUnwindSafe(f)).unwrap_or_else(|_| Err("interner Fehler im Kern".to_owned()))
}

fn with_peer<T>(
    doc: &ResourceArc<Doc>,
    f: impl FnOnce(&mut Peer) -> Result<T, String>,
) -> Result<T, String> {
    guarded(|| {
        let mut guard = doc.peer.lock().unwrap_or_else(|p| p.into_inner());
        f(&mut guard)
    })
}

fn to_binary<'a>(env: Env<'a>, bytes: &[u8]) -> Result<Binary<'a>, String> {
    guarded(|| {
        let mut owned = OwnedBinary::new(bytes.len());
        owned.as_mut_slice().copy_from_slice(bytes);
        Ok(owned)
    })
    .map(|owned| owned.release(env))
}

/// Synthetisches Projekt mit `n` Elementen (ap-01) als neues Dokument.
#[rustler::nif(schedule = "DirtyCpu")]
fn new_doc(n: usize) -> Result<ResourceArc<Doc>, String> {
    guarded(|| {
        let peer = Peer::synth(n).map_err(|e| e.to_string())?;
        Ok(ResourceArc::new(Doc {
            peer: Mutex::new(peer),
        }))
    })
}

/// Neuer Sync-Zustand für eine Verbindung.
#[rustler::nif]
fn new_conn() -> ResourceArc<Conn> {
    ResourceArc::new(Conn {
        state: Mutex::new(SyncState::new()),
    })
}

/// Nächste Sync-Nachricht für die Verbindung; `nil`, wenn nichts zu senden ist.
#[rustler::nif(schedule = "DirtyCpu")]
fn generate<'a>(
    env: Env<'a>,
    doc: ResourceArc<Doc>,
    conn: ResourceArc<Conn>,
) -> Result<Option<Binary<'a>>, String> {
    let msg = with_peer(&doc, |peer| {
        let mut state = conn.state.lock().unwrap_or_else(|p| p.into_inner());
        Ok(peer.generate(&mut state))
    })?;
    msg.map(|m| to_binary(env, &m)).transpose()
}

/// Sync-Nachricht der Verbindung anwenden; liefert die Köpfe danach.
#[rustler::nif(schedule = "DirtyCpu")]
fn receive(
    doc: ResourceArc<Doc>,
    conn: ResourceArc<Conn>,
    message: Binary,
) -> Result<Vec<String>, String> {
    with_peer(&doc, |peer| {
        let mut state = conn.state.lock().unwrap_or_else(|p| p.into_inner());
        // Bei einem Fehler bleibt der Zustand der Verbindung wie vorher.
        let mut work = state.clone();
        peer.receive(&mut work, message.as_slice())
            .map_err(|e| e.to_string())?;
        *state = work;
        Ok(peer.heads())
    })
}

/// Köpfe der Historie (hex, sortiert).
#[rustler::nif]
fn heads(doc: ResourceArc<Doc>) -> Result<Vec<String>, String> {
    with_peer(&doc, |peer| Ok(peer.heads()))
}

/// Inhalts-Hash über die kanonische Form.
#[rustler::nif(schedule = "DirtyCpu")]
fn hash(doc: ResourceArc<Doc>) -> Result<String, String> {
    with_peer(&doc, |peer| peer.hash().map_err(|e| e.to_string()))
}

/// Kanonisches Projekt-JSON.
#[rustler::nif(schedule = "DirtyCpu")]
fn project_json(doc: ResourceArc<Doc>) -> Result<String, String> {
    with_peer(&doc, |peer| peer.project_json().map_err(|e| e.to_string()))
}

/// Befunde als JSON-Liste (volle Prüfung, auf Abruf).
#[rustler::nif(schedule = "DirtyCpu")]
fn findings_json(doc: ResourceArc<Doc>) -> Result<String, String> {
    with_peer(&doc, |peer| {
        peer.findings()
            .map(|f| f.to_string())
            .map_err(|e| e.to_string())
    })
}

rustler::init!("Elixir.SyncSpike.Native");
