//! Typdefinitionen: Zu jedem Parameter eines Elementtyps die Dimension und die Standard-Einheit.
//!
//! Format: `{"type": "<elementtyp>", "params": {"<name>": {"dimension": "<benannte Dimension>",
//! "default_unit": "<Code>"}}}`. Die Definitionen werden zur Laufzeit registriert und nicht im Dokument
//! gespeichert; Fachpakete liefern sie über die Fachpaket-API (ADR-054).

use std::collections::HashMap;

use serde_json::Value as Json;

use crate::units::{self, Dim, Unit};
use crate::{Error, Result};

/// Dimension und Standard-Einheit eines Parameters.
#[derive(Debug, Clone, Copy)]
pub struct ParamType {
    /// Dimension des Parameters.
    pub dim: Dim,
    /// Einheit, die für eine Zahl ohne Einheit gilt.
    pub default_unit: &'static Unit,
}

/// Register der Typdefinitionen.
#[derive(Debug, Clone, Default)]
pub struct TypeRegistry {
    types: HashMap<String, HashMap<String, ParamType>>,
}

impl TypeRegistry {
    /// Leeres Register.
    pub fn new() -> Self {
        Self::default()
    }

    /// Registriert eine Definition. Bei einem Fehler bleibt das Register unverändert.
    pub fn register(&mut self, def: &Json) -> Result<()> {
        let invalid = |m: String| Error::InvalidTypeDefinition(m);
        let name = def
            .get("type")
            .and_then(Json::as_str)
            .filter(|t| !t.is_empty())
            .ok_or_else(|| invalid("`type` fehlt".into()))?;
        let params = def
            .get("params")
            .and_then(Json::as_object)
            .ok_or_else(|| invalid(format!("{name}: `params` fehlt")))?;
        let mut parsed = HashMap::with_capacity(params.len());
        for (pname, p) in params {
            let dim_name = p
                .get("dimension")
                .and_then(Json::as_str)
                .ok_or_else(|| invalid(format!("{name}.{pname}: `dimension` fehlt")))?;
            let dim = units::named_dimension(dim_name).ok_or_else(|| {
                invalid(format!("{name}.{pname}: unbekannte Dimension `{dim_name}`"))
            })?;
            let code = p
                .get("default_unit")
                .and_then(Json::as_str)
                .ok_or_else(|| invalid(format!("{name}.{pname}: `default_unit` fehlt")))?;
            let unit = units::lookup(code)
                .ok_or_else(|| invalid(format!("{name}.{pname}: unbekannte Einheit `{code}`")))?;
            if unit.dim != dim {
                return Err(invalid(format!(
                    "{name}.{pname}: Einheit `{code}` passt nicht zur Dimension `{dim_name}`"
                )));
            }
            parsed.insert(
                pname.clone(),
                ParamType {
                    dim,
                    default_unit: unit,
                },
            );
        }
        self.types.insert(name.to_owned(), parsed);
        Ok(())
    }

    /// Registriert eine Liste von Definitionen. Gültige Einträge gelten auch dann, wenn andere abgelehnt
    /// werden; die Fehler kommen in Reihenfolge der Liste zurück.
    pub fn register_all(&mut self, defs: &Json) -> Vec<Error> {
        let Some(list) = defs.as_array() else {
            return vec![Error::InvalidTypeDefinition(
                "Typdefinitionen müssen eine Liste sein".into(),
            )];
        };
        list.iter().filter_map(|d| self.register(d).err()).collect()
    }

    /// Typ eines Parameters, falls definiert.
    pub fn param(&self, element_type: &str, param: &str) -> Option<&ParamType> {
        self.types.get(element_type)?.get(param)
    }

    /// Anzahl der registrierten Elementtypen.
    pub fn len(&self) -> usize {
        self.types.len()
    }

    /// `true`, wenn nichts registriert ist.
    pub fn is_empty(&self) -> bool {
        self.types.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn registers_and_finds_params() {
        let mut reg = TypeRegistry::new();
        let def = json!({"type": "bracket", "params": {
            "height": {"dimension": "length", "default_unit": "mm"},
            "angle": {"dimension": "angle", "default_unit": "deg"}}});
        assert!(reg.register(&def).is_ok());
        let p = reg.param("bracket", "angle");
        assert_eq!(p.map(|p| p.default_unit.code), Some("deg"));
        assert!(reg.param("bracket", "nope").is_none());
        assert!(reg.param("other", "angle").is_none());
    }

    #[test]
    fn rejects_unknown_dimension_and_mismatching_unit() {
        let mut reg = TypeRegistry::new();
        let bad_dim =
            json!({"type": "a", "params": {"p": {"dimension": "x", "default_unit": "mm"}}});
        let bad_unit =
            json!({"type": "a", "params": {"p": {"dimension": "length", "default_unit": "kg"}}});
        assert!(matches!(
            reg.register(&bad_dim),
            Err(Error::InvalidTypeDefinition(_))
        ));
        assert!(matches!(
            reg.register(&bad_unit),
            Err(Error::InvalidTypeDefinition(_))
        ));
        assert!(reg.is_empty());
    }

    #[test]
    fn earlier_definitions_survive_a_rejection() {
        let mut reg = TypeRegistry::new();
        let defs = json!([
            {"type": "ok", "params": {"p": {"dimension": "mass", "default_unit": "g"}}},
            {"type": "bad", "params": {"p": {"dimension": "mass", "default_unit": "mm"}}}
        ]);
        let errors = reg.register_all(&defs);
        assert_eq!(errors.len(), 1);
        assert_eq!(reg.len(), 1);
        assert!(reg.param("ok", "p").is_some());
    }
}
