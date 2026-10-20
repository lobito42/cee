//! WASM-Anbindung des Sync-Spikes (wasm-bindgen, Ziele Node und Browser).
//!
//! Fehler kommen als JavaScript-Ausnahme (`JsError`) zurück, nie als Panic.

use sync_core::{plan, Peer, SyncState};
use wasm_bindgen::prelude::*;

fn js(e: impl std::fmt::Display) -> JsError {
    JsError::new(&e.to_string())
}

/// Sync-Zustand einer Verbindung zum Server.
#[wasm_bindgen]
pub struct SyncConn {
    state: SyncState,
}

#[wasm_bindgen]
impl SyncConn {
    #[wasm_bindgen(constructor)]
    #[allow(clippy::new_without_default)]
    pub fn new() -> SyncConn {
        SyncConn {
            state: SyncState::new(),
        }
    }
}

/// Dokument im Rust-Kern (eine Kopie je Client).
#[wasm_bindgen]
pub struct Doc {
    peer: Peer,
}

#[wasm_bindgen]
impl Doc {
    /// Leeres Dokument; den Stand liefert der erste Abgleich.
    pub fn empty() -> Doc {
        Doc {
            peer: Peer::empty(),
        }
    }

    /// `true`, sobald der erste Abgleich das Dokument geliefert hat.
    pub fn ready(&self) -> bool {
        self.peer.ready()
    }

    /// Operation oder Operationsliste (JSON-Text wie `ops.json`) anwenden.
    pub fn apply(&mut self, op_json: &str) -> Result<usize, JsError> {
        self.peer.apply_json(op_json).map_err(js)
    }

    /// Nächste Sync-Nachricht an den Server oder `undefined`.
    pub fn generate(&mut self, conn: &mut SyncConn) -> Option<Vec<u8>> {
        self.peer.generate(&mut conn.state)
    }

    /// Sync-Nachricht vom Server anwenden.
    pub fn receive(&mut self, conn: &mut SyncConn, message: &[u8]) -> Result<(), JsError> {
        self.peer.receive(&mut conn.state, message).map_err(js)
    }

    /// Köpfe der Historie (hex, sortiert).
    pub fn heads(&mut self) -> Vec<String> {
        self.peer.heads()
    }

    /// Inhalts-Hash (SHA-256, hex) über die kanonische Form.
    pub fn hash(&self) -> Result<String, JsError> {
        self.peer.hash().map_err(js)
    }

    /// Kanonisches Projekt-JSON.
    pub fn project(&self) -> Result<String, JsError> {
        self.peer.project_json().map_err(js)
    }

    /// Wert eines Felds als JSON-Text oder `undefined`.
    pub fn field(&self, id: &str, field: &str, name: &str) -> Option<String> {
        self.peer.field(id, field, name).map(|v| v.to_string())
    }

    /// Befunde als JSON-Text (volle Prüfung; Demo-Seite).
    pub fn findings(&mut self) -> Result<String, JsError> {
        self.peer.findings().map(|f| f.to_string()).map_err(js)
    }

    /// IDs der änderbaren Elemente eines synthetischen Projekts mit `n` Elementen.
    #[wasm_bindgen(js_name = editableIds)]
    pub fn editable_ids(n: usize) -> Vec<String> {
        sync_core::datenmodell_editable_ids(n)
    }

    /// Plan für das Szenario offline als JSON-Text `{"a": [...], "b": [...]}`.
    #[wasm_bindgen(js_name = offlinePlan)]
    pub fn offline_plan(
        n: usize,
        per_side: usize,
        seed: u32,
        both: bool,
    ) -> Result<String, JsError> {
        plan::offline(n, per_side, u64::from(seed), both)
            .map(|p| p.to_json().to_string())
            .map_err(js)
    }
}
