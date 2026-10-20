"""AK-3, AK-4: Tokens, Muster, Texte (Requirements „Nur Tokens und Muster“, „Keine festen Texte“)."""

from __future__ import annotations

import json
import re

from ux_helpers import P, npm, pruefen, quelltexte

LITERALE = [
    r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b",
    r"\brgba?\(", r"\bhsla?\(", r"\boklch\(", r"\b0x[0-9a-fA-F]{6}\b",
    r"font-family", r"font-size",
    r"\b(?:margin|padding|gap)[a-z-]*\s*:\s*-?(?:0*[1-9]\d*|0*\.\d*[1-9])",
]  # fmt: skip


def test_erzeugte_tokens_aktuell():
    """`npm run tokens:check` endet mit 0."""
    r = npm("run", "tokens:check")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]


def test_keine_literale_ausserhalb_erzeugt():
    """0 Farbliterale, font-family/-size, margin/padding/gap mit Zahl ≠ 0 (ohne src/erzeugt/)."""
    dateien = quelltexte()
    assert dateien, "src/ fehlt oder ist leer"
    funde = []
    for p in dateien:
        if p.suffix in (".png", ".woff", ".woff2", ".svg"):
            continue
        text = p.read_text("utf-8", errors="ignore")
        for muster in LITERALE:
            funde += [f"{p.relative_to(P)}: {m.group(0)}" for m in re.finditer(muster, text)]
    assert not funde, funde[:20]


def test_farben_aus_tokens_und_schrift():
    """0 Farbabweichungen, 0 unzulässiger Akzent; body-Schrift beginnt mit Inter."""
    b = pruefen("budget")
    assert len(b["zustaende"]) == 26
    for z in b["zustaende"]:
        assert z["farben_ausserhalb_tokens"] in (0, []), z["zustand"]
        assert z["akzent_unzulaessig"] in (0, []), z["zustand"]
        assert z["body_schrift"].strip("\"' ").startswith("Inter"), z["zustand"]


def test_keine_festen_texte_und_git_begriffe():
    """`texte`: 0 feste Texte, 0 Git-Begriffe (de, en), 0 Speichern-Knöpfe."""
    t = pruefen("texte")
    assert t["feste_texte"] == []
    assert t["git_begriffe"] == []
    assert t["speichern_knoepfe"] == 0


def test_uebersetzungen_vollstaendig():
    """de.json und en.json: gleiche Schlüssel, keine leeren Werte."""
    de = json.loads((P / "src" / "i18n" / "de.json").read_text("utf-8"))
    en = json.loads((P / "src" / "i18n" / "en.json").read_text("utf-8"))

    def flach(d, pre=""):
        for k, v in d.items():
            if isinstance(v, dict):
                yield from flach(v, f"{pre}{k}.")
            else:
                yield f"{pre}{k}", v

    a, b = dict(flach(de)), dict(flach(en))
    assert set(a) == set(b)
    assert all(str(v).strip() for v in [*a.values(), *b.values()])
