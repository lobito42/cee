"""Hilfen für die Abnahmetests von ap-41c (schlankes Menü): baut auf den Hilfen von ap-41b auf.

Das Prüfwerkzeug (`npm --prefix spikes/ux-prototyp-2 run --silent pruefen -- <befehl> … --json`) liefert nur Rohdaten
(Listen, Texte, Zahlen aus `window.__cee`); alle Urteile (Zählen, Vergleichen, Rang, Perzentil) fällt der Test.
Bestehende Befehle und Formen von ap-41b gelten weiter (`tests/acceptance/ap-41b-ux-bedienkonzept/grundlagen_helpers.py`).
Neu bzw. erweitert (Namen der Felder wie in design.md Abschnitt 6; hier die vollständigen Formen):

- `befehle()` (Testschnittstelle): je Befehl zusätzlich `wirkung: bool` (= nicht `folgt`) und `orte: [Ort]` mit
  `Ort` ∈ start-menue, dropdown, kontextmenue, kontextmenue-mehr, kontextaktion, ansichtsleiste, menueleiste, auge,
  suche, suche-folgt, alle-befehle. `window.__cee.ausgeloest()`: `[{befehl, weg, wirkung}]`.
- Register `src/befehle.json`: neues Feld `handlung` (Text) für Varianten derselben Handlung.
- `sichtbarkeit-befehle`: `{taskleisten: [{name: "Modellieren"|"Simulation", start_menue: [E], dropdowns: [{name,
  untergruppen: [{name, eintraege: [E]}]}], ansichtsleiste: [E], ansichtsleiste_aufklappmenue: [E],
  alle_befehle: {sichtbar: [E], folgt_spaeter: [E]}}]}` mit `E = {befehl, folgt}` (`befehl` = Attribut
  `data-befehl`, `folgt` = laut `befehle()`; `alle_befehle.folgt_spaeter` ist der eingeklappte Abschnitt).
- `kontextmenue [--zustand <n>]` (Standard `auswahl`): `{arten: [{art, struktur: M, modell: M}],
  kontextaktionen_auswahl: M}` mit `M = {sichtbar: [{befehl, familie}], trennlinien, ueberschriften, mehr: bool,
  mehr_eintraege: Zahl der „Mehr …“-Zeilen, mehr_gruppen: [{name, eintraege: [{befehl}]}], hoehe_px,
  kontextaktionen: [befehl], kandidaten_nach_rang: [befehl]}`; `art` ∈ teil, schritt, kante, baugruppe, mehrfach,
  keine. `hoehe_px` ist die Höhe der sichtbaren Ebene bei 1440 × 900.
- `registerprobe --register <datei> --suche <text>`: zusätzlich `kontextmenue_element_sichtbar: [{befehl}]`,
  `kontextmenue_element_mehr: [{befehl}]`, `kontextaktionen_element: [befehl]`; `suche_treffer: [{befehl, folgt,
  gruppe}]`.
- `suche --eingabe <text> … [--klick <text>]`: `{eingaben: [{text, gruppen: [{name, treffer: [{befehl, folgt,
  sichtbar}]}], erster_treffer: {befehl, folgt}|null, enter: {befehl|null, modell_hash_vorher, modell_hash_nachher,
  ausgeloest_neu: [{befehl, wirkung}]}}], klick: {treffer: {befehl, titel}, modell_hash_vorher, modell_hash_nachher,
  ansicht_vorher, ansicht_nachher, protokoll_laenge_vorher, protokoll_laenge_nachher, rueckmeldungen: [Text]}}`; jede
  Eingabe aus frischem Zustand. `klick` gehört zum ersten Treffer der Gruppe „Folgt später“ der `--klick`-Eingabe.
- `doppelt`: `{faelle: [{taskleiste, zustand, menues: [{menue, eintraege: [{befehl, titel, handlung}],
  doppelte_ids, doppelte_titel, doppelte_handlungen}], doppelte_ids_menueleiste: [befehl],
  menueleiste_ids: [befehl] (jedes Vorkommen in Start-Menü, Dropdowns und Knöpfen), knoepfe: [{befehl,
  kuerzel_text}], duplizieren: {menue: "dropdown:Bearbeiten", protokoll_neu: [befehl]}|null}]}`; `menue` ∈
  start-menue, `dropdown:<Name>`, ansichtsleiste, ansichtsleiste-aufklappmenue, auge, kontextmenue, kontextmenue-mehr.
  `duplizieren` (nur Zustände `auswahl` und `mehrfach`): „Duplizieren“ im Dropdown „Bearbeiten“ ausgelöst.
- `ausloesen`: `{zustaende: [{zustand, eintraege: [{menue, befehl, ausgeloest_neu: [{befehl, weg, wirkung}],
  folgt_texte: Zahl der Rückmeldungen „folgt in einer späteren Stufe“, konsolenfehler: [Text]}]}]}`; `menue` ∈
  start-menue, `dropdown:<Name>`, kontextmenue, kontextmenue-mehr, kontextaktion; jeder Eintrag aus frischem Zustand.
- `tastatur`: zusätzlich `mehr: {wege: [{weg: "klick"|"tastatur", zweite_ebene_offen, ohne_ueberfahren,
  nach_esc1: {kontextmenue_offen, zweite_ebene_offen, fokus_auf_mehr}, nach_esc2: {kontextmenue_offen}}]}`;
  `ohne_ueberfahren` ist wahr, wenn zwischen Öffnen der Ebene und Zeigerbewegung über „Mehr …“ kein Hover nötig war.
- `inventar`: je Befehl zusätzlich `wirkung: bool`.
"""

# ruff: noqa: E501

from __future__ import annotations

import sys
from pathlib import Path

B41 = Path(__file__).resolve().parents[1] / "ap-41b-ux-bedienkonzept"
if str(B41) not in sys.path:
    sys.path.insert(0, str(B41))

from grundlagen_helpers import (  # noqa: E402,F401
    INVENTAR,
    P,
    inventar,
    modell_hash,
    p95,
    pruefen,
    register,
    register_nach_id,
    titel_de,
)

TASKLEISTEN = ("Modellieren", "Simulation")
ARTEN = ["teil", "schritt", "kante", "baugruppe", "mehrfach", "keine"]
BEZUG_PASST = {
    "teil": {"keine", "element", "teil"},
    "schritt": {"keine", "element"},
    "kante": {"keine", "kante"},
    "baugruppe": {"keine", "element", "baugruppe"},
    "mehrfach": {"keine", "mehrfach"},
    "keine": {"keine"},
}
# design.md Abschnitt 3 Nr. 4: Befehle mit festem Ort außerhalb des Kontextmenüs (Familien + einzelne IDs)
FESTE_FAMILIEN = {"Ansicht", "Fenster"}
FESTE_IDS = {"bearbeiten.rueckgaengig", "bearbeiten.wiederholen"}
KNOEPFE_MENUELEISTE = [
    "bearbeiten.rueckgaengig",
    "bearbeiten.wiederholen",
    "fenster.struktur",
    "fenster.panel",
    "fenster.rechts",
    "suche.oeffnen",
]
ANSICHTSLEISTE = [
    "ansicht.einpassen",
    "ansicht.auf-auswahl",
    "ansicht.isolieren",
    "ansicht.alles-einblenden",
    "ansicht.projektion",
    "darstellung.wechseln",
]
MAX_SICHTBAR = 8
MAX_AKTIONEN = 5
MAX_GRUPPE = 12
MAX_HOEHE_PX = 360
FOLGT_TEXT = "folgt in einer späteren Stufe"


def mit_wirkung() -> dict[str, dict]:
    return {b["id"]: b for b in register() if not b.get("folgt")}


def ist_fester_ort(befehl: dict) -> bool:
    return befehl["familie"] in FESTE_FAMILIEN or befehl["id"] in FESTE_IDS


def taskleiste(name: str) -> dict:
    t = {x["name"]: x for x in pruefen("sichtbarkeit-befehle")["taskleisten"]}
    assert set(t) >= set(TASKLEISTEN), sorted(t)
    return t[name]


def dropdown_eintraege(t: dict) -> list[dict]:
    return [e for d in t["dropdowns"] for u in d["untergruppen"] for e in u["eintraege"]]


def kontext_arten(zustand: str | None = None) -> list[dict]:
    r = pruefen("kontextmenue", *(("--zustand", zustand) if zustand else ()))
    assert [a["art"] for a in r["arten"]] == ARTEN, [a["art"] for a in r["arten"]]
    return r["arten"]


def mehr_befehle(m: dict) -> list[str]:
    return [e["befehl"] for g in m["mehr_gruppen"] for e in g["eintraege"]]


def sichtbar_befehle(m: dict) -> list[str]:
    return [e["befehl"] for e in m["sichtbar"]]
