## Context

Siehe proposal.md – Why. Ausgangslage (Stand `main`, 2026-10-30):

- ap-50 (Phase Tests) liefert `format/types/drahtmodell.json`, `format/kernel/` mit `cee-kernel/0`, den Worker
  `cee_worker.kernel` (OCP, build123d), die lokale Brücke `spikes/ux-prototyp-2/bruecke/kernel.ts` (`POST /kernel`,
  nur `127.0.0.1`), die Familie „Referenz“ mit sechs Befehlen, Testzustände `drahtmodell-leer` und
  `drahtmodell-beispiel` und den Prüfbefehl `pruefen -- drahtmodell ablauf`. Ebenen sind Kind-Elemente eines
  `frame` (Ausgang `plane` mit `origin`, `normal`, `x_direction`).
- ap-52 (Spec gemergt, Tests gemergt) liefert das Feld `"ki": true` an Befehlen, Parameter-Schemas (Größe als
  String `"<Zahl> <Einheit>"`, Bezug als `<id>.<ausgang>`), die Werkzeugliste im MCP-Format, den Änderungssatz mit
  Entscheidungskarte und ein Testmodell (kleiner HTTP-Server) für den OpenAI-kompatiblen Anbieter.
- Der Rust-Kern ordnet nur nach Eingängen; `content` ist Enthaltensein, keine Berechnungsabhängigkeit, aber ein
  Element ist betroffen, wenn ein Element seines Untergraphen betroffen ist (`crates/graph/src/deps.rs`).
- Regeln: `docs/rules/geometrie.md` (OCP nur im Modul `kernel`, Toleranzen, Befunde, deterministisch, Golden-Test
  mit Volumen, Fläche, Schwerpunkt, Topologie-Zählung), `docs/rules/client.md` (erst wählen, dann tun; Griffe;
  Wertfeld; Tokens; Reaktionszeit < 100 ms; nichts blockiert > 16 ms).

## Goals / Non-Goals

**Goals:** Ein Mensch kann im Prototyp ohne Dialog und ohne Menü eine Ebene wählen, darauf Linien, Rechtecke und
Kreise mit Fangen und getippten Maßen zeichnen, einen geschlossenen Bereich wählen und ihn mit einem Griff zum
Körper hochziehen. Der Worker rechnet Bereiche und Körper exakt mit OCP. Dieselben Befehle stehen der KI zur
Verfügung. Alles Messbare ist per pytest prüfbar; der Halter ist der durchgehende Abnahmefall.

**Non-Goals:** siehe proposal.md – Nicht-Ziele.

## Decisions

### 1. Bedienaufteilung: Bedienung im Bild, Menüleiste zum Nachschlagen (Entscheidung des Nutzers, 2026-10-30)

Der Nutzer hat entschieden („mach einfach eine sinnvolle Aufteilung“): Die **Menüleiste bleibt nur als Nachschlage-
und Suchweg**; bedient wird **vorrangig im Bild**. Für diesen Change heißt das:

| Weg | Was dort ist | Muster bzw. Grundlage |
| --- | --- | --- |
| **Kontextleiste an der Auswahl** | über dem Gewählten im Modell (und gleich per Rechtsklick bzw. langem Drücken): bei einer Ebene „Skizze anlegen“, bei einem Bereich „Hochziehen“, bei einer Skizze „Skizze bearbeiten“, bei einem Hochziehen dessen Griff; höchstens 5 Einträge, häufigste zuerst | Kontextaktionen (`muster.md`, ADR-065 Punkt 3) |
| **Skizzier-Werkzeugleiste** | nur solange eine Skizze offen ist, schwebend am oberen Rand des Modells: Linie, Rechteck, Kreis, Fertig; jeder Eintrag zeigt sein Kürzel | neu (ADR-065 „Offen“, Entwurf G1); Katalog-Nachtrag beim Kernteam |
| **Tastenkürzel** | `S` Skizze anlegen, `L` Linie, `R` Rechteck, `K` Kreis, `E` Hochziehen, `Esc` bricht das Werkzeug ab bzw. schließt die Skizze, `Enter` übernimmt den getippten Wert | Befehlsregister (ADR-045); Kürzel sind Felder `kuerzel` der Befehle, keine eigene Tastenlogik |
| **Ziehen** | Zeichnen per Klick–Klick oder Ziehen; Höhe am Griff | ADR-044, ADR-063 Punkt 3 |
| **Menüleiste** | Dropdowns „Skizze“ und „Körper“ listen dieselben Befehle mit Kürzel zum Nachschlagen | ADR-065 Punkt 2 |
| **Suche** (Strg/Cmd+K) | findet jeden neuen Befehl | Suche (`muster.md`) |

Ein Befehl hat damit mehrere Orte, aber genau eine Wirkung (eine ID im Register). Kein Radialmenü (kein Muster).
Die belegten Kürzel des Registers (`H`, `W`, `F`, `F2`, `Entf`, `Alt+H`, `Mod+…`) bleiben unverändert; `S`, `L`,
`R`, `K`, `E` sind frei. Während das Wertfeld am Zeiger Eingaben annimmt (ab der ersten Ziffer), gehen Buchstaben
in das Feld (z. B. „1,2 m“), nicht an Kürzel.

Der Widerspruch zwischen `docs/rules/client.md` („keine Menüleisten“, „keine Werkzeugleiste“) und
`docs/design/muster.md`/ADR-065 (Menüleiste mit Dropdowns, Werkzeugleiste offen) wird nicht in diesem Change
aufgelöst: Er geht als Nachtrag an das Kernteam (Open Question 2).

### 2. Elementtypen und Typdefinitionen

Typdefinitionen in `format/types/skizze.json` (Apache-2.0, Format wie `format/types/drahtmodell.json`). Längen:
Dimension `length`, Standard-Einheit `mm`.

| Typ | Eingänge | Parameter | Ausgänge (Typ) |
| --- | --- | --- | --- |
| `sketch` (Skizze) | `ebene` (`plane`) | – | `sketch` (sketch) |
| `sketch_line` (Linie) | – | `u1`, `v1`, `u2`, `v2` (length) | `kurve` (curve) |
| `sketch_rectangle` (Rechteck) | – | `u1`, `v1`, `u2`, `v2` (length; zwei gegenüberliegende Ecken) | `kurve` (curve) |
| `sketch_circle` (Kreis) | – | `u`, `v` (Mittelpunkt), `d` (Durchmesser, length) | `kurve` (curve) |
| `extrude` (Hochziehen) | `skizze` (`sketch`) | `punkt_u`, `punkt_v` (length), `hoehe` (length, ≠ 0) | `koerper` (solid) |

- **Skizzenelemente** stehen im `content` genau einer Skizze und haben keine Eingänge; ihre Lage ist in den
  Skizzenkoordinaten (u entlang `x_direction` der Ebene, v entlang `normal × x_direction`, Ursprung `origin`).
  Ein Skizzenelement außerhalb einer Skizze erhält den Befund `not_in_sketch`.
- **Reihenfolge:** Der Worker berechnet beim Erreichen einer Skizze zuerst ihre Kinder (sie haben keine Eingänge),
  dann die Bereiche. Das passt zum Kern: Ändert sich ein Kind, ist die Skizze betroffen (`affected`), und damit
  jedes Hochziehen, das an `<Skizze>.sketch` hängt. Der Inhalts-Hash einer Skizze geht über `ebene` und die nach ID
  sortierten Hashes ihrer nicht verworfenen Kinder.
- **Fangen kopiert Koordinaten:** Ein an einem Endpunkt gefangener Punkt bekommt dieselben Zahlen wie der Endpunkt
  (kein Bezug zwischen Kurven, keine Zwangsbedingung). Geschlossen ist ein Linienzug, wenn Endpunkte auf
  `TOL_LINEAR` = 10⁻⁶ mm übereinstimmen.
- Rechteck mit Breite oder Höhe < `TOL_LINEAR`, Linie mit Länge < `TOL_LINEAR`, Kreis mit `d` < `TOL_LINEAR` →
  Befund `degenerate`.

### 3. Bereiche (Worker)

- Konturen: jedes Rechteck, jeder Kreis und jeder geschlossene Linienzug (Linien, die sich nur an Endpunkten
  berühren und eine einfache geschlossene Kette bilden). Offene Linien bilden keinen Bereich und ergeben keinen
  Befund.
- Schneiden oder berühren sich zwei Konturen außerhalb gemeinsamer Endpunkte, erhält die Skizze den Befund
  `curves_intersect` mit beiden Element-IDs; diese Konturen bilden keinen Bereich, alle anderen schon (ADR-050).
  Überlappende Bereiche werden in dieser Stufe nie aufgeteilt oder geraten.
- Verschachtelung: Ein Bereich ist eine Kontur minus die direkt in ihr liegenden Konturen (Löcher); jede innere
  Kontur ist selbst wieder ein Bereich.
- Ausgang `sketch`: `{"type": "sketch", "plane": {origin, normal, x_direction}, "bereiche": [{"punkt": [u, v],
  "flaeche": Größe mm2, "aussen": Element-ID-Liste, "loecher": Element-ID-Liste, "rand": {"unit": "mm", "zuege":
  [[[u, v] …] …]}}]}`. Genaue Gestalt der Felder: Abschnitt 7a.
  `punkt` ist ein innerer Punkt (Schwerpunkt der Fläche, falls innen; sonst Mitte des längsten Schnitts der
  Geraden v = v_Schwerpunkt mit der Fläche). `rand` sind Polylinien zur Anzeige (Kreise mit Sehnenfehler
  ≤ 0,01 mm). Reihenfolge: absteigende Fläche, dann `punkt` lexikographisch – nur zur Anzeige, nie zur Adressierung.
- Bereiche werden mit OCP gebildet (`BRepBuilderAPI_MakeWire`/`MakeFace`, Löcher als innere Wires); Fläche und
  Schwerpunkt aus `BRepGProp`.

### 4. Hochziehen und Körper (Worker)

- **Bereich über Punkt-Selektor** (ADR-016, „Selektor mit Begründung“): Das Hochziehen nimmt den innersten Bereich
  der Skizze, der `(punkt_u, punkt_v)` enthält. Enthält kein Bereich den Punkt (z. B. nach einer Änderung) →
  Befund `region_missing` mit Hinweis, nie geraten. Begründung und Alternative: Open Question 5.
- Körper = Prisma des Bereichs entlang `normal · hoehe` (`BRepPrimAPI_MakePrism`), negative Höhe gegen die Normale;
  `|hoehe|` < `TOL_LINEAR` → `degenerate`. Jedes Hochziehen erzeugt einen eigenen Körper; nichts wird vereinigt.
- Ausgang `koerper`: `{"type": "solid", "volumen" (mm3), "oberflaeche" (mm2), "schwerpunkt" [mm ×3], "huelle"
  {min, max} [mm ×3], "flaechen": Anzahl, "kanten": Anzahl, "netz": {"unit": "mm", "positionen": [Zahl …],
  "dreiecke": [Ganzzahl …]}, "kantenzuege": {"unit": "mm", "zuege": [[[x, y, z] …] …]}}` (Abschnitt 7a). Kennwerte aus der exakten Form (`BRepGProp`, `TopExp`), nicht aus dem Netz.
  Netz mit `BRepMesh_IncrementalMesh`, Sehnenfehler 0,05 mm, Winkel 0,25 rad – nur Anzeige. Größen als
  `{"value", "unit"}` wie in ap-50; einzige Ausnahme sind die Anzeige-Listen `netz`, `kantenzuege` und `rand`
  (Zahlen in mm, Einheit einmal als `"unit": "mm"` am Objekt; `netz.dreiecke` sind Indizes ohne Einheit).
- **Schema:** `format/kernel/ergebnis.schema.json` wird um `sketch` und `solid` ergänzt; `protocol` bleibt
  `cee-kernel/0`; Ergebnisse aus ap-50 bleiben gültig (additiv).
- **Toleranzen der Abnahme:** Lagen 10⁻⁶ mm; Volumen, Oberfläche, Fläche relativ 10⁻⁶; Schwerpunkt 10⁻⁶ mm;
  Topologie-Zählung exakt gleich der Vergleichsform, die der Test selbst mit build123d baut.
- Python-API für Tests wie ap-50: `cee_worker.kernel.rechnen(auftrag)` und `formen(auftrag)` (liefert auch die
  Solids der Hochziehen und die Faces der Bereiche unter `<Skizze-ID>#<i>` nur zur Prüfung; nie im Ergebnis).
- Beispiel `format/examples/skizze.json`: der Halter aus Abschnitt 8.

### 5. Direktbedienung im Prototyp

**Ebene wählen und Skizze anlegen:** Ebenen aus ap-50 sind wählbar. „Skizze anlegen“ (`skizze.anlegen`) auf einer
gewählten Ebene legt ein `sketch` an, öffnet es (Ort „Skizze“ im Pfad, ADR-063 Punkt 4) und dreht die Kamera in
≤ 400 ms senkrecht auf die Ebene (Blickrichtung −`normal`, `x_direction` zeigt nach rechts, Parallelprojektion).
Beim Öffnen steht die Kamera im Maßstab 5 px je mm, zentriert auf den Ursprung der Ebene (bei 1440 × 900 px rund
200 mm sichtbar). Der Fangradius von 8 px entspricht damit 1,6 mm; alle Testzustände und Abläufe dieses Changes
zoomen nicht, die Fang-Scenarios rechnen mit diesem Maßstab. Einpassen bleibt ein eigener Befehl.
Ohne gewählte Ebene fordert die Rückmeldezeile „Ebene wählen“ an, der nächste Klick auf eine Ebene schließt ab.
„Fertig“ (`skizze.fertig`) oder `Esc` ohne aktives Werkzeug schließen die Skizze; die Kamera kehrt in die Lage vor
dem Öffnen zurück. Doppelklick auf eine Skizze bzw. „Skizze bearbeiten“ öffnet sie wieder.

**Zeichnen (Eigenbau):** Linie (`L`): Klick setzt Start, Klick setzt Ende, danach beginnt die nächste Linie am
Ende (Kette), `Esc` beendet die Kette. Rechteck (`R`): Klick erste Ecke, Klick gegenüberliegende Ecke (oder
Ziehen). Kreis (`K`): Klick Mittelpunkt, Klick auf den Rand. Während des Zeichnens zeigt eine Gummiband-Vorschau
die Form; erst der abschließende Klick legt das Element an (ein Rückgängig-Schritt je Element).

**Fangen:** Fangradius 8 px. Vorrang: Endpunkt (Linien-Enden, Rechteck-Ecken) > Mittelpunkt (Linien- und
Rechteckseiten-Mitte, Kreismittelpunkt) > Raster. Rasterweite fest 10 mm in Skizzenkoordinaten (Entscheidung,
siehe Open Question 6).
Waagerecht bzw. senkrecht: weicht die Richtung vom ersten Punkt um ≤ 3° von u bzw. v ab, rastet sie genau ein.
Anzeige: kleines Symbol am Fangpunkt (Endpunkt Quadrat, Mittelpunkt Dreieck, Raster Kreuz) und für waagerecht
bzw. senkrecht ein Kürzel „H“ bzw. „V“ neben dem Zeiger, gestrichelte Hilfslinie; Farbe aus Tokens (`akzent`).
`Alt` gedrückt hält Fangen aus. Ein gefangener Wert ist exakt der Zielwert (Abschnitt 2).

**Maß tippen:** Ab der ersten Ziffer während eines Werkzeugs erscheint das Wertfeld am Zeiger (Muster Wertfeld):
Linie – Länge, `Tab` – Winkel; Rechteck – Breite, `Tab` – Höhe; Kreis – Durchmesser. Eingaben mit Einheit und
einfachen Formeln („1,2 m“, „600 + 2 × 50“), ohne Einheit mm (ADR-057, Parser aus `src/wert/`). `Enter` legt das
Element mit dem Maß in Zeigerrichtung an; ein ungültiger Wert zeigt einen Befund am Feld und legt nichts an. Danach
stehen alle Werte in den Eigenschaften.

**Bereich wählen:** In einer sichtbaren Skizze ist jeder Bereich aus dem Worker-Ergebnis wählbar (Klick ins
Innere, Löcher ausgenommen). Überfahren zeigt eine dünne Kontur, Auswahl die Kontur in der Akzentfarbe, Fläche
leicht gefüllt (`akzent-flaeche`). Auswahl im Modell immer nur über Farbe: Linienbreiten und Größen ändern sich
nicht. Auf einem Tablet ersetzt Antippen das Überfahren (ADR-060). Die Auswahl adressiert einen Bereich als
`{skizze, punkt_u, punkt_v}` mit dem Klickpunkt.

**Hochziehen und Griff:** „Hochziehen“ (`E`, Kontextleiste am Bereich) zeigt sofort eine Geister-Vorschau mit
10 mm und einen Pfeilgriff (TransformControls, nur Achse `normal`) in der Mitte des Bereichs; das Wertfeld am
Zeiger ist bereit. Ziehen ändert die Höhe live (Vorschau als Prisma aus dem Bereichsrand im Browser, ADR-032
„schnelle Netz-Vorschau“), Zahl am Zeiger; tippen setzt den genauen Wert; `Enter` oder Loslassen legt das
`extrude` an, `Esc` bricht ohne Änderung ab. Danach ist das Hochziehen gewählt, die Höhe steht in den
Eigenschaften, und der Griff erscheint wieder, solange es gewählt ist (Ziehen ändert `hoehe`, ein Rückgängig-
Schritt). Nach dem Anlegen wird die Skizze in der Ansicht ausgeblendet (Auge in der Struktur, ändert den Graphen
nicht). Es gibt keinen Dialog: Der Abnahmetest prüft, dass kein Element mit `role="dialog"` oder `<dialog>` offen
ist.

**Ansichtsbausteine:**

| Baustein | Bibliothek (Lizenz) | Aufgabe |
| --- | --- | --- |
| Picking | `three-mesh-bvh` (MIT) | Strahltest gegen Körpernetze, Bereiche, Kurven |
| Kontur | OutlinePass aus `three/examples/jsm` (MIT) bzw. `postprocessing` (Zlib) | Überfahren dünn, Auswahl in der Akzentfarbe |
| Kanten | Line2 aus `three/examples/jsm` (MIT) | Kantenzüge der Körper und Skizzenkurven mit fester Breite in px |
| Kamera | `camera-controls` (MIT) | Senkrecht auf Ebene, Einpassen (`ansicht.einpassen`), weiche Übergänge; bestehende Navigationsprofile aus `src/eingabe/` bleiben die Belegung |
| Ansichtswürfel | `three-viewport-gizmo` (MIT) | oben rechts im Modell, Weltachsen X rot, Y grün, Z blau (Tokens `achse.*`) immer sichtbar; Klick auf eine Seite ruft `ansicht.vorne`, `ansicht.oben` … bzw. `ansicht.isometrisch` |
| Höhengriff | TransformControls aus `three/examples/jsm` (MIT) | eine Achse, Ziehen setzt `hoehe` |

`three-cad-viewer` und PlaneGCS werden nicht eingebaut. Darstellung der Körper: Flächen neutral nach Tokens,
Kanten 1,5 px, Szenenobjekte tragen die Element-ID. Die Lage kommt ausschließlich aus dem Worker-Ergebnis; einzige
Ausnahme ist die Geister-Vorschau während des Ziehens.

**Testzustände:** `?zustand=skizze-leer` (Koordinatensystem K0 im Ursprung, sonst leer), `?zustand=skizze-halter`
(Inhalt von `format/examples/skizze.json`), `?zustand=skizze-last` (nur für die Messung in Abschnitt 7).

### 6. Befehle im Register

Neu in `src/befehle.json`, alle ohne `folgt`:

| ID | Familie / Untergruppe | Kürzel | Bezug | `ki` | Parameter (für das Werkzeug fett = Pflicht) |
| --- | --- | --- | --- | --- | --- |
| `skizze.anlegen` | Skizze zeichnen / Skizze | `S` | `plane` | ja | **`ebene`** (plane), `name` |
| `skizze.linie` | Skizze zeichnen / Zeichnen | `L` | offene Skizze | ja | **`skizze`**, **`u1`, `v1`, `u2`, `v2`** (Länge) |
| `skizze.rechteck` | Skizze zeichnen / Zeichnen | `R` | offene Skizze | ja | **`skizze`**, **`u1`, `v1`, `u2`, `v2`** (Länge) |
| `skizze.kreis` | Skizze zeichnen / Zeichnen | `K` | offene Skizze | ja | **`skizze`**, **`u`, `v`, `d`** (Länge) |
| `skizze.fertig` | Skizze zeichnen / Skizze | `Esc` (ohne Werkzeug) | offene Skizze | nein | – |
| `skizze.bearbeiten` | Skizze bearbeiten / Skizze | – | `sketch` | nein | `skizze` |
| `koerper.hochziehen` | Körper erzeugen / Körper | `E` | Bereich | ja | **`skizze`**, **`punkt_u`, `punkt_v`, `hoehe`** (Länge) |

Ohne Parameter wirken die Befehle wie in Abschnitt 5 (Klickweg); mit Parametern legen sie das Element direkt an
(gleiche Graph-Operation). KI-Aufrufe brauchen keine offene Skizze und keine Auswahl. Werkzeugergebnis wie ap-52;
bei Skizzen zusätzlich `bereiche: [{punkt, flaeche}]`, damit ein Modell den Punkt für `koerper.hochziehen` wählen
kann; bei Körpern `volumen` und `huelle`. Dropdowns „Skizze“ und „Körper“ unter „Modellieren“ (≤ 12 Einträge);
Kontextaktionen wie Abschnitt 1. Übersetzungsschlüssel `befehl.<id>` und `ki.werkzeug.<id>` (de, en).

### 7. Prüfbefehle und Budgets

`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- skizze <unterbefehl> … --json` (startet Vorschau und
Brücke selbst, Playwright, Chromium, 1440 × 900 px):

- `befehle` → `{befehle: [{id, familie, untergruppe, kuerzel, ki, folgt, orte: [Ort]}]}` für die 7 Befehle; Orte
  wie bei ap-50, zusätzlich `werkzeugleiste`.
- `ablauf --zustand <name> --datei <ablauf.json>` → wie `drahtmodell ablauf` aus ap-50 mit zusätzlichen Schritten
  und Schnappschuss-Feldern nach Abschnitt 7a.
- `messen --dreiecke <n>` → `{raycast_ms: [..], median_ms}` auf einem Testnetz mit n Dreiecken (Zustand
  `skizze-last`, 200 Zeiger-Positionen).
- `lizenzen` → `{pakete: [{name, version, lizenz}]}` aller direkten Abhängigkeiten aus `package-lock.json`;
  `lizenz` ist der SPDX-Ausdruck aus der Sperrdatei. Erlaubt ist ein Ausdruck, wenn jeder Name (bei `OR`: mindestens
  einer) in dieser Liste steht. Quelle ist ADR-034 („Erlaubte Abhängigkeiten“) mit ADR-061 (Schriften): `MPL-2.0`,
  `Apache-2.0`, `MIT`, `BSD-2-Clause`, `BSD-3-Clause`, `ISC`, `Zlib`, `CC0-1.0`, `Unicode-3.0`, `Unicode-DFS-2016`,
  `0BSD`, `BSL-1.0`, `PSF-2.0` und `OFL-1.1` (die Schriftpakete `@fontsource…` des Prototyps). `deny.toml` ist die
  Fassung für Rust (ohne `PSF-2.0`, dafür `Apache-2.0 WITH LLVM-exception`) und gilt hier nicht. Nicht auf der Liste
  und damit nicht erlaubt ist z. B. `MIT-0`; ein Nachtrag dazu wäre Sache des Kernteams.

### 7a. Formate der Ergebnisse und der Prüfbefehle (festgelegt nach dem Test-Review)

Grundsatz: Wo ap-50 (`cee-kernel/0`, `drahtmodell ablauf`) oder ap-52 (`ki ablauf`, Werkzeugergebnis) ein Format
hat, gilt es unverändert; hier steht nur, was neu ist.

**Worker-Ergebnis (Ausgänge, Befunde):**

| Feld | Gestalt |
| --- | --- |
| Eingang `ebene` der Skizze | Bezug `<id>.<ausgang>` auf einen Ausgang vom Typ `plane`: `<frame>.xy`, `<frame>.yz`, `<frame>.zx` (Ausgänge des Koordinatensystems, ap-50) oder `<ebene>.plane` (Kind-Element „XY-Ebene“ usw.). Beide sind gleichwertig. Klickt man in der Vorschau ein Ebenen-Element an, speichert sie `<ebene>.plane`; Beispiele und Tests schreiben `K0.xy`. |
| Eingang `skizze` des Hochziehens | `<skizze>.sketch` |
| `bereiche[].punkt` | zwei Größen `[{"value", "unit": "mm"}, …]` (u, v) |
| `bereiche[].flaeche`, `oberflaeche` | Größe mit Einheit `mm2` (UCUM) |
| `volumen` | Größe mit Einheit `mm3` (UCUM) |
| `schwerpunkt`, `huelle.min`, `huelle.max` | je drei Größen in `mm` |
| `flaechen`, `kanten` | Größe mit Einheit `1` (dimensionslos wie Richtungen in ap-50), Wert ganzzahlig |
| `netz` | `{"unit": "mm", "positionen": [x, y, z, x, y, z, …], "dreiecke": [i, j, k, …]}`; beide Listen flach, Indizes ab 0, drei je Dreieck |
| `kantenzuege`, `rand` | `{"unit": "mm", "zuege": [[[x, y, z] …] …]}` bzw. `[[[u, v] …] …]`; beim Rand ist der erste Zug außen, dann die Löcher |
| Befund | wie ap-50 `{"code", "element", "input"?, "hinweis"}` in `results[i].befunde` des betroffenen Elements, ergänzt um das optionale Feld `beteiligt` (Liste von Element-IDs, nach ID sortiert) |
| `curves_intersect` | steht an der **Skizze** (`element` = Skizzen-ID), `beteiligt` = die beiden Kurven-IDs; die Skizze bleibt `aktuell` und liefert die übrigen Bereiche |
| `degenerate`, `not_in_sketch` an Skizzenelementen | am Skizzenelement, `state` = `fehlerhaft`, kein Ausgang |
| `region_missing`, `degenerate` am Hochziehen | am `extrude`, `state` = `fehlerhaft`, kein Ausgang `koerper` |
| Zahl ohne Einheit | Warnung des Kerns `unit_assumed` (Code aus `crates/graph/src/validate.rs`) als Befund am Element; es bleibt `aktuell` |
| falsche Dimension, unbekannte Einheit | Befund `unit` (wie ap-50), Code des Kerns (`dimension_mismatch`, `unknown_unit`) im `hinweis`; `state` = `fehlerhaft` |
| verworfen, Name | `meta.verworfen = true` bzw. `meta.name` (wie ap-50); beide gehen nicht in den Inhalts-Hash ein |

**Verweise auf Elemente in Ablauf-Schritten und Befehlsargumenten:** eine Element-ID; oder `<typ>#<n>` (n-tes
Wurzelelement dieses Typs in Graph-Reihenfolge, ab 1); oder `<typ>#<n>><kindtyp>#<m>` (m-tes Kind dieses Typs
des n-ten Wurzelelements, ab 1). Die Kinder eines Koordinatensystems stehen in der Reihenfolge aus ap-50: Ursprung,
X-, Y-, Z-Achse, XY-, YZ-, ZX-Ebene; `frame#1>plane#1` ist also die XY-Ebene, `frame#1>plane#3` die ZX-Ebene.
Bezug-Parameter von Befehlen und KI-Werkzeugen nehmen `<id>.<ausgang>` (wie ap-52) oder ein Element ohne Ausgang; ohne
Ausgang wird der einzige passende Ausgang ergänzt (Ebenen-Element → `.plane`, Skizze → `.sketch`). Ist das nicht
eindeutig (ein `frame` als `ebene`), ist das ein Fehler `input_type`. Im Graphen steht immer `<id>.<ausgang>`.

**Zusätzliche Ablauf-Schritte** (neben denen aus ap-50 – `befehl`, `klick: {element}`, `klick: {modell_mm}`,
`eigenschaft: {element, feld, eingabe}`, `taste`, `warten_ms` – und ap-52 – `chat`):

| Schritt | Bedeutung |
| --- | --- |
| `{zeiger: {skizze_mm: [u, v], aktion}}` | Zeiger auf Skizzenkoordinaten der offenen Skizze |
| `{zeiger: {element, skizze_mm: [u, v], aktion}}` | Zeiger auf Koordinaten einer bestimmten Skizze, auch wenn sie geschlossen ist (z. B. Bereich wählen) |
| `{zeiger: {element, aktion}}` | Zeiger auf ein Element (z. B. Doppelklick auf eine Skizze) |
| `{zeiger: {modell_mm: [x, y, z], aktion}}` | Zeiger auf einen Weltpunkt |
| `aktion` | `bewegen`, `klicken`, `doppelklick`, `druecken`, `loslassen` |
| `{tippen: "<Text>"}` | Zeichen nacheinander tippen (Wertfeld) |
| `{taste: "<Name>"}` | Tastennamen wie Playwright: `S`, `L`, `R`, `K`, `E`, `Escape`, `Tab`, `Enter` |
| `{griff: {element?, ziehen_mm, dauer_ms?, halten?}}` | am Höhengriff ziehen: ohne `element` am gerade aktiven Griff (nach `E`), mit `element` am Griff des gewählten bzw. genannten Hochziehens; `ziehen_mm` entlang der Normale; `dauer_ms` Dauer des Ziehens (Standard 300 ms); `halten: true` lässt nicht los |
| `{klick: {wuerfel: "vorne" \| "oben" \| "vorne-rechts-oben"}}` | Klick auf Seite bzw. Ecke des Ansichtswürfels |

**Schnappschuss** (neben den Feldern aus ap-50 – `graph`, `graph_hash`, `ergebnis`, `szene`, `auswahl`, `struktur`,
`befunde`, `rueckmeldung`, `bereit_ms`, `anfragen`, `konsolenfehler` –, ap-41b – `protokoll` (Aktionsprotokoll,
Einträge mit `befehl`) – und ap-52 – `chat` mit `karten`, `geister`, `verlauf` mit `urheber`):

| Feld | Gestalt |
| --- | --- |
| `skizze_offen` | ID der offenen Skizze oder `null` |
| `werkzeug` | aktiver Befehl (`skizze.linie` …) oder `null` |
| `fang` | `{art: "endpunkt" \| "mittelpunkt" \| "raster" \| null, lage_mm: [u, v] \| null, richtung: "waagerecht" \| "senkrecht" \| null, anzeige: "H" \| "V" \| null}` – `anzeige` ist das Kürzel am Zeiger |
| `wertfeld` | `{sichtbar, feld: "laenge" \| "winkel" \| "breite" \| "hoehe" \| "durchmesser" \| null, text, befund: Text \| null}` |
| `kamera` | `{richtung: [x, y, z], oben: [x, y, z], azimut_deg, elevation_deg, projektion: "parallel" \| "perspektivisch", ms_bis_ruhe}`; Azimut und Elevation wie `blick()` in `src/wirkungen.ts` |
| `ansichtswuerfel` | `{achsen: [{achse: "x" \| "y" \| "z", farbe, sichtbar}]}` |
| `bereiche` | Bereiche aller sichtbaren Skizzen: `[{element, skizze, punkt: [u, v], flaeche}]`, Zahlen in mm bzw. mm² (Rohdaten der Vorschau, wie `lage_mm` in ap-50); `punkt` = `punkt` aus dem Worker |
| Schlüssel eines Bereichs | `element` = `<Skizzen-ID>@<u>;<v>` mit dem `punkt` des Bereichs in mm (Kurzdarstellung wie JavaScript `String(zahl)`); dieselbe Schreibweise steht in `kontur[].element`, `auswahl` und `linienbreiten`. Sie dient nur der Anzeige im Prüfbefehl; adressiert wird ein Bereich im Graphen nur über `punkt_u`, `punkt_v` (Abschnitt 4) |
| `kontur` | `[{element, art: "hover" \| "auswahl", farbe}]`; `farbe` als Hex-Wert des Tokens |
| `linienbreiten` | `{<element>: px}` aller sichtbaren Kurven, Kanten und Bereichsränder |
| `szene[].lage_mm` | wie ap-50; bei Körpern `{schwerpunkt: [x, y, z], min: [x, y, z], max: [x, y, z]}` |
| `geister` | wie ap-52 `[{element, art, …}]`, bei Körpern zusätzlich `huelle_mm: {min: [x, y, z], max: [x, y, z]}`; **ein Eintrag je neuem Element des Änderungssatzes** bzw. je Vorschau beim Ziehen |
| `eigenschaften` | angezeigte Eigenschaften der Auswahl als `{<gruppe>: {<feld>: "<angezeigter Text>"}}` |
| `werkzeugleiste`, `kontextleiste` | IDs der angezeigten Befehle; die Kontextleiste erscheint, sobald etwas gewählt ist (Klick, `auswahl.*`), und zeigt die Befehle zur Auswahl; ohne Auswahl leer |
| `dialoge` | Anzahl offener Elemente mit `role="dialog"` oder `<dialog open>` |
| `hover_ms` | Zeigerbewegung bis Kontur im Bild |
| `bild_ms` | Liste der Bildzeiten (ms) während des Schritts |
| `long_tasks` | Anzahl Long Tasks ≥ 50 ms während des Schritts |
| `bereit_ms` | wie ap-50; nach `griff` ohne `halten`: Loslassen bis exakter Körper angezeigt |

**Änderungssatz der KI (ap-52):** `neu` nennt je erfolgreichem Werkzeugaufruf genau das angelegte Element; die
sieben Kinder eines Koordinatensystems zählen nicht extra (sie entstehen mit dem `frame`). `geister` hat einen Eintrag
je Element in `neu`. Der Halter über den Chat (Abschnitt 8) hat damit 9 Aufrufe und 9 neue Elemente: S1, Rechteck,
2 Kreise, Hochziehen, K1 (über `referenz_koordinatensystem` mit `z`, Werkzeug aus ap-52), S2, Rechteck, Hochziehen.
**Werkzeugergebnis** wie ap-52 (Größen als Strings); bei `skizze_*`-Aufrufen zusätzlich `bereiche: [{punkt: ["<u> mm",
"<v> mm"], flaeche: "<a> mm2"}]` der betroffenen Skizze (höchstens 10 Einträge, dann `bereiche_anzahl`, damit das
Ergebnis ≤ 600 Zeichen bleibt), bei `koerper_hochziehen` `volumen` und `huelle`.

| Messung | Budget | Wie gemessen |
| --- | --- | --- |
| Worker warm: Halter (2 Skizzen, 4 Kurven, 2 Hochziehen) | ≤ 0,5 s | Senden bis Empfangen an `--stdio`, Median aus 5 |
| Worker warm: Skizze mit 100 Rechtecken und 100 Kreisen ohne Schnitt, Bereiche | ≤ 1,0 s | wie oben |
| Überfahren bis Kontur sichtbar | ≤ 100 ms | `hover_ms`, Median aus 5 |
| Strahltest auf 200 000 Dreiecken | ≤ 4 ms Median | `messen --dreiecke 200000` |
| Ziehen am Griff | Median `bild_ms` ≤ 16,7 ms, 0 `long_tasks` | `ablauf` mit `griff` über 2 s |
| Loslassen bis exakter Körper angezeigt | ≤ 500 ms | `bereit_ms` (wie ap-50), Median aus 5 |
| Kamera senkrecht auf Ebene | ≤ 400 ms, Abweichung ≤ 0,1° | `kamera.ms_bis_ruhe`, Winkel `richtung` zu −`normal` |

### 8. Abnahmefall Halter

Quelle: `Params()` aus `parts/examples/halter.py` (breite 60 mm, tiefe 40 mm, dicke 8 mm, steg_hoehe 50 mm,
bohrung_d 6,6 mm, bohrung_abstand 40 mm). Der Test liest die Werte aus der Datei, nicht aus dieser Tabelle.

1. Skizze S1 auf der XY-Ebene von K0: Rechteck (−breite/2, −tiefe/2)–(breite/2, tiefe/2), Kreise Ø bohrung_d bei
   (±bohrung_abstand/2, dicke/2). Bereich: Rechteck minus zwei Kreise. Hochziehen um `dicke` → Grundplatte mit
   Durchgangsbohrungen.
2. Koordinatensystem K1 mit z = dicke; Skizze S2 auf der XY-Ebene von K1: Rechteck (−breite/2, −tiefe/2)–
   (breite/2, −tiefe/2 + dicke). Hochziehen um `steg_hoehe` → Steg.

Sollwerte: Der Test baut dieselben beiden Formen mit build123d (`Box`, `Cylinder` mit `Mode.SUBTRACT`, Lagen wie
in `halter.py`, ohne `fillet`) und vergleicht Volumen, Oberfläche, Schwerpunkt und Topologie-Zählung je Körper
(Toleranzen Abschnitt 4); Summe der Volumen = Volumen der Vergleichsform ohne Verrundung (bei den Standardwerten
42 652,6 mm³). Unterschied zu `halter.py`: zwei Körper statt eines, keine Verrundung (Open Question 7).

Der Halter wird auf drei Wegen gebaut und muss dasselbe Ergebnis liefern: (a) direkt als Auftrag an den Worker,
(b) im Prototyp über Klicks, Fangen und getippte Maße (`ablauf`), (c) über den KI-Chat mit dem Testmodell aus
ap-52, das die Werkzeugaufrufe fest vorgibt, als Änderungssatz mit Übernehmen.

### 9. Abnahmetests (Zuordnung)

Pfad `tests/acceptance/ap-53-skizze-hochziehen/`. Voraussetzungen wie ap-50.

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Typdefinitionen registrieren (Skizze und `extrude`); kein neuer Typ im Code von `crates/graph`; Schemas gültig, ap-50-Ergebnisse weiter gültig | Typdefinitionen (beide Fähigkeiten), Protokoll-Erweiterung |
| AK-2 | Linie, Rechteck, Kreis: Lage in Weltkoordinaten auf gedrehter Ebene, entartete Fälle | Skizzenelemente |
| AK-3 | Bereiche: einfach, Loch, Linienzug, offene Linie, Schnitt → Befund | Bereiche |
| AK-4 | Hochziehen: Quader, Zylinder, negative Höhe, Kennwerte, Netz, Befund `region_missing` | Hochziehen |
| AK-5 | Determinismus, Inhalts-Hash folgt Kindern der Skizze, Budget Worker | Hash, Leistung |
| AK-6 | Halter direkt im Worker gegen build123d-Vergleichsform | Abnahmefall Halter |
| AK-7 | Befehle, Kürzel, Orte, Kontext- und Dropdown-Grenzen, Werkzeugleiste nur in offener Skizze | Befehle |
| AK-8 | Skizze anlegen, Kamera senkrecht, Fertig/Esc, Kamera zurück | Skizze anlegen |
| AK-9 | Zeichnen, Fangen (Endpunkt, Mittelpunkt, Raster, waagerecht/senkrecht), Maß tippen | Zeichnen |
| AK-10 | Bereich wählen, Kontur nur über Farbe, Hochziehen mit Griff und Wert, kein Dialog | Bereich und Griff |
| AK-11 | Halter in der Vorschau per `ablauf` | Abnahmefall Halter |
| AK-12 | KI-Werkzeuge im Register, KI-Skizzenwerkzeug wie Klickweg mit Bereichen im Ergebnis, Halter per Testmodell als Änderungssatz (9 neue Elemente) | KI-Werkzeuge |
| AK-13 | Ansichtswürfel, Picking-Budget, Hover-Budget, Bildzeiten, Lizenzen | Ansichtsbausteine |

### 10. Klick-Anleitung „Ausprobieren“ (für die Scenarios `[mensch]` und den PR)

1. `bash spikes/ux-prototyp-2/vorschau.sh` starten, Adresse öffnen, über das Start-Menü ein leeres Teil anlegen
   und „Koordinatensystem setzen“ wählen.
2. Die XY-Ebene anklicken. Über ihr erscheint „Skizze anlegen“ – anklicken (oder `S`). Erwartung: Die Ansicht
   dreht sich von oben auf die Ebene, oben im Bild erscheinen Linie, Rechteck, Kreis, Fertig.
3. `R` drücken, in die Nähe des Ursprungs klicken (der Fangpunkt rastet ein), Maus wegziehen, `60`, `Tab`, `40`,
   `Enter` tippen. Erwartung: Rechteck 60 × 40 mm.
4. `K` drücken, irgendwo im Rechteck klicken, `6,6` und `Enter`. Noch einen Kreis daneben.
5. „Fertig“ anklicken. Die Ansicht dreht zurück.
6. In das Rechteck (nicht in die Kreise) klicken: Der Bereich wird blau umrandet. Darüber „Hochziehen“ (oder `E`).
   Am Pfeil ziehen und beobachten, wie der Körper mitwächst; dann `8` und `Enter` tippen. Erwartung: Platte 8 mm mit
   zwei Löchern, rechts steht die Höhe 8 mm und lässt sich ändern.
7. Ansichtswürfel oben rechts: auf „Vorne“ klicken, dann auf eine Ecke.
8. Im Chat (mit eingerichtetem Modell) schreiben: „Zeichne auf der XY-Ebene ein Rechteck 30 × 20 mm und zieh es
   15 mm hoch.“ Erwartung: eine Karte mit Vorschau, Übernehmen legt den Körper an.

## Risks / Trade-offs

- **Bereich über Punkt** → Wird eine Kontur so geändert, dass der Punkt herausfällt, entsteht ein Befund statt
  eines falschen Körpers. Robuster wäre eine Adressierung über die begrenzenden Kurven (Open Question 5); sie
  bräuchte Listen-Eingänge, die das Format noch nicht hat.
- **Schnittfreie Skizzen** → Sich schneidende Kurven ergeben keinen Bereich. Das ist eine Einschränkung, verhindert
  aber geratene Bereiche, bis ap-12 und ap-39 Identität und Aufteilung klären.
- **camera-controls statt eigener Navigation** → Die Navigationsprofile aus ap-41b müssen erhalten bleiben; die
  Abnahmetests von ap-41b/ap-41c laufen weiter (Task 2.1 prüft sie).
- **Wegwerf-Prototyp** → Bedienung entsteht in `spikes/`, dauerhaft sind Typdefinitionen, Protokoll und Worker.
- **Nacht 2 ist die schwerste** (Ansichtsbausteine, Skizze öffnen, Zeichnen mit Fangen). Entlastet: Die Befehle im
  Register (reine Daten) sind nach Nacht 1 vorgezogen (Task 1.5). Reicht die Nacht nicht, bleibt 2.4 für den Beginn
  von Nacht 3; mehr als drei Gruppen gibt es nicht.
- **Bildzeiten im kopflosen Chromium** schwanken; Budgets gelten als Median, Messung wie ap-50 warm.

## Migration Plan

Keine Daten zu migrieren (keine neue `SCHEMA_VERSION`, Protokoll additiv). Rückbau: `format/types/skizze.json`,
`format/examples/skizze.json`, die Worker-Module für Skizze und Hochziehen und die Prototyp-Ergänzungen entfernen;
die Schema-Ergänzung ist optional und stört ap-50 nicht.

## Open Questions

1. **Abhängigkeit von ap-52 – entschieden.** Die KI-Scenarios (AK-12) brauchen Werkzeugliste, Änderungssatz und
   Testmodell aus ap-52. Entscheidung: `depends_on` enthält `ap-50-wireframe-basics` und
   `ap-52-ki-konstruktion-wireframe`; den Eintrag in `openspec/queue.yaml` macht das Kernteam später.
2. **Nachtrag Bedienaufteilung (Kernteam, eigener Branch `adr/…`, nicht in diesem Change).** Die Entscheidung des
   Nutzers vom 2026-10-30 (Abschnitt 1) widerspricht `docs/rules/client.md` („keine Menüleisten“, „keine
   Werkzeugleiste“, „Zahlen stehen nur im Inspektor“) und passt nicht ganz zu ADR-065 (Menüleiste als Hauptweg,
   schwebende Werkzeugleiste offen, Punkt 3 „kein zweites Werkzeugfeld mit denselben Befehlen“) und zu
   `docs/design/muster.md` (Dropdowns zeigen alle Befehle). Vorschlag: ADR-065 und Musterkatalog um „Bedienung im
   Bild, Menüleiste zum Nachschlagen“ und das Muster „Werkzeugleiste in der Skizze“ ergänzen, `docs/rules/client.md`
   angleichen.
3. **Neue Muster.** Ansichtswürfel, Fang-Anzeige und Skizzier-Werkzeugleiste stehen nicht im Musterkatalog.
   Vorschlag: Aufnahme nach dem Ausprobieren dieses Prototyps per ADR-Nachtrag; bis dahin nur im Prototyp.
4. **Maß tippen beim Zeichnen.** ADR-063 Punkt 3 erlaubt Zahlen am Zeiger beim Ziehen. Dieser Change wendet das
   auch auf das Zeichnen an (Länge, Breite, Durchmesser). Vorschlag: so verstehen. Bei Nein: Maße nur nachträglich in
   den Eigenschaften.
5. **Wie ein Bereich adressiert wird.** Vorschlag: über einen Punkt in Skizzenkoordinaten (einfach, für Mensch und
   KI gleich, bei Unklarheit ein Befund). Alternative: über die Element-IDs der begrenzenden Kurven (robuster bei
   Änderungen, braucht Listen-Eingänge im Format und gehört dann zu ap-12).
6. **Raster – entschieden.** Feste Rasterweite 10 mm. Begründung: Sie ist für Abnahmetests, KI-Aufrufe und
   Ausprobieren gleich und nachvollziehbar; bei 5 px je mm liegen die Rasterpunkte 50 px auseinander und sind gut zu
   treffen; die Halter-Maße liegen auf dem Raster oder werden getippt. Ein Raster, das dem Zoom folgt (1, 5, 10,
   50 mm …), kann nach dem Ausprobieren als eigener kleiner Change folgen.
7. **Halter als zwei Körper ohne Verrundung.** Ohne boolesche Operationen und Verrundung (ap-45) entsteht der Halter
   als Grundplatte mit Bohrungen und Steg nebeneinander. Vorschlag: so lassen; Vereinigen und Verrunden folgen mit
   ap-45. Bei Nein: „Hinzufügen“ als Modus des Hochziehens in diese Stufe aufnehmen (größerer Umfang).
8. **Arbeitspaket und Glossar.** Vorschlag: ap-53 als M1-Baustein nach ap-50 in die Tabelle von `docs/konzept.md`
   eintragen („Skizze und Hochziehen im Prototyp, Teil von ap-12 vorgezogen“) und Skizze, Bereich, Hochziehen,
   Körper in `docs/glossar.md` aufnehmen.
