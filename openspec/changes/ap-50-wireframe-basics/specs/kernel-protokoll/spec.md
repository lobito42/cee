## ADDED Requirements

### Requirement: Kernel-Schnittstelle cee-kernel/0
Graph und Geometriekern SHALL nur über versionierte Nachrichten nach `format/kernel/` sprechen (ADR-032): einen
Auftrag mit Elementen in Elementform (ADR-028) in der Reihenfolge des Rust-Kerns und ein Ergebnis mit `kernel`
(Name, Version), je Element `id`, `state`, `hash`, `outputs` und `befunde`. Auftrag und Ergebnis MUST das Feld
`protocol` mit dem Wert `cee-kernel/0` tragen, und jede Zahl im Ergebnis MUST eine Größe mit Einheit sein
(ADR-057). Geometrie MUST NOT im Graphen gespeichert werden.

#### Scenario: [auto] Nachrichten gültig nach Schema
- **WHEN** der Abnahmetest für `format/examples/drahtmodell.json` und für jeden Testfall aus AK-3 bis AK-7 den
  Auftrag mit `python -m cee_worker auftrag --projekt <datei>` baut und mit `python -m cee_worker rechnen`
  berechnet
- **THEN** ist jeder Auftrag gültig nach `format/kernel/auftrag.schema.json` und jedes Ergebnis gültig nach
  `format/kernel/ergebnis.schema.json` (Ja/Nein je Fall, alle Ja), beide tragen `protocol` = `cee-kernel/0`, und
  jede Zahl in `outputs` ist ein Objekt mit `value` und `unit` (0 nackte Zahlen)

#### Scenario: [auto] Keine Geometrie im Graphen
- **WHEN** das Beispielprojekt berechnet und danach mit `cee-sdk` exportiert wird
- **THEN** ist der Inhalts-Hash des Dokuments vor und nach der Berechnung gleich, und kein Element enthält einen
  Schlüssel aus `outputs` des Ergebnisses als Wert (`position`, `direction`, `length` …)

### Requirement: Befund statt Absturz
Ein Fehler eines Elements SHALL als Befund mit Code, Element-ID und Hinweis gemeldet werden; der Worker MUST alle
davon unabhängigen Elemente weiter berechnen und MUST Folgeelemente mit dem Befund `input_failed` bzw.
`input_discarded` als `fehlerhaft` melden (ADR-050). Verworfene Elemente MUST NOT in `results` erscheinen.

#### Scenario: [auto] Fehlerfälle
- **WHEN** im Beispielprojekt nacheinander je ein Fall eingebaut wird: Strecke durch zwei Punkte im Abstand
  0,5 · 10⁻⁶ mm, Eingang auf eine unbekannte ID, Eingang `a` auf einen Ausgang vom Typ `plane`, Punkt P1 mit
  `meta.verworfen = true`, Parameter `x` = 5 kg, Elementtyp `unbekannt`
- **THEN** meldet das Ergebnis je Fall den Code `degenerate`, `input_missing`, `input_type`, `input_discarded`,
  `unit` bzw. `unknown_type` am betroffenen Element mit nicht leerem `hinweis`, im Fall „verworfen“ fehlt P1 in
  `results`, und in jedem Fall haben alle Elemente, die nicht vom Fehler abhängen, `state` = `aktuell` mit denselben
  `outputs` wie ohne Fehler (6 von 6 Fällen)

#### Scenario: [auto] Folgebefund
- **WHEN** im Beispielprojekt der Eingang `frame` von P1 auf eine unbekannte ID zeigt (S1, G1 und P3 hängen von
  P1 ab)
- **THEN** ist P1 `fehlerhaft` mit Befund `input_missing`, S1, G1 und P3 sind `fehlerhaft` mit Befund
  `input_failed`, der P1 nennt, und K1, seine sieben Kinder, P2 und H1 bleiben `aktuell` (Ja/Nein je Element)

### Requirement: Inhalts-Hash und Determinismus
Der Worker SHALL je Element einen Inhalts-Hash nach design.md Abschnitt 3 liefern (Typ, Parameter in kanonischer
Einheit, Hashes der Eingänge, Kernel-Version; ohne ID und `meta`). Gleicher Auftrag MUST bytegleiches Ergebnis
ergeben.

#### Scenario: [auto] Bytegleich
- **WHEN** der Auftrag des Beispielprojekts 10-mal in getrennten Prozessen berechnet wird
- **THEN** sind alle 10 Ergebnisse bytegleich

#### Scenario: [auto] Hash folgt dem Rezept
- **WHEN** (a) P1 umbenannt, (b) `x` von P1 von 10 mm auf 11 mm geändert und (c) `x` von P1 als `1,0 cm` statt
  `10 mm` eingegeben wird
- **THEN** ändert sich in (a) kein Hash; in (b) ändern sich genau die Hashes von P1 und allen von P1 abhängigen
  Elementen (P3, S1, G1), alle anderen bleiben gleich; in (c) sind alle Hashes gleich wie mit `10 mm`

### Requirement: Worker als eigener Prozess
Der Worker SHALL als eigener Betriebssystem-Prozess laufen, einmalig (`rechnen`) oder dauerhaft über stdio mit
einer Zeile je Auftrag und Ergebnis (`--stdio`). Ein Absturz MUST nur den Worker-Prozess treffen; ungültige
Eingaben MUST NOT den dauerhaften Worker beenden.

#### Scenario: [auto] Dauerbetrieb über stdio
- **WHEN** an einen `--stdio`-Worker nacheinander das Beispiel, eine Zeile `kein json` und wieder das Beispiel
  geschickt werden
- **THEN** kommen genau 3 Ergebniszeilen, die zweite mit Befund `protocol`, die erste und dritte bytegleich, und
  der Prozess läuft danach weiter

#### Scenario: [auto] Absturz trifft nur den Worker
- **WHEN** mit `CEE_WORKER_TEST=1` ein Auftrag mit `meta.test_absturz = true` an einem Element an `rechnen`
  geschickt wird, und derselbe Auftrag ohne die Variable
- **THEN** endet der erste Prozess mit Exit-Code 70 ohne Ausgabe auf stdout, und der zweite liefert ein
  vollständiges Ergebnis mit `state` = `aktuell` für alle Elemente

#### Scenario: [auto] Leistung warm
- **WHEN** ein Projekt mit 1 Koordinatensystem, 1 000 Punkten und 500 Strecken 5-mal an einen warmen
  `--stdio`-Worker geschickt wird
- **THEN** ist der Median vom Senden bis zum Empfang der Ergebniszeile ≤ 1,0 s

### Requirement: Auftrag aus dem Graphen über den Rust-Kern
`cee_worker.auftrag` SHALL den Auftrag über `cee-sdk` bauen: Projekt mit `format/types/drahtmodell.json`
importieren, Befunde aus `validate()` übernehmen und die Reihenfolge aus `order()` verwenden (ADR-029).
Umrechnungen MUST nur über `cee_sdk.Quantity` erfolgen; der Worker MUST NOT eigene Umrechnungsfaktoren enthalten.

#### Scenario: [auto] Reihenfolge und Zyklus
- **WHEN** das Beispielprojekt in umgekehrter Elementreihenfolge gespeichert und mit `auftrag` gebaut wird, und
  danach ein Projekt mit zwei Punkten, die sich gegenseitig als `ref` nennen
- **THEN** ist die Reihenfolge im ersten Auftrag gleich `Doc.order()` aus `cee-sdk` und jedes Element steht nach
  allen Elementen, auf die seine Eingänge zeigen; im zweiten Fall sind beide Punkte `fehlerhaft` mit Befund
  `input_missing`, dessen Hinweis den Zyklus nennt

#### Scenario: [auto] Einheiten wie der Kern
- **WHEN** Punkte mit `x` = „1,2 m“, „1200“ (ohne Einheit), „47,244094488 [in_i]“ und Koordinatensysteme mit
  `rz` = „30 deg“ und „0,5235987755982988 rad“ berechnet werden
- **THEN** stimmt jede Lage auf 10⁻⁶ mm mit dem Wert überein, den `cee_sdk.Quantity.parse(...).to("mm")` bzw.
  `.to("rad")` liefert, „1200“ ohne Einheit erzeugt die Warnung des Kerns für eine Zahl ohne Einheit, und im
  Quelltext unter `worker/src/cee_worker/` steht keine der Zahlen 25.4, 0.0174532 oder 57.2957 als Literal

#### Scenario: [auto] Budget Auftrag
- **WHEN** `auftrag.bauen` für das Projekt aus „Leistung warm“ 5-mal im selben Prozess aufgerufen wird
- **THEN** ist der Median ≤ 0,5 s
