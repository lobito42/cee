# Review-Kriterien

Gilt für das automatische Review jedes Pull Requests und für den Reviewer-Agenten.

## Immer kritisch

- Meldungen von `python3 tools/guard.py range origin/main` (Vertrag auf falschem Branch geändert:
  ADRs, OpenSpec-Specs, Proposals, Abnahmetests, Werkzeug-Konfiguration).
- Abgeschwächte, übersprungene (`skip`, `xfail`) oder gelöschte Tests.
- Neue Abhängigkeit unter GPL/AGPL oder ohne geklärte Lizenz (ADR-013).
- Topologie-Referenzen über Indizes statt Feature-ID oder veröffentlichtem Namen (ADR-016).
- UI schreibt direkt in `.py`-Dateien statt über den Geometrie-Dienst (ADR-024).
- KI-Änderung wird ohne Änderungskarte übernommen (ADR-021).
- Netzwerkzugriffe zur Laufzeit.

## Wichtig

- Jedes Scenario des OpenSpec-Changes ist durch einen Test belegt; alle Tasks sind abgehakt.
- Fehler aus dem Kernel werden strukturiert weitergegeben (Feature-ID, Hinweis), nicht verschluckt.
- MCP-Antworten bleiben kompakt (< 2.000 Tokens typisch), mit Schema.
- UI: nur Theme-Variablen, keine Menüs oder modalen Dialoge, eine Akzentfarbe.
- Performance-Budgets aus der Spec sind gemessen und eingehalten.

## Hinweise

- Lesbarkeit, Benennung, Kommentare dort, wo Geometrie nicht offensichtlich ist.
- Doku unter `docs/` aktualisiert, wenn sich öffentliche Schnittstellen ändern.
