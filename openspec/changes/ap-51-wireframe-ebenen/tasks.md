## 1. Worker und Protokoll (Nacht 1)

- [ ] 1.1 Herkunftstabelle in `cee_worker/kernel/typen.py` (Eingänge, Parameter, Rechenfunktion je Herkunft),
  Regel für fehlende Herkunft, Parameter `t`, `u`, `v` an `point` in `format/types/drahtmodell.json`; Befund-Codes,
  Warnung `input_unused` und Feld `messungen` in `format/kernel/` (README, Schemas) – Prüfung: AK-4
- [ ] 1.2 Ebene `drei_punkte`, `punkt_normale`; Punkt `auf`, `mitte` mit OCP und Rücklesen der Werte, Befunde
  `degenerate` und `out_of_range` – Prüfung: AK-1, AK-2
- [ ] 1.3 Punkt `schnitt`, `projektion` und Messungen (`GeomAPI_ExtremaCurveCurve`, `BRepExtrema_DistShapeShape`,
  Projektionen), Befunde `parallel` und `no_intersection` – Prüfung: AK-3;
  `uv run ruff check worker && uv run pytest -q tests/acceptance/ap-51-wireframe-ebenen -k "not vorschau"` und
  `uv run pytest -q tests/acceptance/ap-50-wireframe-basics -k "not vorschau"` weiter grün

## 2. Vorschau im Prototyp (Nacht 2, Reserve Nacht 3)

- [ ] 2.1 Feld `argumente` im Register und Ausführen per `{befehl, args}` ohne Klick; sieben Befehle in
  `src/befehle.json` ohne `folgt`, `herkunft` ausdrücklich auch in `referenz.punkt` und `referenz.punkt-relativ`,
  Übersetzungen de/en, Kontextaktionen – Prüfung: AK-5 (Register)
- [ ] 2.2 Klick-Wege (Bezüge nachfordern, Punkt aus Klickstelle, Esc), Herkunft und passende Felder in den
  Eigenschaften, Abstand in Rückmeldezeile und vorübergehende Markierung – Prüfung: AK-5;
  `uv run pytest -q tests/acceptance/ap-51-wireframe-ebenen tests/acceptance/ap-50-wireframe-basics`
- [ ] 2.3 Klick-Anleitung aus design.md Abschnitt 6 in den PR übernehmen – Prüfung: PR-Text enthält die Schritte 1
  bis 9

## Workflow follow-up

- [ ] [mensch] Ausprobieren nach der Klick-Anleitung (Scenario „Ausprobieren“), Antwort Go, No-Go oder
  Änderungswunsch im PR (Kernteam)
- Kernteam: Open Questions 1 bis 3 in design.md beantworten; Eintrag in `openspec/queue.yaml` mit
  `depends_on: [ap-50-wireframe-basics]`
- Archivieren (nach ap-50): Requirement „Punkt und Ebene mit Herkunft“ in `drahtmodell` einarbeiten (ersetzt dort
  „Punkt“), übrige Requirements als `drahtmodell-ebenen` nach `openspec/specs/`; `drahtmodell-ebenen-vorschau`
  nach Entscheidung des Kernteams (Vorschlag: nicht übernehmen)
