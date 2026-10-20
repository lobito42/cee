//! Dimensionen, Einheitentabelle, Umrechnung und Lesen von Eingaben (ADR-057).
//!
//! Eine [`Dim`] ist ein Vektor ganzzahliger Exponenten über die SI-Basisgrößen Länge (L), Masse (M),
//! Zeit (T), Stromstärke (I), Temperatur (Theta), Stoffmenge (N), Lichtstärke (J) sowie die eigenen Achsen
//! Winkel (A) und CO₂-Äquivalent (C). Kanonisch sind mm, kg, s, rad, A, K, mol, cd, kg{CO2e}; abgeleitete
//! Dimensionen speichern im Produkt der kanonischen Einheiten. Codes folgen UCUM, Groß- und Kleinschreibung
//! wird beachtet.

use crate::{Error, Result};

/// Namen der neun Achsen in der Reihenfolge von [`Dim`].
pub const AXES: [&str; 9] = ["L", "M", "T", "I", "Theta", "N", "J", "A", "C"];

/// Dimension als Exponentenvektor über [`AXES`].
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Dim(pub [i8; 9]);

const fn dim(l: i8, m: i8, t: i8) -> Dim {
    Dim([l, m, t, 0, 0, 0, 0, 0, 0])
}

const DIMENSIONLESS: Dim = Dim([0; 9]);
const LENGTH: Dim = dim(1, 0, 0);
const AREA: Dim = dim(2, 0, 0);
const VOLUME: Dim = dim(3, 0, 0);
const ANGLE: Dim = Dim([0, 0, 0, 0, 0, 0, 0, 1, 0]);
const MASS: Dim = dim(0, 1, 0);
const TIME: Dim = dim(0, 0, 1);
const FREQUENCY: Dim = dim(0, 0, -1);
const FORCE: Dim = dim(1, 1, -2);
const PRESSURE: Dim = dim(-1, 1, -2);
const DENSITY: Dim = dim(-3, 1, 0);
const TEMPERATURE: Dim = Dim([0, 0, 0, 0, 1, 0, 0, 0, 0]);
const CO2E: Dim = Dim([0, 0, 0, 0, 0, 0, 0, 0, 1]);

/// Benannte Dimensionen für Typdefinitionen.
pub fn named_dimension(name: &str) -> Option<Dim> {
    Some(match name {
        "length" => LENGTH,
        "area" => AREA,
        "volume" => VOLUME,
        "angle" => ANGLE,
        "mass" => MASS,
        "time" => TIME,
        "frequency" => FREQUENCY,
        "force" => FORCE,
        "pressure" => PRESSURE,
        "density" => DENSITY,
        "temperature" => TEMPERATURE,
        "co2e" => CO2E,
        "dimensionless" => DIMENSIONLESS,
        _ => return None,
    })
}

/// Eine Einheit der Tabelle: Code (UCUM), Dimension und Faktor in die kanonische Einheit.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Unit {
    /// UCUM-Code, z. B. `mm`, `[in_i]`, `kg{CO2e}`.
    pub code: &'static str,
    /// Dimension der Einheit.
    pub dim: Dim,
    /// Wert einer Einheit in der kanonischen Einheit der Dimension.
    pub factor: f64,
}

const fn u(code: &'static str, dim: Dim, factor: f64) -> Unit {
    Unit { code, dim, factor }
}

use std::f64::consts::PI;

/// Einheitentabelle. Je Dimension steht die kanonische Einheit (Faktor 1) zuerst.
pub static UNITS: [Unit; 43] = [
    u("mm", LENGTH, 1.0),
    u("um", LENGTH, 0.001),
    u("cm", LENGTH, 10.0),
    u("m", LENGTH, 1000.0),
    u("km", LENGTH, 1_000_000.0),
    u("[in_i]", LENGTH, 25.4),
    u("[ft_i]", LENGTH, 304.8),
    u("mm2", AREA, 1.0),
    u("cm2", AREA, 100.0),
    u("m2", AREA, 1_000_000.0),
    u("[in_i]2", AREA, 645.16),
    u("mm3", VOLUME, 1.0),
    u("cm3", VOLUME, 1000.0),
    u("l", VOLUME, 1_000_000.0),
    u("m3", VOLUME, 1_000_000_000.0),
    u("[in_i]3", VOLUME, 16_387.064),
    u("rad", ANGLE, 1.0),
    u("deg", ANGLE, PI / 180.0),
    u("kg", MASS, 1.0),
    u("g", MASS, 0.001),
    u("t", MASS, 1000.0),
    u("[lb_av]", MASS, 0.453_592_37),
    u("s", TIME, 1.0),
    u("ms", TIME, 0.001),
    u("min", TIME, 60.0),
    u("h", TIME, 3600.0),
    u("Hz", FREQUENCY, 1.0),
    u("kHz", FREQUENCY, 1000.0),
    u("N", FORCE, 1.0),
    u("kN", FORCE, 1000.0),
    u("MPa", PRESSURE, 1.0),
    u("N/mm2", PRESSURE, 1.0),
    u("Pa", PRESSURE, 1e-6),
    u("kPa", PRESSURE, 0.001),
    u("GPa", PRESSURE, 1000.0),
    u("kg/mm3", DENSITY, 1.0),
    u("kg/m3", DENSITY, 1e-9),
    u("g/cm3", DENSITY, 1e-6),
    u("K", TEMPERATURE, 1.0),
    u("kg{CO2e}", CO2E, 1.0),
    u("t{CO2e}", CO2E, 1000.0),
    u("1", DIMENSIONLESS, 1.0),
    u("%", DIMENSIONLESS, 0.01),
];

/// Sucht eine Einheit nach UCUM-Code.
pub fn lookup(code: &str) -> Option<&'static Unit> {
    UNITS.iter().find(|u| u.code == code)
}

/// Kanonischer Code einer Dimension (die erste Einheit mit Faktor 1).
pub fn canonical_code(dim: Dim) -> Option<&'static str> {
    UNITS
        .iter()
        .find(|u| u.dim == dim && u.factor == 1.0)
        .map(|u| u.code)
}

/// Kanonische Einheit einer Dimension.
pub fn canonical_unit(dim: Dim) -> Option<&'static Unit> {
    UNITS.iter().find(|u| u.dim == dim && u.factor == 1.0)
}

/// `true`, wenn die Einheit selbst kanonisch ist (Faktor genau 1).
pub fn is_canonical(unit: &Unit) -> bool {
    unit.factor == 1.0
}

/// Wert in einer Einheit, umgerechnet in die kanonische Einheit seiner Dimension.
pub fn to_canonical(value: f64, unit: &Unit) -> Result<(f64, &'static str)> {
    let canon = canonical_unit(unit.dim).ok_or_else(|| {
        Error::UnknownUnit(format!("keine kanonische Einheit für `{}`", unit.code))
    })?;
    let v = if unit.factor == 1.0 {
        value
    } else {
        value * unit.factor
    };
    Ok((v, canon.code))
}

/// Rechnet einen Wert von einer Einheit in eine andere derselben Dimension um.
pub fn convert(value: f64, from: &str, to: &str) -> Result<f64> {
    let a = lookup(from).ok_or_else(|| Error::UnknownUnit(from.to_owned()))?;
    let b = lookup(to).ok_or_else(|| Error::UnknownUnit(to.to_owned()))?;
    if a.dim != b.dim {
        return Err(Error::DimensionMismatch(format!(
            "`{from}` und `{to}` haben verschiedene Dimensionen"
        )));
    }
    Ok(value * a.factor / b.factor)
}

/// Größe in kanonischer Einheit.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Quantity {
    /// Wert in der kanonischen Einheit.
    pub value: f64,
    /// Kanonischer Code.
    pub unit: &'static str,
}

/// Liest eine Eingabe `<Zahl> [<Code>]`.
///
/// Dezimalkomma und Dezimalpunkt, optionales Leerzeichen, `°` als Schreibweise für `deg`. Ohne Code gilt
/// `default`. Ergebnis ist die Größe in kanonischer Einheit.
pub fn parse_quantity(text: &str, default: Option<&str>) -> Result<Quantity> {
    let text = text.trim();
    let (number, rest) = split_number(text)?;
    let rest = rest.trim();
    if rest.starts_with(|c: char| c.is_ascii_digit() || c == '.' || c == ',') {
        return Err(Error::Parse(format!("`{text}` ist keine Zahl mit Einheit")));
    }
    if rest.contains(char::is_whitespace) {
        return Err(Error::Parse(format!("`{rest}` ist kein Einheiten-Code")));
    }
    let given = if rest.is_empty() {
        None
    } else if rest == "°" {
        Some("deg")
    } else {
        Some(rest)
    };
    let unit = match (given, default) {
        (Some(code), _) => lookup(code).ok_or_else(|| Error::UnknownUnit(code.to_owned()))?,
        (None, Some(code)) => lookup(code).ok_or_else(|| Error::UnknownUnit(code.to_owned()))?,
        (None, None) => {
            return Err(Error::Parse(format!("`{text}` hat keine Einheit")));
        }
    };
    if given.is_some() {
        if let Some(code) = default {
            let d = lookup(code).ok_or_else(|| Error::UnknownUnit(code.to_owned()))?;
            if d.dim != unit.dim {
                return Err(Error::DimensionMismatch(format!(
                    "`{}` passt nicht zu `{code}`",
                    unit.code
                )));
            }
        }
    }
    let (value, code) = to_canonical(number, unit)?;
    Ok(Quantity { value, unit: code })
}

/// Trennt die führende Zahl ab; Rest ist der Einheiten-Teil.
fn split_number(text: &str) -> Result<(f64, &str)> {
    let bytes = text.as_bytes();
    let mut i = 0;
    if i < bytes.len() && (bytes[i] == b'+' || bytes[i] == b'-') {
        i += 1;
    }
    let digits_start = i;
    while i < bytes.len() && bytes[i].is_ascii_digit() {
        i += 1;
    }
    let mut digits = i - digits_start;
    if i < bytes.len() && (bytes[i] == b'.' || bytes[i] == b',') {
        let sep = i;
        i += 1;
        let frac_start = i;
        while i < bytes.len() && bytes[i].is_ascii_digit() {
            i += 1;
        }
        digits += i - frac_start;
        if digits == 0 {
            return Err(Error::Parse(format!("`{text}` ist keine Zahl")));
        }
        if i == frac_start && sep == digits_start {
            return Err(Error::Parse(format!("`{text}` ist keine Zahl")));
        }
    }
    if digits == 0 {
        return Err(Error::Parse(format!("`{text}` ist keine Zahl")));
    }
    if i < bytes.len() && (bytes[i] == b'e' || bytes[i] == b'E') {
        let mut j = i + 1;
        if j < bytes.len() && (bytes[j] == b'+' || bytes[j] == b'-') {
            j += 1;
        }
        let exp_start = j;
        while j < bytes.len() && bytes[j].is_ascii_digit() {
            j += 1;
        }
        if j > exp_start {
            i = j;
        }
    }
    let literal = text[..i].replace(',', ".");
    let number: f64 = literal
        .parse()
        .map_err(|_| Error::Parse(format!("`{text}` ist keine Zahl")))?;
    if !number.is_finite() {
        return Err(Error::Parse(format!("`{text}` ist nicht endlich")));
    }
    Ok((number, &text[i..]))
}

#[cfg(test)]
mod tests {
    use super::*;
    use proptest::prelude::*;

    #[test]
    fn table_has_unique_codes_and_canonical_per_dimension() {
        for (i, a) in UNITS.iter().enumerate() {
            assert!(
                UNITS[i + 1..].iter().all(|b| b.code != a.code),
                "{}",
                a.code
            );
            assert!(canonical_unit(a.dim).is_some(), "{}", a.code);
        }
    }

    #[test]
    fn known_conversions() {
        assert_eq!(convert(1.0, "[in_i]", "mm").ok(), Some(25.4));
        assert_eq!(convert(210.0, "GPa", "MPa").ok(), Some(210_000.0));
        assert!(matches!(
            convert(1.0, "kg", "mm"),
            Err(Error::DimensionMismatch(_))
        ));
        assert!(matches!(
            convert(1.0, "furlong", "mm"),
            Err(Error::UnknownUnit(_))
        ));
    }

    #[test]
    fn parse_variants() {
        let q = parse_quantity("1,2 m", None).ok();
        assert_eq!(q.map(|q| q.unit), Some("mm"));
        let q = parse_quantity("90°", None).ok();
        assert_eq!(q.map(|q| q.unit), Some("rad"));
        assert!(matches!(parse_quantity("", None), Err(Error::Parse(_))));
        assert!(matches!(
            parse_quantity("1,2,3 m", None),
            Err(Error::Parse(_))
        ));
        assert!(matches!(
            parse_quantity("12 kg", Some("mm")),
            Err(Error::DimensionMismatch(_))
        ));
        assert!(matches!(
            parse_quantity("1 furlong", None),
            Err(Error::UnknownUnit(_))
        ));
    }

    proptest! {
        #[test]
        fn roundtrip_within_tolerance(idx_a in 0usize..UNITS.len(), idx_b in 0usize..UNITS.len(), v in 1e-3f64..1e6) {
            let a = &UNITS[idx_a];
            let same: Vec<&Unit> = UNITS.iter().filter(|u| u.dim == a.dim).collect();
            let b = same[idx_b % same.len()];
            let there = convert(v, a.code, b.code).map_err(|e| TestCaseError::fail(e.to_string()))?;
            let back = convert(there, b.code, a.code).map_err(|e| TestCaseError::fail(e.to_string()))?;
            prop_assert!((back - v).abs() <= 1e-12 * v.abs());
        }

        #[test]
        fn parse_never_panics(s in ".{0,24}") {
            let _ = parse_quantity(&s, Some("mm"));
        }
    }
}
