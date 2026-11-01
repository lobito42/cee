"""ap-52, Capability `ki-anbieter`: Satzerkennung und OpenAI-kompatibler Anbieter, Wahl, Datenschutz, Zeitlimit.

Der echte Anbieter wird gegen ein kleines Python-Testmodell auf 127.0.0.1 geprüft (`ki_helpers.Testmodell`). Formen
der Schnappschüsse und Annahmen stehen in `ki_helpers.py`.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(
    0, str(Path(__file__).resolve().parent)
)  # Hilfen dieses Ordners, unabhängig von der Sammel-Reihenfolge

from ki_helpers import (  # noqa: E402
    WERKZEUGE,
    KiAblauf,
    Testmodell,
    antworten,
    aufgaben,
    karten,
    ki_pruefen,
    ki_roh,
    loesung,
    pruefer_pruefen,
    werkzeugnachrichten,
)

WAEHLEN = {"befehl": "ki.anbieter-waehlen", "args": {"id": "openai-kompatibel"}}


def eintrag(daten: dict, id: str) -> dict:
    treffer = [a for a in daten["anbieter"] if a["id"] == id]
    assert len(treffer) == 1, daten
    return treffer[0]


def test_ohne_einrichtung_nur_satzerkennung():
    """Requirement „Anbieter-Schnittstelle in der Brücke“, Scenario „Ohne Einrichtung nur die Satzerkennung“: `aktiv`
    = `regel`, `openai-kompatibel` hat `verfuegbar` = false, der Chat-Kopf enthält „bleibt auf diesem Rechner“."""
    d = ki_pruefen(["anbieter"])
    assert d["aktiv"] == "regel", d
    assert eintrag(d, "regel")["verfuegbar"] is True
    assert eintrag(d, "openai-kompatibel")["verfuegbar"] is False
    assert {a["id"] for a in d["anbieter"]} == {"regel", "openai-kompatibel"}
    a = KiAblauf().laufen("drahtmodell-leer")
    assert "bleibt auf diesem Rechner" in a.snaps[0]["chat"]["kopf"], a.snaps[0]["chat"]["kopf"]


def test_mit_einrichtung_erst_nach_wahl_aktiv():
    """Scenario „Mit Einrichtung erst nach Wahl aktiv“: mit `CEE_KI_URL` (Testmodell auf 127.0.0.1) und
    `CEE_KI_MODELL` ist `aktiv` weiterhin `regel`, das Testmodell hat 0 Anfragen; erst nach `ki.anbieter-waehlen` ist
    `openai-kompatibel` aktiv (der nächste Satz geht an das Testmodell, die Karte nennt ihn)."""
    w2 = aufgaben()["W2"]
    with Testmodell(loesung()) as tm:
        d = ki_pruefen(["anbieter"], env=tm.env())
        assert d["aktiv"] == "regel", d
        assert eintrag(d, "openai-kompatibel")["verfuegbar"] is True, d
        a = KiAblauf().laufen("drahtmodell-leer", env=tm.env())
        assert tm.anfragen == [], "vor der Wahl darf keine Anfrage an das Testmodell gehen"
        assert "bleibt auf diesem Rechner" in a.snaps[0]["chat"]["kopf"]
        b = KiAblauf()
        b.add("waehlen", **WAEHLEN)
        b.add("senden", chat=w2["satz"])
        b.laufen("drahtmodell-leer", env=tm.env())
        assert len(tm.anfragen) >= 1
        assert karten(b.s("senden"))[-1]["anbieter"] == "openai-kompatibel"


def test_schleife_mit_fehler_und_korrektur():
    """Requirement „Echter Anbieter OpenAI-kompatibel“, Scenario „Schleife mit Fehler und Korrektur gegen das
    Testmodell“: jede Anfrage enthält genau die 8 Werkzeuge der Werkzeugliste, `temperature` = 0, `tool_choice` =
    auto, Systemnachricht ≤ 8 000 Zeichen; die zweite Anfrage enthält das Fehlerergebnis mit Code `unit`; nach
    Übernehmen bestehen die Prüfer von W3."""
    w3 = aufgaben()["W3"]
    liste = {w["name"]: w for w in ki_pruefen(["werkzeuge"])["werkzeuge"]}
    assert sorted(liste) == sorted(WERKZEUGE)
    with Testmodell(loesung(fehler_zuerst=True)) as tm:
        a = KiAblauf()
        a.add("waehlen", **WAEHLEN)
        a.add("senden", chat=w3["satz"])
        a.add("uebernehmen", befehl="chat.uebernehmen")
        a.laufen(w3["zustand"], env=tm.env())
        anfragen = list(tm.anfragen)
    assert len(anfragen) >= 11, len(anfragen)  # 1 Fehler + 9 richtige Aufrufe + Schluss
    for q in anfragen:
        assert q["pfad"].endswith("/chat/completions"), q["pfad"]
        body = q["body"]
        tools = body["tools"]
        assert len(tools) == 8 and {t["function"]["name"] for t in tools} == set(WERKZEUGE)
        for t in tools:
            assert t["type"] == "function"
            soll = liste[t["function"]["name"]]
            assert t["function"]["description"] == soll["description"]
            assert t["function"]["parameters"] == soll["inputSchema"]
        assert body["temperature"] == 0 and body["tool_choice"] == "auto"
        system = [m["content"] for m in body["messages"] if m["role"] == "system"]
        assert system and all(len(s) <= 8000 for s in system), [len(s) for s in system]
    zweite = werkzeugnachrichten(anfragen[1])
    assert any(r.get("ok") is False and r.get("code") == "unit" for r in zweite), zweite
    gruende = pruefer_pruefen(w3, a.s("anfang"), a.s("uebernehmen"))
    assert gruende == [], gruende


def test_zeitlimit_antwort_ohne_aenderung():
    """Scenario „Zeitlimit“: antwortet das Testmodell nicht und ist `CEE_KI_ZEITLIMIT_S` = 3, zeigt der Chat nach
    höchstens 5 s eine Antwort „keine Antwort vom Modell“, es entsteht keine Karte, `graph_hash` bleibt gleich."""
    with Testmodell(haengt=True) as tm:
        a = KiAblauf()
        a.add("waehlen", **WAEHLEN)
        a.add("senden", chat="Punkt bei 10, 20, 5 mm")
        a.laufen("drahtmodell-leer", env=tm.env(CEE_KI_ZEITLIMIT_S="3"))
        assert len(tm.anfragen) >= 1
    s = a.s("senden")
    assert s["ki_bereit_ms"] <= 5000, s["ki_bereit_ms"]
    assert any("keine Antwort vom Modell" in t for t in antworten(s)), antworten(s)
    assert [k for k in karten(s) if k.get("offen", True)] == []
    assert s["graph_hash"] == a.s("anfang")["graph_hash"]


def test_externes_ziel_ohne_wahl_keine_verbindung():
    """Requirement „Keine Daten ohne ausdrückliche Wahl“, Scenario „Externes Ziel ohne Wahl“: `CEE_KI_URL` auf
    192.0.2.1 ohne `CEE_KI_EXTERN`; `ki anbieter` meldet `verfuegbar` = false mit Befund `extern_nicht_gewaehlt`,
    `ki_anfragen` bleibt leer, der Satz wird von `regel` beantwortet."""
    w2 = aufgaben()["W2"]
    env = {"CEE_KI_URL": "http://192.0.2.1/v1", "CEE_KI_MODELL": "extern-1"}
    d = ki_pruefen(["anbieter"], env=env)
    e = eintrag(d, "openai-kompatibel")
    assert e["verfuegbar"] is False and "extern_nicht_gewaehlt" in json.dumps(e["befund"]), e
    a = KiAblauf()
    a.add("waehlen", **WAEHLEN)
    a.add("senden", chat=w2["satz"])
    a.laufen("drahtmodell-leer", env=env)
    s = a.s("senden")
    assert s["ki_anfragen"] == [], s["ki_anfragen"]
    assert karten(s)[-1]["anbieter"] == "regel", karten(s)


def test_schluessel_bleibt_in_der_bruecke():
    """Scenario „Schlüssel bleibt in der Brücke“: mit `CEE_KI_SCHLUESSEL=test-geheim-123` erhält das Testmodell
    `Authorization: Bearer test-geheim-123`; die Zeichenfolge kommt in Browser-Anfragen, Konsole, Schnappschüssen und
    in der Ausgabe der Prüfbefehle nicht vor; alle Browser-Anfragen gehen an 127.0.0.1."""
    geheim = "test-geheim-123"
    w2 = aufgaben()["W2"]
    with Testmodell(loesung()) as tm:
        env = tm.env(CEE_KI_SCHLUESSEL=geheim)
        a = KiAblauf()
        a.add("waehlen", **WAEHLEN)
        a.add("senden", chat=w2["satz"])
        a.laufen("drahtmodell-leer", env=env)
        anbieter = ki_roh(["anbieter"], env=env)
        anfragen = list(tm.anfragen)
    assert anfragen and all(q["kopf"].get("authorization") == f"Bearer {geheim}" for q in anfragen), [
        q["kopf"] for q in anfragen
    ]
    assert geheim not in a.roh, "Schlüssel in der Ausgabe von `ki ablauf`"
    assert geheim not in anbieter.stdout + anbieter.stderr, "Schlüssel in der Ausgabe von `ki anbieter`"
    assert geheim not in json.dumps(a.snaps, ensure_ascii=False)
    for s in a.snaps:
        assert s["konsolenfehler"] == []
        for url in s["anfragen"]:
            assert urlparse(url).hostname == "127.0.0.1", url
