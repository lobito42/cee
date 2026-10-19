## Why

Alles in CEE baut auf dem Element-Graphen auf (ADR-028): Kernel-Worker, Server-Dokument, Arbeitsfläche, Skizzen,
Baugruppen. Der Spike ap-01 hat die Elementform und automerge 0.12 bestätigt (`docs/spikes/datenmodell.md`,
Go mit 12 von 12 Kennzahlen), aber nur als Prototyp in `spikes/datenmodell/`. `crates/graph` ist bis heute
leer. ap-05 macht daraus den produktiven Kern, auf dem ap-40 (Bindungen) und danach der kritische Pfad zum
Modellieren aufsetzen (ADR-062). Ein falsches Datenmodell lässt sich später kaum korrigieren; deshalb kommen
Schema, Validierung, Abhängigkeiten und Migrationen zuerst und vollständig (ADR-059: Architektur-Grundlagen
vollständig ab M1).

## What Changes

- `crates/graph` (cee-graph, MPL-2.0) wird produktiv – kein Code wird ungeprüft aus dem Spike kopiert, aber
  Aufbau und Speicherform aus ap-01 werden übernommen:
  - **Schema v1:** Elementform `id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`; Zahlen nur als
    Größe mit Einheit (ADR-057); Geld als Dezimalzahl mit Währung. `format/schema/element.schema.json` wird
    auf v1 festgeschrieben, `format/examples/` werden nach v1 überführt.
  - **Dokument:** CRDT-Dokument auf automerge ≥ 0.12 (ADR-033), ein Dokument je Projekt, Operationen zum
    Anlegen, Ändern und Entfernen von Elementen, Laden und Speichern, Zusammenführen, Inhalts-Hash.
  - **Validierung:** Befunde statt Abbruch; ein fehlerhaftes Element zerbricht nie das übrige Modell (ADR-050).
  - **Abhängigkeiten:** Graph aus Eingängen, Zyklen werden abgelehnt, Reihenfolge für die Berechnung,
    betroffene Elemente nach einer Änderung (Planung der inkrementellen Neuberechnung, ADR-025, ADR-029).
  - **Berechnungszustände:** aktuell, veraltet, in Arbeit, fehlerhaft – abgeleitet, nie im Dokument
    gespeichert (ADR-032, ADR-050).
  - **Migrationen:** Schema-Version im Dokument, Migrationen als normale CRDT-Änderungen, verträglich mit
    Offline-Zweigen (ADR-028, ADR-033).
  - **Teil-Laden:** Untergraphen werden erst bei Bedarf aufbereitet (ADR-050).
  - **Import im Stapel:** schneller Aufbau großer Projekte aus JSON (Risiko aus ap-01: 29 s für 100.000).
  - **Messprogramm:** `cargo run -q --release -p cee-graph --example bench -- --json`.

## Capabilities

### New Capabilities

- `graph-kern`: Element-Graph als Quelle der Wahrheit – Schema v1, Dokument, Validierung, Abhängigkeiten,
  Berechnungszustände, Migrationen, Teil-Laden und Import (wird beim Archivieren nach `openspec/specs/`
  übernommen)

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs: ADR-016 (Referenzen nie über Indizes), ADR-025 (inkrementelle Neuberechnung), ADR-028
  (Graph als Quelle der Wahrheit, Schema ist Vertrag), ADR-029 (Datenmodell-Logik nur im Rust-Kern), ADR-032
  (Geometrie und Zustände sind Cache), ADR-033 (Automerge, Migrationen mit der Historie verträglich), ADR-043
  (Komponenten und Instanzen tragen dieselbe Form), ADR-046 (Schema zählt keine Fachtypen auf), ADR-050
  (robuste Neuberechnung, Teil-Laden), ADR-057 (Größen mit Einheit), ADR-058 (Adressen auf ID-Basis),
  ADR-059/ADR-062 (M1, kritischer Pfad). Kein Widerspruch zu einem ADR bekannt.
- Baut auf ap-01 auf: Empfehlung und Messwerte in `docs/spikes/datenmodell.md`, Prototyp `spikes/datenmodell/`
  (bleibt unverändert und wird nicht Abhängigkeit des Kerns).
- Übernimmt die Folgepunkte aus dem Review von PR #9: Einheiten im Schema erzwingen; Abnahmeschwellen
  ohne pauschale Toleranz.
- Abnahmetests: `tests/acceptance/ap-05-graph-kern/` (AK-1 bis AK-11, Zuordnung in design.md)
- Gate G2 (erster Baustein des kritischen Pfads in M1)
- Referenzdaten: keine unter `tests/golden/ap-05-graph-kern/`; Korpora erzeugt ein Generator mit bekanntem
  Sollergebnis, Referenzprojekte sind `format/examples/raum.json` und `format/examples/baugruppe.json`.
- Abhängigkeiten: automerge, serde, serde_json, sha2, ulid (alle MIT oder Apache-2.0, ADR-034).
- Nicht-Ziele:
  - keine Bindungen als NIF, WASM oder PyO3 und kein Python-SDK (ap-40)
  - keine Textprojektion und kein Git-Export (ap-24, M2)
  - keine Auflösung von Komponenten und Instanzen, keine Verbindungen (ap-13a, ap-46); das Schema trägt sie
    nur in der einheitlichen Form
  - keine Ausdrücke und Formeln mit Dimensionsprüfung, keine Eingabe mit Einheiten („1,2 m“) (ap-08a)
  - keine semantische Konfliktprüfung nach dem Zusammenführen (ap-25, M2)
  - keine Geometrie, keine Topologie-Identität (ap-06, ap-39), kein Server, kein Speichern in PostgreSQL (ap-07a)
  - keine Publikation, Manifeste und Adressen über Projektgrenzen (ap-26, M2)
  - kein Aufnehmen der Spike-Tests in die CI (Werkzeug-Konfiguration, Sache des Kernteams)
