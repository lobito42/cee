"""AK-1, AK-2: Requirement „Nur Befehle mit Wirkung sichtbar“ und die Scenarios „Keine leeren Menüs“ und
„Taskleiste wechselt Menüs“ des Requirements „Fensteraufbau nach ADR-065“."""

# ruff: noqa: E501

from __future__ import annotations

import re

from menue_helpers import (
    FOLGT_TEXT,
    INVENTAR,
    TASKLEISTEN,
    dropdown_eintraege,
    inventar,
    kontext_arten,
    pruefen,
    register,
    register_nach_id,
    taskleiste,
    titel_de,
)

FOLGT_SPAETER = "Folgt später"


def _folgt_ids() -> set[str]:
    return {b["id"] for b in register() if b.get("folgt")}


def _kontext_eintraege() -> list[str]:
    ids: list[str] = []
    for zustand in (None, "halter", "auswahl"):
        for a in kontext_arten(zustand):
            for zone in ("struktur", "modell"):
                m = a[zone]
                ids += [e["befehl"] for e in m["sichtbar"]]
                ids += [e["befehl"] for g in m["mehr_gruppen"] for e in g["eintraege"]]
                ids += m["kontextaktionen"]
    return ids


def test_keine_platzhalter_in_menues():
    """Scenario „Keine Platzhalter in Menüs“: 0 Einträge mit `folgt: true` in Start-Menü, Dropdowns, Ansichtsleiste,
    „Alle Befehle zeigen“, Kontextmenü (beide Ebenen) und Kontextaktionen; jeder Eintrag mit ID aus dem Register."""
    reg = register_nach_id()
    folgt = _folgt_ids()
    assert len(folgt) >= 1, "Register ohne Platzhalter: Test ohne Aussage"
    for name in TASKLEISTEN:
        t = taskleiste(name)
        orte = {
            "start-menue": t["start_menue"],
            "dropdowns": [e for d in t["dropdowns"] for u in d["untergruppen"] for e in u["eintraege"]],
            "ansichtsleiste": t["ansichtsleiste"],
            "ansichtsleiste-aufklappmenue": t["ansichtsleiste_aufklappmenue"],
            "alle-befehle": t["alle_befehle"]["sichtbar"],
        }
        for ort, eintraege in orte.items():
            for e in eintraege:
                assert e["befehl"] in reg, (name, ort, e)
                assert e["befehl"] not in folgt and e["folgt"] is False, (name, ort, e)
        # eingeklappter Abschnitt „Folgt später“ enthält nur Platzhalter
        for e in t["alle_befehle"]["folgt_spaeter"]:
            assert e["befehl"] in folgt, (name, e)
    kontext = _kontext_eintraege()
    assert kontext, "kein Kontextmenü gelesen"
    for befehl in kontext:
        assert befehl in reg and befehl not in folgt, befehl


def test_jeder_sichtbare_eintrag_wirkt():
    """Scenario „Jeder sichtbare Eintrag wirkt“: je Eintrag aus frischem Zustand genau ein neuer `ausgeloest()`-Eintrag
    mit `wirkung: true`, 0-mal „folgt in einer späteren Stufe“, 0 Konsolenfehler."""
    r = pruefen("ausloesen")
    assert {z["zustand"] for z in r["zustaende"]} == {"halter", "auswahl"}, [
        z["zustand"] for z in r["zustaende"]
    ]
    for z in r["zustaende"]:
        assert z["eintraege"], f"{z['zustand']}: keine Einträge gelesen"
        menues = {e["menue"] for e in z["eintraege"]}
        assert {"start-menue", "kontextmenue", "kontextaktion"} <= menues, (z["zustand"], menues)
        assert any(m.startswith("dropdown:") for m in menues), (z["zustand"], menues)
        for e in z["eintraege"]:
            eigene = [a for a in e["ausgeloest_neu"] if a["befehl"] == e["befehl"]]
            assert len(e["ausgeloest_neu"]) == 1 and len(eigene) == 1, (z["zustand"], e)
            assert eigene[0]["wirkung"] is True, (z["zustand"], e)
            assert e["folgt_texte"] == 0, (z["zustand"], e)
            assert e["konsolenfehler"] == [], (z["zustand"], e)


def _wort_menge(text: str) -> set[str]:
    return {w for w in re.findall(r"\w+", text.casefold()) if len(w) > 2}


def _nur_platzhalter_eingabe() -> str:
    """Erster `folgt`-Befehl, dessen deutscher Titel kein Wort mit einem Befehl mit Wirkung teilt (design.md, 7)."""
    reg = register_nach_id()
    wirkende = set()
    for b in reg.values():
        if not b.get("folgt"):
            wirkende |= _wort_menge(titel_de(b["id"]))
    for b in register():
        if b.get("folgt"):
            titel = titel_de(b["id"])
            if titel and not (_wort_menge(titel) & wirkende):
                return titel
    raise AssertionError("kein Platzhalter mit eigenem Titel im Register")


def _suche():
    nur = _nur_platzhalter_eingabe()
    eingaben = ["ansicht", "auswahl", "baugruppe", nur]
    # die Eingabe „ansicht“ trifft Ansichtsbefehle mit Wirkung und Platzhalter; ihr „Folgt später“-Treffer wird geklickt
    return (
        nur,
        eingaben,
        pruefen("suche", *[x for e in eingaben for x in ("--eingabe", e)], "--klick", "ansicht"),
    )


def test_platzhalter_nur_am_ende_der_suche():
    """Scenario „Platzhalter nur am Ende der Suche“: „Folgt später“ ist letzte Gruppe, ≤ 3 sichtbar, nie erster
    Treffer; Enter löst nie einen Platzhalter aus; bei reinen Platzhaltern bleibt das Modell gleich."""
    folgt = _folgt_ids()
    nur, eingaben, r = _suche()
    assert [e["text"] for e in r["eingaben"]] == eingaben
    mit_platzhaltern = 0
    for e in r["eingaben"]:
        gruppen = e["gruppen"]
        hat = [g for g in gruppen if any(t["folgt"] for t in g["treffer"])]
        if hat:
            mit_platzhaltern += 1
            assert gruppen[-1]["name"] == FOLGT_SPAETER, (e["text"], [g["name"] for g in gruppen])
            assert [g["name"] for g in hat] == [FOLGT_SPAETER], (e["text"], [g["name"] for g in hat])
            assert sum(1 for t in gruppen[-1]["treffer"] if t["sichtbar"]) <= 3, e["text"]
            assert all(t["folgt"] for t in gruppen[-1]["treffer"]), e["text"]
        assert FOLGT_SPAETER not in [g["name"] for g in gruppen[:-1]], e["text"]
        et = e["erster_treffer"]
        assert et is None or (et["folgt"] is False and et["befehl"] not in folgt), (e["text"], et)
        for a in e["enter"]["ausgeloest_neu"]:
            assert a["befehl"] not in folgt and a["wirkung"] is True, (e["text"], a)
    assert mit_platzhaltern >= 2, f"nur {mit_platzhaltern} Eingaben mit Platzhaltern"
    letzte = next(e for e in r["eingaben"] if e["text"] == nur)
    assert letzte["gruppen"] and all(t["folgt"] for g in letzte["gruppen"] for t in g["treffer"]), (
        nur,
        letzte,
    )
    assert letzte["erster_treffer"] is None or letzte["erster_treffer"]["folgt"] is False
    assert letzte["enter"]["modell_hash_vorher"] == letzte["enter"]["modell_hash_nachher"], letzte["enter"]
    assert not [a for a in letzte["enter"]["ausgeloest_neu"] if a["wirkung"]], letzte["enter"]


def test_platzhalter_anklicken_aendert_nichts():
    """Scenario „Platzhalter anklicken ändert nichts“: Modell, Ansicht und Protokoll unverändert, Rückmeldung genau
    einmal „<Titel> folgt in einer späteren Stufe.“"""
    k = _suche()[2]["klick"]
    assert k["modell_hash_vorher"] == k["modell_hash_nachher"], k
    assert k["ansicht_vorher"] == k["ansicht_nachher"], k
    assert k["protokoll_laenge_vorher"] == k["protokoll_laenge_nachher"], k
    titel = k["treffer"]["titel"]
    assert k["treffer"]["befehl"] in _folgt_ids() and titel
    erwartet = f"{titel} {FOLGT_TEXT}."
    assert [t for t in k["rueckmeldungen"] if t.strip() == erwartet] == [erwartet], (
        erwartet,
        k["rueckmeldungen"],
    )


def test_jeder_beta_befehl_hat_weiter_einen_ort():
    """Scenario „Jeder Beta-Befehl hat weiter einen Ort“: jeder Beta-Befehl aus dem Inventar im Register mit
    mindestens einem Ort; Platzhalter nur mit Ort `suche-folgt`."""
    beta = [b for b in inventar() if b.get("beta")]
    assert beta, "Inventar ohne Beta-Befehle"
    folgt = _folgt_ids()
    r = pruefen("inventar", "--datei", str(INVENTAR), frisch=True)
    nach_id = {b["id"]: b for b in r["befehle"]}
    platzhalter = 0
    for b in beta:
        e = nach_id.get(b["id"])
        assert e is not None and e["im_register"] is True, (b["id"], e)
        assert e["orte"], (b["id"], "kein Ort")
        assert e["wirkung"] is (b["id"] not in folgt), (b["id"], e)
        if b["id"] in folgt:
            platzhalter += 1
            assert e["orte"] == ["suche-folgt"], (b["id"], e["orte"])
        else:
            assert "suche-folgt" not in e["orte"], (b["id"], e["orte"])
    assert platzhalter >= 1, "kein Beta-Befehl ist Platzhalter: Test ohne Aussage"


def test_keine_leeren_menues():
    """Scenario „Keine leeren Menüs“: 0 Dropdowns und 0 Untergruppen ohne Eintrag; Start-Menü enthält
    `element.anlegen`; jede Untergruppe ≤ 12."""
    for name in TASKLEISTEN:
        t = taskleiste(name)
        for d in t["dropdowns"]:
            assert d["untergruppen"], (name, d["name"], "leeres Dropdown")
            for u in d["untergruppen"]:
                assert 1 <= len(u["eintraege"]) <= 12, (name, d["name"], u["name"], len(u["eintraege"]))
        assert "element.anlegen" in [e["befehl"] for e in t["start_menue"]], (name, t["start_menue"])


def test_taskleiste_simulation_ohne_dropdowns():
    """Scenario „Taskleiste wechselt Menüs“: bei „Simulation“ 0 Dropdowns (alle Befehle Platzhalter), Start-Menü,
    Suche, Rückgängig und Schalter bleiben; Leerer Zustand „simuliert“; Rückweg stellt alles wieder her."""
    t = pruefen("fenster")["taskleiste"]
    assert t["vorher"]["dropdowns"], "Modellieren hat Dropdowns"
    assert t["simulation"]["dropdowns"] == [], t["simulation"]["dropdowns"]
    assert t["simulation"]["leerer_zustand"] is True
    assert any("simuliert" in x.lower() for x in t["simulation"]["struktur_texte"])
    assert t["zurueck"]["dropdowns"] == t["vorher"]["dropdowns"]
    assert t["zurueck"]["struktur_texte"] == t["vorher"]["struktur_texte"]
    assert t["zurueck"]["auswahl"] == t["vorher"]["auswahl"]
    sim = taskleiste("Simulation")
    assert sim["dropdowns"] == [] and dropdown_eintraege(sim) == []
    assert "element.anlegen" in [e["befehl"] for e in sim["start_menue"]]
    halter = next(e for e in pruefen("fenster")["zustaende"] if e["zustand"] == "halter")["menueleiste"]
    assert (
        halter["start_menue"] is True
        and halter["suche"]["kuerzel_text"]
        and halter["rueckgaengig"]["kuerzel_text"]
    )
