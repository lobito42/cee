"""Hilfen für Abnahmetests: Werkzeuge aufrufen; fehlt eines, lokal überspringen, in der CI Fehler."""

from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]


def need(tool: str) -> str:
    """Pfad zu `tool`. Fehlt es, lokal überspringen; in der CI ist das ein Fehler (Vertrag gilt voll)."""
    path = shutil.which(tool)
    if path:
        return path
    if os.environ.get("CI"):
        pytest.fail(f"{tool} fehlt in der CI-Umgebung")
    pytest.skip(f"{tool} nicht installiert (lokal übersprungen, in der CI Pflicht)")


def sh(cmd: list[str], cwd: Path = ROOT, timeout: int = 600, stdin: str | None = None):
    need(cmd[0])
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, input=stdin)
