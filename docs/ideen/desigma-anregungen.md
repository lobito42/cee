# Anregungen aus desigma

Stand: abgelegt 2026-10-19 · Status: Idee, nicht freigegeben · Bezug: ADR-022, ADR-043, ADR-045, ADR-060,
ap-08b, ap-15

## Kurz

[desigma](https://github.com/deepfounder-ai/desigma) ist eine freie Figma-Alternative in Rust (MIT oder
Apache-2.0): native Desktop-App mit egui, 2D-Renderer auf der CPU (tiny-skia), Import von Figma-Dateien,
MCP-Server. Angelegt am 2026-10-11, frühe Alpha, sehr schnell gewachsen.

**Nicht als Abhängigkeit:** reines 2D-Interface-Design, keine Zusammenarbeit (kein CRDT), andere Oberfläche
(egui statt Web und Tauri, ADR-031) und zu jung, um darauf zu bauen. Wertvoll sind einzelne Muster.

## Anregungen

| Anregung | Was desigma macht | Für CEE | Paket |
| --- | --- | --- | --- |
| Screenshots ohne Klicken | `--fixture showcase --select Home --panel variables --screenshot out.png` bringt die App in einen festen Zustand und fotografiert ihn | Testzustände per Adresse (Testprojekt, Auswahl, Panel, Werkzeug, Thema, Layout) für `npm run ui:snapshot`; damit prüfen Agenten UI-Änderungen nachts selbst (ui-checker, `tests/ui-reference/`) | ap-08b |
| Bildvergleich mit Bericht | `desigma-diff`: Pixelvergleich mit Erkennung von Kantenglättung und SSIM, HTML-Bericht | Vorlage für den Vergleich gegen `tests/ui-reference/`; als Werkzeug eher etablierte Bibliotheken (pixelmatch, odiff) | ap-08b |
| Befehle mit exakter Umkehrung | jede Änderung ist ein `Command` mit Gegenstück, Rückgängig über denselben Weg | Bestätigt Befehle als Daten mit Wirkung im Kern (ADR-045, ADR-060); Umkehrung je Befehl im Befehlsregister festhalten | ap-08a |
| Komponenten und Überschreibungen | Varianten, Text-, Bool- und Tausch-Eigenschaften, Überschreibungen je Instanz, „Zurücksetzen“ und „Lösen“ | Anschauung für Instanzen nach ADR-043 und das Figma-Bedienkonzept (ADR-022) | ap-13a |
| MCP für Dateien | 13 Werkzeuge: importieren, Ebenen und Tokens prüfen, bearbeiten mit Rückgängig, Code erzeugen | Werkzeugschnitt für den MCP-Endpunkt; Bearbeiten nur als Änderungssatz (ADR-021) | ap-15 |
| Variablen mit Modi | Sammlungen von Variablen mit Modi (z. B. hell/dunkel), an Felder gebunden | Projektvariablen mit Modi als einfache Form von Varianten prüfen | ap-13a |
