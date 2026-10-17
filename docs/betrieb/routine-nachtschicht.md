# Nachtschicht betreiben

Die Nachtschicht nimmt jede Nacht **genau einen Schritt**: Abnahmetests schreiben, einen Change umsetzen
oder einen roten Agenten-PR reparieren. Welcher Schritt dran ist, entscheidet `tools/next_step.py` ohne KI
aus dem Zustand des Repositorys (siehe Docstring dort). Ist nichts zu tun, wird kein Kontingent verbraucht.

## Empfohlen: GitHub-Action (`.github/workflows/nachtschicht.yml`)

Läuft auf einem GitHub-Runner mit derselben Werkzeugkette wie die CI (`.tool-versions`,
`rust-toolchain.toml`, Postgres 16). Das ist der einzige Weg, auf dem alles sicher erreichbar ist:
In der Cloud-Umgebung von Claude Code sind `hex.pm`, `repo.hex.pm`, `builds.hex.pm` und
`static.rust-lang.org` derzeit gesperrt – Phoenix-Abhängigkeiten und Rust-Ziele ließen sich dort nicht laden.

**Einmal einrichten (Kernteam):**

1. Claude-GitHub-App für das Repository installieren (`/install-github-app` in Claude Code). Nur mit ihr
   lösen Pushes und PRs des Agenten die CI aus – mit dem einfachen `GITHUB_TOKEN` liefe keine Prüfung.
2. Secret `CLAUDE_CODE_OAUTH_TOKEN` anlegen (lokal `claude setup-token`; Abo, keine Zusatzkosten).
3. Branch-Schutz für `main`: PR Pflicht, Checks „Vertrag und Konfiguration“, „Fällige Abnahmetests“,
   „Desktop-App“ und „DCO“ Pflicht.
4. Repository-Variable `NACHTSCHICHT=an` setzen. Ohne sie läuft nichts (Ausschalter).
5. Einmal von Hand starten: Actions → Nachtschicht → Run workflow.

**Morgens:** Issue „Nachtschicht-Protokoll“ (Label `nachtschicht`) lesen. Jeder Lauf schreibt dort eine
Zeile – auch „Nichts zu tun“, „wartet auf Review“ und Abbrüche. GitHub kann das Issue abonnieren.

**Was Menschen tun müssen, damit es weiterläuft:**

| Protokoll sagt | Zu tun |
| --- | --- |
| Abnahmetests warten auf Review | Tests prüfen (sie sind absichtlich rot) und mergen – erst dann beginnt die Umsetzung |
| offener PR wartet auf Review | PR prüfen (Label `review` für ein Claude-Review), mergen oder kommentieren |
| PR ist blockiert | „Offene Fragen“ im PR beantworten, Labels `blocked`, `fix-1` und `fix-2` entfernen (dann neuer Versuch) |
| main ist rot | main reparieren; die Nachtschicht arbeitet nicht an fremden Fehlern |
| abgebrochen | nichts – die nächste Nacht setzt auf dem Branch fort; nach zwei Abbrüchen Ursache ansehen |
| Nichts zu tun | nächsten Change freigeben (Eintrag in `openspec/queue.yaml`, Spec auf `main`) |

Die Phase in `queue.yaml` muss nicht mehr umgestellt werden: Liegen die Abnahmetests auf `main`, ist der
Change in der Umsetzung; sind alle Tasks abgehakt oder ist der `change/<id>`-PR gemergt, ist er fertig.
Ein Entwurfs-PR heißt „noch in Arbeit“: Die nächste Nacht macht dort weiter, statt zu reparieren.
`phase` bleibt als Untergrenze nutzbar.

**Kontingent:** Ein Lauf verbraucht das Abo-Kontingent wie eine Sitzung. Läuft es leer, bricht der Lauf ab
(protokolliert), es entstehen keine Zusatzkosten, solange „usage credits“ aus bleiben. Durch Sichern nach
jeder Task geht dabei keine Arbeit verloren.

## Alternativen

**Cloud-Routine** (claude.ai/code/routines): nur sinnvoll, wenn die Umgebung Netzzugang zu `hex.pm`,
`repo.hex.pm`, `builds.hex.pm`, `static.rust-lang.org` und GitHub-Releases hat. Setup-Skript:

```bash
command -v uv >/dev/null || pip install --user uv
uv sync --extra cad && npm install -g @fission-ai/openspec@1.14.2
curl -fsSL https://mise.run | sh && ~/.local/bin/mise trust --yes . && ~/.local/bin/mise install
rustup toolchain install
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres'"   # wie in der CI
```

Prompt: `Führe den Skill /nachtschicht aus. Halte dich strikt an seine Grenzen.` Der Skill prüft die
Versionen und hält mit „Umgebung passt nicht“ an, statt mit falschen Werkzeugen zu arbeiten.

**Lokal** (Rechner muss laufen): Claude Desktop → Code → Routines → Local, oder per cron
`claude -p "/nachtschicht" --permission-mode acceptEdits` im Repo-Verzeichnis mit `CEE_STRICT=1`.
