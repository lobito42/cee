"""Beispielteil: einfacher Winkelhalter (Frästeil).

Folgt der Code-Konvention aus CLAUDE.md. `feature(...)` und `publish(...)` kommen mit AP-17/AP-18 aus
`cadloop_core`; bis dahin stehen sie hier als markierte Platzhalter, damit Agenten die Form kennenlernen.
"""

from __future__ import annotations

from contextlib import contextmanager
from dataclasses import dataclass

from build123d import (
    Align,
    Axis,
    Box,
    BuildPart,
    Cylinder,
    Locations,
    Mode,
    Part,
    fillet,
)


# --- Platzhalter bis AP-17/AP-18 (cadloop_core.feature / cadloop_core.publish) -------------------------
@contextmanager
def feature(name: str):  # noqa: ARG001 - Name wird ab AP-17 für die Identitätsschicht genutzt
    yield


def publish(name: str, ref: object, **meta: object) -> None:  # noqa: ARG001
    return None


# -------------------------------------------------------------------------------------------------------


@dataclass
class Params:
    """Parameter des Halters in Millimetern."""

    breite: float = 60.0
    tiefe: float = 40.0
    dicke: float = 8.0
    steg_hoehe: float = 50.0
    bohrung_d: float = 6.6  # Durchgangsbohrung für M6
    bohrung_abstand: float = 40.0
    radius_aussen: float = 2.0


def build(p: Params) -> Part:
    with BuildPart() as halter:
        with feature("grundplatte"):
            Box(p.breite, p.tiefe, p.dicke, align=(Align.CENTER, Align.CENTER, Align.MIN))

        with feature("steg"):
            with Locations((0, -p.tiefe / 2 + p.dicke / 2, p.dicke)):
                Box(p.breite, p.dicke, p.steg_hoehe, align=(Align.CENTER, Align.CENTER, Align.MIN))

        with feature("bohrung_m6"):
            x, y = p.bohrung_abstand / 2, p.dicke / 2
            with Locations((-x, y, 0), (x, y, 0)):
                Cylinder(
                    p.bohrung_d / 2,
                    p.dicke,
                    align=(Align.CENTER, Align.CENTER, Align.MIN),
                    mode=Mode.SUBTRACT,
                )

        with feature("verrundung_aussen"):
            kanten = halter.edges().filter_by(Axis.Z)
            fillet(kanten, radius=p.radius_aussen)

    teil = halter.part
    publish("Montageflaeche_A", teil.faces().sort_by(Axis.Z)[0], anforderung="REQ-001")
    return teil


if __name__ == "__main__":
    shape = build(Params())
    print(f"Volumen: {shape.volume:.1f} mm³, gültig: {shape.is_valid}")
