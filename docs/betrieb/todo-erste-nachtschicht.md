# To-do bis zur ersten Nachtschicht (Nacht auf Montag)

Die Nachtschicht startet werktags um 01:07 Uhr. Der erste reguläre Lauf ist **Montag 01:07 Uhr**, also muss
alles bis **Sonntagabend** erledigt sein. Fehlt etwas, passiert einfach nichts – kaputt geht dabei nichts.

📱 = geht auch am Handy im Browser · 💻 = braucht deinen Rechner

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

- GitHub-Namen von `@person-b` für CODEOWNERS bestätigen
- Lizenzfrage PlaneGCS (vor ap-12), Grundtypliste in `format/`
- Mit der Firma: Sachnummernschema, UX-Prototyp (ap-41), offene Punkte zu G2 (ADR-059, Nachtrag)
- Weitere Changes freigeben (M0: ap-39, ap-03, ap-04, ap-41) – erst wenn ap-00 bis ap-02 laufen
