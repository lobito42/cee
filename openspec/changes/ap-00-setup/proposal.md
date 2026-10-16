## Why

Bevor Agenten Produktfunktionen bauen, muss das Repository in allen vier Sprachen lauffähig sein: Rust-Kern,
Elixir-Server, TypeScript-Client (Web und Tauri) und Python-Worker. Die CI muss jede Sprache prüfen, die
Lizenzregeln aus ADR-034 durchsetzen und einmal einen kompletten Durchlauf der Agenten-Pipeline zeigen.
Sonst bauen viele Agenten parallel auf einem Gerüst, das noch nicht trägt.

## What Changes

- Rust-Workspace mit `crates/graph` (fmt, clippy, test, cargo-deny)
- Phoenix-Anwendung in `server/` mit Health-Endpunkt `GET /health` (ohne HTML und Assets)
- Client in `client/`: Vite, TypeScript strict, ESLint, Prettier, Vitest; Tauri-2-Hülle in `client/src-tauri/`
- Python-Worker in `worker/` als uv-Workspace-Mitglied, beantwortet `{"op": "ping"}` über stdio
- Lizenzprüfung für Python, Cargo, npm und Mix
- Ein vollständiger Durchlauf eines Mini-Changes durch die Pipeline (spec → tests → change → Review → Merge)

## Capabilities

### New Capabilities

Keine. Gerüst und Werkzeuge ändern kein Produktverhalten (`skip_specs: true`).

### Modified Capabilities

Keine.

## Impact

- Neue Dateien unter `crates/`, `server/`, `client/`, `worker/`, `Cargo.lock`, `deny.toml`
- Betroffene ADRs: ADR-029, 030, 031, 032, 034
- Abnahmetests: `tests/acceptance/ap-00-setup/` (AK-1 bis AK-6)
- Gate G1 (zusammen mit den Spikes ap-01 bis ap-04)
- Nicht-Ziele: kein Datenmodell (ap-01), keine Synchronisation (ap-03), keine Arbeitsfläche (ap-04)
