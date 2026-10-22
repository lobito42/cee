"""AK-17: Testleitfaden mit Ergebnisvorlage (Requirement „Testleitfaden und Abnahme mit Testpersonen“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import re

from ux2_helpers import LEITFADEN, ZUSTAENDE, ablauf, titel_de

ABSCHNITTE = [
    "Ziel", "Rahmen", "Ablauf", "Aufgaben", "Erfolgskriterium",
    "Ergebnisbogen", "Nachbefragung", "Auswertung", "Datenschutz",
]  # fmt: skip
AUFGABEN = "ABCDEFGH"


def _text() -> str:
    assert LEITFADEN.is_file(), "docs/spikes/ux-prototyp-2.md fehlt"
    return LEITFADEN.read_text("utf-8")


def _aufgaben(text: str) -> dict[str, str]:
    """Aufgabentext je Buchstabe, bis zur nächsten Überschrift gleicher oder höherer Ebene."""
    ergebnis: dict[str, list[str]] = {}
    aktuell: tuple[str, int] | None = None
    for zeile in text.splitlines():
        h = re.match(r"^(#{1,6})\s+(.*)$", zeile)
        if h:
            ebene = len(h.group(1))
            if aktuell and ebene <= aktuell[1]:
                aktuell = None
            m = re.match(r"Aufgabe\s+([A-H])\b", h.group(2).strip())
            if m:
                aktuell = (m.group(1), ebene)
                ergebnis[m.group(1)] = []
                continue
        if aktuell:
            ergebnis[aktuell[0]].append(zeile)
    return {k: "\n".join(v) for k, v in ergebnis.items()}


def _tabellen(text: str) -> list[tuple[list[str], list[list[str]]]]:
    """Markdown-Tabellen als (Kopfzellen, Zeilen)."""

    def zellen(z: str) -> list[str]:
        return [c.strip() for c in z.strip().strip("|").split("|")]

    zeilen = text.splitlines()
    ergebnis = []
    i = 0
    while i < len(zeilen) - 1:
        if zeilen[i].lstrip().startswith("|") and re.match(r"^\s*\|[\s:|-]+\|\s*$", zeilen[i + 1]):
            kopf, rumpf = zellen(zeilen[i]), []
            i += 2
            while i < len(zeilen) and zeilen[i].lstrip().startswith("|"):
                rumpf.append(zellen(zeilen[i]))
                i += 1
            ergebnis.append((kopf, rumpf))
        else:
            i += 1
    return ergebnis


def test_leitfaden_vollstaendig():
    """Neun Abschnitte; Aufgaben A–H mit Startadresse (einer der 17 Zustände), Soll, Zeitlimit; Tabelle TP1–TP5 ohne Name/Alter."""
    text = _text()
    for abschnitt in ABSCHNITTE:
        assert re.search(rf"^#{{1,4}}\s*{abschnitt}\b", text, re.M), abschnitt
    aufgaben = _aufgaben(text)
    assert set(aufgaben) == set(AUFGABEN), sorted(aufgaben)
    for name, a in aufgaben.items():
        assert a.strip(), f"Aufgabe {name} ohne Text"
        assert "Ergebnisbogen" not in a and "Nachbefragung" not in a, (
            f"Aufgabe {name} läuft in den nächsten Abschnitt"
        )
        assert re.search(r"zustand=(" + "|".join(ZUSTAENDE) + r")\b", a), f"Startadresse {name}"
        assert re.search(r"Sollzustand", a), f"Sollzustand {name}"
        assert re.search(r"\b\d+\s*min", a), f"Zeitlimit {name}"
    bogen = [(k, r) for k, r in _tabellen(text) if any(z and z[0].startswith("TP") for z in r)]
    assert bogen, "keine Ergebnistabelle mit TP1 … TP5"
    kopf, zeilen = bogen[0]
    assert [z[0] for z in zeilen if z[0].startswith("TP")][:5] == ["TP1", "TP2", "TP3", "TP4", "TP5"]
    for zelle in kopf:
        assert not re.search(r"\b(?:name|alter)\b", zelle, re.I), (
            f"Spalte „{zelle}“ widerspricht dem Datenschutz"
        )


def test_fragen_zur_leitidee():
    """Die Nachbefragung enthält die zwei Fragen zur Leitidee („Wo ändert man hier eine Zahl?“, „Was tut man zuerst …?“)."""
    text = _text()
    nach = re.split(r"^#{1,4}\s*Nachbefragung\b.*$", text, flags=re.M)[-1].split("\n#", 1)[0]
    assert re.search(r"Wo ändert man hier eine Zahl\?", nach), "Frage 1 zur Leitidee fehlt"
    assert re.search(r"Was tut man zuerst, bevor man etwas ändert\?", nach), "Frage 2 zur Leitidee fehlt"


def _aufgabentext(abschnitt: str) -> str:
    """Nur der Text, den die Testperson liest (erstes „…“ im Abschnitt), ohne Sollzustand und Hinweise."""
    m = re.search(r"„([^“]+)“", abschnitt)
    assert m, f"kein Aufgabentext in „…“: {abschnitt[:200]}"
    return m.group(1)


def test_aufgaben_ohne_befehlsnamen():
    """Kein Aufgabentext A–F und H nennt einen Befehlstitel, den der Ablauf im Protokoll nutzt (G ausgenommen)."""
    aufgaben = _aufgaben(_text())
    assert aufgaben
    for name in "abcdefh":
        genutzt = {p["befehl"] for p in ablauf(name)["protokoll"]}
        assert genutzt, f"Ablauf {name}: leeres Protokoll"
        for bid in genutzt:
            t = titel_de(bid).lower()
            assert t, (name, bid, "Titel nicht auflösbar")
            assert t not in _aufgabentext(aufgaben[name.upper()]).lower(), (name, bid, t)
