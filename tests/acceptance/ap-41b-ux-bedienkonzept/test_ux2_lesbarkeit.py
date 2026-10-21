"""AK-5: Requirement „Lesbare 3D-Darstellung“.

Alle Pixelmessungen rechnet der Test selbst aus den PNGs der Leinwand (OKLab/OKLCH, eigener PNG-Leser).
"""

from __future__ import annotations

import itertools
import statistics

from ux2_helpers import (
    THEMEN,
    Bild,
    abstand,
    farbe,
    farbpixel_ausserhalb,
    hell_l,
    hex_rgb,
    kontur_treffer,
    median_l,
    pruefen,
)


def _lesbarkeit() -> dict[str, dict]:
    liste = pruefen("lesbarkeit")
    ergebnis = {e["thema"]: e for e in liste}
    assert set(ergebnis) == set(THEMEN)
    return ergebnis


def test_licht_gerichtet():
    """`ansicht().lichter`: mindestens ein gerichtetes Licht mit ≥ 60 % der Gesamtintensität."""
    for thema, e in _lesbarkeit().items():
        lichter = e["ansicht"]["lichter"]
        gesamt = sum(lt["intensitaet"] for lt in lichter)
        assert gesamt > 0, (thema, lichter)
        gerichtet = [lt["intensitaet"] for lt in lichter if lt["art"] == "gerichtet"]
        assert gerichtet and max(gerichtet) >= 0.6 * gesamt, (thema, lichter)


def test_flaechen_unterscheiden_sich_in_der_helligkeit():
    """Grundplatte oben, vorn, rechts: OKLCH L (Median 7 × 7) paarweise ≥ 0,04 verschieden."""
    for thema, e in _lesbarkeit().items():
        bild = Bild(e["leinwand"])
        werte = {name: median_l(bild, e["flaechen"][name]) for name in ("oben", "vorn", "rechts")}
        for a, b in itertools.combinations(werte, 2):
            assert abs(werte[a] - werte[b]) >= 0.04, (thema, werte)


def test_kanten_sichtbar():
    """100 % der sichtbaren Außenkanten: innerhalb 2 px ein Pixel mit |ΔL| ≥ 0,10 zum Median der Flächen."""
    for thema, e in _lesbarkeit().items():
        bild = Bild(e["leinwand"])
        kanten = e["kanten"]
        assert len(kanten) >= 9, f"{thema}: nur {len(kanten)} sichtbare äußere Kanten gemeldet"
        ohne = []
        for k in kanten:
            assert k["flaechen"], (thema, k)
            umgebung = [hell_l(c) for p in k["flaechen"] for c in bild.umgebung(p["x"], p["y"], 3)]
            bezug = statistics.median(umgebung)
            if not any(
                abs(hell_l(c) - bezug) >= 0.10 for c in bild.umgebung(k["mitte"]["x"], k["mitte"]["y"], 2)
            ):
                ohne.append(k["name"])
        assert ohne == [], (thema, ohne)


def test_auswahlkontur_im_akzent():
    """Steg per Klick gewählt: ≥ 90 % der Umrisspunkte mit Akzentpixel (≤ 3 px, ΔOK ≤ 0,03); außerhalb 0."""
    for thema, e in _lesbarkeit().items():
        s = e["auswahl_steg"]
        assert len(s["auswahl"]) == 1, s["auswahl"]
        bild = Bild(s["leinwand"])
        akzent = hex_rgb(farbe(thema, "akzent"))
        punkte = s["umriss"]
        assert len(punkte) >= 10, f"{thema}: Umriss mit nur {len(punkte)} Punkten"
        treffer = kontur_treffer(bild, punkte, akzent)
        assert treffer >= 0.9 * len(punkte), (thema, treffer, len(punkte))
        aussen = farbpixel_ausserhalb(bild, s["huellbox"], akzent)
        assert aussen == 0, f"{thema}: {aussen} Akzentpixel außerhalb der Hüllbox des Stegs"


def _teil_box(bild: Bild, hintergrund: tuple[int, int, int]) -> tuple[int, int, int, int]:
    xs, ys = [], []
    for y in range(0, bild.hoehe, 2):
        for x in range(0, bild.breite, 2):
            if abstand(bild.rgb(x, y), hintergrund) > 0.03:
                xs.append(x)
                ys.append(y)
    assert xs, "Leinwand zeigt kein Teil (nur Hintergrund)"
    return min(xs), min(ys), max(xs), max(ys)


def test_ansicht_einpassen():
    """Nach Drehen und dreifachem Herauszoomen und `ansicht.einpassen`: Teil füllt 60–90 % der kürzeren Seite,
    Mitte ≤ 5 % der Zonengröße von der Zonenmitte (Hüllbox aus den Pixeln der Leinwand)."""
    for thema, e in _lesbarkeit().items():
        ein = e["einpassen"]
        hintergrund = hex_rgb(farbe(thema, "viewport"))
        zone, lw = ein["modellzone"], ein["leinwand_rechteck"]
        kurz = min(zone["breite"], zone["hoehe"])
        vx0, vy0, vx1, vy1 = _teil_box(Bild(ein["leinwand_vorher"]), hintergrund)
        assert max(vx1 - vx0, vy1 - vy0) < 0.6 * kurz, f"{thema}: vor dem Einpassen nicht herausgezoomt"
        x0, y0, x1, y1 = _teil_box(Bild(ein["leinwand"]), hintergrund)
        anteil = max(x1 - x0, y1 - y0) / kurz
        assert 0.6 <= anteil <= 0.9, (thema, anteil)
        mx, my = lw["x"] + (x0 + x1) / 2, lw["y"] + (y0 + y1) / 2
        zx, zy = zone["x"] + zone["breite"] / 2, zone["y"] + zone["hoehe"] / 2
        assert abs(mx - zx) <= 0.05 * zone["breite"], (thema, mx, zx)
        assert abs(my - zy) <= 0.05 * zone["hoehe"], (thema, my, zy)
