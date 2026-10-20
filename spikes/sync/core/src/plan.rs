//! Generator für die Szenarien mit bekanntem Sollergebnis (design.md, „Szenario offline“).
//!
//! Baut auf `synth::project`, `synth::editable_ids` und `synth::Rng` aus ap-01 auf. Jede Seite erhält genau
//! `per_side` Operationen. Werte sind eindeutig (A: 100.000 + k, B: 200.000 + k mit k = Position in der
//! Liste der Seite), damit jede Änderung im Ergebnis auffindbar ist. Fest eingebaut:
//!
//! - genau 10 Schlüssel (Element, `params`, Name), die A und B mit verschiedenen Werten setzen,
//! - genau 5 Elemente, die eine Seite entfernt und auf die die andere per `set_input` neu verweist,
//! - genau 5 Elemente, die eine Seite entfernt und deren Parameter die andere ändert.
//!
//! Alle übrigen Änderungen gehen auf getrennte Elementmengen je Seite, damit keine weiteren Konflikte
//! entstehen. `both = false`: A entfernt, B verweist bzw. ändert. `both = true`: die Rollen sind je zur
//! Hälfte verteilt (Verweise 3 : 2, Entfernen gegen Ändern 2 : 3).

use datenmodell::synth::{editable_ids, Rng};
use datenmodell::{Error, Result};
use serde_json::{json, Value as Json};

use crate::SyncOp;

/// Wertkonflikte, gebrochene Referenzen und Fälle „Entfernen gegen Ändern“ je Lauf.
pub const VALUE_CONFLICTS: usize = 10;
pub const BROKEN_REFS: usize = 5;
pub const EDIT_ON_REMOVED: usize = 5;
/// Änderungen je Element bei „Entfernen gegen Ändern“ (alle müssen im Befund stehen).
const EDITS_PER_REMOVED: usize = 2;
const NAMES: [&str; 3] = ["length", "height", "thickness"];

#[derive(Clone, Copy, PartialEq, Eq)]
enum Side {
    A,
    B,
}

/// Entwurf einer Operation; der Wert ergibt sich erst aus der Position.
enum Draft {
    Param(String, String),
    Input(String, String, String),
    Remove(String),
}

/// Operationen beider Seiten.
pub struct Plan {
    pub a: Vec<SyncOp>,
    pub b: Vec<SyncOp>,
}

impl Plan {
    pub fn to_json(&self) -> Json {
        json!({
            "a": self.a.iter().map(SyncOp::to_json).collect::<Vec<_>>(),
            "b": self.b.iter().map(SyncOp::to_json).collect::<Vec<_>>(),
        })
    }
}

fn shuffle<T>(items: &mut [T], rng: &mut Rng) {
    for i in (1..items.len()).rev() {
        let j = rng.below(i + 1);
        items.swap(i, j);
    }
}

/// Plan für das Szenario offline (`both = false`) bzw. `offline --both` (`both = true`).
pub fn offline(n: usize, per_side: usize, seed: u64, both: bool) -> Result<Plan> {
    let mut rng = Rng::new(seed);
    let mut ids = editable_ids(n);
    let special = BROKEN_REFS * 2 + EDIT_ON_REMOVED + VALUE_CONFLICTS;
    if ids.len() < special + 20 {
        return Err(Error::Model(format!("Projekt mit {n} Elementen zu klein")));
    }
    shuffle(&mut ids, &mut rng);
    let rest = ids.split_off(special);
    let conflict_ids = ids.split_off(BROKEN_REFS * 2 + EDIT_ON_REMOVED);
    let eor_targets = ids.split_off(BROKEN_REFS * 2);
    let holders = ids.split_off(BROKEN_REFS);
    let ref_targets = ids;
    let pool_a: Vec<String> = rest.iter().step_by(2).cloned().collect();
    let pool_b: Vec<String> = rest.iter().skip(1).step_by(2).cloned().collect();

    let mut drafts_a: Vec<Draft> = Vec::new();
    let mut drafts_b: Vec<Draft> = Vec::new();
    let side_list = |side: Side, a: &mut Vec<Draft>, b: &mut Vec<Draft>, d: Draft| match side {
        Side::A => a.push(d),
        Side::B => b.push(d),
    };
    let other = |s: Side| if s == Side::A { Side::B } else { Side::A };

    // Gebrochene Referenzen: eine Seite entfernt, die andere verweist neu auf den Ausgang `solid`.
    for (k, (target, holder)) in ref_targets.iter().zip(&holders).enumerate() {
        let remover = if !both || k < 3 { Side::A } else { Side::B };
        side_list(
            remover,
            &mut drafts_a,
            &mut drafts_b,
            Draft::Remove(target.clone()),
        );
        side_list(
            other(remover),
            &mut drafts_a,
            &mut drafts_b,
            Draft::Input(
                holder.clone(),
                format!("link_{k}"),
                format!("{target}.solid"),
            ),
        );
    }
    // Entfernen gegen Ändern: eine Seite entfernt, die andere ändert Parameter des Elements.
    for (k, target) in eor_targets.iter().enumerate() {
        let remover = if !both || k < 2 { Side::A } else { Side::B };
        side_list(
            remover,
            &mut drafts_a,
            &mut drafts_b,
            Draft::Remove(target.clone()),
        );
        for name in NAMES.iter().take(EDITS_PER_REMOVED) {
            side_list(
                other(remover),
                &mut drafts_a,
                &mut drafts_b,
                Draft::Param(target.clone(), (*name).to_owned()),
            );
        }
    }
    // Wertkonflikte: beide Seiten setzen denselben Schlüssel.
    for id in &conflict_ids {
        let name = NAMES[rng.below(NAMES.len())].to_owned();
        drafts_a.push(Draft::Param(id.clone(), name.clone()));
        drafts_b.push(Draft::Param(id.clone(), name));
    }

    let a = fill(drafts_a, &pool_a, per_side, 100_000, &mut rng)?;
    let b = fill(drafts_b, &pool_b, per_side, 200_000, &mut rng)?;
    Ok(Plan { a, b })
}

/// Füllt die Sonderfälle mit zufälligen Änderungen aus `pool` auf `per_side` Operationen auf, verteilt die
/// Sonderfälle zufällig und vergibt die Werte `base + Position`.
fn fill(
    special: Vec<Draft>,
    pool: &[String],
    per_side: usize,
    base: i64,
    rng: &mut Rng,
) -> Result<Vec<SyncOp>> {
    if special.len() > per_side || pool.is_empty() {
        return Err(Error::Model("zu wenige Operationen je Seite".into()));
    }
    let mut drafts: Vec<Draft> = (0..per_side - special.len())
        .map(|_| {
            Draft::Param(
                pool[rng.below(pool.len())].clone(),
                NAMES[rng.below(NAMES.len())].to_owned(),
            )
        })
        .collect();
    for d in special {
        let pos = rng.below(drafts.len() + 1);
        drafts.insert(pos, d);
    }
    Ok(drafts
        .into_iter()
        .enumerate()
        .map(|(k, d)| match d {
            Draft::Param(id, name) => SyncOp::SetParam {
                id,
                name,
                value: json!(base + k as i64),
            },
            Draft::Input(id, name, reference) => SyncOp::SetInput {
                id,
                name,
                reference,
            },
            Draft::Remove(id) => SyncOp::RemoveElement { id },
        })
        .collect())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{Peer, SyncState};
    use std::collections::{HashMap, HashSet};

    fn sync_all(a: &mut Peer, b: &mut Peer) {
        let (mut sa, mut sb) = (SyncState::new(), SyncState::new());
        loop {
            let mut quiet = true;
            if let Some(m) = a.generate(&mut sa) {
                b.receive(&mut sb, &m).expect("b");
                quiet = false;
            }
            if let Some(m) = b.generate(&mut sb) {
                a.receive(&mut sa, &m).expect("a");
                quiet = false;
            }
            if quiet {
                return;
            }
        }
    }

    fn removed(ops: &[SyncOp]) -> HashSet<String> {
        ops.iter()
            .filter_map(|o| match o {
                SyncOp::RemoveElement { id } => Some(id.clone()),
                _ => None,
            })
            .collect()
    }

    fn keys(ops: &[SyncOp]) -> HashMap<(String, String), Json> {
        ops.iter()
            .filter_map(|o| match o {
                SyncOp::SetParam { id, name, value } => {
                    Some(((id.clone(), name.clone()), value.clone()))
                }
                _ => None,
            })
            .collect()
    }

    #[test]
    fn plan_has_exact_cases_and_merges_with_all_findings() {
        for both in [false, true] {
            let plan = offline(2000, 120, 7, both).expect("plan");
            assert_eq!((plan.a.len(), plan.b.len()), (120, 120));
            let (ra, rb) = (removed(&plan.a), removed(&plan.b));
            let (ka, kb) = (keys(&plan.a), keys(&plan.b));
            let shared = ka
                .keys()
                .filter(|k| kb.contains_key(*k) && !ra.contains(&k.0) && !rb.contains(&k.0))
                .count();
            assert_eq!(shared, VALUE_CONFLICTS);
            assert_eq!(ra.len() + rb.len(), BROKEN_REFS + EDIT_ON_REMOVED);

            let mut server = Peer::synth(2000).expect("server");
            let mut a = Peer::empty();
            let mut b = Peer::empty();
            sync_all(&mut server, &mut a);
            sync_all(&mut server, &mut b);
            plan.a.iter().for_each(|o| a.apply(o).expect("a"));
            plan.b.iter().for_each(|o| b.apply(o).expect("b"));
            sync_all(&mut server, &mut a);
            sync_all(&mut server, &mut b);
            sync_all(&mut server, &mut a);
            assert_eq!(a.hash().expect("a"), server.hash().expect("s"));
            assert_eq!(b.hash().expect("b"), server.hash().expect("s"));
            let found = server.findings().expect("befunde");
            let count = |kind: &str| {
                found
                    .as_array()
                    .expect("liste")
                    .iter()
                    .filter(|f| f["kind"] == kind)
                    .count()
            };
            assert_eq!(count("conflict"), VALUE_CONFLICTS, "{found}");
            assert_eq!(count("broken_reference"), BROKEN_REFS, "{found}");
            assert_eq!(count("edit_on_removed"), EDIT_ON_REMOVED, "{found}");
        }
    }
}
