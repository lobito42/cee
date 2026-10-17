# ADR-044: Bedienmuster aus Blender

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-054 (Arbeitsbereiche als Beitrag der Fachpakete)

## Kontext

Blender macht mächtige Werkzeuge mit wenigen, gut durchdachten Mustern bedienbar. Einige davon passen zu
CEE und zum Figma-Bedienkonzept (ADR-022), ohne dessen Schlankheit zu gefährden.

## Entscheidung

1. **Werte beim Ziehen tippen:** Während einer Bewegung, Drehung oder Größenänderung kann man eine Achse
   sperren und einen Wert tippen (z. B. „1200“); Einheiten und einfache Formeln sind erlaubt. Kein Dialog.
2. **Arbeitsbereiche:** Die Oberfläche hat vier Arbeitsbereiche – **Raum, Akustik, Präsentation, Bericht** –
   als Reiter in der Kopfzeile. Jeder zeigt nur die passenden Panels und Werkzeuge; Modell, Auswahl und
   Befehlssuche bleiben gleich.
3. **Stapel als einfache Sicht auf den Graphen:** Für ein ausgewähltes Element zeigt das Eigenschaften-Panel
   die nicht-destruktiven Schritte als sortierbare Liste (z. B. Absorber → Raster → Abstand zur Decke),
   einzeln abschaltbar. Der Stapel ist eine weitere Projektion desselben Graphen (ergänzt ADR-035), für alle,
   die keine Knoten wollen.
4. **Aktion als Code:** Jede Aktion in der Oberfläche ist als Graph-Operation bzw. Zeile der Textprojektion
   sichtbar und kopierbar (Tooltip und Aktionsprotokoll). Dieselbe Form nutzen Agenten über MCP.
5. **Fotomodus mit Denoiser:** Path-Tracing-Bilder werden entrauscht (Open Image Denoise, Apache-2.0, bzw.
   ein gleichwertiger Denoiser im Browser), damit der Fotomodus mit wenigen Samples auskommt (ergänzt ADR-040).

## Alternativen

Dialoge für exakte Werte; eine einzige Oberfläche für alle Aufgaben; nur Knoten-Editor als Graph-Sicht.

## Konsequenzen

Ändert ADR-022 (Arbeitsbereiche, Stapel), ergänzt ADR-035 und ADR-040. Weitere Anregungen aus Blender
liegen im Ideenspeicher (`docs/ideen/blender-anregungen.md`).
