"""AK-8: Python-SDK `cee-sdk` über PyO3 (Capability `python-sdk`).

Requirements „Python-Paket über PyO3“, „Größen nur über die Einheitentabelle des Kerns“ und „Lesezugriff für
Script-Elemente“. Das SDK wird über `sdk_probe.py` (öffentliche API) in der Umgebung von `cee-sdk`
aufgerufen; Sollwerte liefert `graphctl` (ap-05a/ap-05b), nicht das SDK selbst.
"""

from __future__ import annotations

import itertools
import json
import tomllib
from pathlib import Path

from bind40 import ROOT, element, flat, graphctl, graphctl_json, prepare, project, run_cmd, tail, write

PROBE = Path(__file__).with_name("sdk_probe.py")
PYPROJECT = ROOT / "sdk" / "python" / "pyproject.toml"


def probe(*args):
    """`sdk_probe.py` mit dem gebauten SDK (maturin develop --release) ausführen."""
    prepare("python")
    cmd = ["uv", "run", "--no-sync", "--package", "cee-sdk", "python", str(PROBE), *map(str, args)]
    res = run_cmd(cmd, timeout=1800)
    assert res.returncode == 0, f"sdk_probe {args[0]}:\n{tail(res)}"
    return json.loads(res.stdout.strip().splitlines()[-1])


def same_float(a, b) -> bool:
    return float(a).hex() == float(b).hex()


# --- Requirement „Python-Paket über PyO3“ -----------------------------------------------------------------


def test_paket_baut_und_ist_vollstaendig():
    """Scenario „Paket baut und ist vollständig“: Release-Build mit maturin und Import gelingen;
    `sdk/python/pyproject.toml` nennt Apache-2.0 und Python ≥ 3.11; `py.typed` liegt im Paket; `Document`
    und `States` haben jede Methode aus design.md (0 fehlend); `Quantity`, `Element`, `CeeError` wie
    beschrieben."""
    assert PYPROJECT.is_file(), "sdk/python/pyproject.toml fehlt"
    meta = tomllib.loads(PYPROJECT.read_text(encoding="utf-8"))
    proj = meta.get("project", {})
    assert proj.get("name") == "cee-sdk", proj.get("name")
    assert "Apache-2.0" in json.dumps(proj.get("license")), proj.get("license")
    assert "3.11" in str(proj.get("requires-python", "")), proj.get("requires-python")
    assert "maturin" in json.dumps(meta.get("build-system", {})), meta.get("build-system")
    s = probe("surface")
    assert s["document_missing"] == [], s["document_missing"]
    assert s["states_missing"] == [], s["states_missing"]
    assert s["functions_missing"] == [], s["functions_missing"]
    assert s["py_typed"], "py.typed fehlt im Paket cee_sdk"
    assert s["quantity_dataclass"] and s["quantity_frozen"] and s["quantity_immutable"], s
    assert s["quantity_fields"] == ["value", "unit"], s["quantity_fields"]
    assert s["quantity_parse"] and s["quantity_to"], s
    assert s["ceeerror_exception"], s
    assert s["element_is_sdk_element"] and s["element_missing"] == [], s
    assert s["states_ready"] == ["a"], s["states_ready"]


def test_fehler_als_ausnahme():
    """Scenario „Fehler als Ausnahme“: `Document.load` mit Bytes, die kein Dokument sind → `CeeError` mit
    `invalid_document`; `apply_op` mit unbekannter Einheit → `CeeError` mit `unknown_unit`."""
    e = probe("errors")
    assert e["load"] and e["load"]["error"] == "invalid_document", e["load"]
    assert e["apply_op"] and e["apply_op"]["error"] == "unknown_unit", e["apply_op"]
    for err in (e["load"], e["apply_op"]):
        assert isinstance(err["message"], str) and err["message"], err


# --- Requirement „Größen nur über die Einheitentabelle des Kerns“ -----------------------------------------


def _dim(u: dict) -> tuple:
    return tuple(sorted(u["dimension"].items()))


def test_umrechnung_gleich_dem_kern(tmp_path):
    """Scenario „Umrechnung gleich dem Kern“: für jedes Paar derselben Dimension aus der Einheitentabelle ist
    `Quantity(1.5, von).to(nach)` bitgleich zu `graphctl convert 1.5 <von> <nach>`; über Dimensionen hinweg
    `CeeError` mit `dimension_mismatch`."""
    units = graphctl_json("units")
    assert len(units) >= 10, units
    same = [(a["code"], b["code"]) for a, b in itertools.product(units, units) if _dim(a) == _dim(b)]
    cross = []
    for a in units:
        other = next((b for b in units if _dim(b) != _dim(a)), None)
        if other:
            cross.append((a["code"], other["code"]))
    got = probe("convert", write(tmp_path / "pairs.json", same + cross))
    assert len(got) == len(same) + len(cross)
    abweichend = []
    for (src, dst), sdk in zip(same, got[: len(same)], strict=True):
        res = graphctl("convert", "1.5", src, dst)
        ref = json.loads(res.stdout)
        if res.returncode != 0:
            if sdk.get("error") != ref.get("error"):
                abweichend.append((src, dst, sdk, ref))
        elif "error" in sdk or not same_float(sdk["value"], ref["value"]) or sdk["unit"] != dst:
            abweichend.append((src, dst, sdk, ref))
    assert not abweichend, f"{len(abweichend)} von {len(same)} Paaren weichen ab: {abweichend[:10]}"
    falsch = [
        (p, s) for p, s in zip(cross, got[len(same) :], strict=True) if s.get("error") != "dimension_mismatch"
    ]
    assert not falsch, f"über Dimensionen ohne dimension_mismatch: {falsch[:10]}"


PARSE_CASES = [("1,2 m", "mm"), ("1200 mm", "mm"), ("12", "mm"), ("90°", "rad"), ("5 kg", "mm")]


def test_eingaben_lesen_wie_der_kern(tmp_path):
    """Scenario „Eingaben lesen wie der Kern“: „1,2 m“, „1200 mm“, „12“ (Standard `mm`), „90°“ (Standard
    `rad`) wie `graphctl parse` (Wert bitgleich, Code gleich); „5 kg“ mit Standard `mm` wirft `CeeError` mit
    demselben Code wie `graphctl parse` (`dimension_mismatch`)."""
    got = probe("parse", write(tmp_path / "parse.json", PARSE_CASES))
    assert len(got) == 5
    for (text, default), sdk in zip(PARSE_CASES[:4], got[:4], strict=True):
        ref = graphctl_json("parse", text, "--default", default)
        assert "error" not in sdk and sdk["is_quantity"], (text, sdk)
        assert same_float(sdk["value"], ref["value"]) and sdk["unit"] == ref["unit"], (text, sdk, ref)
    ref = graphctl("parse", "5 kg", "--default", "mm")
    assert ref.returncode != 0 and json.loads(ref.stdout)["error"] == "dimension_mismatch"
    assert got[4].get("error") == "dimension_mismatch", got[4]


# --- Requirement „Lesezugriff für Script-Elemente“ --------------------------------------------------------

SCRIPT = element(
    "s1",
    "script",
    params={
        "breite": {"value": 1.2, "unit": "m"},
        "hoehe": {"value": 30, "unit": "mm"},
        "winkel": {"value": 90, "unit": "deg"},
        "preis": {"amount": "12.50", "currency": "EUR"},
    },
    inputs={"basis": "src.out"},
    outputs={"koerper": "thing", "umriss": "thing"},
)


def test_element_eines_script_elements_lesen(tmp_path):
    """Scenario „Element eines Script-Elements lesen“: zwei Längen und ein Winkel als `Quantity` in `mm` bzw.
    `rad` mit den Werten aus dem exportierten Projekt-JSON, der Geldbetrag als Zuordnung mit Zeichenkette
    `amount`, `inputs` und `outputs` gleich dem Export."""
    proj = write(tmp_path / "script.json", project([element("src"), SCRIPT]))
    doc = tmp_path / "script.doc"
    graphctl_json("import", proj, "--out", doc)
    ref = next(e for e in flat(graphctl_json("export", doc)["elements"]) if e["id"] == "s1")
    el = probe("element", proj, "s1")
    assert (el["id"], el["type"]) == ("s1", "script")
    for name, unit in (("breite", "mm"), ("hoehe", "mm"), ("winkel", "rad")):
        p = el["params"][name]
        assert p["kind"] == "quantity" and p["unit"] == unit == ref["params"][name]["unit"], (name, p)
        assert same_float(p["value"], ref["params"][name]["value"]), (name, p, ref["params"][name])
    money = el["params"]["preis"]
    assert money["kind"] == "dict" and money["value"]["amount"] == "12.50", money
    assert money["value"]["currency"] == "EUR" and money["value"] == ref["params"]["preis"], money
    assert el["inputs"] == ref["inputs"] == {"basis": "src.out"}
    assert el["outputs"] == ref["outputs"]


def test_teil_laden_bleibt_erhalten(tmp_path):
    """Scenario „Teil-Laden bleibt erhalten“: gespeichertes Dokument mit 100.000 Elementen geladen;
    `materialized_count()` vor dem Zugriff 0, nach `doc.element(id)` 1."""
    prepare("python")
    res = graphctl("synth", "--n", "100000", "--seed", "3")
    assert res.returncode == 0, tail(res)
    src = tmp_path / "p100k.json"
    src.write_text(res.stdout, encoding="utf-8")
    doc = tmp_path / "p100k.doc"
    graphctl_json("import", src, "--out", doc, timeout=3600)
    target = json.loads(res.stdout)["elements"][-1]["id"]
    out = probe("partial", doc, target)
    assert (out["before"], out["after"], out["id"]) == (0, 1, target), out
