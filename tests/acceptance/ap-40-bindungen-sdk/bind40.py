"""Gemeinsame Hilfen für die Abnahmetests AP-40: `bindctl` in fünf Laufzeiten, `graphctl` als Gegenprobe.

Aufrufe nach design.md (Prüfprogramm `bindctl`). Festgeschriebene Annahmen, wo design.md nur die Wirkung
nennt:

- Ausgabe: genau ein JSON-Dokument in der **letzten nicht leeren Zeile** von stdout (davor dürfen z. B.
  Meldungen von `mix` stehen). Rückgabecode 0, auch wenn `errors` Fehler enthält.
- Abnahme-Builds mit `pkg-beispiel` und `test-hooks`:
  Rust `cargo build --release -p cee-bind --features pkg-beispiel,test-hooks --example bindctl`;
  Elixir `mix compile` mit Umgebungsvariable `CEE_BIND_FEATURES=pkg-beispiel,test-hooks` (Rustler
  `features:`), dieselbe Variable bei `mix run`;
  Node/Browser `npm run -s kern:build -- --features pkg-beispiel,test-hooks`;
  Python `uv run --package cee-sdk maturin develop --release -m crates/graph-py/Cargo.toml
  --features pkg-beispiel,test-hooks`, danach `uv run --no-sync --package cee-sdk python …` (damit uv den
  Entwicklungs-Build nicht ersetzt).
- `run <szenario.json> [--save <datei>]`: Ablauf Import (`types`, `project`) → `errors` (in Reihenfolge)
  → `ops` (einzeln über `apply_op`) → `states` → `queries`. Ausgabe
  `{"results": [{"result": "ok"|"<code>", "warnings": [...], ...}], "hash": "<hex>", "export_sha256": "<hex>",
  "queries": [{"query": "<text>", "value": <wert>} | {"query": "<text>", "error": {code, message, element}}],
  "errors": [{"code", "message", "element"} | null], "states": <wie graphctl states> | null}`.
  `results` je Operation wie `graphctl apply`. `errors[i]` ist `null`, wenn der Aufruf nicht scheiterte.
- Einträge in `errors`: `{"op_json": "<text>"}` (Text an `apply_op`), `{"op": {...}}`,
  `{"load_bytes_b64": "<base64>"}`, `{"element": "<id>"}`, `{"parse": ["<text>", "<default>"|null]}`,
  `{"convert": [<wert>, "<von>", "<nach>"]}`, `{"debug_panic": true}`. Fehler-Operationen wirken auf das
  importierte Dokument; abgelehnte Operationen ändern es nicht.
- Abfragewerte wie `graphctl` (`validate` → `{"findings"}`, `order` → `{"order","skipped"}`, `affected:<id>` →
  `{"affected"}`, `subgraph:<id>` → `{"elements","external_inputs",…}`, `migrate` → `{"before","after"}`,
  `element:<id>` → Element-JSON, `units` → Liste wie `graphctl units`, `parse`/`convert` → `{"value","unit"}`,
  `packages` → Liste der Namen, `call:<name>|<args>` → Ergebnis). Zeitangaben (`duration_ms`) vergleicht der
  Test nicht.
- `load <datei> [--ops <ops.json>] [--save <datei>]`: `{"hash", "results"}`; `--save` wie bei `run`
  (Erweiterung gegenüber design.md, siehe Offene Fragen im PR).
- `merge <a> <b> [--save <datei>]`: `{"hash"}`.
- `api`: `{"functions": ["units", "Doc.new", ...]}` mit den Namen genau wie in der Fassadentabelle.
- `bench --project <projekt.json> --json`: flaches Objekt; je Laufzeit `<präfix>_op_p95_ms` (Präfixe `rust`,
  `nif`, `wasm_node`, `wasm_browser`, `py`), `load_10k_ms`, `hash_10k_ms`; Node und Browser zusätzlich
  `wasm_size_kb`.
"""

from __future__ import annotations

import base64
import functools
import hashlib
import json
import os
import random
import subprocess
from pathlib import Path

from conftest import ROOT, need

RUNTIMES = ("rust", "elixir", "node", "browser", "python")
OTHERS = RUNTIMES[1:]
FEATURES = "pkg-beispiel,test-hooks"
NOFEAT_TARGET = ROOT / "target" / "bind-ohne-pkg"
DEMO_TARGET = ROOT / "target" / "demo-migration"
SERVER = ROOT / "server"
CLIENT = ROOT / "client"

# Fassadentabelle aus design.md (Namen wie dort).
FACADE = [
    "units",
    "parse",
    "convert",
    "Doc.new",
    "Doc.import",
    "Doc.load",
    "doc.save",
    "doc.apply_op",
    "doc.apply",
    "doc.export",
    "doc.hash",
    "doc.merge",
    "doc.validate",
    "doc.order",
    "doc.affected",
    "doc.subgraph",
    "doc.migrate",
    "doc.element",
    "doc.materialized_count",
    "States.new",
    "states.event",
    "states.ready",
    "states.get",
    "packages",
    "call",
]

# Scheduler-Zuordnung aus design.md (Rustler-NIF und CeeServer.Graph), normalisierte Namen.
NORMAL = {
    "units",
    "parse",
    "convert",
    "apply_op",
    "element",
    "materialized_count",
    "states.event",
    "states.ready",
    "states.get",
    "packages",
}
DIRTY = {
    "new",
    "import",
    "load",
    "save",
    "apply",
    "export",
    "hash",
    "merge",
    "validate",
    "order",
    "affected",
    "subgraph",
    "migrate",
    "states.new",
    "call",
}

BINDING_CRATES = ("cee-graph-nif", "cee-graph-wasm", "cee-graph-py")
NEW_CRATES = ("cee-bind", *BINDING_CRATES, "cee-pkg-beispiel")
CRATE_DIRS = ("bind", "graph-nif", "graph-wasm", "graph-py", "pkg-beispiel")


def run_cmd(cmd: list[str], cwd: Path = ROOT, timeout: int = 1800, env: dict | None = None):
    """Befehl ausführen; fehlt das Werkzeug, im strengen Modus ein Fehlschlag (conftest.need)."""
    need(cmd[0])
    full_env = dict(os.environ)
    full_env.update(env or {})
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout, env=full_env)


def tail(res: subprocess.CompletedProcess) -> str:
    return ((res.stdout or "")[-1500:] + "\n" + (res.stderr or "")[-2500:]).strip()


def require(*paths: Path) -> None:
    missing = [str(p.relative_to(ROOT)) for p in paths if not p.exists()]
    assert not missing, f"Fehlt (Produktcode aus ap-40): {missing}"


# --- Bauen je Laufzeit ------------------------------------------------------------------------------------


@functools.cache
def _prepare(rt: str, nofeat: bool = False) -> str:
    """Baut die Laufzeit einmal je Testlauf; liefert eine Fehlermeldung oder "" bei Erfolg."""
    try:
        _prepare_inner(rt, nofeat)
    except AssertionError as e:
        return str(e)
    return ""


def _prepare_inner(rt: str, nofeat: bool) -> None:
    if rt == "rust":
        require(ROOT / "crates" / "bind" / "Cargo.toml", ROOT / "crates" / "bind" / "examples" / "bindctl.rs")
        cmd = ["cargo", "build", "-q", "--release", "-p", "cee-bind", "--example", "bindctl"]
        env = {}
        if nofeat:
            cmd += ["--features", "test-hooks"]
            env["CARGO_TARGET_DIR"] = str(NOFEAT_TARGET)
        else:
            cmd += ["--features", FEATURES]
        res = run_cmd(cmd, env=env)
        assert res.returncode == 0, f"bindctl (Rust) baut nicht:\n{tail(res)}"
    elif rt == "elixir":
        require(SERVER / "lib" / "cee_server" / "graph.ex", SERVER / "priv" / "bindctl.exs")
        require(ROOT / "crates" / "graph-nif" / "Cargo.toml")
        res = run_cmd(["mix", "deps.get"], cwd=SERVER, timeout=600)
        assert res.returncode == 0, f"mix deps.get:\n{tail(res)}"
        res = run_cmd(["mix", "compile"], cwd=SERVER, env=elixir_env())
        assert res.returncode == 0, f"mix compile (NIF):\n{tail(res)}"
    elif rt in ("node", "browser"):
        require(ROOT / "crates" / "graph-wasm" / "Cargo.toml", CLIENT / "tools" / "bindctl-node.mjs")
        if rt == "browser":
            require(CLIENT / "tools" / "bindctl-browser.mjs", CLIENT / "tools" / "bindctl.html")
        scripts = json.loads((CLIENT / "package.json").read_text(encoding="utf-8")).get("scripts", {})
        want = {"kern:build", "kern:bindctl", "kern:bindctl-browser"}
        assert want <= set(scripts), f"client/package.json: Skripte fehlen: {sorted(want - set(scripts))}"
        if not (CLIENT / "node_modules").is_dir():
            res = run_cmd(["npm", "ci"], cwd=CLIENT, timeout=900)
            assert res.returncode == 0, f"npm ci:\n{tail(res)}"
        err = _wasm_build()
        assert not err, err
        if rt == "browser":
            res = run_cmd(["npx", "playwright", "install", "chromium"], cwd=CLIENT, timeout=900)
            assert res.returncode == 0, f"Playwright/Chromium:\n{tail(res)}"
    elif rt == "python":
        require(ROOT / "sdk" / "python" / "pyproject.toml", ROOT / "crates" / "graph-py" / "Cargo.toml")
        require(ROOT / "sdk" / "python" / "tools" / "bindctl.py")
        manifest = str(ROOT / "crates" / "graph-py" / "Cargo.toml")
        cmd = ["uv", "run", "--package", "cee-sdk", "maturin", "develop", "--release", "-m", manifest]
        res = run_cmd([*cmd, "--features", FEATURES])
        assert res.returncode == 0, f"maturin develop (cee-sdk):\n{tail(res)}"
    else:
        raise AssertionError(f"unbekannte Laufzeit {rt}")


@functools.lru_cache(maxsize=1)
def _wasm_build() -> str:
    res = run_cmd(["npm", "run", "-s", "kern:build", "--", "--features", FEATURES], cwd=CLIENT)
    return "" if res.returncode == 0 else f"npm run kern:build:\n{tail(res)}"


def elixir_env() -> dict:
    return {"CEE_BIND_FEATURES": FEATURES}


def prepare(rt: str, nofeat: bool = False) -> None:
    """Laufzeit bauen; Fehlschlag mit Grund, wenn Produktcode oder Bau fehlt."""
    if rt == "rust":
        need("cargo")
    err = _prepare(rt, nofeat)
    assert not err, f"[{rt}] {err}"


def _command(rt: str, nofeat: bool) -> tuple[list[str], Path, dict]:
    if rt == "rust":
        target = NOFEAT_TARGET if nofeat else Path(os.environ.get("CARGO_TARGET_DIR", ROOT / "target"))
        return [str(target / "release" / "examples" / "bindctl")], ROOT, {}
    if rt == "elixir":
        return ["mix", "run", "--no-start", "priv/bindctl.exs"], SERVER, elixir_env()
    if rt == "node":
        return ["npm", "run", "-s", "kern:bindctl", "--"], CLIENT, {}
    if rt == "browser":
        return ["npm", "run", "-s", "kern:bindctl-browser", "--"], CLIENT, {}
    if rt == "python":
        return (
            ["uv", "run", "--no-sync", "--package", "cee-sdk", "python", "sdk/python/tools/bindctl.py"],
            ROOT,
            {},
        )
    raise AssertionError(rt)


def bindctl(rt: str, *args, nofeat: bool = False, timeout: int = 1800) -> subprocess.CompletedProcess:
    """`bindctl <args>` in Laufzeit `rt`; baut beim ersten Aufruf. Fehlt etwas, schlägt der Test fehl."""
    prepare(rt, nofeat)
    cmd, cwd, env = _command(rt, nofeat)
    full_env = dict(os.environ)
    full_env.update(env)
    argv = [*cmd, *map(str, args)]
    return subprocess.run(argv, cwd=cwd, capture_output=True, text=True, timeout=timeout, env=full_env)


def last_json(res: subprocess.CompletedProcess):
    lines = [ln for ln in (res.stdout or "").splitlines() if ln.strip()]
    assert lines, f"keine Ausgabe:\n{tail(res)}"
    try:
        return json.loads(lines[-1])
    except json.JSONDecodeError as e:
        raise AssertionError(f"letzte Zeile ist kein JSON ({e}):\n{tail(res)}") from e


def bindctl_json(rt: str, *args, nofeat: bool = False, timeout: int = 1800):
    res = bindctl(rt, *args, nofeat=nofeat, timeout=timeout)
    assert res.returncode == 0, f"[{rt}] bindctl {args} schlug fehl (Prozess beendet?):\n{tail(res)}"
    return last_json(res)


# --- graphctl als Gegenprobe ------------------------------------------------------------------------------


@functools.lru_cache(maxsize=2)
def _graphctl_build(demo: bool) -> tuple[int, str]:
    cmd = ["cargo", "build", "-q", "--release", "-p", "cee-graph", "--example", "graphctl"]
    env = {}
    if demo:
        cmd += ["--features", "demo-migration"]
        env["CARGO_TARGET_DIR"] = str(DEMO_TARGET)
    res = run_cmd(cmd, env=env)
    return res.returncode, tail(res)


def graphctl(*args, demo: bool = False, timeout: int = 1800) -> subprocess.CompletedProcess:
    code, err = _graphctl_build(demo)
    assert code == 0, f"graphctl baut nicht:\n{err}"
    target = DEMO_TARGET if demo else Path(os.environ.get("CARGO_TARGET_DIR", ROOT / "target"))
    binary = target / "release" / "examples" / "graphctl"
    argv = [str(binary), *map(str, args)]
    return subprocess.run(argv, cwd=ROOT, capture_output=True, text=True, timeout=timeout)


def graphctl_json(*args, ok: bool = True, demo: bool = False, timeout: int = 1800):
    res = graphctl(*args, demo=demo, timeout=timeout)
    if ok:
        assert res.returncode == 0, f"graphctl {args}:\n{tail(res)}"
    return json.loads(res.stdout)


def write(path: Path, data) -> Path:
    path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    return path


@functools.cache
def _synth_text(n: int, seed: int) -> str:
    res = graphctl("synth", "--n", n, "--seed", seed)
    assert res.returncode == 0, f"graphctl synth:\n{tail(res)}"
    return res.stdout


def synth(n: int, seed: int) -> dict:
    return json.loads(_synth_text(n, seed))


def flat(els):
    for e in els:
        yield e
        yield from flat(e.get("content", []))


def element(
    id_: str,
    type_: str = "thing",
    params: dict | None = None,
    inputs: dict | None = None,
    outputs: dict | None = None,
    content: list | None = None,
    meta: dict | None = None,
) -> dict:
    return {
        "id": id_,
        "type": type_,
        "inputs": inputs or {},
        "params": params or {},
        "outputs": outputs if outputs is not None else {"out": "thing"},
        "content": content or [],
        "meta": meta if meta is not None else {"name": id_},
    }


def project(elements: list[dict]) -> dict:
    return {"schema_version": 1, "elements": elements}


def b64(data: bytes) -> str:
    return base64.b64encode(data).decode("ascii")


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def strip_timing(value):
    """Zeitangaben (`duration_ms`) entfernen; sie dürfen sich zwischen Laufzeiten unterscheiden."""
    if isinstance(value, dict):
        return {k: strip_timing(v) for k, v in value.items() if k != "duration_ms"}
    if isinstance(value, list):
        return [strip_timing(v) for v in value]
    return value


def comparable(out: dict) -> dict:
    """Teil der `run`-Ausgabe, der in allen Laufzeiten gleich sein muss."""
    keys = ("results", "hash", "export_sha256", "queries", "errors", "states")
    return strip_timing({k: out.get(k) for k in keys})


def first_diff(a, b, path: str = "") -> str:
    """Erste abweichende Stelle zweier JSON-Werte (für lesbare Fehlermeldungen)."""
    if type(a) is not type(b):
        return f"{path or '/'}: {a!r:.200} != {b!r:.200}"
    if isinstance(a, dict):
        for k in sorted(set(a) | set(b)):
            if k not in a or k not in b:
                return f"{path}/{k}: nur in einer Ausgabe"
            d = first_diff(a[k], b[k], f"{path}/{k}")
            if d:
                return d
        return ""
    if isinstance(a, list):
        if len(a) != len(b):
            return f"{path}: Länge {len(a)} != {len(b)}"
        for i, (x, y) in enumerate(zip(a, b, strict=True)):
            d = first_diff(x, y, f"{path}/{i}")
            if d:
                return d
        return ""
    return "" if a == b else f"{path or '/'}: {a!r:.200} != {b!r:.200}"


def query(out: dict, text: str) -> dict:
    """Eintrag einer Abfrage aus der `run`-Ausgabe."""
    for q in out.get("queries") or []:
        if isinstance(q, dict) and q.get("query") == text:
            return q
    raise AssertionError(f"Abfrage {text!r} fehlt in der Ausgabe: {str(out.get('queries'))[:500]}")


# --- Szenarien (AK-1) -------------------------------------------------------------------------------------

UNITS_LEN = ["mm", "m", "cm", "[in_i]"]
UNICODE = ["Grüße", "Straße", "日本語", "😀👍🏽", "é", "é", "Ω≈ç√∫", "zero​width"]
SUMME_ARGS = '{"type": "thing", "param": "p0"}'


def random_ops(ids: list[str], n: int, seed: int) -> list[dict]:
    """Deterministische Zufallsoperationen; abgelehnte (z. B. Zyklen) gehören dazu."""
    rng = random.Random(seed)
    ops: list[dict] = []
    created = 0
    for _ in range(n):
        kind = rng.choices(["set_param", "set_meta", "set_input", "create", "remove"], [50, 20, 15, 10, 5])[0]
        target = rng.choice(ids)
        if kind == "set_param":
            value = {"value": round(rng.uniform(-1e4, 1e4), rng.randint(0, 6)), "unit": rng.choice(UNITS_LEN)}
            ops.append({"op": "set_param", "id": target, "param": f"p{rng.randint(0, 3)}", "value": value})
        elif kind == "set_meta":
            ops.append({"op": "set_meta", "id": target, "key": "note", "value": rng.choice(UNICODE)})
        elif kind == "set_input":
            ops.append({"op": "set_input", "id": target, "name": "in", "target": f"{rng.choice(ids)}.out"})
        elif kind == "create":
            created += 1
            new_id = f"neu{seed}x{created}"
            params = {"p0": {"value": 1, "unit": "m"}}
            ops.append({"op": "create", "id": new_id, "type": "thing", "params": params})
            ids = [*ids, new_id]
        else:  # die ersten drei IDs bleiben für die Abfragen erhalten
            ops.append({"op": "remove", "id": rng.choice(ids[3:])})
    return ops


def standard_queries(ids: list[str]) -> list[str]:
    return [
        "validate",
        "order",
        f"affected:{ids[0]}",
        f"subgraph:{ids[1]}",
        "migrate",
        f"element:{ids[2]}",
        "units",
        "parse:1,2 m|mm",
        "convert:1.5|m|mm",
        "packages",
        f"call:beispiel.summe|{SUMME_ARGS}",
    ]


BRACKET_TYPES = [
    {
        "type": "bracket",
        "params": {
            "height": {"dimension": "length", "default_unit": "mm"},
            "angle": {"dimension": "angle", "default_unit": "deg"},
        },
    }
]


def scenario(proj: dict, ops: list | None = None, queries: list | None = None, **extra) -> dict:
    ids = [e["id"] for e in flat(proj["elements"])]
    out = {
        "types": [],
        "project": proj,
        "ops": ops or [],
        "states": [],
        "queries": queries if queries is not None else standard_queries(ids),
        "errors": [],
    }
    out.update(extra)
    return out


def synth_scenario(seed: int, n: int = 300, ops: int = 200) -> dict:
    proj = synth(n, seed)
    ids = [e["id"] for e in flat(proj["elements"])]
    return scenario(proj, random_ops(ids, ops, seed))


def example_scenario(name: str) -> dict:
    proj = json.loads((ROOT / "format" / "examples" / name).read_text(encoding="utf-8"))
    first = next(flat(proj["elements"]))["id"]
    return scenario(proj, [{"op": "set_meta", "id": first, "key": "note", "value": "geprüft"}])


def _sp(id_: str, param: str, value) -> dict:
    return {"op": "set_param", "id": id_, "param": param, "value": value}


def targeted_scenarios() -> dict[str, dict]:
    """Sieben gezielte `run`-Szenarien (das achte, Merge-Zyklus, läuft über `load`/`merge`)."""
    base = [element("a"), element("b", inputs={"in": "a.out"}), element("c", inputs={"in": "b.out"})]
    q = standard_queries(["a", "b", "c"])
    out: dict[str, dict] = {}
    out["einheitenregeln"] = scenario(
        project([element("h1", "bracket", {"height": {"value": 12, "unit": "mm"}}), *base]),
        [
            _sp("h1", "height", {"value": 1.2, "unit": "m"}),
            _sp("h1", "height", {"value": 3.5, "unit": "[in_i]"}),
            _sp("h1", "angle", {"value": 90, "unit": "deg"}),
            _sp("h1", "height", {"value": 5, "unit": "kg"}),
            _sp("h1", "height", {"value": 5, "unit": "furlongx"}),
            _sp("h1", "height", 7),
        ],
        [*q, "parse:1200|mm", "parse:90°|rad", "parse:3,5 [in_i]|mm", "convert:2|t{CO2e}|kg{CO2e}"],
        types=BRACKET_TYPES,
    )
    out["zyklus"] = scenario(
        project(base),
        [
            {"op": "set_input", "id": "a", "name": "in", "target": "c.out"},
            {"op": "set_input", "id": "a", "name": "self", "target": "a.out"},
            {"op": "set_meta", "id": "a", "key": "note", "value": "nach dem Zyklus"},
        ],
        q,
    )
    events = [("start", "a"), ("ok", "a"), ("start", "d"), ("err", "d"), ("change", "a")]
    events += [("start", "a"), ("ok", "a"), ("start", "b"), ("ok", "b")]
    out["zustaende"] = scenario(
        project([*base, element("d")]), [], q, states=[{"event": ev, "id": i} for ev, i in events]
    )
    group = element("g", content=[element(f"k{i}") for i in range(20)])
    out["teil_laden"] = scenario(
        project([group, *base]),
        [{"op": "set_input", "id": "k3", "name": "in", "target": "a.out"}],
        [*q, "subgraph:g", "element:k7", "affected:a"],
    )
    meta = {"name": "Größe 😀 日本", "desc": "é vs é"}
    out["unicode"] = scenario(
        project([element("u", meta=meta), *base]),
        [{"op": "set_meta", "id": "u", "key": f"k{i}", "value": v} for i, v in enumerate(UNICODE)],
        [*q, "element:u"],
    )
    numbers = [0.1, 1e-9, 1 / 3, 2.0**53, 2**53, -0.0, 1e300, 5e-324]
    out["zahlen"] = scenario(
        project(base),
        [_sp("a", f"n{i}", {"value": v, "unit": u}) for i, v in enumerate(numbers) for u in ("mm", "m")],
        [*q, "element:a", "convert:0.1|m|mm", "convert:0.3333333333333333|[in_i]|mm"],
    )
    out["geld"] = scenario(
        project([element("m1", params={"cost": {"amount": "12.50", "currency": "EUR"}}), *base]),
        [
            _sp("m1", "cost", {"amount": "0.10", "currency": "EUR"}),
            _sp("m1", "cost", {"amount": 12.5, "currency": "EUR"}),
            _sp("m1", "cost", {"amount": "12.50"}),
            _sp("m1", "price", {"amount": "99999999999.99", "currency": "CHF"}),
        ],
        [*q, "element:m1"],
    )
    return out


@functools.lru_cache(maxsize=1)
def _scenarios_text() -> str:
    out = {f"synth{s}": synth_scenario(s) for s in range(1, 11)}
    out["beispiel_baugruppe"] = example_scenario("baugruppe.json")
    out["beispiel_raum"] = example_scenario("raum.json")
    out.update(targeted_scenarios())
    return json.dumps(out, ensure_ascii=False)


def run_scenarios() -> dict[str, dict]:
    """19 `run`-Szenarien aus AK-1 (10 synth, 2 Beispiele, 7 gezielte); Szenario 20 ist der Merge-Zyklus."""
    return json.loads(_scenarios_text())


_RUST_CACHE: dict[str, str] = {}


def rust_run(name: str, scen: dict, tmp: Path) -> dict:
    """Rust-Sollwerte eines Szenarios (einmal je Testlauf)."""
    key = name + json.dumps(scen, sort_keys=True)
    if key not in _RUST_CACHE:
        path = write(tmp / f"{name}.rust.json", scen)
        _RUST_CACHE[key] = json.dumps(bindctl_json("rust", "run", path))
    return json.loads(_RUST_CACHE[key])
