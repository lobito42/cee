"""AK-9, AK-10: Komplexitätsbudget und Reaktion (Requirement „Komplexitätsbudget und Reaktion“)."""

from __future__ import annotations

import re
import statistics

from ux_helpers import ROOT, ZUSTAENDE, pruefen, quelltexte, register

WERKZEUGE = [
    "werkzeug.auswaehlen",
    "werkzeug.messen",
    "werkzeug.schnitt",
    "werkzeug.skizze",
    "werkzeug.fragen",
]


def _muster_katalog() -> set[str]:
    text = (ROOT / "docs" / "design" / "muster.md").read_text("utf-8")
    return {m.group(1) for m in re.finditer(r"^\| \*\*([^*]+)\*\* \|", text, re.M)}


def test_budget_in_allen_zustaenden():
    """5 Werkzeuge, ≤ 5 Arbeitsbereiche, 2 Panels, ≤ 1 Hauptaktion, 0 Dialoge, Muster ⊆ Katalog."""
    b = pruefen("budget")
    zustaende = b["zustaende"]
    assert {(z["zustand"], z["thema"]) for z in zustaende} == {
        (n, t) for n in ZUSTAENDE for t in ("hell", "dunkel")
    }
    katalog = _muster_katalog()
    assert 19 <= len(katalog) <= 20
    alle: set[str] = set()
    for z in zustaende:
        name = z["zustand"]
        assert sorted(z["werkzeuge"]) == sorted(WERKZEUGE), name
        assert 1 <= len(z["arbeitsbereiche"]) <= 5, name
        assert len(z["panels"]) == 2 and len(set(z["panels"])) == 2, (name, z["panels"])
        assert len(z["hauptaktionen"]) <= 1, (name, z["hauptaktionen"])
        assert z["modale_dialoge"] == [], name
        assert z["muster"], f"{name}: keine Muster gemeldet"
        alle |= set(z["muster"])
    assert alle <= katalog, alle - katalog
    assert len(alle) <= 20
    assert 0 < len(b["kuerzel"]) < 15, b["kuerzel"]
    assert len(set(b["kuerzel"])) == len(b["kuerzel"])
    assert len(b["kuerzel"]) == sum(1 for r in register() if r.get("kuerzel"))


def test_keine_chat_fenster_entscheidungskarte():
    """KI-Zustände: 2 Panels; Karte mit Muster Entscheidungskarte und Quelle ki."""
    zustaende = {z["zustand"]: z for z in pruefen("budget")["zustaende"]}
    for name in ("ki-arbeitet", "ki-vorschlag"):
        assert len(zustaende[name]["panels"]) == 2
    karten = zustaende["ki-vorschlag"]["karten"]
    assert {"muster": "Entscheidungskarte", "quelle": "ki"} in karten


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
    """Median über 3 Läufe von auswahl_p95_ms, werkzeug_p95_ms, suche_p95_ms jeweils < 100."""
    laeufe = [pruefen("messen") for _ in range(3)]
    for kennzahl in ("auswahl_p95_ms", "werkzeug_p95_ms", "suche_p95_ms"):
        assert statistics.median(m[kennzahl] for m in laeufe) < 100, kennzahl
