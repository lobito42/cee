"""AK-4: Ein Bildschirm, fünf Zonen (Requirement „Ein Bildschirm, fünf Zonen“)."""

from __future__ import annotations

import itertools
import re

from ux2_helpers import ZUSTAENDE, flaeche, pruefen, ueberlappung

ZONEN = ["kopf", "aufbau", "modell", "inspektor", "rueckmeldung"]


def _zonen() -> dict[str, dict]:
    liste = pruefen("zonen")
    assert {e["zustand"] for e in liste} == set(ZUSTAENDE) and len(liste) == 17
    return {e["zustand"]: e for e in liste}


def _sichtbar(e: dict) -> dict[str, dict]:
    je_zone: dict[str, list[dict]] = {}
    for z in e["zonen"]:
        if z["sichtbar"]:
            je_zone.setdefault(z["zone"], []).append(z["rechteck"])
    assert sorted(je_zone) == sorted(ZONEN), (e["zustand"], sorted(je_zone))
    for name, rs in je_zone.items():
        assert len(rs) == 1, (e["zustand"], name, "genau eine sichtbare Zone je Name")
    return {n: rs[0] for n, rs in je_zone.items()}


def test_zonen_lage_und_groesse():
    """Genau fünf Zonen je Zustand mit den Maßen aus design.md; 0 px² Überlappung; 2 Panels."""
    for zustand, e in _zonen().items():
        assert e["fenster"] == {"breite": 1440, "hoehe": 900}, zustand
        z = _sichtbar(e)
        kopf, aufbau, modell, insp, rueck = (z[n] for n in ZONEN)
        assert kopf["y"] <= 1 and abs(kopf["breite"] - 1440) <= 1 and kopf["hoehe"] <= 56, (zustand, kopf)
        assert 220 <= aufbau["breite"] <= 320 and aufbau["x"] <= 1, (zustand, aufbau)
        assert 260 <= insp["breite"] <= 360 and abs(insp["x"] + insp["breite"] - 1440) <= 1, (zustand, insp)
        assert rueck["hoehe"] <= 32 and abs(rueck["y"] + rueck["hoehe"] - 900) <= 1, (zustand, rueck)
        assert aufbau["x"] + aufbau["breite"] <= modell["x"] + 1, (zustand, "Modell rechts vom Aufbau")
        assert modell["x"] + modell["breite"] <= insp["x"] + 1, (zustand, "Modell links vom Inspektor")
        assert kopf["y"] + kopf["hoehe"] <= modell["y"] + 1, zustand
        assert modell["y"] + modell["hoehe"] <= rueck["y"] + 1, zustand
        assert flaeche(modell) >= 0.5 * 1440 * 900, (zustand, flaeche(modell))
        for a, b in itertools.combinations(ZONEN, 2):
            assert ueberlappung(z[a], z[b]) < 1, (zustand, a, b)
        assert len(e["panels"]) == 2, (zustand, e["panels"])


def test_keine_menue_werkzeugleiste_dialog():
    """Keine Menüleiste, keine Werkzeugleiste, kein modaler Dialog (Budget-Rohdaten)."""
    for z in pruefen("budget")["zustaende"]:
        name = (z["zustand"], z["thema"])
        assert z["menueleisten"] == [], name
        assert z["werkzeugleisten"] == [], name
        assert z["modale_dialoge"] == [], name


def test_inhalt_der_kopfzeile():
    """Im Zustand `skizze`: Pfad Halter › Grundplatte › Skizze, genau ein Eingabefeld mit Kürzel, Rückgängig mit Kürzel."""
    kopf = _zonen()["skizze"]["kopf"]
    assert kopf["pfad"][-3:] == ["Halter", "Grundplatte", "Skizze"], kopf["pfad"]
    assert len(kopf["texteingaben"]) == 1, kopf["texteingaben"]
    eingabe = kopf["texteingaben"][0]
    assert eingabe["platzhalter"] == "Suchen oder fragen", eingabe
    assert re.search(r"(?:Strg|Ctrl|⌘|Cmd)\s*\+?\s*K", eingabe["kuerzel_text"]), eingabe
    rg = [r for r in kopf["rueckgaengig"] if r["befehl"] == "bearbeiten.rueckgaengig"]
    assert len(rg) == 1, kopf["rueckgaengig"]
    assert re.search(r"(?:Strg|Ctrl|⌘|Cmd)\s*\+?\s*Z", rg[0]["text"]), rg[0]
    assert 1 <= len(kopf["reiter"]) <= 5, kopf["reiter"]


def test_zahlen_nur_im_inspektor():
    """Die Modellzone zeigt in `halter` und `schritt` keine Zahl mit Längeneinheit."""
    z = _zonen()
    for name in ("halter", "schritt"):
        texte = z[name]["modell_texte"]
        zahlen = [t for t in texte if re.search(r"\d\s*(?:mm|cm|m)\b", t)]
        assert zahlen == [], (name, zahlen)
