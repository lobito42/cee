"""AK-8, AK-9, AK-10: Requirements „Navigation im Modell“, „Ziehen im Modell und in der Struktur“, „Ausblenden und
Einblenden“."""

# ruff: noqa: E501

from __future__ import annotations

import json
import math
import re

from grundlagen_helpers import (
    Bild,
    P,
    elemente,
    eltern,
    farbe,
    hex_rgb,
    id_von,
    kanon,
    pruefen,
    quelltexte,
    teil_box,
)

# --- Navigation ---------------------------------------------------------------------------------------------


def _fast_gleich(a: float, b: float) -> bool:
    return abs(a - b) <= 0.01 * max(abs(a), 1.0)


def _ziel_weg(k1: dict, k2: dict) -> float:
    return math.dist(*[(k["ziel"]["x"], k["ziel"]["y"], k["ziel"]["z"]) for k in (k1, k2)])


def test_standardprofil_fuer_drei_geraete():
    """Scenario „Standardprofil für drei Geräte“: je Gerät und Geste ändert sich genau die erwartete Kameragröße
    (Drehen ≥ 10°, Verschieben ≥ 5 mm, Zoomen ≥ 10 %), die übrigen um höchstens 1 %; Auswahl und Modell bleiben."""
    geraete = pruefen("navigation")["geraete"]
    assert {(g["geraet"], g["geste"]) for g in geraete} == {
        (d, s) for d in ("maus", "trackpad", "touch") for s in ("drehen", "verschieben", "zoomen")
    }
    for g in geraete:
        v, n = g["kamera_vorher"], g["kamera_nachher"]
        wo = (g["geraet"], g["geste"])
        weg = _ziel_weg(v, n)
        winkel = max(abs(n["azimut_grad"] - v["azimut_grad"]), abs(n["hoehe_grad"] - v["hoehe_grad"]))
        abstand_rel = abs(n["abstand_mm"] - v["abstand_mm"]) / v["abstand_mm"]
        ziel_ruhig = weg <= 0.01 * v["abstand_mm"]
        winkel_ruhig = _fast_gleich(v["azimut_grad"], n["azimut_grad"]) and _fast_gleich(
            v["hoehe_grad"], n["hoehe_grad"]
        )
        if g["geste"] == "drehen":
            assert winkel >= 10 and abstand_rel <= 0.01 and ziel_ruhig, (wo, winkel, abstand_rel, weg)
        elif g["geste"] == "verschieben":
            assert weg >= 5 and winkel_ruhig and abstand_rel <= 0.01, (wo, weg, winkel, abstand_rel)
        else:
            assert abstand_rel >= 0.10 and winkel_ruhig and ziel_ruhig, (wo, abstand_rel, winkel, weg)
        assert g["auswahl_gleich"] is True and g["modell_gleich"] is True, wo


def test_profile_sind_austauschbar():
    """Scenario „Profile sind austauschbar“: mit dem zweiten Profil wirkt dieselbe Maustaste anders; der Unterschied
    steht nur in `src/eingabe/profile.json` (0 Bezeichner eines Profils in anderen Quelldateien)."""
    datei = P / "src" / "eingabe" / "profile.json"
    assert datei.is_file(), "src/eingabe/profile.json fehlt"
    daten = json.loads(datei.read_text("utf-8"))
    if isinstance(daten, dict) and isinstance(daten.get("profile"), (dict, list)):
        daten = daten["profile"]
    namen = (
        list(daten)
        if isinstance(daten, dict)
        else [p.get("id") or p.get("name") for p in daten if isinstance(p, dict)]
    )
    namen = [n for n in namen if isinstance(n, str)]
    assert len(namen) >= 2, f"mindestens zwei Profile erwartet: {namen}"
    w = pruefen("navigation")["profilwechsel"]
    assert w["einstellung_nachher"] in namen and w["einstellung_nachher"] != namen[0], w
    mt = w["mittlere_taste"]
    assert mt["standard"] == "verschieben", mt
    assert mt["zweites"] in ("drehen", "zoomen") and mt["zweites"] != mt["standard"], mt
    funde = []
    for p in quelltexte():
        if p == datei or p.suffix not in (".ts", ".tsx", ".js", ".mjs", ".html", ".css"):
            continue
        text = p.read_text("utf-8", errors="ignore")
        for n in namen:
            if re.search(rf"""["'`]{re.escape(n)}["'`]""", text, re.I):
                funde.append((str(p.relative_to(P)), n))
    assert funde == [], funde


def test_auf_auswahl_zoomen_einpassen_projektion():
    """Scenario „Auf Auswahl zoomen, Einpassen, Projektion“: nach F füllt die Hüllbox der Grundplatte 60–90 % der
    kürzeren Zonenseite, nach `ansicht.einpassen` das ganze Teil (Mitte ± 5 %); Projektion orthogonal → perspektivisch."""
    z = pruefen("navigation")["zoom"]
    f = z["nach_f"]
    zone, box = f["modellzone"], f["huellbox"]
    kurz = min(zone["breite"], zone["hoehe"])
    assert 0.6 <= max(box["breite"], box["hoehe"]) / kurz <= 0.9, (box, zone)
    assert abs(box["x"] + box["breite"] / 2 - (zone["x"] + zone["breite"] / 2)) <= 0.05 * zone["breite"]
    assert abs(box["y"] + box["hoehe"] / 2 - (zone["y"] + zone["hoehe"] / 2)) <= 0.05 * zone["hoehe"]
    e = z["nach_einpassen"]
    zone, lw = e["modellzone"], e["leinwand_rechteck"]
    kurz = min(zone["breite"], zone["hoehe"])
    x0, y0, x1, y1 = teil_box(Bild(e["leinwand"]), hex_rgb(farbe("hell", "viewport")))
    assert 0.6 <= max(x1 - x0, y1 - y0) / kurz <= 0.9, (x0, y0, x1, y1, kurz)
    assert abs(lw["x"] + (x0 + x1) / 2 - (zone["x"] + zone["breite"] / 2)) <= 0.05 * zone["breite"]
    assert abs(lw["y"] + (y0 + y1) / 2 - (zone["y"] + zone["hoehe"] / 2)) <= 0.05 * zone["hoehe"]
    assert z["projektion"] == ["orthogonal", "perspektivisch"], z["projektion"]


# --- Ziehen -------------------------------------------------------------------------------------------------


def test_griff_mit_zahl_am_zeiger_und_tippen():
    """Scenario „Griff mit Zahl am Zeiger und Tippen“: Zahl in ganzen mm mit Einheit am Zeiger, nach „12“ + Enter
    Dicke 12 mm, genau ein neuer Protokolleintrag, Zahl ≤ 1.000 ms danach verschwunden."""
    g = pruefen("ziehen")["griff"]
    texte = g["waehrend"]["zeiger_texte"]
    assert texte, "keine Zahl am Zeiger während des Ziehens"
    assert all(re.fullmatch(r"-?\d+\s*mm", t.strip()) for t in texte), texte
    assert g["nach"]["dicke_mm"] == 12, g["nach"]
    assert g["nach"]["protokoll_laenge"] == g["vorher"]["protokoll_laenge"] + 1, g
    assert g["nach_1000ms"]["zeiger_texte"] == [], g["nach_1000ms"]


def test_ablegen_auf_erlaubtem_ziel():
    """Scenario „Ablegen auf erlaubtem Ziel“: „Baugruppe 1“ trägt `data-ziel="erlaubt"`, danach ist der Deckel
    Kind von Baugruppe 1, genau ein Eintrag `element.umhaengen`."""
    a = pruefen("ziehen")["ablegen"]
    assert a["waehrend"]["ziel_name"] == "Baugruppe 1" and a["waehrend"]["ziel_attr"] == "erlaubt", a[
        "waehrend"
    ]
    m = a["nach"]["modell"]
    assert eltern(m, id_von(m, "Deckel")) == [id_von(m, "Baugruppe 1")], (
        "Deckel ist nicht Kind von Baugruppe 1"
    )
    assert [p["befehl"] for p in a["nach"]["protokoll_neu"]] == ["element.umhaengen"], a["nach"][
        "protokoll_neu"
    ]


def test_nicht_erlaubtes_ziel_und_esc():
    """Scenario „Nicht erlaubtes Ziel und Esc“: Ziel „Gehäuse“ trägt `data-ziel="verboten"`, die Rückmeldezeile
    nennt den Grund; in allen drei Fällen `modellHash()` gleich und `protokoll()` ohne neuen Eintrag."""
    z = pruefen("ziehen")
    v = z["verboten"]
    assert v["waehrend"]["ziel_name"] == "Gehäuse" and v["waehrend"]["ziel_attr"] == "verboten", v["waehrend"]
    assert v["rueckmeldung_text"].strip() and v["rueckmeldung_text"] != v["rueckmeldung_vorher"], (
        "Grund fehlt"
    )
    for fall in (v, z["esc_deckel"], z["esc_griff"]):
        assert kanon(fall["modell_nachher"]) == kanon(fall["modell_vorher"])
        assert fall["protokoll_nachher"] == fall["protokoll_vorher"]
    assert elemente(z["esc_griff"]["modell_vorher"]), "Modell leer"


# --- Ausblenden und Einblenden --------------------------------------------------------------------------------


def test_ausblenden_aendert_das_modell_nicht():
    """Scenario „Ausblenden ändert das Modell nicht“: Steg nicht gezeichnet, ID in `ansicht().ausgeblendet`,
    Modell unverändert, kein Modell-Eintrag im Protokoll."""
    a = pruefen("sichtbarkeit")["ausblenden"]
    steg = id_von(a["vorher"]["modell"], "Steg")
    assert steg in a["vorher"]["gezeichnet"] and steg not in a["nach"]["gezeichnet"], a
    assert steg in a["nach"]["ausgeblendet"], a["nach"]["ausgeblendet"]
    assert kanon(a["nach"]["modell"]) == kanon(a["vorher"]["modell"])
    assert a["nach"]["protokoll"] == a["vorher"]["protokoll"]


def test_einblenden_auf_drei_wegen():
    """Scenario „Einblenden auf drei Wegen“: Auge, Kontextmenü, „Alles einblenden“ – danach Steg gezeichnet und
    `ansicht().ausgeblendet` leer."""
    s = pruefen("sichtbarkeit")
    steg = id_von(s["ausblenden"]["vorher"]["modell"], "Steg")
    assert [e["weg"] for e in s["einblenden"]] == ["auge", "kontextmenue", "alles"], s["einblenden"]
    for e in s["einblenden"]:
        assert steg in e["gezeichnet"] and e["ausgeblendet"] == [], e
