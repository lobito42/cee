"""Abnahmetests AP-03 – Offline weiterarbeiten und ohne Datenverlust zusammenführen (AK-5, AK-10, AK-8).

Requirement: „Offline weiterarbeiten und ohne Datenverlust zusammenführen“. Datenverlust und Konflikte rechnet
der Test selbst aus den gedumpten Operationen (`--dump`) und dem Endstand des Servers nach (design.md,
„Ohne Datenverlust“); die Zählwerte, die der Client meldet, werden dafür nicht verwendet.
"""

from __future__ import annotations

import re

import pytest
from sync_helpers import SIDES, analyse, run_dumped, server_fixture  # noqa: F401 (Fixture)

OPS_PER_SIDE = 500
SEEDS = ("7", "11")  # zwei Startwerte, damit der Generator nicht auf einen Lauf passt


def _check_offline(server, tmp_path, doc: str, *extra: str) -> dict:
    _, ops, project = run_dumped(server, tmp_path, "offline", doc, OPS_PER_SIDE, *extra)
    findings = server.get(f"/docs/{doc}/findings")

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


@pytest.mark.parametrize("seed", SEEDS)
def test_ak5_offline_500_online_500_no_loss(server, tmp_path, seed):
    """AK-5: B offline, A online 500 und B offline 500 Änderungen am Dokument mit 10.000 Elementen; danach
    gleicher Hash bei A, B und Server, 0 verlorene Änderungen und 10 Wertkonflikte (beide Werte),
    5 gebrochene Referenzen und 5 Fälle „Entfernen gegen Ändern“ (alle Werte von B) als Befund."""
    _check_offline(server, tmp_path, f"offline-ak5-{seed}", "--seed", seed)


def test_ak10_both_offline_no_loss(server, tmp_path):
    """AK-10: A und B beide offline mit je 500 Änderungen; gleicher Hash bei A, B und Server, 0 verlorene
    Änderungen, 20 von 20 Konflikten als Befund."""
    _check_offline(server, tmp_path, "offline-ak10", "--seed", SEEDS[0], "--both")
