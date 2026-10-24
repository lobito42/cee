defmodule Mix.Tasks.Compile.CeeNif do
  @moduledoc """
  Baut die NIF `crates/graph-nif` immer im Release-Modus (ADR-029, ap-40) und legt sie unter
  `priv/native/cee_graph_nif.so` ab. Fachpakete und Prüfhilfen schaltet `CEE_BIND_FEATURES` ein
  (z. B. `pkg-beispiel,test-hooks`).

  Eigener Schritt statt der Rustler-Übersetzung, weil Rustler Paketname und Bibliotheksname gleichsetzt
  (`cee-graph-nif` gegenüber `cee_graph_nif`); geladen wird die NIF weiterhin über `use Rustler`.
  """
  use Mix.Task.Compiler

  @impl true
  def run(_args) do
    root = Path.expand("..", __DIR__)
    features = System.get_env("CEE_BIND_FEATURES", "") |> String.trim()
    feature_args = if features == "", do: [], else: ["--features", features]
    args = ["build", "--quiet", "--release", "-p", "cee-graph-nif"] ++ feature_args

    {env, ext} =
      case :os.type() do
        # Symbole der BEAM erst beim Laden auflösen (Empfehlung von Rustler für macOS).
        {:unix, :darwin} ->
          {[{"RUSTFLAGS", "-C link-arg=-undefined -C link-arg=dynamic_lookup"}], "dylib"}

        {:win32, _} ->
          {[], "dll"}

        _ ->
          {[], "so"}
      end

    case System.cmd("cargo", args, cd: root, env: env, stderr_to_stdout: true) do
      {_, 0} ->
        target = System.get_env("CARGO_TARGET_DIR") || Path.join(root, "target")
        name = if ext == "dll", do: "cee_graph_nif.dll", else: "libcee_graph_nif.#{ext}"
        File.mkdir_p!("priv/native")
        File.cp!(Path.join([target, "release", name]), "priv/native/cee_graph_nif.so")
        {:ok, []}

      {output, code} ->
        Mix.shell().error("cargo build -p cee-graph-nif schlug fehl (#{code}):\n#{output}")
        {:error, []}
    end
  end
end

defmodule CeeServer.MixProject do
  use Mix.Project

  # Server für Zusammenarbeit, Historie, Freigaben und Worker-Steuerung (ADR-030).
  # Die NIF über den Kern (crates/graph-nif, CeeServer.Graph) kommt mit ap-40.
  def project do
    [
      app: :cee_server,
      version: "0.0.1",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      compilers: [:cee_nif] ++ Mix.compilers(),
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
      # Rustler (MIT/Apache-2.0): lädt die NIF aus crates/graph-nif (CeeServer.Graph, ap-40)
      {:rustler, "~> 0.38.0"},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false},
      {:dialyxir, "~> 1.4", only: [:dev, :test], runtime: false}
    ]
  end
end
