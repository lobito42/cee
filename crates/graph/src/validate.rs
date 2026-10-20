//! Prüfung mit Befunden (ADR-050).
//!
//! Eine Prüfung ist rein lesend, liefert alle Befunde auf einmal und bricht nie beim ersten Fehler ab.
//! Befunde betreffen nur das fehlerhafte Element; alle anderen bleiben les- und änderbar.
//!
//! Eingabe ist ein Projekt-JSON. Im Unterschied zum strengen Schema sind zugelassen: ein Eintrag in
//! `content` oder `elements` als ID-Zeichenkette (Verweis auf ein anderswo definiertes Element) und die
//! Liste `unattached` mit Elementen, die von keiner Wurzel erreicht werden.

use std::collections::HashMap;

use serde_json::{Map, Value as Json};

use crate::schema::{self, Kind, META_ASSUMED};
use crate::types::{ParamType, TypeRegistry};
use crate::units;

/// Schwere eines Befunds.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Severity {
    /// Fehler: der Wert oder die Struktur ist unzulässig.
    Error,
    /// Warnung: sperrt nichts.
    Warning,
}

impl Severity {
    /// `error` oder `warning`.
    pub fn as_str(self) -> &'static str {
        match self {
            Severity::Error => "error",
            Severity::Warning => "warning",
        }
    }
}

/// Befund: Element, Feld, Name, Code, Schwere, Text.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Finding {
    /// ID des betroffenen Elements.
    pub element: String,
    /// Feld im Element (Name des Parameters, Eingangs, Ausgangs oder `content`), sonst leer.
    pub field: String,
    /// Anzeigename des Elements (`meta.name`, sonst die ID).
    pub name: String,
    /// Stabiler Code, z. B. `missing_target`.
    pub code: &'static str,
    /// Schwere.
    pub severity: Severity,
    /// Erklärung für Menschen.
    pub message: String,
}

impl Finding {
    /// Befund der Schwere Fehler.
    pub fn error(
        element: &str,
        field: &str,
        name: &str,
        code: &'static str,
        message: String,
    ) -> Self {
        Self::new(Severity::Error, element, field, name, code, message)
    }

    /// Befund der Schwere Warnung.
    pub fn warning(
        element: &str,
        field: &str,
        name: &str,
        code: &'static str,
        message: String,
    ) -> Self {
        Self::new(Severity::Warning, element, field, name, code, message)
    }

    fn new(
        severity: Severity,
        element: &str,
        field: &str,
        name: &str,
        code: &'static str,
        message: String,
    ) -> Self {
        Finding {
            element: element.to_owned(),
            field: field.to_owned(),
            name: name.to_owned(),
            code,
            severity,
            message,
        }
    }

    /// JSON-Form: `{element, field, name, code, severity, message}`.
    pub fn to_json(&self) -> Json {
        let mut m = Map::new();
        m.insert("element".into(), Json::String(self.element.clone()));
        m.insert("field".into(), Json::String(self.field.clone()));
        m.insert("name".into(), Json::String(self.name.clone()));
        m.insert("code".into(), Json::String(self.code.to_owned()));
        m.insert(
            "severity".into(),
            Json::String(self.severity.as_str().to_owned()),
        );
        m.insert("message".into(), Json::String(self.message.clone()));
        Json::Object(m)
    }
}

/// Zustand während der Prüfung eines Projekts.
struct Walk<'a> {
    defs: HashMap<&'a str, &'a Map<String, Json>>,
    order: Vec<&'a str>,
    parents: HashMap<&'a str, u32>,
    /// Verweise per ID-Zeichenkette: (Besitzer oder `None` auf oberster Ebene, Ziel).
    refs: Vec<(Option<&'a str>, &'a str)>,
    findings: Vec<Finding>,
}

const MAX_DEPTH: usize = 512;

impl<'a> Walk<'a> {
    fn visit(&mut self, items: &'a [Json], owner: Option<&'a str>, counts: bool, depth: usize) {
        for item in items {
            match item {
                Json::String(target) => {
                    self.refs.push((owner, target.as_str()));
                    if counts {
                        *self.parents.entry(target.as_str()).or_insert(0) += 1;
                    }
                }
                Json::Object(obj) => {
                    let Some(id) = obj.get("id").and_then(Json::as_str) else {
                        self.findings.push(Finding::error(
                            "",
                            "id",
                            "",
                            "invalid_id",
                            "Element ohne `id`".into(),
                        ));
                        continue;
                    };
                    if self.defs.contains_key(id) {
                        let name = display_name(obj, id);
                        self.findings.push(Finding::error(
                            id,
                            "",
                            &name,
                            "duplicate_id",
                            format!("ID `{id}` kommt mehrfach vor"),
                        ));
                        continue;
                    }
                    self.defs.insert(id, obj);
                    self.order.push(id);
                    if counts {
                        *self.parents.entry(id).or_insert(0) += 1;
                    }
                    if depth < MAX_DEPTH {
                        if let Some(children) = obj.get("content").and_then(Json::as_array) {
                            self.visit(children, Some(id), true, depth + 1);
                        }
                    }
                }
                _ => {}
            }
        }
    }
}

fn display_name(obj: &Map<String, Json>, id: &str) -> String {
    obj.get("meta")
        .and_then(|m| m.get("name"))
        .and_then(Json::as_str)
        .unwrap_or(id)
        .to_owned()
}

/// Prüft ein Projekt-JSON und liefert alle Befunde.
pub fn validate_project(project: &Json, types: &TypeRegistry) -> Vec<Finding> {
    let mut w = Walk {
        defs: HashMap::new(),
        order: Vec::new(),
        parents: HashMap::new(),
        refs: Vec::new(),
        findings: Vec::new(),
    };
    if let Some(list) = project.get("elements").and_then(Json::as_array) {
        w.visit(list, None, true, 0);
    }
    if let Some(list) = project.get("unattached").and_then(Json::as_array) {
        w.visit(list, None, false, 0);
    }

    // Struktur: Eltern, Verweise.
    for i in 0..w.order.len() {
        let id = w.order[i];
        let n = w.parents.get(id).copied().unwrap_or(0);
        let Some(obj) = w.defs.get(id).copied() else {
            continue;
        };
        if n > 1 {
            w.findings.push(Finding::error(
                id,
                "",
                &display_name(obj, id),
                "multiple_parents",
                format!("Element `{id}` hat {n} Eltern"),
            ));
        } else if n == 0 {
            w.findings.push(Finding::error(
                id,
                "",
                &display_name(obj, id),
                "orphan",
                format!("Element `{id}` hängt an keiner Wurzel"),
            ));
        }
    }
    let dangling: Vec<(Option<&str>, &str)> = w
        .refs
        .iter()
        .filter(|(_, target)| !w.defs.contains_key(target))
        .copied()
        .collect();
    for (owner, target) in dangling {
        let element = owner.unwrap_or(target);
        let name = owner
            .and_then(|o| w.defs.get(o).map(|obj| display_name(obj, o)))
            .unwrap_or_else(|| element.to_owned());
        w.findings.push(Finding::error(
            element,
            "content",
            &name,
            "missing_target",
            format!("Verweis auf unbekanntes Element `{target}`"),
        ));
    }

    // Je Element.
    for i in 0..w.order.len() {
        let id = w.order[i];
        if let Some(obj) = w.defs.get(id).copied() {
            check_element(id, obj, &w.defs, types, &mut w.findings);
        }
    }
    w.findings
}

fn check_element<'a>(
    id: &str,
    obj: &'a Map<String, Json>,
    defs: &HashMap<&'a str, &'a Map<String, Json>>,
    types: &TypeRegistry,
    out: &mut Vec<Finding>,
) {
    let name = display_name(obj, id);
    if !schema::is_valid_id(id) {
        out.push(Finding::error(
            id,
            "id",
            &name,
            "invalid_id",
            format!("ID `{id}` entspricht nicht dem Muster"),
        ));
    }
    let empty = Map::new();
    let section = |key: &str| obj.get(key).and_then(Json::as_object).unwrap_or(&empty);

    for field in ["inputs", "outputs", "params", "meta"] {
        for key in section(field).keys() {
            if !schema::is_valid_name(key) {
                out.push(Finding::error(
                    id,
                    key,
                    &name,
                    "invalid_name",
                    format!("Name `{key}` in `{field}` ist unzulässig"),
                ));
            }
        }
    }

    for (input, target) in section("inputs") {
        let problem = match target.as_str().and_then(schema::parse_reference) {
            None => Some((
                "missing_target",
                format!("`{target}` ist keine gültige Referenz"),
            )),
            Some((tid, output)) => match defs.get(tid) {
                None => Some((
                    "missing_target",
                    format!("Eingang `{input}` verweist auf unbekanntes Element `{tid}`"),
                )),
                Some(t) => {
                    let has = t
                        .get("outputs")
                        .and_then(Json::as_object)
                        .is_some_and(|o| o.contains_key(output));
                    (!has).then(|| {
                        (
                            "missing_output",
                            format!("`{tid}` hat keinen Ausgang `{output}`"),
                        )
                    })
                }
            },
        };
        if let Some((code, message)) = problem {
            out.push(Finding::error(id, input, &name, code, message));
        }
    }

    let kind = obj.get("type").and_then(Json::as_str).unwrap_or("");
    let params = section("params");
    for (pname, value) in params {
        check_param(id, &name, pname, value, types.param(kind, pname), out);
    }
    if let Some(marker) = section("meta").get(META_ASSUMED).and_then(Json::as_array) {
        for pname in marker.iter().filter_map(Json::as_str) {
            if params
                .get(pname)
                .is_some_and(|v| matches!(schema::classify(v), Kind::Size { .. }))
            {
                out.push(unit_assumed(id, &name, pname));
            }
        }
    }
}

fn unit_assumed(id: &str, name: &str, field: &str) -> Finding {
    Finding::warning(
        id,
        field,
        name,
        "unit_assumed",
        format!("Einheit von `{field}` wurde aus der Typdefinition angenommen"),
    )
}

#[derive(Default)]
struct Flags {
    unknown_unit: Option<String>,
    dimension_mismatch: Option<String>,
    non_canonical: Option<String>,
    invalid_money: bool,
    unit_missing: bool,
    unit_assumed: bool,
}

fn scan(value: &Json, typed: Option<&ParamType>, flags: &mut Flags) {
    match schema::classify(value) {
        Kind::Naked(_) => {
            if typed.is_some() {
                flags.unit_assumed = true;
            } else {
                flags.unit_missing = true;
            }
        }
        Kind::Size { unit, .. } => match units::lookup(unit) {
            None => flags.unknown_unit = Some(unit.to_owned()),
            Some(u) => {
                if typed.is_some_and(|t| t.dim != u.dim) {
                    flags.dimension_mismatch = Some(unit.to_owned());
                } else if !units::is_canonical(u) {
                    flags.non_canonical = Some(unit.to_owned());
                }
            }
        },
        Kind::Money(m) => {
            if !schema::money_is_valid(m) {
                flags.invalid_money = true;
            }
        }
        Kind::Container => match value {
            Json::Array(list) => list.iter().for_each(|v| scan(v, None, flags)),
            Json::Object(m) => m.values().for_each(|v| scan(v, None, flags)),
            _ => {}
        },
        Kind::Other => {}
    }
}

fn check_param(
    id: &str,
    name: &str,
    pname: &str,
    value: &Json,
    typed: Option<&ParamType>,
    out: &mut Vec<Finding>,
) {
    let mut f = Flags::default();
    scan(value, typed, &mut f);
    if let Some(unit) = f.unknown_unit {
        out.push(Finding::error(
            id,
            pname,
            name,
            "unknown_unit",
            format!("Einheit `{unit}` von `{pname}` ist unbekannt"),
        ));
    }
    if let Some(unit) = f.dimension_mismatch {
        out.push(Finding::error(
            id,
            pname,
            name,
            "dimension_mismatch",
            format!("Einheit `{unit}` passt nicht zur Dimension von `{pname}`"),
        ));
    }
    if let Some(unit) = f.non_canonical {
        out.push(Finding::error(
            id,
            pname,
            name,
            "non_canonical_unit",
            format!("Einheit `{unit}` von `{pname}` ist nicht kanonisch"),
        ));
    }
    if f.invalid_money {
        out.push(Finding::error(
            id,
            pname,
            name,
            "invalid_money",
            format!("Geld in `{pname}` braucht `amount` als Zeichenkette und `currency`"),
        ));
    }
    if f.unit_missing {
        out.push(Finding::warning(
            id,
            pname,
            name,
            "unit_missing",
            format!("Zahl in `{pname}` hat keine Einheit"),
        ));
    }
    if f.unit_assumed {
        out.push(unit_assumed(id, name, pname));
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

    fn codes(project: &Json, types: &TypeRegistry) -> Vec<(String, &'static str)> {
        validate_project(project, types)
            .into_iter()
            .map(|f| (f.element, f.code))
            .collect()
    }

    #[test]
    fn clean_project_has_no_findings() {
        let p = json!({"schema_version": 1, "elements": [el("a"), el("b")]});
        assert!(validate_project(&p, &TypeRegistry::new()).is_empty());
    }

    #[test]
    fn structure_findings() {
        let mut broken = el("b");
        broken["inputs"] = json!({"in": "ghost.out", "x": "a.nope"});
        let mut holder = el("h");
        holder["content"] = json!(["a"]);
        let mut p = json!({"schema_version": 1, "elements": [el("a"), broken, holder, el("a")]});
        p["unattached"] = json!([el("o")]);
        let got = codes(&p, &TypeRegistry::new());
        for want in [
            ("a", "duplicate_id"),
            ("a", "multiple_parents"),
            ("b", "missing_target"),
            ("b", "missing_output"),
            ("o", "orphan"),
        ] {
            assert!(
                got.contains(&(want.0.to_owned(), want.1)),
                "{want:?} in {got:?}"
            );
        }
        assert_eq!(got.len(), 5);
    }

    #[test]
    fn value_findings() {
        let mut e = el("a");
        e["params"] = json!({
            "u": {"value": 1, "unit": "furlong"},
            "c": {"value": 1, "unit": "m"},
            "m": {"amount": 12.5, "currency": "EUR"},
            "n": 5,
            "bad name": {"value": 1, "unit": "mm"}
        });
        let p = json!({"schema_version": 1, "elements": [e]});
        let mut got = codes(&p, &TypeRegistry::new());
        got.sort();
        let want: Vec<(String, &str)> = [
            "invalid_money",
            "invalid_name",
            "non_canonical_unit",
            "unit_missing",
            "unknown_unit",
        ]
        .iter()
        .map(|c| ("a".to_owned(), *c))
        .collect();
        assert_eq!(got, want);
    }

    #[test]
    fn broken_input_does_not_hide_other_elements() {
        let mut b = el("b");
        b["inputs"] = json!({"in": "gibtsnicht.out"});
        let p = json!({"schema_version": 1, "elements": [el("a"), b, el("c")]});
        assert_eq!(
            codes(&p, &TypeRegistry::new()),
            vec![("b".to_owned(), "missing_target")]
        );
    }

    #[test]
    fn garbage_input_does_not_panic() {
        for p in [
            json!(null),
            json!([]),
            json!({"elements": 5}),
            json!({"elements": [1, null, {}]}),
        ] {
            let _ = validate_project(&p, &TypeRegistry::new());
        }
    }
}
