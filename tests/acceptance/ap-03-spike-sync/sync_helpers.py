"""Gemeinsame Hilfen für die Abnahmetests AP-03 (Sync-Spike).

Die Tests verlassen sich nicht auf Dateien, die der Change selbst schreibt: Sie bauen den Prototyp, starten
den Server mit `serve.sh`, führen die Szenarien mit dem Node-Client aus und rechnen Datenverlust und Konflikte
aus `--dump` und den HTTP-Antworten des Servers selbst nach (design.md, „Nachmessen statt Glauben“).
"""

from __future__ import annotations

import functools
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
