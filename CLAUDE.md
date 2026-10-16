@AGENTS.md

## Nur für Claude Code

- OpenSpec-Befehle: `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:explore`.
- Eigene Abläufe: `/implement-change <id>`, `/review-change <PR>`, `/nachtschicht` (unbeaufsichtigter Lauf).
- Subagenten in `.claude/agents/`: spec-writer, test-author, implementer, reviewer, ui-checker,
  geometry-specialist. Standardmodell ist Sonnet; Opus nur für geometry-specialist und spec-writer.
- Pfadregeln aus `docs/rules/` laden automatisch über `.claude/rules/` (generiert, nicht von Hand ändern).
- Hooks: Vertragsschutz (`tools/guard.py`), Formatierung nach Änderungen, Tests vor dem Stopp.
