"""AK-12: Befehlsregister und Suche (Requirement „Jede Funktion ist ein Befehl und über die Suche erreichbar“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import re

from ux2_helpers import ablauf, flach, i18n, id_von, pruefen, register, zeile

# Mindestumfang aus design.md, „Befehlsregister“
PFLICHT = [
    "suche.oeffnen", "bearbeiten.rueckgaengig", "bearbeiten.wiederholen", "auswahl.setzen",
    "auswahl.aufheben", "ansicht.einpassen", "thema.umschalten", "arbeitsbereich.wechseln",
    "darstellung.wechseln", "darstellung.koerper", "darstellung.kanten", "darstellung.durchsicht",
    "ort.skizze-bearbeiten", "ort.fertig",
    "skizze.anlegen", "skizze.rechteck", "element.wert-setzen", "feature.extrudieren",
    "feature.verrunden", "schritt.ausblenden", "schritt.einblenden", "schritt.verwerfen",
    "baugruppe.anlegen", "verbindung.anlegen",
    "entwurf.anlegen", "entwurf.wechseln", "entwurf.vergleichen", "entwurf.uebernehmen",
    "entwurf.verwerfen", "ansicht.ergebnis", "ansicht.alle-entwuerfe",
    "ki.fragen", "ki.anhalten", "vorschlag.uebernehmen", "vorschlag.verwerfen", "gespraech.schliessen",
    "simulation.lager", "simulation.kraft", "simulation.ergebnis",
]  # fmt: skip
KEINE_ZAHL = {
    "text",
    "string",
    "wahl",
    "auswahl",
    "choice",
    "enum",
    "bool",
    "boolean",
    "referenz",
    "reference",
    "ref",
}
TASTEN_MIND = {
    "suche.oeffnen": "K",
    "bearbeiten.rueckgaengig": "Z",
    "bearbeiten.wiederholen": "Z",
    "darstellung.wechseln": "W",
}


def _hat(d: dict, schluessel: str) -> bool:
    return schluessel in dict(flach(d))


def _typ(t) -> str:
    return str(t.get("typ") if isinstance(t, dict) else t).lower()


def test_register_gueltig():
    """Eindeutige IDs nach Muster, Titel in de/en, Zahlen mit Dimension und Einheit, alle Pflichtbefehle."""
    reg = register()
    assert reg, "Register leer"
    ids = [b["id"] for b in reg]
    assert len(ids) == len(set(ids))
    assert set(PFLICHT) <= set(ids), sorted(set(PFLICHT) - set(ids))
    de, en = i18n("de"), i18n("en")
    zahlen = 0
    for b in reg:
        assert re.fullmatch(r"[a-z]+(\.[a-z-]+)+", b["id"]), b["id"]
        assert _hat(de, b["titel"]) and _hat(en, b["titel"]), b["id"]
        parameter = b.get("parameter") or {}
        assert isinstance(parameter, dict), b["id"]
        for name, t in parameter.items():
            if _typ(t) in KEINE_ZAHL:
                continue
            zahlen += 1
            assert isinstance(t, dict) and t.get("dimension") and t.get("einheit"), (b["id"], name)
    assert zahlen > 0, "kein Zahlenparameter im Register (Verrunden, Extrudieren, Kraft …)"


def _kuerzel_passt(register_kuerzel: str, angezeigt: str) -> bool:
    """Angezeigtes Kürzel enthält Taste und alle Umschalttasten des Registers (Mod = Strg/⌘, Shift = Umschalt/⇧)."""
    teile = [t for t in re.split(r"[+\s]+", register_kuerzel.strip()) if t]
    if not teile:
        return False
    text = angezeigt.upper()
    zeichen = {
        "MOD": ("STRG", "CTRL", "⌘", "CMD"), "CTRL": ("STRG", "CTRL", "⌃"), "STRG": ("STRG", "CTRL"),
        "CMD": ("⌘", "CMD"), "SHIFT": ("UMSCHALT", "SHIFT", "⇧"), "UMSCHALT": ("UMSCHALT", "SHIFT", "⇧"),
        "ALT": ("ALT", "⌥"), "OPTION": ("ALT", "⌥"),
    }  # fmt: skip
    *mods, taste = teile
    if taste.upper() not in re.split(r"[+\s]+", text) and not text.endswith(taste.upper()):
        return False
    return all(any(z in text for z in zeichen.get(m.upper(), (m.upper(),))) for m in mods)


def test_hoechstens_zehn_kuerzel():
    """≤ 10 Kürzel; Suche, Rückgängig, Wiederholen, Darstellung mit den Tasten aus design.md."""
    mit = {b["id"]: str(b["kuerzel"]) for b in register() if b.get("kuerzel")}
    assert 0 < len(mit) <= 10, mit
    for bid, taste in TASTEN_MIND.items():
        assert bid in mit, f"{bid} ohne Kürzel"
        assert taste in mit[bid].upper(), (bid, mit[bid])

    def shift(i: str) -> bool:
        return any(w in mit[i].upper() for w in ("UMSCHALT", "SHIFT"))

    assert shift("bearbeiten.wiederholen") and not shift("bearbeiten.rueckgaengig")


def test_kein_bedienelement_ohne_befehl():
    """Alle 17 Zustände × 2 Themen: jedes Bedienelement trägt `data-befehl` aus dem Register (0 Abweichungen)."""
    ids = {b["id"] for b in register()}
    zustaende = pruefen("budget")["zustaende"]
    assert len(zustaende) == 34
    for z in zustaende:
        name = (z["zustand"], z["thema"])
        assert z["ohne_befehl"] == [], (name, z["ohne_befehl"])
        assert z["befehle_gefunden"], (name, "keine Bedienelemente gefunden")
        assert set(z["befehle_gefunden"]) <= ids, (name, set(z["befehle_gefunden"]) - ids)


def test_jeder_befehl_ueber_die_suche():
    """100 % der Befehle: Rang ≤ 3 in der Gruppe Befehle, ausgeführt (Protokoll), Kürzel neben dem Treffer."""
    reg = {b["id"]: b for b in register()}
    ergebnis = {e["befehl"]: e for e in pruefen("befehle")}
    assert set(ergebnis) == set(reg)
    for bid, e in ergebnis.items():
        reihenfolge = [t["befehl"] for t in e["treffer"]]
        assert bid in reihenfolge[:3], (bid, reihenfolge[:5])
        assert any(p["befehl"] == bid for p in e["protokoll_neu"]), bid
        if reg[bid].get("kuerzel"):
            treffer = e["treffer"][reihenfolge.index(bid)]
            assert _kuerzel_passt(str(reg[bid]["kuerzel"]), treffer["kuerzel_text"]), (bid, treffer)


def test_elemente_in_der_suche():
    """`halter`: „Steg“ erscheint in der Gruppe Elemente; danach ist genau der Schritt Steg gewählt und im Aufbau markiert."""
    e = ablauf("e", "elemente")
    assert "Steg" in e["gruppe_elemente"], e["gruppe_elemente"]
    steg = id_von(e["modell"], "Steg")
    assert e["auswahl"] == [steg], e["auswahl"]
    assert zeile(e["aufbau"], "Steg")["aria_selected"] == "true"
    assert all(z["aria_selected"] != "true" for z in e["aufbau"] if z["name"] != "Steg")
