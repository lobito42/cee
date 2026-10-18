defmodule CeeServer.Application do
  @moduledoc false
  use Application

  @impl true
  def start(_type, _args) do
    children = [CeeServerWeb.Endpoint]
    Supervisor.start_link(children, strategy: :one_for_one, name: CeeServer.Supervisor)
  end
end
