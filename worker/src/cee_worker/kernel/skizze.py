"""Skizze, Bereiche und Hochziehen (ap-53, design.md Abschnitte 2 bis 4).

Skizzenkurven liegen in Skizzenkoordinaten (u, v) einer Ebene (`gp_Ax3`). Die Erkennung von Konturen,
Schnitten und Verschachtelung rechnet analytisch in 2D (Strecken und Kreise); die Bereiche selbst sind
OCP-Flächen (`BRepBuilderAPI_MakeFace` mit Löchern als inneren Drähten), Fläche und Schwerpunkt kommen aus
`BRepGProp`. Körper sind Prismen (`BRepPrimAPI_MakePrism`); Kennwerte aus der exakten Form, das Netz
(`BRepMesh_IncrementalMesh`) dient nur der Anzeige.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any

from OCP.Bnd import Bnd_Box
from OCP.BRep import BRep_Tool
from OCP.BRepAdaptor import BRepAdaptor_Curve
from OCP.BRepBndLib import BRepBndLib
from OCP.BRepBuilderAPI import (
    BRepBuilderAPI_MakeEdge,
    BRepBuilderAPI_MakeFace,
    BRepBuilderAPI_MakePolygon,
    BRepBuilderAPI_MakeWire,
)
from OCP.BRepGProp import BRepGProp
from OCP.BRepMesh import BRepMesh_IncrementalMesh
from OCP.BRepPrimAPI import BRepPrimAPI_MakePrism
from OCP.GCPnts import GCPnts_QuasiUniformDeflection
from OCP.GeomAbs import GeomAbs_Line
from OCP.gp import gp_Ax2, gp_Ax3, gp_Circ, gp_Dir, gp_Pln, gp_Pnt, gp_Trsf, gp_Vec
from OCP.GProp import GProp_GProps
from OCP.TopAbs import TopAbs_EDGE, TopAbs_FACE, TopAbs_REVERSED
from OCP.TopExp import TopExp, TopExp_Explorer
from OCP.TopLoc import TopLoc_Location
from OCP.TopoDS import TopoDS, TopoDS_Shape

from . import geometrie  # noqa: F401  # Aliase für OCP 8 (TopoDS.*_s, TopTools_IndexedMapOfShape)
from .typen import TOL_LINEAR

from OCP.TopTools import TopTools_IndexedMapOfShape  # noqa: E402  # isort: skip

UV = tuple[float, float]
SEHNE_RAND = 0.01  # mm, Sehnenfehler der Kreise im Rand (Anzeige)
SEHNE_NETZ = 0.05  # mm
WINKEL_NETZ = 0.25  # rad


# --- Ebene -----------------------------------------------------------------------------------------------


def lokal_nach_welt(ax: gp_Ax3) -> gp_Trsf:
    """Transformation Skizzenkoordinaten (u, v, 0) → Welt."""
    t = gp_Trsf()
    t.SetTransformation(ax, gp_Ax3())
    return t


def welt(ax: gp_Ax3, u: float, v: float) -> tuple[float, float, float]:
    o, x, y = ax.Location(), ax.XDirection(), ax.YDirection()
    return (
        o.X() + u * x.X() + v * y.X(),
        o.Y() + u * x.Y() + v * y.Y(),
        o.Z() + u * x.Z() + v * y.Z(),
    )


def nach_uv(ax: gp_Ax3, p: gp_Pnt) -> UV:
    d = gp_Vec(ax.Location(), p)
    return d.Dot(gp_Vec(ax.XDirection())), d.Dot(gp_Vec(ax.YDirection()))


# --- Kurven ----------------------------------------------------------------------------------------------


@dataclass(frozen=True)
class Kurve:
    id: str
    art: str  # line | rectangle | circle
    werte: tuple[float, ...]  # line/rectangle: u1 v1 u2 v2; circle: u v r

    def strecken(self) -> list[tuple[UV, UV]]:
        if self.art == "line":
            u1, v1, u2, v2 = self.werte
            return [((u1, v1), (u2, v2))]
        if self.art == "rectangle":
            a, b, c, d = _ecken(self.werte)
            return [(a, b), (b, c), (c, d), (d, a)]
        return []


def _ecken(w: tuple[float, ...]) -> list[UV]:
    u1, v1, u2, v2 = w
    lo_u, hi_u, lo_v, hi_v = min(u1, u2), max(u1, u2), min(v1, v2), max(v1, v2)
    return [(lo_u, lo_v), (hi_u, lo_v), (hi_u, hi_v), (lo_u, hi_v)]


def kurve_pruefen(k: Kurve) -> str | None:
    """Hinweis-Zusatz für `degenerate` oder None."""
    if k.art == "line":
        u1, v1, u2, v2 = k.werte
        return "laenge_null" if math.hypot(u2 - u1, v2 - v1) < TOL_LINEAR else None
    if k.art == "rectangle":
        u1, v1, u2, v2 = k.werte
        return "breite_null" if min(abs(u2 - u1), abs(v2 - v1)) < TOL_LINEAR else None
    return "durchmesser_null" if 2 * k.werte[2] < TOL_LINEAR else None


def _kreis_punkte(m: UV, r: float, rueckwaerts: bool = False) -> list[UV]:
    n = max(8, math.ceil(math.pi / math.acos(max(-1.0, 1 - SEHNE_RAND / r)))) if r > SEHNE_RAND else 8
    s = -1 if rueckwaerts else 1
    pts = [
        (m[0] + r * math.cos(s * 2 * math.pi * i / n), m[1] + r * math.sin(s * 2 * math.pi * i / n))
        for i in range(n)
    ]
    return [*pts, pts[0]]


def kurve_form(ax: gp_Ax3, k: Kurve) -> TopoDS_Shape:
    """OCP-Form einer Skizzenkurve in Weltlage (Kante bzw. Draht)."""
    if k.art == "line":
        u1, v1, u2, v2 = k.werte
        return BRepBuilderAPI_MakeEdge(gp_Pnt(*welt(ax, u1, v1)), gp_Pnt(*welt(ax, u2, v2))).Edge()
    if k.art == "rectangle":
        poly = BRepBuilderAPI_MakePolygon()
        for u, v in _ecken(k.werte):
            poly.Add(gp_Pnt(*welt(ax, u, v)))
        poly.Close()
        return poly.Wire()
    u, v, r = k.werte
    kreis = gp_Circ(gp_Ax2(gp_Pnt(*welt(ax, u, v)), ax.Direction(), ax.XDirection()), r)
    return BRepBuilderAPI_MakeEdge(kreis).Edge()


def kurve_zuege(ax: gp_Ax3, k: Kurve) -> list[list[list[float]]]:
    """Polylinie in Weltlage zur Anzeige."""
    if k.art == "line":
        u1, v1, u2, v2 = k.werte
        pts = [(u1, v1), (u2, v2)]
    elif k.art == "rectangle":
        e = _ecken(k.werte)
        pts = [*e, e[0]]
    else:
        pts = _kreis_punkte((k.werte[0], k.werte[1]), k.werte[2])
    return [[list(welt(ax, u, v)) for u, v in pts]]


# --- Konturen --------------------------------------------------------------------------------------------


@dataclass
class Kontur:
    kurven: list[str]  # Element-IDs, sortiert
    strecken: list[tuple[str, UV, UV]] = field(default_factory=list)  # in Umlaufrichtung (gegen Uhrzeiger)
    kreis: tuple[str, UV, float] | None = None
    flaeche: float = 0.0
    box: tuple[float, float, float, float] = (0.0, 0.0, 0.0, 0.0)

    def probe(self) -> UV:
        if self.kreis is not None:
            _, m, r = self.kreis
            return (m[0] + r, m[1])
        return self.strecken[0][1]

    def enthaelt(self, p: UV) -> bool:
        """Punkt im Inneren (Rand zählt nicht)."""
        if self.kreis is not None:
            _, m, r = self.kreis
            return math.hypot(p[0] - m[0], p[1] - m[1]) < r - TOL_LINEAR
        if _auf_rand(self.strecken, p):
            return False
        innen = False
        for _, a, b in self.strecken:
            if (a[1] > p[1]) != (b[1] > p[1]):
                u = a[0] + (p[1] - a[1]) * (b[0] - a[0]) / (b[1] - a[1])
                if p[0] < u:
                    innen = not innen
        return innen

    def schnitt_u(self, v: float) -> list[float]:
        """u-Werte, an denen die Gerade v = const den Rand kreuzt."""
        if self.kreis is not None:
            _, m, r = self.kreis
            dv = v - m[1]
            if abs(dv) >= r:
                return []
            w = math.sqrt(r * r - dv * dv)
            return [m[0] - w, m[0] + w]
        aus = []
        for _, a, b in self.strecken:
            if (a[1] > v) != (b[1] > v):
                aus.append(a[0] + (v - a[1]) * (b[0] - a[0]) / (b[1] - a[1]))
        return aus

    def zug(self, rueckwaerts: bool = False) -> list[list[float]]:
        if self.kreis is not None:
            _, m, r = self.kreis
            return [list(p) for p in _kreis_punkte(m, r, rueckwaerts)]
        pts = [s[1] for s in self.strecken] + [self.strecken[0][1]]
        if rueckwaerts:
            pts.reverse()
        return [list(p) for p in pts]

    def draht(self):
        """OCP-Draht in Skizzenkoordinaten (z = 0), gegen den Uhrzeiger."""
        if self.kreis is not None:
            _, m, r = self.kreis
            kante = BRepBuilderAPI_MakeEdge(gp_Circ(gp_Ax2(gp_Pnt(m[0], m[1], 0), gp_Dir(0, 0, 1)), r)).Edge()
            return BRepBuilderAPI_MakeWire(kante).Wire()
        poly = BRepBuilderAPI_MakePolygon()
        for _, a, _b in self.strecken:
            poly.Add(gp_Pnt(a[0], a[1], 0))
        poly.Close()
        return poly.Wire()


def _auf_rand(strecken: list[tuple[str, UV, UV]], p: UV) -> bool:
    return any(_abstand_strecke(p, a, b) <= TOL_LINEAR for _, a, b in strecken)


def _abstand_strecke(p: UV, a: UV, b: UV) -> float:
    dx, dy = b[0] - a[0], b[1] - a[1]
    ll = dx * dx + dy * dy
    t = 0.0 if ll == 0 else max(0.0, min(1.0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / ll))
    return math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)


def _flaeche_polygon(pts: list[UV]) -> float:
    """Vorzeichenbehaftete Fläche (positiv gegen den Uhrzeiger)."""
    return 0.5 * sum(pts[i - 1][0] * pts[i][1] - pts[i][0] * pts[i - 1][1] for i in range(len(pts)))


def _mit_box(k: Kontur) -> Kontur:
    if k.kreis is not None:
        _, m, r = k.kreis
        k.box = (m[0] - r, m[1] - r, m[0] + r, m[1] + r)
        k.flaeche = math.pi * r * r
    else:
        us = [s[1][0] for s in k.strecken]
        vs = [s[1][1] for s in k.strecken]
        k.box = (min(us), min(vs), max(us), max(vs))
        k.flaeche = abs(_flaeche_polygon([s[1] for s in k.strecken]))
    return k


def _gegen_uhr(strecken: list[tuple[str, UV, UV]]) -> list[tuple[str, UV, UV]]:
    if _flaeche_polygon([s[1] for s in strecken]) >= 0:
        return strecken
    return [(i, b, a) for i, a, b in reversed(strecken)]


def _linienzuege(linien: list[Kurve]) -> list[Kontur]:
    """Einfache geschlossene Ketten aus Linien, die sich nur an Endpunkten berühren."""
    knoten: list[UV] = []

    def knoten_von(p: UV) -> int:
        for i, q in enumerate(knoten):
            if math.hypot(p[0] - q[0], p[1] - q[1]) <= TOL_LINEAR:
                return i
        knoten.append(p)
        return len(knoten) - 1

    kanten = []
    for k in linien:
        u1, v1, u2, v2 = k.werte
        kanten.append((k, knoten_von((u1, v1)), knoten_von((u2, v2))))
    an: dict[int, list[int]] = {}
    for i, (_, a, b) in enumerate(kanten):
        an.setdefault(a, []).append(i)
        an.setdefault(b, []).append(i)
    gesehen: set[int] = set()
    aus = []
    for start in range(len(kanten)):
        if start in gesehen:
            continue
        # Zusammenhangskomponente
        komp, stapel = set(), [start]
        while stapel:
            i = stapel.pop()
            if i in komp:
                continue
            komp.add(i)
            for n in (kanten[i][1], kanten[i][2]):
                stapel.extend(an[n])
        gesehen |= komp
        knoten_k = {n for i in komp for n in kanten[i][1:]}
        if (
            len(komp) < 3
            or any(len(an[n]) != 2 for n in knoten_k)
            or any(kanten[i][1] == kanten[i][2] for i in komp)
        ):
            continue
        # Kette ordnen
        reihe: list[tuple[str, UV, UV]] = []
        i = min(komp, key=lambda j: kanten[j][0].id)
        knoten_jetzt = kanten[i][1]
        for _ in range(len(komp)):
            k, a, b = kanten[i]
            weiter = b if a == knoten_jetzt else a
            reihe.append((k.id, knoten[knoten_jetzt], knoten[weiter]))
            knoten_jetzt = weiter
            naechste = [j for j in an[weiter] if j != i]
            i = naechste[0]
        aus.append(
            _mit_box(
                Kontur(
                    kurven=sorted(komp_id for komp_id in (kanten[j][0].id for j in komp)),
                    strecken=_gegen_uhr(reihe),
                )
            )
        )
    return aus


def konturen(kurven: list[Kurve]) -> list[Kontur]:
    aus: list[Kontur] = []
    for k in kurven:
        if k.art == "rectangle":
            a, b, c, d = _ecken(k.werte)
            aus.append(
                _mit_box(
                    Kontur(kurven=[k.id], strecken=[(k.id, a, b), (k.id, b, c), (k.id, c, d), (k.id, d, a)])
                )
            )
        elif k.art == "circle":
            aus.append(_mit_box(Kontur(kurven=[k.id], kreis=(k.id, (k.werte[0], k.werte[1]), k.werte[2]))))
    aus.extend(_linienzuege([k for k in kurven if k.art == "line"]))
    return aus


# --- Schnitte --------------------------------------------------------------------------------------------


def _gleich(p: UV, q: UV) -> bool:
    return math.hypot(p[0] - q[0], p[1] - q[1]) <= TOL_LINEAR


def _kreuz(o: UV, a: UV, b: UV) -> float:
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


def _strecken_beruehren(a1: UV, a2: UV, b1: UV, b2: UV) -> bool:
    """Berühren oder schneiden sich zwei Strecken außerhalb gemeinsamer Endpunkte?"""
    gemeinsam = [p for p in (a1, a2) if _gleich(p, b1) or _gleich(p, b2)]
    if len(gemeinsam) == 2:
        return True  # dieselbe Strecke
    if gemeinsam:
        # Nur am gemeinsamen Endpunkt erlaubt: kein weiterer Endpunkt auf der anderen Strecke (Überlappung).
        p = gemeinsam[0]
        return any(not _gleich(x, p) and _abstand_strecke(x, b1, b2) <= TOL_LINEAR for x in (a1, a2)) or any(
            not _gleich(x, p) and _abstand_strecke(x, a1, a2) <= TOL_LINEAR for x in (b1, b2)
        )
    if (
        _abstand_strecke(a1, b1, b2) <= TOL_LINEAR
        or _abstand_strecke(a2, b1, b2) <= TOL_LINEAR
        or _abstand_strecke(b1, a1, a2) <= TOL_LINEAR
        or _abstand_strecke(b2, a1, a2) <= TOL_LINEAR
    ):
        return True
    d1, d2 = _kreuz(a1, a2, b1), _kreuz(a1, a2, b2)
    d3, d4 = _kreuz(b1, b2, a1), _kreuz(b1, b2, a2)
    return ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0))


def _strecke_kreis(a: UV, b: UV, m: UV, r: float) -> bool:
    nah = _abstand_strecke(m, a, b)
    fern = max(math.hypot(a[0] - m[0], a[1] - m[1]), math.hypot(b[0] - m[0], b[1] - m[1]))
    return nah <= r + TOL_LINEAR and fern >= r - TOL_LINEAR


def _kreis_kreis(m1: UV, r1: float, m2: UV, r2: float) -> bool:
    d = math.hypot(m1[0] - m2[0], m1[1] - m2[1])
    return abs(r1 - r2) - TOL_LINEAR <= d <= r1 + r2 + TOL_LINEAR


def _boxen_nah(a: tuple, b: tuple) -> bool:
    t = TOL_LINEAR
    return not (a[2] < b[0] - t or b[2] < a[0] - t or a[3] < b[1] - t or b[3] < a[1] - t)


def _paare_kontur(a: Kontur, b: Kontur) -> set[tuple[str, str]]:
    aus: set[tuple[str, str]] = set()
    if a.kreis is not None and b.kreis is not None:
        if _kreis_kreis(a.kreis[1], a.kreis[2], b.kreis[1], b.kreis[2]):
            aus.add(tuple(sorted((a.kreis[0], b.kreis[0]))))  # type: ignore[arg-type]
        return aus
    if a.kreis is not None or b.kreis is not None:
        k, s = (a, b) if a.kreis is not None else (b, a)
        assert k.kreis is not None
        for i, p, q in s.strecken:
            if _strecke_kreis(p, q, k.kreis[1], k.kreis[2]):
                aus.add(tuple(sorted((i, k.kreis[0]))))  # type: ignore[arg-type]
        return aus
    for i, p, q in a.strecken:
        for j, r, s in b.strecken:
            if i != j and _strecken_beruehren(p, q, r, s):
                aus.add(tuple(sorted((i, j))))  # type: ignore[arg-type]
    return aus


def _paare_selbst(k: Kontur) -> set[tuple[str, str]]:
    """Selbstschnitte eines Linienzugs (nicht benachbarte Linien)."""
    aus: set[tuple[str, str]] = set()
    n = len(k.strecken)
    if k.kreis is not None or n < 4 or len(k.kurven) == 1:
        return aus
    for x in range(n):
        for y in range(x + 1, n):
            if y == x + 1 or (x == 0 and y == n - 1):
                continue
            i, p, q = k.strecken[x]
            j, r, s = k.strecken[y]
            if _strecken_beruehren(p, q, r, s):
                aus.add(tuple(sorted((i, j))))  # type: ignore[arg-type]
    return aus


# --- Bereiche --------------------------------------------------------------------------------------------


@dataclass
class Bereich:
    aussen: Kontur
    loecher: list[Kontur]
    flaeche_lokal: Any  # TopoDS_Face in Skizzenkoordinaten
    flaeche: float
    punkt: UV

    def enthaelt(self, p: UV) -> bool:
        return self.aussen.enthaelt(p) and not any(h.enthaelt(p) for h in self.loecher)


@dataclass
class SkizzenWert:
    ebene: gp_Ax3
    bereiche: list[Bereich]


def _innerer_punkt(aussen: Kontur, loecher: list[Kontur], schwer: UV) -> UV:
    def innen(p: UV) -> bool:
        return aussen.enthaelt(p) and not any(h.enthaelt(p) for h in loecher)

    if innen(schwer):
        return schwer
    v = schwer[1]
    us = sorted(aussen.schnitt_u(v) + [u for h in loecher for u in h.schnitt_u(v)])
    beste, mitte = -1.0, schwer
    for i in range(0, len(us) - 1, 2):
        laenge = us[i + 1] - us[i]
        if laenge > beste:
            beste, mitte = laenge, ((us[i] + us[i + 1]) / 2, v)
    return mitte


def bereiche(kurven: list[Kurve]) -> tuple[list[Bereich], list[tuple[str, str]]]:
    """Bereiche (sortiert nach Fläche absteigend, dann Punkt) und Paare sich schneidender Kurven."""
    alle = konturen(sorted(kurven, key=lambda k: k.id))
    alle.sort(key=lambda k: k.kurven)
    paare: set[tuple[str, str]] = set()
    schlecht: set[int] = set()
    for i, a in enumerate(alle):
        selbst = _paare_selbst(a)
        if selbst:
            paare |= selbst
            schlecht.add(i)
        for j in range(i + 1, len(alle)):
            b = alle[j]
            if not _boxen_nah(a.box, b.box):
                continue
            p = _paare_kontur(a, b)
            if p:
                paare |= p
                schlecht |= {i, j}
    gut = [k for i, k in enumerate(alle) if i not in schlecht]
    # Verschachtelung: kleinste umschließende Kontur ist die Mutter
    mutter: dict[int, int | None] = {}
    for i, k in enumerate(gut):
        kandidaten = [
            j
            for j, m in enumerate(gut)
            if j != i and m.flaeche > k.flaeche and _boxen_nah(m.box, k.box) and m.enthaelt(k.probe())
        ]
        mutter[i] = min(kandidaten, key=lambda j: (gut[j].flaeche, gut[j].kurven)) if kandidaten else None
    aus: list[Bereich] = []
    for i, k in enumerate(gut):
        loecher = [gut[j] for j in range(len(gut)) if mutter[j] == i]
        mf = BRepBuilderAPI_MakeFace(gp_Pln(), k.draht(), True)
        for h in loecher:
            mf.Add(TopoDS.Wire_s(h.draht().Reversed()))
        flaeche = mf.Face()
        props = GProp_GProps()
        BRepGProp.SurfaceProperties_s(flaeche, props)
        g = props.CentreOfMass()
        punkt = _innerer_punkt(k, loecher, (g.X(), g.Y()))
        aus.append(
            Bereich(aussen=k, loecher=loecher, flaeche_lokal=flaeche, flaeche=props.Mass(), punkt=punkt)
        )
    aus.sort(key=lambda b: (-round(b.flaeche, 9), b.punkt))
    return aus, sorted(paare)


def bereich_zum_punkt(wert: SkizzenWert, p: UV) -> Bereich | None:
    treffer = [b for b in wert.bereiche if b.enthaelt(p)]
    return min(treffer, key=lambda b: b.flaeche) if treffer else None


def bereich_rand(b: Bereich) -> list[list[list[float]]]:
    return [b.aussen.zug(), *(h.zug(rueckwaerts=True) for h in b.loecher)]


def bereich_ids(b: Bereich) -> tuple[list[str], list[str]]:
    return list(b.aussen.kurven), sorted(i for h in b.loecher for i in h.kurven)


def flaeche_welt(wert: SkizzenWert, b: Bereich):
    return b.flaeche_lokal.Moved(TopLoc_Location(lokal_nach_welt(wert.ebene)))


# --- Körper ----------------------------------------------------------------------------------------------


def prisma(wert: SkizzenWert, b: Bereich, hoehe: float):
    n = wert.ebene.Direction()
    vec = gp_Vec(n.X() * hoehe, n.Y() * hoehe, n.Z() * hoehe)
    return BRepPrimAPI_MakePrism(flaeche_welt(wert, b), vec).Shape()


def _anzahl(form, art) -> int:
    m = TopTools_IndexedMapOfShape()
    TopExp.MapShapes_s(form, art, m)
    return m.Extent()


def kennwerte(form) -> dict[str, Any]:
    vp = GProp_GProps()
    BRepGProp.VolumeProperties_s(form, vp)
    sp = GProp_GProps()
    BRepGProp.SurfaceProperties_s(form, sp)
    g = vp.CentreOfMass()
    box = Bnd_Box()
    BRepBndLib.AddOptimal_s(form, box, False, False)
    lo, hi = box.CornerMin(), box.CornerMax()
    xmin, ymin, zmin, xmax, ymax, zmax = lo.X(), lo.Y(), lo.Z(), hi.X(), hi.Y(), hi.Z()
    return {
        "volumen": vp.Mass(),
        "oberflaeche": sp.Mass(),
        "schwerpunkt": (g.X(), g.Y(), g.Z()),
        "min": (xmin, ymin, zmin),
        "max": (xmax, ymax, zmax),
        "flaechen": _anzahl(form, TopAbs_FACE),
        "kanten": _anzahl(form, TopAbs_EDGE),
    }


def netz(form) -> tuple[list[float], list[int]]:
    BRepMesh_IncrementalMesh(form, SEHNE_NETZ, False, WINKEL_NETZ, True)
    positionen: list[float] = []
    dreiecke: list[int] = []
    ex = TopExp_Explorer(form, TopAbs_FACE)
    while ex.More():
        f = TopoDS.Face_s(ex.Current())
        loc = TopLoc_Location()
        tri = BRep_Tool.Triangulation_s(f, loc)
        if tri is not None:
            t = loc.Transformation()
            basis = len(positionen) // 3
            for i in range(1, tri.NbNodes() + 1):
                p = tri.Node(i).Transformed(t)
                positionen.extend((p.X(), p.Y(), p.Z()))
            umgekehrt = f.Orientation() == TopAbs_REVERSED
            for i in range(1, tri.NbTriangles() + 1):
                a, b, c = tri.Triangle(i).Get()
                if umgekehrt:
                    b, c = c, b
                dreiecke.extend((basis + a - 1, basis + b - 1, basis + c - 1))
        ex.Next()
    return positionen, dreiecke


def kantenzuege(form) -> list[list[list[float]]]:
    """Polylinien der Kanten (Nahtkanten ausgenommen) zur Anzeige."""
    naehte = TopTools_IndexedMapOfShape()
    fx = TopExp_Explorer(form, TopAbs_FACE)
    while fx.More():
        f = TopoDS.Face_s(fx.Current())
        ex = TopExp_Explorer(f, TopAbs_EDGE)
        while ex.More():
            if BRep_Tool.IsClosed_s(TopoDS.Edge_s(ex.Current()), f):
                naehte.Add(ex.Current())
            ex.Next()
        fx.Next()
    kanten = TopTools_IndexedMapOfShape()
    TopExp.MapShapes_s(form, TopAbs_EDGE, kanten)
    aus = []
    for i in range(1, kanten.Extent() + 1):
        if naehte.Contains(kanten.FindKey(i)):
            continue  # Naht einer geschlossenen Fläche
        c = BRepAdaptor_Curve(TopoDS.Edge_s(kanten.FindKey(i)))
        if c.GetType() == GeomAbs_Line:
            pts = [c.Value(c.FirstParameter()), c.Value(c.LastParameter())]
        else:
            d = GCPnts_QuasiUniformDeflection(c, SEHNE_NETZ)
            pts = [d.Value(j) for j in range(1, d.NbPoints() + 1)] if d.IsDone() else []
        if len(pts) >= 2:
            aus.append([[p.X(), p.Y(), p.Z()] for p in pts])
    return aus
