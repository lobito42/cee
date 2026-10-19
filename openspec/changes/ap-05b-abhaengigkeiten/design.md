## Context

Siehe proposal.md – Why. Ausgangslage nach ap-05a: `crates/graph` mit Einheiten, Typdefinitionen, Schema v1,
Dokument auf automerge 0.12 (flache Speicherform aus ap-01), Prüfung mit Befunden, Generator und `graphctl`.
Konzept-Kriterium des Arbeitspakets: „100.000 Elemente laden ≤ 2 s“. Spike-Wert: Laden 100k 1.060 ms ohne Index.

## Goals / Non-Goals

**Goals:** Planung der Neuberechnung, robuste Zustände, Migrationen und Teil-Laden im Kern, belegt durch
Vergleich mit Referenzrechnungen und nachgemessene Budgets.

**Non-Goals:** siehe proposal.md – Impact.

## Decisions

### Neue Module

```
crates/graph/src/index.rs     Index beim Öffnen, Aufbereitung bei Bedarf
crates/graph/src/deps.rs      Abhängigkeitsgraph, Zyklen, Reihenfolge, betroffene Elemente
crates/graph/src/state.rs     Berechnungszustände
crates/graph/src/migrate.rs   Schema-Version, Migrationen
```

Regeln aus ap-05a gelten weiter (kein `unsafe`, kein `unwrap`/`expect`/`panic!` außerhalb von Tests).

### Abhängigkeiten

- Kante: Eingang `a.out` an Element `b` → `b` hängt von `a` ab. `content` ist Enthaltensein, keine
  Berechnungsabhängigkeit; ein Element ist aber betroffen, wenn ein Element in seinem Untergraphen betroffen
  ist (das Ergebnis des Elternteils ändert sich mit).
- `set_input`, das einen Zyklus schließen würde, wird mit Fehler `cycle` abgelehnt; das Dokument bleibt
  unverändert. Entsteht ein Zyklus erst durch Zusammenführen, meldet die Prüfung Befund `cycle` (Fehler) an
  allen beteiligten Elementen; die Reihenfolge lässt sie und ihre Nachfolger aus, der Rest bleibt berechenbar.
- `order()` liefert eine topologische Reihenfolge, stabil bei gleicher Eingabe (Gleichstand nach ID).
- `affected(changed)` liefert alle transitiv abhängigen Elemente plus deren Eltern nach obiger Regel.

### Berechnungszustände

`current`, `stale`, `running`, `failed` (mit Befund). Gehalten neben dem Dokument, nie im CRDT, nie im Hash
(ADR-032). Übergänge:

- Änderung an `x` → `x` und `affected(x)` werden `stale`; neue oder geladene Elemente beginnen als `stale`.
- `start(x)` → `running`; `finish_ok(x)` → `current`; `finish_err(x, befund)` → `failed`.
- Nachfolger eines `failed`-Elements bleiben `stale` und behalten ihr letztes gültiges Ergebnis
  (gekennzeichnet als veraltet). `ready()` liefert nur `stale`-Elemente, deren Eingänge alle `current` sind.
  Ein Fehler blockiert nie unabhängige Zweige, das Speichern oder das Zusammenführen (ADR-050).
- Ein `running`-Element, das während der Berechnung geändert wird, wird nach `finish_ok` wieder `stale`.

### Migrationen

- `ROOT.project.schema_version` (Ganzzahl); der Kern kennt `CURRENT = 1`.
- Eine Migration `n → n+1` ist eine Funktion über das Dokument, die normale Automerge-Änderungen in einem Commit
  mit Nachricht `migrate n->n+1` macht. Pflicht: deterministisch und idempotent. Beim Öffnen laufen alle
  fehlenden Migrationen der Reihe nach.
- Es gibt heute keine echte Migration. Belegt wird der Mechanismus mit der **Beispiel-Migration 1 → 2**, nur mit
  Cargo-Feature `demo-migration` übersetzt (dann `CURRENT = 2`): sie benennt `meta.name` in `meta.title` um.
  Führen zwei Kopien desselben v1-Dokuments sie offline je für sich aus, ergibt das Zusammenführen denselben
  Hash wie eine einzelne Migration.
- Ein Dokument mit höherer Version als `CURRENT` wird nicht geöffnet: Fehler `schema_too_new`, Bytes
  unverändert.

### Teil-Laden

Ein Dokument je Projekt bleibt (Empfehlung ap-01). Beim Öffnen werden die Automerge-Bytes geladen und nur der
Index aufgebaut; Parameter und Meta eines Elements werden beim ersten Zugriff aufbereitet und zwischengespeichert.
`subgraph(root)` liefert den Untergraphen samt Liste der Eingänge, die aus ihm hinauszeigen. `materialized_count`
zählt aufbereitete Elemente, damit der Test es prüfen kann. Getrennte Dokumente je Bauteil bleiben die
Ausweichlösung für Baugruppen mit 5.000 Teilen (ADR-050).

### Ergänzung `graphctl`

| Befehl | Wirkung |
| --- | --- |
| `order <doc>` | Reihenfolge als ID-Liste, ausgelassene Elemente mit Grund |
| `affected <doc> <id>...` | betroffene Elemente |
| `states <doc> <script.json>` | spielt Zustandsereignisse ab (`change`, `start`, `ok`, `err`), gibt Zustände und `ready()` aus |
| `migrate <doc> --out <doc>` | Migrationen ausführen, Version vorher und nachher |
| `subgraph <doc> <id>` | Untergraph, nach außen zeigende Eingänge, `materialized_count`, Dauer |

Mit `--features demo-migration` übersetzt, kennt `graphctl` die Beispiel-Migration.

### Performance-Budgets (GitHub-Runner ubuntu-latest, Release-Build)

| Kennzahl | Schwelle |
| --- | --- |
| `load_index_100k_ms` – Laden 100k mit 10.000 Änderungen Historie, inkl. Index | ≤ 2.000 ms |
| `index_100k_ms`, `order_100k_ms` | je ≤ 300 ms |
| `affected_p95_ms` – p95 über 1.000 zufällige Elemente in 100k | ≤ 5 ms |
| `op_p95_ms` – eine Änderung inkl. Zyklustest | ≤ 5 ms |
| `subgraph_1000_ms` – Untergraph mit 1.000 Elementen aus 100k aufbereiten | ≤ 50 ms |

Die Abnahmetests messen selbst nach (Median aus 3 Läufen von `graphctl bench --json`), ohne pauschale Toleranz.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-05b-abhaengigkeiten/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | Zyklus über 2, 3 und 50 Elemente abgelehnt, Hash unverändert | Abhängigkeiten |
| AK-2 | Zyklus aus dem Zusammenführen als Befund, Rest in der Reihenfolge | Abhängigkeiten |
| AK-3 | Reihenfolge und betroffene Elemente gegen Referenzrechnung, 1.000 Fälle | Abhängigkeiten |
| AK-4 | Zustände: Fehler in der Mitte, unabhängiger Zweig, Änderung während der Berechnung, Hash unverändert | Zustände |
| AK-5 | Beispiel-Migration: Ergebnis, Idempotenz, zwei Kopien offline | Migrationen |
| AK-6 | `schema_too_new`, Bytes unverändert | Migrationen |
| AK-7 | Teil-Laden: `materialized_count`, nach außen zeigende Eingänge, Dauer | Teil-Laden |
| AK-8 | Messwerte: alle Schwellen; Qualität wie ap-05a AK-10 | Leistung |

## Risks / Trade-offs

- **Index plus Laden über 2 s:** Spike lädt 100k in 1,06 s; der Index darf höchstens 300 ms kosten. Reicht
  es nicht, wird der Index beim Speichern mitgeschrieben (abgeleitet, außerhalb des CRDT).
- **Teil-Laden spart nur Aufbereitung,** nicht das Laden der Bytes; für G2 genügt das.
- **Beispiel-Migration nur in Tests:** belegt den Mechanismus, ohne das echte Schema zu ändern.

## Entscheidungen des Kernteams (2026-10-19)

1. Teil-Laden als Aufbereitung bei Bedarf in einem Dokument je Projekt; getrennte Dokumente je Bauteil bleiben
   Ausweichlösung, falls große Baugruppen es verlangen.
