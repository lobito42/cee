"""Abnahmetests AP-01 – fachneutraler Kern: zweites, fachfremdes Beispiel (AK-6, ADR-046/047)."""

import json

import pytest
from conftest import ROOT
from test_textprojektion import canonical, cli

SCHEMA = ROOT / "format" / "schema" / "element.schema.json"
EXAMPLE = ROOT / "format" / "examples" / "baugruppe.json"
FORM = {"id", "type", "inputs", "params", "outputs", "content", "meta"}
TYPES = {
    "assembly",
    "part",
    "sketch",
    "extrude",
    "material",
    "frame",
    "variables",
    "component",
    "instance",
    "item",
}
ROOM_TYPES = {"level", "wall", "slab", "opening", "furniture", "absorber"}
STATES = {"in_work", "in_review", "released", "superseded", "blocked"}
jsonschema = pytest.importorskip("jsonschema", reason="jsonschema fehlt (uv sync)")


def _walk(elements):
    for element in elements:
        yield element
        yield from _walk(element.get("content") or [])


def _elements():
    return list(_walk(json.loads(EXAMPLE.read_text(encoding="utf-8"))["elements"]))


def test_ak6_schema_names_no_domain_types():
    """AK-6: Das Elementschema zählt keine Fachtypen auf; `type` ist frei (ADR-046)."""
    text = SCHEMA.read_text(encoding="utf-8")
    found = sorted(t for t in ROOM_TYPES if f'"{t}"' in text)
    assert not found, f"Fachtypen im Schema: {found}"
    type_prop = json.loads(text).get("properties", {}).get("type", {})
    assert "enum" not in type_prop and "const" not in type_prop, "`type` darf keine feste Liste sein"


def test_ak6_assembly_example_uses_the_same_schema():
    """AK-6: Die Baugruppe ist gültig nach demselben Schema, mit derselben Elementform, ohne Raumtypen."""
    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator(schema).validate(json.loads(EXAMPLE.read_text(encoding="utf-8")))
    elements = _elements()
    odd = [e.get("id") for e in elements if set(e) != FORM]
    assert not odd, f"Abweichende Elementform: {odd[:5]}"
    ids = [e["id"] for e in elements]
    assert len(ids) == len(set(ids)), "Element-IDs sind nicht eindeutig"
    kinds = {e["type"] for e in elements}
    assert not TYPES - kinds, f"Elementarten fehlen: {sorted(TYPES - kinds)}"
    assert not kinds & ROOM_TYPES, f"Raumtypen in der Baugruppe: {sorted(kinds & ROOM_TYPES)}"
    outputs = {f"{e['id']}.{name}" for e in elements for name in e["outputs"]}
    dangling = [r for e in elements for r in e["inputs"].values() if r not in outputs]
    assert not dangling, f"Offene Referenzen: {dangling[:5]}"


def test_ak6_instances_placed_on_frames():
    """AK-6: Mindestens zwei Instanzen sitzen über Verbindungspunkte (`at` → frame, `frame` = eigener)."""
    elements = _elements()
    by_id = {e["id"]: e for e in elements}
    frames = {e["id"] for e in elements if e["type"] == "frame"}
    placed = []
    for inst in (e for e in elements if e["type"] == "instance"):
        target = inst["inputs"].get("at", "").split(".")[0]
        own = inst["params"].get("frame")
        comp = by_id.get(inst["inputs"].get("definition", "").split(".")[0])
        own_frames = {x["id"] for x in _walk(comp["content"]) if x["type"] == "frame"} if comp else set()
        if target in frames and own in own_frames:
            placed.append(inst["id"])
    assert len(placed) >= 2, f"Zu wenige über Verbindungspunkte platzierte Instanzen: {placed}"


def test_ak6_variables_are_referenced_with_units():
    """AK-6: Projektvariablen tragen Wert und Einheit und werden über `inputs` referenziert."""
    elements = _elements()
    variables = [e for e in elements if e["type"] == "variables"]
    for v in variables:
        assert v["params"], f"{v['id']}: keine Variablen"
        for name, spec in v["params"].items():
            assert "value" in spec and "unit" in spec, f"{v['id']}.{name}: value/unit fehlt"
            assert name in v["outputs"], f"{v['id']}.{name}: nicht als Ausgang veröffentlicht"
    ids = {v["id"] for v in variables}
    refs = [r for e in elements for r in e["inputs"].values() if r.split(".")[0] in ids]
    assert len(refs) >= 2, "Variablen werden kaum referenziert"


def test_ak6_items_with_number_revision_and_state():
    """AK-6: Items tragen Sachnummer, Revision und Status; einer freigegeben, einer in Arbeit (ADR-047)."""
    elements = _elements()
    items = [e for e in elements if e["type"] == "item"]
    assert len(items) >= 2, "Mindestens zwei Items erwartet"
    for i in items:
        for key in ("number", "revision", "state"):
            assert i["params"].get(key), f"{i['id']}: {key} fehlt"
        assert i["params"]["state"] in STATES, f"{i['id']}: unbekannter Status {i['params']['state']}"
        assert "definition" in i["inputs"], f"{i['id']}: Item ohne Definition"
    states = {i["params"]["state"] for i in items}
    assert {"released", "in_work"} <= states, f"Status-Mix fehlt, gefunden: {sorted(states)}"


def test_ak6_assembly_roundtrip(tmp_path):
    """AK-6: Auch die Baugruppe übersteht JSON → Text → JSON verlustfrei."""
    path = tmp_path / "baugruppe.txt"
    path.write_text(cli("to-text", str(EXAMPLE)), encoding="utf-8")
    back = json.loads(cli("from-text", str(path)))
    assert canonical(back) == canonical(json.loads(EXAMPLE.read_text(encoding="utf-8")))
