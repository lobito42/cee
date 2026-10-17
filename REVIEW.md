# Review-Kriterien

Gilt für das automatische Review jedes Pull Requests und für den Reviewer-Agenten.

## Immer kritisch

- Meldungen von `python3 tools/guard.py range origin/main` (Vertrag auf falschem Branch geändert:
  ADRs, OpenSpec-Specs, Proposals, Abnahmetests, Werkzeug-Konfiguration).
- Abgeschwächte, übersprungene (`skip`, `xfail`) oder gelöschte Tests.
- Neue Abhängigkeit unter GPL/AGPL oder ohne geklärte Lizenz (ADR-034).
- Topologie-Referenzen über Indizes statt Element-ID oder veröffentlichtem Namen (ADR-016).
- Datenmodell-Logik außerhalb des Rust-Kerns nachgebaut (Server, Client, SDK) (ADR-029).
- Geometrie im Server-Prozess statt im Worker; ein Prozess je Element statt je Dokument (ADR-030/032).
- Elementtyp mit Sonderfeldern statt der einheitlichen Elementform (ADR-028).
- KI-Änderung wird ohne Änderungskarte übernommen (ADR-021).
- Netzwerkzugriffe außerhalb des Sync-Protokolls zwischen Client und Server; Kern und Worker haben keinen Netzzugriff.

## Wichtig

- Abschnitt „In einfachen Worten“ im PR vorhanden und zutreffend (das Kernteam prüft Rust und Elixir
  nicht selbst).
- Elixir: Typespecs an öffentlichen Funktionen, `mix dialyzer` ohne Befund. Rust: kein `unwrap()`/`expect()`
  außerhalb von Tests.

- Jedes Scenario des OpenSpec-Changes ist durch einen Test belegt; alle Tasks sind abgehakt.
- Fehler aus Kern und Worker werden strukturiert weitergegeben (Element-ID, Hinweis), nicht verschluckt.
- Schemaänderung mit neuer `SCHEMA_VERSION`, Migration und Test mit altem Dokument.
- MCP-Antworten bleiben kompakt (< 2.000 Tokens typisch), mit Schema.
- UI: nur Design-Tokens, keine Menüs oder modalen Dialoge, eine Akzentfarbe; Browser und Tauri geprüft.
- Performance-Budgets aus der Spec sind gemessen und eingehalten.

## Hinweise

- Lesbarkeit, Benennung, Kommentare dort, wo Geometrie nicht offensichtlich ist.
- Doku unter `docs/` aktualisiert, wenn sich öffentliche Schnittstellen ändern.
