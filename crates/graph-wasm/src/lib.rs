//! WebAssembly-Bindung (wasm-bindgen) für Node und Browser (ADR-029).
//!
//! Jede Funktion ruft genau eine Funktion der Fassade `cee-bind`; hier steht keine Datenmodell-Logik.
//! Ein- und Ausgaben sind JSON-Text bzw. `Uint8Array`; Fehler werden als JS-Objekt
//! `{code, message, element}` geworfen. Gebaut wird über `npm run kern:build` im Client
//! (`client/src/kern/pkg-node` und `client/src/kern/pkg-web`).
//!
//! In WASM gibt es kein Abwickeln von Panics: Ein Panic beendet den laufenden Aufruf mit einer
//! `WebAssembly.RuntimeError`. Die Fassade lässt Dokumente dabei unverändert; die Prüfprogramme melden ihn
//! als `internal`.

use cee_bind::{BindError, BindResult, Document, StatesHandle};
use js_sys::{Object, Reflect};
use wasm_bindgen::prelude::*;

fn js_error(e: BindError) -> JsValue {
    let obj = Object::new();
    let element = e.element.map_or(JsValue::NULL, JsValue::from);
    // `Reflect::set` scheitert nur bei eingefrorenen Objekten; dieses ist frisch angelegt.
    let _ = Reflect::set(&obj, &"code".into(), &e.code.into());
    let _ = Reflect::set(&obj, &"message".into(), &e.message.into());
    let _ = Reflect::set(&obj, &"element".into(), &element);
    obj.into()
}

fn out<T>(r: BindResult<T>) -> Result<T, JsValue> {
    r.map_err(js_error)
}

/// Einheitentabelle (JSON-Liste).
#[wasm_bindgen]
pub fn units() -> Result<String, JsValue> {
    out(cee_bind::units())
}

/// Eingabe wie „1,2 m“ lesen; Ergebnis `{"value", "unit"}` (JSON).
#[wasm_bindgen]
pub fn parse(text: &str, default: Option<String>) -> Result<String, JsValue> {
    out(cee_bind::parse(text, default.as_deref()))
}

/// Wert zwischen Einheiten gleicher Dimension umrechnen.
#[wasm_bindgen]
pub fn convert(value: f64, from: &str, to: &str) -> Result<f64, JsValue> {
    out(cee_bind::convert(value, from, to))
}

/// Namen der angemeldeten Fachpaket-Funktionen (JSON-Liste).
#[wasm_bindgen]
pub fn packages() -> Result<String, JsValue> {
    out(cee_bind::packages())
}

/// Fachpaket-Funktion aufrufen (lesend); Argumente und Ergebnis als JSON.
#[wasm_bindgen]
pub fn call(name: &str, doc: &Doc, args: &str) -> Result<String, JsValue> {
    out(cee_bind::call(name, &doc.inner, args))
}

/// Absichtlicher Panic (nur mit Feature `test-hooks`, sonst Fehler `internal` ohne Panic).
#[wasm_bindgen]
pub fn debug_panic() -> Result<(), JsValue> {
    #[cfg(feature = "test-hooks")]
    let r = cee_bind::debug_panic();
    #[cfg(not(feature = "test-hooks"))]
    let r = Err(BindError::new(
        cee_bind::INTERNAL,
        "debug_panic braucht das Feature test-hooks",
        None,
    ));
    out(r)
}

/// Dokument-Handle.
#[wasm_bindgen]
pub struct Doc {
    inner: Document,
    info: String,
}

fn wrap(inner: Document) -> Doc {
    Doc {
        inner,
        info: "{}".into(),
    }
}

#[wasm_bindgen]
impl Doc {
    /// Leeres Dokument.
    #[wasm_bindgen(js_name = "new")]
    pub fn create() -> Result<Doc, JsValue> {
        out(Document::new()).map(wrap)
    }

    /// Projekt-JSON importieren; Befunde des Imports über `importInfo()`.
    #[wasm_bindgen(js_name = "import")]
    pub fn import_project(project: &str, types: Option<String>) -> Result<Doc, JsValue> {
        let (inner, info) = out(Document::import(project, types.as_deref()))?;
        Ok(Doc { inner, info })
    }

    /// Befunde des Imports `{"findings", "type_errors"}` (JSON).
    #[wasm_bindgen(js_name = "importInfo")]
    pub fn import_info(&self) -> String {
        self.info.clone()
    }

    /// Gespeicherte Bytes laden.
    pub fn load(bytes: &[u8], types: Option<String>) -> Result<Doc, JsValue> {
        out(Document::load(bytes, types.as_deref())).map(wrap)
    }

    /// Dokument als Bytes.
    pub fn save(&mut self) -> Result<Vec<u8>, JsValue> {
        out(self.inner.save())
    }

    /// Eine Operation (JSON) anwenden.
    pub fn apply_op(&mut self, op: &str) -> Result<String, JsValue> {
        out(self.inner.apply_op(op))
    }

    /// Operationsliste (JSON) anwenden.
    pub fn apply(&mut self, ops: &str) -> Result<String, JsValue> {
        out(self.inner.apply(ops))
    }

    /// Kanonisches Projekt-JSON.
    pub fn export(&self) -> Result<String, JsValue> {
        out(self.inner.export())
    }

    /// Inhalts-Hash (SHA-256, hex).
    pub fn hash(&self) -> Result<String, JsValue> {
        out(self.inner.hash())
    }

    /// `other` in dieses Dokument zusammenführen.
    pub fn merge(&mut self, other: &mut Doc) -> Result<(), JsValue> {
        out(self.inner.merge(&mut other.inner))
    }

    /// Prüfung (JSON).
    pub fn validate(&self) -> Result<String, JsValue> {
        out(self.inner.validate())
    }

    /// Berechnungsreihenfolge (JSON).
    pub fn order(&self) -> Result<String, JsValue> {
        out(self.inner.order())
    }

    /// Betroffene Elemente; `ids` als JSON-Liste.
    pub fn affected(&self, ids: &str) -> Result<String, JsValue> {
        out(self.inner.affected(ids))
    }

    /// Untergraph eines Elements (JSON).
    pub fn subgraph(&mut self, id: &str) -> Result<String, JsValue> {
        out(self.inner.subgraph(id))
    }

    /// Schema-Version beim Laden und jetzt (JSON).
    pub fn migrate(&self) -> Result<String, JsValue> {
        out(self.inner.migrate())
    }

    /// Ein Element lesen (Teil-Laden).
    pub fn element(&mut self, id: &str) -> Result<String, JsValue> {
        out(self.inner.element(id))
    }

    /// Anzahl der aufbereiteten Elemente.
    pub fn materialized_count(&self) -> Result<usize, JsValue> {
        out(self.inner.materialized_count())
    }
}

/// Berechnungszustände eines Dokuments.
#[wasm_bindgen]
pub struct States {
    inner: StatesHandle,
}

#[wasm_bindgen]
impl States {
    /// Neue Zustände für den aktuellen Stand des Dokuments.
    #[wasm_bindgen(js_name = "new")]
    pub fn create(doc: &mut Doc) -> Result<States, JsValue> {
        out(StatesHandle::new(&mut doc.inner)).map(|inner| States { inner })
    }

    /// Ereignis `{"event", "id"}` (JSON).
    pub fn event(&mut self, event: &str) -> Result<(), JsValue> {
        out(self.inner.event(event))
    }

    /// Elemente, die jetzt berechnet werden können (JSON).
    pub fn ready(&self) -> Result<String, JsValue> {
        out(self.inner.ready())
    }

    /// Alle Zustände (JSON).
    pub fn get(&self) -> Result<String, JsValue> {
        out(self.inner.get())
    }
}
