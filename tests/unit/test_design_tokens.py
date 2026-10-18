"""Unit-Tests für die Design-Tokens (ADR-061): Format, Vollständigkeit beider Modi, Kontraste."""

from __future__ import annotations

import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOKENS = json.loads((ROOT / "docs" / "design" / "tokens.json").read_text(encoding="utf-8"))
HEX = re.compile(r"^#[0-9A-F]{6}$")


def _lum(hx: str) -> float:
    c = [int(hx[i : i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def contrast(a: str, b: str) -> float:
    hi, lo = sorted((_lum(a), _lum(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)


def _oklch_to_hex(lch: list[float]) -> str:
    lightness, chroma, hue = lch
    a, b = chroma * math.cos(math.radians(hue)), chroma * math.sin(math.radians(hue))
    l_ = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (lightness - 0.0894841775 * a - 1.2914855480 * b) ** 3
    rgb = (
        4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
        -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
        -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_,
    )

    def enc(x: float) -> int:
        x = max(0.0, min(1.0, x))
        return round(255 * (12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055))

    return "#" + "".join(f"{enc(x):02X}" for x in rgb)


def test_both_modes_have_same_roles():
    farbe = TOKENS["farbe"]
    assert set(farbe["hell"]) == set(farbe["dunkel"])


def test_colors_are_hex_and_match_oklch():
    for mode in ("hell", "dunkel"):
        for name, tok in TOKENS["farbe"][mode].items():
            assert tok["$type"] == "color" and HEX.match(tok["$value"]), f"{mode}.{name}"
            assert _oklch_to_hex(tok["$extensions"]["cee.oklch"]) == tok["$value"], (
                f"{mode}.{name}: OKLCH ≠ Hex"
            )


def test_text_contrast_at_least_aa():
    """Fließtext, Nebentext, Akzent, Fehler, Warntext und Text auf Akzent ≥ 4,5 : 1 in beiden Modi."""
    for mode in ("hell", "dunkel"):
        c = {k: v["$value"] for k, v in TOKENS["farbe"][mode].items()}
        for role in ("text", "text-2", "akzent", "fehler", "warnung-text", "erfolg"):
            for bg in ("flaeche", "grund"):
                assert contrast(c[role], c[bg]) >= 4.5, f"{mode}: {role} auf {bg}"
        assert contrast(c["auf-akzent"], c["akzent"]) >= 4.5, f"{mode}: Text auf Akzent"


def test_font_and_sizes():
    schrift = TOKENS["schrift"]
    assert schrift["familie"]["ui"]["$value"][0] == "Inter"
    assert "tnum" in schrift["merkmale"]["$value"] and "cv05" in schrift["merkmale"]["$value"]
    sizes = sorted(v["$value"]["value"] for v in schrift["groesse"].values())
    assert sizes == [12, 13, 14, 16, 20, 24]
    assert {v["$value"] for v in schrift["schnitt"].values()} == {400, 500, 600}
