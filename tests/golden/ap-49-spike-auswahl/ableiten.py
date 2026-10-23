"""Leitet `faelle.json` (Sollziele für ap-49-spike-auswahl) unabhängig vom Prototyp ab.

Quellen im Repository: `parts/examples/halter.py` (Aufbau des Halters) und die Tabellen in
`openspec/changes/ap-49-spike-auswahl/design.md` (Parametersätze P0 bis P3, Regeln R1 bis R5,
Fälle K1 bis K3).
Der Halter wird hier mit build123d direkt aufgebaut, ohne Außenverrundung (design.md: Platte, Steg und zwei
Bohrungen; Open Question 4). Die Ziele jeder Regel werden aus der Regelbeschreibung mit build123d bestimmt,
nicht aus einer gespeicherten Regel.

Aufruf (Wurzelverzeichnis): `uv run python -I tests/golden/ap-49-spike-auswahl/ableiten.py`
"""

from __future__ import annotations

import json
from pathlib import Path

from build123d import (
    Align,
    Axis,
    Box,
    BuildPart,
    CenterOf,
    Cylinder,
    GeomType,
    Locations,
    Mode,
)

OUT = Path(__file__).with_name("faelle.json")
TOL = 1e-6  # TOL_LINEAR aus docs/rules/geometrie.md

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
# K2 (Open Question 5, Vorschlag „zwei Flächen gleich hoch“): Regel „die größte ebene Fläche mit Normale +Y,
# genau ein Ziel“. An P0 ist das die Rückseite des Stegs (80 × 50 mm). Mit Steghöhe = Dicke = 8 mm sind die
# Rückseite des Stegs und die Rückseite der Platte gleich hoch (beide 80 × 8 mm) – zwei gleichrangige
# Kandidaten.
K2_PARAMS = {"dicke": 8.0, "breite": 80.0, "steg_hoehe": 8.0}

GEOM = {
    GeomType.LINE: "linie",
    GeomType.CIRCLE: "kreis",
    GeomType.PLANE: "ebene",
    GeomType.CYLINDER: "zylinder",
}


def halter(p: dict, bohrung: bool = True):
    """Halter wie in halter.py (ohne Verrundung). Gibt Teil und die Flächen der Bohrung zurück."""
    with BuildPart() as bp:
        Box(p["breite"], p["tiefe"], p["dicke"], align=(Align.CENTER, Align.CENTER, Align.MIN))
        with Locations((0, -p["tiefe"] / 2 + p["dicke"] / 2, p["dicke"])):
            Box(p["breite"], p["dicke"], p["steg_hoehe"], align=(Align.CENTER, Align.CENTER, Align.MIN))
        vorher = {f for f in bp.part.faces()}
        if bohrung:
            x, y = p["bohrung_abstand"] / 2, p["dicke"] / 2
            with Locations((-x, y, 0), (x, y, 0)):
                Cylinder(
                    p["bohrung_d"] / 2,
                    p["dicke"],
                    align=(Align.CENTER, Align.CENTER, Align.MIN),
                    mode=Mode.SUBTRACT,
                )
    teil = bp.part
    # „erzeugt“: Flächen, deren Träger nicht schon vor der Bohrung im Teil lag (Zylinderwände der Bohrungen);
    # Ober- und Unterseite der Platte sind nur verändert, nicht erzeugt.
    ebenen_vorher = {_ebene(f) for f in vorher}
    neu = [f for f in teil.faces() if _ebene(f) not in ebenen_vorher] if bohrung else []
    return teil, neu


def _ebene(f) -> tuple:
    if f.geom_type != GeomType.PLANE:
        return ("anders", id(f))
    n = f.normal_at()
    o = f.center(CenterOf.MASS)
    d = n.X * o.X + n.Y * o.Y + n.Z * o.Z
    return tuple(round(v, 6) for v in (n.X, n.Y, n.Z, d))


def _r(v: float) -> float:
    v = round(v, 6)
    return 0.0 if v == 0 else v


def ziel(s) -> dict:
    """Ziel im Format aus design.md: Art, Geometrietyp, Schwerpunkt, Richtung bzw. Normale."""
    gt = s.geom_type
    c = s.center(CenterOf.MASS)
    if hasattr(s, "normal_at") and gt == GeomType.PLANE:
        art, d = "flaeche", s.normal_at()
    elif gt == GeomType.CYLINDER:
        art, d = "flaeche", s.axis_of_rotation.direction if hasattr(s, "axis_of_rotation") else None
    elif gt == GeomType.LINE:
        art, d = "kante", (s.position_at(1) - s.position_at(0)).normalized()
    elif gt == GeomType.CIRCLE:
        art, d = "kante", s.normal()
    else:
        raise ValueError(f"unerwarteter Geometrietyp {gt}")
    if art == "flaeche" and gt == GeomType.CYLINDER and d is None:
        raise ValueError("Zylinderachse unbekannt")
    return {
        "art": art,
        "geometrie": GEOM[gt],
        "schwerpunkt_mm": [_r(c.X), _r(c.Y), _r(c.Z)],
        "richtung": [_r(d.X), _r(d.Y), _r(d.Z)],
    }


def _flaechen_an(teil, kante) -> int:
    return sum(1 for f in teil.faces() if any(kante.is_same(e) for e in f.edges()))


def regel(name: str, teil, neu) -> list:
    if name == "R1":  # Art: alle zylindrischen Flächen
        return [f for f in teil.faces() if f.geom_type == GeomType.CYLINDER]
    if name == "R2":  # Lage: alle Kanten in der obersten Ebene des Teils
        zmax = teil.bounding_box().max.Z
        return [e for e in teil.edges() if all(abs(v.Z - zmax) <= TOL for v in e.vertices())]
    if name == "R3":  # Richtung: alle Kanten parallel zur Z-Achse
        # Nahtkanten der Bohrungswände sind keine Kanten des Modells (nur Parametrisierung des Kernels):
        # Eine echte Kante trennt zwei verschiedene Flächen.
        return [e for e in teil.edges().filter_by(Axis.Z) if _flaechen_an(teil, e) == 2]
    if name == "R4":  # Gruppe: Flächen der untersten Gruppe nach Z (Montagefläche wie publish in halter.py)
        return list(teil.faces().group_by(Axis.Z)[0])
    if name == "R5":  # neu entstanden: Flächen, die das Element Bohrung erzeugt hat
        return list(neu)
    raise ValueError(name)


def sortiert(ziele: list) -> list:
    return sorted(ziele, key=lambda z: (z["art"], z["geometrie"], z["schwerpunkt_mm"], z["richtung"]))


def main() -> None:
    faelle = []
    for r in ("R1", "R2", "R3", "R4", "R5"):
        for satz, werte in SAETZE.items():
            teil, neu = halter({**BASIS, **werte})
            faelle.append(
                {"regel": r, "satz": satz, "ziele": sortiert([ziel(s) for s in regel(r, teil, neu)])}
            )

    teil, neu = halter({**BASIS, **SAETZE["P0"]}, bohrung=False)
    faelle.append(
        {
            "fall": "K1",
            "regel": "R5",
            "satz": "P0",
            "ausloeser": "Element Bohrung verworfen, R5 bleibt gespeichert",
            "ziele": [],
            "befund": "kein_ziel",
        }
    )

    teil, _ = halter({**BASIS, **K2_PARAMS})
    plus_y = [f for f in teil.faces() if f.geom_type == GeomType.PLANE and f.normal_at().Y > 1 - TOL]
    groesste = max(f.area for f in plus_y)
    kandidaten = [f for f in plus_y if abs(f.area - groesste) <= TOL]
    teil0, _ = halter({**BASIS, **SAETZE["P0"]})
    plus_y0 = [f for f in teil0.faces() if f.geom_type == GeomType.PLANE and f.normal_at().Y > 1 - TOL]
    p0 = max(plus_y0, key=lambda f: f.area)
    faelle.append(
        {
            "fall": "K2",
            "regel": "größte ebene Fläche mit Normale +Y, genau ein Ziel",
            "gespeichert_an": {"satz": "P0", "ziel": ziel(p0)},
            "parameter": {**BASIS, **K2_PARAMS},
            "ziele": [],
            "befund": "mehrdeutig",
            "kandidaten": sortiert([ziel(f) for f in kandidaten]),
        }
    )
    faelle.append(
        {
            "fall": "K3",
            "ausloeser": "Folgeelement nutzt die Auswahl aus K1, ein unabhängiges Element nicht",
            "zustand_folgeelement": ["fehlerhaft", "pausiert"],
            "zustand_unabhaengig": "aktuell",
        }
    )

    doc = {
        "quelle": "abgeleitet mit ableiten.py aus parts/examples/halter.py und design.md",
        "toleranz": {"schwerpunkt_mm": 1e-3, "richtung_rad": 1e-6},
        "parameter_basis": BASIS,
        "saetze": SAETZE,
        "faelle": faelle,
    }
    OUT.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for f in faelle:
        name = f["fall"] if "fall" in f else f"{f['regel']}-{f['satz']}"
        print(name, len(f.get("ziele", [])), len(f.get("kandidaten", [])))
    assert len(kandidaten) == 2, "K2 muss genau zwei gleichrangige Kandidaten haben"


if __name__ == "__main__":
    main()
