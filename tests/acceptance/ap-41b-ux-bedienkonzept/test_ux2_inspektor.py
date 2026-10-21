"""AK-8, AK-9: Inspektor, Wertfelder live, Griffe mit Zahl am Zeiger (Requirements „Inspektor“, „Griffe am Modell …“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import re

from ux2_helpers import (
    DICHTE_G_MM3,
    feld,
    feldtext,
    groessen,
    id_von,
    nach_name,
    nahe,
    pruefen,
    volumen,
    zahl,
)

V_HALTER = volumen()  # 49 485 mm³


def _grundplatte_dicke(modell) -> list[float]:
    return groessen(nach_name(modell, "Grundplatte"))  # alle Längen in mm


def test_teil_ohne_auswahl():
    """`halter`: PLA, 80 × 50 × 38 mm, Volumen 49,49 cm³, Masse 61,36 g; Volumen und Masse nicht editierbar."""
    d = pruefen("inspektor")["teil"]
    insp = d["inspektor"]
    assert "PLA" in feldtext(feld(insp, "Material")), insp
    abm = feld(insp, "Abmessungen")
    zahlen = sorted(float(z.replace(",", ".")) for z in re.findall(r"\d+(?:[.,]\d+)?", feldtext(abm)))
    assert zahlen == [38.0, 50.0, 80.0], feldtext(abm)
    vol, masse = feld(insp, "Volumen"), feld(insp, "Masse")
    assert nahe(zahl(feldtext(vol)) * 1000, V_HALTER), feldtext(vol)  # cm³ → mm³
    assert nahe(zahl(feldtext(masse)), V_HALTER * DICHTE_G_MM3), feldtext(masse)
    assert not vol["editierbar"] and not masse["editierbar"]
    assert vol["berechnet"] and masse["berechnet"]
    # Rohdaten des Kerns stimmen mit der Anzeige überein
    assert nahe(d["teil"]["volumen_mm3"], V_HALTER) and nahe(d["teil"]["masse_g"], V_HALTER * DICHTE_G_MM3)


def test_schritt_mit_gruppen():
    """Grundplatte gewählt: Gruppe „Maße“ (Dicke 8 mm), „Aus der Skizze“ (80/50/3 mm), 1 Knopf Skizze bearbeiten."""
    d = pruefen("inspektor")["grundplatte"]
    insp = d["inspektor"]
    assert [g["name"] for g in insp["gruppen"]][:2] == ["Maße", "Aus der Skizze"], insp["gruppen"]
    assert zahl(feldtext(feld(insp, "Dicke", "Maße"))) == 8
    assert feld(insp, "Dicke", "Maße")["editierbar"]
    assert zahl(feldtext(feld(insp, "Länge", "Aus der Skizze"))) == 80
    assert zahl(feldtext(feld(insp, "Breite", "Aus der Skizze"))) == 50
    assert zahl(feldtext(feld(insp, "Eckradius", "Aus der Skizze"))) == 3
    assert insp["befehle"].count("ort.skizze-bearbeiten") == 1, insp["befehle"]
    assert d["auswahl"] == [id_von(d["modell"], "Grundplatte")]


def test_live_enter_esc():
    """Tippen „12“ wirkt live (12 mm, neues Volumen); Esc → 8 mm, kein Protokolleintrag; Enter → ein Eintrag; Strg+Z → 8 mm."""
    live = pruefen("inspektor")["live"]
    vor, tippen, esc, enter, zurueck = (
        live[k] for k in ("vorher", "nach_tippen", "nach_esc", "nach_enter", "nach_rueckgaengig")
    )
    neu = volumen(T=12.0)
    assert 12.0 in _grundplatte_dicke(tippen["modell"]), "Modell zeigt nach dem Tippen ohne Enter nicht 12 mm"
    assert nahe(tippen["teil"]["volumen_mm3"], neu), tippen["teil"]
    assert nahe(zahl(feldtext(feld(tippen["inspektor_teil"], "Volumen"))) * 1000, neu)
    assert 8.0 in _grundplatte_dicke(esc["modell"]) and 12.0 not in _grundplatte_dicke(esc["modell"])
    assert nahe(esc["teil"]["volumen_mm3"], V_HALTER)
    assert esc["protokoll"] == vor["protokoll"], "Esc darf keinen Eintrag erzeugen"
    assert 12.0 in _grundplatte_dicke(enter["modell"])
    neue = enter["protokoll"][len(vor["protokoll"]) :]
    assert [p["befehl"] for p in neue] == ["element.wert-setzen"], neue
    assert 8.0 in _grundplatte_dicke(zurueck["modell"]) and 12.0 not in _grundplatte_dicke(zurueck["modell"])
    assert nahe(zurueck["teil"]["volumen_mm3"], V_HALTER)


def test_griffe_nur_am_gewaehlten():
    """`halter`: 0 Griffe; `schritt`: ≥ 1 Griff, alle am gewählten Schritt."""
    g = pruefen("griffe")
    assert g["halter"]["ansicht"]["griffe"] == []
    schritt = g["schritt"]
    assert len(schritt["ansicht"]["griffe"]) >= 1
    assert len(schritt["auswahl"]) == 1
    assert {x["schritt"] for x in schritt["ansicht"]["griffe"]} == set(schritt["auswahl"])
    assert "Dicke" in {x["parameter"] for x in schritt["ansicht"]["griffe"]}


def test_ziehen_mit_zahl_am_zeiger():
    """Ziehen um 4 mm: Zahl mit „mm“ ≤ 40 px vom Zeiger, danach Dicke 12 mm (± 1), Zahl ≤ 1 s nach Loslassen weg."""
    z = pruefen("griffe")["ziehen"]
    nah = [t for t in z["zeiger_texte_waehrend"] if "mm" in t["text"] and t["abstand_px"] <= 40]
    assert nah, z["zeiger_texte_waehrend"]
    assert abs(_dicke_eindeutig(z["modell"]) - 12.0) <= 1.0, _grundplatte_dicke(z["modell"])
    assert [t for t in z["zeiger_texte_1000ms"] if "mm" in t["text"]] == []


def _dicke_eindeutig(modell) -> float:
    werte = [w for w in _grundplatte_dicke(modell) if 7.0 <= w <= 20.0]
    assert werte, _grundplatte_dicke(modell)
    return werte[0]


def test_tippen_beim_ziehen_und_esc():
    """„15“ + Enter beim Ziehen: genau 15 mm; Esc beim Ziehen: 8 mm und 0 neue Protokolleinträge."""
    g = pruefen("griffe")
    assert 15.0 in _grundplatte_dicke(g["tippen"]["modell"])
    assert nahe(g["tippen"]["teil"]["volumen_mm3"], volumen(T=15.0))
    assert 8.0 in _grundplatte_dicke(g["esc"]["modell"]) and 15.0 not in _grundplatte_dicke(
        g["esc"]["modell"]
    )
    assert g["esc"]["protokoll"] == g["esc"]["protokoll_vorher"]
