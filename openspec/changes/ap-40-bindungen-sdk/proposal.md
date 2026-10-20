## Why

Der Kern `crates/graph` ist die einzige Implementierung des Datenmodells (ADR-029). Nach ap-05a und ap-05b gibt
es ihn aber nur als Rust-Bibliothek mit der Kommandozeile `graphctl`. Server (Elixir), Browser (TypeScript) und
Python-Worker (ap-06) brauchen ihn als Bibliothek in ihrer Laufzeit, sonst entstehen dort eigene Nachbauten des
Datenmodells. Die Spikes ap-01 und ap-03 haben Rustler-NIF und WASM als Prototyp bestätigt (gleicher Hash nativ,
NIF und WASM; Änderung p95 0,055 ms über NIF, 0,113 ms über WASM in Node), PyO3 fehlt bisher ganz. ap-40 macht
daraus produktive Bindungen und ein schlankes Python-SDK und legt fest, wie Fachpaket-Crates dieselbe
Bindungsschicht nutzen (ADR-054). ap-40 liegt auf dem kritischen Pfad ap-05a → ap-05b → ap-40 → ap-39 → ap-06
(ADR-062); ap-06, ap-07a und ap-08a setzen es voraus.

## What Changes

- **Fassade `crates/bind` (cee-bind, MPL-2.0):** eine Schicht über `cee-graph`, die genau die Kern-API aus
  ap-05a und ap-05b als Funktionen mit JSON-Text bzw. Bytes an der Grenze anbietet, mit einheitlichem Fehlerformat
  `{code, message, element}`. Alle drei Bindungen rufen nur diese Fassade auf; keine Bindung enthält eigene Logik.
- **Rustler-NIF `crates/graph-nif`** und Elixir-Modul `CeeServer.Graph` in `server/`: Dokument als
  NIF-Ressource, kurze Aufrufe auf dem normalen Scheduler, alles Längere als Dirty-CPU-NIF, Fehler als
  `{:error, map}`, Panics erreichen die BEAM nie.
- **WASM `crates/graph-wasm`** (wasm-bindgen): ein Paket für Node und eines für den Browser, gebaut über ein
  npm-Skript im Client; Typen aus wasm-bindgen.
- **PyO3 `crates/graph-py`** und **Python-SDK `sdk/python`** (Paket `cee-sdk`, Apache-2.0, gebaut mit maturin):
  `Document`, `Quantity`, `CeeError`, Einheitenfunktionen und Lesezugriff auf Elemente, wie ihn der Worker
  (ap-06) für Script-Elemente braucht.
- **Fachpaket-Funktionen:** Register in der Fassade, über das ein Fachpaket-Crate lesende Funktionen anmeldet,
  die alle drei Bindungen über einen generischen Aufruf erreichbar machen. Belegt mit einem fachneutralen
  Beispiel-Crate `crates/pkg-beispiel`, das nur in Test-Builds eingeschaltet ist.
- **Prüfprogramme `bindctl` je Laufzeit** (Rust, Elixir, Node, Browser, Python) mit derselben Schnittstelle:
  Szenario aus JSON anwenden, Hash und Ergebnisse ausgeben, Leistung messen.

## Capabilities

### New Capabilities

- `bindungen`: Fassade, Rustler-NIF, WASM, PyO3, gleiche Ergebnisse und Hashes in allen Laufzeiten,
  Fehlerformat, Leistung, Fachpaket-Funktionen
- `python-sdk`: Python-Paket über PyO3 mit Dokument, Größen, Fehlern und Lesezugriff für Script-Elemente

### Modified Capabilities

Keine. Die Kern-API (`graph-kern`, `einheiten` aus ap-05a/ap-05b) bleibt unverändert; ap-40 bindet sie nur ein.

## Impact

- Betroffene ADRs: ADR-029 (Kern als NIF, WASM, PyO3; Panics erreichen die BEAM nicht), ADR-030 (Dokument als
  Ressource eines Prozesses, keine Geometrie in der BEAM), ADR-031 (Tauri bindet den Kern nativ, ohne diese
  Schicht), ADR-032 (keine Geometrie im Kern und in den Bindungen), ADR-033 (Dokument-Bytes und Merge über
  Laufzeitgrenzen), ADR-034 (Lizenzen: Bindungs-Crates MPL-2.0, `sdk/python` Apache-2.0; alle neuen
  Abhängigkeiten MIT oder Apache-2.0), ADR-046 und ADR-054 (Fachpaket-Crates hängen vom Kern ab, nie umgekehrt;
  eingebunden über dieselben Bindungen), ADR-057 (Größen und Umrechnung nur über die Einheitentabelle des
  Kerns), ADR-059 und ADR-062 (M1, kritischer Pfad). Kein Widerspruch zu einem ADR bekannt. Der Nachtrag zu
  ADR-059 nennt „PyO3/SDK nach M2“ als offene Möglichkeit; ADR-062 führt ap-40 ausdrücklich in M1, dem folgt
  dieser Change.
- Setzt ap-05a und ap-05b voraus (Kern-API, `graphctl`, Generator `graphctl synth`).
- Abnahmetests: `tests/acceptance/ap-40-bindungen-sdk/` (AK-1 bis AK-9, Zuordnung in design.md)
- Gate G2
- Referenzdaten: keine unter `tests/golden/`. Szenarien erzeugt der Test aus `graphctl synth` und
  `format/examples/`; Sollwerte liefert die Rust-Laufzeit (`bindctl` nativ), die übrigen Laufzeiten werden
  dagegen verglichen.
- Neue Abhängigkeiten: rustler (Hex und Crate), wasm-bindgen und wasm-bindgen-cli (exakt gleiche Version),
  pyo3, maturin (nur Bau), Playwright mit Chromium (nur Test, offene Frage 4) – alle MIT oder Apache-2.0
  (ADR-034).
- Nicht-Ziele:
  - keine Geometrie, kein Kernel-Protokoll, kein Worker und kein Inhalts-Hash je Element für den
    Geometrie-Cache (ap-06)
  - kein Dokumentprozess, kein Speichern in PostgreSQL, keine Channels und kein Sync-Protokoll über das Netz
    (ap-07a, ap-07b); `CeeServer.Graph` ist nur die Bibliotheksschicht
  - keine Oberfläche und keine TypeScript-Hülle über den generierten Typen hinaus (ap-08a, ap-08b)
  - keine öffentliche Fachpaket-API, kein Manifest, keine Sandbox, kein Laden fremder Fachpakete zur Laufzeit
    (ap-08a, ap-27); kein echtes Fachpaket (Akustik ist F1 nach der Beta, ADR-062)
  - keine schreibenden Fachpaket-Funktionen; Änderungen bleiben Operationen des Kerns
  - keine Script-Element-Hilfen mit Geometrie (`feature`, `publish` aus `parts/examples/halter.py`; offene
    Frage 6), keine Ausführung von Script-Code
  - keine Veröffentlichung auf PyPI, npm oder Hex, keine vorkompilierten Pakete (ap-16)
  - keine Swift-Bindung und kein UniFFI (ap-44); die Fassade ist aber so geschnitten, dass sie möglich bleibt
  - keine Änderung an der Kern-API, an Schema oder Hash-Definition

## Offene Fragen

Nur das Kernteam kann entscheiden; die Umsetzung folgt bis dahin der Empfehlung.

1. **Lizenz des Python-Pakets.** Die PyO3-Crate liegt unter `crates/graph-py` (MPL-2.0, wie alle Crates), der
   Python-Code unter `sdk/python` (Apache-2.0). Das gebaute Wheel enthält beides.
   *Empfehlung:* so trennen; Lizenzangabe des Wheels `Apache-2.0 AND MPL-2.0`, beide Lizenztexte im Wheel.
   Die MPL gilt dateiweise und erlaubt das.
2. **Fachpaket-Crates im selben Artefakt oder je eigenes?** Dokument-Handles lassen sich nicht zwischen
   getrennten NIF-Bibliotheken, WASM-Modulen oder Python-Erweiterungen weiterreichen; ein eigenes Artefakt je
   Fachpaket müsste das Dokument jedes Mal als Bytes übergeben.
   *Empfehlung:* Fachpaket-Crates werden per Cargo-Feature in dasselbe NIF, dasselbe WASM-Modul und dieselbe
   Python-Erweiterung übersetzt. Fremde Fachpakete zur Laufzeit klärt ap-27.
3. **Schwelle für eine Operation über PyO3.** Das Konzept nennt Schwellen nur für NIF (≤ 1 ms) und WASM
   (≤ 5 ms).
   *Empfehlung:* in ap-40 nur messen und berichten; eine Schwelle legt ap-06 fest, wenn der Worker zeigt, ob
   Python im Latenzpfad liegt.
4. **Echter Browser im Abnahmetest.** Das Kriterium nennt den Browser. Ein Headless-Chromium über Playwright
   lädt in CI und Nachtschicht rund 150 MB nach.
   *Empfehlung:* Playwright mit Chromium (Apache-2.0); Node allein deckt das Browser-Paket (`--target web`)
   nicht ab. Den Cache für Chromium richtet das Kernteam im Workflow ein.
5. **Sync-Protokoll in den Bindungen.** Die Automerge-Sync-Nachrichten aus ap-03 gehören nicht zur Kern-API von
   ap-05a/ap-05b.
   *Empfehlung:* nicht in ap-40; Kern und Bindungen bekommen sie mit dem Change, der sie braucht (ap-07b
   bzw. ap-17).
6. **Script-Element-Hilfen.** `feature(...)` und `publish(...)` stehen in `halter.py` als Platzhalter „aus dem
   Python-SDK“. Sie brauchen Geometrie und persistente Identität.
   *Empfehlung:* mit ap-06 nach ap-39 im SDK ergänzen; ap-40 liefert nur den Lesezugriff auf Parameter, Eingänge
   und Ausgänge eines Elements.
7. **macOS und Windows.** Abnahmetests laufen auf `ubuntu-latest`; ADR-060 nennt Linux und Mac zuerst,
   Windows mit.
   *Empfehlung:* Abnahme auf Linux; das Kernteam ergänzt die CI-Matrix um macOS für NIF, WASM und PyO3 und
   Windows für PyO3 (Bauen und Rust-Tests), ohne Leistungsschwellen.
