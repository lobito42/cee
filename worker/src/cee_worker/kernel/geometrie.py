"""OCP-Formen der Wireframe-Basics (ap-50, design.md Abschnitt 2).

Jede Geometrie wird als OCP-Form gebaut; die gemeldeten Werte liest `lesen_*` aus der Form zurück, nicht aus
der Formel. Interne Werte für Folgeelemente: Punkt `gp_Pnt`, Linie/Halbgerade `gp_Ax1`, Ebene `gp_Ax3`,
Koordinatensystem `gp_Trsf`, Strecke `(gp_Pnt, gp_Pnt)`.
"""

from __future__ import annotations

from OCP.BRep import BRep_Builder, BRep_Tool
from OCP.BRepAdaptor import BRepAdaptor_Curve, BRepAdaptor_Surface
from OCP.BRepBuilderAPI import (
    BRepBuilderAPI_MakeEdge,
    BRepBuilderAPI_MakeFace,
    BRepBuilderAPI_MakeVertex,
)
from OCP.GCPnts import GCPnts_AbscissaPoint
from OCP.gp import gp_Ax1, gp_Ax3, gp_Dir, gp_Lin, gp_Pln, gp_Pnt, gp_Trsf, gp_Vec
from OCP.Precision import Precision
from OCP.TopoDS import (
    TopoDS,
    TopoDS_Compound,
    TopoDS_Edge,
    TopoDS_Face,
    TopoDS_Shape,
    TopoDS_Vertex,
)

# OCP 8 führt die Umwandlungen von `TopoDS` als Funktionen ohne Endung `_s` (OCP 7: `TopoDS.Edge_s`). Die
# alten Namen bleiben als Alias erhalten, damit Code für beide Fassungen läuft (nur ergänzt, nichts ersetzt).
for _name in ("Vertex", "Edge", "Wire", "Face", "Shell", "Solid", "CompSolid", "Compound"):
    if not hasattr(TopoDS, f"{_name}_s") and hasattr(TopoDS, _name):
        setattr(TopoDS, f"{_name}_s", getattr(TopoDS, _name))

Vec3 = tuple[float, float, float]

_NULL = gp_Pnt(0.0, 0.0, 0.0)


def _xyz(p) -> Vec3:
    return (p.X(), p.Y(), p.Z())


# --- Koordinatensystem ---------------------------------------------------------------------------------


def _drehung(achse: gp_Dir, winkel: float) -> gp_Trsf:
    t = gp_Trsf()
    t.SetRotation(gp_Ax1(_NULL, achse), winkel)
    return t


def frame_trsf(eltern: gp_Trsf | None, x: float, y: float, z: float, rx: float, ry: float, rz: float):
    """`T_K = T_parent · Trans(x, y, z) · Rz(rz) · Ry(ry) · Rx(rx)` (mm, rad)."""
    t = gp_Trsf()
    t.SetTranslation(gp_Vec(x, y, z))
    t = t.Multiplied(_drehung(gp_Dir(0, 0, 1), rz))
    t = t.Multiplied(_drehung(gp_Dir(0, 1, 0), ry))
    t = t.Multiplied(_drehung(gp_Dir(1, 0, 0), rx))
    return eltern.Multiplied(t) if eltern is not None else t


def frame_achsen(t: gp_Trsf) -> tuple[gp_Pnt, gp_Dir, gp_Dir, gp_Dir]:
    return (
        _NULL.Transformed(t),
        gp_Dir(1, 0, 0).Transformed(t),
        gp_Dir(0, 1, 0).Transformed(t),
        gp_Dir(0, 0, 1).Transformed(t),
    )


def frame_ebenen(t: gp_Trsf) -> dict[str, gp_Ax3]:
    """Ebenen `xy` (Normale z, Bezug x), `yz` (x, y), `zx` (y, z), Ursprung jeweils im Ursprung."""
    o, x, y, z = frame_achsen(t)
    return {"xy": gp_Ax3(o, z, x), "yz": gp_Ax3(o, x, y), "zx": gp_Ax3(o, y, z)}


def frame_form(t: gp_Trsf) -> tuple[TopoDS_Compound, dict[str, TopoDS_Shape]]:
    """Verbund aus Ursprung (Ecke), drei Achsen (unbegrenzte Kanten) und drei Ebenen (unbegrenzte Flächen)."""
    o, x, y, z = frame_achsen(t)
    teile: dict[str, TopoDS_Shape] = {"origin": punkt_form(o)}
    for name, d in (("x", x), ("y", y), ("z", z)):
        teile[name] = linie_form(gp_Ax1(o, d), unbegrenzt_vorn=True)
    for name, ax in frame_ebenen(t).items():
        teile[name] = ebene_form(ax)
    builder = BRep_Builder()
    comp = TopoDS_Compound()
    builder.MakeCompound(comp)
    for teil in teile.values():
        builder.Add(comp, teil)
    return comp, teile


# --- Formen --------------------------------------------------------------------------------------------


def punkt_form(p: gp_Pnt) -> TopoDS_Vertex:
    return BRepBuilderAPI_MakeVertex(p).Vertex()


def linie_form(ax: gp_Ax1, unbegrenzt_vorn: bool) -> TopoDS_Edge:
    """Gerade (−∞, ∞) bzw. Halbgerade [0, ∞) als Kante auf `gp_Lin`."""
    unendlich = Precision.Infinite_s()
    erst = -unendlich if unbegrenzt_vorn else 0.0
    return BRepBuilderAPI_MakeEdge(gp_Lin(ax), erst, unendlich).Edge()


def strecke_form(a: gp_Pnt, b: gp_Pnt) -> TopoDS_Edge:
    return BRepBuilderAPI_MakeEdge(a, b).Edge()


def ebene_form(ax: gp_Ax3) -> TopoDS_Face:
    return BRepBuilderAPI_MakeFace(gp_Pln(ax)).Face()


def ax1_durch(a: gp_Pnt, b: gp_Pnt) -> gp_Ax1:
    """Achse mit Ursprung `a` und Richtung `(b − a)/|b − a|`."""
    return gp_Ax1(a, gp_Dir(gp_Vec(a, b)))


def punkt_relativ(basis: gp_Pnt, t: gp_Trsf | None, x: float, y: float, z: float) -> gp_Pnt:
    v = gp_Vec(x, y, z)
    if t is not None:
        v = v.Transformed(t)
    return basis.Translated(v)


def punkt_in(t: gp_Trsf | None, x: float, y: float, z: float) -> gp_Pnt:
    p = gp_Pnt(x, y, z)
    return p.Transformed(t) if t is not None else p


# --- Rücklesen aus der Form ----------------------------------------------------------------------------


def lesen_punkt(v: TopoDS_Vertex) -> Vec3:
    return _xyz(BRep_Tool.Pnt_s(v))


def lesen_linie(e: TopoDS_Edge) -> tuple[Vec3, Vec3]:
    """(Ursprung, Richtung) einer Kante auf einer Geraden."""
    lin = BRepAdaptor_Curve(e).Line()
    return _xyz(lin.Location()), _xyz(lin.Direction())


def lesen_strecke(e: TopoDS_Edge) -> tuple[Vec3, Vec3, float]:
    c = BRepAdaptor_Curve(e)
    return (
        _xyz(c.Value(c.FirstParameter())),
        _xyz(c.Value(c.LastParameter())),
        GCPnts_AbscissaPoint.Length_s(c),
    )


def lesen_ebene(f: TopoDS_Face) -> tuple[Vec3, Vec3, Vec3]:
    """(Ursprung, Normale, Bezugsrichtung) einer ebenen Fläche."""
    ax = BRepAdaptor_Surface(f).Plane().Position()
    return _xyz(ax.Location()), _xyz(ax.Direction()), _xyz(ax.XDirection())


def ax1_aus(origin: Vec3, d: Vec3) -> gp_Ax1:
    return gp_Ax1(gp_Pnt(*origin), gp_Dir(*d))


def ax3_aus(origin: Vec3, n: Vec3, x: Vec3) -> gp_Ax3:
    return gp_Ax3(gp_Pnt(*origin), gp_Dir(*n), gp_Dir(*x))


def pnt_aus(p: Vec3) -> gp_Pnt:
    return gp_Pnt(*p)
