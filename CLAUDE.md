@AGENTS.md

## Nur für Claude Code

- Arbeitsweise seit ADR-067: kurze Runden nach `docs/plan.md` auf `runde/<thema>`. `/stand` gibt dem Menschen
  einen Überblick in Alltagssprache.
- `/nachtschicht` ist ausgeschaltet (ADR-067); die übrigen Abläufe (`/implement-change`, `/review-change`,
  `/opsx:*`) nur, wenn ein Teil ausdrücklich über OpenSpec stabil werden soll.
- Subagenten in `.claude/agents/`; für Geometrie bei schwierigen Fällen `geometry-specialist`.
- Pfadregeln aus `docs/rules/` laden automatisch über `.claude/rules/` (generiert, nicht von Hand ändern).
- Hooks: Vertragsschutz (`tools/guard.py`), Formatierung nach Änderungen, Tests vor dem Stopp.
