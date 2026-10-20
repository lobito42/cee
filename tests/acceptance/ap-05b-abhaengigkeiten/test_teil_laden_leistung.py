"""AK-7 und AK-8: Teil-Laden, Budgets und Codequalität (Capability `graph-kern`)."""

from __future__ import annotations

import re
import statistics

from conftest import ROOT, sh
from graphctl5b import ctl_json, element, make_doc

BUDGETS = {
    "load_index_100k_ms": 2000,
    "index_100k_ms": 300,
    "order_100k_ms": 300,
    "affected_p95_ms": 5,
    "op_p95_ms": 5,
    "subgraph_1000_ms": 50,
}


def test_nur_der_angefragte_untergraph_wird_aufbereitet(tmp_path):
    """Requirement Teil-Laden: 100.000 Elemente, Gruppe mit 1.000; ≤ 50 ms, materialized_count ≤ 1.000."""
    outside = [element(f"o{i}", {"in": f"o{i - 1}.out"} if i else None) for i in range(98_998)]
    kids = []
    expected_ext = set()
    for i in range(1000):
        inputs = {}
        if i % 10 == 0:
            inputs["ext"] = f"o{i}.out"  # zeigt nach außen
            expected_ext.add((f"k{i}", "ext", f"o{i}.out"))
        if i % 10 == 1:
            inputs["int"] = f"k{i - 1}.out"  # bleibt innen
        kids.append(element(f"k{i}", inputs))
    group = element("group", content=kids)
    after = [element("z0", {"in": "k5.out"}), element("z1", {"in": "group.out"})]
    doc = make_doc(tmp_path, [group, *outside, *after])
    res = ctl_json("subgraph", doc, "group")
    ids = set(res["elements"])
    assert {f"k{i}" for i in range(1000)} <= ids and len(ids) <= 1001
    assert res["duration_ms"] <= 50, res["duration_ms"]
    assert 0 < res["materialized_count"] <= 1000, res["materialized_count"]
    got = {(x["element"], x["input"], x["target"]) for x in res["external_inputs"]}
    assert got == expected_ext, (len(got), len(expected_ext))


def test_alle_budgets_eingehalten():
    """Requirements Laden mit Index / Alle Budgets: Median aus 3 Läufen von `bench --json`, ohne Toleranz."""
    runs = [ctl_json("bench", "--json", timeout=3600) for _ in range(3)]
    for key, limit in BUDGETS.items():
        assert all(key in r for r in runs), f"Kennzahl {key} fehlt"
        m = statistics.median(r[key] for r in runs)
        assert 0 <= m <= limit, f"{key} = {m} > {limit}"


def test_pruefungen_gruen():
    """Requirement Budgets: fmt, clippy und Tests des Kerns grün; keine Abbrüche in den neuen Modulen."""
    assert sh(["cargo", "fmt", "--check", "-p", "cee-graph"]).returncode == 0
    clippy = ["cargo", "clippy", "-p", "cee-graph", "--all-targets", "--", "-D", "warnings"]
    assert sh(clippy, timeout=1800).returncode == 0
    res = sh(["cargo", "test", "-q", "-p", "cee-graph"], timeout=1800)
    assert res.returncode == 0, res.stdout[-1500:] + res.stderr[-1500:]
    src = ROOT / "crates" / "graph" / "src"
    for name in ("index.rs", "deps.rs", "state.rs", "migrate.rs"):
        f = src / name
        assert f.exists(), f"{name} fehlt"
        text = re.sub(r"//[^\n]*", "", f.read_text(encoding="utf-8").split("#[cfg(test)]")[0])
        assert not re.search(r"\.unwrap\(|\.expect\(|panic!|\bunsafe\b", text), name
