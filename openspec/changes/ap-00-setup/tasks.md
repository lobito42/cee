## 1. Gerüst

- [x] 1.1 Rust-Workspace: `cargo fmt --check`, `cargo clippy -- -D warnings`, `cargo test` grün – Prüfung: AK-2
- [x] 1.2 Phoenix-Anwendung in `server/` mit `GET /health` → 200 und Test; Credo und Dialyzer eingerichtet – Prüfung: AK-2
- [x] 1.3 Client mit Vite, TypeScript strict, ESLint, Prettier, Vitest; echte `lint`- und `test`-Skripte – Prüfung: AK-3
- [x] 1.4 Tauri-2-Hülle in `client/src-tauri/` (`productName` „CEE“); der CI-Job `desktop` für Linux, Windows, macOS steht bereit und muss grün werden – Prüfung: AK-1, CI-Job `desktop`
- [x] 1.5 Worker `cee_worker` beantwortet `ping` über stdio – Prüfung: AK-4
- [x] 1.6 Beispiel-Script-Element `parts/examples/halter.py` baut gültig in < 3 s – Prüfung: AK-5

## 2. Regeln

- [x] 2.1 Lizenzprüfung für Python, Cargo, npm, Mix ohne Verstöße – Prüfung: AK-6
- [x] 2.2 Ablauf dieses Changes (Branches, CI-Jobs, Dauer, Probleme) in `docs/spikes/README.md` beschrieben – Prüfung: Abschnitt „ap-00“ vorhanden

## 3. Integration

- [x] 3.1 Alle Abnahmetests grün – Prüfung: `uv run pytest tests/acceptance/ap-00-setup`

## Workflow follow-up

- Durchlauf der Pipeline auswerten: Wie viele Nächte, wo hing es, was am Harness ändern? (Kernteam, Notiz im PR)
- Change archivieren mit `/opsx:archive ap-00-setup` (Kernteam)
