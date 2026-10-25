## 1. Worker und Protokoll (Nacht 1)

- [ ] 1.1 Sechs Typen in `format/types/drahtmodell.json` und Typtabelle `cee_worker/kernel/typen.py`; Befund-Codes
  und Feld `messungen` in `format/kernel/` (README, Schemas) – Prüfung: AK-4
- [ ] 1.2 `plane_3p`, `plane_pn`, `point_on_curve`, `point_on_plane` mit OCP und Rücklesen der Werte, Befunde
  `degenerate` und `out_of_range` – Prüfung: AK-1, AK-2
- [ ] 1.3 `intersection`, `perpendicular` und Messungen (`GeomAPI_ExtremaCurveCurve`, `BRepExtrema_DistShapeShape`,
  Projektionen), Befunde `parallel` und `no_intersection` – Prüfung: AK-3;
  `uv run ruff check worker && uv run pytest -q tests/acceptance/ap-51-wireframe-ebenen -k "not vorschau"`

## 2. Vorschau im Prototyp (Nacht 2, Reserve Nacht 3)

- [ ] 2.1 Feld `argumente` im Register und Ausführen per `{befehl, args}` ohne Klick; sechs Befehle in
  `src/befehle.json` ohne `folgt`, Übersetzungen de/en, Kontextaktionen – Prüfung: AK-5 (Register)
- [ ] 2.2 Klick-Wege (Bezüge nachfordern, Punkt aus Klickstelle, Esc), Darstellung der neuen Elemente wie ap-50,
  Abstand in Rückmeldezeile und vorübergehende Markierung – Prüfung: AK-5;
  `uv run pytest -q tests/acceptance/ap-51-wireframe-ebenen tests/acceptance/ap-50-wireframe-basics`
- [ ] 2.3 Klick-Anleitung aus design.md Abschnitt 6 in den PR übernehmen – Prüfung: PR-Text enthält die Schritte 1
  bis 8

## Workflow follow-up

- [ ] [mensch] Ausprobieren nach der Klick-Anleitung (Scenario „Ausprobieren“), Antwort Go, No-Go oder
  Änderungswunsch im PR (Kernteam)
- Kernteam: Open Questions 1 und 2 in design.md beantworten; Eintrag in `openspec/queue.yaml` mit
  `depends_on: [ap-50-wireframe-basics]`
- Archivieren: `drahtmodell-ebenen` nach `openspec/specs/`; `drahtmodell-ebenen-vorschau` nach Entscheidung des
  Kernteams (Vorschlag: nicht übernehmen)
