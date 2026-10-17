# Routine „Nachtschicht“ (Claude Code in der Cloud)

Einrichten unter claude.ai/code/routines → **New routine** (oder im CLI mit `/schedule`).

| Feld | Wert |
| --- | --- |
| Name | Nachtschicht |
| Modell | Sonnet |
| Repository | dieses Repo |
| Umgebung | Default; Setup-Skript: siehe unten |
| Trigger | Schedule, werktags 01:07 (Pro: 1 Lauf pro Nacht; mit Max 5x z. B. 01:07 und 04:07) |
| Connectors | alle entfernen (nicht nötig) |

**Setup-Skript der Umgebung**

```bash
pip install uv && uv sync --extra cad && npm install -g @fission-ai/openspec@latest \
  && sudo apt-get update && sudo apt-get install -y elixir erlang-dev   # Rust ist meist vorinstalliert
```

**Prompt (genau so übernehmen)**

```text
Führe den Skill /nachtschicht aus. Halte dich strikt an seine Grenzen: genau ein Schritt, Branches nur
tests/<id> oder change/<id>, kein Push auf main, keine Änderung an openspec/queue.yaml. Wenn nichts zu
tun ist, beende den Lauf sofort mit einer Zeile „Nichts zu tun“.
```

**Hinweise**

- Läufe verbrauchen das Abo-Kontingent wie interaktive Sitzungen. Läuft das Kontingent nachts leer, wird
  der Lauf abgelehnt – es entstehen keine Zusatzkosten, solange „usage credits“ ausgeschaltet bleiben.
- Gesteuert wird ausschließlich über `openspec/queue.yaml`: `night: true` und `phase` setzen.
- Ein grüner Status in der Routinen-Liste heißt nur „ohne Infrastrukturfehler beendet“ – das Ergebnis steht
  im PR bzw. im Lauf-Protokoll.
- Lokale Alternative ohne Cloud: Claude Desktop → Code → Routines → **Local** (läuft nur, wenn der Rechner an ist),
  oder per cron: `claude -p "/nachtschicht" --permission-mode acceptEdits` im Repo-Verzeichnis.
