"""Abnahmetests AP-00 – Lizenzen nach ADR-034 (AK-6)."""

import json
import re

from conftest import ROOT, need, sh

FORBIDDEN = re.compile(r"\b(A?GPL)")
ALLOWED_EXCEPTIONS = ("LGPL",)  # LGPL nur dynamisch bzw. im Worker-Prozess (ADR-034)


def _bad(lic: str) -> bool:
    return bool(FORBIDDEN.search(lic)) and not any(e in lic for e in ALLOWED_EXCEPTIONS)


def test_ak6_own_components_licensed():
    """AK-6: Kern unter MPL-2.0, SDK und Format unter Apache-2.0."""
    assert "Mozilla Public License Version 2.0" in (ROOT / "LICENSE").read_text(encoding="utf-8")
    for part in ("sdk", "format"):
        assert "Apache License" in (ROOT / part / "LICENSE").read_text(encoding="utf-8")
    assert 'license = "MPL-2.0"' in (ROOT / "Cargo.toml").read_text(encoding="utf-8")
    assert json.loads((ROOT / "client" / "package.json").read_text(encoding="utf-8"))["license"] == "MPL-2.0"


def test_ak6_python_dependencies():
    """AK-6: Keine GPL/AGPL-Abhängigkeit in der Python-Umgebung."""
    res = sh(["uv", "run", "--with", "pip-licenses", "pip-licenses", "--format=json"], timeout=300)
    assert res.returncode == 0, res.stderr[-1500:]
    pkgs = json.loads(res.stdout)
    offenders = [f"{p['Name']} ({p['License']})" for p in pkgs if _bad(p.get("License", ""))]
    assert not offenders, f"Unzulässige Lizenzen: {offenders}"


def test_ak6_rust_dependencies():
    """AK-6: cargo-deny findet keine unzulässige Lizenz (deny.toml)."""
    need("cargo-deny")
    res = sh(["cargo", "deny", "check", "licenses"])
    assert res.returncode == 0, res.stderr[-2000:]


def test_ak6_npm_dependencies():
    """AK-6: Keine GPL/AGPL-Abhängigkeit im Client."""
    res = sh(["npx", "--yes", "license-checker", "--json", "--production"], cwd=ROOT / "client", timeout=300)
    assert res.returncode == 0, res.stderr[-1500:]
    pkgs = json.loads(res.stdout).items()
    offenders = [f"{k} ({v.get('licenses')})" for k, v in pkgs if _bad(str(v.get("licenses")))]
    assert not offenders, f"Unzulässige Lizenzen: {offenders}"


def test_ak6_hex_dependencies():
    """AK-6: Keine GPL/AGPL-Abhängigkeit im Server (Lizenzfelder aus deps/*/hex_metadata.config)."""
    res = sh(["mix", "deps.get"], cwd=ROOT / "server", timeout=300)
    assert res.returncode == 0, (res.stdout + res.stderr)[-1500:]
    offenders = []
    for meta in (ROOT / "server" / "deps").glob("*/hex_metadata.config"):
        text = meta.read_text(encoding="utf-8", errors="replace")
        match = re.search(r'\{<<"licenses">>,\[(.*?)\]\}', text, re.S)
        lic = match.group(1) if match else ""
        if not lic or _bad(lic):
            offenders.append(f"{meta.parent.name} ({lic or 'ohne Lizenzangabe'})")
    assert not offenders, f"Unzulässige oder fehlende Lizenzen: {offenders}"
