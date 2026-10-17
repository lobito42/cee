# ADR-031: Web-App und Desktop-App mit Tauri

- Status: akzeptiert
- Datum: 2026-10-17
- Entscheider: Kernteam

## Aktuell gilt (Stand 2026-10-18)

Tablet und Handy haben eigene Rollen und Layouts (ADR-060): Tablet vor Ort (Aufmaß, Skizze, Präsentation, offline), Handy für Ansehen, Kommentieren, Freigeben und QR-Adressen. XR siehe ADR-060.

## Kontext

Das Produkt soll im Browser und auf allen gängigen Betriebssystemen laufen, online wie offline. VS Code ist kein Ziel-Client.

## Entscheidung

Ein Client in TypeScript (`client/`, Vite, Interaktionsschicht nach ADR-026). Er läuft als Web-App und als Tauri-2-App für Linux, Windows und macOS. Desktop: Kern nativ, lokaler Speicher, lokaler Geometrie-Worker, voll offline-fähig. Browser: Kern als WASM, Geometrie über den Server. Tablet und Handy: Web-App für Ansehen, Kommentieren und Freigeben. Immersives Review über WebXR (ADR-036).

## Alternativen

VS-Code-Extension (ADR-005); Electron; native Apps je Betriebssystem.

## Konsequenzen

Ersetzt ADR-005. ADR-022 gilt für die Web-Arbeitsfläche mit eigenen Design-Tokens statt VS-Code-Variablen. Unterschiede der Web-Engines (WebKitGTK, WebView2, WKWebView) brauchen eigene UI-Tests.
