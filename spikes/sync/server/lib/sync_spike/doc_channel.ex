defmodule SyncSpike.DocChannel do
  @moduledoc """
  Channel `doc:<name>`: eine Verbindung eines Clients zu einem Dokument.

  Nachrichten (Sync-Nachrichten als Base64 in JSON):

  - Client → Server `sync` `%{"m" => base64, "t" => ms}` → Antwort `{:ok, %{heads}}` oder
    `{:error, %{code, message, element_id, hint}}`
  - Client → Server `hash`, `heads` → Antwort mit dem Wert des Servers
  - Server → Client `sync` `%{m: base64, t: ms | nil, h: köpfe}`; `t` ist der Zeitstempel des Senders, den
    der Server nur weiterreicht (Latenzanzeige der Demo-Seite); `h` sind die Köpfe des Servers, damit
    Clients erkennen, wann alle denselben Stand haben

  Beitritte und eingehende Nachrichten werden nicht protokolliert: ihre Parameter sind Modellinhalte
  (ADR-056).
  """
  use Phoenix.Channel, log_join: false, log_handle_in: false

  alias SyncSpike.DocServer

  @impl true
  def join("doc:" <> name, _params, socket) do
    with true <- valid_name?(name),
         {:ok, pid} <- DocServer.ensure(name),
         :ok <- DocServer.join(pid, self()) do
      Process.monitor(pid)
      {:ok, assign(socket, doc: pid, name: name)}
    else
      _ -> {:error, error("join_failed", "Dokument nicht verfügbar")}
    end
  end

  @impl true
  def handle_in("sync", %{"m" => encoded} = payload, socket) when is_binary(encoded) do
    with {:ok, message} <- Base.decode64(encoded),
         {:ok, heads} <- DocServer.sync(socket.assigns.doc, self(), message, payload["t"]) do
      {:reply, {:ok, %{heads: heads}}, socket}
    else
      :error ->
        {:reply, {:error, error("invalid_encoding", "Nachricht ist kein Base64")}, socket}

      {:error, reason} ->
        {:reply, {:error, error("invalid_sync_message", reason)}, socket}
    end
  end

  def handle_in("hash", _payload, socket) do
    reply(DocServer.hash(socket.assigns.doc), :hash, socket)
  end

  def handle_in("heads", _payload, socket) do
    reply(DocServer.heads(socket.assigns.doc), :heads, socket)
  end

  def handle_in(_event, _payload, socket) do
    {:reply, {:error, error("unknown_event", "unbekannte Nachricht")}, socket}
  end

  @impl true
  def handle_info({:sync_out, message, t, heads}, socket) do
    push(socket, "sync", %{m: Base.encode64(message), t: t, h: heads})
    {:noreply, socket}
  end

  # Der Dokumentprozess ist weg (z. B. hart beendet): Verbindung schließen, der Client tritt neu bei.
  def handle_info({:DOWN, _ref, :process, _pid, _reason}, socket) do
    {:stop, :normal, socket}
  end

  defp reply({:ok, value}, key, socket), do: {:reply, {:ok, %{key => value}}, socket}

  defp reply({:error, reason}, _key, socket),
    do: {:reply, {:error, error("core_error", reason)}, socket}

  defp valid_name?(name), do: name =~ ~r/\A[A-Za-z0-9_-]{1,64}\z/

  defp error(code, message) do
    %{code: code, message: message, element_id: nil, hint: hint(code)}
  end

  defp hint("invalid_sync_message"), do: "Sync-Zustand verwerfen und neu beitreten"
  defp hint("invalid_encoding"), do: "Sync-Nachrichten als Base64 senden"
  defp hint(_), do: nil
end
