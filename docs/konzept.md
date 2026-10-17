<!-- Export des Konzept-Dokuments (Claude Docs). Quelle: https://claude.ai/code/artifact/3474113f-d8a6-4a50-90bc-600134300c07
     Nicht von Hand ändern: Änderungen im Dokument vornehmen und neu exportieren. -->

# CEE – Collaborative Engineering Environment: Konzept

Stand: 2026-10-17

## Zusammenfassung

Wir bauen eine offene, kollaborative Plattform für Produktdefinition: CEE, das Collaborative Engineering Environment. Das Logo ist ein C mit einem freistehenden Strich in der Mitte, angelehnt an das Zeichen „ist Element von“. Ein Projekt ist ein **Graph aus Elementen**, in dem ein Achsenursprung genauso behandelt wird wie ein ganzes Bauteil. Online sehen alle denselben Stand wie in Figma, offline geht es weiter wie bei Git. Bearbeitet wird in 3D, im Knoten-Editor oder als Text, von Menschen und KI-Agenten gemeinsam.

**Rahmen:** CEE ist ein ehrgeiziges Testprojekt, das von Anfang an so gebaut wird, dass es als Open-Source-Projekt veröffentlicht werden kann. Zielgruppe sind Einzelpersonen sowie kleine und mittlere Unternehmen. Perspektivisch soll CEE für die Produktentwicklung in KMU werden, was Blender und OpenSCAD für ihre Communities sind: offen, von einer Community getragen, ohne Lizenzschranke und für jedes Produkt. Erster Nutzer – nur, um das Ganze produktiv zu bekommen – ist eine kleine Firma, die Schallabsorber entwickelt: Räume gestalten, Absorber platzieren, Nachhallzeit, Kosten und CO₂ berechnen und das Ergebnis fotorealistisch zeigen. Die menschliche Zeit ist knapp; ein ausdrücklicher Zweck ist, autonomes Arbeiten von KI-Agenten zu erproben. Offenheit gegenüber KI-Modellen, lokale Modelle sowie selbst gehostete Daten und Modelle gelten ab dem ersten Tag (ADR-037).

**Sechs Ziele und woran wir sie messen**

| Ziel | Was das heißt | Messlatte |
| --- | --- | --- |
| 1 Benutzerfreundlich, mächtig, erweiterbar | Bedienkonzept nach Figma mit fünf Werkzeugen; Plugins für eigene Elementtypen, Knoten und Regeln | 4 von 5 Konstrukteuren lösen die Kernabläufe ohne Einweisung; erstes Fremd-Plugin ohne Änderung am Kern |
| 2 Open Source mit Community statt Forks | Kern MPL-2.0, SDK und Format Apache-2.0; offene RFCs über OpenSpec; geschützte Marke | Beiträge von außen in jedem Release; keine gepflegte Abspaltung |
| 3 Kollaborativ | Live: alle sehen dasselbe, mit Anwesenheit und Kommentaren am Element. Offline: Entwürfe, Zur Prüfung geben, Übernehmen | Änderung bei allen in < 200 ms; zwei Entwürfe mit je 500 Änderungen ohne Datenverlust zusammengeführt |
| 4 KI-optimiert | Features as Code (Textprojektion), Visual Programming (Knoten-Editor), MCP für jedes Modell; lokale und selbst gehostete Modelle von Anfang an | Ein Agent baut ein Referenzteil über MCP ohne menschlichen Eingriff, mit einem Cloud- und einem lokalen Modell |
| 5 Immersiv (optional) | Review in Originalgröße über WebXR | nach der Beta |
| 6 Testfeld für autonome Entwicklung | Agenten setzen freigegebene Changes unbeaufsichtigt um; Menschen schreiben Ziele, prüfen und entscheiden | Anteil der Changes, die ohne Nacharbeit gemergt werden; menschliche Minuten je gemergtem Change, je Gate gemessen |

**Das Fundament ist das atomare Datenmodell.** Jedes Element – Punkt, Achse, Skizze, Feature, Fläche, Körper, Bauteil, Baugruppe, Maß, Zeichnungsblatt, Regel, Anforderung – hat dieselbe Form, eine stabile ID und eine eigene Historie. Deshalb lässt sich alles gleich adressieren, veröffentlichen, kommentieren, versionieren und zusammenführen.

**Ziel bis zur öffentlichen Beta:** Ein kleines Team modelliert einen Raum mit Grundriss, Wänden, Decke, Boden, Fenstern, Türen und Möbeln, platziert Schallabsorber aus dem eigenen Katalog und sieht die Nachhallzeit je Oktavband live. Materialien tragen Aussehen, Akustik, Physik, Kosten und CO₂; daraus entstehen Mengen, Kosten und ein Bericht für das Angebot, dazu ein fotorealistisches Bild. Alle arbeiten live gemeinsam oder offline, Agenten helfen über MCP – auch mit einem lokalen Modell – und alles läuft auf eigener Hardware. Dazu kommen Entwürfe, Freigabe mit Revisionen, Suche, Textprojektion, Regeln und eine Knoten-Ansicht (ADR-059). Das Tempo bestimmen die Agenten, nicht feste Termine; die Monatsangaben in der Roadmap sind Richtwerte.

**Nicht-Ziele bis zur Beta:** Freiformflächen in Class-A-Qualität, native Feature-Bäume in kommerziellen CAD-Systemen, PLM- und ERP-Anbindung (Schnittstelle nach der Beta, ADR-048), FEM, Fertigungsregeln (Fräsen, 3D-Druck, Blech, Spritzguss), vollständiges BIM (Statik, Haustechnik, Bauantrag), ein eigener Geometrie-Kernel, Modellieren in XR, eine VS-Code-Integration, ein eigener KI-Dienst mit Abrechnung, Funktionen für Konzerne (PLM, feingranulare Rechteverwaltung); nach ADR-059 außerdem Bearbeiten im Knoten-Editor, Apps und Studien, IFC- und DXF-Import, Möbel aus glTF und das Änderungswesen.

## Erster Anwendungsfall: Raumakustik mit Schallabsorbern

Die Firma braucht einen durchgängigen Ablauf vom leeren Raum bis zum Angebot, ohne Wechsel zwischen CAD, Akustik-Tabelle und Rendering-Programm (ADR-038).

1. **Raum anlegen:** Grundriss zeichnen oder aus IFC bzw. DXF übernehmen; Wände, Boden, Decke, Fenster und Türen entstehen als Elemente mit Material.
2. **Einrichten:** Möbel aus der Bibliothek oder als glTF; sie zählen mit ihrer äquivalenten Absorptionsfläche.
3. **Absorber platzieren:** Wandpaneele, Deckensegel, Baffeln oder Stellwände aus dem eigenen Katalog; eigene Formen per Skizze und Extrusion.
4. **Wirkung sehen:** Nachhallzeit je Oktavband nach Sabine und Eyring, live beim Verschieben, gegen ein Zielband (ADR-041).
5. **Zeigen und anbieten:** Echtzeit-Ansicht und Fotomodus (ADR-040); Mengen, Kosten, Gewicht und CO₂ aus Geometrie und Material; PDF-Bericht mit vorher/nachher.

**Erster, nicht einziger Anwendungsfall.** Die Raumakustik ist das erste Fachpaket und prüft den Kern im Alltag einer echten Firma. Der Kern bleibt fachneutral: Bauteile, Baugruppen, Zeichnungen, Varianten, Stücklisten und Freigaben mit Revisionen gelten für jedes Produkt, vom Halter aus Blech bis zur Maschine. Der Spike ap-01 prüft deshalb neben dem Raum eine mechanische Baugruppe gegen dasselbe Schema (ADR-046).

**Elemente des Anwendungsfalls**

| Element | Beschreibung | Wichtige Parameter |
| --- | --- | --- |
| `level` | Geschoss mit Grundriss | Höhe, Bezugshöhe |
| `wall` | Wand entlang einer Achse | Dicke, Höhe, Schichtaufbau aus Materialien |
| `slab` | Boden oder Decke | Dicke, Material |
| `opening` | Fenster oder Tür, sitzt in einer Wand | Breite, Höhe, Brüstung, Material |
| `furniture` | Möbel aus Bibliothek oder eigenem Untergraphen | Äquivalente Absorptionsfläche je Band |
| `absorber` | Produkt mit Variante, Maßen und Montageart | Material, Abstand zur Wand, Stückpreis |
| `material` | Eigenschaften an einer Stelle (ADR-039) | siehe nächste Tabelle |
| `analysis` | Berechnetes Ergebnis, z. B. Nachhallzeit | Raum, Zielwerte, Verfahren |
| component | Wiederverwendbare Vorlage mit Untergraph (ADR-043) | Freigegebene Parameter, Varianten, Version |
| instance | Verwendung einer Komponente im Raum | Variante, Überschreibungen, Lage |

**Eigenschaften eines Materials**

| Gruppe | Inhalt | Einheit |
| --- | --- | --- |
| Aussehen | Farbe, Rauheit, Metallizität, Textur, Transparenz (glTF-PBR) | – |
| Akustik | Absorptionsgrad α je Oktavband 125–4000 Hz, daraus αw und Absorberklasse | 0–1 |
| Physik | Dichte, Wärmeleitfähigkeit | kg/m³, W/(m·K) |
| Brandverhalten | Klasse nach EN 13501-1 | – |
| Kosten | Preis je Einheit | €/m², €/Stück |
| Nachhaltigkeit | Treibhauspotenzial (GWP), Quelle (z. B. EPD) | kg CO₂-Äq. je Einheit |

Jeder Wert trägt Einheit und Quelle; Herstellerdaten der Firma kommen als eigene Bibliothek.

## Rahmenbedingungen und Anforderungen

Die Lösung muss fachneutral sein (jede Branche über Fachpakete), über offene Formate mit gängigen CAD-Systemen zusammenarbeiten und vollständig Open Source sein. Daraus folgen ein neutrales Austauschformat (STEP), ein lizenzfreundlicher Kernel und ein modular erweiterbares Regelwerk.

**Funktionale Anforderungen**

| ID | Anforderung | Priorität |
| --- | --- | --- |
| F-01 | Modell als Element-Graph bearbeiten und live in Browser und Desktop-App anzeigen | Muss |
| F-02 | KI-Agenten beliebiger Anbieter, lokal oder in der Cloud, steuern Bauen, Messen, Rendern, Prüfen und Exportieren über MCP-Werkzeuge | Muss |
| F-03 | Anforderungen strukturiert erfassen (Bauraum, Lasten, Schnittstellen, Werkstoff, Verfahren) als Elemente vom Typ requirement (ap-05, ap-15) | Muss |
| F-04 | Konstruktionsrichtlinien als ausführbare Regeln: Raumakustik und Modellierrichtlinien vor der Beta (ap-20), Fertigungsverfahren danach (ap-31) | Muss |
| F-05 | Export STEP AP242 vor der Beta (ap-33a); STL/3MF und Zeichnungsansichten als SVG/DXF nach der Beta (ap-31) | Muss |
| F-06 | Auswahl von Elementen, Flächen und Kanten wird als Kontext an den KI-Assistenten übergeben | Muss |
| F-07 | Parametrische Bibliothek geprüfter Komponenten (ap-13); Normteile mit einem Fachpaket Mechanik nach der Beta | Muss |
| F-08 | Blech: Abwicklung mit K-Faktor, Biegeradien, Freischnitte (nach der Beta) | Soll |
| F-09 | Baugruppen mit Verbindungen (Joints) und Kollisionsprüfung (Fachpaket Mechanik, nach der Beta) | Soll |
| F-10 | FEM-Vorabschätzung (linear-statisch) | Kann |
| F-11 | Import bestehender STEP-Teile als Referenz/Schnittstelle | Soll |
| F-12 | Stabile Identität für jedes Element (Parameter, Punkt, Achse, Ebene, Kante, Fläche, Körper, Skizze, Annotation, Zeichnungsblatt, Instanz) über Modelländerungen hinweg | Muss |
| F-13 | Konstrukteur entscheidet per Klick oder Code, welche Elemente veröffentlicht sind; alles andere gilt als Hilfsfeature; unabhängig von Sichtbarkeit | Muss |
| F-14 | Jedes veröffentlichte Element einzeln exportierbar und über eine stabile Adresse referenzierbar | Muss |
| F-15 | Versionierung der Bauteil-Schnittstelle mit semantischem Diff je Element | Muss |
| F-16 | Rückverfolgung Anforderung → Element → Regelbefund → Zeichnungsblatt (ap-26, ap-37a) | Muss |
| F-17 | Semantische PMI (Maße, Toleranzen, Bezüge, Oberflächen) an Element-IDs gebunden (nach der Beta, ap-31) | Muss |
| F-18 | Zeichnungsblätter als Elemente, aus dem Modell abgeleitet, mit eigener Revision und an Element-IDs gebunden (nach der Beta, ap-31) | Muss |
| F-19 | Parametrische 2D-Skizzen mit Zwangsbedingungen und Maßen auf Flächen und Ebenen; interaktiv zeichnen, per Text beschreiben oder aus Handskizze, Foto oder DXF ableiten (Zwangsbedingungen nach Lizenzklärung, ap-12; Foto und DXF nach der Beta, ap-21) | Muss |
| F-20 | Gleichzeitiges Arbeiten am selben Projekt: Änderungen, Auswahl und Cursor der anderen live sichtbar; Kommentare an jedem Element | Muss |
| F-21 | Offline weiterarbeiten; Entwürfe, Zur Prüfung geben und Übernehmen – Git-Mechanik ohne Git-Begriffe (ADR-051); semantische Konflikte als Befund | Muss |
| F-22 | Drei gleichwertige Ansichten desselben Graphen: 3D, Knoten-Editor, Text (Knoten in der Beta nur lesend, Bearbeiten danach) | Muss |
| F-23 | Textprojektion für Git und Review; Export und Import in echte Git-Repositories | Muss |
| F-24 | Plugin-SDK für eigene Elementtypen, Knoten, Regeln und Panels (TypeScript, Python) | Soll |
| F-25 | Immersives Review über WebXR | Kann |
| F-26 | 3D-Druck: Druckbarkeit prüfen (Überhänge, Wandstärken, Bauraum), Ausrichtung vorschlagen, Export als 3MF (nach der Beta) | Kann |
| F-27 | Raum modellieren: Grundriss, Wände, Boden, Decke, Fenster, Türen; 2D-Grundriss und 3D zeigen dieselben Elemente | Muss |
| F-28 | Materialbibliothek mit Aussehen, Akustik, Physik, Brandverhalten, Kosten und CO₂; Import von Herstellerdaten | Muss |
| F-29 | Nachhallzeit je Oktavband nach Sabine und Eyring, live beim Platzieren, mit Zielband | Muss |
| F-30 | Absorber aus Katalog platzieren (Wand, Decke, abgehängt, freistehend), auch in Reihen und Rastern | Muss |
| F-31 | Echtzeit-Rendering mit PBR und Fotomodus (Path Tracing) für fotorealistische Bilder | Muss |
| F-32 | Mengen, Kosten, Gewicht und CO₂ je Raum; PDF-Bericht mit Nachhallzeit vorher/nachher; CSV-Mengenliste | Muss |
| F-33 | Import von IFC und DXF; Möbel und Szenen als glTF | Soll |
| F-34 | Komponenten wie in Figma: Auswahl zur Vorlage machen, Parameter und Varianten festlegen, Instanzen mit Überschreibungen, Bibliotheken mit Versionen und Aktualisierung mit Vorschau, Lösen | Muss |
| F-35 | Freigabeprozess: Items mit Sachnummer, Revision und Status; Prüfen und Freigeben (Selbstfreigabe bis zwei Personen, danach Vier-Augen-Prinzip); unveränderliche Freigabestände mit Manifest, Mengenliste als Stückliste, STEP und Bericht (ap-33a) | Muss |
| F-36 | Stückliste und Verwendungsnachweis aus dem Graphen; Änderungsantrag und Änderungsauftrag auf Basis von Entwürfen, mit Folgen für alle Verwender (nach der Beta, ap-33b) | Muss |
| F-37 | Verbindungspunkte zum Platzieren von Teilen und Produkten; Projektvariablen mit Einheiten an einer Stelle | Muss |
| F-38 | Offene Schnittstelle zu PLM und ERP: Austauschformat, API, Ereignisse, Nummernkreise (nach der Beta) | Soll |
| F-39 | Untergraph als Befehl: veröffentlichte Untergraphen werden ohne Code zu Befehl, Knoten und MCP-Werkzeug (nach der Beta, ap-23) | Muss |
| F-40 | Apps aus dem Graphen: Formular, 3D-Ergebnis und Bericht für Personen ohne Modellrechte, z. B. Vertrieb oder Kunden-Konfigurator | Soll |
| F-41 | Studien: Parameterbereiche automatisch durchrechnen, Tabelle und Pareto-Diagramm, gewählte Lösung als Änderungssatz | Soll |
| F-42 | Komponenten mit Referenz-Eingängen (Fläche, Kante, Ebene, Verbindungspunkt), im Kontext gewählt; Ersetzen mit Umhängen (M2, ap-13b) | Muss |
| F-43 | Direktes Bearbeiten von Flächen, auch an importiertem STEP ohne Historie, als Element im Graphen | Soll |
| F-44 | Robuste Neuberechnung: ein fehlerhaftes Element markiert, das Modell bleibt bedienbar; Skelett mit live oder eingefrorenen Verknüpfungen (Skelett nach der Beta, ap-36) | Muss |
| F-45 | Teil-Laden und Detailstufen für Baugruppen mit 5.000 Teilen; Messungen mit Grenzwert und Modellierrichtlinien als Regeln | Muss |
| F-46 | Versionierung ohne Git-Begriffe: automatisch gesichert; Entwurf, Meilenstein, Übernehmen, Zur Prüfung geben, Zurückholen, Ableiten, Verlauf; Konflikte als Entscheidungskarten | Muss |
| F-47 | Entwicklungstrichter: Idee, In Arbeit, Ergebnis, Verworfen mit Begründung; ruhige Standardansicht mit Ergebnissen, Werkstatt mit allen Entwürfen; Herkunft und Entscheidungsprotokoll (Protokoll nach der Beta, ap-37b) | Muss |
| F-48 | Ordnung und Wiederfinden: feste schlanke Struktur, automatische Facetten, eine Suche für alles, Links ohne Bruch, Rückverweise, Sammlungen, Startseite, Doppelteil-Hinweis (Sammlungen und Doppelteil-Hinweis nach der Beta, ap-37b) | Muss |
| F-49 | Lernschleife für lokale Modelle: Aufgabengenerator, Prüfer, Erfahrungsspeicher, LoRA-Adapter aus geprüften Erfolgen (nach der Beta) | Kann |
| F-50 | Rechte, Rollen und Anmeldung: OIDC, Rollen je Organisation, Bereich und Projekt, Gäste für Kunden und Lieferanten, Dienstkonten für Agenten | Muss |

**Nicht-funktionale Anforderungen**

| ID | Anforderung | Zielwert |
| --- | --- | --- |
| N-01 | Rebuild-Zeit Einzelteil (typisch) | < 3 s |
| N-02 | Plattformen | Browser (Chromium, Firefox, Safari); Desktop-App für Linux, Windows, macOS |
| N-03 | Reproduzierbarkeit | Gleicher Graph + gleiche Kernel-Version = gleiche Geometrie und gleicher Hash |
| N-04 | Lizenz | Kern MPL-2.0, SDK und Format Apache-2.0; nur kompatible Abhängigkeiten |
| N-05 | Datenhoheit | Selbst betreibbarer Server; Desktop-App voll offline; an ein LLM geht nur, was der Nutzer freigibt |
| N-06 | Erweiterbarkeit | Neue Regelpakete ohne Änderung am Kern |
| N-07 | Bedienbar ohne KI | Alle Funktionen auch ohne KI nutzbar |
| N-08 | Latenz der Zusammenarbeit | Änderung bei allen Teilnehmern < 200 ms (gleiche Region) |
| N-09 | Projektgröße | 100.000 Elemente laden in ≤ 2 s |
| N-10 | KI ohne Cloud | Alle KI-Funktionen mit einem lokalen Modell nutzbar, ohne Internetzugang |
| N-11 | Barrierefreiheit | Bedienelemente außerhalb der 3D-Fläche nach WCAG 2.2 AA; jede Funktion per Tastatur über die Befehlssuche erreichbar |
| N-12 | Sprachen | Oberfläche von Anfang an auf Deutsch und Englisch, keine festen Texte im Code |
| N-13 | Datenschutz | DSGVO-konform nach ADR-056; Export aller eigenen Daten; keine gespeicherte Anwesenheit |
| N-14 | Einheiten | Jede Zahl mit Einheit; Dimensionsfehler werden erkannt, bevor gerechnet wird (ADR-057) |

**Annahmen:** Konstrukteure akzeptieren ein Modell, das sie wahlweise in 3D, als Knoten oder als Text sehen; das native Weiterarbeiten in anderen CAD-Systemen erfolgt auf STEP (ohne Feature-Baum).

## Systemarchitektur

Ein Rust-Kern hält das Datenmodell und läuft überall gleich: im Elixir-Server, im Browser, in der Desktop-App und im Python-SDK. Synchronisiert wird nur das Rezept, der Element-Graph; Geometrie berechnen zustandslose Worker mit OpenCascade und legen sie nach Inhalts-Hash im Cache ab.

&#91;embedded content: Systemarchitektur · drei Clients, ein Server, Worker und Speicher, ein Rust-Kern\]

| Schicht | Aufgabe | Technik | Warum so |
| --- | --- | --- | --- |
| Rust-Kern (`crates/graph`) | Elementschema, Abhängigkeiten, inkrementelle Neuberechnung, CRDT-Dokument, Textprojektion, Hashes | Rust, automerge-rs; eingebunden als Rustler-NIF, WASM, nativ, PyO3 | Eine einzige Implementierung des Datenmodells (ADR-029) |
| Server (`server/`) | Sync, Anwesenheit, Historie, Zweige, Freigaben, Rechte, Worker-Steuerung, Jobs, MCP | Elixir, Phoenix, Oban, PostgreSQL | Viele Verbindungen, ein überwachter Prozess je Dokument, Fehlerisolation (ADR-030) |
| Client (`client/`) | Arbeitsfläche, Knoten-Editor, Textansicht, Kommentare | TypeScript, three.js; Browser und Tauri 2 | Ein Code für Web und Linux, Windows, macOS; offline auf dem Desktop (ADR-031) |
| Worker (`worker/`) | Geometrie, Tessellierung, STEP, Renderings | Python, build123d, OCP (OpenCascade) | Eigener Prozess: ein Kernel-Absturz trifft nie den Server (ADR-032) |
| KI-Agenten | Bauen, prüfen, ändern über Änderungssätze | MCP-Endpunkt im Server | Dieselben Operationen wie für Menschen (ADR-007, ADR-021) |

Im Browser rechnet der Server die Geometrie; die Desktop-App bringt Kern und Worker mit und arbeitet ohne Netz. Elixir steuert die Worker als externe Prozesse mit Zeitlimit und Neustart, OpenCascade läuft nie in der BEAM.

## Datenmodell: alles ist ein Element

Ein Projekt ist ein gerichteter, azyklischer Graph. Jedes Element hat genau dieselbe Form, egal ob Achsenursprung oder Baugruppe (ADR-028).

| Feld | Inhalt | Beispiel Ursprung | Beispiel Bauteil |
| --- | --- | --- | --- |
| `id` | stabil, global eindeutig, nie wiederverwendet | `01J…A7` | `01J…Q2` |
| `type` | Elementart | `origin` | `part` |
| `inputs` | Referenzen auf Ausgänge anderer Elemente (`<id>.<output>`) | – | Ursprung der Baugruppe |
| `params` | Werte oder Ausdrücke | Lage, Drehung | Werkstoff, Verfahren |
| `outputs` | benannte, typisierte Ergebnisse | `frame` | `body`, veröffentlichte Flächen |
| `content` | Untergraph | leer | Skizzen, Features, Maße |
| `meta` | Name, Status (intern, veröffentlicht, freigegeben), Beschreibung | „Ursprung“, intern | „Halter“, veröffentlicht |

Daraus folgen vier Eigenschaften:

- **Gleich adressierbar:** Veröffentlichen, kommentieren, verknüpfen, exportieren und versionieren funktioniert für jedes Element gleich, ohne Sonderfall je Typ.
- **Rekursiv:** Ein Bauteil ist ein Element mit Untergraph, eine Baugruppe ebenso. Ein Untergraph kann als wiederverwendbarer Baustein in andere Projekte eingebunden werden, das ist zugleich das Modell für Bibliotheken und Plugins.
- **Drei Ansichten, eine Wahrheit:** 3D-Arbeitsfläche, Knoten-Editor (Visual Programming wie Synera) und Textprojektion zeigen denselben Graphen, dazu der Stapel als einfachste Sicht (ADR-044); eine Änderung in einer Ansicht ist sofort in allen sichtbar (ADR-035). Python mit build123d bleibt als Elementtyp `script` mit deklarierten Ein- und Ausgängen.
- **Rezept statt Geometrie:** Gespeichert und synchronisiert wird nur der Graph als CRDT-Dokument (Automerge). Geometrie ist ein Cache, berechnet aus Element, Eingängen und Kernel-Version (ADR-032, ADR-033).

Die Textprojektion ist deterministisch und verlustfrei: eine Zeile je Parameter, sortiert nach Element-ID. Eine geänderte Wandstärke ist im Review genau eine Zeile. Damit lassen sich Projekte auch in normale Git-Repositories exportieren und wieder importieren.

**Komponenten wie in Figma (ADR-043).** Jede Auswahl lässt sich zur wiederverwendbaren, konfigurierbaren Vorlage machen.

| Figma | CEE | Beispiel |
| --- | --- | --- |
| Main Component | Komponente: Untergraph mit exponierten Parametern | Deckensegel mit Breite, Länge, Dicke, Material, Abhängung |
| Instance | Instanz: Verweis plus Abweichungen, keine Kopie | 12 Segel im Raum, eines 900 statt 1200 mm breit |
| Overrides | Überschreibungen bleiben bei Änderungen der Vorlage erhalten | Farbe eines Segels geändert, neue Kantenform kommt trotzdem an |
| Variants | Varianten: benannte Parametersätze | Größe S/M/L, Montage Wand/Decke/abgehängt |
| Nested Components | Verschachtelung | Raumvorlage mit Wänden, Tisch und Absorber-Instanzen |
| Team Library | Bibliothek: veröffentlicht und versioniert | Produktkatalog der Firma |
| Library Updates | Aktualisierung mit Vorschau der Wirkung | neue α-Messwerte, erst nach Zustimmung übernommen |
| Detach | Lösen | Sonderanfertigung für einen Kunden |

Anders als in Figma haben Komponenten echte Parameter mit Formeln und Bedingungen und liefern berechnete Ausgänge – äquivalente Absorptionsfläche je Band, Gewicht, Preis, CO₂. Ändert sich eine Vorlage, rechnet die Nachhallzeit jedes betroffenen Raums neu.

**Fachneutraler Kern und Fachpakete (ADR-046).** Der Kern kennt nur Grundtypen; Wand, Absorber oder Bohrung definieren Fachpakete, und zwar über dasselbe Plugin-SDK, das auch die Community nutzt (nach dem Vorbild der FeatureScript-Standardbibliothek in Onshape). Das Schema zählt keine Fachtypen auf.

| Grundtyp | Zweck | Raum und Akustik | Maschinenbau |
| --- | --- | --- | --- |
| `frame` (Verbindungspunkt) | Andocken und Platzieren | Aufhängepunkt am Deckensegel, Rasterpunkt an der Decke | Bohrung in der Platte, Kopf der Schraube |
| `variables` | Werte projektweit an einer Stelle | Raumhöhe, Abhängung | Blechdicke, Bohrungsdurchmesser |
| `component`, `instance` | Wiederverwenden | Absorber-Katalog | Normteile, Schraube M5/M6 |
| `item` | Freigeben, bestellen, fertigen | Absorber-Produkt, Raumangebot | Teil 100-0002, Baugruppe 100-0001 |
| `analysis` | Berechnen | Nachhallzeit | Masse, Schwerpunkt, später FEM |
| `study` (Studie) | Varianten automatisch durchrechnen | 4–16 Segel, 40–100 mm Dicke gegen Nachhallzeit, Kosten, CO₂ | Blechdicke und Rippen gegen Masse und Preis |

Ob diese Form trägt und schnell genug ist, klärt der erste Spike (`ap-01-spike-datenmodell`): 10.000 Elemente in ≤ 200 ms laden, eine Änderung in ≤ 5 ms, zwei Zweige mit je 500 Änderungen in ≤ 500 ms zusammenführen.

## Publikations- und Identitätsmodell

Jedes Element des Modells erhält eine stabile Identität, vom Punkt bis zum Zeichnungsblatt. Der Konstrukteur entscheidet per Klick, welche Elemente veröffentlicht werden; veröffentlicht heißt adressierbar, einzeln exportierbar, versioniert und rückverfolgbar. Sichtbarkeit (Hide/Show) ist davon vollständig getrennt und reine Ansichtssache.

**Drei Zustände statt Hide/Show**

| Zustand | Bedeutung | Entscheidet | Folgen |
| --- | --- | --- | --- |
| Intern | Hilfsfeature: Hilfsebene, Skizze, Zwischenkörper | Standard für alles | Hat eine ID, wird nicht exportiert, darf sich frei ändern |
| Veröffentlicht | Teil der Bauteil-Schnittstelle | Konstrukteur; KI darf nur vorschlagen | Adressierbar, einzeln exportierbar, im Manifest versioniert; jede Änderung erscheint als Diff |
| Freigegeben | Veröffentlicht und in einer Revision eingefroren | Freigeber; ab drei Personen nach Vier-Augen-Prinzip (ADR-047) | Unveränderlich; jede Änderung erzeugt eine neue Revision |

**Was veröffentlicht werden kann**

| Elementtyp | Beispiel | Identität | Einzelexport |
| --- | --- | --- | --- |
| Parameter | Wandstärke = 3 mm | Element-ID | JSON |
| Punkt, Achse, Ebene | Bohrungsachse, Bezugsebene A | Feature-ID + Rolle | JSON, STEP |
| Kante, Fläche | Montagefläche, Dichtkante | Feature-ID + Erzeugungspfad; Geometrie-Signatur als Rückfall | STEP |
| Körper | Gehäuse, Einlegeteil | Feature-ID | STEP, STL/3MF |
| Skizze, Profil | Blechkontur, Dichtungsverlauf | Feature-ID | DXF, SVG |
| Annotation (PMI) | Maß, Toleranz, Bezug, Oberflächenangabe | Eigene ID, gebunden an Element-IDs | STEP AP242 (semantisch), JSON |
| Zeichnungsblatt | Blatt 1 Fertigungszeichnung | Blatt-ID + Revision | PDF, SVG, DXF |
| Baugruppeninstanz | Schraube M6, Position 3 | Instanz-ID | STEP |

**So arbeitet der Konstrukteur**

1. Element im Viewer anklicken, „Veröffentlichen…“ wählen, Namen vergeben (z. B. `Montageflaeche_A`) und optional eine Anforderung verknüpfen. Der Status wird am Element gesetzt und erscheint in der Textprojektion als eine Zeile.
2. Alternativ in der Text- oder Knotenansicht oder per Auftrag an den KI-Assistenten; er schlägt Publikationen auch aus den Schnittstellen der Anforderungen (Elemente vom Typ `requirement`) vor, der Konstrukteur bestätigt.
3. Das Publikations-Panel listet alle veröffentlichten Elemente mit Status: unverändert, geometrisch geändert oder Referenz verloren.
4. Nach jeder Änderung zeigt ein semantischer Diff die Wirkung auf die Schnittstelle, z. B. „Montageflaeche\_A um 2,0 mm in +Z verschoben; betrifft Blatt 1 und Baugruppe B-100“.
5. Geht eine Referenz verloren, schlägt das System den wahrscheinlichsten Nachfolger vor; der Konstrukteur bestätigt mit einem Klick. Geraten wird nie.

**Persistente Identität**

Jedes Element hat seine ID ab der Erzeugung, auch Skizzen und Features; der KI-Assistent vergibt sprechende Namen, der Konstrukteur kann sie ändern, ohne dass sich die ID ändert. Flächen und Kanten entstehen erst bei der Berechnung: Der Worker zeichnet für jede Kernel-Operation die Topologie-Historie auf (erzeugt, verändert, gelöscht) und leitet daraus Unter-IDs ab, z. B. `tasche_1/wand/+X`. Wird ein Pfad mehrdeutig, entscheidet eine Geometrie-Signatur (Typ, Normale, Flächeninhalt, Schwerpunkt); bleibt er mehrdeutig, wird der Konstrukteur gefragt. Eine veröffentlichte Fläche wird dadurch selbst zum Element (`face-ref`) mit eigener ID.

**Manifest, Versionierung und Adressierung**

- Jede Revision hat ein Manifest mit allen veröffentlichten Elementen: ID, Name, Typ, Quell-Element, Geometrie-Hash, Anforderungs- und Zeichnungsbezüge. Es ist Teil der Textprojektion, sodass jede Änderungsanfrage die Schnittstellenänderungen zeigt.
- Die Schnittstelle wird semantisch versioniert: Element entfernt oder Typ geändert = Major, Geometrie geändert oder Element neu = Minor, nur Metadaten = Patch.
- Jedes veröffentlichte Element hat eine Adresse auf Basis seiner ID: `cee://<server>/<organisation>/<projekt>/<element-id>@<meilenstein|revision>`; Namen sind nur Aliase, Umbenennen und Verschieben brechen keinen Link (ADR-058). Andere Bauteile, Baugruppen und Zeichnungen dürfen nur veröffentlichte Elemente referenzieren.
- Aus den Verknüpfungen entsteht automatisch eine Traceability-Matrix: Anforderung → veröffentlichtes Element → Regelbefund → Zeichnungsblatt.

**Zeichnungen als abgeleitete Artefakte**

Zeichnungsblätter sind Elemente vom Typ `sheet` und referenzieren Ansichten, Maße und PMI ausschließlich über Element-IDs. Dadurch überleben Maße Modelländerungen, und ein verwaister Bezug wird sofort gemeldet. Jedes Blatt hat eine eigene Revision und wird bei jeder Änderung neu abgeleitet.

**Freigabeprozess und Revisionen (ADR-047)**

Freigegeben wird ein **Item**: das, was bestellt, gefertigt oder verschickt wird – Teil, Baugruppe, Zeichnung, Dokument, Raum oder Angebot. Es verweist auf seine Definition im Graphen und trägt Sachnummer, Benennung, Revision und Status. Jede Änderung steht in der Historie, benannte Versionen setzt man jederzeit; eine **Revision** (Standard A, B, C …, Vorabstände 01, 02 …) entsteht nur durch Freigabe.

| Status | Bedeutung | Wer | Weiter mit |
| --- | --- | --- | --- |
| In Arbeit | Frei bearbeitbar | Ersteller | „Zur Prüfung“, wenn alle Regeln mit Schweregrad „Fehler“ bestehen und Pflichtfelder gesetzt sind |
| In Prüfung | Gesperrt; Vergleich zur letzten Revision mit Folgen für Verwender | Prüfer | Freigeben oder mit Kommentar zurückweisen |
| Freigegeben | Unveränderlicher Freigabestand: Schnappschuss mit Hash, Manifest, Stückliste, STEP, PDF; signiert mit Person, Zeit, Rolle | Freigeber, nicht der Ersteller | Änderungen nur über einen Änderungsauftrag, der die nächste Revision erzeugt |
| Ersetzt, Gesperrt | Neue Revision gilt bzw. nicht mehr verwenden | Freigeber | Verwender sehen einen Hinweis und übernehmen mit Vorschau |

- **Freigabe-Workflow** je Organisation konfigurierbar: Solange höchstens zwei Personen freigeben dürfen, ist Selbstfreigabe standardmäßig an; ab drei Personen gilt standardmäßig das Vier-Augen-Prinzip. Eine Selbstfreigabe wird immer im Freigabestand vermerkt. KI-Agenten bereiten vor und prüfen, geben aber nie frei.
- **Stückliste** (Mengen- und Strukturstückliste) und **Verwendungsnachweis** entstehen aus dem Graphen, nie von Hand.
- **Änderungswesen:** Ein Änderungsantrag beschreibt Problem und betroffene Items, ein Änderungsauftrag ist ein Entwurf mit den Änderungen; beim Abschluss entstehen alle neuen Revisionen gemeinsam.
- **Archiv:** Die Dokumente eines Freigabestands werden aufbewahrt, damit eine Freigabe auch mit späteren Kernel-Versionen bitgleich bleibt (ergänzt ADR-032).

**Anbindung an PLM und ERP (ADR-048)**

CEE wird kein ERP. Jedes Feld hat genau ein führendes System; ausgetauscht wird über ein offenes Format in `format/`, eine API aus dem Befehlsregister und Ereignisse.

| Führend in CEE | Führend in PLM bzw. ERP |
| --- | --- |
| Geometrie, Parameter, Varianten, Zeichnungen | Materialstamm, Preise, Lieferanten |
| Engineering-Stückliste (EBOM), Revisionen der Definition | Fertigungsstückliste (MBOM), Arbeitspläne |
| Freigabestände und ihre Dokumente | Lager, Aufträge, Rechnungen |

Ereignisse wie „Item freigegeben“ oder „Änderungsauftrag abgeschlossen“ gehen zuverlässig über eine Outbox als Webhook hinaus. Nummernkreise, Materialstamm und Preise kommen über Plugins herein; offline vergebene Sachnummern sind vorläufig, bis der Server sie bestätigt. So kann ein selbst gebautes PLM oder ERP andocken, ohne CEE-Code zu übernehmen.

## UI- und Interaktionskonzept

Das Bedienkonzept folgt Figma statt CATIA: eine ruhige Arbeitsfläche mit dem Modell im Zentrum, links der Featurebaum als Ansicht des Element-Graphen, rechts ein Eigenschaften-Panel, das sich der Auswahl anpasst, und unten eine einzige Werkzeugleiste mit fünf Werkzeugen. Alles andere erreicht man über die Befehlssuche oder, indem man der KI sagt, was man will. Jede KI-Änderung erscheint zuerst als Vorschau und wird erst nach Annahme übernommen.

&#91;embedded content: UI-Wireframe · Arbeitsfläche, zwei Panels, eine Werkzeugleiste, Anwesenheit\]

Es gibt keine Menüleiste und kein Ribbon. Befunde erscheinen als Markierung direkt am Modell, der laufende Agent als kleine Statusanzeige oben, die sich bei Bedarf aufklappt.

**Lean statt 1001 Befehle**

| Klassisches CAD | Unser Bedienkonzept |
| --- | --- |
| Menüleisten, Ribbons, Hunderte Symbole | Fünf Werkzeuge (Auswählen, Messen, Schnitt, Skizze, Fragen) plus Befehlssuche |
| Befehl suchen, dann Dialog mit vielen Feldern | Element wählen, Absicht sagen oder Wert im Panel ändern |
| Eigenschaften in modalen Dialogen | Ein Eigenschaften-Panel, das sich der Auswahl anpasst |
| Feature-Baum voller Fachjargon | Elemente mit verständlichen Namen, Zustand als Schalter |
| Hide/Show und Speicherzustände | Schalter „Veröffentlicht“ direkt am Element |
| Fehlermeldungen im Protokoll | Markierung am Modell mit Vorschlag zur Behebung |
| Funktionen muss man kennen | Fähigkeiten sind auffindbar: fragen, suchen oder beschreiben |

**Bereiche der Oberfläche**

| Bereich | Inhalt |
| --- | --- |
| Kopfzeile | Bauteilname, Verfahren, Revision, Entwurf; Avatare der Anwesenden; Agentenstatus; Freigeben und Teilen |
| Featurebaum (links) | Baumansicht des Graphen mit Elementen, veröffentlichten Elementen, Befunden und Zeichnungsblättern; Status als Symbol, Inline-Aktionen beim Überfahren, Drag & Drop, Filter statt Hide/Show; Auswahl synchron mit der Arbeitsfläche |
| Arbeitsfläche (Mitte) | Modell, Auswahl, Ziehgriffe, Befundmarkierungen, Geister-Vorschau, Eingabe direkt an der Auswahl |
| Eigenschaften (rechts in der Arbeitsfläche) | Passt sich der Auswahl an: Name, Werte, Schalter „Veröffentlicht“, Regeln, Nutzung, Anforderungen, „KI fragen“ |
| Werkzeugleiste (unten) | Auswählen, Messen, Schnitt, Skizze, Fragen |
| Befehlssuche (Strg/Cmd+K) | Jede Funktion per Suche, Text oder Sprache; zeigt auch das Tastenkürzel |
| Verlauf (aufklappbar) | Zeitleiste der Stände mit Geometrie-Diff, Varianten-Vergleich und Entwürfen |
| Ansicht wechseln (oben rechts) | 3D, Knoten oder Text für dieselbe Auswahl; geteilte Ansicht nebeneinander |
| Kommentare (am Element) | Faden an jedem Element, mit Erwähnungen; offene Fäden als Markierung am Modell |
| Bibliothek (Reiter neben dem Featurebaum) | Komponenten und Varianten zum Hineinziehen; Hinweis auf neue Versionen mit Vorschau; „Zur Komponente machen“ an jeder Auswahl |
| Arbeitsbereiche (Reiter in der Kopfzeile) | Beitrag der Fachpakete (ADR-054), für Raum und Akustik: Raum, Akustik, Präsentation, Bericht – gleiche Auswahl und gleiches Modell, nur andere Panels und Werkzeuge |

**Gestaltungsregeln**

1. **Eine Aufgabe, ein Ort.** Was man an einem Element tut, passiert am Element oder im Eigenschaften-Panel, nie in einem eigenen Fenster.
2. **Progressive Offenlegung.** Sichtbar ist nur, was zur aktuellen Auswahl passt; Expertenparameter klappen erst auf Wunsch auf.
3. **Absicht statt Befehl.** Komplexe Operationen wie Segel-Raster, Wandaufbau oder Bohrungsmuster werden beschrieben oder über die Befehlssuche gewählt. Der KI-Assistent füllt die Parameter mit sinnvollen Werten aus Regeln und Anforderungen.
4. **Direkt manipulieren.** Ziehgriffe an Flächen und Maßen, Werte im Panel überschreiben; jede Änderung ist sofort sichtbar.
5. **Letzte Aktion nachjustieren.** Nach jeder Operation bleibt ein kleines Feld mit ihren Parametern offen, bis die nächste beginnt (Idee aus Blender).
6. **Vorschau vor Übernahme.** Jede KI-Änderung kommt als Karte mit Geister-Vorschau, Begründung und Regelstatus; Annehmen oder Verwerfen.
7. **Keine Blackbox.** Der Agent zeigt seinen Fortschritt als kleine Statusanzeige, aufklappbar zu Plan, Schritten und Renderings, jederzeit unterbrechbar.
8. **Knoten und Text auf Wunsch.** Wer räumlich denkt, arbeitet in 3D; ein Klick zeigt dieselbe Auswahl als Knoten oder als Text daneben.
9. **Wenige Tastenkürzel.** Unter 15 Kürzel, alle in der Befehlssuche sichtbar; vollständig per Maus, Trackpad oder Stift bedienbar.
10. **Schnell und ruhig.** Reaktion unter 100 ms, keine modalen Dialoge, viel Weißraum, eine Akzentfarbe nur für Auswahl und KI, Hell- und Dunkelmodus.

**Von Blender übernommen (ADR-044)**

| Muster | So in CEE |
| --- | --- |
| Werte beim Ziehen tippen | Deckensegel ziehen, „X“ für die Achse, „1200“ tippen – Präzision ohne Dialog, auch Einheiten und Formeln |
| Arbeitsbereiche | Reiter **Raum · Akustik · Präsentation · Bericht**; jeder zeigt nur, was für die Aufgabe nötig ist |
| Modifier-Stapel | Stapel im Eigenschaften-Panel, z. B. Absorber → Raster 3 × 4 → Abstand 300 mm; Schritte umsortieren oder abschalten |
| Befehl als Python im Tooltip | Jede Aktion als Textzeile sichtbar und kopierbar; dieselbe Form nutzen Agenten |
| Denoiser in Cycles | Fotomodus liefert mit wenigen Samples ein sauberes Bild |

Weitere Anregungen (Fangmodi, Annotationen im 3D-Raum, Materialvorschau mit α-Kurve, Licht-Vorlagen, Stiftung und Development Fund) liegen im Ideenspeicher.

**Von VS Code übernommen (ADR-045)**

| Muster | So in CEE |
| --- | --- |
| Befehlsregister | Jede Funktion ist ein Befehl mit ID; Befehlssuche, Tastenkürzel, Plugins, Aktionsprotokoll und die MCP-Werkzeuge der KI nutzen dasselbe Register – was ein Mensch kann, kann ein Agent |
| Erweiterungsmodell | Plugins deklarieren im Manifest Befehle, Elementtypen, Knoten, Panels, Regeln und Einstellungen; laufen isoliert mit ausdrücklichen Rechten; offenes, selbst hostbares Verzeichnis |
| Workspace Trust | Fremde Projekte und Bibliotheken öffnen ohne Ausführung von Script-Elementen und Plugin-Code, bis man ihnen vertraut |
| Problems und Quick Fixes | Befunde am Modell und als Liste mit Sprung zur Stelle; feste Korrekturen aus Regeln als Änderungssatz mit Vorschau |
| Einstellungen in Ebenen | Standard < Organisation < Benutzer < Projekt; durchsuchbar, als Oberfläche und als Text |
| Diff und Timeline | Zwei Stände visuell vergleichen: Geometrie überlagert, Parameter als Liste, Nachhallzeit und Kosten vorher/nachher; Verlauf je Element |

Nicht übernommen: Telemetrie standardmäßig an, ein proprietäres offizielles Produkt neben dem offenen Code, die Fülle an Panels. Weitere Anregungen (Breadcrumbs, Walkthroughs, Keymaps zum Umsteigen, offenes Analyse-Protokoll nach Vorbild des LSP, Remote-Rechnen, Stable und Insiders) liegen im Ideenspeicher.

**Von Onshape übernommen (ADR-046, ADR-047)**

| Muster | So in CEE |
| --- | --- |
| FeatureScript-Standardbibliothek | Eingebaute Fachpakete nutzen nur das Plugin-SDK; jedes ist zugleich Vorlage für eigene |
| Mate Connectors | Verbindungspunkte: Beim Ziehen rastet ein Teil am passenden Punkt ein, ob Schraube in Bohrung oder Segel an Decke |
| Variable Studio | Panel „Variablen“ mit Werten und Einheiten; eine Änderung wirkt überall |
| Versionen und Release Management | Versionen jederzeit, Revision nur durch Freigabe; die Kopfzeile zeigt Item, Revision und Status |
| Verknüpfte Dokumente | Verweise über Projekte nur auf feste Versionen, mit Hinweis auf neue |

Nicht übernommen: nur Cloud ohne Offline, Daten nur beim Anbieter, proprietärer Kernel, eigene Sprache. Weitere Anregungen (Rollback-Leiste, Folgen-Modus, öffentliche Projekte, Mobile, Audit-Verlauf, Mate-Typen) liegen im Ideenspeicher.

**Von Synera übernommen (ADR-049)**

Bei Synera liegt der Workflow neben dem Modell in fremden CAD-Systemen; bei CEE sind Modell und Automatisierung derselbe Graph – versioniert, freigebbar und reproduzierbar.

| Muster | So in CEE |
| --- | --- |
| Workflows als Werkzeuge für Agenten | Veröffentlichter Untergraph wird Befehl, Knoten und MCP-Werkzeug, z. B. „Raum belegen bis Zielnachhallzeit“ |
| Synera Run | App aus dem Graphen: Vertrieb gibt Raummaße ein und erhält Belegung und Angebot; Maschinenbauer bauen damit Konfiguratoren |
| Eigene und geschützte Experten-Knoten | Bibliotheken für Person, Projekt, Organisation; gesperrte Komponenten nur über ihre Parameter nutzbar |
| Live-Ergebnisse | Zwischenergebnis mit Einheit an jedem Knoten und jeder Kante |
| Design-Exploration | Studien mit Tabelle und Pareto-Diagramm; Agent stößt an, der Mensch wählt |

Nicht übernommen: Workflow getrennt vom Modell, Agenten nur in einer Cloud, Lizenzpool mit Tokens, tausend Knoten im Kern. Weitere Anregungen (Konnektoren zu Fremdwerkzeugen, Berichte als Word und Excel, Branchenvorlagen, Multi-Agenten, eingebettete Konfiguratoren) liegen im Ideenspeicher.

**Aus klassischem CAD übernommen (ADR-050)**

CATIA, NX und Creo sind schwer zu bedienen, tragen aber 30 Jahre Erfahrung mit großen, realen Produkten. Wir übernehmen die Konzepte, nicht die Bedienung.

| Vorbild | So in CEE |
| --- | --- |
| PowerCopy, Engineering Templates, UDF | Komponenten mit Referenz-Eingängen: Bohrungsvorlage an einer Fläche, Absorber an einer Wand; Ersetzen mit Umhängen |
| Synchronous Technology, Flexible Modeling | Fläche direkt verschieben oder versetzen, auch am STEP eines Lieferanten; jede Bearbeitung ist ein Element |
| Creo-Fehlerbehebungsmodus | Fehlerhaftes Element markiert, Rest rechnet weiter; Befund mit Korrekturvorschlag |
| CATIA-Skelett, NX WAVE | Skelett mit veröffentlichten Bezügen steuert die Baugruppe; Verknüpfungen live oder eingefroren |
| Simplified Representations | Teil-Laden und Detailstufen (Hülle, vereinfacht, voll) |
| Knowledgeware, Check-Mate | Messung als Element mit Grenzwert; Modellierrichtlinien als Regeln |

Nicht übernommen: Ribbon und Menüs mit tausend Befehlen, Dateien ein- und auschecken, geschlossene Formate, Lizenzen je Modul. Weitere Anregungen (Baum mit Spalten, Rollen, Eltern-Kind-Ansicht, Stellungen, Kinematik, Kollisionsprüfung, Positionsnummern) liegen im Ideenspeicher.

**Versionierung ohne Git-Begriffe (ADR-051)**

Git ist die Mechanik, nicht die Sprache. Gesichert wird automatisch; die Oberfläche spricht so:

| Git | In CEE | So fühlt es sich an |
| --- | --- | --- |
| commit | entfällt | Nie wieder Speichern oder Commit-Nachricht |
| branch | Entwurf | Spielwiese, ohne andere zu stören |
| tag | Meilenstein | „Stand für den Kundentermin“ mit einem Klick |
| merge | Übernehmen | Vergleich ansehen, Konflikte als Entscheidungskarten |
| pull request | Zur Prüfung geben | führt in den Freigabeprozess |
| revert, checkout | Zurückholen | ganzer Stand oder einzelnes Element |
| fork | Ableiten | Kopie mit Herkunft, Verbesserungen am Original werden angeboten |
| log, blame | Verlauf | wer, wann, warum – direkt am Element |

**Der Entwicklungstrichter:** (1) **Erkunden** – viele Entwürfe parallel, gemeinsam live. (2) **Verdichten** – vergleichen, Studien, abstimmen; was nicht weiterkommt, wird verworfen, nicht gelöscht: ausgeblendet, archiviert, durchsuchbar, mit Begründung. (3) **Ergebnis kennzeichnen** – standardmäßig sehen alle nur Ergebnisse, die Werkstatt mit allen Entwürfen öffnet man bei Bedarf. (4) **Wiederverwenden** – als Komponente, Bibliothek oder Vorlage. (5) **Anpassen** – Ableiten mit Herkunft, die nächste Schleife beginnt. Ergebnisse, Verwerfungen und Prüfentscheidungen tragen sich in das Entscheidungsprotokoll des Projekts ein.

**Ordnung und Wiederfinden (ADR-052)**

Ordnung entsteht aus dem Graphen, statt gepflegt zu werden – kein „ich schick dir den Link“ als einziger Weg.

- **Schlanke Struktur:** Organisation › Bereich (Produkt, Kunde, Thema) › Projekt, keine weiteren Ordner.
- **Facetten automatisch:** Typ, Status, Sachnummer, Revision, Material, Kunde, Verantwortliche, Datum, Fachpaket.
- **Eine Suche für alles:** Strg/Cmd+K findet Befehle und Inhalte – Volltext, Facetten, Parameterbedingungen („Deckensegel, α500 ≥ 0,8, freigegeben“), semantisch mit lokalem Modell.
- **Links ohne Bruch:** feste Adressen, die Umbenennen und Verschieben überstehen.
- **Rückverweise:** Verwendet in, Abgeleitet von/zu, Erwähnt in – über Projekte hinweg.
- **Sammlungen und Startseite:** gespeicherte Suchen statt Ordner; je Person zuletzt bearbeitet, wartet auf mich, Änderungen an Genutztem.
- **Kontext am Element** statt im Wiki; **Hygiene:** verwaiste Entwürfe werden zum Verwerfen vorgeschlagen, ähnliche vorhandene Teile beim Anlegen angezeigt.

**Skizzieren**

- **Starten:** Fläche oder Ebene anklicken, „Skizze“ wählen; die Ansicht dreht sich senkrecht darauf, das Modell tritt halbtransparent zurück.
- **Zeichnen:** Linie, Bogen, Kreis, Rechteck und Langloch mit Fanglinien wie in Figma. Bedingungen (horizontal, tangential, deckungsgleich, symmetrisch) werden beim Zeichnen erkannt und als kleine Symbole angezeigt; ein Klick entfernt sie.
- **Bemaßen:** Element anklicken, Wert tippen. Maße können Parameter oder Formeln sein (`breite / 2`).
- **Zustand auf einen Blick:** Blau unterbestimmt, Schwarz vollständig bestimmt, Rot widersprüchlich mit Hinweis auf die verursachende Bedingung.
- **Mit KI:** Beschreiben statt zeichnen („Langloch 10 × 30, mittig, 15 mm vom Rand“); „Skizze vollständig bestimmen“ ergänzt Maße nach den Bemaßungsregeln; Handskizze, Foto oder DXF ablegen und als bemaßte Skizze übernehmen.
- **Weiter zum Körper:** Nach dem Schließen schlägt die Werkzeugleiste passende nächste Schritte vor (Extrudieren, Tasche, Drehen), mit Live-Vorschau und Ziehgriff für die Tiefe.

**Typische Abläufe**

- **Neues Bauteil:** Anforderungen einfügen oder Dokument ablegen → der KI-Assistent legt Anforderungen als Elemente an und zeigt sie als Formular zur Bestätigung → er baut, prüft und rendert → Änderungskarte mit fertigem Teil.
- **Änderung an der Auswahl:** Fläche klicken → „Rippe mittig, 2 mm“ → Geister-Vorschau → Annehmen.
- **Befund beheben:** Befund klicken → Viewer springt zur Stelle → „Mit KI beheben“ → Vorschlag mit Regelstatus.
- **Freigabe:** Publikations-Panel → Diff seit der letzten Revision → „Revision freigeben“ → Manifest, STEP und Zeichnungen werden eingefroren.

**Web und Desktop:** Dieselbe Oberfläche läuft im Browser und als Desktop-App für Linux, Windows und macOS. Im Browser reicht ein Link zum Mitarbeiten, Ansehen oder Kommentieren, auch auf Tablet und Handy. Die Desktop-App arbeitet zusätzlich offline und rechnet Geometrie lokal.

**Gemeinsam arbeiten:** Wer gerade im Projekt ist, erscheint als Avatar in der Kopfzeile; Auswahl und Cursor der anderen sind farbig markiert. Ein Klick auf einen Avatar folgt dessen Ansicht. Agenten erscheinen wie Personen, mit eigenem Avatar und ihren Änderungskarten. Offline Gearbeitetes kommt als Entwurf zurück und wird wie eine Änderungsanfrage geprüft und übernommen.

**Messlatte:** Vor der Implementierung entstehen klickbare Prototypen. Sie gelten als bestanden, wenn mindestens 4 von 5 Konstrukteuren die Kernabläufe ohne Einweisung lösen.

## Architecture Decision Records

Neunundfünfzig Entscheidungen legen die Architektur fest. ADR-028 bis ADR-059 beschreiben die neue Richtung (Element-Graph, Rust-Kern, Elixir-Server, Web und Desktop, Lizenz, offene und lokale KI, Raumakustik, Material, Rendering, Austauschformate, Komponenten, Bedienmuster aus Blender und VS Code, fachneutraler Kern, Freigabe, PLM- und ERP-Schnittstelle, Automatisierung, Bewährtes aus klassischem CAD, Versionierung in Alltagsbegriffen, Ordnung, Lernschleife, Fachpakete, Rechte, Datenschutz, Einheiten, Adressen, Meilensteine) und sind akzeptiert (außer ADR-036, vorgeschlagen); sie ersetzen ADR-003, 005, 013 und 024. Die übrigen stehen auf „Vorgeschlagen“ und werden mit den Spikes bestätigt. Jedes ADR liegt zusätzlich als Markdown-Datei unter `docs/adr/` im Repository.

Die frühen ADRs 001 bis 027 stammen aus einer früheren Richtung (VS-Code-Erweiterung, Code als Quelle der Wahrheit). Ihre Zusammenfassungen unten sind historisch; was davon heute gilt, steht in der jeweiligen ADR-Datei im Abschnitt „Aktuell gilt“. Verbindliche Begriffe stehen im Glossar (`docs/glossar.md`).

| ADR | Entscheidung | Wichtigste Alternative |
| --- | --- | --- |
| 001 | Kernel: OpenCascade (OCCT) über OCP | Parasolid (proprietär), Truck (unreif) |
| 002 | Modelliersprache: build123d | CadQuery, OpenSCAD |
| 003 | Python-Code im Git ist die Quelle der Wahrheit (ersetzt durch 028) | Eigenes Datei-/Featureformat |
| 004 | Austausch: STEP AP242 inkl. semantischer PMI, kein natives Plugin im Pilot | Native Makros je CAD-System |
| 005 | VS-Code-Extension (TypeScript) + lokaler Python-Geometrie-Dienst (ersetzt durch 031) | Eigene Desktop-App, Web-App |
| 006 | ocp\_tessellate wiederverwenden; three-cad-viewer als Ausgangspunkt (teilweise ersetzt durch ADR-026) | Eigener three.js-Viewer |
| 007 | KI-Anbindung über MCP (ersetzt durch ADR-030, ADR-037, ADR-045) | Direkte Code-Ausführung im Terminal |
| 008 | Regeln als Python-Prüfungen + YAML-Parameter, je Verfahren als Plugin | Regeln nur als Prompt-Text |
| 009 | Anforderungen als YAML-Datei (ersetzt durch ADR-028: Elementtyp requirement) | Freitext |
| 010 | Visuelle Selbstprüfung über Offscreen-Renderings | Nur numerische Prüfungen |
| 011 | Eigene Blech-Schicht auf build123d (zurückgestellt bis nach der Beta) | Blech nur als Volumenkörper |
| 012 | FEM optional über Gmsh + CalculiX | Kommerzieller Solver |
| 013 | Apache-2.0, OCCT nur dynamisch gelinkt (ersetzt durch 034) | GPL, Dual-Licensing |
| 014 | Zwei Testebenen: Geometrie-Golden-Tests + KI-Eval-Suite | Nur Unit-Tests |
| 015 | Explizite Publikation statt Sichtbarkeit | Hide/Show als Exportsteuerung |
| 016 | Persistente Identität über Feature-IDs und Topologie-Historie | Indizes der Topologie, reines Geometrie-Matching |
| 017 | Publikations-Manifest mit semantischer Versionierung (ersetzt durch ADR-047: Manifest im Freigabestand) | Nur Git-Commits, PLM-Datenbank |
| 018 | Einheitliche Adressierung per URI; Querverweise nur auf veröffentlichte Elemente (Adressform ersetzt durch ADR-058) | Freie Referenzen auf jede Topologie |
| 019 | PMI als semantische Objekte im Code, gebunden an Element-IDs | Annotationen nur auf Zeichnungen |
| 020 | Zeichnungsblätter, abgeleitet bei jeder Änderung (ersetzt durch ADR-028: Elementtyp sheet) | Interaktiver Zeichnungseditor |
| 021 | KI-Änderungen nur als prüfbare Änderungssätze mit Vorschau | KI schreibt direkt ins Modell |
| 022 | Vollbild-Arbeitsfläche als Custom Editor, Featurebaum nativ in der Primary Sidebar, Bedienkonzept nach Figma | Mehrere Webviews, klassische Menü- und Ribbon-UI |
| 023 | Entwicklung durch Agenten unter menschlicher Steuerung, mit Specs und Tests als Vertrag | Klassisches Entwicklerteam |
| 024 | UI-Aktionen ändern den Code über verlustfreie Syntaxbaum-Transformation (LibCST) (ersetzt durch 028 und 035) | Regex-Ersetzungen, generierter Code ohne Handbearbeitung |
| 025 | Inkrementeller Rebuild mit Feature-Cache; Näherungsvorschau beim Ziehen | Immer vollständiger Neuaufbau |
| 026 | Eigene Interaktionsschicht auf three.js für Auswahl, Ziehgriffe, Vorschau und Overlays | three-cad-viewer unverändert erweitern |
| 027 | Parametrische Skizzen mit PlaneGCS, identischer Solver in Arbeitsfläche (WebAssembly) und Geometrie-Dienst (Python) | SolveSpace-Solver (GPL), Skizzen ohne Zwangsbedingungen |
| 028 | Element-Graph ist die Quelle der Wahrheit; jedes Element hat dieselbe Form | Python-Code als Quelle (ADR-003) |
| 029 | Rust-Kern für das Datenmodell, eingebunden als NIF, WASM, nativ und PyO3 | Eigene Implementierung je Sprache |
| 030 | Elixir und Phoenix für den Server: Sync, Anwesenheit, Historie, Freigaben, Worker, MCP | TypeScript-Sync-Server (automerge-repo) |
| 031 | Ein TypeScript-Client als Web-App und Tauri-2-Desktop-App | VS-Code-Extension, Electron |
| 032 | Geometrie als abgeleiteter Cache hinter einer Kernel-Schnittstelle; Worker als eigene Prozesse | OCCT in der BEAM, eigener Kernel |
| 033 | Local-first mit CRDT (Automerge), Zweige und Änderungsanfragen wie bei Git | Zentraler Server mit OT, nur Git |
| 034 | Kern MPL-2.0, SDK und Format Apache-2.0 | Apache-2.0 für alles, GPL/AGPL |
| 035 | Drei gleichwertige Projektionen: 3D, Knoten, Text | Code mit Rückübersetzung (ADR-024) |
| 036 | Immersives Review über WebXR (vorgeschlagen, nach der Beta) | Native XR-Apps |
| 037 | KI anbieteroffen und lokal: MCP und Anbieter-Schnittstelle, lokale Modelle ab Tag 1, eigener Schlüssel, keine Telemetrie | Bindung an einen Anbieter, eigener KI-Dienst |
| 038 | Erster Anwendungsfall Raumgestaltung und Raumakustik: Geschoss, Wand, Decke, Boden, Öffnung, Möbel, Absorber als Elemente | Fräs- und Blechteile zuerst, volles BIM |
| 039 | Material als Element mit Aussehen, Akustik, Physik, Brandverhalten, Kosten, CO₂ – jeder Wert mit Einheit und Quelle | Material als Attribut je Bauteil |
| 040 | Rendering im Client: Echtzeit-PBR und Fotomodus mit Path Tracing (three-gpu-pathtracer, MIT); glTF als Austausch | Blender/Cycles (GPL), Render-Server |
| 041 | Nachhallzeit nach Sabine und Eyring je Oktavband im Rust-Kern; Ergebnisse als Analyse-Elemente | Berechnung im Python-Worker, externe Akustiksoftware |
| 042 | Austausch: IFC- und DXF-Import, glTF in beide Richtungen, PDF-Bericht, STEP für Bauteile | Nur STEP (ADR-004) |
| 043 | Komponenten mit Parametern und Varianten, Instanzen mit Überschreibungen, versionierte Bibliotheken mit Aktualisierung und Vorschau | Kopieren statt Instanzen |
| 044 | Bedienmuster aus Blender: Werte beim Ziehen tippen, Arbeitsbereiche (seit ADR-054 Beitrag der Fachpakete), Stapel als Sicht auf den Graphen, Aktion als Code, Denoiser im Fotomodus | Dialoge für exakte Werte, eine Oberfläche für alles |
| 045 | Nach VS Code: ein Befehlsregister für Mensch, Plugins und KI; Plugins mit Manifest in der Sandbox; Projekt-Vertrauen; Befunde mit Korrekturen; Einstellungen in Ebenen; visueller Vergleich | Plugins im selben Prozess, getrennte Werkzeuge für Mensch und KI |
| 046 | Fachneutraler Kern; Fachpakete über die Plugin-API; Verbindungspunkte, Projektvariablen, Verweise auf feste Versionen (nach Onshape) | Fachtypen fest im Kern |
| 047 | Freigabe mit Item, Sachnummer, Revision und Lebenszyklus; Selbstfreigabe bis zwei Personen, danach Vier-Augen-Prinzip; unveränderliche Freigabestände; Stückliste; Änderungswesen | Freigabe nur als Git-Tag oder nur im PLM |
| 048 | Offene Schnittstelle zu PLM und ERP: ein führendes System je Feld, offenes Format, API aus dem Befehlsregister, Ereignisse, Anbindungen als Plugins | Feste Anbindung an ein Produkt; CEE als ERP |
| 049 | Nach Synera: Untergraph als Befehl, Apps aus dem Graphen, Bibliotheksebenen und gesperrte Komponenten, Werte an jeder Kante, Studien | Automatisierung nur als Skript, Apps als eigene Software |
| 050 | Aus CATIA, NX, Creo: Referenz-Eingänge an Komponenten, direktes Bearbeiten als Element, robuste Neuberechnung, Skelett, Teil-Laden und Detailstufen, Messungen und Richtlinien als Elemente | Nur Parameter an Komponenten, Abbruch beim ersten Fehler, immer alles laden |
| 051 | Versionierung in Alltagsbegriffen (Entwurf, Meilenstein, Übernehmen); Entwicklungstrichter mit Ergebnis und Verwerfen mit Begründung; Herkunft; Entscheidungsprotokoll | Git-Begriffe zeigen, Löschen statt Verwerfen |
| 052 | Ordnungssystem: schlanke Struktur, automatische Facetten, eine Suche, feste Adressen, Rückverweise, Sammlungen, Startseite, Hygiene | Freie Ordnerbäume, externes Wiki |
| 053 | Lernschleife für lokale Modelle: Prüfer bewerten, Aufgabengenerator, Erfahrungsspeicher, LoRA aus geprüften Erfolgen, Schutz gegen Schummeln | Selbstbewertung, Training nur in der Cloud |
| 054 | Fachpakete: interne Fachpaket-API ab M1, öffentliches SDK später; Akustik als Fachpaket-Crate; Arbeitsbereiche als Beitrag der Fachpakete | Fachpakete bis zum SDK im Kern, feste Arbeitsbereiche |
| 055 | Rechte, Rollen, Anmeldung: OIDC, wenige Rollen, Gäste, Dienstkonten für Agenten, Prüfung im Server | Rechte je Element, Agenten unter dem Konto des Menschen |
| 056 | Datenschutz: Anwesenheit nie speichern, Verlauf mit Konto-IDs, Export, keine Weitergabe ohne Wahl | Vollständiger Verlauf mit Klarnamen |
| 057 | Einheiten und Größen: jede Zahl mit Dimension, kanonisch mm, rad, kg, s; Geld als Dezimalzahl mit Währung | Einheitenlose Zahlen nach Konvention |
| 058 | Adressen auf ID-Basis, Namen als Aliase, Weiterleitung beim Verschieben | Namensbasierte Adressen |
| 059 | Vier Meilensteine bis zur Beta (Klären, Werkbank, Zusammen, Beta); Architektur vollständig ab M1; Teil-Changes; Knoten in der Beta nur lesend | Beta mit allen Funktionen; Zusammenarbeit schon in M1 |

### ADR-001: Geometriekernel OpenCascade

**Kontext:** Alle Fertigungsverfahren brauchen exakte B-Rep-Geometrie (Verrundungen, Bohrungen, Toleranzen, STEP). Der Kernel muss offen und kommerziell nutzbar sein.

**Entscheidung:** OCCT, angesprochen über die Python-Bindings OCP. OCCT steht unter LGPL 2.1 mit Ausnahmeklausel und ist der einzige offene B-Rep-Kernel mit Industriereife.

**Konsequenzen:** Bekannte Schwächen bei komplexen Verrundungen und Booleschen Operationen; wir brauchen Heilungs- und Fallback-Strategien (siehe Risiken). Kernel-Updates kommen über OCP-Releases, wir pinnen Versionen.

### ADR-002: build123d als Modelliersprache

**Kontext:** Die Sprache muss für LLMs leicht und fehlerarm schreibbar sein und Topologie gezielt selektierbar machen.

**Entscheidung:** build123d (Apache-2.0). Builder-Kontexte, Selektoren und Typ-Hints liefern lesbaren, gut prüfbaren Code; Joints unterstützen Baugruppen.

**Alternativen:** CadQuery (gleicher Kernel, aber lange Method-Chains, fehleranfälliger für LLMs); OpenSCAD (nur CSG/Mesh, kein STEP).

**Konsequenzen:** Wir tragen Verbesserungen upstream bei. Eigene Erweiterungen liegen im Worker (`worker/`) bzw. in Fachpaketen, nicht in einem Fork.

### ADR-003: Code ist die Quelle der Wahrheit (ersetzt durch ADR-028)

**Entscheidung:** Jedes Bauteil ist ein Python-Modul mit typisierten Parametern und einer `build()`-Funktion. STEP, STL und Renderings sind abgeleitete Artefakte und werden nicht eingecheckt.

**Konsequenzen:** Volle Git-Historie, Code-Review und Diff auf Parameterebene. Konstrukteure brauchen Grundkenntnisse in Python oder arbeiten über Claude.

### ADR-004: STEP AP242 als Brücke zu allen CAD-Systemen

**Kontext:** Ergebnisse müssen in SolidWorks, NX, CATIA, Creo, Inventor und Fusion weiterfließen.

**Entscheidung:** Export als STEP AP242 mit Farben, Namen, Baugruppenstruktur, den Namen und Adressen veröffentlichter Elemente sowie semantischer PMI; STL/3MF für additive Fertigung; DXF für Blechabwicklungen. Native Makro-Generatoren pro CAD-System sind ein Kandidat nach der Beta.

**Konsequenzen:** Im Ziel-CAD gibt es keinen Feature-Baum; Änderungen erfolgen im Code oder per Direktmodellierung.

### ADR-005: Extension plus lokaler Geometrie-Dienst (ersetzt durch ADR-031)

**Entscheidung:** Die Extension (TypeScript) verwaltet UI, Webview und Prozesse. Ein lokaler Python-Prozess („Geometry Service“) führt Modelle aus, cached Ergebnisse und spricht JSON-RPC. Die Python-Umgebung wird mit `uv` reproduzierbar aufgesetzt.

**Konsequenzen:** Kein Cloud-Zwang, Modelle bleiben lokal. Wir müssen Prozess-Lebenszyklus, Timeouts und Absturz-Isolation sauber lösen.

### ADR-006: Bestehende Viewer-Komponenten wiederverwenden

**Kontext:** Die Extension OCP CAD Viewer (Apache-2.0) zeigt build123d- und CadQuery-Objekte bereits über die Komponente three-cad-viewer an und nutzt ocp\_tessellate.

**Entscheidung:** Wir nutzen ocp\_tessellate für die Tessellierung und three-cad-viewer als Ausgangspunkt und Referenz. Für die interaktive Arbeitsfläche reicht es voraussichtlich nicht; die eigentliche Interaktion regelt ADR-026. Wir suchen früh Kontakt zum Maintainer, um beizutragen statt zu forken.

**Konsequenzen:** Weniger Aufwand bei Tessellierung und Grundanzeige; die Bedienqualität entsteht in der eigenen Interaktionsschicht (ADR-026).

### ADR-007: MCP-Server als einzige KI-Schnittstelle

**Entscheidung:** Ein Python-MCP-Server (stdio) bietet Claude Code klar typisierte Tools: `build_part`, `get_topology`, `measure`, `check_rules`, `render_views`, `export`, `list_library`, `read_requirements`. Das Tool get\_selection liefert Claude jederzeit die aktuelle Auswahl aus Arbeitsfläche und Featurebaum. Konstruktionswissen liegt zusätzlich als Claude-Code-Skills im Projekt.

**Konsequenzen:** Der MCP-Server ist auch mit anderen MCP-fähigen Agenten nutzbar. Tool-Ausgaben müssen kompakt und strukturiert sein (JSON), damit der Kontext nicht überläuft.

### ADR-008: Ausführbare Regelpakete

**Entscheidung:** Eine Regel ist eine Python-Funktion mit ID, Schweregrad, Begründung und Parametern aus YAML (z. B. Mindestwandstärke je Werkstoff). Regelpakete je Verfahren (Fräsen, Blech, Spritzguss, FDM/SLS, Baugruppe) werden über Python-Entry-Points geladen; Firmen können eigene Pakete ergänzen.

**Konsequenzen:** Regeln sind testbar und versionierbar; Claude erhält strukturierte Befunde mit Ort (Fläche/Kante) und Korrekturhinweis.

### ADR-009: Strukturierte Anforderungsdatei

**Entscheidung:** Jedes Bauteil hat eine `requirements.yaml` (JSON-Schema-validiert): Bauraum, Schnittstellen, Lasten, Werkstoff, Verfahren, Stückzahl, Toleranzklasse, anzuwendende Regelpakete. Freitext-Anforderungen übersetzt Claude zuerst in diese Datei, der Mensch bestätigt sie.

**Konsequenzen:** Anforderungen werden prüfbar (z. B. Bauraum, Schnittstellenmaße) und rückverfolgbar.

### ADR-010: Visuelle Selbstprüfung

**Entscheidung:** Der Geometrie-Dienst rendert offscreen sechs Standardansichten plus Isometrie als PNG, optional mit hervorgehobenen Regelbefunden. Claude bewertet diese Bilder multimodal.

**Konsequenzen:** Erkennt Fehler, die Zahlen nicht zeigen (falsche Orientierung, fehlende Features). Benötigt Headless-Rendering auf allen Plattformen.

### ADR-011: Eigene Blech-Schicht (zurückgestellt bis nach der Beta)

**Entscheidung:** Eine Blech-API auf build123d mit Basislasche, Biegungen, Freischnitten, Biegetabellen (K-Faktor) und Abwicklung als DXF.

**Konsequenzen:** Größtes technisches Einzelrisiko im Pilot (R-02); wird früh mit einem Spike abgesichert.

### ADR-012: Optionale FEM

**Entscheidung:** Linear-statische Vorabschätzung über Gmsh (Vernetzung) und CalculiX (Solver), als separates, optionales Paket.

**Konsequenzen:** Nur Plausibilisierung, keine Auslegungsfreigabe; wird im Bericht klar gekennzeichnet.

### ADR-013: Lizenz und Governance (ersetzt durch ADR-034)

**Entscheidung:** Apache-2.0 für alle eigenen Komponenten; OCCT (LGPL) nur als dynamisch gelinkte Abhängigkeit über OCP; Developer Certificate of Origin für Beiträge; Release auf VS Code Marketplace und Open VSX.

**Konsequenzen:** Unternehmen können die Extension intern anpassen; ein Lizenz-Scan läuft in der CI.

### ADR-014: Zwei Testebenen

**Entscheidung:** (1) Golden-Tests für Geometrie: Volumen, Fläche, Schwerpunkt und Topologie-Zählungen mit Toleranz. (2) Eine KI-Eval-Suite mit 40–60 Referenzaufgaben über alle Verfahren, gemessen werden Erfolgsquote, Iterationen und Regelverstöße.

**Konsequenzen:** Modell- und Prompt-Änderungen werden messbar; die Eval-Suite ist das zentrale Qualitätsmaß für den Pilot.

### ADR-015: Explizite Publikation statt Sichtbarkeit

**Kontext:** Klassische CAD-Systeme steuern über Hide/Show und Speicherzustand, was exportiert wird. Das ist intransparent, fehleranfällig und vermischt Ansicht mit Bedeutung.

**Entscheidung:** Jedes Element ist entweder intern (Standard), veröffentlicht oder freigegeben. Die Publikation ist eine explizite, im Code lesbare Aussage (`publish(...)`), die der Konstrukteur im Viewer per Klick oder im Code setzt. Sichtbarkeit bleibt eine reine Ansichtseinstellung ohne Wirkung auf Export oder Versionierung.

**Konsequenzen:** Die Schnittstelle eines Bauteils ist jederzeit vollständig sichtbar und reviewbar. Claude darf Publikationen nur vorschlagen; das Setzen bestätigt immer der Mensch.

### ADR-016: Persistente Identität

**Kontext:** Das „Topological Naming Problem“: Nach einer Modelländerung werden Flächen und Kanten im Kernel neu nummeriert, Referenzen brechen. Ohne stabile IDs ist keine Publikation möglich.

**Entscheidung:** Drei Stufen: (1) explizite IDs für jedes Element; (2) Ableitung der Unter-IDs aus der Topologie-Historie jeder Kernel-Operation (erzeugt aus, verändert aus); (3) Geometrie-Signatur als Rückfall. Bleibt eine Zuordnung mehrdeutig, wird der Konstrukteur gefragt. Technische Basis ist die Historie der OCCT-Operationen, abgegriffen über OCP, da build123d selbst keine Topologie-Historie bereitstellt. Die Identitätsschicht liegt im Worker (Modul `kernel`) als Wrapper um build123d-Operationen.

**Alternativen:** Topologie-Indizes (brechen bei jeder Änderung); reines Geometrie-Matching (rät bei symmetrischen Teilen falsch); OCAF/TNaming aus OCCT direkt (mächtig, aber schwer mit build123d zu verbinden; wird im Spike bewertet).

**Konsequenzen:** Technisch anspruchsvollstes Arbeitspaket (Spike ap-39, Risiko R-10); muss vor allen darauf aufbauenden Funktionen stehen.

### ADR-017: Manifest als Lockfile mit semantischer Versionierung

**Entscheidung:** Jeder Build schreibt deterministisch `part.manifest.json` mit allen veröffentlichten Elementen (ID, Name, Typ, Quell-Feature, Geometrie-Hash, Bezüge). Die Datei wird eingecheckt; die Schnittstellenversion wird daraus automatisch nach SemVer-Regeln vorgeschlagen.

**Konsequenzen:** Git bleibt das einzige Versionssystem; jeder Pull Request zeigt Schnittstellenänderungen als lesbaren Diff. Eine spätere PLM-Anbindung liest nur das Manifest.

### ADR-018: Adressierung per URI (ersetzt durch ADR-058)

**Entscheidung:** Jedes veröffentlichte Element ist unter `cee://<server>/<projekt>/<bauteil>@<version>#<name>` erreichbar, über MCP, im Client und in Exporten (als Attribut in STEP). Bauteile, Baugruppen und Zeichnungen referenzieren nur veröffentlichte Elemente.

**Konsequenzen:** Interne Hilfsfeatures dürfen sich frei ändern, ohne andere zu brechen. Die Auswirkungsanalyse („wer nutzt diese Fläche?“) wird zu einer einfachen Abfrage.

### ADR-019: Semantische PMI im Code

**Entscheidung:** Maße, Toleranzen, Bezüge und Oberflächenangaben sind Objekte im Bauteilmodul, gebunden an Element-IDs. Sie werden geprüft (passt die Toleranz zur Regelklasse?), in STEP AP242 semantisch exportiert und auf Zeichnungen dargestellt.

**Konsequenzen:** Eine Annotation ist selbst veröffentlichbar und versioniert. Der Umfang semantischer PMI im STEP-Export von OCCT ist zu prüfen (Risiko R-11).

### ADR-020: Zeichnungsblätter als Code

**Entscheidung:** Ein Zeichnungsblatt ist ein Modul (`drawing_<name>.py`) mit Blattformat, Ansichten, Schnitten, Maßen und Schriftfeld, alle über Element-IDs referenziert. Es wird bei jedem Build neu abgeleitet und als PDF, SVG und DXF exportiert.

**Alternativen:** Interaktiver Zeichnungseditor (hoher Aufwand, nicht KI-freundlich).

**Konsequenzen:** Claude kann Zeichnungen erzeugen und anpassen; die Extension bietet eine Vorschau mit Klick-zu-Code-Navigation. Komplexe Zeichnungsnormen werden schrittweise ergänzt.

### ADR-021: KI-Änderungen als prüfbare Änderungssätze

**Kontext:** Konstrukteure müssen KI-Ergebnissen vertrauen können, ohne jede Code-Zeile zu lesen.

**Entscheidung:** Jede KI-Änderung ist ein Änderungssatz mit Geister-Vorschau, Code-Diff, Begründung (Anforderung oder Regel), Regelstatus und Auswirkung auf veröffentlichte Elemente. Übernommen wird erst nach Annahme; abgelehnte Sätze bleiben im Verlauf nachvollziehbar.

**Konsequenzen:** Der Geometrie-Dienst muss zwei Stände parallel bauen und vergleichen können. Varianten sind einfach mehrere Änderungssätze zur selben Aufgabe.

### ADR-022: Eine CAD-Arbeitsfläche mit eigenem Designsystem

**Entscheidung:** Arbeitsfläche, Eigenschaften-Panel, Werkzeugleiste, Befehlssuche, Änderungskarten, Verlauf und Varianten-Vergleich leben gemeinsam in einem Vollbild-Webview-Custom-Editor im Hauptfenster. Der Featurebaum mit veröffentlichten Elementen, Befunden und Zeichnungsblättern ist eine native Baumansicht in der Primary Sidebar und mit der Auswahl auf der Arbeitsfläche synchronisiert. Ein Konstrukteur-Modus blendet die übrige VS-Code-Oberfläche aus. Das Bedienkonzept orientiert sich an Figma: kein Menü, kein Ribbon, kontextuelles Eigenschaften-Panel. Ein eigenes, kleines Designsystem baut auf den VS-Code-Theme-Variablen auf, damit die Oberfläche in jedem Theme stimmig aussieht.

**Konsequenzen:** Schnelle Kommunikation innerhalb der Arbeitsfläche ohne Umwege. Visuelle Regressionstests (Screenshots je Theme) sichern die Qualität.

### ADR-023: Entwicklung durch Agenten

**Entscheidung:** Claude-Code-Agenten implementieren die Arbeitspakete parallel in eigenen Worktrees. Ein kleines menschliches Kernteam schreibt Specs mit Abnahmekriterien und Testfällen, entscheidet ADRs, testet mit Konstrukteuren und reviewt jeden Merge.

**Konsequenzen:** Engpass sind nicht mehr Entwicklerstunden, sondern Spec-Qualität, Testabdeckung und Review-Kapazität. Deshalb kommen Testinfrastruktur, Referenzteile und Eval-Suite ganz an den Anfang.

### ADR-024: Code-Transformation über den Syntaxbaum (ersetzt durch ADR-028 und ADR-035)

**Kontext:** Schalter, Schieberegler, Ziehgriffe, „Veröffentlichen per Klick“ und „letzte Aktion nachjustieren“ ändern das Modell. Da Code die Quelle der Wahrheit ist, müssen sie den Python-Code ändern, ohne Formatierung, Kommentare und Struktur zu zerstören.

**Entscheidung:** Alle UI-Aktionen erzeugen Änderungen über LibCST, eine Bibliothek für verlustfreie Python-Syntaxbäume. Bauteilmodule folgen einer Konvention: Parameter als typisierte Konstanten oder Dataclass, Features in `with feature(...)`-Blöcken, Publikationen als `publish(...)`-Aufrufe. Ein Linter erzwingt die Konvention; Claude hält sie über die Skills ein.

**Alternativen:** Textersetzung per Regex (bricht bei jeder Abweichung); Code nur generieren und nie von Hand ändern (widerspricht ADR-003).

**Konsequenzen:** UI- und KI-Änderungen sind derselbe lesbare Code-Diff. Freie, von der Konvention abweichende Code-Teile bleiben möglich, sind aber nur per Code und Claude änderbar; die Oberfläche zeigt sie als „nur im Code“ an.

### ADR-025: Inkrementeller Rebuild und Näherungsvorschau

**Kontext:** Ein vollständiger Neuaufbau mit OCCT dauert bei mittleren Teilen Sekunden; die UI verlangt Reaktionen unter 100 ms.

**Entscheidung:** Der Geometrie-Dienst speichert das Ergebnis jedes Features im Cache, verschlüsselt über dessen Code und Eingangsparameter, und baut nur ab dem ersten geänderten Feature neu. Beim Ziehen an Griffen oder Schiebereglern zeigt die Arbeitsfläche eine schnelle Näherung (Transformation oder vereinfachte Geometrie); die exakte Geometrie entsteht beim Loslassen. Rebuilds laufen im Hintergrund, abbrechbar, damit die UI nie blockiert.

**Konsequenzen:** Features müssen deterministisch und ohne versteckten Zustand sein; das passt zu ADR-024. ap-05 und ap-06 messen die erreichbaren Zeiten an Referenzteilen.

### ADR-026: Eigene Interaktionsschicht auf three.js

**Kontext:** three-cad-viewer ist zum Anzeigen gebaut. Ziehgriffe, Geister-Vorschau, ID-genaue Auswahl, Befundmarkierungen und Analyse-Overlays gehen deutlich darüber hinaus.

**Entscheidung:** Wir bauen eine eigene, schlanke Interaktionsschicht auf three.js: Szenengraph mit Element-IDs, GPU-Picking, Griffe, Vorschau-Layer, Overlays. Tessellierungsdaten kommen binär (Typed Arrays) statt als JSON. ocp\_tessellate und Teile von three-cad-viewer werden weiterverwendet, wo sie passen; der Spike ap-04 entscheidet, wie viel.

**Konsequenzen:** Mehr eigener Code, dafür volle Kontrolle über Bedienqualität und Geschwindigkeit. Ein Fork von three-cad-viewer entfällt.

### ADR-027: Parametrische Skizzen mit PlaneGCS

**Kontext:** Konstrukteure denken in Skizzen mit Bedingungen und Maßen. build123d kennt Skizzen nur mit festen Koordinaten; ein Constraint-Solver fehlt im Stack.

**Entscheidung:** PlaneGCS, der 2D-Constraint-Solver aus FreeCAD (LGPL-2.1-or-later), läuft zweimal mit identischem Kern: als WebAssembly in der Arbeitsfläche für flüssiges Zeichnen und Ziehen, als Python-Paket im Geometrie-Dienst für den exakten, reproduzierbaren Rebuild. Eine Skizze ist lesbarer Code mit benannten Elementen, Bedingungen und Maßen; Änderungen aus der Oberfläche laufen über ADR-024. Jedes Skizzenelement hat eine eigene ID und ist veröffentlichbar.

**Alternativen:** SolveSpace-Solver (GPL-3, nicht mit Apache-2.0 vereinbar); Skizzen ohne Bedingungen (für Konstrukteure nicht akzeptabel); eigener Solver (zu aufwendig).

**Konsequenzen:** Features, die auf benannten Skizzenelementen aufbauen, haben besonders stabile Referenzen und entlasten die Identitätsschicht. Beide Solver-Varianten müssen versionsgleich gehalten und mit gemeinsamen Testfällen geprüft werden; Abweichungen sind ein Pflicht-Testfall in der CI.

### ADR-028: Element-Graph als Quelle der Wahrheit

**Kontext:** Ein Achsenursprung soll genauso behandelt werden wie ein ganzes Bauteil. Echtzeit-Zusammenarbeit, Knoten-Editor und KI brauchen ein Modell, das sich ohne Parsen von Quellcode ändern lässt.

**Entscheidung:** Ein Projekt ist ein gerichteter, azyklischer Graph aus Elementen mit einheitlicher Form (`id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`). Geometrie wird nie gespeichert. Python mit build123d bleibt als Elementtyp `script`. Eine deterministische Textprojektion dient Git, Review und KI; Schema und Textformat liegen unter `format/`.

**Konsequenzen:** Ersetzt ADR-003 und ADR-024; ADR-015 bis ADR-020 gelten sinngemäß für Elemente. Das Schema ist Vertrag und ändert sich nur mit Migration.

### ADR-029: Rust-Kern für das Datenmodell

**Entscheidung:** Elementschema, Validierung, Abhängigkeiten, inkrementelle Neuberechnung, CRDT-Dokument, Textprojektion und Inhalts-Hashes liegen in einer Rust-Bibliothek. Eingebunden wird sie als Rustler-NIF (Elixir), WASM (Browser), nativ (Tauri) und über PyO3 (Python).

**Konsequenzen:** Eine Wahrheit über das Datenmodell statt vier. Rust ist eine weitere Sprache; Panics dürfen die BEAM nie erreichen, lange Aufrufe laufen auf Dirty Schedulern.

### ADR-030: Elixir und Phoenix für den Server

**Entscheidung:** Phoenix Channels und Presence für Live-Sync und Anwesenheit; ein überwachter Prozess je geöffnetem Dokument; Historie, Zweige, Änderungsanfragen, Freigaben und Rechte; Geometrie-Worker als Ports mit Zeitlimit und Neustart; Hintergrundaufgaben über Oban; MCP-Endpunkt für Agenten; PostgreSQL als Speicher.

**Konsequenzen:** Selbstbetrieb als ein Release plus Datenbank. Elemente sind Daten, keine Prozesse. Agenten schreiben Elixir weniger sicher als Python oder TypeScript; eigene Regeln und Reviews gleichen das aus.

### ADR-031: Web-App und Desktop-App mit Tauri

**Entscheidung:** Ein TypeScript-Client läuft im Browser und als Tauri-2-App für Linux, Windows und macOS. Desktop: Kern nativ, lokaler Speicher und Worker, voll offline. Browser: Kern als WASM, Geometrie vom Server.

**Konsequenzen:** Ersetzt ADR-005. Unterschiede der Web-Engines (WebKitGTK, WebView2, WKWebView) brauchen eigene UI-Tests.

### ADR-032: Geometrie als abgeleiteter Cache

**Entscheidung:** Synchronisiert wird nur das Rezept. Geometrie entsteht in zustandslosen Workern hinter einer versionierten Kernel-Schnittstelle und wird nach Inhalts-Hash gecacht. Erste Implementierung: OpenCascade über build123d/OCP. Ein eigener Kernel ist nur als spezialisierter Zusatz denkbar (implizite Modelle, Gitter), frühestens nach der Beta.

**Konsequenzen:** Ein zweiter Kernel kann später hinzukommen, ohne Datenmodell oder Synchronisation zu ändern.

### ADR-033: Local-first-Zusammenarbeit mit CRDT und Zweigen

**Entscheidung:** Jedes Projekt ist ein Automerge-Dokument. Online verteilt der Server Änderungen sofort; offline arbeitet der Client lokal und führt beim Verbinden zusammen. Darüber liegen Zweige, Änderungsanfragen, Review und Freigabe. Semantische Konflikte werden als Befund gezeigt, nie still gelöst.

**Konsequenzen:** Der Datenmodell-Spike misst Größe und Merge-Zeiten; Schemamigrationen müssen mit der CRDT-Historie verträglich sein.

### ADR-034: Lizenz MPL-2.0 für den Kern, Apache-2.0 für SDK und Format

**Entscheidung:** MPL-2.0 für Kern, Server, Client und Worker; Apache-2.0 für SDK, Formatspezifikation und Plugin-Vorlagen. Developer Certificate of Origin; Markenanmeldung, sobald der Name steht. Kein GPL, kein AGPL; OCCT (LGPL) nur dynamisch bzw. im Worker-Prozess.

**Konsequenzen:** Ersetzt ADR-013. Verbesserungen am Kern fließen zurück, Plugins sind unter jeder Lizenz möglich. Forks vermeiden Plugin-SDK, offene Governance und Markenschutz, nicht die Lizenz.

### ADR-035: Drei Projektionen: 3D, Knoten, Text

**Entscheidung:** Derselbe Graph hat drei gleichwertige Ansichten. Der Featurebaum ist eine hierarchische Ansicht des Graphen; KI-Änderungen sind Änderungssätze aus Graph-Operationen (ADR-021).

**Konsequenzen:** Jede Graph-Operation braucht eine Darstellung in allen drei Ansichten.

### ADR-036: Immersives Review über WebXR

**Entscheidung:** Modell in Originalgröße betrachten, auswählen, kommentieren, gemeinsam mit Anwesenheit; kein Modellieren in XR. Status vorgeschlagen, frühestens nach der Beta.

### ADR-037: KI anbieteroffen und lokal

**Kontext:** Einzelpersonen und kleine Gruppen haben vertrauliche Daten und kleine Budgets. Lokale Modelle und Selbstbetrieb sind deshalb Pflicht, nicht Ausbaustufe.

**Entscheidung:** Agenten greifen über MCP zu, der eingebaute Assistent über eine Anbieter-Schnittstelle (OpenAI-kompatibel für Ollama, llama.cpp, vLLM, LM Studio; Anthropic; weitere als Plugin). Kein Anbieter ist vorkonfiguriert, lokale Modelle werden erkannt. Schlüssel bringt der Nutzer mit. Daten gehen nur an den ausdrücklich gewählten Anbieter, je Projekt einstellbar; keine Telemetrie ohne Zustimmung. Tools sind so einfach, dass auch kleine lokale Modelle sie bedienen.

**Konsequenzen:** Die Eval-Suite misst jede Version mit einem Cloud- und einem lokalen Modell. Selbstbetrieb kommt in M1, lokale Modelle mit ap-15 in M3.

### ADR-038: Erster Anwendungsfall Raumgestaltung und Raumakustik

**Entscheidung:** Die ersten Elementtypen sind `level`, `wall`, `slab`, `opening`, `furniture`, `absorber`, `material` und `analysis`; Absorber-Bauteile entstehen per Skizze und Extrusion. Ein Raum ist ein Element mit Untergraph; der Grundriss ist eine 2D-Ansicht derselben Elemente.

**Konsequenzen:** Fertigungsregeln folgen nach der Beta. Kein volles BIM (Statik, Haustechnik, Bauantrag); IFC dient zum Übernehmen von Räumen.

### ADR-039: Material als Element mit Eigenschaften

**Entscheidung:** Ein Material ist ein Element mit den Gruppen Aussehen (glTF-PBR), Akustik (α je Oktavband, αw, Absorberklasse), Physik, Brandverhalten, Kosten und Nachhaltigkeit (GWP mit Quelle). Elemente verweisen über den Eingang `material` darauf, Schichtaufbauten als Liste mit Dicken.

**Konsequenzen:** Mengen, Kosten, Gewicht und CO₂ ergeben sich ohne Zusatzpflege; Herstellerdaten kommen als eigene Bibliothek.

### ADR-040: Rendering im Client

**Entscheidung:** Echtzeit mit three.js (PBR, HDRI, Schatten), Fotomodus mit progressivem Path Tracing (three-gpu-pathtracer, MIT) auf derselben Szene; glTF als Austausch. Kein Rendering in der Cloud.

**Konsequenzen:** Leistung auf schwacher Hardware misst Spike ap-04.

### ADR-041: Akustik-Berechnung im Rust-Kern

**Entscheidung:** `crates/acoustics` berechnet die Nachhallzeit je Oktavband nach Sabine und Eyring, nativ, als WASM und als NIF. Ergebnisse sind `analysis`-Elemente. Zielwerte (z. B. DIN 18041) kommen als geprüftes Regelpaket, Normtext wird nicht übernommen.

**Konsequenzen:** 1.000 Flächen in unter 1 ms (ap-02). Geometrische Verfahren folgen als eigenes Analyse-Element.

### ADR-042: Austauschformate

**Entscheidung:** Import von IFC (IfcOpenShell im Worker), DXF und glTF; Export als glTF, PDF-Bericht, CSV-Mengenliste und STEP AP242 für Bauteile.

**Konsequenzen:** Ändert ADR-004; IfcOpenShell (LGPL) nur im Worker-Prozess.

### ADR-043: Komponenten, Instanzen und Bibliotheken

**Kontext:** Wiederverwendbare, konfigurierbare Vorlagen wie in Figma: Absorber-Katalog, Möbel und Raumvorlagen einmal pflegen, vielfach nutzen, Aktualisierungen kontrolliert übernehmen.

**Entscheidung:** Eine `component` hat einen Untergraphen, exponierte Parameter und benannte Varianten. Eine `instance` verweist auf die Komponente und speichert nur Variante und Überschreibungen, nie eine Kopie. Definitionsänderungen erreichen alle Instanzen, Überschreibungen bleiben erhalten; entfällt ein Parameter, entsteht ein Befund. Komponenten sind verschachtelbar, Zyklen verboten. Bibliotheken sind Projekte mit veröffentlichten, semantisch versionierten Komponenten; neue Versionen kommen mit Vorschau der Wirkung (Geometrie, Nachhallzeit, Kosten). Lösen macht aus einer Instanz einen eigenständigen Untergraphen.

**Konsequenzen:** Der Absorber-Katalog ist eine Komponentenbibliothek mit Varianten. ap-01 misst die Weitergabe an 1.000 Instanzen (≤ 50 ms) und den Erhalt der Überschreibungen.

### ADR-044: Bedienmuster aus Blender

**Entscheidung:** (1) Während einer Bewegung Achse sperren und Wert tippen, ohne Dialog. (2) Arbeitsbereiche als Reiter, seit ADR-054 Beitrag der Fachpakete (für Raum und Akustik: Raum, Akustik, Präsentation, Bericht); jeder zeigt nur passende Panels. (3) Stapel nicht-destruktiver Schritte im Eigenschaften-Panel als einfachste Sicht auf den Graphen. (4) Jede Aktion als Graph-Operation bzw. Textzeile sichtbar und kopierbar. (5) Fotomodus mit Denoiser (Open Image Denoise, Apache-2.0, oder gleichwertig im Browser).

**Konsequenzen:** Ändert ADR-022, ergänzt ADR-035 und ADR-040. Weitere Anregungen im Ideenspeicher.

### ADR-045: Befehle, Erweiterungen und Vertrauen nach dem Vorbild von VS Code

**Entscheidung:** (1) Jede Funktion ist ein Befehl mit stabiler ID und Parameter-Schema; Befehlssuche, Tastenkürzel, Plugins, Aktionsprotokoll und MCP-Werkzeuge kommen aus diesem Register. (2) Plugins deklarieren ihre Beiträge im Manifest, laufen isoliert mit ausdrücklichen Rechten über eine versionierte API; offenes, selbst hostbares Verzeichnis. (3) Fremde Projekte und Bibliotheken öffnen im eingeschränkten Modus ohne Script- und Plugin-Ausführung, bis man ihnen vertraut. (4) Regeln liefern Befunde mit Ort und optional festen Korrekturen als Änderungssatz. (5) Einstellungen in Ebenen Standard, Organisation, Benutzer, Projekt, mit Schema. (6) Visueller Vergleich zweier Stände und Verlauf je Element.

**Konsequenzen:** Ändert ADR-007 und ADR-022, ergänzt ADR-008 und ADR-044. Nicht übernommen: Telemetrie standardmäßig an, proprietäres offizielles Produkt. Weitere Anregungen im Ideenspeicher.

### ADR-046: Fachneutraler Kern und Muster aus Onshape

**Entscheidung:** (1) Der Kern kennt nur fachneutrale Grundtypen (Element, Komponente, Instanz, Verbindungspunkt, Variable, Material, Analyse, Item); Fachtypen leben in Fachpaketen wie `raum`, `akustik`, später `mechanik`. (2) Auch mitgelieferte Fachpakete nutzen nur das Plugin-SDK. (3) Verbindungspunkte (`frame`) zum Platzieren von Instanzen. (4) Projektvariablen (`variables`) mit Einheiten. (5) Verweise über Projekte nur auf feste Versionen.

**Konsequenzen:** Ändert ADR-038: Raum und Akustik sind das erste Fachpaket. ap-01 prüft zusätzlich eine fachfremde Baugruppe gegen dasselbe Schema.

### ADR-047: Freigabeprozess, Revisionen und Lebenszyklus

**Entscheidung:** (1) Item mit Sachnummer, Revision und Status. (2) Versionen jederzeit, Revisionen nur durch Freigabe. (3) Lebenszyklus In Arbeit → In Prüfung → Freigegeben → Ersetzt bzw. Gesperrt, Übergänge als Befehle mit Bedingungen. (4) Selbstfreigabe standardmäßig an bis zwei Personen mit Freigaberecht, danach Vier-Augen-Prinzip; Agenten geben nie frei. (5) Unveränderliche, signierte Freigabestände mit archivierten Dokumenten. (6) Stückliste aus dem Graphen. (7) Änderungsantrag und Änderungsauftrag auf Basis von Entwürfen.

**Konsequenzen:** Ändert ADR-017 und ADR-032, ergänzt ADR-015. ap-33a vor der Beta, ap-33b danach (ADR-059).

### ADR-048: Offene Schnittstelle zu PLM und ERP

**Entscheidung:** (1) Ein führendes System je Feld: CEE für die Produktdefinition, PLM bzw. ERP für Materialstamm, MBOM, Lager und Aufträge. (2) Offenes Austauschformat in `format/`. (3) API aus dem Befehlsregister. (4) Ereignisse über eine Outbox, mindestens einmal zugestellt. (5) Nummernkreise und Abgleiche als Plugins.

**Konsequenzen:** Ergänzt ADR-017, ADR-030 und ADR-047. Format mit ap-33b, API und Ereignisse mit ap-34, beide nach der Beta.

### ADR-049: Automatisierung, Apps und Studien nach dem Vorbild von Synera

**Entscheidung:** (1) Veröffentlichte Untergraphen mit deklarierten Ein- und Ausgängen werden ohne Code Befehl, Knoten und MCP-Werkzeug, versioniert und freigebbar. (2) Apps aus dem Graphen: Formular, 3D-Ergebnis, Kennzahlen und Bericht für Personen ohne Modellrechte; Ergebnisse als Änderungssatz. (3) Bibliotheken für Person, Projekt und Organisation; gesperrte Komponenten. (4) Zwischenergebnisse an jedem Knoten und jeder Kante. (5) Studien (`study`) rechnen Parameterbereiche im Worker durch; Tabelle und Pareto-Diagramm; der Mensch wählt.

**Konsequenzen:** Ändert ADR-043, ergänzt ADR-035 und ADR-045. ap-35 nach der Beta; Werte an Kanten mit ap-23a in der Beta, Untergraph als Befehl mit ap-23 danach (ADR-059).

### ADR-050: Bewährtes aus klassischem CAD (CATIA, NX, Creo)

**Entscheidung:** (1) Komponenten deklarieren Referenz-Eingänge mit Typ, im Kontext gewählt; Ersetzen mit Umhängen, mehrdeutige Zuordnungen nur als Vorschlag. (2) Direktes Bearbeiten von Flächen an jeder Geometrie, als Element im Graphen. (3) Robuste Neuberechnung: Berechnungszustände aktuell, veraltet, fehlerhaft, pausiert; ein Fehler stoppt nie den Rest. (4) Skelett mit veröffentlichten Bezügen, Verknüpfungen live oder eingefroren. (5) Teil-Laden und Detailstufen Hülle, vereinfacht, voll. (6) Messungen mit Grenzwert und Modellierrichtlinien als Regeln.

**Konsequenzen:** Ändert ADR-025 und ADR-043, ergänzt ADR-008, ADR-016 und ADR-032. Betrifft ap-05, ap-06, ap-13, ap-20; neues Arbeitspaket ap-36.

### ADR-051: Versionierung in Alltagsbegriffen und Entwicklungstrichter

**Entscheidung:** (1) Oberfläche ohne Git-Begriffe, automatisch gesichert: Entwurf, Meilenstein, Übernehmen, Zur Prüfung geben, Zurückholen, Ableiten, Verlauf. (2) Konflikte als Entscheidungskarten. (3) Zustände Idee, In Arbeit, Ergebnis, dann ADR-047; Verwerfen archiviert mit Begründung, löscht nie. (4) Standardansicht zeigt Ergebnisse, die Werkstatt alle Entwürfe. (5) Herkunft beim Ableiten. (6) Entscheidungsprotokoll je Projekt.

**Konsequenzen:** Ändert ADR-033, ergänzt ADR-047. Betrifft ap-08b, ap-17, ap-25.

### ADR-052: Ordnungssystem und Wiederfinden

**Entscheidung:** Organisation › Bereich › Projekt; Facetten automatisch aus dem Graphen; eine Suche für Befehle und Inhalte mit Parameterbedingungen und semantischer Suche; feste Adressen mit Weiterleitung; Rückverweise; gespeicherte Sammlungen; Startseite je Person; Kontext am Element; Hygiene für verwaiste Entwürfe und Doppelteile.

**Konsequenzen:** Ergänzt ADR-018 und ADR-045. Suchindex ist abgeleitet und wird nie synchronisiert. ap-37a in M2, ap-37b nach der Beta (ADR-059).

### ADR-053: Lernschleife für lokale Modelle

**Entscheidung:** Bewertung nur durch Prüfer; Aufgabengenerator je Fachpaket; Stufen Prüfer, Erfahrungsspeicher, LoRA aus geprüften Erfolgen, später bestärkendes Lernen; geheime Prüfaufgaben und Regressionsschranke; Training lokal, Projektdaten nur mit Zustimmung.

**Konsequenzen:** Ergänzt ADR-014 und ADR-037. Stufe 1 in ap-15, Stufen 2 und 3 in ap-38.

### ADR-054: Fachpakete: interne API zuerst, Arbeitsbereiche als Beitrag

**Entscheidung:** (1) Ab ap-05 bzw. ap-08 eine interne Fachpaket-API mit Manifest und Beitragsarten; mitgelieferte Fachpakete nutzen nur sie; das öffentliche SDK (ap-27) ist dieselbe API, stabil versioniert. (2) Fachpakete unter `packages/<name>/`, rechenintensive Teile als Crate `crates/<name>` (z. B. Akustik); Fachpakete hängen vom Kern ab, nie umgekehrt. (3) Der Kern bringt den Arbeitsbereich Modell; weitere Arbeitsbereiche steuern Fachpakete bei, höchstens fünf gleichzeitig sichtbar.

**Konsequenzen:** Ändert ADR-041, ADR-044 und präzisiert ADR-046. ap-09 bis ap-11 hängen von ap-05 und ap-08a/b ab.

### ADR-055: Rechte, Rollen und Anmeldung

**Entscheidung:** Anmeldung über OpenID Connect (eigene Konten mit zweitem Faktor oder externer Anbieter); Rollen Betrachten, Kommentieren, Bearbeiten, Prüfen, Freigeben, Verwalten, dazu App-Nutzer und Gast; vererbt über Organisation, Bereich, Projekt, keine Rechte je Element; Prüfung im Server, offline Entstandenes außerhalb der Rechte als Entscheidungskarte; Agenten als Dienstkonto ohne Freigaberecht.

**Konsequenzen:** Ergänzt ADR-030, ADR-047 und ADR-049. Umgesetzt in ap-07a (lokale Anmeldung) und ap-07b (Rollen, Rechte, OIDC).

### ADR-056: Datenschutz

**Entscheidung:** Anwesenheit nur live; Verlauf mit Konto-IDs; Protokolle ohne Inhalte, höchstens 30 Tage; nach Austritt „ehemaliges Mitglied“, Signaturen in Freigabeständen bleiben für die Aufbewahrung; Export für Personen und Organisationen; keine Weitergabe ohne Wahl; für den gehosteten Dienst Auftragsverarbeitung und EU-Standort.

**Konsequenzen:** Ergänzt ADR-037, ADR-047 und ADR-055; Prüfpunkt im Review.

### ADR-057: Einheiten und Größen

**Entscheidung:** Jeder Zahlenwert hat eine Dimension, der Kern prüft Ausdrücke; kanonisch mm, rad, kg, s, Hz, kg CO₂e; Geld als Dezimalzahl mit Währung; Eingabe mit Einheiten und Formeln, Anzeige je Projekt oder Person, Rundung nur in der Anzeige; Fachpakete wandeln nur an ihrer Schnittstelle.

**Konsequenzen:** Ergänzt ADR-028, ADR-044 und ADR-046; festgelegt im Schema von ap-05.

### ADR-058: Adressen auf ID-Basis

**Entscheidung:** `cee://<server>/<organisation>/<projekt>/<element-id>@<meilenstein|revision>`; Namen als Aliase; Umbenennen ändert nichts, Verschieben leitet weiter; Verweise über Projektgrenzen speichern immer eine Version.

**Konsequenzen:** Ersetzt die Adressform von ADR-018.

### ADR-059: Meilensteine und Beta-Umfang

**Entscheidung:** (1) Vier Meilensteine bis zur Beta: M0 Klären (G1), M1 Werkbank – die Firma erstellt allein ein echtes Angebot, eine Person, im Browser, selbst gehostet (G2), M2 Zusammen, M3 Beta (G3). (2) Nach der Beta: Knoten-Editor zum Bearbeiten, Apps und Studien, direktes Bearbeiten, IFC/DXF, Möbel aus glTF, Änderungswesen, PLM/ERP, Lernschleife und weiterer Ausbau. (3) Architektur-Grundlagen vollständig ab M1, verschoben werden nur Funktionen. (4) Große Pakete als Teil-Changes, ein Change je Nacht. (5) Die Warteschlange folgt den Meilensteinen.

**Konsequenzen:** M1 ist für eine Person, das Datenmodell bleibt auf Zusammenarbeit ausgelegt; der Knoten-Editor ist in der Beta eine lesende Ansicht.

## Regelwerk und Verifikationsschleife

Erstes Regelpaket ist die Raumakustik: Zielbänder für die Nachhallzeit je Raumart, geprüft von der Firma (ap-20). Die Fertigungsregeln unten folgen nach der Beta.

Ein Bauteil gilt erst als fertig, wenn alle Regeln mit Schweregrad „Fehler“ bestehen, die Anforderungen erfüllt sind und ein Mensch das Ergebnis freigegeben hat. Ein Agent arbeitet dafür in einer festen Schleife und bricht nach höchstens acht Iterationen mit einem Befundbericht ab.

**Ablauf einer Konstruktionsaufgabe**

1. Der Agent liest Freitext und Unterlagen und legt Anforderungen als Elemente vom Typ `requirement` an; der Konstrukteur bestätigt sie.
2. Der Agent wählt Bausteine aus der Bibliothek und legt das Bauteil als Elemente im Graphen an (als Änderungssatz).
3. Der Worker berechnet die Geometrie; Fehler im Kernel kommen strukturiert mit Element-ID zurück.
4. `check_rules` prüft Anforderungen und Regelpakete; Befunde nennen Regel-ID, Ort und Korrekturvorschlag.
5. `render_views` liefert Ansichten mit markierten Befunden zur visuellen Kontrolle.
6. Der Agent korrigiert und wiederholt ab Schritt 3, bis keine Fehler mehr offen sind.
7. Export, Prüfbericht (Markdown/HTML) und Freigabe durch den Menschen.

**Regelpakete im Pilot (Auswahl, Startwerte firmenspezifisch anpassbar)**

| Paket | Beispielregeln | Prüfmethode |
| --- | --- | --- |
| Allgemein | Bauraum eingehalten; Schnittstellenmaße exakt; geschlossener, gültiger Volumenkörper | Bounding-Box, Messung, BRep-Check |
| Fräsen | Innenradien ≥ Werkzeugradius; Taschentiefe ≤ 4 × Werkzeugdurchmesser; keine Hinterschnitte je Aufspannung | Kanten-/Flächenanalyse, Zugänglichkeit je Richtung |
| Blech | Biegeradius ≥ Blechdicke; Lochabstand zur Biegung ≥ 2 × Dicke + Radius; Freischnitte vorhanden | Blech-Metadaten, Abstandsmessung |
| Spritzguss | Gleichmäßige Wandstärke (± 25 %); Entformschräge ≥ 1°; Rippen ≤ 60 % der Wanddicke | Wandstärkenanalyse per Ray-Casting, Normalenwinkel zur Entformrichtung |
| 3D-Druck (FDM/SLS) | Mindestwandstärke; Überhänge > 45° markieren; Bauteil passt in Bauraum | Normalenanalyse, Ray-Casting |
| Baugruppe | Keine Kollisionen; Montierbarkeit der Verbindungen; Normteile aus Bibliothek | Boolesche Schnittmenge, Joint-Prüfung |

Die Zahlen sind Platzhalter aus gängigen Konstruktionsrichtlinien; jedes Unternehmen hinterlegt seine eigenen Werte in YAML. Wissen, das sich nicht als Prüfung ausdrücken lässt (z. B. Gestaltungsprinzipien, Hausstandards), liegt als Skill-Text für Claude bei.

**Lernschleife für lokale Modelle (ADR-053).** Weil sich CEE-Aufgaben objektiv prüfen lassen (Graph gültig, Geometrie baut, Regeln bestehen, Zielwerte erreicht), können lokale Modelle aus geprüften Versuchen lernen. Bewertet wird nur durch Prüfer, nie durch das Modell selbst. Stufen: (1) Aufgabengenerator und Prüfer, zugleich Eval-Suite; (2) Erfahrungsspeicher mit geprüften Lösungswegen als Beispiele; (3) LoRA-Adapter aus geprüften Erfolgen; (4) bestärkendes Lernen später. Schutz: geheime Prüfaufgaben, Übernahme nur bei Verbesserung ohne Rückschritt, mehrere Prüfer, Stichproben durch Menschen. Alles lokal; Aufgabensätze, Prüfer und Adapter lassen sich offen teilen.

## Arbeitspakete

Die Arbeit ist in Arbeitspakete geschnitten und nach vier Meilensteinen bis zur Beta geordnet (ADR-059): **M0 Klären**, **M1 Werkbank** (die Firma erstellt allein ein echtes Angebot), **M2 Zusammen**, **M3 Beta**; danach folgt der Ausbau. Jedes Paket ist ein OpenSpec-Change mit Abnahmetests (`ap-xx-kurzname`); große Pakete sind in Teil-Changes (a, b) geteilt, damit jeder in eine Nacht passt. Die Tabelle steht in Umsetzungsreihenfolge; bis zur Beta sind es 35 Changes.

| AP | Meilenstein | Inhalt | Abnahme | Abhängig von |
| --- | --- | --- | --- | --- |
| ap-00-setup | M0 | Gerüst für Rust, Elixir, TypeScript/Tauri, Python; CI; Lizenzprüfung; Credo und Dialyzer | Alle Sprachen bauen und testen in der CI; 0 Lizenzverstöße | – |
| ap-01-spike-datenmodell | M0 | Elementschema, Automerge, Textprojektion, NIF und WASM, Komponenten und Instanzen; Beispiele: Raum mit Absorbern und fachfremde Baugruppe mit Verbindungspunkten, Variablen und Items | 12 Kennzahlen gemessen, Go oder No-Go | – |
| ap-02-akustik-nachhallzeit | M0 | Crate `crates/acoustics`: Sabine und Eyring je Oktavband, Fehler, Kommandozeile | ≤ 0,1 % zur Formel; 1.000 Flächen ≤ 1 ms | – |
| ap-39-spike-identitaet | M0 | Persistente Identität von Flächen und Kanten (ADR-016) an Referenzteilen: Topologie-Historie aus OCP, Stresstests mit geteilten und verschmolzenen Flächen | ≥ 95 % der Referenzen überleben 50 Parameteränderungen; Rest als Nachfrage, nie geraten | ap-00 |
| ap-03-spike-sync | M0 | Phoenix Channels mit Rust-Kern: zwei Browser live, einer offline, Zusammenführen | Änderung bei beiden < 200 ms; Merge ohne Datenverlust | ap-01 |
| ap-04-spike-rendering | M0 | Echtzeit-PBR und Fotomodus (Path Tracing mit Denoiser) in Browser und Tauri auf drei Systemen | Raum mit 50 Objekten ≥ 30 fps; Fotomodus 1920 × 1080 in ≤ 60 s auf Mittelklasse-GPU | ap-00 |
| ap-41-ux-prototyp | M0 | Klickbarer Prototyp: Arbeitsfläche, Akustik-Panel, Entwürfe und Suche; Test mit der Firma | 4 von 5 Testpersonen lösen drei Kernabläufe ohne Einweisung | – |
| ap-05-graph-kern | M1 | Graph-Kern produktiv: Schema v1, Validierung, Abhängigkeiten, Migrationen, Teil-Laden, Berechnungszustände | 100.000 Elemente laden ≤ 2 s | ap-01 |
| ap-40-bindungen-sdk | M1 | Produktive Bindungen des Kerns: Rustler-NIF, WASM, PyO3; Python-SDK; dieselben Bindungen für Fachpaket-Crates | Gleicher Inhalts-Hash in Rust, Elixir, Browser und Python; Operation ≤ 1 ms (NIF) bzw. ≤ 5 ms (WASM) | ap-05 |
| ap-06-kernel-worker | M1 | Kernel-Protokoll, Python-Worker mit OCCT, Cache nach Inhalts-Hash, Detailstufen, robuste Neuberechnung | Raum mit 6 Wänden und 2 Öffnungen baut < 1 s; Worker-Absturz ohne Serverausfall | ap-05, ap-39, ap-40 |
| ap-07a-server-dokument | M1 | Dokumentprozess, Speichern in PostgreSQL, Channels für eine Person, lokale Anmeldung, Export aller Projektdaten im offenen Format | Dokument mit 10.000 Elementen speichern und laden ≤ 2 s; Absturz ohne Datenverlust | ap-03, ap-05, ap-40 |
| ap-08a-grundlagen | M1 | Befehlsregister mit Befehlssuche, Einstellungen, interne Fachpaket-API (ADR-054), Übersetzungen Deutsch und Englisch, Einheiten in Ein- und Ausgabe (ADR-057) | Jede Funktion über die Befehlssuche erreichbar; keine festen Texte im Code; ein Beispiel-Fachpaket lädt über die API | ap-05, ap-40 |
| ap-08b-arbeitsflaeche | M1 | Arbeitsfläche mit 3D und 2D-Grundriss, Featurebaum, Eigenschaften, Werte beim Ziehen tippen; Bedienelemente nach WCAG 2.2 AA | 4 von 5 Testpersonen der Firma lösen Kernabläufe; Auswahl < 100 ms; vollständig per Tastatur bedienbar | ap-04, ap-07a, ap-08a, ap-41 |
| ap-09-raum-elemente | M1 | Geschoss, Wand, Boden, Decke, Fenster, Tür, einfache Möbel (Quader mit Absorptionsfläche); Wände im Grundriss zeichnen | Besprechungsraum in ≤ 5 min modelliert; Öffnungen schneiden Wände korrekt | ap-06, ap-08b |
| ap-10-materialbibliothek | M1 | Material-Elemente mit allen Eigenschaftsgruppen, Import von Herstellerdaten (CSV) | 20 Materialien der Firma importiert, αw und Absorberklasse korrekt | ap-05, ap-08b |
| ap-11-akustik-live | M1 | Analyse-Element Nachhallzeit, Live-Anzeige je Band, Zielband, Kern als WASM | Aktualisierung beim Verschieben < 100 ms | ap-02, ap-09, ap-10, ap-40 |
| ap-12-skizze-extrusion | M1 | Skizzen und Extrusion für Absorberformen, Identität der Flächen; Zwangsbedingungen mit PlaneGCS erst nach Lizenzklärung (ADR-027) | Absorber-Form per Skizze in ≤ 3 Schritten; IDs stabil über 50 Parameteränderungen | ap-06, ap-08b, ap-39 |
| ap-13a-komponenten-katalog | M1 | Komponenten mit Varianten und Instanzen (ADR-043); Absorber-Katalog der Firma als Bibliothek im selben Projekt; Platzieren an Wand und Decke über Verbindungspunkte, abgehängt, Reihen und Raster | 12 Deckensegel als Raster in einem Schritt; Wirkung sofort in der Nachhallzeit; eine Katalogänderung erreicht alle Instanzen, Überschreibungen bleiben | ap-10, ap-11, ap-12 |
| ap-14-rendering-fotomodus | M1 | Echtzeit-PBR, HDRI, Fotomodus mit Denoiser produktiv, Bild als PNG | Referenzraum fotorealistisch; Materialien entsprechen Mustern der Firma | ap-04, ap-10 |
| ap-18-mengen-kosten-co2 | M1 | Mengen, Kosten, Gewicht und CO₂ je Raum; CSV-Mengenliste | Summen stimmen mit Handrechnung für 3 Räume | ap-10, ap-13a |
| ap-19-bericht-angebot | M1 | PDF-Bericht: Nachhallzeit vorher/nachher, Bilder, Grundriss, Mengen, Kosten, CO₂ | Firma versendet einen echten Bericht ohne Nacharbeit | ap-14, ap-18 |
| ap-16-selbstbetrieb | M1 | Container mit Server und Datenbank, Backups mit Wiederherstellungstest (lokales Modell mit ap-15, OIDC mit ap-07b) | Installation in < 15 min | ap-07a |
| ap-07b-server-zusammenarbeit | M2 | Mehrere Personen live: Presence, Cursor, Kommentare an Elementen, Rollen und Rechte, Anmeldung über OIDC (ADR-055) | 20 gleichzeitige Nutzer je Dokument, Änderung < 200 ms; Rechte im Server geprüft | ap-07a |
| ap-25-entwuerfe | M2 | Entwürfe, Meilensteine, Übernehmen mit Entscheidungskarten, Zur Prüfung geben, Verwerfen mit Begründung, Herkunft, semantische Konflikte (ADR-051) | 100 % der Konflikte im Testkorpus erkannt | ap-07b |
| ap-17-desktop-offline | M2 | Tauri-App mit Kern, Speicher und Worker; offline, Abgleich beim Verbinden | Einen Tag offline gearbeitet, Merge ohne Datenverlust | ap-06, ap-07a, ap-40 |
| ap-26-publikation | M2 | Publikationsstatus, Manifest, Adressen auf ID-Basis (ADR-058), semantischer Diff | Schnittstellen-Diff an 3 Referenzräumen korrekt | ap-05 |
| ap-13b-bibliotheken | M2 | Referenz-Eingänge an Komponenten mit Ersetzen und Umhängen (ADR-050); Bibliotheken über Projektgrenzen mit Versionen und Aktualisierung mit Vorschau | Katalog aus einem Bibliotheksprojekt in drei Raumprojekten; Update mit Vorschau übernommen, Überschreibungen bleiben | ap-13a, ap-26 |
| ap-33a-freigabe | M2 | Items, Sachnummern, Revisionen, Lebenszyklus, Selbstfreigabe bzw. Vier-Augen-Prinzip, Freigabestand mit STEP, Bericht und Mengenliste als Stückliste | Absorber und Raumangebot freigegeben, geändert und als Revision B erneut freigegeben; Freigabestand bitgleich reproduzierbar | ap-25, ap-26 |
| ap-37a-suche | M2 | Struktur Organisation › Bereich › Projekt, Suche mit Facetten, Rückverweise, Startseite | 20 typische Such-Aufgaben der Firma in je ≤ 30 s gelöst; Suche über 100.000 Elemente < 300 ms | ap-07b, ap-25 |
| ap-15-mcp-ki | M3 | MCP-Endpunkt, Anbieter-Schnittstelle (lokal und Cloud), Änderungssätze, Eval-Suite mit Aufgabengenerator und Prüfern (ADR-053) | Agent bringt die Nachhallzeit eines Referenzraums in das Zielband, mit Cloud- und lokalem Modell | ap-07b, ap-08a, ap-13a |
| ap-24-textprojektion-git | M3 | Textprojektion produktiv, Git-Export und -Import | Roundtrip verlustfrei; eine Parameteränderung = eine Zeile | ap-05 |
| ap-20-regeln-raumakustik | M3 | Zielwerte als Regelpaket (z. B. nach DIN 18041), geprüft durch die Firma; Messungen mit Grenzwert, Modellierrichtlinien | Zielbänder für 5 Raumarten stimmen mit Firmenprüfung | ap-11 |
| ap-08c-arbeitsflaeche-ausbau | M3 | Stapel, Arbeitsbereiche aus Fachpaketen, Aktionsprotokoll, Avatare | Stapel und Arbeitsbereiche für Raum und Akustik; jede Aktion als Textzeile kopierbar | ap-07b, ap-08b |
| ap-23a-knoten-ansicht | M3 | Knoten-Ansicht des Graphen: lesen, durchsuchen, Werte an jeder Kante; Auswahl synchron mit 3D | Absorber-Raster vollständig als Knoten sichtbar; Auswahl in beide Richtungen < 100 ms | ap-08b, ap-24 |
| ap-27-plugin-sdk | M3 | Fachpaket-API öffentlich und minimal: Manifest, Sandbox und Rechte, Projekt-Vertrauen, Beispiel-Fachpaket | Fremd-Plugin ohne Änderung am Kern | ap-05, ap-08c |
| ap-23-knoten-editor | nach Beta | Knoten-Editor zum Bearbeiten, Untergraphen als Bausteine und Befehle | Absorber-Raster vollständig im Knoten-Editor | ap-23a |
| ap-35-apps-studien | nach Beta | Apps aus veröffentlichten Untergraphen, gesperrte Komponenten, Bibliotheksebenen, Studien mit Tabelle und Pareto-Diagramm | Vertrieb erstellt ohne Modellrechte eine Raumbelegung mit Angebot; Studie mit 100 Varianten < 2 min | ap-06, ap-11, ap-23 |
| ap-36-direkt-skelett | nach Beta | Direktes Bearbeiten von Flächen (auch an STEP), Skelett mit eingefrorenen Verknüpfungen, Ersetzen mit Umhängen | Lieferanten-STEP ohne Neumodellieren angepasst; Skelettänderung erreicht 20 Teile, eingefrorene erst nach Bestätigung | ap-06, ap-12, ap-13b |
| ap-21-import-ifc-dxf | nach Beta | Import von Räumen aus IFC und Grundrissen aus DXF | 3 Architekturmodelle ohne Nacharbeit übernommen | ap-09 |
| ap-22-moebel-gltf | nach Beta | Möbelbibliothek, glTF-Import und -Export | 20 Möbel mit Absorptionsfläche; Szene als glTF exportiert | ap-14 |
| ap-33b-aenderungswesen | nach Beta | Stückliste mit Verwendungsnachweis, Änderungsantrag und -auftrag, Austauschformat | Änderungsauftrag erzeugt Revisionen von drei abhängigen Items gemeinsam | ap-33a |
| ap-37b-ordnung-ausbau | nach Beta | Parameterbedingungen, semantische Suche lokal, Sammlungen, Entscheidungsprotokoll, Hygiene | Doppelteil-Hinweis findet 9 von 10 Testfällen | ap-37a |
| ap-34-plm-erp-schnittstelle | nach Beta | API aus dem Befehlsregister, Ereignisse mit Outbox, Nummernkreis-Plugin, Beispielanbindung an ein selbst gebautes PLM/ERP | Externes System empfängt Freigabe und Stückliste und vergibt Sachnummern, ohne Änderung am Kern | ap-27, ap-33b |
| ap-38-lernschleife | nach Beta | Erfahrungsspeicher, Versuche mit Prüfern, LoRA-Adapter aus geprüften Erfolgen, geheime Prüfaufgaben, Regressionsschranke | Lokales 8B-Modell mit Adapter löst ≥ 20 Prozentpunkte mehr geheime Aufgaben, ohne Rückschritt in einer Kategorie | ap-15 |
| ap-28-hosting | nach Beta | Gehosteter Dienst mit Organisationen | Erste externe Organisation | ap-16 |
| ap-29-webxr | nach Beta | Begehung des Raums in Originalgröße, mit Anwesenheit und Kommentaren | Review-Sitzung mit 3 Personen in XR | ap-14 |
| ap-30-akustik-geometrisch | nach Beta | Spiegelquellen bzw. Strahlverfolgung, Auralisation (hörbar machen) | Abweichung zu Messung in 3 Räumen dokumentiert | ap-11 |
| ap-31-fertigung | nach Beta | Fertigungsregeln (Fräsen, 3D-Druck, Blech), STEP mit PMI, Zeichnungen | Absorber-Bauteil fertigungsgerecht exportiert | ap-12 |
| ap-32-zweiter-kernel | nach Beta | Spezialisierter Kernel (implizite Modelle, Gitter, z. B. für Absorberstrukturen) | Gitterabsorber als 3MF exportiert | ap-06 |

### Entwicklung mit Agenten

Agenten schreiben den Code, Menschen entscheiden, was gebaut wird und ob es gut genug ist. Jedes Arbeitspaket durchläuft dieselbe Pipeline:

1. **Spec:** Das Kernteam schreibt eine Spec mit Ziel, Schnittstellen, Abnahmekriterien und Testfällen (bei UI zusätzlich Prototyp und Referenz-Screenshots).
2. **Umsetzung:** Ein Agent (Claude Code, OpenCode oder Pi) arbeitet in einem eigenen Worktree; mit dem Pro-Abo laufen 2, mit Max 4–6 Agenten parallel auf unabhängigen Paketen.
3. **Automatische Prüfung:** CI mit Unit-, Golden-Geometrie-, Identitäts- und visuellen Regressionstests plus Eval-Suite.
4. **Unabhängiges Review:** Ein zweiter Agent ohne Kenntnis der Umsetzung prüft gegen die Spec.
5. **Menschliche Abnahme:** Review und Merge durch das Kernteam; UI-Pakete zusätzlich im Test mit Konstrukteuren.

**Menschliches Kernteam: zwei Personen**

| Rolle | Verantwortung |
| --- | --- |
| Produkt, Architektur, Datenmodell | ADRs, Specs, Freigaben, Review von Kern und Server, Agenten-Steuerung |
| UX und Konstruktion | Prototypen, Design-Tokens, Usability-Tests, Regeln, Referenzteile, Abnahme jeder UI-Änderung |

Beide haben keine Erfahrung mit Rust und Elixir; den Code schreiben und prüfen ausschließlich Agenten. Menschen prüfen Verhalten (Tests, Demos) und die Erklärung „In einfachen Worten“ im PR. Punktuell extern, wenn die Agenten festhängen: Geometrie (OCCT), Lizenzrecht vor dem ersten Release.

### Fokus bis zur Beta

- Bis zur Beta in vier Meilensteinen (ADR-059): M0 Klären, M1 Werkbank für das erste echte Angebot, M2 Zusammen, M3 Beta mit KI, Textprojektion, Regeln, Knoten-Ansicht und öffentlicher Fachpaket-API.
- Nach der Beta: Knoten-Editor zum Bearbeiten, Apps und Studien, direktes Bearbeiten und Skelett, IFC/DXF, Möbel aus glTF, Änderungswesen, PLM/ERP, Lernschleife, gehosteter Dienst, WebXR, geometrische Akustik, Fertigung, zweiter Kernel. Im Ideenspeicher (`docs/ideen/`): unter anderem 3D-gedruckte, auf den Raum optimierte Resonator-Absorber.
- Prinzip: Das Datenmodell zuerst und richtig. Alles andere lässt sich später verbessern, ein falsches Datenmodell nicht.

## Entwicklungsumgebung und Agenten-Setup

Zwei Menschen steuern, viele Agenten bauen. Das funktioniert nur, wenn das Ziel vollständig im Repository steht und die Agenten es nicht verschieben können: Specs, Abnahmetests und ADRs sind der Vertrag, alles andere ist Umsetzung.

**Ein Repository, vier Sprachen.** Jeder Bereich hat eigene Regeln in `docs/rules/`, die Agenten nur laden, wenn sie dort Dateien ändern. Vor dem Abschluss laufen nur die Tests der angefassten Bereiche.

| Pfad | Inhalt | Prüfen | Regeln |
| --- | --- | --- | --- |
| `crates/` | Rust-Kern | `cargo fmt`, `clippy`, `cargo test`, `cargo deny` | `kern.md` |
| `server/` | Elixir-Server mit MCP | `mix format`, `mix compile --warnings-as-errors`, `mix test` | `server.md`, `mcp.md` |
| `client/` | Web- und Tauri-App | ESLint, Vitest, Referenz-Screenshots | `client.md` |
| `worker/`, `parts/` | Geometrie-Worker, Beispiele | ruff, pytest, Golden-Tests | `geometrie.md` |
| `sdk/`, `format/` | SDKs, offene Formatspezifikation (Apache-2.0) | Schema-Validierung | – |

Abnahmetests sind immer pytest-Tests unter `tests/acceptance/<change-id>/`; sie dürfen `cargo`, `mix` und `npm` aufrufen. Damit bleibt der Vertrag für alle Sprachen gleich, und die Nachtschicht muss nur einen Testbefehl kennen.

**Wie die Agenten das Ziel kennen**

| Ebene | Datei | Zweck | Wer ändert |
| --- | --- | --- | --- |
| Vision und Regeln | `AGENTS.md` (alle Werkzeuge), `CLAUDE.md` importiert sie; `docs/rules/` je Bereich | Kurzfassung, Architekturregeln, Konventionen, Token-Regeln | Kernteam |
| Leitplanken | `docs/adr/` | 58 Architekturentscheidungen; Begriffe im Glossar docs/glossar.md | Kernteam |
| Auftrag | OpenSpec-Change `openspec/changes/<id>/` (proposal, design, specs, tasks) | Spec-driven: Requirements mit messbaren Scenarios | Agent auf Branch `spec/<id>`, Freigabe durch Kernteam |
| Freigabe | `openspec/queue.yaml` | Reihenfolge, Phase, Modell, Nachtfreigabe | Kernteam |
| Vertrag | `tests/acceptance/<id>/`, `tests/golden/`, `tests/ui-reference/` | Abnahmetests aus den Scenarios | Agent auf Branch `tests/<id>`, Kernteam merged |
| Fortschritt | Tasks in `tasks.md`, GitHub-Meilensteine G1–G4 | Messbarer Stand je Gate | Agenten haken ab, Kernteam archiviert |

**Leitplanken im Repository**

- Der Branch bestimmt, was ein Agent schreiben darf: `spec/<id>` nur den Change, `tests/<id>` nur Abnahmetests, `change/<id>` Produktcode und Häkchen in `tasks.md`. ADRs, Specs, Freigaben und Werkzeug-Konfiguration ändert nur das Kernteam.
- Dieselbe Regel (`tools/guard.py`) greift in jedem Werkzeug: als Hook in Claude Code, als Extension in Pi, als Berechtigungen in OpenCode, beim Commit per Git-Hook und im Pull Request per CI.
- Nach jeder Dateiänderung laufen Formatierer und Linter, vor Abschluss einer Aufgabe die betroffenen Tests (Claude-Hooks).
- `main` ist geschützt; Merge nur per Pull Request mit grüner CI und Freigabe durch das Kernteam. Reviews durch Claude laufen auf Label `review` über das Abo.
- Unbeaufsichtigt: eine Claude-Code-Routine in der Cloud nimmt werktags nachts genau einen freigegebenen Schritt aus der Warteschlange und öffnet einen PR – ohne Zusatzkosten, nur aus dem Abo-Kontingent.

**Agenten-Rollen** (`.claude/agents/`)

| Rolle | Darf | Darf nicht |
| --- | --- | --- |
| Spec-Autor | Spec-Entwürfe aus Konzept und ADRs vorschlagen | Specs freigeben |
| Test-Autor | Abnahmetests zu einer freigegebenen Spec schreiben | Produktivcode ändern |
| Implementierer | Code im eigenen Worktree schreiben, bis die Abnahmetests grün sind | Specs, ADRs, Abnahmetests ändern |
| Reviewer | Diff gegen Spec, ADRs und `REVIEW.md` prüfen (nur lesend) | Code ändern |
| UI-Prüfer | Screenshots gegen Referenz und Gestaltungsregeln prüfen | Code ändern |
| Geometrie-Spezialist | OCCT-, Identitäts- und Druckbarkeitsfragen klären, Spikes umsetzen | Specs ändern |
| Kern-Spezialist | Datenmodell, Automerge, Bindungen (Rustler, WASM, PyO3), Elixir-Server; Spikes umsetzen | Specs ändern |

**Arbeitsrhythmus zu zweit**

- Rollen: eine Person für Produkt, Architektur und Specs; eine für UX und Konstruktion. Bei fehlender Designerfahrung punktuell externe Unterstützung für Prototypen.
- Morgens: Merges der Nacht prüfen, Specs freigeben, Agenten starten. Tagsüber: Rückfragen beantworten, UI-Tests mit Konstrukteuren. Abends: Reviews.
- Start mit dem Pro-Abo: Sonnet als Standard, Opus nur für Spec-Entwürfe und Geometrie, höchstens 2 parallele Subagenten, ein Nachtlauf. Mit Max 5x auf 4–6 Agenten und zwei Nachtläufe erhöhen. Der Engpass ist das Review, nicht die Agentenzahl.

**Werkzeuge:** VS Code mit Claude-Extension, Claude Desktop (Linux) und Claude Code CLI laufen über das Claude-Abo; OpenCode (1.x und 2.0 Beta) und Pi über einen eigenen API-Key mit Ausgabelimit. Alle nutzen `AGENTS.md`, OpenSpec und denselben Vertragsschutz. Das Starter-Repository mit dieser Konfiguration liegt als ZIP bei.

## Roadmap und Meilensteine

Die Roadmap wird über Meilensteine und Gates gesteuert, nicht über Termine (ADR-059). Die Monatsangaben sind Richtwerte bei etwa zwei Nachtläufen je Change und Reviews mehrmals pro Woche; das Tempo bestimmen Nachtschicht und menschliche Prüfzeit. Kritischer Pfad: ap-05 → ap-40 → ap-06, ap-07a und ap-08a → ap-08b → Fachpaket Raum (ap-09 bis ap-13a) → ap-14, ap-18, ap-19. Architektur-Grundlagen (Befehlsregister, Fachpaket-API, Einheiten, CRDT) kommen vollständig in M1; verschoben werden nur Funktionen.

&#91;embedded content: Roadmap · vier Meilensteine bis zur Beta, vier Gates\]

| Gate | Richtwert | Kriterium |
| --- | --- | --- |
| G1 Architektur trägt (Ende M0) | Monat 1–2 | ap-01 bis ap-04, Identitäts-Spike ap-39 und UX-Prototyp ap-41 mit Go (oder angepasste ADRs); Nachhallzeit korrekt und schnell; Gerüst in vier Sprachen grün |
| G2 Erstes Angebot (Ende M1) | Monat 3–4 | Die Firma erstellt allein im Browser, selbst gehostet, ein echtes Angebot: Raum mit Absorbern aus dem Katalog, Nachhallzeit live, Fotomodus-Bild, Bericht mit Mengen, Kosten und CO₂ |
| G3 Öffentliche Beta (Ende M3) | Monat 6 | Mehrere Personen live und offline, Entwürfe, Freigabe mit Revisionen, Suche; KI über MCP mit lokalem und Cloud-Modell; Textprojektion, Regeln, Knoten-Ansicht, öffentliche Fachpaket-API; die Firma nutzt CEE für alle Angebote |
| G4 Ökosystem | ab Monat 7 | Knoten-Editor, Apps und Studien, IFC und DXF, Möbel aus glTF, Änderungswesen, PLM/ERP-Schnittstelle, Lernschleife, Hosting, WebXR, geometrische Akustik, Fertigung, externe Beiträge |

## Risiken und Gegenmaßnahmen

Die größten Risiken liegen jetzt im Datenmodell (Größe und Merge-Verhalten des CRDT), in der persistenten Identität und in der Breite des Stacks für zwei Personen. Die ersten beiden klären die Spikes in M0, das dritte begrenzen klare Schichtgrenzen und Regeln je Sprache.

| ID | Risiko | Auswirkung | Gegenmaßnahme |
| --- | --- | --- | --- |
| R-10 | Persistente Identität bricht bei Topologie-Änderungen (Topological Naming Problem), z. B. wenn eine Fläche durch eine neue Tasche geteilt wird | Sehr hoch | Spike ap-39 in M0; drei Stufen nach ADR-016; Mehrdeutigkeit führt zur Nachfrage statt zur Vermutung; Stresstests in der CI; Veröffentlichung bevorzugt auf Features und Bezugselemente statt auf abgeleitete Flächen |
| R-15 | Oberfläche reagiert zu träge, weil OCCT-Rebuilds Sekunden dauern | Hoch | Inkrementeller Rebuild und Näherungsvorschau (ADR-025); Spike mit Zeitmessung an Referenzteilen; Performance-Budgets als Pflichttests |
| R-16 | Gleichzeitige Änderungen von Menschen und Agenten ergeben technisch gültige, fachlich widersprüchliche Modelle | Hoch | Semantische Konfliktprüfung nach jedem Merge (ADR-033); Agenten arbeiten auf eigenem Zweig und kommen als Änderungssatz zurück; Regeln laufen nach jeder Übernahme |
| R-13 | UI erreicht mit Agenten allein nicht die geforderte Qualität | Hoch | UX-Designer im Kernteam; Prototyp vor Code; Referenz-Screenshots und visuelle Regressionstests als Spec; Usability-Runde je Gate |
| R-14 | Review-Engpass im Kernteam oder schwer wartbarer Agenten-Code | Hoch | Kleine Pakete mit klaren Specs; unabhängiger Review-Agent vor menschlicher Abnahme; Architekturregeln als Linter; Pflicht-Tests je Merge |
| R-01 | OCCT scheitert an komplexen Verrundungen oder Booleschen Operationen | Hoch | Fehler strukturiert an den Agenten zurückgeben; Regeln zur Reihenfolge (Verrundungen zuletzt); Heilungsfunktionen; Testkorpus schwieriger Fälle |
| R-02 | Blech-Abwicklung ungenau gegenüber kommerziellem CAD (erst nach der Beta) | Hoch | Spike vor einem Fachpaket Blech; Referenzteile aus Fachbereich; Fallback: Abwicklung nur für einfache Biegungen |
| R-03 | KI erzeugt plausible, aber fachlich falsche Geometrie | Hoch | Ausführbare Regeln statt Prompt-Text; Änderungskarten mit Vorschau; verpflichtende menschliche Freigabe; Eval-Suite |
| R-11 | Semantische PMI in STEP AP242 wird von OCCT oder Ziel-CAD-Systemen nur teilweise unterstützt | Mittel | Früher Import-Test; PMI zusätzlich als JSON und auf der Zeichnung; Beitrag zu OCCT prüfen |
| R-12 | Konstrukteure veröffentlichen zu viel oder zu wenig | Mittel | Vorschläge durch den KI-Assistenten aus den Anforderungen; Warnung, wenn Zeichnung oder Baugruppe ein internes Element braucht; Leitfaden im Pilot |
| R-04 | Abhängigkeit von kleinen Upstream-Projekten (build123d, ocp\_tessellate) | Mittel | Früher Kontakt und Beiträge; Versionen pinnen; Fork als Notfalloption dokumentieren |
| R-05 | Konstrukteure finden Knoten und Text zu technisch | Mittel | Bedienung primär über Arbeitsfläche, Featurebaum und KI-Assistent; Code bleibt optional sichtbar; Pilot mit Feedbackschleifen |
| R-06 | STEP-Import im Ziel-CAD verliert Namen, Farben oder Struktur | Mittel | Import-Testmatrix in ap-21 und ap-33; AP242 mit Validierungsdateien |
| R-08 | Desktop-App mit Python-Worker und OCCT ist groß und schwer zu verteilen | Mittel | Worker als eingebettete Laufzeit im Tauri-Paket; vorgebaute Pakete je Plattform; im Browser rechnet der Server |
| R-09 | Kontextüberlauf bei großen Modellen | Niedrig | Kompakte Tool-Antworten, Topologie-Zusammenfassungen, Bilder statt Rohdaten |
| R-17 | Automerge wird bei großen Projekten zu langsam oder zu groß | Sehr hoch | Spike ap-01 mit 10.000 und 100.000 Elementen; Rückfall: ein Dokument je Bauteil statt je Projekt; Historie komprimieren |
| R-18 | Vier Sprachen (Rust, Elixir, TypeScript, Python) überfordern zwei Personen im Review | Hoch | Datenmodell nur im Rust-Kern; dünne Schichten in Elixir und TypeScript; strenge Prüfwerkzeuge (Clippy, Dialyzer, Credo), Property-Tests; Abnahmetests einheitlich in pytest; PR-Erklärung in einfachen Worten |
| R-19 | Agenten schreiben Elixir und Rust-Bindungen weniger sicher als Python und TypeScript, und niemand im Team kann diesen Code selbst prüfen | Mittel | Kern-Spezialist mit Opus für diese Bereiche; strenge Compiler-Optionen (Warnungen als Fehler, Clippy, kein unsafe); kleine Pakete |
| R-20 | Unterschiede der Web-Engines in Tauri (WebKitGTK, WebView2, WKWebView) bei WebGL und Leistung | Mittel | Spike ap-04 auf allen drei Systemen; UI-Tests je Engine in der CI; Rückfall Linux: Browser statt Desktop-App |
| R-21 | Ein Unternehmen spaltet den Kern ab oder betreibt ihn verändert als Dienst | Mittel | Plugin-SDK statt Fork-Zwang; offene Roadmap und RFCs; geschützte Marke; bester gehosteter Dienst; MPL sichert Rückfluss bei Weitergabe |
| R-22 | Lokale Modelle sind zu schwach für den Assistenten und die MCP-Werkzeuge | Hoch | Wenige, einfache Tools; Eval-Suite mit lokalem Modell als Pflicht; Funktionen in Stufen (lokal: erklären, prüfen, kleine Änderungen; Cloud: ganze Bauteile) |
| R-23 | Autonome Agenten liefern mehr Code, als zwei Menschen mit wenig Zeit prüfen können | Hoch | Höchstens ein offener Agenten-PR je Person; unabhängiger Review-Agent vorab; Abnahmetests als harter Vertrag; Nachtschicht pausiert, solange Reviews offen sind |
| R-24 | Sabine und Eyring weichen in stark gedämpften oder ungleichmäßigen Räumen von Messungen ab | Mittel | Annahmen im Ergebnis anzeigen; Vergleich mit Messungen der Firma; geometrische Verfahren in ap-30 |
| R-25 | Materialdaten lückenhaft oder ohne Quelle (α, Preise, CO₂) | Hoch | Pflichtfelder Einheit und Quelle; Schätzwerte sichtbar markiert; Firmendaten als gepflegte Bibliothek |
| R-26 | Fotomodus zu langsam auf Büro-Laptops ohne starke GPU | Mittel | Spike ap-04 auf schwacher Hardware; progressive Vorschau; Bild auf dem eigenen Server rechnen lassen |
| R-27 | Zielwerte aus Normen (DIN 18041) falsch übernommen oder urheberrechtlich problematisch | Mittel | Nur Formeln und Werte, keine Normtexte; Regelpaket von der Firma geprüft und freigegeben |

## Offene Punkte und nächste Schritte

- [ ] Marke CEE absichern: Recherche bei DPMA, EUIPO und WIPO (Klassen 9 und 42), Domain und GitHub-Organisation sichern; npm-Paket „cee“ ist vergeben, daher Scope verwenden
- [x] Erfahrung mit Rust und Elixir: keine, alles KI. Abgesichert durch Credo, Dialyzer, Clippy, Property-Tests und den PR-Abschnitt „In einfachen Worten“. 3D-Druck kommt vor Blech.
- [ ] Spike ap-01 starten (Agent kern-specialist) und Ergebnis im ADR-Workshop bewerten
- [ ] Klickbare Prototypen für Arbeitsfläche, Knoten-Editor und Zusammenarbeit erstellen und mit 5 Konstrukteuren testen
- [ ] Klären, wer veröffentlichte Elemente nutzt (CAM, Messtechnik, Simulation, PLM, Lieferanten) und welche Exportformate diese je Elementtyp brauchen
- [x] Freigabeprozess festgelegt (ADR-047): Selbstfreigabe an, solange höchstens zwei Personen freigeben dürfen, danach Vier-Augen-Prinzip, Agenten geben nie frei
- [x] Rechte und Mandanten festgelegt (ADR-055): Organisation, Bereich, Projekt; wenige Rollen, Gäste, Dienstkonten für Agenten; Anmeldung über OIDC
- [ ] Lizenz von PlaneGCS im Browser klären (ADR-027), vor ap-12
- [ ] Eigene GitHub-Identität für Agenten (Bot-Konto oder GitHub App), damit Schutzregeln und Reviews Menschen und Agenten unterscheiden – zurückgestellt bis es Produktcode gibt (spätestens mit ap-05); dann zuerst die Nachtschicht als GitHub-Action, später eigene GitHub-App
- [ ] Grundtypliste und Beispielteil halter.py auf die Form des Element-Graphen umstellen (Script-Element mit deklarierten Ein- und Ausgängen)
- [ ] Governance: Rolle der Community bei Roadmap und RFCs; später Stiftung oder Firma als Träger
- [ ] Lizenzprüfung durch Fachanwalt vor dem ersten öffentlichen Release (MPL-2.0 und Apache-2.0, DCO)
- [ ] Zeichnungsstandards (Blattformate, Schriftfeld, ISO 128/129) aus dem Fachbereich bereitstellen
- [ ] 10–15 Referenzbauteile für Eval-Suite, Identitäts-Stresstests und 3D-Druck auswählen
- [ ] Lokales Referenzmodell für Eval-Suite und Assistent auswählen (über Ollama) und Mindest-Hardware festlegen
- [ ] Kontakt mit den Maintainern von build123d, OCP und Automerge aufnehmen (Zusammenarbeit statt Fork)
- [ ] Produktdaten der Firma bereitstellen: Absorber-Varianten, gemessene α je Oktavband, Brandklassen, Preise, EPD bzw. CO₂-Werte
- [ ] Zielwerte für Raumarten (z. B. nach DIN 18041) durch die Firma prüfen lassen
- [ ] Drei Referenzräume mit gemessener Nachhallzeit vor und nach dem Einbau für Tests und Eval-Suite
- [ ] Materialmuster fotografieren als Vorlage für realistische Materialien im Rendering
- [ ] GitHub-Namen des zweiten Kollegen bestätigen; klären, ob das Repository in eine Organisation umzieht

## Quellen

- [OCP CAD Viewer for VS Code (GitHub)](https://github.com/bernhard-42/vscode-ocp-cad-viewer)
- [ocp-vscode, Lizenz Apache-2.0 (DepScope)](https://depscope.dev/pkg/pypi/ocp-vscode)
- [ocp\_viewer, gemeinsame Viewer-Komponenten (PyPI)](https://pypi.org/project/ocp-viewer)
- [planegcs, Python-Bindings für PlaneGCS, LGPL-2.1-or-later](https://planegcs.readthedocs.io)
- [@salusoft89/planegcs, PlaneGCS als WebAssembly (GitHub)](https://github.com/Salusoft89/planegcs)
- [Automerge 3.0](https://automerge.org/blog/automerge-3/)
- [y\_ex – Yjs-Port für Elixir (Hex)](https://readme.hex.pm/y_ex/0.8.0)
- [gleam\_automerge – automerge-rs über Rustler-NIF (Hex)](https://hex.pm/packages/gleam_automerge)
- [Rustler – Rust-NIFs für Erlang/Elixir](https://docs.rs/rustler)
- [ElectricSQL – Local-first SQL with Elixir (ElixirConf EU)](https://www.elixirconf.eu/archives/lisbon_2024/talks/electricsql-local-first-sql-with-elixir/)
- [Fornjot, Rust-B-Rep-Kernel (GitHub)](https://github.com/hannobraun/fornjot)
- [opencascade-rs, Rust-Bindings für OpenCascade](https://gittrend.io/repo/bschwind/opencascade-rs)

Angaben zu OCCT, build123d und CalculiX beruhen auf allgemeinem Kenntnisstand und sind im Kick-off gegen die aktuellen Projektseiten zu prüfen.
