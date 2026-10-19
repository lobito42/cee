# Spike Datenmodell (ap-01)

Prototyp: `spikes/datenmodell/` (kein Produktcode). Maschinenlesbare Messwerte: `docs/spikes/datenmodell.json`.
Schema-Entwurf: `format/schema/element.schema.json`, Beispiele: `format/examples/raum.json` und
`format/examples/baugruppe.json`.

## Fragestellung

Bevor Server, Client und Worker auf das Datenmodell bauen (Gate G1), soll belegt sein:

1. Trägt **eine einheitliche Elementform** (`id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`) alle
   Typen – vom Achsenursprung über Wand, Material, Skizze und Analyse bis zu Komponenten, Instanzen,
   Verbindungspunkten, Variablen und Items – ohne Sonderfelder je Typ (ADR-028, ADR-043, ADR-046, ADR-047)?
2. Ist **Automerge** bei realistischen Größen schnell und klein genug (ADR-033): Laden von 10.000 und 100.000
   Elementen, Größe mit Historie, einzelne Änderung, Zusammenführen zweier Offline-Zweige?
3. Lassen sich **semantische Konflikte** (gleicher Parameter, gebrochene Referenz) nach dem Merge zuverlässig
   erkennen?
4. Liefert **derselbe Rust-Kern** nativ, als Rustler-NIF in Elixir und als WASM in Node dieselben Ergebnisse,
   schnell genug (ADR-029, ADR-030)?
5. Ist die **Textprojektion** deterministisch, verlustfrei und diff-freundlich (ADR-035)?
6. Funktionieren **Komponenten und Instanzen** (Auflösung, Weitergabe, Erhalt von Überschreibungen, ADR-043)?

Schwellwerte laut `design.md`: Sonderfälle 0; Laden 10k ≤ 200 ms, 100k ≤ 2.000 ms; Größe 100k mit 10.000
Änderungen ≤ 50 MB; Änderung p95 ≤ 5 ms (nativ), ≤ 1 ms (NIF), ≤ 5 ms (WASM); Merge 2 × 500 ≤ 500 ms; Konflikte
100 % erkannt; gleicher Hash in allen Laufzeiten; Weitergabe an 1.000 Instanzen ≤ 50 ms; Überschreibungen
100 % erhalten.

## Vorgehen

**Schema und Beispiele.** JSON Schema 2020-12 mit einer einzigen Elementdefinition, rekursiv über `content`.
`type` ist ein freier Bezeichner (Muster, keine Liste); das Schema nennt keinen Fachtyp. `inputs` sind Referenzen
`<id>.<output>` (Muster erzwingt den Punkt, IDs enthalten keinen Punkt), `outputs` Name → Ausgabetyp, `params`
beliebige JSON-Werte, `meta` beliebige Angaben. `raum.json` (30 Elemente) enthält Ursprung, Geschoss, vier Wände
(eine mit Schichtaufbau `material_0`/`material_1`), Boden, Decke, Fenster, Tür, Wandabsorber, Tisch mit
Tischplatte als `part` (Skizze + Extrusion), sieben Materialien mit α je Oktavband, Kosten und CO₂, die Komponente
„Deckensegel“ (drei Varianten, Absorber aus Skizze + Extrusion im Untergraphen), drei Instanzen (eine mit tieferer
Abhängung als Überschreibung) und eine Nachhallzeit-Analyse. `baugruppe.json` ist fachfremd: Halter aus Platte
und zwei Schrauben (Komponente mit drei Varianten), platziert über `frame`-Verbindungspunkte, Projektvariablen
mit Einheit, zwei Items (`released`, `in_work`); 19 Elemente.

**Speicherform im CRDT.** Ein Automerge-Dokument je Projekt, flach statt verschachtelt:
`ROOT.project` (Schlüssel der obersten Ebene, z. B. `schema_version`), `ROOT.roots` (Liste der IDs oberster Ebene)
und `ROOT.elements` (Map ID → Map mit `type`, `inputs`, `params`, `outputs`, `meta`, `content` als Liste von IDs).
Jedes Element hat dieselben Einträge; der Untergraph ist eine ID-Liste, sodass eine Parameteränderung unabhängig
von der Tiefe ein direkter Zugriff ist. Parameterwerte werden als verschachtelte Automerge-Objekte gespeichert
(feingranulares Zusammenführen). Der Inhalts-Hash ist SHA-256 über die kanonische JSON-Form (sortierte Schlüssel,
kompakt) und damit unabhängig von Historie und Actor.

**Messungen** (`cargo run -q --release --manifest-path spikes/datenmodell/Cargo.toml -- bench --json`):

- Synthetische Projekte (`src/synth.rs`): Ursprung, 20 Materialien, Gruppen mit je 99 Elementen im Untergraphen;
  jedes Element mit zwei Eingängen, drei Parametern, einem Ausgang, einem Meta-Eintrag. Deterministisch per Seed.
- *Laden* = `AutoCommit::load` der gespeicherten Bytes plus Zählen der Elemente; Median aus 5 (10k) bzw. 3 (100k)
  Läufen. Das 100k-Dokument trägt 10.000 zusätzliche Änderungen (je ein Commit) als Historie.
- *Änderung* = `set_param` inklusive Nachschlagen und Commit (eine Änderung in der Historie); 100 zum Aufwärmen,
  dann p95 über 1.000. NIF (`nif/bench.exs`) und WASM (`wasm/bench.mjs`) messen je Aufruf aus Elixir bzw. Node,
  also inklusive Grenzübergang und JSON-Dekodierung des Werts.
- *Merge* = zwei Zweige mit eigenen Actors, je 500 Änderungen (je ein Commit) auf 10.000 Elementen; gemessen wird
  `merge`; Median aus 3.
- *Konflikte* = 100 Fälle auf `raum.json`, abwechselnd gleicher Parameter mit verschiedenen Werten und gebrochene
  Referenz (Zweig A entfernt ein Element samt Untergraph, Zweig B verweist neu darauf). Erkannt heißt: der
  erwartete Befund (Element, Feld, Name bzw. Eingang und Ziel) steht in `conflicts::detect`.
- *Hash* = dieselbe Operationsfolge auf `raum.json` nativ, über `nif/hash.exs` und `wasm/hash.mjs`.
- *Komponenten* = eine Komponente mit 1.000 Instanzen (zufällige Varianten und Überschreibungen); gemessen:
  Variante ändern + Commit + Instanzen finden + alle auflösen; Median aus 7. Überschreibungen: 100 Instanzen,
  100 zufällige Definitionsänderungen (Vorgabe ändern, Variante ändern oder anlegen, Parameter anlegen oder
  entfernen); nach jeder Änderung muss jede gespeicherte Überschreibung unverändert sein und entweder gelten oder –
  wenn der Parameter entfallen ist – als Befund gemeldet werden (19.800 Prüfungen).

**Messrechner:** Linux x86_64, AMD EPYC 9V74 (4 Threads, GitHub-Runner). **Versionen:** rustc 1.97.0,
automerge 0.12.0, rustler 0.39.0, wasm-bindgen 0.2.129, Elixir 1.18.4 / OTP 27, Node 22.22.0.

**Automerge-Version.** Ein erster Lauf nutzte versehentlich automerge 0.7.4. Dort wächst die Commit-Zeit mit der
Dokumentgröße; deshalb vergleicht `examples/probe.rs` dieselbe Elementform mit 0.5.12 (Op-Baum), 0.7.4 und 0.12.0
(spaltenorientierter Op-Satz).

## Messwerte

Alle Kennzahlen aus `docs/spikes/datenmodell.json` (automerge 0.12.0):

| Kennzahl | Wert | Schwelle | Ergebnis |
| --- | --- | --- | --- |
| `schema_special_cases` | 0 | 0 | bestanden |
| `load_10k_ms` | 108 ms | ≤ 200 ms | bestanden |
| `load_100k_ms` | 1.060 ms | ≤ 2.000 ms | bestanden |
| `size_100k_mb` | 2,78 MB | ≤ 50 MB | bestanden |
| `op_p95_ms` | 0,058 ms | ≤ 5 ms | bestanden |
| `merge_2x500_ms` | 21 ms | ≤ 500 ms | bestanden |
| `conflicts_detected_pct` | 100 % | 100 % | bestanden |
| `nif_op_p95_ms` | 0,055 ms | ≤ 1 ms | bestanden |
| `wasm_op_p95_ms` | 0,113 ms | ≤ 5 ms | bestanden |
| `hash_equal_native_nif_wasm` | 1 | 1 | bestanden |
| `component_propagate_1000_ms` | 28 ms | ≤ 50 ms | bestanden |
| `overrides_kept_pct` | 100 % | 100 % | bestanden |

Weitere Werte (`details` in der JSON-Datei): Größe 10k ohne Historie 0,25 MB; Speichern 100k 154 ms;
Median einer Änderung nativ 0,046 ms, NIF 0,044 ms, WASM 0,091 ms; nach dem Merge 2 × 500 meldet die
Prüfung 10 echte Parameterkonflikte; die vollständige Konfliktprüfung über 10.000 Elemente dauert rund 1 s.

**Aufbau großer Dokumente ist langsam:** Ein Projekt aus JSON Element für Element anlegen dauert mit 0.12
2,5 s (10k) bzw. 29 s (100k). Das betrifft nur Import und Erzeugung, nicht Laden, Ändern oder Mergen.

Vergleich der Automerge-Linien mit `examples/probe.rs` (10.000 Elemente, je Element 6 Objekte und 4 Werte):

| | 0.5.12 | 0.7.4 | 0.12.0 |
| --- | --- | --- | --- |
| Aufbauen | 92 ms | 1.939 ms | 1.354 ms |
| Nachschlagen (Element + params) | 0,002 ms | 0,012 ms | 0,007 ms |
| Schreiben mit Commit | 0,0004 ms | 0,296 ms | 0,006 ms |
| Speichern | 33 ms | 16 ms | 4 ms |
| Laden | 104 ms | 95 ms | 64 ms |

Mit 0.7.4 lag der ganze Lauf bei: Änderung p95 0,56 ms, NIF p95 1,64 ms (Schwelle 1 ms verfehlt), Aufbau 100k
193 s, Laden 100k 1.682 ms. Bei 40.000 Elementen kostete ein Commit mit 0.7.4 bereits 2,2 ms, mit 0.12.0
0,007 ms. 0.12 ist damit für Änderungen und Laden die richtige Wahl; 0.5 baut große Dokumente rund 15-mal
schneller auf, ist aber die alte Linie.

## Textformat

Kandidaten an derselben Datei (`raum.json`) verglichen, Bedingungen aus `design.md`: eine Zeile je Parameter,
stabile Reihenfolge nach Element-ID, verlustfrei.

So sieht dieselbe Wand in den drei Kandidaten aus:

```text
# eigenes zeilenorientiertes Format (gewählt)
[wand-sued] wall
in level = "level-eg.level"
in material_0 = "mat-beton.material"
in material_1 = "mat-putz.material"
out solid = "solid"
param height = 3000
param layers = [{"thickness":225},{"thickness":15}]
meta name = "Außenwand Süd"
```

```text
// KDL
wall "wand-sued" {
    in level="level-eg.level" material_0="mat-beton.material" material_1="mat-putz.material"
    param height=3000
    param layers { - thickness=225; - thickness=15 }
}
```

```text
# TOML
[elements.wand-sued]
type = "wall"
inputs = { level = "level-eg.level", material_0 = "mat-beton.material", material_1 = "mat-putz.material" }
params.height = 3000
params.layers = [{ thickness = 225 }, { thickness = 15 }]
```

| Kriterium | eigenes Format | KDL | TOML |
| --- | --- | --- | --- |
| eine Zeile je Parameter, auch bei verschachtelten Werten | ja (Wert als kompaktes JSON) | nein, Verschachtelung wird zu Blöcken | nur mit Inline-Tabellen, die bei Länge umbrechen |
| verlustfrei für beliebige JSON-Werte (null, Zahl vs. Gleitkomma, leere Objekte) | ja, JSON-Werte | Abbildung JSON → KDL nicht eindeutig (null, Listen von Objekten) | kein `null`, gemischte Listen eingeschränkt |
| Reihenfolge der Untergraphen | `content = [...]`-Zeile | Verschachtelung (Diff verschiebt ganze Blöcke) | eigene Liste nötig |
| Abhängigkeit | keine (serde_json) | Parser-Crate nötig | Parser-Crate nötig |
| lesbar für Menschen und KI | gut, jede Zeile für sich verständlich | sehr gut | gut |

Gewählt ist das eigene zeilenorientierte Format (`spikes/datenmodell/src/text.rs`): Kopfzeile
`[<id>] <typ>`, darunter `in`/`out`/`param`/`meta <name> = <JSON>` sortiert nach Name und eine `content`-Zeile
mit der Reihenfolge des Untergraphen; Elemente stehen sortiert nach ID, unabhängig von der Tiefe. Belegt: zweimal
projizieren ergibt bitgleichen Text, JSON → Text → JSON ist für beide Beispiele verlustfrei (AK-4, AK-6), eine
geänderte Zahl ändert genau eine Zeile (AK-5). Einschränkung: ein verschachtelter Parameter (z. B. `variants`
einer Komponente) steht als eine lange Zeile; eine Änderung darin ist eine geänderte Zeile, aber schwerer zu lesen.
Für ap-05 empfohlen: Unterschlüssel als Pfad (`param variants.gross.breite = 1200`) ausprobieren.

## Empfehlung

Go – alle zwölf Kennzahlen sind bestanden; das Datenmodell kann in ap-05 auf dieser Grundlage gebaut werden.

- **Einheitliche Elementform (ADR-028, ADR-046):** bestätigt. Ein Schema ohne Typliste trägt Raum und Baugruppe,
  Komponenten, Instanzen, Verbindungspunkte, Variablen und Items; 0 Sonderfelder.
- **Automerge (ADR-033):** bestätigt mit **automerge ≥ 0.12** (nicht 0.6–0.7). Ein Dokument je Projekt reicht bis
  100.000 Elemente (2,8 MB mit 10.000 Änderungen, Laden 1,1 s); „Dokument je Bauteil“ ist dafür nicht nötig, bleibt
  aber die Ausweichlösung für Teil-Laden (ADR-050).
- **Ein Kern, drei Laufzeiten (ADR-029, ADR-030):** bestätigt. Gleicher Hash nativ, NIF und WASM; eine Änderung
  über die NIF dauert 0,055 ms (p95) und darf auf dem normalen Scheduler laufen, Laden, Hash und Operationslisten
  laufen als Dirty-CPU-NIF. Das Dokument ist eine Rustler-Ressource, die genau ein Prozess je Dokument hält.
- **Semantische Konflikte:** 100 % erkannt. Für den Kern: Prüfung inkrementell über die Automerge-Patches des
  Merges statt über das ganze Dokument (heute rund 1 s bei 10.000 Elementen).
- **Komponenten (ADR-043):** bestätigt. Weitergabe an 1.000 Instanzen 28 ms; Überschreibungen bleiben erhalten,
  entfallene Parameter werden gemeldet.

Risiken und Folgearbeiten für ap-05: Import großer Projekte ist mit 0.12 langsam (29 s für 100.000 Elemente) –
Import als vorkodiertes Dokument oder über eine Stapel-Schnittstelle prüfen; Arbeitsspeicher wurde nicht gemessen;
Rustler unter macOS braucht die Link-Optionen aus `build.sh`; `wasm-bindgen-cli` muss exakt zur Crate-Version
passen. Kein Widerspruch zu einem ADR gefunden.
