# graph-kern Specification

## Purpose
TBD - created by archiving change ap-05b-abhaengigkeiten. Update Purpose after archive.

## Requirements

### Requirement: Abhängigkeiten ohne Zyklen
Der Kern SHALL aus den Eingängen einen gerichteten Abhängigkeitsgraphen bilden, eine stabile Reihenfolge für die
Berechnung liefern und zu einer Änderung alle betroffenen Elemente bestimmen (ADR-025, ADR-029). Eine Operation,
die einen Zyklus erzeugen würde, SHALL abgelehnt werden.

#### Scenario: [auto] Zyklus wird abgelehnt
- **WHEN** eine Operation einen Eingang setzt, der einen Zyklus über 2, 3 oder 50 Elemente schließen würde
- **THEN** liefert der Kern den Fehler `cycle`, und der Hash des Dokuments ist vor und nach dem Versuch gleich

#### Scenario: [auto] Zyklus aus dem Zusammenführen
- **WHEN** zwei Zweige je einen Eingang setzen, die erst zusammen einen Zyklus über 3 Elemente ergeben, und
  zusammengeführt werden
- **THEN** meldet die Prüfung den Befund `cycle` an jedem der 3 Elemente, die Reihenfolge enthält alle Elemente
  außer diesen und ihren Nachfolgern, und keine Operation bricht ab

#### Scenario: [auto] Reihenfolge und betroffene Elemente stimmen
- **WHEN** an 1.000 zufälligen Elementen eines erzeugten Projekts mit 10.000 Elementen die betroffenen Elemente
  berechnet und mit einer Referenzrechnung (Breitensuche im Test) verglichen werden
- **THEN** stimmen 1.000 von 1.000 Mengen überein, und in der Reihenfolge steht jedes Element nach allen
  Elementen, von denen es abhängt

### Requirement: Berechnungszustände
Der Kern SHALL für jedes Element einen Berechnungszustand `current`, `stale`, `running` oder `failed` führen, der
nie im Dokument gespeichert wird (ADR-032). Ein Fehler SHALL nur das fehlerhafte Element und seine Nachfolger
betreffen; unabhängige Zweige werden weiter berechnet (ADR-050).

#### Scenario: [auto] Fehler in der Mitte einer Kette
- **WHEN** in einem Projekt mit zwei unabhängigen Ketten aus je 5 Elementen das dritte Element der ersten Kette
  mit Fehler endet und die zweite Kette erfolgreich berechnet wird
- **THEN** ist das dritte Element `failed` mit Befund, das vierte und fünfte bleiben `stale` und erscheinen nicht
  in `ready()`, alle Elemente der zweiten Kette sind `current`

#### Scenario: [auto] Änderung während der Berechnung
- **WHEN** ein Element `running` ist, dabei geändert wird und danach `finish_ok` meldet
- **THEN** ist es `stale` und erscheint wieder in `ready()`

#### Scenario: [auto] Zustände ändern den Inhalt nicht
- **WHEN** Zustände für alle Elemente eines Projekts mit 1.000 Elementen wechseln
- **THEN** sind Hash und gespeicherte Bytes des Dokuments unverändert

### Requirement: Migrationen verträglich mit Offline-Zweigen
Der Kern SHALL die Schema-Version im Dokument führen und ältere Dokumente beim Öffnen der Reihe nach migrieren.
Migrationen SHALL normale, deterministische und idempotente CRDT-Änderungen sein (ADR-028, ADR-033). Dokumente mit
neuerer Version als der Kern kennt SHALL nicht geöffnet werden.

#### Scenario: [auto] Beispiel-Migration
- **WHEN** `graphctl` mit Feature `demo-migration` ein v1-Dokument mit 100 Elementen mit `meta.name` migriert
- **THEN** hat das Dokument die Version 2, alle 100 Elemente haben `meta.title` mit dem bisherigen Wert und kein
  `meta.name`

#### Scenario: [auto] Idempotent und konvergent
- **WHEN** zwei Kopien desselben v1-Dokuments offline je für sich migriert und dann zusammengeführt werden, und ein
  drittes Dokument zweimal migriert wird
- **THEN** haben alle drei denselben Hash wie eine einzelne Migration

#### Scenario: [auto] Zu neue Version
- **WHEN** der Kern ohne Feature `demo-migration` ein Dokument mit `schema_version` 2 öffnen soll
- **THEN** liefert er den Fehler `schema_too_new`, und die gespeicherten Bytes bleiben unverändert

### Requirement: Teil-Laden
Der Kern SHALL beim Öffnen nur einen Index aufbauen und Parameter und Meta eines Elements erst beim ersten Zugriff
aufbereiten (ADR-050). Er SHALL den Untergraphen eines Elements samt nach außen zeigender Eingänge liefern.

#### Scenario: [auto] Nur der angefragte Untergraph wird aufbereitet
- **WHEN** ein Projekt mit 100.000 Elementen geöffnet und der Untergraph einer Gruppe mit 1.000 Elementen
  angefragt wird
- **THEN** dauert das Aufbereiten höchstens 50 ms, `materialized_count` ist höchstens 1.000, und die Liste der
  nach außen zeigenden Eingänge stimmt mit einer Referenzrechnung überein

### Requirement: Laden mit Index und Budgets
Der Kern SHALL ein Projekt mit 100.000 Elementen samt Index in höchstens 2 s laden und die Budgets aus design.md
einhalten; `graphctl bench --json` SHALL die Kennzahlen ausgeben.

#### Scenario: [auto] 100.000 Elemente laden
- **WHEN** ein erzeugtes Projekt mit 100.000 Elementen und 10.000 Änderungen in der Historie geladen und indexiert
  wird
- **THEN** dauert das im Median aus 3 Läufen höchstens 2.000 ms

#### Scenario: [auto] Alle Budgets eingehalten
- **WHEN** der Abnahmetest `graphctl bench --json` dreimal ausführt
- **THEN** liegt der Median von `index_100k_ms`, `order_100k_ms`, `affected_p95_ms`, `op_p95_ms` und
  `subgraph_1000_ms` an oder unter der jeweiligen Schwelle, und `cargo clippy --all-targets -- -D warnings` und
  `cargo test -q -p cee-graph` sind erfolgreich

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
