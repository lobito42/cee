# ADR-041: Akustik-Berechnung im Rust-Kern

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Die Wirkung von Absorbern muss beim Platzieren sofort sichtbar sein, im Browser wie offline auf dem Desktop, reproduzierbar und prüfbar.

## Entscheidung

Ein Rust-Crate `crates/acoustics` berechnet die Nachhallzeit je Oktavband nach Sabine und Eyring aus Raumvolumen, Flächen und Absorptionsgraden (inkl. Absorbern als äquivalente Absorptionsfläche). Er läuft wie der Graph-Kern nativ, als WASM und als NIF. Ergebnisse sind Elemente vom Typ `analysis` mit Eingängen (Raum, Zielwerte) und Ausgängen (Nachhallzeit je Band, Abweichung zum Ziel). Zielwerte (z. B. nach DIN 18041) liegen als Regelpaket vor und werden von der Firma geprüft; Normtext wird nicht übernommen. Später: geometrische Verfahren (Spiegelquellen, Strahlverfolgung) als zusätzliches Analyse-Element.

## Alternativen

Berechnung im Python-Worker; externe Akustiksoftware.

## Konsequenzen

Rechenzeit für einen Raum mit 1.000 Flächen unter 1 ms (Spike ap-02). Grenzen der Diffusfeld-Annahme werden im Ergebnis angezeigt.
