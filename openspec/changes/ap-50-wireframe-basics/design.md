## Context

Siehe proposal.md – Why. Ausgangslage im Repository (Stand `main`, 2026-10-25):

- `worker/` ist ein Gerüst (`cee_worker/__main__.py`), `format/kernel/` gibt es noch nicht.
- Der Rust-Kern (`crates/graph`) hat Schema v1, Einheitentabelle, Typdefinitionen
  (`{"type", "params": {name: {"dimension", "default_unit"}}}`), Abhängigkeiten mit `order()` und `affected()`,
  Prüfung mit Befunden; das Python-SDK `cee-sdk` (ap-40) bietet `Doc.import_project(project, types)`,
  `validate()`, `order()`, `element()` und `Quantity` mit Umrechnung nur über den Kern.
- Der Prototyp `spikes/ux-prototyp-2/` (ap-41b, PR offen) hat Befehlsregister `src/befehle.json`, Elementform,
  Struktur, Eigenschaften mit Wertfeld, Auswahl, Ausblenden, Verwerfen, Rückgängig, Testzustände per Adresse und
  das Prüfwerkzeug `npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> --json`. ap-41c legt fest:
  Menüs und Kontextmenü zeigen nur Befehle ohne `folgt: true`.
- Regeln: `docs/rules/geometrie.md` (zustandsloser Worker, OCP nur im Modul `kernel`, Toleranzen, Befunde statt
  Absturz, deterministisch), `docs/rules/kern.md` (kein Elementtyp im Kern-Code, Größen mit Dimension).

## Goals / Non-Goals

**Goals:** Der Weg Graph → Kernel-Nachricht → Worker (OCP) → Ergebnis → Ansicht funktioniert einmal durchgängig
für Koordinatensysteme, Punkte und Linien. Alles Messbare ist per pytest prüfbar (Worker und Kern direkt, Vorschau
per Prüfbefehl). Der Mensch kann es im Browser ausprobieren.

**Non-Goals:** siehe proposal.md – Nicht-Ziele. Insbesondere kein Cache, keine Detailstufen, keine
Topologie-Historie, keine Produkt-Oberfläche.

## Decisions

### 1. Elementtypen und Typdefinitionen

Typdefinitionen liegen als Daten in `format/types/drahtmodell.json` (Apache-2.0 wie `format/`), Format wie
`TypeRegistry::register`. Der Rust-Kern bleibt unverändert und fachneutral; Hosts (Auftrag, Vorschau, Tests)
registrieren die Datei. Alle Längen-Parameter: Dimension `length`, Standard-Einheit `mm`; alle Winkel: `angle`,
Standard-Einheit `deg` (gespeichert und gerechnet wird kanonisch in rad, ADR-057).

| Typ | Eingänge (`<id>.<output>`) | Parameter | Ausgänge (Typ) |
| --- | --- | --- | --- |
| `frame` (Koordinatensystem) | `parent` optional (`frame`) | `x`, `y`, `z` (length), `rx`, `ry`, `rz` (angle) | `frame` (frame), `origin` (point), `x`, `y`, `z` (line), `xy`, `yz`, `zx` (plane) |
| `point` | `frame` optional (`frame`), `ref` optional (`point`) | `x`, `y`, `z` (length) | `point` (point) |
| `axis` | `of` (`line`) | – | `line` (line) |
| `plane` | `of` (`plane`) | – | `plane` (plane) |
| `line` (Gerade) | `a`, `b` (`point`) | – | `line` (line) |
| `ray` (Halbgerade) | `a`, `b` (`point`) | – | `ray` (ray), `start` (point) |
| `segment` (Strecke) | `a`, `b` (`point`) | – | `segment` (segment), `start`, `end` (point) |

Ausgabetypen und erlaubte Eingangstypen stehen als Tabelle im Worker-Modul (`cee_worker/kernel/typen.py`), nicht
im Rust-Kern. Ein Eingang vom Typ `point` akzeptiert jeden Ausgang vom Typ `point` (z. B. `P1.point`,
`S1.start`, `K1.origin`). Ein Eingang ist immer `<id>.<output>` mit einem benannten Ausgang; Indizes oder
Listenpositionen gibt es nicht (ADR-016, ADR-058).

**Kind-Elemente eines Koordinatensystems:** Der Befehl „Koordinatensystem setzen“ legt ein `frame` K mit sieben
Kindern in `K.content` an: `point` „Ursprung“ (`frame: K.frame`, x = y = z = 0 mm), `axis` „X-Achse“,
„Y-Achse“, „Z-Achse“ (`of: K.x|K.y|K.z`), `plane` „XY-Ebene“, „YZ-Ebene“, „ZX-Ebene“ (`of: K.xy|K.yz|K.zx`).
Namen über Übersetzungsschlüssel. Ein Kind ist ein gewöhnliches Element (wählbar, ausblendbar, verwerfbar,
referenzierbar); keine Sonderform im Speicherformat (ADR-028).

### 2. Geometrie (Sollwerte, die der Test nachrechnet)

Notation: Weltkoordinaten in mm, Drehmatrizen `Rx`, `Ry`, `Rz` um die Achsen des übergeordneten Systems.

- **Koordinatensystem:** Lage `T_K = T_parent · Trans(x, y, z) · Rz(rz) · Ry(ry) · Rx(rx)` (ohne `parent`:
  `T_parent` = Einheit). `origin = T_K · (0,0,0)`, Achsen `x = R_K·e_x`, `y = R_K·e_y`, `z = R_K·e_z`.
  Ebenen: `xy` mit Normale `z` und Bezugsrichtung `x`, `yz` mit Normale `x` und Bezugsrichtung `y`, `zx` mit
  Normale `y` und Bezugsrichtung `z`; Ursprung jeweils `origin`.
- **Punkt:** ohne `ref`: `p = T_frame · (x, y, z)`; mit `ref`: `p = p_ref + R_frame · (x, y, z)`. Ohne `frame`
  gilt das Weltsystem. „Frei“, „auf Koordinaten“ und „relativ“ sind Eingabewege, kein eigener Typ.
- **Achse:** Ursprung und Richtung der referenzierten Achse. **Ebene:** Ursprung, Normale, Bezugsrichtung.
- **Gerade:** Ursprung `p_a`, Richtung `(p_b − p_a)/|p_b − p_a|`, unbegrenzt. **Halbgerade:** Start `p_a`, gleiche
  Richtung, einseitig unbegrenzt. **Strecke:** `start = p_a`, `end = p_b`, `length = |p_b − p_a|`.
- **Entartet:** `|p_b − p_a| < TOL_LINEAR` → Befund `degenerate`, kein Ausgang.
- **Toleranzen:** `TOL_LINEAR = 1e-6 mm`, `TOL_ANGULAR = 1e-9 rad` (Regel Geometrie). Abnahme: Lagen und Längen
  höchstens 1e-6 mm, Richtungen höchstens 1e-9 rad vom nachgerechneten Sollwert.

**Echter Kern:** Der Worker baut jede Geometrie als OCP-Form und liest die gemeldeten Werte aus der Form zurück
(nicht aus der Formel): Punkt → `TopoDS_Vertex` (`BRep_Tool.Pnt_s`), Strecke → begrenzte Kante
(`BRepBuilderAPI_MakeEdge` aus zwei Punkten), Gerade und Halbgerade → Kante auf `gp_Lin` mit Parameterbereich
(−∞, ∞) bzw. [0, ∞) (`Precision.Infinite_s()`), Ebene → `gp_Pln`/`Geom_Plane`, Koordinatensystem →
`gp_Ax3`/`gp_Trsf`. build123d darf für Hilfsfunktionen genutzt werden. OCP- und build123d-Importe nur unter
`worker/src/cee_worker/kernel/` (Regel Geometrie).

### 3. Kernel-Schnittstelle `cee-kernel/0`

Dateien `format/kernel/README.md`, `format/kernel/auftrag.schema.json`, `format/kernel/ergebnis.schema.json`
(JSON Schema 2020-12). Inhalt:

- **Auftrag:** `{"protocol": "cee-kernel/0", "elements": [Element …]}`. Elemente in Elementform (ADR-028), in der
  Reihenfolge, die der Rust-Kern mit `order()` liefert; Kind-Elemente stehen als eigene Einträge in dieser
  flachen Liste, `content` enthält wie im Dokument nur die Kind-IDs. Verworfene Elemente (`meta.verworfen = true`) bleiben im Auftrag.
- **Ergebnis:** `{"protocol": "cee-kernel/0", "kernel": {"name": "occt", "version": <OCP-Version>,
  "worker": <cee-worker-Version>}, "results": [{"id", "state", "hash", "outputs", "befunde"}], "befunde": […]}`.
  `state` ist `aktuell` oder `fehlerhaft`; verworfene Elemente erscheinen nicht in `results`.
  `outputs` je Name: `{"type": "point", "position": [Größe ×3]}`, `{"type": "line", "origin", "direction"}`,
  `{"type": "ray", "origin", "direction"}`, `{"type": "segment", "start", "end", "length"}`,
  `{"type": "plane", "origin", "normal", "x_direction"}`, `{"type": "frame", "origin", "x", "y", "z"}`. Jede Zahl
  als Größe `{"value", "unit"}` (Längen `mm`, Richtungen `1`).
- **Befund:** `{"code", "element", "input"?, "hinweis"}`; Codes: `input_missing` (Eingang zeigt auf kein
  früheres Element oder keinen solchen Ausgang), `input_discarded` (Eingang verworfen), `input_type` (falscher
  Ausgabetyp), `input_failed` (Eingang fehlerhaft, Folgebefund), `degenerate`, `unit` (falsche Dimension oder
  unbekannte Einheit, Fehlercode des Kerns im Hinweis), `unknown_type`, `kernel_error` (OCP-Ausnahme, Text im
  Hinweis). `hinweis` ist ein Übersetzungsschlüssel mit Korrekturvorschlag. Ein Befund betrifft nur sein Element
  und dessen Folgeelemente; alle unabhängigen Elemente werden berechnet (ADR-050).
- **Inhalts-Hash:** SHA-256 (hex) über kanonisches JSON (Schlüssel sortiert, Zahlen als Kurzdarstellung von
  Python `repr(float)` in kanonischer Einheit) aus `protocol`, `kernel.version`, `type`, `params` und je Eingang
  `<Hash des Bezugs>.<output>`. ID und `meta` gehen nicht ein (Umbenennen ändert den Hash nicht; gleiches Rezept
  ergibt gleichen Hash, ADR-032). Gespeichert wird der Hash in diesem Change nicht.
- **Determinismus:** gleicher Auftrag → bytegleiches Ergebnis (JSON mit sortierten Schlüsseln, ohne Zeit,
  Zufall oder Prozessdaten).

### 4. Worker und Auftrag

- `python -m cee_worker rechnen` liest einen Auftrag von stdin und schreibt ein Ergebnis nach stdout (einmalig).
- `python -m cee_worker --stdio` bleibt laufen: je Zeile ein Auftrag, je Zeile ein Ergebnis (JSON Lines).
  Ungültiges JSON → eine Ergebniszeile mit Befund `protocol` und weiterlaufen.
- `python -m cee_worker auftrag --projekt <datei.json> [--rechnen]` baut über `cee-sdk` den Auftrag: Projekt mit
  `format/types/drahtmodell.json` importieren, `validate()` (Befunde des Kerns, z. B. Zahl ohne Einheit mit
  Warnung, falsche Dimension) und `order()` (Zyklen meldet der Kern als übersprungen; sie werden Befunde
  `input_missing` mit Hinweis „Zyklus“). Mit `--rechnen` direkt mit Ergebnis. Umrechnungen nur über
  `cee_sdk.Quantity` (ADR-057); der Worker enthält keine Umrechnungsfaktoren.
- Python-API für Tests: `cee_worker.kernel.rechnen(auftrag) -> dict` (Ergebnis) und
  `cee_worker.kernel.formen(auftrag) -> dict[str, TopoDS_Shape]` (Element-ID → OCP-Form, nur im selben Prozess).
- Prüfhaken nur für Tests: Ist `CEE_WORKER_TEST=1` gesetzt und trägt ein Element `meta.test_absturz = true`,
  beendet sich der Worker beim Berechnen dieses Elements mit Exit-Code 70 ohne Ausgabe (simuliert einen Absturz
  in OCP). Ohne die Variable wird `meta.test_absturz` ignoriert.
- Abhängigkeit: `worker/pyproject.toml` bekommt `cee-sdk` (Arbeitsbereich, Apache-2.0). Keine weiteren.
- Beispiel `format/examples/drahtmodell.json`: Koordinatensystem K1 (x = 100 mm, rz = 30 deg) mit sieben
  Kindern, Punkte P1 (10, 20, 0 mm, Welt), P2 (in K1: 50, 0, 0 mm), P3 (relativ zu P1: 0, 0, 25 mm),
  Strecke S1 (P1–P2), Gerade G1 (P1–P3), Halbgerade H1 (K1.origin–P2).

### 5. Vorschau im Prototyp

**Brücke:** Ein Vite-Plugin `spikes/ux-prototyp-2/bruecke/kernel.ts` (nur in `vorschau.sh` und im Prüfmodus,
nicht im statischen Build) startet `uv run --extra cad python -m cee_worker --stdio` als eigenen Prozess und
nimmt `POST /kernel` (Auftrag) auf demselben Ursprung `127.0.0.1` an. Zeitlimit 10 s je Auftrag; bei Absturz oder
Zeitüberschreitung meldet die Brücke den Befund `kernel_unavailable` und startet den Worker neu. Im Prüfmodus
zusätzlich `POST /kernel/test-beenden` (beendet den Worker hart). Ohne Brücke (statischer Build) meldet die
Vorschau „Geometrie-Dienst nicht erreichbar“ als Befund, Struktur und vorhandene Elemente bleiben bedienbar.
Den Auftrag baut die Vorschau selbst aus ihrem Graphen (Reihenfolge nach Eingängen); die Brücke reicht ihn über
`cee_worker auftrag` weiter, damit Prüfung und Reihenfolge aus dem Rust-Kern kommen.

**Befehle** (neu in `src/befehle.json`, alle ohne `folgt`, also mit Wirkung; Familie „Referenz“ als Vorschlag,
Open Question 1; Taskleisten-Eintrag „Modellieren“, eigenes Dropdown „Referenz“ mit drei Untergruppen):

| ID | Titel (de) | Bezug | Untergruppe | Wirkung |
| --- | --- | --- | --- | --- |
| `referenz.koordinatensystem` | Koordinatensystem setzen | keine oder `frame` | Koordinatensystem | legt `frame` mit sieben Kindern an; ist ein Koordinatensystem gewählt, wird es `parent` |
| `referenz.punkt` | Punkt setzen | keine | Punkt | nächster Klick ins Modell setzt einen Punkt auf die XY-Ebene des gewählten bzw. zuletzt angelegten Koordinatensystems (sonst Welt-XY); x, y, z danach in den Eigenschaften änderbar |
| `referenz.punkt-relativ` | Punkt relativ setzen | `point` | Punkt | legt `point` mit `ref` = gewählter Punkt und Versatz 0 mm an, Fokus auf das Feld x |
| `referenz.gerade` | Gerade durch zwei Punkte | zwei Punkte | Linie | `line` mit `a`, `b` in Wahlreihenfolge |
| `referenz.halbgerade` | Halbgerade durch zwei Punkte | zwei Punkte | Linie | `ray` |
| `referenz.strecke` | Strecke durch zwei Punkte | zwei Punkte | Linie | `segment` |

Sind für eine Linie nicht genau zwei Punkte gewählt, fordert die Rückmeldezeile „Zwei Punkte wählen“ an; die
nächsten zwei Klicks auf Punkte im Modell schließen den Befehl ab, Esc bricht ab, ohne den Graphen zu ändern.
Kontextaktion auf einem Punkt: „Punkt relativ setzen“; auf zwei gewählten Punkten: die drei Linienbefehle
(Kontextgrenzen aus ap-41c gelten weiter). Ausblenden, Einblenden, Verwerfen, Umbenennen, Rückgängig und
Auswahl nutzen die vorhandenen Befehle (`element.ausblenden`, `element.verwerfen`, `auswahl.*` …) ohne Änderung
ihrer IDs.

**Darstellung** (Tokens aus `docs/design/tokens.json`, three.js): Punkte als Scheibe 6 px Durchmesser,
Linien 1,5 px; Gerade und Halbgerade bis 10 000 mm vom Ursprung (nur Anzeige); Achsen 100 mm lang in den Farben
`achse.x|y|z`; Ebenen als Quadrat 100 × 100 mm um den Ursprung mit Deckkraft 0,15 und Kontur. Elementzustände
(gewählt, fehlerhaft, verworfen, ausgeblendet) nach den Kanälen aus ap-41b. Jedes Szenenobjekt trägt die
Element-ID. Die Lage kommt ausschließlich aus dem Ergebnis des Workers; die Vorschau rechnet keine Geometrie.

**Auswahl per Klick:** Fangradius 6 px um die Projektion; Vorrang Punkt vor Linie vor Ebene, bei Gleichstand der
kleinere Bildschirmabstand. Ausgeblendete und verworfene Elemente sind nicht wählbar.

**Testzustände per Adresse:** `?zustand=drahtmodell-leer` (leeres Teil) und `?zustand=drahtmodell-beispiel`
(Inhalt von `format/examples/drahtmodell.json`).

### 6. Prüfbefehle der Vorschau

`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- drahtmodell <unterbefehl> … --json`:

- `befehle`: `{befehle: [{id, familie, untergruppe, folgt, orte: [Ort]}]}` für die sechs neuen Befehle;
  Orte wie im Inventar-Prüfbefehl von ap-41b/ap-41c.
- `ablauf --zustand <name> --datei <ablauf.json>`: führt Schritte aus und liefert nach jedem Schritt einen
  Schnappschuss. Schritte: `{befehl, args?}`, `{klick: {element}}` (Bildschirmpunkt aus dem Worker-Ergebnis),
  `{klick: {modell_mm: [x, y, z]}}`, `{eigenschaft: {element, feld, eingabe}}`, `{taste}`, `{bruecke: "beenden"}`,
  `{warten_ms}`. Schnappschuss: `{graph: [Element], graph_hash, ergebnis, szene: [{element, art, sichtbar,
  lage_mm}], auswahl: [id], struktur: [{id, name, zustaende}], befunde: [{element, code, ort}], rueckmeldung,
  bereit_ms, anfragen: [URL], konsolenfehler: [Text]}`. `bereit_ms` = Zeit vom Auslösen bis die Szene das neue
  Ergebnis zeigt.
- Die Prüfbefehle starten Vorschau und Brücke selbst (Playwright, Chromium, 1440 × 900 px) und beenden sie.

### 7. Budgets

| Messung | Budget | Wie gemessen |
| --- | --- | --- |
| Worker, warm: 1 Koordinatensystem + 1 000 Punkte + 500 Strecken | ≤ 1,0 s | Test misst Senden bis Empfangen an `--stdio` (Median aus 5) |
| `auftrag` für dasselbe Projekt | ≤ 0,5 s | Test misst `cee_worker auftrag` ohne `--rechnen` im Prozess (Python-API `auftrag.bauen`) |
| Vorschau: Befehl bis Anzeige, warm | ≤ 500 ms | `bereit_ms` aus `ablauf` (Median aus 5) |
| Neustart nach Absturz bis zum nächsten Ergebnis | ≤ 5 s | `ablauf` mit `{bruecke: "beenden"}` und folgendem Befehl |
| Zeitlimit je Auftrag in der Brücke | 10 s | fest |

### 8. Abnahmetests (Zuordnung)

Pfad `tests/acceptance/ap-50-wireframe-basics/`. Voraussetzung wie ap-40: `uv sync --extra cad`, SDK mit maturin
gebaut; Vorschau-Tests brauchen `npm ci` in `spikes/ux-prototyp-2` und Playwright-Chromium.

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Typdefinitionen registrieren fehlerfrei; kein Elementtyp aus der Tabelle im Code von `crates/graph` | Typdefinitionen als Daten |
| AK-2 | Auftrag und Ergebnis von Beispiel und Testfällen sind gültig nach den Schemas | Kernel-Schnittstelle |
| AK-3 | Koordinatensysteme (5 Fälle inkl. verschachtelt und gedreht): Ursprung, Achsen, Ebenen, 7 Kinder | Koordinatensystem |
| AK-4 | Punkte frei, auf Koordinaten, relativ; relativer Punkt folgt; Eingaben mit Einheit | Punkt |
| AK-5 | Gerade, Halbgerade, Strecke: Lage, Richtung, Länge, Begrenzung der OCP-Kante | Linien |
| AK-6 | Referenzen nur über benannte Ausgänge; Index- oder Fantasie-Ausgang → Befund | Referenzen |
| AK-7 | Befunde und Weiterrechnen (entartet, fehlt, falscher Typ, verworfen, Folgebefund, Einheit) | Befund statt Absturz |
| AK-8 | Determinismus und Inhalts-Hash | Inhalts-Hash, Determinismus |
| AK-9 | Echter Kern: Kernel-Version, OCP nur im Modul `kernel` | Echter Kern |
| AK-10 | `--stdio`, Prüfhaken Absturz, Budget Worker | Worker als Prozess, Leistung |
| AK-11 | Auftrag über das SDK: Reihenfolge, Zyklus, Einheiten wie der Kern, Budget | Auftrag aus dem Graphen |
| AK-12 | Neue Befehle im Register mit Wirkung und Ort; Menü- und Kontextgrenzen | Befehle im Register |
| AK-13 | Anlegen in der Vorschau (alle sechs Befehle), Szene gleich Ergebnis | Anlegen in der Vorschau |
| AK-14 | Auswahl per Klick, Vorrang, nicht wählbar wenn ausgeblendet | Auswahl per Klick |
| AK-15 | Ausblenden ändert den Graphen nicht; Verwerfen mit Folgebefund, Rückgängig | Ausblenden und Verwerfen |
| AK-16 | Ohne Brücke, Absturz und Neustart, nur `127.0.0.1`, Budget Vorschau | Brücke robust |

### 9. Klick-Anleitung „Ausprobieren“ (für das Scenario `[mensch]` und den PR)

1. Im Ordner des Projekts `bash spikes/ux-prototyp-2/vorschau.sh` starten (dauert beim ersten Mal etwa eine
   Minute) und die angezeigte Adresse im Browser öffnen.
2. Links in der Taskleiste „Modellieren“ wählen, oben das Menü „Referenz“ öffnen, „Koordinatensystem setzen“.
   In den Eigenschaften rechts „x“ auf `100 mm` und „Drehung z“ auf `30°` setzen. Erwartung: Achsen und drei
   Ebenen drehen sich mit, in der Struktur stehen Ursprung, drei Achsen, drei Ebenen.
3. „Punkt setzen“ wählen und irgendwo ins Modell klicken. Erwartung: Punkt erscheint dort, wo geklickt wurde, in
   den Eigenschaften stehen seine Koordinaten mit Einheit. „x“ auf `1,2 m` ändern: der Punkt springt auf 1 200 mm.
4. Den Punkt rechts anklicken, „Punkt relativ setzen“, „z“ auf `25 mm`. Danach den ersten Punkt verschieben
   (Wert ändern): der relative Punkt geht mit.
5. Beide Punkte wählen (zweiter mit gedrückter Umschalttaste), Menü „Referenz“ › „Strecke durch zwei Punkte“;
   ebenso eine Gerade und eine Halbgerade. Erwartung: Strecke endet an den Punkten, Gerade läuft über beide hinaus,
   Halbgerade nur in eine Richtung.
6. Eine Achse und eine Ebene über das Auge in der Struktur ausblenden und wieder einblenden.
7. Den ersten Punkt verwerfen. Erwartung: Strecke und relativer Punkt zeigen „fehlerhaft“ mit einer verständlichen
   Meldung, alles andere bleibt. Rückgängig: alles wieder heil.

## Risks / Trade-offs

- **Vorschau im Wegwerf-Prototyp** → Doppelarbeit, wenn ap-08b die Produkt-Oberfläche baut. Abgeschwächt: Die
  dauerhaften Teile (Typdefinitionen, `format/kernel/`, Worker, Auftrag) sind Produktcode; im Prototyp entstehen
  nur Brücke, Befehle und Darstellung.
- **Lokale Brücke widerspricht „ohne Server“ aus ap-41b** → Sie läuft nur in Vorschau und Prüfmodus auf demselben
  Ursprung `127.0.0.1`; der statische Build bleibt ohne Brücke und ohne Netz (AK-16 prüft beides). Die
  Abnahmetests von ap-41b und ap-41c laufen weiter ohne Worker.
- **Erste Fassung `cee-kernel/0` vor ap-06** → ap-06 kann das Protokoll erweitern müssen. Abgeschwächt: Version im
  Feld `protocol`, nur additive Erweiterungen; Bruch nur mit `cee-kernel/1`.
- **Unbegrenzte Kanten in OCP** sind nicht tessellierbar → die Vorschau zeichnet nur aus Ursprung und Richtung;
  der Worker tesselliert nichts.
- **Worker-Start mit OCP dauert 1–3 s** → `--stdio` hält den Prozess warm; Budgets gelten warm.

## Migration Plan

Keine Daten zu migrieren (keine neue `SCHEMA_VERSION`, kein gespeicherter Zustand). Rückbau: Ordner
`format/kernel/`, `format/types/`, `worker/src/cee_worker/kernel/` und die Prototyp-Ergänzungen entfernen.

## Open Questions

1. **Name und Ort der neuen Befehle im Menü.** Die sechs Befehle brauchen eine Familie (Platzierungsregel ADR-065
   Punkt 12); das Befehlsinventar kennt noch keine passende. Vorschlag: Familie „Referenz“ mit eigenem Dropdown
   „Referenz“ unter „Modellieren“ (Untergruppen Koordinatensystem, Punkt, Linie). Bei Nein: Name nach Wunsch des
   Kernteams; die Umsetzung ändert nur Titel und Familie.
2. **Aufnahme ins Befehlsinventar.** Die sechs Befehle stehen nicht in
   `tests/golden/ap-41b-ux-bedienkonzept/befehlsinventar.json`. Vorschlag: Das Kernteam nimmt sie mit „beta: true“
   auf (Referenzdaten). Bei Nein: Sie sind trotzdem im Register und in der Suche, nur das Inventar weiß nichts
   davon.
3. **Ursprung in jedem neuen Teil.** Viele CAD-Systeme legen in jedem neuen Teil automatisch ein
   Koordinatensystem im Nullpunkt an. Vorschlag: in diesem Change nicht; der Mensch setzt es mit dem Befehl, ohne
   Koordinatensystem gilt das Weltsystem. Bei Ja: ein Koordinatensystem „Ursprung“ wird beim Anlegen eines
   Teils erzeugt (kleine Ergänzung, eigener Punkt in tasks.md).
4. **Zeile in der Arbeitspaket-Tabelle und Lage im kritischen Pfad.** Vorschlag: ap-50 als M1-Paket vor ap-06
   eintragen („Wireframe-Basics mit echtem Kern, erste Fassung `cee-kernel/0`“, abhängig von ap-40, ap-41b,
   ap-41c); ap-06 baut darauf auf. Änderung an `docs/konzept.md` und ggf. ADR-062 Punkt 8 durch das Kernteam.
