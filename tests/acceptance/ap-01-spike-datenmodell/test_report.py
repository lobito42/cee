"""Abnahmetests AP-01 – Bericht und Messwerte des Datenmodell-Spikes (AK-1, AK-2)."""

import json

from conftest import ROOT

REPORT = ROOT / "docs" / "spikes" / "datenmodell.md"
RESULTS = ROOT / "docs" / "spikes" / "datenmodell.json"
SECTIONS = ["## Fragestellung", "## Vorgehen", "## Messwerte", "## Textformat", "## Empfehlung"]
THRESHOLDS = {  # Schlüssel: (Schwellwert, Vergleich) – aus design.md
    "schema_special_cases": (0, "<="),
    "load_10k_ms": (200, "<="),
    "load_100k_ms": (2000, "<="),
    "size_100k_mb": (50, "<="),
    "op_p95_ms": (5, "<="),
    "merge_2x500_ms": (500, "<="),
    "conflicts_detected_pct": (100, ">="),
    "nif_op_p95_ms": (1, "<="),
    "wasm_op_p95_ms": (5, "<="),
    "hash_equal_native_nif_wasm": (1, ">="),
    "component_propagate_1000_ms": (50, "<="),
    "overrides_kept_pct": (100, ">="),
}


def test_ak1_report_complete():
    """AK-1: Bericht existiert, hat alle Abschnitte und beginnt die Empfehlung mit Go oder No-Go."""
    assert REPORT.exists(), f"Bericht fehlt: {REPORT.relative_to(ROOT)}"
    text = REPORT.read_text(encoding="utf-8")
    for section in SECTIONS:
        assert section in text, f"Abschnitt '{section}' fehlt"
    first = text.split("## Empfehlung", 1)[1].strip().splitlines()[0]
    assert first.startswith(("Go", "No-Go")), "Empfehlung muss mit Go oder No-Go beginnen"


def test_ak2_all_metrics_measured_and_consistent():
    """AK-2: Alle Kennzahlen gemessen, pass passt zum Schwellwert, Empfehlung passt zu den Kennzahlen."""
    assert RESULTS.exists(), f"Messwerte fehlen: {RESULTS.relative_to(ROOT)}"
    data = json.loads(RESULTS.read_text(encoding="utf-8"))
    metrics = data.get("metrics", {})
    missing = sorted(set(THRESHOLDS) - set(metrics))
    assert not missing, f"Kennzahlen fehlen: {missing}"
    for key, (threshold, op) in THRESHOLDS.items():
        m = metrics[key]
        assert isinstance(m["value"], (int, float)) and m["unit"], f"{key}: value/unit fehlt"
        assert m["threshold"] == threshold, f"{key}: Schwellwert {m['threshold']} statt {threshold}"
        ok = m["value"] <= threshold if op == "<=" else m["value"] >= threshold
        assert m["pass"] is ok, f"{key}: pass={m['pass']} passt nicht zu value={m['value']}"
    all_pass = all(metrics[k]["pass"] for k in THRESHOLDS)
    assert data.get("recommendation") in ("Go", "No-Go")
    assert (data["recommendation"] == "Go") == all_pass, "Go nur, wenn alle Kennzahlen bestanden sind"
    report = REPORT.read_text(encoding="utf-8").split("## Empfehlung", 1)[1].strip()
    assert report.startswith(data["recommendation"]), "Bericht und JSON empfehlen Unterschiedliches"
