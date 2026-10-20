"""AK-12: Testleitfaden mit Ergebnisvorlage (Requirement „Testleitfaden und Abnahme mit Testpersonen“)."""

from __future__ import annotations

import re

from ux_helpers import LEITFADEN, ZUSTAENDE, ablauf, flach, i18n, register

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
    """Aufgabentext je Buchstabe, bis zur nächsten Überschrift gleicher oder höherer Ebene."""
    ergebnis: dict[str, list[str]] = {}
    aktuell: tuple[str, int] | None = None
    for zeile in text.splitlines():
        h = re.match(r"^(#{1,6})\s+(.*)$", zeile)
        if h:
            ebene = len(h.group(1))
            if aktuell and ebene <= aktuell[1]:
                aktuell = None
            m = re.match(r"Aufgabe\s+([A-F])\b", h.group(2).strip())
            if m:
                aktuell = (m.group(1), ebene)
                ergebnis[m.group(1)] = []
                continue
        if aktuell:
            ergebnis[aktuell[0]].append(zeile)
    return {k: "\n".join(v) for k, v in ergebnis.items()}


def _tabellen(text: str) -> list[tuple[list[str], list[list[str]]]]:
    """Markdown-Tabellen als (Kopfzellen, Zeilen)."""
    zeilen = text.splitlines()
    ergebnis = []
    i = 0
    while i < len(zeilen) - 1:
        if zeilen[i].lstrip().startswith("|") and re.match(r"^\s*\|[\s:|-]+\|\s*$", zeilen[i + 1]):
            zellen = lambda z: [c.strip() for c in z.strip().strip("|").split("|")]  # noqa: E731
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
    """Neun Abschnitte; Aufgaben A–F mit Start, Soll, Zeit; Tabelle TP1–TP5 ohne Name/Alter."""
    text = _text()
    for abschnitt in ABSCHNITTE:
        assert re.search(rf"^#{{1,4}}\s*{abschnitt}\b", text, re.M), abschnitt
    aufgaben = _aufgaben(text)
    assert set(aufgaben) == set("ABCDEF")
    for name, a in aufgaben.items():
        assert a.strip(), f"Aufgabe {name} ohne Text"
        assert "Ergebnisbogen" not in a and "Nachbefragung" not in a, (
            f"Aufgabe {name} läuft in den nächsten Abschnitt"
        )
        assert re.search(r"zustand=(" + "|".join(ZUSTAENDE) + r")\b", a), f"Startadresse {name}"
        assert re.search(r"Soll", a), f"Sollzustand {name}"
        assert re.search(r"\b\d+\s*min", a), f"Zeitlimit {name}"
    bogen = [(k, r) for k, r in _tabellen(text) if any(z and z[0].startswith("TP") for z in r)]
    assert bogen, "keine Ergebnistabelle mit TP1 … TP5"
    kopf, zeilen = bogen[0]
    assert [z[0] for z in zeilen if z[0].startswith("TP")][:5] == ["TP1", "TP2", "TP3", "TP4", "TP5"]
    for zelle in kopf:
        assert not re.search(r"\b(?:name|alter)\b", zelle, re.I), (
            f"Spalte „{zelle}“ widerspricht dem Datenschutz"
        )


def _titel(b: dict, de: dict) -> str:
    flach_de = dict(flach(de))
    return str(flach_de.get(b["titel"], "")).strip().lower()


def test_aufgaben_ohne_befehlsnamen():
    """Kein Aufgabentext nennt Befehlstitel des Ablaufs; Suche „zurück“ findet Rückgängig."""
    aufgaben = _aufgaben(_text())
    assert aufgaben
    de = i18n("de")
    titel = {b["id"]: _titel(b, de) for b in register()}
    for name in "abcdef":
        genutzt = {p["befehl"] for p in ablauf(name)["protokoll"]}
        assert genutzt, f"Ablauf {name}: leeres Protokoll"
        for bid in genutzt:
            t = titel.get(bid, "")
            assert t, (name, bid, "Titel nicht auflösbar")
            assert t not in aufgaben[name.upper()].lower(), (name, bid, t)


def test_suche_zurueck_findet_rueckgaengig():
    """Die Suche „zurück“ liefert Rückgängig unter den ersten 3 Treffern, mit Kürzel."""
    e = ablauf("e")
    treffer = e["suche_zurueck"]["treffer"]
    reihenfolge = [t["befehl"] for t in treffer]
    assert "bearbeiten.rueckgaengig" in reihenfolge[:3], reihenfolge
    assert treffer[reihenfolge.index("bearbeiten.rueckgaengig")]["kuerzel_text"].strip()
