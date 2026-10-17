# ADR-018: Adressierung per URI

- Status: ersetzt durch ADR-058
- Datum: 2026-10-16
- Entscheider: Kernteam
- Geändert durch: ADR-028

## Aktuell gilt (Stand 2026-10-17)

Ersetzt durch ADR-058: Adressen beruhen auf der Element-ID, Namen sind Aliase. Querverweise nur auf veröffentlichte Elemente gelten weiter.

## Kontext

Veröffentlichte Elemente müssen projektübergreifend referenzierbar sein.

## Entscheidung

Jedes veröffentlichte Element ist unter `cee://<repo>/<bauteil>@<version>#<name>` erreichbar (MCP, Extension, STEP-Attribut). Querverweise nur auf veröffentlichte Elemente.

## Alternativen

Freie Referenzen auf jede Topologie.

## Konsequenzen

Interne Hilfsfeatures dürfen sich frei ändern; Auswirkungsanalyse wird eine einfache Abfrage.
