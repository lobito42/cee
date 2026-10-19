## Context

Siehe proposal.md – Why. Grundlage ist der ap-01-Prototyp `spikes/datenmodell/`: `Store` auf automerge 0.12 mit
`set_param`, `set_input`, `remove_element`, `save`/`load`, `merge`, `hash` (Inhalts-Hash über die kanonische
Form, unabhängig von der Historie), `conflicts::detect` (gleicher Eintrag mit verschiedenen Werten, gebrochene
Referenz) und dem Generator `synth::project(n)` mit `synth::Rng`. Die Empfehlung aus ap-01: automerge ≥ 0.12,
ein Dokument je Projekt, Dokument als Rustler-Ressource in genau einem Prozess je Dokument, Konfliktprüfung
inkrementell nur über die Merge-Änderungen.

Konzept: N-08 „Änderung bei allen Teilnehmern < 200 ms (gleiche Region)“; Ziel 3 „zwei Entwürfe mit je 500
Änderungen ohne Datenverlust zusammengeführt“. Arbeitspaket: „zwei Browser live, einer offline,
Zusammenführen – Änderung bei beiden < 200 ms; Merge ohne Datenverlust“.

## Goals / Non-Goals

**Goals:** belastbare, automatisch nachmessbare Werte für Latenz, Konvergenz und Zusammenführen über Phoenix
Channels; Empfehlung Go oder No-Go für das Sync-Konzept von ap-07a und ap-17.

**Non-Goals:** siehe proposal.md – Impact. Kein produktiver Code; der Prototyp dient als Beleg.

## Decisions

### Aufbau des Prototyps

```
spikes/sync/
  Cargo.toml          eigener Workspace: native/sync_nif, wasm/crate; beide hängen per Pfad an spikes/datenmodell
  native/sync_nif/    Rustler-NIF
  wasm/crate/         WASM-Bindung (wasm-bindgen, Ziele nodejs und web)
  server/             Mix-Projekt, Phoenix nur mit Endpoint, Socket und Channel (kein Ecto, kein LiveView)
  client/             Node-Paket: headless Clients, Szenarien, Bench; Demo-Seite für den Browser
  build.sh  serve.sh  bench.sh
```

- Fehlt in `spikes/datenmodell/` ein Zugriff, den der Sync braucht (z. B. veränderlicher Zugriff auf das
  Automerge-Dokument), wird er dort minimal ergänzt; die ap-01-Abnahmetests bleiben grün.
- **Übertragung:** Automerge-Sync-Protokoll (`generate_sync_message` / `receive_sync_message`) mit einem
  Sync-Zustand je Verbindung im Server und je Client. Nachrichten im Channel als Base64 in JSON. Der Server
  ist Teilnehmer wie jeder Client: Er empfängt, wendet an und erzeugt für jede andere Verbindung die nächste
  Sync-Nachricht.
- **Server:** je Dokumentname ein `GenServer` unter `DynamicSupervisor`, gefunden über `Registry`; er hält
  das Dokument als NIF-Ressource. Beim ersten Beitritt entsteht das Dokument aus `synth::project(10_000)`.
  Kein Speichern auf Platte. NIF-Funktionen geben Fehler als `{:error, grund}` zurück, Panics werden in Rust
  abgefangen; Laden, Hash und Konfliktprüfung laufen als Dirty-CPU-NIF.
- **Offline:** Ein Client gilt als offline, wenn seine Socket-Verbindung geschlossen ist. Er arbeitet lokal
  weiter; beim Wiederverbinden tritt er dem Channel neu bei, und das Sync-Protokoll gleicht ab.
- **Konfliktprüfung:** nicht im Latenzpfad. Der Server bietet die Befunde auf Abruf an (volle Prüfung mit
  `conflicts::detect` erlaubt, rund 1 s bei 10.000 Elementen laut ap-01). Eine inkrementelle Prüfung über die
  Merge-Änderungen ist erwünscht, aber kein Muss; wird sie gebaut, misst der Bericht beide.
- **Operationen:** `ops.json` aus ap-01 erweitert um `{"op": "set_input", "id", "name", "ref"}` und
  `{"op": "remove_element", "id"}`.

### Befehle

Alle Befehle aus dem Wurzelverzeichnis; `<port>` wählt der Aufrufer frei.

- `bash spikes/sync/build.sh` – baut NIF und WASM (nodejs und web), `npm ci` in `client/`, `mix deps.get`
  und `mix compile` in `server/`; installiert bei Bedarf `wasm32-unknown-unknown` und `wasm-bindgen-cli` in
  der Version aus `Cargo.lock` (wie ap-01)
- `bash spikes/sync/serve.sh <port>` – startet den Server im Vordergrund auf `127.0.0.1:<port>`; Protokoll auf
  stdout/stderr
- HTTP am Server (nur Spike, ohne Anmeldung, nur an `127.0.0.1` gebunden):
  - `GET /health` → `200` mit `ok`
  - `GET /docs` → `[{"doc": "<name>", "pid": "<pid>", "clients": <n>}, …]`, ein Eintrag je Dokumentprozess
  - `GET /docs/<name>/hash` → `{"hash": "<hex>"}`
  - `GET /docs/<name>/project` → Projekt-JSON (kanonisch wie `from-text` in ap-01)
  - `GET /docs/<name>/findings` → `[{"kind": "conflict" | "broken_reference" | …, …}, …]`
  - `POST /docs/<name>/kill` → beendet den Dokumentprozess hart (für den Isolationstest)
  - `GET /` → Demo-Seite: WASM-Kern (Ziel web), fünf Parameter eines Elements als Eingabefelder, Schalter
    „Offline“/„Online“, Liste der Befunde; jede empfangene Änderung zeigt ihre Latenz (Sender schickt seinen
    Zeitstempel in ms mit, der Server reicht ihn weiter; gilt nur für zwei Fenster auf demselben Rechner)
- `node spikes/sync/client/sync.mjs <szenario> --url ws://127.0.0.1:<port>/socket --doc <name> [--seed <n>]
  [--dump <verzeichnis>] [--delay-ms <n>] --json` mit den Szenarien; `--delay-ms` (Standard 15) verzögert jede
  Nachricht des Clients beim Senden und beim Empfangen um n ms, also 30 ms Umlaufzeit je Strecke
  Client–Server (Annahme „gleiche Region“, N-08); `--delay-ms 0` misst reines Loopback
  - `live` – A und B treten bei; je 200 Änderungen A→B und B→A im Abstand von 20 ms
  - `concurrent` – 50 Runden, in jeder setzen A und B im selben Ereignis-Takt denselben Parameter verschieden
  - `offline` – siehe unten; mit `--both` arbeiten beide Clients gleichzeitig offline
  - `poison` – sendet eine ungültige Sync-Nachricht und meldet die Antwort des Servers
  - Ausgabe: JSON mit den Messwerten des Szenarios; `--dump` schreibt `ops_a.json`, `ops_b.json`,
    `project_a.json`, `project_b.json` und `hash_a`/`hash_b` in das Verzeichnis
- `bash spikes/sync/bench.sh --json [--log <datei>]` – startet den Server auf einem freien Port, führt `live`,
  `concurrent` und `offline` aus, beendet den Server und gibt `sync.json` auf stdout aus; mit `--log` landet
  das Server-Protokoll in der Datei

### Szenario offline

1. A und B treten dem Dokument (10.000 Elemente) bei und gleichen ab.
2. B trennt die Verbindung.
3. A macht online 500 Änderungen, B offline 500 Änderungen. Der Generator (Startwert `--seed`) nutzt
   `synth::project` und `synth::Rng` aus ap-01 und legt fest:
   - jeder Wert ist eindeutig (A: 100.000 + k, B: 200.000 + k), damit jede Änderung im Ergebnis auffindbar ist;
   - genau 10 Schlüssel (Element, Feld, Name) setzen A und B beide mit verschiedenen Werten;
   - genau 5-mal entfernt A ein Element, auf das B danach offline per `set_input` neu verweist;
   - genau 5-mal entfernt A ein Element, dessen Parameter B danach offline ändert (Entfernen gegen Ändern).
4. B verbindet sich wieder. Gemessen wird die Zeit bis zum gleichen Inhalts-Hash bei A, B und Server.

**Variante `--both`:** Nach Schritt 1 trennen A und B die Verbindung, beide machen offline je 500 Änderungen
nach denselben Regeln (Rollen von „entfernt“ und „ändert“ je zur Hälfte verteilt, gesamt wieder 10 Wert-
konflikte, 5 gebrochene Referenzen, 5 Fälle Entfernen gegen Ändern), dann verbinden sich beide wieder.
Geprüft wird dasselbe wie oben.

**Entfernen gegen Ändern:** Automerge lässt die Offline-Änderungen in einem anderswo entfernten Element aus dem
sichtbaren Stand verschwinden. Das MUST NOT still geschehen: Der Server meldet jeden Fall als Befund
`{"kind": "edit_on_removed", "id", "edits": [{"name", "value"}, …]}` mit allen betroffenen Werten, die der
Abgleich aus dem sichtbaren Stand entfernt hat. Ob das Element entfernt bleibt oder wiederhergestellt wird,
entscheidet der Mensch (ADR-052 „Verwerfen statt Löschen“); der Spike muss die Werte nur auffindbar halten.
Woher der Server die Werte nimmt (Historie von Automerge, Patches beim Empfang oder Stand vor dem Abgleich),
entscheidet die Umsetzung; der Bericht beschreibt den Weg.

**Ohne Datenverlust** heißt: Für jeden Schlüssel, den nur eine Seite gesetzt hat, steht im Endstand ihr letzter
Wert; für jeden der 10 doppelt gesetzten Schlüssel liegen beide Werte vor (einer sichtbar, beide in den
Befunden); jedes der 5 Elemente ist entfernt und der Verweis von B als gebrochene Referenz gemeldet; jede
Änderung an einem der 5 anderswo entfernten Elemente steht mit ihrem Wert in einem Befund `edit_on_removed`;
nichts wird still aufgelöst (ADR-033). Diese Prüfung rechnet der Abnahmetest selbst aus `--dump` und
`GET /docs/<name>/project` bzw. `/findings` nach.

### Kennzahlen und Schwellwerte

Latenz einer Änderung = Zeit vom lokalen Anwenden beim Sender bis zu dem Moment, in dem der Wert beim
Empfänger lesbar ist; beide Clients laufen im selben Node-Prozess mit je eigener Verbindung und eigener
WASM-Dokumentkopie, gemessen mit derselben Uhr (`performance.now()`), Server über Loopback mit der künstlichen
Verzögerung von `--delay-ms 15` (30 ms Umlaufzeit je Strecke; eine Änderung A→B enthält also mindestens 30 ms
Netzzeit). Alle Szenarien in `bench.sh` und in den Abnahmetests laufen mit dieser Verzögerung.

| Kennzahl (Schlüssel in `sync.json`) | Messung | Go, wenn |
| --- | --- | --- |
| `live_a_to_b_p95_ms` | 200 Änderungen A→B, p95 der Latenz, Dokument mit 10.000 Elementen | < 200 ms |
| `live_b_to_a_p95_ms` | 200 Änderungen B→A, p95 der Latenz | < 200 ms |
| `live_delivered_pct` | Anteil der 400 Live-Änderungen, die beim anderen Client ankommen | 100 % |
| `concurrent_converge_p95_ms` | 50 gleichzeitige Änderungen desselben Parameters: Zeit bis A, B und Server denselben Hash haben, p95 | < 200 ms |
| `concurrent_converged_pct` | Anteil der 50 Runden mit gleichem Hash bei A, B und Server | 100 % |
| `offline_lost_edits` | verlorene Änderungen im Szenario offline (Definition oben) | 0 |
| `offline_conflicts_reported_pct` | Anteil der 20 erzeugten Konflikte (10 Werte, 5 Referenzen, 5 Entfernen gegen Ändern), die als Befund erscheinen | 100 % |
| `offline_hash_equal` | gleicher Inhalts-Hash bei A (WASM), B (WASM) und Server (NIF) nach dem Abgleich (1 = ja) | 1 |
| `both_offline_lost_edits` | verlorene Änderungen, Variante `--both` | 0 |
| `both_offline_conflicts_reported_pct` | Anteil der 20 Konflikte als Befund, Variante `--both` | 100 % |
| `both_offline_hash_equal` | gleicher Inhalts-Hash bei A, B und Server, Variante `--both` (1 = ja) | 1 |

Nur gemeldet (ohne Schwellwert, Entscheidung 3) unter `observations` als `{"value", "unit"}`:
`live_p50_ms`, `live_p95_loopback_ms` (wie `live_a_to_b_p95_ms`, aber `--delay-ms 0`), `initial_sync_10k_ms` (neuer Client erhält das ganze Dokument), `reconnect_converge_ms`
(Wiederverbinden bis gleicher Hash), `reconnect_bytes_kb` (übertragene Bytes beim Abgleich).

Format von `sync.json` wie ap-01: jede Kennzahl unter `metrics` als
`{"value": <Zahl>, "unit": "<Einheit>", "threshold": <Zahl>, "pass": <bool>}`, dazu `observations`,
`"environment"` (Rechner, Versionen von Rust, automerge, Elixir/OTP, Phoenix, Node) und
`"recommendation": "Go" | "No-Go"`.

### Nachmessen statt Glauben

Die Abnahmetests verlassen sich nicht auf `docs/spikes/sync.json`:

- Szenario-Tests starten `serve.sh` selbst, führen die Szenarien selbst aus und prüfen die Schwellwerte am
  eigenen Lauf (Latenz < 200 ms gilt auch auf dem Testrechner, da nur Loopback).
- Datenverlust und Konflikte rechnet der Test aus den gedumpten Operationen und dem Endstand selbst nach.
- `bench.sh --json` wird erneut ausgeführt: Zählwerte (`live_delivered_pct`, `concurrent_converged_pct`,
  `offline_lost_edits`, `offline_conflicts_reported_pct`, `offline_hash_equal` und die drei `both_offline_*`)
  exakt wie in der Datei,
  Zeitwerte höchstens um den Faktor 3 abweichend.

### Zuordnung der Abnahmetests

| AK | Prüft | Requirement |
| --- | --- | --- |
| AK-1 | Bericht vollständig, Empfehlung beginnt mit Go oder No-Go | Bericht und Messwerte |
| AK-2 | `sync.json` vollständig, `pass` passt zum Schwellwert, Empfehlung passt | Bericht und Messwerte |
| AK-3 | `live`: beide Richtungen p95 < 200 ms, 100 % angekommen | Live-Abgleich |
| AK-4 | `concurrent`: 100 % konvergiert, p95 < 200 ms | Gleichzeitige Änderungen |
| AK-5 | `offline`: 0 verlorene Änderungen, 20 von 20 Befunden, gleicher Hash A/B/Server | Offline und Zusammenführen |
| AK-10 | `offline --both`: 0 verlorene Änderungen, 20 von 20 Befunden, gleicher Hash A/B/Server | Offline und Zusammenführen |
| AK-6 | ein Prozess je Dokument; `kill` trifft nur das eine Dokument | Ein Prozess je Dokument |
| AK-7 | `poison`: Fehlerantwort, gleiche PID, folgende 20 Live-Änderungen kommen an | Fehlerisolation |
| AK-8 | Server-Protokoll eines `bench.sh --log` enthält keinen Parameterwert aus den Szenarien | Protokolle |
| AK-9 | `bench.sh --json` nachmessen | Bericht und Messwerte |

Budget für die Abnahmetests: Build höchstens 30 min (wie ap-01), jedes Szenario höchstens 5 min.

## Risks / Trade-offs

- [Loopback misst kein echtes Netz] → feste künstliche Verzögerung von 30 ms Umlaufzeit je Strecke; Schwankungen
  und Paketverlust bildet sie nicht ab, der Bericht nennt das; die menschliche Abnahme ergänzt den Eindruck.
- [Werte aus Entfernen gegen Ändern sind schwer zu finden] → wenn der Weg über Automerge nicht trägt, ist das
  ein Befund des Spikes und gehört als Risiko in den Bericht, nicht in einen abgeschwächten Test.
- [Volle Konfliktprüfung ~1 s blockiert den Dokumentprozess] → nur auf Abruf, nie im Latenzpfad.
- [Import von 10.000 Elementen beim ersten Beitritt dauert] → einmal beim Start, gemessen als
  `initial_sync_10k_ms`, nicht Teil der Latenz.
- [Zwei Clients in einem Node-Prozess teilen die Ereignisschleife] → eher zu pessimistisch; im Bericht nennen.
- [Rustler und wasm-bindgen im Build] → Vorgehen und Versionsbindung aus `spikes/datenmodell/build.sh`
  übernehmen.

## Entscheidungen des Kernteams (2026-10-19)

1. **Archivieren ohne Specs:** Spike-Verhalten ist kein Produktverhalten. `specs/spike-sync/` hält nur die
   Scenarios fest; archiviert wird mit `openspec archive ap-03-spike-sync --skip-specs`, nichts landet in
   `openspec/specs/`.
2. **„Gleiche Region“:** feste künstliche Verzögerung von 30 ms Umlaufzeit je Strecke Client–Server
   (`--delay-ms 15`); reines Loopback nur als Beobachtung.
3. **Wiederverbinden, Bytes, Erstabgleich:** nur messen und unter `observations` melden; Schwellwerte legt
   das Kernteam später fest (ap-07a, ap-17).
4. **Entfernen gegen Ändern:** ist ein Konflikt und erscheint als Befund `edit_on_removed` mit allen
   betroffenen Werten; nichts verschwindet still. Der Generator erzeugt 5 solche Fälle.
5. **Referenzdaten:** Der erweiterte synthetische Generator aus ap-01 reicht; kein `tests/golden/ap-03-spike-sync/`.
6. **Beide offline:** gehört dazu, als Variante `offline --both` mit eigenen Kennzahlen (AK-10).
