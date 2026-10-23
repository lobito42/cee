"""AK-17, AK-11, AK-12, AK-13: Requirements „Ansicht ist flüchtig“, „Speichern einer Ansicht ist ausdrücklich“,
„Rückmeldung und Fehler“, „Tastatur und Fokus“, „Andere Personen nur live“."""

# ruff: noqa: E501

from __future__ import annotations

import re

from grundlagen_helpers import (
    Bild,
    abstand,
    auswahl_ids,
    elemente,
    farbe,
    hex_rgb,
    kanon,
    kuerzel_norm,
    nach_name,
    nahe,
    name_von,
    pruefen,
    register,
    verworfen,
    volumen,
)

# --- Ansicht ist flüchtig -----------------------------------------------------------------------------------


def _kamera_gleich(a: dict, b: dict) -> bool:
    return (
        abs(a["azimut_grad"] - b["azimut_grad"]) <= 0.5
        and abs(a["hoehe_grad"] - b["hoehe_grad"]) <= 0.5
        and abs(a["abstand_mm"] - b["abstand_mm"]) <= 0.01 * a["abstand_mm"]
    )


def test_neuladen_setzt_ansicht_zurueck_graph_bleibt():
    """Scenario „Neuladen setzt die Ansicht zurück, der Graph bleibt“: Kamera, Darstellung, Auswahl, Ausgeblendetes
    nach dem Neuladen auf den Vorgaben; `modell()` byte-gleich."""
    n = pruefen("neuladen")
    vor, vorgaben, nach = n["vorher"], n["vorgaben"], n["nachher"]
    assert not _kamera_gleich(vor["ansicht"]["kamera"], vorgaben["ansicht"]["kamera"]), (
        "Kamera wurde nicht verändert"
    )
    assert vor["ansicht"]["darstellung"] == "kanten" and vorgaben["ansicht"]["darstellung"] != "kanten"
    assert auswahl_ids(vor["auswahl"]) and vor["ansicht"]["ausgeblendet"], (
        "Vorbedingungen des Ablaufs nicht erfüllt"
    )
    assert _kamera_gleich(nach["ansicht"]["kamera"], vorgaben["ansicht"]["kamera"]), (
        nach["ansicht"],
        vorgaben["ansicht"],
    )
    assert nach["ansicht"]["darstellung"] == vorgaben["ansicht"]["darstellung"]
    assert nach["auswahl"] == [] and nach["ansicht"]["ausgeblendet"] == []
    assert len(elemente(nach["modell"])) == len(elemente(vor["modell"])) > 0
    assert kanon(nach["modell"]).encode() == kanon(vor["modell"]).encode()


def test_ansichtsaenderung_aendert_den_graphen_nicht():
    """Scenario „Ansichtsänderung ändert den Graphen nicht“: nach jedem Schritt (drehen, zoomen, Darstellung,
    Projektion, wählen, isolieren, ausblenden, einblenden) Modell, Protokolllänge, Verlauf, gehaltener Graph gleich."""
    s = pruefen("neuladen")["ansichtsschritte"]
    aktionen = {x["aktion"] for x in s}
    assert {
        "drehen",
        "zoomen",
        "darstellung",
        "projektion",
        "waehlen",
        "isolieren",
        "ausblenden",
        "einblenden",
    } <= aktionen, aktionen
    ausgang = s[0]
    for x in s[1:]:
        assert kanon(x["modell"]) == kanon(ausgang["modell"]), x["aktion"]
        assert x["protokoll_laenge"] == ausgang["protokoll_laenge"], x["aktion"]
        assert x["verlauf_laenge"] == ausgang["verlauf_laenge"], x["aktion"]
        assert x["speicher_graph"] == ausgang["speicher_graph"], (
            f"{x['aktion']}: Graph in localStorage geändert"
        )


def test_gespeicherte_ansicht_ueberlebt_neuladen():
    """Scenario „Gespeicherte Ansicht überlebt Neuladen“: genau ein Element `view` „Ansicht: Schnitt A“ in `modell()`
    und Struktur, Speichern = 1 Verlaufseintrag; Anwenden stellt Kamera (± 0,5°, ± 1 %), Auswahl, Ausgeblendetes
    her, ohne das Modell zu ändern."""
    s = pruefen("neuladen")["speichern"]
    assert s["name"] == "Ansicht: Schnitt A"
    views = [
        e for e in elemente(s["nach_neuladen"]["modell"]) if e["type"] == "view" and name_von(e) == s["name"]
    ]
    assert len(views) == 1, views
    assert [t for t in s["nach_neuladen"]["struktur_texte"] if t == s["name"]] == [s["name"]]
    assert s["nach_neuladen"]["verlauf_neu_beim_speichern"] == 1
    soll, ist = s["gespeichert"]["ansicht"], s["angewendet"]["ansicht"]
    assert _kamera_gleich(soll["kamera"], ist["kamera"]), (soll["kamera"], ist["kamera"])
    assert s["angewendet"]["auswahl"] == s["gespeichert"]["auswahl"] != []
    assert ist["ausgeblendet"] == soll["ausgeblendet"] != []
    assert kanon(s["angewendet"]["modell_nachher"]) == kanon(s["angewendet"]["modell_vorher"])


def test_gespeicherte_ansicht_wirkt_nicht_auf_das_ergebnis():
    """Scenario „Gespeicherte Ansicht wirkt nicht auf das Ergebnis“: `teil()` mit Steg (49,49 cm³ ± 0,1 %), Steg in
    `modell()` weder verworfen noch ausgeschlossen."""
    s = pruefen("neuladen")["speichern"]
    assert nahe(s["teil_nach_anwenden"]["volumen_mm3"], volumen()), s["teil_nach_anwenden"]
    assert nahe(s["teil_nach_anwenden"]["volumen_mm3"], 49490.0), s["teil_nach_anwenden"]
    steg = nach_name(s["modell_nach_anwenden"], "Steg")
    assert not verworfen(steg)
    meta = steg.get("meta") or {}
    assert not any("ausgeschlossen" in str(k).lower() and v for k, v in meta.items()), meta


# --- Rückmeldung und Fehler -----------------------------------------------------------------------------------


def test_rueckmeldung_an_festen_orten():
    """Scenario „Feste Orte“: „rechnet“ nur an Struktur-Zeile und Modell, „fehlerhaft“ am Element und als Befund im
    Panel, Bestätigung nur in der Rückmeldezeile; 0 Dialoge, 0 Elemente außerhalb der Zonen."""
    r = pruefen("rueckmeldung")
    for k in ("rechnet", "ungueltig", "bestaetigung"):
        assert r[k]["dialoge"] == 0, (k, r[k]["dialoge"])
        assert r[k]["ausserhalb_zonen"] == [], (k, r[k]["ausserhalb_zonen"])
    rechnet = r["rechnet"]
    assert rechnet["statusanzeigen"] and all(s["zustand"] == "rechnet" for s in rechnet["statusanzeigen"])
    assert {s["ort"] for s in rechnet["statusanzeigen"]} == {"struktur", "modell"}, rechnet["statusanzeigen"]
    assert rechnet["befunde"] == []
    fehler = r["ungueltig"]
    assert fehler["statusanzeigen"] and all(s["zustand"] == "fehlerhaft" for s in fehler["statusanzeigen"])
    assert {s["ort"] for s in fehler["statusanzeigen"]} <= {"struktur", "modell"}, fehler["statusanzeigen"]
    orte = {b["ort"] for b in fehler["befunde"]}
    assert "panel" in orte and orte <= {"panel", "eigenschaften"}, orte
    b = r["bestaetigung"]
    assert b["statusanzeigen"] == [] and b["befunde"] == []
    assert [x["ort"] for x in b["rueckmeldungen"]] == ["rueckmeldung"] and b["rueckmeldungen"][0][
        "text"
    ].strip(), b


def test_das_modell_zerbricht_nie():
    """Scenario „Das Modell zerbricht nie“: im Zustand `befund` gelingen alle Änderungen an Grundplatte und Steg,
    0 Konsolenfehler, nach der Korrektur ist das Element aktuell und der Befund weg."""
    z = pruefen("rueckmeldung")["zerbricht"]
    assert len(z["schritte"]) >= 6, "Auswahl, Änderung, Ausblenden je für Grundplatte und Steg erwartet"
    assert all(s["ok"] is True for s in z["schritte"]), [s for s in z["schritte"] if not s["ok"]]
    assert z["konsolenfehler"] == [], z["konsolenfehler"]
    assert "fehlerhaft" not in z["bohrungen_zustaende"], z["bohrungen_zustaende"]
    assert z["befunde"] == [], z["befunde"]


# --- Tastatur und Fokus ---------------------------------------------------------------------------------------

TAB_REIHENFOLGE = [
    "menueleiste",
    "taskleiste",
    "struktur",
    "modell",
    "eigenschaften",
    "chat",
    "panel",
    "rueckmeldung",
]
KUERZEL = [
    "Mod+K", "Mod+Z", "Mod+Umschalt+Z", "Mod+B", "Mod+J", "Mod+Alt+B", "F2", "Mod+D", "Entf", "Mod+A", "F", "H",
    "Alt+H", "W", "F6",
]  # fmt: skip


def test_reihenfolge_und_fokus_sichtbar():
    """Scenario „Reihenfolge und Fokus sichtbar“: F6 erreicht die Zonen in der Reihenfolge aus design.md, jeder
    fokussierte Bereich hat einen Fokusring in `akzent` (ΔE ≤ 0,05)."""
    f6 = pruefen("tastatur")["f6"]
    sichtbar = [z for z in TAB_REIHENFOLGE if z in f6["sichtbare_zonen"]]
    assert len(sichtbar) >= 7, f6["sichtbare_zonen"]
    folge = f6["folge"]
    assert len(folge) >= len(sichtbar) + 1, "F6 muss mindestens einmal rundum gedrückt werden"
    start = sichtbar.index(folge[0]["zone"])
    soll = [sichtbar[(start + i) % len(sichtbar)] for i in range(len(folge))]
    assert [e["zone"] for e in folge] == soll, ([e["zone"] for e in folge], soll)
    akzent = hex_rgb(farbe("hell", "akzent"))
    for e in folge:
        assert len(e["ring_punkte"]) >= 8, e["zone"]
        bild = Bild(e["png"])
        treffer = sum(
            any(abstand(c, akzent) <= 0.05 for c in bild.umgebung(p["x"], p["y"], 2))
            for p in e["ring_punkte"]
        )
        assert treffer >= 0.9 * len(e["ring_punkte"]), (e["zone"], treffer, len(e["ring_punkte"]))


def test_esc_kette():
    """Scenario „Esc-Kette“: bei aktivem Gehäuse, gewähltem Element und offenem Kontextmenü schließt der 1. Druck das
    Menü, der 2. hebt die Auswahl auf, der 3. verlässt das aktive Element, die weiteren ändern nichts."""
    e = pruefen("tastatur")["esc"]
    s, d = e["start"], e["druecke"]
    assert len(d) == 5
    assert s["kontextmenue_offen"] is True and s["auswahl"] and s["aktiv"], s
    assert (d[0]["kontextmenue_offen"], d[0]["auswahl"], d[0]["aktiv"]) == (
        False,
        s["auswahl"],
        s["aktiv"],
    ), d[0]
    assert (d[1]["kontextmenue_offen"], d[1]["auswahl"], d[1]["aktiv"]) == (False, [], s["aktiv"]), d[1]
    assert (d[2]["kontextmenue_offen"], d[2]["auswahl"], d[2]["aktiv"]) == (False, [], None), d[2]
    for x in d[3:]:
        assert (x["kontextmenue_offen"], x["auswahl"], x["aktiv"]) == (False, [], None), x


def test_kuerzel_aus_dem_register():
    """Scenario „Kürzel aus dem Register“: jedes Kürzel führt seinen Befehl aus, steht neben dem Befehl in Menü und
    Suche, es gibt keine Kürzel außerhalb des Registers, genau die 15 aus design.md (≤ 15)."""
    k = pruefen("tastatur")["kuerzel"]
    datei = {b["id"]: kuerzel_norm(b["kuerzel"]) for b in register() if b.get("kuerzel")}
    fenster = {b["befehl"]: kuerzel_norm(b["kuerzel"]) for b in k["register"] if b.get("kuerzel")}
    assert fenster == datei, "befehle() und befehle.json stimmen nicht überein"
    assert len(datei) <= 15 and len(set(datei.values())) == 15, sorted(datei.values())
    erwartet = {kuerzel_norm(x) for x in KUERZEL}
    assert set(datei.values()) == erwartet, set(datei.values()) ^ erwartet
    assert {a["befehl"] for a in k["ausgeloest"]} == set(datei), "nicht jedes Kürzel ausgelöst"
    for a in k["ausgeloest"]:
        assert kuerzel_norm(a["kuerzel"]) == datei[a["befehl"]], a
        wirkung = (
            [p for p in a["protokoll_neu"] if p["befehl"] == a["befehl"]]
            or a["ansicht_vorher"] != a["ansicht_nachher"]
            or a["ui_vorher"] != a["ui_nachher"]
        )
        assert wirkung, f"{a['kuerzel']} ({a['befehl']}) ohne Wirkung"
        assert a["im_menue"] is True and a["in_suche"] is True, a


# --- Andere Personen ------------------------------------------------------------------------------------------


def test_andere_personen_nichts_gespeichert():
    """Scenario „Nichts gespeichert“: `andere` zeigt den Steg „von anderen bearbeitet“ und einen Zeiger mit Namen und
    „simuliert“; Storage, IndexedDB, Cookies ohne Einträge dazu; `halter` ohne Spuren."""
    a = pruefen("anwesenheit")
    assert "andere" in a["andere"]["steg_zustaende"], a["andere"]["steg_zustaende"]
    z = a["andere"]["zeiger"]
    assert z["name"] and any("simuliert" in t.lower() for t in z["texte"]), z
    spur = re.compile(r"testperson|andere|zeiger|anwesen|presence|cursor", re.I)
    s = a["speicher"]
    treffer = [
        e for e in (*s["local"], *s["session"]) if spur.search(str(e["key"])) or spur.search(str(e["value"]))
    ]
    assert treffer == [], treffer
    assert s["session"] == [] and s["indexeddb"] == [] and s["cookies"] == [], s
    h = a["halter"]
    assert h["zustaende_je_element"], "Halter ohne Elemente gemessen"
    assert all("andere" not in e["zustaende"] for e in h["zustaende_je_element"])
    assert not [t for t in h["texte"] if "Testperson" in t], h["texte"]
