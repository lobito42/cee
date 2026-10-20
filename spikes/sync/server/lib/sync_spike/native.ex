defmodule SyncSpike.Native do
  @moduledoc """
  NIF-Anbindung des Sync-Spikes (`spikes/sync/native/sync_nif`, Rust-Kern aus ap-01).

  Ein Dokument ist eine Referenz auf eine Rust-Ressource, die genau ein Prozess hält (ADR-030); je
  Verbindung gibt es eine Sync-Zustands-Ressource. Fehler und abgefangene Panics kommen als
  `{:error, grund}` zurück. Erzeugen, Sync, Hash, Projekt und Befunde laufen auf Dirty-CPU-Schedulern.
  """

  @on_load :load_nif

  @doc false
  @spec load_nif() :: :ok | {:error, term()}
  def load_nif do
    path = :code.priv_dir(:sync_spike) |> Path.join("native/sync_nif")
    :erlang.load_nif(String.to_charlist(path), 0)
  end

  @typedoc "Referenz auf ein Dokument im Rust-Kern."
  @type doc :: reference()
  @typedoc "Referenz auf den Sync-Zustand einer Verbindung."
  @type conn :: reference()

  @doc "Neues Dokument aus dem synthetischen Projekt mit `n` Elementen (ap-01)."
  @spec new_doc(non_neg_integer()) :: {:ok, doc()} | {:error, String.t()}
  def new_doc(_n), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Leeres Dokument (Gegenstelle in Tests)."
  @spec new_empty() :: doc()
  def new_empty, do: :erlang.nif_error(:nif_not_loaded)

  @doc "Operation oder Liste (JSON-Text wie `ops.json`) anwenden (Tests)."
  @spec apply_json(doc(), String.t()) :: {:ok, non_neg_integer()} | {:error, String.t()}
  def apply_json(_doc, _ops_json), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Wert eines Felds als JSON-Text oder `nil` (Tests)."
  @spec field_json(doc(), String.t(), String.t(), String.t()) ::
          {:ok, String.t() | nil} | {:error, String.t()}
  def field_json(_doc, _id, _field, _name), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Neuer Sync-Zustand für eine Verbindung."
  @spec new_conn() :: conn()
  def new_conn, do: :erlang.nif_error(:nif_not_loaded)

  @doc "Nächste Sync-Nachricht für die Verbindung oder `nil`."
  @spec generate_message(doc(), conn()) :: {:ok, binary() | nil} | {:error, String.t()}
  def generate_message(_doc, _conn), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Sync-Nachricht anwenden; liefert die Köpfe danach."
  @spec receive_message(doc(), conn(), binary()) :: {:ok, [String.t()]} | {:error, String.t()}
  def receive_message(_doc, _conn, _message), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Köpfe der Historie (hex, sortiert)."
  @spec heads(doc()) :: {:ok, [String.t()]} | {:error, String.t()}
  def heads(_doc), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Inhalts-Hash (SHA-256, hex) über die kanonische Form."
  @spec hash(doc()) :: {:ok, String.t()} | {:error, String.t()}
  def hash(_doc), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Kanonisches Projekt-JSON."
  @spec project_json(doc()) :: {:ok, String.t()} | {:error, String.t()}
  def project_json(_doc), do: :erlang.nif_error(:nif_not_loaded)

  @doc "Befunde als JSON-Liste (volle Prüfung, auf Abruf)."
  @spec findings_json(doc()) :: {:ok, String.t()} | {:error, String.t()}
  def findings_json(_doc), do: :erlang.nif_error(:nif_not_loaded)
end
