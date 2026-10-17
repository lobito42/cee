# ADR-054: Fachpakete: interne API zuerst, Arbeitsbereiche als Beitrag

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

ADR-046 verlangt, dass auch mitgelieferte Fachpakete nur das Plugin-SDK nutzen. Das öffentliche SDK (ap-27)
kommt aber erst in Phase 2, die Fachpakete Raum und Akustik schon in Phase 1. Außerdem liegt die Akustik als
Crate neben dem Kern (ADR-041), und die vier Arbeitsbereiche (ADR-044) sind fest auf Raumakustik zugeschnitten.

## Entscheidung

1. **Eine Fachpaket-API, zwei Reifegrade:** Ab ap-05 bzw. ap-08 gibt es eine **interne Fachpaket-API** mit
   Manifest und Beitragsarten nach ADR-045 (Elementtypen, Befehle, Knoten, Panels, Regeln, Arbeitsbereiche,
   Aufgaben und Prüfer). Mitgelieferte Fachpakete nutzen ausschließlich diese API. Das öffentliche SDK (ap-27)
   ist dieselbe API, stabil versioniert und dokumentiert; bis dahin darf sich die API ändern.
2. **Ablage:** Fachpakete liegen unter `packages/<name>/` (Manifest, TypeScript, Python). Rechenintensive Teile
   bringt ein Fachpaket als eigenes Crate `crates/<name>` mit (z. B. `crates/acoustics`), eingebunden über
   dieselben Bindungen wie der Kern (WASM, NIF). Fachpakete hängen vom Kern ab, nie umgekehrt; `crates/graph`
   kennt keine Fachpakete.
3. **Arbeitsbereiche sind Beiträge:** Der Kern bringt einen allgemeinen Arbeitsbereich **Modell**. Weitere
   Arbeitsbereiche steuern Fachpakete bei; das Paket Raum und Akustik liefert Raum, Akustik, Präsentation und
   Bericht. Ein Projekt zeigt die Arbeitsbereiche seiner aktiven Fachpakete, höchstens fünf gleichzeitig
   sichtbar; mehr nur über die Befehlssuche.

## Alternativen

Fachpakete bis ap-27 direkt im Kern; feste Arbeitsbereiche für alle; Akustik im Graph-Kern.

## Konsequenzen

Ändert ADR-041 (Akustik ist Fachpaket-Crate, nicht Kern), ADR-044 (Arbeitsbereiche) und präzisiert ADR-046.
ap-09, ap-10 und ap-11 hängen von der internen Fachpaket-API ab (ap-05, ap-08).
