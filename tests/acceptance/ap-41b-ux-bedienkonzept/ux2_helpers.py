"""Hilfen für die Abnahmetests von ap-41b: Prototyp bauen, Prüfwerkzeug aufrufen, Bilder und Modell auswerten.

Grundsatz wie ap-41: Das Prüfwerkzeug (`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> …
--json`, Ausgabe: genau ein JSON-Wert auf stdout) liefert nur **Rohdaten**: Namenslisten, Texte, Rechtecke,
Pixelkoordinaten, PNG-Dateien und unveränderte Schnappschüsse aus `window.__cee`. Alle Urteile (Zählen,
Vergleichen, Pixel- und Farbmessung in OKLCH, Formel für Volumen und Masse) fällt der Python-Test. Selbstberichtete
Ja/Nein-Werte gibt es nicht. Leere Listen dort, wo es Inhalt geben muss, sind ein Fehler.

Allgemeine Formen (alle Koordinaten in CSS-Pixeln bei 1440 × 900, devicePixelRatio 1, Ursprung links oben):

- `Rechteck` = `{x, y, breite, hoehe}`; `Punkt` = `{x, y}`.
- `Größe` = `{"value": <Zahl>, "unit": "mm"|"cm"|"m"|"N"|"kN"|…}` (ADR-057).
- `modell` = vollständige Ausgabe von `window.__cee.modell()` (Elementform `id`, `type`, `params`, `content`,
  `meta`; Namen unter `name`, `meta.name` oder `params.name`). Die drei Schritte des Halters heißen „Grundplatte“,
  „Steg“ und „Bohrungen“; ein verworfener Schritt bleibt im Modell und trägt `meta.verworfen: true`.
- `auswahl` = `window.__cee.auswahl()`: Liste der gewählten Element-IDs.
- `protokoll` = `window.__cee.protokoll()`: Liste `{befehl, parameter, quelle}` (`quelle` z. B. `"ki"`).
- `teil` = `window.__cee.teil()`: `{abmessungen_mm: [x, y, z], volumen_mm3, masse_g}`.
- `ansicht` = `window.__cee.ansicht()` ohne die Funktion `projektion`: `{darstellung: "koerper"|"kanten"|
  "durchsicht"|…, ort: {art: "teil"|"skizze", schritt: <ID oder null>}, pfad: [<Text je Glied>], kamera:
  {azimut_grad, hoehe_grad, abstand_mm, ziel: {x, y, z}}, lichter: [{art: "gerichtet"|"umgebung"|"halbkugel"|…,
  intensitaet}], geometrie: [{schritt: <ID>, sichtbar, flaechen, gestrichelt, hervorgehoben, ausgewaehlt}]
  (bool je Schritt), griffe: [{schritt: <ID>, parameter: <Name>}]}`.
- `aufbau` = Liste der sichtbaren Aufbauzeilen in Anzeigereihenfolge: `{name, schritt: <ID oder null>, ebene:
  <Einrückung 0, 1, …>, aria_selected: "true"|"false"|null, aria_disabled: …, hervorgehoben: <bool, Attribut
  data-hervorgehoben vorhanden>, zugehoerig: <bool>, status: {wort, symbol, farbe: "#RRGGBB"}|null}`.
- `inspektor` = Inhalt der Zone `inspektor`: `{titel, gruppen: [{name, felder: [{name, text, wert_text,
  editierbar: <bool, input ohne readonly/disabled>, berechnet: <bool, Kennzeichnung sichtbar>}]}],
  befehle: [data-befehl aller Bedienelemente], texte: [sichtbare Texte]}`.
- `leinwand` = PNG nur mit dem Inhalt der three.js-Leinwand (ohne darüberliegende DOM-Elemente, z. B. über
  `canvas.toDataURL` mit `preserveDrawingBuffer`), Pfad als String; dazu `leinwand_rechteck` (Lage der Leinwand
  auf der Seite). Pixelkoordinaten in Leinwand-PNGs sind relativ zur Leinwand.
- `huellbox` = projizierte Hüllbox eines Schritts aus `projektion(id)` als Rechteck in Seitenkoordinaten.

Befehle und Felder (Thema `hell`, Sprache `de`, sofern nicht anders genannt):

- `zustaende --out <dir>`: Liste `{zustand, thema, datei, bereit_ms, eingaben}` für 17 Zustände × 2 Themen.
- `zustand --name <name>`: `{bereit_ms, zustand_gezeigt, befunde: [Texte], konsolenfehler: [Texte], aufbau,
  modell}` (lädt nur die Adresse).
- `zonen`: Liste je Zustand `{zustand, fenster: {breite, hoehe}, zonen: [{zone, sichtbar, rechteck}] (alle
  Elemente mit data-zone), panels: [data-panel], kopf: {pfad: [Text je Glied], texteingaben: [{platzhalter,
  kuerzel_text}], reiter: [Text], rueckgaengig: [{befehl, text}] (Bedienelemente mit data-befehl
  bearbeiten.rueckgaengig in der Kopfzeile, sichtbarer Text inkl. Kürzel)}, modell_texte: [sichtbare Texte
  innerhalb der Zone modell]}`.
- `lesbarkeit`: Liste je Thema `{thema, ansicht, leinwand, leinwand_rechteck, viewport: "#RRGGBB",
  flaechen: {oben, vorn, rechts} (projizierte Flächenmitten der Grundplatte als Punkte in der Leinwand),
  kanten: [{name, mitte: Punkt, flaechen: [Punkt, …] (Mitten der angrenzenden sichtbaren Flächen)}]
  (alle sichtbaren äußeren Kanten von Grundplatte und Steg), auswahl_steg: {auswahl, leinwand, umriss: [Punkt …]
  (projizierte Umrisslinie des Stegs, alle 10 px, Leinwandkoordinaten), huellbox (Leinwandkoordinaten)},
  einpassen: {modellzone: Rechteck, leinwand_vorher, leinwand, leinwand_rechteck}}` (Zustand `halter`;
  Steg per Mausklick gewählt; Einpassen nach Drehen und dreifachem Herauszoomen per Knopf im Modell).
- `navigation`: `{vorher: {kamera, modell, auswahl}, nach_drehen: {kamera}, nach_schieben: {kamera},
  nach_zoomen: {kamera}, nachher: {kamera, modell, auswahl}, rechtsklick: {kamera_vorher, kamera_nachher,
  kontext_befehle: [data-befehl]}, ziehen_mit_ansicht: {kamera_vorher, kamera_waehrend, zeiger_texte_waehrend:
  [{text, abstand_px}], modell}, ziehen_ohne_ansicht: {modell}, einstellung: {navigationsprofil}}`
  (Zustand `schritt`; Abläufe wie im Scenario; Ziehen jeweils mit derselben Mausbewegung).
- `auswahl`: `{klicks: [{ziel: "grundplatte-oben"|"steg-vorn"|"bohrung-wand", auswahl, aufbau, inspektor,
  modell}], aufbau_steg: {auswahl, leinwand, umriss, huellbox}, flaeche_steg: {auswahl},
  hover_aufbau_bohrungen: {auswahl_vorher, auswahl_nachher, ansicht, leinwand}, hover_flaeche_grundplatte:
  {auswahl_vorher, auswahl_nachher, aufbau}, nur_beim_ueberfahren: [{zustand, befehl, sichtbar_ohne,
  sichtbar_mit}] (je Bedienelement in allen Zuständen: sichtbar ohne bzw. mit Überfahren seines Elternelements)}`.
- `inspektor`: `{teil: {inspektor, teil, modell}, grundplatte: {inspektor, auswahl, modell},
  live: {nach_tippen: {teil, inspektor_teil, modell, protokoll}, nach_esc: {…}, nach_enter: {…},
  nach_rueckgaengig: {…}, vorher: {…}}}` (`inspektor_teil` = Gruppe „Teil“, sichtbar während der Eingabe).
- `griffe`: `{halter: {ansicht, auswahl}, schritt: {ansicht, auswahl}, ziehen: {zeiger_texte_waehrend:
  [{text, abstand_px}], zeiger_texte_1000ms: [{text, abstand_px}], teil, modell}, tippen: {teil, modell,
  protokoll_vorher, protokoll}, esc: {teil, modell, protokoll_vorher, protokoll}}`; `abstand_px` = Abstand der
  Textmitte vom Zeiger. Ziehen um eine Strecke, die 4 mm entspricht.
- `orte`: `{hinein: [{weg: "doppelklick-flaeche"|"doppelklick-aufbau"|"knopf", dauer_ms, ansicht, modell}],
  skizze: {aufbau, ansicht, modell}, mass_80: {fokus: {gruppe, feld}|null, auswahl_start, auswahl_ende,
  wert_text}}`.
- `ablauf <a…h> [--variante <name>]`: immer `eingaben` (Zahl echter Klicks und Tasten), `modell`, `teil`,
  `ansicht`, `protokoll`, `aufbau`; weitere Felder je Ablauf:
  - `a`: `auswahl`.
  - `b`: (Steg 40 mm, zwei Längskanten oben R 3). `b --variante befund`: `aufbau` (im Zustand `befund`),
    `modell_status: [{schritt, wort, symbol, farbe}]` (Statusanzeige im Modell), `teil_nach_9mm`,
    `modell_nach_9mm`, `korrektur_text`, `befunde_nach_korrektur: [Texte]`, `modell` (nach Korrektur).
  - `c`: `modell`.
  - `d`: `vergleich: [{feld, vorher, nachher}]` (Anzeigetexte), `haupt_modell_vor_uebernehmen`,
    `haupt_modell_nach_uebernehmen`, `entwurf_zustand` (Text). `d --variante verwerfen`: `modell_vorher`,
    `modell_nach_versuch_ohne_begruendung`, `verwerfen_knopf_ohne_begruendung: {disabled, aria_disabled}`,
    `modell_nachher`, `ansicht_ergebnis: [Namen]`, `ansicht_alle_entwuerfe: [{name, begruendung}]`,
    `verworfen_name`.
  - `e`: `kopf_rueckgaengig: [{befehl, text}]`, `suche_zurueck: {treffer: [{befehl, kuerzel_text}]}`.
    `e --variante elemente`: `gruppe_elemente: [Texte]`, `auswahl`, `aufbau`.
  - `f`: `modell_vorher`, `undo_schritte: [modell nach dem 1., 2. Strg/Cmd+Z]`, `inspektor`, `auswahl`.
  - `g --variante fertig|esc|pfad` (ohne Variante = `fertig`).
  - `h`: `leinwand`, `huellbox_leinwand` (Rechteck in Leinwandkoordinaten), `viewport: "#RRGGBB"`,
    `koerper: {leinwand, huellbox_leinwand}` (Zustand `halter` in Darstellung Körper).
    `h --variante taste-w`: `folge: [ansicht.darstellung nach W, W, W, Umschalter „Durchsicht“]`,
    `umschalter: Rechteck`, `modellzone: Rechteck`, `modell_vorher`, `auswahl_vorher`, `auswahl`.
- `kontext`: `{leiste: {befehle: [data-befehl in Reihenfolge], rechteck}, huellbox_grundplatte, modellzone,
  rechtsklick_modell: [data-befehl], rechtsklick_aufbau: [data-befehl], verwerfen_steg: {modell_vorher,
  teil_vorher, modell, teil, ansicht, modell_nach_rueckgaengig, teil_nach_rueckgaengig}}`.
- `befehle`: Liste `{befehl, treffer: [{befehl, kuerzel_text}], protokoll_neu: [{befehl, parameter, quelle}]}`.
- `ki`: `{befehl_kanten: {protokoll_neu, ansicht, gespraech_sichtbar_rechteck: Rechteck|null},
  wunsch: {eintraege: [Text der Suchliste], inspektor_vorher: Rechteck, gespraech: Rechteck, panels,
  karte: {befehlszeilen: [Text], quelle, muster, hauptaktionen: [data-befehl]}, modell_vorher, modell_bei_karte},
  verwerfen: {modell_vorher, modell, karten: [..]}, anhalten: {modell_vorher, modell, karten: [..]},
  unbekannt: {modell_vorher, modell, texte: [sichtbare Texte im Gespräch], modale_dialoge: [..]},
  kennzeichnung: [{zustand, element: "gespraech"|"karte", quelle, muster, texte: [..], hauptaktionen: [..]}]}`.
- `simulation`: `{reiter: {kopf_reiter: [Text], aufbau, modell_zone_muster_kandidaten: [{wert, rechteck}],
  modellzone: Rechteck, zonen: [{zone, sichtbar, rechteck}], panels}, kraft_200: {legende_max_vorher: Text,
  legende_max: Text, modell}, suche_kraft: {treffer: [{befehl, kuerzel_text}]}, kennzeichnung: {legende_texte,
  inspektor_texte}}`.
- `budget`: `{zustaende: [Z …], kuerzel: [Text]}` mit je Zustand und Thema `Z = {zustand, thema, panels,
  arbeitsbereiche, werkzeugleisten: [Beschreibung je role=toolbar/Werkzeugleiste], menueleisten: [...],
  hauptaktionen: [data-befehl je data-hauptaktion], muster: [data-muster], muster_kandidaten:
  [data-muster-kandidat], modale_dialoge: [...], body_schrift, ohne_befehl: [...], befehle_gefunden: [...],
  farben: [{wert: "#RRGGBB", alpha, ort, akzent_rolle}], overlays: [{art, rechteck}] (sichtbare Elemente mit
  position fixed/absolute außerhalb der fünf Zonen bzw. über ihnen; `art` aus data-overlay), karten:
  [{muster, quelle}], legenden_texte: [..]}`.
- `texte`: `{zustaende: [{zustand, sprache: "schluessel"|"de"|"en", sichtbarer_text: [..], modell}]}`.
- `anfragen`: `{anfragen: [URL jeder Netzanfrage aller Zustände und Abläufe A bis H]}`.
- `messen`: `{auswahl_p95_ms, hover_p95_ms, wert_live_p95_ms, darstellung_p95_ms, suche_p95_ms}`.
"""

# ruff: noqa: E501  (Schnittstellenbeschreibung im Docstring)

from __future__ import annotations

import json
import math
import re
import struct
import subprocess
import zlib
from functools import cache
from pathlib import Path

from conftest import ROOT, need

P = ROOT / "spikes" / "ux-prototyp-2"
LEITFADEN = ROOT / "docs" / "spikes" / "ux-prototyp-2.md"

ZUSTAENDE = [
    "leer", "halter", "schritt", "ziehen", "skizze", "extrusion", "kanten", "durchsicht", "befund", "teile",
    "verbindung", "suche", "entwuerfe", "vergleich", "ki-gespraech", "ki-vorschlag", "simulation",
]  # fmt: skip
THEMEN = ("hell", "dunkel")

# Sollwerte des Halters (design.md, „Beispielteil Halter“)
DICHTE_G_MM3 = 1.24e-3


def volumen(L=80.0, B=50.0, T=8.0, r=3.0, d=6.0, l=60.0, b=10.0, h=30.0, verrundungen=()) -> float:  # noqa: E741
    """Formel aus design.md; `verrundungen` = [(Anzahl Kanten, Radius, Kantenlänge), …]."""
    v = L * B * T - 4 * r * r * (1 - math.pi / 4) * T - 2 * math.pi * (d / 2) ** 2 * T + l * b * h
    for n, rv, kl in verrundungen:
        v -= n * rv * rv * (1 - math.pi / 4) * kl
    return v


def nahe(ist: float, soll: float, rel: float = 0.001) -> bool:
    return abs(ist - soll) <= abs(soll) * rel


# --- Prototyp und Prüfwerkzeug -----------------------------------------------------------------------

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


def _pruefen_roh(args: tuple[str, ...], timeout: int = 900):
    r = npm("run", "--silent", "pruefen", "--", *args, "--json", timeout=timeout)
    assert r.returncode == 0, f"pruefen {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


@cache
def _pruefen_gemerkt(args: tuple[str, ...]):
    return _pruefen_roh(args)


def pruefen(*args: str, frisch: bool = False):
    """Prüfwerkzeug aufrufen und die JSON-Ausgabe zurückgeben (je Befehl einmal je Lauf, außer `frisch`)."""
    return _pruefen_roh(args) if frisch else _pruefen_gemerkt(args)


def ablauf(name: str, variante: str | None = None) -> dict:
    args = ["ablauf", name]
    if variante:
        args += ["--variante", variante]
    return pruefen(*args)


# --- Modell -------------------------------------------------------------------------------------------


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
    """Das Element mit diesem Namen; muss eindeutig sein."""
    treffer = [k for k in elemente(modell) if name_von(k) == name]
    assert len(treffer) == 1, f"Element „{name}“ nicht eindeutig im Modell: {len(treffer)}"
    return treffer[0]


def id_von(modell, name: str) -> str:
    return nach_name(modell, name)["id"]


def finde(modell, *typen: str) -> list[dict]:
    """Elemente, deren `type` einen der Namen (ohne Groß-/Kleinschreibung) enthält."""
    return [k for k in elemente(modell) if any(t in k["type"].lower() for t in typen)]


def verworfen(element: dict) -> bool:
    return bool((element.get("meta") or {}).get("verworfen") or element.get("verworfen"))


def mm(groesse) -> float:
    faktor = {"mm": 1.0, "cm": 10.0, "m": 1000.0}[groesse["unit"]]
    return groesse["value"] * faktor


def groessen(element: dict) -> list[float]:
    """Alle Längen (in mm) unter `params` eines Elements, auch verschachtelt."""
    werte = []
    for k in knoten(element.get("params") or {}):
        if set(k) >= {"value", "unit"} and k["unit"] in ("mm", "cm", "m"):
            werte.append(mm(k))
    return werte


def zahl(text: str) -> float:
    """Erste Zahl in einem Anzeigetext, deutsch oder englisch formatiert („49,49“, „1.234,5“, „49.49“)."""
    m = re.search(r"-?\d[\d.   ]*(?:,\d+)?|-?\d+(?:\.\d+)?", text)
    assert m, f"keine Zahl in „{text}“"
    roh = m.group(0).replace(" ", "").replace(" ", "").replace(" ", "")
    if "," in roh:
        roh = roh.replace(".", "").replace(",", ".")
    elif roh.count(".") > 1 or re.fullmatch(r"-?\d{1,3}(\.\d{3})+", roh):
        roh = roh.replace(".", "")
    return float(roh)


def feld(inspektor: dict, name: str, gruppe: str | None = None) -> dict:
    treffer = [
        f
        for g in inspektor["gruppen"]
        if gruppe is None or g["name"] == gruppe
        for f in g["felder"]
        if f["name"] == name
    ]
    assert len(treffer) == 1, f"Feld „{name}“ (Gruppe {gruppe}) nicht eindeutig im Inspektor: {inspektor}"
    return treffer[0]


def feldtext(f: dict) -> str:
    return str(f.get("wert_text") or f.get("text") or "")


def zeile(aufbau: list[dict], name: str) -> dict:
    treffer = [z for z in aufbau if z["name"] == name]
    assert len(treffer) == 1, f"Aufbauzeile „{name}“ nicht eindeutig: {[z['name'] for z in aufbau]}"
    return treffer[0]


def geometrie(ansicht: dict, schritt_id: str) -> dict:
    treffer = [g for g in ansicht["geometrie"] if g["schritt"] == schritt_id]
    assert len(treffer) == 1, f"Geometrie von {schritt_id} nicht eindeutig in ansicht()"
    return treffer[0]


# --- Rechtecke ----------------------------------------------------------------------------------------


def flaeche(r: dict) -> float:
    return max(0.0, r["breite"]) * max(0.0, r["hoehe"])


def ueberlappung(a: dict, b: dict) -> float:
    w = min(a["x"] + a["breite"], b["x"] + b["breite"]) - max(a["x"], b["x"])
    h = min(a["y"] + a["hoehe"], b["y"] + b["hoehe"]) - max(a["y"], b["y"])
    return max(0.0, w) * max(0.0, h)


def innerhalb(innen: dict, aussen: dict, rand: float = 0.5) -> bool:
    return (
        innen["x"] >= aussen["x"] - rand
        and innen["y"] >= aussen["y"] - rand
        and innen["x"] + innen["breite"] <= aussen["x"] + aussen["breite"] + rand
        and innen["y"] + innen["hoehe"] <= aussen["y"] + aussen["hoehe"] + rand
    )


# --- Bilder: PNG lesen, OKLab/OKLCH -------------------------------------------------------------------


class Bild:
    """Minimaler PNG-Leser (8 Bit, RGB/RGBA, ohne Interlace) – keine Abhängigkeit, unabhängig vom Prototyp."""

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
        bpp, zeile_len = self.kanaele, self.breite * self.kanaele
        self.px = bytearray(self.hoehe * zeile_len)
        vorher = bytearray(zeile_len)
        p = 0
        for y in range(self.hoehe):
            filt = roh[p]
            z = bytearray(roh[p + 1 : p + 1 + zeile_len])
            p += 1 + zeile_len
            for i in range(zeile_len):
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
            self.px[y * zeile_len : (y + 1) * zeile_len] = z
            vorher = z

    def rgb(self, x: int, y: int) -> tuple[int, int, int]:
        x = min(max(int(round(x)), 0), self.breite - 1)
        y = min(max(int(round(y)), 0), self.hoehe - 1)
        i = (y * self.breite + x) * self.kanaele
        return self.px[i], self.px[i + 1], self.px[i + 2]

    def umgebung(self, x: float, y: float, radius: int):
        for dy in range(-radius, radius + 1):
            for dx in range(-radius, radius + 1):
                yield self.rgb(x + dx, y + dy)


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


def hell_l(rgb) -> float:
    """OKLCH L (= OKLab L)."""
    return oklab(rgb)[0]


def abstand(rgb1, rgb2) -> float:
    """Farbabstand in OKLab/OKLCH (euklidisch)."""
    a, b = oklab(rgb1), oklab(rgb2)
    return math.dist(a, b)


def hex_rgb(wert: str) -> tuple[int, int, int]:
    w = wert.lstrip("#")
    return int(w[0:2], 16), int(w[2:4], 16), int(w[4:6], 16)


def median_l(bild: Bild, punkt: dict, groesse: int = 7) -> float:
    werte = sorted(hell_l(c) for c in bild.umgebung(punkt["x"], punkt["y"], groesse // 2))
    return werte[len(werte) // 2]


# --- Register, Tokens, Texte --------------------------------------------------------------------------


def register() -> list[dict]:
    daten = json.loads((P / "src" / "befehle.json").read_text("utf-8"))
    return daten if isinstance(daten, list) else daten["befehle"]


def quelltexte() -> list[Path]:
    src = P / "src"
    assert src.is_dir(), "spikes/ux-prototyp-2/src fehlt"
    return [p for p in src.rglob("*") if p.is_file() and "erzeugt" not in p.relative_to(src).parts]


def tokens() -> dict:
    return json.loads((ROOT / "docs" / "design" / "tokens.json").read_text("utf-8"))


def token_farben(thema: str) -> set[str]:
    """Alle Farbwerte (#RRGGBB, groß) des Themas: `farbe.<thema>` und themenunabhängige wie `achse`."""
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
    reg = {b["id"]: b for b in register()}
    return str(dict(flach(i18n("de"))).get(reg[befehl_id]["titel"], "")).strip()


def muster_katalog() -> set[str]:
    text = (ROOT / "docs" / "design" / "muster.md").read_text("utf-8")
    return {m.group(1) for m in re.finditer(r"^\| \*\*([^*]+)\*\*[^|]*\|", text, re.M)}
