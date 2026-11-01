"""ap-53, Capabilities `skizze` und `hochziehen`: Typdefinitionen als Daten und Erweiterung von cee-kernel/0 (AK-1).

Alle Prüfwerte entstehen im Test; die Typen sind Daten, der Rust-Kern bleibt fachneutral (ADR-046).
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import ROOT, need_module  # noqa: E402
from skz_helpers import (  # noqa: E402
    BEISPIEL_SKIZZE,
    ERGEBNIS_SCHEMA,
    TYPEN_DRAHT,
    TYPEN_SKIZZE,
    halter_elemente,
    hochziehen,
    nackte_zahlen_ausser_anzeige,
    rechne,
    s_kreis,
    s_linie,
    s_rechteck,
    skizze,
)
from wf_helpers import beispiel_berechnet, berechne, projekt  # noqa: E402

SKIZZEN_TYPEN = ["sketch", "sketch_line", "sketch_rectangle", "sketch_circle"]
LAENGEN = {
    "sketch_line": {"u1", "v1", "u2", "v2"},
    "sketch_rectangle": {"u1", "v1", "u2", "v2"},
    "sketch_circle": {"u", "v", "d"},
}


def _typen(pfad: Path) -> dict[str, dict]:
    assert pfad.is_file(), f"{pfad.relative_to(ROOT)} fehlt"
    d = json.loads(pfad.read_text(encoding="utf-8"))
    d = d["types"] if isinstance(d, dict) else d
    return {t["type"]: t for t in d}


def _liste(pfad: Path) -> list:
    d = json.loads(pfad.read_text(encoding="utf-8"))
    return d["types"] if isinstance(d, dict) else d


def _eingaenge(t: dict) -> set[str]:
    e = t.get("inputs", {})
    return {x if isinstance(x, str) else x["name"] for x in e}


def _kern_enthaelt(name: str) -> list[str]:
    treffer = []
    for f in (ROOT / "crates" / "graph" / "src").rglob("*.rs"):
        if name in f.read_text(encoding="utf-8"):
            treffer.append(f.name)
    return treffer


def test_skizzentypen_registrieren_ohne_kern_code():
    """Requirement „Typdefinitionen der Skizze als Daten“, Scenario „Registrieren ohne Kern-Code“: 4 Typen aus
    `format/types/skizze.json` zusammen mit `drahtmodell.json` über das SDK registriert, `format/examples/skizze.json`
    mit `validate()` geprüft: 0 Befunde der Schwere Fehler; jeder Längen-Parameter hat `dimension` = `length` und
    `default_unit` = `mm`; keine der 4 Typ-Zeichenketten in `crates/graph/src/**/*.rs`."""
    defs = _typen(TYPEN_SKIZZE)
    for typ in SKIZZEN_TYPEN:
        assert typ in defs, f"Typ {typ} fehlt in skizze.json: {sorted(defs)}"
    for typ, namen in LAENGEN.items():
        params = defs[typ].get("params", {})
        assert set(params) == namen, (typ, sorted(params))
        for n in namen:
            assert params[n] == {"dimension": "length", "default_unit": "mm"}, (typ, n, params[n])
    assert _eingaenge(defs["sketch"]) == {"ebene"}, defs["sketch"]
    for typ in ("sketch_line", "sketch_rectangle", "sketch_circle"):
        assert _eingaenge(defs[typ]) == set(), (typ, "Skizzenelemente haben keine Eingänge")

    sdk = need_module("cee_sdk")
    assert BEISPIEL_SKIZZE.is_file(), "format/examples/skizze.json fehlt"
    typen = _liste(TYPEN_DRAHT) + _liste(TYPEN_SKIZZE)
    beispiel = json.loads(BEISPIEL_SKIZZE.read_text(encoding="utf-8"))
    doc = sdk.Document.import_project(beispiel, typen)
    assert not doc.import_info.get("type_errors"), doc.import_info
    fehler = [
        b
        for b in doc.import_info.get("findings", []) + doc.validate().get("findings", [])
        if b.get("severity") == "error"
    ]
    assert fehler == [], fehler

    for typ in SKIZZEN_TYPEN:
        assert _kern_enthaelt(f'"{typ}"') == [], f"{typ} steht im Rust-Kern"
        assert _kern_enthaelt(typ) == [], f"{typ} steht im Rust-Kern (auch ohne Anführungszeichen)"


def test_extrude_registrieren_ohne_kern_code():
    """Requirement „Typdefinition Hochziehen als Daten“, Scenario „Registrieren ohne Kern-Code“: `extrude` hat genau den
    Eingang `skizze` und die 3 Parameter `punkt_u`, `punkt_v`, `hoehe` mit `dimension` = `length` und `default_unit` =
    `mm`; `\"extrude\"` kommt in `crates/graph/src/**/*.rs` nicht vor."""
    defs = _typen(TYPEN_SKIZZE)
    assert "extrude" in defs, sorted(defs)
    t = defs["extrude"]
    assert _eingaenge(t) == {"skizze"}, t.get("inputs")
    params = t.get("params", {})
    assert set(params) == {"punkt_u", "punkt_v", "hoehe"}, sorted(params)
    for n, p in params.items():
        assert p == {"dimension": "length", "default_unit": "mm"}, (n, p)
    assert _kern_enthaelt('"extrude"') == []
    assert _kern_enthaelt("extrude") == []

    sdk = need_module("cee_sdk")
    doc = sdk.Document.import_project(
        json.loads(BEISPIEL_SKIZZE.read_text(encoding="utf-8")), _liste(TYPEN_DRAHT) + _liste(TYPEN_SKIZZE)
    )
    assert not doc.import_info.get("type_errors"), doc.import_info


def test_schemas_gueltig_und_additiv():
    """Requirement „Erweiterung von cee-kernel/0“, Scenario „Schemas gültig und additiv“: Ergebnisse aller Scenarios dieses
    Changes und das Ergebnis von `format/examples/drahtmodell.json` sind gültig nach `ergebnis.schema.json`, `protocol`
    ist überall `cee-kernel/0`; jede Zahl in `outputs` ist eine Größe (Ausnahmen: Anzeige-Listen `netz`, `kantenzuege`
    und Anzahlen)."""
    jsonschema = need_module("jsonschema")
    assert ERGEBNIS_SCHEMA.is_file(), "format/kernel/ergebnis.schema.json fehlt"
    validator = jsonschema.Draft202012Validator(json.loads(ERGEBNIS_SCHEMA.read_text(encoding="utf-8")))

    faelle = {
        "quader_zylinder": [
            skizze("S1", "K0.xy", s_rechteck("R1", -30, -20, 30, 20), s_kreis("C1", 100, 0, 20)),
            hochziehen("X1", "S1", 0, 0, 8),
            hochziehen("X2", "S1", 100, 0, -15),
        ],
        "loecher": [
            skizze(
                "S1",
                "K0.xy",
                s_rechteck("R1", -30, -20, 30, 20),
                s_kreis("C1", -20, 4, 6.6),
                s_kreis("C2", 20, 4, 6.6),
            ),
            hochziehen("X1", "S1", 0, -10, 8),
        ],
        "linienzug": [
            skizze(
                "S1",
                "K0.xy",
                s_linie("L1", 0, 0, 40, 0),
                s_linie("L2", 40, 0, 40, 30),
                s_linie("L3", 40, 30, 0, 30),
                s_linie("L4", 0, 30, 0, 0),
                s_linie("L5", 60, 0, 90, 0),
            )
        ],
        "schnitt": [
            skizze(
                "S1",
                "K0.xy",
                s_rechteck("R1", 0, 0, 20, 20),
                s_rechteck("R2", 10, 10, 30, 30),
                s_kreis("C1", 100, 0, 10),
            )
        ],
        "befunde": [
            skizze(
                "S1",
                "K0.xy",
                s_linie("L1", 0, 0, 0, 0),
                s_kreis("C1", 0, 0, 0),
                s_rechteck("R1", 0, 0, 10, 10),
            ),
            s_linie("LX", 0, 0, 10, 0),
            hochziehen("X1", "S1", 500, 500, 8),
            hochziehen("X2", "S1", 5, 5, 0),
            hochziehen("X3", "S1", 5, 5, 3),
        ],
    }
    ergebnisse = {name: rechne(*el) for name, el in faelle.items()}
    ergebnisse["halter"] = berechne(projekt(*halter_elemente()))[1]
    ergebnisse["ap50_beispiel"] = beispiel_berechnet()[1]
    for name, e in ergebnisse.items():
        fehler = [x.message for x in validator.iter_errors(e)]
        assert not fehler, (name, fehler[:3])
        assert e["protocol"] == "cee-kernel/0", name
        for r in e["results"]:
            assert nackte_zahlen_ausser_anzeige(r["outputs"]) == [], (
                name,
                r["id"],
                nackte_zahlen_ausser_anzeige(r["outputs"]),
            )
    # Körper tragen Netz und Kantenzüge mit Einheit mm (einmal am Netz bzw. an den Kantenzügen)
    koerper = [
        o
        for r in ergebnisse["quader_zylinder"]["results"]
        for o in r["outputs"].values()
        if o.get("type") == "solid"
    ]
    assert len(koerper) == 2, koerper
    for o in koerper:
        assert o["netz"].get("unit") == "mm", o["netz"].keys()
        kz = o["kantenzuege"]
        assert (kz.get("unit") if isinstance(kz, dict) else "mm") == "mm"
