"""AK-1: Gleiche Ergebnisse und Inhalts-Hashes in allen Laufzeiten (Capability `bindungen`).

Requirement „Gleiche Ergebnisse und Inhalts-Hashes in allen Laufzeiten“, Scenario „Gleicher Hash in fünf
Laufzeiten“: 20 Szenarien – 19 über `bindctl run` (10 aus `graphctl synth` mit Seeds 1–10 und je 200
Zufallsoperationen, 2 aus `format/examples/`, 7 gezielte) und der Merge-Zyklus über `load`/`merge`.
Die Rust-Sollwerte werden zusätzlich gegen `graphctl` nachgerechnet (der Change misst nicht selbst).
"""

from __future__ import annotations

import json

import pytest
from bind40 import (
    OTHERS,
    bindctl_json,
    comparable,
    element,
    first_diff,
    graphctl,
    graphctl_json,
    project,
    query,
    run_scenarios,
    rust_run,
    sha256_text,
    strip_timing,
    write,
)


def test_zwanzig_szenarien_definiert():
    """AK-1: 19 `run`-Szenarien plus Merge-Zyklus = 20; jedes synth-Szenario hat 200 Operationen."""
    scen = run_scenarios()
    assert len(scen) == 19
    synth = [s for name, s in scen.items() if name.startswith("synth")]
    assert len(synth) == 10 and all(len(s["ops"]) == 200 for s in synth)


@pytest.mark.parametrize("rt", OTHERS)
def test_gleicher_hash_in_fuenf_laufzeiten(rt, tmp_path):
    """Scenario „Gleicher Hash in fünf Laufzeiten“: `hash`, `export_sha256`, `results`, `queries` (und
    `errors`, `states`) in 19 von 19 `run`-Szenarien gleich den Rust-Sollwerten."""
    abweichend = []
    for name, scen in run_scenarios().items():
        soll = comparable(rust_run(name, scen, tmp_path))
        ist = comparable(bindctl_json(rt, "run", write(tmp_path / f"{name}.{rt}.json", scen)))
        if ist != soll:
            abweichend.append(f"{name}: {first_diff(ist, soll)}")
    assert not abweichend, f"[{rt}] {len(abweichend)} von 19 Szenarien weichen ab:\n" + "\n".join(abweichend)


def _graphctl_reference(name: str, scen: dict, tmp) -> dict:
    """Dieselben Schritte über `graphctl` (ap-05a/ap-05b) – unabhängige Gegenprobe der Rust-Sollwerte."""
    types = write(tmp / f"{name}.types.json", scen["types"])
    doc = tmp / f"{name}.doc"
    graphctl_json("import", write(tmp / f"{name}.proj.json", scen["project"]), "--types", types, "--out", doc)
    out = {}
    if scen["ops"]:
        res = graphctl(
            "apply", doc, write(tmp / f"{name}.ops.json", scen["ops"]), "--types", types, "--out", doc
        )
        out["results"] = json.loads(res.stdout)["results"]
    else:
        out["results"] = []
    out["hash"] = graphctl_json("hash", doc)["hash"]
    exp = graphctl("export", doc)
    assert exp.returncode == 0, exp.stderr
    out["export_sha256"] = sha256_text(exp.stdout.rstrip("\n"))
    out["validate"] = graphctl_json("validate", doc, "--types", types)
    out["order"] = graphctl_json("order", doc)
    if scen["states"]:
        out["states"] = graphctl_json("states", doc, write(tmp / f"{name}.states.json", scen["states"]))
    for q in scen["queries"]:
        if q.startswith("affected:"):
            out[q] = graphctl_json("affected", doc, q.split(":", 1)[1])
        elif q.startswith("subgraph:"):
            sub = graphctl_json("subgraph", doc, q.split(":", 1)[1])
            out[q] = {"elements": sub["elements"], "external_inputs": sub["external_inputs"]}
        elif q == "units":
            out[q] = graphctl_json("units")
        elif q.startswith("parse:"):
            text, default = q.split(":", 1)[1].split("|")
            out[q] = graphctl_json("parse", text, "--default", default)
        elif q.startswith("convert:"):
            out[q] = graphctl_json("convert", *q.split(":", 1)[1].split("|"))
    return out


def test_rust_sollwerte_gleich_graphctl(tmp_path):
    """Scenario „Gleicher Hash in fünf Laufzeiten“ (Gegenprobe): die Rust-Sollwerte aus `bindctl run` stimmen
    mit `graphctl` überein – Hash, `export_sha256` (SHA-256 über `graphctl export`), Ergebnisse je Operation,
    `validate`, `order`, `affected`, `subgraph`, `units`, `parse`, `convert`, Zustände."""
    abweichend = []
    for name, scen in run_scenarios().items():
        out = rust_run(name, scen, tmp_path)
        ref = _graphctl_reference(name, scen, tmp_path)
        checks = {
            "hash": (out.get("hash"), ref["hash"]),
            "export_sha256": (out.get("export_sha256"), ref["export_sha256"]),
            "results": (out.get("results"), ref["results"]),
            "validate": (query(out, "validate").get("value"), ref["validate"]),
            "order": (query(out, "order").get("value"), ref["order"]),
        }
        if scen["states"]:
            checks["states"] = (out.get("states"), ref["states"])
        for q in scen["queries"]:
            if q in ref:
                value = query(out, q).get("value")
                if q.startswith("subgraph:") and isinstance(value, dict):
                    value = {k: value.get(k) for k in ("elements", "external_inputs")}
                checks[q] = (strip_timing(value), ref[q])
        for what, (ist, soll) in checks.items():
            if ist != soll:
                abweichend.append(f"{name}/{what}: {first_diff(ist, soll)}")
    assert not abweichend, "Rust-Sollwerte weichen von graphctl ab:\n" + "\n".join(abweichend)


def test_gezielte_szenarien_pruefen_was_sie_sollen(tmp_path):
    """Scenario „Gleicher Hash in fünf Laufzeiten“: die gezielten Szenarien treffen ihre Fälle (Rust)."""
    scen = run_scenarios()
    einheit = rust_run("einheitenregeln", scen["einheitenregeln"], tmp_path)["results"]
    codes = [r["result"] for r in einheit]
    assert codes[:3] == ["ok", "ok", "ok"] and "dimension_mismatch" in codes and "unknown_unit" in codes, (
        codes
    )
    zyklus = rust_run("zyklus", scen["zyklus"], tmp_path)["results"]
    assert zyklus[0]["result"] == "cycle" and zyklus[-1]["result"] == "ok", zyklus
    geld = [r["result"] for r in rust_run("geld", scen["geld"], tmp_path)["results"]]
    assert geld[0] == "ok" and geld[1] == "invalid_money" and geld[2] == "invalid_money", geld
    zustand = rust_run("zustaende", scen["zustaende"], tmp_path)["states"]
    assert zustand and zustand["states"]["d"] == "failed" and zustand["states"]["b"] == "current", zustand
    uni = query(rust_run("unicode", scen["unicode"], tmp_path), "element:u")["value"]
    assert uni["meta"]["k3"] == "😀👍🏽" and uni["meta"]["k4"] == "é" and uni["meta"]["k5"] == "é", uni
    assert uni["meta"]["desc"] == "é vs é", uni


def _merge_cycle_base(tmp_path):
    base = project([element("a"), element("b"), element("c")])
    doc = tmp_path / "mz_base.doc"
    graphctl_json("import", write(tmp_path / "mz_base.json", base), "--out", doc)
    ops1 = write(tmp_path / "mz_ops1.json", [{"op": "set_input", "id": "b", "name": "in", "target": "a.out"}])
    ops2 = write(tmp_path / "mz_ops2.json", [{"op": "set_input", "id": "a", "name": "in", "target": "b.out"}])
    return doc, ops1, ops2


def _merge_cycle_in(rt: str, tmp_path) -> dict:
    doc, ops1, ops2 = _merge_cycle_base(tmp_path)
    z1, z2, m = (tmp_path / f"mz_{rt}_{x}.doc" for x in ("z1", "z2", "m"))
    r1 = bindctl_json(rt, "load", doc, "--ops", ops1, "--save", z1)
    r2 = bindctl_json(rt, "load", doc, "--ops", ops2, "--save", z2)
    assert [r["result"] for r in r1["results"] + r2["results"]] == ["ok", "ok"], (r1, r2)
    merged = bindctl_json(rt, "merge", z1, z2, "--save", m)
    return {"merged": merged["hash"], "reloaded": bindctl_json(rt, "load", m)["hash"], "file": str(m)}


def test_merge_zyklus_rust_gegen_graphctl(tmp_path):
    """Scenario „Gleicher Hash in fünf Laufzeiten“, Szenario 20 (Merge-Zyklus): zwei je für sich gültige
    Zweige ergeben zusammengeführt einen Zyklus; Rust-Hash = `graphctl merge`, `graphctl validate` meldet
    `cycle`."""
    rust = _merge_cycle_in("rust", tmp_path)
    z1, z2 = tmp_path / "mz_rust_z1.doc", tmp_path / "mz_rust_z2.doc"
    ref = graphctl_json("merge", z1, z2, "--out", tmp_path / "mz_ref.doc")
    assert rust["merged"] == rust["reloaded"] == ref["hash"]
    findings = graphctl_json("validate", rust["file"])["findings"]
    assert any(f["code"] == "cycle" for f in findings), findings


@pytest.mark.parametrize("rt", OTHERS)
def test_merge_zyklus_in_jeder_laufzeit(rt, tmp_path):
    """Scenario „Gleicher Hash in fünf Laufzeiten“, Szenario 20 (Merge-Zyklus): Hash nach Merge und nach
    erneutem Laden gleich dem Rust-Sollwert."""
    soll = _merge_cycle_in("rust", tmp_path)
    ist = _merge_cycle_in(rt, tmp_path)
    assert (ist["merged"], ist["reloaded"]) == (soll["merged"], soll["merged"])
