# Idee: Weitere Anregungen aus klassischem CAD (CATIA, NX, Creo)

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits (ADR-050):
Referenz-Eingänge an Komponenten mit Ersetzen und Umhängen, direktes Bearbeiten als Element, robuste
Neuberechnung, Skelett mit eingefrorenen Verknüpfungen, Teil-Laden und Detailstufen, Messungen und
Modellierrichtlinien als Elemente bzw. Regeln.

| Vorbild | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Creo-Modellbaum mit Spalten | Featurebaum mit frei wählbaren Spalten (Parameter, Masse, Status, Revision), bearbeitbar wie eine Tabelle | mit ap-08 |
| NX: rollenbasierte Oberfläche | Rollen (Einsteiger, Konstrukteur, Prüfer) blenden Befehle ein und aus, ergänzend zu den Arbeitsbereichen | nach Nutzertests |
| Eltern-Kind-Ansicht | „Wovon hängt das ab, was hängt davon ab?“ als kleiner Graph rund um die Auswahl | mit ap-23 |
| NX Arrangements | Mehrere Stellungen einer Baugruppe (geöffnet, geschlossen, Transport) | Fachpaket Mechanik |
| Kinematik, verformbare Teile | Gelenke und Bewegung prüfen; Federn und Schläuche, die sich der Einbaulage anpassen | Fachpaket Mechanik |
| Creo Layout, CATIA Functional Design | 2D-Konzeptskizze, die das 3D-Modell steuert | nach ap-36 |
| Kollisions- und Abstandsprüfung | Steht bereits als F-09; hier nur: Mindestabstände als Regel im Regelpaket | mit ap-20 |
| Positionsnummern in Zeichnungen | Positionsnummern aus der Stückliste, automatisch und verknüpft | mit ap-33 |
| CATIA Geometrical Sets | Ungeordnete Hilfsgeometrie neben der geordneten Historie | offen |
| JT und leichte Formate | Leichte Darstellung großer Baugruppen für Viewer und Lieferanten | mit ap-22 |

## Bewusst nicht

- Ribbon, Menüs mit tausend Befehlen, Dialogketten (ADR-022).
- Dateibasiertes PDM mit Ein- und Auschecken und Sperren (ADR-033).
- Geschlossene Formate, Lizenzen je Modul (ADR-034).
- Bedienung, die nur mit Schulung funktioniert.
