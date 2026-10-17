# ADR-012: Optionale FEM

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Gilt als Kann-Paket nach der Beta (ADR-059); FEM-Löser laufen nur im Worker.

## Kontext

Eine erste Festigkeitsabschätzung ist hilfreich, aber nicht Kern.

## Entscheidung

Linear-statische Vorabschätzung über Gmsh und CalculiX als separates, optionales Paket (nach der Beta).

## Alternativen

Kommerzieller Solver.

## Konsequenzen

Nur Plausibilisierung, keine Auslegungsfreigabe.
