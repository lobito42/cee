"""AK-6: Requirement „Eingabe und Navigation“."""

from __future__ import annotations

import math

from ux2_helpers import bezogene_laengen, pruefen


def _winkel(a: float, b: float) -> float:
    d = abs(a - b) % 360
    return min(d, 360 - d)


def _ziel_verschoben(a: dict, b: dict) -> float:
    return math.dist((a["x"], a["y"], a["z"]), (b["x"], b["y"], b["z"]))


def test_profil_als_einstellung():
    """Das Navigationsprofil ist als Einstellung hinterlegt: `standard`."""
    assert pruefen("navigation")["einstellung"]["navigationsprofil"] == "standard"


def test_drehen_schieben_zoomen():
    """Rechts 200 px → Azimut ≥ 30°; Mitte 100 px → Ziel verschoben; Rad 5 Rasten → Abstand ≥ 20 %;
    `modell()` und `auswahl()` unverändert."""
    n = pruefen("navigation")
    vorher, gedreht = n["vorher"]["kamera"], n["nach_drehen"]["kamera"]
    assert _winkel(vorher["azimut_grad"], gedreht["azimut_grad"]) >= 30, (vorher, gedreht)
    geschoben = n["nach_schieben"]["kamera"]
    assert _ziel_verschoben(gedreht["ziel"], geschoben["ziel"]) > 0, (gedreht, geschoben)
    gezoomt = n["nach_zoomen"]["kamera"]
    assert abs(gezoomt["abstand_mm"] - geschoben["abstand_mm"]) >= 0.2 * geschoben["abstand_mm"], (
        geschoben,
        gezoomt,
    )
    assert n["nachher"]["modell"] == n["vorher"]["modell"]
    assert n["nachher"]["auswahl"] == n["vorher"]["auswahl"]
    assert n["vorher"]["auswahl"], "Zustand `schritt` ohne Auswahl"


def test_rechtsklick_ohne_bewegung():
    """Rechtsklick (< 4 px) auf die Grundplatte: Kamera unverändert, Kontextaktionen erscheinen."""
    r = pruefen("navigation")["rechtsklick"]
    assert r["kamera_nachher"] == r["kamera_vorher"]
    assert r["kontext_befehle"], "keine Kontextaktionen nach Rechtsklick"


def test_ansichtseingabe_waehrend_des_ziehens():
    """`ry: 20` beim Ziehen am Griff „Dicke“: Azimut ≥ 10°, Zahl am Zeiger bleibt, Dicke gleich."""
    n = pruefen("navigation")
    z = n["ziehen_mit_ansicht"]
    assert _winkel(z["kamera_vorher"]["azimut_grad"], z["kamera_waehrend"]["azimut_grad"]) >= 10, z
    assert any("mm" in t["text"] for t in z["zeiger_texte_waehrend"]), z["zeiger_texte_waehrend"]
    mit = bezogene_laengen(z["modell"], "Grundplatte")
    ohne = bezogene_laengen(n["ziehen_ohne_ansicht"]["modell"], "Grundplatte")
    vorher = bezogene_laengen(n["vorher"]["modell"], "Grundplatte")
    assert mit == ohne, (mit, ohne)
    assert mit != vorher, "das Ziehen hat Dicke nicht geändert"
