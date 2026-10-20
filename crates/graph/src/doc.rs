//! Dokument auf Automerge: Operationen, Laden, Speichern, Merge, Hash, Export und Stapel-Import.
//!
//! Speicherform (flach, damit eine Parameteränderung O(1) bleibt; Grundlage ist der Spike ap-01):
//!
//! ```text
//! ROOT
//! ├── project : Map   Schlüssel der obersten Ebene außer `elements` (z. B. schema_version)
//! ├── roots   : List  IDs der Elemente der obersten Ebene, in Reihenfolge
//! └── elements: Map   ID → Map { type, inputs, params, outputs, meta : Map, content : List<ID> }
//! ```
//!
//! Der Inhalts-Hash (SHA-256) läuft über die kanonische JSON-Form (sortierte Schlüssel, kompakt) und
//! hängt nur vom Inhalt ab, nicht von Historie oder Actor.

use std::collections::HashMap;

use automerge::{
    hydrate, iter::DocItem, transaction::Transactable, ActorId, AutoCommit, ObjId, ObjType,
    ReadDoc, ScalarValue, ScalarValueRef as ScalarRef, Value, ValueRef, ROOT,
};
use serde_json::{Map, Number, Value as Json};
use sha2::{Digest, Sha256};

use crate::schema::{self, FORM, MAP_FIELDS, META_ASSUMED};
use crate::types::TypeRegistry;
use crate::validate::{self, Finding};
use crate::{Error, Result};

type ExId = ObjId;

/// Größte erlaubte Tiefe eines Untergraphen beim Export.
const MAX_DEPTH: usize = 512;

/// Eine Operation auf dem Graphen (Format von `ops.json`).
#[derive(Debug, Clone, PartialEq)]
pub enum Op {
    /// Neues Element anlegen (am Ende der obersten Ebene oder unter `parent`).
    Create {
        /// Vollständiges Element als JSON (ohne `content`-Kinder; `id` ist Pflicht).
        element: Json,
        /// Elternelement, sonst oberste Ebene.
        parent: Option<String>,
    },
    /// Parameter setzen.
    SetParam {
        /// Element.
        id: String,
        /// Parametername.
        param: String,
        /// Neuer Wert.
        value: Json,
    },
    /// Eingang setzen (Referenz `<id>.<output>`).
    SetInput {
        /// Element.
        id: String,
        /// Eingangsname.
        name: String,
        /// Referenz.
        target: String,
    },
    /// Meta-Eintrag setzen.
    SetMeta {
        /// Element.
        id: String,
        /// Schlüssel.
        key: String,
        /// Wert.
        value: Json,
    },
    /// Element samt Untergraph entfernen.
    Remove {
        /// Element.
        id: String,
    },
}

/// Ergebnis einer angenommenen Operation.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct OpOutcome {
    /// Warnungscodes (`unit_assumed`, `unit_missing`), eindeutig und in fester Reihenfolge.
    pub warnings: Vec<&'static str>,
}

fn str_field(raw: &Json, key: &str) -> Result<String> {
    raw.get(key)
        .and_then(Json::as_str)
        .map(str::to_owned)
        .ok_or_else(|| Error::InvalidOperation(format!("Feld `{key}` fehlt oder ist kein String")))
}

impl Op {
    /// Liest eine Operationsliste (JSON-Array).
    pub fn parse_list(raw: &Json) -> Result<Vec<Op>> {
        raw.as_array()
            .ok_or_else(|| Error::InvalidOperation("Operationen müssen eine Liste sein".into()))?
            .iter()
            .map(Op::parse)
            .collect()
    }

    /// Liest eine einzelne Operation.
    pub fn parse(raw: &Json) -> Result<Op> {
        match str_field(raw, "op")?.as_str() {
            "create" => {
                let id = str_field(raw, "id")?;
                let mut element = Map::new();
                element.insert("id".into(), Json::String(id));
                element.insert("type".into(), Json::String(str_field(raw, "type")?));
                for field in MAP_FIELDS {
                    let default = if field == "meta" {
                        raw.get("id").map_or(Json::Null, |i| {
                            let mut m = Map::new();
                            m.insert("name".into(), i.clone());
                            Json::Object(m)
                        })
                    } else {
                        Json::Object(Map::new())
                    };
                    element.insert(field.into(), raw.get(field).cloned().unwrap_or(default));
                }
                element.insert("content".into(), Json::Array(Vec::new()));
                Ok(Op::Create {
                    element: Json::Object(element),
                    parent: raw.get("parent").and_then(Json::as_str).map(str::to_owned),
                })
            }
            "set_param" => Ok(Op::SetParam {
                id: str_field(raw, "id")?,
                param: str_field(raw, "param")?,
                value: raw
                    .get("value")
                    .cloned()
                    .ok_or_else(|| Error::InvalidOperation("Feld `value` fehlt".into()))?,
            }),
            "set_input" => Ok(Op::SetInput {
                id: str_field(raw, "id")?,
                name: str_field(raw, "name")?,
                target: str_field(raw, "target")?,
            }),
            "set_meta" => Ok(Op::SetMeta {
                id: str_field(raw, "id")?,
                key: str_field(raw, "key")?,
                value: raw
                    .get("value")
                    .cloned()
                    .ok_or_else(|| Error::InvalidOperation("Feld `value` fehlt".into()))?,
            }),
            "remove" => Ok(Op::Remove {
                id: str_field(raw, "id")?,
            }),
            other => Err(Error::InvalidOperation(format!(
                "unbekannte Operation `{other}`"
            ))),
        }
    }
}

/// Element-Graph auf einem Automerge-Dokument.
pub struct Doc {
    doc: AutoCommit,
}

impl Doc {
    /// Leeres Projekt (mit `schema_version`).
    pub fn new() -> Result<Doc> {
        Self::with_actor(AutoCommit::new())
    }

    fn with_actor(mut doc: AutoCommit) -> Result<Doc> {
        doc.put_object(ROOT, "project", ObjType::Map)?;
        doc.put_object(ROOT, "roots", ObjType::List)?;
        doc.put_object(ROOT, "elements", ObjType::Map)?;
        doc.commit();
        Ok(Doc { doc })
    }

    /// Projekt aus JSON (`{"schema_version": n, "elements": [...]}`) im Stapel aufbauen, in einer Transaktion.
    ///
    /// Nichts wird als Ganzes abgelehnt: Werte, die eine Operation ablehnen würde, bleiben unverändert im
    /// Element stehen (die Prüfung meldet sie). Zurück kommen nur Befunde, die das Dokument selbst nicht
    /// mehr zeigt (doppelte IDs, deren zweites Element verworfen wurde).
    pub fn import(
        project: &Json,
        types: &TypeRegistry,
        actor: Option<&[u8]>,
    ) -> Result<(Doc, Vec<Finding>)> {
        let obj = project
            .as_object()
            .ok_or_else(|| Error::Json("Projekt muss ein Objekt sein".into()))?;
        let list = obj
            .get("elements")
            .and_then(Json::as_array)
            .ok_or_else(|| Error::Json("Projekt ohne Liste `elements`".into()))?;
        let mut builder = Builder::new(types, false);
        let mut roots = Vec::with_capacity(list.len());
        for element in list {
            match element {
                Json::String(id) => roots.push(str_value(id)),
                _ => {
                    if let Some(id) = builder.build(element, &|_| false)? {
                        roots.push(str_value(&id));
                    }
                }
            }
        }
        if let Some(extra) = obj.get("unattached").and_then(Json::as_array) {
            for element in extra {
                builder.build(element, &|_| false)?;
            }
        }
        let mut header = HashMap::new();
        for (key, value) in obj {
            if key != "elements" && key != "unattached" {
                header.insert(key.clone(), json_to_hydrate(value)?);
            }
        }
        // Batch-Operationen: zwei Einfügungen je Baum statt einer je Knoten (deutlich schneller).
        let mut doc = AutoCommit::new();
        if let Some(a) = actor {
            doc.set_actor(ActorId::from(a));
        }
        let value =
            |m: HashMap<String, hydrate::Value>| hydrate::Value::from(hydrate::Map::from(m));
        doc.batch_create_object(ROOT, "project", &value(header), false)?;
        doc.batch_create_object(
            ROOT,
            "roots",
            &hydrate::Value::from(hydrate::List::from(roots)),
            false,
        )?;
        doc.batch_create_object(ROOT, "elements", &value(builder.elems), false)?;
        doc.commit();
        Ok((Doc { doc }, builder.dropped))
    }

    /// Kanonisches Projekt-JSON aus dem Dokument.
    ///
    /// Ein Element steht dort, wo es zuerst erreicht wird; weitere Verweise darauf erscheinen als ID-String.
    /// Elemente, die von keiner Wurzel erreichbar sind, stehen unter `unattached`. Das Dokument wird in einem
    /// Durchgang über alle Operationen gelesen; einzelne Zugriffe je Feld sind etwa dreimal langsamer.
    pub fn export(&self) -> Result<Json> {
        let mut objs: HashMap<ObjKey, Vec<(String, Cell)>> = HashMap::new();
        for it in self.doc.iter() {
            let (key, cell) = match &it.item {
                DocItem::Map(m) => (m.key.to_string(), cell_of(&m.value, &m.id())),
                DocItem::List(l) => (String::new(), cell_of(&l.value, &l.id())),
                DocItem::Text(_) => continue,
            };
            objs.entry(obj_key(&it.obj)).or_default().push((key, cell));
        }
        let root = assemble(ROOT_KEY, ObjType::Map, &mut objs);
        let Json::Object(mut root) = root else {
            return Err(Error::Model("Wurzel ist keine Map".into()));
        };
        let take = |root: &mut Map<String, Json>, key: &str| -> Result<Json> {
            root.remove(key)
                .ok_or_else(|| Error::Model(format!("`{key}` fehlt")))
        };
        let mut out = match take(&mut root, "project")? {
            Json::Object(m) => m,
            _ => Map::new(),
        };
        let Json::Object(mut elems) = take(&mut root, "elements")? else {
            return Err(Error::Model("`elements` ist keine Map".into()));
        };
        let Json::Array(roots) = take(&mut root, "roots")? else {
            return Err(Error::Model("`roots` ist keine Liste".into()));
        };
        let mut list = Vec::with_capacity(roots.len());
        for id in &roots {
            if let Some(id) = id.as_str() {
                list.push(take_element(&mut elems, id, 0)?);
            }
        }
        out.insert("elements".into(), Json::Array(list));
        let mut loose: Vec<String> = elems.keys().cloned().collect();
        loose.sort_unstable();
        let mut loose_json = Vec::new();
        for id in loose {
            loose_json.push(take_element(&mut elems, &id, 0)?);
        }
        if !loose_json.is_empty() {
            out.insert("unattached".into(), Json::Array(loose_json));
        }
        Ok(Json::Object(out))
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
            .ok_or_else(|| Error::UnknownElement(format!("`{id}`")))
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

    /// Ganzes Feld (`params`, `inputs`, …) als JSON-Objekt.
    pub fn map_field(&self, id: &str, field: &str) -> Result<Json> {
        let obj = self.element(id)?;
        let map = self.obj(&obj, field)?;
        read_obj(&self.doc, &map, ObjType::Map)
    }

    /// Wendet eine Operation an und schließt sie als eine Änderung ab. Abgelehnte Operationen verändern das
    /// Dokument nicht.
    pub fn apply(&mut self, op: &Op, types: &TypeRegistry) -> Result<OpOutcome> {
        let outcome = match op {
            Op::SetParam { id, param, value } => self.set_param(id, param, value, types)?,
            Op::SetInput { id, name, target } => {
                self.check_name(name)?;
                self.set_field(id, "inputs", name, &Json::String(target.clone()))?;
                OpOutcome::default()
            }
            Op::SetMeta { id, key, value } => {
                self.check_name(key)?;
                self.set_field(id, "meta", key, value)?;
                OpOutcome::default()
            }
            Op::Remove { id } => {
                self.remove_element(id)?;
                OpOutcome::default()
            }
            Op::Create { element, parent } => self.create(element, parent.as_deref(), types)?,
        };
        self.doc.commit();
        Ok(outcome)
    }

    /// Wendet eine Operationsfolge an; jedes Ergebnis steht für sich, abgelehnte Operationen stoppen nichts.
    pub fn apply_all(&mut self, ops: &[Op], types: &TypeRegistry) -> Vec<Result<OpOutcome>> {
        ops.iter().map(|op| self.apply(op, types)).collect()
    }

    fn check_name(&self, name: &str) -> Result<()> {
        if schema::is_valid_name(name) {
            Ok(())
        } else {
            Err(Error::InvalidName(format!("`{name}`")))
        }
    }

    fn set_field(&mut self, id: &str, field: &str, name: &str, value: &Json) -> Result<()> {
        let obj = self.element(id)?;
        let map = self.obj(&obj, field)?;
        put_json(&mut self.doc, &map, Slot::Key(name), value)
    }

    fn set_param(
        &mut self,
        id: &str,
        param: &str,
        value: &Json,
        types: &TypeRegistry,
    ) -> Result<OpOutcome> {
        self.check_name(param)?;
        let obj = self.element(id)?;
        let kind = self.kind(id)?;
        let n = schema::normalize_value(value, types.param(&kind, param))?;
        let params = self.obj(&obj, "params")?;
        put_json(&mut self.doc, &params, Slot::Key(param), &n.value)?;
        let meta = self.obj(&obj, "meta")?;
        let has_marker = self.doc.get(&meta, META_ASSUMED)?.is_some();
        if n.assumed || has_marker {
            let mut names = match self.obj_opt(&meta, META_ASSUMED)? {
                Some(list) => self.id_list(&list)?,
                None => Vec::new(),
            };
            let before = names.clone();
            names.retain(|x| x != param);
            if n.assumed {
                names.push(param.to_owned());
                names.sort();
            }
            if names != before {
                if names.is_empty() {
                    self.doc.delete(&meta, META_ASSUMED)?;
                } else {
                    let list = Json::Array(names.into_iter().map(Json::String).collect());
                    put_json(&mut self.doc, &meta, Slot::Key(META_ASSUMED), &list)?;
                }
            }
        }
        Ok(OpOutcome {
            warnings: n.warnings(),
        })
    }

    fn create(
        &mut self,
        element: &Json,
        parent: Option<&str>,
        types: &TypeRegistry,
    ) -> Result<OpOutcome> {
        let list = match parent {
            Some(p) => {
                let obj = self.element(p)?;
                self.obj(&obj, "content")?
            }
            None => self.obj(&ROOT, "roots")?,
        };
        let elems = self.obj(&ROOT, "elements")?;
        let mut builder = Builder::new(types, true);
        let exists = |id: &str| matches!(self.doc.get(&elems, id), Ok(Some(_)));
        let id = builder
            .build(element, &exists)?
            .ok_or_else(|| Error::Model("Element wurde nicht angelegt".into()))?;
        for (key, value) in &builder.elems {
            self.doc
                .batch_create_object(&elems, key.as_str(), value, false)?;
        }
        let n = self.doc.length(&list);
        self.doc.insert(&list, n, id.as_str())?;
        let mut outcome = OpOutcome::default();
        if builder.assumed {
            outcome.warnings.push("unit_assumed");
        }
        if builder.missing {
            outcome.warnings.push("unit_missing");
        }
        Ok(outcome)
    }

    /// Entfernt ein Element samt Untergraph. Die Suche nach dem Elternelement ist linear (Teil-Laden: ap-05b).
    fn remove_element(&mut self, id: &str) -> Result<()> {
        let elems = self.obj(&ROOT, "elements")?;
        let mut lists = vec![self.obj(&ROOT, "roots")?];
        for other in self.ids()? {
            if let Some(o) = self.obj_opt(&elems, &other)? {
                lists.push(self.obj(&o, "content")?);
            }
        }
        self.remove_rec(&elems, id, &lists, 0)
    }

    fn remove_rec(&mut self, elems: &ObjId, id: &str, lists: &[ObjId], depth: usize) -> Result<()> {
        if depth > MAX_DEPTH {
            return Err(Error::Model(format!("{id}: Untergraph zu tief")));
        }
        let obj = self.element(id)?;
        let content = self.obj(&obj, "content")?;
        for child in self.id_list(&content)? {
            if self.obj_opt(elems, &child)?.is_some() {
                self.remove_rec(elems, &child, lists, depth + 1)?;
            }
        }
        for list in lists {
            let ids = self.id_list(list)?;
            if let Some(pos) = ids.iter().position(|x| x == id) {
                self.doc.delete(list, pos)?;
            }
        }
        self.doc.delete(elems, id)?;
        Ok(())
    }

    /// Inhalts-Hash (SHA-256, hex) über die kanonische Form – unabhängig von Historie und Actor.
    pub fn hash(&self) -> Result<String> {
        Ok(content_hash(&self.export()?))
    }

    /// Prüft das Dokument und liefert alle Befunde auf einmal.
    pub fn validate(&self, types: &TypeRegistry) -> Result<Vec<Finding>> {
        Ok(validate::validate_project(&self.export()?, types))
    }

    /// Speichert das Dokument (mit Historie) als Bytes.
    pub fn save(&mut self) -> Vec<u8> {
        self.doc.save()
    }

    /// Lädt ein gespeichertes Dokument.
    pub fn load(bytes: &[u8]) -> Result<Doc> {
        Ok(Doc {
            doc: AutoCommit::load(bytes)?,
        })
    }

    /// Zweig für Offline-Arbeit (neuer Actor).
    pub fn fork(&mut self) -> Doc {
        Doc {
            doc: self.doc.fork(),
        }
    }

    /// Führt einen anderen Zweig in diesen zusammen.
    pub fn merge(&mut self, other: &mut Doc) -> Result<()> {
        self.doc.merge(&mut other.doc)?;
        Ok(())
    }
}

/// Schlüssel eines Automerge-Objekts: Zähler und Actor-Index (günstiger als die vollständige ID).
type ObjKey = (u64, usize);
const ROOT_KEY: ObjKey = (0, usize::MAX);

fn obj_key(id: &ExId) -> ObjKey {
    match id {
        ExId::Root => ROOT_KEY,
        ExId::Id(counter, _, actor) => (*counter, *actor),
    }
}

/// Zelle beim Lesen: Wert oder untergeordnetes Objekt.
enum Cell {
    Val(Json),
    Child(ObjKey, ObjType),
}

fn cell_of(value: &ValueRef<'_>, id: &ExId) -> Cell {
    match value.clone().into_value() {
        Value::Scalar(s) => Cell::Val(scalar_to_json(&s)),
        Value::Object(t) => Cell::Child(obj_key(id), t),
    }
}

/// Setzt ein Objekt aus den gesammelten Zellen zusammen; leere Objekte kommen nicht in `objs` vor.
fn assemble(id: ObjKey, ty: ObjType, objs: &mut HashMap<ObjKey, Vec<(String, Cell)>>) -> Json {
    let cells = objs.remove(&id).unwrap_or_default();
    let resolve = |cell: Cell, objs: &mut HashMap<ObjKey, Vec<(String, Cell)>>| match cell {
        Cell::Val(v) => v,
        Cell::Child(child, t) => assemble(child, t, objs),
    };
    match ty {
        ObjType::List => Json::Array(cells.into_iter().map(|(_, c)| resolve(c, objs)).collect()),
        ObjType::Text => Json::String(String::new()),
        _ => Json::Object(
            cells
                .into_iter()
                .map(|(k, c)| (k, resolve(c, objs)))
                .collect(),
        ),
    }
}

/// Nimmt ein Element aus der Map und setzt seine Kinder ein; schon entnommene oder fehlende erscheinen als ID.
fn take_element(elems: &mut Map<String, Json>, id: &str, depth: usize) -> Result<Json> {
    if depth > MAX_DEPTH {
        return Err(Error::Model(format!("{id}: Untergraph zu tief")));
    }
    let Some(Json::Object(mut el)) = elems.remove(id) else {
        return Ok(Json::String(id.to_owned()));
    };
    el.insert("id".into(), Json::String(id.to_owned()));
    let ids = match el.remove("content") {
        Some(Json::Array(list)) => list,
        _ => Vec::new(),
    };
    let mut children = Vec::with_capacity(ids.len());
    for child in &ids {
        if let Some(child) = child.as_str() {
            children.push(take_element(elems, child, depth + 1)?);
        }
    }
    el.insert("content".into(), Json::Array(children));
    Ok(Json::Object(el))
}

fn str_value(s: &str) -> hydrate::Value {
    hydrate::Value::Scalar(ScalarValue::Str(s.into()))
}

fn json_to_hydrate(value: &Json) -> Result<hydrate::Value> {
    Ok(match value {
        Json::Object(m) => {
            let mut out = HashMap::with_capacity(m.len());
            for (k, v) in m {
                out.insert(k.clone(), json_to_hydrate(v)?);
            }
            hydrate::Value::from(hydrate::Map::from(out))
        }
        Json::Array(list) => {
            let items = list
                .iter()
                .map(json_to_hydrate)
                .collect::<Result<Vec<_>>>()?;
            hydrate::Value::from(hydrate::List::from(items))
        }
        scalar => hydrate::Value::Scalar(json_to_scalar(scalar)?),
    })
}

/// Baut Elemente (mit Untergraph) als Automerge-Bäume; Regeln für Zahlen gelten hier.
struct Builder<'a> {
    types: &'a TypeRegistry,
    /// Streng (Operation `create`): Verstöße lehnen ab. Nachsichtig (Import): Werte bleiben stehen.
    strict: bool,
    elems: HashMap<String, hydrate::Value>,
    dropped: Vec<Finding>,
    assumed: bool,
    missing: bool,
}

impl<'a> Builder<'a> {
    fn new(types: &'a TypeRegistry, strict: bool) -> Self {
        Builder {
            types,
            strict,
            elems: HashMap::new(),
            dropped: Vec::new(),
            assumed: false,
            missing: false,
        }
    }

    /// Baut ein Element samt Untergraph und gibt seine ID zurück; `None`, wenn es wegen einer doppelten ID
    /// verworfen wurde (nur nachsichtig). `exists` fragt IDs ab, die schon im Dokument stehen.
    fn build(&mut self, element: &Json, exists: &dyn Fn(&str) -> bool) -> Result<Option<String>> {
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
        if self.strict && !schema::is_valid_id(&id) {
            return Err(Error::InvalidId(format!("`{id}`")));
        }
        if self.elems.contains_key(&id) || exists(&id) {
            if self.strict {
                return Err(Error::DuplicateId(format!("`{id}`")));
            }
            self.dropped.push(Finding::error(
                &id,
                "",
                &id,
                "duplicate_id",
                format!("ID `{id}` kommt mehrfach vor; das zweite Element wurde verworfen"),
            ));
            return Ok(None);
        }
        let kind = e
            .get("type")
            .and_then(Json::as_str)
            .ok_or_else(|| Error::Json(format!("{id}: `type` fehlt")))?;
        let mut node: HashMap<String, hydrate::Value> = HashMap::with_capacity(6);
        node.insert("type".into(), str_value(kind));
        let mut assumed_names: Vec<String> = Vec::new();
        for field in MAP_FIELDS {
            let value = e.get(field).and_then(Json::as_object).ok_or_else(|| {
                Error::Json(format!("{id}: `{field}` fehlt oder ist kein Objekt"))
            })?;
            let mut map = HashMap::with_capacity(value.len() + 1);
            for (k, v) in value {
                if self.strict && !schema::is_valid_name(k) {
                    return Err(Error::InvalidName(format!("{id}.{field}.{k}")));
                }
                if field == "params" {
                    match schema::normalize_value(v, self.types.param(kind, k)) {
                        Ok(n) => {
                            self.missing |= n.missing;
                            if n.assumed {
                                self.assumed = true;
                                assumed_names.push(k.clone());
                            }
                            map.insert(k.clone(), json_to_hydrate(&n.value)?);
                        }
                        Err(err) if self.strict => return Err(err),
                        Err(_) => {
                            map.insert(k.clone(), json_to_hydrate(v)?);
                        }
                    }
                } else {
                    map.insert(k.clone(), json_to_hydrate(v)?);
                }
            }
            if field == "meta" && !assumed_names.is_empty() {
                assumed_names.sort();
                let names: Vec<hydrate::Value> =
                    assumed_names.iter().map(|n| str_value(n)).collect();
                map.insert(
                    META_ASSUMED.into(),
                    hydrate::Value::from(hydrate::List::from(names)),
                );
            }
            node.insert(field.into(), hydrate::Value::from(hydrate::Map::from(map)));
        }
        let children = e
            .get("content")
            .and_then(Json::as_array)
            .ok_or_else(|| Error::Json(format!("{id}: `content` fehlt oder ist keine Liste")))?;
        let mut content = Vec::with_capacity(children.len());
        for child in children {
            match child {
                Json::String(child_id) => content.push(str_value(child_id)),
                _ => {
                    if let Some(child_id) = self.build(child, exists)? {
                        content.push(str_value(&child_id));
                    }
                }
            }
        }
        node.insert(
            "content".into(),
            hydrate::Value::from(hydrate::List::from(content)),
        );
        self.elems
            .insert(id.clone(), hydrate::Value::from(hydrate::Map::from(node)));
        Ok(Some(id))
    }
}

/// `true`, wenn die Bytes wie ein gespeichertes Automerge-Dokument beginnen (Magic `85 6f 4a 83`).
pub fn looks_like_doc(bytes: &[u8]) -> bool {
    bytes.starts_with(&[0x85, 0x6f, 0x4a, 0x83])
}

/// SHA-256 über die kanonische Form (sortierte Schlüssel, kompakt), hex-kodiert.
pub fn content_hash(project: &Json) -> String {
    let digest = Sha256::digest(project.to_string().as_bytes());
    digest.iter().map(|b| format!("{b:02x}")).collect()
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

fn scalar_to_json(s: &ScalarValue) -> Json {
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

fn read_obj(doc: &AutoCommit, obj: &ObjId, kind: ObjType) -> Result<Json> {
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
    use serde_json::json;

    fn el(id: &str) -> Json {
        json!({"id": id, "type": "thing", "inputs": {}, "params": {}, "outputs": {"out": "thing"},
               "content": [], "meta": {"name": id}})
    }

    fn project(elements: Vec<Json>) -> Json {
        json!({"schema_version": 1, "elements": elements})
    }

    fn doc_of(elements: Vec<Json>) -> Doc {
        let reg = TypeRegistry::new();
        Doc::import(&project(elements), &reg, None)
            .map(|(d, _)| d)
            .unwrap_or_else(|_| unreachable_doc())
    }

    fn unreachable_doc() -> Doc {
        Doc {
            doc: AutoCommit::new(),
        }
    }

    #[test]
    fn roundtrip_through_save_and_load() {
        let reg = TypeRegistry::new();
        let mut d = doc_of(vec![el("a"), el("b")]);
        let op = Op::SetParam {
            id: "a".into(),
            param: "w".into(),
            value: json!({"value": 5, "unit": "mm"}),
        };
        assert!(d.apply(&op, &reg).is_ok());
        let bytes = d.save();
        assert!(looks_like_doc(&bytes));
        let loaded = Doc::load(&bytes);
        assert!(loaded.is_ok_and(|l| l.hash().ok() == d.hash().ok()));
    }

    #[test]
    fn hash_is_independent_of_actor() {
        let reg = TypeRegistry::new();
        let p = project(vec![el("a")]);
        let a = Doc::import(&p, &reg, Some(b"a")).map(|(d, _)| d.hash().ok());
        let b = Doc::import(&p, &reg, Some(b"b")).map(|(d, _)| d.hash().ok());
        assert!(a.is_ok() && a.ok() == b.ok());
    }

    #[test]
    fn rejected_operation_leaves_the_document_unchanged() {
        let reg = TypeRegistry::new();
        let mut d = doc_of(vec![el("a")]);
        let before = d.hash().ok();
        let bad = Op::SetParam {
            id: "a".into(),
            param: "w".into(),
            value: json!({"value": 1, "unit": "furlong"}),
        };
        assert!(matches!(d.apply(&bad, &reg), Err(Error::UnknownUnit(_))));
        let gone = Op::SetParam {
            id: "zzz".into(),
            param: "w".into(),
            value: json!(1),
        };
        assert!(matches!(
            d.apply(&gone, &reg),
            Err(Error::UnknownElement(_))
        ));
        assert_eq!(d.hash().ok(), before);
    }

    #[test]
    fn duplicate_ids_are_dropped_with_a_finding() {
        let reg = TypeRegistry::new();
        let r = Doc::import(&project(vec![el("a"), el("a")]), &reg, None);
        assert!(r.is_ok_and(|(d, f)| d.len().ok() == Some(1) && f.len() == 1));
    }

    #[test]
    fn create_and_remove_with_subgraph() {
        let reg = TypeRegistry::new();
        let mut d = doc_of(vec![]);
        let create = |id: &str, parent: Option<&str>| Op::Create {
            element: el(id),
            parent: parent.map(str::to_owned),
        };
        assert!(d.apply(&create("a", None), &reg).is_ok());
        assert!(d.apply(&create("b", Some("a")), &reg).is_ok());
        assert!(matches!(
            d.apply(&create("b", None), &reg),
            Err(Error::DuplicateId(_))
        ));
        assert!(matches!(
            d.apply(&create("bad id", None), &reg),
            Err(Error::InvalidId(_))
        ));
        assert!(d.apply(&Op::Remove { id: "a".into() }, &reg).is_ok());
        assert_eq!(d.len().ok(), Some(0));
    }

    #[test]
    fn shared_children_and_loose_elements_survive_export() {
        let reg = TypeRegistry::new();
        let mut holder = el("h");
        holder["content"] = json!(["c"]);
        let mut p = project(vec![el("c"), holder]);
        p["unattached"] = json!([el("o")]);
        let r = Doc::import(&p, &reg, None);
        assert!(r.is_ok_and(|(d, _)| d.export().ok() == Some(p.clone())));
    }

    #[test]
    fn merge_combines_both_branches() {
        let reg = TypeRegistry::new();
        let mut a = doc_of(vec![el("x"), el("y")]);
        let mut b = a.fork();
        let set = |id: &str| Op::SetParam {
            id: id.into(),
            param: "w".into(),
            value: json!({"value": 1, "unit": "mm"}),
        };
        assert!(a.apply(&set("x"), &reg).is_ok());
        assert!(b.apply(&set("y"), &reg).is_ok());
        let mut a2 = a.fork();
        assert!(a.merge(&mut b).is_ok());
        assert!(b.merge(&mut a2).is_ok());
        let mut a3 = a.fork();
        assert!(b.merge(&mut a3).is_ok());
        assert_eq!(a.hash().ok(), b.hash().ok());
    }

    #[test]
    fn assumed_marker_follows_the_value() {
        let mut reg = TypeRegistry::new();
        assert!(reg
            .register(&json!({"type": "t", "params": {"h": {"dimension": "length", "default_unit": "mm"}}}))
            .is_ok());
        let mut d = doc_of(vec![]);
        let mut e = el("a");
        e["type"] = json!("t");
        assert!(d
            .apply(
                &Op::Create {
                    element: e,
                    parent: None
                },
                &reg
            )
            .is_ok());
        let set = |v: Json| Op::SetParam {
            id: "a".into(),
            param: "h".into(),
            value: v,
        };
        let out = d.apply(&set(json!(5)), &reg);
        assert!(out.is_ok_and(|o| o.warnings == vec!["unit_assumed"]));
        assert!(d.validate(&reg).is_ok_and(|f| f.len() == 1));
        assert!(d
            .apply(&set(json!({"value": 5, "unit": "mm"})), &reg)
            .is_ok());
        assert!(d.validate(&reg).is_ok_and(|f| f.is_empty()));
    }
}
