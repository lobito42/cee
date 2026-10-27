"""AK-5: Requirement „Jeder Befehl nur einmal je Menü“."""

# ruff: noqa: E501

from __future__ import annotations

from collections import Counter

from menue_helpers import ANSICHTSLEISTE, KNOEPFE_MENUELEISTE, TASKLEISTEN, pruefen, register_nach_id

ZUSTAENDE = ["halter", "auswahl", "mehrfach", "aktiv", "ausgeblendet"]
HANDLUNGEN = {"duplizieren", "verwerfen", "ausblenden"}


def _faelle() -> list[dict]:
    faelle = pruefen("doppelt")["faelle"]
    kombis = {(f["taskleiste"], f["zustand"]) for f in faelle}
    assert kombis == {(t, z) for t in TASKLEISTEN for z in ZUSTAENDE}, sorted(kombis)
    return faelle


def _fall(taskleiste: str, zustand: str) -> dict:
    return next(f for f in _faelle() if (f["taskleiste"], f["zustand"]) == (taskleiste, zustand))


def _menue(fall: dict, name: str) -> dict:
    treffer = [m for m in fall["menues"] if m["menue"] == name]
    assert len(treffer) == 1, (name, [m["menue"] for m in fall["menues"]])
    return treffer[0]


def test_keine_doppelungen_in_einem_menue():
    """Scenario „Keine Doppelungen in einem Menü“: je Menü und Zustand sind IDs, Titel und Handlungen höchstens
    einmal (vom Test aus den Einträgen nachgezählt, nicht nur aus den Feldern des Werkzeugs)."""
    gesehen = set()
    for f in _faelle():
        assert f["menues"], (f["taskleiste"], f["zustand"], "keine Menüs gelesen")
        for m in f["menues"]:
            gesehen.add(m["menue"])
            ids = Counter(e["befehl"] for e in m["eintraege"])
            titel = Counter(e["titel"] for e in m["eintraege"])
            handlungen = Counter(e["handlung"] for e in m["eintraege"] if e.get("handlung"))
            ort = (f["taskleiste"], f["zustand"], m["menue"])
            assert [k for k, n in ids.items() if n > 1] == [], (ort, ids)
            assert [k for k, n in titel.items() if n > 1] == [], (ort, titel)
            assert [k for k, n in handlungen.items() if n > 1] == [], (ort, handlungen)
            assert m["doppelte_ids"] == [] and m["doppelte_titel"] == [] and m["doppelte_handlungen"] == [], (
                ort,
                m,
            )
    assert {
        "start-menue",
        "dropdown:Bearbeiten",
        "ansichtsleiste",
        "ansichtsleiste-aufklappmenue",
        "auge",
    } <= gesehen, gesehen


def test_jede_id_nur_an_einem_ort_der_menueleiste():
    """Scenario „Jede ID nur an einem Ort der Menüleiste“: `doppelte_ids_menueleiste` leer; Rückgängig, Wiederholen,
    die drei Schalter und Suche je 1-mal (als Knopf); Rückgängig, Wiederholen, Suche mit Kürzel am Knopf."""
    f = _fall("Modellieren", "halter")
    assert f["doppelte_ids_menueleiste"] == [], f["doppelte_ids_menueleiste"]
    zaehler = Counter(f["menueleiste_ids"])
    assert [k for k, n in zaehler.items() if n > 1] == [], zaehler
    for befehl in KNOEPFE_MENUELEISTE:
        assert zaehler[befehl] == 1, (befehl, zaehler[befehl])
    knoepfe = {k["befehl"]: k for k in f["knoepfe"]}
    assert set(KNOEPFE_MENUELEISTE) <= set(knoepfe), sorted(knoepfe)
    for befehl in KNOEPFE_MENUELEISTE:
        im_dropdown = [
            m["menue"]
            for m in f["menues"]
            if m["menue"].startswith("dropdown:") and befehl in [e["befehl"] for e in m["eintraege"]]
        ]
        assert im_dropdown == [], (befehl, im_dropdown)
    for befehl in ("bearbeiten.rueckgaengig", "bearbeiten.wiederholen", "suche.oeffnen"):
        assert knoepfe[befehl]["kuerzel_text"].strip(), (befehl, knoepfe[befehl])
    for t in TASKLEISTEN:
        assert _fall(t, "halter")["doppelte_ids_menueleiste"] == [], t


def test_ansichtsleiste_ohne_wiederholung():
    """Scenario „Ansichtsleiste ohne Wiederholung“: Aufklappmenü enthält 0 Befehle, die als Knopf in der Leiste
    stehen; jeder der sechs Knöpfe genau 1-mal in der Leiste."""
    f = _fall("Modellieren", "halter")
    leiste = Counter(e["befehl"] for e in _menue(f, "ansichtsleiste")["eintraege"])
    for befehl in ANSICHTSLEISTE:
        assert leiste[befehl] == 1, (befehl, leiste[befehl])
    assert set(leiste) == set(ANSICHTSLEISTE), sorted(leiste)
    aufklapp = {e["befehl"] for e in _menue(f, "ansichtsleiste-aufklappmenue")["eintraege"]}
    assert aufklapp & set(ANSICHTSLEISTE) == set(), sorted(aufklapp & set(ANSICHTSLEISTE))


def test_eine_handlung_die_passende_variante():
    """Scenario „Eine Handlung, die passende Variante“: Dropdown „Bearbeiten“ und Menü am Auge zeigen je Handlung
    (duplizieren, verwerfen, ausblenden) genau 1 Eintrag – bei einem Element `bezug: element`, bei zweien
    `bezug: mehrfach`; Auslösen von „Duplizieren“ protokolliert `element.duplizieren` bzw. `auswahl.duplizieren`."""
    reg = register_nach_id()
    handlungen_im_register = {b["handlung"] for b in reg.values() if b.get("handlung")}
    assert handlungen_im_register >= HANDLUNGEN, handlungen_im_register
    for h in HANDLUNGEN:
        varianten = {b["bezug"] for b in reg.values() if b.get("handlung") == h}
        assert {"element", "mehrfach"} <= varianten, (h, varianten)
    erwartet = {
        "auswahl": ("element", "element.duplizieren"),
        "mehrfach": ("mehrfach", "auswahl.duplizieren"),
    }
    for zustand, (bezug, protokoll) in erwartet.items():
        f = _fall("Modellieren", zustand)
        for name in ("dropdown:Bearbeiten", "auge"):
            eintraege = _menue(f, name)["eintraege"]
            for h in HANDLUNGEN:
                varianten = [e for e in eintraege if reg[e["befehl"]].get("handlung") == h]
                if name == "dropdown:Bearbeiten" and h != "ausblenden":
                    assert len(varianten) == 1, (zustand, name, h, [e["befehl"] for e in varianten])
                if name == "auge" and h == "ausblenden":
                    assert len(varianten) == 1, (zustand, name, h, [e["befehl"] for e in varianten])
                assert len(varianten) <= 1, (zustand, name, h, [e["befehl"] for e in varianten])
                for e in varianten:
                    assert reg[e["befehl"]]["bezug"] == bezug, (zustand, name, e["befehl"])
        d = f["duplizieren"]
        assert d is not None and d["menue"] == "dropdown:Bearbeiten", d
        assert d["protokoll_neu"] == [protokoll], (zustand, d)
