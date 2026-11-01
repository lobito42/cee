"""ap-53, Capability `skizze-vorschau`: Befehle im Register, Werkzeugleiste, Skizze anlegen und schließen (AK-7, AK-8).

Das Prüfwerkzeug (`pruefen -- skizze …`) spielt echte Eingaben in der Vorschau mit Brücke und Worker und liefert Rohdaten;
alle Urteile (Zählen, Winkel, Vergleichen) fällt der Test. Formen der Schritte und Schnappschüsse: `skz_helpers.py`.
"""

# ruff: noqa: E501

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from conftest import ROOT  # noqa: E402
from skz_helpers import (  # noqa: E402
    MAX_AKTIONEN,
    MAX_GRUPPE,
    SAblauf,
    anfang,
    dropdown_eintraege,
    flach,
    kind_id,
    register,
    register_nach_id,
    skizze_pruefen,
    taskleiste,
    winkel_grad,
    wurzeln,
)

KUERZEL = {
    "skizze.anlegen": "S",
    "skizze.linie": "L",
    "skizze.rechteck": "R",
    "skizze.kreis": "K",
    "koerper.hochziehen": "E",
}
SIEBEN = [*KUERZEL, "skizze.fertig", "skizze.bearbeiten"]
WERKZEUGLEISTE = ["skizze.linie", "skizze.rechteck", "skizze.kreis", "skizze.fertig"]


def _kuerzel(b: dict):
    k = b.get("kuerzel")
    return None if k in (None, "", []) else k


def test_orte_kuerzel_und_grenzen():
    """Requirement „Befehle im Register mit Orten und Kürzeln“, Scenario „Orte, Kürzel und Grenzen“: 7 Befehle mit
    `folgt` = false; `skizze.anlegen`, `.linie`, `.rechteck`, `.kreis`, `koerper.hochziehen` mit Kürzel S, L, R, K, E; jeder
    mit den Orten Dropdown und Suche; `skizze.anlegen` Kontextaktion auf einer Ebene, `koerper.hochziehen` auf einem
    Bereich; Linie, Rechteck, Kreis und Fertig am Ort `werkzeugleiste`; kein Kürzel doppelt im Register; alle früheren
    Kürzel unverändert; Dropdowns „Skizze“ und „Körper“ je höchstens 12 Einträge."""
    r = skizze_pruefen("befehle")
    befehle = {b["id"]: b for b in r["befehle"]}
    assert sorted(befehle) == sorted(SIEBEN), sorted(befehle)
    reg = register_nach_id()
    for id in SIEBEN:
        b = befehle[id]
        assert b["folgt"] is False and not reg[id].get("folgt"), id
        assert {"dropdown", "suche"} <= set(b["orte"]), (id, b["orte"])
        assert reg[id].get("familie") and reg[id].get("untergruppe"), id
    for id, k in KUERZEL.items():
        assert befehle[id]["kuerzel"] == k and _kuerzel(reg[id]) == k, (id, befehle[id]["kuerzel"])
    assert "kontextaktion" in befehle["skizze.anlegen"]["orte"], befehle["skizze.anlegen"]["orte"]
    assert "kontextaktion" in befehle["koerper.hochziehen"]["orte"], befehle["koerper.hochziehen"]["orte"]
    for id in WERKZEUGLEISTE:
        assert "werkzeugleiste" in befehle[id]["orte"], (id, befehle[id]["orte"])
    for id in ("skizze.anlegen", "koerper.hochziehen", "skizze.bearbeiten"):
        assert "werkzeugleiste" not in befehle[id]["orte"], (id, befehle[id]["orte"])

    alle = [_kuerzel(b) for b in register() if _kuerzel(b)]
    doppelt = sorted({k for k in alle if alle.count(k) > 1})
    assert doppelt == [], f"doppelte Kürzel im Register: {doppelt}"

    # frühere Kürzel unverändert (Stand origin/main)
    alt = subprocess.run(
        ["git", "show", "origin/main:spikes/ux-prototyp-2/src/befehle.json"],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    assert alt.returncode == 0, alt.stderr
    daten = json.loads(alt.stdout)
    for b in daten if isinstance(daten, list) else daten["befehle"]:
        if _kuerzel(b):
            assert _kuerzel(reg[b["id"]]) == _kuerzel(b), f"Kürzel von {b['id']} hat sich geändert"

    t = taskleiste("Modellieren")
    namen = {d["name"]: d for d in t["dropdowns"]}
    assert {"Skizze", "Körper"} <= set(namen), sorted(namen)
    for n in ("Skizze", "Körper"):
        eintraege = [e["befehl"] for u in namen[n]["untergruppen"] for e in u["eintraege"]]
        assert 1 <= len(eintraege) <= MAX_GRUPPE, (n, eintraege)
    gesamt = {e["befehl"] for e in dropdown_eintraege({"dropdowns": [namen["Skizze"], namen["Körper"]]})}
    assert set(SIEBEN) <= gesamt, sorted(set(SIEBEN) - gesamt)
    assert MAX_AKTIONEN == 5


def test_werkzeugleiste_nur_in_der_skizze():
    """Scenario „Werkzeugleiste nur in der Skizze“: im Zustand `skizze-leer` ist `werkzeugleiste` vor und nach einer offenen
    Skizze leer und währenddessen genau [`skizze.linie`, `skizze.rechteck`, `skizze.kreis`, `skizze.fertig`]; die
    `kontextleiste` hat nie mehr als 5 Einträge."""
    g = anfang("skizze-leer")["graph"]
    xy = kind_id(g, "frame", 1, "plane", 1)
    a = (
        SAblauf()
        .add("ebene", klick={"element": xy})
        .add("offen", taste="S")
        .add("zu", taste="Escape")
        .laufen("skizze-leer")
    )
    assert a.s("anfang")["werkzeugleiste"] == []
    assert a.s("offen")["werkzeugleiste"] == WERKZEUGLEISTE, a.s("offen")["werkzeugleiste"]
    assert a.s("zu")["werkzeugleiste"] == []
    assert all(len(s["kontextleiste"]) <= MAX_AKTIONEN for s in a.snaps), [
        len(s["kontextleiste"]) for s in a.snaps
    ]
    assert "skizze.anlegen" in a.s("ebene")["kontextleiste"], a.s("ebene")["kontextleiste"]


def _kamera_pruefen(kam: dict, normale, x_richtung=None) -> None:
    assert kam["projektion"] == "parallel", kam
    assert kam["ms_bis_ruhe"] <= 400, kam["ms_bis_ruhe"]
    assert winkel_grad(kam["richtung"], tuple(-n for n in normale)) <= 0.1, (kam["richtung"], normale)
    if x_richtung is not None:
        d, o = kam["richtung"], kam["oben"]
        rechts = (d[1] * o[2] - d[2] * o[1], d[2] * o[0] - d[0] * o[2], d[0] * o[1] - d[1] * o[0])
        assert winkel_grad(rechts, x_richtung) <= 0.1, (rechts, x_richtung)


def test_anlegen_kamera_und_fertig():
    """Requirement „Skizze auf einer Ebene anlegen und schließen“, Scenario „Anlegen, Kamera, Fertig“: XY-Ebene von K0
    anklicken, `S` drücken, `skizze.fertig`; in einem zweiten Lauf ZX-Ebene wählen und `skizze.anlegen` über die
    Kontextleiste: je genau 1 `sketch` mit `ebene` = gewählte Ebene, `skizze_offen` danach dessen ID, `kamera.richtung`
    höchstens 0,1° von −Normale, `projektion` = parallel, `ms_bis_ruhe` ≤ 400, `x_direction` zeigt nach rechts; nach Fertig
    ist `skizze_offen` null und die Richtung höchstens 0,1° von der vor dem Öffnen."""
    g = anfang("skizze-leer")["graph"]
    xy, zx = kind_id(g, "frame", 1, "plane", 1), kind_id(g, "frame", 1, "plane", 3)

    a1 = (
        SAblauf()
        .add("wahl", klick={"element": xy})
        .add("s", taste="S")
        .add("fertig", befehl="skizze.fertig")
        .laufen("skizze-leer")
    )
    sk = wurzeln(a1.s("s")["graph"], "sketch")
    assert len(sk) == 1 and sk[0]["inputs"]["ebene"].split(".")[0] == xy, sk
    assert a1.s("s")["skizze_offen"] == sk[0]["id"]
    _kamera_pruefen(a1.s("s")["kamera"], (0, 0, 1), x_richtung=(1, 0, 0))
    assert a1.s("fertig")["skizze_offen"] is None
    assert winkel_grad(a1.s("fertig")["kamera"]["richtung"], a1.s("anfang")["kamera"]["richtung"]) <= 0.1

    a2 = (
        SAblauf()
        .add("wahl", klick={"element": zx})
        .add("kontext", befehl="skizze.anlegen")
        .laufen("skizze-leer")
    )
    assert "skizze.anlegen" in a2.s("wahl")["kontextleiste"], a2.s("wahl")["kontextleiste"]
    sk2 = wurzeln(a2.s("kontext")["graph"], "sketch")
    assert len(sk2) == 1 and sk2[0]["inputs"]["ebene"].split(".")[0] == zx, sk2
    assert a2.s("kontext")["skizze_offen"] == sk2[0]["id"]
    _kamera_pruefen(a2.s("kontext")["kamera"], (0, 1, 0))
    assert all(s["konsolenfehler"] == [] for s in [*a1.snaps, *a2.snaps])


def test_ohne_ebene_und_wiedereintritt():
    """Scenario „Ohne Ebene und Wiedereintritt“: `S` ohne Auswahl und dann Klick auf die XY-Ebene: die Rückmeldezeile
    zeigt „Ebene wählen“, danach ist genau 1 Skizze offen; nach Esc keine; nach Doppelklick wieder dieselbe ID, ohne dass
    ein zweites `sketch` entsteht."""
    g = anfang("skizze-leer")["graph"]
    xy = kind_id(g, "frame", 1, "plane", 1)
    a = (
        SAblauf()
        .add("s", taste="S")
        .add("klick", klick={"element": xy})
        .add("esc", taste="Escape")
        .add("doppel", zeiger={"element": "sketch#1", "aktion": "doppelklick"})
        .laufen("skizze-leer")
    )
    assert "Ebene wählen" in a.s("s")["rueckmeldung"], a.s("s")["rueckmeldung"]
    assert a.s("s")["skizze_offen"] is None
    sk = wurzeln(a.s("klick")["graph"], "sketch")
    assert len(sk) == 1 and a.s("klick")["skizze_offen"] == sk[0]["id"]
    assert a.s("esc")["skizze_offen"] is None
    assert a.s("doppel")["skizze_offen"] == sk[0]["id"]
    assert len(wurzeln(a.s("doppel")["graph"], "sketch")) == 1
    assert len(flach(a.s("doppel")["graph"])) == len(flach(a.s("klick")["graph"]))
