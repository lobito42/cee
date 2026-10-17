"""Hilfen für Abnahmetests: Werkzeuge aufrufen; fehlt eines, lokal überspringen, sonst Fehler.

Streng (Fehler statt Überspringen) ist es, sobald `CI` oder `CEE_STRICT` gesetzt ist – in der CI und in
jeder Nachtschicht. Ein Change ist nur fertig, wenn seine Abnahmetests streng grün sind und nichts
übersprungen wurde.
"""

from __future__ import annotations

import importlib
import os
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]


def strict() -> bool:
    """Strenger Modus: in der CI und in der Nachtschicht (`CEE_STRICT=1`)."""
    return bool(os.environ.get("CI") or os.environ.get("CEE_STRICT"))


def _missing(what: str) -> None:
    if strict():
        pytest.fail(f"{what} fehlt (strenger Modus: CI oder CEE_STRICT)")
    pytest.skip(f"{what} fehlt (lokal übersprungen; in CI und Nachtschicht Pflicht)", allow_module_level=True)


def need(tool: str) -> str:
    """Pfad zu `tool`. Fehlt es, lokal überspringen; im strengen Modus ein Fehler (Vertrag gilt voll)."""
    path = shutil.which(tool)
    if path:
        return path
    _missing(f"Werkzeug {tool}")
    raise AssertionError("unerreichbar")


def need_module(name: str):
    """Python-Modul importieren; wie `need`, aber für Module (statt pytest.importorskip)."""
    try:
        return importlib.import_module(name)
    except ImportError:
        _missing(f"Python-Modul {name} (uv sync --extra cad)")
        raise


def sh(cmd: list[str], cwd: Path = ROOT, timeout: int = 600, stdin: str | None = None):
    need(cmd[0])
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, input=stdin)
