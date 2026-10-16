#!/usr/bin/env python3
"""SessionStart: gibt dem Agenten Branch, Change, erlaubten Bereich und Warteschlangen-Status mit.

Kurz gehalten (wenige Zeilen), weil es in jeder Sitzung Kontext kostet.
"""

from __future__ import annotations

import os
import re
import subprocess
from pathlib import Path

root = Path(os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd())
branch = subprocess.run(
    ["git", "-C", str(root), "rev-parse", "--abbrev-ref", "HEAD"], capture_output=True, text=True
).stdout.strip()
role = os.environ.get("CADLOOP_ROLE") or "agent"
lines = [f"Rolle: {role} · Branch: {branch or 'unbekannt'}"]

match = re.match(r"^(?:claude/)?(spec|tests|change)/([a-z0-9-]+)$", branch)
if match:
    kind, cid = match.groups()
    change = root / "openspec" / "changes" / cid
    scope = {
        "spec": f"nur openspec/changes/{cid}/ (/opsx:propose bzw. /opsx-propose)",
        "tests": f"nur tests/acceptance/{cid}/ und Referenzdaten (Agent test-author)",
        "change": f"Produktcode + openspec/changes/{cid}/tasks.md (/opsx:apply bzw. /opsx-apply)",
    }[kind]
    lines.append(f"Change: {cid} · erlaubt: {scope}")
    if kind != "spec" and not change.exists():
        lines.append(f"Achtung: openspec/changes/{cid}/ existiert nicht – nichts implementieren, nachfragen.")
    queue = root / "openspec" / "queue.yaml"
    if kind != "spec" and queue.exists() and f"id: {cid}" not in queue.read_text(encoding="utf-8"):
        lines.append("Achtung: Change ist nicht in openspec/queue.yaml freigegeben – nur lesen.")
else:
    lines.append("Kein Change-Branch: für Arbeit spec/<id>, tests/<id> oder change/<id> anlegen.")

print("\n".join(lines))
