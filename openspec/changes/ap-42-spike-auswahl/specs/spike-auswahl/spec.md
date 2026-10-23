## ADDED Requirements

### Requirement: Regel als Element im Graphen
Der Prototyp SHALL jede Auswahl nach Regel (R1 bis R5 aus design.md: Art, Lage, Richtung, Gruppe, neu entstanden)
als Element in der Form aus ADR-028 speichern. Das Element MUST auf sein Ausgangselement über `<id>.<output>`
verweisen (ADR-058) und MUST NOT Topologie-Indizes oder die getroffene Geometrie enthalten (ADR-016, ADR-032).

#### Scenario: [auto] Elementform ohne Indizes und Geometrie
- **WHEN** der Abnahmetest für R1 bis R5 `bash spikes/auswahl/run.sh <fall> --element` aufruft
- **THEN** hat jedes der 5 Elemente genau die Felder `id`, `type`, `inputs`, `params`, `outputs`, `content` und
  `meta`, jeder Eintrag in `inputs` hat die Form `<id>.<output>` mit einer Element-ID des Halters, und kein Wert
  im Element ist eine Koordinate, ein Schwerpunkt oder eine Position in einer Liste von Flächen oder Kanten
  (Ja/Nein je Element, 5 von 5)

### Requirement: Gleiche Ziele nach Neuberechnung
Eine gespeicherte Regel SHALL nach einer Neuberechnung mit geänderten Parametern dieselben Kanten und Flächen
treffen wie die Sollziele aus `tests/golden/ap-42-spike-auswahl/faelle.json`, ohne dass die Regel geändert wird.
Das Ergebnis MUST unabhängig von der Reihenfolge sein, in der der Kernel Flächen und Kanten liefert.

#### Scenario: [auto] Parameteränderungen P1 bis P3
- **WHEN** die Regeln R1 bis R5 an P0 (Platte 80 × 50 × 8 mm) gespeichert und für P0 bis P3 (Dicke 8 → 10 mm,
  Länge 80 → 90 mm und beides) ausgewertet werden
- **THEN** treffen 20 von 20 Fällen alle Sollziele und keine weiteren (Art und Geometrietyp gleich, Schwerpunkt
  höchstens 10⁻³ mm, Richtung bzw. Normale höchstens 10⁻⁶ rad Abweichung)

#### Scenario: [auto] Reihenfolge des Kernels
- **WHEN** jeder der 20 Fälle mit `--shuffle` und den Seeds 1 bis 10 ausgewertet wird
- **THEN** ist die Menge der Ziele in 200 von 200 Läufen gleich der Menge ohne `--shuffle`

### Requirement: Befund statt Absturz
Findet eine Regel nach einer Änderung kein Ziel mehr oder mehrere gleichrangige Ziele, wo sie genau eines verlangt,
SHALL der Prototyp einen Befund mit Code und Element-ID der Regel liefern. Er MUST NOT abstürzen und MUST NOT ein
Ziel raten (ADR-016, ADR-050). Elemente, die nicht von der Regel abhängen, SHALL weiter berechnet werden.

#### Scenario: [auto] Kein Ziel
- **WHEN** der Fall K1 ausgewertet wird (Element Bohrung verworfen, R5 bleibt gespeichert)
- **THEN** endet `run.sh K1` mit Exit-Code 0, das Ergebnis enthält 0 Ziele und genau einen Befund `kein_ziel` mit
  der Element-ID von R5

#### Scenario: [auto] Mehrdeutig
- **WHEN** der Fall K2 aus dem Testkorpus ausgewertet wird
- **THEN** endet `run.sh K2` mit Exit-Code 0, das Ergebnis enthält 0 gewählte Ziele und einen Befund `mehrdeutig`
  mit der Element-ID der Regel und allen Kandidaten aus dem Testkorpus (Anzahl gleich, Ja/Nein)

#### Scenario: [auto] Unabhängige Elemente rechnen weiter
- **WHEN** der Fall K3 ausgewertet wird
- **THEN** hat das Element, das die Auswahl nutzt, den Zustand `fehlerhaft` oder `pausiert`, das unabhängige
  Element den Zustand `aktuell`, und die Kennzahl `abstuerze` in `bench.sh --json` ist 0

### Requirement: Auswahl bei 10.000 Elementen
Der Prototyp SHALL eine Regel über ein Projekt mit 10.000 Elementen aus dem ap-01-Generator auswerten und die Zeit
messen. Zusätzlich SHALL er die Zeit für R1 bis R5 am Halter und die Neuberechnung des Halters melden.

#### Scenario: [auto] Budget
- **WHEN** `bash spikes/auswahl/bench.sh --json` die Graph-Regel 100-mal nach 5 Aufwärmläufen auswertet
- **THEN** ist `graph_auswahl_p95_ms` kleiner als 100, und `halter_auswahl_p95_ms` und
  `halter_neuberechnung_p95_ms` sind als Zahl größer 0 vorhanden

### Requirement: Einordnung der Auswahlbefehle
Der Bericht SHALL jeden der 21 Auswahlbefehle aus design.md genau einer Klasse zuordnen: A Regel, B Liste oder
C nicht abbildbar, jeweils mit einem Satz Begründung.

#### Scenario: [auto] Alle Befehle eingeordnet
- **WHEN** der Abnahmetest `einordnung` aus `docs/spikes/auswahl.json` liest
- **THEN** sind 21 von 21 Befehlen aus design.md enthalten, jeder mit genau einer Klasse aus A, B, C und einer
  nicht leeren Begründung

#### Scenario: [mensch] Einordnung trägt
- **WHEN** das Kernteam die Tabelle der Einordnung im Bericht liest
- **THEN** hält es die Klasse jedes Befehls für zutreffend oder benennt die abweichenden Befehle (Ja/Nein)

### Requirement: Bericht und Messwerte
Der Spike SHALL einen Bericht `docs/spikes/auswahl.md` mit den Abschnitten `## Fragestellung`, `## Vorgehen`,
`## Messwerte` und `## Empfehlung` (erste Zeile Go oder No-Go) und die Kennzahlen in `docs/spikes/auswahl.json`
liefern. Die Kennzahlen MUST mit `bench.sh --json` nachmessbar sein.

#### Scenario: [auto] Nachmessbar
- **WHEN** der Abnahmetest `bash spikes/auswahl/bench.sh --json` ausführt und mit `docs/spikes/auswahl.json`
  vergleicht
- **THEN** sind `treffer_quote`, `permutation_stabil`, `abstuerze` und `einordnung` gleich, die Zeiten weichen
  höchstens Faktor 2 ab, und die erste Zeile unter `## Empfehlung` stimmt mit `empfehlung` überein und folgt der
  Regel aus design.md

#### Scenario: [mensch] Empfehlung nachvollziehbar
- **WHEN** das Kernteam Bericht und Empfehlung im PR liest
- **THEN** kann es danach entscheiden, ob ap-45 und ap-08b auf dieser Datenform der Auswahl aufbauen (Ja/Nein)
