"""ap-50, Capability `drahtmodell-vorschau`: Bedienung der Wireframe-Basics im Prototyp (AK-12 bis AK-16).

Das Prüfwerkzeug (`pruefen -- drahtmodell …`) spielt echte Eingaben in der Vorschau mit Brücke und Worker und liefert
Rohdaten; alle Urteile (Zählen, Vergleichen, Nachrechnen der Lagen, Median) fällt der Test. Formen der Schritte und
Schnappschüsse stehen in `wf_helpers.py`. Das Scenario „Ausprobieren“ ist `[mensch]` und hier kein Test.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import statistics
from urllib.parse import urlparse

from menue_helpers import MAX_AKTIONEN, MAX_GRUPPE, dropdown_eintraege, pruefen, register_nach_id, taskleiste
from wf_helpers import (
    Ablauf,  # noqa: F401,I001  (setzt den Suchpfad für menue_helpers)
    alle,
    beispiel,
    ergebnis_lage,
    flach,
    groesse_in,
    lage_frame,
    mal_v,
    minus,
    nahe,
    plus,
    schritte_ablauf,
    szene_von,
    vec,
    wurzeln,
)

SECHS = {
    "referenz.koordinatensystem": "keine",
    "referenz.punkt": "keine",
    "referenz.punkt-relativ": "kontext",
    "referenz.gerade": "kontext",
    "referenz.halbgerade": "kontext",
    "referenz.strecke": "kontext",
}


def _transponiert_mal(r, v):
    return tuple(sum(r[k][i] * v[k] for k in range(3)) for i in range(3))


# --- AK-12 ---------------------------------------------------------------------------------------------


def test_befehle_im_register_mit_ort_und_wirkung():
    """Requirement „Befehle im Register mit echter Wirkung“, Scenarios „Orte und Grenzen“ (6 Befehle ohne `folgt`, in
    Dropdown „Referenz“ und Suche, Kontextaktionen nach Bezug, Dropdown ≤ 12, Kontextmenü ≤ 5 Aktionen) und „Jeder
    Befehl wirkt“ (`graph_hash` ändert sich in 6 von 6 Fällen, keine Konsolenfehler)."""
    r = pruefen("drahtmodell", "befehle")
    befehle = {b["id"]: b for b in r["befehle"]}
    assert set(befehle) == set(SECHS), sorted(befehle)
    reg = register_nach_id()
    for id, bezug in SECHS.items():
        b = befehle[id]
        assert b["folgt"] is False and not reg[id].get("folgt"), id
        assert {"dropdown", "suche"} <= set(b["orte"]), (id, b["orte"])
        assert ("kontextaktion" in b["orte"]) == (bezug == "kontext"), (id, b["orte"])

    t = taskleiste("Modellieren")
    referenz = [d for d in t["dropdowns"] if d["name"] == "Referenz"]
    assert len(referenz) == 1, [d["name"] for d in t["dropdowns"]]
    eintraege = [e["befehl"] for u in referenz[0]["untergruppen"] for e in u["eintraege"]]
    assert set(SECHS) <= set(eintraege) and len(eintraege) <= MAX_GRUPPE, eintraege
    assert set(SECHS) <= {e["befehl"] for e in dropdown_eintraege(t)}
    km = pruefen("kontextmenue", "--zustand", "drahtmodell-beispiel")
    ms = [m for a in km["arten"] for m in (a["struktur"], a["modell"])] + [km["kontextaktionen_auswahl"]]
    assert ms and all(len(m["kontextaktionen"]) <= MAX_AKTIONEN for m in ms), [
        len(m["kontextaktionen"]) for m in ms
    ]

    auswahl = {
        "referenz.koordinatensystem": [],
        "referenz.punkt": [{"befehl": "referenz.punkt"}, {"klick": {"modell_mm": [20, 30, 0]}}],
        "referenz.punkt-relativ": [{"klick": {"element": "P1"}}],
        "referenz.gerade": [{"klick": {"element": "P1"}}, {"klick": {"element": "P2", "umschalt": True}}],
        "referenz.halbgerade": [{"klick": {"element": "P1"}}, {"klick": {"element": "P2", "umschalt": True}}],
        "referenz.strecke": [{"klick": {"element": "P1"}}, {"klick": {"element": "P2", "umschalt": True}}],
    }
    for id, vorher in auswahl.items():
        schritte = [{"warten_ms": 0}, *vorher]
        if id != "referenz.punkt":
            schritte.append({"befehl": id})
        s = schritte_ablauf("drahtmodell-beispiel", schritte)
        assert s[-1]["graph_hash"] != s[0]["graph_hash"], f"{id} ändert den Graphen nicht"
        assert all(x["konsolenfehler"] == [] for x in s), (id, [x["konsolenfehler"] for x in s])


# --- AK-13 ---------------------------------------------------------------------------------------------


def fluss() -> Ablauf:
    """Ablauf „Koordinatensystem, Punkte, Linien“ im Zustand `drahtmodell-leer`."""
    a = Ablauf()
    a.add("k", befehl="referenz.koordinatensystem")
    a.add("warm", warten_ms=1500)
    a.add("kx", eigenschaft={"element": "frame#1", "feld": "x", "eingabe": "100 mm"})
    a.add("krz", eigenschaft={"element": "frame#1", "feld": "rz", "eingabe": "30°"})
    a.add("punkt", befehl="referenz.punkt")
    a.add("klick", klick={"modell_mm": [150, 40, 0]})
    a.add("px", eigenschaft={"element": "point#1", "feld": "x", "eingabe": "1,2 m"})
    a.add("wahl", klick={"element": "point#1"})
    a.add("rel", befehl="referenz.punkt-relativ")
    a.add("rz", eigenschaft={"element": "point#2", "feld": "z", "eingabe": "25 mm"})
    for name, befehl in (
        ("strecke", "referenz.strecke"),
        ("gerade", "referenz.gerade"),
        ("halbgerade", "referenz.halbgerade"),
    ):
        a.add(f"{name}_1", klick={"element": "point#1"})
        a.add(f"{name}_2", klick={"element": "point#2", "umschalt": True})
        a.add(name, befehl=befehl)
    return a


def _szene_gleich_ergebnis(snap: dict) -> int:
    """Jede Lage in `szene` stimmt auf 1e-3 mm mit `ergebnis` überein; Rückgabe: Zahl geprüfter Objekte."""
    n = 0
    for s in snap["szene"]:
        if "lage_mm" not in s or s["lage_mm"] is None:
            continue
        o = ergebnis_lage(snap, s["element"])
        lage = s["lage_mm"]
        if isinstance(lage, list):
            soll = vec(o["position"])
            assert nahe(lage, soll, 1e-3), (s["element"], lage, soll)
        else:
            for feld, wert in lage.items():
                soll = [g["value"] for g in o[feld]]
                assert nahe(wert, soll, 1e-3), (s["element"], feld, wert, soll)
        n += 1
    return n


def _frame_lage(graph: dict, k: dict):
    p = {
        n: groesse_in(k["params"][n], "mm" if n in "xyz" else "deg")
        for n in ("x", "y", "z", "rx", "ry", "rz")
    }
    return lage_frame(**p)


def test_anlegen_koordinatensystem_punkte_linien():
    """Requirement „Anlegen in der Vorschau“, Scenario „Ablauf Koordinatensystem, Punkte, Linien“: 1 `frame` mit 7
    Kindern, 2 `point`, je 1 `segment`, `line`, `ray`; Szene = Ergebnis auf 1e-3 mm; freier Punkt auf der XY-Ebene von
    K1 (Klick ± 1 mm), danach x = 1 200 mm in K1; relativer Punkt 25 mm darüber."""
    a = fluss().laufen("drahtmodell-leer")
    ende = a.snaps[-1]
    g = flach(ende["graph"])
    frames = wurzeln(ende["graph"], "frame")
    assert len(frames) == 1 and len(frames[0]["content"]) == 7, frames
    punkte = wurzeln(ende["graph"], "point")
    assert len(punkte) == 2
    for typ in ("segment", "line", "ray"):
        assert len(wurzeln(ende["graph"], typ)) == 1, typ
    sichtbar = _szene_gleich_ergebnis(ende)
    assert sichtbar >= 12, f"nur {sichtbar} Szenenobjekte mit Lage"

    k = frames[0]
    t, r = _frame_lage(g, k)
    assert nahe((groesse_in(k["params"]["x"], "mm"), groesse_in(k["params"]["rz"], "deg")), (100, 30), 1e-9)
    p1 = punkte[0]["id"]
    vorher = a.s("klick")
    pos_vorher = vec(ergebnis_lage(vorher, p1)["position"])
    lokal = _transponiert_mal(r, minus(pos_vorher, t))
    assert abs(lokal[2]) <= 1e-3, f"freier Punkt nicht auf der XY-Ebene von K1: {lokal}"
    assert nahe(pos_vorher, (150, 40, 0), 1.0), pos_vorher

    pk = g[p1]
    assert pk["inputs"].get("frame", "").startswith(k["id"] + ".")
    assert abs(groesse_in(pk["params"]["x"], "mm") - 1200) <= 1e-6
    ly, lz = groesse_in(pk["params"]["y"], "mm"), groesse_in(pk["params"]["z"], "mm")
    assert nahe((ly, lz), (lokal[1], lokal[2]), 1e-3), "y und z bleiben, nur x ändert sich"
    soll = plus(mal_v(r, (1200, ly, lz)), t)
    ist = vec(ergebnis_lage(ende, p1)["position"])
    assert nahe(ist, soll, 1e-3), (ist, soll)

    p2 = punkte[1]["id"]
    assert g[p2]["inputs"]["ref"].startswith(p1 + ".")
    assert nahe(minus(vec(ergebnis_lage(ende, p2)["position"]), ist), (0, 0, 25), 1e-3)
    for typ in ("segment", "line", "ray"):
        e = wurzeln(ende["graph"], typ)[0]
        assert {e["inputs"]["a"].split(".")[0], e["inputs"]["b"].split(".")[0]} == {p1, p2}, e["inputs"]
    assert len({s["graph_hash"] for s in a.snaps}) >= 8


def test_linie_braucht_zwei_punkte_und_esc_bricht_ab():
    """Requirement „Anlegen in der Vorschau“, Scenario „Linie ohne zwei gewählte Punkte“: Rückmeldung „Zwei Punkte
    wählen“; zwei Klicks erzeugen genau 1 Strecke mit `a`, `b` in Klickreihenfolge; Esc nach dem ersten Klick lässt den
    Graphen unverändert."""
    a = (
        Ablauf()
        .add("befehl", befehl="referenz.strecke")
        .add("zuerst", klick={"element": "P2"})
        .add("dann", klick={"element": "P1"})
        .laufen("drahtmodell-beispiel")
    )
    assert "Zwei Punkte wählen" in a.s("befehl")["rueckmeldung"], a.s("befehl")["rueckmeldung"]
    vorher = wurzeln(a.s("anfang")["graph"], "segment")
    nachher = wurzeln(a.s("dann")["graph"], "segment")
    neu = [s for s in nachher if s["id"] not in {x["id"] for x in vorher}]
    assert len(nachher) == len(vorher) + 1 and len(neu) == 1, (len(vorher), len(nachher))
    assert neu[0]["inputs"]["a"].startswith("P2.") and neu[0]["inputs"]["b"].startswith("P1."), neu[0][
        "inputs"
    ]

    b = (
        Ablauf()
        .add("befehl", befehl="referenz.strecke")
        .add("erster", klick={"element": "P1"})
        .add("esc", taste="Escape")
        .laufen("drahtmodell-beispiel")
    )
    assert b.s("esc")["graph_hash"] == b.s("anfang")["graph_hash"]


# --- AK-14 / AK-15 -------------------------------------------------------------------------------------


def _ebene_xy() -> str:
    return next(
        e["id"] for e in alle(beispiel()) if e["type"] == "plane" and e["inputs"].get("of") == "K1.xy"
    )


def _achse_x() -> str:
    return next(e["id"] for e in alle(beispiel()) if e["type"] == "axis" and e["inputs"].get("of") == "K1.x")


def test_auswahl_per_klick_und_ausgeblendet_nicht_waehlbar():
    """Requirement „Auswahl per Klick“, Scenarios „Klick wählt“ (P1, S1 Mitte, XY-Ebene Ecke, P2 am Ende von S1: genau
    ein Element, Struktur markiert dieselbe Zeile; 4 von 4) und „Nicht wählbar, wenn ausgeblendet“."""
    ebene = _ebene_xy()
    a = (
        Ablauf()
        .add("p1", klick={"element": "P1"})
        .add("s1", klick={"element": "S1", "anker": "mitte"})
        .add("xy", klick={"element": ebene, "anker": "ecke"})
        .add("p2", klick={"element": "P2"})
        .add("aus", befehl="element.ausblenden", args={"element": "P1"})
        .add("versteckt", klick={"element": "P1"})
        .laufen("drahtmodell-beispiel")
    )
    for name, id in (("p1", "P1"), ("s1", "S1"), ("xy", ebene), ("p2", "P2")):
        s = a.s(name)
        assert s["auswahl"] == [id], (name, s["auswahl"])
        markiert = [z["id"] for z in s["struktur"] if "ausgewaehlt" in z["zustaende"]]
        assert markiert == [id], (name, markiert)
    assert "P1" not in a.s("versteckt")["auswahl"], a.s("versteckt")["auswahl"]
    assert szene_von(a.s("versteckt"))["P1"]["sichtbar"] is False


def test_ausblenden_aendert_graph_nicht_verwerfen_mit_folgebefund():
    """Requirement „Ausblenden und Verwerfen“, Scenarios „Ausblenden ändert den Graphen nicht“ (Achse, Ebene, S1: Hash
    gleich, `sichtbar` wechselt für genau das Element) und „Verwerfen mit Folgebefund und Rückgängig“."""
    achse, ebene = _achse_x(), _ebene_xy()
    a = Ablauf()
    for ziel in (achse, ebene, "S1"):
        a.add(f"aus_{ziel}", befehl="element.ausblenden", args={"element": ziel})
        a.add(f"ein_{ziel}", befehl="element.einblenden", args={"element": ziel})
    a.add("verworfen", befehl="element.verwerfen", args={"element": "P1"})
    a.add("zurueck", befehl="bearbeiten.rueckgaengig")
    a.laufen("drahtmodell-beispiel")

    start = a.s("anfang")
    hash0, szene0 = start["graph_hash"], szene_von(start)
    for ziel in (achse, ebene, "S1"):
        assert szene0[ziel]["sichtbar"] is True, ziel
        aus, ein = a.s(f"aus_{ziel}"), a.s(f"ein_{ziel}")
        assert aus["graph_hash"] == hash0 and ein["graph_hash"] == hash0, ziel
        s = szene_von(aus)
        assert s[ziel]["sichtbar"] is False, ziel
        assert [i for i in s if s[i]["sichtbar"] != szene0[i]["sichtbar"]] == [ziel], ziel
        assert szene_von(ein)[ziel]["sichtbar"] is True, ziel

    v = a.s("verworfen")
    g = flach(v["graph"])
    assert g["P1"]["meta"].get("verworfen") is True, (
        "P1 muss im Graphen bleiben und als verworfen markiert sein"
    )
    sz = szene_von(v)
    assert "P1" not in sz
    zeilen = {z["id"]: z for z in v["struktur"]}
    for id in ("P3", "S1", "G1"):
        assert "fehlerhaft" in zeilen[id]["zustaende"], (id, zeilen[id]["zustaende"])
        assert any(b["element"] == id and b["code"] == "input_discarded" for b in v["befunde"]), (
            id,
            v["befunde"],
        )
    k1_kinder = [k if isinstance(k, str) else k["id"] for k in g["K1"]["content"]]
    for id in ("K1", *k1_kinder, "P2", "H1"):
        if id in szene0:
            assert sz[id]["lage_mm"] == szene0[id]["lage_mm"] and sz[id]["sichtbar"] is True, id
        assert "fehlerhaft" not in zeilen[id]["zustaende"], id

    z = a.s("zurueck")
    assert z["graph_hash"] == hash0
    assert all(r["state"] == "aktuell" for r in z["ergebnis"]["results"])
    assert not any({"fehlerhaft", "verworfen"} & set(r["zustaende"]) for r in z["struktur"])
    assert not z["befunde"], z["befunde"]


# --- AK-16 ---------------------------------------------------------------------------------------------


def test_bruecke_absturz_neustart_und_ohne_bruecke():
    """Requirement „Brücke zum Worker robust und lokal“, Scenarios „Absturz und Neustart“ (höchstens ein
    `kernel_unavailable`, vorhandene Elemente bleiben, neuer Punkt ≤ 5 s mit Lage aus neuem Ergebnis) und „Ohne
    Brücke“ (Befund „Geometrie-Dienst nicht erreichbar“, Element in der Struktur, keine Konsolenfehler). Die
    Abnahmetests von ap-41b/ap-41c laufen unabhängig davon in der CI."""
    a = (
        Ablauf()
        .add("weg", bruecke="beenden")
        .add("punkt", befehl="referenz.punkt")
        .add("klick", klick={"modell_mm": [30, 30, 0]})
        .laufen("drahtmodell-beispiel")
    )
    vorhanden = set(szene_von(a.s("anfang")))
    for s in a.snaps[1:]:
        assert vorhanden <= set(szene_von(s)), "vorhandene Elemente müssen in szene bleiben"
        assert sum(b["code"] == "kernel_unavailable" for b in s["befunde"]) <= 1
    ende = a.s("klick")
    neu = [p for p in wurzeln(ende["graph"], "point") if p["id"] not in vorhanden]
    assert len(neu) == 1, neu
    assert ende["bereit_ms"] <= 5000, ende["bereit_ms"]
    assert neu[0]["id"] in {r["id"] for r in ende["ergebnis"]["results"]}, (
        "Lage muss aus einem neuen Ergebnis kommen"
    )
    assert nahe(
        szene_von(ende)[neu[0]["id"]]["lage_mm"], vec(ergebnis_lage(ende, neu[0]["id"])["position"]), 1e-3
    )

    b = Ablauf().add("k", befehl="referenz.koordinatensystem").laufen("drahtmodell-leer", ohne_bruecke=True)
    s = b.s("k")
    assert len(wurzeln(s["graph"], "frame")) == 1 and any(z["id"] for z in s["struktur"])
    assert any(x["code"] == "kernel_unavailable" for x in s["befunde"]), s["befunde"]
    assert "Geometrie-Dienst nicht erreichbar" in json.dumps(s, ensure_ascii=False)
    assert s["konsolenfehler"] == [], s["konsolenfehler"]


def test_nur_lokal_und_schnell():
    """Requirement „Brücke zum Worker robust und lokal“, Scenario „Nur lokal und schnell“: der Ablauf 5-mal mit warmem
    Worker; jede Anfrage geht an `127.0.0.1` auf dem Port der Vorschau, Median von `bereit_ms` je Befehl ≤ 500 ms."""
    laeufe = [fluss().laufen("drahtmodell-leer", lauf=i) for i in range(5)]
    ports = set()
    for lauf in laeufe:
        for s in lauf.snaps:
            for url in s["anfragen"]:
                u = urlparse(url)
                assert u.hostname == "127.0.0.1", f"Anfrage an fremden Host: {url}"
                ports.add(u.port)
    assert len(ports) == 1 and None not in ports, ports
    befehle = [n for n in laeufe[0].idx if laeufe[0].schritte[laeufe[0].idx[n]].get("befehl")]
    assert len(befehle) == 6, befehle
    for n in befehle:
        werte = [lauf.s(n)["bereit_ms"] for lauf in laeufe]
        assert statistics.median(werte) <= 500, (n, werte)
