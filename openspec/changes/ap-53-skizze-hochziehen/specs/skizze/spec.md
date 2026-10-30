## ADDED Requirements

### Requirement: Typdefinitionen der Skizze als Daten
Die Elementtypen `sketch`, `sketch_line`, `sketch_rectangle` und `sketch_circle` SHALL als Typdefinitionen in
`format/types/skizze.json` liegen (ADR-046), jeder Längen-Parameter mit Dimension `length` und Standard-Einheit
`mm` (ADR-057). Der Code unter `crates/graph` MUST NOT einen dieser Typnamen enthalten. (`extrude` liegt in
derselben Datei, gehört aber zur Fähigkeit `hochziehen`.)

#### Scenario: [auto] Registrieren ohne Kern-Code
- **WHEN** der Abnahmetest `format/types/skizze.json` zusammen mit `format/types/drahtmodell.json` über das
  Python-SDK registriert und `format/examples/skizze.json` mit `validate()` prüft
- **THEN** gibt es 0 Befunde der Schwere Fehler, jeder Längen-Parameter der 4 Typen hat `dimension` = `length` und
  `default_unit` = `mm`, und keine der 4 Typ-Zeichenketten kommt in `crates/graph/src/**/*.rs` vor

### Requirement: Skizzenelemente auf einer Ebene
Linie, Rechteck und Kreis SHALL im `content` genau einer Skizze liegen, keine Eingänge haben und ihre Lage in
Skizzenkoordinaten (u entlang `x_direction`, v entlang `normal × x_direction` der Ebene der Skizze) tragen. Der
Worker MUST sie als OCP-Kanten in Weltkoordinaten bilden. Entartete Elemente (Länge, Breite, Höhe oder Durchmesser
< 10⁻⁶ mm) MUST einen Befund `degenerate` erhalten; ein Skizzenelement außerhalb einer Skizze MUST den Befund
`not_in_sketch` erhalten. Andere Elemente MUST weiter berechnet werden (ADR-050).

#### Scenario: [auto] Lage auf einer gedrehten Ebene
- **WHEN** eine Skizze auf der XY-Ebene eines Koordinatensystems mit x = 100 mm, rz = 30 deg, rx = 90 deg liegt und
  je eine Linie (0, 0)–(50, 0) mm, ein Rechteck (−10, −5)–(10, 5) mm und ein Kreis bei (20, 0) mm mit d = 10 mm
  enthält
- **THEN** stimmen alle 8 Prüfwerte der OCP-Kanten aus `formen()` mit der vom Test aus der Ebene nachgerechneten
  Lage auf 10⁻⁶ mm überein (8 von 8): 2 Endpunkte der Linie, 4 Ecken des Rechtecks, Mittelpunkt und Radius des
  Kreises

#### Scenario: [auto] Entartet und außerhalb
- **WHEN** eine Skizze eine Linie der Länge 0 mm, ein Rechteck der Breite 0 mm, einen Kreis mit d = 0 mm und ein
  gültiges Rechteck enthält, und zusätzlich ein `sketch_line` direkt im Teil (nicht in einer Skizze) liegt
- **THEN** gibt es genau 3 Befunde `degenerate` mit den drei Element-IDs, genau 1 Befund `not_in_sketch`, und das
  gültige Rechteck hat `state` = `aktuell`

#### Scenario: [auto] Einheiten
- **WHEN** ein Kreis mit `d` = „0,05 m“ und ein zweiter mit `d` = „50“ (ohne Einheit) angelegt werden
- **THEN** haben beide Radius 25 mm auf 10⁻⁶ mm, der zweite mit genau 1 Warnung „Standard-Einheit“ aus dem Kern;
  ein Kreis mit `d` = „5 kg“ ergibt Befund `unit`

### Requirement: Bereiche aus geschlossenen Konturen
Der Worker SHALL für jede Skizze die Bereiche nach design.md Abschnitt 3 bilden: Rechtecke, Kreise und geschlossene
Linienzüge sind Konturen, direkt enthaltene Konturen sind Löcher, jede innere Kontur ist selbst ein Bereich. Jeder
Bereich MUST mit innerem Punkt, Fläche (mm²), Element-IDs von Außenkontur und Löchern und einem Rand zur Anzeige im
Ausgang `sketch` stehen. Schneiden sich Konturen, MUST die Skizze den Befund `curves_intersect` mit beiden IDs
erhalten, und diese Konturen MUST NOT einen Bereich bilden; Bereiche MUST NOT über ihre Position in der Liste
adressiert werden (ADR-016).

#### Scenario: [auto] Rechteck mit zwei Löchern
- **WHEN** eine Skizze ein Rechteck (−30, −20)–(30, 20) mm und zwei Kreise mit d = 6,6 mm bei (±20, 4) mm enthält
- **THEN** meldet `bereiche` genau 3 Einträge: einer mit `aussen` = [Rechteck], `loecher` = beide Kreise und Fläche
  2 400 − 2 · π · 3,3² mm², zwei mit je einem Kreis und Fläche π · 3,3² mm² (relativ 10⁻⁶); jeder `punkt` liegt im
  Inneren seines Bereichs und nicht in einem Loch

#### Scenario: [auto] Linienzug und offene Linie
- **WHEN** eine Skizze vier Linien (0, 0)–(40, 0)–(40, 30)–(0, 30)–(0, 0) mm mit exakt gleichen Endpunkten und eine
  einzelne offene Linie (60, 0)–(90, 0) mm enthält
- **THEN** gibt es genau 1 Bereich mit Fläche 1 200 mm² (relativ 10⁻⁶) und `aussen` = die vier Linien, und es gibt
  keinen Befund

#### Scenario: [auto] Schneidende Konturen
- **WHEN** eine Skizze zwei Rechtecke (0, 0)–(20, 20) mm und (10, 10)–(30, 30) mm sowie einen Kreis bei (100, 0) mm
  mit d = 10 mm enthält
- **THEN** gibt es genau 1 Befund `curves_intersect` mit beiden Rechteck-IDs, genau 1 Bereich (der Kreis), und der
  Auftrag endet ohne Absturz
