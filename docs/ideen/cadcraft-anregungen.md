# Anregungen aus CADCraft

Stand: abgelegt 2026-10-19 · Status: Idee, nicht freigegeben · Bezug: ADR-027, ADR-042, ADR-045, ADR-060,
ADR-062, ap-08b, ap-12, ap-15, ap-21, ap-31

## Kurz

[CADCraft](https://github.com/storytold/cadcraft) ist ein quelloffener 2D-CAD-Nachbau im Stil von AutoCAD in
reinem Rust (MIT oder Apache-2.0, nach eigener Angabe Clean-Room): egui-Oberfläche auf Desktop und als WASM im
Browser, Befehlszeile, Objektfang, Bemaßung, Blöcke, DXF und DWG, parametrische Zwangsbedingungen, MCP.
Angelegt am 2026-10-07, frühe und sehr schnelle Entwicklung.

**Nicht als Ganzes übernehmbar:** egui statt Web und Tauri (ADR-031), Dokumentmodell ohne Zusammenarbeit,
reines 2D. Wertvoll sind einzelne Bausteine und Bedienmuster.

## Anregungen

| Anregung | Was CADCraft macht | Für CEE | Paket |
| --- | --- | --- | --- |
| Löser für Zwangsbedingungen | `crates/constraints`: geometrische und maßliche Zwangsbedingungen, eigenes gedämpftes Gauss-Newton-Verfahren, Freiheitsgrade, Formeln, automatisches Erkennen, Widerspruchserkennung; hängt an `cadcraft-doc` | Freizügige Alternative zu PlaneGCS (ADR-027); Vergleich als Spike zu Beginn von ap-12 (ADR-062, offene Frage 1) | ap-12 |
| Eingabe beim Skizzieren | Objektfang (Endpunkt, Mitte, Zentrum, Schnitt, Lot, Tangente, auch verzögert), Polarfang, Ortho, Werte direkt tippen (`@5<45`, `@dx,dy`), Griffe mit Leertaste zum Wechseln (Strecken, Schieben, Drehen, Skalieren, Spiegeln) | Bewährte Abläufe für Skizzen und „Werte beim Ziehen tippen“; als Navigations- und Eingabeprofil denkbar (ADR-060) | ap-12, ap-08b |
| Befehlszeile mit Rückfragen | Befehle mit Schlüsselwörtern in `[Klammern]`, Autovervollständigen, Wiederholen per Enter oder Rechtsklick, Skripte | Ergänzung zur Befehlssuche: Befehle mit Rückfragen nacheinander, auch als Text für Agenten | ap-08a |
| Für Agenten gebaut | jeder Menüpunkt und jedes Werkzeug ist ein Befehl; Agenten tippen in die Befehlszeile, rufen Befehle per JSON auf, prüfen und rendern das Ergebnis – über MCP, JSON-Kanal oder `cadcraft-cli` | Bestätigt das Befehlsregister (ADR-045, ADR-060); Werkzeugschnitt und „prüfen, dann rendern“ als Vorlage für den MCP-Endpunkt | ap-15 |
| DXF und DWG | DXF lesen (R12–2018) und schreiben (R2000) in reinem Rust; DWG über acadrust (MPL-2.0) | Kandidaten für den Import von Grundrissen und Skizzen aus DXF (ADR-042, F-19) | ap-21 |
| Bemaßung und Layouts | alle DIM-Befehle mit Bemaßungsstilen, assoziative Maße, Papierbereich mit Ansichtsfenstern, Plotten als PDF | Anschauung für Zeichnungsblätter und Bemaßung nach der Beta | ap-31 |
| Oberflächentests | `egui_kittest`: UI-Tests mit simulierter Eingabe | Ergänzt die Testzustände per Adresse ([desigma-anregungen](desigma-anregungen.md)) | ap-08b |
