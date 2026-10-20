"""AK-1 bis AK-3: Einheitentabelle, Umrechnung, Eingaben lesen, Typdefinitionen (Capability `einheiten`)."""

from __future__ import annotations

import itertools
import math

import pytest
from graphctl_helpers import BRACKET_TYPES, ctl, ctl_json, make_doc, rel_close, write

PI = math.pi
# Tabelle aus design.md: Dimension -> {Code: Faktor}
TABLE = {
    "length": {"um": 0.001, "mm": 1, "cm": 10, "m": 1000, "km": 1e6, "[in_i]": 25.4, "[ft_i]": 304.8},
    "area": {"mm2": 1, "cm2": 100, "m2": 1e6, "[in_i]2": 645.16},
    "volume": {"mm3": 1, "cm3": 1000, "l": 1e6, "m3": 1e9, "[in_i]3": 16387.064},
    "angle": {"rad": 1, "deg": PI / 180},
    "mass": {"g": 0.001, "kg": 1, "t": 1000, "[lb_av]": 0.45359237},
    "time": {"ms": 0.001, "s": 1, "min": 60, "h": 3600},
    "frequency": {"Hz": 1, "kHz": 1000},
    "force": {"N": 1, "kN": 1000},
    "pressure": {"Pa": 1e-6, "kPa": 0.001, "MPa": 1, "GPa": 1000, "N/mm2": 1},
    "density": {"kg/mm3": 1, "kg/m3": 1e-9, "g/cm3": 1e-6},
    "temperature": {"K": 1},
    "co2e": {"kg{CO2e}": 1, "t{CO2e}": 1000},
    "dimensionless": {"1": 1, "%": 0.01},
}
# Exponenten (L, M, T, I, Theta, N, J, A, C) je benannter Dimension
EXPO = {
    "length": dict(L=1),
    "area": dict(L=2),
    "volume": dict(L=3),
    "angle": dict(A=1),
    "mass": dict(M=1),
    "time": dict(T=1),
    "frequency": dict(T=-1),
    "force": dict(L=1, M=1, T=-2),
    "pressure": dict(L=-1, M=1, T=-2),
    "density": dict(L=-3, M=1),
    "temperature": dict(Theta=1),
    "co2e": dict(C=1),
    "dimensionless": {},
}
AXES = ["L", "M", "T", "I", "Theta", "N", "J", "A", "C"]


def _dim(entry: dict) -> dict:
    return {a: entry["dimension"].get(a, 0) for a in AXES}


def test_ak1_tabelle_vollstaendig_und_exakt():
    """Requirement Einheitentabelle: alle Codes, Faktoren relativ 1e-15, Exponenten."""
    units = {u["code"]: u for u in ctl_json("units")}
    for dim, codes in TABLE.items():
        want = {a: EXPO[dim].get(a, 0) for a in AXES}
        for code, factor in codes.items():
            assert code in units, f"Code {code} fehlt"
            assert rel_close(units[code]["factor"], factor, 1e-15), (code, units[code]["factor"], factor)
            assert _dim(units[code]) == want, (code, _dim(units[code]), want)
    assert _dim(units["MPa"]) == {**dict.fromkeys(AXES, 0), "L": -1, "M": 1, "T": -2}
    assert _dim(units["deg"]) == {**dict.fromkeys(AXES, 0), "A": 1}


def test_ak2_hin_und_zurueck():
    """Requirement Umrechnung: alle Paare je Dimension, 4 Werte, Abweichung ≤ 1e-12."""
    for dim, codes in TABLE.items():
        for a, b in itertools.permutations(codes, 2):
            for v in (0.001, 1, 1200, 1e6):
                there = ctl_json("convert", str(v), a, b)["value"]
                back = ctl_json("convert", repr(there), b, a)["value"]
                assert rel_close(back, v), (dim, a, b, v, back)


@pytest.mark.parametrize(
    "v,a,b,want",
    [
        (1, "[in_i]", "mm", 25.4),
        (90, "deg", "rad", PI / 2),
        (1, "[lb_av]", "kg", 0.45359237),
        (7.85, "g/cm3", "kg/m3", 7850),
        (210, "GPa", "MPa", 210000),
    ],
)
def test_ak2_bekannte_werte(v, a, b, want):
    """Requirement Umrechnung, Scenario „Bekannte Werte“."""
    assert rel_close(ctl_json("convert", str(v), a, b)["value"], want)


@pytest.mark.parametrize("a,b", [("kg", "mm"), ("deg", "1"), ("kg{CO2e}", "kg")])
def test_ak2_verschiedene_dimensionen(a, b):
    """Requirement Umrechnung, Scenario „Verschiedene Dimensionen“."""
    res = ctl("convert", "1", a, b)
    assert res.returncode != 0
    assert ctl_json("convert", "1", a, b, ok=False)["error"] == "dimension_mismatch"


# (Eingabe, Standard-Einheit oder None, erwarteter Wert, kanonischer Code | Fehlercode)
CASES: list[tuple[str, str | None, float | None, str]] = [
    ("1,2 m", None, 1200, "mm"),
    ("1.2m", None, 1200, "mm"),
    ("1200", "mm", 1200, "mm"),
    ("90°", None, PI / 2, "rad"),
    ("90 deg", None, PI / 2, "rad"),
    ("90 °", None, PI / 2, "rad"),
    ("3,5 [in_i]", None, 88.9, "mm"),
    ("-0,5 mm", None, -0.5, "mm"),
    ("1e3 mm", None, 1000, "mm"),
    ("12 kg", "mm", None, "dimension_mismatch"),
    ("1,2 furlong", None, None, "unknown_unit"),
    ("", None, None, "parse_error"),
    ("   ", "mm", None, "parse_error"),
    ("abc", "mm", None, "parse_error"),
    ("1,2,3 m", None, None, "parse_error"),
    ("m", None, None, "parse_error"),
    ("1200 mm", None, 1200, "mm"),
    ("1200mm", None, 1200, "mm"),
    ("0 mm", None, 0, "mm"),
    ("2 cm", None, 20, "mm"),
    ("2,5 km", None, 2.5e6, "mm"),
    ("3 um", None, 0.003, "mm"),
    ("1 [ft_i]", None, 304.8, "mm"),
    ("2 kg", None, 2, "kg"),
    ("500 g", None, 0.5, "kg"),
    ("1 [lb_av]", None, 0.45359237, "kg"),
    ("2 h", None, 7200, "s"),
    ("1,5 min", None, 90, "s"),
    ("440 Hz", None, 440, "Hz"),
    ("2 kHz", None, 2000, "Hz"),
    ("1 kN", None, 1000, "N"),
    ("210 GPa", None, 210000, "MPa"),
    ("101325 Pa", None, 0.101325, "MPa"),
    ("7,85 g/cm3", None, 7.85e-6, "kg/mm3"),
    ("50 %", "1", 0.5, "1"),
    ("0,6", "1", 0.6, "1"),
    ("2 t{CO2e}", None, 2000, "kg{CO2e}"),
    ("1 m2", None, 1e6, "mm2"),
    ("1 l", None, 1e6, "mm3"),
    ("45", "deg", PI / 4, "rad"),
    ("1.5E2 mm", None, 150, "mm"),
]


def test_ak3_eingabefaelle():
    """Requirement Eingaben lesen: 40 von 40 Fällen."""
    assert len(CASES) >= 40
    bad = []
    for text, default, want, unit in CASES:
        args = ["parse", text] + (["--default", default] if default else [])
        out = ctl_json(*args, ok=False)
        if want is None:
            if out.get("error") != unit:
                bad.append((text, out))
        elif out.get("unit") != unit or not rel_close(out.get("value", math.nan), want):
            bad.append((text, out))
    assert not bad, bad


@pytest.mark.parametrize(
    "bad",
    [
        [{"type": "a", "params": {"p": {"dimension": "gibtsnicht", "default_unit": "mm"}}}],
        [{"type": "a", "params": {"p": {"dimension": "length", "default_unit": "kg"}}}],
    ],
)
def test_ak3_typdefinition_ungueltig(tmp_path, bad):
    """Requirement Typdefinitionen: unbekannte Dimension bzw. unpassende Einheit abgelehnt."""
    doc = make_doc(tmp_path, [])
    res = ctl("validate", doc, "--types", write(tmp_path / "t.json", bad))
    assert res.returncode != 0 and "invalid_type_definition" in res.stdout, res.stdout


def test_ak3_fruehere_definitionen_gelten_weiter(tmp_path):
    """Requirement Typdefinitionen: zuvor registrierte Definitionen gelten nach einer Ablehnung weiter."""
    bad = {"type": "a", "params": {"p": {"dimension": "length", "default_unit": "kg"}}}
    types = write(tmp_path / "t.json", [*BRACKET_TYPES, bad])
    doc = make_doc(tmp_path, [])
    ops = write(
        tmp_path / "ops.json",
        [
            {"op": "create", "id": "b1", "type": "bracket"},
            {"op": "set_param", "id": "b1", "param": "height", "value": 1200},
        ],
    )
    res = ctl("apply", doc, ops, "--types", types, "--out", tmp_path / "o.doc")
    assert "invalid_type_definition" in res.stdout
    exported = ctl_json("export", tmp_path / "o.doc")
    b1 = next(e for e in exported["elements"] if e["id"] == "b1")
    assert b1["params"]["height"] == {"value": 1200, "unit": "mm"}
