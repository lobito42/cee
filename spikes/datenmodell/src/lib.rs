//! Prototyp für den Datenmodell-Spike (ap-01): Element-Graph auf Automerge.
//!
//! Kein Produktcode. Der Prototyp belegt, dass eine einheitliche Elementform auf einem
//! Automerge-Dokument trägt, wie schnell Laden, Ändern und Zusammenführen sind und dass dieselbe
//! Logik nativ, als Rustler-NIF und als WASM-Modul gleiche Ergebnisse liefert.
//!
//! Speicherform im Automerge-Dokument (flach, damit eine Parameteränderung O(1) bleibt):
//!
//! ```text
//! ROOT
//! ├── project : Map   Schlüssel der obersten Ebene außer `elements` (z. B. schema_version)
//! ├── roots   : List  IDs der Elemente der obersten Ebene, in Reihenfolge
//! └── elements: Map   ID → Map { type, inputs, params, outputs, meta : Map, content : List<ID> }
//! ```
//!
//! Jedes Element hat dieselben sechs Einträge (die ID ist der Schlüssel) – keine Sonderfälle je Typ.

pub mod components;
pub mod conflicts;
pub mod synth;
pub mod text;

use std::fmt;

use automerge::{
    transaction::Transactable, ActorId, AutoCommit, ObjId, ObjType, ReadDoc, ScalarValue,
    ScalarValueRef as ScalarRef, Value, ValueRef, ROOT,
};
use serde_json::{Map, Number, Value as Json};
use sha2::{Digest, Sha256};

/// Die sieben Felder jedes Elements (ADR-028).
pub const FORM: [&str; 7] = [
    "id", "type", "inputs", "params", "outputs", "content", "meta",
];
/// Felder, die als Map gespeichert werden.
const MAP_FIELDS: [&str; 4] = ["inputs", "params", "outputs", "meta"];

/// Fehler des Prototyps. Bindungen wandeln ihn in strukturierte Fehler um (keine Panics).
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    /// Ungültiges JSON oder unerwartete JSON-Form.
    Json(String),
    /// Fehler aus Automerge.
    Automerge(String),
    /// Verstoß gegen das Datenmodell (z. B. unbekannte ID, doppelte ID).
    Model(String),
    /// Fehler beim Lesen der Textprojektion (Zeilennummer, Meldung).
    Text(usize, String),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::Json(m) => write!(f, "JSON: {m}"),
            Error::Automerge(m) => write!(f, "Automerge: {m}"),
            Error::Model(m) => write!(f, "Datenmodell: {m}"),
            Error::Text(line, m) => write!(f, "Text, Zeile {line}: {m}"),
        }
    }
}

impl std::error::Error for Error {}

impl From<automerge::AutomergeError> for Error {
    fn from(e: automerge::AutomergeError) -> Self {
        Error::Automerge(e.to_string())
    }
}

impl From<serde_json::Error> for Error {
    fn from(e: serde_json::Error) -> Self {
        Error::Json(e.to_string())
    }
}

pub type Result<T> = std::result::Result<T, Error>;

/// Eine Operation auf dem Graphen (Format von `ops.json`).
#[derive(Debug, Clone, PartialEq)]
pub enum Op {
    SetParam {
        id: String,
        name: String,
        value: Json,
    },
}

impl Op {
    /// Liest eine Operationsliste `[{"op": "set_param", "id": …, "name": …, "value": …}, …]`.
    pub fn parse_list(text: &str) -> Result<Vec<Op>> {
        let raw: Json = serde_json::from_str(text)?;
        let list = raw
            .as_array()
            .ok_or_else(|| Error::Json("Operationen müssen eine Liste sein".into()))?;
        list.iter().map(Op::from_json).collect()
    }

    fn from_json(raw: &Json) -> Result<Op> {
        let field = |k: &str| {
            raw.get(k)
                .ok_or_else(|| Error::Json(format!("Operation ohne Feld `{k}`")))
        };
        let str_field = |k: &str| -> Result<String> {
            field(k)?
                .as_str()
                .map(str::to_owned)
                .ok_or_else(|| Error::Json(format!("Feld `{k}` muss ein String sein")))
        };
        match str_field("op")?.as_str() {
            "set_param" => Ok(Op::SetParam {
                id: str_field("id")?,
                name: str_field("name")?,
                value: field("value")?.clone(),
            }),
            other => Err(Error::Json(format!("unbekannte Operation `{other}`"))),
        }
    }
}

/// Element-Graph auf einem Automerge-Dokument.
pub struct Store {
    doc: AutoCommit,
}

impl Store {
    /// Leeres Projekt.
    pub fn new() -> Result<Store> {
        Self::with_actor(AutoCommit::new())
    }

    fn with_actor(mut doc: AutoCommit) -> Result<Store> {
        doc.put_object(ROOT, "project", ObjType::Map)?;
        doc.put_object(ROOT, "roots", ObjType::List)?;
        doc.put_object(ROOT, "elements", ObjType::Map)?;
        doc.commit();
        Ok(Store { doc })
    }

    /// Projekt aus JSON (`{"schema_version": n, "elements": [...]}`) aufbauen.
    pub fn from_project(project: &Json) -> Result<Store> {
        Self::from_project_with_actor(project, None)
    }

    /// Wie `from_project`, mit fester Actor-ID (deterministische Historie für Messungen).
    pub fn from_project_with_actor(project: &Json, actor: Option<&[u8]>) -> Result<Store> {
        let mut doc = AutoCommit::new();
        if let Some(a) = actor {
            doc.set_actor(ActorId::from(a));
        }
        let mut store = Self::with_actor(doc)?;
        let obj = project
            .as_object()
            .ok_or_else(|| Error::Json("Projekt muss ein Objekt sein".into()))?;
        let project_map = store.obj(&ROOT, "project")?;
        for (key, value) in obj {
            if key != "elements" {
                put_json(&mut store.doc, &project_map, Slot::Key(key), value)?;
            }
        }
        let elements = obj
            .get("elements")
            .and_then(Json::as_array)
            .ok_or_else(|| Error::Json("Projekt ohne Liste `elements`".into()))?;
        let roots = store.obj(&ROOT, "roots")?;
        let elems = store.obj(&ROOT, "elements")?;
        for (index, element) in elements.iter().enumerate() {
            let id = store.add_element(&elems, element)?;
            store.doc.insert(&roots, index, id)?;
        }
        store.doc.commit();
        Ok(store)
    }

    /// Fügt ein Element (rekursiv mit Untergraph) ein und gibt seine ID zurück.
    fn add_element(&mut self, elems: &ObjId, element: &Json) -> Result<String> {
        let e = element
            .as_object()
            .ok_or_else(|| Error::Json("Element muss ein Objekt sein".into()))?;
        let id = e
            .get("id")
            .and_then(Json::as_str)
            .ok_or_else(|| Error::Json("Element ohne `id`".into()))?
            .to_owned();
        if let Some(extra) = e.keys().find(|k| !FORM.contains(&k.as_str())) {
            return Err(Error::Model(format!("{id}: unbekanntes Feld `{extra}`")));
        }
        if self.doc.get(elems, id.as_str())?.is_some() {
            return Err(Error::Model(format!("doppelte ID `{id}`")));
        }
        let obj = self.doc.put_object(elems, id.as_str(), ObjType::Map)?;
        let kind = e
            .get("type")
            .and_then(Json::as_str)
            .ok_or_else(|| Error::Json(format!("{id}: `type` fehlt")))?;
        self.doc.put(&obj, "type", kind)?;
        for field in MAP_FIELDS {
            let map = self.doc.put_object(&obj, field, ObjType::Map)?;
            let value = e.get(field).and_then(Json::as_object).ok_or_else(|| {
                Error::Json(format!("{id}: `{field}` fehlt oder ist kein Objekt"))
            })?;
            for (k, v) in value {
                put_json(&mut self.doc, &map, Slot::Key(k), v)?;
            }
        }
        let content = self.doc.put_object(&obj, "content", ObjType::List)?;
        let children = e
            .get("content")
            .and_then(Json::as_array)
            .ok_or_else(|| Error::Json(format!("{id}: `content` fehlt oder ist keine Liste")))?;
        for (index, child) in children.iter().enumerate() {
            let child_id = self.add_element(elems, child)?;
            self.doc.insert(&content, index, child_id)?;
        }
        Ok(id)
    }

    /// Kanonisches Projekt-JSON aus dem Dokument (Reihenfolge der Listen bleibt erhalten).
    pub fn to_project(&self) -> Result<Json> {
        let mut out = Map::new();
        let project = self.obj(&ROOT, "project")?;
        if let Json::Object(m) = read_obj(&self.doc, &project, ObjType::Map)? {
            out.extend(m);
        }
        let elems = self.obj(&ROOT, "elements")?;
        let roots = self.obj(&ROOT, "roots")?;
        let mut list = Vec::new();
        for id in self.id_list(&roots)? {
            list.push(self.element_json(&elems, &id, 0)?);
        }
        out.insert("elements".into(), Json::Array(list));
        Ok(Json::Object(out))
    }

    fn element_json(&self, elems: &ObjId, id: &str, depth: usize) -> Result<Json> {
        if depth > 256 {
            return Err(Error::Model(format!(
                "{id}: Untergraph zu tief oder zyklisch"
            )));
        }
        let obj = self
            .obj_opt(elems, id)?
            .ok_or_else(|| Error::Model(format!("Element `{id}` fehlt")))?;
        let mut e = Map::new();
        e.insert("id".into(), Json::String(id.to_owned()));
        let kind = match self.doc.get(&obj, "type")? {
            Some((Value::Scalar(s), _)) => scalar_to_json(&s),
            _ => Json::Null,
        };
        e.insert("type".into(), kind);
        for field in MAP_FIELDS {
            let map = self.obj(&obj, field)?;
            e.insert(field.into(), read_obj(&self.doc, &map, ObjType::Map)?);
        }
        let content = self.obj(&obj, "content")?;
        let mut children = Vec::new();
        for child in self.id_list(&content)? {
            children.push(self.element_json(elems, &child, depth + 1)?);
        }
        e.insert("content".into(), Json::Array(children));
        Ok(Json::Object(e))
    }

    fn id_list(&self, list: &ObjId) -> Result<Vec<String>> {
        let mut ids = Vec::new();
        for item in self.doc.list_range(list, ..) {
            match item.value {
                ValueRef::Scalar(ScalarRef::Str(id)) => ids.push(id.into_owned()),
                other => return Err(Error::Model(format!("ID-Liste enthält {other:?}"))),
            }
        }
        Ok(ids)
    }

    fn obj_opt(&self, parent: &ObjId, key: &str) -> Result<Option<ObjId>> {
        match self.doc.get(parent, key)? {
            Some((Value::Object(_), id)) => Ok(Some(id)),
            Some(_) => Err(Error::Model(format!("`{key}` ist kein Objekt"))),
            None => Ok(None),
        }
    }

    fn obj(&self, parent: &ObjId, key: &str) -> Result<ObjId> {
        self.obj_opt(parent, key)?
            .ok_or_else(|| Error::Model(format!("`{key}` fehlt")))
    }

    fn element(&self, id: &str) -> Result<ObjId> {
        let elems = self.obj(&ROOT, "elements")?;
        self.obj_opt(&elems, id)?
            .ok_or_else(|| Error::Model(format!("unbekannte ID `{id}`")))
    }

    /// Alle Element-IDs (sortiert).
    pub fn ids(&self) -> Result<Vec<String>> {
        let elems = self.obj(&ROOT, "elements")?;
        Ok(self.doc.keys(&elems).collect())
    }

    /// Anzahl der Elemente.
    pub fn len(&self) -> Result<usize> {
        let elems = self.obj(&ROOT, "elements")?;
        Ok(self.doc.length(&elems))
    }

    /// `true`, wenn das Projekt keine Elemente hat.
    pub fn is_empty(&self) -> Result<bool> {
        Ok(self.len()? == 0)
    }

    /// Setzt einen Parameter und schließt die Änderung ab (eine Änderung in der Historie).
    pub fn set_param(&mut self, id: &str, name: &str, value: &Json) -> Result<()> {
        self.set_field(id, "params", name, value)
    }

    /// Setzt einen Eingang (Referenz `<id>.<output>`).
    pub fn set_input(&mut self, id: &str, name: &str, reference: &str) -> Result<()> {
        self.set_field(id, "inputs", name, &Json::String(reference.to_owned()))
    }

    fn set_field(&mut self, id: &str, field: &str, name: &str, value: &Json) -> Result<()> {
        let obj = self.element(id)?;
        let map = self.obj(&obj, field)?;
        put_json(&mut self.doc, &map, Slot::Key(name), value)?;
        self.doc.commit();
        Ok(())
    }

    /// Wert eines Felds (`params`, `inputs`, …) als JSON; `None`, wenn der Eintrag fehlt.
    pub fn field(&self, id: &str, field: &str, name: &str) -> Result<Option<Json>> {
        let obj = self.element(id)?;
        let map = self.obj(&obj, field)?;
        match self.doc.get(&map, name)? {
            None => Ok(None),
            Some((Value::Scalar(s), _)) => Ok(Some(scalar_to_json(&s))),
            Some((Value::Object(t), o)) => Ok(Some(read_obj(&self.doc, &o, t)?)),
        }
    }

    /// Ganzes Feld (`params`, `inputs`, …) als JSON-Objekt.
    pub fn map_field(&self, id: &str, field: &str) -> Result<Json> {
        let obj = self.element(id)?;
        let map = self.obj(&obj, field)?;
        read_obj(&self.doc, &map, ObjType::Map)
    }

    /// Typ eines Elements.
    pub fn kind(&self, id: &str) -> Result<String> {
        let obj = self.element(id)?;
        match self.doc.get(&obj, "type")? {
            Some((Value::Scalar(s), _)) => match s.as_ref() {
                ScalarValue::Str(t) => Ok(t.to_string()),
                _ => Err(Error::Model(format!("{id}: `type` ist kein String"))),
            },
            _ => Err(Error::Model(format!("{id}: `type` fehlt"))),
        }
    }

    /// Entfernt ein Element samt Untergraph und schließt die Änderung ab.
    pub fn remove_element(&mut self, id: &str) -> Result<()> {
        let elems = self.obj(&ROOT, "elements")?;
        let obj = self.element(id)?;
        let content = self.obj(&obj, "content")?;
        for child in self.id_list(&content)? {
            self.remove_element(&child)?;
        }
        // Aus der Liste des Elternteils entfernen (Prototyp: lineare Suche).
        let mut lists = vec![self.obj(&ROOT, "roots")?];
        for other in self.ids()? {
            if let Some(o) = self.obj_opt(&elems, &other)? {
                lists.push(self.obj(&o, "content")?);
            }
        }
        for list in lists {
            let ids = self.id_list(&list)?;
            if let Some(pos) = ids.iter().position(|x| x == id) {
                self.doc.delete(&list, pos)?;
            }
        }
        self.doc.delete(&elems, id)?;
        self.doc.commit();
        Ok(())
    }

    /// Wendet eine Operation an.
    pub fn apply(&mut self, op: &Op) -> Result<()> {
        match op {
            Op::SetParam { id, name, value } => self.set_param(id, name, value),
        }
    }

    /// Wendet eine Operationsfolge an.
    pub fn apply_all(&mut self, ops: &[Op]) -> Result<()> {
        ops.iter().try_for_each(|op| self.apply(op))
    }

    /// Inhalts-Hash (SHA-256, hex) über die kanonische Form – unabhängig von Historie und Actor.
    pub fn hash(&self) -> Result<String> {
        Ok(content_hash(&self.to_project()?))
    }

    /// Speichert das Dokument (mit Historie) als Bytes.
    pub fn save(&mut self) -> Vec<u8> {
        self.doc.save()
    }

    /// Lädt ein gespeichertes Dokument.
    pub fn load(bytes: &[u8]) -> Result<Store> {
        let doc = AutoCommit::load(bytes)?;
        Ok(Store { doc })
    }

    /// Zweig für Offline-Arbeit (neuer Actor).
    pub fn fork(&mut self) -> Store {
        Store {
            doc: self.doc.fork(),
        }
    }

    /// Zweig mit fester Actor-ID (deterministisch für Messungen).
    pub fn fork_with_actor(&mut self, actor: &[u8]) -> Store {
        Store {
            doc: self.doc.fork().with_actor(ActorId::from(actor)),
        }
    }

    /// Führt einen anderen Zweig in diesen zusammen.
    pub fn merge(&mut self, other: &mut Store) -> Result<()> {
        self.doc.merge(&mut other.doc)?;
        Ok(())
    }

    /// Zugriff auf das Automerge-Dokument (für Konfliktprüfung und Messungen).
    pub fn doc(&self) -> &AutoCommit {
        &self.doc
    }

    /// Leeres Automerge-Dokument ohne Grundstruktur: ein Teilnehmer, der den ganzen Stand erst über das
    /// Sync-Protokoll erhält (Sync-Spike ap-03). Lesen schlägt fehl, bis der erste Abgleich da ist.
    pub fn empty() -> Store {
        Store {
            doc: AutoCommit::new(),
        }
    }

    /// Veränderlicher Zugriff auf das Automerge-Dokument (Sync-Protokoll im Sync-Spike ap-03).
    pub fn doc_mut(&mut self) -> &mut AutoCommit {
        &mut self.doc
    }

    pub(crate) fn elements_obj(&self) -> Result<ObjId> {
        self.obj(&ROOT, "elements")
    }

    pub(crate) fn sub_obj(&self, parent: &ObjId, key: &str) -> Result<ObjId> {
        self.obj(parent, key)
    }
}

/// SHA-256 über die kanonische Form (sortierte Schlüssel, kompakt), hex-kodiert.
pub fn content_hash(project: &Json) -> String {
    let canonical = canonical_compact(project);
    let digest = Sha256::digest(canonical.as_bytes());
    digest.iter().map(|b| format!("{b:02x}")).collect()
}

/// Kanonisches JSON, kompakt. `serde_json::Map` ist ohne `preserve_order` sortiert.
pub fn canonical_compact(value: &Json) -> String {
    value.to_string()
}

/// Kanonisches JSON mit zwei Leerzeichen Einzug (Ausgabe von `from-text`).
pub fn canonical_pretty(value: &Json) -> Result<String> {
    Ok(serde_json::to_string_pretty(value)?)
}

enum Slot<'a> {
    Key(&'a str),
    Index(usize),
}

fn put_json(doc: &mut AutoCommit, obj: &ObjId, slot: Slot<'_>, value: &Json) -> Result<()> {
    match value {
        Json::Object(m) => {
            let child = match slot {
                Slot::Key(k) => doc.put_object(obj, k, ObjType::Map)?,
                Slot::Index(i) => doc.insert_object(obj, i, ObjType::Map)?,
            };
            for (k, v) in m {
                put_json(doc, &child, Slot::Key(k), v)?;
            }
        }
        Json::Array(list) => {
            let child = match slot {
                Slot::Key(k) => doc.put_object(obj, k, ObjType::List)?,
                Slot::Index(i) => doc.insert_object(obj, i, ObjType::List)?,
            };
            for (i, v) in list.iter().enumerate() {
                put_json(doc, &child, Slot::Index(i), v)?;
            }
        }
        scalar => {
            let s = json_to_scalar(scalar)?;
            match slot {
                Slot::Key(k) => doc.put(obj, k, s)?,
                Slot::Index(i) => doc.insert(obj, i, s)?,
            }
        }
    }
    Ok(())
}

fn json_to_scalar(value: &Json) -> Result<ScalarValue> {
    Ok(match value {
        Json::Null => ScalarValue::Null,
        Json::Bool(b) => ScalarValue::Boolean(*b),
        Json::String(s) => ScalarValue::Str(s.as_str().into()),
        Json::Number(n) => {
            if let Some(i) = n.as_i64() {
                ScalarValue::Int(i)
            } else if let Some(u) = n.as_u64() {
                ScalarValue::Uint(u)
            } else if let Some(f) = n.as_f64() {
                ScalarValue::F64(f)
            } else {
                return Err(Error::Json(format!("Zahl nicht darstellbar: {n}")));
            }
        }
        Json::Object(_) | Json::Array(_) => {
            return Err(Error::Json("Objekt ist kein Skalar".into()));
        }
    })
}

pub(crate) fn scalar_to_json(s: &ScalarValue) -> Json {
    match s {
        ScalarValue::Null => Json::Null,
        ScalarValue::Boolean(b) => Json::Bool(*b),
        ScalarValue::Str(s) => Json::String(s.to_string()),
        ScalarValue::Int(i) => Json::Number((*i).into()),
        ScalarValue::Uint(u) => Json::Number((*u).into()),
        ScalarValue::F64(f) => Number::from_f64(*f).map_or(Json::Null, Json::Number),
        ScalarValue::Counter(c) => Json::Number(i64::from(c).into()),
        ScalarValue::Timestamp(t) => Json::Number((*t).into()),
        ScalarValue::Bytes(_) | ScalarValue::Unknown { .. } => Json::Null,
    }
}

pub(crate) fn read_obj(doc: &AutoCommit, obj: &ObjId, kind: ObjType) -> Result<Json> {
    match kind {
        ObjType::Map | ObjType::Table => {
            let mut m = Map::new();
            for item in doc.map_range(obj, ..) {
                let v = match item.value.clone().into_value() {
                    Value::Scalar(s) => scalar_to_json(&s),
                    Value::Object(t) => read_obj(doc, &item.id(), t)?,
                };
                m.insert(item.key.to_string(), v);
            }
            Ok(Json::Object(m))
        }
        ObjType::List => {
            let mut l = Vec::new();
            for item in doc.list_range(obj, ..) {
                l.push(match item.value.clone().into_value() {
                    Value::Scalar(s) => scalar_to_json(&s),
                    Value::Object(t) => read_obj(doc, &item.id(), t)?,
                });
            }
            Ok(Json::Array(l))
        }
        ObjType::Text => Ok(Json::String(doc.text(obj)?)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn example() -> Json {
        let text = include_str!("../../../format/examples/raum.json");
        serde_json::from_str(text).expect("Beispiel lesbar")
    }

    #[test]
    fn roundtrip_through_automerge() {
        let project = example();
        let store = Store::from_project(&project).expect("aufbauen");
        assert_eq!(store.to_project().expect("lesen"), project);
    }

    #[test]
    fn save_and_load_keep_content() {
        let project = example();
        let mut store = Store::from_project(&project).expect("aufbauen");
        store
            .set_param("origin", "x", &Json::from(5))
            .expect("setzen");
        let bytes = store.save();
        let loaded = Store::load(&bytes).expect("laden");
        assert_eq!(loaded.hash().expect("hash"), store.hash().expect("hash"));
        assert_eq!(
            loaded.field("origin", "params", "x").expect("lesen"),
            Some(Json::from(5))
        );
    }

    #[test]
    fn hash_independent_of_actor() {
        let project = example();
        let a = Store::from_project_with_actor(&project, Some(b"a")).expect("a");
        let b = Store::from_project_with_actor(&project, Some(b"b")).expect("b");
        assert_eq!(a.hash().expect("a"), b.hash().expect("b"));
    }

    #[test]
    fn duplicate_ids_are_rejected() {
        let project = serde_json::json!({"schema_version": 1, "elements": [
            {"id": "a", "type": "t", "inputs": {}, "params": {}, "outputs": {}, "content": [], "meta": {}},
            {"id": "a", "type": "t", "inputs": {}, "params": {}, "outputs": {}, "content": [], "meta": {}}
        ]});
        assert!(matches!(
            Store::from_project(&project),
            Err(Error::Model(_))
        ));
    }

    #[test]
    fn unknown_id_is_an_error_not_a_panic() {
        let mut store = Store::from_project(&example()).expect("aufbauen");
        assert!(store
            .set_param("gibt-es-nicht", "x", &Json::from(1))
            .is_err());
    }

    #[test]
    fn remove_element_drops_subgraph() {
        let mut store = Store::from_project(&example()).expect("aufbauen");
        store.remove_element("tisch").expect("entfernen");
        let ids = store.ids().expect("ids");
        assert!(!ids.iter().any(|i| i.starts_with("tisch")));
        assert!(store.to_project().is_ok());
    }
}
