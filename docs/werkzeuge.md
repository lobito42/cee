# Werkzeuge: fünf Wege, ein Harness

Alle Werkzeuge arbeiten mit derselben Quelle: `AGENTS.md` (Anweisungen), OpenSpec (Aufträge),
`tools/guard.py` (Vertragsschutz) und den Skills unter `.claude/skills/`. Ein Werkzeugwechsel ändert
nichts am Projekt.

Gemeint sind die Werkzeuge **zum Entwickeln**. Das Produkt selbst ist eine Web- und Desktop-App (ADR-031).

## Überblick

| | VS Code + Claude-Extension | Claude Desktop (Linux) | Claude Code CLI | OpenCode | Pi |
| --- | --- | --- | --- | --- | --- |
| Abrechnung | Claude-Abo | Claude-Abo | Claude-Abo | API-Key, pro Token | API-Key, pro Token |
| Anweisungen | `CLAUDE.md` → `AGENTS.md` | wie CLI | `CLAUDE.md` → `AGENTS.md` | `AGENTS.md` | `AGENTS.md` |
| OpenSpec | `/opsx:propose`, `/opsx:apply` … | wie CLI | `/opsx:propose`, `/opsx:apply` … | `/opsx-propose`, `/opsx-apply` … | `/opsx-propose`, `/opsx-apply` … |
| Eigene Skills | `.claude/skills/` | wie CLI | `.claude/skills/` | `.claude/skills/` (Kompatibilität) | über `.pi/settings.json` |
| Subagenten | `.claude/agents/` | wie CLI | `.claude/agents/` | `.opencode/agents/` (generiert) | keine; Skills arbeiten ohne |
| Pfadregeln | `.claude/rules/` (generiert) | wie CLI | `.claude/rules/` | Verweis in `AGENTS.md` | Verweis in `AGENTS.md` |
| Vertragsschutz beim Schreiben | Hook (Branch-Regeln) | Hook | Hook | Berechtigungen in `opencode.json` (statisch) | Extension `.pi/extensions/guard.ts` (Branch-Regeln) |
| Schutz beim Commit/PR | Git-Hook + CI | Git-Hook + CI | Git-Hook + CI | Git-Hook + CI | Git-Hook + CI |
| Unbeaufsichtigt | – | Routinen (lokal oder Cloud) | `/schedule`, `claude -p` | – | `pi -p` |

Einmal pro Klon: `git config core.hooksPath .githooks` – damit greift der Schutz in jedem Werkzeug.

## VS Code mit Claude-Extension

1. Extension „Claude Code“ installieren, mit dem Claude-Abo anmelden.
2. Repo öffnen; die Extension nutzt `.claude/settings.json`, Hooks, Skills und Agenten automatisch.
3. Typischer Ablauf im Prompt-Feld: `/opsx:explore`, `/opsx:propose …`, `/implement-change <id>`.

## Claude Desktop (Linux)

1. Linux-Version installieren (Beta), im Tab **Code** eine lokale Sitzung im Repo-Ordner starten.
2. Gleiche Konfiguration wie die CLI. Parallele Sitzungen über die Sitzungsliste; jede auf eigenem Branch.
3. Unter **Routines** lassen sich die Nachtschicht als **Cloud**- oder **Local**-Routine anlegen
   (siehe `docs/betrieb/routine-nachtschicht.md`).

## Claude Code CLI

```bash
claude                                   # interaktiv
claude --worktree change-ap-01           # eigener Worktree für parallele Arbeit
claude -p "/implement-change ap-01-x"    # ohne Rückfragen, z. B. per cron
```

Parallel arbeiten: Hintergrund-Sitzungen in der Agenten-Übersicht; mit Pro höchstens 2 gleichzeitig.

## OpenCode (1.x stabil und 2.0 Beta)

```bash
export ANTHROPIC_API_KEY=…                 # eigener Key mit Ausgabelimit in der Claude Console
npm install -g opencode-ai                 # OpenCode 1.x  → Befehl: opencode
npm install -g @opencode-ai/cli@beta       # OpenCode 2.0  → Befehl: opencode2 (parallel installierbar)
```

- `opencode.json` ist bewusst im Format von OpenCode 1 geschrieben: OpenCode 2 liest es mit und wandelt es
  intern um, umgekehrt nicht. Geprüft mit OpenCode 1.19.3 und 2.0 Beta (`debug config`, `debug agent(s)`).
- Modell Sonnet 5.5; Subagenten aus `.opencode/agents/` (generiert), reviewer und ui-checker ohne Schreibrecht.
- Geschützte Bereiche sind gesperrt; Change-Ordner und Abnahmetests fragen nach (`ask`). Ob der Branch
  dazu passt, prüft der Git-Hook beim Commit.
- Skills: OpenCode liest `.claude/skills/` mit; gleichnamige OpenSpec-Skills unter `.opencode/skills/` werden
  dabei nicht doppelt geladen.
- OpenCode 2 liest zusätzlich das `.claude/`-Verzeichnis als Konfigurationsquelle; die Agenten erscheinen
  trotzdem nur einmal.

## Pi

```bash
export ANTHROPIC_API_KEY=…
pi                       # Projekt beim ersten Start als vertrauenswürdig bestätigen (lädt die Extension)
pi -p "/skill:nachtschicht"
```

- Nicht per Claude-Login anmelden: Pi verbraucht dann kostenpflichtiges Zusatzkontingent statt Abo-Limits.
- Keine Subagenten: `implement-change` und `review-change` arbeiten dann alle Schritte selbst ab.

## Lokale Modelle

OpenCode und Pi können statt eines API-Keys auch lokale Modelle nutzen, z. B. über Ollama
(OpenAI-kompatible Schnittstelle). Das passt zu ADR-037 und kostet nichts außer Hardware. Für
unbeaufsichtigte Läufe an Produktcode bleiben die Claude-Modelle Standard; lokale Modelle eignen sich zum
Ausprobieren und für kleine Aufgaben. Ergebnisse je Modell im PR vermerken, damit der Vergleich sichtbar wird.

## Kosten im Blick

- Abo-Werkzeuge (VS Code, Desktop, CLI, Routinen, Review-Action mit `CLAUDE_CODE_OAUTH_TOKEN`) kosten nichts
  zusätzlich. „Usage credits“ unter claude.ai/settings/usage ausgeschaltet lassen.
- OpenCode und Pi: in der Claude Console ein Ausgabelimit setzen (z. B. 20 $/Monat) und einen eigenen Key
  nur für diese Tests verwenden.
