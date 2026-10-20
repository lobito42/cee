#!/usr/bin/env bash
# Misst alle Kennzahlen des Sync-Spikes (ap-03) und gibt sync.json auf stdout aus (letzte Zeile, kompakt):
#   bash spikes/sync/bench.sh --json [--log <datei>]
# Startet den Server auf einem freien Port, führt live (auch mit --delay-ms 0), concurrent, offline und
# offline --both aus und beendet den Server. Mit --log landet das Server-Protokoll in der Datei.
# Vorher einmal bauen: bash spikes/sync/build.sh
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
json=0
log=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --json) json=1 ;;
    --log)
      log="$2"
      shift
      ;;
    *)
      echo "unbekannte Option $1" >&2
      exit 2
      ;;
  esac
  shift
done
if [[ "$json" != 1 ]]; then
  echo "Aufruf: bench.sh --json [--log <datei>]" >&2
  exit 2
fi

tmp="$(mktemp -d)"
[[ -n "$log" ]] || log="$tmp/server.log"
port="$(node -e 'const s=require("net").createServer().listen(0,"127.0.0.1",()=>{console.log(s.address().port);s.close()})')"

bash "$here/serve.sh" "$port" >"$log" 2>&1 &
server=$!
cleanup() {
  kill "$server" 2>/dev/null || true
  wait "$server" 2>/dev/null || true
  rm -rf "$tmp"
}
trap cleanup EXIT

node "$here/client/bench.mjs" --url "ws://127.0.0.1:$port/socket" --root "$here"
