#!/usr/bin/env bash
# Baut die beiden Bindungen des Datenmodell-Prototyps:
#   1. Rustler-NIF  -> nif/priv/datenmodell_nif.so (+ mix compile)
#   2. WASM für Node -> wasm/pkg/ (wasm-bindgen --target nodejs)
# Installiert bei Bedarf das Ziel wasm32-unknown-unknown (für die feste Version aus rust-toolchain.toml)
# und wasm-bindgen-cli in genau der Version aus Cargo.lock (lokal unter target/tools).
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$here"

echo "== NIF"
case "$(uname -s)" in
  Darwin)
    # Symbole der BEAM erst beim Laden auflösen (Empfehlung von Rustler für macOS).
    RUSTFLAGS="-C link-arg=-undefined -C link-arg=dynamic_lookup" \
      cargo build --release -q -p datenmodell_nif
    ext=dylib
    ;;
  *)
    cargo build --release -q -p datenmodell_nif
    ext=so
    ;;
esac
mkdir -p nif/priv
cp "target/release/libdatenmodell_nif.$ext" nif/priv/datenmodell_nif.so
(cd nif && mix compile >/dev/null)

echo "== WASM"
if ! rustup target list --installed | grep -qx wasm32-unknown-unknown; then
  rustup target add wasm32-unknown-unknown
fi
# getrandom 0.3 braucht für wasm32-unknown-unknown das JS-Backend (Actor-IDs von Automerge).
RUSTFLAGS='--cfg getrandom_backend="wasm_js"' \
  cargo build --release -q -p datenmodell_wasm --target wasm32-unknown-unknown

version="$(awk '$0 == "name = \"wasm-bindgen\"" { getline; gsub(/version = |"/, ""); print; exit }' Cargo.lock)"
bindgen="$here/target/tools/bin/wasm-bindgen"
if [[ ! -x "$bindgen" ]] || [[ "$("$bindgen" --version | awk '{ print $2 }')" != "$version" ]]; then
  echo "== wasm-bindgen-cli $version installieren"
  cargo install -q wasm-bindgen-cli --version "$version" --locked --root "$here/target/tools"
fi
"$bindgen" --target nodejs --out-dir wasm/pkg \
  target/wasm32-unknown-unknown/release/datenmodell_wasm.wasm
echo '{"type": "commonjs"}' >wasm/pkg/package.json
echo "== fertig"
