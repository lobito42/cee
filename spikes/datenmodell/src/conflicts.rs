//! Semantische Konflikte nach dem Zusammenführen zweier Zweige.
//!
//! Automerge führt jede Änderung konfliktfrei zusammen; inhaltlich kann das Ergebnis trotzdem falsch sein.
//! Der Prototyp erkennt zwei Arten, die für den Nutzer sichtbar werden müssen (ADR-033):
//!
//! - **gleicher Eintrag, verschiedene Werte**: beide Zweige setzen denselben Parameter (oder Eingang)
//!   unterschiedlich. Automerge behält beide Werte (`get_all`), zeigt aber nur einen.
//! - **gebrochene Referenz**: ein Eingang zeigt auf `<id>.<output>`, den es nach dem Merge nicht mehr gibt
//!   (z. B. ein Zweig entfernt das Element, der andere verweist neu darauf).

use std::collections::BTreeSet;

use automerge::{ReadDoc, Value};
use serde_json::Value as Json;

use crate::synth::Rng;
use crate::{read_obj, scalar_to_json, Error, Result, Store};

/// Befund nach dem Zusammenführen.
#[derive(Debug, Clone, PartialEq)]
pub enum Finding {
    /// Derselbe Eintrag wurde in beiden Zweigen unterschiedlich gesetzt.
    Conflict {
        id: String,
        field: String,
        name: String,
        values: Vec<Json>,
    },
    /// Dasselbe Element wurde in beiden Zweigen neu angelegt.
    ElementConflict { id: String },
    /// Ein Eingang verweist auf einen Ausgang, den es nicht gibt.
    BrokenReference {
        id: String,
        input: String,
        target: String,
    },
}

fn values_of(store: &Store, map: &automerge::ObjId, key: &str) -> Result<Vec<Json>> {
    let doc = store.doc();
    let mut out = Vec::new();
    for (value, obj) in doc.get_all(map, key)? {
        let v = match value {
            Value::Scalar(s) => scalar_to_json(&s),
            Value::Object(t) => read_obj(doc, &obj, t)?,
        };
        if !out.contains(&v) {
            out.push(v);
        }
    }
    Ok(out)
}

/// Prüft das ganze Dokument auf semantische Konflikte.
pub fn detect(store: &Store) -> Result<Vec<Finding>> {
    let doc = store.doc();
    let elems = store.elements_obj()?;
    let ids: Vec<String> = doc.keys(&elems).collect();
    let mut findings = Vec::new();
    let mut outputs = BTreeSet::new();
    let mut inputs = Vec::new();
    for id in &ids {
        if doc.get_all(&elems, id.as_str())?.len() > 1 {
            findings.push(Finding::ElementConflict { id: id.clone() });
        }
        let obj = match doc.get(&elems, id.as_str())? {
            Some((Value::Object(_), o)) => o,
            _ => return Err(Error::Model(format!("{id}: kein Objekt"))),
        };
        for field in ["inputs", "params"] {
            let map = store.sub_obj(&obj, field)?;
            for name in doc.keys(&map) {
                let values = values_of(store, &map, &name)?;
                if values.len() > 1 {
                    findings.push(Finding::Conflict {
                        id: id.clone(),
                        field: field.into(),
                        name: name.clone(),
                        values,
                    });
                }
                if field == "inputs" {
                    if let Some(Json::String(target)) = store.field(id, "inputs", &name)? {
                        inputs.push((id.clone(), name, target));
                    }
                }
            }
        }
        let outs = store.sub_obj(&obj, "outputs")?;
        for name in doc.keys(&outs) {
            outputs.insert(format!("{id}.{name}"));
        }
    }
    for (id, input, target) in inputs {
        if !outputs.contains(&target) {
            findings.push(Finding::BrokenReference { id, input, target });
        }
    }
    Ok(findings)
}

/// Ergebnis der Konfliktsimulation.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Simulation {
    pub cases: usize,
    pub detected: usize,
}

impl Simulation {
    pub fn percent(&self) -> f64 {
        if self.cases == 0 {
            return 0.0;
        }
        100.0 * self.detected as f64 / self.cases as f64
    }
}

fn subtree(project: &Json, root: &str) -> BTreeSet<String> {
    fn walk(elements: &[Json], inside: bool, root: &str, out: &mut BTreeSet<String>) {
        for e in elements {
            let id = e["id"].as_str().unwrap_or_default();
            let now = inside || id == root;
            if now {
                out.insert(id.to_owned());
            }
            walk(
                e["content"].as_array().map_or(&[][..], |v| v),
                now,
                root,
                out,
            );
        }
    }
    let mut out = BTreeSet::new();
    walk(
        project["elements"].as_array().map_or(&[][..], |v| v),
        false,
        root,
        &mut out,
    );
    out
}

/// Erzeugt `cases` Konfliktfälle auf `project` (abwechselnd gleicher Parameter und gebrochene Referenz),
/// führt die Zweige zusammen und zählt, wie viele der erwarteten Konflikte erkannt werden.
pub fn simulate(project: &Json, cases: usize, seed: u64) -> Result<Simulation> {
    let mut base = Store::from_project_with_actor(project, Some(b"base"))?;
    let ids = base.ids()?;
    let with_outputs: Vec<String> = ids
        .iter()
        .filter(|id| matches!(store_outputs(&base, id), Ok(ref o) if !o.is_empty()))
        .cloned()
        .collect();
    if ids.len() < 2 || with_outputs.is_empty() {
        return Err(Error::Model("Projekt zu klein für die Simulation".into()));
    }
    let mut rng = Rng::new(seed);
    let mut detected = 0;
    for k in 0..cases {
        let mut a = base.fork_with_actor(format!("a{k}").as_bytes());
        let mut b = base.fork_with_actor(format!("b{k}").as_bytes());
        let expected = if k % 2 == 0 {
            let id = ids[rng.below(ids.len())].clone();
            let params = base.map_field(&id, "params")?;
            let keys: Vec<&String> = params
                .as_object()
                .map(|m| m.keys().collect())
                .unwrap_or_default();
            let name = if keys.is_empty() || rng.below(4) == 0 {
                "pruefwert".to_owned()
            } else {
                keys[rng.below(keys.len())].clone()
            };
            a.set_param(&id, &name, &Json::from(1000 + k as i64))?;
            b.set_param(&id, &name, &Json::from(2000 + k as i64))?;
            Finding::Conflict {
                id,
                field: "params".into(),
                name,
                values: Vec::new(),
            }
        } else {
            let target = with_outputs[rng.below(with_outputs.len())].clone();
            let gone = subtree(project, &target);
            let survivors: Vec<&String> = ids.iter().filter(|i| !gone.contains(*i)).collect();
            if survivors.is_empty() {
                return Err(Error::Model("kein überlebendes Element".into()));
            }
            let holder = survivors[rng.below(survivors.len())].clone();
            let output = store_outputs(&base, &target)?
                .into_iter()
                .next()
                .ok_or_else(|| Error::Model(format!("{target}: keine Ausgänge")))?;
            let input = format!("link_{k}");
            a.remove_element(&target)?;
            b.set_input(&holder, &input, &format!("{target}.{output}"))?;
            Finding::BrokenReference {
                id: holder,
                input,
                target: format!("{target}.{output}"),
            }
        };
        a.merge(&mut b)?;
        let findings = detect(&a)?;
        let hit = findings.iter().any(|f| match (f, &expected) {
            (
                Finding::Conflict {
                    id,
                    field,
                    name,
                    values,
                },
                Finding::Conflict {
                    id: eid,
                    field: efield,
                    name: ename,
                    ..
                },
            ) => id == eid && field == efield && name == ename && values.len() == 2,
            (Finding::BrokenReference { .. }, Finding::BrokenReference { .. }) => f == &expected,
            _ => false,
        });
        if hit {
            detected += 1;
        }
    }
    Ok(Simulation { cases, detected })
}

fn store_outputs(store: &Store, id: &str) -> Result<Vec<String>> {
    Ok(store
        .map_field(id, "outputs")?
        .as_object()
        .map(|m| m.keys().cloned().collect())
        .unwrap_or_default())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn example() -> Json {
        serde_json::from_str(include_str!("../../../format/examples/raum.json")).expect("Beispiel")
    }

    #[test]
    fn clean_example_has_no_findings() {
        let store = Store::from_project(&example()).expect("aufbauen");
        assert_eq!(detect(&store).expect("prüfen"), Vec::new());
    }

    #[test]
    fn concurrent_param_edit_is_a_conflict() {
        let mut base = Store::from_project(&example()).expect("aufbauen");
        let mut a = base.fork();
        let mut b = base.fork();
        a.set_param("decke", "thickness", &Json::from(30))
            .expect("a");
        b.set_param("decke", "thickness", &Json::from(40))
            .expect("b");
        a.merge(&mut b).expect("merge");
        let findings = detect(&a).expect("prüfen");
        assert!(
            matches!(&findings[..], [Finding::Conflict { id, name, .. }] if id == "decke" && name == "thickness")
        );
    }

    #[test]
    fn same_value_on_both_sides_is_no_conflict() {
        let mut base = Store::from_project(&example()).expect("aufbauen");
        let mut a = base.fork();
        let mut b = base.fork();
        a.set_param("decke", "thickness", &Json::from(30))
            .expect("a");
        b.set_param("decke", "thickness", &Json::from(30))
            .expect("b");
        a.merge(&mut b).expect("merge");
        assert_eq!(detect(&a).expect("prüfen"), Vec::new());
    }

    #[test]
    fn simulation_detects_all() {
        let sim = simulate(&example(), 20, 7).expect("simulieren");
        assert_eq!(sim.detected, sim.cases);
    }
}
