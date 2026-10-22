---
name: nachtschicht
description: Unbeaufsichtigter Lauf – bestimmt mit tools/next_step.py genau einen Schritt (Hausmeister: main reparieren, Konflikt lösen, roten PR reparieren, Change archivieren; sonst Abnahmetests schreiben oder Change umsetzen), arbeitet ihn ab, öffnet bzw. aktualisiert den Pull Request und schreibt ins Nachtschicht-Protokoll. Für geplante Läufe als GitHub-Action, in der Cloud oder lokal.
---

Du arbeitest unbeaufsichtigt. Niemand beantwortet Fragen sofort. Erledige **genau einen** Schritt, sparsam. Die
GitHub-Action startet mehrmals täglich Läufe mit je bis zu drei Runden; jede Runde erledigt einen Schritt.
Git, Review, Konflikte, CI und Archivieren sind deine Aufgabe, nicht die des Menschen (ADR-064). Gemergt wird
nicht von dir, sondern vom Auto-Merge-Workflow nach dem unabhängigen Review.

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
Schritte: `repair-main`, `merge-main`, `fix`, `archive` (Hausmeister) sowie `tests`, `build`.

- `step: stop` → nur das Protokoll schreiben (`reason`) und beenden.
- Bei `model: opus` die Arbeit an den passenden Spezialisten delegieren (`kern-specialist` für crates/ und
  server/, `geometry-specialist` für worker/), wenn Subagenten verfügbar sind; sonst selbst arbeiten.

## 3. Ausführen

**Branch:** `resume: true` → `git fetch origin <branch> && git switch <branch>` und auf dem vorhandenen Stand
weiterarbeiten (nie neu von main anlegen); steht `pr` dabei, ist das der offene Entwurfs-PR – keinen neuen
öffnen. Sonst `git switch -c <branch>`.

**Befehle, die nachts durchgehen** (alles andere wird verweigert und kostet einen Anlauf):
- Kein `cd`: statt `cd spikes/x && npm run lint` → `npm --prefix spikes/x run lint`; Skripte als
  `bash spikes/…/skript.sh` aufrufen.
- Kein `$(…)`, kein `export`, kein `timeout`, kein `sed -i`, kein `cat > datei <<EOF`, kein `python3 -c`:
  Dateien mit Write/Edit schreiben, Umgebungsvariablen nur als `CEE_STRICT=1 uv run …`, temporäre Ordner
  fest benennen (z. B. `mkdir -p /tmp/cee-pruefen`).
- PR-Text als Datei schreiben und mit `gh pr create --body-file` bzw. `gh pr edit --body-file` übergeben.
- Formatieren und Prüfen nur über die Skripte des Projekts (`npm --prefix spikes/x run format`), nie
  `npx prettier --write .`, `npx eslint --fix .` o. Ä. im Wurzelverzeichnis: Das ändert Dateien im ganzen
  Repository, und Zurücksetzen ist nachts nicht möglich. Vor jedem Commit `git status --short` prüfen und nur
  eigene Dateien mit Pfad hinzufügen (`git add spikes/x openspec/changes/<id>/tasks.md`), nie `git add -A`.

- **repair-main** → `main` ist rot. Auf `fix/main-rot` (von `main`): Ursache im Log des letzten CI-Laufs auf
  `main` finden (`gh run list --branch main --limit 3`, `gh run view <id> --log-failed`), nur diese beheben,
  lokal prüfen, committen, pushen, PR öffnen (`gh pr create`, nicht als Entwurf, wenn grün). Tests nie
  abschwächen oder überspringen. Branch-Name `fix/<grund>` ist erlaubt; er darf Produktcode und `tests/unit/`
  schreiben, aber keine Verträge.
- **merge-main** → Der PR `pr` hat einen Konflikt. `git fetch origin && git switch <branch> && git merge origin/main`,
  Konflikte lösen (bei Verträgen, die auf `main` neuer sind, gewinnt `main`), Tests des Changes laufen lassen,
  `git push -u origin <branch>`. Löst sich ein Konflikt nur durch eine inhaltliche Entscheidung (zwei
  widersprüchliche Anforderungen), ist das eine Frage an den Menschen (siehe „Fragen“).
- **archive** → Auf `archiv/<id>`: `openspec archive <id> -y`, danach `git status --short` prüfen (nur
  `openspec/changes/<id>/`, `openspec/changes/archive/` und `openspec/specs/` dürfen sich ändern), committen
  (`git commit -s`, „<id> archivieren“), pushen, PR öffnen. Der Auto-Merge nimmt ihn nach dem Review.
- **tests** → Abnahmetests nach dem Vorgehen des Agenten `test-author`. Prüfen, dass sie rot sind.
  Hält ein Umsetzer später einen Test für falsch, geht das nur als Einspruch-PR auf `tests/<id>` (nie auf
  `change/<id>`).
- **build** → umsetzen nach dem Vorgehen des Agenten `implementer` (Tasks in Reihenfolge,
  `uv run pytest -q -x tests/acceptance/<id>`).
- **fix** → `gh pr checks <pr>` und `gh run view <run-id> --log-failed` lesen, bei abgelehntem Review (Label
  `review-abgelehnt`) den Review-Kommentar im PR (`gh pr view <pr> --comments`); nur die Ursache bzw. die genannten
  Punkte beheben. Dann das Label `review-abgelehnt` **nicht** selbst entfernen: der nächste Push startet den Review neu.
  Danach Label setzen: `gh pr edit <pr> --add-label fix-<attempt>`. Ist es der zweite Versuch und noch
  rot, zusätzlich Label `blocked`.

**Sicher speichern:** Nach jeder abgehakten Task bzw. jedem fertigen Testmodul committen (`git commit -s`)
und pushen, immer mit Ziel: `git push -u origin <branch>` (nie ein blankes `git push` – das ist nicht
freigegeben; ebenso `fix/…` und `archiv/…`). Gibt es noch keinen PR, nach dem ersten Push sofort einen
**Entwurfs-PR** öffnen (`gh pr create --draft`, Vorlage `.github/pull_request_template.md`). Bricht der Lauf
ab, macht die nächste Runde dort weiter.

**Stand im PR:** Nach jeder Task bzw. jedem Testmodul den Abschnitt `## Stand` ganz oben im PR-Text
aktualisieren (`gh pr edit <pr> --body-file <datei>`), damit der Mensch unterwegs sieht, wie weit der Lauf ist:

```
## Stand
Runde 1 · seit 05:27 UTC · Tests 5 von 12 grün · Tasks 3 von 9 · gerade: Offline-Abgleich · Lage: gut
```

„Lage“ ist `gut` oder `hängt seit <n> Anläufen an <Problem>` – aus Zahlen abgeleitet, nicht geschätzt.

**Fertig** ist ein Schritt erst, wenn die Abnahmetests des Changes im strengen Modus grün sind und
**nichts übersprungen** wurde (`pytest -q -rs` zeigt keine `SKIPPED`). Dann den PR mit
`gh pr ready <pr>` aus dem Entwurf holen; das startet den Review und den Auto-Merge. Bei `tests` ist der Schritt fertig, wenn alle Scenarios abgedeckt
sind und die Tests im strengen Modus ohne Sammelfehler und ohne `SKIPPED` laufen, aber rot sind – dann ebenso
`gh pr ready <pr>`. **Ein Entwurf heißt für die nächste Runde „unfertig, weitermachen“**: Wer fertig ist und den
PR als Entwurf lässt, blockiert die übrigen Runden der Nacht.

## 4. Fragen (nur wenn es wirklich blockiert)

Der Mensch wird nur bei Inhalten gefragt: unklare oder widersprüchliche Anforderungen, Ausprobieren eines
Spikes oder Prototyps, Änderungen an Kernteam-Dateien, Kriterien mit `[mensch]`. Frage nie zu Git, CI, Tests,
Konflikten oder Archivieren – löse sie. Blockiert eine Frage die Arbeit am PR: Label `blocked` setzen, die Frage
im PR unter „Offene Fragen“ stellen und **einen Kommentar im Issue „Fragen an das Kernteam“** schreiben
(`gh issue list --label fragen`), mit Erwähnung `@lobito42`; das löst die Push-Benachrichtigung aus. Form:

```
@lobito42 <id>: <die Entscheidung in einem Satz>? A) <Antwort> (empfohlen) B) <Antwort> – danach: <was passiert>
```

Alles, was nicht blockiert (z. B. ein Prototyp zum Ausprobieren), kommt nur in den PR bzw. ins `/stand`. Prototypen
immer als Link zur Browser-Vorschau (Workflow `vorschau.yml`, `spikes/<name>/vorschau.sh`), Desktop-Build nur bei
Tauri, Eingabegeräten oder Geräteleistung (Label `desktop-build`), jeweils mit Klick-Anleitung und der eigentlichen
Frage. Die Antwort des Menschen hältst du im PR oder in der Spec fest.

## 5. Protokoll (immer, auch bei „Nichts zu tun“ und Abbruch)

Kommentar im Issue „Nachtschicht-Protokoll“ (Nummer 2), als eigener Befehl ohne `$(…)` (Befehle mit
`$(…)` werden in der Nacht verweigert):

```
gh issue comment 2 --body "<Datum> · <id> · <step> · <Ergebnis> · <PR-Link> · <offene Fragen>"
```

Ergebnis ist eines von: `fertig`, `teilweise (Task x.y offen)`, `rot nach 3 Anläufen`, `gestoppt: <reason>`.

## Grenzen

- Pushe nur auf den Branch aus `next_step.py`, nie auf `main`. Ändere `openspec/queue.yaml` nicht. Du mergst
  nichts selbst und schaltest den Auto-Merge nicht von Hand ein.
- Abnahmetests auf `change/`-Branches nie ändern, abschwächen oder überspringen.
- Höchstens drei Anläufe pro Problem, dann Stand committen und pushen, PR als Entwurf lassen, Label `blocked`,
  Problem im PR unter „Offene Fragen“ beschreiben.
- Jeder PR folgt `.github/pull_request_template.md`, inklusive „In einfachen Worten“ und – wo der Change
  Kriterien mit `[mensch]` hat – der Checkliste „Menschliche Abnahme“.
- Am Ende eine Zusammenfassung von höchstens fünf Zeilen: Change, Schritt, Ergebnis, PR-Link, offene Fragen.
