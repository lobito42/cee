"""AK-2: Testzustände per Adresse (Requirement „Testzustände per Adresse“)."""

from __future__ import annotations

import hashlib
from pathlib import Path

from ux2_helpers import THEMEN, ZUSTAENDE, Bild, pruefen


def test_siebzehn_zustaende():
    """Die Liste der Testzustände aus design.md hat 17 Einträge."""
    assert len(ZUSTAENDE) == 17 and len(set(ZUSTAENDE)) == 17


def test_screenshots_ohne_klicken(tmp_path):
    """34 PNG (17 × 2) mit 1440 × 900, bereit_ms ≤ 3000, 0 Eingaben, keine zwei mit gleichem Pixel-Hash."""
    liste = pruefen("zustaende", "--out", str(tmp_path), frisch=True)
    assert len(liste) == 34
    assert {(e["zustand"], e["thema"]) for e in liste} == {(z, t) for z in ZUSTAENDE for t in THEMEN}
    hashes = set()
    for e in liste:
        datei = Path(e["datei"])
        if not datei.is_absolute():
            datei = tmp_path / datei
        bild = Bild(datei)
        assert (bild.breite, bild.hoehe) == (1440, 900), e
        assert e["bereit_ms"] <= 3000, e
        assert e["eingaben"] == 0, e
        hashes.add(hashlib.sha256(bytes(bild.px)).hexdigest())
    assert len(hashes) == 34, "zwei Screenshots sind pixelgleich"
    assert len(list(tmp_path.rglob("*.png"))) == 34


def test_unbekannter_zustand():
    """`?zustand=gibt-es-nicht`: bereit ≤ 3000 ms, Leerer Zustand, 1 Befund „Zustand unbekannt“, 0 Fehler."""
    e = pruefen("zustand", "--name", "gibt-es-nicht")
    assert e["bereit_ms"] <= 3000
    assert e["zustand_gezeigt"] == "leer"
    assert e["befunde"] == ["Zustand unbekannt"], e["befunde"]
    assert e["konsolenfehler"] == [], e["konsolenfehler"]
