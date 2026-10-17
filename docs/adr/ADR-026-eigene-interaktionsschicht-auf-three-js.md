# ADR-026: Eigene Interaktionsschicht auf three.js

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-040

## Kontext

three-cad-viewer ist zum Anzeigen gebaut, nicht für Griffe, Vorschau und ID-genaue Auswahl.

## Entscheidung

Eigene Schicht: Szenengraph mit Element-IDs, GPU-Picking, Ziehgriffe, Vorschau-Layer, Overlays; binäre Tessellierungsdaten.

## Alternativen

three-cad-viewer unverändert erweitern.

## Konsequenzen

Mehr eigener Code, volle Kontrolle über Bedienqualität; geprüft in ap-04.
