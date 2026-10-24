"""Abnahmetests ap-49 – Messung, Einordnung der Auswahlbefehle, Bericht (AK-7 bis AK-9)."""

from __future__ import annotations

import json
import re

from auswahl_hilfe import REPORT, RESULTS, bench

# Die 21 Auswahlbefehle aus design.md (Abschnitt „Auswahlbefehle für Frage 4“), ohne die Klammerzusätze.
BEFEHLE = (
    "Klicken",
    "Rahmen",
    "Lasso",
    "Unter dem Zeiger wählen",
    "Alles",
    "Nichts",
    "Umkehren",
    "Ähnliche",
    "Kantenschleife",
    "Auswahlfilter nach Art",
    "nach Lage",
    "nach Richtung",
    "nach Wert",
    "Sortieren",
    "Gruppe",
    "neu entstanden",
    "nach Eigenschaft",
    "Verbundene",
    "Benannte Auswahl",
    "Auswahl-Verlauf",
    "Mehrdeutige Auswahl klären",
)
GLEICH = ("treffer_quote", "permutation_stabil", "abstuerze", "einordnung")
ZEITEN = ("graph_auswahl_p95_ms", "halter_auswahl_p95_ms", "halter_neuberechnung_p95_ms")
ABSCHNITTE = ("## Fragestellung", "## Vorgehen", "## Messwerte", "## Empfehlung")


def _name(befehl: str) -> str:
    return re.sub(r"\s*\(.*\)\s*$", "", str(befehl)).strip().casefold()


def _gemeldet() -> dict:
    assert RESULTS.exists(), f"Messwerte fehlen: {RESULTS.relative_to(RESULTS.parents[2])}"
    return json.loads(RESULTS.read_text(encoding="utf-8"))


def _zahl(v) -> bool:
    return isinstance(v, (int, float)) and not isinstance(v, bool)


def test_ak7_budget_bei_10000_elementen():
    """AK-7 (Auswahl bei 10.000 Elementen): `bench.sh --json` selbst ausführen; `graph_auswahl_p95_ms` < 100,
    `halter_auswahl_p95_ms` und `halter_neuberechnung_p95_ms` als Zahl > 0 vorhanden."""
    m = bench()
    for k in ZEITEN:
        assert _zahl(m.get(k)) and m[k] > 0, f"{k} = {m.get(k)!r} ist keine Zahl > 0"
    assert m["graph_auswahl_p95_ms"] < 100, f"graph_auswahl_p95_ms = {m['graph_auswahl_p95_ms']} ≥ 100"


def test_ak8_alle_befehle_eingeordnet():
    """AK-8 (Einordnung der Auswahlbefehle): 21 von 21 Befehlen aus design.md in `einordnung`, jeder genau
    einmal mit genau einer Klasse aus A, B, C und nicht leerer Begründung."""
    einordnung = _gemeldet().get("einordnung")
    assert isinstance(einordnung, list), "einordnung fehlt oder ist keine Liste"
    namen = [_name(e.get("befehl", "")) for e in einordnung]
    soll = {_name(b) for b in BEFEHLE}
    fehlend = sorted(soll - set(namen))
    assert not fehlend, f"nicht eingeordnet: {fehlend}"
    doppelt = sorted({n for n in namen if namen.count(n) > 1})
    assert not doppelt, f"mehrfach eingeordnet: {doppelt}"
    assert len(einordnung) == 21, f"{len(einordnung)} Einträge statt 21: {sorted(set(namen) - soll)}"
    for e in einordnung:
        assert e.get("klasse") in ("A", "B", "C"), f"{e.get('befehl')}: Klasse {e.get('klasse')!r}"
        assert str(e.get("begruendung", "")).strip(), f"{e.get('befehl')}: Begründung fehlt"


def _go_nach_regel(m: dict) -> bool:
    """Regel aus design.md – Empfehlung."""
    return (
        m.get("treffer_quote") == 1.0
        and m.get("permutation_stabil") is True
        and m.get("abstuerze") == 0
        and _zahl(m.get("graph_auswahl_p95_ms"))
        and m["graph_auswahl_p95_ms"] < 100
        and len(m.get("einordnung") or []) == 21
        and _befunde_wie_erwartet(m.get("befunde"))
    )


def _befunde_wie_erwartet(befunde) -> bool:
    if isinstance(befunde, dict):
        befunde = [
            {"fall": k, **v} if isinstance(v, dict) else {"fall": k, "code": v} for k, v in befunde.items()
        ]
    if not isinstance(befunde, list):
        return False
    codes = {b.get("fall"): b.get("code") for b in befunde if isinstance(b, dict)}
    return codes.get("K1") == "kein_ziel" and codes.get("K2") == "mehrdeutig" and "K3" in codes


def test_ak9_bericht_vollstaendig():
    """AK-9 (Bericht und Messwerte): Bericht mit allen Abschnitten; erste Zeile unter `## Empfehlung` ist Go
    oder No-Go und stimmt mit `empfehlung` überein, die der Regel aus design.md folgt."""
    assert REPORT.exists(), "Bericht docs/spikes/auswahl.md fehlt"
    text = REPORT.read_text(encoding="utf-8")
    for a in ABSCHNITTE:
        assert a in text, f"Abschnitt {a!r} fehlt"
    erste = text.split("## Empfehlung", 1)[1].strip().splitlines()[0].strip()
    m = _gemeldet()
    assert m.get("empfehlung") in ("go", "no-go"), f"empfehlung = {m.get('empfehlung')!r}"
    erwartet = "No-Go" if m["empfehlung"] == "no-go" else "Go"
    assert re.match(rf"^\W*{erwartet}\b", erste) and not (erwartet == "Go" and "No-Go" in erste), (
        f"Empfehlung im Bericht {erste!r} passt nicht zu {m['empfehlung']!r}"
    )
    assert m.get("faelle_gesamt") == 20, f"faelle_gesamt = {m.get('faelle_gesamt')!r} statt 20"
    assert (m["empfehlung"] == "go") == _go_nach_regel(m), "Empfehlung folgt nicht der Regel aus design.md"


def test_ak9_nachmessbar():
    """AK-9 (Bericht und Messwerte, nachmessbar): `bench.sh --json` selbst ausführen; `treffer_quote`,
    `permutation_stabil`, `abstuerze` und `einordnung` gleich, Zeiten höchstens Faktor 2 Abweichung."""
    gemeldet, gemessen = _gemeldet(), bench()
    for k in GLEICH:
        assert k in gemessen, f"bench.sh --json liefert {k} nicht"
        assert gemessen[k] == gemeldet.get(k), f"{k}: gemessen {gemessen[k]!r}, gemeldet {gemeldet.get(k)!r}"
    for k in ZEITEN:
        a, b = gemessen.get(k), gemeldet.get(k)
        assert _zahl(a) and _zahl(b) and a > 0 and b > 0, f"{k}: gemessen {a!r}, gemeldet {b!r}"
        assert max(a, b) / min(a, b) <= 2, f"{k}: gemessen {a} ms, gemeldet {b} ms (mehr als Faktor 2)"
