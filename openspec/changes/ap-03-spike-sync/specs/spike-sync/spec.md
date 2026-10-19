## ADDED Requirements

### Requirement: Live-Abgleich zwischen zwei Clients
Der Prototyp SHALL eine Änderung, die ein Client am Dokument macht, über den Phoenix-Server an einen zweiten
verbundenen Client weitergeben, sodass sie dort in weniger als 200 ms lesbar ist. Beide Clients nutzen den
Rust-Kern als WASM mit je eigener Verbindung und eigener Dokumentkopie, der Server nutzt ihn als NIF.

#### Scenario: [auto] Änderungen von A kommen bei B an
- **WHEN** Client A an einem Dokument mit 10.000 Elementen 200 Parameteränderungen im Abstand von 20 ms macht
- **THEN** kommen 200 von 200 Änderungen bei Client B an und das 95. Perzentil der Latenz ist kleiner als 200 ms

#### Scenario: [auto] Änderungen von B kommen bei A an
- **WHEN** Client B an demselben Dokument 200 Parameteränderungen im Abstand von 20 ms macht
- **THEN** kommen 200 von 200 Änderungen bei Client A an und das 95. Perzentil der Latenz ist kleiner als 200 ms

#### Scenario: [mensch] Zwei echte Browser
- **WHEN** eine Person die Demo-Seite des Spikes in zwei verschiedenen Browsern auf demselben Rechner öffnet und
  in einem Fenster fünf Parameter nacheinander ändert
- **THEN** zeigt das andere Fenster alle fünf neuen Werte, und die dort angezeigte Latenz jeder Änderung ist
  kleiner als 200 ms (Ja/Nein)

### Requirement: Gleichzeitige Änderungen konvergieren
Der Prototyp SHALL bei gleichzeitigen Änderungen desselben Parameters durch zwei Clients dafür sorgen, dass
beide Clients und der Server danach denselben Inhalt haben.

#### Scenario: [auto] Gleicher Parameter, verschiedene Werte
- **WHEN** Client A und Client B in 50 Runden jeweils gleichzeitig denselben Parameter auf verschiedene Werte
  setzen
- **THEN** haben in 50 von 50 Runden A, B und Server denselben Inhalts-Hash, und das 95. Perzentil der Zeit
  bis dahin ist kleiner als 200 ms

### Requirement: Offline weiterarbeiten und ohne Datenverlust zusammenführen
Der Prototyp SHALL einem Client erlauben, ohne Verbindung lokal weiterzuarbeiten, und beim Wiederverbinden
seinen Stand mit dem inzwischen online geänderten Stand zusammenführen, ohne eine Änderung zu verlieren.
Semantische Konflikte SHALL als Befund erscheinen und MUST NOT still aufgelöst werden (ADR-033).

#### Scenario: [auto] 500 Änderungen online, 500 offline
- **WHEN** Client B die Verbindung trennt, Client A online 500 und Client B offline 500 Änderungen am Dokument
  mit 10.000 Elementen macht und B sich wieder verbindet
- **THEN** haben A, B und Server danach denselben Inhalts-Hash, und für jeden Schlüssel, den nur eine Seite
  gesetzt hat, steht im Endstand deren letzter Wert (0 verlorene Änderungen)

#### Scenario: [auto] Konflikte erscheinen als Befund
- **WHEN** im selben Ablauf 10 Schlüssel von beiden Seiten mit verschiedenen Werten gesetzt wurden und A 5
  Elemente entfernt hat, auf die B offline neu verweist
- **THEN** meldet der Server 10 von 10 Wertkonflikten mit beiden Werten und 5 von 5 gebrochenen Referenzen
  als Befund

#### Scenario: [mensch] Ein Browser offline
- **WHEN** eine Person in einem von zwei Browserfenstern der Demo-Seite „Offline“ wählt, in beiden Fenstern
  verschiedene Parameter und einen gemeinsamen Parameter ändert und dann wieder „Online“ wählt
- **THEN** zeigen beide Fenster dieselben Werte und den gemeinsamen Parameter als Konflikt (Ja/Nein)

### Requirement: Ein Prozess je Dokument mit Fehlerisolation
Der Server SHALL je geöffnetem Dokument genau einen überwachten Prozess führen, unabhängig von der Zahl der
Clients (ADR-030). Fehler bei einem Dokument oder ungültige Nachrichten MUST NOT andere Dokumente, andere
Clients oder den Server beeinträchtigen; Fehler im Rust-Kern MUST NOT die BEAM erreichen (ADR-029).

#### Scenario: [auto] Prozesse je Dokument
- **WHEN** drei Clients zwei verschiedenen Dokumenten beitreten (zwei Clients dem ersten, einer dem zweiten)
- **THEN** führt der Server genau zwei Dokumentprozesse mit verschiedenen Prozess-IDs

#### Scenario: [auto] Absturz eines Dokumentprozesses
- **WHEN** der Prozess des ersten Dokuments hart beendet wird
- **THEN** kommen beim zweiten Dokument danach 20 von 20 Live-Änderungen mit einem 95. Perzentil der Latenz
  unter 200 ms an, und dessen Prozess-ID ist unverändert

#### Scenario: [auto] Ungültige Sync-Nachricht
- **WHEN** ein Client eine ungültige Sync-Nachricht an ein Dokument sendet
- **THEN** antwortet der Server mit einem Fehler, die Prozess-ID des Dokuments ist unverändert und 20 von 20
  folgenden Live-Änderungen zwischen zwei anderen Clients kommen an

### Requirement: Keine Modellinhalte in Server-Protokollen
Der Server MUST NOT Modellinhalte (Parameterwerte, Elementinhalte) in sein Protokoll schreiben (ADR-056). Der
Prototyp speichert weder Dokumente noch Angaben zu Personen.

#### Scenario: [auto] Protokoll eines vollständigen Laufs
- **WHEN** alle Szenarien mit eindeutigen Parameterwerten laufen und das Server-Protokoll mitgeschrieben wird
- **THEN** kommt keiner der gesetzten Parameterwerte im Protokoll vor (0 Treffer)

### Requirement: Nachmessbare Messwerte und Bericht
Der Spike SHALL seine Messwerte in `docs/spikes/sync.json` und einen Bericht mit Empfehlung Go oder No-Go in
`docs/spikes/sync.md` ablegen; jeder gemeldete Wert MUST sich mit einem Befehl nachmessen lassen.

#### Scenario: [auto] Messwerte vollständig und stimmig
- **WHEN** `docs/spikes/sync.json` gelesen wird
- **THEN** enthält sie alle 8 Kennzahlen aus design.md mit Wert, Einheit, Schwellwert und `pass`, jedes
  `pass` passt zum Schwellwert, und die Empfehlung ist genau dann „Go“, wenn alle `pass` wahr sind

#### Scenario: [auto] Nachmessen
- **WHEN** der Test `bash spikes/sync/bench.sh --json` selbst ausführt
- **THEN** stimmen alle Zählwerte exakt mit `sync.json` überein und alle Zeitwerte weichen höchstens um den
  Faktor 3 ab

#### Scenario: [auto] Bericht vollständig
- **WHEN** `docs/spikes/sync.md` gelesen wird
- **THEN** enthält er die Abschnitte Fragestellung, Vorgehen, Messwerte und Empfehlung, und die Empfehlung
  beginnt mit „Go“ oder „No-Go“
