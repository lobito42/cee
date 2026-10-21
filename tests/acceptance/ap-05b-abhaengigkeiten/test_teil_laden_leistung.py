"""AK-7 und AK-8: Teil-Laden, Budgets und Codequalität (Capability `graph-kern`)."""

from __future__ import annotations

import json
import re
import statistics

from conftest import ROOT, sh
from graphctl5b import ctl_json, element, flat, make_doc, timed_ctl

BUDGETS = {
    "load_index_100k_ms": 2000,
    "index_100k_ms": 300,
    "order_100k_ms": 300,
    "affected_p95_ms": 5,
    "op_p95_ms": 5,
    "subgraph_1000_ms": 50,
}


def _doc_with_group(tmp_path, n_kids: int, total: int = 100_000, name: str = "d.doc"):
    """Dokument mit genau `total` Elementen (Gruppe `group` + `n_kids` Kinder + Rest); jedes 10. Kind zeigt
    nach außen. Liefert (doc, erwartete externe Eingänge)."""
    n_out = total - 1 - n_kids - 2
    outside = [element(f"o{i}", {"in": f"o{i - 1}.out"} if i else None) for i in range(n_out)]
    kids, expected_ext = [], set()
    for i in range(n_kids):
        inputs = {}
        if i % 10 == 0:
            inputs["ext"] = f"o{i}.out"  # zeigt nach außen
            expected_ext.add((f"k{i}", "ext", f"o{i}.out"))
        if i % 10 == 1:
            inputs["int"] = f"k{i - 1}.out"  # bleibt innen
        kids.append(element(f"k{i}", inputs))
    group = element("group", content=kids)
    after = [element("z0", {"in": "k5.out"}), element("z1", {"in": "group.out"})]
    doc = make_doc(tmp_path, [group, *outside, *after], name=name)
    assert len(list(flat(ctl_json("export", doc)["elements"]))) == total
    return doc, expected_ext


def test_nur_der_angefragte_untergraph_wird_aufbereitet(tmp_path):
    """Requirement Teil-Laden: 100.000 Elemente, Gruppe mit 1.000; ≤ 50 ms, materialized_count ≤ 1.000.

    Festlegung: `elements` = Wurzel + Kinder (1.001); `materialized_count` skaliert mit der Gruppengröße;
    gemeldete Zeiten werden gegen die Wanduhr des Aufrufs geprüft."""
    doc, expected_ext = _doc_with_group(tmp_path, 1000)
    proc, wall_ms = timed_ctl("subgraph", doc, "group")
    assert proc.returncode == 0, proc.stderr[-1500:]
    res = json.loads(proc.stdout)
    assert set(res["elements"]) == {"group", *(f"k{i}" for i in range(1000))}, len(res["elements"])
    assert len(res["elements"]) == 1001
    assert res["duration_ms"] <= 50, res["duration_ms"]
    assert res["duration_ms"] <= wall_ms, (res["duration_ms"], wall_ms)
    assert 0 < res["materialized_count"] <= 1000, res["materialized_count"]
    got = {(x["element"], x["input"], x["target"]) for x in res["external_inputs"]}
    assert got == expected_ext, (len(got), len(expected_ext))
    assert len(res["external_inputs"]) == len(expected_ext) == 100


def test_materialisierung_skaliert_mit_der_gruppe(tmp_path):
    """Requirement Teil-Laden: nur der angefragte Untergraph wird aufbereitet – bei 10 Kindern deutlich
    weniger als bei 1.000 (kein festes oder erfundenes `materialized_count`)."""
    small, ext_small = _doc_with_group(tmp_path, 10, name="small.doc")
    big, _ = _doc_with_group(tmp_path, 1000, name="big.doc")
    rs = ctl_json("subgraph", small, "group")
    rb = ctl_json("subgraph", big, "group")
    assert len(rs["elements"]) == 11 and len(rb["elements"]) == 1001
    assert 0 < rs["materialized_count"] <= 10, rs["materialized_count"]
    assert rs["materialized_count"] < rb["materialized_count"] <= 1000
    assert {(x["element"], x["input"], x["target"]) for x in rs["external_inputs"]} == ext_small


def test_dokument_mit_100k_elementen_per_cli(tmp_path):
    """Requirement Laden mit Index: unabhängig von `bench` ein 100.000-Element-Dokument per CLI laden;
    Wanduhr (inkl. Prozessstart und Ausgabe) höchstens 3 x Budget (CI-Runner sind langsam)."""
    doc, _ = _doc_with_group(tmp_path, 1000)
    for cmd, budget_ms in (("hash", 2000), ("order", 2000 + 300)):
        proc, wall_ms = timed_ctl(cmd, doc)
        assert proc.returncode == 0, (cmd, proc.stderr[-1500:])
        assert wall_ms <= 3 * budget_ms, f"{cmd}: {wall_ms:.0f} ms > {3 * budget_ms} ms"
    assert len(json.loads(proc.stdout)["order"]) == 100_000


def test_alle_budgets_eingehalten():
    """Requirements Laden mit Index / Alle Budgets: Median aus 3 Läufen von `bench --json`, ohne Toleranz."""
    runs, walls = [], []
    for _ in range(3):
        proc, wall_ms = timed_ctl("bench", "--json", timeout=3600)
        assert proc.returncode == 0, proc.stderr[-1500:]
        runs.append(json.loads(proc.stdout))
        walls.append(wall_ms)
    for key, limit in BUDGETS.items():
        assert all(key in r for r in runs), f"Kennzahl {key} fehlt"
        m = statistics.median(r[key] for r in runs)
        assert 0 < m <= limit, f"{key} = {m} > {limit}"
    for r, wall_ms in zip(runs, walls, strict=True):  # gemeldete Zeiten dürfen die Wanduhr nicht übersteigen
        total = sum(
            r[k] for k in ("load_index_100k_ms", "index_100k_ms", "order_100k_ms", "subgraph_1000_ms")
        )
        assert total <= wall_ms, f"gemeldet {total} ms > gemessen {wall_ms:.0f} ms"


def test_pruefungen_gruen():
    """Requirement Budgets: fmt, clippy und Tests des Kerns grün; keine Abbrüche in den neuen Modulen."""
    assert sh(["cargo", "fmt", "--check", "-p", "cee-graph"]).returncode == 0
    clippy = ["cargo", "clippy", "-p", "cee-graph", "--all-targets", "--", "-D", "warnings"]
    assert sh(clippy, timeout=1800).returncode == 0
    demo = [*clippy[:-3], "--features", "demo-migration", *clippy[-3:]]
    assert sh(demo, timeout=1800).returncode == 0, "clippy mit --features demo-migration"
    res = sh(["cargo", "test", "-q", "-p", "cee-graph"], timeout=1800)
    assert res.returncode == 0, res.stdout[-1500:] + res.stderr[-1500:]
    src = ROOT / "crates" / "graph" / "src"
    for name in ("index.rs", "deps.rs", "state.rs", "migrate.rs"):
        f = src / name
        assert f.exists(), f"{name} fehlt"
        text = re.sub(r"//[^\n]*", "", f.read_text(encoding="utf-8").split("#[cfg(test)]")[0])
        assert not re.search(r"\.unwrap\(|\.expect\(|panic!|\bunsafe\b", text), name
