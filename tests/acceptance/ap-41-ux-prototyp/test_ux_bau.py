"""AK-1, AK-11: eigenständiger Prototyp ohne Server und Netz (Requirement „Eigenständiger Prototyp“)."""

from __future__ import annotations

import json
import re
from urllib.parse import urlparse

from conftest import ROOT, sh
from ux_helpers import P, bauen, npm, pruefen

LAUFZEIT = {"three", "lucide", "@fontsource-variable/inter", "@fontsource/jetbrains-mono"}

# ADR-034 (ergänzt durch ADR-061): MPL, Apache, MIT, BSD, ISC, Zlib sowie gleichwertig freizügige Lizenzen.
ERLAUBT = {
    "MPL-2.0", "MPL-1.1", "APACHE-2.0", "MIT", "MIT-0", "ISC", "ZLIB", "CC0-1.0", "UNICODE-3.0",
    "UNICODE-DFS-2016", "0BSD", "BSL-1.0", "PSF-2.0", "OFL-1.1", "BSD-2-CLAUSE", "BSD-3-CLAUSE", "BSD",
    "PYTHON-2.0", "UNLICENSE", "BLUEOAK-1.0.0", "CC-BY-4.0",  # gleichwertig freizügig (Entwicklungswerkzeuge)
}  # fmt: skip
HOST_ERLAUBT_IN_QUELLE = {"www.w3.org"}  # XML-Namensräume, keine Anfragen
LOKAL = {"localhost", "127.0.0.1", "[::1]", "::1"}


def test_bauen_lint_unit():
    """Bauen, Lint und Unit-Tests enden mit 0; dist/index.html existiert; ≥ 10 Wertfeld-Fälle."""
    bauen()
    assert (P / "dist" / "index.html").is_file()
    assert npm("run", "lint").returncode == 0
    r = npm("test")
    assert r.returncode == 0, r.stdout[-1500:]
    tests = list((P / "src").rglob("*.test.ts"))
    wert = [p for p in tests if "wert" in p.name.lower()]
    assert wert, "keine Testdatei für das Wertfeld"
    faelle = sum(len(re.findall(r"^\s*(?:it|test)\(", p.read_text("utf-8"), re.M)) for p in wert)
    assert faelle >= 10, f"mindestens 10 Wertfeld-Fälle, gefunden {faelle}"
    quelle = "\n".join(p.read_text("utf-8") for p in tests)
    for erwartet in ("8 cm", "60 + 20", "0,08 m", "5 kg"):
        assert erwartet in quelle, f"Wertfeld-Fall „{erwartet}“ fehlt"


def test_keine_anfrage_an_fremde_hosts():
    """Alle Zustände und Abläufe A bis F stellen 0 Anfragen an fremde Hosts (URLs selbst prüfen)."""
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


def test_keine_fremden_urls_in_quelle_und_dist():
    """Statisch: in `src/` und `dist/` keine http(s)-URLs zu fremden Hosts (außer XML-Namensräumen)."""
    bauen()
    funde = []
    for wurzel in (P / "src", P / "dist"):
        assert wurzel.is_dir(), f"{wurzel.relative_to(ROOT)} fehlt"
        for p in wurzel.rglob("*"):
            if not p.is_file() or p.suffix in (".png", ".woff", ".woff2", ".ttf", ".ico", ".jpg", ".webp"):
                continue
            for m in re.finditer(r"https?://([^/\s\"'`)<>\\]+)", p.read_text("utf-8", errors="ignore")):
                host = m.group(1).split(":")[0].lower()
                if host not in HOST_ERLAUBT_IN_QUELLE and host not in {"localhost", "127.0.0.1"}:
                    funde.append(f"{p.relative_to(P)}: {m.group(0)}")
    assert not funde, funde[:20]


def _lizenz_erlaubt(lizenz: str) -> bool:
    """SPDX-Ausdruck: bei „OR“ genügt eine erlaubte Alternative, bei „AND“ müssen alle erlaubt sein."""
    ausdruck = lizenz.replace("(", " ").replace(")", " ").upper()
    return any(
        all(teil.strip() in ERLAUBT for teil in alt.split(" AND ") if teil.strip())
        for alt in ausdruck.split(" OR ")
        if alt.strip()
    )


def _lizenz_von(d: dict) -> str:
    lizenz = d.get("license")
    if isinstance(lizenz, dict):
        lizenz = lizenz.get("type")
    if not lizenz and isinstance(d.get("licenses"), list):
        lizenz = " OR ".join(x.get("type", "") if isinstance(x, dict) else str(x) for x in d["licenses"])
    return str(lizenz or "").strip()


def test_abhaengigkeiten_und_lizenzen():
    """`dependencies` nur aus der Liste; jedes installierte Paket hat eine freizügige Lizenz (ADR-034)."""
    paket = json.loads((P / "package.json").read_text("utf-8"))
    assert set(paket.get("dependencies", {})) <= LAUFZEIT
    bauen()
    r = sh(["npm", "ls", "--all", "--json", "--long"], cwd=P)
    baum = json.loads(r.stdout or "{}")
    assert baum.get("dependencies"), "npm ls liefert keine Abhängigkeiten"
    pakete: dict[str, str] = {}

    def lauf(knoten: dict) -> None:
        for name, d in (knoten.get("dependencies") or {}).items():
            pakete[f"{name}@{d.get('version', '?')}"] = _lizenz_von(d)
            lauf(d)

    lauf(baum)
    assert len(pakete) > 20, f"nur {len(pakete)} Pakete im Baum gefunden"
    ohne = [n for n, lz in pakete.items() if not lz]
    assert not ohne, f"Lizenz fehlt: {ohne[:10]}"
    schlecht = [f"{n}: {lz}" for n, lz in pakete.items() if not _lizenz_erlaubt(lz)]
    assert not schlecht, schlecht[:20]
