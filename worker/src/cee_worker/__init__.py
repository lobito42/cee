"""Geometrie-Worker: Kernel-Protokoll über stdio (ADR-032)."""

from __future__ import annotations

import json
import sys
from typing import Any, TextIO

KERNEL = "occt"


def kernel_version() -> str:
    import OCP

    return str(OCP.__version__)


def handle(request: dict[str, Any]) -> dict[str, Any]:
    if request.get("op") == "ping":
        return {"ok": True, "kernel": KERNEL, "kernel_version": kernel_version()}
    return {"ok": False, "error": f"unbekannte Operation: {request.get('op')!r}"}


def serve(stdin: TextIO, stdout: TextIO) -> None:
    for line in stdin:
        if not line.strip():
            continue
        try:
            answer = handle(json.loads(line))
        except (ValueError, TypeError, AttributeError) as exc:
            answer = {"ok": False, "error": f"ungültige Anfrage: {exc}"}
        stdout.write(json.dumps(answer) + "\n")
        stdout.flush()


def main() -> None:
    serve(sys.stdin, sys.stdout)
