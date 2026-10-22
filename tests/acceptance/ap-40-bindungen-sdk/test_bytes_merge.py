"""AK-2: Dokument-Bytes und Zusammenführen über Laufzeitgrenzen (Capability `bindungen`).

Requirement „Gleiche Ergebnisse und Inhalts-Hashes in allen Laufzeiten“, Scenarios „Bytes wandern zwischen
Laufzeiten“ und „Zusammenführen über Laufzeitgrenzen“. Gegenprobe jeweils mit `graphctl hash`/`merge`.
"""

from __future__ import annotations

import pytest
from bind40 import RUNTIMES, bindctl_json, flat, graphctl_json, rust_run, synth, synth_scenario, write

_SAVED: dict[str, str] = {}


@pytest.fixture(scope="module")
def bytes_dir(tmp_path_factory):
    return tmp_path_factory.mktemp("bytes")


def _scenario():
    return synth_scenario(1)


def _saved_by(rt: str, d) -> str:
    """Dokument nach 200 Operationen, in Laufzeit `rt` gespeichert (einmal je Testlauf)."""
    if rt not in _SAVED:
        out = d / f"saved_{rt}.doc"
        bindctl_json(rt, "run", write(d / f"scen_{rt}.json", _scenario()), "--save", out)
        assert out.is_file() and out.stat().st_size > 0, f"[{rt}] run --save schrieb keine Datei"
        _SAVED[rt] = str(out)
    return _SAVED[rt]


@pytest.mark.parametrize("loader", RUNTIMES)
@pytest.mark.parametrize("saver", RUNTIMES)
def test_bytes_wandern_zwischen_laufzeiten(saver, loader, bytes_dir):
    """Scenario „Bytes wandern zwischen Laufzeiten“: in `saver` gespeichert, in `loader` geladen (25 Paare);
    Hash gleich dem Original (Rust-Sollwert) und gleich `graphctl hash` der Datei."""
    original = rust_run("bytes_synth1", _scenario(), bytes_dir)["hash"]
    path = _saved_by(saver, bytes_dir)
    assert graphctl_json("hash", path)["hash"] == original, (
        f"{saver}: gespeicherte Bytes ergeben anderen Hash"
    )
    assert bindctl_json(loader, "load", path)["hash"] == original


N_MERGE = 10_000
CHANGES = 500


@pytest.fixture(scope="module")
def merge_base(tmp_path_factory):
    d = tmp_path_factory.mktemp("merge")
    proj = synth(N_MERGE, 4)
    ids = [e["id"] for e in flat(proj["elements"])]
    assert len(ids) == N_MERGE
    base = d / "base.doc"
    graphctl_json("import", write(d / "base.json", proj), "--out", base, timeout=1800)
    ops_a = [
        {"op": "set_param", "id": i, "param": "p0", "value": {"value": n + 0.5, "unit": "m"}}
        for n, i in enumerate(ids[:CHANGES])
    ]
    ops_b = [
        {"op": "set_param", "id": i, "param": "p1", "value": {"value": n + 0.25, "unit": "cm"}}
        for n, i in enumerate(ids[CHANGES : 2 * CHANGES])
    ]
    return d, base, write(d / "ops_a.json", ops_a), write(d / "ops_b.json", ops_b), ids


def _check_values(merged, ids) -> None:
    exp = graphctl_json("export", merged)
    by_id = {e["id"]: e for e in flat(exp["elements"])}
    for n in (0, CHANGES - 1):
        assert by_id[ids[n]]["params"]["p0"] == {"value": (n + 0.5) * 1000, "unit": "mm"}, ids[n]
    for n in (0, CHANGES - 1):
        assert by_id[ids[CHANGES + n]]["params"]["p1"] == {"value": (n + 0.25) * 10, "unit": "mm"}


@pytest.mark.parametrize(("x", "y"), [("elixir", "node"), ("node", "python")], ids=["nif-wasm", "wasm-pyo3"])
def test_zusammenfuehren_ueber_laufzeitgrenzen(x, y, merge_base):
    """Scenario „Zusammenführen über Laufzeitgrenzen“: 10.000 Elemente, je 500 Änderungen an verschiedenen
    Elementen, ein Zweig über `x`, einer über `y`; beide Richtungen und Rust hashgleich (Gegenprobe
    `graphctl merge`)."""
    d, base, ops_a, ops_b, ids = merge_base
    za, zb = d / f"{x}_{y}_a.doc", d / f"{x}_{y}_b.doc"
    ra = bindctl_json(x, "load", base, "--ops", ops_a, "--save", za)
    rb = bindctl_json(y, "load", base, "--ops", ops_b, "--save", zb)
    assert {r["result"] for r in ra["results"] + rb["results"]} == {"ok"}
    assert len(ra["results"]) == len(rb["results"]) == CHANGES
    m_x, m_y = d / f"{x}_{y}_mx.doc", d / f"{x}_{y}_my.doc"
    h_x = bindctl_json(x, "merge", za, zb, "--save", m_x)["hash"]
    h_y = bindctl_json(y, "merge", zb, za, "--save", m_y)["hash"]
    h_rust_ab = bindctl_json("rust", "merge", za, zb)["hash"]
    h_rust_ba = bindctl_json("rust", "merge", zb, za)["hash"]
    h_ref = graphctl_json("merge", za, zb, "--out", d / f"{x}_{y}_ref.doc")["hash"]
    assert h_x == h_y == h_rust_ab == h_rust_ba == h_ref
    assert graphctl_json("hash", m_x)["hash"] == graphctl_json("hash", m_y)["hash"] == h_ref
    _check_values(m_x, ids)
