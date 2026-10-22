## Why

Alles in CEE baut auf dem Element-Graphen auf (ADR-028). Der Spike ap-01 hat die Elementform und automerge 0.12
bestätigt (`docs/spikes/datenmodell.md`, Go mit 12 von 12 Kennzahlen), aber nur als Prototyp; `crates/graph`
ist bis heute leer. Im Review von PR #9 fiel auf, dass Zahlen im Prototyp oft ohne Einheit stehen – das
widerspricht ADR-057 („jede Zahl ist eine Größe mit Einheit“). Einheiten kommen aus vielen Quellen
(Oberfläche, Import, KI über MCP, Skripte, Fachpakete, Textprojektion); prüfen und umrechnen kann sie
verlässlich nur der Kern, den alle einbinden (ADR-029). ap-05a legt deshalb das Fundament: Schema v1, ein
Einheitensystem auf Basis von SI mit Einheiten-Codes nach UCUM, das Dokument und die Prüfung. ap-05b baut
darauf Abhängigkeiten, Berechnungszustände, Migrationen und Teil-Laden.

## What Changes

- `crates/graph` (cee-graph, MPL-2.0) wird produktiv; Aufbau und Speicherform aus ap-01 werden übernommen,
  der Prototyp in `spikes/` bleibt unverändert und wird keine Abhängigkeit:
  - **Einheitensystem:** Dimensionen als Exponenten der SI-Grundgrößen plus Winkel, CO₂-Äquivalent und
    Geld; Einheitentabelle für CAD mit Codes nach UCUM und exakten Umrechnungsfaktoren; Umrechnen und Lesen
    von Eingaben wie „1,2 m“ oder „1200 mm“. Gespeichert wird immer in kanonischen Einheiten (ADR-057).
  - **Typdefinitionen:** Ein Elementtyp kann für seine Parameter die Dimension und eine Standard-Einheit
    festlegen (z. B. `height` → Länge, Standard mm). Fachpakete liefern sie später über die Fachpaket-API
    (ap-08a); in ap-05a gibt es die Schnittstelle und Testdefinitionen.
  - **Regeln für Zahlen:** Zahl ohne Einheit bei bekannter Dimension → Standard-Einheit angenommen und Warnung;
    ohne bekannte Dimension → unverändert gespeichert und Warnung; Einheit mit falscher Dimension → Änderung
    abgelehnt; Einheit derselben Dimension → in die kanonische Einheit umgerechnet.
  - **Schema v1:** Elementform `id`, `type`, `inputs`, `params`, `outputs`, `content`, `meta`;
    `format/schema/element.schema.json` wird festgeschrieben, `format/examples/` werden von Hand mit den
    richtigen Einheiten überführt.
  - **Dokument:** ein Automerge-Dokument je Projekt (automerge ≥ 0.12), Operationen, Speichern, Laden,
    Zusammenführen, Inhalts-Hash, Stapel-Import.
  - **Prüfung:** Befunde mit Schwere (Fehler, Warnung) statt Abbruch; ein fehlerhaftes Element zerbricht nie
    das übrige Modell (ADR-050).
  - **Werkzeug für Tests und Messung:** `cargo run -q --release -p cee-graph --example graphctl -- <befehl>`.

## Capabilities

### New Capabilities

- `einheiten`: Dimensionen, Einheitentabelle, Umrechnung, Lesen von Eingaben, Typdefinitionen mit
  Standard-Einheit
- `graph-kern`: Schema v1, Dokument mit Operationen, Merge und Inhalts-Hash, Prüfung mit Befunden (ap-05b
  ergänzt Abhängigkeiten, Zustände, Migrationen und Teil-Laden)

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs: ADR-016 (Referenzen nie über Indizes), ADR-028 (Graph als Quelle der Wahrheit, Schema ist
  Vertrag), ADR-029 (Datenmodell-Logik nur im Kern), ADR-033 (Automerge), ADR-043 (Komponenten und Instanzen
  in derselben Form), ADR-046 (keine Fachtypen im Schema; Typdefinitionen kommen von Fachpaketen), ADR-050
  (robust), ADR-054 (Fachpaket-API liefert Typdefinitionen), ADR-057 (Größen, kanonische Speicherung; wird
  präzisiert: Einheiten-Codes nach UCUM, Standard-Einheit je Parameter), ADR-058 (Adressen auf ID-Basis),
  ADR-062 (M1, kritischer Pfad). Kein Widerspruch zu einem ADR bekannt.
- Folgepunkte aus dem Review von PR #9: Einheiten im Schema erzwingen; Schwellen ohne pauschale Toleranz.
- Abnahmetests: `tests/acceptance/ap-05a-schema-einheiten/` (AK-1 bis AK-10, Zuordnung in design.md)
- Gate G2
- Referenzdaten: keine unter `tests/golden/`; die Umrechnungsfaktoren sind exakte Definitionen und stehen in
  design.md (Quelle: NIST SP 811, Anhang B; UCUM). Korpora erzeugt ein Generator mit bekanntem Sollergebnis.
- Abhängigkeiten: automerge, serde, serde_json, sha2, ulid (MIT oder Apache-2.0, ADR-034). Bibliotheken für
  Einheiten werden geprüft (design.md), eingebunden nur, wenn sie die Tabelle vollständig und exakt abdecken.
- Nicht-Ziele:
  - keine Abhängigkeiten, Berechnungszustände, Migrationen und kein Teil-Laden (ap-05b)
  - keine Formeln und Ausdrücke („3 × 400 mm“, Variablen), keine Temperatur mit Nullpunktverschiebung (°C, °F)
  - keine Auswahlfelder und Anzeige in der Oberfläche, keine Anzeigeeinstellung metrisch/zöllig (ap-08a)
  - keine Bindungen als NIF, WASM oder PyO3 (ap-40), keine Textprojektion (ap-24)
  - keine Auflösung von Komponenten und Instanzen (ap-13a), keine semantische Konfliktprüfung (ap-25)
  - keine Währungsumrechnung (ADR-057: nur mit Kurs, Quelle und Datum; später)
