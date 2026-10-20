"""Unit-Tests für tools/next_step.py – den Schrittplaner der Nachtschicht."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("next_step", ROOT / "tools" / "next_step.py")
ns = importlib.util.module_from_spec(spec)
sys.modules["next_step"] = ns
spec.loader.exec_module(ns)

QUEUE = """
changes:
  - id: ap-a
    phase: build      # Kommentar
    model: opus
    night: true
    depends_on: []
  - id: ap-b
    phase: tests
    model: sonnet
    night: true
    depends_on: [ap-a]
  - id: ap-c
    phase: tests
    model: sonnet
    night: false
    depends_on: []
  - id: ap-d
    phase: tests
    model: sonnet
    night: true
    depends_on: []
"""


def entries():
    return ns.parse_queue(QUEUE)


def pr(branch, labels=(), checks=("SUCCESS",), number=7):
    rollup = [{"status": "COMPLETED", "conclusion": c} for c in checks]
    return {
        "number": number,
        "headRefName": branch,
        "labels": [{"name": n} for n in labels],
        "statusCheckRollup": rollup,
    }


def test_parse_queue():
    e = entries()
    assert [x["id"] for x in e] == ["ap-a", "ap-b", "ap-c", "ap-d"]
    assert e[0] == {"id": "ap-a", "phase": "build", "model": "opus", "night": True, "deps": []}
    assert e[1]["deps"] == ["ap-a"] and e[2]["night"] is False


def test_real_queue_parses():
    e = ns.parse_queue((ROOT / "openspec" / "queue.yaml").read_text(encoding="utf-8"))
    assert e and all(x["id"].startswith("ap-") for x in e)


def test_tasks_done():
    assert ns.tasks_done("- [x] 1.1 a\n- [X] 1.2 b\n")
    assert not ns.tasks_done("- [x] 1.1 a\n- [ ] 1.2 b\n")
    assert not ns.tasks_done("keine Tasks")


def test_derived_state(tmp_path):
    cid = "ap-x"
    assert ns.derived_state(tmp_path, cid) == "tests"
    (tmp_path / "tests" / "acceptance" / cid).mkdir(parents=True)
    assert ns.derived_state(tmp_path, cid) == "build"
    tasks = tmp_path / "openspec" / "changes" / cid / "tasks.md"
    tasks.parent.mkdir(parents=True)
    tasks.write_text("- [x] 1.1\n- [ ] 1.2\n", encoding="utf-8")
    assert ns.derived_state(tmp_path, cid) == "build"
    tasks.write_text("- [x] 1.1\n- [x] 1.2\n", encoding="utf-8")
    assert ns.derived_state(tmp_path, cid) == "done"


def test_queue_phase_is_lower_bound(tmp_path):
    assert ns.derived_state(tmp_path, "ap-x", "done") == "done"
    assert ns.derived_state(tmp_path, "ap-x", "review") == "build"


def test_archived_is_done(tmp_path):
    (tmp_path / "openspec" / "changes" / "archive" / "2026-10-01-ap-x").mkdir(parents=True)
    assert ns.derived_state(tmp_path, "ap-x") == "done"


def test_first_open_change_in_order():
    states = {"ap-a": "build", "ap-b": "tests", "ap-c": "tests", "ap-d": "tests"}
    out = ns.decide(entries(), states, [], set(), "success")
    assert out == {"step": "build", "id": "ap-a", "branch": "change/ap-a", "resume": False, "model": "opus"}


def test_dependencies_and_night_respected():
    states = {"ap-a": "build", "ap-b": "tests", "ap-c": "tests", "ap-d": "tests"}
    e = entries()
    e[0]["night"] = False  # ap-a nur tagsüber; ap-b hängt an ap-a; ap-c nicht nachts → ap-d
    assert ns.decide(e, states, [], set(), "success")["id"] == "ap-d"


def test_done_dependency_unlocks():
    states = {"ap-a": "done", "ap-b": "tests", "ap-c": "tests", "ap-d": "tests"}
    out = ns.decide(entries(), states, [], set(), "success")
    assert out["id"] == "ap-b" and out["step"] == "tests" and out["branch"] == "tests/ap-b"


def test_resume_existing_branch():
    states = {"ap-a": "build"}
    out = ns.decide(entries(), states, [], {"change/ap-a", "main"}, "success")
    assert out["resume"] is True


def test_main_red_stops():
    assert ns.decide(entries(), {}, [], set(), "failure")["step"] == "stop"


def test_open_green_pr_waits_for_review():
    done = {"ap-b": "done", "ap-c": "done", "ap-d": "done"}
    out = ns.decide(entries(), done, [pr("change/ap-a")], set(), "success")
    assert out["step"] == "stop" and "Review" in out["reason"]


def test_waiting_pr_does_not_block_other_changes():
    # ap-a wartet auf Review, ap-b hängt an ap-a, ap-c nicht nachts → die Nacht arbeitet an ap-d weiter
    out = ns.decide(entries(), {"ap-a": "build"}, [pr("change/ap-a")], set(), "success")
    assert out["step"] == "tests" and out["id"] == "ap-d"


def test_too_many_waiting_prs_stop():
    prs = [pr(f"tests/ap-{c}", number=n) for n, c in enumerate("xyz", 1)]
    out = ns.decide(entries(), {}, prs, set(), "success")
    assert out["step"] == "stop" and "3 PRs" in out["reason"] and out["pr"] == 1


def test_human_pr_does_not_block():
    out = ns.decide(entries(), {"ap-a": "build"}, [pr("kernteam/idee")], set(), "success")
    assert out["step"] == "build"


def test_draft_pr_resumes_instead_of_fix():
    draft = pr("change/ap-a", checks=("FAILURE",))
    draft["isDraft"] = True
    out = ns.decide(entries(), {}, [draft], set(), "success")
    assert out["step"] == "build" and out["resume"] is True and out["pr"] == 7


def test_red_tests_pr_waits_for_review():
    done = {"ap-a": "done", "ap-d": "done"}
    out = ns.decide(entries(), done, [pr("tests/ap-b", checks=("FAILURE",))], set(), "success")
    assert out["step"] == "stop" and "Review" in out["reason"]
    draft = pr("tests/ap-b", checks=("FAILURE",))
    draft["isDraft"] = True
    assert ns.decide(entries(), {}, [draft], set(), "success")["step"] == "tests"


def test_merged_change_counts_as_done():
    states = {"ap-a": "build", "ap-b": "tests", "ap-c": "tests", "ap-d": "tests"}
    out = ns.decide(entries(), states, [], set(), "success", merged={"change/ap-a"})
    assert out["id"] == "ap-b"  # ap-a fertig, damit ist ap-b frei


def test_red_pr_gets_fixed_twice_then_stops():
    red = ("SUCCESS", "FAILURE")
    first = ns.decide(entries(), {}, [pr("change/ap-a", checks=red)], set(), "success")
    assert first["step"] == "fix" and first["attempt"] == 1 and first["model"] == "opus"
    second = ns.decide(entries(), {}, [pr("change/ap-a", ["fix-1"], red)], set(), "success")
    assert second["step"] == "fix" and second["attempt"] == 2
    third = ns.decide(entries(), {}, [pr("change/ap-a", ["fix-1", "fix-2"], red)], set(), "success")
    assert third["step"] == "stop" and third["label"] == "blocked"


def test_blocked_and_pending():
    done = {"ap-a": "done", "ap-d": "done"}
    assert ns.decide(entries(), done, [pr("tests/ap-b", ["blocked"])], set(), "success")["step"] == "stop"
    pending = pr("change/ap-a")
    pending["statusCheckRollup"] = [{"status": "IN_PROGRESS", "conclusion": None}]
    out = ns.decide(entries(), {"ap-d": "done"}, [pending], set(), "success")
    assert out["step"] == "stop" and "läuft" in out["reason"]


def test_nothing_to_do():
    states = {e["id"]: "done" for e in entries()}
    assert ns.decide(entries(), states, [], set(), "success") == {"step": "stop", "reason": "Nichts zu tun"}
