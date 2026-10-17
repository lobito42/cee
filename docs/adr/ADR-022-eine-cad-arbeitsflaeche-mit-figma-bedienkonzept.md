# ADR-022: Eine CAD-Arbeitsfläche mit Figma-Bedienkonzept

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-031, ADR-044, ADR-045

## Kontext

Die UI muss auch komplexe Konstruktion lean und ohne 1001 Befehle ermöglichen.

## Entscheidung

Arbeitsfläche, Eigenschaften-Panel, Werkzeugleiste (fünf Werkzeuge), Befehlssuche, Änderungskarten, Verlauf und Varianten in einem Vollbild-Webview-Custom-Editor. Featurebaum als native TreeView in der Primary Sidebar, synchron zur Auswahl. Konstrukteur-Modus blendet übrige VS-Code-UI aus. Eigenes Designsystem auf VS-Code-Theme-Variablen.

## Alternativen

Mehrere Webviews; klassische Menü- und Ribbon-UI.

## Konsequenzen

Visuelle Regressionstests je Theme sichern die Qualität.
