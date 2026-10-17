# ADR-010: Visuelle Selbstprüfung

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Gilt sinngemäß: Ansichten rendert der Worker bzw. der Client (ADR-040), bewerten kann jedes multimodale Modell über die Anbieter-Schnittstelle (ADR-037), nicht nur Claude. Die Bewertung ist ein Hinweis, nie ein Prüfer im Sinne von ADR-053.

## Kontext

Manche Fehler zeigen sich nur im Bild (Orientierung, fehlende Features).

## Entscheidung

Der Geometrie-Dienst rendert offscreen sechs Standardansichten plus Isometrie als PNG, optional mit hervorgehobenen Befunden. Claude bewertet sie multimodal.

## Alternativen

Nur numerische Prüfungen.

## Konsequenzen

Benötigt Headless-Rendering auf allen Plattformen (mit ap-04 zu prüfen).
