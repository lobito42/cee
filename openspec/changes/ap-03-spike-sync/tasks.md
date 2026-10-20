## 1. Kern-Bindungen

- [x] 1.1 `spikes/sync/Cargo.toml` als eigener Workspace mit `native/sync_nif` und `wasm/crate` auf
  `spikes/datenmodell` als Pfad-Abhängigkeit; Sync-Funktionen (Sync-Nachricht erzeugen und empfangen,
  erweiterte Operationsliste mit `set_input` und `remove_element`, Hash, Projekt-JSON, Befunde) samt
  Rust-Test, in dem zwei Dokumente nur über Sync-Nachrichten denselben Hash erreichen – Prüfung:
  `cargo test -q --manifest-path spikes/sync/Cargo.toml` und `uv run pytest -q tests/acceptance/ap-01-spike-datenmodell`
- [ ] 1.2 `spikes/sync/build.sh` baut NIF, WASM (nodejs und web), Node-Abhängigkeiten und Mix-Projekt –
  Prüfung: `bash spikes/sync/build.sh`

## 2. Server

- [ ] 2.1 Mix-Projekt `spikes/sync/server/` mit Phoenix-Endpoint (Bandit), Socket, `GET /health` und
  `serve.sh <port>` – Prüfung: `cd spikes/sync/server && mix test`
- [ ] 2.2 Dokumentprozess je Dokument (Registry, DynamicSupervisor) mit NIF-Ressource, Channel-Beitritt mit
  Erstabgleich, Weitergabe an alle anderen Verbindungen, HTTP `/docs`, `/hash`, `/project`, `/findings`,
  `/kill` – Prüfung: `cd spikes/sync/server && mix test`; AK-6
- [ ] 2.3 Fehlerisolation: ungültige Nachrichten und NIF-Fehler als Fehlerantwort, keine Modellinhalte im
  Protokoll – Prüfung: AK-7, AK-8

## 3. Clients und Szenarien

- [ ] 3.1 Node-Client in `spikes/sync/client/` (WASM-Kern, npm-Paket `phoenix`, `--delay-ms`) und Szenario
  `live` mit Latenzmessung – Prüfung: AK-3
- [ ] 3.2 Szenario `concurrent` und Befehl `poison` – Prüfung: AK-4, AK-7
- [ ] 3.3 Generator und Szenario `offline` mit `--dump` (Operationen, Endstände, Hashes), zunächst ohne die
  Fälle „Entfernen gegen Ändern“ – Prüfung: `cd spikes/sync/server && mix test`
- [ ] 3.4 Befund `edit_on_removed` im Server und die 5 Fälle im Generator – Prüfung: AK-5
- [ ] 3.5 Variante `offline --both` – Prüfung: AK-10
- [ ] 3.6 `bench.sh --json [--log <datei>]` mit allen Kennzahlen und Beobachtungen – Prüfung: AK-8, AK-9

## 4. Demo und Bericht

- [ ] 4.1 Demo-Seite unter `GET /` für zwei echte Browser (Werte, Offline-Schalter, Latenzanzeige, Befunde) –
  Prüfung: Punkt „Menschliche Abnahme“ in der PR-Checkliste (zwei Scenarios [mensch])
- [ ] 4.2 `docs/spikes/sync.json` aus `bench.sh --json` und Bericht `docs/spikes/sync.md` mit Fragestellung,
  Vorgehen, Messwerten, Empfehlung (inkl. Einordnung Loopback und Folgen für ap-07a und ap-17) – Prüfung:
  AK-1, AK-2, AK-9; gesamt `uv run pytest -q tests/acceptance/ap-03-spike-sync`

## Workflow follow-up

- Menschliche Abnahme: zwei Browser live und einer offline nach den Scenarios [mensch] (Kernteam)
- ADR-Workshop: Ergebnis besprechen; ADR-030 und ADR-033 bestätigen oder überarbeiten
  (Kernteam)
- Change archivieren mit `--skip-specs` (Kernteam)
