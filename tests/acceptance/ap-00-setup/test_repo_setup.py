"""Abnahmetests AP-00 – Repo-Gerüst (AK-1)."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

REQUIRED = [
    "AGENTS.md",
    "CLAUDE.md",
    "REVIEW.md",
    "pyproject.toml",
    ".claude/settings.json",
    ".claude/hooks/quality.py",
    "tools/guard.py",
    ".githooks/pre-commit",
    "opencode.json",
    ".pi/settings.json",
    ".pi/extensions/guard.ts",
    "openspec/config.yaml",
    "openspec/queue.yaml",
    ".github/workflows/ci.yml",
    ".devcontainer/devcontainer.json",
    "docs/adr/README.md",
    "parts/examples/halter.py",
    "packages/extension/package.json",
]


def test_ak1_required_files_exist():
    """AK-1: Pflichtdateien des Gerüsts sind vorhanden."""
    missing = [p for p in REQUIRED if not (ROOT / p).exists()]
    assert not missing, f"Fehlende Dateien: {missing}"


def test_ak1_all_adrs_present():
    """AK-1: Alle 27 ADRs liegen als Einzeldatei vor."""
    adrs = sorted((ROOT / "docs" / "adr").glob("ADR-0*.md"))
    assert len(adrs) == 27, f"Erwartet 27 ADRs, gefunden {len(adrs)}"
