# ADR-060: Geräte, Layouts, Eingabe und XR

- Status: akzeptiert
- Datum: 2026-10-18
- Entscheider: Kernteam

## Kontext

ADR-022, ADR-031 und ADR-044 beschreiben die Oberfläche vor allem für den Schreibtisch. In KMU beginnen Projekte
aber oft vor Ort (Aufmaß beim Kunden, häufig ohne Netz), werden unterwegs freigegeben und beim Kunden präsentiert.
Konstrukteure erwarten eine 3D-Maus, Umsteiger die Navigation ihres bisherigen CAD. VR und AR machen räumliche
Entscheidungen erlebbar – für Raumakustik besonders, weil man das Ergebnis auch hören kann.

## Entscheidung

1. **Geräte nach Aufgabe, nicht nach Plattform:**

   | Gerät | Rolle |
   | --- | --- |
   | Desktop und Laptop (Browser, Tauri) | Werkbank: modellieren, rechnen, freigeben, Bibliotheken pflegen |
   | Tablet mit Stift | Vor Ort: Aufmaß, Grundriss-Skizze, Fotos, Präsentation beim Kunden; offline |
   | Handy | Unterwegs: ansehen, kommentieren, freigeben, Benachrichtigungen, QR-Adressen scannen |
   | Großbildschirm, Beamer | Präsentation: vorher/nachher, Fotomodus, Entwürfe nebeneinander |
   | VR- und AR-Brille, AR am Tablet | Erleben: Raum begehen und hören, Absorber in den echten Raum stellen |

2. **Eine Oberfläche, drei Layouts:** **Werkbank** (Maus, ab ca. 1200 px), **Kompakt** (Touch und Stift: Panels als
   Schubladen, Bedienflächen ≥ 44 px, langes Drücken = Kontextaktionen) und **Ansicht** (Handy: Karten, 3D nur
   betrachten, „Übernehmen“ und „Freigeben“ als große Knöpfe). Gewählt wird nach Bildschirm und Eingabegerät,
   umschaltbar. Alle Layouts rufen dieselben Befehle auf (ADR-045); kein Layout hat eigene Logik.

3. **Eingabe ist eine austauschbare Schicht:** Maus, Trackpad, Touch, Stift, 3D-Maus, XR-Controller, Hände und
   Sprache erzeugen nur Befehle und Kameraänderungen. **Navigationsprofile** („wie Onshape“, „wie SolidWorks“,
   „wie Fusion“, „wie Blender“, eigenes) sind eine Einstellung (Ebenen nach ADR-045). Keine Funktion hängt am
   Überfahren mit der Maus.

4. **3D-Maus (SpaceMouse und kompatible Geräte):**
   - **Wege:** Im Browser über WebHID (Chromium-Browser); in Tauri nativ über HID aus Rust (`hidapi`, freizügig);
     unter Linux zusätzlich über den Socket von `spacenavd`, falls er läuft (eigener Prozess, nicht gelinkt).
     Kein proprietäres Hersteller-SDK (ADR-034). Firefox und Safari ohne WebHID: Hinweis „in Chrome, Edge oder
     der Desktop-App nutzbar“.
   - **Bewegung:** sechs Achsen gleichzeitig, Drehpunkt = Auswahl bzw. Punkt unter dem Mauszeiger, Modi
     „Objekt bewegen“ und „Kamera fliegen“ (für Begehungen), Empfindlichkeit und Totzone je Achse,
     Achsen sperren (z. B. nur drehen, Horizont halten).
   - **Tasten:** Die Gerätetasten sind frei belegbare Befehle aus dem Befehlsregister; Standard: Ansicht
     einpassen, Standardansichten, Befehlssuche öffnen, Rückgängig.
   - **Zusammenspiel:** linke Hand 3D-Maus, rechte Hand Maus – beide gleichzeitig, ohne Moduswechsel.
   - Ein Spike vor der Umsetzung prüft Konflikte mit Hersteller-Treibern, die das Gerät exklusiv belegen.

5. **XR (ändert ADR-036):**
   - **Technik:** WebXR im Browser auf derselben Interaktionsschicht (ADR-026), kein eigener Client. Zielgeräte:
     Meta Quest (eigenständig), Apple Vision Pro (Safari), PC-VR über Chromium-Browser, AR am Android-Tablet. Am
     iPhone/iPad ohne WebXR-AR: Export als USDZ für die AR-Vorschau des Systems. Geometrie kommt tesselliert aus
     dem Cache des Servers (ADR-032); kein Geometrie-Worker auf der Brille.
   - **VR-Begehung:** Raum in Originalgröße oder als Puppenhaus auf dem Tisch; Teleport als Standard
     (Bequemlichkeit), freies Gehen in der Grenze des Spielbereichs; Messen mit dem Controller; Kommentare und
     Markierungen im Raum landen als Kommentare am Element (ADR-058).
   - **Hören (Höreindruck):** Platz wählen und den Raum vorher und nachher hören. Erste Stufe statistisch aus der
     Nachhallzeit je Oktavband (Faltung mit erzeugter Impulsantwort über die Web Audio API); später geometrisch
     (ap-30). Immer als „Höreindruck, kein Messwert“ gekennzeichnet.
   - **Einfaches Bearbeiten erlaubt, Modellieren nicht:** In XR dürfen Instanzen platziert, verschoben, an
     Verbindungspunkte gerastet, ausgetauscht und in der Variante umgeschaltet werden – als normale
     Graph-Operationen mit Verlauf. Kein Skizzieren, keine Features, keine Freigabe in XR.
   - **Gemeinsam:** mehrere Personen in derselben Sitzung (Desktop, Tablet und Brille gemischt), Anwesenheit nur
     flüchtig (ADR-056); wer am Desktop sitzt, sieht Blickrichtung und Standort der Brillenträger.
   - **AR:** Absorber per Ebenenerkennung an echte Decke und Wand setzen; Variante, Farbe und Anzahl
     umschalten; Ergebnis als Entwurf übernehmen.
   - **Budgets:** Bildrate ≥ 72 fps auf Meta Quest 3 für einen Raum mit 50 Objekten (Detailstufen, Instancing,
     gebackenes Licht); keine Bewegung der Kamera, die der Kopf nicht macht.

6. **Offline nach Gerät:** Desktop (Tauri) voll; Tablet für Aufmaß und einfache Räume mit Näherungsvorschau
   (ADR-025), exakte Geometrie nach dem Abgleich; Browser und Handy: Geladenes ansehen, Kommentare puffern.
   Tauri 2 kann iOS und Android – eine Tablet-App nutzt dieselbe Codebasis.

7. **Grundsätze:** gestufte Komplexität (Einsteiger sehen wenig, alles Weitere über die Suche); Leistungsbudget je
   Geräteklasse mit automatischen Detailstufen (WebGL2 als Grundlage, WebGPU wo vorhanden); Abgleichstatus ruhig
   und in Alltagssprache; Einstieg über ein geführtes Beispielprojekt statt Handbuch.

8. **Reihenfolge (ADR-059 bleibt):** M1 nur Vorbereitung (Eingabeschicht, keine Hover-Abhängigkeit,
   Layout-Grenzen im Code). Beta: Layout „Ansicht“ für Handy und Tablet (ansehen, kommentieren, freigeben), QR-Adressen.
   Spike ap-42 (XR und 3D-Maus) ist nach der Spike-Ausnahme von ADR-059 jederzeit möglich, braucht aber Hardware
   und einen Menschen. Nach der Beta vorne: ap-43 Eingabegeräte, ap-29 XR mit Höreindruck und AR, ap-44 Tablet vor
   Ort.

## Alternativen

Native XR-App (Unity, OpenXR) – mehr Leistung, aber ein zweiter Client mit eigener Logik. Eigene Tablet-App statt
Layouts. 3D-Maus nur über das Hersteller-SDK (proprietär, nicht in jedem Browser). Kein XR bis zur geometrischen
Akustik.

## Konsequenzen

Ändert ADR-031 (Rolle von Tablet und Handy) und ADR-036 (einfaches Bearbeiten und Hören in XR, AR). Ergänzt ADR-044
und ADR-059 (Spike ap-42, Pakete ap-43, ap-44 nach der Beta; ap-29 erweitert). Neue Regeln in
`docs/rules/client.md`. UI-Tests brauchen je Layout eigene Referenzbilder. Hardware für Tests: eine 3D-Maus,
eine Meta Quest 3, ein Android-Tablet; Tests auf Brille und 3D-Maus sind `[mensch]`.
