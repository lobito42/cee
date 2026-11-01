"""ap-53, Capability `skizze`: Skizzenelemente auf einer Ebene (AK-2) und Bereiche aus geschlossenen Konturen (AK-3).

Alle Sollwerte rechnet der Test aus den Parametern nach (Ebene aus dem Koordinatensystem, Flächen analytisch); der Worker
wird nur gelesen. Toleranzen: Lagen 1e-6 mm, Flächen relativ 1e-6.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import need_module  # noqa: E402
from skz_helpers import (  # noqa: E402
    TOL_MM,
    alle_befunde,
    befunde_mit,
    bereiche,
    betrag,
    ebene_von_frame,
    ecken_der_form,
    flaeche_von,
    formen_von,
    frame,
    k0,
    kreis_der_form,
    nahe,
    projekt,
    punkt_von,
    rechne,
    rel,
    res,
    s_kreis,
    s_linie,
    s_rechteck,
    skizze,
)
from wf_helpers import auftrag_von, rechnen_auftrag  # noqa: E402

KREIS_R = 3.3


def _ids(paare) -> list[str]:
    return sorted(i for i, _ in paare)


def test_lage_auf_gedrehter_ebene():
    """Requirement „Skizzenelemente auf einer Ebene“, Scenario „Lage auf einer gedrehten Ebene“: Skizze auf der XY-Ebene
    von K1 (x = 100 mm, rz = 30 deg, rx = 90 deg) mit Linie (0, 0)–(50, 0), Rechteck (−10, −5)–(10, 5) und Kreis bei
    (20, 0) mit d = 10 mm: alle 8 Prüfwerte der OCP-Kanten aus `formen()` stimmen mit der nachgerechneten Weltlage auf
    1e-6 mm überein (2 Linienenden, 4 Rechteckecken, Kreismittelpunkt, Kreisradius)."""
    need_module("OCP")
    elemente = [
        frame("K1", x=100, rx=90, rz=30),
        skizze(
            "S1",
            "K1.xy",
            s_linie("L1", 0, 0, 50, 0),
            s_rechteck("R1", -10, -5, 10, 5),
            s_kreis("C1", 20, 0, 10),
        ),
    ]
    formen = formen_von(elemente)
    ebene = ebene_von_frame(x=100, rx=90, rz=30)
    e = rechnen_auftrag(auftrag_von(projekt(*elemente)))
    for i in ("S1", "L1", "R1", "C1"):
        assert res(e, i)["state"] == "aktuell", (i, res(e, i).get("befunde"))

    def gleich(ist, soll) -> bool:
        return nahe(ist, soll, TOL_MM)

    geprueft = 0
    ecken = ecken_der_form(formen["L1"])
    assert len(ecken) == 2, ecken
    for p in (_w(ebene, 0, 0), _w(ebene, 50, 0)):
        assert any(gleich(p, q) for q in ecken), (p, ecken)
    geprueft += 2
    ecken = ecken_der_form(formen["R1"])
    punkte = [_w(ebene, u, v) for u, v in ((-10, -5), (10, -5), (10, 5), (-10, 5))]
    assert len(ecken) == 4
    for p in punkte:
        assert any(gleich(p, q) for q in ecken), (p, ecken)
    geprueft += 4
    mitte, radius = kreis_der_form(formen["C1"])
    assert gleich(mitte, _w(ebene, 20, 0)), (mitte, _w(ebene, 20, 0))
    assert abs(radius - 5) <= TOL_MM, radius
    geprueft += 2
    assert geprueft == 8


def _w(ebene, u, v):
    t, xd, yd, _ = ebene
    return tuple(t[k] + u * xd[k] + v * yd[k] for k in range(3))


def test_entartet_und_ausserhalb():
    """Scenario „Entartet und außerhalb“: Linie der Länge 0, Rechteck der Breite 0, Kreis mit d = 0 und ein gültiges
    Rechteck in einer Skizze, dazu ein `sketch_line` direkt im Teil: genau 3 Befunde `degenerate` mit den drei
    Element-IDs, genau 1 Befund `not_in_sketch`, das gültige Rechteck hat `state` = `aktuell`."""
    e = rechne(
        skizze(
            "S1",
            "K0.xy",
            s_linie("L0", 5, 5, 5, 5),
            s_rechteck("R0", 0, 0, 0, 20),
            s_kreis("C0", 30, 30, 0),
            s_rechteck("R1", 40, 0, 60, 20),
        ),
        s_linie("LX", 0, 0, 10, 0),
    )
    entartet = befunde_mit(e, "degenerate")
    assert len(entartet) == 3, entartet
    assert _ids(entartet) == ["C0", "L0", "R0"], entartet
    draussen = befunde_mit(e, "not_in_sketch")
    assert len(draussen) == 1 and draussen[0][0] == "LX", draussen
    assert res(e, "R1")["state"] == "aktuell", res(e, "R1")
    # Befunde sind keine Absturzmeldungen: die Skizze selbst und K0 werden weiter berechnet
    assert res(e, "K0")["state"] == "aktuell"
    assert res(e, "S1")["state"] in ("aktuell", "fehlerhaft")


def test_einheiten_kreis_durchmesser():
    """Scenario „Einheiten“: Kreis mit `d` = 0,05 m und Kreis mit `d` = 50 (ohne Einheit) haben Radius 25 mm (1e-6 mm),
    der zweite mit genau 1 Warnung „Standard-Einheit“ (`unit_assumed`) aus dem Kern; ein Kreis mit `d` = 5 kg ergibt
    Befund `unit`."""
    need_module("OCP")
    sdk = need_module("cee_sdk")
    elemente = [
        k0(),
        skizze(
            "S1",
            "K0.xy",
            s_kreis("CM", 0, 0, {"value": 0.05, "unit": "m"}),
            s_kreis("CN", 100, 0, 50),
            s_kreis("CK", 200, 0, {"value": 5, "unit": "kg"}),
        ),
    ]
    formen = formen_von(elemente)
    for i in ("CM", "CN"):
        _, radius = kreis_der_form(formen[i])
        assert abs(radius - 25) <= TOL_MM, (i, radius)
    e = rechnen_auftrag(auftrag_von(projekt(*elemente)))
    assert [b["code"] for b in res(e, "CK").get("befunde", [])].count("unit") == 1, res(e, "CK")
    assert res(e, "CM")["state"] == "aktuell" and res(e, "CN")["state"] == "aktuell"
    typen = _typen_alle()
    doc = sdk.Document.import_project(projekt(*elemente), typen)
    warn = [
        b
        for b in doc.import_info.get("findings", []) + doc.validate().get("findings", [])
        if b.get("code") == "unit_assumed"
    ]
    assert [b.get("element") for b in warn] == ["CN"], warn


def _typen_alle() -> list:
    from skz_helpers import TYPEN_DRAHT, TYPEN_SKIZZE  # noqa: PLC0415

    def liste(p):
        d = json.loads(p.read_text(encoding="utf-8"))
        return d["types"] if isinstance(d, dict) else d

    return liste(TYPEN_DRAHT) + liste(TYPEN_SKIZZE)


# --- AK-3 Bereiche --------------------------------------------------------------------------------------


def _loecher_skizze():
    return skizze(
        "S1",
        "K0.xy",
        s_rechteck("R1", -30, -20, 30, 20),
        s_kreis("C1", -20, 4, 2 * KREIS_R),
        s_kreis("C2", 20, 4, 2 * KREIS_R),
    )


def test_bereiche_rechteck_mit_zwei_loechern():
    """Requirement „Bereiche aus geschlossenen Konturen“, Scenario „Rechteck mit zwei Löchern“: Rechteck (−30, −20)–(30, 20)
    und zwei Kreise d = 6,6 mm bei (±20, 4): genau 3 Bereiche; einer mit `aussen` = [Rechteck], `loecher` = beide Kreise
    und Fläche 2 400 − 2·π·3,3² mm², zwei mit je einem Kreis und Fläche π·3,3² mm² (relativ 1e-6); jeder `punkt` liegt im
    Inneren seines Bereichs und nicht in einem Loch."""
    e = rechne(_loecher_skizze())
    b = bereiche(e, "S1")
    assert len(b) == 3, b
    kreis = math.pi * KREIS_R**2
    gross = [x for x in b if x["aussen"] == ["R1"]]
    assert len(gross) == 1, b
    assert sorted(gross[0]["loecher"]) == ["C1", "C2"], gross[0]
    assert rel(flaeche_von(gross[0]), 2400 - 2 * kreis), flaeche_von(gross[0])
    klein = sorted((x for x in b if x["aussen"] != ["R1"]), key=lambda x: x["aussen"])
    assert [x["aussen"] for x in klein] == [["C1"], ["C2"]], klein
    for x in klein:
        assert x["loecher"] == [] and rel(flaeche_von(x), kreis), x
    mitten = {"C1": (-20, 4), "C2": (20, 4)}
    u, v = punkt_von(gross[0])
    assert -30 < u < 30 and -20 < v < 20, (u, v)
    assert all(betrag((u - m[0], v - m[1], 0)) > KREIS_R for m in mitten.values()), (
        "Punkt liegt in einem Loch"
    )
    for x in klein:
        u, v = punkt_von(x)
        m = mitten[x["aussen"][0]]
        assert betrag((u - m[0], v - m[1], 0)) < KREIS_R, (x["aussen"], u, v)
        assert x.get("rand"), "Bereich ohne Rand zur Anzeige"
    assert gross[0].get("rand"), "Bereich ohne Rand zur Anzeige"


def test_bereiche_linienzug_und_offene_linie():
    """Scenario „Linienzug und offene Linie“: vier Linien (0,0)–(40,0)–(40,30)–(0,30)–(0,0) mit exakt gleichen Endpunkten
    und eine offene Linie (60,0)–(90,0): genau 1 Bereich mit Fläche 1 200 mm² (relativ 1e-6) und `aussen` = die vier
    Linien, und es gibt keinen Befund."""
    e = rechne(
        skizze(
            "S1",
            "K0.xy",
            s_linie("L1", 0, 0, 40, 0),
            s_linie("L2", 40, 0, 40, 30),
            s_linie("L3", 40, 30, 0, 30),
            s_linie("L4", 0, 30, 0, 0),
            s_linie("L5", 60, 0, 90, 0),
        )
    )
    b = bereiche(e, "S1")
    assert len(b) == 1, b
    assert rel(flaeche_von(b[0]), 1200), flaeche_von(b[0])
    assert sorted(b[0]["aussen"]) == ["L1", "L2", "L3", "L4"], b[0]
    assert alle_befunde(e) == [], alle_befunde(e)


def test_bereiche_schneidende_konturen():
    """Scenario „Schneidende Konturen“: Rechtecke (0,0)–(20,20) und (10,10)–(30,30) sowie ein Kreis bei (100, 0) mit d = 10:
    genau 1 Befund `curves_intersect` mit beiden Rechteck-IDs, genau 1 Bereich (der Kreis), der Auftrag endet ohne
    Absturz."""
    elemente = [
        k0(),
        skizze(
            "S1",
            "K0.xy",
            s_rechteck("R1", 0, 0, 20, 20),
            s_rechteck("R2", 10, 10, 30, 30),
            s_kreis("C1", 100, 0, 10),
        ),
    ]
    a = auftrag_von(projekt(*elemente))
    e = rechnen_auftrag(a)
    assert len(e["results"]) == len(a["elements"]), "nicht alle Elemente berechnet"
    schnitt = befunde_mit(e, "curves_intersect")
    assert len(schnitt) == 1, schnitt
    text = json.dumps(schnitt[0][1], ensure_ascii=False) + schnitt[0][0]
    assert "R1" in text and "R2" in text, schnitt
    b = bereiche(e, "S1")
    assert len(b) == 1 and b[0]["aussen"] == ["C1"], b
    assert rel(flaeche_von(b[0]), math.pi * 25), b[0]


def test_bereiche_nicht_ueber_listenposition_adressiert():
    """Requirement „Bereiche aus geschlossenen Konturen“ (ADR-016): Ein Bereich wird über Element-IDs und einen inneren
    Punkt beschrieben, nicht über seine Position in der Liste: Vertauscht man die Reihenfolge der Kinder in `content`,
    liefert der Worker dieselben Bereiche (gleiche `aussen`/`loecher`/Flächen als Menge)."""
    s = _loecher_skizze()
    vorwaerts = bereiche(rechne(s), "S1")
    s2 = json.loads(json.dumps(s))
    s2["content"].reverse()
    rueck = bereiche(rechne(s2), "S1")

    def schluessel(b):
        return sorted(
            (tuple(sorted(x["aussen"])), tuple(sorted(x["loecher"])), round(flaeche_von(x), 6)) for x in b
        )

    assert schluessel(vorwaerts) == schluessel(rueck)
