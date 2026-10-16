# Regeln für Geometrie-Code (Python, build123d/OCP)

- Topologie nie über Listenindizes referenzieren (`faces()[3]`). Immer über Feature-ID, Selektor mit
  Begründung oder veröffentlichten Namen (ADR-016).
- Jede Kernel-Operation, die Topologie erzeugt oder verändert, läuft über die Wrapper in
  `cadloop_core.ops`, damit die Topologie-Historie aufgezeichnet wird. Direkte OCP-Aufrufe nur in
  `cadloop_core.kernel`.
- Features sind deterministisch: keine Zufallszahlen, keine Zeit, keine globalen Zustände (ADR-025).
- Toleranzen immer explizit: `TOL_LINEAR = 1e-6` mm und `TOL_ANGULAR = 1e-9` rad aus `cadloop_core.tol`.
- Kernel-Fehler (`StdFail_NotDone`, ungültige Shapes) in `CadloopGeometryError` mit Feature-ID und
  Hinweis übersetzen; nie verschlucken.
- Neue Geometrie-Funktion = mindestens ein Golden-Test (Volumen, Fläche, Schwerpunkt, Topologie-Zählung).
- Performance: kein Ray-Casting oder Tessellieren in Schleifen über Flächen ohne Cache.
