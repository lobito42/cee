//! Beispiel-Fachpaket (fachneutral) für die Bindungsschicht `cee-bind` (ADR-054).
//!
//! Ein Fachpaket-Crate hängt nur vom Kern ab, nie umgekehrt. Es bietet lesende Funktionen mit der Signatur
//! [`Function`] an; `cee-bind` meldet sie mit dem Feature `pkg-beispiel` in seinem Register an, und alle
//! drei Bindungen (NIF, WASM, PyO3) erreichen sie über den generischen Aufruf `call(name, doc, args)`.
//!
//! Einzige Funktion: `beispiel.summe` mit `{"type": "<elementtyp>", "param": "<name>"}`; Ergebnis
//! `{"count": <Anzahl Elemente dieses Typs>, "sum": {"value": <Summe>, "unit": "<kanonischer Code>"}}`.

use cee_graph::doc::Doc;
use cee_graph::schema::{self, Kind};
use cee_graph::units;
use cee_graph::Error;
use serde_json::{json, Value as Json};

/// Fehler einer Fachpaket-Funktion: Kernfehler und, falls bekannt, das betroffene Element.
pub type Failure = (Error, Option<String>);

/// Lesende Fachpaket-Funktion: Dokument (nur lesend), Argumente als JSON, Ergebnis als JSON.
pub type Function = fn(&Doc, &Json) -> Result<Json, Failure>;

/// Alle Funktionen dieses Pakets mit Namen `<paket>.<funktion>`.
pub const FUNCTIONS: &[(&str, Function)] = &[("beispiel.summe", summe)];

fn arg<'a>(args: &'a Json, key: &str) -> Result<&'a str, Failure> {
    args.get(key).and_then(Json::as_str).ok_or_else(|| {
        (
            Error::Json(format!("Argument `{key}` fehlt oder ist kein String")),
            None,
        )
    })
}

/// Sammelt alle Elemente (auch verschachtelte und lose) in der Reihenfolge des Exports.
fn collect<'a>(list: &'a [Json], out: &mut Vec<&'a Json>) {
    for e in list {
        if e.is_object() {
            out.push(e);
            if let Some(kids) = e.get("content").and_then(Json::as_array) {
                collect(kids, out);
            }
        }
    }
}

/// `beispiel.summe`: Anzahl der Elemente eines Typs und Summe eines Größen-Parameters in kanonischer Einheit.
///
/// Elemente ohne den Parameter zählen mit, tragen aber nichts bei; Werte, die keine Größe sind, ebenso.
/// Haben die Größen verschiedene Dimensionen, ist das ein `dimension_mismatch` am ersten abweichenden
/// Element.
pub fn summe(doc: &Doc, args: &Json) -> Result<Json, Failure> {
    let ty = arg(args, "type")?;
    let param = arg(args, "param")?;
    let project = doc.export().map_err(|e| (e, None))?;
    let mut all = Vec::new();
    for key in ["elements", "unattached"] {
        if let Some(list) = project.get(key).and_then(Json::as_array) {
            collect(list, &mut all);
        }
    }
    let mut count = 0_u64;
    let mut total = 0.0_f64;
    let mut dim = None;
    for e in all {
        if e.get("type").and_then(Json::as_str) != Some(ty) {
            continue;
        }
        count += 1;
        let id = e.get("id").and_then(Json::as_str).unwrap_or_default();
        let Some(value) = e.get("params").and_then(|p| p.get(param)) else {
            continue;
        };
        let Kind::Size { value, unit } = schema::classify(value) else {
            continue;
        };
        let u = units::lookup(unit)
            .ok_or_else(|| (Error::UnknownUnit(format!("`{unit}`")), Some(id.to_owned())))?;
        match dim {
            None => dim = Some(u.dim),
            Some(d) if d != u.dim => {
                return Err((
                    Error::DimensionMismatch(format!(
                        "`{id}.{param}` hat eine andere Dimension als die Werte davor"
                    )),
                    Some(id.to_owned()),
                ))
            }
            Some(_) => {}
        }
        let (v, _) = units::to_canonical(value, u).map_err(|e| (e, Some(id.to_owned())))?;
        total += v;
    }
    let unit = dim.and_then(units::canonical_code);
    Ok(json!({"count": count, "sum": {"value": schema::json_number(total), "unit": unit}}))
}

#[cfg(test)]
mod tests {
    use super::*;
    use cee_graph::types::TypeRegistry;

    fn doc(elements: Json) -> Doc {
        let project = json!({"schema_version": 1, "elements": elements});
        Doc::import(&project, &TypeRegistry::new(), None).unwrap().0
    }

    fn el(id: &str, ty: &str, params: Json) -> Json {
        json!({"id": id, "type": ty, "inputs": {}, "params": params, "outputs": {"out": "thing"},
               "content": [], "meta": {"name": id}})
    }

    #[test]
    fn summe_rechnet_in_kanonischer_einheit() {
        let d = doc(json!([
            el("a", "probe", json!({"w": {"value": 10, "unit": "mm"}})),
            el("b", "probe", json!({"w": {"value": 2, "unit": "m"}})),
            el("c", "probe", json!({})),
            el("d", "andere", json!({"w": {"value": 5, "unit": "mm"}})),
        ]));
        let out = summe(&d, &json!({"type": "probe", "param": "w"})).unwrap();
        assert_eq!(out["count"], json!(3));
        assert_eq!(out["sum"]["unit"], json!("mm"));
        assert_eq!(out["sum"]["value"].as_f64(), Some(2010.0));
    }

    #[test]
    fn dimensionsfehler_nennt_das_erste_abweichende_element() {
        let d = doc(json!([
            el("p1", "probe", json!({"w": {"value": 10, "unit": "mm"}})),
            el("p3", "probe", json!({"w": {"value": 5, "unit": "kg"}})),
            el("p4", "probe", json!({"w": {"value": 1, "unit": "kg"}})),
        ]));
        let (e, element) = summe(&d, &json!({"type": "probe", "param": "w"})).unwrap_err();
        assert_eq!(e.code(), "dimension_mismatch");
        assert_eq!(element.as_deref(), Some("p3"));
    }

    #[test]
    fn fehlende_argumente_sind_ein_fehler() {
        let d = doc(json!([]));
        let (e, _) = summe(&d, &json!({"type": "probe"})).unwrap_err();
        assert_eq!(e.code(), "json_error");
    }

    #[test]
    fn leere_auswahl_zaehlt_null() {
        let d = doc(json!([el("a", "x", json!({}))]));
        let out = summe(&d, &json!({"type": "probe", "param": "w"})).unwrap();
        assert_eq!(out["count"], json!(0));
        assert_eq!(out["sum"]["unit"], Json::Null);
    }
}
