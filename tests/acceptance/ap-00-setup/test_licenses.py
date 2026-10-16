"""Abnahmetests AP-00 – Lizenzen (AK-6)."""

import json
import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[3]
FORBIDDEN = ("GPL", "AGPL")
ALLOWED_EXCEPTIONS = ("LGPL",)  # LGPL nur dynamisch gelinkt (ADR-013)


def test_ak6_no_gpl_dependencies():
    """AK-6: Keine GPL/AGPL-Abhängigkeit in der Python-Umgebung."""
    if not shutil.which("uv"):
        pytest.skip("uv nicht verfügbar")
    res = subprocess.run(
        ["uv", "run", "--with", "pip-licenses", "pip-licenses", "--format=json"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=300,
    )
    if res.returncode != 0:
        pytest.fail(f"pip-licenses fehlgeschlagen:\n{res.stderr[-1500:]}")
    offenders = []
    for pkg in json.loads(res.stdout):
        lic = pkg.get("License", "")
        if any(f in lic for f in FORBIDDEN) and not any(e in lic for e in ALLOWED_EXCEPTIONS):
            offenders.append(f"{pkg['Name']} ({lic})")
    assert not offenders, f"Unzulässige Lizenzen: {offenders}"
