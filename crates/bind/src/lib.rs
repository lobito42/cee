//! Fassade über `cee-graph` für alle Bindungen (ADR-029): Rustler-NIF, WASM und PyO3 rufen nur diese
//! Funktionen auf und enthalten keine eigene Datenmodell-Logik.
//!
//! An der Grenze stehen JSON-Text (UTF-8) und Bytes; geparst wird nur hier in Rust. Fehler haben überall
//! dieselbe Form `{code, message, element}` ([`BindError`]). Jeder Aufruf läuft unter
//! [`std::panic::catch_unwind`]; ein abgefangener Panic wird zum Code `internal`.
//!
//! Funktionen (Namen wie in design.md von ap-40): [`units`], [`parse`], [`convert`], [`Document`] mit
//! `new`, `import`, `load`, `save`, `apply_op`, `apply`, `export`, `hash`, `merge`, `validate`, `order`,
//! `affected`, `subgraph`, `migrate`, `element`, `materialized_count`; [`StatesHandle`] mit `new`, `event`,
//! `ready`, `get`; Fachpaket-Register [`packages`] und [`call`].

#![deny(missing_docs)]

use std::fmt;
use std::panic::{catch_unwind, AssertUnwindSafe};

use cee_graph::doc::{Doc, Op};
use cee_graph::index::Index;
use cee_graph::state::States;
use cee_graph::types::TypeRegistry;
use cee_graph::units::{self, AXES};
use cee_graph::validate::Finding;
use cee_graph::Error;
use serde_json::{json, Map, Value as Json};

/// Code für Eingaben, die kein gültiges JSON sind oder die falsche Form haben.
pub const INVALID_JSON: &str = "invalid_json";
/// Code für Bytes, die sich nicht als Dokument laden lassen.
pub const INVALID_DOCUMENT: &str = "invalid_document";
/// Code für einen abgefangenen Panic (darf nie vorkommen, wird aber sauber gemeldet).
pub const INTERNAL: &str = "internal";
/// Code für ein Element, das es nicht gibt (`doc.element`).
pub const MISSING_TARGET: &str = "missing_target";

/// Strukturierter Fehler an jeder Grenze: `{"code", "message", "element"}`.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct BindError {
    /// Stabiler Code (Kern-Codes wie `unknown_unit`, dazu `invalid_json`, `invalid_document`, `internal`).
    pub code: String,
    /// Erklärung für Menschen.
    pub message: String,
    /// Betroffenes Element, falls bekannt.
    pub element: Option<String>,
}

impl BindError {
    /// Neuer Fehler.
    pub fn new(code: &str, message: impl Into<String>, element: Option<&str>) -> Self {
        BindError {
            code: code.to_owned(),
            message: message.into(),
            element: element.map(str::to_owned),
        }
    }

    /// Fehler des Kerns; die Meldung ist dieselbe wie bei `graphctl` (`<code>: <text>`).
    pub fn core(e: &Error, element: Option<&str>) -> Self {
        let code = match e {
            Error::Json(_) => INVALID_JSON,
            other => other.code(),
        };
        BindError::new(code, e.to_string(), element)
    }

    /// JSON-Form `{"code", "message", "element"}`.
    pub fn to_json(&self) -> Json {
        json!({"code": self.code, "message": self.message, "element": self.element})
    }

    /// JSON-Text der Form [`BindError::to_json`].
    pub fn to_json_string(&self) -> String {
        self.to_json().to_string()
    }
}

impl fmt::Display for BindError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code, self.message)
    }
}

impl std::error::Error for BindError {}

/// Ergebnis an der Grenze.
pub type BindResult<T> = Result<T, BindError>;

/// Führt `f` aus; ein Panic wird zu [`INTERNAL`] und erreicht den Host nie.
pub fn guard<T>(f: impl FnOnce() -> BindResult<T>) -> BindResult<T> {
    catch_unwind(AssertUnwindSafe(f)).unwrap_or_else(|_| {
        Err(BindError::new(
            INTERNAL,
            "interner Fehler in der Bindungsschicht (Panic abgefangen)",
            None,
        ))
    })
}

fn parse_json(text: &str) -> BindResult<Json> {
    serde_json::from_str(text)
        .map_err(|e| BindError::new(INVALID_JSON, format!("{INVALID_JSON}: {e}"), None))
}

fn core<T>(r: cee_graph::Result<T>) -> BindResult<T> {
    r.map_err(|e| BindError::core(&e, None))
}

fn findings_json(findings: &[Finding]) -> Json {
    Json::Array(findings.iter().map(Finding::to_json).collect())
}

/// Typdefinitionen registrieren; Fehler einzelner Definitionen werden gesammelt (wie `graphctl --types`).
fn registry(types: Option<&str>) -> BindResult<(TypeRegistry, Vec<Error>)> {
    let mut reg = TypeRegistry::new();
    let errors = match types {
        Some(text) => reg.register_all(&parse_json(text)?),
        None => Vec::new(),
    };
    Ok((reg, errors))
}

// --- Einheiten ----------------------------------------------------------------------------------------

/// Einheitentabelle als JSON-Liste `[{"code", "dimension", "factor"}]` (wie `graphctl units`).
pub fn units() -> BindResult<String> {
    guard(|| {
        let list: Vec<Json> = units::UNITS
            .iter()
            .map(|u| {
                let dimension: Map<String, Json> = AXES
                    .iter()
                    .zip(u.dim.0.iter())
                    .map(|(axis, e)| ((*axis).to_owned(), json!(e)))
                    .collect();
                json!({"code": u.code, "dimension": dimension, "factor": u.factor})
            })
            .collect();
        Ok(Json::Array(list).to_string())
    })
}

/// Liest eine Eingabe wie „1,2 m“; Ergebnis `{"value", "unit"}` in kanonischer Einheit.
pub fn parse(text: &str, default: Option<&str>) -> BindResult<String> {
    guard(|| {
        let q = core(units::parse_quantity(text, default))?;
        Ok(json!({"value": q.value, "unit": q.unit}).to_string())
    })
}

/// Rechnet `value` von `from` nach `to` um (gleiche Dimension).
pub fn convert(value: f64, from: &str, to: &str) -> BindResult<f64> {
    guard(|| core(units::convert(value, from, to)))
}

// --- Dokument -----------------------------------------------------------------------------------------

/// Dokument-Handle: Kern-Dokument und die Typdefinitionen, mit denen es geöffnet wurde.
pub struct Document {
    doc: Doc,
    types: TypeRegistry,
}

fn element_of(op: &Json) -> Option<&str> {
    op.get("id").and_then(Json::as_str)
}

fn op_result(doc: &mut Doc, types: &TypeRegistry, raw: &Json) -> BindResult<Json> {
    let outcome = Op::parse(raw).and_then(|op| doc.apply(&op, types));
    match outcome {
        Ok(o) => Ok(json!({"result": "ok", "warnings": o.warnings})),
        Err(e) => Err(BindError::new(e.code(), e.to_string(), element_of(raw))),
    }
}

impl Document {
    /// Leeres Dokument.
    pub fn new() -> BindResult<Document> {
        guard(|| {
            Ok(Document {
                doc: core(Doc::new())?,
                types: TypeRegistry::new(),
            })
        })
    }

    /// Projekt-JSON importieren (wie `graphctl import`); zweites Ergebnis: `{"findings", "type_errors"}`.
    pub fn import(project: &str, types: Option<&str>) -> BindResult<(Document, String)> {
        guard(|| {
            let project = parse_json(project)?;
            let (types, type_errors) = registry(types)?;
            let (doc, findings) = core(Doc::import(&project, &types, None))?;
            let errors: Vec<Json> = type_errors
                .iter()
                .map(|e| BindError::core(e, None).to_json())
                .collect();
            let info = json!({"findings": findings_json(&findings), "type_errors": errors});
            Ok((Document { doc, types }, info.to_string()))
        })
    }

    /// Gespeicherte Bytes laden (Migrationen beim Öffnen); nicht ladbare Bytes ergeben `invalid_document`.
    pub fn load(bytes: &[u8], types: Option<&str>) -> BindResult<Document> {
        guard(|| {
            let (types, _) = registry(types)?;
            let doc = Doc::load(bytes).map_err(|e| match e {
                Error::SchemaTooNew(_) => BindError::core(&e, None),
                other => BindError::new(
                    INVALID_DOCUMENT,
                    format!("{INVALID_DOCUMENT}: {other}"),
                    None,
                ),
            })?;
            Ok(Document { doc, types })
        })
    }

    /// Dokument als Bytes (mit Historie und Index-Abbild).
    pub fn save(&mut self) -> BindResult<Vec<u8>> {
        guard(|| Ok(self.doc.save()))
    }

    /// Eine Operation (JSON-Text) anwenden; Ergebnis `{"result": "ok", "warnings": [...]}`. Abgelehnte
    /// Operationen ändern das Dokument nicht und kommen als Fehler mit dem Code des Kerns zurück.
    pub fn apply_op(&mut self, op: &str) -> BindResult<String> {
        guard(|| {
            let raw = parse_json(op)?;
            op_result(&mut self.doc, &self.types, &raw).map(|j| j.to_string())
        })
    }

    /// Operationsliste anwenden (wie `graphctl apply`); Ergebnis `{"results": [...]}`, je Operation
    /// `{"result": "ok"|"<code>", "warnings", ["message"]}`.
    pub fn apply(&mut self, ops: &str) -> BindResult<String> {
        guard(|| {
            let raw = parse_json(ops)?;
            let list = raw.as_array().ok_or_else(|| {
                BindError::new(INVALID_JSON, "Operationen müssen eine Liste sein", None)
            })?;
            let results: Vec<Json> = list
                .iter()
                .map(|op| match op_result(&mut self.doc, &self.types, op) {
                    Ok(j) => j,
                    Err(e) => json!({"result": e.code, "message": e.message, "warnings": []}),
                })
                .collect();
            Ok(json!({"results": results}).to_string())
        })
    }

    /// Kanonisches Projekt-JSON (bitgleich zu `graphctl export`).
    pub fn export(&self) -> BindResult<String> {
        guard(|| Ok(core(self.doc.export())?.to_string()))
    }

    /// Inhalts-Hash (SHA-256, hex).
    pub fn hash(&self) -> BindResult<String> {
        guard(|| core(self.doc.hash()))
    }

    /// Führt `other` in dieses Dokument zusammen.
    pub fn merge(&mut self, other: &mut Document) -> BindResult<()> {
        guard(|| core(self.doc.merge(&mut other.doc)))
    }

    /// Prüfung; Ergebnis `{"findings": [...]}`.
    pub fn validate(&self) -> BindResult<String> {
        guard(|| {
            let findings = core(self.doc.validate(&self.types))?;
            Ok(json!({"findings": findings_json(&findings)}).to_string())
        })
    }

    /// Berechnungsreihenfolge; Ergebnis `{"order", "skipped"}`.
    pub fn order(&self) -> BindResult<String> {
        guard(|| {
            let o = core(self.doc.order())?;
            let skipped: Vec<Json> = o
                .skipped
                .iter()
                .map(|s| json!({"element": s.element, "reason": s.reason}))
                .collect();
            Ok(json!({"order": o.order, "skipped": skipped}).to_string())
        })
    }

    /// Betroffene Elemente nach Änderung von `ids` (JSON-Liste von IDs); Ergebnis `{"affected"}`.
    pub fn affected(&self, ids: &str) -> BindResult<String> {
        guard(|| {
            let raw = parse_json(ids)?;
            let ids: Vec<&str> = raw
                .as_array()
                .ok_or_else(|| BindError::new(INVALID_JSON, "IDs müssen eine Liste sein", None))?
                .iter()
                .filter_map(Json::as_str)
                .collect();
            let affected = self
                .doc
                .affected(&ids)
                .map_err(|e| BindError::core(&e, None))?;
            Ok(json!({"affected": affected}).to_string())
        })
    }

    /// Untergraph von `id`; Ergebnis `{"elements", "external_inputs", "materialized_count"}`.
    pub fn subgraph(&mut self, id: &str) -> BindResult<String> {
        guard(|| {
            let sub = self
                .doc
                .subgraph(id)
                .map_err(|e| BindError::core(&e, Some(id)))?;
            let external: Vec<Json> = sub
                .external_inputs
                .iter()
                .map(|x| json!({"element": x.element, "input": x.input, "target": x.target}))
                .collect();
            Ok(
                json!({"elements": sub.elements, "external_inputs": external,
                      "materialized_count": self.doc.materialized_count()})
                .to_string(),
            )
        })
    }

    /// Schema-Version beim Laden und jetzt (Migrationen laufen beim Öffnen); Ergebnis `{"before", "after"}`.
    pub fn migrate(&self) -> BindResult<String> {
        guard(|| {
            let after = core(self.doc.schema_version())?;
            Ok(json!({"before": self.doc.loaded_version(), "after": after}).to_string())
        })
    }

    /// Ein Element lesen (Teil-Laden: bereitet nur dieses Element auf). Ergebnis
    /// `{"id", "type", "inputs", "params", "outputs", "content": [<ids>], "meta"}`; fehlt es,
    /// `missing_target`.
    pub fn element(&mut self, id: &str) -> BindResult<String> {
        guard(|| {
            let missing = |e: Error| match e {
                Error::UnknownElement(_) => BindError::new(
                    MISSING_TARGET,
                    format!("{MISSING_TARGET}: Element `{id}` gibt es nicht"),
                    Some(id),
                ),
                other => BindError::core(&other, Some(id)),
            };
            let kind = self.doc.kind(id).map_err(missing)?;
            let inputs = self.doc.map_field(id, "inputs").map_err(missing)?;
            let outputs = self.doc.map_field(id, "outputs").map_err(missing)?;
            let content: Vec<String> = {
                let index = self.doc.index().map_err(missing)?;
                index
                    .position(id)
                    .and_then(|n| index.node(n))
                    .map(|node| {
                        node.children
                            .iter()
                            .map(|&c| index.id(c).to_owned())
                            .collect()
                    })
                    .unwrap_or_default()
            };
            let pm = self.doc.materialize(id).map_err(missing)?;
            let field = |k: &str| pm.get(k).cloned().unwrap_or_else(|| json!({}));
            Ok(
                json!({"id": id, "type": kind, "inputs": inputs, "params": field("params"),
                      "outputs": outputs, "content": content, "meta": field("meta")})
                .to_string(),
            )
        })
    }

    /// Anzahl der bisher aufbereiteten Elemente (Teil-Laden).
    pub fn materialized_count(&self) -> BindResult<usize> {
        guard(|| Ok(self.doc.materialized_count()))
    }

    /// Lesender Zugriff auf das Kern-Dokument (für Fachpaket-Funktionen).
    pub fn doc(&self) -> &Doc {
        &self.doc
    }
}

// --- Zustände -----------------------------------------------------------------------------------------

/// Berechnungszustände eines Dokuments (neben dem Dokument, nie im CRDT).
pub struct StatesHandle {
    index: Index,
    states: States,
}

impl StatesHandle {
    /// Neue Zustände für den aktuellen Stand des Dokuments; alle Elemente beginnen als `stale`.
    pub fn new(doc: &mut Document) -> BindResult<StatesHandle> {
        guard(|| {
            let index = core(doc.doc.index())?.clone();
            let states = States::new(&index);
            Ok(StatesHandle { index, states })
        })
    }

    /// Ereignis `{"event": "start"|"ok"|"err"|"change", "id": "<id>"}` (wie `graphctl states`).
    pub fn event(&mut self, event: &str) -> BindResult<()> {
        guard(|| {
            let raw = parse_json(event)?;
            let id = raw.get("id").and_then(Json::as_str).unwrap_or("");
            let r = match raw.get("event").and_then(Json::as_str).unwrap_or("") {
                "change" => self.states.change(&self.index, id),
                "start" => self.states.start(id),
                "ok" => self.states.finish_ok(id),
                "err" => self.states.finish_err(
                    id,
                    Finding::error(id, "", id, "failed", "Berechnung fehlgeschlagen".into()),
                ),
                other => {
                    return Err(BindError::new(
                        INVALID_JSON,
                        format!("unbekanntes Ereignis `{other}`"),
                        Some(id),
                    ))
                }
            };
            r.map_err(|e| BindError::core(&e, Some(id)))
        })
    }

    /// Elemente, die jetzt berechnet werden können (JSON-Liste).
    pub fn ready(&self) -> BindResult<String> {
        guard(|| Ok(json!(self.states.ready(&self.index)).to_string()))
    }

    /// Alle Zustände `{"states", "ready", "findings"}` (wie `graphctl states`).
    pub fn get(&self) -> BindResult<String> {
        guard(|| {
            let mut map = Map::new();
            for node in self.index.nodes() {
                if let Some(s) = self.states.get(&node.id) {
                    map.insert(node.id.clone(), json!(s.as_str()));
                }
            }
            let mut findings = Map::new();
            for (id, f) in self.states.failed() {
                findings.insert(id.to_owned(), json!([f.to_json()]));
            }
            Ok(
                json!({"states": map, "ready": self.states.ready(&self.index),
                      "findings": findings})
                .to_string(),
            )
        })
    }
}

// --- Fachpaket-Funktionen -----------------------------------------------------------------------------

/// Lesende Fachpaket-Funktion: Dokument, Argumente als JSON; Fehler als Kernfehler mit Element.
pub type PackageFunction = fn(&Doc, &Json) -> Result<Json, (Error, Option<String>)>;

/// Register aller eingebundenen Fachpaket-Funktionen (per Cargo-Feature, offene Frage 2).
fn registered() -> Vec<(&'static str, PackageFunction)> {
    #[allow(unused_mut)]
    let mut list: Vec<(&'static str, PackageFunction)> = Vec::new();
    #[cfg(feature = "pkg-beispiel")]
    list.extend(cee_pkg_beispiel::FUNCTIONS.iter().copied());
    list
}

/// Namen der angemeldeten Fachpaket-Funktionen (JSON-Liste); ohne Feature leer.
pub fn packages() -> BindResult<String> {
    guard(|| {
        let names: Vec<&str> = registered().iter().map(|(n, _)| *n).collect();
        Ok(json!(names).to_string())
    })
}

/// Fachpaket-Funktion `name` mit Argumenten `args` (JSON-Text) auf `doc` aufrufen.
pub fn call(name: &str, doc: &Document, args: &str) -> BindResult<String> {
    guard(|| {
        let args = parse_json(args)?;
        let (_, f) = registered()
            .into_iter()
            .find(|(n, _)| *n == name)
            .ok_or_else(|| {
                BindError::new(
                    "unknown_function",
                    format!("Fachpaket-Funktion `{name}` ist nicht angemeldet"),
                    None,
                )
            })?;
        f(&doc.doc, &args)
            .map(|j| j.to_string())
            .map_err(|(e, element)| BindError::core(&e, element.as_deref()))
    })
}

/// Löst absichtlich einen Panic aus, um das Abfangen an der Grenze zu prüfen (nur mit `test-hooks`).
#[cfg(feature = "test-hooks")]
pub fn debug_panic() -> BindResult<()> {
    guard(|| {
        #[allow(clippy::panic)]
        {
            panic!("debug_panic: absichtlicher Panic (Feature test-hooks)")
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    const PROJECT: &str = r#"{"schema_version": 1, "elements": [
        {"id": "a", "type": "thing", "inputs": {}, "params": {"p0": {"value": 1, "unit": "mm"}},
         "outputs": {"out": "thing"}, "content": [], "meta": {"name": "a"}},
        {"id": "b", "type": "thing", "inputs": {"in": "a.out"}, "params": {},
         "outputs": {"out": "thing"}, "content": [], "meta": {"name": "b"}}]}"#;

    fn doc() -> Document {
        Document::import(PROJECT, None).unwrap().0
    }

    #[test]
    fn einheiten_lesen_und_umrechnen() {
        assert!(units().unwrap().contains("\"mm\""));
        let q: Json = serde_json::from_str(&parse("1,2 m", Some("mm")).unwrap()).unwrap();
        assert_eq!(q, json!({"value": 1200.0, "unit": "mm"}));
        assert_eq!(convert(1.5, "m", "mm").unwrap(), 1500.0);
        assert_eq!(
            convert(1.5, "m", "kg").unwrap_err().code,
            "dimension_mismatch"
        );
        assert_eq!(parse("1 furlongx", None).unwrap_err().code, "unknown_unit");
    }

    #[test]
    fn operationen_und_fehler() {
        let mut d = doc();
        let ok = d
            .apply_op(r#"{"op": "set_param", "id": "a", "param": "p0", "value": {"value": 2, "unit": "m"}}"#)
            .unwrap();
        assert_eq!(ok, r#"{"result":"ok","warnings":[]}"#);
        let e = d.apply_op(r#"{"op": "set_param", "id": "#).unwrap_err();
        assert_eq!(e.code, INVALID_JSON);
        let e = d
            .apply_op(r#"{"op": "set_input", "id": "a", "name": "in", "target": "b.out"}"#)
            .unwrap_err();
        assert_eq!(
            (e.code.as_str(), e.element.as_deref()),
            ("cycle", Some("a"))
        );
        let e = d.apply_op(r#"{"op": "set_param", "id": "a"}"#).unwrap_err();
        assert_eq!(e.code, "invalid_operation");
        let r: Json = serde_json::from_str(
            &d.apply(r#"[{"op": "set_meta", "id": "a", "key": "note", "value": "x"}, {"op": "remove", "id": "zz"}]"#)
                .unwrap(),
        )
        .unwrap();
        assert_eq!(r["results"][0]["result"], "ok");
        assert_eq!(r["results"][1]["result"], "unknown_element");
    }

    #[test]
    fn speichern_laden_und_zusammenfuehren() {
        let mut d = doc();
        let bytes = d.save().unwrap();
        let mut other = Document::load(&bytes, None).unwrap();
        assert_eq!(other.hash().unwrap(), d.hash().unwrap());
        other
            .apply_op(r#"{"op": "set_meta", "id": "b", "key": "note", "value": "y"}"#)
            .unwrap();
        d.merge(&mut other).unwrap();
        assert_eq!(d.hash().unwrap(), other.hash().unwrap());
        let e = Document::load(b"kein Dokument", None).err().unwrap();
        assert_eq!(e.code, INVALID_DOCUMENT);
    }

    #[test]
    fn abfragen() {
        let mut d = doc();
        assert!(d.export().unwrap().starts_with('{'));
        assert_eq!(d.validate().unwrap(), r#"{"findings":[]}"#);
        assert!(d.order().unwrap().contains(r#""order":["a","b"]"#));
        assert_eq!(d.affected(r#"["a"]"#).unwrap(), r#"{"affected":["a","b"]}"#);
        assert!(d.subgraph("a").unwrap().contains(r#""elements":["a"]"#));
        assert_eq!(d.migrate().unwrap(), r#"{"after":1,"before":1}"#);
        assert_eq!(d.materialized_count().unwrap(), 0);
        let el: Json = serde_json::from_str(&d.element("b").unwrap()).unwrap();
        assert_eq!(el["inputs"], json!({"in": "a.out"}));
        assert_eq!(el["type"], "thing");
        assert_eq!(d.materialized_count().unwrap(), 1);
        let e = d.element("fehlt").unwrap_err();
        assert_eq!(
            (e.code.as_str(), e.element.as_deref()),
            (MISSING_TARGET, Some("fehlt"))
        );
    }

    #[test]
    fn zustaende() {
        let mut d = doc();
        let mut s = StatesHandle::new(&mut d).unwrap();
        assert_eq!(s.ready().unwrap(), r#"["a"]"#);
        s.event(r#"{"event": "start", "id": "a"}"#).unwrap();
        s.event(r#"{"event": "ok", "id": "a"}"#).unwrap();
        let g: Json = serde_json::from_str(&s.get().unwrap()).unwrap();
        assert_eq!(g["states"]["a"], "current");
        assert_eq!(g["ready"], json!(["b"]));
    }

    #[test]
    fn fachpakete() {
        let d = doc();
        let names: Json = serde_json::from_str(&packages().unwrap()).unwrap();
        assert_eq!(
            names.as_array().map(Vec::len),
            Some(usize::from(cfg!(feature = "pkg-beispiel")))
        );
        let e = call("gibt.es_nicht", &d, "{}").unwrap_err();
        assert_eq!(e.code, "unknown_function");
    }

    #[test]
    fn panic_wird_abgefangen() {
        let r: BindResult<()> = guard(|| panic!("absichtlich"));
        assert_eq!(r.unwrap_err().code, INTERNAL);
        #[cfg(feature = "test-hooks")]
        assert_eq!(debug_panic().unwrap_err().code, INTERNAL);
    }

    #[test]
    fn fehler_als_json() {
        let e = BindError::new("x", "y", Some("a"));
        assert_eq!(
            e.to_json_string(),
            r#"{"code":"x","element":"a","message":"y"}"#
        );
    }
}
