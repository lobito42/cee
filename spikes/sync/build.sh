#!/usr/bin/env bash
# Baut den Sync-Spike (ap-03):
#   1. Rustler-NIF       -> server/priv/native/sync_nif.so
#   2. WASM für Node      -> wasm/pkg-node/ (wasm-bindgen --target nodejs)
#      WASM für Browser   -> wasm/pkg-web/  (wasm-bindgen --target web, Demo-Seite)
#   3. Node-Abhängigkeiten -> client/node_modules (npm ci)
#   4. Mix-Projekt        -> server/_build (mix deps.get, mix compile)
# Installiert bei Bedarf das Ziel wasm32-unknown-unknown und wasm-bindgen-cli in genau der Version aus
# Cargo.lock (lokal unter target/tools), wie spikes/datenmodell/build.sh.
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$here"

echo "== NIF"
case "$(uname -s)" in
  Darwin)
    # Symbole der BEAM erst beim Laden auflösen (Empfehlung von Rustler für macOS).
    RUSTFLAGS="-C link-arg=-undefined -C link-arg=dynamic_lookup" \
      cargo build --release -q -p sync_nif
    ext=dylib
    ;;
  *)
    cargo build --release -q -p sync_nif
    ext=so
    ;;
esac
mkdir -p server/priv/native
cp "target/release/libsync_nif.$ext" server/priv/native/sync_nif.so

echo "== WASM"
if ! rustup target list --installed | grep -qx wasm32-unknown-unknown; then
  rustup target add wasm32-unknown-unknown
fi
# Zufall für Actor-IDs kommt in WASM aus der JS-Laufzeit (Feature `wasm` von automerge, getrandom/wasm_js).
RUSTFLAGS='--cfg getrandom_backend="wasm_js"' \
  cargo build --release -q -p sync_wasm --target wasm32-unknown-unknown

version="$(awk '$0 == "name = \"wasm-bindgen\"" { getline; gsub(/version = |"/, ""); print; exit }' Cargo.lock)"
bindgen="$here/target/tools/bin/wasm-bindgen"
if [[ ! -x "$bindgen" ]] || [[ "$("$bindgen" --version | awk '{ print $2 }')" != "$version" ]]; then
  # Gleiche Version schon im ap-01-Prototyp gebaut? Dann wiederverwenden statt neu zu übersetzen.
  other="$here/../datenmodell/target/tools/bin/wasm-bindgen"
  if [[ -x "$other" ]] && [[ "$("$other" --version | awk '{ print $2 }')" == "$version" ]]; then
    bindgen="$other"
  else
    echo "== wasm-bindgen-cli $version installieren"
    cargo install -q wasm-bindgen-cli --version "$version" --locked --root "$here/target/tools"
  fi
fi
wasm="target/wasm32-unknown-unknown/release/sync_wasm.wasm"
"$bindgen" --target nodejs --out-dir wasm/pkg-node "$wasm"
echo '{"type": "commonjs"}' >wasm/pkg-node/package.json
"$bindgen" --target web --out-dir wasm/pkg-web "$wasm"

echo "== Node"
(cd client && npm ci --silent --no-audit --no-fund)

echo "== Mix"
(cd server && MIX_ENV=prod mix deps.get --only prod >/dev/null && MIX_ENV=prod mix compile >/dev/null)
echo "== fertig"
