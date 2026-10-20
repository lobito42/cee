"""Gemeinsame Hilfen für die Abnahmetests AP-05b. Ergänzt `graphctl` aus ap-05a (Format dort beschrieben).

Festgeschriebene Annahmen zu den neuen Befehlen (design.md legt nur die Wirkung fest), alles JSON auf stdout:
- `order <doc>`: `{"order": [id, ...], "skipped": [{"element", "reason"}]}`; Zyklus-Elemente und ihre
  Nachfolger stehen in `skipped`, nicht in `order`.
- `affected <doc> <id>...`: `{"affected": [id, ...]}` (inkl. der übergebenen IDs, Eltern eingeschlossen).
- `states <doc> <script.json>`: Skript = Liste `{"event": "change"|"start"|"ok"|"err", "id"}`; Ausgabe
  `{"states": {id: "current"|"stale"|"running"|"failed"}, "ready": [id, ...], "findings": {id: [...]}}`.
  Alle Elemente beginnen als `stale`.
- `migrate <doc> --out <doc>`: `{"before": n, "after": m}`; `--out` enthält das migrierte Dokument.
- `subgraph <doc> <id>`: `{"elements": [id, ...], "external_inputs": [{"element", "input", "target"}],
  "materialized_count": n, "duration_ms": x}`; `external_inputs` = Eingänge von Elementen im Untergraphen,
  deren Ziel außerhalb liegt.
- `apply`: abgelehnte Operation hat `result == "cycle"`; das Dokument bleibt unverändert.
- `validate`: Befund `code == "cycle"`, `severity == "error"`, `element` = beteiligtes Element.
- `hash`/`validate`/`export`/`migrate` auf zu neues Dokument: Rückgabecode ≠ 0, `{"error": "schema_too_new"}`.
- `bench --json` enthält zusätzlich `load_index_100k_ms`, `index_100k_ms`, `order_100k_ms`, `affected_p95_ms`,
  `op_p95_ms`, `subgraph_1000_ms`.
- Mit Cargo-Feature `demo-migration` ist `graphctl` ein eigener Build (eigenes Zielverzeichnis).
"""

from __future__ import annotations

import functools
import json
import os
import subprocess
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


def ctl(*args, demo: bool = False, timeout: int = 900) -> subprocess.CompletedProcess:
    code, err = _build(demo)
    assert code == 0, f"graphctl (demo={demo}) lässt sich nicht bauen:\n{err}"
    cmd = [*(a.replace("{verb}", "run") for a in BASE), *_features(demo), "--", *map(str, args)]
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout, env=_env(demo))


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
