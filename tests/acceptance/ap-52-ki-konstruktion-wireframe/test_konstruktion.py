"""ap-52, Capability `ki-konstruktion`: Satz im Chat, Änderungssatz mit Vorschau, Übernehmen, Verwerfen, Rückgängig.

Mit der Satzerkennung (`regel`, ohne Netz). Das Prüfwerkzeug (`pruefen -- ki ablauf`) liefert Rohdaten; alle Urteile
(Lagen nachrechnen, Median, Hashvergleich) fällt der Test. Das Scenario „Ausprobieren“ ist `[mensch]` und hier kein
Test. Formen und Annahmen: `ki_helpers.py`.
"""

# ruff: noqa: E501

from __future__ import annotations

import statistics
import sys
from pathlib import Path

sys.path.insert(
    0, str(Path(__file__).resolve().parent)
)  # Hilfen dieses Ordners, unabhängig von der Sammel-Reihenfolge

from ki_helpers import (  # noqa: E402
    KiAblauf,
    ablauf_ap50,
    antworten,
    aufgaben,
    ausgang,
    flach,
    karten,
    nahe,
    neue_wurzeln,
    pos,
    vec,
)


def _sortiert(punkte):
    return sorted(punkte, key=lambda v: tuple(round(x, 2) for x in v))


def test_vorschau_verwerfen_uebernehmen_rueckgaengig():
    """Requirement „Änderungssatz mit Vorschau“, Scenario „Vorschau, Verwerfen, Übernehmen, Rückgängig“:
    `graph_hash` nach Senden und Verwerfen gleich wie davor; `geister` = 9 Einträge (5 Punkte, 4 Strecken) an den
    Lagen des Worker-Ergebnisses (± 1e-3 mm); genau eine Hauptaktion; nach Übernehmen 5 neue `point` und 4 neue
    `segment`, `geister` leer; nach Rückgängig `graph_hash` wie am Anfang; `konsolenfehler` leer."""
    w3 = aufgaben()["W3"]
    a = KiAblauf()
    a.add("s1", chat=w3["satz"])
    a.add("verw", befehl="chat.verwerfen")
    a.add("s2", chat=w3["satz"])
    a.add("ueb", befehl="chat.uebernehmen")
    a.add("rueck", befehl="bearbeiten.rueckgaengig")
    a.laufen(w3["zustand"])
    h0 = a.s("anfang")["graph_hash"]

    for name in ("s1", "s2"):
        s = a.s(name)
        assert s["graph_hash"] == h0, f"Graph ändert sich schon beim Senden ({name})"
        offen = [k for k in karten(s) if k.get("offen")]
        assert len(offen) == 1, karten(s)
        haupt = [x for x in offen[0]["aktionen"] if x.get("haupt")]
        assert len(haupt) == 1 and haupt[0]["befehl"] == "chat.uebernehmen", offen[0]["aktionen"]
        arten = sorted(g["art"] for g in s["geister"])
        assert arten == ["point"] * 5 + ["segment"] * 4, arten
    verw = a.s("verw")
    assert verw["graph_hash"] == h0 and verw["geister"] == []

    ueb = a.s("ueb")
    neu = neue_wurzeln(a.s("anfang"), ueb)
    assert sorted(e["type"] for e in neu) == ["point"] * 5 + ["segment"] * 4, [e["type"] for e in neu]
    assert ueb["geister"] == []
    # Lagen der Geister = Lagen im Ergebnis des Workers nach Übernehmen
    soll_punkte = _sortiert([pos(ueb["ergebnis"], e["id"]) for e in neu if e["type"] == "point"])
    soll_strecken = _sortiert(
        [
            vec(o["start"]) + vec(o["end"])
            for e in neu
            if e["type"] == "segment"
            for o in [ausgang(ueb["ergebnis"], e["id"], "segment")]
        ]
    )
    for name in ("s1", "s2"):
        g = a.s(name)["geister"]
        ist_p = _sortiert([tuple(x["lage_mm"]) for x in g if x["art"] == "point"])
        ist_s = _sortiert(
            [tuple(x["lage_mm"]["start"]) + tuple(x["lage_mm"]["end"]) for x in g if x["art"] == "segment"]
        )
        assert all(nahe(i, s, 1e-3) for i, s in zip(ist_p, soll_punkte, strict=True)), (ist_p, soll_punkte)
        assert all(nahe(i, s, 1e-3) for i, s in zip(ist_s, soll_strecken, strict=True)), (
            ist_s,
            soll_strecken,
        )

    assert a.s("rueck")["graph_hash"] == h0, "ein Rückgängig muss den ganzen Satz zurücknehmen"
    assert all(s["konsolenfehler"] == [] for s in a.snaps), [s["konsolenfehler"] for s in a.snaps]


def test_kein_aenderungssatz_ohne_aufruf():
    """Scenario „Kein Änderungssatz ohne Aufruf“: „Mach mir einen Kaffee“ und „Verwirf die Strecke S9“ (gibt es
    nicht) im Zustand `drahtmodell-beispiel`: keine Karte, `graph_hash` gleich; die erste Antwort enthält mindestens 3
    Beispielsätze aus dem Prüfsatz, die zweite nennt „S9“."""
    a = KiAblauf()
    a.add("kaffee", chat="Mach mir einen Kaffee")
    a.add("s9", chat="Verwirf die Strecke S9")
    a.laufen("drahtmodell-beispiel")
    h0 = a.s("anfang")["graph_hash"]
    for name in ("kaffee", "s9"):
        s = a.s(name)
        assert karten(s) == [], (name, karten(s))
        assert s["graph_hash"] == h0
    ki = antworten(a.s("s9"))
    assert len(ki) >= 2, ki
    beispiele = [x["satz"] for x in aufgaben().values() if x["satz"] in ki[0]]
    assert len(beispiele) >= 3, (ki[0], beispiele)
    assert "S9" in ki[1], ki[1]


def test_festgelegte_deutung_rechteck_und_bezug():
    """Requirement „Satzerkennung ohne Modell“, Scenario „Festgelegte Deutung Rechteck“: Ecken bei (0,0,0),
    (100,0,0), (100,60,0), (0,60,0) mm, fünfter Punkt mit `ref` = erste Ecke bei (50,30,40) mm (je ± 1e-6); wird die
    erste Ecke auf x = 10 mm gesetzt, liegt der fünfte Punkt bei (60,30,40) mm."""
    w3 = aufgaben()["W3"]
    a = KiAblauf()
    a.add("senden", chat=w3["satz"])
    a.add("ueb", befehl="chat.uebernehmen")
    a.add("x", eigenschaft={"element": "point#1", "feld": "x", "eingabe": "10 mm"})
    a.laufen(w3["zustand"])
    s = a.s("ueb")
    punkte = [e for e in neue_wurzeln(a.s("anfang"), s) if e["type"] == "point"]
    assert len(punkte) == 5
    ecken, fuenfter = punkte[:4], punkte[4]
    soll = [(0, 0, 0), (100, 0, 0), (100, 60, 0), (0, 60, 0)]
    for e, p in zip(ecken, soll, strict=True):
        assert nahe(pos(s["ergebnis"], e["id"]), p, 1e-6), (e["id"], pos(s["ergebnis"], e["id"]), p)
    assert fuenfter["inputs"]["ref"].startswith(ecken[0]["id"] + "."), fuenfter["inputs"]
    assert nahe(pos(s["ergebnis"], fuenfter["id"]), (50, 30, 40), 1e-6)
    end = a.s("x")
    assert nahe(pos(end["ergebnis"], ecken[0]["id"]), (10, 0, 0), 1e-6)
    assert nahe(pos(end["ergebnis"], fuenfter["id"]), (60, 30, 40), 1e-6), pos(
        end["ergebnis"], fuenfter["id"]
    )
    assert flach(end["graph"])[fuenfter["id"]]["inputs"]["ref"] == fuenfter["inputs"]["ref"]


def test_budget_satzerkennung_und_uebernehmen():
    """Scenario „Budget“: der Satz aus W3 fünfmal warm gesendet und jeweils übernommen: Median `ki_bereit_ms`
    ≤ 2 000 ms, Median `bereit_ms` nach Übernehmen ≤ 500 ms (ein erster Satz wärmt Brücke und Worker auf)."""
    w3, w2 = aufgaben()["W3"], aufgaben()["W2"]
    a = KiAblauf()
    a.add("warm", chat=w2["satz"])
    a.add("warm_ueb", befehl="chat.uebernehmen")
    for i in range(5):
        a.add(f"senden{i}", chat=w3["satz"])
        a.add(f"ueb{i}", befehl="chat.uebernehmen")
    a.laufen(w3["zustand"])
    senden = [a.s(f"senden{i}")["ki_bereit_ms"] for i in range(5)]
    ueb = [a.s(f"ueb{i}")["bereit_ms"] for i in range(5)]
    assert statistics.median(senden) <= 2000, senden
    assert statistics.median(ueb) <= 500, ueb


def test_klickweg_aus_ap50_unveraendert():
    """Requirement „Klickweg bleibt“, Scenario „Ablauf aus ap-50 unverändert“: der Ablauf „Koordinatensystem, Punkte,
    Linien“ aus ap-50 (`drahtmodell ablauf`) ergibt weiter 1 `frame` mit 7 Kindern, 2 `point`, je 1 `segment`,
    `line`, `ray` mit denselben Lagen (± 1e-3 mm); die Prüfung ist die aus ap-50 selbst."""
    ablauf_ap50()
