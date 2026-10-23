"""Abnahmetests ap-49 – Regel als Element im Graphen, gleiche Ziele nach Neuberechnung (AK-1 bis AK-3)."""

from __future__ import annotations

import math
import re

import pytest
from auswahl_hilfe import FAELLE, REGELN, SAETZE, gleiche_menge, run, soll

FELDER = {"id", "type", "inputs", "params", "outputs", "content", "meta"}
INDEX_SCHLUESSEL = re.compile(r"(index|indices|idx|schwerpunkt|koordinat|centroid|treffer)", re.IGNORECASE)
ADRESSE = re.compile(r"^(?P<id>[^.\s]+)\.(?P<output>[^.\s]+)$")


def _werte(obj, schluessel: str = ""):
    """Alle (Schlüssel, Wert)-Paare im Element, rekursiv."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield str(k), v
            yield from _werte(v, str(k))
    elif isinstance(obj, list):
        yield schluessel, obj
        for v in obj:
            yield from _werte(v, schluessel)


def _ist_punkt(v, punkt: list[float]) -> bool:
    if not isinstance(v, list) or len(v) != 3 or not all(isinstance(x, (int, float)) for x in v):
        return False
    return math.dist([float(x) for x in v], punkt) <= 1e-3


def _adressen(inputs) -> list[str]:
    if isinstance(inputs, dict):
        return [str(v) for v in inputs.values()]
    if isinstance(inputs, list):
        return [str(v) for v in inputs]
    return [str(inputs)]


@pytest.mark.parametrize("regel", REGELN)
def test_ak1_regel_ist_element_ohne_indizes_und_geometrie(regel):
    """AK-1 (Regel als Element im Graphen): Elementform ADR-028, Eingänge `<id>.<output>` auf ein Element des
    Halters, keine Indizes, keine Koordinaten oder Schwerpunkte der getroffenen Geometrie."""
    fall = f"{regel}-P0"
    element = run(fall, "--element")
    assert isinstance(element, dict), f"{regel}: Element ist kein Objekt"
    assert set(element) == FELDER, f"{regel}: Felder {sorted(element)} statt {sorted(FELDER)}"

    halter_ids = {e["id"] for e in run(fall)["elemente"]}
    adressen = _adressen(element["inputs"])
    assert adressen, f"{regel}: Regel verweist auf kein Ausgangselement"
    for a in adressen:
        m = ADRESSE.match(a)
        assert m, f"{regel}: Eingang {a!r} hat nicht die Form <id>.<output>"
        assert m["id"] in halter_ids, f"{regel}: Eingang {a!r} verweist auf kein Element des Halters"
        assert m["id"] != element["id"], f"{regel}: Regel verweist auf sich selbst"

    punkte = [z["schwerpunkt_mm"] for p in SAETZE for z in soll(f"{regel}-{p}")["ziele"]]
    for k, v in _werte(element):
        assert not INDEX_SCHLUESSEL.search(k), f"{regel}: Schlüssel {k!r} deutet auf Index oder Geometrie"
        assert not any(_ist_punkt(v, p) for p in punkte), f"{regel}: {k}={v} ist ein Schwerpunkt eines Ziels"


@pytest.mark.parametrize("regel", REGELN)
def test_ak1_regel_bleibt_unveraendert(regel):
    """AK-1/AK-2 (Regel als Element, unverändert gespeichert): Das Element ist an P0 bis P3 und bei gemischter
    Kernel-Reihenfolge dasselbe – es hängt weder an Geometrie noch an Indizes."""
    p0 = run(f"{regel}-P0", "--element")
    for satz in SAETZE[1:]:
        assert run(f"{regel}-{satz}", "--element") == p0, f"{regel}: Element an {satz} anders als an P0"
    assert run(f"{regel}-P0", "--element", "--shuffle", "7") == p0, (
        f"{regel}: Element hängt an der Reihenfolge"
    )


@pytest.mark.parametrize("fall", FAELLE)
def test_ak2_gleiche_ziele_nach_neuberechnung(fall):
    """AK-2 (Gleiche Ziele nach Neuberechnung): an P0 gespeicherte Regel trifft an P0 bis P3 alle Sollziele
    aus dem Testkorpus und keine weiteren (Schwerpunkt ≤ 10⁻³ mm, Richtung ≤ 10⁻⁶ rad); 20 von 20 Fällen."""
    erg = run(fall)
    sollziele = soll(fall)["ziele"]
    assert erg.get("befunde", []) == [], f"{fall}: unerwarteter Befund {erg.get('befunde')}"
    assert gleiche_menge(erg["ziele"], sollziele), (
        f"{fall}: {len(erg['ziele'])} Ziele statt {len(sollziele)} oder abweichend:\n"
        f"ist  {erg['ziele']}\nsoll {sollziele}"
    )


@pytest.mark.parametrize("fall", FAELLE)
def test_ak3_reihenfolge_des_kernels(fall):
    """AK-3 (Gleiche Ziele nach Neuberechnung, Reihenfolge): mit `--shuffle` und Seeds 1 bis 10 ist die Menge
    der Ziele gleich der ohne `--shuffle`; 10 Läufe je Fall, 200 von 200."""
    ohne = run(fall)["ziele"]
    abweichend = [s for s in range(1, 11) if not gleiche_menge(run(fall, "--shuffle", str(s))["ziele"], ohne)]
    assert not abweichend, f"{fall}: andere Ziele bei Seeds {abweichend}"
