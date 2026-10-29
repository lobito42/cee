"""Geometrie-Worker: Kernel-Protokoll `cee-kernel/0` über stdio (ADR-032).

Aufrufe:
- `python -m cee_worker rechnen` – ein Auftrag von stdin, ein Ergebnis auf stdout.
- `python -m cee_worker --stdio` (oder ohne Argumente) – je Zeile ein Auftrag, je Zeile ein Ergebnis
  (JSON Lines).
- `python -m cee_worker auftrag --projekt <datei.json> [--rechnen]` – Auftrag über `cee-sdk` bauen.
"""

from __future__ import annotations

import argparse
import json
import sys
from typing import Any, TextIO

KERNEL = "occt"


def _kernel():
    from cee_worker import kernel

    return kernel


def _dump(obj: Any) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def handle(request: Any) -> dict[str, Any]:
    """Eine Anfrage: Auftrag (`protocol`) oder Steueranfrage (`op: ping`)."""
    k = _kernel()
    if isinstance(request, dict) and "op" in request and "protocol" not in request:
        if request.get("op") == "ping":
            return {"ok": True, "kernel": KERNEL, "kernel_version": k.kernel_version()}
        return {"ok": False, "error": f"unbekannte Operation: {request.get('op')!r}"}
    return k.rechnen(request)


def _protokollfehler(text: str) -> dict[str, Any]:
    return _kernel().rechnen({"protocol": "ungültig", "hinweis": text})


def serve(stdin: TextIO, stdout: TextIO) -> None:
    for line in stdin:
        if not line.strip():
            continue
        try:
            request = json.loads(line)
        except ValueError:
            answer = _protokollfehler("json")
        else:
            answer = handle(request)
        stdout.write(_dump(answer) + "\n")
        stdout.flush()


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(prog="cee_worker")
    parser.add_argument("--stdio", action="store_true", help="dauerhaft: je Zeile ein Auftrag")
    sub = parser.add_subparsers(dest="befehl")
    sub.add_parser("rechnen", help="einen Auftrag von stdin berechnen")
    p_auftrag = sub.add_parser("auftrag", help="Auftrag aus einem Projekt bauen")
    p_auftrag.add_argument("--projekt", required=True)
    p_auftrag.add_argument("--rechnen", action="store_true")
    args = parser.parse_args(argv)

    if args.befehl == "rechnen":
        text = sys.stdin.read()
        try:
            request = json.loads(text)
        except ValueError:
            answer = _protokollfehler("json")
        else:
            answer = _kernel().rechnen(request)
        sys.stdout.write(_dump(answer) + "\n")
        return
    if args.befehl == "auftrag":
        from cee_worker import auftrag

        with open(args.projekt, encoding="utf-8") as f:
            projekt = json.load(f)
        a = auftrag.bauen(projekt)
        sys.stdout.write(_dump(_kernel().rechnen(a) if args.rechnen else a) + "\n")
        return
    serve(sys.stdin, sys.stdout)
