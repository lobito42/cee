"""AK-7: Requirement „Synchrone Auswahl“."""

from __future__ import annotations

import re

from ux2_helpers import (
    Bild,
    P,
    bauen,
    farbe,
    farbpixel_ausserhalb,
    geometrie,
    hex_rgb,
    id_von,
    kontur_treffer,
    pruefen,
    zeile,
)

ZIELE = {"grundplatte-oben": "Grundplatte", "steg-vorn": "Steg", "bohrung-wand": "Bohrungen"}
SCHRITTE = ("Grundplatte", "Steg", "Bohrungen")


def test_flaeche_waehlt_schritt():
    """Klick auf Oberseite Grundplatte, Vorderseite Steg, Bohrungswand: genau dieser Schritt gewählt,
    nur seine Aufbauzeile `aria-selected="true"`, Inspektor zeigt ihn."""
    klicks = {k["ziel"]: k for k in pruefen("auswahl")["klicks"]}
    assert set(klicks) == set(ZIELE)
    for ziel, schritt in ZIELE.items():
        k = klicks[ziel]
        assert k["auswahl"] == [id_von(k["modell"], schritt)], (ziel, k["auswahl"])
        markiert = [z["name"] for z in k["aufbau"] if z["aria_selected"] == "true"]
        assert markiert == [schritt], (ziel, markiert)
        assert k["inspektor"]["titel"] == schritt, (ziel, k["inspektor"]["titel"])


def test_aufbau_waehlt_im_modell():
    """Klick auf Aufbauzeile „Steg“: `auswahl()` wie beim Klick auf eine Stegfläche; Akzentkontur am Steg."""
    a = pruefen("auswahl")
    s = a["aufbau_steg"]
    assert s["auswahl"] == a["flaeche_steg"]["auswahl"] and s["auswahl"], (s["auswahl"], a["flaeche_steg"])
    bild = Bild(s["leinwand"])
    akzent = hex_rgb(farbe("hell", "akzent"))
    assert len(s["umriss"]) >= 10
    assert kontur_treffer(bild, s["umriss"], akzent) >= 0.9 * len(s["umriss"])
    assert farbpixel_ausserhalb(bild, s["huellbox"], akzent) == 0


def test_ueberfahren_in_beide_richtungen():
    """Aufbauzeile „Bohrungen“ überfahren → Bohrungen im Modell hervorgehoben; Fläche der Grundplatte
    überfahren → Zeile „Grundplatte“ `data-hervorgehoben`; `auswahl()` jeweils unverändert."""
    a = pruefen("auswahl")
    h1 = a["hover_aufbau_bohrungen"]
    modell = a["klicks"][0]["modell"]
    hervor = {g["schritt"] for g in h1["ansicht"]["geometrie"] if g["hervorgehoben"]}
    assert hervor == {id_von(modell, "Bohrungen")}, hervor
    assert h1["auswahl_nachher"] == h1["auswahl_vorher"]
    assert geometrie(h1["ansicht"], id_von(modell, "Bohrungen"))["sichtbar"]
    h2 = a["hover_flaeche_grundplatte"]
    assert zeile(h2["aufbau"], "Grundplatte")["hervorgehoben"] is True
    andere = [z["name"] for z in h2["aufbau"] if z["hervorgehoben"] and z["name"] != "Grundplatte"]
    assert andere == [], andere
    assert h2["auswahl_nachher"] == h2["auswahl_vorher"]


HOVER_REGEL = re.compile(r"([^{}]*:hover[^{}]*)\{([^{}]*)\}")
VERBOTEN = re.compile(r"(?<![\w-])(?:display|visibility|opacity|pointer-events)\s*:")


def test_nichts_nur_beim_ueberfahren():
    """0 `:hover`-Regeln, die display/visibility/opacity/pointer-events ändern; 0 Bedienelemente erst beim
    Überfahren sichtbar."""
    bauen()
    css = [p for p in (P / "dist").rglob("*.css")]
    assert css, "dist/ enthält kein CSS"
    funde = []
    for p in css:
        text = re.sub(r"/\*.*?\*/", "", p.read_text("utf-8", errors="ignore"), flags=re.S)
        for m in HOVER_REGEL.finditer(text):
            if VERBOTEN.search(m.group(2)):
                funde.append(f"{p.name}: {m.group(1).strip()} {{{m.group(2).strip()[:80]}}}")
    assert funde == [], funde[:10]
    elemente = pruefen("auswahl")["nur_beim_ueberfahren"]
    assert elemente, "keine Bedienelemente geprüft"
    nur = [e for e in elemente if not e["sichtbar_ohne"] and e["sichtbar_mit"]]
    assert nur == [], nur[:10]
