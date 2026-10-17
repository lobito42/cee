# ADR-025: Inkrementeller Rebuild und Näherungsvorschau

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-032, ADR-050 (robuste Neuberechnung, Detailstufen)

## Kontext

Vollständiger Neuaufbau dauert Sekunden; die UI verlangt < 100 ms.

## Entscheidung

Feature-Cache (Schlüssel: Code und Eingangsparameter), Rebuild ab erstem geänderten Feature, abbrechbare Hintergrund-Builds, Näherungsvorschau beim Ziehen.

## Alternativen

Immer vollständiger Neuaufbau.

## Konsequenzen

Features müssen deterministisch sein; ap-05 und ap-06 messen die Zeiten.
