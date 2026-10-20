"""Abnahmetests AP-03 – Live-Abgleich und gleichzeitige Änderungen (AK-3, AK-4).

Requirements: „Live-Abgleich zwischen zwei Clients“, „Gleichzeitige Änderungen konvergieren“. Ob alles
angekommen und konvergiert ist, rechnet der Test aus `--dump` und dem Endstand des Servers selbst nach; nur
die Latenzen stammen aus der Messung des Clients (eine Uhr für beide Clients, design.md).
"""

from sync_helpers import (  # noqa: F401 (Fixture)
    LIVE_OPS,
    N_ELEMENTS,
    analyse,
    assert_live,
    flatten,
    metric,
    run_dumped,
    server_fixture,
)

CONCURRENT_ROUNDS = 50


def test_ak3_live_both_directions(server, tmp_path):
    """AK-3: 200 Änderungen A→B und 200 B→A im Abstand von 20 ms am Dokument mit 10.000 Elementen kommen
    alle an; p95 der Latenz je Richtung < 200 ms (30 ms Umlaufzeit je Strecke)."""
    out, ops, project = run_dumped(server, tmp_path, "live", "live-ak3", LIVE_OPS)
    assert_live(server, out, ops, project)
    elements = flatten(project)
    assert len(elements) == N_ELEMENTS, f"Dokument hat {len(elements)} statt {N_ELEMENTS} Elemente"


def test_ak4_concurrent_same_parameter_converges(server, tmp_path):
    """AK-4: 50 Runden, A und B setzen gleichzeitig denselben Parameter verschieden; in 50 von 50 Runden
    haben A, B und Server denselben Inhalts-Hash, p95 der Zeit bis dahin < 200 ms."""
    out, ops, project = run_dumped(server, tmp_path, "concurrent", "concurrent-ak4", CONCURRENT_ROUNDS)
    result = analyse(ops, project, [])
    assert result["both"] >= 1, "A und B haben nie denselben Parameter gesetzt"
    assert not result["lost"], f"Endstand passt nicht zu den Änderungen: {result['lost'][:5]}"
    assert metric(out, "concurrent_converged_pct") == 100, out
    assert metric(out, "concurrent_converge_p95_ms") < 200, out
