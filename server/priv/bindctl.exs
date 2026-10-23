# Prüfprogramm `bindctl` für die Rustler-NIF (CeeServer.Graph, ap-40). Ausgabe: ein JSON-Dokument je Aufruf
# in der letzten Zeile von stdout.
#
#   cd server && mix run --no-start priv/bindctl.exs <befehl>
#
# Befehle `run`, `load`, `merge`, `api`, `bench` wie `crates/bind/examples/bindctl.rs` (Rust-Sollwerte).

defmodule CeeServer.Bindctl do
  @moduledoc false
  alias CeeServer.Graph

  @api %{
    "units" => {:units, 0},
    "parse" => {:parse, 2},
    "convert" => {:convert, 3},
    "Doc.new" => {:new, 0},
    "Doc.import" => {:import_project, 2},
    "Doc.load" => {:load, 2},
    "doc.save" => {:save, 1},
    "doc.apply_op" => {:apply_op, 2},
    "doc.apply" => {:apply, 2},
    "doc.export" => {:export, 1},
    "doc.hash" => {:hash, 1},
    "doc.merge" => {:merge, 2},
    "doc.validate" => {:validate, 1},
    "doc.order" => {:order, 1},
    "doc.affected" => {:affected, 2},
    "doc.subgraph" => {:subgraph, 2},
    "doc.migrate" => {:migrate, 1},
    "doc.element" => {:element, 2},
    "doc.materialized_count" => {:materialized_count, 1},
    "States.new" => {:states_new, 1},
    "states.event" => {:states_event, 2},
    "states.ready" => {:states_ready, 1},
    "states.get" => {:states_get, 1},
    "packages" => {:packages, 0},
    "call" => {:call, 3}
  }

  def main(["run", path | rest]), do: run(path, rest)
  def main(["load", path | rest]), do: load(path, rest)
  def main(["merge", a, b | rest]), do: merge(a, b, rest)
  def main(["api" | _]), do: api()
  def main(["bench" | rest]), do: bench(rest)
  def main(args), do: %{"error" => %{"code" => "usage", "message" => "Aufruf: #{inspect(args)}"}}

  defp ok!({:ok, v}), do: v
  defp ok!({:error, e}), do: raise("Fehler: #{inspect(e)}")

  defp option(args, name) do
    case Enum.drop_while(args, &(&1 != name)) do
      [_, value | _] -> value
      _ -> nil
    end
  end

  defp read_json(path), do: path |> File.read!() |> Jason.decode!()

  defp save(doc, args) do
    case option(args, "--save") do
      nil -> :ok
      path -> File.write!(path, ok!(Graph.save(doc)))
    end
  end

  defp error_json(e), do: %{"code" => e.code, "message" => e.message, "element" => e.element}

  defp op_entry(doc, op) do
    case Graph.apply_op(doc, op) do
      {:ok, v} -> v
      {:error, e} -> %{"result" => e.code, "message" => e.message, "warnings" => []}
    end
  end

  defp error_case(doc, %{"op_json" => text}), do: Graph.apply_op(doc, text)
  defp error_case(doc, %{"op" => op}), do: Graph.apply_op(doc, op)
  defp error_case(doc, %{"element" => id}), do: Graph.element(doc, id)
  defp error_case(_doc, %{"parse" => [text, default]}), do: Graph.parse(text, default)
  defp error_case(_doc, %{"convert" => [v, from, to]}), do: Graph.convert(v, from, to)
  defp error_case(_doc, %{"debug_panic" => _}), do: Graph.debug_panic()

  defp error_case(_doc, %{"load_bytes_b64" => b64}) do
    case Base.decode64(b64) do
      {:ok, bytes} -> Graph.load(bytes)
      :error -> {:error, %{code: "invalid_document", message: "kein Base64", element: nil}}
    end
  end

  defp query(doc, q) do
    {name, rest} =
      case String.split(q, ":", parts: 2) do
        [n, r] -> {n, r}
        [n] -> {n, ""}
      end

    query(doc, name, rest)
  end

  defp query(doc, "validate", _), do: Graph.validate(doc)
  defp query(doc, "order", _), do: Graph.order(doc)
  defp query(doc, "affected", id), do: Graph.affected(doc, [id])
  defp query(doc, "subgraph", id), do: Graph.subgraph(doc, id)
  defp query(doc, "migrate", _), do: Graph.migrate(doc)
  defp query(doc, "element", id), do: Graph.element(doc, id)
  defp query(_doc, "units", _), do: Graph.units()
  defp query(_doc, "packages", _), do: Graph.packages()

  defp query(_doc, "parse", rest) do
    case String.split(rest, "|", parts: 2) do
      [text, ""] -> Graph.parse(text)
      [text, default] -> Graph.parse(text, default)
      [text] -> Graph.parse(text)
    end
  end

  defp query(_doc, "convert", rest) do
    [v, from, to] = String.split(rest, "|")
    {value, ""} = Float.parse(v)

    case Graph.convert(value, from, to) do
      {:ok, out} -> {:ok, %{"value" => out, "unit" => to}}
      err -> err
    end
  end

  defp query(doc, "call", rest) do
    case String.split(rest, "|", parts: 2) do
      [name, args] -> Graph.call(name, doc, args)
      [name] -> Graph.call(name, doc, "{}")
    end
  end

  defp run(path, args) do
    scen = read_json(path)
    types = Map.get(scen, "types")
    {doc, _} = ok!(Graph.import_project(Map.get(scen, "project"), types))

    errors =
      for c <- Map.get(scen, "errors", []) do
        case error_case(doc, c) do
          {:error, e} -> error_json(e)
          _ -> nil
        end
      end

    results = for op <- Map.get(scen, "ops", []), do: op_entry(doc, op)

    states =
      case Map.get(scen, "states", []) do
        [] ->
          nil

        events ->
          s = ok!(Graph.states_new(doc))
          # Unsinnige Ereignisse werden übergangen wie bei `graphctl states`.
          Enum.each(events, &Graph.states_event(s, &1))
          ok!(Graph.states_get(s))
      end

    queries =
      for q <- Map.get(scen, "queries", []) do
        case query(doc, q) do
          {:ok, v} -> %{"query" => q, "value" => v}
          {:error, e} -> %{"query" => q, "error" => error_json(e)}
        end
      end

    export = ok!(Graph.export(doc))
    save(doc, args)

    %{
      "results" => results,
      "hash" => ok!(Graph.hash(doc)),
      "export_sha256" => :crypto.hash(:sha256, export) |> Base.encode16(case: :lower),
      "queries" => queries,
      "errors" => errors,
      "states" => states
    }
  end

  defp load(path, args) do
    doc = ok!(Graph.load(File.read!(path)))

    results =
      case option(args, "--ops") do
        nil -> []
        ops -> for op <- read_json(ops), do: op_entry(doc, op)
      end

    save(doc, args)
    %{"hash" => ok!(Graph.hash(doc)), "results" => results}
  end

  defp merge(a, b, args) do
    doc = ok!(Graph.load(File.read!(a)))
    other = ok!(Graph.load(File.read!(b)))
    ok!(Graph.merge(doc, other))
    save(doc, args)
    %{"hash" => ok!(Graph.hash(doc))}
  end

  defp api do
    Code.ensure_loaded!(Graph)

    names =
      for {name, {fun, arity}} <- Enum.sort(@api), function_exported?(Graph, fun, arity), do: name

    %{"functions" => names}
  end

  defp ids(list), do: Enum.flat_map(list, fn e -> [e["id"] | ids(Map.get(e, "content", []))] end)

  defp ms(t0), do: (System.monotonic_time(:nanosecond) - t0) / 1.0e6

  defp p95(samples) do
    sorted = Enum.sort(samples)
    rank = ceil(length(sorted) * 0.95)
    Enum.at(sorted, max(rank - 1, 0))
  end

  defp bench(args) do
    text = File.read!(option(args, "--project"))
    all = text |> Jason.decode!() |> Map.get("elements", []) |> ids() |> List.to_tuple()
    {doc, _} = ok!(Graph.import_project(text))
    bytes = ok!(Graph.save(doc))

    t0 = System.monotonic_time(:nanosecond)
    doc = ok!(Graph.load(bytes))
    load_ms = ms(t0)
    t0 = System.monotonic_time(:nanosecond)
    ok!(Graph.hash(doc))
    hash_ms = ms(t0)

    samples =
      for i <- 0..1099 do
        id = elem(all, :rand.uniform(tuple_size(all)) - 1)
        t0 = System.monotonic_time(:nanosecond)
        value = %{"value" => rem(i, 1000) * 0.001 + 0.5, "unit" => "m"}
        op = %{"op" => "set_param", "id" => id, "param" => "p0", "value" => value}
        ok!(Graph.apply_op(doc, op))
        {i, ms(t0)}
      end

    measured = for {i, t} <- samples, i >= 100, do: t
    %{"nif_op_p95_ms" => p95(measured), "load_10k_ms" => load_ms, "hash_10k_ms" => hash_ms}
  end
end

System.argv() |> CeeServer.Bindctl.main() |> Jason.encode!() |> IO.puts()
