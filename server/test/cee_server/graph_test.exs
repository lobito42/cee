defmodule CeeServer.GraphTest do
  use ExUnit.Case, async: true

  alias CeeServer.Graph

  @project %{
    "schema_version" => 1,
    "elements" => [
      %{
        "id" => "a",
        "type" => "thing",
        "inputs" => %{},
        "params" => %{"p0" => %{"value" => 1, "unit" => "mm"}},
        "outputs" => %{"out" => "thing"},
        "content" => [],
        "meta" => %{"name" => "a"}
      },
      %{
        "id" => "b",
        "type" => "thing",
        "inputs" => %{"in" => "a.out"},
        "params" => %{},
        "outputs" => %{"out" => "thing"},
        "content" => [],
        "meta" => %{"name" => "b"}
      }
    ]
  }

  defp doc do
    {:ok, {doc, info}} = Graph.import_project(@project)
    assert info["findings"] == []
    doc
  end

  test "Einheiten: Tabelle, Lesen, Umrechnen" do
    {:ok, units} = Graph.units()
    assert Enum.any?(units, &(&1["code"] == "mm"))
    assert Graph.parse("1,2 m", "mm") == {:ok, %{"value" => 1200.0, "unit" => "mm"}}
    assert Graph.convert(1.5, "m", "mm") == {:ok, 1500.0}
    assert Graph.convert(2, "m", "mm") == {:ok, 2000.0}
    assert {:error, %{code: "dimension_mismatch"}} = Graph.convert(1, "m", "kg")
    assert {:error, %{code: "unknown_unit"}} = Graph.parse("1 furlongx")
  end

  test "neues Dokument, Speichern und Laden" do
    {:ok, empty} = Graph.new()
    {:ok, hash} = Graph.hash(empty)
    assert byte_size(hash) == 64
    d = doc()
    {:ok, bytes} = Graph.save(d)
    {:ok, loaded} = Graph.load(bytes)
    assert Graph.hash(loaded) == Graph.hash(d)
    assert {:ok, ~s({"elements") <> _} = Graph.export(loaded)
    assert {:error, %{code: "invalid_document", element: nil}} = Graph.load("kein Dokument")
  end

  test "Operationen einzeln und als Liste" do
    d = doc()

    op = %{
      "op" => "set_param",
      "id" => "a",
      "param" => "p0",
      "value" => %{"value" => 2, "unit" => "m"}
    }

    assert Graph.apply_op(d, op) == {:ok, %{"result" => "ok", "warnings" => []}}
    cycle = ~s({"op": "set_input", "id": "a", "name": "in", "target": "b.out"})
    assert {:error, %{code: "cycle", element: "a"}} = Graph.apply_op(d, cycle)
    assert {:error, %{code: "invalid_json"}} = Graph.apply_op(d, ~s({"op": ))

    {:ok, %{"results" => [first, second]}} =
      Graph.apply(d, [
        %{"op" => "set_meta", "id" => "a", "key" => "note", "value" => "x"},
        %{"op" => "remove", "id" => "fehlt"}
      ])

    assert first["result"] == "ok"
    assert second["result"] == "unknown_element"
  end

  test "Zusammenführen" do
    d = doc()
    {:ok, bytes} = Graph.save(d)
    {:ok, other} = Graph.load(bytes)

    {:ok, _} =
      Graph.apply_op(other, %{"op" => "set_meta", "id" => "b", "key" => "k", "value" => "v"})

    assert {:ok, ^d} = Graph.merge(d, other)
    assert Graph.hash(d) == Graph.hash(other)
    assert {:ok, ^d} = Graph.merge(d, d)
  end

  test "Abfragen" do
    d = doc()
    assert Graph.validate(d) == {:ok, %{"findings" => []}}
    assert {:ok, %{"order" => ["a", "b"], "skipped" => []}} = Graph.order(d)
    assert Graph.affected(d, ["a"]) == {:ok, %{"affected" => ["a", "b"]}}
    assert {:ok, %{"elements" => ["a"]}} = Graph.subgraph(d, "a")
    assert Graph.migrate(d) == {:ok, %{"before" => 1, "after" => 1}}
    assert Graph.materialized_count(d) == {:ok, 0}
    {:ok, el} = Graph.element(d, "b")
    assert el["inputs"] == %{"in" => "a.out"}
    assert Graph.materialized_count(d) == {:ok, 1}
    assert {:error, %{code: "missing_target", element: "fehlt"}} = Graph.element(d, "fehlt")
  end

  test "Zustände" do
    d = doc()
    {:ok, s} = Graph.states_new(d)
    assert Graph.states_ready(s) == {:ok, ["a"]}
    assert :ok = Graph.states_event(s, %{"event" => "start", "id" => "a"})
    assert :ok = Graph.states_event(s, %{"event" => "ok", "id" => "a"})
    {:ok, all} = Graph.states_get(s)
    assert all["states"]["a"] == "current"
    assert all["ready"] == ["b"]

    assert {:error, %{code: "invalid_json"}} =
             Graph.states_event(s, %{"event" => "x", "id" => "a"})
  end

  test "Fachpakete und abgefangener Panic" do
    d = doc()
    {:ok, names} = Graph.packages()
    assert is_list(names)
    assert {:error, %{code: "unknown_function"}} = Graph.call("gibt.es_nicht", d, %{})
    assert {:error, %{code: "internal"}} = Graph.debug_panic()
    assert {:ok, _} = Graph.hash(d)
  end
end
