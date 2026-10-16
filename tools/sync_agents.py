#!/usr/bin/env python3
"""Erzeugt werkzeugspezifische Dateien aus einer Quelle.

Quellen (von Hand gepflegt):
  docs/rules/*.md          Regeln je Bereich
  .claude/agents/*.md      Agentenrollen
  .claude/skills/*/        eigene Skills (OpenSpec-Skills pflegt `openspec update`)

Ziele (generiert, nicht von Hand ändern):
  .claude/rules/*.md       Pfadregeln für Claude Code (mit paths-Frontmatter)
  .opencode/agents/*.md    Subagenten für OpenCode
  .pi/settings.json        Skill-Pfade für Pi

  python3 tools/sync_agents.py          schreiben
  python3 tools/sync_agents.py --check  nur prüfen (CI), Exit 1 bei Abweichung
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HEADER = "<!-- generiert von tools/sync_agents.py – Quelle: {src} -->\n"

RULE_PATHS = {
    "geometrie": [
        "packages/cadloop-core/**/*.py",
        "packages/geometry-service/**/*.py",
        "packages/rules/**/*.py",
        "parts/**/*.py",
    ],
    "extension-ui": ["packages/extension/**/*"],
    "mcp-server": ["packages/mcp-server/**/*"],
}
OPENCODE_MODELS = {
    "sonnet": "anthropic/claude-sonnet-5-5",
    "opus": "anthropic/claude-opus-5-5",
    "haiku": "anthropic/claude-haiku-5-5",
}
READ_ONLY = {"reviewer", "ui-checker"}


def frontmatter(text: str) -> tuple[dict[str, str], str]:
    match = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not match:
        return {}, text
    fields = {}
    for line in match.group(1).splitlines():
        if ":" in line:
            key, value = line.split(":", 1)
            fields[key.strip()] = value.strip()
    return fields, match.group(2)


def targets() -> dict[Path, str]:
    out: dict[Path, str] = {}

    for src in sorted((ROOT / "docs" / "rules").glob("*.md")):
        paths = RULE_PATHS.get(src.stem)
        if not paths:
            continue
        fm = "---\npaths:\n" + "".join(f'  - "{p}"\n' for p in paths) + "---\n"
        body = HEADER.format(src=src.relative_to(ROOT).as_posix()) + "\n" + src.read_text(encoding="utf-8")
        out[ROOT / ".claude" / "rules" / src.name] = fm + body

    for src in sorted((ROOT / ".claude" / "agents").glob("*.md")):
        fields, body = frontmatter(src.read_text(encoding="utf-8"))
        model = OPENCODE_MODELS.get(fields.get("model", "sonnet"), OPENCODE_MODELS["sonnet"])
        lines = [
            "---",
            f"description: {fields.get('description', '')}",
            "mode: subagent",
            f"model: {model}",
        ]
        if fields.get("name") in READ_ONLY:
            # V1-Format; OpenCode 2 liest es ebenfalls (umgekehrt nicht)
            lines += ["permission:", "  edit: deny"]
        lines.append("---")
        header = HEADER.format(src=src.relative_to(ROOT).as_posix())
        out[ROOT / ".opencode" / "agents" / src.name] = "\n".join(lines) + "\n" + header + body

    own_skills = sorted(
        p.name
        for p in (ROOT / ".claude" / "skills").iterdir()
        if p.is_dir() and not p.name.startswith("openspec-") and (p / "SKILL.md").exists()
    )
    settings_path = ROOT / ".pi" / "settings.json"
    settings = json.loads(settings_path.read_text(encoding="utf-8")) if settings_path.exists() else {}
    settings["skills"] = [f"../.claude/skills/{name}" for name in own_skills]
    out[settings_path] = json.dumps(settings, indent=2, ensure_ascii=False) + "\n"
    return out


def main() -> int:
    check = "--check" in sys.argv
    stale = []
    for path, content in targets().items():
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current == content:
            continue
        stale.append(path.relative_to(ROOT).as_posix())
        if not check:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
    if check and stale:
        print("Nicht synchron (python3 tools/sync_agents.py ausführen):\n  " + "\n  ".join(stale))
        return 1
    print(("Veraltet: " if check else "Aktualisiert: ") + (", ".join(stale) or "nichts"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
