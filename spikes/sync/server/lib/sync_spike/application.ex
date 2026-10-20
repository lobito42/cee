defmodule SyncSpike.Application do
  @moduledoc """
  Start des Sync-Spike-Servers: Registry und DynamicSupervisor für die Dokumentprozesse (einer je
  Dokument, ADR-030), PubSub für die Channels und der Endpoint.
  """
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Registry, keys: :unique, name: SyncSpike.Registry},
      {DynamicSupervisor, name: SyncSpike.DocSupervisor, strategy: :one_for_one},
      {Phoenix.PubSub, name: SyncSpike.PubSub},
      SyncSpike.Endpoint
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: SyncSpike.Supervisor)
  end
end
