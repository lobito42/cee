"""AK-7: Fachpaket-Crates über dieselbe Bindungsschicht (Capability `bindungen`).

Requirement „Fachpaket-Crates über dieselbe Bindungsschicht“, Scenarios „Beispiel-Funktion in allen
Laufzeiten“, „Dimensionsfehler im Fachpaket“ und „Abhängigkeitsrichtung und Feature“.
`beispiel.summe` nach design.md: Argumente `{"type", "param"}`,
Ergebnis `{"count", "sum": {"value", "unit"}}`.
"""

from __future__ import annotations

import json

import pytest
from bind40 import (
    RUNTIMES,
    bindctl_json,
    element,
    flat,
    graphctl_json,
    project,
    query,
    scenario,
    synth,
    write,
)
from test_fassade import normal_deps, packages

ARGS = {"type": "thing", "param": "p0"}
CALL = f"call:beispiel.summe|{json.dumps(ARGS)}"


def _summe_scenario() -> dict:
    return scenario(synth(1000, 5), [], [CALL, "packages"])


def _own_sum(tmp_path) -> tuple[int, float, str]:
    """Rechnung des Tests aus dem exportierten Projekt-JSON (`graphctl export`)."""
    doc = tmp_path / "summe.doc"
    graphctl_json("import", write(tmp_path / "summe.json", synth(1000, 5)), "--out", doc)
    els = [e for e in flat(graphctl_json("export", doc)["elements"]) if e["type"] == ARGS["type"]]
    vals = [e["params"][ARGS["param"]] for e in els if ARGS["param"] in e["params"]]
    units = {v["unit"] for v in vals}
    assert len(units) == 1, units
    return len(els), sum(v["value"] for v in vals), units.pop()


@pytest.mark.parametrize("rt", RUNTIMES)
def test_beispiel_funktion_in_allen_laufzeiten(rt, tmp_path):
    """Scenario „Beispiel-Funktion in allen Laufzeiten“: 1.000 Elemente; `count` und `sum` gleich der Rechnung
    des Tests aus dem exportierten Projekt-JSON (Summe relativ ≤ 10⁻¹²) und gleich Rust."""
    count, total, unit = _own_sum(tmp_path)
    assert count == 1000
    out = bindctl_json(rt, "run", write(tmp_path / f"summe_{rt}.json", _summe_scenario()))
    assert query(out, "packages").get("value") == ["beispiel.summe"], query(out, "packages")
    res = query(out, CALL).get("value")
    assert isinstance(res, dict), query(out, CALL)
    assert res["count"] == count
    assert res["sum"]["unit"] == unit
    assert abs(res["sum"]["value"] - total) <= 1e-12 * abs(total), (res, total)
    if rt != "rust":
        soll = bindctl_json("rust", "run", write(tmp_path / "summe_rust.json", _summe_scenario()))
        assert res == query(soll, CALL)["value"]


MIXED = project(
    [
        element("p1", "probe", {"w": {"value": 10, "unit": "mm"}}),
        element("p2", "probe", {"w": {"value": 2, "unit": "m"}}),
        element("p0", "andere", {"w": {"value": 1, "unit": "s"}}),
        element("p3", "probe", {"w": {"value": 5, "unit": "kg"}}),
        element("p4", "probe", {"w": {"value": 1, "unit": "kg"}}),
        element("p5", "probe", {}),
    ]
)
MIXED_CALL = 'call:beispiel.summe|{"type": "probe", "param": "w"}'


@pytest.mark.parametrize("rt", RUNTIMES)
def test_dimensionsfehler_im_fachpaket(rt, tmp_path):
    """Scenario „Dimensionsfehler im Fachpaket“: Länge bei p1/p2, Masse bei p3/p4 → `dimension_mismatch`
    mit dem ersten abweichenden Element `p3`."""
    out = bindctl_json(rt, "run", write(tmp_path / f"mixed_{rt}.json", scenario(MIXED, [], [MIXED_CALL])))
    err = query(out, MIXED_CALL).get("error")
    assert isinstance(err, dict), query(out, MIXED_CALL)
    assert (err.get("code"), err.get("element")) == ("dimension_mismatch", "p3"), err


def test_abhaengigkeitsrichtung():
    """Scenario „Abhängigkeitsrichtung und Feature“ (`cargo metadata`): `cee-pkg-beispiel` hängt nur von
    `cee-graph` und serde-Crates ab, nicht direkt von automerge; `cee-graph` hängt nicht von ihm ab;
    `cee-bind` bindet es nur optional (Feature `pkg-beispiel`)."""
    pkgs = packages()
    assert "cee-pkg-beispiel" in pkgs, "Crate cee-pkg-beispiel fehlt"
    deps = {d["name"] for d in normal_deps(pkgs["cee-pkg-beispiel"])}
    assert "cee-graph" in deps, deps
    extra = {d for d in deps if d != "cee-graph" and not d.startswith("serde")}
    assert not extra, f"cee-pkg-beispiel hat weitere Abhängigkeiten: {extra}"
    core = {d["name"] for d in pkgs["cee-graph"]["dependencies"]}
    assert "cee-pkg-beispiel" not in core
    assert "cee-bind" in pkgs, "Crate cee-bind fehlt"
    for d in pkgs["cee-bind"]["dependencies"]:
        if d["name"] == "cee-pkg-beispiel":
            assert d.get("optional") is True and d.get("kind") in (None, "normal"), d
    assert "pkg-beispiel" in pkgs["cee-bind"].get("features", {}), "Feature pkg-beispiel fehlt in cee-bind"


def test_ohne_feature_keine_pakete(tmp_path):
    """Scenario „Abhängigkeitsrichtung und Feature“: `bindctl` ohne Feature `pkg-beispiel` meldet `packages`
    leer."""
    scen = scenario(project([element("a")]), [], ["packages"])
    out = bindctl_json("rust", "run", write(tmp_path / "ohne.json", scen), nofeat=True)
    assert query(out, "packages").get("value") == [], query(out, "packages")
