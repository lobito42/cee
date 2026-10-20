"""Gemeinsame Hilfen für die Abnahmetests AP-05a: `graphctl` aufrufen, Ausgabe als JSON lesen.

Annahmen zur Ausgabe von `graphctl` (design.md legt nur „JSON auf stdout“ fest; hier festgeschrieben):
- `units`: Liste von `{"code", "dimension": {"L","M","T","I","Theta","N","J","A","C": int}, "factor"}`
  (fehlende Achsen = 0).
- `parse`/`convert`: `{"value": <Zahl>, "unit": "<kanonischer Code>"}` bzw. `{"value": <Zahl>}`;
  Fehler: `{"error": "<code>"}`, Rückgabecode ≠ 0.
- `import`/`validate`: `{"findings": [{"element","field","name","code","severity","message"}]}`; Befunde sind
  kein Fehler des Aufrufs, Rückgabecode 0.
- `apply`: `{"results": [{"result": "ok"|"<fehlercode>", "warnings": ["<code>", ...]}]}`.
- `hash`: `{"hash": "<hex>"}`. `export`: Projekt-JSON. `merge`: `{"hash": ...}`.
- `synth --corpus validate`: `{"project": {...}, "expected": [{"element","code","severity"}]}`, optional
  `"types": [...]` mit den Typdefinitionen des Korpus.
- `apply` mit abgelehnter Operation schreibt kein `--out` oder nur das unveränderte Dokument.
- Operationen in `ops.json` (Liste): `{"op": "create", "id", "type", "params"?, "inputs"?}`,
  `{"op": "set_param", "id", "param", "value"}`, `{"op": "set_input", "id", "name", "target"}`,
  `{"op": "set_meta", "id", "key", "value"}`, `{"op": "remove", "id"}`.
- Typdefinitionen (`--types`): Liste wie in design.md; eine ungültige Definition liefert
  `{"error": "invalid_type_definition"}` mit Rückgabecode ≠ 0; zuvor registrierte gelten weiter.
"""

from __future__ import annotations

import functools
import json
import subprocess
from pathlib import Path

from conftest import sh

CMD = ["cargo", "run", "-q", "--release", "-p", "cee-graph", "--example", "graphctl", "--"]


@functools.lru_cache(maxsize=1)
def _build() -> tuple[int, str]:
    res = sh(["cargo", "build", "-q", "--release", "-p", "cee-graph", "--example", "graphctl"], timeout=1800)
    return res.returncode, (res.stderr or "")[-3000:]


def ctl(*args: str, timeout: int = 900) -> subprocess.CompletedProcess:
    code, err = _build()
    assert code == 0, f"graphctl lässt sich nicht bauen:\n{err}"
    return sh([*CMD, *map(str, args)], timeout=timeout)


def ctl_json(*args: str, ok: bool = True, timeout: int = 900):
    res = ctl(*args, timeout=timeout)
    if ok:
        assert res.returncode == 0, f"graphctl {args} schlug fehl: {res.stderr[-1500:]}"
    return json.loads(res.stdout)


def write(path: Path, data) -> Path:
    path.write_text(json.dumps(data), encoding="utf-8")
    return path


def rel_close(a: float, b: float, tol: float = 1e-12) -> bool:
    return abs(a - b) <= tol * max(abs(a), abs(b), 1e-300)


def project(elements: list[dict]) -> dict:
    return {"schema_version": 1, "elements": elements}


def element(
    id_: str,
    type_: str = "thing",
    params: dict | None = None,
    inputs: dict | None = None,
    outputs: dict | None = None,
    content: list | None = None,
    meta: dict | None = None,
) -> dict:
    return {
        "id": id_,
        "type": type_,
        "inputs": inputs or {},
        "params": params or {},
        "outputs": outputs if outputs is not None else {"out": "thing"},
        "content": content or [],
        "meta": meta if meta is not None else {"name": id_},
    }


def make_doc(tmp: Path, elements: list[dict], types: Path | None = None, name: str = "d.doc") -> Path:
    """Dokument aus Projekt-JSON bauen (über `graphctl import`)."""
    out = tmp / name
    args = ["import", write(tmp / (name + ".json"), project(elements))]
    if types:
        args += ["--types", types]
    ctl_json(*args, "--out", out)
    return out


BRACKET_TYPES = [
    {
        "type": "bracket",
        "params": {
            "height": {"dimension": "length", "default_unit": "mm"},
            "angle": {"dimension": "angle", "default_unit": "deg"},
        },
    }
]
