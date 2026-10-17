# ADR-042: Austauschformate: glTF, IFC, DXF, STEP

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Räume kommen oft als Architekturmodell oder Grundriss, Ergebnisse gehen an Kunden, Visualisierer und Fertigung.

## Entscheidung

Import: IFC (Räume, Wände, Öffnungen über IfcOpenShell im Worker), DXF (Grundriss als Skizze), glTF (Möbel und Objekte). Export: glTF (Szene mit Materialien), PDF-Bericht (Nachhallzeit, Mengen, Kosten, CO₂), CSV-Mengenliste, STEP AP242 für Bauteile wie Absorber (ADR-004 bleibt für Bauteile gültig).

## Alternativen

Nur STEP (ADR-004).

## Konsequenzen

IfcOpenShell (LGPL) läuft nur im Worker-Prozess (ADR-034). Ändert ADR-004.
