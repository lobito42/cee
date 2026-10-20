import Config

# Nur Spike: ohne Anmeldung, nur an 127.0.0.1 gebunden. Der Schlüssel signiert nichts Schützenswertes
# (keine Sitzungen, keine Cookies); er ist nur Pflichtangabe des Endpoints.
config :sync_spike, SyncSpike.Endpoint,
  adapter: Bandit.PhoenixAdapter,
  url: [host: "127.0.0.1"],
  http: [ip: {127, 0, 0, 1}, port: 4000],
  server: true,
  secret_key_base: String.duplicate("spike-sync-ap03-", 4),
  pubsub_server: SyncSpike.PubSub,
  check_origin: false

# Elementzahl eines neuen Dokuments (design.md: synth::project(10_000)).
config :sync_spike, elements: 10_000

config :phoenix, :json_library, Jason

# Protokolle ohne Modellinhalte (ADR-056): Channel-Parameter werden nie protokolliert (siehe DocChannel).
config :logger, level: :info

import_config "#{config_env()}.exs"
