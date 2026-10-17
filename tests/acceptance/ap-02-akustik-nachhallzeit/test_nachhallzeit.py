"""Abnahmetests AP-02 – Nachhallzeit nach Sabine und Eyring (AK-1 bis AK-5)."""

import json
import math
import statistics
import subprocess
import time

import pytest
from conftest import ROOT, sh

BANDS = ["125", "250", "500", "1000", "2000", "4000"]
CLI = ["cargo", "run", "-q", "--release", "-p", "cee-acoustics", "--bin", "cee-acoustics", "--"]


def run(payload: dict | str, *args: str):
    data = payload if isinstance(payload, str) else json.dumps(payload)
    res = sh([*CLI, *(args or ("rt",))], stdin=data, timeout=900)
    out = json.loads(res.stdout) if res.stdout.strip() else {}
    return res.returncode, out, res.stderr


def bands(*values: float) -> dict:
    return dict(zip(BANDS, values, strict=True))


# Besprechungsraum 5 × 4 × 3 m: Boden, Decke, vier Wände
ROOM = {
    "volume_m3": 60.0,
    "surfaces": [
        {"area_m2": 20.0, "alpha": bands(0.02, 0.03, 0.03, 0.04, 0.05, 0.05)},  # Boden
        {"area_m2": 20.0, "alpha": bands(0.15, 0.10, 0.06, 0.05, 0.05, 0.05)},  # Decke
        {"area_m2": 30.0, "alpha": bands(0.03, 0.03, 0.04, 0.05, 0.05, 0.06)},  # Längswände
        {"area_m2": 24.0, "alpha": bands(0.10, 0.06, 0.04, 0.03, 0.02, 0.02)},  # Querwände mit Fenster
    ],
}
OBJECTS = [{"absorption_area_m2": bands(0.6, 1.4, 2.2, 2.6, 2.6, 2.4)} for _ in range(3)]


def expected(room: dict) -> tuple[dict, dict]:
    v, surfaces = room["volume_m3"], room["surfaces"]
    s_total = sum(s["area_m2"] for s in surfaces)
    sab, eyr = {}, {}
    for b in BANDS:
        a_surf = sum(s["area_m2"] * s["alpha"][b] for s in surfaces)
        a_obj = sum(o["absorption_area_m2"][b] for o in room.get("objects", []))
        sab[b] = 0.161 * v / (a_surf + a_obj)
        mean = a_surf / s_total
        eyr[b] = 0.161 * v / (-s_total * math.log(1 - mean) + a_obj)
    return sab, eyr


def assert_close(actual: dict, wanted: dict, rel: float = 1e-3):
    assert set(actual) == set(BANDS), f"Bänder: {sorted(actual)}"
    for b in BANDS:
        assert actual[b] == pytest.approx(wanted[b], rel=rel), f"Band {b} Hz: {actual[b]} statt {wanted[b]}"


def test_ak1_sabine_and_eyring_match_formula():
    """AK-1: Sabine und Eyring je Band innerhalb 0,1 % der Formel; Eyring kürzer als Sabine."""
    code, out, err = run(ROOM)
    assert code == 0, err[-2000:]
    sab, eyr = expected(ROOM)
    assert_close(out["sabine_s"], sab)
    assert_close(out["eyring_s"], eyr)
    assert all(out["eyring_s"][b] < out["sabine_s"][b] for b in BANDS)
    assert out.get("assumptions"), "Annahmen fehlen in der Antwort"


def test_ak2_objects_reduce_reverberation():
    """AK-2: Absorber als Objekte verkürzen die Nachhallzeit in jedem Band, exakt nach Formel."""
    room = {**ROOM, "objects": OBJECTS}
    code, out, err = run(room)
    assert code == 0, err[-2000:]
    sab, eyr = expected(room)
    assert_close(out["sabine_s"], sab)
    assert_close(out["eyring_s"], eyr)
    _, base, _ = run(ROOM)
    assert all(out["sabine_s"][b] < base["sabine_s"][b] for b in BANDS)


def test_ak2_full_absorption_eyring_zero():
    """AK-2: α = 1 überall ergibt nach Eyring 0 s."""
    room = {"volume_m3": 60.0, "surfaces": [{"area_m2": 94.0, "alpha": bands(1, 1, 1, 1, 1, 1)}]}
    code, out, err = run(room)
    assert code == 0, err[-2000:]
    assert all(out["eyring_s"][b] == pytest.approx(0.0, abs=1e-9) for b in BANDS)


@pytest.mark.parametrize(
    ("payload", "code"),
    [
        ({**ROOM, "volume_m3": 0}, "volume_invalid"),
        ({**ROOM, "volume_m3": -5}, "volume_invalid"),
        (
            {"volume_m3": 60, "surfaces": [{"area_m2": 10, "alpha": bands(0.1, 0.1, 1.2, 0.1, 0.1, 0.1)}]},
            "alpha_out_of_range",
        ),
        ({"volume_m3": 60, "surfaces": [{"area_m2": 10, "alpha": {"125": 0.1, "250": 0.1}}]}, "band_missing"),
        ({"volume_m3": 60, "surfaces": [{"area_m2": 94, "alpha": bands(0, 0, 0, 0, 0, 0)}]}, "no_absorption"),
        ("{kein json", "invalid_json"),
    ],
)
def test_ak3_invalid_input_gives_structured_error(payload, code):
    """AK-3: Ungültige Eingaben ergeben Exit-Code 2 und einen Fehler mit code, message und hint."""
    rc, out, err = run(payload)
    assert rc == 2, f"Exit-Code {rc}, stderr: {err[-500:]}"
    error = out.get("error", {})
    assert error.get("code") == code
    assert error.get("message") and error.get("hint")


def test_ak4_output_is_json_with_all_bands():
    """AK-4: Die Antwort hat genau die Schlüssel sabine_s, eyring_s, assumptions und alle sechs Bänder."""
    code, out, err = run(ROOM)
    assert code == 0, err[-2000:]
    assert set(out) == {"sabine_s", "eyring_s", "assumptions"}
    assert set(out["sabine_s"]) == set(out["eyring_s"]) == set(BANDS)


def test_ak5_thousand_surfaces_within_budget():
    """AK-5: 1.000 Flächen, alle Bänder, beide Verfahren im Mittel höchstens 1.000 µs (release)."""
    code, out, err = run("", "bench", "--surfaces", "1000")
    assert code == 0, err[-2000:]
    assert out["surfaces"] == 1000 and out["runs"] >= 100
    assert out["mean_us"] <= 1000, f"{out['mean_us']} µs"


def test_ak5_thousand_surfaces_measured_independently():
    """AK-5: 1.000 Flächen über das Release-Binary, vom Test gemessen: richtig, Median ≤ 50 ms."""
    code, _, err = run(ROOM)  # baut das Release-Binary
    assert code == 0, err[-2000:]
    binary = ROOT / "target" / "release" / "cee-acoustics"
    assert binary.exists() or binary.with_suffix(".exe").exists(), "Release-Binary fehlt"
    if not binary.exists():
        binary = binary.with_suffix(".exe")
    surfaces = [
        {"area_m2": 0.5 + (i % 7) * 0.1, "alpha": bands(*(0.02 + ((i + k) % 9) * 0.01 for k in range(6)))}
        for i in range(1000)
    ]
    room = {"volume_m3": 900.0, "surfaces": surfaces}
    payload = json.dumps(room)
    sab, eyr = expected(room)
    times = []
    for _ in range(11):
        start = time.perf_counter()
        res = subprocess.run([str(binary), "rt"], input=payload, capture_output=True, text=True, timeout=60)
        times.append(time.perf_counter() - start)
        assert res.returncode == 0, res.stderr[-2000:]
        out = json.loads(res.stdout)
        assert_close(out["sabine_s"], sab)
        assert_close(out["eyring_s"], eyr)
    median_ms = statistics.median(times) * 1000
    assert median_ms <= 50, f"Median {median_ms:.1f} ms"
