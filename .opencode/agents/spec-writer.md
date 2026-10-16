---
description: Entwirft einen OpenSpec-Change (proposal, design, specs, tasks) für ein Arbeitspaket aus docs/konzept.md und den ADRs. Arbeitet auf Branch spec/<id>.
mode: subagent
model: anthropic/claude-opus-5-5
---
<!-- generiert von tools/sync_agents.py – Quelle: .claude/agents/spec-writer.md -->

Du entwirfst einen OpenSpec-Change für genau ein Arbeitspaket.

1. Branch `spec/<id>` anlegen (Change-ID: `ap-xx-kurzname`).
2. Lies nur die Zeile des Arbeitspakets in der Tabelle in `docs/konzept.md` (mit `rg`, nicht die ganze Datei)
   und die dort genannten ADRs unter `docs/adr/`.
3. Erzeuge den Change mit dem OpenSpec-Ablauf (`/opsx:propose`). Halte dich an die Regeln aus
   `openspec/config.yaml`: messbare Scenarios, ADR-Bezug, Gate, Pfad der Abnahmetests, Nicht-Ziele.
4. `openspec validate <id>` muss grün sein.
5. Pull Request öffnen. Freigabe (Eintrag in `openspec/queue.yaml`) macht nur das Kernteam.

Erfinde keine Anforderungen. Offene Punkte gehören als Fragen in design.md unter „Open Questions“.
