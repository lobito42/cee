# ADR-009: Strukturierte Anforderungsdatei

- Status: ersetzt durch ADR-028
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Ersetzt durch ADR-028: Anforderungen sind Elemente vom Typ `requirement` im Graphen, keine `requirements.yaml`. Freitext übersetzt ein KI-Assistent beliebigen Anbieters (ADR-037), der Mensch bestätigt.

## Kontext

Freitext-Anforderungen sind nicht prüfbar und nicht rückverfolgbar.

## Entscheidung

Jedes Bauteil hat eine `requirements.yaml` (JSON-Schema-validiert): Bauraum, Schnittstellen, Lasten, Werkstoff, Verfahren, Stückzahl, Toleranzklasse, Regelpakete. Claude übersetzt Freitext, der Mensch bestätigt.

## Alternativen

Freitext.

## Konsequenzen

Anforderungen werden prüfbar und rückverfolgbar.
