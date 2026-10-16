# ADR-008: Ausführbare Regelpakete

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Konstruktionsrichtlinien müssen prüfbar sein, nicht nur beschrieben.

## Entscheidung

Eine Regel ist eine Python-Funktion mit ID, Schweregrad, Begründung und Parametern aus YAML. Regelpakete je Verfahren werden über Entry-Points geladen; Firmen können eigene ergänzen.

## Alternativen

Regeln nur als Prompt-Text.

## Konsequenzen

Regeln sind testbar und versionierbar; Claude erhält Befunde mit Ort und Korrekturhinweis.
