"""Python-SDK für CEE (ap-40): Dokument, Größen, Fehler und Lesezugriff auf Elemente.

Alle Wirkung liegt im Rust-Kern (`crates/graph` über die Fassade `crates/bind` und die PyO3-Erweiterung
`cee_sdk._graph`, ADR-029). Dieses Paket wandelt nur zwischen Python-Werten und JSON an der Grenze; es enthält
keine Umrechnungsfaktoren und keine Regeln des Datenmodells.

Beispiel::

    from cee_sdk import Document, Quantity

    doc = Document.import_project({"schema_version": 1, "elements": [...]})
    doc.apply_op({"op": "set_param", "id": "a", "param": "h", "value": {"value": 1.2, "unit": "m"}})
    Quantity.parse("1,2 m", default="mm").to("[in_i]")
"""

from __future__ import annotations

import json
from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from types import MappingProxyType
from typing import Any

__all__ = [
    "CeeError",
    "Document",
    "Element",
    "Quantity",
    "States",
    "call",
    "packages",
    "units",
]

Json = Any


class CeeError(Exception):
    """Fehler des Kerns mit stabilem `code` (z. B. `unknown_unit`), `message` und betroffenem `element`."""

    def __init__(self, code: str, message: str, element: str | None = None) -> None:
        super().__init__(f"{code}: {message}")
        self.code = code
        self.message = message
        self.element = element


# Die Erweiterung braucht `CeeError` beim Werfen; deshalb erst danach laden.
from . import _graph  # noqa: E402


def _text(value: Json) -> str:
    """Python-Wert oder JSON-Text als JSON-Text für den Kern."""
    return value if isinstance(value, str) else json.dumps(value, ensure_ascii=False)


def _opt_text(value: Json | None) -> str | None:
    return None if value is None else _text(value)


def units() -> list[dict[str, Any]]:
    """Einheitentabelle des Kerns: `[{"code", "dimension", "factor"}]`."""
    return json.loads(_graph.units())


def packages() -> list[str]:
    """Namen der angemeldeten Fachpaket-Funktionen."""
    return json.loads(_graph.packages())


def call(name: str, doc: Document, args: Json) -> Json:
    """Lesende Fachpaket-Funktion `name` (z. B. `beispiel.summe`) auf `doc` aufrufen."""
    return json.loads(_graph.call(name, doc._raw, _text(args)))


@dataclass(frozen=True)
class Quantity:
    """Größe mit Einheit (UCUM-Code). Umrechnen und Lesen laufen über die Einheitentabelle des Kerns."""

    value: float
    unit: str

    @classmethod
    def parse(cls, text: str, default: str | None = None) -> Quantity:
        """Eingabe wie „1,2 m“ oder „90°“ lesen; Ergebnis in kanonischer Einheit."""
        q = json.loads(_graph.parse(text, default))
        return cls(q["value"], q["unit"])

    def to(self, unit: str) -> Quantity:
        """In `unit` umrechnen (gleiche Dimension, sonst `CeeError` mit `dimension_mismatch`)."""
        return Quantity(_graph.convert(float(self.value), self.unit, unit), unit)


def _param(value: Json) -> Json:
    """Parameterwert für Script-Elemente: Größen als `Quantity`, alles andere (z. B. Geld) unverändert."""
    if (
        isinstance(value, dict)
        and set(value) == {"value", "unit"}
        and isinstance(value["value"], int | float)
        and not isinstance(value["value"], bool)
        and isinstance(value["unit"], str)
    ):
        return Quantity(value["value"], value["unit"])
    return value


class Element:
    """Ein Element, lesend: `id`, `type`, `params`, `inputs`, `outputs`, `content` (IDs), `meta`."""

    __slots__ = ("_data", "_params")

    def __init__(self, data: Mapping[str, Any]) -> None:
        self._data = dict(data)
        self._params = {k: _param(v) for k, v in self._data.get("params", {}).items()}

    @property
    def id(self) -> str:
        return self._data["id"]

    @property
    def type(self) -> str:
        return self._data["type"]

    @property
    def params(self) -> Mapping[str, Any]:
        return MappingProxyType(self._params)

    @property
    def inputs(self) -> Mapping[str, str]:
        return MappingProxyType(self._data.get("inputs", {}))

    @property
    def outputs(self) -> Mapping[str, str]:
        return MappingProxyType(self._data.get("outputs", {}))

    @property
    def content(self) -> tuple[str, ...]:
        return tuple(self._data.get("content", []))

    @property
    def meta(self) -> Mapping[str, Any]:
        return MappingProxyType(self._data.get("meta", {}))

    def to_dict(self) -> dict[str, Any]:
        """Element-JSON wie vom Kern geliefert."""
        return json.loads(json.dumps(self._data))

    def __repr__(self) -> str:
        return f"Element(id={self.id!r}, type={self.type!r})"


class Document:
    """Dokument des Element-Graphen. Eingaben als `dict`/`list` oder JSON-Text, Ausgaben als `dict`/`list`."""

    __slots__ = ("_raw", "import_info")

    def __init__(self, raw: Any, import_info: dict[str, Any] | None = None) -> None:
        self._raw = raw
        self.import_info: dict[str, Any] = import_info or {}

    @classmethod
    def new(cls) -> Document:
        """Leeres Dokument."""
        return cls(_graph.Doc.new())

    @classmethod
    def import_project(cls, project: Json, types: Json | None = None) -> Document:
        """Projekt-JSON importieren; Befunde des Imports stehen in `import_info`."""
        raw = _graph.Doc.import_project(_text(project), _opt_text(types))
        return cls(raw, json.loads(raw.import_info()))

    @classmethod
    def load(cls, data: bytes, types: Json | None = None) -> Document:
        """Gespeicherte Bytes laden (Migrationen beim Öffnen); sonst `CeeError` mit `invalid_document`."""
        return cls(_graph.Doc.load(bytes(data), _opt_text(types)))

    def save(self) -> bytes:
        return self._raw.save()

    def apply_op(self, op: Json) -> dict[str, Any]:
        """Eine Operation anwenden; abgelehnte Operationen werfen `CeeError` und ändern nichts."""
        return json.loads(self._raw.apply_op(_text(op)))

    def apply(self, ops: Json) -> dict[str, Any]:
        """Operationsliste anwenden; Ergebnis `{"results": [...]}` je Operation."""
        return json.loads(self._raw.apply(_text(ops)))

    def export(self) -> dict[str, Any]:
        """Kanonisches Projekt-JSON."""
        return json.loads(self._raw.export())

    def export_text(self) -> str:
        """Kanonisches Projekt-JSON als Text (bitgleich zu `graphctl export`)."""
        return self._raw.export()

    def hash(self) -> str:
        """Inhalts-Hash (SHA-256, hex)."""
        return self._raw.hash()

    def merge(self, other: Document) -> None:
        """`other` in dieses Dokument zusammenführen."""
        self._raw.merge(other._raw)

    def validate(self) -> dict[str, Any]:
        return json.loads(self._raw.validate())

    def order(self) -> dict[str, Any]:
        return json.loads(self._raw.order())

    def affected(self, ids: Iterable[str]) -> dict[str, Any]:
        ids = [ids] if isinstance(ids, str) else list(ids)
        return json.loads(self._raw.affected(json.dumps(ids)))

    def subgraph(self, id: str) -> dict[str, Any]:
        return json.loads(self._raw.subgraph(id))

    def migrate(self) -> dict[str, Any]:
        return json.loads(self._raw.migrate())

    def element(self, id: str) -> Element:
        """Element lesen (Teil-Laden); fehlt es, `CeeError` mit `missing_target`."""
        return Element(json.loads(self._raw.element(id)))

    def materialized_count(self) -> int:
        return self._raw.materialized_count()


class States:
    """Berechnungszustände eines Dokuments (neben dem Dokument, nie im CRDT)."""

    __slots__ = ("_raw",)

    def __init__(self, doc: Document) -> None:
        self._raw = _graph.States.new(doc._raw)

    @classmethod
    def new(cls, doc: Document) -> States:
        return cls(doc)

    def event(self, event: Json) -> None:
        """Ereignis `{"event": "start"|"ok"|"err"|"change", "id": "<id>"}`."""
        self._raw.event(_text(event))

    def ready(self) -> list[str]:
        return json.loads(self._raw.ready())

    def get(self) -> dict[str, Any]:
        return json.loads(self._raw.get())
