## Context

Siehe proposal.md – Why. Grundlage ist ap-01: Speicherform flach (`ROOT.project`, `ROOT.roots`,
`ROOT.elements` als Map ID → Element, `content` als Liste von IDs), Parameterwerte als verschachtelte
Automerge-Objekte, Inhalts-Hash SHA-256 über die kanonische JSON-Form (sortierte Schlüssel, kompakt),
automerge 0.12. Messwerte des Spikes: Laden 100k 1.060 ms, Änderung p95 0,058 ms, Merge 2 × 500 21 ms,
Aufbau 100k aus JSON 29 s.

ADR-057: jede Zahl mit Dimension; kanonisch mm, rad, kg, s, Hz, kg CO₂e; Geld als Dezimalzahl mit Währung;
Eingaben ohne Einheit gelten in der Anzeigeeinheit des Felds; gerundet wird nur in der Anzeige.

## Goals / Non-Goals

**Goals:** ein produktiver Kern für Schema, Einheiten, Dokument und Prüfung, den ap-05b erweitert und ap-40
bindet; alle Messwerte durch die Abnahmetests selbst nachgemessen.

**Non-Goals:** siehe proposal.md – Impact.

## Decisions

### Aufbau der Crate

```
crates/graph/
  src/lib.rs          öffentliche Schnittstelle, Fehlertyp
  src/units.rs        Dimensionen, Einheitentabelle, Umrechnung, Lesen von Eingaben
  src/types.rs        Typdefinitionen (Parameter → Dimension, Standard-Einheit)
  src/schema.rs       Element, Größe, Geld, Prüfung der Form
  src/doc.rs          Dokument auf automerge: Operationen, Laden, Speichern, Merge, Hash, Stapel-Import
  src/validate.rs     Befunde
  src/synth.rs        Generator für Projekte und Korpora (deterministisch per Seed)
  examples/graphctl.rs  Kommandozeile für Abnahmetests und Messung
  tests/              Rust-Tests je Modul
```

Öffentliche Funktionen geben `Result<_, Error>` zurück; kein `unsafe`, kein `panic!`, `unwrap` oder `expect`
außerhalb von Tests (ADR-029, `docs/rules/kern.md`). Keine Abhängigkeit auf `spikes/`.

### Einheitensystem

- **Dimension** = Vektor ganzzahliger Exponenten über Länge L, Masse M, Zeit T, Stromstärke I, Temperatur Θ,
  Stoffmenge N, Lichtstärke J (SI) sowie Winkel A und CO₂-Äquivalent C als eigene Achsen, damit „90°“ nicht
  mit einer reinen Zahl und „kg CO₂e“ nicht mit einer Masse verrechnet wird. Benannte Dimensionen für
  Typdefinitionen: `length`, `area`, `volume`, `angle`, `mass`, `time`, `frequency`, `force`, `pressure`,
  `density`, `temperature`, `co2e`, `dimensionless`.
- **Kanonisch** sind mm, kg, s, rad, A, K, mol, cd, kg{CO2e}; abgeleitete Dimensionen speichern im Produkt der
  kanonischen Einheiten (Fläche mm2, Druck N/mm2 = MPa, Dichte kg/mm3).
- **Codes nach UCUM** (Unified Code for Units of Measure), Groß- und Kleinschreibung beachtet. Tabelle für
  ap-05a, Faktor = Wert in der kanonischen Einheit, alle exakt nach Definition (NIST SP 811, Anhang B):

| Dimension | Codes und Faktoren |
| --- | --- |
| length (mm) | `um` 0,001 · `mm` 1 · `cm` 10 · `m` 1000 · `km` 1.000.000 · `[in_i]` 25,4 · `[ft_i]` 304,8 |
| area (mm2) | `mm2` 1 · `cm2` 100 · `m2` 1.000.000 · `[in_i]2` 645,16 |
| volume (mm3) | `mm3` 1 · `cm3` 1000 · `l` 1.000.000 · `m3` 10⁹ · `[in_i]3` 16.387,064 |
| angle (rad) | `rad` 1 · `deg` π/180 |
| mass (kg) | `g` 0,001 · `kg` 1 · `t` 1000 · `[lb_av]` 0,45359237 |
| time (s) | `ms` 0,001 · `s` 1 · `min` 60 · `h` 3600 |
| frequency (Hz) | `Hz` 1 · `kHz` 1000 |
| force (N) | `N` 1 · `kN` 1000 |
| pressure (N/mm2) | `Pa` 10⁻⁶ · `kPa` 0,001 · `MPa` 1 · `GPa` 1000 · `N/mm2` 1 |
| density (kg/mm3) | `kg/mm3` 1 · `kg/m3` 10⁻⁹ · `g/cm3` 10⁻⁶ |
| temperature (K) | `K` 1 |
| co2e (kg{CO2e}) | `kg{CO2e}` 1 · `t{CO2e}` 1000 |
| dimensionless (1) | `1` 1 · `%` 0,01 |

- Weitere Einheiten nur per Change. Bibliotheken: `uom` (MIT/Apache) prüft Einheiten zur Übersetzungszeit
  und passt nicht zu Werten aus Daten; `rink-core` (MPL-2.0) liest Eingaben, ist aber auf einen Rechner
  ausgelegt. Die Umsetzung darf eine Bibliothek nutzen, wenn sie die Tabelle exakt abdeckt und die Lizenz nach
  ADR-034 erlaubt ist; sonst eigene Tabelle (Erwartung: eigene Tabelle, rund 50 Einträge).
- **Umrechnen** mit f64; Abweichung nach Hin- und Rückrechnung ≤ 10⁻¹² relativ.
- **Lesen von Eingaben:** `<Zahl> [<Code>]`; Dezimalkomma und Dezimalpunkt, optionales Leerzeichen, `°` als
  Schreibweise für `deg`, `"` und `′`/`'` nicht (mehrdeutig). Ohne Code gilt die übergebene Standard-Einheit.
  Formeln sind Sache von ap-08a. Fehlercodes: `parse_error` (nicht lesbar), `unknown_unit`,
  `dimension_mismatch` (Code passt nicht zur Standard-Einheit).

### Größe und Geld im Dokument

- **Größe:** `{"value": <Zahl>, "unit": "<kanonischer Code>"}`.
- **Geld:** `{"amount": "<Dezimalzahl als Zeichenkette>", "currency": "<ISO 4217>"}`, nie Gleitkomma.

### Typdefinitionen

`{"type": "<elementtyp>", "params": {"<name>": {"dimension": "<benannte Dimension>", "default_unit": "<Code>"}}}`.
Registriert zur Laufzeit (`TypeRegistry`), nicht im Dokument gespeichert; Fachpakete liefern sie ab ap-08a
über die Fachpaket-API (ADR-054). Eine Definition mit unbekannter Dimension oder unpassender Standard-Einheit
wird mit `invalid_type_definition` abgelehnt. Komponenten legen Dimensionen ihrer exponierten Parameter in ap-13a fest.

### Regeln beim Schreiben (Operation und Import)

| Eingang | Dimension des Parameters bekannt | unbekannt |
| --- | --- | --- |
| Größe in kanonischer Einheit, passende Dimension | übernommen | übernommen |
| Größe in anderer Einheit derselben Dimension | in kanonische Einheit umgerechnet | in kanonische Einheit ihrer Dimension umgerechnet |
| Größe mit anderer Dimension | Operation abgelehnt `dimension_mismatch` | – |
| Größe mit unbekanntem Code | Operation abgelehnt `unknown_unit` | Operation abgelehnt `unknown_unit` |
| nackte Zahl | Standard-Einheit angenommen, umgerechnet, Warnung `unit_assumed` | unverändert gespeichert, Warnung `unit_missing` |
| Geld als Gleitkomma oder ohne Währung | Operation abgelehnt `invalid_money` | Operation abgelehnt `invalid_money` |

Beim **Stapel-Import** wird nichts als Ganzes abgelehnt: Was eine Operation ablehnen würde, bleibt unverändert
im Element stehen und wird ein Fehler-Befund mit demselben Code. Warnungen bleiben am Element, bis der Wert
mit Einheit gesetzt wird; sie sperren nichts.

### Prüfung

Befund = `{element, field, name, code, severity, message}`, `severity` ist `error` oder `warning`. Codes:
Fehler `invalid_id`, `duplicate_id`, `invalid_name`, `missing_target`, `missing_output`, `orphan`,
`multiple_parents`, `unknown_unit`, `dimension_mismatch`, `non_canonical_unit`, `invalid_money`;
Warnungen `unit_missing`, `unit_assumed`.

- Prüfen ist rein lesend, liefert alle Befunde auf einmal und bricht nie beim ersten Fehler ab.
- Befunde betreffen nur das fehlerhafte Element; alle anderen bleiben les- und änderbar (ADR-050).

### Schema und Beispiele

- Elementform aus ap-01. IDs: ULID für neue Elemente; vorhandene IDs nach `^[A-Za-z0-9][A-Za-z0-9_-]*$`
  bleiben gültig.
- `format/schema/element.schema.json`: Version 1, nicht mehr „Entwurf“, Größe und Geld als `$defs`; jede Zahl
  in `params` ist eine Größe (nackte Zahlen sind schemawidrig, im Kern aber nur Warnung – das Schema
  beschreibt das Sollformat für Austausch).
- `format/examples/raum.json` und `baugruppe.json` werden von Hand mit den richtigen Einheiten überführt
  (Längen mm, α `1`, Kosten als Geld) und validieren danach mit 0 Befunden. Andere Altdaten gibt es nicht.

### Kommandozeile `graphctl` (Schnittstelle der Abnahmetests)

`cargo run -q --release -p cee-graph --example graphctl -- <befehl>`; Ausgabe JSON auf stdout.

| Befehl | Wirkung |
| --- | --- |
| `units` | Einheitentabelle: Code, Dimension (Exponenten), Faktor |
| `parse <text> [--default <code>]` | Größe in kanonischer Einheit oder Fehlercode |
| `convert <wert> <von> <nach>` | Wert oder Fehlercode |
| `import <projekt.json> [--types <datei>] --out <doc>` | Dokument bauen, Befunde ausgeben |
| `validate <doc\|projekt.json> [--types <datei>]` | Befunde |
| `apply <doc> <ops.json> [--types <datei>] --out <doc>` | Ergebnis je Operation (`ok` oder Fehlercode) |
| `export <doc>`, `hash <doc>`, `merge <doc> <doc> --out <doc>` | Projekt-JSON, Hash, Zusammenführen |
| `synth --n <zahl> --seed <zahl> [--corpus units\|validate]` | Projekt-JSON, bei Korpus mit erwarteten Befunden |
| `bench --json` | alle Kennzahlen |

### Performance-Budgets (GitHub-Runner ubuntu-latest, Release-Build)

| Kennzahl | Schwelle |
| --- | --- |
| `load_100k_ms` – Laden 100k mit 10.000 Änderungen Historie | ≤ 2.000 ms |
| `validate_100k_ms` – volle Prüfung 100k | ≤ 1.000 ms |
| `op_p95_ms` – eine Änderung inkl. Einheitenregel, Prüfung und Commit | ≤ 5 ms |
| `parse_p95_us` – eine Eingabe lesen und umrechnen | ≤ 50 µs |
| `import_10k_ms` | ≤ 2.000 ms |
| `import_100k_ms`, `size_100k_mb` | nur gemessen |

Die Abnahmetests messen selbst nach (Median aus 3 Läufen von `graphctl bench --json`) und vergleichen ohne
pauschale Toleranz mit der Schwelle.

### Zuordnung der Abnahmetests (`tests/acceptance/ap-05a-schema-einheiten/`)

| AK | Inhalt | Requirement |
| --- | --- | --- |
| AK-1 | Einheitentabelle vollständig, Faktoren exakt laut Tabelle, Dimensionen richtig | Einheitentabelle |
| AK-2 | Umrechnen hin und zurück an allen Paaren einer Dimension ≤ 10⁻¹²; über Dimensionen abgelehnt | Umrechnung |
| AK-3 | Lesen von Eingaben: 40 Fälle mit erwartetem Ergebnis (Komma, Punkt, °, ohne Code, Fehler) | Eingaben lesen |
| AK-4 | Regeln beim Schreiben: jede Zeile der Regeltabelle als Operation und als Import | Regeln für Zahlen |
| AK-5 | Beispiele und Schema v1: 0 Befunde, 0 Schemafehler, keine Typliste | Schema v1 |
| AK-6 | Prüfung: Korpus mit je 10 Fällen je Code, 100 % erkannt, 0 Falschmeldungen | Prüfung |
| AK-7 | Robustheit: anderes Element änderbar, speicherbar, ladbar trotz Fehler | Prüfung |
| AK-8 | Dokument: Roundtrip, Hash unabhängig von Historie und Actor, Merge 2 × 500 | Dokument |
| AK-9 | Messwerte: alle Schwellen | Leistung |
| AK-10 | Qualität: fmt, clippy, Tests, kein `unwrap`/`expect`/`panic!`/`unsafe` außerhalb von Tests | Qualität |

## Risks / Trade-offs

- **Gleitkomma bei Winkeln:** 90° wird als 1,5707963267948966 rad gespeichert; Rückrechnung ergibt 90 innerhalb
  10⁻¹², die Anzeige rundet (ADR-057). Exakte Dezimalspeicherung wäre aufwendiger und bringt im CAD nichts.
- **Annahme der Standard-Einheit:** bequem, aber eine Quelle stiller Fehler, wenn die Typdefinition falsch
  ist. Gegenmittel: Warnung `unit_assumed` bleibt sichtbar, bis der Wert mit Einheit gesetzt ist.
- **Import 100k bleibt langsam** (Spike 29 s): Transaktion statt Einzel-Commits; reicht das nicht, nur
  berichtet und in ap-07a als vorkodiertes Dokument gelöst.
- **Laufzeit auf dem Runner schwankt:** Schwellen haben Abstand zu den Spike-Werten.

## Entscheidungen des Kernteams (2026-10-19)

1. Import 100k wird nur gemessen und berichtet, ohne Schwelle.
2. Temperatur vorerst nur in K; °C und °F mit Nullpunktverschiebung kommen später per Change.
3. Ein Change in zwei Teilen: ap-05a (dieser) und ap-05b (Abhängigkeiten, Zustände, Migrationen, Teil-Laden).
4. Zahl ohne Einheit: bei bekannter Dimension Standard-Einheit annehmen und warnen, sonst unverändert speichern
   und warnen; nichts wird geraten. Die Beispiele werden von Hand mit Einheiten überführt.
