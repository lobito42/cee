"""AK-12: Testleitfaden mit Ergebnisvorlage (Requirement „Testleitfaden und Abnahme mit Testpersonen“)."""

from __future__ import annotations

import json
import re

from ux_helpers import LEITFADEN, ZUSTAENDE, P, ablauf

ABSCHNITTE = [
    "Ziel",
    "Rahmen",
    "Ablauf",
    "Aufgaben",
    "Erfolgskriterium",
    "Ergebnisbogen",
    "Nachbefragung",
    "Auswertung",
    "Datenschutz",
]


def _text() -> str:
    assert LEITFADEN.is_file(), "docs/spikes/ux-prototyp.md fehlt"
    return LEITFADEN.read_text("utf-8")


def _aufgaben(text: str) -> dict[str, str]:
    teile = re.split(r"^#{2,4}\s*Aufgabe\s+([A-F])\b.*$", text, flags=re.M)
    return {teile[i]: teile[i + 1] for i in range(1, len(teile) - 1, 2)}


def test_leitfaden_vollstaendig():
    """Neun Abschnitte; Aufgaben A–F mit Start, Soll, Zeit; Tabelle TP1–TP5 ohne Name/Alter."""
    text = _text()
    for abschnitt in ABSCHNITTE:
        assert re.search(rf"^#{{1,4}}\s*{abschnitt}\b", text, re.M), abschnitt
    aufgaben = _aufgaben(text)
    assert set(aufgaben) == set("ABCDEF")
    for name, a in aufgaben.items():
        assert re.search(r"zustand=(" + "|".join(ZUSTAENDE) + r")\b", a), f"Startadresse {name}"
        assert re.search(r"Soll", a), f"Sollzustand {name}"
        assert re.search(r"\b\d+\s*min", a), f"Zeitlimit {name}"
    tabelle = [z for z in text.splitlines() if z.startswith("|")]
    for tp in ("TP1", "TP2", "TP3", "TP4", "TP5"):
        assert any(z.lstrip("| ").startswith(tp) for z in tabelle), tp
    kopf = " ".join(z for z in tabelle if "TP" not in z).lower()
    assert "name" not in kopf and "alter" not in kopf


def test_aufgaben_ohne_befehlsnamen():
    """Kein Aufgabentext nennt Befehlstitel des Ablaufs; Suche „zurück“ findet Rückgängig."""
    aufgaben = _aufgaben(_text())
    de = json.loads((P / "src" / "i18n" / "de.json").read_text("utf-8"))
    from ux_helpers import register

    titel = {}
    for b in register():
        cur = de
        for k in b["titel"].split("."):
            cur = cur.get(k, {}) if isinstance(cur, dict) else {}
        titel[b["id"]] = cur if isinstance(cur, str) else de.get(b["titel"], "")
    for name in "abcdef":
        genutzt = {p["befehl"] for p in ablauf(name)["protokoll"]}
        for bid in genutzt:
            t = titel.get(bid, "").lower()
            if t:
                assert t not in aufgaben[name.upper()].lower(), (name, bid, t)
    e = ablauf("e")
    assert e["suche_zurueck"]["befehl"] == "bearbeiten.rueckgaengig"
    assert e["suche_zurueck"]["rang"] <= 3 and e["suche_zurueck"]["kuerzel_angezeigt"] is True
