"""Abnahmetests AP-00 – Beispiel-Script-Element (AK-5)."""

import importlib.util
import sys
import time
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[3]
build123d = pytest.importorskip("build123d", reason="build123d nicht installiert (uv sync --extra cad)")


def _load_part():
    path = ROOT / "parts" / "examples" / "halter.py"
    spec = importlib.util.spec_from_file_location("halter", path)
    module = importlib.util.module_from_spec(spec)
    sys.modules["halter"] = module  # nötig für @dataclass in dynamisch geladenen Modulen
    spec.loader.exec_module(module)
    return module


def test_ak5_example_part_is_valid_solid():
    """AK-5: build(Params()) liefert einen gültigen Volumenkörper mit Volumen > 0."""
    part = _load_part()
    shape = part.build(part.Params())
    assert shape.is_valid
    assert shape.volume > 0


def test_ak5_example_part_builds_fast():
    """AK-5: Das Beispielteil baut in unter 3 Sekunden."""
    part = _load_part()
    start = time.perf_counter()
    part.build(part.Params())
    assert time.perf_counter() - start < 3.0
