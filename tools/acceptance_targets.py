"""Gibt die fälligen Abnahmetest-Verzeichnisse aus (eine Zeile, leerzeichengetrennt).

Fällig sind: archivierte Changes (Regressionsschutz), Changes in der Warteschlange mit phase done, Changes
mit Abnahmetests, deren Tasks alle abgehakt sind (fertig, auch wenn phase noch nicht umgestellt ist), und der
Change des aktuellen Branches (spec/ oder change/<id>). So bleibt main grün, während offene Changes
rot sein dürfen. Auf tests/<id> sind die neuen Abnahmetests absichtlich rot: Sie laufen dort nicht mit, die CI
prüft nur, dass sie sich sammeln lassen (siehe ci.yml), und alle anderen fälligen Tests bleiben Pflicht.
"""

from __future__ import annotations

import os
import re
import subprocess
from pathlib import Path

ROOT = Path(os.environ.get("CEE_ROOT") or Path(__file__).resolve().parents[1])
BRANCH_RE = re.compile(r"^(?:claude/)?(?:spec|tests|change)/([a-z0-9][a-z0-9-]*)$")


def branch() -> str:
    env = os.environ.get("GITHUB_HEAD_REF") or os.environ.get("GITHUB_REF_NAME")
    if env:
        return env
    res = subprocess.run(
        ["git", "-C", str(ROOT), "rev-parse", "--abbrev-ref", "HEAD"], capture_output=True, text=True
    )
    return res.stdout.strip()


def change_ids() -> set[str]:
    ids: set[str] = set()
    archive = ROOT / "openspec" / "changes" / "archive"
    if archive.exists():
        for folder in archive.iterdir():
            # Archivordner heißen JJJJ-MM-TT-<id>
            match = re.match(r"^\d{4}-\d{2}-\d{2}-(.+)$", folder.name)
            if match:
                ids.add(match.group(1))
    queue = ROOT / "openspec" / "queue.yaml"
    if queue.exists():
        current = None
        for line in queue.read_text(encoding="utf-8").splitlines():
            if m := re.match(r"\s*-\s*id:\s*(\S+)", line):
                current = m.group(1)
            elif current and re.match(r"\s*phase:\s*done\b", line):
                ids.add(current)
    for tasks in (ROOT / "openspec" / "changes").glob("*/tasks.md"):
        text = tasks.read_text(encoding="utf-8")
        if re.search(r"^\s*- \[[xX]\]", text, re.M) and not re.search(r"^\s*- \[ \]", text, re.M):
            ids.add(tasks.parent.name)
    if (m := BRANCH_RE.match(branch())) and not branch().split("/")[-2].endswith("tests"):
        ids.add(m.group(1))
    return ids


def main() -> None:
    targets = sorted(f"tests/acceptance/{i}" for i in change_ids())
    print(" ".join(t for t in targets if (ROOT / t).exists()))


if __name__ == "__main__":
    main()
