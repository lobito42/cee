"""Prototyp des Auswahl-Spikes (ap-49): Auswahl nach Regel als Element im Graphen. Kein Produktcode.

Der Halter (design.md: Platte 80 × 50 × 8 mm, Steg, zwei Bohrungen, ohne Verrundung) ist eine Kette aus
Elementen in der Form aus ADR-028; die Bohrung ist ein eigenes Element. Eine Regel ist ebenfalls ein Element:
Sie verweist über `<id>.<output>` auf ihr Ausgangselement (ADR-058) und beschreibt in `params` nur Art,
Bedingungen, Gruppe, Sortierung und Anzahl – keine Topologie-Indizes, keine getroffene Geometrie (ADR-016,
ADR-032). Ausgewertet wird sie bei jeder Neuberechnung neu gegen die frisch berechnete Geometrie.

„Neu entstanden“ nutzt die Topologie-Historie der Booleschen Operation (OCCT `Modified`/`IsDeleted`) und
der anschließenden Bereinigung (`ShapeUpgrade_UnifySameDomain`, `History`): Flächen des Ergebnisses, die aus
Flächen des Werkzeugs (der Bohrzylinder) hervorgehen und nicht aus Flächen des Grundkörpers.

Findet eine Regel kein Ziel oder mehrere gleichrangige Ziele, wo sie genau eines verlangt, entsteht ein Befund
an der Regel (`kein_ziel`, `mehrdeutig` mit allen Kandidaten). Folgeelemente pausieren, unabhängige Elemente
rechnen weiter (ADR-050). Fehler eines Elements werden als Befund `kernel_fehler` gemeldet, nie verschluckt.

Aufruf über `bash spikes/auswahl/run.sh <fall> [--shuffle <seed>] [--element]`, Ausgabe JSON auf stdout.
"""

from __future__ import annotations

import json
import math
import random
import sys
from dataclasses import dataclass, field

from build123d import (
    Align,
    Box,
    CenterOf,
    Compound,
    Cylinder,
    Edge,
    Face,
    GeomType,
    Pos,
    Shape,
    Solid,
)
from build123d.topology.kernel import list_shapes
from OCP.BRepAlgoAPI import BRepAlgoAPI_Cut
from OCP.collections import (
    IndexedDataMap_TopoDS_Shape_List_TopoDS_Shape_TopTools_ShapeMapHasher as KantenFlaechenKarte,
)
from OCP.collections import List_TopoDS_Shape
from OCP.ShapeUpgrade import ShapeUpgrade_UnifySameDomain
from OCP.TopAbs import TopAbs_EDGE, TopAbs_FACE, TopAbs_SOLID
from OCP.TopExp import TopExp

TOL_LINEAR = 1e-6  # mm, docs/rules/geometrie.md
TOL_ANGULAR = 1e-9  # rad, docs/rules/geometrie.md

# --- Parameter -----------------------------------------------------------------------------------------

# Halter aus parts/examples/halter.py mit Platte 80 × 50 × 8 mm (design.md), übrige Parameter wie dort.
BASIS = {
    "breite": 80.0,
    "tiefe": 50.0,
    "dicke": 8.0,
    "steg_hoehe": 50.0,
    "bohrung_d": 6.6,
    "bohrung_abstand": 40.0,
}
SAETZE = {
    "P0": {"dicke": 8.0, "breite": 80.0},
    "P1": {"dicke": 10.0, "breite": 80.0},
    "P2": {"dicke": 8.0, "breite": 90.0},
    "P3": {"dicke": 10.0, "breite": 90.0},
}
# K2 (Testkorpus): Steghöhe = Dicke = 8 mm, die Vorderseite des Stegs und die Vorderseite der Platte sind
# gleich groß.
K2_WERTE = {"dicke": 8.0, "breite": 80.0, "steg_hoehe": 8.0}

ACHSEN = {
    "+X": (1.0, 0.0, 0.0),
    "-X": (-1.0, 0.0, 0.0),
    "+Y": (0.0, 1.0, 0.0),
    "-Y": (0.0, -1.0, 0.0),
    "+Z": (0.0, 0.0, 1.0),
    "-Z": (0.0, 0.0, -1.0),
}
GEOM = {
    GeomType.LINE: "linie",
    GeomType.CIRCLE: "kreis",
    GeomType.PLANE: "ebene",
    GeomType.CYLINDER: "zylinder",
}


def mm(v: float) -> str:
    """Größe mit Einheit (ADR-057)."""
    return f"{v:g} mm"


def wert_mm(s: str) -> float:
    zahl, einheit = str(s).split()
    if einheit != "mm":
        raise ValueError(f"Einheit {einheit!r} statt mm")
    return float(zahl)


# --- Elemente (ADR-028) --------------------------------------------------------------------------------


def element(eid: str, typ: str, inputs: dict, params: dict, outputs: dict, meta: dict) -> dict:
    return {
        "id": eid,
        "type": typ,
        "inputs": inputs,
        "params": params,
        "outputs": outputs,
        "content": [],
        "meta": meta,
    }


def halter_elemente(werte: dict, bohrung_verworfen: bool = False) -> list[dict]:
    """Der Halter als Kette aus Elementen; Werte in mm."""
    p = {**BASIS, **werte}
    return [
        element(
            "platte",
            "quader",
            {},
            {"breite": mm(p["breite"]), "tiefe": mm(p["tiefe"]), "hoehe": mm(p["dicke"])},
            {"koerper": "solid"},
            {"name": "Grundplatte"},
        ),
        element(
            "steg",
            "steg",
            {"basis": "platte.koerper"},
            {"staerke": mm(p["dicke"]), "hoehe": mm(p["steg_hoehe"])},
            {"koerper": "solid"},
            {"name": "Steg an der Hinterkante der Platte"},
        ),
        element(
            "bohrung",
            "bohrung",
            {"basis": "steg.koerper"},
            {
                "durchmesser": mm(p["bohrung_d"]),
                "abstand": mm(p["bohrung_abstand"]),
                "tiefe": mm(p["dicke"]),
                "versatz_y": mm(p["dicke"] / 2),
            },
            {"koerper": "solid"},
            {"name": "Bohrungen M6", "verworfen": bohrung_verworfen},
        ),
        element(
            "halter", "teil", {"koerper": "bohrung.koerper"}, {}, {"koerper": "solid"}, {"name": "Halter"}
        ),
    ]


def regel_element(eid: str, quelle: str, params: dict, name: str) -> dict:
    return element(eid, "auswahl.regel", {"quelle": quelle}, params, {"auswahl": "auswahl"}, {"name": name})


# Die Regeln werden an P0 angelegt und danach unverändert gespeichert; sie enthalten nichts aus P0.
REGELN = {
    "R1": regel_element(
        "r1-zylinderflaechen",
        "halter.koerper",
        {"art": "flaeche", "bedingungen": [{"geometrie": "zylinder"}], "anzahl": "alle"},
        "Alle zylindrischen Flächen",
    ),
    "R2": regel_element(
        "r2-kanten-oben",
        "halter.koerper",
        {"art": "kante", "bedingungen": [{"lage": {"achse": "+Z", "bezug": "aeusserste"}}], "anzahl": "alle"},
        "Alle Kanten oben (oberste Ebene des Teils)",
    ),
    "R3": regel_element(
        "r3-kanten-parallel-z",
        "halter.koerper",
        {
            "art": "kante",
            "bedingungen": [{"richtung": {"achse": "+Z", "bezug": "parallel"}}],
            "anzahl": "alle",
        },
        "Alle Kanten parallel zur Z-Achse",
    ),
    "R4": regel_element(
        "r4-montageflaeche",
        "halter.koerper",
        {"art": "flaeche", "gruppe": {"achse": "+Z", "wahl": "erste"}, "anzahl": "alle"},
        "Flächen der untersten Gruppe nach Z (Montagefläche)",
    ),
    "R5": regel_element(
        "r5-neu-bohrung",
        "bohrung.koerper",
        {"art": "flaeche", "bedingungen": [{"herkunft": "erzeugt"}], "anzahl": "alle"},
        "Alle Flächen, die die Bohrung erzeugt hat",
    ),
    "K2": regel_element(
        "k2-groesste-flaeche-plus-y",
        "halter.koerper",
        {
            "art": "flaeche",
            "bedingungen": [{"geometrie": "ebene"}, {"normale": {"achse": "+Y"}}],
            "sortieren": {"nach": "flaecheninhalt", "ordnung": "absteigend"},
            "anzahl": 1,
        },
        "Größte ebene Fläche mit Normale +Y (genau ein Ziel)",
    ),
}

FOLGEELEMENT = element(
    "messung-bohrwand",
    "messung.flaeche",
    {"auswahl": "r5-neu-bohrung.auswahl"},
    {},
    {"wert": "flaeche"},
    {"name": "Fläche der Bohrwände (nutzt die Auswahl R5)"},
)
UNABHAENGIG = element(
    "messung-volumen",
    "messung.volumen",
    {"koerper": "halter.koerper"},
    {},
    {"wert": "volumen"},
    {"name": "Volumen des Halters (unabhängig von der Auswahl)"},
)


# --- Kernel-Zugriff (Reihenfolge der Teilformen ggf. gemischt) -----------------------------------------


class Kernel:
    """Liefert Flächen, Kanten und Ecken; mit `seed` in gemischter Reihenfolge (Prüfung von AK-3)."""

    def __init__(self, seed: int | None = None):
        self.rng = random.Random(seed) if seed is not None else None

    def _mischen(self, liste: list) -> list:
        if self.rng is not None:
            self.rng.shuffle(liste)
        return liste

    def flaechen(self, s: Shape) -> list[Face]:
        return self._mischen(list(s.faces()))

    def kanten(self, s: Shape) -> list[Edge]:
        return self._mischen(list(s.edges()))

    def ecken(self, s: Shape) -> list:
        return self._mischen(list(s.vertices()))


def _form(topo) -> Shape:
    if topo.ShapeType() == TopAbs_SOLID:
        return Solid(topo)
    return Compound(topo)


def _liste(shapes) -> List_TopoDS_Shape:
    out = List_TopoDS_Shape()
    for s in shapes:
        out.Append(s)
    return out


def _folge(liste) -> list:
    """List_TopoDS_Shape als Python-Liste."""
    return list_shapes(liste)


def _abbild(op, hist, topo) -> list:
    """Bilder einer Fläche nach Boolescher Operation und Bereinigung (Topologie-Historie)."""
    nach_op = _folge(op.Modified(topo))
    if not nach_op:
        nach_op = [] if op.IsDeleted(topo) else [topo]
    out = []
    for f in nach_op:
        nach_usd = _folge(hist.Modified(f))
        if nach_usd:
            out.extend(nach_usd)
        elif not hist.IsRemoved(f):
            out.append(f)
    return out


def _enthaelt(liste: list, topo) -> bool:
    return any(topo.IsSame(x) for x in liste)


@dataclass
class Ergebnis:
    zustand: str = "aktuell"  # aktuell, fehlerhaft, pausiert (ADR-050)
    form: Shape | None = None
    erzeugt: list = field(default_factory=list)  # TopoDS-Flächen, die dieses Element erzeugt hat
    ziele: list = field(default_factory=list)
    befunde: list = field(default_factory=list)
    wert: float | None = None


def _quader(e: dict, k: Kernel) -> Ergebnis:  # noqa: ARG001
    p = e["params"]
    box = Box(
        wert_mm(p["breite"]),
        wert_mm(p["tiefe"]),
        wert_mm(p["hoehe"]),
        align=(Align.CENTER, Align.CENTER, Align.MIN),
    )
    return Ergebnis(form=box)


def _steg(e: dict, basis: Shape, k: Kernel) -> Ergebnis:  # noqa: ARG001
    p = e["params"]
    bb = basis.bounding_box()
    staerke, hoehe = wert_mm(p["staerke"]), wert_mm(p["hoehe"])
    breite = bb.max.X - bb.min.X
    steg = Pos((bb.min.X + bb.max.X) / 2, bb.min.Y + staerke / 2, bb.max.Z) * Box(
        breite, staerke, hoehe, align=(Align.CENTER, Align.CENTER, Align.MIN)
    )
    return Ergebnis(form=basis.fuse(steg).clean())


def _bohrung(e: dict, basis: Shape, k: Kernel) -> Ergebnis:  # noqa: ARG001
    if e["meta"].get("verworfen"):
        # Verwerfen ist ein Zustand, kein Löschen (ADR-051/052): der Körper geht unverändert durch.
        return Ergebnis(form=basis)
    p = e["params"]
    r, x = wert_mm(p["durchmesser"]) / 2, wert_mm(p["abstand"]) / 2
    tiefe, y = wert_mm(p["tiefe"]), wert_mm(p["versatz_y"])
    werkzeuge = [
        Pos(px, y, 0) * Cylinder(r, tiefe, align=(Align.CENTER, Align.CENTER, Align.MIN)) for px in (-x, x)
    ]
    op = BRepAlgoAPI_Cut()
    op.SetArguments(_liste([basis.wrapped]))
    op.SetTools(_liste([w.wrapped for w in werkzeuge]))
    op.Build()
    if not op.IsDone():
        raise RuntimeError("BRepAlgoAPI_Cut nicht ausgeführt")
    usd = ShapeUpgrade_UnifySameDomain(op.Shape(), True, True, True)
    usd.Build()
    hist = usd.History()
    form = _form(usd.Shape())
    aus_basis = [b for f in basis.faces() for b in _abbild(op, hist, f.wrapped)]
    aus_werkzeug = [b for w in werkzeuge for f in w.faces() for b in _abbild(op, hist, f.wrapped)]
    erzeugt = []
    for f in aus_werkzeug:
        if not _enthaelt(aus_basis, f) and not _enthaelt(erzeugt, f):
            erzeugt.append(f)
    return Ergebnis(form=form, erzeugt=erzeugt)


# --- Regel-Auswertung ----------------------------------------------------------------------------------


def _vec(v) -> tuple[float, float, float]:
    return (v.X, v.Y, v.Z)


def _dot(a, b) -> float:
    return sum(x * y for x, y in zip(a, b, strict=True))


def _winkel(a, b, vorzeichen: bool) -> float:
    cx = a[1] * b[2] - a[2] * b[1]
    cy = a[2] * b[0] - a[0] * b[2]
    cz = a[0] * b[1] - a[1] * b[0]
    d = _dot(a, b)
    if not vorzeichen:
        d = abs(d)
    return math.atan2(math.sqrt(cx * cx + cy * cy + cz * cz), d)


def _richtung(s) -> tuple[float, float, float] | None:
    """Richtung einer Kante (Linie) bzw. Normale einer ebenen Fläche, Achse einer Zylinderfläche."""
    gt = s.geom_type
    if isinstance(s, Face):
        if gt == GeomType.PLANE:
            return _vec(s.normal_at())
        if gt == GeomType.CYLINDER:
            return _vec(s.axis_of_rotation.direction)
        return None
    if gt == GeomType.LINE:
        return _vec((s.position_at(1) - s.position_at(0)).normalized())
    if gt == GeomType.CIRCLE:
        return _vec(s.normal())
    return None


def _modellkanten(form: Shape, kanten: list[Edge]) -> list[Edge]:
    """Nur Kanten, die zwei verschiedene Flächen trennen; Nahtkanten (nur Parametrisierung) fallen weg."""
    karte = KantenFlaechenKarte()
    TopExp.MapShapesAndAncestors_s(form.wrapped, TopAbs_EDGE, TopAbs_FACE, karte)
    out = []
    for e in kanten:
        if not karte.Contains(e.wrapped):
            continue
        verschieden: list = []
        for f in _folge(karte.FindFromKey(e.wrapped)):
            if not _enthaelt(verschieden, f):
                verschieden.append(f)
        if len(verschieden) >= 2:
            out.append(e)
    return out


def _bedingung(b: dict, s, form: Shape, quelle: Ergebnis, k: Kernel, cache: dict) -> bool:
    if "geometrie" in b:
        return GEOM.get(s.geom_type) == b["geometrie"]
    if "richtung" in b:
        r = _richtung(s)
        if r is None or s.geom_type not in (GeomType.LINE,):
            return False
        return _winkel(r, ACHSEN[b["richtung"]["achse"]], vorzeichen=False) <= TOL_ANGULAR
    if "normale" in b:
        if s.geom_type != GeomType.PLANE:
            return False
        return _winkel(_richtung(s), ACHSEN[b["normale"]["achse"]], vorzeichen=True) <= TOL_ANGULAR
    if "lage" in b:
        achse = ACHSEN[b["lage"]["achse"]]
        if "extrem" not in cache:
            cache["extrem"] = max(_dot(_vec(v.center()), achse) for v in k.ecken(form))
        punkte = [_vec(v.center()) for v in s.vertices()]
        if isinstance(s, Edge):
            punkte.append(_vec(s.position_at(0.5)))
        else:
            punkte.append(_vec(s.center(CenterOf.MASS)))
        return all(abs(_dot(p, achse) - cache["extrem"]) <= TOL_LINEAR for p in punkte)
    if "herkunft" in b:
        if b["herkunft"] != "erzeugt":
            raise ValueError(f"unbekannte Herkunft {b['herkunft']!r}")
        return _enthaelt(quelle.erzeugt, s.wrapped)
    raise ValueError(f"unbekannte Bedingung {sorted(b)}")


def _schluessel(s, nach: str) -> float:
    if nach == "flaecheninhalt":
        return s.area
    if nach == "laenge":
        return s.length
    raise ValueError(f"unbekannter Sortierschlüssel {nach!r}")


def regel_auswerten(regel: dict, quelle: Ergebnis, k: Kernel) -> tuple[list, list]:
    """Wertet eine gespeicherte Regel gegen die aktuelle Geometrie aus. Ergebnis: (Ziele, Befunde)."""
    p, form = regel["params"], quelle.form
    if p["art"] == "flaeche":
        kandidaten = k.flaechen(form)
    elif p["art"] == "kante":
        kandidaten = _modellkanten(form, k.kanten(form))
    else:
        raise ValueError(f"unbekannte Art {p['art']!r}")

    cache: dict = {}
    for b in p.get("bedingungen", []):
        kandidaten = [s for s in kandidaten if _bedingung(b, s, form, quelle, k, cache)]

    if "gruppe" in p and kandidaten:
        achse = ACHSEN[p["gruppe"]["achse"]]
        werte = sorted(((_dot(_vec(s.center(CenterOf.MASS)), achse), i) for i, s in enumerate(kandidaten)))
        gruppen: list[list[int]] = []
        letzter = None
        for w, i in werte:
            if letzter is None or w - letzter > TOL_LINEAR:
                gruppen.append([])
            gruppen[-1].append(i)
            letzter = w
        wahl = gruppen[0] if p["gruppe"]["wahl"] == "erste" else gruppen[-1]
        kandidaten = [kandidaten[i] for i in sorted(wahl)]

    befunde: list = []
    anzahl = p.get("anzahl", "alle")
    if "sortieren" in p and kandidaten:
        absteigend = p["sortieren"].get("ordnung") == "absteigend"
        werte = [_schluessel(s, p["sortieren"]["nach"]) for s in kandidaten]
        bester = max(werte) if absteigend else min(werte)
        tol = TOL_LINEAR * max(1.0, abs(bester))
        kandidaten = [s for s, w in zip(kandidaten, werte, strict=True) if abs(w - bester) <= tol]

    if not kandidaten:
        befunde.append(
            {
                "code": "kein_ziel",
                "element": regel["id"],
                "kandidaten": [],
                "hinweis": "Die Regel trifft nichts mehr; Regel oder Ausgangselement prüfen.",
            }
        )
        return [], befunde
    if anzahl != "alle" and len(kandidaten) > int(anzahl):
        befunde.append(
            {
                "code": "mehrdeutig",
                "element": regel["id"],
                "kandidaten": sortiert([ziel(s) for s in kandidaten]),
                "hinweis": f"{len(kandidaten)} gleichrangige Ziele statt {anzahl}; bitte wählen.",
            }
        )
        return [], befunde
    return kandidaten, befunde


# --- Ausgabe -------------------------------------------------------------------------------------------


def _r(v: float) -> float:
    v = round(v, 6)
    return 0.0 if v == 0 else v


def ziel(s) -> dict:
    """Ziel als Beschreibung (nur Ausgabe, nie gespeichert): Art, Geometrietyp, Schwerpunkt, Richtung."""
    c = s.center(CenterOf.MASS)
    r = _richtung(s)
    if r is None:
        raise ValueError(f"Geometrietyp {s.geom_type} ohne Richtung")
    return {
        "art": "flaeche" if isinstance(s, Face) else "kante",
        "geometrie": GEOM[s.geom_type],
        "schwerpunkt_mm": [_r(c.X), _r(c.Y), _r(c.Z)],
        "richtung": [_r(x) for x in r],
    }


def sortiert(ziele: list) -> list:
    return sorted(ziele, key=lambda z: (z["art"], z["geometrie"], z["schwerpunkt_mm"], z["richtung"]))


# --- Neuberechnung des Graphen -------------------------------------------------------------------------


def berechnen(elemente: list[dict], k: Kernel) -> dict[str, Ergebnis]:
    """Berechnet die Elemente in Reihenfolge. Fehler eines Elements beenden die Berechnung nie (ADR-050)."""
    erg: dict[str, Ergebnis] = {}
    for e in elemente:
        eingaenge = {name: adr.split(".", 1)[0] for name, adr in e["inputs"].items()}
        if any(erg.get(q) is None or erg[q].zustand != "aktuell" for q in eingaenge.values()):
            erg[e["id"]] = Ergebnis(zustand="pausiert")
            continue
        try:
            erg[e["id"]] = _element_berechnen(e, {n: erg[q] for n, q in eingaenge.items()}, k)
        except Exception as err:  # noqa: BLE001 - Befund statt Absturz (ADR-050)
            erg[e["id"]] = Ergebnis(
                zustand="fehlerhaft",
                befunde=[
                    {"code": "kernel_fehler", "element": e["id"], "kandidaten": [], "hinweis": repr(err)}
                ],
            )
    return erg


def _element_berechnen(e: dict, ein: dict[str, Ergebnis], k: Kernel) -> Ergebnis:
    t = e["type"]
    if t == "quader":
        return _quader(e, k)
    if t == "steg":
        return _steg(e, ein["basis"].form, k)
    if t == "bohrung":
        return _bohrung(e, ein["basis"].form, k)
    if t == "teil":
        return Ergebnis(form=ein["koerper"].form)
    if t == "auswahl.regel":
        ziele, befunde = regel_auswerten(e, ein["quelle"], k)
        return Ergebnis(zustand="fehlerhaft" if befunde else "aktuell", ziele=ziele, befunde=befunde)
    if t == "messung.flaeche":
        return Ergebnis(wert=sum(s.area for s in ein["auswahl"].ziele))
    if t == "messung.volumen":
        return Ergebnis(wert=ein["koerper"].form.volume)
    raise ValueError(f"unbekannter Typ {t!r}")


# --- Fälle ---------------------------------------------------------------------------------------------

FAELLE = [f"{r}-{p}" for r in ("R1", "R2", "R3", "R4", "R5") for p in SAETZE]


def fall_aufbauen(fall: str) -> tuple[list[dict], dict, list[dict]]:
    """(Halter-Elemente, Regel, weitere Elemente) für einen Fall."""
    if fall in FAELLE:
        regel, satz = fall.split("-")
        return halter_elemente(SAETZE[satz]), REGELN[regel], []
    if fall == "K1":
        return halter_elemente(SAETZE["P0"], bohrung_verworfen=True), REGELN["R5"], []
    if fall == "K2":
        return halter_elemente(K2_WERTE), REGELN["K2"], []
    if fall == "K3":
        return (
            halter_elemente(SAETZE["P0"], bohrung_verworfen=True),
            REGELN["R5"],
            [FOLGEELEMENT, UNABHAENGIG],
        )
    raise ValueError(f"unbekannter Fall {fall!r} (R1-P0 … R5-P3, K1 … K3)")


def fall_auswerten(fall: str, seed: int | None = None) -> dict:
    halter, regel, weitere = fall_aufbauen(fall)
    erg = berechnen([*halter, regel, *weitere], Kernel(seed))
    befunde = [b for e in [*halter, regel, *weitere] for b in erg[e["id"]].befunde]
    out = {
        "fall": fall,
        "elemente": halter,
        "regel": regel["id"],
        "ziele": sortiert([ziel(s) for s in erg[regel["id"]].ziele]),
        "befunde": befunde,
    }
    if weitere:
        out["zustaende"] = {
            "regel": erg[regel["id"]].zustand,
            "folgeelement": erg[FOLGEELEMENT["id"]].zustand,
            "unabhaengig": erg[UNABHAENGIG["id"]].zustand,
        }
        out["werte"] = {e["id"]: erg[e["id"]].wert for e in weitere}
    return out


def main(argv: list[str]) -> int:
    if not argv:
        print("Aufruf: run.sh <fall> [--shuffle <seed>] [--element]", file=sys.stderr)
        return 2
    fall, rest = argv[0], argv[1:]
    seed = None
    if "--shuffle" in rest:
        seed = int(rest[rest.index("--shuffle") + 1])
    if "--element" in rest:
        _, regel, _ = fall_aufbauen(fall)
        print(json.dumps(regel, ensure_ascii=False, indent=2))
        return 0
    print(json.dumps(fall_auswerten(fall, seed), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
