# ADR-020: Zeichnungsblätter als Code

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-028

## Kontext

Zeichnungen müssen Modelländerungen überleben und von Claude erzeugbar sein.

## Entscheidung

Ein Zeichnungsblatt ist ein Modul (`drawing_<name>.py`) mit Blattformat, Ansichten, Schnitten, Maßen und Schriftfeld über Element-IDs; bei jedem Build neu abgeleitet; Export PDF, SVG, DXF.

## Alternativen

Interaktiver Zeichnungseditor.

## Konsequenzen

Vorschau mit Klick-zu-Code; Zeichnungsnormen werden schrittweise ergänzt.
