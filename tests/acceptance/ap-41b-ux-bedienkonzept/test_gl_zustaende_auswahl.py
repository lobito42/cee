"""AK-4, AK-5: Requirements „Elementzustände“ und „Eine Auswahl für alles“."""

# ruff: noqa: E501

from __future__ import annotations

import statistics

from grundlagen_helpers import (
    Bild,
    abstand,
    auswahl_ids,
    farbe,
    flach,
    hex_rgb,
    i18n,
    median_farbe,
    pruefen,
    tokens,
)

# Tabelle aus design.md „Elementzustände“: Zustand -> (Kanal, erlaubte Tokens je Darstellung)
TABELLE = {
    "hover": (
        "Kontur",
        {"modell": {"akzent"}, "struktur": {"flaeche-2"}, "chat": {"flaeche-2"}, "pfad": {"flaeche-2"}},
    ),
    "ausgewaehlt": (
        "Kontur",
        {
            "modell": {"akzent"},
            "struktur": {"akzent-flaeche", "text"},
            "chat": {"akzent-flaeche"},
            "pfad": {"akzent-flaeche"},
        },
    ),
    "andere": (
        "Kontur",
        {"modell": {"linie-stark"}, "struktur": {"text-2"}, "chat": {"text-2"}, "pfad": {"text-2"}},
    ),
    "aktiv": (
        "Umfeld",
        {d: {"text-3", "schrift.schnitt.halbfett"} for d in ("modell", "struktur", "chat", "pfad")},
    ),
    "ausgeblendet": ("Sichtbarkeit", {d: {"text-3"} for d in ("modell", "struktur", "chat", "pfad")}),
    "fehlerhaft": (
        "Status",
        {d: {"fehler", "fehler-flaeche"} for d in ("modell", "struktur", "chat", "pfad")},
    ),
    "pausiert": ("Status", {d: {"text-2"} for d in ("modell", "struktur", "chat", "pfad")}),
    "rechnet": ("Status", {d: {"text-2"} for d in ("modell", "struktur", "chat", "pfad")}),
}
DARSTELLUNGEN = ("modell", "struktur", "chat", "pfad")


def _ez() -> dict:
    return pruefen("elementzustaende")


def _halter_zeilen(zustand: str = "halter") -> list[dict]:
    z = pruefen("zustand", "--name", zustand)["struktur"]
    assert z, f"Struktur im Zustand {zustand} leer"
    return z


def _id(zeilen: list[dict], name: str) -> str:
    treffer = [z["id"] for z in zeilen if z["name"] == name]
    assert len(treffer) == 1, (name, [z["name"] for z in zeilen])
    return treffer[0]


# --- Elementzustände ----------------------------------------------------------------------------------------


def test_gleiche_optik_in_allen_darstellungen():
    """Scenario „Gleiche Optik in allen Darstellungen“: gleiche Zustandsliste je Element in jeder Darstellung,
    Kanal und Token je Zustand wie in der Tabelle (0 Abweichungen)."""
    elemente = _ez()["zustaende"]["elemente"]
    assert len(elemente) >= 5, "Zustand `zustaende` zeigt zu wenige Elemente"
    abweichungen, gesehen = [], set()
    for e in elemente:
        listen = {d: e["darstellungen"][d] for d in DARSTELLUNGEN if e["darstellungen"].get(d)}
        assert "struktur" in listen or "modell" in listen, e["name"]
        mengen = {d: frozenset(v["zustaende"]) for d, v in listen.items()}
        if len(set(mengen.values())) > 1:
            abweichungen.append(("Liste", e["name"], {d: sorted(m) for d, m in mengen.items()}))
        for d, v in listen.items():
            for k in v["kanaele"]:
                z = k["zustand"]
                if z not in TABELLE:
                    continue
                kanal, tokens_je = TABELLE[z]
                if k["kanal"] != kanal or k["token"] not in tokens_je[d]:
                    abweichungen.append((e["name"], d, z, k["kanal"], k["token"]))
            for z in v["zustaende"]:
                if z in TABELLE:
                    gesehen.add(z)
                    if not any(k["zustand"] == z for k in v["kanaele"]):
                        abweichungen.append((e["name"], d, z, "ohne Kanal"))
    assert abweichungen == [], abweichungen[:10]
    assert gesehen == set(TABELLE), f"Zustände ohne Beispiel: {set(TABELLE) - gesehen}"


def test_kontur_in_richtiger_farbe_und_strichart():
    """Scenario „Kontur in der richtigen Farbe und Strichart“: Auswahl und Überfahren ΔE ≤ 0,05 zu `akzent`,
    Auswahlkontur ≥ 2 × so breit, Kontur der anderen Person gestrichelt mit Token `linie-stark`."""
    k = _ez()["kontur"]
    bild = Bild(k["leinwand"])
    akzent = hex_rgb(farbe("hell", "akzent"))
    linie = tokens()["linie"]["breite"]["$value"]["value"]
    for name, art in (("grundplatte", "Auswahl"), ("steg", "Überfahren")):
        punkte = k[name]["punkte"]
        assert len(punkte) >= 25, f"{name}: zu wenige Messpunkte auf der Linie ({len(punkte)})"
        mitte = tuple(int(statistics.median(median_farbe(bild, p, 1)[i] for p in punkte)) for i in range(3))
        assert abstand(mitte, akzent) <= 0.05, (art, mitte, abstand(mitte, akzent))
    breite_auswahl, breite_hover = k["grundplatte"]["breite"], k["steg"]["breite"]
    assert breite_auswahl >= 2 * breite_hover, (breite_auswahl, breite_hover)
    assert breite_hover == linie and breite_auswahl == 2 * linie, (breite_hover, breite_auswahl, linie)
    andere = [
        x
        for x in k["andere"]["darstellungen"]["modell"]["kanaele"]
        if x["zustand"] == "andere" and x["kanal"] == "Kontur"
    ]
    assert len(andere) == 1, andere
    assert andere[0]["strichart"] == "gestrichelt" and andere[0]["token"] == "linie-stark", andere[0]


def test_vorrang_bei_mehreren_zustaenden():
    """Scenario „Vorrang bei mehreren Zuständen“: fehlerhaft+überfahren+gewählt = genau eine Kontur (Auswahl) plus
    Statusanzeige; ausgeblendet+gewählt = in der Struktur gewählt mit `eye-off`, im Modell nicht gezeichnet."""
    v = _ez()["vorrang"]
    f = v["fehlerhaft"]
    assert len(f["konturen"]) == 1, f["konturen"]
    assert f["konturen"][0]["token"] == "akzent", f["konturen"]
    assert (f["status"]["token"], f["status"]["symbol"], f["status"]["wort"]) == (
        "fehler",
        "circle-alert",
        "fehlerhaft",
    )
    a = v["ausgeblendet"]
    assert a["zeile"]["aria_selected"] == "true", a["zeile"]
    assert "eye-off" in a["zeile"]["symbole"], a["zeile"]
    assert a["im_modell_gezeichnet"] is False


def test_status_mit_farbe_symbol_und_wort():
    """Scenario „Status immer mit Farbe, Symbol und Wort“: rechnet, befund, pausiert: 3 von 3 mit Farbtoken,
    Lucide-Symbol und Wort aus den Übersetzungen."""
    status = {s["zustand"]: s for s in _ez()["status"]}
    assert set(status) == {"rechnet", "befund", "pausiert"}, set(status)
    erwartet = {
        "rechnet": ("text-2", "loader", "rechnet"),
        "befund": ("fehler", "circle-alert", "fehlerhaft"),
        "pausiert": ("text-2", "circle-pause", "pausiert"),
    }
    farben = set(tokens()["farbe"]["hell"])
    de = {str(v).lower() for _, v in flach(i18n("de"))}
    en = {str(v).lower() for _, v in flach(i18n("en"))}
    ok = 0
    for z, (token, symbol, wort) in erwartet.items():
        s = status[z]
        assert s["token"] in farben and s["token"] == token, (z, s)
        assert s["symbol"] == symbol, (z, s)
        assert s["wort"] == wort and wort in de, (z, s)
        assert en, "en.json ohne Werte"
        ok += 1
    assert ok == 3


# --- Auswahl ------------------------------------------------------------------------------------------------


def test_ein_zustand_ueberall_gleich():
    """Scenario „Ein Zustand, überall gleich“: Klick in Modell und Struktur gibt gleiche `auswahl()` (eine Adresse,
    Grundplatte) und gleiche Anzeige in Struktur, Modell, Eigenschaften, Chat."""
    gp = _id(_halter_zeilen(), "Grundplatte")
    eins = pruefen("auswahl")["eins"]
    ergebnisse = {}
    for weg in ("modell", "struktur"):
        s = eins[weg]
        ergebnisse[weg] = auswahl_ids(s["auswahl"])
        assert len(s["auswahl"]) == 1 and auswahl_ids(s["auswahl"]) == [gp], (weg, s["auswahl"])
        assert s["struktur_aria_selected"] == [gp], (weg, s["struktur_aria_selected"])
        assert s["modell_kontur"] == [gp], (weg, s["modell_kontur"])
        assert s["eigenschaften_name"] == "Grundplatte", (weg, s["eigenschaften_name"])
        assert s["chat_kontext"] == "zu: Grundplatte", (weg, s["chat_kontext"])
    assert eins["modell"]["auswahl"] == eins["struktur"]["auswahl"]
    assert ergebnisse["modell"] == ergebnisse["struktur"]


def test_mehrfachauswahl_und_abwaehlen():
    """Scenario „Mehrfachauswahl und Abwählen“: Klick, Umschalt+Klick, Mod+Klick, Mod+A, Klick ins Leere ergeben
    1, 2, 1, alle sichtbaren, 0 – in Struktur und Modell identisch; Esc leert ebenfalls."""
    zeilen = _halter_zeilen()
    gp, steg = _id(zeilen, "Grundplatte"), _id(zeilen, "Steg")
    folge = pruefen("auswahl")["folge"]
    assert len(folge["struktur"]) == 5 and len(folge["modell"]) == 5
    for weg in ("struktur", "modell"):
        ids = [auswahl_ids(f["auswahl"]) for f in folge[weg]]
        assert [len(i) for i in ids[:3]] == [1, 2, 1], (weg, ids[:3])
        assert ids[0] == [gp] and set(ids[1]) == {gp, steg} and ids[2] == [steg], (weg, ids[:3])
        alle = set(folge[weg][3]["sichtbare_ids"])
        assert len(alle) >= 3 and gp in alle and steg in alle, (weg, alle)
        assert set(ids[3]) == alle and len(ids[3]) == len(alle), (weg, ids[3])
        assert alle <= {z["id"] for z in zeilen}, (weg, alle)
        assert ids[4] == [], (weg, ids[4])
    assert [auswahl_ids(f["auswahl"]) for f in folge["struktur"]] == [
        auswahl_ids(f["auswahl"]) for f in folge["modell"]
    ]
    assert folge["esc"]["auswahl"] == []


def test_teil_und_baugruppe():
    """Scenario „Teil und Baugruppe“: Klick wählt Teil „Gehäuse“, Doppelklick macht es aktiv (Pfad endet auf
    „Gehäuse“, Rest gedimmt), dritter Klick wählt das erzeugende Element; Fertig, Esc, Pfad verlassen (3 von 3)."""
    zeilen = _halter_zeilen("aktiv")
    gehaeuse = _id(zeilen, "Gehäuse")
    b = pruefen("auswahl")["baugruppe"]
    assert auswahl_ids(b["klick1"]["auswahl"]) == [gehaeuse], b["klick1"]
    assert b["klick1"]["ansicht"]["aktiv"] != gehaeuse
    assert auswahl_ids(b["doppelklick"]["auswahl"]) in ([], [gehaeuse])
    d = b["doppelklick"]
    assert d["ansicht"]["aktiv"] == gehaeuse, d["ansicht"]
    assert d["ansicht"]["pfad"][-1] == "Gehäuse", d["ansicht"]["pfad"]
    assert d["gedimmt"] and gehaeuse not in d["gedimmt"], d["gedimmt"]
    k3 = auswahl_ids(b["klick3"]["auswahl"])
    assert len(k3) == 1 and k3[0] == b["klick3"]["erzeuger_id"] and k3[0] != gehaeuse, b["klick3"]
    verlassen = b["verlassen"]
    assert set(verlassen) == {"fertig", "esc", "pfad"}
    for weg, ansicht in verlassen.items():
        assert ansicht["aktiv"] != gehaeuse, (weg, ansicht)


def test_mehrere_elemente_in_eigenschaften_und_chat():
    """Scenario „Mehrere Elemente in Eigenschaften und Chat“: nur gemeinsame Felder, Unterschiede als „gemischt“,
    Chat „zu: 2 Elemente“."""
    m = pruefen("auswahl")["mehrfach"]
    einzeln = m["einzeln"]
    assert set(einzeln) == {"Grundplatte", "Steg"}, set(einzeln)
    werte = {n: {f["name"]: f["wert_text"] for f in felder} for n, felder in einzeln.items()}
    gemeinsam = set(werte["Grundplatte"]) & set(werte["Steg"])
    assert gemeinsam, "Grundplatte und Steg haben keine gemeinsamen Felder"
    assert set(werte["Grundplatte"]) != set(werte["Steg"]), "Beispiel braucht auch nicht gemeinsame Felder"
    felder = {f["name"]: f for f in m["eigenschaften"]}
    assert set(felder) == gemeinsam, set(felder) ^ gemeinsam
    for name in gemeinsam:
        verschieden = werte["Grundplatte"][name] != werte["Steg"][name]
        assert felder[name]["gemischt"] is verschieden, (
            name,
            werte["Grundplatte"][name],
            werte["Steg"][name],
        )
        if verschieden:
            assert felder[name]["wert_text"].lower() == "gemischt", felder[name]
    assert any(f["gemischt"] for f in felder.values()), "mindestens ein gemischtes Feld"
    assert m["chat_kontext"] == "zu: 2 Elemente", m["chat_kontext"]


def test_nichts_nur_beim_ueberfahren():
    """Scenario „Nichts nur beim Überfahren“: 0 Bedienelemente, die nur beim Überfahren sichtbar oder bedienbar
    sind; das Auge der Struktur ist immer sichtbar."""
    zustaende = pruefen("budget")["zustaende"]
    assert zustaende, "keine Zustände geprüft"
    nur_hover, augen = [], 0
    for z in zustaende:
        assert z["hover_pruefung"], f"{z['zustand']}: keine Bedienelemente geprüft"
        for h in z["hover_pruefung"]:
            if h["sichtbar_mit"] and not h["sichtbar_ohne"]:
                nur_hover.append((z["zustand"], z["thema"], h["befehl"]))
            if h["befehl"] in ("element.ausblenden", "element.einblenden"):
                augen += 1
                assert h["sichtbar_ohne"], (z["zustand"], "Auge nicht immer sichtbar")
    assert nur_hover == [], nur_hover[:10]
    assert augen > 0, "Auge der Struktur wurde nicht geprüft"
