# cee-sdk – Python-SDK

Python-Zugang zum Element-Graphen von CEE. Alle Wirkung liegt im Rust-Kern (`crates/graph`), eingebunden über
die Fassade `crates/bind` und die PyO3-Erweiterung `crates/graph-py` (Modul `cee_sdk._graph`, ADR-029). Das
SDK selbst wandelt nur zwischen Python-Werten und JSON; es kennt keine Umrechnungsfaktoren und keine Regeln
des Datenmodells.

Lizenz: Python-Code Apache-2.0 (`sdk/LICENSE`), die eingebaute Erweiterung MPL-2.0 (dateiweise); das Wheel
trägt daher `Apache-2.0 AND MPL-2.0`.

## Installation (Entwicklung)

```sh
uv run --package cee-sdk maturin develop --release -m crates/graph-py/Cargo.toml
uv run --no-sync --package cee-sdk python -c "import cee_sdk"
```

`--no-sync` verhindert, dass uv den Entwicklungs-Build wieder ersetzt. Für Prüfungen mit dem
Beispiel-Fachpaket: `... maturin develop --release -m crates/graph-py/Cargo.toml --features pkg-beispiel,test-hooks`.
Tests: `uv run --no-sync --package cee-sdk pytest -q sdk/python/tests`.

## Beispiel

```python
from cee_sdk import CeeError, Document, Quantity, States

project = {
    "schema_version": 1,
    "elements": [
        {
            "id": "a",
            "type": "thing",
            "inputs": {},
            "params": {"h": {"value": 12, "unit": "mm"}},
            "outputs": {"out": "thing"},
            "content": [],
            "meta": {"name": "a"},
        },
    ],
}
doc = Document.import_project(project)
doc.apply_op({"op": "set_param", "id": "a", "param": "h", "value": {"value": 1.2, "unit": "m"}})

el = doc.element("a")  # Lesezugriff wie für ein Script-Element
el.params["h"]  # Quantity(value=1200.0, unit='mm')
Quantity.parse("1,2 m", default="mm").to("[in_i]")

try:
    doc.apply_op({"op": "set_param", "id": "a", "param": "h", "value": {"value": 1, "unit": "furlongx"}})
except CeeError as e:
    print(e.code)  # unknown_unit

states = States(doc)
states.ready()  # ["a"]
data = doc.save()  # bytes; Document.load(data) öffnet sie wieder
```

## Öffentliche API

- `Document`: `new`, `import_project`, `load`, `save`, `apply_op`, `apply`, `export` (und `export_text`),
  `hash`, `merge`, `validate`, `order`, `affected`, `subgraph`, `migrate`, `element`, `materialized_count`
- `States(doc)` bzw. `States.new(doc)`: `event`, `ready`, `get`
- `Quantity(value, unit)` (unveränderlich): `Quantity.parse(text, default=None)`, `q.to(unit)`; `units()`
- `Element` (lesend): `id`, `type`, `params` (Größen als `Quantity`, Geld als `dict`), `inputs`, `outputs`,
  `content`, `meta`
- `CeeError(code, message, element)`
- `packages()`, `call(name, doc, args)` für Fachpaket-Funktionen

Script-Element-Hilfen mit Geometrie (`feature`, `publish`) kommen mit ap-06.
