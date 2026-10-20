"""Abnahmetests AP-03 – Ein Prozess je Dokument mit Fehlerisolation (AK-6, AK-7).

Requirement: „Ein Prozess je Dokument mit Fehlerisolation“ (ADR-029, ADR-030).
"""

from __future__ import annotations

import subprocess
import time

from conftest import ROOT, need
from sync_helpers import (  # noqa: F401 (Fixture)
    LIVE_OPS,
    SCENARIO_TIMEOUT,
    assert_live,
    last_json,
    new_dump,
    run_dumped,
    server_fixture,
    verify_dump,
)


def _live_ok(server, tmp_path, doc: str) -> None:
    assert_live(server, *run_dumped(server, tmp_path, "live", doc, LIVE_OPS))


def _server_error(out: dict) -> bool:
    """Die Fehlerantwort muss vom Server stammen: der Client gibt sie unter `reply` weiter (design.md)."""
    reply = out.get("reply")
    return isinstance(reply, dict) and (reply.get("status") == "error" or bool(reply.get("error")))


def _three_clients_two_docs(server, tmp_path) -> dict[str, dict]:
    """Zwei Clients (Szenario live) am ersten Dokument, während ein dritter dem zweiten beitritt."""
    need("node")
    dump = new_dump(tmp_path)
    stdout_path, stderr_path = tmp_path / "live.out", tmp_path / "live.err"
    with stdout_path.open("w") as out_f, stderr_path.open("w") as err_f:
        proc = subprocess.Popen(
            server.client_args("live", "doc-eins", "--dump", str(dump)),
            cwd=ROOT,
            stdout=out_f,
            stderr=err_f,
            text=True,
        )
    seen_two = False
    try:
        deadline = time.monotonic() + SCENARIO_TIMEOUT
        while proc.poll() is None and time.monotonic() < deadline:
            docs = server.docs()
            seen_two |= docs.get("doc-eins", {}).get("clients") == 2
            if seen_two:
                break
            time.sleep(0.2)
        out = server.run("poison", "doc-zwei")  # dritter Client, eigenes Dokument
        assert _server_error(out), f"poison: keine Fehlerantwort des Servers: {out}"
        proc.wait(timeout=SCENARIO_TIMEOUT)
    finally:
        if proc.poll() is None:
            proc.kill()
    stdout = stdout_path.read_text(encoding="utf-8")
    assert proc.returncode == 0, (stdout + stderr_path.read_text(encoding="utf-8"))[-3000:]
    ops, project = verify_dump(server, dump, "doc-eins", LIVE_OPS)
    assert_live(server, last_json(stdout), ops, project)
    assert seen_two, "GET /docs zeigte nie zwei Clients am ersten Dokument"
    return server.docs()


def test_ak6_one_process_per_document(server, tmp_path):
    """AK-6: Drei Clients, zwei Dokumente (zwei am ersten, einer am zweiten) → genau zwei Dokumentprozesse mit
    verschiedenen Prozess-IDs."""
    docs = _three_clients_two_docs(server, tmp_path)
    assert sorted(docs) == ["doc-eins", "doc-zwei"], f"Dokumentprozesse: {docs}"
    assert docs["doc-eins"]["pid"] != docs["doc-zwei"]["pid"], docs


def test_ak6_kill_affects_only_one_document(server, tmp_path):
    """AK-6: Der Prozess des ersten Dokuments wird hart beendet → beim zweiten kommen danach 20 von 20
    Live-Änderungen mit p95 < 200 ms an, und dessen Prozess-ID ist unverändert."""
    before = _three_clients_two_docs(server, tmp_path)
    server.get_text("/docs/doc-eins/kill", method="POST")
    time.sleep(1)
    assert server.get_text("/health").strip() == "ok", "Server nach kill nicht mehr gesund"
    after = server.docs()
    assert after.get("doc-eins", {}).get("pid") != before["doc-eins"]["pid"], (
        "Prozess des ersten Dokuments lebt"
    )
    assert after["doc-zwei"]["pid"] == before["doc-zwei"]["pid"], "Prozess des zweiten Dokuments geändert"
    _live_ok(server, tmp_path, "doc-zwei")  # 2×200 Live-Änderungen ⊇ 20 von 20
    assert server.docs()["doc-zwei"]["pid"] == before["doc-zwei"]["pid"]


def test_ak7_invalid_sync_message(server, tmp_path):
    """AK-7: Ungültige Sync-Nachricht → Fehlerantwort des Servers, Inhalt und Prozess-ID des Dokuments
    unverändert, und 20 von 20 folgenden Live-Änderungen zwischen zwei anderen Clients kommen an."""
    _live_ok(server, tmp_path, "doc-gift")
    pid = server.docs()["doc-gift"]["pid"]
    hash_before = server.hash("doc-gift")
    out = server.run("poison", "doc-gift")
    assert _server_error(out), f"poison: keine Fehlerantwort des Servers: {out}"
    assert server.hash("doc-gift") == hash_before, "ungültige Nachricht hat den Inhalt verändert"
    assert server.docs()["doc-gift"]["pid"] == pid, "Prozess-ID nach ungültiger Nachricht geändert"
    _live_ok(server, tmp_path, "doc-gift")
    assert server.docs()["doc-gift"]["pid"] == pid
