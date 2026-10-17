#!/usr/bin/env bash
# Einrichtung der Entwicklungsumgebung: Python (Worker), Rust (Kern), Elixir (Server), Node (Client).
set -euo pipefail

sudo apt-get update
sudo apt-get install -y jq ripgrep libgl1 libegl1 libosmesa6 xvfb \
  libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev   # Tauri unter Linux

# Elixir/Erlang über mise, Versionen aus .tool-versions (gleich wie CI und Nachtschicht)
curl -fsSL https://mise.run | sh
export PATH="$HOME/.local/bin:$PATH"
mise trust --yes . && mise install erlang elixir
rustup toolchain install   # Version aus rust-toolchain.toml

command -v uv >/dev/null || pipx install uv || pip install --user uv
uv sync --extra cad
npm install -g @fission-ai/openspec@1.14.2
git config core.hooksPath .githooks
(cd server && mix local.hex --force && mix local.rebar --force && mix deps.get)
