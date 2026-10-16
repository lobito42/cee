#!/usr/bin/env python3
"""Ersetzt den Arbeitsnamen CADLoop überall durch den endgültigen Projektnamen.

  python3 tools/rename_project.py "Neuer Name"            Vorschau (ändert nichts)
  python3 tools/rename_project.py "Neuer Name" --apply    anwenden

Ersetzt in Textdateien und Pfaden:
  CADLoop → Anzeigename (wie angegeben)     cadloop → kebab-case     CADLOOP → GROSS_MIT_UNTERSTRICH
  Cadloop → PascalCase (Klassennamen)       cadloop_core → snake_case-Variante (Python-Module)
  Der Zusatz „(Arbeitsname)“ entfällt.
Danach: `python3 tools/sync_agents.py`, `uv lock`, Tests laufen lassen, committen (Rolle core).
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".venv", "node_modules", "__pycache__", ".pytest_cache", ".ruff_cache"}
SELF = Path(__file__).resolve()


def variants(display: str) -> list[tuple[str, str]]:
    words = re.findall(r"[A-Za-z0-9]+", display)
    if not words:
        raise SystemExit("Name braucht mindestens einen Buchstaben oder eine Ziffer.")
    kebab = "-".join(w.lower() for w in words)
    snake = "_".join(w.lower() for w in words)
    upper = "_".join(w.upper() for w in words)
    pascal = "".join(w[:1].upper() + w[1:].lower() for w in words)
    # Reihenfolge wichtig: spezifische Muster zuerst
    return [
        ("CADLoop (Arbeitsname)", display),
        ("(Arbeitsname CADLoop)", f"({display})"),
        ("cadloop_", f"{snake}_"),
        ("CADLOOP", upper),
        ("CADLoop", display),
        ("Cadloop", pascal),
        ("cadloop", kebab),
    ]


def files() -> list[Path]:
    result = []
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.is_file() and path.resolve() != SELF:
            result.append(path)
    return result


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 64
    display, apply = sys.argv[1], "--apply" in sys.argv
    pairs = variants(display)
    changed_files, renamed = 0, []

    for path in files():
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        new = text
        for old, rep in pairs:
            new = new.replace(old, rep)
        if new != text:
            changed_files += 1
            if apply:
                path.write_text(new, encoding="utf-8")

    for path in sorted(ROOT.rglob("*cadloop*"), key=lambda p: len(p.parts), reverse=True):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        name = path.name
        for old, rep in pairs:
            name = name.replace(old, rep)
        renamed.append(f"{path.relative_to(ROOT)} → {name}")
        if apply:
            path.rename(path.with_name(name))

    mode = "Geändert" if apply else "Vorschau"
    print(f"{mode}: {changed_files} Dateien mit Textersetzungen, {len(renamed)} umbenannte Pfade")
    for line in renamed:
        print(f"  {line}")
    if not apply:
        print("Zum Anwenden --apply anhängen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
