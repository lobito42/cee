#!/usr/bin/env python3
"""Vertragsschutz für alle Werkzeuge (Claude Code, OpenCode, Pi, Git, CI).

Was ein Agent schreiben darf, ergibt sich aus dem Branch:

  spec/<id>    nur openspec/changes/<id>/            (Proposal, Design, Spec-Deltas, Tasks)
  tests/<id>   nur tests/acceptance/<id>/, tests/golden/, tests/ui-reference/
  change/<id>  Produktcode und openspec/changes/<id>/tasks.md – aber keinen Vertrag
  sonst        Produktcode, aber keinen Vertrag

CADLOOP_ROLE=core (Kernteam) darf alles. Merges in main prüft zusätzlich die CI und CODEOWNERS.

Aufrufe:
  guard.py claude-pre          Claude-PreToolUse (JSON auf stdin), Exit 2 = blockiert
  guard.py claude-stop         Claude-Stop: prüft alle geänderten Dateien (auch per Shell geänderte)
  guard.py check PFAD...       Exit 2, wenn ein Pfad blockiert ist (für Pi-Extension, Skripte)
  guard.py staged              Git-Pre-Commit: prüft vorgemerkte Dateien
  guard.py range BASIS         CI: prüft alle Dateien im Diff BASIS...HEAD
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

CORE_ONLY = (
    "docs/adr/",
    "docs/rules/",
    "openspec/specs/",
    "openspec/config.yaml",
    "openspec/queue.yaml",
    "openspec/changes/archive/",
    "AGENTS.md",
    "CLAUDE.md",
    "REVIEW.md",
    ".claude/settings.json",
    ".claude/hooks/",
    ".claude/agents/",
    ".claude/rules/",
    ".claude/skills/",
    ".claude/commands/",
    ".opencode/",
    "opencode.json",
    ".pi/",
    ".githooks/",
    ".github/",
    "tools/guard.py",
    "LICENSE",
    "NOTICE",
    "sdk/LICENSE",
    "format/LICENSE",
)
BRANCH_RE = re.compile(r"^(?:claude/)?(spec|tests|change)/([a-z0-9][a-z0-9-]*)$")


def run_git(*args: str, cwd: Path | None = None) -> str:
    res = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=30)
    # Nur rechts kürzen: `git status --porcelain` beginnt Zeilen mit Leerzeichen (" M datei").
    return res.stdout.rstrip() if res.returncode == 0 else ""


def repo_root(start: Path) -> Path | None:
    probe = start
    while not probe.exists() and probe != probe.parent:
        probe = probe.parent
    if probe.is_file():
        probe = probe.parent
    out = run_git("rev-parse", "--show-toplevel", cwd=probe)
    return Path(out) if out else None


def current_branch(root: Path) -> str:
    return os.environ.get("GITHUB_HEAD_REF") or run_git("rev-parse", "--abbrev-ref", "HEAD", cwd=root)


def reason(rel: str, branch: str, role: str = "") -> str | None:
    """Gibt eine Begründung zurück, wenn `rel` auf diesem Branch nicht geschrieben werden darf."""
    if role == "core":
        return None
    rel = rel.replace("\\", "/").removeprefix("./")
    match = BRANCH_RE.match(branch or "")
    kind, cid = (match.group(1), match.group(2)) if match else ("", "")

    change = re.match(r"^openspec/changes/([^/]+)/(.*)$", rel)
    if change and change.group(1) != "archive":
        target, inner = change.group(1), change.group(2)
        if kind == "spec" and target == cid:
            return None
        if kind == "change" and target == cid and inner == "tasks.md":
            return None
        return f"{rel}: Changes nur auf Branch spec/{target}; auf change/{target} nur tasks.md abhaken"

    acceptance = re.match(r"^tests/acceptance/([^/]+)/", rel)
    if acceptance:
        if kind == "tests" and acceptance.group(1) == cid:
            return None
        return f"{rel}: Abnahmetests schreibt man nur auf Branch tests/{acceptance.group(1)}"

    if rel.startswith(("tests/golden/", "tests/ui-reference/")):
        return None if kind == "tests" else f"{rel}: Referenzdaten nur auf einem tests/<id>-Branch"

    for prefix in CORE_ONLY:
        if rel == prefix.rstrip("/") or rel.startswith(prefix):
            return f"{rel}: gehört zum Projektvertrag ({prefix}), nur das Kernteam ändert das"

    if kind == "spec":
        return f"{rel}: auf spec/{cid} nur openspec/changes/{cid}/ bearbeiten"
    if kind == "tests" and not rel.startswith("tests/"):
        return f"{rel}: auf tests/{cid} nur Tests schreiben, keinen Produktcode"
    return None


def explain(problems: list[str], branch: str) -> str:
    lines = "\n".join(f"  - {p}" for p in problems)
    return (
        f"Blockiert (Branch '{branch or 'unbekannt'}'):\n{lines}\n"
        "Wenn Spec, Test oder Regel falsch erscheinen: Änderung zurücknehmen und im PR unter "
        "'Offene Fragen' begründen. Das Kernteam entscheidet."
    )


def check_paths(paths: list[str], root: Path, role: str) -> list[str]:
    branch = current_branch(root)
    problems = []
    for raw in paths:
        path = Path(raw)
        if path.is_absolute():
            try:
                path = path.resolve().relative_to(root.resolve())
            except ValueError:
                continue  # außerhalb des Repos: nicht unser Vertrag
        why = reason(path.as_posix(), branch, role)
        if why:
            problems.append(why)
    return problems


def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    role = os.environ.get("CADLOOP_ROLE", "").strip()
    cwd = Path.cwd()

    if mode in ("claude-pre", "claude-stop"):
        try:
            data = json.load(sys.stdin)
        except json.JSONDecodeError:
            data = {}
        cwd = Path(data.get("cwd") or cwd)
        root = repo_root(cwd)
        if root is None:
            return 0
        if mode == "claude-pre":
            tool_input = data.get("tool_input") or {}
            raw = tool_input.get("file_path") or tool_input.get("notebook_path")
            if not raw:
                return 0
            path = Path(raw) if Path(raw).is_absolute() else cwd / raw
            problems = check_paths([str(path)], root, role)
            if problems:
                print(explain(problems, current_branch(root)), file=sys.stderr)
                return 2
            return 0
        if data.get("stop_hook_active"):
            return 0
        status = run_git("status", "--porcelain", "--untracked-files=all", cwd=root)
        changed = [line[3:].split(" -> ")[-1].strip('"') for line in status.splitlines()]
        problems = check_paths(changed, root, role)
        if problems:
            print(json.dumps({"decision": "block", "reason": explain(problems, current_branch(root))}))
        return 0

    root = repo_root(cwd)
    if root is None:
        return 0
    if mode == "check":
        paths = sys.argv[2:]
    elif mode == "staged":
        paths = run_git("diff", "--cached", "--name-only", cwd=root).splitlines()
    elif mode == "range":
        base = sys.argv[2] if len(sys.argv) > 2 else "origin/main"
        paths = run_git("diff", "--name-only", f"{base}...HEAD", cwd=root).splitlines()
    else:
        print(__doc__)
        return 64
    problems = check_paths(paths, root, role)
    if problems:
        print(explain(problems, current_branch(root)), file=sys.stderr)
        return 2 if mode == "check" else 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
