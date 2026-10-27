#!/usr/bin/env bash
# Auswahl-Spike (ap-49): einen Fall auswerten, JSON auf stdout.
#   bash spikes/auswahl/run.sh <fall> [--shuffle <seed>] [--element]
# Fälle: R1-P0 … R5-P3, K1, K2, K3 (design.md). Voraussetzung: uv sync --extra cad
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
exec uv run --quiet --project "$ROOT" --extra cad python "$DIR/auswahl.py" "$@"
