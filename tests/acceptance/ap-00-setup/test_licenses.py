"""Abnahmetests AP-00 – Lizenzen nach ADR-034 (AK-6)."""

import json
import re

from conftest import ROOT, need, sh

# Positivliste nach ADR-034 (freizügige Lizenzen). Unbekannte oder fehlende Lizenzen gelten als Verstoß.
PERMISSIVE = re.compile(
    r"\b(MIT|Apache|BSD|0BSD|ISC|MPL|Mozilla Public|Zlib|CC0|Unicode|PSF"
    r"|Python Software Foundation|BSL-1\.0|Boost)",
    re.I,
)
LGPL = re.compile(r"\bLGPL|Lesser General Public", re.I)


def _ok_single(lic: str, allow_lgpl: bool) -> bool:
    if LGPL.search(lic):
        return allow_lgpl
    if re.search(r"\bA?GPL|General Public License", lic, re.I):
        return False
    return bool(PERMISSIVE.search(lic))


def _ok(lic: str, allow_lgpl: bool = False) -> bool:
    """SPDX-Ausdrücke grob auswerten: bei OR genügt eine erlaubte Alternative, bei AND müssen alle passen."""
    lic = (lic or "").strip().strip("[]'\" ")
    if not lic or lic.upper() == "UNKNOWN":
        return False
    alternatives = re.split(r"\s+OR\s+|\s*;\s*", lic)
    return any(
        all(_ok_single(part, allow_lgpl) for part in re.split(r"\s+AND\s+", alt)) for alt in alternatives
    )


def test_ak6_own_components_licensed():
    """AK-6: Kern unter MPL-2.0, SDK und Format unter Apache-2.0."""
    assert "Mozilla Public License Version 2.0" in (ROOT / "LICENSE").read_text(encoding="utf-8")
    for part in ("sdk", "format"):
        assert "Apache License" in (ROOT / part / "LICENSE").read_text(encoding="utf-8")
    assert 'license = "MPL-2.0"' in (ROOT / "Cargo.toml").read_text(encoding="utf-8")
    assert json.loads((ROOT / "client" / "package.json").read_text(encoding="utf-8"))["license"] == "MPL-2.0"


def test_ak6_python_dependencies():
    """AK-6: Nur freizügige Lizenzen in Python; LGPL nur hier, weil sie im Worker-Prozess läuft."""
    res = sh(
        ["uv", "run", "--with", "pip-licenses", "pip-licenses", "--from=mixed", "--format=json"], timeout=300
    )
    assert res.returncode == 0, res.stderr[-1500:]
    pkgs = json.loads(res.stdout)
    offenders = [
        f"{p['Name']} ({p['License']})"
        for p in pkgs
        if p["Name"] != "pip-licenses" and not _ok(p.get("License", ""), allow_lgpl=True)
    ]
    assert not offenders, f"Unzulässige Lizenzen: {offenders}"


def test_ak6_rust_dependencies():
    """AK-6: cargo-deny findet keine unzulässige Lizenz (deny.toml)."""
    need("cargo-deny")
    res = sh(["cargo", "deny", "check", "licenses"])
    assert res.returncode == 0, res.stderr[-2000:]


def _lgpl_modules() -> set[str]:
    path = ROOT / "tools" / "lgpl_modules.txt"
    lines = path.read_text(encoding="utf-8").splitlines() if path.exists() else []
    return {ln.strip() for ln in lines if ln.strip() and not ln.startswith("#")}


def test_ak6_npm_dependencies():
    """AK-6: Nur freizügige Lizenzen im Client (ohne LGPL, weil der Client gebündelt wird)."""
    res = sh(["npx", "--yes", "license-checker", "--json", "--production"], cwd=ROOT / "client", timeout=300)
    assert res.returncode == 0, res.stderr[-1500:]
    pkgs = json.loads(res.stdout).items()
    assert pkgs, "license-checker fand keine Abhängigkeiten – fehlt npm install in client/?"
    offenders = [
        f"{k} ({v.get('licenses')})"
        for k, v in pkgs
        if not k.startswith("@cee/") and not _ok(str(v.get("licenses")))
    ]
    assert not offenders, f"Unzulässige Lizenzen: {offenders}"


def test_ak6_hex_dependencies():
    """AK-6: Nur freizügige Lizenzen im Server (Lizenzfelder aus deps/*/hex_metadata.config)."""
    res = sh(["mix", "deps.get"], cwd=ROOT / "server", timeout=300)
    assert res.returncode == 0, (res.stdout + res.stderr)[-1500:]
    offenders = []
    metas = list((ROOT / "server" / "deps").glob("*/hex_metadata.config"))
    assert metas, "Keine Hex-Abhängigkeiten gefunden – mix deps.get ohne Ergebnis?"
    for meta in metas:
        text = meta.read_text(encoding="utf-8", errors="replace")
        match = re.search(r'\{<<"licenses">>,\[(.*?)\]\}', text, re.S)
        lic = match.group(1) if match else ""
        if not _ok(lic.replace('<<"', "").replace('">>', "").replace(",", " OR ")):
            offenders.append(f"{meta.parent.name} ({lic or 'ohne Lizenzangabe'})")
    assert not offenders, f"Unzulässige oder fehlende Lizenzen: {offenders}"
