# Idee: Anregungen aus FreeCAD

Stand: abgelegt 2026-10-27 · Status: nur Referenz, nicht freigegeben. Unsere Ziele bleiben: präziser Kernel,
optimiert auf KI und Einsteiger (ADR-062). **Lizenz:** FreeCAD steht unter LGPL-2.1+; Übernahme nur dynamisch oder
im Worker-Prozess (ADR-034). PlaneGCS aus FreeCAD nutzen wir bereits (ADR-027). Der Befehlsabgleich mit FreeCAD ist in
ADR-065 eingearbeitet. CADCraft steht in `cadcraft-anregungen.md` (schon abgelegt).

| FreeCAD | Idee für CEE | Wann sinnvoll |
| --- | --- | --- |
| Parametrischer Baum (Skizze → Feature → Feature), Neuberechnung | Entspricht dem Graphen; Fehler eines Features zerbrechen das Modell nicht (ADR-050) | mit ap-06 |
| Bekanntes Problem der wechselnden Flächennamen („Topological Naming“) | Lehre bestätigt ADR-016: Topologie nie über Indizes, sondern über stabile Adressen. Früh testen, nicht nachrüsten | Stufe 3/4 des Streifens, ap-39 |
| Arbeitsbereiche (Part Design, Sketcher, Assembly) als Wechsel der Oberfläche | Nur wenige Arbeitsbereiche als Beiträge der Fachpakete (ADR-054); Anfänger sehen nur, was zur Aufgabe passt | mit ap-08b |
| Python-Konsole und Makros, Befehle als Skript aufnehmen | Befehlsregister mit Argumenten = Aufzeichnung und KI-Schnittstelle in einem | mit ap-50/51 |
| Viele Funktionen und Menüs gleichzeitig sichtbar | Gegenbeispiel für Einsteiger: lieber wenige, nur wirksame Befehle (so wie in der Menü-Nachbesserung) | laufend |

## Bewusst nicht

- Hohe Einstiegshürde durch Fülle an Arbeitsbereichen und Menüs.
- Eigener, ans Programm gebundener Kernel-Zugriff: CEE trennt Kernel-Schnittstelle und Oberfläche (ADR-032).
- GPL-Teile; LGPL nur wie in ADR-034.
