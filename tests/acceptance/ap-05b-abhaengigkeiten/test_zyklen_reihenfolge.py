"""AK-1 bis AK-3: Abhängigkeiten ohne Zyklen (Capability `graph-kern`)."""

from __future__ import annotations

import json
import random
from collections import deque

from graphctl5b import ctl, ctl_json, deps_of, element, flat, make_doc, set_input, write


def _chain(n: int) -> list[dict]:
    """e0 <- e1 <- ... (e_i hängt von e_{i-1} ab)."""
    return [element(f"e{i}", {"in": f"e{i - 1}.out"} if i else None) for i in range(n)]


def test_zyklus_wird_abgelehnt(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen / Zyklus wird abgelehnt: 2, 3, 50 Elemente."""
    for n in (2, 3, 50):
        doc = make_doc(tmp_path, _chain(n), name=f"c{n}.doc")
        before = ctl_json("hash", doc)
        out = tmp_path / f"c{n}.out.doc"
        ops = write(tmp_path / f"o{n}.json", [set_input("e0", "in", f"e{n - 1}")])
        proc = ctl("apply", doc, ops, "--out", out)
        assert proc.returncode != 0, f"n={n}: abgelehnte Operation muss Rückgabecode != 0 liefern"
        res = json.loads(proc.stdout)
        assert res["results"][0]["result"] == "cycle", f"n={n}: {res}"
        assert ctl_json("hash", doc) == before
        if out.exists():
            assert ctl_json("hash", out) == before, f"n={n}: Dokument verändert"


def test_erlaubtes_set_input_auf_der_kette(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen (Gegenprobe): ein zyklenfreies set_input ist `ok`, ändert die
    Reihenfolge und die betroffenen Elemente (eine Attrappe, die alles ablehnt, besteht nicht)."""
    doc = make_doc(tmp_path, [*_chain(5), element("x")])
    assert ctl_json("affected", doc, "x")["affected"] == ["x"]
    ops = write(tmp_path / "o.json", [set_input("x", "in", "e2")])
    out = tmp_path / "o.doc"
    res = ctl_json("apply", doc, ops, "--out", out)
    assert res["results"][0]["result"] == "ok", res
    assert ctl_json("hash", out) != ctl_json("hash", doc)
    order = ctl_json("order", out)["order"]
    assert order.index("e2") < order.index("x")
    assert set(ctl_json("affected", out, "e2")["affected"]) == {"e2", "e3", "e4", "x"}
    assert set(ctl_json("affected", out, "e3")["affected"]) == {"e3", "e4"}
    # Zyklus über die neue Kante wird weiterhin abgelehnt: e2 <- x <- e2
    cyc = write(tmp_path / "c.json", [set_input("e2", "back", "x")])
    proc = ctl("apply", out, cyc, "--out", tmp_path / "c.doc")
    assert proc.returncode != 0 and json.loads(proc.stdout)["results"][0]["result"] == "cycle"


def test_reihenfolge_tie_break_nach_id(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen / stabile Reihenfolge: unter berechenbaren Elementen zuerst die
    kleinste ID; mehrere IDs bei `affected` ergeben die Vereinigung."""
    els = [element("c"), element("b"), element("a", {"in": "b.out"}), element("d", {"in": "c.out"})]
    doc = make_doc(tmp_path, els)
    # bereit: b, c -> b; dann a, c -> a; dann c; dann d
    assert ctl_json("order", doc)["order"] == ["b", "a", "c", "d"]
    assert ctl_json("order", doc)["skipped"] == []
    assert set(ctl_json("affected", doc, "b", "c")["affected"]) == {"a", "b", "c", "d"}


def test_selbstverweis_wird_abgelehnt(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen: ein Element darf nicht von sich selbst abhängen."""
    doc = make_doc(tmp_path, _chain(2))
    ops = write(tmp_path / "o.json", [set_input("e0", "in", "e0")])
    proc = ctl("apply", doc, ops, "--out", tmp_path / "o.doc")
    assert proc.returncode != 0
    assert json.loads(proc.stdout)["results"][0]["result"] == "cycle"


def test_zyklus_aus_dem_zusammenfuehren(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen / Zyklus aus dem Zusammenführen (3 Elemente)."""
    base = [
        element("a"),
        element("b"),
        element("c"),
        element("d", {"in": "a.out"}),
        element("f"),
        element("g", {"in": "f.out"}),
    ]
    doc = make_doc(tmp_path, base)
    # Zweig 1: a hängt von c, b von a; Zweig 2: c hängt von b  => Zyklus a, b, c
    left = write(tmp_path / "l.json", [set_input("a", "in", "c"), set_input("b", "in", "a")])
    right = write(tmp_path / "r.json", [set_input("c", "in", "b")])
    # jede Operation für sich ist zyklenfrei und wird angenommen
    for ops, name in ((left, "l.doc"), (right, "r.doc")):
        res = ctl_json("apply", doc, ops, "--out", tmp_path / name)
        assert {r["result"] for r in res["results"]} == {"ok"}, res
    ctl_json("merge", tmp_path / "l.doc", tmp_path / "r.doc", "--out", tmp_path / "m.doc")
    findings = ctl_json("validate", tmp_path / "m.doc")["findings"]
    cyc = [f for f in findings if f["code"] == "cycle"]
    assert {f["element"] for f in cyc} == {"a", "b", "c"}, findings
    assert all(f["severity"] == "error" for f in cyc)
    res = ctl_json("order", tmp_path / "m.doc")
    assert {s["element"]: s["reason"] for s in res["skipped"]} == {
        "a": "cycle",
        "b": "cycle",
        "c": "cycle",
        "d": "depends_on_cycle",
    }, res
    # d hängt von a ab (Nachfolger); f und g sind unabhängig und bleiben berechenbar
    assert set(res["order"]) == {"f", "g"}, res
    assert {s["element"] for s in res["skipped"]} == {"a", "b", "c", "d"}, res
    assert res["order"].index("f") < res["order"].index("g")


def _project_graph(n: int, seed: int):
    proj = ctl_json("synth", "--n", str(n), "--seed", str(seed))
    parent: dict[str, str | None] = {}

    def walk(es, p):
        for e in es:
            parent[e["id"]] = p
            walk(e["content"], e["id"])

    walk(proj["elements"], None)
    return proj, list(flat(proj["elements"])), parent


def _ref_affected(changed: str, els: list[dict], parent: dict) -> set[str]:
    """Referenz (Breitensuche): transitiv abhängige Elemente plus deren Eltern."""
    users: dict[str, set[str]] = {e["id"]: set() for e in els}
    for e in els:
        for d in deps_of(e):
            if d in users:
                users[d].add(e["id"])
    seen = {changed}
    queue = deque([changed])
    while queue:
        cur = queue.popleft()
        nxt = set(users[cur])
        if parent.get(cur):
            nxt.add(parent[cur])
        for x in nxt - seen:
            seen.add(x)
            queue.append(x)
    return seen


def test_reihenfolge_und_betroffene_gegen_referenz(tmp_path):
    """Requirement Abhängigkeiten ohne Zyklen / Reihenfolge und betroffene Elemente: 1.000 von 1.000."""
    proj, els, parent = _project_graph(10_000, 5)
    doc = make_doc(tmp_path, proj["elements"])
    order = ctl_json("order", doc)["order"]
    assert len(order) == len(els) and set(order) == {e["id"] for e in els}
    pos = {i: k for k, i in enumerate(order)}
    for e in els:
        for d in deps_of(e):
            assert pos[d] < pos[e["id"]], f"{e['id']} vor seiner Abhängigkeit {d}"
    assert ctl_json("order", doc)["order"] == order, "Reihenfolge nicht stabil"
    rng = random.Random(3)
    ids = [e["id"] for e in els]
    ok = 0
    for _ in range(1000):
        pick = rng.choice(ids)
        got = set(ctl_json("affected", doc, pick)["affected"])
        ok += got == _ref_affected(pick, els, parent)
    assert ok == 1000, f"nur {ok} von 1000 Mengen stimmen"
