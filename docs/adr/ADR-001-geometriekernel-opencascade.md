# ADR-001: Geometriekernel OpenCascade

- Status: vorgeschlagen
- Datum: 2026-10-16
- Entscheider: Kernteam

## Kontext

Alle Fertigungsverfahren brauchen exakte B-Rep-Geometrie (Verrundungen, Bohrungen, Toleranzen, STEP). Der Kernel muss offen und kommerziell nutzbar sein.

## Entscheidung

OCCT, angesprochen über die Python-Bindings OCP. OCCT steht unter LGPL 2.1 mit Ausnahmeklausel und ist der einzige offene B-Rep-Kernel mit Industriereife.

## Alternativen

Parasolid (proprietär), Truck und Fornjot (unreif), Manifold (nur Meshes).

## Konsequenzen

Bekannte Schwächen bei komplexen Verrundungen und Booleschen Operationen; Heilungs- und Fallback-Strategien nötig (R-01). Versionen werden gepinnt.
