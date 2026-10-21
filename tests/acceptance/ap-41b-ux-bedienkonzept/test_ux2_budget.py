"""AK-16: Komplexitätsbudget und Reaktion (Requirement „Komplexitätsbudget und Reaktion“)."""

# ruff: noqa: E501  (Docstrings nennen die Soll-Werte der Scenarios)

from __future__ import annotations

import statistics

from ux2_helpers import THEMEN, ZUSTAENDE, muster_katalog, pruefen, quelltexte, register

KANDIDATEN = {"Pfad", "Legende", "Gespräch"}
KENNZAHLEN = ("auswahl_p95_ms", "hover_p95_ms", "wert_live_p95_ms", "darstellung_p95_ms", "suche_p95_ms")


def test_budget_in_allen_zustaenden():
    """17 Zustände × 2 Themen: 2 Panels, ≤ 5 Arbeitsbereiche, 0 Werkzeugleisten, ≤ 1 Hauptaktion, 0 Dialoge; Muster ⊆ Katalog."""
    b = pruefen("budget")
    assert {(z["zustand"], z["thema"]) for z in b["zustaende"]} == {(n, t) for n in ZUSTAENDE for t in THEMEN}
    katalog = muster_katalog()
    assert katalog, "keine Muster in docs/design/muster.md gefunden"
    muster: set[str] = set()
    kandidaten: set[str] = set()
    for z in b["zustaende"]:
        name = (z["zustand"], z["thema"])
        assert len(z["panels"]) == 2 and len(set(z["panels"])) == 2, (name, z["panels"])
        assert 1 <= len(z["arbeitsbereiche"]) <= 5, name
        assert z["werkzeugleisten"] == [], (name, z["werkzeugleisten"])
        assert len(z["hauptaktionen"]) <= 1, (name, z["hauptaktionen"])
        assert z["modale_dialoge"] == [], name
        assert z["muster"], f"{name}: keine Muster gemeldet"
        muster |= set(z["muster"])
        kandidaten |= set(z["muster_kandidaten"])
        unzulaessig = [f for f in z["farben"] if f.get("akzent_rolle") == "unzulaessig"]
        assert unzulaessig == [], (name, unzulaessig)
    assert muster <= katalog, muster - katalog
    assert kandidaten <= KANDIDATEN, kandidaten - KANDIDATEN


def test_hoechstens_zehn_kuerzel_im_budget():
    """Die gemeldeten Kürzel sind höchstens 10, eindeutig und entsprechen dem Register."""
    kuerzel = pruefen("budget")["kuerzel"]
    assert 0 < len(kuerzel) <= 10, kuerzel
    assert len(set(kuerzel)) == len(kuerzel)
    assert len(kuerzel) == sum(1 for r in register() if r.get("kuerzel"))


def test_keine_dialoge_im_quelltext():
    """0 Vorkommen von alert(, confirm(, prompt(, showModal( in src/."""
    assert quelltexte(), "src/ fehlt oder ist leer"
    funde = [
        f"{p.name}: {w}"
        for p in quelltexte()
        if p.suffix in (".ts", ".js", ".html", ".css", ".json")
        for w in ("alert(", "confirm(", "prompt(", "showModal(")
        if w in p.read_text("utf-8", errors="ignore")
    ]
    assert not funde, funde


def test_reaktion_unter_100_ms():
    """Median über 3 Läufe jeder Kennzahl (p95 aus je 20 Messungen) < 100 ms."""
    laeufe = [pruefen("messen", frisch=True) for _ in range(3)]
    for kennzahl in KENNZAHLEN:
        assert statistics.median(m[kennzahl] for m in laeufe) < 100, kennzahl
