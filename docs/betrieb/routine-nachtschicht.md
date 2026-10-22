# Nachtschicht betreiben

Die Nachtschicht läuft seit ADR-064 **rund um die Uhr**: alle drei Stunden ein Lauf mit bis zu drei Runden, je Runde
**genau ein Schritt**. Welcher Schritt dran ist, entscheidet `tools/next_step.py` ohne KI aus dem Zustand des
Repositorys (siehe Docstring dort). Ist nichts zu tun, startet Claude nicht und verbraucht kein Kontingent; ist das
Kontingent erschöpft, endet die Runde (protokolliert) und der nächste Lauf macht weiter.

Reihenfolge der Schritte – Hausmeister zuerst:

1. weitermachen auf einem Entwurfs-PR,
2. `repair-main`: `main` ist rot → Branch `fix/main-rot`,
3. `merge-main`: Konflikt mit `main` in einem Agenten-PR auflösen,
4. `fix`: roten PR oder abgelehnten Review nachbessern (zwei Versuche, dann `blocked`),
5. `archive`: gemergten, fertigen Change archivieren (Branch `archiv/<id>`),
6. `tests` oder `build` für den nächsten freigegebenen Change. Mehrere voneinander unabhängige Changes dürfen
   gleichzeitig offen sein; ein wartender PR hält nur seinen eigenen Change auf.

Gemergt wird nicht in der Nachtschicht, sondern in `.github/workflows/auto-merge.yml`: Bei jedem fertigen PR auf
`tests/`, `change/`, `fix/` und `archiv/` prüft der Vertragsschutz, dann `/review-change … auto` mit frischem Kontext
(nicht der Autor). Stimmt der Review zu (Label `review-ok`), schaltet der Workflow den Auto-Merge ein; GitHub merged,
sobald alle Pflicht-Prüfungen grün sind, und nur den geprüften Stand. Nie automatisch gemergt werden `adr/`-Branches
und PRs mit offener menschlicher Abnahme (`[mensch]`, Label `wartet-auf-mensch`).

## Empfohlen: GitHub-Action (`.github/workflows/nachtschicht.yml`)

Läuft auf einem GitHub-Runner mit derselben Werkzeugkette wie die CI (`.tool-versions`,
`rust-toolchain.toml`, Postgres 16). Das ist der einzige Weg, auf dem alles sicher erreichbar ist:
In der Cloud-Umgebung von Claude Code sind `hex.pm`, `repo.hex.pm`, `builds.hex.pm` und
`static.rust-lang.org` derzeit gesperrt – Phoenix-Abhängigkeiten und Rust-Ziele ließen sich dort nicht laden.

**Einmal einrichten (Kernteam), Klick für Klick** – alles auf github.com im Repository `lobito42/cee`:

1. *Claude-GitHub-App* installieren (`/install-github-app` in Claude Code). Nur mit ihr lösen Pushes und PRs des
   Agenten die CI aus – mit dem einfachen `GITHUB_TOKEN` liefe keine Prüfung. Secret `CLAUDE_CODE_OAUTH_TOKEN`
   anlegen (lokal `claude setup-token`; Abo, keine Zusatzkosten).
2. **Auto-Merge erlauben:** *Settings* → *General* → Abschnitt *Pull Requests* → Haken bei **„Allow auto-merge“** →
   unten bei *Pull Requests* außerdem „Allow merge commits“ an lassen.
3. **Branch-Schutz für `main`:** *Settings* → *Rules* → *Rulesets* → das Ruleset für `main` öffnen (bzw. *New branch
   ruleset*, Ziel: Default branch) → „Require a pull request before merging“ an → „Require status checks to pass“
   an und als Pflicht eintragen: *Vertrag und Konfiguration*, *Fällige Abnahmetests*, *Rust-Kern*, *Elixir-Server*,
   *Client (Web)*, *Python (ubuntu-latest)*, die drei *Desktop-App*-Prüfungen und *dco*. „Require approvals“ **aus**
   (den Review macht der Workflow; sonst könnte kein Agent mergen). Speichern.
   Wichtig: Ohne diese Pflicht-Prüfungen würde der Auto-Merge sofort statt erst bei Grün mergen.
4. **GitHub Pages für Vorschauen:** *Settings* → *Pages* → *Source*: **„Deploy from a branch“** → Branch `gh-pages`,
   Ordner `/ (root)` → *Save*. (Der Branch entsteht beim ersten Spike-PR mit Vorschau.) Das Repository ist öffentlich,
   die Vorschauen sind es damit auch.
5. Repository-Variable `NACHTSCHICHT=an` setzen (*Settings* → *Secrets and variables* → *Actions* → *Variables*).
   Ohne sie läuft nichts (Ausschalter).
6. Einmal von Hand starten: *Actions* → *Nachtschicht* → *Run workflow*.
7. Push-Benachrichtigungen: GitHub-App auf dem Handy installieren, *Settings* → *Notifications* → „Participating,
   @mentions and custom“ an. Dann löst jede Erwähnung `@lobito42` im Issue „Fragen an das Kernteam“ eine Meldung aus.

**Berechtigungen der Agenten:** `.claude/settings.json` (Kernteam) muss die Pushes auf die neuen Branch-Arten erlauben,
sonst scheitert die Nachtschicht daran. Zusätzlich zu den vorhandenen `Bash(git push … tests/*)`-Zeilen:

```
"Bash(git push -u origin fix/*)", "Bash(git push -u origin archiv/*)",
"Bash(git push origin fix/*)",    "Bash(git push origin archiv/*)",
"Bash(git push * origin fix/*)",  "Bash(git push * origin archiv/*)"
```

**Morgens (und wann immer du willst):** `/stand` – es zeigt nur Entscheidungen und Ausprobier-Aufträge. Das Issue
„Nachtschicht-Protokoll“ (Label `nachtschicht`) ist das Logbuch: Jeder Lauf schreibt dort eine Zeile, wenn sich etwas
ändert (Abbruch, Blockade, Kontingent erschöpft).

**Was Menschen tun müssen, damit es weiterläuft** (alles andere erledigen die Agenten):

| Protokoll / Issue sagt | Zu tun |
| --- | --- |
| Frage im Issue „Fragen an das Kernteam“ | Antwort als Kommentar (A/B oder eigener Satz); der Agent hält sie im PR bzw. in der Spec fest und entfernt die Labels `blocked`, `fix-1`, `fix-2` |
| Prototyp oder Spike zum Ausprobieren | Vorschau-Link im PR öffnen, Klick-Anleitung folgen, Go/No-Go sagen |
| `adr/`-PR wartet | in `/stand` mit Ja oder Nein antworten; ein Ja mergt sofort |
| PR mit Label `wartet-auf-mensch` | `[mensch]`-Abnahme an der laufenden Software machen, Go sagen |
| Nichts zu tun | nächsten Change freigeben (Eintrag in `openspec/queue.yaml` über einen `adr/`-PR, Spec auf `main`) |

Die Phase in `queue.yaml` muss nicht mehr umgestellt werden: Liegen die Abnahmetests auf `main`, ist der
Change in der Umsetzung; sind alle Tasks abgehakt oder ist der `change/<id>`-PR gemergt, ist er fertig und wird
archiviert. Ein Entwurfs-PR heißt „noch in Arbeit“: Der nächste Lauf macht dort weiter, statt zu reparieren.
`phase` bleibt als Untergrenze nutzbar.

**Kontingent:** Ein Lauf verbraucht das Abo-Kontingent wie eine Sitzung. Läuft es leer, bricht die Runde ab
(protokolliert), es entstehen keine Zusatzkosten, solange „usage credits“ aus bleiben. Durch Sichern nach
jeder Task geht dabei keine Arbeit verloren.

**Bekannte Grenzen (nach den ersten Läufen prüfen):**
- Merges durch den Auto-Merge lösen nur dann die CI auf `main` aus, wenn GitHub sie dem Auto-Merge zuordnet; sieht man
  nach dem ersten Merge keinen Lauf auf `main`, die Claude-GitHub-App bzw. ein Token mit Workflow-Rechten ergänzen.
- Die Desktop-Builds der Vorschau (`desktop-build`) und die Browser-Vorschau sind neu und noch ohne Probelauf.

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
