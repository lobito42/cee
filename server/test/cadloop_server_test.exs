defmodule CadloopServerTest do
  use ExUnit.Case, async: true

  test "Schema-Version ist definiert" do
    assert CadloopServer.schema_version() == 0
  end
end
