---
paths:
  - "client/**/*"
---
<!-- generiert von tools/sync_agents.py – Quelle: docs/rules/client.md -->

# Regeln für den Client (TypeScript, Web und Tauri)

- Bedienkonzept nach Figma (ADR-022): keine Menüleisten, keine modalen Dialoge, kein Ribbon. Neue
  Funktionen kommen in die Befehlssuche (Strg/Cmd+K), ins Eigenschaften-Panel oder an die Auswahl.
- Die Werkzeugleiste hat genau fünf Werkzeuge (Auswählen, Messen, Schnitt, Skizze, Fragen). Ein sechstes
  nur per ADR.
- Farben, Schriften, Abstände ausschließlich über die Tokens in `client/src/design/tokens.ts`, hell und
  dunkel. Keine Hex-Werte im Komponentencode. Eine Akzentfarbe, nur für Auswahl und KI-Vorschläge.
- Reaktionszeit: Auswahl und Hervorhebung < 100 ms; nichts blockiert den UI-Thread länger als 16 ms.
- Der Client ändert das Modell nur über Graph-Operationen des Kerns (`crates/graph` als WASM bzw. nativ),
  nie über eigene Datenstrukturen. 3D, Knoten-Editor und Text zeigen denselben Graphen (ADR-035).
- KI-Änderungen erscheinen immer als Änderungskarte mit Vorschau, nie direkt (ADR-021).
- Keine Git-Begriffe in der Oberfläche (ADR-051): Entwurf, Meilenstein, Übernehmen, Zur Prüfung geben,
  Zurückholen, Ableiten, Verlauf. Kein Speichern-Knopf; Konflikte nur als Entscheidungskarten.
- Nichts wird gelöscht, was andere nutzen oder was Wissen trägt: Entwürfe werden verworfen (mit Begründung)
  und ausgeblendet. Standardansicht zeigt Ergebnisse; die Werkstatt zeigt alle Entwürfe.
- Wiederfinden (ADR-052): Inhalte erreicht man über die eine Suche, Facetten, Sammlungen, Rückverweise und
  die Startseite – keine zusätzlichen Ordnerebenen unter Projekt.
- Bewegen, Drehen, Skalieren: Achse sperren und Wert tippen ist immer möglich, mit Einheiten und einfachen
  Formeln; nie ein Dialog für exakte Werte (ADR-044).
- Vier Arbeitsbereiche (Raum, Akustik, Präsentation, Bericht). Ein neues Panel gehört genau einem
  Arbeitsbereich; ein fünfter Arbeitsbereich nur per ADR.
- Jede Aktion erzeugt eine Graph-Operation, die im Aktionsprotokoll als Text sichtbar und kopierbar ist.
- Der Stapel im Eigenschaften-Panel ist eine Projektion des Graphen, kein eigenes Datenmodell.
- Fehlerhafte und veraltete Elemente sind in allen Ansichten sichtbar markiert (Baum, 3D, Knoten); das Modell
  bleibt bedienbar (ADR-050). Große Baugruppen laden Untergraphen und Detailstufen bei Bedarf nach.
- Der Knoten-Editor zeigt an jedem Knoten bzw. jeder Kante das aktuelle Zwischenergebnis mit Einheit (ADR-049);
  große Werte gekürzt, Geometrie als kleine Vorschau aus dem Cache, nie neu berechnet nur für die Anzeige.
- Apps (ADR-049) sind generierte Oberflächen aus den Eingängen eines veröffentlichten Untergraphen, keine
  eigenen Masken von Hand. Sie schreiben nie direkt ins Modell, nur Änderungssätze bzw. eigene Stände.
- Jede Funktion ist ein Befehl im Befehlsregister (stabile ID, Parameter-Schema). Befehlssuche,
  Tastenkürzel, Kontextaktionen und Plugins rufen nur Befehle auf; keine Funktion nur hinter einem Knopf
  (ADR-045).
- Plugin-Code läuft nie im UI-Thread und nie mit Zugriff auf interne Module, nur über die Plugin-API im
  Web Worker. Ein Fehler im Plugin zeigt einen Befund, bricht aber nichts ab.
- Fremde Projekte und Bibliotheken öffnen im eingeschränkten Modus, bis man ihnen vertraut: keine
  Script-Elemente, kein Plugin-Code des Projekts.
- Einstellungen nur über das Einstellungs-Schema (Ebenen Standard, Organisation, Benutzer, Projekt), nie
  verstreut über `localStorage` oder eigene Dateien.
- Derselbe Code für Browser und Tauri. Plattformzugriffe (Dateien, Worker) nur über `client/src/platform/`.
- Jede sichtbare UI-Änderung braucht einen aktualisierten Referenz-Screenshot unter
  `tests/ui-reference/` – den legt der Test-Autor nach Freigabe durch UX an, nicht der Implementierer.
