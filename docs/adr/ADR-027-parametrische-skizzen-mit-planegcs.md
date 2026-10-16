# ADR-027: Parametrische Skizzen mit PlaneGCS

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Konstrukteure denken in Skizzen mit Bedingungen; build123d hat keinen Constraint-Solver.

## Entscheidung

PlaneGCS (FreeCAD, LGPL-2.1-or-later) zweimal mit identischem Kern: WebAssembly in der Arbeitsfläche, Python im Geometrie-Dienst. Skizzen sind lesbarer Code; Elemente haben IDs und sind veröffentlichbar.

## Alternativen

SolveSpace (GPL-3, unvereinbar mit Apache-2.0); Skizzen ohne Bedingungen; eigener Solver.

## Konsequenzen

Beide Solver versionsgleich; Abweichungen sind Pflicht-Testfall in der CI.
