## Why

Bevor Agenten Produktfunktionen bauen, müssen das Repository lauffähig, die Agenten-Pipeline erprobt und die
fünf größten technischen Unsicherheiten (Identität, Rebuild-Zeit, Interaktion, Blech, Rendering) per Spike
geklärt sein. Sonst bauen viele Agenten parallel auf ungeprüften Annahmen.

## What Changes

- Python-Workspace (uv, ruff, pytest), Extension-Gerüst, CI auf Linux/macOS/Windows, Lizenz-Scan
- Ein Beispielteil `parts/examples/halter.py` nach Code-Konvention
- Ein vollständiger Durchlauf eines Mini-Changes durch die Pipeline (spec → tests → change → Review → Merge)
- Fünf Spike-Berichte unter `docs/spikes/` mit Go/No-Go-Empfehlung, Prototyp-Code unter `spikes/`

## Capabilities

### New Capabilities

Keine. Tooling und Spikes ändern kein Produktverhalten (`skip_specs: true`).

### Modified Capabilities

Keine.

## Impact

- Neue Dateien unter `pyproject.toml`, `packages/extension/`, `parts/`, `docs/spikes/`, `spikes/`
- Betroffene ADRs (bestätigen oder überarbeiten): ADR-001, 002, 010, 011, 013, 016, 023, 025, 026
- Abnahmetests: `tests/acceptance/ap-00-setup/` (AK-1 bis AK-6)
- Gate G1
