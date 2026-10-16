---
paths:
  - "packages/mcp-server/**/*"
---
<!-- generiert von tools/sync_agents.py – Quelle: docs/rules/mcp-server.md -->

# Regeln für den MCP-Server

- Jedes Tool hat ein JSON-Schema für Ein- und Ausgabe und einen Test mit Beispielaufruf.
- Antworten sind kompakt: Zusammenfassung zuerst, Details nur auf Nachfrage (Parameter `detail`).
  Ziel: < 2.000 Tokens pro typischer Antwort. Keine Rohgeometrie, keine Tessellierungsdaten.
- Orte werden immer als Element-ID oder veröffentlichter Name angegeben, nie als Index.
- Fehler sind strukturiert: `code`, `message`, `feature_id`, `hint` (was Claude als Nächstes tun soll).
- Schreibende Tools (`publish`, `export`) ändern nur über den Geometrie-Dienst und erzeugen Änderungssätze.
- Tool-Beschreibungen sind Teil des Produkts: kurz, eindeutig, mit einem Beispiel.
