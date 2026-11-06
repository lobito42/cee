# ADR-069: PLM – Freigabe per Änderungsauftrag; ERP anbinden statt bauen

- Status: akzeptiert
- Datum: 2026-11-06
- Entscheider: Kernteam (Ja im Gespräch, 2026-11-06: „Ja zu PLM/ERP“; „Ja“ zu vse als erster Anbindung)
- Ergänzt: ADR-068 Punkt 3 (Freigabe und PLM); bestätigt ADR-047 und ADR-048

## Kontext

Recherche 2026-11-05/06 (Übergabe der Handy-Sitzung): Kein offenes PLM ist breit verbreitet. Als Vorbild für das
Prinzip taugt Cascadia (AGPL plus kommerzieller Teil, deshalb nur als Ideengeber, nie als Code): jeder
Änderungsauftrag ist ein Zweig, die Revision entsteht erst beim Freigeben. gitplm (Apache-2.0) liefert Ideen für
Sachnummern (Kategorie–Nummer–Variante) und Stücklisten als Text. Aras, DocDoku, PLMore und nanoPLM passen nicht
(Lizenz, Pflege, Umfang). Als ERP zum Anbinden kommen InvenTree (MIT; Teile, Lager, Stücklisten, Fertigung), Odoo
Community (LGPL; PLM-Modul nur in Enterprise) und ERPNext (GPL, vollständig offen) in Frage; die Lizenz spielt keine
Rolle, solange das ERP ein eigenes Programm bleibt. In Deutschland ist die E-Rechnung zu beachten (Empfang seit 2025,
Versand ab 2027 bei über 800.000 € Umsatz, ab 2028 für fast alle).

## Entscheidung

1. **Freigabe nach dem Prinzip des Änderungsauftrags:** Eine Änderung, die freigegeben werden soll, ist ein
   Änderungsauftrag (aufbauend auf dem Änderungssatz, ADR-068). Die Revision (A, B, …) entsteht erst beim
   Freigeben; der Freigabestand ist unveränderlich und trägt Teilenummer, Prüfbericht und STEP/STL (ADR-047).
   Nur Menschen geben frei.
2. **Sachnummern** aus Kategorie, laufender Nummer und Variante; Stücklisten als Text (Ideen aus gitplm, kein
   Code ohne Lizenzprüfung nach ADR-034).
3. **ERP wird angebunden, nicht gebaut.** Erste Anbindung ist **vse** (eigenes Projekt des Kernteams,
   `lobito42/vse`, Elixir): Es führt Bestand, Preise, Aufträge und Belegkette und hat Teile mit Revision, Status und
   konfigurierbare Stückliste schon; es fehlt die Übergabe von außen. CEE liefert den freigegebenen Stand samt
   Stückliste im offenen Austauschformat in `format/` (Apache-2.0), vse nimmt jede Revision als Teil auf. Danach
   InvenTree (MIT), Odoo Community, ERPNext je nach Bedarf. Die Aufgabenteilung aus ADR-048 gilt unverändert (CEE
   führt Geometrie und Konstruktions-Stückliste, das ERP Lager, Preise, Aufträge und Fertigungs-Stückliste).
   Solange vse keine Lizenz hat, werden nur Ideen und Wörter geteilt, kein Code.
4. **Reihenfolge im Plan:** Runde 5 Freigabe (Änderungsauftrag, Revision, Sachnummer, Prüfbericht), Runde 6
   Anbindung an vse. E-Rechnung gehört ins ERP, nicht in CEE.

## Folgen

- Kein eigenes ERP, kein eigener Lagerbestand in CEE. Keine AGPL-/GPL-Abhängigkeit im CEE-Code (Cascadia und
  ERPNext nur als eigenständige Programme bzw. Ideengeber).
- Das Austauschformat in `format/` (Item, Revision, Freigabestand, Stückliste) wird mit Runde 5 konkret; vorher
  kein Vorratsbau (AGENTS.md Grundsatz 10).
