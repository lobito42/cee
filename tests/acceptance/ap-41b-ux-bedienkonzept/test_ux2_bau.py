"""AK-1: Requirement „Eigenständiger Prototyp ohne Server und Netz“."""

from __future__ import annotations

import json
import re
import subprocess
from urllib.parse import urlparse

from conftest import ROOT, need, sh, strict
from ux2_helpers import P, bauen, npm, pruefen

LAUFZEIT = {"three", "lucide", "@fontsource-variable/inter", "@fontsource/jetbrains-mono"}

# ADR-034 (ergänzt durch ADR-061): freizügige Lizenzen; GPL, AGPL und LGPL sind ausgeschlossen.
VERBOTEN = re.compile(r"\b(?:A?GPL|LGPL)", re.I)
LOKAL = {"localhost", "127.0.0.1", "[::1]", "::1"}


def _testfaelle(dateien) -> int:
    return sum(
        len(re.findall(r"^\s*(?:it|test)(?:\.each\([^)]*\))?\(", p.read_text("utf-8"), re.M)) for p in dateien
    )


def test_bauen_lint_unit():
    """Bauen, Lint und Unit-Tests enden mit 0; `dist/index.html` existiert."""
    bauen()
    assert (P / "dist" / "index.html").is_file()
    r = npm("run", "lint")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]
    r = npm("test")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]


def test_unit_faelle_wertfeld():
    """≥ 10 Wertfeld-Fälle, darunter „8 cm“ → 80 mm, „0,1 kN“ → 100 N, „5 kg“ im Längenfeld → Befund."""
    tests = list((P / "src").rglob("*.test.ts"))
    wert = [p for p in tests if "wert" in str(p.relative_to(P)).lower()]
    assert wert, "keine Testdatei für das Wertfeld (src/wert/…test.ts)"
    assert _testfaelle(wert) >= 10, f"mindestens 10 Wertfeld-Fälle, gefunden {_testfaelle(wert)}"
    quelle = "\n".join(p.read_text("utf-8") for p in wert)
    for erwartet in ("8 cm", "0,1 kN", "5 kg"):
        assert erwartet in quelle, f"Wertfeld-Fall „{erwartet}“ fehlt"
    assert re.search(r"\b80\b", quelle) and re.search(r"\b100\b", quelle)


def test_unit_faelle_volumen():
    """≥ 3 Fälle für das Volumen des Halters mit den drei Ständen aus design.md (± 0,1 %)."""
    tests = list((P / "src").rglob("*.test.ts"))
    geo = [p for p in tests if "geometrie" in str(p.relative_to(P)).lower()]
    assert geo, "keine Testdatei unter src/geometrie/"
    assert _testfaelle(geo) >= 3
    quelle = "\n".join(p.read_text("utf-8") for p in geo)
    for soll in ("49485", "57485", "55254"):
        assert re.search(soll[:2] + r"[._\s]?" + soll[2:], quelle), (
            f"Volumen-Stand {soll} mm³ fehlt in den Tests"
        )


def test_keine_anfrage_an_fremde_hosts():
    """Alle Testzustände und Abläufe A bis H: 0 Anfragen an andere Hosts als die lokale Vorschau."""
    anfragen = pruefen("anfragen")["anfragen"]
    assert anfragen, "keine einzige Anfrage aufgezeichnet (die Seite selbst wird geladen)"
    fremd = []
    for url in anfragen:
        teile = urlparse(url)
        if teile.scheme in ("data", "blob", "about"):
            continue
        if teile.scheme not in ("http", "https", "ws", "wss") or teile.hostname not in LOKAL:
            fremd.append(url)
    assert fremd == [], fremd[:10]


def _lizenz_von(d: dict) -> str:
    lizenz = d.get("license")
    if isinstance(lizenz, dict):
        lizenz = lizenz.get("type")
    if not lizenz and isinstance(d.get("licenses"), list):
        lizenz = " OR ".join(x.get("type", "") if isinstance(x, dict) else str(x) for x in d["licenses"])
    return str(lizenz or "").strip()


def _verboten(lizenz: str) -> bool:
    """SPDX-Ausdruck: verboten, wenn keine Alternative ohne GPL/AGPL/LGPL bleibt."""
    alternativen = [
        a for a in re.split(r"\s+OR\s+", lizenz.replace("(", " ").replace(")", " "), flags=re.I) if a.strip()
    ]
    return all(VERBOTEN.search(a) for a in alternativen) if alternativen else False


def test_abhaengigkeiten_und_lizenzen():
    """`dependencies` nur die vier Pakete; 0 installierte Pakete mit GPL, AGPL, LGPL; jede Lizenz bekannt."""
    paket = json.loads((P / "package.json").read_text("utf-8"))
    assert paket.get("name") == "@cee/ux-prototyp-2"
    assert set(paket.get("dependencies", {})) <= LAUFZEIT, set(paket.get("dependencies", {})) - LAUFZEIT
    assert "three" in paket.get("dependencies", {})
    bauen()
    r = sh(["npm", "ls", "--all", "--json", "--long"], cwd=P)
    baum = json.loads(r.stdout or "{}")
    assert baum.get("dependencies"), "npm ls liefert keine Abhängigkeiten"
    pakete: dict[str, str] = {}

    def lauf(k: dict) -> None:
        for name, d in (k.get("dependencies") or {}).items():
            if not d.get("version"):
                continue  # nicht installiert (optional für andere Plattformen)
            pakete[f"{name}@{d['version']}"] = _lizenz_von(d)
            lauf(d)

    lauf(baum)
    assert len(pakete) > 20, f"nur {len(pakete)} Pakete im Baum gefunden"
    ohne = [n for n, lz in pakete.items() if not lz]
    assert not ohne, f"Lizenz fehlt: {ohne[:10]}"
    schlecht = [f"{n}: {lz}" for n, lz in pakete.items() if _verboten(lz)]
    assert not schlecht, schlecht[:20]


def test_alter_prototyp_unveraendert():
    """`spikes/ux-prototyp/` (ap-41) bleibt unverändert: kein Unterschied zum Stand auf `main`."""
    need("git")
    basis = subprocess.run(
        ["git", "merge-base", "HEAD", "origin/main"], cwd=ROOT, capture_output=True, text=True
    ).stdout.strip()
    if not basis:
        assert not strict(), "origin/main nicht verfügbar (git fetch origin main)"
        return
    r = sh(["git", "diff", "--name-only", basis, "--", "spikes/ux-prototyp/"])
    assert r.returncode == 0, r.stderr
    assert r.stdout.strip() == "", r.stdout.splitlines()[:10]
