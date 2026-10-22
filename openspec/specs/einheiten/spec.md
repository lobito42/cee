# einheiten Specification

## Purpose
TBD - created by archiving change ap-05a-schema-einheiten. Update Purpose after archive.

## Requirements

### Requirement: Einheitentabelle nach SI und UCUM
Der Kern SHALL eine Einheitentabelle mit den Codes, Dimensionen und Faktoren aus design.md führen. Dimensionen
SHALL Exponenten der SI-Grundgrößen sowie Winkel und CO₂-Äquivalent als eigene Achsen sein. Kanonisch sind
mm, kg, s, rad, A, K, mol, cd und kg{CO2e} und deren Produkte (ADR-057).

#### Scenario: [auto] Tabelle vollständig und exakt
- **WHEN** der Abnahmetest `graphctl units` aufruft und mit der Tabelle aus design.md vergleicht
- **THEN** sind alle Codes der Tabelle vorhanden, jeder Faktor stimmt relativ auf 10⁻¹⁵ mit dem Tabellenwert
  überein, und jede Dimension hat die erwarteten Exponenten (z. B. `MPa` = L⁻¹ M T⁻², `deg` = A)

### Requirement: Umrechnung
Der Kern SHALL Werte zwischen Einheiten derselben Dimension umrechnen und Umrechnungen zwischen verschiedenen
Dimensionen ablehnen.

#### Scenario: [auto] Hin und zurück
- **WHEN** für jedes Paar von Einheiten derselben Dimension aus der Tabelle die Werte 0,001, 1, 1200 und 10⁶
  hin- und zurückgerechnet werden
- **THEN** weicht jedes Ergebnis höchstens 10⁻¹² relativ vom Ausgangswert ab

#### Scenario: [auto] Bekannte Werte
- **WHEN** 1 `[in_i]` nach `mm`, 90 `deg` nach `rad`, 1 `[lb_av]` nach `kg`, 7,85 `g/cm3` nach `kg/m3` und
  210 `GPa` nach `MPa` umgerechnet werden
- **THEN** sind die Ergebnisse 25,4; π/2; 0,45359237; 7850 und 210.000, jeweils relativ auf 10⁻¹²

#### Scenario: [auto] Verschiedene Dimensionen
- **WHEN** 1 `kg` nach `mm`, 1 `deg` nach `1` und 1 `kg{CO2e}` nach `kg` umgerechnet werden soll
- **THEN** liefert der Kern jeweils den Fehler `dimension_mismatch`

### Requirement: Eingaben lesen
Der Kern SHALL Eingaben der Form `<Zahl> [<Code>]` mit Dezimalkomma oder Dezimalpunkt lesen und in die
kanonische Einheit umrechnen. Ohne Code SHALL die übergebene Standard-Einheit gelten (ADR-057).

#### Scenario: [auto] Eingabefälle
- **WHEN** der Abnahmetest 40 Eingaben über `graphctl parse` liest, darunter „1,2 m“, „1.2m“, „1200“ mit
  Standard `mm`, „90°“, „90 deg“, „3,5 [in_i]“, „-0,5 mm“, „1e3 mm“, „12 kg“ mit Standard `mm`, „1,2 furlong“
  und „“ (leer)
- **THEN** stimmen 40 von 40 Ergebnissen mit der Erwartung überein (Wert relativ auf 10⁻¹², kanonischer Code
  bzw. Fehlercode `unknown_unit`, `dimension_mismatch` oder `parse_error`)

#### Scenario: [auto] Schnell genug für Eingabefelder
- **WHEN** `graphctl bench --json` 10.000 Eingaben liest und umrechnet
- **THEN** ist `parse_p95_us` höchstens 50 µs

### Requirement: Typdefinitionen mit Standard-Einheit
Der Kern SHALL Typdefinitionen annehmen, die je Parameter eines Elementtyps eine benannte Dimension und eine
Standard-Einheit festlegen. Typdefinitionen SHALL nicht im Dokument gespeichert werden; sie kommen von
Fachpaketen (ADR-046, ADR-054).

#### Scenario: [auto] Ungültige Typdefinition
- **WHEN** eine Typdefinition eine unbekannte Dimension oder eine Standard-Einheit mit anderer Dimension als
  der festgelegten enthält (z. B. `length` mit `kg`)
- **THEN** lehnt der Kern sie mit dem Fehler `invalid_type_definition` ab, und zuvor registrierte
  Definitionen gelten unverändert weiter

### Requirement: Regeln für Zahlen beim Schreiben
Der Kern SHALL beim Schreiben eines Parameters die Regeltabelle aus design.md anwenden: Zahl ohne Einheit mit
bekannter Dimension → Standard-Einheit annehmen und Warnung `unit_assumed`; ohne bekannte Dimension →
unverändert speichern und Warnung `unit_missing`; Einheit derselben Dimension → umrechnen; andere Dimension
oder unbekannter Code → Operation ablehnen. Beim Stapel-Import SHALL nichts als Ganzes abgelehnt werden.

#### Scenario: [auto] Regeltabelle als Operation
- **WHEN** für einen Typ `bracket` mit `height` (length, Standard `mm`) und `angle` (angle, Standard `deg`)
  nacheinander `height` = 1200, `height` = {1,2 `m`}, `height` = {3 `kg`}, `height` = {1 `furlong`},
  `angle` = 90 und beim Typ ohne Definition `x` = 5 gesetzt werden
- **THEN** speichert der Kern {1200 `mm`} mit Warnung `unit_assumed`, {1200 `mm`} ohne Warnung, lehnt mit
  `dimension_mismatch` und `unknown_unit` ab (Dokument-Hash unverändert), speichert {π/2 `rad`} mit Warnung
  `unit_assumed` und speichert 5 unverändert mit Warnung `unit_missing`

#### Scenario: [auto] Regeltabelle als Import
- **WHEN** dieselben sechs Werte als Projekt-JSON importiert werden
- **THEN** gelingt der Import, die zulässigen Werte sind wie bei den Operationen gespeichert, die beiden
  unzulässigen Werte stehen unverändert im Element, und die Prüfung meldet dafür je einen Fehler-Befund
  `dimension_mismatch` bzw. `unknown_unit`

#### Scenario: [auto] Warnung verschwindet mit Einheit
- **WHEN** ein Parameter mit Warnung `unit_missing` danach als Größe mit Einheit gesetzt wird
- **THEN** meldet die Prüfung für diesen Parameter keine Warnung mehr
