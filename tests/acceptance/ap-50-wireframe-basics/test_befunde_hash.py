"""ap-50, Capability `kernel-protokoll`: Befund statt Absturz, Inhalts-Hash und Determinismus (AK-7, AK-8).

Die Fehlerfälle werden direkt in den Auftrag des Beispiels eingebaut (so erreichen auch Werte, die der Kern schon beim
Import ablehnen könnte, den Worker); der Worker muss jeden Fall als Befund melden und alles Unabhängige weiterrechnen.
"""

# ruff: noqa: E501

from __future__ import annotations

import copy
import re

from wf_helpers import (
    abhaengige,
    beispiel,
    berechne,
    element,
    ergebnisse,
    finde,
    linie,
    mm,
    punkt,
    rechnen_auftrag,
    rechnen_roh,
    setze_x,
)


def _basis():
    from wf_helpers import beispiel_berechnet  # noqa: PLC0415

    a, e = beispiel_berechnet()
    return copy.deepcopy(a), e


def _fall(mutation) -> tuple[dict, dict]:
    a, _ = _basis()
    mutation(a)
    return a, rechnen_auftrag(a)


def _ohne_fehler_unveraendert(a: dict, e: dict, basis: dict, betroffen: set[str]) -> None:
    """Alle Elemente, die nicht vom Fehler abhängen, sind `aktuell` mit denselben `outputs` wie ohne Fehler."""
    res, soll = ergebnisse(e), ergebnisse(basis)
    unabhaengig = [x["id"] for x in a["elements"] if x["id"] not in betroffen and x["id"] in soll]
    assert unabhaengig, "Beispiel ohne unabhängige Elemente"
    for id in unabhaengig:
        assert res[id]["state"] == "aktuell", (id, res[id]["state"], res[id]["befunde"])
        assert res[id]["outputs"] == soll[id]["outputs"], id


def _hat(e: dict, id: str, code: str) -> dict:
    r = ergebnisse(e).get(id)
    assert r is not None, f"{id} fehlt in results"
    treffer = [b for b in r["befunde"] if b["code"] == code]
    assert treffer, (id, code, r["befunde"])
    b = treffer[0]
    assert b.get("element", id) == id and str(b.get("hinweis", "")).strip(), b
    return b


def test_fehlerfaelle_und_folgebefund():
    """Requirement „Befund statt Absturz“, Scenarios „Fehlerfälle“ (degenerate, input_missing, input_type,
    input_discarded, unit, unknown_type; 6 von 6, Unabhängiges bleibt `aktuell` mit gleichen `outputs`) und
    „Folgebefund“ (P1 ohne Bezug ⇒ S1, G1, P3 `input_failed`, K1 samt Kindern, P2, H1 `aktuell`)."""
    _, basis = _basis()

    def degeneriert(a):
        a["elements"] += [
            punkt("Q1", 1, 1, 1),
            punkt("Q2", 5e-7, 0, 0, ref="Q1.point"),
            linie("segment", "Z", "Q1.point", "Q2.point"),
        ]

    a, e = _fall(degeneriert)
    assert _hat(e, "Z", "degenerate") and ergebnisse(e)["Z"]["state"] == "fehlerhaft"
    _ohne_fehler_unveraendert(a, e, basis, abhaengige(a, "Z"))

    a, e = _fall(lambda a: a["elements"].append(linie("segment", "Z", "NIRGENDWO.point", "P2.point")))
    assert _hat(e, "Z", "input_missing").get("input") == "a"
    _ohne_fehler_unveraendert(a, e, basis, {"Z"})

    a, e = _fall(lambda a: a["elements"].append(linie("segment", "Z", "K1.xy", "P2.point")))
    assert _hat(e, "Z", "input_type").get("input") == "a"
    _ohne_fehler_unveraendert(a, e, basis, {"Z"})

    def verwerfen(a):
        finde(a, "P1")["meta"]["verworfen"] = True

    a, e = _fall(verwerfen)
    assert "P1" not in ergebnisse(e), "verworfene Elemente erscheinen nicht in results"
    for id in ("P3", "S1", "G1"):
        _hat(e, id, "input_discarded")
        assert ergebnisse(e)[id]["state"] == "fehlerhaft"
    _ohne_fehler_unveraendert(a, e, basis, abhaengige(a, "P1"))

    def falsche_einheit(a):
        finde(a, "P1")["params"]["x"] = {"value": 5, "unit": "kg"}

    a, e = _fall(falsche_einheit)
    _hat(e, "P1", "unit")
    _ohne_fehler_unveraendert(a, e, basis, abhaengige(a, "P1"))

    a, e = _fall(lambda a: a["elements"].append(element("U1", "unbekannt")))
    _hat(e, "U1", "unknown_type")
    _ohne_fehler_unveraendert(a, e, basis, {"U1"})

    # Folgebefund: P1.frame zeigt auf eine unbekannte ID
    def kein_bezug(a):
        finde(a, "P1")["inputs"]["frame"] = "NIRGENDWO.frame"

    a, e = _fall(kein_bezug)
    res = ergebnisse(e)
    assert res["P1"]["state"] == "fehlerhaft"
    _hat(e, "P1", "input_missing")
    for id in ("S1", "G1", "P3"):
        assert res[id]["state"] == "fehlerhaft", id
        folge = _hat(e, id, "input_failed")
        assert "P1" in str(folge), folge
    k1_kinder = next(x for x in a["elements"] if x["id"] == "K1")["content"]
    for id in ["K1", *k1_kinder, "P2", "H1"]:
        assert res[id]["state"] == "aktuell", (id, res[id]["befunde"])


def _hashes(projekt: dict) -> dict[str, str]:
    _, e = berechne(projekt)
    return {r["id"]: r["hash"] for r in e["results"]}


def test_determinismus_und_inhalts_hash():
    """Requirements „Inhalts-Hash und Determinismus“, Scenarios „Bytegleich“ (10 Läufe in getrennten Prozessen) und
    „Hash folgt dem Rezept“ (Umbenennen ändert keinen Hash; x = 11 mm ändert genau P1, P3, S1, G1; 1,0 cm wie 10 mm)."""
    a, _ = _basis()
    ausgaben = []
    for _i in range(10):
        r = rechnen_roh(a)
        assert r.returncode == 0, r.stderr[-1500:]
        ausgaben.append(r.stdout.encode())
    assert len(set(ausgaben)) == 1, "Ergebnisse nicht bytegleich"

    basis = _hashes(beispiel())
    assert all(re.fullmatch(r"[0-9a-f]{64}", h) for h in basis.values()), basis
    umbenannt = beispiel()
    finde(umbenannt, "P1")["meta"]["name"] = "Ganz anderer Name"
    assert _hashes(umbenannt) == basis, "Umbenennen darf keinen Hash ändern"

    # gleiches Rezept unter anderer ID: gleicher Hash (ID geht nicht ein)
    kopie = beispiel()
    kopie["elements"].append(punkt("PX", 10, 20, 0))
    h = _hashes(kopie)
    assert h["PX"] == basis["P1"]

    geaendert = _hashes(setze_x(beispiel(), "P1", mm(11)))
    a1 = _basis()[0]
    erwartet = abhaengige(a1, "P1")
    assert erwartet == {"P1", "P3", "S1", "G1"}, erwartet
    verschieden = {i for i in basis if geaendert[i] != basis[i]}
    assert verschieden == erwartet, (sorted(verschieden), sorted(erwartet))

    cm = _hashes(setze_x(beispiel(), "P1", {"value": 1.0, "unit": "cm"}))
    assert cm == basis, "1,0 cm muss denselben Hash wie 10 mm ergeben"
