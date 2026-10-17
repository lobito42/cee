# Regeln für den Rust-Kern (crates/)

- Der Kern ist die einzige Implementierung des Datenmodells (ADR-029). Server, Client und SDK rufen ihn
  auf und bauen keine eigene Logik für Elemente, Abhängigkeiten oder Merge nach.
- Jedes Element hat dieselbe Form (`id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`) –
  ein Achsenursprung genauso wie eine Baugruppe (ADR-028). Keine Sonderfälle je Elementtyp im Speicherformat.
- IDs sind stabil und werden nie wiederverwendet. Referenzen gehen auf `<id>.<output>`, nie auf Positionen.
- Schemaänderung = neue `SCHEMA_VERSION` + Migration + Test mit altem Dokument.
- Kein `unsafe` (Workspace-Lint). Keine Panics über Bindungsgrenzen: öffentliche Funktionen geben
  `Result` zurück; NIF-, WASM- und PyO3-Schichten wandeln Fehler in strukturierte Fehler um.
- Keine Geometrie und kein I/O im Kern-Crate; Speicher und Netz gehören in die Hosts.
- Deterministisch: gleiche Operationen ergeben bitgleiche Textprojektion und gleiche Hashes.
- Lange Operationen (> 1 ms) als Dirty-NIF kennzeichnen bzw. inkrementell anbieten.
- Kein `unwrap()`/`expect()` außerhalb von Tests; für neue Logik Property-Tests (proptest) statt nur Beispiele.
- Prüfen: `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, `cargo test -q`.
