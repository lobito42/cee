//! Schema-Version im Dokument und Migrationen (ADR-028, ADR-033).
//!
//! `ROOT.project.schema_version` ist eine Ganzzahl; fehlt sie, gilt Version 1. Eine Migration `n → n+1` ist
//! eine Funktion über das Dokument, die normale Automerge-Änderungen in einem Commit mit der Nachricht
//! `migrate n->n+1` macht. Sie muss deterministisch und idempotent sein, damit zwei Kopien, die offline je für
//! sich migriert wurden, beim Zusammenführen denselben Inhalt ergeben. Beim Öffnen laufen alle fehlenden
//! Migrationen der Reihe nach; ein Dokument mit höherer Version als [`CURRENT`] wird nicht geöffnet.
//!
//! Es gibt heute keine echte Migration. Der Mechanismus ist mit der Beispiel-Migration 1 → 2 belegt, die nur mit
//! dem Cargo-Feature `demo-migration` übersetzt wird (dann ist `CURRENT` 2).

#[cfg(feature = "demo-migration")]
use automerge::{transaction::CommitOptions, transaction::Transactable, ObjId};
use automerge::{AutoCommit, ReadDoc, ScalarValue, Value, ROOT};

use crate::{Error, Result};

/// Version, die dieser Kern schreibt und kennt.
pub const CURRENT: u32 = if cfg!(feature = "demo-migration") {
    2
} else {
    1
};

/// Gespeicherte Version eines Dokuments (fehlt sie, gilt 1).
pub fn schema_version(doc: &AutoCommit) -> Result<u32> {
    let Some((Value::Object(_), project)) = doc.get(ROOT, "project")? else {
        return Ok(1);
    };
    match doc.get(&project, "schema_version")? {
        None => Ok(1),
        Some((Value::Scalar(s), _)) => match s.as_ref() {
            ScalarValue::Int(i) => u32::try_from(*i)
                .map_err(|_| Error::Model(format!("schema_version {i} ist unzulässig"))),
            ScalarValue::Uint(u) => u32::try_from(*u)
                .map_err(|_| Error::Model(format!("schema_version {u} ist unzulässig"))),
            _ => Err(Error::Model("schema_version ist keine Ganzzahl".into())),
        },
        Some(_) => Err(Error::Model("schema_version ist keine Ganzzahl".into())),
    }
}

/// Lehnt Dokumente mit neuerer Version als [`CURRENT`] ab.
pub fn check_not_too_new(version: u32) -> Result<()> {
    if version > CURRENT {
        Err(Error::SchemaTooNew(format!(
            "Schema-Version {version}, dieser Kern kennt höchstens {CURRENT}"
        )))
    } else {
        Ok(())
    }
}

/// Führt alle fehlenden Migrationen der Reihe nach aus und gibt (vorher, nachher) zurück.
pub fn run(doc: &mut AutoCommit) -> Result<(u32, u32)> {
    let before = schema_version(doc)?;
    check_not_too_new(before)?;
    let mut version = before;
    while version < CURRENT {
        step(doc, version)?;
        version += 1;
    }
    Ok((before, version))
}

#[cfg(feature = "demo-migration")]
fn step(doc: &mut AutoCommit, from: u32) -> Result<()> {
    match from {
        1 => demo_1_to_2(doc),
        other => Err(Error::Model(format!("keine Migration von Version {other}"))),
    }
}

#[cfg(not(feature = "demo-migration"))]
fn step(_doc: &mut AutoCommit, from: u32) -> Result<()> {
    Err(Error::Model(format!("keine Migration von Version {from}")))
}

#[cfg(feature = "demo-migration")]
fn map_obj(doc: &AutoCommit, parent: &ObjId, key: &str) -> Result<Option<ObjId>> {
    match doc.get(parent, key)? {
        Some((Value::Object(_), id)) => Ok(Some(id)),
        _ => Ok(None),
    }
}

/// Beispiel: `meta.name` heißt künftig `meta.title`. Ein vorhandenes `title` bleibt; `name` entfällt.
#[cfg(feature = "demo-migration")]
fn demo_1_to_2(doc: &mut AutoCommit) -> Result<()> {
    if let Some(elements) = map_obj(doc, &ROOT, "elements")? {
        let ids: Vec<String> = doc.keys(&elements).collect();
        for id in ids {
            let Some(element) = map_obj(doc, &elements, &id)? else {
                continue;
            };
            let Some(meta) = map_obj(doc, &element, "meta")? else {
                continue;
            };
            let Some((Value::Scalar(name), _)) = doc.get(&meta, "name")? else {
                continue;
            };
            let name = name.into_owned();
            if doc.get(&meta, "title")?.is_none() {
                doc.put(&meta, "title", name)?;
            }
            doc.delete(&meta, "name")?;
        }
    }
    let project =
        map_obj(doc, &ROOT, "project")?.ok_or_else(|| Error::Model("`project` fehlt".into()))?;
    doc.put(&project, "schema_version", 2_i64)?;
    doc.commit_with(
        CommitOptions::default()
            .with_message("migrate 1->2")
            .with_time(0),
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use automerge::transaction::Transactable;

    #[test]
    fn missing_version_counts_as_one() {
        let mut doc = AutoCommit::new();
        assert!(doc
            .put_object(ROOT, "project", automerge::ObjType::Map)
            .is_ok());
        assert_eq!(schema_version(&doc).ok(), Some(1));
    }

    #[test]
    fn newer_versions_are_refused() {
        assert!(check_not_too_new(CURRENT).is_ok());
        assert!(matches!(
            check_not_too_new(CURRENT + 1),
            Err(Error::SchemaTooNew(_))
        ));
    }
}
