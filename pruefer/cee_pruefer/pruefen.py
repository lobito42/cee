"""Der CEE-Prüfer: Ist ein SolidCraft-Teil wirklich parametrisch, und hält es jede Größe über ihren Bereich?"""

from __future__ import annotations

import json
import re
import zipfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from .solidcraft import Sitzung

ZAHL = re.compile(r"^\s*(-?\d+(?:[.,]\d+)?)\s*([a-zA-Z°]*)\s*$")
BEREICH = re.compile(r"^\s*\[\s*([^\]]+?)\s*\.\.\s*([^\]]+?)\s*\]\s*(.*)$", re.S)
FEST = re.compile(r"^\s*\[\s*fest\s*\]\s*(.*)$", re.S | re.I)
WERTFELDER = {
    "distance", "distance2", "radius", "radius2", "diameter", "depth", "angle", "offset", "taper", "length",
    "thickness", "height", "width", "spacing", "count", "pitch", "draft", "setback",
}
STUFEN = 10  # Halbierungsschritte bei der Suche nach der Grenze


@dataclass
class Groesse:
    name: str
    ausdruck: str
    einheit: str
    rolle: str  # "groesse" (mit Bereich), "fest", "ohne"
    grund: str = ""
    von: float | None = None
    bis: float | None = None

    @property
    def wert(self) -> float | None:
        return zahl(self.ausdruck)


@dataclass
class Befund:
    art: str  # "fehler", "warnung", "hinweis"
    titel: str
    text: str
    groesse: str = ""
    werte: dict[str, str] = field(default_factory=dict)


@dataclass
class Ergebnis:
    teil: str
    groessen: list[Groesse]
    befunde: list[Befund]
    nennwert: dict[str, Any]
    probiert: int = 0
    haltbar: dict[str, str] = field(default_factory=dict)


def zahl(text: str) -> float | None:
    m = ZAHL.match(str(text))
    return float(m.group(1).replace(",", ".")) if m else None


def fmt(wert: float, einheit: str = "") -> str:
    text = f"{wert:.2f}".rstrip("0").rstrip(".").replace(".", ",")
    return f"{text} {einheit}".strip()


def dokument(teil: Path) -> dict[str, Any]:
    with zipfile.ZipFile(teil) as archiv:
        return json.loads(archiv.read("document.json"))


def groessen_lesen(doc: dict[str, Any]) -> list[Groesse]:
    out = []
    for p in doc.get("params") or []:
        if p.get("model"):
            continue
        kommentar = p.get("comment") or ""
        g = Groesse(name=p["name"], ausdruck=str(p.get("expr", "")), einheit=p.get("unit") or "", rolle="ohne")
        if m := FEST.match(kommentar):
            g.rolle, g.grund = "fest", m.group(1).strip()
        elif (m := BEREICH.match(kommentar)) and zahl(m.group(1)) is not None and zahl(m.group(2)) is not None:
            g.rolle, g.von, g.bis, g.grund = "groesse", zahl(m.group(1)), zahl(m.group(2)), m.group(3).strip()
        else:
            g.grund = kommentar
        out.append(g)
    return out


def _feste_zahlen(feature: dict[str, Any]) -> list[tuple[str, str]]:
    funde = []
    for schluessel, wert in feature.items():
        if schluessel in WERTFELDER and isinstance(wert, (str, int, float)) and zahl(str(wert)) is not None:
            funde.append((schluessel, str(wert)))
        elif isinstance(wert, dict) and schluessel not in ("sketch", "plane"):
            funde += _feste_zahlen(wert)
    return funde


FELDNAME = {"distance": "Länge", "radius": "Radius", "diameter": "Durchmesser", "depth": "Tiefe",
            "angle": "Winkel", "offset": "Abstand", "taper": "Schräge", "thickness": "Dicke"}


def statisch(doc: dict[str, Any], skizzen: list[dict[str, Any]], groessen: list[Groesse]) -> list[Befund]:
    befunde: list[Befund] = []
    for s in skizzen:
        if s.get("dof", 0) > 0:
            befunde.append(Befund(
                "warnung", f"Skizze „{s['name']}“ ist nicht vollständig bestimmt",
                f"Sie hat noch {s['dof']} Freiheiten. Ihre Lage und Maße kommen aus gezeichneten Zahlen statt aus "
                "Größen; ändert man eine Größe, bleiben diese Stellen einfach stehen.",
            ))
        if s.get("failing"):
            befunde.append(Befund("fehler", f"Skizze „{s['name']}“ hat widersprüchliche Bedingungen",
                                  f"Betroffen: {', '.join(map(str, s['failing']))}."))
    for f in doc.get("features", []):
        if f.get("type") == "sketch" or f.get("suppressed"):
            continue
        for feld, wert in _feste_zahlen(f):
            if f.get("type") == "hole" and feld == "diameter":
                befunde.append(Befund(
                    "hinweis", f"Bohrung „{f.get('name')}“: Durchmesser {wert} steht fest",
                    "SolidCraft kann eine Schraubengröße (z. B. M6) noch nicht als Größe führen. „Bohrungen auf M5“ "
                    "geht deshalb nur durch Ändern des Schritts. Vorschlag für SolidCraft: Gewinde als Größe.",
                ))
            else:
                befunde.append(Befund(
                    "warnung", f"Schritt „{f.get('name')}“: {FELDNAME.get(feld, feld)} {wert} ist eine feste Zahl",
                    "Sie hängt an keiner Größe. Wenn das Absicht ist, als Größe mit „[fest] Grund“ anlegen; sonst "
                    "aus einer Größe oder Formel ableiten.",
                ))
    for g in groessen:
        if g.rolle == "ohne":
            befunde.append(Befund(
                "hinweis", f"Größe „{g.name}“ hat keinen Bereich",
                "Ohne Bereich kann niemand prüfen, wie weit sie sich ändern lässt. Im Kommentar ergänzen, z. B. "
                f"„[{fmt((g.wert or 1) * 0.5, g.einheit)} .. {fmt((g.wert or 1) * 2, g.einheit)}] Grund“.",
                groesse=g.name,
            ))
    return befunde


def signatur(antwort: dict[str, Any]) -> tuple:
    koerper = antwort.get("measure", {}).get("bodies", [])
    fehler = bool(antwort.get("errors") or antwort.get("parameter_errors"))
    return (
        fehler,
        len(koerper),
        all(k.get("closed") for k in koerper),
        tuple(sorted((k.get("faces"), tuple(sorted(k.get("face_types", {}).items()))) for k in koerper)),
    )


def beschreiben(vorher: tuple, nachher: tuple, antwort: dict[str, Any]) -> str:
    if nachher[0]:
        meldungen = [str(e.get("message", e)) if isinstance(e, dict) else str(e)
                     for e in (antwort.get("errors") or []) + (antwort.get("parameter_errors") or [])]
        return "Das Teil lässt sich nicht mehr bauen" + (f": {meldungen[0]}" if meldungen else "") + "."
    if nachher[1] != vorher[1]:
        return f"Aus {vorher[1]} Körper(n) werden {nachher[1]} – das Teil zerfällt oder verschmilzt."
    if not nachher[2]:
        return "Der Körper ist nicht mehr geschlossen und damit nicht druckbar."
    fv = sum(f for f, _ in vorher[3])
    fn = sum(f for f, _ in nachher[3])
    return (f"Die Gestalt ändert sich ({fv} → {fn} Flächen): vermutlich schneidet ein Schritt in einen anderen "
            "oder ein Teil verschwindet.")


def pruefen(teil: Path, sitzung: Sitzung) -> Ergebnis:
    doc = dokument(teil)
    groessen = groessen_lesen(doc)
    info = sitzung.werkzeug("inspect_design", {"measure": False, "sketches": True})
    befunde = statisch(doc, info.get("sketches", []), groessen)

    # SolidCraft verlangt mindestens eine Größe: die erste auf ihren eigenen Wert setzen
    nenn_set = {groessen[0].name: groessen[0].ausdruck} if groessen else {}
    nenn = (sitzung.werkzeug("check_parameters", {"set": nenn_set}) if nenn_set
            else sitzung.werkzeug("measure", {}))
    if not nenn_set:
        nenn = {"measure": nenn, "errors": []}
    ref = signatur(nenn)
    ergebnis = Ergebnis(teil.stem, groessen, befunde, nenn)
    if ref[0] or not ref[2]:
        befunde.insert(0, Befund("fehler", "Das Teil ist schon mit den Nennwerten fehlerhaft",
                                 beschreiben((False, ref[1], True, ref[3]), ref, nenn)))
        return ergebnis

    def probe(werte: dict[str, str]) -> tuple[tuple, dict[str, Any]]:
        ergebnis.probiert += 1
        antwort = sitzung.werkzeug("check_parameters", {"set": werte})
        return signatur(antwort), antwort

    for g in groessen:
        if g.rolle != "groesse" or g.wert is None or g.von is None or g.bis is None:
            continue
        kandidaten = [g.von, g.bis] + [g.von + (g.bis - g.von) * t for t in (0.25, 0.5, 0.75)]
        schlecht: list[float] = []
        for v in sorted(set(round(k, 6) for k in kandidaten)):
            sig, _ = probe({g.name: fmt(v, g.einheit).replace(",", ".")})
            if sig != ref:
                schlecht.append(v)
        if not schlecht:
            ergebnis.haltbar[g.name] = "hält im ganzen Bereich"
            continue
        # Grenze: vom Nennwert zum nächstgelegenen schlechten Wert halbieren
        ziel = min(schlecht, key=lambda v: abs(v - g.wert))
        gut, boese = g.wert, ziel
        for _ in range(STUFEN):
            mitte = (gut + boese) / 2
            sig, _ = probe({g.name: f"{mitte:.4f} {g.einheit}".strip()})
            if sig == ref:
                gut = mitte
            else:
                boese = mitte
        sig, antwort = probe({g.name: fmt(ziel, g.einheit).replace(",", ".")})
        richtung = "unter" if ziel < g.wert else "über"
        ergebnis.haltbar[g.name] = f"kippt {richtung} ≈ {fmt(gut, g.einheit)}"
        befunde.append(Befund(
            "fehler" if sig[0] or not sig[2] else "warnung",
            f"„{g.name}“ hält nicht den ganzen Bereich: kippt {richtung} ≈ {fmt(gut, g.einheit)}",
            f"Bei {g.name} = {fmt(ziel, g.einheit)}: {beschreiben(ref, sig, antwort)} Erlaubt sind laut Kommentar "
            f"{fmt(g.von, g.einheit)} bis {fmt(g.bis, g.einheit)}. Entweder den Bereich enger fassen oder den "
            "Aufbau so ändern, dass er mitwächst.",
            groesse=g.name,
            werte={g.name: fmt(ziel, g.einheit).replace(",", ".")},
        ))

    mit_bereich = [g for g in groessen if g.rolle == "groesse" and g.von is not None and g.bis is not None]
    if len(mit_bereich) > 1:
        for name, waehle in (("alle am unteren Rand", lambda g: g.von), ("alle am oberen Rand", lambda g: g.bis)):
            werte = {g.name: fmt(waehle(g), g.einheit).replace(",", ".") for g in mit_bereich}
            sig, antwort = probe(werte)
            if sig != ref:
                befunde.append(Befund(
                    "warnung", f"Zusammenspiel: {name} geht nicht",
                    f"Jede Größe für sich mag halten, zusammen aber nicht: {beschreiben(ref, sig, antwort)}",
                    werte=werte,
                ))
    rang = {"fehler": 0, "warnung": 1, "hinweis": 2}
    ergebnis.befunde.sort(key=lambda b: rang[b.art])
    return ergebnis
