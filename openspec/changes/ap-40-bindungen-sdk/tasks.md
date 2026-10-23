## 1. Fassade und Fachpaket-Register

- [x] 1.1 `crates/bind` (cee-bind): Fassade nach der Tabelle in design.md, Fehlerformat, `catch_unwind`, Feature
  `test-hooks` mit `debug_panic` – Prüfung: `cargo test -q -p cee-bind`
- [x] 1.2 `examples/bindctl.rs` mit `run`, `load`, `merge`, `api`, `bench` (Rust-Sollwerte) – Prüfung:
  `cargo run -q --release -p cee-bind --features pkg-beispiel,test-hooks --example bindctl -- api`; AK-3 (Rust)
- [x] 1.3 Fachpaket-Register, `packages()`, `call()`; `crates/pkg-beispiel` mit `beispiel.summe` hinter Feature
  `pkg-beispiel` – Prüfung: `cargo test -q -p cee-pkg-beispiel`; AK-7 (Rust-Teil)

## 2. Rustler-NIF

- [ ] 2.1 `crates/graph-nif` mit Ressourcen für Dokument und Zustände, Dirty-CPU-Liste aus design.md; Rustler in
  `server/mix.exs`, `mode: :release` – Prüfung: `cd server && mix compile --warnings-as-errors`; AK-5
- [ ] 2.2 `CeeServer.Graph` mit Typespecs und `{:ok, _}`/`{:error, map}`; ExUnit-Tests für jede Funktion –
  Prüfung: `cd server && mix test test/cee_server/graph_test.exs && mix credo --strict && mix dialyzer`
- [ ] 2.3 `server/priv/bindctl.exs` mit allen `bindctl`-Befehlen – Prüfung: AK-1, AK-4 und AK-6 für Elixir

## 3. WASM

- [ ] 3.1 `crates/graph-wasm`, Ziel `wasm32-unknown-unknown` in `rust-toolchain.toml`, `npm run kern:build`
  (Node- und Web-Paket, wasm-bindgen-cli in passender Version) – Prüfung: `cd client && npm run kern:build`
- [ ] 3.2 `client/tools/bindctl-node.mjs` – Prüfung: AK-1, AK-4 und AK-6 für Node
- [ ] 3.3 `client/tools/bindctl-browser.mjs` und `bindctl.html` mit Playwright (Headless-Chromium) – Prüfung:
  AK-1, AK-4 und AK-6 für den Browser; `cd client && npm run lint`

## 4. PyO3 und Python-SDK

- [ ] 4.1 `crates/graph-py` (abi3-py311), `sdk/python/pyproject.toml` (cee-sdk, Apache-2.0, maturin), uv-Workspace
  ergänzen – Prüfung: `uv run --package cee-sdk python -c "import cee_sdk"`
- [ ] 4.2 Python-API `Document`, `States`, `Quantity`, `Element`, `CeeError`, `packages`, `call`, `py.typed`;
  Unit-Tests unter `sdk/python/tests` – Prüfung: `uv run pytest -q sdk/python/tests && uv run ruff check sdk/python`;
  AK-8
- [ ] 4.3 `sdk/python/tools/bindctl.py` – Prüfung: AK-1, AK-4 und AK-6 für Python

## 5. Gleichheit, Messung, Abschluss

- [ ] 5.1 Bytes und Merge über Laufzeitgrenzen, Fachpaket-Funktion in allen Laufzeiten – Prüfung: AK-2, AK-7
- [ ] 5.2 Budgets einhalten; Lizenzprüfungen für die neuen Abhängigkeiten – Prüfung: AK-6, AK-9
- [ ] 5.3 Bericht: `crates/bind/README.md` (Aufbau, Fassadentabelle, wie ein Fachpaket-Crate Funktionen anmeldet,
  Messwerte aller Laufzeiten aus `bindctl bench` mit Rechner und Versionen) und `sdk/python/README.md`
  (Installation, Beispiel) – Prüfung: gesamt `uv run pytest -q tests/acceptance/ap-40-bindungen-sdk`

## Workflow follow-up

- Offene Fragen 1 bis 7 aus proposal.md entscheiden (Kernteam)
- Workflows: Chromium-Cache für Playwright, wasm32-Ziel und maturin in CI und Nachtschicht; CI-Matrix um macOS
  (NIF, WASM, PyO3) und Windows (PyO3) ergänzen (Kernteam)
- Change archivieren; `bindungen` und `python-sdk` nach `openspec/specs/` übernehmen (Kernteam)
