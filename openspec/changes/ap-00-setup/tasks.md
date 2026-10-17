## 1. Gerüst

- [ ] 1.1 Rust-Workspace: `cargo fmt --check`, `cargo clippy -- -D warnings`, `cargo test` grün – Prüfung: AK-2
- [ ] 1.2 Phoenix-Anwendung in `server/` mit `GET /health` → 200 und Test; Credo und Dialyzer eingerichtet – Prüfung: AK-2
- [ ] 1.3 Client mit Vite, TypeScript strict, ESLint, Prettier, Vitest; echte `lint`- und `test`-Skripte – Prüfung: AK-3
- [ ] 1.4 Tauri-2-Hülle in `client/src-tauri/` plus CI-Job für Linux, Windows, macOS – Prüfung: AK-1, AK-3
- [ ] 1.5 Worker `cee_worker` beantwortet `ping` über stdio – Prüfung: AK-4
- [ ] 1.6 Beispiel-Script-Element `parts/examples/halter.py` baut gültig in < 3 s – Prüfung: AK-5

## 2. Regeln

- [ ] 2.1 Lizenzprüfung für Python, Cargo, npm, Mix ohne Verstöße – Prüfung: AK-6
- [ ] 2.2 Pipeline-Durchlauf an einem Mini-Change dokumentiert – Prüfung: Link auf gemergten PR in `docs/spikes/README.md`

## 3. Integration

- [ ] 3.1 Alle Abnahmetests grün – Prüfung: `uv run pytest tests/acceptance/ap-00-setup`

## Workflow follow-up

- Change archivieren mit `/opsx:archive ap-00-setup` (Kernteam)
