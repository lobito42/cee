## Context

Siehe proposal.md – Why. ADR-065 Punkt 13: „Regeln sind Daten im Graphen und gelten über stabile Adressen
(ADR-016, ADR-058). Der Spike ap-42-spike-auswahl klärt, wie das im Kern trägt.“ build123d bietet Auswahl nach Art
(`vertices()`, `edges()`, `faces()`, `solids()`), nach Richtung, Typ und Eigenschaft (`filter_by`), nach Lage
(`filter_by_position`), nach Wert (`filter_by_value`), Sortieren (`sort_by`, `sort_by_distance`), Gruppieren
(`group_by`) und „neu entstanden“ (`Select.NEW`, `Select.LAST`). Diese Selektoren sind Code; der Spike prüft, ob
sich dieselben Regeln als Daten im Graphen speichern lassen.

ADR-016 verlangt drei Stufen der Identität (Feature-IDs, Unter-IDs aus der Topologie-Historie, Geometrie-Signatur)
und bei Mehrdeutigkeit eine Rückfrage. `docs/rules/geometrie.md` verbietet Listenindizes (`faces()[3]`) und legt
`TOL_LINEAR = 1e-6` mm und `TOL_ANGULAR = 1e-9` rad fest. ADR-050 verlangt einen Befund statt eines Abbruchs.
`docs/design/leitbild.md` nennt als Budget „Auswahl < 100 ms (ap-08b)“.

## Goals / Non-Goals

**Goals:** nachmessbare Antworten auf die vier Fragen aus proposal.md und eine Empfehlung Go oder No-Go für die
Datenform der Auswahl, auf der ap-45 und die Oberfläche (ap-08b) aufbauen.

**Non-Goals:** siehe proposal.md – Impact. Der Spike schreibt keine Lösung für die Datenform vor; er belegt eine.

## Decisions

### Referenzteil Halter

Grundlage ist `parts/examples/halter.py` mit geänderten Standardwerten: Platte 80 × 50 × 8 mm (`breite` = 80,
`tiefe` = 50, `dicke` = 8), Steg und zwei Bohrungen; übrige Parameter wie in der Datei. Die Bohrung ist ein
eigenes Element, damit „neu entstanden“ auf ihren Ausgang verweisen kann. Parametersätze:

| Satz | Dicke | Länge (`breite`) |
| --- | --- | --- |
| P0 | 8 mm | 80 mm |
| P1 | 10 mm | 80 mm |
| P2 | 8 mm | 90 mm |
| P3 | 10 mm | 90 mm |

### Regeln für Frage 1

Jede Regel wird einmal an P0 angelegt und gespeichert; danach wird für P1 bis P3 neu berechnet und die
gespeicherte Regel unverändert ausgewertet.

| Regel | Art der Regel | Inhalt |
| --- | --- | --- |
| R1 | Art | alle zylindrischen Flächen |
| R2 | Lage | alle Kanten oben (in der obersten Ebene des Teils) |
| R3 | Richtung | alle Kanten parallel zur Z-Achse |
| R4 | Gruppe | die Flächen der untersten Gruppe nach Z (Montagefläche, wie `publish` in `halter.py`) |
| R5 | neu entstanden | alle Flächen, die das Element Bohrung erzeugt hat |

Wie Art, Lage, Richtung, Gruppe und „neu entstanden“ als Daten ausgedrückt werden, entscheidet die Umsetzung. Fest
ist nur: Die Regel ist ein Element in der Form aus ADR-028 (`id`, `type`, `inputs`, `params`, `outputs`, `content`,
`meta`), verweist auf ihr Ausgangselement über `<id>.<output>` (ADR-058) und speichert weder Topologie-Indizes noch
die getroffene Geometrie (ADR-032).

### Fälle für Frage 2

| Fall | Auslöser | Erwartung |
| --- | --- | --- |
| K1 kein Ziel | Das Element Bohrung wird verworfen; R5 bleibt gespeichert | Befund `kein_ziel` an der Regel |
| K2 mehrdeutig | Eine Regel, die genau ein Ziel verlangt, findet nach einer Parameteränderung mindestens zwei gleichrangige Ziele | Befund `mehrdeutig` mit allen Kandidaten; keine Wahl |
| K3 Folgeelement | Ein Element, das die Auswahl aus K1 oder K2 nutzt, und ein davon unabhängiges Element werden berechnet | Folgeelement „fehlerhaft“ oder „pausiert“, unabhängiges Element „aktuell“ (ADR-050) |

Den konkreten Parametersatz für K2 legt das Kernteam im Testkorpus fest (Open Questions).

### Referenzdaten (vom Kernteam)

`tests/golden/ap-42-spike-auswahl/faelle.json` enthält je Regel R1 bis R5 und Parametersatz P0 bis P3 die
Sollziele sowie die Fälle K1 bis K3:

```json
{
  "regel": "R2",
  "satz": "P1",
  "ziele": [
    {"art": "kante", "geometrie": "linie", "schwerpunkt_mm": [0.0, 0.0, 0.0], "richtung": [1.0, 0.0, 0.0]}
  ]
}
```

Ein Ziel gilt als getroffen, wenn Art und Geometrietyp gleich sind, der Schwerpunkt höchstens 10⁻³ mm abweicht und
Richtung bzw. Normale höchstens 10⁻⁶ rad. Die Werte oben sind Platzhalter für das Format.

### Messung bei 10.000 Elementen

Projekt aus dem ap-01-Generator `synth::project(10_000)` (`spikes/datenmodell/`). Gemessen wird die Auswertung
einer Regel über Elemente des Graphen (z. B. nach Typ oder nach Parameterwert), 100 Wiederholungen nach 5
Aufwärmläufen. Budget: 95. Perzentil < 100 ms (Leitbild, ap-08b). Zusätzlich ohne Budget gemeldet: Zeit für die
Auswertung von R1 bis R5 am Halter (p95 über 100 Läufe, ohne Neuberechnung der Geometrie) und Zeit der
Neuberechnung des Halters.

### Auswahlbefehle für Frage 4

Liste aus ADR-065 Punkt 13 und dem Abgleich mit build123d, Onshape, FreeCAD und Blender (21 Befehle): Klicken,
Rahmen, Lasso, Unter dem Zeiger wählen (Überlappung), Alles, Nichts, Umkehren, Ähnliche, Kantenschleife,
Auswahlfilter nach Art (Punkt, Kante, Fläche, Körper, Teil), nach Lage, nach Richtung, nach Wert, Sortieren
(höchste, nächste), Gruppe, neu entstanden, nach Eigenschaft (z. B. gleiches Material), Verbundene, Benannte
Auswahl, Auswahl-Verlauf (zurück, vor), Mehrdeutige Auswahl klären.

Jeder Befehl bekommt genau eine Klasse:

- **A Regel:** als Regel in derselben Datenform abbildbar
- **B Liste:** erzeugt eine Liste stabiler Adressen ohne Regel (z. B. Geste im Modell)
- **C nicht abbildbar:** gehört nicht in die Datenform; Begründung in einem Satz

Der Prototyp baut nur die Regeln R1 bis R5 und die Graph-Regel für die Messung; alle anderen Befehle werden im
Bericht begründet eingeordnet.

### Befehle

Alle Befehle aus dem Wurzelverzeichnis.

- `uv sync --extra cad` – Abhängigkeiten
- `bash spikes/auswahl/run.sh <fall>` – wertet einen Fall (`R1-P0` … `R5-P3`, `K1` … `K3`) aus und schreibt das
  Ergebnis als JSON auf stdout (Ziele mit Art, Geometrietyp, Schwerpunkt, Richtung bzw. Normale; Befunde; Zustände)
- `bash spikes/auswahl/run.sh <fall> --shuffle <seed>` – wie oben, aber der Kernel liefert Flächen und Kanten in
  einer mit `<seed>` gemischten Reihenfolge
- `bash spikes/auswahl/run.sh <fall> --element` – gibt das gespeicherte Regel-Element als JSON aus
- `bash spikes/auswahl/bench.sh --json` – alle Messungen; schreibt die Kennzahlen als JSON auf stdout

### Kennzahlen in `docs/spikes/auswahl.json`

`treffer_quote` (Anteil der Fälle R×P mit allen Sollzielen und ohne zusätzliche Ziele), `faelle_gesamt` (20),
`permutation_stabil` (Ja/Nein), `befunde` (K1 bis K3 mit Code und Element-ID), `abstuerze` (Anzahl),
`graph_auswahl_p95_ms`, `halter_auswahl_p95_ms`, `halter_neuberechnung_p95_ms`, `einordnung` (21 Befehle mit
Klasse), `empfehlung` (`go` oder `no-go`).

### Empfehlung

Go, wenn `treffer_quote` = 1,0, `permutation_stabil` = Ja, K1 bis K3 wie erwartet, `abstuerze` = 0,
`graph_auswahl_p95_ms` < 100 und alle 21 Befehle eingeordnet sind. Sonst No-Go mit Begründung und Folgen für ap-39,
ap-45 und ap-08b.

### Zuordnung der Abnahmekriterien

| AK | Requirement | Scenario |
| --- | --- | --- |
| AK-1 | Regel als Element im Graphen | Elementform ohne Indizes und Geometrie |
| AK-2 | Gleiche Ziele nach Neuberechnung | Parameteränderungen P1 bis P3 |
| AK-3 | Gleiche Ziele nach Neuberechnung | Reihenfolge des Kernels |
| AK-4 | Befund statt Absturz | Kein Ziel |
| AK-5 | Befund statt Absturz | Mehrdeutig |
| AK-6 | Befund statt Absturz | Unabhängige Elemente rechnen weiter |
| AK-7 | Auswahl bei 10.000 Elementen | Budget |
| AK-8 | Einordnung der Auswahlbefehle | Alle Befehle eingeordnet |
| AK-9 | Bericht und Messwerte | Nachmessbar |

## Risks / Trade-offs

- „Neu entstanden“ braucht die Topologie-Historie der Operation; das überschneidet sich mit ap-39. Der Spike nutzt,
  was build123d innerhalb eines Aufbaus liefert, und meldet Grenzen im Bericht.
- Lage- und Gruppenregeln hängen an Toleranzen; Ergebnisse nahe der Toleranz werden im Bericht genannt.
- Der Halter ist klein; die Aussage zur Topologie-Größe bleibt begrenzt (Open Questions).

## Open Questions

1. **Nummer ap-42:** In `docs/konzept.md` heißt das Arbeitspaket ap-42 bereits `ap-42-spike-xr-eingabe` (Spike
   WebXR und 3D-Maus, ADR-060). ADR-065 Punkt 13 (Branch `adr/bohrung-auswahl-platzierung`) nennt
   `ap-42-spike-auswahl`. Soll der Auswahl-Spike eine andere Nummer bekommen, oder wird der XR-Spike umbenannt?
   Eine Zeile für den Auswahl-Spike fehlt in der Arbeitspaket-Tabelle.
2. **Reihenfolge zu ap-39:** Darf der Spike vor ap-39 laufen (Vorschlag: ja, mit den Mitteln von build123d), oder
   soll er auf dessen Ergebnis warten?
3. **„10.000 Elemente“:** Gemeint sind hier Elemente des Graphen (Auswahl von Teilen und Elementen). Braucht es
   zusätzlich ein Teil mit rund 10.000 Flächen und Kanten (z. B. Muster aus Bohrungen) mit eigenem Budget?
4. **Referenzteil:** `parts/examples/halter.py` hat 60 × 40 × 8 mm und eine Außenverrundung. Gilt der Halter mit
   80 × 50 × 8 mm ohne Verrundung, oder soll die Verrundung (selbst eine Regel: Kanten parallel zu Z) mitlaufen?
5. **Mehrdeutigkeit:** Welche Regel und welcher Parametersatz bilden K2? Vorschlag: eine Regel, die genau ein Ziel
   verlangt („die oberste Fläche“), und ein Parametersatz, in dem zwei Flächen gleich hoch liegen.
6. **Referenzdaten:** Liefert das Kernteam `faelle.json` mit den Sollzielen, oder darf der Testautor sie aus den
   Regelbeschreibungen oben mit build123d unabhängig berechnen und das Kernteam prüft sie?
7. **Prototyp der Oberflächen-Befehle:** Sollen Ähnliche und Kantenschleife (ADR-065 Punkt 13 nennt sie
   ausdrücklich) im Prototyp gebaut oder nur eingeordnet werden? Der Entwurf ordnet nur ein, um im Rahmen von
   zwei Arbeitstagen zu bleiben.
