//! Schnelle kanonische Projektion: dasselbe Projekt-JSON wie `Store::to_project` aus ap-01, aber in einem
//! Durchgang über `hydrate` statt Einzelzugriffen je Element.
//!
//! Gemessen im Spike: `to_project` + Hash kostet bei 10.000 Elementen rund 0,7 s nativ und 1,1 s in WASM,
//! weil jedes Element einzeln nachgeschlagen wird. Der Hash muss nach jeder Runde bei beiden Clients und
//! dem Server gerechnet werden; die Ausgabe ist bitgleich zu ap-01 (Test unten), der Hash damit auch.

use automerge::hydrate::{Map as HMap, Value as HValue};
use automerge::{ReadDoc, ScalarValue, ROOT};
use datenmodell::{content_hash, Error, Result, Store};
use serde_json::{Map, Number, Value as Json};

const MAP_FIELDS: [&str; 4] = ["inputs", "params", "outputs", "meta"];

fn scalar(value: &ScalarValue) -> Json {
    match value {
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

fn map_json(m: &HMap) -> Map<String, Json> {
    m.iter()
        .map(|(k, v)| (k.clone(), to_json(&v.value)))
        .collect()
}

fn to_json(value: &HValue) -> Json {
    match value {
        HValue::Scalar(s) => scalar(s),
        HValue::Map(m) => Json::Object(map_json(m)),
        HValue::List(l) => Json::Array(l.iter().map(|v| to_json(&v.value)).collect()),
        HValue::Text(t) => Json::String(t.to_string()),
    }
}

fn map<'a>(parent: &'a HMap, key: &str) -> Result<&'a HMap> {
    match parent.get(key) {
        Some(HValue::Map(m)) => Ok(m),
        Some(_) => Err(Error::Model(format!("`{key}` ist kein Objekt"))),
        None => Err(Error::Model(format!("`{key}` fehlt"))),
    }
}

fn id_list(value: Option<&HValue>, key: &str) -> Result<Vec<String>> {
    let Some(HValue::List(list)) = value else {
        return Err(Error::Model(format!("`{key}` fehlt")));
    };
    list.iter()
        .map(|item| match &item.value {
            HValue::Scalar(ScalarValue::Str(id)) => Ok(id.to_string()),
            other => Err(Error::Model(format!("ID-Liste enthält {other:?}"))),
        })
        .collect()
}

fn element(elems: &HMap, id: &str, depth: usize) -> Result<Json> {
    if depth > 256 {
        return Err(Error::Model(format!(
            "{id}: Untergraph zu tief oder zyklisch"
        )));
    }
    let obj = match elems.get(id) {
        Some(HValue::Map(m)) => m,
        Some(_) => return Err(Error::Model(format!("`{id}` ist kein Objekt"))),
        None => return Err(Error::Model(format!("Element `{id}` fehlt"))),
    };
    let mut e = Map::new();
    e.insert("id".into(), Json::String(id.to_owned()));
    let kind = match obj.get("type") {
        Some(HValue::Scalar(s)) => scalar(s),
        _ => Json::Null,
    };
    e.insert("type".into(), kind);
    for field in MAP_FIELDS {
        e.insert(field.into(), Json::Object(map_json(map(obj, field)?)));
    }
    let mut children = Vec::new();
    for child in id_list(obj.get("content"), "content")? {
        children.push(element(elems, &child, depth + 1)?);
    }
    e.insert("content".into(), Json::Array(children));
    Ok(Json::Object(e))
}

/// Projekt-JSON wie `Store::to_project` (ap-01), in einem Durchgang.
pub fn to_project(store: &Store) -> Result<Json> {
    let root = match store.doc().hydrate(ROOT, None)? {
        HValue::Map(m) => m,
        _ => return Err(Error::Model("Wurzel ist kein Objekt".into())),
    };
    let mut out = map_json(map(&root, "project")?);
    let elems = map(&root, "elements")?;
    let mut list = Vec::new();
    for id in id_list(root.get("roots"), "roots")? {
        list.push(element(elems, &id, 0)?);
    }
    out.insert("elements".into(), Json::Array(list));
    Ok(Json::Object(out))
}

/// Inhalts-Hash wie `Store::hash` (ap-01).
pub fn hash(store: &Store) -> Result<String> {
    Ok(content_hash(&to_project(store)?))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{plan, Peer, SyncOp};

    /// Zeitaufteilung für den Bericht: `cargo test --release -p sync_core -- --ignored --nocapture`.
    #[test]
    #[ignore]
    fn timing_10k() {
        use std::time::Instant;
        let store = Store::from_project(&datenmodell::synth::project(10_000)).expect("aufbauen");
        let t = Instant::now();
        let h = store.doc().hydrate(ROOT, None).expect("hydrate");
        let t_hydrate = t.elapsed();
        drop(h);
        let t = Instant::now();
        let p = to_project(&store).expect("projekt");
        let t_project = t.elapsed();
        let t = Instant::now();
        let text = datenmodell::canonical_compact(&p);
        let t_text = t.elapsed();
        let t = Instant::now();
        let _ = content_hash(&p);
        let t_hash = t.elapsed();
        let t = Instant::now();
        let _ = store.to_project().expect("ap-01");
        let t_ap01 = t.elapsed();
        println!(
            "hydrate {t_hydrate:?}, to_project {t_project:?}, text {t_text:?} ({} B), hash {t_hash:?}, ap-01 to_project {t_ap01:?}",
            text.len()
        );
    }

    #[test]
    fn same_output_as_ap01_after_edits_merge_and_removal() {
        let p = plan::offline(1500, 60, 3, true).expect("plan");
        let mut base = Store::from_project(&datenmodell::synth::project(1500)).expect("base");
        let mut a = base.fork();
        let mut b = base.fork();
        let mut pa = Peer::from_store(a.fork());
        let mut pb = Peer::from_store(b.fork());
        p.a.iter().for_each(|o| pa.apply(o).expect("a"));
        p.b.iter().for_each(|o| pb.apply(o).expect("b"));
        pa.apply(&SyncOp::SetParam {
            id: "e000000".into(),
            name: "text".into(),
            value: serde_json::json!({"liste": [1, "zwei", null, 2.5], "wahr": true}),
        })
        .expect("objekt");
        a = pa.into_store();
        b = pb.into_store();
        a.merge(&mut b).expect("merge");
        for store in [&base, &a] {
            assert_eq!(
                to_project(store).expect("schnell"),
                store.to_project().expect("ap-01")
            );
            assert_eq!(hash(store).expect("schnell"), store.hash().expect("ap-01"));
        }
        base.set_param("e000001", "density", &serde_json::json!(1.25))
            .expect("setzen");
        assert_eq!(hash(&base).expect("schnell"), base.hash().expect("ap-01"));
    }
}
