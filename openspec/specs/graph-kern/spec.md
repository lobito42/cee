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
