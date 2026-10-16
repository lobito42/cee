<img src="docs/marke/wortmarke.svg" alt="CEE – Collaborative Engineering Environment" width="320">

# CEE – Collaborative Engineering Environment

Offene, kollaborative Plattform für Produktdefinition. Name und Logo
(`docs/marke/`) stehen unter Markenvorbehalt, bis die Recherche abgeschlossen ist. Ein Projekt ist ein **Graph aus Elementen** – ein
Achsenursprung genauso wie ein ganzes Bauteil. Alle sehen online denselben Stand; offline geht es weiter
wie bei Git. Bearbeitet wird in 3D, im Knoten-Editor oder als Text, Menschen und KI-Agenten gemeinsam.

| Teil | Pfad | Technik | Lizenz |
| --- | --- | --- | --- |
| Kern (Datenmodell, CRDT, Textprojektion) | `crates/` | Rust | MPL-2.0 |
| Server (Sync, Presence, Historie, Freigaben, Worker, MCP) | `server/` | Elixir, Phoenix | MPL-2.0 |
| Client (Browser, Linux, Windows, macOS) | `client/` | TypeScript, three.js, Tauri 2 | MPL-2.0 |
| Geometrie-Worker | `worker/` | Python, OpenCascade | MPL-2.0 |
| SDKs und Formatspezifikation | `sdk/`, `format/` | – | Apache-2.0 |

Architektur: `docs/adr/` (ADR-028 bis ADR-036 beschreiben die aktuelle Richtung).

Dieses Repository ist zugleich der **Harness für spec-driven Entwicklung mit Agenten**: ADRs als
Leitplanken, OpenSpec für Aufträge, Abnahmetests als Vertrag, ein Vertragsschutz für alle Werkzeuge und
eine Nachtschicht, die unbeaufsichtigt über das Claude-Abo arbeitet.

## Erste Schritte

Am einfachsten im Devcontainer (`.devcontainer/`, installiert Rust, Elixir, Node, Python). Sonst:

```bash
git config core.hooksPath .githooks          # Vertragsschutz beim Commit (für jedes Werkzeug)
uv sync --extra cad                          # Python inkl. build123d
npm install -g @fission-ai/openspec@latest   # OpenSpec-CLI
uv run pytest -q tests/unit                  # sollte grün sein
cargo test -q && (cd server && mix test)     # Rust-Kern und Server
uv run pytest -q tests/acceptance/ap-01-spike-datenmodell   # zeigt die offene Arbeit des ersten Spikes
```

Auf GitHub: Branch-Schutz für `main` (PR-Pflicht, grüne CI, Code-Owner-Review), Labels `vertrag` und
`review`, Secret `CLAUDE_CODE_OAUTH_TOKEN` (lokal `claude setup-token`), eure Namen in `.github/CODEOWNERS`.
Konzept als Markdown nach `docs/konzept.md` exportieren.

## Ablauf je Arbeitspaket

| Schritt | Branch | Wer | Befehl |
| --- | --- | --- | --- |
| 1. Change entwerfen | `spec/<id>` | Agent spec-writer oder Mensch | `/opsx:propose` (OpenCode/Pi: `/opsx-propose`) |
| 2. Freigeben | `main` | Kernteam | Eintrag in `openspec/queue.yaml`, `phase: tests` |
| 3. Abnahmetests | `tests/<id>` | Agent test-author oder Nachtschicht | – |
| 4. Umsetzen | `change/<id>` | Agent implementer oder Nachtschicht | `/implement-change <id>` |
| 5. Review | PR | Reviewer-Agent | Label `review` oder `/review-change <nr>` |
| 6. Archivieren | `main` | Kernteam | `/opsx:archive <id>`, `phase: done` |

Was auf welchem Branch erlaubt ist, erzwingt `tools/guard.py` – im Werkzeug, beim Commit und in der CI.
Das Kernteam arbeitet mit `CEE_ROLE=core` ohne diese Einschränkung.

## Unbeaufsichtigt arbeiten (Nachtschicht)

Eine Claude-Code-Routine in der Cloud läuft werktags nachts, nimmt genau einen offenen Schritt aus
`openspec/queue.yaml` (Einträge mit `night: true`) und öffnet einen PR. Sie verbraucht nur das
Abo-Kontingent. Einrichtung: `docs/betrieb/routine-nachtschicht.md`.

## Sparsam mit dem Pro-Abo

- Standardmodell Sonnet; Opus nur für `spec-writer`, `geometry-specialist` und `kern-specialist`.
- Höchstens 2 parallele Subagenten, keine verschachtelten Subagenten (`.claude/settings.json`).
- `AGENTS.md` kurz, Regeln je Bereich nur bei Bedarf, Reviews nur auf Label.
- Vor dem Stopp laufen nur die Tests der angefassten Bereiche (Rust, Elixir, Python).
- Beim Wechsel auf Max: `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` erhöhen, zweiten Nachtlauf einplanen.

## Werkzeuge

Zum Entwickeln: VS Code mit Claude-Extension, Claude Desktop (Linux), Claude Code CLI, OpenCode und Pi nutzen dieselben
Anweisungen, Aufträge und Schutzregeln: `docs/werkzeuge.md`.

## Pflege

| Aufgabe | Befehl |
| --- | --- |
| Agenten, Regeln oder Skills geändert | `python3 tools/sync_agents.py` |
| OpenSpec aktualisiert | `openspec update` |

## Inhalt

| Pfad | Zweck |
| --- | --- |
| `AGENTS.md` | Anweisungen für alle Werkzeuge (`CLAUDE.md` importiert sie) |
| `openspec/` | Specs, Changes, `config.yaml` (Projektkontext, Regeln), `queue.yaml` (Freigaben) |
| `docs/adr/` | 36 Architekturentscheidungen |
| `docs/rules/` | Regeln je Bereich: kern, server, mcp, client, geometrie (Quelle für `.claude/rules/`) |
| `tests/acceptance/<id>/` | Abnahmetests je Change |
| `tools/guard.py` | Vertragsschutz (Branch-Regeln) für Hooks, Git und CI |
| `tools/sync_agents.py` | erzeugt Claude-Regeln, OpenCode-Agenten, Pi-Skill-Liste |
| `.claude/` | Claude Code: Einstellungen, Hooks, Agenten, Skills, OpenSpec-Befehle |
| `.opencode/`, `opencode.json` | OpenCode: Agenten, OpenSpec-Befehle, Berechtigungen |
| `.pi/` | Pi: OpenSpec-Prompts und -Skills, Schutz-Extension, Skill-Liste |
| `.githooks/` | Pre-Commit-Schutz |
| `.github/` | CI, Review auf Label, Nightly-Eval, Vorlagen |
