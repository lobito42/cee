# CEE – Anweisungen für Coding-Agenten

Gilt für Claude Code, OpenCode und Pi. CEE (Collaborative Engineering Environment) ist eine offene,
kollaborative Plattform für Produktdefinition – perspektivisch für kleine und mittlere Unternehmen, was
Blender und OpenSCAD für ihre Communities sind. Ein Projekt ist ein **Graph aus Elementen** – ein
Achsenursprung genauso wie ein ganzes Bauteil. Alle sehen online denselben Stand, offline wird wie bei Git
weitergearbeitet. Bearbeitet wird in 3D, im Knoten-Editor oder als Text; KI-Agenten arbeiten über denselben
Graphen.

## Zu Beginn jeder Sitzung: Wo stehen wir?

Der gesamte Projektzustand liegt im Repository und auf GitHub, nicht in einem Chat. Werkzeug und Gerät
spielen keine Rolle.

1. `git pull` auf `main` (bzw. auf dem eigenen Branch).
2. `openspec/queue.yaml` lesen: freigegebene Changes, ihre Phase und Reihenfolge.
3. `gh pr list` (REST) – offene PRs; ein offener Agenten-PR heißt: erst Review, dann Neues.
4. Den nächsten Schritt nennen und mit dem Menschen abstimmen (interaktiv) bzw. `/nachtschicht` folgen (unbeaufsichtigt).

Hintergrund: `docs/konzept.md` (Export des Konzepts, nur gezielt lesen), Entscheidungen in `docs/adr/`.
`docs/ideen/` ist ein Ideenspeicher: nicht umsetzen, solange es keinen freigegebenen Change dazu gibt.

## Arbeitsweise: Spec-driven mit OpenSpec

1. **Auftrag = OpenSpec-Change** unter `openspec/changes/<id>/` (proposal, design, specs, tasks).
   Nur Changes in `openspec/queue.yaml` sind freigegeben. Details: `openspec show <id>`.
2. **Der Branch bestimmt, was du darfst** (ein Schutz blockiert alles andere):
   - `spec/<id>` – Change entwerfen: nur `openspec/changes/<id>/`
   - `tests/<id>` – Abnahmetests schreiben: nur `tests/acceptance/<id>/`, `tests/golden/`, `tests/ui-reference/`
   - `change/<id>` – umsetzen: Produktcode + Häkchen in `openspec/changes/<id>/tasks.md`
3. **Abnahmetests sind der Vertrag.** Sie sind pytest-Tests und dürfen `cargo`, `mix` oder `npm` aufrufen.
   Fertig heißt: `uv run pytest -q tests/acceptance/<id>` grün und alle Tasks abgehakt. Tests nie
   abschwächen, überspringen oder löschen.
4. **ADRs in `docs/adr/` sind verbindlich.** Widerspruch → melden, nicht umgehen.
5. **Ein Change pro Branch und Pull Request.** Nach drei erfolglosen Anläufen am selben Problem:
   anhalten, committen, im PR unter „Offene Fragen“ beschreiben.

Nie ändern ohne Kernteam: `docs/adr/`, `docs/rules/`, `openspec/specs/`, `openspec/config.yaml`,
`openspec/queue.yaml`, `AGENTS.md`, `CLAUDE.md`, `REVIEW.md`, Lizenzdateien, Werkzeug-Konfiguration
(`.claude/`, `.opencode/`, `opencode.json`, `.pi/`, `.githooks/`, `.github/`).

## Token sparen (Pro-Abo)

- Lies gezielt: `openspec show <id>`, `rg`, Dateiausschnitte. Nie `docs/konzept.md` komplett lesen –
  nur den Abschnitt, den der Change nennt.
- Teste nur, was du geändert hast, und knapp: `pytest -q -x`, `cargo test -q -p <crate>`, `mix test --failed`.
- Keine Erkundung „zur Sicherheit“. Plane kurz, setze um, prüfe mit dem Test aus der Task.
- Regeln je Bereich stehen in `docs/rules/` – lies nur die zu deinen Dateien:
  `kern.md` (crates/), `akustik.md` (crates/acoustics/, Materialien), `server.md` und `mcp.md` (server/), `client.md` (client/), `geometrie.md` (worker/, parts/, sdk/python/).

## Struktur und Befehle

| Pfad | Inhalt | Sprache | Prüfen |
| --- | --- | --- | --- |
| `crates/graph` | Element-Graph, CRDT, Textprojektion – die einzige Implementierung des Datenmodells | Rust | `cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test -q` |
| `server/` | Sync, Presence, Historie, Freigaben, Worker-Steuerung, MCP | Elixir | `cd server && mix format --check-formatted && mix credo --strict && mix dialyzer && mix test` |
| `client/` | Web-App und Tauri-Desktop-App | TypeScript | `cd client && npm run lint && npm test` |
| `worker/` | Geometrie-Worker (OpenCascade über build123d/OCP) | Python | `uv run ruff check . && uv run pytest -q` |
| `packages/` | Fachpakete (ADR-054), z. B. Raum und Akustik; Regeln: `client.md` bzw. `geometrie.md` | TypeScript, Python | wie Client bzw. Worker |
| `sdk/`, `format/` | SDKs und offene Formatspezifikation (Apache-2.0) | – | – |
| `parts/` | Beispiele, z. B. Script-Element `parts/examples/halter.py` | Python | – |

- Setup: `uv sync --extra cad`, `git config core.hooksPath .githooks`, `cd server && mix deps.get`
- OpenSpec: `openspec list`, `openspec show <id>`, `openspec status --change <id>`, `openspec validate <id>`
- Schutz prüfen: `python3 tools/guard.py check <pfad>`

## Architekturregeln (Kurzfassung)

- Der **Element-Graph ist die Quelle der Wahrheit** (ADR-028). Jedes Element hat dieselbe Form; keine
  Sonderwege für einzelne Typen. Geometrie ist abgeleiteter Cache und wird nie gespeichert oder synchronisiert (ADR-032).
- Datenmodell-Logik nur im Rust-Kern; Server, Client und SDK binden ihn ein (ADR-029).
- Server: ein Prozess je Dokument, nie je Element; keine Geometrie in der BEAM (ADR-030).
- Geometrie nur im Worker hinter der Kernel-Schnittstelle (ADR-032). Topologie nie über Indizes (ADR-016).
- Export und Querverweise nur über veröffentlichte Elemente, nie über Sichtbarkeit (ADR-015, ADR-058).
- KI-Änderungen nur als Änderungssatz mit Vorschau (ADR-021).
- Jede Funktion ist ein Befehl im Befehlsregister; Befehlssuche, Tastenkürzel, Plugins und MCP-Tools nutzen
  dasselbe Register. Plugins laufen isoliert; fremde Projekte führen Code erst nach Vertrauen aus (ADR-045).
- Kein fester KI-Anbieter: Modelle nur über die Anbieter-Schnittstelle oder MCP; lokale Modelle müssen
  funktionieren; keine Daten an Dritte ohne ausdrückliche Wahl, keine Telemetrie ohne Zustimmung (ADR-037).
- Der Kern ist fachneutral (ADR-046); Raum und Akustik sind das erste Fachpaket über die Fachpaket-API,
  Arbeitsbereiche sind Beiträge der Fachpakete (ADR-054).
  Freigaben mit Item, Revision und Lebenszyklus; Freigabestände sind unveränderlich, nur Menschen geben frei
  (ADR-047). PLM und ERP nur über offenes Format, API und Ereignisse (ADR-048).
- Automatisierung ist Teil des Graphen: veröffentlichte Untergraphen werden Befehl, Knoten, MCP-Werkzeug und
  App; Studien rechnen Varianten im Worker durch, der Mensch wählt (ADR-049).
- Robust und groß (ADR-050): Fehler eines Elements zerbrechen nie das Modell; Untergraphen und Detailstufen
  werden bei Bedarf geladen; Komponenten haben Referenz-Eingänge; direktes Bearbeiten ist ein Element.
- Einfach und fehlerarm (ADR-051/052): Oberfläche ohne Git-Begriffe (Entwurf, Meilenstein, Übernehmen),
  Verwerfen statt Löschen, Ordnung aus dem Graphen (Facetten, Suche, Rückverweise) statt Ordnerpflege.
- Lernschleife für lokale Modelle nur mit Prüfern als Bewertung, nie Selbstbewertung (ADR-053).
- Reihenfolge nach Meilensteinen M0 bis M3 (ADR-059); nichts aus einem späteren Meilenstein vorziehen.
- Rechte prüft der Server; Agenten laufen als Dienstkonto ohne Freigaberecht (ADR-055). Datensparsam: keine
  gespeicherte Anwesenheit, Verlauf nur mit Konto-IDs (ADR-056). Jede Zahl ist eine Größe mit Einheit
  (ADR-057). Adressen beruhen auf der Element-ID (ADR-058). Begriffe: `docs/glossar.md`.
- Geräte nach Aufgabe, drei Layouts mit denselben Befehlen, Eingabe als austauschbare Schicht (3D-Maus,
  Navigationsprofile), XR über WebXR mit Begehung, Höreindruck und AR (ADR-060).
- Erster Anwendungsfall: Räume mit Schallabsorbern (ADR-038). Material ist ein Element mit Aussehen, Akustik,
  Physik, Kosten und CO₂ (ADR-039); Nachhallzeit rechnet `crates/acoustics` (ADR-041); Rendering im Client
  mit Echtzeit und Fotomodus (ADR-040).
- Wiederverwendung über Komponenten und Instanzen (ADR-043): Instanzen speichern nur Variante, gewählte
  Referenzen und Überschreibungen, nie eine Kopie; der Absorber-Katalog ist eine Komponentenbibliothek.
- Lizenzen: Kern MPL-2.0, `sdk/` und `format/` Apache-2.0. Abhängigkeiten nur freizügig nach der Liste in
  ADR-034; LGPL nur dynamisch oder im Worker-Prozess; kein GPL/AGPL.

## Konventionen

Rust 2021, kein `unsafe`, Fehler als `Result`. Elixir mit `mix format`, Typespecs an öffentlichen
Funktionen. TypeScript strict. Python ≥ 3.11 mit Typ-Hints, ruff, pytest.
Commits im Imperativ mit Change-ID: `ap-01-spike-datenmodell: Merge-Zeit für 10.000 Elemente messen`, immer
mit `git commit -s` (Developer Certificate of Origin, `CONTRIBUTING.md`).
