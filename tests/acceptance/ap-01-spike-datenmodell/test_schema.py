"""Abnahmetests AP-01 – einheitliche Elementform (AK-3)."""

import json

import pytest
from conftest import ROOT

SCHEMA = ROOT / "format" / "schema" / "element.schema.json"
EXAMPLE = ROOT / "format" / "examples" / "raum.json"
FORM = {"id", "type", "inputs", "params", "outputs", "content", "meta"}
TYPES = {
    "origin",
    "level",
    "wall",
    "slab",
    "opening",
    "furniture",
    "absorber",
    "material",
    "sketch",
    "extrude",
    "part",
    "analysis",
}
BANDS = {"125", "250", "500", "1000", "2000", "4000"}
NEEDS_MATERIAL = {"wall", "slab", "absorber"}
jsonschema = pytest.importorskip("jsonschema", reason="jsonschema fehlt (uv sync)")


def _walk(elements):
    for element in elements:
        yield element
        yield from _walk(element.get("content") or [])


def test_ak3_example_validates_against_schema():
    """AK-3: Das Beispielprojekt ist gültig nach dem Elementschema (JSON Schema 2020-12)."""
    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    assert schema.get("$schema", "").endswith("2020-12/schema")
    jsonschema.Draft202012Validator.check_schema(schema)
    jsonschema.Draft202012Validator(schema).validate(json.loads(EXAMPLE.read_text(encoding="utf-8")))


def test_ak3_every_element_has_the_same_form():
    """AK-3: Jedes Element auf jeder Ebene hat genau dieselben Felder – vom Ursprung bis zum Raum."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    odd = [(e.get("id"), sorted(set(e) ^ FORM)) for e in elements if set(e) != FORM]
    assert not odd, f"Abweichende Elementform: {odd[:5]}"
    ids = [e["id"] for e in elements]
    assert len(ids) == len(set(ids)), "Element-IDs sind nicht eindeutig"


def test_ak3_example_covers_all_kinds():
    """AK-3: Alle Elementarten, mindestens drei Absorber, einer davon per Extrusion."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    missing = TYPES - {e["type"] for e in elements}
    assert not missing, f"Elementarten fehlen: {sorted(missing)}"
    absorbers = [e for e in elements if e["type"] == "absorber"]
    assert len(absorbers) >= 3, "Mindestens drei Absorber erwartet"
    assert any(any(c["type"] == "extrude" for c in _walk(a["content"])) for a in absorbers), (
        "Mindestens ein Absorber muss als Skizze plus Extrusion aufgebaut sein"
    )


def test_ak3_materials_carry_acoustics_and_are_referenced():
    """AK-3: Materialien tragen α je Oktavband; Wand, Decke, Boden, Absorber verweisen darauf."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    materials = {e["id"] for e in elements if e["type"] == "material"}
    for m in (e for e in elements if e["type"] == "material"):
        alpha = m["params"].get("alpha", {})
        assert set(alpha) == BANDS, f"{m['id']}: alpha braucht genau die Bänder {sorted(BANDS)}"
        assert all(0 <= float(v) <= 1 for v in alpha.values()), f"{m['id']}: alpha außerhalb 0..1"
    for e in (e for e in elements if e["type"] in NEEDS_MATERIAL):
        refs = [r.split(".")[0] for k, r in e["inputs"].items() if k.startswith("material")]
        assert refs and all(r in materials for r in refs), f"{e['id']} ({e['type']}) ohne gültiges Material"


def test_ak3_references_resolve():
    """AK-3: Jede Referenz in inputs zeigt auf einen existierenden Ausgang (<id>.<output>)."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    outputs = {f"{e['id']}.{name}" for e in elements for name in e["outputs"]}
    refs = [ref for e in elements for ref in e["inputs"].values()]
    dangling = [r for r in refs if r not in outputs]
    assert refs and not dangling, f"Offene Referenzen: {dangling[:5]}"
