//! Abhängigkeitsgraph aus den Eingängen: Zyklen, stabile Reihenfolge, betroffene Elemente (ADR-025, ADR-029).
//!
//! Kante: Hat Element `b` einen Eingang `a.out`, hängt `b` von `a` ab. `content` ist Enthaltensein und keine
//! Berechnungsabhängigkeit; ein Element ist aber betroffen, wenn ein Element seines Untergraphen betroffen ist
//! (das Ergebnis des Elternteils ändert sich mit).

use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashSet};

use crate::index::Index;
use crate::schema::parse_reference;
use crate::{Error, Result};

/// Grund, warum ein Element nicht in der Reihenfolge steht.
pub const REASON_CYCLE: &str = "cycle";
/// Das Element hängt (transitiv) von einem Element in einem Zyklus ab.
pub const REASON_DEPENDS_ON_CYCLE: &str = "depends_on_cycle";

/// Ausgelassenes Element der Reihenfolge.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Skipped {
    /// Element-ID.
    pub element: String,
    /// [`REASON_CYCLE`] oder [`REASON_DEPENDS_ON_CYCLE`].
    pub reason: &'static str,
}

/// Reihenfolge der Berechnung samt ausgelassenen Elementen.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Order {
    /// Topologische Reihenfolge: jedes Element nach allen, von denen es abhängt.
    pub order: Vec<String>,
    /// Elemente in Zyklen und ihre Nachfolger, nach ID sortiert.
    pub skipped: Vec<Skipped>,
}

/// Reihenfolge als Positionen; zweiter Teil: ausgelassene Positionen mit `true`, wenn sie selbst im Zyklus liegen.
pub(crate) fn order_positions(index: &Index) -> (Vec<u32>, Vec<(u32, bool)>) {
    let n = index.len();
    let mut indegree: Vec<usize> = (0..n).map(|i| index.dep_ids(i).len()).collect();
    let mut heap: BinaryHeap<Reverse<(&str, u32)>> = BinaryHeap::new();
    for (i, node) in index.nodes().iter().enumerate() {
        if indegree.get(i).copied() == Some(0) {
            heap.push(Reverse((node.id.as_str(), i as u32)));
        }
    }
    let mut order = Vec::with_capacity(n);
    let mut done = vec![false; n];
    while let Some(Reverse((_, cur))) = heap.pop() {
        order.push(cur);
        if let Some(d) = done.get_mut(cur as usize) {
            *d = true;
        }
        for &user in index.users(cur) {
            if let Some(deg) = indegree.get_mut(user as usize) {
                *deg = deg.saturating_sub(1);
                if *deg == 0 {
                    heap.push(Reverse((index.id(user), user)));
                }
            }
        }
    }
    if order.len() == n {
        return (order, Vec::new());
    }
    let rest: Vec<u32> = (0..n as u32)
        .filter(|&i| !done.get(i as usize).copied().unwrap_or(true))
        .collect();
    let in_cycle = cycle_positions(index, &rest);
    let skipped = rest
        .into_iter()
        .map(|i| (i, in_cycle.contains(&i)))
        .collect();
    (order, skipped)
}

/// Positionen aus `rest`, die auf einem Zyklus liegen (starke Zusammenhangskomponenten mit mehr als einem
/// Element oder Selbstverweis), iterativer Tarjan über die Kanten Element → Nutzer.
fn cycle_positions(index: &Index, rest: &[u32]) -> HashSet<u32> {
    let members: HashSet<u32> = rest.iter().copied().collect();
    let mut number: std::collections::HashMap<u32, usize> = std::collections::HashMap::new();
    let mut low: std::collections::HashMap<u32, usize> = std::collections::HashMap::new();
    let mut on_stack: HashSet<u32> = HashSet::new();
    let mut stack: Vec<u32> = Vec::new();
    let mut found = HashSet::new();
    let mut counter = 0_usize;
    for &start in rest {
        if number.contains_key(&start) {
            continue;
        }
        let mut work: Vec<(u32, usize)> = vec![(start, 0)];
        while let Some((cur, next)) = work.pop() {
            if next == 0 {
                number.insert(cur, counter);
                low.insert(cur, counter);
                counter += 1;
                stack.push(cur);
                on_stack.insert(cur);
            }
            let succ: Vec<u32> = index
                .users(cur)
                .iter()
                .copied()
                .filter(|u| members.contains(u))
                .collect();
            if let Some(&w) = succ.get(next) {
                work.push((cur, next + 1));
                if w == cur {
                    found.insert(cur);
                } else if !number.contains_key(&w) {
                    work.push((w, 0));
                } else if on_stack.contains(&w) {
                    let wn = number.get(&w).copied().unwrap_or(0);
                    if let Some(l) = low.get_mut(&cur) {
                        *l = (*l).min(wn);
                    }
                }
                continue;
            }
            // alle Nachfolger gesehen: Komponente abschließen und Wert an den Aufrufer geben
            let l = low.get(&cur).copied().unwrap_or(0);
            if l == number.get(&cur).copied().unwrap_or(0) {
                let mut comp = Vec::new();
                while let Some(top) = stack.pop() {
                    on_stack.remove(&top);
                    comp.push(top);
                    if top == cur {
                        break;
                    }
                }
                if comp.len() > 1 {
                    found.extend(comp);
                }
            }
            if let Some(&(parent, _)) = work.last() {
                if let Some(pl) = low.get_mut(&parent) {
                    *pl = (*pl).min(l);
                }
            }
        }
    }
    found
}

/// Stabile Berechnungsreihenfolge; Gleichstand nach ID. Elemente in Zyklen und ihre Nachfolger stehen in
/// `skipped`, der Rest bleibt berechenbar.
pub fn order(index: &Index) -> Order {
    let (positions, skipped) = order_positions(index);
    let mut skipped: Vec<Skipped> = skipped
        .into_iter()
        .map(|(i, cyc)| Skipped {
            element: index.id(i).to_owned(),
            reason: if cyc {
                REASON_CYCLE
            } else {
                REASON_DEPENDS_ON_CYCLE
            },
        })
        .collect();
    skipped.sort_by(|a, b| a.element.cmp(&b.element));
    Order {
        order: positions.iter().map(|&i| index.id(i).to_owned()).collect(),
        skipped,
    }
}

/// IDs der Elemente auf einem Zyklus, sortiert.
pub fn cycle_members(index: &Index) -> Vec<String> {
    let (_, skipped) = order_positions(index);
    let mut ids: Vec<String> = skipped
        .into_iter()
        .filter(|&(_, cyc)| cyc)
        .map(|(i, _)| index.id(i).to_owned())
        .collect();
    ids.sort();
    ids
}

/// Betroffene Elemente nach Änderung von `changed`: sie selbst, alle transitiv abhängigen Elemente und von
/// jedem dieser Elemente die Eltern (transitiv). Mehrere IDs ergeben die Vereinigung; Ergebnis nach ID sortiert.
pub fn affected(index: &Index, changed: &[&str]) -> Result<Vec<String>> {
    Ok(affected_positions(index, changed)?
        .into_iter()
        .map(|p| index.id(p).to_owned())
        .collect())
}

/// Wie [`affected`], aber als Positionen im Index (aufsteigend, das entspricht der Reihenfolge nach ID).
pub fn affected_positions(index: &Index, changed: &[&str]) -> Result<Vec<u32>> {
    let mut seen = vec![false; index.len()];
    let mut found = Vec::new();
    for id in changed {
        let p = index
            .position(id)
            .ok_or_else(|| Error::UnknownElement(format!("`{id}`")))?;
        if let Some(s) = seen.get_mut(p as usize) {
            if !*s {
                *s = true;
                found.push(p);
            }
        }
    }
    let mut next_at = 0;
    while let Some(&cur) = found.get(next_at) {
        next_at += 1;
        let parents = index.node(cur).map_or(&[][..], |n| n.parents.as_slice());
        for &next in index.users(cur).iter().chain(parents) {
            if let Some(s) = seen.get_mut(next as usize) {
                if !*s {
                    *s = true;
                    found.push(next);
                }
            }
        }
    }
    found.sort_unstable();
    Ok(found)
}

/// `true`, wenn ein Eingang `id` ← `target` einen Zyklus schließen würde (auch ein Selbstverweis).
pub fn would_cycle(index: &Index, id: &str, target: &str) -> bool {
    let (Some(me), Some(dep)) = (
        index.position(id),
        parse_reference(target).and_then(|(t, _)| index.position(t)),
    ) else {
        return false;
    };
    if me == dep {
        return true;
    }
    // `id` würde von `dep` abhängen; ein Zyklus entsteht, wenn `dep` schon (transitiv) von `id` abhängt.
    let mut seen = HashSet::from([dep]);
    let mut stack = vec![dep];
    while let Some(cur) = stack.pop() {
        for d in index.dep_ids(cur as usize) {
            if d == me {
                return true;
            }
            if seen.insert(d) {
                stack.push(d);
            }
        }
    }
    false
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::doc::{Doc, Op};
    use crate::types::TypeRegistry;
    use serde_json::{json, Value as Json};

    fn el(id: &str, input: Option<&str>) -> Json {
        let inputs = input.map_or_else(|| json!({}), |t| json!({"in": format!("{t}.out")}));
        json!({"id": id, "type": "thing", "inputs": inputs, "params": {}, "outputs": {"out": "thing"},
               "content": [], "meta": {"name": id}})
    }

    fn doc(elements: Vec<Json>) -> Option<Doc> {
        let reg = TypeRegistry::new();
        Doc::import(
            &json!({"schema_version": 1, "elements": elements}),
            &reg,
            None,
        )
        .ok()
        .map(|(d, _)| d)
    }

    #[test]
    fn chain_orders_and_rejects_a_cycle() {
        let reg = TypeRegistry::new();
        let d = doc(vec![el("c", Some("b")), el("b", Some("a")), el("a", None)]);
        let Some(mut d) = d else { return };
        let o = d.order();
        assert!(o.is_ok_and(|o| o.order == ["a", "b", "c"] && o.skipped.is_empty()));
        let bad = Op::SetInput {
            id: "a".into(),
            name: "in".into(),
            target: "c.out".into(),
        };
        let before = d.hash().ok();
        assert!(matches!(d.apply(&bad, &reg), Err(Error::Cycle(_))));
        assert_eq!(d.hash().ok(), before);
    }

    #[test]
    fn cycle_from_merge_skips_members_and_successors() {
        let reg = TypeRegistry::new();
        let d = doc(vec![
            el("a", None),
            el("b", None),
            el("d", Some("a")),
            el("f", None),
        ]);
        let Some(mut base) = d else { return };
        let mut other = base.fork();
        let set = |id: &str, t: &str| Op::SetInput {
            id: id.into(),
            name: "in".into(),
            target: format!("{t}.out"),
        };
        assert!(base.apply(&set("a", "b"), &reg).is_ok());
        assert!(other.apply(&set("b", "a"), &reg).is_ok());
        assert!(base.merge(&mut other).is_ok());
        let Ok(o) = base.order() else { return };
        assert_eq!(o.order, ["f"]);
        let reasons: Vec<_> = o
            .skipped
            .iter()
            .map(|s| (s.element.as_str(), s.reason))
            .collect();
        assert_eq!(
            reasons,
            [
                ("a", REASON_CYCLE),
                ("b", REASON_CYCLE),
                ("d", REASON_DEPENDS_ON_CYCLE)
            ]
        );
    }
}
