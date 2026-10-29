"""ap-52, Capability `ki-pruefsatz`: fester Prüfsatz „Wireframe-Aufgaben“, Prüfer, Messen beliebiger Anbieter.

Der Prüfsatz liegt als Vorgabe des Kernteams unter `tests/golden/ap-52-ki-konstruktion-wireframe/` (aus design.md Abschnitt
5). Bewertet wird nur durch Prüfer am Graphen nach Übernehmen und am Ergebnis des Workers (ADR-053); der Test rechnet
sie selbst nach (`ki_helpers.pruefer_pruefen`) und glaubt dem Prüfbefehl nichts.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(
    0, str(Path(__file__).resolve().parent)
)  # Hilfen dieses Ordners, unabhängig von der Sammel-Reihenfolge

from ki_helpers import (  # noqa: E402
    GOLDEN,
    Testmodell,
    aufgaben,
    golden,
    ki_pruefen,
    ki_roh,
    loesung,
    pruefer_pruefen,
    regel_lauf,
)


def test_satzerkennung_besteht_pruefsatz_reproduzierbar():
    """Requirement „Prüfsatz Wireframe-Aufgaben“, Scenario „Satzerkennung besteht den Prüfsatz reproduzierbar“:
    `ki pruefsatz --anbieter regel` dreimal; `bestanden` = 5 von `gesamt` = 5 in allen Läufen; das eigene Nachrechnen
    (Satz senden, übernehmen, Prüfer auf Graph und Worker-Ergebnis) stimmt in 5 von 5 Aufgaben überein; die drei
    Ausgaben sind bytegleich."""
    ids = [a["id"] for a in golden()["aufgaben"]]
    assert ids == ["W1", "W2", "W3", "W4", "W5"], ids
    eigene = {}
    for a in golden()["aufgaben"]:
        vorher, nachher = regel_lauf(a["zustand"], a["satz"])
        eigene[a["id"]] = pruefer_pruefen(a, vorher, nachher)
    assert all(g == [] for g in eigene.values()), eigene

    roh = []
    for _ in range(3):
        r = ki_roh(["pruefsatz", "--datei", str(GOLDEN), "--anbieter", "regel"])
        assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]
        roh.append(r.stdout)
    for text in roh:
        erg = json.loads(text)
        assert erg["anbieter"] == "regel"
        assert (erg["bestanden"], erg["gesamt"]) == (5, 5), erg
        for a in erg["aufgaben"]:
            assert a["bestanden"] is (eigene[a["id"]] == []), (a, eigene[a["id"]])
        assert [a["id"] for a in erg["aufgaben"]] == ids
    assert roh[0] == roh[1] == roh[2], "Ausgaben der drei Läufe sind nicht bytegleich"


def test_pruefer_erkennt_falsche_loesungen():
    """Scenario „Prüfer erkennt falsche Lösungen“: das Testmodell liefert für W3 ein Rechteck 100 × 50 mm und für
    W4 einen Punkt mit absoluter Lage statt `ref` = `P2.point`; trotz Schlusstext „erledigt, alles korrekt“ sind W3 und W4
    `bestanden` = false mit mindestens einem Grund. Der Test rechnet beide Fehlschläge selbst nach."""
    with Testmodell(loesung(falsch=True)) as tm:
        erg = ki_pruefen(
            ["pruefsatz", "--datei", str(GOLDEN), "--anbieter", "openai-kompatibel"], env=tm.env()
        )
    je = {a["id"]: a for a in erg["aufgaben"]}
    for id in ("W3", "W4"):
        assert je[id]["bestanden"] is False and len(je[id]["gruende"]) >= 1, je[id]
    # die Aufgaben, die das Testmodell richtig löst, bestehen: der Prüfer ist nicht einfach immer „falsch“
    for id in ("W1", "W2", "W5"):
        assert je[id]["bestanden"] is True, je[id]
    assert erg["bestanden"] == 3 and erg["gesamt"] == 5, erg


def test_wiederholungen_und_modellname():
    """Requirement „Messen beliebiger Anbieter“, Scenario „Wiederholungen“: `--wiederholungen 2` gegen ein Testmodell,
    das jede Aufgabe richtig löst: je Aufgabe `versuche` = 2 und `bestanden` = true, `anbieter` =
    `openai-kompatibel`, `modell` = `CEE_KI_MODELL`."""
    with Testmodell(loesung()) as tm:
        erg = ki_pruefen(
            ["pruefsatz", "--datei", str(GOLDEN), "--anbieter", "openai-kompatibel", "--wiederholungen", "2"],
            env=tm.env(),
        )
        assert len(tm.anfragen) >= 10
    assert erg["anbieter"] == "openai-kompatibel" and erg["modell"] == "testmodell-1", erg
    assert [a["id"] for a in erg["aufgaben"]] == list(aufgaben()), erg
    for a in erg["aufgaben"]:
        assert a["versuche"] == 2 and a["bestanden"] is True, a
    assert (erg["bestanden"], erg["gesamt"]) == (5, 5)
