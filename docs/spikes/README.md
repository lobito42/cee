# Spike-Berichte

Spikes des Meilensteins M0 (ADR-059). Aufbau: `## Fragestellung`, `## Vorgehen`, `## Messwerte`, `## Empfehlung`
(erste Zeile Go oder No-Go). Messwerte zusätzlich maschinenlesbar als `<name>.json`, wenn der Change das verlangt.

| Change | Bericht | Frage |
| --- | --- | --- |
| ap-01-spike-datenmodell | `datenmodell.md` | Trägt eine einheitliche Elementform? Ist Automerge schnell genug? |
| ap-03-spike-sync | `sync.md` | Zwei Clients live über Phoenix, einer offline, Merge ohne Datenverlust? |
| ap-04-spike-rendering | `rendering.md` | Echtzeit-PBR und Fotomodus (Path Tracing) in Browser und Tauri auf drei Systemen? |
| ap-49-spike-auswahl | `auswahl.md` | Trägt Auswahl nach Regel als Element im Graphen über Neuberechnung, mit Befund statt Absturz und schnell genug? |

## ap-00

Pipeline-Durchlauf von `ap-00-setup` (Task 2.2 in `openspec/changes/ap-00-setup/tasks.md`); den Link auf den
gemergten PR trägt das Kernteam nach dem Merge ein.

- **Branches:** `spec/ap-00-setup` (Entwurf), `tests/ap-00-setup` (Abnahmetests), `change/ap-00-setup`
  (Umsetzung, Entwurfs-PR #3).
- **Umsetzung in der Nachtschicht:** Rust-Workspace, Worker und Beispiel-Script-Element standen zuerst; danach
  Phoenix-Server (`GET /health`, Credo, Dialyzer), Client (Vite, TypeScript strict, ESLint, Prettier, Vitest)
  und die Tauri-2-Hülle.
- **CI-Jobs:** Rust, Elixir, Client, Worker und `desktop` (Linux, Windows, macOS). Dialyzer baut beim ersten
  Lauf die PLT (mehrere Minuten); die Abnahmetests geben dafür 1500 s Zeit.
- **Dauer:** `uv run pytest -q tests/acceptance/ap-00-setup` läuft lokal in rund 16 s, sobald PLT und
  Abhängigkeiten zwischengespeichert sind.
- **Probleme:** Der Tauri-Build braucht unter Linux WebKitGTK-Pakete; in der Nachtschicht-Umgebung fehlen sie
  und ohne Root-Rechte lassen sie sich nicht nachinstallieren. Der Build ist deshalb nur im CI-Job `desktop`
  belegt. `npm audit` meldet eine Schwachstelle in der Entwicklungsabhängigkeit Vitest (Pfadzugriff über
  `@vitest/mocker`, nur im Dev-Server); die Behebung verlangt einen Hauptversionssprung und bleibt dem
  Kernteam überlassen.
