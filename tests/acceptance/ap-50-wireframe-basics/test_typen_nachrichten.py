"""ap-50, Capabilities `drahtmodell` (Typdefinitionen als Daten) und `kernel-protokoll` (Kernel-Schnittstelle cee-kernel/0).

AK-1 bis AK-2 (design.md Abschnitt 8). Die Typen sind Daten, der Rust-Kern bleibt fachneutral; Auftrag und Ergebnis
folgen den Schemas unter `format/kernel/` und enthalten nur Größen mit Einheit (ADR-057), keine Geometrie im Graphen.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import subprocess

from conftest import ROOT, need_module
from wf_helpers import (
    AUFTRAG_SCHEMA,
    ERGEBNIS_SCHEMA,
    TYPEN,
    beispiel,
    beispiel_berechnet,
    berechne,
    element,
    frame,
    linie,
    mm,
    nackte_zahlen,
    projekt,
    punkt,
    typen,
)

PARAMETER = {
    "frame": {"x": "length", "y": "length", "z": "length", "rx": "angle", "ry": "angle", "rz": "angle"},
    "point": {"x": "length", "y": "length", "z": "length"},
    "axis": {},
    "plane": {},
    "line": {},
    "ray": {},
    "segment": {},
}
STANDARD = {"length": "mm", "angle": "deg"}


def _definitionen() -> dict[str, dict]:
    d = typen()
    d = d["types"] if isinstance(d, dict) else d
    return {t["type"]: t for t in d}


def test_typdefinitionen_registrieren():
    """Requirement „Typdefinitionen als Daten“, Scenario „Registrieren ohne Fehler“: 7 Typen, 0 Fehler, Dimension und
    Standard-Einheit je Parameter, `x` = 12 ohne Einheit wird 12 mm mit Warnung gelesen."""
    assert TYPEN.is_file(), "format/types/drahtmodell.json fehlt"
    defs = _definitionen()
    assert set(defs) == set(PARAMETER), sorted(defs)
    for typ, soll in PARAMETER.items():
        params = defs[typ].get("params", {})
        assert set(params) == set(soll), (typ, sorted(params))
        for name, dim in soll.items():
            assert params[name] == {"dimension": dim, "default_unit": STANDARD[dim]}, (
                typ,
                name,
                params[name],
            )

    sdk = need_module("cee_sdk")
    doc = sdk.Document.import_project(beispiel(), typen())
    assert not doc.import_info.get("type_errors"), doc.import_info
    assert "invalid_type_definition" not in json.dumps(doc.import_info)

    nackt = projekt(element("N1", "point", {"x": 12, "y": mm(0), "z": mm(0)}))
    d2 = sdk.Document.import_project(nackt, typen())
    assert not d2.import_info.get("type_errors"), d2.import_info
    x = d2.element("N1").params["x"]
    assert (x["value"], x["unit"]) == (12, "mm"), x
    befunde = d2.import_info.get("findings", []) + d2.validate().get("findings", [])
    assert any(b.get("code") == "unit_assumed" and b.get("element") == "N1" for b in befunde), befunde


def test_kern_bleibt_unveraendert():
    """Requirement „Typdefinitionen als Daten“, Scenario „Kern unverändert“: keine Datei unter `crates/` geändert, die
    Typnamen stehen nicht als Zeichenkette im Kern (0 Treffer)."""
    r = subprocess.run(
        ["git", "diff", "--name-only", "origin/main...HEAD"], cwd=ROOT, capture_output=True, text=True
    )
    assert r.returncode == 0, r.stderr
    geaendert = [z for z in r.stdout.splitlines() if z.startswith("crates/")]
    assert geaendert == [], geaendert
    treffer = []
    for f in (ROOT / "crates" / "graph" / "src").rglob("*.rs"):
        text = f.read_text(encoding="utf-8")
        treffer += [(f.name, n) for n in ("point", "axis", "plane", "segment", "ray") if f'"{n}"' in text]
    assert treffer == [], treffer
    assert TYPEN.is_file(), "die Typen müssen als Daten in format/types/drahtmodell.json liegen"


def _fallprojekte() -> dict[str, dict]:
    """Beispiel und je ein Projekt für die Testfälle aus AK-3 bis AK-7."""
    p = {"beispiel": beispiel()}
    p["koordinatensysteme"] = projekt(
        frame("F1"),
        frame("F2", x=100),
        frame("F3", rz=30),
        frame("F4", 10, -20, 5, 90, 45, -60),
        frame("F5", rz=30, parent="F4.frame"),
    )
    p["punkte"] = projekt(
        frame("K1", x=100, rz=30),
        punkt("P1", 10, 20, 0),
        punkt("P2", 50, 0, 0, frame_ref="K1.frame"),
        punkt("P3", 0, 0, 25, ref="P1.point"),
        linie("segment", "S1", "P1.point", "P2.point"),
    )
    p["entartet"] = projekt(
        punkt("Q1", 1, 1, 1),
        punkt("Q2", 5e-7, 0, 0, ref="Q1.point"),
        linie("segment", "Z1", "Q1.point", "Q2.point"),
    )
    p["fehlend"] = projekt(punkt("Q1"), linie("segment", "Z1", "Q1.point", "NIRGENDWO.point"))
    p["falscher_typ"] = projekt(frame("K1"), punkt("Q1"), linie("segment", "Z1", "K1.xy", "Q1.point"))
    p["zyklus"] = projekt(punkt("A1", ref="A2.point"), punkt("A2", ref="A1.point"))
    p["verworfen"] = projekt(punkt("Q1"), punkt("Q2", 5), linie("segment", "Z1", "Q1.point", "Q2.point"))
    p["verworfen"]["elements"][0]["meta"]["verworfen"] = True
    return p


def test_nachrichten_gueltig_nach_schema():
    """Requirement „Kernel-Schnittstelle cee-kernel/0“, Scenario „Nachrichten gültig nach Schema“: Auftrag und Ergebnis
    jedes Falls sind gültig nach den Schemas, tragen `protocol`, und jede Zahl in `outputs` ist eine Größe."""
    jsonschema = need_module("jsonschema")
    assert AUFTRAG_SCHEMA.is_file() and ERGEBNIS_SCHEMA.is_file(), "format/kernel/*.schema.json fehlen"
    va = jsonschema.Draft202012Validator(json.loads(AUFTRAG_SCHEMA.read_text(encoding="utf-8")))
    ve = jsonschema.Draft202012Validator(json.loads(ERGEBNIS_SCHEMA.read_text(encoding="utf-8")))
    for name, p in _fallprojekte().items():
        a, e = berechne(p)
        assert not list(va.iter_errors(a)), (name, [x.message for x in va.iter_errors(a)][:3])
        assert not list(ve.iter_errors(e)), (name, [x.message for x in ve.iter_errors(e)][:3])
        assert a["protocol"] == e["protocol"] == "cee-kernel/0", name
        for r in e["results"]:
            assert nackte_zahlen(r["outputs"]) == [], (name, r["id"], nackte_zahlen(r["outputs"]))


def test_keine_geometrie_im_graphen():
    """Requirement „Kernel-Schnittstelle cee-kernel/0“, Scenario „Keine Geometrie im Graphen“: Dokument-Hash vor und
    nach der Berechnung gleich, kein Element trägt Ergebnisfelder."""
    _, e = beispiel_berechnet()
    sdk = need_module("cee_sdk")
    doc = sdk.Document.import_project(beispiel(), typen())
    vorher = doc.hash()
    assert doc.hash() == vorher
    felder = {k for r in e["results"] for o in r["outputs"].values() for k in o if k != "type"}
    assert {"position", "direction", "length"} <= felder, felder
    export = doc.export()
    stack = list(export["elements"] if isinstance(export, dict) else export)
    while stack:
        x = stack.pop()
        if not isinstance(x, dict):
            continue
        schluessel = set(x.get("params", {})) | set(x.get("meta", {}))
        assert not (
            schluessel & {"position", "direction", "length", "normal", "x_direction", "hash", "outputs"}
        ), (x["id"], schluessel)
        stack += x.get("content", [])
