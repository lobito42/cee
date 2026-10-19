//! Erzeugt synthetische Projekte und Operationsfolgen für Messungen – deterministisch über einen Seed.
//!
//! Aufbau: ein Ursprung, 20 Materialien und Gruppen mit je bis zu 99 Elementen im Untergraphen. Jedes
//! Element hat dieselbe Form wie im Beispielprojekt (drei Zahlen-Parameter, zwei Eingänge, ein Ausgang,
//! ein Meta-Eintrag). Die IDs lauten `e<nummer>` mit fester Breite.

use serde_json::{json, Value as Json};

use crate::Op;

/// Kleiner deterministischer Zufallsgenerator (xorshift64*), gleich auf allen Plattformen.
#[derive(Debug, Clone)]
pub struct Rng(u64);

impl Rng {
    pub fn new(seed: u64) -> Rng {
        Rng(seed.wrapping_mul(0x9E37_79B9_7F4A_7C15) | 1)
    }

    pub fn next_u64(&mut self) -> u64 {
        let mut x = self.0;
        x ^= x >> 12;
        x ^= x << 25;
        x ^= x >> 27;
        self.0 = x;
        x.wrapping_mul(0x2545_F491_4F6C_DD1D)
    }

    /// Gleichverteilt in `0..n` (`n > 0`).
    pub fn below(&mut self, n: usize) -> usize {
        if n == 0 {
            return 0;
        }
        (self.next_u64() % n as u64) as usize
    }
}

/// ID des `i`-ten synthetischen Elements.
pub fn element_id(i: usize) -> String {
    format!("e{i:06}")
}

const MATERIALS: usize = 20;
const GROUP: usize = 100;
const KINDS: [&str; 6] = ["wall", "slab", "part", "sketch", "extrude", "frame"];

/// Projekt mit genau `n` Elementen (mindestens 1 + Materialien).
pub fn project(n: usize) -> Json {
    let mut elements = vec![json!({
        "id": element_id(0), "type": "origin", "inputs": {}, "params": {"x": 0, "y": 0, "z": 0},
        "outputs": {"frame": "frame"}, "content": [], "meta": {"name": "Ursprung"}
    })];
    let materials = MATERIALS.min(n.saturating_sub(1));
    for m in 1..=materials {
        elements.push(json!({
            "id": element_id(m), "type": "material", "inputs": {},
            "params": {"alpha": {"125": 0.1, "250": 0.2, "500": 0.3, "1000": 0.4, "2000": 0.5, "4000": 0.6},
                       "density": 1000 + m},
            "outputs": {"material": "material"}, "content": [], "meta": {"name": format!("Material {m}")}
        }));
    }
    let mut next = materials + 1;
    while next < n {
        let group_id = element_id(next);
        next += 1;
        let mut children = Vec::new();
        while next < n && children.len() < GROUP - 1 {
            let i = next;
            let material = element_id(1 + i % materials.max(1));
            children.push(json!({
                "id": element_id(i), "type": KINDS[i % KINDS.len()],
                "inputs": {"parent": format!("{group_id}.group"), "material": format!("{material}.material")},
                "params": {"length": 1000 + (i % 5000), "height": 3000, "thickness": 175},
                "outputs": {"solid": "solid"}, "content": [], "meta": {"name": format!("Element {i}")}
            }));
            next += 1;
        }
        elements.push(json!({
            "id": group_id, "type": "group", "inputs": {"origin": format!("{}.frame", element_id(0))},
            "params": {"elevation": 0}, "outputs": {"group": "group"}, "content": children,
            "meta": {"name": "Gruppe"}
        }));
    }
    json!({"schema_version": 1, "elements": elements})
}

/// IDs der änderbaren Elemente (ohne Ursprung, Materialien und Gruppen) eines Projekts aus `project(n)`.
pub fn editable_ids(n: usize) -> Vec<String> {
    let materials = MATERIALS.min(n.saturating_sub(1));
    (materials + 1..n)
        .filter(|i| !(i - materials - 1).is_multiple_of(GROUP))
        .map(element_id)
        .collect()
}

/// `count` zufällige Parameteränderungen auf den änderbaren Elementen.
pub fn ops(n: usize, count: usize, seed: u64) -> Vec<Op> {
    let ids = editable_ids(n);
    let mut rng = Rng::new(seed);
    let names = ["length", "height", "thickness"];
    (0..count)
        .map(|k| Op::SetParam {
            id: ids[rng.below(ids.len())].clone(),
            name: names[rng.below(names.len())].to_owned(),
            value: Json::from(1000 + (k as i64 % 4000)),
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn walk(elements: &[Json], out: &mut Vec<String>) {
        for e in elements {
            out.push(e["id"].as_str().unwrap_or_default().to_owned());
            walk(e["content"].as_array().map_or(&[][..], |v| v), out);
        }
    }

    #[test]
    fn project_has_exactly_n_elements() {
        for n in [1, 5, 21, 22, 121, 1000] {
            let p = project(n);
            let mut ids = Vec::new();
            walk(p["elements"].as_array().expect("liste"), &mut ids);
            assert_eq!(ids.len(), n, "n={n}");
        }
    }

    #[test]
    fn editable_ids_are_not_groups() {
        let p = project(250);
        let mut groups = Vec::new();
        for e in p["elements"].as_array().expect("liste") {
            if e["type"] == "group" {
                groups.push(e["id"].as_str().expect("id").to_owned());
            }
        }
        let editable = editable_ids(250);
        assert!(editable.iter().all(|id| !groups.contains(id)));
        assert_eq!(editable.len() + groups.len() + 21, 250);
    }
}
