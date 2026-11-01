"""ap-53, Capability `skizze-vorschau`: Zeichnen mit Fangen und getipptem Maß (AK-9).

Alle Zeichenpunkte stehen in Skizzenkoordinaten (mm); die Skizze wird beim Öffnen im Maßstab 5 px je mm gezeigt
(Fangradius 8 px = 1,6 mm), ohne Zoom dazwischen. Jede Lage prüft der Test aus dem Graphen des Schnappschusses.
"""

# ruff: noqa: E501

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from skz_helpers import (  # noqa: E402
    SAblauf,
    anfang,
    kind_id,
    mm_param,
    neue_elemente,
    ohne_dialog,
    wurzeln,
)


def _ebene() -> str:
    return kind_id(anfang("skizze-leer")["graph"], "frame", 1, "plane", 1)


def _zeiger(u: float, v: float, aktion: str) -> dict:
    return {"zeiger": {"skizze_mm": [u, v], "aktion": aktion}}


def _skizze_offen(a: SAblauf) -> SAblauf:
    return a.add("ebene", klick={"element": _ebene()}).add("offen", taste="S")


def _rechteck_schritte(a: SAblauf) -> SAblauf:
    """Rechteck 60 × 40 mm am Ursprung mit getipptem Maß (Scenario „Rechteck mit getipptem Maß“)."""
    a.add("r_taste", taste="R")
    a.add("r_hover", **_zeiger(0.4, -0.3, "bewegen"))
    a.add("r_klick", **_zeiger(0.4, -0.3, "klicken"))
    a.add("r_weg", **_zeiger(30, 20, "bewegen"))
    a.add("r_breite", tippen="60")
    a.add("r_tab", taste="Tab")
    a.add("r_hoehe", tippen="4 cm")
    a.add("r_enter", taste="Enter")
    return a


def _ecken(e: dict) -> set[tuple[float, float]]:
    return {(mm_param(e, "u1"), mm_param(e, "v1")), (mm_param(e, "u2"), mm_param(e, "v2"))}


def test_rechteck_mit_getipptem_mass():
    """Requirement „Zeichnen mit Fangen und getipptem Maß“, Scenario „Rechteck mit getipptem Maß“: in einer offenen Skizze
    auf der XY-Ebene `R`, Klick bei (0,4; −0,3), Zeiger nach (30, 20), „60“, `Tab`, „4 cm“, `Enter`: genau 1
    `sketch_rectangle` mit Ecken exakt (0, 0) und (60, 40) mm (Raster-Fang am Ursprung), `fang.art` war beim Klick
    `raster`, `wertfeld.feld` war nach `Tab` `hoehe`."""
    a = _rechteck_schritte(_skizze_offen(SAblauf())).laufen("skizze-leer")
    ende = a.s("r_enter")
    rects = neue_elemente(a.s("anfang"), ende, "sketch_rectangle")
    assert len(rects) == 1, rects
    assert _ecken(rects[0]) == {(0.0, 0.0), (60.0, 40.0)}, _ecken(rects[0])
    assert "raster" in {a.s("r_hover")["fang"]["art"], a.s("r_klick")["fang"]["art"]}, (
        a.s("r_hover")["fang"],
        a.s("r_klick")["fang"],
    )
    assert a.s("r_tab")["wertfeld"]["sichtbar"] is True
    assert a.s("r_tab")["wertfeld"]["feld"] == "hoehe", a.s("r_tab")["wertfeld"]
    assert a.s("r_breite")["wertfeld"]["sichtbar"] is True
    # das Rechteck liegt im content genau einer Skizze
    sk = wurzeln(ende["graph"], "sketch")
    assert len(sk) == 1 and len([k for k in sk[0]["content"]]) == 1, sk
    ohne_dialog(a.snaps)


def test_fangen_endpunkt_mittelpunkt_und_richtung():
    """Scenario „Fangen an Endpunkt, Mittelpunkt und Richtung“: in der Skizze mit dem Rechteck (0, 0)–(60, 40) `L`, Klick
    bei (60,6; 39,5), Zeiger nach (97; 41,3) und Klick, Esc; danach `K`, Klick bei (78,9; 40,4), „6,6“, `Enter`. Die Linie
    beginnt exakt bei (60, 40) (`fang.art` = `endpunkt`), endet exakt bei v = 40 (`fang.richtung` = `waagerecht`); der Kreis
    hat Mittelpunkt exakt (78,5; 40) (`fang.art` = `mittelpunkt`, Vorrang vor Raster) und d = 6,6 mm."""
    a = _rechteck_schritte(_skizze_offen(SAblauf()))
    a.add("l_taste", taste="L")
    a.add("l_hover1", **_zeiger(60.6, 39.5, "bewegen"))
    a.add("l_klick1", **_zeiger(60.6, 39.5, "klicken"))
    a.add("l_hover2", **_zeiger(97, 41.3, "bewegen"))
    a.add("l_klick2", **_zeiger(97, 41.3, "klicken"))
    a.add("l_ende", taste="Escape")
    a.add("k_taste", taste="K")
    a.add("k_hover", **_zeiger(78.9, 40.4, "bewegen"))
    a.add("k_klick", **_zeiger(78.9, 40.4, "klicken"))
    a.add("k_mass", tippen="6,6")
    a.add("k_enter", taste="Enter")
    a.laufen("skizze-leer")

    assert a.s("l_hover1")["fang"]["art"] == "endpunkt", a.s("l_hover1")["fang"]
    assert a.s("l_hover2")["fang"]["richtung"] == "waagerecht", a.s("l_hover2")["fang"]
    linien = neue_elemente(a.s("r_enter"), a.s("l_ende"), "sketch_line")
    assert len(linien) == 1, linien
    start, ende = (
        (mm_param(linien[0], "u1"), mm_param(linien[0], "v1")),
        (mm_param(linien[0], "u2"), mm_param(linien[0], "v2")),
    )
    assert start == (60.0, 40.0), start
    assert ende[1] == 40.0, ende
    assert abs(ende[0] - 97) <= 0.2, ende

    assert a.s("k_hover")["fang"]["art"] == "mittelpunkt", a.s("k_hover")["fang"]
    kreise = neue_elemente(a.s("l_ende"), a.s("k_enter"), "sketch_circle")
    assert len(kreise) == 1, kreise
    k = kreise[0]
    assert (mm_param(k, "u"), mm_param(k, "v")) == (78.5, 40.0), (mm_param(k, "u"), mm_param(k, "v"))
    assert abs(mm_param(k, "d") - 6.6) <= 1e-9, mm_param(k, "d")
    ohne_dialog(a.snaps)


def test_ungueltiger_wert_abbruch_rueckgaengig():
    """Scenario „Ungültiger Wert, Abbruch, Rückgängig“: beim Kreis „5 kg“ und `Enter`, dann Esc, dann ein gültiger Kreis
    und `bearbeiten.rueckgaengig`: das Wertfeld zeigt einen Befund, `graph_hash` bleibt nach „5 kg“ und nach Esc
    unverändert; nach Rückgängig ist `graph_hash` gleich dem vor dem gültigen Kreis; `dialoge` ist überall 0."""
    a = _skizze_offen(SAblauf())
    a.add("k1", taste="K")
    a.add("m1", **_zeiger(100, 100, "klicken"))
    a.add("falsch", tippen="5 kg")
    a.add("enter1", taste="Enter")
    a.add("esc", taste="Escape")
    a.add("k2", taste="K")
    a.add("m2", **_zeiger(100, 100, "klicken"))
    a.add("gut", tippen="10")
    a.add("enter2", taste="Enter")
    a.add("zurueck", befehl="bearbeiten.rueckgaengig")
    a.laufen("skizze-leer")

    h_vorher = a.s("offen")["graph_hash"]
    nach_enter = a.s("enter1")
    befund = nach_enter["wertfeld"].get("befund") or [
        b for b in nach_enter["befunde"] if b.get("ort") == "wertfeld"
    ]
    assert befund, nach_enter["wertfeld"]
    assert nach_enter["graph_hash"] == h_vorher, "ungültiger Wert darf nichts anlegen"
    assert a.s("esc")["graph_hash"] == h_vorher, "Esc darf nichts ändern"
    angelegt = a.s("enter2")
    assert angelegt["graph_hash"] != h_vorher
    assert len(neue_elemente(a.s("esc"), angelegt, "sketch_circle")) == 1
    assert a.s("zurueck")["graph_hash"] == a.s("esc")["graph_hash"], "ein Rückgängig-Schritt je Element"
    ohne_dialog(a.snaps)
    assert all(s["konsolenfehler"] == [] for s in a.snaps)
