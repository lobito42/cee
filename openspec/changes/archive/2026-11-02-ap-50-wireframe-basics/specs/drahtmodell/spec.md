## ADDED Requirements

### Requirement: Typdefinitionen als Daten
Die Elementtypen `frame`, `point`, `axis`, `plane`, `line`, `ray` und `segment` SHALL als Typdefinitionen in
`format/types/drahtmodell.json` beschrieben sein (Längen: Dimension `length`, Standard-Einheit `mm`; Winkel:
`angle`, Standard-Einheit `deg`). Der Rust-Kern MUST NOT für diese Typen geändert werden (ADR-046, ADR-057).

#### Scenario: [auto] Registrieren ohne Fehler
- **WHEN** der Abnahmetest `format/types/drahtmodell.json` mit `cee_sdk.Doc.import_project(projekt, typen)` für
  das Beispielprojekt registriert
- **THEN** gibt es 0 Fehler `invalid_type_definition`, für jeden der 7 Typen ist jeder Parameter aus design.md
  Abschnitt 1 mit Dimension und Standard-Einheit definiert, und `x` = 12 ohne Einheit an einem Punkt wird als
  12 mm mit Warnung gelesen

#### Scenario: [auto] Kern unverändert
- **WHEN** der Abnahmetest `git diff --name-only origin/main...HEAD` und die Quellen unter `crates/graph/src/` prüft
- **THEN** ist keine Datei unter `crates/` geändert, und keiner der Typnamen `point`, `axis`, `plane`, `segment`,
  `ray` steht als Zeichenkette im Code von `crates/graph/src/` (0 Treffer)

### Requirement: Koordinatensystem
Ein `frame` SHALL ein Koordinatensystem mit Ursprung (`x`, `y`, `z`) und Drehung (`rx`, `ry`, `rz`, Reihenfolge
nach design.md Abschnitt 2), optional in einem übergeordneten Koordinatensystem (`parent`), sein. Der Worker
MUST die Ausgänge `frame`, `origin`, `x`, `y`, `z`, `xy`, `yz`, `zx` liefern. Ursprung, Achsen und Ebenen SHALL
als sieben Kind-Elemente (`point`, 3 × `axis`, 3 × `plane`) im `content` des Koordinatensystems stehen.

#### Scenario: [auto] Fünf Koordinatensysteme
- **WHEN** die Fälle F1 (alles 0), F2 (x = 100 mm), F3 (rz = 30°), F4 (x = 10 mm, y = −20 mm, z = 5 mm, rx = 90°,
  ry = 45°, rz = −60°) und F5 (F3 mit `parent` = F4) berechnet werden
- **THEN** stimmen `origin` auf 10⁻⁶ mm und `x`, `y`, `z` auf 10⁻⁹ rad mit der Formel aus design.md überein, die
  drei Achsen sind paarweise senkrecht (|Skalarprodukt| ≤ 10⁻¹²) und rechtshändig (`x × y = z`), und jede Ebene
  hat Ursprung, Normale und Bezugsrichtung nach design.md (5 von 5 Fällen)

#### Scenario: [auto] Kind-Elemente
- **WHEN** das Koordinatensystem K1 des Beispielprojekts berechnet wird
- **THEN** hat K1 genau 7 Kinder (1 `point`, 3 `axis`, 3 `plane`), alle `aktuell`; der Ursprungspunkt liegt auf
  `K1.origin`, jede Achse hat die Richtung des zugehörigen Ausgangs, jede Ebene die Normale des zugehörigen
  Ausgangs (Toleranzen wie oben)

### Requirement: Punkt
Ein `point` SHALL frei, auf Koordinaten oder relativ zu einem anderen Punkt gesetzt werden können, immer mit
demselben Typ: ohne `ref` liegt er bei `T_frame · (x, y, z)`, mit `ref` bei `p_ref + R_frame · (x, y, z)`. Ein
relativer Punkt MUST seinem Bezug folgen, wenn sich der Bezug ändert.

#### Scenario: [auto] Lage auf drei Wegen
- **WHEN** P1 (10, 20, 0 mm, Welt), P2 (50, 0, 0 mm in K1 mit x = 100 mm, rz = 30°) und P3 (relativ zu P1, Versatz
  0, 0, 25 mm) berechnet werden
- **THEN** liegt P1 bei (10, 20, 0) mm, P2 bei (100 + 50·cos 30°, 50·sin 30°, 0) mm und P3 bei (10, 20, 25) mm,
  jeweils auf 10⁻⁶ mm

#### Scenario: [auto] Relativer Punkt folgt
- **WHEN** im Beispielprojekt `x` von P1 auf 40 mm geändert und neu berechnet wird
- **THEN** liegt P3 bei (40, 20, 25) mm (Toleranz 10⁻⁶ mm), und P2 ist unverändert

#### Scenario: [auto] Bezug auf andere Punkt-Ausgänge
- **WHEN** je ein relativer Punkt mit Versatz (1, 2, 3) mm auf `S1.start`, `S1.end`, `H1.start` und `K1.origin`
  bezogen wird
- **THEN** liegt jeder bei Bezugspunkt + (1, 2, 3) mm (4 von 4, Toleranz 10⁻⁶ mm)

### Requirement: Gerade, Halbgerade und Strecke
`line`, `ray` und `segment` SHALL durch zwei Punkte (`a`, `b`) bestimmt sein: Gerade unbegrenzt, Halbgerade ab
`a` in Richtung `b` unbegrenzt, Strecke von `a` bis `b`. Fallen `a` und `b` auf weniger als 10⁻⁶ mm zusammen,
MUST der Befund `degenerate` kommen.

#### Scenario: [auto] Lage, Richtung und Länge
- **WHEN** S1, G1 und H1 des Beispielprojekts und zusätzlich eine Strecke von (0, 0, 0) mm nach (30, 40, 0) mm
  berechnet werden
- **THEN** stimmen Ursprung bzw. Start und Ende auf 10⁻⁶ mm, die Richtung auf 10⁻⁹ rad mit
  `(p_b − p_a)/|p_b − p_a|` überein, die Zusatzstrecke hat `length` = 50 mm (Toleranz 10⁻⁶ mm), und
  `direction` hat Betrag 1 (Toleranz 10⁻¹²)

#### Scenario: [auto] Begrenzung der OCP-Kante
- **WHEN** der Abnahmetest über die Python-API `cee_worker.kernel.formen(auftrag)` (Element-ID → OCP-Form) die
  Kanten von S1,
  G1 und H1 abfragt
- **THEN** hat S1 einen endlichen Parameterbereich, dessen Kantenlänge auf 10⁻⁶ mm `length` von S1 entspricht, G1
  den Bereich (−∞, ∞) und H1
  [0, ∞) nach `Precision.IsInfinite` (3 von 3)

### Requirement: Referenzen nur über benannte Ausgänge
Eingänge SHALL immer die Form `<id>.<output>` mit einem Ausgang aus design.md Abschnitt 1 haben (ADR-016,
ADR-058). Ein Eingang mit Index, Listenposition oder unbekanntem Ausgangsnamen MUST den Befund `input_missing`
ergeben und MUST NOT geraten werden.

#### Scenario: [auto] Index und unbekannter Ausgang
- **WHEN** Strecken mit `a` = `P1.point[0]`, `a` = `P1.0`, `a` = `S1.edges` und `a` = `K1.faces` berechnet werden
- **THEN** meldet jede den Befund `input_missing` am Eingang `a` (4 von 4), und kein Element des Beispielprojekts
  enthält in `inputs` einen Wert, der nicht der Form `<id>.<name>` mit einem Namen aus der Tabelle entspricht

### Requirement: Echter Geometriekern
Der Worker SHALL die Geometrie mit OpenCascade (OCP) berechnen und die gemeldeten Werte aus den OCP-Formen
zurücklesen. Direkte OCP- und build123d-Importe MUST nur unter `worker/src/cee_worker/kernel/` stehen.

#### Scenario: [auto] Kernel-Kennung und Ort der OCP-Aufrufe
- **WHEN** das Beispiel berechnet wird und der Abnahmetest die Quellen unter `worker/` durchsucht
- **THEN** ist `kernel.name` = `occt`, `kernel.version` gleich der Version des installierten OCP-Pakets, und
  `import OCP`, `from OCP`, `import build123d` und `from build123d` kommen nur in Dateien unter
  `worker/src/cee_worker/kernel/` vor (0 Treffer anderswo)
