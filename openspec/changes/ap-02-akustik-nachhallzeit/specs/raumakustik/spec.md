## ADDED Requirements

### Requirement: Nachhallzeit nach Sabine
The system SHALL compute the reverberation time per octave band 125, 250, 500, 1000, 2000 and 4000 Hz as
T = 0.161 · V / (Σ Sᵢ·αᵢ + Σ Aₒ), where V is the room volume in m³, Sᵢ the surface areas in m², αᵢ the
absorption coefficients and Aₒ the equivalent absorption areas of objects in m².

#### Scenario: Leerer Besprechungsraum
- **WHEN** a room of 60 m³ with surfaces and absorption coefficients is calculated
- **THEN** each band's Sabine time deviates at most 0.1 % from the formula

#### Scenario: Objekte mit äquivalenter Absorptionsfläche
- **WHEN** objects with equivalent absorption areas are added to the room
- **THEN** each band's Sabine time decreases and matches the formula within 0.1 %

### Requirement: Nachhallzeit nach Eyring
The system SHALL compute the reverberation time per octave band as T = 0.161 · V / (−S · ln(1 − ᾱ) + Σ Aₒ)
with S = Σ Sᵢ and ᾱ = Σ Sᵢ·αᵢ / S.

#### Scenario: Eyring kürzer als Sabine
- **WHEN** a room with mean absorption coefficient greater than 0 and less than 1 is calculated
- **THEN** the Eyring time is shorter than the Sabine time in every band and matches the formula within 0.1 %

#### Scenario: Vollständige Absorption
- **WHEN** every surface has α = 1 in a band and no objects are present
- **THEN** the Eyring time in that band is 0 s

### Requirement: Eingabeprüfung
The system SHALL reject invalid input with a structured error carrying `code`, `message` and `hint`.

#### Scenario: Absorptionsgrad außerhalb des Bereichs
- **WHEN** a surface has α = 1.2 in any band
- **THEN** the result is an error with code `alpha_out_of_range`

#### Scenario: Ungültiges Volumen
- **WHEN** the volume is 0 or negative
- **THEN** the result is an error with code `volume_invalid`

#### Scenario: Fehlendes Band
- **WHEN** a surface lacks one of the six octave bands
- **THEN** the result is an error with code `band_missing`

#### Scenario: Keine Absorption
- **WHEN** all α are 0 and no objects are present
- **THEN** the result is an error with code `no_absorption`

### Requirement: Rechenzeit
The system SHALL compute both methods for all six bands for a room with 1,000 surfaces in at most 1,000 µs
on average in a release build.

#### Scenario: Benchmark mit 1.000 Flächen
- **WHEN** the benchmark runs with 1,000 surfaces
- **THEN** the reported mean is at most 1,000 µs
