defmodule SyncSpike.Application do
  @moduledoc "Start des Sync-Spike-Servers."
  use Application

  @impl true
  def start(_type, _args) do
    children = []
    Supervisor.start_link(children, strategy: :one_for_one, name: SyncSpike.Supervisor)
  end
end
