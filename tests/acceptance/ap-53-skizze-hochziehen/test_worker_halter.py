"""ap-53, Capabilities `hochziehen` und `skizze`: Inhalts-Hash, Determinismus, Abnahmefall Halter und Budgets im Worker
(AK-5, AK-6).

Der Halter leitet seine Maße aus `Params()` in `parts/examples/halter.py` ab; die Vergleichsform baut der Test selbst
mit build123d (ohne Verrundung). Toleranzen: Volumen und Oberfläche relativ 1e-6, Schwerpunkt 1e-6 mm.
"""

# ruff: noqa: E501

from __future__ import annotations

import copy
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import need_module  # noqa: E402
from skz_helpers import (  # noqa: E402
    BEISPIEL_SKIZZE,
    TOL_MM,
    anzahl,
    auftrag_von,
    berechne,
    bereiche,
    halter_direkt,
    halter_elemente,
    halter_params,
    halter_referenz,
    huelle,
    koerper,
    nahe,
    oberflaeche,
    projekt,
    rechnen_auftrag,
    rechnen_roh,
    rel,
    res,
    s_kreis,
    s_rechteck,
    skizze,
    stdio_median,
    volumen,
)
from wf_helpers import finde  # noqa: E402


def _hashes(e: dict) -> dict[str, str]:
    return {r["id"]: r["hash"] for r in e["results"]}


def _halter_projekt() -> dict:
    return projekt(*halter_elemente())


def test_hash_folgt_den_kindern_und_ist_deterministisch():
    """Requirement „Inhalts-Hash und Determinismus“, Scenario „Hash folgt den Kindern“: im Halter (a) Element umbenannt:
    alle Hashes gleich; (b) Durchmesser eines Kreises von S1 geändert: Hashes von S1 und dem Hochziehen der Grundplatte
    ändern sich, die von S2 und dem Steg nicht; (c) derselbe Auftrag zweimal gerechnet: bytegleiche Ergebnisse. Dazu: das
    Verwerfen eines Kindes ändert den Hash der Skizze wie sein Entfernen (nur nicht verworfene Kinder gehen ein)."""
    basis = _halter_projekt()
    a0, e0 = berechne(basis)
    h0 = _hashes(e0)

    p_a = copy.deepcopy(basis)
    finde(p_a, "C1")["meta"]["name"] = "Bohrung links"
    finde(p_a, "S2")["meta"]["name"] = "Skizze Steg"
    assert _hashes(rechnen_auftrag(auftrag_von(p_a))) == h0, "Umbenennen darf keinen Hash ändern"

    p_b = copy.deepcopy(basis)
    finde(p_b, "C1")["params"]["d"] = {"value": 8.0, "unit": "mm"}
    h_b = _hashes(rechnen_auftrag(auftrag_von(p_b)))
    for i in ("C1", "S1", "X1"):
        assert h_b[i] != h0[i], f"{i}: Hash muss sich ändern"
    for i in ("K0", "R1", "C2", "K1", "S2", "R2", "X2"):
        assert h_b[i] == h0[i], f"{i}: Hash darf sich nicht ändern"

    r1, r2 = rechnen_roh(a0), rechnen_roh(a0)
    assert r1.returncode == 0 and r1.stdout and r1.stdout == r2.stdout, (
        "gleicher Auftrag muss bytegleich rechnen"
    )

    # nur nicht verworfene Kinder gehen in den Hash der Skizze ein
    verworfen = copy.deepcopy(basis)
    finde(verworfen, "C2")["meta"]["verworfen"] = True
    ohne = copy.deepcopy(basis)
    s1 = finde(ohne, "S1")
    s1["content"] = [k for k in s1["content"] if k["id"] != "C2"]
    assert (
        _hashes(rechnen_auftrag(auftrag_von(verworfen)))["S1"]
        == _hashes(rechnen_auftrag(auftrag_von(ohne)))["S1"]
    )


def test_halter_gegen_build123d():
    """Requirement „Abnahmefall Halter im Worker“, Scenario „Halter gegen build123d“: Volumen, Oberfläche (relativ 1e-6)
    und Schwerpunkt (1e-6 mm) beider Körper gleich der Vergleichsform aus `Params()`, Topologie-Zählung (Flächen,
    Kanten) gleich, Summe der Volumen bei den Standardwerten 42 652,6 mm³ (± 0,1)."""
    p = halter_params()
    platte, steg = halter_referenz(p)
    e = halter_direkt()
    for id, ref in (("X1", platte), ("X2", steg)):
        assert res(e, id)["state"] == "aktuell", res(e, id).get("befunde")
        o = koerper(e, id)
        assert rel(volumen(o), ref.volume), (id, volumen(o), ref.volume)
        assert rel(oberflaeche(o), ref.area), (id, oberflaeche(o), ref.area)
        schwer = ref.center()
        assert nahe(tuple(g["value"] for g in o["schwerpunkt"]), (schwer.X, schwer.Y, schwer.Z), TOL_MM), id
        assert (anzahl(o["flaechen"]), anzahl(o["kanten"])) == (len(ref.faces()), len(ref.edges())), id
        bb = ref.bounding_box()
        lo, hi = huelle(o)
        assert nahe(lo, (bb.min.X, bb.min.Y, bb.min.Z), TOL_MM) and nahe(
            hi, (bb.max.X, bb.max.Y, bb.max.Z), TOL_MM
        ), id
    summe = volumen(koerper(e, "X1")) + volumen(koerper(e, "X2"))
    assert (p.breite, p.tiefe, p.dicke, p.steg_hoehe, p.bohrung_d, p.bohrung_abstand) == (
        60.0,
        40.0,
        8.0,
        50.0,
        6.6,
        40.0,
    ), "Standardwerte von Params() haben sich geändert"
    assert abs(summe - 42652.6) <= 0.1, summe
    assert abs(summe - (platte.volume + steg.volume)) <= 1e-6 * summe


def test_halter_beispieldatei_ist_der_halter():
    """Requirement „Typdefinitionen der Skizze als Daten“ (Beispiel) und „Abnahmefall Halter im Worker“:
    `format/examples/skizze.json` berechnet zwei Körper mit denselben Volumen wie der Halter nach design.md Abschnitt 8."""
    assert BEISPIEL_SKIZZE.is_file(), "format/examples/skizze.json fehlt"
    bsp = json.loads(BEISPIEL_SKIZZE.read_text(encoding="utf-8"))
    e = rechnen_auftrag(auftrag_von(bsp))
    vol = sorted(volumen(o) for r in e["results"] for o in r["outputs"].values() if o.get("type") == "solid")
    soll = sorted(volumen(koerper(halter_direkt(), i)) for i in ("X1", "X2"))
    assert len(vol) == 2 and all(rel(a, b) for a, b in zip(vol, soll, strict=True)), (vol, soll)


def test_halter_warm_unter_einer_halben_sekunde():
    """Scenario „Halter gegen build123d“ (Laufzeit): beide Körper warm an `--stdio` in höchstens 0,5 s (Median aus 5)."""
    need_module("cee_worker")
    a = auftrag_von(_halter_projekt())
    median, letzte = stdio_median(a)
    assert sum(1 for r in letzte["results"] if "koerper" in r["outputs"]) == 2, "nicht beide Körper berechnet"
    assert median <= 0.5, median


def test_budget_200_bereiche():
    """Scenario „Budget Bereiche“: eine Skizze mit 100 Rechtecken und 100 Kreisen ohne Schnitt, warm: 200 Bereiche in
    höchstens 1,0 s (Median aus 5)."""
    kinder = [
        s_rechteck(f"R{i}", (i % 10) * 30, (i // 10) * 30, (i % 10) * 30 + 20, (i // 10) * 30 + 20)
        for i in range(100)
    ]
    kinder += [s_kreis(f"C{i}", (i % 10) * 30 + 10, 400 + (i // 10) * 30, 20) for i in range(100)]
    p = projekt(*halter_elemente()[:1], skizze("SL", "K0.xy", *kinder))
    a = auftrag_von(p)
    median, e = stdio_median(a)
    assert len(bereiche(e, "SL")) == 200
    assert not [b for r in e["results"] for b in r.get("befunde", [])], "unerwartete Befunde"
    assert median <= 1.0, median
