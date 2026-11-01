## ADDED Requirements

### Requirement: Werkzeuge aus dem Befehlsregister
Die Werkzeugliste für die KI SHALL ausschließlich aus Befehlen des einen Befehlsregisters (`src/befehle.json`)
mit `"ki": true` erzeugt werden, im Format von MCP `tools/list` (`name`, `description`, `inputSchema`) nach
design.md Abschnitt 2 (ADR-045, ADR-037, Regel MCP). Es MUST NOT ein Werkzeug ohne Befehl des Menschen oder
aus der Familie Freigabe geben. Jedes `inputSchema` MUST flach sein, Größen als String mit Einheit.

#### Scenario: [auto] Genau die acht Werkzeuge
- **WHEN** der Abnahmetest `pruefen -- ki werkzeuge --json` aufruft
- **THEN** enthält die Liste genau 8 Werkzeuge: `referenz_koordinatensystem`, `referenz_punkt`,
  `referenz_punkt_relativ`, `referenz_gerade`, `referenz_halbgerade`, `referenz_strecke`, `element_ausblenden`,
  `element_verwerfen`; zu jedem gibt es in `src/befehle.json` genau einen Befehl mit `ki: true` und passender ID;
  kein anderer Befehl hat `ki: true`

#### Scenario: [auto] Schema und Beschreibung für kleine Modelle
- **WHEN** der Abnahmetest jedes `inputSchema` mit einem JSON-Schema-Validator (2020-12) lädt und die
  Beschreibungen liest
- **THEN** ist jedes Schema gültig, hat 0 Eigenschaften vom Typ `object` oder `array`, jede Längen- und
  Winkeleigenschaft ist `type: string`; `referenz_punkt_relativ` verlangt genau `ref`, die drei Linien genau `a`
  und `b`, `element_*` genau `element`; jede `description` enthält genau einen Beispielaufruf, der gegen das
  eigene Schema gültig ist

### Requirement: Werkzeugergebnis und Fehler
Ein Werkzeugaufruf SHALL im Entwurf dieselbe Wirkung haben wie der Befehl beim Menschen und ein kompaktes
Ergebnis liefern (≤ 600 Zeichen). Fehlerhafte Aufrufe MUST ein strukturiertes Ergebnis `{ok: false, code,
message, element_id, hint}` liefern, den Entwurf nicht ändern und die Schleife nicht abbrechen (ADR-050).
Größen MUST über den Wert-Parser des Prototyps mit Einheit gelesen werden (ADR-057).

#### Scenario: [auto] Erfolg und strukturierte Fehler
- **WHEN** über das Testmodell nacheinander aufgerufen wird: `referenz_punkt` mit `x: "1,2 m"`;
  `referenz_punkt` mit `x: "40"`; `referenz_strecke` mit `a` = `b` = demselben Punkt; `referenz_gerade` mit
  `a: "XYZ.point"`; Werkzeug `element_loeschen`
- **THEN** liefert der erste `ok: true` mit Lage x = 1 200 mm (± 1e-6 mm), die übrigen `ok: false` mit den Codes
  `unit`, `degenerate`, `input_missing`, `unknown_tool` und nicht leerem `hint`; jedes Ergebnis hat ≤ 600 Zeichen;
  der Entwurf enthält danach genau 1 neues Element

### Requirement: Urheber KI
Übernommene Aufrufe SHALL im Verlauf als Urheber `ki` mit Anbieter und auslösendem Menschen stehen (ADR-055 im
Prototyp); die Werkzeugliste MUST NOT Rechte über die Befehle des Menschen hinaus geben.

#### Scenario: [auto] Verlaufseintrag
- **WHEN** im Zustand `drahtmodell-leer` der Satz aus W2 gesendet und übernommen wird
- **THEN** hat der neue Verlaufseintrag `urheber` = `ki`, `anbieter` = `regel` und `ausgeloest_von` = `mensch`,
  und der Befehl ist `referenz.punkt`
