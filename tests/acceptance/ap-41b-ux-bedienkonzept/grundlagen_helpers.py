"""Hilfen für die Abnahmetests von ap-41b (Interaktions-Grundlagen): Prototyp bauen, Prüfwerkzeug aufrufen, auswerten.

Grundsatz: Das Prüfwerkzeug (`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> … --json`, Ausgabe:
genau ein JSON-Wert auf stdout) spielt echte Eingaben (Playwright, headless Chromium, 1440 × 900, devicePixelRatio 1,
Thema `hell`, Sprache `de`, sofern nicht anders genannt) und liefert nur **Rohdaten**: Namenslisten, Texte,
Rechtecke, Punkte, PNG-Dateien und unveränderte Schnappschüsse aus `window.__cee`. Alle Urteile (Zählen,
Vergleichen, Farbmessung in OKLab, Volumenformel, Perzentil, Prüfung gegen Register, Tokens und Übersetzungen) fällt
der Python-Test. Selbstberichtete Ja/Nein-Urteile des Werkzeugs gibt es nicht. Leere Listen dort, wo es Inhalt
geben muss, sind ein Fehler.

Allgemeine Formen (Koordinaten in CSS-Pixeln, Ursprung links oben):

- `Rechteck` = `{x, y, breite, hoehe}`; `Punkt` = `{x, y}`; `Kamera` = `{azimut_grad, hoehe_grad, abstand_mm,
  ziel: {x, y, z}}` (mm).
- `Größe` = `{"value": <Zahl>, "unit": "mm"|"cm"|"m"|…}` (ADR-057).
- `modell` = `window.__cee.modell()` (Elementform `id`, `type`, `params`, `content`, `meta`; Namen unter `name`,
  `meta.name` oder `params.name`; Kinder stehen verschachtelt oder als ID-Zeichenketten in `content`). Der Halter hat
  die Schritte „Grundplatte“, „Steg“, „Bohrungen“ (und „Skizze“); ein verworfenes Element bleibt im Modell und trägt
  `meta.verworfen: true`.
- `auswahl` = `window.__cee.auswahl()`: Liste von Adressen `{element_id}` bzw. `{element_id, teil: {art, adresse}}`.
- `protokoll` = `window.__cee.protokoll()`: Liste `{befehl, parameter, quelle, weg}`.
- `teil` = `window.__cee.teil()`: `{abmessungen_mm, volumen_mm3, masse_g}`.
- `ansicht` = `window.__cee.ansicht()` ohne die Funktion `projektion_von`: `{aktiv: <ID|null>, pfad: [Text je Glied],
  ausgeblendet: [IDs], isoliert, darstellung: "koerper"|"kanten"|"durchsicht", projektion: "orthogonal"|
  "perspektivisch", profil, kamera: Kamera}`.
- `zustaende(id)` = `{modell|struktur|chat|pfad: null | {zustaende: [Name], kanaele: [{zustand, kanal: "Kontur"|
  "Umfeld"|"Sichtbarkeit"|"Status", token, strichart: "durchgezogen"|"gestrichelt"|null, breite: <px>|null}]}}`.
- `Zeile` der Struktur = `{name, id, ebene, aria_selected, status: {wort, symbol, token}|null, symbole: [Lucide-Name],
  zustaende: [Name]}`.

Befehle des Prüfwerkzeugs und ihre Ausgabe (nur, was die Tests lesen):

- `zustaende --out <dir>`: Liste `{zustand, thema, datei, bereit_ms, eingaben}` (22 Zustände × 2 Themen).
- `zustand --name <n>`: `{bereit_ms, zustand_gezeigt, befunde: [Text], konsolenfehler: [Text], struktur: [Zeile]}`.
- `fenster`: `{zustaende: [{zustand, fenster: {breite, hoehe}, zonen: [{zone, sichtbar, rechteck}], tabs: [{text,
  rechteck}], reiterzeile: Rechteck, menueleiste: {start_menue: bool, dropdowns: [{name, untergruppen: [{name,
  eintraege: [{befehl}]}]}], suche: {kuerzel_text}, rueckgaengig: {kuerzel_text}}}], schalter: {tasten: [{taste,
  vorher: {zone: bool}, nachher: {zone: bool}}], klicks: [{befehl, vorher, nachher}]}, taskleiste: {vorher,
  simulation, zurueck}}` mit `taskleiste.*` = `{dropdowns: [Name], struktur_texte: [Text], leerer_zustand: bool,
  auswahl}` für die Zustände `halter`, `befund`, `chat` (Schalter und Taskleiste im Zustand `halter`; vor dem
  Wechsel ist der Steg gewählt).
- `elementzustaende`: `{zustaende: {elemente: [{id, name, darstellungen: <zustaende(id)>}]}, kontur: {leinwand: PNG,
  leinwand_rechteck, grundplatte: {punkte: [Punkt], breite}, steg: {punkte, breite}, andere: {id, darstellungen}},
  vorrang: {fehlerhaft: {id, konturen: [{token}], status: {token, symbol, wort}}, ausgeblendet: {id, zeile: Zeile,
  im_modell_gezeichnet: bool}}, status: [{zustand, token, symbol, wort}]}` (Punkte auf der durchgezogenen Konturlinie,
  Leinwandkoordinaten, hell).
- `auswahl`: `{eins: {modell: S, struktur: S}, folge: {struktur: [F], modell: [F], esc: F}, baugruppe: {klick1:
  {auswahl, ansicht}, doppelklick: {auswahl, ansicht, gedimmt: [IDs]}, klick3: {auswahl, erzeuger_id}, verlassen:
  {fertig: ansicht, esc: ansicht, pfad: ansicht}}, mehrfach: {einzeln: {<Name>: [{name, wert_text}]},
  eigenschaften: [{name, wert_text, gemischt}], chat_kontext: Text}}` mit `S = {auswahl, struktur_aria_selected:
  [IDs], modell_kontur: [IDs], eigenschaften_name, chat_kontext}` und `F = {auswahl, sichtbare_ids}`; `folge`
  hat je Weg 5 Einträge (nach Klick, Umschalt+Klick, Mod+Klick, Mod+A, Klick ins Leere); `esc` ist der Stand nach
  Esc bei bestehender Auswahl.
- `crud`: `{operationen: [{operation, weg, befehl, protokoll_neu, verlauf_neu}], verwerfen: {vorher: {modell,
  modell_hash}, nach: {modell, gezeichnet: [IDs]}, mit_zeigen: {struktur: [{name, durchgestrichen}]}, zurueck:
  {modell, modell_hash}, dialoge: int}, rueckgaengig: {ausgang: {modell, dicke_mm}, schritte: [{weg, dicke_mm,
  verlauf}], undo: [{fokus, verlauf_nachher, dicke_mm, modell}], redo: [{verlauf_nachher, dicke_mm}], undo_menue:
  {verlauf_vorher, verlauf_nachher, dicke_mm}}}`; `rueckgaengig.schritte` sind die Änderungen über Eigenschaften,
  Griff und Chat; `undo` die drei Rücknahmen mit Fokus in Struktur, Modell, Chat; `redo` drei Wiederholungen;
  `undo_menue` eine Rücknahme über die Menüleiste vom vollen Stand aus.
- `kontextmenue`: `{arten: [{art, struktur: M, modell: M}], kontextaktionen_auswahl: M}` mit `M = {gruppen: [{name,
  eintraege: [{befehl, mehr: bool}]}], kontextaktionen: [befehl], menue_nach_rang: [befehl]}`; `art` ∈ teil,
  schritt, kante, baugruppe, mehrfach, keine. `registerprobe --register <datei> --suche <text>`:
  `{kontextmenue_element: [{name, eintraege: [{befehl}]}], dropdown_bearbeiten: [{befehl}], suche_treffer:
  [{befehl}]}`. `inventar --datei <json>`: `{befehle: [{id, familie, orte: [Ort], suche_findet, im_register}],
  dropdowns: [{name, untergruppen: [{name, anzahl}]}]}` (Beta-Befehle aus der Datei sind in das Register des
  Laufs aufgenommen).
  `Ort` ∈ start-menue, dropdown-bearbeiten, dropdown-auswahl, dropdown-baugruppe, ansichtsleiste, auge,
  menueleiste, suche, kontextmenue (die Orte der Platzierungstabelle in design.md; Kontextmenü und Suche sind
  zusätzliche Wege). `registerprobe`: Der Befehl der Probe trägt den Titel „Testbefehl Probe“ (ohne Übersetzung
  erscheint der Titel unverändert).
- `navigation`: `{geraete: [{geraet: "maus"|"trackpad"|"touch", geste: "drehen"|"verschieben"|"zoomen",
  kamera_vorher, kamera_nachher, auswahl_gleich, modell_gleich}], profilwechsel: {einstellung_nachher,
  mittlere_taste: {standard, zweites}}, zoom: {nach_f: {huellbox, modellzone}, nach_einpassen: {leinwand,
  leinwand_rechteck, modellzone}, projektion: [Text, Text]}}`; `mittlere_taste` ist die aus der Kamera erkannte
  Wirkung („drehen“, „verschieben“, „zoomen“, „keine“) von „mittlere Taste ziehen“; `huellbox` = projizierte Hüllbox
  der Grundplatte in Seitenkoordinaten.
- `ziehen`: `{griff: {vorher: {dicke_mm, protokoll_laenge}, waehrend: {zeiger_texte: [Text]}, nach: {dicke_mm,
  protokoll_laenge}, nach_1000ms: {zeiger_texte}}, ablegen: {waehrend: {ziel_name, ziel_attr}, nach: {modell,
  protokoll_neu}}, verboten: {waehrend: {ziel_name, ziel_attr}, rueckmeldung_vorher, rueckmeldung_text,
  modell_vorher, modell_nachher, protokoll_vorher, protokoll_nachher}, esc_deckel: {modell_vorher, modell_nachher,
  protokoll_vorher, protokoll_nachher}, esc_griff: {…}}`.
- `sichtbarkeit`: `{ausblenden: {vorher: {modell, protokoll, gezeichnet: [IDs]}, nach: {modell, protokoll,
  gezeichnet, ausgeblendet}}, einblenden: [{weg: "auge"|"kontextmenue"|"alles", gezeichnet, ausgeblendet}]}`.
- `neuladen`: `{vorher: V, vorgaben: V, nachher: V, ansichtsschritte: [{aktion, modell, protokoll_laenge,
  verlauf_laenge, speicher_graph}], speichern: {name, gespeichert: V, nach_neuladen: {modell, struktur_texte,
  verlauf_neu_beim_speichern}, angewendet: {ansicht, modell_vorher, modell_nachher, auswahl}, teil_nach_anwenden,
  modell_nach_anwenden}}` mit `V = {ansicht, auswahl, modell}`; `ansichtsschritte[0]` ist der Ausgangsstand.
- `rueckmeldung`: `{rechnet, ungueltig, bestaetigung}` je `{statusanzeigen: [{ort, element, zustand}], befunde: [{ort}],
  rueckmeldungen: [{ort, text}], dialoge: int, ausserhalb_zonen: [Beschreibung]}`; `zerbricht: {schritte: [{aktion,
  ok}], konsolenfehler: [Text], bohrungen_zustaende, befunde}`; `ort` ist der Name der Zone (`data-zone`).
- `tastatur`: `{f6: {sichtbare_zonen: [Zone], folge: [{zone, png, ring_punkte: [Punkt]}]}, esc: {start, druecke:
  [{kontextmenue_offen, auswahl, aktiv}]}, kuerzel: {register: [{befehl, kuerzel}], ausgeloest: [{kuerzel, befehl,
  protokoll_neu, ansicht_vorher, ansicht_nachher, ui_vorher, ui_nachher, im_menue, in_suche}]}}`; `ui_*` =
  Zeichenkette aus Sichtbarkeit der Zonen, Fokus und offenen Menüs; `esc.start` = `{kontextmenue_offen, auswahl,
  aktiv}` vor dem ersten Druck; `register` stammt aus `window.__cee.befehle()`.
- `anwesenheit`: `{andere: {steg_zustaende, zeiger: {name, texte}}, speicher: {local: [{key, value}], session: [{key,
  value}], indexeddb: [Name], cookies: [Text]}, halter: {zustaende_je_element: [{id, zustaende}], texte: [Text]}}`
  (Speicher nach Zustand `andere`, 5 s Wartezeit und anschließendem Laden von `halter`).
- `budget`: `{zustaende: [{zustand, thema, farben: [{wert, alpha, ort, akzent_rolle}], body_schrift, dialoge: int,
  hover_pruefung: [{befehl, sichtbar_ohne, sichtbar_mit}]}]}`; `texte`: `{zustaende: [{zustand, sprache,
  sichtbarer_text: [Text], modell}]}` (Sprachen `de`, `en`, `schluessel`); `anfragen`: `{anfragen: [URL]}`.
- `katalog --out <dir>`: `{seiten: [{baustein, bild_hell, bild_dunkel, regel_schluessel, regel_text, bezug: {art:
  "muster"|"kandidat", name}, kandidat_attr, adrs: [Zahl]}], suche_treffer: [{befehl}], adresse: {bereit},
  vergleich: [{baustein, zustand, katalog_kanaele, prototyp_kanaele}]}`.
- `ablauf <e…l>`: immer `{eingaben, modell, teil, ansicht, protokoll}`; zusätzlich: `e`: `rueckgaengig_texte: [Text]`
  (Kürzeltexte, die die Testperson findet); `i`: `zwischen: {ausgeblendet, gezeichnet}`, `ende: {ausgeblendet,
  gezeichnet}`, `modell_vorher`; `l`: `bohrungen_zustaende`, `befunde`.
- `messen`: `{auswahl, hover, kontextmenue, ablegen, wert_live, suche}` mit je `{roh_ms: [Zahl]}`.
"""

# ruff: noqa: E501, E741

from __future__ import annotations

import hashlib
import json
import math
import re
import statistics
import struct
import subprocess
import zlib
from functools import cache
from pathlib import Path

import pytest
from conftest import ROOT, need, strict

P = ROOT / "spikes" / "ux-prototyp-2"
LEITFADEN = ROOT / "docs" / "spikes" / "ux-prototyp-2.md"
INVENTAR = ROOT / "tests" / "golden" / "ap-41b-ux-bedienkonzept" / "befehlsinventar.json"

ZUSTAENDE = [
    "leer", "halter", "auswahl", "mehrfach", "zustaende", "aktiv", "isoliert", "kontextmenue", "menue", "ziehen",
    "ablegen", "ablegen-verboten", "ausgeblendet", "verworfen", "rechnet", "befund", "andere", "chat", "suche",
    "fokus", "perspektive", "kanten",
]  # fmt: skip
THEMEN = ("hell", "dunkel")
FENSTER = (1440, 900)


# --- Formeln (Halter, design.md) -------------------------------------------------------------------------


def volumen(L=80.0, B=50.0, T=8.0, r=3.0, d=6.0, l=60.0, b=10.0, h=30.0) -> float:
    """Volumen des Halters in mm³ (Ausgang 49.485,8 mm³ = 49,49 cm³)."""
    return L * B * T - 4 * r * r * (1 - math.pi / 4) * T - 2 * math.pi * (d / 2) ** 2 * T + l * b * h


def nahe(ist: float, soll: float, rel: float = 0.001) -> bool:
    return abs(ist - soll) <= abs(soll) * rel


def p95(werte: list[float]) -> float:
    """95. Perzentil nach dem Rang-Verfahren (kleinster Wert, unter dem mindestens 95 % liegen)."""
    s = sorted(werte)
    return s[max(0, math.ceil(0.95 * len(s)) - 1)]


# --- Prototyp und Prüfwerkzeug ---------------------------------------------------------------------------

_gebaut = False


def bauen() -> None:
    """`build.sh` einmal je Testlauf; ein Fehlschlag ist ein Testfehler."""
    global _gebaut
    if _gebaut:
        return
    assert P.is_dir(), "spikes/ux-prototyp-2/ fehlt"
    assert (P / "build.sh").is_file(), "spikes/ux-prototyp-2/build.sh fehlt"
    need("bash")
    need("npm")
    r = subprocess.run(["bash", str(P / "build.sh")], cwd=ROOT, capture_output=True, text=True, timeout=1800)
    assert r.returncode == 0, r.stdout[-2000:] + r.stderr[-2000:]
    _gebaut = True


def npm(*args: str, timeout: int = 900) -> subprocess.CompletedProcess:
    bauen()
    return subprocess.run(["npm", *args], cwd=P, capture_output=True, text=True, timeout=timeout)


def _roh(args: tuple[str, ...], timeout: int = 1200):
    r = npm("run", "--silent", "pruefen", "--", *args, "--json", timeout=timeout)
    assert r.returncode == 0, f"pruefen {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


@cache
def _gemerkt(args: tuple[str, ...]):
    return _roh(args)


def pruefen(*args: str, frisch: bool = False):
    """Prüfwerkzeug aufrufen, JSON zurückgeben (je Aufruf einmal je Lauf, außer `frisch`)."""
    return _roh(args) if frisch else _gemerkt(args)


def ablauf(name: str) -> dict:
    a = pruefen("ablauf", name)
    assert a["eingaben"] > 0, f"Ablauf {name}: keine echten Eingaben gezählt"
    return a


# --- Modell ----------------------------------------------------------------------------------------------


def knoten(wert):
    """Alle Dicts eines JSON-Baums."""
    if isinstance(wert, dict):
        yield wert
        for v in wert.values():
            yield from knoten(v)
    elif isinstance(wert, list):
        for v in wert:
            yield from knoten(v)


def name_von(element: dict) -> str:
    for quelle in (element, element.get("meta") or {}, element.get("params") or {}):
        if isinstance(quelle, dict) and isinstance(quelle.get("name"), str):
            return quelle["name"]
    return ""


def elemente(modell) -> list[dict]:
    return [k for k in knoten(modell) if isinstance(k.get("id"), str) and "type" in k]


def nach_name(modell, name: str) -> dict:
    treffer = [k for k in elemente(modell) if name_von(k) == name]
    assert len(treffer) == 1, f"Element „{name}“ nicht eindeutig im Modell: {len(treffer)}"
    return treffer[0]


def id_von(modell, name: str) -> str:
    return nach_name(modell, name)["id"]


def verworfen(element: dict) -> bool:
    return bool((element.get("meta") or {}).get("verworfen") or element.get("verworfen"))


def kanon(wert) -> str:
    """Kanonische JSON-Form (sortierte Schlüssel) für byte-genaue Vergleiche von Modellen."""
    return json.dumps(wert, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def modell_hash(modell) -> str:
    return hashlib.sha256(kanon(modell).encode()).hexdigest()


def mm(g) -> float:
    return g["value"] * {"mm": 1.0, "cm": 10.0, "m": 1000.0}[g["unit"]]


def groessen(element: dict) -> list[float]:
    """Alle Längen (mm) unter `params` eines Elements, verschachtelt."""
    return [
        mm(k)
        for k in knoten(element.get("params") or {})
        if set(k) >= {"value", "unit"} and k["unit"] in ("mm", "cm", "m")
    ]


def kinder_ids(element: dict) -> set[str]:
    """IDs aller Kinder in `content` (verschachtelte Elemente oder ID-Zeichenketten)."""
    ids: set[str] = set()

    def lauf(n):
        if isinstance(n, str):
            ids.add(n)
        elif isinstance(n, dict):
            if isinstance(n.get("id"), str) and "type" in n:
                ids.add(n["id"])
            for v in n.values():
                lauf(v)
        elif isinstance(n, list):
            for v in n:
                lauf(v)

    lauf(element.get("content"))
    ids.discard(element["id"])
    return ids


def eltern(modell, kind_id: str) -> list[str]:
    """ID des nächsten Elternelements (das mit den wenigsten Nachfahren, das `kind_id` enthält), sonst leer."""
    treffer = [e for e in elemente(modell) if kind_id in kinder_ids(e)]
    treffer.sort(key=lambda e: len(kinder_ids(e)))
    return [e["id"] for e in treffer[:1]]


def auswahl_ids(auswahl: list) -> list[str]:
    return [a["element_id"] if isinstance(a, dict) else a for a in auswahl]


# --- Rechtecke -------------------------------------------------------------------------------------------


def innerhalb(innen: dict, aussen: dict, rand: float = 2) -> bool:
    return (
        innen["x"] >= aussen["x"] - rand
        and innen["y"] >= aussen["y"] - rand
        and innen["x"] + innen["breite"] <= aussen["x"] + aussen["breite"] + rand
        and innen["y"] + innen["hoehe"] <= aussen["y"] + aussen["hoehe"] + rand
    )


def zone(eintrag: dict, name: str) -> dict:
    treffer = [z for z in eintrag["zonen"] if z["zone"] == name]
    assert len(treffer) == 1, f"Zone {name} nicht eindeutig: {[z['zone'] for z in eintrag['zonen']]}"
    return treffer[0]


# --- Bilder: PNG lesen, OKLab ------------------------------------------------------------------------------


def png_info(pfad: str | Path) -> tuple[int, int, str]:
    """(Breite, Höhe, Hash der entpackten Pixeldaten) eines PNG, ohne es zu dekodieren."""
    daten = Path(pfad).read_bytes()
    assert daten[:8] == b"\x89PNG\r\n\x1a\n", f"{pfad} ist kein PNG"
    pos, idat, b, h = 8, b"", 0, 0
    while pos < len(daten):
        laenge, art = struct.unpack(">I4s", daten[pos : pos + 8])
        inhalt = daten[pos + 8 : pos + 8 + laenge]
        if art == b"IHDR":
            b, h = struct.unpack(">II", inhalt[:8])
        elif art == b"IDAT":
            idat += inhalt
        pos += 12 + laenge
    return b, h, hashlib.sha256(zlib.decompress(idat)).hexdigest()


class Bild:
    """Minimaler PNG-Leser (8 Bit, RGB/RGBA, ohne Interlace), unabhängig vom Prototyp."""

    def __init__(self, pfad: str | Path):
        daten = Path(pfad).read_bytes()
        assert daten[:8] == b"\x89PNG\r\n\x1a\n", f"{pfad} ist kein PNG"
        pos, idat = 8, b""
        while pos < len(daten):
            laenge, art = struct.unpack(">I4s", daten[pos : pos + 8])
            inhalt = daten[pos + 8 : pos + 8 + laenge]
            if art == b"IHDR":
                self.breite, self.hoehe, tiefe, farbtyp, _, _, interlace = struct.unpack(">IIBBBBB", inhalt)
                assert tiefe == 8 and farbtyp in (2, 6) and interlace == 0, (
                    f"{pfad}: PNG-Format nicht unterstützt"
                )
                self.kanaele = 3 if farbtyp == 2 else 4
            elif art == b"IDAT":
                idat += inhalt
            pos += 12 + laenge
        roh = zlib.decompress(idat)
        bpp, zl = self.kanaele, self.breite * self.kanaele
        self.px = bytearray(self.hoehe * zl)
        vorher = bytearray(zl)
        p = 0
        for y in range(self.hoehe):
            filt = roh[p]
            z = bytearray(roh[p + 1 : p + 1 + zl])
            p += 1 + zl
            for i in range(zl):
                a = z[i - bpp] if i >= bpp else 0
                b = vorher[i]
                c = vorher[i - bpp] if i >= bpp else 0
                if filt == 1:
                    z[i] = (z[i] + a) & 255
                elif filt == 2:
                    z[i] = (z[i] + b) & 255
                elif filt == 3:
                    z[i] = (z[i] + (a + b) // 2) & 255
                elif filt == 4:
                    pa, pb, pc = abs(b - c), abs(a - c), abs(a + b - 2 * c)
                    z[i] = (z[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
            self.px[y * zl : (y + 1) * zl] = z
            vorher = z

    def rgb(self, x: float, y: float) -> tuple[int, int, int]:
        x = min(max(int(round(x)), 0), self.breite - 1)
        y = min(max(int(round(y)), 0), self.hoehe - 1)
        i = (y * self.breite + x) * self.kanaele
        return self.px[i], self.px[i + 1], self.px[i + 2]

    def umgebung(self, x: float, y: float, radius: int):
        for dy in range(-radius, radius + 1):
            for dx in range(-radius, radius + 1):
                yield self.rgb(x + dx, y + dy)


@cache
def oklab(rgb: tuple[int, int, int]) -> tuple[float, float, float]:
    def lin(c: int) -> float:
        c = c / 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (lin(c) for c in rgb)
    l_ = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m_ = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s_ = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return (
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    )


def abstand(rgb1, rgb2) -> float:
    """Farbabstand in OKLab (euklidisch), das ΔE der Spec."""
    return math.dist(oklab(tuple(rgb1)), oklab(tuple(rgb2)))


def hex_rgb(wert: str) -> tuple[int, int, int]:
    w = wert.lstrip("#")
    return int(w[0:2], 16), int(w[2:4], 16), int(w[4:6], 16)


def median_farbe(bild: Bild, punkt: dict, kante: int = 5) -> tuple[int, int, int]:
    """Komponentenweiser Median der kante × kante Pixel um den Punkt."""
    px = list(bild.umgebung(punkt["x"], punkt["y"], kante // 2))
    return tuple(int(statistics.median(c[i] for c in px)) for i in range(3))  # type: ignore[return-value]


def teil_box(bild: Bild, hintergrund) -> tuple[int, int, int, int]:
    xs, ys = [], []
    for y in range(0, bild.hoehe, 2):
        for x in range(0, bild.breite, 2):
            if abstand(bild.rgb(x, y), hintergrund) > 0.03:
                xs.append(x)
                ys.append(y)
    assert xs, "Leinwand zeigt kein Teil (nur Hintergrund)"
    return min(xs), min(ys), max(xs), max(ys)


# --- Register, Tokens, Texte -------------------------------------------------------------------------------


def register() -> list[dict]:
    daten = json.loads((P / "src" / "befehle.json").read_text("utf-8"))
    return daten if isinstance(daten, list) else daten["befehle"]


def register_nach_id() -> dict[str, dict]:
    return {b["id"]: b for b in register()}


def quelltexte() -> list[Path]:
    src = P / "src"
    assert src.is_dir(), "spikes/ux-prototyp-2/src fehlt"
    return [p for p in src.rglob("*") if p.is_file() and "erzeugt" not in p.relative_to(src).parts]


def tokens() -> dict:
    return json.loads((ROOT / "docs" / "design" / "tokens.json").read_text("utf-8"))


def token_farben(thema: str) -> set[str]:
    daten = tokens()
    werte: set[str] = set()

    def lauf(n):
        if isinstance(n, dict):
            if n.get("$type") == "color":
                werte.add(n["$value"].upper())
            else:
                for v in n.values():
                    lauf(v)

    lauf(daten["farbe"][thema])
    for k, v in daten.items():
        if k != "farbe":
            lauf(v)
    return werte


def farbe(thema: str, name: str) -> str:
    return tokens()["farbe"][thema][name]["$value"].upper()


def akzent_farben(thema: str) -> set[str]:
    return {farbe(thema, k) for k in ("akzent", "akzent-flaeche", "auf-akzent")}


def i18n(sprache: str) -> dict:
    return json.loads((P / "src" / "i18n" / f"{sprache}.json").read_text("utf-8"))


def flach(d: dict, pre: str = ""):
    for k, v in d.items():
        if isinstance(v, dict):
            yield from flach(v, f"{pre}{k}.")
        else:
            yield f"{pre}{k}", v


def titel_de(befehl_id: str) -> str:
    return str(dict(flach(i18n("de"))).get(register_nach_id()[befehl_id]["titel"], "")).strip()


def muster_katalog() -> set[str]:
    text = (ROOT / "docs" / "design" / "muster.md").read_text("utf-8")
    return {m.group(1) for m in re.finditer(r"^\| \*\*([^*]+)\*\*[^|]*\|", text, re.M)}


def kuerzel_norm(k: str) -> str:
    """Kürzel vergleichbar machen: Strg/Cmd/⌘/Ctrl → mod, Shift/⇧ → umschalt, sortiert, klein."""
    k = k.replace("⌘", "mod+").replace("⇧", "umschalt+")
    ersatz = {
        "strg": "mod",
        "ctrl": "mod",
        "cmd": "mod",
        "control": "mod",
        "shift": "umschalt",
        "option": "alt",
        "⌥": "alt",
    }
    teile = [ersatz.get(t.strip().lower(), t.strip().lower()) for t in re.split(r"\s*\+\s*", k) if t.strip()]
    return "+".join(sorted(teile))


def inventar() -> list[dict]:
    """Referenzdaten des Kernteams. Fehlen sie, ist das ein Fehler (nicht überspringen, nicht selbst schreiben)."""
    assert INVENTAR.is_file(), (
        f"{INVENTAR.relative_to(ROOT)} fehlt: Das Befehlsinventar liefert das Kernteam (Referenzdaten); "
        "der test-author schreibt es nicht selbst (siehe PR „Offene Fragen“)."
    )
    daten = json.loads(INVENTAR.read_text("utf-8"))
    assert isinstance(daten, list) and daten, "befehlsinventar.json leer"
    return daten


def git(*args: str) -> subprocess.CompletedProcess:
    need("git")
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)


def streng_oder_skip(grund: str) -> None:
    if strict():
        pytest.fail(grund)
    pytest.skip(grund)
