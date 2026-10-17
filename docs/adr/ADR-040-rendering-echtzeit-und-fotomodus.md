# ADR-040: Rendering: Echtzeit und Fotomodus im Client

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam
- Geändert durch: ADR-044

## Kontext

Für Angebote und Abstimmung mit Kunden braucht es eine ansprechende Echtzeit-Ansicht und auf Knopfdruck fotorealistische Bilder – ohne eigene Renderfarm und auch auf dem Desktop offline.

## Entscheidung

Echtzeit: three.js mit physikalisch basierten Materialien (aus ADR-039), Umgebungsbeleuchtung (HDRI), Schatten und Tonemapping. Fotomodus: progressives Path Tracing im Client mit `three-gpu-pathtracer` (MIT) auf derselben Szene; Ergebnis als PNG in wählbarer Auflösung. Austauschformat für Szenen und Assets ist glTF 2.0. Keine Rendering-Dienste in der Cloud.

## Alternativen

Externer Renderer (Blender/Cycles, GPL); Render-Server.

## Konsequenzen

Ergänzt ADR-026. Szenen müssen in glTF darstellbar sein; Materialien brauchen gute Standardwerte. Leistung auf schwacher Hardware wird in Spike ap-04 gemessen.
