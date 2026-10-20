"""Hilfen für die Abnahmetests von ap-41: Prototyp bauen, Prüfwerkzeug aufrufen, Modell durchsuchen.

Grundsatz: Das Prüfwerkzeug (`npm run --silent pruefen -- <befehl> … --json`, Ausgabe: ein JSON-Wert auf stdout)
liefert nur Rohdaten (Namenslisten, Texte, Farbwerte, URLs, Modell-Schnappschüsse aus `window.__cee.modell()`).
Alle Urteile (Gleichheit, Zählen, Token-Vergleich, Regex auf Texte, Host-Prüfung) fällt der Python-Test. Selbstberichtete
Ja/Nein-Werte und Zähler gibt es nicht. Leere Listen dort, wo es Inhalt geben muss (Werkzeuge, sichtbarer Text,
Anfragen, gefundene Befehle), sind ein Fehler. „Größe“ = `{"value": <Zahl>, "unit": "mm"}`. Alle Schnappschüsse
sind vollständige `modell()`-Ausgaben (Projekt-JSON, Elementform id/type/params/content/meta), unverändert.

Modellform: Referenzen auf andere Elemente dürfen verschachtelt oder per ID-String stehen (z. B. Verbindungspunkte,
Instanzen); die Tests lösen IDs auf. Teile haben `type` „part“, den Namen unter `name`, `meta.name` oder
`params.name`. Instanzen in Baugruppen tragen `params.position` mit `x`, `y`, `z` als Größen; der Ursprung eines
Teils liegt in der Mitte seiner Unterseite (Deckel-Unterseite = `position.z` der Deckel-Instanz).

Befehle und Felder (alle Namen der `--variante` stehen hier; Zahlen sind JSON-Zahlen, Listen JSON-Listen):

- `zustaende --out <dir>`: Liste `{zustand, thema, datei, bereit_ms, eingaben}`; je Eintrag ein PNG.
- `budget`: `{"zustaende": [Z, ...], "kuerzel": [<angezeigte Kürzel als Text>, ...]}` mit je Zustand und Thema
  `Z = {zustand, thema, werkzeuge: [data-befehl-ID je Werkzeug], arbeitsbereiche: [Namen],
  panels: [data-panel-Namen], hauptaktionen: [data-befehl-ID je data-hauptaktion], muster: [data-muster-Werte],
  modale_dialoge: [Beschreibung je [aria-modal=true]/dialog:modal], body_schrift: "<berechnete font-family>",
  ohne_befehl: [Beschreibung je Bedienelement ohne data-befehl], befehle_gefunden: [data-befehl-IDs aller
  Bedienelemente], farben: [{wert: "#RRGGBB", alpha: <0..1>, ort: "<Selektor/Muster>", akzent_rolle:
  "auswahl"|"fokus"|"hauptaktion"|"ki"|null}] (berechnete Farben sichtbarer Elemente außerhalb der 3D-Fläche, ohne
  vollständig transparente), karten: [{muster, quelle}]}`.
- `befehle`: Liste `{befehl, treffer: [{befehl, kuerzel_text}, ...], protokoll_neu: [{befehl, parameter, quelle}]}`;
  `treffer` = Gruppe Befehle in Anzeigereihenfolge nach Eingabe des deutschen Titels (`kuerzel_text` = neben dem
  Treffer angezeigter Text, sonst ""), `protokoll_neu` = nach Enter neu hinzugekommene Protokolleinträge.
- `texte`: `{"zustaende": [{zustand, sprache: "schluessel"|"de"|"en", sichtbarer_text: [Text je sichtbarem
  Textknoten oder Bedienelement], modell: <modell()>}]}` für alle 13 Zustände in allen drei Sprachen.
- `anfragen`: `{"anfragen": [<URL jeder Netzanfrage aller Zustände und Abläufe, auch lokale>]}`.
- `messen`: `{auswahl_p95_ms, werkzeug_p95_ms, suche_p95_ms}`.
- `ablauf <a-f> [--variante <name>]`, immer mit `eingaben` (Zahl echter Klicks/Tasten), `modell`, `protokoll`;
  weitere Felder je Ablauf:
  - `a`: `letzte_aktion` (Text). `a --variante rueckgaengig`: `modell_zurueck` (nach Strg+Z), `modell_wiederholt`
    (danach Strg+Umschalt+Z), `modell`.
  - `b`: `modell`. `b --variante befund`: `status_verrundung {wort, symbol, farbe: "#RRGGBB"}`, `korrektur_text`,
    `befunde_vor_korrektur` und `befunde_nach_korrektur` (Listen von Texten), `modell_mit_befund` (Radius 30 mm,
    Extrusion danach auf 9 mm gesetzt), `auswahl_nach_klick_auf_extrusion` (Liste von IDs), `modell` (nach Korrektur).
  - `c`: `modell`.
  - `d`: `vergleich {vorher, nachher}` (Anzeigetexte), `haupt_modell_vor_uebernehmen`,
    `haupt_modell_nach_uebernehmen`, `entwurf_modell` (Modell im Entwurf), `entwurf_zustand` (Text).
    Entwürfe stehen in `modell()` als Elemente vom Typ mit „draft“ oder „entwurf“.
  - `d --variante verwerfen`: `modell_vorher`, `modell_nach_versuch_ohne_begruendung` (nach Klick/Enter auf
    „Verwerfen“ ohne Begründung), `modell_nachher` (nach Verwerfen mit „zu schwer“), `ansicht_ergebnis` (Namen der
    in „Ergebnis“ sichtbaren Entwürfe), `ansicht_alle_entwuerfe` (Liste `{name, begruendung}`), `verworfen_name`,
    `verwerfen_ausloesbar_ohne_begruendung` (Wert des Attributs `disabled`/`aria-disabled` des Knopfs, als
    `{disabled: <bool>}`; der Test ergänzt dies durch den Modellvergleich).
  - `e --variante elemente`: `gruppe_elemente` (Texte), `auswahl_namen` (Namen der ausgewählten Elemente).
  - `e` (ohne Variante): `suche_zurueck {treffer: [{befehl, kuerzel_text}]}`.
  - `e --variante unbekannter-zustand`: `bereit_ms`, `zustand_gezeigt`, `befunde` (Texte), `konsolenfehler` (Liste).
  - `f`: `modell_vorher` (vor der Absicht), `undo_schritte` (Liste der Modelle nach dem 1., 2., … Strg+Z, bis
    mindestens 4 Schritte), `modell`, `protokoll`.
  - `f --variante drei-wege`: `wege` = Liste `{weg: "fragen"|"ki-fragen"|"suche", befehlszeilen: [Text],
    modell_vorher, modell_bei_karte}`.
  - `f --variante unbekannt`: `ohne_auswahl` und `unbekannter_satz`, je `{beispielsaetze: [Text],
    modale_dialoge: [..], modell_vorher, modell_nachher}`.
  - `f --variante absichten`: `karten` = Liste `{befehl, wert, vorher, nachher, hauptaktionen: [data-befehl-IDs
    der Hauptaktionen der Karte]}`.
  - `f --variante verwerfen`: `modell_vorher`, `modell_nach_verwerfen`, `modell_nach_anhalten`,
    `karten_nach_verwerfen`, `karten_nach_anhalten` (Listen der sichtbaren Entscheidungskarten).
"""

# ruff: noqa: E501  (Schnittstellenbeschreibung im Docstring)

from __future__ import annotations

import json
import subprocess
from pathlib import Path

from conftest import ROOT, need

P = ROOT / "spikes" / "ux-prototyp"
LEITFADEN = ROOT / "docs" / "spikes" / "ux-prototyp.md"

ZUSTAENDE = [
    "leer", "skizze", "extrusion", "platte", "verrundung", "befund", "teile",
    "verbindung", "suche", "entwuerfe", "vergleich", "ki-arbeitet", "ki-vorschlag",
]  # fmt: skip

_gebaut = False


def bauen() -> None:
    """`build.sh` einmal je Testlauf; ein Fehlschlag ist ein Testfehler."""
    global _gebaut
    if _gebaut:
        return
    assert P.is_dir(), "spikes/ux-prototyp/ fehlt"
    assert (P / "build.sh").is_file(), "spikes/ux-prototyp/build.sh fehlt"
    need("bash")
    need("npm")
    r = subprocess.run(["bash", str(P / "build.sh")], cwd=ROOT, capture_output=True, text=True, timeout=1800)
    assert r.returncode == 0, r.stdout[-2000:] + r.stderr[-2000:]
    _gebaut = True


def npm(*args: str, timeout: int = 900) -> subprocess.CompletedProcess:
    bauen()
    return subprocess.run(["npm", *args], cwd=P, capture_output=True, text=True, timeout=timeout)


def pruefen(*args: str, timeout: int = 900):
    """Prüfwerkzeug aufrufen und die JSON-Ausgabe zurückgeben."""
    r = npm("run", "--silent", "pruefen", "--", *args, "--json", timeout=timeout)
    assert r.returncode == 0, f"pruefen {' '.join(args)}: {r.stdout[-1500:]}{r.stderr[-1500:]}"
    return json.loads(r.stdout)


def ablauf(name: str, variante: str | None = None) -> dict:
    args = ["ablauf", name]
    if variante:
        args += ["--variante", variante]
    return pruefen(*args)


def knoten(wert):
    """Alle Dicts eines JSON-Baums."""
    if isinstance(wert, dict):
        yield wert
        for v in wert.values():
            yield from knoten(v)
    elif isinstance(wert, list):
        for v in wert:
            yield from knoten(v)


def finde(modell, *typen: str) -> list[dict]:
    """Elemente, deren `type` einen der Namen (ohne Groß-/Kleinschreibung) enthält."""
    return [
        k for k in knoten(modell)
        if isinstance(k.get("type"), str) and any(t in k["type"].lower() for t in typen)
    ]  # fmt: skip


def mm(groesse) -> float:
    """Größe `{"value", "unit"}` in mm."""
    faktor = {"mm": 1.0, "cm": 10.0, "m": 1000.0}[groesse["unit"]]
    return groesse["value"] * faktor


def param(element: dict, *namen: str):
    """Wert aus `params` (oder dem Element selbst) unter einem der Namen."""
    for quelle in (element.get("params") or {}, element):
        for n in namen:
            if n in quelle:
                return quelle[n]
    raise AssertionError(f"Parameter {namen} fehlt in {json.dumps(element)[:300]}")


def protokoll_befehle(ergebnis: dict) -> list[dict]:
    return ergebnis["protokoll"]


def register() -> list[dict]:
    daten = json.loads((P / "src" / "befehle.json").read_text("utf-8"))
    return daten if isinstance(daten, list) else daten["befehle"]


def quelltexte() -> list[Path]:
    src = P / "src"
    return [p for p in src.rglob("*") if p.is_file() and "erzeugt" not in p.relative_to(src).parts]


def name_von(element: dict) -> str:
    """Name eines Elements aus `name`, `meta.name` oder `params.name`."""
    for quelle in (element, element.get("meta") or {}, element.get("params") or {}):
        if isinstance(quelle, dict) and isinstance(quelle.get("name"), str):
            return quelle["name"]
    return ""


def elemente_nach_id(modell) -> dict[str, dict]:
    return {k["id"]: k for k in knoten(modell) if isinstance(k.get("id"), str) and "type" in k}


def bezogene(modell, element: dict) -> list[dict]:
    """Das Element und alles, was es enthält oder per ID-String referenziert (transitiv, ohne Doppelte)."""
    nach_id = elemente_nach_id(modell)
    gesehen: set[int] = set()
    ergebnis: list[dict] = []

    def lauf(k: dict) -> None:
        if id(k) in gesehen:
            return
        gesehen.add(id(k))
        ergebnis.append(k)
        for sub in knoten(k):
            if sub is not k and "type" in sub:
                lauf(sub)
        for sub in knoten(k):
            for v in sub.values():
                for s in v if isinstance(v, list) else [v]:
                    if isinstance(s, str) and s in nach_id and nach_id[s] is not k:
                        lauf(nach_id[s])

    lauf(element)
    return ergebnis


def text_mit_referenzen(modell, element: dict) -> str:
    return " ".join(json.dumps(k, ensure_ascii=False) for k in bezogene(modell, element))


def teil(modell, name: str) -> dict:
    """Das Teil mit diesem Namen; muss eindeutig sein."""
    treffer = [
        k for k in knoten(modell)
        if str(k.get("type", "")).lower() in ("part", "teil") and name_von(k) == name
    ]  # fmt: skip
    assert len(treffer) == 1, f"Teil „{name}“ nicht eindeutig im Modell: {len(treffer)}"
    return treffer[0]


def im_teil(modell, teilname: str, *typen: str, erwartet: int = 1) -> list[dict]:
    """Elemente der Typen innerhalb des benannten Teils (verschachtelt oder per ID referenziert)."""
    t = teil(modell, teilname)
    alle = [k for k in bezogene(modell, t) if k is not t]
    treffer = [k for k in alle if str(k.get("type", "")).lower() in typen]  # genauer Typname zuerst
    if not treffer:
        treffer = [k for k in alle if any(x in str(k.get("type", "")).lower() for x in typen)]
    assert len(treffer) == erwartet, f"{typen} in „{teilname}“: {len(treffer)} statt {erwartet}"
    return treffer


def tokens() -> dict:
    return json.loads((ROOT / "docs" / "design" / "tokens.json").read_text("utf-8"))


def token_farben(thema: str) -> set[str]:
    """Alle Farbwerte (#RRGGBB, groß) des Themas: `farbe.<thema>` und themenunabhängige wie `achse`."""
    daten = tokens()
    werte: set[str] = set()

    def lauf(n):
        if isinstance(n, dict):
            if n.get("$type") == "color":
                werte.add(n["$value"].upper())
            else:
                for v in n.values():
                    lauf(v)

    lauf(daten["farbe"][thema])
    for k, v in daten.items():
        if k != "farbe":
            lauf(v)
    return werte


def akzent_farben(thema: str) -> set[str]:
    f = tokens()["farbe"][thema]
    return {f[k]["$value"].upper() for k in ("akzent", "akzent-flaeche", "auf-akzent")}


def i18n(sprache: str) -> dict:
    return json.loads((P / "src" / "i18n" / f"{sprache}.json").read_text("utf-8"))


def flach(d: dict, pre: str = ""):
    for k, v in d.items():
        if isinstance(v, dict):
            yield from flach(v, f"{pre}{k}.")
        else:
            yield f"{pre}{k}", v
