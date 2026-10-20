"""AK-5: Befehlsregister und Suche (Requirement „Jede Funktion ist ein Befehl“)."""

from __future__ import annotations

import json
import re

from ux_helpers import P, ablauf, pruefen, register

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


def test_register_gueltig():
    """Eindeutige IDs nach Muster, Titel in de/en, Zahlen mit Einheit, alle Pflichtbefehle."""
    reg = register()
    ids = [b["id"] for b in reg]
    assert len(ids) == len(set(ids))
    assert set(PFLICHT) <= set(ids)
    de = json.loads((P / "src" / "i18n" / "de.json").read_text("utf-8"))
    en = json.loads((P / "src" / "i18n" / "en.json").read_text("utf-8"))
    for b in reg:
        assert re.fullmatch(r"[a-z]+(\.[a-z-]+)+", b["id"]), b["id"]
        assert _hat(de, b["titel"]) and _hat(en, b["titel"]), b["id"]
        for name, typ in (b.get("parameter") or {}).items():
            if isinstance(typ, dict) and typ.get("typ") in ("zahl", "number", "groesse"):
                assert typ.get("dimension") and typ.get("einheit"), (b["id"], name)
    assert sum(1 for b in reg if b.get("kuerzel")) <= 10


def test_kein_bedienelement_ohne_befehl():
    """Alle Zustände: jedes Bedienelement trägt `data-befehl` aus dem Register."""
    ids = {b["id"] for b in register()}
    for z in pruefen("budget")["zustaende"]:
        assert z["ohne_befehl"] in (0, []), (z["zustand"], z["ohne_befehl"])
        assert set(z.get("befehle_gefunden", [])) <= ids


def test_jeder_befehl_ueber_die_suche():
    """100 % der Befehle: Rang ≤ 3, ausgeführt, Kürzel neben dem Treffer."""
    reg = {b["id"]: b for b in register()}
    ergebnis = {e["befehl"]: e for e in pruefen("befehle")}
    assert set(ergebnis) == set(reg)
    for bid, e in ergebnis.items():
        assert 1 <= e["rang"] <= 3, bid
        assert e["ausgefuehrt"] is True, bid
        if reg[bid].get("kuerzel"):
            assert e["kuerzel_angezeigt"] is True, bid


def test_elemente_in_der_suche():
    """Zustand `teile`: „Deckel“ in Gruppe Elemente; danach ist genau Deckel ausgewählt."""
    e = ablauf("e", "elemente")
    assert "Deckel" in e["gruppe_elemente"]
    assert e["auswahl_namen"] == ["Deckel"]
