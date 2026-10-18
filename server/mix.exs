defmodule CeeServer.MixProject do
  use Mix.Project

  # Server für Zusammenarbeit, Historie, Freigaben und Worker-Steuerung (ADR-030).
  # Oban und die Rustler-Anbindung an crates/graph kommen mit ap-03-spike-sync.
  def project do
    [
      app: :cee_server,
      version: "0.0.1",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      dialyzer: [plt_add_apps: [:mix, :ex_unit]]
    ]
  end

  def application do
    [mod: {CeeServer.Application, []}, extra_applications: [:logger]]
  end

  defp deps do
    [
      {:phoenix, "~> 1.7"},
      {:plug_cowboy, "~> 2.7"},
      {:jason, "~> 1.4"},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false},
      {:dialyxir, "~> 1.4", only: [:dev, :test], runtime: false}
    ]
  end
end
