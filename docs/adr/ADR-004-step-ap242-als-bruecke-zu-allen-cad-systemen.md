# ADR-004: STEP AP242 als Brücke zu allen CAD-Systemen

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-042

## Kontext

Ergebnisse müssen in SolidWorks, NX, CATIA, Creo, Inventor und Fusion weiterfließen.

## Entscheidung

Export als STEP AP242 mit Farben, Namen, Baugruppenstruktur, Namen und Adressen veröffentlichter Elemente sowie semantischer PMI; STL/3MF für additive Fertigung; DXF für Blechabwicklungen.

## Alternativen

Native Makro-Generatoren je CAD-System (Kandidat nach der Beta).

## Konsequenzen

Im Ziel-CAD gibt es keinen Feature-Baum; Änderungen erfolgen im Code oder per Direktmodellierung.
