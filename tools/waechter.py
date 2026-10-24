#!/usr/bin/env python3
"""Wächter für den Betrieb: prüft, ob Prüf-Roboter, Auto-Merge und Nachtschicht laufen.

Behebt selbst, was mechanisch ist (fehlgeschlagene Review-Läufe offener PRs einmal wiederholen), und meldet nur
Stillstand, den er nicht beheben kann, als Kommentar im Issue „Fragen an das Kernteam“ (Label `fragen`).

  python3 tools/waechter.py            prüfen und beheben
  python3 tools/waechter.py --dry-run  nur anzeigen
"""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timedelta, timezone

DRY = "--dry-run" in sys.argv
NACHT_MAX_STILLSTAND = timedelta(hours=8)
PR_MAX_WARTEZEIT = timedelta(hours=2)
REVIEW_WORKFLOWS = ("Review und Auto-Merge", "Claude Review")


def gh(*args: str) -> str:
    res = subprocess.run(["gh", *args], capture_output=True, text=True, timeout=60)
    return res.stdout if res.returncode == 0 else ""


def gh_json(*args: str):
    out = gh(*args)
    return json.loads(out) if out.strip() else []


def parse(ts: str) -> datetime:
    return datetime.fromisoformat(ts.replace("Z", "+00:00"))


def main() -> int:
    now = datetime.now(timezone.utc)
    befunde: list[str] = []

    # 1. Fehlgeschlagene Review-Läufe offener PRs einmal wiederholen
    for pr in gh_json("pr", "list", "--json", "number,headRefName,labels"):
        labels = {label["name"] for label in pr["labels"]}
        if labels & {"review-ok", "review-abgelehnt"}:
            continue
        runs = gh_json(
            "run", "list", "--branch", pr["headRefName"], "--limit", "10",
            "--json", "databaseId,name,conclusion,attempt,createdAt",
        )
        for run in runs:
            if run["name"] in REVIEW_WORKFLOWS and run["conclusion"] == "failure" and run["attempt"] < 2:
                if now - parse(run["createdAt"]) > timedelta(days=2):
                    continue
                print(f"PR {pr['number']}: Review-Lauf {run['databaseId']} wird wiederholt")
                if not DRY:
                    gh("run", "rerun", str(run["databaseId"]), "--failed")
                break

    # 2. Lange wartende Prüfungen offener PRs melden
    for pr in gh_json("pr", "list", "--json", "number,title,updatedAt,labels"):
        labels = {label["name"] for label in pr["labels"]}
        if "blocked" in labels or "wartet-auf-mensch" in labels:
            continue
        if now - parse(pr["updatedAt"]) > PR_MAX_WARTEZEIT:
            checks = gh("pr", "checks", str(pr["number"]))
            if "pending" in checks or "fail" in checks:
                befunde.append(f"Eine Änderung wartet seit über zwei Stunden auf ihre Prüfung: {pr['title']}")

    # 3. Nachtschicht eingeschaltet, aber ohne Erfolg seit Stunden
    if "an" in gh("variable", "get", "NACHTSCHICHT").split():
        runs = gh_json(
            "run", "list", "--workflow", "nachtschicht.yml", "--limit", "10",
            "--json", "conclusion,createdAt",
        )
        erfolge = [parse(r["createdAt"]) for r in runs if r["conclusion"] == "success"]
        if not erfolge or now - max(erfolge) > NACHT_MAX_STILLSTAND:
            befunde.append("Die Nachtschicht hatte seit über acht Stunden keinen erfolgreichen Lauf.")

    for b in befunde:
        print("Befund:", b)
    if befunde and not DRY:
        issues = gh_json("issue", "list", "--label", "fragen", "--json", "number", "--limit", "1")
        if issues:
            text = "Wächter: " + " ".join(befunde)
            gh("issue", "comment", str(issues[0]["number"]), "--body", text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
