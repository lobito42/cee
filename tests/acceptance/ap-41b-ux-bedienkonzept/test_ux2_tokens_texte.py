"""AK-3: Tokens, Muster, Texte (Requirement „Tokens, Muster und Texte“).

Farben, Texte und Git-Wörter prüft der Test selbst aus den Rohdaten des Prüfwerkzeugs.
"""

from __future__ import annotations

import re

from ux2_helpers import (
    THEMEN,
    ZUSTAENDE,
    P,
    akzent_farben,
    flach,
    i18n,
    knoten,
    npm,
    pruefen,
    quelltexte,
    register,
    token_farben,
)

LITERALE = [
    r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b",
    r"\brgba?\(", r"\bhsla?\(", r"\boklch\(", r"\b0x[0-9a-fA-F]{6}\b",
    r"font-family", r"font-size",
]  # fmt: skip
ABSTAND = re.compile(r"\b(?:margin|padding|gap)[a-z-]*\s*:\s*([^;}\n]*)")
ZAHL_NICHT_NULL = re.compile(r"(?<![\w.-])-?(?:\d*[1-9]\d*(?:\.\d+)?|0*\.\d*[1-9]\d*)")
GIT = re.compile(
    r"\b(?:Commit|Branch|Merge|Rebase|Pull\s+Request|Checkout|Push|Pull|Fork|Repository)\b", re.I
)
SPEICHERN = re.compile(r"\b(?:Speichern|Save)\b", re.I)
TASTEN = r"(?:(?:Strg|Ctrl|Cmd|⌘|Umschalt|Shift|⇧|Alt|⌥)\s*\+?\s*)*(?:[A-Za-z0-9]|Esc|Enter|Entf)"
AKZENT_ROLLEN = {"auswahl", "fokus", "hauptaktion", "ki"}


def test_erzeugte_tokens_aktuell():
    """`npm run tokens:check` endet mit 0 (0 Unterschiede)."""
    r = npm("run", "tokens:check")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]


def test_erzeugtes_css_enthaelt_alle_token_farben():
    """Unabhängig vom Prüfwerkzeug: jede Farbe aus tokens.json (beide Themen) steht in `src/erzeugt/*.css`."""
    css = "\n".join(
        p.read_text("utf-8", errors="ignore") for p in (P / "src" / "erzeugt").glob("*.css")
    ).upper()
    assert css.strip(), "src/erzeugt/ enthält kein CSS"
    fehlt = [(t, f) for t in THEMEN for f in sorted(token_farben(t)) if f not in css]
    assert not fehlt, fehlt


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
        for m in ABSTAND.finditer(text):
            wert = re.sub(r"var\([^)]*\)", "", m.group(1))
            if ZAHL_NICHT_NULL.search(wert):
                funde.append(f"{p.relative_to(P)}: {m.group(0).strip()}")
    assert not funde, funde[:20]


def test_farben_aus_tokens_und_schrift():
    """Jede sichtbare Farbe (außer Leinwand) ist ein Token-Wert des Themas oder transparent; body-Schrift Inter."""
    b = pruefen("budget")
    assert len(b["zustaende"]) == 34
    for z in b["zustaende"]:
        name = (z["zustand"], z["thema"])
        erlaubt = token_farben(z["thema"])
        akzent = akzent_farben(z["thema"])
        assert z["farben"], f"{name}: keine Farben gemeldet"
        for f in z["farben"]:
            if f.get("alpha", 1) == 0:
                continue
            wert = f["wert"].upper()
            assert wert in erlaubt, (name, f)
            if wert in akzent:
                assert f.get("akzent_rolle") in AKZENT_ROLLEN, (name, f)
        assert z["body_schrift"].strip("\"' ").startswith("Inter"), name


def _texte(sprache: str) -> list[dict]:
    t = pruefen("texte")["zustaende"]
    ergebnis = [e for e in t if e["sprache"] == sprache]
    assert {e["zustand"] for e in ergebnis} == set(ZUSTAENDE), sprache
    for e in ergebnis:
        assert e["sichtbarer_text"], f"{e['zustand']}/{sprache}: kein sichtbarer Text"
    return ergebnis


def _datenwert(text: str, modell, kuerzel: set[str]) -> bool:
    if re.fullmatch(r"[-+]?\d+(?:[.,]\d+)?\s*(?:mm|cm|m|kg|g|N|kN|cm³|mm³|°|%)?", text):
        return True
    if text in kuerzel or re.fullmatch(TASTEN, text):
        return True
    strings = {v for k in knoten(modell) for v in k.values() if isinstance(v, str)}
    return text in strings


def test_keine_festen_texte():
    """`sprache=schluessel`: jeder sichtbare Text ist ein Übersetzungsschlüssel oder ein Datenwert."""
    schluessel = {k for k, _ in flach(i18n("de"))}
    kuerzel = {str(b["kuerzel"]) for b in register() if b.get("kuerzel")}
    feste = [
        (e["zustand"], t)
        for e in _texte("schluessel")
        for t in e["sichtbarer_text"]
        if t.strip() and t.strip() not in schluessel and not _datenwert(t.strip(), e["modell"], kuerzel)
    ]
    assert feste == [], feste[:20]


def test_keine_git_begriffe():
    """Sichtbarer Text in de und en enthält kein Git-Wort (ganze Wörter, ohne Groß-/Kleinschreibung)."""
    funde = [
        (e["zustand"], e["sprache"], t)
        for sprache in ("de", "en")
        for e in _texte(sprache)
        for t in e["sichtbarer_text"]
        if GIT.search(t)
    ]
    assert funde == [], funde[:20]


def test_kein_speichern_knopf():
    """Kein sichtbarer Text „Speichern“ bzw. „Save“ in de und en."""
    funde = [
        (e["zustand"], e["sprache"], t)
        for sprache in ("de", "en")
        for e in _texte(sprache)
        for t in e["sichtbarer_text"]
        if SPEICHERN.search(t)
    ]
    assert funde == [], funde[:20]


def test_uebersetzungen_vollstaendig():
    """de.json und en.json: gleiche Schlüssel, keine leeren Werte."""
    a, b = dict(flach(i18n("de"))), dict(flach(i18n("en")))
    assert a, "de.json leer"
    assert set(a) == set(b), sorted(set(a) ^ set(b))[:20]
    assert all(str(v).strip() for v in [*a.values(), *b.values()])
