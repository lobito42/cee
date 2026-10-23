"""AK-1, AK-2: Requirements „Eigenständiger Prototyp ohne Server und Netz“ und „Testzustände per Adresse“."""

# ruff: noqa: E501

from __future__ import annotations

import json
import re
import tempfile
from pathlib import Path

from conftest import need
from grundlagen_helpers import (
    FENSTER,
    THEMEN,
    ZUSTAENDE,
    P,
    bauen,
    git,
    npm,
    png_info,
    pruefen,
)

ERLAUBT = {"three", "lucide", "@fontsource-variable/inter", "@fontsource/jetbrains-mono"}


def test_bauen_lint_und_unit_tests():
    """Requirement Eigenständiger Prototyp – Scenario „Bauen, Lint und Unit-Tests“: alle drei Exit 0, dist/index.html."""
    bauen()
    assert (P / "dist" / "index.html").is_file(), "dist/index.html fehlt"
    for args in (["run", "lint"], ["test"]):
        r = npm(*args)
        assert r.returncode == 0, f"npm {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"


def test_keine_anfrage_an_fremde_hosts():
    """Requirement Eigenständiger Prototyp – Scenario „Keine Anfrage an fremde Hosts“: 0 Einträge."""
    a = pruefen("anfragen")["anfragen"]
    assert a == [], a[:10]


def test_abhaengigkeiten_und_lizenzen():
    """Requirement Eigenständiger Prototyp – Scenario „Abhängigkeiten und Lizenzen“: nur vier Pakete, 0 GPL/AGPL/LGPL."""
    paket = json.loads((P / "package.json").read_text("utf-8"))
    assert set(paket.get("dependencies", {})) == ERLAUBT, paket.get("dependencies")
    bauen()
    modul = P / "node_modules"
    assert modul.is_dir(), "node_modules fehlt (npm ci)"
    pakete = [p / "package.json" for p in modul.glob("*/package.json")]
    pakete += [p / "package.json" for p in modul.glob("@*/*") if (p / "package.json").is_file()]
    assert pakete, "keine installierten Pakete gefunden"
    gpl = re.compile(r"(?<![A-Za-z])(?:A|L)?GPL", re.I)
    funde = []
    for pj in pakete:
        d = json.loads(pj.read_text("utf-8"))
        lizenz = d.get("license") or d.get("licenses") or ""
        text = json.dumps(lizenz) if not isinstance(lizenz, str) else lizenz
        if gpl.search(text):
            funde.append((d.get("name"), text))
    assert funde == [], funde


def test_ap41_prototyp_unveraendert():
    """Requirement Eigenständiger Prototyp: `spikes/ux-prototyp/` (ap-41) bleibt unverändert gegenüber `main`."""
    basis = None
    for ref in ("origin/main", "main"):
        r = git("merge-base", "HEAD", ref)
        if r.returncode == 0 and r.stdout.strip():
            basis = r.stdout.strip()
            break
    assert basis, "kein Vergleichsstand main gefunden"
    d = git("diff", "--name-only", basis, "HEAD", "--", "spikes/ux-prototyp")
    assert d.returncode == 0, d.stderr
    assert d.stdout.strip() == "", d.stdout


def test_screenshots_ohne_klicken():
    """Requirement Testzustände per Adresse – Scenario „Screenshots ohne Klicken“: 44 PNG 1440×900, bereit_ms ≤ 3000,
    0 Eingaben, keine zwei gleichen Pixel-Hashes."""
    need("npm")
    with tempfile.TemporaryDirectory() as out:
        liste = pruefen("zustaende", "--out", out, frisch=True)
        assert len(liste) == 44, len(liste)
        assert {(e["zustand"], e["thema"]) for e in liste} == {(z, t) for z in ZUSTAENDE for t in THEMEN}
        hashes = {}
        for e in liste:
            datei = Path(e["datei"])
            if not datei.is_absolute():
                datei = Path(out) / datei
            b, h, pixel_hash = png_info(datei)
            assert (b, h) == FENSTER, (e["zustand"], e["thema"], b, h)
            assert e["bereit_ms"] <= 3000, (e["zustand"], e["thema"], e["bereit_ms"])
            assert e["eingaben"] == 0, (e["zustand"], e["thema"], e["eingaben"])
            hashes.setdefault(pixel_hash, []).append((e["zustand"], e["thema"]))
        gleiche = [v for v in hashes.values() if len(v) > 1]
        assert gleiche == [], gleiche


def test_unbekannter_zustand():
    """Requirement Testzustände per Adresse – Scenario „Unbekannter Zustand“: bereit ≤ 3000 ms, Leerer Zustand,
    genau ein Befund „Zustand unbekannt“, 0 Konsolenfehler."""
    z = pruefen("zustand", "--name", "gibt-es-nicht")
    assert z["bereit_ms"] <= 3000, z["bereit_ms"]
    assert z["zustand_gezeigt"] == "leer", z["zustand_gezeigt"]
    assert z["befunde"] == ["Zustand unbekannt"], z["befunde"]
    assert z["konsolenfehler"] == [], z["konsolenfehler"]
    assert z["struktur"] == [], "Leerer Zustand zeigt keine Elemente"
