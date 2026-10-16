# ADR-010: Visuelle Selbstprüfung

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Manche Fehler zeigen sich nur im Bild (Orientierung, fehlende Features).

## Entscheidung

Der Geometrie-Dienst rendert offscreen sechs Standardansichten plus Isometrie als PNG, optional mit hervorgehobenen Befunden. Claude bewertet sie multimodal.

## Alternativen

Nur numerische Prüfungen.

## Konsequenzen

Benötigt Headless-Rendering auf allen Plattformen (Spike S5).
