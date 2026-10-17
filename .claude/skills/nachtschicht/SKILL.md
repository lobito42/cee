---
name: nachtschicht
description: Unbeaufsichtigter Lauf – bestimmt mit tools/next_step.py genau einen Schritt (Abnahmetests schreiben, Change umsetzen oder roten Agenten-PR reparieren), arbeitet ihn ab, öffnet bzw. aktualisiert den Pull Request und schreibt ins Nachtschicht-Protokoll. Für geplante Läufe als GitHub-Action, in der Cloud oder lokal.
---

Du arbeitest unbeaufsichtigt. Niemand beantwortet Fragen. Erledige **genau einen** Schritt, sparsam.

## 1. Vorbereitung

- Auf `main` starten: `git switch main && git pull -q`.
- Strenger Modus für alle Tests: In der GitHub-Action ist `CEE_STRICT=1` gesetzt; sonst jeden Testaufruf mit
  `CEE_STRICT=1 uv run pytest …` starten (fehlende Werkzeuge sind Fehler, nicht übersprungen).
- Werkzeuge nur nachinstallieren, wenn sie fehlen. Versionen stehen in `.tool-versions` und
  `rust-toolchain.toml`; weicht `elixir --version` oder `rustc --version` davon ab, nicht arbeiten, sondern
  mit Grund „Umgebung passt nicht“ ins Protokoll (Abschnitt 4) und beenden. In der GitHub-Action
  (`.github/workflows/nachtschicht.yml`) ist alles schon eingerichtet.

## 2. Schritt bestimmen

`python3 tools/next_step.py` ausgeben lassen und **genau** dem Ergebnis folgen. Nicht selbst auswählen,
nicht erkunden. Felder: `step`, `id`, `branch`, `resume`, `model`, ggf. `pr`, `attempt`, `reason`.

- `step: stop` → nur das Protokoll schreiben (`reason`) und beenden.
- Bei `model: opus` die Arbeit an den passenden Spezialisten delegieren (`kern-specialist` für crates/ und
  server/, `geometry-specialist` für worker/), wenn Subagenten verfügbar sind; sonst selbst arbeiten.

## 3. Ausführen

**Branch:** `resume: true` → `git fetch origin <branch> && git switch <branch>` und auf dem vorhandenen Stand
weiterarbeiten (nie neu von main anlegen); steht `pr` dabei, ist das der offene Entwurfs-PR – keinen neuen
öffnen. Sonst `git switch -c <branch>`.

- **tests** → Abnahmetests nach dem Vorgehen des Agenten `test-author`. Prüfen, dass sie rot sind.
- **build** → umsetzen nach dem Vorgehen des Agenten `implementer` (Tasks in Reihenfolge,
  `uv run pytest -q -x tests/acceptance/<id>`).
- **fix** → `gh pr checks <pr>` und `gh run view <run-id> --log-failed` lesen, nur die Ursache beheben.
  Danach Label setzen: `gh pr edit <pr> --add-label fix-<attempt>`. Ist es der zweite Versuch und noch
  rot, zusätzlich Label `blocked`.

**Sicher speichern:** Nach jeder abgehakten Task bzw. jedem fertigen Testmodul committen (`git commit -s`)
und pushen (`git push -u origin <branch>`). Gibt es noch keinen PR, nach dem ersten Push sofort einen
**Entwurfs-PR** öffnen (`gh pr create --draft`, Vorlage `.github/pull_request_template.md`). Bricht der Lauf
ab, macht die nächste Nacht dort weiter.

**Fertig** ist ein Schritt erst, wenn die Abnahmetests des Changes im strengen Modus grün sind und
**nichts übersprungen** wurde (`pytest -q -rs` zeigt keine `SKIPPED`). Dann den PR mit
`gh pr ready <pr>` aus dem Entwurf holen. Bei `tests` gilt das Umgekehrte: Tests laufen, sind aber rot.

## 4. Protokoll (immer, auch bei „Nichts zu tun“ und Abbruch)

Kommentar im Issue „Nachtschicht-Protokoll“ (Label `nachtschicht`; fehlt es, anlegen):

```
gh issue list --label nachtschicht --state open --json number --jq '.[0].number'
gh issue comment <nr> --body "<Datum> · <id> · <step> · <Ergebnis> · <PR-Link> · <offene Fragen>"
```

Ergebnis ist eines von: `fertig`, `teilweise (Task x.y offen)`, `rot nach 3 Anläufen`, `gestoppt: <reason>`.

## Grenzen

- Pushe nur auf den Branch aus `next_step.py`, nie auf `main`. Ändere `openspec/queue.yaml` nicht.
- Abnahmetests auf `change/`-Branches nie ändern, abschwächen oder überspringen.
- Höchstens drei Anläufe pro Problem, dann Stand committen und pushen, PR als Entwurf lassen, Label `blocked`,
  Problem im PR unter „Offene Fragen“ beschreiben.
- Jeder PR folgt `.github/pull_request_template.md`, inklusive „In einfachen Worten“ und – wo der Change
  Kriterien mit `[mensch]` hat – der Checkliste „Menschliche Abnahme“.
- Am Ende eine Zusammenfassung von höchstens fünf Zeilen: Change, Schritt, Ergebnis, PR-Link, offene Fragen.
