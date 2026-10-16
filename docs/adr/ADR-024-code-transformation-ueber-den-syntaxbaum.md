# ADR-024: Code-Transformation über den Syntaxbaum

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

UI-Aktionen müssen Python-Code ändern, ohne Formatierung und Kommentare zu zerstören.

## Entscheidung

Alle UI-Aktionen erzeugen Änderungen über LibCST. Bauteilmodule folgen einer Konvention (Params-Dataclass, `with feature(...)`, `publish(...)`), erzwungen per Linter.

## Alternativen

Regex-Ersetzungen; Code nur generieren.

## Konsequenzen

UI- und KI-Änderungen sind derselbe lesbare Diff; Code außerhalb der Konvention gilt als „nur im Code“.
