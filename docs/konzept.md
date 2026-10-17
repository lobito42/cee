<!-- Export des Konzept-Dokuments (Claude Docs). Quelle: https://claude.ai/code/artifact/3474113f-d8a6-4a50-90bc-600134300c07
     Nicht von Hand ändern: Änderungen im Dokument vornehmen und neu exportieren. -->

# CEE – Collaborative Engineering Environment: Konzept

Stand: 2026-10-17

## Zusammenfassung

Wir bauen eine offene, kollaborative Plattform für Produktdefinition: CEE, das Collaborative Engineering Environment. Das Logo ist ein C mit einem freistehenden Strich in der Mitte, angelehnt an das Zeichen „ist Element von“. Ein Projekt ist ein **Graph aus Elementen**, in dem ein Achsenursprung genauso behandelt wird wie ein ganzes Bauteil. Online sehen alle denselben Stand wie in Figma, offline geht es weiter wie bei Git. Bearbeitet wird in 3D, im Knoten-Editor oder als Text, von Menschen und KI-Agenten gemeinsam.

**Rahmen:** CEE ist ein ehrgeiziges Testprojekt, das von Anfang an so gebaut wird, dass es als Open-Source-Projekt veröffentlicht werden kann. Zielgruppe sind Einzelpersonen und kleine Projektgruppen, privat oder in kleinen Firmen. Erster Nutzer ist eine kleine Firma, die Schallabsorber entwickelt: Räume gestalten, Absorber platzieren, Nachhallzeit, Kosten und CO₂ berechnen und das Ergebnis fotorealistisch zeigen. Die menschliche Zeit ist knapp; ein ausdrücklicher Zweck ist, autonomes Arbeiten von KI-Agenten zu erproben. Offenheit gegenüber KI-Modellen, lokale Modelle sowie selbst gehostete Daten und Modelle gelten ab dem ersten Tag (ADR-037).

**Fünf Ziele und woran wir sie messen**

| Ziel | Was das heißt | Messlatte |
| --- | --- | --- |
| 1 Benutzerfreundlich, mächtig, erweiterbar | Bedienkonzept nach Figma mit fünf Werkzeugen; Plugins für eigene Elementtypen, Knoten und Regeln | 4 von 5 Konstrukteuren lösen die Kernabläufe ohne Einweisung; erstes Fremd-Plugin ohne Änderung am Kern |
| 2 Open Source mit Community statt Forks | Kern MPL-2.0, SDK und Format Apache-2.0; offene RFCs über OpenSpec; geschützte Marke | Beiträge von außen in jedem Release; keine gepflegte Abspaltung |
| 3 Kollaborativ | Live: alle sehen dasselbe, mit Anwesenheit und Kommentaren am Element. Offline: Zweige, Änderungsanfragen, Zusammenführen | Änderung bei allen in < 200 ms; zwei Zweige mit je 500 Änderungen ohne Datenverlust zusammengeführt |
| 4 KI-optimiert | Features as Code (Textprojektion), Visual Programming (Knoten-Editor), MCP für jedes Modell; lokale und selbst gehostete Modelle von Anfang an | Ein Agent baut ein Referenzteil über MCP ohne menschlichen Eingriff, mit einem Cloud- und einem lokalen Modell |
| 5 Immersiv (optional) | Review in Originalgröße über WebXR | Phase 3 |
| 6 Testfeld für autonome Entwicklung | Agenten setzen freigegebene Changes unbeaufsichtigt um; Menschen schreiben Ziele, prüfen und entscheiden | Anteil der Changes, die ohne Nacharbeit gemergt werden; menschliche Minuten je gemergtem Change, je Gate gemessen |

**Das Fundament ist das atomare Datenmodell.** Jedes Element – Punkt, Achse, Skizze, Feature, Fläche, Körper, Bauteil, Baugruppe, Maß, Zeichnungsblatt, Regel, Anforderung – hat dieselbe Form, eine stabile ID und eine eigene Historie. Deshalb lässt sich alles gleich adressieren, veröffentlichen, kommentieren, versionieren und zusammenführen.

**Ziel bis zur öffentlichen Beta:** Ein kleines Team modelliert einen Raum mit Grundriss, Wänden, Decke, Boden, Fenstern, Türen und Möbeln, platziert Schallabsorber aus dem eigenen Katalog und sieht die Nachhallzeit je Oktavband live. Materialien tragen Aussehen, Akustik, Physik, Kosten und CO₂; daraus entstehen Mengen, Kosten und ein Bericht für das Angebot, dazu ein fotorealistisches Bild. Alle arbeiten live gemeinsam oder offline, Agenten helfen über MCP – auch mit einem lokalen Modell – und alles läuft auf eigener Hardware. Das Tempo bestimmen die Agenten, nicht feste Termine; die Monatsangaben in der Roadmap sind Richtwerte.

**Nicht-Ziele bis zur Beta:** Freiformflächen in Class-A-Qualität, native Feature-Bäume in kommerziellen CAD-Systemen, PLM-Anbindung, FEM, Fertigungsregeln (Fräsen, 3D-Druck, Blech, Spritzguss), vollständiges BIM (Statik, Haustechnik, Bauantrag), ein eigener Geometrie-Kernel, Modellieren in XR, eine VS-Code-Integration, ein eigener KI-Dienst mit Abrechnung, Funktionen für Konzerne (PLM, feingranulare Rechteverwaltung).

## Erster Anwendungsfall: Raumakustik mit Schallabsorbern

Die Firma braucht einen durchgängigen Ablauf vom leeren Raum bis zum Angebot, ohne Wechsel zwischen CAD, Akustik-Tabelle und Rendering-Programm (ADR-038).

1. **Raum anlegen:** Grundriss zeichnen oder aus IFC bzw. DXF übernehmen; Wände, Boden, Decke, Fenster und Türen entstehen als Elemente mit Material.
2. **Einrichten:** Möbel aus der Bibliothek oder als glTF; sie zählen mit ihrer äquivalenten Absorptionsfläche.
3. **Absorber platzieren:** Wandpaneele, Deckensegel, Baffeln oder Stellwände aus dem eigenen Katalog; eigene Formen per Skizze und Extrusion.
4. **Wirkung sehen:** Nachhallzeit je Oktavband nach Sabine und Eyring, live beim Verschieben, gegen ein Zielband (ADR-041).
5. **Zeigen und anbieten:** Echtzeit-Ansicht und Fotomodus (ADR-040); Mengen, Kosten, Gewicht und CO₂ aus Geometrie und Material; PDF-Bericht mit vorher/nachher.

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

Die Lösung muss alle Fertigungsverfahren abdecken, alle gängigen CAD-Systeme bedienen und vollständig Open Source sein. Daraus folgen ein neutrales Austauschformat (STEP), ein lizenzfreundlicher Kernel und ein modular erweiterbares Regelwerk.

**Funktionale Anforderungen**

| ID | Anforderung | Priorität |
| --- | --- | --- |
| F-01 | Modell als Element-Graph bearbeiten und live in Browser und Desktop-App anzeigen | Muss |
| F-02 | Claude Code steuert Bauen, Messen, Rendern, Prüfen und Exportieren über MCP-Tools | Muss |
| F-03 | Anforderungen strukturiert erfassen (Bauraum, Lasten, Schnittstellen, Werkstoff, Verfahren) | Muss |
| F-04 | Konstruktionsrichtlinien als ausführbare Regeln je Fertigungsverfahren | Muss |
| F-05 | Export STEP AP242, STL/3MF; Zeichnungsansichten als SVG/DXF | Muss |
| F-06 | Auswahl von Flächen/Kanten im Viewer wird als Kontext an Claude übergeben | Muss |
| F-07 | Parametrische Bibliothek geprüfter Features und Normteile | Muss |
| F-08 | Blech: Abwicklung mit K-Faktor, Biegeradien, Freischnitte (nach der Beta) | Soll |
| F-09 | Baugruppen mit Verbindungen (Joints) und Kollisionsprüfung | Soll |
| F-10 | FEM-Vorabschätzung (linear-statisch) | Kann |
| F-11 | Import bestehender STEP-Teile als Referenz/Schnittstelle | Soll |
| F-12 | Stabile Identität für jedes Element (Parameter, Punkt, Achse, Ebene, Kante, Fläche, Körper, Skizze, Annotation, Zeichnungsblatt, Instanz) über Modelländerungen hinweg | Muss |
| F-13 | Konstrukteur entscheidet per Klick oder Code, welche Elemente veröffentlicht sind; alles andere gilt als Hilfsfeature; unabhängig von Sichtbarkeit | Muss |
| F-14 | Jedes veröffentlichte Element einzeln exportierbar und über eine stabile Adresse referenzierbar | Muss |
| F-15 | Versionierung der Bauteil-Schnittstelle mit semantischem Diff je Element | Muss |
| F-16 | Rückverfolgung Anforderung → Element → Regelbefund → Zeichnungsblatt | Muss |
| F-17 | Semantische PMI (Maße, Toleranzen, Bezüge, Oberflächen) an Element-IDs gebunden | Muss |
| F-18 | Zeichnungsblätter als Elemente, aus dem Modell abgeleitet, mit eigener Revision und an Element-IDs gebunden | Muss |
| F-19 | Parametrische 2D-Skizzen mit Zwangsbedingungen und Maßen auf Flächen und Ebenen; interaktiv zeichnen, per Text beschreiben oder aus Handskizze, Foto oder DXF ableiten | Muss |
| F-20 | Gleichzeitiges Arbeiten am selben Projekt: Änderungen, Auswahl und Cursor der anderen live sichtbar; Kommentare an jedem Element | Muss |
| F-21 | Offline weiterarbeiten; Zweige, Änderungsanfragen, Review und Zusammenführen wie bei Git; semantische Konflikte als Befund | Muss |
| F-22 | Drei gleichwertige Ansichten desselben Graphen: 3D, Knoten-Editor, Text | Muss |
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
- **Drei Ansichten, eine Wahrheit:** 3D-Arbeitsfläche, Knoten-Editor (Visual Programming wie Synera) und Textprojektion zeigen denselben Graphen; eine Änderung in einer Ansicht ist sofort in allen sichtbar (ADR-035). Python mit build123d bleibt als Elementtyp `script` mit deklarierten Ein- und Ausgängen.
- **Rezept statt Geometrie:** Gespeichert und synchronisiert wird nur der Graph als CRDT-Dokument (Automerge). Geometrie ist ein Cache, berechnet aus Element, Eingängen und Kernel-Version (ADR-032, ADR-033).

Die Textprojektion ist deterministisch und verlustfrei: eine Zeile je Parameter, sortiert nach Element-ID. Eine geänderte Wandstärke ist im Review genau eine Zeile. Damit lassen sich Projekte auch in normale Git-Repositories exportieren und wieder importieren.

**Komponenten wie in Figma (ADR-043).** Jede Auswahl lässt sich zur wiederverwendbaren, konfigurierbaren Vorlage machen.

| Figma | CEE | Beispiel |
| --- | --- | --- |
| Main Component | Komponente: Untergraph mit freigegebenen Parametern | Deckensegel mit Breite, Länge, Dicke, Material, Abhängung |
| Instance | Instanz: Verweis plus Abweichungen, keine Kopie | 12 Segel im Raum, eines 900 statt 1200 mm breit |
| Overrides | Überschreibungen bleiben bei Änderungen der Vorlage erhalten | Farbe eines Segels geändert, neue Kantenform kommt trotzdem an |
| Variants | Varianten: benannte Parametersätze | Größe S/M/L, Montage Wand/Decke/abgehängt |
| Nested Components | Verschachtelung | Raumvorlage mit Wänden, Tisch und Absorber-Instanzen |
| Team Library | Bibliothek: veröffentlicht und versioniert | Produktkatalog der Firma |
| Library Updates | Aktualisierung mit Vorschau der Wirkung | neue α-Messwerte, erst nach Zustimmung übernommen |
| Detach | Lösen | Sonderanfertigung für einen Kunden |

Anders als in Figma haben Komponenten echte Parameter mit Formeln und Bedingungen und liefern berechnete Ausgänge – äquivalente Absorptionsfläche je Band, Gewicht, Preis, CO₂. Ändert sich eine Vorlage, rechnet die Nachhallzeit jedes betroffenen Raums neu.

Ob diese Form trägt und schnell genug ist, klärt der erste Spike (`ap-01-spike-datenmodell`): 10.000 Elemente in ≤ 200 ms laden, eine Änderung in ≤ 5 ms, zwei Zweige mit je 500 Änderungen in ≤ 500 ms zusammenführen.

## Publikations- und Identitätsmodell

Jedes Element des Modells erhält eine stabile Identität, vom Punkt bis zum Zeichnungsblatt. Der Konstrukteur entscheidet per Klick, welche Elemente veröffentlicht werden; veröffentlicht heißt adressierbar, einzeln exportierbar, versioniert und rückverfolgbar. Sichtbarkeit (Hide/Show) ist davon vollständig getrennt und reine Ansichtssache.

**Drei Zustände statt Hide/Show**

| Zustand | Bedeutung | Entscheidet | Folgen |
| --- | --- | --- | --- |
| Intern | Hilfsfeature: Hilfsebene, Skizze, Zwischenkörper | Standard für alles | Hat eine ID, wird nicht exportiert, darf sich frei ändern |
| Veröffentlicht | Teil der Bauteil-Schnittstelle | Konstrukteur; Claude darf nur vorschlagen | Adressierbar, einzeln exportierbar, im Manifest versioniert; jede Änderung erscheint als Diff |
| Freigegeben | Veröffentlicht und in einer Revision eingefroren | Konstrukteur oder Prüfer | Unveränderlich; jede Änderung erzeugt eine neue Revision |

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
2. Alternativ in der Text- oder Knotenansicht oder per Auftrag an Claude; Claude schlägt Publikationen auch aus den Schnittstellen der `requirements.yaml` vor, der Konstrukteur bestätigt.
3. Das Publikations-Panel listet alle veröffentlichten Elemente mit Status: unverändert, geometrisch geändert oder Referenz verloren.
4. Nach jeder Änderung zeigt ein semantischer Diff die Wirkung auf die Schnittstelle, z. B. „Montageflaeche\_A um 2,0 mm in +Z verschoben; betrifft Blatt 1 und Baugruppe B-100“.
5. Geht eine Referenz verloren, schlägt das System den wahrscheinlichsten Nachfolger vor; der Konstrukteur bestätigt mit einem Klick. Geraten wird nie.

**Persistente Identität**

Jedes Element hat seine ID ab der Erzeugung, auch Skizzen und Features; Claude vergibt sprechende Namen, der Konstrukteur kann sie ändern, ohne dass sich die ID ändert. Flächen und Kanten entstehen erst bei der Berechnung: Der Worker zeichnet für jede Kernel-Operation die Topologie-Historie auf (erzeugt, verändert, gelöscht) und leitet daraus Unter-IDs ab, z. B. `tasche_1/wand/+X`. Wird ein Pfad mehrdeutig, entscheidet eine Geometrie-Signatur (Typ, Normale, Flächeninhalt, Schwerpunkt); bleibt er mehrdeutig, wird der Konstrukteur gefragt. Eine veröffentlichte Fläche wird dadurch selbst zum Element (`face-ref`) mit eigener ID.

**Manifest, Versionierung und Adressierung**

- Jede Revision hat ein Manifest mit allen veröffentlichten Elementen: ID, Name, Typ, Quell-Element, Geometrie-Hash, Anforderungs- und Zeichnungsbezüge. Es ist Teil der Textprojektion, sodass jede Änderungsanfrage die Schnittstellenänderungen zeigt.
- Die Schnittstelle wird semantisch versioniert: Element entfernt oder Typ geändert = Major, Geometrie geändert oder Element neu = Minor, nur Metadaten = Patch.
- Jedes veröffentlichte Element hat eine Adresse der Form `cee://<server>/<projekt>/<bauteil>@<version>#<name>`. Andere Bauteile, Baugruppen und Zeichnungen dürfen nur veröffentlichte Elemente referenzieren.
- Aus den Verknüpfungen entsteht automatisch eine Traceability-Matrix: Anforderung → veröffentlichtes Element → Regelbefund → Zeichnungsblatt.

**Zeichnungen als abgeleitete Artefakte**

Zeichnungsblätter sind Elemente vom Typ `sheet` und referenzieren Ansichten, Maße und PMI ausschließlich über Element-IDs. Dadurch überleben Maße Modelländerungen, und ein verwaister Bezug wird sofort gemeldet. Jedes Blatt hat eine eigene Revision und wird bei jeder Änderung neu abgeleitet.

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
| Kopfzeile | Bauteilname, Verfahren, Revision, Zweig; Avatare der Anwesenden; Agentenstatus; Freigeben und Teilen |
| Featurebaum (links) | Baumansicht des Graphen mit Elementen, veröffentlichten Elementen, Befunden und Zeichnungsblättern; Status als Symbol, Inline-Aktionen beim Überfahren, Drag & Drop, Filter statt Hide/Show; Auswahl synchron mit der Arbeitsfläche |
| Arbeitsfläche (Mitte) | Modell, Auswahl, Ziehgriffe, Befundmarkierungen, Geister-Vorschau, Eingabe direkt an der Auswahl |
| Eigenschaften (rechts in der Arbeitsfläche) | Passt sich der Auswahl an: Name, Werte, Schalter „Veröffentlicht“, Regeln, Nutzung, Anforderungen, „Claude fragen“ |
| Werkzeugleiste (unten) | Auswählen, Messen, Schnitt, Skizze, Fragen |
| Befehlssuche (Strg/Cmd+K) | Jede Funktion per Suche, Text oder Sprache; zeigt auch das Tastenkürzel |
| Verlauf (aufklappbar) | Zeitleiste der Stände mit Geometrie-Diff, Varianten-Vergleich und Zweigen |
| Ansicht wechseln (oben rechts) | 3D, Knoten oder Text für dieselbe Auswahl; geteilte Ansicht nebeneinander |
| Kommentare (am Element) | Faden an jedem Element, mit Erwähnungen; offene Fäden als Markierung am Modell |
| Bibliothek (Reiter neben dem Featurebaum) | Komponenten und Varianten zum Hineinziehen; Hinweis auf neue Versionen mit Vorschau; „Zur Komponente machen“ an jeder Auswahl |

**Gestaltungsregeln**

1. **Eine Aufgabe, ein Ort.** Was man an einem Element tut, passiert am Element oder im Eigenschaften-Panel, nie in einem eigenen Fenster.
2. **Progressive Offenlegung.** Sichtbar ist nur, was zur aktuellen Auswahl passt; Expertenparameter klappen erst auf Wunsch auf.
3. **Absicht statt Befehl.** Komplexe Operationen wie Blechlasche, Freistich oder Entformschräge werden beschrieben oder über die Befehlssuche gewählt. Claude füllt die Parameter mit sinnvollen Werten aus Regeln und Anforderungen.
4. **Direkt manipulieren.** Ziehgriffe an Flächen und Maßen, Werte im Panel überschreiben; jede Änderung ist sofort sichtbar.
5. **Letzte Aktion nachjustieren.** Nach jeder Operation bleibt ein kleines Feld mit ihren Parametern offen, bis die nächste beginnt (Idee aus Blender).
6. **Vorschau vor Übernahme.** Jede KI-Änderung kommt als Karte mit Geister-Vorschau, Begründung und Regelstatus; Annehmen oder Verwerfen.
7. **Keine Blackbox.** Der Agent zeigt seinen Fortschritt als kleine Statusanzeige, aufklappbar zu Plan, Schritten und Renderings, jederzeit unterbrechbar.
8. **Knoten und Text auf Wunsch.** Wer räumlich denkt, arbeitet in 3D; ein Klick zeigt dieselbe Auswahl als Knoten oder als Text daneben.
9. **Wenige Tastenkürzel.** Unter 15 Kürzel, alle in der Befehlssuche sichtbar; vollständig per Maus, Trackpad oder Stift bedienbar.
10. **Schnell und ruhig.** Reaktion unter 100 ms, keine modalen Dialoge, viel Weißraum, eine Akzentfarbe nur für Auswahl und KI, Hell- und Dunkelmodus.

**Skizzieren**

- **Starten:** Fläche oder Ebene anklicken, „Skizze“ wählen; die Ansicht dreht sich senkrecht darauf, das Modell tritt halbtransparent zurück.
- **Zeichnen:** Linie, Bogen, Kreis, Rechteck und Langloch mit Fanglinien wie in Figma. Bedingungen (horizontal, tangential, deckungsgleich, symmetrisch) werden beim Zeichnen erkannt und als kleine Symbole angezeigt; ein Klick entfernt sie.
- **Bemaßen:** Element anklicken, Wert tippen. Maße können Parameter oder Formeln sein (`breite / 2`).
- **Zustand auf einen Blick:** Blau unterbestimmt, Schwarz vollständig bestimmt, Rot widersprüchlich mit Hinweis auf die verursachende Bedingung.
- **Mit KI:** Beschreiben statt zeichnen („Langloch 10 × 30, mittig, 15 mm vom Rand“); „Skizze vollständig bestimmen“ ergänzt Maße nach den Bemaßungsregeln; Handskizze, Foto oder DXF ablegen und als bemaßte Skizze übernehmen.
- **Weiter zum Körper:** Nach dem Schließen schlägt die Werkzeugleiste passende nächste Schritte vor (Extrudieren, Tasche, Drehen), mit Live-Vorschau und Ziehgriff für die Tiefe.

**Typische Abläufe**

- **Neues Bauteil:** Anforderungen einfügen oder Dokument ablegen → Claude erstellt die `requirements.yaml` als Formular zur Bestätigung → Claude baut, prüft und rendert → Änderungskarte mit fertigem Teil.
- **Änderung an der Auswahl:** Fläche klicken → „Rippe mittig, 2 mm“ → Geister-Vorschau → Annehmen.
- **Befund beheben:** Befund klicken → Viewer springt zur Stelle → „Mit Claude beheben“ → Vorschlag mit Regelstatus.
- **Freigabe:** Publikations-Panel → Diff seit der letzten Revision → „Revision freigeben“ → Manifest, STEP und Zeichnungen werden eingefroren.

**Web und Desktop:** Dieselbe Oberfläche läuft im Browser und als Desktop-App für Linux, Windows und macOS. Im Browser reicht ein Link zum Mitarbeiten, Ansehen oder Kommentieren, auch auf Tablet und Handy. Die Desktop-App arbeitet zusätzlich offline und rechnet Geometrie lokal.

**Gemeinsam arbeiten:** Wer gerade im Projekt ist, erscheint als Avatar in der Kopfzeile; Auswahl und Cursor der anderen sind farbig markiert. Ein Klick auf einen Avatar folgt dessen Ansicht. Agenten erscheinen wie Personen, mit eigenem Avatar und ihren Änderungskarten. Offline Gearbeitetes kommt als Zweig zurück und wird wie eine Änderungsanfrage geprüft und übernommen.

**Messlatte:** Vor der Implementierung entstehen klickbare Prototypen. Sie gelten als bestanden, wenn mindestens 4 von 5 Konstrukteuren die Kernabläufe ohne Einweisung lösen.

## Architecture Decision Records

Dreiundvierzig Entscheidungen legen die Architektur fest. ADR-028 bis ADR-043 beschreiben die neue Richtung (Element-Graph, Rust-Kern, Elixir-Server, Web und Desktop, Lizenz, offene und lokale KI, Raumakustik, Material, Rendering, Austauschformate, Komponenten) und sind akzeptiert; sie ersetzen ADR-003, 005, 013 und 024. Die übrigen stehen auf „Vorgeschlagen“ und werden mit den Spikes bestätigt. Jedes ADR liegt zusätzlich als Markdown-Datei unter `docs/adr/` im Repository.

| ADR | Entscheidung | Wichtigste Alternative |
| --- | --- | --- |
| 001 | Kernel: OpenCascade (OCCT) über OCP | Parasolid (proprietär), Truck (unreif) |
| 002 | Modelliersprache: build123d | CadQuery, OpenSCAD |
| 003 | Python-Code im Git ist die Quelle der Wahrheit (ersetzt durch 028) | Eigenes Datei-/Featureformat |
| 004 | Austausch: STEP AP242 inkl. semantischer PMI, kein natives Plugin im Pilot | Native Makros je CAD-System |
| 005 | VS-Code-Extension (TypeScript) + lokaler Python-Geometrie-Dienst (ersetzt durch 031) | Eigene Desktop-App, Web-App |
| 006 | ocp\_tessellate wiederverwenden; three-cad-viewer als Ausgangspunkt (teilweise ersetzt durch ADR-026) | Eigener three.js-Viewer |
| 007 | Claude-Anbindung ausschließlich über einen MCP-Server | Direkte Code-Ausführung im Terminal |
| 008 | Regeln als Python-Prüfungen + YAML-Parameter, je Verfahren als Plugin | Regeln nur als Prompt-Text |
| 009 | Anforderungen als versionierte, schema-validierte YAML-Datei | Freitext |
| 010 | Visuelle Selbstprüfung über Offscreen-Renderings | Nur numerische Prüfungen |
| 011 | Eigene Blech-Schicht auf build123d (zurückgestellt bis nach der Beta) | Blech nur als Volumenkörper |
| 012 | FEM optional über Gmsh + CalculiX | Kommerzieller Solver |
| 013 | Apache-2.0, OCCT nur dynamisch gelinkt (ersetzt durch 034) | GPL, Dual-Licensing |
| 014 | Zwei Testebenen: Geometrie-Golden-Tests + KI-Eval-Suite | Nur Unit-Tests |
| 015 | Explizite Publikation statt Sichtbarkeit | Hide/Show als Exportsteuerung |
| 016 | Persistente Identität über Feature-IDs und Topologie-Historie | Indizes der Topologie, reines Geometrie-Matching |
| 017 | Publikations-Manifest als eingecheckte Lockfile-Datei mit semantischer Versionierung | Nur Git-Commits, PLM-Datenbank |
| 018 | Einheitliche Adressierung per URI; Querverweise nur auf veröffentlichte Elemente | Freie Referenzen auf jede Topologie |
| 019 | PMI als semantische Objekte im Code, gebunden an Element-IDs | Annotationen nur auf Zeichnungen |
| 020 | Zeichnungsblätter als Code, abgeleitet bei jedem Build | Interaktiver Zeichnungseditor |
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
| 036 | Immersives Review über WebXR (vorgeschlagen, Phase 3) | Native XR-Apps |
| 037 | KI anbieteroffen und lokal: MCP und Anbieter-Schnittstelle, lokale Modelle ab Tag 1, eigener Schlüssel, keine Telemetrie | Bindung an einen Anbieter, eigener KI-Dienst |
| 038 | Erster Anwendungsfall Raumgestaltung und Raumakustik: Geschoss, Wand, Decke, Boden, Öffnung, Möbel, Absorber als Elemente | Fräs- und Blechteile zuerst, volles BIM |
| 039 | Material als Element mit Aussehen, Akustik, Physik, Brandverhalten, Kosten, CO₂ – jeder Wert mit Einheit und Quelle | Material als Attribut je Bauteil |
| 040 | Rendering im Client: Echtzeit-PBR und Fotomodus mit Path Tracing (three-gpu-pathtracer, MIT); glTF als Austausch | Blender/Cycles (GPL), Render-Server |
| 041 | Nachhallzeit nach Sabine und Eyring je Oktavband im Rust-Kern; Ergebnisse als Analyse-Elemente | Berechnung im Python-Worker, externe Akustiksoftware |
| 042 | Austausch: IFC- und DXF-Import, glTF in beide Richtungen, PDF-Bericht, STEP für Bauteile | Nur STEP (ADR-004) |
| 043 | Komponenten mit Parametern und Varianten, Instanzen mit Überschreibungen, versionierte Bibliotheken mit Aktualisierung und Vorschau | Kopieren statt Instanzen |

### ADR-001: Geometriekernel OpenCascade

**Kontext:** Alle Fertigungsverfahren brauchen exakte B-Rep-Geometrie (Verrundungen, Bohrungen, Toleranzen, STEP). Der Kernel muss offen und kommerziell nutzbar sein.

**Entscheidung:** OCCT, angesprochen über die Python-Bindings OCP. OCCT steht unter LGPL 2.1 mit Ausnahmeklausel und ist der einzige offene B-Rep-Kernel mit Industriereife.

**Konsequenzen:** Bekannte Schwächen bei komplexen Verrundungen und Booleschen Operationen; wir brauchen Heilungs- und Fallback-Strategien (siehe Risiken). Kernel-Updates kommen über OCP-Releases, wir pinnen Versionen.

### ADR-002: build123d als Modelliersprache

**Kontext:** Die Sprache muss für LLMs leicht und fehlerarm schreibbar sein und Topologie gezielt selektierbar machen.

**Entscheidung:** build123d (Apache-2.0). Builder-Kontexte, Selektoren und Typ-Hints liefern lesbaren, gut prüfbaren Code; Joints unterstützen Baugruppen.

**Alternativen:** CadQuery (gleicher Kernel, aber lange Method-Chains, fehleranfälliger für LLMs); OpenSCAD (nur CSG/Mesh, kein STEP).

**Konsequenzen:** Wir tragen Verbesserungen upstream bei. Eigene Erweiterungen (Blech, Regel-Annotationen) liegen in einem separaten Paket `cadloop-core` (Arbeitsname).

### ADR-003: Code ist die Quelle der Wahrheit (ersetzt durch ADR-028)

**Entscheidung:** Jedes Bauteil ist ein Python-Modul mit typisierten Parametern und einer `build()`-Funktion. STEP, STL und Renderings sind abgeleitete Artefakte und werden nicht eingecheckt.

**Konsequenzen:** Volle Git-Historie, Code-Review und Diff auf Parameterebene. Konstrukteure brauchen Grundkenntnisse in Python oder arbeiten über Claude.

### ADR-004: STEP AP242 als Brücke zu allen CAD-Systemen

**Kontext:** Ergebnisse müssen in SolidWorks, NX, CATIA, Creo, Inventor und Fusion weiterfließen.

**Entscheidung:** Export als STEP AP242 mit Farben, Namen, Baugruppenstruktur, den Namen und Adressen veröffentlichter Elemente sowie semantischer PMI; STL/3MF für additive Fertigung; DXF für Blechabwicklungen. Native Makro-Generatoren pro CAD-System sind ein Kandidat für Phase 2.

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

**Entscheidung:** Drei Stufen: (1) explizite Feature-IDs im Code; (2) Ableitung der Unter-IDs aus der Topologie-Historie jeder Kernel-Operation (erzeugt aus, verändert aus); (3) Geometrie-Signatur als Rückfall. Bleibt eine Zuordnung mehrdeutig, wird der Konstrukteur gefragt. Technische Basis ist die Historie der OCCT-Operationen, abgegriffen über OCP, da build123d selbst keine Topologie-Historie bereitstellt. Die Identitätsschicht liegt in `cadloop-core` als Wrapper um build123d-Operationen.

**Alternativen:** Topologie-Indizes (brechen bei jeder Änderung); reines Geometrie-Matching (rät bei symmetrischen Teilen falsch); OCAF/TNaming aus OCCT direkt (mächtig, aber schwer mit build123d zu verbinden; wird im Spike bewertet).

**Konsequenzen:** Technisch anspruchsvollstes Arbeitspaket (AP-17, Risiko R-10); muss vor allen darauf aufbauenden Funktionen stehen.

### ADR-017: Manifest als Lockfile mit semantischer Versionierung

**Entscheidung:** Jeder Build schreibt deterministisch `part.manifest.json` mit allen veröffentlichten Elementen (ID, Name, Typ, Quell-Feature, Geometrie-Hash, Bezüge). Die Datei wird eingecheckt; die Schnittstellenversion wird daraus automatisch nach SemVer-Regeln vorgeschlagen.

**Konsequenzen:** Git bleibt das einzige Versionssystem; jeder Pull Request zeigt Schnittstellenänderungen als lesbaren Diff. Eine spätere PLM-Anbindung liest nur das Manifest.

### ADR-018: Adressierung per URI

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

**Konsequenzen:** Features müssen deterministisch und ohne versteckten Zustand sein; das passt zu ADR-024. Ein Spike in AP-00 misst die erreichbaren Zeiten an Referenzteilen.

### ADR-026: Eigene Interaktionsschicht auf three.js

**Kontext:** three-cad-viewer ist zum Anzeigen gebaut. Ziehgriffe, Geister-Vorschau, ID-genaue Auswahl, Befundmarkierungen und Analyse-Overlays gehen deutlich darüber hinaus.

**Entscheidung:** Wir bauen eine eigene, schlanke Interaktionsschicht auf three.js: Szenengraph mit Element-IDs, GPU-Picking, Griffe, Vorschau-Layer, Overlays. Tessellierungsdaten kommen binär (Typed Arrays) statt als JSON. ocp\_tessellate und Teile von three-cad-viewer werden weiterverwendet, wo sie passen; der Spike in AP-00 entscheidet, wie viel.

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

**Entscheidung:** Synchronisiert wird nur das Rezept. Geometrie entsteht in zustandslosen Workern hinter einer versionierten Kernel-Schnittstelle und wird nach Inhalts-Hash gecacht. Erste Implementierung: OpenCascade über build123d/OCP. Ein eigener Kernel ist nur als spezialisierter Zusatz denkbar (implizite Modelle, Gitter), frühestens in Phase 3.

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

**Entscheidung:** Modell in Originalgröße betrachten, auswählen, kommentieren, gemeinsam mit Anwesenheit; kein Modellieren in XR. Status vorgeschlagen, frühestens Phase 3.

### ADR-037: KI anbieteroffen und lokal

**Kontext:** Einzelpersonen und kleine Gruppen haben vertrauliche Daten und kleine Budgets. Lokale Modelle und Selbstbetrieb sind deshalb Pflicht, nicht Ausbaustufe.

**Entscheidung:** Agenten greifen über MCP zu, der eingebaute Assistent über eine Anbieter-Schnittstelle (OpenAI-kompatibel für Ollama, llama.cpp, vLLM, LM Studio; Anthropic; weitere als Plugin). Kein Anbieter ist vorkonfiguriert, lokale Modelle werden erkannt. Schlüssel bringt der Nutzer mit. Daten gehen nur an den ausdrücklich gewählten Anbieter, je Projekt einstellbar; keine Telemetrie ohne Zustimmung. Tools sind so einfach, dass auch kleine lokale Modelle sie bedienen.

**Konsequenzen:** Die Eval-Suite misst jede Version mit einem Cloud- und einem lokalen Modell. Selbstbetrieb wird in Phase 1 vorgezogen.

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

**Entscheidung:** Eine `component` hat einen Untergraphen, freigegebene Parameter und benannte Varianten. Eine `instance` verweist auf die Komponente und speichert nur Variante und Überschreibungen, nie eine Kopie. Definitionsänderungen erreichen alle Instanzen, Überschreibungen bleiben erhalten; entfällt ein Parameter, entsteht ein Befund. Komponenten sind verschachtelbar, Zyklen verboten. Bibliotheken sind Projekte mit veröffentlichten, semantisch versionierten Komponenten; neue Versionen kommen mit Vorschau der Wirkung (Geometrie, Nachhallzeit, Kosten). Lösen macht aus einer Instanz einen eigenständigen Untergraphen.

**Konsequenzen:** Der Absorber-Katalog ist eine Komponentenbibliothek mit Varianten. ap-01 misst die Weitergabe an 1.000 Instanzen (≤ 50 ms) und den Erhalt der Überschreibungen.

## Regelwerk und Verifikationsschleife

Erstes Regelpaket ist die Raumakustik: Zielbänder für die Nachhallzeit je Raumart, geprüft von der Firma (ap-20). Die Fertigungsregeln unten folgen nach der Beta.

Ein Bauteil gilt erst als fertig, wenn alle Regeln mit Schweregrad „Fehler“ bestehen, die Anforderungen erfüllt sind und ein Mensch das Ergebnis freigegeben hat. Claude arbeitet dafür in einer festen Schleife und bricht nach höchstens acht Iterationen mit einem Befundbericht ab.

**Ablauf einer Konstruktionsaufgabe**

1. Claude liest Freitext und Unterlagen und erzeugt die `requirements.yaml`; der Konstrukteur bestätigt sie.
2. Claude wählt Bausteine aus der Bibliothek und legt das Bauteil als Elemente im Graphen an (als Änderungssatz).
3. Der Worker berechnet die Geometrie; Fehler im Kernel kommen strukturiert mit Element-ID zurück.
4. `check_rules` prüft Anforderungen und Regelpakete; Befunde nennen Regel-ID, Ort und Korrekturvorschlag.
5. `render_views` liefert Ansichten mit markierten Befunden zur visuellen Kontrolle.
6. Claude korrigiert und wiederholt ab Schritt 3, bis keine Fehler mehr offen sind.
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

## Arbeitspakete

Die Arbeit ist in 33 Arbeitspakete in vier Phasen geschnitten, ausgerichtet auf den Anwendungsfall Raumakustik. Jedes Paket ist ein OpenSpec-Change mit Abnahmetests (`ap-xx-kurzname`); die Spikes der Phase 0 entscheiden, ob die Architektur trägt. ap-02 ist der erste Change mit echten Specs.

| AP | Phase | Inhalt | Abnahme | Abhängig von |
| --- | --- | --- | --- | --- |
| ap-00-setup | 0 | Gerüst für Rust, Elixir, TypeScript/Tauri, Python; CI; Lizenzprüfung; Credo und Dialyzer | Alle Sprachen bauen und testen in der CI; 0 Lizenzverstöße | – |
| ap-01-spike-datenmodell | 0 | Elementschema, Automerge, Textprojektion, NIF und WASM, Komponenten und Instanzen; Beispiel: Raum mit Absorbern | 12 Kennzahlen gemessen, Go oder No-Go | – |
| ap-02-akustik-nachhallzeit | 0 | Crate `crates/acoustics`: Sabine und Eyring je Oktavband, Fehler, Kommandozeile | ≤ 0,1 % zur Formel; 1.000 Flächen ≤ 1 ms | – |
| ap-03-spike-sync | 0 | Phoenix Channels mit Rust-Kern: zwei Browser live, einer offline, Zusammenführen | Änderung bei beiden < 200 ms; Merge ohne Datenverlust | ap-01 |
| ap-04-spike-rendering | 0 | Echtzeit-PBR und Fotomodus (Path Tracing) in Browser und Tauri auf drei Systemen | Raum mit 50 Objekten ≥ 30 fps; Fotomodus 1920 × 1080 in ≤ 60 s auf Mittelklasse-GPU | ap-00 |
| ap-05-graph-kern | 1 | Graph-Kern produktiv: Schema v1, Validierung, Abhängigkeiten, Migrationen | 100.000 Elemente laden ≤ 2 s | ap-01 |
| ap-06-kernel-worker | 1 | Kernel-Protokoll, Python-Worker mit OCCT, Cache nach Inhalts-Hash | Raum mit 6 Wänden und 2 Öffnungen baut < 1 s; Worker-Absturz ohne Serverausfall | ap-05 |
| ap-07-server-sync | 1 | Dokumentprozesse, Channels, Presence, Rechte, PostgreSQL | 20 gleichzeitige Nutzer je Dokument, Änderung < 200 ms | ap-03, ap-05 |
| ap-08-arbeitsflaeche | 1 | Arbeitsfläche mit 3D und 2D-Grundriss, Featurebaum, Eigenschaften, Befehlssuche, Avatare | 4 von 5 Testpersonen der Firma lösen Kernabläufe; Auswahl < 100 ms | ap-04 |
| ap-09-raum-elemente | 1 | Geschoss, Wand, Boden, Decke, Fenster, Tür; Wände im Grundriss zeichnen | Besprechungsraum in ≤ 5 min modelliert; Öffnungen schneiden Wände korrekt | ap-06, ap-08 |
| ap-10-materialbibliothek | 1 | Material-Elemente mit allen Eigenschaftsgruppen, Import von Herstellerdaten (CSV) | 20 Materialien der Firma importiert, αw und Absorberklasse korrekt | ap-05 |
| ap-11-akustik-live | 1 | Analyse-Element Nachhallzeit, Live-Anzeige je Band, Zielband, Kern als WASM | Aktualisierung beim Verschieben < 100 ms | ap-02, ap-09, ap-10 |
| ap-12-skizze-extrusion | 1 | Skizzen mit PlaneGCS, Extrusion, Identität der Flächen | Absorber-Form per Skizze in ≤ 3 Schritten; IDs stabil über 50 Parameteränderungen | ap-06, ap-08 |
| ap-13-komponenten-katalog | 1 | Komponenten mit Varianten und Instanzen (ADR-043), versionierte Bibliotheken mit Aktualisierung und Vorschau; Absorber-Katalog der Firma als Bibliothek; Platzieren an Wand und Decke, abgehängt, Reihen und Raster | 12 Deckensegel als Raster in einem Schritt; Wirkung sofort in der Nachhallzeit; ein Katalog-Update erreicht alle Instanzen, Überschreibungen bleiben | ap-10, ap-11, ap-12 |
| ap-14-rendering-fotomodus | 1 | Echtzeit-PBR, HDRI, Fotomodus produktiv, Bild als PNG | Referenzraum fotorealistisch; Materialien entsprechen Mustern der Firma | ap-04, ap-10 |
| ap-15-mcp-ki | 1 | MCP-Endpunkt, Anbieter-Schnittstelle (lokal und Cloud), Änderungssätze, Eval-Suite | Agent bringt die Nachhallzeit eines Referenzraums in das Zielband, mit Cloud- und lokalem Modell | ap-07, ap-13 |
| ap-16-selbstbetrieb | 1 | Container mit Server, Datenbank und lokalem Modell, Backups | Installation in < 15 min | ap-07 |
| ap-17-desktop-offline | 1 | Tauri-App mit Kern, Speicher und Worker; offline, Abgleich beim Verbinden | Einen Tag offline gearbeitet, Merge ohne Datenverlust | ap-06, ap-07 |
| ap-18-mengen-kosten-co2 | 2 | Mengen, Kosten, Gewicht und CO₂ je Raum; CSV-Mengenliste | Summen stimmen mit Handrechnung für 3 Räume | ap-10, ap-13 |
| ap-19-bericht-angebot | 2 | PDF-Bericht: Nachhallzeit vorher/nachher, Bilder, Grundriss, Mengen, Kosten, CO₂ | Firma versendet einen echten Bericht ohne Nacharbeit | ap-14, ap-18 |
| ap-20-regeln-raumakustik | 2 | Zielwerte als Regelpaket (z. B. nach DIN 18041), geprüft durch die Firma | Zielbänder für 5 Raumarten stimmen mit Firmenprüfung | ap-11 |
| ap-21-import-ifc-dxf | 2 | Import von Räumen aus IFC und Grundrissen aus DXF | 3 Architekturmodelle ohne Nacharbeit übernommen | ap-09 |
| ap-22-moebel-gltf | 2 | Möbelbibliothek, glTF-Import und -Export | 20 Möbel mit Absorptionsfläche; Szene als glTF exportiert | ap-14 |
| ap-23-knoten-editor | 2 | Knoten-Editor, Untergraphen als Bausteine | Absorber-Raster vollständig im Knoten-Editor | ap-08, ap-24 |
| ap-24-textprojektion-git | 2 | Textprojektion produktiv, Git-Export und -Import | Roundtrip verlustfrei; eine Parameteränderung = eine Zeile | ap-05 |
| ap-25-zweige-freigabe | 2 | Zweige, Änderungsanfragen, Review, Freigabe, semantische Konflikte | 100 % der Konflikte im Testkorpus erkannt | ap-07 |
| ap-26-publikation | 2 | Publikationsstatus, Manifest, URIs, semantischer Diff | Schnittstellen-Diff an 3 Referenzräumen korrekt | ap-05 |
| ap-27-plugin-sdk | 2 | Plugin-SDK für TypeScript und Python, Beispielplugin | Fremd-Plugin ohne Änderung am Kern | ap-05, ap-23 |
| ap-28-hosting | 3 | Gehosteter Dienst mit Organisationen | Erste externe Organisation | ap-16 |
| ap-29-webxr | 3 | Begehung des Raums in Originalgröße, mit Anwesenheit und Kommentaren | Review-Sitzung mit 3 Personen in XR | ap-14 |
| ap-30-akustik-geometrisch | 3 | Spiegelquellen bzw. Strahlverfolgung, Auralisation (hörbar machen) | Abweichung zu Messung in 3 Räumen dokumentiert | ap-11 |
| ap-31-fertigung | 3 | Fertigungsregeln (Fräsen, 3D-Druck, Blech), STEP mit PMI, Zeichnungen | Absorber-Bauteil fertigungsgerecht exportiert | ap-12 |
| ap-32-zweiter-kernel | 3 | Spezialisierter Kernel (implizite Modelle, Gitter, z. B. für Absorberstrukturen) | Gitterabsorber als 3MF exportiert | ap-06 |

### Entwicklung mit Agenten

Agenten schreiben den Code, Menschen entscheiden, was gebaut wird und ob es gut genug ist. Jedes Arbeitspaket durchläuft dieselbe Pipeline:

1. **Spec:** Das Kernteam schreibt eine Spec mit Ziel, Schnittstellen, Abnahmekriterien und Testfällen (bei UI zusätzlich Prototyp und Referenz-Screenshots).
2. **Umsetzung:** Ein Claude-Code-Agent arbeitet in einem eigenen Worktree; mit dem Pro-Abo laufen 2, mit Max 4–6 Agenten parallel auf unabhängigen Paketen.
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

- Im Fokus bis zur Beta: Datenmodell, Raum, Materialien, Nachhallzeit, Absorber-Katalog, Rendering mit Fotomodus, Mengen, Kosten, CO₂, Bericht, Zusammenarbeit live und offline, KI über MCP, Plugin-SDK.
- Phase 3: gehosteter Dienst, WebXR, öffentliche Bibliothek, FEM, zweiter Kernel; geometrische Akustik, Fertigung (Fräsen, 3D-Druck, Blech). Im Ideenspeicher (\`docs/ideen/\`): 3D-gedruckte, auf den Raum optimierte Resonator-Absorber, ausgelegt aus dem Defizit der Nachhallzeit.
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
| Leitplanken | `docs/adr/` | 36 Architekturentscheidungen | Kernteam |
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

Die Roadmap wird über Gates gesteuert, nicht über Termine: Ein Gate ist erreicht, wenn seine Kriterien erfüllt sind. Die Monatsangaben sind Richtwerte für ein Team, das täglich Reviews schafft; bei wenig menschlicher Zeit bestimmt der Durchsatz der Nachtschicht das Tempo. Das Datenmodell (ap-01, ap-05) liegt auf dem kritischen Pfad, Selbstbetrieb mit lokalem Modell (ap-23) ist in Phase 1 vorgezogen.

&#91;embedded content: Roadmap · 4 Phasen, 4 Gates, Beta nach etwa 10 Monaten\]

| Gate | Richtwert | Kriterium |
| --- | --- | --- |
| G1 Architektur trägt | Monat 2 | ap-01 bis ap-04 mit Go (oder angepasste ADRs); Nachhallzeit korrekt und schnell; Gerüst in vier Sprachen grün; UX-Prototyp „Raum mit Absorbern“ mit der Firma getestet |
| G2 Raum mit Absorbern | Monat 5 | Zwei Personen modellieren live einen Besprechungsraum, eine davon offline; Absorber platziert, Nachhallzeit live; Fotomodus-Bild; ein Agent bringt die Nachhallzeit über MCP ins Zielband (Cloud und lokal); alles selbst betrieben |
| G3 Öffentliche Beta | Monat 10 | Bericht für Angebote, Mengen, Kosten und CO₂, IFC- und DXF-Import, Möbel, Knoten-Editor, Zweige, Plugin-SDK; die Firma nutzt CEE für echte Angebote |
| G4 Ökosystem | ab Monat 11 | Gehosteter Dienst, externe Beiträge, WebXR-Begehung, geometrische Akustik, Fertigung |

## Risiken und Gegenmaßnahmen

Die größten Risiken liegen jetzt im Datenmodell (Größe und Merge-Verhalten des CRDT), in der persistenten Identität und in der Breite des Stacks für zwei Personen. Die ersten beiden klären die Spikes in Phase 0, das dritte begrenzen klare Schichtgrenzen und Regeln je Sprache.

| ID | Risiko | Auswirkung | Gegenmaßnahme |
| --- | --- | --- | --- |
| R-10 | Persistente Identität bricht bei Topologie-Änderungen (Topological Naming Problem), z. B. wenn eine Fläche durch eine neue Tasche geteilt wird | Sehr hoch | Spike in AP-00; drei Stufen nach ADR-016; Mehrdeutigkeit führt zur Nachfrage statt zur Vermutung; Stresstests in der CI; Veröffentlichung bevorzugt auf Features und Bezugselemente statt auf abgeleitete Flächen |
| R-15 | Oberfläche reagiert zu träge, weil OCCT-Rebuilds Sekunden dauern | Hoch | Inkrementeller Rebuild und Näherungsvorschau (ADR-025); Spike mit Zeitmessung an Referenzteilen; Performance-Budgets als Pflichttests |
| R-16 | Gleichzeitige Änderungen von Menschen und Agenten ergeben technisch gültige, fachlich widersprüchliche Modelle | Hoch | Semantische Konfliktprüfung nach jedem Merge (ADR-033); Agenten arbeiten auf eigenem Zweig und kommen als Änderungssatz zurück; Regeln laufen nach jeder Übernahme |
| R-13 | UI erreicht mit Agenten allein nicht die geforderte Qualität | Hoch | UX-Designer im Kernteam; Prototyp vor Code; Referenz-Screenshots und visuelle Regressionstests als Spec; Usability-Runde je Gate |
| R-14 | Review-Engpass im Kernteam oder schwer wartbarer Agenten-Code | Hoch | Kleine Pakete mit klaren Specs; unabhängiger Review-Agent vor menschlicher Abnahme; Architekturregeln als Linter; Pflicht-Tests je Merge |
| R-01 | OCCT scheitert an komplexen Verrundungen oder Booleschen Operationen | Hoch | Fehler strukturiert an Claude zurückgeben; Regeln zur Reihenfolge (Verrundungen zuletzt); Heilungsfunktionen; Testkorpus schwieriger Fälle |
| R-02 | Blech-Abwicklung ungenau gegenüber kommerziellem CAD (erst nach der Beta) | Hoch | Spike in AP-00; Referenzteile aus Fachbereich; Fallback: Abwicklung nur für einfache Biegungen |
| R-03 | Claude erzeugt plausible, aber fachlich falsche Geometrie | Hoch | Ausführbare Regeln statt Prompt-Text; Änderungskarten mit Vorschau; verpflichtende menschliche Freigabe; Eval-Suite |
| R-11 | Semantische PMI in STEP AP242 wird von OCCT oder Ziel-CAD-Systemen nur teilweise unterstützt | Mittel | Früher Import-Test; PMI zusätzlich als JSON und auf der Zeichnung; Beitrag zu OCCT prüfen |
| R-12 | Konstrukteure veröffentlichen zu viel oder zu wenig | Mittel | Vorschläge durch Claude aus der Anforderungsdatei; Warnung, wenn Zeichnung oder Baugruppe ein internes Element braucht; Leitfaden im Pilot |
| R-04 | Abhängigkeit von kleinen Upstream-Projekten (build123d, ocp\_tessellate) | Mittel | Früher Kontakt und Beiträge; Versionen pinnen; Fork als Notfalloption dokumentieren |
| R-05 | Konstrukteure finden Knoten und Text zu technisch | Mittel | Bedienung primär über Arbeitsfläche, Featurebaum und Claude; Code bleibt optional sichtbar; Pilot mit Feedbackschleifen |
| R-06 | STEP-Import im Ziel-CAD verliert Namen, Farben oder Struktur | Mittel | Import-Testmatrix in AP-12; AP242 mit Validierungsdateien |
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
- [ ] Freigabeprozess festlegen: Wer darf Revisionen freigeben, braucht es eine Vier-Augen-Prüfung?
- [ ] Rechte und Mandanten: Wer sieht und ändert welches Projekt, auch beim Selbstbetrieb?
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
