# Regeln für den Rust-Kern (crates/)

- Der Kern ist die einzige Implementierung des Datenmodells (ADR-029). Server, Client und SDK rufen ihn
  auf und bauen keine eigene Logik für Elemente, Abhängigkeiten oder Merge nach.
- Jedes Element hat dieselbe Form (`id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`) –
  ein Achsenursprung genauso wie eine Baugruppe (ADR-028). Keine Sonderfälle je Elementtyp im Speicherformat.
- Der Kern ist fachneutral (ADR-046): keine Fachbegriffe (Wand, Absorber, Nachhallzeit, Bohrung) im Code
  von `crates/graph`, kein Aufzählen von Elementtypen im Schema. Fachtypen definieren Fachpakete über das
  Plugin-SDK. Ausnahme sind die Grundtypen `frame`, `variables`, `component`, `instance`, `item`, `study`.
- Freigabestände sind unveränderlich: Operationen auf einen freigegebenen Untergraphen werden abgelehnt;
  Änderungen gehen nur über einen neuen Arbeitsstand bzw. Änderungsauftrag (ADR-047).
- Gesperrte Komponenten (ADR-049): Operationen auf ihr Innenleben lehnt der Kern ab; nur freigegebene
  Parameter sind über Instanzen änderbar. Die Sperre ist eine Eigenschaft der Komponente, kein Sonderfall im
  Speicherformat.
- Komponenten können Referenz-Eingänge mit Typ deklarieren; Instanzen speichern nur die gewählten Verweise
  (ADR-050). „Ersetzen mit Umhängen“ ist eine Kern-Operation; mehrdeutige Zuordnungen liefert sie als
  Vorschlag zurück, nie als stille Entscheidung.
- Jedes Element hat einen Berechnungszustand (aktuell, veraltet, fehlerhaft, pausiert). Ein fehlerhaftes
  Element blockiert weder Speichern noch Merge noch die Berechnung unabhängiger Zweige des Graphen.
- Untergraphen müssen einzeln ladbar sein (Teil-Laden): keine Operation darf das vollständige Dokument
  voraussetzen, wenn sie nur einen Untergraphen betrifft.
- Instanzen speichern nur `variant` und `overrides`, nie eine Kopie des Untergraphen (ADR-043). Entfällt ein
  überschriebener Parameter, wird das als Befund gemeldet. Zyklen zwischen Komponenten sind ein Fehler.
- IDs sind stabil und werden nie wiederverwendet. Referenzen gehen auf `<id>.<output>`, nie auf Positionen.
- Schemaänderung = neue `SCHEMA_VERSION` + Migration + Test mit altem Dokument.
- Kein `unsafe` (Workspace-Lint). Keine Panics über Bindungsgrenzen: öffentliche Funktionen geben
  `Result` zurück; NIF-, WASM- und PyO3-Schichten wandeln Fehler in strukturierte Fehler um.
- Keine Geometrie und kein I/O im Kern-Crate; Speicher und Netz gehören in die Hosts.
- Deterministisch: gleiche Operationen ergeben bitgleiche Textprojektion und gleiche Hashes.
- Lange Operationen (> 1 ms) als Dirty-NIF kennzeichnen bzw. inkrementell anbieten.
- Kein `unwrap()`/`expect()` außerhalb von Tests; für neue Logik Property-Tests (proptest) statt nur Beispiele.
- Prüfen: `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, `cargo test -q`.
