"""Hilfen für die Abnahmetests von ap-50 (Wireframe-Basics): Worker aufrufen, Projekte bauen, Sollwerte nachrechnen.

Grundsatz: Alle Sollwerte (Lagen, Richtungen, Längen) rechnet der Test aus den Parametern selbst nach (design.md
Abschnitt 2); die Ergebnisse des Workers werden nur gelesen. Es gibt keine Referenzdateien unter `tests/golden/`.

Festgeschriebene Annahmen, wo design.md nur die Wirkung nennt (im PR unter „Offene Fragen“ gemeldet):

Worker (`python -m cee_worker …`, mit dem Interpreter des Tests und `worker/src` auf dem Pfad):
- `auftrag --projekt <datei>` schreibt den Auftrag als ein JSON-Dokument auf stdout; `rechnen` liest ihn von stdin und
  schreibt das Ergebnis als ein JSON-Dokument auf stdout (Schlüssel sortiert, Zeilenende erlaubt).
- Zahlen im Ergebnis sind Größen `{"value", "unit"}`; Vektoren (`position`, `origin`, `start`, `end`, `direction`,
  `normal`, `x_direction`, `x`, `y`, `z`) sind Listen aus drei Größen; `length` ist eine Größe. Richtungen: Einheit `1`.
  Ausgänge stehen in `results[i].outputs[<Ausgangsname>]` (Namen aus design.md Abschnitt 1).
- `cee_worker.auftrag.bauen(projekt: dict) -> dict` liefert denselben Auftrag wie das Kommando `auftrag`.
- `--stdio`: je Zeile ein Auftrag (kompaktes JSON), je Zeile ein Ergebnis; Befund `protocol` in `befunde` der Zeile.

Vorschau (`pruefen -- drahtmodell ablauf --zustand <n> --datei <ablauf.json> [--ohne-bruecke]`):
- Ausgabe `{"schnappschuesse": [S, …]}` (oder eine bloße Liste); `S` wie in design.md Abschnitt 6. Ein Schnappschuss je
  Schritt, der erste Schritt `{"warten_ms": 0}` liefert den Ausgangsstand.
- `lage_mm` eines Szenenobjekts: Punkte `[x, y, z]`, sonst ein Objekt mit den Feldern des Ergebnisses (`origin`,
  `direction`, `start`, `end`, `normal` …) als reine mm-Zahlen.
- Elementverweis in Schritten: eine Element-ID oder `"<typ>#<n>"` = n-tes Wurzelelement dieses Typs (Kinder eines
  Elements zählen nicht) in Anlegereihenfolge, 1-basiert. `klick` kennt `anker` (`mitte`, `ecke`; Standard: Lage des
  Elements) und `umschalt` (Erweiterung der Auswahl). `args: {"element": <Verweis>}` richtet `element.*`-Befehle auf
  ein Element, ohne zu klicken.
- Schnappschuss-Feld `ursprung` = Adresse der Vorschau (z. B. `http://127.0.0.1:5173`). Orte im Befehle-Prüfbefehl:
  `kontextaktion` (ein gewählter Punkt), `kontextaktion-mehrfach` (zwei gewählte Punkte).
- Zustandsnamen in `struktur[].zustaende`: `ausgewaehlt`, `fehlerhaft`, `verworfen`, `ausgeblendet` (wie ap-41b).
"""

# ruff: noqa: E501

from __future__ import annotations

import copy
import functools
import json
import math
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from conftest import ROOT

for _ordner in (
    "ap-41b-ux-bedienkonzept",
    "ap-41c-ux-schlankes-menue",
):  # Hilfen der Prototyp-Tests mitbenutzen
    if str(ROOT / "tests" / "acceptance" / _ordner) not in sys.path:
        sys.path.insert(0, str(ROOT / "tests" / "acceptance" / _ordner))

SRC = ROOT / "worker" / "src"
BEISPIEL = ROOT / "format" / "examples" / "drahtmodell.json"
TYPEN = ROOT / "format" / "types" / "drahtmodell.json"
AUFTRAG_SCHEMA = ROOT / "format" / "kernel" / "auftrag.schema.json"
ERGEBNIS_SCHEMA = ROOT / "format" / "kernel" / "ergebnis.schema.json"

# design.md Abschnitt 1: Ausgänge je Typ
AUSGAENGE = {
    "frame": {
        "frame": "frame",
        "origin": "point",
        "x": "line",
        "y": "line",
        "z": "line",
        "xy": "plane",
        "yz": "plane",
        "zx": "plane",
    },
    "point": {"point": "point"},
    "axis": {"line": "line"},
    "plane": {"plane": "plane"},
    "line": {"line": "line"},
    "ray": {"ray": "ray", "start": "point"},
    "segment": {"segment": "segment", "start": "point", "end": "point"},
}
EBENEN = {
    "xy": ((0, 0, 1), (1, 0, 0)),
    "yz": ((1, 0, 0), (0, 1, 0)),
    "zx": ((0, 1, 0), (0, 0, 1)),
}  # Normale, Bezugsrichtung

TOL_MM = 1e-6
TOL_RAD = 1e-9


# --- Projekte bauen -------------------------------------------------------------------------------------


def mm(v: float) -> dict:
    return {"value": v, "unit": "mm"}


def deg(v: float) -> dict:
    return {"value": v, "unit": "deg"}


def element(
    id: str,
    typ: str,
    params: dict | None = None,
    inputs: dict | None = None,
    name: str | None = None,
    content: list | None = None,
    meta: dict | None = None,
) -> dict:
    return {
        "id": id,
        "type": typ,
        "inputs": inputs or {},
        "params": params or {},
        "outputs": dict(AUSGAENGE.get(typ, {})),
        "content": content or [],
        "meta": {"name": name or id, **(meta or {})},
    }


def frame(id: str, x=0, y=0, z=0, rx=0, ry=0, rz=0, parent: str | None = None) -> dict:
    p = {"x": mm(x), "y": mm(y), "z": mm(z), "rx": deg(rx), "ry": deg(ry), "rz": deg(rz)}
    return element(id, "frame", p, {"parent": parent} if parent else {})


def punkt(id: str, x=0, y=0, z=0, frame_ref: str | None = None, ref: str | None = None) -> dict:
    inputs = {}
    if frame_ref:
        inputs["frame"] = frame_ref
    if ref:
        inputs["ref"] = ref
    return element(id, "point", {"x": mm(x), "y": mm(y), "z": mm(z)}, inputs)


def linie(typ: str, id: str, a: str, b: str) -> dict:
    return element(id, typ, {}, {"a": a, "b": b})


def projekt(*elemente: dict) -> dict:
    return {"schema_version": 1, "elements": list(elemente)}


def typen() -> list:
    assert TYPEN.is_file(), "format/types/drahtmodell.json fehlt"
    return json.loads(TYPEN.read_text(encoding="utf-8"))


def beispiel() -> dict:
    assert BEISPIEL.is_file(), "format/examples/drahtmodell.json fehlt"
    return copy.deepcopy(json.loads(BEISPIEL.read_text(encoding="utf-8")))


def alle(p: dict) -> list[dict]:
    """Alle Elemente eines Projekts oder Auftrags, auch verschachtelte Kinder (Dicts in `content`)."""
    aus: list[dict] = []

    def rein(e: dict) -> None:
        aus.append(e)
        for k in e.get("content", []):
            if isinstance(k, dict):
                rein(k)

    for e in p["elements"]:
        if isinstance(e, dict):
            rein(e)
    return aus


def finde(p: dict, id: str) -> dict:
    for e in alle(p):
        if e["id"] == id:
            return e
    raise KeyError(id)


def setze_x(p: dict, id: str, groesse: dict) -> dict:
    finde(p, id)["params"]["x"] = groesse
    return p


# --- Worker aufrufen ------------------------------------------------------------------------------------


def worker_env(extra: dict | None = None) -> dict:
    env = dict(os.environ)
    env["PYTHONPATH"] = os.pathsep.join(filter(None, [str(SRC), env.get("PYTHONPATH", "")]))
    env.update(extra or {})
    return env


def worker(args: list[str], stdin: str | None = None, extra_env: dict | None = None, timeout: int = 300):
    return subprocess.run(
        [sys.executable, "-m", "cee_worker", *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        input=stdin,
        timeout=timeout,
        env=worker_env(extra_env),
    )


def auftrag_von(p: dict) -> dict:
    with tempfile.TemporaryDirectory() as d:
        f = Path(d) / "projekt.json"
        f.write_text(json.dumps(p), encoding="utf-8")
        r = worker(["auftrag", "--projekt", str(f)])
    assert r.returncode == 0, f"cee_worker auftrag: {r.stdout[-800:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


def rechnen_roh(a: dict, extra_env: dict | None = None) -> subprocess.CompletedProcess:
    return worker(["rechnen"], stdin=json.dumps(a), extra_env=extra_env)


def rechnen_auftrag(a: dict) -> dict:
    r = rechnen_roh(a)
    assert r.returncode == 0, f"cee_worker rechnen: {r.stdout[-800:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


def berechne(p: dict) -> tuple[dict, dict]:
    """Projekt → (Auftrag, Ergebnis) über die Kommandos `auftrag` und `rechnen`."""
    a = auftrag_von(p)
    return a, rechnen_auftrag(a)


@functools.cache
def _beispiel_json() -> str:
    a, e = berechne(beispiel())
    return json.dumps([a, e])


def beispiel_berechnet() -> tuple[dict, dict]:
    a, e = json.loads(_beispiel_json())
    return a, e


# --- Ergebnisse lesen -----------------------------------------------------------------------------------


def ergebnisse(e: dict) -> dict[str, dict]:
    return {r["id"]: r for r in e["results"]}


def groesse(g: dict, einheit: str) -> float:
    assert isinstance(g, dict) and set(g) >= {"value", "unit"}, f"keine Größe: {g!r}"
    assert g["unit"] == einheit, f"Einheit {g['unit']!r} statt {einheit!r}"
    return float(g["value"])


def vec(liste: list, einheit: str = "mm") -> tuple[float, float, float]:
    assert len(liste) == 3, liste
    return tuple(groesse(g, einheit) for g in liste)  # type: ignore[return-value]


def ausgang(e: dict, id: str, name: str) -> dict:
    r = ergebnisse(e)[id]
    return r["outputs"][name]


def pos(e: dict, id: str, name: str | None = None) -> tuple[float, float, float]:
    return vec(ausgang(e, id, name or "point")["position"])


def richtung(o: dict, feld: str = "direction") -> tuple[float, float, float]:
    return vec(o[feld], "1")


def nackte_zahlen(x, pfad: str = "") -> list[str]:
    """Pfade aller Zahlen, die keine Größe `{value, unit}` sind."""
    if isinstance(x, bool):
        return []
    if isinstance(x, int | float):
        return [pfad]
    if isinstance(x, dict):
        if set(x) == {"value", "unit"}:
            ok = isinstance(x["value"], int | float) and isinstance(x["unit"], str)
            return [] if ok else [pfad + ".value"]
        return [p for k, v in x.items() for p in nackte_zahlen(v, f"{pfad}.{k}")]
    if isinstance(x, list):
        return [p for i, v in enumerate(x) for p in nackte_zahlen(v, f"{pfad}[{i}]")]
    return []


def abhaengige(a: dict, wurzel: str) -> set[str]:
    """Alle Elemente, die (über Eingänge) von `wurzel` abhängen, einschließlich `wurzel`."""
    aus = {wurzel}
    geaendert = True
    while geaendert:
        geaendert = False
        for e in a["elements"]:
            if e["id"] not in aus and any(v.split(".")[0] in aus for v in e.get("inputs", {}).values()):
                aus.add(e["id"])
                geaendert = True
    return aus


def codes(r: dict) -> list[str]:
    return [b["code"] for b in r.get("befunde", [])]


# --- Mathematik für die Sollwerte -----------------------------------------------------------------------


def mal(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


def mal_v(m, v):
    return tuple(sum(m[i][k] * v[k] for k in range(3)) for i in range(3))


def plus(a, b):
    return tuple(x + y for x, y in zip(a, b, strict=True))


def minus(a, b):
    return tuple(x - y for x, y in zip(a, b, strict=True))


def dreh(rx_deg: float, ry_deg: float, rz_deg: float):
    """`Rz(rz) · Ry(ry) · Rx(rx)` (design.md Abschnitt 2)."""
    ax, ay, az = (math.radians(w) for w in (rx_deg, ry_deg, rz_deg))
    cx, sx, cy, sy, cz, sz = (
        math.cos(ax),
        math.sin(ax),
        math.cos(ay),
        math.sin(ay),
        math.cos(az),
        math.sin(az),
    )
    rx = [[1, 0, 0], [0, cx, -sx], [0, sx, cx]]
    ry = [[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]]
    rz = [[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]]
    return mal(rz, mal(ry, rx))


EINS = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]


def lage_frame(x=0, y=0, z=0, rx=0, ry=0, rz=0, eltern=None):
    """(t, R) eines Koordinatensystems in Weltkoordinaten (mm, Grad); `eltern` = (t, R) des übergeordneten."""
    tp, rp = eltern if eltern else ((0.0, 0.0, 0.0), EINS)
    return plus(mal_v(rp, (x, y, z)), tp), mal(rp, dreh(rx, ry, rz))


def spalte(r, i):
    return tuple(r[k][i] for k in range(3))


def kreuz(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def skalar(a, b):
    return sum(x * y for x, y in zip(a, b, strict=True))


def betrag(a):
    return math.sqrt(skalar(a, a))


def winkel(a, b) -> float:
    """Winkel zwischen zwei Richtungen in rad (numerisch stabil)."""
    return math.atan2(betrag(kreuz(a, b)), skalar(a, b))


def einheitsvektor(a):
    n = betrag(a)
    return tuple(x / n for x in a)


def nahe(a, b, tol: float = TOL_MM) -> bool:
    return all(abs(x - y) <= tol for x, y in zip(a, b, strict=True))


# --- Vorschau: Prüfwerkzeug -----------------------------------------------------------------------------


def schritte_ablauf(
    zustand: str, schritte: list[dict], ohne_bruecke: bool = False, lauf: int = 0
) -> list[dict]:
    """`pruefen -- drahtmodell ablauf …` mit den Schritten; Schnappschüsse, einer je Schritt (`lauf` trennt Wiederholungen)."""
    from grundlagen_helpers import npm  # noqa: PLC0415

    with tempfile.TemporaryDirectory() as d:
        f = Path(d) / "ablauf.json"
        f.write_text(json.dumps(schritte), encoding="utf-8")
        extra = ["--ohne-bruecke"] if ohne_bruecke else []
        r = npm(
            "run",
            "--silent",
            "pruefen",
            "--",
            "drahtmodell",
            "ablauf",
            "--zustand",
            zustand,
            "--datei",
            str(f),
            *extra,
            "--json",
            timeout=900,
        )
    assert r.returncode == 0, f"pruefen drahtmodell ablauf: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    erg = json.loads(r.stdout)
    snaps = erg if isinstance(erg, list) else erg["schnappschuesse"]
    assert len(snaps) == len(schritte), f"{len(snaps)} Schnappschüsse für {len(schritte)} Schritte"
    return snaps


class Ablauf:
    """Schrittliste mit Namen; `ablauf.snaps[ablauf.idx['name']]` ist der Schnappschuss nach dem Schritt."""

    def __init__(self) -> None:
        self.schritte: list[dict] = [{"warten_ms": 0}]
        self.idx: dict[str, int] = {"anfang": 0}
        self.snaps: list[dict] = []

    def add(self, name: str, **schritt) -> Ablauf:
        self.schritte.append(schritt)
        self.idx[name] = len(self.schritte) - 1
        return self

    def laufen(self, zustand: str, **kw) -> Ablauf:
        self.snaps = schritte_ablauf(zustand, self.schritte, **kw)
        return self

    def s(self, name: str) -> dict:
        return self.snaps[self.idx[name]]


def flach(graph: list) -> dict[str, dict]:
    """Elemente des Graphen aus einem Schnappschuss nach ID (verschachtelte Kinder eingeschlossen)."""
    aus: dict[str, dict] = {}

    def rein(e: dict) -> None:
        aus[e["id"]] = e
        for k in e.get("content", []):
            if isinstance(k, dict):
                rein(k)

    for e in graph:
        rein(e)
    return aus


def wurzeln(graph: list, typ: str) -> list[dict]:
    """Wurzelelemente eines Typs (keine Kinder anderer Elemente), in Reihenfolge des Graphen."""
    kinder = {
        k if isinstance(k, str) else k["id"] for e in flach(graph).values() for k in e.get("content", [])
    }
    return [e for e in flach(graph).values() if e["type"] == typ and e["id"] not in kinder]


def ergebnis_lage(snap: dict, id: str) -> dict:
    """Ausgang des Elements `id` aus `snap['ergebnis']` (Hauptausgang nach Elementtyp)."""
    typ = flach(snap["graph"])[id]["type"]
    haupt = {"frame": "origin", "axis": "line", "plane": "plane"}.get(typ, typ)
    r = next(x for x in snap["ergebnis"]["results"] if x["id"] == id)
    return r["outputs"][haupt]


def szene_von(snap: dict) -> dict[str, dict]:
    return {s["element"]: s for s in snap["szene"]}


def groesse_in(g: dict, einheit: str) -> float:
    """Eine Größe aus dem Graphen über den Kern (`cee_sdk.Quantity`) umrechnen."""
    from conftest import need_module  # noqa: PLC0415

    sdk = need_module("cee_sdk")
    return sdk.Quantity(g["value"], g["unit"]).to(einheit).value
