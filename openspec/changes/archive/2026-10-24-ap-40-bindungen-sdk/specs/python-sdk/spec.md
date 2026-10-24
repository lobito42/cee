## ADDED Requirements

### Requirement: Python-Paket über PyO3
Das Paket `cee-sdk` unter `sdk/python` SHALL den Kern über PyO3 einbinden, unter Apache-2.0 stehen (ADR-034),
mit Python ≥ 3.11 laufen und Typ-Hints mitliefern (`py.typed`). Es SHALL `Document` und `States` mit allen
Funktionen der Fassadentabelle aus design.md anbieten und Fehler als `CeeError` mit `code`, `message` und
`element` werfen.

#### Scenario: [auto] Paket baut und ist vollständig
- **WHEN** das Paket mit maturin im Release-Modus gebaut und importiert wird
- **THEN** gelingt der Import, `sdk/python/pyproject.toml` nennt die Lizenz Apache-2.0, `py.typed` liegt im
  Paket, und `Document` und `States` haben jede Methode aus design.md (0 fehlend)

#### Scenario: [auto] Fehler als Ausnahme
- **WHEN** `Document.load` mit Bytes aufgerufen wird, die kein Dokument sind, und `apply_op` mit einer Größe in
  unbekannter Einheit
- **THEN** wird jeweils `CeeError` geworfen, mit `code` `invalid_document` bzw. `unknown_unit`

### Requirement: Größen nur über die Einheitentabelle des Kerns
`Quantity` SHALL eine unveränderliche Größe aus Wert und UCUM-Code sein; Lesen (`Quantity.parse`) und Umrechnen
(`Quantity.to`) SHALL der Kern übernehmen, das SDK enthält keine eigenen Umrechnungsfaktoren (ADR-057).

#### Scenario: [auto] Umrechnung gleich dem Kern
- **WHEN** für jedes Paar von Einheiten derselben Dimension aus der Einheitentabelle `Quantity(1.5, von).to(nach)`
  berechnet und mit `graphctl convert 1.5 <von> <nach>` verglichen wird
- **THEN** sind alle Ergebnisse bitgleich, und über Dimensionen hinweg wird `CeeError` mit `dimension_mismatch`
  geworfen

#### Scenario: [auto] Eingaben lesen wie der Kern
- **WHEN** `Quantity.parse` die Eingaben „1,2 m“, „1200 mm“ und „12“ mit Standard-Einheit `mm`, „90°“ mit
  Standard-Einheit `rad` und „5 kg“ mit Standard-Einheit `mm` liest
- **THEN** stimmen die ersten vier Ergebnisse mit `graphctl parse` überein (Wert bitgleich, Code gleich), und
  das fünfte wirft `CeeError` mit demselben Fehlercode wie `graphctl parse` (`dimension_mismatch`)

### Requirement: Lesezugriff für Script-Elemente
Das SDK SHALL ein Element lesend als `Element` mit `id`, `type`, `params`, `inputs`, `outputs`, `content` und
`meta` liefern; Größen in `params` SHALL als `Quantity` in kanonischer Einheit erscheinen, Geld als
Zuordnung mit `amount` und `currency`. Das ist der Umfang, den der Worker (ap-06) für Script-Elemente braucht;
Geometrie-Hilfen gehören nicht dazu.

#### Scenario: [auto] Element eines Script-Elements lesen
- **WHEN** ein Projekt mit einem Element vom Typ `script` (zwei Längen, ein Winkel, ein Geldbetrag, ein Eingang,
  zwei Ausgänge) importiert und `doc.element(id)` gelesen wird
- **THEN** sind die drei Größen `Quantity` mit `mm` bzw. `rad` und den Werten aus dem exportierten Projekt-JSON,
  der Geldbetrag eine Zuordnung mit Zeichenkette `amount`, und `inputs` und `outputs` gleichen dem Export

#### Scenario: [auto] Teil-Laden bleibt erhalten
- **WHEN** ein gespeichertes Dokument mit 100.000 Elementen geladen und genau ein Element mit `doc.element(id)`
  gelesen wird
- **THEN** ist `doc.materialized_count()` vor dem Zugriff 0 und danach 1
