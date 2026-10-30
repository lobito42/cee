## ADDED Requirements

### Requirement: Befehle im Register mit Orten und Kürzeln
Der Prototyp SHALL die 7 Befehle aus design.md Abschnitt 6 im einen Befehlsregister führen (ADR-045), ohne
`folgt: true`, mit Familie, Untergruppe, Kürzel und Parameter-Schema. Die Bedienung MUST nach design.md Abschnitt 1
vorrangig im Bild liegen: Kontextleiste an der Auswahl (höchstens 5 Einträge), Skizzier-Werkzeugleiste nur bei
offener Skizze, Kürzel; die Dropdowns „Skizze“ und „Körper“ (höchstens 12 Einträge) und die Suche MUST dieselben
Befehle zum Nachschlagen zeigen. Bestehende Kürzel MUST unverändert bleiben.

#### Scenario: [auto] Orte, Kürzel und Grenzen
- **WHEN** der Abnahmetest `pruefen -- skizze befehle --json` aufruft
- **THEN** stehen 7 Befehle mit `folgt` = false im Ergebnis; `skizze.anlegen`, `skizze.linie`, `skizze.rechteck`,
  `skizze.kreis`, `koerper.hochziehen` haben die Kürzel `S`, `L`, `R`, `K`, `E`; jeder hat die Orte Menü und Suche;
  `skizze.anlegen` ist Kontextaktion auf einer Ebene, `koerper.hochziehen` auf einem Bereich; Linie, Rechteck, Kreis
  und Fertig haben den Ort `werkzeugleiste`; kein Kürzel ist doppelt im Register, und alle Kürzel aus ap-50 und
  früher sind unverändert

#### Scenario: [auto] Werkzeugleiste nur in der Skizze
- **WHEN** per `ablauf` im Zustand `skizze-leer` ein Schnappschuss vor, während und nach einer offenen Skizze
  genommen wird
- **THEN** ist `werkzeugleiste` vorher und nachher leer und während der Skizze genau
  [`skizze.linie`, `skizze.rechteck`, `skizze.kreis`, `skizze.fertig`], und `kontextleiste` hat nie mehr als 5
  Einträge

### Requirement: Skizze auf einer Ebene anlegen und schließen
„Skizze anlegen“ SHALL auf der gewählten Ebene ein `sketch` mit Eingang `ebene` anlegen, die Skizze öffnen und die
Kamera in höchstens 400 ms senkrecht auf die Ebene drehen (Blickrichtung −Normale, Abweichung ≤ 0,1°,
`x_direction` nach rechts). Ohne gewählte Ebene MUST die Rückmeldezeile „Ebene wählen“ anfordern. „Fertig“ und Esc
ohne aktives Werkzeug MUST die Skizze schließen und die Kamera in die vorige Lage zurückbringen; Doppelklick auf die
Skizze MUST sie wieder öffnen.

#### Scenario: [auto] Anlegen, Kamera, Fertig
- **WHEN** im Zustand `skizze-leer` die XY-Ebene von K0 angeklickt, `S` gedrückt, dann `skizze.fertig` ausgelöst und
  in einem zweiten Lauf die ZX-Ebene gewählt und `skizze.anlegen` über die Kontextleiste ausgelöst wird
- **THEN** entsteht je genau 1 `sketch` mit `ebene` = die gewählte Ebene; `skizze_offen` ist danach dessen ID;
  `kamera.richtung` weicht höchstens 0,1° von −Normale ab, `kamera.projektion` = parallel, `ms_bis_ruhe` ≤ 400;
  nach Fertig ist `skizze_offen` = null und `kamera.richtung` weicht höchstens 0,1° von der Richtung vor dem Öffnen ab

#### Scenario: [auto] Ohne Ebene und Wiedereintritt
- **WHEN** `S` ohne Auswahl gedrückt und dann auf die XY-Ebene geklickt wird; danach wird die Skizze mit Esc
  geschlossen und doppelt angeklickt
- **THEN** zeigt die Rückmeldezeile „Ebene wählen“, nach dem Klick ist genau 1 Skizze offen, nach Esc keine, und nach
  dem Doppelklick wieder dieselbe ID, ohne dass ein zweites `sketch` entsteht

### Requirement: Zeichnen mit Fangen und getipptem Maß
In einer offenen Skizze SHALL der Mensch Linien (als Kette), Rechtecke und Kreise per Klick oder Ziehen zeichnen.
Fangen MUST mit Fangradius 8 px an Endpunkten, dann Mittelpunkten, dann am Raster von 10 mm einrasten und den
Zielwert exakt übernehmen; Richtungen innerhalb 3° von waagerecht bzw. senkrecht MUST exakt einrasten; jede
Fangart MUST am Zeiger angezeigt werden. Ab der ersten getippten Ziffer MUST das Wertfeld am Zeiger Länge, Breite,
Höhe oder Durchmesser mit Einheit und einfachen Formeln annehmen (ADR-057), `Tab` wechselt das Feld, `Enter` legt
das Element an, ein ungültiger Wert MUST einen Befund am Feld zeigen und nichts anlegen. Jedes angelegte Element
MUST genau ein Rückgängig-Schritt sein.

#### Scenario: [auto] Rechteck mit getipptem Maß
- **WHEN** in einer offenen Skizze auf der XY-Ebene `R` gedrückt, bei `skizze_mm` (0,4; −0,3) geklickt, der Zeiger
  nach (30, 20) bewegt und „60“, `Tab`, „4 cm“, `Enter` getippt wird
- **THEN** entsteht genau 1 `sketch_rectangle` mit Ecken (0, 0) und (60, 40) mm (exakt, Raster-Fang am Ursprung),
  `fang.art` war beim Klick `raster`, und `wertfeld.feld` war nach `Tab` `hoehe`

#### Scenario: [auto] Fangen an Endpunkt, Mittelpunkt und Richtung
- **WHEN** in der Skizze mit dem Rechteck (0, 0)–(60, 40) mm `L` gedrückt, bei (60,6; 39,5) mm geklickt, der Zeiger
  nach (97; 41,3) mm bewegt und geklickt, dann Esc; danach `K`, Klick bei (30,4; 0,3) mm, „6,6“, `Enter`
- **THEN** beginnt die Linie exakt bei (60, 40) mm (`fang.art` = `endpunkt`), endet exakt bei v = 40 mm
  (`fang.richtung` = `waagerecht`, Anzeige „H“), und der Kreis hat Mittelpunkt exakt (30, 0) mm
  (`fang.art` = `mittelpunkt`) und d = 6,6 mm

#### Scenario: [auto] Ungültiger Wert, Abbruch, Rückgängig
- **WHEN** beim Kreis „5 kg“ und `Enter` getippt, dann Esc gedrückt, dann ein gültiger Kreis angelegt und
  `bearbeiten.rueckgaengig` ausgelöst wird
- **THEN** zeigt das Wertfeld einen Befund und `graph_hash` bleibt nach „5 kg“ und nach Esc unverändert; nach
  Rückgängig ist `graph_hash` gleich dem vor dem gültigen Kreis; `dialoge` ist in allen Schnappschüssen 0

### Requirement: Bereich wählen und mit dem Griff hochziehen
Bereiche einer sichtbaren Skizze SHALL per Klick ins Innere wählbar sein (Löcher ausgenommen). Überfahren MUST eine
dünne Kontur, Auswahl eine Kontur in der Akzentfarbe zeigen; Linienbreiten und Größen MUST unverändert bleiben
(Auswahl nur über Farbe, ADR-061). „Hochziehen“ MUST eine Geister-Vorschau mit 10 mm und einen achsengesperrten
Griff zeigen; Ziehen ändert die Höhe live, Tippen setzt den Wert, `Enter` oder Loslassen legt das `extrude` an, Esc
ändert nichts. Es MUST NOT ein Dialog erscheinen (ADR-044, ADR-063 Punkt 3). Danach MUST die Höhe in den
Eigenschaften stehen und der Griff am gewählten Hochziehen erneut wirken; die Skizze wird in der Ansicht
ausgeblendet, ohne den Graphen zu ändern.

#### Scenario: [auto] Bereich wählen nur über Farbe
- **WHEN** im Zustand `skizze-halter` (Hochziehen verworfen) der Zeiger über das Innere des Rechtecks von S1
  bewegt, dann geklickt, dann in einen Kreis geklickt wird
- **THEN** meldet `kontur` erst `hover`, dann `auswahl` mit Farbe = Token `akzent` für den Bereich
  „Rechteck minus Kreise“, danach für den Kreis-Bereich; `linienbreiten` aller Elemente sind in allen drei
  Schnappschüssen gleich; `hover_ms` ≤ 100

#### Scenario: [auto] Hochziehen mit Griff und getipptem Wert
- **WHEN** der Bereich „Rechteck minus Kreise“ gewählt, `E` gedrückt, der Griff um 25 mm gezogen und gehalten, dann
  „8“ und `Enter` getippt wird; in einem zweiten Lauf nach `E` Esc gedrückt wird
- **THEN** zeigt `geister` während des Ziehens eine Hülle mit Höhe 35 mm ± 0,5 mm (10 mm + 25 mm), danach gibt es
  genau 1 `extrude` mit `hoehe` = 8 mm und Punkt im gewählten Bereich, sein Körper erscheint mit dem Volumen aus dem
  Worker, die Eigenschaften zeigen „8 mm“, S1 ist in `szene` nicht sichtbar, aber im Graphen unverändert; im zweiten
  Lauf ist `graph_hash` unverändert; `dialoge` ist immer 0

#### Scenario: [auto] Griff am fertigen Hochziehen
- **WHEN** das Hochziehen gewählt und sein Griff um −3 mm gezogen und losgelassen wird, danach Rückgängig
- **THEN** ist `hoehe` = 5 mm ± 0,5 mm, der Körper ist neu berechnet, und nach Rückgängig ist `hoehe` wieder 8 mm

#### Scenario: [auto] Budgets beim Ziehen und Loslassen
- **WHEN** der Griff 2 s lang gezogen und dann losgelassen wird (5 Wiederholungen)
- **THEN** ist der Median von `bild_ms` ≤ 16,7 ms, `long_tasks` = 0, und der Median von `bereit_ms` (Loslassen bis
  exakter Körper angezeigt) ≤ 500 ms

### Requirement: Abnahmefall Halter in der Vorschau
Der Halter nach design.md Abschnitt 8 SHALL im Prototyp nur über Klicks, Kürzel, Fangen, getippte Maße und Griff
gebaut werden können, ohne Menü und ohne Eigenschaftenfeld, und dasselbe Ergebnis liefern wie direkt im Worker.

#### Scenario: [auto] Halter per Direktbedienung
- **WHEN** der Abnahmetest im Zustand `skizze-leer` per `ablauf` S1 mit Rechteck und zwei Kreisen (Werte aus
  `Params()` getippt), Hochziehen um `dicke`, K1 mit z = `dicke`, S2 mit Rechteck und Hochziehen um `steg_hoehe`
  baut, wobei kein Schritt einen Menüeintrag oder ein Eigenschaftenfeld benutzt (Ausnahme: K1 mit „Koordinatensystem setzen“ aus ap-50 und dem Feld z)
- **THEN** stimmen Volumen und Hülle beider Körper aus `ergebnis` relativ 10⁻⁶ mit dem direkten Worker-Fall überein,
  jede Lage in `szene` stimmt auf 10⁻³ mm mit `ergebnis` überein, und `konsolenfehler` ist leer

### Requirement: Befehle als KI-Werkzeuge
`skizze.anlegen`, `skizze.linie`, `skizze.rechteck`, `skizze.kreis` und `koerper.hochziehen` SHALL `"ki": true` und
ein Parameter-Schema nach ap-52 tragen (Größen als String mit Einheit, Bezüge als `<id>.<ausgang>`); mit Parametern
MUST jeder Befehl ohne Klick dieselbe Graph-Operation ausführen wie der Klickweg. Werkzeugaufrufe der KI MUST als
Änderungssatz mit Geister-Vorschau erscheinen und erst nach Übernehmen wirken (ADR-021); das Werkzeugergebnis einer
Skizze MUST ihre Bereiche mit Punkt und Fläche nennen.

#### Scenario: [auto] Werkzeugliste
- **WHEN** der Test `pruefen -- ki werkzeuge --json` aufruft
- **THEN** enthält die Liste die 5 Werkzeuge `skizze_anlegen`, `skizze_linie`, `skizze_rechteck`, `skizze_kreis`,
  `koerper_hochziehen` mit flachem `inputSchema`, jede Größe als String mit Muster „Zahl Einheit“, und je ein Beispiel
  in `description`; `skizze_fertig` und `skizze_bearbeiten` fehlen

#### Scenario: [auto] Befehle mit Parametern ohne Klick
- **WHEN** per `ablauf` `skizze.anlegen` mit `ebene`, `skizze.rechteck` mit „0 mm“, „0 mm“, „30 mm“, „20 mm“ und
  `koerper.hochziehen` mit Punkt „15 mm“, „10 mm“ und `hoehe` „15 mm“ ausgelöst werden
- **THEN** entsteht ein Körper mit Volumen 9 000 mm³ (relativ 10⁻⁶), und es gab keinen Klick ins Modell

#### Scenario: [auto] Halter über den KI-Chat
- **WHEN** das Testmodell aus ap-52 auf einen Satz die Werkzeugaufrufe für den Halter nach design.md Abschnitt 8
  liefert, dann `chat.uebernehmen` und danach `bearbeiten.rueckgaengig` ausgelöst werden
- **THEN** zeigt die Entscheidungskarte vor dem Übernehmen alle neuen Elemente als Geister bei unverändertem
  `graph_hash`; nach Übernehmen stimmen Volumen beider Körper relativ 10⁻⁶ mit dem direkten Worker-Fall überein und
  der Verlauf nennt `urheber` = `ki`; nach einem Rückgängig-Schritt ist `graph_hash` wieder der Ausgangswert

### Requirement: Ansichtsbausteine
Das Modell SHALL einen Ansichtswürfel mit stets sichtbaren Weltachsen (X rot, Y grün, Z blau aus den Tokens
`achse.*`) zeigen, dessen Seiten die vorhandenen Ansichtsbefehle auslösen; Picking MUST über einen BVH laufen und
höchstens 4 ms (Median) auf 200 000 Dreiecken brauchen. Neue Abhängigkeiten MUST nach ADR-034 freizügig sein;
`three-cad-viewer` und PlaneGCS MUST NOT eingebunden werden.

#### Scenario: [auto] Ansichtswürfel
- **WHEN** per `ablauf` auf die Seite „Vorne“ und dann auf „Oben“ des Ansichtswürfels geklickt wird
- **THEN** ist jeweils `verlauf` bzw. das Befehlsprotokoll um `ansicht.vorne` bzw. `ansicht.oben` ergänzt,
  `kamera.richtung` entspricht der Ansicht nach ISO auf 0,1°, und die drei Weltachsen sind in jedem Schnappschuss
  sichtbar

#### Scenario: [auto] Picking-Budget
- **WHEN** der Test `pruefen -- skizze messen --dreiecke 200000 --json` aufruft
- **THEN** ist `median_ms` ≤ 4

#### Scenario: [auto] Lizenzen
- **WHEN** der Test `pruefen -- skizze lizenzen --json` aufruft
- **THEN** hat jedes direkte Paket eine Lizenz aus der Liste von ADR-034 (MPL, Apache, MIT, BSD, ISC, Zlib und
  gleichwertige), `three-mesh-bvh`, `camera-controls` und `three-viewport-gizmo` sind enthalten, und weder
  `three-cad-viewer` noch ein Paket mit „planegcs“ im Namen kommt in `package-lock.json` vor

### Requirement: Ausprobieren durch den Menschen
Der Mensch SHALL den Ablauf aus design.md Abschnitt 10 im Browser ausprobieren können und bewerten, ob sich die
Bedienung direkt und zeitgemäß anfühlt.

#### Scenario: [mensch] Ausprobieren nach Anleitung
- **WHEN** der Mensch die Klick-Anleitung aus design.md Abschnitt 10 durchgeht
- **THEN** gelingen die Schritte 1 bis 7 ohne Hilfe (Ja/Nein je Schritt), und Schritt 8 gelingt, wenn ein Modell
  eingerichtet ist

#### Scenario: [mensch] Bedienung fühlt sich direkt an
- **WHEN** der Mensch nach dem Ausprobieren gefragt wird, ob er eine Platte mit zwei Löchern ohne Menü und ohne
  Punkt-für-Punkt-Klicken bauen konnte
- **THEN** antwortet er mit Ja, oder seine Einwände stehen als Punkte für die nächste Stufe im PR
