# Idee: Geräte, Eingabe und XR – weiter gedacht

Stand: abgelegt 2026-10-18 · Status: Idee, nicht freigegeben · Übernommen ist bereits ADR-060 (Geräte, Layouts,
Eingabe, XR). Hier liegt, was darüber hinausgeht.

## XR

| Idee | Beschreibung | Wann sinnvoll |
| --- | --- | --- |
| Hören im Raum mit Kopfbewegung | Höreindruck binaural (HRTF über Web Audio), Klang ändert sich beim Drehen des Kopfes; Sprecher an einen Platz stellen, Zuhörer an einen anderen | mit ap-29, besser mit ap-30 |
| Vorher/nachher per Handgriff | In VR mit einer Geste zwischen Ist-Zustand und Entwurf wechseln, Bild und Klang gleichzeitig | ap-29 |
| Raumgröße fühlen | Puppenhaus auf dem Tisch mit Hand greifen und auf 1:1 „aufziehen“ | ap-29 |
| Mischsitzung mit Kunde | Kunde mit Brille, Berater am Laptop führt: zeigt Varianten, stellt Absorber um, Kunde sieht es sofort | ap-29 |
| AR am Messestand | Absorber-Katalog als AR-Szene: QR-Code scannen, Produkt erscheint in Originalgröße | nach ap-29 |
| Blicksteuerung | Auf Brillen mit Eye-Tracking (Vision Pro): Auswahl per Blick und Fingertipp; foveated rendering für Leistung | nach ap-29 |
| Montage-Anleitung in AR | Freigegebener Stand (ADR-047) als Schritt-für-Schritt-Montage im echten Raum: Bohrpunkte, Abstände | nach ap-33a und ap-29 |
| Leistung in VR messen | Fps-Protokoll je Gerät als Teil der Eval-Suite, damit Rendering-Änderungen die Brille nicht verschlechtern | mit ap-42 |

## 3D-Maus und Eingabe

| Idee | Beschreibung | Wann sinnvoll |
| --- | --- | --- |
| Radialmenü an der 3D-Maus | Eine Taste öffnet ein Kreismenü mit Befehlen des aktuellen Arbeitsbereichs (wie bei CAD-Profis üblich) | ap-43 |
| Profile je Arbeitsbereich | Andere Tastenbelegung in Modell, Raum, Präsentation | ap-43 |
| Kamerafahrt aufnehmen | Mit der 3D-Maus durch den Raum fliegen und die Fahrt als Video für das Angebot aufnehmen | ap-43 + ap-14 |
| Gamepad | Spiel-Controller als günstige Alternative für Begehungen am Bildschirm | ap-43 |
| Stift-Anmerkungen | Mit dem Stift direkt aufs 3D-Modell oder den Grundriss schreiben; wird Kommentar am getroffenen Element | ap-44 |
| Sprachbefehle | Befehlssuche per Sprache, lokal erkannt (z. B. Whisper), keine Daten an Dritte ohne Wahl (ADR-037) | nach ap-15 |

## Vor Ort und unterwegs

| Idee | Beschreibung | Wann sinnvoll |
| --- | --- | --- |
| Raumscan | LiDAR am iPad/iPhone (Raumerkennung des Systems) bzw. Fotogrammetrie; Ergebnis als Wände, Öffnungen, Möbel | nach ap-44 |
| Laser-Entfernungsmesser | Bluetooth-Messgeräte übertragen Maße direkt ins Aufmaß | ap-44 |
| Ist-Messung vor Ort | Nachhallzeit mit dem Tablet-Mikrofon grob messen (Klatschen bzw. Testsignal), mit Rechnung vergleichen | nach ap-44 |
| QR-Etiketten | Etikett am gelieferten Absorber öffnet Element, Revision, Datenblatt, Montagehinweis (ADR-058) | Beta (Layout Ansicht) |
| Freigabe per Benachrichtigung | Push-Nachricht „Entwurf wartet auf Prüfung“, Freigabe mit zwei Tippern und Begründung | Beta |
| Zweiter Bildschirm | Präsentation auf dem Beamer, Steuerung und Notizen auf dem Laptop | mit Arbeitsbereich Präsentation |
