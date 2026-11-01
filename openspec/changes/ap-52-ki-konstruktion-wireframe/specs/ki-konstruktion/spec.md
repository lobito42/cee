## ADDED Requirements

### Requirement: Änderungssatz mit Vorschau
Ein Satz im Chat SHALL über den aktiven Anbieter und die Werkzeuge zu einem Änderungssatz werden, der zuerst nur
im Entwurf wirkt und als Entscheidungskarte mit Geister-Vorschau erscheint (design.md Abschnitt 3, ADR-021,
ADR-061). Bis zum Übernehmen MUST der Graph unverändert bleiben. **Übernehmen** MUST dieselben Befehle als einen
Rückgängig-Schritt ausführen; **Verwerfen** MUST nichts ändern (ADR-051).

#### Scenario: [auto] Vorschau, Verwerfen, Übernehmen, Rückgängig
- **WHEN** im Zustand `drahtmodell-leer` per `ki ablauf` der Satz aus W3 gesendet wird, dann die Karte verworfen,
  der Satz erneut gesendet, die Karte übernommen und einmal Rückgängig ausgelöst wird
- **THEN** ist `graph_hash` nach dem ersten Senden und nach dem Verwerfen gleich wie davor, `geister` enthält dabei
  9 Einträge (5 Punkte, 4 Strecken) an den Lagen aus dem Worker-Ergebnis (± 1e-3 mm), die Karte hat genau eine
  Hauptaktion; nach Übernehmen enthält der Graph 5 neue `point` und 4 neue `segment` und `geister` ist leer; nach
  einem Rückgängig ist `graph_hash` wieder gleich wie am Anfang; `konsolenfehler` ist leer

#### Scenario: [auto] Kein Änderungssatz ohne Aufruf
- **WHEN** der Satz „Mach mir einen Kaffee“ und der Satz „Verwirf die Strecke S9“ (S9 gibt es nicht) im Zustand
  `drahtmodell-beispiel` gesendet werden
- **THEN** entsteht in beiden Fällen keine Karte, `graph_hash` bleibt gleich, die erste Antwort enthält mindestens
  3 Beispielsätze aus dem Prüfsatz, die zweite nennt „S9“

### Requirement: Satzerkennung ohne Modell
Der Anbieter `regel` SHALL die Satzmuster aus design.md Abschnitt 4 deterministisch in Werkzeugaufrufe übersetzen,
mit der dort festgelegten Deutung von Rechteck und „darüber“. Gleicher Satz auf gleichem Graphen MUST eine
bytegleiche Folge von Aufrufen ergeben. Ohne Brücke MUST die bisherige Simulation aus `src/ki.ts` unverändert
bleiben.

#### Scenario: [auto] Festgelegte Deutung Rechteck
- **WHEN** im Zustand `drahtmodell-leer` der Satz aus W3 mit `regel` gesendet und übernommen wird
- **THEN** liegen die Ecken bei (0, 0, 0), (100, 0, 0), (100, 60, 0), (0, 60, 0) mm, der fünfte Punkt hat
  `ref` = erste Ecke und liegt bei (50, 30, 40) mm (je ± 1e-6 mm); wird danach die erste Ecke per
  `element.wert-setzen` auf x = 10 mm gesetzt, liegt der fünfte Punkt bei (60, 30, 40) mm

#### Scenario: [auto] Budget
- **WHEN** der Satz aus W3 mit `regel` fünfmal warm gesendet und jeweils übernommen wird
- **THEN** ist der Median von `ki_bereit_ms` ≤ 2 000 ms und der Median von `bereit_ms` nach Übernehmen ≤ 500 ms

### Requirement: Klickweg bleibt
Die neuen Parameter der Befehle SHALL für den Menschen optional sein; ohne Parameter MUST der Klickweg aus ap-50
unverändert wirken.

#### Scenario: [auto] Ablauf aus ap-50 unverändert
- **WHEN** der Ablauf aus dem Scenario „Ablauf Koordinatensystem, Punkte, Linien“ von ap-50 per
  `drahtmodell ablauf` läuft
- **THEN** entsteht derselbe Graph wie dort beschrieben (1 `frame` mit 7 Kindern, 2 `point`, je 1 `segment`,
  `line`, `ray`) mit denselben Lagen (± 1e-3 mm)

### Requirement: Ausprobieren
Der Mensch SHALL den Weg Satz → Vorschau → Übernehmen oder Verwerfen im Prototyp nach der Klick-Anleitung in
design.md Abschnitt 9 ausprobieren können.

#### Scenario: [mensch] Satz in den Chat, Vorschau, Übernehmen und Verwerfen
- **WHEN** der Mensch die Schritte 1 bis 5 der Klick-Anleitung ausführt (Schritt 6 nur, wenn er ein lokales
  Modell angeschlossen hat)
- **THEN** sagt er Ja zu: „Ich sehe vor dem Übernehmen, was entsteht; Übernehmen und Verwerfen tun, was ich
  erwarte; ich würde lieber so konstruieren als Punkt für Punkt zu klicken“
