# Spike: Auswahl nach Regel als Element im Graphen (ap-49)

Prototyp: `spikes/auswahl/` (kein Produktcode). Messwerte: `docs/spikes/auswahl.json`, nachmessbar mit
`bash spikes/auswahl/bench.sh --json`. Sollziele: `tests/golden/ap-49-spike-auswahl/faelle.json`.

## Fragestellung

ADR-065 Punkt 13 macht Auswahl zu einer eigenen Befehlsfamilie, Regeln sollen Daten im Graphen sein und über
stabile Adressen gelten (ADR-016, ADR-058). Vier Fragen:

1. Trifft eine gespeicherte Regel (Art, Lage, Richtung, Gruppe, „neu entstanden“) nach Neuberechnung mit
   geänderten Parametern dieselben Kanten und Flächen, ohne Topologie-Indizes?
2. Was geschieht, wenn eine Regel danach kein Ziel mehr findet oder mehrdeutig wird?
3. Wie lange dauert die Auswahl bei 10.000 Elementen (Budget: p95 < 100 ms)?
4. Welche der 21 Auswahlbefehle lassen sich auf dieselbe Datenform abbilden?

## Vorgehen

**Halter als Elementkette.** Der Halter aus `parts/examples/halter.py` mit Platte 80 × 50 × 8 mm, Steg und zwei
Bohrungen, ohne Außenverrundung (Open Question 4), ist eine Kette aus vier Elementen in der Form aus ADR-028:
`platte` (Quader), `steg` (an die Hinterkante gesetzt, vereinigt und bereinigt), `bohrung` (eigenes Element,
Boolesche Differenz mit zwei Zylindern) und `halter` (Teil). Parameter sind Größen mit Einheit (`"80 mm"`).
Parametersätze P0 bis P3 wie in design.md (Dicke 8/10 mm, Länge 80/90 mm).

**Regel als Element.** Eine Regel hat `type` `auswahl.regel`, einen Eingang `quelle` als `<id>.<output>` und in
`params` nur die Beschreibung:

```json
{"id": "r3-kanten-parallel-z", "type": "auswahl.regel", "inputs": {"quelle": "halter.koerper"},
 "params": {"art": "kante", "bedingungen": [{"richtung": {"achse": "+Z", "bezug": "parallel"}}], "anzahl": "alle"},
 "outputs": {"auswahl": "auswahl"}, "content": [], "meta": {"name": "Alle Kanten parallel zur Z-Achse"}}
```

| Regel | Datenform in `params` | Quelle |
| --- | --- | --- |
| R1 Art | `art: flaeche`, Bedingung `geometrie: zylinder` | `halter.koerper` |
| R2 Lage | `art: kante`, Bedingung `lage: {achse: +Z, bezug: aeusserste}` (alle Ecken und die Kantenmitte in der äußersten Ebene, Toleranz `TOL_LINEAR`) | `halter.koerper` |
| R3 Richtung | `art: kante`, Bedingung `richtung: {achse: +Z, bezug: parallel}` (Winkel ≤ `TOL_ANGULAR`) | `halter.koerper` |
| R4 Gruppe | `art: flaeche`, `gruppe: {achse: +Z, wahl: erste}` (Schwerpunkte nach Z sortiert, Gruppen mit Abstand > `TOL_LINEAR` getrennt) | `halter.koerper` |
| R5 neu entstanden | `art: flaeche`, Bedingung `herkunft: erzeugt` | `bohrung.koerper` |
| K2 (Testkorpus) | `geometrie: ebene`, `normale: {achse: +Y}`, `sortieren: {nach: flaecheninhalt, ordnung: absteigend}`, `anzahl: 1` | `halter.koerper` |

Die Regel speichert weder Indizes noch Koordinaten noch die getroffene Geometrie; sie wird bei jeder
Neuberechnung gegen die frische Geometrie ausgewertet. Achsen stehen als Namen (`+Z`) statt als Zahlentripel im
Element. Ausgegeben werden die Ziele nur als Beschreibung (Art, Geometrietyp, Schwerpunkt, Richtung bzw.
Normale) für den Vergleich mit den Sollzielen.

**„Neu entstanden“ über die Topologie-Historie.** Das Element `bohrung` ruft `BRepAlgoAPI_Cut` direkt auf und
bereinigt mit `ShapeUpgrade_UnifySameDomain`. Für jede Fläche der Werkzeuge (Bohrzylinder) und des Grundkörpers
werden ihre Bilder über `Modified`/`IsDeleted` der Booleschen Operation und `History().Modified`/`IsRemoved` der
Bereinigung verfolgt. „Erzeugt“ sind Flächen des Ergebnisses, die aus Werkzeugflächen hervorgehen und nicht aus
Flächen des Grundkörpers – das sind die beiden Bohrwände; Ober- und Unterseite der Platte sind nur verändert.

**Nahtkanten.** Zylinderflächen haben eine Nahtkante, die nur zur Parametrisierung gehört. Kanten zählen für
Regeln nur, wenn sie zwei verschiedene Flächen trennen (`TopExp.MapShapesAndAncestors`). Ohne diese Regel trifft
R3 zusätzlich die Nähte der Bohrungen.

**Reihenfolge des Kernels.** `--shuffle <seed>` mischt jede Liste von Flächen, Kanten und Ecken, die der
Prototyp vom Kernel holt, mit einem festen Seed. Die Auswertung sortiert nur nach Werten (Gruppe, Sortieren),
nie nach Position in einer Liste.

**Befunde und Zustände (ADR-050).** Findet eine Regel nichts, entsteht `kein_ziel`; verlangt sie genau ein Ziel
und findet mehrere gleichrangige (Wert innerhalb `TOL_LINEAR`), entsteht `mehrdeutig` mit allen Kandidaten und
ohne Wahl. Die Regel ist dann `fehlerhaft`, Elemente mit einem nicht aktuellen Eingang werden `pausiert`,
unabhängige Elemente rechnen weiter. Ausnahmen eines Elements werden als Befund `kernel_fehler` gemeldet.

- K1: Bohrung verworfen (`meta.verworfen`, Verwerfen ist ein Zustand, kein Löschen); der Körper geht unverändert
  durch, R5 bleibt gespeichert.
- K2: Steghöhe = Dicke = 8 mm; die Vorderseiten von Steg und Platte sind beide 80 × 8 mm.
- K3: wie K1, dazu ein Folgeelement (Fläche der von R5 gewählten Bohrwände) und ein unabhängiges Element
  (Volumen des Halters).

**10.000 Elemente.** `spikes/auswahl/graph/` (Rust) baut `synth::project(10_000)` aus dem Datenmodell-Spike in den
Automerge-`Store` und wertet die Graph-Regel `g1-waende-lang` aus (Typ `wall`, Parameter `length` ≥ 3000,
Eingang `material` gleich `e000005.material`; dieselbe Elementform). Gemessen in drei Varianten, je 5
Aufwärmläufe und 100 Läufe: ein Durchlauf direkt über die Element-Map des Dokuments (Kennzahl), über die
Store-Schnittstelle mit Suche je Feld, und auf einer Lesesicht (`Store::to_project`). Alle drei liefern dieselben
100 Treffer.

**Umgebung.** Linux-Runner der Nachtschicht, Python 3.12, build123d 0.13.0, OCP 8.0.1 (cadquery-ocp-novtk),
Rust 1.97 (Release-Build), Automerge 0.12.

## Messwerte

| Kennzahl | Wert | Bedingung für Go |
| --- | --- | --- |
| `treffer_quote` (20 Fälle R1–R5 × P0–P3) | 1,0 (20 von 20) | = 1,0 |
| `permutation_stabil` (20 Fälle × Seeds 1–10) | Ja (200 von 200) | Ja |
| K1 kein Ziel | Befund `kein_ziel` an `r5-neu-bohrung`, 0 Ziele | wie erwartet |
| K2 mehrdeutig | Befund `mehrdeutig` an `k2-groesste-flaeche-plus-y`, 2 Kandidaten wie im Testkorpus, 0 Ziele | wie erwartet |
| K3 Folgeelement | Regel `fehlerhaft`, Folgeelement `pausiert`, unabhängiges Element `aktuell` | wie erwartet |
| `abstuerze` | 0 | 0 |
| `graph_auswahl_p95_ms` (direkt auf dem Automerge-Dokument) | 78,0 ms (p50 73,7) | < 100 |
| `halter_auswahl_p95_ms` (R1–R5 am berechneten Halter) | 4,1 ms | – |
| `halter_neuberechnung_p95_ms` (Halter P0, vier Elemente) | 9,3 ms | – |
| Einordnung | 21 von 21 (A 13, B 6, C 2) | 21 |

Zusätzliche Graph-Messwerte (`graph` in `auswahl.json`):

| Variante | p50 | p95 |
| --- | --- | --- |
| Ein Durchlauf über die Element-Map des Dokuments (Kennzahl) | 73,7 ms | 78,0 ms |
| Store-Schnittstelle, Suche des Elements je Feld | 115,9 ms | 117,2 ms |
| Lesesicht (`Store::to_project`), nur Auswertung | 0,9 ms | 1,5 ms |
| Aufbau der Lesesicht aus dem Dokument (einmalig je Stand) | 494 ms | 505 ms |

Beobachtungen:

- Direkt auf dem Automerge-Dokument liegt die Auswahl mit rund 75 ms im Budget, aber nur mit einem Durchlauf über
  die Element-Map; der naheliegende Weg über die Store-Schnittstelle (`kind`, `field` je Element) überschreitet
  es mit 115 ms. Auf einer Lesesicht im Speicher ist dieselbe Regel rund 80-mal schneller (unter 2 ms); die
  Lesesicht vollständig neu aufzubauen kostet aber eine halbe Sekunde und muss deshalb inkrementell aus den
  Änderungen gepflegt werden. Die Lesesicht-Zeiten schwanken zwischen Läufen um bis zu Faktor 2, die Zeit direkt
  auf dem Dokument nur um wenige Prozent; deshalb ist sie die Kennzahl.
- Toleranzen: Alle Lage-, Richtungs- und Gruppenentscheidungen fallen am Halter weit weg von der Toleranz
  (kleinster Abstand zwischen Gruppen nach Z an P0: 4 mm; achsparallele Kanten mit Winkel 0). Der Gleichstand in K2
  ist exakt (640 mm² gegen 640 mm²). Nahe an der Toleranz liegende Fälle hat der Halter nicht.
- Nahtkanten sind eine echte Falle: Ohne den Filter „trennt zwei verschiedene Flächen“ trifft R3 acht statt
  sechs Kanten.
- R1 und R5 treffen am Halter dieselben zwei Flächen, aus verschiedenen Gründen: R1 nach Geometrietyp, R5 über
  die Historie. In K1 trifft R1 weiterhin nichts Falsches, R5 meldet `kein_ziel`.
- Grenzen: „Neu entstanden“ trägt nur so weit, wie jedes Element die Historie seiner Operation selbst führt
  (hier Boolesche Differenz plus Bereinigung). Die Vereinigung des Stegs führt im Prototyp keine Historie, weil
  keine Regel sie braucht. Der Halter ist klein (10 Flächen, 24 Kanten); die Zeit für Teile mit Tausenden Flächen ist nicht
  gemessen (Open Question 3). Die gemischte Reihenfolge ist simuliert (Mischen der Listen, die der Kernel liefert),
  nicht eine andere Kernel-Version.

### Einordnung der 21 Auswahlbefehle

A = als Regel in derselben Datenform, B = Liste stabiler Adressen ohne Regel, C = gehört nicht in die Datenform.

| Befehl | Klasse | Begründung |
| --- | --- | --- |
| Klicken | B | Eine Geste im Modell, deren Ergebnis die stabile Adresse des getroffenen Elements bzw. seiner Fläche oder Kante ist; es gibt keine Regel, die man neu auswerten könnte. |
| Rahmen | B | Der Rahmen hängt an Kamera und Bildschirmausschnitt, die nicht im Graphen stehen; gespeichert wird nur die Liste der getroffenen stabilen Adressen. |
| Lasso | B | Wie der Rahmen eine Geste in Bildschirmkoordinaten; das Ergebnis ist eine Liste stabiler Adressen ohne Regel. |
| Unter dem Zeiger wählen (Überlappung) | B | Der Mensch wählt aus den überlappenden Kandidaten unter dem Zeiger einen aus; übrig bleibt eine stabile Adresse. |
| Alles | A | Eine Regel mit Art und Ausgangselement und ohne Bedingungen; sie trifft nach jeder Neuberechnung wieder alles dieser Art. |
| Nichts | C | Leert nur die aktuelle Auswahl der Sitzung; eine gespeicherte leere Auswahl hätte keine Bedeutung im Graphen. |
| Umkehren | A | Eine Regel „alle dieser Art außer der Auswahl am Eingang“, also Alles mit einer Bedingung nicht-enthalten, die auf eine andere Auswahl über `<id>.<output>` verweist. |
| Ähnliche | A | Beim Anlegen werden die Merkmale der Vorlage (Art, Geometrietyp, Radius oder Flächeninhalt) als Bedingungen mit Werten und Toleranz in die Regel geschrieben, nicht die Vorlage selbst. |
| Kantenschleife | A | Eine Regel „Kanten der Berandung der Fläche aus der Auswahl am Eingang“, die über die Nachbarschaft der Topologie bei jeder Neuberechnung neu gebildet wird (im Prototyp nicht gebaut). |
| Auswahlfilter nach Art (Punkt, Kante, Fläche, Körper, Teil) | A | Feld `art` und Bedingung `geometrie` der Regel; im Prototyp als R1 (alle zylindrischen Flächen) gebaut. |
| nach Lage | A | Bedingung `lage` mit Achse und Bezug (äußerste Ebene); im Prototyp als R2 (alle Kanten oben) gebaut. |
| nach Richtung | A | Bedingung `richtung` bzw. `normale` mit Achse und Winkeltoleranz; im Prototyp als R3 (Kanten parallel zu Z) gebaut. |
| nach Wert | A | Bedingung `wert` mit Parameter, Vergleich und Grenze; im Prototyp als Graph-Regel über 10.000 Elemente gebaut (length ≥ 3000). |
| Sortieren (höchste, nächste) | A | Felder `sortieren` und `anzahl` der Regel; gleichrangige Ziele ergeben den Befund mehrdeutig statt einer Wahl (Fall K2). |
| Gruppe | A | Feld `gruppe` mit Achse und Wahl (erste, letzte) nach Toleranz; im Prototyp als R4 (Montagefläche) gebaut. |
| neu entstanden | A | Bedingung `herkunft: erzeugt` auf dem Ausgang eines Elements, ausgewertet über die Topologie-Historie der Operation; im Prototyp als R5 (Flächen der Bohrung) gebaut. |
| nach Eigenschaft (z. B. gleiches Material) | A | Bedingung `eingang` bzw. Eigenschaft mit Verweis `<id>.<output>`, etwa auf ein Material; im Prototyp Teil der Graph-Regel (Material e000005). |
| Verbundene | A | Eine Regel „mit der Auswahl am Eingang über Kanten oder Verbindungen verbunden“, die über Nachbarschaft in Topologie bzw. Graph neu ausgewertet wird (im Prototyp nicht gebaut). |
| Benannte Auswahl | B | Ein Auswahl-Element mit Namen in `meta`, das das Ergebnis einer Geste als Liste stabiler Adressen festhält; ist der Inhalt eine Regel, ist es einfach die Regel selbst. |
| Auswahl-Verlauf (zurück, vor) | C | Verlauf der Sitzung in der Oberfläche; er gehört nicht in den Graphen, weil dort keine Anwesenheit und kein Bedienverlauf gespeichert werden. |
| Mehrdeutige Auswahl klären | B | Antwort des Menschen auf den Befund mehrdeutig: Die gewählten Kandidaten werden als Liste stabiler Adressen an der Regel festgehalten, der Prototyp rät nie selbst. |

Klasse B setzt stabile Unter-IDs von Flächen und Kanten voraus; die liefert erst ap-39. Bis dahin trägt nur
Klasse A über Neuberechnungen hinweg.

## Empfehlung

Go – Auswahl nach Regel als Element im Graphen trägt: 20 von 20 Fällen treffen nach Parameteränderung die
Sollziele, 200 von 200 gemischten Läufen sind gleich, kein Ziel und Mehrdeutigkeit enden als Befund statt als
Absturz oder Wahl, und die Graph-Regel über 10.000 Elemente braucht p95 78 ms (< 100 ms).

Folgen:

- **ap-45 (Verrundung, Fase, Schale, Muster):** Formelemente nehmen eine Auswahl als Eingang `<regel>.auswahl`.
  Jede Operation, auf die sich „neu entstanden“ beziehen soll, muss ihre Topologie-Historie einschließlich der
  Bereinigung führen. Kanten zählen nur, wenn sie zwei verschiedene Flächen trennen (keine Nahtkanten).
- **ap-08b (Oberfläche der Auswahl):** Gesten (Klicken, Rahmen, Lasso, Überlappung) ergeben Listen stabiler
  Adressen (Klasse B); Filter, Ähnliche, Kantenschleife und Umkehren erzeugen Regeln (Klasse A); Nichts und der
  Auswahl-Verlauf bleiben Sitzungszustand (Klasse C). Der Befund mehrdeutig braucht einen Dialog „Mehrdeutige
  Auswahl klären“.
- **ap-39 (persistente Identität):** Der Spike muss nicht auf ap-39 warten, weil Regeln ohne Unter-IDs auskommen;
  für Klasse B und für „neu entstanden“ über mehrere Operationen hinweg braucht es ap-39.
- **Kern (ADR-029):** Die Graph-Auswahl gehört in den Rust-Kern und läuft entweder in einem Durchlauf über das
  Dokument (rund 75 ms bei 10.000 Elementen, wenig Reserve) oder besser auf einer inkrementell gepflegten
  Lesesicht (unter 2 ms). Die Suche je Feld über die heutige Store-Schnittstelle reicht nicht (115 ms).
- **ADR-016 und ADR-065 Punkt 13** werden bestätigt; ADR-065 Punkt 13 steht noch nicht auf `main`.
