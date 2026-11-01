"""ap-53, Capability `skizze-vorschau`: Bereich wählen, Hochziehen mit Griff, Budgets, Ansichtsbausteine (AK-10, AK-13).

Der Zustand `skizze-halter` enthält den Halter aus `format/examples/skizze.json`. Sollwerte (Flächen, Volumen,
Höhen) rechnet der Test nach; Farben stammen aus `docs/design/tokens.json`.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import math
import re
import statistics
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import ROOT  # noqa: E402
from skz_helpers import (  # noqa: E402
    VOLUMEN,
    SAblauf,
    anfang,
    ausgang,
    farbe,
    flach,
    flach_zahlen,
    gr,
    halter_params,
    hoehe_z,
    kanon,
    mm_param,
    neue_elemente,
    ohne_dialog,
    rel,
    skizze_pruefen,
    szene_von_snap,
    wurzeln,
    zahl,
)

KREIS_R = 3.3


def _hex(c: str) -> str:
    return c.strip().lower()


def _akzent() -> set[str]:
    return {_hex(farbe(t, "akzent")) for t in ("hell", "dunkel")}


def _bereiche_halter() -> tuple[dict, dict, dict]:
    """(Skizze S1, Bereich „Rechteck minus Kreise“, Kreisbereich) aus dem Ausgangsstand von `skizze-halter`."""
    s = anfang("skizze-halter")
    p = halter_params()
    gross = p.breite * p.tiefe - 2 * math.pi * (p.bohrung_d / 2) ** 2
    klein = math.pi * (p.bohrung_d / 2) ** 2
    treffer = [b for b in s["bereiche"] if rel(zahl(b["flaeche"]), gross)]
    kreise = [b for b in s["bereiche"] if rel(zahl(b["flaeche"]), klein)]
    assert len(treffer) == 1 and len(kreise) == 2, s["bereiche"]
    return s, treffer[0], kreise[0]


def _extrudes(s: dict) -> list[dict]:
    return wurzeln(s["graph"], "extrude")


def _verwerfen_schritte(a: SAblauf, s: dict) -> SAblauf:
    for i, x in enumerate(_extrudes(s)):
        a.add(f"v{i}", befehl="element.verwerfen", args={"element": x["id"]})
    return a


def _punkt(b: dict) -> tuple[float, float]:
    return float(b["punkt"][0]), float(b["punkt"][1])


def _lage(b: dict) -> dict:
    return {"element": b["skizze"], "skizze_mm": list(_punkt(b))}


def test_bereich_waehlen_nur_ueber_farbe():
    """Requirement „Bereich wählen und mit dem Griff hochziehen“, Scenario „Bereich wählen nur über Farbe“: im Zustand
    `skizze-halter` (Hochziehen verworfen) zeigt `kontur` erst `hover`, dann `auswahl` in der Farbe des Tokens `akzent`
    für den Bereich „Rechteck minus Kreise“, danach für den Kreis-Bereich; `linienbreiten` aller Elemente sind in allen
    drei Schnappschüssen gleich; `hover_ms` ≤ 100."""
    s, gross, kreis = _bereiche_halter()
    a = _verwerfen_schritte(SAblauf(), s)
    a.add("hover", zeiger={**_lage(gross), "aktion": "bewegen"})
    a.add("auswahl1", zeiger={**_lage(gross), "aktion": "klicken"})
    a.add("auswahl2", zeiger={**_lage(kreis), "aktion": "klicken"})
    a.laufen("skizze-halter")

    for b in (gross, kreis):
        assert b["element"].startswith(f"{b['skizze']}@"), b  # Schlüssel `<Skizze>@<u>;<v>` (design.md 7a)
    assert gross["element"] != kreis["element"]
    h = [k for k in a.s("hover")["kontur"] if k["art"] == "hover"]
    assert [k["element"] for k in h] == [gross["element"]], a.s("hover")["kontur"]
    k1 = [k for k in a.s("auswahl1")["kontur"] if k["art"] == "auswahl"]
    k2 = [k for k in a.s("auswahl2")["kontur"] if k["art"] == "auswahl"]
    assert [k["element"] for k in k1] == [gross["element"]], a.s("auswahl1")["kontur"]
    assert [k["element"] for k in k2] == [kreis["element"]], a.s("auswahl2")["kontur"]
    assert a.s("auswahl1")["auswahl"] == [gross["element"]] and a.s("auswahl2")["auswahl"] == [
        kreis["element"]
    ]
    for k in (*k1, *k2):
        assert _hex(k["farbe"]) in _akzent(), (k["farbe"], _akzent())
    breiten = [a.s(n)["linienbreiten"] for n in ("hover", "auswahl1", "auswahl2")]
    assert breiten[0] == breiten[1] == breiten[2] and breiten[0], breiten
    assert a.s("hover")["hover_ms"] <= 100, a.s("hover")["hover_ms"]


def test_hochziehen_mit_griff_und_getipptem_wert():
    """Scenario „Hochziehen mit Griff und getipptem Wert“: Bereich „Rechteck minus Kreise“ gewählt, `E`, Griff um 25 mm
    gezogen und gehalten: `geister` zeigt eine Hülle mit Höhe 35 mm ± 0,5; dann „8“ und `Enter`: genau 1 neues `extrude`
    mit `hoehe` = 8 mm und Punkt im gewählten Bereich, sein Körper mit dem Volumen aus dem Worker (nachgerechnet), die
    Eigenschaften zeigen „8 mm“, S1 ist in `szene` nicht sichtbar, im Graphen aber unverändert; im zweiten Lauf nach `E`
    Esc: `graph_hash` unverändert; `dialoge` immer 0."""
    s, gross, _ = _bereiche_halter()
    p = halter_params()

    def vorbereitung() -> SAblauf:
        a = _verwerfen_schritte(SAblauf(), s)
        a.add("wahl", zeiger={**_lage(gross), "aktion": "klicken"})
        return a

    a = vorbereitung()
    a.add("e", taste="E")
    a.add("zug", griff={"ziehen_mm": 25, "halten": True})
    a.add("wert", tippen="8")
    a.add("fertig", taste="Enter")
    a.laufen("skizze-halter")
    assert [x for x in a.s("e")["geister"]], "keine Geister-Vorschau nach E"
    assert abs(hoehe_z(a.s("e")["geister"][0]["huelle_mm"]) - 10) <= 0.5, a.s("e")["geister"]
    assert abs(hoehe_z(a.s("zug")["geister"][0]["huelle_mm"]) - 35) <= 0.5, a.s("zug")["geister"]

    ende = a.s("fertig")
    neu = neue_elemente(a.s("wahl"), ende, "extrude")
    assert len(neu) == 1, neu
    x = neu[0]
    assert mm_param(x, "hoehe") == p.dicke == 8.0
    assert x["inputs"]["skizze"].split(".")[0] == gross["skizze"], x["inputs"]
    u, v = mm_param(x, "punkt_u"), mm_param(x, "punkt_v")
    assert -30 < u < 30 and -20 < v < 20, (u, v)
    assert all(
        math.hypot(u - m, v - p.dicke / 2) > p.bohrung_d / 2
        for m in (-p.bohrung_abstand / 2, p.bohrung_abstand / 2)
    ), "Punkt liegt in einem Loch"
    soll = (p.breite * p.tiefe - 2 * math.pi * (p.bohrung_d / 2) ** 2) * p.dicke
    ist = gr(ausgang(ende["ergebnis"], x["id"], "koerper")["volumen"], VOLUMEN)
    assert rel(ist, soll), (ist, soll)
    assert re.search(r"(?<![\d.,])8(?:[.,]0+)? ?mm", json.dumps(ende["eigenschaften"], ensure_ascii=False)), (
        ende["eigenschaften"]
    )
    assert szene_von_snap(ende)[gross["skizze"]]["sichtbar"] is False
    assert kanon(flach(ende["graph"])[gross["skizze"]]) == kanon(
        flach(a.s("wahl")["graph"])[gross["skizze"]]
    ), "Skizze im Graphen verändert"
    ohne_dialog(a.snaps)

    b = vorbereitung()
    b.add("e", taste="E")
    b.add("abbruch", taste="Escape")
    b.laufen("skizze-halter")
    assert b.s("abbruch")["graph_hash"] == b.s("wahl")["graph_hash"]
    ohne_dialog(b.snaps)


def test_griff_am_fertigen_hochziehen():
    """Scenario „Griff am fertigen Hochziehen“: das Hochziehen der Grundplatte (hoehe 8 mm) gewählt, Griff um −3 mm gezogen
    und losgelassen: `hoehe` = 5 mm ± 0,5, der Körper ist neu berechnet (Volumen = Fläche × Höhe); nach Rückgängig ist
    `hoehe` wieder 8 mm."""
    s = anfang("skizze-halter")
    platte = next(x for x in _extrudes(s) if mm_param(x, "hoehe") == 8.0)
    a = SAblauf()
    a.add("wahl", klick={"element": platte["id"]})
    a.add("zug", griff={"element": platte["id"], "ziehen_mm": -3})
    a.add("zurueck", befehl="bearbeiten.rueckgaengig")
    a.laufen("skizze-halter")
    hoehe = mm_param(flach(a.s("zug")["graph"])[platte["id"]], "hoehe")
    assert abs(hoehe - 5) <= 0.5, hoehe
    flaeche = 60 * 40 - 2 * math.pi * KREIS_R**2
    vol = gr(ausgang(a.s("zug")["ergebnis"], platte["id"], "koerper")["volumen"], VOLUMEN)
    assert rel(vol, flaeche * hoehe), (vol, flaeche * hoehe)
    assert mm_param(flach(a.s("zurueck")["graph"])[platte["id"]], "hoehe") == 8.0
    ohne_dialog(a.snaps)


def test_budgets_beim_ziehen_und_loslassen():
    """Scenario „Budgets beim Ziehen und Loslassen“: Griff 2 s lang gezogen und losgelassen (5 Wiederholungen): Median von
    `bild_ms` ≤ 16,7 ms, `long_tasks` = 0, Median von `bereit_ms` (Loslassen bis exakter Körper angezeigt) ≤ 500 ms."""
    s = anfang("skizze-halter")
    platte = next(x for x in _extrudes(s) if mm_param(x, "hoehe") == 8.0)
    a = SAblauf().add("wahl", klick={"element": platte["id"]})
    for i in range(5):
        a.add(
            f"z{i}", griff={"element": platte["id"], "ziehen_mm": 4 if i % 2 == 0 else -4, "dauer_ms": 2000}
        )
    a.laufen("skizze-halter")
    schritte = [a.s(f"z{i}") for i in range(5)]
    bild = [z for s_ in schritte for z in flach_zahlen(s_["bild_ms"])]
    assert len(bild) >= 5 * 60, f"zu wenige Bildzeiten: {len(bild)}"
    assert statistics.median(bild) <= 16.7, statistics.median(bild)
    assert sum(s_["long_tasks"] for s_ in schritte) == 0, [s_["long_tasks"] for s_ in schritte]
    assert statistics.median(s_["bereit_ms"] for s_ in schritte) <= 500


# --- AK-13 -----------------------------------------------------------------------------------------------


def test_ansichtswuerfel():
    """Requirement „Ansichtsbausteine“, Scenario „Ansichtswürfel“: Klick auf die Seite „Vorne“, dann „Oben“, dann die Ecke
    vorne rechts oben: das Aktionsprotokoll endet mit `ansicht.vorne`, `ansicht.oben` bzw. `ansicht.isometrisch`;
    `kamera.azimut_deg`/`elevation_deg` sind (0, 0), (0, 89), (−35, 28) auf 0,1°; die drei Weltachsen (X rot, Y grün, Z
    blau nach Tokens `achse.*`) sind in jedem Schnappschuss sichtbar."""
    a = (
        SAblauf()
        .add("vorne", klick={"wuerfel": "vorne"})
        .add("oben", klick={"wuerfel": "oben"})
        .add("iso", klick={"wuerfel": "vorne-rechts-oben"})
        .laufen("skizze-leer")
    )
    soll = {
        "vorne": ("ansicht.vorne", 0, 0),
        "oben": ("ansicht.oben", 0, 89),
        "iso": ("ansicht.isometrisch", -35, 28),
    }
    for name, (befehl, az, el) in soll.items():
        s = a.s(name)
        assert s["protokoll"][-1]["befehl"] == befehl, (name, s["protokoll"][-3:])
        assert abs(s["kamera"]["azimut_deg"] - az) <= 0.1 and abs(s["kamera"]["elevation_deg"] - el) <= 0.1, (
            name,
            s["kamera"],
        )
    tokens = json.loads((ROOT / "docs" / "design" / "tokens.json").read_text("utf-8"))["achse"]
    for s in a.snaps:
        achsen = {x["achse"]: x for x in s["ansichtswuerfel"]["achsen"]}
        assert set(achsen) == {"x", "y", "z"}, achsen
        for n in "xyz":
            assert achsen[n]["sichtbar"] is True, (n, achsen[n])
            assert _hex(achsen[n]["farbe"]) == _hex(tokens[n]["$value"]), (
                n,
                achsen[n]["farbe"],
                tokens[n]["$value"],
            )


def test_picking_budget():
    """Scenario „Picking-Budget“: `pruefen -- skizze messen --dreiecke 200000`: `median_ms` ≤ 4 (der Test rechnet den Median aus
    den 200 Einzelmessungen `raycast_ms` selbst nach)."""
    r = skizze_pruefen("messen", "--dreiecke", "200000")
    assert len(r["raycast_ms"]) == 200, len(r["raycast_ms"])
    assert statistics.median(r["raycast_ms"]) <= 4, statistics.median(r["raycast_ms"])
    assert r["median_ms"] <= 4 and abs(r["median_ms"] - statistics.median(r["raycast_ms"])) <= 0.05


ERLAUBT = {
    "MPL-2.0", "Apache-2.0", "MIT", "BSD-2-Clause", "BSD-3-Clause", "ISC", "Zlib", "CC0-1.0",
    "Unicode-3.0", "Unicode-DFS-2016", "0BSD", "BSL-1.0", "PSF-2.0", "OFL-1.1",
}  # fmt: skip


def _lizenz_ok(ausdruck: str) -> bool:
    teile = ausdruck.replace("(", " ").replace(")", " ").split()
    namen = [t for t in teile if t not in ("OR", "AND", "WITH")]
    if " OR " in f" {ausdruck} ":
        return any(n in ERLAUBT for n in namen)
    return all(n in ERLAUBT for n in namen)


def test_lizenzen():
    """Scenario „Lizenzen“: jedes direkte Paket hat eine Lizenz aus der Liste von ADR-034; `three-mesh-bvh`,
    `camera-controls`, `three-viewport-gizmo` sind enthalten; weder `three-cad-viewer` noch ein Paket mit „planegcs“ im
    Namen steht in `package-lock.json` (der Test liest die Sperrdatei selbst)."""
    r = skizze_pruefen("lizenzen")
    pakete = {p["name"]: p for p in r["pakete"]}
    assert {"three-mesh-bvh", "camera-controls", "three-viewport-gizmo"} <= set(pakete), sorted(pakete)
    schlecht = {n: p["lizenz"] for n, p in pakete.items() if not _lizenz_ok(p["lizenz"])}
    assert schlecht == {}, schlecht
    sperr = json.loads((ROOT / "spikes" / "ux-prototyp-2" / "package-lock.json").read_text("utf-8"))
    namen = {k.rsplit("node_modules/", 1)[-1] for k in sperr.get("packages", {}) if k} | set(
        sperr.get("dependencies", {})
    )
    assert "three-cad-viewer" not in namen
    assert not [n for n in namen if "planegcs" in n.lower()], namen
    direkt = {
        *sperr["packages"][""].get("dependencies", {}),
        *sperr["packages"][""].get("devDependencies", {}),
    }
    assert direkt <= set(pakete), f"nicht aufgeführte direkte Pakete: {sorted(direkt - set(pakete))}"
