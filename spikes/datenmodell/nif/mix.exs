defmodule Datenmodell.MixProject do
  @moduledoc """
  Elixir-Seite des NIF-Prototyps (ap-01). Keine Abhängigkeiten: `build.sh` baut die Rust-Bibliothek mit
  Cargo und legt sie unter `priv/` ab; `Datenmodell.Native` lädt sie beim Laden des Moduls.
  """
  use Mix.Project

  def project do
    [
      app: :datenmodell,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: false,
      deps: []
    ]
  end

  def application do
    [extra_applications: [:logger]]
  end
end
