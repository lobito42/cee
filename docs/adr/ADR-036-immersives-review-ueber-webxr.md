# ADR-036: Immersives Review über WebXR

- Status: vorgeschlagen
- Datum: 2026-10-17
- Entscheider: Kernteam

## Kontext

Immersive Unterstützung ist gewünscht, aber kein Kern des ersten Produkts.

## Entscheidung

Immersive Ansicht über WebXR im Browser, aufbauend auf der Interaktionsschicht (ADR-026): Modell in Originalgröße betrachten, Elemente auswählen, kommentieren, gemeinsam mit Anwesenheit. Kein Modellieren in XR. Frühestens nach der Beta (ADR-059).

## Alternativen

Native XR-Apps (Unity, OpenXR).

## Konsequenzen

Element-IDs und Kommentare müssen von Anfang an unabhängig von der Darstellung adressierbar sein.
