## ADDED Requirements

### Requirement: Nachhallzeit nach Sabine
Das System SHALL die Nachhallzeit je Oktavband 125, 250, 500, 1000, 2000 und 4000 Hz berechnen als
T = 0,161 · V / (Σ Sᵢ·αᵢ + Σ Aₒ); dabei ist V das Raumvolumen in m³, Sᵢ die Flächen in m², αᵢ die
Absorptionsgrade und Aₒ die äquivalenten Absorptionsflächen von Objekten in m².

#### Scenario: Leerer Besprechungsraum
- **WHEN** ein Raum mit 60 m³, Flächen und Absorptionsgraden berechnet wird
- **THEN** weicht die Sabine-Zeit in jedem Band höchstens 0,1 % von der Formel ab

#### Scenario: Objekte mit äquivalenter Absorptionsfläche
- **WHEN** dem Raum Objekte mit äquivalenter Absorptionsfläche hinzugefügt werden
- **THEN** sinkt die Sabine-Zeit in jedem Band und stimmt auf 0,1 % mit der Formel überein

### Requirement: Nachhallzeit nach Eyring
Das System SHALL die Nachhallzeit je Oktavband berechnen als T = 0,161 · V / (−S · ln(1 − ᾱ) + Σ Aₒ) mit
S = Σ Sᵢ und ᾱ = Σ Sᵢ·αᵢ / S.

#### Scenario: Eyring kürzer als Sabine
- **WHEN** ein Raum mit mittlerem Absorptionsgrad größer 0 und kleiner 1 berechnet wird
- **THEN** ist die Eyring-Zeit in jedem Band kürzer als die Sabine-Zeit und stimmt auf 0,1 % mit der Formel überein

#### Scenario: Vollständige Absorption
- **WHEN** alle Flächen in einem Band α = 1 haben und keine Objekte vorhanden sind
- **THEN** ist die Eyring-Zeit in diesem Band 0 s

### Requirement: Eingabeprüfung
Das System SHALL ungültige Eingaben mit einem strukturierten Fehler mit `code`, `message` und `hint` ablehnen.

#### Scenario: Absorptionsgrad außerhalb des Bereichs
- **WHEN** eine Fläche in einem Band α = 1,2 hat
- **THEN** ist das Ergebnis ein Fehler mit Code `alpha_out_of_range`

#### Scenario: Ungültiges Volumen
- **WHEN** das Volumen 0 oder negativ ist
- **THEN** ist das Ergebnis ein Fehler mit Code `volume_invalid`

#### Scenario: Fehlendes Band
- **WHEN** einer Fläche eines der sechs Oktavbänder fehlt
- **THEN** ist das Ergebnis ein Fehler mit Code `band_missing`

#### Scenario: Keine Absorption
- **WHEN** alle α gleich 0 sind und keine Objekte vorhanden sind
- **THEN** ist das Ergebnis ein Fehler mit Code `no_absorption`

### Requirement: Rechenzeit
Das System SHALL beide Verfahren für alle sechs Bänder für einen Raum mit 1.000 Flächen im Release-Build im
Mittel in höchstens 1.000 µs berechnen.

#### Scenario: Benchmark mit 1.000 Flächen
- **WHEN** der Benchmark mit 1.000 Flächen läuft
- **THEN** ist der gemeldete Mittelwert höchstens 1.000 µs

#### Scenario: Unabhängig gemessener Aufruf mit 1.000 Flächen
- **WHEN** der Test einen Raum mit 1.000 Flächen erzeugt und `rt` elfmal über das Release-Binary aufruft
- **THEN** stimmt jedes Ergebnis innerhalb 0,1 % mit der Formel überein
- **AND** dauert ein Aufruf einschließlich Prozessstart im Median höchstens 50 ms
