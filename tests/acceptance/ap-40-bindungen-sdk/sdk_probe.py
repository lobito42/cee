"""Prüfprogramm für das Python-SDK (AK-8); läuft in der Umgebung von `cee-sdk`, nicht unter pytest.

Aufruf: `uv run --no-sync --package cee-sdk python sdk_probe.py <befehl> [argumente]`;
Ausgabe JSON auf stdout.
Nur öffentliche API aus design.md: `Document`, `States`, `Quantity`, `Element`, `CeeError`, `units`,
`packages`, `call`.
"""

from __future__ import annotations

import dataclasses
import importlib.resources
import json
import sys
from pathlib import Path

import cee_sdk
from cee_sdk import CeeError, Document, Quantity

DOCUMENT_METHODS = [
    "new",
    "import_project",
    "load",
    "save",
    "apply_op",
    "apply",
    "export",
    "hash",
    "merge",
    "validate",
    "order",
    "affected",
    "subgraph",
    "migrate",
    "element",
    "materialized_count",
]
STATES_METHODS = ["event", "ready", "get"]
ELEMENT_ATTRS = ["id", "type", "params", "inputs", "outputs", "content", "meta"]


def _doc(result):
    """`Document.import_project` darf das Dokument oder (Dokument, Befunde) liefern."""
    return result[0] if isinstance(result, tuple) else result


def _err(e: CeeError) -> dict:
    return {"error": e.code, "message": e.message, "element": e.element}


def surface() -> dict:
    out: dict = {"version_info": list(sys.version_info[:2])}
    out["document_missing"] = [m for m in DOCUMENT_METHODS if not callable(getattr(Document, m, None))]
    states = getattr(cee_sdk, "States", None)
    out["states_missing"] = [m for m in STATES_METHODS if not callable(getattr(states, m, None))]
    out["functions_missing"] = [
        f for f in ("units", "packages", "call") if not callable(getattr(cee_sdk, f, None))
    ]
    out["quantity_dataclass"] = dataclasses.is_dataclass(Quantity)
    params = getattr(Quantity, "__dataclass_params__", None)
    out["quantity_frozen"] = bool(params and params.frozen)
    out["quantity_fields"] = (
        [f.name for f in dataclasses.fields(Quantity)] if out["quantity_dataclass"] else []
    )
    q = Quantity(1.5, "m")
    try:
        q.value = 2.0  # type: ignore[misc]
        out["quantity_immutable"] = False
    except (dataclasses.FrozenInstanceError, AttributeError):
        out["quantity_immutable"] = True
    out["quantity_parse"] = callable(getattr(Quantity, "parse", None))
    out["quantity_to"] = callable(getattr(q, "to", None))
    out["ceeerror_exception"] = issubclass(CeeError, Exception)
    out["py_typed"] = importlib.resources.files("cee_sdk").joinpath("py.typed").is_file()
    proj = {
        "schema_version": 1,
        "elements": [
            {
                "id": "a",
                "type": "thing",
                "inputs": {},
                "params": {},
                "outputs": {"out": "thing"},
                "content": [],
                "meta": {"name": "a"},
            }
        ],
    }
    doc = _doc(Document.import_project(proj))
    el = doc.element("a")
    out["element_class"] = type(el).__name__
    out["element_is_sdk_element"] = isinstance(el, getattr(cee_sdk, "Element", ()))
    out["element_missing"] = [a for a in ELEMENT_ATTRS if not hasattr(el, a)]
    states = cee_sdk.States(doc) if not hasattr(cee_sdk.States, "new") else cee_sdk.States.new(doc)
    out["states_ready"] = list(states.ready())
    return out


def convert(pairs_path: str) -> list:
    out = []
    for src, dst in json.loads(Path(pairs_path).read_text(encoding="utf-8")):
        try:
            q = Quantity(1.5, src).to(dst)
            out.append({"value": q.value, "unit": q.unit})
        except CeeError as e:
            out.append(_err(e))
    return out


def parse(cases_path: str) -> list:
    out = []
    for text, default in json.loads(Path(cases_path).read_text(encoding="utf-8")):
        try:
            q = Quantity.parse(text, default=default)
            out.append({"value": q.value, "unit": q.unit, "is_quantity": isinstance(q, Quantity)})
        except CeeError as e:
            out.append(_err(e))
    return out


def errors() -> dict:
    out = {}
    try:
        Document.load(b"kein Dokument, nur Text")
        out["load"] = None
    except CeeError as e:
        out["load"] = _err(e)
    proj = {
        "schema_version": 1,
        "elements": [
            {
                "id": "a",
                "type": "thing",
                "inputs": {},
                "params": {"p0": {"value": 1, "unit": "mm"}},
                "outputs": {"out": "thing"},
                "content": [],
                "meta": {"name": "a"},
            }
        ],
    }
    doc = _doc(Document.import_project(proj))
    try:
        doc.apply_op({"op": "set_param", "id": "a", "param": "p0", "value": {"value": 1, "unit": "furlongx"}})
        out["apply_op"] = None
    except CeeError as e:
        out["apply_op"] = _err(e)
    return out


def _param(v):
    if isinstance(v, Quantity):
        return {"kind": "quantity", "value": v.value, "unit": v.unit}
    if isinstance(v, dict):
        return {"kind": "dict", "value": v}
    return {"kind": "other", "value": v}


def element(project_path: str, id_: str) -> dict:
    proj = json.loads(Path(project_path).read_text(encoding="utf-8"))
    el = _doc(Document.import_project(proj)).element(id_)
    return {
        "id": el.id,
        "type": el.type,
        "params": {k: _param(v) for k, v in dict(el.params).items()},
        "inputs": dict(el.inputs),
        "outputs": dict(el.outputs),
        "meta": dict(el.meta),
    }


def partial(doc_path: str, id_: str) -> dict:
    doc = Document.load(Path(doc_path).read_bytes())
    before = doc.materialized_count()
    el = doc.element(id_)
    return {"before": before, "after": doc.materialized_count(), "id": el.id}


def main() -> None:
    cmd, *args = sys.argv[1:]
    fn = {"surface": surface, "convert": convert, "parse": parse, "errors": errors}
    fn.update({"element": element, "partial": partial})
    print(json.dumps(fn[cmd](*args)))


if __name__ == "__main__":
    main()
