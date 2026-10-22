"""AK-3 und Abhängigkeiten: Fassade über die Kern-API (Capability `bindungen`).

Requirement „Fassade über die Kern-API“, Scenarios „Jede Funktion in jeder Laufzeit“ und „Bindungen ohne
eigenes Datenmodell“.
"""

from __future__ import annotations

import functools
import json

import pytest
from bind40 import BINDING_CRATES, FACADE, NEW_CRATES, RUNTIMES, bindctl_json, run_cmd, tail


@pytest.mark.parametrize("rt", RUNTIMES)
def test_jede_funktion_in_jeder_laufzeit(rt):
    """Scenario „Jede Funktion in jeder Laufzeit“: `bindctl api` enthält alle 25 Funktionen der
    Fassadentabelle aus design.md (0 fehlende)."""
    out = bindctl_json(rt, "api")
    functions = out.get("functions")
    assert isinstance(functions, list), out
    missing = [f for f in FACADE if f not in functions]
    assert not missing, f"[{rt}] {len(missing)} fehlende Funktionen: {missing}"


@functools.lru_cache(maxsize=1)
def metadata_text() -> str:
    res = run_cmd(["cargo", "metadata", "--format-version", "1", "--no-deps"], timeout=600)
    assert res.returncode == 0, tail(res)
    return res.stdout


def packages() -> dict[str, dict]:
    return {p["name"]: p for p in json.loads(metadata_text())["packages"]}


def normal_deps(pkg: dict) -> list[dict]:
    """Direkte Abhängigkeiten ohne dev- und build-Abhängigkeiten."""
    return [d for d in pkg["dependencies"] if d.get("kind") in (None, "normal")]


def test_bindungen_ohne_eigenes_datenmodell():
    """Scenario „Bindungen ohne eigenes Datenmodell“: `cee-graph-nif`, `cee-graph-wasm`, `cee-graph-py`
    hängen nicht direkt von automerge ab (sondern von `cee-bind`), und `cee-graph` hängt von keinem neuen
    Crate ab."""
    pkgs = packages()
    missing = [c for c in NEW_CRATES if c not in pkgs]
    assert not missing, f"Crates fehlen im Workspace: {missing}"
    for name in BINDING_CRATES:
        deps = {d["name"] for d in normal_deps(pkgs[name])}
        assert not {d for d in deps if d.startswith("automerge")}, (
            f"{name} hängt direkt von automerge ab: {deps}"
        )
        assert "cee-bind" in deps, (
            f"{name} ruft die Fassade nicht auf (keine Abhängigkeit auf cee-bind): {deps}"
        )
    core = {d["name"] for d in pkgs["cee-graph"]["dependencies"]}
    assert not core & set(NEW_CRATES), f"cee-graph hängt von neuen Crates ab: {core & set(NEW_CRATES)}"


def test_neue_crates_unter_mpl():
    """Requirement „Fassade über die Kern-API“ (ADR-034): die neuen Crates stehen unter MPL-2.0."""
    pkgs = packages()
    missing = [c for c in NEW_CRATES if c not in pkgs]
    assert not missing, f"Crates fehlen im Workspace: {missing}"
    wrong = {c: pkgs[c].get("license") for c in NEW_CRATES if pkgs[c].get("license") != "MPL-2.0"}
    assert not wrong, f"Lizenz nicht MPL-2.0: {wrong}"
