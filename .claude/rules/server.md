---
paths:
  - "server/**/*"
---
<!-- generiert von tools/sync_agents.py – Quelle: docs/rules/server.md -->

# Regeln für den Server (Elixir, Phoenix)

- Ein Prozess je geöffnetem Dokument (GenServer unter DynamicSupervisor, Name über Registry), nie ein
  Prozess je Element (ADR-030). Elemente sind Daten im Kern.
- Dokumentlogik (Validierung, Merge, Abhängigkeiten) nur über die NIF-Anbindung an `crates/graph`.
  Keine Nachimplementierung in Elixir.
- Geometrie läuft nie in der BEAM: Worker nur als Port bzw. externer Prozess mit Zeitlimit,
  Neustart über Supervisor und begrenztem Pool (ADR-032).
- Fehler: „let it crash“ für unerwartete Zustände, aber jede Client-Nachricht bekommt eine strukturierte
  Antwort (`code`, `message`, `element_id`, `hint`).
- Presence und Channels: Nachrichten klein halten, keine Geometrie über Channels, nur Operationen,
  Hashes und Vorschau-Verweise.
- Hintergrundaufgaben (Export, Regelprüfung, KI-Läufe) über Oban, idempotent.
- Typespecs an jeder öffentlichen Funktion; `mix dialyzer` und `mix credo --strict` ohne Befund. Das Kernteam
  kann Elixir nicht selbst prüfen – Typen und Tests ersetzen das menschliche Code-Review.
- Prüfen: `mix format --check-formatted`, `mix compile --warnings-as-errors`, `mix credo --strict`,
  `mix dialyzer`, `mix test`.
