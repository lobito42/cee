"""AK-4: Regeln für Zahlen beim Schreiben, als Operation und als Import (Capability `einheiten`)."""

from __future__ import annotations

import math

from graphctl_helpers import BRACKET_TYPES, ctl_json, element, make_doc, project, rel_close, write

# Die sechs Werte aus dem Scenario: (Element, Parameter, Wert)
VALUES = [
    ("b1", "height", 1200),
    ("b2", "height", {"value": 1.2, "unit": "m"}),
    ("b3", "height", {"value": 3, "unit": "kg"}),
    ("b4", "height", {"value": 1, "unit": "furlong"}),
    ("b5", "angle", 90),
    ("x1", "x", 5),
]
TYPE_OF = {"b": "bracket", "x": "plain"}


def _hash(doc) -> str:
    return ctl_json("hash", doc)["hash"]


def _param(exported: dict, id_: str, name: str):
    return next(e for e in exported["elements"] if e["id"] == id_)["params"][name]


def _types(tmp_path):
    return write(tmp_path / "types.json", BRACKET_TYPES)


def test_regeltabelle_als_operation(tmp_path):
    """Requirement Regeln für Zahlen: jede Zeile der Tabelle als Operation, Hash bei Ablehnung unverändert."""
    types = _types(tmp_path)
    doc = make_doc(tmp_path, [element(i, TYPE_OF[i[0]]) for i, _, _ in VALUES], types)
    results = {}
    for i, name, value in VALUES:
        before = _hash(doc)
        ops = write(tmp_path / "ops.json", [{"op": "set_param", "id": i, "param": name, "value": value}])
        out = ctl_json("apply", doc, ops, "--types", types, "--out", tmp_path / "next.doc", ok=False)
        res = out["results"][0]
        results[i] = res
        if res["result"] == "ok":
            doc = tmp_path / f"{i}.doc"
            (tmp_path / "next.doc").replace(doc)
        else:
            assert _hash(doc) == before, f"{i}: Dokument nach Ablehnung verändert"
    exp = ctl_json("export", doc)
    assert results["b1"]["result"] == "ok" and results["b1"]["warnings"] == ["unit_assumed"]
    assert _param(exp, "b1", "height") == {"value": 1200, "unit": "mm"}
    assert results["b2"]["result"] == "ok" and results["b2"]["warnings"] == []
    assert rel_close(_param(exp, "b2", "height")["value"], 1200)
    assert _param(exp, "b2", "height")["unit"] == "mm"
    assert results["b3"]["result"] == "dimension_mismatch"
    assert results["b4"]["result"] == "unknown_unit"
    assert results["b5"]["warnings"] == ["unit_assumed"]
    angle = _param(exp, "b5", "angle")
    assert angle["unit"] == "rad" and rel_close(angle["value"], math.pi / 2)
    assert results["x1"]["result"] == "ok" and results["x1"]["warnings"] == ["unit_missing"]
    assert _param(exp, "x1", "x") == 5


def test_regeltabelle_als_import(tmp_path):
    """Requirement Regeln für Zahlen: Import lehnt nichts als Ganzes ab; unzulässige Werte werden Befunde."""
    types = _types(tmp_path)
    elements = [element(i, TYPE_OF[i[0]], {name: value}) for i, name, value in VALUES]
    out = ctl_json(
        "import", write(tmp_path / "p.json", project(elements)), "--types", types, "--out", tmp_path / "i.doc"
    )
    exp = ctl_json("export", tmp_path / "i.doc")
    assert _param(exp, "b1", "height") == {"value": 1200, "unit": "mm"}
    assert rel_close(_param(exp, "b2", "height")["value"], 1200)
    assert _param(exp, "b3", "height") == {"value": 3, "unit": "kg"}
    assert _param(exp, "b4", "height") == {"value": 1, "unit": "furlong"}
    assert rel_close(_param(exp, "b5", "angle")["value"], math.pi / 2)
    assert _param(exp, "x1", "x") == 5
    errors = {(f["element"], f["code"]) for f in out["findings"] if f["severity"] == "error"}
    assert errors == {("b3", "dimension_mismatch"), ("b4", "unknown_unit")}
    warns = {(f["element"], f["code"]) for f in out["findings"] if f["severity"] == "warning"}
    assert warns == {("b1", "unit_assumed"), ("b5", "unit_assumed"), ("x1", "unit_missing")}


def test_warnung_verschwindet_mit_einheit(tmp_path):
    """Requirement Regeln für Zahlen: Warnung bleibt, bis der Wert mit Einheit gesetzt ist."""
    doc = make_doc(tmp_path, [element("x1", "plain", {"x": 5})])
    findings = ctl_json("validate", doc)["findings"]
    assert [(f["element"], f["field"], f["code"]) for f in findings] == [("x1", "x", "unit_missing")] or [
        f["code"] for f in findings
    ] == ["unit_missing"]
    ops = write(
        tmp_path / "ops.json",
        [{"op": "set_param", "id": "x1", "param": "x", "value": {"value": 5, "unit": "mm"}}],
    )
    ctl_json("apply", doc, ops, "--out", tmp_path / "n.doc")
    assert ctl_json("validate", tmp_path / "n.doc")["findings"] == []


def test_geld_ohne_waehrung_oder_als_gleitkomma_abgelehnt(tmp_path):
    """Requirement Regeln für Zahlen / Größe und Geld: `invalid_money` bei Operation."""
    doc = make_doc(tmp_path, [element("m1", "plain")])
    for value in ({"amount": 12.5, "currency": "EUR"}, {"amount": "12.50"}):
        before = _hash(doc)
        ops = write(tmp_path / "ops.json", [{"op": "set_param", "id": "m1", "param": "cost", "value": value}])
        out = ctl_json("apply", doc, ops, "--out", tmp_path / "n.doc", ok=False)
        assert out["results"][0]["result"] == "invalid_money", value
        assert _hash(doc) == before
    ok = write(
        tmp_path / "ok.json",
        [{"op": "set_param", "id": "m1", "param": "cost", "value": {"amount": "12.50", "currency": "EUR"}}],
    )
    assert ctl_json("apply", doc, ok, "--out", tmp_path / "g.doc")["results"][0]["result"] == "ok"
