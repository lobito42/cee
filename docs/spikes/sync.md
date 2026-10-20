# Spike Sync (ap-03)

Prototyp: `spikes/sync/` (kein Produktcode, baut auf `spikes/datenmodell/` aus ap-01 auf). Maschinenlesbare
Messwerte: `docs/spikes/sync.json`, erzeugt mit `bash spikes/sync/bench.sh --json`.

## Fragestellung

ap-01 hat gezeigt, dass der Rust-Kern auf automerge 0.12 schnell genug ist und nativ, als Rustler-NIF und als
WASM denselben Inhalts-Hash liefert. Offen war, ob das **über das Netz** trägt (ADR-029, ADR-030, ADR-031,
ADR-033), bevor ap-07a den produktiven Dokumentprozess baut:

1. Kommt eine Änderung über Phoenix Channels bei einem zweiten Client in **< 200 ms** an (Konzept N-08, „gleiche
   Region“), bei einem Dokument mit 10.000 Elementen?
2. Konvergieren **gleichzeitige Änderungen** desselben Parameters bei beiden Clients und dem Server?
3. Lässt sich **offline weiterarbeiten** und danach **ohne Datenverlust zusammenführen** – ein Client offline
   und beide offline, je 500 Änderungen –, und erscheinen alle semantischen Konflikte als Befund, statt still
   aufgelöst zu werden (ADR-033)? Dazu gehört „Entfernen gegen Ändern“ (Entscheidung 4 des Kernteams).
4. Hält **ein Prozess je Dokument** Fehler und ungültige Nachrichten vom Rest fern, ohne dass Fehler im Kern die
   BEAM erreichen (ADR-029, ADR-030)?
5. Bleiben **Modellinhalte aus den Server-Protokollen** (ADR-056)?

Schwellwerte laut `design.md`: Latenz p95 je Richtung < 200 ms bei 30 ms Umlaufzeit je Strecke Client–Server;
100 % der 400 Live-Änderungen kommen an; 50 gleichzeitige Änderungen konvergieren zu 100 % mit p95 < 200 ms;
offline und beide offline je 0 verlorene Änderungen, 20 von 20 Konflikten als Befund und gleicher Inhalts-Hash bei
A, B und Server.

## Vorgehen

**Aufbau.** `spikes/sync/` ist ein eigener Cargo-Workspace und ein eigenes Mix-Projekt:

- `core/` (`sync_core`): die Sync-Funktionen einmal für beide Bindungen – Automerge-Sync-Protokoll
  (`generate_sync_message`/`receive_sync_message`), Operationen `set_param`, `set_input`, `remove_element`,
  Inhalts-Hash, Projekt-JSON, Befunde und der Generator für die Offline-Szenarien. Alle Datenmodell-Logik
  (Elementform, Hash-Definition, `conflicts::detect`, `synth`) kommt aus ap-01; dort wurden nur `Store::empty`
  und `Store::doc_mut` ergänzt (die ap-01-Abnahmetests bleiben grün).
- `native/sync_nif/`: Rustler-NIF. Dokument und Sync-Zustand je Verbindung sind Ressourcen; Erzeugen, Sync,
  Hash, Projekt und Befunde laufen als Dirty-CPU-NIF. Fehler kommen als `{:error, grund}`, Panics werden mit
  `catch_unwind` abgefangen und ebenfalls als Fehler gemeldet.
- `wasm/crate/`: wasm-bindgen-Bindung, gebaut für Node (`pkg-node`) und Browser (`pkg-web`).
- `server/`: Phoenix 1.8 auf Bandit, nur Endpoint, Socket und Channel `doc:<name>`. Je Dokument ein
  `GenServer` unter `DynamicSupervisor`, gefunden über `Registry`, der das Dokument als NIF-Ressource hält und je
  Verbindung einen Sync-Zustand. Der Server ist Teilnehmer wie jeder Client: Er wendet eine Nachricht an und
  erzeugt danach für jede Verbindung die nächste. Sync-Nachrichten gehen als Base64 in JSON; der Server schickt
  seine Köpfe mit, damit Clients erkennen, wann alle denselben Stand haben. Beim ersten Beitritt entsteht das
  Dokument aus `synth::project(10_000)`; nichts wird gespeichert.
- `client/`: headless Clients in Node (Phoenix-JS-Client, WASM-Kern) mit den Szenarien `live`, `concurrent`,
  `offline` (auch `--both`) und `poison`, dazu die Demo-Seite unter `GET /`.

**Netz.** Beide Clients laufen in einem Node-Prozess mit je eigener Verbindung und eigener Dokumentkopie und
messen mit derselben Uhr (`performance.now()`). Jede Nachricht wird beim Senden und beim Empfangen um 15 ms
verzögert, also 30 ms Umlaufzeit je Strecke Client–Server (Entscheidung 2); eine Änderung A → B enthält damit
mindestens 30 ms Netzzeit. Reines Loopback (`--delay-ms 0`) ist nur Beobachtung.

**Szenarien.**

- *live*: A und B treten einem Dokument mit 10.000 Elementen bei; erst 200 Änderungen A → B, dann 200 B → A, im
  Abstand von 20 ms, jede an einem eigenen Element. Latenz = lokales Anwenden beim Sender bis der Wert beim
  Empfänger lesbar ist.
- *concurrent*: 50 Runden; A und B setzen im selben Ereignis-Takt denselben Parameter verschieden. Zeit bis A, B
  und Server dieselben Köpfe haben (gleiche Köpfe heißen gleicher Inhalt); danach, außerhalb der Zeitmessung,
  Inhalts-Hash bei A (WASM), B (WASM) und Server (NIF) verglichen.
- *offline*: B trennt die Verbindung; A macht online 500 Änderungen, B offline 500; B verbindet sich mit neuem
  Sync-Zustand wieder. `--both`: beide offline, dann beide wieder online. Der Generator (`core/src/plan.rs`, auf
  `synth::project`, `synth::editable_ids` und `synth::Rng`) legt fest: eindeutige Werte (A 100.000 + k,
  B 200.000 + k), genau 10 doppelt gesetzte Schlüssel, 5 entfernte Elemente, auf die die andere Seite neu
  verweist, und 5 entfernte Elemente, deren Parameter die andere Seite ändert (je zwei Änderungen). Bei `--both`
  sind die Rollen verteilt (Verweise 3 : 2, Entfernen gegen Ändern 2 : 3). Datenverlust und Befunde rechnet der
  Client nach derselben Definition wie der Abnahmetest nach; der Test rechnet zusätzlich selbst aus `--dump`.
- *poison*: gültiges Base64, aber keine Sync-Nachricht; der Client gibt die Antwort des Servers unter `reply`
  aus.

**Entfernen gegen Ändern.** Automerge lässt Änderungen in einem anderswo entfernten Element aus dem sichtbaren
Stand verschwinden. Der Server holt sie aus der **Historie** (`core/src/findings.rs`): Alle Changes werden
dekodiert (`Change::decode`), die Objekt-IDs von `elements`, jedem Element und dessen `params`/`inputs` werden
aus den `make`-Operationen zugeordnet. Für jedes jetzt fehlende Element gilt jede `put`-Operation in dessen
Feldern als Befund, wenn ihr Change kein Vorgänger der Entfernung ist, also gleichzeitig zu ihr lief. Das ist
unabhängig davon, in welcher Reihenfolge die Zweige beim Server ankommen (Rust-Test für beide Reihenfolgen).
Der Befund `{"kind": "edit_on_removed", "id", "edits": [{"field", "name", "value"}, …]}` enthält jede Änderung
mit ihrem Wert, auch mehrere am selben Element. Ob das Element bleibt oder zurückkommt, entscheidet der Mensch.

**Hash-Berechnung.** Der Inhalts-Hash ist der aus ap-01 (SHA-256 über die kanonische Form). `Store::to_project`
schlägt jedes Element einzeln nach; `sync_core::project` liest stattdessen das ganze Dokument in einem Durchgang
über `hydrate` und erzeugt bitgleiches JSON (Rust-Test gegen ap-01 nach Änderungen, Merge und Entfernen).

**Messrechner:** AMD EPYC 7763 (4 Kerne, 16 GiB), Linux 6.17 (GitHub-Runner). **Versionen:** rustc 1.97.0,
automerge 0.12.0, rustler 0.39.0, wasm-bindgen 0.2.129, Elixir 1.18.4 / OTP 27, Phoenix 1.8.15, Bandit 1.13.1,
Node 22.22.0, phoenix (npm) 1.8.15.

## Messwerte

Alle Kennzahlen aus `docs/spikes/sync.json` (ein Lauf von `bench.sh --json`, 30 ms Umlaufzeit je Strecke):

| Kennzahl | Wert | Schwelle | Ergebnis |
| --- | --- | --- | --- |
| `live_a_to_b_p95_ms` | 33,9 ms | < 200 ms | bestanden |
| `live_b_to_a_p95_ms` | 34,3 ms | < 200 ms | bestanden |
| `live_delivered_pct` | 100 % (400 von 400) | 100 % | bestanden |
| `concurrent_converge_p95_ms` | 46,1 ms | < 200 ms | bestanden |
| `concurrent_converged_pct` | 100 % (50 von 50) | 100 % | bestanden |
| `offline_lost_edits` | 0 | 0 | bestanden |
| `offline_conflicts_reported_pct` | 100 % (20 von 20) | 100 % | bestanden |
| `offline_hash_equal` | 1 | 1 | bestanden |
| `both_offline_lost_edits` | 0 | 0 | bestanden |
| `both_offline_conflicts_reported_pct` | 100 % (20 von 20) | 100 % | bestanden |
| `both_offline_hash_equal` | 1 | 1 | bestanden |

Beobachtungen ohne Schwellwert (Entscheidung 3):

| Beobachtung | Wert |
| --- | --- |
| `live_p50_ms` | 32,8 ms |
| `live_p95_loopback_ms` (ohne künstliche Verzögerung) | 1,8 ms |
| `initial_sync_10k_ms` (neuer Client erhält das ganze Dokument) | 222 ms |
| `reconnect_converge_ms` (B wieder online bis gleicher Stand) | 511 ms |
| `reconnect_bytes_kb` (übertragen beim Abgleich) | 526 KiB |

Weitere Werte (`details` in der JSON-Datei und Server-Protokoll desselben Rechners):

- Beide offline: Wiederverbinden bis gleicher Stand 805 ms, 1.065 KiB übertragen.
- Die Latenz ist fast nur Netzzeit: p50 32,8 ms bei mindestens 30 ms künstlicher Verzögerung, ohne Verzögerung
  p95 1,8 ms. Konvergenz bei gleichzeitigen Änderungen braucht rund einen Umlauf mehr.
- Inhalts-Hash über 10.000 Elemente: WASM p50 793 ms; im NIF antwortet `GET /docs/<name>/hash` nach rund
  0,6 s. Nativ (`cargo test --release -p sync_core timing_10k -- --ignored`): `hydrate` 386 ms, Projektion
  446 ms gegenüber 629 ms mit `Store::to_project`, JSON-Text 22 ms, SHA-256 19 ms.
- Volle Befundprüfung (`GET /docs/<name>/findings`, mit Historie für `edit_on_removed`) nach den Offline-Läufen:
  rund 1,5 s; sie blockiert so lange den Dokumentprozess.
- Erzeugen des Dokuments mit 10.000 Elementen beim ersten Beitritt: rund 3,4 s im NIF (Aufbau Element für
  Element, wie in ap-01 bekannt).
- Server-Protokoll eines vollständigen Laufs: nur Start, HTTP-Pfade mit Dokumentnamen und Dauer, Erzeugen der
  Dokumente und abgewiesene Nachrichten ohne Inhalt; kein Parameterwert (AK-8).

**Einordnung Loopback.** Die künstliche Verzögerung bildet eine feste Umlaufzeit ab, aber keine Schwankung, keinen
Paketverlust und keine echte Bandbreite. Server und beide Clients liefen auf einem Rechner; zwei Clients teilen
sich eine Node-Ereignisschleife (eher zu pessimistisch). Der Abstand zur Schwelle ist groß (rund 34 ms gegen
200 ms), echte Netze innerhalb einer Region liegen meist unter 30 ms Umlaufzeit. Die menschliche Abnahme mit zwei
Browsern ergänzt den Eindruck; ein Lauf über ein echtes Netz steht noch aus.

## Empfehlung

Go – das Sync-Konzept trägt: Automerge-Sync-Protokoll über Phoenix Channels, Kern als NIF im Server und als WASM
im Client, ein Prozess je Dokument. Alle elf Kennzahlen sind bestanden, mit großem Abstand bei der Latenz.

Folgen für **ap-07a** (produktiver Dokumentprozess):

- Den Aufbau übernehmen: ein `GenServer` je Dokument mit dem Dokument als NIF-Ressource und einem Sync-Zustand je
  Verbindung; Sync-, Hash-, Projekt- und Befund-NIFs als Dirty-CPU; Panics im NIF abfangen; jede Client-Nachricht
  mit strukturierter Fehlerantwort; Channel-Parameter nie protokollieren (`log_join: false`,
  `log_handle_in: false`, Socket `log: false`).
- **Volle Durchgänge über das Dokument vermeiden.** Hash, Projekt-JSON und Befundprüfung kosten bei 10.000
  Elementen 0,4 bis 1,5 s und blockieren den Dokumentprozess. Im Latenzpfad Köpfe vergleichen, den Inhalts-Hash
  nur auf Abruf oder inkrementell; Befunde inkrementell aus den Changes eines Abgleichs bestimmen (die
  Historien-Auswertung für `edit_on_removed` lässt sich auf neue Changes beschränken) oder in einen eigenen
  Prozess auf einem Snapshot verlagern.
- Dokumente nicht Element für Element aufbauen (3,4 s für 10.000), sondern aus gespeicherten Bytes laden (ap-01:
  108 ms).
- `edit_on_removed` als Befund übernehmen: Entfernen gegen Ändern ist sonst ein stiller Verlust; die Werte stehen
  vollständig in der Historie.

Folgen für **ap-17** (Desktop, lokaler Speicher):

- Sync-Zustand je Gegenstelle mit speichern (`State::encode`). Im Spike startet jede Wiederverbindung mit neuem
  Zustand; dann sendet automerge bei vielen fehlenden Changes (mehr als ein Drittel) das ganze Dokument: 526 KiB
  für 500 Offline-Änderungen, 1.065 KiB wenn beide offline waren. Mit gespeichertem Zustand sollte nur der
  Unterschied fließen – nachmessen.
- Wiederverbinden bis gleicher Stand dauert 0,5 bis 0,8 s für 500 bis 1.000 Änderungen; das ist vertretbar, die
  Oberfläche sollte den Abgleich aber anzeigen.

Risiken: Ein echtes Netz mit Schwankung und Verlust ist nicht gemessen; die 20 Nutzer je Dokument (ap-07b) auch
nicht. Für ADR-030 und ADR-033 ergibt sich kein Widerspruch; beide können bestätigt werden, ADR-033 um den Befund
„Entfernen gegen Ändern“ ergänzt.
