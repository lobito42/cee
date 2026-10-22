"""AK-15: Aufgaben A bis E im neuen Bedienkonzept (Requirement „Aufgaben A bis E im neuen Bedienkonzept“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import re

from ux2_helpers import (
    ablauf,
    finde,
    groessen,
    knoten,
    mm,
    nach_name,
    nahe,
    volumen,
    zeile,
)


def _alle_zahlen(element: dict) -> list[float]:
    """Längen in mm aus `params` und `content` eines Elements, auch verschachtelt."""
    return groessen(element) + groessen({"params": element.get("content") or {}})


def _texte(element: dict) -> list[str]:
    return [v for k in knoten(element) for v in k.values() if isinstance(v, str)]


def test_aufgabe_a_neue_grundplatte():
    """Skizze (Rechteck 80 × 50 mm auf XY) und Extrusion 8 mm; Skizze ist Unterzeile der Extrusion, Extrusion gewählt."""
    a = ablauf("a")
    assert a["eingaben"] > 0
    skizzen, extrusionen = finde(a["modell"], "skizze"), finde(a["modell"], "extru")
    assert len(skizzen) == 1 and len(extrusionen) == 1, (len(skizzen), len(extrusionen))
    skizze, extrusion = skizzen[0], extrusionen[0]
    zahlen = _alle_zahlen(skizze)
    assert 80.0 in zahlen and 50.0 in zahlen, zahlen
    assert any(t.upper() == "XY" or t.upper().endswith(".XY") for t in _texte(skizze)), _texte(skizze)
    assert finde(skizze, "rechteck") or any("rechteck" in t.lower() for t in _texte(skizze))
    assert 8.0 in groessen(extrusion), groessen(extrusion)
    # Aufbau: Skizze direkt unter der Extrusion, eingerückt
    namen = [z["schritt"] for z in a["aufbau"]]
    ie, isk = namen.index(extrusion["id"]), namen.index(skizze["id"])
    assert isk > ie and a["aufbau"][isk]["ebene"] == a["aufbau"][ie]["ebene"] + 1, a["aufbau"]
    assert a["auswahl"] == [extrusion["id"]]
    assert sorted(a["teil"]["abmessungen_mm"]) == [8.0, 50.0, 80.0], a["teil"]


def _kanten_der(verrundung: dict) -> list:
    """Alle Kantenverweise einer Verrundung (Liste unter einem Schlüssel mit „kante“)."""
    for k in knoten(verrundung):
        for name, wert in k.items():
            if "kante" in name.lower() and isinstance(wert, list):
                return wert
    return []


def test_aufgabe_b_steg_aendern_und_verrunden():
    """Steg 40 mm, Verrundung R 3 mm an genau 2 Kanten, Volumen 55,25 cm³ (± 0,1 %)."""
    b = ablauf("b")
    assert 40.0 in groessen(nach_name(b["modell"], "Steg"))
    verrundungen = finde(b["modell"], "verrund")
    assert len(verrundungen) == 1, verrundungen
    assert 3.0 in groessen(verrundungen[0])
    assert len(_kanten_der(verrundungen[0])) == 2, verrundungen[0]
    assert nahe(b["teil"]["volumen_mm3"], volumen(h=40.0, verrundungen=((2, 3.0, 60.0),)))
    assert nahe(b["teil"]["volumen_mm3"], 55250.0, 0.002)


def test_aufgabe_b_befund_und_korrektur():
    """Zustand `befund`: Verrundung „fehlerhaft“ (Wort, Symbol, Farbe) in Aufbau und Modell; Grundplatte 9 mm trotzdem möglich; Korrektur → R 5 mm, Befund weg."""
    b = ablauf("b", "befund")
    status = zeile(b["aufbau"], "Verrundung")["status"]
    assert (
        status
        and status["wort"].lower() == "fehlerhaft"
        and status["symbol"]
        and re.fullmatch(r"#[0-9A-Fa-f]{6}", status["farbe"])
    ), status
    modell_status = [s for s in b["modell_status"] if s["wort"].lower() == "fehlerhaft"]
    assert len(modell_status) == 1 and modell_status[0]["symbol"], b["modell_status"]
    assert 9.0 in groessen(nach_name(b["modell_nach_9mm"], "Grundplatte")), (
        "Grundplatte lässt sich nicht auf 9 mm setzen"
    )
    assert b["teil_nach_9mm"]["volumen_mm3"] > 0
    assert "Radius auf 5 mm setzen" in b["korrektur_text"], b["korrektur_text"]
    assert b["befunde_nach_korrektur"] == []
    assert 5.0 in groessen(nach_name(b["modell"], "Verrundung"))


def test_aufgabe_c_baugruppe():
    """Baugruppe mit zwei Instanzen, Verbindung „Fest“ Unterseite ↔ Oberkante; Deckel-Unterseite auf 30 mm (± 0,01)."""
    c = ablauf("c")
    assert len(finde(c["modell"], "baugruppe")) == 1
    instanzen = finde(c["modell"], "instanz")
    assert len(instanzen) == 2, [i["type"] for i in instanzen]
    verbindungen = finde(c["modell"], "verbindung")
    assert len(verbindungen) == 1, verbindungen
    texte = [t.lower() for t in _texte(verbindungen[0])]
    assert any("fest" in t for t in texte), texte
    assert any("unterseite" in t for t in texte) and any("oberkante" in t for t in texte), texte
    deckel = [i for i in instanzen if any("deckel" in t.lower() for t in _texte(i))]
    assert len(deckel) == 1
    position = (deckel[0].get("params") or {}).get("position")
    assert isinstance(position, dict) and "z" in position, deckel[0]
    assert abs(mm(position["z"]) - 30.0) <= 0.01, position


def test_aufgabe_d_entwurf_uebernehmen():
    """Entwurf „Dickere Platte“: Vergleich 8 mm → 10 mm, Hauptstand 8 mm vor und 10 mm nach dem Übernehmen, Entwurf „Übernommen“."""
    d = ablauf("d")
    dicke = [v for v in d["vergleich"] if v["feld"] == "Dicke"]
    assert len(dicke) == 1 and "8" in dicke[0]["vorher"] and "10" in dicke[0]["nachher"], d["vergleich"]
    assert 8.0 in groessen(nach_name(d["haupt_modell_vor_uebernehmen"], "Grundplatte"))
    nachher = groessen(nach_name(d["haupt_modell_nach_uebernehmen"], "Grundplatte"))
    assert 10.0 in nachher and 8.0 not in nachher, nachher
    assert d["entwurf_zustand"].strip() == "Übernommen"


def test_aufgabe_d_verwerfen_mit_begruendung():
    """Verwerfen ohne Begründung nicht auslösbar; danach fehlt der Entwurf in „Ergebnis“ und steht mit „zu schwer“ in „Alle Entwürfe“."""
    d = ablauf("d", "verwerfen")
    knopf = d["verwerfen_knopf_ohne_begruendung"]
    assert knopf["disabled"] or knopf["aria_disabled"] == "true", knopf
    assert d["modell_nach_versuch_ohne_begruendung"] == d["modell_vorher"]
    assert d["verworfen_name"] not in d["ansicht_ergebnis"], d["ansicht_ergebnis"]
    eintrag = [e for e in d["ansicht_alle_entwuerfe"] if e["name"] == d["verworfen_name"]]
    assert len(eintrag) == 1 and "zu schwer" in eintrag[0]["begruendung"], d["ansicht_alle_entwuerfe"]
    assert len(finde(d["modell_nachher"], "entwurf")) == len(finde(d["modell_vorher"], "entwurf"))


def test_aufgabe_e_kuerzel_finden():
    """Rückgängig zeigt in der Kopfzeile sein Kürzel; die Suche „zurück“ liefert es unter den ersten 3 Treffern."""
    e = ablauf("e")
    kopf = [k for k in e["kopf_rueckgaengig"] if k["befehl"] == "bearbeiten.rueckgaengig"]
    assert len(kopf) == 1 and re.search(r"(?:Strg\s*\+?\s*Z|⌘\s*Z)", kopf[0]["text"]), kopf
    treffer = e["suche_zurueck"]["treffer"]
    reihenfolge = [t["befehl"] for t in treffer]
    assert "bearbeiten.rueckgaengig" in reihenfolge[:3], reihenfolge
    t = treffer[reihenfolge.index("bearbeiten.rueckgaengig")]
    kuerzel = re.sub(r"\s+", "", t["kuerzel_text"])
    assert kuerzel and kuerzel in re.sub(r"\s+", "", kopf[0]["text"]), (t, kopf[0])
