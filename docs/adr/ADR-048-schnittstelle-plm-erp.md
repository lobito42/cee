# ADR-048: Offene Schnittstelle zu PLM und ERP

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Später sollen ein (selbst gebautes) PLM- und ein ERP-System angebunden werden. CEE soll dafür keine Lösung
für einen Hersteller bauen und selbst kein ERP werden. Die Grenzen müssen jetzt klar sein, damit das
Datenmodell passt.

## Entscheidung

1. **Aufgabenteilung:** CEE ist führend für die Produktdefinition: Geometrie, Parameter, Varianten,
   Engineering-Stückliste, Zeichnungen, Revisionen der Definition und Freigabestände. PLM bzw. ERP sind
   führend für Materialstamm, Fertigungsstückliste (MBOM), Arbeitspläne, Lager, Preise, Aufträge und
   Lieferanten. Jedes Feld hat genau ein führendes System.
2. **Offenes Austauschformat** in `format/` (Apache-2.0): Item, Revision, Freigabestand, Stückliste,
   Dokumentverweise und Ereignisse als versioniertes JSON-Schema. Ein eigenes PLM oder ERP kann damit
   entstehen, ohne CEE-Code zu übernehmen.
3. **API aus dem Befehlsregister:** Die externe API (HTTP/JSON) wird wie die MCP-Werkzeuge aus dem
   Befehlsregister erzeugt (ADR-045); Lesen und Schreiben mit eigenen Rechten je Anbindung.
4. **Ereignisse:** Der Server veröffentlicht Ereignisse („item.released“, „revision.created“,
   „change_order.closed“) zuverlässig über eine Outbox (Oban), als Webhooks und abrufbar; mindestens einmal
   zugestellt, mit Ereignis-ID gegen Doppelungen.
5. **Anbindungen als Plugins:** Nummernkreise, Materialstamm-Abgleich, Preise und Bestände kommen über
   Plugins mit klaren Erweiterungspunkten (Nummer vergeben, Item nachschlagen, Feld abgleichen), nicht
   über Sonderwege im Kern. Offline vergebene Nummern sind vorläufig und werden beim Verbinden bestätigt.

## Alternativen

Feste Anbindung an ein bestimmtes PLM/ERP; CEE als PLM mit Lager und Aufträgen; Austausch nur über Dateien.

## Konsequenzen

Ergänzt ADR-017, ADR-030 und ADR-047. Das Format entsteht mit ap-33; die API, Ereignisse und
Beispielanbindung mit ap-34 nach der Beta. PLM-Funktionen über die Produktdefinition hinaus bleiben Nicht-Ziel.
