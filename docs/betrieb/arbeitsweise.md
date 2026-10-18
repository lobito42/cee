# Arbeitsweise – auf einer Seite

## Das Einzige, was du dir merken musst

Morgens und abends im Repo-Ordner:

```bash
claude
/stand
```

Claude sagt dir in ein paar Zeilen, was letzte Nacht passiert ist, was heute Nacht passiert und was du tun
musst – meistens 0 bis 2 Dinge. Du antwortest mit Ja oder Nein, Claude erledigt den Rest. Fragen wie „warum?“
oder „was heißt das?“ sind ausdrücklich erwünscht.

## Drei Faustregeln

1. **Fertige Arbeit am selben Tag mergen.** Die Nachtschicht macht immer nur an einer Sache weiter; liegt ein
   fertiger PR herum, wartet sie. `/stand` fragt dich danach.
2. **Tagsüber denken, nachts bauen.** Was gebaut wird, bestimmen die Specs und Abnahmetests. Die entstehen
   tagsüber mit dir (`/stand` schlägt vor, wann ein neuer fällig ist). Nachts wird nur umgesetzt.
3. **Was du von Hand reparierst, soll nicht wiederkommen.** Sag Claude danach: „Sorg dafür, dass das nicht
   wieder passiert.“ – daraus wird eine Regel, ein Test oder eine Änderung an der Nachtschicht.

## Wenn etwas komisch ist

Einfach fragen: „Was ist da los?“ – oder die Nachtschicht anhalten: „Schalte die Nachtschicht aus.“ Kaputt
geht dabei nichts; die nächste Nacht macht dort weiter, wo die letzte aufgehört hat.

## Zum Nachschlagen (musst du nicht lesen)

- Was die Nachtschicht genau tut: `docs/betrieb/routine-nachtschicht.md`
- Stand und offene Punkte: `docs/betrieb/uebergabe.md`
- Erfahrungen aus den Läufen: `docs/betrieb/erfahrungen.md`
