ExUnit.start()

defmodule SyncSpike.TestPeer do
  @moduledoc """
  Gegenstelle für Tests: ein leeres Dokument im Rust-Kern mit eigenem Sync-Zustand, das über den Channel
  mit dem Server abgleicht (wie ein Client, nur in Elixir statt WASM).
  """
  import ExUnit.Assertions
  import Phoenix.ChannelTest

  alias SyncSpike.Native

  @spec new() :: %{doc: reference(), conn: reference()}
  def new, do: %{doc: Native.new_empty(), conn: Native.new_conn()}

  @doc "Empfängt Sync-Nachrichten und antwortet, bis beide Seiten nichts mehr senden."
  @spec settle(map(), Phoenix.Socket.t()) :: :ok
  def settle(peer, socket) do
    send_pending(peer, socket)

    receive do
      %Phoenix.Socket.Message{event: "sync", payload: %{m: m}} ->
        {:ok, _} = Native.receive_message(peer.doc, peer.conn, Base.decode64!(m))
        settle(peer, socket)
    after
      300 -> :ok
    end
  end

  @doc "Erzeugt die nächste Nachricht an den Server und wartet auf dessen Antwort."
  @spec send_pending(map(), Phoenix.Socket.t()) :: :ok
  def send_pending(peer, socket) do
    case Native.generate_message(peer.doc, peer.conn) do
      {:ok, nil} ->
        :ok

      {:ok, msg} ->
        ref = push(socket, "sync", %{"m" => Base.encode64(msg)})
        assert_reply(ref, :ok, %{heads: _}, 5_000)
        :ok
    end
  end
end
