#!/usr/bin/env bash
# Startet den Sync-Spike-Server im Vordergrund auf 127.0.0.1:<port>; Protokoll auf stdout/stderr.
# Vorher einmal bauen: bash spikes/sync/build.sh
set -euo pipefail

port="${1:?Aufruf: serve.sh <port>}"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$here/server"
PORT="$port" MIX_ENV=prod exec mix run --no-halt
