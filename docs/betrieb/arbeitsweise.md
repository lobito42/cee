# Arbeitsweise – auf einer Seite

Grundsatz (ADR-064): **Der Mensch entscheidet, die Agenten integrieren.** Du sagst, was du willst, entscheidest
Unklarheiten und probierst Spikes und Prototypen aus. Git, Review, Merge, Konflikte, CI und Archivieren machen die
Agenten.

## Das Einzige, was du dir merken musst

Wenn du Zeit hast – gern morgens und abends – im Repo-Ordner:

```bash
claude
/stand
```

Claude zeigt nur, was *du* entscheiden oder ausprobieren sollst – meistens 0 bis 3 Dinge, jeweils mit Antworten
(und einer Empfehlung) oder einer Klick-Anleitung. Du antwortest mit „A“, „Ja“ oder „No-Go“, Claude erledigt den
Rest. Fragen wie „warum?“ oder „was heißt das?“ sind ausdrücklich erwünscht.

Blockiert eine Frage die Arbeit, bekommst du eine Push-Benachrichtigung von GitHub (Erwähnung im Issue „Fragen an
das Kernteam“). Antworten reicht dort als Kommentar.

## Drei Faustregeln

1. **Tagsüber klären, rund um die Uhr bauen.** Etwa 07–21 Uhr sind Fragen, Prototypen und Specs mit dir dran;
   umgesetzt wird immer, auch wenn nichts auf dich wartet. Nachts wird nur umgesetzt.
2. **Prototypen kommen als Link.** Spikes und Prototypen öffnest du im Browser (Vorschau je PR); einen Desktop-Build
   gibt es nur, wenn es um Tauri, Eingabegeräte oder Leistung auf dem Gerät geht. Immer mit Klick-Anleitung und der
   Frage, die du beantworten sollst.
3. **Was du von Hand reparierst, soll nicht wiederkommen.** Sag Claude danach: „Sorg dafür, dass das nicht
   wieder passiert.“ – daraus wird eine Regel, ein Test oder eine Änderung an der Nachtschicht.

## Wenn etwas komisch ist

Einfach fragen: „Was ist da los?“ – oder die Nachtschicht anhalten: „Schalte die Nachtschicht aus.“ Kaputt
geht dabei nichts; der nächste Lauf macht dort weiter, wo der letzte aufgehört hat.

## Zum Nachschlagen (musst du nicht lesen)

- Was die Nachtschicht genau tut und die einmaligen GitHub-Einstellungen: `docs/betrieb/routine-nachtschicht.md`
- Entscheidung dahinter: `docs/adr/ADR-064-mensch-entscheidet-agenten-integrieren.md`
- Stand und offene Punkte: `docs/betrieb/uebergabe.md`
- Erfahrungen aus den Läufen: `docs/betrieb/erfahrungen.md`
