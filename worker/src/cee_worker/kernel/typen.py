"""Typtabelle der Wireframe-Basics (ap-50, design.md Abschnitt 1): Eingänge, Parameter und Ausgänge je Typ.

Die Typdefinitionen für den Rust-Kern (Dimension und Standard-Einheit je Parameter) liegen als Daten in
`format/types/drahtmodell.json`; diese Tabelle ergänzt, was nur der Worker braucht: welche Ausgabetypen ein
Eingang annimmt und welche Ausgänge ein Typ hat. Der Rust-Kern kennt keinen dieser Typen (ADR-046).
"""

from __future__ import annotations

from dataclasses import dataclass

TOL_LINEAR = 1e-6  # mm (Regel Geometrie)
TOL_ANGULAR = 1e-9  # rad (Regel Geometrie)

# Kanonische Einheit je Dimension (ADR-057): gerechnet wird in mm und rad.
KANONISCH = {"length": "mm", "angle": "rad"}
STANDARD = {"length": "mm", "angle": "deg"}


@dataclass(frozen=True)
class Eingang:
    typ: str  # Ausgabetyp, den der Eingang annimmt
    pflicht: bool


@dataclass(frozen=True)
class Typ:
    params: dict[str, str]  # Name -> Dimension
    eingaenge: dict[str, Eingang]
    ausgaenge: dict[str, str]  # Name -> Ausgabetyp


_LAGE = {"x": "length", "y": "length", "z": "length"}

TYPEN: dict[str, Typ] = {
    "frame": Typ(
        params={**_LAGE, "rx": "angle", "ry": "angle", "rz": "angle"},
        eingaenge={"parent": Eingang("frame", False)},
        ausgaenge={
            "frame": "frame",
            "origin": "point",
            "x": "line",
            "y": "line",
            "z": "line",
            "xy": "plane",
            "yz": "plane",
            "zx": "plane",
        },
    ),
    "point": Typ(
        params=dict(_LAGE),
        eingaenge={"frame": Eingang("frame", False), "ref": Eingang("point", False)},
        ausgaenge={"point": "point"},
    ),
    "axis": Typ(params={}, eingaenge={"of": Eingang("line", True)}, ausgaenge={"line": "line"}),
    "plane": Typ(params={}, eingaenge={"of": Eingang("plane", True)}, ausgaenge={"plane": "plane"}),
    "line": Typ(
        params={},
        eingaenge={"a": Eingang("point", True), "b": Eingang("point", True)},
        ausgaenge={"line": "line"},
    ),
    "ray": Typ(
        params={},
        eingaenge={"a": Eingang("point", True), "b": Eingang("point", True)},
        ausgaenge={"ray": "ray", "start": "point"},
    ),
    "segment": Typ(
        params={},
        eingaenge={"a": Eingang("point", True), "b": Eingang("point", True)},
        ausgaenge={"segment": "segment", "start": "point", "end": "point"},
    ),
    # Skizze und Hochziehen (ap-53, design.md Abschnitt 2; Daten in `format/types/skizze.json`)
    "sketch": Typ(params={}, eingaenge={"ebene": Eingang("plane", True)}, ausgaenge={"sketch": "sketch"}),
    "sketch_line": Typ(
        params={"u1": "length", "v1": "length", "u2": "length", "v2": "length"},
        eingaenge={},
        ausgaenge={"kurve": "curve"},
    ),
    "sketch_rectangle": Typ(
        params={"u1": "length", "v1": "length", "u2": "length", "v2": "length"},
        eingaenge={},
        ausgaenge={"kurve": "curve"},
    ),
    "sketch_circle": Typ(
        params={"u": "length", "v": "length", "d": "length"},
        eingaenge={},
        ausgaenge={"kurve": "curve"},
    ),
    "extrude": Typ(
        params={"punkt_u": "length", "punkt_v": "length", "hoehe": "length"},
        eingaenge={"skizze": Eingang("sketch", True)},
        ausgaenge={"koerper": "solid"},
    ),
}

SKIZZEN_KURVEN = {"sketch_line": "line", "sketch_rectangle": "rectangle", "sketch_circle": "circle"}
