---
name: review-change
description: Unabhängiges Review eines Pull Requests zu einem OpenSpec-Change gegen Scenarios, ADRs und REVIEW.md. Aufruf mit PR-Nummer.
---

Prüfe den Pull Request, dessen Nummer als Argument übergeben wurde.

1. `gh pr view <nr>` und `gh pr diff <nr> --name-only`; die Change-ID steht im Branch (`change/<id>`,
   `tests/<id>` oder `spec/<id>`).
2. `python3 tools/guard.py range origin/main` auf dem PR-Branch: jede Meldung ist ein kritischer Befund.
3. Wenn Subagenten verfügbar sind, an `reviewer` delegieren (bei `client/` auch `ui-checker`);
   sonst selbst nach dem Vorgehen des Reviewers prüfen. Lies Diffs dateiweise, nicht den ganzen PR auf einmal.
4. Das Kernteam hat keine Rust- und Elixir-Erfahrung. Prüfe deshalb besonders, ob die Abnahmetests das
   Verhalten wirklich belegen (nicht nur Aufrufbarkeit) und ob der Abschnitt „In einfachen Worten“ stimmt.
5. Ergebnis als Kommentar am PR (`gh pr comment`), knapp: Befunde nach Schwere, Empfehlung, und eine
   Merge-Empfehlung in einem Satz, die ein Nicht-Programmierer versteht. Mergen entscheidet das Kernteam.
