# Aufruf: mix run --no-start bench.exs [elemente] [operationen]
# Misst eine Parameteränderung über die NIF aus Elixir (Zeit je Aufruf inkl. Grenzübergang) und gibt
# {"op_p95_ms": …, "op_median_ms": …, "ops": …} aus.
alias Datenmodell.Native

{n, count} =
  case System.argv() do
    [n, count] -> {String.to_integer(n), String.to_integer(count)}
    _ -> {10_000, 1_000}
  end

{:ok, doc} = Native.synth(n)
ids = n |> Native.synth_editable_ids() |> List.to_tuple()
size = tuple_size(ids)
:rand.seed(:exsss, {1, 2, 3})

measure = fn k ->
  id = elem(ids, :rand.uniform(size) - 1)
  value = Integer.to_string(1000 + rem(k, 4000))
  t0 = System.monotonic_time(:nanosecond)
  {:ok, :ok} = Native.set_param(doc, id, "length", value)
  System.monotonic_time(:nanosecond) - t0
end

# Aufwärmen, dann messen.
Enum.each(1..100, measure)
times = 1..count |> Enum.map(measure) |> Enum.sort()
pick = fn q -> Enum.at(times, min(count - 1, trunc(Float.ceil(q * count)) - 1)) / 1_000_000 end

IO.puts(
  ~s({"op_p95_ms": #{Float.round(pick.(0.95), 4)}, "op_median_ms": #{Float.round(pick.(0.5), 4)}, "ops": #{count}})
)
