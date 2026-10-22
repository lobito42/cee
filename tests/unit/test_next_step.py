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


def test_main_red_starts_repair_branch():
    out = ns.decide(entries(), {}, [], set(), "failure")
    assert out["step"] == "repair-main" and out["branch"] == "fix/main-rot" and out["resume"] is False
    assert ns.decide(entries(), {}, [], {"fix/main-rot"}, "failure")["resume"] is True


def test_main_red_waits_for_open_repair_pr():
    out = ns.decide(entries(), {}, [pr("fix/main-rot", number=9)], set(), "failure")
    assert out["step"] == "stop" and "Reparatur" in out["reason"]
    draft = pr("fix/main-rot", number=9)
    draft["isDraft"] = True
    out = ns.decide(entries(), {}, [draft], set(), "failure")
    assert out["step"] == "repair-main" and out["resume"] is True and out["pr"] == 9


def test_main_red_ignores_other_prs():
    red = pr("change/ap-a", checks=("FAILURE",))
    assert ns.decide(entries(), {}, [red], set(), "failure")["step"] == "repair-main"


def test_main_only_cancelled_jobs_is_not_red():
    assert ns.main_status("failure", ["success", "cancelled", "skipped"]) == "success"
    assert ns.main_status("failure", ["failure", "cancelled"]) == "failure"
    assert ns.main_status("failure", ["timed_out"]) == "failure"
    assert ns.main_status("failure", []) == "failure"
    assert ns.main_status("success", ["cancelled"]) == "success"


def test_open_green_pr_waits_for_review():
    done = {"ap-b": "done", "ap-c": "done", "ap-d": "done"}
    out = ns.decide(entries(), done, [pr("change/ap-a")], set(), "success")
    assert out["step"] == "stop" and "Review" in out["reason"]


def test_waiting_pr_does_not_block_other_changes():
    # ap-a wartet auf Review, ap-b hängt an ap-a, ap-c nicht nachts → die Nacht arbeitet an ap-d weiter
    out = ns.decide(entries(), {"ap-a": "build"}, [pr("change/ap-a")], set(), "success")
    assert out["step"] == "tests" and out["id"] == "ap-d"


def test_waiting_prs_never_stop_the_night():
    prs = [pr(f"tests/ap-{c}", number=n) for n, c in enumerate("xyz", 1)]
    out = ns.decide(entries(), {"ap-a": "build"}, prs, set(), "success")
    assert out["step"] == "build" and out["id"] == "ap-a"


def test_too_many_blocked_prs_stop():
    prs = [pr(f"tests/ap-{c}", ["blocked"], number=n) for n, c in enumerate("xyz", 1)]
    out = ns.decide(entries(), {}, prs, set(), "success")
    assert out["step"] == "stop" and "3 PRs" in out["reason"] and out["pr"] == 1


def test_conflict_is_resolved_by_merging_main():
    conflicted = pr("change/ap-a")
    conflicted["conflict"] = True
    out = ns.decide(entries(), {}, [conflicted], set(), "success")
    assert out["step"] == "merge-main" and out["pr"] == 7 and out["branch"] == "change/ap-a"
    # auch rote Abnahmetest-PRs: Konflikt zuerst
    tests = pr("tests/ap-b", checks=("FAILURE",))
    tests["conflict"] = True
    assert ns.decide(entries(), {}, [tests], set(), "success")["step"] == "merge-main"


def test_housekeeping_comes_before_new_work():
    red = pr("change/ap-a", checks=("FAILURE",))
    done = {"unarchived": {"ap-z"}, "merged": {"change/ap-z"}}
    out = ns.decide(entries(), {"ap-d": "tests"}, [red], set(), "success", **done)
    assert out["step"] == "fix"


def test_archive_merged_finished_change():
    out = ns.decide(entries(), {}, [], set(), "success", merged={"change/ap-z"}, unarchived={"ap-z"})
    assert out == {
        "step": "archive",
        "id": "ap-z",
        "branch": "archiv/ap-z",
        "resume": False,
        "model": "sonnet",
    }
    done = {"merged": {"change/ap-z"}, "unarchived": {"ap-z"}}
    out = ns.decide(entries(), {}, [], {"archiv/ap-z"}, "success", **done)
    assert out["resume"] is True


def test_unmerged_change_is_not_archived():
    out = ns.decide(entries(), {"ap-a": "build"}, [], set(), "success", merged=set(), unarchived={"ap-z"})
    assert out["step"] == "build"


def test_open_archive_pr_is_not_started_twice():
    arch = pr("archiv/ap-z")
    done = {"merged": {"change/ap-z"}, "unarchived": {"ap-z"}}
    out = ns.decide(entries(), {"ap-a": "build"}, [arch], set(), "success", **done)
    assert out["step"] == "build"  # der Archiv-PR wartet auf den Auto-Merge, die Nacht baut weiter


def test_fix_branch_pr_is_repaired_like_others():
    red = ("SUCCESS", "FAILURE")
    out = ns.decide(entries(), {}, [pr("fix/tippfehler", checks=red)], set(), "success")
    assert out["step"] == "fix" and out["attempt"] == 1


def test_independent_changes_run_in_parallel():
    # ap-a hat einen offenen PR, ap-d ist unabhängig und kommt trotzdem dran
    out = ns.decide(entries(), {"ap-a": "build"}, [pr("change/ap-a")], set(), "success")
    assert out["id"] == "ap-d"


def test_unarchived_changes(tmp_path):
    ch = tmp_path / "openspec" / "changes"
    (ch / "ap-1").mkdir(parents=True)
    (ch / "ap-1" / "tasks.md").write_text("- [x] 1\n", encoding="utf-8")
    (ch / "ap-2").mkdir()
    (ch / "ap-2" / "tasks.md").write_text("- [x] 1\n- [ ] 2\n", encoding="utf-8")
    (ch / "ap-3").mkdir()
    (ch / "ap-3" / "tasks.md").write_text("- [x] 1\n", encoding="utf-8")
    (ch / "archive" / "2026-10-01-ap-3").mkdir(parents=True)
    assert ns.unarchived_changes(tmp_path) == {"ap-1"}


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


def test_rejected_review_is_reworked_like_a_red_pr():
    rejected = pr("tests/ap-b", ["review-abgelehnt"])
    out = ns.decide(entries(), {"ap-a": "done"}, [rejected], set(), "success")
    assert out["step"] == "fix" and out["attempt"] == 1 and out["branch"] == "tests/ap-b"
    again = pr("change/ap-a", ["review-abgelehnt", "fix-1"])
    assert ns.decide(entries(), {}, [again], set(), "success")["attempt"] == 2
    last = pr("change/ap-a", ["review-abgelehnt", "fix-1", "fix-2"])
    out = ns.decide(entries(), {}, [last], set(), "success")
    assert out["step"] == "stop" and out["label"] == "blocked"
