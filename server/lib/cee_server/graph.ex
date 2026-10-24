defmodule CeeServer.Graph do
  @moduledoc """
  Bibliotheksschicht über den Rust-Kern (`crates/graph-nif` → `cee-bind` → `cee-graph`, ADR-029).

  Dokument und Zustände sind Ressourcen (Referenzen), die der aufrufende Prozess hält (ADR-030); diese
  Schicht startet keine Prozesse – den Dokumentprozess baut ap-07a. Ergebnisse kommen als `{:ok, wert}`,
  Fehler als `{:error, %{code: String.t(), message: String.t(), element: String.t() | nil}}`.

  Eingaben dürfen Elixir-Werte (Maps, Listen) oder JSON-Text sein; sie werden vor dem Aufruf zu JSON
  kodiert, geparst wird nur im Kern. Die NIF wird immer im Release-Modus übersetzt. Fachpakete und
  Prüfhilfen schaltet die Umgebungsvariable `CEE_BIND_FEATURES` (z. B. `pkg-beispiel,test-hooks`) beim
  Übersetzen ein.
  """

  # Übersetzt wird die NIF vom Mix-Compiler `:cee_nif` (server/mix.exs, immer Release); hier wird sie nur
  # geladen.
  use Rustler,
    otp_app: :cee_server,
    crate: "cee_graph_nif",
    mode: :release,
    skip_compilation?: true,
    load_from: {:cee_server, "priv/native/cee_graph_nif"}

  # NIF-Funktionen: Dialyzer nimmt für sie die Typespecs statt der Platzhalter-Rümpfe.
  @nifs [
    nif_units: 0,
    nif_parse: 2,
    nif_convert: 3,
    nif_doc_new: 0,
    nif_doc_import_project: 2,
    nif_doc_load: 2,
    nif_doc_save: 1,
    nif_doc_apply_op: 2,
    nif_doc_apply: 2,
    nif_doc_export: 1,
    nif_doc_hash: 1,
    nif_doc_merge: 2,
    nif_doc_validate: 1,
    nif_doc_order: 1,
    nif_doc_affected: 2,
    nif_doc_subgraph: 2,
    nif_doc_migrate: 1,
    nif_doc_element: 2,
    nif_doc_materialized_count: 1,
    nif_states_new: 1,
    nif_states_event: 2,
    nif_states_ready: 1,
    nif_states_get: 1,
    nif_packages: 0,
    nif_call: 3,
    nif_debug_panic: 0
  ]

  @typedoc "Dokument-Ressource."
  @type doc :: reference()
  @typedoc "Zustände-Ressource."
  @type states :: reference()
  @typedoc "Strukturierter Fehler."
  @type error :: %{code: String.t(), message: String.t(), element: String.t() | nil}
  @typedoc "JSON-Wert als Elixir-Term oder JSON-Text."
  @type json_input :: map() | list() | String.t()
  @typedoc "Ergebnis eines Aufrufs."
  @type result(t) :: {:ok, t} | {:error, error()}

  # --- Einheiten -------------------------------------------------------------------------------------

  @doc "Einheitentabelle (`[%{code, dimension, factor}]`)."
  @spec units() :: result(list())
  def units, do: decoded(nif_units())

  @doc "Liest eine Eingabe wie „1,2 m“; Ergebnis `%{value, unit}` in kanonischer Einheit."
  @spec parse(String.t(), String.t() | nil) :: result(map())
  def parse(text, default \\ nil), do: decoded(nif_parse(text, default))

  @doc "Rechnet einen Wert zwischen Einheiten gleicher Dimension um."
  @spec convert(number(), String.t(), String.t()) :: result(float())
  def convert(value, from, to), do: nif_convert(value / 1, from, to)

  # --- Dokument --------------------------------------------------------------------------------------

  @doc "Leeres Dokument."
  @spec new() :: result(doc())
  def new, do: nif_doc_new()

  @doc "Projekt importieren; Ergebnis `{dokument, %{findings, type_errors}}`."
  @spec import_project(json_input(), json_input() | nil) :: result({doc(), map()})
  def import_project(project, types \\ nil) do
    case nif_doc_import_project(json(project), json_or_nil(types)) do
      {:ok, {doc, info}} -> {:ok, {doc, Jason.decode!(info)}}
      {:error, _} = err -> err
    end
  end

  @doc "Gespeicherte Bytes laden (Migrationen beim Öffnen)."
  @spec load(binary(), json_input() | nil) :: result(doc())
  def load(bytes, types \\ nil), do: nif_doc_load(bytes, json_or_nil(types))

  @doc "Dokument als Bytes."
  @spec save(doc()) :: result(binary())
  def save(doc), do: nif_doc_save(doc)

  @doc "Eine Operation anwenden; Ergebnis `%{result => ok, warnings => [...]}`."
  @spec apply_op(doc(), json_input()) :: result(map())
  def apply_op(doc, op), do: decoded(nif_doc_apply_op(doc, json(op)))

  @doc "Operationsliste anwenden; Ergebnis `%{results => [...]}`."
  @spec apply(doc(), json_input()) :: result(map())
  def apply(doc, ops), do: decoded(nif_doc_apply(doc, json(ops)))

  @doc "Kanonisches Projekt-JSON als Text (bitgleich zu `graphctl export`)."
  @spec export(doc()) :: result(String.t())
  def export(doc), do: nif_doc_export(doc)

  @doc "Inhalts-Hash (SHA-256, hex)."
  @spec hash(doc()) :: result(String.t())
  def hash(doc), do: nif_doc_hash(doc)

  @doc "Führt `other` in `doc` zusammen; Ergebnis ist `doc`."
  @spec merge(doc(), doc()) :: result(doc())
  def merge(doc, other) do
    case nif_doc_merge(doc, other) do
      {:ok, _} -> {:ok, doc}
      {:error, _} = err -> err
    end
  end

  @doc "Prüfung; Ergebnis `%{findings => [...]}`."
  @spec validate(doc()) :: result(map())
  def validate(doc), do: decoded(nif_doc_validate(doc))

  @doc "Berechnungsreihenfolge; Ergebnis `%{order, skipped}`."
  @spec order(doc()) :: result(map())
  def order(doc), do: decoded(nif_doc_order(doc))

  @doc "Betroffene Elemente nach Änderung der genannten IDs; Ergebnis `%{affected}`."
  @spec affected(doc(), [String.t()]) :: result(map())
  def affected(doc, ids), do: decoded(nif_doc_affected(doc, Jason.encode!(ids)))

  @doc "Untergraph eines Elements; Ergebnis `%{elements, external_inputs, materialized_count}`."
  @spec subgraph(doc(), String.t()) :: result(map())
  def subgraph(doc, id), do: decoded(nif_doc_subgraph(doc, id))

  @doc "Schema-Version beim Laden und jetzt; Ergebnis `%{before, after}`."
  @spec migrate(doc()) :: result(map())
  def migrate(doc), do: decoded(nif_doc_migrate(doc))

  @doc "Ein Element lesen (Teil-Laden); fehlt es, Fehler `missing_target`."
  @spec element(doc(), String.t()) :: result(map())
  def element(doc, id), do: decoded(nif_doc_element(doc, id))

  @doc "Anzahl der bisher aufbereiteten Elemente."
  @spec materialized_count(doc()) :: result(non_neg_integer())
  def materialized_count(doc), do: nif_doc_materialized_count(doc)

  # --- Zustände --------------------------------------------------------------------------------------

  @doc "Neue Berechnungszustände für den aktuellen Stand des Dokuments."
  @spec states_new(doc()) :: result(states())
  def states_new(doc), do: nif_states_new(doc)

  @doc "Ereignis `%{event => start | ok | err | change, id => id}`."
  @spec states_event(states(), json_input()) :: :ok | {:error, error()}
  def states_event(states, event) do
    case nif_states_event(states, json(event)) do
      {:ok, _} -> :ok
      {:error, _} = err -> err
    end
  end

  @doc "Elemente, die jetzt berechnet werden können."
  @spec states_ready(states()) :: result([String.t()])
  def states_ready(states), do: decoded(nif_states_ready(states))

  @doc "Alle Zustände `%{states, ready, findings}`."
  @spec states_get(states()) :: result(map())
  def states_get(states), do: decoded(nif_states_get(states))

  # --- Fachpakete ------------------------------------------------------------------------------------

  @doc "Namen der angemeldeten Fachpaket-Funktionen."
  @spec packages() :: result([String.t()])
  def packages, do: decoded(nif_packages())

  @doc "Fachpaket-Funktion aufrufen (lesend)."
  @spec call(String.t(), doc(), json_input()) :: result(term())
  def call(name, doc, args), do: decoded(nif_call(name, doc, json(args)))

  @doc "Absichtlicher Panic im Kern (nur mit Feature `test-hooks`); liefert immer `internal`."
  @spec debug_panic() :: {:error, error()} | {:ok, boolean()}
  def debug_panic, do: nif_debug_panic()

  # --- Hilfen ----------------------------------------------------------------------------------------

  @spec decoded({:ok, String.t()} | {:error, error()}) :: result(term())
  defp decoded({:ok, text}), do: {:ok, Jason.decode!(text)}
  defp decoded({:error, _} = err), do: err

  @spec json(json_input()) :: String.t()
  defp json(text) when is_binary(text), do: text
  defp json(value), do: Jason.encode!(value)

  @spec json_or_nil(json_input() | nil) :: String.t() | nil
  defp json_or_nil(nil), do: nil
  defp json_or_nil(value), do: json(value)

  # --- NIF-Platzhalter (werden beim Laden durch die NIF ersetzt) ------------------------------------

  @doc false
  @spec nif_units() :: {:ok, String.t()} | {:error, error()}
  def nif_units, do: err()
  @doc false
  @spec nif_parse(String.t(), String.t() | nil) :: {:ok, String.t()} | {:error, error()}
  def nif_parse(_text, _default), do: err()
  @doc false
  @spec nif_convert(float(), String.t(), String.t()) :: result(float())
  def nif_convert(_value, _from, _to), do: err()
  @doc false
  @spec nif_doc_new() :: result(doc())
  def nif_doc_new, do: err()
  @doc false
  @spec nif_doc_import_project(String.t(), String.t() | nil) :: result({doc(), String.t()})
  def nif_doc_import_project(_project, _types), do: err()
  @doc false
  @spec nif_doc_load(binary(), String.t() | nil) :: result(doc())
  def nif_doc_load(_bytes, _types), do: err()
  @doc false
  @spec nif_doc_save(doc()) :: result(binary())
  def nif_doc_save(_doc), do: err()
  @doc false
  @spec nif_doc_apply_op(doc(), String.t()) :: result(String.t())
  def nif_doc_apply_op(_doc, _op), do: err()
  @doc false
  @spec nif_doc_apply(doc(), String.t()) :: result(String.t())
  def nif_doc_apply(_doc, _ops), do: err()
  @doc false
  @spec nif_doc_export(doc()) :: result(String.t())
  def nif_doc_export(_doc), do: err()
  @doc false
  @spec nif_doc_hash(doc()) :: result(String.t())
  def nif_doc_hash(_doc), do: err()
  @doc false
  @spec nif_doc_merge(doc(), doc()) :: result(boolean())
  def nif_doc_merge(_doc, _other), do: err()
  @doc false
  @spec nif_doc_validate(doc()) :: result(String.t())
  def nif_doc_validate(_doc), do: err()
  @doc false
  @spec nif_doc_order(doc()) :: result(String.t())
  def nif_doc_order(_doc), do: err()
  @doc false
  @spec nif_doc_affected(doc(), String.t()) :: result(String.t())
  def nif_doc_affected(_doc, _ids), do: err()
  @doc false
  @spec nif_doc_subgraph(doc(), String.t()) :: result(String.t())
  def nif_doc_subgraph(_doc, _id), do: err()
  @doc false
  @spec nif_doc_migrate(doc()) :: result(String.t())
  def nif_doc_migrate(_doc), do: err()
  @doc false
  @spec nif_doc_element(doc(), String.t()) :: result(String.t())
  def nif_doc_element(_doc, _id), do: err()
  @doc false
  @spec nif_doc_materialized_count(doc()) :: result(non_neg_integer())
  def nif_doc_materialized_count(_doc), do: err()
  @doc false
  @spec nif_states_new(doc()) :: result(states())
  def nif_states_new(_doc), do: err()
  @doc false
  @spec nif_states_event(states(), String.t()) :: result(boolean())
  def nif_states_event(_states, _event), do: err()
  @doc false
  @spec nif_states_ready(states()) :: result(String.t())
  def nif_states_ready(_states), do: err()
  @doc false
  @spec nif_states_get(states()) :: result(String.t())
  def nif_states_get(_states), do: err()
  @doc false
  @spec nif_packages() :: result(String.t())
  def nif_packages, do: err()
  @doc false
  @spec nif_call(String.t(), doc(), String.t()) :: result(String.t())
  def nif_call(_name, _doc, _args), do: err()
  @doc false
  @spec nif_debug_panic() :: result(boolean())
  def nif_debug_panic, do: err()

  # Ohne geladene NIF ein Fehler. Der zweite Zweig wird nie erreicht; er verhindert nur, dass Dialyzer aus
  # dem Platzhalter-Rumpf „kehrt nie zurück“ schließt – maßgeblich sind die Typespecs der NIF-Funktionen.
  @spec err() :: term()
  defp err do
    case :erlang.phash2(:nif, 1) do
      0 -> :erlang.nif_error(:nif_not_loaded)
      _ -> :erlang.binary_to_term(<<131, 106>>)
    end
  end
end
