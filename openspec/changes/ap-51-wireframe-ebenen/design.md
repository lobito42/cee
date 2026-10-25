## Context

Siehe proposal.md – Why. Baut vollständig auf ap-50-wireframe-basics auf: Typdatei
`format/types/drahtmodell.json`, Kernel-Schnittstelle `cee-kernel/0` (`format/kernel/`), Worker-Modul
`cee_worker.kernel` mit `rechnen(auftrag)` und `formen(auftrag)`, Auftrag über `cee_worker auftrag`, Brücke und
Prüfbefehl `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- drahtmodell befehle|ablauf --json`,
Familie und Dropdown „Referenz“. Notation, Toleranzen und Ausgabeformen (`point`, `line`, `ray`, `segment`,
`plane`) wie ap-50 design.md Abschnitte 2 und 3.

Spielregeln des Kernteams (2026-10-25): schlank (2 bis 3 Nächte), keine neuen Zahlenvorgaben für Menü- oder
Oberflächengrößen, wenige Tests, die den Kern direkt prüfen und Werte selbst nachrechnen, Ausprobieren durch den
Menschen als Tor, neue Befehle nur mit echter Wirkung.

## Goals / Non-Goals

**Goals:** Die sechs Elementtypen und die Messung rechnen im echten Kern richtig; die sechs Befehle wirken per
Klick und per Argumenten gleich; der Mensch kann es ausprobieren.

**Non-Goals:** siehe proposal.md – Nicht-Ziele.

## Decisions

### 1. Elementtypen (Ergänzung `format/types/drahtmodell.json`)

„Linie“ heißt im Folgenden jeder Ausgang vom Typ `line`, `ray` oder `segment` (also auch Achsen und
`K.x`). Längen: Dimension `length`, Standard-Einheit `mm`.

| Typ | Eingänge | Parameter | Ausgänge |
| --- | --- | --- | --- |
| `plane_3p` | `a`, `b`, `c` (point) | – | `plane` |
| `plane_pn` | `point` (point), `normal` (Linie) | – | `plane` |
| `point_on_curve` | `on` (Linie) | `t` (length) | `point` |
| `point_on_plane` | `on` (plane) | `u`, `v` (length) | `point` |
| `intersection` | `a`, `b` (Linie) | – | `point` |
| `perpendicular` | `from` (point), `to` (Linie oder plane) | – | `foot` (point), `segment` (segment) |

Erlaubte Eingangstypen ergänzt die Typtabelle `cee_worker/kernel/typen.py`; der Rust-Kern bleibt unverändert.
Zwei Typen für „Punkt auf …“ statt einem, weil Linie und Ebene verschiedene Parameter haben (`t` bzw. `u`, `v`);
der Befehl wählt den Typ nach dem gewählten Bezug.

### 2. Geometrie (Sollwerte, die der Test nachrechnet)

Toleranzen wie ap-50: `TOL_LINEAR = 1e-6 mm`, `TOL_ANGULAR = 1e-9 rad`; Abnahme Lagen und Längen auf 1e-6 mm,
Richtungen auf 1e-9 rad.

- **`plane_3p`:** Ursprung `p_a`, Normale `n = (p_b − p_a) × (p_c − p_a)` normiert, Bezugsrichtung
  `(p_b − p_a)` normiert. Entartet (Befund `degenerate`), wenn `|p_b − p_a|` oder `|p_c − p_a|` kleiner als
  `TOL_LINEAR` ist oder `|n_roh| / (|p_b − p_a|·|p_c − p_a|) < TOL_ANGULAR` (drei Punkte auf einer Geraden).
- **`plane_pn`:** Ursprung `p`, Normale = Richtung der Linie. Bezugsrichtung: `h = e_x`, falls `|n·e_x| ≤ 0,9`,
  sonst `h = e_y`; Bezugsrichtung `= (h − (h·n)·n)` normiert. (Feste Regel, damit der Test sie nachrechnen kann.)
- **`point_on_curve`:** `p = origin + t·direction` (Strecke: `origin = start`). Halbgerade mit `t < −TOL_LINEAR`
  oder Strecke mit `t` außerhalb `[−TOL_LINEAR, length + TOL_LINEAR]` → Befund `out_of_range`, kein Ausgang.
- **`point_on_plane`:** `p = origin + u·x_direction + v·(normal × x_direction)`.
- **`intersection`:** Fußpunkte der kürzesten Verbindung beider Trägergeraden. `|d_a × d_b| < TOL_ANGULAR` →
  Befund `parallel`. Abstand der Fußpunkte `> TOL_LINEAR` → Befund `no_intersection` (windschief), Hinweis nennt
  den Abstand als Größe. Liegt ein Fußpunkt außerhalb einer Halbgeraden oder Strecke (Toleranz wie oben) →
  `no_intersection`. Sonst Ausgang `point` = Mittelpunkt der beiden Fußpunkte.
- **`perpendicular`:** `foot` = Projektion von `p_from` auf die Trägergerade bzw. Ebene (bei Halbgerade und
  Strecke auf die Trägergerade, auch außerhalb; Ausgang `foot` trägt dann `"auf_element": false`). `segment` von
  `p_from` nach `foot`; liegt `p_from` auf dem Ziel (Länge `< TOL_LINEAR`), fehlt `segment` ohne Befund.
- **Abstand (Messung):** kürzester Abstand und Fußpunkte zwischen zwei Bezügen aus {Punkt, Linie, Ebene}; bei
  Halbgerade und Strecke unter Beachtung der Begrenzung. Linie–Ebene und Ebene–Ebene: 0 mm, wenn nicht parallel.

**Echter Kern:** `plane_3p`/`plane_pn` als `Geom_Plane` auf `gp_Ax3`; Punkte als `TopoDS_Vertex`; Projektionen
mit `GeomAPI_ProjectPointOnCurve` bzw. `GeomAPI_ProjectPointOnSurf`; Schnittpunkt und Linie–Linie-Abstand mit
`GeomAPI_ExtremaCurveCurve` auf `Geom_Line` (unbegrenzt) bzw. `BRepExtrema_DistShapeShape` (begrenzte Kanten).
Gemeldete Werte werden aus diesen Objekten gelesen, nicht aus der Formel. OCP-Importe nur unter
`worker/src/cee_worker/kernel/`.

### 3. Erweiterung `cee-kernel/0` (additiv)

- Neue Befund-Codes in `format/kernel/ergebnis.schema.json` und README: `parallel`, `no_intersection`,
  `out_of_range` (Hinweis als Übersetzungsschlüssel mit Korrekturvorschlag).
- **Messung:** Der Auftrag darf ein Feld `"messungen": [{"id", "a", "b"}]` tragen (`a`, `b` als `<id>.<output>`).
  Das Ergebnis bekommt `"messungen": [{"id", "distance": Größe, "foot_a": [Größe ×3], "foot_b": [Größe ×3]}]`
  oder einen Befund. Messungen sind keine Elemente, gehen in keinen Inhalts-Hash ein und werden nicht gespeichert
  (ADR-032).
- `protocol` bleibt `cee-kernel/0`; ap-50-Aufträge ohne `messungen` liefern bytegleiche Ergebnisse wie vorher.

### 4. Befehle (Prototyp, `spikes/ux-prototyp-2/src/befehle.json`)

Alle ohne `folgt`, Familie „Referenz“ (aus ap-50), Untergruppen nach Wahl der Umsetzung. Neu ist das Feld
`argumente` je Befehl: Liste `{name, art: "bezug"|"wert", typen | dimension}`. Ein Befehl lässt sich auf zwei
Wegen ausführen: per Klick (fehlende Bezüge per Klick im Modell nachfordern, Esc bricht ohne Änderung ab) und
per `{befehl, args}` mit allen Argumenten ohne Klick. Beide Wege führen dieselbe Funktion aus. Diese Form
übernimmt ap-15 später für MCP (ADR-045); MCP selbst kommt nicht in diesen Change.

| ID | Titel (de) | Argumente | Wirkung |
| --- | --- | --- | --- |
| `referenz.ebene-drei-punkte` | Ebene durch drei Punkte | `a`, `b`, `c` (point) | legt `plane_3p` an |
| `referenz.ebene-punkt-normale` | Ebene durch Punkt und Normale | `point` (point), `normal` (Linie) | legt `plane_pn` an |
| `referenz.punkt-auf` | Punkt auf Linie oder Ebene | `on` (Linie oder plane), `t` bzw. `u`, `v` (length, optional) | legt `point_on_curve` bzw. `point_on_plane` an; per Klick aus der Klickstelle (nächster Punkt auf der Linie bzw. Schnitt des Sichtstrahls mit der Ebene), danach in den Eigenschaften änderbar |
| `referenz.schnittpunkt` | Schnittpunkt zweier Linien | `a`, `b` (Linie) | legt `intersection` an |
| `referenz.lot` | Lot fällen | `from` (point), `to` (Linie oder plane) | legt `perpendicular` an |
| `referenz.abstand` | Abstand messen | `a`, `b` (point, Linie oder plane) | ändert den Graphen nicht; Ergebnis in der Rückmeldezeile („Abstand: 42,5 mm“) und als vorübergehende Strecke zwischen den Fußpunkten bis zur nächsten Auswahl oder Esc |

Kontextaktionen nur dort, wo die aktuelle Auswahl alle Bezüge eines Befehls liefert; die Grenzen aus
ap-41b/ap-41c gelten unverändert. Darstellung der neuen Elemente wie die ap-50-Typen gleicher Ausgabe (Punkt,
Ebene, Strecke); keine neuen Größenvorgaben. Übersetzungen de und en.

### 5. Abnahmetests (Zuordnung, bewusst wenige)

Pfad `tests/acceptance/ap-51-wireframe-ebenen/`. Voraussetzungen wie ap-50. Sollwerte rechnet der Test mit
reinem Python (Vektorrechnung aus den Parametern) nach.

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Ebenen: 3 Fälle `plane_3p`, 2 Fälle `plane_pn` (darunter Normale fast parallel zu x), entartet; OCP-Objekt ist `Geom_Plane` | Ebenen |
| AK-2 | Punkt auf Linie (Gerade, Strecke, `out_of_range`) und auf Ebene; folgt dem Bezug nach Änderung | Punkt auf Linie oder Ebene |
| AK-3 | Schnittpunkt: schneidend, windschief, parallel, außerhalb einer Strecke; Lot auf Gerade und Ebene; Abstand für 4 Paare | Schnittpunkt; Lot und Abstand |
| AK-4 | Typdatei registriert fehlerfrei, `crates/` unverändert, ap-50-Auftrag ohne `messungen` bytegleich, Schemas gültig | Typen und Protokoll |
| AK-5 | Sechs Befehle im Register ohne `folgt` mit `argumente`; je Befehl Klick-Weg und Argument-Weg ergeben gleichen `graph_hash`; `referenz.abstand` ändert `graph_hash` nicht | Befehle für Klick und Argumente |

Budgets: unverändert aus ap-50 (Worker warm ≤ 1,0 s für das ap-50-Lastprojekt; Vorschau Befehl bis Anzeige
≤ 500 ms). Zusätzlich: eine Messung im warmen Worker ≤ 100 ms (Median aus 5, gemessen am `--stdio`-Prozess);
geprüft in AK-3.

### 6. Klick-Anleitung „Ausprobieren“ (Scenario `[mensch]`, wird in den PR übernommen)

1. `bash spikes/ux-prototyp-2/vorschau.sh` starten und die angezeigte Adresse öffnen; Adresse mit
   `?zustand=drahtmodell-beispiel` ergänzen.
2. Drei Punkte nacheinander mit gedrückter Umschalttaste wählen, Menü „Referenz“ › „Ebene durch drei Punkte“.
   Erwartung: Die Ebene geht durch alle drei Punkte. Einen der Punkte verschieben (Wert ändern): Die Ebene kippt mit.
3. Einen Punkt und eine Achse wählen, „Ebene durch Punkt und Normale“. Erwartung: Ebene steht senkrecht zur Achse.
4. „Punkt auf Linie oder Ebene“, dann auf eine Strecke klicken. Erwartung: Punkt sitzt auf der Strecke; Wert „t“
   ändern, der Punkt wandert entlang. Dasselbe mit einer Ebene.
5. Zwei Linien wählen, die sich kreuzen, „Schnittpunkt zweier Linien“. Erwartung: Punkt im Kreuzungspunkt. Mit
   zwei Linien, die aneinander vorbeigehen: verständliche Meldung statt Punkt.
6. Einen Punkt und eine Ebene wählen, „Lot fällen“. Erwartung: kurze Strecke senkrecht auf die Ebene, mit Fußpunkt.
7. Zwei Elemente wählen, „Abstand messen“. Erwartung: Abstand mit Einheit unten in der Rückmeldezeile, eine
   gestrichelte Verbindung; Esc nimmt sie weg, die Struktur hat sich nicht verändert.
8. Antwort: Go, No-Go oder Änderungswunsch (in eigenen Worten).

## Risks / Trade-offs

- **Prototyp statt Produkt-Oberfläche** → wie ap-50; dauerhaft sind Typen, Protokoll und Worker.
- **Messung neben den Elementen im Protokoll** → kleine Sonderform im Auftrag. Abgeschwächt: additiv, ohne Hash,
  ohne Speicherung; wird ein Messelement gewünscht (Open Question 1), wird es ein gewöhnlicher Elementtyp.
- **Feste Regel für die Bezugsrichtung bei `plane_pn`** → eine Skizze darauf kann „verdreht“ wirken. Abgeschwächt:
  die Regel ist dokumentiert und deterministisch; eine wählbare Bezugsrichtung kann mit den Skizzen kommen.
- **Hängt an ap-50** → ohne gemergtes ap-50 nicht umsetzbar (`depends_on`).

## Migration Plan

Keine Daten zu migrieren. Rückbau: neue Typen aus `format/types/drahtmodell.json`, Befund-Codes und
`messungen` aus `format/kernel/`, Worker-Funktionen und Prototyp-Befehle entfernen.

## Open Questions

1. **Messung behalten?** Vorschlag: „Abstand messen“ ist vorübergehend und ändert das Modell nicht; wer den Wert
   dauerhaft sehen will, fällt ein Lot (das ist ein Element mit Länge). Bei Ja zu „behalten“: ein Elementtyp
   `distance` mit Ausgang Länge kommt dazu (eine zusätzliche Aufgabe, AK-3 erweitert).
2. **KI über MCP schon jetzt?** Der Auftrag nennt dieselben Befehle für Klick und KI. Echte MCP-Werkzeuge gehören
   nach der Reihenfolge der Meilensteine zu ap-15 (M3). Vorschlag: hier nur die Argumentbeschreibung und das
   Ausführen ohne Klick (so braucht ap-15 nichts umzubauen). Bei Ja zum Vorziehen: eigener kleiner Change mit
   Zustimmung des Kernteams zur Abweichung von ADR-059.
