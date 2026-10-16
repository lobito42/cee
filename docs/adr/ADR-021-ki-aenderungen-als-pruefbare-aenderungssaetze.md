# ADR-021: KI-Änderungen als prüfbare Änderungssätze

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Konstrukteure müssen KI-Ergebnissen vertrauen können, ohne jede Zeile zu lesen.

## Entscheidung

Jede KI-Änderung ist ein Änderungssatz mit Geister-Vorschau, Code-Diff, Begründung, Regelstatus und Auswirkung auf veröffentlichte Elemente. Übernahme erst nach Annahme.

## Alternativen

KI schreibt direkt ins Modell.

## Konsequenzen

Der Geometrie-Dienst baut zwei Stände parallel; Varianten sind mehrere Änderungssätze.
