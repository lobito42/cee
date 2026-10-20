"""Hilfen für die Abnahmetests von ap-41: Prototyp bauen, Prüfwerkzeug aufrufen, Modell durchsuchen.

Schnittstelle des Prüfwerkzeugs (`npm run --silent pruefen -- <befehl> … --json`, Ausgabe: ein JSON-Wert auf
stdout; Annahmen, die design.md offenlässt, sind hier festgelegt und im PR vermerkt):

- `zustaende --out <dir>`: Liste `{zustand, thema, datei, bereit_ms, eingaben}`
- `budget`: `{"zustaende": [{zustand, thema, werkzeuge, arbeitsbereiche, panels, hauptaktionen, muster: [..],
  modale_dialoge, farben_ausserhalb_tokens, akzent_unzulaessig, ohne_befehl: [..], body_schrift,
  karten: [{muster, quelle}]}],
  "kuerzel": <Zahl>}`
- `befehle`: Liste `{befehl, rang, ausgefuehrt, kuerzel_angezeigt}`
- `texte`: `{"feste_texte": [..], "git_begriffe": [..], "speichern_knoepfe": <Zahl>}`
- `ablauf <a-f> [--variante <name>]`: `{modell, protokoll, eingaben, soll_erreicht, ...}`
- `anfragen`: `{"fremd": [..]}`
- `messen`: `{auswahl_p95_ms, werkzeug_p95_ms, suche_p95_ms}`
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

from conftest import ROOT, need

P = ROOT / "spikes" / "ux-prototyp"
LEITFADEN = ROOT / "docs" / "spikes" / "ux-prototyp.md"

ZUSTAENDE = [
    "leer", "skizze", "extrusion", "platte", "verrundung", "befund", "teile",
    "verbindung", "suche", "entwuerfe", "vergleich", "ki-arbeitet", "ki-vorschlag",
]  # fmt: skip

_gebaut = False


def bauen() -> None:
    """`build.sh` einmal je Testlauf; ein Fehlschlag ist ein Testfehler."""
    global _gebaut
    if _gebaut:
        return
    assert P.is_dir(), "spikes/ux-prototyp/ fehlt"
    assert (P / "build.sh").is_file(), "spikes/ux-prototyp/build.sh fehlt"
    need("bash")
    need("npm")
    r = subprocess.run(["bash", str(P / "build.sh")], cwd=ROOT, capture_output=True, text=True, timeout=1800)
    assert r.returncode == 0, r.stdout[-2000:] + r.stderr[-2000:]
    _gebaut = True


def npm(*args: str, timeout: int = 900) -> subprocess.CompletedProcess:
    bauen()
    return subprocess.run(["npm", *args], cwd=P, capture_output=True, text=True, timeout=timeout)


def pruefen(*args: str, timeout: int = 900):
    """Prüfwerkzeug aufrufen und die JSON-Ausgabe zurückgeben."""
    r = npm("run", "--silent", "pruefen", "--", *args, "--json", timeout=timeout)
    assert r.returncode == 0, f"pruefen {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


def ablauf(name: str, variante: str | None = None) -> dict:
    args = ["ablauf", name]
    if variante:
        args += ["--variante", variante]
    return pruefen(*args)


def knoten(wert):
    """Alle Dicts eines JSON-Baums."""
    if isinstance(wert, dict):
        yield wert
        for v in wert.values():
            yield from knoten(v)
    elif isinstance(wert, list):
        for v in wert:
            yield from knoten(v)


def finde(modell, *typen: str) -> list[dict]:
    """Elemente, deren `type` einen der Namen (ohne Groß-/Kleinschreibung) enthält."""
    return [
        k for k in knoten(modell)
        if isinstance(k.get("type"), str) and any(t in k["type"].lower() for t in typen)
    ]  # fmt: skip


def mm(groesse) -> float:
    """Größe `{"value", "unit"}` in mm."""
    faktor = {"mm": 1.0, "cm": 10.0, "m": 1000.0}[groesse["unit"]]
    return groesse["value"] * faktor


def param(element: dict, *namen: str):
    """Wert aus `params` (oder dem Element selbst) unter einem der Namen."""
    for quelle in (element.get("params") or {}, element):
        for n in namen:
            if n in quelle:
                return quelle[n]
    raise AssertionError(f"Parameter {namen} fehlt in {json.dumps(element)[:300]}")


def protokoll_befehle(ergebnis: dict) -> list[dict]:
    return ergebnis["protokoll"]


def register() -> list[dict]:
    daten = json.loads((P / "src" / "befehle.json").read_text("utf-8"))
    return daten if isinstance(daten, list) else daten["befehle"]


def quelltexte() -> list[Path]:
    src = P / "src"
    return [p for p in src.rglob("*") if p.is_file() and "erzeugt" not in p.relative_to(src).parts]
