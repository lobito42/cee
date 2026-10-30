## ADDED Requirements

### Requirement: Typdefinition Hochziehen als Daten
Der Elementtyp `extrude` SHALL als Typdefinition in `format/types/skizze.json` liegen (ADR-046), mit Eingang
`skizze` und den Längen-Parametern `punkt_u`, `punkt_v`, `hoehe` (Dimension `length`, Standard-Einheit `mm`). Der
Code unter `crates/graph` MUST NOT die Zeichenkette `extrude` als Typnamen enthalten.

#### Scenario: [auto] Registrieren ohne Kern-Code
- **WHEN** der Abnahmetest `format/types/skizze.json` über das Python-SDK registriert
- **THEN** hat `extrude` genau den Eingang `skizze` und die 3 Parameter mit `dimension` = `length` und
  `default_unit` = `mm`, und `"extrude"` kommt in `crates/graph/src/**/*.rs` nicht vor

### Requirement: Hochziehen eines Bereichs zum Körper
Ein `extrude` SHALL den innersten Bereich seiner Skizze, der den Punkt (`punkt_u`, `punkt_v`) enthält, um `hoehe`
entlang der Normale der Ebene zu einem eigenen OCP-Solid hochziehen (negative Höhe gegen die Normale). Die Kennwerte
im Ausgang `koerper` (Volumen, Oberfläche, Schwerpunkt, Hülle, Anzahl Flächen und Kanten) MUST aus der exakten Form
stammen, nicht aus dem Anzeige-Netz. Enthält kein Bereich den Punkt, MUST der Befund `region_missing` entstehen,
nie ein geratener Bereich; `|hoehe|` < 10⁻⁶ mm MUST `degenerate` ergeben. Verknüpfungen mit anderen Körpern MUST
NOT stattfinden.

#### Scenario: [auto] Quader und Zylinder
- **WHEN** auf der XY-Ebene ein Rechteck (−30, −20)–(30, 20) mm mit `hoehe` = 8 mm und ein Kreis bei (100, 0) mm mit
  d = 20 mm mit `hoehe` = −15 mm hochgezogen werden
- **THEN** hat der Quader Volumen 19 200 mm³, Oberfläche 2 · (60·40 + 60·8 + 40·8) mm², Hülle z von 0 bis 8 mm, der
  Zylinder Volumen π · 10² · 15 mm³ und Hülle z von −15 bis 0 mm (relativ 10⁻⁶ bzw. 10⁻⁶ mm), und die Anzahl Flächen
  und Kanten beider Körper ist gleich der von build123d `Box` bzw. `Cylinder` mit denselben Maßen

#### Scenario: [auto] Bereich mit Löchern
- **WHEN** der Bereich „Rechteck minus zwei Kreise“ aus dem Scenario der Skizze mit Punkt (0, −10) mm und
  `hoehe` = 8 mm hochgezogen wird
- **THEN** ist das Volumen (2 400 − 2 · π · 3,3²) · 8 mm³ (relativ 10⁻⁶), und der Körper hat 2 durchgehende
  zylindrische Flächen mit Radius 3,3 mm (10⁻⁶ mm)

#### Scenario: [auto] Punkt außerhalb und Höhe null
- **WHEN** ein `extrude` den Punkt (500, 500) mm außerhalb jedes Bereichs nennt, ein zweites `hoehe` = 0 mm hat und
  ein drittes gültig ist
- **THEN** gibt es genau 1 Befund `region_missing` und 1 Befund `degenerate` mit den richtigen Element-IDs, und das
  dritte hat `state` = `aktuell`

#### Scenario: [auto] Bereich verschwindet nach Änderung
- **WHEN** ein Kreis (Mittelpunkt (0, 0) mm, d = 20 mm) mit Punkt (0, 0) mm hochgezogen und danach der Kreis auf den
  Mittelpunkt (50, 0) mm geändert wird
- **THEN** meldet das Hochziehen nach der Änderung `region_missing` und liefert keinen Körper

### Requirement: Anzeige-Netz und Kantenzüge
Der Ausgang `koerper` SHALL ein Dreiecksnetz und Kantenzüge zur Anzeige enthalten (Sehnenfehler 0,05 mm, Winkel
0,25 rad). Alle Netzpunkte MUST auf der exakten Oberfläche liegen (Abstand ≤ 0,05 mm) und das Netz MUST geschlossen
sein.

#### Scenario: [auto] Netz liegt auf der Form
- **WHEN** der Zylinder aus dem Scenario „Quader und Zylinder“ berechnet wird
- **THEN** ist jeder Netzpunkt höchstens 0,05 mm von der OCP-Form entfernt (`BRepExtrema_DistShapeShape`), jede
  Netzkante gehört zu genau 2 Dreiecken, und das aus dem Netz berechnete Volumen weicht höchstens 1 % vom exakten ab

### Requirement: Erweiterung von cee-kernel/0
Die Schemas unter `format/kernel/` SHALL um die Ausgabetypen `sketch` und `solid` nach design.md Abschnitte 3 und 4
ergänzt werden; `protocol` MUST `cee-kernel/0` bleiben, und Ergebnisse aus ap-50 MUST weiter gültig sein. Jede Zahl
MUST als Größe `{"value", "unit"}` erscheinen; einzige Ausnahme sind die Anzeige-Listen `netz.positionen` und
`kantenzuege`, deren Zahlen in mm stehen und deren Einheit einmal als `"unit": "mm"` am Netz bzw. an den
Kantenzügen steht.

#### Scenario: [auto] Schemas gültig und additiv
- **WHEN** der Test die Ergebnisse aller Scenarios dieses Changes und das Ergebnis von `format/examples/drahtmodell.json`
  gegen `format/kernel/ergebnis.schema.json` prüft
- **THEN** sind alle gültig, und `protocol` ist in allen `cee-kernel/0`

### Requirement: Inhalts-Hash und Determinismus
Der Inhalts-Hash einer Skizze SHALL über `ebene` und die nach ID sortierten Hashes ihrer nicht verworfenen Kinder
gebildet werden; der eines Hochziehens über den Hash der Skizze, `punkt_u`, `punkt_v` und `hoehe`. Gleicher Auftrag
MUST ein bytegleiches Ergebnis liefern.

#### Scenario: [auto] Hash folgt den Kindern
- **WHEN** im Halter-Beispiel (a) ein Element umbenannt, (b) der Durchmesser eines Kreises von S1 geändert und (c)
  derselbe Auftrag zweimal gerechnet wird
- **THEN** bleiben bei (a) alle Hashes gleich, ändern sich bei (b) die Hashes von S1 und dem Hochziehen der
  Grundplatte, aber nicht die von S2 und dem Steg, und bei (c) sind beide Ergebnisse bytegleich

### Requirement: Abnahmefall Halter im Worker
Der Worker SHALL den Halter nach design.md Abschnitt 8 aus den Werten von `Params()` in
`parts/examples/halter.py` als zwei Körper berechnen, die mit der vom Test selbst mit build123d gebauten
Vergleichsform (ohne Verrundung) übereinstimmen. Der Worker MUST beide Körper in höchstens 0,5 s (warm, Median aus
5) liefern.

#### Scenario: [auto] Halter gegen build123d
- **WHEN** der Test `Params()` aus `parts/examples/halter.py` liest, den Auftrag nach Abschnitt 8 baut und rechnet
- **THEN** stimmen Volumen, Oberfläche und Schwerpunkt beider Körper relativ 10⁻⁶ bzw. auf 10⁻⁶ mm mit der
  Vergleichsform überein, die Topologie-Zählung ist gleich, die Summe der Volumen ist bei den Standardwerten
  42 652,6 mm³ (± 0,1 mm³), und die warme Laufzeit an `--stdio` ist ≤ 0,5 s

#### Scenario: [auto] Budget Bereiche
- **WHEN** eine Skizze mit 100 Rechtecken und 100 Kreisen ohne Schnitt warm gerechnet wird
- **THEN** liefert der Worker 200 Bereiche in ≤ 1,0 s (Median aus 5)
