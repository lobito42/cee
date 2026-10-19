"""Abnahmetests AP-03 – Ein Prozess je Dokument mit Fehlerisolation (AK-6, AK-7).

Requirement: „Ein Prozess je Dokument mit Fehlerisolation“ (ADR-029, ADR-030).
"""

from __future__ import annotations

import subprocess
import time

from conftest import ROOT, need
from sync_helpers import SCENARIO_TIMEOUT, last_json, metric, server_fixture  # noqa: F401 (Fixture)


def _assert_live_ok(out: dict) -> None:
    assert metric(out, "live_delivered_pct") == 100, out
    assert metric(out, "live_a_to_b_p95_ms") < 200, out
    assert metric(out, "live_b_to_a_p95_ms") < 200, out


def _is_error(out: dict) -> bool:
    reply = out.get("reply") if isinstance(out.get("reply"), dict) else {}
    return out.get("status") == "error" or reply.get("status") == "error" or bool(out.get("error"))


def _three_clients_two_docs(server) -> dict[str, dict]:
    """Zwei Clients (Szenario live) am ersten Dokument, während ein dritter dem zweiten beitritt."""
    need("node")
    proc = subprocess.Popen(
        server.client_args("live", "doc-eins"),
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
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
        assert _is_error(out), f"poison: keine Fehlerantwort: {out}"
        stdout, stderr = proc.communicate(timeout=SCENARIO_TIMEOUT)
    finally:
        if proc.poll() is None:
            proc.kill()
    assert proc.returncode == 0, (stdout + stderr)[-3000:]
    _assert_live_ok(last_json(stdout))
    assert seen_two, "GET /docs zeigte nie zwei Clients am ersten Dokument"
    return server.docs()


def test_ak6_one_process_per_document(server):
    """AK-6: Drei Clients, zwei Dokumente (zwei am ersten, einer am zweiten) → genau zwei Dokumentprozesse mit
    verschiedenen Prozess-IDs."""
    docs = _three_clients_two_docs(server)
    assert sorted(docs) == ["doc-eins", "doc-zwei"], f"Dokumentprozesse: {docs}"
    assert docs["doc-eins"]["pid"] != docs["doc-zwei"]["pid"], docs


def test_ak6_kill_affects_only_one_document(server):
    """AK-6: Der Prozess des ersten Dokuments wird hart beendet → beim zweiten kommen danach 20 von 20
    Live-Änderungen mit p95 < 200 ms an, und dessen Prozess-ID ist unverändert."""
    before = _three_clients_two_docs(server)
    server.get_text("/docs/doc-eins/kill", method="POST")
    time.sleep(1)
    assert server.get_text("/health").strip() == "ok", "Server nach kill nicht mehr gesund"
    after = server.docs()
    assert after.get("doc-eins", {}).get("pid") != before["doc-eins"]["pid"], (
        "Prozess des ersten Dokuments lebt"
    )
    assert after["doc-zwei"]["pid"] == before["doc-zwei"]["pid"], "Prozess des zweiten Dokuments geändert"
    _assert_live_ok(server.run("live", "doc-zwei"))  # 2×200 Live-Änderungen ⊇ 20 von 20
    assert server.docs()["doc-zwei"]["pid"] == before["doc-zwei"]["pid"]


def test_ak7_invalid_sync_message(server):
    """AK-7: Ungültige Sync-Nachricht → Fehlerantwort, Prozess-ID des Dokuments unverändert, und 20 von 20
    folgenden Live-Änderungen zwischen zwei anderen Clients kommen an."""
    _assert_live_ok(server.run("live", "doc-gift"))
    pid = server.docs()["doc-gift"]["pid"]
    out = server.run("poison", "doc-gift")
    assert _is_error(out), f"poison: keine Fehlerantwort: {out}"
    assert server.docs()["doc-gift"]["pid"] == pid, "Prozess-ID nach ungültiger Nachricht geändert"
    _assert_live_ok(server.run("live", "doc-gift"))
    assert server.docs()["doc-gift"]["pid"] == pid
