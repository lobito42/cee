"""ap-53, Capabilities `skizze-vorschau`: Abnahmefall Halter per Direktbedienung (AK-11) und Befehle als KI-Werkzeuge (AK-12).

Der Halter entsteht auf drei Wegen mit demselben Ergebnis: direkt im Worker (`skz_helpers.halter_direkt`), im Prototyp
über Klicks, Kürzel, Fangen und getippte Maße, und über den KI-Chat mit dem Testmodell aus ap-52. Maße kommen aus
`Params()` in `parts/examples/halter.py`; Volumen und Hülle vergleicht der Test selbst.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import need_module  # noqa: E402
from ki_helpers import (  # noqa: E402
    KiAblauf,
    Testmodell,
    karten,
    ki_pruefen,
    skript_aufrufe,
)
from skz_helpers import (  # noqa: E402
    SAblauf,
    anfang,
    ausgang,
    flach,
    gr,
    halter_direkt,
    halter_params,
    huelle,
    kind_id,
    nahe,
    neue_elemente,
    rel,
    volumen,
    wurzeln,
)

VOLUMEN = {"mm3", "mm³", "mm^3"}


def _direkt_sortiert() -> list[tuple[float, tuple, tuple]]:
    e = halter_direkt()
    aus = []
    for i in ("X1", "X2"):
        o = ausgang(e, i, "koerper")
        aus.append((volumen(o), *huelle(o)))
    return sorted(aus)


def _koerper_sortiert(snap: dict, ids: list[str]) -> list[tuple[float, tuple, tuple]]:
    aus = []
    for i in ids:
        o = ausgang(snap["ergebnis"], i, "koerper")
        aus.append((volumen(o), *huelle(o)))
    return sorted(aus)


def _gleich_wie_direkt(ist: list) -> None:
    soll = _direkt_sortiert()
    assert len(ist) == len(soll) == 2, ist
    for (v1, lo1, hi1), (v2, lo2, hi2) in zip(ist, soll, strict=True):
        assert rel(v1, v2), (v1, v2)
        assert nahe(lo1, lo2, 1e-3) and nahe(hi1, hi2, 1e-3), ((lo1, hi1), (lo2, hi2))


def _zeiger(u: float, v: float, aktion: str, **extra) -> dict:
    return {"zeiger": {"skizze_mm": [u, v], "aktion": aktion, **extra}}


# --- AK-11 -----------------------------------------------------------------------------------------------


def test_halter_per_direktbedienung():
    """Requirement „Abnahmefall Halter in der Vorschau“, Scenario „Halter per Direktbedienung“: im Zustand `skizze-leer`
    S1 mit Rechteck und zwei Kreisen (Werte aus `Params()` getippt), Hochziehen um `dicke`, K1 mit z = `dicke` (erlaubte
    Vorbereitung über „Koordinatensystem setzen“ und das Feld z), S2 mit Rechteck und Hochziehen um `steg_hoehe`; alle
    übrigen Schritte ohne Menüeintrag und ohne Eigenschaftenfeld: Volumen und Hülle beider Körper relativ 1e-6 wie im
    direkten Worker-Fall, jede Lage in `szene` stimmt auf 1e-3 mm mit `ergebnis`, `konsolenfehler` leer."""
    p = halter_params()
    b, t, d, a2 = p.breite, p.tiefe, p.dicke, p.bohrung_abstand / 2
    g0 = anfang("skizze-leer")["graph"]
    xy0 = kind_id(g0, "frame", 1, "plane", 1)
    typ = lambda x: f"{x:g}".replace(".", ",")  # noqa: E731

    a = SAblauf()
    a.add("ebene1", klick={"element": xy0})
    a.add("skizze1", taste="S")
    a.add("r1", taste="R")
    a.add("r1_ecke", **_zeiger(-b / 2, -t / 2, "klicken"))
    a.add("r1_weg", **_zeiger(0, 0, "bewegen"))
    a.add("r1_b", tippen=typ(b))
    a.add("r1_tab", taste="Tab")
    a.add("r1_h", tippen=typ(t))
    a.add("r1_ok", taste="Enter")
    for n, x in ((1, -a2), (2, a2)):
        a.add(f"k{n}", taste="K")
        a.add(f"k{n}_mitte", **_zeiger(x, d / 2, "klicken"))
        a.add(f"k{n}_d", tippen=typ(p.bohrung_d))
        a.add(f"k{n}_ok", taste="Enter")
    a.add("fertig1", befehl="skizze.fertig")
    a.add("bereich1", **{"zeiger": {"element": "sketch#1", "skizze_mm": [0, -t / 4], "aktion": "klicken"}})
    a.add("e1", taste="E")
    a.add("h1", tippen=typ(d))
    a.add("e1_ok", taste="Enter")
    # erlaubte Vorbereitung: K1 mit z = dicke
    a.add("k1_setzen", befehl="referenz.koordinatensystem")
    a.add("k1_z", eigenschaft={"element": "frame#2", "feld": "z", "eingabe": f"{typ(d)} mm"})
    a.add("ebene2", klick={"element": "frame#2>plane#1"})
    a.add("skizze2", taste="S")
    a.add("r2", taste="R")
    a.add("r2_ecke", **_zeiger(-b / 2, -t / 2, "klicken"))
    a.add("r2_weg", **_zeiger(0, 0, "bewegen"))
    a.add("r2_b", tippen=typ(b))
    a.add("r2_tab", taste="Tab")
    a.add("r2_h", tippen=typ(d))
    a.add("r2_ok", taste="Enter")
    a.add("fertig2", befehl="skizze.fertig")
    a.add(
        "bereich2",
        **{"zeiger": {"element": "sketch#2", "skizze_mm": [0, -t / 2 + d / 2], "aktion": "klicken"}},
    )
    a.add("e2", taste="E")
    a.add("h2", tippen=typ(p.steg_hoehe))
    a.add("e2_ok", taste="Enter")
    a.laufen("skizze-leer")

    # Außer der erlaubten Vorbereitung weder Menüeintrag noch Eigenschaftenfeld
    erlaubt_befehle = {"skizze.fertig", "referenz.koordinatensystem"}
    assert {s["befehl"] for s in a.schritte if "befehl" in s} <= erlaubt_befehle
    assert [s["eigenschaft"]["feld"] for s in a.schritte if "eigenschaft" in s] == ["z"]

    ende = a.s("e2_ok")
    xs = wurzeln(ende["graph"], "extrude")
    assert len(xs) == 2, xs
    _gleich_wie_direkt(_koerper_sortiert(ende, [x["id"] for x in xs]))
    assert len(neue_elemente(a.s("anfang"), ende, "sketch_circle")) == 2

    pruefte = 0
    for s in ende["szene"]:
        lage = s.get("lage_mm")
        if not lage or not isinstance(lage, dict):
            continue
        r = next((x for x in ende["ergebnis"]["results"] if x["id"] == s["element"]), None)
        o = next(iter(r["outputs"].values())) if r and r["outputs"] else {}
        if o.get("type") == "solid" and "schwerpunkt" in lage:
            assert nahe(tuple(lage["schwerpunkt"]), tuple(g["value"] for g in o["schwerpunkt"]), 1e-3), s[
                "element"
            ]
            pruefte += 1
    assert pruefte == 2, f"{pruefte} Körper mit Lage in szene"
    assert ende["konsolenfehler"] == []
    assert all(s["konsolenfehler"] == [] for s in a.snaps)


# --- AK-12 -----------------------------------------------------------------------------------------------

NAMEN = ["skizze_anlegen", "skizze_linie", "skizze_rechteck", "skizze_kreis", "koerper_hochziehen"]
ERFORDERLICH = {
    "skizze_anlegen": {"ebene"},
    "skizze_linie": {"skizze", "u1", "v1", "u2", "v2"},
    "skizze_rechteck": {"skizze", "u1", "v1", "u2", "v2"},
    "skizze_kreis": {"skizze", "u", "v", "d"},
    "koerper_hochziehen": {"skizze", "punkt_u", "punkt_v", "hoehe"},
}
GROESSEN = {"u1", "v1", "u2", "v2", "u", "v", "d", "punkt_u", "punkt_v", "hoehe"}


def test_werkzeugliste():
    """Requirement „Befehle als KI-Werkzeuge“, Scenario „Werkzeugliste“: `pruefen -- ki werkzeuge` enthält die 5 Werkzeuge
    `skizze_anlegen`, `skizze_linie`, `skizze_rechteck`, `skizze_kreis`, `koerper_hochziehen` mit flachem `inputSchema`
    (jede Größe ein String mit Muster „Zahl Einheit“), je ein gültiges Beispiel in `description`; `skizze_fertig` und
    `skizze_bearbeiten` fehlen."""
    jsonschema = need_module("jsonschema")
    liste = {w["name"]: w for w in ki_pruefen(["werkzeuge"])["werkzeuge"]}
    assert set(NAMEN) <= set(liste), sorted(liste)
    assert not {"skizze_fertig", "skizze_bearbeiten"} & set(liste), sorted(liste)
    for n in NAMEN:
        w = liste[n]
        schema = w["inputSchema"]
        jsonschema.Draft202012Validator.check_schema(schema)
        eig = schema.get("properties", {})
        assert not [k for k, s in eig.items() if s.get("type") in ("object", "array")], n
        assert all(s.get("type") == "string" for s in eig.values()), (n, eig)
        assert set(schema.get("required", [])) == ERFORDERLICH[n], (n, schema.get("required"))
        assert set(eig) >= ERFORDERLICH[n]
        for g in GROESSEN & set(eig):
            assert "pattern" in eig[g], (n, g)
            assert list(
                jsonschema.Draft202012Validator(schema).iter_errors(
                    {**{k: "1 mm" for k in ERFORDERLICH[n]}, g: "40"}
                )
            ), (
                n,
                g,
                "Zahl ohne Einheit muss ungültig sein",
            )
        beschr = w["description"]
        assert beschr.count("Beispiel: ") == 1, beschr
        beispiel, ende = json.JSONDecoder().raw_decode(beschr.split("Beispiel: ", 1)[1])
        assert isinstance(beispiel, dict)
        jsonschema.Draft202012Validator(schema).validate(beispiel)


def test_befehle_mit_parametern_ohne_klick():
    """Scenario „Befehle mit Parametern ohne Klick“: `skizze.anlegen` mit `ebene`, `skizze.rechteck` mit „0 mm“, „0 mm“,
    „30 mm“, „20 mm“ und `koerper.hochziehen` mit Punkt „15 mm“, „10 mm“ und `hoehe` „15 mm“: ein Körper mit Volumen 9 000
    mm³ (relativ 1e-6), und es gab keinen Klick ins Modell."""
    xy = kind_id(anfang("skizze-leer")["graph"], "frame", 1, "plane", 1)
    a = SAblauf()
    a.add("anlegen", befehl="skizze.anlegen", args={"ebene": xy})
    a.add(
        "rechteck",
        befehl="skizze.rechteck",
        args={"skizze": "sketch#1", "u1": "0 mm", "v1": "0 mm", "u2": "30 mm", "v2": "20 mm"},
    )
    a.add(
        "hoch",
        befehl="koerper.hochziehen",
        args={"skizze": "sketch#1", "punkt_u": "15 mm", "punkt_v": "10 mm", "hoehe": "15 mm"},
    )
    a.laufen("skizze-leer")
    assert not [s for s in a.schritte if "klick" in s or "zeiger" in s or "griff" in s], (
        "kein Klick ins Modell erlaubt"
    )
    ende = a.s("hoch")
    xs = wurzeln(ende["graph"], "extrude")
    assert len(xs) == 1, xs
    assert rel(volumen(ausgang(ende["ergebnis"], xs[0]["id"], "koerper")), 9000), ausgang(
        ende["ergebnis"], xs[0]["id"], "koerper"
    )
    assert ende["konsolenfehler"] == []


def _halter_aufrufe(k0: str) -> list:
    """Werkzeugaufrufe für den Halter nach design.md Abschnitt 8 (Erfolge `ids` in Aufrufreihenfolge)."""
    p = halter_params()
    b2, t2, a2 = p.breite / 2, p.tiefe / 2, p.bohrung_abstand / 2
    g = lambda v: f"{v:g} mm"  # noqa: E731
    return [
        lambda ids: ("skizze_anlegen", {"ebene": f"{k0}.xy"}),  # 0 S1
        lambda ids: (
            "skizze_rechteck",
            {"skizze": f"{ids[0]}.sketch", "u1": g(-b2), "v1": g(-t2), "u2": g(b2), "v2": g(t2)},
        ),
        lambda ids: (
            "skizze_kreis",
            {"skizze": f"{ids[0]}.sketch", "u": g(-a2), "v": g(p.dicke / 2), "d": g(p.bohrung_d)},
        ),
        lambda ids: (
            "skizze_kreis",
            {"skizze": f"{ids[0]}.sketch", "u": g(a2), "v": g(p.dicke / 2), "d": g(p.bohrung_d)},
        ),
        lambda ids: (
            "koerper_hochziehen",
            {"skizze": f"{ids[0]}.sketch", "punkt_u": "0 mm", "punkt_v": g(-t2 / 2), "hoehe": g(p.dicke)},
        ),
        lambda ids: ("referenz_koordinatensystem", {"z": g(p.dicke)}),  # 5 K1
        lambda ids: ("skizze_anlegen", {"ebene": f"{ids[5]}.xy"}),  # 6 S2
        lambda ids: (
            "skizze_rechteck",
            {"skizze": f"{ids[6]}.sketch", "u1": g(-b2), "v1": g(-t2), "u2": g(b2), "v2": g(-t2 + p.dicke)},
        ),
        lambda ids: (
            "koerper_hochziehen",
            {
                "skizze": f"{ids[6]}.sketch",
                "punkt_u": "0 mm",
                "punkt_v": g(-t2 + p.dicke / 2),
                "hoehe": g(p.steg_hoehe),
            },
        ),
    ]


def test_halter_ueber_den_ki_chat():
    """Scenario „Halter über den KI-Chat“: das Testmodell aus ap-52 liefert die Werkzeugaufrufe für den Halter, dann
    `chat.uebernehmen` und `bearbeiten.rueckgaengig`: vor dem Übernehmen zeigt die Karte alle 9 neuen Elemente als Geister
    bei unverändertem `graph_hash`; nach Übernehmen stimmen Volumen beider Körper relativ 1e-6 mit dem direkten
    Worker-Fall, der Verlauf nennt `urheber` = `ki`; nach einem Rückgängig-Schritt ist `graph_hash` der Ausgangswert."""
    start = KiAblauf().laufen("skizze-leer").s("anfang") if False else anfang("skizze-leer")
    k0 = wurzeln(start["graph"], "frame")[0]["id"]
    with Testmodell(skript_aufrufe(_halter_aufrufe(k0))) as tm:
        a = KiAblauf()
        a.add("waehlen", befehl="ki.anbieter-waehlen", args={"id": "openai-kompatibel"})
        a.add("senden", chat="Baue den Winkelhalter aus Grundplatte mit zwei Bohrungen und Steg")
        a.add("uebernehmen", befehl="chat.uebernehmen")
        a.add("rueck", befehl="bearbeiten.rueckgaengig")
        a.laufen("skizze-leer", env=tm.env())
    h0 = a.s("anfang")["graph_hash"]

    vorschau = a.s("senden")
    assert vorschau["graph_hash"] == h0, "Graph ändert sich schon beim Senden"
    karte = [k for k in karten(vorschau) if k.get("offen")]
    assert len(karte) == 1, karten(vorschau)
    assert len(karte[0]["neu"]) == 9, karte[0]["neu"]
    assert len(vorschau["geister"]) == 9, [g.get("art") for g in vorschau["geister"]]
    assert len({g["element"] for g in vorschau["geister"]}) == 9

    ende = a.s("uebernehmen")
    xs = [e for e in neue_elemente(a.s("anfang"), ende, "extrude")]
    assert len(xs) == 2, [e["type"] for e in flach(ende["graph"]).values()]
    _gleich_wie_direkt(_koerper_sortiert(ende, [x["id"] for x in xs]))
    neu = ende["verlauf"][len(a.s("anfang")["verlauf"]) :]
    assert neu and all(v["urheber"] == "ki" for v in neu), neu
    assert a.s("rueck")["graph_hash"] == h0, "ein Rückgängig muss den ganzen Satz zurücknehmen"
    _ = gr, VOLUMEN
