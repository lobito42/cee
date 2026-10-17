## Context

Siehe proposal.md – Why. Elementform laut ADR-028: `id`, `type`, `inputs`, `params`, `outputs`, `content`,
`meta`. Ein Bauteil ist ein Element mit Untergraph in `content`, eine Baugruppe ebenso.

Festlegungen für den Entwurf: Ein Projekt ist `{"schema_version": <n>, "elements": [...]}`. `inputs` ist ein
Objekt Name → Referenz `"<id>.<output>"`, `outputs` ein Objekt Name → Ausgabetyp, `params` ein Objekt
Name → Wert, `content` eine Liste von Elementen (leer, wenn kein Untergraph), `meta` ein Objekt. Alle sieben
Felder sind immer vorhanden. Elementtypen im Beispiel mindestens (ADR-038/039): `origin`, `level`, `wall`,
`slab`, `opening`, `furniture`, `absorber`, `material`, `sketch`, `extrude`, `part`, `analysis`.
Wände, Decken, Böden und Absorber verweisen über den Eingang `material` (bzw. `material_0`, `material_1` …
bei Schichtaufbauten) auf `material`-Elemente. Ein Material trägt in `params` mindestens `alpha` als Objekt
mit den Oktavbändern `125`, `250`, `500`, `1000`, `2000`, `4000`.

Komponenten und Instanzen (ADR-043): Eine `component` hat `params.parameters` (Name → Objekt mit mindestens
`default`), `params.variants` (Name → Parametersatz, mindestens zwei Varianten), einen Untergraphen in
`content` und den Ausgang `definition`. Eine `instance` hat den Eingang `definition` =
`"<komponenten-id>.definition"` und `params` = `{"variant": "<name>", "overrides": {…}}`. Im Beispiel ist das
Deckensegel eine Komponente, deren Untergraph einen per Skizze und Extrusion gebauten `absorber` enthält; im
Raum stehen mindestens drei Instanzen davon, mindestens eine mit Überschreibung.

Fachneutralität (ADR-046, ADR-047): Das Schema zählt keine Fachtypen auf (`type` ist ein freier String).
Ein zweites Beispiel `format/examples/baugruppe.json` enthält keine Raumtypen, sondern eine `assembly` mit
mindestens einem `part` (Skizze, Extrusion, Material), eine Komponente (z. B. Schraube mit Varianten) und:
- `frame` (Verbindungspunkt): Ausgang `frame`, verankert über einen Eingang (z. B. `on`) am Element;
  Instanzen platzieren sich mit Eingang `at` = `"<frame-id>.frame"` und `params.frame` = ID eines `frame`
  im Untergraphen der Komponente; mindestens zwei Instanzen so platziert.
- `variables`: `params` = Name → `{"value": …, "unit": "…"}`, jeder Name zugleich Ausgang; mindestens zwei
  Eingänge anderer Elemente verweisen darauf.
- `item`: Eingang `definition`, `params` mit `number`, `revision`, `state` (`in_work`, `in_review`,
  `released`, `superseded`, `blocked`); mindestens ein freigegebenes Item und eines in Arbeit.
Die Textprojektion muss auch dieses Beispiel verlustfrei abbilden.

## Goals / Non-Goals

**Goals:** belastbare Messwerte; Schema-Entwurf; Empfehlung Go oder No-Go je Frage.

**Non-Goals:** kein produktiver Code; Prototyp-Code wird nicht übernommen, sondern dient als Beleg.

## Decisions

### Fragen und Schwellwerte

| Kennzahl (Schlüssel in `datenmodell.json`) | Messung | Go, wenn |
| --- | --- | --- |
| `schema_special_cases` | Felder, die es nur für einzelne Elementtypen gibt | 0 |
| `load_10k_ms` | Dokument mit 10.000 Elementen laden | ≤ 200 ms |
| `load_100k_ms` | Dokument mit 100.000 Elementen laden | ≤ 2.000 ms |
| `size_100k_mb` | Größe des gespeicherten Dokuments mit 100.000 Elementen inkl. Historie von 10.000 Änderungen | ≤ 50 MB |
| `op_p95_ms` | Einzelne Parameteränderung anwenden (p95) bei 10.000 Elementen | ≤ 5 ms |
| `merge_2x500_ms` | Zwei offline bearbeitete Zweige mit je 500 Änderungen zusammenführen | ≤ 500 ms |
| `conflicts_detected_pct` | Anteil erkannter semantischer Konflikte (gleicher Parameter, gebrochene Referenz) in 100 erzeugten Fällen | 100 % |
| `nif_op_p95_ms` | Parameteränderung über Rustler-NIF aus Elixir (p95) | ≤ 1 ms |
| `wasm_op_p95_ms` | Parameteränderung über WASM in Node (p95) | ≤ 5 ms |
| `hash_equal_native_nif_wasm` | gleicher Inhalts-Hash nach gleicher Operationsfolge (1 = ja) | 1 |
| `component_propagate_1000_ms` | Änderung einer Komponente an 1.000 Instanzen weitergeben (aufgelöste Parameter neu berechnet) | ≤ 50 ms |
| `overrides_kept_pct` | Anteil erhaltener Überschreibungen nach 100 zufälligen Definitionsänderungen | 100 % |

Messrechner und Versionen im Bericht nennen. Jede Kennzahl in `datenmodell.json` als
`{"value": <Zahl>, "unit": "<Einheit>", "threshold": <Zahl>, "pass": <bool>}`; dazu `"recommendation": "Go" | "No-Go"`.

### Prototyp-Kommandozeile

`cargo run -q --release --manifest-path spikes/datenmodell/Cargo.toml -- <befehl>`

- `to-text <json-datei>` – Textprojektion auf stdout
- `from-text <text-datei>` – JSON (kanonisch: sortierte Schlüssel, 2 Leerzeichen Einzug) auf stdout
- `bench --json` – führt alle Messungen aus und gibt `datenmodell.json` aus

Das Textformat wählt der Spike (Kandidaten: KDL, TOML, eigenes zeilenorientiertes Format). Bedingungen:
eine Zeile je Parameter, stabile Reihenfolge nach Element-ID, verlustfrei.

## Risks / Trade-offs

- [Automerge zu groß bei 100.000 Elementen] → Alternative messen: Dokument je Bauteil statt je Projekt
- [Rustler-Build in der CI] → Rust-Toolchain im Elixir-Job vorhanden (ci.yml)
- [Textformat-Entscheidung] → Kandidaten an derselben Beispieldatei vergleichen, Begründung im Bericht
