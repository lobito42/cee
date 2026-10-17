# ADR-038: Erster Anwendungsfall: Raumgestaltung und Raumakustik

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-046 (Raum und Akustik als erstes Fachpaket)

## Kontext

Der erste Nutzer ist eine kleine Firma, die Schallabsorber entwickelt und vertreibt. Sie braucht Räume schnell modelliert, Absorber platziert, die akustische Wirkung berechnet und das Ergebnis überzeugend gezeigt – mit Mengen, Kosten und CO₂ für das Angebot.

## Entscheidung

Die ersten Elementtypen nach dem Datenmodell sind: `level` (Geschoss mit Grundriss), `wall` (Achse, Dicke, Höhe, Schichtaufbau), `slab` (Boden, Decke), `opening` (Fenster, Tür; sitzt in einer Wand), `furniture` (Möbel aus Bibliothek oder eigenem Untergraphen), `absorber` (Produkt mit Varianten: Wandpaneel, Deckensegel, Baffel, Stellwand), `material` (ADR-039) und `analysis` (ADR-041). Bauteile wie Absorber entstehen mit Skizze und Extrusion. Ein Raum ist ein Element mit Untergraph wie jedes Bauteil. Der Grundriss ist eine 2D-Ansicht derselben Elemente, keine eigene Zeichnung.

## Alternativen

Fräs- und Blechteile zuerst (bisheriger Plan); vollständiges BIM.

## Konsequenzen

Fertigungsregeln (Fräsen, 3D-Druck, Blech) folgen nach der Beta. Kein vollständiges BIM: keine Statik, keine Haustechnik, kein Bauantrag. IFC dient zum Übernehmen von Räumen aus Architekturmodellen (ADR-042).
