"""Abnahmetests AP-01 – Textprojektion (AK-4, AK-5)."""

import difflib
import json

from conftest import ROOT, sh

EXAMPLE = ROOT / "format" / "examples" / "halter.json"
MANIFEST = ROOT / "spikes" / "datenmodell" / "Cargo.toml"


def cli(*args: str, stdin: str | None = None) -> str:
    cmd = ["cargo", "run", "-q", "--release", "--manifest-path", str(MANIFEST), "--", *args]
    res = sh(cmd, stdin=stdin, timeout=900)
    assert res.returncode == 0, res.stderr[-2000:]
    return res.stdout


def canonical(obj) -> str:
    return json.dumps(obj, sort_keys=True, indent=2, ensure_ascii=False)


def test_ak4_roundtrip_is_lossless_and_deterministic(tmp_path):
    """AK-4: JSON → Text → JSON ist verlustfrei; zweimal projizieren ergibt bitgleichen Text."""
    text1 = cli("to-text", str(EXAMPLE))
    text2 = cli("to-text", str(EXAMPLE))
    assert text1 == text2, "Textprojektion ist nicht deterministisch"
    path = tmp_path / "halter.txt"
    path.write_text(text1, encoding="utf-8")
    back = json.loads(cli("from-text", str(path)))
    assert canonical(back) == canonical(json.loads(EXAMPLE.read_text(encoding="utf-8")))


def test_ak5_one_parameter_change_is_one_line(tmp_path):
    """AK-5: Eine geänderte Zahl in einem Parameter ändert genau eine Zeile der Textprojektion."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))

    def first_numeric(elements):
        for e in elements:
            for key, value in e["params"].items():
                if isinstance(value, (int, float)) and not isinstance(value, bool):
                    return e, key
            found = first_numeric(e.get("content") or [])
            if found:
                return found
        return None

    element, key = first_numeric(project["elements"])
    before = cli("to-text", str(EXAMPLE))
    element["params"][key] = element["params"][key] + 1
    changed = tmp_path / "changed.json"
    changed.write_text(json.dumps(project), encoding="utf-8")
    after = cli("to-text", str(changed))
    diff = [
        line
        for line in difflib.unified_diff(before.splitlines(), after.splitlines(), lineterm="", n=0)
        if line[:1] in "+-" and not line.startswith(("+++", "---"))
    ]
    assert len(diff) == 2, "Erwartet eine geänderte Zeile, Diff:\n" + "\n".join(diff[:10])
