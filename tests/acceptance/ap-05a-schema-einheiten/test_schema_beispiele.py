"""AK-5: Schema v1 und Beispiele (Capability `graph-kern`)."""

from __future__ import annotations

import json

from conftest import ROOT, need_module
from graphctl_helpers import ctl_json, element, project

jsonschema = need_module("jsonschema")

SCHEMA = ROOT / "format" / "schema" / "element.schema.json"
EXAMPLES = [ROOT / "format" / "examples" / n for n in ("raum.json", "baugruppe.json")]


def _validator():
    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator.check_schema(schema)
    return jsonschema.Draft202012Validator(schema), schema


def test_beispiele_ohne_befunde_und_schemafehler():
    """Requirement Schema v1: Kern meldet 0 Befunde (auch keine Warnungen), Schema-Prüfer 0 Fehler."""
    validator, _ = _validator()
    for path in EXAMPLES:
        assert list(validator.iter_errors(json.loads(path.read_text(encoding="utf-8")))) == [], path.name
        findings = ctl_json("validate", path)["findings"]
        assert findings == [], (path.name, findings[:5])


def test_schema_ist_version_1_und_ohne_typliste():
    """Requirement Schema v1: keine Aufzählung von Werten für `type`, Version 1, nicht mehr Entwurf."""
    _, schema = _validator()
    # Die offizielle Kennung des Metaschemas („…/draft/2020-12/schema“) ist kein Entwurfsvermerk.
    text = SCHEMA.read_text(encoding="utf-8").replace(schema.get("$schema", ""), "")
    assert schema.get("$schema") == "https://json-schema.org/draft/2020-12/schema"
    assert "Entwurf" not in text and "draft" not in text.lower()
    type_schemas = []

    def walk(node):
        if isinstance(node, dict):
            if "type" in node.get("properties", {}):
                type_schemas.append(node["properties"]["type"])
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(schema)
    assert type_schemas, "Schema beschreibt kein Feld `type`"
    for t in type_schemas:
        assert "enum" not in t and "const" not in t, t
    defs = schema.get("$defs", {})
    # Größe und Geld als `$defs` (design.md); Namen frei, die Wirkung prüft test_schema_erzwingt_groessen.
    assert len(defs) >= 2, f"Schema hat nur {len(defs)} $defs, erwartet Größe und Geld"


def test_schema_erzwingt_groessen():
    """Requirement Schema v1: nackte Zahl und Geld als Gleitkommazahl sind Schemafehler."""
    validator, _ = _validator()
    naked = project([element("a", "thing", {"height": 1200})])
    money = project([element("b", "thing", {"cost": {"amount": 12.5, "currency": "EUR"}})])
    assert list(validator.iter_errors(naked)), "nackte Zahl in params wurde akzeptiert"
    assert list(validator.iter_errors(money)), "Geld als Gleitkommazahl wurde akzeptiert"
    good = project(
        [
            element(
                "c",
                "thing",
                {"height": {"value": 1200, "unit": "mm"}, "cost": {"amount": "12.50", "currency": "EUR"}},
            )
        ]
    )
    assert list(validator.iter_errors(good)) == []
