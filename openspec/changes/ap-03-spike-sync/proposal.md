## Why

Online sollen alle denselben Stand sehen, offline soll man weiterarbeiten und später ohne Datenverlust
zusammenführen (ADR-033, Konzept N-08 und F-21). Der Datenmodell-Spike ap-01 hat gezeigt, dass der Rust-Kern
auf automerge ≥ 0.12 schnell genug ist und nativ, als Rustler-NIF und als WASM denselben Inhalts-Hash liefert
(`docs/spikes/datenmodell.md`). Offen ist, ob das auch **über das Netz** trägt: Phoenix Channels mit dem Kern
als NIF im Server (ADR-030) und als WASM im Client (ADR-031), zwei Clients live, einer zwischendurch offline.
Bevor ap-07a den produktiven Dokumentprozess baut, muss belegt sein, dass eine Änderung bei beiden Clients in
< 200 ms ankommt und das Zusammenführen nach Offline-Arbeit nichts verliert.

## What Changes

- Prototyp `spikes/sync/` (eigener Cargo-Workspace und eigenes Mix-Projekt, kein Produktcode):
  - Rust: NIF- und WASM-Bindung mit Sync-Funktionen, aufgebaut auf dem ap-01-Prototyp `spikes/datenmodell/`
    als Pfad-Abhängigkeit
  - Elixir: minimaler Phoenix-Server nur mit Channels, ein überwachter Prozess je geöffnetem Dokument, Dokument
    nur im Arbeitsspeicher
  - Node: headless Testclients mit dem WASM-Kern und dem Phoenix-JS-Client; Szenarien live, gleichzeitig und
    offline
  - Browser: eine schlichte Demo-Seite für die menschliche Abnahme mit zwei echten Browsern
- Messungen zu Latenz zwischen zwei Clients, Konvergenz, Zusammenführen nach Offline-Arbeit, Fehlerisolation
- Bericht `docs/spikes/sync.md` und maschinenlesbare Messwerte `docs/spikes/sync.json`, Empfehlung Go oder No-Go

## Capabilities

### New Capabilities

- `spike-sync`: Nachweis von Live-Abgleich, Offline-Arbeit und Zusammenführen über Phoenix Channels mit dem
  Rust-Kern (Spike, Prototyp-Verhalten; siehe design.md, Open Questions zur Archivierung)

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs (bestätigen oder überarbeiten): ADR-029 (ein Kern als NIF und WASM), ADR-030 (Channels, ein
  Prozess je Dokument, Panics erreichen die BEAM nicht), ADR-031 (Browser mit Kern als WASM), ADR-033
  (CRDT-Abgleich, semantische Konflikte als Befund), ADR-056 (keine Modellinhalte in Server-Protokollen),
  ADR-059 (M0, Gate G1). Kein Widerspruch zu einem ADR bekannt.
- Baut auf ap-01 auf: `spikes/datenmodell/` (automerge 0.12, Elementform, Inhalts-Hash, Konfliktprüfung,
  synthetischer Generator) und die Empfehlung aus `docs/spikes/datenmodell.md`.
- Abnahmetests: `tests/acceptance/ap-03-spike-sync/` (AK-1 bis AK-9, Zuordnung in design.md)
- Gate G1
- Referenzdaten: keine unter `tests/golden/ap-03-spike-sync/` vorgesehen; die Konfliktfälle erzeugt ein
  Generator mit bekanntem Sollergebnis (design.md). Ob das Kernteam echte Fälle beisteuern will, steht unter
  Open Questions.
- Neue Abhängigkeiten nur im Spike: phoenix, bandit, jason, rustler (Elixir), `phoenix` (npm), wasm-bindgen –
  alle MIT oder Apache-2.0 (ADR-034).
- Nicht-Ziele (ADR-059, alles aus M1/M2):
  - kein Speichern in PostgreSQL und keine Wiederherstellung nach Absturz (ap-07a)
  - keine Anmeldung, keine Rollen und Rechte, keine Dienstkonten (ap-07a, ap-07b, ADR-055)
  - keine Presence, keine Cursor, keine Kommentare, nichts über Personen wird gespeichert (ap-07b, ADR-056)
  - keine Entwürfe, kein „Zur Prüfung geben“ und „Übernehmen“, keine Zweige in der Oberfläche (M2, ADR-051)
  - kein Lasttest mit 20 Nutzern je Dokument (ap-07b), keine Desktop-App und kein lokaler Speicher (ap-17)
  - kein produktiver Code in `server/`, `crates/` oder `client/`; Prototyp-Code wird nicht übernommen
  - keine Geometrie, keine Textprojektion, kein MCP
