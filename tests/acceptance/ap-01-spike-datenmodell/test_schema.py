"""Abnahmetests AP-01 – einheitliche Elementform (AK-3)."""

import json

import pytest
from conftest import ROOT

SCHEMA = ROOT / "format" / "schema" / "element.schema.json"
EXAMPLE = ROOT / "format" / "examples" / "halter.json"
FORM = {"id", "type", "inputs", "params", "outputs", "content", "meta"}
TYPES = {"origin", "axis", "plane", "sketch", "extrude", "face-ref", "part", "assembly", "pmi", "sheet"}
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
    """AK-3: Jedes Element auf jeder Ebene hat genau dieselben Felder – vom Ursprung bis zur Baugruppe."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    odd = [(e.get("id"), sorted(set(e) ^ FORM)) for e in elements if set(e) != FORM]
    assert not odd, f"Abweichende Elementform: {odd[:5]}"
    ids = [e["id"] for e in elements]
    assert len(ids) == len(set(ids)), "Element-IDs sind nicht eindeutig"


def test_ak3_example_covers_all_kinds():
    """AK-3: Das Beispiel enthält alle Elementarten und eine Baugruppe aus drei Bauteilen."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    missing = TYPES - {e["type"] for e in elements}
    assert not missing, f"Elementarten fehlen: {sorted(missing)}"
    assemblies = [e for e in elements if e["type"] == "assembly"]
    assert any(sum(1 for c in a["content"] if c["type"] == "part") >= 3 for a in assemblies)


def test_ak3_references_resolve():
    """AK-3: Jede Referenz in inputs zeigt auf einen existierenden Ausgang (<id>.<output>)."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    outputs = {f"{e['id']}.{name}" for e in elements for name in e["outputs"]}
    refs = [ref for e in elements for ref in e["inputs"].values()]
    dangling = [r for r in refs if r not in outputs]
    assert refs and not dangling, f"Offene Referenzen: {dangling[:5]}"
