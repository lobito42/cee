"""ap-50, Capability `kernel-protokoll`: echter Kern, Worker als eigener Prozess, Auftrag über den Rust-Kern (AK-9 bis AK-11).

Zeiten misst der Test selbst (Median aus 5, warm); Quellen werden durchsucht, nichts wird dem Worker geglaubt.
"""

# ruff: noqa: E501

from __future__ import annotations

import importlib.metadata
import json
import math
import re
import statistics
import subprocess
import sys
import time

from conftest import ROOT, need_module
from wf_helpers import (
    SRC,
    TOL_MM,
    auftrag_von,
    beispiel,
    beispiel_berechnet,
    berechne,
    ergebnisse,
    frame,
    linie,
    nahe,
    pos,
    projekt,
    punkt,
    rechnen_roh,
    richtung,
    typen,
    worker_env,
)

WORKER = ROOT / "worker"


def _ocp_version() -> str:
    ocp = need_module("OCP")
    v = getattr(ocp, "__version__", None)
    if v:
        return str(v)
    for name in ("cadquery-ocp", "cadquery-ocp-novtk", "OCP"):
        try:
            return importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            continue
    raise AssertionError("Version des OCP-Pakets nicht ermittelbar")


def test_echter_kern_kennung_und_ort_der_ocp_aufrufe():
    """Requirement „Echter Geometriekern“, Scenario „Kernel-Kennung und Ort der OCP-Aufrufe“: `kernel.name` = `occt`,
    `kernel.version` = Version des installierten OCP, OCP- und build123d-Importe nur unter `cee_worker/kernel/`."""
    _, e = beispiel_berechnet()
    assert e["kernel"]["name"] == "occt"
    assert e["kernel"]["version"] == _ocp_version()
    kern = SRC / "cee_worker" / "kernel"
    assert kern.is_dir(), "worker/src/cee_worker/kernel/ fehlt"
    muster = re.compile(r"^\s*(import|from)\s+(OCP|build123d)\b", re.MULTILINE)
    drinnen = [f for f in kern.rglob("*.py") if muster.search(f.read_text(encoding="utf-8"))]
    assert drinnen, (
        "im Modul kernel gibt es keinen OCP-Import: die Geometrie wird nicht mit OpenCascade gerechnet"
    )
    ausserhalb = [
        str(f.relative_to(ROOT))
        for f in WORKER.rglob("*.py")
        if kern not in f.parents and muster.search(f.read_text(encoding="utf-8"))
    ]
    assert ausserhalb == [], ausserhalb


def _stdio():
    return subprocess.Popen(
        [sys.executable, "-m", "cee_worker", "--stdio"],
        cwd=ROOT,
        env=worker_env(),
        text=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        bufsize=1,
    )


def _zeile(p: subprocess.Popen, a: dict | str) -> str:
    p.stdin.write((a if isinstance(a, str) else json.dumps(a, separators=(",", ":"))) + "\n")
    p.stdin.flush()
    z = p.stdout.readline()
    assert z, (
        f"Worker hat nicht geantwortet: {p.poll()} {p.stderr.read()[-1500:] if p.poll() is not None else ''}"
    )
    return z


def test_dauerbetrieb_stdio_und_absturz_trifft_nur_den_worker():
    """Requirement „Worker als eigener Prozess“, Scenarios „Dauerbetrieb über stdio“ (3 Zeilen, zweite mit Befund
    `protocol`, erste und dritte bytegleich, Prozess läuft weiter) und „Absturz trifft nur den Worker“ (Exit-Code 70
    ohne Ausgabe mit `CEE_WORKER_TEST=1`, sonst vollständiges Ergebnis)."""
    a, _ = beispiel_berechnet()
    p = _stdio()
    try:
        z1 = _zeile(p, a)
        z2 = _zeile(p, "kein json")
        z3 = _zeile(p, a)
        assert "protocol" in [b["code"] for b in json.loads(z2)["befunde"]], z2
        assert z1 == z3 and json.loads(z1)["results"], "erste und dritte Zeile müssen bytegleich sein"
        assert p.poll() is None, "Worker darf bei ungültigem JSON nicht enden"
        assert len([z for z in (z1, z2, z3) if z.strip()]) == 3
    finally:
        p.stdin.close()
        p.wait(timeout=30)

    b = beispiel()
    b["elements"][-1]["meta"]["test_absturz"] = True
    a2 = auftrag_von(b)
    r = rechnen_roh(a2, extra_env={"CEE_WORKER_TEST": "1"})
    assert r.returncode == 70 and r.stdout == "", (r.returncode, r.stdout[:200])
    ok = rechnen_roh(a2)
    assert ok.returncode == 0, ok.stderr[-1500:]
    res = json.loads(ok.stdout)["results"]
    assert res and all(x["state"] == "aktuell" for x in res), [x for x in res if x["state"] != "aktuell"]


def _grosses_projekt() -> dict:
    n = 1000
    el = [frame("K", 10, 20, 30, 0, 0, 15)]
    el += [punkt(f"p{i}", i % 97, (i * 7) % 89, i % 13, frame_ref="K.frame") for i in range(n)]
    el += [linie("segment", f"s{i}", f"p{i}.point", f"p{i + 1}.point") for i in range(500)]
    return projekt(*el)


def test_leistung_worker_warm():
    """Requirement „Worker als eigener Prozess“, Scenario „Leistung warm“: 1 Koordinatensystem, 1 000 Punkte, 500
    Strecken, 5-mal an einen warmen `--stdio`-Worker: Median ≤ 1,0 s; die Lagen sind dabei richtig."""
    gross = auftrag_von(_grosses_projekt())
    assert len(gross["elements"]) == 1501
    a, _ = beispiel_berechnet()
    p = _stdio()
    zeiten = []
    try:
        _zeile(p, a)  # aufwärmen
        zeile = json.dumps(gross, separators=(",", ":"))
        letzte = ""
        for _i in range(5):
            t = time.perf_counter()
            letzte = _zeile(p, zeile)
            zeiten.append(time.perf_counter() - t)
    finally:
        p.stdin.close()
        p.wait(timeout=30)
    e = json.loads(letzte)
    assert len(e["results"]) == len(gross["elements"]), "nicht alle Elemente berechnet"
    assert statistics.median(zeiten) <= 1.0, zeiten
    assert nahe(pos(e, "p0"), (10, 20, 30), TOL_MM)  # p0 liegt im Ursprung von K


def test_auftrag_reihenfolge_zyklus_und_einheiten_wie_der_kern():
    """Requirement „Auftrag aus dem Graphen über den Rust-Kern“, Scenarios „Reihenfolge und Zyklus“ (Reihenfolge gleich
    `Document.order()`, Zyklus ⇒ `input_missing` mit Hinweis) und „Einheiten wie der Kern“ (Lagen wie
    `Quantity.parse(...).to(...)`, Warnung für Zahl ohne Einheit, keine Umrechnungsfaktoren im Quelltext)."""
    b = beispiel()
    b["elements"].reverse()
    a = auftrag_von(b)
    sdk = need_module("cee_sdk")
    ids = [x["id"] for x in a["elements"]]
    soll = sdk.Document.import_project(b, typen()).order()
    assert soll["skipped"] == [] and ids == soll["order"], (ids, soll)
    stelle = {i: n for n, i in enumerate(ids)}
    for x in a["elements"]:
        for ref in x["inputs"].values():
            assert stelle[ref.split(".")[0]] < stelle[x["id"]], (x["id"], ref)

    _, e = berechne(projekt(punkt("A1", ref="A2.point"), punkt("A2", ref="A1.point")))
    for id in ("A1", "A2"):
        r = ergebnisse(e)[id]
        assert r["state"] == "fehlerhaft", id
        zyklus = [x for x in r["befunde"] if x["code"] == "input_missing"]
        assert zyklus and re.search(r"zyklus|cycle", json.dumps(zyklus).lower()), (id, r["befunde"])

    # Einheiten: erwartet wird, was der Kern liefert
    eingaben = {
        "U1": {"value": 1.2, "unit": "m"},
        "U2": 1200,
        "U3": {"value": 47.244094488, "unit": "[in_i]"},
    }
    elemente = []
    for id, x in eingaben.items():
        el = punkt(id)
        el["params"]["x"] = x
        elemente.append(el)
    elemente += [
        _frame_rz("FA", {"value": 30, "unit": "deg"}),
        _frame_rz("FB", {"value": 0.5235987755982988, "unit": "rad"}),
    ]
    auftrag, ergebnis = berechne(projekt(*elemente))
    erwartet = {
        "U1": sdk.Quantity(1.2, "m").to("mm").value,
        "U2": 1200.0,
        "U3": sdk.Quantity(47.244094488, "[in_i]").to("mm").value,
    }
    for id, mm_ in erwartet.items():
        assert nahe(pos(ergebnis, id), (mm_, 0, 0), TOL_MM), (id, pos(ergebnis, id), mm_)
    for id, q in (("FA", sdk.Quantity(30, "deg")), ("FB", sdk.Quantity(0.5235987755982988, "rad"))):
        rz = q.to("rad").value
        d = richtung(ergebnisse(ergebnis)[id]["outputs"]["x"])
        assert abs(d[0] - math.cos(rz)) <= 1e-9 and abs(d[1] - math.sin(rz)) <= 1e-9, (id, d, rz)
    assert "unit_assumed" in json.dumps([auftrag, ergebnis]), "Warnung des Kerns für Zahl ohne Einheit fehlt"
    quellen = "\n".join(f.read_text(encoding="utf-8") for f in (SRC / "cee_worker").rglob("*.py"))
    assert not re.search(r"(?<![\w.])(25\.4|0\.0174532|57\.2957)", quellen), (
        "Umrechnungsfaktor als Literal im Worker"
    )


def _frame_rz(id: str, rz: dict) -> dict:
    f = frame(id)
    f["params"]["rz"] = rz
    return f


def test_budget_auftrag_bauen():
    """Requirement „Auftrag aus dem Graphen über den Rust-Kern“, Scenario „Budget Auftrag“: `auftrag.bauen` für das
    Projekt aus „Leistung warm“ 5-mal im selben Prozess, Median ≤ 0,5 s; gleicher Auftrag wie das Kommando."""
    import os  # noqa: PLC0415

    os.environ["PYTHONPATH"] = os.pathsep.join(filter(None, [str(SRC), os.environ.get("PYTHONPATH", "")]))
    if str(SRC) not in sys.path:
        sys.path.insert(0, str(SRC))
    from cee_worker import auftrag  # noqa: PLC0415

    p = _grosses_projekt()
    zeiten = []
    for _i in range(5):
        t = time.perf_counter()
        a = auftrag.bauen(p)
        zeiten.append(time.perf_counter() - t)
    assert statistics.median(zeiten) <= 0.5, zeiten
    assert a == auftrag_von(p), "auftrag.bauen und das Kommando `auftrag` müssen denselben Auftrag liefern"
