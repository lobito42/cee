"""Hilfen für die Abnahmetests von ap-53 (Skizze und Hochziehen): Projekte bauen, Worker rechnen, Sollwerte nachrechnen,
Prüfwerkzeug `pruefen -- skizze …` aufrufen.

Grundsatz: Alle Sollwerte (Lagen, Flächen, Volumen, Halter-Maße) rechnet der Test selbst nach: Rechtecke, Kreise und
Prismen analytisch, der Halter aus `Params()` in `parts/examples/halter.py` mit einer eigenen build123d-Vergleichsform.
Es gibt keine Referenzdateien unter `tests/golden/` (proposal.md, Abschnitt „Referenzdaten“). Das Prüfwerkzeug liefert
nur Rohdaten; jedes Urteil fällt der Test.

Festgeschriebene Annahmen, wo design.md nur die Wirkung nennt (im PR unter „Offene Fragen“ gemeldet):

Worker (wie ap-50, `wf_helpers`):
- Projekte nennen Skizzenelemente als verschachtelte Dicts in `content` der Skizze; `ebene` einer Skizze ist ein Bezug
  auf einen Ausgang vom Typ `plane`, hier immer `<Koordinatensystem>.xy` (Ausgang des `frame`).
- Ausgänge: `sketch` (`outputs["sketch"]`) und `solid` (`outputs["koerper"]` des `extrude`), Felder nach design.md
  Abschnitte 3 und 4. Flächen und Volumen sind Größen mit Einheit `mm2`/`mm²` bzw. `mm3`/`mm³`; Punkte in
  `bereiche[].punkt` sind zwei Größen (u, v); Anzahlen (`flaechen`, `kanten`) sind eine ganze Zahl oder eine Größe der
  Einheit `1`. `netz.positionen` ist eine flache Liste (x, y, z, x, y, z …) in mm.
- Befunde stehen je Element in `results[i].befunde` (`code`, `element`); `curves_intersect` an der Skizze, `degenerate`,
  `not_in_sketch` am Skizzenelement, `region_missing` und `degenerate` am `extrude`. Die beiden Element-IDs von
  `curves_intersect` stehen irgendwo im Befund (Text des Befunds).
- `cee_worker.kernel.formen(auftrag)` liefert zu jeder Skizzenkurve die OCP-Form (Kante bzw. Draht) unter ihrer ID und zu
  jedem `extrude` das Solid unter dessen ID.

Vorschau (`pruefen -- skizze ablauf --zustand <n> --datei <ablauf.json> --json`, Ausgabe wie `drahtmodell ablauf`):
- Zusätzliche Schritte nach design.md Abschnitt 7: `{zeiger: {skizze_mm: [u, v], aktion}}`, `{tippen: "<Text>"}`,
  `{griff: {element?, ziehen_mm, dauer_ms?, halten?}}`, `{taste: "S"|"Escape"|"Tab"|"Enter"|…}`. `halten: true` zieht, ohne
  loszulassen; `dauer_ms` dehnt das Ziehen; ohne `halten` wird nach dem Ziehen losgelassen.
- Elementverweis in Schritten: Element-ID, `<typ>#<n>` (n-tes Wurzelelement des Typs, 1-basiert) oder
  `<typ>#<n>><kindtyp>#<m>` (m-tes Kind dieses Typs des n-ten Wurzelelements, 1-basiert; Kinder eines `frame` stehen
  in der Reihenfolge Ursprung, X/Y/Z-Achse, XY/YZ/ZX-Ebene, also `frame#1>plane#1` = XY-Ebene, `plane#3` = ZX).
  `zeiger` kennt zusätzlich `element` (Skizze) zusammen mit `skizze_mm`, um in einer geschlossenen Skizze auf deren
  Koordinaten zu zeigen. `args` von Befehlen nehmen Verweise derselben Art (ohne `.ausgang`).
- Schnappschuss wie design.md Abschnitt 7; `kamera.richtung`/`oben` sind Vektoren, `wertfeld.befund` ist Text oder
  `null`, `eigenschaften` ist ein JSON-Baum mit den angezeigten Texten, `ansichtswuerfel.achsen` ist
  `[{achse: "x"|"y"|"z", farbe, sichtbar}]`, `geister[].huelle_mm` ist `{min: [x,y,z], max: [x,y,z]}`,
  `bild_ms` ist eine Zahl oder eine Liste von Bildzeiten, `bereiche[].punkt` sind zwei Zahlen in mm.
- Schritt `{klick: {wuerfel: "vorne"|"oben"|"vorne-rechts-oben"}}` klickt auf den Ansichtswürfel.
"""

# ruff: noqa: E501

from __future__ import annotations

import importlib.util
import json
import math
import statistics
import subprocess
import sys
import tempfile
import time
from functools import cache
from pathlib import Path

from conftest import ROOT, need_module

for _ordner in (
    "ap-41b-ux-bedienkonzept",
    "ap-41c-ux-schlankes-menue",
    "ap-50-wireframe-basics",
    "ap-52-ki-konstruktion-wireframe",
):
    _pfad = str(ROOT / "tests" / "acceptance" / _ordner)
    if _pfad not in sys.path:
        sys.path.insert(0, _pfad)

from grundlagen_helpers import farbe, kanon, npm, register, register_nach_id  # noqa: E402,F401
from menue_helpers import MAX_AKTIONEN, MAX_GRUPPE, dropdown_eintraege, taskleiste  # noqa: E402,F401
from wf_helpers import (  # noqa: E402,F401
    TOL_MM,
    Ablauf,
    auftrag_von,
    ausgang,
    berechne,
    betrag,
    element,
    ergebnisse,
    flach,
    frame,
    kreuz,
    lage_frame,
    mm,
    nahe,
    projekt,
    rechnen_auftrag,
    rechnen_roh,
    spalte,
    winkel,
    worker_env,
    wurzeln,
)

TYPEN_SKIZZE = ROOT / "format" / "types" / "skizze.json"
TYPEN_DRAHT = ROOT / "format" / "types" / "drahtmodell.json"
BEISPIEL_SKIZZE = ROOT / "format" / "examples" / "skizze.json"
HALTER_PY = ROOT / "parts" / "examples" / "halter.py"
ERGEBNIS_SCHEMA = ROOT / "format" / "kernel" / "ergebnis.schema.json"

REL = 1e-6
FLAECHE = {"mm2", "mm²", "mm^2"}
VOLUMEN = {"mm3", "mm³", "mm^3"}

AUSGAENGE = {
    "sketch": {"sketch": "sketch"},
    "sketch_line": {"kurve": "curve"},
    "sketch_rectangle": {"kurve": "curve"},
    "sketch_circle": {"kurve": "curve"},
    "extrude": {"koerper": "solid"},
}


# --- Projekte bauen --------------------------------------------------------------------------------------


def _el(id: str, typ: str, params: dict, inputs: dict | None = None, content: list | None = None) -> dict:
    e = element(id, typ, params, inputs, content=content)
    e["outputs"] = dict(AUSGAENGE[typ])
    return e


def s_linie(id: str, u1: float, v1: float, u2: float, v2: float) -> dict:
    return _el(id, "sketch_line", {"u1": mm(u1), "v1": mm(v1), "u2": mm(u2), "v2": mm(v2)})


def s_rechteck(id: str, u1: float, v1: float, u2: float, v2: float) -> dict:
    return _el(id, "sketch_rectangle", {"u1": mm(u1), "v1": mm(v1), "u2": mm(u2), "v2": mm(v2)})


def s_kreis(id: str, u: float, v: float, d, *, ohne_einheit: bool = False) -> dict:
    """Kreis. `d` als Größe (dict) bleibt unverändert, sonst mm; mit `ohne_einheit=True` bleibt `d` eine nackte Zahl
    (Scenario „Einheiten“: der Kern nimmt die Standard-Einheit an und warnt mit `unit_assumed`)."""
    if ohne_einheit:
        assert not isinstance(d, dict), d
        wert = d
    else:
        wert = d if isinstance(d, dict) else mm(d)
    return _el(id, "sketch_circle", {"u": mm(u), "v": mm(v), "d": wert})


def skizze(id: str, ebene: str, *kinder: dict) -> dict:
    return _el(id, "sketch", {}, {"ebene": ebene}, content=list(kinder))


def hochziehen(id: str, skizze_id: str, u: float, v: float, hoehe: float) -> dict:
    return _el(
        id,
        "extrude",
        {"punkt_u": mm(u), "punkt_v": mm(v), "hoehe": mm(hoehe)},
        {"skizze": f"{skizze_id}.sketch"},
    )


def k0() -> dict:
    return frame("K0")


def rechne(*elemente: dict) -> dict:
    """Projekt mit K0 und den Elementen über Kommandos `auftrag` und `rechnen` berechnen; Ergebnis."""
    return berechne(projekt(k0(), *elemente))[1]


# --- Ergebnisse lesen ------------------------------------------------------------------------------------


def gr(g, einheiten) -> float:
    """Wert einer Größe; Einheit muss in `einheiten` (Menge oder Text) stehen."""
    assert isinstance(g, dict) and {"value", "unit"} <= set(g), f"keine Größe: {g!r}"
    erlaubt = {einheiten} if isinstance(einheiten, str) else set(einheiten)
    assert g["unit"] in erlaubt, f"Einheit {g['unit']!r}, erwartet {sorted(erlaubt)}"
    return float(g["value"])


def zahl(x) -> float:
    """Zahl oder Größe als Zahl."""
    if isinstance(x, dict):
        return float(x["value"])
    return float(x)


def mm_vec(liste) -> tuple[float, ...]:
    return tuple(gr(g, "mm") for g in liste)


def anzahl(x) -> int:
    if isinstance(x, dict):
        assert x["unit"] in ("1", ""), x
        x = x["value"]
    assert float(x).is_integer(), x
    return int(x)


def res(e: dict, id: str) -> dict:
    return ergebnisse(e)[id]


def alle_befunde(e: dict) -> list[tuple[str, dict]]:
    """(Ergebnis-ID, Befund) aller Elemente."""
    return [(r["id"], b) for r in e["results"] for b in r.get("befunde", [])]


def befunde_mit(e: dict, code: str) -> list[tuple[str, dict]]:
    return [(i, b) for i, b in alle_befunde(e) if b.get("code") == code]


def bereiche(e: dict, id: str) -> list[dict]:
    o = ausgang(e, id, "sketch")
    assert o["type"] == "sketch", o
    return o["bereiche"]


def flaeche_von(b: dict) -> float:
    return gr(b["flaeche"], FLAECHE)


def punkt_von(b: dict) -> tuple[float, float]:
    u, v = b["punkt"]
    return zahl(u), zahl(v)


def koerper(e: dict, id: str) -> dict:
    o = ausgang(e, id, "koerper")
    assert o["type"] == "solid", o
    return o


def volumen(o: dict) -> float:
    return gr(o["volumen"], VOLUMEN)


def oberflaeche(o: dict) -> float:
    return gr(o["oberflaeche"], FLAECHE)


def huelle(o: dict) -> tuple[tuple[float, ...], tuple[float, ...]]:
    return mm_vec(o["huelle"]["min"]), mm_vec(o["huelle"]["max"])


def nackte_zahlen_ausser_anzeige(x) -> list[str]:
    """Pfade von Zahlen, die keine Größe sind; ausgenommen Anzeige-Listen (`netz`, `kantenzuege`, `rand`), `punkt` und Anzahlen."""
    from wf_helpers import nackte_zahlen  # noqa: PLC0415

    frei = ("netz", "kantenzuege", "rand", "punkt", "flaechen", "kanten")
    return [p for p in nackte_zahlen(x) if not set(frei) & set(p.replace("[", ".[").split("."))]


def rel(ist: float, soll: float, tol: float = REL) -> bool:
    return abs(ist - soll) <= tol * abs(soll)


# --- Vergleichsformen mit build123d (nur im Test) -------------------------------------------------------


@cache
def halter_params():
    """`Params()` aus `parts/examples/halter.py` (Datei geladen, nicht kopiert)."""
    need_module("build123d")
    spec = importlib.util.spec_from_file_location("ap53_halter", HALTER_PY)
    assert spec and spec.loader, HALTER_PY
    modul = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = modul  # `@dataclass` braucht das Modul in sys.modules
    spec.loader.exec_module(modul)
    return modul.Params()


def halter_referenz(p=None):
    """(Grundplatte mit Bohrungen, Steg) als build123d-Teile, Lagen wie in `halter.py`, ohne Verrundung."""
    need_module("build123d")
    from build123d import Align, Box, BuildPart, Cylinder, Locations, Mode  # noqa: PLC0415

    p = p or halter_params()
    with BuildPart() as platte:
        Box(p.breite, p.tiefe, p.dicke, align=(Align.CENTER, Align.CENTER, Align.MIN))
        x, y = p.bohrung_abstand / 2, p.dicke / 2
        with Locations((-x, y, 0), (x, y, 0)):
            Cylinder(
                p.bohrung_d / 2,
                p.dicke,
                align=(Align.CENTER, Align.CENTER, Align.MIN),
                mode=Mode.SUBTRACT,
            )
    with BuildPart() as steg:
        with Locations((0, -p.tiefe / 2 + p.dicke / 2, p.dicke)):
            Box(p.breite, p.dicke, p.steg_hoehe, align=(Align.CENTER, Align.CENTER, Align.MIN))
    return platte.part, steg.part


def halter_elemente(p=None) -> list[dict]:
    """Auftrag nach design.md Abschnitt 8 (K0, S1 mit Rechteck und zwei Kreisen, X1, K1 mit z = dicke, S2, X2)."""
    p = p or halter_params()
    b2, t2, a2 = p.breite / 2, p.tiefe / 2, p.bohrung_abstand / 2
    return [
        k0(),
        skizze(
            "S1",
            "K0.xy",
            s_rechteck("R1", -b2, -t2, b2, t2),
            s_kreis("C1", -a2, p.dicke / 2, p.bohrung_d),
            s_kreis("C2", a2, p.dicke / 2, p.bohrung_d),
        ),
        hochziehen("X1", "S1", 0, -t2 / 2, p.dicke),
        frame("K1", z=p.dicke),
        skizze("S2", "K1.xy", s_rechteck("R2", -b2, -t2, b2, -t2 + p.dicke)),
        hochziehen("X2", "S2", 0, -t2 + p.dicke / 2, p.steg_hoehe),
    ]


@cache
def _halter_direkt_json() -> str:
    return json.dumps(berechne(projekt(*halter_elemente()))[1])


def halter_direkt() -> dict:
    """Ergebnis des Halters, direkt als Auftrag an den Worker (Fall (a) in design.md Abschnitt 8)."""
    return json.loads(_halter_direkt_json())


# --- OCP-Hilfen für die Prüfung der Formen ---------------------------------------------------------------


def formen_von(elemente: list[dict]) -> dict:
    need_module("OCP")
    need_module("cee_worker.kernel")
    from cee_worker.kernel import formen  # noqa: PLC0415

    return formen(auftrag_von(projekt(*elemente)))


def ecken_der_form(form) -> list[tuple[float, float, float]]:
    """Eindeutige Eckpunkte einer OCP-Form, auf 1e-9 gerundet und sortiert."""
    from OCP.BRep import BRep_Tool  # noqa: PLC0415
    from OCP.TopAbs import TopAbs_VERTEX  # noqa: PLC0415
    from OCP.TopExp import TopExp_Explorer  # noqa: PLC0415
    from OCP.TopoDS import TopoDS  # noqa: PLC0415

    aus: set[tuple[float, float, float]] = set()
    ex = TopExp_Explorer(form, TopAbs_VERTEX)
    while ex.More():
        p = BRep_Tool.Pnt_s(TopoDS.Vertex_s(ex.Current()))
        aus.add((round(p.X(), 9), round(p.Y(), 9), round(p.Z(), 9)))
        ex.Next()
    return sorted(aus)


def kreis_der_form(form) -> tuple[tuple[float, float, float], float]:
    """(Mittelpunkt, Radius) der ersten kreisförmigen Kante einer Form."""
    from OCP.BRepAdaptor import BRepAdaptor_Curve  # noqa: PLC0415
    from OCP.GeomAbs import GeomAbs_Circle  # noqa: PLC0415
    from OCP.TopAbs import TopAbs_EDGE  # noqa: PLC0415
    from OCP.TopExp import TopExp_Explorer  # noqa: PLC0415
    from OCP.TopoDS import TopoDS  # noqa: PLC0415

    ex = TopExp_Explorer(form, TopAbs_EDGE)
    while ex.More():
        c = BRepAdaptor_Curve(TopoDS.Edge_s(ex.Current()))
        if c.GetType() == GeomAbs_Circle:
            k = c.Circle()
            m = k.Location()
            return (m.X(), m.Y(), m.Z()), k.Radius()
        ex.Next()
    raise AssertionError("keine kreisförmige Kante in der Form")


def zaehlung(form) -> tuple[int, int]:
    """(Flächen, Kanten) einer OCP-Form (eindeutig gezählt)."""
    from OCP.TopAbs import TopAbs_EDGE, TopAbs_FACE  # noqa: PLC0415
    from OCP.TopExp import TopExp  # noqa: PLC0415
    from OCP.TopTools import TopTools_IndexedMapOfShape  # noqa: PLC0415

    def n(art) -> int:
        m = TopTools_IndexedMapOfShape()
        TopExp.MapShapes_s(form, art, m)
        return m.Extent()

    return n(TopAbs_FACE), n(TopAbs_EDGE)


# --- Weltlage einer Skizzenebene -------------------------------------------------------------------------


def ebene_von_frame(**kw):
    """(Ursprung, x_direction, y_direction = Normale × x_direction, Normale) der XY-Ebene eines Koordinatensystems."""
    t, r = lage_frame(**kw)
    n, xd = spalte(r, 2), spalte(r, 0)
    return t, xd, kreuz(n, xd), n


def welt(ebene, u: float, v: float) -> tuple[float, float, float]:
    t, xd, yd, _ = ebene
    return tuple(t[k] + u * xd[k] + v * yd[k] for k in range(3))  # type: ignore[return-value]


# --- Worker im Dauerbetrieb ------------------------------------------------------------------------------


def stdio_median(auftrag: dict, wiederholungen: int = 5) -> tuple[float, dict]:
    """Auftrag `wiederholungen`-mal an einen warmen `--stdio`-Worker; (Median in s, letztes Ergebnis)."""
    p = subprocess.Popen(
        [sys.executable, "-m", "cee_worker", "--stdio"],
        cwd=ROOT,
        env=worker_env(),
        text=True,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        bufsize=1,
    )
    zeile = json.dumps(auftrag, separators=(",", ":")) + "\n"
    zeiten, letzte = [], ""

    def senden() -> str:
        assert p.stdin and p.stdout
        p.stdin.write(zeile)
        p.stdin.flush()
        antwort = p.stdout.readline()
        assert antwort, "Worker hat nicht geantwortet"
        return antwort

    try:
        senden()  # aufwärmen
        for _ in range(wiederholungen):
            t = time.perf_counter()
            letzte = senden()
            zeiten.append(time.perf_counter() - t)
    finally:
        assert p.stdin
        p.stdin.close()
        p.wait(timeout=30)
    return statistics.median(zeiten), json.loads(letzte)


# --- Prüfwerkzeug `skizze` --------------------------------------------------------------------------------


def skizze_roh(args: list[str], timeout: int = 1200):
    r = npm("run", "--silent", "pruefen", "--", "skizze", *args, "--json", timeout=timeout)
    assert r.returncode == 0, f"pruefen skizze {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


@cache
def skizze_pruefen(*args: str):
    return skizze_roh(list(args))


def skizze_schritte(zustand: str, schritte: list[dict]) -> list[dict]:
    with tempfile.TemporaryDirectory() as d:
        f = Path(d) / "ablauf.json"
        f.write_text(json.dumps(schritte), encoding="utf-8")
        erg = skizze_roh(["ablauf", "--zustand", zustand, "--datei", str(f)], timeout=1800)
    snaps = erg if isinstance(erg, list) else erg["schnappschuesse"]
    assert len(snaps) == len(schritte), f"{len(snaps)} Schnappschüsse für {len(schritte)} Schritte"
    return snaps


class SAblauf(Ablauf):
    """Schrittliste für `pruefen -- skizze ablauf`; `s(name)` = Schnappschuss nach dem Schritt."""

    def laufen(self, zustand: str, **_kw) -> SAblauf:  # type: ignore[override]
        self.snaps = skizze_schritte(zustand, self.schritte)
        return self


@cache
def _anfang(zustand: str) -> dict:
    return skizze_schritte(zustand, [{"warten_ms": 0}])[0]


def szene_von_snap(snap: dict) -> dict[str, dict]:
    return {x["element"]: x for x in snap["szene"]}


def anfang(zustand: str) -> dict:
    """Ausgangsstand eines Testzustands (Graph, Ergebnis), einmal je Lauf."""
    return _anfang(zustand)


def kind_id(graph: list, eltern_typ: str, n: int, kind_typ: str, m: int) -> str:
    """ID des m-ten Kindes (1-basiert) vom Typ `kind_typ` des n-ten Wurzelelements vom Typ `eltern_typ`."""
    g = flach(graph)
    eltern = wurzeln(graph, eltern_typ)[n - 1]
    ids = [k if isinstance(k, str) else k["id"] for k in eltern.get("content", [])]
    treffer = [i for i in ids if g[i]["type"] == kind_typ]
    return treffer[m - 1]


def neue_elemente(vorher: dict, nachher: dict, typ: str) -> list[dict]:
    alt = set(flach(vorher["graph"]))
    return [e for e in flach(nachher["graph"]).values() if e["type"] == typ and e["id"] not in alt]


def mm_param(e: dict, feld: str) -> float:
    g = e["params"][feld]
    faktor = {"mm": 1.0, "cm": 10.0, "m": 1000.0}
    assert g["unit"] in faktor, g
    return float(g["value"]) * faktor[g["unit"]]


def ohne_dialog(snaps: list[dict]) -> None:
    assert all(s.get("dialoge", 0) == 0 for s in snaps), [s.get("dialoge") for s in snaps]


def winkel_grad(a, b) -> float:
    return math.degrees(winkel(tuple(a), tuple(b)))


def flach_zahlen(x) -> list[float]:
    if isinstance(x, bool):
        return []
    if isinstance(x, int | float):
        return [float(x)]
    if isinstance(x, list):
        return [z for v in x for z in flach_zahlen(v)]
    return []


def hoehe_z(huelle_mm) -> float:
    """Ausdehnung einer Hülle in z (XY-Ebene) aus `{min, max}` oder `[[min…], [max…]]`."""
    if isinstance(huelle_mm, dict):
        lo, hi = huelle_mm["min"], huelle_mm["max"]
    else:
        lo, hi = huelle_mm[0], huelle_mm[1]
    return float(hi[2]) - float(lo[2])
