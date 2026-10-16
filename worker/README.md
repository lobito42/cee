# worker

Geometrie-Worker (ADR-032): eigener Betriebssystem-Prozess, spricht das Kernel-Protokoll aus
`format/kernel/` über stdio. Erste Implementierung mit OCP/build123d (OpenCascade). Lizenz: MPL-2.0.

Überwacht vom Server (Elixir-Port, Zeitlimit, Neustart) bzw. auf dem Desktop vom Tauri-Host.
Ergebnisse werden nach Inhalts-Hash gecacht; der Worker hat keinen eigenen Zustand.
Beispiel für ein Script-Element: `parts/examples/halter.py`.
