# ADR-064: Mensch entscheidet, Agenten integrieren

- Status: akzeptiert
- Datum: 2026-10-21
- Entscheider: Kernteam
- Ändert: Arbeitsweise aus `docs/betrieb/` (Nachtschicht, `/stand`), Rolle des Kernteams in `AGENTS.md`

## Kontext

Die ersten Wochen mit Nachtschicht und `/stand` haben gezeigt: Die Arbeit stockt fast immer an
Git-Handgriffen, die ein Mensch erledigen soll – PRs mergen, Abnahmetests „reviewen“, `main` reparieren,
Merge-Konflikte lösen, archivieren. Diese Handgriffe kann das Kernteam nicht besser als die Agenten; Code-Review
von Rust und Elixir macht es ohnehin nicht selbst (REVIEW.md, PR-Vorlage „In einfachen Worten“). Ein falscher
Abnahmetest (ap-05b, `test_aenderung_macht_nachfolger_veraltet`) hat einen fertigen Change einen halben Tag
blockiert, weil nur ein Mensch den Vertrag ändern durfte.

Was nur der Mensch kann: sagen, was er will, Unklarheiten in Specs entscheiden, Spikes und Prototypen
ausprobieren und Go/No-Go geben, Kernteam-Dateien inhaltlich freigeben. Dafür hat er tagsüber Zeit; nachts nicht.
Das Abo-Kontingent soll möglichst vollständig in Umsetzung fließen, nicht in Warten.

## Entscheidung

1. **Der Mensch entscheidet, die Agenten integrieren.** Der Mensch wird nur gefragt, wenn es um Inhalt geht:
   (a) unklare oder fehlende Anforderungen, (b) Ausprobieren von Spikes und Prototypen mit einer konkret
   benannten Entscheidung, (c) inhaltliche Änderungen an Kernteam-Dateien (ADRs, Warteschlange, Regeln, Specs),
   (d) Kriterien mit `[mensch]`. Git, Review, Tests, CI, Merge-Konflikte und Archivieren sind Agentenarbeit.
2. **Automatisch mergen.** Agenten-PRs auf `tests/<id>` und `change/<id>` werden ohne Menschen gemergt, wenn
   alle Pflicht-Prüfungen grün sind, ein unabhängiger Prüf-Agent (`reviewer`, frischer Kontext, nicht der Autor)
   zugestimmt hat und keine offene `[mensch]`-Abnahme besteht. Bei Abnahmetests prüft der Reviewer jedes
   Scenario gegen die Spec. Offene `[mensch]`-Kriterien halten den PR an, bis der Mensch Go gibt.
3. **Einspruch gegen den Vertrag statt Blockade.** Hält der Umsetzer einen Abnahmetest für falsch, öffnet er
   einen eigenen PR auf `tests/<id>` mit Begründung aus Spec oder Scenario; der Reviewer prüft ausdrücklich, dass
   die Erwartung nicht schwächer wird. Erst danach geht die Umsetzung weiter. Tests auf `change/<id>` zu ändern
   bleibt verboten. Widerspricht die Spec sich selbst, ist das Frage (a) an den Menschen.
4. **Hausmeister zuerst.** Jeder Lauf erledigt vor neuer Arbeit die mechanischen Aufgaben: `main` rot
   reparieren (eigener Branch `fix/<grund>`, gleicher Auto-Merge), Konflikte durch Merge von `main` lösen, rote
   Agenten-PRs reparieren, gemergte Changes archivieren. Das Archivieren (`openspec archive`, Verschieben nach
   `openspec/changes/archive/` und Abgleich von `openspec/specs/`) darf ein Agent auf `archiv/<id>`, weil es
   nur freigegebene Inhalte überträgt.
5. **Kernteam-Dateien: Agent schreibt, Mensch sagt Ja.** Der Agent formuliert die Änderung, erklärt sie in
   wenigen Sätzen und committet auf einem Branch `adr/<thema>`; nach dem Ja des Menschen im Gespräch merged der
   Agent ohne weiteren Handgriff. `adr/`-PRs werden nie automatisch gemergt. Der Vertragsschutz
   (`tools/guard.py`) bleibt für alle anderen Branches unverändert.
6. **Fragen erreichen den Menschen gebündelt und verständlich.** Alles, was die Arbeit blockiert, kommt sofort
   als Push; alles andere im `/stand`. Jede Frage nennt die Entscheidung, 2–3 Antworten mit Empfehlung und
   was danach passiert. Prototypen kommen als Link zur Browser-Vorschau, als Desktop-Build nur, wenn es um
   Tauri, Eingabegeräte oder Leistung auf dem Gerät geht – immer mit Klick-Anleitung und der eigentlichen Frage.
   Die Antwort hält der Agent im PR oder in der Spec fest.
7. **Rund um die Uhr umsetzen, tagsüber klären.** Tagsüber (etwa 07–21 Uhr Ortszeit) sind Fragen, Prototypen und
   Specs mit dem Menschen dran; umgesetzt wird auch dann, wenn nichts auf ihn wartet. Nachts wird nur umgesetzt.
   Läufe starten über den Tag verteilt mehrfach, damit das Abo-Kontingent jedes Zeitfenster nutzt; ist nichts zu
   tun oder das Kontingent erschöpft, endet ein Lauf sofort ohne Verbrauch. Mehrere Changes dürfen gleichzeitig
   offen sein, solange sie sich nicht gegenseitig bedingen.

## Alternativen

- Mensch merged weiterhin selbst: bisheriger Engpass; der Mensch prüft dabei nichts, was die CI nicht prüft.
- Abnahmetests nur nach Kurzfassung durch den Menschen mergen: verworfen; die Prüfung gegen die Spec macht der
  Reviewer gründlicher, der Mensch bleibt über die Spec Herr des Vertrags.
- Nur nachts arbeiten: lässt den größten Teil des Kontingents ungenutzt.

## Konsequenzen

- `tools/next_step.py`: Hausmeister-Schritte (`repair-main`, `merge-main`, `archive`) vor `tests`/`build`;
  mehrere offene Changes; „wartet auf Review“ blockiert nicht mehr.
- Neuer Workflow für Review und Auto-Merge; Branch-Schutz mit Pflicht-Prüfungen und erlaubtem Auto-Merge
  (einmalige Einstellung durch das Kernteam). Der Vertragsschutz erlaubt `archiv/<id>` und, nach Ja, `adr/<thema>`.
- Vorschau-Workflow für Prototypen (Browser-Vorschau), Desktop-Builds als Artefakte der CI.
- `/stand` zeigt nur noch Entscheidungen und Ausprobier-Aufträge, keine Git-Handgriffe.
- `docs/betrieb/arbeitsweise.md`, `routine-nachtschicht.md` und `AGENTS.md` beschreiben die neue Aufteilung.
- Risiko: Fehler gelangen ohne menschlichen Blick nach `main`. Gegenmittel sind die Abnahmetests als Vertrag,
  der unabhängige Reviewer, der Vertragsschutz und `[mensch]`-Kriterien dort, wo Augenschein zählt.
