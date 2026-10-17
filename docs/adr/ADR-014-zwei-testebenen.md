# ADR-014: Zwei Testebenen

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Gilt weiter; die KI-Eval-Suite entsteht aus dem Aufgabengenerator mit Prüfern (ADR-053) und läuft mit mindestens einem lokalen und einem Cloud-Modell (ADR-037).

## Kontext

Geometrie und KI-Verhalten müssen messbar sein.

## Entscheidung

(1) Golden-Tests für Geometrie: Volumen, Fläche, Schwerpunkt, Topologie-Zählungen mit Toleranz. (2) KI-Eval-Suite mit 40–60 Referenzaufgaben: Erfolgsquote, Iterationen, Regelverstöße.

## Alternativen

Nur Unit-Tests.

## Konsequenzen

Modell- und Prompt-Änderungen werden messbar.
