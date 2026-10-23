# Prozess: weniger Reibung für den Menschen

Stand 2026-10-23, Vorschlag von Claude nach einem Tag im Alltag. Nichts davon ist beschlossen. Ziel: Der Mensch
entscheidet nur über **Inhalte** (Anforderungen, Tests, Fragen, Spezifikationen, Ausprobieren) und muss weder Git
noch Abkürzungen noch Nummern verstehen.

## Was heute schiefging

1. **Die automatische Prüfung fiel bei Agenten-Arbeit aus.** Der Prüf-Roboter lehnte den Auslöser ab, weil er kein
   Mensch war. Dadurch hingen fertige, saubere Pakete tagelang. Behoben, aber niemand hatte es bemerkt.
2. **Alte Tests hielten die neue Spezifikation rot.** Wird ein Vorhaben neu zugeschnitten, prüfen die alten Tests
   weiter den alten Zuschnitt. Der Weg raus war ein Umweg über drei Schritte (alte Tests weg, Spezifikation
   übernehmen, neue Tests), den niemand vorgesehen hatte.
3. **Tests mit „zum Ausprobieren“-Punkten bleiben liegen.** Solche Punkte sind erst nach dem Bau fällig, trotzdem
   hält schon das Test-Paket an und wartet auf den Menschen.
4. **Wir fragten den Menschen nach Dingen, die er nicht beurteilen kann.** Zum Beispiel: Referenzdaten „liefert das
   Kernteam“ – er kann sie nicht erstellen, nur blind bestätigen. Ein Agent baute stattdessen Zahlen nach, damit sie
   zu einer Vorgabe passten. Das ist erfundene Referenz, nicht Ableitung.
5. **Die Prüfung dauert 25 bis 30 Minuten**, weil sie jedes Mal sehr viel mitprüft. Jeder Schritt wartet darauf.
6. **Der Sicherheitsmodus der Entwicklungsumgebung blockierte Zusammenführungen**, obwohl Prüfung und Freigabe
   da waren. Der Mensch musste eingreifen, obwohl er dazu nichts beitragen kann.

## Vorschläge

1. **Wächter für den Betrieb:** Jeden Morgen und bei jedem Stillstand prüft ein Agent, ob Prüf-Roboter,
   Zusammenführungen und Nachtschicht überhaupt laufen, und behebt es selbst. Der Mensch hört nur davon, wenn es
   eine inhaltliche Frage gibt.
2. **Neuzuschnitt als eigener Vorgang:** Wird ein Vorhaben neu geschnitten, ersetzt ein Agent in **einem** Schritt
   Spezifikation und alte Tests und nennt in einfachen Worten, was entfällt. Der Mensch bestätigt nur den neuen
   Zuschnitt inhaltlich.
3. **„Zum Ausprobieren“ hält nur die Fertigmeldung auf, nicht die Tests.** Test-Pakete werden zusammengeführt, die
   Punkte für den Menschen erscheinen erst, wenn es etwas zum Ausprobieren gibt (mit Link zur Vorschau).
4. **Referenzdaten leiten Agenten selbst ab – nur aus echten Quellen.** Fehlt die Quelle, wird die Datei kleiner,
   nicht erfunden. Eine Lücke, die nur der Mensch inhaltlich füllen kann, wird als Frage in Alltagssprache gestellt:
   Worum geht es, was ist die Empfehlung, was passiert bei Ja oder Nein.
5. **Regeln für Fragen an den Menschen:** keine Nummern, keine Abkürzungen, kein Git. Jede Frage hat höchstens zwei
   Optionen und eine klare Empfehlung. Was Agenten nach bestem Wissen entscheiden können, entscheiden sie und
   sagen es hinterher in einem Satz.
6. **Schnellere Prüfung:** Auf einem Vorhaben-Zweig laufen zuerst nur die Tests dieses Vorhabens, das Gesamtpaket
   läuft einmal vor der Zusammenführung. Ziel unter 10 Minuten bis zur ersten Rückmeldung.
7. **Zusammenführen ohne Sicherheitsabfrage:** In den Einstellungen der Entwicklungsumgebung eine Regel anlegen, die
   das Zusammenführen von Paketen mit Freigabe und grüner Prüfung erlaubt (Kernteam-Dateien bleiben ausgenommen).

## Reihenfolge, die ich vorschlage

Zuerst 7 und 1 (nehmen sofort Reibung weg), dann 3 und 2, dann 4 und 5, zuletzt 6.

## Entscheidung für den Menschen

Eine inhaltliche Frage: Soll ich das so einführen? Jede Zeile oben ist ohne die anderen sinnvoll; „ja, alles“,
„nur die ersten vier“ oder „erst später“ genügt.
