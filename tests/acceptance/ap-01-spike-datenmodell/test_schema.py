"""Abnahmetests AP-01 – einheitliche Elementform (AK-3)."""

import json

from conftest import ROOT, need_module

SCHEMA = ROOT / "format" / "schema" / "element.schema.json"
EXAMPLE = ROOT / "format" / "examples" / "raum.json"
# Stand des Formats zum Ende des Spikes: ap-05a führt Größen mit Einheit ein (ADR-057), damit sind
# nackte Zahlen und α ohne Einheit im lebenden Beispiel absichtlich weg. Tests, die genau diese
# Spike-Form prüfen, lesen den eingefrorenen Stand.
SPIKE_EXAMPLE = ROOT / "tests" / "golden" / "ap-01-spike-datenmodell" / "raum.json"
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
    "component",
    "instance",
}
BANDS = {"125", "250", "500", "1000", "2000", "4000"}
NEEDS_MATERIAL = {"wall", "slab", "absorber"}
jsonschema = need_module("jsonschema")


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
    """AK-3: Alle Elementarten kommen vor; mindestens ein Absorber ist per Skizze und Extrusion gebaut."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    missing = TYPES - {e["type"] for e in elements}
    assert not missing, f"Elementarten fehlen: {sorted(missing)}"
    absorbers = [e for e in elements if e["type"] == "absorber"]
    assert any(any(c["type"] == "extrude" for c in _walk(a["content"])) for a in absorbers), (
        "Mindestens ein Absorber muss als Skizze plus Extrusion aufgebaut sein"
    )


def test_ak3_component_with_variants_and_instances():
    """AK-3: Komponente mit ≥ 2 Varianten, ≥ 3 Instanzen davon, eine mit Überschreibung (ADR-043)."""
    project = json.loads(EXAMPLE.read_text(encoding="utf-8"))
    elements = list(_walk(project["elements"]))
    components = {e["id"]: e for e in elements if e["type"] == "component"}
    absorber_components = [
        c for c in components.values() if any(x["type"] == "absorber" for x in _walk(c["content"]))
    ]
    assert absorber_components, "Keine Komponente mit Absorber im Untergraphen"
    comp = absorber_components[0]
    assert len(comp["params"].get("variants", {})) >= 2, "Komponente braucht mindestens zwei Varianten"
    assert comp["params"].get("parameters"), "Komponente ohne exponierte Parameter"
    instances = [
        e
        for e in elements
        if e["type"] == "instance" and e["inputs"].get("definition") == f"{comp['id']}.definition"
    ]
    assert len(instances) >= 3, "Mindestens drei Instanzen der Absorber-Komponente erwartet"
    for i in instances:
        assert i["params"].get("variant") in comp["params"]["variants"], f"{i['id']}: unbekannte Variante"
        assert not i["content"], f"{i['id']}: Instanz darf keine Kopie des Untergraphen enthalten"
        assert set(i["params"].get("overrides", {})) <= set(comp["params"]["parameters"]), (
            f"{i['id']}: Überschreibung eines nicht exponierten Parameters"
        )
    assert any(i["params"].get("overrides") for i in instances), "Keine Instanz mit Überschreibung"


def test_ak3_materials_carry_acoustics_and_are_referenced():
    """AK-3: Materialien tragen α je Oktavband; Wand, Decke, Boden, Absorber verweisen darauf."""
    project = json.loads(SPIKE_EXAMPLE.read_text(encoding="utf-8"))
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
