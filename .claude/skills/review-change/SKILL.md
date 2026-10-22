---
name: review-change
description: Unabhängiges Review eines Pull Requests zu einem OpenSpec-Change gegen Scenarios, ADRs und REVIEW.md. Aufruf mit PR-Nummer; mit dem Zusatz „auto“ (Auto-Merge-Workflow) setzt es am Ende das Label review-ok oder review-abgelehnt.
---

Prüfe den Pull Request, dessen Nummer als Argument übergeben wurde. Du bist nicht der Autor: Du arbeitest mit
frischem Kontext und vertraust weder der PR-Beschreibung noch dem Stand-Abschnitt, sondern liest Diff und Spec.

1. `gh pr view <nr>` und `gh pr diff <nr> --name-only`; die Change-ID steht im Branch (`change/<id>`,
   `tests/<id>`, `spec/<id>`, `fix/<grund>` oder `archiv/<id>`).
2. `python3 tools/guard.py range origin/main` auf dem PR-Branch: jede Meldung ist ein kritischer Befund.
3. Wenn Subagenten verfügbar sind, an `reviewer` delegieren (bei `client/` auch `ui-checker`);
   sonst selbst nach dem Vorgehen des Reviewers prüfen. Lies Diffs dateiweise, nicht den ganzen PR auf einmal.
4. Das Kernteam hat keine Rust- und Elixir-Erfahrung und liest keinen Code. Prüfe deshalb besonders, ob die
   Abnahmetests das Verhalten wirklich belegen (nicht nur Aufrufbarkeit) und ob der Abschnitt „In einfachen
   Worten“ stimmt.
5. Ergebnis als Kommentar am PR (`gh pr comment`), knapp: Befunde nach Schwere, Empfehlung, und eine
   Merge-Empfehlung in einem Satz, die ein Nicht-Programmierer versteht.

## Was je Branch-Art zu prüfen ist

- **`tests/<id>`:** Jedes Scenario der Spec (`openspec/changes/<id>/specs/`) hat mindestens einen Test, der es
  wirklich belegt; keine Erwartung ist schwächer als das Scenario (Zahlen, Grenzen, Fehlerfälle); Tests widersprechen
  sich nicht untereinander (auf den Fall prüfen: gleiche Ausgangslage, verschiedene Erwartung). Die Tests sind
  absichtlich rot; entscheidend ist, dass sie sich sammeln lassen und aus dem richtigen Grund rot sind.
- **`change/<id>`:** Abnahmetests grün und nicht verändert (`git diff origin/main -- tests/`), alle Tasks
  abgehakt, keine ADR-Verletzung, Regeln aus `docs/rules/` zu den geänderten Pfaden eingehalten.
- **Einspruch gegen einen Abnahmetest** (PR auf `tests/<id>` von einem Umsetzer, Begründung im Text): Stimmt
  der Einspruch gegen die Spec? Wird die Erwartung **nicht schwächer**? Wenn die Spec sich selbst widerspricht,
  ist das Frage (a) an den Menschen: nicht zustimmen, sondern im PR die Frage stellen (Label `blocked`).
- **`fix/<grund>`:** Behebt die Änderung genau die genannte Ursache, ohne Tests abzuschwächen oder zu überspringen?
- **`archiv/<id>`:** Nur Verschieben nach `openspec/changes/archive/` und Abgleich in `openspec/specs/`; die
  Requirements in `specs/` entsprechen den ADDED/MODIFIED-Requirements des Changes, nichts darüber hinaus.

## Auto-Modus (Argument „auto“)

Im Auto-Merge-Workflow entscheidet dein Ergebnis, ob der PR gemergt wird. Setze **genau ein** Label:

- Zustimmung (keine kritischen und keine wichtigen Befunde): `gh pr edit <nr> --add-label review-ok`
- sonst: `gh pr edit <nr> --add-label review-abgelehnt` – der Kommentar muss die nötigen Änderungen so
  nennen, dass der Umsetzer sie ohne Rückfrage beheben kann.

Im Zweifel ablehnen. Nie zustimmen, wenn der Vertragsschutz meldet, ein Test geschwächt wurde, eine
`[mensch]`-Abnahme offen ist oder du einen Teil des Diffs nicht prüfen konntest.
