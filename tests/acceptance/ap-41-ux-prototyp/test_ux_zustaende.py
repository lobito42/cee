"""AK-2: Testzustände per Adresse (Requirement „Testzustände per Adresse“)."""

from __future__ import annotations

import hashlib
from pathlib import Path

from ux_helpers import ZUSTAENDE, ablauf, pruefen


def _png_groesse(p: Path) -> tuple[int, int]:
    d = p.read_bytes()
    assert d[:8] == b"\x89PNG\r\n\x1a\n"
    return int.from_bytes(d[16:20], "big"), int.from_bytes(d[20:24], "big")


def test_screenshots_ohne_klicken(tmp_path):
    """26 PNG (13 × 2) mit 1440 × 900, bereit_ms ≤ 3000, 0 Eingaben, paarweise verschieden."""
    liste = pruefen("zustaende", "--out", str(tmp_path))
    assert len(liste) == 26
    assert {(e["zustand"], e["thema"]) for e in liste} == {
        (z, t) for z in ZUSTAENDE for t in ("hell", "dunkel")
    }
    hashes = set()
    for e in liste:
        datei = Path(e["datei"])
        if not datei.is_absolute():
            datei = tmp_path / datei
        assert _png_groesse(datei) == (1440, 900), e
        assert e["bereit_ms"] <= 3000, e
        assert e["eingaben"] == 0, e
        hashes.add(hashlib.sha256(datei.read_bytes()).hexdigest())
    assert len(hashes) == 26, "zwei Screenshots sind pixelgleich"
    assert len(list(tmp_path.rglob("*.png"))) == 26


def test_unbekannter_zustand():
    """`?zustand=gibt-es-nicht`: bereit ≤ 3000 ms, Leerer Zustand, genau ein Befund, 0 Konsolenfehler."""
    e = ablauf("e", "unbekannter-zustand")
    assert e["bereit_ms"] <= 3000
    assert e["zustand_gezeigt"] == "leer"
    assert e["befunde"] in (["Zustand unbekannt"], ["zustand.unbekannt"])
    assert e["konsolenfehler"] == 0
