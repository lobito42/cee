defmodule Datenmodell.Native do
  @moduledoc """
  NIF-Anbindung des Datenmodell-Prototyps (Rustler, `native/datenmodell_nif`).

  Ein Dokument ist eine Referenz auf eine Rust-Ressource; im Server hält sie genau ein Prozess je Dokument
  (ADR-030). Fehler kommen als `{:error, grund}` zurück. Laden, Hash und Operationslisten laufen auf
  Dirty-CPU-Schedulern, `set_param/4` auf dem normalen Scheduler.
  """

  @on_load :load_nif

  @doc false
  @spec load_nif() :: :ok | {:error, term()}
  def load_nif do
    path = Path.expand("../../priv/datenmodell_nif", __DIR__)
    :erlang.load_nif(String.to_charlist(path), 0)
  end

  @typedoc "Referenz auf ein Dokument im Rust-Kern."
  @type doc :: reference()

  @doc "Projekt aus JSON-Text laden."
  @spec load_json(String.t()) :: {:ok, doc()} | {:error, String.t()}
  def load_json(_json), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Synthetisches Projekt mit `n` Elementen erzeugen (Messungen)."
  @spec synth(non_neg_integer()) :: {:ok, doc()} | {:error, String.t()}
  def synth(_n), do: :erlang.nif_error(:nif_not_loaded)

  @doc "IDs der änderbaren Elemente eines synthetischen Projekts."
  @spec synth_editable_ids(non_neg_integer()) :: [String.t()]
  def synth_editable_ids(_n), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Parameter setzen; der Wert ist JSON-Text."
  @spec set_param(doc(), String.t(), String.t(), String.t()) :: {:ok, :ok} | {:error, String.t()}
  def set_param(_doc, _id, _name, _value_json), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Operationsliste (JSON-Text wie `ops.json`) anwenden."
  @spec apply_ops(doc(), String.t()) :: {:ok, non_neg_integer()} | {:error, String.t()}
  def apply_ops(_doc, _ops_json), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Inhalts-Hash (SHA-256, hex) über die kanonische Form."
  @spec hash(doc()) :: {:ok, String.t()} | {:error, String.t()}
  def hash(_doc), do: :erlang.nif_error(:nif_not_loaded)
end
