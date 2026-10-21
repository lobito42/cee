//! Index über das Dokument: ID → Eltern, Kinder, Eingänge und die Rückrichtung (Nutzer).
//!
//! Der Index ist abgeleitet – er liegt nie im CRDT und wird nie synchronisiert (ADR-032). Er entsteht
//! entweder beim Import aus denselben Daten wie das Dokument, aus einem mitgespeicherten Abbild (siehe
//! [`crate::doc::Doc::save`]) oder, als langsamer Ausweg, durch Lesen jedes Elements aus dem Dokument. Operationen
//! auf Eingängen halten ihn aktuell; Anlegen, Entfernen und Zusammenführen verwerfen ihn.
//! Parameter und Meta eines Elements bereitet erst [`crate::doc::Doc::subgraph`] beim ersten Zugriff auf
//! (Teil-Laden, ADR-050).

use std::collections::{HashMap, HashSet};

use automerge::{AutoCommit, ObjId, ReadDoc, ScalarValueRef as ScalarRef, Value, ValueRef, ROOT};

use crate::schema::parse_reference;
use crate::{Error, Result};

/// Ein Element im Index.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Node {
    /// Element-ID.
    pub id: String,
    /// Elternelemente (Elemente, in deren `content` es steht); meist genau eines, an der Wurzel keines.
    pub parents: Vec<u32>,
    /// Kinder in der Reihenfolge von `content` (nur vorhandene Elemente).
    pub children: Vec<u32>,
    /// Eingänge als (Name, Ziel `<id>.<ausgang>`), nach Name sortiert.
    pub inputs: Vec<(String, String)>,
}

/// Eingang eines Elements, dessen Ziel außerhalb eines Untergraphen liegt.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExternalInput {
    /// Element im Untergraphen.
    pub element: String,
    /// Name des Eingangs.
    pub input: String,
    /// Ziel `<id>.<ausgang>` wie im Dokument.
    pub target: String,
}

/// Rohdaten eines Elements für den Aufbau des Index.
#[derive(Debug, Clone, Default)]
pub(crate) struct Row {
    pub id: String,
    pub inputs: Vec<(String, String)>,
    /// IDs aus `content`, auch solche ohne Element (werden übergangen).
    pub kids: Vec<String>,
}

/// Index über alle Elemente, sortiert nach ID.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Index {
    nodes: Vec<Node>,
    pos: HashMap<String, u32>,
    /// Zu jedem Element die Elemente, die einen Eingang darauf haben (ein Eintrag je Eingang).
    users: Vec<Vec<u32>>,
}

fn idx(n: usize) -> Result<u32> {
    u32::try_from(n).map_err(|_| Error::Model("mehr als 2^32 Elemente".into()))
}

fn put_str(out: &mut Vec<u8>, s: &str) {
    out.extend_from_slice(&u16::try_from(s.len()).unwrap_or(0).to_le_bytes());
    out.extend_from_slice(s.as_bytes());
}

/// Liest Bytes von vorn, ohne je außerhalb zu greifen.
struct Reader<'a>(&'a [u8]);

impl<'a> Reader<'a> {
    fn take(&mut self, n: usize) -> Option<&'a [u8]> {
        let (head, tail) = self.0.split_at_checked(n)?;
        self.0 = tail;
        Some(head)
    }

    fn u16(&mut self) -> Option<u16> {
        Some(u16::from_le_bytes(self.take(2)?.try_into().ok()?))
    }

    fn u32(&mut self) -> Option<u32> {
        Some(u32::from_le_bytes(self.take(4)?.try_into().ok()?))
    }

    fn str(&mut self) -> Option<String> {
        let n = self.u16()? as usize;
        String::from_utf8(self.take(n)?.to_vec()).ok()
    }
}

fn child_obj(doc: &AutoCommit, parent: &ObjId, key: &str) -> Result<Option<ObjId>> {
    match doc.get(parent, key)? {
        Some((Value::Object(_), id)) => Ok(Some(id)),
        Some(_) => Err(Error::Model(format!("`{key}` ist kein Objekt"))),
        None => Ok(None),
    }
}

impl Index {
    /// Baut den Index aus dem Dokument durch Lesen jedes Elements; liest weder Parameter noch Meta. Das ist
    /// der langsame Weg (rund 1,5 s für 100.000 Elemente); schnell geht es über das mitgespeicherte Abbild.
    pub(crate) fn build(doc: &AutoCommit) -> Result<Index> {
        let elems = child_obj(doc, &ROOT, "elements")?
            .ok_or_else(|| Error::Model("`elements` fehlt".into()))?;
        let mut rows = Vec::new();
        for item in doc.map_range(&elems, ..) {
            let obj = item.id();
            let mut row = Row {
                id: item.key.to_string(),
                ..Row::default()
            };
            if let Some(map) = child_obj(doc, &obj, "inputs")? {
                for entry in doc.map_range(&map, ..) {
                    if let ValueRef::Scalar(ScalarRef::Str(target)) = entry.value {
                        row.inputs
                            .push((entry.key.to_string(), target.into_owned()));
                    }
                }
            }
            if let Some(list) = child_obj(doc, &obj, "content")? {
                for entry in doc.list_range(&list, ..) {
                    if let ValueRef::Scalar(ScalarRef::Str(id)) = entry.value {
                        row.kids.push(id.into_owned());
                    }
                }
            }
            rows.push(row);
        }
        Index::from_rows(rows)
    }

    /// Baut den Index aus Rohdaten (ohne das Dokument zu lesen).
    pub(crate) fn from_rows(mut rows: Vec<Row>) -> Result<Index> {
        rows.sort_unstable_by(|a, b| a.id.cmp(&b.id));
        rows.dedup_by(|a, b| a.id == b.id);
        let mut index = Index::default();
        let mut content: Vec<Vec<String>> = Vec::with_capacity(rows.len());
        for mut row in rows {
            row.inputs.sort_unstable_by(|a, b| a.0.cmp(&b.0));
            index.pos.insert(row.id.clone(), idx(index.nodes.len())?);
            index.nodes.push(Node {
                id: row.id,
                inputs: row.inputs,
                ..Node::default()
            });
            content.push(row.kids);
        }
        for (n, kids) in content.into_iter().enumerate() {
            for kid in kids {
                if let Some(&k) = index.pos.get(&kid) {
                    if let Some(node) = index.nodes.get_mut(n) {
                        node.children.push(k);
                    }
                }
            }
        }
        index.link()?;
        Ok(index)
    }

    /// Leitet Eltern und Nutzer aus Kindern und Eingängen ab.
    fn link(&mut self) -> Result<()> {
        self.users = vec![Vec::new(); self.nodes.len()];
        for n in 0..self.nodes.len() {
            let me = idx(n)?;
            let kids = self
                .nodes
                .get(n)
                .map_or_else(Vec::new, |x| x.children.clone());
            for k in kids {
                if let Some(node) = self.nodes.get_mut(k as usize) {
                    node.parents.push(me);
                }
            }
            for dep in self.dep_ids(n) {
                if let Some(list) = self.users.get_mut(dep as usize) {
                    list.push(me);
                }
            }
        }
        Ok(())
    }

    /// Abbild des Index als Bytes (Aufbau siehe [`Index::decode`]); `heads` sind die Köpfe des Dokuments.
    pub(crate) fn encode(&self, heads: &[[u8; 32]]) -> Vec<u8> {
        let count = |n: usize| u32::try_from(n).unwrap_or(0).to_le_bytes();
        let mut out = Vec::with_capacity(self.nodes.len() * 48 + 64);
        out.extend_from_slice(&count(heads.len()));
        for h in heads {
            out.extend_from_slice(h);
        }
        out.extend_from_slice(&count(self.nodes.len()));
        for node in &self.nodes {
            put_str(&mut out, &node.id);
        }
        for node in &self.nodes {
            out.extend_from_slice(&u16::try_from(node.inputs.len()).unwrap_or(0).to_le_bytes());
            for (name, target) in &node.inputs {
                put_str(&mut out, name);
                let resolved = parse_reference(target)
                    .and_then(|(id, output)| self.position(id).map(|p| (p, output)));
                match resolved {
                    Some((p, output)) => {
                        out.extend_from_slice(&p.to_le_bytes());
                        put_str(&mut out, output);
                    }
                    None => {
                        out.extend_from_slice(&u32::MAX.to_le_bytes());
                        put_str(&mut out, target);
                    }
                }
            }
            out.extend_from_slice(&count(node.children.len()));
            for k in &node.children {
                out.extend_from_slice(&k.to_le_bytes());
            }
        }
        out
    }

    /// Liest ein Abbild; `None` bei beschädigten Bytes. Zweiter Wert: die Köpfe des Dokuments, zu denen es gehört.
    ///
    /// Aufbau (Little Endian): Anzahl Köpfe `u32`, je 32 Bytes; Anzahl Elemente `u32`; alle IDs (`u16` Länge,
    /// Bytes); je Element: Anzahl Eingänge `u16`, je Eingang Name (`u16` Länge, Bytes) und Ziel (Position `u32`
    /// plus Ausgang als Text, oder `u32::MAX` plus der ganze Text), Anzahl Kinder `u32`, Positionen `u32`.
    pub(crate) fn decode(bytes: &[u8]) -> Option<(Index, Vec<[u8; 32]>)> {
        let mut r = Reader(bytes);
        let mut heads = Vec::new();
        for _ in 0..r.u32()? {
            heads.push(r.take(32)?.try_into().ok()?);
        }
        let n = r.u32()? as usize;
        let mut index = Index::default();
        for i in 0..n {
            let id = r.str()?;
            index.pos.insert(id.clone(), u32::try_from(i).ok()?);
            index.nodes.push(Node {
                id,
                ..Node::default()
            });
        }
        for i in 0..n {
            let inputs = r.u16()?;
            let mut list = Vec::with_capacity(inputs as usize);
            for _ in 0..inputs {
                let name = r.str()?;
                let dep = r.u32()?;
                let text = r.str()?;
                let target = if dep == u32::MAX {
                    text
                } else {
                    format!("{}.{}", index.nodes.get(dep as usize)?.id, text)
                };
                list.push((name, target));
            }
            let kids = r.u32()? as usize;
            let mut children = Vec::with_capacity(kids.min(n));
            for _ in 0..kids {
                let k = r.u32()?;
                if k as usize >= n {
                    return None;
                }
                children.push(k);
            }
            let node = index.nodes.get_mut(i)?;
            node.inputs = list;
            node.children = children;
        }
        if !r.0.is_empty() {
            return None;
        }
        index.link().ok()?;
        Some((index, heads))
    }

    /// Anzahl der Elemente.
    pub fn len(&self) -> usize {
        self.nodes.len()
    }

    /// `true`, wenn keine Elemente da sind.
    pub fn is_empty(&self) -> bool {
        self.nodes.is_empty()
    }

    /// Position eines Elements.
    pub fn position(&self, id: &str) -> Option<u32> {
        self.pos.get(id).copied()
    }

    /// Element an einer Position.
    pub fn node(&self, n: u32) -> Option<&Node> {
        self.nodes.get(n as usize)
    }

    /// ID an einer Position (leer, wenn es sie nicht gibt).
    pub fn id(&self, n: u32) -> &str {
        self.node(n).map_or("", |x| x.id.as_str())
    }

    /// Alle Elemente, nach ID sortiert.
    pub fn nodes(&self) -> &[Node] {
        &self.nodes
    }

    /// Elemente, die einen Eingang auf `n` haben (je Eingang ein Eintrag).
    pub fn users(&self, n: u32) -> &[u32] {
        self.users.get(n as usize).map_or(&[], Vec::as_slice)
    }

    /// Elemente, von denen `n` abhängt (je Eingang ein Eintrag; Ziele ohne Element fehlen).
    pub fn dep_ids(&self, n: usize) -> Vec<u32> {
        self.nodes.get(n).map_or_else(Vec::new, |node| {
            node.inputs
                .iter()
                .filter_map(|(_, target)| parse_reference(target))
                .filter_map(|(id, _)| self.pos.get(id).copied())
                .collect()
        })
    }

    /// Hält den Index nach `set_input` aktuell.
    pub(crate) fn set_input(&mut self, id: &str, name: &str, target: &str) {
        let Some(n) = self.position(id) else { return };
        let target_dep = parse_reference(target).and_then(|(t, _)| self.position(t));
        let mut old_dep = None;
        if let Some(node) = self.nodes.get_mut(n as usize) {
            match node.inputs.binary_search_by(|(k, _)| k.as_str().cmp(name)) {
                Ok(i) => {
                    if let Some(slot) = node.inputs.get_mut(i) {
                        old_dep = parse_reference(&slot.1).map(|(t, _)| t.to_owned());
                        slot.1 = target.to_owned();
                    }
                }
                Err(i) => node.inputs.insert(i, (name.to_owned(), target.to_owned())),
            }
        }
        if let Some(old) = old_dep.and_then(|t| self.position(&t)) {
            if let Some(list) = self.users.get_mut(old as usize) {
                if let Some(i) = list.iter().position(|&u| u == n) {
                    list.swap_remove(i);
                }
            }
        }
        if let Some(dep) = target_dep {
            if let Some(list) = self.users.get_mut(dep as usize) {
                list.push(n);
            }
        }
    }

    /// Wurzel `root` und alle Nachfahren (Tiefensuche, jedes Element einmal), `None` bei unbekannter ID.
    pub fn subtree(&self, root: &str) -> Option<Vec<u32>> {
        let start = self.position(root)?;
        let mut seen = HashSet::from([start]);
        let mut out = vec![start];
        let mut stack = vec![start];
        while let Some(cur) = stack.pop() {
            for &kid in self.node(cur).map_or(&[][..], |x| x.children.as_slice()) {
                if seen.insert(kid) {
                    out.push(kid);
                    stack.push(kid);
                }
            }
        }
        Some(out)
    }

    /// Eingänge von Elementen aus `members`, deren Ziel-Element nicht in `members` liegt.
    pub fn external_inputs(&self, members: &[u32]) -> Vec<ExternalInput> {
        let inside: HashSet<u32> = members.iter().copied().collect();
        let mut out = Vec::new();
        for &m in members {
            let Some(node) = self.node(m) else { continue };
            for (name, target) in &node.inputs {
                let Some((dep, _)) = parse_reference(target) else {
                    continue;
                };
                let Some(d) = self.position(dep) else {
                    continue;
                };
                if !inside.contains(&d) {
                    out.push(ExternalInput {
                        element: node.id.clone(),
                        input: name.clone(),
                        target: target.clone(),
                    });
                }
            }
        }
        out
    }

    /// Größe des Untergraphen (Element samt Nachfahren) je Element, für Bäume; Verweise auf gemeinsame
    /// Kinder zählen mehrfach.
    pub fn subtree_sizes(&self) -> Vec<usize> {
        let mut size = vec![1_usize; self.nodes.len()];
        let mut state = vec![0_u8; self.nodes.len()];
        for start in 0..self.nodes.len() {
            if state.get(start).copied() != Some(0) {
                continue;
            }
            let mut stack = vec![(start, 0_usize)];
            while let Some((cur, next)) = stack.pop() {
                if next == 0 {
                    if let Some(s) = state.get_mut(cur) {
                        *s = 1;
                    }
                }
                let kids = self
                    .nodes
                    .get(cur)
                    .map_or(&[][..], |x| x.children.as_slice());
                match kids.get(next) {
                    Some(&kid) => {
                        stack.push((cur, next + 1));
                        if state.get(kid as usize).copied() == Some(0) {
                            stack.push((kid as usize, 0));
                        }
                    }
                    None => {
                        if let Some(s) = state.get_mut(cur) {
                            *s = 2;
                        }
                        let total: usize = kids
                            .iter()
                            .map(|&k| size.get(k as usize).copied().unwrap_or(0))
                            .sum();
                        if let Some(s) = size.get_mut(cur) {
                            *s += total;
                        }
                    }
                }
            }
        }
        size
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn row(id: &str, inputs: &[(&str, &str)], kids: &[&str]) -> Row {
        Row {
            id: id.into(),
            inputs: inputs
                .iter()
                .map(|(a, b)| ((*a).into(), (*b).into()))
                .collect(),
            kids: kids.iter().map(|k| (*k).into()).collect(),
        }
    }

    fn small() -> Option<Index> {
        Index::from_rows(vec![
            row("c", &[], &[]),
            row("a", &[], &["c", "zz"]),
            row("b", &[("in", "a.out"), ("raw", "ghost.out")], &[]),
        ])
        .ok()
    }

    #[test]
    fn rows_become_sorted_nodes_with_parents_and_users() {
        let Some(i) = small() else { return };
        assert_eq!(i.id(0), "a");
        assert_eq!(i.node(2).map(|n| n.parents.clone()), Some(vec![0]));
        assert_eq!(i.users(0), &[1]);
        assert_eq!(i.dep_ids(1), vec![0]);
    }

    #[test]
    fn set_input_moves_the_edge() {
        let Some(mut i) = small() else { return };
        i.set_input("b", "in", "c.out");
        assert_eq!(i.users(0), &[] as &[u32]);
        assert_eq!(i.users(2), &[1]);
        i.set_input("b", "other", "a.out");
        assert_eq!(i.users(0), &[1]);
        assert_eq!(i.dep_ids(1).len(), 2);
    }

    #[test]
    fn external_inputs_ignore_inside_targets() {
        let Some(i) = small() else { return };
        assert!(i.external_inputs(&[0, 1]).is_empty());
        assert_eq!(i.external_inputs(&[1]).len(), 1);
    }

    #[test]
    fn encode_decode_roundtrip() {
        let Some(i) = small() else { return };
        let heads = [[7_u8; 32]];
        let bytes = i.encode(&heads);
        let back = Index::decode(&bytes);
        assert!(back.is_some_and(|(b, h)| b == i && h == heads));
        assert!(Index::decode(&bytes[..bytes.len() - 1]).is_none());
        assert!(Index::decode(&[]).is_none());
    }
}
