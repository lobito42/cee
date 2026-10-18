# ADR-022: Eine CAD-Arbeitsfläche mit Figma-Bedienkonzept

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-031, ADR-044, ADR-045

## Aktuell gilt (Stand 2026-10-17)

Es gilt das Bedienkonzept nach Figma: eine ruhige Arbeitsfläche, Eigenschaften-Panel, fünf Werkzeuge, Befehlssuche, Änderungskarten, keine Menüleisten und Dialoge. Alles VS-Code-Bezogene (Custom Editor, Primary Sidebar, Theme-Variablen) entfällt mit ADR-031. Ergänzt durch ADR-044 (Arbeitsbereiche, siehe ADR-054), ADR-045 und ADR-051. Einzige Ausnahme bei Menüs: das systemübliche kleine App-Menü auf macOS, dessen Einträge Befehle sind (ADR-060). Bausteine, Tokens, Schrift und Farben nach ADR-061 (Musterkatalog `docs/design/muster.md`).

## Kontext

Die UI muss auch komplexe Konstruktion lean und ohne 1001 Befehle ermöglichen.

## Entscheidung

Arbeitsfläche, Eigenschaften-Panel, Werkzeugleiste (fünf Werkzeuge), Befehlssuche, Änderungskarten, Verlauf und Varianten in einem Vollbild-Webview-Custom-Editor. Featurebaum als native TreeView in der Primary Sidebar, synchron zur Auswahl. Konstrukteur-Modus blendet übrige VS-Code-UI aus. Eigenes Designsystem auf VS-Code-Theme-Variablen.

## Alternativen

Mehrere Webviews; klassische Menü- und Ribbon-UI.

## Konsequenzen

Visuelle Regressionstests je Theme sichern die Qualität.
