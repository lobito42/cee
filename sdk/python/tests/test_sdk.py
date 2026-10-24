"""Unit-Tests des Python-SDK (ap-40). Voraussetzung: `maturin develop` (siehe sdk/python/README.md)."""

from __future__ import annotations

import dataclasses

import pytest

# Ohne gebaute Erweiterung (z. B. im allgemeinen Testlauf ohne maturin develop) gibt es nichts zu prüfen.
pytest.importorskip("cee_sdk._graph", reason="cee_sdk nicht gebaut: maturin develop (sdk/python/README.md)")

import cee_sdk  # noqa: E402
from cee_sdk import CeeError, Document, Element, Quantity, States  # noqa: E402

PROJECT = {
    "schema_version": 1,
    "elements": [
        {
            "id": "a",
            "type": "thing",
            "inputs": {},
            "params": {"h": {"value": 12, "unit": "mm"}, "preis": {"amount": "1.50", "currency": "EUR"}},
            "outputs": {"out": "thing"},
            "content": [],
            "meta": {"name": "a"},
        },
        {
            "id": "b",
            "type": "thing",
            "inputs": {"in": "a.out"},
            "params": {},
            "outputs": {"out": "thing"},
            "content": [],
            "meta": {"name": "b"},
        },
    ],
}


@pytest.fixture
def doc() -> Document:
    return Document.import_project(PROJECT)


def test_groessen_ueber_den_kern():
    assert Quantity.parse("1,2 m", default="mm") == Quantity(1200.0, "mm")
    assert Quantity(1.5, "m").to("mm") == Quantity(1500.0, "mm")
    with pytest.raises(CeeError) as e:
        Quantity(1, "m").to("kg")
    assert e.value.code == "dimension_mismatch"
    with pytest.raises(dataclasses.FrozenInstanceError):
        Quantity(1, "m").value = 2  # type: ignore[misc]
    assert any(u["code"] == "mm" for u in cee_sdk.units())


def test_operationen_und_fehler(doc: Document):
    op = {"op": "set_param", "id": "a", "param": "h", "value": {"value": 1.2, "unit": "m"}}
    assert doc.apply_op(op) == {"result": "ok", "warnings": []}
    with pytest.raises(CeeError) as e:
        doc.apply_op({"op": "set_input", "id": "a", "name": "in", "target": "b.out"})
    assert (e.value.code, e.value.element) == ("cycle", "a")
    out = doc.apply([{"op": "remove", "id": "fehlt"}])
    assert out["results"][0]["result"] == "unknown_element"
    with pytest.raises(CeeError) as e:
        Document.load(b"kein Dokument")
    assert e.value.code == "invalid_document"


def test_speichern_laden_zusammenfuehren(doc: Document):
    other = Document.load(doc.save())
    assert other.hash() == doc.hash()
    other.apply_op({"op": "set_meta", "id": "b", "key": "k", "value": "v"})
    doc.merge(other)
    assert doc.hash() == other.hash()
    assert doc.export()["elements"][0]["id"] == "a"
    assert doc.export_text().startswith("{")


def test_abfragen(doc: Document):
    assert doc.validate() == {"findings": []}
    assert doc.order()["order"] == ["a", "b"]
    assert doc.affected(["a"]) == {"affected": ["a", "b"]}
    assert doc.subgraph("a")["elements"] == ["a"]
    assert doc.migrate() == {"before": 1, "after": 1}
    assert doc.materialized_count() == 0


def test_element_lesen(doc: Document):
    el = doc.element("a")
    assert isinstance(el, Element)
    assert (el.id, el.type) == ("a", "thing")
    assert el.params["h"] == Quantity(12, "mm")
    assert el.params["preis"] == {"amount": "1.50", "currency": "EUR"}
    assert dict(doc.element("b").inputs) == {"in": "a.out"}
    assert doc.materialized_count() == 2
    with pytest.raises(CeeError) as e:
        doc.element("fehlt")
    assert e.value.code == "missing_target"


def test_zustaende(doc: Document):
    s = States(doc)
    assert s.ready() == ["a"]
    s.event({"event": "start", "id": "a"})
    s.event({"event": "ok", "id": "a"})
    assert s.get()["states"]["a"] == "current"
    assert States.new(doc).ready() == ["a"]


def test_fachpakete(doc: Document):
    assert isinstance(cee_sdk.packages(), list)
    with pytest.raises(CeeError) as e:
        cee_sdk.call("gibt.es_nicht", doc, {})
    assert e.value.code == "unknown_function"
