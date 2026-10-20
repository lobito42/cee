defmodule SyncSpike.DocChannelTest do
  use ExUnit.Case, async: false
  import Phoenix.ChannelTest
  import Plug.Test

  alias SyncSpike.{DocServer, Native, TestPeer}

  @endpoint SyncSpike.Endpoint

  defp join!(name) do
    {:ok, _, socket} =
      SyncSpike.UserSocket
      |> socket(nil, %{})
      |> subscribe_and_join(SyncSpike.DocChannel, "doc:" <> name)

    socket
  end

  defp server_hash(name) do
    {:ok, hash} = name |> DocServer.whereis() |> DocServer.hash()
    hash
  end

  test "Erstabgleich und Weitergabe an die andere Verbindung" do
    socket_a = join!("t-sync")
    peer_a = TestPeer.new()
    TestPeer.settle(peer_a, socket_a)
    # Gleiche Köpfe heißen gleicher Inhalt; der Hash des Testpeers ist derselbe Kern-Aufruf.
    {:ok, server_heads} = "t-sync" |> DocServer.whereis() |> DocServer.heads()
    assert Native.heads(peer_a.doc) == {:ok, server_heads}
    assert Native.hash(peer_a.doc) == {:ok, server_hash("t-sync")}

    parent = self()
    id = Enum.at(editable_ids(), 3)

    # Zweite Verbindung direkt am Dokumentprozess (ChannelTest erlaubt Sockets nur im Testprozess).
    b =
      Task.async(fn ->
        pid = DocServer.whereis("t-sync")
        :ok = DocServer.join(pid, self())
        peer_b = TestPeer.new()
        settle_direct(peer_b, pid)
        send(parent, :b_ready)
        wait_direct(peer_b, pid, id, ~s(4711), 50)
      end)

    assert_receive :b_ready, 10_000
    op = Jason.encode!(%{op: "set_param", id: id, name: "length", value: 4711})
    {:ok, 1} = Native.apply_json(peer_a.doc, op)
    TestPeer.settle(peer_a, socket_a)
    assert Task.await(b, 20_000) == {:ok, ~s(4711)}
  end

  test "ein Prozess je Dokument; kill trifft nur das eine Dokument" do
    _a1 = join!("t-eins")
    _a2 = join!("t-eins")
    _b = join!("t-zwei")

    docs = Map.new(DocServer.list(), &{&1.doc, &1})
    assert docs["t-eins"].clients == 2
    assert docs["t-zwei"].clients == 1
    assert docs["t-eins"].pid != docs["t-zwei"].pid

    pid_zwei = DocServer.whereis("t-zwei")
    conn = SyncSpike.Endpoint.call(conn(:post, "/docs/t-eins/kill"), SyncSpike.Endpoint.init([]))
    assert conn.status == 200
    assert DocServer.whereis("t-eins") == nil
    assert DocServer.whereis("t-zwei") == pid_zwei
    assert is_binary(server_hash("t-zwei"))
  end

  test "ungültige Sync-Nachricht: Fehlerantwort, Dokument und Prozess unverändert" do
    socket = join!("t-gift")
    TestPeer.settle(TestPeer.new(), socket)
    pid = DocServer.whereis("t-gift")
    before = server_hash("t-gift")

    ref = push(socket, "sync", %{"m" => Base.encode64("kein sync")})
    assert_reply(ref, :error, %{code: "invalid_sync_message", hint: hint})
    assert is_binary(hint)

    ref = push(socket, "sync", %{"m" => Base.encode64(<<0x42, 0xFF, 0xFF, 0x01>>)})
    assert_reply(ref, :error, %{code: "invalid_sync_message"})

    ref = push(socket, "sync", %{"m" => "%%% kein base64"})
    assert_reply(ref, :error, %{code: "invalid_encoding"})

    assert DocServer.whereis("t-gift") == pid
    assert server_hash("t-gift") == before
  end

  defp editable_ids do
    # Elemente des synthetischen Projekts: e000000 Ursprung, e000001–e000020 Materialien, e000021 Gruppe.
    for i <- 22..60, do: "e" <> String.pad_leading(Integer.to_string(i), 6, "0")
  end

  defp settle_direct(peer, pid) do
    with {:ok, msg} when is_binary(msg) <- Native.generate_message(peer.doc, peer.conn) do
      {:ok, _} = DocServer.sync(pid, self(), msg, nil)
    end

    receive do
      {:sync_out, msg, _t, _heads} ->
        {:ok, _} = Native.receive_message(peer.doc, peer.conn, msg)
        settle_direct(peer, pid)
    after
      300 -> :ok
    end
  end

  defp wait_direct(_peer, _pid, _id, _want, 0), do: :timeout

  defp wait_direct(peer, pid, id, want, tries) do
    settle_direct(peer, pid)

    case Native.field_json(peer.doc, id, "params", "length") do
      {:ok, ^want} -> {:ok, want}
      _ -> wait_direct(peer, pid, id, want, tries - 1)
    end
  end
end
