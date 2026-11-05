# CEE – Anweisungen für Coding-Agenten

Gilt für Claude Code, OpenCode und Pi. CEE (Collaborative Engineering Environment) soll für kleine und mittlere
Unternehmen werden, was Blender und OpenSCAD für ihre Communities sind. **Aktuelle Richtung (ADR-067, ADR-068):
parametrisch und editierbar, auf einer eigenen Kopie von SolidCraft.** Den CAD-Kern liefert SolidCraft (freies
Rust-CAD), als Kopie, die sich regelmäßig abgleicht; CEE baut, was fehlt: Prüfer, Zusammenarbeit (nach FigCraft),
Vorschläge mit Vorschau, KI als Teilnehmer, Freigaben und PLM/ERP. Gemeinsames Fundament ist der Änderungssatz.

## Zu Beginn jeder Sitzung

1. Auf `main` aktualisieren.
2. `docs/plan.md` lesen: Was ist die laufende Runde, was soll der Mensch danach ausprobieren können?
3. Offene PRs ansehen. Dann den nächsten Schritt der Runde nennen und loslegen.

## Arbeitsweise: kurze Runden

- **Eine Runde = ein Ziel, das man ausprobieren kann**, festgehalten in `docs/plan.md`. Arbeite auf
  `runde/<thema>`, ein PR je Runde. Die Runde endet mit einer Vorschau im Browser und einer Klick-Anleitung.
- **Prüfungen gehören zur Runde:** Tests unter `tests/acceptance/<thema>/` im selben Branch. Sie prüfen das
  Verhalten, nicht die Umsetzung. Tests nie abschwächen oder überspringen, um grün zu werden.
- **Keine Nachtschicht, kein vierstufiger Ablauf** für Prototyp-Arbeit. OpenSpec nur für Teile, die stabil werden
  sollen (Format des Bauplans, Prüfer) – und nur, wenn der Mensch es will.
- **Gemergt wird, wenn der Mensch die Vorschau ausprobiert und Ja gesagt hat.**
- Nach drei erfolglosen Anläufen am selben Problem: anhalten, Stand sichern, im PR beschreiben, Mensch fragen.

## Grundsätze

1. **Das SolidCraft-Teil ist die Quelle der Wahrheit** (ADR-068): benannte Größen mit Einheit, Rolle und Bereich
   im Kommentar, benannte Schritte. Kein zweiter Bauplan daneben. Netze und STL sind abgeleitet.
2. **Parametrisch heißt prüfbar parametrisch:** Keine Zahl im Code, die eigentlich eine Größe ist. Jede Größe
   lässt sich in ihrem Bereich ändern, ohne dass das Teil zerbricht – das belegen Prüfer, nie das Modell selbst.
3. **KI ändert nur als Vorschlag mit Vorschau** (vorher/nachher, geänderte Größen, Code-Diff); Übernehmen oder
   Verwerfen entscheidet der Mensch.
4. **KI arbeitet auf der Ebene der Absicht**, nicht der Koordinaten: Beziehungen und benannte Größen statt
   Punktlisten.
5. **Kein fester KI-Anbieter:** lokale Modelle müssen gehen, keine Daten an Dritte ohne ausdrückliche Wahl, keine
   Telemetrie ohne Zustimmung.
6. **Geometrie kommt aus SolidCraft**, angesteuert über `solidcraft-cli` und MCP; eine fest gewählte Version.
7. **Jede Zahl ist eine Größe mit Einheit.**
8. **Fehler eines Teils zerbrechen nie die Anwendung**; Fehler werden verständlich gemeldet (Zeile, Ursache).
9. **Oberfläche: ein Bauplan, viele Sichten.** Prinzipien der Vorbilder nach `docs/design/prinzipien.md`
   kombinieren, nichts nachbauen. Erst Entwurf, Ja des Menschen, dann Bau. Nur zeigen, was funktioniert. Tokens
   aus `docs/design/tokens.json`, keine Git-Begriffe für den Menschen.
10. **Erst das Erlebnis, dann das Fundament:** Nichts bauen, was die laufende Runde nicht braucht.

Ältere ADRs in `docs/adr/` sind Hintergrund; wo sie ADR-067 widersprechen, gilt ADR-067. `docs/ideen/` ist ein
Ideenspeicher, kein Auftrag. `docs/konzept.md` nur gezielt lesen, nie komplett.

## Mit dem Menschen reden

Der Mensch entscheidet über Inhalte und kennt weder Git noch Abkürzungen noch Nummern.

- Alltagssprache, keine ADR-, PR- oder Branch-Kürzel. Jede Frage nennt, worum es geht, was du empfiehlst und was
  bei Ja oder Nein passiert; höchstens zwei Optionen.
- Technik, Reihenfolge, Git und Aufräumen entscheidest du selbst und sagst es hinterher in einem Satz.
- Zum Ausprobieren immer: Link zur Vorschau, wenige Klick-Schritte, die eigentliche Frage.
- **Referenzdaten** (Beispielteile, Listen, Prüfaufgaben) nie erfinden oder auf eine Zielzahl auffüllen; fehlt
  eine Quelle, wird die Liste kleiner oder es wird gefragt.

## Nur mit Ja des Menschen ändern

Branch `adr/<thema>`, der Mensch sagt Ja im Gespräch, dann mergt der Agent: `docs/adr/`, `docs/rules/`,
`docs/design/`, `docs/plan.md` (Ziel einer Runde; Häkchen und „Erledigt“ darf die Runde selbst setzen),
`AGENTS.md`, `CLAUDE.md`, `REVIEW.md`, `openspec/queue.yaml`, Lizenzdateien, Werkzeug-Konfiguration (`.claude/`,
`.opencode/`, `opencode.json`, `.pi/`, `.githooks/`, `.github/`, `tools/`, `tests/unit/`).

## Struktur und Befehle

| Pfad | Inhalt | Stand | Prüfen |
| --- | --- | --- | --- |
| `pruefer/` | CEE-Prüfer für SolidCraft-Teile (Runde 1) | **aktiv** | `uv run ruff check pruefer && uv run pytest -q tests/acceptance/pruefer` |
| `parts/` | Beispielteile (`.sc` und Befehlslisten) | **aktiv** | – |
| `worker/`, `spikes/` | build123d-Worker, alter Prototyp | ruht (ADR-068) | – |
| `crates/`, `server/`, `client/`, `packages/` | Element-Graph, Sync-Server, Produkt-Client, Fachpakete | ruht (ADR-067) | wie bisher, nur bei Bedarf |
| `sdk/`, `format/` | SDK und Formatspezifikation (Apache-2.0) | ruht | – |

- Setup: `uv sync --extra cad`, `git config core.hooksPath .githooks`
- Vorschau lokal mit Worker: `bash spikes/ux-prototyp-2/vorschau.sh`
- Schutz prüfen: `python3 tools/guard.py check <pfad>`
- Regeln je Bereich in `docs/rules/` nur zu den eigenen Dateien lesen (`geometrie.md`, `client.md`).

## Token sparen

Gezielt lesen (`rg`, Ausschnitte), nur das Geänderte testen (`pytest -q -x`), keine Erkundung „zur Sicherheit“.

## Konventionen

Python ≥ 3.11 mit Typ-Hints, ruff, pytest. TypeScript strict. Rust 2021 ohne `unsafe`. Elixir mit `mix format`.
Commits im Imperativ mit Thema (`runde-1-bauplan: Regler für Params`), immer `git commit -s` (DCO,
`CONTRIBUTING.md`). Lizenzen: Kern MPL-2.0, `sdk/` und `format/` Apache-2.0; Abhängigkeiten nur freizügig nach
ADR-034, LGPL nur dynamisch oder im Worker-Prozess, kein GPL/AGPL.
