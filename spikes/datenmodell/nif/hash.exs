# Aufruf: mix run --no-start hash.exs <projekt.json> <ops.json>
# Gibt {"hash": "<hex>"} aus – gleiche Ausgabe wie der native Befehl `hash` und wasm/hash.mjs.
alias Datenmodell.Native

case System.argv() do
  [project, ops] ->
    with {:ok, doc} <- Native.load_json(File.read!(project)),
         {:ok, _count} <- Native.apply_ops(doc, File.read!(ops)),
         {:ok, hash} <- Native.hash(doc) do
      IO.puts(~s({"hash": "#{hash}"}))
    else
      {:error, reason} ->
        IO.puts(:stderr, "Fehler: #{reason}")
        System.halt(1)
    end

  _ ->
    IO.puts(:stderr, "Aufruf: mix run --no-start hash.exs <projekt.json> <ops.json>")
    System.halt(2)
end
