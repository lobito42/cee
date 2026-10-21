"""AK-5: Rustler-NIF für den Server (Capability `bindungen`).

Requirement „Rustler-NIF für den Server“, Scenarios „Dirty-Scheduler wie festgelegt“ und „Typen geprüft“.

Namensregel für NIF-Funktionen (Annahme, design.md nennt nur die Fassadennamen): maßgeblich ist
`name = "..."` im Attribut, sonst der Rust-Funktionsname; klein geschrieben, Präfixe `nif_` und `doc_`
entfallen, `states_<x>` wird `states.<x>`, `import_project` wird `import`, `apply_ops` wird `apply`.
"""

from __future__ import annotations

import re

from bind40 import DIRTY, NORMAL, ROOT, SERVER, elixir_env, require, run_cmd, tail

NIF_SRC = ROOT / "crates" / "graph-nif" / "src"
GRAPH_EX = SERVER / "lib" / "cee_server" / "graph.ex"

NIF_RE = re.compile(
    r"#\[\s*(?:rustler::)?nif\b\s*(?:\((?P<args>[^\]]*)\))?\s*\]\s*(?:#\[[^\]]*\]\s*)*"
    r"(?:pub(?:\([^)]*\))?\s+)?fn\s+(?:r#)?(?P<fn>\w+)",
    re.S,
)
ALIASES = {"import_project": "import", "apply_ops": "apply"}


def normalize(name: str) -> str:
    n = name.lower()
    for prefix in ("nif_", "doc_"):
        if n.startswith(prefix):
            n = n[len(prefix) :]
    if n.startswith("states_"):
        n = "states." + n[len("states_") :]
    return ALIASES.get(n, n)


def nif_functions() -> dict[str, bool]:
    """Alle NIF-Funktionen: normalisierter Name → Dirty-CPU ja/nein."""
    require(NIF_SRC)
    found: dict[str, bool] = {}
    for path in sorted(NIF_SRC.rglob("*.rs")):
        for m in NIF_RE.finditer(path.read_text(encoding="utf-8")):
            args = m.group("args") or ""
            named = re.search(r'name\s*=\s*"([^"]+)"', args)
            name = normalize(named.group(1) if named else m.group("fn"))
            found[name] = bool(re.search(r'schedule\s*=\s*"DirtyCpu"', args))
    return found


def test_dirty_scheduler_wie_festgelegt():
    """Scenario „Dirty-Scheduler wie festgelegt“: genau die 15 Funktionen der Dirty-CPU-Liste tragen
    `schedule = "DirtyCpu"` (0 fehlend, 0 zusätzlich); die 10 kurzen Funktionen gibt es als normale NIF."""
    found = nif_functions()
    dirty = {n for n, d in found.items() if d}
    assert not DIRTY - dirty, f"Dirty-CPU fehlt bei: {sorted(DIRTY - dirty)}"
    assert not dirty - DIRTY, f"Dirty-CPU zusätzlich bei: {sorted(dirty - DIRTY)}"
    normal = {n for n, d in found.items() if not d}
    assert not NORMAL - normal, f"normale NIF fehlt: {sorted(NORMAL - normal)} (gefunden: {sorted(found)})"


def _public_and_specs(text: str) -> tuple[set[str], set[str]]:
    public = set(re.findall(r"^\s*def(?:delegate)?\s+([a-z_][\w]*[?!]?)", text, re.M))
    specs = set(re.findall(r"^\s*@spec\s+([a-z_][\w]*[?!]?)\s*\(", text, re.M))
    return public, specs


def test_elixir_modul_form():
    """Requirement „Rustler-NIF für den Server“: `CeeServer.Graph` mit `use Rustler` und `mode: :release`,
    jede öffentliche Funktion mit `@spec`, kein Prozess je Dokument (kein GenServer/Agent/spawn)."""
    require(GRAPH_EX)
    text = GRAPH_EX.read_text(encoding="utf-8")
    assert re.search(r"defmodule\s+CeeServer\.Graph\b", text)
    assert re.search(r"use\s+Rustler\b", text) and re.search(r"mode:\s*:release", text), (
        "use Rustler, mode: :release"
    )
    public, specs = _public_and_specs(text)
    assert public, "keine öffentlichen Funktionen in CeeServer.Graph"
    assert not public - specs, f"öffentliche Funktionen ohne @spec: {sorted(public - specs)}"
    code = re.sub(r"#.*", "", text)
    assert not re.search(r"\b(GenServer|Agent|spawn|Task\.start)\b", code), (
        "Prozess in der Bibliotheksschicht"
    )


def test_typen_geprueft():
    """Scenario „Typen geprüft“: `mix compile --warnings-as-errors`, `mix credo --strict` und `mix dialyzer`
    in `server/` erfolgreich."""
    require(GRAPH_EX, ROOT / "crates" / "graph-nif" / "Cargo.toml")
    res = run_cmd(["mix", "deps.get"], cwd=SERVER, timeout=600)
    assert res.returncode == 0, tail(res)
    for cmd, timeout in (
        (["mix", "compile", "--warnings-as-errors", "--force"], 1800),
        (["mix", "credo", "--strict"], 600),
        (["mix", "dialyzer"], 3600),
    ):
        res = run_cmd(cmd, cwd=SERVER, timeout=timeout, env=elixir_env())
        assert res.returncode == 0, f"{' '.join(cmd)}:\n{tail(res)}"
