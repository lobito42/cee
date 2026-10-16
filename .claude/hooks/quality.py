#!/usr/bin/env python3
"""Qualitäts-Gates für Agenten-Sitzungen.

quality.py format – PostToolUse: formatiert und lintet die gerade geänderte Datei (nie blockierend)
quality.py tests  – Stop: führt Unit-Tests und die Abnahmetests des aktuellen Changes aus.
                    Schlägt etwas fehl, bekommt der Agent die Ausgabe zurück und arbeitet weiter.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def run(cmd: list[str], cwd: Path, timeout: int = 240) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout)


def project_dir(data: dict) -> Path:
    return Path(os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd())


def mode_format(data: dict) -> int:
    raw = (data.get("tool_input") or {}).get("file_path")
    if not raw:
        return 0
    path = Path(raw)
    root = project_dir(data)
    if path.suffix == ".py" and shutil.which("uv"):
        run(["uv", "run", "--quiet", "ruff", "format", str(path)], root, 60)
        res = run(["uv", "run", "--quiet", "ruff", "check", "--fix", str(path)], root, 60)
        if res.returncode != 0:
            print(f"ruff meldet Probleme in {path.name}:\n{res.stdout[-2000:]}", file=sys.stderr)
    elif path.suffix in {".ts", ".tsx", ".json", ".css"} and "packages/extension" in path.as_posix():
        ext = root / "packages" / "extension"
        if (ext / "node_modules" / ".bin" / "prettier").exists():
            run(["npx", "--no-install", "prettier", "--write", str(path)], ext, 60)
    return 0


def current_change(root: Path) -> str | None:
    res = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], root, 10)
    match = re.match(r"^(?:claude/)?(?:tests|change)/([a-z0-9-]+)$", res.stdout.strip())
    return match.group(1) if match else None


def mode_tests(data: dict) -> int:
    if data.get("stop_hook_active"):
        return 0
    root = project_dir(data)
    if not shutil.which("uv") or not (root / "pyproject.toml").exists():
        return 0
    status = run(["git", "status", "--porcelain"], root, 10).stdout
    if not status.strip():
        return 0  # nichts geändert, nichts zu prüfen
    targets = ["tests/unit"]
    cid = current_change(root)
    if cid and (root / "tests" / "acceptance" / cid).exists():
        targets.append(f"tests/acceptance/{cid}")
    res = run(["uv", "run", "--quiet", "pytest", "-q", "-x", *targets], root, 280)
    if res.returncode not in (0, 5):  # 5 = keine Tests gesammelt
        tail = (res.stdout + res.stderr)[-3000:]
        reason = (
            f"Tests schlagen fehl ({', '.join(targets)}). Behebe die Ursache im Produktivcode, "
            f"nicht in den Tests.\n{tail}"
        )
        print(json.dumps({"decision": "block", "reason": reason}))
    return 0


def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else "format"
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        data = {}
    try:
        return mode_tests(data) if mode == "tests" else mode_format(data)
    except subprocess.TimeoutExpired:
        print("Qualitäts-Hook: Zeitlimit erreicht, übersprungen.", file=sys.stderr)
        return 0


if __name__ == "__main__":
    sys.exit(main())
