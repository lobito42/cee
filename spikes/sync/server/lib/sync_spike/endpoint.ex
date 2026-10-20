defmodule SyncSpike.Endpoint do
  @moduledoc """
  Phoenix-Endpoint des Spikes: Socket unter `/socket` (nur WebSocket) und die HTTP-Schnittstelle
  `SyncSpike.Http` (Gesundheit, Dokumente, Demo-Seite). Kein LiveView, kein Ecto, keine Sitzungen.
  """
  use Phoenix.Endpoint, otp_app: :sync_spike

  # Der erste Abgleich überträgt das ganze Dokument (10.000 Elemente) in einer Nachricht.
  socket("/socket", SyncSpike.UserSocket,
    websocket: [max_frame_size: 64_000_000, compress: false],
    longpoll: false
  )

  # Demo-Seite: WASM-Kern (Ziel web) und Phoenix-JS-Client.
  plug(Plug.Static,
    at: "/wasm",
    from: Path.expand("../../../wasm/pkg-web", __DIR__),
    gzip: false
  )

  plug(Plug.Static, at: "/phoenix", from: {:phoenix, "priv/static"}, gzip: false)

  plug(Plug.Static,
    at: "/demo",
    from: Path.expand("../../../client/demo", __DIR__),
    gzip: false
  )

  plug(Plug.Telemetry, event_prefix: [:phoenix, :endpoint])
  plug(SyncSpike.Http)
end
