"""Bestimmt den nächsten Schritt der Nachtschicht – deterministisch, ohne KI.

Der Zustand eines Changes wird aus dem Repository abgeleitet, nicht von Hand gepflegt:

- ``tests``: ``tests/acceptance/<id>/`` fehlt auf main → Abnahmetests schreiben
- ``build``: Abnahmetests liegen auf main, aber nicht alle Tasks in ``tasks.md`` sind abgehakt → umsetzen
- ``done``:  alle Tasks abgehakt, Change archiviert oder ``phase: done`` in der Warteschlange

``openspec/queue.yaml`` bleibt die Freigabe (welche Changes, in welcher Reihenfolge, ``night``, ``model``);
``phase`` dort ist nur noch eine Untergrenze, die das Kernteam setzen kann.

Reihenfolge der Regeln:

1. main ist rot → anhalten (nicht an fremden Fehlern arbeiten).
2. Offene Agenten-PRs (Branch ``tests/…`` oder ``change/…``), älteste zuerst: Entwurf → dort
   weiterarbeiten (``resume``); CI rot und weniger als zwei Reparaturversuche (Labels ``fix-1``, ``fix-2``)
   → Schritt ``fix``, danach ``label: blocked``. Alle anderen warten (``blocked``, Abnahmetest-PR absichtlich
   rot, CI läuft, wartet auf Review); ihr Change wird übersprungen, die Nacht arbeitet an anderen weiter.
3. Warten schon ``MAX_WAITING`` PRs auf einen Menschen oder ein Review → anhalten, damit sich nichts staut.
4. Erster freigegebener Change (``night: true``) ohne offenen PR, der nicht fertig ist und dessen
   Abhängigkeiten fertig sind: Schritt ``tests`` oder ``build``. Gibt es den Branch schon auf GitHub (und ist
   er nicht in main gemergt), wird dort weitergearbeitet (``resume: true``). Ein gemergter
   ``change/<id>``-PR gilt als fertig.
5. Sonst: anhalten mit dem Grund des ältesten wartenden PRs bzw. „Nichts zu tun“.

Die Nachtschicht ruft den Planer bis zu dreimal je Nacht auf (eine Runde je Schritt, siehe Workflow).

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
MAX_WAITING = 3  # offene Agenten-PRs, die auf Menschen oder Review warten
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


def decide(
    entries: list[dict],
    states: dict[str, str],
    prs: list[dict],
    remote: set[str],
    main: str,
    merged: set[str] = frozenset(),
) -> dict:
    """Die eigentliche Entscheidung – reine Funktion, damit sie testbar ist.

    `remote`: Branches auf GitHub, die noch nicht in main enthalten sind.
    `merged`: Head-Branches gemergter PRs; ein gemergter
    `change/<id>` gilt als fertig, auch wenn Tasks offen sind (z. B. [mensch]-Kriterien).
    """
    if main == "failure":
        return {"step": "stop", "reason": "main ist rot – erst reparieren (Kernteam)"}
    by_id = {e["id"]: e for e in entries}
    agent_prs = [p for p in prs if AGENT_BRANCH.match(p.get("headRefName", ""))]
    waiting: list[dict] = []
    for pr in sorted(agent_prs, key=lambda p: p.get("number", 0)):
        branch = pr["headRefName"]
        change_id = AGENT_BRANCH.match(branch).group(2)
        labels = {lbl.get("name") for lbl in pr.get("labels", [])}
        base = {"pr": pr.get("number"), "branch": branch, "id": change_id}
        model = by_id.get(change_id, {}).get("model", "sonnet")
        step = "tests" if branch.startswith("tests/") else "build"
        if "blocked" in labels:
            reason = "PR ist blockiert und wartet auf einen Menschen"
            waiting.append({"step": "stop", "reason": reason, **base})
            continue
        if pr.get("isDraft"):
            # Entwurf = Arbeit unfertig (z. B. abgebrochene Nacht): weitermachen, nicht „reparieren“.
            return {"step": step, "resume": True, "model": model, **base}
        if step == "tests":
            # Abnahmetest-PRs sind absichtlich rot (Tests vor der Umsetzung) – sie warten auf Review.
            waiting.append({"step": "stop", "reason": "Abnahmetests warten auf Review", **base})
            continue
        status = checks(pr)
        if status == "failure":
            if "fix-2" in labels:
                return {
                    "step": "stop",
                    "reason": "zwei Reparaturversuche erfolglos – PR wird blockiert",
                    "label": "blocked",
                    **base,
                }
            attempt = 2 if "fix-1" in labels else 1
            return {"step": "fix", "attempt": attempt, "model": model, "resume": True, **base}
        reason = "CI des offenen PRs läuft noch" if status == "pending" else "offener PR wartet auf Review"
        waiting.append({"step": "stop", "reason": reason, **base})
    if len(waiting) >= MAX_WAITING:
        return {**waiting[0], "reason": f"{len(waiting)} PRs warten auf Review – erst prüfen"}
    busy = {w["id"] for w in waiting}
    states = {**states, **{m.split("/", 1)[1]: "done" for m in merged if m.startswith("change/")}}
    for entry in entries:
        cid = entry["id"]
        if not entry["night"] or cid in busy or states.get(cid) == "done":
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
    return waiting[0] if waiting else {"step": "stop", "reason": "Nichts zu tun"}


def _gh(args: list[str]) -> str:
    res = subprocess.run(["gh", *args], cwd=ROOT, capture_output=True, text=True, timeout=120)
    if res.returncode != 0:
        raise SystemExit(f"gh {' '.join(args)} fehlgeschlagen: {res.stderr.strip()[:500]}")
    return res.stdout


def _unmerged(branches: set[str]) -> set[str]:
    """Nur Agenten-Branches, die noch nicht in origin/main enthalten sind."""
    out = set()
    for b in branches:
        if not AGENT_BRANCH.match(b):
            continue
        res = subprocess.run(
            ["git", "merge-base", "--is-ancestor", f"origin/{b}", "origin/main"],
            cwd=ROOT,
            capture_output=True,
        )
        if res.returncode != 0:
            out.add(b)
    return out


def _api(path: str) -> list | dict:
    """REST statt GraphQL (`gh pr list`): GraphQL ist in Cloud-Umgebungen teils gesperrt."""
    return json.loads(_gh(["api", path]))


def _rollup(sha: str) -> list[dict]:
    runs = _api(f"repos/{{owner}}/{{repo}}/commits/{sha}/check-runs?per_page=100")["check_runs"]
    return [{"status": r["status"].upper(), "conclusion": (r["conclusion"] or "").upper()} for r in runs]


def gather_online() -> tuple[list[dict], set[str], str, set[str]]:
    # PRs aus Forks nie als Agenten-PRs werten: ein Fremder könnte einen Branch change/<id> anlegen.
    own = "{owner}/{repo}"
    prs = [
        {
            "number": p["number"],
            "headRefName": p["head"]["ref"],
            "labels": [{"name": lbl["name"]} for lbl in p["labels"]],
            "isDraft": p["draft"],
            "statusCheckRollup": _rollup(p["head"]["sha"]) if AGENT_BRANCH.match(p["head"]["ref"]) else [],
        }
        for p in _api(f"repos/{own}/pulls?state=open&per_page=100")
        if (p["head"].get("repo") or {}).get("full_name") == p["base"]["repo"]["full_name"]
    ]
    res = subprocess.run(
        ["git", "ls-remote", "--heads", "origin"], cwd=ROOT, capture_output=True, text=True, timeout=120
    )
    heads = {ln.split("refs/heads/", 1)[1] for ln in res.stdout.splitlines() if "refs/heads/" in ln}
    subprocess.run(["git", "fetch", "-q", "origin"], cwd=ROOT, capture_output=True, timeout=300)
    remote = _unmerged(heads)
    merged = {
        p["head"]["ref"]
        for p in _api(f"repos/{own}/pulls?state=closed&per_page=100")
        if p.get("merged_at")
        and (p["head"].get("repo") or {}).get("full_name") == p["base"]["repo"]["full_name"]
    }
    runs = _api(f"repos/{own}/actions/workflows/ci.yml/runs?branch=main&per_page=1")["workflow_runs"]
    main = (runs[0].get("conclusion") or "pending") if runs else "unknown"
    return prs, remote, main, merged


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--offline", action="store_true", help="GitHub nicht abfragen")
    parser.add_argument("--prs", type=Path, help="JSON wie gh pr list --json … (offline)")
    parser.add_argument("--remote", default="", help="kommagetrennte Remote-Branches (offline)")
    parser.add_argument("--main", default="success", help="Status von main (offline)")
    parser.add_argument("--merged", default="", help="kommagetrennte Head-Branches gemergter PRs (offline)")
    args = parser.parse_args()
    entries = parse_queue((ROOT / "openspec" / "queue.yaml").read_text(encoding="utf-8"))
    states = {e["id"]: derived_state(ROOT, e["id"], e["phase"]) for e in entries}
    if args.offline:
        prs = json.loads(args.prs.read_text(encoding="utf-8")) if args.prs else []
        remote = {b for b in args.remote.split(",") if b}
        main_status = args.main
        merged = {b for b in args.merged.split(",") if b}
    else:
        prs, remote, main_status, merged = gather_online()
    print(json.dumps(decide(entries, states, prs, remote, main_status, merged), ensure_ascii=False))


if __name__ == "__main__":
    main()
