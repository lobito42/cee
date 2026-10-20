# Glossar

Verbindliche Begriffe für Oberfläche, Dokumentation und Code-Kommentare. Neue Begriffe hier eintragen, bevor
sie verwendet werden. In Klammern: der englische Bezeichner im Code.

## Modell

| Begriff | Bedeutung |
| --- | --- |
| Element (`element`) | Kleinster Baustein des Graphen; jedes Element hat dieselbe Form (ADR-028) |
| Grundtyp | Elementtyp, den der Kern kennt (z. B. `component`, `instance`, `frame`, `variables`, `item`, `study`, `material`, `analysis`); Liste in `format/` |
| Fachtyp | Elementtyp aus einem Fachpaket (z. B. `wall`, `absorber`) |
| Fachpaket (`package`) | Sammlung von Fachtypen, Befehlen, Panels, Regeln und Arbeitsbereichen für eine Branche; nutzt die Fachpaket-API (ADR-054) |
| Plugin | Fachpaket oder Erweiterung von Dritten, isoliert ausgeführt (ADR-045); technisch dasselbe wie ein Fachpaket |
| Untergraph (`content`) | Inhalt eines Elements; Bauteil und Baugruppe sind Elemente mit Untergraph |
| Komponente (`component`) | Wiederverwendbare Vorlage mit exponierten Parametern, Varianten und Referenz-Eingängen (ADR-043, ADR-050) |
| Instanz (`instance`) | Verwendung einer Komponente; speichert nur Variante, gewählte Referenzen und Überschreibungen |
| Exponierter Parameter | Parameter einer Komponente, den Instanzen setzen dürfen (nicht „freigegeben“) |
| Variante (`variant`) | Benannter Parametersatz einer Komponente – nur in dieser Bedeutung |
| Referenz-Eingang | Eingang einer Komponente, der beim Einfügen im Kontext gewählt wird (Fläche, Kante, Ebene, Verbindungspunkt) |
| Bibliothek | Projekt, das Komponenten, Materialien oder Untergraphen veröffentlicht; Ebenen Person, Projekt, Organisation (ADR-049) |
| Verbindungspunkt (`frame`) | Lokales Koordinatensystem zum Platzieren (ADR-046) |
| Projektvariable (`variables`) | Benannter Wert mit Einheit, projektweit referenzierbar |
| Größe | Zahlenwert mit Dimension und Einheit (ADR-057) |
| Analyse (`analysis`) | Berechnetes Element, z. B. Nachhallzeit, Masse, Messung mit Grenzwert |
| Studie (`study`) | Automatisch durchgerechnete Varianten eines Untergraphen (ADR-049) |
| Befund | Ergebnis einer Regel oder Analyse mit Ort, Schwere und optional Korrektur |
| Vorschlag | Jede Änderung, die man nicht selbst direkt macht (KI, Konflikt, Update, Korrektur, Studie); erscheint als Entscheidungskarte mit Vorschau, Übernehmen und Verwerfen (ADR-021, `docs/design/leitbild.md`) |
| Regel, Regelpaket | Ausführbare Prüfung bzw. Sammlung davon (ADR-008) |
| Berechnungszustand | aktuell, veraltet, fehlerhaft, pausiert (ADR-050) |
| Detailstufe | Hülle, vereinfacht, voll (ADR-050) |
| Textprojektion | Verlustfreie Textform des Graphen (ADR-035) |

## Zusammenarbeit und Versionen

| Begriff | Bedeutung |
| --- | --- |
| Entwurf | Eigene Arbeitslinie, technisch ein Zweig; in der Oberfläche heißt es immer Entwurf (ADR-051) |
| Hauptstand | Der gemeinsame Stand eines Projekts |
| Ergebnis | Als gültiges Arbeitsergebnis gekennzeichneter Entwurf; die Standardansicht zeigt nur Ergebnisse |
| Verworfen | Ausgeblendeter, archivierter Entwurf mit Begründung; nie gelöscht |
| Ergebnis, Alle Entwürfe | Die zwei Ansichten eines Projekts: „Ergebnis“ zeigt nur den übernommenen Stand (Standard), „Alle Entwürfe“ zeigt auch verworfene und ausgeblendete Entwürfe mit Begründung (ADR-051); nicht „Werkstatt“ |
| Übernehmen | Entwurf in den Hauptstand oder einen anderen Entwurf zusammenführen |
| Meilenstein | Benannte Version, jederzeit setzbar |
| Version | Oberbegriff für einen festen Stand (Meilenstein oder Revision); nicht für Schnittstellen-SemVer |
| Schnittstellenversion | SemVer der veröffentlichten Elemente eines Bauteils bzw. einer Bibliothek (ADR-017, ADR-043) |
| Ableiten | Kopie mit Herkunft (`meta.derived_from`) |
| Verlauf | Wer hat wann was warum geändert, je Element |
| Entscheidungsprotokoll | Ergebnisse, Verwerfungen und Prüfentscheidungen eines Projekts |

## Änderungen und Freigabe

| Begriff | Bedeutung |
| --- | --- |
| Änderungssatz | Menge von Graph-Operationen, die vorgeschlagen, aber noch nicht übernommen ist (von KI, App oder Studie, ADR-021) |
| Entscheidungskarte | Das eine Muster für jede vorgeschlagene Änderung (KI, Konflikt, Bibliotheks-Update, Befund mit Korrektur, Studienergebnis) mit Vorschau, Übernehmen und Verwerfen (ADR-061); nicht „Änderungskarte“ |
| Zur Prüfung geben | Einen Entwurf zur Prüfung vorlegen (technisch eine Änderungsanfrage) |
| Änderungsantrag | Beschreibt ein Problem und die betroffenen Items, bevor geändert wird (ADR-047) |
| Änderungsauftrag | Entwurf mit den Änderungen zu einem Änderungsantrag; erzeugt beim Abschluss die neuen Revisionen |
| Veröffentlichen | Element zur Schnittstelle machen: adressierbar, exportierbar (ADR-015) – nicht Freigeben |
| Item (`item`) | Das, was freigegeben, bestellt oder gefertigt wird; mit Sachnummer, Revision, Status (ADR-047) |
| Revision | Freigegebener Stand eines Items (A, B, C …) |
| Freigeben | Ein Item in den Status Freigegeben bringen; nur Menschen mit der Rolle Freigeben |
| Freigabestand | Unveränderlicher, signierter Schnappschuss eines freigegebenen Items mit Dokumenten |

## Oberfläche

| Begriff | Bedeutung |
| --- | --- |
| Arbeitsbereich | Zusammenstellung von Panels und Werkzeugen für eine Aufgabe; Beitrag eines Fachpakets (ADR-054) |
| Befehl, Befehlsregister | Jede Funktion mit stabiler ID; Grundlage für Befehlssuche, Tastenkürzel, Plugins, MCP (ADR-045) |
| Layout: Desktop, Tablet | Anordnung der Oberfläche für Maus und Trackpad bzw. Touch und Stift (iPad); dieselben Befehle (ADR-060); nicht „Werkbank“ oder „Kompakt“ |
| Musterkatalog | Verbindliche Liste der Bedienmuster, je Aufgabe genau eines (`docs/design/muster.md`, ADR-061) |
| Wertfeld | Das eine Eingabefeld für Zahlen mit Einheit |
| Design-Token | Benannter Wert für Farbe, Schrift, Abstand usw.; Quelle `docs/design/tokens.json` |
| Navigationsprofil | Belegung von Maus und Gesten für Drehen, Verschieben, Zoomen nach dem Vorbild eines anderen Programms |
| 3D-Maus | Eingabegerät mit sechs Achsen (z. B. SpaceMouse); bewegt Objekt oder Kamera |
| Begehung | Ansicht eines Raums in Originalgröße in VR oder am Bildschirm |
| Höreindruck | Hörbare Vorschau der Raumakustik (vorher/nachher); ausdrücklich kein Messwert |
| App | Generierte Oberfläche aus einem veröffentlichten Untergraphen (ADR-049) |
| Sammlung | Gespeicherte Suche statt Ordner (ADR-052) |

## Entwicklung (nicht in der Produktoberfläche)

| Begriff | Bedeutung |
| --- | --- |
| Change | OpenSpec-Auftrag `openspec/changes/<id>/`; „freigegeben“ heißt hier: in `openspec/queue.yaml` eingetragen |
| Arbeitspaket | Zeile im Konzept (ap-xx), wird zu einem oder mehreren Changes |
| Abnahmetest | Vertrag eines Changes unter `tests/acceptance/<id>/` |
