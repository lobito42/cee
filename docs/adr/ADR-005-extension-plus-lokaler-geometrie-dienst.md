# ADR-005: Extension plus lokaler Geometrie-Dienst

- Status: ersetzt durch ADR-031
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

UI und Geometrie haben unterschiedliche Laufzeiten (TypeScript, Python) und Absturzrisiken.

## Entscheidung

Die Extension (TypeScript) verwaltet UI, Webview und Prozesse. Ein lokaler Python-Prozess führt Modelle aus, cached Ergebnisse und spricht JSON-RPC. Die Python-Umgebung wird mit `uv` reproduzierbar aufgesetzt.

## Alternativen

Eigene Desktop-App, Web-App.

## Konsequenzen

Kein Cloud-Zwang, Modelle bleiben lokal. Prozess-Lebenszyklus, Timeouts und Absturz-Isolation müssen sauber gelöst werden.
