# To-do bis zur ersten Nachtschicht (heute Nacht, Sonntag auf Montag)

Die Nachtschicht startet werktags um 01:07 Uhr. Der erste reguläre Lauf ist **Montag 01:07 Uhr**, also muss
alles bis **Sonntagabend** erledigt sein. Fehlt etwas, passiert einfach nichts – kaputt geht dabei nichts.

📱 = geht auch am Handy im Browser · 💻 = braucht deinen Rechner

## Schnellweg am Rechner (Terminal, im Repo-Ordner)

```bash
claude setup-token                          # Token erzeugen (Browser-Anmeldung), Zeichenkette kopieren
gh secret set CLAUDE_CODE_OAUTH_TOKEN       # Token einfügen (wird nicht angezeigt)
gh variable set NACHTSCHICHT --body an      # Nachtschicht einschalten (aus: gh variable delete NACHTSCHICHT)
git push origin --delete probe/ci-pfade     # alten Probe-Branch löschen
python3 tools/next_step.py                  # zeigt, was die Nachtschicht täte – erwartet: build, ap-00-setup
gh workflow run nachtschicht.yml            # optional: Probelauf sofort (verbraucht Kontingent)
gh run watch                                # Probelauf verfolgen
```

Danach bleiben nur die App-Prüfung und der Branch-Schutz im Browser (unten). Für die weitere Arbeit in der CLI:
`docs/betrieb/uebergabe.md`.

## Pflicht

- [ ] 📱 **Claude-GitHub-App prüfen:** github.com → Profilbild → Settings → Applications → Installed GitHub Apps.
      Steht dort „Claude“ mit Zugriff auf `cee` (oder „All repositories“)? Dann erledigt. Sonst über
      https://github.com/apps/claude installieren.
- [ ] 💻 **Token erzeugen:** im Terminal `claude setup-token` ausführen, im Browser anmelden, die Zeichenkette
      (`sk-ant-oat…`) kopieren. Nirgends sonst einfügen.
- [ ] 📱/💻 **Secret anlegen:** github.com/lobito42/cee → Settings → Secrets and variables → Actions →
      Reiter **Secrets** → New repository secret. Name `CLAUDE_CODE_OAUTH_TOKEN`, Wert: das Token.
- [ ] 📱 **Branch-Schutz für `main`:** Settings → Branches (bzw. Rules → Rulesets) → Regel für `main`:
  - Pull Request vor dem Merge verlangen
  - Pflicht-Checks: „Vertrag und Konfiguration“, „Fällige Abnahmetests“, „Desktop-App (Tauri, …)“ (alle drei
    Systeme), „DCO“
  - **Dich als Admin ausnehmen** („Allow bypass“ / Bypass-Liste) – sonst können auch Kernteam-Änderungen aus
    unseren Sitzungen nicht mehr direkt auf `main`
  - Abnahmetest-PRs (`tests/<id>`) bleiben mergebar: Ihre neuen Tests sind absichtlich rot, die CI prüft dort
    nur, dass sie sich sammeln lassen
- [ ] 📱 **Einschalten:** Settings → Secrets and variables → Actions → Reiter **Variables** → New repository
      variable. Name `NACHTSCHICHT`, Wert `an`. (Ausschalten: Variable löschen.)

## Empfohlen

- [ ] 📱 **Probelauf am Sonntagabend:** Actions → Nachtschicht → Run workflow. Die Nachtschicht beginnt dann
      sofort mit ap-00 (Einrichtung) – das ist schon echte Arbeit und verbraucht Abo-Kontingent. Vorteil:
      Fehler in der Einrichtung siehst du noch am Sonntag statt Montagfrüh. Die Nacht auf Montag macht dann
      einfach weiter.
- [ ] 📱 **Benachrichtigungen:** Nach dem ersten Lauf gibt es das Issue „Nachtschicht-Protokoll“ – dort oben
      rechts **Subscribe**. Oder das ganze Repository beobachten (Watch → Custom → Issues, Pull requests).
- [ ] 📱 **Aufräumen:** Branch `probe/ci-pfade` löschen (Code → Branches → Mülleimer). Der zugehörige PR #1 ist
      schon geschlossen.

## Montagmorgen

- [ ] Issue „Nachtschicht-Protokoll“ lesen und nach der Tabelle in `docs/betrieb/routine-nachtschicht.md`
      („Was Menschen tun müssen“) handeln. Typisch nach der ersten Nacht: ein Entwurfs-PR für ap-00, der in
      den nächsten Nächten weiterwächst.
- [ ] Bricht der Lauf mit „bot actor“ oder einem Anmeldefehler ab: Token und Secret-Namen prüfen, sonst in
      der nächsten Sitzung gemeinsam ansehen.

## Nicht nötig für Montag (bleibt offen)

Vollständige Liste mit Zeitpunkt: `docs/betrieb/uebergabe.md`, Abschnitt „Offen – braucht Menschen“.
