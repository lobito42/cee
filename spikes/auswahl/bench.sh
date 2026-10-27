#!/usr/bin/env bash
# Auswahl-Spike (ap-49): alle Messungen, Kennzahlen als JSON auf stdout (Format docs/spikes/auswahl.json).
#   bash spikes/auswahl/bench.sh --json [--out <datei>]
# Voraussetzung: uv sync --extra cad, cargo (Graph-Regel über synth::project(10_000)).
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
cargo build --release -q --manifest-path "$DIR/graph/Cargo.toml" >&2
exec uv run --quiet --project "$ROOT" --extra cad python "$DIR/bench.py" "$@"
