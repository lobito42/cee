# Testleitfaden Bedienkonzept (ap-41b)

Prototyp: `spikes/ux-prototyp-2/` (kein Produktcode). Neuer Anlauf nach dem No-Go des Pilotlaufs von ap-41
(siehe Anhang). Dieser Leitfaden gilt für den Pilotlauf des Kernteams (TP1) und für die Testpersonen TP2 bis TP5.

## Ziel

Prüfen, ob Menschen ohne Einweisung das Bedienkonzept erfassen und eine Grundplatte, einen Steg, eine Baugruppe,
einen Entwurf, eine Suche, eine KI-Hilfe, eine Skizze und eine Darstellung bedienen können. Die Leitidee lautet:
**erst wählen, dann tun**; Zahlen stehen an einem Ort (rechts), das Modell ist lesbar, Baum und Modell gehören
zusammen. Das Ergebnis entscheidet mit über das Gate G1 (Arbeitsfläche).

## Rahmen

- **Start:** `bash spikes/ux-prototyp-2/build.sh`, danach `npm --prefix spikes/ux-prototyp-2 run preview`. Die
  Vorschau läuft unter `http://localhost:4173`; die Startadressen unten hängen sich an diese Adresse.
- **Gerät:** Linux oder Mac, Fenster mindestens 1280 × 800 Pixel, Chromium-Browser, Maus mit drei Tasten oder
  Trackpad (Schieben mit Umschalt und rechter Taste).
- **Rolle der Moderation:** Sie liest die Aufgabe vor, stoppt die Zeit und schweigt. Hilfe zählt als Misserfolg der
  Aufgabe; die Aufgabe wird danach trotzdem zu Ende gezeigt.
- **Hinweis an die Testperson:** Der Prototyp ist nicht fertig; KI-Antworten und Simulationsergebnisse sind
  vorgetäuscht und als „simuliert“ gekennzeichnet. Es geht um das Programm, nicht um die Testperson.

## Ablauf

1. Begrüßung und Hinweis, dass laut gedacht werden darf (2 min).
2. Aufgaben A bis H in der Reihenfolge des Bogens, je mit der Startadresse; die Zeit läuft ab dem Vorlesen.
3. Nachbefragung mit den Fragen zur Leitidee (5 min).
4. Ergebnisbogen ausfüllen, Dank.

## Aufgaben

Aufgabentexte werden wörtlich vorgelesen. Sie nennen keinen Befehlstitel, den der Ablauf braucht (Ausnahme:
Aufgabe G, deren Text das Kernteam vorgegeben hat).

### Aufgabe A

„Bau eine Grundplatte: 80 mm lang, 50 mm breit und 8 mm dick.“

- Startadresse: `/?zustand=leer`
- Sollzustand: Teil 1 mit Skizze (Rechteck 80 × 50 mm auf XY) und Extrusion Dicke 8 mm.
- Zeitlimit: 5 min

### Aufgabe B

„Der Steg soll 40 mm hoch werden, und seine beiden oberen langen Kanten sollen mit 3 mm Radius rund sein.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Steg Höhe 40 mm; Verrundung Radius 3 mm an 2 Kanten.
- Zeitlimit: 4 min

### Aufgabe C

„Setz den Deckel auf das Gehäuse, sodass beide fest zusammengehören.“

- Startadresse: `/?zustand=teile`
- Sollzustand: Baugruppe mit zwei Instanzen, Verbindung „Fest“ zwischen Unterseite (Deckel) und Oberkante
  (Gehäuse); die Unterseite des Deckels liegt auf 30 mm.
- Zeitlimit: 5 min

### Aufgabe D

„Probier aus, wie der Halter mit 10 mm dicker Grundplatte aussieht, ohne den bisherigen Stand zu verändern.
Gefällt es dir, soll es der neue Stand werden.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Hauptstand mit Dicke 10 mm, Entwurf übernommen.
- Zeitlimit: 5 min

### Aufgabe E

„Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“

- Startadresse: `/?zustand=halter`
- Sollzustand: richtige Antwort (Strg Z, auf dem Mac ⌘Z).
- Zeitlimit: 2 min

### Aufgabe F

„Lass dir vom Programm helfen: Die oberen Kanten des Stegs sollen mit 2 mm rund werden. Schau dir das Ergebnis
an, bevor es gilt, und mach den Radius danach 3 mm.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Vorschlag übernommen (Protokoll `quelle: ki`), Verrundung Radius 3 mm am Steg.
- Zeitlimit: 4 min

### Aufgabe G

„Öffne die Skizze der Grundplatte, mach die Platte 100 mm lang und geh zurück zum ganzen Teil.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Länge 100 mm, Ort Teil, Volumen 57,49 cm³.
- Zeitlimit: 3 min

### Aufgabe H

„Zeig das Teil nur mit seinen Kanten.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Darstellung Kanten.
- Zeitlimit: 1 min

## Erfolgskriterium

Eine Aufgabe gilt als gelöst, wenn der Sollzustand **innerhalb des Zeitlimits ohne Hilfe** erreicht ist. Das Gate
für G1 zählt die Aufgaben A, B und C: mindestens 4 von 5 Testpersonen lösen alle drei. Die Aufgaben D bis H
werden berichtet. Im Pilotlauf verlangt das Kernteam alle Aufgaben A bis H und beide Fragen zur Leitidee richtig.

## Ergebnisbogen

Je Testperson und Aufgabe „ja“ (gelöst), „nein“ oder „Hilfe“. Die Zeit in Minuten steht in Klammern. Testpersonen
tragen nur ihr Kürzel; der Pilotlauf von TP1 ist gekennzeichnet.

| Kürzel | Lauf | A | B | C | D | E | F | G | H | Frage 1 | Frage 2 | Bemerkung |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TP1 | Pilotlauf | – | – | – | – | – | – | – | – | – | – | – |
| TP2 | Test | – | – | – | – | – | – | – | – | – | – | – |
| TP3 | Test | – | – | – | – | – | – | – | – | – | – | – |
| TP4 | Test | – | – | – | – | – | – | – | – | – | – | – |
| TP5 | Test | – | – | – | – | – | – | – | – | – | – | – |

## Nachbefragung

Nach den Aufgaben, mündlich und ohne Vorgabe der Antwort:

1. Wo ändert man hier eine Zahl? Richtig ist: im Inspektor rechts.
2. Was tut man zuerst, bevor man etwas ändert? Richtig ist: das Teil oder den Schritt wählen.
3. Was war am schwersten zu finden? (frei, für die Auswertung)
4. Wann war nicht klar, welche Zeile im Aufbau zu welcher Geometrie gehört? (frei)

Die Fragen 1 und 2 prüfen die Leitidee; sie zählen je Testperson als „ja“ oder „nein“.

## Auswertung

1. Je Aufgabe die Zahl der Testpersonen, die sie gelöst haben, und die mittlere Zeit.
2. Gate G1: Haben mindestens 4 von 5 Testpersonen A, B und C gelöst? Dann Go, sonst No-Go.
3. Leitidee: Wie viele Testpersonen nennen auf beide Fragen die richtige Antwort?
4. Auffälligkeiten aus dem Laut-Denken je Aufgabe, getrennt nach Lesbarkeit des Modells, Zusammenhang von Baum und
   Modell und Ort der Zahlen.
5. Empfehlung Go oder No-Go für G1 mit Begründung; Ergebnisse und Werte je Aufgabe stehen in diesem Dokument.

## Datenschutz

Der Bogen enthält nur Kürzel (TP1 bis TP5), keine Namen und keine Altersangaben, keine Aufnahmen von Bild oder Ton
ohne ausdrückliche Einwilligung. Der Prototyp sendet nichts an Dritte, speichert nichts und hat keine Telemetrie
(ADR-037, ADR-056). Notizen enthalten keine Angaben, die auf Personen schließen lassen.

## Anhang: Pilotlauf von ap-41 (No-Go)

Am 2026-10-21 kam das Kernteam mit dem Prototyp von ap-41 nicht zurecht: das 3D-Modell war kaum lesbar, Baum und
Modell wirkten unverbunden, und es gab keine erkennbare Leitidee. Daraus entstand das Bedienkonzept von ap-41b
(fünf Zonen, synchrone Auswahl, Zahlen an einem Ort, Orte Teil und Skizze, KI im selben Feld).
