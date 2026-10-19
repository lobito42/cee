"""Abnahmetests AP-03 – Live-Abgleich und gleichzeitige Änderungen (AK-3, AK-4).

Requirements: „Live-Abgleich zwischen zwei Clients“, „Gleichzeitige Änderungen konvergieren“.
"""

from sync_helpers import N_ELEMENTS, flatten, metric, server_fixture  # noqa: F401 (Fixture)


def test_ak3_live_both_directions(server):
    """AK-3: 200 Änderungen A→B und 200 B→A im Abstand von 20 ms am Dokument mit 10.000 Elementen kommen
    alle an; p95 der Latenz je Richtung < 200 ms (30 ms Umlaufzeit je Strecke)."""
    out = server.run("live", "live-ak3")
    assert metric(out, "live_delivered_pct") == 100, "nicht alle 400 Live-Änderungen angekommen"
    assert metric(out, "live_a_to_b_p95_ms") < 200, out
    assert metric(out, "live_b_to_a_p95_ms") < 200, out
    elements = flatten(server.get("/docs/live-ak3/project"))
    assert len(elements) == N_ELEMENTS, f"Dokument hat {len(elements)} statt {N_ELEMENTS} Elemente"


def test_ak4_concurrent_same_parameter_converges(server):
    """AK-4: 50 Runden, A und B setzen gleichzeitig denselben Parameter verschieden; in 50 von 50 Runden
    haben A, B und Server denselben Inhalts-Hash, p95 der Zeit bis dahin < 200 ms."""
    out = server.run("concurrent", "concurrent-ak4")
    assert metric(out, "concurrent_converged_pct") == 100, out
    assert metric(out, "concurrent_converge_p95_ms") < 200, out
