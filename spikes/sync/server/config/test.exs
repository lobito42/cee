import Config

# Tests sprechen den Endpoint direkt an (Phoenix.ChannelTest, Plug.Test), ohne offenen Port. Kleine
# Dokumente halten die Tests schnell.
config :sync_spike, SyncSpike.Endpoint, server: false
config :sync_spike, elements: 300
config :logger, level: :warning
