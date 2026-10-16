# ADR-029: Rust-Kern für das Datenmodell

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Server (Elixir), Browser (TypeScript), Desktop (Tauri) und Python-SDK müssen dasselbe Datenmodell exakt gleich verstehen. Mehrere Implementierungen würden auseinanderlaufen.

## Entscheidung

Eine Rust-Bibliothek (`crates/graph`) enthält: Elementschema und Validierung, Abhängigkeitsanalyse und Planung der inkrementellen Neuberechnung, das CRDT-Dokument (automerge-rs, ADR-033), die Textprojektion und Inhalts-Hashes für den Geometrie-Cache. Eingebunden wird sie als Rustler-NIF (Elixir), WASM (Browser), nativ (Tauri) und über PyO3 (Python). Der Kern enthält keine Geometrie.

## Alternativen

Getrennte Implementierungen je Sprache; Kern in TypeScript; Elixir-Bindings Dritter (`y_ex`, `gleam_automerge`, noch unreif).

## Konsequenzen

Eine Wahrheit über das Datenmodell. Rust ist eine weitere Sprache im Projekt. NIF-Aufrufe sind kurz oder laufen auf Dirty Schedulern; Panics dürfen die BEAM nicht erreichen.
