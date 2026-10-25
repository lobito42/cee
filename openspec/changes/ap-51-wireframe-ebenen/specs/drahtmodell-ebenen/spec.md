## ADDED Requirements

### Requirement: Typen und Protokoll
Die Typen `plane_3p`, `plane_pn`, `point_on_curve`, `point_on_plane`, `intersection` und `perpendicular` SHALL als
Typdefinitionen in `format/types/drahtmodell.json` stehen (Längen mit Dimension `length`, Standard-Einheit `mm`).
Der Rust-Kern MUST NOT geändert werden (ADR-046). Die Erweiterung von `cee-kernel/0` (Befund-Codes `parallel`,
`no_intersection`, `out_of_range`; Feld `messungen`) MUST additiv sein.

#### Scenario: [auto] Registrieren und Kern unverändert
- **WHEN** der Abnahmetest die Typdatei mit `cee_sdk.Doc.import_project` registriert und
  `git diff --name-only origin/main...HEAD` prüft
- **THEN** gibt es 0 Fehler `invalid_type_definition`, alle 6 neuen Typen sind registriert, und 0 geänderte
  Dateien liegen unter `crates/`

#### Scenario: [auto] ap-50-Aufträge unverändert
- **WHEN** der Abnahmetest den Auftrag aus `format/examples/drahtmodell.json` (ohne `messungen`) rechnet
- **THEN** ist das Ergebnis gültig nach `format/kernel/ergebnis.schema.json` und enthält kein Feld `messungen`;
  ein Auftrag mit allen 6 neuen Typen und einer Messung ist ebenfalls schemagültig (Ja/Nein)

### Requirement: Ebenen
Der Worker SHALL `plane_3p` (Ebene durch drei Punkte) und `plane_pn` (Ebene durch Punkt und Normale) nach
design.md Abschnitt 2 als `Geom_Plane` berechnen und Ursprung, Normale und Bezugsrichtung aus dem OCP-Objekt
melden. Drei Punkte auf einer Geraden oder zusammenfallende Punkte MUST den Befund `degenerate` ergeben.

#### Scenario: [auto] Ebenen nachgerechnet
- **WHEN** 3 Fälle `plane_3p` (darunter einer mit Punkten aus einem gedrehten Koordinatensystem) und 2 Fälle
  `plane_pn` (darunter einer mit Normale (0,999; 0,045; 0) normiert) berechnet werden
- **THEN** stimmen Ursprung auf 10⁻⁶ mm, Normale und Bezugsrichtung auf 10⁻⁹ rad mit der Formel aus design.md
  überein, jeder Eingangspunkt von `plane_3p` hat Abstand ≤ 10⁻⁶ mm zur Ebene, und das OCP-Objekt aus
  `formen()` ist ein `Geom_Plane` (5 von 5 Fällen)

#### Scenario: [auto] Entartete Ebene
- **WHEN** `plane_3p` mit drei Punkten auf einer Geraden und ein unabhängiger Punkt im selben Auftrag berechnet
  werden
- **THEN** hat die Ebene den Zustand `fehlerhaft` mit genau einem Befund `degenerate`, und der unabhängige Punkt
  ist `aktuell`

### Requirement: Punkt auf Linie oder Ebene
Der Worker SHALL `point_on_curve` (Parameter `t`) und `point_on_plane` (Parameter `u`, `v`) nach design.md
Abschnitt 2 berechnen. Ein Punkt außerhalb einer Halbgeraden oder Strecke MUST den Befund `out_of_range` ergeben.
Ändert sich der Bezug, MUST der Punkt beim nächsten Rechnen folgen.

#### Scenario: [auto] Lage auf Linie und Ebene
- **WHEN** `point_on_curve` mit `t` = 30 mm auf einer Geraden und auf einer Strecke der Länge 50 mm sowie
  `point_on_plane` mit `u` = 10 mm, `v` = −5 mm auf einer gedrehten Ebene berechnet werden
- **THEN** stimmt jede Lage auf 10⁻⁶ mm mit der Formel überein und hat Abstand ≤ 10⁻⁶ mm zu ihrem Bezug

#### Scenario: [auto] Außerhalb und Folgen
- **WHEN** `t` auf der Strecke der Länge 50 mm auf 60 mm gesetzt wird, und in einem zweiten Auftrag ein
  Endpunkt der Geraden um 20 mm verschoben wird
- **THEN** meldet der erste Fall genau einen Befund `out_of_range` ohne Ausgang, und im zweiten Fall liegt der
  Punkt auf der verschobenen Geraden (Abstand ≤ 10⁻⁶ mm, Lage nach Formel)

### Requirement: Schnittpunkt zweier Linien
Der Worker SHALL für `intersection` den Schnittpunkt zweier Linien nach design.md Abschnitt 2 berechnen.
Parallele Linien MUST den Befund `parallel`, windschiefe oder außerhalb einer Begrenzung liegende Linien den
Befund `no_intersection` ergeben, jeweils ohne Ausgang.

#### Scenario: [auto] Vier Fälle
- **WHEN** berechnet werden: zwei Geraden, die sich in (10, 20, 5) mm schneiden; zwei windschiefe Geraden mit
  Abstand 7 mm; zwei parallele Geraden; eine Gerade und eine Strecke, deren Trägergeraden sich außerhalb der
  Strecke schneiden
- **THEN** liefert Fall 1 den Punkt (10, 20, 5) mm auf 10⁻⁶ mm, Fall 2 den Befund `no_intersection` mit dem
  Abstand 7 mm (auf 10⁻⁶ mm) im Hinweis, Fall 3 `parallel`, Fall 4 `no_intersection` (4 von 4)

### Requirement: Lot und Abstand
Der Worker SHALL für `perpendicular` den Lotfußpunkt und die Lotstrecke von einem Punkt auf eine Linie oder Ebene
berechnen und für Messungen im Feld `messungen` den kürzesten Abstand mit beiden Fußpunkten liefern. Messungen
MUST NOT in einen Inhalts-Hash eingehen und MUST NOT als Element erscheinen.

#### Scenario: [auto] Lot nachgerechnet
- **WHEN** ein Lot von (0, 0, 30) mm auf die Welt-XY-Ebene und ein Lot von einem Punkt auf eine schräge Gerade
  berechnet werden
- **THEN** ist der Fußpunkt im ersten Fall (0, 0, 0) mm und die Lotstrecke 30 mm lang, im zweiten Fall steht die
  Lotstrecke senkrecht auf der Geraden (|Skalarprodukt der Richtungen| ≤ 10⁻⁹) und Fußpunkt und Länge stimmen auf
  10⁻⁶ mm mit der Formel

#### Scenario: [auto] Abstand für vier Paare
- **WHEN** Messungen für die Paare Punkt–Punkt, Punkt–Strecke (Fußpunkt außerhalb, also Abstand zum Endpunkt),
  Gerade–Gerade (windschief) und Ebene–Ebene (parallel, 12 mm) gerechnet werden
- **THEN** stimmen `distance` und beide Fußpunkte auf 10⁻⁶ mm mit dem nachgerechneten Wert, die Inhalts-Hashes
  aller Elemente sind gleich wie ohne Messungen, und die Messung im warmen `--stdio`-Worker dauert ≤ 100 ms
  (Median aus 5)
