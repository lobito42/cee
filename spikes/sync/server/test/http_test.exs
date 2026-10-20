defmodule SyncSpike.HttpTest do
  use ExUnit.Case, async: false
  import Plug.Test

  defp call(method, path) do
    SyncSpike.Endpoint.call(conn(method, path), SyncSpike.Endpoint.init([]))
  end

  test "GET /health antwortet ok" do
    conn = call(:get, "/health")
    assert conn.status == 200
    assert conn.resp_body == "ok"
  end

  test "unbekanntes Dokument ist 404 mit strukturierter Antwort" do
    conn = call(:get, "/docs/gibt-es-nicht/hash")
    assert conn.status == 404
    assert %{"code" => "not_found"} = Jason.decode!(conn.resp_body)
  end

  test "GET /docs liefert eine Liste" do
    conn = call(:get, "/docs")
    assert conn.status == 200
    assert is_list(Jason.decode!(conn.resp_body))
  end
end
