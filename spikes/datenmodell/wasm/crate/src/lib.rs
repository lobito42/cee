//! WASM-Anbindung des Datenmodell-Prototyps (wasm-bindgen, Ziel Node und Browser).
//!
//! Fehler kommen als JavaScript-Ausnahme (`JsError`) mit Meldung zurück, nie als Panic.

use datenmodell::{synth, Op, Store};
use serde_json::Value as Json;
use wasm_bindgen::prelude::*;

/// Dokument im Rust-Kern.
#[wasm_bindgen]
pub struct Doc {
    store: Store,
}

fn js(e: impl std::fmt::Display) -> JsError {
    JsError::new(&e.to_string())
}

#[wasm_bindgen]
impl Doc {
    /// Projekt aus JSON-Text laden.
    #[wasm_bindgen(js_name = fromJson)]
    pub fn from_json(json: &str) -> Result<Doc, JsError> {
        let project: Json = serde_json::from_str(json).map_err(js)?;
        Ok(Doc {
            store: Store::from_project(&project).map_err(js)?,
        })
    }

    /// Synthetisches Projekt mit `n` Elementen (Messungen).
    pub fn synth(n: usize) -> Result<Doc, JsError> {
        Ok(Doc {
            store: Store::from_project(&synth::project(n)).map_err(js)?,
        })
    }

    /// IDs der änderbaren Elemente eines synthetischen Projekts.
    #[wasm_bindgen(js_name = synthEditableIds)]
    pub fn synth_editable_ids(n: usize) -> Vec<String> {
        synth::editable_ids(n)
    }

    /// Parameter setzen; der Wert ist JSON-Text.
    #[wasm_bindgen(js_name = setParam)]
    pub fn set_param(&mut self, id: &str, name: &str, value_json: &str) -> Result<(), JsError> {
        let value: Json = serde_json::from_str(value_json).map_err(js)?;
        self.store.set_param(id, name, &value).map_err(js)
    }

    /// Operationsliste (JSON-Text wie `ops.json`) anwenden.
    #[wasm_bindgen(js_name = applyOps)]
    pub fn apply_ops(&mut self, ops_json: &str) -> Result<usize, JsError> {
        let ops = Op::parse_list(ops_json).map_err(js)?;
        self.store.apply_all(&ops).map_err(js)?;
        Ok(ops.len())
    }

    /// Inhalts-Hash (SHA-256, hex) über die kanonische Form.
    pub fn hash(&self) -> Result<String, JsError> {
        self.store.hash().map_err(js)
    }
}
