//! Berechnungszustände je Element (ADR-032, ADR-050).
//!
//! Die Zustände leben neben dem Dokument, nie im CRDT und nie im Hash. Ein Fehler betrifft nur das
//! fehlerhafte Element und seine Nachfolger; unabhängige Zweige werden weiter berechnet, Speichern und
//! Zusammenführen bleiben möglich.

use std::collections::HashMap;

use crate::deps;
use crate::index::Index;
use crate::validate::Finding;
use crate::{Error, Result};

/// Zustand der Berechnung eines Elements.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum State {
    /// Ergebnis ist aktuell.
    Current,
    /// Ergebnis fehlt oder ist veraltet.
    Stale,
    /// Wird gerade berechnet.
    Running,
    /// Die Berechnung ist mit einem Befund fehlgeschlagen.
    Failed,
}

impl State {
    /// `current`, `stale`, `running` oder `failed`.
    pub fn as_str(self) -> &'static str {
        match self {
            State::Current => "current",
            State::Stale => "stale",
            State::Running => "running",
            State::Failed => "failed",
        }
    }
}

/// Zustände aller Elemente eines Index.
#[derive(Debug, Clone, Default)]
pub struct States {
    state: HashMap<String, State>,
    /// Elemente, die während der Berechnung geändert wurden.
    dirty: HashMap<String, bool>,
    findings: HashMap<String, Finding>,
}

impl States {
    /// Neue Zustände: alle Elemente beginnen als `stale`.
    pub fn new(index: &Index) -> States {
        States {
            state: index
                .nodes()
                .iter()
                .map(|n| (n.id.clone(), State::Stale))
                .collect(),
            ..States::default()
        }
    }

    /// Zustand eines Elements.
    pub fn get(&self, id: &str) -> Option<State> {
        self.state.get(id).copied()
    }

    /// Befund eines fehlgeschlagenen Elements.
    pub fn finding(&self, id: &str) -> Option<&Finding> {
        self.findings.get(id)
    }

    /// Alle fehlgeschlagenen Elemente mit Befund, nach ID sortiert.
    pub fn failed(&self) -> Vec<(&str, &Finding)> {
        let mut out: Vec<_> = self.findings.iter().map(|(k, v)| (k.as_str(), v)).collect();
        out.sort_by(|a, b| a.0.cmp(b.0));
        out
    }

    fn require(&self, id: &str) -> Result<()> {
        if self.state.contains_key(id) {
            Ok(())
        } else {
            Err(Error::UnknownElement(format!("`{id}`")))
        }
    }

    /// Änderung an `id`: das Element und alle betroffenen Elemente werden `stale`. Ein Element, das gerade
    /// läuft, bleibt `running` und wird nach dem Ende wieder `stale`.
    pub fn change(&mut self, index: &Index, id: &str) -> Result<()> {
        self.require(id)?;
        for other in deps::affected(index, &[id])? {
            match self.state.get(&other) {
                Some(State::Running) => {
                    self.dirty.insert(other, true);
                }
                Some(_) => {
                    self.state.insert(other.clone(), State::Stale);
                    self.findings.remove(&other);
                }
                None => {}
            }
        }
        Ok(())
    }

    /// Beginn der Berechnung.
    pub fn start(&mut self, id: &str) -> Result<()> {
        self.require(id)?;
        self.state.insert(id.to_owned(), State::Running);
        self.dirty.remove(id);
        self.findings.remove(id);
        Ok(())
    }

    /// Berechnung erfolgreich beendet; war das Element zwischendurch geändert, ist es wieder `stale`.
    pub fn finish_ok(&mut self, id: &str) -> Result<()> {
        self.require(id)?;
        let next = if self.dirty.remove(id).unwrap_or(false) {
            State::Stale
        } else {
            State::Current
        };
        self.state.insert(id.to_owned(), next);
        self.findings.remove(id);
        Ok(())
    }

    /// Berechnung mit Befund beendet; Nachfolger bleiben `stale`. Ein zwischendurch geändertes Element wird
    /// `stale`, weil der Fehler zu veralteten Eingaben gehört.
    pub fn finish_err(&mut self, id: &str, finding: Finding) -> Result<()> {
        self.require(id)?;
        if self.dirty.remove(id).unwrap_or(false) {
            self.state.insert(id.to_owned(), State::Stale);
            self.findings.remove(id);
        } else {
            self.state.insert(id.to_owned(), State::Failed);
            self.findings.insert(id.to_owned(), finding);
        }
        Ok(())
    }

    /// Elemente, die jetzt berechnet werden können: `stale`, alle Eingänge `current`; in der Reihenfolge von
    /// [`deps::order`]. Elemente in Zyklen kommen nie vor.
    pub fn ready(&self, index: &Index) -> Vec<String> {
        let (positions, _) = deps::order_positions(index);
        positions
            .into_iter()
            .filter(|&p| {
                self.get(index.id(p)) == Some(State::Stale)
                    && index
                        .dep_ids(p as usize)
                        .into_iter()
                        .all(|d| self.get(index.id(d)) == Some(State::Current))
            })
            .map(|p| index.id(p).to_owned())
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::doc::Doc;
    use crate::types::TypeRegistry;
    use serde_json::json;

    fn el(id: &str, dep: Option<&str>) -> serde_json::Value {
        let inputs = dep.map_or_else(|| json!({}), |d| json!({"in": format!("{d}.out")}));
        json!({"id": id, "type": "thing", "inputs": inputs, "params": {}, "outputs": {"out": "thing"},
               "content": [], "meta": {"name": id}})
    }

    #[test]
    fn failure_blocks_only_successors() {
        let p = json!({"schema_version": 1, "elements": [el("a", None), el("b", Some("a")), el("x", None)]});
        let Ok((d, _)) = Doc::import(&p, &TypeRegistry::new(), None) else {
            return;
        };
        let Ok(index) = d.build_index() else { return };
        let mut s = States::new(&index);
        assert_eq!(s.ready(&index), ["a", "x"]);
        assert!(s.start("a").is_ok());
        assert!(s
            .finish_err("a", Finding::error("a", "", "a", "failed", "x".into()))
            .is_ok());
        assert_eq!(s.get("b"), Some(State::Stale));
        assert_eq!(s.ready(&index), ["x"]);
        assert!(s.finish_ok("nope").is_err());
    }
}
