defmodule CeeServerTest do
  use ExUnit.Case, async: true

  test "Schema-Version ist definiert" do
    assert CeeServer.schema_version() == 0
  end
end
