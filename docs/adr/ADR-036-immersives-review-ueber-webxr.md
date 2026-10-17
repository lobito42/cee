# ADR-036: Immersives Review über WebXR

- Status: vorgeschlagen
- Datum: 2026-10-17
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-18)

Ergänzt durch ADR-060: In XR sind einfache Bearbeitungen erlaubt (Instanzen platzieren, verschieben, austauschen, Variante wählen), aber kein Modellieren und keine Freigabe; dazu Höreindruck (vorher/nachher) und AR. Zielgeräte, Budgets und Reihenfolge stehen in ADR-060.

## Kontext

Immersive Unterstützung ist gewünscht, aber kein Kern des ersten Produkts.

## Entscheidung

Immersive Ansicht über WebXR im Browser, aufbauend auf der Interaktionsschicht (ADR-026): Modell in Originalgröße betrachten, Elemente auswählen, kommentieren, gemeinsam mit Anwesenheit. Kein Modellieren in XR. Frühestens nach der Beta (ADR-059).

## Alternativen

Native XR-Apps (Unity, OpenXR).

## Konsequenzen

Element-IDs und Kommentare müssen von Anfang an unabhängig von der Darstellung adressierbar sein.
