"""AK-11: Darstellung umschalten, Aufgabe H, Kontextaktionen (Requirements „Darstellung umschalten“, „Kontextaktionen …“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

from ux2_helpers import (
    Bild,
    ablauf,
    abstand,
    geometrie,
    hex_rgb,
    id_von,
    innerhalb,
    nach_name,
    nahe,
    pruefen,
    verworfen,
)

SOLL_BEFEHLE = {"ort.skizze-bearbeiten", "schritt.ausblenden", "schritt.verwerfen"}


def test_umschalter_und_taste_w():
    """3 × W gefolgt von „Durchsicht“: kanten, durchsicht, koerper, durchsicht; Umschalter unten rechts; Modell unverändert."""
    h = ablauf("h", "taste-w")
    assert h["folge"] == ["kanten", "durchsicht", "koerper", "durchsicht"], h["folge"]
    u, z = h["umschalter"], h["modellzone"]
    assert u["x"] >= z["x"] + z["breite"] / 2 and u["y"] >= z["y"] + z["hoehe"] / 2, (u, z)
    assert innerhalb(u, z)
    assert h["modell"] == h["modell_vorher"] and h["auswahl"] == h["auswahl_vorher"]


def _anteil_abweichend(bild: Bild, box: dict, viewport) -> float:
    n = ab = 0
    for y in range(int(box["y"]), int(box["y"] + box["hoehe"]), 2):
        for x in range(int(box["x"]), int(box["x"] + box["breite"]), 2):
            n += 1
            ab += abstand(bild.rgb(x, y), viewport) > 0.03
    assert n > 0, box
    return ab / n


def test_aufgabe_h_kanten_fast_leer_koerper_voll():
    """Darstellung Kanten: ≤ 15 % der Pixel in der Hüllbox weichen vom Hintergrund ab; Körper: ≥ 50 %."""
    h = ablauf("h")
    assert h["ansicht"]["darstellung"] == "kanten"
    viewport = hex_rgb(h["viewport"])
    assert _anteil_abweichend(Bild(h["leinwand"]), h["huellbox_leinwand"], viewport) <= 0.15
    k = h["koerper"]
    assert _anteil_abweichend(Bild(k["leinwand"]), k["huellbox_leinwand"], viewport) >= 0.50


def test_kontextleiste_lage_und_inhalt():
    """Grundplatte gewählt: Leiste mit ≤ 5 Einträgen inkl. Skizze bearbeiten/Ausblenden/Verwerfen, ≤ 24 px über der Hüllbox, in der Modellzone."""
    k = pruefen("kontext")
    leiste = k["leiste"]
    assert 3 <= len(leiste["befehle"]) <= 5 and set(leiste["befehle"]) >= SOLL_BEFEHLE, leiste["befehle"]
    r, hb, zone = leiste["rechteck"], k["huellbox_grundplatte"], k["modellzone"]
    unten = r["y"] + r["hoehe"]
    assert hb["y"] - 24 <= unten <= hb["y"] + 0.5, (unten, hb["y"])
    assert innerhalb(r, zone), (r, zone)


def test_rechtsklick_zeigt_dasselbe():
    """Rechtsklick im Modell und im Aufbau: gleiche Befehle in gleicher Reihenfolge wie die Leiste."""
    k = pruefen("kontext")
    soll = k["leiste"]["befehle"]
    assert k["rechtsklick_modell"] == soll
    assert k["rechtsklick_aufbau"] == soll


def test_verwerfen_loescht_nicht():
    """Steg verworfen: unsichtbar, im Modell als „verworfen“, Volumen − 18 000 mm³; Strg+Z stellt den Stand davor her."""
    v = pruefen("kontext")["verwerfen_steg"]
    steg_id = id_von(v["modell_vorher"], "Steg")
    steg = nach_name(v["modell"], "Steg")
    assert verworfen(steg), steg
    assert not geometrie(v["ansicht"], steg_id)["sichtbar"]
    assert nahe(v["teil_vorher"]["volumen_mm3"] - v["teil"]["volumen_mm3"], 18000.0)
    assert v["modell_nach_rueckgaengig"] == v["modell_vorher"]
    assert v["teil_nach_rueckgaengig"] == v["teil_vorher"]
