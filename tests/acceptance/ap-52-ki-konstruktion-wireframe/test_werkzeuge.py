"""ap-52, Capability `ki-werkzeuge`: Werkzeugliste aus dem Befehlsregister, Werkzeugergebnisse, Urheber KI.

Das Prüfwerkzeug (`pruefen -- ki werkzeuge|ablauf`) liefert Rohdaten; Urteile fällt der Test. Das Testmodell ist ein
kleiner HTTP-Server in Python auf 127.0.0.1 (`ki_helpers.Testmodell`). Formen und Annahmen: `ki_helpers.py`.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(
    0, str(Path(__file__).resolve().parent)
)  # Hilfen dieses Ordners, unabhängig von der Sammel-Reihenfolge

from conftest import need_module  # noqa: E402
from ki_helpers import (  # noqa: E402
    WERKZEUGE,
    KiAblauf,
    Testmodell,
    aufgaben,
    karten,
    ki_pruefen,
    laengen_in,
    register,
    satz_uebernehmen,
    skript_aufrufe,
    werkzeugnachrichten,
)

ERFORDERLICH = {
    "referenz_koordinatensystem": set(),
    "referenz_punkt": set(),
    "referenz_punkt_relativ": {"ref"},
    "referenz_gerade": {"a", "b"},
    "referenz_halbgerade": {"a", "b"},
    "referenz_strecke": {"a", "b"},
    "element_ausblenden": {"element"},
    "element_verwerfen": {"element"},
}
GROESSEN = {"x", "y", "z", "rx", "ry", "rz"}


def werkzeugliste() -> list[dict]:
    return ki_pruefen(["werkzeuge"])["werkzeuge"]


def test_genau_die_acht_werkzeuge_aus_dem_register():
    """Requirement „Werkzeuge aus dem Befehlsregister“, Scenario „Genau die acht Werkzeuge“: 8 Werkzeuge mit den
    genannten Namen; zu jedem genau ein Befehl mit `ki: true` und passender ID in `src/befehle.json`; kein anderer
    Befehl hat `ki: true`; keiner aus der Familie Freigabe."""
    liste = werkzeugliste()
    assert sorted(w["name"] for w in liste) == sorted(WERKZEUGE), [w["name"] for w in liste]
    ki_befehle = [b for b in register() if b.get("ki") is True]
    assert len(ki_befehle) == 8, [b["id"] for b in ki_befehle]
    assert not any(b.get("familie") == "Freigabe" for b in ki_befehle)
    for w in liste:
        passend = [b for b in ki_befehle if b["id"].replace(".", "_").replace("-", "_") == w["name"]]
        assert len(passend) == 1, (w["name"], [b["id"] for b in ki_befehle])
        assert w["befehl"] == passend[0]["id"], w
    assert not [b["id"] for b in register() if b.get("ki") not in (None, False, True)]


def test_schema_flach_und_beschreibung_mit_beispiel():
    """Scenario „Schema und Beschreibung für kleine Modelle“: jedes `inputSchema` gültig (2020-12), 0 Eigenschaften
    vom Typ `object` oder `array`, Längen und Winkel `type: string`, Pflichtfelder genau wie in design.md Abschnitt 2,
    jede `description` mit genau einem Beispielaufruf, der gegen das eigene Schema gültig ist."""
    jsonschema = need_module("jsonschema")
    liste = werkzeugliste()
    assert len(liste) == 8
    for w in liste:
        schema = w["inputSchema"]
        jsonschema.Draft202012Validator.check_schema(schema)
        eig = schema.get("properties", {})
        assert not [n for n, s in eig.items() if s.get("type") in ("object", "array")], w["name"]
        assert all(s.get("type") == "string" for s in eig.values()), (w["name"], eig)
        for n in GROESSEN & set(eig):
            assert "pattern" in eig[n], (w["name"], n)
        assert set(schema.get("required", [])) == ERFORDERLICH[w["name"]], (w["name"], schema.get("required"))
        beschr = w["description"]
        assert beschr.count("Beispiel: ") == 1, beschr
        rest = beschr.split("Beispiel: ", 1)[1]
        beispiel, ende = json.JSONDecoder().raw_decode(rest)
        assert isinstance(beispiel, dict) and rest[ende:].strip() == "", beschr
        jsonschema.Draft202012Validator(schema).validate(beispiel)
    # Eine Zahl ohne Einheit ist schon vom Schema her keine Größe
    punkt = next(w for w in liste if w["name"] == "referenz_punkt")["inputSchema"]
    assert list(jsonschema.Draft202012Validator(punkt).iter_errors({"x": "40"})), (
        "x ohne Einheit muss ungültig sein"
    )


def test_werkzeugergebnis_und_strukturierte_fehler():
    """Requirement „Werkzeugergebnis und Fehler“, Scenario „Erfolg und strukturierte Fehler“: fünf Aufrufe über das
    Testmodell; erstes `ok: true` mit x = 1 200 mm (± 1e-6), übrige `ok: false` mit `unit`, `degenerate`,
    `input_missing`, `unknown_tool` und nicht leerem `hint`; jedes Ergebnis ≤ 600 Zeichen; Entwurf: genau 1 neues
    Element."""
    skript = skript_aufrufe(
        [
            lambda ids: ("referenz_punkt", {"x": "1,2 m", "y": "0 mm", "z": "0 mm"}),
            lambda ids: ("referenz_punkt", {"x": "40", "y": "0 mm", "z": "0 mm"}),
            lambda ids: ("referenz_strecke", {"a": f"{ids[0]}.point", "b": f"{ids[0]}.point"}),
            lambda ids: ("referenz_gerade", {"a": "XYZ.point", "b": f"{ids[0]}.point"}),
            lambda ids: ("element_loeschen", {"element": ids[0]}),
        ]
    )
    with Testmodell(skript) as tm:
        a = KiAblauf()
        a.add("waehlen", befehl="ki.anbieter-waehlen", args={"id": "openai-kompatibel"})
        a.add("senden", chat="Punkt bei 10, 20, 5 mm")
        a.laufen("drahtmodell-leer", env=tm.env())
        assert len(tm.anfragen) >= 6, len(tm.anfragen)
        ergebnisse = werkzeugnachrichten(tm.anfragen[-1])
    assert len(ergebnisse) == 5, ergebnisse
    ok = ergebnisse[0]
    assert ok["ok"] is True and any(abs(x - 1200) <= 1e-6 for x in laengen_in(ok["ausgaenge"])), ok
    for r, code in zip(ergebnisse[1:], ["unit", "degenerate", "input_missing", "unknown_tool"], strict=True):
        assert r["ok"] is False and r["code"] == code, (code, r)
        assert isinstance(r.get("hint"), str) and r["hint"].strip(), r
    assert all(len(r["_roh"]) <= 600 for r in ergebnisse), [len(r["_roh"]) for r in ergebnisse]
    karte = karten(a.s("senden"))[-1]
    assert len(karte["neu"]) == 1, karte["neu"]


def test_verlaufseintrag_urheber_ki():
    """Requirement „Urheber KI“, Scenario „Verlaufseintrag“: Satz aus W2 gesendet und übernommen; der neue
    Verlaufseintrag hat `urheber` = `ki`, `anbieter` = `regel`, `ausgeloest_von` = `mensch`, Befehl `referenz.punkt`."""
    w2 = aufgaben()["W2"]
    a = satz_uebernehmen(w2["zustand"], w2["satz"])
    vorher, nachher = a.s("anfang")["verlauf"], a.s("uebernehmen")["verlauf"]
    neu = nachher[len(vorher) :]
    assert len(neu) == 1, neu
    assert neu[0]["befehl"] == "referenz.punkt", neu
    assert (neu[0]["urheber"], neu[0]["anbieter"], neu[0]["ausgeloest_von"]) == ("ki", "regel", "mensch"), neu
