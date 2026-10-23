"""AK-14, AK-15: Requirements „Einheiten, Texte und Tokens“ und „Bausteinkatalog“."""

# ruff: noqa: E501

from __future__ import annotations

import re
from pathlib import Path

from grundlagen_helpers import (
    THEMEN,
    ZUSTAENDE,
    P,
    akzent_farben,
    flach,
    i18n,
    kanon,
    knoten,
    muster_katalog,
    npm,
    png_info,
    pruefen,
    quelltexte,
    register,
    token_farben,
)

LITERALE = [
    r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b",
    r"\brgba?\(", r"\bhsla?\(", r"\boklch\(", r"\b0x[0-9a-fA-F]{6}\b", r"font-family", r"font-size",
]  # fmt: skip
GIT = re.compile(
    r"\b(?:Commit|Branch|Merge|Rebase|Pull\s+Request|Checkout|Push|Pull|Fork|Repository)\b", re.I
)
SPEICHERN = re.compile(r"^\s*(?:Speichern|Save)\s*$", re.I)
TASTEN = (
    r"(?:(?:Strg|Ctrl|Cmd|⌘|Umschalt|Shift|⇧|Alt|⌥|Mod)\s*\+\s*)*(?:[A-Za-z0-9]{1,2}|Esc|Enter|Entf|F\d{1,2})"
)
EINHEIT = r"(?:mm|cm|m|N|kN|g|kg|cm³|mm³|°|%|ms)"
AKZENT_ROLLEN = {"auswahl", "ueberfahren", "fokus", "hauptaktion", "ki"}


def test_tokens_und_keine_literale():
    """Scenario „Tokens und keine Literale“: `npm run tokens:check` grün, 0 Farbliterale und 0 Schriftangaben außerhalb
    von `src/erzeugt/`."""
    r = npm("run", "tokens:check")
    assert r.returncode == 0, r.stdout[-1500:] + r.stderr[-1500:]
    erzeugt = "\n".join(
        p.read_text("utf-8", errors="ignore") for p in (P / "src" / "erzeugt").rglob("*") if p.is_file()
    ).upper()
    assert erzeugt.strip(), "src/erzeugt/ ist leer"
    fehlt = [(t, f) for t in THEMEN for f in sorted(token_farben(t)) if f not in erzeugt]
    assert not fehlt, fehlt
    dateien = quelltexte()
    assert dateien, "src/ ist leer"
    funde = []
    for p in dateien:
        if p.suffix in (".png", ".woff", ".woff2", ".svg", ".ttf"):
            continue
        text = p.read_text("utf-8", errors="ignore")
        for muster in LITERALE:
            funde += [f"{p.relative_to(P)}: {m.group(0)}" for m in re.finditer(muster, text)]
    assert not funde, funde[:20]


def _texte(sprache: str) -> list[dict]:
    ergebnis = [e for e in pruefen("texte")["zustaende"] if e["sprache"] == sprache]
    assert {e["zustand"] for e in ergebnis} == set(ZUSTAENDE), sprache
    for e in ergebnis:
        assert e["sichtbarer_text"], f"{e['zustand']}/{sprache}: kein sichtbarer Text"
    return ergebnis


def _datenwert(text: str, modell, kuerzel: set[str]) -> bool:
    if re.fullmatch(rf"[-+±Ø]?\s*\d[\d.,\s]*(?:\s*[×x]\s*\d[\d.,]*)*\s*{EINHEIT}?", text):
        return True
    if text in kuerzel or re.fullmatch(TASTEN, text):
        return True
    return text in {v for k in knoten(modell) for v in k.values() if isinstance(v, str)}


def _zahl_ohne_einheit(text: str, modell, kuerzel: set[str]) -> bool:
    """True, wenn der Text eine Zahl ohne Einheit zeigt (Zähler wie „2 Elemente“, Namen, Kürzel sind erlaubt)."""
    if not re.search(r"\d", text):
        return False
    if re.search(rf"\d\s*{EINHEIT}(?![A-Za-zÄÖÜäöüß])", text):
        return False
    if (
        re.fullmatch(r"(?:zu: )?\d+\s+[A-Za-zÄÖÜäöüß]+", text)
        or re.fullmatch(TASTEN, text)
        or text in kuerzel
    ):
        return False
    strings = {v for k in knoten(modell) for v in k.values() if isinstance(v, str)}
    if any(text in s or s in text for s in strings if len(s) >= 3):
        return False
    return not re.fullmatch(
        r"[A-Za-zÄÖÜäöüß:, ]+\s\d+", text
    )  # „Baugruppe 1“, „Steg 2“: Namen mit laufender Nummer


def test_texte_und_einheiten():
    """Scenario „Texte und Einheiten“: 0 Texte ohne Schlüssel, 0 fehlende Übersetzungen, 0 Git-Begriffe,
    0 Knöpfe „Speichern“, 0 Zahlen ohne Einheit (außer Zählern)."""
    schluessel = {k for k, _ in flach(i18n("de"))}
    kuerzel = {str(b["kuerzel"]) for b in register() if b.get("kuerzel")}
    feste = [
        (e["zustand"], t)
        for e in _texte("schluessel")
        for t in e["sichtbarer_text"]
        if t.strip() and t.strip() not in schluessel and not _datenwert(t.strip(), e["modell"], kuerzel)
    ]
    assert feste == [], feste[:20]
    de, en = dict(flach(i18n("de"))), dict(flach(i18n("en")))
    assert de and set(de) == set(en), sorted(set(de) ^ set(en))[:20]
    assert [k for k, v in [*de.items(), *en.items()] if not str(v).strip()] == []
    git, speichern, ohne_einheit = [], [], []
    for sprache in ("de", "en"):
        for e in _texte(sprache):
            for t in e["sichtbarer_text"]:
                if GIT.search(t):
                    git.append((e["zustand"], sprache, t))
                if SPEICHERN.search(t):
                    speichern.append((e["zustand"], sprache, t))
                if _zahl_ohne_einheit(t.strip(), e["modell"], kuerzel):
                    ohne_einheit.append((e["zustand"], sprache, t))
    assert git == [], git[:20]
    assert speichern == [], speichern[:20]
    assert ohne_einheit == [], ohne_einheit[:20]


def test_akzent_nur_an_erlaubter_stelle():
    """Scenario „Akzent nur an erlaubter Stelle“: Akzentfarbe nur an Auswahl, Überfahren, Fokus, der einen
    Hauptaktion und KI; Farben nur aus Tokens; 0 modale Dialoge."""
    zustaende = pruefen("budget")["zustaende"]
    assert {(z["zustand"], z["thema"]) for z in zustaende} == {(n, t) for n in ZUSTAENDE for t in THEMEN}
    funde, fremd, dialoge = [], [], 0
    for z in zustaende:
        assert z["farben"], f"{z['zustand']}/{z['thema']}: keine Farben gemeldet"
        assert z["body_schrift"].strip("\"' ").startswith("Inter"), z["body_schrift"]
        dialoge += z["dialoge"]
        nur_akzent = akzent_farben(z["thema"]) - (token_farben(z["thema"]) - akzent_farben(z["thema"]))
        for f in z["farben"]:
            if f.get("alpha", 1) == 0:
                continue
            if f["wert"].upper() not in token_farben(z["thema"]):
                fremd.append((z["zustand"], z["thema"], f))
            if f["wert"].upper() in nur_akzent and f.get("akzent_rolle") not in AKZENT_ROLLEN:
                funde.append((z["zustand"], z["thema"], f))
    assert fremd == [], fremd[:20]
    assert funde == [], funde[:20]
    assert dialoge == 0, f"{dialoge} modale Dialoge"


# --- Katalog -------------------------------------------------------------------------------------------------


def _katalog(out: Path) -> dict:
    return pruefen("katalog", "--out", str(out), frisch=True)


def test_katalog_jede_seite_vollstaendig(tmp_path):
    """Scenario „Jede Seite vollständig“: ≥ 19 Seiten mit PNG hell und dunkel, Regeltext 2–6 Sätze aus den
    Übersetzungen, Bezug (Muster oder Kandidat), mindestens eine ADR-Nummer."""
    k = _katalog(tmp_path)
    seiten = k["seiten"]
    assert len(seiten) >= 19, len(seiten)
    de = dict(flach(i18n("de")))
    muster = muster_katalog()
    for s in seiten:
        for thema in ("bild_hell", "bild_dunkel"):
            datei = Path(s[thema])
            datei = datei if datei.is_absolute() else tmp_path / datei
            b, h, _ = png_info(datei)
            assert b > 0 and h > 0, (s["baustein"], thema)
        assert de.get(s["regel_schluessel"]) == s["regel_text"] and s["regel_text"].strip(), s["baustein"]
        saetze = [x for x in re.split(r"(?<=[.!?])\s+", s["regel_text"].strip()) if x]
        assert 2 <= len(saetze) <= 6, (s["baustein"], len(saetze))
        bezug = s["bezug"]
        if bezug["art"] == "muster":
            assert bezug["name"] in muster, (s["baustein"], bezug["name"])
        else:
            assert bezug["art"] == "kandidat" and s["kandidat_attr"] is True, (s["baustein"], bezug)
        assert s["adrs"] and all(isinstance(a, int) and a > 0 for a in s["adrs"]), (s["baustein"], s["adrs"])
    assert len({s["baustein"] for s in seiten}) == len(seiten), "Bausteine doppelt"


def test_katalog_ueber_suche_und_adresse_erreichbar(tmp_path):
    """Requirement Bausteinkatalog: erreichbar über die Suche und über `?katalog`."""
    k = _katalog(tmp_path)
    assert "katalog.oeffnen" in [t["befehl"] for t in k["suche_treffer"]], k["suche_treffer"]
    assert k["adresse"]["bereit"] == "1", k["adresse"]
    assert "katalog.oeffnen" in {b["id"] for b in register()}


def test_katalog_und_prototyp_stimmen_ueberein(tmp_path):
    """Scenario „Katalog und Prototyp stimmen überein“: dieselben Kanäle und Tokens (0 Abweichungen) für
    Elementzustände (`zustaende`) und Kontextmenü (`kontextmenue`)."""
    v = _katalog(tmp_path)["vergleich"]
    assert {e["zustand"] for e in v} >= {"zustaende", "kontextmenue"}, [e["zustand"] for e in v]

    def norm(kanaele: list) -> list[str]:
        return sorted(kanon(k) for k in kanaele)

    abweichungen = [
        (e["baustein"], e["zustand"]) for e in v if norm(e["katalog_kanaele"]) != norm(e["prototyp_kanaele"])
    ]
    assert abweichungen == [], abweichungen
    zust = [e for e in v if e["zustand"] == "zustaende"]
    assert zust and all(e["katalog_kanaele"] for e in zust), "Elementzustände ohne gemessene Kanäle"
