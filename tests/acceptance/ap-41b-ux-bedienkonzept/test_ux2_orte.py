"""AK-10: Orte Teil und Skizze, Aufgabe G (Requirement „Orte Teil und Skizze“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import pytest
from ux2_helpers import ablauf, geometrie, groessen, id_von, nach_name, nahe, pruefen, volumen, zeile

WEGE = {"doppelklick-flaeche", "doppelklick-aufbau", "knopf"}


def test_hinein_auf_drei_wegen():
    """Je Weg ist `ort` nach ≤ 400 ms die Skizze der Grundplatte; der Pfad endet mit Halter › Grundplatte › Skizze."""
    hinein = pruefen("orte")["hinein"]
    assert {h["weg"] for h in hinein} == WEGE and len(hinein) == 3
    for h in hinein:
        grundplatte = id_von(h["modell"], "Grundplatte")
        assert h["dauer_ms"] <= 400, h["weg"]
        assert h["ansicht"]["ort"] == {"art": "skizze", "schritt": grundplatte}, (
            h["weg"],
            h["ansicht"]["ort"],
        )
        assert h["ansicht"]["pfad"][-3:] == ["Halter", "Grundplatte", "Skizze"], (
            h["weg"],
            h["ansicht"]["pfad"],
        )


def test_spaetere_schritte_ausgegraut_und_gestrichelt():
    """Im Zustand `skizze`: Steg und Bohrungen `aria-disabled`, Grundplatte nicht; ihre Geometrie gestrichelt, ohne Flächen."""
    s = pruefen("orte")["skizze"]
    assert zeile(s["aufbau"], "Steg")["aria_disabled"] == "true"
    assert zeile(s["aufbau"], "Bohrungen")["aria_disabled"] == "true"
    assert zeile(s["aufbau"], "Grundplatte")["aria_disabled"] in (None, "false")
    for name in ("Steg", "Bohrungen"):
        g = geometrie(s["ansicht"], id_von(s["modell"], name))
        assert g["gestrichelt"] and not g["flaechen"], (name, g)
    assert not geometrie(s["ansicht"], id_von(s["modell"], "Grundplatte"))["gestrichelt"]


def test_mass_fokussiert_das_feld():
    """Klick auf das Maß „80“ in der Zeichnung: Wertfeld „Länge“ (Gruppe „Aus der Skizze“) hat Fokus, Inhalt markiert."""
    m = pruefen("orte")["mass_80"]
    assert m["fokus"] == {"gruppe": "Aus der Skizze", "feld": "Länge"}, m["fokus"]
    assert m["auswahl_start"] == 0 and m["auswahl_ende"] == len(m["wert_text"]) > 0, m


@pytest.mark.parametrize("variante", ["fertig", "esc", "pfad"])
def test_aufgabe_g_hinaus_auf_drei_wegen(variante):
    """Aufgabe G: Maß 80 → 100, danach hinaus (Fertig, Esc, Pfad): Ort Teil, Pfad endet mit Halter, 100 × 50 × 38 mm, 57,49 cm³."""
    g = ablauf("g", variante)
    assert g["ansicht"]["ort"]["art"] == "teil", g["ansicht"]["ort"]
    assert g["ansicht"]["pfad"][-1] == "Halter", g["ansicht"]["pfad"]
    assert 100.0 in groessen(nach_name(g["modell"], "Grundplatte"))
    assert sorted(g["teil"]["abmessungen_mm"]) == [38.0, 50.0, 100.0], g["teil"]
    assert nahe(g["teil"]["volumen_mm3"], volumen(L=100.0)), g["teil"]
    assert g["eingaben"] > 0
