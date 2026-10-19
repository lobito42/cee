"""Abnahmetests AP-03 – Offline weiterarbeiten und ohne Datenverlust zusammenführen (AK-5, AK-10, AK-8).

Requirement: „Offline weiterarbeiten und ohne Datenverlust zusammenführen“. Datenverlust und Konflikte rechnet
der Test selbst aus den gedumpten Operationen (`--dump`) und dem Endstand des Servers nach (design.md,
„Ohne Datenverlust“); die Zählwerte, die der Client meldet, werden dafür nicht verwendet.
"""

from __future__ import annotations

import json
import re

from sync_helpers import flatten, read_hash, server_fixture  # noqa: F401 (Fixture)

OPS_PER_SIDE = 500
SIDES = ("a", "b")


def _field(op: dict) -> tuple[str, object] | None:
    if op["op"] == "set_param":
        return "params", op["value"]
    if op["op"] == "set_input":
        return "inputs", op["ref"]
    return None


def _target(ref: str) -> str:
    return ref.split(".", 1)[0]


def analyse(ops: dict[str, list[dict]], project: dict, findings: list[dict]) -> dict:
    """Erwartungen aus den Operationen beider Seiten ableiten und gegen Endstand und Befunde prüfen."""
    other = {"a": "b", "b": "a"}
    last: dict[str, dict[tuple, object]] = {s: {} for s in SIDES}
    edits: dict[str, dict[str, list[tuple]]] = {s: {} for s in SIDES}
    removed: dict[str, str] = {}
    for s in SIDES:
        for op in ops[s]:
            if op["op"] == "remove_element":
                removed[op["id"]] = s
                continue
            fv = _field(op)
            assert fv, f"unbekannte Operation: {op}"
            field, value = fv
            last[s][(field, op["id"], op["name"])] = value
            edits[s].setdefault(op["id"], []).append((op["name"], value))

    elements = flatten(project)
    lost: list[str] = []
    both, broken, eor = [], [], {}
    for s in SIDES:
        for key, value in last[s].items():
            field, eid, name = key
            if eid in removed:
                continue  # Änderungen an entfernten Elementen: unten als edit_on_removed geprüft
            if key in last[other[s]]:
                if s == "a":
                    both.append(key)
                continue
            if field == "inputs" and _target(value) in removed and removed[_target(value)] != s:
                broken.append((eid, name, value))
            got = elements.get(eid, {}).get(field, {}).get(name)
            if got != value:
                lost.append(f"{s}: {field} {eid}.{name} = {value!r}, Endstand {got!r}")
        for eid, changes in edits[s].items():
            if removed.get(eid) == other[s]:
                eor[eid] = changes

    for key in both:
        field, eid, name = key
        got = elements.get(eid, {}).get(field, {}).get(name)
        if got not in (last["a"][key], last["b"][key]):
            lost.append(f"beide: {field} {eid}.{name} sichtbar {got!r}")
    for eid in removed:
        if eid in elements:
            lost.append(f"entfernt, aber noch vorhanden: {eid}")

    def has(kind: str, pred) -> bool:
        return any(f.get("kind") == kind and pred(f) for f in findings)

    reported = 0
    missing: list[str] = []
    for field, eid, name in both:
        want = {json.dumps(last["a"][(field, eid, name)]), json.dumps(last["b"][(field, eid, name)])}
        if has(
            "conflict",
            lambda f, eid=eid, name=name, field=field, want=want: (
                f.get("id") == eid
                and f.get("name") == name
                and f.get("field", field) == field
                and want <= {json.dumps(v) for v in f.get("values", [])}
            ),
        ):
            reported += 1
        else:
            missing.append(f"conflict {field} {eid}.{name}")
    for eid, name, ref in broken:
        if has(
            "broken_reference",
            lambda f, eid=eid, name=name, ref=ref: (
                f.get("id") == eid and f.get("input") == name and f.get("target") == ref
            ),
        ):
            reported += 1
        else:
            missing.append(f"broken_reference {eid}.{name} -> {ref}")
    for eid, changes in eor.items():
        if has(
            "edit_on_removed",
            lambda f, eid=eid, changes=changes: (
                f.get("id") == eid
                and all(
                    any(e.get("name") == n and e.get("value") == v for e in f.get("edits", []))
                    for n, v in changes
                )
            ),
        ):
            reported += 1
        else:
            missing.append(f"edit_on_removed {eid}: {changes}")
    return {
        "both": len(both),
        "broken": len(broken),
        "eor": len(eor),
        "lost": lost,
        "reported": reported,
        "missing": missing,
    }


def _check_offline(server, tmp_path, doc: str, *extra: str) -> dict:
    dump = tmp_path / "dump"
    dump.mkdir()
    server.run("offline", doc, "--seed", "7", "--dump", str(dump), *extra)
    ops = {s: json.loads((dump / f"ops_{s}.json").read_text(encoding="utf-8")) for s in SIDES}
    for s in SIDES:
        assert len(ops[s]) == OPS_PER_SIDE, f"Seite {s}: {len(ops[s])} statt {OPS_PER_SIDE} Änderungen"
    project = server.get(f"/docs/{doc}/project")
    findings = server.get(f"/docs/{doc}/findings")
    hashes = {
        "a": read_hash(dump / "hash_a"),
        "b": read_hash(dump / "hash_b"),
        "server": server.hash(doc),
    }
    assert len(set(hashes.values())) == 1, f"Inhalts-Hash ungleich: {hashes}"
    server_elements = flatten(project)
    for s in SIDES:
        client = flatten(json.loads((dump / f"project_{s}.json").read_text(encoding="utf-8")))
        assert client == server_elements, f"Endstand von {s} weicht vom Server ab"

    result = analyse(ops, project, findings)
    # Der Generator muss die Fälle aus design.md genau so erzeugen.
    assert result["both"] == 10, f"{result['both']} statt 10 doppelt gesetzte Schlüssel"
    assert result["broken"] == 5, f"{result['broken']} statt 5 Verweise auf entfernte Elemente"
    assert result["eor"] == 5, f"{result['eor']} statt 5 Fälle Entfernen gegen Ändern"
    assert not result["lost"], f"{len(result['lost'])} verlorene Änderungen, z. B. {result['lost'][:5]}"
    assert result["reported"] == 20, f"{result['reported']} von 20 Konflikten als Befund: {result['missing']}"

    # AK-8 nebenbei: kein gesetzter Parameterwert dieses Laufs im Server-Protokoll.
    log = server.log_text()
    values = {str(op["value"]) for s in SIDES for op in ops[s] if op["op"] == "set_param"}
    hits = sorted(v for v in values if re.search(rf"(?<![\d.]){re.escape(v)}(?!\d)", log))
    assert not hits, f"Parameterwerte im Server-Protokoll: {hits[:10]}"
    return result


def test_ak5_offline_500_online_500_no_loss(server, tmp_path):
    """AK-5: B offline, A online 500 und B offline 500 Änderungen am Dokument mit 10.000 Elementen; danach
    gleicher Hash bei A, B und Server, 0 verlorene Änderungen und 10 Wertkonflikte (beide Werte),
    5 gebrochene Referenzen und 5 Fälle „Entfernen gegen Ändern“ (alle Werte von B) als Befund."""
    _check_offline(server, tmp_path, "offline-ak5")


def test_ak10_both_offline_no_loss(server, tmp_path):
    """AK-10: A und B beide offline mit je 500 Änderungen; gleicher Hash bei A, B und Server, 0 verlorene
    Änderungen, 20 von 20 Konflikten als Befund."""
    _check_offline(server, tmp_path, "offline-ak10", "--both")
