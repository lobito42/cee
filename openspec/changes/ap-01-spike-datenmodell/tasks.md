## 1. Schema

- [x] 1.1 `format/schema/element.schema.json` mit einheitlicher Elementform, rekursiv über `content` – Prüfung: AK-3
- [x] 1.2 `format/examples/raum.json` mit Ursprung, Geschoss, Wänden, Boden, Decke, Fenster, Tür, Möbel, Materialien, drei Absorbern (einer per Skizze und Extrusion) und Nachhallzeit-Analyse – Prüfung: AK-3

- [x] 1.3 Komponente „Deckensegel“ mit Varianten und mindestens drei Instanzen (eine mit Überschreibung) im Beispiel – Prüfung: AK-3
- [x] 1.4 `format/examples/baugruppe.json`: fachfremde Baugruppe mit Verbindungspunkten, Projektvariablen und Items; Schema ohne Fachtypen – Prüfung: AK-6

## 2. Prototyp

- [x] 2.1 `spikes/datenmodell/`: Graph auf automerge-rs, Laden und Speichern – Prüfung: `cargo test --manifest-path spikes/datenmodell/Cargo.toml`
- [x] 2.2 Textprojektion `to-text` und `from-text`, deterministisch und verlustfrei – Prüfung: AK-4, AK-5
- [x] 2.3 Erkennung semantischer Konflikte nach Merge – Prüfung: Kennzahl `conflicts_detected_pct`
- [x] 2.4 Rustler-NIF-Prototyp unter `spikes/datenmodell/nif/` und WASM-Build für Node – Prüfung: Kennzahlen `nif_op_p95_ms`, `wasm_op_p95_ms`, `hash_equal_native_nif_wasm`

- [x] 2.5 Auflösung von Instanzen und Weitergabe von Definitionsänderungen – Prüfung: Kennzahlen `component_propagate_1000_ms`, `overrides_kept_pct`
- [x] 2.6 `hash`-Befehl nativ, `nif/hash.exs`, `wasm/hash.mjs` und `build.sh` – Prüfung: AK-7

## 3. Messen und berichten

- [ ] 3.1 `bench --json` erzeugt `docs/spikes/datenmodell.json` mit allen Kennzahlen – Prüfung: AK-2, AK-8
- [ ] 3.2 Bericht `docs/spikes/datenmodell.md` mit Textformat-Vergleich und Empfehlung – Prüfung: AK-1

## Workflow follow-up

- ADR-Workshop: Ergebnis besprechen; ADR-028/029/033 bestätigen oder überarbeiten (Kernteam)
- Schema-Entwurf als Grundlage für ap-05 übernehmen; Change archivieren (Kernteam)
