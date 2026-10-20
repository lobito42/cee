"""AK-6 bis AK-8: Dokument (Roundtrip, Hash, Merge) und Prüfung (Capability `graph-kern`)."""

from __future__ import annotations

import json
import random

from graphctl_helpers import ctl_json, element, make_doc, write


def synth(n: int, seed: int, *extra: str) -> dict:
    return ctl_json("synth", "--n", str(n), "--seed", str(seed), *extra)


def _ids(proj: dict) -> list[str]:
    out = []

    def walk(els):
        for e in els:
            out.append(e["id"])
            walk(e["content"])

    walk(proj["elements"])
    return out


def _flat(els):
    for e in els:
        yield e
        yield from _flat(e["content"])


def _set_ops(ids: list[str], rng: random.Random, n: int) -> list[dict]:
    return [
        {
            "op": "set_param",
            "id": rng.choice(ids),
            "param": f"p{rng.randrange(5)}",
            "value": {"value": rng.randrange(1, 10_000), "unit": "mm"},
        }
        for _ in range(n)
    ]


def test_speichern_und_laden_ohne_verlust(tmp_path):
    """Requirement Dokument: 10.000 Elemente, 1.000 Operationen, Roundtrip gleich in Hash und JSON."""
    proj = synth(10_000, 1)
    doc = make_doc(tmp_path, proj["elements"])
    set_ops = _set_ops(_ids(proj), random.Random(7), 1000)
    ctl_json("apply", doc, write(tmp_path / "ops.json", set_ops), "--out", tmp_path / "a.doc")
    # `export`/`hash` laden das gespeicherte Dokument von der Platte neu; zweiter Roundtrip über apply mit []
    ctl_json("apply", tmp_path / "a.doc", write(tmp_path / "none.json", []), "--out", tmp_path / "b.doc")
    assert ctl_json("hash", tmp_path / "a.doc") == ctl_json("hash", tmp_path / "b.doc")
    assert ctl_json("export", tmp_path / "a.doc") == ctl_json("export", tmp_path / "b.doc")
    # Gegenprobe: dieselben Elemente wie im Eingabeprojekt, und die 1.000 Änderungen sind wirklich gespeichert
    exported = ctl_json("export", tmp_path / "b.doc")
    assert sorted(_ids(exported)) == sorted(_ids(proj))
    by_id = {e["id"]: e for e in _flat(exported["elements"])}
    last = {(op["id"], op["param"]): op["value"] for op in set_ops}
    for (id_, param), value in last.items():
        assert by_id[id_]["params"][param] == value, (id_, param)


def test_hash_unabhaengig_von_historie_und_actor(tmp_path):
    """Requirement Dokument: gleicher Endinhalt über verschiedene Folgen ⇒ gleicher Hash."""
    els = [element(f"e{i}") for i in range(20)]
    d1 = make_doc(tmp_path, els, name="a.doc")
    d2 = make_doc(tmp_path, els, name="b.doc")
    set_a = {"op": "set_param", "id": "e1", "param": "w", "value": {"value": 5, "unit": "mm"}}
    set_b = {"op": "set_param", "id": "e2", "param": "w", "value": {"value": 7, "unit": "mm"}}
    detour = {"op": "set_param", "id": "e1", "param": "w", "value": {"value": 99, "unit": "mm"}}
    ctl_json("apply", d1, write(tmp_path / "o1.json", [set_a, set_b]), "--out", tmp_path / "r1.doc")
    ctl_json("apply", d2, write(tmp_path / "o2.json", [set_b, detour, set_a]), "--out", tmp_path / "r2.doc")
    other = write(tmp_path / "o3.json", [set_a])
    ctl_json("apply", d1, other, "--out", tmp_path / "r3.doc")
    h = {k: ctl_json("hash", tmp_path / f"{k}.doc")["hash"] for k in ("r1", "r2", "r3")}
    assert h["r1"] == h["r2"]
    assert h["r3"] != h["r1"]


def test_zwei_zweige_zusammenfuehren(tmp_path):
    """Requirement Dokument: 2 × 500 Änderungen an verschiedenen Elementen, beide Richtungen gleicher Hash."""
    proj = synth(10_000, 2)
    ids = _ids(proj)
    base = make_doc(tmp_path, proj["elements"])
    left_ids, right_ids = ids[:5000], ids[5000:]
    rng = random.Random(3)
    lops = [
        {"op": "set_param", "id": i, "param": "w", "value": {"value": 1 + k, "unit": "mm"}}
        for k, i in enumerate(rng.sample(left_ids, 500))
    ]
    rops = [
        {"op": "set_param", "id": i, "param": "w", "value": {"value": 2000 + k, "unit": "mm"}}
        for k, i in enumerate(rng.sample(right_ids, 500))
    ]
    ctl_json("apply", base, write(tmp_path / "l.json", lops), "--out", tmp_path / "l.doc")
    ctl_json("apply", base, write(tmp_path / "r.json", rops), "--out", tmp_path / "r.doc")
    ctl_json("merge", tmp_path / "l.doc", tmp_path / "r.doc", "--out", tmp_path / "lr.doc")
    ctl_json("merge", tmp_path / "r.doc", tmp_path / "l.doc", "--out", tmp_path / "rl.doc")
    assert ctl_json("hash", tmp_path / "lr.doc") == ctl_json("hash", tmp_path / "rl.doc")
    by_id = {e["id"]: e for e in _flat(ctl_json("export", tmp_path / "lr.doc")["elements"])}
    for op in lops + rops:
        assert by_id[op["id"]]["params"]["w"]["value"] == op["value"]["value"], op["id"]


def test_alle_codes_werden_erkannt():
    """Requirement Prüfung: Korpus mit je 10 Fällen je Code, 100 % erkannt, 0 Falschmeldungen."""
    corpus = synth(10_000, 4, "--corpus", "validate")
    expected = {(e["element"], e["code"], e["severity"]) for e in corpus["expected"]}
    codes = {c for _, c, _ in expected}
    want_codes = {
        "invalid_id",
        "duplicate_id",
        "invalid_name",
        "missing_target",
        "missing_output",
        "orphan",
        "multiple_parents",
        "unknown_unit",
        "dimension_mismatch",
        "non_canonical_unit",
        "invalid_money",
        "unit_missing",
        "unit_assumed",
    }
    assert codes == want_codes
    for c in want_codes:
        assert sum(1 for _, code, _ in expected if code == c) >= 10, c
    # Der Test prüft das vom Generator gelieferte Projekt selbst über `validate`
    import tempfile
    from pathlib import Path

    with tempfile.TemporaryDirectory() as d:
        p = write(Path(d) / "corpus.json", corpus["project"])
        res = ctl_json("validate", p, "--types", write(Path(d) / "t.json", corpus.get("types", [])))
    found = {(f["element"], f["code"], f["severity"]) for f in res["findings"]}
    assert expected <= found, sorted(expected - found)[:10]
    assert found <= expected, f"Falschmeldungen: {sorted(found - expected)[:10]}"


def test_andere_elemente_bleiben_benutzbar(tmp_path):
    """Requirement Prüfung: gebrochener Eingang zerbricht nichts; Änderung, Speichern, Laden gelingen."""
    els = [
        element("a", "thing", {"w": {"value": 1, "unit": "mm"}}),
        element("b", "thing", inputs={"in": "gibtsnicht.out"}),
        element("c", "thing"),
    ]
    doc = make_doc(tmp_path, els)
    ops = write(
        tmp_path / "ops.json",
        [{"op": "set_param", "id": "c", "param": "w", "value": {"value": 9, "unit": "mm"}}],
    )
    out = ctl_json("apply", doc, ops, "--out", tmp_path / "n.doc")
    assert out["results"][0]["result"] == "ok"
    findings = ctl_json("validate", tmp_path / "n.doc")["findings"]
    assert [(f["element"], f["code"]) for f in findings] == [("b", "missing_target")]
    exp = ctl_json("export", tmp_path / "n.doc")
    assert any(e["id"] == "c" and e["params"]["w"] == {"value": 9, "unit": "mm"} for e in exp["elements"])
    json.dumps(exp)
