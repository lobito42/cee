"""AK-6, AK-7: Requirements „Elemente anlegen, ändern und verwerfen“ und „Kontextmenü aus dem Befehlsregister“."""

# ruff: noqa: E501

from __future__ import annotations

import json

from grundlagen_helpers import (
    INVENTAR,
    P,
    elemente,
    inventar,
    kanon,
    name_von,
    pruefen,
    register,
    register_nach_id,
    verworfen,
)

# design.md „Anlegen, ändern, verwerfen“: Operation -> (Befehl, Wege)
OPERATIONEN = {
    "anlegen": ("element.anlegen", {"menue", "suche", "kontextmenue", "chat"}),
    "umbenennen": ("element.umbenennen", {"kontextmenue", "suche", "kuerzel", "eigenschaften"}),
    "duplizieren": ("element.duplizieren", {"menue", "kontextmenue", "suche", "chat", "kuerzel"}),
    "verwerfen": ("element.verwerfen", {"kontextmenue", "suche", "kuerzel", "chat"}),
    "wert-setzen": ("element.wert-setzen", {"eigenschaften", "griff", "chat"}),
}
# design.md „Befehlsregister und Platzierung“: Familie -> Ort (Bezeichner des Prüfwerkzeugs; Kontextmenü und Suche
# sind zusätzliche Wege und zählen nicht als Ort)
PLATZIERUNG = {
    "Datei": "start-menue",
    "Bearbeiten": "dropdown-bearbeiten",
    "Auswahl": "dropdown-auswahl",
    "Ansicht": "ansichtsleiste",
    "Sichtbarkeit": "auge",
    "Ansicht speichern": "ansichtsleiste",
    "Fenster": "menueleiste",
    "Baugruppe": "dropdown-baugruppe",
    "Hilfe": "suche",
}
ZUSATZWEGE = {"kontextmenue", "suche"}
BEZUG_PASST = {
    "teil": {"keine", "element", "teil"},
    "schritt": {"keine", "element"},
    "kante": {"keine", "kante"},
    "baugruppe": {"keine", "element", "baugruppe"},
    "mehrfach": {"keine", "mehrfach"},
    "keine": {"keine"},
}


# --- AK-6 ---------------------------------------------------------------------------------------------------


def test_ein_befehl_viele_wege():
    """Scenario „Ein Befehl, viele Wege“: je Operation auf allen Wegen derselbe Befehl (gleiche id, nur `weg`
    verschieden), jeder Weg genau ein Verlaufseintrag."""
    ops = pruefen("crud")["operationen"]
    for operation, (befehl, wege) in OPERATIONEN.items():
        eintraege = [o for o in ops if o["operation"] == operation]
        assert {o["weg"] for o in eintraege} >= wege, (operation, wege - {o["weg"] for o in eintraege})
        assert len({o["weg"] for o in eintraege}) == len(eintraege), f"{operation}: Weg doppelt gemessen"
        for o in eintraege:
            assert o["befehl"] == befehl, (operation, o["weg"], o["befehl"])
            assert len(o["protokoll_neu"]) == 1, (operation, o["weg"], o["protokoll_neu"])
            p = o["protokoll_neu"][0]
            assert p["befehl"] == befehl and p["weg"] == o["weg"], (operation, p)
            assert o["verlauf_neu"] == 1, (operation, o["weg"], o["verlauf_neu"])
    assert {b for b, _ in OPERATIONEN.values()} <= set(register_nach_id()), "Befehle fehlen im Register"


def test_verwerfen_statt_loeschen():
    """Scenario „Verwerfen statt Löschen“: verworfen nicht gezeichnet, aber in `modell()` gekennzeichnet; mit
    „Verworfenes zeigen“ durchgestrichen in der Struktur; nach Zurückholen gleicher Modellstand; 0 Abfragen."""
    v = pruefen("crud")["verwerfen"]
    bohrungen = [e for e in elemente(v["vorher"]["modell"]) if name_von(e) == "Bohrungen"]
    assert len(bohrungen) == 1
    bid = bohrungen[0]["id"]
    assert not verworfen(bohrungen[0])
    nach = [e for e in elemente(v["nach"]["modell"]) if e["id"] == bid]
    assert len(nach) == 1 and verworfen(nach[0]), "verworfenes Element muss im Modell bleiben, gekennzeichnet"
    assert bid not in v["nach"]["gezeichnet"], "verworfenes Element wird nicht gezeichnet"
    zeilen = [z for z in v["mit_zeigen"]["struktur"] if z["name"] == "Bohrungen"]
    assert len(zeilen) == 1 and zeilen[0]["durchgestrichen"] is True, zeilen
    assert kanon(v["zurueck"]["modell"]) == kanon(v["vorher"]["modell"]), "Modell nach Zurückholen weicht ab"
    assert v["zurueck"]["modell_hash"] == v["vorher"]["modell_hash"]
    assert v["dialoge"] == 0, f"{v['dialoge']} Abfragen"


def test_rueckgaengig_wirkt_ueberall_gleich():
    """Scenario „Rückgängig wirkt überall gleich“: Dicke über Eigenschaften, Griff, Chat geändert; je ein Undo mit
    Fokus in Struktur, Modell, Chat nimmt genau einen Eintrag zurück, danach Ausgangsstand; Wiederholen stellt in
    gleicher Reihenfolge her; auch Rückgängig über die Menüleiste nimmt genau einen Eintrag zurück."""
    r = pruefen("crud")["rueckgaengig"]
    schritte = r["schritte"]
    assert [s["weg"] for s in schritte] == ["eigenschaften", "griff", "chat"], schritte
    dicken = [r["ausgang"]["dicke_mm"]] + [s["dicke_mm"] for s in schritte]
    assert all(a != b for a, b in zip(dicken, dicken[1:], strict=False)), (
        f"jede Änderung muss die Dicke ändern: {dicken}"
    )
    assert [s["verlauf"] for s in schritte] == [schritte[0]["verlauf"] + i for i in range(3)], (
        "ein Eintrag je Änderung"
    )
    undo = r["undo"]
    assert [u["fokus"] for u in undo] == ["struktur", "modell", "chat"], undo
    verlauf = [s["verlauf"] for s in schritte]
    assert [u["verlauf_nachher"] for u in undo] == [verlauf[2] - 1, verlauf[1] - 1, verlauf[0] - 1]
    assert [u["dicke_mm"] for u in undo] == [dicken[2], dicken[1], dicken[0]], (undo, dicken)
    assert kanon(undo[-1]["modell"]) == kanon(r["ausgang"]["modell"]), (
        "nach drei Undo nicht der Ausgangsstand"
    )
    redo = r["redo"]
    assert [x["dicke_mm"] for x in redo] == dicken[1:], (redo, dicken)
    assert [x["verlauf_nachher"] for x in redo] == verlauf
    m = r["undo_menue"]
    assert m["verlauf_nachher"] == m["verlauf_vorher"] - 1, m
    assert m["dicke_mm"] == dicken[2], m


# --- AK-7 ---------------------------------------------------------------------------------------------------


def test_kontextmenue_gleich_in_struktur_und_modell():
    """Scenario „Gleich in Struktur und Modell“: für 6 Auswahlarten identische Listen in beiden Zonen, jede Gruppe
    ≤ 12 Einträge, jeder Eintrag ein Register-Befehl mit passendem `bezug`."""
    reg = register_nach_id()
    arten = pruefen("kontextmenue")["arten"]
    assert [a["art"] for a in arten] == ["teil", "schritt", "kante", "baugruppe", "mehrfach", "keine"]
    reihenfolgen = []
    for a in arten:
        assert a["struktur"]["gruppen"] == a["modell"]["gruppen"], (
            f"{a['art']}: Struktur und Modell unterscheiden sich"
        )
        gruppen = a["struktur"]["gruppen"]
        assert gruppen, f"{a['art']}: leeres Kontextmenü"
        for g in gruppen:
            assert 1 <= len(g["eintraege"]) <= 12, (a["art"], g["name"], len(g["eintraege"]))
            for e in g["eintraege"]:
                assert e["befehl"] in reg, (a["art"], e["befehl"])
                assert reg[e["befehl"]]["bezug"] in BEZUG_PASST[a["art"]], (
                    a["art"],
                    e["befehl"],
                    reg[e["befehl"]]["bezug"],
                )
            sichtbar = [e for e in g["eintraege"] if not e["mehr"]]
            raenge = [reg[e["befehl"]]["rang"] for e in sichtbar]
            assert raenge == sorted(raenge), (a["art"], g["name"], "nicht nach rang geordnet")
        # Einspruch (ap-41c, design.md Abschnitt 3): „Mehr …“ entscheidet künftig der Rang, nicht `wesentlich`;
        # die Prüfung dazu (≤ 8 sichtbar, „Mehr …“ nur bei > 8) liegt in tests/acceptance/ap-41c-ux-schlankes-menue.
        reihenfolgen.append([g["name"] for g in gruppen])
    # feste Reihenfolge der Familien: je zwei Auswahlarten dieselbe relative Reihenfolge gemeinsamer Gruppen
    for i, a in enumerate(reihenfolgen):
        for b in reihenfolgen[i + 1 :]:
            gemeinsam = [g for g in a if g in b]
            assert gemeinsam == [g for g in b if g in a], (a, b)


def test_register_erzeugt_menues_nicht_von_hand():
    """Scenario „Erzeugt, nicht von Hand“: ein neuer Befehl der Familie „Bearbeiten“ mit `bezug: element` erscheint
    ohne weitere Änderung im Kontextmenü, im Dropdown „Bearbeiten“ und in der Suche."""
    basis = register()
    probe = {
        "id": "test.probe",
        "familie": "Bearbeiten",
        "titel": "Testbefehl Probe",
        "parameter": [],
        "bezug": "element",
        "rang": 99,
        "wesentlich": True,
    }
    datei = P / "dist" / "register-probe.json"
    datei.write_text(json.dumps([*basis, probe]), "utf-8")
    try:
        r = pruefen("registerprobe", "--register", datei.name, "--suche", "Probe", frisch=True)
    finally:
        datei.unlink(missing_ok=True)
    gruppen = {g["name"]: [e["befehl"] for e in g["eintraege"]] for g in r["kontextmenue_element"]}
    assert "Bearbeiten" in gruppen and "test.probe" in gruppen["Bearbeiten"], gruppen
    assert "test.probe" in [e["befehl"] for e in r["dropdown_bearbeiten"]], r["dropdown_bearbeiten"]
    assert "test.probe" in [e["befehl"] for e in r["suche_treffer"]], r["suche_treffer"]


def test_kontextaktionen_sind_der_anfang_des_menues():
    """Scenario „Kontextaktionen sind der Anfang des Menüs“: im Zustand `auswahl` höchstens 5 Kontextaktionen,
    gleich den ersten Einträgen des Kontextmenüs nach `rang`."""
    reg = register_nach_id()
    m = pruefen("kontextmenue")["kontextaktionen_auswahl"]
    aktionen = m["kontextaktionen"]
    assert 1 <= len(aktionen) <= 5, aktionen
    assert aktionen == m["menue_nach_rang"][: len(aktionen)], (aktionen, m["menue_nach_rang"][:6])
    raenge = [reg[b]["rang"] for b in m["menue_nach_rang"]]
    assert raenge == sorted(raenge), "menue_nach_rang nicht nach rang geordnet"
    im_menue = {e["befehl"] for g in m["gruppen"] for e in g["eintraege"]}
    assert set(m["menue_nach_rang"]) == im_menue and set(aktionen) <= im_menue
    rest = [reg[b]["rang"] for b in m["menue_nach_rang"][len(aktionen) :]]
    assert not rest or max(reg[b]["rang"] for b in aktionen) <= min(rest), (
        "Kontextaktionen sind nicht die ersten nach rang"
    )


def test_jeder_beta_befehl_hat_einen_ort():
    """Scenario „Jeder Beta-Befehl hat einen Ort“ (Referenzdaten des Kernteams): jede Familie genau ein Ort nach der
    Platzierungstabelle, jeder Beta-Befehl über Ort oder Suche erreichbar, 0 Untergruppen > 12."""
    daten = inventar()
    beta = [b for b in daten if b.get("beta")]
    assert beta, "Inventar ohne Beta-Befehle"
    familien = {b["familie"] for b in beta}
    unbekannt = familien - set(PLATZIERUNG)
    assert not unbekannt, f"Familien ohne Ort in der Platzierungstabelle: {sorted(unbekannt)}"
    r = pruefen("inventar", "--datei", str(INVENTAR), frisch=True)
    nach_id = {b["id"]: b for b in r["befehle"]}
    for b in beta:
        e = nach_id.get(b["id"])
        assert e is not None, f"{b['id']} fehlt im Prototyp"
        assert e["im_register"] is True and e["suche_findet"] is True, (b["id"], e)
        assert e["orte"], (b["id"], "kein Ort")
    for familie in familien:
        # Zusatzwege zählen nicht als Ort, außer der Ort der Familie ist selbst einer (Hilfe: nur über die Suche)
        orte = {o for b in beta if b["familie"] == familie for o in nach_id[b["id"]]["orte"]} - (
            ZUSATZWEGE - {PLATZIERUNG[familie]}
        )
        assert orte == {PLATZIERUNG[familie]}, (familie, orte)
    for d in r["dropdowns"]:
        for u in d["untergruppen"]:
            assert u["anzahl"] <= 12, (d["name"], u["name"], u["anzahl"])
