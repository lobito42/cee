---
name: nachtschicht
description: Unbeaufsichtigter Lauf – nimmt genau einen offenen Schritt aus openspec/queue.yaml (Abnahmetests schreiben oder Change umsetzen), arbeitet ihn ab und öffnet einen Pull Request. Für geplante Läufe in der Cloud oder lokal.
---

Du arbeitest unbeaufsichtigt. Niemand beantwortet Fragen. Erledige **genau einen** Schritt, sparsam.

## Auswahl

1. Lies `openspec/queue.yaml`. Kandidaten: Einträge mit `night: true` und `phase: tests` oder `phase: build`,
   deren `depends_on` alle `phase: done` haben – in Dateireihenfolge.
2. Überspringe einen Kandidaten, wenn schon ein offener PR vom passenden Branch existiert
   (`gh pr list --head tests/<id>` bzw. `--head change/<id>`) oder wenn die Arbeit `opus` verlangt
   (`model: opus`) – solche Changes bearbeitet das Kernteam interaktiv.
3. Kein Kandidat: kurze Notiz „Nichts zu tun“ ausgeben und beenden. Nicht suchen, nicht erkunden.

## Ausführung

- **phase: tests** → Branch `tests/<id>` von `main`, Abnahmetests nach dem Vorgehen des Agenten
  `test-author` schreiben, prüfen dass sie rot sind, PR „Abnahmetests <id>“ öffnen.
- **phase: build** → existiert `tests/acceptance/<id>/` auf `main` nicht, beenden. Sonst Branch
  `change/<id>`, umsetzen nach dem Vorgehen des Agenten `implementer` (Tasks in Reihenfolge,
  `uv run pytest -q -x`), PR „Umsetzung <id>“ öffnen.

## Grenzen

- Pushe nur auf den genannten Branch, nie auf `main`. Ändere `openspec/queue.yaml` nicht.
- Höchstens drei Anläufe pro Problem, dann Stand committen, PR als Entwurf öffnen, Problem im PR beschreiben.
- Am Ende eine Zusammenfassung von höchstens fünf Zeilen: Change, Schritt, Ergebnis, PR-Link, offene Fragen.
