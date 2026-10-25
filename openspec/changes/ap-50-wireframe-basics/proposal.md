## Why

Bisher rechnet in CEE nichts mit dem echten Geometriekern: Der Worker unter `worker/` ist ein Gerüst, die
Oberfläche (Prototyp aus ap-41b/ap-41c) zeigt fest eingebaute Quader und Zylinder. Das Kernteam will echtes
Modellieren mit dem echten Kern (OpenCascade über build123d/OCP hinter der Kernel-Schnittstelle, ADR-032), aber
ausdrücklich **nicht alles auf einmal**. Die erste kleine Stufe sind die **Wireframe-Basics**: Koordinatensysteme,
Punkte und Linien als Elemente im Graphen (ADR-028), vom Worker exakt berechnet, im Modell sichtbar, wählbar,
ausblendbar und verwerfbar über das bestehende Befehlsregister. Diese Stufe ist klein genug für höchstens drei
Nächte, macht den Weg Graph → Kernel-Nachricht → Worker → Ergebnis → Ansicht einmal durchgängig und ist die
Grundlage, auf die Skizzen, Extrusion und Volumen später aufsetzen.

## What Changes

- **Elementtypen der Wireframe-Basics** als Typdefinitionen (Daten, nicht im Kern-Code; ADR-046, ADR-057) in
  `format/types/drahtmodell.json`: `frame` (Koordinatensystem, Grundtyp), `point`, `axis`, `plane`, `line`
  (Gerade), `ray` (Halbgerade), `segment` (Strecke). Jede Zahl ist eine Größe mit Einheit.
- **Koordinatensystem setzen:** Ein `frame` mit Ursprung (x, y, z) und Drehung (rx, ry, rz), optional in einem
  übergeordneten Koordinatensystem. Ursprung, drei Achsen und drei Ebenen sind eigene Kind-Elemente im `content`
  des Koordinatensystems, damit sie einzeln wählbar, ausblendbar und referenzierbar sind.
- **Punkte setzen** auf drei Wegen, alle mit demselben Elementtyp `point`: frei (Klick im Modell auf die
  XY-Ebene des gewählten Koordinatensystems), auf Koordinaten (Werte mit Einheit in den Eigenschaften) und
  relativ zu einem anderen Punkt (Eingang `ref`, Versatz x, y, z). Ein relativer Punkt folgt seinem Bezug.
- **Gerade, Halbgerade, Strecke durch zwei Punkte** (Eingänge `a` und `b`). Referenzen gehen nur auf benannte
  Ausgänge (`<id>.point`, `<id>.start`, `<id>.origin` …), nie auf Indizes (ADR-016).
- **Kernel-Schnittstelle, erste Fassung** `format/kernel/` (Protokoll `cee-kernel/0`, JSON-Schemas für Auftrag
  und Ergebnis) und **Worker-Modul `cee_worker.kernel`**, das die Elemente mit OCP/build123d berechnet: exakte
  Lage, Inhalts-Hash je Element, Befunde statt Absturz (ADR-050), deterministisch.
- **Auftrag aus dem Graphen:** `cee_worker.auftrag` baut die Kernel-Nachricht über das Python-SDK (Prüfung und
  Reihenfolge aus dem Rust-Kern, ADR-029); Einheiten rechnet nur der Kern um.
- **Vorschau im Prototyp** `spikes/ux-prototyp-2/`: lokale Brücke zum Worker (nur `127.0.0.1`, Worker als
  eigener Prozess mit Zeitlimit und Neustart), sechs neue Befehle mit echter Wirkung im Befehlsregister (nach
  der Platzhalter-Regel aus ap-41c erscheinen sie damit in Menü und Kontextmenü), Darstellung von Punkten,
  Linien, Achsen und Ebenen, Auswahl per Klick, Ausblenden und Verwerfen mit den vorhandenen Befehlen.
- **Prüfbefehle** für die Vorschau (`pruefen -- drahtmodell …`) und eine Klick-Anleitung zum Ausprobieren.

## Capabilities

### New Capabilities

- `kernel-protokoll`: versionierte Nachrichten-Schnittstelle zwischen Graph und Geometriekern (Auftrag,
  Ergebnis, Inhalts-Hash, Befunde, Determinismus, Worker als eigener Prozess); erste Fassung für die
  Wireframe-Basics, ap-06 baut sie aus.
- `drahtmodell`: Elementtypen Koordinatensystem, Punkt, Achse, Ebene, Gerade, Halbgerade, Strecke mit ihrer
  exakten Berechnung im Worker.
- `drahtmodell-vorschau`: Bedienung der Wireframe-Basics im Prototyp (Befehle, Darstellung, Auswahl,
  Ausblenden, Verwerfen) über das bestehende Befehlsregister. Prototyp-Verhalten wie ap-41b; beim Archivieren
  entscheidet das Kernteam, ob es nach `openspec/specs/` übernommen wird (Vorschlag: nein, die Produkt-Oberfläche
  kommt mit ap-08b).

### Modified Capabilities

Keine. (`graph-kern`, `einheiten`, `python-sdk` werden nur benutzt, nicht geändert; keine neue `SCHEMA_VERSION`.)

## Nicht in diesem Change (Folgestufen, Vorschlag zur Reihenfolge)

1. **Wireframe, zweite Stufe:** Ebene durch drei Punkte bzw. Punkt und Normale, Punkt auf Linie oder Ebene,
   Schnittpunkt zweier Linien, Lot und Abstand messen.
2. **Skizzen auf Ebenen** (ap-12, erster Teil): Skizzenelemente auf einer Ebene dieses Changes, nur mit Maßen;
   Zwangsbedingungen erst nach dem Löser-Vergleich (ADR-027, ADR-062 Offene Frage 1).
3. **Extrusion** (ap-12, zweiter Teil) mit Identität der entstehenden Flächen (setzt ap-39 voraus).
4. **Volumenmodellierung** (ap-45): Drehen, Loft, Sweep, Schale, Verrundung, Fase, Muster, boolesche Operationen.

Begründung: Jede Stufe nutzt die vorige als Bezug (Skizze braucht Ebene, Extrusion braucht Skizze), und erst ab
Stufe 3 entstehen abgeleitete Flächen und Kanten, für die die persistente Identität (ADR-016, ap-39) gebraucht
wird.

## Impact

- **Betroffene ADRs:** ADR-028 (Elemente in gleicher Form, `content` als Untergraph), ADR-029 (Reihenfolge,
  Prüfung und Einheiten nur aus dem Rust-Kern über das SDK), ADR-032 (Geometrie nur im Worker hinter
  `format/kernel/`, nie gespeichert; Worker als eigener Prozess mit Zeitlimit und Neustart), ADR-016 (Referenzen
  nur über benannte Ausgänge; Wireframe-Elemente erzeugen keine abgeleitete Topologie, daher noch keine
  Topologie-Historie nötig), ADR-057 (Größen mit Einheit, kanonisch mm und rad, Umrechnung nur im Kern),
  ADR-050 (Befund statt Absturz, unabhängige Elemente rechnen weiter), ADR-045 (ein Befehlsregister), ADR-065
  (Platzierungsregel Punkt 12, Ausblenden nur in der Ansicht Punkt 9, Kontextaktionen Punkt 3), ADR-051
  (Verwerfen statt Löschen), ADR-015 (Sichtbarkeit wirkt nicht auf den Export), ADR-046 (kein Elementtyp im
  Kern-Code), ADR-062 (CAD zuerst), ADR-034 (keine neuen Abhängigkeiten außer der Arbeitsbereichs-Abhängigkeit
  des Workers auf `cee-sdk`, Apache-2.0). ADR-027 ist nicht betroffen (keine Skizzen).
- **Ausdrücklich gemeldete Abweichungen** (Entscheidung beim Kernteam, design.md „Open Questions“):
  1. ADR-062 Punkt 8 (kritischer Pfad ap-39 → ap-06 → ap-08a → ap-08b → ap-12): Dieser Change zieht eine erste
     Fassung der Kernel-Schnittstelle und des Workers vor ap-39 und ap-06 vor. Das ist ein Auftrag des Kernteams;
     ap-06 übernimmt und erweitert `cee-kernel/0` (Cache, Detailstufen, Überwachung im Server) statt neu zu
     beginnen. Kein Widerspruch zu ADR-016, weil keine abgeleitete Topologie entsteht.
  2. `ap-50-wireframe-basics` hat noch keine Zeile in der Arbeitspaket-Tabelle von `docs/konzept.md`.
  3. Die Vorschau entsteht im Wegwerf-Prototyp `spikes/ux-prototyp-2/`, nicht in `client/`, weil
     Befehlsregister und Arbeitsfläche als Produktcode erst mit ap-08a/ap-08b kommen. Worker, Kernel-Schnittstelle
     und Typdefinitionen sind dagegen Produktcode.
- **Gate:** G2 (M1 Modellieren); dieser Change ist ein Baustein, nicht das G2-Kriterium.
- **Abnahmetests:** `tests/acceptance/ap-50-wireframe-basics/` (AK-1 bis AK-16, Zuordnung in design.md); Worker und
  Kern direkt per `uv run`, die Vorschau per Prüfbefehl `npm --prefix spikes/ux-prototyp-2 run --silent pruefen
  -- <befehl> --json`. Ein Scenario `[mensch]` („Ausprobieren“) mit Klick-Anleitung in design.md wird Punkt der
  PR-Checkliste „Menschliche Abnahme“.
- **Referenzdaten:** keine. Alle Sollwerte (Lagen, Richtungen, Längen) rechnet der Test aus den Parametern selbst
  nach; es gibt keine Dateien unter `tests/golden/ap-50-wireframe-basics/`.
- **Abhängigkeiten (Vorschlag für die Warteschlange):** `depends_on: [ap-40-bindungen-sdk,
  ap-41b-ux-bedienkonzept, ap-41c-ux-schlankes-menue]`. ap-40 (und damit ap-05a/ap-05b) ist fertig; ap-41b
  liefert Prototyp und Register, ap-41c die Platzhalter-Regel. Nicht abhängig von ap-39, ap-06 und
  ap-49-spike-auswahl (Auswahl nur per Klick, keine Auswahl nach Regel).
- **Umfang:** drei Task-Gruppen, höchstens etwa drei Nächte (Kern und Worker, Auftrag und Robustheit, Vorschau).
- **Nicht-Ziele** (spätere Changes bzw. Meilensteine nach ADR-059/ADR-062):
  - keine Skizzen, keine Extrusion, keine Volumenkörper, keine Flächen außer der Darstellung von Ebenen
    (Folgestufen oben, ap-12, ap-45)
  - keine Topologie-Historie und keine Unter-IDs von Flächen oder Kanten (ap-39, ap-06)
  - kein Cache nach Inhalts-Hash, keine Detailstufen, keine Überwachung im Server oder Tauri-Host (ap-06); der
    Hash wird berechnet und geliefert, aber nicht gespeichert
  - keine Produkt-Oberfläche in `client/`, kein Befehlsregister als Produktcode (ap-08a, ap-08b)
  - keine Zusammenarbeit, kein Server, kein Speichern in einer Datenbank (ap-07a, ap-07b); der Graph lebt in der
    Vorschau im Browser
  - keine Auswahl nach Regel, kein Auswahlfilter, kein Fangen (Snapping) an Raster oder Geometrie
    (ap-49-spike-auswahl, ap-08b)
  - keine Änderung am Rust-Kern und an `SCHEMA_VERSION`; keine neuen Einheiten
  - kein Export (ap-47), keine KI-Befehle über MCP (ap-15)
