"""AK-6, AK-7, AK-8: Kernabläufe A–C, Entwürfe, simulierter KI-Ablauf."""

from __future__ import annotations

import json

from ux_helpers import ablauf, finde, mm, param, register

SKIZZE = ("sketch", "skizze")
EXTRUSION = ("extru",)
VERRUNDUNG = ("fillet", "verrund")
SCHALE = ("shell", "schale")


def _wert(element: dict, *namen: str) -> float:
    return mm(param(element, *namen))


def test_ablauf_a_grundplatte():
    """Skizze 80 × 50 mm auf XY, Extrusion 5 mm, Letzte Aktion zeigt „5 mm“."""
    e = ablauf("a")
    assert e["soll_erreicht"] is True
    skizze = finde(e["modell"], *SKIZZE)[-1]
    assert {_wert(skizze, "laenge", "length"), _wert(skizze, "breite", "width")} == {80.0, 50.0}
    assert "XY" in json.dumps(skizze).upper()
    assert _wert(finde(e["modell"], *EXTRUSION)[-1], "tiefe", "depth") == 5.0
    assert "5 mm" in e["letzte_aktion"]


def test_ablauf_a_rueckgaengig():
    """Strg+Z nimmt die Extrusion zurück, die Skizze bleibt; Strg+Umschalt+Z stellt den Stand wieder her."""
    e = ablauf("a", "rueckgaengig")
    assert not finde(e["modell_zurueck"], *EXTRUSION)
    assert finde(e["modell_zurueck"], *SKIZZE)
    assert e["modell_wiederholt"] == e["modell"]


def test_ablauf_b_dicker_und_gerundet():
    """Tiefe 8 mm; Verrundung Radius 3 mm an genau 4 Kanten."""
    e = ablauf("b")
    assert e["soll_erreicht"] is True
    assert _wert(finde(e["modell"], *EXTRUSION)[-1], "tiefe", "depth") == 8.0
    v = finde(e["modell"], *VERRUNDUNG)[-1]
    assert _wert(v, "radius") == 3.0
    assert len(param(v, "kanten", "edges", "refs", "targets")) == 4


def test_ablauf_b_befund_statt_abbruch():
    """Radius 30 mm: fehlerhaft (Farbe, Symbol, Wort), Korrektur 24 mm, Extrusion bleibt bedienbar."""
    e = ablauf("b", "befund")
    status = e["status_verrundung"]
    assert status["wort"] and status["symbol"] and status["farbe"]
    assert "24 mm" in e["korrektur_text"]
    assert e["extrusion_auswaehlbar"] is True and e["extrusion_tiefe_nach_aenderung_mm"] == 9.0
    assert _wert(finde(e["modell"], *VERRUNDUNG)[-1], "radius") == 24.0
    assert e["befunde_nach_korrektur"] == 0


def test_ablauf_c_baugruppe():
    """Baugruppe mit Gehäuse und Deckel, Verbindung Fest Unterseite/Oberkante, Deckel-Unterseite auf 30 mm."""
    e = ablauf("c")
    assert e["soll_erreicht"] is True
    baugruppe = finde(e["modell"], "assembly", "baugruppe")[-1]
    assert len(finde(baugruppe, "instance", "instanz")) == 2
    text = json.dumps(finde(e["modell"], "connection", "verbindung")[-1])
    assert "Fest" in text or "fest" in text
    assert "Unterseite" in text and "Oberkante" in text
    assert abs(e["deckel_unterseite_mm"] - 30.0) <= 0.01


def test_ablauf_d_entwurf_uebernehmen():
    """Entwurf „Dickere Platte“ 10 mm: Vergleich 5 → 10, Hauptstand erst danach 10, Zustand „Übernommen“."""
    e = ablauf("d")
    assert e["soll_erreicht"] is True
    assert e["vergleich"] == {"vorher": "5 mm", "nachher": "10 mm"}
    assert e["haupt_tiefe_vor_uebernehmen_mm"] == 5.0
    assert e["haupt_tiefe_nach_uebernehmen_mm"] == 10.0
    assert e["entwurf_zustand"] in ("Übernommen", "entwurf.uebernommen")


def test_ablauf_d_verwerfen_braucht_begruendung_und_loescht_nicht():
    """Ohne Begründung nicht auslösbar; danach nur in „Alle Entwürfe“ mit „zu schwer“; Anzahl unverändert."""
    e = ablauf("d", "verwerfen")
    assert e["verwerfen_ohne_begruendung_moeglich"] is False
    assert e["in_ergebnis"] is False and e["in_alle_entwuerfe"] is True
    assert e["begruendung_angezeigt"] == "zu schwer"
    assert e["entwuerfe_vorher"] == e["entwuerfe_nachher"]


ABSICHT = "Mach daraus ein Kästchen mit 2 mm Wand"


def test_ki_drei_wege_dieselbe_absicht():
    """„Fragen“, „KI fragen“, Suche: gleiche Karte mit feature.schale 2 mm; Modell vorher unverändert."""
    e = ablauf("f", "drei-wege")
    assert [w["weg"] for w in e["wege"]] == ["fragen", "ki-fragen", "suche"]
    for w in e["wege"]:
        assert w["befehlszeilen"] == [w["befehlszeilen"][0]]
        assert w["befehlszeilen"][0].startswith("feature.schale") and "2 mm" in w["befehlszeilen"][0]
        assert w["modell_unveraendert"] is True


def test_ki_unbekannter_satz_und_keine_auswahl():
    """Erklärung mit drei Beispielsätzen, 0 modale Dialoge, Modell unverändert."""
    e = ablauf("f", "unbekannt")
    for fall in (e["ohne_auswahl"], e["unbekannter_satz"]):
        assert len(fall["beispielsaetze"]) == 3
        assert fall["modale_dialoge"] == 0 and fall["modell_unveraendert"] is True


def test_ki_drei_vorbereitete_absichten():
    """Schale 2 mm, Verrunden 1 mm, Wert setzen Länge 80 → 100 mm; IDs im Register; je zwei Hauptaktionen."""
    e = ablauf("f", "absichten")
    ids = {b["id"] for b in register()}
    karten = e["karten"]
    assert [k["befehl"] for k in karten] == ["feature.schale", "feature.verrunden", "element.wert-setzen"]
    assert [k["wert"] for k in karten][:2] == ["2 mm", "1 mm"]
    assert (karten[2]["vorher"], karten[2]["nachher"]) == ("80 mm", "100 mm")
    for k in karten:
        assert k["befehl"] in ids and k["hauptaktionen"] == 2


def test_ablauf_f_uebernehmen_nachjustieren_rueckgaengig():
    """Schale 3 mm, Protokoll mit quelle ki, höchstens zweimal Strg+Z bis vor den Vorschlag."""
    e = ablauf("f")
    assert e["soll_erreicht"] is True
    assert _wert(finde(e["modell"], *SCHALE)[-1], "wandstaerke", "wall", "dicke") == 3.0
    assert any(p["befehl"] == "feature.schale" and p["quelle"] == "ki" for p in e["protokoll"])
    assert e["rueckgaengig_bis_vorher"] <= 2


def test_ki_verwerfen_und_anhalten_aendern_nichts():
    """Verwerfen und Anhalten: Modell gleich dem Stand davor; nach dem Anhalten keine Karte."""
    e = ablauf("f", "verwerfen")
    assert e["verwerfen_modell_gleich"] is True
    assert e["anhalten_modell_gleich"] is True and e["karte_nach_anhalten"] is False
