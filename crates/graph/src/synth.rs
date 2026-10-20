//! Deterministischer Generator für Projekte und Prüfkorpora (gleicher Seed, gleiche Ausgabe).
//!
//! Gültige Projekte bestehen aus Elementen mit Größen in kanonischen Einheiten und Eingängen auf
//! vorhandene Ausgänge; sie liefern bei der Prüfung 0 Befunde. Ein Korpus ergänzt je Code zehn Fälle mit
//! dem erwarteten Befund.

use serde_json::{json, Map, Value as Json};

use crate::schema::new_ulid;

/// Anzahl der Fälle je Code im Prüfkorpus.
pub const CASES_PER_CODE: usize = 10;

/// Einfacher, deterministischer Zufallsgenerator (SplitMix64).
#[derive(Debug, Clone)]
pub struct Rng(u64);

impl Rng {
    /// Neuer Generator aus einem Seed.
    pub fn new(seed: u64) -> Self {
        Rng(seed)
    }

    /// Nächste 64 Bit.
    pub fn next_u64(&mut self) -> u64 {
        self.0 = self.0.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.0;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }

    /// Gleichverteilt in `0..bound` (`bound` > 0, sonst 0).
    pub fn below(&mut self, bound: u64) -> u64 {
        if bound == 0 {
            0
        } else {
            self.next_u64() % bound
        }
    }
}

/// Erwarteter Befund eines Korpus-Falls.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Expected {
    /// Element-ID.
    pub element: String,
    /// Code.
    pub code: &'static str,
    /// `error` oder `warning`.
    pub severity: &'static str,
}

/// Prüfkorpus: Projekt, erwartete Befunde und die Typdefinitionen, die es braucht.
#[derive(Debug, Clone)]
pub struct Corpus {
    /// Projekt-JSON.
    pub project: Json,
    /// Erwartete Befunde.
    pub expected: Vec<Expected>,
    /// Typdefinitionen für die Prüfung.
    pub types: Json,
}

impl Corpus {
    /// JSON-Form: `{project, expected: [{element, code, severity}], types}`.
    pub fn to_json(&self) -> Json {
        let expected: Vec<Json> = self
            .expected
            .iter()
            .map(|e| json!({"element": e.element, "code": e.code, "severity": e.severity}))
            .collect();
        json!({"project": self.project, "expected": expected, "types": self.types})
    }
}

const BASE_TIME_MS: u64 = 1_700_000_000_000;

fn make_element(id: &str, rng: &mut Rng, link: Option<&str>) -> Map<String, Json> {
    let mut params = Map::new();
    for k in 0..(1 + rng.below(3)) {
        params.insert(
            format!("p{k}"),
            json!({"value": 1 + rng.below(10_000), "unit": "mm"}),
        );
    }
    let mut inputs = Map::new();
    if let Some(target) = link {
        inputs.insert("in".into(), json!(format!("{target}.out")));
    }
    let mut e = Map::new();
    e.insert("id".into(), json!(id));
    e.insert("type".into(), json!("thing"));
    e.insert("inputs".into(), Json::Object(inputs));
    e.insert("params".into(), Json::Object(params));
    e.insert("outputs".into(), json!({"out": "thing"}));
    e.insert("content".into(), json!([]));
    e.insert("meta".into(), json!({"name": id}));
    e
}

/// Gültiges Projekt mit `n` Elementen (Baum aus Untergraphen). Gibt Projekt und alle IDs zurück.
pub fn project_with_ids(n: usize, seed: u64) -> (Json, Vec<String>) {
    let mut rng = Rng::new(seed);
    let ids: Vec<String> = (0..n)
        .map(|i| {
            let random = (u128::from(rng.next_u64()) << 16) ^ u128::from(rng.next_u64());
            new_ulid(BASE_TIME_MS + i as u64, random)
        })
        .collect();
    let mut parent: Vec<Option<usize>> = Vec::with_capacity(n);
    for i in 0..n {
        parent.push(if i > 0 && rng.below(3) == 0 {
            Some(rng.below(i as u64) as usize)
        } else {
            None
        });
    }
    let mut elements: Vec<Map<String, Json>> = Vec::with_capacity(n);
    for (i, id) in ids.iter().enumerate() {
        let link = if i > 0 && rng.below(2) == 0 {
            ids.get(rng.below(i as u64) as usize).map(String::as_str)
        } else {
            None
        };
        elements.push(make_element(id, &mut rng, link));
    }
    // Von hinten nach vorn einhängen: Kinder haben immer einen größeren Index als ihr Elternteil.
    let mut slots: Vec<Option<Json>> = elements
        .into_iter()
        .map(|e| Some(Json::Object(e)))
        .collect();
    let mut kids: Vec<Vec<Json>> = vec![Vec::new(); n];
    let mut roots: Vec<Json> = Vec::new();
    for i in (0..n).rev() {
        let Some(Json::Object(mut e)) = slots.get_mut(i).and_then(Option::take) else {
            continue;
        };
        let mut mine = std::mem::take(&mut kids[i]);
        mine.reverse();
        e.insert("content".into(), Json::Array(mine));
        match parent[i] {
            Some(p) => kids[p].push(Json::Object(e)),
            None => roots.push(Json::Object(e)),
        }
    }
    roots.reverse();
    (json!({"schema_version": 1, "elements": roots}), ids)
}

/// Gültiges Projekt mit `n` Elementen.
pub fn project(n: usize, seed: u64) -> Json {
    project_with_ids(n, seed).0
}

fn case(id: &str, params: Json, inputs: Json, ty: &str) -> Json {
    json!({"id": id, "type": ty, "inputs": inputs, "params": params, "outputs": {"out": "thing"},
           "content": [], "meta": {"name": id}})
}

/// Welche Fälle ein Korpus enthält.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CorpusKind {
    /// Nur Fälle für Einheiten und Geld.
    Units,
    /// Alle Codes der Prüfung.
    Validate,
}

/// Prüfkorpus: ein gültiges Projekt mit `n` Elementen und je Code zehn Fällen.
pub fn corpus(n: usize, seed: u64, kind: CorpusKind) -> Corpus {
    let (mut proj, ids) = project_with_ids(n, seed);
    let mut expected: Vec<Expected> = Vec::new();
    let mut extra: Vec<Json> = Vec::new();
    let mut loose: Vec<Json> = Vec::new();
    let pick = |i: usize, stride: usize| -> String {
        ids.get((i * stride) % ids.len().max(1))
            .cloned()
            .unwrap_or_default()
    };
    let size = |v: i64, unit: &str| json!({"value": v, "unit": unit});
    let mut add = |code: &'static str, severity: &'static str, element: &str| {
        expected.push(Expected {
            element: element.to_owned(),
            code,
            severity,
        });
    };

    for i in 0..CASES_PER_CODE {
        if kind == CorpusKind::Validate {
            let id = format!("bad id {i}");
            extra.push(case(&id, json!({"p": size(1, "mm")}), json!({}), "thing"));
            add("invalid_id", "error", &id);

            let dup = pick(i, 7);
            extra.push(case(&dup, json!({"p": size(1, "mm")}), json!({}), "thing"));
            add("duplicate_id", "error", &dup);

            let id = format!("case-invalid_name-{i}");
            extra.push(case(
                &id,
                json!({"bad name": size(1, "mm")}),
                json!({}),
                "thing",
            ));
            add("invalid_name", "error", &id);

            let id = format!("case-missing_target-{i}");
            extra.push(case(
                &id,
                json!({}),
                json!({"in": format!("ghost-{i}.out")}),
                "thing",
            ));
            add("missing_target", "error", &id);

            let id = format!("case-missing_output-{i}");
            let target = pick(i, 11);
            extra.push(case(
                &id,
                json!({}),
                json!({"in": format!("{target}.nope")}),
                "thing",
            ));
            add("missing_output", "error", &id);

            let id = format!("case-orphan-{i}");
            loose.push(case(&id, json!({}), json!({}), "thing"));
            add("orphan", "error", &id);

            let child = format!("case-multiple_parents-child-{i}");
            let holder = format!("case-multiple_parents-holder-{i}");
            extra.push(case(&child, json!({}), json!({}), "thing"));
            let mut h = case(&holder, json!({}), json!({}), "thing");
            h["content"] = json!([child.clone()]);
            extra.push(h);
            add("multiple_parents", "error", &child);
        }

        let id = format!("case-unknown_unit-{i}");
        extra.push(case(
            &id,
            json!({"p": size(1, "furlong")}),
            json!({}),
            "thing",
        ));
        add("unknown_unit", "error", &id);

        let id = format!("case-dimension_mismatch-{i}");
        extra.push(case(&id, json!({"len": size(3, "kg")}), json!({}), "typed"));
        add("dimension_mismatch", "error", &id);

        let id = format!("case-non_canonical_unit-{i}");
        extra.push(case(&id, json!({"p": size(1, "m")}), json!({}), "thing"));
        add("non_canonical_unit", "error", &id);

        let id = format!("case-invalid_money-{i}");
        extra.push(case(
            &id,
            json!({"cost": {"amount": 12.5, "currency": "EUR"}}),
            json!({}),
            "thing",
        ));
        add("invalid_money", "error", &id);

        let id = format!("case-unit_missing-{i}");
        extra.push(case(&id, json!({"p": 5}), json!({}), "thing"));
        add("unit_missing", "warning", &id);

        let id = format!("case-unit_assumed-{i}");
        extra.push(case(&id, json!({"len": 5}), json!({}), "typed"));
        add("unit_assumed", "warning", &id);
    }

    if let Some(Json::Array(list)) = proj.get_mut("elements") {
        list.extend(extra);
    }
    if !loose.is_empty() {
        proj["unattached"] = Json::Array(loose);
    }
    let types = json!([{"type": "typed", "params": {"len": {"dimension": "length", "default_unit": "mm"}}}]);
    Corpus {
        project: proj,
        expected,
        types,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::TypeRegistry;
    use crate::validate::validate_project;
    use std::collections::HashSet;

    #[test]
    fn same_seed_same_project() {
        assert_eq!(project(200, 5), project(200, 5));
        assert_ne!(project(200, 5), project(200, 6));
    }

    #[test]
    fn project_has_n_elements_and_no_findings() {
        let (p, ids) = project_with_ids(500, 3);
        assert_eq!(ids.len(), 500);
        assert!(validate_project(&p, &TypeRegistry::new()).is_empty());
    }

    #[test]
    fn corpus_findings_match_expectations_exactly() {
        let c = corpus(300, 4, CorpusKind::Validate);
        let mut reg = TypeRegistry::new();
        assert!(reg.register_all(&c.types).is_empty());
        let found: HashSet<(String, &str, &str)> = validate_project(&c.project, &reg)
            .into_iter()
            .map(|f| (f.element, f.code, f.severity.as_str()))
            .collect();
        let want: HashSet<(String, &str, &str)> = c
            .expected
            .iter()
            .map(|e| (e.element.clone(), e.code, e.severity))
            .collect();
        assert_eq!(found, want);
        assert_eq!(c.expected.len(), 13 * CASES_PER_CODE);
    }
}
