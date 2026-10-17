"""Abnahmetests AP-00 – Repo-Gerüst (AK-1)."""

import json
import re
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
    """AK-1: Jedes ADR im Index liegt als Einzeldatei vor und umgekehrt (mindestens ADR-001 bis ADR-053)."""
    adrs = {p.name for p in (ROOT / "docs" / "adr").glob("ADR-[0-9]*.md")}
    index = (ROOT / "docs" / "adr" / "README.md").read_text(encoding="utf-8")
    linked = set(re.findall(r"\((ADR-\d{3}-[^)]+\.md)\)", index))
    assert len(adrs) >= 53, f"Erwartet mindestens 53 ADRs, gefunden {len(adrs)}"
    assert adrs == linked, f"Index und Dateien weichen ab: {sorted(adrs ^ linked)}"


def test_ak1_tauri_built_for_three_platforms():
    """AK-1: Das Tauri-Gerüst existiert; der CI-Job `desktop` baut es für Linux, Windows und macOS."""
    conf = json.loads((ROOT / "client" / "src-tauri" / "tauri.conf.json").read_text(encoding="utf-8"))
    assert conf.get("productName") == "CEE", "productName in tauri.conf.json muss CEE sein"
    ci = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
    job = ci.split("\n  desktop:\n", 1)
    assert len(job) == 2, "CI-Job desktop fehlt"
    block = re.split(r"\n  [a-z][a-z0-9_-]*:\n", job[1])[0]  # nur dieser Job, nicht die folgenden
    for os_name in ("ubuntu-latest", "windows-latest", "macos-latest"):
        assert os_name in block, f"Tauri-Build für {os_name} fehlt im Job desktop"
    assert "tauri-apps/cli" in block
