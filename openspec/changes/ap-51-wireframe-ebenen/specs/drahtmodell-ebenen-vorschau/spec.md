## ADDED Requirements

### Requirement: Befehle für Klick und Argumente
Der Prototyp SHALL die sieben Befehle aus design.md Abschnitt 4 im einen Befehlsregister führen (ADR-045), ohne
`folgt: true` und mit dem Feld `argumente`. Jeder Befehl MUST per Klick und per `{befehl, args}` ohne Klick
ausführbar sein; beide Wege MUST denselben Graphen ergeben. Anlegende Befehle MUST Punkt bzw. Ebene mit
ausdrücklicher `herkunft` anlegen; `referenz.abstand` MUST NOT den Graphen ändern.

#### Scenario: [auto] Register
- **WHEN** der Abnahmetest `pruefen -- drahtmodell befehle --json` aufruft
- **THEN** stehen alle 7 neuen Befehle mit `folgt` = false, Ort Menü (Dropdown „Referenz“) und Suche im Ergebnis,
  und jeder hat ein nicht leeres Feld `argumente` (7 von 7); die Grenzen für Dropdown und Kontextmenü aus
  ap-41b/ap-41c sind eingehalten (Ja/Nein, gleiche Prüfung wie dort)

#### Scenario: [auto] Klick-Weg gleich Argument-Weg
- **WHEN** jeder der 6 anlegenden Befehle im Zustand `drahtmodell-beispiel` einmal per Klick (Auswahl bzw.
  Klicks auf die Bezüge, Werte in den Eigenschaften) und einmal per `{befehl, args}` mit denselben Bezügen und
  Werten über `ablauf` ausgeführt wird
- **THEN** ist `graph_hash` nach beiden Wegen gleich und verschieden vom Ausgangszustand, das neue Element hat
  Typ `point` oder `plane` mit der Herkunft aus design.md Abschnitt 4 (6 von 6), jede Lage in `szene` stimmt auf
  10⁻³ mm mit `ergebnis` überein, und `konsolenfehler` ist leer

#### Scenario: [auto] Abstand ändert nichts
- **WHEN** `referenz.abstand` mit den Argumenten `a` = ein Punkt, `b` = die XY-Ebene von K1 ausgeführt wird
- **THEN** ist `graph_hash` unverändert, die Rückmeldezeile enthält den Abstand mit Einheit „mm“, und der Zahlenwert
  stimmt auf 10⁻³ mm mit dem Feld `messungen` aus `ergebnis` überein

#### Scenario: [mensch] Ausprobieren
- **WHEN** der Mensch die Klick-Anleitung aus design.md Abschnitt 6 im Browser durchgeht
- **THEN** antwortet er im PR mit Go, No-Go oder einem Änderungswunsch; nur Go schließt den Change ab
