"""AK-3, AK-4: Requirement „Kontextmenü aus dem Befehlsregister“ (geändert)."""

# ruff: noqa: E501

from __future__ import annotations

import json

from menue_helpers import (
    BEZUG_PASST,
    INVENTAR,
    MAX_AKTIONEN,
    MAX_GRUPPE,
    MAX_HOEHE_PX,
    MAX_SICHTBAR,
    P,
    ist_fester_ort,
    kontext_arten,
    mehr_befehle,
    mit_wirkung,
    p95,
    pruefen,
    register,
    register_nach_id,
    sichtbar_befehle,
)


def test_kurz_und_gleich_in_struktur_und_modell():
    """Scenario „Kurz und gleich in Struktur und Modell“: je Auswahlart identische Ebenen in beiden Zonen, ≤ 8
    Befehlseinträge, 0 Überschriften, „Mehr …“ genau 1-mal bei > 8 Kandidaten, Gruppen in „Mehr …“ ≤ 12, jeder Eintrag
    ein Befehl mit Wirkung und passendem `bezug`."""
    wirkend = mit_wirkung()
    for a in kontext_arten():
        s, m = a["struktur"], a["modell"]
        assert (s["sichtbar"], s["mehr_gruppen"], s["mehr"]) == (
            m["sichtbar"],
            m["mehr_gruppen"],
            m["mehr"],
        ), a["art"]
        assert s["sichtbar"], f"{a['art']}: leere sichtbare Ebene"
        assert len(s["sichtbar"]) <= MAX_SICHTBAR, (a["art"], len(s["sichtbar"]))
        assert s["ueberschriften"] == 0, (a["art"], s["ueberschriften"])
        kandidaten = len(s["kandidaten_nach_rang"])
        assert s["mehr_eintraege"] == (1 if kandidaten > MAX_SICHTBAR else 0), (
            a["art"],
            kandidaten,
            s["mehr_eintraege"],
        )
        assert s["mehr"] is (kandidaten > MAX_SICHTBAR), (a["art"], kandidaten)
        for g in s["mehr_gruppen"]:
            assert 1 <= len(g["eintraege"]) <= MAX_GRUPPE, (a["art"], g["name"], len(g["eintraege"]))
        for befehl in sichtbar_befehle(s) + mehr_befehle(s):
            assert befehl in wirkend, (a["art"], befehl, "kein Befehl mit Wirkung")
            assert wirkend[befehl]["bezug"] in BEZUG_PASST[a["art"]], (
                a["art"],
                befehl,
                wirkend[befehl]["bezug"],
            )
        familien = {b["id"]: b["familie"] for b in register()}
        assert all(e["familie"] == familien[e["befehl"]] for e in s["sichtbar"]), a["art"]


def test_die_ersten_nach_rang_sind_sichtbar():
    """Scenario „Die ersten nach Rang sind sichtbar“: sichtbare Ebene = erste min(8, n) Kandidaten nach `rang`,
    „Mehr …“ = die übrigen; kein Kandidat fehlt oder steht doppelt."""
    reg = register_nach_id()
    for a in kontext_arten():
        for zone in ("struktur", "modell"):
            m = a[zone]
            k = m["kandidaten_nach_rang"]
            assert len(k) == len(set(k)), (a["art"], "Kandidat doppelt")
            raenge = [reg[b]["rang"] for b in k]
            assert raenge == sorted(raenge), (a["art"], "kandidaten_nach_rang nicht nach rang geordnet")
            n = min(MAX_SICHTBAR, len(k))
            assert set(sichtbar_befehle(m)) == set(k[:n]), (a["art"], zone, sichtbar_befehle(m), k[:n])
            assert sorted(mehr_befehle(m)) == sorted(k[n:]), (a["art"], zone)
            assert len(sichtbar_befehle(m)) + len(mehr_befehle(m)) == len(k), (a["art"], zone)
            # kein Kandidat fehlt: alle Befehle mit Wirkung, passendem Bezug und ohne festen Ort sind darin (bezug-keine nur mit kontext)
            erlaubt = {
                b["id"]
                for b in register()
                if not b.get("folgt")
                and not ist_fester_ort(b)
                and (b["bezug"] in BEZUG_PASST[a["art"]] and (b["bezug"] != "keine" or b.get("kontext")))
            }
            assert set(k) <= erlaubt, (a["art"], sorted(set(k) - erlaubt))


def test_befehle_mit_festem_ort_nicht_im_kontextmenue():
    """Scenario „Befehle mit festem Ort stehen nicht im Kontextmenü“: in den Zuständen halter, auswahl, aktiv und
    ausgeblendet kein Befehl der Familien Ansicht oder Fenster, kein Rückgängig/Wiederholen; jeder bleibt in der
    Suche erreichbar und hat einen Ort."""
    reg = register_nach_id()
    for zustand in ("halter", "auswahl", "aktiv", "ausgeblendet"):
        for a in kontext_arten(zustand):
            for zone in ("struktur", "modell"):
                m = a[zone]
                alle = (
                    sichtbar_befehle(m) + mehr_befehle(m) + m["kontextaktionen"] + m["kandidaten_nach_rang"]
                )
                fest = [b for b in alle if ist_fester_ort(reg[b])]
                assert fest == [], (zustand, a["art"], zone, fest)
    fest_mit_wirkung = [b["id"] for b in register() if ist_fester_ort(b) and not b.get("folgt")]
    assert fest_mit_wirkung, "kein Befehl mit festem Ort im Register"
    sicht = pruefen("sichtbarkeit-befehle")["taskleisten"]
    modellieren = next(t for t in sicht if t["name"] == "Modellieren")
    stehen = {
        e["befehl"] for e in modellieren["ansichtsleiste"] + modellieren["ansichtsleiste_aufklappmenue"]
    }
    stehen |= {
        e["befehl"] for d in modellieren["dropdowns"] for u in d["untergruppen"] for e in u["eintraege"]
    }
    stehen |= {k["befehl"] for k in pruefen("doppelt")["faelle"][0]["knoepfe"]}
    fehlt = [b for b in fest_mit_wirkung if b not in stehen]
    assert fehlt == [], f"Befehle mit festem Ort ohne Ort in Menüleiste oder Ansichtsleiste: {fehlt}"
    inv = pruefen(
        "inventar",
        "--datei",
        str(INVENTAR),
        frisch=True,
    )
    nach_id = {b["id"]: b for b in inv["befehle"]}
    for b in fest_mit_wirkung:
        if b in nach_id:
            assert nach_id[b]["suche_findet"] is True, b


def test_register_erzeugt_menues_nicht_von_hand():
    """Scenario „Erzeugt, nicht von Hand“: neuer Befehl (Bearbeiten, `bezug: element`, `rang: 0`) ist erster Eintrag
    des Kontextmenüs und erste Kontextaktion, im Dropdown und in der Suche; mit `folgt: true` nur in der Suchgruppe
    „Folgt später“."""
    basis = register()
    probe = {
        "id": "test.probe",
        "familie": "Bearbeiten",
        "titel": "Testbefehl Probe",
        "parameter": [],
        "bezug": "element",
        "rang": 0,
        "wesentlich": True,
    }
    datei = P / "dist" / "register-probe.json"
    try:
        datei.write_text(json.dumps([*basis, probe]), "utf-8")
        wirkt = pruefen("registerprobe", "--register", datei.name, "--suche", "Probe", frisch=True)
        datei.write_text(json.dumps([*basis, {**probe, "folgt": True}]), "utf-8")
        folgt = pruefen("registerprobe", "--register", datei.name, "--suche", "Probe", frisch=True)
    finally:
        datei.unlink(missing_ok=True)
    assert wirkt["kontextmenue_element_sichtbar"][0]["befehl"] == "test.probe", wirkt[
        "kontextmenue_element_sichtbar"
    ]
    assert wirkt["kontextaktionen_element"][0] == "test.probe", wirkt["kontextaktionen_element"]
    assert "test.probe" in [e["befehl"] for e in wirkt["dropdown_bearbeiten"]]
    assert "test.probe" in [t["befehl"] for t in wirkt["suche_treffer"]]
    assert folgt["kontextmenue_element_sichtbar"] and "test.probe" not in [
        e["befehl"] for e in folgt["kontextmenue_element_sichtbar"]
    ]
    assert "test.probe" not in [e["befehl"] for e in folgt["kontextmenue_element_mehr"]]
    assert "test.probe" not in folgt["kontextaktionen_element"]
    assert "test.probe" not in [e["befehl"] for e in folgt["dropdown_bearbeiten"]]
    treffer = [t for t in folgt["suche_treffer"] if t["befehl"] == "test.probe"]
    assert len(treffer) == 1 and treffer[0]["folgt"] is True and treffer[0]["gruppe"] == "Folgt später", (
        treffer
    )


def test_kontextaktionen_sind_der_anfang_des_menues():
    """Scenario „Kontextaktionen sind der Anfang des Menüs“: ≤ 5, gleich den ersten Kandidaten nach `rang`, alle in der
    sichtbaren Ebene."""
    m = pruefen("kontextmenue")["kontextaktionen_auswahl"]
    aktionen = m["kontextaktionen"]
    assert 1 <= len(aktionen) <= MAX_AKTIONEN, aktionen
    assert aktionen == m["kandidaten_nach_rang"][: len(aktionen)], (aktionen, m["kandidaten_nach_rang"][:6])
    assert len(aktionen) == min(MAX_AKTIONEN, len(m["kandidaten_nach_rang"])), aktionen
    assert set(aktionen) <= set(sichtbar_befehle(m)), (aktionen, sichtbar_befehle(m))


def test_mehr_per_klick_und_tastatur_esc_schliesst_eine_ebene():
    """Scenario „Mehr … per Klick und Tastatur, Esc schließt eine Ebene“: beide Wege öffnen die zweite Ebene ohne
    Überfahren; erster Esc schließt nur sie (Fokus auf „Mehr …“), zweiter das Kontextmenü."""
    wege = pruefen("tastatur")["mehr"]["wege"]
    assert [w["weg"] for w in wege] == ["klick", "tastatur"], [w["weg"] for w in wege]
    for w in wege:
        assert w["zweite_ebene_offen"] is True and w["ohne_ueberfahren"] is True, w
        e1, e2 = w["nach_esc1"], w["nach_esc2"]
        assert (
            e1["zweite_ebene_offen"] is False
            and e1["kontextmenue_offen"] is True
            and e1["fokus_auf_mehr"] is True
        ), w
        assert e2["kontextmenue_offen"] is False, w


def test_kurz_in_der_hoehe_und_schnell():
    """Scenario „Kurz in der Höhe und schnell“: sichtbare Ebene je Auswahlart ≤ 360 px (1440 × 900); p95 aus
    mindestens 20 Rechtsklicks < 100 ms (vom Test aus den Rohwerten gerechnet)."""
    for a in kontext_arten():
        for zone in ("struktur", "modell"):
            h = a[zone]["hoehe_px"]
            assert 0 < h <= MAX_HOEHE_PX, (a["art"], zone, h)
    roh = pruefen("messen")["kontextmenue"]["roh_ms"]
    assert len(roh) >= 20, len(roh)
    assert all(isinstance(x, (int, float)) and x >= 0 for x in roh)
    assert p95(roh) < 100, p95(roh)


def test_pilotablaeufe_bleiben_loesbar():
    """Scenario „Pilotabläufe bleiben lösbar“: alle 8 Aufgaben E–L erreichen den Sollzustand (Aufgabe G: Volumen
    57,49 cm³ ± 0,1 %); geprüft mit den Zusicherungen von ap-41b."""
    import test_gl_pilot as pilot

    for name in "efghijkl":
        getattr(pilot, f"test_ablauf_{name}")()
