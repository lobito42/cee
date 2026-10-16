# client

Ein Client in TypeScript für Browser und Desktop (ADR-031). Lizenz: MPL-2.0.

- `src/` – Arbeitsfläche (three.js, ADR-026), Knoten-Editor und Textprojektion (ADR-035)
- `src-tauri/` – Desktop-Hülle für Linux, Windows, macOS: Rust-Kern nativ, lokaler Speicher, lokaler Worker

Im Browser läuft der Rust-Kern als WASM, Geometrie kommt vom Server. Aufbau in `ap-00-setup`.
