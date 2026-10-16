# Regeln für Geometrie (Worker in Python, build123d/OCP)

- Der Worker ist zustandslos: Eingabe ist eine Nachricht nach `format/kernel/`, Ausgabe ein Ergebnis mit
  Inhalts-Hash. Kein Zugriff auf Datenbank, Netz oder Dateien außerhalb des Auftrags (ADR-032).
- Topologie nie über Listenindizes referenzieren (`faces()[3]`). Immer über Element-ID, Selektor mit
  Begründung oder veröffentlichten Namen (ADR-016).
- Jede Kernel-Operation, die Topologie erzeugt oder verändert, zeichnet die Topologie-Historie auf, damit
  Unter-IDs stabil bleiben. Direkte OCP-Aufrufe nur im Modul `kernel` des Workers.
- Operationen sind deterministisch: keine Zufallszahlen, keine Zeit, keine globalen Zustände (ADR-025).
- Toleranzen immer explizit: `TOL_LINEAR = 1e-6` mm und `TOL_ANGULAR = 1e-9` rad.
- Kernel-Fehler (`StdFail_NotDone`, ungültige Shapes) als strukturierte Antwort mit Element-ID und
  Hinweis zurückgeben; nie verschlucken. Ein Absturz darf nur den Worker treffen.
- Neue Geometrie-Funktion = mindestens ein Golden-Test (Volumen, Fläche, Schwerpunkt, Topologie-Zählung).
- Performance: kein Ray-Casting oder Tessellieren in Schleifen über Flächen ohne Cache.
