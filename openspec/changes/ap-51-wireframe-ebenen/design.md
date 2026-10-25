## Context

Siehe proposal.md – Why. Baut vollständig auf ap-50-wireframe-basics auf: Typdatei
`format/types/drahtmodell.json`, Kernel-Schnittstelle `cee-kernel/0` (`format/kernel/`), Worker-Modul
`cee_worker.kernel` mit `rechnen(auftrag)` und `formen(auftrag)`, Auftrag über `cee_worker auftrag`, Brücke und
Prüfbefehl `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- drahtmodell befehle|ablauf --json`,
Familie und Dropdown „Referenz“. Notation, Toleranzen und Ausgabeformen (`point`, `line`, `ray`, `segment`,
`plane`) wie ap-50 design.md Abschnitte 2 und 3.

Spielregeln des Kernteams (2026-10-25): schlank (2 bis 3 Nächte), keine neuen Zahlenvorgaben für Menü- oder
Oberflächengrößen, wenige Tests, die den Kern direkt prüfen und Werte selbst nachrechnen, Ausprobieren durch den
Menschen als Tor, neue Befehle nur mit echter Wirkung. Zusätzlich: ein Punkt ist ein Element mit genau einer
Herkunft, alle Wege nutzen dieselbe Form.

Der Rust-Kern prüft nur Größen-Parameter gegen die Typdefinition; ein Text-Parameter wie `herkunft` ist ohne
Kernänderung erlaubt (`schema::classify` behandelt ihn als sonstigen Wert). Die Herkunft prüft der Worker.

## Goals / Non-Goals

**Goals:** Punkt und Ebene haben je eine Form mit Herkunft; die neuen Herkünfte und die Messung rechnen im
echten Kern richtig; neue Herkünfte lassen sich ohne Umbau ergänzen; die sieben Befehle wirken per Klick und per
Argumenten gleich; der Mensch kann es ausprobieren.

**Non-Goals:** siehe proposal.md – Nicht-Ziele.

## Decisions

### 1. Punkt und Ebene mit Herkunft

`params.herkunft` ist ein Text (Kennung aus der Tabelle unten). Je Herkunft sind Eingänge und Parameter
festgelegt; Eingänge oder Parameter, die zur Herkunft nicht gehören, ergeben die Warnung `input_unused` und
werden ignoriert. „Linie“ heißt jeder Ausgang vom Typ `line`, `ray` oder `segment` (auch Achsen und `K.x`).
Längen: Dimension `length`, Standard-Einheit `mm`. Die Ausgänge bleiben wie in ap-50 (`point` bzw. `plane`).

| Typ | `herkunft` | Eingänge | Parameter | Herkunft aus |
| --- | --- | --- | --- | --- |
| `point` | `koordinaten` | `frame` optional | `x`, `y`, `z` | ap-50 |
| `point` | `relativ` | `ref` (point), `frame` optional | `x`, `y`, `z` | ap-50 |
| `point` | `auf` | `on` (Linie oder plane) | `t` (auf Linie) bzw. `u`, `v` (auf Ebene) | neu |
| `point` | `schnitt` | `a`, `b` (Linie) | – | neu |
| `point` | `projektion` | `from` (point), `to` (Linie oder plane) | – | neu |
| `point` | `mitte` | `of` (segment) | – | neu |
| `plane` | `von` | `of` (plane) | – | ap-50 |
| `plane` | `drei_punkte` | `a`, `b`, `c` (point) | – | neu |
| `plane` | `punkt_normale` | `point` (point), `normal` (Linie) | – | neu |

**Fehlende Herkunft (Verträglichkeit mit ap-50):** `point` ohne `herkunft` gilt als `relativ`, wenn `ref`
gesetzt ist, sonst als `koordinaten`; `plane` ohne `herkunft` gilt als `von`. Die Befehle legen `herkunft`
immer ausdrücklich an. Unbekannte Herkunft → Befund `unknown_herkunft`, kein Ausgang.

In `format/types/drahtmodell.json` bekommen `point` die Parameter `t`, `u`, `v` (length) zusätzlich zu `x`, `y`,
`z`; `herkunft` steht dort nicht, weil die Typdefinition nur Größen beschreibt. Die Herkunftstabelle (Eingänge,
Parameter, Rechenfunktion je Herkunft) liegt in `cee_worker/kernel/typen.py`.

**Erweiterungspunkt:** Eine neue Herkunft ist ein neuer Eintrag in dieser Tabelle plus Rechenfunktion; Typ,
Ausgang, Protokoll, Hash-Regel und Befehlsform bleiben. Vorgesehen für Folgestufen (nicht hier): Ecke eines
Körpers (`ecke`), Schnitt einer Linie mit einer echten Fläche, Projektion auf eine echte Fläche oder Kante,
Mittelpunkt eines Kreises. Sie brauchen Bezüge auf abgeleitete Topologie und kommen deshalb erst mit
Extrusion und persistenter Identität (ap-39, ADR-016).

**Inhalts-Hash:** unverändert nach ap-50; `herkunft` gehört zu `params` und geht damit ein. Ein ap-50-Punkt
ohne `herkunft` und derselbe Punkt mit ausdrücklicher Herkunft `koordinaten` haben verschiedene Hashes; das ist
gewollt (anderes Rezept) und betrifft keinen gespeicherten Zustand.

### 2. Geometrie (Sollwerte, die der Test nachrechnet)

Toleranzen wie ap-50: `TOL_LINEAR = 1e-6 mm`, `TOL_ANGULAR = 1e-9 rad`; Abnahme Lagen und Längen auf 1e-6 mm,
Richtungen auf 1e-9 rad.

- **`auf` (Linie):** `p = origin + t·direction` (Strecke: `origin = start`). Halbgerade mit `t < −TOL_LINEAR`
  oder Strecke mit `t` außerhalb `[−TOL_LINEAR, length + TOL_LINEAR]` → Befund `out_of_range`, kein Ausgang.
- **`auf` (Ebene):** `p = origin + u·x_direction + v·(normal × x_direction)`.
- **`schnitt`:** Fußpunkte der kürzesten Verbindung beider Trägergeraden. `|d_a × d_b| < TOL_ANGULAR` → Befund
  `parallel`. Abstand der Fußpunkte `> TOL_LINEAR` → Befund `no_intersection` (windschief), Hinweis nennt den
  Abstand als Größe. Fußpunkt außerhalb einer Halbgeraden oder Strecke (Toleranz wie oben) → `no_intersection`.
  Sonst Punkt = Mittelpunkt der beiden Fußpunkte.
- **`projektion`:** Lotfußpunkt von `p_from` auf die Trägergerade bzw. die Ebene (bei Halbgerade und Strecke auf
  die Trägergerade, auch außerhalb der Begrenzung; der Ausgang trägt dann zusätzlich `"auf_element": false`).
  Die Lotstrecke ist kein eigener Typ: Sie entsteht bei Bedarf als ap-50-Strecke zwischen `from` und dem
  Fußpunkt.
- **`mitte`:** `p = (start + end) / 2`.
- **`drei_punkte`:** Ursprung `p_a`, Normale `n = (p_b − p_a) × (p_c − p_a)` normiert, Bezugsrichtung
  `(p_b − p_a)` normiert. Entartet (Befund `degenerate`), wenn `|p_b − p_a|` oder `|p_c − p_a|` kleiner als
  `TOL_LINEAR` ist oder `|n_roh| / (|p_b − p_a|·|p_c − p_a|) < TOL_ANGULAR`.
- **`punkt_normale`:** Ursprung `p`, Normale = Richtung der Linie. Bezugsrichtung: `h = e_x`, falls
  `|n·e_x| ≤ 0,9`, sonst `h = e_y`; Bezugsrichtung `= (h − (h·n)·n)` normiert (feste Regel, nachrechenbar).
- **Abstand (Messung):** kürzester Abstand und Fußpunkte zwischen zwei Bezügen aus {Punkt, Linie, Ebene}; bei
  Halbgerade und Strecke unter Beachtung der Begrenzung. Linie–Ebene und Ebene–Ebene: 0 mm, wenn nicht parallel.

**Echter Kern:** Ebenen als `Geom_Plane` auf `gp_Ax3`; Punkte als `TopoDS_Vertex`; Projektionen mit
`GeomAPI_ProjectPointOnCurve` bzw. `GeomAPI_ProjectPointOnSurf`; Schnittpunkt und Linie–Linie-Abstand mit
`GeomAPI_ExtremaCurveCurve` auf `Geom_Line` (unbegrenzt) bzw. `BRepExtrema_DistShapeShape` (begrenzte Kanten).
Gemeldete Werte werden aus diesen Objekten gelesen, nicht aus der Formel. OCP-Importe nur unter
`worker/src/cee_worker/kernel/`.

### 3. Erweiterung `cee-kernel/0` (additiv)

- Neue Befund-Codes in `format/kernel/ergebnis.schema.json` und README: `parallel`, `no_intersection`,
  `out_of_range`, `unknown_herkunft`, Warnung `input_unused` (Hinweis als Übersetzungsschlüssel mit
  Korrekturvorschlag).
- **Messung:** Der Auftrag darf ein Feld `"messungen": [{"id", "a", "b"}]` tragen (`a`, `b` als `<id>.<output>`).
  Das Ergebnis bekommt `"messungen": [{"id", "distance": Größe, "foot_a": [Größe ×3], "foot_b": [Größe ×3]}]`
  oder einen Befund. Messungen sind keine Elemente, gehen in keinen Inhalts-Hash ein und werden nicht gespeichert
  (ADR-032).
- `protocol` bleibt `cee-kernel/0`; ap-50-Aufträge ohne `messungen` und ohne `herkunft` liefern bytegleiche
  Ergebnisse wie vorher.

### 4. Befehle (Prototyp, `spikes/ux-prototyp-2/src/befehle.json`)

Alle ohne `folgt`, Familie „Referenz“ (aus ap-50). Neu ist das Feld `argumente` je Befehl: Liste
`{name, art: "bezug"|"wert", typen | dimension}`. Ein Befehl lässt sich auf zwei Wegen ausführen: per Klick
(fehlende Bezüge per Klick im Modell nachfordern, Esc bricht ohne Änderung ab) und per `{befehl, args}` mit allen
Argumenten ohne Klick. Beide Wege führen dieselbe Funktion aus. Diese Form übernimmt ap-15 später für MCP
(ADR-045); MCP selbst kommt nicht in diesen Change. Die ap-50-Befehle `referenz.punkt` und
`referenz.punkt-relativ` legen ab jetzt `herkunft` ausdrücklich an (`koordinaten` bzw. `relativ`), sonst
unverändert.

| ID | Titel (de) | Argumente | Wirkung |
| --- | --- | --- | --- |
| `referenz.ebene-drei-punkte` | Ebene durch drei Punkte | `a`, `b`, `c` (point) | `plane`, Herkunft `drei_punkte` |
| `referenz.ebene-punkt-normale` | Ebene durch Punkt und Normale | `point` (point), `normal` (Linie) | `plane`, Herkunft `punkt_normale` |
| `referenz.punkt-auf` | Punkt auf Linie oder Ebene | `on` (Linie oder plane), `t` bzw. `u`, `v` (length, optional) | `point`, Herkunft `auf`; per Klick aus der Klickstelle (nächster Punkt auf der Linie bzw. Schnitt des Sichtstrahls mit der Ebene), danach in den Eigenschaften änderbar |
| `referenz.schnittpunkt` | Schnittpunkt zweier Linien | `a`, `b` (Linie) | `point`, Herkunft `schnitt` |
| `referenz.punkt-projektion` | Punkt projizieren (Lot) | `from` (point), `to` (Linie oder plane) | `point`, Herkunft `projektion` |
| `referenz.mittelpunkt` | Mittelpunkt | `of` (segment) | `point`, Herkunft `mitte` |
| `referenz.abstand` | Abstand messen | `a`, `b` (point, Linie oder plane) | ändert den Graphen nicht; Ergebnis in der Rückmeldezeile (z. B. „Abstand: 42,5 mm“) und als vorübergehende Verbindung der Fußpunkte bis zur nächsten Auswahl oder Esc |

Kontextaktionen nur dort, wo die aktuelle Auswahl alle Bezüge eines Befehls liefert; die Grenzen aus
ap-41b/ap-41c gelten unverändert. Darstellung wie ap-50 (Punkt, Ebene); keine neuen Größenvorgaben. Die
Eigenschaften eines Punktes zeigen seine Herkunft als Text (z. B. „Herkunft: Schnittpunkt“) und nur die Felder
dieser Herkunft. Übersetzungen de und en.

### 5. Abnahmetests (Zuordnung, bewusst wenige)

Pfad `tests/acceptance/ap-51-wireframe-ebenen/`. Voraussetzungen wie ap-50. Sollwerte rechnet der Test mit
reinem Python (Vektorrechnung aus den Parametern) nach.

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Ebenen `drei_punkte` (3 Fälle) und `punkt_normale` (2 Fälle), entartet; OCP-Objekt ist `Geom_Plane` | Ebenen |
| AK-2 | Punkt `auf` (Gerade, Strecke, `out_of_range`, Ebene), `mitte`, Folgen nach Änderung des Bezugs | Punkt auf Linie oder Ebene, Mittelpunkt |
| AK-3 | `schnitt` (schneidend, windschief, parallel, außerhalb); `projektion` auf Gerade und Ebene; Abstand für 4 Paare, Budget | Schnittpunkt; Projektion und Abstand |
| AK-4 | eine Form: alle neuen Punkte haben Typ `point`, keine weiteren Punkt- oder Ebenentypen in der Typdatei; fehlende Herkunft wie ap-50; `unknown_herkunft`; ap-50-Beispiel bytegleich; Schemas gültig; `crates/` unverändert | Punkt und Ebene mit Herkunft; Protokoll |
| AK-5 | Sieben Befehle im Register ohne `folgt` mit `argumente`; Klick-Weg gleich Argument-Weg; `referenz.abstand` ändert `graph_hash` nicht | Befehle für Klick und Argumente |

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
6. Einen Punkt und eine Ebene wählen, „Punkt projizieren (Lot)“. Erwartung: neuer Punkt senkrecht darunter auf
   der Ebene. Eine Strecke wählen, „Mittelpunkt“: Punkt in der Mitte.
7. Einen der neuen Punkte anklicken. Erwartung: Die Eigenschaften nennen, woher der Punkt kommt (z. B.
   „Schnittpunkt“), und zeigen nur die passenden Felder.
8. Zwei Elemente wählen, „Abstand messen“. Erwartung: Abstand mit Einheit unten in der Rückmeldezeile, eine
   gestrichelte Verbindung; Esc nimmt sie weg, die Struktur hat sich nicht verändert.
9. Antwort: Go, No-Go oder Änderungswunsch (in eigenen Worten).

## Risks / Trade-offs

- **Prototyp statt Produkt-Oberfläche** → wie ap-50; dauerhaft sind Typen, Protokoll und Worker.
- **`herkunft` als Text außerhalb der Typdefinition** → der Kern prüft die Herkunft nicht. Abgeschwächt: der
  Worker meldet unbekannte Herkünfte als Befund; eine Beschreibung von Varianten in Typdefinitionen kann später
  im Kern kommen (dann neue `SCHEMA_VERSION`, eigener Change).
- **Verträglichkeitsregel für Punkte ohne Herkunft** → zwei Schreibweisen für denselben Punkt. Abgeschwächt: neue
  Elemente bekommen die Herkunft immer ausdrücklich; die Regel lässt sich bei der ersten Schema-Migration
  auflösen.
- **Messung neben den Elementen im Protokoll** → kleine Sonderform im Auftrag. Abgeschwächt: additiv, ohne Hash,
  ohne Speicherung.
- **Feste Regel für die Bezugsrichtung bei `punkt_normale`** → eine Skizze darauf kann „verdreht“ wirken.
  Abgeschwächt: dokumentiert und deterministisch; wählbare Bezugsrichtung kann mit den Skizzen kommen.
- **Hängt an ap-50** → ohne umgesetztes ap-50 nicht umsetzbar (`depends_on`).

## Migration Plan

Keine Daten zu migrieren (keine neue `SCHEMA_VERSION`; ap-50-Punkte ohne Herkunft bleiben gültig). Rückbau: neue
Herkünfte aus der Herkunftstabelle, Parameter `t`, `u`, `v`, Befund-Codes und `messungen` aus `format/kernel/`
und die Prototyp-Befehle entfernen.

## Open Questions

1. **Messung behalten?** Vorschlag: „Abstand messen“ ist vorübergehend und ändert das Modell nicht; wer den Wert
   dauerhaft sehen will, projiziert einen Punkt und zieht eine Strecke. Bei Ja zu „behalten“: ein Element
   `distance` mit Ausgang Länge kommt dazu (eine zusätzliche Aufgabe, AK-3 erweitert).
2. **KI über MCP schon jetzt?** Echte MCP-Werkzeuge gehören nach der Reihenfolge der Meilensteine zu ap-15 (M3).
   Vorschlag: hier nur die Argumentbeschreibung und das Ausführen ohne Klick (ap-15 braucht dann nichts
   umzubauen). Bei Ja zum Vorziehen: eigener kleiner Change mit Zustimmung zur Abweichung von ADR-059.
3. **Herkunft eines Punktes nachträglich wechseln?** (z. B. ein Punkt auf Koordinaten soll künftig ein
   Schnittpunkt sein, und alles, was an ihm hängt, bleibt dran.) Vorschlag: nicht in diesem Change; die Form
   erlaubt es später ohne Umbau, weil nur `herkunft`, Eingänge und Parameter wechseln und die ID bleibt.
