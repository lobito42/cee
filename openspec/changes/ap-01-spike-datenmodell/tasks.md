## 1. Schema

- [ ] 1.1 `format/schema/element.schema.json` mit einheitlicher Elementform, rekursiv über `content` – Prüfung: AK-3
- [ ] 1.2 `format/examples/raum.json` mit Ursprung, Geschoss, Wänden, Boden, Decke, Fenster, Tür, Möbel, Materialien, drei Absorbern (einer per Skizze und Extrusion) und Nachhallzeit-Analyse – Prüfung: AK-3

## 2. Prototyp

- [ ] 2.1 `spikes/datenmodell/`: Graph auf automerge-rs, Laden und Speichern – Prüfung: `cargo test --manifest-path spikes/datenmodell/Cargo.toml`
- [ ] 2.2 Textprojektion `to-text` und `from-text`, deterministisch und verlustfrei – Prüfung: AK-4, AK-5
- [ ] 2.3 Erkennung semantischer Konflikte nach Merge – Prüfung: Kennzahl `conflicts_detected_pct`
- [ ] 2.4 Rustler-NIF-Prototyp unter `spikes/datenmodell/nif/` und WASM-Build für Node – Prüfung: Kennzahlen `nif_op_p95_ms`, `wasm_op_p95_ms`, `hash_equal_native_nif_wasm`

## 3. Messen und berichten

- [ ] 3.1 `bench --json` erzeugt `docs/spikes/datenmodell.json` mit allen Kennzahlen – Prüfung: AK-2
- [ ] 3.2 Bericht `docs/spikes/datenmodell.md` mit Textformat-Vergleich und Empfehlung – Prüfung: AK-1

## Workflow follow-up

- ADR-Workshop: Ergebnis besprechen; ADR-028/029/033 bestätigen oder überarbeiten (Kernteam)
- Schema-Entwurf als Grundlage für ap-05 übernehmen; Change archivieren (Kernteam)
