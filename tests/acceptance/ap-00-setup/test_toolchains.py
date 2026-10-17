"""Abnahmetests AP-00 – jede Sprache baut und testet (AK-2, AK-3, AK-4)."""

import json
import time

from conftest import ROOT, sh


def test_ak2_rust_workspace_green():
    """AK-2: Rust-Workspace ist formatiert, ohne Clippy-Warnungen und grün."""
    for cmd in (
        ["cargo", "fmt", "--all", "--check"],
        ["cargo", "clippy", "--workspace", "--all-targets", "--", "-D", "warnings"],
        ["cargo", "test", "-q", "--workspace"],
    ):
        res = sh(cmd)
        assert res.returncode == 0, f"{' '.join(cmd)}:\n{res.stderr[-2000:]}"


def test_ak2_elixir_server_green():
    """AK-2: Phoenix-Server: formatiert, ohne Warnungen, Credo und Dialyzer sauber, Health-Test vorhanden."""
    server = ROOT / "server"
    for cmd in (
        ["mix", "format", "--check-formatted"],
        ["mix", "compile", "--warnings-as-errors"],
        ["mix", "credo", "--strict"],
        ["mix", "dialyzer"],
        ["mix", "test"],
    ):
        res = sh(cmd, cwd=server, timeout=1500)  # erster Dialyzer-Lauf baut die PLT (5–10 min auf 2 CPUs)
        assert res.returncode == 0, f"{' '.join(cmd)}:\n{(res.stdout + res.stderr)[-2000:]}"
    deps = (server / "mix.exs").read_text(encoding="utf-8")
    for dep in (":phoenix", ":credo", ":dialyxir"):
        assert dep in deps, f"{dep} fehlt in server/mix.exs"
    tests = " ".join(p.read_text(encoding="utf-8") for p in (server / "test").rglob("*_test.exs"))
    assert "/health" in tests, "Kein Test für GET /health"


def test_ak3_client_has_real_lint_and_tests():
    """AK-3: Client hat echte lint- und test-Skripte (ESLint, Vitest) und beide sind grün."""
    client = ROOT / "client"
    pkg = json.loads((client / "package.json").read_text(encoding="utf-8"))
    assert "eslint" in pkg["scripts"]["lint"] and "vitest" in pkg["scripts"]["test"]
    tsconfig = (client / "tsconfig.json").read_text(encoding="utf-8")
    assert '"strict": true' in tsconfig
    for script in ("lint", "test"):
        res = sh(["npm", "run", "--silent", script], cwd=client)
        assert res.returncode == 0, f"npm run {script}:\n{(res.stdout + res.stderr)[-2000:]}"


def test_ak4_worker_answers_ping():
    """AK-4: Der Worker beantwortet {"op": "ping"} über stdio in < 5 s inkl. Start, mit Kernel und Version."""
    start = time.perf_counter()
    res = sh(["uv", "run", "--quiet", "python", "-m", "cee_worker"], stdin='{"op": "ping"}\n', timeout=60)
    elapsed = time.perf_counter() - start
    assert res.returncode == 0, res.stderr[-2000:]
    answer = json.loads(res.stdout.strip().splitlines()[0])
    assert answer == {"ok": True, "kernel": "occt", "kernel_version": answer.get("kernel_version")}
    assert answer["kernel_version"], "kernel_version fehlt"
    assert elapsed < 5.0, f"ping dauerte {elapsed:.2f} s"
