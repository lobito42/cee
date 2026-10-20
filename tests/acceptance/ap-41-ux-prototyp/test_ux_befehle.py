"""AK-5: Befehlsregister und Suche (Requirement „Jede Funktion ist ein Befehl“)."""

from __future__ import annotations

import re

from ux_helpers import ablauf, i18n, pruefen, register

PFLICHT = [
    "werkzeug.auswaehlen",
    "werkzeug.messen",
    "werkzeug.schnitt",
    "werkzeug.skizze",
    "werkzeug.fragen",
    "suche.oeffnen",
    "bearbeiten.rueckgaengig",
    "bearbeiten.wiederholen",
    "auswahl.setzen",
    "ansicht.einpassen",
    "thema.umschalten",
    "skizze.anlegen",
    "skizze.rechteck",
    "skizze.schliessen",
    "element.wert-setzen",
    "feature.extrudieren",
    "feature.verrunden",
    "feature.schale",
    "baugruppe.anlegen",
    "verbindung.anlegen",
    "entwurf.anlegen",
    "entwurf.wechseln",
    "entwurf.vergleichen",
    "entwurf.uebernehmen",
    "entwurf.verwerfen",
    "ansicht.ergebnis",
    "ansicht.alle-entwuerfe",
    "ki.fragen",
    "ki.anhalten",
    "vorschlag.uebernehmen",
    "vorschlag.verwerfen",
]


def _hat(d: dict, schluessel: str) -> bool:
    if schluessel in d:
        return True
    cur = d
    for k in schluessel.split("."):
        if not isinstance(cur, dict) or k not in cur:
            return False
        cur = cur[k]
    return True


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
MIND_KUERZEL = {
    "suche.oeffnen": "K",
    "bearbeiten.rueckgaengig": "Z",
    "bearbeiten.wiederholen": "Z",
    "werkzeug.auswaehlen": None,
    "werkzeug.messen": None,
    "werkzeug.schnitt": None,
    "werkzeug.skizze": None,
    "werkzeug.fragen": None,
}


def _typ(t) -> str:
    return str(t.get("typ") if isinstance(t, dict) else t).lower()


def test_register_gueltig():
    """Eindeutige IDs nach Muster, Titel in de/en, Zahlen mit Einheit, alle Pflichtbefehle."""
    reg = register()
    assert reg, "Register leer"
    ids = [b["id"] for b in reg]
    assert len(ids) == len(set(ids))
    assert set(PFLICHT) <= set(ids)
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
    assert zahlen > 0, "kein einziger Zahlenparameter im Register (Verrunden, Extrudieren, Schale …)"


def test_kuerzel_nach_spec_und_design():
    """Weniger als 15 Kürzel (Spec); mindestens Suche, Rückgängig, Wiederholen und je eines je Werkzeug."""
    reg = {b["id"]: b for b in register()}
    mit = {i: b["kuerzel"] for i, b in reg.items() if b.get("kuerzel")}
    assert 0 < len(mit) < 15, len(mit)
    for bid, taste in MIND_KUERZEL.items():
        assert bid in mit, f"{bid} ohne Kürzel"
        if taste:
            assert taste in str(mit[bid]).upper(), (bid, mit[bid])

    def shift(i: str) -> bool:
        return any(w in str(mit[i]).upper() for w in ("UMSCHALT", "SHIFT"))

    assert shift("bearbeiten.wiederholen") and not shift("bearbeiten.rueckgaengig")


def test_kein_bedienelement_ohne_befehl():
    """Alle Zustände: jedes Bedienelement trägt `data-befehl` aus dem Register."""
    ids = {b["id"] for b in register()}
    assert ids
    zustaende = pruefen("budget")["zustaende"]
    assert zustaende
    for z in zustaende:
        assert z["ohne_befehl"] == [], (z["zustand"], z["ohne_befehl"])
        gefunden = z["befehle_gefunden"]
        assert gefunden, (z["zustand"], "keine Bedienelemente gefunden")
        assert set(gefunden) <= ids, (z["zustand"], set(gefunden) - ids)


def test_jeder_befehl_ueber_die_suche():
    """100 % der Befehle: Rang ≤ 3, ausgeführt (Protokoll), Kürzel neben dem Treffer."""
    reg = {b["id"]: b for b in register()}
    ergebnis = {e["befehl"]: e for e in pruefen("befehle")}
    assert set(ergebnis) == set(reg)
    for bid, e in ergebnis.items():
        reihenfolge = [t["befehl"] for t in e["treffer"]]
        assert bid in reihenfolge[:3], (bid, reihenfolge[:5])
        assert any(p["befehl"] == bid for p in e["protokoll_neu"]), bid
        if reg[bid].get("kuerzel"):
            treffer = e["treffer"][reihenfolge.index(bid)]
            taste = re.split(r"[+\s-]+", str(reg[bid]["kuerzel"]).strip())[-1].upper()
            assert taste and taste in treffer["kuerzel_text"].upper(), (bid, treffer)


def test_elemente_in_der_suche():
    """Zustand `teile`: „Deckel“ in Gruppe Elemente; danach ist genau Deckel ausgewählt."""
    e = ablauf("e", "elemente")
    assert "Deckel" in e["gruppe_elemente"]
    assert e["auswahl_namen"] == ["Deckel"]
