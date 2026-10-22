"""AK-13, AK-14: KI im selben Feld, Beispielpaket Simulation (Requirements „KI im selben Feld“, „Erweiterung …“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import re

import pytest
from ux2_helpers import ZUSTAENDE, ablauf, groessen, nach_name, nahe, pruefen, zahl, zeile

# design.md, „Komplexitätsbudget“: Overlays außerhalb der fünf Zonen (Wert von `data-overlay`)
ERLAUBTE_OVERLAYS = {"suchliste", "kontextaktionen", "zahl-am-zeiger", "legende"}
HAUPTAKTIONEN = ["vorschlag.uebernehmen"]  # Verwerfen ist ruhig, ohne data-hauptaktion (PR #47)


def _gleich(a: dict, b: dict, tol: float = 2.0) -> bool:
    return all(abs(a[k] - b[k]) <= tol for k in ("x", "y", "breite", "hoehe"))


def test_befehl_oder_wunsch():
    """„Kanten“ führt `darstellung.kanten` aus ohne Gespräch; der Wunsch öffnet das Gespräch an der Stelle des Inspektors."""
    ki = pruefen("ki")
    k = ki["befehl_kanten"]
    assert "darstellung.kanten" in [p["befehl"] for p in k["protokoll_neu"]]
    assert k["gespraech_sichtbar_rechteck"] is None
    w = ki["wunsch"]
    assert w["eintraege"][0].startswith("KI fragen:"), w["eintraege"]
    assert _gleich(w["gespraech"], w["inspektor_vorher"]), (w["gespraech"], w["inspektor_vorher"])
    assert len(w["panels"]) == 2, w["panels"]
    zeilen = w["karte"]["befehlszeilen"]
    assert any("feature.verrunden" in z and re.search(r"(?<![\d.,])2\s*mm\b", z) for z in zeilen), zeilen
    assert w["modell_bei_karte"] == w["modell_vorher"], "vor dem Übernehmen darf sich das Modell nicht ändern"


def test_aufgabe_f_uebernehmen_wird_ein_schritt():
    """Vorschlag übernehmen, Radius 3 mm: neuer Schritt Verrundung nach „Bohrungen“, gewählt, Protokoll `quelle: ki`, ≤ 2 × Rückgängig."""
    f = ablauf("f")
    namen = [z["name"] for z in f["aufbau"]]
    i = namen.index("Verrundung")
    assert namen[i - 1] == "Bohrungen", namen
    assert zeile(f["aufbau"], "Verrundung")["aria_selected"] == "true"
    verrundung = nach_name(f["modell"], "Verrundung")
    assert f["auswahl"] == [verrundung["id"]]
    assert 3.0 in groessen(verrundung), groessen(verrundung)
    radius = [x for g in f["inspektor"]["gruppen"] for x in g["felder"] if x["name"] == "Radius"]
    assert len(radius) == 1 and zahl(radius[0]["wert_text"] or radius[0]["text"]) == 3
    ki = [p for p in f["protokoll"] if p["befehl"] == "feature.verrunden"]
    assert ki and ki[0]["quelle"] == "ki", f["protokoll"]
    assert f["modell_vorher"] in f["undo_schritte"], (
        "nach höchstens 2 × Strg/Cmd+Z ist der Stand davor hergestellt"
    )
    assert len(f["undo_schritte"]) <= 2


def test_verwerfen_anhalten_unbekannter_satz():
    """Verwerfen, Anhalten, unbekannter Satz: Modell unverändert; nach Anhalten keine Karte; Erklärung; 0 modale Dialoge."""
    ki = pruefen("ki")
    for name in ("verwerfen", "anhalten", "unbekannt"):
        assert ki[name]["modell"] == ki[name]["modell_vorher"], name
    assert ki["verwerfen"]["karten"] == [] and ki["anhalten"]["karten"] == []
    u = ki["unbekannt"]
    assert u["modale_dialoge"] == []
    # Erklärung mit Beispielsätzen: mindestens zwei Sätze mit einer vorbereiteten Absicht (Maß ändern, Abrunden)
    beispiele = [
        t for t in u["texte"] if re.search(r"länger|breiter|dicker|höher|kürzer|schmaler|rund", t, re.I)
    ]
    assert len(beispiele) >= 2, u["texte"]


def test_kennzeichnung_ki_simuliert():
    """Gespräch und Karte: `data-quelle="ki"`, Text „KI simuliert“; Karte = Entscheidungskarte mit zwei Hauptaktionen."""
    kz = pruefen("ki")["kennzeichnung"]
    assert {(e["zustand"], e["element"]) for e in kz} == {
        ("ki-gespraech", "gespraech"),
        ("ki-vorschlag", "karte"),
    }
    for e in kz:
        assert e["quelle"] == "ki", e
        assert any("simuliert" in t.lower() for t in e["texte"]), e
    karte = next(e for e in kz if e["element"] == "karte")
    assert karte["muster"] == "Entscheidungskarte"
    assert sorted(karte["hauptaktionen"]) == HAUPTAKTIONEN
    assert "ki-gespraech" in ZUSTAENDE and "ki-vorschlag" in ZUSTAENDE


def test_simulation_andockstellen():
    """Reiter „Simulation“: Schritte Lager, Kraft, Ergebnis; 2 Reiter; Legende als Kandidat in der Modellzone; 5 Zonen, 2 Panels."""
    r = pruefen("simulation")["reiter"]
    namen = [z["name"] for z in r["aufbau"]]
    assert {"Lager", "Kraft", "Ergebnis"} <= set(namen), namen
    assert len(r["kopf_reiter"]) == 2, r["kopf_reiter"]
    legenden = [m for m in r["modell_zone_muster_kandidaten"] if m["wert"] == "Legende"]
    assert len(legenden) == 1
    z = r["modellzone"]
    box = legenden[0]["rechteck"]
    assert z["x"] - 0.5 <= box["x"] and z["y"] - 0.5 <= box["y"], (box, z)
    assert (
        box["x"] + box["breite"] <= z["x"] + z["breite"] + 0.5
        and box["y"] + box["hoehe"] <= z["y"] + z["hoehe"] + 0.5
    )
    sichtbar = sorted(e["zone"] for e in r["zonen"] if e["sichtbar"])
    assert sichtbar == ["aufbau", "inspektor", "kopf", "modell", "rueckmeldung"], sichtbar
    assert len(r["panels"]) == 2


def test_werte_und_befehle_des_pakets():
    """Kraft 200 N verdoppelt den Höchstwert der Legende (± 1 %); `simulation.kraft` unter den ersten 3 Treffern."""
    s = pruefen("simulation")
    k = s["kraft_200"]
    assert nahe(zahl(k["legende_max"]), 2 * zahl(k["legende_max_vorher"]), 0.01), k
    treffer = [t["befehl"] for t in s["suche_kraft"]["treffer"]]
    assert "simulation.kraft" in treffer[:3], treffer


@pytest.mark.parametrize("quelle", ["legende_texte", "inspektor_texte"])
def test_simulation_gekennzeichnet(quelle):
    """Legende und Inspektor zeigen den Text für „simuliert“."""
    texte = pruefen("simulation")["kennzeichnung"][quelle]
    assert any("simuliert" in t.lower() for t in texte), texte


def test_simulation_keine_fenster():
    """Zustand `simulation`: 0 modale Dialoge, 0 Werkzeugleisten, 0 Overlays außerhalb der erlaubten."""
    z = [e for e in pruefen("budget")["zustaende"] if e["zustand"] == "simulation"]
    assert len(z) == 2
    for e in z:
        assert e["modale_dialoge"] == [] and e["werkzeugleisten"] == [], e["thema"]
        fremd = [o for o in e["overlays"] if o["art"] not in ERLAUBTE_OVERLAYS]
        assert fremd == [], (e["thema"], fremd)
        assert e["legenden_texte"], e["thema"]
