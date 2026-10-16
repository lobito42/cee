## Why

Das wichtigste Versprechen ist ein atomares Datenmodell: Ein Achsenursprung wird genauso behandelt wie ein
komplettes Bauteil (ADR-028). Bevor Server, Client und Worker darauf bauen, muss belegt sein, dass eine
einheitliche Elementform alle Typen trägt, dass Automerge bei realistischen Größen schnell genug ist
(ADR-033), dass die Textprojektion deterministisch und diff-freundlich ist und dass derselbe Rust-Kern in
Elixir und im Browser identische Ergebnisse liefert (ADR-029).

## What Changes

- Entwurf des Elementschemas `format/schema/element.schema.json` (JSON Schema 2020-12)
- Beispielprojekt `format/examples/halter.json`: Halter plus Baugruppe aus drei Bauteilen, vollständig als Elemente
- Prototyp `spikes/datenmodell/` (Rust): Graph auf Automerge, Textprojektion, Benchmarks, Kommandozeile
- Messungen zu Größe, Lade-, Operations- und Merge-Zeiten sowie zu Rustler-NIF und WASM
- Bericht `docs/spikes/datenmodell.md` und maschinenlesbare Messwerte `docs/spikes/datenmodell.json`

## Capabilities

### New Capabilities

Keine. Der Spike ändert kein Produktverhalten (`skip_specs: true`); die Specs für den Graph-Kern entstehen
in ap-05 auf Basis dieses Ergebnisses.

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs (bestätigen oder überarbeiten): ADR-028, 029, 030, 033, 035
- Abnahmetests: `tests/acceptance/ap-01-spike-datenmodell/` (AK-1 bis AK-5)
- Gate G1
- Nicht-Ziele: keine Geometrie (ap-02), keine Live-Synchronisation zwischen Clients (ap-03), keine UI (ap-04),
  kein produktiver Code in `crates/graph` (ap-05)
