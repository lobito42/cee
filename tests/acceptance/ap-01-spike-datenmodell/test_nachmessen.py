"""Abnahmetests AP-01 – Messwerte nachmessen statt glauben (AK-7, AK-8)."""

import json

from conftest import ROOT, sh
from test_report import RESULTS
from test_textprojektion import EXAMPLE, cli

SPIKE = ROOT / "spikes" / "datenmodell"
COUNTS = (
    "schema_special_cases",
    "conflicts_detected_pct",
    "overrides_kept_pct",
    "hash_equal_native_nif_wasm",
)


def _ops(tmp_path, name: str, last_value: int) -> str:
    elements = json.loads(EXAMPLE.read_text(encoding="utf-8"))["elements"][:5]
    ops = [
        {"op": "set_param", "id": e["id"], "name": "pruefwert", "value": i} for i, e in enumerate(elements)
    ]
    ops[-1]["value"] = last_value
    path = tmp_path / f"{name}.json"
    path.write_text(json.dumps(ops), encoding="utf-8")
    return str(path)


def _hashes(ops: str) -> dict[str, str]:
    native = json.loads(cli("hash", str(EXAMPLE), ops))["hash"]
    res = sh(["mix", "run", "--no-start", "hash.exs", str(EXAMPLE), ops], cwd=SPIKE / "nif", timeout=900)
    assert res.returncode == 0, (res.stdout + res.stderr)[-2000:]
    nif = json.loads(res.stdout.strip().splitlines()[-1])["hash"]
    res = sh(["node", str(SPIKE / "wasm" / "hash.mjs"), str(EXAMPLE), ops], timeout=300)
    assert res.returncode == 0, res.stderr[-2000:]
    wasm = json.loads(res.stdout.strip().splitlines()[-1])["hash"]
    return {"native": native, "nif": nif, "wasm": wasm}


def test_ak7_same_hash_in_all_runtimes(tmp_path):
    """AK-7: Gleiche Operationsfolge → gleicher Hash nativ, NIF und WASM; andere Folge → anderer Hash."""
    res = sh(["bash", str(SPIKE / "build.sh")], timeout=1800)
    assert res.returncode == 0, (res.stdout + res.stderr)[-2000:]
    a = _hashes(_ops(tmp_path, "a", 4))
    b = _hashes(_ops(tmp_path, "b", 99))
    empty = tmp_path / "leer.json"
    empty.write_text("[]", encoding="utf-8")
    base = json.loads(cli("hash", str(EXAMPLE), str(empty)))["hash"]
    assert len(set(a.values())) == 1, f"Hashes unterscheiden sich: {a}"
    assert a["native"] != b["native"], "Hash hängt nicht von den Operationen ab"
    assert a["native"] != base, "Operationen ändern den Hash nicht"


def test_ak8_bench_rerun_matches_reported_values():
    """AK-8: bench --json selbst ausführen; Zählwerte exakt, Größe auf 10 %, Zeiten höchstens Faktor 3."""
    reported = json.loads(RESULTS.read_text(encoding="utf-8"))["metrics"]
    measured = json.loads(cli("bench", "--json"))["metrics"]
    for key, rep in reported.items():
        got, want = measured[key]["value"], rep["value"]
        if key in COUNTS:
            assert got == want, f"{key}: gemessen {got}, gemeldet {want}"
        elif key == "size_100k_mb":
            assert abs(got - want) <= 0.1 * want, f"{key}: gemessen {got}, gemeldet {want}"
        else:
            assert want / 3 <= got <= want * 3 or abs(got - want) < 0.5, (
                f"{key}: gemessen {got}, gemeldet {want}"
            )
