defmodule CadloopServer do
  @moduledoc """
  Server für Zusammenarbeit (ADR-030): ein überwachter Prozess je geöffnetem Dokument,
  nie ein Prozess je Element.
  """

  @doc "Schema-Version, die dieser Server versteht (muss zu crates/graph passen)."
  def schema_version, do: 0
end
