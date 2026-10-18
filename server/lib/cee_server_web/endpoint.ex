defmodule CeeServerWeb.Endpoint do
  @moduledoc "HTTP-Einstiegspunkt des Servers."
  use Phoenix.Endpoint, otp_app: :cee_server

  plug(Plug.RequestId)
  plug(Plug.Parsers, parsers: [:json], pass: ["application/json"], json_decoder: Jason)
  plug(CeeServerWeb.Router)
end
