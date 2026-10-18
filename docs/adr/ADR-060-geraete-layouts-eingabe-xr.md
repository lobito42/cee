# ADR-060: Geräte, Layouts, Eingabe und XR

- Status: akzeptiert
- Datum: 2026-10-18 (am selben Tag nachgeschärft: Zielsysteme, kein Handy, iPad, Weg zur Vision Pro)
- Entscheider: Kernteam

## Kontext

ADR-022, ADR-031 und ADR-044 beschreiben die Oberfläche vor allem für den Schreibtisch. In KMU beginnen Projekte
aber oft vor Ort (Aufmaß beim Kunden, häufig ohne Netz) und werden beim Kunden präsentiert. Konstrukteure erwarten
eine 3D-Maus, Umsteiger die Navigation ihres bisherigen CAD. VR und AR machen räumliche Entscheidungen erlebbar –
für Raumakustik besonders, weil man das Ergebnis auch hören kann. Das Kernteam arbeitet auf Linux und Mac; das
Endziel für räumliches Arbeiten ist die Apple Vision Pro.

## Entscheidung

1. **Zielsysteme mit Priorität:**

   | Priorität | System | Rolle |
   | --- | --- | --- |
   | 1 | Linux, macOS (Tauri und Browser) | Arbeiten am Modell, Hauptziel; Feinschliff und UI-Referenzbilder zuerst hier |
   | 2 | Windows (Tauri und Browser) | läuft mit: CI-Pflicht, Fehler werden behoben, keine Windows-Sonderfunktionen |
   | 3 | iPad | Tablet-Ziel: zuerst Safari, später native App (Punkt 6) |
   | 4 | Meta Quest, Apple Vision Pro | XR: zuerst WebXR, Endziel native App auf der Vision Pro (Punkt 6) |
   | – | Handy | kein Ziel: kein eigenes Layout, kein Testaufwand; Links öffnen „so gut es geht“ |

   Plattformdetails: Unter Linux nutzt Tauri WebKitGTK – das schwächste Glied (3D-Leistung, WebGPU, kein WebHID);
   ap-04 misst es ausdrücklich, Ausweg ist der Chromium-Browser bzw. eine Tauri-Variante mit Chromium, sobald
   reif. Auf macOS bekommt die App das systemübliche kleine App-Menü (Über, Einstellungen, Bearbeiten, Beenden),
   damit Zwischenablage und Cmd-Kürzel funktionieren – die einzige Menüleiste, ihre Einträge sind Befehle
   (Ausnahme zu ADR-022). Kürzel folgen der Plattform (Cmd bzw. Strg). Mac-App und Apple-Apps werden signiert und
   beglaubigt.

2. **Eine Oberfläche, zwei Layouts:** **Desktop** (Maus und Trackpad) und **Tablet** (Touch und Stift auf dem
   iPad: Panels als Schubladen, Bedienflächen ≥ 44 px, langes Drücken = Kontextaktionen). Gewählt wird nach
   Bildschirm und Eingabegerät, umschaltbar. Beide rufen dieselben Befehle auf (ADR-045); kein Layout hat eigene
   Logik.

3. **Eingabe ist eine austauschbare Schicht:** Maus, Trackpad, Touch, Stift, 3D-Maus, XR-Controller, Hände, Blick
   und Sprache erzeugen nur Befehle und Kameraänderungen. **Navigationsprofile** („wie Onshape“, „wie SolidWorks“,
   „wie Fusion“, „wie Blender“, eigenes) sind eine Einstellung (Ebenen nach ADR-045). Keine Funktion hängt am
   Überfahren mit der Maus.

4. **Befehle sind Daten, ihre Wirkung liegt im Kern (präzisiert ADR-045):** Jeder Befehl hat eine Beschreibung als
   Daten (stabile ID, Parameter-Schema mit Einheiten, Übersetzungsschlüssel) und wirkt als Graph-Operation im
   Rust-Kern, nicht als Code im TypeScript-Client. So nutzen Web-Client, Tauri, ein nativer Apple-Client, MCP und
   die PLM-Schnittstelle dasselbe Register. Pflicht ab ap-08a.

5. **3D-Maus (SpaceMouse und kompatible Geräte):**
   - **Wege:** In Tauri nativ über HID aus Rust (`hidapi`, freizügig) – auf Linux und Mac der Hauptweg, weil
     WebKit kein WebHID hat; im Chromium-Browser über WebHID; unter Linux zusätzlich über den Socket von
     `spacenavd`, falls er läuft (eigener Prozess, nicht gelinkt). Kein proprietäres Hersteller-SDK (ADR-034).
   - **Bewegung:** sechs Achsen gleichzeitig, Drehpunkt = Auswahl bzw. Punkt unter dem Mauszeiger, Modi
     „Objekt bewegen“ und „Kamera fliegen“ (für Begehungen), Empfindlichkeit und Totzone je Achse,
     Achsen sperren (z. B. nur drehen, Horizont halten).
   - **Tasten:** frei belegbare Befehle aus dem Befehlsregister; Standard: Ansicht einpassen, Standardansichten,
     Befehlssuche öffnen, Rückgängig.
   - **Zusammenspiel:** linke Hand 3D-Maus, rechte Hand Maus – beide gleichzeitig, ohne Moduswechsel.
   - Spike ap-42 prüft Konflikte mit Hersteller-Treibern, die das Gerät exklusiv belegen.

6. **XR in zwei Stufen (ändert ADR-036):**
   - **Stufe 1 – WebXR** (ap-29): im Browser auf derselben Interaktionsschicht (ADR-026). Meta Quest und Vision Pro
     (Safari) für VR; AR mit Passthrough dort, wo der Browser es kann (Quest). Auf der Vision Pro ist WebXR-AR derzeit
     nicht verlässlich verfügbar. Geometrie kommt tesselliert aus dem Cache des Servers (ADR-032).
   - **Stufe 2 – native Apple-App** (ap-44, iPad und Vision Pro, SwiftUI und RealityKit): für alles, was nur nativ
     geht – Raumverankerung und Raumerkennung, AR an echter Decke und Wand, räumliches Audio des Systems für den
     Höreindruck, Fenster und Volumen neben anderen Apps, Stift und LiDAR auf dem iPad (Aufmaß, Raumscan).
     **Dünner Client ohne eigene Logik:** Datenmodell aus dem Rust-Kern über eine Swift-Bindung (z. B. UniFFI),
     Geometrie als USDZ bzw. glTF aus dem Cache, Änderungen nur als Befehle (Punkt 4), Abgleich über dasselbe
     Sync-Protokoll.
   - **Begehung:** Raum in Originalgröße oder als Puppenhaus auf dem Tisch; Teleport als Standard
     (Bequemlichkeit); Messen mit Controller bzw. Hand; Kommentare im Raum landen am Element (ADR-058).
   - **Höreindruck:** Platz wählen und den Raum vorher und nachher hören. Erste Stufe statistisch aus der
     Nachhallzeit je Oktavband (Faltung mit erzeugter Impulsantwort); später geometrisch (ap-30). Immer als
     „Höreindruck, kein Messwert“ gekennzeichnet.
   - **Einfaches Bearbeiten erlaubt, Modellieren nicht:** Instanzen platzieren, verschieben, an Verbindungspunkte
     rasten, austauschen, Variante umschalten – als normale Graph-Operationen mit Verlauf. Kein Skizzieren, keine
     Features, keine Freigabe in XR.
   - **Gemeinsam:** mehrere Personen in derselben Sitzung (Desktop, iPad, Brille gemischt), Anwesenheit nur
     flüchtig (ADR-056); wer am Desktop sitzt, sieht Standort und Blickrichtung der Brillenträger.
   - **Budgets:** ≥ 72 fps auf Meta Quest 3 bzw. die Bildrate des Systems auf der Vision Pro, für einen Raum mit
     50 Objekten (Detailstufen, Instancing, gebackenes Licht); keine Bewegung der Kamera, die der Kopf nicht macht.

7. **Offline nach Gerät:** Desktop (Tauri) voll; native iPad-App für Aufmaß und einfache Räume mit
   Näherungsvorschau (ADR-025), exakte Geometrie nach dem Abgleich; Browser: Geladenes ansehen, Kommentare puffern.

8. **Grundsätze:** gestufte Komplexität (Einsteiger sehen wenig, alles Weitere über die Suche); Leistungsbudget je
   Geräteklasse mit automatischen Detailstufen (WebGL2 als Grundlage, WebGPU wo vorhanden); Abgleichstatus ruhig
   und in Alltagssprache; Einstieg über ein geführtes Beispielprojekt statt Handbuch.

9. **Reihenfolge (ADR-059 bleibt):** M1: Layout Desktop auf Linux, Mac, Windows; Befehle als Daten (ap-08a);
   Eingabeschicht ohne Hover-Abhängigkeit. Beta: iPad in Safari mit Layout Tablet zum Ansehen, Kommentieren,
   Freigeben und Präsentieren (ap-08c). Spike ap-42 (XR und 3D-Maus) jederzeit nach der Spike-Ausnahme von
   ADR-059, mit Hardware und einem Menschen. Nach der Beta vorne: ap-43 Eingabegeräte, ap-29 WebXR, dann ap-44
   Apple-App für iPad und Vision Pro.

## Alternativen

Nur WebXR auch auf der Vision Pro – billiger, aber ohne verlässliches AR, Raumverankerung und Systemaudio. Native
XR-App mit eigener Logik (Unity) – zweites Datenmodell, widerspricht ADR-029. Android-Tablets als Tablet-Ziel –
offener, aber ohne gemeinsame Basis mit der Vision Pro. Eigenes Handy-Layout – Aufwand ohne klaren Nutzen.

## Konsequenzen

Ändert ADR-031 (Zielsysteme, Tablet, kein Handy-Ziel), ADR-036 (zwei Stufen, einfaches Bearbeiten, Hören, AR) und
ADR-022 (App-Menü auf macOS). Präzisiert ADR-045 (Befehle als Daten, Wirkung im Kern) und ergänzt ADR-044 und
ADR-059 (Spike ap-42, Pakete ap-43 und ap-44 nach der Beta; ap-29 und ap-08c erweitert). Risiko: Rust für visionOS
ist noch kein voll unterstütztes Ziel – prüft ap-42 bzw. ap-44 früh. Hardware und Konten: 3D-Maus, Meta Quest 3,
iPad mit Stift, Vision Pro, Apple-Entwicklerkonto (Signatur). Tests auf Brille, iPad und 3D-Maus sind `[mensch]`.
