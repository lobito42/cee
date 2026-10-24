# bindungen Specification

## Purpose
TBD - created by archiving change ap-40-bindungen-sdk. Update Purpose after archive.

## Requirements

### Requirement: Fassade über die Kern-API
Eine Fassade `cee-bind` SHALL genau die Kern-API aus ap-05a und ap-05b (Tabelle in design.md) mit JSON-Text
oder Bytes an der Grenze anbieten. Die Bindungen für Elixir (Rustler-NIF), Node und Browser (WASM) und Python
(PyO3) SHALL nur diese Fassade aufrufen und keine eigene Logik für Elemente, Einheiten, Abhängigkeiten oder
Merge enthalten (ADR-029).

#### Scenario: [auto] Jede Funktion in jeder Laufzeit
- **WHEN** `bindctl api` in Rust, Elixir, Node, Browser und Python ausgeführt wird
- **THEN** enthält jede der fünf Ausgaben alle Funktionen der Fassadentabelle aus design.md, also 0 fehlende

#### Scenario: [auto] Bindungen ohne eigenes Datenmodell
- **WHEN** der Test die Abhängigkeiten mit `cargo metadata` auswertet
- **THEN** hängen `cee-graph-nif`, `cee-graph-wasm` und `cee-graph-py` nicht direkt von automerge ab, und
  `cee-graph` hängt von keinem der neuen Crates ab

### Requirement: Gleiche Ergebnisse und Inhalts-Hashes in allen Laufzeiten
Dieselbe Folge von Operationen SHALL in Rust, Elixir, Node, Browser und Python denselben Inhalts-Hash,
dasselbe exportierte Projekt-JSON und dieselben Ergebnisse je Operation und Abfrage liefern. Gespeicherte
Dokument-Bytes SHALL in jeder anderen Laufzeit ladbar sein, und Zusammenführen über Laufzeitgrenzen SHALL
denselben Hash ergeben wie in einer Laufzeit.

#### Scenario: [auto] Gleicher Hash in fünf Laufzeiten
- **WHEN** die 20 Szenarien aus design.md (AK-1) mit `bindctl run` in allen fünf Laufzeiten ausgeführt werden
- **THEN** sind `hash`, `export_sha256`, `results` und `queries` in 20 von 20 Szenarien in allen Laufzeiten
  gleich den Rust-Sollwerten

#### Scenario: [auto] Bytes wandern zwischen Laufzeiten
- **WHEN** ein Dokument nach 200 Operationen in jeder der fünf Laufzeiten gespeichert und in jeder der fünf
  Laufzeiten geladen wird (25 Paare)
- **THEN** ergibt jedes Paar denselben Hash wie das Original

#### Scenario: [auto] Zusammenführen über Laufzeitgrenzen
- **WHEN** zwei Kopien eines Dokuments mit 10.000 Elementen je 500 Änderungen an verschiedenen Elementen
  erhalten, die eine über die NIF, die andere über WASM (und ebenso WASM gegen PyO3), und in beide Richtungen
  zusammengeführt werden
- **THEN** sind beide Richtungen und das Zusammenführen derselben Zweige in Rust hashgleich

### Requirement: Strukturierte Fehler an jeder Grenze
Jede Bindung SHALL Fehler im Format `{code, message, element}` melden (Elixir `{:error, map}`, JavaScript
geworfenes Objekt, Python `CeeError`), mit den Codes des Kerns und `invalid_json`, `invalid_document` und
`internal`. Ein Panic im Rust-Code SHALL als `internal` gemeldet werden und darf weder die BEAM noch den
Node-, Browser- oder Python-Prozess beenden (ADR-029).

#### Scenario: [auto] Gleiche Fehlercodes überall
- **WHEN** die 10 Fehlerfälle aus design.md (AK-4) in allen fünf Laufzeiten ausgelöst werden
- **THEN** liefert jede Laufzeit für jeden Fall denselben Code wie Rust, und kein Fall beendet den Prozess

#### Scenario: [auto] Weiterarbeiten nach einem Panic
- **WHEN** `debug_panic` (Feature `test-hooks`) aufgerufen und danach im selben Prozess ein Szenario aus AK-1
  ausgeführt wird
- **THEN** meldet der erste Aufruf `internal`, und das Szenario liefert die Rust-Sollwerte

### Requirement: Rustler-NIF für den Server
Das Elixir-Modul `CeeServer.Graph` SHALL das Dokument als NIF-Ressource führen, Funktionen, die länger als 1 ms
dauern können, als Dirty-CPU-NIF ausführen und alle öffentlichen Funktionen mit Typespecs versehen (ADR-029,
ADR-030). Es SHALL keinen Prozess je Dokument und keine Geometrie enthalten.

#### Scenario: [auto] Dirty-Scheduler wie festgelegt
- **WHEN** der Test `crates/graph-nif` nach `schedule = "DirtyCpu"` durchsucht
- **THEN** tragen genau die Funktionen der Dirty-CPU-Liste aus design.md diese Kennzeichnung (0 fehlend,
  0 zusätzlich)

#### Scenario: [auto] Typen geprüft
- **WHEN** `mix compile --warnings-as-errors`, `mix credo --strict` und `mix dialyzer` in `server/` laufen
- **THEN** sind alle drei erfolgreich, und jede öffentliche Funktion von `CeeServer.Graph` hat ein `@spec`

### Requirement: Leistung der Bindungen
Eine Operation SHALL über die NIF im p95 höchstens 1 ms und über WASM (Node und Browser) im p95 höchstens 5 ms
dauern, gemessen wie in design.md. `bindctl bench` SHALL in jeder Laufzeit alle Kennzahlen aus design.md
ausgeben.

#### Scenario: [auto] Schwellen eingehalten
- **WHEN** der Abnahmetest `bindctl bench` je Laufzeit dreimal auf dem 10.000-Elemente-Projekt ausführt
- **THEN** ist der Median von `nif_op_p95_ms` ≤ 1 ms, von `wasm_node_op_p95_ms` ≤ 5 ms und von
  `wasm_browser_op_p95_ms` ≤ 5 ms

#### Scenario: [auto] Gemessene Werte vollständig
- **WHEN** dieselben Läufe ausgewertet werden
- **THEN** sind `rust_op_p95_ms`, `py_op_p95_ms`, `load_10k_ms` und `hash_10k_ms` je Laufzeit sowie
  `wasm_size_kb` als Zahl größer 0 angegeben

### Requirement: Fachpaket-Crates über dieselbe Bindungsschicht
Ein Fachpaket-Crate SHALL lesende Funktionen in der Fassade anmelden können, die in allen Bindungen über
`packages()` und `call(name, doc, args)` erreichbar sind, ohne eigenen Bindungscode und ohne eigene
Datenmodell-Logik. Fachpaket-Crates SHALL vom Kern abhängen, nie umgekehrt (ADR-046, ADR-054). Das
Beispiel-Crate `pkg-beispiel` SHALL nur mit seinem Cargo-Feature übersetzt werden.

#### Scenario: [auto] Beispiel-Funktion in allen Laufzeiten
- **WHEN** `call("beispiel.summe", doc, {"type": ..., "param": ...})` auf einem erzeugten Projekt mit 1.000
  Elementen in allen fünf Laufzeiten aufgerufen wird
- **THEN** stimmen `count` und `sum` überall überein und gleichen der Rechnung des Tests aus dem exportierten
  Projekt-JSON (Summe relativ ≤ 10⁻¹²)

#### Scenario: [auto] Dimensionsfehler im Fachpaket
- **WHEN** der Parameter bei einem Element eine Länge und bei einem anderen eine Masse ist
- **THEN** liefert jede Laufzeit `dimension_mismatch` mit dem ersten abweichenden Element

#### Scenario: [auto] Abhängigkeitsrichtung und Feature
- **WHEN** der Test `cargo metadata` auswertet und `bindctl` ohne Feature `pkg-beispiel` `packages` abfragt
- **THEN** hängt `pkg-beispiel` nur von `cee-graph` und serde-Crates ab, nicht direkt von automerge, kein Crate
  des Kerns hängt von `pkg-beispiel` ab, und `packages` ist leer

### Requirement: Codequalität der Bindungen
Die neuen Crates, das Elixir-Modul, die Client-Skripte und das Python-SDK SHALL ohne Warnungen bauen, formatiert
sein und nur Abhängigkeiten mit erlaubter Lizenz nutzen (ADR-034).

#### Scenario: [auto] Prüfungen grün
- **WHEN** `cargo fmt --check`, `cargo clippy --all-targets --all-features -- -D warnings`, `cargo test -q`,
  `uv run ruff check sdk/python`, `cd client && npm run lint` und die Lizenzprüfungen für Cargo, npm, Mix und
  Python laufen und die neuen Crates nach `unwrap(`, `expect(`, `panic!` und `unsafe` außerhalb von Tests
  durchsucht werden
- **THEN** sind alle Befehle erfolgreich, die Lizenzprüfungen melden 0 Verstöße, und die Suche findet 0 Stellen
  außer `debug_panic` hinter Feature `test-hooks`
