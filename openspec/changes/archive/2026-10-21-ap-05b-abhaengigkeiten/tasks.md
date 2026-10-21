## 1. Index und Abhängigkeiten

- [x] 1.1 `index.rs`: Index beim Öffnen, Aufbereitung bei Bedarf, `materialized_count`, `subgraph()`;
  `graphctl subgraph` – Prüfung: AK-7
- [x] 1.2 `deps.rs`: Zyklen bei `set_input` ablehnen, Zyklus aus Merge als Befund, `order()`, `affected()`;
  `graphctl order`, `affected` – Prüfung: AK-1, AK-2, AK-3

## 2. Zustände und Migrationen

- [x] 2.1 `state.rs` mit `ready()`, getrennt vom Dokument; `graphctl states` – Prüfung: AK-4
- [x] 2.2 `migrate.rs`: Schema-Version, Ablauf beim Öffnen, `schema_too_new`, Beispiel-Migration hinter Feature
  `demo-migration`; `graphctl migrate` – Prüfung: AK-5, AK-6

## 3. Messung und Abschluss

- [x] 3.1 `graphctl bench --json` um die neuen Kennzahlen; Budgets einhalten; README ergänzen – Prüfung: AK-8;
  gesamt `uv run pytest -q tests/acceptance/ap-05b-abhaengigkeiten`

## Workflow follow-up

- Change archivieren; Requirements in `openspec/specs/graph-kern/` übernehmen (Kernteam)
