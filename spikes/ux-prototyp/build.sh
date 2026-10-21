#!/usr/bin/env bash
# Prototyp bauen: Abhängigkeiten, Chromium für das Prüfwerkzeug, Tokens, Build (ap-41).
set -euo pipefail
here="$(dirname "$0")"
npm --prefix "$here" ci --legacy-peer-deps --no-audit --no-fund
npm --prefix "$here" exec -- playwright install chromium
npm --prefix "$here" run tokens
npm --prefix "$here" run build
