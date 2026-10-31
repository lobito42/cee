#!/usr/bin/env bash
# Vorschau des Prototyps.
# - Ohne Argument (zum Ausprobieren, ap-50): startet die Vorschau mit Brücke zum Geometrie-Worker auf
#   http://127.0.0.1:5273 (Port änderbar mit CEE_PORT) – bash spikes/ux-prototyp-2/vorschau.sh, dann die angezeigte Adresse im Browser öffnen.
# - Mit Zielverzeichnis: baut die statische Seite für die Browser-Vorschau je PR (.github/workflows/vorschau.yml),
#   ohne Brücke; index.html liegt danach im Wurzelverzeichnis.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
if [ "$#" -eq 0 ]; then
  if [ ! -x "$repo/.venv/bin/python" ] && [ ! -x "$repo/.venv/Scripts/python.exe" ]; then
    (cd "$repo" && uv sync --extra cad)
  fi
  [ -d "$here/node_modules" ] || npm --prefix "$here" ci --legacy-peer-deps --no-audit --no-fund
  npm --prefix "$here" run tokens
  cd "$here"
  CEE_BRUECKE=1 exec npx vite --host 127.0.0.1 --port "${CEE_PORT:-5273}" --open "/?zustand=drahtmodell-leer"
fi
ziel="$1"
npm --prefix "$here" ci --legacy-peer-deps --no-audit --no-fund
npm --prefix "$here" run tokens
npm --prefix "$here" run build
mkdir -p "$ziel"
cp -r "$here/dist/." "$ziel/"
