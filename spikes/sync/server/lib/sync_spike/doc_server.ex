defmodule SyncSpike.DocServer do
  @moduledoc """
  Genau ein Prozess je geöffnetem Dokument (ADR-030), unter `SyncSpike.DocSupervisor`, gefunden über
  `SyncSpike.Registry`. Der Prozess hält das Dokument als NIF-Ressource und je Verbindung (Channel-Prozess)
  einen Sync-Zustand. Er ist Teilnehmer wie jeder Client: Er wendet empfangene Sync-Nachrichten an und
  erzeugt danach für jede Verbindung die nächste Nachricht.

  Das Dokument liegt nur im Arbeitsspeicher; es entsteht beim ersten Beitritt aus dem synthetischen
  Projekt von ap-01. Protokolle enthalten nie Modellinhalte (ADR-056).
  """
  use GenServer, restart: :temporary

  require Logger

  alias SyncSpike.Native

  @call_timeout 120_000

  @typedoc "Ausgehende Nachricht an einen Channel-Prozess."
  @type outgoing :: {:sync_out, binary(), number() | nil}

  # --- Schnittstelle -----------------------------------------------------------------------------------

  @doc "Prozess des Dokuments `name`; startet ihn, falls nötig."
  @spec ensure(String.t()) :: {:ok, pid()} | {:error, term()}
  def ensure(name) do
    case whereis(name) do
      nil ->
        case DynamicSupervisor.start_child(SyncSpike.DocSupervisor, {__MODULE__, name}) do
          {:ok, pid} -> {:ok, pid}
          {:error, {:already_started, pid}} -> {:ok, pid}
          other -> other
        end

      pid ->
        {:ok, pid}
    end
  end

  @doc "Prozess des Dokuments oder `nil`."
  @spec whereis(String.t()) :: pid() | nil
  def whereis(name) do
    case Registry.lookup(SyncSpike.Registry, name) do
      [{pid, _}] -> pid
      [] -> nil
    end
  end

  @doc "Alle Dokumentprozesse: `[%{doc, pid, clients}]`."
  @spec list() :: [%{doc: String.t(), pid: String.t(), clients: non_neg_integer()}]
  def list do
    SyncSpike.Registry
    |> Registry.select([{{:"$1", :"$2", :_}, [], [{{:"$1", :"$2"}}]}])
    |> Enum.sort()
    |> Enum.flat_map(fn {name, pid} ->
      try do
        [%{doc: name, pid: inspect(pid), clients: GenServer.call(pid, :clients, @call_timeout)}]
      catch
        :exit, _ -> []
      end
    end)
  end

  @doc "Verbindung `chan` anmelden; der Erstabgleich geht als `{:sync_out, …}` an `chan`."
  @spec join(pid(), pid()) :: :ok | {:error, String.t()}
  def join(pid, chan), do: GenServer.call(pid, {:join, chan}, @call_timeout)

  @doc "Sync-Nachricht der Verbindung `chan` anwenden; liefert die Köpfe des Servers danach."
  @spec sync(pid(), pid(), binary(), number() | nil) :: {:ok, [String.t()]} | {:error, String.t()}
  def sync(pid, chan, message, t),
    do: GenServer.call(pid, {:sync, chan, message, t}, @call_timeout)

  @doc "Köpfe der Historie."
  @spec heads(pid()) :: {:ok, [String.t()]} | {:error, String.t()}
  def heads(pid), do: GenServer.call(pid, :heads, @call_timeout)

  @doc "Inhalts-Hash."
  @spec hash(pid()) :: {:ok, String.t()} | {:error, String.t()}
  def hash(pid), do: GenServer.call(pid, :hash, @call_timeout)

  @doc "Kanonisches Projekt-JSON."
  @spec project_json(pid()) :: {:ok, String.t()} | {:error, String.t()}
  def project_json(pid), do: GenServer.call(pid, :project, @call_timeout)

  @doc "Befunde als JSON-Liste (volle Prüfung, auf Abruf)."
  @spec findings_json(pid()) :: {:ok, String.t()} | {:error, String.t()}
  def findings_json(pid), do: GenServer.call(pid, :findings, @call_timeout)

  @doc false
  @spec start_link(String.t()) :: GenServer.on_start()
  def start_link(name) do
    GenServer.start_link(__MODULE__, name, name: {:via, Registry, {SyncSpike.Registry, name}})
  end

  # --- Prozess -----------------------------------------------------------------------------------------

  @impl true
  def init(name) do
    {:ok, %{name: name, doc: nil, conns: %{}}, {:continue, :load}}
  end

  @impl true
  def handle_continue(:load, state) do
    elements = Application.get_env(:sync_spike, :elements, 10_000)
    started = System.monotonic_time(:millisecond)

    case Native.new_doc(elements) do
      {:ok, doc} ->
        ms = System.monotonic_time(:millisecond) - started
        Logger.info("Dokumentprozess #{state.name}: #{elements} Elemente erzeugt in #{ms} ms")
        {:noreply, %{state | doc: doc}}

      {:error, _reason} ->
        Logger.error("Dokumentprozess #{state.name}: Erzeugen fehlgeschlagen")
        {:stop, :doc_failed, state}
    end
  end

  @impl true
  def handle_call(:clients, _from, state), do: {:reply, map_size(state.conns), state}

  def handle_call({:join, chan}, _from, state) do
    ref = Process.monitor(chan)
    conns = Map.put(state.conns, chan, %{conn: Native.new_conn(), mon: ref})
    state = %{state | conns: conns}
    push_to(state, chan, nil)
    {:reply, :ok, state}
  end

  def handle_call({:sync, chan, message, t}, _from, state) do
    case Map.fetch(state.conns, chan) do
      {:ok, %{conn: conn}} ->
        case Native.receive_message(state.doc, conn, message) do
          {:ok, heads} ->
            Enum.each(Map.keys(state.conns), &push_to(state, &1, t))
            {:reply, {:ok, heads}, state}

          {:error, reason} ->
            # Nur die Tatsache, nie den Inhalt oder den Grund (der Bytes zitieren könnte) protokollieren.
            Logger.warning("Dokumentprozess #{state.name}: ungültige Sync-Nachricht abgewiesen")
            {:reply, {:error, reason}, state}
        end

      :error ->
        {:reply, {:error, "Verbindung nicht angemeldet"}, state}
    end
  end

  def handle_call(:heads, _from, state), do: {:reply, Native.heads(state.doc), state}
  def handle_call(:hash, _from, state), do: {:reply, Native.hash(state.doc), state}
  def handle_call(:project, _from, state), do: {:reply, Native.project_json(state.doc), state}
  def handle_call(:findings, _from, state), do: {:reply, Native.findings_json(state.doc), state}

  @impl true
  def handle_info({:DOWN, _ref, :process, chan, _reason}, state) do
    {:noreply, %{state | conns: Map.delete(state.conns, chan)}}
  end

  # Nächste Sync-Nachricht für eine Verbindung erzeugen und an den Channel-Prozess schicken.
  defp push_to(state, chan, t) do
    %{conn: conn} = Map.fetch!(state.conns, chan)

    case Native.generate_message(state.doc, conn) do
      {:ok, nil} ->
        :ok

      {:ok, message} ->
        send(chan, {:sync_out, message, t})

      {:error, _reason} ->
        Logger.warning("Dokumentprozess #{state.name}: Sync-Nachricht nicht erzeugt")
    end
  end
end
