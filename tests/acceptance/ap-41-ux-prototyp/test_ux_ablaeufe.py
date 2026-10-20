"""AK-6, AK-7, AK-8: Kernabläufe A–C, Entwürfe, simulierter KI-Ablauf.

Alle Urteile fällt der Test aus rohen Modell-Schnappschüssen (`==`), nicht das Prüfwerkzeug.
"""

from __future__ import annotations

from ux_helpers import (
    ablauf,
    bezogene,
    finde,
    im_teil,
    mm,
    name_von,
    param,
    register,
    text_mit_referenzen,
)

SKIZZE = ("sketch", "skizze")
EXTRUSION = ("extrusion", "extrude", "extru")
VERRUNDUNG = ("fillet", "verrundung", "verrund")
SCHALE = ("shell", "schale")
ENTWURF = ("draft", "entwurf")


def _wert(element: dict, *namen: str) -> float:
    return mm(param(element, *namen))


def _tiefe(modell, teilname: str = "Platte") -> float:
    return _wert(im_teil(modell, teilname, *EXTRUSION)[0], "tiefe", "depth")


def _entwuerfe(modell) -> list[dict]:
    return finde(modell, *ENTWURF)


def test_ablauf_a_grundplatte():
    """Skizze 80 × 50 mm auf XY, Extrusion 5 mm, Letzte Aktion zeigt „5 mm“ (nur Klicks und Tasten)."""
    e = ablauf("a")
    assert e["eingaben"] > 0
    skizze = im_teil(e["modell"], "Teil 1", *SKIZZE)[0]
    assert {_wert(skizze, "laenge", "length"), _wert(skizze, "breite", "width")} == {80.0, 50.0}
    assert "XY" in text_mit_referenzen(e["modell"], skizze).upper()
    assert _tiefe(e["modell"], "Teil 1") == 5.0
    assert "5 mm" in e["letzte_aktion"]


def test_ablauf_a_rueckgaengig():
    """Strg+Z nimmt die Extrusion zurück, die Skizze bleibt; Strg+Umschalt+Z stellt den Stand wieder her."""
    e = ablauf("a", "rueckgaengig")
    assert e["eingaben"] > 0
    assert len(im_teil(e["modell"], "Teil 1", *EXTRUSION)) == 1
    assert im_teil(e["modell_zurueck"], "Teil 1", *EXTRUSION, erwartet=0) == []
    assert len(im_teil(e["modell_zurueck"], "Teil 1", *SKIZZE)) == 1
    assert e["modell_wiederholt"] == e["modell"]


def test_ablauf_b_dicker_und_gerundet():
    """Tiefe 8 mm; Verrundung Radius 3 mm an genau 4 Kanten."""
    e = ablauf("b")
    assert e["eingaben"] > 0
    assert _tiefe(e["modell"]) == 8.0
    v = im_teil(e["modell"], "Platte", *VERRUNDUNG)[0]
    assert _wert(v, "radius") == 3.0
    assert len(param(v, "kanten", "edges", "refs", "targets")) == 4


def test_ablauf_b_befund_statt_abbruch():
    """Radius 30 mm: fehlerhaft (Farbe, Symbol, Wort), Korrektur 24 mm, Extrusion bleibt bedienbar."""
    e = ablauf("b", "befund")
    assert e["eingaben"] > 0
    status = e["status_verrundung"]
    assert status["wort"].strip() and status["symbol"].strip() and status["farbe"].strip()
    assert "24 mm" in e["korrektur_text"]
    assert e["befunde_vor_korrektur"], "Befund fehlt vor der Korrektur"
    # Extrusion bleibt auswählbar und änderbar, obwohl die Verrundung fehlerhaft ist
    mit_befund = e["modell_mit_befund"]
    assert _wert(im_teil(mit_befund, "Platte", *VERRUNDUNG)[0], "radius") == 30.0
    extrusion = im_teil(mit_befund, "Platte", *EXTRUSION)[0]
    assert _wert(extrusion, "tiefe", "depth") == 9.0
    assert e["auswahl_nach_klick_auf_extrusion"] == [extrusion["id"]]
    assert _wert(im_teil(e["modell"], "Platte", *VERRUNDUNG)[0], "radius") == 24.0
    assert e["befunde_nach_korrektur"] == []


def test_ablauf_c_baugruppe():
    """Baugruppe mit Gehäuse und Deckel, Verbindung Fest Unterseite/Oberkante, Deckel-Unterseite auf 30 mm."""
    e = ablauf("c")
    assert e["eingaben"] > 0
    modell = e["modell"]
    baugruppen = finde(modell, "assembly", "baugruppe")
    assert len(baugruppen) == 1
    inhalt = bezogene(modell, baugruppen[0])
    instanzen = {
        k["id"]: k
        for k in inhalt
        if any(t in str(k.get("type", "")).lower() for t in ("instance", "instanz"))
    }
    assert len(instanzen) == 2
    texte = {iid: text_mit_referenzen(modell, k) for iid, k in instanzen.items()}
    deckel = [k for iid, k in instanzen.items() if "Deckel" in texte[iid]]
    gehaeuse = [k for iid, k in instanzen.items() if "Gehäuse" in texte[iid]]
    assert len(deckel) == 1 and len(gehaeuse) == 1 and deckel[0] is not gehaeuse[0]
    verbindungen = [
        k for k in inhalt if any(t in str(k.get("type", "")).lower() for t in ("connection", "verbindung"))
    ]
    assert len(verbindungen) == 1
    text = text_mit_referenzen(modell, verbindungen[0])
    assert "fest" in text.lower()
    assert "Unterseite" in text and "Oberkante" in text
    assert abs(mm(param(deckel[0], "position")["z"]) - 30.0) <= 0.01


def test_ablauf_d_entwurf_uebernehmen():
    """Entwurf „Dickere Platte“ 10 mm: Vergleich 5 → 10, Hauptstand erst danach 10, Zustand „Übernommen“."""
    e = ablauf("d")
    assert e["eingaben"] > 0
    assert e["vergleich"] == {"vorher": "5 mm", "nachher": "10 mm"}
    assert _tiefe(e["entwurf_modell"]) == 10.0
    assert _tiefe(e["haupt_modell_vor_uebernehmen"]) == 5.0
    assert _tiefe(e["haupt_modell_nach_uebernehmen"]) == 10.0
    assert e["entwurf_zustand"] in ("Übernommen", "entwurf.uebernommen")


def test_ablauf_d_verwerfen_braucht_begruendung_und_loescht_nicht():
    """Ohne Begründung nicht auslösbar; danach nur in „Alle Entwürfe“ mit „zu schwer“; Anzahl unverändert."""
    e = ablauf("d", "verwerfen")
    assert e["eingaben"] > 0
    assert e["verwerfen_ausloesbar_ohne_begruendung"]["disabled"] is True
    vorher = _entwuerfe(e["modell_vorher"])
    assert vorher, "kein Entwurf im Modell"
    assert e["modell_nach_versuch_ohne_begruendung"] == e["modell_vorher"]
    assert len(_entwuerfe(e["modell_nachher"])) == len(vorher)
    name = e["verworfen_name"]
    assert name and name not in e["ansicht_ergebnis"]
    assert {"name": name, "begruendung": "zu schwer"} in [
        {"name": a["name"], "begruendung": a["begruendung"]} for a in e["ansicht_alle_entwuerfe"]
    ]
    assert name in [name_von(k) for k in _entwuerfe(e["modell_nachher"])]


ABSICHT = "Mach daraus ein Kästchen mit 2 mm Wand"


def test_ki_drei_wege_dieselbe_absicht():
    """„Fragen“, „KI fragen“, Suche: gleiche Karte mit feature.schale 2 mm; Modell vorher unverändert."""
    e = ablauf("f", "drei-wege")
    assert e["eingaben"] > 0
    assert [w["weg"] for w in e["wege"]] == ["fragen", "ki-fragen", "suche"]
    assert len({w["befehlszeilen"][0] for w in e["wege"]}) == 1
    for w in e["wege"]:
        assert len(w["befehlszeilen"]) == 1
        assert w["befehlszeilen"][0].startswith("feature.schale") and "2 mm" in w["befehlszeilen"][0]
        assert w["modell_bei_karte"] == w["modell_vorher"]


def test_ki_unbekannter_satz_und_keine_auswahl():
    """Erklärung mit drei Beispielsätzen, 0 modale Dialoge, Modell unverändert."""
    e = ablauf("f", "unbekannt")
    assert e["eingaben"] > 0
    for fall in (e["ohne_auswahl"], e["unbekannter_satz"]):
        assert len(fall["beispielsaetze"]) == 3 and all(s.strip() for s in fall["beispielsaetze"])
        assert fall["modale_dialoge"] == []
        assert fall["modell_nachher"] == fall["modell_vorher"]


def test_ki_drei_vorbereitete_absichten():
    """Schale 2 mm, Verrunden 1 mm, Wert setzen Länge 80 → 100 mm; IDs im Register; je zwei Hauptaktionen."""
    e = ablauf("f", "absichten")
    ids = {b["id"] for b in register()}
    karten = e["karten"]
    assert [k["befehl"] for k in karten] == ["feature.schale", "feature.verrunden", "element.wert-setzen"]
    assert [k["wert"] for k in karten][:2] == ["2 mm", "1 mm"]
    assert (karten[2]["vorher"], karten[2]["nachher"]) == ("80 mm", "100 mm")
    for k in karten:
        assert k["befehl"] in ids
        assert sorted(k["hauptaktionen"]) == ["vorschlag.uebernehmen", "vorschlag.verwerfen"]


def test_ablauf_f_uebernehmen_nachjustieren_rueckgaengig():
    """Schale 3 mm, Protokoll mit quelle ki, höchstens zweimal Strg+Z bis vor den Vorschlag."""
    e = ablauf("f")
    assert e["eingaben"] > 0
    schale = im_teil(e["modell"], "Platte", *SCHALE)[0]
    assert _wert(schale, "wandstaerke", "wall", "dicke") == 3.0
    assert any(p["befehl"] == "feature.schale" and p["quelle"] == "ki" for p in e["protokoll"])
    assert e["modell_vorher"] != e["modell"]
    schritte = e["undo_schritte"]
    assert len(schritte) >= 2
    assert any(s == e["modell_vorher"] for s in schritte[:2]), (
        "nach höchstens 2 × Strg+Z nicht der Stand vorher"
    )


def test_ki_verwerfen_und_anhalten_aendern_nichts():
    """Verwerfen und Anhalten: Modell gleich dem Stand davor; nach dem Anhalten keine Karte."""
    e = ablauf("f", "verwerfen")
    assert e["eingaben"] > 0
    assert finde(e["modell_vorher"], "part"), "Schnappschuss leer"
    assert e["modell_nach_verwerfen"] == e["modell_vorher"]
    assert e["modell_nach_anhalten"] == e["modell_vorher"]
    assert e["karten_nach_verwerfen"] == []
    assert e["karten_nach_anhalten"] == []
