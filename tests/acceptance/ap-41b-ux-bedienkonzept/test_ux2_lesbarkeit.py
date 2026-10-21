"""AK-5: Lesbare 3D-Darstellung (Requirement „Lesbare 3D-Darstellung“).

Der Test misst Pixel selbst (OKLCH) an den Punkten, die das Prüfwerkzeug aus `projektion()` liefert.
"""

from __future__ import annotations

import itertools
import statistics
from functools import cache

from ux2_helpers import THEMEN, Bild, abstand, farbe, hell_l, hex_rgb, median_l, pruefen


@cache
def _bild(pfad: str) -> Bild:
    return Bild(pfad)


def _je_thema() -> dict[str, dict]:
    liste = pruefen("lesbarkeit")
    assert {e["thema"] for e in liste} == set(THEMEN) and len(liste) == 2
    return {e["thema"]: e for e in liste}


def test_gerichtetes_licht_und_flaechenhelligkeit():
    """Gerichtetes Licht ≥ 60 % der Gesamtintensität; Oberseite, Vorderseite, rechte Seite paarweise ΔL ≥ 0,04."""
    for thema, e in _je_thema().items():
        lichter = e["ansicht"]["lichter"]
        gesamt = sum(x["intensitaet"] for x in lichter)
        gerichtet = sum(x["intensitaet"] for x in lichter if x["art"] == "gerichtet")
        assert gesamt > 0 and gerichtet / gesamt >= 0.60, (thema, lichter)
        bild = _bild(e["leinwand"])
        werte = {k: median_l(bild, e["flaechen"][k]) for k in ("oben", "vorn", "rechts")}
        for a, b in itertools.combinations(werte, 2):
            assert abs(werte[a] - werte[b]) >= 0.04, (thema, a, b, werte)


def test_kanten_sichtbar():
    """An 100 % der sichtbaren äußeren Kanten von Grundplatte und Steg liegt ≤ 2 px daneben ein Pixel mit ΔL ≥ 0,10."""
    for thema, e in _je_thema().items():
        assert len(e["kanten"]) >= 12, (thema, "zu wenige Kanten gemeldet", len(e["kanten"]))
        bild = _bild(e["leinwand"])
        ohne = []
        for k in e["kanten"]:
            assert k["flaechen"], k["name"]
            flaechen_l = statistics.median(median_l(bild, p) for p in k["flaechen"])
            mx, my = k["mitte"]["x"], k["mitte"]["y"]
            if not any(abs(hell_l(c) - flaechen_l) >= 0.10 for c in bild.umgebung(mx, my, 2)):
                ohne.append(k["name"])
        assert ohne == [], (thema, ohne)


def _akzentpixel(bild: Bild, x: int, y: int, akzent: tuple[int, int, int]) -> bool:
    c = bild.rgb(x, y)
    if max(abs(c[i] - akzent[i]) for i in range(3)) > 60:
        return False
    return abstand(c, akzent) <= 0.03


def test_auswahlkontur_im_akzent():
    """Entlang der Umrisslinie des Stegs ≥ 90 % der Messpunkte mit Akzent ≤ 3 px; außerhalb Hüllbox + 4 px: 0 Pixel."""
    for thema, e in _je_thema().items():
        s = e["auswahl_steg"]
        assert s["auswahl"], (thema, "Steg nicht gewählt")
        akzent = hex_rgb(farbe(thema, "akzent"))
        bild = _bild(s["leinwand"])
        punkte = s["umriss"]
        assert len(punkte) >= 8, (thema, len(punkte))
        treffer = sum(
            1
            for p in punkte
            if any(
                _akzentpixel(bild, round(p["x"]) + dx, round(p["y"]) + dy, akzent)
                for dx in range(-3, 4)
                for dy in range(-3, 4)
            )
        )
        assert treffer / len(punkte) >= 0.90, (thema, treffer, len(punkte))
        h = s["huellbox"]
        x0, y0, x1, y1 = h["x"] - 4, h["y"] - 4, h["x"] + h["breite"] + 4, h["y"] + h["hoehe"] + 4
        aussen = [
            (x, y)
            for y in range(0, bild.hoehe)
            for x in range(0, bild.breite)
            if not (x0 <= x <= x1 and y0 <= y <= y1) and _akzentpixel(bild, x, y, akzent)
        ]
        assert aussen == [], (thema, aussen[:10], len(aussen))


def _huellbox_pixel(bild: Bild, viewport: tuple[int, int, int, int]) -> dict:
    xs, ys = [], []
    for y in range(0, bild.hoehe, 2):
        for x in range(0, bild.breite, 2):
            if abstand(bild.rgb(x, y), viewport) > 0.03:
                xs.append(x)
                ys.append(y)
    assert xs, "Leinwand zeigt nur Hintergrund"
    return {"x": min(xs), "y": min(ys), "breite": max(xs) - min(xs), "hoehe": max(ys) - min(ys)}


def test_ansicht_einpassen():
    """Nach Drehen, Herauszoomen und `ansicht.einpassen` füllt das Teil 60–90 % der kürzeren Zonenseite, mittig ±5 %."""
    for thema, e in _je_thema().items():
        ep = e["einpassen"]
        zone, lw = ep["modellzone"], ep["leinwand_rechteck"]
        viewport = hex_rgb(e["viewport"])
        vorher = _huellbox_pixel(_bild(ep["leinwand_vorher"]), viewport)
        nachher = _huellbox_pixel(_bild(ep["leinwand"]), viewport)
        kurz = min(zone["breite"], zone["hoehe"])
        assert max(vorher["breite"], vorher["hoehe"]) < 0.6 * kurz, (
            thema,
            "Vorbedingung: herausgezoomt",
            vorher,
        )
        fuellung = max(nachher["breite"], nachher["hoehe"]) / kurz
        assert 0.60 <= fuellung <= 0.90, (thema, fuellung, nachher)
        mx = lw["x"] + nachher["x"] + nachher["breite"] / 2
        my = lw["y"] + nachher["y"] + nachher["hoehe"] / 2
        zx, zy = zone["x"] + zone["breite"] / 2, zone["y"] + zone["hoehe"] / 2
        assert abs(mx - zx) <= 0.05 * zone["breite"], (thema, mx, zx)
        assert abs(my - zy) <= 0.05 * zone["hoehe"], (thema, my, zy)
