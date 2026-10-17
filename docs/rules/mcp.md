# Regeln für den MCP-Endpunkt (im Server)

- Jedes Tool hat ein JSON-Schema für Ein- und Ausgabe und einen Test mit Beispielaufruf.
- MCP-Tools werden aus dem Befehlsregister erzeugt (ADR-045): kein Tool ohne entsprechenden Befehl, den
  auch ein Mensch in der Oberfläche aufrufen kann. Ausnahme nur lesende Abfragen für Agenten.
- Veröffentlichte Untergraphen werden automatisch zu Werkzeugen (ADR-049); ihre Beschreibung und die
  Grenzen der Eingänge kommen aus dem Untergraphen, nicht aus Handarbeit im Server.
- Antworten sind kompakt: Zusammenfassung zuerst, Details nur auf Nachfrage (Parameter `detail`).
  Ziel: < 2.000 Tokens pro typischer Antwort. Keine Rohgeometrie, keine Tessellierungsdaten.
- Orte werden immer als Element-ID oder veröffentlichter Name angegeben, nie als Index.
- Fehler sind strukturiert: `code`, `message`, `element_id`, `hint` (was der Agent als Nächstes tun soll).
- Schreibende Tools erzeugen Änderungssätze aus Graph-Operationen (ADR-021), nie direkte Änderungen.
- Kein Tool gibt frei oder sperrt (ADR-047). Agenten dürfen Freigaben vorbereiten und prüfen.
- Tool-Beschreibungen sind Teil des Produkts: kurz, eindeutig, mit einem Beispiel.
- Kein Tool setzt ein bestimmtes Modell voraus. Jedes Tool muss mit einem kleinen lokalen Modell bedienbar
  sein: wenige Parameter, Aufzählungen statt Freitext, keine verschachtelten Pflichtobjekte (ADR-037).
- Keine Daten an externe Dienste aus dem Server heraus; Modelle ruft nur die Anbieter-Schnittstelle auf.
