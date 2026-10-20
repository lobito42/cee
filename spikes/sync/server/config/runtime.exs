import Config

# serve.sh <port> setzt PORT.
if port = System.get_env("PORT") do
  config :sync_spike, SyncSpike.Endpoint,
    http: [ip: {127, 0, 0, 1}, port: String.to_integer(port)]
end
