"""AK-4: Requirement „Ein Bildschirm, fünf Zonen“ und Scenario „Zahlen nur im Inspektor“."""

from __future__ import annotations

import re

from ux2_helpers import ZUSTAENDE, flaeche, pruefen, ueberlappung

ZONEN = ("kopf", "aufbau", "modell", "inspektor", "rueckmeldung")
LAENGE = re.compile(r"\d\s*(?:mm|cm|m)\b")


def _zonen() -> dict[str, dict]:
    liste = pruefen("zonen")
    ergebnis = {z["zustand"]: z for z in liste}
    assert set(ergebnis) == set(ZUSTAENDE), set(ZUSTAENDE) ^ set(ergebnis)
    return ergebnis


def test_zonen_in_lage_und_groesse():
    """Je Zustand genau je eine sichtbare Zone; Maße nach design.md; 0 px² Überlappung."""
    for name, z in _zonen().items():
        assert (z["fenster"]["breite"], z["fenster"]["hoehe"]) == (1440, 900), name
        sichtbar = [e for e in z["zonen"] if e["sichtbar"]]
        assert sorted(e["zone"] for e in sichtbar) == sorted(ZONEN), (name, [e["zone"] for e in sichtbar])
        r = {e["zone"]: e["rechteck"] for e in sichtbar}
        kopf, auf, mod, ins, rm = (r[k] for k in ZONEN)
        assert abs(kopf["x"]) <= 0.5 and abs(kopf["y"]) <= 0.5 and kopf["breite"] >= 1439.5, (name, kopf)
        assert kopf["hoehe"] <= 56, (name, kopf)
        assert abs(auf["x"]) <= 0.5 and 220 <= auf["breite"] <= 320, (name, auf)
        assert abs(ins["x"] + ins["breite"] - 1440) <= 0.5 and 260 <= ins["breite"] <= 360, (name, ins)
        assert abs(rm["y"] + rm["hoehe"] - 900) <= 0.5 and rm["hoehe"] <= 32, (name, rm)
        assert auf["x"] + auf["breite"] <= mod["x"] + 0.5 and mod["x"] + mod["breite"] <= ins["x"] + 0.5, name
        assert kopf["y"] + kopf["hoehe"] <= mod["y"] + 0.5 and mod["y"] + mod["hoehe"] <= rm["y"] + 0.5, name
        assert flaeche(mod) >= 0.5 * 1440 * 900, (name, mod)
        for i, a in enumerate(ZONEN):
            for b in ZONEN[i + 1 :]:
                assert ueberlappung(r[a], r[b]) == 0, (name, a, b)


def test_inhalt_der_kopfzeile():
    """Zustand `skizze`: Pfad … Halter, Grundplatte, Skizze; 1 Texteingabe „Suchen oder fragen“ mit Strg K/⌘K;
    Rückgängig zeigt sein Kürzel als Text."""
    kopf = _zonen()["skizze"]["kopf"]
    pfad = kopf["pfad"]
    assert len(pfad) >= 4, pfad  # erstes Glied: Stand (Entwürfe)
    assert pfad[-3:] == ["Halter", "Grundplatte", "Skizze"], pfad
    assert len(kopf["texteingaben"]) == 1, kopf["texteingaben"]
    feld = kopf["texteingaben"][0]
    assert feld["platzhalter"].strip() == "Suchen oder fragen", feld
    assert re.fullmatch(r"(?:Strg\s*\+?\s*K|⌘\s*K)", feld["kuerzel_text"].strip()), feld
    knoepfe = [k for k in kopf["rueckgaengig"] if k["befehl"] == "bearbeiten.rueckgaengig"]
    assert len(knoepfe) == 1, kopf["rueckgaengig"]
    assert re.search(r"(?:Strg\s*\+?\s*Z|⌘\s*Z)", knoepfe[0]["text"]), knoepfe[0]


def test_reiter_in_der_kopfzeile():
    """Arbeitsbereich-Reiter stehen in der Kopfzeile, mindestens „Modell“."""
    z = _zonen()
    assert "Modell" in z["halter"]["kopf"]["reiter"], z["halter"]["kopf"]


def test_zahlen_nur_im_inspektor():
    """`halter` und `schritt`: die Modellzone zeigt 0 Zahlen mit Längeneinheit."""
    z = _zonen()
    for name in ("halter", "schritt"):
        texte = z[name]["modell_texte"]
        funde = [t for t in texte if LAENGE.search(t)]
        assert funde == [], (name, funde)
