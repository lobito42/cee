# Idee: Weitere Anregungen aus Onshape

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits: fachneutraler Kern,
eingebaute Typen über die Plugin-API, Verbindungspunkte, Projektvariablen, Verweise auf feste Versionen
(ADR-046) sowie Freigabe mit Revisionen und Lebenszyklus (ADR-047).

| Onshape | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Rollback-Leiste im Featurebaum | Modell auf einen früheren Schritt zurücksetzen, dort einfügen, weiterarbeiten | mit ap-08 |
| Folgen-Modus | Der Ansicht einer Kollegin folgen, für Schulungen und Kundentermine | mit ap-07 |
| Öffentliche Dokumente | Öffentliche Projekte und Bibliotheken zum Entdecken und Kopieren, als Community-Schaufenster | mit ap-28 |
| Mobile Apps | Modell auf Tablet und Telefon ansehen, kommentieren, Varianten umschalten, freigeben | nach der Beta |
| Kommentare an der Geometrie | Kommentar an Element oder Fläche mit @-Erwähnung und Aufgabe | mit ap-07 |
| Audit-Verlauf | Wer hat was wann geändert und freigegeben, exportierbar für Nachweispflichten | mit ap-33 |
| Mate-Typen mit Freiheitsgraden | Starr, Drehen, Schieben, Zylinder, Kugel; Bewegung in der Baugruppe prüfen | Fachpaket Mechanik |
| Abgeleitete Teile (Derived) | Ein Teil aus einem anderen Projekt übernehmen und weiterbearbeiten, mit Verweis auf dessen Revision | nach ap-26 |
| Teilestudio mit mehreren Teilen | Mehrere Teile im selben Kontext entwerfen (top-down), dann als Items getrennt freigeben | Fachpaket Mechanik |
| Verwendungsnachweis über Projekte | „Wo verwendet?“ über alle Projekte einer Organisation, mit Folgenabschätzung bei Änderungen | mit ap-34 |

## Bewusst nicht

- Nur Cloud, kein Offline (ADR-033).
- Daten nur beim Anbieter; bei CEE ist der Server selbst hostbar (ADR-037).
- Proprietärer Kernel und geschlossener Code.
- Eigene Sprache wie FeatureScript; wir nutzen Python und build123d.
- Kostenlos nur mit öffentlichen Daten.
