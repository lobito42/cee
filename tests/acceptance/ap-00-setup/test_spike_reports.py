"""Abnahmetests AP-00 – Spike-Berichte (AK-4, AK-5)."""

import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[3]
SPIKES = ["S1-identitaet", "S2-rebuild", "S3-interaktion", "S4-blech", "S5-rendering"]
SECTIONS = ["## Fragestellung", "## Vorgehen", "## Messwerte", "## Empfehlung"]


@pytest.mark.parametrize("name", SPIKES)
def test_ak4_spike_report_complete(name):
    """AK-4: Jeder Spike-Bericht existiert, ist vollständig und endet mit Go/No-Go."""
    path = ROOT / "docs" / "spikes" / f"{name}.md"
    assert path.exists(), f"Bericht fehlt: {path.relative_to(ROOT)}"
    text = path.read_text(encoding="utf-8")
    for section in SECTIONS:
        assert section in text, f"{name}: Abschnitt '{section}' fehlt"
    recommendation = text.split("## Empfehlung", 1)[1].strip().splitlines()[0]
    assert recommendation.startswith(("Go", "No-Go")), f"{name}: Empfehlung muss mit Go/No-Go beginnen"


def test_ak5_identity_spike_reports_retention_rate():
    """AK-5: S1 nennt eine Erhaltungsquote der Flächen-IDs über mindestens 50 Parameteränderungen."""
    path = ROOT / "docs" / "spikes" / "S1-identitaet.md"
    assert path.exists()
    text = path.read_text(encoding="utf-8")
    changes = re.search(r"(\d+)\s+Parameter(?:ä|ae)nderungen", text)
    rate = re.search(r"Erhaltungsquote[^\d]*(\d+(?:[.,]\d+)?)\s*%", text)
    assert changes and int(changes.group(1)) >= 50, "Anzahl Parameteränderungen (≥ 50) fehlt"
    assert rate, "Erhaltungsquote in % fehlt"
