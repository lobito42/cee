## Why

ap-50-wireframe-basics bringt Koordinatensysteme, Punkte und Linien mit dem echten Geometriekern (Worker,
OpenCascade). Für Skizzen auf beliebigen Ebenen und für einfache Konstruktionen fehlt die zweite Stufe, die ap-50
unter „Nicht in diesem Change“, Punkt 1, nennt: **Ebenen aus Punkten bzw. Punkt und Normale, Punkte auf Linien
oder Ebenen, Schnittpunkte, Lot und Abstand**. Erst damit lassen sich Bezüge frei im Raum aufbauen und
nachprüfen. Wunsch des Kernteams: **Ein Punkt ist ein Element mit genau einer Herkunft**; alle Wege, einen Punkt
zu bestimmen, nutzen dieselbe Form, statt getrennter Typen, die später zusammenwachsen müssten. Der Change bleibt
schlank (2 bis 3 Nächte): wenige Tests, die mit dem echten Kern belegen, dass es stimmt, und ein Ausprobieren
durch den Menschen als eigentliches Tor.

## What Changes

- **Punkt mit Herkunft:** Der Typ `point` aus ap-50 bekommt den Parameter `herkunft` (getaggte Variante, Text).
  Herkünfte: `koordinaten` und `relativ` (beide aus ap-50, unverändert gerechnet), neu `auf` (auf Linie oder
  Ebene), `schnitt` (Schnittpunkt zweier Linien), `projektion` (Lotfußpunkt eines Punktes auf Linie oder Ebene),
  `mitte` (Mittelpunkt einer Strecke). Je Herkunft sind Eingänge und Parameter festgelegt. Punkte aus ap-50 ohne
  `herkunft` gelten weiter (Regel in design.md); ap-50 muss dafür nicht geändert werden.
- **Ebene mit Herkunft:** Nach demselben Muster bekommt `plane` aus ap-50 den Parameter `herkunft`: `von` (ap-50,
  Kind-Ebene eines Koordinatensystems), neu `drei_punkte` und `punkt_normale`.
- **Erweiterungspunkt:** Neue Herkünfte (z. B. Ecke eines Körpers, Schnitt oder Projektion auf echte Flächen)
  kommen als neuer Eintrag in der Herkunftstabelle des Workers hinzu, ohne Umbau von Typ, Protokoll oder Befehlen.
  Sie selbst sind Folgestufe (mit Extrusion und persistenter Identität, ap-39).
- **Abstand messen** als Befehl ohne Änderung des Graphen: Der Worker berechnet den kürzesten Abstand und die
  beiden Fußpunkte zwischen zwei Bezügen (Punkt, Linie, Ebene).
- **Berechnung im Worker** (`cee_worker.kernel`, ADR-032) mit OCP; gemeldete Werte werden aus den OCP-Objekten
  zurückgelesen. Additive Erweiterung von `cee-kernel/0`: Befund-Codes `parallel`, `no_intersection`,
  `out_of_range`, `unknown_herkunft` und das Feld `messungen`.
- **Sieben neue Befehle mit echter Wirkung** im Befehlsregister des Prototyps `spikes/ux-prototyp-2/` (Familie
  „Referenz“ aus ap-50, ohne `folgt`, Platzhalter-Regel aus ap-41c). Jeder Befehl beschreibt seine Argumente im
  Register und lässt sich per Klick oder ohne Klick nur mit Argumenten ausführen; beide Wege ergeben denselben
  Graphen. Das ist dieselbe Befehlsform, die später die KI über MCP nutzt (ADR-045).
- **Vorschau** mit der Darstellung aus ap-50; keine neuen Größenvorgaben für Oberfläche oder Menü.

## Capabilities

### New Capabilities

- `drahtmodell-ebenen`: Herkünfte von Punkt und Ebene, ihre exakte Berechnung im Worker, Abstand messen und die
  additive Erweiterung von `cee-kernel/0`.
- `drahtmodell-ebenen-vorschau`: die sieben Befehle im Register des Prototyps (Klick und Argumente),
  Darstellung und das Ausprobieren. Prototyp-Verhalten wie `drahtmodell-vorschau` aus ap-50; beim Archivieren
  entscheidet das Kernteam über die Übernahme (Vorschlag: nein, die Produkt-Oberfläche kommt mit ap-08b).

### Modified Capabilities

- `drahtmodell` (aus ap-50): Die Requirements „Punkt“ und die Ebene als Kind eines Koordinatensystems werden um
  `herkunft` erweitert. Da ap-50 noch nicht archiviert ist, gibt es `drahtmodell` noch nicht unter
  `openspec/specs/`; ein formales `MODIFIED` ist deshalb erst nach dem Archivieren von ap-50 möglich. Hier steht
  die Erweiterung als ADDED Requirement „Punkt und Ebene mit Herkunft“ in `drahtmodell-ebenen`; beim Archivieren
  wird es in `drahtmodell` eingearbeitet. Die Erweiterung ist rückwärtsverträglich: Abnahmetests und Beispiel von
  ap-50 bleiben unverändert gültig (AK-4 prüft das).

## Impact

- **Betroffene ADRs:** ADR-028 (gleiche Elementform; eine Form je Punkt statt vieler Typen), ADR-029 (Prüfung,
  Reihenfolge, Einheiten nur aus dem Rust-Kern über das SDK), ADR-032 (Geometrie nur im Worker hinter
  `format/kernel/`, Messwerte nicht gespeichert), ADR-016 (Bezüge nur über benannte Ausgänge; Herkünfte auf
  abgeleiteter Topologie erst mit ap-39), ADR-057 (Größen mit Einheit, Umrechnung nur im Kern), ADR-050 (Befund
  statt Absturz), ADR-045 (ein Befehlsregister für Klick, Suche und später MCP), ADR-065 (Platzierungsregel
  Punkt 12, Kontextaktionen Punkt 3), ADR-051 (Verwerfen statt Löschen), ADR-046 (kein Elementtyp und keine
  Herkunft im Kern-Code), ADR-062 (CAD zuerst), ADR-059 (Reihenfolge der Meilensteine), ADR-034 (keine neuen
  Abhängigkeiten). Kein Widerspruch zu einem ADR; die Lage im kritischen Pfad (vor ap-39/ap-06) erbt dieser
  Change von ap-50.
- **Abhängigkeit und Änderung an ap-50:** Keine Datei von ap-50 muss geändert werden. Die Umsetzung von ap-51
  ergänzt `format/types/drahtmodell.json` und die Typtabelle des Workers aus ap-50 um `herkunft`. Wird ap-50 noch
  nicht umgesetzt, wenn ap-51 freigegeben wird, kann die Umsetzung von ap-50 `herkunft` gleich mit anlegen; die
  Regel für fehlende `herkunft` deckt beide Reihenfolgen ab.
- **Gate:** G2 (M1 Modellieren); Baustein, nicht das G2-Kriterium.
- **Abnahmetests:** `tests/acceptance/ap-51-wireframe-ebenen/` (AK-1 bis AK-5, Zuordnung in design.md). Kern
  direkt per `uv run`, Sollwerte rechnet der Test selbst nach; Vorschau per Prüfbefehl aus ap-50. Das Scenario
  `[mensch]` „Ausprobieren“ mit Klick-Anleitung (design.md Abschnitt 6) ist das eigentliche Tor.
- **Referenzdaten:** keine (`tests/golden/ap-51-wireframe-ebenen/` entfällt).
- **Abhängigkeiten (Vorschlag für die Warteschlange):** `depends_on: [ap-50-wireframe-basics]`.
- **Umfang:** zwei Task-Gruppen, 2 bis 3 Nächte (Worker, Vorschau).
- **Nicht-Ziele** (spätere Changes bzw. Meilensteine nach ADR-059/ADR-062):
  - keine Herkunft auf Körpern: keine Ecke eines Körpers, kein Schnitt oder Projektion auf echte Flächen oder
    Kanten (mit Extrusion und persistenter Identität, ap-39, ap-12)
  - kein Mittelpunkt von Kreisen (mit den Skizzen), keine Kurven
  - keine Skizzen, keine Extrusion, keine Volumen (Folgestufen aus ap-50, ap-12, ap-45)
  - keine Schnittlinie zweier Ebenen, keine Winkelmessung
  - keine echten MCP-Werkzeuge und keine KI-Anbindung (ap-15, M3); dieser Change liefert nur die
    Argumentbeschreibung im Register und das Ausführen ohne Klick
  - keine dauerhaften Messelemente (Open Question 1), keine Maße oder Zwangsbedingungen (ADR-027)
  - kein Fangen (Snapping), keine Auswahl nach Regel (ap-49, ap-08b)
  - kein Wechsel der Herkunft eines bestehenden Punktes (Open Question 3)
  - keine neuen Zahlenvorgaben für Menü- oder Oberflächengrößen; Grenzen aus ap-41b/ap-41c gelten weiter
  - keine Produkt-Oberfläche in `client/`, kein Server, kein Cache (ap-08a, ap-08b, ap-06, ap-07a)
  - keine Änderung an `crates/` und an `SCHEMA_VERSION`
