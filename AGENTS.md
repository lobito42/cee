# CADLoop – Anweisungen für Coding-Agenten

Gilt für Claude Code, OpenCode und Pi. CADLoop (Arbeitsname) ist eine Open-Source-VS-Code-Extension:
KI erzeugt aus Anforderungen parametrische 3D-Modelle als Python-Code (build123d/OpenCascade), prüft sie
gegen Regeln und exportiert STEP. Jedes Element hat eine stabile ID und kann veröffentlicht werden.

## Arbeitsweise: Spec-driven mit OpenSpec

1. **Auftrag = OpenSpec-Change** unter `openspec/changes/<id>/` (proposal, design, specs, tasks).
   Nur Changes in `openspec/queue.yaml` sind freigegeben. Details: `openspec show <id>`.
2. **Der Branch bestimmt, was du darfst** (ein Schutz blockiert alles andere):
   - `spec/<id>` – Change entwerfen: nur `openspec/changes/<id>/`
   - `tests/<id>` – Abnahmetests schreiben: nur `tests/acceptance/<id>/`, `tests/golden/`, `tests/ui-reference/`
   - `change/<id>` – umsetzen: Produktcode + Häkchen in `openspec/changes/<id>/tasks.md`
3. **Abnahmetests sind der Vertrag.** Fertig heißt: `uv run pytest tests/acceptance/<id>` grün und alle
   Tasks abgehakt. Tests nie abschwächen, überspringen oder löschen.
4. **ADRs in `docs/adr/` sind verbindlich.** Widerspruch → melden, nicht umgehen.
5. **Ein Change pro Branch und Pull Request.** Nach drei erfolglosen Anläufen am selben Problem:
   anhalten, committen, im PR unter „Offene Fragen“ beschreiben.

Nie ändern ohne Kernteam: `docs/adr/`, `docs/rules/`, `openspec/specs/`, `openspec/config.yaml`,
`openspec/queue.yaml`, `AGENTS.md`, `CLAUDE.md`, `REVIEW.md`, Werkzeug-Konfiguration (`.claude/`,
`.opencode/`, `opencode.json`, `.pi/`, `.githooks/`, `.github/`).

## Token sparen (Pro-Abo)

- Lies gezielt: `openspec show <id>`, `rg`, Dateiausschnitte. Nie `docs/konzept.md` komplett lesen –
  nur den Abschnitt, den der Change nennt.
- Tests knapp: `uv run pytest -q -x <pfad>`; nur fehlschlagende Ausgaben im Detail ansehen.
- Keine Erkundung „zur Sicherheit“. Plane kurz, setze um, prüfe mit dem Test aus der Task.
- Regeln je Bereich stehen in `docs/rules/` – lies nur die zu deinen Dateien:
  `geometrie.md` (packages/cadloop-core, geometry-service, rules, parts), `extension-ui.md`
  (packages/extension), `mcp-server.md` (packages/mcp-server).

## Befehle

- Setup: `uv sync --extra cad`, `git config core.hooksPath .githooks`
- Tests: `uv run pytest -q tests/unit`, Abnahme: `uv run pytest -q tests/acceptance/<id>`
- Lint/Format: `uv run ruff check --fix . && uv run ruff format .`
- OpenSpec: `openspec list`, `openspec show <id>`, `openspec status --change <id>`, `openspec validate <id>`
- Schutz prüfen: `python3 tools/guard.py check <pfad>`

## Struktur

`packages/cadloop-core` Identität, Publikation, Skizzen, Blech · `packages/geometry-service` lokaler
Geometrie-Dienst · `packages/mcp-server` MCP für Claude · `packages/rules` Regel-Engine ·
`packages/extension` VS-Code-Extension (TypeScript) · `parts/` Beispielteile · `docs/spikes/` Spike-Berichte

## Architekturregeln (Kurzfassung)

- Geometrie nur über build123d/OCP (ADR-001/002). Code ist Quelle der Wahrheit; STEP/STL/PNG nie einchecken (ADR-003).
- Topologie nie über Indizes; immer Feature-ID (`with feature("name"):`) oder veröffentlichter Name (ADR-016).
- Export und Querverweise nur über `publish(...)`, nie über Sichtbarkeit (ADR-015/018).
- UI ändert Code nur über LibCST (ADR-024); KI-Änderungen nur als Änderungskarte mit Vorschau (ADR-021).
- Nur Apache-2.0-kompatible Abhängigkeiten; LGPL nur dynamisch; kein GPL (ADR-013/027). Keine Netzwerkzugriffe zur Laufzeit.

## Konventionen

Python ≥ 3.11 mit Typ-Hints, ruff, pytest. TypeScript strict. Bauteilmodule: `@dataclass Params`,
`build(p: Params)`, Features in `with feature("…"):`, `publish(...)` am Ende.
Commits im Imperativ mit Change-ID: `ap-17-identitaet: Signatur-Matching für Flächen`.
