"""Auftrag nach `cee-kernel/0` berechnen (ap-50, design.md Abschnitt 3).

Ein Durchlauf in der Reihenfolge des Auftrags. Jedes Element wird geprüft (Typ, Eingänge, Einheiten), als
OCP-Form gebaut und aus der Form zurückgelesen. Fehler werden Befunde am Element; Folgeelemente bekommen
`input_failed` bzw. `input_discarded`, alles Unabhängige rechnet weiter (ADR-050). Der Durchlauf ist
deterministisch.
"""

from __future__ import annotations

import contextlib
import hashlib
import importlib.metadata
import json
import os
import re
from dataclasses import dataclass, field
from typing import Any

from cee_sdk import CeeError, Quantity

from . import geometrie as geo
from .typen import KANONISCH, STANDARD, TOL_LINEAR, TYPEN

PROTOCOL = "cee-kernel/0"
KERNEL_NAME = "occt"
TEST_EXIT = 70  # Prüfhaken `CEE_WORKER_TEST`: simulierter Absturz in OCP

_REF = re.compile(r"([^.\s\[\]]+)\.([a-z_]+)")


def kernel_version() -> str:
    import OCP

    return str(OCP.__version__)


def worker_version() -> str:
    try:
        return importlib.metadata.version("cee-worker")
    except importlib.metadata.PackageNotFoundError:  # pragma: no cover - nur ohne Installation
        return "0.0.0"


def kanonisch(obj: Any) -> str:
    """Kanonisches JSON: Schlüssel sortiert, kompakt, Zahlen in Python-Kurzdarstellung."""
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def befund(code: str, element: str | None, hinweis: str, **extra: Any) -> dict[str, Any]:
    return {"code": code, "element": element, "hinweis": hinweis, **extra}


def _hinweis(code: str, zusatz: str | None = None) -> str:
    return f"kernel.befund.{code}" + (f".{zusatz}" if zusatz else "")


def _q(v: float, unit: str) -> dict[str, Any]:
    return {"value": v, "unit": unit}


def _lage(v: geo.Vec3) -> list[dict[str, Any]]:
    return [_q(c, "mm") for c in v]


def _dir(v: geo.Vec3) -> list[dict[str, Any]]:
    return [_q(c, "1") for c in v]


class _Fehler(Exception):
    def __init__(self, b: dict[str, Any]) -> None:
        super().__init__(b["code"])
        self.befund = b


@dataclass
class _Lauf:
    version: str
    test: bool
    # Element-ID -> Typ, Hash, Zustand; Ausgang (id, name) -> (Ausgabetyp, interner Wert)
    typ: dict[str, str] = field(default_factory=dict)
    hashes: dict[str, str] = field(default_factory=dict)
    fehlerhaft: set[str] = field(default_factory=set)
    verworfen: set[str] = field(default_factory=set)
    werte: dict[tuple[str, str], tuple[str, Any]] = field(default_factory=dict)
    formen: dict[str, Any] = field(default_factory=dict)


def _param(el: dict[str, Any], name: str, dim: str) -> float:
    """Parameter in kanonischer Einheit (mm, rad); Umrechnung nur über den Kern (ADR-057)."""
    roh = el.get("params", {}).get(name)
    if roh is None:
        return 0.0
    if isinstance(roh, bool) or not isinstance(roh, int | float | dict):
        raise _Fehler(befund("unit", el["id"], _hinweis("unit", "invalid_quantity"), param=name))
    if isinstance(roh, dict):
        wert, einheit = roh.get("value"), roh.get("unit")
        if isinstance(wert, bool) or not isinstance(wert, int | float) or not isinstance(einheit, str):
            raise _Fehler(befund("unit", el["id"], _hinweis("unit", "invalid_quantity"), param=name))
    else:
        wert, einheit = roh, STANDARD[dim]
    try:
        return Quantity(float(wert), einheit).to(KANONISCH[dim]).value
    except CeeError as exc:
        raise _Fehler(befund("unit", el["id"], _hinweis("unit", exc.code), param=name)) from None


def _hash_params(el: dict[str, Any], werte: dict[str, float]) -> dict[str, Any]:
    typ = TYPEN.get(el["type"])
    aus: dict[str, Any] = {}
    for name, roh in el.get("params", {}).items():
        if typ is not None and name in werte:
            aus[name] = _q(werte[name], KANONISCH[typ.params[name]])
        else:
            aus[name] = roh
    return aus


def _eingaenge(lauf: _Lauf, el: dict[str, Any]) -> tuple[dict[str, tuple[str, Any]], dict[str, str]]:
    """Eingänge prüfen und auflösen: Name -> (Ausgabetyp, Wert); dazu Name -> Hash-Teil `<hash>.<output>`."""
    typ = TYPEN[el["type"]]
    eid = el["id"]
    refs = el.get("inputs", {}) or {}
    werte: dict[str, tuple[str, Any]] = {}
    hash_teile = {n: f"?{r}" for n, r in refs.items()}
    fehler: list[dict[str, Any]] = []
    for name, eing in typ.eingaenge.items():
        ref = refs.get(name)
        if ref is None:
            if eing.pflicht:
                fehler.append(befund("input_missing", eid, _hinweis("input_missing", "pflicht"), input=name))
            continue
        m = _REF.fullmatch(ref) if isinstance(ref, str) else None
        if m is None:
            fehler.append(
                befund("input_missing", eid, _hinweis("input_missing", "benannter_ausgang"), input=name)
            )
            continue
        ziel, ausgang = m.group(1), m.group(2)
        if ziel in lauf.verworfen:
            fehler.append(befund("input_discarded", eid, _hinweis("input_discarded"), input=name, bezug=ziel))
            continue
        if ziel not in lauf.typ:
            fehler.append(befund("input_missing", eid, _hinweis("input_missing"), input=name, bezug=ziel))
            continue
        ziel_typ = TYPEN.get(lauf.typ[ziel])
        if ziel_typ is None or ausgang not in ziel_typ.ausgaenge:
            fehler.append(
                befund("input_missing", eid, _hinweis("input_missing", "ausgang"), input=name, bezug=ziel)
            )
            continue
        hash_teile[name] = f"{lauf.hashes[ziel]}.{ausgang}"
        if ziel_typ.ausgaenge[ausgang] != eing.typ:
            fehler.append(befund("input_type", eid, _hinweis("input_type", eing.typ), input=name, bezug=ziel))
            continue
        if ziel in lauf.fehlerhaft:
            fehler.append(befund("input_failed", eid, _hinweis("input_failed"), input=name, bezug=ziel))
            continue
        werte[name] = lauf.werte[(ziel, ausgang)]
    if fehler:
        raise _Fehler(fehler[0]) from _Mehr(fehler)
    return werte, hash_teile


class _Mehr(Exception):
    def __init__(self, liste: list[dict[str, Any]]) -> None:
        super().__init__(len(liste))
        self.liste = liste


def _bauen(lauf: _Lauf, el: dict[str, Any], p: dict[str, float], ein: dict[str, tuple[str, Any]]):
    """OCP-Formen bauen, zurücklesen; liefert (outputs, interne Werte je Ausgang, Form)."""
    eid, typ = el["id"], el["type"]
    outputs: dict[str, Any] = {}
    intern: dict[str, tuple[str, Any]] = {}

    def punkt_aus(name: str, form) -> geo.Vec3:
        v = geo.lesen_punkt(form)
        outputs[name] = {"type": "point", "position": _lage(v)}
        intern[name] = ("point", geo.pnt_aus(v))
        return v

    def linie_aus(name: str, art: str, form) -> None:
        o, d = geo.lesen_linie(form)
        outputs[name] = {"type": art, "origin": _lage(o), "direction": _dir(d)}
        intern[name] = (art, geo.ax1_aus(o, d))

    def ebene_aus(name: str, form) -> None:
        o, n, x = geo.lesen_ebene(form)
        outputs[name] = {"type": "plane", "origin": _lage(o), "normal": _dir(n), "x_direction": _dir(x)}
        intern[name] = ("plane", geo.ax3_aus(o, n, x))

    if typ == "frame":
        eltern = ein["parent"][1] if "parent" in ein else None
        t = geo.frame_trsf(eltern, p["x"], p["y"], p["z"], p["rx"], p["ry"], p["rz"])
        form, teile = geo.frame_form(t)
        o = punkt_aus("origin", teile["origin"])
        achsen = {}
        for n in "xyz":
            linie_aus(n, "line", teile[n])
            achsen[n] = outputs[n]["direction"]
        for n in ("xy", "yz", "zx"):
            ebene_aus(n, teile[n])
        outputs["frame"] = {"type": "frame", "origin": _lage(o), **achsen}
        intern["frame"] = ("frame", t)
        return outputs, intern, form
    if typ == "point":
        t = ein["frame"][1] if "frame" in ein else None
        if "ref" in ein:
            pnt = geo.punkt_relativ(ein["ref"][1], t, p["x"], p["y"], p["z"])
        else:
            pnt = geo.punkt_in(t, p["x"], p["y"], p["z"])
        form = geo.punkt_form(pnt)
        punkt_aus("point", form)
        return outputs, intern, form
    if typ == "axis":
        form = geo.linie_form(ein["of"][1], unbegrenzt_vorn=True)
        linie_aus("line", "line", form)
        return outputs, intern, form
    if typ == "plane":
        form = geo.ebene_form(ein["of"][1])
        ebene_aus("plane", form)
        return outputs, intern, form
    # line, ray, segment
    a, b = ein["a"][1], ein["b"][1]
    if a.Distance(b) < TOL_LINEAR:
        raise _Fehler(befund("degenerate", eid, _hinweis("degenerate", "punkte_auseinander")))
    if typ == "segment":
        form = geo.strecke_form(a, b)
        s, e, laenge = geo.lesen_strecke(form)
        outputs["segment"] = {
            "type": "segment",
            "start": _lage(s),
            "end": _lage(e),
            "length": _q(laenge, "mm"),
        }
        intern["segment"] = ("segment", (geo.pnt_aus(s), geo.pnt_aus(e)))
        outputs["start"] = {"type": "point", "position": _lage(s)}
        intern["start"] = ("point", geo.pnt_aus(s))
        outputs["end"] = {"type": "point", "position": _lage(e)}
        intern["end"] = ("point", geo.pnt_aus(e))
        return outputs, intern, form
    ax = geo.ax1_durch(a, b)
    form = geo.linie_form(ax, unbegrenzt_vorn=(typ == "line"))
    linie_aus(typ, typ, form)
    if typ == "ray":
        o = outputs["ray"]["origin"]
        outputs["start"] = {"type": "point", "position": o}
        intern["start"] = ("point", geo.pnt_aus(tuple(g["value"] for g in o)))
    return outputs, intern, form


def _element(lauf: _Lauf, el: dict[str, Any], vorab: list[dict[str, Any]]) -> dict[str, Any] | None:
    eid = el["id"]
    meta = el.get("meta", {}) or {}
    typname = el.get("type")
    lauf.typ[eid] = typname
    if meta.get("verworfen") is True:
        lauf.verworfen.add(eid)
        return None
    if lauf.test and meta.get("test_absturz") is True:
        os._exit(TEST_EXIT)  # Prüfhaken: Absturz ohne Ausgabe

    befunde: list[dict[str, Any]] = []
    params: dict[str, float] = {}
    hash_ein = {n: f"?{r}" for n, r in (el.get("inputs", {}) or {}).items()}
    outputs: dict[str, Any] = {}
    typ = TYPEN.get(typname)
    try:
        if vorab:
            raise _Fehler(vorab[0]) from _Mehr(vorab)
        if typ is None:
            raise _Fehler(befund("unknown_type", eid, _hinweis("unknown_type")))
        ein, hash_ein = _eingaenge(lauf, el)
        unit_fehler = []
        for name, dim in typ.params.items():
            try:
                params[name] = _param(el, name, dim)
            except _Fehler as f:
                unit_fehler.append(f.befund)
        if unit_fehler:
            raise _Fehler(unit_fehler[0]) from _Mehr(unit_fehler)
        try:
            outputs, intern, form = _bauen(lauf, el, params, ein)
        except _Fehler:
            raise
        except Exception as exc:  # noqa: BLE001  # OCP-Ausnahme: Befund statt Absturz
            raise _Fehler(befund("kernel_error", eid, _hinweis("kernel_error"), text=str(exc))) from None
        for name, wert in intern.items():
            lauf.werte[(eid, name)] = wert
        lauf.formen[eid] = form
    except _Fehler as f:
        mehr = f.__cause__.liste if isinstance(f.__cause__, _Mehr) else [f.befund]
        befunde = mehr
        outputs = {}
        lauf.fehlerhaft.add(eid)
        if typ is not None and not params:
            for name, dim in typ.params.items():
                with contextlib.suppress(_Fehler):
                    params[name] = _param(el, name, dim)
        if typ is not None and all(v.startswith("?") for v in hash_ein.values()):
            hash_ein = _hash_eingaenge(lauf, el)

    rezept = {
        "protocol": PROTOCOL,
        "kernel": lauf.version,
        "type": typname,
        "params": _hash_params(el, params),
        "inputs": hash_ein,
    }
    h = hashlib.sha256(kanonisch(rezept).encode()).hexdigest()
    lauf.hashes[eid] = h
    return {
        "id": eid,
        "state": "fehlerhaft" if eid in lauf.fehlerhaft else "aktuell",
        "hash": h,
        "outputs": outputs,
        "befunde": befunde,
    }


def _hash_eingaenge(lauf: _Lauf, el: dict[str, Any]) -> dict[str, str]:
    aus = {}
    for name, ref in (el.get("inputs", {}) or {}).items():
        m = _REF.fullmatch(ref) if isinstance(ref, str) else None
        if m and m.group(1) in lauf.hashes:
            aus[name] = f"{lauf.hashes[m.group(1)]}.{m.group(2)}"
        else:
            aus[name] = f"?{ref}"
    return aus


def _protokollfehler(version: str, hinweis: str) -> dict[str, Any]:
    return _ergebnis(version, [], [befund("protocol", None, _hinweis("protocol", hinweis))])


def _ergebnis(version: str, results: list, befunde: list) -> dict[str, Any]:
    return {
        "protocol": PROTOCOL,
        "kernel": {"name": KERNEL_NAME, "version": version, "worker": worker_version()},
        "results": results,
        "befunde": befunde,
    }


def berechnen(auftrag: Any) -> tuple[dict[str, Any], dict[str, Any]]:
    """Auftrag → (Ergebnis, Formen je Element-ID)."""
    version = kernel_version()
    if not isinstance(auftrag, dict) or auftrag.get("protocol") != PROTOCOL:
        return _protokollfehler(version, "version"), {}
    elemente = auftrag.get("elements")
    if not isinstance(elemente, list) or not all(
        isinstance(e, dict) and isinstance(e.get("id"), str) for e in elemente
    ):
        return _protokollfehler(version, "elements"), {}
    lauf = _Lauf(version=version, test=os.environ.get("CEE_WORKER_TEST") == "1")
    vorab: dict[str, list[dict[str, Any]]] = {}
    allgemein: list[dict[str, Any]] = []
    for b in auftrag.get("befunde", []) or []:
        if b.get("code") in ("input_missing",) and b.get("element"):
            vorab.setdefault(b["element"], []).append(b)
        else:
            allgemein.append(b)
    results = []
    for el in elemente:
        r = _element(lauf, el, vorab.get(el["id"], []))
        if r is not None:
            results.append(r)
    return _ergebnis(version, results, allgemein), lauf.formen


def rechnen(auftrag: Any) -> dict[str, Any]:
    """Ergebnis nach `format/kernel/ergebnis.schema.json`."""
    return berechnen(auftrag)[0]


def formen(auftrag: Any) -> dict[str, Any]:
    """Element-ID → OCP-Form (`TopoDS_Shape`), nur im selben Prozess."""
    return berechnen(auftrag)[1]
