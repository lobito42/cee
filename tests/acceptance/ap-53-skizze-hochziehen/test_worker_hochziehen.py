"""ap-53, Capability `hochziehen`: Körper aus Bereichen, Befunde, Anzeige-Netz (AK-4).

Alle Sollwerte rechnet der Test analytisch nach; Topologie-Zählung gegen die Vergleichsform aus build123d (`Box`,
`Cylinder`). Toleranzen: Volumen und Oberfläche relativ 1e-6, Lagen 1e-6 mm.
"""

# ruff: noqa: E501

from __future__ import annotations

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import need_module  # noqa: E402
from skz_helpers import (  # noqa: E402
    TOL_MM,
    anzahl,
    befunde_mit,
    formen_von,
    hochziehen,
    huelle,
    k0,
    koerper,
    nahe,
    oberflaeche,
    rechne,
    rel,
    res,
    s_kreis,
    s_rechteck,
    skizze,
    volumen,
    zaehlung,
)
from wf_helpers import ausgang  # noqa: E402


def _quader_zylinder():
    return [
        skizze("S1", "K0.xy", s_rechteck("R1", -30, -20, 30, 20), s_kreis("C1", 100, 0, 20)),
        hochziehen("X1", "S1", 0, 0, 8),
        hochziehen("X2", "S1", 100, 0, -15),
    ]


def test_quader_und_zylinder():
    """Requirement „Hochziehen eines Bereichs zum Körper“, Scenario „Quader und Zylinder“: Rechteck (−30, −20)–(30, 20)
    mit `hoehe` = 8 mm: Volumen 19 200 mm³, Oberfläche 2·(60·40 + 60·8 + 40·8) mm², Hülle z von 0 bis 8 mm; Kreis bei
    (100, 0) mit d = 20 mm und `hoehe` = −15 mm: Volumen π·10²·15 mm³, Hülle z von −15 bis 0 mm; Anzahl Flächen und
    Kanten gleich der von build123d `Box` bzw. `Cylinder` mit denselben Maßen."""
    need_module("build123d")
    from build123d import Box, Cylinder  # noqa: PLC0415

    e = rechne(*_quader_zylinder())
    q, z = koerper(e, "X1"), koerper(e, "X2")
    assert res(e, "X1")["state"] == "aktuell" and res(e, "X2")["state"] == "aktuell"

    assert rel(volumen(q), 19200), volumen(q)
    assert rel(oberflaeche(q), 2 * (60 * 40 + 60 * 8 + 40 * 8)), oberflaeche(q)
    lo, hi = huelle(q)
    assert nahe(lo, (-30, -20, 0)) and nahe(hi, (30, 20, 8)), (lo, hi)
    box = Box(60, 40, 8)
    assert (anzahl(q["flaechen"]), anzahl(q["kanten"])) == (len(box.faces()), len(box.edges())), q["flaechen"]

    assert rel(volumen(z), math.pi * 10**2 * 15), volumen(z)
    assert rel(oberflaeche(z), 2 * math.pi * 10 * 15 + 2 * math.pi * 10**2), oberflaeche(z)
    lo, hi = huelle(z)
    assert nahe(lo, (90, -10, -15)) and nahe(hi, (110, 10, 0)), (lo, hi)
    zyl = Cylinder(10, 15)
    assert (anzahl(z["flaechen"]), anzahl(z["kanten"])) == (len(zyl.faces()), len(zyl.edges())), z["flaechen"]

    # Schwerpunkte (aus der exakten Form): Mitte der Prismen
    assert nahe(tuple(g["value"] for g in q["schwerpunkt"]), (0, 0, 4), TOL_MM)
    assert nahe(tuple(g["value"] for g in z["schwerpunkt"]), (100, 0, -7.5), TOL_MM)
    # Hochziehen vereinigt nichts: genau zwei Körper, jede Skizze/Hülle unabhängig
    assert sum(1 for r in e["results"] if "koerper" in r["outputs"]) == 2


def test_bereich_mit_loechern():
    """Scenario „Bereich mit Löchern“: der Bereich „Rechteck minus zwei Kreise“ mit Punkt (0, −10) und `hoehe` = 8 mm:
    Volumen (2 400 − 2·π·3,3²)·8 mm³ (relativ 1e-6), und der Körper hat 2 durchgehende zylindrische Flächen mit
    Radius 3,3 mm (1e-6 mm)."""
    need_module("OCP")
    elemente = [
        k0(),
        skizze(
            "S1",
            "K0.xy",
            s_rechteck("R1", -30, -20, 30, 20),
            s_kreis("C1", -20, 4, 6.6),
            s_kreis("C2", 20, 4, 6.6),
        ),
        hochziehen("X1", "S1", 0, -10, 8),
    ]
    e = rechne(*elemente[1:])
    assert rel(volumen(koerper(e, "X1")), (2400 - 2 * math.pi * 3.3**2) * 8), volumen(koerper(e, "X1"))

    from OCP.BRepAdaptor import BRepAdaptor_Surface  # noqa: PLC0415
    from OCP.GeomAbs import GeomAbs_Cylinder  # noqa: PLC0415
    from OCP.TopAbs import TopAbs_FACE  # noqa: PLC0415
    from OCP.TopExp import TopExp_Explorer  # noqa: PLC0415
    from OCP.TopoDS import TopoDS  # noqa: PLC0415

    form = formen_von(elemente)["X1"]
    radien = []
    ex = TopExp_Explorer(form, TopAbs_FACE)
    while ex.More():
        f = BRepAdaptor_Surface(TopoDS.Face_s(ex.Current()))
        if f.GetType() == GeomAbs_Cylinder:
            radien.append(f.Cylinder().Radius())
        ex.Next()
    assert len(radien) == 2 and all(abs(r - 3.3) <= TOL_MM for r in radien), radien
    n_flaechen, _ = zaehlung(form)
    assert n_flaechen == 8, n_flaechen  # 6 Seiten + 2 Bohrungen


def test_punkt_ausserhalb_und_hoehe_null():
    """Scenario „Punkt außerhalb und Höhe null“: ein `extrude` mit Punkt (500, 500) außerhalb jedes Bereichs, ein zweites
    mit `hoehe` = 0 mm, ein drittes gültig: genau 1 Befund `region_missing` und 1 Befund `degenerate` mit den richtigen
    Element-IDs, das dritte hat `state` = `aktuell`."""
    e = rechne(
        skizze("S1", "K0.xy", s_rechteck("R1", 0, 0, 60, 40)),
        hochziehen("XA", "S1", 500, 500, 8),
        hochziehen("XB", "S1", 30, 20, 0),
        hochziehen("XC", "S1", 30, 20, 8),
    )
    fehlt = befunde_mit(e, "region_missing")
    assert [i for i, _ in fehlt] == ["XA"], fehlt
    entartet = befunde_mit(e, "degenerate")
    assert [i for i, _ in entartet] == ["XB"], entartet  # im ganzen Ergebnis genau 1
    assert res(e, "XA")["state"] == "fehlerhaft" and res(e, "XB")["state"] == "fehlerhaft"
    assert res(e, "XC")["state"] == "aktuell"
    assert rel(volumen(koerper(e, "XC")), 60 * 40 * 8)
    for i in ("XA", "XB"):
        assert "koerper" not in res(e, i)["outputs"] or not res(e, i)["outputs"]["koerper"], i


def test_bereich_verschwindet_nach_aenderung():
    """Scenario „Bereich verschwindet nach Änderung“: ein Kreis (Mittelpunkt (0, 0), d = 20 mm) mit Punkt (0, 0) wird
    hochgezogen; danach wird der Kreis auf den Mittelpunkt (50, 0) mm geändert: das Hochziehen meldet `region_missing`
    und liefert keinen Körper."""
    vorher = rechne(skizze("S1", "K0.xy", s_kreis("C1", 0, 0, 20)), hochziehen("X1", "S1", 0, 0, 10))
    assert res(vorher, "X1")["state"] == "aktuell"
    assert rel(volumen(koerper(vorher, "X1")), math.pi * 100 * 10)
    nachher = rechne(skizze("S1", "K0.xy", s_kreis("C1", 50, 0, 20)), hochziehen("X1", "S1", 0, 0, 10))
    assert [i for i, _ in befunde_mit(nachher, "region_missing")] == ["X1"], res(nachher, "X1")
    assert "koerper" not in res(nachher, "X1")["outputs"] or not res(nachher, "X1")["outputs"]["koerper"]
    assert res(nachher, "X1")["state"] == "fehlerhaft"


# --- Anzeige-Netz ---------------------------------------------------------------------------------------


def test_netz_liegt_auf_der_form_und_ist_geschlossen():
    """Requirement „Anzeige-Netz und Kantenzüge“, Scenario „Netz liegt auf der Form“: beim Zylinder (d = 20, hoehe −15)
    ist jeder Netzpunkt höchstens 0,05 mm von der OCP-Form entfernt (`BRepExtrema_DistShapeShape`), jede Netzkante gehört
    zu genau 2 Dreiecken (Punkte gleicher Lage gelten als ein Punkt), und das aus dem Netz berechnete Volumen weicht
    höchstens 1 % vom exakten ab; Kantenzüge sind vorhanden."""
    need_module("OCP")
    elemente = [k0(), *_quader_zylinder()]
    e = rechne(*elemente[1:])
    o = koerper(e, "X2")
    netz = o["netz"]
    assert netz.get("unit") == "mm", sorted(netz)
    pos, tri = netz["positionen"], netz["dreiecke"]
    assert len(pos) % 3 == 0 and len(tri) % 3 == 0 and len(tri) >= 12, (len(pos), len(tri))
    punkte = [tuple(float(x) for x in pos[i : i + 3]) for i in range(0, len(pos), 3)]
    assert all(0 <= i < len(punkte) for i in tri)

    from OCP.BRepBuilderAPI import BRepBuilderAPI_MakeVertex  # noqa: PLC0415
    from OCP.BRepExtrema import BRepExtrema_DistShapeShape  # noqa: PLC0415
    from OCP.gp import gp_Pnt  # noqa: PLC0415

    form = formen_von(elemente)["X2"]
    schlimmster = 0.0
    for p in punkte:
        d = BRepExtrema_DistShapeShape(BRepBuilderAPI_MakeVertex(gp_Pnt(*p)).Vertex(), form)
        d.Perform()
        schlimmster = max(schlimmster, d.Value())
    assert schlimmster <= 0.05, schlimmster

    schluessel = {}
    ids = [schluessel.setdefault(tuple(round(c, 6) for c in p), len(schluessel)) for p in punkte]
    kanten: dict[tuple[int, int], int] = {}
    for t in range(0, len(tri), 3):
        a, b, c = (ids[tri[t]], ids[tri[t + 1]], ids[tri[t + 2]])
        for u, v in ((a, b), (b, c), (c, a)):
            kanten[(min(u, v), max(u, v))] = kanten.get((min(u, v), max(u, v)), 0) + 1
    falsch = {k: n for k, n in kanten.items() if n != 2}
    assert not falsch, f"{len(falsch)} Netzkanten gehören nicht zu genau 2 Dreiecken"

    vol = 0.0
    for t in range(0, len(tri), 3):
        a, b, c = (punkte[tri[t]], punkte[tri[t + 1]], punkte[tri[t + 2]])
        vol += (
            a[0] * (b[1] * c[2] - b[2] * c[1])
            - a[1] * (b[0] * c[2] - b[2] * c[0])
            + a[2] * (b[0] * c[1] - b[1] * c[0])
        ) / 6
    assert abs(abs(vol) - volumen(o)) <= 0.01 * volumen(o), (vol, volumen(o))
    kz = o["kantenzuege"]
    assert kz["unit"] == "mm" and kz["zuege"], "Kantenzüge: Einheit mm und mindestens ein Zug"
    assert all(len(z) >= 2 and all(len(pt) == 3 for pt in z) for z in kz["zuege"]), kz["zuege"][:2]
    assert ausgang(e, "X2", "koerper")["type"] == "solid"
