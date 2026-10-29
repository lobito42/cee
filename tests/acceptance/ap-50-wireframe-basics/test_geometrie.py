"""ap-50, Capability `drahtmodell`: Koordinatensystem, Punkt, Gerade/Halbgerade/Strecke, Referenzen (AK-3 bis AK-6).

Alle Sollwerte rechnet der Test aus den Parametern nach (design.md Abschnitt 2); der Worker wird nur gelesen.
Toleranzen: Lagen und Längen 1e-6 mm, Richtungen 1e-9 rad.
"""

# ruff: noqa: E501

from __future__ import annotations

import math
import re

from conftest import need_module
from wf_helpers import (
    AUSGAENGE,
    EBENEN,
    TOL_MM,
    TOL_RAD,
    alle,
    auftrag_von,
    beispiel,
    beispiel_berechnet,
    berechne,
    betrag,
    einheitsvektor,
    ergebnisse,
    finde,
    frame,
    groesse,
    kreuz,
    lage_frame,
    linie,
    mal_v,
    minus,
    mm,
    nahe,
    plus,
    pos,
    projekt,
    punkt,
    rechnen_auftrag,
    richtung,
    setze_x,
    skalar,
    spalte,
    vec,
    winkel,
)


def _frame_ausgaenge(e: dict, id: str, t, r) -> None:
    o = ergebnisse(e)[id]["outputs"]
    assert nahe(vec(o["origin"]["position"]), t, TOL_MM), (id, "origin", o["origin"], t)
    achsen = []
    for i, n in enumerate("xyz"):
        d = richtung(o[n])
        assert nahe(vec(o[n]["origin"]), t, TOL_MM), (id, n, "Ursprung")
        assert winkel(d, spalte(r, i)) <= TOL_RAD, (id, n, d, spalte(r, i))
        achsen.append(d)
    for i, j in ((0, 1), (0, 2), (1, 2)):
        assert abs(skalar(achsen[i], achsen[j])) <= 1e-12, (id, i, j)
    assert winkel(kreuz(achsen[0], achsen[1]), achsen[2]) <= 1e-9, (id, "nicht rechtshändig")
    for name, (normale, bezug) in EBENEN.items():
        ebene = o[name]
        assert nahe(vec(ebene["origin"]), t, TOL_MM), (id, name)
        assert winkel(richtung(ebene, "normal"), mal_v(r, normale)) <= TOL_RAD, (id, name, "Normale")
        assert winkel(richtung(ebene, "x_direction"), mal_v(r, bezug)) <= TOL_RAD, (
            id,
            name,
            "Bezugsrichtung",
        )


def test_koordinatensysteme_und_kinder():
    """Requirement „Koordinatensystem“, Scenarios „Fünf Koordinatensysteme“ (F1 bis F5 inkl. verschachtelt, gedreht:
    Ursprung, Achsen, Ebenen, Orthogonalität, Rechtshändigkeit, 5 von 5) und „Kind-Elemente“ (K1: 7 Kinder aktuell,
    Lage wie die Ausgänge)."""
    _, e = berechne(
        projekt(
            frame("F1"),
            frame("F2", x=100),
            frame("F3", rz=30),
            frame("F4", 10, -20, 5, 90, 45, -60),
            frame("F5", rz=30, parent="F4.frame"),
        )
    )
    f1 = lage_frame()
    f2 = lage_frame(x=100)
    f3 = lage_frame(rz=30)
    f4 = lage_frame(10, -20, 5, 90, 45, -60)
    f5 = lage_frame(rz=30, eltern=f4)
    for id, (t, r) in {"F1": f1, "F2": f2, "F3": f3, "F4": f4, "F5": f5}.items():
        assert ergebnisse(e)[id]["state"] == "aktuell", id
        _frame_ausgaenge(e, id, t, r)
    # F2 und F3 sind einfache Fälle: x = 100 bzw. 30 Grad um z
    assert nahe(f2[0], (100, 0, 0)) and nahe(spalte(f3[1], 0), (math.cos(math.pi / 6), 0.5, 0))

    a, e = beispiel_berechnet()
    res = ergebnisse(e)
    kinder = [k for k in a["elements"] if k["id"] == "K1"][0]["content"]
    assert len(kinder) == 7, kinder
    typen = sorted(next(x for x in a["elements"] if x["id"] == k)["type"] for k in kinder)
    assert typen == ["axis"] * 3 + ["plane"] * 3 + ["point"], typen
    k1 = res["K1"]["outputs"]
    for kid in kinder:
        el = next(x for x in a["elements"] if x["id"] == kid)
        assert res[kid]["state"] == "aktuell", kid
        o = res[kid]["outputs"]
        if el["type"] == "point":
            assert el["inputs"]["frame"] == "K1.frame"
            assert nahe(pos(e, kid), vec(k1["origin"]["position"]), TOL_MM)
        elif el["type"] == "axis":
            quelle = k1[el["inputs"]["of"].split(".")[1]]
            assert winkel(richtung(o["line"]), richtung(quelle)) <= TOL_RAD, kid
            assert nahe(vec(o["line"]["origin"]), vec(quelle["origin"]), TOL_MM), kid
        else:
            quelle = k1[el["inputs"]["of"].split(".")[1]]
            assert winkel(richtung(o["plane"], "normal"), richtung(quelle, "normal")) <= TOL_RAD, kid
            assert nahe(vec(o["plane"]["origin"]), vec(quelle["origin"]), TOL_MM), kid
    bezug = sorted(
        x["inputs"]["of"] for x in a["elements"] if x["id"] in kinder and x["type"] in ("axis", "plane")
    )
    assert bezug == ["K1.x", "K1.xy", "K1.y", "K1.yz", "K1.z", "K1.zx"], bezug


def test_punkte_auf_drei_wegen_folgen_und_bezug():
    """Requirement „Punkt“, Scenarios „Lage auf drei Wegen“ (P1 Welt, P2 in K1, P3 relativ), „Relativer Punkt folgt“
    (P1.x = 40 mm ⇒ P3 bei (40, 20, 25), P2 unverändert) und „Bezug auf andere Punkt-Ausgänge“ (4 von 4)."""
    b = beispiel()
    # die Parameter des Beispiels sind die, mit denen die Sollwerte gerechnet werden
    assert [finde(b, "P1")["params"][k] for k in "xyz"] == [mm(10), mm(20), mm(0)]
    assert [finde(b, "P2")["params"][k] for k in "xyz"] == [mm(50), mm(0), mm(0)]
    assert finde(b, "P2")["inputs"]["frame"] == "K1.frame" and finde(b, "P3")["inputs"]["ref"] == "P1.point"
    assert [finde(b, "P3")["params"][k] for k in "xyz"] == [mm(0), mm(0), mm(25)]
    k1 = finde(b, "K1")["params"]
    assert (k1["x"], k1["rz"]) == (mm(100), {"value": 30, "unit": "deg"})

    c30 = math.cos(math.radians(30))
    s30 = math.sin(math.radians(30))
    soll = {"P1": (10, 20, 0), "P2": (100 + 50 * c30, 50 * s30, 0), "P3": (10, 20, 25)}
    _, e = beispiel_berechnet()
    for id, s in soll.items():
        assert nahe(pos(e, id), s, TOL_MM), (id, pos(e, id), s)

    b2 = setze_x(beispiel(), "P1", mm(40))
    _, e2 = berechne(b2)
    assert nahe(pos(e2, "P3"), (40, 20, 25), TOL_MM)
    assert nahe(pos(e2, "P2"), soll["P2"], TOL_MM)

    # Bezug auf Ausgänge anderer Elemente: S1.start, S1.end, H1.start, K1.origin
    bezuege = {"R1": "S1.start", "R2": "S1.end", "R3": "H1.start", "R4": "K1.origin"}
    basis = {"R1": soll["P1"], "R2": soll["P2"], "R3": (100, 0, 0), "R4": (100, 0, 0)}
    b3 = beispiel()
    for id, ref in bezuege.items():
        b3["elements"].append(punkt(id, 1, 2, 3, ref=ref))
    _, e3 = berechne(b3)
    for id in bezuege:
        assert ergebnisse(e3)[id]["state"] == "aktuell", (id, ergebnisse(e3)[id])
        assert nahe(pos(e3, id), plus(basis[id], (1, 2, 3)), TOL_MM), (id, pos(e3, id))


def test_gerade_halbgerade_strecke_lage_und_kante():
    """Requirement „Gerade, Halbgerade und Strecke“, Scenarios „Lage, Richtung und Länge“ (S1, G1, H1 und Zusatzstrecke
    mit Länge 50 mm) und „Begrenzung der OCP-Kante“ (S1 endlich, G1 (-∞, ∞), H1 [0, ∞), 3 von 3)."""
    ocp = need_module("OCP")
    need_module("cee_worker.kernel")
    from cee_worker.kernel import formen, rechnen  # noqa: PLC0415

    b = beispiel()
    b["elements"] += [
        punkt("Z0", 0, 0, 0),
        punkt("Z1", 30, 40, 0),
        linie("segment", "Z2", "Z0.point", "Z1.point"),
    ]
    a = auftrag_von(b)
    e = rechnen_auftrag(a)

    c30, s30 = math.cos(math.radians(30)), math.sin(math.radians(30))
    p1, p2, p3 = (10, 20, 0), (100 + 50 * c30, 50 * s30, 0), (10, 20, 25)
    k0 = (100, 0, 0)
    o = ergebnisse(e)
    s1 = o["S1"]["outputs"]["segment"]
    assert nahe(vec(s1["start"]), p1) and nahe(vec(s1["end"]), p2)
    assert abs(groesse(s1["length"], "mm") - betrag(minus(p2, p1))) <= TOL_MM
    g1 = o["G1"]["outputs"]["line"]
    assert nahe(vec(g1["origin"]), p1) and winkel(richtung(g1), einheitsvektor(minus(p3, p1))) <= TOL_RAD
    h1 = o["H1"]["outputs"]["ray"]
    assert nahe(vec(h1["origin"]), k0) and winkel(richtung(h1), einheitsvektor(minus(p2, k0))) <= TOL_RAD
    for d in (richtung(g1), richtung(h1)):
        assert abs(betrag(d) - 1) <= 1e-12, d
    z2 = o["Z2"]["outputs"]["segment"]
    assert abs(groesse(z2["length"], "mm") - 50) <= TOL_MM
    assert nahe(vec(z2["start"]), (0, 0, 0)) and nahe(vec(z2["end"]), (30, 40, 0))

    # echter Kern: Parameterbereich der OCP-Kanten aus der Form gelesen
    from OCP.BRepAdaptor import BRepAdaptor_Curve  # noqa: PLC0415
    from OCP.GCPnts import GCPnts_AbscissaPoint  # noqa: PLC0415
    from OCP.Precision import Precision  # noqa: PLC0415
    from OCP.TopAbs import TopAbs_EDGE  # noqa: PLC0415
    from OCP.TopExp import TopExp_Explorer  # noqa: PLC0415
    from OCP.TopoDS import TopoDS  # noqa: PLC0415

    assert ocp is not None and rechnen(a)["protocol"] == "cee-kernel/0"
    shapes = formen(a)

    def kante(id: str):
        s = shapes[id]
        if s.ShapeType() == TopAbs_EDGE:
            return TopoDS.Edge_s(s)
        ex = TopExp_Explorer(s, TopAbs_EDGE)
        assert ex.More(), f"{id}: keine Kante in der Form"
        return TopoDS.Edge_s(ex.Current())

    c = BRepAdaptor_Curve(kante("S1"))
    assert not Precision.IsInfinite_s(c.FirstParameter()) and not Precision.IsInfinite_s(c.LastParameter())
    assert abs(GCPnts_AbscissaPoint.Length_s(c) - groesse(s1["length"], "mm")) <= TOL_MM
    g = BRepAdaptor_Curve(kante("G1"))
    assert Precision.IsInfinite_s(g.FirstParameter()) and Precision.IsInfinite_s(g.LastParameter())
    assert g.FirstParameter() < 0 < g.LastParameter()
    h = BRepAdaptor_Curve(kante("H1"))
    assert (
        abs(h.FirstParameter()) <= 1e-12
        and Precision.IsInfinite_s(h.LastParameter())
        and h.LastParameter() > 0
    )


def test_referenzen_nur_ueber_benannte_ausgaenge():
    """Requirement „Referenzen nur über benannte Ausgänge“, Scenario „Index und unbekannter Ausgang“: `P1.point[0]`,
    `P1.0`, `S1.edges`, `K1.faces` ergeben `input_missing` am Eingang `a` (4 von 4); alle Eingänge des Beispiels haben
    die Form `<id>.<name>` mit einem Namen aus der Tabelle."""
    b = beispiel()
    schlecht = {"X1": "P1.point[0]", "X2": "P1.0", "X3": "S1.edges", "X4": "K1.faces"}
    for id, a in schlecht.items():
        b["elements"].append(linie("segment", id, a, "P2.point"))
    _, e = berechne(b)
    for id in schlecht:
        r = ergebnisse(e)[id]
        assert r["state"] == "fehlerhaft", (id, r["state"])
        treffer = [x for x in r["befunde"] if x["code"] == "input_missing" and x.get("input") == "a"]
        assert len(treffer) == 1, (id, r["befunde"])
    # keine Fantasie-Ausgänge im Beispiel selbst
    el = {x["id"]: x for x in alle(beispiel())}
    for x in el.values():
        for name, ref in x["inputs"].items():
            m = re.fullmatch(r"([^.\s\[\]]+)\.([a-z_]+)", ref)
            assert m, (x["id"], name, ref)
            assert m.group(2) in AUSGAENGE[el[m.group(1)]["type"]], (x["id"], name, ref)
