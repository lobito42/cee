"""AK-4: Strukturierte Fehler an jeder Grenze (Capability `bindungen`).

Requirement „Strukturierte Fehler an jeder Grenze“, Scenarios „Gleiche Fehlercodes überall“ und
„Weiterarbeiten nach einem Panic“. Die Fehlerfälle laufen im selben Prozess vor den Operationen eines
AK-1-Szenarios; dessen Ergebnisse müssen danach den Rust-Sollwerten ohne Fehlerfälle gleichen.
"""

from __future__ import annotations

import functools
import tempfile
from pathlib import Path

import pytest
from bind40 import (
    RUNTIMES,
    b64,
    bindctl_json,
    comparable,
    element,
    first_diff,
    flat,
    graphctl_json,
    project,
    rust_run,
    synth_scenario,
    write,
)

EXPECTED = [
    "invalid_json",
    "invalid_document",
    "unknown_unit",
    "dimension_mismatch",
    "invalid_money",
    "cycle",
    "schema_too_new",
    "missing_target",
    "internal",
    None,  # falsche Form einer Operation: Code wie Rust, `invalid_json` oder `invalid_operation`
]
SHAPE_CODES = {"invalid_json", "invalid_operation"}


@functools.lru_cache(maxsize=1)
def _v2_bytes_b64() -> str:
    """Dokument mit Schema-Version 2 (graphctl mit Feature `demo-migration`, wie in ap-05b)."""
    d = Path(tempfile.mkdtemp(prefix="ap40-v2-"))
    v1 = d / "v1.doc"
    graphctl_json("import", write(d / "p.json", project([element("x")])), "--out", v1, demo=True)
    graphctl_json("migrate", v1, "--out", d / "v2.doc", demo=True)
    return b64((d / "v2.doc").read_bytes())


def _cycle_op(proj: dict) -> dict:
    """Operation, die einen Zyklus schließt: Y.in ← X.out, wenn X bereits von Y abhängt."""
    for e in flat(proj["elements"]):
        for target in e["inputs"].values():
            src = target.split(".")[0]
            return {"op": "set_input", "id": src, "name": "zurueck", "target": f"{e['id']}.out"}
    raise AssertionError("synth-Projekt ohne Eingänge – kein Zyklusfall möglich")


def error_cases(proj: dict) -> list[dict]:
    first = next(flat(proj["elements"]))["id"]
    return [
        {"op_json": '{"op": "set_param", "id": '},
        {"load_bytes_b64": b64(b"kein Dokument, nur Text")},
        {"op": {"op": "set_param", "id": first, "param": "p0", "value": {"value": 1, "unit": "furlongx"}}},
        {"convert": [1.5, "m", "kg"]},
        {
            "op": {
                "op": "set_param",
                "id": first,
                "param": "cost",
                "value": {"amount": 12.5, "currency": "EUR"},
            }
        },
        {"op": _cycle_op(proj)},
        {"load_bytes_b64": _v2_bytes_b64()},
        {"element": "gibt-es-nicht"},
        {"debug_panic": True},
        {"op": {"op": "set_param", "id": first}},
    ]


def _codes(out: dict) -> list:
    errs = out.get("errors")
    assert isinstance(errs, list) and len(errs) == len(EXPECTED), f"errors fehlt oder unvollständig: {errs}"
    return [e.get("code") if isinstance(e, dict) else None for e in errs]


@pytest.mark.parametrize("rt", RUNTIMES)
def test_gleiche_fehlercodes_ueberall(rt, tmp_path):
    """Scenario „Gleiche Fehlercodes überall“: 10 Fehlerfälle liefern `{code, message, element}` mit
    demselben Code wie Rust; der Prozess endet nicht (Ausgabe vollständig, Rückgabecode 0), und das Szenario
    danach liefert die Rust-Sollwerte."""
    plain = synth_scenario(2)
    scen = dict(plain, errors=error_cases(plain["project"]))
    out = bindctl_json(rt, "run", write(tmp_path / f"fehler_{rt}.json", scen))
    codes = _codes(out)
    for e in out["errors"]:
        assert isinstance(e, dict) and {"code", "message", "element"} <= set(e), e
        assert isinstance(e["message"], str) and (e["element"] is None or isinstance(e["element"], str)), e
    assert codes[:9] == EXPECTED[:9], codes
    assert codes[9] in SHAPE_CODES, codes[9]
    if rt != "rust":
        soll = rust_run("fehler", scen, tmp_path)
        assert codes == _codes(soll)
        assert [e["element"] for e in out["errors"]] == [e["element"] for e in soll["errors"]]
    weiter = {k: v for k, v in comparable(out).items() if k != "errors"}
    soll_plain = {
        k: v for k, v in comparable(rust_run("fehler_plain", plain, tmp_path)).items() if k != "errors"
    }
    assert weiter == soll_plain, first_diff(weiter, soll_plain)


@pytest.mark.parametrize("rt", RUNTIMES)
def test_weiterarbeiten_nach_einem_panic(rt, tmp_path):
    """Scenario „Weiterarbeiten nach einem Panic“: `debug_panic` meldet `internal`; danach liefert ein
    AK-1-Szenario im selben Prozess die Rust-Sollwerte."""
    plain = synth_scenario(3)
    scen = dict(plain, errors=[{"debug_panic": True}])
    out = bindctl_json(rt, "run", write(tmp_path / f"panic_{rt}.json", scen))
    errs = out.get("errors") or [None]
    assert isinstance(errs[0], dict) and errs[0].get("code") == "internal", errs
    weiter = {k: v for k, v in comparable(out).items() if k != "errors"}
    soll = {k: v for k, v in comparable(rust_run("panic_plain", plain, tmp_path)).items() if k != "errors"}
    assert weiter == soll, first_diff(weiter, soll)
