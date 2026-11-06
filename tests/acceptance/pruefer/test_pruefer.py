"""Runde 1 (ADR-068): Der CEE-Prüfer erkennt, ob ein SolidCraft-Teil wirklich parametrisch ist.

Die Tests holen bei Bedarf die fest gewählte SolidCraft-Version (Linux x86_64) in den Zwischenspeicher.
"""

from __future__ import annotations

import platform
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / "pruefer"))

from cee_pruefer.__main__ import main  # noqa: E402
from cee_pruefer.pruefen import pruefen  # noqa: E402
from cee_pruefer.solidcraft import Sitzung, als_teil, finden  # noqa: E402

TEILE = ROOT / "parts" / "solidcraft"

pytestmark = pytest.mark.skipif(
    platform.system() != "Linux" or platform.machine() not in ("x86_64", "AMD64"),
    reason="SolidCraft wird für diese Tests nur für Linux x86_64 geholt",
)


@pytest.fixture(scope="module")
def cli() -> Path:
    return finden()


def _pruefe(name: str, cli: Path):
    teil = als_teil(TEILE / name, cli)
    with Sitzung(teil, cli) as sitzung:
        return pruefen(teil, sitzung)


def test_winkelhalter_ist_parametrisch_und_grenze_wird_gefunden(cli: Path) -> None:
    e = _pruefe("winkelhalter.json", cli)
    titel = [b.titel for b in e.befunde]
    assert not any(b.art == "fehler" for b in e.befunde), titel
    assert not any("nicht vollständig bestimmt" in t for t in titel), titel
    # Breite, Dicke und Steghöhe halten ihren Bereich
    for name in ("breite", "dicke", "steg_hoehe"):
        assert e.haltbar[name] == "hält im ganzen Bereich", (name, e.haltbar)
    # Tiefe kippt, wenn die Bohrung (r = 3,3 mm bei y = Dicke/2) aus der Platte ragt: 2 × (4 + 3,3) = 14,6 mm
    assert e.haltbar["tiefe"].startswith("kippt unter")
    grenze = float(e.haltbar["tiefe"].split("≈")[1].split()[0].replace(",", "."))
    assert grenze == pytest.approx(14.6, abs=0.2)
    # Rollen aus dem Kommentar
    rollen = {g.name: g.rolle for g in e.groessen}
    assert rollen["rand"] == "fest" and rollen["breite"] == "groesse"
    # Gewinde als Größe fehlt in SolidCraft: als Hinweis gemeldet
    assert any(b.art == "hinweis" and "Durchmesser" in b.titel for b in e.befunde)


def test_beispiel_mit_gezeichneten_zahlen_wird_erkannt(cli: Path) -> None:
    e = _pruefe("solidcraft-beispiel-bracket.json", cli)
    titel = " | ".join(b.titel for b in e.befunde)
    assert "Skizze „Profile“ ist nicht vollständig bestimmt" in titel
    assert "Skizze „Holes“ ist nicht vollständig bestimmt" in titel
    assert "Radius 2 ist eine feste Zahl" in titel
    assert "Größe „width“ hat keinen Bereich" in titel


def test_bericht_und_rueckgabe(cli: Path, tmp_path: Path) -> None:
    bericht = tmp_path / "bericht.html"
    code = main([str(TEILE / "winkelhalter.json"), "--bericht", str(bericht), "--ohne-bilder"])
    assert code == 0  # Warnungen und Hinweise, aber kein Fehler
    text = bericht.read_text(encoding="utf-8")
    assert "Prüfbericht: winkelhalter" in text and "kippt unter" in text
