## Why

Der Abgleich des Befehlsinventars mit build123d, Onshape, FreeCAD und Blender hat gezeigt, dass das Inventar
keinen einzigen Auswahlbefehl kennt, obwohl Verrunden, Fasen, Schale und Muster von der Auswahl abhängen.
ADR-065 Punkt 13 macht Auswahl deshalb zu einer eigenen Befehlsfamilie: Klicken und Ziehen im Modell, dazu Alles,
Umkehren, Ähnliche, Kantenschleife, Auswahlfilter und die Auswahl nach Regel („alle Kanten oben“). Regeln sind
Daten im Graphen und gelten über stabile Adressen (ADR-016, ADR-058). Offen ist, ob der Kern das trägt: Eine
Regel muss nach einer Parameteränderung dieselben Kanten und Flächen treffen, ohne Topologie-Indizes, sie muss
einen Befund liefern statt abzustürzen, wenn sie kein oder kein eindeutiges Ziel mehr findet (ADR-050), und
sie muss schnell genug sein. Der Spike klärt das mit höchstens zwei Arbeitstagen Umsetzung, bevor ap-45
(Verrundung, Fase, Schale, Muster) und die Oberfläche der Auswahl darauf bauen.

## What Changes

- Prototyp `spikes/auswahl/` (kein Produktcode): Auswahl nach Regel als Datenobjekt in der Elementform aus
  ADR-028, ausgewertet mit build123d an einem Referenzteil (Halter) und an einem Projekt mit 10.000 Elementen
- Messungen zu vier Fragen:
  1. Trifft eine gespeicherte Regel (Art, Lage, Richtung, Gruppe, „neu entstanden“) nach Neuberechnung mit
     geänderten Parametern dieselben Kanten und Flächen, ohne Indizes?
  2. Was geschieht, wenn eine Regel nach einer Änderung kein Ziel mehr findet oder mehrdeutig wird?
  3. Wie lange dauert die Auswahl bei 10.000 Elementen?
  4. Welche Auswahlbefehle aus dem Inventar lassen sich auf dieselbe Datenform abbilden?
- Bericht `docs/spikes/auswahl.md` und Messwerte `docs/spikes/auswahl.json` mit Empfehlung Go oder No-Go; der
  Bericht steht zusätzlich im PR

## Capabilities

### New Capabilities

- `spike-auswahl`: Nachweis, ob Auswahl nach Regel als Datenobjekt im Graphen über Neuberechnung hinweg stabil,
  robust und schnell genug ist (Spike, Prototyp-Verhalten; wird ohne Übernahme in `openspec/specs/` archiviert,
  `--skip-specs`)

### Modified Capabilities

Keine.

## Impact

- Betroffene ADRs (bestätigen oder überarbeiten): ADR-065 Punkt 13 (Auswahl als Befehlsfamilie, Regeln als
  Daten), ADR-016 (persistente Identität, keine Indizes, bei Mehrdeutigkeit fragen), ADR-058 (Adressen auf
  ID-Basis), ADR-028 (Elementform), ADR-032 (Geometrie nur abgeleiteter Cache), ADR-050 (robuste Neuberechnung,
  Befund statt Abbruch), ADR-002 (build123d mit Selektoren), ADR-046 (Kern fachneutral), ADR-059 (Spike in M0).
  Kein Widerspruch zu einem ADR bekannt. Hinweis: ADR-065 Punkt 13 steht bislang nur auf dem Branch
  `adr/bohrung-auswahl-platzierung` und ist noch nicht auf `main`.
- Abhängigkeiten: ap-01-spike-datenmodell (fertig; Elementform und Generator `synth::project(n)` für 10.000
  Elemente). ap-39-spike-identitaet (in `docs/konzept.md`, M0) behandelt die persistente Identität von Flächen
  und Kanten über die Topologie-Historie; die Regel „neu entstanden“ berührt dasselbe Thema. Ob ap-42 auf ap-39
  warten muss, ist offen (design.md, Open Questions).
- Abnahmetests: `tests/acceptance/ap-49-spike-auswahl/` (AK-1 bis AK-9, Zuordnung in design.md)
- Gate G1 (M0 Klären, ADR-059)
- Referenzdaten: Das Kernteam liefert unter `tests/golden/ap-49-spike-auswahl/` die Sollziele je Regel und
  Parametersatz sowie die Fälle „kein Ziel“ und „mehrdeutig“, bevor Abnahmetests geschrieben werden (Format in
  design.md).
- Neue Abhängigkeiten: keine; build123d und OCP sind über `uv sync --extra cad` vorhanden (ADR-034).
- Nicht-Ziele:
  - keine Oberfläche: kein Klicken, Rahmen, Lasso, Überfahren und keine Auswahlkontur im Client (ap-08b, M1);
    diese Befehle werden im Bericht nur eingeordnet
  - keine allgemeine persistente Identität über Topologie-Historie und Geometrie-Signatur (ap-39)
  - keine Verrundung, Fase, Schale oder Muster als Formelemente (ap-45, M1)
  - kein Kernel-Protokoll unter `format/kernel/` und kein Worker-Dienst (ap-06, M1)
  - keine geteilte oder live sichtbare Auswahl anderer Personen (ap-07b, M2), keine Auswahl als KI-Kontext
    (ap-15, M3)
  - keine Schemaänderung und kein produktiver Code in `crates/`, `worker/`, `server/` oder `client/`;
    Prototyp-Code wird nicht übernommen
