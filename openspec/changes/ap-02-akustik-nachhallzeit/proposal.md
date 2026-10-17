## Why

Die Firma platziert Schallabsorber in Räumen und muss sofort sehen, wie sich die Nachhallzeit ändert. Dafür
braucht es eine schnelle, geprüfte Berechnung nach Sabine und Eyring je Oktavband, die später im Browser,
in der Desktop-App und im Server gleich läuft (ADR-041). Sie ist zugleich der erste Change mit echten Specs.

## What Changes

- Neues Crate `crates/acoustics` (Paket `cee-acoustics`): Nachhallzeit nach Sabine und Eyring je Oktavband
  125–4000 Hz aus Volumen, Flächen mit Absorptionsgraden und Objekten mit äquivalenter Absorptionsfläche
- Strukturierte Fehler bei ungültigen Eingaben
- Kommandozeile `cee-acoustics` (JSON auf stdin, JSON auf stdout) für Tests, Agenten und Skripte
- Benchmark für 1.000 Flächen

## Capabilities

### New Capabilities

- `raumakustik`: Nachhallzeit eines Raums je Oktavband nach Sabine und Eyring

### Modified Capabilities

Keine.

## Impact

- Neue Dateien unter `crates/acoustics/`; Workspace-Mitglied über `crates/*`
- Betroffene ADRs: ADR-038, 039, 041
- Abnahmetests: `tests/acceptance/ap-02-akustik-nachhallzeit/` (AK-1 bis AK-5)
- Gate G1
- Nicht-Ziele: Zielwerte nach DIN 18041 (eigenes Regelpaket), Luftabsorption, geometrische Verfahren,
  WASM- und NIF-Anbindung (kommen mit ap-05 bzw. ap-07)
