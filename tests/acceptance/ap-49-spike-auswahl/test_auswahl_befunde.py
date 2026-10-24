"""Abnahmetests ap-49 – Befund statt Absturz (AK-4 bis AK-6)."""

from __future__ import annotations

from auswahl_hilfe import bench, gleiche_menge, run, soll


def _befunde(erg: dict, code: str) -> list[dict]:
    return [b for b in erg.get("befunde", []) if b.get("code") == code]


def test_ak4_kein_ziel():
    """AK-4 (Befund statt Absturz, kein Ziel): Bohrung verworfen, R5 gespeichert → Exit 0, 0 Ziele, genau ein
    Befund `kein_ziel` mit der Element-ID von R5."""
    erg = run("K1")  # Exit-Code 0 prüft run()
    assert erg["ziele"] == [], f"K1: {len(erg['ziele'])} Ziele statt 0"
    befunde = erg.get("befunde", [])
    assert len(befunde) == 1, f"K1: {len(befunde)} Befunde statt genau einem: {befunde}"
    assert befunde[0].get("code") == "kein_ziel", f"K1: Befund {befunde[0]} statt kein_ziel"
    r5 = run("R5-P0", "--element")["id"]
    assert befunde[0].get("element") == r5, f"K1: Befund an {befunde[0].get('element')!r} statt an R5 {r5!r}"


def test_ak5_mehrdeutig():
    """AK-5 (Befund statt Absturz, mehrdeutig): K2 aus dem Testkorpus → Exit 0, 0 gewählte Ziele, Befund
    `mehrdeutig` mit der Element-ID der Regel und allen Kandidaten aus dem Testkorpus."""
    erg = run("K2")
    assert erg["ziele"] == [], f"K2: Prototyp hat {len(erg['ziele'])} Ziele gewählt statt nachzufragen"
    befunde = _befunde(erg, "mehrdeutig")
    assert len(befunde) == 1, f"K2: {len(befunde)} Befunde mehrdeutig statt einem: {erg.get('befunde')}"
    regel = run("K2", "--element")["id"]
    assert befunde[0].get("element") == regel, f"K2: Befund an {befunde[0].get('element')!r} statt {regel!r}"
    kandidaten, sollkandidaten = befunde[0].get("kandidaten", []), soll("K2")["kandidaten"]
    assert gleiche_menge(kandidaten, sollkandidaten), (
        f"K2: {len(kandidaten)} Kandidaten statt {len(sollkandidaten)} oder abweichend:\n"
        f"ist  {kandidaten}\nsoll {sollkandidaten}"
    )


def test_ak6_unabhaengige_elemente_rechnen_weiter():
    """AK-6 (Befund statt Absturz, unabhängige Elemente): K3 → Folgeelement `fehlerhaft` oder `pausiert`,
    unabhängiges Element `aktuell`; `abstuerze` in `bench.sh --json` ist 0."""
    zustaende = run("K3").get("zustaende", {})
    k3 = soll("K3")
    assert zustaende.get("folgeelement") in k3["zustand_folgeelement"], f"K3: Folgeelement {zustaende}"
    assert zustaende.get("unabhaengig") == k3["zustand_unabhaengig"], f"K3: unabhängiges Element {zustaende}"
    assert bench().get("abstuerze") == 0, f"abstuerze = {bench().get('abstuerze')!r} statt 0"
