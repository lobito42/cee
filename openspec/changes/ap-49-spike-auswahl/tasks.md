## 1. Referenzteil und Regeln

- [x] 1.1 `spikes/auswahl/` mit `run.sh`: Halter nach design.md (P0 bis P3, Bohrung als eigenes Element) und
  Ausgabe der Ziele als JSON – Prüfung: `bash spikes/auswahl/run.sh R1-P0`
- [x] 1.2 Regel-Element in der Form aus ADR-028 und Auswertung von R1 bis R5 ohne Indizes, Option `--element` –
  Prüfung: AK-1, AK-2
- [x] 1.3 Option `--shuffle <seed>` (gemischte Reihenfolge von Flächen und Kanten) – Prüfung: AK-3

## 2. Befunde

- [x] 2.1 Befunde `kein_ziel` und `mehrdeutig` mit Element-ID und Kandidaten, Fälle K1 und K2 – Prüfung: AK-4, AK-5
- [x] 2.2 Zustände `aktuell`, `fehlerhaft`, `pausiert` für Folgeelement und unabhängiges Element, Fall K3 –
  Prüfung: AK-6

## 3. Messung und Bericht

- [ ] 3.1 `bench.sh --json`: Graph-Regel über `synth::project(10_000)` und Zeiten am Halter – Prüfung: AK-7
- [ ] 3.2 Einordnung der 21 Auswahlbefehle (A, B, C mit Begründung), `docs/spikes/auswahl.json` und Bericht
  `docs/spikes/auswahl.md` mit Empfehlung; Zeile in `docs/spikes/README.md` – Prüfung: AK-8, AK-9; gesamt
  `uv run pytest -q tests/acceptance/ap-49-spike-auswahl`

## Workflow follow-up

- Menschliche Abnahme: Einordnung der Befehle und Empfehlung nach den Scenarios [mensch] (Kernteam)
- ADR-Workshop: ADR-016 und ADR-065 Punkt 13 bestätigen oder überarbeiten (Kernteam)
- Change archivieren mit `--skip-specs`
