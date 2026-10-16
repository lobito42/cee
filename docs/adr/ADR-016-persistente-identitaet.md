# ADR-016: Persistente Identität

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Topological Naming Problem: Nach Änderungen werden Flächen und Kanten neu nummeriert, Referenzen brechen.

## Entscheidung

Drei Stufen: (1) explizite Feature-IDs im Code; (2) Unter-IDs aus der Topologie-Historie jeder OCCT-Operation, abgegriffen über OCP; (3) Geometrie-Signatur als Rückfall. Bleibt es mehrdeutig, wird der Konstrukteur gefragt.

## Alternativen

Topologie-Indizes; reines Geometrie-Matching; OCAF/TNaming direkt (im Spike S1 bewertet).

## Konsequenzen

Anspruchsvollstes Arbeitspaket (AP-17, R-10); Grundlage für Publikation, PMI und Zeichnungen.
