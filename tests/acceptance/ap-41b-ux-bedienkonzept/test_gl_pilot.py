"""AK-16: Requirement „Pilotaufgaben und Reaktion“."""

# ruff: noqa: E501

from __future__ import annotations

import re

from grundlagen_helpers import (
    LEITFADEN,
    ablauf,
    elemente,
    eltern,
    groessen,
    id_von,
    kanon,
    nach_name,
    nahe,
    p95,
    pruefen,
    titel_de,
    verworfen,
    volumen,
)

AUFGABEN = list("EFGHIJKL")
# Befehle, die der jeweilige Ablauf braucht (design.md): ihre Titel dürfen im Aufgabentext nicht stehen
BEFEHLE = {
    "E": ["bearbeiten.rueckgaengig"],
    "F": ["element.wert-setzen"],
    "G": ["element.wert-setzen", "element.verlassen"],
    "H": ["darstellung.wechseln"],
    "I": ["element.ausblenden", "element.einblenden", "ansicht.alles-einblenden"],
    "J": ["element.duplizieren", "element.umbenennen", "element.verwerfen"],
    "K": ["element.umhaengen"],
    "L": ["element.zurueckholen"],
}
KENNZAHLEN = ["auswahl", "hover", "kontextmenue", "ablegen", "wert_live", "suche"]


def test_ablauf_e():
    """Scenario „Abläufe erreichen den Sollzustand“, Aufgabe E: das Programm zeigt „Mod+Z“ für Rückgängig."""
    a = ablauf("e")
    assert a["rueckgaengig_texte"], "keine Kürzeltexte gefunden"
    assert any(re.search(r"(?:Strg|Ctrl|Cmd|⌘)\s*\+\s*Z\b", t) for t in a["rueckgaengig_texte"]), a[
        "rueckgaengig_texte"
    ]


def test_ablauf_f():
    """Aufgabe F: Vorschlag übernommen (Protokoll `quelle: ki`), Steg 40 mm hoch (Volumen 55,49 cm³ ± 0,1 %)."""
    a = ablauf("f")
    assert [p for p in a["protokoll"] if p.get("quelle") == "ki"], a["protokoll"]
    assert 40.0 in groessen(nach_name(a["modell"], "Steg")), groessen(nach_name(a["modell"], "Steg"))
    assert nahe(a["teil"]["volumen_mm3"], volumen(h=40)), a["teil"]


def test_ablauf_g():
    """Aufgabe G: Grundplatte 100 mm lang, nichts aktiv, Volumen 57,49 cm³ ± 0,1 %."""
    a = ablauf("g")
    assert 100.0 in groessen(nach_name(a["modell"], "Grundplatte"))
    assert a["ansicht"]["aktiv"] is None, a["ansicht"]["aktiv"]
    assert nahe(a["teil"]["volumen_mm3"], volumen(L=100.0)), a["teil"]
    assert nahe(a["teil"]["volumen_mm3"], 57490.0), a["teil"]


def test_ablauf_h():
    """Aufgabe H: Darstellung Kanten."""
    assert ablauf("h")["ansicht"]["darstellung"] == "kanten"


def test_ablauf_i():
    """Aufgabe I: beide kurz ausgeblendet, am Ende beide sichtbar, Modell unverändert."""
    a = ablauf("i")
    gp, steg = id_von(a["modell"], "Grundplatte"), id_von(a["modell"], "Steg")
    assert {gp, steg} <= set(a["zwischen"]["ausgeblendet"]) and not {gp, steg} & set(
        a["zwischen"]["gezeichnet"]
    ), a["zwischen"]
    assert a["ende"]["ausgeblendet"] == [] and {gp, steg} <= set(a["ende"]["gezeichnet"]), a["ende"]
    assert kanon(a["modell"]) == kanon(a["modell_vorher"])


def test_ablauf_j():
    """Aufgabe J: „Steg 2“ ist verworfen, nicht gelöscht."""
    a = ablauf("j")
    kopie = nach_name(a["modell"], "Steg 2")
    assert verworfen(kopie), kopie
    assert len([e for e in elemente(a["modell"]) if e["id"] == kopie["id"]]) == 1


def test_ablauf_k():
    """Aufgabe K: Deckel ist Kind von Baugruppe 1."""
    a = ablauf("k")
    assert eltern(a["modell"], id_von(a["modell"], "Deckel")) == [id_von(a["modell"], "Baugruppe 1")]


def test_ablauf_l():
    """Aufgabe L (Start `befund`): Bohrungen aktuell, Befund weg."""
    a = ablauf("l")
    assert "fehlerhaft" not in a["bohrungen_zustaende"], a["bohrungen_zustaende"]
    assert a["befunde"] == [], a["befunde"]
    assert not verworfen(nach_name(a["modell"], "Bohrungen"))


def test_reaktion_unter_100_ms():
    """Scenario „Reaktion unter 100 ms“: je Kennzahl mindestens 20 Messungen, aus den Rohwerten p95 < 100 ms."""
    m = pruefen("messen")
    for k in KENNZAHLEN:
        roh = m[k]["roh_ms"]
        assert len(roh) >= 20, (k, len(roh))
        assert all(isinstance(x, (int, float)) and x >= 0 for x in roh), k
        assert p95(roh) < 100, (k, p95(roh))


def _abschnitt(text: str, buchstabe: str) -> str:
    """Text zur Aufgabe: Überschrift „Aufgabe X“ bis zur nächsten Überschrift, sonst die Tabellenzeile `| X |`."""
    m = re.search(rf"^#+\s*Aufgabe\s+{buchstabe}\b.*?(?=^#+\s|\Z)", text, re.M | re.S)
    if m:
        return m.group(0)
    zeilen = [z for z in text.splitlines() if re.match(rf"\|\s*(?:Aufgabe\s+)?{buchstabe}\s*\|", z)]
    return "\n".join(zeilen)


def test_leitfaden_vollstaendig():
    """Scenario „Leitfaden vollständig“: Aufgaben E–L mit Text, Start, Sollzustand, Zeit; Ergebnisbogen TP1–TP5; drei
    Fragen der Nachbefragung; Datenschutz; Start mit `npm run preview`; kein Aufgabentext nennt Befehlstitel."""
    assert LEITFADEN.is_file(), "docs/spikes/ux-prototyp-2.md fehlt"
    text = LEITFADEN.read_text("utf-8")
    kopf = text.casefold()
    for b in AUFGABEN:
        a = _abschnitt(text, b)
        assert a.strip(), f"Aufgabe {b} fehlt"
        low = a.casefold()
        assert "start" in low and "soll" in low, f"Aufgabe {b}: Start oder Sollzustand fehlt"
        assert re.search(r"\d+\s*min", low), f"Aufgabe {b}: Zeit fehlt"
        for befehl in BEFEHLE[b]:
            titel = titel_de(befehl)
            assert titel and titel.casefold() not in low, f"Aufgabe {b} nennt den Befehl „{titel}“"
    assert "ergebnisbogen" in kopf
    for tp in ("TP1", "TP2", "TP3", "TP4", "TP5"):
        assert tp in text, tp
    for frage in (
        "woran erkennst du, was gewählt ist",
        "wo findest du, was du mit dem gewählten tun kannst",
        "was passiert, wenn etwas schiefgeht",
    ):
        assert frage in kopf, frage
    assert re.search(r"^#+\s*Datenschutz", text, re.M | re.I), "Abschnitt Datenschutz fehlt"
    assert "npm run preview" in text
