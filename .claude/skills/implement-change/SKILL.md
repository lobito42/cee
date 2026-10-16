---
name: implement-change
description: Setzt einen freigegebenen OpenSpec-Change komplett um – prüft Freigabe und Abnahmetests, implementiert auf change/<id>, lässt unabhängig reviewen. Aufruf mit Change-ID, z. B. ap-01-geometry-service.
---

Setze den Change um, dessen ID als Argument übergeben wurde (z. B. `ap-01-geometry-service`).

1. **Freigabe:** Die ID muss in `openspec/queue.yaml` stehen, alle `depends_on` müssen `phase: done` haben.
   Sonst abbrechen und sagen, was fehlt.
2. **Vertrag:** `tests/acceptance/<id>/` muss auf `main` existieren. Fehlt es, abbrechen: zuerst Tests auf
   Branch `tests/<id>` schreiben lassen (Agent `test-author`) und vom Kernteam mergen lassen.
3. **Umsetzen:** Branch `change/<id>` von `main`. Wenn Subagenten verfügbar sind, an `implementer`
   delegieren; sonst selbst nach dessen Vorgehen arbeiten (`/opsx:apply` bzw. `/opsx-apply`).
4. **Prüfen:** `uv run pytest -q tests/acceptance/<id>` grün, alle Tasks in `tasks.md` abgehakt,
   `openspec validate <id>` grün.
5. **Review:** Wenn Subagenten verfügbar sind, `reviewer` (bei `packages/extension` auch `ui-checker`).
6. **Bericht** an den Menschen, höchstens zehn Zeilen: PR-Link, Testergebnis, Review-Befunde, offene Fragen.
