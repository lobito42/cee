"""Hilfen für die Abnahmetests ap-49-spike-auswahl: Prototyp aufrufen, Ziele mit Toleranz vergleichen.

Schnittstelle (design.md – Befehle), alle Ausgaben JSON auf stdout:

- `bash spikes/auswahl/run.sh <fall>`: `{"elemente": [{"id", "type", …}], "ziele": [Ziel], "befunde":
  [Befund], "zustaende": {"folgeelement": str, "unabhaengig": str}}`; `elemente` sind die Elemente des
  Halters, `zustaende` nur bei K3. Ziel wie in `tests/golden/ap-49-spike-auswahl/faelle.json`:
  `{"art", "geometrie", "schwerpunkt_mm", "richtung"}`. Befund: `{"code", "element", "kandidaten": [Ziel]}`.
- `… <fall> --shuffle <seed>`: wie oben, Kernel liefert Flächen und Kanten gemischt.
- `… <fall> --element`: das gespeicherte Regel-Element (ADR-028).
- `bash spikes/auswahl/bench.sh --json`: Kennzahlen aus design.md (`treffer_quote`, `einordnung`, …).
"""

from __future__ import annotations

import functools
import json
import math

from conftest import ROOT, need_module, sh

SPIKE = ROOT / "spikes" / "auswahl"
GOLDEN = ROOT / "tests" / "golden" / "ap-49-spike-auswahl" / "faelle.json"
RESULTS = ROOT / "docs" / "spikes" / "auswahl.json"
REPORT = ROOT / "docs" / "spikes" / "auswahl.md"

REGELN = ("R1", "R2", "R3", "R4", "R5")
SAETZE = ("P0", "P1", "P2", "P3")
FAELLE = tuple(f"{r}-{p}" for r in REGELN for p in SAETZE)
TOL_SCHWERPUNKT_MM = 1e-3
TOL_RICHTUNG_RAD = 1e-6


def golden() -> dict:
    return json.loads(GOLDEN.read_text(encoding="utf-8"))


def soll(fall: str) -> dict:
    """Eintrag aus dem Testkorpus: `R1-P0` … `R5-P3` oder `K1` … `K3`."""
    for f in golden()["faelle"]:
        name = f["fall"] if "fall" in f else f"{f['regel']}-{f['satz']}"
        if name == fall:
            return f
    raise KeyError(fall)


def _json(cmd: list[str], timeout: int) -> dict:
    need_module("build123d")
    res = sh(cmd, timeout=timeout)
    assert res.returncode == 0, (
        f"{' '.join(cmd[1:])} → Exit {res.returncode}: {(res.stdout + res.stderr)[-2000:]}"
    )
    try:
        return json.loads(res.stdout)
    except json.JSONDecodeError as err:
        raise AssertionError(f"{' '.join(cmd[1:])}: keine JSON-Ausgabe: {res.stdout[-1000:]}") from err


@functools.cache
def run(fall: str, *extra: str) -> dict:
    """`run.sh <fall> [extra…]` ausführen; Exit-Code 0 ist Pflicht (Befund statt Absturz)."""
    return _json(["bash", str(SPIKE / "run.sh"), fall, *extra], timeout=300)


@functools.lru_cache(maxsize=1)
def bench() -> dict:
    """`bench.sh --json` einmal je Testlauf selbst ausführen (Messwerte nachmessen, nicht glauben)."""
    return _json(["bash", str(SPIKE / "bench.sh"), "--json"], timeout=3600)


def _winkel(a: list[float], b: list[float], vorzeichen: bool) -> float:
    na, nb = math.sqrt(sum(x * x for x in a)), math.sqrt(sum(x * x for x in b))
    if na == 0 or nb == 0:
        return math.inf
    c = sum(x * y for x, y in zip(a, b, strict=True)) / (na * nb)
    if not vorzeichen:  # Linien und Zylinderachsen haben keine Orientierung
        c = abs(c)
    return math.acos(max(-1.0, min(1.0, c)))


def gleich(ist: dict, soll_ziel: dict) -> bool:
    """Ein Ziel ist getroffen: Art und Geometrietyp gleich, Schwerpunkt ≤ 10⁻³ mm, Richtung ≤ 10⁻⁶ rad."""
    if ist.get("art") != soll_ziel["art"] or ist.get("geometrie") != soll_ziel["geometrie"]:
        return False
    try:
        p, q = [float(x) for x in ist["schwerpunkt_mm"]], soll_ziel["schwerpunkt_mm"]
        r = [float(x) for x in ist["richtung"]]
    except (KeyError, TypeError, ValueError):
        return False
    if len(p) != 3 or len(r) != 3 or math.dist(p, q) > TOL_SCHWERPUNKT_MM:
        return False
    vorzeichen = soll_ziel["geometrie"] == "ebene"  # Flächennormale zeigt nach außen
    return _winkel(r, soll_ziel["richtung"], vorzeichen) <= TOL_RICHTUNG_RAD


def gleiche_menge(ist: list[dict], soll_ziele: list[dict]) -> bool:
    """Alle Sollziele getroffen und keine weiteren (eindeutige Zuordnung)."""
    if len(ist) != len(soll_ziele):
        return False
    offen = list(soll_ziele)
    for z in ist:
        treffer = next((s for s in offen if gleich(z, s)), None)
        if treffer is None:
            return False
        offen.remove(treffer)
    return not offen
