"""AK-3: Requirement „Tokens, Muster und Texte“.

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
ABSTAND = re.compile(r"\b(?:margin|padding|gap)[a-zA-Z-]*\s*[:=]\s*([^;}\n,]*)")
ZAHL_NICHT_NULL = re.compile(r"(?<![\w.-])-?(?:\d*[1-9]\d*(?:\.\d+)?|0*\.\d*[1-9]\d*)")
GIT = re.compile(
    r"\b(?:Commit|Branch|Merge|Rebase|Pull\s+Request|Checkout|Push|Pull|Fork|Repository)\b", re.I
)
SPEICHERN = re.compile(r"^\s*(?:Speichern|Save)\b", re.I)
TASTEN = r"(?:(?:Strg|Ctrl|Cmd|⌘|Umschalt|Shift|⇧|Alt|⌥)\s*\+?\s*)*(?:[A-Za-z0-9]|Esc|Enter|Entf)"
EINHEIT = r"(?:mm|cm|m|N|kN|g|kg|cm³|mm³|°|%|ms)"
AKZENT_ROLLEN = {"auswahl", "fokus", "hauptaktion", "ki"}


def test_tokens_check():
    """`npm run tokens:check` endet mit 0 und meldet 0 Unterschiede."""
    r = npm("run", "tokens:check")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]


def test_erzeugtes_css_enthaelt_alle_token_farben():
    """Unabhängig vom Prüfwerkzeug: jede Farbe aus tokens.json (beide Themen) steht in `src/erzeugt/`."""
    erzeugt = "\n".join(
        p.read_text("utf-8", errors="ignore") for p in (P / "src" / "erzeugt").rglob("*") if p.is_file()
    ).upper()
    assert erzeugt.strip(), "src/erzeugt/ ist leer"
    fehlt = [(t, f) for t in THEMEN for f in sorted(token_farben(t)) if f not in erzeugt]
    assert not fehlt, fehlt


def test_keine_literale_ausserhalb_erzeugt():
    """0 Farbliterale (#hex, rgb(, hsl(, oklch(, 0x…), font-family, font-size, Abstände ≠ 0."""
    dateien = quelltexte()
    assert dateien, "src/ ist leer"
    funde = []
    for p in dateien:
        if p.suffix in (".png", ".woff", ".woff2", ".svg", ".ttf"):
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
    """17 Zustände × 2 Themen: jede Farbe ein Token des Themas; body-Schrift beginnt mit Inter."""
    b = pruefen("budget")
    assert {(z["zustand"], z["thema"]) for z in b["zustaende"]} == {(n, t) for n in ZUSTAENDE for t in THEMEN}
    abweichungen = []
    for z in b["zustaende"]:
        erlaubt = token_farben(z["thema"])
        assert z["farben"], f"{z['zustand']}/{z['thema']}: keine Farben gemeldet"
        for f in z["farben"]:
            if f.get("alpha", 1) == 0:
                continue
            if f["wert"].upper() not in erlaubt:
                abweichungen.append((z["zustand"], z["thema"], f))
        assert z["body_schrift"].strip("\"' ").startswith("Inter"), (z["zustand"], z["body_schrift"])
    assert abweichungen == [], abweichungen[:20]


def test_akzent_nur_an_erlaubter_stelle():
    """Akzentfarben nur an Auswahl, Fokus, der einen Hauptaktion und KI."""
    funde = []
    for z in pruefen("budget")["zustaende"]:
        akzent = akzent_farben(z["thema"]) - (token_farben(z["thema"]) - akzent_farben(z["thema"]))
        for f in z["farben"]:
            if (
                f.get("alpha", 1)
                and f["wert"].upper() in akzent
                and f.get("akzent_rolle") not in AKZENT_ROLLEN
            ):
                funde.append((z["zustand"], z["thema"], f))
    assert funde == [], funde[:20]


def _texte(sprache: str) -> list[dict]:
    t = pruefen("texte")["zustaende"]
    ergebnis = [e for e in t if e["sprache"] == sprache]
    assert {e["zustand"] for e in ergebnis} == set(ZUSTAENDE), sprache
    for e in ergebnis:
        assert e["sichtbarer_text"], f"{e['zustand']}/{sprache}: kein sichtbarer Text"
    return ergebnis


def _datenwert(text: str, modell, kuerzel: set[str]) -> bool:
    if re.fullmatch(rf"[-+±]?\d[\d.,\s]*(?:\s*[×x]\s*\d[\d.,]*)*\s*{EINHEIT}?", text):
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


def test_uebersetzungen_vollstaendig():
    """de.json und en.json: gleiche Schlüsselmengen, 0 leere Werte."""
    a, b = dict(flach(i18n("de"))), dict(flach(i18n("en")))
    assert a, "de.json leer"
    assert set(a) == set(b), sorted(set(a) ^ set(b))[:20]
    leer = [k for k, v in [*a.items(), *b.items()] if not str(v).strip()]
    assert leer == [], leer[:20]


def test_keine_git_begriffe():
    """Sichtbarer Text in de und en: 0 Git-Wörter (ganze Wörter, ohne Groß-/Kleinschreibung)."""
    funde = [
        (e["zustand"], e["sprache"], t)
        for sprache in ("de", "en")
        for e in _texte(sprache)
        for t in e["sichtbarer_text"]
        if GIT.search(t)
    ]
    assert funde == [], funde[:20]


def test_kein_speichern_knopf():
    """0 Bedienelemente „Speichern“/„Save“: kein sichtbarer Text beginnt so, kein Befehl heißt so."""
    funde = [
        (e["zustand"], e["sprache"], t)
        for sprache in ("de", "en")
        for e in _texte(sprache)
        for t in e["sichtbarer_text"]
        if SPEICHERN.search(t)
    ]
    assert funde == [], funde[:20]
    ids = [b["id"] for b in register()]
    assert not [i for i in ids if re.search(r"speichern|save", i)], ids
