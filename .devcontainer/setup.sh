#!/usr/bin/env bash
# Einrichtung der Entwicklungsumgebung: Python (Worker), Rust (Kern), Elixir (Server), Node (Client).
set -euo pipefail

sudo apt-get update
sudo apt-get install -y jq ripgrep libgl1 libegl1 libosmesa6 xvfb \
  libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev   # Tauri unter Linux

# Elixir/Erlang über mise (aktuelle Versionen, gleich wie in der CI)
curl -fsSL https://mise.run | sh
export PATH="$HOME/.local/bin:$PATH"
mise use -g erlang@27 elixir@1.18-otp-27

pip install uv
uv sync --extra cad
npm install -g @fission-ai/openspec@latest
git config core.hooksPath .githooks
(cd server && mix local.hex --force && mix local.rebar --force && mix deps.get)
