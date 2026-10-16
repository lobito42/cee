# ADR-003: Code ist die Quelle der Wahrheit

- Status: ersetzt durch ADR-028
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Modelle müssen versionierbar, reviewbar und für Claude les- und schreibbar sein.

## Entscheidung

Jedes Bauteil ist ein Python-Modul mit typisierten Parametern und einer `build()`-Funktion. STEP, STL und Renderings sind abgeleitete Artefakte und werden nicht eingecheckt.

## Alternativen

Eigenes Datei- oder Featureformat.

## Konsequenzen

Volle Git-Historie, Code-Review und Diff auf Parameterebene. Konstrukteure arbeiten primär über Arbeitsfläche und Claude.
