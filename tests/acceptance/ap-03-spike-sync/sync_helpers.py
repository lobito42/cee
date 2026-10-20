"""Gemeinsame Hilfen für die Abnahmetests AP-03 (Sync-Spike).

Die Tests verlassen sich nicht auf Dateien, die der Change selbst schreibt: Sie bauen den Prototyp, starten
den Server mit `serve.sh`, führen die Szenarien mit dem Node-Client aus und rechnen Datenverlust und Konflikte
aus `--dump` und den HTTP-Antworten des Servers selbst nach (design.md, „Nachmessen statt Glauben“).
"""

from __future__ import annotations

import functools
import itertools
import json
import os
import signal
import socket
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path

import pytest
from conftest import ROOT, need, sh

SPIKE = ROOT / "spikes" / "sync"
CLIENT = SPIKE / "client" / "sync.mjs"
DELAY_MS = 15  # 30 ms Umlaufzeit je Strecke Client–Server („gleiche Region“, Entscheidung 2)
N_ELEMENTS = 10_000
SCENARIO_TIMEOUT = 300  # jedes Szenario höchstens 5 min (design.md, Budget)


@functools.lru_cache(maxsize=1)
def _build() -> tuple[int, str]:
    res = sh(["bash", str(SPIKE / "build.sh")], timeout=1800)
    return res.returncode, (res.stdout + res.stderr)[-3000:]


def build() -> None:
    """`bash spikes/sync/build.sh` einmal je Testlauf; Build höchstens 30 min."""
    assert (SPIKE / "build.sh").exists(), "spikes/sync/build.sh fehlt"
    code, out = _build()
    assert code == 0, f"build.sh fehlgeschlagen:\n{out}"


def _free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class Server:
    """Server aus `bash spikes/sync/serve.sh <port>`; Protokoll (stdout/stderr) landet in `log`."""

    def __init__(self, log: Path):
        build()
        need("bash")
        self.port = _free_port()
        self.base = f"http://127.0.0.1:{self.port}"
        self.url = f"ws://127.0.0.1:{self.port}/socket"
        self.log = log
        self._out = log.open("w", encoding="utf-8")
        self.proc = subprocess.Popen(
            ["bash", str(SPIKE / "serve.sh"), str(self.port)],
            cwd=ROOT,
            stdout=self._out,
            stderr=subprocess.STDOUT,
            start_new_session=True,
        )
        deadline = time.monotonic() + 180
        while time.monotonic() < deadline:
            assert self.proc.poll() is None, f"serve.sh beendet:\n{self.log_text()[-3000:]}"
            try:
                if self.get_text("/health").strip() == "ok":
                    return
            except (OSError, urllib.error.URLError):
                pass
            time.sleep(0.5)
        self.stop()
        pytest.fail(f"Server antwortet nicht auf GET /health:\n{self.log_text()[-3000:]}")

    def stop(self) -> None:
        if self.proc.poll() is None:
            os.killpg(self.proc.pid, signal.SIGTERM)
            try:
                self.proc.wait(timeout=30)
            except subprocess.TimeoutExpired:
                os.killpg(self.proc.pid, signal.SIGKILL)
                self.proc.wait(timeout=30)
        self._out.close()

    def log_text(self) -> str:
        self._out.flush()
        return self.log.read_text(encoding="utf-8", errors="replace")

    def get_text(self, path: str, method: str = "GET") -> str:
        req = urllib.request.Request(self.base + path, method=method)
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.read().decode("utf-8")

    def get(self, path: str, method: str = "GET"):
        return json.loads(self.get_text(path, method))

    def docs(self) -> dict[str, dict]:
        """`GET /docs` als {Dokumentname: Eintrag}."""
        entries = self.get("/docs")
        assert isinstance(entries, list), f"/docs liefert keine Liste: {entries}"
        return {e["doc"]: e for e in entries}

    def hash(self, doc: str) -> str:
        return self.get(f"/docs/{doc}/hash")["hash"]

    def client_args(self, scenario: str, doc: str, *extra: str) -> list[str]:
        return [
            "node",
            str(CLIENT),
            scenario,
            "--url",
            self.url,
            "--doc",
            doc,
            "--delay-ms",
            str(DELAY_MS),
            *extra,
            "--json",
        ]

    def run(self, scenario: str, doc: str, *extra: str) -> dict:
        """Szenario mit dem Node-Client ausführen; Ergebnis ist die letzte JSON-Zeile auf stdout."""
        res = sh(self.client_args(scenario, doc, *extra), timeout=SCENARIO_TIMEOUT)
        assert res.returncode == 0, f"sync.mjs {scenario}: {(res.stdout + res.stderr)[-3000:]}"
        return last_json(res.stdout)


@pytest.fixture(name="server")
def server_fixture(tmp_path):
    srv = Server(tmp_path / "server.log")
    yield srv
    srv.stop()


def last_json(stdout: str) -> dict:
    lines = [ln for ln in stdout.strip().splitlines() if ln.strip()]
    assert lines, "keine Ausgabe"
    return json.loads(lines[-1])


def metric(out: dict, key: str) -> float:
    """Kennzahl aus der Ausgabe eines Szenarios: flach, als {"value": …} oder unter "metrics"."""
    src = out.get("metrics", out)
    assert key in src, f"Kennzahl {key} fehlt in der Ausgabe: {sorted(src)}"
    value = src[key]["value"] if isinstance(src[key], dict) else src[key]
    assert isinstance(value, (int, float)) and not isinstance(value, bool), f"{key}: keine Zahl ({value!r})"
    return value


def flatten(project: dict) -> dict[str, dict]:
    """Alle Elemente eines Projekt-JSON (auch in `content` verschachtelte) als {id: Element}."""
    out: dict[str, dict] = {}

    def walk(elements):
        for e in elements:
            out[e["id"]] = e
            walk(e.get("content") or [])

    walk(project["elements"])
    return out


def read_hash(path: Path) -> str:
    text = path.read_text(encoding="utf-8").strip()
    return json.loads(text)["hash"] if text.startswith("{") else text


# --- Nachrechnen aus `--dump` (gilt für alle Szenarien) -------------------------------------------------

SIDES = ("a", "b")


def _field(op: dict) -> tuple[str, object] | None:
    if op["op"] == "set_param":
        return "params", op["value"]
    if op["op"] == "set_input":
        return "inputs", op["ref"]
    return None


def _target(ref: str) -> str:
    return ref.split(".", 1)[0]


def analyse(ops: dict[str, list[dict]], project: dict, findings: list[dict]) -> dict:
    """Erwartungen aus den Operationen beider Seiten ableiten und gegen Endstand und Befunde prüfen."""
    other = {"a": "b", "b": "a"}
    last: dict[str, dict[tuple, object]] = {s: {} for s in SIDES}
    edits: dict[str, dict[str, list[tuple]]] = {s: {} for s in SIDES}
    removed: dict[str, str] = {}
    for s in SIDES:
        for op in ops[s]:
            if op["op"] == "remove_element":
                removed[op["id"]] = s
                continue
            fv = _field(op)
            assert fv, f"unbekannte Operation: {op}"
            field, value = fv
            last[s][(field, op["id"], op["name"])] = value
            edits[s].setdefault(op["id"], []).append((op["name"], value))

    elements = flatten(project)
    lost: list[str] = []
    both, broken, eor = [], [], {}
    for s in SIDES:
        for key, value in last[s].items():
            field, eid, name = key
            if eid in removed:
                continue  # Änderungen an entfernten Elementen: unten als edit_on_removed geprüft
            if key in last[other[s]]:
                if s == "a":
                    both.append(key)
                continue
            if field == "inputs" and _target(value) in removed and removed[_target(value)] != s:
                broken.append((eid, name, value))
            got = elements.get(eid, {}).get(field, {}).get(name)
            if got != value:
                lost.append(f"{s}: {field} {eid}.{name} = {value!r}, Endstand {got!r}")
        for eid, changes in edits[s].items():
            if removed.get(eid) == other[s]:
                eor[eid] = changes

    for key in both:
        field, eid, name = key
        got = elements.get(eid, {}).get(field, {}).get(name)
        if got not in (last["a"][key], last["b"][key]):
            lost.append(f"beide: {field} {eid}.{name} sichtbar {got!r}")
    for eid in removed:
        if eid in elements:
            lost.append(f"entfernt, aber noch vorhanden: {eid}")

    def has(kind: str, pred) -> bool:
        return any(f.get("kind") == kind and pred(f) for f in findings)

    reported = 0
    missing: list[str] = []
    for field, eid, name in both:
        want = {json.dumps(last["a"][(field, eid, name)]), json.dumps(last["b"][(field, eid, name)])}
        if has(
            "conflict",
            lambda f, eid=eid, name=name, field=field, want=want: (
                f.get("id") == eid
                and f.get("name") == name
                and f.get("field", field) == field
                and want <= {json.dumps(v) for v in f.get("values", [])}
            ),
        ):
            reported += 1
        else:
            missing.append(f"conflict {field} {eid}.{name}")
    for eid, name, ref in broken:
        if has(
            "broken_reference",
            lambda f, eid=eid, name=name, ref=ref: (
                f.get("id") == eid and f.get("input") == name and f.get("target") == ref
            ),
        ):
            reported += 1
        else:
            missing.append(f"broken_reference {eid}.{name} -> {ref}")
    for eid, changes in eor.items():
        if has(
            "edit_on_removed",
            lambda f, eid=eid, changes=changes: (
                f.get("id") == eid
                and all(
                    any(e.get("name") == n and e.get("value") == v for e in f.get("edits", []))
                    for n, v in changes
                )
            ),
        ):
            reported += 1
        else:
            missing.append(f"edit_on_removed {eid}: {changes}")
    return {
        "both": len(both),
        "broken": len(broken),
        "eor": len(eor),
        "lost": lost,
        "reported": reported,
        "missing": missing,
    }


_dump_ids = itertools.count()


def verify_dump(server: Server, dump: Path, doc: str, ops_per_side: int) -> tuple[dict, dict]:
    """Gedumpte Operationen lesen und je Seite zählen; Inhalts-Hash von A, B und Server gleich, Endstand
    der Clients gleich dem des Servers. Liefert (ops, Projekt des Servers)."""
    ops = {s: json.loads((dump / f"ops_{s}.json").read_text(encoding="utf-8")) for s in SIDES}
    for s in SIDES:
        assert len(ops[s]) == ops_per_side, f"Seite {s}: {len(ops[s])} statt {ops_per_side} Änderungen"
    project = server.get(f"/docs/{doc}/project")
    hashes = {
        "a": read_hash(dump / "hash_a"),
        "b": read_hash(dump / "hash_b"),
        "server": server.hash(doc),
    }
    assert len(set(hashes.values())) == 1, f"Inhalts-Hash ungleich: {hashes}"
    server_elements = flatten(project)
    for s in SIDES:
        client = flatten(json.loads((dump / f"project_{s}.json").read_text(encoding="utf-8")))
        assert client == server_elements, f"Endstand von {s} weicht vom Server ab"
    return ops, project


def new_dump(tmp_path: Path) -> Path:
    dump = tmp_path / f"dump-{next(_dump_ids)}"
    dump.mkdir()
    return dump


def run_dumped(server: Server, tmp_path: Path, scenario: str, doc: str, ops_per_side: int, *extra: str):
    """Szenario mit `--dump` ausführen und nachrechnen. Liefert (Ausgabe, ops, Projekt des Servers)."""
    dump = new_dump(tmp_path)
    out = server.run(scenario, doc, "--dump", str(dump), *extra)
    ops, project = verify_dump(server, dump, doc, ops_per_side)
    return out, ops, project


LIVE_OPS = 200  # je Richtung (design.md, Szenario live)


def assert_live(server: Server, out: dict, ops: dict, project: dict) -> None:
    """Live-Lauf: Latenz aus der Messung des Clients (gleiche Uhr für beide, design.md), Ankommen aber
    selbst nachgerechnet: jede der 2×200 Änderungen steht im Endstand des Servers, A, B und Server gleich."""
    lost = analyse(ops, project, [])["lost"]
    assert not lost, f"{len(lost)} Live-Änderungen nicht angekommen, z. B. {lost[:5]}"
    assert metric(out, "live_delivered_pct") == 100, out
    assert metric(out, "live_a_to_b_p95_ms") < 200, out
    assert metric(out, "live_b_to_a_p95_ms") < 200, out
