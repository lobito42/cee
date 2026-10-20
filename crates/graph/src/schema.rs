//! Elementform, Größe und Geld, Muster für IDs und Namen, Regeln beim Schreiben von Zahlen (ADR-028, ADR-057).
//!
//! Ein Element hat immer dieselben sieben Felder (`id`, `type`, `inputs`, `params`, `outputs`, `content`,
//! `meta`). Eine **Größe** ist `{"value": <Zahl>, "unit": "<Code>"}`, **Geld** ist
//! `{"amount": "<Dezimalzahl als Zeichenkette>", "currency": "<ISO 4217>"}`. Zusätzliche Schlüssel wie `per`
//! bleiben erhalten und werden nicht gedeutet.

use serde_json::{Map, Value as Json};

use crate::types::ParamType;
use crate::units;
use crate::{Error, Result};

/// Die sieben Felder jedes Elements.
pub const FORM: [&str; 7] = [
    "id", "type", "inputs", "params", "outputs", "content", "meta",
];
/// Felder, die als Map gespeichert werden.
pub const MAP_FIELDS: [&str; 4] = ["inputs", "params", "outputs", "meta"];
/// Meta-Eintrag: Parameter, deren Einheit aus der Typdefinition angenommen wurde (Warnung `unit_assumed`).
pub const META_ASSUMED: &str = "assumed_units";

/// `true` für `^[A-Za-z0-9][A-Za-z0-9_-]*$`.
pub fn is_valid_id(id: &str) -> bool {
    let mut chars = id.chars();
    matches!(chars.next(), Some(c) if c.is_ascii_alphanumeric())
        && chars.all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-')
}

/// `true` für `^[A-Za-z0-9_][A-Za-z0-9_-]*$`.
pub fn is_valid_name(name: &str) -> bool {
    let mut chars = name.chars();
    matches!(chars.next(), Some(c) if c.is_ascii_alphanumeric() || c == '_')
        && chars.all(|c| c.is_ascii_alphanumeric() || c == '_' || c == '-')
}

/// Zerlegt eine Referenz `<id>.<output>`; `None`, wenn die Form nicht stimmt.
pub fn parse_reference(reference: &str) -> Option<(&str, &str)> {
    let (id, output) = reference.split_once('.')?;
    (is_valid_id(id) && is_valid_name(output)).then_some((id, output))
}

const CROCKFORD: &[u8; 32] = b"0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/// Baut eine ULID aus Zeitstempel (ms) und 80 Bit Zufall. Zeit und Zufall liefert der Host (kein I/O im Kern).
pub fn new_ulid(timestamp_ms: u64, random: u128) -> String {
    let mut out = [b'0'; 26];
    let mut t = timestamp_ms & ((1u64 << 48) - 1);
    for slot in out[..10].iter_mut().rev() {
        *slot = CROCKFORD[(t & 31) as usize];
        t >>= 5;
    }
    let mut r = random & ((1u128 << 80) - 1);
    for slot in out[10..].iter_mut().rev() {
        *slot = CROCKFORD[(r & 31) as usize];
        r >>= 5;
    }
    out.iter().map(|b| char::from(*b)).collect()
}

/// Art eines Parameterwerts.
#[derive(Debug, Clone, Copy)]
pub enum Kind<'a> {
    /// Zahl ohne Einheit.
    Naked(f64),
    /// Größe `{value, unit}`.
    Size {
        /// Zahlenwert.
        value: f64,
        /// Einheiten-Code wie angegeben.
        unit: &'a str,
    },
    /// Objekt mit `amount` oder `currency`.
    Money(&'a Map<String, Json>),
    /// Liste oder anderes Objekt: enthält möglicherweise Größen.
    Container,
    /// Zeichenkette, Wahrheitswert, null.
    Other,
}

/// Ordnet einen Wert ein.
pub fn classify(value: &Json) -> Kind<'_> {
    match value {
        Json::Number(n) => Kind::Naked(n.as_f64().unwrap_or(f64::NAN)),
        Json::Object(m) => {
            if m.contains_key("amount") || m.contains_key("currency") {
                return Kind::Money(m);
            }
            if let (Some(v), Some(u)) = (
                m.get("value").and_then(Json::as_f64),
                m.get("unit").and_then(Json::as_str),
            ) {
                return Kind::Size { value: v, unit: u };
            }
            Kind::Container
        }
        Json::Array(_) => Kind::Container,
        _ => Kind::Other,
    }
}

/// `true`, wenn das Geld-Objekt gültig ist: `amount` als Dezimalzeichenkette, `currency` dreibuchstabig groß.
pub fn money_is_valid(m: &Map<String, Json>) -> bool {
    let amount_ok = m.get("amount").and_then(Json::as_str).is_some_and(|a| {
        let digits = a.strip_prefix('-').unwrap_or(a);
        let (int, frac) = digits.split_once('.').unwrap_or((digits, "0"));
        !int.is_empty()
            && !frac.is_empty()
            && int.bytes().all(|b| b.is_ascii_digit())
            && frac.bytes().all(|b| b.is_ascii_digit())
    });
    let currency_ok = m
        .get("currency")
        .and_then(Json::as_str)
        .is_some_and(|c| c.len() == 3 && c.bytes().all(|b| b.is_ascii_uppercase()));
    amount_ok && currency_ok
}

/// Ergebnis der Schreibregeln für einen Parameterwert.
#[derive(Debug, Clone, PartialEq)]
pub struct Normalized {
    /// Zu speichernder Wert.
    pub value: Json,
    /// Standard-Einheit aus der Typdefinition wurde angenommen.
    pub assumed: bool,
    /// Eine Zahl ohne Einheit bleibt unverändert stehen (Dimension unbekannt).
    pub missing: bool,
}

impl Normalized {
    /// Warnungscodes in fester Reihenfolge.
    pub fn warnings(&self) -> Vec<&'static str> {
        let mut w = Vec::new();
        if self.assumed {
            w.push("unit_assumed");
        }
        if self.missing {
            w.push("unit_missing");
        }
        w
    }
}

/// Regeln beim Schreiben (design.md, Tabelle „Regeln beim Schreiben“).
///
/// `typed` ist die Typdefinition des Parameters, falls es eine gibt. Größen in anderer Einheit derselben
/// Dimension werden in die kanonische Einheit umgerechnet; Fehler lehnen den Wert ab.
pub fn normalize_value(value: &Json, typed: Option<&ParamType>) -> Result<Normalized> {
    let mut n = Normalized {
        value: Json::Null,
        assumed: false,
        missing: false,
    };
    n.value = walk(value, typed, &mut n)?;
    Ok(n)
}

fn size_json(value: f64, unit: &str) -> Json {
    let mut m = Map::new();
    m.insert("unit".into(), Json::String(unit.to_owned()));
    m.insert("value".into(), json_number(value));
    Json::Object(m)
}

/// Zahl als JSON; ganzzahlige Werte bleiben ganzzahlig lesbar, nicht endliche werden `null`.
pub fn json_number(v: f64) -> Json {
    serde_json::Number::from_f64(v).map_or(Json::Null, Json::Number)
}

fn walk(value: &Json, typed: Option<&ParamType>, acc: &mut Normalized) -> Result<Json> {
    match classify(value) {
        Kind::Naked(n) => match typed {
            Some(t) => {
                let (v, code) = units::to_canonical(n, t.default_unit)?;
                acc.assumed = true;
                Ok(match value {
                    Json::Number(_) if t.default_unit.factor == 1.0 => size_json_keep(value, code),
                    _ => size_json(v, code),
                })
            }
            None => {
                acc.missing = true;
                Ok(value.clone())
            }
        },
        Kind::Size { value: v, unit } => {
            let u = units::lookup(unit).ok_or_else(|| Error::UnknownUnit(format!("`{unit}`")))?;
            if let Some(t) = typed {
                if t.dim != u.dim {
                    return Err(Error::DimensionMismatch(format!(
                        "`{unit}` passt nicht zur Dimension des Parameters"
                    )));
                }
            }
            if u.factor == 1.0 {
                return Ok(value.clone());
            }
            let (cv, code) = units::to_canonical(v, u)?;
            let mut m = match value {
                Json::Object(m) => m.clone(),
                _ => Map::new(),
            };
            m.insert("value".into(), json_number(cv));
            m.insert("unit".into(), Json::String(code.to_owned()));
            Ok(Json::Object(m))
        }
        Kind::Money(m) => {
            if money_is_valid(m) {
                Ok(value.clone())
            } else {
                Err(Error::InvalidMoney(
                    "Geld braucht `amount` als Dezimalzeichenkette und `currency` (ISO 4217)"
                        .into(),
                ))
            }
        }
        Kind::Container => match value {
            Json::Array(list) => list
                .iter()
                .map(|v| walk(v, None, acc))
                .collect::<Result<Vec<_>>>()
                .map(Json::Array),
            Json::Object(m) => m
                .iter()
                .map(|(k, v)| walk(v, None, acc).map(|w| (k.clone(), w)))
                .collect::<Result<Map<_, _>>>()
                .map(Json::Object),
            other => Ok(other.clone()),
        },
        Kind::Other => Ok(value.clone()),
    }
}

/// Größe mit dem ursprünglichen Zahlenwert (bewahrt `5` statt `5.0`).
fn size_json_keep(number: &Json, code: &str) -> Json {
    let mut m = Map::new();
    m.insert("unit".into(), Json::String(code.to_owned()));
    m.insert("value".into(), number.clone());
    Json::Object(m)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::TypeRegistry;
    use proptest::prelude::*;
    use serde_json::json;

    fn registry() -> TypeRegistry {
        let mut reg = TypeRegistry::new();
        let def = json!({"type": "bracket", "params": {
            "height": {"dimension": "length", "default_unit": "mm"},
            "angle": {"dimension": "angle", "default_unit": "deg"}}});
        assert!(reg.register(&def).is_ok());
        reg
    }

    #[test]
    fn id_and_name_patterns() {
        assert!(is_valid_id("mat-alu_1"));
        assert!(!is_valid_id("a.b"));
        assert!(!is_valid_id("-a"));
        assert!(!is_valid_id(""));
        assert!(is_valid_name("_x-1"));
        assert!(!is_valid_name("bad name"));
        assert_eq!(parse_reference("a.out"), Some(("a", "out")));
        assert_eq!(parse_reference("a"), None);
        assert_eq!(parse_reference("a.b.c"), None);
    }

    #[test]
    fn ulid_has_26_valid_characters() {
        let id = new_ulid(1_700_000_000_000, 0x1234_5678_9abc_def0_1234);
        assert_eq!(id.len(), 26);
        assert!(is_valid_id(&id));
    }

    #[test]
    fn naked_number_rules() {
        let reg = registry();
        let typed = reg.param("bracket", "angle");
        let n = normalize_value(&json!(90), typed);
        assert!(n.as_ref().is_ok_and(|n| n.assumed && !n.missing));
        let n = normalize_value(&json!(5), None);
        assert!(n.is_ok_and(|n| n.value == json!(5) && n.missing));
    }

    #[test]
    fn size_rules() {
        let reg = registry();
        let h = reg.param("bracket", "height");
        let ok = normalize_value(&json!({"value": 1.2, "unit": "m"}), h);
        assert!(ok.is_ok_and(|n| n.value["unit"] == "mm"));
        assert!(matches!(
            normalize_value(&json!({"value": 3, "unit": "kg"}), h),
            Err(Error::DimensionMismatch(_))
        ));
        assert!(matches!(
            normalize_value(&json!({"value": 1, "unit": "furlong"}), None),
            Err(Error::UnknownUnit(_))
        ));
    }

    #[test]
    fn money_rules() {
        let good = json!({"amount": "12.50", "currency": "EUR"});
        assert!(normalize_value(&good, None).is_ok());
        for bad in [
            json!({"amount": 12.5, "currency": "EUR"}),
            json!({"amount": "12.50"}),
            json!({"amount": "abc", "currency": "EUR"}),
        ] {
            assert!(matches!(
                normalize_value(&bad, None),
                Err(Error::InvalidMoney(_))
            ));
        }
    }

    proptest! {
        #[test]
        fn normalized_sizes_are_canonical(v in -1e6f64..1e6, idx in 0usize..units::UNITS.len()) {
            let unit = &units::UNITS[idx];
            let n = normalize_value(&json!({"value": v, "unit": unit.code}), None)
                .map_err(|e| TestCaseError::fail(e.to_string()))?;
            let code = n.value["unit"].as_str().unwrap_or("");
            let canon = units::lookup(code);
            prop_assert!(canon.is_some_and(|c| c.factor == 1.0 && c.dim == unit.dim));
        }
    }
}
