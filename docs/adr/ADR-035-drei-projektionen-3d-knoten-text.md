# ADR-035: Drei Projektionen: 3D, Knoten, Text

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-044

## Kontext

Konstrukteure denken räumlich, Power-User in Abläufen (Visual Programming wie Synera), Agenten und Reviews in Text. Keine dieser Sichten darf eine eigene Wahrheit haben.

## Entscheidung

Derselbe Graph hat drei gleichwertige Projektionen: die 3D-Arbeitsfläche (direkte Bearbeitung), den Knoten-Editor (Untergraphen als wiederverwendbare Bausteine) und die Textprojektion samt Script-Elementen. Eine Änderung in einer Projektion ist sofort in allen sichtbar. Der Featurebaum ist eine hierarchische Ansicht des Graphen. KI-Änderungen sind Änderungssätze aus Graph-Operationen (ADR-021).

## Alternativen

Feature-Baum als Code mit Rückübersetzung (ADR-024); Knoten-Editor als eigenes Modell.

## Konsequenzen

Ersetzt zusammen mit ADR-028 die Code-Transformation über LibCST (ADR-024). Jede Graph-Operation braucht eine Darstellung in allen drei Projektionen.
