## ADDED Requirements

### Requirement: Schema v1
Der Kern SHALL jedes Element in derselben Form `id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`
führen, ohne Liste von Fachtypen (ADR-028, ADR-046). Größen SHALL als `{value, unit}` in kanonischer Einheit,
Geld als Dezimalzahl in einer Zeichenkette mit Währung gespeichert werden. `format/schema/element.schema.json`
und die Beispiele in `format/examples/` SHALL dem Schema v1 entsprechen.

#### Scenario: [auto] Beispiele sind gültig
- **WHEN** der Kern `format/examples/raum.json` und `format/examples/baugruppe.json` importiert und prüft und
  ein JSON-Schema-Prüfer beide gegen `format/schema/element.schema.json` prüft
- **THEN** meldet der Kern 0 Befunde (auch keine Warnungen), der Schema-Prüfer 0 Fehler, und das Schema
  enthält keine Aufzählung von Werten für `type`

#### Scenario: [auto] Schema erzwingt Größen
- **WHEN** der Schema-Prüfer ein Projekt mit einer nackten Zahl in `params` und eines mit Geld als
  Gleitkommazahl prüft
- **THEN** meldet er für beide mindestens einen Fehler

### Requirement: Dokument mit Operationen, Merge und Inhalts-Hash
Der Kern SHALL ein Projekt als ein Automerge-Dokument (automerge ≥ 0.12) führen und Elemente anlegen, Parameter,
Eingänge und Meta ändern, Elemente samt Untergraph entfernen, speichern, laden, im Stapel importieren und zwei
Dokumente zusammenführen. Der Inhalts-Hash SHALL nur vom Inhalt abhängen, nicht von Historie oder Actor.

#### Scenario: [auto] Speichern und Laden ohne Verlust
- **WHEN** ein erzeugtes Projekt mit 10.000 Elementen nach 1.000 zufälligen Operationen gespeichert und neu
  geladen wird
- **THEN** sind Hash und exportiertes Projekt-JSON vor und nach dem Laden gleich

#### Scenario: [auto] Hash unabhängig von Historie und Actor
- **WHEN** zwei Dokumente mit verschiedenen Actors denselben Endinhalt über verschiedene Operationsfolgen
  erreichen und ein drittes Dokument mit anderem Inhalt erzeugt wird
- **THEN** haben die ersten beiden denselben Hash und das dritte einen anderen

#### Scenario: [auto] Zwei Zweige zusammenführen
- **WHEN** zwei Kopien eines Dokuments mit 10.000 Elementen je 500 Änderungen an verschiedenen Elementen
  erhalten und zusammengeführt werden
- **THEN** sind alle 1.000 Änderungen im Ergebnis enthalten, und beide Richtungen des Zusammenführens ergeben
  denselben Hash

### Requirement: Prüfung mit Befunden
Der Kern SHALL ein Dokument prüfen und alle Befunde auf einmal liefern, jeweils mit Element, Feld, Code,
Schwere und Text. Ein fehlerhaftes Element SHALL das übrige Modell nicht zerbrechen: Prüfen, Lesen, Ändern,
Speichern und Laden funktionieren weiter (ADR-050).

#### Scenario: [auto] Alle Codes werden erkannt
- **WHEN** der Kern einen erzeugten Korpus prüft, der je Code aus design.md 10 Fälle enthält, verteilt in einem
  Projekt mit 10.000 gültigen Elementen
- **THEN** meldet er 100 % der Fälle mit erwartetem Element, Code und Schwere, 0 Befunde an gültigen Elementen,
  und keine Prüfung bricht mit Fehler oder Absturz ab

#### Scenario: [auto] Andere Elemente bleiben benutzbar
- **WHEN** ein Projekt ein Element mit gebrochenem Eingang enthält und danach ein Parameter eines anderen
  Elements geändert, gespeichert und neu geladen wird
- **THEN** gelingen Änderung, Speichern und Laden, und die erneute Prüfung meldet genau einen Befund
  `missing_target`

### Requirement: Leistung von Dokument und Prüfung
Der Kern SHALL die Budgets aus design.md einhalten. `graphctl bench --json` SHALL alle Kennzahlen ausgeben.

#### Scenario: [auto] 100.000 Elemente laden
- **WHEN** ein erzeugtes Projekt mit 100.000 Elementen und 10.000 Änderungen in der Historie geladen wird
- **THEN** dauert das im Median aus 3 Läufen höchstens 2.000 ms

#### Scenario: [auto] Alle Budgets eingehalten
- **WHEN** der Abnahmetest `graphctl bench --json` dreimal ausführt
- **THEN** liegt der Median jeder Kennzahl mit Schwelle (`validate_100k_ms`, `op_p95_ms`, `parse_p95_us`,
  `import_10k_ms`) an oder unter ihrer Schwelle, und `import_100k_ms` und `size_100k_mb` sind als Zahl
  angegeben

### Requirement: Codequalität des Kerns
Der Kern SHALL ohne Warnungen bauen, formatiert sein und keine Abbrüche in öffentlichen Funktionen enthalten
(ADR-029).

#### Scenario: [auto] Prüfungen grün
- **WHEN** `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings` und `cargo test -q -p cee-graph`
  laufen und `crates/graph/src` nach `unwrap(`, `expect(`, `panic!` und `unsafe` außerhalb von `#[cfg(test)]`
  durchsucht wird
- **THEN** sind alle drei Befehle erfolgreich, und die Suche findet 0 Stellen
