# ADR-002: build123d als Modelliersprache

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-028 (build123d nur noch im Worker und in Script-Elementen)

## Kontext

Die Sprache muss für LLMs leicht und fehlerarm schreibbar sein und Topologie gezielt selektierbar machen.

## Entscheidung

build123d (Apache-2.0). Builder-Kontexte, Selektoren und Typ-Hints liefern lesbaren, gut prüfbaren Code; Joints unterstützen Baugruppen.

## Alternativen

CadQuery (gleicher Kernel, lange Method-Chains, fehleranfälliger für LLMs); OpenSCAD (nur CSG/Mesh, kein STEP).

## Konsequenzen

Verbesserungen werden upstream beigetragen. Eigene Erweiterungen liegen in `cadloop-core`.
