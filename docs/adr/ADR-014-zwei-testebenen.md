# ADR-014: Zwei Testebenen

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Geometrie und KI-Verhalten müssen messbar sein.

## Entscheidung

(1) Golden-Tests für Geometrie: Volumen, Fläche, Schwerpunkt, Topologie-Zählungen mit Toleranz. (2) KI-Eval-Suite mit 40–60 Referenzaufgaben: Erfolgsquote, Iterationen, Regelverstöße.

## Alternativen

Nur Unit-Tests.

## Konsequenzen

Modell- und Prompt-Änderungen werden messbar.
