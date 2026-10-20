defmodule SyncSpike.UserSocket do
  @moduledoc """
  Socket ohne Anmeldung (Spike, nur 127.0.0.1). Verbindungen werden nicht protokolliert, damit keine
  Parameter im Protokoll landen (ADR-056).
  """
  use Phoenix.Socket, log: false

  channel("doc:*", SyncSpike.DocChannel)

  @impl true
  def connect(_params, socket, _connect_info), do: {:ok, socket}

  @impl true
  def id(_socket), do: nil
end
