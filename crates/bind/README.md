# cee-bind – Fassade für die Bindungen

Eine Schicht über `cee-graph`, die genau die Kern-API aus ap-05a und ap-05b als Funktionen mit JSON-Text bzw.
Bytes an der Grenze anbietet (ADR-029). Alle drei Bindungen rufen nur diese Fassade auf und enthalten keine
eigene Logik:

```
crates/graph            cee-graph: Datenmodell (einzige Implementierung)
crates/bind             cee-bind: Fassade, Fehlerformat, Fachpaket-Register   ← hier
  examples/bindctl.rs   Prüfprogramm (Rust-Sollwerte)
crates/graph-nif        Rustler-NIF  → server/lib/cee_server/graph.ex (CeeServer.Graph)
crates/graph-wasm       wasm-bindgen → client/src/kern/pkg-node, pkg-web (npm run kern:build)
crates/graph-py         PyO3 (abi3)  → sdk/python (cee-sdk, Modul cee_sdk._graph)
crates/pkg-beispiel     Beispiel-Fachpaket (nur mit Feature pkg-beispiel)
```

Die Bindungs-Crates hängen nicht direkt von automerge ab; `cee-graph` hängt von keinem dieser Crates ab.
Lizenz aller Crates: MPL-2.0; `sdk/python` Apache-2.0.

## Fassade

| Funktion | Kern-API (`graphctl`) | Rückgabe |
| --- | --- | --- |
| `units()` | `units` | Einheitentabelle (JSON) |
| `parse(text, default?)` | `parse` | `{"value", "unit"}` oder Fehler |
| `convert(value, from, to)` | `convert` | Zahl oder Fehler |
| `Document::new()` | leeres Dokument | Handle |
| `Document::import(project, types?)` | `import` | Handle + `{"findings", "type_errors"}` |
| `Document::load(bytes, types?)` | Laden inkl. Migrationen | Handle (`invalid_document`, `schema_too_new`) |
| `doc.save()` | Speichern | Bytes |
| `doc.apply_op(op)` | eine Operation von `apply` | `{"result": "ok", "warnings"}` oder Fehler |
| `doc.apply(ops)` | `apply` | `{"results": [...]}` |
| `doc.export()`, `doc.hash()` | `export`, `hash` | Projekt-JSON (Text, bitgleich), Hex-Hash |
| `doc.merge(other)` | `merge` | – |
| `doc.validate()` | `validate` | `{"findings"}` |
| `doc.order()`, `doc.affected(ids)` | `order`, `affected` | `{"order", "skipped"}`, `{"affected"}` |
| `doc.subgraph(id)` | `subgraph` | `{"elements", "external_inputs", "materialized_count"}` |
| `doc.migrate()` | `migrate` | `{"before", "after"}` |
| `doc.element(id)` | Teil-Laden eines Elements | Element-JSON (`content` als IDs) oder `missing_target` |
| `doc.materialized_count()` | `materialized_count` | Zahl |
| `StatesHandle::new(doc)`, `event(e)`, `ready()`, `get()` | `states` | Zustände wie `graphctl states` |
| `packages()` | – | Namen der Fachpaket-Funktionen |
| `call(name, doc, args)` | – | Ergebnis der Fachpaket-Funktion |

**Fehler** haben an jeder Grenze die Form `{"code", "message", "element"}`: Codes des Kerns (z. B.
`unknown_unit`, `dimension_mismatch`, `cycle`, `schema_too_new`) plus `invalid_json`, `invalid_document`,
`missing_target` und `internal`. Jeder Aufruf läuft unter `catch_unwind`; mit Feature `test-hooks` löst
`debug_panic()` absichtlich einen Panic aus. In WASM gibt es kein Abwickeln: Ein Panic beendet den Aufruf mit
einer `WebAssembly.RuntimeError`, die die Prüfprogramme als `internal` melden; das Modul arbeitet danach weiter.

Scheduler der NIF: kurze Aufrufe (`units`, `parse`, `convert`, `apply_op`, `element`, `materialized_count`,
`states.event/ready/get`, `packages`) auf dem normalen Scheduler, alle übrigen als Dirty-CPU-NIF.

## Fachpaket-Funktionen anmelden

Ein Fachpaket-Crate hängt nur von `cee-graph` (und serde) ab und bietet lesende Funktionen an:

```rust
pub type Function = fn(&cee_graph::doc::Doc, &serde_json::Value)
    -> Result<serde_json::Value, (cee_graph::Error, Option<String>)>;
pub const FUNCTIONS: &[(&str, Function)] = &[("beispiel.summe", summe)];
```

`cee-bind` bindet es über ein optionales Feature ein (hier `pkg-beispiel = ["dep:cee-pkg-beispiel"]`) und
nimmt `FUNCTIONS` in sein Register auf (`registered()` in `src/lib.rs`). Die Bindungs-Crates reichen das
Feature weiter, so landet das Fachpaket im selben NIF, WASM-Modul und in derselben Python-Erweiterung
(offene Frage 2). Ohne Feature liefert `packages()` eine leere Liste. Schreiben ist nicht vorgesehen; das
Dokument kommt nur lesend (`&Doc`).

## Prüfprogramm `bindctl`

Gleiche Befehle und JSON-Ausgabe in fünf Laufzeiten (`run`, `load`, `merge`, `api`, `bench`):

| Laufzeit | Aufruf |
| --- | --- |
| Rust | `cargo run -q --release -p cee-bind --features pkg-beispiel,test-hooks --example bindctl -- <befehl>` |
| Elixir | `cd server && CEE_BIND_FEATURES=pkg-beispiel,test-hooks mix run --no-start priv/bindctl.exs <befehl>` |
| Node | `cd client && npm run -s kern:build -- --features pkg-beispiel,test-hooks && npm run -s kern:bindctl -- <befehl>` |
| Browser | `cd client && npx playwright install chromium && npm run -s kern:bindctl-browser -- <befehl>` |
| Python | `uv run --package cee-sdk maturin develop --release -m crates/graph-py/Cargo.toml --features pkg-beispiel,test-hooks`, dann `uv run --no-sync --package cee-sdk python sdk/python/tools/bindctl.py <befehl>` |

Hinweise: Die NIF baut der Mix-Compiler `:cee_nif` (`server/mix.exs`) immer im Release-Modus. JSON wird in
Node und im Browser mit wörtlichen Zahlen gelesen (`JSON.rawJSON`), damit `5.0` und `-0.0` unverändert beim
Kern ankommen. Das Rust-Prüfprogramm gibt die JSON-Texte der Fassade wörtlich aus, weil der
Standard-Parser von serde_json lange Dezimalzahlen nicht immer exakt rundet.

## Messwerte

`bindctl bench --project <graphctl synth --n 10000 --seed 1>`, Median aus 3 Läufen, Release-Builds mit
`pkg-beispiel,test-hooks`; GitHub-Runner ubuntu-latest (4 Kerne), 2026-10-23. Versionen: Rust 1.97.0, Erlang/OTP
27 mit Elixir 1.18.4 und Rustler 0.39, Node 22.22.0, Chromium Headless Shell 156 (Playwright 1.64.1),
CPython 3.12 mit PyO3 0.30 (abi3-py311), wasm-bindgen 0.2.129.

Eine Operation ist `apply_op` mit `set_param` einer Größe in `m` (umgerechnet in `mm`) an einem zufälligen
Element, je ein Aufruf über die Grenze einschließlich JSON-Kodierung im Host; 100 zum Aufwärmen, p95 über
1.000.

| Laufzeit | Operation p95 | Schwelle | Laden 10k | Hash 10k |
| --- | --- | --- | --- | --- |
| Rust (`rust_op_p95_ms`) | 0,078 ms | nur gemessen | 62 ms | 165 ms |
| Elixir/NIF (`nif_op_p95_ms`) | 0,082 ms | ≤ 1 ms | 64 ms | 197 ms |
| Node/WASM (`wasm_node_op_p95_ms`) | 0,23 ms | ≤ 5 ms | 111 ms | 277 ms |
| Browser/WASM (`wasm_browser_op_p95_ms`) | 0,2 ms | ≤ 5 ms | 115 ms | 272 ms |
| Python/PyO3 (`py_op_p95_ms`) | 0,08 ms | nur gemessen (offene Frage 3) | 62 ms | 175 ms |

`wasm_size_kb` (`client/src/kern/pkg-web/*.wasm`, unkomprimiert, mit Beispiel-Fachpaket): 3.019 KB. Die
Browser-Zeiten sind durch die Zeitauflösung von `performance.now()` in Chromium auf 0,1 ms gerundet.
