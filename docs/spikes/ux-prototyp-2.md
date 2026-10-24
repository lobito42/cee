# Testleitfaden Bedienkonzept: Interaktions-Grundlagen (ap-41b)

Prototyp: `spikes/ux-prototyp-2/` (Wegwerf, kein Produktcode). Dieser Leitfaden gilt für den Pilotlauf des Kernteams
(TP1) und für die Testpersonen TP2 bis TP5. Geprüft werden die Grundlagen, die jede spätere Funktion nutzt:
Elementzustände, eine Auswahl für alles, Anlegen und Verwerfen, Kontextmenü, Navigation, Ziehen, Sichtbarkeit,
Rückmeldung bei Fehlern, Tastatur. Funktionen wie Skizze, Verrunden oder Verbindung gehören nicht dazu.

## Ziel

Prüfen, ob Menschen ohne Einweisung den Fensteraufbau und die Grundlagen erfassen: **erst wählen, dann tun**, ein
Befehl hat viele Wege, nichts hängt am Überfahren, und wenn etwas schiefgeht, bleibt der Rest bedienbar. Das Ergebnis
entscheidet mit über das Gate G1 (Arbeitsfläche).

## Rahmen

- **Start:** `bash spikes/ux-prototyp-2/build.sh`, danach `npm run preview` im Ordner `spikes/ux-prototyp-2/`
  (`npm --prefix spikes/ux-prototyp-2 run preview`). Die Vorschau läuft unter `http://localhost:4173`; die
  Startadressen unten hängen sich an diese Adresse.
- **Gerät:** Linux oder Mac, Fenster mindestens 1280 × 800 Pixel, Chromium-Browser, Maus mit drei Tasten oder
  Trackpad.
- **Rolle der Moderation:** Sie liest die Aufgabe vor, stoppt die Zeit und schweigt. Hilfe zählt als Misserfolg der
  Aufgabe; die Aufgabe wird danach trotzdem zu Ende gezeigt.
- **Hinweis an die Testperson:** Der Prototyp ist nicht fertig; KI-Antworten, die zweite Person und die Simulation sind
  vorgetäuscht und als „simuliert“ gekennzeichnet. Es geht um das Programm, nicht um die Testperson.
- **Bausteinkatalog:** `/?katalog` zeigt jeden Baustein mit seiner Regel; das Kernteam blättert ihn im Pilotlauf durch.

## Ablauf

1. Begrüßung und Hinweis, dass laut gedacht werden darf (2 min).
2. Aufgaben E bis L in der Reihenfolge des Bogens, je mit der Startadresse; die Zeit läuft ab dem Vorlesen.
3. Nachbefragung mit den drei Fragen (5 min).
4. Ergebnisbogen ausfüllen, Dank.

## Aufgaben

Aufgabentexte werden wörtlich vorgelesen. Sie nennen keinen Befehlstitel, den der Ablauf braucht. Die Texte passt das
Kernteam nach dem eigenen Pilotlauf einmal an.

### Aufgabe E

„Mit welcher Tastenkombination nimmt man den letzten Schritt zurück? Finde es im Programm heraus.“

- Startadresse: `/?zustand=halter`
- Sollzustand: die richtige Antwort (Strg+Z, auf dem Mac ⌘Z).
- Zeitlimit: 2 min

### Aufgabe F

„Lass dir vom Programm helfen: Der Steg soll 40 mm hoch werden. Schau dir das Ergebnis an, bevor es gilt.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Vorschlag übernommen (Protokoll mit Quelle KI), Steg 40 mm hoch.
- Zeitlimit: 3 min

### Aufgabe G

„Mach im Halter die Grundplatte 100 mm lang und geh danach zurück zum ganzen Teil.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Länge 100 mm, nichts aktiv, Volumen 57,49 cm³.
- Zeitlimit: 3 min

### Aufgabe H

„Zeig das Teil nur mit seinen Kanten.“

- Startadresse: `/?zustand=halter`
- Sollzustand: Darstellung Kanten.
- Zeitlimit: 1 min

### Aufgabe I

„Wähle Grundplatte und Steg gemeinsam und blende beide aus. Hol sie danach wieder zurück.“

- Startadresse: `/?zustand=halter`
- Sollzustand: beide kurz weg, am Ende beide sichtbar, das Modell ist unverändert.
- Zeitlimit: 2 min

### Aufgabe J

„Mach eine Kopie des Stegs, nenn sie ‚Steg 2‘, und wirf sie dann wieder weg. Merkst du, dass sie nicht endgültig weg
ist?“

- Startadresse: `/?zustand=halter`
- Sollzustand: „Steg 2“ ist verworfen, aber nicht gelöscht.
- Zeitlimit: 3 min

### Aufgabe K

„Der Deckel soll mit zur Baugruppe gehören.“

- Startadresse: `/?zustand=halter`, dann der Reiter „Sensorgehäuse“
- Sollzustand: Deckel liegt in „Baugruppe 1“.
- Zeitlimit: 2 min

### Aufgabe L

„Etwas am Halter ist fehlerhaft. Finde es und behebe es.“

- Startadresse: `/?zustand=befund`
- Sollzustand: Bohrungen sind aktuell, der Befund ist weg.
- Zeitlimit: 3 min

## Erfolgskriterium

Eine Aufgabe gilt als gelöst, wenn der Sollzustand **innerhalb des Zeitlimits ohne Hilfe** erreicht ist. Das Gate für G1
zählt die Aufgaben G, I, J und K: mindestens 4 von 5 Testpersonen lösen alle vier. Die Aufgaben E, F, H und L werden
berichtet. Im Pilotlauf verlangt das Kernteam alle Aufgaben E bis L.

## Ergebnisbogen

Je Testperson und Aufgabe „ja“ (gelöst), „nein“ oder „Hilfe“. Die Zeit in Minuten steht in Klammern. Testpersonen
tragen nur ihr Kürzel; der Pilotlauf von TP1 ist gekennzeichnet.

| Kürzel | Lauf | E | F | G | H | I | J | K | L | Frage 1 | Frage 2 | Frage 3 | Bemerkung |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TP1 | Pilotlauf | – | – | – | – | – | – | – | – | – | – | – | – |
| TP2 | Test | – | – | – | – | – | – | – | – | – | – | – | – |
| TP3 | Test | – | – | – | – | – | – | – | – | – | – | – | – |
| TP4 | Test | – | – | – | – | – | – | – | – | – | – | – | – |
| TP5 | Test | – | – | – | – | – | – | – | – | – | – | – | – |

## Nachbefragung

Nach den Aufgaben, mündlich und ohne Vorgabe der Antwort:

1. Woran erkennst du, was gewählt ist? Richtig ist: an der blauen Kontur im Modell und der hervorgehobenen Zeile in der
   Struktur; beides zeigt dasselbe.
2. Wo findest du, was du mit dem Gewählten tun kannst? Richtig ist: in der Leiste über dem Gewählten, im Rechtsklick-Menü
   und in der Suche; es ist immer derselbe Befehl.
3. Was passiert, wenn etwas schiefgeht? Richtig ist: das Element zeigt Farbe, Symbol und Wort „fehlerhaft“, der Befund
   steht im Panel mit einer Korrektur, und alles andere bleibt bedienbar.

Die drei Fragen zählen je Testperson als „ja“ oder „nein“. Zusätzlich frei: Was war am schwersten zu finden?

## Auswertung

1. Je Aufgabe die Zahl der Testpersonen, die sie gelöst haben, und die mittlere Zeit.
2. Gate G1: Haben mindestens 4 von 5 Testpersonen G, I, J und K gelöst? Dann Go, sonst No-Go.
3. Grundlagen: Wie viele Testpersonen nennen auf alle drei Fragen die richtige Antwort?
4. Auffälligkeiten aus dem Laut-Denken je Aufgabe, getrennt nach Lesbarkeit, Wegen zu einem Befehl und Rückmeldung.
5. Empfehlung Go oder No-Go für G1 mit Begründung; Ergebnisse und Werte je Aufgabe stehen in diesem Dokument. Bei Go gilt
   ADR-065.

## Datenschutz

Der Bogen enthält nur Kürzel (TP1 bis TP5), keine Namen und keine Altersangaben, keine Aufnahmen von Bild oder Ton ohne
ausdrückliche Einwilligung. Der Prototyp sendet nichts an Dritte, speichert nichts über Personen und hat keine Telemetrie
(ADR-037, ADR-056). Die zweite Person im Prototyp ist simuliert und wird nirgends gespeichert. Notizen enthalten keine
Angaben, die auf Personen schließen lassen.

## Anhang: Vorgeschichte

Am 2026-10-21 kam das Kernteam mit dem Prototyp von ap-41 nicht zurecht. Daraus entstand das Bedienkonzept von ap-41b
(zuerst fünf Zonen nach ADR-063, dann der Fensteraufbau nach ADR-065). Dieser Prototyp prüft nur die Grundlagen, auf
denen die späteren Funktionen aufsetzen.
