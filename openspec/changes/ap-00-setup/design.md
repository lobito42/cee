## Context

Siehe proposal.md – Why. Architektur in `docs/adr/` (ADR-028 bis ADR-036). Dieser Change liefert nur das
Gerüst; Inhalte entstehen in den folgenden Changes.

## Goals / Non-Goals

**Goals:** jede Sprache baut, testet und formatiert lokal und in der CI; reproduzierbare Umgebung
(`.devcontainer/`); Lizenzregeln automatisch geprüft.

**Non-Goals:** keine Produktfunktionen; keine Rustler-Anbindung (ap-03); keine Geometrie-Operationen außer `ping`.

## Decisions

| Bereich | Entscheidung | Budget |
| --- | --- | --- |
| Server | `mix phx.new server --app cee_server --no-html --no-assets --no-mailer --no-dashboard`, PostgreSQL über Ecto; Credo und Dialyzer, weil das Kernteam Elixir nicht selbst prüft | `mix test` < 30 s |
| Client | Vite + TypeScript strict, Vitest, ESLint (flat config), Prettier | `npm test` < 30 s |
| Desktop | Tauri 2, Fenster lädt den Vite-Build; CI baut für Linux, Windows, macOS | Installer < 20 MB |
| Worker | Paket `cee_worker` unter `worker/src/`, Aufruf `uv run python -m cee_worker`; eine JSON-Zeile je Nachricht | `ping` < 2 s inkl. Start |
| Lizenzen | Python: pip-licenses; Rust: cargo-deny (`deny.toml`); npm: license-checker; Mix: Lizenzfeld aus `mix.lock`-Paketen | 0 Verstöße |

Antwort des Workers auf `{"op": "ping"}`: `{"ok": true, "kernel": "occt", "kernel_version": "<x.y.z>"}`.

## Risks / Trade-offs

- [Tauri-Abhängigkeiten unter Linux (WebKitGTK)] → im Devcontainer installiert, in der CI per apt
- [Elixir-Versionen] → lokal und in der CI Erlang 27, Elixir 1.18 (mise bzw. setup-beam)
