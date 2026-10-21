"""Gemeinsame Hilfen für die Abnahmetests AP-05b. Ergänzt `graphctl` aus ap-05a (Format dort beschrieben).

Festgeschriebene Annahmen zu den neuen Befehlen (design.md legt nur die Wirkung fest), alles JSON auf stdout.
IDs sind Strings; Eingänge und `target` haben die Form "<id>.<ausgang>".
- `order <doc>`: `{"order": [id, ...], "skipped": [{"element", "reason"}]}`. Topologisch über alle
  Elemente (auch verschachtelte); jedes Element steht nach allen Elementen, von denen es abhängt. Unter den
  jeweils berechenbaren Elementen kommt die kleinste ID zuerst (Zeichenkettenvergleich, Kahn mit Min-Heap).
  Zyklus-Elemente (`reason == "cycle"`) und ihre transitiven Nachfolger (`"depends_on_cycle"`) stehen
  in `skipped`, nicht in `order`. Kein Zyklus: `skipped == []`.
- `affected <doc> <id>...`: `{"affected": [id, ...]}`. Mehrere IDs: Vereinigung der Einzelmengen.
  Je ID: die ID selbst, alle transitiv abhängigen Elemente und von jedem dieser Elemente die Eltern
  (Gruppen, transitiv).
- `states <doc> <script.json>`: Skript = Liste `{"event": "change"|"start"|"ok"|"err", "id"}`, in Reihenfolge
  bedingungslos angewendet (nie ein Fehler, Rückgabecode 0, auch bei unsinniger Folge). Schreibt nichts ins
  Dokument, kein `--out`. Ausgabe `{"states": {id: "current"|"stale"|"running"|"failed"}, "ready": [id, ...],
  "findings": {id: [{"code": "failed", "message": str}, ...]}}`. Alle Elemente beginnen als `stale`;
  `findings` enthält genau die `failed`-Elemente; `ready` = `stale`-Elemente, deren Abhängigkeiten alle
  `current` sind, in der Reihenfolge von `order`.
- `migrate <doc> --out <doc>`: `{"before": n, "after": m}`; `--out` enthält das migrierte Dokument.
- `subgraph <doc> <id>`: `{"elements": [id, ...], "external_inputs": [{"element", "input", "target"}],
  "materialized_count": n, "duration_ms": x}`. `elements` = die Wurzel `<id>` selbst plus alle ihre
  Nachfahren (genau diese, keine weiteren). `external_inputs` = Eingänge von Elementen in `elements`, deren
  Ziel-Element außerhalb liegt; `target` = "<id>.<ausgang>" wie im Dokument. `materialized_count` = Zahl der
  Elemente, deren Parameter/Meta aufbereitet wurden (hier höchstens `len(elements)`).
- `apply`: abgelehnte Operation hat `results[i].result == "cycle"` (Fehlercode des Kerns). Rückgabecode ≠ 0,
  Ergebnis-JSON trotzdem auf stdout; `--out` wird (wie heute in graphctl) mit dem Dokument ohne die abgelehnte
  Operation geschrieben oder gar nicht geschrieben, nie mit ihr. Erlaubte Operationen: `result == "ok"`.
- `validate`: Befund `code == "cycle"`, `severity == "error"`, `element` = beteiligtes Element.
- `hash`/`validate`/`export`/`migrate` auf zu neues Dokument: Rückgabecode ≠ 0, stdout `{"error":
  "schema_too_new"}`.
- `bench --json` enthält zusätzlich `load_index_100k_ms`, `index_100k_ms`, `order_100k_ms`, `affected_p95_ms`,
  `op_p95_ms`, `subgraph_1000_ms`.
- Mit Cargo-Feature `demo-migration` ist `graphctl` ein eigener Build (eigenes Zielverzeichnis).
"""

from __future__ import annotations

import functools
import json
import os
import subprocess
import time
from pathlib import Path

from conftest import ROOT, need

DEMO_TARGET = ROOT / "target" / "demo-migration"
BASE = ["cargo", "{verb}", "-q", "--release", "-p", "cee-graph", "--example", "graphctl"]


def _env(demo: bool) -> dict:
    env = dict(os.environ)
    if demo:
        env["CARGO_TARGET_DIR"] = str(DEMO_TARGET)
    return env


def _features(demo: bool) -> list[str]:
    return ["--features", "demo-migration"] if demo else []


@functools.lru_cache(maxsize=2)
def _build(demo: bool) -> tuple[int, str]:
    need("cargo")
    cmd = [*(a.replace("{verb}", "build") for a in BASE), *_features(demo)]
    res = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=1800, env=_env(demo))
    return res.returncode, (res.stderr or "")[-3000:]


def _binary(demo: bool) -> Path:
    target = DEMO_TARGET if demo else Path(os.environ.get("CARGO_TARGET_DIR", ROOT / "target"))
    return target / "release" / "examples" / "graphctl"


def ctl(*args, demo: bool = False, timeout: int = 900) -> subprocess.CompletedProcess:
    """Gebautes Binary direkt aufrufen (kein `cargo run` je Aufruf)."""
    code, err = _build(demo)
    assert code == 0, f"graphctl (demo={demo}) lässt sich nicht bauen:\n{err}"
    cmd = [str(_binary(demo)), *map(str, args)]
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout, env=_env(demo))


def timed_ctl(*args, demo: bool = False, timeout: int = 900) -> tuple[subprocess.CompletedProcess, float]:
    """Wie `ctl`, liefert zusätzlich die gemessene Wanduhrzeit des Aufrufs in ms."""
    code, err = _build(demo)
    assert code == 0, f"graphctl (demo={demo}) lässt sich nicht bauen:\n{err}"
    t0 = time.perf_counter()
    res = ctl(*args, demo=demo, timeout=timeout)
    return res, (time.perf_counter() - t0) * 1000


def ctl_json(*args, ok: bool = True, demo: bool = False, timeout: int = 900):
    res = ctl(*args, demo=demo, timeout=timeout)
    if ok:
        assert res.returncode == 0, f"graphctl {args} schlug fehl: {res.stderr[-1500:]}"
    return json.loads(res.stdout)


def write(path: Path, data) -> Path:
    path.write_text(json.dumps(data), encoding="utf-8")
    return path


def element(
    id_: str, inputs: dict | None = None, content: list | None = None, meta: dict | None = None
) -> dict:
    return {
        "id": id_,
        "type": "thing",
        "inputs": inputs or {},
        "params": {},
        "outputs": {"out": "thing"},
        "content": content or [],
        "meta": meta if meta is not None else {"name": id_},
    }


def make_doc(tmp: Path, elements: list[dict], name: str = "d.doc", demo: bool = False) -> Path:
    out = tmp / name
    src = write(tmp / (name + ".json"), {"schema_version": 1, "elements": elements})
    ctl_json("import", src, "--out", out, demo=demo)
    return out


def flat(els):
    for e in els:
        yield e
        yield from flat(e["content"])


def deps_of(e: dict) -> set[str]:
    """Abhängigkeiten eines Elements aus `inputs` ("<id>.<ausgang>")."""
    return {v.split(".")[0] for v in e["inputs"].values()}


def set_input(id_: str, name: str, target: str) -> dict:
    return {"op": "set_input", "id": id_, "name": name, "target": f"{target}.out"}
