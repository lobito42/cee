"""Bestimmt den nächsten Schritt der Nachtschicht – deterministisch, ohne KI.

Der Zustand eines Changes wird aus dem Repository abgeleitet, nicht von Hand gepflegt:

- ``tests``: ``tests/acceptance/<id>/`` fehlt auf main → Abnahmetests schreiben
- ``build``: Abnahmetests liegen auf main, aber nicht alle Tasks in ``tasks.md`` sind abgehakt → umsetzen
- ``done``:  alle Tasks abgehakt, Change archiviert oder ``phase: done`` in der Warteschlange

``openspec/queue.yaml`` bleibt die Freigabe (welche Changes, in welcher Reihenfolge, ``night``, ``model``);
``phase`` dort ist nur noch eine Untergrenze, die das Kernteam setzen kann.

Reihenfolge der Regeln:

1. main ist rot → anhalten (nicht an fremden Fehlern arbeiten).
2. Es gibt einen offenen Agenten-PR (Branch ``tests/…`` oder ``change/…``):
   Label ``blocked`` → anhalten; CI rot und weniger als zwei Reparaturversuche (Labels ``fix-1``, ``fix-2``)
   → Schritt ``fix``; CI läuft → anhalten; sonst wartet der PR auf Review → anhalten.
3. Erster freigegebener Change (``night: true``), der nicht fertig ist und dessen Abhängigkeiten fertig sind:
   Schritt ``tests`` oder ``build``. Gibt es den Branch schon auf GitHub, wird dort weitergearbeitet
   (``resume: true``), statt neu von main anzufangen.
4. Sonst: „Nichts zu tun“.

Aufruf: ``python3 tools/next_step.py`` (fragt GitHub über ``gh`` ab) oder mit ``--offline`` und Dateien
für Tests. Ausgabe: eine JSON-Zeile, z. B.
``{"step": "build", "id": "ap-02-…", "branch": "change/ap-02-…", "resume": false, "model": "sonnet"}``.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
from pathlib import Path

ROOT = Path(os.environ.get("CEE_ROOT") or Path(__file__).resolve().parents[1])
ORDER = {"tests": 0, "build": 1, "review": 1, "done": 2}
AGENT_BRANCH = re.compile(r"^(tests|change)/([a-z0-9][a-z0-9-]*)$")
FAILED = {"FAILURE", "CANCELLED", "TIMED_OUT", "ACTION_REQUIRED", "ERROR", "STARTUP_FAILURE"}


def parse_queue(text: str) -> list[dict]:
    """Liest die Einträge aus queue.yaml (ohne YAML-Bibliothek, Format wie in der Datei)."""
    entries: list[dict] = []
    for line in text.splitlines():
        line = line.split("#", 1)[0].rstrip()
        if m := re.match(r"\s*-\s*id:\s*(\S+)", line):
            entries.append(
                {"id": m.group(1), "phase": "tests", "model": "sonnet", "night": False, "deps": []}
            )
        elif entries and (m := re.match(r"\s+(phase|model|night|depends_on):\s*(.*)$", line)):
            key, value = m.group(1), m.group(2).strip()
            if key == "night":
                entries[-1]["night"] = value.lower() == "true"
            elif key == "depends_on":
                entries[-1]["deps"] = [d.strip() for d in value.strip("[]").split(",") if d.strip()]
            else:
                entries[-1][key] = value
    return entries


def tasks_done(text: str) -> bool:
    """Alle Tasks abgehakt (mindestens einer vorhanden)."""
    open_ = re.findall(r"^\s*- \[ \]", text, re.M)
    done = re.findall(r"^\s*- \[[xX]\]", text, re.M)
    return bool(done) and not open_


def derived_state(root: Path, change_id: str, queue_phase: str = "tests") -> str:
    """Zustand eines Changes aus dem Repository; die Phase aus der Warteschlange ist eine Untergrenze."""
    archive = root / "openspec" / "changes" / "archive"
    if archive.exists() and any(p.name.endswith(f"-{change_id}") for p in archive.iterdir()):
        return "done"
    state = "tests"
    if (root / "tests" / "acceptance" / change_id).is_dir():
        state = "build"
        tasks = root / "openspec" / "changes" / change_id / "tasks.md"
        if tasks.exists() and tasks_done(tasks.read_text(encoding="utf-8")):
            state = "done"
    floor = "build" if queue_phase == "review" else queue_phase
    return state if ORDER.get(state, 0) >= ORDER.get(floor, 0) else floor


def checks(pr: dict) -> str:
    """Gesamtstatus der Checks eines PRs: success, failure oder pending."""
    rollup = pr.get("statusCheckRollup") or []
    if any((c.get("conclusion") or c.get("state") or "").upper() in FAILED for c in rollup):
        return "failure"
    pending = [
        c
        for c in rollup
        if (c.get("status") and c["status"].upper() != "COMPLETED")
        or (c.get("state") or "").upper() in {"PENDING", "EXPECTED"}
    ]
    return "pending" if pending or not rollup else "success"


def decide(entries: list[dict], states: dict[str, str], prs: list[dict], remote: set[str], main: str) -> dict:
    """Die eigentliche Entscheidung – reine Funktion, damit sie testbar ist."""
    if main == "failure":
        return {"step": "stop", "reason": "main ist rot – erst reparieren (Kernteam)"}
    by_id = {e["id"]: e for e in entries}
    agent_prs = [p for p in prs if AGENT_BRANCH.match(p.get("headRefName", ""))]
    if agent_prs:
        pr = sorted(agent_prs, key=lambda p: p.get("number", 0))[0]
        branch = pr["headRefName"]
        change_id = AGENT_BRANCH.match(branch).group(2)
        labels = {lbl.get("name") for lbl in pr.get("labels", [])}
        base = {"pr": pr.get("number"), "branch": branch, "id": change_id}
        if "blocked" in labels:
            return {"step": "stop", "reason": "PR ist blockiert und wartet auf einen Menschen", **base}
        status = checks(pr)
        if status == "failure":
            if "fix-2" in labels:
                return {
                    "step": "stop",
                    "reason": "zwei Reparaturversuche erfolglos – Label blocked setzen",
                    **base,
                }
            attempt = 2 if "fix-1" in labels else 1
            model = by_id.get(change_id, {}).get("model", "sonnet")
            return {"step": "fix", "attempt": attempt, "model": model, "resume": True, **base}
        if status == "pending":
            return {"step": "stop", "reason": "CI des offenen PRs läuft noch", **base}
        return {"step": "stop", "reason": "offener PR wartet auf Review", **base}
    for entry in entries:
        cid = entry["id"]
        if not entry["night"] or states.get(cid) == "done":
            continue
        if any(states.get(d) != "done" for d in entry["deps"]):
            continue
        step = "tests" if states.get(cid, "tests") == "tests" else "build"
        branch = f"{'tests' if step == 'tests' else 'change'}/{cid}"
        return {
            "step": step,
            "id": cid,
            "branch": branch,
            "resume": branch in remote,
            "model": entry["model"],
        }
    return {"step": "stop", "reason": "Nichts zu tun"}


def _gh(args: list[str]) -> str:
    res = subprocess.run(["gh", *args], cwd=ROOT, capture_output=True, text=True, timeout=120)
    if res.returncode != 0:
        raise SystemExit(f"gh {' '.join(args)} fehlgeschlagen: {res.stderr.strip()[:500]}")
    return res.stdout


def gather_online() -> tuple[list[dict], set[str], str]:
    prs = json.loads(
        _gh(
            ["pr", "list", "--state", "open", "--json", "number,headRefName,labels,isDraft,statusCheckRollup"]
        )
    )
    res = subprocess.run(
        ["git", "ls-remote", "--heads", "origin"], cwd=ROOT, capture_output=True, text=True, timeout=120
    )
    remote = {ln.split("refs/heads/", 1)[1] for ln in res.stdout.splitlines() if "refs/heads/" in ln}
    runs = json.loads(
        _gh(
            [
                "run",
                "list",
                "--branch",
                "main",
                "--workflow",
                "ci.yml",
                "--limit",
                "1",
                "--json",
                "conclusion",
            ]
        )
    )
    main = (runs[0].get("conclusion") or "pending") if runs else "unknown"
    return prs, remote, main


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--offline", action="store_true", help="GitHub nicht abfragen")
    parser.add_argument("--prs", type=Path, help="JSON wie gh pr list --json … (offline)")
    parser.add_argument("--remote", default="", help="kommagetrennte Remote-Branches (offline)")
    parser.add_argument("--main", default="success", help="Status von main (offline)")
    args = parser.parse_args()
    entries = parse_queue((ROOT / "openspec" / "queue.yaml").read_text(encoding="utf-8"))
    states = {e["id"]: derived_state(ROOT, e["id"], e["phase"]) for e in entries}
    if args.offline:
        prs = json.loads(args.prs.read_text(encoding="utf-8")) if args.prs else []
        remote = {b for b in args.remote.split(",") if b}
        main_status = args.main
    else:
        prs, remote, main_status = gather_online()
    print(json.dumps(decide(entries, states, prs, remote, main_status), ensure_ascii=False))


if __name__ == "__main__":
    main()
