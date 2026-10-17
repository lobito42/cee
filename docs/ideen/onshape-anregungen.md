# Idee: Weitere Anregungen aus Onshape

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits: fachneutraler Kern,
eingebaute Typen über die Plugin-API, Verbindungspunkte, Projektvariablen, Verweise auf feste Versionen
(ADR-046) sowie Freigabe mit Revisionen und Lebenszyklus (ADR-047).

| Onshape | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Rollback-Leiste im Featurebaum | Modell auf einen früheren Schritt zurücksetzen, dort einfügen, weiterarbeiten | mit ap-08b |
| Folgen-Modus | Der Ansicht einer Kollegin folgen, für Schulungen und Kundentermine (zugleich Live Share in den VS-Code-Anregungen) | mit ap-07b |
| Öffentliche Dokumente | Öffentliche Projekte und Bibliotheken zum Entdecken und Kopieren, als Community-Schaufenster | mit ap-28 |
| Mobile Apps | Die Web-App läuft schon im Browser (ADR-031); hier: für Touch optimierte Ansicht zum Ansehen, Kommentieren, Varianten umschalten und Freigeben | nach der Beta |
| Kommentare an der Geometrie | Kommentare an Elementen stehen als F-20; hier zusätzlich an Flächen, mit @-Erwähnung und Aufgabe | mit ap-07b |
| Audit-Verlauf | Wer hat was wann geändert und freigegeben, exportierbar für Nachweispflichten | mit ap-33a |
| Mate-Typen mit Freiheitsgraden | Starr, Drehen, Schieben, Zylinder, Kugel; Bewegung in der Baugruppe prüfen | Fachpaket Mechanik |
| Abgeleitete Teile (Derived) | Erledigt durch „Ableiten“ mit Herkunft (ADR-051) | – |
| Teilestudio mit mehreren Teilen | Mehrere Teile im selben Kontext entwerfen (top-down), dann als Items getrennt freigeben | Fachpaket Mechanik |
| Verwendungsnachweis über Projekte | Rückverweise stehen in ADR-052; hier zusätzlich die Folgenabschätzung bei Änderungen | mit ap-37b |

## Bewusst nicht

- Nur Cloud, kein Offline (ADR-033).
- Daten nur beim Anbieter; bei CEE ist der Server selbst hostbar (ADR-037).
- Proprietärer Kernel und geschlossener Code.
- Eigene Sprache wie FeatureScript; wir nutzen Python und build123d.
- Kostenlos nur mit öffentlichen Daten.
