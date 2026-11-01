# Kernel-Schnittstelle `cee-kernel/0`

Nachrichten zwischen Element-Graph und Geometrie-Worker (ADR-032). Lizenz Apache-2.0 wie `format/`.
Erste Fassung aus ap-50 (Wireframe-Basics); Erweiterungen nur additiv, ein Bruch nur mit `cee-kernel/1`.

## Auftrag (`auftrag.schema.json`)

```json
{"protocol": "cee-kernel/0", "elements": [Element, …], "befunde": [Befund, …]}
```

- Elemente in Elementform (ADR-028) in der Reihenfolge, die der Rust-Kern mit `order()` liefert. Kind-Elemente
  stehen als eigene Einträge in der flachen Liste; `content` enthält nur die Kind-IDs.
- Ein Eingang ist immer `<id>.<output>` mit einem benannten Ausgang (ADR-016, ADR-058); Indizes gibt es nicht.
- Verworfene Elemente (`meta.verworfen = true`) bleiben im Auftrag; sie werden nicht berechnet.
- `befunde` (optional) trägt Befunde des Rust-Kerns beim Bauen: `input_missing` für Elemente auf einem Zyklus
  (Hinweis `kernel.befund.input_missing.zyklus`) und die Warnung `unit_assumed` für eine Zahl ohne Einheit.
- Gebaut wird der Auftrag mit `python -m cee_worker auftrag --projekt <datei.json>` über `cee-sdk`.

## Ergebnis (`ergebnis.schema.json`)

```json
{"protocol": "cee-kernel/0",
 "kernel": {"name": "occt", "version": "<OCP-Version>", "worker": "<cee-worker-Version>"},
 "results": [{"id", "state", "hash", "outputs", "befunde"}],
 "befunde": [Befund, …]}
```

- `state`: `aktuell` oder `fehlerhaft`. Verworfene Elemente erscheinen nicht in `results`.
- `outputs` je Ausgangsname, jede Zahl als Größe `{"value", "unit"}` (Längen `mm`, Richtungen `1`, ADR-057):

  | Ausgabetyp | Felder |
  | --- | --- |
  | `point` | `position` |
  | `line`, `ray` | `origin`, `direction` |
  | `segment` | `start`, `end`, `length` |
  | `plane` | `origin`, `normal`, `x_direction` |
  | `frame` | `origin`, `x`, `y`, `z` |

- Gleicher Auftrag → bytegleiches Ergebnis (JSON mit sortierten Schlüsseln, ohne Zeit, Zufall, Prozessdaten).

## Befund

`{"code", "element", "input"?, "param"?, "bezug"?, "hinweis"}`; `hinweis` ist ein Übersetzungsschlüssel mit
Korrekturvorschlag (`kernel.befund.<code>[.<zusatz>]`). Ein Befund betrifft nur sein Element und dessen
Folgeelemente; alle unabhängigen Elemente werden berechnet (ADR-050).

| Code | Bedeutung |
| --- | --- |
| `input_missing` | Eingang zeigt auf kein früheres Element, keinen solchen Ausgang, oder liegt auf einem Zyklus |
| `input_discarded` | Eingang zeigt auf ein verworfenes Element |
| `input_type` | Ausgang hat den falschen Ausgabetyp |
| `input_failed` | Eingang ist fehlerhaft (Folgebefund, `bezug` nennt das Element) |
| `degenerate` | Zwei Punkte liegen näher als `TOL_LINEAR = 1e-6 mm` beieinander |
| `unit` | Falsche Dimension oder unbekannte Einheit; Fehlercode des Kerns im Hinweis |
| `unknown_type` | Elementtyp unbekannt |
| `kernel_error` | Ausnahme in OpenCascade, Text in `text` |
| `protocol` | Nachricht kein gültiges JSON oder falsches `protocol` (nur oben in `befunde`) |
| `unit_assumed` | Warnung des Kerns: Zahl ohne Einheit, Standard-Einheit angenommen |

## Inhalts-Hash

SHA-256 (hex) über kanonisches JSON (Schlüssel sortiert, kompakt, Zahlen als Python-`repr(float)` in
kanonischer Einheit mm bzw. rad) aus `protocol`, `kernel.version`, `type`, `params` und je Eingang
`<Hash des Bezugs>.<output>`. ID und `meta` gehen nicht ein. Der Hash wird in ap-50 nicht gespeichert.

## Worker

- `python -m cee_worker rechnen` – ein Auftrag von stdin, ein Ergebnis auf stdout.
- `python -m cee_worker --stdio` – je Zeile ein Auftrag, je Zeile ein Ergebnis; ungültiges JSON ergibt eine
  Zeile mit Befund `protocol`, der Worker läuft weiter.
- Prüfhaken nur für Tests: mit `CEE_WORKER_TEST=1` beendet sich der Worker beim Element mit
  `meta.test_absturz = true` mit Exit-Code 70 ohne Ausgabe.

Typdefinitionen der Wireframe-Basics: `format/types/drahtmodell.json`; Beispiel: `format/examples/drahtmodell.json`.
