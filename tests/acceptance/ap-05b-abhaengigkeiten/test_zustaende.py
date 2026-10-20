"""AK-4: Berechnungszustände (Capability `graph-kern`)."""

from __future__ import annotations

from graphctl5b import ctl_json, element, make_doc, write


def _two_chains():
    a = [element("a1")] + [element(f"a{i}", {"in": f"a{i - 1}.out"}) for i in range(2, 6)]
    b = [element("b1")] + [element(f"b{i}", {"in": f"b{i - 1}.out"}) for i in range(2, 6)]
    return a + b


def _run(tmp_path, events):
    doc = make_doc(tmp_path, _two_chains())
    script = write(tmp_path / "s.json", [{"event": e, "id": i} for e, i in events])
    return doc, ctl_json("states", doc, script)


def test_anfangszustand_ist_veraltet(tmp_path):
    """Requirement Berechnungszustände: neue/geladene Elemente beginnen als `stale`; `ready` = Wurzeln."""
    _, res = _run(tmp_path, [])
    assert set(res["states"].values()) == {"stale"} and len(res["states"]) == 10
    assert set(res["ready"]) == {"a1", "b1"}


def test_fehler_in_der_mitte_einer_kette(tmp_path):
    """Requirement Berechnungszustände / Fehler in der Mitte einer Kette."""
    ev = [("start", "a1"), ("ok", "a1"), ("start", "a2"), ("ok", "a2"), ("start", "a3"), ("err", "a3")]
    for i in range(1, 6):
        ev += [("start", f"b{i}"), ("ok", f"b{i}")]
    _, res = _run(tmp_path, ev)
    s = res["states"]
    assert s["a3"] == "failed" and res["findings"]["a3"], res
    assert s["a4"] == "stale" and s["a5"] == "stale"
    assert not {"a3", "a4", "a5"} & set(res["ready"])
    assert all(s[f"b{i}"] == "current" for i in range(1, 6))


def test_aenderung_waehrend_der_berechnung(tmp_path):
    """Requirement Berechnungszustände / Änderung während der Berechnung."""
    _, res = _run(tmp_path, [("start", "a1"), ("change", "a1"), ("ok", "a1")])
    assert res["states"]["a1"] == "stale" and "a1" in res["ready"]


def test_aenderung_macht_nachfolger_veraltet(tmp_path):
    """Requirement Berechnungszustände: Änderung an x → x und betroffene Elemente werden `stale`."""
    ev = [(e, f"a{i}") for i in range(1, 6) for e in ("start", "ok")] + [("change", "a2")]
    _, res = _run(tmp_path, ev)
    s = res["states"]
    assert s["a1"] == "current"
    assert all(s[f"a{i}"] == "stale" for i in range(2, 6))
    assert res["ready"] == ["a2"] or set(res["ready"]) == {"a2"}


def test_zustaende_aendern_den_inhalt_nicht(tmp_path):
    """Requirement Berechnungszustände / Zustände ändern den Inhalt nicht: 1.000 Elemente."""
    els = [element(f"x{i}", {"in": f"x{i - 1}.out"} if i else None) for i in range(1000)]
    doc = make_doc(tmp_path, els)
    before_hash, before_bytes = ctl_json("hash", doc), doc.read_bytes()
    ev = []
    for i in range(1000):
        ev += [{"event": "start", "id": f"x{i}"}, {"event": "ok" if i % 7 else "err", "id": f"x{i}"}]
    ctl_json("states", doc, write(tmp_path / "s.json", ev))
    assert ctl_json("hash", doc) == before_hash
    assert doc.read_bytes() == before_bytes
