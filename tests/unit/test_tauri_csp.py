"""Die Desktop-App hat eine restriktive Content-Security-Policy (#4, ADR-045)."""

import json
from pathlib import Path

import pytest

CONF = Path(__file__).resolve().parents[2] / "client" / "src-tauri" / "tauri.conf.json"

pytestmark = pytest.mark.skipif(not CONF.exists(), reason="Tauri-Hülle noch nicht angelegt")


def _csp(key: str) -> dict[str, str]:
    csp = json.loads(CONF.read_text(encoding="utf-8"))["app"]["security"].get(key)
    assert isinstance(csp, dict), f"{key} fehlt oder ist kein Objekt"
    return csp


@pytest.mark.parametrize("key", ["csp", "devCsp"])
def test_csp_restriktiv(key: str) -> None:
    csp = _csp(key)
    assert csp.get("default-src") == "'self'"
    assert csp.get("object-src") == "'none'"
    assert "'unsafe-eval'" not in " ".join(csp.values())
    assert "*" not in " ".join(csp.values()).split()


def test_produktion_ohne_inline() -> None:
    """Inline-Skripte und -Stile nur im Entwicklungsmodus (Vite)."""
    assert "'unsafe-inline'" not in " ".join(_csp("csp").values())
