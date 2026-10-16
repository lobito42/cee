"""Unit-Tests für den Vertragsschutz (tools/guard.py)."""

import importlib.util
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("guard", ROOT / "tools" / "guard.py")
guard = importlib.util.module_from_spec(spec)
spec.loader.exec_module(guard)

ALLOWED = [
    ("packages/cadloop-core/ids.py", "main"),
    ("packages/cadloop-core/ids.py", "change/ap-17-identitaet"),
    ("openspec/changes/ap-17-identitaet/tasks.md", "change/ap-17-identitaet"),
    ("openspec/changes/ap-17-identitaet/proposal.md", "spec/ap-17-identitaet"),
    ("openspec/changes/ap-17-identitaet/specs/identitaet/spec.md", "spec/ap-17-identitaet"),
    ("tests/acceptance/ap-17-identitaet/test_x.py", "tests/ap-17-identitaet"),
    ("tests/golden/halter.json", "tests/ap-17-identitaet"),
    ("tests/unit/test_x.py", "tests/ap-17-identitaet"),
    ("packages/x.py", "claude/change/ap-17-identitaet"),  # Präfix der Cloud-Routinen
    ("crates/graph/src/lib.rs", "change/ap-01-spike-datenmodell"),
    ("server/lib/cadloop_server.ex", "change/ap-01-spike-datenmodell"),
    ("format/schema/element.json", "change/ap-01-spike-datenmodell"),
]

BLOCKED = [
    ("openspec/changes/ap-17-identitaet/proposal.md", "change/ap-17-identitaet"),
    ("openspec/changes/ap-18-publikation/tasks.md", "change/ap-17-identitaet"),
    ("openspec/changes/ap-17-identitaet/proposal.md", "main"),
    ("tests/acceptance/ap-17-identitaet/test_x.py", "change/ap-17-identitaet"),
    ("tests/acceptance/ap-18-publikation/test_x.py", "tests/ap-17-identitaet"),
    ("tests/golden/halter.json", "change/ap-17-identitaet"),
    ("packages/x.py", "tests/ap-17-identitaet"),
    ("packages/x.py", "spec/ap-17-identitaet"),
    ("docs/adr/ADR-001.md", "spec/ap-17-identitaet"),
    ("openspec/queue.yaml", "change/ap-17-identitaet"),
    ("openspec/specs/identitaet/spec.md", "change/ap-17-identitaet"),
    ("openspec/changes/archive/2026-x/proposal.md", "spec/archive"),
    ("AGENTS.md", "main"),
    (".claude/settings.json", "main"),
    (".pi/extensions/guard.ts", "main"),
    ("opencode.json", "main"),
    ("LICENSE", "change/ap-17-identitaet"),
    ("sdk/LICENSE", "main"),
]


@pytest.mark.parametrize(("path", "branch"), ALLOWED)
def test_allowed(path, branch):
    assert guard.reason(path, branch) is None


@pytest.mark.parametrize(("path", "branch"), BLOCKED)
def test_blocked(path, branch):
    assert guard.reason(path, branch) is not None


def test_core_may_change_everything():
    assert guard.reason("docs/adr/ADR-001.md", "main", role="core") is None


def test_stop_hook_sees_unstaged_change_in_first_status_line(tmp_path, monkeypatch, capsys):
    """Regression: führendes Leerzeichen von `git status --porcelain` darf nicht verloren gehen."""
    import json
    import subprocess

    subprocess.run(["git", "init", "-q", "-b", "main", str(tmp_path)], check=True)
    adr = tmp_path / "docs" / "adr" / "ADR-001.md"
    adr.parent.mkdir(parents=True)
    adr.write_text("a\n")
    git = ["git", "-C", str(tmp_path), "-c", "user.name=t", "-c", "user.email=t@t"]
    subprocess.run([*git, "add", "-A"], check=True)
    subprocess.run([*git, "commit", "-qm", "init"], check=True)
    adr.write_text("b\n")  # unstaged → Statuszeile " M docs/adr/ADR-001.md"

    monkeypatch.delenv("CADLOOP_ROLE", raising=False)
    monkeypatch.setattr("sys.argv", ["guard.py", "claude-stop"])
    monkeypatch.setattr("sys.stdin", __import__("io").StringIO(json.dumps({"cwd": str(tmp_path)})))
    assert guard.main() == 0
    out = json.loads(capsys.readouterr().out)
    assert out["decision"] == "block"
    assert "docs/adr/ADR-001.md" in out["reason"]
