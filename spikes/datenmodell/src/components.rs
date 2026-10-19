//! Komponenten, Varianten und Instanzen (ADR-043).
//!
//! Eine `component` trägt `params.parameters` (Name → `{default, …}`), `params.variants`
//! (Name → Parametersatz) und den Untergraphen in `content`. Eine `instance` speichert nur
//! `params.variant`, `params.overrides` und ihre gewählten Referenzen – nie eine Kopie.
//!
//! Aufgelöste Parameter einer Instanz = Vorgaben ⊕ Variante ⊕ Überschreibungen. Entfällt ein
//! überschriebener Parameter in der Definition, bleibt die Überschreibung gespeichert und wird als
//! Befund gemeldet; kommt der Parameter zurück, gilt sie wieder.

use std::collections::BTreeMap;

use serde_json::{json, Map, Value as Json};

use crate::synth::Rng;
use crate::{Error, Result, Store};

/// Definition einer Komponente, gelesen aus ihren Parametern.
#[derive(Debug, Clone, PartialEq, Default)]
pub struct Definition {
    pub defaults: BTreeMap<String, Json>,
    pub variants: BTreeMap<String, Map<String, Json>>,
}

impl Definition {
    pub fn from_params(params: &Json) -> Result<Definition> {
        let mut def = Definition::default();
        if let Some(p) = params.get("parameters").and_then(Json::as_object) {
            for (name, spec) in p {
                let default = spec.get("default").cloned().unwrap_or(Json::Null);
                def.defaults.insert(name.clone(), default);
            }
        }
        if let Some(v) = params.get("variants").and_then(Json::as_object) {
            for (name, set) in v {
                let set = set
                    .as_object()
                    .ok_or_else(|| Error::Model(format!("Variante `{name}` ist kein Objekt")))?;
                def.variants.insert(name.clone(), set.clone());
            }
        }
        Ok(def)
    }
}

/// Aufgelöste Parameter einer Instanz und Befunde.
#[derive(Debug, Clone, PartialEq, Default)]
pub struct Resolved {
    pub values: BTreeMap<String, Json>,
    pub findings: Vec<String>,
}

/// Löst die Parameter einer Instanz gegen eine Definition auf.
pub fn resolve(def: &Definition, instance_params: &Json) -> Resolved {
    let mut r = Resolved {
        values: def.defaults.clone(),
        findings: Vec::new(),
    };
    if let Some(name) = instance_params.get("variant").and_then(Json::as_str) {
        match def.variants.get(name) {
            Some(set) => {
                for (k, v) in set {
                    if r.values.contains_key(k) {
                        r.values.insert(k.clone(), v.clone());
                    } else {
                        r.findings.push(format!(
                            "Variante `{name}` setzt unbekannten Parameter `{k}`"
                        ));
                    }
                }
            }
            None => r.findings.push(format!("unbekannte Variante `{name}`")),
        }
    }
    if let Some(overrides) = instance_params.get("overrides").and_then(Json::as_object) {
        for (k, v) in overrides {
            if r.values.contains_key(k) {
                r.values.insert(k.clone(), v.clone());
            } else {
                r.findings
                    .push(format!("Überschreibung `{k}`: Parameter entfallen"));
            }
        }
    }
    r
}

/// IDs aller Instanzen einer Komponente (Eingang `definition` = `<id>.definition`).
pub fn instances_of(store: &Store, component: &str) -> Result<Vec<String>> {
    let target = Json::String(format!("{component}.definition"));
    let mut out = Vec::new();
    for id in store.ids()? {
        if store.field(&id, "inputs", "definition")?.as_ref() == Some(&target) {
            out.push(id);
        }
    }
    Ok(out)
}

/// Löst alle `instances` gegen die aktuelle Definition von `component` auf.
pub fn resolve_all(
    store: &Store,
    component: &str,
    instances: &[String],
) -> Result<Vec<(String, Resolved)>> {
    let def = Definition::from_params(&store.map_field(component, "params")?)?;
    instances
        .iter()
        .map(|id| Ok((id.clone(), resolve(&def, &store.map_field(id, "params")?))))
        .collect()
}

const PARAMS: [&str; 6] = ["breite", "laenge", "dicke", "abhaengehoehe", "x", "y"];

fn component_json() -> Json {
    let parameters: Map<String, Json> = PARAMS
        .iter()
        .enumerate()
        .map(|(i, p)| {
            (
                (*p).to_owned(),
                json!({"default": 100 * (i + 1), "unit": "mm"}),
            )
        })
        .collect();
    json!({
        "id": "komponente", "type": "component", "inputs": {},
        "params": {
            "parameters": parameters,
            "variants": {
                "klein": {"breite": 600, "laenge": 1200},
                "mittel": {"breite": 1200, "laenge": 1200},
                "gross": {"breite": 1200, "laenge": 2400}
            }
        },
        "outputs": {"definition": "component"},
        "content": [{
            "id": "komponente-koerper", "type": "body", "inputs": {}, "params": {"dicke": {"parameter": "dicke"}},
            "outputs": {"solid": "solid"}, "content": [], "meta": {}
        }],
        "meta": {"name": "Komponente"}
    })
}

/// Projekt mit einer Komponente und `instances` Instanzen (zufällige Varianten und Überschreibungen).
pub fn library_project(instances: usize, seed: u64) -> Json {
    let mut rng = Rng::new(seed);
    let variants = ["klein", "mittel", "gross"];
    let mut elements = vec![component_json()];
    for i in 0..instances {
        let mut overrides = Map::new();
        for p in PARAMS {
            if rng.below(3) == 0 {
                overrides.insert(p.to_owned(), Json::from(rng.below(5000) as i64));
            }
        }
        elements.push(json!({
            "id": format!("instanz-{i:05}"), "type": "instance",
            "inputs": {"definition": "komponente.definition"},
            "params": {"variant": variants[rng.below(variants.len())], "overrides": overrides},
            "outputs": {"solid": "solid"}, "content": [], "meta": {}
        }));
    }
    json!({"schema_version": 1, "elements": elements})
}

/// Eine zufällige Änderung der Definition (Vorgabe, Variante, Parameter hinzu oder weg).
pub fn random_definition_change(store: &mut Store, rng: &mut Rng, k: usize) -> Result<()> {
    let params = store.map_field("komponente", "params")?;
    let mut parameters = params
        .get("parameters")
        .and_then(Json::as_object)
        .cloned()
        .unwrap_or_default();
    let mut variants = params
        .get("variants")
        .and_then(Json::as_object)
        .cloned()
        .unwrap_or_default();
    let pool: Vec<String> = PARAMS
        .iter()
        .map(|p| (*p).to_owned())
        .chain((0..4).map(|i| format!("neu{i}")))
        .collect();
    let name = pool[rng.below(pool.len())].clone();
    match rng.below(5) {
        0 => {
            parameters.insert(name, json!({"default": k as i64, "unit": "mm"}));
        }
        1 => {
            let keys: Vec<String> = variants.keys().cloned().collect();
            if let Some(v) = keys.get(rng.below(keys.len())) {
                if let Some(Json::Object(set)) = variants.get_mut(v) {
                    set.insert(name, Json::from(k as i64));
                }
            }
        }
        2 => {
            variants.insert(format!("variante{k}"), json!({ name: k as i64 }));
        }
        3 => {
            parameters.remove(&name);
        }
        _ => {
            if let Some(Json::Object(spec)) = parameters.get_mut(&name) {
                spec.insert("default".into(), Json::from(k as i64 + 1));
            }
        }
    }
    store.set_param("komponente", "parameters", &Json::Object(parameters))?;
    store.set_param("komponente", "variants", &Json::Object(variants))
}

/// Ergebnis der Überschreibungs-Simulation.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct OverrideCheck {
    pub total: usize,
    pub kept: usize,
}

/// `changes` zufällige Definitionsänderungen; nach jeder wird geprüft, ob jede gespeicherte
/// Überschreibung unverändert ist und entweder gilt oder (bei entfallenem Parameter) gemeldet wird.
pub fn simulate_overrides(instances: usize, changes: usize, seed: u64) -> Result<OverrideCheck> {
    let mut store = Store::from_project(&library_project(instances, seed))?;
    let ids = instances_of(&store, "komponente")?;
    let original: Vec<Json> = ids
        .iter()
        .map(|id| {
            store
                .field(id, "params", "overrides")
                .map(Option::unwrap_or_default)
        })
        .collect::<Result<_>>()?;
    let mut rng = Rng::new(seed ^ 0xDEF);
    let mut check = OverrideCheck { total: 0, kept: 0 };
    for k in 0..changes {
        random_definition_change(&mut store, &mut rng, k)?;
        for ((id, resolved), before) in resolve_all(&store, "komponente", &ids)?
            .into_iter()
            .zip(&original)
        {
            let stored = store.field(&id, "params", "overrides")?.unwrap_or_default();
            for (name, value) in before.as_object().into_iter().flatten() {
                check.total += 1;
                let unchanged = stored.get(name) == Some(value);
                let effective = resolved.values.get(name) == Some(value);
                let reported = !resolved.values.contains_key(name)
                    && resolved
                        .findings
                        .iter()
                        .any(|f| f.contains(&format!("`{name}`")));
                if unchanged && (effective || reported) {
                    check.kept += 1;
                }
            }
        }
    }
    Ok(check)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn resolve_applies_defaults_variant_overrides() {
        let def = Definition::from_params(&json!({
            "parameters": {"a": {"default": 1}, "b": {"default": 2}, "c": {"default": 3}},
            "variants": {"v": {"b": 20}}
        }))
        .expect("def");
        let r = resolve(
            &def,
            &json!({"variant": "v", "overrides": {"c": 30, "weg": 1}}),
        );
        assert_eq!(r.values["a"], json!(1));
        assert_eq!(r.values["b"], json!(20));
        assert_eq!(r.values["c"], json!(30));
        assert_eq!(r.findings.len(), 1, "entfallener Parameter wird gemeldet");
    }

    #[test]
    fn example_instances_resolve() {
        let project: Json =
            serde_json::from_str(include_str!("../../../format/examples/raum.json")).expect("ok");
        let store = Store::from_project(&project).expect("aufbauen");
        let ids = instances_of(&store, "deckensegel").expect("instanzen");
        assert_eq!(ids.len(), 3);
        let resolved = resolve_all(&store, "deckensegel", &ids).expect("auflösen");
        let segel3 = &resolved
            .iter()
            .find(|(id, _)| id == "segel-3")
            .expect("segel-3")
            .1;
        assert_eq!(segel3.values["abhaengehoehe"], json!(450));
        assert_eq!(segel3.values["breite"], json!(1200));
        assert!(segel3.findings.is_empty());
    }

    #[test]
    fn overrides_survive_random_changes() {
        let check = simulate_overrides(30, 40, 3).expect("simulieren");
        assert!(check.total > 0);
        assert_eq!(check.kept, check.total);
    }
}
