"""AK-9: Codequalität der Bindungen (Capability `bindungen`).

Requirement „Codequalität der Bindungen“, Scenario „Prüfungen grün“. `mix compile --warnings-as-errors`,
`mix credo --strict` und `mix dialyzer` prüft `test_nif.py::test_typen_geprueft`.
"""

from __future__ import annotations

import re

import pytest
from bind40 import CLIENT, CRATE_DIRS, NEW_CRATES, ROOT, require, run_cmd, tail

FORBIDDEN = re.compile(r"\b(?:unwrap|expect)\(|\bpanic!|\bunsafe\b(?!_)")
TEST_HOOKS = re.compile(r'feature\s*=\s*"test-hooks"')


def test_cargo_fmt():
    """Scenario „Prüfungen grün“: `cargo fmt --check` erfolgreich (inklusive der neuen Crates)."""
    require(*(ROOT / "crates" / d / "Cargo.toml" for d in CRATE_DIRS))
    res = run_cmd(["cargo", "fmt", "--all", "--check"], timeout=600)
    assert res.returncode == 0, tail(res)


def test_cargo_clippy():
    """Scenario „Prüfungen grün“: `cargo clippy --all-targets --all-features -- -D warnings` erfolgreich."""
    require(*(ROOT / "crates" / d / "Cargo.toml" for d in CRATE_DIRS))
    res = run_cmd(
        ["cargo", "clippy", "--workspace", "--all-targets", "--all-features", "--", "-D", "warnings"]
    )
    assert res.returncode == 0, tail(res)


@pytest.mark.parametrize("crate", NEW_CRATES)
def test_cargo_test(crate):
    """Scenario „Prüfungen grün“: `cargo test -q` für jedes neue Crate erfolgreich."""
    require(*(ROOT / "crates" / d / "Cargo.toml" for d in CRATE_DIRS))
    res = run_cmd(["cargo", "test", "-q", "-p", crate])
    assert res.returncode == 0, tail(res)


def _hits(path) -> list[str]:
    """Verbotene Stellen außerhalb von Tests: alles ab `#[cfg(test)]` zählt als Test; Kommentare zählen nicht;
    `panic!` ist nur in den 15 Zeilen nach einem `feature = "test-hooks"` erlaubt (`debug_panic`)."""
    hits = []
    hook_line = -100
    for no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        code = line.split("//", 1)[0]
        if re.search(r"#\[cfg\(test\)\]", code):
            break
        if TEST_HOOKS.search(code):
            hook_line = no
        for m in FORBIDDEN.finditer(code):
            if m.group(0) == "panic!" and no - hook_line <= 15:
                continue
            hits.append(f"{path.relative_to(ROOT)}:{no}: {line.strip()}")
    return hits


def test_keine_panics_und_kein_unsafe():
    """Scenario „Prüfungen grün“: Suche nach `unwrap(`, `expect(`, `panic!`, `unsafe` außerhalb von Tests in
    den neuen Crates (src/ und examples/) findet 0 Stellen außer `debug_panic` hinter Feature `test-hooks`."""
    dirs = [ROOT / "crates" / d for d in CRATE_DIRS]
    require(*dirs)
    files = [f for d in dirs for sub in ("src", "examples") for f in sorted((d / sub).rglob("*.rs"))]
    assert files, "keine Rust-Quellen in den neuen Crates"
    hits = [h for f in files for h in _hits(f)]
    assert not hits, f"{len(hits)} Stellen:\n" + "\n".join(hits[:40])
    hooks = [f for f in files if TEST_HOOKS.search(f.read_text(encoding="utf-8"))]
    assert hooks, "Feature test-hooks (debug_panic) nicht gefunden"


def test_ruff_sdk_python():
    """Scenario „Prüfungen grün“: `uv run ruff check sdk/python` erfolgreich."""
    require(ROOT / "sdk" / "python" / "pyproject.toml")
    res = run_cmd(["uv", "run", "ruff", "check", "sdk/python"], timeout=600)
    assert res.returncode == 0, tail(res)


def test_npm_lint_client():
    """Scenario „Prüfungen grün“: `cd client && npm run lint` erfolgreich, inklusive der Skripte unter
    `client/tools/`."""
    require(CLIENT / "tools" / "bindctl-node.mjs", CLIENT / "tools" / "bindctl-browser.mjs")
    if not (CLIENT / "node_modules").is_dir():
        res = run_cmd(["npm", "ci"], cwd=CLIENT, timeout=900)
        assert res.returncode == 0, tail(res)
    res = run_cmd(["npm", "run", "lint"], cwd=CLIENT, timeout=900)
    assert res.returncode == 0, tail(res)


def test_lizenzpruefungen():
    """Scenario „Prüfungen grün“: Lizenzprüfungen für Cargo, npm, Mix und Python (die Prüfungen aus ap-00,
    streng) melden 0 Verstöße – mit den neuen Abhängigkeiten rustler, wasm-bindgen, pyo3, maturin."""
    require(
        *(ROOT / "crates" / d / "Cargo.toml" for d in CRATE_DIRS), ROOT / "sdk" / "python" / "pyproject.toml"
    )
    lock = (ROOT / "Cargo.lock").read_text(encoding="utf-8")
    for dep in ("rustler", "wasm-bindgen", "pyo3"):
        assert f'name = "{dep}"' in lock, f"{dep} fehlt in Cargo.lock"
    cmd = ["uv", "run", "pytest", "-q", "tests/acceptance/ap-00-setup/test_licenses.py"]
    res = run_cmd(cmd, timeout=1800, env={"CEE_STRICT": "1"})
    assert res.returncode == 0, tail(res)
    assert "skipped" not in res.stdout, res.stdout[-1500:]
