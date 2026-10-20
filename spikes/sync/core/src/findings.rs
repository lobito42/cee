//! Befunde nach dem Zusammenführen (ADR-033: nichts wird still aufgelöst).
//!
//! - `conflict` und `broken_reference` kommen aus `datenmodell::conflicts::detect` (ap-01).
//! - `edit_on_removed`: Ein Zweig entfernt ein Element, ein anderer ändert gleichzeitig dessen Parameter
//!   oder Eingänge. Automerge lässt diese Änderungen aus dem sichtbaren Stand verschwinden. Der Befund holt
//!   sie aus der **Historie**: Alle Änderungen werden dekodiert; eine Änderung an einem Element zählt, wenn
//!   das Element jetzt fehlt und die Änderung kein Vorgänger der Entfernung ist (also gleichzeitig zu ihr
//!   lief). Das ist unabhängig davon, in welcher Reihenfolge die Zweige beim Server ankommen.
//!
//! Die volle Prüfung kostet Zeit proportional zur Historie; sie läuft nur auf Abruf, nie im Latenzpfad.

use std::collections::{HashMap, HashSet};

use automerge::legacy::{Key, OpType};
use automerge::{ChangeHash, ObjType, ScalarValue};
use datenmodell::conflicts::{self, Finding};
use datenmodell::{Result, Store};
use serde_json::{json, Number, Value as Json};

/// Alle Befunde als JSON-Liste.
pub fn all(store: &mut Store) -> Result<Json> {
    let mut out: Vec<Json> = conflicts::detect(store)?
        .into_iter()
        .map(|f| match f {
            Finding::Conflict {
                id,
                field,
                name,
                values,
            } => json!({"kind": "conflict", "id": id, "field": field, "name": name, "values": values}),
            Finding::ElementConflict { id } => json!({"kind": "element_conflict", "id": id}),
            Finding::BrokenReference { id, input, target } => {
                json!({"kind": "broken_reference", "id": id, "input": input, "target": target})
            }
        })
        .collect();
    out.extend(edits_on_removed(store)?);
    Ok(Json::Array(out))
}

/// Eine Änderung an einem Feld eines Elements, gelesen aus der Historie.
struct Edit {
    change: ChangeHash,
    element: String,
    field: String,
    name: String,
    value: Json,
}

/// Befunde `edit_on_removed` aus der Historie (siehe Moduldokumentation).
pub fn edits_on_removed(store: &mut Store) -> Result<Vec<Json>> {
    let present: HashSet<String> = store.ids()?.into_iter().collect();
    let changes = store.doc_mut().get_changes(&[]);

    let mut deps: HashMap<ChangeHash, Vec<ChangeHash>> = HashMap::new();
    // Objekt-IDs ("zähler@actor") → Bedeutung im Graphen.
    let mut elements_maps: HashSet<String> = HashSet::new();
    let mut element_of: HashMap<String, String> = HashMap::new();
    let mut field_of: HashMap<String, (String, String)> = HashMap::new();
    let mut deletions: HashMap<String, Vec<ChangeHash>> = HashMap::new();
    let mut edits: Vec<Edit> = Vec::new();

    // Changes kommen in kausaler Reihenfolge; ein Objekt entsteht also vor seiner ersten Verwendung.
    for change in &changes {
        let hash = change.hash();
        deps.insert(hash, change.deps().to_vec());
        let expanded = change.decode();
        let start = expanded.start_op.get();
        for (index, op) in expanded.operations.iter().enumerate() {
            let Key::Map(key) = &op.key else { continue };
            let obj = op.obj.to_string();
            let own_id = || format!("{}@{}", start + index as u64, expanded.actor_id);
            match &op.action {
                OpType::Make(ObjType::Map) if obj == "_root" && key == "elements" => {
                    elements_maps.insert(own_id());
                }
                OpType::Make(_) if elements_maps.contains(&obj) => {
                    element_of.insert(own_id(), key.to_string());
                }
                OpType::Make(_) if key == "params" || key == "inputs" => {
                    if let Some(element) = element_of.get(&obj) {
                        field_of.insert(own_id(), (element.clone(), key.to_string()));
                    }
                }
                OpType::Delete if elements_maps.contains(&obj) => {
                    deletions.entry(key.to_string()).or_default().push(hash);
                }
                OpType::Put(value) => {
                    if let Some((element, field)) = field_of.get(&obj) {
                        // Jede Änderung ist Kandidat; ob gleichzeitig zur Entfernung, klärt die
                        // Prüfung unten über die Vorgänger.
                        edits.push(Edit {
                            change: hash,
                            element: element.clone(),
                            field: field.clone(),
                            name: key.to_string(),
                            value: scalar_json(value),
                        });
                    }
                }
                _ => {}
            }
        }
    }

    let mut out = Vec::new();
    let mut removed: Vec<&String> = deletions
        .keys()
        .filter(|id| !present.contains(*id))
        .collect();
    removed.sort();
    for element in removed {
        let ancestors: Vec<HashSet<ChangeHash>> = deletions[element]
            .iter()
            .map(|d| ancestors_of(*d, &deps))
            .collect();
        let concurrent: Vec<Json> = edits
            .iter()
            .filter(|e| &e.element == element)
            .filter(|e| {
                deletions[element]
                    .iter()
                    .zip(&ancestors)
                    .any(|(d, anc)| e.change != *d && !anc.contains(&e.change))
            })
            .map(|e| json!({"field": e.field, "name": e.name, "value": e.value}))
            .collect();
        if !concurrent.is_empty() {
            out.push(json!({"kind": "edit_on_removed", "id": element, "edits": concurrent}));
        }
    }
    Ok(out)
}

/// Alle Vorgänger einer Änderung (ohne sie selbst).
fn ancestors_of(
    start: ChangeHash,
    deps: &HashMap<ChangeHash, Vec<ChangeHash>>,
) -> HashSet<ChangeHash> {
    let mut seen = HashSet::new();
    let mut stack: Vec<ChangeHash> = deps.get(&start).cloned().unwrap_or_default();
    while let Some(h) = stack.pop() {
        if seen.insert(h) {
            if let Some(d) = deps.get(&h) {
                stack.extend(d.iter().copied());
            }
        }
    }
    seen
}

fn scalar_json(value: &ScalarValue) -> Json {
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{Peer, SyncOp, SyncState};
    use datenmodell::synth;

    fn sync_all(a: &mut Peer, b: &mut Peer) {
        let (mut sa, mut sb) = (SyncState::new(), SyncState::new());
        for _ in 0..50 {
            let mut quiet = true;
            if let Some(m) = a.generate(&mut sa) {
                b.receive(&mut sb, &m).expect("b");
                quiet = false;
            }
            if let Some(m) = b.generate(&mut sb) {
                a.receive(&mut sa, &m).expect("a");
                quiet = false;
            }
            if quiet {
                return;
            }
        }
        panic!("Abgleich endet nicht");
    }

    fn set(id: &str, name: &str, v: i64) -> SyncOp {
        SyncOp::SetParam {
            id: id.into(),
            name: name.into(),
            value: json!(v),
        }
    }

    #[test]
    fn edits_on_removed_element_are_reported_in_both_orders() {
        let ids = synth::editable_ids(300);
        for removing_first in [true, false] {
            let mut server = Peer::synth(300).expect("server");
            let mut a = Peer::empty();
            let mut b = Peer::empty();
            sync_all(&mut server, &mut a);
            sync_all(&mut server, &mut b);
            // A ändert vorher selbst (kein Befund), entfernt dann; B ändert gleichzeitig zweimal.
            a.apply(&set(&ids[5], "length", 11)).expect("a");
            a.apply(&SyncOp::RemoveElement { id: ids[5].clone() })
                .expect("a");
            b.apply(&set(&ids[5], "length", 21)).expect("b");
            b.apply(&set(&ids[5], "length", 22)).expect("b");
            b.apply(&set(&ids[5], "height", 23)).expect("b");
            if removing_first {
                sync_all(&mut server, &mut a);
                sync_all(&mut server, &mut b);
            } else {
                sync_all(&mut server, &mut b);
                sync_all(&mut server, &mut a);
            }
            let found = server.findings().expect("befunde");
            let eor: Vec<&Json> = found
                .as_array()
                .expect("liste")
                .iter()
                .filter(|f| f["kind"] == "edit_on_removed")
                .collect();
            assert_eq!(eor.len(), 1, "{found}");
            assert_eq!(eor[0]["id"], json!(ids[5]));
            let values: Vec<i64> = eor[0]["edits"]
                .as_array()
                .expect("edits")
                .iter()
                .filter_map(|e| e["value"].as_i64())
                .collect();
            assert_eq!(values, vec![21, 22, 23], "{found}");
        }
    }

    #[test]
    fn plain_removal_is_no_finding() {
        let ids = synth::editable_ids(200);
        let mut server = Peer::synth(200).expect("server");
        server.apply(&set(&ids[1], "length", 5)).expect("setzen");
        server
            .apply(&SyncOp::RemoveElement { id: ids[1].clone() })
            .expect("entfernen");
        assert_eq!(server.findings().expect("befunde"), json!([]));
    }
}
