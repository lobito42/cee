## ADDED Requirements

### Requirement: Punkt und Ebene mit Herkunft
Ein Punkt SHALL immer ein Element vom Typ `point` sein und eine Ebene immer ein Element vom Typ `plane`; die Art,
wie sie bestimmt werden, MUST genau eine Herkunft im Parameter `herkunft` nach design.md Abschnitt 1 sein
(`point`: `koordinaten`, `relativ`, `auf`, `schnitt`, `projektion`, `mitte`; `plane`: `von`, `drei_punkte`,
`punkt_normale`). Es MUST NOT weitere Typen für Punkte oder Ebenen geben. Ohne `herkunft` SHALL die Regel aus
design.md gelten, sodass Punkte und Ebenen aus ap-50 unverändert gerechnet werden. Neue Herkünfte MUST sich als
Eintrag der Herkunftstabelle ohne Änderung an Typ, Protokoll oder Befehlsform ergänzen lassen. Der Rust-Kern MUST
NOT geändert werden (ADR-046). Ersetzt beim Archivieren das Requirement „Punkt“ aus `drahtmodell` (ap-50) um die
Herkunft erweitert.

#### Scenario: [auto] Eine Form
- **WHEN** der Abnahmetest `format/types/drahtmodell.json` mit `cee_sdk.Doc.import_project` registriert und einen
  Auftrag mit allen 9 Herkünften rechnet
- **THEN** gibt es 0 Fehler `invalid_type_definition`, die Typdatei enthält keine Typen außer den 7 aus ap-50, jeder
  Punkt im Ergebnis hat Typ `point` und Ausgang `point`, jede Ebene Typ `plane` und Ausgang `plane`, und
  `git diff --name-only origin/main...HEAD` zeigt 0 Dateien unter `crates/`

#### Scenario: [auto] Verträglich mit ap-50
- **WHEN** der Auftrag aus `format/examples/drahtmodell.json` (Punkte und Ebenen ohne `herkunft`, ohne
  `messungen`) vor und nach diesem Change gerechnet wird, und ein Punkt mit `herkunft` = `kreis` im selben
  Auftrag steht
- **THEN** sind die Ergebnisse für alle ap-50-Elemente bytegleich, sind gültig nach
  `format/kernel/ergebnis.schema.json`, und der Punkt `kreis` hat genau einen Befund `unknown_herkunft` ohne
  Ausgang, während alle anderen Elemente `aktuell` sind

### Requirement: Ebenen
Der Worker SHALL Ebenen mit Herkunft `drei_punkte` und `punkt_normale` nach design.md Abschnitt 2 als
`Geom_Plane` berechnen und Ursprung, Normale und Bezugsrichtung aus dem OCP-Objekt melden. Drei Punkte auf einer
Geraden oder zusammenfallende Punkte MUST den Befund `degenerate` ergeben.

#### Scenario: [auto] Ebenen nachgerechnet
- **WHEN** 3 Fälle `drei_punkte` (darunter einer mit Punkten aus einem gedrehten Koordinatensystem) und 2 Fälle
  `punkt_normale` (darunter einer mit Normale (0,999; 0,045; 0) normiert) berechnet werden
- **THEN** stimmen Ursprung auf 10⁻⁶ mm, Normale und Bezugsrichtung auf 10⁻⁹ rad mit der Formel aus design.md
  überein, jeder Eingangspunkt von `drei_punkte` hat Abstand ≤ 10⁻⁶ mm zur Ebene, und das OCP-Objekt aus
  `formen()` ist ein `Geom_Plane` (5 von 5 Fällen)

#### Scenario: [auto] Entartete Ebene
- **WHEN** eine Ebene `drei_punkte` mit drei Punkten auf einer Geraden und ein unabhängiger Punkt im selben
  Auftrag berechnet werden
- **THEN** hat die Ebene den Zustand `fehlerhaft` mit genau einem Befund `degenerate`, und der unabhängige Punkt
  ist `aktuell`

### Requirement: Punkt auf Linie oder Ebene und Mittelpunkt
Der Worker SHALL Punkte mit Herkunft `auf` (Parameter `t` auf einer Linie, `u`, `v` auf einer Ebene) und `mitte`
nach design.md Abschnitt 2 berechnen. Ein Punkt außerhalb einer Halbgeraden oder Strecke MUST den Befund
`out_of_range` ergeben. Ändert sich der Bezug, MUST der Punkt beim nächsten Rechnen folgen.

#### Scenario: [auto] Lage auf Linie, Ebene und Mitte
- **WHEN** `auf` mit `t` = 30 mm auf einer Geraden und auf einer Strecke der Länge 50 mm, `auf` mit `u` = 10 mm,
  `v` = −5 mm auf einer gedrehten Ebene und `mitte` der Strecke berechnet werden
- **THEN** stimmt jede Lage auf 10⁻⁶ mm mit der Formel überein und hat Abstand ≤ 10⁻⁶ mm zu ihrem Bezug (4 von 4)

#### Scenario: [auto] Außerhalb und Folgen
- **WHEN** `t` auf der Strecke der Länge 50 mm auf 60 mm gesetzt wird, und in einem zweiten Auftrag ein
  Endpunkt der Strecke um 20 mm verschoben wird
- **THEN** meldet der erste Fall genau einen Befund `out_of_range` ohne Ausgang, und im zweiten Fall liegen der
  `auf`-Punkt (mit `t` = 30 mm) und der `mitte`-Punkt nach Formel auf der verschobenen Strecke (auf 10⁻⁶ mm)

### Requirement: Schnittpunkt zweier Linien
Der Worker SHALL für Punkte mit Herkunft `schnitt` den Schnittpunkt zweier Linien nach design.md Abschnitt 2
berechnen. Parallele Linien MUST den Befund `parallel`, windschiefe oder außerhalb einer Begrenzung liegende
Linien den Befund `no_intersection` ergeben, jeweils ohne Ausgang.

#### Scenario: [auto] Vier Fälle
- **WHEN** berechnet werden: zwei Geraden, die sich in (10, 20, 5) mm schneiden; zwei windschiefe Geraden mit
  Abstand 7 mm; zwei parallele Geraden; eine Gerade und eine Strecke, deren Trägergeraden sich außerhalb der
  Strecke schneiden
- **THEN** liefert Fall 1 den Punkt (10, 20, 5) mm auf 10⁻⁶ mm, Fall 2 den Befund `no_intersection` mit dem
  Abstand 7 mm (auf 10⁻⁶ mm) im Hinweis, Fall 3 `parallel`, Fall 4 `no_intersection` (4 von 4)

### Requirement: Projektion und Abstand
Der Worker SHALL für Punkte mit Herkunft `projektion` den Lotfußpunkt eines Punktes auf eine Linie oder Ebene
berechnen und für Messungen im Feld `messungen` den kürzesten Abstand mit beiden Fußpunkten liefern. Messungen
MUST NOT in einen Inhalts-Hash eingehen und MUST NOT als Element erscheinen. Die Erweiterung von `cee-kernel/0`
MUST additiv sein.

#### Scenario: [auto] Projektion nachgerechnet
- **WHEN** der Punkt (0, 0, 30) mm auf die Welt-XY-Ebene und ein Punkt auf eine schräge Gerade projiziert wird
- **THEN** ist der Fußpunkt im ersten Fall (0, 0, 0) mm, im zweiten Fall steht die Verbindung vom Punkt zum
  Fußpunkt senkrecht auf der Geraden (|Skalarprodukt der Richtungen| ≤ 10⁻⁹) und der Fußpunkt stimmt auf
  10⁻⁶ mm mit der Formel

#### Scenario: [auto] Abstand für vier Paare
- **WHEN** Messungen für die Paare Punkt–Punkt, Punkt–Strecke (Fußpunkt außerhalb, also Abstand zum Endpunkt),
  Gerade–Gerade (windschief) und Ebene–Ebene (parallel, 12 mm) gerechnet werden
- **THEN** stimmen `distance` und beide Fußpunkte auf 10⁻⁶ mm mit dem nachgerechneten Wert, die Inhalts-Hashes
  aller Elemente sind gleich wie ohne Messungen, das Ergebnis ist schemagültig, und die Messung im warmen
  `--stdio`-Worker dauert ≤ 100 ms (Median aus 5)
