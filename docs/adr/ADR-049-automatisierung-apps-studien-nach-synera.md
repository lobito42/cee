# ADR-049: Automatisierung, Apps und Studien nach dem Vorbild von Synera

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Synera automatisiert Engineering-Abläufe mit Knoten-Workflows, macht daraus einfache Web-Apps für
Nicht-Experten und lässt KI-Agenten die Workflows als Werkzeuge aufrufen. Dort liegt der Workflow neben dem
Modell in fremden CAD-Systemen. In CEE sind Modell und Automatisierung derselbe Graph (ADR-028); damit sind
Abläufe versioniert, freigebbar und reproduzierbar.

## Entscheidung

1. **Untergraph als Befehl:** Ein Untergraph mit deklarierten Ein- und Ausgängen kann veröffentlicht werden
   und wird dadurch Befehl im Befehlsregister, Knoten im Knoten-Editor und MCP-Werkzeug (ADR-045) – ohne
   eigenen Code. Er ist versioniert wie jede Bibliothek und kann als Item freigegeben werden (ADR-047).
2. **Apps aus dem Graphen:** Aus einem veröffentlichten Untergraphen entsteht eine App: Formular aus den
   Eingängen (mit Einheiten, Grenzen, Auswahllisten), Ergebnis als 3D-Ansicht, Kennzahlen und Bericht. Apps
   laufen im Browser für Personen ohne Modellrechte, auf dem eigenen Server; Eingaben und Ergebnis werden als
   Änderungssatz bzw. eigener Stand gespeichert, nie direkt ins Modell geschrieben.
3. **Bibliotheken je Ebene und gesperrte Komponenten:** Bibliotheken gibt es für Person, Projekt und
   Organisation. Eine Komponente kann gesperrt werden: Nutzer sehen und ändern nur die exponierten Parameter,
   das Innenleben ist schreibgeschützt oder verborgen (ergänzt ADR-043).
4. **Werte an jeder Kante:** Der Knoten-Editor zeigt Zwischenergebnisse (Wert mit Einheit, Liste, kleine
   Geometrie-Vorschau, Befund) direkt am Knoten bzw. an der Kante, live bei jeder Änderung.
5. **Studien:** Elementtyp `study` – Parameterbereiche bzw. Varianten eines Untergraphen, die automatisch
   durchgerechnet werden (vollständig, zufällig oder gezielt). Ergebnis ist eine Tabelle mit Kennzahlen und
   ein Pareto-Diagramm; eine gewählte Lösung wird als Änderungssatz übernommen. Rechnen im Worker mit Cache nach
   Inhalts-Hash, als Hintergrundaufgabe (Oban), abbrechbar. Agenten dürfen Studien anstoßen; der Mensch wählt.

## Nicht übernommen

Workflow getrennt vom Modell; Agenten nur in einer bestimmten Cloud; Lizenzpool mit Tokens und geschlossener
Marktplatz; ein Kern mit tausend eingebauten Knoten.

## Alternativen

Automatisierung nur über Python-Skripte; Apps als eigene Software neben CEE; Variantenvergleich von Hand.

## Konsequenzen

Ändert ADR-043 (Bibliotheksebenen, gesperrte Komponenten), ergänzt ADR-035 und ADR-045. Neues Arbeitspaket
ap-35 (Apps und Studien) in Phase 2; Werte an Kanten und Untergraph als Befehl kommen mit ap-23. Weitere
Anregungen liegen im Ideenspeicher (`docs/ideen/synera-anregungen.md`).
