---
paths:
  - "server/lib/**/mcp/**/*"
  - "server/test/**/mcp/**/*"
---
<!-- generiert von tools/sync_agents.py – Quelle: docs/rules/mcp.md -->

# Regeln für den MCP-Endpunkt (im Server)

- Jedes Tool hat ein JSON-Schema für Ein- und Ausgabe und einen Test mit Beispielaufruf.
- Antworten sind kompakt: Zusammenfassung zuerst, Details nur auf Nachfrage (Parameter `detail`).
  Ziel: < 2.000 Tokens pro typischer Antwort. Keine Rohgeometrie, keine Tessellierungsdaten.
- Orte werden immer als Element-ID oder veröffentlichter Name angegeben, nie als Index.
- Fehler sind strukturiert: `code`, `message`, `element_id`, `hint` (was der Agent als Nächstes tun soll).
- Schreibende Tools erzeugen Änderungssätze aus Graph-Operationen (ADR-021), nie direkte Änderungen.
- Tool-Beschreibungen sind Teil des Produkts: kurz, eindeutig, mit einem Beispiel.
- Kein Tool setzt ein bestimmtes Modell voraus. Jedes Tool muss mit einem kleinen lokalen Modell bedienbar
  sein: wenige Parameter, Aufzählungen statt Freitext, keine verschachtelten Pflichtobjekte (ADR-037).
- Keine Daten an externe Dienste aus dem Server heraus; Modelle ruft nur die Anbieter-Schnittstelle auf.
