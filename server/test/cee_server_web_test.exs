defmodule CeeServerWebTest do
  use ExUnit.Case, async: true
  import Plug.Test

  test "GET /health antwortet mit 200" do
    conn = CeeServerWeb.Endpoint.call(conn(:get, "/health"), CeeServerWeb.Endpoint.init([]))
    assert conn.status == 200
    assert Jason.decode!(conn.resp_body) == %{"status" => "ok"}
  end
end
