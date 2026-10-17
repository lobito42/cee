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
- Rechte (ADR-055) prüft der Server bei jeder Operation, jeder Suche und jedem Export; Agenten und
  Automatisierungen laufen als Dienstkonto ohne Recht zum Freigeben.
- Datenschutz (ADR-056): Anwesenheit nie speichern; im Verlauf nur Konto-IDs; Protokolle ohne Modellinhalte,
  höchstens 30 Tage. Jede neue gespeicherte Angabe zu Personen braucht einen Vermerk im PR.
- Suchindex und Facetten (ADR-052) sind abgeleitet aus dem Graphen, werden nie synchronisiert und lassen sich
  jederzeit neu aufbauen; die Suche prüft Rechte je Treffer. Adressen bleiben nach Umbenennen und
  Verschieben gültig (Weiterleitung).
- Studien (ADR-049) laufen als Oban-Jobs mit begrenzter Parallelität je Organisation, sind abbrechbar und
  setzen nach einem Neustart fort; Ergebnisse je Variante nach Inhalts-Hash zwischengespeichert.
- Statusübergänge im Lebenszyklus (ADR-047) nur über Befehle mit Rechteprüfung; Freigeben ist Menschen
  vorbehalten, nie einem Agenten oder MCP-Zugang. Freigabestände und ihre Dokumente werden nie geändert oder
  gelöscht, nur ersetzt bzw. gesperrt.
- Ereignisse für PLM und ERP (ADR-048) über eine Outbox in derselben Transaktion wie die Änderung, Zustellung
  über Oban, mindestens einmal, mit Ereignis-ID. Keine Aufrufe fremder Systeme aus dem Dokumentprozess.
- Typespecs an jeder öffentlichen Funktion; `mix dialyzer` und `mix credo --strict` ohne Befund. Das Kernteam
  kann Elixir nicht selbst prüfen – Typen und Tests ersetzen das menschliche Code-Review.
- Prüfen: `mix format --check-formatted`, `mix compile --warnings-as-errors`, `mix credo --strict`,
  `mix dialyzer`, `mix test`.
