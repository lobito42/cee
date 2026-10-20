"""AK-1, AK-11: eigenständiger Prototyp ohne Server und Netz (Requirement „Eigenständiger Prototyp“)."""

from __future__ import annotations

import json

from conftest import sh
from ux_helpers import P, bauen, npm, pruefen

LAUFZEIT = {"three", "lucide", "@fontsource-variable/inter", "@fontsource/jetbrains-mono"}


def test_bauen_lint_unit():
    """Bauen, Lint und Unit-Tests enden mit 0; dist/index.html existiert; ≥ 10 Wertfeld-Fälle."""
    bauen()
    assert (P / "dist" / "index.html").is_file()
    assert npm("run", "lint").returncode == 0
    r = npm("test")
    assert r.returncode == 0, r.stdout[-1500:]
    tests = list((P / "src").rglob("*.test.ts"))
    wert = [p for p in tests if "wert" in p.name.lower()]
    faelle = sum(p.read_text("utf-8").count("it(") + p.read_text("utf-8").count("test(") for p in wert)
    assert faelle >= 10 or any("it.each" in p.read_text("utf-8") for p in wert), (
        "mindestens 10 Wertfeld-Fälle"
    )
    quelle = "\n".join(p.read_text("utf-8") for p in tests)
    for erwartet in ("8 cm", "60 + 20", "0,08 m", "5 kg"):
        assert erwartet in quelle, f"Wertfeld-Fall „{erwartet}“ fehlt"


def test_keine_anfrage_an_fremde_hosts():
    """Alle Zustände und Abläufe A bis F stellen 0 Anfragen an fremde Hosts."""
    assert pruefen("anfragen")["fremd"] == []


def test_abhaengigkeiten_und_lizenzen():
    """`dependencies` nur aus der Liste; keine GPL/AGPL/LGPL unter den installierten Paketen."""
    paket = json.loads((P / "package.json").read_text("utf-8"))
    assert set(paket.get("dependencies", {})) <= LAUFZEIT
    bauen()
    r = sh(["npm", "ls", "--all", "--json", "--long"], cwd=P)
    baum = json.loads(r.stdout or "{}")
    schlecht: list[str] = []

    def lauf(knoten: dict) -> None:
        for name, d in (knoten.get("dependencies") or {}).items():
            lizenz = str(d.get("license") or d.get("licenses") or "")
            if "GPL" in lizenz.upper():  # deckt GPL, AGPL und LGPL ab
                schlecht.append(f"{name}: {lizenz}")
            lauf(d)

    lauf(baum)
    assert not schlecht, schlecht
