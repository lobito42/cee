## Why

ap-05a liefert Schema v1, Einheiten, das Dokument und die Prüfung. Damit der Kernel-Worker (ap-06) und die
Arbeitsfläche (ap-08b) nur neu berechnen, was sich wirklich geändert hat, und damit ein Fehler nie das ganze
Modell blockiert, braucht der Kern Abhängigkeiten, Berechnungszustände und Teil-Laden (ADR-025, ADR-029,
ADR-050). Damit das Schema später wachsen kann, ohne Offline-Arbeit zu zerbrechen, braucht er Migrationen,
die mit der CRDT-Historie verträglich sind (ADR-028, ADR-033). ap-05b schließt damit das Arbeitspaket
„Graph-Kern produktiv“ mit dem Kriterium „100.000 Elemente laden ≤ 2 s“ ab.

## What Changes

- `crates/graph` wird erweitert:
  - **Abhängigkeiten:** Index (ID → Typ, Eltern, Eingänge, Ausgänge), Graph aus Eingängen, Zyklen werden bei
    Operationen abgelehnt und nach dem Zusammenführen als Befund gemeldet, stabile Reihenfolge für die
    Berechnung, betroffene Elemente nach einer Änderung.
  - **Berechnungszustände:** aktuell, veraltet, in Arbeit, fehlerhaft – abgeleitet, nie im Dokument
    gespeichert (ADR-032, ADR-050).
  - **Migrationen:** Schema-Version im Dokument, Migrationen als normale, idempotente CRDT-Änderungen,
    Ablehnung zu neuer Dokumente. Belegt mit einer Beispiel-Migration, die nur in den Tests eingeschaltet ist.
  - **Teil-Laden:** Beim Öffnen nur der Index; Parameter und Meta erst beim ersten Zugriff; Untergraph samt
    nach außen zeigender Eingänge.
  - **`graphctl`** um Befehle für Reihenfolge, betroffene Elemente, Zustände, Migration und Untergraph.

## Capabilities

### New Capabilities

Keine.

### Modified Capabilities

- `graph-kern`: um Abhängigkeiten, Berechnungszustände, Migrationen, Teil-Laden und Leistung mit Index
  ergänzt (nur ADDED Requirements; die Capability entsteht mit ap-05a)

## Impact

- Betroffene ADRs: ADR-025 (inkrementelle Neuberechnung), ADR-028 (Schema ist Vertrag, Änderung nur mit
  Migration), ADR-029 (Abhängigkeitsanalyse und Planung im Kern), ADR-032 (Zustände sind Cache), ADR-033
  (Migrationen verträglich mit der Historie), ADR-050 (robuste Neuberechnung, Teil-Laden), ADR-062 (M1,
  kritischer Pfad). Kein Widerspruch zu einem ADR bekannt.
- Setzt ap-05a voraus (Schema, Dokument, Prüfung, `graphctl`, Generator).
- Abnahmetests: `tests/acceptance/ap-05b-abhaengigkeiten/` (AK-1 bis AK-8, Zuordnung in design.md)
- Gate G2
- Referenzdaten: keine unter `tests/golden/`; Fälle erzeugt der Generator, verglichen wird mit einer einfachen
  Referenzrechnung im Test.
- Keine neuen Abhängigkeiten.
- Nicht-Ziele:
  - keine Geometrie und kein Worker-Protokoll (ap-06); der Kern plant nur, was neu zu berechnen ist
  - keine getrennten Dokumente je Bauteil (offene Frage 1), kein Laden über das Netz (ap-07a)
  - keine semantische Konfliktprüfung außer Zyklen (ap-25), keine Komponenten-Auflösung (ap-13a)
  - keine echte Schemaänderung: die aktuelle Version bleibt 1
  - keine Bindungen (ap-40)
