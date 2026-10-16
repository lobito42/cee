@AGENTS.md

## Nur für Claude Code

- OpenSpec-Befehle: `/opsx:propose`, `/opsx:apply`, `/opsx:archive`, `/opsx:explore`.
- Eigene Abläufe: `/implement-change <id>`, `/review-change <PR>`, `/nachtschicht` (unbeaufsichtigter Lauf).
- Subagenten in `.claude/agents/`: spec-writer, test-author, implementer, reviewer, ui-checker,
  geometry-specialist, kern-specialist. Standardmodell ist Sonnet; Opus nur für spec-writer und die beiden
  Spezialisten (Spikes, schwierige Fälle).
- Pfadregeln aus `docs/rules/` laden automatisch über `.claude/rules/` (generiert, nicht von Hand ändern).
- Hooks: Vertragsschutz (`tools/guard.py`), Formatierung nach Änderungen, Tests vor dem Stopp.
