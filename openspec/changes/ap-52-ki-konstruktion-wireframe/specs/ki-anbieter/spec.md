## ADDED Requirements

### Requirement: Anbieter-Schnittstelle in der Brücke
Die lokale Brücke des Prototyps SHALL eine Anbieter-Schnittstelle nach design.md Abschnitt 1 bieten
(`GET /ki/anbieter`, `POST /ki/schritt`, `POST /ki/anbieter`, nur auf `127.0.0.1`) mit genau zwei Anbietern:
`regel` (Satzerkennung, ohne Netz) und `openai-kompatibel`. Nach dem Start MUST `regel` aktiv sein; ein echter
Anbieter MUST nur durch Wahl des Menschen aktiv werden (ADR-037). Der Chat MUST den aktiven Anbieter und sein Ziel
anzeigen.

#### Scenario: [auto] Ohne Einrichtung nur die Satzerkennung
- **WHEN** die Vorschau ohne `CEE_KI_URL` startet und der Abnahmetest `pruefen -- ki anbieter --json` aufruft
- **THEN** ist `aktiv` = `regel`, `openai-kompatibel` hat `verfuegbar` = false, und der Chat-Kopf zeigt den Text
  „bleibt auf diesem Rechner“

#### Scenario: [auto] Mit Einrichtung erst nach Wahl aktiv
- **WHEN** die Vorschau mit `CEE_KI_URL` auf das Testmodell (`127.0.0.1`) und `CEE_KI_MODELL` startet
- **THEN** ist `aktiv` weiterhin `regel` und das Testmodell hat 0 Anfragen erhalten; erst nach dem Befehl
  `ki.anbieter-waehlen` mit `openai-kompatibel` ist er aktiv

### Requirement: Echter Anbieter OpenAI-kompatibel
Der Anbieter `openai-kompatibel` SHALL Anfragen im Format `chat/completions` mit `tools` (aus der Werkzeugliste),
`tool_choice: "auto"` und `temperature: 0` senden, Werkzeugaufrufe aus `tool_calls` lesen und die Schleife aus
design.md Abschnitt 1 bis höchstens 20 Aufrufe oder zum Zeitlimit führen. Bei Zeitüberschreitung oder Fehler des
Anbieters MUST der Graph unverändert bleiben und der Chat eine verständliche Antwort zeigen.

#### Scenario: [auto] Schleife mit Fehler und Korrektur gegen das Testmodell
- **WHEN** das Testmodell auf den Satz aus W3 zuerst einen Aufruf `referenz_punkt` mit `x: "100"` (ohne Einheit)
  und nach der Fehlermeldung die richtigen Aufrufe für W3 liefert
- **THEN** enthält jede Anfrage an das Testmodell genau die 8 Werkzeuge aus der Werkzeugliste, `temperature` = 0
  und eine Systemnachricht ≤ 8 000 Zeichen; die zweite Anfrage enthält das Fehlerergebnis mit Code `unit`; die Karte
  besteht nach Übernehmen die Prüfer von W3

#### Scenario: [auto] Zeitlimit
- **WHEN** das Testmodell nicht antwortet und `CEE_KI_ZEITLIMIT_S` = 3 gesetzt ist
- **THEN** zeigt der Chat nach höchstens 5 s eine Antwort „keine Antwort vom Modell“, es entsteht keine Karte, und
  `graph_hash` ist gleich wie vor dem Senden

### Requirement: Keine Daten ohne ausdrückliche Wahl
Die Brücke SHALL Verbindungen nur zu `CEE_KI_URL` aufbauen, zu Hosts außer `127.0.0.1`, `::1` und `localhost` nur
mit `CEE_KI_EXTERN=ja` (ADR-037). Der Schlüssel MUST NOT in den Browser, in Prüfausgaben oder Protokolle gelangen.
Der Browser MUST nur seinen eigenen Ursprung ansprechen; es gibt keine Telemetrie.

#### Scenario: [auto] Externes Ziel ohne Wahl
- **WHEN** die Vorschau mit `CEE_KI_URL=http://192.0.2.1/v1` und ohne `CEE_KI_EXTERN` startet und der Abnahmetest
  versucht, `openai-kompatibel` zu wählen und einen Satz zu senden
- **THEN** meldet `ki anbieter` für ihn `verfuegbar` = false mit Befund `extern_nicht_gewaehlt`, `ki_anfragen` ist
  leer, und der Satz wird von `regel` beantwortet

#### Scenario: [auto] Schlüssel bleibt in der Brücke
- **WHEN** mit `CEE_KI_SCHLUESSEL=test-geheim-123` gegen das Testmodell ein Satz gesendet wird
- **THEN** erhält das Testmodell den Kopf `Authorization: Bearer test-geheim-123`, und die Zeichenfolge
  `test-geheim-123` kommt in 0 Browser-Anfragen, 0 Konsolenmeldungen, im Schnappschuss und in der Ausgabe der
  Prüfbefehle nicht vor; alle Browser-Anfragen (`anfragen`) gehen an `127.0.0.1`
