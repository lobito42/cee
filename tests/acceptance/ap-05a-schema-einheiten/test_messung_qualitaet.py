"""AK-9 und AK-10: Leistung (selbst nachgemessen) und Codequalität (Capability `graph-kern`)."""

from __future__ import annotations

import re
import statistics

from conftest import ROOT, sh
from graphctl_helpers import ctl_json

BUDGETS = {
    "load_100k_ms": 2000,
    "validate_100k_ms": 1000,
    "op_p95_ms": 5,
    "parse_p95_us": 50,
    "import_10k_ms": 2000,
}
ONLY_REPORTED = ("import_100k_ms", "size_100k_mb")


def _median_of_three() -> dict:
    runs = [ctl_json("bench", "--json", timeout=3600) for _ in range(3)]
    return {k: statistics.median(r[k] for r in runs) for k in runs[0]}


def test_alle_budgets_eingehalten():
    """Requirement Leistung: Median aus 3 Läufen je Kennzahl ≤ Schwelle, ohne Toleranz."""
    m = _median_of_three()
    for key, limit in BUDGETS.items():
        assert key in m, f"Kennzahl {key} fehlt"
        assert m[key] <= limit, f"{key} = {m[key]} > {limit}"
    for key in ONLY_REPORTED:
        assert isinstance(m.get(key), (int, float)) and m[key] > 0, f"{key} nicht angegeben"


def test_pruefungen_gruen():
    """Requirement Codequalität: fmt, clippy, Tests grün."""
    assert sh(["cargo", "fmt", "--check", "-p", "cee-graph"]).returncode == 0
    assert (
        sh(
            ["cargo", "clippy", "-p", "cee-graph", "--all-targets", "--", "-D", "warnings"], timeout=1800
        ).returncode
        == 0
    )
    res = sh(["cargo", "test", "-q", "-p", "cee-graph"], timeout=1800)
    assert res.returncode == 0, res.stdout[-1500:] + res.stderr[-1500:]
    passed = sum(int(n) for n in re.findall(r"(\d+) passed", res.stdout))
    assert passed >= 20, f"nur {passed} Rust-Tests im Kern"


def test_keine_abbrueche_ausserhalb_von_tests():
    """Requirement Codequalität: kein unwrap(/expect(/panic!/unsafe außerhalb von #[cfg(test)]."""
    src = ROOT / "crates" / "graph" / "src"
    files = sorted(src.rglob("*.rs"))
    assert len(files) >= 6, "erwartet lib, units, types, schema, doc, validate, synth"
    pattern = re.compile(r"\.unwrap\(|\.expect\(|panic!|\bunsafe\b")
    hits = []
    for f in files:
        text = f.read_text(encoding="utf-8")
        text = text.split("#[cfg(test)]")[0]
        text = re.sub(r"//[^\n]*", "", text)
        hits += [f"{f.name}: {m.group(0)}" for m in pattern.finditer(text)]
    assert not hits, hits
