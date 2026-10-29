## ADDED Requirements

### Requirement: Prüfsatz Wireframe-Aufgaben
Es SHALL einen festen Prüfsatz mit den fünf Aufgaben W1 bis W5 aus design.md Abschnitt 5 geben (Datei
`tests/golden/ap-52-ki-konstruktion-wireframe/wireframe-aufgaben.json`). Bewertet MUST nur durch Prüfer am Graphen
nach Übernehmen und am Worker-Ergebnis werden, nie durch Text oder Selbstauskunft des Anbieters (ADR-053). Jede
Aufgabe MUST zusätzlich prüfen, dass keine Befunde entstehen und alle übrigen Elemente unverändert bleiben.

#### Scenario: [auto] Satzerkennung besteht den Prüfsatz reproduzierbar
- **WHEN** der Abnahmetest `pruefen -- ki pruefsatz --datei <wireframe-aufgaben.json> --anbieter regel --json`
  dreimal aufruft und die Prüfer aus design.md Abschnitt 5 selbst am Schnappschuss nachrechnet
- **THEN** ist `bestanden` = 5 von `gesamt` = 5 in allen drei Läufen, das eigene Nachrechnen des Tests stimmt in
  5 von 5 Aufgaben mit `bestanden` überein, und die drei Ausgaben sind bytegleich

#### Scenario: [auto] Prüfer erkennt falsche Lösungen
- **WHEN** das Testmodell für W3 ein Rechteck 100 × 50 mm liefert und für W4 einen Punkt mit absoluter Lage statt
  `ref` = `P2.point`, und `ki pruefsatz --anbieter openai-kompatibel` läuft
- **THEN** sind W3 und W4 `bestanden` = false mit mindestens einem Eintrag in `gruende`, auch wenn der Schlusstext
  des Testmodells „erledigt, alles korrekt“ lautet

### Requirement: Messen beliebiger Anbieter
Der Prüfbefehl SHALL jeden verfügbaren Anbieter mit demselben Prüfsatz messen können
(`--anbieter <id> [--wiederholungen n]`) und je Aufgabe `bestanden`, `versuche` und `gruende` melden. Für echte
Modelle ist das Ergebnis ein Messwert, kein Abnahmekriterium.

#### Scenario: [auto] Wiederholungen
- **WHEN** `ki pruefsatz --anbieter openai-kompatibel --wiederholungen 2` gegen ein Testmodell läuft, das jede
  Aufgabe richtig löst
- **THEN** meldet das Ergebnis für jede der 5 Aufgaben `versuche` = 2 und `bestanden` = true, `anbieter` =
  `openai-kompatibel` und den Modellnamen aus `CEE_KI_MODELL`
