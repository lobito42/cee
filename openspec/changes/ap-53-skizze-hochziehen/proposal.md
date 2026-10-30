## Why

Mit ap-50 gibt es Koordinatensysteme, Punkte und Linien aus dem echten Geometriekern, aber jedes Element entsteht
Punkt für Punkt über Menü und Eigenschaften. Der Nutzer wünscht (2026-10-30) eine **zeitgemäße Direktbedienung**:
Ebene wählen, im Bild skizzieren, einen geschlossenen Bereich wählen und ihn mit einem Griff zum Körper
hochziehen – so wie in heutigen CAD-Programmen, ohne Dialoge und ohne Punkt-für-Punkt-Klicken. Diese Stufe macht
den Weg Ebene → Skizze (Linie, Rechteck, Kreis) → Bereich → Hochziehen → Körper einmal durchgängig, mit
build123d hinter der Kernel-Schnittstelle aus ap-50, und ist zugleich die erste Stufe, in der echte Volumen
entstehen. Die neuen Befehle sind von Anfang an auch Werkzeuge für den KI-Chat (ADR-045, ADR-021). Als
Abnahmefall dient der Winkelhalter aus `parts/examples/halter.py` (ohne Verrundung).

## What Changes

- **Elementtypen Skizze** als Typdefinitionen (Daten, ADR-046) in `format/types/skizze.json`: `sketch` (Skizze auf
  einer Ebene), `sketch_line` (Linie), `sketch_rectangle` (Rechteck), `sketch_circle` (Kreis). Skizzenelemente
  liegen im `content` ihrer Skizze und haben Lagen in Skizzenkoordinaten (u, v) mit Einheit (ADR-057).
- **Bereiche einer Skizze** berechnet der Worker: geschlossene Konturen aus Rechtecken, Kreisen und
  geschlossenen Linienzügen, verschachtelte Konturen als Löcher. Jeder Bereich wird mit innerem Punkt, Fläche und
  Rand gemeldet; sich schneidende Kurven ergeben einen Befund statt eines geratenen Bereichs (ADR-050).
- **Elementtyp Hochziehen** `extrude` in derselben Datei: Eingang Skizze, Bereich über einen Punkt in
  Skizzenkoordinaten, Höhe mit Einheit (auch negativ). Ergebnis ist ein neuer **Körper** (OCP-Solid) mit Volumen,
  Oberfläche, Schwerpunkt, Hülle, Anzahl Flächen und Kanten sowie einem Anzeige-Netz und Kantenzügen. Keine
  booleschen Verknüpfungen in dieser Stufe.
- **Kernel-Schnittstelle `cee-kernel/0`** additiv erweitert um die Ausgabetypen `sketch` und `solid` (ap-50 sieht
  nur additive Erweiterungen vor).
- **Direktbedienung im Prototyp** `spikes/ux-prototyp-2/` (Entscheidung des Nutzers 2026-10-30, design.md
  Abschnitt 1): Bedienung vorrangig im Bild – Kontextleiste an der Auswahl, Skizzier-Werkzeugleiste im Modell
  während einer Skizze, Tastenkürzel, Ziehen am Griff. Die Menüleiste bleibt Nachschlage- und Suchweg.
  - Ebene wählen → „Skizze anlegen“; Kamera dreht sich senkrecht auf die Ebene; „Fertig“ oder Esc schließt.
  - Linie, Rechteck, Kreis zeichnen mit Fangen an Raster, Endpunkten und Mittelpunkten, waagerecht und senkrecht
    mit Anzeige; Maß beim Zeichnen tippen (Wertfeld am Zeiger, Einheit und einfache Formeln).
  - Geschlossenen Bereich wählen → „Hochziehen“; Höhe über einen achsengesperrten Griff am Modell und das
    Wertfeld am Zeiger, nie über einen Dialog (ADR-044, ADR-063 Punkt 3); danach Höhe in den Eigenschaften.
  - Bausteine für das Bild: Picking mit three-mesh-bvh, Hover- und Auswahlkontur in der Akzentfarbe (OutlinePass
    aus three bzw. postprocessing), Kanten als Line2, Kamera mit camera-controls (senkrecht auf Ebene, Einpassen),
    Ansichtswürfel mit Weltachsen (three-viewport-gizmo), Höhengriff mit TransformControls. Skizzierwerkzeuge sind
    Eigenbau.
- **Befehle im Register** (`src/befehle.json`) mit Kürzel und Parameter-Schema, KI-tauglich (`"ki": true`) für
  Skizze anlegen, Linie, Rechteck, Kreis, Hochziehen; KI-Aufrufe erscheinen als Änderungssatz mit Vorschau nach
  ap-52 (ADR-021).
- **Prüfbefehle** `pruefen -- skizze …` und eine Klick-Anleitung zum Ausprobieren.

## Capabilities

### New Capabilities

- `skizze`: Elementtypen Skizze, Linie, Rechteck, Kreis; Bereiche aus geschlossenen Konturen im Worker.
- `hochziehen`: Elementtyp Hochziehen, Körper als exaktes OCP-Solid mit Kennwerten und Anzeige-Netz; Erweiterung
  von `cee-kernel/0` um `sketch` und `solid`.
- `skizze-vorschau`: Direktbedienung im Prototyp (Ebene wählen, Skizzieren mit Fangen und Maß tippen, Bereich
  wählen, Höhengriff, Ansichtsbausteine, Befehle, KI-Werkzeuge). Prototyp-Verhalten wie ap-50
  `drahtmodell-vorschau`; beim Archivieren entscheidet das Kernteam über die Übernahme nach `openspec/specs/`
  (Vorschlag: `skizze` und `hochziehen` ja, `skizze-vorschau` nein, Produktfassung mit ap-08b und ap-12).

### Modified Capabilities

Keine. (`kernel-protokoll` und `drahtmodell` aus ap-50 sind noch nicht archiviert; die Erweiterung von
`cee-kernel/0` ist additiv und steht in `hochziehen`.)

## Impact

- **Betroffene ADRs:** ADR-028 (Skizze als Element mit Untergraph, gleiche Form), ADR-029 (Reihenfolge, Prüfung,
  Einheiten aus dem Rust-Kern über das SDK), ADR-032 (Geometrie nur im Worker, nie gespeichert; die Vorschau beim
  Ziehen ist die erlaubte schnelle Netz-Vorschau, exakt rechnet der Worker), ADR-016 (Bereich über einen
  Punkt-Selektor mit Begründung, nie über Index; keine Flächen- oder Kanten-IDs von Körpern), ADR-050 (Befund statt
  Absturz), ADR-057 (Größen mit Einheit), ADR-021 (KI-Aufrufe als Änderungssatz), ADR-045 (ein Befehlsregister
  für Menü, Kürzel, Kontext, Suche und KI), ADR-044 und ADR-063 Punkt 3 (Griff, Achse gesperrt, Wert tippen, kein
  Dialog), ADR-061 und `docs/design/muster.md` (Kontur in der Akzentfarbe, Wertfeld, Kontextaktionen, Tokens),
  ADR-065 (Platzierungsregel, Kontextgrenzen, Ansicht am Modell), ADR-060 (nichts hängt nur am Überfahren),
  ADR-034 (neue Abhängigkeiten nur MIT bzw. Zlib), ADR-062 (CAD zuerst). ADR-027 bleibt unberührt: keine
  Zwangsbedingungen, kein PlaneGCS.
- **Ausdrücklich gemeldete Abweichungen und Widersprüche** (Entscheidung beim Kernteam, design.md „Open
  Questions“):
  1. `docs/rules/client.md` sagt „keine Menüleisten“ und „keine Werkzeugleiste“ (Stand ADR-022/ADR-063);
     `docs/design/muster.md` und ADR-065 führen Menüleiste mit Dropdowns (Skizze, Körper …) und lassen die
     schwebende Werkzeugleiste offen. Der Nutzer hat am 2026-10-30 entschieden: Menüleiste nur als Nachschlage- und
     Suchweg, Bedienung vorrangig im Bild (Werkzeugleiste und Kontextleiste an der Auswahl, Kürzel, Ziehen). Das
     braucht einen Nachtrag des Kernteams zu `docs/rules/client.md`, `docs/design/muster.md` und ADR-065 (Offen,
     Punkt 3 „kein zweites Werkzeugfeld“); dieser Change ändert diese Dateien nicht.
  2. Ansichtswürfel, Fang-Anzeige und Skizzier-Werkzeugleiste sind keine Muster im Katalog; neue Muster gibt es
     nur per ADR (ADR-061). Im Prototyp gebaut, Aufnahme in den Katalog entscheidet das Kernteam.
  3. Dieser Change zieht einen Teil von ap-12 (Skizze und Extrusion) als Prototyp-Stufe vor ap-06, ap-08b und
     ap-39 vor, ohne Identität der entstehenden Flächen; ap-53 hat noch keine Zeile in der Arbeitspaket-Tabelle von
     `docs/konzept.md`.
  4. Die Begriffe Skizze, Bereich, Hochziehen und Körper fehlen in `docs/glossar.md`.
- **Gate:** G2 (M1 Modellieren); Baustein, nicht das G2-Kriterium.
- **Abnahmetests:** `tests/acceptance/ap-53-skizze-hochziehen/` (AK-1 bis AK-13, Zuordnung in design.md
  Abschnitt 9); Worker direkt per `uv run`, Vorschau per `npm --prefix spikes/ux-prototyp-2 run --silent pruefen --
  skizze <unterbefehl> --json`. Zwei Scenarios `[mensch]` („Ausprobieren“, „Bedienung fühlt sich direkt an“)
  werden Punkte der PR-Checkliste „Menschliche Abnahme“.
- **Referenzdaten:** keine Dateien unter `tests/golden/`. Alle Sollwerte rechnet der Test nach: Rechtecke, Kreise
  und Prismen analytisch; der Abnahmefall Halter leitet seine Maße aus `Params()` in `parts/examples/halter.py`
  ab und baut die Vergleichsform selbst mit build123d.
- **Abhängigkeiten (Entscheidung, Eintrag in die Warteschlange später durch das Kernteam):** `depends_on:
  [ap-50-wireframe-basics, ap-52-ki-konstruktion-wireframe]` – ap-50 für Brücke, Worker, Ebenen, Befehle und
  Testzustände, ap-52 für Werkzeugliste, Änderungssatz und Testmodell der KI-Scenarios (design.md Open Question 1).
- **Abhängigkeiten im Code (Prototyp, ADR-034):** `three-mesh-bvh` (MIT), `camera-controls` (MIT),
  `three-viewport-gizmo` (MIT), optional `postprocessing` (Zlib); OutlinePass, Line2 und TransformControls kommen
  aus `three/examples/jsm` (MIT, schon vorhanden). Worker: keine neuen Pakete.
- **Umfang:** drei Task-Gruppen, höchstens etwa drei Nächte; `night: true`-tauglich (alles außer zwei
  `[mensch]`-Scenarios automatisch prüfbar).
- **Nicht-Ziele:**
  - keine Zwangsbedingungen, kein PlaneGCS, keine bleibenden Bemaßungen (ADR-027, ap-12); getippte Maße werden
    Parameterwerte
  - keine Bögen, Splines, Polygone, Trimmen, Versatz, Spiegeln in Skizzen; keine Kurven-zu-Kurven-Bezüge
  - keine booleschen Operationen (Abziehen, Vereinigen), kein Drehen, Loft, Sweep, keine Verrundung oder Fase
    (ap-45); der Halter entsteht deshalb als zwei Körper ohne Verrundung
  - keine Skizze auf einer Körperfläche, keine Flächen- oder Kanten-IDs, keine Topologie-Historie (ap-39, ap-12)
  - kein Export (ap-47), keine Eigenschaften wie Masse oder Material (ap-18, ADR-039)
  - kein Radialmenü (kein Muster), kein `three-cad-viewer`
  - keine Produkt-Oberfläche in `client/` (ap-08b), kein Server, keine Zusammenarbeit
  - keine Änderung am Rust-Kern, an `SCHEMA_VERSION` oder an der Einheitentabelle
  - keine Erweiterung der Satzerkennung aus ap-52 und kein neuer Prüfsatz für die KI
