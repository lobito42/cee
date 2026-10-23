"""AK-3: Requirement „Fensteraufbau nach ADR-065“ (Maße aus design.md, Bezugsgröße 1440 × 900 px)."""

# ruff: noqa: E501

from __future__ import annotations

from grundlagen_helpers import FENSTER, pruefen, register_nach_id, zone

TOL = 2
ZONEN = ["menueleiste", "taskleiste", "struktur", "modell", "eigenschaften", "chat", "panel", "rueckmeldung"]


def _fenster() -> dict:
    f = pruefen("fenster")
    assert {e["zustand"] for e in f["zustaende"]} == {"halter", "befund", "chat"}
    return f


def _eintrag(zustand: str) -> dict:
    return next(e for e in _fenster()["zustaende"] if e["zustand"] == zustand)


def _sichtbar(e: dict, name: str) -> bool:
    treffer = [z for z in e["zonen"] if z["zone"] == name]
    return bool(treffer) and treffer[0]["sichtbar"]


def test_zonen_in_lage_und_groesse():
    """Scenario „Zonen in Lage und Größe“: Maße ± 2 px, Modell ≥ 45 % der Fläche, Eigenschaften und Chat sichtbar,
    Panel nur im Zustand `befund`."""
    for e in _fenster()["zustaende"]:
        b, h = e["fenster"]["breite"], e["fenster"]["hoehe"]
        assert (b, h) == FENSTER
        namen = {z["zone"] for z in e["zonen"]}
        assert {
            "menueleiste",
            "taskleiste",
            "struktur",
            "modell",
            "eigenschaften",
            "chat",
            "rueckmeldung",
        } <= namen, namen
        assert namen <= set(ZONEN), namen
        r = {n: zone(e, n)["rechteck"] for n in namen}
        for n in namen:
            if _sichtbar(e, n):
                assert r[n]["x"] >= -TOL and r[n]["y"] >= -TOL, (e["zustand"], n)
                assert r[n]["x"] + r[n]["breite"] <= b + TOL and r[n]["y"] + r[n]["hoehe"] <= h + TOL, (
                    e["zustand"],
                    n,
                )
        m = r["menueleiste"]
        assert (
            abs(m["y"]) <= TOL
            and abs(m["x"]) <= TOL
            and abs(m["breite"] - b) <= TOL
            and m["hoehe"] <= 40 + TOL
        )
        t = r["taskleiste"]
        assert abs(t["x"]) <= TOL and 40 - TOL <= t["breite"] <= 56 + TOL, t
        s = r["struktur"]
        assert 220 - TOL <= s["breite"] <= 320 + TOL, s
        assert s["x"] >= t["x"] + t["breite"] - TOL, "Struktur liegt rechts der Taskleiste"
        mo = r["modell"]
        assert mo["x"] >= s["x"] + s["breite"] - TOL, "Modell liegt rechts der Struktur"
        assert mo["breite"] * mo["hoehe"] >= 0.45 * b * h, (e["zustand"], mo)
        ei, c = r["eigenschaften"], r["chat"]
        assert 260 - TOL <= ei["breite"] <= 360 + TOL and abs(ei["breite"] - c["breite"]) <= TOL, (ei, c)
        assert abs(ei["x"] + ei["breite"] - b) <= TOL and abs(c["x"] - ei["x"]) <= TOL
        assert ei["y"] < c["y"], "Eigenschaften oben, Chat unten"
        assert _sichtbar(e, "eigenschaften") and _sichtbar(e, "chat"), e["zustand"]
        rm = r["rueckmeldung"]
        assert (
            rm["hoehe"] <= 28 + TOL and abs(rm["y"] + rm["hoehe"] - h) <= TOL and abs(rm["breite"] - b) <= TOL
        ), rm
        if e["zustand"] == "befund":
            p = r["panel"]
            assert _sichtbar(e, "panel") and 160 - TOL <= p["hoehe"] <= 320 + TOL, p
            assert p["y"] >= mo["y"] + mo["hoehe"] - TOL, "Panel unter dem Modell"
        else:
            assert not _sichtbar(e, "panel"), f"Panel im Zustand {e['zustand']} sichtbar"


def test_menueleiste_und_schalter():
    """Scenario „Menüleiste und Schalter“: Mod+B/Mod+J/Mod+Alt+B und dieselben Klicks blenden genau ihre Zone
    aus bzw. ein; Start-Menü, Dropdown, Suche und Rückgängig mit Kürzel."""
    f = _fenster()
    erwartet = {"Mod+B": {"struktur"}, "Mod+J": {"panel"}, "Mod+Alt+B": {"eigenschaften", "chat"}}
    befehle = {
        "fenster.struktur": {"struktur"},
        "fenster.panel": {"panel"},
        "fenster.rechts": {"eigenschaften", "chat"},
    }

    def geaendert(s: dict) -> set[str]:
        return {z for z in s["vorher"] if s["vorher"][z] != s["nachher"].get(z)}

    tasten = f["schalter"]["tasten"]
    assert [s["taste"] for s in tasten] == list(erwartet), [s["taste"] for s in tasten]
    for s in tasten:
        assert geaendert(s) == erwartet[s["taste"]], (s["taste"], geaendert(s))
    klicks = f["schalter"]["klicks"]
    assert [k["befehl"] for k in klicks] == list(befehle), [k["befehl"] for k in klicks]
    for k in klicks:
        assert geaendert(k) == befehle[k["befehl"]], (k["befehl"], geaendert(k))
    halter = next(e for e in f["zustaende"] if e["zustand"] == "halter")
    m = halter["menueleiste"]
    assert m["start_menue"] is True
    assert len(m["dropdowns"]) >= 1
    assert "K" in m["suche"]["kuerzel_text"].upper(), m["suche"]
    assert "Z" in m["rueckgaengig"]["kuerzel_text"].upper(), m["rueckgaengig"]


def test_nur_dokument_reiter():
    """Scenario „Nur Dokument-Reiter“: genau 2 role=tab (Halter, Sensorgehäuse) in der Reiterzeile über dem Modell,
    kein Dropdown mit mehr als 12 Einträgen je Untergruppe, jeder Eintrag ein Befehl des Registers."""
    reg = register_nach_id()
    for e in _fenster()["zustaende"]:
        assert len(e["tabs"]) == 2, (e["zustand"], e["tabs"])
        assert [t["text"] for t in e["tabs"]] == ["Halter", "Sensorgehäuse"], e["tabs"]
        rz, mo = e["reiterzeile"], zone(e, "modell")["rechteck"]
        assert rz["y"] <= mo["y"] + 48 and rz["x"] >= mo["x"] - TOL, (rz, mo)
        for t in e["tabs"]:
            r = t["rechteck"]
            assert r["x"] >= rz["x"] - TOL and r["y"] >= rz["y"] - TOL
            assert r["x"] + r["breite"] <= rz["x"] + rz["breite"] + TOL
            assert r["y"] + r["hoehe"] <= rz["y"] + rz["hoehe"] + TOL
        for d in e["menueleiste"]["dropdowns"]:
            assert d["untergruppen"], d["name"]
            for u in d["untergruppen"]:
                assert 1 <= len(u["eintraege"]) <= 12, (d["name"], u["name"], len(u["eintraege"]))
                for ei in u["eintraege"]:
                    assert ei["befehl"] in reg, f"Dropdown-Eintrag {ei['befehl']} nicht im Register"


def test_taskleiste_wechselt_menues():
    """Scenario „Taskleiste wechselt Menüs“: Wechsel Modellieren → Simulation ändert die Dropdowns, Struktur zeigt
    Leeren Zustand „simuliert“; Rückweg stellt Menüs, Struktur und Auswahl wieder her."""
    t = _fenster()["taskleiste"]
    assert t["vorher"]["auswahl"], "vor dem Wechsel ist etwas gewählt"
    assert t["vorher"]["dropdowns"], "Dropdowns vor dem Wechsel"
    assert t["simulation"]["dropdowns"] != t["vorher"]["dropdowns"], t
    assert t["simulation"]["leerer_zustand"] is True
    assert any("simuliert" in x.lower() for x in t["simulation"]["struktur_texte"]), t["simulation"][
        "struktur_texte"
    ]
    assert t["zurueck"]["dropdowns"] == t["vorher"]["dropdowns"]
    assert t["zurueck"]["struktur_texte"] == t["vorher"]["struktur_texte"]
    assert t["zurueck"]["auswahl"] == t["vorher"]["auswahl"]
