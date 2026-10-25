## Why

ap-50-wireframe-basics bringt Koordinatensysteme, Punkte und Linien mit dem echten Geometriekern (Worker,
OpenCascade). Für Skizzen auf beliebigen Ebenen und für einfache Konstruktionen fehlt die zweite Stufe, die ap-50
unter „Nicht in diesem Change“, Punkt 1, nennt: **Ebenen aus Punkten bzw. Punkt und Normale, Punkte auf Linien
oder Ebenen, Schnittpunkte, Lot und Abstand**. Erst damit lassen sich Bezüge frei im Raum aufbauen und
nachprüfen. Der Change bleibt schlank (2 bis 3 Nächte): wenige Elementtypen, wenige Tests, die mit dem echten
Kern belegen, dass es stimmt, und ein Ausprobieren durch den Menschen als eigentliches Tor.

## What Changes

- **Sechs neue Elementtypen** als Daten in `format/types/drahtmodell.json` (Ergänzung der ap-50-Datei, ADR-046):
  `plane_3p` (Ebene durch drei Punkte), `plane_pn` (Ebene durch Punkt und Normale), `point_on_curve` (Punkt auf
  Gerade, Halbgerade, Strecke oder Achse), `point_on_plane` (Punkt auf Ebene), `intersection` (Schnittpunkt
  zweier Linien), `perpendicular` (Lot von einem Punkt auf eine Linie oder Ebene). Jede Zahl ist eine Größe mit
  Einheit (ADR-057).
- **Abstand messen** als Befehl ohne Änderung des Graphen: Der Worker berechnet den kürzesten Abstand und die
  beiden Fußpunkte zwischen zwei Bezügen (Punkt, Linie, Ebene); das Ergebnis erscheint in der Rückmeldezeile und
  als vorübergehende Markierung.
- **Berechnung im Worker** (`cee_worker.kernel`, ADR-032) mit OCP; gemeldete Werte werden aus den OCP-Objekten
  zurückgelesen. Additive Erweiterung von `cee-kernel/0`: neue Befund-Codes `parallel`, `no_intersection`,
  `out_of_range` und das Ergebnis `distance` für Messungen.
- **Sechs neue Befehle mit echter Wirkung** im Befehlsregister des Prototyps `spikes/ux-prototyp-2/` (Familie
  „Referenz“ aus ap-50, ohne `folgt`, Platzhalter-Regel aus ap-41c). Jeder Befehl beschreibt seine Argumente
  (Bezüge und Werte) im Register und lässt sich per Klick oder ohne Klick nur mit Argumenten ausführen; beide
  Wege ergeben denselben Graphen. Das ist dieselbe Befehlsform, die später die KI über MCP nutzt (ADR-045).
- **Vorschau** der neuen Elemente mit der Darstellung aus ap-50 (Punkte, Ebenen, Strecken); keine neuen
  Größenvorgaben für Oberfläche oder Menü.

## Capabilities

### New Capabilities

- `drahtmodell-ebenen`: Elementtypen und exakte Berechnung von Ebene aus drei Punkten bzw. Punkt und Normale,
  Punkt auf Linie oder Ebene, Schnittpunkt zweier Linien, Lot und Abstand im Worker.
- `drahtmodell-ebenen-vorschau`: die sechs Befehle im Register des Prototyps (Klick und Argumente),
  Darstellung und das Ausprobieren. Prototyp-Verhalten wie `drahtmodell-vorschau` aus ap-50; beim Archivieren
  entscheidet das Kernteam über die Übernahme (Vorschlag: nein, die Produkt-Oberfläche kommt mit ap-08b).

### Modified Capabilities

Keine. `kernel-protokoll` und `drahtmodell` aus ap-50 sind noch nicht archiviert; die Erweiterung ist additiv
und steht als Requirement in `drahtmodell-ebenen`. Rust-Kern und `SCHEMA_VERSION` bleiben unverändert.

## Impact

- **Betroffene ADRs:** ADR-028 (gleiche Elementform), ADR-029 (Prüfung, Reihenfolge, Einheiten nur aus dem
  Rust-Kern über das SDK), ADR-032 (Geometrie nur im Worker hinter `format/kernel/`, Messwerte nicht
  gespeichert), ADR-016 (Bezüge nur über benannte Ausgänge, keine abgeleitete Topologie), ADR-057 (Größen mit
  Einheit, Umrechnung nur im Kern), ADR-050 (Befund statt Absturz), ADR-045 (ein Befehlsregister für Klick,
  Suche und später MCP), ADR-065 (Platzierungsregel Punkt 12, Kontextaktionen Punkt 3), ADR-051 (Verwerfen statt
  Löschen), ADR-046 (kein Elementtyp im Kern-Code), ADR-062 (CAD zuerst), ADR-059 (Reihenfolge der
  Meilensteine), ADR-034 (keine neuen Abhängigkeiten). Kein Widerspruch zu einem ADR; die Lage im kritischen
  Pfad (vor ap-39/ap-06) erbt dieser Change von ap-50 (dort als Abweichung gemeldet).
- **Gate:** G2 (M1 Modellieren); Baustein, nicht das G2-Kriterium.
- **Abnahmetests:** `tests/acceptance/ap-51-wireframe-ebenen/` (AK-1 bis AK-5, Zuordnung in design.md). Kern
  direkt per `uv run`, Sollwerte rechnet der Test selbst nach; Vorschau per Prüfbefehl aus ap-50. Das Scenario
  `[mensch]` „Ausprobieren“ mit Klick-Anleitung (design.md Abschnitt 6) ist das eigentliche Tor.
- **Referenzdaten:** keine (`tests/golden/ap-51-wireframe-ebenen/` entfällt).
- **Abhängigkeiten (Vorschlag für die Warteschlange):** `depends_on: [ap-50-wireframe-basics]`.
- **Umfang:** zwei Task-Gruppen, 2 bis 3 Nächte (Worker, Vorschau).
- **Nicht-Ziele** (spätere Changes bzw. Meilensteine nach ADR-059/ADR-062):
  - keine Skizzen, keine Extrusion, keine Volumen (Folgestufen aus ap-50, ap-12, ap-45)
  - keine Schnitte von Ebenen mit Ebenen oder Linien mit Ebenen als neue Elemente, keine Winkelmessung, keine
    Kreise oder Kurven
  - keine echten MCP-Werkzeuge und keine KI-Anbindung (ap-15, M3); dieser Change liefert nur die
    Argumentbeschreibung im Register und das Ausführen ohne Klick
  - keine dauerhaften Messelemente (Open Question 1), keine Maße oder Zwangsbedingungen (ADR-027)
  - kein Fangen (Snapping), keine Auswahl nach Regel (ap-49, ap-08b)
  - keine neuen Zahlenvorgaben für Menü- oder Oberflächengrößen; Grenzen aus ap-41b/ap-41c gelten weiter
  - keine Produkt-Oberfläche in `client/`, kein Server, kein Cache (ap-08a, ap-08b, ap-06, ap-07a)
  - keine Änderung an `crates/` und an `SCHEMA_VERSION`
