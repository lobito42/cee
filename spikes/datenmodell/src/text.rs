//! Textprojektion: zeilenorientiertes Format für Git, Review und KI (ADR-035).
//!
//! Regeln: eine Zeile je Eintrag (Eingang, Ausgang, Parameter, Meta), Elemente nach ID sortiert, Werte als
//! kanonisches kompaktes JSON (sortierte Schlüssel). Die Reihenfolge der Untergraphen steht in einer
//! `content`-Zeile je Element bzw. in der `roots`-Zeile; damit ist die Projektion verlustfrei.
//!
//! ```text
//! # CEE-Textprojektion v1
//! project schema_version = 1
//! roots = ["origin","level-eg"]
//!
//! [wand-nord] wall
//! in material = "mat-putz.material"
//! out solid = "solid"
//! param height = 3000
//! meta name = "Wand Nord"
//! ```

use std::collections::{BTreeMap, BTreeSet};

use serde_json::{Map, Value as Json};

use crate::{Error, Result, FORM};

const HEADER: &str = "# CEE-Textprojektion v1 (eine Zeile je Eintrag, Elemente nach ID sortiert)";
/// Kürzel der Map-Felder in der Projektion, in Ausgabereihenfolge.
const KINDS: [(&str, &str); 4] = [
    ("in", "inputs"),
    ("out", "outputs"),
    ("param", "params"),
    ("meta", "meta"),
];

fn is_bare(s: &str) -> bool {
    !s.is_empty()
        && s.bytes()
            .all(|b| b.is_ascii_alphanumeric() || matches!(b, b'_' | b'-' | b'.'))
}

fn token(s: &str) -> String {
    if is_bare(s) {
        s.to_owned()
    } else {
        Json::String(s.to_owned()).to_string()
    }
}

struct Flat<'a> {
    element: &'a Map<String, Json>,
    children: Vec<String>,
}

fn flatten<'a>(
    elements: &'a [Json],
    out: &mut BTreeMap<String, Flat<'a>>,
    depth: usize,
) -> Result<Vec<String>> {
    if depth > 256 {
        return Err(Error::Model("Untergraph zu tief".into()));
    }
    let mut ids = Vec::with_capacity(elements.len());
    for e in elements {
        let obj = e
            .as_object()
            .ok_or_else(|| Error::Json("Element muss ein Objekt sein".into()))?;
        if let Some(extra) = obj.keys().find(|k| !FORM.contains(&k.as_str())) {
            return Err(Error::Model(format!("unbekanntes Elementfeld `{extra}`")));
        }
        let id = obj
            .get("id")
            .and_then(Json::as_str)
            .ok_or_else(|| Error::Json("Element ohne `id`".into()))?
            .to_owned();
        let content = obj
            .get("content")
            .and_then(Json::as_array)
            .ok_or_else(|| Error::Json(format!("{id}: `content` fehlt")))?;
        let children = flatten(content, out, depth + 1)?;
        if out
            .insert(
                id.clone(),
                Flat {
                    element: obj,
                    children,
                },
            )
            .is_some()
        {
            return Err(Error::Model(format!("doppelte ID `{id}`")));
        }
        ids.push(id);
    }
    Ok(ids)
}

/// Projiziert ein Projekt-JSON auf Text.
pub fn to_text(project: &Json) -> Result<String> {
    let obj = project
        .as_object()
        .ok_or_else(|| Error::Json("Projekt muss ein Objekt sein".into()))?;
    let elements = obj
        .get("elements")
        .and_then(Json::as_array)
        .ok_or_else(|| Error::Json("Projekt ohne `elements`".into()))?;
    let mut flat = BTreeMap::new();
    let roots = flatten(elements, &mut flat, 0)?;

    let mut out = String::new();
    out.push_str(HEADER);
    out.push('\n');
    for (key, value) in obj.iter().filter(|(k, _)| k.as_str() != "elements") {
        out.push_str(&format!("project {} = {value}\n", token(key)));
    }
    out.push_str(&format!("roots = {}\n", id_list(&roots)));
    for (id, f) in &flat {
        let kind = f
            .element
            .get("type")
            .and_then(Json::as_str)
            .ok_or_else(|| Error::Json(format!("{id}: `type` fehlt")))?;
        out.push_str(&format!("\n[{}] {}\n", token(id), token(kind)));
        for (short, field) in KINDS {
            let map = f
                .element
                .get(field)
                .and_then(Json::as_object)
                .ok_or_else(|| Error::Json(format!("{id}: `{field}` fehlt")))?;
            for (key, value) in map {
                out.push_str(&format!("{short} {} = {value}\n", token(key)));
            }
        }
        if !f.children.is_empty() {
            out.push_str(&format!("content = {}\n", id_list(&f.children)));
        }
    }
    Ok(out)
}

fn id_list(ids: &[String]) -> Json {
    Json::Array(ids.iter().cloned().map(Json::String).collect())
}

/// Liest einen Token (bar oder als JSON-String) und gibt ihn mit dem Rest der Zeile zurück.
fn read_token(s: &str, line: usize) -> Result<(String, &str)> {
    if s.starts_with('"') {
        let mut stream = serde_json::Deserializer::from_str(s).into_iter::<String>();
        let value = stream
            .next()
            .ok_or_else(|| Error::Text(line, "leerer Token".into()))?
            .map_err(|e| Error::Text(line, e.to_string()))?;
        Ok((value, &s[stream.byte_offset()..]))
    } else {
        let end = s
            .find(|c: char| !(c.is_ascii_alphanumeric() || matches!(c, '_' | '-' | '.')))
            .unwrap_or(s.len());
        if end == 0 {
            return Err(Error::Text(line, format!("Token erwartet: `{s}`")));
        }
        Ok((s[..end].to_owned(), &s[end..]))
    }
}

fn parse_json(s: &str, line: usize) -> Result<Json> {
    serde_json::from_str(s).map_err(|e| Error::Text(line, e.to_string()))
}

fn parse_ids(s: &str, line: usize) -> Result<Vec<String>> {
    serde_json::from_str(s).map_err(|e| Error::Text(line, format!("ID-Liste: {e}")))
}

#[derive(Default)]
struct Partial {
    kind: String,
    maps: [Map<String, Json>; 4],
    children: Vec<String>,
}

/// Liest die Textprojektion zurück in ein Projekt-JSON.
pub fn from_text(text: &str) -> Result<Json> {
    let mut project = Map::new();
    let mut roots: Option<Vec<String>> = None;
    let mut elements: BTreeMap<String, Partial> = BTreeMap::new();
    let mut current: Option<String> = None;

    for (index, raw) in text.lines().enumerate() {
        let n = index + 1;
        let line = raw.trim_end();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        if let Some(rest) = line.strip_prefix('[') {
            let (id, rest) = read_token(rest, n)?;
            let rest = rest
                .strip_prefix("] ")
                .ok_or_else(|| Error::Text(n, "`] <typ>` erwartet".into()))?;
            let (kind, rest) = read_token(rest, n)?;
            if !rest.is_empty() {
                return Err(Error::Text(n, format!("unerwarteter Rest `{rest}`")));
            }
            if elements.contains_key(&id) {
                return Err(Error::Text(n, format!("doppelte ID `{id}`")));
            }
            elements.insert(
                id.clone(),
                Partial {
                    kind,
                    ..Partial::default()
                },
            );
            current = Some(id);
            continue;
        }
        let (word, rest) = line.split_once(' ').unwrap_or((line, ""));
        match (word, current.as_ref()) {
            ("project", None) => {
                let (key, rest) = read_token(rest, n)?;
                let value = rest
                    .strip_prefix(" = ")
                    .ok_or_else(|| Error::Text(n, "` = ` erwartet".into()))?;
                project.insert(key, parse_json(value, n)?);
            }
            ("roots", None) => {
                let value = rest
                    .strip_prefix("= ")
                    .ok_or_else(|| Error::Text(n, "`roots = [...]` erwartet".into()))?;
                roots = Some(parse_ids(value, n)?);
            }
            ("content", Some(id)) => {
                let value = rest
                    .strip_prefix("= ")
                    .ok_or_else(|| Error::Text(n, "`content = [...]` erwartet".into()))?;
                let children = parse_ids(value, n)?;
                if let Some(p) = elements.get_mut(id) {
                    p.children = children;
                }
            }
            (short, Some(id)) => {
                let slot = KINDS
                    .iter()
                    .position(|(k, _)| *k == short)
                    .ok_or_else(|| Error::Text(n, format!("unbekannte Zeile `{short}`")))?;
                let (key, rest) = read_token(rest, n)?;
                let value = rest
                    .strip_prefix(" = ")
                    .ok_or_else(|| Error::Text(n, "` = ` erwartet".into()))?;
                let value = parse_json(value, n)?;
                if let Some(p) = elements.get_mut(id) {
                    if p.maps[slot].insert(key.clone(), value).is_some() {
                        return Err(Error::Text(n, format!("`{short} {key}` doppelt")));
                    }
                }
            }
            (other, None) => {
                return Err(Error::Text(
                    n,
                    format!("`{other}` vor dem ersten Element unbekannt"),
                ))
            }
        }
    }

    let roots = roots.ok_or_else(|| Error::Text(0, "`roots` fehlt".into()))?;
    let mut used = BTreeSet::new();
    let mut list = Vec::with_capacity(roots.len());
    for id in &roots {
        list.push(build(id, &mut elements, &mut used, 0)?);
    }
    if let Some(orphan) = elements.keys().next() {
        return Err(Error::Model(format!(
            "Element `{orphan}` hängt weder an `roots` noch an einem `content`"
        )));
    }
    project.insert("elements".into(), Json::Array(list));
    Ok(Json::Object(project))
}

fn build(
    id: &str,
    elements: &mut BTreeMap<String, Partial>,
    used: &mut BTreeSet<String>,
    depth: usize,
) -> Result<Json> {
    if depth > 256 || !used.insert(id.to_owned()) {
        return Err(Error::Model(format!(
            "`{id}` mehrfach eingehängt oder zyklisch"
        )));
    }
    let p = elements
        .remove(id)
        .ok_or_else(|| Error::Model(format!("`{id}` wird verwendet, aber nicht definiert")))?;
    let mut children = Vec::with_capacity(p.children.len());
    for child in &p.children {
        children.push(build(child, elements, used, depth + 1)?);
    }
    let mut e = Map::new();
    e.insert("id".into(), Json::String(id.to_owned()));
    e.insert("type".into(), Json::String(p.kind));
    for ((_, field), map) in KINDS.iter().zip(p.maps) {
        e.insert((*field).into(), Json::Object(map));
    }
    e.insert("content".into(), Json::Array(children));
    Ok(Json::Object(e))
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn examples() -> Vec<Json> {
        [
            include_str!("../../../format/examples/raum.json"),
            include_str!("../../../format/examples/baugruppe.json"),
        ]
        .iter()
        .map(|t| serde_json::from_str(t).expect("Beispiel"))
        .collect()
    }

    #[test]
    fn roundtrip_examples() {
        for p in examples() {
            let text = to_text(&p).expect("to_text");
            assert_eq!(from_text(&text).expect("from_text"), p);
            assert_eq!(to_text(&p).expect("nochmal"), text, "deterministisch");
        }
    }

    #[test]
    fn odd_keys_and_ids_survive() {
        let p = json!({"schema_version": 1, "elements": [{
            "id": "a b]", "type": "x y", "inputs": {"k = 1": "c.d"}, "params": {"#": "\n= ]", "": null},
            "outputs": {}, "content": [], "meta": {"ü": [1.5, {"z": true}]}
        }]});
        let text = to_text(&p).expect("to_text");
        assert_eq!(from_text(&text).expect("from_text"), p);
    }

    #[test]
    fn one_param_change_is_one_line() {
        let mut p = examples().remove(0);
        let before = to_text(&p).expect("vorher");
        p["elements"][0]["params"]["x"] = json!(7);
        let after = to_text(&p).expect("nachher");
        let changed = before
            .lines()
            .zip(after.lines())
            .filter(|(a, b)| a != b)
            .count();
        assert_eq!(changed, 1);
        assert_eq!(before.lines().count(), after.lines().count());
    }

    #[test]
    fn broken_text_is_an_error() {
        assert!(from_text("roots = [\"a\"]\n").is_err());
        assert!(from_text("roots = []\n\n[a] t\nparam x = \n").is_err());
        assert!(from_text("roots = []\n\n[a] t\n").is_err(), "verwaist");
    }
}
