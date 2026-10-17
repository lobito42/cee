# ADR-017: Manifest als Lockfile mit semantischer Versionierung

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-028, ADR-047 (Manifest im Freigabestand)

## Kontext

Schnittstellenänderungen müssen im Review sichtbar sein.

## Entscheidung

Jeder Build schreibt deterministisch `part.manifest.json` mit allen veröffentlichten Elementen (ID, Name, Typ, Quell-Feature, Geometrie-Hash, Bezüge). Eingecheckt; SemVer-Vorschlag automatisch.

## Alternativen

Nur Git-Commits; PLM-Datenbank.

## Konsequenzen

Git bleibt das einzige Versionssystem; spätere PLM-Anbindung liest nur das Manifest.
