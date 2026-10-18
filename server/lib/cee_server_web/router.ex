defmodule CeeServerWeb.Router do
  @moduledoc false
  use Phoenix.Router

  get("/health", CeeServerWeb.HealthController, :show)
end
