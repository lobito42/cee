"""Abnahmetests AP-03 – Bericht und Messwerte des Sync-Spikes (AK-1, AK-2).

Requirement: „Nachmessbare Messwerte und Bericht“.
"""

import json

from conftest import ROOT

REPORT = ROOT / "docs" / "spikes" / "sync.md"
RESULTS = ROOT / "docs" / "spikes" / "sync.json"
SECTIONS = ["## Fragestellung", "## Vorgehen", "## Messwerte", "## Empfehlung"]
THRESHOLDS = {  # Schlüssel: (Schwellwert, Vergleich) – aus design.md, „Kennzahlen und Schwellwerte“
    "live_a_to_b_p95_ms": (200, "<"),
    "live_b_to_a_p95_ms": (200, "<"),
    "live_delivered_pct": (100, ">="),
    "concurrent_converge_p95_ms": (200, "<"),
    "concurrent_converged_pct": (100, ">="),
    "offline_lost_edits": (0, "<="),
    "offline_conflicts_reported_pct": (100, ">="),
    "offline_hash_equal": (1, ">="),
    "both_offline_lost_edits": (0, "<="),
    "both_offline_conflicts_reported_pct": (100, ">="),
    "both_offline_hash_equal": (1, ">="),
}
OBSERVATIONS = [
    "live_p50_ms",
    "live_p95_loopback_ms",
    "initial_sync_10k_ms",
    "reconnect_converge_ms",
    "reconnect_bytes_kb",
]


def _ok(value, threshold, op) -> bool:
    return {"<": value < threshold, "<=": value <= threshold, ">=": value >= threshold}[op]


def test_ak1_report_complete():
    """AK-1: Bericht existiert, hat Fragestellung, Vorgehen, Messwerte und Empfehlung; die Empfehlung beginnt
    mit Go oder No-Go."""
    assert REPORT.exists(), f"Bericht fehlt: {REPORT.relative_to(ROOT)}"
    text = REPORT.read_text(encoding="utf-8")
    for section in SECTIONS:
        assert section in text, f"Abschnitt '{section}' fehlt"
    first = text.split("## Empfehlung", 1)[1].strip().splitlines()[0]
    assert first.startswith(("Go", "No-Go")), "Empfehlung muss mit Go oder No-Go beginnen"


def test_ak2_all_metrics_measured_and_consistent():
    """AK-2: Alle 11 Kennzahlen mit Wert, Einheit, Schwellwert und pass; pass passt zum Schwellwert; die
    Empfehlung ist genau dann Go, wenn alle pass wahr sind. Beobachtungen und Umgebung sind angegeben."""
    assert RESULTS.exists(), f"Messwerte fehlen: {RESULTS.relative_to(ROOT)}"
    data = json.loads(RESULTS.read_text(encoding="utf-8"))
    metrics = data.get("metrics", {})
    missing = sorted(set(THRESHOLDS) - set(metrics))
    assert not missing, f"Kennzahlen fehlen: {missing}"
    for key, (threshold, op) in THRESHOLDS.items():
        m = metrics[key]
        assert isinstance(m["value"], (int, float)) and m["unit"], f"{key}: value/unit fehlt"
        assert m["threshold"] == threshold, f"{key}: Schwellwert {m['threshold']} statt {threshold}"
        assert m["pass"] is _ok(m["value"], threshold, op), (
            f"{key}: pass={m['pass']} passt nicht zu {m['value']}"
        )
    observations = data.get("observations", {})
    for key in OBSERVATIONS:
        assert key in observations, f"Beobachtung {key} fehlt"
        assert isinstance(observations[key]["value"], (int, float)) and observations[key]["unit"], key
    assert data.get("environment"), "Angaben zur Umgebung fehlen"
    all_pass = all(metrics[k]["pass"] for k in THRESHOLDS)
    assert data.get("recommendation") in ("Go", "No-Go")
    assert (data["recommendation"] == "Go") == all_pass, "Go nur, wenn alle Kennzahlen bestanden sind"
    report = REPORT.read_text(encoding="utf-8").split("## Empfehlung", 1)[1].strip()
    assert report.startswith(data["recommendation"]), "Bericht und JSON empfehlen Unterschiedliches"
