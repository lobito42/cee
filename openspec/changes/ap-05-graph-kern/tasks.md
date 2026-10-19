## 1. Schema und Dokument

- [ ] 1.1 `crates/graph`: Abhängigkeiten (automerge ≥ 0.12, serde, serde_json, sha2, ulid), Fehlertyp,
  `schema.rs` mit Element, Größe, Geld und kanonischen Einheiten – Prüfung: `cargo test -q -p cee-graph`
- [ ] 1.2 `doc.rs`: Dokument mit Anlegen, Ändern, Entfernen samt Untergraph, Speichern, Laden, Merge,
  Inhalts-Hash, Export als Projekt-JSON und Stapel-Import in einer Transaktion – Prüfung: AK-4
- [ ] 1.3 `format/schema/element.schema.json` auf v1 (Größen erzwungen, nicht mehr „Entwurf“),
  `format/examples/raum.json` und `baugruppe.json` nach v1 überführt – Prüfung: AK-1

## 2. Validierung und Abhängigkeiten

- [ ] 2.1 `synth.rs`: Generator für Projekte und Fehlerkorpora mit bekanntem Sollergebnis (deterministisch per
  Seed) – Prüfung: `cargo test -q -p cee-graph synth`
- [ ] 2.2 `validate.rs`: alle Codes aus design.md, volle Prüfung und Prüfung nach einer Änderung – Prüfung:
  AK-2, AK-3
- [ ] 2.3 `deps.rs`: Index, Zyklen bei Operationen ablehnen, Zyklus aus Merge als Befund, `order()`,
  `affected()` – Prüfung: AK-5, AK-6

## 3. Zustände, Migrationen, Teil-Laden

- [ ] 3.1 `state.rs`: Berechnungszustände mit `ready()`, getrennt vom Dokument – Prüfung: AK-7
- [ ] 3.2 `migrate.rs`: Schema-Version, Migration 0 → 1, `schema_too_new` – Prüfung: AK-8
- [ ] 3.3 Teil-Laden: Index beim Öffnen, Aufbereitung bei Bedarf, `subgraph()`, `materialized_count` –
  Prüfung: AK-9

## 4. Messung und Abschluss

- [ ] 4.1 `examples/bench.rs` mit allen Kennzahlen als JSON; Budgets einhalten – Prüfung: AK-10
- [ ] 4.2 Qualität und Doku: Rustdoc an öffentlichen Funktionen, Abschnitt „Graph-Kern“ in
  `crates/graph/README.md` mit Messwerten des Runners – Prüfung: AK-11; gesamt
  `uv run pytest -q tests/acceptance/ap-05-graph-kern`

## Workflow follow-up

- Spike-Tests von `spikes/datenmodell` in die CI aufnehmen oder bewusst nicht (Werkzeug-Konfiguration,
  Kernteam; Folgepunkt aus PR #9)
- Change archivieren; `graph-kern` wird nach `openspec/specs/` übernommen (Kernteam)
