# ADR-018: Adressierung per URI

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Veröffentlichte Elemente müssen projektübergreifend referenzierbar sein.

## Entscheidung

Jedes veröffentlichte Element ist unter `cadloop://<repo>/<bauteil>@<version>#<name>` erreichbar (MCP, Extension, STEP-Attribut). Querverweise nur auf veröffentlichte Elemente.

## Alternativen

Freie Referenzen auf jede Topologie.

## Konsequenzen

Interne Hilfsfeatures dürfen sich frei ändern; Auswirkungsanalyse wird eine einfache Abfrage.
