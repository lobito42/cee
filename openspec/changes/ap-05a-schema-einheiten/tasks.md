## 1. Einheiten

- [ ] 1.1 `crates/graph`: Abhängigkeiten, Fehlertyp, `units.rs` mit Dimensionen, Einheitentabelle und
  Umrechnung; `graphctl units` und `convert` – Prüfung: AK-1, AK-2
- [ ] 1.2 Eingaben lesen (`parse`) und `types.rs` mit Typdefinitionen – Prüfung: AK-3,
  `cargo test -q -p cee-graph types`

## 2. Schema und Dokument

- [ ] 2.1 `schema.rs` (Element, Größe, Geld) und `doc.rs` (Operationen, Speichern, Laden, Merge, Hash,
  Export); `graphctl apply`, `export`, `hash`, `merge` – Prüfung: AK-8
- [ ] 2.2 Regeln für Zahlen beim Schreiben und Stapel-Import in einer Transaktion; `graphctl import` –
  Prüfung: AK-4
- [ ] 2.3 `format/schema/element.schema.json` auf v1, `format/examples/` von Hand mit Einheiten überführt –
  Prüfung: AK-5

## 3. Prüfung, Messung, Abschluss

- [ ] 3.1 `synth.rs` (Projekte, Korpora mit erwarteten Befunden) und `validate.rs` mit allen Codes;
  `graphctl synth`, `validate` – Prüfung: AK-6, AK-7
- [ ] 3.2 `graphctl bench --json` mit allen Kennzahlen; Budgets einhalten – Prüfung: AK-9
- [ ] 3.3 Rustdoc an öffentlichen Funktionen, `crates/graph/README.md` mit Einheitentabelle und Messwerten –
  Prüfung: AK-10; gesamt `uv run pytest -q tests/acceptance/ap-05a-schema-einheiten`

## Workflow follow-up

- ADR-057 um Einheiten-Codes nach UCUM und Standard-Einheit je Parameter ergänzen (Kernteam)
- Spike-Tests von `spikes/datenmodell` in die CI aufnehmen oder bewusst nicht (Kernteam; Folgepunkt PR #9)
- Change archivieren; `einheiten` und `graph-kern` nach `openspec/specs/` übernehmen (Kernteam)
