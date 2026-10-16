defmodule CeeServer.MixProject do
  use Mix.Project

  # Server für Zusammenarbeit, Historie, Freigaben und Worker-Steuerung (ADR-030).
  # Phoenix, Oban und die Rustler-Anbindung an crates/graph kommen mit ap-00-setup bzw. ap-03-spike-sync.
  def project do
    [
      app: :cee_server,
      version: "0.0.1",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [extra_applications: [:logger]]
  end

  defp deps do
    []
  end
end
