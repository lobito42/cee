## Context

Siehe proposal.md – Why. Grundlage ist ap-01: Speicherform flach (`ROOT.project`, `ROOT.roots`,
`ROOT.elements` als Map ID → Element, `content` als Liste von IDs), Parameterwerte als verschachtelte
Automerge-Objekte, Inhalts-Hash SHA-256 über die kanonische JSON-Form (sortierte Schlüssel, kompakt),
automerge 0.12. Messwerte des Spikes: Laden 100k 1.060 ms, Änderung p95 0,058 ms, Merge 2 × 500 21 ms, Aufbau
100k aus JSON 29 s, volle Prüfung über 10.000 Elemente rund 1 s.

Arbeitspaket (Konzept): „Graph-Kern produktiv: Schema v1, Validierung, Abhängigkeiten, Migrationen,
Teil-Laden, Berechnungszustände – 100.000 Elemente laden ≤ 2 s“.

## Goals / Non-Goals

**Goals:** ein produktiver, getesteter Kern in `crates/graph`, den ap-40 unverändert binden kann; alle
Messwerte durch die Abnahmetests selbst nachgemessen.

**Non-Goals:** siehe proposal.md – Impact.

## Decisions

### Aufbau der Crate

```
crates/graph/
  src/lib.rs          öffentliche Schnittstelle, Fehlertyp
  src/schema.rs       Element, Größe, Geld, Schema-Version, Prüfung der Form
  src/doc.rs          Dokument auf automerge: Operationen, Laden, Speichern, Merge, Hash, Stapel-Import
  src/validate.rs     Befunde (Element-ID, Feld, Code, Text)
  src/deps.rs         Abhängigkeitsgraph, Zyklen, Reihenfolge, betroffene Elemente
  src/state.rs        Berechnungszustände
  src/migrate.rs      Migrationen je Schema-Version
  src/synth.rs        Generator für Tests und Messung (deterministisch per Seed)
  examples/bench.rs   Messprogramm, Ausgabe als JSON
  tests/              Rust-Tests je Modul
```

- Öffentliche Funktionen geben `Result<_, Error>` zurück; kein `unsafe`, kein `panic!`, `unwrap` oder
  `expect` außerhalb von Tests (ADR-029, `docs/rules/kern.md`).
- Die Crate hat keine Abhängigkeit auf `spikes/`. Code aus dem Spike darf übernommen werden, wenn er die
  Tests dieses Changes besteht.

### Schema v1 und Größen

- Elementform unverändert aus ap-01. IDs: ULID für neue Elemente; vorhandene IDs nach dem Muster
  `^[A-Za-z0-9][A-Za-z0-9_-]*$` bleiben gültig (ADR-058, Beispiele lesbar).
- **Größe:** `{"value": <Zahl>, "unit": "<Einheit>"}`. Gespeichert wird nur in kanonischen Einheiten
  (ADR-057): `mm`, `mm2`, `mm3`, `rad`, `kg`, `s`, `Hz`, `N`, `kgCO2e` und `1` (dimensionslos). Die Umrechnung
  von Eingaben ist Sache von ap-08a.
- **Geld:** `{"amount": "<Dezimalzahl als Zeichenkette>", "currency": "<ISO 4217>"}`, nie Gleitkomma.
- Eine nackte Zahl in `params` oder `meta` ist ein Befund `bare_number`; Wahrheitswerte, Zeichenketten,
  Listen und Objekte bleiben frei. Ganzzahlige Zähler (z. B. Anzahl im Muster) sind Größen mit Einheit `1`.
- `format/schema/element.schema.json` erzwingt die Größe an jeder Zahl in `params` (über `$defs/value`) und
  heißt nicht mehr „Entwurf“. Die Beispiele werden von Hand nach v1 überführt (Längen in mm, α als `1`,
  Kosten als Geld); sie müssen danach mit 0 Befunden validieren.

### Validierung

Befund = `{element, field, name, code, message}`. Codes (abschließend für ap-05): `invalid_id`,
`duplicate_id`, `invalid_name`, `missing_target` (Eingang zeigt auf fehlendes Element), `missing_output`
(Ausgang fehlt am Ziel), `orphan` (Element in keinem `content` und nicht in `roots`), `multiple_parents`,
`cycle`, `bare_number`, `invalid_unit`, `invalid_money`, `unit_guessed` (nur aus Migrationen), `schema_too_new`.

- Prüfen ist rein lesend, liefert alle Befunde auf einmal und bricht nie beim ersten Fehler ab.
- Befunde betreffen nur das fehlerhafte Element; alle anderen bleiben les- und änderbar (ADR-050).
- Volle Prüfung 100.000 Elemente ≤ 1.000 ms; Prüfung nach einer Änderung nur für das geänderte Element und
  seine direkten Nachbarn, ≤ 1 ms.

### Abhängigkeiten

- Kanten: Eingang `a.out` an Element `b` → `b` hängt von `a` ab. `content` ist Enthaltensein, keine
  Berechnungsabhängigkeit; ein Element gilt aber als betroffen, wenn ein Element in seinem Untergraphen
  betroffen ist (Ergebnis des Elternteils ändert sich mit).
- Eine Operation, die einen Zyklus erzeugen würde (`set_input`), wird mit Fehler `cycle` abgelehnt; das
  Dokument bleibt unverändert. Entsteht ein Zyklus durch Zusammenführen zweier Zweige, meldet die Prüfung
  Befund `cycle` an allen beteiligten Elementen; die Reihenfolge lässt sie aus, der Rest wird berechnet.
- `order()` liefert eine topologische Reihenfolge, stabil bei gleicher Eingabe (Gleichstand nach ID).
- `affected(changed)` liefert alle transitiv abhängigen Elemente plus die Eltern nach obiger Regel.
- Budgets für 100.000 Elemente: Index aufbauen ≤ 300 ms, `order()` ≤ 300 ms, `affected` für eine Änderung
  ≤ 5 ms (p95 über 1.000 zufällige Elemente).

### Berechnungszustände

`current`, `stale`, `running`, `failed` (mit Befund). Gehalten in einer Struktur neben dem Dokument, nie im
CRDT, nie im Hash (ADR-032). Übergänge:

- Änderung an `x` → `x` und `affected(x)` werden `stale`.
- `start(x)` → `running`; `finish_ok(x)` → `current`; `finish_err(x, befund)` → `failed`.
- Nachfolger eines `failed`-Elements bleiben `stale` und behalten ihr letztes gültiges Ergebnis
  (gekennzeichnet als veraltet); `ready()` liefert nur Elemente, deren Eingänge alle `current` sind. Ein
  Fehler blockiert nie unabhängige Zweige, das Speichern oder das Zusammenführen.
- Neue oder geladene Elemente beginnen als `stale`.

### Migrationen

- `ROOT.project.schema_version` (Ganzzahl). Der Kern kennt `CURRENT = 1`.
- Version 0 ist das Format der ap-01-Beispiele vor v1 (nackte Zahlen). Migration 0 → 1 ersetzt jede nackte
  Zahl `n` durch `{"value": n, "unit": "1"}` und meldet je ersetzter Stelle einen Befund `unit_guessed`,
  damit Mensch oder Fachpaket die richtige Einheit setzen; der Kern rät keine Dimension (ADR-046).
- Migrationen sind normale Automerge-Änderungen mit eigenem Commit und Nachricht `migrate 0->1`; sie sind
  idempotent (zweimal ausgeführt = einmal) und deterministisch. Führen zwei Kopien desselben v0-Dokuments
  offline je für sich die Migration aus, ergibt das Zusammenführen denselben Hash wie eine einzelne Migration
  und keine doppelten Werte.
- Ein Dokument mit höherer Version als `CURRENT` wird nicht geöffnet: Fehler `schema_too_new`, Dokument
  unverändert.

### Teil-Laden

Ein Dokument je Projekt bleibt (Empfehlung ap-01). „Teil-Laden“ heißt in ap-05: Beim Öffnen werden die
Automerge-Bytes geladen und nur der Index (ID → Typ, Eltern, Eingänge, Ausgänge) aufgebaut; Parameter und
Meta eines Elements werden erst beim ersten Zugriff aufbereitet. `subgraph(root)` liefert den Untergraphen
eines Elements samt Liste der Eingänge, die aus ihm hinauszeigen. Der Kern zählt aufbereitete Elemente
(`materialized_count`), damit der Test es prüfen kann. Getrennte Dokumente je Bauteil bleiben die
Ausweichlösung, falls 5.000-Teile-Baugruppen das verlangen (ADR-050; offene Frage 3).

### Stapel-Import

`Doc::import(project_json)` baut ein Dokument in einer einzigen Transaktion statt Element für Element. Budget:
10.000 Elemente ≤ 2.000 ms; 100.000 Elemente wird gemessen und berichtet, ohne Schwelle (offene Frage 4).

### Performance-Budgets (Messrechner: GitHub-Runner ubuntu-latest, Release-Build)

| Kennzahl | Schwelle |
| --- | --- |
| `load_100k_ms` – Laden 100k mit 10.000 Änderungen Historie, inkl. Index | ≤ 2.000 ms |
| `validate_100k_ms` – volle Prüfung 100k | ≤ 1.000 ms |
| `op_p95_ms` – eine Änderung inkl. Prüfung, Zyklustest und Commit | ≤ 5 ms |
| `index_100k_ms`, `order_100k_ms` | je ≤ 300 ms |
| `affected_p95_ms` | ≤ 5 ms |
| `subgraph_1000_ms` – Untergraph mit 1.000 Elementen aus 100k aufbereiten | ≤ 50 ms |
| `import_10k_ms` | ≤ 2.000 ms |
| `import_100k_ms`, `size_100k_mb` | nur gemessen |

Die Abnahmetests messen selbst nach (Median aus 3 Läufen über das Messprogramm) und vergleichen ohne
pauschale Toleranz mit der Schwelle (Folgepunkt aus PR #9). Befehl:
`cargo run -q --release -p cee-graph --example bench -- --json`.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-05-graph-kern/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | Beispiele und Schema v1: 0 Befunde, Schema ohne Typliste, Größen im Schema erzwungen | Schema v1 |
| AK-2 | Größen und Geld: Korpus mit nackten Zahlen, falschen Einheiten, Gleitkomma-Geld – 100 % erkannt | Schema v1 |
| AK-3 | Validierung: Korpus mit allen Codes – 100 % erkannt mit Element und Code, 0 Falschmeldungen, kein Absturz | Validierung |
| AK-4 | Operationen und Hash: Roundtrip Speichern/Laden, Hash unabhängig von Historie und Actor, Merge 2 × 500 | Dokument |
| AK-5 | Zyklen: Operation abgelehnt, Dokument unverändert; Zyklus aus Merge als Befund | Abhängigkeiten |
| AK-6 | Reihenfolge und betroffene Elemente gegen Brute-Force-Referenz an 1.000 Zufallsfällen | Abhängigkeiten |
| AK-7 | Berechnungszustände: Fehler in der Mitte, unabhängiger Zweig, Hash unverändert | Zustände |
| AK-8 | Migration 0 → 1: Ergebnis, Idempotenz, zwei Kopien offline, `schema_too_new` | Migrationen |
| AK-9 | Teil-Laden: `materialized_count` und `subgraph_1000_ms` | Teil-Laden |
| AK-10 | Messwerte: alle Schwellen der Tabelle | Leistung |
| AK-11 | Qualität: `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings`, `cargo test -q -p cee-graph`; kein `unwrap`/`expect`/`panic!` außerhalb von Tests | Qualität |

## Risks / Trade-offs

- **Import 100k bleibt langsam:** automerge 0.12 baut große Dokumente langsam auf. Gegenmaßnahme:
  Transaktion statt Einzel-Commits; reicht das nicht, wird es nur berichtet (keine Schwelle) und in ap-40
  oder ap-07a als vorkodiertes Dokument gelöst.
- **Teil-Laden nur innerhalb eines Dokuments:** spart Aufbereitung, nicht das Laden der Bytes. Für G2
  (Baugruppe aus fünf Teilen) reicht das; für 5.000 Teile wird es später nachgemessen.
- **Migration 0 → 1 setzt Einheit `1`:** semantisch falsch für Längen, aber sichtbar als Befund statt
  geraten. Betrifft nur Altdaten aus ap-01.
- **Zeit auf dem Runner schwankt:** Schwellen haben Abstand zu den Spike-Werten (Laden 1,06 s gegen 2 s).

## Open Questions (Entscheidung des Kernteams vor der Freigabe)

1. **Nackte Zahlen:** Befund (Vorschlag) oder harte Ablehnung der Operation? Befund hält das Modell
   robust (ADR-050); Ablehnung ist strenger.
2. **Migration 0 → 1:** Einheit `1` plus Befund `unit_guessed` (Vorschlag), oder Altdaten gar nicht
   migrieren, weil es außer den zwei Beispielen keine gibt?
3. **Teil-Laden:** Aufbereitung bei Bedarf in einem Dokument (Vorschlag) – oder schon jetzt getrennte
   Dokumente je Bauteil?
4. **Import 100k:** nur messen (Vorschlag) oder Schwelle, z. B. ≤ 10 s?
5. **Zuschnitt:** ap-05 als ein Change in etwa drei Nächten (Vorschlag) oder geteilt in ap-05a (Schema,
   Dokument, Validierung) und ap-05b (Abhängigkeiten, Zustände, Migrationen, Teil-Laden)?
