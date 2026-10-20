defmodule SyncSpike.OfflineTest do
  @moduledoc """
  Offline weiterarbeiten und zusammenführen über den Dokumentprozess: B trennt die Verbindung, A entfernt
  online zwei Elemente, B verweist offline auf das eine und ändert das andere. Nach dem Wiederverbinden
  haben A, B und Server denselben Stand, und der Server meldet gebrochene Referenz und
  „Entfernen gegen Ändern“ mit allen Werten von B.
  """
  use ExUnit.Case, async: false

  alias SyncSpike.{DocServer, Native, TestPeer}

  @doc_name "t-offline"

  # Gegenstelle direkt am Dokumentprozess: Nachrichten des Servers kommen als {:sync_out, …}.
  defp settle(peer, pid) do
    with {:ok, msg} when is_binary(msg) <- Native.generate_message(peer.doc, peer.conn) do
      {:ok, _} = DocServer.sync(pid, self(), msg, nil)
    end

    receive do
      {:sync_out, msg, _t, _heads} ->
        {:ok, _} = Native.receive_message(peer.doc, peer.conn, msg)
        settle(peer, pid)
    after
      300 -> :ok
    end
  end

  # Eine Verbindung (eigener Prozess) gleicht ab und endet; danach ist der Peer offline.
  defp session(peer, pid) do
    Task.async(fn ->
      :ok = DocServer.join(pid, self())
      settle(peer, pid)
    end)
    |> Task.await(30_000)

    %{peer | conn: Native.new_conn()}
  end

  defp apply!(peer, ops) do
    {:ok, _} = Native.apply_json(peer.doc, Jason.encode!(ops))
  end

  test "Offline-Änderungen werden ohne Verlust zusammengeführt und als Befund gemeldet" do
    {:ok, pid} = DocServer.ensure(@doc_name)
    a = TestPeer.new()
    :ok = DocServer.join(pid, self())
    settle(a, pid)

    # B holt sich den Stand und geht offline.
    b = session(TestPeer.new(), pid)

    apply!(a, [
      %{op: "remove_element", id: "e000030"},
      %{op: "remove_element", id: "e000031"},
      %{op: "set_param", id: "e000040", name: "length", value: 11}
    ])

    settle(a, pid)

    apply!(b, [
      %{op: "set_input", id: "e000050", name: "link_0", ref: "e000030.solid"},
      %{op: "set_param", id: "e000031", name: "length", value: 21},
      %{op: "set_param", id: "e000031", name: "height", value: 22},
      %{op: "set_param", id: "e000040", name: "length", value: 12},
      %{op: "set_param", id: "e000060", name: "length", value: 23}
    ])

    # B verbindet sich wieder (neuer Sync-Zustand), danach holt A den Stand.
    b = session(b, pid)
    settle(a, pid)

    {:ok, server_heads} = DocServer.heads(pid)
    assert Native.heads(a.doc) == {:ok, server_heads}
    assert Native.heads(b.doc) == {:ok, server_heads}
    {:ok, server_hash} = DocServer.hash(pid)
    assert Native.hash(a.doc) == {:ok, server_hash}
    assert Native.hash(b.doc) == {:ok, server_hash}

    # Nur von einer Seite gesetzte Werte stehen im Endstand.
    assert Native.field_json(a.doc, "e000060", "params", "length") == {:ok, "23"}
    assert Native.field_json(a.doc, "e000050", "inputs", "link_0") == {:ok, ~s("e000030.solid")}

    {:ok, json} = DocServer.findings_json(pid)
    findings = Jason.decode!(json)

    assert Enum.any?(findings, fn f ->
             f["kind"] == "conflict" and f["id"] == "e000040" and
               Enum.sort(f["values"]) == [11, 12]
           end)

    assert Enum.any?(findings, fn f ->
             f["kind"] == "broken_reference" and f["id"] == "e000050" and
               f["input"] == "link_0" and f["target"] == "e000030.solid"
           end)

    assert [eor] = Enum.filter(findings, &(&1["kind"] == "edit_on_removed"))
    assert eor["id"] == "e000031"
    assert Enum.map(eor["edits"], &{&1["name"], &1["value"]}) == [{"length", 21}, {"height", 22}]
  end
end
