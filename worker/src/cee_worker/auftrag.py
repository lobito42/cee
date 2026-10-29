"""Auftrag `cee-kernel/0` aus einem Projekt bauen, über den Rust-Kern (`cee-sdk`, ADR-029).

Das Projekt wird mit den Typdefinitionen aus `format/types/drahtmodell.json` importiert; Prüfung
(`validate`) und Reihenfolge (`order`) kommen aus dem Kern. Elemente auf einem Zyklus stehen am Ende des
Auftrags und bekommen den Befund `input_missing` mit Hinweis auf den Zyklus; die Warnung des Kerns für eine
Zahl ohne Einheit (`unit_assumed`) wird weitergereicht. Kind-Elemente stehen als eigene Einträge in der
flachen Liste, `content` enthält nur ihre IDs.
"""

from __future__ import annotations

import functools
import json
from pathlib import Path
from typing import Any

from cee_sdk import Document

PROTOCOL = "cee-kernel/0"
TYPEN = Path(__file__).resolve().parents[3] / "format" / "types" / "drahtmodell.json"


@functools.cache
def _typen_text(pfad: str) -> str:
    return Path(pfad).read_text(encoding="utf-8")


def typen(pfad: Path = TYPEN) -> list[dict[str, Any]]:
    return json.loads(_typen_text(str(pfad)))


def _flach(elemente: list[Any]) -> dict[str, dict[str, Any]]:
    aus: dict[str, dict[str, Any]] = {}

    def rein(e: dict[str, Any]) -> None:
        kinder = e.get("content", []) or []
        flach = dict(e)
        flach["content"] = [k["id"] if isinstance(k, dict) else k for k in kinder]
        aus[e["id"]] = flach
        for k in kinder:
            if isinstance(k, dict):
                rein(k)

    for e in elemente:
        if isinstance(e, dict):
            rein(e)
    return aus


def bauen(projekt: dict[str, Any], typdefinitionen: list[dict[str, Any]] | None = None) -> dict[str, Any]:
    """Projekt-JSON → Auftrag (Reihenfolge aus `Document.order()`)."""
    doc = Document.import_project(projekt, typen() if typdefinitionen is None else typdefinitionen)
    befunde_kern = list(doc.import_info.get("findings", [])) + list(doc.validate().get("findings", []))
    reihenfolge = doc.order()
    elemente = _flach(doc.export().get("elements", []))

    zyklus = [s["element"] for s in reihenfolge.get("skipped", []) if s.get("reason") == "cycle"]
    ids = list(reihenfolge.get("order", [])) + [s["element"] for s in reihenfolge.get("skipped", [])]
    gesehen = set(ids)
    ids += [i for i in elemente if i not in gesehen]

    befunde: list[dict[str, Any]] = []
    for eid in zyklus:
        refs = elemente.get(eid, {}).get("inputs", {}) or {}
        eingang = next((n for n, r in sorted(refs.items()) if str(r).split(".")[0] in zyklus), None)
        b = {"code": "input_missing", "element": eid, "hinweis": "kernel.befund.input_missing.zyklus"}
        if eingang:
            b["input"] = eingang
        befunde.append(b)
    gemeldet = set()
    for f in befunde_kern:
        if f.get("code") != "unit_assumed":
            continue
        schluessel = (f.get("element"), f.get("field"))
        if schluessel in gemeldet:
            continue
        gemeldet.add(schluessel)
        befunde.append(
            {
                "code": "unit_assumed",
                "element": f.get("element"),
                "param": f.get("field"),
                "hinweis": "kernel.befund.unit_assumed",
            }
        )
    return {"protocol": PROTOCOL, "elements": [elemente[i] for i in ids if i in elemente], "befunde": befunde}
