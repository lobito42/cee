defmodule CeeServerWeb.HealthController do
  @moduledoc "Lebenszeichen des Servers: `GET /health`."
  use Phoenix.Controller, formats: [:json]

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, _params), do: json(conn, %{status: "ok"})
end
