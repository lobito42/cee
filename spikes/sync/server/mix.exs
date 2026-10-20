defmodule SyncSpike.MixProject do
  @moduledoc """
  Minimaler Phoenix-Server für den Sync-Spike (ap-03): nur Endpoint, Socket und Channel, ein Prozess je
  Dokument, Dokument nur im Arbeitsspeicher. Kein Produktcode.

  Den Rust-Kern baut `spikes/sync/build.sh` mit Cargo und legt ihn unter `priv/native/` ab;
  `SyncSpike.Native` lädt ihn beim Laden des Moduls (wie ap-01, ohne Rustler-Mix-Abhängigkeit).
  """
  use Mix.Project

  def project do
    [
      app: :sync_spike,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      mod: {SyncSpike.Application, []},
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:phoenix, "~> 1.8"},
      {:bandit, "~> 1.5"},
      {:jason, "~> 1.4"}
    ]
  end
end
