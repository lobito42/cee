# Idee: Weitere Anregungen aus Blender

Stand: abgelegt 2026-10-17 · Status: Idee, nicht freigegeben · Übernommen sind bereits (ADR-044): Werte beim
Ziehen tippen, Arbeitsbereiche, Stapel als Sicht, Aktion als Code, Denoiser im Fotomodus.

## Bedienung

| Blender | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Fangen mit umschaltbaren Modi (Kante, Mitte, Raster) während der Bewegung | Fangmodi für Grundriss und Absorber-Raster, per Taste während des Ziehens wechseln | mit ap-09 und ap-13 |
| Annotationen (Grease Pencil) | Freihand-Notizen und Skizzen im 3D-Raum, z. B. beim Termin mit dem Kunden; als Kommentar-Elemente | mit Kommentaren, Phase 2 |
| Kreismenüs (Pie Menus) | Optionales Radialmenü für Stift und Trackpad, nur für häufige Aktionen | nach Nutzertests |
| Undo-Verlauf als Liste | Verlauf mit benannten Schritten, Sprung zurück; baut auf der CRDT-Historie auf | mit ap-25 |

## Modellieren und Bibliotheken

| Blender | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Asset Browser mit Katalogen, Tags, Vorschaubildern | Bibliotheks-Reiter mit Facetten und Sammlungen (keine Ordner, ADR-052) und automatisch gerenderten Vorschaubildern | mit ap-13 |
| Drivers (Parameter per Formel gekoppelt) | Formeln über Elementgrenzen, z. B. Segelanzahl aus Raumfläche; im Graphen als Eingänge | mit ap-05 |
| Node Groups als Assets | Erledigt: veröffentlichte Untergraphen werden Befehl, Knoten und Komponente (ADR-049) | – |

## Materialien und Rendering

| Blender | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Materialvorschau als Kugel | Vorschau je Material, zusätzlich mit α-Kurve je Oktavband und Absorberklasse | mit ap-10 |
| Ansichtsmodi Solid / Materialvorschau / Gerendert | Umschalter Arbeiten · Material · Foto in der Arbeitsfläche | mit ap-14 |
| HDRI-Welten | Licht-Vorlagen: Büro hell, Tageslicht, Abend; eigene HDRIs möglich | mit ap-14 |

## Projekt und Gemeinschaft

- **Stiftung und Development Fund:** Eine neutrale Trägerorganisation, finanziert durch viele kleine Beiträge
  von Nutzern und Firmen, hält das Projekt unabhängig und verringert den Anreiz zu Forks.
- **Eigene Produktionen als Treiber:** Wie Blenders „Open Movies“ – die Firma als Pilot mit echten Angeboten
  bestimmt, was als Nächstes gebaut wird.
- **Erweiterungsplattform:** Offizielle Plattform für Plugins und Bibliotheken (Plugin-SDK, ap-27).
- **Stabile Versionen mit Langzeitpflege (LTS):** für Firmen, die nicht jedes Update mitgehen wollen.

## Bewusst nicht übernehmen

Viele Editoren gleichzeitig, Hunderte Tastenkürzel als Hauptbedienung, verschachtelte Menüs und
Eigenschaften-Reiter mit Dutzenden Bereichen, steile Einstiegskurve.
