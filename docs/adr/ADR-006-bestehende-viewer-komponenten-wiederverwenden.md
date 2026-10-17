# ADR-006: Bestehende Viewer-Komponenten wiederverwenden

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-17)

Gilt weiter für die Tessellierung im Worker (ocp_tessellate). Die Arbeitsfläche ist eine eigene Schicht auf three.js im Client (ADR-026, ADR-040); three-cad-viewer dient nur als Referenz.

## Kontext

OCP CAD Viewer (Apache-2.0) zeigt build123d-Objekte über three-cad-viewer an und nutzt ocp_tessellate.

## Entscheidung

ocp_tessellate für die Tessellierung; three-cad-viewer als Ausgangspunkt und Referenz. Die interaktive Arbeitsfläche regelt ADR-026. Früher Kontakt zum Maintainer.

## Alternativen

Alles selbst bauen.

## Konsequenzen

Weniger Aufwand bei Tessellierung und Grundanzeige. Teilweise ersetzt durch ADR-026.
