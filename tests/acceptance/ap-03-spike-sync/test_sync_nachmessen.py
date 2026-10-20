"""Abnahmetests AP-03 – Messwerte nachmessen statt glauben, keine Modellinhalte im Protokoll (AK-8, AK-9).

Requirements: „Nachmessbare Messwerte und Bericht“, „Keine Modellinhalte in Server-Protokollen“.
"""

import json
import re

from conftest import sh
from sync_helpers import SPIKE, build, last_json
from test_sync_bericht import OBSERVATIONS, RESULTS, THRESHOLDS

COUNTS = (
    "live_delivered_pct",
    "concurrent_converged_pct",
    "offline_lost_edits",
    "offline_conflicts_reported_pct",
    "offline_hash_equal",
    "both_offline_lost_edits",
    "both_offline_conflicts_reported_pct",
    "both_offline_hash_equal",
)
TIMES = ("live_a_to_b_p95_ms", "live_b_to_a_p95_ms", "concurrent_converge_p95_ms")
BENCH_TIMEOUT = 1800  # drei Szenarien (offline in zwei Varianten) zu je höchstens 5 min, dazu Start


def _bench(*extra: str) -> dict:
    build()
    res = sh(["bash", str(SPIKE / "bench.sh"), "--json", *extra], timeout=BENCH_TIMEOUT)
    assert res.returncode == 0, (res.stdout + res.stderr)[-3000:]
    return last_json(res.stdout)


def test_ak8_server_log_contains_no_parameter_values(tmp_path):
    """AK-8: Das Server-Protokoll eines vollständigen `bench.sh --log` enthält keinen der gesetzten
    Parameterwerte (Offline-Szenarien: A 100.000 + k, B 200.000 + k)."""
    log = tmp_path / "server.log"
    _bench("--log", str(log))
    assert log.exists() and log.stat().st_size > 0, "Server-Protokoll leer oder nicht geschrieben"
    text = log.read_text(encoding="utf-8", errors="replace")
    numbers = {int(n) for n in re.findall(r"(?<![\d.])\d{6}(?!\d)", text)}
    hits = sorted(n for n in numbers if 100_000 <= n < 100_500 or 200_000 <= n < 200_500)
    assert not hits, f"Parameterwerte im Server-Protokoll: {hits[:10]}"


def test_ak9_bench_rerun_matches_reported_values():
    """AK-9: `bench.sh --json` selbst ausführen; Zählwerte exakt wie in sync.json, Zeitwerte höchstens um den
    Faktor 3 abweichend, alle Beobachtungen erneut gemessen."""
    assert RESULTS.exists(), "docs/spikes/sync.json fehlt"
    reported = json.loads(RESULTS.read_text(encoding="utf-8"))
    measured = _bench()
    assert set(THRESHOLDS) <= set(measured.get("metrics", {})), "bench.sh liefert nicht alle Kennzahlen"
    for key in COUNTS:
        got, want = measured["metrics"][key]["value"], reported["metrics"][key]["value"]
        assert got == want, f"{key}: gemessen {got}, gemeldet {want}"
    for key in TIMES:
        got, want = measured["metrics"][key]["value"], reported["metrics"][key]["value"]
        assert want / 3 <= got <= want * 3, f"{key}: gemessen {got}, gemeldet {want}"
    for key in OBSERVATIONS:
        assert key in measured.get("observations", {}), f"Beobachtung {key} wird nicht nachgemessen"
