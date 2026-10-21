"""AK-6: Leistung der Bindungen (Capability `bindungen`).

Requirement „Leistung der Bindungen“, Scenarios „Schwellen eingehalten“ und „Gemessene Werte vollständig“.
Der Test führt `bindctl bench` je Laufzeit selbst dreimal auf dem Projekt aus `graphctl synth --n 10000
--seed 1` aus und nimmt den Median; Vergleich mit der Schwelle ohne Toleranz. Die WASM-Größe misst der Test
zusätzlich selbst an `client/src/kern/pkg-web/*.wasm` nach.
"""

from __future__ import annotations

import json
import statistics

import pytest
from bind40 import CLIENT, RUNTIMES, bindctl_json, synth, write

RUNS = 3
OP_KEY = {
    "rust": "rust_op_p95_ms",
    "elixir": "nif_op_p95_ms",
    "node": "wasm_node_op_p95_ms",
    "browser": "wasm_browser_op_p95_ms",
    "python": "py_op_p95_ms",
}
THRESHOLD_MS = {"elixir": 1.0, "node": 5.0, "browser": 5.0}
_BENCH: dict[str, str] = {}


@pytest.fixture(scope="module")
def projekt_10k(tmp_path_factory):
    proj = synth(10_000, 1)
    return write(tmp_path_factory.mktemp("bench") / "projekt_10k.json", proj)


def _is_number(v) -> bool:
    return isinstance(v, (int, float)) and not isinstance(v, bool)


def bench_median(rt: str, path) -> dict[str, float]:
    """Median jeder Kennzahl aus drei Läufen von `bindctl bench` (einmal je Testlauf und Laufzeit)."""
    if rt not in _BENCH:
        runs = [bindctl_json(rt, "bench", "--project", path, "--json", timeout=3600) for _ in range(RUNS)]
        keys = set.intersection(*(set(r) for r in runs))
        median = {
            k: statistics.median(r[k] for r in runs) for k in keys if all(_is_number(r[k]) for r in runs)
        }
        _BENCH[rt] = json.dumps(median)
    return json.loads(_BENCH[rt])


@pytest.mark.parametrize("rt", sorted(THRESHOLD_MS))
def test_schwellen_eingehalten(rt, projekt_10k):
    """Scenario „Schwellen eingehalten“: Median von `nif_op_p95_ms` ≤ 1 ms, `wasm_node_op_p95_ms` ≤ 5 ms,
    `wasm_browser_op_p95_ms` ≤ 5 ms (Operation = `apply_op` mit `set_param` in anderer Einheit, p95 über
    1.000 Aufrufe nach 100 zum Aufwärmen)."""
    m = bench_median(rt, projekt_10k)
    key = OP_KEY[rt]
    assert key in m, f"[{rt}] Kennzahl {key} fehlt: {sorted(m)}"
    assert 0 < m[key] <= THRESHOLD_MS[rt], f"[{rt}] {key} = {m[key]} ms (Schwelle {THRESHOLD_MS[rt]} ms)"


@pytest.mark.parametrize("rt", RUNTIMES)
def test_gemessene_werte_vollstaendig(rt, projekt_10k):
    """Scenario „Gemessene Werte vollständig“: je Laufzeit `<laufzeit>_op_p95_ms`, `load_10k_ms` und
    `hash_10k_ms` als Zahl > 0; im Browser zusätzlich `wasm_size_kb` > 0."""
    m = bench_median(rt, projekt_10k)
    want = [OP_KEY[rt], "load_10k_ms", "hash_10k_ms"]
    if rt == "browser":
        want.append("wasm_size_kb")
    bad = {k: m.get(k) for k in want if not (_is_number(m.get(k)) and m[k] > 0)}
    assert not bad, f"[{rt}] fehlende oder ungültige Kennzahlen: {bad}"


def test_wasm_groesse_nachgemessen(projekt_10k):
    """Scenario „Gemessene Werte vollständig“: `wasm_size_kb` entspricht der Dateigröße von
    `client/src/kern/pkg-web/*.wasm` (Abweichung ≤ 1 KB; KB = 1024 Byte)."""
    m = bench_median("browser", projekt_10k)
    files = sorted((CLIENT / "src" / "kern" / "pkg-web").glob("*.wasm"))
    assert files, "client/src/kern/pkg-web/*.wasm fehlt"
    size_kb = sum(f.stat().st_size for f in files) / 1024
    assert "wasm_size_kb" in m, sorted(m)
    assert abs(m["wasm_size_kb"] - size_kb) <= 1.0, (m["wasm_size_kb"], size_kb)
