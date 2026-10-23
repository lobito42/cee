"""Prüfprogramm `bindctl` für das Python-SDK (PyO3, ap-40); nicht Teil des Wheels.

Aufruf: `uv run --no-sync --package cee-sdk python sdk/python/tools/bindctl.py <befehl>`.
Befehle `run`, `load`, `merge`, `api`, `bench` wie `crates/bind/examples/bindctl.rs` (Rust-Sollwerte).
Ausgabe: ein JSON-Dokument auf stdout.
"""

from __future__ import annotations

import base64
import hashlib
import json
import random
import sys
import time
from collections.abc import Callable
from pathlib import Path
from typing import Any

import cee_sdk
from cee_sdk import CeeError, Document, Quantity, States, _graph

API: dict[str, Callable[[], object]] = {
    "units": lambda: cee_sdk.units,
    "parse": lambda: Quantity.parse,
    "convert": lambda: Quantity.to,
    "Doc.new": lambda: Document.new,
    "Doc.import": lambda: Document.import_project,
    "Doc.load": lambda: Document.load,
    "doc.save": lambda: Document.save,
    "doc.apply_op": lambda: Document.apply_op,
    "doc.apply": lambda: Document.apply,
    "doc.export": lambda: Document.export,
    "doc.hash": lambda: Document.hash,
    "doc.merge": lambda: Document.merge,
    "doc.validate": lambda: Document.validate,
    "doc.order": lambda: Document.order,
    "doc.affected": lambda: Document.affected,
    "doc.subgraph": lambda: Document.subgraph,
    "doc.migrate": lambda: Document.migrate,
    "doc.element": lambda: Document.element,
    "doc.materialized_count": lambda: Document.materialized_count,
    "States.new": lambda: States.new,
    "states.event": lambda: States.event,
    "states.ready": lambda: States.ready,
    "states.get": lambda: States.get,
    "packages": lambda: cee_sdk.packages,
    "call": lambda: cee_sdk.call,
}


def _option(args: list[str], name: str) -> str | None:
    if name in args:
        i = args.index(name)
        return args[i + 1] if i + 1 < len(args) else None
    return None


def _error(e: CeeError) -> dict[str, Any]:
    return {"code": e.code, "message": e.message, "element": e.element}


def _attempt(fn: Callable[[], object]) -> dict[str, Any] | None:
    """`None`, wenn der Aufruf gelingt, sonst der Fehler."""
    try:
        fn()
    except CeeError as e:
        return _error(e)
    return None


def _op_entry(doc: Document, op: Any) -> Any:
    try:
        return doc.apply_op(op)
    except CeeError as e:
        return {"result": e.code, "message": e.message, "warnings": []}


def _error_case(doc: Document, case: dict[str, Any]) -> dict[str, Any] | None:
    if "op_json" in case:
        return _attempt(lambda: doc.apply_op(case["op_json"]))
    if "op" in case:
        return _attempt(lambda: doc.apply_op(case["op"]))
    if "load_bytes_b64" in case:
        return _attempt(lambda: Document.load(base64.b64decode(case["load_bytes_b64"])))
    if "element" in case:
        return _attempt(lambda: doc.element(case["element"]))
    if "parse" in case:
        text, default = case["parse"]
        return _attempt(lambda: Quantity.parse(text, default))
    if "convert" in case:
        value, src, dst = case["convert"]
        return _attempt(lambda: Quantity(value, src).to(dst))
    if "debug_panic" in case:
        return _attempt(_graph.debug_panic)
    return {"code": "usage", "message": f"unbekannter Fehlerfall {case}", "element": None}


def _query(doc: Document, q: str) -> Any:
    name, _, rest = q.partition(":")
    head, bar, tail = rest.partition("|")
    if name == "validate":
        return doc.validate()
    if name == "order":
        return doc.order()
    if name == "affected":
        return doc.affected([rest])
    if name == "subgraph":
        return doc.subgraph(rest)
    if name == "migrate":
        return doc.migrate()
    if name == "element":
        return doc.element(rest).to_dict()
    if name == "units":
        return cee_sdk.units()
    if name == "packages":
        return cee_sdk.packages()
    if name == "parse":
        p = Quantity.parse(head, tail or None)
        return {"value": p.value, "unit": p.unit}
    if name == "convert":
        value, src, dst = rest.split("|")
        p = Quantity(float(value), src).to(dst)
        return {"value": p.value, "unit": p.unit}
    if name == "call":
        return cee_sdk.call(head, doc, tail if bar else "{}")
    raise CeeError("usage", f"unbekannte Abfrage {name}")


def _save(doc: Document, args: list[str]) -> None:
    path = _option(args, "--save")
    if path:
        Path(path).write_bytes(doc.save())


def run(args: list[str]) -> dict[str, Any]:
    scen = json.loads(Path(args[1]).read_text(encoding="utf-8"))
    doc = Document.import_project(scen["project"], scen.get("types"))
    errors = [_error_case(doc, c) for c in scen.get("errors", [])]
    results = [_op_entry(doc, op) for op in scen.get("ops", [])]
    states = None
    if scen.get("states"):
        s = States(doc)
        for ev in scen["states"]:
            # Unsinnige Ereignisse werden übergangen wie bei `graphctl states`.
            _attempt(lambda ev=ev: s.event(ev))
        states = s.get()
    queries = []
    for q in scen.get("queries", []):
        try:
            queries.append({"query": q, "value": _query(doc, q)})
        except CeeError as e:
            queries.append({"query": q, "error": _error(e)})
    exported = doc.export_text()
    _save(doc, args)
    return {
        "results": results,
        "hash": doc.hash(),
        "export_sha256": hashlib.sha256(exported.encode("utf-8")).hexdigest(),
        "queries": queries,
        "errors": errors,
        "states": states,
    }


def load(args: list[str]) -> dict[str, Any]:
    doc = Document.load(Path(args[1]).read_bytes())
    ops_path = _option(args, "--ops")
    ops = json.loads(Path(ops_path).read_text(encoding="utf-8")) if ops_path else []
    results = [_op_entry(doc, op) for op in ops]
    _save(doc, args)
    return {"hash": doc.hash(), "results": results}


def merge(args: list[str]) -> dict[str, Any]:
    doc = Document.load(Path(args[1]).read_bytes())
    doc.merge(Document.load(Path(args[2]).read_bytes()))
    _save(doc, args)
    return {"hash": doc.hash()}


def api(_args: list[str]) -> dict[str, Any]:
    return {"functions": [name for name, get in API.items() if callable(get())]}


def _ids(elements: list[Any]) -> list[str]:
    out: list[str] = []
    for e in elements:
        out.append(e["id"])
        out.extend(_ids(e.get("content", [])))
    return out


def _p95(samples: list[float]) -> float:
    s = sorted(samples)
    return s[max(-(-len(s) * 95 // 100) - 1, 0)]


def bench(args: list[str]) -> dict[str, Any]:
    text = Path(_option(args, "--project") or "").read_text(encoding="utf-8")
    ids = _ids(json.loads(text).get("elements", []))
    data = Document.import_project(text).save()
    t = time.perf_counter()
    doc = Document.load(data)
    load_ms = (time.perf_counter() - t) * 1000
    t = time.perf_counter()
    doc.hash()
    hash_ms = (time.perf_counter() - t) * 1000
    rng = random.Random(1)
    samples = []
    for i in range(1100):
        target = rng.choice(ids)
        t = time.perf_counter()
        value = {"value": (i % 1000) * 0.001 + 0.5, "unit": "m"}
        doc.apply_op({"op": "set_param", "id": target, "param": "p0", "value": value})
        if i >= 100:
            samples.append((time.perf_counter() - t) * 1000)
    return {"py_op_p95_ms": _p95(samples), "load_10k_ms": load_ms, "hash_10k_ms": hash_ms}


COMMANDS = {"run": run, "load": load, "merge": merge, "api": api, "bench": bench}


def main() -> None:
    args = sys.argv[1:]
    cmd = COMMANDS.get(args[0] if args else "")
    if cmd is None:
        out: dict[str, Any] = {"error": {"code": "usage", "message": f"Aufruf: {args}", "element": None}}
    else:
        out = cmd(args)
    print(json.dumps(out, ensure_ascii=False))


if __name__ == "__main__":
    main()
