"""Abnahmetests AP-00 – Repo-Gerüst (AK-1)."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

REQUIRED = [
    "AGENTS.md",
    "CLAUDE.md",
    "REVIEW.md",
    "LICENSE",
    "sdk/LICENSE",
    "format/LICENSE",
    "pyproject.toml",
    "Cargo.toml",
    "Cargo.lock",
    "deny.toml",
    "crates/graph/Cargo.toml",
    "server/mix.exs",
    "server/mix.lock",
    "client/package.json",
    "client/tsconfig.json",
    "client/src-tauri/tauri.conf.json",
    "worker/pyproject.toml",
    ".claude/settings.json",
    "tools/guard.py",
    ".githooks/pre-commit",
    "opencode.json",
    ".pi/settings.json",
    "openspec/config.yaml",
    "openspec/queue.yaml",
    ".github/workflows/ci.yml",
    ".devcontainer/devcontainer.json",
    "docs/adr/README.md",
    "parts/examples/halter.py",
]


def test_ak1_required_files_exist():
    """AK-1: Pflichtdateien des Gerüsts sind vorhanden."""
    missing = [p for p in REQUIRED if not (ROOT / p).exists()]
    assert not missing, f"Fehlende Dateien: {missing}"


def test_ak1_all_adrs_present():
    """AK-1: Alle 45 ADRs liegen als Einzeldatei vor."""
    adrs = sorted((ROOT / "docs" / "adr").glob("ADR-0*.md"))
    assert len(adrs) == 45, f"Erwartet 45 ADRs, gefunden {len(adrs)}"


def test_ak1_tauri_built_for_three_platforms():
    """AK-1: Die CI baut die Desktop-App für Linux, Windows und macOS."""
    ci = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
    assert "tauri" in ci.lower()
    for os_name in ("ubuntu", "windows", "macos"):
        assert os_name in ci, f"Tauri-Build für {os_name} fehlt in ci.yml"
