## Context

Siehe proposal.md – Why. Ausgangslage nach ap-05b: `crates/graph` (cee-graph) mit Einheiten, Typdefinitionen,
Schema v1, Dokument auf automerge 0.12, Prüfung, Abhängigkeiten, Zuständen, Migrationen, Teil-Laden und
`graphctl`. Inhalts-Hash = SHA-256 über die kanonische JSON-Form, unabhängig von Historie und Actor.

Prototypen, die als Vorlage dienen, aber keine Abhängigkeit werden: `spikes/datenmodell/` (NIF, WASM für Node)
und `spikes/sync/` (`native/sync_nif`, `wasm/crate`, `build.sh`). Erfahrungen daraus:

- Rustler 0.39: Dokument als Ressource, kurze Aufrufe auf dem normalen Scheduler, Laden, Hash und Listen als
  Dirty-CPU; Fehler als `{:error, grund}`; unter macOS Link-Optionen `-undefined dynamic_lookup`.
- WASM: Zufall für Actor-IDs aus der JS-Laufzeit (`getrandom` mit `wasm_js`); `wasm-bindgen-cli` muss exakt
  zur Crate-Version passen.
- Messwerte (GitHub-Runner, `docs/spikes/datenmodell.json`, `docs/spikes/sync.md`): Änderung p95 NIF 0,055 ms,
  WASM in Node 0,113 ms; Hash über 10.000 Elemente WASM p50 793 ms, nativ rund 0,45 s.

## Goals / Non-Goals

**Goals:** eine Fassade, drei dünne Bindungen und ein schlankes Python-SDK, die in fünf Laufzeiten (Rust, Elixir,
Node, Browser, Python) bitgleiche Ergebnisse liefern; Fachpaket-Crates nutzen dieselbe Schicht ohne eigene
Datenmodell-Logik; alle Messwerte von den Abnahmetests selbst nachgemessen.

**Non-Goals:** siehe proposal.md – Impact.

## Decisions

### Aufbau

```
crates/bind/            cee-bind: Fassade (JSON/Bytes an der Grenze), Fehlerformat, Fachpaket-Register
  examples/bindctl.rs   Prüfprogramm Rust (Sollwerte)
crates/graph-nif/       Rustler-NIF, nur Aufrufe in cee-bind
crates/graph-wasm/      wasm-bindgen, nur Aufrufe in cee-bind
crates/graph-py/        PyO3 (abi3, ab Python 3.11), nur Aufrufe in cee-bind
crates/pkg-beispiel/    Beispiel-Fachpaket-Crate, nur mit Feature `pkg-beispiel`
server/lib/cee_server/graph.ex   CeeServer.Graph (use Rustler, mode: :release)
server/priv/bindctl.exs          Prüfprogramm Elixir
client/package.json              Skripte kern:build, kern:bindctl, kern:bindctl-browser
client/tools/bindctl-node.mjs, client/tools/bindctl-browser.mjs, client/tools/bindctl.html
sdk/python/             cee-sdk (Apache-2.0, maturin, Modul cee_sdk, py.typed)
sdk/python/tools/bindctl.py      Prüfprogramm Python (nicht im Wheel)
```

- Alle Crates liegen im Workspace (`crates/*`), Lizenz MPL-2.0. `cee-graph` hängt von keinem dieser Crates ab.
- Die drei Bindungs-Crates und `pkg-beispiel` hängen nicht direkt von automerge ab, sondern nur von `cee-bind`
  bzw. `cee-graph`, serde/serde_json und ihrer Bindungsbibliothek. So bleibt Datenmodell-Logik im Kern.
- Regeln aus `docs/rules/kern.md`: kein `unsafe`, kein `unwrap`/`expect`/`panic!` außerhalb von Tests; Fehler
  werden in strukturierte Fehler gewandelt.
- `rust-toolchain.toml` bekommt das Ziel `wasm32-unknown-unknown`. Root-`pyproject.toml` nimmt `sdk/python` in
  den uv-Workspace auf.

### Fassade `cee-bind`

Eingaben und Ausgaben an der Grenze sind JSON-Text (UTF-8) oder Bytes. Die Hosts dürfen Werte ihrer Sprache
annehmen (Map, dict, Objekt), serialisieren sie aber vor dem Aufruf zu JSON; geparst wird nur in Rust. Damit
sind Zahlen, Zeichenketten und Reihenfolgen in allen Laufzeiten gleich.

| Funktion | Kern-API (ap-05a/ap-05b, `graphctl`) | Rückgabe |
| --- | --- | --- |
| `units()` | `units` | Einheitentabelle (JSON) |
| `parse(text, default?)` | `parse` | Größe oder Fehler |
| `convert(value, from, to)` | `convert` | Zahl oder Fehler |
| `Doc.new()` | leeres Dokument | Handle |
| `Doc.import(project, types?)` | `import` | Handle + Befunde |
| `Doc.load(bytes, types?)` | Laden inkl. Migrationen beim Öffnen | Handle |
| `doc.save()` | Speichern | Bytes |
| `doc.apply_op(op)` | eine Operation von `apply` | `ok` + Warnungen oder Fehlercode |
| `doc.apply(ops)` | `apply` | Ergebnis je Operation |
| `doc.export()`, `doc.hash()` | `export`, `hash` | Projekt-JSON, Hex-Hash |
| `doc.merge(other)` | `merge` | – (ändert `doc`) |
| `doc.validate()` | `validate` | Befunde |
| `doc.order()`, `doc.affected(ids)` | `order`, `affected` | wie `graphctl` |
| `doc.subgraph(id)` | `subgraph` | wie `graphctl` |
| `doc.migrate()` | `migrate` | Version vorher und nachher |
| `doc.element(id)` | Lesen eines Elements (Teil-Laden) | Element-JSON oder `missing_target` |
| `doc.materialized_count()` | `materialized_count` (ap-05b) | Zahl |
| `States.new(doc)`, `states.event(e)`, `states.ready()`, `states.get()` | `states` | Zustände, `ready()` |
| `packages()` | – | angemeldete Fachpaket-Funktionen |
| `call(name, doc, args)` | – | Ergebnis der Fachpaket-Funktion |

- Formen von Operationen, Befunden, Projekt-JSON und Typdefinitionen sind genau die von `graphctl`; ap-40
  definiert keine neuen.
- **Fehlerformat** an jeder Grenze: `{"code": "<code>", "message": "<text>", "element": "<id>"|null}`. Codes
  sind die des Kerns (z. B. `unknown_unit`, `dimension_mismatch`, `cycle`, `schema_too_new`) plus drei der
  Bindungsschicht: `invalid_json` (Eingabe kein gültiges JSON oder falsche Form), `invalid_document` (Bytes
  nicht ladbar), `internal` (abgefangener Panic; darf nie vorkommen, wird aber sauber gemeldet).
- Jeder Aufruf läuft in der Fassade unter `std::panic::catch_unwind`. Zum Prüfen gibt es nur mit Feature
  `test-hooks` eine Funktion `debug_panic()`, die absichtlich einen Panic auslöst.
- Handles sind nicht threadübergreifend geteilt; NIF-Ressourcen halten das Dokument hinter einem Mutex.

### Rustler-NIF und `CeeServer.Graph`

- `CeeServer.Graph` bietet die Funktionen der Tabelle mit Typespecs an; Rückgabe `{:ok, wert}` oder
  `{:error, %{code: String.t(), message: String.t(), element: String.t() | nil}}`. Dokument und Zustände sind
  Ressourcen (Referenzen), die der aufrufende Prozess hält (ADR-030).
- Normaler Scheduler (erwartet < 1 ms): `units`, `parse`, `convert`, `apply_op`, `element`,
  `materialized_count`, `states.event`, `states.ready`, `states.get`, `packages`.
- **Dirty-CPU** (kann > 1 ms dauern): `new`, `import`, `load`, `save`, `apply`, `export`, `hash`, `merge`,
  `validate`, `order`, `affected`, `subgraph`, `migrate`, `States.new`, `call`.
- Die NIF wird immer im Release-Modus übersetzt (`mode: :release`), auch für `mix test`, damit Messwerte stimmen.
- Rustler als Hex-Abhängigkeit in `server/mix.exs`; `mix compile` baut die NIF. Kein Dokumentprozess, kein
  GenServer – das ist ap-07a.

### WASM

- `crates/graph-wasm` mit wasm-bindgen; Fehler werden als JS-Objekt `{code, message, element}` geworfen.
- `npm run kern:build` im Client: `cargo build --release --target wasm32-unknown-unknown -p cee-graph-wasm`
  (mit `getrandom_backend="wasm_js"`), danach `wasm-bindgen` in exakt der Version aus `Cargo.lock` nach
  `client/src/kern/pkg-node` (`--target nodejs`) und `client/src/kern/pkg-web` (`--target web`); fehlt das Ziel
  oder `wasm-bindgen-cli` in passender Version, installiert das Skript es lokal unter `target/tools` wie
  `spikes/sync/build.sh`. Beide Ordner sind gebaut, nicht eingecheckt.
- Browser-Test: `client/tools/bindctl-browser.mjs` startet einen statischen Server auf `127.0.0.1`, öffnet
  `client/tools/bindctl.html` in Headless-Chromium (Playwright, devDependency im Client) und gibt das Ergebnis
  auf stdout aus (offene Frage 4).

### PyO3 und Python-SDK

- `sdk/python/pyproject.toml`: Name `cee-sdk`, Modul `cee_sdk`, Lizenz Apache-2.0 (offene Frage 1), Build mit
  maturin; die Erweiterung `cee_sdk._graph` kommt aus `crates/graph-py` (abi3-py311). Bauen:
  `uv run --package cee-sdk maturin develop --release -m crates/graph-py/Cargo.toml` (oder `uv sync`, wenn der
  Build-Backend-Weg trägt).
- Öffentliche Python-API (mit Typ-Hints, `py.typed`):
  - `Document` mit `new`, `import_project`, `load`, `save`, `apply_op`, `apply`, `export`, `hash`, `merge`,
    `validate`, `order`, `affected`, `subgraph`, `migrate`, `element`, `materialized_count`; Eingaben als
    `dict`/`list` oder JSON-Text, Ausgaben als `dict`/`list`
  - `States` mit `event`, `ready`, `get`
  - `Quantity(value: float, unit: str)` als unveränderliche Dataclass; `Quantity.parse(text, default=None)`,
    `q.to(unit)` – beide rufen den Kern, das SDK enthält keine Umrechnungsfaktoren; `units()`
  - `Element` (lesend): `id`, `type`, `params` (Größen als `Quantity`, Geld als `dict`, sonstiges unverändert),
    `inputs`, `outputs`, `content`, `meta` – das, was der Worker einem Script-Element übergibt
  - `CeeError(Exception)` mit `code`, `message`, `element`
  - `packages()`, `call(name, doc, args)`
- Lange Aufrufe geben den GIL frei (`allow_threads`), damit der Worker parallel arbeiten kann.

### Fachpaket-Funktionen

- `cee-bind` hat ein statisches Register: ein Fachpaket-Crate meldet Funktionen mit Namen `<paket>.<funktion>`
  an. Signatur: lesender Zugriff auf das Dokument über die öffentliche API von `cee-graph`, Argumente und
  Ergebnis als JSON, Fehler im Fehlerformat. Schreiben ist nicht vorgesehen (Nicht-Ziel).
- Eingebunden wird ein Fachpaket-Crate über ein Cargo-Feature von `cee-bind`, das alle drei Bindungs-Crates
  weiterreichen (offene Frage 2). Ohne Feature liefert `packages()` eine leere Liste.
- `crates/pkg-beispiel` (Feature `pkg-beispiel`) ist fachneutral und meldet genau eine Funktion an:
  `beispiel.summe` mit Argumenten `{"type": "<elementtyp>", "param": "<name>"}`; Ergebnis
  `{"count": <Anzahl Elemente dieses Typs>, "sum": {"value": <Summe>, "unit": "<kanonischer Code>"}}`. Haben die
  Werte verschiedene Dimensionen, Fehler `dimension_mismatch` mit dem ersten abweichenden Element; Elemente ohne
  den Parameter zählen mit, tragen aber nichts bei. Abhängigkeiten nur `cee-graph`, `serde_json`.
- Die Abnahme-Builds schalten `pkg-beispiel` und `test-hooks` ein; ausgelieferte Builds nicht.

### Prüfprogramm `bindctl` (Schnittstelle der Abnahmetests)

Gleiche Befehle und gleiche JSON-Ausgabe auf stdout in allen fünf Laufzeiten:

| Laufzeit | Aufruf |
| --- | --- |
| Rust (Sollwerte) | `cargo run -q --release -p cee-bind --features pkg-beispiel,test-hooks --example bindctl -- <befehl>` |
| Elixir (NIF) | `cd server && mix run --no-start priv/bindctl.exs <befehl>` |
| Node (WASM) | `cd client && npm run -s kern:bindctl -- <befehl>` |
| Browser (WASM) | `cd client && npm run -s kern:bindctl-browser -- <befehl>` |
| Python (PyO3) | `uv run --package cee-sdk python sdk/python/tools/bindctl.py <befehl>` |

| Befehl | Wirkung |
| --- | --- |
| `run <szenario.json> [--save <datei>]` | Szenario ausführen; Ausgabe `results`, `hash`, `export_sha256`, `queries`, `errors` |
| `load <datei> [--ops <ops.json>]` | Dokument-Bytes laden, Operationen anwenden; Ausgabe `hash`, `results` |
| `merge <datei> <datei> [--save <datei>]` | zweites in erstes zusammenführen; Ausgabe `hash` |
| `api` | Liste der vorhandenen Funktionen (Namen aus der Fassadentabelle) |
| `bench --project <projekt.json> --json` | Leistungskennzahlen dieser Laufzeit |

**Szenario-Datei:**

```json
{
  "types": [ /* Typdefinitionen wie graphctl --types */ ],
  "project": { /* Projekt-JSON wie graphctl import */ },
  "ops": [ /* Operationen wie graphctl apply */ ],
  "states": [ /* Ereignisse wie graphctl states */ ],
  "queries": ["validate", "order", "affected:<id>", "subgraph:<id>", "migrate", "element:<id>",
              "units", "parse:<text>|<default>", "convert:<wert>|<von>|<nach>",
              "packages", "call:beispiel.summe|<args-json>"],
  "errors": [ /* Aufrufe, die scheitern sollen, z. B. {"load_bytes_b64": "..."}, {"op": {...}}, {"debug_panic": true} */ ]
}
```

`export_sha256` ist SHA-256 über das exportierte Projekt-JSON in der Form, die die Fassade liefert (bitgleich
zu `graphctl export`). Der Test vergleicht die Ausgaben der Laufzeiten nach JSON-Parsen auf Gleichheit; nur
`bench` darf sich unterscheiden.

### Performance-Budgets (GitHub-Runner ubuntu-latest, Release-Builds)

Messung in `bindctl bench`: Projekt mit 10.000 Elementen aus `graphctl synth --n 10000 --seed 1`, importiert und
gespeichert, dann geladen. Eine **Operation** ist `apply_op` mit `set_param` einer Größe in einer anderen Einheit
derselben Dimension (z. B. `m` → umgerechnet in `mm`) an einem zufälligen Element, je ein Aufruf über die Grenze
einschließlich JSON-Kodierung im Host; 100 Aufrufe zum Aufwärmen, dann p95 über 1.000.

| Kennzahl | Schwelle | Spike-Wert (Abstand) |
| --- | --- | --- |
| `nif_op_p95_ms` | ≤ 1 ms | 0,055 ms (Faktor 18) |
| `wasm_node_op_p95_ms` | ≤ 5 ms | 0,113 ms (Faktor 44) |
| `wasm_browser_op_p95_ms` | ≤ 5 ms | – (Faktor wie Node erwartet) |
| `rust_op_p95_ms`, `py_op_p95_ms` | nur gemessen (offene Frage 3) | – |
| `load_10k_ms`, `hash_10k_ms` je Laufzeit | nur gemessen | Hash WASM p50 793 ms |
| `wasm_size_kb` (`pkg-web/*.wasm`) | nur gemessen | – |

Die Spike-Operation war ohne Einheitenregel, Prüfung und Zyklustest; die Kern-Operation aus ap-05a/ap-05b kostet
mehr (Budget nativ dort ≤ 5 ms). Der Abstand oben ist deshalb nötig. Die Abnahmetests messen selbst nach: Median
aus 3 Läufen von `bindctl bench` je Laufzeit, Vergleich ohne pauschale Toleranz mit der Schwelle.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-40-bindungen-sdk/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | 20 Szenarien (10 aus `synth` mit Seeds 1–10 und je 200 zufälligen Operationen, 2 aus `format/examples/`, 8 gezielte: Einheitenregeln, Zyklus, Merge-Zyklus, Zustände, Teil-Laden, Unicode in `meta`, Zahlen 0.1 / 1e-9 / 1/3 / 2^53, Geld) in 5 Laufzeiten: `hash`, `export_sha256`, `results`, `queries` gleich den Rust-Sollwerten | Gleiche Ergebnisse |
| AK-2 | Bytes und Merge über Laufzeiten: in jeder Laufzeit gespeichert, in jeder anderen geladen (25 Paare), gleicher Hash; zwei Zweige aus NIF und WASM bzw. WASM und PyO3 in beiden Richtungen zusammengeführt, gleicher Hash | Gleiche Ergebnisse |
| AK-3 | `bindctl api` je Laufzeit enthält jede Funktion der Fassadentabelle | Fassade |
| AK-4 | 10 Fehlerfälle (`invalid_json`, `invalid_document`, `unknown_unit`, `dimension_mismatch`, `invalid_money`, `cycle`, `schema_too_new`, `missing_target`, `internal` per `debug_panic`, falsche Form einer Operation) liefern in allen Laufzeiten denselben Code; die Laufzeit läuft danach weiter und führt ein weiteres Szenario fehlerfrei aus | Fehler |
| AK-5 | Scheduler: jede Dirty-CPU-Funktion aus design.md trägt in `crates/graph-nif` `schedule = "DirtyCpu"`, keine andere; Elixir-Typespecs an allen öffentlichen Funktionen von `CeeServer.Graph` | NIF |
| AK-6 | Messwerte: Schwellen und gemessene Werte | Leistung |
| AK-7 | Fachpaket: `beispiel.summe` in 5 Laufzeiten gleich und gegen Rechnung im Test; Dimensionsfehler; `pkg-beispiel` und Bindungs-Crates ohne direkte automerge-Abhängigkeit, `cee-graph` ohne Abhängigkeit auf `cee-bind` oder `pkg-beispiel` (`cargo metadata`); ohne Feature `packages()` leer | Fachpaket-Funktionen |
| AK-8 | Python-SDK: `Document`, `States`, `Quantity`, `Element`, `CeeError` wie beschrieben; `Quantity.to` an allen Einheiten der Tabelle gleich `graphctl convert`; Lizenz Apache-2.0 in `sdk/python/pyproject.toml`; `py.typed` vorhanden | Python-SDK |
| AK-9 | Qualität: `cargo fmt --check`, `cargo clippy --all-targets --all-features -- -D warnings`, `cargo test -q` für die neuen Crates; Suche nach `unwrap(`, `expect(`, `panic!`, `unsafe` außerhalb von Tests in den neuen Crates = 0 (außer `debug_panic` hinter `test-hooks`); `mix compile --warnings-as-errors`, `mix credo --strict`, `mix dialyzer`; `uv run ruff check sdk/python`; `cd client && npm run lint`; Lizenzprüfung für Cargo, npm, Mix und Python 0 Verstöße | Qualität |

## Risks / Trade-offs

- **Operation über NIF teurer als im Spike:** Die Kern-Operation enthält jetzt Einheitenregel, Prüfung und
  Zyklustest. Wird 1 ms verfehlt, liegt das am Kern, nicht an der Bindung; dann wird es im PR mit
  `rust_op_p95_ms` belegt und als offene Frage gemeldet, nicht durch eine schwächere Operation umgangen.
- **JSON an der Grenze kostet Zeit** (Kodieren im Host, Parsen in Rust). Dafür ist die Gleichheit über alle
  Laufzeiten einfach zu sichern, und eine spätere Swift-Bindung (ap-44) braucht nichts Neues. Bei 10.000
  Elementen ist der Export als Text messbar, aber nicht im Latenzpfad.
- **Browser im Test** braucht Chromium und ist langsamer zu starten; die Messung startet die Zeit erst nach dem
  Laden des Moduls.
- **Rustler unter macOS** braucht Link-Optionen; Abnahme nur auf Linux (offene Frage 7).
- **Ein Artefakt mit allen Fachpaketen** wächst mit jedem Paket (offene Frage 2); `wasm_size_kb` wird gemessen,
  damit das sichtbar bleibt.

## Open Questions

Siehe proposal.md – Offene Fragen (1 bis 7, je mit Empfehlung).
