import Config

config :phoenix, :json_library, Jason

config :cee_server, CeeServerWeb.Endpoint,
  adapter: Phoenix.Endpoint.Cowboy2Adapter,
  http: [port: 4000],
  server: false,
  render_errors: [formats: [json: CeeServerWeb.ErrorJSON]]

config :logger, level: :warning
