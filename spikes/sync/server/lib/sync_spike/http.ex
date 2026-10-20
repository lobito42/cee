defmodule SyncSpike.Http do
  @moduledoc """
  HTTP-Schnittstelle des Spikes (nur 127.0.0.1, ohne Anmeldung):

  - `GET /health` → `ok`
  - `GET /docs` → ein Eintrag je Dokumentprozess
  - `GET /docs/<name>/hash`, `/project`, `/findings`
  - `POST /docs/<name>/kill` → beendet den Dokumentprozess hart (Isolationstest)
  - `GET /` → Demo-Seite
  """
  use Plug.Router

  alias SyncSpike.DocServer

  plug(:match)
  plug(:dispatch)

  get "/health" do
    send_resp(conn, 200, "ok")
  end

  get "/" do
    conn
    |> put_resp_content_type("text/html")
    |> send_file(200, Path.expand("../../../client/demo/index.html", __DIR__))
  end

  get "/docs" do
    json(conn, 200, DocServer.list())
  end

  get "/docs/:name/hash" do
    with_doc(conn, name, fn pid ->
      with {:ok, hash} <- DocServer.hash(pid), do: {:ok, Jason.encode!(%{hash: hash})}
    end)
  end

  get "/docs/:name/project" do
    with_doc(conn, name, &DocServer.project_json/1)
  end

  get "/docs/:name/findings" do
    with_doc(conn, name, &DocServer.findings_json/1)
  end

  post "/docs/:name/kill" do
    case DocServer.whereis(name) do
      nil ->
        json(conn, 404, %{code: "not_found", message: "Dokument nicht geöffnet"})

      pid ->
        ref = Process.monitor(pid)
        Process.exit(pid, :kill)

        receive do
          {:DOWN, ^ref, :process, _, _} -> :ok
        after
          5_000 -> :ok
        end

        json(conn, 200, %{killed: inspect(pid)})
    end
  end

  match _ do
    json(conn, 404, %{code: "not_found", message: "unbekannter Pfad"})
  end

  defp with_doc(conn, name, fun) do
    case DocServer.whereis(name) do
      nil ->
        json(conn, 404, %{code: "not_found", message: "Dokument nicht geöffnet"})

      pid ->
        case fun.(pid) do
          {:ok, body} ->
            conn |> put_resp_content_type("application/json") |> send_resp(200, body)

          {:error, reason} ->
            json(conn, 500, %{code: "core_error", message: reason})
        end
    end
  end

  defp json(conn, status, body) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(status, Jason.encode!(body))
  end
end
