#!/usr/bin/env bash
# Baut die statische Seite des Prototyps für die Browser-Vorschau je PR (.github/workflows/vorschau.yml).
# Aufruf: bash spikes/ux-prototyp-2/vorschau.sh <Zielverzeichnis>; index.html liegt danach im Wurzelverzeichnis.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
ziel="${1:?Zielverzeichnis fehlt}"
npm --prefix "$here" ci --legacy-peer-deps --no-audit --no-fund
npm --prefix "$here" run tokens
npm --prefix "$here" run build
mkdir -p "$ziel"
cp -r "$here/dist/." "$ziel/"
