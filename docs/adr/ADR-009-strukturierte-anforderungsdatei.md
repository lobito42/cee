# ADR-009: Strukturierte Anforderungsdatei

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Freitext-Anforderungen sind nicht prüfbar und nicht rückverfolgbar.

## Entscheidung

Jedes Bauteil hat eine `requirements.yaml` (JSON-Schema-validiert): Bauraum, Schnittstellen, Lasten, Werkstoff, Verfahren, Stückzahl, Toleranzklasse, Regelpakete. Claude übersetzt Freitext, der Mensch bestätigt.

## Alternativen

Freitext.

## Konsequenzen

Anforderungen werden prüfbar und rückverfolgbar.
