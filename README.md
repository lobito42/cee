# CADLoop (Arbeitsname)

KI-gestütztes Code-CAD für VS Code: Agenten erzeugen aus Anforderungen parametrische 3D-Modelle
(build123d/OpenCascade), prüfen sie gegen ausführbare Regeln und exportieren STEP. Lizenz: Apache-2.0.

Dieses Repository ist der **Harness für spec-driven Entwicklung mit Agenten**: ADRs als Leitplanken,
OpenSpec für Aufträge, Abnahmetests als Vertrag, ein Vertragsschutz für alle Werkzeuge und eine
Nachtschicht, die unbeaufsichtigt über das Claude-Abo arbeitet.

## Erste Schritte

```bash
git config core.hooksPath .githooks          # Vertragsschutz beim Commit (für jedes Werkzeug)
uv sync --extra cad                          # Python inkl. build123d
npm install -g @fission-ai/openspec@latest   # OpenSpec-CLI
uv run pytest -q tests/unit                  # sollte grün sein
uv run pytest -q tests/acceptance/ap-00-setup  # zeigt die offene Arbeit von AP-00 (Spikes fehlen)
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
Das Kernteam arbeitet mit `CADLOOP_ROLE=core` ohne diese Einschränkung.

## Unbeaufsichtigt arbeiten (Nachtschicht)

Eine Claude-Code-Routine in der Cloud läuft werktags nachts, nimmt genau einen offenen Schritt aus
`openspec/queue.yaml` (Einträge mit `night: true`) und öffnet einen PR. Sie verbraucht nur das
Abo-Kontingent. Einrichtung: `docs/betrieb/routine-nachtschicht.md`.

## Sparsam mit dem Pro-Abo

- Standardmodell Sonnet; Opus nur für `spec-writer` und `geometry-specialist`.
- Höchstens 2 parallele Subagenten, keine verschachtelten Subagenten (`.claude/settings.json`).
- `AGENTS.md` kurz, Regeln je Bereich nur bei Bedarf, Reviews nur auf Label.
- Beim Wechsel auf Max: `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` erhöhen, zweiten Nachtlauf einplanen.

## Werkzeuge

VS Code mit Claude-Extension, Claude Desktop (Linux), Claude Code CLI, OpenCode und Pi nutzen dieselben
Anweisungen, Aufträge und Schutzregeln: `docs/werkzeuge.md`.

## Pflege

| Aufgabe | Befehl |
| --- | --- |
| Agenten, Regeln oder Skills geändert | `python3 tools/sync_agents.py` |
| OpenSpec aktualisiert | `openspec update` |
| Projektnamen festlegen | `python3 tools/rename_project.py "Name" --apply` |

## Inhalt

| Pfad | Zweck |
| --- | --- |
| `AGENTS.md` | Anweisungen für alle Werkzeuge (`CLAUDE.md` importiert sie) |
| `openspec/` | Specs, Changes, `config.yaml` (Projektkontext, Regeln), `queue.yaml` (Freigaben) |
| `docs/adr/` | 27 Architekturentscheidungen |
| `docs/rules/` | Regeln je Bereich (Quelle für `.claude/rules/`) |
| `tests/acceptance/<id>/` | Abnahmetests je Change |
| `tools/guard.py` | Vertragsschutz (Branch-Regeln) für Hooks, Git und CI |
| `tools/sync_agents.py` | erzeugt Claude-Regeln, OpenCode-Agenten, Pi-Skill-Liste |
| `.claude/` | Claude Code: Einstellungen, Hooks, Agenten, Skills, OpenSpec-Befehle |
| `.opencode/`, `opencode.json` | OpenCode: Agenten, OpenSpec-Befehle, Berechtigungen |
| `.pi/` | Pi: OpenSpec-Prompts und -Skills, Schutz-Extension, Skill-Liste |
| `.githooks/` | Pre-Commit-Schutz |
| `.github/` | CI, Review auf Label, Nightly-Eval, Vorlagen |
