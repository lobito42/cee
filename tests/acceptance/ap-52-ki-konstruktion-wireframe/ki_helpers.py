"""Hilfen für die Abnahmetests von ap-52 (KI konstruiert Wireframe-Basics): Prüfwerkzeug `ki`, Testmodell, Prüfer.

Grundsatz: Das Prüfwerkzeug (`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- ki <unterbefehl> … --json`)
liefert nur Rohdaten (Schnappschüsse, Anfragen, Antworten); jedes Urteil (Prüfer nachrechnen, Zählen, Median,
Vergleichen) fällt der Test. Prüfer rechnet `pruefer_pruefen` selbst aus Graph und Worker-Ergebnis des Schnappschusses
nach (ADR-053), nie aus Text oder Selbstauskunft des Anbieters.

Festgeschriebene Annahmen, wo design.md nur die Wirkung nennt (im PR unter „Offene Fragen“ gemeldet):

- Umgebungsvariablen `CEE_KI_*` werden vom Test gesetzt und an Vorschau und Brücke durchgereicht (design.md Abschnitt 6).
  Geerbte `CEE_KI_*` aus der Umgebung des Testlaufs werden entfernt.
- Schnappschuss von `ki ablauf` wie in ap-50 (`graph`, `ergebnis`, `befunde`, `struktur[]` mit `id`/`zustaende`,
  `graph_hash`, `konsolenfehler`, `anfragen`, `bereit_ms`) plus `chat`, `geister`, `verlauf`, `ki_anfragen`,
  `ki_bereit_ms` (design.md Abschnitt 6). Dazu: `chat.kopf` (Text des Chat-Kopfes mit Anbieter und Ziel),
  `chat.nachrichten[]` mit `rolle` (`mensch`/`ki`/…) und `text`, `chat.karten[]` mit den Feldern des Änderungssatzes
  (`titel`, `anbieter`, `aufrufe[]`, `neu`, `verworfen`, `ausgeblendet`, `befunde`), `offen` und `aktionen[]`
  (`{befehl, haupt}`; genau eine Aktion mit `haupt` = true).
- Geister: `[{element, art, lage_mm}]` mit `art` = Elementtyp (`point`, `segment`); Lage wie bei `szene` in ap-50
  (Punkt: `[x, y, z]`; Strecke: `{start, end}` in mm).
- Schritte: `{chat: <Satz>}`, `{befehl: "chat.uebernehmen" | "chat.verwerfen"}`, `{befehl: "ki.anbieter-waehlen",
  args: {id: "openai-kompatibel"}}`, `{befehl: "bearbeiten.rueckgaengig"}`, `{eigenschaft: …}` wie in ap-50.
  Der Schritt `chat` kehrt zurück, sobald Karte oder Antwort da ist; `ki_bereit_ms` misst Senden bis dahin.
- `ki anbieter`: `{aktiv, anbieter: [{id, verfuegbar, ziel, befund}]}`; `befund` ist Text oder `{code, …}`.
- Werkzeugergebnisse stehen als JSON-Text in Nachrichten mit Rolle `tool` der Anfrage an das Testmodell
  (OpenAI-Format); Lagen darin sind Größen-Strings wie `"1200 mm"`.
- `ki pruefsatz`-Ausgabe wie design.md Abschnitt 5; `bestanden` und `gesamt` sind Zahlen.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import math
import os
import re
import subprocess
import sys
import tempfile
import threading
from collections.abc import Callable
from functools import cache
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from conftest import ROOT

# Hilfen aus anderen Testordnern: Suchpfad hier selbst setzen (CI verteilt Testdateien auf vier Läufe).
for _ordner in ("ap-41b-ux-bedienkonzept", "ap-41c-ux-schlankes-menue", "ap-50-wireframe-basics"):
    _pfad = str(ROOT / "tests" / "acceptance" / _ordner)
    if _pfad not in sys.path:
        sys.path.insert(0, _pfad)

from grundlagen_helpers import P, bauen, kanon, name_von, register, verworfen  # noqa: E402,F401
from wf_helpers import (  # noqa: E402,F401  (ausgang, flach, nahe, pos, vec: für die Testdateien)
    Ablauf,
    ausgang,
    betrag,
    flach,
    nahe,
    pos,
    vec,
    winkel,
)

GOLDEN = ROOT / "tests" / "golden" / "ap-52-ki-konstruktion-wireframe" / "wireframe-aufgaben.json"
WERKZEUGE = [
    "referenz_koordinatensystem",
    "referenz_punkt",
    "referenz_punkt_relativ",
    "referenz_gerade",
    "referenz_halbgerade",
    "referenz_strecke",
    "element_ausblenden",
    "element_verwerfen",
]
TOL_MM = 1e-6
TOL_RAD = 1e-9


def golden() -> dict:
    assert GOLDEN.is_file(), "tests/golden/ap-52-ki-konstruktion-wireframe/wireframe-aufgaben.json fehlt"
    return json.loads(GOLDEN.read_text(encoding="utf-8"))


def aufgaben() -> dict[str, dict]:
    return {a["id"]: a for a in golden()["aufgaben"]}


# --- Prüfwerkzeug ---------------------------------------------------------------------------------------


def _umgebung(extra: dict | None) -> dict:
    env = {k: v for k, v in os.environ.items() if not k.startswith("CEE_KI_")}
    env.update(extra or {})
    return env


def ki_roh(args: list[str], env: dict | None = None, timeout: int = 1200) -> subprocess.CompletedProcess:
    """`pruefen -- ki <args> --json` mit eigener Umgebung; Rohausgabe (Text) zurück."""
    bauen()
    return subprocess.run(
        ["npm", "run", "--silent", "pruefen", "--", "ki", *args, "--json"],
        cwd=P,
        capture_output=True,
        text=True,
        timeout=timeout,
        env=_umgebung(env),
    )


def ki_pruefen(args: list[str], env: dict | None = None, timeout: int = 1200):
    r = ki_roh(args, env, timeout)
    assert r.returncode == 0, f"pruefen ki {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


class KiAblauf(Ablauf):
    """Schrittliste für `pruefen -- ki ablauf`; `roh` hält Ausgabe und Fehlerausgabe für Geheimnis-Prüfungen."""

    roh: str = ""

    def laufen(self, zustand: str, env: dict | None = None, **_kw) -> KiAblauf:  # type: ignore[override]
        with tempfile.TemporaryDirectory() as d:
            f = Path(d) / "ablauf.json"
            f.write_text(json.dumps(self.schritte), encoding="utf-8")
            r = ki_roh(["ablauf", "--zustand", zustand, "--datei", str(f)], env, timeout=1800)
        assert r.returncode == 0, f"pruefen ki ablauf: {r.stdout[-1500:]}{r.stderr[-1500:]}"
        self.roh = r.stdout + r.stderr
        erg = json.loads(r.stdout)
        self.snaps = erg if isinstance(erg, list) else erg["schnappschuesse"]
        assert len(self.snaps) == len(self.schritte), (
            f"{len(self.snaps)} Schnappschüsse für {len(self.schritte)} Schritte"
        )
        return self


def satz_uebernehmen(
    zustand: str, satz: str, env: dict | None = None, vorab: list[dict] | None = None
) -> KiAblauf:
    """Zustand laden, (ggf. Anbieter wählen), Satz senden, Karte übernehmen."""
    a = KiAblauf()
    for i, s in enumerate(vorab or []):
        a.add(f"vorab{i}", **s)
    a.add("senden", chat=satz)
    a.add("uebernehmen", befehl="chat.uebernehmen")
    return a.laufen(zustand, env)


@cache
def regel_lauf(zustand: str, satz: str) -> tuple[dict, dict]:
    """(Schnappschuss vorher, Schnappschuss nach Übernehmen) mit der Satzerkennung."""
    a = satz_uebernehmen(zustand, satz)
    return a.s("anfang"), a.s("uebernehmen")


def ablauf_ap50() -> None:
    """Führt die Prüfung „Ablauf Koordinatensystem, Punkte, Linien“ aus ap-50 unverändert aus (Datei per Pfad geladen)."""
    import importlib.util  # noqa: PLC0415

    pfad = ROOT / "tests" / "acceptance" / "ap-50-wireframe-basics" / "test_vorschau.py"
    spec = importlib.util.spec_from_file_location("ap50_test_vorschau", pfad)
    assert spec and spec.loader, pfad
    modul = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modul)
    modul.test_anlegen_koordinatensystem_punkte_linien()


# --- Auslesen -------------------------------------------------------------------------------------------


def antworten(snap: dict) -> list[str]:
    return [n.get("text", "") for n in snap["chat"]["nachrichten"] if n.get("rolle") == "ki"]


def karten(snap: dict) -> list[dict]:
    return snap["chat"]["karten"]


def wurzel_ids(graph: list) -> set[str]:
    kinder = {
        k if isinstance(k, str) else k["id"] for e in flach(graph).values() for k in e.get("content", [])
    }
    return {i for i in flach(graph) if i not in kinder}


def neue_wurzeln(vorher: dict, nachher: dict) -> list[dict]:
    alt = set(flach(vorher["graph"]))
    g = flach(nachher["graph"])
    return [g[i] for i in g if i in wurzel_ids(nachher["graph"]) and i not in alt]


def nach_namen(snap: dict, name: str) -> dict:
    treffer = [e for e in flach(snap["graph"]).values() if name_von(e) == name or e["id"] == name]
    assert len(treffer) == 1, f"Element „{name}“: {len(treffer)} Treffer"
    return treffer[0]


def mm_aus_text(text: str) -> float | None:
    m = re.fullmatch(r"\s*(-?\d+(?:[.,]\d+)?)\s*(mm|cm|m)\s*", text)
    if not m:
        return None
    return float(m.group(1).replace(",", ".")) * {"mm": 1.0, "cm": 10.0, "m": 1000.0}[m.group(2)]


def laengen_in(wert) -> list[float]:
    """Alle Größen-Strings (Länge) in einem JSON-Baum, in mm."""
    if isinstance(wert, str):
        w = mm_aus_text(wert)
        return [] if w is None else [w]
    if isinstance(wert, dict):
        return [x for v in wert.values() for x in laengen_in(v)]
    if isinstance(wert, list):
        return [x for v in wert for x in laengen_in(v)]
    return []


# --- Prüfer (selbst nachgerechnet) ----------------------------------------------------------------------


def _kante(snap: dict, e: dict) -> tuple[tuple, tuple]:
    o = ausgang(snap["ergebnis"], e["id"], e["type"])
    return vec(o["start"]), vec(o["end"])


def _ecke_id(verweis: str) -> str:
    return verweis.split(".")[0]


def pruefer_pruefen(aufgabe: dict, vorher: dict, nachher: dict) -> list[str]:
    """Wendet die Prüfer der Aufgabe auf den Schnappschuss nach Übernehmen an; Rückgabe: Gründe (leer = bestanden)."""
    gruende: list[str] = []
    neu = neue_wurzeln(vorher, nachher)
    neu_typ: dict[str, list[dict]] = {}
    for e in neu:
        neu_typ.setdefault(e["type"], []).append(e)
    g = flach(nachher["graph"])
    ergebnis = nachher["ergebnis"]

    def fehl(text: str) -> None:
        gruende.append(f"{aufgabe['id']}: {text}")

    for p in aufgabe["pruefer"]:
        art = p["art"]
        try:
            if art == "neu":
                ist = {t: len(v) for t, v in neu_typ.items()}
                if ist != p["anzahl"]:
                    fehl(f"neue Elemente {ist}, erwartet {p['anzahl']}")
            elif art == "kinder":
                for e in neu_typ.get(p["typ"], []):
                    if len(e["content"]) != p["anzahl"]:
                        fehl(f"{p['typ']} hat {len(e['content'])} Kinder statt {p['anzahl']}")
            elif art == "frame_ursprung_mm":
                for e in neu_typ.get("frame", []):
                    if not nahe(pos(ergebnis, e["id"], "origin"), tuple(p["lage"]), TOL_MM):
                        fehl(f"Ursprung {pos(ergebnis, e['id'], 'origin')}")
            elif art == "frame_x_richtung":
                w = math.radians(p["rz_grad"])
                soll = (math.cos(w), math.sin(w), 0.0)
                for e in neu_typ.get("frame", []):
                    ist = vec(ausgang(ergebnis, e["id"], "x")["direction"], "1")
                    if winkel(ist, soll) > TOL_RAD:
                        fehl(f"x-Achse {ist}")
            elif art == "punkt_lage_mm":
                for e in neu_typ.get("point", []):
                    if not nahe(pos(ergebnis, e["id"]), tuple(p["lage"]), TOL_MM):
                        fehl(f"Punkt bei {pos(ergebnis, e['id'])}")
            elif art in (
                "umlauf",
                "laengen_sortiert_mm",
                "benachbart_senkrecht",
                "ecken_z_mm",
                "punkt_ueber_mitte",
            ):
                kanten = neu_typ.get("segment", [])
                punkte = {e["id"]: e for e in neu_typ.get("point", [])}
                enden = [(_ecke_id(k["inputs"]["a"]), _ecke_id(k["inputs"]["b"])) for k in kanten]
                grad: dict[str, int] = {}
                for a, b in enden:
                    grad[a] = grad.get(a, 0) + 1
                    grad[b] = grad.get(b, 0) + 1
                if art == "umlauf":
                    if len(grad) != p["ecken"] or set(grad.values()) != {2} or not set(grad) <= set(punkte):
                        fehl(f"kein Umlauf über {p['ecken']} Eckpunkte: Grade {grad}")
                    else:  # zusammenhängend
                        stand, rest = {enden[0][0]}, list(enden)
                        while True:
                            weiter = [k for k in rest if k[0] in stand or k[1] in stand]
                            if not weiter:
                                break
                            for k in weiter:
                                stand |= set(k)
                                rest.remove(k)
                        if rest:
                            fehl("Strecken bilden mehr als einen Umlauf")
                elif art == "laengen_sortiert_mm":
                    ls = sorted(
                        betrag(tuple(b - a for a, b in zip(*_kante(nachher, k), strict=True))) for k in kanten
                    )
                    if len(ls) != len(p["werte"]) or not nahe(ls, p["werte"], TOL_MM):
                        fehl(f"Längen {ls}")
                elif art == "benachbart_senkrecht":
                    for ecke in grad:
                        d = []
                        for k, (a, b) in zip(kanten, enden, strict=True):
                            if ecke in (a, b):
                                s0, s1 = _kante(nachher, k)
                                d.append(tuple(y - x for x, y in zip(s0, s1, strict=True)))
                        if len(d) == 2 and abs(winkel(d[0], d[1]) - math.pi / 2) > TOL_RAD:
                            fehl(f"Ecke {ecke} nicht senkrecht")
                elif art == "ecken_z_mm":
                    for ecke in grad:
                        if abs(pos(ergebnis, ecke)[2] - p["wert"]) > TOL_MM:
                            fehl(f"Ecke {ecke} bei z = {pos(ergebnis, ecke)[2]}")
                else:  # punkt_ueber_mitte
                    frei = [e for i, e in punkte.items() if i not in grad]
                    if len(frei) != 1 or len(grad) != 4:
                        fehl(f"{len(frei)} freie Punkte, {len(grad)} Ecken")
                    else:
                        mitte = tuple(sum(pos(ergebnis, i)[k] for i in grad) / 4 for k in range(3))
                        soll = tuple(mitte[k] + p["abstand_mm"] * p["richtung"][k] for k in range(3))
                        if not nahe(pos(ergebnis, frei[0]["id"]), soll, TOL_MM):
                            fehl(f"Punkt bei {pos(ergebnis, frei[0]['id'])}, erwartet {soll}")
            elif art == "punkt_relativ":
                ref = nach_namen(vorher, _ecke_id(p["ref"]))
                for e in neu_typ.get("point", []):
                    if e["inputs"].get("ref") != f"{ref['id']}.{p['ref'].split('.')[1]}":
                        fehl(f"Punkt hat ref = {e['inputs'].get('ref')!r}")
                    soll = tuple(
                        a + b
                        for a, b in zip(pos(vorher["ergebnis"], ref["id"]), p["versatz_mm"], strict=True)
                    )
                    if not nahe(pos(ergebnis, e["id"]), soll, TOL_MM):
                        fehl(f"Punkt bei {pos(ergebnis, e['id'])}, erwartet {soll}")
            elif art == "halbgerade_bezug":
                ref = nach_namen(vorher, _ecke_id(p["a"]))
                punkte = neu_typ.get("point", [])
                for e in neu_typ.get("ray", []):
                    if e["inputs"].get("a") != f"{ref['id']}.point":
                        fehl(f"Halbgerade a = {e['inputs'].get('a')!r}")
                    if len(punkte) != 1 or e["inputs"].get("b") != f"{punkte[0]['id']}.point":
                        fehl(f"Halbgerade b = {e['inputs'].get('b')!r}")
            elif art in ("verworfen", "ausgeblendet"):
                zeilen = {z["id"]: z for z in nachher["struktur"]}
                for name in p["namen"]:
                    i = nach_namen(vorher, name)["id"]
                    markiert = art in zeilen.get(i, {}).get("zustaende", [])
                    if art == "verworfen":
                        markiert = markiert or verworfen(g[i])
                    if not markiert:
                        fehl(f"{name} nicht {art}")
            elif art == "keine_befunde":
                if nachher["befunde"]:
                    fehl(f"Befunde {nachher['befunde']}")
            elif art == "uebrige_unveraendert":
                for i, alt in flach(vorher["graph"]).items():
                    a, b = json.loads(kanon(alt)), json.loads(kanon(g.get(i, {})))
                    for x in (a, b):
                        x.get("meta", {}).pop("verworfen", None)
                    if a != b:
                        fehl(f"Element {i} verändert")
            else:
                fehl(f"unbekannter Prüfer {art!r}")
        except (KeyError, AssertionError, IndexError, StopIteration) as ex:
            fehl(f"Prüfer {art} nicht auswertbar: {type(ex).__name__} {ex}")
    return gruende


# --- Testmodell (OpenAI-kompatibel) ---------------------------------------------------------------------

Antwort = Callable[[dict], dict]


class Testmodell:
    __test__ = False  # kein Test, trotz Namen

    """Kleiner HTTP-Server auf 127.0.0.1 (freier Port); beantwortet `/v1/chat/completions` und zeichnet alles auf.

    `antwort(body) -> {"content": str|None, "tool_calls": [(name, argumente)]}`; `haengt` = nie antworten.
    """

    def __init__(self, antwort: Antwort | None = None, haengt: bool = False) -> None:
        self.antwort = antwort or (lambda _b: {"content": "ok", "tool_calls": []})
        self.haengt = haengt
        self.anfragen: list[dict] = []
        self._ende = threading.Event()
        modell = self

        class H(BaseHTTPRequestHandler):
            def do_POST(self) -> None:  # noqa: N802
                n = int(self.headers.get("Content-Length") or 0)
                roh = self.rfile.read(n)
                try:
                    body = json.loads(roh)
                except ValueError:
                    body = {}
                modell.anfragen.append(
                    {"pfad": self.path, "kopf": {k.lower(): v for k, v in self.headers.items()}, "body": body}
                )
                if modell.haengt:
                    modell._ende.wait(60)
                    return
                if not self.path.endswith("/chat/completions"):
                    self.send_response(404)
                    self.end_headers()
                    return
                a = modell.antwort(body)
                nachricht: dict = {"role": "assistant", "content": a.get("content")}
                calls = [
                    {
                        "id": f"call_{i}",
                        "type": "function",
                        "function": {"name": n_, "arguments": json.dumps(args)},
                    }
                    for i, (n_, args) in enumerate(a.get("tool_calls", []))
                ]
                if calls:
                    nachricht["tool_calls"] = calls
                antwort = {
                    "id": "chatcmpl-test",
                    "object": "chat.completion",
                    "model": body.get("model", "testmodell"),
                    "choices": [
                        {"index": 0, "message": nachricht, "finish_reason": "tool_calls" if calls else "stop"}
                    ],
                }
                daten = json.dumps(antwort).encode()
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(daten)))
                self.end_headers()
                self.wfile.write(daten)

            def log_message(self, *_a) -> None:
                pass

        self._server = ThreadingHTTPServer(("127.0.0.1", 0), H)
        self._server.daemon_threads = True
        self.port = self._server.server_address[1]
        self.url = f"http://127.0.0.1:{self.port}/v1"

    def __enter__(self) -> Testmodell:
        threading.Thread(target=self._server.serve_forever, daemon=True).start()
        return self

    def __exit__(self, *_a) -> None:
        self._ende.set()
        self._server.shutdown()
        self._server.server_close()

    def env(self, **extra: str) -> dict:
        return {"CEE_KI_URL": self.url, "CEE_KI_MODELL": "testmodell-1", **extra}


def _seit_frage(body: dict) -> tuple[str, list[dict]]:
    msgs = body.get("messages", [])
    i = max(k for k, m in enumerate(msgs) if m.get("role") == "user")
    text = msgs[i].get("content") or ""
    if isinstance(text, list):
        text = " ".join(t.get("text", "") for t in text)
    ergebnisse = []
    for m in msgs[i + 1 :]:
        if m.get("role") == "tool":
            try:
                ergebnisse.append(json.loads(m.get("content") or "{}"))
            except ValueError:
                ergebnisse.append({})
    return text, ergebnisse


def _id_von_name(body: dict, name: str) -> str:
    """Element-ID aus der Modellübersicht der Anweisung (Zeile `<id> <typ> "<name>" …`, design.md Abschnitt 3)."""
    for m in body.get("messages", []):
        if m.get("role") in ("system", "user") and isinstance(m.get("content"), str):
            t = re.search(rf'^(\S+)\s+\S+\s+"{re.escape(name)}"', m["content"], re.M)
            if t:
                return t.group(1)
    raise AssertionError(f"Name {name} nicht in der Modellübersicht an das Testmodell")


def _plan(satz: str, body: dict, falsch: bool) -> list[Callable[[list[str]], tuple[str, dict]]]:
    """Richtige (oder bewusst falsche) Werkzeugaufrufe je Satz des Prüfsatzes; `ids` = Element-IDs der Erfolge."""
    groesse = lambda v: f"{v:g} mm"  # noqa: E731
    if "Rechteck" in satz:
        h = 50 if falsch else 60
        ecken = [(0, 0), (100, 0), (100, h), (0, h)]
        punkte = [
            lambda ids, p=p: ("referenz_punkt", {"x": groesse(p[0]), "y": groesse(p[1]), "z": "0 mm"})
            for p in ecken
        ]
        strecken = [
            lambda ids, i=i: ("referenz_strecke", {"a": f"{ids[i]}.point", "b": f"{ids[(i + 1) % 4]}.point"})
            for i in range(4)
        ]
        mitte = [
            lambda ids: (
                "referenz_punkt_relativ",
                {"ref": f"{ids[0]}.point", "x": "50 mm", "y": groesse(h / 2), "z": "40 mm"},
            )
        ]
        return punkte + strecken + mitte
    if "Halbgerade" in satz:
        p2 = _id_von_name(body, "P2")
        erster = (
            (lambda ids: ("referenz_punkt", {"x": "0 mm", "y": "0 mm", "z": "25 mm"}))
            if falsch
            else (lambda ids: ("referenz_punkt_relativ", {"ref": f"{p2}.point", "z": "25 mm"}))
        )
        return [erster, lambda ids: ("referenz_halbgerade", {"a": f"{p2}.point", "b": f"{ids[0]}.point"})]
    if "Verwirf" in satz:
        s1, g1 = _id_von_name(body, "S1"), _id_von_name(body, "G1")
        return [
            lambda ids: ("element_verwerfen", {"element": s1}),
            lambda ids: ("element_ausblenden", {"element": g1}),
        ]
    if "Koordinatensystem" in satz:
        return [lambda ids: ("referenz_koordinatensystem", {"x": "100 mm", "rz": "30 deg"})]
    if "Punkt bei" in satz:
        return [lambda ids: ("referenz_punkt", {"x": "10 mm", "y": "20 mm", "z": "5 mm"})]
    raise AssertionError(f"Testmodell kennt den Satz nicht: {satz!r}")


def loesung(falsch: bool = False, fehler_zuerst: bool = False) -> Antwort:
    """Antwort des Testmodells: je Runde ein Aufruf; richtig (oder falsch), Schlusstext „erledigt, alles korrekt“.

    `fehler_zuerst`: erster Aufruf `referenz_punkt` mit `x: "100"` (ohne Einheit); danach die richtigen Aufrufe.
    """

    def antwort(body: dict) -> dict:
        satz, ergebnisse = _seit_frage(body)
        erfolge = [r["element"] for r in ergebnisse if r.get("ok") and "element" in r]
        if fehler_zuerst and not ergebnisse:
            return {
                "content": None,
                "tool_calls": [("referenz_punkt", {"x": "100", "y": "0 mm", "z": "0 mm"})],
            }
        plan = _plan(satz, body, falsch)
        if len(erfolge) < len(plan):
            return {"content": None, "tool_calls": [plan[len(erfolge)](erfolge)]}
        return {"content": "erledigt, alles korrekt", "tool_calls": []}

    return antwort


def skript_aufrufe(aufrufe: list[Callable[[list[str]], tuple[str, dict]]]) -> Antwort:
    """Antwort des Testmodells: feste Folge von Aufrufen (je Runde einer), unabhängig von Erfolg oder Fehler."""

    def antwort(body: dict) -> dict:
        _satz, ergebnisse = _seit_frage(body)
        erfolge = [r["element"] for r in ergebnisse if r.get("ok") and "element" in r]
        if len(ergebnisse) < len(aufrufe):
            return {"content": None, "tool_calls": [aufrufe[len(ergebnisse)](erfolge)]}
        return {"content": "fertig", "tool_calls": []}

    return antwort


def werkzeugnachrichten(anfrage: dict) -> list[dict]:
    """Werkzeugergebnisse (geparst) in einer Anfrage an das Testmodell; Rohtext unter `_roh`."""
    aus = []
    for m in anfrage["body"].get("messages", []):
        if m.get("role") == "tool":
            roh = m.get("content") or ""
            try:
                d = json.loads(roh)
            except ValueError:
                d = {}
            d["_roh"] = roh
            aus.append(d)
    return aus
