//! PyO3-Erweiterung `cee_sdk._graph` (ADR-029): die Rohschicht unter dem Python-SDK `sdk/python`.
//!
//! Jede Funktion ruft genau eine Funktion der Fassade `cee-bind`; hier steht keine Datenmodell-Logik. Ein-
//! und Ausgaben sind JSON-Text bzw. `bytes`; die Python-Schicht `cee_sdk` wandelt sie in `dict`, `list`,
//! `Quantity` und `Element`. Fehler werden als `cee_sdk.CeeError(code, message, element)` geworfen; Panics
//! fängt die Fassade ab. Lange Aufrufe geben den GIL frei, damit der Worker parallel arbeiten kann.

use std::sync::{Mutex, MutexGuard};

use cee_bind::{BindError, BindResult, Document, StatesHandle};
use pyo3::prelude::*;
use pyo3::types::PyBytes;

/// `cee_sdk.CeeError` mit Code, Text und Element; fehlt das Paket, ein `RuntimeError` mit derselben Angabe.
fn py_err(py: Python<'_>, e: BindError) -> PyErr {
    let built = (|| -> PyResult<PyErr> {
        let cls = py.import("cee_sdk")?.getattr("CeeError")?;
        let inst = cls.call1((e.code.clone(), e.message.clone(), e.element.clone()))?;
        Ok(PyErr::from_value(inst))
    })();
    built.unwrap_or_else(|err| err)
}

fn out<T>(py: Python<'_>, r: BindResult<T>) -> PyResult<T> {
    r.map_err(|e| py_err(py, e))
}

fn lock<T>(m: &Mutex<T>) -> MutexGuard<'_, T> {
    m.lock().unwrap_or_else(|p| p.into_inner())
}

/// Einheitentabelle (JSON-Liste).
#[pyfunction]
fn units(py: Python<'_>) -> PyResult<String> {
    out(py, cee_bind::units())
}

/// Eingabe wie „1,2 m“ lesen; Ergebnis `{"value", "unit"}` (JSON).
#[pyfunction]
#[pyo3(signature = (text, default=None))]
fn parse(py: Python<'_>, text: &str, default: Option<&str>) -> PyResult<String> {
    out(py, cee_bind::parse(text, default))
}

/// Wert zwischen Einheiten gleicher Dimension umrechnen.
#[pyfunction]
fn convert(py: Python<'_>, value: f64, from: &str, to: &str) -> PyResult<f64> {
    out(py, cee_bind::convert(value, from, to))
}

/// Namen der angemeldeten Fachpaket-Funktionen (JSON-Liste).
#[pyfunction]
fn packages(py: Python<'_>) -> PyResult<String> {
    out(py, cee_bind::packages())
}

/// Fachpaket-Funktion aufrufen (lesend); Argumente und Ergebnis als JSON.
#[pyfunction]
fn call(py: Python<'_>, name: &str, doc: &Doc, args: &str) -> PyResult<String> {
    let r = py.detach(|| cee_bind::call(name, &lock(&doc.inner), args));
    out(py, r)
}

/// Absichtlicher Panic (nur mit Feature `test-hooks`, sonst Fehler `internal` ohne Panic).
#[pyfunction]
fn debug_panic(py: Python<'_>) -> PyResult<()> {
    #[cfg(feature = "test-hooks")]
    let r = cee_bind::debug_panic();
    #[cfg(not(feature = "test-hooks"))]
    let r = Err(BindError::new(
        cee_bind::INTERNAL,
        "debug_panic braucht das Feature test-hooks",
        None,
    ));
    out(py, r)
}

/// Dokument-Handle (Rohschicht; das SDK umhüllt es als `cee_sdk.Document`).
#[pyclass(name = "Doc", module = "cee_sdk._graph", frozen)]
pub struct Doc {
    inner: Mutex<Document>,
    info: String,
}

fn wrap(inner: Document, info: String) -> Doc {
    Doc {
        inner: Mutex::new(inner),
        info,
    }
}

#[pymethods]
impl Doc {
    /// Leeres Dokument.
    #[staticmethod]
    fn new(py: Python<'_>) -> PyResult<Doc> {
        out(py, Document::new()).map(|d| wrap(d, "{}".into()))
    }

    /// Projekt-JSON importieren; Befunde über `import_info()`.
    #[staticmethod]
    #[pyo3(name = "import_project", signature = (project, types=None))]
    fn import_project(py: Python<'_>, project: &str, types: Option<&str>) -> PyResult<Doc> {
        let r = py.detach(|| Document::import(project, types));
        out(py, r).map(|(d, info)| wrap(d, info))
    }

    /// Befunde des Imports `{"findings", "type_errors"}` (JSON).
    fn import_info(&self) -> String {
        self.info.clone()
    }

    /// Gespeicherte Bytes laden.
    #[staticmethod]
    #[pyo3(signature = (data, types=None))]
    fn load(py: Python<'_>, data: &[u8], types: Option<&str>) -> PyResult<Doc> {
        let r = py.detach(|| Document::load(data, types));
        out(py, r).map(|d| wrap(d, "{}".into()))
    }

    /// Dokument als Bytes.
    fn save<'py>(&self, py: Python<'py>) -> PyResult<Bound<'py, PyBytes>> {
        let r = py.detach(|| lock(&self.inner).save());
        let bytes = out(py, r)?;
        Ok(PyBytes::new(py, &bytes))
    }

    /// Eine Operation (JSON) anwenden.
    fn apply_op(&self, py: Python<'_>, op: &str) -> PyResult<String> {
        out(py, lock(&self.inner).apply_op(op))
    }

    /// Operationsliste (JSON) anwenden.
    fn apply(&self, py: Python<'_>, ops: &str) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).apply(ops));
        out(py, r)
    }

    /// Kanonisches Projekt-JSON.
    fn export(&self, py: Python<'_>) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).export());
        out(py, r)
    }

    /// Inhalts-Hash (SHA-256, hex).
    fn hash(&self, py: Python<'_>) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).hash());
        out(py, r)
    }

    /// `other` in dieses Dokument zusammenführen.
    fn merge(&self, py: Python<'_>, other: &Doc) -> PyResult<()> {
        if std::ptr::eq(self, other) {
            return Ok(());
        }
        let r = py.detach(|| {
            let mut a = lock(&self.inner);
            let mut b = lock(&other.inner);
            a.merge(&mut b)
        });
        out(py, r)
    }

    /// Prüfung (JSON).
    fn validate(&self, py: Python<'_>) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).validate());
        out(py, r)
    }

    /// Berechnungsreihenfolge (JSON).
    fn order(&self, py: Python<'_>) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).order());
        out(py, r)
    }

    /// Betroffene Elemente; `ids` als JSON-Liste.
    fn affected(&self, py: Python<'_>, ids: &str) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).affected(ids));
        out(py, r)
    }

    /// Untergraph eines Elements (JSON).
    fn subgraph(&self, py: Python<'_>, id: &str) -> PyResult<String> {
        let r = py.detach(|| lock(&self.inner).subgraph(id));
        out(py, r)
    }

    /// Schema-Version beim Laden und jetzt (JSON).
    fn migrate(&self, py: Python<'_>) -> PyResult<String> {
        out(py, lock(&self.inner).migrate())
    }

    /// Ein Element lesen (Teil-Laden, JSON).
    fn element(&self, py: Python<'_>, id: &str) -> PyResult<String> {
        out(py, lock(&self.inner).element(id))
    }

    /// Anzahl der aufbereiteten Elemente.
    fn materialized_count(&self, py: Python<'_>) -> PyResult<usize> {
        out(py, lock(&self.inner).materialized_count())
    }
}

/// Berechnungszustände eines Dokuments (Rohschicht; das SDK umhüllt sie als `cee_sdk.States`).
#[pyclass(name = "States", module = "cee_sdk._graph", frozen)]
pub struct States {
    inner: Mutex<StatesHandle>,
}

#[pymethods]
impl States {
    /// Neue Zustände für den aktuellen Stand des Dokuments.
    #[staticmethod]
    fn new(py: Python<'_>, doc: &Doc) -> PyResult<States> {
        let r = py.detach(|| StatesHandle::new(&mut lock(&doc.inner)));
        out(py, r).map(|s| States {
            inner: Mutex::new(s),
        })
    }

    /// Ereignis `{"event", "id"}` (JSON).
    fn event(&self, py: Python<'_>, event: &str) -> PyResult<()> {
        out(py, lock(&self.inner).event(event))
    }

    /// Elemente, die jetzt berechnet werden können (JSON).
    fn ready(&self, py: Python<'_>) -> PyResult<String> {
        out(py, lock(&self.inner).ready())
    }

    /// Alle Zustände (JSON).
    fn get(&self, py: Python<'_>) -> PyResult<String> {
        out(py, lock(&self.inner).get())
    }
}

/// Modul `cee_sdk._graph`.
#[pymodule]
fn _graph(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(units, m)?)?;
    m.add_function(wrap_pyfunction!(parse, m)?)?;
    m.add_function(wrap_pyfunction!(convert, m)?)?;
    m.add_function(wrap_pyfunction!(packages, m)?)?;
    m.add_function(wrap_pyfunction!(call, m)?)?;
    m.add_function(wrap_pyfunction!(debug_panic, m)?)?;
    m.add_class::<Doc>()?;
    m.add_class::<States>()?;
    Ok(())
}
