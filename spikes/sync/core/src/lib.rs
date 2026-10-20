//! Sync-Funktionen für den Sync-Spike (ap-03), einmal für NIF und WASM.
//!
//! Kein Produktcode. Alle Datenmodell-Logik kommt aus dem ap-01-Prototyp (`datenmodell`); dieses Crate
//! ergänzt nur, was der Abgleich über das Netz braucht:
//!
//! - [`SyncOp`]: Operationsliste aus ap-01, erweitert um `set_input` und `remove_element`,
//! - [`Peer`]: ein Teilnehmer (Server oder Client) mit Automerge-Sync-Protokoll, Hash, Projekt-JSON,
//! - [`findings`]: Befunde nach dem Zusammenführen, darunter `edit_on_removed`,
//! - [`plan`]: Generator für das Offline-Szenario mit bekanntem Sollergebnis.

pub mod findings;
pub mod plan;

use automerge::sync::{Message, State, SyncDoc};
use datenmodell::{synth, Error, Result, Store};
use serde_json::{json, Value as Json};

pub use automerge::sync::State as SyncState;

/// IDs der änderbaren Elemente eines synthetischen Projekts aus ap-01 mit `n` Elementen.
pub fn datenmodell_editable_ids(n: usize) -> Vec<String> {
    synth::editable_ids(n)
}

/// Eine Operation auf dem Graphen (Format von `ops.json`, erweitert gegenüber ap-01).
#[derive(Debug, Clone, PartialEq)]
pub enum SyncOp {
    SetParam {
        id: String,
        name: String,
        value: Json,
    },
    SetInput {
        id: String,
        name: String,
        reference: String,
    },
    RemoveElement {
        id: String,
    },
}

impl SyncOp {
    /// Liest eine Operation `{"op": "set_param" | "set_input" | "remove_element", …}`.
    pub fn from_json(raw: &Json) -> Result<SyncOp> {
        let field = |k: &str| {
            raw.get(k)
                .ok_or_else(|| Error::Json(format!("Operation ohne Feld `{k}`")))
        };
        let str_field = |k: &str| -> Result<String> {
            field(k)?
                .as_str()
                .map(str::to_owned)
                .ok_or_else(|| Error::Json(format!("Feld `{k}` muss ein String sein")))
        };
        match str_field("op")?.as_str() {
            "set_param" => Ok(SyncOp::SetParam {
                id: str_field("id")?,
                name: str_field("name")?,
                value: field("value")?.clone(),
            }),
            "set_input" => Ok(SyncOp::SetInput {
                id: str_field("id")?,
                name: str_field("name")?,
                reference: str_field("ref")?,
            }),
            "remove_element" => Ok(SyncOp::RemoveElement {
                id: str_field("id")?,
            }),
            other => Err(Error::Json(format!("unbekannte Operation `{other}`"))),
        }
    }

    /// Liest eine einzelne Operation oder eine Liste aus JSON-Text.
    pub fn parse(text: &str) -> Result<Vec<SyncOp>> {
        let raw: Json = serde_json::from_str(text)?;
        match &raw {
            Json::Array(list) => list.iter().map(SyncOp::from_json).collect(),
            single => Ok(vec![SyncOp::from_json(single)?]),
        }
    }

    /// Operation als JSON (Format von `ops.json`).
    pub fn to_json(&self) -> Json {
        match self {
            SyncOp::SetParam { id, name, value } => {
                json!({"op": "set_param", "id": id, "name": name, "value": value})
            }
            SyncOp::SetInput {
                id,
                name,
                reference,
            } => json!({"op": "set_input", "id": id, "name": name, "ref": reference}),
            SyncOp::RemoveElement { id } => json!({"op": "remove_element", "id": id}),
        }
    }
}

/// Ein Teilnehmer am Abgleich: der Server (NIF) oder ein Client (WASM). Der Server ist Teilnehmer wie
/// jeder Client; je Verbindung gibt es einen eigenen [`SyncState`].
pub struct Peer {
    store: Store,
}

impl Peer {
    /// Leerer Teilnehmer, der den Stand erst über den Abgleich erhält (Client beim ersten Beitritt).
    pub fn empty() -> Peer {
        Peer {
            store: Store::empty(),
        }
    }

    /// Synthetisches Projekt mit `n` Elementen aus ap-01 (Server beim ersten Beitritt).
    pub fn synth(n: usize) -> Result<Peer> {
        Ok(Peer {
            store: Store::from_project(&synth::project(n))?,
        })
    }

    /// `true`, sobald das Dokument die Grundstruktur hat (nach dem ersten Abgleich).
    pub fn ready(&self) -> bool {
        self.store.len().is_ok()
    }

    /// Wendet eine Operation an (eine Änderung in der Historie).
    pub fn apply(&mut self, op: &SyncOp) -> Result<()> {
        match op {
            SyncOp::SetParam { id, name, value } => self.store.set_param(id, name, value),
            SyncOp::SetInput {
                id,
                name,
                reference,
            } => self.store.set_input(id, name, reference),
            SyncOp::RemoveElement { id } => self.store.remove_element(id),
        }
    }

    /// Wendet eine Operation oder Liste (JSON-Text) an und gibt die Anzahl zurück.
    pub fn apply_json(&mut self, text: &str) -> Result<usize> {
        let ops = SyncOp::parse(text)?;
        for op in &ops {
            self.apply(op)?;
        }
        Ok(ops.len())
    }

    /// Nächste Sync-Nachricht für die Gegenstelle mit `state`; `None`, wenn nichts zu senden ist.
    pub fn generate(&mut self, state: &mut State) -> Option<Vec<u8>> {
        self.store
            .doc_mut()
            .sync()
            .generate_sync_message(state)
            .map(Message::encode)
    }

    /// Empfangene Sync-Nachricht anwenden. Ungültige Nachrichten sind ein Fehler, nie ein Panic; das
    /// Dokument bleibt dann unverändert.
    pub fn receive(&mut self, state: &mut State, bytes: &[u8]) -> Result<()> {
        let message = Message::decode(bytes)
            .map_err(|e| Error::Automerge(format!("ungültige Sync-Nachricht: {e}")))?;
        self.store
            .doc_mut()
            .sync()
            .receive_sync_message(state, message)?;
        Ok(())
    }

    /// Köpfe der Historie (hex, sortiert). Gleiche Köpfe heißen gleicher Inhalt.
    pub fn heads(&mut self) -> Vec<String> {
        let mut heads: Vec<String> = self
            .store
            .doc_mut()
            .get_heads()
            .iter()
            .map(ToString::to_string)
            .collect();
        heads.sort();
        heads
    }

    /// Inhalts-Hash über die kanonische Form (wie ap-01).
    pub fn hash(&self) -> Result<String> {
        self.store.hash()
    }

    /// Kanonisches Projekt-JSON (wie `from-text` in ap-01: sortierte Schlüssel, zwei Leerzeichen).
    pub fn project_json(&self) -> Result<String> {
        datenmodell::canonical_pretty(&self.store.to_project()?)
    }

    /// Wert eines Felds als JSON; `None`, wenn Element oder Eintrag fehlen (z. B. vor dem Abgleich).
    pub fn field(&self, id: &str, field: &str, name: &str) -> Option<Json> {
        self.store.field(id, field, name).ok().flatten()
    }

    /// Befunde nach dem Zusammenführen (volle Prüfung, auf Abruf; nicht im Latenzpfad).
    pub fn findings(&mut self) -> Result<Json> {
        findings::all(&mut self.store)
    }

    /// Größe des gespeicherten Dokuments in Bytes (Beobachtung).
    pub fn saved_len(&mut self) -> usize {
        self.store.save().len()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Tauscht Sync-Nachrichten aus, bis keine Seite mehr etwas sendet. Liefert die Zahl der Nachrichten.
    fn sync_pair(a: &mut Peer, sa: &mut State, b: &mut Peer, sb: &mut State) -> usize {
        let mut count = 0;
        loop {
            let mut quiet = true;
            if let Some(m) = a.generate(sa) {
                b.receive(sb, &m).expect("b empfängt");
                quiet = false;
                count += 1;
            }
            if let Some(m) = b.generate(sb) {
                a.receive(sa, &m).expect("a empfängt");
                quiet = false;
                count += 1;
            }
            if quiet {
                return count;
            }
            assert!(count < 100, "Abgleich endet nicht");
        }
    }

    #[test]
    fn two_documents_reach_same_hash_only_via_sync_messages() {
        let mut server = Peer::synth(500).expect("server");
        let mut client = Peer::empty();
        assert!(!client.ready());
        let (mut s_state, mut c_state) = (State::new(), State::new());
        sync_pair(&mut server, &mut s_state, &mut client, &mut c_state);
        assert!(client.ready());
        assert_eq!(client.hash().expect("c"), server.hash().expect("s"));

        // Änderungen auf beiden Seiten, auch gleichzeitige, nur über Sync-Nachrichten abgleichen.
        let ids = synth::editable_ids(500);
        client
            .apply(&SyncOp::SetParam {
                id: ids[0].clone(),
                name: "length".into(),
                value: json!(4711),
            })
            .expect("client");
        server
            .apply(&SyncOp::SetInput {
                id: ids[1].clone(),
                name: "link".into(),
                reference: format!("{}.solid", ids[2]),
            })
            .expect("server");
        server
            .apply(&SyncOp::RemoveElement { id: ids[3].clone() })
            .expect("entfernen");
        sync_pair(&mut server, &mut s_state, &mut client, &mut c_state);
        assert_eq!(client.heads(), server.heads());
        assert_eq!(client.hash().expect("c"), server.hash().expect("s"));
        assert_eq!(server.field(&ids[0], "params", "length"), Some(json!(4711)));
        assert_eq!(client.field(&ids[3], "params", "length"), None);
    }

    #[test]
    fn invalid_sync_message_is_an_error_and_changes_nothing() {
        let mut server = Peer::synth(50).expect("server");
        let before = server.hash().expect("hash");
        let mut state = State::new();
        assert!(server.receive(&mut state, b"kein sync").is_err());
        assert!(server.receive(&mut state, &[0x42, 0xff, 0xff]).is_err());
        assert_eq!(server.hash().expect("hash"), before);
    }

    #[test]
    fn ops_roundtrip_as_json() {
        let ops = [
            SyncOp::SetParam {
                id: "a".into(),
                name: "x".into(),
                value: json!(1),
            },
            SyncOp::SetInput {
                id: "a".into(),
                name: "in".into(),
                reference: "b.out".into(),
            },
            SyncOp::RemoveElement { id: "b".into() },
        ];
        let text = Json::Array(ops.iter().map(SyncOp::to_json).collect()).to_string();
        assert_eq!(SyncOp::parse(&text).expect("lesen"), ops);
        assert!(SyncOp::parse(r#"{"op": "unbekannt"}"#).is_err());
    }
}
