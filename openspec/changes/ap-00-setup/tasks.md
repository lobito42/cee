## 1. Setup

- [ ] 1.1 uv-Workspace, ruff, pytest lauffähig – Prüfung: `uv run pytest` grün, `uv run ruff check .` sauber
- [ ] 1.2 Beispielteil baut gültig und in < 3 s – Prüfung: `tests/acceptance/ap-00-setup/test_example_part.py`
- [ ] 1.3 Lizenz-Scan ohne GPL/AGPL – Prüfung: `tests/acceptance/ap-00-setup/test_licenses.py`
- [ ] 1.4 Pipeline-Durchlauf an einem Mini-Change dokumentiert – Prüfung: Link auf gemergten PR in `docs/spikes/README.md`

## 2. Spikes

- [ ] 2.1 S1 Identität – Prüfung: `docs/spikes/S1-identitaet.md` vollständig, Erhaltungsquote genannt (AK-4, AK-5)
- [ ] 2.2 S2 Rebuild – Prüfung: `docs/spikes/S2-rebuild.md` vollständig (AK-4)
- [ ] 2.3 S3 Interaktion – Prüfung: `docs/spikes/S3-interaktion.md` vollständig (AK-4)
- [ ] 2.4 S4 Blech – Prüfung: `docs/spikes/S4-blech.md` vollständig (AK-4)
- [ ] 2.5 S5 Rendering – Prüfung: `docs/spikes/S5-rendering.md` vollständig (AK-4)

## 3. Integration

- [ ] 3.1 Alle Abnahmetests grün – Prüfung: `uv run pytest tests/acceptance/ap-00-setup`

## Workflow follow-up

- ADR-Workshop: Spike-Ergebnisse besprechen, ADR-Status auf „akzeptiert“ setzen (Kernteam)
- Change archivieren mit `/opsx:archive ap-00-setup` (Kernteam), Gate G1 abnehmen
